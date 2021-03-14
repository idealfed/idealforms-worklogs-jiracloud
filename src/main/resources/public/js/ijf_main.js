var ijf = ijf || {};
ijf.main = (function(){

var items;
var itemList;
var gNodes;
var gCats;
var exerciseId;
var item;
var lastItem;
var postCopyActions;
var callbacks;
var formName;

var gEventControl;
var allFormAttachments;
var saveQueue;
var saveQueueBatch;
var saveResultMessage;

var dataServices;
var currentUser;
var outerForm;
var gGantt;
var gNocache="false";
var gViewport;
var gSubformParams=null;
var gItemSectionGridIndex=null;

var sessionTimeout;
var gSaveItemAttributes=false;
var gSaveFormCallback = null;
var gPopupFormHandle = null;
var gRec = null;


var gNavigateOnChange = "Unsaved data exists on this page...<br><br>Are you sure you want to navigate away?<br><br> OK=navigate away<br> Cancel=return to editing.";
var updateErrorMessage = "Sorry but an update request failed.  Please refresh your browser to ensure you have the latest data and try again.";

var gSaveIncludesFile = false;


function init(inConfigVersion)
{
	/*
	   Set g_version for this version of the JS
	*/
    window.g_version = "1.0.1";

    //initiallize message handling
    //DEPRICATING jQuery.receiveMessage(ijfUtils.messageHandler);

    console.log("Initializing IJF version: " + window.g_version);
    //prevent double initializing....
    //if(ijf.initialized)
    //{
	//	console.log("Double Initialization");
	//	return;
	//}

	ijf.initialized=true;


    ijfUtils.showProgress();

    if(g_iwfFormSetId==null)
    {
        //no exercise id
        jQuery('#ijfContent').html("Sorry, no exercise ID was identified.");
        return;
    }
    //do a hard init of data for now....

	ijf.main.itemId= g_itemId;
	ijf.main.debug = g_debug;
	//ijf.main.debug = "true";
	//g_debug="true";

	//var configUrl = '/plugins/servlet/iforms?ijfAction=getFormConfig&formId='+g_formId;
    //if(g_formId=="") configUrl = '/plugins/servlet/iforms?ijfAction=getConfig&version='+inConfigVersion;
	//if(g_formId=="")  configUrl = '/config?version='+inConfigVersion;

	var configUrl = '/plugins/servlet/iforms?ijfAction=getFormConfig&formId='+g_formId;
	if(g_formId=="") configUrl = '/plugins/servlet/iforms?ijfAction=getConfig&version='+inConfigVersion;



    ijfUtils.footLog("Calling load configuration...");

	  jQuery.ajax(g_root + configUrl, {
        success: function(data) {
            //jQuery('#main').html(jQuery(data).find('#main *'));
            ijfUtils.footLog("Successful load");
            ijf.userPool = new IjfUserPool();
            ijf.main.currentUser = {};
			if(g_username!="$ijfUsername") ijf.main.currentUser = ijf.userPool.getUser(g_username);
			ijf.jiraEditMeta = [];
			ijf.jiraEditMetaKeyed = [];
			ijf.jiraAddMeta = [];
			ijf.jiraAddMetaKeyed = [];
			ijf.session = {};
            ijf.main.controlSet = new Array();
//          dataServices = new DataServices();
            ijf.main.items = new Array();
            ijf.main.callbacks = new Array();
            ijf.main.itemList = new Array();
            ijf.main.gNodes = new Array();
            ijf.main.gCats = new Array();
            try
            {

            	//todo:  may not need to do this encoding for cloud

 				var cleanDoubleDouble = data.replace(/\"\"/g,"\"");
				cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
				//substituted null values for    "~"
				cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");

				ijf.fw.setup(JSON.parse(cleanDoubleDouble));
			}
			catch(e)
			{
    	        ijfUtils.footLog("Config failed to parsee: " + e.message);
    	        ijfUtils.hideProgress();
    	        ijfUtils.modalDialogMessage("Fatal","Unable to get the configuration.  Don't panic, the system maintains 20 prior snapshots from which to recover.  Click the 'History' button, apply a config and download and upload.");
				ijfUtils.renderAdminButtons('ijfContent');
    	        return;
			}
			if(!ijf.fw) return;

			//new logic:  if g_formId is numeric, switch it to the name of the form in the form group...
			if((!isNaN(window.g_formId)) && (window.g_formId!=""))
			{
				var tFName = Object.keys(ijf.fw.forms).reduce(function(inV,fKey){var f=ijf.fw.forms[fKey]; if(f.id/1==window.g_formId) inV=f.name; return inV;},null);
				window.g_formId=tFName;
			}


			//determine if anonymous....and not craft.....if so establish session
			if((window.g_formId) && (window.g_craft!="true"))
			{
				var tForm = ijf.fw.forms[window.g_formId];
				if(tForm)
				{
					//if((tForm.formAnon=="true") && (window.g_username=="$ijfUsername"))
					if(tForm.formAnon=="true")
					{
						//attempt to login...
						var	putObj = {"username":tForm.formSet.settings.anonUsername,"password":tForm.formSet.settings.anonPassword};
						var	jData = JSON.stringify(putObj);
						var	tApi = "/rest/auth/1/session";
						var login = ijfUtils.jiraApiSync("POST",tApi,jData);

						if(login.hasOwnProperty("session"))
						{
							//need to see this error and add a handle if it fails.
							//then need to construct user because it's null now
							ijf.main.currentUser = ijf.userPool.getUser(tForm.formSet.settings.anonUsername);
						}
						else
						{
							if(login.indexOf("Failed")>-1)
							{
								ijfUtils.hideProgress();
								ijfUtils.modalDialogMessage("Error","Sorry, unable to authenticate with the system with stored credentials.");
								return;
							}
						}
					}
				}
			}

	  	    jQuery.ajax(g_root + '/rest/api/3/project', {
        		success: function(data) {
					try
					{
						ijf.exercise = new IjfExercise(data);
                        ijfUtils.footLog("Model loaded");
                        ijfUtils.hideProgress();
                        //?process setup?

                        ijf.main.processSetup('ijfContent');
					}
					catch(e)
					{
						ijfUtils.footLog("Config failed to parse projects " + e.message);
						ijfUtils.hideProgress();
						return;
					}
				},
				error: function(e) {
					ijfUtils.footLog("Config failed to parse " + e.message);
					ijfUtils.hideProgress();
	    	        return;
				}
			});

        },
        error: function(e) {
            ijfUtils.footLog("Failed first init load " + e.message);
            ijfUtils.hideProgress();
            if(!ijf.main.controlSet) ijf.main.controlSet=[];
            ijfUtils.renderAdminButtons('ijfContent');

        }
    });


}


function processSetup(inContainerId)
{
    //ijfUtils.clearExt();
    ijfUtils.clearAll();

    ijf.jiraMeta=null;

    //hook to allow non-item based forms, ie reports
    if (ijf.main.itemId=="0")
    {
		ijf.currentItem = {};
        ijf.main.renderForm(inContainerId, window.g_formId, false, ijf.main.item);
        return;
    }

    if ((ijf.main.itemId=='') && (window.g_formId==""))
    {
		ijfUtils.renderAdminButtons(inContainerId);
		//look for report mode...else forms

		if(window.location.search.indexOf("mode=reports")>-1)
		{
			ijf.lists.renderReportList_Borderlayout(inContainerId);
		}
		//else if(window.location.search.indexOf("mode=report")>-1)
	    //{
		//	ijf.lists.renderReport_noforms(inContainerId);
		//}
		else if(window.location.search.indexOf("mode=admin")>-1)
		{
			ijf.lists.renderGroupList_Borderlayout(inContainerId);
		}
		else if(window.location.search.indexOf("mode=library")>-1)
		{
		   var tElement = document.getElementById("ijfContent");
		   tElement.innerHTML='<iframe src="https://www.idealfed.com/formsLibrary/" style="margin-left:-5px;width: 1010px; height: 600px; border: 0"></iframe>';
		}
		else
		{
			ijf.lists.renderItemList_Borderlayout(inContainerId);
		}
		return;
	}
    if (ijf.main.itemId=='')
    {
		ijfUtils.renderAdminButtons(inContainerId);
		//look for report mode...else forms

		if(window.location.search.indexOf("mode=report")>-1)
	    {
			ijf.lists.renderReport_noforms(inContainerId);
			return;
		}
	}

    //new concept to allow a form to load even if no item...
    if(ijf.session["passTwoForInvalidKey"]){
		ijf.main.itemId='';
		ijf.session["passTwoForInvalidKey"]=false;
	}




    if (ijf.main.itemId=='')
    {
    	//There is a form but not item.
    	//will need fields....
		ijfUtils.loadJiraFields();
        ijf.main.renderForm(inContainerId, window.g_formId, false, null);
        ijfUtils.renderAdminButtons(inContainerId);
    }
    else
    {
        //look to see if item is constructed
        if(ijf.currentItem == null)
        {

            ijf.main.loadItem(inContainerId);
        }
        else
        {
            ijf.main.renderForm(inContainerId, window.g_formId, false, ijf.currentItem);
        }
    }
}

function loadItem(inContainerId)
{

    //load the item.....
    if(ijf.main.itemId == null)
    {
        ijfUtils.footLog('Sorry you must select an item before loading...');
        return;
    }

    //concept of proxy connection, if the current form is "proxy" then call this as
    //a proxy call...

	ijf.main.outerForm=ijf.fw.forms[window.g_formId];
    if((ijf.main.outerForm.hasOwnProperty("formProxy"))&&(ijf.main.outerForm.formProxy=="true"))
    {
		//proxy auth
	    var tItem = ijfUtils.getProxyApiCallSync("/rest/api/3/issue/"+ijf.main.itemId,ijf.main.outerForm.formSet.id);
	    ijfUtils.footLog('Item aquired with proxy auth');
	}
	else
	{
		//normal
	    var tItem = ijfUtils.getJiraIssueSync(ijf.main.itemId);
	}


    if(tItem.key)
    {
		try
		{
			ijf.currentItem = tItem;
			ijfUtils.footLog("Modeled " + ijf.currentItem.key)

			//load fields and editMeta
			//todo:  switch the add and edit meta based on type of form
			ijfUtils.loadJiraFields();

			ijfUtils.hideProgress(true);

			ijf.main.processSetup(inContainerId);
		}
		catch(e)
		{
			ijfUtils.hideProgress();
			ijfUtils.modalDialogMessage("Warning Message","Unable to get the issue.");
			ijfUtils.footLog("Failed to get or model item: " + e.message);
		}
	}
	else
	{
	    if(typeof tItem=="string")
	    {
		    if(tItem.indexOf("not have the permission")>-1)
		    {
				 ijfUtils.modalDialogMessage("Error","Unable to load the item because you do not have the correct permissions.");
			}
		    else if(tItem.indexOf("401 for URL")>-1)
		    {
				 ijfUtils.modalDialogMessage("Error","Unable to load the item because you do not have the correct permissions. (401)");
			}
		    else if(tItem.indexOf("403 for URL")>-1)
		    {
				 ijfUtils.modalDialogMessage("Error","Unable to load the item because you do not have the correct permissions.<br>And it appears the account is locked.  Please contact support.  (403)");
			}
		    else if(tItem.indexOf("Failed")>-1)
		    {
				 ijfUtils.modalDialogMessage("Error","Unable to load issue: " + ijf.main.itemId + "<br>" + tItem);
		    }
		}
		ijf.currentItem = {};
				ijf.session["passTwoForInvalidKey"]=true;
		  	    ijf.main.processSetup(inContainerId);
		//ijf.currentItem = {};
	}
}




function renderForm(inContainerId, inFormId, isNested, item, afterRender)
{

	if(!isNested)
	{
		//ijfUtils.clearExt();
    	ijfUtils.clearAll();

    	ijf.main.outerForm = ijf.fw.forms[inFormId];
    	//if the ijf.admin.dWin exists, destroy it....
    	if(ijf.lists.dWin) Ext.destroy(ijf.lists.dWin);
	}
	else
	{
		//if in craft, write something to target container and leave...
		//if(g_craft=='true')
		//{
		//	document.getElementById(inContainerId).innerHTML="Sub Form: " + inFormId;
		//	return;
		//}

	}

    var thisForm;
    //now generate the form from the spec.....

    if(inFormId=="")
    {
        //look for defaultForm in settings
        ijfUtils.footLog("No form");
        return;
    }
    else
    {
        thisForm = ijf.fw.forms[inFormId];
    }
    if(!thisForm)
    {
        ijfUtils.footLog("No form found: " + inFormId);
        return;
	}

	//look for a before load function and run
    if(thisForm.settings.hasOwnProperty("beforeLoad"))
    {
        var beforeLoadFunction=thisForm.settings["beforeLoad"];
        if(beforeLoadFunction)
        {
            ijfUtils.onLoadHandler(beforeLoadFunction);
        }
    }
	//permissions
	thisForm.permissions = null;
	if(thisForm.settings.hasOwnProperty("permissions"))
    {
		thisForm.permissions = JSON.parse(thisForm.settings["permissions"]);
		if(!thisForm.permissions.hasOwnProperty("enabled"))
		{
			//reformat
			var tmpP = thisForm.permissions;
			thisForm.permissions =
							{"enabled":true,
							 "states":tmpP
				};
		}
    }
    else
    {
		thisForm.permissions =
				{"enabled":false,
				 "states":{}
				};
	}

	//based on the form, it should get edit or add meta...

	//look to see if form is add or edit? based on form type, load meta if necessary

	//and you might be in a subform of an Add event...so, if item.fields exists AND item.jiraMeta exists, then
	//you want to skip this...I think...

    //5/31, if jiraMeta is basedon the fields (because it's read only) clear the meta in case it's changed...

    if(item)
    {
		if(ijf.jiraEditMeta[item.key])
		{
			if(ijf.jiraEditMeta[item.key].readonly)
			{
				ijf.jiraMeta={};
				ijf.jiraMetaKeyed=[];
				ijf.jiraEditMeta[item.key]=null;
			}
		}
    }

   	if((!isNested) || (!ijf.jiraMeta)) //should only need this if NOT nested
	{
		ijf.jiraMeta={};
		ijf.jiraMetaKeyed=[];

		//look to see if an Add type.  If so, null out the Item.
		//12/5/17 ---taking this line out to allow editing directly after adding off of
		//add.
		//if(thisForm.formType=="Add") item=null;

		if(item)
		{
			//item exists, pull the edit meta
			if(item.key)
			{
				if(!ijf.jiraEditMeta.hasOwnProperty(item.key))
				{
					//this must proxy as well, if the form is proxy
					if(thisForm.formProxy=="true")
					{
						//proxy auth
						ijf.jiraEditMeta[item.key] = ijfUtils.getProxyApiCallSync('/rest/api/3/issue/'+item.key+'/editmeta',thisForm.formSet.id);

						//5/31/18 - adding concept of null meta data to allow 'read only' issues.  result will be a null set of meta data...
						if(Object.keys(ijf.jiraEditMeta[item.key].fields).length==0)
						{
							//we have not edit ability...set the thing to the root fields..all will be viewable, but no writing....
							ijf.jiraEditMeta[item.key] = {"fields":ijf.jiraFields};
							ijf.jiraEditMeta[item.key].readonly=true;
						}

						ijfUtils.footLog('Item edit meta aquired with proxy auth');
					}
					else
					{
						//normal
						ijf.jiraEditMeta[item.key] = ijfUtils.getJiraIssueMetaSync(item.key);

						//5/31/18 - adding concept of null meta data to allow 'read only' issues.  result will be a null set of meta data...
						if(Object.keys(ijf.jiraEditMeta[item.key].fields).length==0)
						{
							//we have not edit ability...set the thing to the root fields..all will be viewable, but no writing....
							ijf.jiraEditMeta[item.key] = {"fields":ijf.jiraFields};
						}
					}

					ijf.jiraEditMetaKeyed[item.key] = [];
					Object.keys(ijf.jiraEditMeta[item.key].fields).forEach(function(f)
					{
						ijf.jiraEditMetaKeyed[item.key][ijf.jiraEditMeta[item.key].fields[f].name]=ijf.jiraEditMeta[item.key].fields[f];
					});
				}
				ijf.jiraMeta=ijf.jiraEditMeta[item.key];
				ijf.jiraMetaKeyed=ijf.jiraEditMetaKeyed[item.key];
			}
		}
		else
		{
			//no item, look for Add form
			if(thisForm.formType=="Add")
			{
				try
				{
					ijfUtils.loadIssueTypeDetails(thisForm.formSet.projectId);
				}
				catch(ae)
				{
					//need to bail, this is an Add but something is wrong, likely cannot add.
					delete ijf.jiraAddMeta[thisForm.formSet.projectId];
					delete ijf.jiraAddMetaKeyed[thisForm.formSet.projectId];
					ijfUtils.modalDialogMessage("Error","Unable to initiate the add process.  If this is an error please contact support.");
					ijf.main.resetForm();
					return;
				}

				//meta is keyed by issue type for add
				ijf.jiraMeta.fields=ijf.jiraAddMeta[thisForm.formSet.projectId][thisForm.issueType]
				ijf.jiraMetaKeyed=ijf.jiraAddMetaKeyed[thisForm.formSet.projectId][thisForm.issueType]
				//for add items
				if(!item)  item={"fields":{}};
			}
		}
	}

    //test if craft and redirect if so
   	if(!isNested)
	{
		if(window.g_craft=="true")
		{
			ijf.admin.renderFormAdmin(ijf.fw.forms[window.g_formId]);
			return;
		}
	}

	//case of nested form, wanting to render form using a session defined Item
	var formItem = item;
	if(isNested)
	{
		//look for session variable for the form name.
		if(ijf.session.hasOwnProperty("subformItemKey_" + thisForm.name))
		{
			var subFormKey = ijf.session["subformItemKey_" + thisForm.name];
			var subFormItem =ijfUtils.getJiraIssueSync(subFormKey);
			if(subFormItem.key)
			{
				formItem=subFormItem;
				if(!ijf.jiraEditMeta.hasOwnProperty(subFormItem.key))
				{
					//this must proxy as well, if the form is proxy
					if(thisForm.formProxy=="true")
					{
						//proxy auth
						ijf.jiraEditMeta[subFormItem.key] = ijfUtils.getProxyApiCallSync('/rest/api/3/issue/'+subFormItem.key+'/editmeta',thisForm.formSet.id);
						ijfUtils.footLog('Item edit meta aquired with proxy auth');
					}
					else
					{
						//normal
						ijf.jiraEditMeta[subFormItem.key] = ijfUtils.getJiraIssueMetaSync(subFormKey);
					}

					ijf.jiraEditMetaKeyed[subFormItem.key] = [];
					Object.keys(ijf.jiraEditMeta[subFormItem.key].fields).forEach(function(f)
					{
						ijf.jiraEditMetaKeyed[subFormItem.key][ijf.jiraEditMeta[subFormItem.key].fields[f].name]=ijf.jiraEditMeta[subFormItem.key].fields[f];
					});
				}
				ijf.jiraMeta=ijf.jiraEditMeta[subFormItem.key];
				ijf.jiraMetaKeyed=ijf.jiraEditMetaKeyed[subFormItem.key];
			    //now you have meta for nested Item
			}
		}
	}

	//init form settings
	if(!thisForm.settings.headerLeft) thisForm.settings.headerLeft="";
	if(!thisForm.settings.headerCenter) thisForm.settings.headerCenter="";
	if(!thisForm.settings.headerRight) thisForm.settings.headerRight="";



    //For main for only
    if(!isNested)
    {

		ijfUtils.setElementWithStyleString("ijfOuterContainer",thisForm.settings["outerContainerStyle"]);

        if(thisForm.settings.hasOwnProperty("tabTitle"))
        {
//look for snippet and use if exists...
			if(ijf.snippets.hasOwnProperty(thisForm.settings["tabTitle"]))
			{
				tTitle="IJF";
				try
				{

					var tTitle = ijf.snippets[thisForm.settings["tabTitle"]]();
				}
				catch(e)
				{
					//go quiet
				}
	            document.title = tTitle;
			}
			else
			{
	            document.title = thisForm.settings["tabTitle"];
			}
        }

        ijfUtils.renderHeader(inContainerId,thisForm,formItem);

        ijfUtils.setElementWithStyleString("ijfHead",thisForm.settings["title_style"]);
    }
    ///todo must validate settings prior to using...
    //set the panel

    var colSpans = {};
    var rowsWithSpans = {};

    try
    {
        if (thisForm.settings["columnSpans"]!=null)
        {
            var cSpans = thisForm.settings["columnSpans"].split(";");
            if(cSpans[0]!="")
            {
                for(var k in cSpans)
                {
                    if(!cSpans.hasOwnProperty(k)) continue;
                    var svals = cSpans[k].split(",");
                    colSpans[svals[0].trim()+"_"+svals[1].trim()]= svals[2].trim();
                    rowsWithSpans[svals[0].trim() + "spannedRow"] = "spanned row";
                }
            }
        }
    }
    catch(e)
    {
        ijfUtils.footLog("Error in columnspans settings");
        colSpans={};
    }

    //rowspans
	   var rowSpans = {};
	   var colsWithSpans = {};

		try
		{
			if (thisForm.settings["rowSpans"]!=null)
			{
				var rSpans = thisForm.settings["rowSpans"].split(";");
				if(rSpans[0]!="")
				{
					for(var k in rSpans)
					{
						if(!rSpans.hasOwnProperty(k)) continue;
						var svals = rSpans[k].split(",");
						rowSpans[svals[0].trim()+"_"+svals[1].trim()]= svals[2].trim();
						colsWithSpans[svals[0].trim() + "spannedCol"] = "spanned col";
					}
				}
			}
		}
		catch(e)
		{
			ijfUtils.footLog("Error in rowspan settings")
			rowSpans={};
		}


    ijfUtils.setContent(inContainerId,thisForm.settings["rows"],thisForm.settings["columns"],colSpans,false,rowSpans);


    if (thisForm.settings["columnWidths"]!=null)
    {
        var colwidths = thisForm.settings["columnWidths"].split(";");

        for(var i in colwidths)
        {

            if(!colwidths.hasOwnProperty(i)) continue;
            var wPair = colwidths[i].split(":");
			if(wPair.length < 2) continue;

            var rows = thisForm.settings["rows"]/1+1;

            for (var j = 1; j<rows; j++)
            {
				if(rowsWithSpans.hasOwnProperty(j+"spannedRow")) continue;
				//if the width is % then set the outer TD to % and set the innter DIV to 100%.
				var tcWidth = wPair[1].trim();
				if(tcWidth.indexOf("%")>-1)
				{
					//table td
					var tContainer = "td_" + inContainerId + "_" + j + "_" + wPair[0].trim();
					var e = document.getElementById(tContainer);
					if(e!=null) e.style.width=wPair[1];
					//div
					tContainer = inContainerId + "_" + j + "_" + wPair[0].trim();
					e = document.getElementById(tContainer);
					if(e!=null) e.style.width="100%";
				}
				else
				{
					var tContainer = inContainerId + "_" + j + "_" + wPair[0].trim();
					var e = document.getElementById(tContainer);
					if(e!=null) e.style.width=wPair[1];
			    }
            }
        }
    }

    ijfUtils.setElementWithStyleString(inContainerId + "_ijfContentTableId", thisForm.settings["outerTableStyle"]);

    //for each field.. apply the field.

    for (var f in thisForm.fields)
    {

        if(!thisForm.fields.hasOwnProperty(f)) continue;


        var thisField = thisForm.fields[f];
        thisField.form = thisForm;
        var frmCell = thisField.formCell.split(",");

        //if this is a nested FIELD in html, skip
        if(frmCell.length>2) continue;

        var targetCell =  inContainerId+"_"+frmCell[0]+"_"+frmCell[1];
        var container = document.getElementById(targetCell);
        try
        {
            ijf.extUtils.renderField(inContainerId,formItem,thisField,container);
        }
        catch(e)
        {
            ijfUtils.footLog(thisField.formCell + " " + thisField.controlType + " failed to render: " + e.message);
        }

    }
    ijfUtils.renderAdminButtons(inContainerId);
    //look for Onload event.  If it exists, execute.
    if(thisForm.settings.hasOwnProperty("onLoad"))
    {
        var onLoadFunction=thisForm.settings["onLoad"];
        if(onLoadFunction)
        {
            ijfUtils.onLoadHandler(onLoadFunction);
        }
    }

    if(afterRender) afterRender();

}


function controlChanged(controlKey)
{

    var cnt = ijf.main.controlSet[controlKey];
    cnt.dirty=true;
    ijf.main.gEventControl = cnt;

    window.onbeforeunload= function() {return 'You have unsaved changes on this page...'};


    if(ijf.main.outerForm.formSet.settings["changeStyle"])
    {
		ijfUtils.setElementWithStyleString(cnt.container.id,ijf.main.outerForm.formSet.settings["changeStyle"]);
	}
	else
	{
		 var tjqid = "#" + cnt.container.id;
	    jQuery(tjqid).css(ijf.fw.onChangeStyle);
	}

}

function isFormValid()
{
    for (var i in ijf.main.controlSet)
    {
        if((!ijf.main.controlSet.hasOwnProperty(i)) || (i.indexOf("ijfContent")<0)) continue;
        var cnt = ijf.main.controlSet[i];
        try
        {
			if(cnt.control.state)
			{
				//if hidden, continue
				var outerDivId=cnt.id.replace("_fld_","_fldDivId_");
				if(document.getElementById(outerDivId).style.visibility=="hidden") continue;
				if(document.getElementById(outerDivId).style.display=="none") continue;

				if(cnt.control.state.hasOwnProperty("errored"))
				{
					if(cnt.control.state.errored==true)	return false;
				}
			}

            if(cnt.control.items.items[0].isValid()==false)
            {
                return false;
            }
        }
        catch(e){}
    }
    return true;
}


function saveFormWithCallback(inCallback)
{
    ijf.main.gSaveFormCallback=inCallback;
    saveForm();
}

function saveForm(onSuccess, inFields, inForm, item)
{

    //before the save, verify if any fields is required AND is null...
    if(!ijf.main.isFormValid())
    {
		ijfUtils.hideProgress();
		try {if(ijf.main.gPopupFormHandle) ijf.main.gPopupFormHandle.unmask();} catch(e) {}

        ijfUtils.modalDialogMessage("Information", "The form has invalid fields and cannot be saved.  <br><br>Please provide values for all errored fields and save again.");
        return;
    }

  	if(ijf.main.allControlsClean())
  	{
		ijfUtils.hideProgress();
		return;
	}

    //check form business rules
    gSaveIncludesFile=false;

    //go though each field, determine if dirty...
    ijf.main.saveQueue = new Array();
    ijf.main.saveQueueBatch = new Array();

    for (var i in ijf.main.controlSet)
    {
        if((!ijf.main.controlSet.hasOwnProperty(i)) || (i.indexOf("_fld_")<0)) continue;
        var cnt = ijf.main.controlSet[i];
        if(cnt.dirty)
        {
                ijf.main.saveQueue[cnt.id]=cnt;
                cnt.prepForSave(ijf.main.saveQueueBatch);
        }
    }
    //process batch save
    try
    {
    	ijf.main.saveBatch(onSuccess,inFields,inForm, item);
	}
	catch(e)
	{
		ijfUtils.hideProgress();
        ijfUtils.modalDialogMessage("Error", "The form failed to save properly: " + e.message);
        return;
	}
}

function saveBatch(onSuccess,inFields,inForm, item)
{
    //batch queue has the sections to save and the new values.
    //prep it, then have new method for single async call
    var fields = {};
    if(inFields) fields=inFields;
    var attachment = null;
    var relations = null;

    for (var i in ijf.main.saveQueueBatch)
    {
        if(ijf.main.saveQueueBatch.hasOwnProperty(i))
        {
            var thisCnt = ijf.main.saveQueueBatch[i];
            if((thisCnt.field.controlType=="attachmentupload") || (thisCnt.field.controlType=="attachmentmanaged"))
            {
				if(!attachment) attachment=[];
				attachment.push(thisCnt);
				if(!thisCnt.field.dynamicAttachementManaged)	continue;
			}
			if(thisCnt.field.controlType=="issue relator")
			{
				relations = thisCnt.newVal;
				continue;
			}
            var thisSect = thisCnt.batchSaveSection;
			fields[thisSect.jiraField.id]=thisCnt.newVal;
        }
    }
    ijf.main.saveQueueBatch = [];


    //send the update batchRaw
    var fieldsOk=true;
    var saveRes = "OK";
	var comment = null;
	if(fields.comment)
	{
		if(fields.comment!="") comment = {"comment":[{"add":fields.comment}]}
		delete fields.comment;
	}
	var transition = null;
	if(fields.status)
	{
		transition = fields.status;
		delete fields.status;
	}

	var putObj = {};
	if(Object.keys(fields).length > 0) putObj.fields=fields;
	if(comment) putObj.update=comment;

    if(Object.keys(putObj).length > 0)
    {
		//this can be an ADD or an UPDATE.  If the current item exists it's an update, if not it's an Add
		if(item.key)
		{
			fieldsOk=false;
			//if only transition, add blank update..
			var jData = JSON.stringify(putObj);
			var tApi = "/rest/api/2/issue/"+item.key;
			saveRes = ijfUtils.jiraApiSync("PUT",tApi,jData);
			if(saveRes=="OK")
			{
				fieldsOk=true;
				//adding hook to save to additional target. if form
				//additionalSave ! null attempt to save...
				if(inForm.settings.hasOwnProperty("additionalSave"))
				{
					//saving additional target...
					putObj.key=item.key;
					putObj.form = inForm.name;
					jData = JSON.stringify(putObj);
					var addTarget = inForm.settings["additionalSave"];
					var onAddSuccess = function(d){ijfUtils.footLog("Additional Save Success");};
					var onAddError = function(e){
						ijfUtils.footLog("Additional Save Failed: " + JSON.stringify(e));
						//send email to admin if exists.
						if(inForm.formSet.settings["adminEmail"])
						{
							var onEmailSuccess = function(a) {
								ijfUtils.footLog("Fatal additional save, email sent");
							}
							var onEmailError = function(e) {
								ijfUtils.footLog("Fatal additional save, email FAILED");
								ijfUtils.modalDialogMessage("Fatal","Please stop and contact support.  Save to additional target failed");
							}
							ijfUtils.sendEmail(inForm.formSet.settings["adminEmail"], "JIRA Forms - Fatal Error in Group: " + inForm.formSet.name, "Save to additional target failed: " + item.key, true, onEmailSuccess, onEmailError);
						}
					};
					ijfUtils.getProxyCall(addTarget,"POST",jData,'application/json',onAddSuccess,onAddError);
				}
			}
		}
		else
		{
			//this is an add, JSON is a little different and it's a POST
        	putObj.fields.project = {"key":inForm.formSet.projectId};
        	putObj.fields.issuetype = {"name":inForm.issueType};
        	var jData = JSON.stringify(putObj);
			var tApi = "/rest/api/2/issue";
			saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
			//saveRes is the Key of the new issue if successfull,
			//set the item to the new Key and reload, will shift form to an Edit context
			try
			{
				if(saveRes.key)
				{
					ijf.main.itemId=saveRes.key;
					if(!item.key)item.key=saveRes.key;
					//adding hook to save to additional target. if form
					//additionalSave ! null attempt to save...
					if(inForm.settings.hasOwnProperty("additionalSave"))
					{
						//saving additional target...
						putObj.key=saveRes.key;
						putObj.form = inForm.name;
 						jData = JSON.stringify(putObj);
						var addTarget = inForm.settings["additionalSave"];
						var onAddSuccess = function(d){ijfUtils.footLog("Additional Save Success");};
					    var onAddError = function(e){ijfUtils.footLog("Additional Save Failed: " + JSON.stringify(e));};
						ijfUtils.getProxyCall(addTarget,"POST",jData,'application/json',onAddSuccess,onAddError);
					}
				}
				else
				{
					throw saveRes;
				}
			}
			catch(e)
			{
				ijfUtils.hideProgress();
				ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + saveRes);
				return;
			}
		}
     }

	//transition must be handled seperatly POST vs PUT
	var transOk = true;
	if(transition)
	{
		transOk = false;
		putObj = {"transition":transition};
		jData = JSON.stringify(putObj);
		tApi = "/rest/api/3/issue/"+item.key + "/transitions";

		saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
		if((!saveRes) || (saveRes=="OK"))
		{
			transOk=true;
		}
	}

	//issue relations
	var relationsOk = true;
	var relationsResult = "";
	if(relations)
	{

		var jsonString = {
				"type": {
					"name": "Relates"
				   },
				"inwardIssue": {
					"key": ijf.currentItem.key
				   },
				"outwardIssue": {
					"key": "tbd"
				   },
				"comment":{
					"body":"Linked related issue"
				  }
			};
		relations.forEach(function(rIssue)
		{
			jsonString.outwardIssue.key=rIssue.key;
			var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/3/issueLink",JSON.stringify(jsonString));
			if(saveRelRes!="OK")
			{
				relationsOk=false;
				relationsResult+=saveRelRes;
			}
		});
	}

	if((!fieldsOk) || (!transOk) || (!relationsOk))
	{
		ijfUtils.hideProgress();
        ijfUtils.modalDialogMessage("Error","Sorry, but something went wrong with the save: <br><br>" + saveRes + " <br>" + relationsResult);
        return;
	}

	//if comment or transition AND not attachment, refresh
	if(((comment)||(transition)) &&(!attachment))
	{
		onSuccess();
		return;
	}

	//fields done.  look for attachment
	var uploadResult = "OK";
	if(attachment)
	{
		attachmentOk = true;
		var errorMessages="";
		//upload attachment...
		for(var fi=0;fi<attachment.length;fi++)
		{
			var uForm = attachment[fi].control.form;
			var uploadFormId = attachment[fi].id.replace(",","_")+"UploadFileId";
			if(uForm.isValid())
			{
				var fd = new FormData(); //(jQuery(uploadFormId)[0]);
				var fcontainer = document.getElementById(uploadFormId);
				var files = fcontainer.files;

				for(var i=0;i<files.length;i++)
				{
					fd.append('file', files[i], files[i].name);
				};

				//fd.append("CustomField", "This is some extra data");
				jQuery.ajax({
					url: g_root + "/rest/api/3/issue/"+item.key+"/attachments",
					type: 'POST',
					async: false,
					headers: {"X-Atlassian-Token": "no-check"},
					data: fd,
						success: function(fp, o) {
							errorMessages += uploadFormId + " is OK";
						},
						failure: function(e, r) {
							attachmentOk = false;
							errorMessages +=  "ERROR: " + r.response.responseText;
						},
					cache: false,
					contentType: false,
					processData: false
				});
			}
			else
			{
				attachment = null;
				ijfUtils.hideProgress();
				ijfUtils.modalDialogMessage("Error","The upload field has an error and cannot be processed.");
				return;
			}
		}
		if(attachmentOk)
		{
			attachment = null;
			onSuccess();
		}
		else
		{
			attachment = null;
			ijfUtils.hideProgress();
			ijfUtils.modalDialogMessage("Error","The upload field has an error and cannot be processed. " + errorMessages);
			return;
		}
	}
	else
	{
		//ijf.currentItem=ijfUtils.getJiraIssueSync(item.key);
		onSuccess();
	}
}


function setAllDirty()
{
    for (var i in ijf.main.controlSet)
    {

        if((!ijf.main.controlSet.hasOwnProperty(i)) || (i.indexOf("_fld_")<0)) continue;

        var cnt =ijf.main.controlSet[i];
        cnt.container.style = fw.onChangeStyle;
        cnt.dirty=true;
        window.onbeforeunload= function() {return 'You have unsaved changes on this page...'};

    }
}

function setAllClean()
{
    for (var i in ijf.main.controlSet)
    {

        if((!ijf.main.controlSet.hasOwnProperty(i)) || (i.indexOf("_fld_")<0)) continue;

        var cnt =ijf.main.controlSet[i];
        if(cnt.dirty==false) continue;
        //cnt.container.style = {};
        cnt.container.style.cssText="";
        cnt.dirty=false;
        window.onbeforeunload= null;

    }
}

function allControlsClean()
{
    var ret = true;
    for (var i in ijf.main.controlSet)
    {
        if((!ijf.main.controlSet.hasOwnProperty(i)) || (i.indexOf("_fld_")<0)) continue;
        var cnt =ijf.main.controlSet[i];
        if(cnt.dirty) ret=false;
    }

    return ret;
}


function resetForm()
{
    ijf.currentItem=null;
    ijf.main.processSetup("ijfContent");
}


function closeForm()
{
	ijf.currentItem=null;
    window.g_itemId='';
    ijf.main.itemId='';
    ijf.main.item=null;
    window.g_formId = '';
    ijf.main.processSetup("ijfContent");
}


function loadModel(data)
{
    exercise = new Exercise(data);
}


function setItemNull()
{
    item=null;
}


return {
	gEventControl:gEventControl,
	setAllDirty:setAllDirty,
	currentUser:currentUser,
	setAllClean:setAllClean,
	allControlsClean:allControlsClean,
	saveBatch: saveBatch,
	callbacks: callbacks,
    saveQueue: saveQueue,
    isFormValid:isFormValid,
    saveQueueBatch: saveQueueBatch,
    loadItem:loadItem,
	controlChanged:controlChanged,
	gNavigateOnChange:gNavigateOnChange,
	saveForm:saveForm,
	renderForm:renderForm,
	gNodes:gNodes,
	resetForm:resetForm,
	init: init,
	outerForm: outerForm,
	processSetup:processSetup,
	closeForm:closeForm
};


})();
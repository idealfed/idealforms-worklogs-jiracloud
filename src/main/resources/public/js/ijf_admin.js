var ijf = ijf || {};
ijf.admin = {

	cwfAdmin_thisField:"",
	//cwfAdmin_fieldId:"",
	cwfAdmin_thisTable:"",
	cwfAdmin_form:null,

helpLink:function(inLabel, inCaller)
{

	//get the named control type
	if(inCaller)
	{
 		var iList = Ext.getCmp(inCaller).up();
 		//id of the controlType field
		var cType = iList.items.items[3].getValue();

		if(!cType)
		{
			ijfUtils.modalDialogMessage("Information","Please select a control type then click a help link.");
			return;
		}
	}
	else
	{
		var cType = inLabel;
	}

	switch(cType)
	{
		//field styles
		case "itemfolders":
			    window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+issue+folders");
		break;
		case "issue relator":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+issue+relator");
		break;
		case "muiAppBar":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiAppBar");
		break;
		case "muiButton":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiButton");
		break;
		case "muiCardList":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiCardList");
		break;
		case "muiCommentList":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiCommentList");
		break;
		case "muiCommentSuperList":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiCommentSuperList");
		break;
		case "muiDatebox":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiDatebox");
		break;
		case "muiDrawer":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiDrawer");
		break;
		case "muiGrid":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiGrid");
		break;
		case "muiHistoryList":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiHistoryList");
		break;
		case "muiHtml":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiHtml");
		break;
		case "muiIcon":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiIcon");
		break;
		case "muiRadio":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiRadio");
		break;
		case "muiSelect":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiSelect");
		break;
		case "muiTextbox":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiTextbox");
		break;
		case "muiTextarea":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+muiTextarea");
		break;
		case "Reference Editor":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Reference+Editor");
		break;
		case "attachmentlisttree":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+attachmentlisttree");
		break;
		case "itemlistHTML":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+itemlistHTML");
		break;
		case "GRIDHTML":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+GRIDHTML");
		break;
		case "historylist":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+historylist");
		break;
		case "attachmentlistgrid":
			window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+attachmentlistgrid");
		break;
		case "reportbutton":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+reportbutton");
		break;
		case "GRID":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+GRID");
		break;
		case "itemtree":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+itemtree");
		break;
		case "textbox":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+textbox");
		break;
		case "attachmentlist":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+attachmentlist");
		break;
		case "attachmentmanaged":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+attachmentmanaged");
		break;
		case "attachmentupload":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+attachmentupload");
		break;
		case "button":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+button");
		break;
		case "checkbox":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+checkbox");
		break;
		case "commentlist":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+commentlist");
		break;
		case "datebox":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+datebox");
		break;
		case "dropdown":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+dropdown");
		break;
		case "dropdownwithpicker":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+dropdownwithpicker");
		break;
		case "html":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+html");
		break;
		case "iframe":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+iframe");
		break;
		case "itemlist":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+itemlist");
		break;
		case "formbuttons":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+formbuttons");
		break;
		case "formbuttonsforpopup":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+formbuttonsforpopup");
		break;
		case "multiselect":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+multiselect");
		break;
		case "navigatetoform":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+navigatetoform");
		break;
		case "subform":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+subform");
		break;
		case "openurl":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+openurl");
		break;
		case "openpopform":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+openpopform");
		break;
		case "radio":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+radio");
		break;
		case "tabmenu":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+tabmenu");
		break;
		case "textarea":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+textarea");
		break;
		case "userpicker":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+userpicker");
		break;
		case "chart-pie":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+chart-pie");
		break;
		case "chart-bar":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+chart-bar");
		break;
		//layout settings
		case "rowcount":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "columncount":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "columnspans":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "rowspans":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "columnwidths":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "headleft":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "headercenter":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "headerright":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "outerstyle":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "innerstyle":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "headerstyle":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "tabtitle":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "onload":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		case "additionalSave":
		    	window.open("http://confluence.idealfed.com/display/IFD/Ideal+Forms+-+Layout+Setting+Options");
		break;
		default:
			window.open("http://www.idealfed.com/controlReference.html");
	}

},
editJson:function (fieldId)
{
	if(!fieldId) return;
	var isJson = true;
    var inField = Ext.getCmp(fieldId);

    var fValue = inField.getValue();
    var jsonText = "";
try
{

    if(fValue)
    {
          var jsonVal = JSON.parse(fValue);
          jsonText = JSON.stringify(jsonVal,null,4);
	  }
	  else
	  {
		  jsonText = "";
	  }
}
catch(e)
{

	/*
	var runError = function()
	{
	  ijfUtils.modalDialogMessage("Error","Field is not valid JSON or unable to get field");
  	  return;
    }
    window.setTimeout(runError,200);
    return;
    */
     isJson = false;
    jsonText = fValue.replace(/;/g,";\n");
}
    ijf.admin.dWin = new Ext.Window({
        layout: 'vbox',
        title: "JSON and TEXT editor",
        width: 900,
        height:850,
        closable: true,
        items: [
            {
				xtype: 'textarea',
				labelAlign: 'left',
				labelWidth: 100,
				margin: '0 5 0 5',
				allowBlank:true,
				hideLabel: true,
				width: '100%',
				height: '100%',
				value: jsonText,
				listeners: {
					change: function(f, n, o){
						jsonText = n;
					}}
			}
        ],
        buttons:[{
            text:'OK',
            handler: function(f,i,n){


				if(isJson)
				{
					try
					{
						var newJson = JSON.parse(jsonText);
						inField.setValue(JSON.stringify(newJson));
						ijf.admin.dWin.close();
					}
					catch(e)
					{
						ijfUtils.modalDialogMessage("Error","Cannot parse JSON");
						return;
					}
				}
				else
				{
					jsonText = jsonText.replace(/\n/g,"");
					inField.setValue(jsonText);
					ijf.admin.dWin.close();
				}
            }},
            {
                text:'Cancel',
                handler: function(){
                    ijf.admin.dWin.close();
                }}
        ],
        modal: true
    });
    var showIt = function()
    {
      ijf.admin.dWin.show();
      ijf.admin.dWin.setY(window.pageYOffset+25);
    }
    window.setTimeout(showIt,200);

},

addEditForm:function (sRow)
{
	if(!sRow) return;
	var originalSnippet = sRow.data.snippet;

    ijf.admin.dWin = new Ext.Window({
        layout: 'vbox',
        title: "Javascript business rule editor",
        width: 900,
        height:850,
        closable: true,
        items: [
            {
                xtype: 'textfield',
                labelAlign: 'left',
                fieldLabel: 'Function Name',
                labelWidth: 100,
                labelStyle: "color:darkblue",
  				margin: '4 0 0 10',
                width: 400,
                value: sRow.data.name,
                allowBlank:false,
                listeners: {
					                afterrender: function(f)
					                {
					                    this.validate();
                },
                    change: function(f,n,o){
                        sRow.data.name = n;
                    }
                }
            },
            {
				html: "Javascript",
				border: false,
				bodyStyle: "color:darkblue",
				width: 580,
				margin: '0 5 0 5',
				frame: false,
            	xtype: "panel"},
            {
				xtype: 'textarea',
				labelAlign: 'left',
				labelWidth: 100,
				margin: '0 5 0 5',
				allowBlank:true,
				hideLabel: true,
				width: '100%',
				height: '100%',
				value: sRow.data.snippet,
				listeners: {
					change: function(f, n, o){
						sRow.data.snippet = n;
					}}
			}
        ],
        buttons:[{
			text:'Save',
			handler: function(f,i,n){

				if(sRow.data.name=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the name cannot be blank."); return;}
				if(sRow.data.snippet=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the javascript cannot be blank."); return;}

				var sId = sRow.data.iid;
				//this guy has not been added yet

				sRow.data.status ='saving';
				var sendData = {
					snippetId: sId,
					formSetId: ijf.admin.cwfAdmin_form.formSet.id,
					name: sRow.data.name,
					snippet: JSON.stringify(sRow.data.snippet)
				};
				var sJson = JSON.stringify(sendData);

				var sRes =  ijfUtils.saveJiraFormSync(sJson,"saveSnippet");

				if(jQuery.isNumeric(sRes))
				{
					sRow.data.status ='saved';
					sRow.data.iid=sRes;
					sRow.commit();
					originalSnippet =sRow.data.snippet;
				}
				else
				{
					rec.data.status = "Error";
					ijfUtils.modalDialogMessage("Error","Unable to save the snippet: " + sRes);
				}

			}},{
            text:'Save Done',
            handler: function(f,i,n){

				if(sRow.data.name=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the name cannot be blank."); return;}
				if(sRow.data.snippet=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the javascript cannot be blank."); return;}

				var sId = sRow.data.iid;
					 //this guy has not been added yet

				sRow.data.status ='saving';
				var sendData = {
					snippetId: sId,
					formSetId: ijf.admin.cwfAdmin_form.formSet.id,
					name: sRow.data.name,
					snippet: JSON.stringify(sRow.data.snippet)
				};
				var sJson = JSON.stringify(sendData);

				var sRes =  ijfUtils.saveJiraFormSync(sJson,"saveSnippet");

				if(jQuery.isNumeric(sRes))
				{
					sRow.data.status ='saved';
					sRow.data.iid=sRes;
					sRow.commit();
					ijf.admin.dWin.close();
				}
				else
				{
					rec.data.status = "Error";
					ijfUtils.modalDialogMessage("Error","Unable to save the snippet: " + sRes);
				}

            }},
            {
                text:'Cancel',
                handler: function(){
					sRow.data.snippet = originalSnippet;
                    ijf.admin.dWin.close();
                }}
        ],
        modal: true
    });
    ijf.admin.dWin.show();
    ijf.admin.dWin.setY(window.pageYOffset+25);

},
    readConfigFormFile:function(inFile)
	{
		var input = event.target;

		var reader = new FileReader();
		reader.onload = function(){
		   try
 		   {
			  //need to parse this out, //clear extjs and render Form Admin.
			  var tForm = JSON.parse(reader.result);

			  var thisF = {};

			  thisF.name = ijf.admin.cwfAdmin_form.name;
			  thisF.formType = ijf.admin.cwfAdmin_form.formType;
			  thisF.formSet = ijf.admin.cwfAdmin_form.formSet;
			  thisF.testIssue = ijf.admin.cwfAdmin_form.testIssue;
			  thisF.issueType = ijf.admin.cwfAdmin_form.issueType;
			  thisF.id = ijf.admin.cwfAdmin_form.id;

				if(tForm.hasOwnProperty("formSettings")) thisF.rawSettings = JSON.parse(JSON.parse(tForm.formSettings));
				if(tForm.hasOwnProperty("fields")) thisF.rawFields = JSON.parse(JSON.parse(tForm.fields));
                thisF.settings=[];
				if(!thisF.rawSettings) thisF.rawSettings=[];
				if(!thisF.rawFields) thisF.rawFields=[];
				thisF.rawSettings.forEach(function(s){
					if(!s.name) return;
					thisF.settings[s.name]=s.value;
				});
  			    thisF.fields=[];
				thisF.rawFields.forEach(function(s){
					if(!s.formCell) return;
					thisF.fields[s.formCell]=s;
				});

			  ijfUtils.clearExt();
			  Ext.destroy(ijf.admin.cwfAdmin_settingsPanel);
			  Ext.destroy(ijf.lists.dWin);
			  ijf.admin.renderFormAdmin(thisF);
			  ijfUtils.modalDialogMessage("WARNING","You have loaded a form configuration file.  To store these settings you must Save the settings; doing so will overwirte the settings and fields of this form on the server.  Refresh browser to undo.");
			}
			catch(e)
			{
				ijfUtils.modalDialogMessage("Error","Problem loading the form file: " + e.message);
			}

		};
  		reader.readAsText(input.files[0]);
	},
	refreshFieldList:function()
	{
		var fArray = [];
		Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
		{
			//cwfAdmin_fieldId = f.iid;
			var f = ijf.admin.cwfAdmin_form.fields[fk];
			ijf.admin.cwfAdmin_thisField = f;
			var lType = f.controlType;
			if(f.hasOwnProperty("rawPermissions"))
			{
				if(f.rawPermissions.indexOf("enabled\":true")>-1) lType = lType + " (p)";
			}
			fArray.push({"iid":f.iid, "cell":f.formCell,"type":lType,"source":f.dataSource});
		});
		ijf.admin.listView.getStore().loadData(fArray);
	},
	renderFormAdmin:function(inForm)
	{
		var outStr = "Editing form: " + window.g_formId + "<br>";

		if(!ijf.main.outerForm)
		{
			//look for defaultForm in settings
			ijfUtils.footLog("No form");
			jQuery('#ijfContent').html("<div style='text-align: center; color: royalblue'>" +
				"Sorry but no form or no issue is constructed.<br>" +
				"Please make sure to include these in your URL</div>");
			return;
		}
		else
		{
			var thisForm = inForm; //ijf.fw.forms[window.g_formId];

			//key fields with ID
			thisForm.origFields = thisForm.fields;
			thisForm.fields=[];
			var fId = 0;
			Object.keys(thisForm.origFields).forEach(function(fk){
				thisForm.fields[fId]=thisForm.origFields[fk];
				thisForm.fields[fId].iid=fId++;
			});

			ijf.admin.cwfAdmin_form = thisForm;

		}

		//init form settings
		if(!thisForm.settings.headerLeft) thisForm.settings.headerLeft="";
		if(!thisForm.settings.headerCenter) thisForm.settings.headerCenter="";
		if(!thisForm.settings.headerRight) thisForm.settings.headerRight="";

		//get form or die
		var formTypeLookup = ["Edit","Add"];
		var formType = "Edit";

	     var fileLoad = "<form enctype='multipart/form-data' id='adminattachmentUploadFormId'><input id='adminattachmentUploadFileId' type='file' name='file' onChange='ijf.admin.readConfigFormFile(event)';></form>";

	//Prep for permissions
		if(!thisForm.settings.permissions)
		{
			thisForm.permissions =
				{"enabled":false,
				 "states":{}
				};
		}
		else
		{
			thisForm.permissions=JSON.parse(thisForm.settings.permissions);
		}

		var tempAllGroups = ijfUtils.jiraApiSync("GET","/rest/api/2/groups/picker?maxResults=1000",null);
		var allGroupNames = tempAllGroups.groups.map(function(g){return {"role":g.name};});

		var loadPermissions = function()
		{
		};

		var updateTables = function(inState,inObj)
		{
			if(!inState)
			{
				editAvailStore.loadData([]);
				editAssStore.loadData([]);
				viewAvailStore.loadData([]);
				viewAssStore.loadData([]);
				wfsNameStore.loadData(Object.keys(inObj.permissions.states).map(function(s){return {"state":s};}));
				return;
			}

			if(!inObj.permissions.states.hasOwnProperty(inState)) return;
			wfsNameStore.loadData(Object.keys(inObj.permissions.states).map(function(s){return {"state":s};}));

			var cState = inObj.permissions.states[inState];
			var tmpArr = allGroupNames.slice(0);
			editAssStore.loadData(cState.edit.map(function(g){
					tmpArr = tmpArr.reduce(function(inArr,i){if(i.role==g) return inArr;inArr.push(i);	return inArr;},[]);
					return {"role":g};
					})
			);
			editAvailStore.loadData(tmpArr);

			tmpArr = allGroupNames.slice(0);
			viewAssStore.loadData(cState.view.map(function(g){
					tmpArr = tmpArr.reduce(function(inArr,i){if(i.role==g) return inArr;inArr.push(i);	return inArr;},[]);
					return {"role":g};
					})
			);
			viewAvailStore.loadData(tmpArr);
		};

	    var cPermState ="";
		var wfsNameStore = new Ext.data.Store({
			fields: ['state']
		});

		var editAvailStore = new Ext.data.Store({
			fields: ['role']
		});
		var editAssStore = new Ext.data.Store({
			fields: ['role']
		});
		var viewAvailStore = new Ext.data.Store({
			fields: ['role']
		});
		var viewAssStore = new Ext.data.Store({
			fields: ['role']
		});
		var newStateName="";


		if(ijf.admin.cwfAdmin_form.formType) formType =ijf.admin.cwfAdmin_form.formType;
		var cntPanel = new Ext.FormPanel({
			labelAlign: 'left',
			title: ijf.admin.cwfAdmin_form.name + ": Settings, download and upload",
			border :false,
			layout: 'vbox',
			frame:false,
			collapsible: true,
			collapsed: true, //set to true when done
			width: 900,
			buttonAlign: 'left',
			//hidden: hideField,
			margin: '5 0 0 0',
			bodyStyle: "border-top:none",
			header:{
						titlePosition: 0,
						items:[{
							xtype:'button',
							hidden: false,
							text:"Form Permissions",
							handler: function(){

								//list of workflow status
								//don't know how to handle, not in the API
								wfsNameStore.loadData(Object.keys(thisForm.permissions.states).map(function(s){
											return {"state":s};
								}));

								var grps = ijfUtils.jiraApiSync("GET","/rest/api/2/groups/picker",null);

					   			var headStyle =  " style='background:lightgray;border-bottom:solid blue 2px' ";
								var htmlOut = "hi";
								var fieldRefWin = new Ext.Window({
								layout: 'vbox',
								title: "Form Security: " + thisForm.name,
								width: 1100,
								height:570,
								listeners: {
									show: loadPermissions,
									close: function()
									{
										cPermState=null;
										updateTables(cPermState,thisForm);
									}
								},
								closable: true,
								items: [
									{
									xtype: "checkboxfield",
									boxLabel: "Form Security Enabled",
									value : thisForm.permissions.enabled,
									listeners: {
										change: function(f,n,o)
										{
											thisForm.permissions.enabled=n;
										}
								    },
									name: "secEnabled",
									margin: '0 0 0 10',
									inputValue: 1},
									{
										layout: 'hbox',
										border: false,
										frame: false,
										xtype: "panel",
										items: [{
												xtype: 'textfield',
												labelAlign: 'left',
												fieldLabel: 'Workflow State',
												labelWidth: 100,
												labelStyle: "color:darkblue",
												margin: '0 0 0 10',
												width: 300,
												value: "",
												listeners: {
													change: function(f,n,o){
															newStateName = n;
														}
													}
							            		},
							            		{
													xtype: 'button',
													margin: '0 0 0 10',
													text:'Add',
													handler: function(){
														if(newStateName)
														{
															//make sure unique...
															if(thisForm.permissions.states.hasOwnProperty(newStateName))
															{
																ijfUtils.modalDialogMessage("Information","Please enter a name that does not exist.");
															}
															else
															{
																thisForm.permissions.states[newStateName]={"view":[],"edit":[]};
																cPermState=newStateName;
																updateTables(cPermState,thisForm);
															}
														}
                								}}
						            		]
						            },
						            {
										xtype: "panel",
										html: "<hr>",
										width: "100%"
										},
									{
										xtype: "panel",
										layout: "hbox",
										width: "100%",
										items:[
											{
												xtype: "panel",
												layout: "vbox",
												width: 260,
												items:
													[
														{	xtype: "gridpanel",
															store: wfsNameStore,
															style: "border: solid black 2px",
															height:400,
															margin: "0 20px 20px 20px",
															width: 230,
															id: "stateTableId",
															columns: [{
																		header: 'Workflow State',
																		width:"100%",
																		hidden: false,
																		dataIndex: "state"
																	}],
															listeners: {
																select:function(view, record, eops) {
																	cPermState = record.data.state;
																	updateTables(cPermState,thisForm);
																}
															}
														},
														{
															xtype:'button',
															hidden: false,
															text:"Delete",
															handler: function(){
																if(cPermState)
																{
																	delete ijf.admin.cwfAdmin_form.permissions.states[cPermState];
																	cPermState="";
																	updateTables(null,thisForm);
																}

															}
														}
													]
											},
											{
												xtype: "panel",
												layout: "vbox",
												width: 750,
												items:[
													{
														xtype: "panel",
														width: "100%",
														layout: "hbox",
														items:[{
															xtype: "panel",
															html: "Can Edit: ",
															bodyStyle: "width:70px;font-weight:bold",
															margin: "0 20px 0 20px",
															},
															{	xtype: "gridpanel",
																	store: editAvailStore,
																	style: "border: solid black 2px",
																	height:200,
																	margin: "0 20px 20px 20px",
																	width:300,
																	id: "permTableEditAvailRolesId",
																	columns: [{
																				header: 'Available Role',
																				width:"100%",
																				hidden: false,
																				dataIndex: "role"
																			}],
																	listeners: {
																		rowdblclick:function(view, record, eops) {
																			//remove this, add partner
																			if(!record.data.role) return;
																			if(!cPermState) return;
																			var newRole=record.data.role;
																			ijf.admin.cwfAdmin_form.permissions.states[cPermState].edit.push(newRole);
																			updateTables(cPermState,thisForm);
																		}
																	}
																},
																{	xtype: "gridpanel",
																	store: editAssStore,
																	style: "border: solid black 2px",
																	height:200,
																	width:300,
																	id: "permTableEditAssRolesId",
																	columns: [{
																				header: 'Assigned Role',
																				width:"100%",
																				hidden: false,
																				dataIndex: "role"
																			}],
																	listeners: {
																		rowdblclick:function(view, record, eops) {
																			//remove this, add partner
																			if(!record.data.role) return;
																			if(!cPermState) return;
																			var newRole=record.data.role;
																			ijf.admin.cwfAdmin_form.permissions.states[cPermState].edit=ijf.admin.cwfAdmin_form.permissions.states[cPermState].edit.filter(function(item){
																				return item !== newRole;
																			});
																			updateTables(cPermState,thisForm);
																		}
																	}
																}

														]
													},
													{
																xtype: "panel",
																width: "100%",
																layout: "hbox",
																items:[{
																	xtype: "panel",
																	html: "Can View: ",
																	bodyStyle: "width:80px;font-weight:bold",
																	margin: "0 20px 0 20px",
																	},
																	{	xtype: "gridpanel",
																			store: viewAvailStore,
																			style: "border: solid black 2px",
																			height:200,
																			margin: "0 20px 0 20px",
																			width:300,
																			id: "permTableViewAvailRolesId",
																			columns: [{
																						header: 'Available Role',
																						width:"100%",
																						hidden: false,
																						dataIndex: "role"
																					}],
																			listeners: {
																				rowdblclick:function(view, record, eops) {
																					//remove this, add partner
																					if(!record.data.role) return;
																					if(!cPermState) return;
																					var newRole=record.data.role;
																					ijf.admin.cwfAdmin_form.permissions.states[cPermState].view.push(newRole);
																					updateTables(cPermState,thisForm);
																				}
																			}
																		},
																		{	xtype: "gridpanel",
																			store: viewAssStore,
																			style: "border: solid black 2px",
																			height:200,
																			width:300,
																			id: "permTableViewAssRolesId",
																			columns: [{
																						header: 'Assigned Role',
																						width:"100%",
																						hidden: false,
																						dataIndex: "role"
																					}],
																			listeners: {
																				rowdblclick:function(view, record, eops) {
																					//remove this, add partner
																					if(!record.data.role) return;
																					if(!cPermState) return;
																					var newRole=record.data.role;
																					ijf.admin.cwfAdmin_form.permissions.states[cPermState].view=ijf.admin.cwfAdmin_form.permissions.states[cPermState].edit.filter(function(item){
																						return item !== newRole;
																					});
																					updateTables(cPermState,thisForm);
																				}
																			}
																		}

																]
														}
												]
											},
										]
									},



								],
								modal: true
								});
								fieldRefWin.show();
							}
						}]
			},
			items: [
			{
				xtype: 'textfield',
				labelAlign: 'left',
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Form Name",
				fieldStyle: "background:lightgray",
				readOnly: true,
				//labelSeparator: ijfUtils.helpLink("formName"),
				labelStyle: "color:darkblue",
				width: 400,
				value: thisForm.name,
				id: "adminFormSettings_formNameId"
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 100,
					margin: '4 0 0 10',
					readOnly: true,
					fieldLabel: "Issue Type",
					fieldStyle: "background:lightgray",
					//labelSeparator: ijfUtils.helpLink("issueType"),
					labelStyle: "color:darkblue",
					width: 200,
					value: thisForm.issueType,
					id: "adminFormSettings_issueTypeId"
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 100,
					margin: '4 0 0 10',
					readOnly: true,
					fieldLabel: "Test Issue",
					fieldStyle: "background:lightgray",
					//labelSeparator: ijfUtils.helpLink("testIssue"),
  				    labelStyle: "color:darkblue",
					width: 200,
					value: thisForm.testIssue,
					id: "adminFormSettings_testIssueId"
				},
				{
					xtype: 'combobox',
					labelAlign: 'left',
					forceSelection: true,
					store: formTypeLookup,
					labelWidth: 100,
					margin: '4 0 0 10',
					readOnly: true,
					fieldLabel: "Form Type",
					fieldStyle: "background:lightgray",
					//labelSeparator: ijfUtils.helpLink("formType"),
					labelStyle: "color:darkblue",
					triggerAction: 'all',
					width: 200,
					value: formType,
					id: "adminFormSettings_formTypeId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.formType = n;
							f.addCls("cwf-dirty");
										}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 100,
					fieldLabel: "Form Group",
					//labelSeparator: ijfUtils.helpLink("formGroup"),
					fieldStyle: "background:lightgray",
  				    labelStyle: "color:darkblue",
					width: 400,
					margin: '4 0 0 10',
					readOnly: true,
					value: ijf.admin.cwfAdmin_form.formSet.projectName,
					id: "adminFormSettings_formGroupId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.formSet.projectName = n;
							f.addCls("cwf-dirty");
						}}
				},{
					html: fileLoad,
					frame: false,
					hidden: true,
					border: false,
					xtype: "panel"}],
				buttons: [
				{
				            xtype: 'button',
				            fieldLabel: 'ccc',
				            text: 'Upload Form',
				            id: 'ijfAdminUploadButtonId',
				            listeners: {
				                click: function(f,n,o){
									jQuery('#adminattachmentUploadFileId').trigger('click');
				                }
				            }
        			},
				{
				            xtype: 'button',
				            fieldLabel: 'ccc',
				            text: 'Download Form',
				            id: 'ijfAdminDownloadButtonId',
				            listeners: {
				                click: function(f,n,o){

									var settingsOut = new Array();
									var fieldsOut = new Array();
									for(var j in ijf.admin.cwfAdmin_form.settings)
									{
										if(!ijf.admin.cwfAdmin_form.settings.hasOwnProperty(j)) continue;
										settingsOut.push({name:j,value:thisForm.settings[j],comment:""});
									};
									for(var j in thisForm.fields)
									{
										if(!thisForm.fields.hasOwnProperty(j)) continue;
										var fObj={};
										Object.keys(thisForm.fields[j]).forEach(function(k)
										{
											if(k=="form") return;
											fObj[k]=thisForm.fields[j][k];
										});

										fieldsOut.push(fObj);
									};
									var jOut = {
										id: ijf.admin.cwfAdmin_form.id,
										testIssue: ijf.admin.cwfAdmin_form.testIssue,
										formType: ijf.admin.cwfAdmin_form.formType,
										formAnon: ijf.admin.cwfAdmin_form.formAnon,
										issueType: ijf.admin.cwfAdmin_form.issueType,
										name: ijf.admin.cwfAdmin_form.name,
										fields: JSON.stringify(JSON.stringify(fieldsOut)),
										formSettings: JSON.stringify(JSON.stringify(settingsOut))
										};
									//output....ijf.admin.cwfAdmin_form
										var outStr = JSON.stringify(jOut);
										var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
										saveAs(blob,ijf.admin.cwfAdmin_form.name + ".json")
				                }
				            }
        			}
				]
			});

	   // showProgress();
	   // mwf_reloadFramework(fw,inContainerId, false);
		//mwf_reloadFramework(setup, "mwfContent", true);

		//bootstrap to 1 row and 1 column
		if(!thisForm.settings["rows"])
		{
			thisForm.settings["rows"]= "1";
			ijf.admin.cwfAdmin_form.settings["rows"]="1";
		}
		if(!thisForm.settings["columns"])
		{
			thisForm.settings["columns"]= "1";
			ijf.admin.cwfAdmin_form.settings["columns"]="1";
		}


		var pnl = new Ext.FormPanel({
			labelAlign: 'left',
			border:true,
			collapsible: true,
			collapsed: true, //set to true when done
			title: "Form Layout",
			margin: '5 0 0 0',
			width: 900,
			//hidden: hideField,
			//bodyStyle: l_Style,
			items: [{
				xtype: 'textfield',
				labelAlign: 'left',
				labelWidth: 120,
				fieldLabel: "Row Count",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"rowcount\",null)>",
				width: 200,
				value: thisForm.settings["rows"],
				id: "adminFormSettings_rowsId",
				listeners: {
					change: function(f, n, o){
						ijf.admin.cwfAdmin_form.settings["rows"] = n;
						f.addCls("cwf-dirty");
					}
				}},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Column Count",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"columncount\",null)>",
					width: 200,
					value: thisForm.settings["columns"],
					id: "adminFormSettings_colsId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["columns"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Column Spans",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"columnspans\",null)>",
					width: 850,
					value: thisForm.settings["columnSpans"],
					id: "adminFormSettings_colSpanId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["columnSpans"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Row Spans",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"rowspans\",null)>",
					width: 850,
					value: thisForm.settings["rowSpans"],
					id: "adminFormSettings_rowSpanId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["rowSpans"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Column Widths",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"columnwidths\",null)>",
					width: 850,
					value: thisForm.settings["columnWidths"],
					id: "adminFormSettings_colWidthId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["columnWidths"] = n;
							f.addCls("cwf-dirty");
						}}
				},

				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Header Left",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"headleft\",null)>",
					width: 850,
					value: thisForm.settings["headerLeft"],
					id: "adminFormSettings_headerLeftId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["headerLeft"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Header Center",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"headercenter\",null)>",
					width: 850,
					value: thisForm.settings["headerCenter"],
					id: "adminFormSettings_headerCenterId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["headerCenter"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Header Right",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"headerright\",null)>",
					width: 850,
					value: thisForm.settings["headerRight"],
					id: "adminFormSettings_headerRightId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["headerRight"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Outer Style",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"outerstyle\",null)>",
					width: 850,
					value: thisForm.settings["outerContainerStyle"],
					id: "adminFormSettings_outerStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["outerContainerStyle"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Inner Style",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"innerstyle\",null)>",
					width: 850,
					value: thisForm.settings["outerTableStyle"],
					id: "adminFormSettings_innerStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["outerTableStyle"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Header Style",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"headerstyle\",null)>",
					width: 850,
					value: thisForm.settings["title_style"],
					id: "adminFormSettings_titleStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["title_style"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Tab Title",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"tabtitle\",null)>",
					width: 850,
					value: thisForm.settings["tabTitle"],
					id: "adminFormSettings_tabTitleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["tabTitle"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "On Load",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"onload\",null)>",
					width: 850,
					value: thisForm.settings["onLoad"],
					id: "adminFormSettings_onLoadId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["onLoad"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Before Load",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"beforeload\",null)>",
					width: 850,
					value: thisForm.settings["beforeLoad"],
					id: "adminFormSettings_beforeLoadId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["beforeLoad"] = n;
							f.addCls("cwf-dirty");
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Additional Save",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"additionalSave\",null)>",
					width: 850,
					value: thisForm.settings["additionalSave"],
					id: "adminFormSettings_additionalSaveId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_form.settings["additionalSave"] = n;
							f.addCls("cwf-dirty");
						}}
				}]
		});



		//now render the fields....
		//do a side by side panel with grid selector on left and fields on right.
		if(!Ext.ClassManager.isCreated('gridFieldFieldsArray'))
		{
			Ext.define('gridFieldFieldsArray', {
				extend: 'Ext.data.Model',
				fields: [
					{name: 'iid',  type: 'string'},
					{name: 'cell',  type: 'string'},
					{name: 'type', type: 'string'},
					{name: 'source', type: 'string'}
				]
			});
		}


		ijf.admin.cwfAdmin_thisField = {};

		var fieldStore = new Ext.data.Store({
			model: 'gridFieldFieldsArray'
		});

		var fArray = [];
		Object.keys(thisForm.fields).forEach(function(fk)
		{
			//cwfAdmin_fieldId = f.iid;
			var f = thisForm.fields[fk];
			ijf.admin.cwfAdmin_thisField = f;
			var lType = f.controlType;
			if(f.hasOwnProperty("rawPermissions"))
			{
				if(f.rawPermissions.indexOf("enabled\":true")>-1) lType = lType + " (p)";
			}
			fArray.push({"iid":f.iid, "cell":f.formCell,"type":lType,"source":f.dataSource});
		});
		fieldStore.loadData(fArray);

		   var l_tbar=[];

			l_tbar.push({
				iconCls: 'icon-user-add',
				text: 'Add',
				align: 'center',
				handler: function(){
					var rec = Ext.create('gridFieldFieldsArray');
					var ts =new Date().getTime();
					rec.data.iid=ts;
					ijf.admin.listView.getStore().insert(0, rec);
					//get the max cell, incriment by one and add this to last row first cell
					var rowNum = Ext.getCmp('adminFormSettings_rowsId').getValue()/1+1;
					rec.data.cell=rowNum+",1";
					Ext.getCmp('adminFormSettings_rowsId').setValue(rowNum);
				    ijf.admin.cwfAdmin_form.fields[rec.data.iid]={"iid":ts,"formCell":rowNum+",1","controlType":"html","dataSource":"New Cell"};
   					//ijf.admin.listView.getView().refresh();
   					ijf.admin.refreshFieldList();
				}
			});

			l_tbar.push({
				iconCls: 'icon-user-add',
				text: 'Insert',
				handler: function(){
					insertFieldRow(true);
				}
			});

			l_tbar.push({
				ref: '../removeBtn',
				iconCls: 'icon-user-delete',
				text: 'Remove',
				handler: function(){
					//editor.stopEditing();
					var s = ijf.admin.listView.getSelectionModel().getSelection();
					for(var i = 0, r; r = s[i]; i++){
						ijf.admin.listView.getStore().remove(r);
						delete ijf.admin.cwfAdmin_form.fields[r.data.iid];
					}
					ijf.admin.listView.getView().refresh();
				}
			});
			l_tbar.push({
				text: 'Refresh',
				handler: function(){
					ijf.admin.refreshFieldList();
					ijf.admin.listView.getView().refresh();
				}
			});


		var insertFieldRow = function(above)
		{
				var s = ijf.admin.listView.getSelectionModel().getSelection()[0];
				if(!s) return;

				var sourceCell = s.data["cell"].split(",");

				var rec = Ext.create('gridFieldFieldsArray');
				var tRow = (above) ? (sourceCell[0]/1) : (sourceCell[0]/1+1);
				var tCell = tRow + "," + sourceCell[1];
				rec.data.cell=tCell;
				var ts =new Date().getTime();
   			    rec.data.iid=ts;

   			    tRow =(sourceCell[0]/1);
				if(!above) tRow++;
				//create a new record inf fields...
				ijf.admin.cwfAdmin_form.fields[rec.data.iid]={"iid":rec.data.iid,"formCell":tCell,"controlType":"html","dataSource":"New Cell"};

				//rip through an set all the cells correctly
				var maxRows = 0;


				ijf.admin.listView.getStore().each(function(r){
					var tCell = r.data.cell.split(",");
					if(maxRows < (tCell[0]/1)) maxRows=tCell[0]/1;
					if((tCell[0]/1)>=tRow){
						var newCell = (tCell[0]/1+1)+","+tCell[1];
						r.data.cell=newCell;
						var tf = ijf.admin.cwfAdmin_form.fields[r.data.iid];
						tf.formCell =newCell;
					};
				});

				//adjust total rows
				if((Ext.getCmp('adminFormSettings_rowsId').getValue()/1)<= maxRows)
				{
					Ext.getCmp('adminFormSettings_rowsId').setValue(maxRows+1);
				}
				//adjust column spans   adminFormSettings_colSpanId
				var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
				if(rawColumnSpans)
				{
					var spans = rawColumnSpans.split(";");
					var newSpans = [];
					spans.forEach(function(s){
						var spanParts = s.split(",");
						var spanRow = spanParts[0]/1;
						if(spanRow>=tRow)spanRow++
						newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
					});
					Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
				}


				ijf.admin.listView.getStore().insert(s.store.data.indices[s.id], rec);
				ijf.admin.listView.getView().refresh();
				//ijf.admin.listView.fireEvent("selectionchange",s);
				ijf.admin.refreshFieldList();
		};


		ijf.admin.listView = new Ext.grid.GridPanel({
			store: fieldStore,
			height:800,
			width:350,
			id: "fieldsListViewId",
			//reserveScrollOffset: true,
			columns: [				{
					header: 'ID',
					width:60,
					hidden: true,
					sortable: false,
					dataIndex: 'iid'
				},{
				header: 'Cell',
				width:60,
				hidden: false,
				dataIndex: 'cell',
				sortable: true,
				sorter: function(iv1,iv2) {
				            var ds = iv1.store;

							ds.sort({
								property: 'cell',
								//direction: state,
								sorterFn: function(v1, v2){
									var tv1 = v1.get('cell').replace(",","")/1;
									var tv2 = v2.get('cell').replace(",","")/1;
									//return (tv1 > tv2) ? true: false;
									return tv2>tv1 ? -1 : tv2<tv1 ? 1 : 0;
								}
							});
        		}
			},
				{
					header: 'Type',
					width:120,
					sortable: true,
					dataIndex: 'type'
				},
				{
					header: 'Source',
					width:165,
					sortable: true,
					dataIndex: 'source'
				}],
			tbar: l_tbar,
			listeners: {
				selectionchange:function(view, record, eops) {

					//view might be data if we inserted a row, look first...
					if(view.data)
					{
						ijf.admin.cwfAdmin_thisField = ijf.admin.cwfAdmin_form.fields[view.data.iid];
					}
					else
					{
						if(record.length==0) return;
						//get existing field by ID
						ijf.admin.cwfAdmin_thisField = ijf.admin.cwfAdmin_form.fields[record[0].data.iid];
					}

					Ext.getCmp("adminFormFields_beforeRenderId").setValue(ijf.admin.cwfAdmin_thisField["beforeRender"]);
					Ext.getCmp("adminFormFields_afterRenderId").setValue(ijf.admin.cwfAdmin_thisField["afterRender"]);
					Ext.getCmp("adminFormFields_captionId").setValue(ijf.admin.cwfAdmin_thisField["caption"]);
					Ext.getCmp("adminFormFields_controlTypeId").setValue(ijf.admin.cwfAdmin_thisField["controlType"]);
					Ext.getCmp("adminFormFields_formCellId").setValue(ijf.admin.cwfAdmin_thisField["formCell"]);
					Ext.getCmp("adminFormFields_dataSourceId").setValue(ijf.admin.cwfAdmin_thisField["dataSource"]);
					Ext.getCmp("adminFormFields_dataReferenceId").setValue(ijf.admin.cwfAdmin_thisField["dataReference"]);
					Ext.getCmp("adminFormFields_styleId").setValue(ijf.admin.cwfAdmin_thisField["style"]);
					Ext.getCmp("adminFormFields_panelStyleId").setValue(ijf.admin.cwfAdmin_thisField["panelStyle"]);
					Ext.getCmp("adminFormFields_labelStyleId").setValue(ijf.admin.cwfAdmin_thisField["labelStyle"]);
					Ext.getCmp("adminFormFields_referenceFilterId").setValue(ijf.admin.cwfAdmin_thisField["referenceFilter"]);
					Ext.getCmp("adminFormFields_regExId").setValue(ijf.admin.cwfAdmin_thisField["regEx"]);
					Ext.getCmp("adminFormFields_regExMessageId").setValue(ijf.admin.cwfAdmin_thisField["regExMessage"]);
					Ext.getCmp("adminFormFields_tableWidthsId").setValue(ijf.admin.cwfAdmin_thisField["tableWidths"]);
					Ext.getCmp("adminFormFields_tableHeadersId").setValue(ijf.admin.cwfAdmin_thisField["tableHeaders"]);
					Ext.getCmp("adminFormFields_tableDblClickId").setValue(ijf.admin.cwfAdmin_thisField["tableDblClick"]);
					Ext.getCmp("adminFormFields_eventId").setValue(ijf.admin.cwfAdmin_thisField["event"]);
					Ext.getCmp("adminFormFields_toolTipId").setValue(ijf.admin.cwfAdmin_thisField["toolTip"]);
					Ext.getCmp("adminFormFields_dataReference2Id").setValue(ijf.admin.cwfAdmin_thisField["dataReference2"]);
					Ext.getCmp("adminFormFields_renderIfId").setValue(ijf.admin.cwfAdmin_thisField["renderIf"]);
					Ext.getCmp("adminFormFields_fieldStyleId").setValue(ijf.admin.cwfAdmin_thisField["fieldStyle"]);

				}
			}
		});


		var lookup = ["attachmentlist","attachmentlistgrid","attachmentmanaged","attachmentSPmanaged","attachmentlisttree","attachmentSPtree","attachmentupload","button","chart-bar","chart-pie","checkbox","commentlist","datebox","dropdown","dropdownwithpicker","formbuttons","formbuttonsforpopup","GRID","GRIDHTML","grouppicker","grouppickermulti","html","htmldata","htmleditor","historylist","iframe","issue relator","itemfolders","itemlist","itemlistHTML","itemtree","muiAppBar","muiButton","muiCardList","muiCommentList","muiCommentSuperList","muiDatebox","muiDrawer","muiFormButtons","muiGrid","muiHtml","muiHistoryList","muiIcon","muiRadio","muiSelect","muiTextarea","muiTextbox","multiselect","navigatetoform","Reference Editor","subform","openurl","openpopform","radio","reportbutton","tabmenu","textarea","textbox","userpicker","userpickermulti","workflowbuttons"];

	    var  sectionLookup = [];

	    sectionLookup = Object.keys(ijf.jiraMetaKeyed);

		//add custom type GRID names
		sectionLookup = ijf.fw.CustomTypes.reduce(function(inList,ct){
			if(ct.customType=="GRID") inList.push(ct.name);
			return inList;
		},sectionLookup);

		sectionLookup.push("Status");
	 	sectionLookup=sectionLookup.sort();

		var fieldPanel = new Ext.FormPanel({
			border:true,
			width: 850,
			items: [{
				    xtype: 'button',
				    width:150,
				    style: 'margin-left:125px;margin-top:4px',
				    text: 'Field Permissions',
				    handler: function()
					{
					/////////////////////////////////////////field permissions

								//verify field has model then process
								//set field permissions if they are not there
								if(!ijf.admin.cwfAdmin_thisField.permissions)
								{
									if(!ijf.admin.cwfAdmin_thisField.hasOwnProperty("rawPermissions"))
									{
										ijf.admin.cwfAdmin_thisField.permissions =
											{"enabled":false,
											 "states":{}
											};
									}
									else
									{
										ijf.admin.cwfAdmin_thisField.permissions=JSON.parse(ijf.admin.cwfAdmin_thisField.rawPermissions);
									}
								}

								wfsNameStore.loadData(Object.keys(ijf.admin.cwfAdmin_thisField.permissions.states).map(function(s){
											return {"state":s};
								}));
								//list of workflow status
								//don't know how to handle, not in the API
								var grps = ijfUtils.jiraApiSync("GET","/rest/api/2/groups/picker",null);
					   			var headStyle =  " style='background:lightgray;border-bottom:solid blue 2px' ";
								var fieldRefWin = new Ext.Window({
								layout: 'vbox',
								title: "Field Security: " + ijf.admin.cwfAdmin_thisField["dataSource"],
								width: 1100,
								height:570,
								listeners: {
									show: loadPermissions,
									close: function()
									{
										cPermState=null;
										updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
									}
								},
								closable: true,
								items: [
									{
									xtype: "checkboxfield",
									boxLabel: "Field Security Enabled",
									value : ijf.admin.cwfAdmin_thisField.permissions.enabled,
									listeners: {
										change: function(f,n,o)
										{
											ijf.admin.cwfAdmin_thisField.permissions.enabled=n;
										}
								    },
									name: "secEnabled",
									margin: '0 0 0 10',
									inputValue: 1},
									{
										layout: 'hbox',
										border: false,
										frame: false,
										xtype: "panel",
										items: [{
												xtype: 'textfield',
												labelAlign: 'left',
												fieldLabel: 'Workflow State',
												labelWidth: 100,
												labelStyle: "color:darkblue",
												margin: '0 0 0 10',
												width: 300,
												value: "",
												listeners: {
													change: function(f,n,o){
															newStateName = n;
														}
													}
							            		},
							            		{
													xtype: 'button',
													margin: '0 0 0 10',
													text:'Add',
													handler: function(){
														if(newStateName)
														{
															//make sure unique...
															if(ijf.admin.cwfAdmin_thisField.permissions.states.hasOwnProperty(newStateName))
															{
																ijfUtils.modalDialogMessage("Information","Please enter a name that does not exist.");
															}
															else
															{
																ijf.admin.cwfAdmin_thisField.permissions.states[newStateName]={"view":[],"edit":[]};
																cPermState=newStateName;
																updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
															}
														}
                								}}
						            		]
						            },
						            {
										xtype: "panel",
										html: "<hr>",
										width: "100%"
										},
									{
										xtype: "panel",
										layout: "hbox",
										width: "100%",
										items:[
											{
												xtype: "panel",
												layout: "vbox",
												width: 260,
												items:
													[
														{	xtype: "gridpanel",
															store: wfsNameStore,
															style: "border: solid black 2px",
															height:400,
															margin: "0 20px 20px 20px",
															width: 230,
															id: "stateTableId",
															columns: [{
																		header: 'Workflow State',
																		width:"100%",
																		hidden: false,
																		dataIndex: "state"
																	}],
															listeners: {
																select:function(view, record, eops) {
																	cPermState = record.data.state;
																	updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
																}
															}
														},
														{
															xtype:'button',
															hidden: false,
															text:"Delete",
															handler: function(){
																if(cPermState)
																{
																	delete ijf.admin.cwfAdmin_thisField.permissions.states[cPermState];
																	cPermState="";
																	updateTables(null,ijf.admin.cwfAdmin_thisField);
																}

															}
														}
													]
											},
											{
												xtype: "panel",
												layout: "vbox",
												width: 750,
												items:[
													{
														xtype: "panel",
														width: "100%",
														layout: "hbox",
														items:[{
															xtype: "panel",
															html: "Can Edit: ",
															bodyStyle: "width:70px;font-weight:bold",
															margin: "0 20px 0 20px",
															},
															{	xtype: "gridpanel",
																	store: editAvailStore,
																	style: "border: solid black 2px",
																	height:200,
																	margin: "0 20px 20px 20px",
																	width:300,
																	id: "permTableEditAvailRolesId",
																	columns: [{
																				header: 'Available Role',
																				width:"100%",
																				hidden: false,
																				dataIndex: "role"
																			}],
																	listeners: {
																		rowdblclick:function(view, record, eops) {
																			//remove this, add partner
																			if(!record.data.role) return;
																			if(!cPermState) return;
																			var newRole=record.data.role;
																			ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].edit.push(newRole);
																			updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
																		}
																	}
																},
																{	xtype: "gridpanel",
																	store: editAssStore,
																	style: "border: solid black 2px",
																	height:200,
																	width:300,
																	id: "permTableEditAssRolesId",
																	columns: [{
																				header: 'Assigned Role',
																				width:"100%",
																				hidden: false,
																				dataIndex: "role"
																			}],
																	listeners: {
																		rowdblclick:function(view, record, eops) {
																			//remove this, add partner
																			if(!record.data.role) return;
																			if(!cPermState) return;
																			var newRole=record.data.role;
																			ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].edit=ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].edit.filter(function(item){
																				return item !== newRole;
																			});
																			updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
																		}
																	}
																}

														]
													},
													{
																xtype: "panel",
																width: "100%",
																layout: "hbox",
																items:[{
																	xtype: "panel",
																	html: "Can View: ",
																	bodyStyle: "width:80px;font-weight:bold",
																	margin: "0 20px 0 20px",
																	},
																	{	xtype: "gridpanel",
																			store: viewAvailStore,
																			style: "border: solid black 2px",
																			height:200,
																			margin: "0 20px 0 20px",
																			width:300,
																			id: "permTableViewAvailRolesId",
																			columns: [{
																						header: 'Available Role',
																						width:"100%",
																						hidden: false,
																						dataIndex: "role"
																					}],
																			listeners: {
																				rowdblclick:function(view, record, eops) {
																					//remove this, add partner
																					if(!record.data.role) return;
																					if(!cPermState) return;
																					var newRole=record.data.role;
																					ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].view.push(newRole);
																					updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
																				}
																			}
																		},
																		{	xtype: "gridpanel",
																			store: viewAssStore,
																			style: "border: solid black 2px",
																			height:200,
																			width:300,
																			id: "permTableViewAssRolesId",
																			columns: [{
																						header: 'Assigned Role',
																						width:"100%",
																						hidden: false,
																						dataIndex: "role"
																					}],
																			listeners: {
																				rowdblclick:function(view, record, eops) {
																					//remove this, add partner
																					if(!record.data.role) return;
																					if(!cPermState) return;
																					var newRole=record.data.role;
																					ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].view=ijf.admin.cwfAdmin_thisField.permissions.states[cPermState].edit.filter(function(item){
																						return item !== newRole;
																					});
																					updateTables(cPermState,ijf.admin.cwfAdmin_thisField);
																				}
																			}
																		}

																]
														}
												]
											},
										]
									},



								],
								modal: true
								});
								fieldRefWin.show();
							}
					//////////////////////////////////////////END field permission
				},
				{
					xtype:'panel'
				},
				{
				xtype: 'textfield',
				labelAlign: 'left',
				labelWidth: 120,
				fieldLabel: "Caption",
				labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"caption\",\"adminFormFields_captionId\")>",
				width: 500,
				value: ijf.admin.cwfAdmin_thisField["caption"],
				id: "adminFormFields_captionId",
				listeners: {
					change: function(f, n, o){
						ijf.admin.cwfAdmin_thisField["caption"] = n;
					}}
				},
				{
					xtype: 'combobox',
					labelAlign: 'left',
					forceSelection: true,
					store: lookup,
					labelWidth: 120,
					fieldLabel: "Control Type",
 					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"controltype\",\"adminFormFields_controlTypeId\")>",
					triggerAction: 'all',
					width: 400,
					value: ijf.admin.cwfAdmin_thisField["controlType"],
					id: "adminFormFields_controlTypeId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["controlType"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Cell",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"cell\",\"adminFormFields_formCellId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["formCell"],
					id: "adminFormFields_formCellId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["formCell"] = n;
						}}
				},
				{
					xtype: 'combobox',
					triggerAction: 'all',
					labelAlign: 'left',
					labelWidth: 120,
					forceSelection: false,
					store: sectionLookup,
					fieldLabel: "Data Source",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"datasource\",\"adminFormFields_dataSourceId\")>",
					width: 400,
					value: ijf.admin.cwfAdmin_thisField["dataSource"],
					id: "adminFormFields_dataSourceId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["dataSource"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Data Reference",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"datareference\",\"adminFormFields_dataReferenceId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["dataReference"],
					id: "adminFormFields_dataReferenceId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["dataReference"] = n;
						}}
				},


				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Outer Style",
					//labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"outerstyle\",\"adminFormFields_styleId\")>",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"fieldstyle\",\"adminFormFields_fieldStyleId\")>&nbsp;<img style='height:12px' src='" + g_imagesRoot + "magnify.png' onclick=ijf.admin.editJson(\"adminFormFields_styleId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["style"],
					id: "adminFormFields_styleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["style"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Inner Style",
					//labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"innerstyle\",\"adminFormFields_panelStyleId\")>",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"fieldstyle\",\"adminFormFields_fieldStyleId\")>&nbsp;<img style='height:12px' src='" + g_imagesRoot + "magnify.png' onclick=ijf.admin.editJson(\"adminFormFields_panelStyleId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["panelStyle"],
					id: "adminFormFields_panelStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["panelStyle"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Field Style",
					//labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"fieldstyle\",\"adminFormFields_fieldStyleId\")>",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"fieldstyle\",\"adminFormFields_fieldStyleId\")>&nbsp;<img style='height:12px' src='" + g_imagesRoot + "magnify.png' onclick=ijf.admin.editJson(\"adminFormFields_fieldStyleId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["fieldStyle"],
					id: "adminFormFields_fieldStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["fieldStyle"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Label Style",
					//labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"labelstyle\",\"adminFormFields_labelStyleId\")>",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"fieldstyle\",\"adminFormFields_fieldStyleId\")>&nbsp;<img style='height:12px' src='" + g_imagesRoot + "magnify.png' onclick=ijf.admin.editJson(\"adminFormFields_labelStyleId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["labelStyle"],
					id: "adminFormFields_labelStyleId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["labelStyle"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Reference Filter",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"referencefilter\",\"adminFormFields_referenceFilterId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["referenceFilter"],
					id: "adminFormFields_referenceFilterId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["referenceFilter"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "RegEx Valid.",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"regexvalid\",\"adminFormFields_regExId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["regEx"],
					id: "adminFormFields_regExId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["regEx"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "RegEx Mess.",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"regexmess\",\"adminFormFields_regExMessageId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["regExMessage"],
					id: "adminFormFields_regExMessageId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["regExMessage"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Tb. Col. Widths",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"tbcolwidths\",\"adminFormFields_tableWidthsId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["tableWidths"],
					id: "adminFormFields_tableWidthsId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["tableWidths"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Tb. Col. Heads",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"tbcolheads\",\"adminFormFields_tableHeadersId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["tableHeaders"],
					id: "adminFormFields_tableHeadersId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["tableHeaders"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Tb. Dbl Clk",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"tbdblclk\",\"adminFormFields_tableDblClickId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["tableDblClick"],
					id: "adminFormFields_tableDblClickId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["tableDblClick"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "On Change",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"onchange\",\"adminFormFields_eventId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["event"],
					id: "adminFormFields_eventId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["event"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Tool Tip",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"tooltip\",\"adminFormFields_toolTipId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["toolTip"],
					id: "adminFormFields_toolTipId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["toolTip"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Data Ref2",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"dataref2\",\"adminFormFields_dataReference2Id\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["dataReference2"],
					id: "adminFormFields_dataReference2Id",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["dataReference2"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Render If",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"renderif\",\"adminFormFields_renderIfId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["renderIf"],
					id: "adminFormFields_renderIfId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["renderIf"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "Before render",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"beforerender\",\"adminFormFields_beforeRenderId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["beforeRender"],
					id: "adminFormFields_beforeRenderId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["beforeRender"] = n;
						}}
				},
				{
					xtype: 'textfield',
					labelAlign: 'left',
					labelWidth: 120,
					fieldLabel: "After render",
					labelSeparator: "&nbsp;&nbsp;<img src='" + g_imagesRoot + "blueQuestion14.png' onclick=ijf.admin.helpLink(\"afterrender\",\"adminFormFields_afterRenderId\")>",
					width: 500,
					value: ijf.admin.cwfAdmin_thisField["afterRender"],
					id: "adminFormFields_afterRenderId",
					listeners: {
						change: function(f, n, o){
							ijf.admin.cwfAdmin_thisField["afterRender"] = n;
						}}
				}

			]
		});


		var cwfAdmin_fieldsPanel = new Ext.FormPanel({
			border:true,
			frame:true,
			width: 900,
			layout:'hbox',
			margin: '5 0 0 0',
			collapsible: true,
			collapsed: true,
			title: "Form Fields",
			id: "cwfAdmin_fieldsPanel_id",
			header:{
						titlePosition: 0,
						items:[{
							xtype:'button',
							text:"Field Reference",
							handler: function(){
					   			var headStyle =  " style='background:lightgray;border-bottom:solid blue 2px' ";
								var htmlOut = "<table cellspacing=0 width=100%><tr><td"+headStyle+">Field Name</td><td"+headStyle+">JIRA ID</td><td"+headStyle+">Type</td><td"+headStyle+">Forms Reference</td></tr>";
								var outFieldRef = [];
								Object.keys(ijf.jiraMetaKeyed).forEach(function(f){
									var field = ijf.jiraMetaKeyed[f];
									var fRef = "#{"+f+"}";
									if(field.schema.type=="array") fRef="na";
									if(fId=="comment") fRef="na";
									if(field.schema.customId) fId = "customfield_" +field.schema.customId;
									outFieldRef.push([f,"<tr><td>"+f+"</td><td>"+fId+"</td><td>"+field.schema.type+"</td><td>"+fRef+"</td></tr>"]);
								});
								outFieldRef = outFieldRef.sort(function(a, b)
								{
									return a[0]<b[0] ? -1 : a[0]>b[0] ? 1 : 0;
								});
								outFieldRef.forEach(function(f){
									htmlOut += f[1];
								});
								htmlOut += "</table>";

								var fieldRefWin = new Ext.Window({
								layout: 'vbox',
								title: "Field Reference: " + thisForm.testIssue,
								width: 550,
								height:600,
								scrollable: true,
								closable: true,
								header:{
											titlePosition: 0,
											items:[{
												xtype:'button',
												text:"Pop into Tab",
												handler: function(btn){
												   // render a local version
												 var win = window.open("","ijfFieldReference");
												 win.document.body.innerHTML = htmlOut;
												 win.document.title = "IJF Field Reference";
												}
											}]},
								items: [{
											xtype: 'panel',
											html: htmlOut,
											width: '100%'
											//height: '100%'
											//maxHeight: 580
										}],
								modal: true
								});
								fieldRefWin.show();
								fieldRefWin.setY(window.pageYOffset+25);
							}
						}]
			},
			items: [ijf.admin.listView, fieldPanel]
		});


		if(!Ext.ClassManager.isCreated('snippetArray'))
		{
			Ext.define('snippetArray', {
				extend: 'Ext.data.Model',
				fields: [
					{name: 'iid',  type: 'string'},
					{name: 'name', type: 'string'},
					{name: 'snippet', type: 'string'},
					{name: 'sshort', type: 'string'}
				]
			});
		}
		var snippetStore = new Ext.data.Store({
			model: 'snippetArray'
		});


		var snips = [];
		ijf.admin.cwfAdmin_form.formSet.snippets.forEach(function(s)
		{
			if(s.name)
			snips.push({
				iid: s.id,
				name: s.name,
				snippet: s.snippet,
				sshort: s.snippet.substring(0,40) + "..."
			});
		});

		snippetStore.loadData(snips);

		var s_tbar=[];

		s_tbar.push({
			iconCls: 'icon-user-add',
			text: 'Add',
			align: 'center',
			handler: function(){
				var rec = Ext.create('snippetArray');
				rec.data.iid=0;
				snippetPanel.getStore().insert(0, rec);
			}
		});

		//controls
		var delOption = {
			icon: g_imagesRoot + 'dd/drop-no.png',
			tooltip: 'Delete snippet',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.store.getAt(rowIndex);

				var sId = rec.get('iid');

				if ((sId/1)>0)
				{
					//this guy has not been added yet


					var delSnippet = function()
					{
						rec.data.status ='deleting';
						var sendData = {
							snippetId: sId
						};
						var sJson = JSON.stringify(sendData);
						var sRes =  ijfUtils.saveJiraFormSync(sJson,"deleteSnippet");
						if(sRes=="OK")
						{
							grid.getStore().removeAt(rowIndex);
						}
						else
						{
							rec.data.status = "Error";
							ijfUtils.modalDialogMessage("Error","Unable to delete the snippet: " + sRes);
						}
					};


					ijfUtils.modalDialog("Rule Deletion","Are you sure you want to delete this rule?<br>  This action is permanent and immediate.",delSnippet);

				}
				else
				{
					grid.getStore().removeAt(rowIndex);
				}
			}
		};

		var ce  = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var snippetPanel = new Ext.grid.GridPanel({
			store: snippetStore,
			height:600,
			width:900,
			id: "snippetPanelId",
			//reserveScrollOffset: true,
			columns: [
				{
					header: 'ID',
					width:50,
					sortable: true,
					dataIndex: 'iid'
				},
				{
					header: 'Name',
					width:300,
					sortable: true,
					dataIndex: 'name'

				},
				{
					header: 'Snippet',
					width:350,
					sortable: true,
					dataIndex: 'sshort'
				},
				{
					header: 'Status',
					width:100,
					sortable: true,
					dataIndex: 'status'
				},
				{
					header: 'Delete',
					xtype: 'actioncolumn',
					width: 65,
					items: [delOption]
				}],
			plugins: [ce],
			tbar: s_tbar,
		    listeners: {
			    'rowdblclick': function(grid,rec,e) {
					//open and edit...
					ijf.admin.addEditForm(rec);

				}
			}
		});


		var cwfAdmin_snippetPanel = new Ext.FormPanel({
			border: true,
			frame: true,
			title: "Javascript Business Rules (note, these do not load in this	 designer perspective.)",
			width: 900,
			layout:'vbox',
			margin: '5 0 0 0',
			collapsible: true,
			collapsed: true,
			id: "cwfAdmin_snippetPanel_id",
			items: [snippetPanel]
		});

		ijf.admin.cwfAdmin_settingsPanel = new Ext.FormPanel({
			frame: false,
			border: false,
			width: 910,
			layout:'vbox',
			collapsible: false,
			collapsed: false,
			bodyStyle: "margin-left:10px",
			id: "cwfAdmin_settingsPanel_id",
			//hidden: hideField,
			//bodyStyle: l_Style,
			items: [cntPanel, pnl, cwfAdmin_fieldsPanel, cwfAdmin_snippetPanel]
		});


    ijf.lists.dWin = new Ext.Window({
        layout: 'vbox',
        title: "Ideal Forms for JIRA Designer:  " + ijf.admin.cwfAdmin_form.name,
        width: 950,
        height:850,
        closable: false,
        scrollable: true,
        items: [ijf.admin.cwfAdmin_settingsPanel],
        modal: false,
		header:{
						titlePosition: 0,
						items:[{
							xtype:'button',
							text:"Preview Form",
							handler: function(){
							   // render a local version

								ijfUtils.clearAll();
								ijf.admin.renderForm("ijfContent",false);
							}
						},
						{xtype:'button',
						 text: "Edit Layout",
							handler: function(){
								ijfUtils.clearAll();
								ijf.admin.renderForm("ijfContent",true);
							}},
						{xtype:'button',
						  text: "Open Form",
							handler: function(){
								var token = $('meta[name="token"]').attr("content");
								var cloudToken =  "&jwt=" +token;
								if(ijf.admin.cwfAdmin_form.testIssue)
								{
									var tUrl = g_root + '/run?itemId='+ijf.admin.cwfAdmin_form.testIssue+'&formId='+ijf.admin.cwfAdmin_form.name + cloudToken;
								}
								else
								{
									var tUrl = g_root + '/run?formId='+ijf.admin.cwfAdmin_form.name + cloudToken;
								}
								window.open(tUrl);
							}},
						{xtype:'button',
						text:"Save Settings",
							handler: function(){

								//ijfUtils.showProgress();
								ijf.admin.saveSettings();

							}
						},
			{
				xtype:'button',
				style: 'margin:0 0 0 10px',
				text:"Help",
				handler: function(){
				   window.open("http://www.idealfed.com/support.html");
			}}]
		 }
    });

    ijf.lists.dWin.show();
    ijf.lists.dWin.setY(window.pageYOffset+25);
    ijf.admin.renderForm("ijfContent",false);
	},

	setFieldsPanelDirty:function()
	{
		//better to change the background of the listbox class
	},

	//save form
	saveSettings:function()
	{

		var settingsOut = new Array();
		var fieldsOut = new Array();
		//each data row of thing...
		//we need to define what newData actually is
		var adminErrorMessage= "OK";

		for(var j in ijf.admin.cwfAdmin_form.settings)
		{
			if(!ijf.admin.cwfAdmin_form.settings.hasOwnProperty(j)) continue;
			settingsOut.push({name:j,value:ijf.admin.cwfAdmin_form.settings[j],comment:""});
		};

		if(ijf.admin.cwfAdmin_form.permissions)
		{
			settingsOut.push({name:"permissions",value:JSON.stringify(ijf.admin.cwfAdmin_form.permissions),comment:""});
		}

		//add the businessRules to retain....
		/*
		for (var i in ijf.admin.cwfAdmin_form.businessRules)
		{
			if(!ijf.admin.cwfAdmin_form.businessRules.hasOwnProperty(i)) continue;
			jOut.push({name:"businessRule",value:ijf.admin.cwfAdmin_form.businessRules[i].rule,comment:ijf.admin.cwfAdmin_form.businessRules[i].message});
		}
		*/

		//each data row of thing...
		//we need to define what newData actually is
		for(var j in ijf.admin.cwfAdmin_form.fields)
		{
			if(!ijf.admin.cwfAdmin_form.fields.hasOwnProperty(j)) continue;

			var fRow = {};

			fRow["beforeRender"] = ijf.admin.cwfAdmin_form.fields[j]["beforeRender"];
			fRow["afterRender"] = ijf.admin.cwfAdmin_form.fields[j]["afterRender"];
			fRow["formCell"] = ijf.admin.cwfAdmin_form.fields[j]["formCell"];
			fRow["caption"] = ijf.admin.cwfAdmin_form.fields[j]["caption"];
			fRow["controlType"] = ijf.admin.cwfAdmin_form.fields[j]["controlType"];
			fRow["dataSource"] = ijf.admin.cwfAdmin_form.fields[j]["dataSource"];
			fRow["dataReference"] = ijf.admin.cwfAdmin_form.fields[j]["dataReference"];
			fRow["style"] = ijf.admin.cwfAdmin_form.fields[j]["style"];
			fRow["labelStyle"] = ijf.admin.cwfAdmin_form.fields[j]["labelStyle"];
			fRow["panelStyle"] = ijf.admin.cwfAdmin_form.fields[j]["panelStyle"];
			fRow["referenceFilter"] = ijf.admin.cwfAdmin_form.fields[j]["referenceFilter"];
			fRow["tableHeaders"] = ijf.admin.cwfAdmin_form.fields[j]["tableHeaders"];
			fRow["tableColumns"] = ijf.admin.cwfAdmin_form.fields[j]["tableColumns"];
			fRow["tableWidths"] = ijf.admin.cwfAdmin_form.fields[j]["tableWidths"];
			fRow["tableHeaders"] = ijf.admin.cwfAdmin_form.fields[j]["tableHeaders"];
			fRow["tableDblClick"] = ijf.admin.cwfAdmin_form.fields[j]["tableDblClick"];
			fRow["event"] = ijf.admin.cwfAdmin_form.fields[j]["event"];
			fRow["toolTip"] = ijf.admin.cwfAdmin_form.fields[j]["toolTip"];
			fRow["dataReference2"] = ijf.admin.cwfAdmin_form.fields[j]["dataReference2"];
			fRow["renderIf"] = ijf.admin.cwfAdmin_form.fields[j]["renderIf"];
			fRow["persistInItem"] = ijf.admin.cwfAdmin_form.fields[j]["persistInItem"];
			fRow["tableColumnsStyles"] = ijf.admin.cwfAdmin_form.fields[j]["tableColumnsStyles"];
			fRow["fieldStyle"] = ijf.admin.cwfAdmin_form.fields[j]["fieldStyle"];
			fRow["regEx"] = ijf.admin.cwfAdmin_form.fields[j]["regEx"];
			fRow["regExMessage"] = ijf.admin.cwfAdmin_form.fields[j]["regExMessage"];

			//permissions settings
			if(ijf.admin.cwfAdmin_form.fields[j].permissions)
				fRow["rawPermissions"] = JSON.stringify(ijf.admin.cwfAdmin_form.fields[j].permissions);

			fieldsOut.push(fRow);
		}


		var thisForm = ijf.admin.cwfAdmin_form; //ijf.fw.forms[window.g_formId];

		//fieldsJson = fieldsJson.replace(/\"/g,"\\\"");
		//settingsJson = settingsJson.replace(/\"/g,"\\\"");


        var jOut = {
			formId: thisForm.id,
			testIssue: thisForm.testIssue,
			formType: thisForm.formType,
			issueType: thisForm.issueType,
			formName: thisForm.name,
			fields: JSON.stringify(JSON.stringify(fieldsOut)),
			formSettings: JSON.stringify(JSON.stringify(settingsOut))
		};

        //attempt to save....
		var jdata = JSON.stringify(jOut);

		var initResp = "";

		var sStat = ijfUtils.saveJiraFormSync(jdata,"saveFormConfig");
		if(sStat=="OK")
		{
			ijfUtils.modalDialogMessage("Information Message","Settings saved. You must refresh other pages to see changes.");
		}
		else
		{
			ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
		}

	},

	renderForm:function(inContainerId, cellsOnly)
	{
		ijfUtils.clearExt();

		//outer style

		ijfUtils.setElementWithStyleString("ijfOuterContainer",ijf.admin.cwfAdmin_form.settings["outerContainerStyle"]);

		ijfUtils.renderHeader(inContainerId,ijf.admin.cwfAdmin_form,ijf.currentItem);

        ijfUtils.setElementWithStyleString("ijfHead",ijf.admin.cwfAdmin_form.settings["title_style"]);

	   var colSpans = {};
	   var rowsWithSpans = {};

		try
		{
			if (ijf.admin.cwfAdmin_form.settings["columnSpans"]!=null)
			{
				var cSpans = ijf.admin.cwfAdmin_form.settings["columnSpans"].split(";");
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
			ijfUtils.footLog("Error in columnspans settings")
			colSpans={};
		}

	   var rowSpans = {};
	   var colsWithSpans = {};

		try
		{
			if (ijf.admin.cwfAdmin_form.settings["rowSpans"]!=null)
			{
				var rSpans = ijf.admin.cwfAdmin_form.settings["rowSpans"].split(";");
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

		ijfUtils.setContent(inContainerId,ijf.admin.cwfAdmin_form.settings["rows"],ijf.admin.cwfAdmin_form.settings["columns"],colSpans,cellsOnly,rowSpans);


		if (ijf.admin.cwfAdmin_form.settings["columnWidths"]!=null)
		{

			var colwidths = ijf.admin.cwfAdmin_form.settings["columnWidths"].split(";");


			for(var i in colwidths)
			{

				if(!colwidths.hasOwnProperty(i)) continue;
				var wPair = colwidths[i].split(":");
                if(wPair.length < 2) continue;

				var rows = ijf.admin.cwfAdmin_form.settings["rows"]/1+1;

				for (var j = 1; j<rows;j++)
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


/*
			for(var i in colwidths)
			{

				if(!colwidths.hasOwnProperty(i)) continue;
				var wPair = colwidths[i].split(":");

				var rows = ijf.admin.cwfAdmin_form.settings["rows"]/1+1;

				for (var i = 1; i<rows;i++)
				{
					if(rowsWithSpans.hasOwnProperty(i+"spannedRow")) continue;
					var tContainer = inContainerId + "_" + i + "_" + wPair[0].trim();
					var e = document.getElementById(tContainer);
					if(e!=null) e.style.width=wPair[1];
				}
			}
*/

		}


        ijfUtils.setElementWithStyleString(inContainerId + "_ijfContentTableId", ijf.admin.cwfAdmin_form.settings["outerTableStyle"]);


		//for each field.. apply the field.

		for (var f in ijf.admin.cwfAdmin_form.fields)
		{

			if(!ijf.admin.cwfAdmin_form.fields.hasOwnProperty(f)) continue;
			var thisField = ijf.admin.cwfAdmin_form.fields[f];
			thisField.form = ijf.admin.cwfAdmin_form;
			var frmCell = thisField.formCell.split(",");

			//if this is a nested FIELD in html, skip
            if(frmCell.length>2) continue;

			var targetCell =  inContainerId+"_"+frmCell[0]+"_"+frmCell[1];
			var container = document.getElementById(targetCell);
			try
			{

				if(cellsOnly)
				{
					var dObj = document.getElementById(targetCell);
					if(dObj)
					{
						dObj.style.backgroundColor="lightblue";
						dObj.innerHTML="<span onclick=ijf.admin.onLayoutHover(this)>"+frmCell + " - " + thisField.controlType + "</span>";;
					}
					else
					{
						ijfUtils.footLog("error with target cell, no DIV " + targetCell);
					}
				}
				else
				{

					if(thisField.controlType=="nestedform")
					{
						var dObj = document.getElementById(targetCell);
						dObj.innerHTML="nested form: " + thisField.dataSource;
					}
					else
					{

						ijf.extUtils.renderField(inContainerId,ijf.currentItem,thisField,container);
					}

				}
			}
			catch(e)
			{
				ijfUtils.footLog("Bad error: " + e);
			}

		}
	},

    onLayoutHover:function(inElement)
	{
 	    var e = window.event;

	    var posX = e.clientX;
	    var posY = e.clientY;


	   var cell = inElement.innerHTML.split(" - ");
	   console.log("Navigating to " + cell[0]);

	   //need to nav to the cell.  it may or may not be actual cell..if length of cell is 1 return

	   var rec = ijf.admin.listView.getStore().findRecord("cell", cell[0])
	   ijf.admin.listView.setSelection(rec);

		var menu_grid = new Ext.menu.Menu({ items:
		[
			{ text: 'Delete Field', handler: function()  {
					//each row, blow away if same cell.

					ijf.admin.listView.getStore().each(function(r)
					{
						if(r.data.cell==cell[0])
						{
							ijf.admin.listView.getStore().remove(r);
							delete ijf.admin.cwfAdmin_form.fields[r.data.iid];
						}
					});
					ijf.admin.listView.getView().refresh();
					//repaint preview...
					ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);

				} }
			,{ text: 'Delete Row', handler: function()  {
					//each row, blow away if same cell.
					var rc = cell[0].split(",");
					var rowNum = rc[0]/1;
					//remove the fields in row
					Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
					{
						var f = ijf.admin.cwfAdmin_form.fields[fk];
						var tRow = f.formCell.split(",");
						if(tRow[0]==rc[0])
						{
							delete ijf.admin.cwfAdmin_form.fields[fk];
						}
						var tRowNum = tRow[0]/1;
						if(tRowNum>rowNum)
						{
							//need to reduce the row by one
							f.formCell=(tRowNum-1) + "," + tRow[1];
						}
					});

					//adjust total rows
					var maxRows = Ext.getCmp('adminFormSettings_rowsId').getValue()/1;
					Ext.getCmp('adminFormSettings_rowsId').setValue(maxRows-1);

					//delete column spans that match the cell
					var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
					if(rawColumnSpans)
					{
						var spans = rawColumnSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							if(rc[0]==spanParts[0]) return;
							var spanRow = spanParts[0]/1;
							if(spanRow>(rc[0]/1))spanRow=spanRow-1;
							newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
					}

					//delete row spans that match the cell
					var rawRowSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
					if(rawRowSpans)
					{
						var spans = rawRowSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							if(rc[0]==spanParts[0]) return;
							var spanRow = spanParts[0]/1;
							if(spanRow>(rc[0]/1))spanRow=spanRow-1;
							newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
					}



					ijf.admin.refreshFieldList();
					ijf.admin.listView.getView().refresh();
					//repaint preview...
					ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);

				} }
			,{ text: 'Delete Column', handler: function()  {
					//each row, blow away if same cell.

                   //each column, blow away if same cell.
					var rc = cell[0].split(",");
					var colNum = rc[1]/1;
					//remove the fields in row
					Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
					{
						var f = ijf.admin.cwfAdmin_form.fields[fk];
						var tRow = f.formCell.split(",");
						if(tRow[1]==rc[1])
						{
							delete ijf.admin.cwfAdmin_form.fields[fk];
						}
						var tColNum = tRow[1]/1;
						if(tColNum>colNum)
						{
							//need to reduce the row by one
							f.formCell= tRow[0] + "," + (tColNum-1);
						}
					});

					//adjust column widths
					var rawColumnWidths = Ext.getCmp('adminFormSettings_colWidthId').getValue();
					if(rawColumnWidths)
					{
						var widths = rawColumnWidths.split(";");
						var newWidths = [];
						widths.forEach(function(s){
							if(s=="") return;
							var spanParts = s.split(":");
							var w = spanParts[0]/1;
							if(w>colNum) w=w-1;
							newWidths.push(w + ":" + spanParts[1].trim());
						});
						Ext.getCmp('adminFormSettings_colWidthId').setValue(newWidths.join(";"));
					}

					//adjust column spans that match the cell
					var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
					if(rawColumnSpans)
					{
						var spans = rawColumnSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							var spanPart = spanParts[1]/1;
							if(colNum==spanPart) return;
							if(colNum < spanPart) spanPart=spanPart-1;
							newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
					}

					//adjust row spans that match the cell
					var rawRowSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
					if(rawRowSpans)
					{
						var spans = rawRowSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							var spanPart = spanParts[1]/1;
							if(colNum==spanPart) return;
							if(colNum < spanPart) spanPart=spanPart-1;
							newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
					}




					//adjust total rows
					var maxCols = Ext.getCmp('adminFormSettings_colsId').getValue()/1;
					Ext.getCmp('adminFormSettings_colsId').setValue(maxCols-1);


					ijf.admin.refreshFieldList();
					ijf.admin.listView.getView().refresh();
					//repaint preview...
					ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);

				} }
			,{ text: 'Insert Row Above', handler: function()  {

			//each row, blow away if same cell.
					var rc = cell[0].split(",");
					var rowNum = rc[0]/1;
					//remove the fields in row
					Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
					{
						var f = ijf.admin.cwfAdmin_form.fields[fk];
						var tRow = f.formCell.split(",");
						var tRowNum = tRow[0]/1;
						if(tRowNum>=rowNum)
						{
							//need to reduce the row by one
							f.formCell=(tRowNum+1) + "," + tRow[1];
						}
					});

					//adjust total rows
					var maxRows = Ext.getCmp('adminFormSettings_rowsId').getValue()/1;
					Ext.getCmp('adminFormSettings_rowsId').setValue(maxRows+1);

					//adjust column spans   adminFormSettings_colSpanId
					var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
					if(rawColumnSpans)
					{
						var spans = rawColumnSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							var spanRow = spanParts[0]/1;
							if(spanRow>=(rc[0]/1))spanRow=spanRow+1;
							newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
					}

					//adjust row spans   adminFormSettings_colSpanId
					var rawColumnSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
					if(rawColumnSpans)
					{
						var spans = rawColumnSpans.split(";");
						var newSpans = [];
						spans.forEach(function(s){
							var spanParts = s.split(",");
							var spanRow = spanParts[0]/1;
							if(spanRow>=(rc[0]/1))spanRow=spanRow+1;
							newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
						});
						Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
					}

					ijf.admin.refreshFieldList();
					ijf.admin.listView.getView().refresh();
					//repaint preview...
					ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);
			} }
			,{ text: 'Insert Row Below', handler: function()  {

						//each row, blow away if same cell.
								var rc = cell[0].split(",");
								var rowNum = rc[0]/1;
								//remove the fields in row
								Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
								{
									var f = ijf.admin.cwfAdmin_form.fields[fk];
									var tRow = f.formCell.split(",");
									var tRowNum = tRow[0]/1;
									if(tRowNum>rowNum)
									{
										//need to reduce the row by one
										f.formCell=(tRowNum+1) + "," + tRow[1];
									}
								});

								//adjust total rows
								var maxRows = Ext.getCmp('adminFormSettings_rowsId').getValue()/1;
								Ext.getCmp('adminFormSettings_rowsId').setValue(maxRows+1);

								//adjust column spans   adminFormSettings_colSpanId
								var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
								if(rawColumnSpans)
								{
									var spans = rawColumnSpans.split(";");
									var newSpans = [];
									spans.forEach(function(s){
										var spanParts = s.split(",");
										var spanRow = spanParts[0]/1;
										if(spanRow>(rc[0]/1))spanRow=spanRow+1;
										newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
									});
									Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
								}
								//adjust row spans   adminFormSettings_colSpanId
								var rawColumnSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
								if(rawColumnSpans)
								{
									var spans = rawColumnSpans.split(";");
									var newSpans = [];
									spans.forEach(function(s){
										var spanParts = s.split(",");
										var spanRow = spanParts[0]/1;
										if(spanRow>(rc[0]/1))spanRow=spanRow+1;
										newSpans.push(spanRow + "," + spanParts[1].trim() + "," + spanParts[2].trim());
									});
									Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
								}

								ijf.admin.refreshFieldList();
								ijf.admin.listView.getView().refresh();
								//repaint preview...
								ijfUtils.clearAll();
								ijf.admin.renderForm("ijfContent",true);
			} }
			,{ text: 'Insert Column Right', handler: function()  {
						   //each column, blow away if same cell.
							var rc = cell[0].split(",");
							var colNum = rc[1]/1;
							//remove the fields in row
							Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
							{
								var f = ijf.admin.cwfAdmin_form.fields[fk];
								var tRow = f.formCell.split(",");

								var tColNum = tRow[1]/1;
								if(tColNum>colNum)
								{
									//need to reduce the row by one
									f.formCell= tRow[0] + "," + (tColNum+1);
								}
							});


							//adjust column widths
							var rawColumnWidths = Ext.getCmp('adminFormSettings_colWidthId').getValue();
							if(rawColumnWidths)
							{
								var widths = rawColumnWidths.split(";");
								var newWidths = [];
								widths.forEach(function(s){
									var spanParts = s.split(":");
									var w = spanParts[0]/1;
									if(w>colNum) w=w+1;
									newWidths.push(w + ":" + spanParts[1].trim());
								});
								Ext.getCmp('adminFormSettings_colWidthId').setValue(newWidths.join(";"));
							}


							//adjust column spans that match the cell
							var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
							if(rawColumnSpans)
							{
								var spans = rawColumnSpans.split(";");
								var newSpans = [];
								spans.forEach(function(s){
									var spanParts = s.split(",");
									var spanPart = spanParts[1]/1;
									if(colNum < spanPart) spanPart=spanPart+1;
									newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
								});
								Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
							}

							//adjust row spans that match the cell
							var rawRowSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
							if(rawRowSpans)
							{
								var spans = rawRowSpans.split(";");
								var newSpans = [];
								spans.forEach(function(s){
									var spanParts = s.split(",");
									var spanPart = spanParts[1]/1;
									if(colNum < spanPart) spanPart=spanPart+1;
									newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
								});
								Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
							}

							//adjust total rows
							var maxCols = Ext.getCmp('adminFormSettings_colsId').getValue()/1;
							Ext.getCmp('adminFormSettings_colsId').setValue(maxCols+1);



							ijf.admin.refreshFieldList();
							ijf.admin.listView.getView().refresh();
							//repaint preview...
							ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);

				} }
				,{ text: 'Insert Column Left', handler: function()  {
						   //each column, blow away if same cell.
							var rc = cell[0].split(",");
							var colNum = rc[1]/1;
							Object.keys(ijf.admin.cwfAdmin_form.fields).forEach(function(fk)
							{
								var f = ijf.admin.cwfAdmin_form.fields[fk];
								var tRow = f.formCell.split(",");
								var tColNum = tRow[1]/1;
								if(tColNum>=colNum)
								{
									//need to reduce the row by one
									f.formCell= tRow[0] + "," + (tColNum+1);
								}
							});

							//adjust column widths
							var rawColumnWidths = Ext.getCmp('adminFormSettings_colWidthId').getValue();
							if(rawColumnWidths)
							{
								var widths = rawColumnWidths.split(";");
								var newWidths = [];
								widths.forEach(function(s){
									var spanParts = s.split(":");
									var w = spanParts[0]/1;
									if(w>=colNum) w=w+1;
									newWidths.push(w + ":" + spanParts[1].trim());
								});
								Ext.getCmp('adminFormSettings_colWidthId').setValue(newWidths.join(";"));
							}

							//adjust column spans that match the cell
							var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
							if(rawColumnSpans)
							{
								var spans = rawColumnSpans.split(";");
								var newSpans = [];
								spans.forEach(function(s){
									var spanParts = s.split(",");
									var spanPart = spanParts[1]/1;
									if(colNum <= spanPart) spanPart=spanPart+1;
									newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
								});
								Ext.getCmp('adminFormSettings_colSpanId').setValue(newSpans.join(";"));
							}

							//adjust row spans that match the cell
							var rawRowSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
							if(rawRowSpans)
							{
								var spans = rawRowSpans.split(";");
								var newSpans = [];
								spans.forEach(function(s){
									var spanParts = s.split(",");
									var spanPart = spanParts[1]/1;
									if(colNum <= spanPart) spanPart=spanPart+1;
									newSpans.push(spanParts[0].trim() + "," + spanPart + "," + spanParts[2].trim());
								});
								Ext.getCmp('adminFormSettings_rowSpanId').setValue(newSpans.join(";"));
							}


							//adjust total rows
							var maxCols = Ext.getCmp('adminFormSettings_colsId').getValue()/1;
							Ext.getCmp('adminFormSettings_colsId').setValue(maxCols+1);



							ijf.admin.refreshFieldList();
							ijf.admin.listView.getView().refresh();
							//repaint preview...
							ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);

				} }
				,{ text: 'Set Column Widths', handler: function()  {

						//widths may or may not be defined, so bootstrap all
						var colCnt = Ext.getCmp('adminFormSettings_colsId').getValue()/1;
						var baseCols = [];
						for(var i=0;i<colCnt;i++)
						{
							baseCols[(i+1)]="50px";
						}
						//get configured column widths
						var rawColumnWidths = Ext.getCmp('adminFormSettings_colWidthId').getValue();
						if(rawColumnWidths)
						{
							var widths = rawColumnWidths.split(";");
							widths.forEach(function(s){
								var spanParts = s.split(":");
								if(baseCols.hasOwnProperty(spanParts[0].trim())) baseCols[spanParts[0].trim()]=spanParts[1].trim();
							});
						}

						var newWidths = [];
						var widthFields = Object.keys(baseCols).map(function(c){
							return {
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'Column: ' + c,
									widthId: c,
									labelWidth: 100,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 300,
									value: baseCols[c],
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											var nw = n;
											if(!nw) nw="0px";
											baseCols[f.widthId] = nw;
										}
									}
								};
						});

				  var widthEditWin = new Ext.Window({
						layout: 'vbox',
						title: "Column Width Editor",
						width: 400,
						height:470,
						closable: true,
						items: widthFields,
						buttons:[{
							text:'OK',
							handler: function(f,i,n){
											var nw = Object.keys(baseCols).map(function(w){return w + ":" + baseCols[w]});
											Ext.getCmp('adminFormSettings_colWidthId').setValue(nw.join(";"));
											widthEditWin.close();
											ijf.admin.refreshFieldList();
											ijf.admin.listView.getView().refresh();
											//repaint preview...
											ijfUtils.clearAll();
											ijf.admin.renderForm("ijfContent",true);
							}}
						   ,
							{
								text:'Cancel',
								handler: function(){
									widthEditWin.close();
								}}
						],
						modal: true
					});
					widthEditWin.show();


				} }
			,{ text: 'Add Field', handler: function()  {

				    if(rec) return;
					var rc = cell[0].split(",");
					rec = Ext.create('gridFieldFieldsArray');
					var ts =new Date().getTime();
					rec.data.iid=ts;
					ijf.admin.listView.getStore().insert(0, rec);
					//get the max cell, incriment by one and add this to last row first cell
					rec.data.cell=rc[0]+","+rc[1];
					ijf.admin.cwfAdmin_form.fields[rec.data.iid]={"iid":ts,"formCell":rc[0]+","+rc[1],"controlType":"html","dataSource":"New Cell"};
					ijf.admin.refreshFieldList();
					ijf.admin.listView.getView().refresh();
					ijfUtils.clearAll();
					ijf.admin.renderForm("ijfContent",true);
			  } }
			,{ text: 'Set Field Spans', handler: function()  {


						var cSpan = 1;
						var rSpan = 1;
						var rc = cell[0].split(",");
						var cRow = rc[0]/1;
						var cCol = rc[1]/1;
						var currentSpans = [];
						var currentRowSpans = [];


						var rawColumnSpans = Ext.getCmp('adminFormSettings_colSpanId').getValue();
						if(rawColumnSpans)
						{
							var spans = rawColumnSpans.split(";");
							spans.forEach(function(s){
								var spanParts = s.split(",");
								currentSpans[spanParts[0].trim() + "," + spanParts[1].trim()]=spanParts[2].trim();
								if((cRow==spanParts[0].trim())&& (cCol==spanParts[1].trim())) cSpan = spanParts[2].trim();
							});
						}
						if(!currentSpans.hasOwnProperty(cRow + "," + cCol)) currentSpans[cRow + "," + cCol]=cSpan;


						var rawRowSpans = Ext.getCmp('adminFormSettings_rowSpanId').getValue();
						if(rawRowSpans)
						{
							var spans = rawRowSpans.split(";");
							spans.forEach(function(s){
								var spanParts = s.split(",");
								currentRowSpans[spanParts[0].trim() + "," + spanParts[1].trim()]=spanParts[2].trim();
								if((cRow==spanParts[0].trim())&& (cCol==spanParts[1].trim())) rSpan = spanParts[2].trim();
							});
						}
						if(!currentRowSpans.hasOwnProperty(cRow + "," + cCol)) currentRowSpans[cRow + "," + cCol]=rSpan;




				  var widthEditWin = new Ext.Window({
						layout: 'vbox',
						title: "Column Span Editor",
						width: 300,
						height:150,
						closable: true,
						items: [{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'Column Span for: ' + cRow + "," + cCol,
									labelWidth: 160,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 220,
									value: cSpan,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											cSpan = n;
										}
									}
								},
								{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'Row Span for: ' + cRow + "," + cCol,
									labelWidth: 160,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 220,
									value: rSpan,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											rSpan = n;
										}
									}
								}],
						buttons:[{
							text:'OK',
							handler: function(f,i,n){
											var ns = Object.keys(currentSpans).reduce(function(inNs,w){
												var tspan = currentSpans[w];
												if(w==(cRow + "," + cCol)) tspan = cSpan;
												if((tspan/1)<2) return inNs;
												inNs.push(w + "," + tspan);
												return inNs;
											},[]);
											Ext.getCmp('adminFormSettings_colSpanId').setValue(ns.join(";"));
											ns = Object.keys(currentRowSpans).reduce(function(inNs,w){
												var tspan = currentRowSpans[w];
												if(w==(cRow + "," + cCol)) tspan = rSpan;
												if((tspan/1)<2) return inNs;
												inNs.push(w + "," + tspan);
												return inNs;
											},[]);
											Ext.getCmp('adminFormSettings_rowSpanId').setValue(ns.join(";"));
											widthEditWin.close();
											ijf.admin.refreshFieldList();
											ijf.admin.listView.getView().refresh();
											//repaint preview...
											ijfUtils.clearAll();
											ijf.admin.renderForm("ijfContent",true);
							}}
						   ,
							{
								text:'Cancel',
								handler: function(){
									widthEditWin.close();
								}}
						],
						modal: true
					});
					widthEditWin.show();


				} }
			    ,{ text: 'Copy Field', handler: function()  {
					    var fromCell = cell[0].trim();
						var rc = cell[0].split(",");
						var toRow = 1;
						var toCol = 1;

				  var widthEditWin = new Ext.Window({
						layout: 'vbox',
						title: "Copy Field to Cell",
						width: 300,
						height:150,
						closable: true,
						items: [{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'To Row',
									labelWidth: 100,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 200,
									value: 1,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											toRow = n;
										}
									}
								},
								{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'To Column',
									labelWidth: 100,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 200,
									value: 1,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											toCol = n;
										}
									}
								}],
						buttons:[{
							text:'OK',
							handler: function(f,i,n){

											//need to create a field object copying source cell...
											var sourceCell = null;
											ijf.admin.listView.getStore().each(function(r)
											{
												if(r.data.cell==cell[0])
												{
													sourceCell = ijf.admin.cwfAdmin_form.fields[r.data.iid];
												}
											});
											if(sourceCell)
											{
												//circular pevents var targetCell = JSON.parse(JSON.stringify(sourceCell));
												var targetCell = Object.keys(sourceCell).reduce(function(inObj,k){
													if(k!="form") inObj[k]=sourceCell[k];
													return inObj;
												},{});
												targetCell.formCell = toRow + "," + toCol;
												targetCell.iid = new Date().getTime();
											    ijf.admin.cwfAdmin_form.fields[targetCell.iid]=targetCell;
												widthEditWin.close();
												ijf.admin.refreshFieldList();
												ijf.admin.listView.getView().refresh();
												//repaint preview...
												ijfUtils.clearAll();
												ijf.admin.renderForm("ijfContent",true);
											}
											else
											{
												ijfUtils.modalDialogMessage("Information","Sorry no source field was found");
												widthEditWin.close();
											}
							}}
						   ,
							{
								text:'Cancel',
								handler: function(){
									widthEditWin.close();
								}}
						],
						modal: true
					});
					widthEditWin.show();


				} }
				,{ text: 'Move Field', handler: function()  {
					    var fromCell = cell[0].trim();
						var rc = cell[0].split(",");
						var toRow = 1;
						var toCol = 1;

				  var widthEditWin = new Ext.Window({
						layout: 'vbox',
						title: "Move Field to Cell",
						width: 300,
						height:150,
						closable: true,
						items: [{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'To Row',
									labelWidth: 140,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 220,
									value: 1,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											toRow = n;
										}
									}
								},
								{
									xtype: 'textfield',
									labelAlign: 'left',
									fieldLabel: 'To Column',
									labelWidth: 140,
									labelStyle: "color:darkblue",
									margin: '4 0 0 10',
									width: 220,
									value: 1,
									allowBlank:false,
									listeners: {
										change: function(f,n,o){
											toCol = n;
										}
									}
								}],
						buttons:[{
							text:'OK',
							handler: function(f,i,n){

											//need to create a field object copying source cell...
											var sourceCell = null;
											ijf.admin.listView.getStore().each(function(r)
											{
												if(r.data.cell==cell[0])
												{
													sourceCell = ijf.admin.cwfAdmin_form.fields[r.data.iid];
												}
											});

											if(sourceCell)
											{
												sourceCell.formCell = toRow + "," + toCol;
												widthEditWin.close();
												ijf.admin.refreshFieldList();
												ijf.admin.listView.getView().refresh();
												//repaint preview...
												ijfUtils.clearAll();
												ijf.admin.renderForm("ijfContent",true);
											}
											else
											{
												ijfUtils.modalDialogMessage("Information","Sorry no source field was found");
												widthEditWin.close();
											}
							}}
						   ,
							{
								text:'Cancel',
								handler: function(){
									widthEditWin.close();
								}}
						],
						modal: true
					});
					widthEditWin.show();


				} }
			]
		});
        menu_grid.showAt(posX,posY);
	}

}
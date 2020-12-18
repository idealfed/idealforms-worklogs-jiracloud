var ijf = ijf || {};

ijf.fw = {

setup:function (setup)
{
    //process settings...
    //decode setup data items = "Settings is the enhanced grid
    //this.whitelist = null; //setup.data.whitelist;
    var inFormSets = setup.resultSet;
    //this.categoryId=setup.id;
    //this.id=setup.id;
    //this.setup = setup;

    var inCustomTypes = setup.customTypes;

    //this.settings = new Array();
    this.reference = new Array();
    this.referenceFile = null;

	this.formSets = new Array();
	this.formSetsKeyed = new Array();

    //this.templates = new Array();

    this.treeCollapsed = 'false';
    this.listWidth = 900;
    this.listNameWidth = 150;
    this.listProjectNameWidth = 150;
    this.listProjectIdWidth = 100;
    this.listFormNameWidth = 150;
    this.listFormIdWidth = 100;

    this.listHeight = 500;
    this.listTreeWidth = 150;
    this.listTreeCollapsed = false;
    this.listFilter = "";

    this.onChangeStyle = {"border-right":"solid blue 4px"};
    this.saveErrorStyle = {"border-right":"solid red 4px"};


//manage custom types....
  ijf.fw.CustomTypes = [];
  try
  {
	  ijf.fw.CustomTypes = inCustomTypes.reduce(function(inArray,ct){
		  if(!ct.hasOwnProperty("name")) return inArray;
		  var thisCt = {};
		  	thisCt.id = ct.id;
		  	thisCt.name = ct.name;
		  	thisCt.description = ct.description;
		  	thisCt.customType = ct.customType;
		  	thisCt.fieldName = ct.fieldName;
		  	thisCt.settings = ct.settings;
		  inArray.push(thisCt);
		  return inArray;
	  },[]);
  }
  catch(e)
  {
	  ijfUtils.footLog('Sorry failed to load the custom types...');
	  ijf.fw.CustomTypes = [];
  }


/*
	this actually has several form sets in it... parse them all....
*/
    ijf.formList = new Array();
    this.forms= new Array();
    try
    {
		this.formSets = inFormSets.map(function(sf){
			if(!sf.hasOwnProperty("name")) return {};
			var thisfs = {};
			thisfs.name = sf.name;
			thisfs.id = sf.id;
			thisfs.projectName = sf.projectName;
			thisfs.projectId = sf.projectId;
			thisfs.snippets = sf.snippets;
			if(sf.hasOwnProperty("settings")) thisfs.rawSettings = JSON.parse(sf.settings);
			thisfs.settings=[];
			if(!thisfs.rawSettings) thisfs.rawSettings=[];
			thisfs.rawSettings.forEach(function(s){
				if(!s.name) return;
				thisfs.settings[s.name]=s.value;
			});
			thisfs.forms = sf.forms.map(function(f){
				if(!f.name) return {};
				var thisF = {};
				thisF.formSet = thisfs;
				thisF.name = f.name;
				thisF.formType = f.formType;
				(f.testIssue=="~") ? thisF.testIssue="": thisF.testIssue = f.testIssue;
				thisF.formAnon = f.formAnon;
				thisF.formProxy = f.formProxy;
				thisF.issueType = f.issueType;
				thisF.id = f.id;
				if(f.hasOwnProperty("settings")) thisF.rawSettings = JSON.parse(f.settings);
				if(f.hasOwnProperty("fields")) thisF.rawFields = JSON.parse(f.fields);
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

				ijf.formList.push([thisF.id,thisF.name,thisF.formType, this.projectName,this.name]);
				ijf.fw.forms[thisF.name]=thisF;
				return thisF;
			},thisfs);
			ijf.fw.formSetsKeyed[thisfs.name]=thisfs;
			return thisfs;
		});

    }
    catch(e)
    {
        ijfUtils.modalDialog("Failed to load the framework!");
        throw(e);
    }

},

validateUrl:function(inUrl)
{
    for(var i in this.whitelist)
    {
        if(this.whitelist.hasOwnProperty(i))
        {
            if(inUrl.indexOf(this.whitelist[i].url)>-1) return true;
        }
    }

    return false;
},

saveReferenceData:function ()
{
    var dataOut = "";

    for(var e in this.reference)
    {
        if(this.reference.hasOwnProperty(e))
        {
            var ety = this.reference[e];

            dataOut += ety.generateRawData();
        }
    }

    if(dataOut)
    {
        //synchonously load to server...
        try
        {
            ijfUtils.footLog("Calling update reference file synchronous");
            $.ajax({
                async: true,
                type: 'POST',
                url: g_root + '/updateReferenceFile',
                data: {
                    itemId: fw.referenceFile.itemId,
                    sectionId: fw.referenceFile.id,
                    sectionName: fw.referenceFile.name,
                    inText: dataOut
                },
                timeout: 60000,
                success: function(data) {
                    //jQuery('#main').html(jQuery(data).find('#main *'));
                    hideProgress();
                    return true;

                },
                error: function() {
                    hideProgress();
                    ijfUtils.footLog("Failed reference data save!");
                    modalDialogMessage("ERROR", "Save failed, do NOT refresh page, try saving again");
                    return false;
                }
            });
        }
        catch(e)
        {
            hideProgress();
            ijfUtils.footLog("Error in reference data!" + e.message);
            modalDialogMessage("ERROR", "Save failed, do NOT refresh page, try saving again");
            return false;
        }
    }
    else
    {
        hideProgress();
    }

},

getReferenceItemsAsItemValueArray:function(inEntityName, inField, inFilter)
{
    try
    {
        if(this.reference.hasOwnProperty(inEntityName))
        {
            var ety = this.reference[inEntityName];

            return ety.getReferenceItemsAsItemValueArray(inField, inFilter);
        }
    }
    catch(e)
    {
        ijfUtils.footLog("Failed get reference values: " + e.message);
        return [];
    }
},

getReferenceItemsAsSimpleArray:function(inEntityName, inField, inFilter)
{
    try
    {
        if(this.reference.hasOwnProperty(inEntityName))
        {
            var ety = this.reference[inEntityName];

            return ety.getReferenceItemsAsSimpleArray(inField, inFilter);
        }
    }
    catch(e)
    {
        ijfUtils.footLog("Failed get reference values: " + e.message);
        return [];
    }
},

getReferenceItemsAsCSV:function(inEntityName, inField, inFilter)
{
    try
    {
        if(this.reference.hasOwnProperty(inEntityName))
        {
            var ety = this.reference[inEntityName];

            return ety.getReferenceItemsAsCSV(inField, inFilter);
        }
    }
    catch(e)
    {
        ijfUtils.footLog("Failed get reference values: " + e.message);
        return [];
    }
},

getTemplateIdByName:function(inTemplateName)
{
    for(var t in this.templates)
    {
        if(this.templates.hasOwnProperty(t))
        {
            if(this.templates[t][1]==inTemplateName) return this.templates[t][0];
        }
    }
    return null;
},

getDefaultForm:function(inWorkflowName)
{

    if(this.workflowForms.hasOwnProperty(inWorkflowName))
    {
        return this.workflowForms[inWorkflowName];
    }

    //attempt to find form by the name of the Item...
    var tItemName = item.name;
    tItemName = tItemName.replace(" - Data"," - Display");

    if(this.forms.hasOwnProperty(tItemName))
    {
        return tItemName;
    }
    else
    {
        return this.defaultFormId;
    }

}

}


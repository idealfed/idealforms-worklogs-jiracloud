//var inMWF = false;



function IjfUserPool()
{
    this.nothing = "";
    this.users = new Array();
}

IjfUserPool.prototype.getUser = function(inId)
{
    if(this.users.hasOwnProperty(inId)) return this.users[inId];
    var u = null;
    try
    {
		if(inId==ijf.main.currentUser.id)
		{
			var uData = jQuery.ajax({
				type: "GET",
				url: g_root + '/rest/api/2/myself?expand=groups,applicationRoles',
				async: false
			}).responseText;
		}
		else
		{
			var uData = jQuery.ajax({
				type: "GET",
                url: g_root + '/rest/api/2/myself?expand=groups,applicationRoles',
				//url: g_root + '/rest/api/2/user?username='+inId+'&expand=groups,applicationRoles',
				async: false
			}).responseText;
		}

		if(uData.indexOf("errorMessage")>-1)
		{
			ijfUtils.footLog("Unable to get user: " + inId + " " + uData);
			u=null;
		}
		else
		{
			var u = new IjfUser(inId,uData);
			this.users[inId] = u;
		}

    }
    catch(e)
    {
		ijfUtils.footLog("Unable to get user: " + inId + " " + e.message);
		u=null;
	}
    return u;
}
IjfUserPool.prototype.getUserEmail=function(inId)
{
    var user = this.getUser(inId);
    if(user) return user.email;
    return null;
}
IjfUserPool.prototype.getUserLastFirst=function(inId)
{
    var user = this.getUser(inId);
    return user.lastName + ", " + user.firstName;
}
IjfUserPool.prototype.getUserGroups=function(inId)
{
    var user = this.getUser(inId);
    return user.getUserGroups();
}
function IjfUser(inId,inData)
{

    this.id = inId;
    this.email = "tbd";
    this.lastName = "tbd";
    this.firstName = "tbd";
    this.groups = null;
    this.groupList = null;
    this.maxGroups = null;
    this.exerciseRoles = null;
    this.collectUser=null;
    this.displayName = "tbd";

    try
    {
        this.inObj = JSON.parse(inData);
		this.email = this.inObj.emailAddress;
		this.lastName = this.inObj.name;
		this.firstName = this.inObj.name;
		this.groups = null;
		this.groupList = null;
		if(this.inObj.groups)
			if(this.inObj.groups.items) {this.groups = this.inObj.groups.items; this.groupList = this.groups.map(function(g){return g.name});};
		this.displayName = this.inObj.displayName;
		this.maxGroups = null;
		this.exerciseRoles = null;
		this.collectUser=null;
    }
    catch(e) {}
    this.lastFirst =  this.lastName + ", " + this.firstName;
}
IjfUser.prototype.getUserGroupList=function(inFilter)
{

    if(this.groupList==null)
    {
        this.groupList = new Array();
        this.maxGroups = new Array();
        var uData = jQuery.ajax({
            type: "GET",
            url: g_root + '/getUserGroups?userId='+ this.id,
            async: false
        }).responseText;

        var gres = JSON.parse(uData);
        //var gres = JSON.parse(tval.results)
        for(var g in gres.results.maxGroupList)
        {

            if(!gres.results.maxGroupList.hasOwnProperty(g)) continue;


            this.groupList.push([gres.results.maxGroupList[g].groupId,gres.results.maxGroupList[g].groupTitle]);
            this.maxGroups[gres.results.maxGroupList[g].groupId] = gres.results.maxGroupList[g];
        }

    }

    if(inFilter)
    {
        var filteredList = [];
        for (var i in this.groupList)
        {
            if(!this.groupList.hasOwnProperty(i)) continue;
            if(this.groupList[i][0].toLowerCase().indexOf(inFilter.toLowerCase())>-1)  filteredList.push(this.groupList[i]);
        }
        return filteredList;
    }
    else
    {
        return this.groupList;
    }

}

IjfUser.prototype.hasMaxGroupByName=function(inGroupName)
{
    var gList = this.getUserGroupList();
    for(var g in this.maxGroups)
    {
        if(this.maxGroups.hasOwnProperty(inGroupName))
        {
            if(this.maxGroups[g].groupTitle==inGroupName) return true;
        }
    }
    return false;
}
IjfUser.prototype.hasMaxGroupById=function(inGroupId)
{
    var gList = this.getUserGroupList();
    if(this.maxGroups.hasOwnProperty(inGroupId)) return true;
    return false;
}

IjfUser.prototype.getExerciseRoles=function()
{

    if(this.exerciseRoles==null)
    {

        this.exerciseRoles = new Array();

        try
        {
            var uData = jQuery.ajax({
                type: "GET",
                url: g_root + '/getUserExerciseRoles?exerciseId='+ exerciseId,
                async: false
            }).responseText;

            var tval = JSON.parse(uData);

            for(var g in tval.results)
            {
                if(!tval.results.hasOwnProperty(g)) continue;
                this.exerciseRoles.push(tval.results[g]);
            }
        }
        catch(e)
        {
            footLog("Failed to get user roles");
        }

    }

    return this.exerciseRoles;
}

IjfUser.prototype.hasExerciseRoleId=function(inId)
{
    if(!this.exerciseRoles) return false;
    for(var r in this.exerciseRoles)
    {
        if(this.exerciseRoles.hasOwnProperty(r))
        {
            if(this.exerciseRoles[r].objectRoleId==inId) return true;
        }
    }
    return false;
}



function IjfExercise(inData)
{

    //this.name = inName;

    this.data = inData;
    this.type = "jira";
    this.tree = inData; //JSON.parse(inData.exercise.tree);
    //this.maxId = g_username;
    // GLOBAL VARS

    //this.node = this.tree.results[0];
    //this.attr = this.node.attr;
    this.name= "Projects";

    this.id = "root";

    // GLOBAL VAR
    ijf.main.gNodes[this.id] = this;

    //this.groups = new Array();

    this.projects = new Array();

    //this.templates = new Array();
    //this.stylesheets = new Array();
    this.snippets = []; //inData.exercise.snippets;

    //this.workflow= JSON.parse(this.data.exercise.workflow);
    for(var p in inData)
    {
		if(!inData.hasOwnProperty(p)) continue;
		this.projects[inData[p].id] = new IjfProject(inData[p], this);
	}

    //this.loadStylesheets();
}


IjfExercise.prototype.getTreeStructure = function(withChecks)
{
    var retJson = {};
    retJson.text = this.name;
    retJson.id=this.id;
    retJson.leaf = false;
    retJson.cls = "folder";
    if(withChecks) retJson.checked=false;
    retJson.children = new Array();
    if(Object.size(this.projects) > 0)
    {

        for(var i in this.projects)
        {

            if(!this.projects.hasOwnProperty(i)) continue;

            retJson.children.push(this.projects[i].getTreeStructure(withChecks));
        }
    }
    else
    {
        retJson.leaf =true;
    }
    return retJson;
}

IjfExercise.prototype.getAllItemsInList = function(inList, inUniqueIds)
{
    if(Object.size(this.groups) > 0)
    {

        for(var i in this.groups)
        {

            if(!this.groups.hasOwnProperty(i)) continue;

            if(window.g_debug != 'true')
            {
                if(this.groups[i].name=="Collect Forms") continue;
            }
            this.groups[i].getAllItemsInList(inList,inUniqueIds);
        }
    }
}


function IjfProject(inProject, inExercise)
{
    this.node = inProject;
    this.exercise=inExercise;
    this.name=inProject.name;
    this.type="project";
    this.id = inProject.id;
    this.key = inProject.key;
    this.items = new Array();
    this.categories = new Array();
    //GLOBAL
    ijf.main.gNodes[this.id] = this;

}

IjfProject.prototype.getTreeStructure = function(withChecks)
{
    var retJson = {};

    retJson.text = this.name;
    retJson.id=this.id;
    retJson.leaf =false;
    retJson.cls = "folder";
    retJson.children = new Array();
    if(withChecks) retJson.checked=false;
    if(Object.size(this.categories) > 0)
    {
        for(var i in this.categories)
        {
            if(!this.categories.hasOwnProperty(i)) continue;
            retJson.children.push(this.categories[i].getTreeStructure(withChecks));
        }
    }
    else
    {
        retJson.leaf =true;
    }
    return retJson;
}









function itemControl(inId, inField, inItem, inControl, inContainer)
{
    this.dirty = false;
    this.id=inId;
    this.field = inField;
    this.item = inItem;
    this.control = inControl;
    this.container = inContainer;
    this.newVal;
    this.message;
    this.mappedSectionName;
    this.batchSaveSection;
    this.batchSaveValue;
}
itemControl.prototype.saveGridToCollect=function(inGridData, inSectionName)
{
    //special handeler for grid cells...
    //cnvert array of ojbect
    var jOut = new Array();
    var tObj;
    for(var j in inGridData)
    {
        if(!inGridData.hasOwnProperty(j)) continue;
        tObj = {};
        for(var key in inGridData[j])
        {
            if(!inGridData[j].hasOwnProperty(key)) continue;
            tObj[key]=mwfUtils_ConvertShort2Db2Date(inGridData[j][key]);
        }
        jOut.push(tObj);
    }

    var outJson = JSON.stringify(jOut);
    var procall = "/updateGrid";
    if(this.field.controlType=="tablecellappend") procall = "/appendGrid";

    if(fw.forms[window.g_formId].settings.batchSave=="true")
    {
        var thisSect = this.item.getSectionByName(inSectionName);
        this.batchSaveSection = thisSect;
        this.batchSaveValue = jOut;
        saveQueueBatch.push(this);
        return;
    }


    footLog("Calling " + procall + " on for grid cellfamily");
    jQuery.ajax({
        async: true,
        url: g_root + procall,
        type: 'POST',
        data: {
            controlId: this.id,
            itemId: this.item.id,
            sectionName: inSectionName,
            additionalTarget: fw.saveToAdditionalTarget,
            sectionId: this.item.getSectionIdByName(inSectionName),
            inGrid: outJson
        },
        timeout: 1200000,
        success: function(data) {
            //jQuery('#main').html(jQuery(data).find('#main *'));
            footLog("Successful response but...checking...");
            //todo need to parse for good
            if(data=="refresh")
            {
                window.onbeforeunload= null;
                window.location.reload();
                return;
            }
            var c = controlSet[data.controlId];

            var r = data.results;
            var stat = true;
            if(c!=null)
            {
                delete saveQueue[c.id];

                for(var i in r)
                {
                    if(!r.hasOwnProperty(i)) continue;
                    if(r[i].status!=200) stat=false;
                }

                //ok check results...
                c.message = "";
                if(data.rows)
                {
                    var rawRows = JSON.parse(data.rows);
                    for(var i in rawRows.results)
                    {
                        if(!rawRows.results.hasOwnProperty(i)) continue;
                        if(rawRows.results[i].status=='error')
                        {
                            c.message+=" Row: " + rawRows.results[i].row + ", " + rawRows.results[i].message;
                            stat=false;
                        }
                    }
                }
                if(stat)
                {
                    if(saveQueueFamilies.hasOwnProperty(c.id))
                    {
                        for(var fCont in saveQueueFamilies[c.id])
                        {
                            if(saveQueueFamilies[c.id].hasOwnProperty(fCont))
                            {
                                var tjqid = "#" + saveQueueFamilies[c.id][fCont].container.id;
                                jQuery(tjqid).removeAttr("style");
                                saveQueueFamilies[c.id][fCont].dirty=false;
                            }
                        }
                    }
                    else
                    {
                        var tjqid = "#" + c.container.id;
                        jQuery(tjqid).removeAttr("style");
                        c.dirty=false;
                    }
                    //lastly, upate local model
                    //this is an update or append, if table append, append
                    if(procall == "/appendGrid")
                    {
                        c.item.appendSectionTableObjData(inSectionName, jOut);
                    }
                    else
                    {
                        c.item.setSectionTableObjData(inSectionName, jOut);
                    }

                }
                else
                {
                    footLog("Failed section save on return....");
                    if(r.hasOwnProperty("statusMessage"))
                    {
                        c.message = c.field.dataSource + ": " + r.statusMessage
                    }
                    else
                    {
                        c.message= c.field.dataSource + " failed to save: " + r.results;
                    }

                    saveQueueFailures.push(c);
                    if(r.hasOwnProperty("results")) footLog("Failed section save...." + r.results);
                    if(r.hasOwnProperty("statusMessage")) footLog("Error: " + r.statusMessage);
                    var tjqid = "#" + c.container.id;
                    jQuery(tjqid).css(fw.saveErrorStyle);
                }
                mwf_checkSaveEnd();
            }
            else
            {

                hideProgress();
                footLog("Failed section save....");
                alert("Sorry but a table failed to upload with message:\n" + results.message);

            }
            //must determine the saved control by the return result...

        },
        error: function() {
            footLog("Failed section save!");
            //this.container.style.borderRight = "solid red 3px";
            //failed, notify the user...
            hideProgress();
            alert("Sorry but a table failed to upload with message:\n" + results.message);

        }



    });

}
itemControl.prototype.prepForSave=function(saveQueueBatch)
{


    //OK, value in the control, is now the value you want to save...
    //need to switch on the type of control, text or grid
	var tSection = ijfUtils.getFieldDef(ijf.main.itemId,this.field.dataSource);
	var thisT = {};
	//manage custom types first....
	if(!tSection.jiraMeta)
	{
	  //look for special types
	  if(this.field.controlType=="issue relator")
	  {
			tSection = {"jiraMeta":{"schema":{"type":"string"}}};
			tSection["jiraField"]={};
	  }
	  else
	  {
			var testDs = this.field.dataSource;
			ijf.fw.CustomTypes.forEach(function(t){if(t.name==testDs) thisT=t;});
			if(thisT)
			{
				//we have a custom type....
				if(thisT.customType=="GRID")
				{
					tSection = {"jiraMeta":{"schema":{"type":"grid"}}};
					tSection["jiraField"]={};
					tSection.jiraField["id"] = ijf.jiraFieldsKeyed[thisT.fieldName].id; //jira id of the custom type field store
				}

				//we have a custom type....
				if(thisT.customType=="FILE ATTRIBUTES")
				{
					tSection = {"jiraMeta":{"schema":{"type":"fileattributes"}}};
					tSection["jiraField"]={};
					tSection.jiraField["id"] = ijf.jiraFieldsKeyed[thisT.fieldName].id; //jira id of the custom type field store
				}
			}
	   }
	}


	//switch on field type to determine how to pull value...
	if(tSection.jiraMeta)
	{
		//check for transition change, add schema if necessary
		if(tSection.jiraMeta.transitions) tSection.jiraMeta.schema = {"type":"status"};

		switch(tSection.jiraMeta.schema.type)
		{
			case 'other':
				//std text value
				this.newVal = this.control.items.items[0].getValue();
				if(this.newVal instanceof Date)
				{
					this.newVal = dateFormat(this.newVal,"yyyy-mm-dd");
				}
				break;
			case 'user':
				//std text value
				var sc = {};
				var newUser = this.control.items.items[0].getValue();
				if(newUser)
					var tv = {"accountId":newUser};
				else
					var tv = null;

 				this.newVal = tv;
				break;
			case 'group':
				//std text value
				var sc = {};
				var newGroup = this.control.items.items[0].getValue();
				if(newGroup)
					var tv = {"name":newGroup};
				else
					var tv = null;

 				this.newVal = tv;
				break;
			case 'securitylevel':
			case 'status':
			case 'priority':
			case 'option':
				//std text value
				  var sc = {};
				  sc.data={};
				  if(this.field.controlType=="radio")
				  {
					  sc = this.control.items.items[0].getValue();
					  if(sc)
					  {
						  var newId = sc[Object.keys(sc)[0]];
						  var tv = {"id":newId};
				  	  }
				  	  else
				  	  {
						 var tv = null;
					  }
				      this.newVal = tv;
				  }
				  else  if(this.field.controlType=="muiSelect")
				  {
					  sc = this.control.state.value;
					  if(sc)
						  var tv = {"id":sc};
					  else
						  var tv = null;

 					  this.newVal = tv;
				  }
				  else  if(this.field.controlType=="muiRadio")
				  {
					  sc = this.control.state.value;
					  if(sc)
						  var tv = {"id":sc};
					  else
						  var tv = null;

 					  this.newVal = tv;
				  }
				  else
				  {
					  sc = this.control.items.items[0].getSelection();
					  if(sc)
						  var tv = {"id":sc.data.field1};
					  else
						  var tv = null;

 					  this.newVal = tv;
				  }

				break;
			case 'array':
				//multi select
				  if(this.field.controlType=="multiselect")
				  {
					  var sc = this.control.items.items[0].getValue();
					  if(sc)
						  var tv = sc.map(function(av){ return {"id":av};});
					  else
					    	var tv = null;

					  this.newVal = tv;
				  }
				  else if(this.field.controlType=="userpickermulti")
				  {

					   var sc = this.control.items.items[0].getValue();
					   if(sc)
						   var tv = sc.map(function(av){ return {"accountId":av};});
					   else
					   		var tv = null;

					   this.newVal = tv;

			      }
				  else if(this.field.controlType=="grouppickermulti")
				  {
					   var sc = this.control.items.items[0].getValue();
					   if(sc)
					   	   var tv = sc.map(function(av){ return {"name":av};});
					   else
							var tv = null;

					   this.newVal = tv;
			      }
				  else if(this.field.controlType=="attachmentupload")
				  {
					  this.newVal = 'na';
			      }
				  else
				  {
					  //standard checkbox array
					  var sc = this.control.items.items[0].getChecked();
					  if(sc)
						  var tv = sc.map(function(av){ return {"id":av.inputValue};});
					  else
					   	  var tv = null;

					  this.newVal = tv;
			  	  }
				break;
			case 'comments-page':
				if(this.field.controlType.substring(0,3)=="mui")
				{
					var cmt = this.control.state.value
				}
				else
				{
				    var cmt = this.control.items.items[0].getValue();
				}
			    var sc = ijfUtils.sanitize(cmt);
			 	var tv = {"body":sc};
 				this.newVal =  tv;
				break;
			case 'number':
				//this.newVal = this.control.items.items[0].getValue()/1;
				//DAYNE update
				if(this.field.controlType.substring(0,3)=="mui"){
            				this.newVal = this.control.state.value/1;
  				}else{
      					this.newVal = this.control.items.items[0].getValue()/1;
				}

				break;
			case 'string':
				//std text value
				//in cases where a multiselect control with ijfReference i need special handling for this
				if(this.field.controlType=="htmleditor")
				{
					//need to get html...

					 var b = this.control.items.items[0].getEditorBody();
					 this.newVal =  b.outerHTML;
				}
				else if(this.field.controlType=="userpicker")
				{
					if(!this.control.items.items[0].selection)
					{
						this.newVal = null;
					}
					else
					{
						var userObject ={"email":this.control.items.items[0].selection.data.email,"displayName":this.control.items.items[0].selection.data.displayName};
                    	this.newVal = JSON.stringify(userObject);
					}
				}
				else if(this.field.controlType=="userpickermulti")
				{
					var vArr = this.control.items.items[0].valueCollection;
					if((vArr.items) && (vArr.items.length>0))
					{

						var usersObject = vArr.items.map(function(av){
							return {"email":av.data.email,"displayName":av.data.displayName};
						});
						this.newVal = JSON.stringify(usersObject);
					}
					else
					{
						this.newVal = null;
					}
				}
				else if(this.field.controlType=="issue relator")
				{
					var vArr = this.control.items.items[0].valueCollection;
					if((vArr.items) && (vArr.items.length>0))
					{

						var issueKeys = vArr.items.map(function(av){
							return {"key":av.data.key};
						});
						this.newVal = issueKeys;
					}
					else
					{
						this.newVal = null;
					}
				}
				else if(this.field.controlType=="multiselect")
				{
					/*
					//value is array.  get the array, switch to actual array values from ijfReference, save a json
					var vArr = this.control.items.items[0].getValue();
					var saveVal = [];
					//need the ijfReference data used for lookup. - it's stored in this.ijfLookup
					var lookups = this.field.ijfLookup;
					if(lookups)
					{
						vArr.forEach(function(v){
							var addVal = lookups.reduce(function(inV,av){if(v==av.id) inV=av.show;return inV;},null);
							if(addVal) saveVal.push(addVal);
						});
					}
					*/

					var saveVal = this.control.items.items[0].valueCollection.items.reduce(function(inA,v)
					{
					  if(v.data.show) inA.push(v.data.show);
					  return inA;
					},[]);

					this.newVal = JSON.stringify(saveVal);
				}
				else if((this.field.controlType=="attachmentmanaged") || (this.field.controlType=="attachmentSPmanaged"))
				{
					//this managed attachment is backed by a field to store name...
					//datasource is the field, newValue is
					var fNameHtml = this.control.items.items[0].getHeader().items.items[0].body.dom.innerHTML;

					//managing IE issue...
                    if(ijfUtils.detectIE())
                    {
						//var fNameParts = fNameHtml.split('<span style="color:yellow">');
						var fNameParts = fNameHtml.split(/<span style\=\"color\: yellow;\">/);
						//var fNameParts2 = fNameParts[1].split('</span');
						var fNameParts2 = fNameParts[1].split(/<\/span>/);
					}
					else
					{
						var fNameParts = fNameHtml.split('<span style="color:yellow">');
						var fNameParts2 = fNameParts[1].split('</span');
					}
					this.newVal=fNameParts2[0];

					//set a flag to have save routine also save this value...
					this.field.dynamicAttachementManaged=true;

				}
				else
				{
					if(this.field.controlType.substring(0,3)=="mui")
					{
						if(this.field.dataReference=="jiraGroup")
						{
							//store the value as object with name and value...
							var tVal = this.control.state.value;
							var tDn = this.control.state.lookup.reduce(function(inS,v){if(v[0]==tVal) inS=v[1];return inS;},"");
						    this.newVal = JSON.stringify({"displayName":tDn, "name": this.control.state.value});
						}
						else
						{
							this.newVal = this.control.state.value;
						}
					}
					else
					{
						this.newVal = this.control.items.items[0].getValue();
					}
				}
				break;
			case 'grid':
				//std text value
					var str = this.control.getStore();
					var gridData = str.getData();
					if(str.isFiltered())
					{
						var allData = gridData.getSource();
						gridData=allData;
					}


				var dataArray = gridData.items.map(function(r){return r.data;});
				//sanitize grid
				var rawGrid = JSON.stringify(dataArray);
				rawGrid = ijfUtils.sanitize(rawGrid);
				this.newVal = rawGrid;
				break;
			case 'fileattributes':
				//std text value
				var gridData = this.control.getStore().getData();
				var dataArray = gridData.items.map(function(r){return r.data;});

				//clean the data for just custom type columns
				var gCols=null;
				if(thisT)
				{
					gCols = JSON.parse(thisT.settings);
					dataArray = dataArray.reduce(function(inArr,r)
					{
						var retObj = {};
						retObj.fileid=r.fileid;
						//now each custom type column, + name maybe
							gCols.forEach(function(col)
							{
								if(r.hasOwnProperty(col.columnName)) retObj[col.columnName]=r[col.columnName];
							});
						inArr.push(retObj);

						//now do it again if this object has children....
						if(r.children)
						{
							inArr = r.children.reduce(function(innerArr,r)
							{
								var retObj = {};
								retObj.fileid=r.fileid;
								//now each custom type column, + name maybe
									gCols.forEach(function(col)
									{
										if(r.hasOwnProperty(col.columnName)) retObj[col.columnName]=r[col.columnName];
									});
								innerArr.push(retObj);
								return innerArr;
							},inArr);
						}

						return inArr;
					},[]);
				}


				//sanitize grid
				var rawGrid = JSON.stringify(dataArray);
				rawGrid = ijfUtils.sanitize(rawGrid);
				this.newVal = rawGrid;
				break;
			case 'datetime':
				var tDate = this.control.items.items[0].getValue();
				this.newVal = "";
				if(tDate) this.newVal=moment(tDate).format().substring(0,19)+".000-0500";
				break;
			case 'date':
				//std text value

					if(this.field.controlType.substring(0,3)=="mui")
					{
						var tDate = this.control.state.value
					}
					else
					{
						var tDate = this.control.items.items[0].getValue();
					}

				this.newVal = null;

				if(tDate) this.newVal = moment(tDate).format("YYYY-MM-DD");
				break;
			default:
				this.newVal="";
				break;
		}
	}
	this.batchSaveSection = tSection;
	this.batchSaveValue = this.newVal;
	saveQueueBatch.push(this);
	return;
}

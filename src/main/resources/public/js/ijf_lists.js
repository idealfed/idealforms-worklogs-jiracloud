var ijf = ijf || {};

ijf.lists = {

filteredItemList:null,
checkedList:null,
itemStore:null,
typeStore:null,
typeSpecStore:null,
thisTypeSpec:null,
checkedNodes:[],
parentNodeId:null,
templateNodeId:null,
templateNodeName:null,
templateDocType:null,
newItemName:null,
originalTitle:"IJF",
dwin:null,
thisF:null,
itemId:0,

filterItemList:function(inId)
{
    var filterColumn = 1;
    var tval="";
    try{
        tval= Ext.get(inId).component.getValue().toLowerCase();
    }
    catch(e){
        tval="";
    }



    var itemList = ijf.formList;

    this.filteredItemList = [];
    this.checkedList = [];
    var uniqueIds = Array();
    //create checked List of Items then filter by string....
    if(Object.size(ijf.lists.checkedNodes) > 0)
    {
        for(var j in ijf.lists.checkedNodes)
        {
            if(!ijf.lists.checkedNodes.hasOwnProperty(j)) continue
            var checkedNode = ijf.lists.checkedNodes[j];
            //var thisNode = ijf.main.gNodes[checkedNode.id];
            for(var i in itemList)
			{
				if(itemList.hasOwnProperty(i))
				{
  				    if(!itemList.hasOwnProperty(i)) continue;
					if(checkedNode.data.text==itemList[i][4]) this.checkedList.push([itemList[i][0],itemList[i][1],itemList[i][2],itemList[i][3],itemList[i][4]]);
				}
			}
        }
    }
    else
    {
        this.checkedList=itemList.slice();
    }

    filteredItemList = new Array();
    if(tval!="")
    {
        for (var i in this.checkedList)
        {
            if(!this.checkedList.hasOwnProperty(i)) continue;
            if(this.checkedList[i][filterColumn].toLowerCase().indexOf(tval)>-1) filteredItemList.push(this.checkedList[i]);
        }
    }
    else
    {
        filteredItemList = this.checkedList.slice();
    }

    this.itemStore.removeAll();
    this.itemStore.loadData(filteredItemList);
},

clearFilter:function(inId)
{
    var tf = Ext.getCmp(inId);
    tf.setValue("");
},

renderItemList_CustomDashBoard:function(inContainerId)
{

    var outHtml = "About to run dashboard";
    try
    {
         outHtml = window[g_dashboard]();
    }
    catch(e)
    {
         outHtml = "Failed to run dashboard: " + g_dashboard + ", error: " + e.message;
    }

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        //width: 'auto',
        //height: 'auto',
        items: {
            html: outHtml,
            frame: false,
            border: false,
            xtype: "panel"}
    });

    var tElement = document.getElementById("ijfContent");
    pnl.render(tElement);

    controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);
},

openForm:function()
{
			var	thisF = {};
			for(var tF in ijf.fw.forms){
				if(!ijf.fw.forms.hasOwnProperty(tF)) return;
				if(ijf.fw.forms[tF].id==ijf.lists.itemId) thisF=ijf.fw.forms[tF];
			}
			if(!thisF.name){ ijfUtils.modalDialogMessage("Form Error","Sorry, undable to find the requested form: " + ijf.lists.itemId); return;}
			var decorator = "";
			if(thisF.formSet.settings["decorator"]=="true") decorator = "&decorator=general";

	//todo:  add switch for cloud vs server
			var cloudToken =  "&jwt=" +getJwtToken();
			if(thisF.testIssue)
			{
				var tUrl = g_root + '/run?itemId='+thisF.testIssue+'&formId='+thisF.name + decorator + cloudToken;
			}
			else
			{
				var tUrl = g_root + '/run?formId='+thisF.name + decorator + cloudToken;
			}
			window.open(tUrl);
},
renderReport_noforms:function(inContainerId)
{
	//this is the default runtime report generator
	document.title = "IJF Report";
	var colSpans = {};
    ijfUtils.setContent(inContainerId,1,1,colSpans,false,colSpans);

    var getUrlPart = function(inUrl,param)
    {
		var retStr = "";
		if(inUrl.indexOf(param+"=")>-1)
		{
			var parts = inUrl.split(param+"=");
			var parts2 = parts[1].split("&");
			retStr=parts2[0];
		}
		return retStr;
	}

    //need: issue, jql, customType
    var rMessage = "Generating";
    var cUrlQuery = decodeURIComponent(window.location.search);
    var lJql = getUrlPart(cUrlQuery,"jql");
    var lFields = getUrlPart(cUrlQuery,"fields");
    var lIssue = getUrlPart(cUrlQuery,"issue");
    var lReport = getUrlPart(cUrlQuery,"reportName");

    var thisType = ijf.fw.CustomTypes.reduce(function(inTp,ct){
			if(ct.customType!="FILE") return inTp;
			if(ct.name==lReport) inTp=ct;
			return inTp;
		},null);

	if(!thisType)
	{
		rMessage="Cannot find report by name: " + lReport;
	}
	else
	{
		var cloudToken =  "&jwt=" +getJwtToken();
		//need to load into memory now...
		var fileDetailRaw = ijfUtils.jiraApiSync('GET','/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisType.id + cloudToken, null);
		var cleanDoubleDouble = fileDetailRaw.replace(/\"\"/g,"\"");
		cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
		cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
		var fileType = JSON.parse(cleanDoubleDouble);
		var fileDetail = {};
		//thisT.settings...
		var fileInfoString = "No file loaded yet";
		try
		{
			var fileDetail = JSON.parse(fileType.settings);
		}
		catch(e)
		{
			rMessage = "Failed to load the fild detail: " + e.message;
		}
	}


    var generateFile = function()
    {
			//load item if exists...
			ijfUtils.loadJiraFields();
			var iKey = fileDetail.key;
			if(lIssue) iKey=lIssue;
			if(iKey)
			{
					var thisIssue = ijfUtils.getJiraIssueSync(iKey);
			}
			//set local jql and fields
			if(lJql) fileDetail.jql=lJql;
			if(lFields) fileDetail.fields=lFields;

			var itemData={};
			if(thisIssue)
			{
				if(thisIssue.fields)
				{
					Object.keys(thisIssue.fields).forEach(function(f)
					{
						if(thisIssue.fields[f])
						{
							itemData[ijf.jiraFieldsIdKeyed[f].name]=ijfUtils.handleJiraFieldType(ijf.jiraFieldsIdKeyed[f],thisIssue.fields[f],true);
						}

					});
					itemData["status"]=thisIssue.fields.status.name;
				}
				//add special values:  key, status
				itemData["key"]=thisIssue.key;
			}

			var thisT = fileType;
			//in memory file

			thisT.fileDetail = fileDetail;
			//you have prepped data AND you have file type...call generateCustomeFile
			var gRep = function(){
				try
				{
					ijfUtils.generateWordFile(itemData,thisT);
				}
				catch(e)
				{
					Ext.getBody().unmask();
					ijfUtils.modalDialogMessage("Report Error","The report could not be created, Please look at:<br><br>" + e.message + "<br>" + e.properties.explanation);
				}

			}
			Ext.getBody().mask("Creating");
			window.setTimeout(gRep,100);
	}

	var pnl = new Ext.Panel({
		html: rMessage,
		width: 400,
		height:40,
		bodyStyle: 'margin: 10 0 0 10;background:transparent',
        id: 'cwfReportPanelId',
        listeners: {
			'render':function(){
				generateFile();
			}
		}
	});
    var tElement = document.getElementById(inContainerId+"_1_1");
    pnl.render(tElement);
    ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);

},
renderReportList_Borderlayout:function(inContainerId)
{
	document.title = "IJF Reports";
	var colSpans = {};
    ijfUtils.setContent(inContainerId,1,1,colSpans,false,colSpans);

    //what to show....
    var listColumns = [];
    var tFields = [];
    tFields.push({name: 'iid',  type: 'string'});

    listColumns.push({
        header: 'ID',
        width:'0%',
        hidden: true,
        dataIndex: 'iid'
    });

    tFields.push({name: 'iTypeName', type: 'string'});
    tFields.push({name: 'iTypeType', type: 'string'});
    tFields.push({name: 'iInstances', type: 'string'});

    listColumns.push({
            header: 'Name',
            sortable: true,
            hidden: false,
            width: '70%',
            dataIndex: 'iTypeName',
            filter: {
                type: 'string'
            }
    });
    listColumns.push({
		            header: 'Type',
		            flex: 1,
		            sortable: true,
		            hidden: false,
		            dataIndex: 'iTypeType',
		            filter: {
		                type: 'string'
		            }
    });
    listColumns.push({
            header: 'Field Store',
            width:'0%',
            sortable: true,
            hidden: true,
            dataIndex: 'iInstances',
            filter: {
                type: 'string'
            }
    });

    if(!Ext.ClassManager.isCreated('typeGridFieldArray'))
    {
        Ext.define('typeGridFieldArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    if(!this.typeStore)
    {
		this.typeStore = new Ext.data.Store({
			model: 'typeGridFieldArray'
		});
    }


    if(Ext.getCmp('typeReportListViewId')) Ext.getCmp('typeReportListViewId').destroy();

   var refreshList = function()
   {
		var cts = new Array();
		ijf.fw.CustomTypes.forEach(function(ct){
			if(ct.customType!="FILE") return;
			//cts.push([ct.id, ct.name, ct.customType, ct.fieldName]);
			cts.push([ct.id, ct.name, "MS Word", ct.fieldName]);
		});
		ijf.lists.typeStore.removeAll();
		ijf.lists.typeStore.loadData(cts);
		var focusOnList = function()
		{
			var c = Ext.getCmp('typeReportListViewId')
	    	if(c) c.focus();
		}
		window.setTimeout(focusOnList,200);
    }

    var typeListView = new Ext.grid.GridPanel({
        store: this.typeStore,
        height:'100%',
        width:'100%',
        plugins: 'gridfilters',
        id: "typeReportListViewId",
        columns: listColumns,
        listeners: {
          rowdblclick: function(grid,rowIndex,e) {
              var tId = rowIndex.data.iid;
              if(!tId) return;
			  ijf.lists.addEditCustomFileReference(tId,true);
            },
			focusenter: function(f)
			{
				refreshList();
			},
			render: function(f)
			{
				refreshList();
			}
		}
    });

    ijf.lists.refreshList=refreshList;

    var reportPnl = new Ext.Panel({
        layout: 'vbox',
        title: "IJF Reports and Queries",
        width: '100%',
        height:'100%',
        scrollable:true,
        items: [typeListView],
        buttons:[{
			text:'Export',
				handler: function(f,i,n){
						if(!reportPnl.items.items[0].selection) return;
						var thisId = reportPnl.items.items[0].selection.data.iid;
						var thisT = null;
						for(var tF in ijf.fw.CustomTypes){
								if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
								if(ijf.fw.CustomTypes[tF].id==thisId) thisT=ijf.fw.CustomTypes[tF];
						}
						if(!thisT) return;
						ijfUtils.writeCustomType(thisT);
			}},
			{
				html:  "<form enctype='multipart/form-data' id='typeUploadFormId'><input id='typeUploadFileId' type='file' name='file' onchange='ijfUtils.readTypeConfigFile(event);'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"},
			{
				xtype:'button',
				text:"Import",
				margin: '0 200 0 0',
				handler: function(){
				   //need the formset ID...
				   var uploadTypeFunction = function(){
					   jQuery('#typeUploadFileId').val("");
					   jQuery('#typeUploadFileId').trigger('click');
				   };
				   ijfUtils.modalDialog("Warning","You are about to upload a type configuration file.  If the same Type exists by name, this will overwrite that Type.",uploadTypeFunction);
				}
			},
            {text:'Add',
            handler: function(f,i,n){
				 ijf.lists.addEditType(0,true);
			}},{
            text:'Edit',
            handler: function(f,i,n){
				if(!reportPnl.items.items[0].selection) return;
				var thisId = reportPnl.items.items[0].selection.data.iid;
				ijf.lists.addEditType(thisId,true);
			}},
			{
            text:'Edit Details',
            handler: function(f,i,n){
				if(!reportPnl.items.items[0].selection) return;
				var thisId = reportPnl.items.items[0].selection.data.iid;
				var thisT = ijf.fw.CustomTypes.reduce(function(inT, ct){if(ct.id==thisId) inT=ct; return inT;},null);
				if(!thisT) return;
				ijf.lists.addEditCustomFileReference(thisId,true);

			}},{
            text:'Delete',
            handler: function(f,i,n){
				if(!reportPnl.items.items[0].selection) return;
				var thisId = reportPnl.items.items[0].selection.data.iid;
				ijf.lists.deleteCustomType(thisId);
			}}
        ],
        modal: true
    });
    var cButtons = [];
    cButtons.push({
		text:'NOT USED',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			ijf.lists.addEditForm(ijf.lists.itemId);
            }});

    var selButtons = new Ext.FormPanel({
        //labelAlign: 'left',
        //title: "hey",
        //frame:true,
        //layout: 'fit',
        border:false,
        frame:false,
        bodyStyle: 'margin-left:250px;background:transparent',
        items: cButtons
    })
	var bArray = [selButtons];

     var pnl = new Ext.Panel({

         width: 1000,
         height: 600,
        //title: 'Search Form',
        id: 'cwfListPanelId',
        //frame: true,
        //border: true,
        layout: 'border',
        items: [{
            title: 'Ideal Reports for JIRA Administration',
            region: 'north',     // position for region
            frame: false,
            bodyStyle: 'background-color:#3892d4',
            split: false,         // enable resizing

            margins: '0 5 5 5',
           // id: 'itemsNorth',
           header: {
			   titlePosition: 0,
			   items: [{
			text:'JQL Help',
			xtype: 'button',
			style: 'margin:0 0 0 10px',
			handler: function(){
				   window.open("https://confluence.atlassian.com/jiracoreserver073/advanced-searching-861257209.html");
			}},
			{
				xtype:'button',
				style: 'margin:0 0 0 10px',
				text:"Reports Help",
				handler: function(){
				   window.open("http://www.idealfed.com/reports.html");
			}}
			]}
        },{
            title: 'Center Region',
            region: 'center',     // center region is required, no width/height specified
            //id: 'itemsCenter',
            frame: true,
            xtype: 'container',
            layout: 'fit',
            margins: '5 5 0 0',
            items: [reportPnl]
        }]
    });


    var tElement = document.getElementById(inContainerId+"_1_1");
    pnl.render(tElement);
    ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);

},
ijfGroupsHeaderTopChecked:function(cb)
	{
		var grid = Ext.getCmp("groupReportListViewId");
		var gridData = grid.getStore().getData();
		var c = cb.checked;
		gridData.items.forEach(function(r)
		{
			r.set('chkbx',c);
		});
    },
renderGroupList_Borderlayout:function(inContainerId)
{

	document.title = "IJF Group Management";
	var colSpans = {};
    ijfUtils.setContent(inContainerId,1,1,colSpans,false,colSpans);

    //what to show....
    var listColumns = [];
    var tFields = [];
    tFields.push({name: 'iid',  type: 'string'});

    listColumns.push({
        header: 'ID',
        width:'0%',
        hidden: true,
        dataIndex: 'iName'
    });

    tFields.push({name: 'chkbx', type: 'boolean'});
    tFields.push({name: 'iName', type: 'string'});
    tFields.push({name: 'iHtmlName', type: 'string'});

	listColumns.push({
			header: "<input type='checkbox' onclick='ijf.lists.ijfGroupsHeaderTopChecked(this);'>",
			sortable: false,
			hidden: false,
			xtype: 'checkcolumn',
			centered:true,
			width: 50,
			dataIndex: 'chkbx',
			listeners: {
				checkchange: function(n,o,f)
				{
					null;
				}
			}
	});

    listColumns.push({
            header: 'Name',
            sortable: true,
            hidden: false,
            flex: 1,
            dataIndex: 'iName',
            filter: {
                type: 'string'
            }
    });
    listColumns.push({
			header: 'HTML Name',
			flex: 1,
			sortable: true,
			hidden: false,
			dataIndex: 'iHtmlName',
			filter: {
				type: 'string'
			}
    });

    if(!Ext.ClassManager.isCreated('groupGridFieldArray'))
    {
        Ext.define('groupGridFieldArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    if(!this.groupStore)
    {
		this.groupStore = new Ext.data.Store({
			model: 'groupGridFieldArray'
		});
    }

    if(Ext.getCmp('groupReportListViewId')) Ext.getCmp('groupReportListViewId').destroy();

   var refreshList = function()
   {
		var totalGroups = 0;
	    var grps = ijfUtils.jiraApiSync("GET","/rest/api/2/groups/picker?maxResults=1000",null);

		var cts = new Array();

		grps.groups.forEach(function(gp){
			cts.push([false,gp.name, gp.name, gp.html]);
			totalGroups++;
		});

		ijf.lists.groupStore.removeAll();
		ijf.lists.groupStore.loadData(cts);
		groupsPnl.setTitle("IJF Group Administration, Total Groups: "+totalGroups);
		var focusOnList = function()
		{
			var c = Ext.getCmp('groupReportListViewId');
			if(c) 	c.focus();
		}
		window.setTimeout(focusOnList,200);
    }


    var groupListView = new Ext.grid.GridPanel({
        store: this.groupStore,
        height:'100%',
        width:'100%',
        plugins: 'gridfilters',
        id: "groupReportListViewId",
        columns: listColumns,
        listeners: {
          rowdblclick: function(grid,rowIndex,e) {
              var tId = rowIndex.data.iid;
              if(!tId) return;

            },
			focusenter: function(f)
			{
				refreshList();
			},
			render: function(f)
			{
				refreshList();
			}
		}
    });

    ijf.lists.refreshList=refreshList;

    var groupsPnl = new Ext.Panel({
        layout: 'vbox',
        title: "IJF Group Administration",
        width: '100%',
        height:'100%',
        scrollable:true,
        items: [groupListView],
        buttons:[{
			text:'Export',
				handler: function(f,i,n){
					var outStr = "";

					groupListView.getStore().getData().each(function(r){
							outStr+=r.data["iName"] + "\n";
					});
					var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
					saveAs(blob,"groupList.csv");
			}},
			{
				html:  "<form enctype='multipart/form-data' id='groupUploadFormId'><input id='groupUploadFileId' type='file' name='file' onchange='ijfUtils.readJiraGroupsConfigFile(event);'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"},
			{
				xtype:'button',
				text:"Import",
				margin: '0 200 0 0',
				handler: function(){
				   //need the formset ID...
				   var uploadGroupFunction = function(){
					   jQuery('#groupUploadFileId').val("");
					   jQuery('#groupUploadFileId').trigger('click');
				   };
				   ijfUtils.modalDialog("Warning","You are about to upload a group configuration file.  If the same group exists by name, this will skip.<br>Logging for this activity is captured in the console which can be viewed by clicking F12.",uploadGroupFunction);
				}
			},
            {text:'Add',
            hidden:true,
            handler: function(f,i,n){
				 //ijf.lists.addEditType(0,true);
				 ijfUtils.modalDialogMessage("Info","This feature is under construction");
			}},
			{
            text:'Delete Checked',
            handler: function(f,i,n){

				 var gridStore = groupListView.getStore()
				 var lData = gridStore.getData();
				 var delGrps = [];
				var outMessage = "";
				lData.items.forEach(function(r)
				{
					var cb = r.get('chkbx');
					if(cb)
					{
						var groupName=r.get("iName").trim();
						delGrps.push(groupName);
					}
				});

				 var deleteThem = function()
				 {
					delGrps.forEach(function(groupName)
					{
						var delRes = ijfUtils.jiraApiSync("DELETE","/rest/api/2/group?groupname="+groupName,null);
						if(delRes!="OK")
						{
							console.log(groupName + " " + delRes);
							outMessage+=groupName +  " errored: " + delRes+ "<br>";
						}
						else
						{
							console.log(groupName + " - group deleted");
							outMessage+=groupName + " - group deleted<br>";
						}
					});
					ijfUtils.modalMessage("Results",outMessage);
					ijf.lists.refreshList();
			 	}
				ijfUtils.modalDialog("Warning","You are about to delete these groups, procede?",deleteThem);

			}}
        ],
        modal: true
    });
    var cButtons = [];
    cButtons.push({
		text:'NOT USED',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			//ijf.lists.addEditForm(ijf.lists.itemId);
            }});

    var selButtons = new Ext.FormPanel({
        //labelAlign: 'left',
        //title: "hey",
        //frame:true,
        //layout: 'fit',
        border:false,
        frame:false,
        bodyStyle: 'margin-left:250px;background:transparent',
        items: cButtons
    })
	var bArray = [selButtons];

     var pnl = new Ext.Panel({

         width: 1000,
         height: 600,
        //title: 'Search Form',
        id: 'cwfGroupsPanelId',
        //frame: true,
        //border: true,
        layout: 'border',
        items: [{
            title: 'Ideal Administration for JIRA',
            region: 'north',     // position for region
            frame: false,
            bodyStyle: 'background-color:#3892d4',
            split: false,         // enable resizing

            margins: '0 5 5 5',
           // id: 'itemsNorth',
           header: {
			   titlePosition: 0,
			   items: [{
				xtype:'button',
				style: 'margin:0 0 0 10px',
				text:"Help",
				handler: function(){
				   window.open("http://www.idealfed.com/idealadmin.html");
			}}
			]}
        },{
            title: 'Center Region',
            region: 'center',     // center region is required, no width/height specified
            //id: 'itemsCenter',
            frame: true,
            xtype: 'container',
            layout: 'fit',
            margins: '5 5 0 0',
            items: [groupsPnl]
        },{
            title: 'Left Region',
            region: 'west',     // center region is required, no width/height specified
            xtype: 'container',
            layout: 'fit',
            width:120,
            items: [
            {
				xtype: 'panel',
				frame: true,
				border: false,
				layout: 'vbox',
				padding: '0 0 0 10',
				items: [
					{
						xtype: 'panel',
						style: 'margin:18 0 15 0',
						html: '<b>Utilities:</b>'
					},
					{
						xtype: 'simplelink',
						style: 'color:#157fcc;border-bottom:solid #157fcc 1px;margin-bottom:5px',
						text: 'Groups',
						handler: function(){
                            ijfUtils.clearAll();
							ijf.lists.renderGroupList_Borderlayout('ijfContent');
						}
					},
					{
						xtype: 'simplelink',
						text: 'Users',
						style: 'color:#157fcc',
						//margin: '5 5 5 5',
						handler: function(){
							ijfUtils.clearAll();
							ijf.lists.renderUserList_Borderlayout('ijfContent');
						}
					}
				]
			}
            ]
        }]
    });

    var tElement = document.getElementById(inContainerId+"_1_1");
    pnl.render(tElement);
    ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);

},
ijfUsersHeaderTopChecked:function(inSelf)
{
			var grid = Ext.getCmp("userReportListViewId");
			var gridData = grid.getStore().getData();
			var c = inSelf.checked;
			gridData.items.forEach(function(r)
			{
				r.set('chkbx',c);
		});
},
renderUserList_Borderlayout:function(inContainerId)
{


	document.title = "IJF User Management";
	var colSpans = {};
    ijfUtils.setContent(inContainerId,1,1,colSpans,false,colSpans);

    //what to show....
    var listColumns = [];
    var tFields = [];
    tFields.push({name: 'iid',  type: 'string'});

    listColumns.push({
        header: 'ID',
        width:'0%',
        hidden: true,
        dataIndex: 'iName'
    });

    tFields.push({name: 'chkbx', type: 'boolean'});
    tFields.push({name: 'iName', type: 'string'});
    tFields.push({name: 'iActive', type: 'string'});

	listColumns.push({
			header: "<input type='checkbox' onclick='ijf.lists.ijfUsersHeaderTopChecked(this);'>",
			sortable: false,
			hidden: false,
			xtype: 'checkcolumn',
			centered:true,
			width: 50,
			dataIndex: 'chkbx',
			listeners: {
				checkchange: function(n,o,f)
				{
					null;
				}
			}
	});

    listColumns.push({
            header: 'Name',
            sortable: true,
            hidden: false,
            flex: 70,
            dataIndex: 'iName',
            filter: {
                type: 'string'
            }
    });
    listColumns.push({
			header: 'Active',
			flex: 30,
			align: 'center',
			sortable: true,
			hidden: false,
			dataIndex: 'iActive',
			filter: {
				type: 'list'
			}
    });

    if(!Ext.ClassManager.isCreated('userGridFieldArray'))
    {
        Ext.define('userGridFieldArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    if(!this.userStore)
    {
		this.userStore = new Ext.data.Store({
			model: 'userGridFieldArray'
		});
    }

    if(Ext.getCmp('userReportListViewId')) Ext.getCmp('userReportListViewId').destroy();


   var refreshList = function()
   {
        var totalUsers = 0;
        var totalActive = 0;
	    //var users = ijfUtils.jiraApiSync("GET","/rest/api/2/user/search?username=.&includeInactive=true&maxResults=1000",null);
	    //for Cloud
	    var users = ijfUtils.jiraApiSync("GET","/rest/api/3/user/search?query=.&includeInactive=true&maxResults=1000",null);

		var cts = new Array();

		users.forEach(function(gp){
			cts.push([gp.key,false, gp.displayName, gp.active]);
			totalUsers++;
			if(gp.active) totalActive++;
		});

		ijf.lists.userStore.removeAll();
		ijf.lists.userStore.loadData(cts);
		userPnl.setTitle("IJF User Administration, Total Users: "+totalUsers+", Active Users: " + totalActive);
		var focusOnList = function()
		{
			var c = Ext.getCmp('userReportListViewId');
			if(c) 	c.focus();
		}
		window.setTimeout(focusOnList,200);

    }


    var userListView = new Ext.grid.GridPanel({
        store: this.userStore,
        height:'100%',
        width:'100%',
        plugins: 'gridfilters',
        id: "userReportListViewId",
        columns: listColumns,
        listeners: {
          rowdblclick: function(grid,rowIndex,e) {
              var tId = rowIndex.data.iid;
              if(!tId) return;

            },
			focusenter: function(f)
			{
				refreshList();
			},
			render: function(f)
			{
				refreshList();
			}
		}
    });

    ijf.lists.refreshList=refreshList;

    var userPnl = new Ext.Panel({
        layout: 'vbox',
        title: "IJF User Administration",
        width: '100%',
        height:'100%',
        scrollable:true,
        items: [userListView],
        buttons:[{
			text:'Export',
				handler: function(f,i,n){
					var outStr = "";

					userListView.getStore().getData().each(function(r){
							outStr+=r.data["iid"] + "," +r.data["iName"] + "," + r.data["iActive"] + "\n";
					});
					var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
					saveAs(blob,"userList.csv");
			}},
			{
            text:'Deactivate Checked',
            handler: function(f,i,n){

				 var gridStore = userListView.getStore()
				 var lData = gridStore.getData();
				var dUsers = [];
                var outMessage = "Note, users assigned as Project owners will not deactivate.<br><br>";
				lData.items.forEach(function(r)
				{
					var cb = r.get('chkbx');
					if(cb)
					{
						var uid=r.get("iid").trim();
						var uName=r.get("iName").trim();
						dUsers.push([uid,uName]);
					}
				});

				var deactivateUser = function(inKey) {

						var baseUrl = "/rest/scriptrunner/latest/custom/deactivateUser?userkey=" + inKey;
						var retVal = null;
						jQuery.ajax({
							async: false,
							type: 'GET',
							url: baseUrl,
							timeout: 60000,
							success: function(d) {
								retVal = d;
							},
							error: function(e) {
								retVal = e;
							}
						});

						return retVal;
					}

				 var deactivateThem = function()
				 {
					dUsers.forEach(function(u)
					{
						var delRes = deactivateUser(u[0]);
						if(delRes.result=="OK")
						{
							console.log(u[0] + " - user deactivated");
							outMessage+=u[1] + " - user deactivated<br>";
						}
						else
						{
							if(delRes.result)
							{
								console.log(u[0] + " Not Deactivated " + delRes.result);
								outMessage+=u[1] + " Not Deactivated " + delRes.result + "<br>";
							}
							else
							{
								console.log(u[0] + " Not Deactivated " + JSON.stringify(delRes));
								outMessage+=u[1] + " Not Deactivated " + JSON.stringify(delRes) + "<br>";
							}

						}
					});
					ijfUtils.modalMessage("Results",outMessage);
					ijf.lists.refreshList();
			 	}
				ijfUtils.modalDialog("Warning","You are about to deactivate these users, procede?",deactivateThem);

			}}
        ],
        modal: true
    });
    var cButtons = [];
    cButtons.push({
		text:'NOT USED',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			//ijf.lists.addEditForm(ijf.lists.itemId);
            }});

    var selButtons = new Ext.FormPanel({
        //labelAlign: 'left',
        //title: "hey",
        //frame:true,
        //layout: 'fit',
        border:false,
        frame:false,
        bodyStyle: 'margin-left:250px;background:transparent',
        items: cButtons
    })
	var bArray = [selButtons];

     var pnl = new Ext.Panel({

         width: 1000,
         height: 600,
        //title: 'Search Form',
        id: 'cwfUsersPanelId',
        //frame: true,
        //border: true,
        layout: 'border',
        items: [{
            title: 'Ideal Administration for JIRA',
            region: 'north',     // position for region
            frame: false,
            bodyStyle: 'background-color:#3892d4',
            split: false,         // enable resizing
           // id: 'itemsNorth',
           header: {
			   titlePosition: 0,
			   items: [{
				xtype:'button',
				style: 'margin:0 0 0 10px',
				text:"Help",
				handler: function(){
				   window.open("http://www.idealfed.com/idealadmin.html");
			}}
			]}
        },{
            title: 'Center Region',
            region: 'center',     // center region is required, no width/height specified
            //id: 'itemsCenter',
            frame: true,
            xtype: 'container',
            layout: 'fit',
            items: [userPnl]
        },{
            title: 'Left Region',
            region: 'west',     // center region is required, no width/height specified
            xtype: 'container',
            layout: 'fit',
            width: 120,
            items: [
            {
				xtype: 'panel',
				frame: true,
				border: false,
				layout: 'vbox',
				padding: '0 0 0 10',
				items: [
					{
						xtype: 'panel',
						style: 'margin:18 0 15 0',
						html: '<b>Utilities:</b>'
					},
					{
						xtype: 'simplelink',
						style: 'color:#157fcc;margin-bottom:5px',
						text: ' Groups ',
						handler: function(){
							ijfUtils.clearAll();
							ijf.lists.renderGroupList_Borderlayout('ijfContent');
						}
					},
					{
						xtype: 'simplelink',
						style: 'color:#157fcc;border-bottom:solid #157fcc 1px',
						text: ' Users ',
						handler: function(){
							ijfUtils.clearAll();
							ijf.lists.renderUserList_Borderlayout('ijfContent');
						}
					}
				]
			}
            ]
        }]
    });

    var tElement = document.getElementById(inContainerId+"_1_1");
    pnl.render(tElement);
    ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);

},
renderItemList_Borderlayout:function(inContainerId)
{
    //state is no item, so display selected or default item selector....
    //var itmRoot="mwfContent";

    if(ijf.fw.tabTitle)
    {
        document.title = ijf.fw.tabTitle;
        this.originalTitle=ijf.fw.tabTitle;
    }
    else
    {
        document.title = this.originalTitle;
    }

    var colSpans = {};
    ijfUtils.setContent(inContainerId,1,1,colSpans,false,colSpans);

    var Tree = Ext.tree;
    //var treeStruct = ijf.exercise.getTreeStructure(true);

    //switching to tree of formsets...
    var retJson = []

    ijf.fw.formSets.forEach(function(fs){
		if(!fs.name) return;
		retJson.push({
			text:fs.name,
			id:fs.id,
			leaf:false,
			cls:"folder",
			checked:false,
			children: new Array()
		});
	});

	//adding sort on the form groups....
	retJson = retJson.sort(function(a, b)
		{
			return a.text<b.text ? -1 : a.text>b.text ? 1 : 0;
		});

    var tree = new Ext.tree.Panel({
        xtype: 'check-tree',
        height: 100,
        width: 400,
        useArrows:true,
        autoScroll:true,
        rowLines: false,
        animate:false,
        enableDD:false,
        containerScroll: true,
        rootVisible: false,
        frame: false,
        id: 'cwfTreeListPanelId',
        root: {
            name: 'root',
            description: 'root',
            expanded: true,
            id:'0',
            children: retJson
        },
        listeners: {
            checkchange: function(){
                ijf.lists.checkedNodes = tree.getChecked();
                ijf.lists.filterItemList("cwfItemSearchFilterId");
          }
        }
    });

    tree.addCls("x-panel-body-default2");

    if(Ext.getCmp('cwfItemSearchFilterId'))
    {
        var tIsf = Ext.getCmp('cwfItemSearchFilterId');
        Ext.destroy(tIsf);
    }
    var filterField = new Ext.FormPanel({
        frame:false,
        border: false,
        height:30,
        bodyStyle: 'background:transparent',
        items:[{
			fieldLabel: 'Filter by Name',
			labelStyle: 'width:150;text-align:right',
            xtype: 'textfield',
            style: 'margin:0px 0px 0px 200px;background:transparent;width:600px',
            value: '',
            allowBlank:true,
            enableKeyEvents: true,
            id: "cwfItemSearchFilterId2",
            listeners: {
                keyup: function(){
                    ijf.lists.filterItemList("cwfItemSearchFilterId2");
                }
            }
        }]
    });


    var cButtons = [];
    cButtons.push({
        text:'Open Form',
        xtype: 'button',
        margin: '0 3 0 3',
        handler: function(){
            ijf.lists.openForm();
        }});

	cButtons.push({
		text:'Design Form',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
				if(!ijf.lists.itemId)
				{
					ijfUtils.modalDialogMessage("Information","Sorry, no form was selected from list.");
				}
				else
				{
					var	thisF = {};
					for(var tF in ijf.fw.forms){
						if(!ijf.fw.forms.hasOwnProperty(tF)) return;
						if(ijf.fw.forms[tF].id==ijf.lists.itemId) thisF=ijf.fw.forms[tF];
					}
					if(!thisF.name){ ijfUtils.modalDialogMessage("Form Error","Sorry, undable to find the requested form: " + ijf.lists.itemId); return;}

					//for cloud...
					//var tUrl = g_root + '/plugins/servlet/iforms?debug=true&craft=true&itemId='+thisF.testIssue+'&formId='+thisF.name;

//todo:  add switch for cloud vs server
					var tUrl = g_root + '/run?debug=true&craft=true&itemId='+thisF.testIssue+'&formId='+thisF.name + "&jwt=" + getJwtToken();


					window.open(tUrl);
				}
            }});

	cButtons.push({
		text:'Form Settings',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			ijf.lists.addEditForm(ijf.lists.itemId);
            }});

	cButtons.push({
		text:'Add Form',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			ijf.lists.addEditForm(null);
            }});

	cButtons.push({
		text:'Duplicate Form',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			ijf.lists.copyForm(ijf.lists.itemId);
            }});

	cButtons.push({
		text:'Delete Form',
		xtype: 'button',
		margin: '0 3 0 3',
		handler: function(){
			ijf.lists.deleteForm(ijf.lists.itemId);
            }});





    var selectItem = new Ext.FormPanel({
        //labelAlign: 'left',
        //title: "hey",
        //frame:true,
        //layout: 'fit',
        border:false,
        frame:false,
        bodyStyle: 'margin-left:250px;background:transparent',
        items: cButtons
        //buttons: aButtons
    });


    var listColumns = [];
    var tFields = [];
    tFields.push({name: 'iid',  type: 'integer'});

    listColumns.push({
        header: 'ID',
        width:10,
        hidden: true,
        dataIndex: 'iid'
    });

    tFields.push({name: 'iFormName', type: 'string'});
    tFields.push({name: 'iFormType', type: 'string'});
    //tFields.push({name: 'iProjectId', type: 'string'});
    tFields.push({name: 'iProjectName', type: 'string'});
    tFields.push({name: 'iname', type: 'string'});

    listColumns.push({
            header: 'Form Name',
            width:ijf.fw.listNameWidth,
            sortable: true,
            hidden: false,
            width: 270,
            dataIndex: 'iFormName',
            filter: {
                type: 'string'
            }
    });
    listColumns.push({
		            header: 'Form Type',
		            width:ijf.fw.listFormIdWidth,
		            sortable: true,
		            hidden: false,
		            dataIndex: 'iFormType',
		            filter: {
		                type: 'list'
		            }
    });
    listColumns.push({
            header: 'Project',
            width:ijf.fw.listProjectNameWidth,
            sortable: true,
            hidden: false,
            dataIndex: 'iProjectName',
            filter: {
                type: 'list'
            }
    });
        listColumns.push({
	            header: 'Form Group',
	            width:ijf.fw.listFormNameWidth,
	            sortable: true,
	            hidden: false,
	            flex: 1,
	            dataIndex: 'iname',
	            filter: {
	                type: 'list'
	            }
    });



    if(!Ext.ClassManager.isCreated('gridFieldArray'))
    {
        Ext.define('gridFieldArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }


    this.itemStore = new Ext.data.Store({
        model: 'gridFieldArray'
    });


    ijf.lists.filterItemList("cwfItemSearchFilterId")


    if(Ext.getCmp('itemListViewId')) Ext.getCmp('itemListViewId').destroy();

    var listView = new Ext.grid.GridPanel({
        store: this.itemStore,
        height:500,
        width:500,
        plugins: 'gridfilters',
        id: "itemListViewId",
        //reserveScrollOffset: true,
        columns: listColumns,
        listeners: {
         selectionchange:function(view, record, eops) {
			  if(record.length==0) return;
              ijf.lists.itemId = record[0].data.iid;
          },
          rowdblclick: function(grid,rowIndex,e) {

              ijf.lists.itemId = rowIndex.data.iid;
               ijf.lists.openForm();
            }}
    });

    listView.addCls("x-panel-body-default2");
        //render simple  combo of
    if(ijf.fw.listTitle=="")
        ijfUtils.setHead("Please use this menu to administer your forms.");
    else
        ijfUtils.setHead(ijf.fw.listTitle);

    var bArray = [selectItem];

    var tCollapsed = false;

     var pnl = new Ext.Panel({

         width: 1000,
         height: 600,
        //title: 'Search Form',
        id: 'cwfListPanelId',
        //frame: true,
        //border: true,
        layout: 'border',
        items: [{
            //title: 'Search by Name',
            xtype: 'container',
            region: 'south',     // position for region
            frame: false,
            height: 50,
            //layout: 'vbox',
            //split: true,         // enable resizing
            //minSize: 90,         // defaults to 50
            //maxSize: 60,
           // id: 'itemsSouth',
            items: bArray

        },{
            title: 'Ideal Forms for JIRA Administration',
            region: 'north',     // position for region
            frame: false,
            bodyStyle: 'background-color:#3892d4',
            split: false,         // enable resizing

            margins: '0 5 5 5',
           // id: 'itemsNorth',
           header: {
			   titlePosition: 0,
			   items: [
				{fieldLabel: 'Filter by Name',
				labelStyle: 'background:transparent;width:200;text-align:right;color:white;font-weight:bold',
				xtype: 'textfield',
				style: 'background:transparent;width:500px',
				value: '',
				allowBlank:true,
				enableKeyEvents: true,
				id: "cwfItemSearchFilterId",
				listeners: {
					keyup: function(){
						ijf.lists.filterItemList("cwfItemSearchFilterId");
					}
				}
			},
			{
			text:'Custom Types',
			xtype: 'button',
			style: 'margin:0 0 0 10px',
			handler: function(){
				ijf.lists.addEditCustomType();
			}},
			{
				xtype:'button',
				style: 'margin:0 0 0 10px',
				text:"Help",
				handler: function(){
				   window.open("http://www.idealfed.com/support.html");
			}}
			]}
        },{
            // xtype: 'panel' implied by default
            title: 'Form Groups:',
            style: 'color:white;font-weight:bold',
            region:'west',
            frame: true,
            margins: '5 0 5 5',
            width: 250,
            collapsible: true,   // make collapsible
            collapsed:  false,
            cmargins: '5 5 0 5', // adjust top margin when collapsed
           // id: 'itemsWest',
            split: true,
            layout: 'fit',
            unstyled: true,
			header:{
				                titlePosition: 0,
				                items:[{
									xtype:'button',
									text:"Edit",
									handler: function(){
									   //need the formset ID...
										if(Object.size(ijf.lists.checkedNodes) == 1)
										{
											var tId = ijf.lists.checkedNodes[0].id;
										}
										else
										{
												ijfUtils.modalDialogMessage("Information","Sorry but to edit a form group, please check one and only one from the list");
												return;
										}
									   ijf.lists.addEditFormSet(tId);
									}
								},{
									xtype:'button',
									text:"Add",
									handler: function(){
									   ijf.lists.addEditFormSet();
									}
								},{
									xtype:'button',
									text:"Delete",
									handler: function(){
										if(Object.size(ijf.lists.checkedNodes) == 1)
										{
											var tId = ijf.lists.checkedNodes[0].id;
										}
										else
										{
												ijfUtils.modalDialogMessage("Information","Sorry but to edit a form group, please check one and only one from the list");
												return;
										}

									    ijf.lists.deleteFormSet(tId);
									}
								}]
		},
			buttons:{
					items:[{
						xtype:'button',
						text:"Download Group",
						handler: function(){
						   //need the formset ID...

							if(Object.size(ijf.lists.checkedNodes) == 1)
							{
								var tId = ijf.lists.checkedNodes[0].data.text;
							}
							else
							{
									ijfUtils.modalDialogMessage("Information","Sorry but to download a form group, please check one and only one from the list");
									return;
							}
							ijfUtils.writeConfigFile(tId);
						}
					},
					{
						xtype:'button',
						text:"Upload Group",
						handler: function(){
						   //need the formset ID...
						   var uploadGrpFunction = function(){
							   jQuery('#groupUploadFileId').val("");
							   jQuery('#groupUploadFileId').trigger('click');
						   };
						   ijfUtils.modalDialog("Warning","You are about to upload a form group configuration file.  If the same Form Group exists by name, this will overwrite that Form Group, please rename your existing Form Group if you want to preserver it.",uploadGrpFunction);
						}
					},
            		{
						html:  "<form enctype='multipart/form-data' id='groupUploadFormId'><input id='groupUploadFileId' type='file' name='file' onchange='ijfUtils.readGroupConfigFile(event)'></form>",
						frame: false,
						hidden: true,
						border: false,
						xtype: "panel"}
					]
		},
            items: [tree]
        },{
            title: 'Center Region',
            region: 'center',     // center region is required, no width/height specified
            //id: 'itemsCenter',
            frame: true,
            xtype: 'container',
            layout: 'fit',
            margins: '5 5 0 0',
            items: [listView]
        }]
    });
    var tElement = document.getElementById(inContainerId+"_1_1");

    pnl.render(tElement);

    ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);
    //tree.render();
    //root.expand(true);
    //root.collapse(true);
    if(!ijf.fw.listTreeCollapsed) tree.expandAll();
},

modalReferenceEntry:function(inFunction)
{

    var dMes = "This dialog adds items into the "+ijf.fw.includeAddByReference.root+" section of the exercise.  Double click to add.<br>"+ijf.fw.includeAddByReference.message;
    dwinval=false;
    var dHeight = 600;
    //need to iterate through all structure levels and create entries for each....

    var fieldVals = [];
    var combVals;
    fieldVals["root"] = {"name":"root",valid:true, "order":0,"name":ijf.fw.includeAddByReference.root};
    var order = 1;
    var messageField = {
        html: dMes,
        margin: '5 5 5 5',
        xtype: "panel"};


    var refEntity = ijf.fw.reference[ijf.fw.includeAddByReference.reference.entity];

    var firstRow;
    for(var rw in refEntity.rows)
    {
        if(refEntity.rows.hasOwnProperty(rw))
        {
            firstRow = refEntity.rows[rw];
            break;
        }
    }
    if(!firstRow) return;

    //dynamic model
    if(Ext.ClassManager.isCreated('dynamicTableArray'))
    {
        var tempObj = Ext.getCmp('dynamicTableArray');
        Ext.destroy(tempObj);
    }

    //each field, create paring...
    var tFieldDefs = [];
    var tPanelCols = [];
    var winWidth = 110;
    tFieldDefs.push({name:"rowkey",type:"string"});
    tPanelCols.push( {
            header: "ID",
            width: 75,
            hidden: true,
            readOnly: true,
            dataIndex: "rowkey"
        }
    );
    var colIndex = 0;
    for(var rf in firstRow.fields)
    {
        if(firstRow.fields.hasOwnProperty(rf))
        {
            var thisField = firstRow.fields[rf];

            var isHidden = true;
            var visColWidth = 0;
            var colWidth = 100;
            if(ijf.fw.includeAddByReference.reference.fields.indexOf(thisField.colName)>-1)
            {
                isHidden=false;
                colWidth =  ijf.fw.includeAddByReference.reference.widths[ijf.fw.includeAddByReference.reference.fields.indexOf(thisField.colName)];
                visColWidth = colWidth;
            }


            tFieldDefs.push({name:thisField.colName,type:"string"});
            tPanelCols.push( {
                    header: thisField.colName,
                    width:colWidth,
                    hidden: isHidden,
                    dataIndex: thisField.colName,
                    readOnly: true,
                    filter: {
                        type: 'string'
                    }
                }
            );
            winWidth+=visColWidth;
        }
    }

    Ext.define('dynamicTableArray', {
        extend: 'Ext.data.Model',
        fields: tFieldDefs
    });

    //load data
    var tableEditorStore = new Ext.data.Store({
        model: 'dynamicTableArray'
    });

    tableEditorStore.loadData(refEntity.getTableAsObjArray());




    var listTables = new Ext.grid.GridPanel({
        xtype: "cell-editing",
        store: tableEditorStore,
        height:dHeight-20,
        width:winWidth-20,
        plugins: 'gridfilters',
        id: "addByReferenceTableId",
        columns: tPanelCols,
        selModel: {selType: 'rowmodel', mode: 'SINGLE'},
        listeners: {
            'rowdblclick': function(grid,rec,e) {

                //create the fields using the 'structure' of the addbystructure....
                var order = 1;
                var addLevel=function(inName,inNode)
                {
                    if(!inName) return;
                    if(inNode.itemTemplate)
                    {
                        var tVal = inName;
                    }
                    else
                    {
                        var tVal = rec.data[inName];
                    }

                    if(!tVal)
                    {
                        //error and get out....
                        modalDialogMessage("Error Message","Error with determining the name from the add by structure settings.");
                        fieldVals = [];
                        fieldVals["root"] = {"name":"root",valid:true, "order":0,"name":ijf.fw.includeAddByReference.root};
                        order = 1;
                        return;
                    }
                    fieldVals[inName] = {"name":inName,valid:true,"value":tVal, "order":order++,"itemTemplate":inNode.itemTemplate, "cat":inNode};

                    var child = inNode.child;
                    if(child) addLevel(child.name,child);
                }
                var child = ijf.fw.includeAddByReference.structure.child;
                if(child) addLevel(child.name,child);

                //fieldVals should be set.. create...
                var dFunct = function(){  pdWin.close(); inFunction(fieldVals,rec);}
                modalDialog("Alert","You are about to create an item based on your selection, continue? <br><br>(Note if the item already exists it will open.)",dFunct);
            }
        }
    });

    var pdWin = new Ext.Window({
        // layout: 'fit',
        title: "Add Item",
        width: winWidth,
        height:dHeight+20,
        closable: false,
        items: [messageField,listTables],
        buttons:[
            {
                text:'Cancel',
                handler: function(){
                    pdWin.close();
                }}
        ],
        modal: true
    });
    pdWin.show();
},


addEditForm:function (inFrmId)
{
	var editForm = false;
	ijf.lists.thisF = {};
	var thisF = ijf.lists.thisF;
    if(inFrmId)
    {
		editForm = true;
		for(var tF in ijf.fw.forms){
			if(!ijf.fw.forms.hasOwnProperty(tF)) return;
			if(ijf.fw.forms[tF].id==ijf.lists.itemId) thisF=ijf.fw.forms[tF];
		}
		if(!thisF.name){ ijfUtils.modalDialogMessage("Form Error","Sorry, undable to find the requested form: " + inFrmId); return;}
		ijf.lists.thisF=thisF;

    }
    else
    {
		//construct blank form...
		thisF.formSet = {};
		thisF.name = "";
		thisF.formType = "Edit";
		thisF.testIssue = "";
		thisF.issueType = "";
		thisF.formAnon= "false";
		thisF.formProxy= "false";
		thisF.id = 0;
		thisF.settings=[];
	    thisF.fields=[];
	}

    var dMes = "Adding a new form creates the container for your form settings.  Once the container is";
    dMes+=" added you can edit your form.  Please note:";
    dMes+="<ul><li>Form Group is an grouping of forms, it links to a project and contains common Javascript business rules.</li>";
    dMes+="<li>Form name should be unique for all forms.</li>";
    dMes+="<li>Form type determines available JIRA fields (based on JIRA Views).</li>";
    dMes+="<li>Issue type sets the issue type to be edited or added.</li>";
    dMes+="<li>Test issue provides an issue to open with the designer perspective. For Add type forms, leave blank for design and testing.</li></ul>";

    var formTypeLookup = ["Edit","Add","List"];
    var formGroups = ijf.fw.formSets.map(function(fs){return fs.name});

    var issueTypes = [];

    if(ijf.fw.formSetsKeyed[thisF.formSet.name])
    {
		ijfUtils.loadIssueTypeDetails(thisF.formSet.projectId);
		issueTypes =Object.keys(ijf.jiraAddMeta[thisF.formSet.projectId]);
	}

    ijf.lists.dWin = new Ext.Window({
        layout: 'vbox',
        title: "IJF Form Settings",
        width: 600,
        height:470,
        closable: true,
        items: [{
            html: dMes,
            border: false,
            width: 580,
            margin: '4 0 0 10',
            frame: false,
            xtype: "panel"},
            {
							xtype: 'combobox',
							labelAlign: 'left',
							labelWidth: 100,
							forceSelection: true,
							store: formGroups,
							fieldLabel: "Form Group",
							labelStyle: "color:darkblue",
							width: 400,
							margin: '4 0 0 10',
							value: thisF.formSet.name,
							listeners: {
								                afterrender: function(f)
								                {
								                    this.validate();
			                },
								change: function(f, n, o){
									thisF.formSet.name = n;
									//must reset the issue types
									    if(ijf.fw.formSetsKeyed[thisF.formSet.name])
									    {
											var fSet = ijf.fw.formSetsKeyed[thisF.formSet.name];
											ijfUtils.loadIssueTypeDetails(fSet.projectId);
											var issueTypes =Object.keys(ijf.jiraAddMeta[fSet.projectId]);
											Ext.getCmp('editFormIssueTypeId').store.loadData(issueTypes.map(function(item){ return [item]; }));
										}
								}}
			},
            {
                xtype: 'textfield',
                labelAlign: 'left',
                fieldLabel: 'Form Name',
                labelWidth: 100,
                labelStyle: "color:darkblue",
  				margin: '4 0 0 10',
                width: 400,
                value: thisF.name,
                allowBlank:false,
                listeners: {
					                afterrender: function(f)
					                {
					                    this.validate();
                },
                    change: function(f,n,o){
                        thisF.name = n;
                    }
                }
            },
			{
				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: true,
				store: formTypeLookup,
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Form Type",
				allowBlank:false,
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				width: 200,
				value: thisF.formType,
				listeners: {
					                afterrender: function(f)
					                {
					                    this.validate();
                },
					change: function(f, n, o){
						thisF.formType = n;
									}}
			},
			{
				xtype: 'combobox',
				labelAlign: 'left',
				labelWidth: 100,
				forceSelection: true,
				store: issueTypes,
				allowBlank: false,
				id: 'editFormIssueTypeId',
				fieldLabel: "Issue Type",
				labelStyle: "color:darkblue",
				width: 400,
				margin: '4 0 0 10',
				value: thisF.issueType,
				listeners: {
									afterrender: function(f)
									{
										this.validate();
				},
					change: function(f, n, o){
						thisF.issueType = n;
					}}
			},
            {
				xtype: 'textfield',
				labelAlign: 'left',
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Test Issue",
				allowBlank:true,
				labelStyle: "color:darkblue",
				width: 200,
				value: thisF.testIssue,
				listeners: {
					change: function(f, n, o){
						thisF.testIssue = n;
					}}
			},
			{
				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: true,
				store: ["true","false"],
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Anonymous",
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				width: 200,
				value: thisF.formAnon,
				listeners: {
						change: function(f, n, o){
							thisF.formAnon = n;
				}}
			},
			{
				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: true,
				store: ["true","false"],
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Proxy Auth",
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				width: 200,
				value: thisF.formProxy,
				listeners: {
						change: function(f, n, o){
							thisF.formProxy = n;
				}}
			}

        ],
        buttons:[{
            text:'OK',
            handler: function(f,i,n){
				var thisForm = ijf.lists.thisF;

				if(thisForm.name=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the form name cannot be blank."); return;}
				if(thisForm.id==0) if(ijf.fw.forms.hasOwnProperty(thisForm.name)) {ijfUtils.modalDialogMessage("Form Error","Sorry, the form name is already being used."); return;}
				if(!thisForm.formSet.name) {ijfUtils.modalDialogMessage("Form Error","Sorry, the form group name cannot be blank."); return;}
				if(!thisForm.issueType) {ijfUtils.modalDialogMessage("Form Error","Sorry, the issue type cannot be blank."); return;}
				//if(thisForm.testIssue=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the test issue must exist and not be empty."); return;}

				//need to have a valid "formSet" ID at this point....
				var formSet = ijf.fw.formSetsKeyed[thisF.formSet.name];

		        var jOut = {
							formId: thisForm.id,
							testIssue: thisForm.testIssue,
							formType: thisForm.formType,
							formName: thisForm.name,
							issueType: thisForm.issueType,
							formAnon: thisForm.formAnon,
							formProxy: thisForm.formProxy,
							formSetId: formSet.id
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"saveFormBasic");

				if(sStat=="OK")
				{
	                ijf.lists.dWin.close();
 	                ijfUtils.clearExt();
	                ijf.main.init(0);
				}
				else
				{
					ijfUtils.modalDialogMessage("Error","Sorry, something went wrong with the save: " + sStat);
				}

            }},
            {
                text:'Cancel',
                handler: function(){
                    ijf.lists.dWin.close();
                }}
        ],
        modal: true
    });
    ijf.lists.dWin.show();
},
copyForm: function(inFrmId)
{
		if(!inFrmId) return;
    	var thisForm ={};
	    if(inFrmId)
	    {
			for(var tF in ijf.fw.forms){
				if(!ijf.fw.forms.hasOwnProperty(tF)) return;
				if(ijf.fw.forms[tF].id==ijf.lists.itemId) thisForm=ijf.fw.forms[tF];
			}
			if(!thisForm.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form: " + inFrmId); return;}
		}

		//establish new name...
		var newFormName = thisForm.name + " copy";
		var nameIsNotUnique=true;
		var formNameCounter=1;
		do{

			if(ijf.fw.forms.hasOwnProperty(newFormName))
			{
				newFormName = newFormName + " " + formNameCounter++;
			}
			else
			{
				nameIsNotUnique=false;
			}

		}while(nameIsNotUnique);




        var dFunc = function()
        {


				var formSet = ijf.fw.formSetsKeyed[thisForm.formSet.name];

				var settingsOut = new Array();
				var fieldsOut = new Array();
				for(var j in thisForm.settings)
				{
					if(!thisForm.settings.hasOwnProperty(j)) continue;
					settingsOut.push({name:j,value:thisForm.settings[j],comment:""});
				};
				for(var j in thisForm.fields)
				{
					if(!thisForm.fields.hasOwnProperty(j)) continue;
					fieldsOut.push(thisForm.fields[j]);
				};

		        var jOut = {
							formId: 0,
							testIssue: thisForm.testIssue,
							issueType: thisForm.issueType,
							formType: thisForm.formType,
							formName: newFormName,
							formAnon: thisForm.formAnon,
							formProxy: thisForm.formProxy,
							formSetId: formSet.id,
							fields: JSON.stringify(JSON.stringify(fieldsOut)),
							formSettings: JSON.stringify(JSON.stringify(settingsOut))
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"saveFormConfig");


				if(sStat=="OK")
				{
 	                ijfUtils.clearExt();
	                ijf.main.init(0);
				}
				else
				{
					ijfUtils.modalDialogMessage("Error","Sorry, something went wrong with the delete: " + sStat);
				}
	    };

	    ijfUtils.modalDialog("Information","Are you certain you want to duplicate this form?",dFunc);

},
deleteForm: function(inFrmId)
{
		if(!inFrmId) return;
    	var thisF ={};
	    if(inFrmId)
	    {
			for(var tF in ijf.fw.forms){
				if(!ijf.fw.forms.hasOwnProperty(tF)) return;
				if(ijf.fw.forms[tF].id==ijf.lists.itemId) thisF=ijf.fw.forms[tF];
			}
			if(!thisF.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form: " + inFrmId); return;}
		}

        var dFunc = function()
        {
		        var jOut = {
							formId: thisF.id
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"deleteFormConfig");

				if(sStat=="OK")
				{
 	                ijfUtils.clearExt();
	                ijf.main.init(0);
				}
				else
				{
					ijfUtils.modalDialogMessage("Error","Sorry, something went wrong with the delete: " + sStat);
				}
	    };

	    ijfUtils.modalDialog("Warning","Are you certain you want to delete this form?",dFunc);

},
deleteFormSet: function(inFrmId)
{
    	var thisFs ={};
	    if(inFrmId)
	    {
			for(var tF in ijf.fw.formSets){
				if(!ijf.fw.formSets.hasOwnProperty(tF)) return;
				if(ijf.fw.formSets[tF].id==inFrmId) thisFs=ijf.fw.formSets[tF];
			}
			if(!thisFs.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form group for: " + inFrmId); return;}
        }


//TODO:  commenting this out in cloud
		//var fcount = thisFs.forms.reduce(function(fcnt,f){if(f.name) fcnt++; return fcnt;},0);
		//check for children
		//if(fcount){ ijfUtils.modalDialogMessage("Error","Sorry, you must delete or remove all forms from this group before deleting."); return;}


        var dFunc = function()
        {
		        var jOut = {
							formSetId: thisFs.id
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"deleteFormSet");

				if(sStat=="OK")
				{
					ijf.lists.checkedNodes = [];
 	                ijfUtils.clearExt();
	                ijf.main.init(0);
				}
				else
				{
					ijfUtils.modalDialogMessage("Error","Sorry, something went wrong with the delete: " + sStat);
				}
	    };

	    ijfUtils.modalDialog("Warning","Are you certain you want to delete this form group?",dFunc);

},
deleteCustomType: function(inCtId)
{
		if(!inCtId) return;
    	var thisT ={};
		var thisTIndex=0;
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].id==inCtId)
			{
				thisTIndex = tF;
				thisT=ijf.fw.CustomTypes[tF];
			}
		}
		if(!thisT.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form type for: " + inCtId); return;}

        var dFunc = function(thisCtIndex)
        {
		        var jOut = {
							customTypeId: thisT.id
				};
				var jdata = JSON.stringify(jOut);

//todo, change to customtype
				var sStat = ijfUtils.saveJiraFormSync(jdata,"deleteCustomType");
				if(isNaN(sStat))
				{
					ijfUtils.modalDialogMessage("Error","Sorry, something went wrong with the delete: " + sStat);
				}
				else
				{
 	                //need to delete the entry from CTs.  sStat is the ID of the entry....
 	                delete ijf.fw.CustomTypes[sStat];
 	                for(var tF in ijf.fw.CustomTypes){
						if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
						if(ijf.fw.CustomTypes[tF].id==sStat) delete ijf.fw.CustomTypes[tF];
					}
					if(ijf.lists.dWin) ijf.lists.dWin.focus();
					if(ijf.lists.refreshList) ijf.lists.refreshList();
				}
	    };

	    ijfUtils.modalDialog("Warning","Are you certain you want to delete this type?",dFunc);

},
addEditFormSet:function (inFrmId)
{

	var editForm = false;
	ijf.lists.thisFs = {};
	var thisF = ijf.lists.thisFs;
    if(inFrmId)
    {
		editForm = true;
		for(var tF in ijf.fw.formSets){
			if(!ijf.fw.formSets.hasOwnProperty(tF)) return;
			if(ijf.fw.formSets[tF].id==inFrmId) thisF=ijf.fw.formSets[tF];
		}
		if(!thisF.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form group for: " + inFrmId); return;}
		ijf.lists.thisFs=thisF;
    }
    else
    {
		//construct blank form...
		thisF.forms = [];
		thisF.name = "";
		thisF.projectName = "";
		thisF.projectId = "";
		thisF.id = 0;
		thisF.settings=[];
		thisF.snippets=[];
	}

    var dMes = "Adding a new form group creates a container for logically grouped forms.  Once the container is";
    dMes+=" added you can create forms within the group.  Please note:";
    dMes+="<ul><li>Form group name should be unique for all form groups.</li>";
    dMes+="<li>Form project is just a notional linkage to a JIRA prject.</li>";
    dMes+="<li>Form groups are the containers for Javascript snippets.</li></ul>";
    var projectLookup = [];
    ijf.exercise.projects.forEach(function(p){projectLookup.push([p.key,p.name]);});
    var decLookup = ["true","false"];
	if(!thisF.settings["decorator"]) thisF.settings["decorator"]="general";
    ijf.lists.dWin = new Ext.Window({
        layout: 'vbox',
        title: "IJF Form Group Settings",
        width: 600,
        height:520,
        closable: true,
        items: [{
            html: dMes,
            border: false,
            width: 580,
            margin: '4 0 0 10',
            frame: false,
            xtype: "panel"},
            {
                xtype: 'textfield',
                labelAlign: 'left',
                fieldLabel: 'Group Name',
                labelWidth: 100,
                labelStyle: "color:darkblue",
  				margin: '4 0 0 10',
                width: 400,
                value: thisF.name,
                allowBlank:false,
                listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                change: function(f,n,o){

                        thisF.name = n;
                    }
                }
            },
			{

				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: true,
				store: projectLookup,
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Project",
				allowBlank:false,
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				width: 400,
				value: thisF.projectId,
				listeners: {
					afterrender: function(f)
					                {
					                    this.validate();
                    },
					change: function(f, n, o){
						thisF.projectId = n;
						thisF.projectName = f.getDisplayValue();
									}}
			},
            {
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Default Form',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["defaultForm"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["defaultForm"] = n;
					}
				}
            },
            {
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Change Style',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["changeStyle"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["changeStyle"] = n;
					}
				}
            },
				{
					xtype: 'textfield',
					labelAlign: 'left',
					fieldLabel: 'Anon Username',
					labelWidth: 100,
					labelStyle: "color:darkblue",
					margin: '4 0 0 10',
					width: 400,
					value: thisF.settings["anonUsername"],
					listeners: {
					afterrender: function(f)
					{
						this.validate();
					},
					change: function(f,n,o){
							thisF.settings["anonUsername"] = n;
						}
					}
            },            {
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Anon Password',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["anonPassword"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["anonPassword"] = n;
					}
				}
            },
			{
					xtype: 'textfield',
					labelAlign: 'left',
					fieldLabel: 'Proxy Username',
					labelWidth: 100,
					labelStyle: "color:darkblue",
					margin: '4 0 0 10',
					width: 400,
					value: thisF.settings["proxyUsername"],
					listeners: {
					afterrender: function(f)
					{
						this.validate();
					},
					change: function(f,n,o){
							thisF.settings["proxyUsername"] = n;
						}
					}
            },            {
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Proxy Password',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["proxyPassword"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["proxyPassword"] = n;
					}
				}
            },          {
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Proxy Server',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["proxyServer"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["proxyServer"] = n;
					}
				}
            }
			,{
				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: true,
				store: decLookup,
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "JIRA Decorated",
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				width: 400,
				value: thisF.settings["decorator"],
				listeners: {
					change: function(f, n, o){
						thisF.settings["decorator"] = f.getDisplayValue();
									}}
			},
			{
				xtype: 'textfield',
				labelAlign: 'left',
				fieldLabel: 'Admin email',
				labelWidth: 100,
				labelStyle: "color:darkblue",
				margin: '4 0 0 10',
				width: 400,
				value: thisF.settings["adminEmail"],
				listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
						thisF.settings["adminEmail"] = n;
					}
				}
            }
        ],
        buttons:[{
            text:'OK',
            handler: function(f,i,n){
				var thisFormSet = ijf.lists.thisFs;

				if(thisFormSet.name=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the group name cannot be blank."); return;}
				if(thisFormSet.projectId=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the project cannot be blank."); return;}
				if(thisFormSet.projectName=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the project cannot be blank."); return;}
				if(thisFormSet.id==0) if(ijf.fw.formSetsKeyed.hasOwnProperty(thisFormSet.name)) {ijfUtils.modalDialogMessage("Form Error","Sorry, the group name is already being used."); return;}

				//settings
				//forms
				//snippets
				var settingsOut = new Array();
				for(var j in thisFormSet.settings)
				{
					if(!thisFormSet.settings.hasOwnProperty(j)) continue;
					settingsOut.push({name:j,value:thisFormSet.settings[j],comment:""});
				};

		        var jOut = {
							formSetId: thisFormSet.id,
							name: thisFormSet.name,
							projectName: thisFormSet.projectName,
							projectId: thisFormSet.projectId,
							settings: JSON.stringify(JSON.stringify(settingsOut))
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"saveFormSet");

				if(sStat=="OK")
				{
					ijf.lists.checkedNodes = [];
	                ijf.lists.dWin.close();
 	                ijfUtils.clearExt();
	                ijf.main.init(0);
				}
				else
				{
					ijfUtils.modalDialogMessage("SAve Error","Sorry, something went wrong with the save: " + sStat);
				}

            }},
            {
                text:'Cancel',
                handler: function(){
                    ijf.lists.dWin.close();
                }}
        ],
        modal: true
        //listeners:{
		//		focus: function(f)
		//		{
		//			alert('refresh the table');
		//		}
		//}
    });
    ijf.lists.dWin.show();
},

//beginning custom types...

addEditCustomType:function (inFrmId)
{

    var listColumns = [];
    var tFields = [];
    tFields.push({name: 'iid',  type: 'string'});

    listColumns.push({
        header: 'ID',
        width:10,
        hidden: true,
        dataIndex: 'iid'
    });

    tFields.push({name: 'iTypeName', type: 'string'});
    tFields.push({name: 'iTypeType', type: 'string'});
    tFields.push({name: 'iInstances', type: 'string'});

    listColumns.push({
            header: 'Name',
            sortable: true,
            hidden: false,
            width: 400,
            dataIndex: 'iTypeName',
            filter: {
                type: 'string'
            }
    });
    listColumns.push({
		            header: 'Type',
		            width:200,
		            sortable: true,
		            hidden: false,
		            dataIndex: 'iTypeType',
		            filter: {
		                type: 'string'
		            }
    });
    listColumns.push({
            header: 'Field Store',
            width:200,
            sortable: true,
            hidden: false,
            dataIndex: 'iInstances',
            filter: {
                type: 'string'
            }
    });

    if(!Ext.ClassManager.isCreated('typeGridFieldArray'))
    {
        Ext.define('typeGridFieldArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    this.typeStore = new Ext.data.Store({
        model: 'typeGridFieldArray'
    });


    if(Ext.getCmp('typeListViewId')) Ext.getCmp('typeListViewId').destroy();

    var typeListView = new Ext.grid.GridPanel({
        store: this.typeStore,
        //height:500,
        width:820,
        plugins: 'gridfilters',
        id: "typeListViewId",
        //reserveScrollOffset: true,
        columns: listColumns,
        listeners: {
          rowdblclick: function(grid,rowIndex,e) {
              var tId = rowIndex.data.iid;
              if(!tId) return;
              if(rowIndex.data.iTypeType=="GRID")
              	ijf.lists.addEditCustomTypeDetails(tId);
	 		  else if(rowIndex.data.iTypeType=="FILE ATTRIBUTES")
					ijf.lists.addEditCustomTypeDetails(tId,false);
	 		  else if(rowIndex.data.iTypeType=="FILE")
					ijf.lists.addEditCustomFileReference(tId,false);
              else
              	ijf.lists.addEditCustomTypeReference(tId);
            }}
    });

    ijf.lists.dWin = new Ext.Window({
        layout: 'vbox',
        title: "IJF Custom Types",
        width: 850,
        height:520,
        scrollable:true,
        closable: true,
        items: [typeListView],
        buttons:[{
			text:'Export',
				handler: function(f,i,n){
						if(!ijf.lists.dWin.items.items[0].selection) return;
						var thisId = ijf.lists.dWin.items.items[0].selection.data.iid;
						var thisT = null;
						for(var tF in ijf.fw.CustomTypes){
								if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
								if(ijf.fw.CustomTypes[tF].id==thisId) thisT=ijf.fw.CustomTypes[tF];
						}
						if(!thisT) return;
						ijfUtils.writeCustomType(thisT);
			}},
			{
				html:  "<form enctype='multipart/form-data' id='typeUploadFormId'><input id='typeUploadFileId' type='file' name='file' onchange='ijfUtils.readTypeConfigFile(event);'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"},
			{
				xtype:'button',
				text:"Import",
				margin: '0 200 0 0',
				handler: function(){
				   //need the formset ID...
				   var uploadTypeFunction = function(){
					   jQuery('#typeUploadFileId').val("");
					   jQuery('#typeUploadFileId').trigger('click');
				   };
				   ijfUtils.modalDialog("Warning","You are about to upload a type configuration file.  If the same Type exists by name, this will overwrite that Type.",uploadTypeFunction);
				}
			},
            {text:'Add',
            handler: function(f,i,n){
				 ijf.lists.addEditType(0);
			}},{
            text:'Edit',
            handler: function(f,i,n){
				if(!ijf.lists.dWin.items.items[0].selection) return;
				var thisId = ijf.lists.dWin.items.items[0].selection.data.iid;
				ijf.lists.addEditType(thisId);
			}},
			{
            text:'Edit Details',
            handler: function(f,i,n){

				if(!ijf.lists.dWin.items.items[0].selection) return;
				var thisId = ijf.lists.dWin.items.items[0].selection.data.iid;
				var thisT = ijf.fw.CustomTypes.reduce(function(inT, ct){if(ct.id==thisId) inT=ct; return inT;},null);
				if(!thisT) return;
				if(thisT.customType=="GRID")
					ijf.lists.addEditCustomTypeDetails(thisId);
				else if(thisT.customType=="FILE ATTRIBUTES")
					ijf.lists.addEditCustomTypeDetails(thisId,false);
				else if(thisT.customType=="FILE")
					ijf.lists.addEditCustomFileReference(thisId,false);
				else
					ijf.lists.addEditCustomTypeReference(thisId);
			}},{
            text:'Delete',
            handler: function(f,i,n){
				if(!ijf.lists.dWin.items.items[0].selection) return;
				var thisId = ijf.lists.dWin.items.items[0].selection.data.iid;
				ijf.lists.deleteCustomType(thisId);
			}},
            {
                text:'Close',
                handler: function(){
                    ijf.lists.dWin.close();
            }}
        ],
        modal: true,
        listeners:{
			focus: function(f)
			{
					var cts = new Array();
					ijf.fw.CustomTypes.forEach(function(ct){
						cts.push([ct.id, ct.name, ct.customType, ct.fieldName]);
					});
					ijf.lists.typeStore.removeAll();
					ijf.lists.typeStore.loadData(cts);
			}
		}
    });
    ijf.lists.dWin.show();
},
addEditCustomTypeDetails:function (inTypeId)
{
    ijf.lists.thisTypeSpec = {};
	var thisT = ijf.lists.thisTypeSpec;
    if(inTypeId)
    {
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].id==inTypeId) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested type for: " + inTypeId); return;}
		ijf.lists.thisTypeSpec=thisT;
    }

    var listColumns = [];
    var tFields = [];

    tFields.push({name: 'columnName', type: 'string'});
    tFields.push({name: 'controlType', type: 'string'});
    tFields.push({name: 'default', type: 'string'});
	tFields.push({name: 'required', type: 'string'});
	tFields.push({name: 'order', type: 'integer'});
	tFields.push({name: 'format', type: 'string'});
	tFields.push({name: 'regEx', type: 'string'});
	tFields.push({name: 'regExMess', type: 'string'});
	tFields.push({name: 'reference', type: 'string'});


	//lookups

    var requiredLookup = ["Yes","No"];
    var controlLookup = ["checkbox","combobox","datefield","multiselect","numberfield","textarea","textfield"];

    listColumns.push({
            header: 'Col Name',
            sortable: true,
            hidden: false,
            width: 120,
            dataIndex: 'columnName',
            filter: {
                type: 'string'
            },
            editor: {
				completeOnEnter: false,
				field: {
					xtype: 'textfield',
					allowBlank: false
				}
            }
    });

    listColumns.push({
		            header: 'Cont. Type',
		            width:120,
		            sortable: true,
		            hidden: false,
		            dataIndex: 'controlType',
		            filter: {
		                type: 'string'
		            },
		            editor: {
						field: {
							xtype: 'combobox',
							allowBlank: false,
							forceSelection: true,
							queryMode: 'local',
							store:controlLookup
						}
            		}
    });
    listColumns.push({
            header: 'Default',
            sortable: true,
            hidden: false,
            width: 120,
            dataIndex: 'default',
            filter: {
                type: 'string'
            },
            editor: {
				completeOnEnter: false,
				field: {
					xtype: 'textfield',
					allowBlank: true
				}
            }
    });
        listColumns.push({
			            header: 'Required',
			            width:120,
			            sortable: true,
			            hidden: false,
			            dataIndex: 'required',
			            filter: {
			                type: 'string'
			            },
			            editor: {
							field: {
								xtype: 'combobox',
								allowBlank: true,
								forceSelection: true,
								queryMode: 'local',
								store:requiredLookup
							}
	            		}
    });
        listColumns.push({
	            header: 'Order',
	            sortable: true,
	            hidden: false,
	            width: 120,
	            dataIndex: 'order',
	            filter: {
	                type: 'integer'
	            },
	            editor: {
					completeOnEnter: false,
					field: {
						xtype: 'textfield',
						allowBlank: true
					}
	            }
    });

    listColumns.push({
            header: 'Format',
            sortable: true,
            hidden: false,
            width: 120,
            dataIndex: 'format',
            filter: {
                type: 'string'
            },
            editor: {
				completeOnEnter: false,
				field: {
					xtype: 'textfield',
					allowBlank: true
				}
            }
    });
        listColumns.push({
	            header: 'Reg. Ex.',
	            sortable: true,
	            hidden: false,
	            width: 120,
	            dataIndex: 'regEx',
	            filter: {
	                type: 'string'
	            },
	            editor: {
					completeOnEnter: false,
					field: {
						xtype: 'textfield',
						allowBlank: true
					}
	            }
    });
        listColumns.push({
	            header: 'RegEx Mess',
	            sortable: true,
	            hidden: false,
	            width: 120,
	            dataIndex: 'regExMess',
	            filter: {
	                type: 'string'
	            },
	            editor: {
					completeOnEnter: false,
					field: {
						xtype: 'textfield',
						allowBlank: true
					}
	            }
    });
        listColumns.push({
	            header: 'Reference',
	            sortable: true,
	            hidden: false,
	            width: 120,
	            dataIndex: 'reference',
	            filter: {
	                type: 'string'
	            },
	            editor: {
					completeOnEnter: false,
					field: {
						xtype: 'textfield',
						allowBlank: true
					}
	            }
    });

    if(!Ext.ClassManager.isCreated('typeGridSpecsArray'))
    {
        Ext.define('typeGridSpecsArray', {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    ijf.lists.typeSpecStore = new Ext.data.Store({
        model: 'typeGridSpecsArray'
    });


    //thisT.settings...
	try
	{
		var cts = JSON.parse(thisT.settings);
		cts = cts.map(function(r){ delete r.id; return r;});
		ijf.lists.typeSpecStore.loadData(cts);
	}
	catch(e)
	{
		ijfUtils.footLog('Failed to parse the control type settings');
	}

    if(Ext.getCmp('typeListSpecViewId')) Ext.getCmp('typeListSpecViewId').destroy();

    var typeListSpecView = new Ext.grid.GridPanel({
		 dockedItems: [{
		                xtype: 'toolbar',
		                items: [{
		                    iconCls: 'icon-add',
		                    text: 'Add',
		                    scope: this,
		                    handler: function(){
								 //create record...
								 var rec = new typeGridSpecsArray({
								             columnName: '',
								             columnType: '',
								             controlType: '',
								             "default": '',
								             required: '',
								             order: '',
								             format: '',
								             regEx: '',
								             reference: '',
								             columnType: ''
        						 });
								 this.typeSpecStore.insert(0, rec);
							}
		                }, {
		                    iconCls: 'icon-delete',
		                    text: 'Delete',
		                    scope: this,
		                    handler: function(){
								var selection = ijf.lists.dWin2.items.items[0].getView().getSelectionModel().getSelection()[0];
								if (selection) {
									this.typeSpecStore.remove(selection);
								}
							}
		                }]
				   }],
        store: ijf.lists.typeSpecStore,
        //height:500,
        width:1100,
        plugins: 'gridfilters',
        id: "typeListSpecViewId",
        //reserveScrollOffset: true,
        columns: listColumns,
        selModel: 'cellmodel',
		    plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
        }
    });

    ijf.lists.dWin2 = new Ext.Window({
        layout: 'vbox',
        title: "IJF Custom Type Specs",
        scrollable: true,
        width: 1120,
        height:420,
        closable: true,
        items: [typeListSpecView],
        buttons:[ {
                text:'Save',
                handler: function(){

					var sArray = [];
					ijf.lists.typeSpecStore.getData().each(function(r){
						r.commit();
						sArray.push(r.data);
					});
					ijf.lists.thisTypeSpec.settings = JSON.stringify(sArray);

					var jOut = {
								customTypeId: ijf.lists.thisTypeSpec.id,
								name: ijf.lists.thisTypeSpec.name,
								description: ijf.lists.thisTypeSpec.description,
								customType: ijf.lists.thisTypeSpec.customType,
								fieldName: ijf.lists.thisTypeSpec.fieldName,
								settings: JSON.stringify(ijf.lists.thisTypeSpec.settings)
					};
					var jdata = JSON.stringify(jOut);

					var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");

					if(isNaN(sStat))
					{
						ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
					}
            }},
            {
                text:'Close',
                handler: function(){
                    ijf.lists.dWin2.close();
                    if(ijf.lists.dWin) ijf.lists.dWin.focus();
            }}
        ],
        modal: true
    });
    ijf.lists.dWin2.show();
}
,
addEditCustomTypeReference:function (inTypeId)
{
    ijf.lists.thisTypeSpec = {};
	var thisT = ijf.lists.thisTypeSpec;
    if(inTypeId)
    {
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].id==inTypeId) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested type for: " + inTypeId); return;}
		ijf.lists.thisTypeSpec=thisT;
    }

    //thisT.settings...
	try
	{
		var cts = JSON.parse(thisT.settings);
	}
	catch(e)
	{
		ijfUtils.footLog('Failed to parse the control type settings');
	}

    if(Ext.getCmp('typeListSpecViewId')) Ext.getCmp('typeListSpecViewId').destroy();


    ijf.lists.dWin2 = new Ext.Window({
        layout: 'vbox',
        title: "IJF Custom Type Reference Specs",
        width: 600,
        height:420,
        closable: true,
        items: [
			{
                xtype: 'textarea',
  				margin: '0 0 0 0',
                width: '100%',
                height: '100%',
                value: cts,
                allowBlank:false,
                listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                change: function(f,n,o){
                        cts = n;
                    }
                }
            },
        ],
        buttons:[ {
                text:'Save',
                handler: function(){

					if(!cts)
					{
						ijfUtils.modalDialogMessage("Error","Sorry, you must add a value to save.  JSON or String.");
						return;
					}

					ijf.lists.thisTypeSpec.settings = JSON.stringify(cts);

					var jOut = {
								customTypeId: ijf.lists.thisTypeSpec.id,
								name: ijf.lists.thisTypeSpec.name,
								description: ijf.lists.thisTypeSpec.description,
								customType: ijf.lists.thisTypeSpec.customType,
								fieldName: ijf.lists.thisTypeSpec.fieldName,
								settings: JSON.stringify(ijf.lists.thisTypeSpec.settings)
					};
					var jdata = JSON.stringify(jOut);

					var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");

					if(isNaN(sStat))
					{
						ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
					}
					else{
						ijf.lists.dWin2.close();
					}
					//else
					//{
					//	ijfUtils.modalDialogMessage("Information","Saved");
					//}
            }},
            {
                text:'Close',
                handler: function(){
                    ijf.lists.dWin2.close();
                    if(ijf.lists.dWin) ijf.lists.dWin.focus();
            }}
        ],
        modal: true
    });
    ijf.lists.dWin2.show();
}
,
addEditCustomFileReference:function (inTypeId,isReportView)
{
    ijf.lists.thisTypeSpec = {};
	var thisT = ijf.lists.thisTypeSpec;
    if(inTypeId)
    {
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].id==inTypeId) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested type for: " + inTypeId); return;}
		ijf.lists.thisTypeSpec=thisT;
    }

	var cloudToken =  "&jwt=" + getJwtToken();
    //need to call the API and get the actual file setting...
    var fileDetailRaw = ijfUtils.jiraApiSync('GET','/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id + cloudToken, null);

    var cleanDoubleDouble = fileDetailRaw.replace(/\"\"/g,"\"");
	cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
	cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");

	var fileType = JSON.parse(cleanDoubleDouble);
	var fileDetail = {};
    //thisT.settings...

    var fileInfoString = "No file loaded yet";
	try
	{
		var fileDetail = JSON.parse(fileType.settings);
		var fParts = fileDetail.fileInfoString.split("\\");
		   if(fParts.length==1)
		   {
			   var fName = fileDetail.fileInfoString;
		   }
		   else
		   {
			   var fName = fParts[fParts.length-1];
		   }
		   fileInfoString = "File Management: " + fName;
	}
	catch(e)
	{
		fileInfoString = "File Management: No file loaded";
	}
	fileType["details"]=fileDetail;

    //reset file detail to object if it is NULL
    if(Object.keys(fileDetail).length==0) fileDetail={};
    var cts = null;

    //file read handler
    var fileEncoded = false;
	var onLoadHandler = function()
	{
	   var reader = this;
       var encodedFile = ijfUtils.Base64Binary.arrayBufferToBase64(reader.result);
       cts = {"fileInfoString":jQuery('#typeUploadBinFileId').val(),"file":encodedFile};
       Ext.getCmp('typeFileInformationId').update("Your file has been staged, please click SAVE to store on server.");
       fileEncoded = true;

	};
	ijf.main.callbacks["onLoadHandler"]=onLoadHandler;


	//set up field picker
	var gridFieldNameArray=[{name: "value", type: "string"}];
	var colSettingsArray=[{
				header: "Field Name",
				width: 'auto',
				dataIndex: "value",
				width: "100%",
				sortable: true,
				filter: {
				  type: 'string'
	            }
			}];
		if(!Ext.ClassManager.isCreated("fieldPickerModel"))
		{
			Ext.define("fieldPickerModel", {
				extend: 'Ext.data.Model',
				fields: gridFieldNameArray
			});
		}
	 	var fLookupStore = Ext.create('Ext.data.Store', {
			model: "fieldPickerModel",
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}},
				autoLoad: false});
		ijfUtils.loadJiraFields();

		var jFields = ijf.jiraFields.map(function(e){
			return e.name;
		});
	    jFields = jFields.sort();
		var fLookup = jFields.map(function(e){
			return {"id":e,"value":e};
		});
		fLookupStore.proxy.data=fLookup;
		fLookupStore.load();
		var fieldNameGrid= new Ext.grid.GridPanel({
			store: fLookupStore,
			plugins: 'gridfilters',
			//style: l_panelStyle,
			frame: false,
			title: "Field Picker",
			border: false,
			height: '100%',
			width: '100%',
			columns: colSettingsArray,
			selModel: {selType: 'rowmodel', mode: 'SINGLE'},
			listeners: {
				'beforeitemdblclick': function(selMod, record, something ){
					var nVal = record.data.value;
					var fCtl = Ext.getCmp('jqlFieldsId');
					var cVal = fCtl.getValue();
					if(cVal) fCtl.setValue(cVal + "," +nVal)
						else
						 fCtl.setValue(nVal)
				}
			}
		});



    ijf.lists.dWin2 = new Ext.Window({
        layout: 'vbox',
        title: "IJF Report Builder: " + thisT.name,
        width: 1100,
        height:800,
        closable: true,
        header:{
						titlePosition: 0,
						items:[{
							xtype:'button',
							text:"Field Reference",
							handler: function(){
								ijfUtils.loadJiraFields();
					   			var headStyle =  " style='background:lightgray;border-bottom:solid blue 2px' ";
								var htmlOut = "<table cellspacing=0 width=100%><tr><td"+headStyle+">Field Name</td><td"+headStyle+">JIRA ID</td><td"+headStyle+">Type</td><td"+headStyle+">Forms Reference</td></tr>";
								var outFieldRef = [];
								Object.keys(ijf.jiraFieldsKeyed).forEach(function(f){
									var field = ijf.jiraFieldsKeyed[f];
									var fRef = "#{"+f+"}";
									var fId="";
									if(field.schema)
									{
										if(field.schema.type=="array") fRef="na";
										if(field.schema.customId) fId = "customfield_" +field.schema.customId;
									}
									else
									{
										field["schema"]={};
										field.schema["type"]="unknown";
									}
									if(field.name=="comment") fRef="na";
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
								title: "Field Reference",
								width: 1100,
								height: 800,
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
							}
						},
						 {
								text:'JQL Help',
								xtype: 'button',
								style: 'margin:0 0 0 10px',
								handler: function(){
									   window.open("https://confluence.atlassian.com/jiracoreserver073/advanced-searching-861257209.html");
								}},
								{
									xtype:'button',
									style: 'margin:0 0 0 10px',
									text:"Reports Help",
									handler: function(){
									   window.open("http://www.idealfed.com/reports.html");
								}}
						]
			},
        items: [{
					frame: false,
					layout: 'hbox',
					hidden: false,
					margin: '0 0 0 0',
					border: false,
				    xtype: "panel",
				    items:[
							{
								frame: false,
								layout: 'vbox',
								hidden: false,
								margin: '0 0 0 0',
								border: false,
								xtype: "panel",
								items:[
										{
										html:  "This dialog configures a query and optionally, a file for output.  Files are for MSWord reports that 'mail-merge' field values.  <br>The Issue Key, JQL and Fields are used to provide data available to the report. <br>The debug flag if true will ouput 'no data found' for null values in the word file.",
										frame: false,
										hidden: false,
										margin: '5 0 5 20',
										border: false,
										xtype: "panel"},
										{
											frame: false,
											layout: 'hbox',
											hidden: false,
											margin: '5 0 5 20',
											border: false,
											xtype: "panel",
											items: [{
													html:  fileInfoString,
													frame: false,
													id: "typeFileInformationId",
													hidden: false,
													margin: '5 0 5 20',
													border: false,
													xtype: "panel"},
													{
													html:  "<form enctype='multipart/form-data' id='typeUploadBinFormId'><input id='typeUploadBinFileId' type='file' accept='.docx' name='file' onchange='ijfUtils.readBinaryFile(event,\"onLoadHandler\");'></form>",
													frame: false,
													hidden: true,
													border: false,
													xtype: "panel"},
													{
														xtype:'button',
														text:"Upload",
														margin: '0 0 5 20',
														handler: function(){
														   //need the formset ID...
														   var uploadTypeFunction = function(){
															   fileEncoded = false;
															   jQuery('#typeUploadBinFileId').val("");
															   jQuery('#typeUploadBinFileId').trigger('click');
														   };
														   ijfUtils.modalDialog("Warning","You are about to upload a file, this will overwrite the existing file.",uploadTypeFunction);
														}
													},
													{
														xtype:'button',
														text:"Download",
														margin: '0 0 0 20',
														handler: function(){
														   //open file details local
														   var decodedFile = ijfUtils.Base64Binary.base64ToArrayBuffer(fileDetail.file);
														   //name is the name
														   var fParts = fileDetail.fileInfoString.split("\\");
														   if(fParts.length==1)
														   {
															   var fName = fileDetail.fileInfoString;
														   }
														   else
														   {
															   var fName = fParts[fParts.length-1];
														   }
															var blob = new Blob([decodedFile], {type: "application/octet-stream"});
															saveAs(blob,fName);
														}
													}

											]},
										{
										xtype: 'textfield',
										labelAlign: 'left',
										fieldLabel: 'Default Issue Key',
										labelWidth: 120,
										labelStyle: "color:darkblue",
										margin: '4 0 0 20',
										width: 230,
										value: fileDetail.key,
										listeners: {
											change: function(f,n,o){
												fileDetail.key = n;
												}
											}
										},
										{
										xtype: 'textfield',
										labelAlign: 'left',
										fieldLabel: 'Default JQL',
										labelWidth: 120,
										labelStyle: "color:darkblue",
										margin: '4 0 0 20',
										width: 800,
										value: fileDetail.jql,
										listeners: {
											change: function(f,n,o){
												fileDetail.jql = n;
											}
										}
										},
										{
										xtype: 'textfield',
										labelAlign: 'left',
										fieldLabel: 'Default Fields',
										labelWidth: 120,
										labelStyle: "color:darkblue",
										margin: '4 0 0 20',
										width: 800,
										id: 'jqlFieldsId',
										value: fileDetail.fields,
										listeners: {
											change: function(f,n,o){
												fileDetail.fields = n;
											}
										}
									},
									{
										xtype: 'combobox',
										labelAlign: 'left',
										forceSelection: true,
										store: ["true","false"],
										forceSelection: true,
										labelWidth: 120,
										margin: '4 0 0 20',
										fieldLabel: "Debug Mode",
										labelStyle: "color:darkblue",
										triggerAction: 'all',
										width: 200,
										value: fileDetail.debugMode,
										listeners: {
												change: function(f, n, o){
													fileDetail.debugMode = n;
										}}
									}
								]
							},
							{
								frame: false,
								layout: 'vbox',
								hidden: false,
								margin: '10 10 0 10',
								border: false,
								bodyStyle: 'border:solid lightgray 2px !important',
								width: 220,
								height:240,
								xtype: "panel",
								items:[
										fieldNameGrid
								]
							}
				    ]
				},
				{
					frame: false,
					layout: 'hbox',
					hidden: false,
					margin: '0 0 0 0',
					border: false,
				    xtype: "panel",
				    items:[
						{
									xtype: 'button',
									text: 'Test Query',
									margin: '4 0 0 20',
									handler: function(){


										//JQL processing
										ijfUtils.loadJiraFields();

										  //issue processing
										  var iKey = fileDetail.key;
										  var iOutput = "--------------No Issue Defined--------------";
										  if(iKey)
										  {
											var thisIssue = ijfUtils.getJiraIssueSync(iKey);
											if(thisIssue)
											{
												iOutput = "<br><br>------------Issue Results "+iKey+"------------------<br><table><tr>";
													iOutput += "<td style='background:lightblue'>Field</td>";
													iOutput += "<td style='background:lightblue'>Name</td>";
													iOutput += "<td style='background:lightblue'>Value</td>";

												if(thisIssue.fields)
												{
													Object.keys(thisIssue.fields).forEach(function(f)
													{
														if(thisIssue.fields[f])
														iOutput +="<tr><td>"+f+"</td><td>"+ijf.jiraFieldsIdKeyed[f].name+"</td><td>"+ijfUtils.handleJiraFieldType(ijf.jiraFieldsIdKeyed[f],thisIssue.fields[f],true)+"</td></tr>"
													});
													iOutput+="</table>"
												}
												else
												{
													iOutput+="<tr><td colspan=3>No fields in result</td></tr>"
													iOutput+="</table>"
												}
											}
											else
											{
											  var iOutput = "-----------------UNABLE to LOAD "+iKey+"----------------";
											}
										  }


										  //JQL processing

										  var jql = fileDetail.jql;
										  var flds = fileDetail.fields;

										  var outStr = "--------------No JQL Defined----------------<br>"
										  if((jql) && (flds))
										  {
											  var translateFields = ijfUtils.translateJiraFieldsToIds(flds);
											  var suffix = "";
											  if(flds) suffix = "&fields=" + translateFields;
											  var aUrl = '/rest/api/2/search?jql='+jql + suffix;
											  var rawList = null;
											  try
											  {
												  rawList = ijfUtils.jiraApiSync('GET',aUrl, null);
											  }
											  catch(e)
											  {
												  rawList = "JQL Query Error: " + e.message;
											  }

											  var fieldMap = ijfUtils.translateJiraFieldsToObjs(flds);
											  if(rawList.issues)
											  {
												outStr = "------------JQL Results: "+jql+"------------------<br><table><tr>";
												fieldMap.forEach(function(f){
													outStr += "<td style='background:lightblue'>"+f.name+"</td>";
												});
												outStr+="</tr>"
												rawList.issues.forEach(function(i)
												{
													outStr += "<tr>";
													fieldMap.forEach(function(f){
														if(f.id.toLowerCase()=="key")
														{
															outStr += "<td>"+i.key+"</td>";
															return;
														}
														if(ijf.jiraFieldsKeyed.hasOwnProperty(f.name))
														{
															outStr += "<td>"+ijfUtils.handleJiraFieldType(ijf.jiraFieldsKeyed[f.name],i.fields[f.id],true)+"</td>";
														}
														else
														{
															if(i.fields)
															{
																outStr += "<td>"+i.fields[f.id]+"</td>";
															}
															else
															{
																outStr += "<td>undefined</td>";
															}
														}


													});
													outStr+="</tr>"
												});
												outStr+="</table>"
												//Ext.MessageBox.show({"title":"Query Result","message":outStr,scrollable:true,width:1200,height:600});
												}
												else
												{
													outStr = "<br><br>------------JQL RAN but no results!----------------<br><br>" + rawList;
												}
											}
											var qPanel = new Ext.Panel({
													layout: 'vbox',
													title: "Query Result",
													width: '100%',
													height:465,
													margin: '10 0 0 0',
													header:{
													titlePosition: 0,
													items:[{
														xtype:'button',
														text:"Pop into Tab",
														handler: function(btn){
														   // render a local version
														 var win = window.open("","ijfQueryReference");
														 win.document.body.innerHTML = outStr + iOutput;
														 win.document.title = "IJF Query Reference";
														}
													}]},
													items: [
														{
															xtype: 'panel',
															html: outStr + iOutput,
															scrollable:true,
															margin: '4 0 0 10',
															width: '100%',
															height: '100%',
														}
														]
												});
												var tPanel = Ext.getCmp('queryContainerPanelId');
												tPanel.removeAll();
												tPanel.add(qPanel);
									}
					},
					{
							xtype: 'button',
							text: 'Generate Report',
							margin: '4 0 0 20',
							handler: function(){
									//prep data

									if(!fileDetail.file)
									{
										ijfUtils.modalDialogMessage("Information","Sorry, you have not uploaded a file for generating.");
										return;
									}
									ijfUtils.loadJiraFields();
									//load item if exists...
									var iKey = fileDetail.key;
									if(iKey)
									{
											var thisIssue = ijfUtils.getJiraIssueSync(iKey);
									}
									var itemData={};
									if(thisIssue)
									{
										if(thisIssue.fields)
										{
											Object.keys(thisIssue.fields).forEach(function(f)
											{
												if(thisIssue.fields[f])
												{
													itemData[ijf.jiraFieldsIdKeyed[f].name]=ijfUtils.handleJiraFieldType(ijf.jiraFieldsIdKeyed[f],thisIssue.fields[f],true);
												}

											});
											itemData["status"]=thisIssue.fields.status.name;
										}
										//add special values:  key, status
										itemData["key"]=thisIssue.key;
   			 					    }

									//add ocf hook to alter data
									//ocf(itemData);

									//get custom type, then load file detail, generate output, download
									var thisT = fileType;
									//in memory file
									if(cts)
									{
										if(cts.file) fileDetail.file=cts.file;
									}
									thisT.fileDetail = fileDetail;
									//you have prepped data AND you have file type...call generateCustomeFile
									var whenDone = function(){ijf.lists.dWin2.unmask();};
									var gRep = function(){
										try
										{
											ijfUtils.generateWordFile(itemData,thisT,whenDone);
										}
										catch(e)
										{
											ijf.lists.dWin2.unmask();
											ijfUtils.modalDialogMessage("Report Error","The report could not be created, Please look at:<br><br>" + e.message + "<br>" + e.properties.explanation);
										}
									}
									ijf.lists.dWin2.mask("Creating");
									window.setTimeout(gRep,100);
							}
					},
					{
							xtype: 'button',
							text: 'Report URLs',
							margin: '4 0 0 20',
							handler: function(){
								var cloudToken =  "&jwt=" +getJwtToken();
							var urlWin = new Ext.Window({
										layout: 'vbox',
										title: "Report Links",
										width: 1050,
										height:250,
										closable: true,
										items: [{
											html: "The following urls can be used to run this report:",
											border: false,
											width: 580,
											margin: '4 0 0 10',
											frame: false,
											xtype: "panel"},
											{
												xtype: 'textfield',
												labelAlign: 'left',
												fieldLabel: 'Direct URL',
												labelWidth: 100,
												labelStyle: "color:darkblue",
												margin: '4 0 0 10',
												width: 900,
												value: window.location.origin + "/run?mode=report&reportName="+thisT.name +cloudToken,
												allowBlank:false
											},{
											html: "This URL will run with the default jql etc, saved in the report",
											border: false,
											width: 580,
											margin: '5 0 10 120',
											frame: false,
											xtype: "panel"},{
												xtype: 'textfield',
												labelAlign: 'left',
												fieldLabel: 'Explicit URL',
												labelWidth: 100,
												labelStyle: "color:darkblue",
												margin: '4 0 0 10',
												width: 900,
												value: window.location.origin + "/run?mode=report&reportName="+thisT.name + "&issue="+fileDetail.key + "&jql="+fileDetail.jql + "&fields="+fileDetail.fields + cloudToken,
												allowBlank:false
											},{
											html: "This URL will run using params in the URL, any are optional",
											border: false,
											width: 580,
											margin: '5 0 10 120',
											frame: false,
											xtype: "panel"},
											{
											html: "Lastly, you can dynamically insert issue and jql using scriptrunner and JIRA utilities.  Please see help page for more.",
											border: false,
											width: 580,
											margin: '5 0 0 120',
											frame: false,
											xtype: "panel"}]
									});
								urlWin.show();

							}
					}
				]
			}
            ,
			{
				xtype: 'panel',
				id: 'queryContainerPanelId',
				width: '100%',
				html: "<hr>"
			}

        ],
        buttons:[ {
                text:'Save',
                handler: function(){

					/*if(!fileEncoded)
					{
						ijfUtils.modalDialogMessage("Error","Sorry, please select a file to save.");
						return;
					}
					*/

					if(cts)
					{
						//file encoded...
						fileDetail.fileInfoString = cts.fileInfoString;
						fileDetail.file = cts.file;
					}
					ijf.lists.thisTypeSpec.settings = JSON.stringify(fileDetail);

					var jOut = {
								customTypeId: ijf.lists.thisTypeSpec.id,
								name: ijf.lists.thisTypeSpec.name,
								description: ijf.lists.thisTypeSpec.description,
								customType: ijf.lists.thisTypeSpec.customType,
								fieldName: ijf.lists.thisTypeSpec.fieldName,
								settings: JSON.stringify(ijf.lists.thisTypeSpec.settings)
					};
					var jdata = JSON.stringify(jOut);

					var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");

					if(isNaN(sStat))
					{
						ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
					}
					else
					{
						//ijfUtils.modalDialogMessage("Information","Saved");
						fileEncoded=false;
						ijfUtils.modalDialogMessage("Info","Saved");
						var fParts = cts.fileInfoString.split("\\");
					   if(fParts.length==1)
					   {
						   var fName = fileDetail.fileInfoString;
					   }
					   else
					   {
						   var fName = fParts[fParts.length-1];
					   }
						Ext.getCmp('typeFileInformationId').update(fName);
					}
            }},
            {
                text:'Close',
                handler: function(){
                    ijf.lists.dWin2.close();
                    if(ijf.lists.dWin) ijf.lists.dWin.focus();
            }}
        ],
        modal: true
    });
    ijf.lists.dWin2.show();
}
,
addEditType:function (inTypeId,isReportView)
{

	var editForm = false;
	ijf.lists.thisType = {};
	var thisT = ijf.lists.thisType;
    if(inTypeId)
    {
		editForm = true;
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].id==inTypeId) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT.name){ ijfUtils.modalDialogMessage("Error","Sorry, undable to find the requested form group for: " + inTypeId); return;}
		ijf.lists.thisType=thisT;
    }
    else
    {
		//construct blank type...
		thisT.name = "";
		thisT.description = "";
		thisT.customType = "";
		thisT.fieldName = "";
		thisT.id = 0;
		if(isReportView)
		{
			thisT.customType = "FILE";
		}
		thisT.settings=JSON.stringify([]);
	}


    var dMes = "Adding a new custom control type, this creates";
    dMes+=" a control type you can use in your forms.  Please note:";
    dMes+="<ul><li>JIRA Field is the storage location for this item for reporting</li>";
    dMes+="<li>JIRA Field is not applicable for REFERENCE types</li></ul>";
    if(isReportView)
    {
		dMes="Adding a new report.  Please note:";
		dMes+="<ul><li>Once created, select and choose Edit Details to create and test query.</li>";
	}

    var fieldLookup = [];

    ijfUtils.loadJiraFields();

	fieldLookup = ijf.jiraFields.reduce(function(inArr, f){
		if(f.custom) inArr.push([f.name,f.name]);
		return inArr;
	},fieldLookup);

	fieldLookup.sort();

    var typeLookup = ["GRID","REFERENCE","FILE","FILE ATTRIBUTES"];

    var tit = "IJF Custom Type Settings";
    if(isReportView) tit = "IJF Report Settings";

    ijf.lists.dWin2 = new Ext.Window({
        layout: 'vbox',
        title: tit,
        width: 525,
        height:350,
        closable: true,
        items: [{
            html: dMes,
            border: false,
            width: 580,
            margin: '4 0 0 10',
            frame: false,
            xtype: "panel"},
            {
                xtype: 'textfield',
                labelAlign: 'left',
                fieldLabel: 'Name',
                labelWidth: 100,
                labelStyle: "color:darkblue",
  				margin: '4 0 0 10',
                width: 400,
                value: thisT.name,
                allowBlank:false,
                listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                change: function(f,n,o){

                        thisT.name = n;
                    }
                }
            },
 			{
                xtype: 'textarea',
                labelAlign: 'left',
                fieldLabel: 'Description',
                labelWidth: 100,
                labelStyle: "color:darkblue",
  				margin: '4 0 0 10',
                width: 400,
                value: thisT.description,
                allowBlank:false,
                listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                change: function(f,n,o){
						if(n) thisT.description = n.replace(/\n/g," ");
                    }
                }
            },
			{
				xtype: 'combobox',
				labelAlign: 'left',
				store: typeLookup,
				forceSelection: true,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "Control Type",
				allowBlank:false,
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				hidden: isReportView,
				width: 400,
				value: thisT.customType,
				listeners: {
					afterrender: function(f)
					                {
					                    this.validate();
                    },
					change: function(f, n, o){
						thisT.customType = n;
					}}
			},
			{
				xtype: 'combobox',
				labelAlign: 'left',
				forceSelection: false,
				store: fieldLookup,
				labelWidth: 100,
				margin: '4 0 0 10',
				fieldLabel: "JIRA Field",
				labelStyle: "color:darkblue",
				triggerAction: 'all',
				hidden: isReportView,
				width: 400,
				value: thisT.fieldName,
				listeners: {
									afterrender: function(f)
									                {
									                    this.validate();
				                    },
									change: function(f, n, o){
										thisT.fieldName = n;
					}}
			},
        ],
        buttons:[{
            text:'Save',
            handler: function(f,i,n){
				var thisCustomType = ijf.lists.thisType;

				if(thisCustomType.name=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the name cannot be blank."); return;}
				if(thisCustomType.description=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the description cannot be blank."); return;}
				if(thisCustomType.customType=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the type cannot be blank."); return;}

				//if type ==GRID then
				if((thisCustomType.customType=="GRID") || (thisCustomType.customType=="FILE ATTRIBUTES"))
				{
					if(thisCustomType.fieldName=="") {ijfUtils.modalDialogMessage("Form Error","Sorry, the fieldname cannot be blank."); return;}
				}
				else
				{
					thisCustomType.fieldName="NA";
				}

		        var jOut = {
							customTypeId: thisCustomType.id,
							name: thisCustomType.name,
							description: thisCustomType.description,
							customType: thisCustomType.customType,
							fieldName: thisCustomType.fieldName,
							settings: JSON.stringify(thisCustomType.settings)
				};
				var jdata = JSON.stringify(jOut);

				var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");

				if(isNaN(sStat))
				{
					ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
				}
				else
				{
					//update the custom type with this new one...list will refesh on focus
					if(ijf.lists.thisType.id==0)
					{
						ijf.lists.thisType.id=sStat;
						ijf.fw.CustomTypes.push(ijf.lists.thisType);
					}
					ijf.lists.dWin2.close();
					if(ijf.lists.dWin) ijf.lists.dWin.focus();
				}

            }},
            {
                text:'Cancel',
                handler: function(){
                    ijf.lists.dWin2.close();
                }}
        ],
        modal: true
    });
    ijf.lists.dWin2.show();
}



};








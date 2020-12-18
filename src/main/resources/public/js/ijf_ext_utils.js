var ijf = ijf || {};
ijf.extUtils ={
renderField:function(inFormKey, item, inField, inContainer)
{
	//ensure  fleshed inField for key fields
	(inField.style) ? null: inField.style="";
	(inField.fieldStyle) ? null: inField.fieldStyle="";
	(inField.labelStyle) ? null: inField.labelStyle="";
	(inField.panelStyle) ? null: inField.panelStyle="";
	(inField.event) ? null: inField.event="";
	(inField.renderif) ? null: inField.renderif="";
	(inField.caption) ? null: inField.caption="";
	(inField.dataSource) ? null: inField.dataSource="";
	(inField.toolTip) ? null: inField.toolTip="";

    if(!inField.permissions)
	{
		if(!inField.hasOwnProperty("rawPermissions"))
		{
			inField.permissions =
				{"enabled":false,
				 "states":{}
				};
		}
		else
		{
			inField.permissions=JSON.parse(inField.rawPermissions);
		}
	}
    //attempt to pull data....
    try
    {
        switch(inField.controlType) {
			//REACT Section
            case 'muiDatebox':
                ijf.reactUtils.renderDatebox(inFormKey,item,inField,inContainer);
                break;
            case 'muiTextbox':
                ijf.reactUtils.renderTextbox(inFormKey,item,inField,inContainer);
                break;
            case 'muiTextarea':
                ijf.reactUtils.renderTextarea(inFormKey,item,inField,inContainer);
                break;
            case 'muiButton':
                ijf.reactUtils.renderButton(inFormKey,item,inField,inContainer);
                break;
            case 'muiCardList':
                ijf.reactUtils.renderCardList(inFormKey,item,inField,inContainer);
                break;
            case 'muiDrawer':
                ijf.reactUtils.renderDrawer(inFormKey,item,inField,inContainer);
                break;
            case 'muiIcon':
                ijf.reactUtils.renderIcon(inFormKey,item,inField,inContainer);
                break;
            case 'muiSelect':
                ijf.reactUtils.renderSelect(inFormKey,item,inField,inContainer);
                break;
            case 'muiRadio':
                ijf.reactUtils.renderRadio(inFormKey,item,inField,inContainer);
                break;
            case 'muiGrid':
                ijf.reactUtils.renderGrid(inFormKey,item,inField,inContainer);
                break;
            case 'muiCommentList':
                ijf.reactUtils.renderCommentList(inFormKey,item,inField,inContainer);
                break;
            case 'muiCommentSuperList':
                ijf.reactUtils.renderSuperCommentList(inFormKey,item,inField,inContainer);
                break;
            case 'muiHistoryList':
                ijf.reactUtils.renderHistoryList(inFormKey,item,inField,inContainer);
                break;
            case 'muiFormButtons':
                ijf.reactUtils.renderFormButtons(inFormKey,item,inField,inContainer);
                break;
            case 'muiAppBar':
                ijf.reactUtils.renderAppBar(inFormKey,item,inField,inContainer);
                break;
            case 'muiHtml':
                ijf.reactUtils.renderHtml(inFormKey,item,inField,inContainer);
                break;




			//SENCHA Section

            case 'issue relator':
                ijf.extUtils.renderIssueRelations(inFormKey,item,inField,inContainer);
                break;
            case 'Reference Editor':
                ijf.extUtils.renderGridRefEditor(inFormKey,item,inField,inContainer);
                break;
            case 'itemlistHTML':
                ijf.extUtils.renderItemlistHtml(inFormKey,item,inField,inContainer);
                break;
            case 'GRIDHTML':
                ijf.extUtils.renderGridHtml(inFormKey,item,inField,inContainer);
                break;
            case 'GRID':
                ijf.extUtils.renderGridPanel(inFormKey,item,inField,inContainer);
                break;
            case 'textbox':
                ijf.extUtils.renderTextbox(inFormKey,item,inField,inContainer);
                break;
            case 'textarea':
                ijf.extUtils.renderTextarea(inFormKey,item,inField,inContainer);
                break;
            case 'htmleditor':
                ijf.extUtils.renderHtmleditor(inFormKey,item,inField,inContainer);
                break;
            case 'formbuttons':
                ijf.extUtils.renderFormButtons(inFormKey,item,inField,inContainer);
                break;
            case 'html':
                ijf.extUtils.renderHtml (inFormKey,item,inField,inContainer);
                break;
            case 'htmldata':
                ijf.extUtils.renderRaw (inFormKey,item,inField,inContainer);
                break;
            case 'navigatetoform':
                ijf.extUtils.renderNavigateToForm (inFormKey,item,inField,inContainer);
                break;
            case 'datebox':
                ijf.extUtils.renderDatebox(inFormKey,item,inField,inContainer);
                break;
            case 'dropdown':
                ijf.extUtils.renderDropdown (inFormKey,item,inField,inContainer);
                break;
            case 'dropdownwithpicker':
                ijf.extUtils.renderDropdownWithPicker (inFormKey,item,inField,inContainer);
                break;
            case 'radio':
                ijf.extUtils.renderRadiogroup (inFormKey,item,inField,inContainer);
                break;
            case 'workflowbuttons':
                ijf.extUtils.renderWorkflowButtons (inFormKey,item,inField,inContainer);
                break;
            case 'checkbox':
                ijf.extUtils.renderCheckbox (inFormKey,item,inField,inContainer);
                break;
            case 'multiselect':
                ijf.extUtils.renderMultiselect (inFormKey,item,inField,inContainer);
                break;
            case 'reportbutton':
                ijf.extUtils.renderXumenterbutton(inFormKey,item,inField,inContainer);
                break;
            case 'button':
                ijf.extUtils.renderBlankbutton(inFormKey,item,inField,inContainer);
                break;
            case 'tabmenu':
                ijf.extUtils.renderTabmenu(inFormKey,item,inField,inContainer);
                break;
            case 'userpicker':
                ijf.extUtils.renderUserPicker (inFormKey,item,inField,inContainer);
                break;
            case 'userpickermulti':
                ijf.extUtils.renderUserMultiselect (inFormKey,item,inField,inContainer);
                break;
            case 'grouppicker':
                ijf.extUtils.renderGroupPicker (inFormKey,item,inField,inContainer);
                break;
            case 'grouppickermulti':
                ijf.extUtils.renderGroupMultiselect (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentlist':
                ijf.extUtils.renderAttchmentList (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentlistgrid':
                ijf.extUtils.renderAttchmentListGrid (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentlisttree':
                ijf.extUtils.renderAttachmentListTree (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentSPtree':
                ijf.extUtils.renderAttachmentSPTree (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentmanaged':
                ijf.extUtils.renderAttachmentManaged (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentSPmanaged':
                ijf.extUtils.renderAttachmentSPManaged (inFormKey,item,inField,inContainer);
                break;
            case 'attachmentupload':
                ijf.extUtils.renderAttachmentUpload(inFormKey,item,inField,inContainer);
                break;
            case 'commentlist':
                ijf.extUtils.renderCommentList (inFormKey,item,inField,inContainer);
                break;
            case 'historylist':
                ijf.extUtils.renderHistoryList (inFormKey,item,inField,inContainer);
                break;
            case 'subform':
                ijf.extUtils.renderNestedForm (inFormKey,item,inField,inContainer);
                break;
            case 'itemlist':
                ijf.extUtils.renderItemList (inFormKey,item,inField,inContainer);
                break;
            case 'itemtree':
                ijf.extUtils.renderItemTree (inFormKey,item,inField,inContainer);
                break;
            case 'itemfolders':
                ijf.extUtils.renderItemFolders (inFormKey,item,inField,inContainer);
                break;
            case 'chart-pie':
                ijf.extUtils.renderPieChart (inFormKey,item,inField,inContainer);
                break;
            case 'chart-bar':
                ijf.extUtils.renderBarChart (inFormKey,item,inField,inContainer);
                break;
            case 'openpopform':
                ijf.extUtils.renderPopFormButton(inFormKey,item,inField,inContainer);
                break;
            case 'formbuttonsforpopup':
                ijf.extUtils.renderPopupFormButtons(inFormKey,item,inField,inContainer);
                break;
            case 'openurl':
                ijf.extUtils.renderButtonLink(inFormKey,item,inField,inContainer);
                break;
            case 'iframe':
                ijf.extUtils.renderIframe(inFormKey,item,inField,inContainer);
                break;

            default:
                inContainer.innerHTML="no control for type: " + inField.controlType;
        }
    }
    catch(e)
    {
        throw("Error with: " + inField.controlType + " " + e.message);
    }
},
 renderIframe:function(inFormKey,item, inField, inContainer)
{
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var rOnly=false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var seamless = ""; // Whether or not to add the seamless HTML5 attribute and onload event to grab inner document height.
    var onload = ""
    if (inField.style.indexOf('seamless:true')>-1)
    {
        inField.style.replace('seamless:true', "")
        seamless = " seamless ";
        onload = "onload=\"this.style.height=this.contentDocument.body.scrollHeight +'px';\""
    }
    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle= ijfUtils.replaceKeyValues(tPt[0],item);
    }

    var urlRe = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
    // url regex from https://gist.github.com/dperini/729294 under MIT license
    var iframeSrc = "http://www.google.com" // Default src
    if (inField.dataSource){
        iframeSrc = ijfUtils.replaceKeyValues(inField.dataSource,item);
        //if (iframeSrc.trim().match(urlRe)) iframeSrc = iframeSrc.trim().match(urlRe)
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	//end permissions

	if(rOnly) l_fieldStyle += ";pointer-events: none;";

    var iframeHTML = "<iframe src=\"" + iframeSrc + "\" " + seamless + onload + "style=\"" + l_fieldStyle + "\"></iframe>";
    var pHeight =ijfUtils.getNameValueFromStyleString(inField.fieldStyle,"height");
    var simple = new Ext.Panel({
        //labelAlign: 'left',
        collapsible: collapsible,
        collapsed: collapsed,
        title: panelTitle,
        bodyStyle: l_panelStyle,
        //width:lWidth,
        //height: pHeight,
        border:false,
        hidden: hideField,
        html: iframeHTML,
        scrollable: true
    });

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

}
,
 renderNestedForm:function(inFormKey,item, inField, inContainer)
{

    var nestedFormKey = inField.dataSource;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);
    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }
    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle= ijfUtils.replaceKeyValues(tPt[0],item);
    }
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

	//context item might change for call  save these...
	var tempJiraMeta = ijf.jiraMeta;
	var tempJiraMetaKeyed =	ijf.jiraMetaKeyed;


    if(collapsible)
    {
		var l_labelStyle = inField.labelStyle;
		var l_panelStyle = inField.panelStyle;
		var l_Style = inField.style;

		if(!l_labelStyle) l_labelStyle="background:transparent";
		if(!l_panelStyle) l_panelStyle="background:transparent";
		if(!l_Style) l_Style="background:transparent";

        if(inField.dataReference)
        {
            try
            {
                ijf.main.gSubformParams = JSON.parse(inField.dataReference);
            }
            catch(e)
            {
                footLog("Error with nested form paramMap");
                ijf.main.gSubformParams = null;
            }
        }
        var nfId = inFormKey+inField.formCell.replace(/,/g,"")+"_nest";
        var nfContainer = "<div id=\"" + nfId + "\">Initial</div>";
        var simple = new Ext.Panel({
            //labelAlign: 'left',
            collapsible: collapsible,
            collapsed: collapsed,
            title: panelTitle,
            style: l_Style,
            bodyStyle: l_panelStyle,
            border:true,
            hidden: hideField,
            html: nfContainer,
            scrollable: true
        });
		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

        simple.render(inContainer);
		var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
		ijf.main.controlSet[thisControl.id]=thisControl;
		ijf.main.renderForm(nfId, inField.dataSource, true, item);
	    //after render....
	    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

		if((collapsible) && (!collapsed))
		{
			simple.collapse(true);
			//collapse exap
			var closePanel = function()
			{
				if(!simple.collapsed) simple.collapse(true);
			}
			var openPanel = function()
			{
				if(simple.collapsed) simple.expand(true);
			}

			window.setTimeout(closePanel,40);
			window.setTimeout(openPanel,400);

		}
    }
    else
    {
		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](null,inFormKey,item, inField, inContainer);

		if(hideField)
		{
			//set style of target div to be visibility hidden
			inContainer.style.visibility="hidden";
		}

        //if(!hideField)
        ijf.main.renderForm(inContainer.id.replace(",",""), inField.dataSource, true, item);
	    //after render....
	    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](null, inFormKey,item, inField, inContainer);

    }
    //reset context meta...
    ijf.jiraMeta= tempJiraMeta;
	ijf.jiraMetaKeyed= tempJiraMetaKeyed;
    ijf.main.gSubformParams=null;
}
,
renderPopupForm:function(inFormKey,inItem, inAction)
{
    var nfId = inFormKey+inAction.inField.formCell.replace(/,/g,"")+"_pop";
    var nfContainer = "<div id=\"" + nfId + "\">Initial</div>";
    var rItem = inItem;

    //get form and use to set the dWin params
    var pForm = ijf.fw.forms[inAction.form];

    (pForm.settings.tabTitle) ? null: pForm.settings.tabTitle="No title set";
    (pForm.settings.outerContainerStyle) ? null: pForm.settings.outerContainerStyle="";
    (pForm.settings.innerContainerStyle) ? null: pForm.settings.innerContainerStyle="";

    var wWidth = ijfUtils.getNameValueFromStyleString(pForm.settings.outerContainerStyle,'width');
	(wWidth=="") ? wWidth=300: wWidth=wWidth.replace("px","").replace("%","")/1;

    var wHeight = ijfUtils.getNameValueFromStyleString(pForm.settings.outerContainerStyle,'height');
	(wHeight=="") ? wHeight=300: wHeight=wHeight.replace("px","").replace("%","")/1;

    var iWidth = ijfUtils.getNameValueFromStyleString(pForm.settings.outerTableStyle,'width');
	(iWidth=="") ? iWidth=300: iWidth=iWidth.replace("px","").replace("%","")/1;

    var iHeight = ijfUtils.getNameValueFromStyleString(pForm.settings.outerTableStyle,'height');
	(iHeight=="") ? iHeight=300: iHeight=iHeight.replace("px","").replace("%","")/1;


    var simple = new Ext.Panel({
        //bodyStyle: inAction.fieldStyle,
        width: iWidth,
        height: iHeight,
        style: pForm.innerContainerStyle,
        border:true,
        html: nfContainer
    });

    var tempItem = ijf.currentItem;
    var tempItemId = ijf.main.itemId;
    ijf.main.parentItemId =null;
    var popType="";
    if(inAction.type) popType=inAction.type;
    //some someforms need parents to complete, saved here
	switch(popType)
	{
		case "new related":
		   	ijf.main.itemId = null;
		   	ijf.currentItem =  null;
		   	rItem=null;
		   	break;
		case "new subtask":
			ijf.main.parentItemId = ijf.main.itemId;
		   	ijf.main.itemId = null;
		   	ijf.currentItem =  null;
		   	rItem=null;
		   	break;
		case "open item":
		   	ijf.main.itemId = inAction.itemId;  //the one to pop to...
		   	rItem= ijfUtils.getJiraIssueSync(ijf.main.itemId);
		   	//ijf.currentItem =  null;
		   	break;
		default:
			break;
	}

    var wTitle = ijfUtils.replaceKeyValues(pForm.settings.tabTitle, rItem);

    var dWin = new Ext.Window({
        // layout: 'fit',
        title:  wTitle,
        width: wWidth,
        height: wHeight,
        style: pForm.outerContainerStyle,
        scrollable: "vertical",
        closable: true,
        items: [simple],
        modal: true,
        listeners:{
            beforedestroy: function(f)
            {
				switch(popType)
				{
					case "new related":
					//ijf.main.itemId = the new key, and tempItemId is the OLD key.  set the 'relationship'
					    //verify both Keys exist and are different...
					    if((tempItemId) &&(ijf.main.itemId) &&(ijf.main.itemId!=tempItemId))
					    {
							var jsonString = {
											"type": {
												"name": "Relates"
											   },
											"inwardIssue": {
												"key": tempItemId
											   },
											"outwardIssue": {
												"key": ijf.main.itemId
											   },
											"comment":{
												"body":"Linked related issue"
											  }
							};
							var saveRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
							if(saveRes!="OK")
							{
								ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
							}
						}
						break;
					default:
						break;
				}

                //rerender the current form....
                ijf.currentItem = null; //tempItem;
                ijf.main.itemId = tempItemId;
				ijf.main.processSetup("ijfContent");
                //ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, tempItem);
            }
        }
    });
    dWin.show();
    dWin.setY(window.pageYOffset+150);

    ijf.main.gPopupFormHandle = dWin;
    //need to force the render to get metadata for the new thing, null out the meta...
    ijf.jiraMeta=null;
    ijf.main.renderForm(nfId, inAction.form, true, rItem);
},
renderCommentList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var outHtml = "";
    if(item.fields.comment.comments)
    {
		//sort desc
		var sortedCmnts = item.fields.comment.comments.sort(function(a, b)
		{
			a = new Date(a.created);
		    b = new Date(b.created);
		    return a>b ? -1 : a<b ? 1 : 0;
		});
		outHtml="<div class=ijfCommentList>";
			outHtml += "<div  class=ijfCommentListHead><div class=ijfCommentListHeadName>Comment</div><div class=ijfCommentListHeadAuthor>Author</div><div class=ijfCommentListHeadDate>Date</div></div>";
		outHtml = sortedCmnts.reduce(function(outHtml,a){
			outHtml += "<div class=ijfCommentListRow><div  class=ijfCommentListName>" + a.body.replace(/\n/g,"<br>") + "</div><div class=ijfCommentListAuthor>" + a.author.displayName + "</div><div class=ijfCommentListDate>" + moment(a.created).format('ll') + "<br>" + moment(a.created).format('LT') +"</div></div>";
			return outHtml;
		},outHtml);
		outHtml+="</div>";
	}

    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    //height:
	var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
	if(l_Height=="")
	{
		l_Height=300;
	}
	else
	{
		l_Height = l_Height.replace("px","").replace("%","")/1;
	}

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            height:l_Height,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);
}
,
renderHistoryList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var outHtml = "";

    //get item history....

    if(!item.changelog)
    {
	    var tItem = ijfUtils.jiraApiSync("GET","/rest/api/2/issue/" + item.key + "?expand=changelog",null);
	    item.changelog = tItem.changelog;
	}

    if(item.changelog.histories)
    {
		//sort desc
		var sortedLogs = item.changelog.histories.sort(function(a, b)
		{
			a = new Date(a.created);
		    b = new Date(b.created);
		    return a>b ? -1 : a<b ? 1 : 0;
		});
		outHtml="<div class=ijfCommentList>";
			outHtml += "<div  class=ijfCommentListHead><div class=ijfCommentListHeadName>Change</div><div class=ijfCommentListHeadAuthor>Author</div><div class=ijfCommentListHeadDate>Date</div></div>";
		outHtml = sortedLogs.reduce(function(outHtml,a){

			var outChange = a.items.reduce(function(oStr,i){
				oStr += "<b>Field:</b> " + i.field;
				oStr += "<br>&nbsp;&nbsp;&nbsp;<b>From Value:</b> " + i.fromString;
				oStr += "<br>&nbsp;&nbsp;&nbsp;<b>To Value:</b> " + i.toString;
				oStr += "<br><br>";
				return oStr;
			},"");

			outHtml += "<div class=ijfCommentListRow><div  class=ijfCommentListName>" + outChange.replace(/\n/g,"<br>") + "</div><div class=ijfCommentListAuthor>" + a.author.displayName + "</div><div class=ijfCommentListDate>" + moment(a.created).format('ll') + "<br>" + moment(a.created).format('LT') +"</div></div>";
			return outHtml;
		},outHtml);
		outHtml+="</div>";
	}

    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    //height:
	var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
	if(l_Height=="")
	{
		l_Height=300;
	}
	else
	{
		l_Height = l_Height.replace("px","").replace("%","")/1;
	}

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            height:l_Height,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);
},
renderAttchmentList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";

	//sort desc
	var sortedAttachments = item.fields.attachment.sort(function(a, b)
	{
		a = new Date(a.created);
		b = new Date(b.created);
		return a>b ? -1 : a<b ? 1 : 0;
	});

    if(inField.dataReference)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(f.filename.indexOf(inField.dataReference)>-1) inArray.push(f);
			return inArray;
		},[]);
	}

    if(inField.referenceFilter)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(inField.referenceFilter.indexOf(f.filename)>-1) return inArray;
			inArray.push(f);
			return inArray;
		},[]);
	}

    var outHtml = "<div class=ijfAttachList>";
		outHtml += "<div  class=ijfAttachListHead><div class=ijfAttachListHeadName>Name</div><div class=ijfAttachListHeadAuthor>Author</div><div class=ijfAttachListHeadDate>Date</div></div>";
    outHtml = sortedAttachments.reduce(function(outHtml,a){
		outHtml += "<div class=ijfAttachListRow><div  class=ijfAttachListName><a href='"+a.content+"' target='_blank'>" + a.filename + "</a></div><div class=ijfAttachListAuthor>" + a.author.displayName + "</div><div class=ijfAttachListDate>" + moment(a.created).format('lll') + "</div></div>";
		return outHtml;
	},outHtml);
	outHtml+="</div>";


    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl, inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

},
renderAttchmentListGrid:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;

	//sort desc
	var sortedAttachments = item.fields.attachment.sort(function(a, b)
	{
		a = new Date(a.created);
		b = new Date(b.created);
		return a>b ? -1 : a<b ? 1 : 0;
	});

    /*if(inField.dataReference)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(f.filename.indexOf(inField.dataReference)>-1) inArray.push(f);
			return inArray;
		},[]);
	}*/

    if(inField.referenceFilter)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(inField.referenceFilter.indexOf(f.filename)>-1) return inArray;
			inArray.push(f);
			return inArray;
		},[]);
	}

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var hideField = ijfUtils.renderIfShowField("",inField);
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (l_fieldStyle.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var canDelete = false;
    if (l_fieldStyle.indexOf('delete:true')>-1)
    {
        canDelete=true;
    }
	if(!perms.canEdit) canDelete=false;


	var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
    	l_Width = l_Width.replace("px","")/1;
	}

    var listColumns = [];
    var tFields = [];

    tFields.push({name: "fileid", type: 'string'});
	listColumns.push({
			header: "FID",
			sortable: true,
			hidden: true,
			width: '1%',
			dataIndex: "fileid"
	});

    tFields.push({name: "filename", type: 'string'});
	listColumns.push({
			header: "File",
			sortable: true,
			hidden: false,
			flex: 70,
			dataIndex: "filename",
			filter: {
				type: 'string'
			}
	});

    tFields.push({name: "fUser", type: 'string'});
	listColumns.push({
			header: "User",
			sortable: true,
			hidden: false,
			flex: 30,
			dataIndex: "fUser",
			filter: {
				type: 'string'
			}
	});

	tFields.push({name: "created", type: 'date'});
	listColumns.push({
			header: "Date",
			sortable: true,
			hidden: false,
			xtype: 'datecolumn',
			formatter:'date("m/d/y h:i:s A")',
			width: 150,
			dataIndex: "created",
			filter: {
				type: 'date'
				}
	});
	if(canDelete)
	{
		listColumns.push({xtype: 'actioncolumn',
			  header: "Action",
			  width: 70,
			  items: [{icon: '' },{
					icon: '/download/resources/com.idealfed.poc.idealforms:jiraforms-resources5/images/tree/drop-no.png',
					handler: function(grid, rowIndex, colIndex, itm) {
						  try
						  {
							  var fileId = grid.store.getData().items[rowIndex].data["fileid"];
							  //function to delete and remove the record....
							  var removeFile = function()
							  {
								   var delRes = ijfUtils.jiraApiSync("DELETE","/rest/api/2/attachment/"+fileId,null);
								   if(delRes!="OK")
								   {
										ijfUtils.modalDialogMessage("Error","Unable to delete the file: " + delRes);
										return;
								   }
								  //remove the row from the grid....
								  grid.getStore().removeAt(rowIndex);
								  return;
							  }
							  ijfUtils.modalDialog("Warning","You are about to permanently remove this file. Note, to see changes in other files lists on this page you must refresh the page. continue?",removeFile);
						  }
						  catch(e)
						  {
							  footLog("Failed delete action ");
						  }
					}
				}]
	  	});
    }

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    var gridStore = new Ext.data.Store({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")
    });
    var fArray = sortedAttachments.map(function(a){
		    return {"fileid":a.id,"created":a.created,"filename":a.filename + " <a href='"+a.content+"' target='_blank'>open</a>","fUser":a.author.displayName};
	});
	gridStore.loadData(fArray);


    var gridPanel = new Ext.grid.GridPanel({
		 title:  inField.caption,
		 style: l_Style,
		 hidden: hideField,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
        store: gridStore,
        width:l_Width,
        plugins: 'gridfilters',
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed
    });
	//gridStore.parentGridPanel = gridPanel;

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](gridPanel, inFormKey,item, inField, inContainer);
    gridPanel.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, gridPanel, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](gridPanel, inFormKey,item, inField, inContainer);

},
renderAttachmentListTree:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;

   //look for file attributes
	var thisT = null;
	var indexedData = null;

	if(inField.dataSource)
	{
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT)
		{
			ijfUtils.footLog("Unable to get file att spec from  " + inField.dataSource);
		}else
		{
			var jfFieldMeta = ijf.jiraMetaKeyed[thisT.fieldName];
			var jfFieldDef = ijf.jiraFieldsKeyed[thisT.fieldName];
			var jf=item.fields[jfFieldDef.id];
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
			if(data)
			{
				data = JSON.parse(data);
				indexedData=[];
				data.forEach(function(r){indexedData[r.fileid]=r});
			}
		}
	}



	//sort asc by TITILE + date
	var sortedAttachments = item.fields.attachment.sort(function(a, b)
	{
		a = a.filename + moment(a.created).format('YYYY-MM-DD HH:mm:ss');
		b = b.filename + moment(b.created).format('YYYY-MM-DD HH:mm:ss');
		return a>b ? -1 : a<b ? 1 : 0;
	});

    if(inField.referenceFilter)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(inField.referenceFilter.indexOf(f.filename)>-1) return inArray;
			inArray.push(f);
			return inArray;
		},[]);
	}

	//these are sorted by title, the FIRST title is NOT a leaf...
	// if it has children they are next and leaf with parent...
	var lastName = "";
	var parentId = "";
	var lastObj = {};

    var fArray = sortedAttachments.map(function(a){
			    var retObj =  {"fileid":a.id,"created":a.created,"rawFileName":a.filename,"filename":"<a href='"+a.content+"' target='_blank'>"+a.filename +"</a>","fUser":a.author.displayName};

			    //add data if exists
			    if(indexedData)
			    {
					if(indexedData.hasOwnProperty(a.id))
					{
						//add all the attributes to this record...
						var fileAtts = indexedData[a.id];
						Object.keys(fileAtts).forEach(function(a){
							if(a=="fildid") return;
							retObj[a]=fileAtts[a];
						});
					}
				}

			    //is it leaf?  is it parent....
			    retObj.leaf=false;
			    if(a.filename==lastName)
			    {
					//this is a child....
				    retObj.leaf=true;
				    retObj.moved=true;
					lastObj.children.push(retObj);
				}
				else
				{
					retObj.children=[];
					lastObj=retObj;
				}
				lastName = a.filename;
			    return retObj;
	});
	fArray = fArray.reduce(function(inArray,i){
			if(i.moved) return inArray;
			inArray.push(i);
			return inArray;
		},[]);

   //end data prep


    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var hideField = ijfUtils.renderIfShowField("",inField);
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

	  //special for read only (hide the delete if there....
	    var userIsReadOnly = false;
  		var tempFieldMeta = ijf.jiraMetaKeyed["Summary"];
  		if(tempFieldMeta)	if(!tempFieldMeta.operations) userIsReadOnly=true;

	//end permissions

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (l_fieldStyle.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var canDelete = false;
    if (l_fieldStyle.indexOf('delete:true')>-1)
    {
        canDelete=true;
    }

    if (l_fieldStyle.indexOf('readonly:true')>-1)
    {
        userIsReadOnly=true;
    }


	if(!perms.canSee) canDelete=false;
    if(userIsReadOnly)  canDelete=false;

	var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
    	l_Width = l_Width.replace("px","")/1;
	}

    var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

	var thisColWidth = 120;
	var thisColHeader = "";

    //base columns
    var listColumns = [];
    var tFields = [];
    var colObj = {};
    var cIndex=0;


    tFields.push({name: "fileid", type: 'string'});
	listColumns.push({
			header: "FID",
			sortable: true,
			hidden: true,
			width: 10,
			dataIndex: "fileid"
	});


	thisColHeader = "File";
	if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
    tFields.push({name: "filename", type: 'string'});
	colObj={
			xtype: 'treecolumn',
			header: thisColHeader,
			sortable: true,
			hidden: false,
			dataIndex: "filename",
			filter: {
				type: 'string'
			},
			sorter: function(a,b){
				var a = a.data.rawFileName;
				var b = b.data.rawFileName;
				return a>b ? -1 : a<b ? 1 : 0;
			}
	};
	ijfUtils.setColWidth(colObj,cIndex,colWidths,"70%");
    listColumns.push(colObj);
	cIndex++;

	thisColHeader = "User";
	if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
    tFields.push({name: "fUser", type: 'string'});
	colObj={
			header: thisColHeader,
			sortable: true,
			hidden: false,
			dataIndex: "fUser",
			filter: {
				type: 'list'
			}
	};
	ijfUtils.setColWidth(colObj,cIndex,colWidths,"30%");
    listColumns.push(colObj);
	cIndex++;

    if(ijfUtils.detectIE())
    {
		thisColHeader = "Date";
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
		tFields.push({name: "created", type: 'string'});
		colObj={
				header: thisColHeader,
				sortable: true,
				hidden: false,
				renderer: function(inVal){return moment(inVal).format('lll');},
				dataIndex: "created",
				filter: {
					type: 'string'
					}
		};
	}
	else
	{
		thisColHeader = "Date";
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
		tFields.push({name: "created", type: 'date'});
		colObj={
				header: thisColHeader,
				sortable: true,
				hidden: false,
				xtype: 'datecolumn',
				formatter:'date("m/d/y h:i:s A")',
				dataIndex: "created",
				filter: {
					type: 'date'
					}
		};
	}

	ijfUtils.setColWidth(colObj,cIndex,colWidths,150);
    listColumns.push(colObj);
	cIndex++;


	//section for custom attributes...
	var gCols=null;
	if(thisT)
	{
		//lazy load handling for custom types
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}


	    gCols = JSON.parse(thisT.settings);
	    //order by order
	    gCols = gCols.sort(function(a,b){return (a.order-b.order);});
		var cIndex = 0;
		var lookups = [];
		gCols.forEach(function(col)
		{

			var lValidator = function(v){return true};
			if((col.regEx!=null) && (col.regEx!=""))
			{
				lValidator = function(v)
				{
					var rgx = new RegExp(col.regEx);
					if (!rgx.exec(v)) {
						return col.regExMess;
					}
					return true;
				}
			}

            var validRenderer = function (val, meta, rec, rowIndex, colIndex, store) {
					//at this poing you have the column def, if required or regex fails, make pink

					if((col.required=="Yes") && (!val))
					{
						meta.style = "background-color:pink;";
					}
					if((col.regEx!=null) && (col.regEx!=""))
					{
						var rgxRenderCheck = new RegExp(col.regEx);
						if (!rgxRenderCheck.exec(val)) {
							meta.style = "background-color:pink;";
						}
					}

				//now manage the value formatting....
				switch(col.controlType)
				{
					case "datefield":
						return Ext.util.Format.dateRenderer(col.format)(val); //moment(val).format(col.format);
						break;
					case "combobox":
						//if value lookup is two dimensional, lookup value of val...
						var retVal = val;
						if(lookups[col.columnName])
						{
							var lLookup = lookups[col.columnName];
							if(lLookup)
							{
								if((typeof lLookup[0]) == "object") lLookup.forEach(function(r){if(r[0]==val) retVal=r[1];});
							}
						}
						return retVal;
						break;
					case "numberfield":
						if(col.format) return Ext.util.Format.numberRenderer(col.format)(val); //moment(val).format(col.format);
						return val;
						break;
					default:
						return val;
				}
			}

			//create columns for each type....
			thisColHeader = col.columnName;
			if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
			switch(col.controlType)
			{
				case "datefield":
						tFields.push({name: col.columnName, type: 'date'});
						if(col.format==null) col.format = 'm/d/Y';
						if(col.format=="") col.format = 'm/d/Y';
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								xtype: 'datecolumn',
								renderer: validRenderer,
								ijfColumn: col,
								width: thisColWidth,
								dataIndex: col.columnName,
								filter: {
									type: 'date'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										format:col.format,
										readOnly:userIsReadOnly,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											}
										}
									}
								}
				};
				break;
				case "numberfield":
						tFields.push({name: col.columnName, type: 'number'});
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								xtype: 'numbercolumn',
								renderer: validRenderer,
								align: 'end',
								width: thisColWidth,
								dataIndex: col.columnName,
								filter: {
									type: 'number'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										format:col.format,
										readOnly:userIsReadOnly,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											}
										}
									}
								}
				};
				break;
				case "checkbox":
					tFields.push({name: col.columnName, type: 'boolean'});
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							xtype: 'checkcolumn',
							centered:true,
							readOnly:userIsReadOnly,
							//renderer: validRenderer,
							width: thisColWidth,
							dataIndex: col.columnName,
							listeners: {
								checkchange: function(n,o,f)
								{
									ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
								}
							}
				};
				break;
				case "combobox":
						tFields.push({name: col.columnName, type: 'string'});
						//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
						var cLookupDef = {"index":"0"};
						var cListener = {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											},
											focus: function(){
												this.validate();
											}
										};
						if(ijf.fw.CustomTypes.reduce(function(inObj,t){if(t.name==col.reference) inObj=t; return inObj;},null))
						{
							lookups[col.columnName] = ijfUtils.getReferenceDataByName(col.reference,"0");
						}
						else
						{
							//complex cascade...
							try
							{
								cLookupDef = JSON.parse(col.reference);
								lookups[col.columnName] = ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index);

								//establish a listener for this combo if necessary
								if(cLookupDef.parents)
								{
									var parentIds = cLookupDef.parents;
									var cFilters = parentIds.reduce(function(inFilter,p){
											inFilter.push({"property":p.dataIndex.toString(), "value":"tbd", "columnName":p.columnName});
											return inFilter;
										},[]);
									cListener["beforeQuery"] = function(query) {
												var cContainer = this.up();
												//cFilters["value"]= cValue;
												cFilters.forEach(function(f){
													//for each filter param, we need to get the correct value...
													var cValue = cContainer.grid.getSelectionModel().getSelected().items[0].data[f.columnName];
													if(!cValue) cValue = 'novaluetofilterwith';
													f.value=cValue;
												});
												this.store.clearFilter();
												this.store.filter(cFilters);
											};
								}

								//for each child, you need to clear it's value
								if(cLookupDef.children)
								{
									var childFields = cLookupDef.children;
									cListener["change"]= function(n,o,f)
									{
											var cContainer = this.up();
											childFields.forEach(function(f){
												cContainer.grid.getSelectionModel().getSelected().items[0].set(f,null);
											});
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
									};
								}

							}
							catch(le)
							{
								ijfUtils.footLog("failed to handle complex lookup: " + le.message);
								lookups[col.columnName] = [];
							}
						}
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								width: thisColWidth,
								dataIndex: col.columnName,
								renderer: validRenderer,
								filter: {
									type: 'list'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										forceSelection: true,
										readOnly:userIsReadOnly,
										store: lookups[col.columnName],
										lookupDef: cLookupDef,
										displayField: cLookupDef.index,
										valueField: cLookupDef.index,
										//triggerAction: 'all',
										//mode: 'local',
										//lastQuery: '',
										listeners: cListener
									}
								}
				};
				break;
				default:
						tFields.push({name: col.columnName, type: 'string'});

						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								width: thisColWidth,
								dataIndex: col.columnName,
								renderer: validRenderer,
								filter: {
									type: 'string'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										readOnly:userIsReadOnly,
										validator: lValidator,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											},
											focus: function(){
												this.validate();
											}
										}
									}
								}
				};
			}

			ijfUtils.setColWidth(colObj,cIndex,colWidths,150);
		    listColumns.push(colObj);

			cIndex++;

		});

	}


	//adding can Delete at END
	if(canDelete)
	{
		listColumns.push({xtype: 'actioncolumn',
			  header: "Action",
			  width: 70,
			  items: [{icon: '' },{
					icon: '/download/resources/com.idealfed.poc.idealforms:jiraforms-resources5/images/tree/drop-no.png',
					handler: function(grid, rowIndex, colIndex, itm) {
						  try
						  {
							  var fileId = grid.getStore().getData().items[rowIndex].data["fileid"];
							  //function to delete and remove the record....
							  var removeFile = function()
							  {
								   var delRes = ijfUtils.jiraApiSync("DELETE","/rest/api/2/attachment/"+fileId,null);
								   if(delRes!="OK")
								   {
										ijfUtils.modalDialogMessage("Error","Unable to delete the file: " + delRes);
										return;
								   }
								  //remove the row from the grid....
								  var rec = grid.getStore().getData().items[rowIndex];
								  if(rec.childNodes)
								  {
									  var cIndex = rec.parentNode.indexOf(rec);
									  if(rec.childNodes.length>0)
									  {
									  //FIRST one is now the parent....
										  var newSet = [];
										  var newRootFile = rec.childNodes[0];
										  newRootFile.leaf=false;
										  for(var i=1;i<rec.childNodes.length;i++)
										  {
											  newRootFile.insertChild((i-1),rec.childNodes[i]);
										  }
										  //add to the tree root
  									      rec.parentNode.insertChild(cIndex,newRootFile);
								  	  }
								  }
								  rec.parentNode.removeChild(rec);
								  return;
							  }
							  ijfUtils.modalDialog("Warning","You are about to permanently remove this file. Note, to see changes in other files lists on this page you must refresh the page. continue?",removeFile);
						  }
						  catch(e)
						  {
							  footLog("Failed delete action ");
						  }
					}
				}]
	  	});
    }


    //adding concept of post filter to transform the data...
    if(inField.referenceFilter)
    {
        //filter the items...
        if(ijf.snippets.hasOwnProperty(inField.referenceFilter))
	        fArray = ijf.snippets[inField.referenceFilter](fArray);
    }

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    var gridStore = new Ext.data.TreeStore({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"),
        root: {
		 	expanded:false,
		 	children: fArray
		}
    });
	//gridStore.loadData(fArray);

	var headerButtons =[];
	if(!userIsReadOnly)
	{
		if(thisT)
		{
			headerButtons.push({
							xtype:'button',
							text: 'Save',
							handler: function(){
								 //create record...
								var u1=this.up(); //header
								var u2=u1.up(); //grid
								try
								{
									u2.editingPlugin.completeEdit();
								}
								catch(e){}

								var onSuccessSave = function()
								{
									ijfUtils.hideProgress();
									if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
									ijf.main.setAllClean();
									ijf.main.resetForm();
								};
								Ext.getBody().mask("Saving...");
								var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,inField.form,item)};
								window.setTimeout(saveIt,50);
							}
						});
		}
	}

    var gridPanel = new Ext.tree.Panel({
		 header:{
				titlePosition: 0,
				items: headerButtons
		},
		 title:  inField.caption,
		 style: l_Style,
		 hidden: hideField,
		 useArrows: true,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
        store: gridStore,
         rootVisible: false,
        width:l_Width,
        plugins: ['gridfilters',{
			ptype: 'cellediting',
			clicksToEdit: 1
        }],
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed

    });
	//gridStore.parentGridPanel = gridPanel;


/*

		//this is pretty much a repeat of render cell, check required and regex for every value....
		gridPanel.items.items[0].isValid = function(){
	        var retVal = true;
			var gridData = gridStore.getData();
			//look for bad data and return false...
			gridData.items.forEach(function(r){
				//r = object of a row of data, keys are the columnNames
				gCols.forEach(function(col){
					var rowVal = r.data[col.columnName];
					//validate...
						if((col.required=="Yes") && (!rowVal)) retVal= false;
						if((col.regEx!=null) && (col.regEx!=""))
						{
							var rgxRenderCheck = new RegExp(col.regEx);
							if (!rgxRenderCheck.exec(rowVal)) retVal= false;
						}
				});
			});
			return retVal;
	};
*/


	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](gridPanel, inFormKey,item, inField, inContainer);
    gridPanel.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, gridPanel, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](gridPanel, inFormKey,item, inField, inContainer);

},
renderAttachmentSPTree:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;

   //look for file attributes
	var thisT = null;
	var indexedData = null;

	if(inField.dataSource)
	{
		for(var tF in ijf.fw.CustomTypes){
			if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
		}
		if(!thisT)
		{
			ijfUtils.footLog("Unable to get file att spec from  " + inField.dataSource);
		}else
		{
			var jfFieldMeta = ijf.jiraMetaKeyed[thisT.fieldName];
			var jfFieldDef = ijf.jiraFieldsKeyed[thisT.fieldName];
			var jf=item.fields[jfFieldDef.id];
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
			if(data)
			{
				data = JSON.parse(data);
				indexedData=[];
				data.forEach(function(r){indexedData[r.fileid]=r});
			}
		}
	}

    var sortedAttachments = [];

	//This is the API call to SP to get the document listings......

	//var msaUserId="O001969";
	var msaIssueKey = ijf.currentItem.key;
	if(inField.dataSource=="parentFiles") msaIssueKey = ijf.currentItem.fields.parent.key;
	if(inField.event) msaIssueKey = ijf.snippets[inField.event]();
	//msaIssueKey = "ISSUE-3";


    var sharePointFiles = ijfUtils.getSharepointIssueFiles(msaIssueKey);

    if(sharePointFiles.status=="success")
    {
		//setup sortedAttachments....
		try
		{
			sortedAttachments = sharePointFiles.result.items.sort(function(a, b)
			{
				a = moment(a.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
				b = moment(b.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
				return a>b ? -1 : a<b ? 1 : 0;
			});
		}
		catch(fe)
		{
	     	ijfUtils.footLog("Error parsing SP attachments: " + fe.message);
		}
	}
	else
	{
		//either null or error occured....write to footlog the message:
		ijfUtils.footLog("Error with SP attachments: " + sharePointFiles.message);
	}


    if(inField.referenceFilter)
    {
		//filter out any occurence of the CSV list...
		sortedAttachments = sortedAttachments.reduce(function(inArray, f)
		{
			if(inField.referenceFilter.indexOf(f.FileName)>-1) return inArray;
			inArray.push(f);
			return inArray;
		},[]);
	}

	//these are sorted by title, the FIRST title is NOT a leaf...
	// if it has children they are next and leaf with parent...
	var lastName = "";
	var parentId = "";
	var lastObj = {};

    var fArray = sortedAttachments.map(function(a){

		        var fStatus = "";
		        if(a.Status) if(a.Status.checkedOutBy) if(a.Status.checkedOutBy.fullName) fStatus="Checked Out";

                var primaryLink = a.DownloadUrl;
                if(a.EditInAppUrl) primaryLink=a.EditInAppUrl;
                var target="";
                var lowerFileName = a.FileName.toLowerCase();
                if(lowerFileName.indexOf(".pdf")>-1) target=" target='_blank' ";
                if(lowerFileName.indexOf(".txt")>-1) target=" target='_blank' ";
				if(lowerFileName.indexOf(".htm")>-1) target=" target='_blank' ";

			    var retObj =  {"fileid":a.UniqueId,"created":a.CreatedDate,"rawFileName":a.FileName,"filename":"<a "+target+"href='"+primaryLink+"'>"+a.FileName +"</a>","fUser":a.CreatedByName,"fStatus":fStatus};
                retObj.id = window.location.hostname.split(".")[0] + "," + msaIssueKey + "," + a.FileName;
                retObj.raw = a;
			    //add data if exists
			    if(indexedData)
			    {
					if(indexedData.hasOwnProperty(a.UniqueId))
					{
						//add all the attributes to this record...
						var fileAtts = indexedData[a.UniqueId];
						Object.keys(fileAtts).forEach(function(a){
							if(a=="fildid") return;
							retObj[a]=fileAtts[a];
						});
					}
				}
			    //is it leaf?  is it parent....
			    retObj.leaf=false;

			    return retObj;
	});

    //lastly alter file list if necessary
	if(ijf.snippets.hasOwnProperty(inField.referenceFilter)) fArray = ijf.snippets[inField.referenceFilter](fArray);



   //end data prep


    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var hideField = ijfUtils.renderIfShowField("",inField);
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
        canDelete=false;
    }

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (l_fieldStyle.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var canDelete = false;
    if (l_fieldStyle.indexOf('delete:true')>-1)
    {
        canDelete=true;
    }
	if(!perms.canEdit){
		canDelete=false;
		rOnly=true;
	}


	var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
    	l_Width = l_Width.replace("px","")/1;
	}

    var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

	var thisColWidth = 120;
	var thisColHeader = "";

    //base columns
    var listColumns = [];
    var tFields = [];
    var colObj = {};
    var cIndex=0;


    tFields.push({name: "fileid", type: 'string'});
	listColumns.push({
			header: "FID",
			sortable: true,
			hidden: true,
			width: 10,
			dataIndex: "fileid"
	});


	thisColHeader = "File";
	if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
    tFields.push({name: "filename", type: 'string'});
	colObj={
			xtype: 'treecolumn',
			header: thisColHeader,
			sortable: true,
			hidden: false,
			dataIndex: "filename",
			filter: {
				type: 'string'
			},
			sorter: function(a,b){
				var a = a.data.rawFileName;
				var b = b.data.rawFileName;
				return a>b ? -1 : a<b ? 1 : 0;
			}
	};
	ijfUtils.setColWidth(colObj,cIndex,colWidths,"70%");
    listColumns.push(colObj);
	cIndex++;

	thisColHeader = "User";
	if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
    tFields.push({name: "fUser", type: 'string'});
	colObj={
			header: thisColHeader,
			sortable: true,
			hidden: false,
			dataIndex: "fUser",
			filter: {
				type: 'list'
			}
	};
	ijfUtils.setColWidth(colObj,cIndex,colWidths,"30%");
    listColumns.push(colObj);
	cIndex++;

	thisColHeader = "Status";
	if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
    tFields.push({name: "fUser", type: 'string'});
	colObj={
			header: thisColHeader,
			sortable: true,
			hidden: false,
			dataIndex: "fStatus",
			filter: {
				type: 'list'
			}
	};
	ijfUtils.setColWidth(colObj,cIndex,colWidths,"30%");
    listColumns.push(colObj);
	cIndex++;


    if(ijfUtils.detectIE())
    {
		thisColHeader = "Date";
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
		tFields.push({name: "created", type: 'string'});
		colObj={
				header: thisColHeader,
				sortable: true,
				hidden: false,
				renderer: function(inVal){return moment(inVal).format('lll');},
				dataIndex: "created",
				filter: {
					type: 'string'
					}
		};
	}
	else
	{
		thisColHeader = "Date";
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
		tFields.push({name: "created", type: 'date'});
		colObj={
				header: thisColHeader,
				sortable: true,
				hidden: false,
				xtype: 'datecolumn',
				formatter:'date("m/d/y h:i:s A")',
				dataIndex: "created",
				filter: {
					type: 'date'
					}
		};
	}

	ijfUtils.setColWidth(colObj,cIndex,colWidths,150);
    listColumns.push(colObj);
	cIndex++;


	//section for custom attributes...
	var gCols=null;
	if(thisT)
	{
		//lazy load handling for custom types
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}


	    gCols = JSON.parse(thisT.settings);
	    //order by order
	    gCols = gCols.sort(function(a,b){return (a.order-b.order);});
		var cIndex = 0;
		var lookups = [];
		gCols.forEach(function(col)
		{

			var lValidator = function(v){return true};
			if((col.regEx!=null) && (col.regEx!=""))
			{
				lValidator = function(v)
				{
					var rgx = new RegExp(col.regEx);
					if (!rgx.exec(v)) {
						return col.regExMess;
					}
					return true;
				}
			}

            var validRenderer = function (val, meta, rec, rowIndex, colIndex, store) {
					//at this poing you have the column def, if required or regex fails, make pink

					if((col.required=="Yes") && (!val))
					{
						meta.style = "background-color:pink;";
					}
					if((col.regEx!=null) && (col.regEx!=""))
					{
						var rgxRenderCheck = new RegExp(col.regEx);
						if (!rgxRenderCheck.exec(val)) {
							meta.style = "background-color:pink;";
						}
					}

				//now manage the value formatting....
				switch(col.controlType)
				{
					case "datefield":
						return Ext.util.Format.dateRenderer(col.format)(val); //moment(val).format(col.format);
						break;
					case "combobox":
						//if value lookup is two dimensional, lookup value of val...
						var retVal = val;
						if(lookups[col.columnName])
						{
							var lLookup = lookups[col.columnName];
							if(lLookup)
							{
								if((typeof lLookup[0]) == "object") lLookup.forEach(function(r){if(r[0]==val) retVal=r[1];});
							}
						}
						return retVal;
						break;
					case "numberfield":
						if(col.format) return Ext.util.Format.numberRenderer(col.format)(val); //moment(val).format(col.format);
						return val;
						break;
					default:
						return val;
				}
			}

			//create columns for each type....
			thisColHeader = col.columnName;
			if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
			switch(col.controlType)
			{
				case "datefield":
						tFields.push({name: col.columnName, type: 'date'});
						if(col.format==null) col.format = 'm/d/Y';
						if(col.format=="") col.format = 'm/d/Y';
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								xtype: 'datecolumn',
								renderer: validRenderer,
								ijfColumn: col,
								width: thisColWidth,
								dataIndex: col.columnName,
								filter: {
									type: 'date'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										readOnly: rOnly,
										format:col.format,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											}
										}
									}
								}
				};
				break;
				case "numberfield":
						tFields.push({name: col.columnName, type: 'number'});
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								xtype: 'numbercolumn',
								renderer: validRenderer,
								align: 'end',
								width: thisColWidth,
								dataIndex: col.columnName,
								filter: {
									type: 'number'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										format:col.format,
										readOnly: rOnly,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											}
										}
									}
								}
				};
				break;
				case "checkbox":
					tFields.push({name: col.columnName, type: 'boolean'});
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							xtype: 'checkcolumn',
							centered:true,
							readOnly: rOnly,
							//renderer: validRenderer,
							width: thisColWidth,
							dataIndex: col.columnName,
							listeners: {
								checkchange: function(n,o,f)
								{
									ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
								}
							}
				};
				break;
				case "combobox":
						tFields.push({name: col.columnName, type: 'string'});
						//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
						var cLookupDef = {"index":"0"};
						var cListener = {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											},
											focus: function(){
												this.validate();
											}
										};
						if(ijf.fw.CustomTypes.reduce(function(inObj,t){if(t.name==col.reference) inObj=t; return inObj;},null))
						{
							lookups[col.columnName] = ijfUtils.getReferenceDataByName(col.reference,"0");
						}
						else
						{
							//complex cascade...
							try
							{
								cLookupDef = JSON.parse(col.reference);
								lookups[col.columnName] = ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index);

								//establish a listener for this combo if necessary
								if(cLookupDef.parents)
								{
									var parentIds = cLookupDef.parents;
									var cFilters = parentIds.reduce(function(inFilter,p){
											inFilter.push({"property":p.dataIndex.toString(), "value":"tbd", "columnName":p.columnName});
											return inFilter;
										},[]);
									cListener["beforeQuery"] = function(query) {
												var cContainer = this.up();
												//cFilters["value"]= cValue;
												cFilters.forEach(function(f){
													//for each filter param, we need to get the correct value...
													var cValue = cContainer.grid.getSelectionModel().getSelected().items[0].data[f.columnName];
													if(!cValue) cValue = 'novaluetofilterwith';
													f.value=cValue;
												});
												this.store.clearFilter();
												this.store.filter(cFilters);
											};
								}

								//for each child, you need to clear it's value
								if(cLookupDef.children)
								{
									var childFields = cLookupDef.children;
									cListener["change"]= function(n,o,f)
									{
											var cContainer = this.up();
											childFields.forEach(function(f){
												cContainer.grid.getSelectionModel().getSelected().items[0].set(f,null);
											});
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
									};
								}

							}
							catch(le)
							{
								ijfUtils.footLog("failed to handle complex lookup: " + le.message);
								lookups[col.columnName] = [];
							}
						}
						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								width: thisColWidth,
								dataIndex: col.columnName,
								renderer: validRenderer,
								filter: {
									type: 'list'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										forceSelection: true,
										readOnly: rOnly,
										store: lookups[col.columnName],
										lookupDef: cLookupDef,
										displayField: cLookupDef.index,
										valueField: cLookupDef.index,
										//triggerAction: 'all',
										//mode: 'local',
										//lastQuery: '',
										listeners: cListener
									}
								}
				};
				break;
				default:
						tFields.push({name: col.columnName, type: 'string'});

						colObj={
								header: thisColHeader,
								sortable: true,
								hidden: false,
								width: thisColWidth,
								dataIndex: col.columnName,
								renderer: validRenderer,
								filter: {
									type: 'string'
								},
								editor: {
									completeOnEnter: true,
									field: {
										xtype: col.controlType,
										allowBlank: (col.required!="Yes"),
										validator: lValidator,
										readOnly: rOnly,
										listeners: {
											change: function(n,o,f)
											{
												ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
											},
											focus: function(){
												this.validate();
											}
										}
									}
								}
				};
			}

			ijfUtils.setColWidth(colObj,cIndex,colWidths,150);
		    listColumns.push(colObj);

			cIndex++;

		});

	}


	//adding can Delete at END
	if(canDelete)
	{
		listColumns.push({xtype: 'actioncolumn',
			  header: "Action",
			  width: 70,
			  items: [{icon: '' },{
					icon: '/download/resources/com.idealfed.poc.idealforms:jiraforms-resources5/images/tree/drop-no.png',
					handler: function(grid, rowIndex, colIndex, itm) {
						  try
						  {
							  var fileAtts = grid.store.getData().items[rowIndex].data;
							  //function to delete and remove the record....
							  var removeFile = function()
							  {
								   ijfUtils.showProgress();
								   var delayIt=function()
								   {
									   var delRes = ijfUtils.deleteSpFile(fileAtts.raw,msaIssueKey);
									   if(delRes!="OK")
									   {
											if(delRes.indexOf("checked out for editing")>-1)
											{
												ijfUtils.hideProgress();
												ijfUtils.modalDialogMessage("Error","Unable to delete because the file is checked out for editing");
												return;
											}
											else
											{
												ijfUtils.hideProgress();
												ijfUtils.modalDialogMessage("Error","Unable to delete the file: " + delRes);
												return;
										    }
									   }
									  ijf.main.resetForm();
									  ijfUtils.hideProgress();
									  return;
								   }
								   window.setTimeout(delayIt,50);
							  }
							  ijfUtils.modalDialog("Warning","You are about to permanently remove this file, are you sure you want to continue?",removeFile);
						  }
						  catch(e)
						  {
							  footLog("Failed delete action ");
						  }
					}
				}]
	  	});
    }


    //adding concept of post filter to transform the data...
    if(inField.referenceFilter)
    {
        //filter the items...
        if(ijf.snippets.hasOwnProperty(inField.referenceFilter))
	        fArray = ijf.snippets[inField.referenceFilter](fArray);
    }

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    var initialLoad = true;
    var gridStore = new Ext.data.TreeStore({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"),
        nodeParam: "msadata",
        root: {
		 	expanded:false,
		 	children: []
		},
		 proxy: {
				type: 'ajax',
				actionMethods: {
					read: 'POST'
				   },
				extraParams: {
					action: "run",
					msamethod: "GetAttachmentHistory"
				},
				url: '/plugins/servlet/maxjiraspapi',
				reader: {
					type: 'json',
					getResponseData: function(response) {
						//var jsonData = Ext.JSON.decode(response.responseText);
						try
						{
							if(initialLoad)
							{
								initialLoad=false;
								return fArray;
							}
							var jsonData = Ext.JSON.decode(response.responseText);

							jsonData = jsonData.result.items.sort(function(a, b)
										{
											a = moment(a.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
											b = moment(b.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
											return a>b ? -1 : a<b ? 1 : 0;
							});

							var tArray = jsonData.map(function(a){
								var retObj =  {"fileid":a.UniqueId,"created":a.CreatedDate,"rawFileName":a.FileName,"filename":"<a href='"+a.url+"'>"+a.FileName +"</a>","fUser":a.CreatedByName};

								if(a.IsCurrent)
								{
									retObj.fStatus = "Current";
								}
								else
								{
									retObj.fStatus = "Version: " + a.VersionLabel;
								}
								retObj.raw = a;
								//add data if exists
								if(indexedData)
								{
									if(indexedData.hasOwnProperty(a.UniqueId))
									{
										//add all the attributes to this record...
										var fileAtts = indexedData[a.UniqueId];
										Object.keys(fileAtts).forEach(function(a){
											if(a=="fildid") return;
											retObj[a]=fileAtts[a];
										});
									}
								}
								//is it leaf?  is it parent....
								retObj.leaf=true;

								return retObj;
							});
							return tArray;
					    }
					    catch(pError)
					    {
							console.log("Error calling api: " + pError.message);
							return [];
						}

					}
				}
			}
    });
	//gridStore.loadData(fArray);
    //msadata: window.location.hostname.split(".")[0] + "," +  ijf.currentItem.key + ",According to Scott.docx"



	var headerButtons =[];

	if(!rOnly)
	{
			if(thisT)
			{
					headerButtons.push({
							xtype:'button',
							text: 'Save',
							handler: function(){
								 //create record...
								var u1=this.up(); //header
								var u2=u1.up(); //grid
								try
								{
									u2.editingPlugin.completeEdit();
								}
								catch(e){}

								var onSuccessSave = function()
								{
									ijfUtils.hideProgress();
									if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
									ijf.main.setAllClean();
									ijf.main.resetForm();
								};
								Ext.getBody().mask("Saving...");
								var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,inField.form,item)};
								window.setTimeout(saveIt,50);
							}
						});
			}
			headerButtons.push({
				html:  "<form enctype='multipart/form-data' id='"+inFormKey+'_upSPGrdFrm_'+inField.formCell.replace(/,/g,"_")+"'><input id='"+inFormKey+'_upSpGrd_'+inField.formCell.replace(/,/g,"_")+"' type='file' name='file' onchange='ijfUtils.gridSpUploadFile(event,\""+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"\",\""+inFormKey+'_fld_'+inField.formCell+"\",\"" + msaIssueKey + "\");'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"});
			headerButtons.push({
				xtype:'button',
				text:"Upload",
				scope: this,
				handler: function(){
				   //need the formset ID...
				   var jKey = '#'+inFormKey+'_upSpGrd_'+inField.formCell.replace(/,/g,"_");
				   jQuery(jKey).val("");
				   jQuery(jKey).trigger('click');
				}
			});
	}

    var gridPanel = new Ext.tree.Panel({
		 header:{
				titlePosition: 0,
				items: headerButtons
		},
		 title:  inField.caption,
		 style: l_Style,
		 hidden: hideField,
		 useArrows: true,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
        store: gridStore,
         rootVisible: false,
        width:l_Width,
        plugins: ['gridfilters',{
			ptype: 'cellediting',
			clicksToEdit: 1
        }],
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed,
        autoLoad:true
    });

    var userIsSpAdmin=false;
    var adminGrpsArry = [];
    if(inField.dataReference) adminGrpsArry=inField.dataReference.split(",");
    adminGrpsArry.forEach(function(g){
		if(ijf.main.currentUser.groupList.indexOf(g.trim())>-1) userIsSpAdmin=true;
	});



	var treeMenu = new Ext.menu.Menu({ items:
		[
			{ text: 'Check In', handler: function(f, i, n, t)  {
					 var fileAtts = gridPanel.selection.data;
					 ijfUtils.showProgress();
					   var delayIt=function()
					   {
						 var checkoutResult = ijfUtils.checkInSpFile(fileAtts.raw,msaIssueKey,"JIRA Checkin");
						 if(checkoutResult=="OK")
						 {
							 ijf.main.resetForm();
							 ijfUtils.hideProgress();
						 }
						 else
						 {
						     ijfUtils.hideProgress();
							 ijfUtils.modalDialogMessage("Error","Unable to check file out: " + checkoutResult);
						 }
 					     return;
	 				   }
                       window.setTimeout(delayIt,50);
			} },
			{ text: 'Check Out', handler: function(f, i, n, t)  {
					 var fileAtts = gridPanel.selection.data;
					 ijfUtils.showProgress();
					 var delayIt=function()
					 {
						 var checkoutResult = ijfUtils.checkOutSpFile(fileAtts.raw,msaIssueKey);
						 if(checkoutResult=="OK")
						 {
							 ijf.main.resetForm();
							 ijfUtils.hideProgress();
						 }
						 else
						 {
							 ijfUtils.hideProgress();
							 ijfUtils.modalDialogMessage("Error","Unable to check file out: " + checkoutResult);
						 }
 					     return;
	 				 }
                     window.setTimeout(delayIt,50);
			} },
			{ text: 'Delete', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;

				  //function to delete and remove the record....
				  var removeFile = function()
				  {
					   ijfUtils.showProgress();
					   var delayIt=function()
					   {
						   var delRes = ijfUtils.deleteSpFile(fileAtts.raw,msaIssueKey);
						   if(delRes!="OK")
						   {
								ijfUtils.hideProgress();
								ijfUtils.modalDialogMessage("Error","Unable to delete the file: " + delRes);
								return;
						   }
						  ijf.main.resetForm();
 					      ijfUtils.hideProgress();
						  return;
	 				   }
                       window.setTimeout(delayIt,50);
				  }
				  ijfUtils.modalDialog("Warning","You are about to permanently remove this file, are you sure you want to continue?",removeFile);
			} },
			{ text: 'Details', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;

				 var detailsStr = JSON.stringify(fileAtts.raw,null,4);
				 detailsStr = detailsStr.replace(/\"/g,"");
				 detailsStr = detailsStr.replace(/{/g,"");
				 detailsStr = detailsStr.replace(/}/g,"");
				 detailsStr = detailsStr.replace(/,/g,"");

				 ijfUtils.modalDialogMessage("File Details","<pre>" + detailsStr + "</pre>");
			} },
			{ text: 'Download', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				 if(fileAtts.DownloadUrl)
					 window.open(fileAtts.raw.DownloadUrl);
			     else
			         window.open(fileAtts.raw.url);
			} },
			{ text: 'Edit', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				 //window.open(fileAtts.raw.EditInAppUrl);
				 window.location.href=fileAtts.raw.EditInAppUrl;
			} }	,
			{ text: 'Edit in Browser', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				 window.open(fileAtts.raw.EditInBrowserUrl);
			} }	,
			{ text: 'View in Browser', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				 window.open(fileAtts.raw.ViewInBrowserUrl);
			} }	,
			{ text: 'View Mini View', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				 window.open(fileAtts.raw.MiniViewUrl);
			} },
		    { text: 'Rename', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;
				//function to rename and remove the record....

				  var renameFile = function(oldFile,newFile)
				  {
					   ijfUtils.showProgress();
					   var delayIt=function()
					   {
						   var rRes = ijfUtils.renameSpFile(ijf.currentItem.key,oldFile,newFile);
						   if(rRes!="OK")
						   {
								ijfUtils.hideProgress();
								ijfUtils.modalDialogMessage("Error","Unable to rename the file: " + rRes);
								return;
						   }
						  ijf.main.resetForm();
 					      ijfUtils.hideProgress();
						  return;
	 				   }
                       window.setTimeout(delayIt,50);
				  }

				  //need a prompt right here...
				  var renameFun = function(inPrompted)
				  {
 				       renameFile(fileAtts.raw.FileName,inPrompted);
				  }
				  ijfUtils.modalDialogPrompt("Renaming File","Please provide a new name, not including suffix.",fileAtts.raw.FileName.split(".")[0], renameFun);
			} },
            { text: 'Duplicate', handler: function(f, i, n, t)  {
				 var fileAtts = gridPanel.selection.data;

				  var duplicateFile = function(currentFile,newFileName)
				  {
					   ijfUtils.showProgress();
					   var delayIt=function()
					   {
						   var fileData = ijfUtils.getSpFileData(ijf.currentItem.key, currentFile);
						   var fParts = currentFile.FileName.split(".");
						   var fNewName = newFileName + "." + fParts[fParts.length-1];
						   var rRes = ijfUtils.uploadSpFile(ijf.currentItem.key,newFileName,fileData);
						   if(rRes!="OK")
						   {
								ijfUtils.hideProgress();
								ijfUtils.modalDialogMessage("Error","Unable to rename the file: " + rRes);
								return;
						   }
						  ijf.main.resetForm();
 					      ijfUtils.hideProgress();
						  return;
	 				   }
                       window.setTimeout(delayIt,50);
				  }

				  //need a prompt right here...
				  var duplicateFun = function(inPrompted)
				  {
 				       duplicateFile(fileAtts.raw,inPrompted);
				  }
				  ijfUtils.modalDialogPrompt("Duplicating File","Please provide a new name, not including suffix.","Copy of " + fileAtts.raw.FileName.split(".")[0], duplicateFun);


			} },
			{ text: 'Copy to JIRA', handler: function(f, i, n, t)  {
					 var fileAtts = gridPanel.selection.data;
					 ijfUtils.showProgress();
					 var copyFile=function()
					 {
						 var fileName = fileAtts.raw.FileName;
						 var copyResult = ijfUtils.copySpFilesToJira(fileName,msaIssueKey);
						 if(copyResult=="OK")
						 {
							 ijf.main.resetForm();
							 ijfUtils.hideProgress();
						 }
						 else
						 {
							 ijfUtils.hideProgress();
							 ijfUtils.modalDialogMessage("Error","Unable to copy file: " + copyResult);
						 }
 					     return;
	 				 }
                     window.setTimeout(copyFile,50);
			} },
			{ text: 'Force Check In', handler: function(f, i, n, t)  {
					 var fileAtts = gridPanel.selection.data;
				  //function to delete and remove the record....
				  var undoCheckout = function()
				  {
					   ijfUtils.showProgress();
					   var delayIt=function()
					   {
						   var delRes = ijfUtils.undoSpCheckout(fileAtts.raw,msaIssueKey);
						   if(delRes!="OK")
						   {
								ijfUtils.hideProgress();
								ijfUtils.modalDialogMessage("Error","Unable to remove checkout: " + delRes);
								return;
						   }
						  ijf.main.resetForm();
 					      ijfUtils.hideProgress();
						  return;
	 				   }
                       window.setTimeout(delayIt,50);
				  }
				  ijfUtils.modalDialog("Warning","You are about to remove the file checkout which will revert to the last saved version.  The person who currently holds the checked out file may lose edits.  Proceed?",undoCheckout);

			} }

		],
		listeners: {
			beforeshow: function(thisMenu, eOpts)
			{

				//checkin,checkout,delete,details,download,edit,browseredit,browserview,miniview,copytojira,forcecheckin
				var filtered = false;
				if(inField.dataReference2) filtered=true;

				if(!gridPanel.selection) return;
				if(!gridPanel.selection.data) return;

				var fileAtts = gridPanel.selection.data;
				thisMenu.items.items.forEach(function(m){ m.setHidden(true);});

                //context menu

				if(((filtered) && (inField.dataReference2.indexOf("checkin")>-1)) || (!filtered)) if(fileAtts.raw.Status) if(fileAtts.raw.Status.checkedOutBy) if(fileAtts.raw.Status.checkedOutBy.email==ijf.main.currentUser.email) thisMenu.items.items[0].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("checkout")>-1)) || (!filtered)) if(fileAtts.raw.Status)	if(fileAtts.raw.Status.canCheckOut) thisMenu.items.items[1].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("delete")>-1)) || (!filtered)) if(fileAtts.raw.Status)	if(fileAtts.raw.Status.canCheckOut) thisMenu.items.items[2].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("details")>-1)) || (!filtered)) thisMenu.items.items[3].setHidden(false); //details
				if(((filtered) && (inField.dataReference2.indexOf("download")>-1)) || (!filtered)) if(fileAtts.raw.url) thisMenu.items.items[4].setHidden(false); //download
				if(((filtered) && (inField.dataReference2.indexOf("edit")>-1)) || (!filtered)) if(fileAtts.raw.EditInAppUrl) thisMenu.items.items[5].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("browseredit")>-1)) || (!filtered)) if(fileAtts.raw.EditInBrowserUrl) thisMenu.items.items[6].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("browserview")>-1)) || (!filtered)) if(fileAtts.raw.ViewInBrowserUrl) thisMenu.items.items[7].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("miniview")>-1)) || (!filtered)) if(fileAtts.raw.MiniViewUrl) thisMenu.items.items[8].setHidden(false);

				if(((filtered) && (inField.dataReference2.indexOf("rename")>-1)) || (!filtered))  if(fileAtts.raw.Status)	if(fileAtts.raw.Status.canCheckOut) thisMenu.items.items[9].setHidden(false);
				if(((filtered) && (inField.dataReference2.indexOf("duplicate")>-1)) || (!filtered)) if(fileAtts.raw.Status)	if(fileAtts.raw.Status.canCheckOut)  thisMenu.items.items[10].setHidden(false);

				if(((filtered) && (inField.dataReference2.indexOf("copytojira")>-1)) || (!filtered)) if(userIsSpAdmin) if(fileAtts.raw.IsCurrent) thisMenu.items.items[11].setHidden(false); //copy to jira
				if(((filtered) && (inField.dataReference2.indexOf("forcecheckin")>-1)) || (!filtered)) if(userIsSpAdmin) if(fileAtts.raw.Status) if(fileAtts.raw.Status.checkedOutBy) if(fileAtts.raw.Status.checkedOutBy.email) thisMenu.items.items[12].setHidden(false); //undo checkout

			}
		}
	});



	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](gridPanel, inFormKey,item, inField, inContainer);
    gridPanel.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, gridPanel, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](gridPanel, inFormKey,item, inField, inContainer);

    if(!rOnly)
    {
		gridPanel.getEl().on('contextmenu', function(e) {
				e.preventDefault();
				treeMenu.showAt(e.clientX+window.pageXOffset,e.clientY+window.pageYOffset);
		});
	}

},
renderAttachmentManaged:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

	var goEditHidden = true;
	if (inField.fieldStyle.indexOf('goedit:true')>-1)
	{
		goEditHidden = false;
    }

	var ocf =  ijfUtils.getEvent(inField);

    var hideField = ijfUtils.renderIfShowField("",inField);
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

    var canDelete = false;
    if (l_fieldStyle.indexOf('delete:true')>-1)
    {
        canDelete=true;
    }
	if(!perms.canEdit) canDelete=false;
    if(!perms.canSee) rOnly=true;

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = true;
    if (l_fieldStyle.indexOf('collapsed:false')>-1)
    {
        collapsed=false;
    }

    var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
		if(l_Width.indexOf("px")>-1) l_Width = l_Width.replace("px","")/1;
	}


//The managed file is either explicitly named in dataSource, or dataSource
//is a single line text that is the name.  If field, then null allows any
//selection.
    inField.namedFile = true;
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
    var managedFileName = inField.dataSource;
    if(jfFieldDef)
    {
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
		managedFileName=data;
		inField.namedFile=false;
	}

    var attachments = item.fields.attachment.reduce(function(inArray, a)
	{
		if(a.filename==managedFileName) inArray.push(a);
		return inArray;
	},[]);


	//sort desc
	var sortedAttachments = attachments.sort(function(a, b)
	{
		a = new Date(a.created);
		b = new Date(b.created);
		return a>b ? -1 : a<b ? 1 : 0;
	});


    var currentAttachment = sortedAttachments[0];
	//bootstrap null
	if(!currentAttachment)
	{
		currentAttachment = {"author":{"displayName": "(not loaded)"},"created":"(not loaded)"};
	}


    var listColumns = [];
    var tFields = [];

    tFields.push({name: "fileid", type: 'string'});
	listColumns.push({
			header: "FID",
			sortable: true,
			hidden: true,
			width: '1%',
			dataIndex: "fileid"
	});

    tFields.push({name: "filename", type: 'string'});
	listColumns.push({
			header: "File Versions",
			sortable: true,
			hidden: false,
			flex: 70,
			dataIndex: "filename",
			filter: {
				type: 'string'
			}
	});

    tFields.push({name: "fUser", type: 'string'});
	listColumns.push({
			header: "User",
			sortable: true,
			hidden: false,
			flex: 30,
			dataIndex: "fUser",
			filter: {
				type: 'string'
			}
	});

    if(ijfUtils.detectIE())
    {
		tFields.push({name: "created", type: 'string'});
		listColumns.push({
				header: "Date",
				sortable: true,
				hidden: false,
				renderer: function(inVal){return moment(inVal).format('lll');},
				width: 150,
				dataIndex: "created",
				filter: {
					type: 'string'
					}
		});
	}
	else
	{
		tFields.push({name: "created", type: 'date'});
		listColumns.push({
				header: "Date",
				sortable: true,
				hidden: false,
				xtype: 'datecolumn',
				formatter:'date("m/d/y h:i:s A")',
				width: 150,
				dataIndex: "created",
				filter: {
					type: 'date'
					}
		});
	}

	if(canDelete)
	{
		listColumns.push({xtype: 'actioncolumn',
			  header: "Action",
			  width: 70,
			  items: [{icon: '' },{
					icon: '/download/resources/com.idealfed.poc.idealforms:jiraforms-resources5/images/tree/drop-no.png',
					handler: function(grid, rowIndex, colIndex, itm) {
						  try
						  {
							  var fileId = grid.store.getData().items[rowIndex].data["fileid"];
							  //function to delete and remove the record....
							  var removeFile = function()
							  {
								   var delRes = ijfUtils.jiraApiSync("DELETE","/rest/api/2/attachment/"+fileId,null);
								   if(delRes!="OK")
								   {
										ijfUtils.modalDialogMessage("Error","Unable to delete the file: " + delRes);
										return;
								   }
								  //remove the row from the grid....
								  grid.getStore().removeAt(rowIndex);

								  //Now IF count of this animal is 0 AND it's a managed with field, we need to
								  //null the field....
								  if(grid.getStore().getCount()<1)
								  {
									  if(jfFieldDef)
									  {
										   var res = ijfUtils.updateJiraFieldValue(jfFieldDef.id, "", item);
										   if(res!="OK")
										   {
												ijfUtils.modalDialogMessage("Error","Unable to update the managed file field, please contact support.");
												return;
										   }
										   ijf.main.resetForm();
											//reload
									  }
							  	  }
								  return;
							  }
							  ijfUtils.modalDialog("Warning","You are about to permanently remove this file, Note to see changes in other files lists on this page you must refresh the page. continue?",removeFile);
						  }
						  catch(e)
						  {
							  footLog("Failed delete action ");
						  }
					}
				}]
	  	});
    }

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    var gridStore = new Ext.data.Store({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")
    });
    var fArray = sortedAttachments.map(function(a){
		    return {"fileid":a.id,"created":a.created,"filename":a.filename + " <a href='"+a.content+"' target='_blank'>open</a>","fUser":a.author.displayName};
	});
	gridStore.loadData(fArray);


	//end permissions

	//var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+inField.dataSource+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value+'</span>');} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+inField.dataSource+"');}\"></form>";
	//id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId'
	if(managedFileName)
	{
	    var headerHtml = "<div id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId'>File: " + managedFileName + "<br> uploaded by " + currentAttachment.author.displayName + " on " + moment(currentAttachment.created).format('lll') + "</div>";
	    var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+managedFileName+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.simpleSave();} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+managedFileName+"');}\"></form>";
	    //var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+managedFileName+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');ijfUtils.simpleSave();} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+managedFileName+"');}\"></form>";

	    //ijfUtils.simpleSave();

    }
    else
    {
        var headerHtml = "<div id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId'>Managed File has not been Initialized<br>&nbsp;</div>";
	    var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.simpleSave(); \"></form>";
	    //var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"'); ijfUtils.simpleSave();\"></form>";
	}


    var headerItems = [{
							xtype:'panel',
							html: headerHtml,
							bodyStyle: 'background:transparent;color:white;width:100px'
						 },
						{
							xtype:'button',
							text:"Edit",
							hidden: goEditHidden,
							handler: function(){
							   // render a local version
							   if(window.onbeforeunload!=null)
							   {
								   //cannot run, tell them to save first
								   ijfUtils.modalDialogMessage("Information","Sorry you cannot edit a file with unsaved fields in your form.  Please save first then try again.");
								   return;
                			   }
							   if(currentAttachment)
							   {
								   var token = "xxx";
								   //start job, open window, poll, finalize...
								   var jobSpec = {fileIdentifierString:window.location.origin +"?fileID=" + currentAttachment.id};
							   }
							   else
							   {
								  ijfUtils.modalDialogMessage("Error","Failed to get the current attachment.");
								  return;
							   }
							   var	tApi = "/rest/goedit/2.0/job/create?instanceID=local";
							   var	jData = JSON.stringify(jobSpec);
						       var  fileEditJob = ijfUtils.jiraApiSync("POST",tApi,jData);

							   if(fileEditJob.job)
							   {

								   //OK, open to the URL and open a window to poll and save when done...
								   window.open("goedit://"+window.location.host+"/?platform=jira&protocol=http&goeditProtocolVersion=2.0&token="+fileEditJob.job.token+"&instanceID=local");

									var filePollerFunction = function()
									{
										var lookForResult = ijfUtils.jiraApiSync("GET","/rest/goedit/2.0/job/" + fileEditJob.job.token + "?instanceID=local",null);
										if(lookForResult.status)
										{
											if(lookForResult.status.saveAllowed)
											{
												dWin2.items.items[0].update("<br>&nbsp;Ready to Save<br><br>&nbsp;Updated: " + new Date(lookForResult.latestDraft.timestamp).toLocaleString());
												dWin2.dockedItems.items[1].items.items[0].setHidden(false);
											}
										}
									}
									var filePoller = setInterval(filePollerFunction, 3000);

								   var dWin2 = new Ext.Window({
										layout: 'vbox',
										title: "Editing file: " + currentAttachment.filename,
										width: 350,
										height:200,
										closable: false,
										items: [
											{
												xtype: 'panel',
												margin: '0 0 0 0',
												width: '100%',
												height: '100%',
												html: "<br>&nbsp;Nothing to save yet"
											},
										],
										buttons:[ {
												text:'Save',
												hidden:true,
												handler: function(){
												window.clearInterval(filePoller);
												//get status, if OK, then save and finalize...
												var lookForResult = ijfUtils.jiraApiSync("GET","/rest/goedit/2.0/job/" + fileEditJob.job.token + "?instanceID=local",null);
												if(lookForResult.status)
												{
													if(lookForResult.status.saveAllowed)
													{
														//finalize
														var finSpec = {finalizemode:"create", revisioncomment:""};
														var	tApi = "/rest/goedit/2.0/job/" + fileEditJob.job.token + "/finalize?instanceID=local";
														var	jData = JSON.stringify(finSpec);
						       							var  fileFinJob = ijfUtils.jiraApiSync("POST",tApi,jData);
						       							if(fileFinJob.status!="success")
						       							{
															ijfUtils.modalDialogMessage("Error","Failed to get finalize the job.");
														}
														dWin2.close();
													}
												}
												else
												{
													ijfUtils.modalDialogMessage("Error","Failed to get status of the job so we cannot finalize.");
													dWin2.close();
												}

											}},
											{
												text:'Cancel',
												handler: function(){

												window.clearInterval(filePoller);
												var	tApi = "/rest/goedit/2.0/job/" + fileEditJob.job.token + "?instanceID=local";
												var cancelJob = ijfUtils.jiraApiSync("DELETE",tApi,null);
												dWin2.close();

											}}
										],
										listeners:{
											destroy: function(tObj)
											{
												ijfUtils.footLog("Edit dialog done, reload the item and rerender...");
												ijf.main.resetForm();
											}
										},
										modal: true
									});



									dWin2.show();
									dWin2.setY(window.pageYOffset+250);
								}
								else
								{
									ijfUtils.modalDialogMessage("Error","Failed to create file edit job");
								}

							}
						 },
						 {
							xtype:'button',
							text:"Download",
							handler: function(){
							   // render a local version
							   if(currentAttachment) window.open(currentAttachment.content);
							}
						 }];

					if(!rOnly)
					{
						headerItems.push({
											xtype:'button',
											text:"Upload",
												listeners: {
													click: function(f,n,o){

														Ext.get(inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+'UploadLabelId').update('No file selected...');

														var clickKey = "#"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId";
														jQuery(clickKey).val("");
														jQuery(clickKey).trigger('click');
													}
												}

										 });
					}


    //standard file setup...
    var gridPanel = new Ext.grid.GridPanel({
		 title:  inField.caption,
		 header:{
			titlePosition: 1,
			items: headerItems
		 },
		 style: l_Style,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
        store: gridStore,
        width:'100%',
        plugins: 'gridfilters',
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed
    });

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        width: l_Width,
        items: [gridPanel,
           {
            html: fileLoad,
            frame: false,
            hidden: true,
            border: false,
            xtype: "panel"}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl, inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

},
renderAttachmentSPManaged:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

	var canEditFile = false;


	var ocf =  ijfUtils.getEvent(inField);

    var hideField = ijfUtils.renderIfShowField("",inField);
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

    var canDelete = false;
    if (l_fieldStyle.indexOf('delete:true')>-1)
    {
        canDelete=true;
    }
	if(!perms.canEdit) canDelete=false;
    if(!perms.canSee) rOnly=true;

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = true;
    if (l_fieldStyle.indexOf('collapsed:false')>-1)
    {
        collapsed=false;
    }

    var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
		if(l_Width.indexOf("px")>-1) l_Width = l_Width.replace("px","")/1;
	}


//The managed file is either explicitly named in dataSource, or dataSource
//is a single line text that is the name.  If field, then null allows any
//selection.
    inField.namedFile = true;
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
    var managedFileName = inField.dataSource;
    if(jfFieldDef)
    {
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
		managedFileName=data;
		inField.namedFile=false;
	}



	var msaIssueKey = ijf.currentItem.key;
	//msaIssueKey = "ISSUE-3";


    var sharePointFiles = ijfUtils.getSharepointIssueFiles(msaIssueKey);
    var currentAttachment = {};
    if(sharePointFiles.status=="success")
    {
		var attachments = sharePointFiles.result.items.reduce(function(inArray, a)
		{
			if(a.FileName==managedFileName){
				//inArray.push(a);
				currentAttachment=a;
				if(a.Status.EditInAppUrl) canEditFile=true;
				//and call the get versions....
				var fileVersions = ijfUtils.getSharepointIssueFileVersions(msaIssueKey,a.FileName);
				if(fileVersions.status="success")
				{
					//load the file versions into the array....
					fileVersions.result.items.forEach(function(fv){
						inArray.push(fv);
					});
				}
			}
			return inArray;
		},[]);
    }
    else
    {
		//error no files....
		 var attachments = [];
	}


	var sortedAttachments = attachments.sort(function(a, b)
	{
		a = moment(a.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
		b = moment(b.CreatedDate).format('YYYY-MM-DD HH:mm:ss');
		return a>b ? -1 : a<b ? 1 : 0;
	});


    //var currentAttachment = sortedAttachments[0];
	//bootstrap null
	if(!currentAttachment)
	{
		//currentAttachment = {"author":{"displayName": "(not loaded)"},"created":"(not loaded)"};
		currentAttachment = {"CreatedByName":"(not loaded)","CreatedDate":"(not loaded)"};
	}


    var listColumns = [];
    var tFields = [];

    tFields.push({name: "url", type: 'string'});
	listColumns.push({
			header: "FID",
			sortable: true,
			hidden: true,
			width: '1%',
			dataIndex: "url"
	});

    tFields.push({name: "FileVersion", type: 'string'});
	listColumns.push({
			header: "File Versions",
			sortable: true,
			hidden: false,
			flex: 30,
			dataIndex: "FileVersion",
			filter: {
				type: 'string'
			}
	});

    tFields.push({name: "CreatedByName", type: 'string'});
	listColumns.push({
			header: "User",
			sortable: true,
			hidden: false,
			flex: 70,
			dataIndex: "CreatedByName",
			filter: {
				type: 'string'
			}
	});

    if(ijfUtils.detectIE())
    {
		tFields.push({name: "CreatedDate", type: 'string'});
		listColumns.push({
				header: "Date",
				sortable: true,
				hidden: false,
				renderer: function(inVal){return moment(inVal).format('lll');},
				width: 150,
				dataIndex: "CreatedDate",
				filter: {
					type: 'string'
					}
		});
	}
	else
	{
		tFields.push({name: "CreatedDate", type: 'date'});
		listColumns.push({
				header: "Date",
				sortable: true,
				hidden: false,
				xtype: 'datecolumn',
				formatter:'date("m/d/y h:i:s A")',
				width: 150,
				dataIndex: "CreatedDate",
				filter: {
					type: 'date'
					}
		});
	}


    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }
    var gridStore = new Ext.data.Store({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")
    });
    var fArray = sortedAttachments.map(function(a){
		    return {"url":a.url,"CreatedDate":a.CreatedDate,"FileVersion":"<a href='"+a.url+"' target='_blank'>"+a.VersionLabel+"</a>","CreatedByName":a.CreatedByName};
	});
	gridStore.loadData(fArray);


	//end permissions

	//var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+inField.dataSource+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value+'</span>');} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+inField.dataSource+"');}\"></form>";
	//id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId'
	if(managedFileName)
	{
	    var headerHtml = "<div id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId'>File: " + managedFileName + "<br> uploaded by " + currentAttachment.CreatedByName + " on " + moment(currentAttachment.CreatedDate).format('lll') + "</div>";
	    //var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+managedFileName+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.simpleSaveQuiet();ijfUtils.gridSpUploadFile(event,'"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"','"+inFormKey+'_fld_'+inField.formCell+"','" + ijf.currentItem.key + "');} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+managedFileName+"');}\"></form>";
		var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:if(this.value.indexOf('"+managedFileName+"')>-1){ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.gridSpUploadFile(event,'"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"','"+inFormKey+'_fld_'+inField.formCell+"','" + ijf.currentItem.key + "');} else {ijfUtils.modalDialogMessage('Error','Sorry, you must select a file named: <br><br>"+managedFileName+"');}\"></form>";

    }
    else
    {
        var headerHtml = "<div id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId'>Managed File has not been Initialized<br>&nbsp;</div>";
	    //var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.simpleSaveQuiet();ijfUtils.gridSpUploadFile(event,'"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"','"+inFormKey+'_fld_'+inField.formCell+"','" + ijf.currentItem.key + "'); \"></form>";
	    var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=\"javascript:ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadLabelId').update('File Selected (hit save to upload):<br><span style=color:yellow>'+this.value.split('\\\\')[this.value.split('\\\\').length-1]+'</span>');ijfUtils.gridSpUploadFile(event,'"+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"','"+inFormKey+'_fld_'+inField.formCell+"','" + ijf.currentItem.key + "'); \"></form>";
	}


    var headerItems = [{
							xtype:'panel',
							html: headerHtml,
							bodyStyle: 'background:transparent;color:white;width:100px'
						 },
						{
							xtype:'button',
							text:"Edit",
							hidden: canEditFile,
							handler: function(){
							   // render a local version
									window.open(currentAttachment.EditInAppUrl);
						  }
						 },
						 {
							xtype:'button',
							text:"Download",
							handler: function(){
							   // render a local version
							   if(currentAttachment)
							   {
								   if(currentAttachment.DownloadUrl) window.open(currentAttachment.DownloadUrl);
								   else window.open(currentAttachment.url);
							   }
							}
						 }];

					if(!rOnly)
					{
						headerItems.push({
											xtype:'button',
											text:"Upload",
												listeners: {
													click: function(f,n,o){

														Ext.get(inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+'UploadLabelId').update('No file selected...');

														var clickKey = "#"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId";
														jQuery(clickKey).val("");
														jQuery(clickKey).trigger('click');
													}
												}

										 });
					}


    //standard file setup...
    var gridPanel = new Ext.grid.GridPanel({
		 title:  inField.caption,
		 header:{
			titlePosition: 1,
			items: headerItems
		 },
		 style: l_Style,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
        store: gridStore,
        width:'100%',
        plugins: 'gridfilters',
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed
    });

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        width: l_Width,
        items: [gridPanel,
           {
            html: fileLoad,
            frame: false,
            hidden: true,
            border: false,
            xtype: "panel"}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl, inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderHtml:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_fieldStyle) l_fieldStyle="background:transparent";
    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";

    if(inField.dataReference=="html")
    {
	    var outHtml = ijfUtils.replaceKeyValues(inField.dataSource,item, true);
	}
    else
    {
	    var outHtml = ijfUtils.replaceKeyValues(inField.dataSource,item);
	}

	//section for dynamic control rendering using !{x,y,z}  where it's a key to a field
	var dynamicFields = [];
    var setDynamicControls = function(inText)
    {
		var retText = inText;
		var pat = "\!\{.*?\}";
		var rgx = new RegExp(pat);
		var m = rgx.exec(retText);

		if(m==null)
		{
			return retText;
		}
		else
		{
			//you have a dynamic field....
			var keyVal = m[0].replace("!{","");
			keyVal = keyVal.replace("}","");
            var dFieldId=inFormKey+'_ctr_d_'+keyVal.replace(/,/g,"_");
            //var dFieldTblId = inFormKey+'_tbl_d_'+keyVal.replace(/,/g,"_");
            //var dFieldTbl = "<table  role='presentation' id='"+dFieldTblId+"' cellspacing=0 cellpadding=3><tr><td>";
			retText = retText.replace(m[0],"<div style='display:inline-block' id='"+dFieldId+"'></div>");
			dynamicFields.push({"containerId":dFieldId,"fieldId":keyVal});
            return setDynamicControls(retText);
		}
	}

	if(ijf.snippets.hasOwnProperty(inField.event))
	{
		var ocf =  ijfUtils.getEvent(inField);
   	    outHtml = ocf(outHtml);
    }

    outHtml = setDynamicControls(outHtml);


    //outHtml = ijfUtils.sanitize(outHtml);
    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        style: l_fieldStyle,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

    //now that it's rendered...render dynamic fields
//dynamicFields=[];
    dynamicFields.forEach(function(f)
    {
		//find field by key....
		if(inField.form.fields.hasOwnProperty(f.fieldId)) var targetField = inField.form.fields[f.fieldId];
		else
			var targetField = inField.form.fields.reduce(function(inObj,ff){if(ff.formCell==f.fieldId) inObj=ff; return inObj;},null);
		var container = document.getElementById(f.containerId);
		if((!targetField) || (!container))
		{
			ijfUtils.footLog("Failed to render dynamic field " + f.fieldId);
			return;
		}
		try
		{
			targetField.form=inField.form;
			ijf.extUtils.renderField(inFormKey,item,targetField,container);
		}
		catch(e)
		{
			ijfUtils.footLog(targetField.formCell + " " + targetField.controlType + " failed to render: " + e.message);
        }
	});

}
,
renderRaw:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_fieldStyle) l_fieldStyle="background:transparent";
    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";

   var data = ijfDataServices.getData(inField.dataSource,inFormKey,item, inField, inContainer, true);

       var outHtml;
       if(data=="loading")
       {
           outHtml = "";
       }
       else
       {
           try{
               if (data instanceof Object)
               {
                   outHtml = JSON.stringify(data);
               }
               else
               {
                   outHtml = data;
               }
           }
           catch(e){
               outHtml = data;
           }
    }

	if(ijf.snippets.hasOwnProperty(inField.event))
	{
		var ocf =  ijfUtils.getEvent(inField);
   	    outHtml = ocf(outHtml);
    }

    //outHtml = ijfUtils.sanitize(outHtml);
    if(!l_Style) l_Style = l_panelStyle;
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        style: l_fieldStyle,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);

    //now if data==loading, do a mask...
    if(data=="loading") pnl.mask("Loading...");

    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);
}
,
 renderFormButtons:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;
    var lWidth = 'auto';
    if (inField.width!="")
    {
        lWidth= inField.width/1;
    }
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

	var rOnly = false;
	//from meta data, set readonly if we don't have the ability...
	if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'hideIfReadOnly')=="true")
	{
		var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
		if(jfFieldMeta)	if(!jfFieldMeta.operations) rOnly=true;
	}

	//end permissions

    var l_save="Save";
    var l_reload="Reload";
    var l_done ="Done";
    var l_style = inField.style.split(",");
    if(l_style.length==3)
    {
        l_save=l_style[0];
        l_reload=l_style[1];
        l_done =l_style[2];
    }
    var lButtons = [];
    if((l_save) && (!rOnly))
    {

		lButtons.push({
			text:l_save,
			margin: '0 4 0 0',
			xtype:'button',
			hidden: (!perms.canEdit),
			style: inField.fieldStyle,
			handler: function(){
				if(ijf.snippets.hasOwnProperty(inField["event"]))
				{
					var fValFail = ijf.snippets[inField["event"]]();
					if(!fValFail)
					{
						ijfUtils.footLog("form failed validation");
						return;
					}
				}

				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
					ijf.main.setAllClean();
					//ijf.currentItem=ijfUtils.getJiraIssueSync(ijf.main.itemId);
					g_itemId = ijf.main.itemId;
					if(inField.referenceFilter) g_formId = inField.referenceFilter;
					ijf.main.resetForm();
				};
					var tForm = inField.form;

					if(ijf.fw.forms.hasOwnProperty(inField.referenceFilter))
					{
	                     tForm=ijf.fw.forms[inField.referenceFilter];
					}
					Ext.getBody().mask("Saving...");
					var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,tForm,item)};
					window.setTimeout(saveIt,50);
			}});

    }
    if(l_reload)
    {
        lButtons.push( {
            text:l_reload,
            xtype:'button',
            style: inField.fieldStyle,
			margin: '0 4 0 0',
            handler: function(){
                if(window.onbeforeunload==null)
                {
                    ijf.main.resetForm();
                }
                else
                {
                    var dFunc = function(){
                        window.onbeforeunload= null;
                        ijf.main.resetForm();
                    };
                    ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                }
            }});
    }
    if(l_done)
    {
        lButtons.push( {
            text:l_done,
            style: inField.fieldStyle,
            xtype:'button',
             handler: function(){
				//target form is dataSource if it exists or default form if it exists...
				var tForm="";
				if(ijf.fw.forms.hasOwnProperty(inField.dataSource))
				{
                     tForm=inField.dataSource;
				}
				else if(ijf.fw.forms.hasOwnProperty(inField.form.formSet.settings.defaultForm))
				{
					 tForm=inField.form.formSet.settings.defaultForm;
				}
				else
				{
					ijfUtils.modalDialogMessage("Information","Sorry but the done action needs a form or the form group needs a default form.");
					return;
				}

				//12/5/2017 - changing to reset item to null unless persist item  true...
				var tarItem = item;
				if(inField.referenceFilter != "persistItem")
				{
					tarItem=null;
					window.g_itemId=null;
				}

                if(window.onbeforeunload==null)
                {
					window.g_formId=tForm;
                    ijf.main.renderForm("ijfContent", tForm, false, tarItem);
                }
                else
                {
                    var dFunc = function(){
                        window.onbeforeunload= null;
                        window.g_formId=tForm;
	                    ijf.main.renderForm("ijfContent", tForm, false, tarItem);
                    };
                    ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                }
            }});
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'left',
        layout: 'hbox',
        border:false,
        hidden: hideField,
        style: l_Style,
        bodyStyle: l_panelStyle,
        items: lButtons
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderPopupFormButtons:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;
    var lWidth = 'auto';
    if (inField.width!="")
    {
        lWidth= inField.width/1;
    }
    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions


    var l_save="Save";
    var l_reload="Save/Done";
    var l_done ="Done";
    var l_style = inField.style.split(",");
    if(l_style.length==3)
    {
        l_save=l_style[0];
        l_reload=l_style[1];
        l_done =l_style[2];
    }
    var lButtons = [];
    if(l_save)
    {
		lButtons.push({
			text:l_save,
			margin: '0 4 0 0',
			xtype:'button',
			hidden: (!perms.canEdit),
			inField: inField,
			handler: function(){

				//if you are saving and ADD form it can only save ONE time
				//then it has to shift to an edit mode....
				//perform form validation
				if(ijf.snippets.hasOwnProperty(inField["event"]))
				{
					var fValFail = ijf.snippets[inField["event"]]();
					if(!fValFail)
					{
						ijfUtils.footLog("form failed validation");
						return;
					}
				}


				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					ijf.main.gPopupFormHandle.unmask();
					ijf.main.setAllClean();
					//now change item to be the new loaded item....
					item = ijfUtils.getJiraIssueSync(ijf.main.itemId);
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
				};
				//IF ijf.main.parentItemId is not null and we are adding
				//a subtask...then we need to set the parent ID in the fields prior to save.  initialize here...
				var fields = null;
				if(ijf.main.parentItemId)
				{
					fields = {};
					fields.parent={"key":ijf.main.parentItemId};
				}

				//ijf.main.saveForm(onSuccessSave,fields, this.inField.form, item);
				var kForm = this.inField.form;
				Ext.getBody().mask("Saving...");
				ijf.main.gPopupFormHandle.mask("Saving...");
				var saveIt = function(){ijf.main.saveForm(onSuccessSave,fields,kForm,item)};
				window.setTimeout(saveIt,10);

			}});
    }
    if(l_reload)
    {
        lButtons.push( {
            text:l_reload,
            xtype:'button',
			margin: '0 4 0 0',
			inField: inField,
			hidden: (!perms.canEdit),
            handler: function(){

				if(ijf.snippets.hasOwnProperty(inField["event"]))
				{
					var fValFail = ijf.snippets[inField["event"]]();
					if(!fValFail)
					{
						ijfUtils.footLog("form failed validation");
						return;
					}
				}

				if(ijf.main.allControlsClean())
				{
					ijf.main.gPopupFormHandle.close();
                    ijf.main.gPopupFormHandle=null;
                    return;
				}

				if(inField.dataReference)
				{
					ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
				}
				else
				{
					ijf.main.saveResultMessage = null;
				}
				var onSuccessSave = function()
				{
					ijfUtils.hideProgress();
					ijf.main.setAllClean();
					if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
                    if(ijf.main.gPopupFormHandle) ijf.main.gPopupFormHandle.close();
                    ijf.main.gPopupFormHandle=null;
				};
				//IF ijf.main.parentItemId is not null and we are adding
				//a subtask...then we need to set the parent ID in the fields prior to save.  initialize here...
				var fields = null;
				if(ijf.main.parentItemId)
				{
					fields = {};
					fields.parent={"key":ijf.main.parentItemId};
				}
			    //ijf.main.saveForm(onSuccessSave,fields, this.inField.form, item);
				var kForm = this.inField.form;
				//Ext.getBody().mask("Saving...");
				ijf.main.gPopupFormHandle.mask("Saving...");
				var saveIt = function(){ijf.main.saveForm(onSuccessSave,fields,kForm,item)};
				window.setTimeout(saveIt,10);
			}});
    }
    if(l_done)
    {
        lButtons.push( {
            text:l_done,
            xtype:'button',
			margin: '0 4 0 0',
            handler: function(){
				if(window.onbeforeunload==null)
				{
					if(ijf.main.gPopupFormHandle)
					{
						ijf.main.gPopupFormHandle.close();
						ijf.main.gPopupFormHandle=null;
					}
				}
				else
				{
					var closeThis = function()
					{
						if(ijf.main.gPopupFormHandle)
						{
							ijf.main.gPopupFormHandle.close();
							ijf.main.gPopupFormHandle=null;
						}
					}
					ijfUtils.modalDialog("Warning","There are unsaved entries on this form, are you sure you want to close?",closeThis);
				}
            }});
    }
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        buttonAlign: 'left',
        layout: 'hbox',
        border:false,
        hidden: hideField,
        style: l_Style,
        bodyStyle: l_panelStyle,
        items: lButtons
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
   pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}

,
renderNavigateToForm:function(inFormKey,item, inField, inContainer)
{


    inContainer.title = inField.toolTip;
    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;



    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";


    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

	//from meta data, set readonly if we don't have the ability...
	if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'hideIfReadOnly')=="true")
	{
		var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
		if(jfFieldMeta)	if(!jfFieldMeta.operations) hideField=true;
	}


	//end permissions

    var hFunction = function(){
        //need to get the id of the form...iterate from fw.
        var targetForm = ijfUtils.replaceKeyValues(inField.dataSource,item);
        var thisForm = ijf.fw.forms[targetForm];

        if(thisForm==null)
        {
            ijfUtils.modalDialogMessage("Error Message", "Unable to find form " +targetForm)
        }
        else
        {
            if(window.onbeforeunload==null)
            {
				window.g_formId=targetForm;
                ijf.main.renderForm("ijfContent", targetForm, false, item);
            }
            else
            {
				var dFunc = function(){
					window.onbeforeunload= null;
					window.g_formId=targetForm;
					ijf.main.renderForm("ijfContent", targetForm, false, item);
				};
				ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
            }
        }
    };
    if(l_labelStyle=="link")
    {
        var pnl = new Ext.FormPanel({
            labelAlign: 'left',
            border:false,
            hidden:hideField,
            style: l_Style,
            bodyStyle: l_panelStyle,
            items: {
                xtype: 'simplelink',
                text: inField.caption,
                style: l_fieldStyle,
                handler: hFunction
            }
        });
    }
    else
    {
        var bPressed = false;
        if(window.g_formId == ijfUtils.replaceKeyValues(inField.dataSource,item)) bPressed = true;
        var pnl = new Ext.FormPanel({
            buttonAlign: 'center',
            layout:'hbox',
            labelAlign: 'left',
            border:false,
            hidden: hideField,
            style: l_Style,
            bodyStyle: l_panelStyle,
            items:[{
				xtype: 'button',
                text:inField.caption,
                pressed: bPressed,
                style: l_fieldStyle,
                handler: hFunction
            }
            ]
        });
    }
    	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

},
renderAttachmentUpload:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var data = null;

    var lAllowBlank = true;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

    var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
    if(jfFieldMeta)	if(!jfFieldMeta.operations) hideField=true;

	//end permissions

    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;

    if(!l_Style) l_Style="background:transparent";


    if(!l_fieldStyle) l_fieldStyle="width:100px;background:transparent";
	if(rOnly) l_fieldStyle="background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);
	//var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');Ext.get('attachmentFileDisplayId').update(ijfUtils.getFileInputName(this,'attachmentFileDisplayId')); multiple></form>";
var fileLoad = "<form enctype='multipart/form-data' id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFormId'><input id='"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId' type='file' name='file' onChange=ijf.main.controlChanged('"+inFormKey+"_fld_"+inField.formCell+"');ijfUtils.simpleSave(); multiple></form>";
    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items:[{
            xtype: 'button',
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldLabel: 'ccc',
            hideLabel:  hideLabel,
            allowBlank: true,
            validator: lValidator,
            text: lCaption,
            readOnly: rOnly,
            id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
            listeners: {
                click: function(f,n,o){
					jQuery("#"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId").val("");
					jQuery("#"+inFormKey+'_fld_'+inField.formCell.replace(/,/g,"_")+"UploadFileId").trigger('click');
                }
            }
        },{
            html: "None selected",
            id: "attachmentFileDisplayId",
            frame: false,
            border: false,
            hidden: true,
            bodyStyle:  l_fieldStyle,
            xtype: "panel"},
           {
            html: fileLoad,
            frame: false,
            hidden: true,
            border: false,
            xtype: "panel"}
    	]
    });

    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);

}
,
renderTextbox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var lAllowBlank = true;
    //adding concept of session vars.
    if(inField.dataSource=="session")
    {
		var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		if((!data) && (inField.style.indexOf('query:true')<0)) data=inField.dataReference2;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
	    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];

		if(inField.dataReference == "html")
		{
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf,false,true);
		}
		else
		{
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
		}

	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
	}

    if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    var lMaxsize =  Number.MAX_VALUE;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
    //console.log(JSON.stringify(perms));
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;

	//from meta data, set readonly if we don't have the ability...
	if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;
	//end permissions


    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);

    var sItems = [{
            xtype: 'textfield',
            labelAlign: 'left',
            //labelWidth: labelWidth,
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldStyle: l_fieldStyle,
            fieldLabel: lCaption,
            hideLabel:  hideLabel,
            allowBlank: lAllowBlank,
            maxLength: lMaxsize,
            validator: lValidator,
            readOnly: rOnly,
            //width: lWidth,
            value: data,
            id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
            listeners: {
					afterrender: function(f)
					{
						this.validate();
					},
					valid: function(f)
					{
						inContainer.title = inField.toolTip;
					},
					invalid: function(f,msg){
						if(!inField.toolTip) inContainer.title = f.getErrors().join();
					},
					change: function(f,n,o){
						if(inField.dataSource=="session")
						{
							ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
						}
						else
						{
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
						}
						if(f.isValid())
						{
							ocf(f,n,o);
						}
					}
				}
			}];
    if (inField.style.indexOf('query:true')>-1)
    {
            sItems.push({
						xtype: 'button',
						icon: '/download/resources/com.idealfed.poc.idealforms:jiraforms-resources5/images/magnify.png',
						handler: function(f,n,o) {
							var cup = this.up();
							var tVal = cup.items.items[0].getValue();
							if(ijf.snippets.hasOwnProperty(inField["dataReference2"])) ijf.snippets[inField["dataReference2"]](tVal);
						}
			});
    }

    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        style: l_Style,
        layout: 'hbox',
        items: sItems
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderIssueRelations:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var lAllowBlank = true;
    //adding concept of session vars.

    var data = "";


    var lValidator = function(v){return true};

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;

    var tipText = "Related Issues Search...";
    var tempTipText = ijfUtils.getNameValueFromStyleString(inField.labelStyle,"tiptext");
    if(tempTipText) tipText = tempTipText;

    var summaryLength = 50;
    var summaryLengthText = ijfUtils.getNameValueFromStyleString(inField.fieldStyle,"length");
	if(summaryLengthText) summaryLength = summaryLengthText/1;


    var showRelatedIssues = true;
    var showRelatedIssuesText = ijfUtils.getNameValueFromStyleString(inField.fieldStyle,"showrelated");
	if(showRelatedIssuesText=='false') showRelatedIssues = false;


    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
    //console.log(JSON.stringify(perms));
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);  //alters the data after it returns  (onchange)
    var bQueryEvent = inField.dataReference; //alters the query prior to execution
    var referenceFilter = inField.referenceFilter;    //filter out unwanted links, mainly for CMM, postive matches show
    var openFormName = inField.dataReference2 //form for link

    var tSearch = inField.dataSource;
    tSearch = ijfUtils.replaceKeyValues(tSearch,item);

	var apiUrl = "/rest/api/2/search?jql=" + tSearch + " AND summary~REPLACETHIS&maxResults=25&fields=summary";

	var	fParam = "query";
	var xtrParam = null;
	var iRoot = 'issues';
	//xtrParam={"fields":"summary"};

	Ext.define('JiraIssueModelMulti', {
			extend: 'Ext.data.Model',
			fields: [{name:'key', type: 'string'},
					 {name: 'summary', type: 'string'},
					 {name: 'sortsummary', type: 'string'}]
	});
	var lookup = Ext.create('Ext.data.Store', {
		storeId: 'issueDropdownMultipleId',
		model: 'JiraIssueModelMulti',
		autoLoad: false,
		proxy: {
			type: 'ajax',
			url: g_root + apiUrl,
			extraParams : xtrParam,
			filterParam: fParam,
			groupParam: '',
			limitParam: '',
			pageParam: '',
			sortParam: '',
			startParam: '',
			reader: {
				type: 'json',
				root: iRoot
			}
		}
	});

	lookup.addListener("load",function(thisStore,records,successful,operation,eOpts)
	{
		records.forEach(function(r){
			r.set("key",r.data["key"]);
			r.set("summary",r.data["key"] + " " + ijfUtils.sanitize(r.data.fields["summary"]));
			r.set("sortsummary",r.data.fields["summary"]);
		});
		thisStore.sort("sortsummary",'ASC');
		ocf(records,thisStore);
	});


	try
	{
		var issueTypeForms = JSON.parse(openFormName);
	}
	catch(e)
	{
		var issueTypeForms = null;
	}

	//create list of related issues if needed....
	var relatedIssuesHtml = "";
	if ((showRelatedIssues==true) && (ijf.currentItem.fields.issuelinks)){
			var relatedIssuesHtml = "";
			ijf.currentItem.fields.issuelinks.forEach(function(a) {
				 var addIt = true;


				 var delLink = '<i class="fa fa-times-circle" onclick="ijfUtils.jiraApi(\'DELETE\',\'/rest/api/2/issueLink/'+a.id+'\',null,null);this.parentElement.style.display=\'none\';"></i>&nbsp;&nbsp;&nbsp;';
				 if(rOnly) delLink = "";

				 if(a.inwardIssue)
				 {
				 	if((referenceFilter) && (a.inwardIssue.key.indexOf(referenceFilter)<0)) addIt=false;
 			 	    if(addIt)
 			 	    	if(openFormName)
 			 	    	{

 			 	    		if(issueTypeForms)
 			 	    		{
								//issue type must have a form to add the row...if not skip

								var targetForm = null;
								issueTypeForms.forEach(function(f){
									if(f.issueType == a.inwardIssue.fields.issuetype.name)  targetForm = f.formName;
								});

								if(targetForm) relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink + '<a href="javascript:ijfUtils.renderFormItem(\''+targetForm+'\',\''+a.inwardIssue.key+'\')">' + a.inwardIssue.key + " " + ijfUtils.sanitize(a.inwardIssue.fields["summary"]).substring(0,summaryLength) + '...</a><br></div>';

							}
							else
							{
	 			 	    		relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink + '<a href="javascript:ijfUtils.renderFormItem(\''+openFormName+'\',\''+a.inwardIssue.key+'\')">' + a.inwardIssue.key + " " + ijfUtils.sanitize(a.inwardIssue.fields["summary"]).substring(0,summaryLength) + '...</a><br></div>';

							}
						}
 			 	    	else relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink + a.inwardIssue.key + " " + ijfUtils.sanitize(a.inwardIssue.fields["summary"]).substring(0,summaryLength) + '...<br></div>';
			 	 }

				 if(a.outwardIssue)
				 {
					 if((referenceFilter) && (a.outwardIssue.key.indexOf(referenceFilter)<0)) addIt=false;
					 if(addIt)

 			 	    	if(openFormName)
 			 	    	{

 			 	    		if(issueTypeForms)
 			 	    		{
								//issue type must have a form to add the row...if not skip

								var targetForm = null;
								issueTypeForms.forEach(function(f){
									if(f.issueType == a.outwardIssue.fields.issuetype.name)  targetForm = f.formName;
								});

								if(targetForm) relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink + '<a href="javascript:ijfUtils.renderFormItem(\''+targetForm+'\',\''+a.outwardIssue.key+'\')">' + a.outwardIssue.key + " " + ijfUtils.sanitize(a.outwardIssue.fields["summary"]).substring(0,summaryLength) + '...</a><br></div>';

							}
							else
							{
								relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink + '<a href="javascript:ijfUtils.renderFormItem(\''+openFormName+'\',\''+a.outwardIssue.key+'\')">' + a.outwardIssue.key + " " + ijfUtils.sanitize(a.outwardIssue.fields["summary"]).substring(0,summaryLength) + '...</a><br></div>';
							}
						}
					 	else relatedIssuesHtml += '<div class="relatedIssueClass">' + delLink  + a.outwardIssue.key + " " + ijfUtils.sanitize(a.outwardIssue.fields["summary"]).substring(0,summaryLength) + '...<br></div>';
				 }
			});
	}



    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'tagfield',
		            store: lookup,
		            filterPickList: true,
					labelStyle: l_labelStyle,
					style: l_panelStyle,
					fieldStyle: l_fieldStyle,
					fieldLabel: lCaption,
					hideLabel: hideLabel,
					allowBlank: lAllowBlank,
					readOnly: rOnly,
					valueField: 'key',
					displayField: 'summary',
					value: null,
					triggerAction: 'all',
					//selectOnFocus:false,
					forceSelection: true,
					queryMode: 'remote',
					queryParam: fParam,
					delimiter: ';',
					minChars: 2,
					emptyText: tipText,
					id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
					listeners: {
						afterrender: function(f)
						{
							this.validate();
						},
						change: function(f,n,o){
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);

						},
						beforequery: function(queryPlan, eOpts)
						{
							if(!queryPlan.query) return;
							var qText = "\"" + queryPlan.query + "*\"";
						    var tUrl = apiUrl.replace("REPLACETHIS",qText);
						    if(bQueryEvent)
						    {
								//attempt to alter query
								try{
									tUrl = ijf.snippets[bQueryEvent](tUrl);
								}
								catch(te)
								{

								}
							}
						    queryPlan.combo.store.proxy.url = tUrl;
						}
					}},
					{
						xtype: 'panel',
						html: relatedIssuesHtml
					}]
    });


    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderTabmenu:function(inFormKey,item, inField, inContainer)
{

    var tabs = JSON.parse(inField.dataSource);

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;

    var tbs = [];
    var lactiveTab = null;

    for(var t in tabs)
    {
        if(!tabs.hasOwnProperty(t)) continue;
        tbs.push({id: t,
                  title: tabs[t][0],
                  style: l_fieldStyle,
                  targetFormName: tabs[t][1]});
        if(tabs[t][1]==ijf.main.outerForm.name)
        {
            lactiveTab =t;
        }
    }
    var simple = new Ext.TabPanel({
        activeTab: lactiveTab,
        items: tbs,
        style: l_Style,
        bodyStyle: l_panelStyle,
        jField: inField,
        frame: false,
        border: false,
        listeners: {
            tabchange: function(tg,t){
                //navigate to target...
                //alert(t.targetFormName);

                if(t.targetFormName!=ijf.main.outerForm.name)
                {
					if(t.targetFormName.indexOf("snippet:")>-1)
					{
						//snippet call...
						var tSnippet = t.targetFormName.replace("snippet:","");
						ijf.main.gEventControl=this.jField;
						try
						{
							var outVal = ijf.snippets[tSnippet](this.jField);
							ijfUtils.footLog("field event returned " + outVal);
						}
						catch(e)
						{
							ijfUtils.footLog("field event failed: " + e.message);
						}
					}
					else
					{
						var thisForm = ijf.fw.forms[t.targetFormName];
						if(thisForm==null)
						{
							ijfUtils.modalDialogMessage("Error Message", "Unable to find form " + t.targetFormName)
						}
						else
						{
							if(window.onbeforeunload==null)
							{
								ijfUtils.clearExt();
								window.g_formId=t.targetFormName;
								ijf.main.renderForm("ijfContent", t.targetFormName, false, item);
							}
							else
							{
								var dFunc = function(){
									window.onbeforeunload= null;
									ijfUtils.clearExt();
									window.g_formId=t.targetFormName;
									ijf.main.renderForm("ijfContent", t.targetFormName, false, item);
								};
								ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
							}
						}
					}
                }
            }
        }
    });
	 //before render....
	 if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
        //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderDatebox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
	var lAllowBlank = true;
    if(inField.dataSource=="session")
    {
		var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		if(!data) data=inField.dataReference2;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;

	}
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

	    var lValidator = function(v){return true};
	    var lRegex =  inField.regEx;
	    if((lRegex!=null) && (lRegex!=""))
	    {
	        lValidator = function(v)
	        {
	            var rgx = new RegExp(lRegex);
	            if (!rgx.exec(v)) {
	                return inField.regExMessage;
	            }
	            return true;
	        }
	    }


    var hideField = ijfUtils.renderIfShowField(data,inField);
	  var hideLabel = false;
	  if (inField.caption=="")
		  var lCaption = inField.dataSource;
	  else if(inField.caption=="none")
	  {
		  var lCaption = "";
		  hideLabel=true;
	  }
	  else
		var lCaption = inField.caption;


    var d = null;
    try
    {
        var tics = Date.parse(data);
        if (isNaN(tics))
        {
            d = null;
        }
        else
        {
            d = new Date(tics);
        }
    }
    catch(e)
    {d = null;}


    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;

    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;

	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:white";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//from meta data, set readonly if we don't have the ability...
	if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;
	//end permissions
		if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);
    var simple = new Ext.FormPanel({
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        style: l_Style,
        items:[{
            xtype: 'datefield',
            labelStyle: l_labelStyle,
            style: l_panelStyle,
            fieldStyle: l_fieldStyle,
            fieldLabel: lCaption,
            hideLabel:  hideLabel,
            allowBlank: lAllowBlank,
            validator: lValidator,
            readOnly: rOnly,
            value: d,
            invalidText: "Date must be in format mm/dd/yyyy",
            id: inFormKey+'_ctr_'+ inField.formCell.replace(/,/g,"_"),
            listeners: {
                afterrender: function(f)
                {
                    this.validate();
                },
                valid: function(f)
                {
                    inContainer.title = inField.toolTip;
                },
                invalid: function(f,msg){
                    if(!inField.toolTip) inContainer.title = f.getErrors().join();
                },
                change: function(f,n,o){
					if(inField.dataSource=="session")
					{
						ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
					}
					else
					{
						ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					}

                    if(f.isValid())
                    {
                        ocf(f,n,o);
                    }
                }
            }
        }]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderDropdown:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;

	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  if(inField.dataReference!="ijfReference") jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  jfFieldDef.schema={};
		  jfFieldDef.schema.type="option";
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		  if(!data) data=inField.dataReference2;	}
	else
	{
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

		//if status, the transitions are the field meta...
		if(jfFieldDef.schema.type=='status')
		{
			//cache this?
			if(!item.transitions)
			{
				item.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+item.key+'/transitions', null);
			}
			var jfFieldMeta = item.transitions;
		}
		else
		{
			var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		}
	}

    var lAllowBlank = true;
    if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'allowblank')=="false") lAllowBlank=false;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
    if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    var noSort = false;
    if (inField.fieldStyle.indexOf('nosort:true')>-1)
    {
	        noSort=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//from meta data, set readonly if we don't have the ability...
	if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;

	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";


    //two forms:  JIRA references or IJF references
    var combo = {};
    var lookup = [];
	switch (inField.dataReference)
	{
		case "ijfReference":

		   //The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
			var cLookupDef = {"index":"0"};
			var cListener = {
								afterrender: function(f)
								{
									this.validate();
								},
								select: function(f,n,o){

									if(inField.dataSource=="session")
									{
										ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
									}
									else
									{
										ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
									}
									ocf(f,n,o);
								},
								change: function(f,n,o){

									if(inField.dataSource=="session")
									{
										ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
									}
									else
									{
										ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
									}
									if(n==null) ocf(f,n,o);
								}
							};

			var refCheck = 	ijf.fw.CustomTypes.reduce(function(inObj,t){if(t.name==inField.referenceFilter) inObj=t; return inObj;},null);

			if(refCheck)
			{
				lookup = ijfUtils.getReferenceDataByName(inField.referenceFilter,"0", false, noSort);
			}
			else
			{
				//complex cascade...
				try
				{

					cLookupDef = JSON.parse(inField.referenceFilter);
					lookup = ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index, false, noSort);

					//establish a listener for this combo if necessary
					if(cLookupDef.parents)
					{
						var parentIds = cLookupDef.parents;
						var cFilters = parentIds.reduce(function(inFilter,p){
								inFilter.push({"property":p.dataIndex.toString(), "value":"tbd", "fieldName":p.fieldName});
								return inFilter;
							},[]);
						cListener["beforeQuery"] = function(query) {
									cFilters.forEach(function(f){
										//for each filter param, we need to get the correct value...
										var cValue = 'novaluetofilterwith';

										var ctl = ijfUtils.getControlByDataSource(f.fieldName);
										if(!ctl) ctl = ijfUtils.getControlByKey(f.fieldName);

										if(ctl) cValue = ctl.control.items.items[0].getValue();
										f.value=cValue;
									});
									this.store.clearFilter();
									this.store.filter(cFilters);
								};
					}
					//for each child, you need to clear it's value
					if(cLookupDef.children)
					{
						var childFields = cLookupDef.children;
						cListener["change"]= function(n,o,f)
						{
								childFields.forEach(function(f){
									var ctl = ijfUtils.getControlByDataSource(f);
									if(!ctl) ctl = ijfUtils.getControlByKey(f);

									if(ctl) cValue = ctl.control.items.items[0].setValue(null);
								});

								if(inField.dataSource=="session")
								{
									ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
								}
								else
								{
									ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
								}
								ocf(f,n,o);
						};
					}
				}
				catch(le)
				{
					ijfUtils.footLog("failed to handle complex lookup: " + le.message);
					lookups[col.columnName] = [];
				}
			}

			combo = {xtype: 'combobox',
					store: lookup,
					queryMode: 'local',
					labelAlign: 'left',
					labelStyle: l_labelStyle,
					style: l_panelStyle,
					fieldStyle: l_fieldStyle,
					fieldLabel: lCaption,
					hideLabel: hideLabel,
					typeAhead: true,
					typeAheadDelay: 200,
					selectOnTab: false,
					allowBlank: lAllowBlank,
					readOnly: rOnly,
					value: data,
					displayField: cLookupDef.index,
					valueField: cLookupDef.index,
					forceSelection: limitList,
					triggerAction: 'all',
					emptyText:'Please select...',
					selectOnFocus:true,
					id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
					listeners: cListener
					};

			break;
		default:

			switch(jfFieldDef.schema.type)
			{
				case "securitylevel":
				case "priority":
					var lookup = jfFieldMeta.allowedValues.map(function(e)
					{
							return [e.id,e.name];
					});
					break;
				case "status":
					var lookup = jfFieldMeta.transitions.map(function(e)
					{
							return [e.id,e.name];
					});
					lookup.push([data,item.fields.status.name]);
					break;
				case "option":
					var lookup = jfFieldMeta.allowedValues.map(function(e)
					{
							return [e.id,e.value];
					});
					break;
				default:
					var lookup = [];
					ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
			}

			combo = {xtype: 'combobox',
            store: lookup,
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			typeAhead: true,
			readOnly: rOnly,
			value: data,
			forceSelection: limitList,
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(inField.dataSource=="session")
					{
						ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
					}
					else
					{
						ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					}
					ocf(f,n,o);
				}
			}};
			break;
    }


    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        style: l_Style,
        items:[combo]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
},
 renderDropdownWithPicker:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup = ijfUtils.getReferenceDataByName(ref.name,ref.index);
            break;
        default:
			var lookup = jfFieldMeta.allowedValues.map(function(e)
			{
				return [e.id,e.value];
			});
     		break;
    }
    var pickListWindow = {};
	var openPicklistForm = function(inControl)
	{

       var colSettingsArray = [];
       var gridFieldArray=[];
	   var fType = 'list';

	   gridFieldArray.push({name: "value", type: "string"});
	   colSettingsArray.push({
				header: "Option Value",
				width: 'auto',
				dataIndex: "value",
				width: "100%",
				sortable: true,
				filter: {
				  type: 'string'
	            }
			});
		if(!Ext.ClassManager.isCreated(inField.dataSource + inField.formCell.replace(/,/g,"")))
		{
			Ext.define(inField.dataSource + inField.formCell.replace(/,/g,""), {
				extend: 'Ext.data.Model',
				fields: gridFieldArray
			});
		}
	 	var store = Ext.create('Ext.data.Store', {
			model: inField.dataSource + inField.formCell.replace(/,/g,""),
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}},
				autoLoad: false});
		var fLookup = lookup.map(function(e){
			return {"id":e[0],"value":e[1]};
		});
		store.proxy.data=fLookup;
		store.load();
		var pgrid= new Ext.grid.GridPanel({
			store: store,
			plugins: 'gridfilters',
			//style: l_panelStyle,
			height: 380,
			width: 580,
			inControl: inControl,
			columns: colSettingsArray,
			selModel: {selType: 'rowmodel', mode: 'SINGLE'},
			listeners: {
				'beforeitemdblclick': function(selMod, record, something ){
					var nVal = record.data.id;
					pickListWindow.close();
					this.inControl.items.items[0].setValue(nVal);
				}
			}
		});
		//need a grid of lookup, ID hidden, rest one column with string search
		pickListWindow = new Ext.Window({
            // layout: 'fit',
            closeAction:'destroy',
            title:  "Make Selection",
            width:  600,
            height: 400,
            closable: true,
            items:[pgrid],
            bodyStyle:'#fff',
            modal: true,
            inControl: inControl,
            layout:'fit',
            buttons:[{
                text:"Select",
                width: 80,
                handler: function(){
					    var thisUp = this.up().up();
						var nVal = thisUp.items.items[0].selection;
						pickListWindow.close();
						if(nVal) thisUp.inControl.items.items[0].setValue(nVal.data.id);
					}}
            ]
        });
        pickListWindow.show();
         pickListWindow.setY(window.pageYOffset+250);
	}

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;

	//from meta data, set readonly if we don't have the ability...
	if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;

	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        layout: 'hbox',
        items:[{xtype: 'combobox',
            store: lookup,
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			value: data,
			forceSelection: limitList,
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}},
			{
			            text: "(List)",
			            style:  "background:transparent;margin-top:4px;margin-left:4px",
                        xtype: "simplelink",
                        handler: function(){
							openPicklistForm(this.up());
						}
			}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
},

renderUserPicker:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  jfFieldMeta.allowedValues = [];
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  jfFieldDef.schema={};
		  jfFieldDef.schema.type="option";
		  jfFieldMeta.operations=true;
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
    }
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
	}

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup =  ijfUtils.getReferenceDataByName(ref.name,ref.index);
            break;
        default:

			var apiUrl = "/rest/api/2/user/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'users';
            if(inField.dataSource=="Assignee")
            {
	            apiUrl = "/rest/api/2/user/assignable/search";
	            fParam = "username";
	            xtrParam={project:inField.form.formSet.projectId};
	            uRoot = '';
			}

     		Ext.define('JiraUserModel', {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'displayName', type: 'string'}]
    		});
			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'userDropdownId',
				model: 'JiraUserModel',
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
		    });
		    //now you need to load the inital data:
			if(jf)
			{
				if(jf.displayName)
				{
					lookup.loadData([{"name":jf.key, "displayName":jf.displayName}]);
				}
				else
				{
					lookup.loadData([{"name":jf.key, "displayName":jf.key}]);
				}
			}
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    //from meta data, set readonly if we don't have the ability...
    if(!jfFieldMeta.operations) rOnly=true;

	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";



    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'combobox',
            store: lookup,
            displayField: 'displayName',
            valueField: 'name',
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			value: data,
			forceSelection: false,
			hideTrigger: true,
			triggerAction: 'all',
			queryMode: 'remote',
			queryParam: fParam,
			minChars: 2,
			emptyText:'Start typing...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(inField.dataSource=="session")
					{
						var vArr = f.valueCollection;
						if((vArr.items) && (vArr.items.length>0))
						{

							var usersObject = vArr.items.map(function(av){
								return {"email":av.data.email,"displayName":av.data.displayName};
							});
							ijf.session[inFormKey+'_fld_'+inField.formCell] = JSON.stringify(usersObject[0]);
						}
						else
						{
							ijf.session[inFormKey+'_fld_'+inField.formCell] = null;
						}

					}
					else
					{
						ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
				    }
					ocf(f,n,o);
				}
			}}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
        //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderUserMultiselect:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  jfFieldMeta.allowedValues = [];
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  jfFieldDef.schema={};
		  jfFieldDef.schema.type="option";
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
    }
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
    }
    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup =  ijfUtils.getReferenceDataByName(ref.name,ref.index);
            break;
        default:

            var apiUrl = "/rest/api/2/user/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'users';

     		Ext.define('JiraUserMultiModel', {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'displayName', type: 'string'}]
    		});
			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'userDropdownMultiId',
				model: 'JiraUserMultiModel',
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
		    });
			var cValue = [];
			try
			{
				if(data)
				{
					cValue = data.map(function(cv){return cv.name;});
					lookup.loadData(data.map(function(cv){return {name:cv.name, displayName:cv.displayName};}));
				}
			}
			catch(e)
			{
					try
					{
						var jData = JSON.parse(data);
						cValue = jData.map(function(cv){return cv.email;});
						lookup.initialStoreData = jData.map(function(cv){return {email:cv.email, displayName:cv.displayName};});
					}
					catch(e)
					{
						cValue = [];
					}
			}
     		break;
    }


    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'tagfield',
            store: lookup,
            filterPickList: true,
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			valueField: 'name',
			displayField: 'displayName',
			value: cValue,
			triggerAction: 'all',
			//selectOnFocus:false,
			forceSelection: true,
			queryMode: 'remote',
			queryParam: fParam,
			delimiter: ';',
			minChars: 2,
			emptyText:'Start typing...',
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(inField.dataSource=="session")
					{

						var vArr = f.valueCollection;
						if((vArr.items) && (vArr.items.length>0))
						{

							var usersObject = vArr.items.map(function(av){
								return {"email":av.data.email,"displayName":av.data.displayName};
							});
							ijf.session[inFormKey+'_fld_'+inField.formCell] = JSON.stringify(usersObject);
						}
						else
						{
							ijf.session[inFormKey+'_fld_'+inField.formCell] = null;
						}

					}
					else
					{
						ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
				    }
					ocf(f,n,o);
				}
			}}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderGroupPicker:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];

    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup =  ijfUtils.getReferenceDataByName(ref.name,ref.index);
            break;
        default:

			var apiUrl = "/rest/api/2/groups/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'groups';

     		Ext.define('JiraGroupModel', {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'html', type: 'string'}]
    		});
			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'groupDropdownId',
				model: 'JiraGroupModel',
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
		    });
		    //now you need to load the inital data:
			if(jf)  lookup.loadData([{"name":jf.name, "html":jf.name}]);
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'combobox',
            store: lookup,
            displayField: 'html',
            valueField: 'name',
			labelAlign: 'left',
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			value: data,
			forceSelection: true,
			hideTrigger: true,
			triggerAction: 'all',
			queryMode: 'remote',
			queryParam: fParam,
			minChars: 2,
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(!n) return;
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
        //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderGroupMultiselect:function(inFormKey,item, inField, inContainer)
{
    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    switch (inField.dataReference)
    {
        case "ijfReference":
            var ref = JSON.parse(inField.referenceFilter);
            //value only for now...
            if((ref.filter) && (ref.filter!="")) ref.filter.value = ijfUtils.replaceKeyValues(ref.filter.value,item);
            var lookup =  ijfUtils.getReferenceDataByName(ref.name,ref.index);
            break;
        default:

            var apiUrl = "/rest/api/2/groups/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'groups';

     		Ext.define('JiraGroupModelMulti', {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'html', type: 'string'}]
    		});
			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'groupDropdownMultiId',
				model: 'JiraGroupModelMulti',
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
		    });
			var cValue = [];
			if(data)
			{
				cValue = data.map(function(cv){return cv.name;});
				lookup.loadData(data.map(function(cv){return {name:cv.name, html:cv.name};}));
			}
     		break;
    }

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'tagfield',
            store: lookup,
            filterPickList: true,
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			valueField: 'name',
			displayField: 'html',
			value: cValue,
			triggerAction: 'all',
			//selectOnFocus:false,
			forceSelection: true,
			queryMode: 'remote',
			queryParam: fParam,
			minChars: 2,
			emptyText:'Please select...',
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					ocf(f,n,o);
				}
			}}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderMultiselect:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  if(inField.dataReference!="ijfReference") jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  jfFieldDef.schema={};
		  jfFieldDef.schema.type="option";
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		  if(data) data = data.map(function(v){return {"id":v};});
		  if(!data) data=inField.dataReference2;	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];
		var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
	}


    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;


    //manage cases for the lookups
    //case one, simple collect constraint
    //case two reference lookup
    var lookup = [];
	var cListener = {
						afterrender: function(f)
						{
							this.validate();
						},
						change: function(f,n,o){

							if(inField.dataSource=="session")
							{
								ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
							}
							else
							{
								ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
							}
							ocf(f,n,o);
						}
					};
    var limitList = true;
    if (inField.style.indexOf('limit:false')>-1)
    {
        limitList=false;
    }

    switch (inField.dataReference)
    {
        case "ijfReference":

		   //The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
			var cLookupDef = {"index":"0"};

			var refCheck = 	ijf.fw.CustomTypes.reduce(function(inObj,t){if(t.name==inField.referenceFilter) inObj=t; return inObj;},null);
			if(refCheck)
			{
				lookup = ijfUtils.getReferenceDataByName(inField.referenceFilter,"0",true);
				var cLookupDef = {"index":"0"};
			}
			else
			{
                var cLookupDef = JSON.parse(inField.referenceFilter);
                //value only for now...
        	    lookup =  ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index,true);
			}
            var lId = 0;
            //look for filter key, parent id that is, if exists, then add a filter to this animal

			if(cLookupDef.parent)
			{
				//yes filter....
				lookup = lookup.map(function(e)
				{
					return {id: lId++, show: e[cLookupDef.index], filterField:e[cLookupDef.parent.dataIndex]};
				});
				//switch the data value to the ID of the row containing, IF data is from jira and not session
				if(data)
				{
					if((typeof data)=="string")
					{
						data = JSON.parse(data);
						data = data.map(function(v){
							var valKey = lookup.reduce(function(inV,av){if(v==av.show) inV=av.id;return inV;},null);
							return {"id":valKey};
						});
					}
			    }

				var cFilters = [{"property":"filterField", "value":"tbd", "fieldName":cLookupDef.parent.fieldName}];

				cListener["beforeQuery"] = function(query) {
							cFilters.forEach(function(f){
								//for each filter param, we need to get the correct value...
								var cValue = 'novaluetofilterwith';

								var ctl = ijfUtils.getControlByDataSource(f.fieldName);
								if(!ctl) ctl = ijfUtils.getControlByKey(f.fieldName);

								if(ctl) cValue = ctl.control.items.items[0].getValue();
								f.value=cValue;
							});
							this.store.clearFilter();
							this.store.filter(cFilters);
						};
	            var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show','filterField'],
				  data: lookup
				});
			}
			else
			{
				//no filter
				lookup = lookup.map(function(e)
				{
					return {id: lId++, show: e[cLookupDef.index]};
				});
				//switch the data value to the ID of the row containing, IF data is from jira and not session
				if(data)
				{
					if((typeof data)=="string")
					{
						data = JSON.parse(data);
						/*
						data = data.map(function(v){
							var valKey = lookup.reduce(function(inV,av){if(v==av.show) inV=av.id;return inV;},null);
							return {"id":valKey};
						});
						*/
						data = data.reduce(function(inA,v){
							var valKey = lookup.reduce(function(inV,av){if(v==av.show) inV=av.id;return inV;},null);
							if(valKey!=null) inA.push({"id":valKey});
							else
							   if(!limitList) if(v) inA.push({"id":v});
							return inA;
						},[]);
					}
			    }
	            var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show'],
				  data: lookup
				});
			}

            break;
        default:

			if((jfFieldDef.schema.system=="components")
				|| (jfFieldDef.schema.system=="versions")
				|| (jfFieldDef.schema.system=="fixVersions"))
			{
				var lookup = jfFieldMeta.allowedValues.map(function(e)
				{
						return {id: e.id, show: e.name};
				});
				var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show'],
				  data: lookup
				});
			}
			else
			{
				var lookup = jfFieldMeta.allowedValues.map(function(e)
				{
						return {id: e.id, show: e.value};
				});
				var cValue = [];
				if(data) cValue = data.map(function(cv){return cv.id});
				var shows = Ext.create('Ext.data.Store', {
				  fields: ['id','show'],
				  data: lookup
				});
			}
     		break;
    }

    inField.ijfLookup = lookup;

    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }



    var ocf =  ijfUtils.getEvent(inField);

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;

		//from meta data, set readonly if we don't have the ability...
	if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;

	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items:[{xtype: 'tagfield',
            store: shows,
            filterPickList: true,
			labelStyle: l_labelStyle,
			style: l_panelStyle,
			fieldStyle: l_fieldStyle,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			forceSelection: limitList,
			valueField: 'id',
			displayField: 'show',
			value: cValue,
			delimiter: ";",
			queryMode: 'local',
			//forceSelection: limitList,
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			listeners: cListener
		}]
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);

    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderRadiogroup:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    var userReadOnly = false;
	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  jfFieldDef.schema={};
		  jfFieldDef.schema.type="option";
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		  if(data) data = data[Object.keys(data)[0]];
		  if(!data) data=inField.dataReference2;	}
	else
	{
      var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	  var jf=item.fields[jfFieldDef.id];
      var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

		//if status, the transitions are the field meta...
		if(jfFieldDef.schema.type=='status')
		{
			//cache this?
			if(!item.transitions)
			{
				item.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+item.key+'/transitions', null);
			}
			var jfFieldMeta = item.transitions;
		}
		else
		{
			var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		}

		//special handling for read only radio
		if(jfFieldMeta)	if(!jfFieldMeta.operations)
		{
			data = ijfUtils.handleJiraFieldType(jfFieldDef,jf,true,true);
			userReadOnly=true;
		}

	}

    var lAllowBlank = true;
    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }
    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

	var ocf =  ijfUtils.getEvent(inField);

	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_Style = inField.style;
	var l_fieldStyle = inField.fieldStyle;

	if(!l_labelStyle) l_labelStyle="background:transparent";
	if(!l_panelStyle) l_panelStyle="background:transparent";
	if(!l_Style) l_Style="background:transparent";
	if(!l_fieldStyle) l_fieldStyle="background:transparent; margin: 0 10 0 0";


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions


     var cColumns = ijfUtils.getNameValueFromStyleString(l_fieldStyle,'columns');
      if(!cColumns) cColumns = 2;

		switch(jfFieldDef.schema.type)
		{
			case "securitylevel":
			case "priority":
				var rOptions= jfFieldMeta.allowedValues.map(function(e)
				{
								return {id: "radio_" + jfFieldDef.id + "_" + e.id,
										boxLabel: e.name,
										value : (data==e.id) ?  true : false,
										style: l_fieldStyle,
										readOnly: rOnly,
										name: jfFieldDef.id,
										inputValue: e.id};
				 });
				break;
			case "status":
				var rOptions= jfFieldMeta.transitions.map(function(e)
				{
								return {id: "radio_" + jfFieldDef.id + "_" + e.id,
										boxLabel: e.name,
										value :  false,
										style: l_fieldStyle,
										name: jfFieldDef.id,
										readOnly: rOnly,
										inputValue: e.id};
				});
				rOptions.push({id: "radio_" + jfFieldDef.id + "_" + data,
										boxLabel: item.fields.status.name,
										value : true,
										style: l_fieldStyle,
										readOnly: rOnly,
										name: jfFieldDef.id,
										inputValue: data});
				break;
			case "option":
			    if(userReadOnly)
			    {
					var rOptoins = [];
					if(data){
						rOptions= [
										  {id: "radio_" + jfFieldDef.id + "_0",
																boxLabel: data,
																value : true,
																style: l_fieldStyle,
																readOnly: true,
																name: jfFieldDef.id,
											inputValue: 0}
						];
					}
				}
				else
				{
					var rOptions= jfFieldMeta.allowedValues.map(function(e)
					{
									return {id: "radio_" + jfFieldDef.id + "_" + e.id,
											boxLabel: e.value,
											value : (data==e.id) ?  true : false,
											style: l_fieldStyle,
											readOnly: rOnly,
											name: jfFieldDef.id,
											inputValue: e.id};
					 });
				}
				break;
			default:
				var rOptions = [];
				ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
		}

    var ocf =  ijfUtils.getEvent(inField);
    var hideField = ijfUtils.renderIfShowField(data,inField);



	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";
    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        style: l_Style,
        items:[{xtype: 'radiogroup',
            hidden: hideField,
			labelAlign: 'left',
			labelStyle: l_fieldStyle, //was panel style
			style: l_panelStyle,
  			columns: cColumns,
			fieldLabel: lCaption,
			hideLabel: hideLabel,
			allowBlank: lAllowBlank,
			readOnly: rOnly,
			selectOnFocus:true,
			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
			items: rOptions,
			listeners: {
				afterrender: function(f)
				{
					this.validate();
				},
				change: function(f,n,o){
					if(inField.dataSource=="session")
					{
						ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
					}
					else
					{
						ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					}
					ocf(f,n,o);
				}
			}}]
    });

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);



}
,renderWorkflowButtons:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];
    var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	//if status, the transitions are the field meta...
	if(jfFieldDef.schema.type=='status')
	{
		//cache this?
		if(!item.transitions)
		{
			item.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+item.key+'/transitions', null);
		}
		var jfFieldMeta = item.transitions;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
	}

    var lAllowBlank = true;

    var hideLabel = false;
    var lCaption = "";
    var rOnly = false;

	var ocf =  ijfUtils.getEvent(inField);

	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_Style = inField.style;
	var l_fieldStyle = inField.fieldStyle;

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	//end permissions

    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";


     var cColumns = ijfUtils.getNameValueFromStyleString(l_fieldStyle,'columns');
     if(!cColumns) cColumns = 2;

     var ocf =  ijfUtils.getEvent(inField);

	var workflowButtonsOptions= jfFieldMeta.transitions.map(function(e)
	{
		return {
			xtype: "button",
			text: e.name,
			margin: '0 4px 0 0',
			statusId: e.id,
			hidden: (!perms.canEdit),
			style: l_fieldStyle,
			handler: function(){
				   //verify that form is clean, if so,
				   //change to the new status and save....using a callback to on saveWithCallback
					if(!ocf(this)) return;
					if(!ijf.main.allControlsClean())
					{
					   ijfUtils.modalDialogMessage("Error", "The form has been modified, please save the form before changing the status.");
					   return;
					}

					var onSuccessSave = function()
					{
						if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
						ijf.currentItem=ijfUtils.getJiraIssueSync(item.key);
						ijf.main.resetForm();
					};

					var fields = {"status":{"id":this.statusId}};
				    ijf.main.saveBatch(onSuccessSave,fields, inField.form, item);
			}
		};
	});

    var hideField = ijfUtils.renderIfShowField(data,inField);

    var simple = new Ext.FormPanel({
        hidden: hideField,
        border:false,
        bodyStyle: l_Style,
        items: workflowButtonsOptions
    });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, inFormKey,item, inField, inContainer);
    simple.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderCheckbox:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

	if(inField.dataSource=="session")
	{
		  var jfFieldMeta = {};
		  jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
		  var jfFieldDef = {};
		  jfFieldDef.id=inField.formCell;
		  var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		  try
		  {
		  	if(!data) data=JSON.parse(inField.dataReference2);
	      }
	      catch(e) {}
	}
	else
	{
		  var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		  var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		  var jf=item.fields[jfFieldDef.id];
		  var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
	}


      var lAllowBlank = true;
      if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

      var hideLabel = false;
      if (inField.caption=="")
          var lCaption = inField.dataSource;
      else if(inField.caption=="none")
      {
          var lCaption = "";
          hideLabel=true;
      }
      else
          var lCaption = inField.caption;
      if (inField.style.indexOf('hidden:true')>-1)
      {
          hideLabel=true;
          hideField=true;
      }
      var rOnly = false;
      if (inField.fieldStyle.indexOf('readonly:true')>-1)
      {
          rOnly=true;
      }
      if (inField.style.indexOf('enteronce:true')>-1)
      {
          if (!!data) rOnly=true;
      }

  	var ocf =  ijfUtils.getEvent(inField);

  	var l_labelStyle = inField.labelStyle;
  	var l_panelStyle = inField.panelStyle;
  	var l_Style = inField.style;
  	var l_fieldStyle = inField.fieldStyle;


  	if(!l_labelStyle) l_labelStyle="background:transparent";
  	if(!l_panelStyle) l_panelStyle="background:transparent";
  	if(!l_Style) l_Style="background:transparent";
  	if(!l_fieldStyle) l_fieldStyle="background:transparent; margin: 0 10 0 0";

      var cColumns = ijfUtils.getNameValueFromStyleString(l_fieldStyle,'columns');
      if(!cColumns) cColumns = 2;

      var getChecked = function(inId)
      {
		  var retVal = false;
		  if(data) data.forEach(function(c){if(c.id==inId) retVal=true});
		  return retVal;
	  }

      var ocf =  ijfUtils.getEvent(inField);
      var hideField = ijfUtils.renderIfShowField(data,inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions
	if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";

    var rOptions= jfFieldMeta.allowedValues.map(function(e)
    {
  			     	return {id: "check_" + jfFieldDef.id + "_" + e.id,
  			     			boxLabel: e.value,
  			     			value : getChecked(e.id),
       						style: l_fieldStyle,
  			     			name: jfFieldDef.id,
  			     			readOnly: rOnly,
  			     			inputValue: e.id};
     });


      var simple = new Ext.FormPanel({
          hidden: hideField,
          border:false,
          bodyStyle: l_Style,
          items:[{xtype: 'checkboxgroup',
  			labelStyle: l_labelStyle,
  			style: l_panelStyle,
  			columns: cColumns,
  			fieldLabel: lCaption,
  			hideLabel: hideLabel,
  			allowBlank: lAllowBlank,
  			selectOnFocus:true,
  			id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
  			items: rOptions,
  			listeners: {
  				afterrender: function(f)
  				{
  					this.validate();
  				},
  				change: function(f,n,o){
					if(inField.dataSource=="session")
					{
	  					//somehow ijf.session needs the current values of this animal....
	  					//perhaps: up().items[], create lData and set session to it

	  					var newVals = f.items.items.reduce(function(iVal,e){
							if(e.value) iVal.push({"id":e.inputValue});
							return iVal;
						},[]);
						ijf.session[inFormKey+'_fld_'+inField.formCell]=newVals;

					}
					else
					{
	  					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					}
  					ocf(f,n,o);
  				}
  			}}]
      });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

      simple.render(inContainer);
      var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderButtonLink:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var hideField = ijfUtils.renderIfShowField(null,inField);

    var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";

        var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                style: l_panelStyle,
               handler: function(){
			                   var url =ijfUtils.replaceKeyValues(inField.dataSource,item);
			                   window.open(url);
            	}
            }
        });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderBlankbutton:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var hideField = ijfUtils.renderIfShowField(null,inField);

    var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

	//from meta data, set readonly if we don't have the ability...
	if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'hideIfReadOnly')=="true")
	{
		var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
		if(jfFieldMeta)	if(!jfFieldMeta.operations) hideField=true;
	}

	//end permissions

    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";

        var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                style: l_panelStyle,
                handler: function(){
					ijf.main.gEventControl=this.up().jField;
					ijf.main.gExtEventControl=this;
                    ocf();
                }
            }
        });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderXumenterbutton:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var hideField = ijfUtils.renderIfShowField(null,inField);

    var lCaption = inField.caption;

    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideField=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    //if(!l_labelStyle) l_labelStyle="background:transparent";
    //if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    //if(!l_fieldStyle) l_fieldStyle="background:white";

    var ocf =  ijfUtils.getEvent(inField);


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";

        var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                style: l_panelStyle,
                handler: function(){
					ijf.main.gEventControl=this.up().jField;

					//prep data
					var itemData={};
					if(ijf.jiraMeta.fields)
					{
						Object.keys(ijf.jiraMeta.fields).forEach(function(k)
						{
							if(ijf.currentItem.fields.hasOwnProperty(k))
							{
								var f = ijf.currentItem.fields[k];
								var v = ijfUtils.handleJiraFieldType(ijf.jiraMeta.fields[k],f,true,true);
								itemData[ijf.jiraMeta.fields[k].name]=v;
							}
						});
						//add special values:  key, status
						itemData["key"]=ijf.currentItem.key;
						itemData["status"]=ijf.currentItem.fields.status.name;
				    }

					//add ocf hook to alter data
					ocf(itemData);

					//get custom type, then load file detail, generate output, download
					var thisT = {};
					for(var tF in ijf.fw.CustomTypes){
						if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
						if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
					}
					if(thisT.customType!="FILE")
					{
						ijfUtils.modalDialogMessage("Error","Unable to get report file from types");
						return;
					}
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
            }
        });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple, item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderPopFormButton:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;
    if (inField.caption=="")
        var lCaption = inField.controlType;
    else
        var lCaption = inField.caption;

	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_Style = inField.style;
	var l_fieldStyle = inField.fieldStyle;

	if(!l_Style) l_Style="background:transparent";

    var hideField = ijfUtils.renderIfShowField("",inField);


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;

	//from meta data, set readonly if we don't have the ability...
	if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'hideIfReadOnly')=="true")
	{
		var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
		if(jfFieldMeta)	if(!jfFieldMeta.operations) hideField=true;
	}



    var ocf =  ijfUtils.getEvent(inField);

	var aWidth = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"width");
	var aHeight = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"height");
	var aTitle = ijfUtils.getNameValueFromStyleString(inField.panelStyle,"title");

	if(aWidth)
	{
		aWidth = aWidth.replace("px","").replace("%","")/1;
	}
	else
	{
		aWidth=300;
	}
	if(aHeight)
	{
		aHeight = aHeight.replace("px","").replace("%","")/1;
	}
	else
	{
		aHeight=300;
	}
    var xType = "button";
    if(l_labelStyle=="link") xType="simplelink";
    var simple = new Ext.FormPanel({
            border:false,
            hidden:hideField,
            bodyStyle: l_Style,
            jField: inField,
            items: {
                xtype: xType,
                text: lCaption,
                handler: function(){
					//bail if unsaved data
					if(window.onbeforeunload!=null)
                    {
						//unsaved data
						ijfUtils.modalDialogMessage("Info","Sorry but this form has unsaved data.  Please save then try again.");
						return;
					}
                    var action = {};
                    action.form = inField.dataSource;
                    //action.title = aTitle;
                    //action.width = aWidth;
                    //action.height = aHeight;
                    action.type = inField.dataReference;
                    //action.fieldStyle = inField.fieldStyle;
                    action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey,item,action)
                }
            }
        });
	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

	simple.render(inContainer);
	var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderTextarea:function(inFormKey,item, inField, inContainer)
{

    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }

    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle=tPt[0];
    }

    inContainer.title = inField.toolTip;



	    var lAllowBlank = true;
    if(inField.dataSource=="session")
    {
		var data = ijf.session[inFormKey+'_fld_'+inField.formCell];
		if((!data) && (inField.style.indexOf('query:true')<0)) data=inField.dataReference2;
	}
	else
	{
		var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
		var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
		var jf=item.fields[jfFieldDef.id];

		if(inField.dataReference == "html")
		{
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf,false,true);
		}
		else
		{
			var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);
		}
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
	}



        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

	    var lMaxsize =  Number.MAX_VALUE;

	    var lValidator = function(v){return true};
	    var lRegex =  inField.regEx;
	    if((lRegex!=null) && (lRegex!=""))
	    {
	        lValidator = function(v)
	        {
	            var rgx = new RegExp(lRegex);
	            if (!rgx.exec(v)) {
	                return inField.regExMessage;
	            }
	            return true;
	        }
	    }
	    var hideField = ijfUtils.renderIfShowField(data,inField);
	    var hideLabel = false;
	    if (inField.caption=="")
	        var lCaption = inField.dataSource;
	    else if(inField.caption=="none")
	    {
	        var lCaption = "";
	        hideLabel=true;
	    }
	    else
	        var lCaption = inField.caption;
	    if (inField.style.indexOf('hidden:true')>-1)
	    {
	        hideLabel=true;
	        hideField=true;
	    }
	    var rOnly = false;
	    if (inField.fieldStyle.indexOf('readonly:true')>-1)
	    {
	        rOnly=true;
	    }
	    if (inField.style.indexOf('enteronce:true')>-1)
	    {
	        if (!!data) rOnly=true;
	    }

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:white";


		//permissions check....has to exist...
		if(inField.permissions.enabled)
		{
			var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		else
		{
			if(inField.form.permissions.enabled)
				var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser);
			else
				var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		if((!rOnly) && (!perms.canEdit)) rOnly=true;
		if((!hideField) && (!perms.canSee))	hideField=true;

		//from meta data, set readonly if we don't have the ability...
		if(jfFieldMeta)	if((!jfFieldMeta.operations) && (inField.dataSource!="session")) rOnly=true;
		//end permissions

		if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";


		var collapsible = false;
		if (inField.style.indexOf('collapsible:true')>-1)
		{
			collapsible=true;
		}
		var collapsed = false;
		if (inField.style.indexOf('collapsed:true')>-1)
		{
			collapsed=true;
		}

		var panelTitle = "";
		if (inField.style.indexOf('panelTitle:')>-1)
		{
			panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
			var tPt = panelTitle.split(";");
			panelTitle=tPt[0];
		}

	    var ocf =  ijfUtils.getEvent(inField);

	    var simple = new Ext.FormPanel({
	        border:false,
	        hidden: hideField,
	        collapsible: collapsible,
	        collapsed: collapsed,
	        title: panelTitle,
	        width: 'auto',
	        height: 'auto',
	        bodyStyle: l_Style,
	        items:[{
	            xtype: 'textarea',
	            labelAlign: 'left',
	            labelStyle: l_labelStyle,
	            style: l_panelStyle,
	            fieldStyle: l_fieldStyle,
	            fieldLabel: lCaption,
	            hideLabel:  hideLabel,
	            allowBlank: lAllowBlank,
	            maxLength: lMaxsize,
	            validator: lValidator,
	            readOnly: rOnly,
	            value: data,
	            id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
	            listeners: {
	                afterrender: function(f)
	                {
	                    this.validate();
	                },
	                valid: function(f)
	                {
	                    inContainer.title = inField.toolTip;
	                },
	                invalid: function(f,msg){
	                    if(!inField.toolTip) inContainer.title = f.getErrors().join();
	                },
	                change: function(f,n,o){
						if(inField.dataSource=="session")
						{
							ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
						}
						else
						{
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
						}
						if(f.isValid())
						{
							ocf(f,n,o);
						}
	                }
	            }
	        }]
	    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

	    simple.render(inContainer);
	    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
 renderHtmleditor:function(inFormKey,item, inField, inContainer)
{

    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }

    var panelTitle = "";
    if (inField.style.indexOf('panelTitle:')>-1)
    {
        panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
        var tPt = panelTitle.split(";");
        panelTitle=tPt[0];
    }

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
    var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
	var jf=item.fields[jfFieldDef.id];

	var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf,false,true);

	    var lAllowBlank = true;
	    if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = (jfFieldMeta.required) ? false : true;
        if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

	    var lMaxsize =  Number.MAX_VALUE;

	    var lValidator = function(v){return true};
	    var lRegex =  inField.regEx;
	    if((lRegex!=null) && (lRegex!=""))
	    {
	        lValidator = function(v)
	        {
	            var rgx = new RegExp(lRegex);
	            if (!rgx.exec(v)) {
	                return inField.regExMessage;
	            }
	            return true;
	        }
	    }
	    var hideField = ijfUtils.renderIfShowField(data,inField);
	    var hideLabel = false;
	    if (inField.caption=="")
	        var lCaption = inField.dataSource;
	    else if(inField.caption=="none")
	    {
	        var lCaption = "";
	        hideLabel=true;
	    }
	    else
	        var lCaption = inField.caption;
	    if (inField.style.indexOf('hidden:true')>-1)
	    {
	        hideLabel=true;
	        hideField=true;
	    }
	    var rOnly = false;
	    if (inField.fieldStyle.indexOf('readonly:true')>-1)
	    {
	        rOnly=true;
	    }
	    if (inField.style.indexOf('enteronce:true')>-1)
	    {
	        if (!!data) rOnly=true;
	    }

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:white";

		var l_Height = 'auto';
		var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
		if(l_Height=="")
		{
			l_Height='auto';
		}
		else
		{
			l_Height = l_Height.replace("px","")/1;
		}
		var l_Width = 'auto';
		var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
		if(l_Width=="")
		{
			l_Width='auto';
		}
		else
		{
			l_Width = l_Width.replace("px","")/1;
		}


		//permissions check....has to exist...
		if(inField.permissions.enabled)
		{
			var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		else
		{
			if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		if((!rOnly) && (!perms.canEdit)) rOnly=true;
		if((!hideField) && (!perms.canSee))	hideField=true;
		//end permissions

		if(rOnly) l_fieldStyle=l_fieldStyle+";background:lightgray";


		var collapsible = false;
		if (inField.style.indexOf('collapsible:true')>-1)
		{
			collapsible=true;
		}
		var collapsed = false;
		if (inField.style.indexOf('collapsed:true')>-1)
		{
			collapsed=true;
		}

		var panelTitle = "";
		if (inField.style.indexOf('panelTitle:')>-1)
		{
			panelTitle = inField.style.substr(inField.style.indexOf('panelTitle:')+11);
			var tPt = panelTitle.split(";");
			panelTitle=tPt[0];
		}

	    var ocf =  ijfUtils.getEvent(inField);
        if(rOnly)
        {
			var simple = new Ext.FormPanel({
				labelAlign: 'left',
				border:false,
				hidden: hideField,
				bodyStyle: l_Style,
				items: {
					html: data,
					frame: false,
					border: false,
					bodyStyle:  l_panelStyle,
					xtype: "panel"}
			});
		}
		else
		{
			var simple = new Ext.FormPanel({
				border:false,
				hidden: hideField,
				//layout: 'fit',
				collapsible: collapsible,
				collapsed: collapsed,
				title: panelTitle,
				width: 'auto',
				height: 'auto',
				bodyStyle: l_Style,
				items:[{
					xtype: 'htmleditor',
					width: l_Width,
					height: l_Height,
					//frame: true,
					//labelAlign: 'left',
					//labelStyle: l_labelStyle,
					//style: l_panelStyle,
					//fieldStyle: l_fieldStyle,
					//fieldLabel: lCaption,
					//hideLabel:  hideLabel,
					//allowBlank: lAllowBlank,
					//maxLength: lMaxsize,
					//validator: lValidator,
					readOnly: rOnly,
					value: data,
					id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
					listeners: {
						afterrender: function(f)
						{
							this.validate();
						},
						valid: function(f)
						{
							inContainer.title = inField.toolTip;
						},
						invalid: function(f,msg){
							if(!inField.toolTip) inContainer.title = f.getErrors().join();
						},
						change: function(f,n,o){
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
							if(f.isValid())
							{
								ocf(f,n,o);
							}
						}
					}
				}]
			});
		}
	//allow for override of cleanHtml
	if(inField.dataReference2)
	{
		if(ijf.snippets[inField.dataReference2])
		simple.items.items[0].cleanHtml = ijf.snippets[inField.dataReference2]
	}

    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](simple,inFormKey,item, inField, inContainer);

	    simple.render(inContainer);
	    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, simple, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](simple, inFormKey,item, inField, inContainer);
}
,
renderItemList:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var editing = false;
    if (inField.fieldStyle.indexOf('edit:true')>-1)
    {
        editing = true;
    }

    var urlkey = false;
    if (inField.fieldStyle.indexOf('urlkey:true')>-1)
    {
        urlkey = true;
    }

    var enableLocking = false;
    if (inField.fieldStyle.indexOf('locking:true')>-1)
    {
        enableLocking = true;
    }

    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;


    var collapsible = false;
    if (inField.style.indexOf('collapsible:true')>-1)
    {
        collapsible=true;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }

	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;

    var dragdrop = false;
    var dragGroup = "gridDrag";
    var dropGroup = "gridDrop";
    var dragdropmessage = "Drag and drop to reorganize";
    var dragdropsnippet = null;
    if (inField.fieldStyle.indexOf('dragdrop:true')>-1)
    {
        dragdrop = true;
        dragGroup = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"draggroup");
        dropGroup = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dropgroup");
        dragdropmessage = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dragdropmessage");
        dragdropsnippet = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dragdropsnippet");
    }


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";

	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

   //item list may be query, related or child
   	   var colMeta = [];
   	   colMeta["key"]={"id":"key","name":"key","schema":{}};
   	   var dataItems =[];
   	   var jqlType = false;
   if(inField.dataSource=="related")
   {
	    var translateFields = inField.dataReference;
   		 dataItems = item.fields.issuelinks.map(function(ri){
				var i = {};
				if(ri.outwardIssue) i = ri.outwardIssue;
				if(ri.inwardIssue) i = ri.inwardIssue;
	   			var retObj ={};
	   			inField.dataReference.split(",").forEach(function(f){
	   				var thisField = f.trim();
	   				var dVal = "unknown";
	   				var jField = ijfUtils.getJiraFieldById(thisField);
	   				if(i.fields.hasOwnProperty(jField.id))
	   				{
	   					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
	   					//perhaps build the types here...
	   					colMeta[jField.id]=jField;
	   				}
	   				retObj[thisField]= dVal;
	   			});
	   			//retObj.iid=i.id;
	   			retObj.iid=i.key;
	   			retObj.key=i.key;
	   			return retObj;
		});
		dataItems = dataItems.sort(function(a, b)
		{
			var tv1 = a.iid.split("-")[1]/1;
		    var tv2  = b.iid.split("-")[1]/1;
		    return tv1>tv2 ? -1 : tv1<tv2 ? 1 : 0;
		});
   }
   else if(inField.dataSource=="children")
   {
	   var translateFields = inField.dataReference;
	   	   		 dataItems = item.fields.subtasks.map(function(i){
	   	   			var retObj ={};
	   	   			inField.dataReference.split(",").forEach(function(f){
	   	   				var thisField = f.trim();
	   	   				var dVal = "unknown";
	   	   				var jField = ijfUtils.getJiraFieldById(thisField);
	   	   				if(i.fields.hasOwnProperty(jField.id))
	   	   				{
	   	   					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
	   	   					//perhaps build the types here...
	   	   					colMeta[jField.id]=jField;
	   	   				}
	   	   				retObj[thisField]= dVal;
	   	   			});
	   	   			//retObj.iid=i.id;
	   	   			retObj.iid=i.key;
	   	   			return retObj;
		});
		dataItems = dataItems.sort(function(a, b)
		{
			var tv1 = a.iid.split("-")[1]/1;
		    var tv2  = b.iid.split("-")[1]/1;
		    return tv1>tv2 ? -1 : tv1<tv2 ? 1 : 0;
		});
   }
   else
   {
	   var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);
	   //get 1 row of data to set metadaa

	   //look for session vars for this itemList and handle
	   //syntax:    {"replace":[{"status":"Open"}],"remove":["status","maxResults"]]}
	   //roject=DJP and reporter = currentUser() order by key desc
	   var lds = inField.dataSource;
	   var qSet = function(inJqlStr,key,value)
	   {
		   var retStr = inJqlStr;
		   var orderBy = "";
		   var orderByIndex = retStr.search(/ order by/i);
		   if(orderByIndex > -1)
		   {
			   orderBy = retStr.substring(orderByIndex,retStr.length);
			   retStr=retStr.substring(0,orderByIndex);
		   }
           var inStr = retStr;
		   if(inStr.indexOf(key)>-1){
			  var startKey = inStr.indexOf(key);
			  var vStart = 0;
			  var vEnd = 0;
			  var vStartFound=false;
			  var inQuote = false;
			  for(var i=startKey;i<inStr.length;i++)
			  {
				  if(!vStartFound)
				  {
					  if(inStr[i]=="=")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if(inStr[i]=="~")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if(inStr[i]=="!")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if((vStart==0) && (i<inStr.length-7))
					  {
						//where >=
						if(inStr.substr(i,3).toUpperCase()==" >=")
						{
							vStart=i;
							vStartFound=true;
						}
						else if(inStr.substr(i,2).toUpperCase()==" >")
						{
							vStart=i;
							vStartFound=true;
						}
						if(inStr.substr(i,3).toUpperCase()==" <=")
						{
							vStart=i;
							vStartFound=true;
						}
						else if(inStr.substr(i,2).toUpperCase()==" <")
						{
							vStart=i;
							vStartFound=true;
						}


						//where IN
						if(inStr.substr(i,3).toUpperCase()==" IN")
						{
							vStart=i+1;
							vStartFound=true;
						}
						//where NOT IN
						if(inStr.substr(i,7).toUpperCase()==" NOT IN")
						{
							vStart=i+1;
							vStartFound=true;
						}
						//where IS
						if(inStr.substr(i,3).toUpperCase()==" IS")
						{
							vStart=i+1;
							vStartFound=true;
						}
						//where IS NOT
						if(inStr.substr(i,7).toUpperCase()==" IS NOT")
						{
							vStart=i+1;
							vStartFound=true;
						}
					  }
			      }
				  if((vStart>0) && (i<inStr.length-4))
				  {
					if(inStr[i]=="\"")
					{
						if(inQuote==true)
						{
							inQuote=false;
						}
						else
						{
							inQuote=true;
						}
					}
					if(inQuote) continue;

					if((inStr.substr(i,4).toUpperCase()==" AND") || (inStr.substr(i,4).toUpperCase()==" ORD"))
					{
						vEnd=i;
						break;
					}
				  }
			  }
			  if(vStart>0)
			  {
				  if(vEnd==0) vEnd=inStr.length;
	  			  vEnd=vEnd-vStart;
	  			  var tmpStr = inStr.substr(vStart,vEnd);
	  			  value = value.replace("!~","");
	  			  value = value.replace("~","");
				  retStr=inStr.replace(tmpStr,value);
			  }
		   }
		   else
		   {
			//it's an add

			if(value.toUpperCase().indexOf("NOT IN")>-1)
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if((value.toUpperCase().indexOf("IN(")>-1) || (value.toUpperCase().indexOf("IN (")>-1))
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if(value.toUpperCase().indexOf("LINKED")>-1)
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if(value.toUpperCase().indexOf(" IS ")>-1)
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if(value.indexOf("<")>-1)
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if(value.indexOf(">")>-1)
			{
				retStr = key + " " + value + " and " + inStr;
			}
			else if(value.toUpperCase().indexOf("~")>-1)
			{
				//~needs to be outside quote...
				if(value.indexOf("!~")>-1)
				{
					value = value.replace("!~","");
					retStr = key + " !~ " + value + " and " + inStr;
				}
				else
				{
					value = value.replace("~","");
					retStr = key + " ~ " + value + " and " + inStr;
				}
			}
			else
			{
				retStr = key + "=" + value + " and " + inStr;
			}
			//clean the and...
			 retStr = retStr.replace(/and *order/i,"order");

		   }
		   return retStr + orderBy;
	   };

	   var qRemove = function(inJqlStr,key)
	   {
		   var retStr = inJqlStr;

		   var orderBy = "";
		   var orderByIndex = retStr.search(/ order by/i);
		   if(orderByIndex > -1)
		   {
			   orderBy = retStr.substring(orderByIndex,retStr.length);
			   retStr=retStr.substring(0,orderByIndex);
		   }
           var inStr = retStr;
		   if(inStr.indexOf(key)>-1){
			  var startKey = inStr.indexOf(key);
			  var vStart = 0;
			  var vEnd = 0;
			  var vStartFound=false;
			  var inQuote = false;
			  for(var i=startKey;i<inStr.length;i++)
			  {
				  if(!vStartFound)
				  {
					  if(inStr[i]=="=")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if(inStr[i]=="~")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if(inStr[i]=="!")
					  {
						  vStart=i+1;
						  vStartFound=true;
					  }
					  if((vStart==0) && (i<inStr.length-7))
					  {
						//where >=
						if(inStr.substr(i,3).toUpperCase()==" >=")
						{
							vStart=i;
							vStartFound=true;
						}
						else if(inStr.substr(i,2).toUpperCase()==" >")
						{
							vStart=i;
							vStartFound=true;
						}
						if(inStr.substr(i,3).toUpperCase()==" <=")
						{
							vStart=i;
							vStartFound=true;
						}
						else if(inStr.substr(i,2).toUpperCase()==" <")
						{
							vStart=i;
							vStartFound=true;
						}


						//where IN
						if(inStr.substr(i,3).toUpperCase()==" IN")
						{
							vStart=i-1;
							vStartFound=true;
						}
						//where NOT IN
						if(inStr.substr(i,7).toUpperCase()==" NOT IN")
						{
							vStart=i-1;
							vStartFound=true;
						}
						//where LINKED
						if(inStr.substr(i,7).toUpperCase()==" LINKED")
						{
							vStart=i-1;
							vStartFound=true;
						}
						//where IS
						if(inStr.substr(i,3).toUpperCase()==" IS")
						{
							vStart=i+1;
							vStartFound=true;
						}
						//where IS NOT
						if(inStr.substr(i,7).toUpperCase()==" IS NOT")
						{
							vStart=i+1;
							vStartFound=true;
						}
					  }
			      }
				  if((vStart>0) && (i<inStr.length-4))
				  {
					if(inStr[i]=="\"")
					{
						if(inQuote==true)
						{
							inQuote=false;
						}
						else
						{
							inQuote=true;
						}
					}
					if(inQuote) continue;
					if((inStr.substr(i,4).toUpperCase()==" AND") || (inStr.substr(i,4).toUpperCase()==" ORD"))
					{
						vEnd=i;
						break;
					}
				  }
			  }
			  if(vStart>0)
			  {
				  if(vEnd==0) vEnd=inStr.length;
	  			  vEnd=vEnd-startKey;
	  			  var tmpStr = inStr.substr(startKey,vEnd);
				  retStr=inStr.replace(tmpStr,"");
				  //now look for and and
				  retStr = retStr.replace(/and *and/i,"and");
				  //look for and order
				  retStr = retStr.replace(/and *order/i,"order");
				  //and leading and
				  if(retStr.substr(0,5).toUpperCase()==" AND ")
				  	retStr = retStr.substr(5,retStr.length);
				  //and trailing and
				  retStr=retStr.trim();
				  if(retStr.substr(retStr.length-4,4).toUpperCase() == " AND")
				  	retStr = retStr.substr(0,retStr.length-4);
			  }
		   }
		   return retStr + orderBy;;
	   };

	   if(ijf.session.hasOwnProperty(inFormKey+'_fld_'+inField.formCell))
	   {
		   var filterObj = ijf.session[inFormKey+'_fld_'+inField.formCell];
		   if(filterObj.set)
		   {
			   filterObj.set.forEach(function(r){
			   		lds = qSet(lds,Object.keys(r)[0],r[Object.keys(r)[0]]);
			   });
	   	   }
	   	   if(filterObj.remove)
	   	   {
			   filterObj.remove.forEach(function(r){
					lds = qRemove(lds,r);
			   });
	       }
	       inField.dataSource=lds;
	   }

	  //debug, write jql to console
	  //console.log(lds);

        var tSearch = "jql="+lds+"&maxResults=1&fields="+translateFields;
 	    tSearch = ijfUtils.replaceKeyValues(tSearch,item);
		var aUrl = '/rest/api/2/search?'+tSearch;

        if(inField.form.formProxy=="true")
        {
			aUrl=aUrl.replace(/ /g,"%20");
 	   		var rawList = ijfUtils.getProxyApiCallSync(aUrl, inField.form.formSet.id);
	    }
	    else
	    {
		    var rawList = ijfUtils.jiraApiSync('GET',aUrl, null);
		}

       var totalResultRows = rawList.total;

       rawList.issues.forEach(function(i){
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					colMeta[jField.id]=jField;
				}
			});
		});

	   //if editing, construct the edit meta for the row returned
	   if(editing)
	   {
			var eKey = rawList.issues[0].key;
			if(!ijf.jiraEditMeta.hasOwnProperty(eKey))
			{
				//this must proxy as well, if the form is proxy
				if(inField.form.formProxy=="true")
				{
					//proxy auth
					ijf.jiraEditMeta[eKey] = ijfUtils.getProxyApiCallSync('/rest/api/2/issue/'+eKey+'/editmeta',thisForm.formSet.id);
					ijfUtils.footLog('Item edit meta aquired with proxy auth');
				}
				else
				{
					//normal
					ijf.jiraEditMeta[eKey] = ijfUtils.getJiraIssueMetaSync(eKey);
				}

				ijf.jiraEditMetaKeyed[eKey] = [];
				Object.keys(ijf.jiraEditMeta[eKey].fields).forEach(function(f)
				{
					ijf.jiraEditMetaKeyed[eKey][ijf.jiraEditMeta[eKey].fields[f].name]=ijf.jiraEditMeta[eKey].fields[f];
				});
			}
			var editMeta = ijf.jiraEditMetaKeyed[eKey];
			editMeta.transitions= ijfUtils.jiraApiSync('GET','/rest/api/2/issue/'+eKey+'/transitions', null);
	   }

	   jqlType = true;
   }

    if((inField.referenceFilter) & (!jqlType))
    {
        //filter the items...
        if(ijf.snippets.hasOwnProperty(inField.referenceFilter))
	        dataItems = ijf.snippets[inField.referenceFilter](dataItems);
    }

	//calculate column widths...and headers
	var colWidths=[];
	var colNames = translateFields.split(","); //inField.dataReference.split(",");
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	var colHeaders = [];
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");
	for (var i = 0; i<colNames.length;i++)
	{
		if(colWidths[i])
		{
			if(isNaN(colWidths[i]))
			{
				//it's a string...
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i];
			}
			else
			{
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i]/1;
			}
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].width=100;
		}

		if(colHeaders[i])
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colHeaders[i];
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colMeta[colNames[i]].name;
		}
	}



    var colSettingsArray = [];
    var gridFieldArray=[];
    //colSettingsArray.push(new Ext.grid.RowNumberer());
    //push iid as special first field...



    var updateGridQuiet = function(inId,inName,inValue)
    {
		var taskOrderKey = null;
		var iKey = inId;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;

		return ijfUtils.jiraApiSync("PUT",tApi,jData);
	}

    var updateGrid = function(container,inName,inValue)
    {
		var taskOrderKey = null;
		var iKey = container.grid.selection.data.iid;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;
		var cRow = container.grid.selection;//container.grid.selection.data.index;

        var onsuccess =  function(data,e,f) {
                 ijfUtils.footLog("Successful data response code: " + f.status);
                 if((f.status==200) || (f.status==201) || (f.status==204))
                 {
					var delayCommit = function() {cRow.commit()};
					window.setTimeout(delayCommit,300);
				 }
				 else
				 {
					 ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
				 }
        };
        var onerror = function(e) {
				 if(e.status==201)
                 {
				 	var delayCommit = function() {cRow.commit()};
					window.setTimeout(delayCommit,300);
				 }
                 else
                 {
                     ijfUtils.footLog("Failed data post: " + " "  + e.statusText);
                     ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
                 }
	    };
		ijfUtils.jiraApi("PUT",tApi,jData,onsuccess,onerror);
	}


    //look for key, hide if not there...
	var hideKey=true;
    if(inField.dataReference.indexOf("key")>-1) hideKey=false;

    gridFieldArray.push({name: "iid", type: "string"});
    colSettingsArray.push({
        header: "iid",
        dataIndex: "iid",
        hidden: true,
        style: l_labelStyle,
        width: 10
    });
    if(hideKey) delete colMeta["key"];
    /*
    gridFieldArray.push({name: "iid", type: "string"});
    colSettingsArray.push({
        header: colMeta["key"].header,
        dataIndex: "iid",
        hidden: hideKey,
        style: l_labelStyle,
        width: colMeta["key"].width,
        sortable: true
    });
	delete colMeta["key"];
 	*/

 	var colObj = {};

    Object.keys(colMeta).forEach(function(k){
		var f = colMeta[k];
		var hCol = false;
		if(f.width==0) hCol=true;
		if(f.schema.type=="date")
		{
			var editor = null;
			if(editing)
			{
				var editor = {
					completeOnEnter: true,
					field: {
						xtype: 'datefield',
						format: 'm/d/y',
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateGrid(container,n.name,moment(n.lastValue).format("YYYY-MM-DD"));
							}
						}
					}
				};
			}
			gridFieldArray.push({name: f.id, type: "date"});
			colObj={
				header: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				hidden: hCol,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				editor: editor,
				filter: {
				  type: 'date'
	            }
			};
		}
		else if(f.schema.type=="datetime")
		{
			var editor = null;
			if(editing)
			{
				if(f.id=="duedate")
				{
					var editor = {
						completeOnEnter: true,
						field: {
							xtype: 'datefield',
							format: 'm/d/y',
							listeners: {
								focusleave: function(n,o,f)
								{
									if(n.lastValue==n.originalValue) return;
									var container = n.up();
									if(!container) return;
									updateGrid(container,n.name,moment(n.lastValue).format("YYYY-MM-DD"));
								}
							}
						}
					};
				}
			}
			gridFieldArray.push({name: f.id, type: "date"});
			colObj={
				header: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				hidden: hCol,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				editor: editor,
				filter: {
				  type: 'date'
	            }
			};
		}
	else if(f.schema.type=="datetime")
		{
			var editor = null;
			if(editing)
			{
				if(f.id=="duedate")
				{
					var editor = {
						completeOnEnter: true,
						field: {
							xtype: 'datefield',
							format: 'm/d/y',
							listeners: {
								focusleave: function(n,o,f)
								{
									if(n.lastValue==n.originalValue) return;
									var container = n.up();
									if(!container) return;
									updateGrid(container,n.name,moment(n.lastValue).format("YYYY-MM-DD"));
								}
							}
						}
					};
				}
			}
			gridFieldArray.push({name: f.id, type: "date"});
			colObj={
				header: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				hidden: hCol,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				editor: editor,
				filter: {
				  type: 'date'
	            }
			};
		}
		else if(f.schema.type=="user")
		{
			var editor = null;
			if(editing)
			{

				var apiUrl = "/rest/api/2/user/picker";
				var	fParam = "query";
				var xtrParam = null;
				var uRoot = 'users';
				if(f.schema.system=="assignee")
				{
					apiUrl = "/rest/api/2/user/assignable/search";
					fParam = "username";
					xtrParam={project:inField.form.formSet.projectId};
					uRoot = '';
				}
     		    Ext.define('JiraUserModel'+f.id, {
			        extend: 'Ext.data.Model',
			        fields: [{name:'name', type: 'string'},
			                 {name: 'displayName', type: 'string'}]
    		    });

				var lookup = Ext.create('Ext.data.Store', {
					storeId: 'userDropdownId'+f.id,
					model: 'JiraUserModel'+f.id,
					autoLoad: false,
					proxy: {
						type: 'ajax',
						url: g_root + apiUrl,
						extraParams : xtrParam,
						filterParam: fParam,
						groupParam: '',
						limitParam: '',
						pageParam: '',
						sortParam: '',
						startParam: '',
						reader: {
							type: 'json',
							root: uRoot
						}
					}
				});

				var editor = {
					completeOnEnter: true,
					field: {xtype: 'combobox',
								store: lookup,
								displayField: 'displayName',
								valueField: 'name',
								labelAlign: 'left',
								value: f.id,
								hideTrigger: true,
								triggerAction: 'all',
								queryMode: 'remote',
								queryParam: fParam,
								minChars: 2,
								emptyText:'Start typing...',
								selectOnFocus:true,
								listeners: {
									focusleave: function(f,n,o){
										if(f.originalValue==f.value) return;
										var newVal = f.value;
										var container = f.up();
										if(!container) return;
										updateGrid(container,f.name,{"name":newVal});
									}
								}

					}
				};
			}
			gridFieldArray.push({name: f.id, type: "string"});
			colObj={
				header: f.header,
				dataIndex: f.id,
				sourceField: f,
				sortable: true,
				hidden: hCol,
				width: f.width,
				style: l_labelStyle,
				editor: editor,
				filter: {
				  type: 'list'
	            }
			};
		}
		else
		{
			//add editing capability...
			var editor = null;
			if((editing) && (f.schema.type!="status"))
			{
				if(f.id=="summary")
				{
					var editor = {
						completeOnEnter: true,
						field: {
							xtype:'textfield',
							//allowBlank: (col.required!="Yes"),
							listeners: {
								focusleave: function(n,o,f)
								{
									if(n.lastValue==n.originalValue) return;
									var container = n.up();
									if(!container) return;
									updateGrid(container,n.name,n.lastValue);
								}
							}
						}
					};
				}
			}
			var fType = 'list';
			if(f.id=="summary") fType='string';
			gridFieldArray.push({name: f.id, type: "string"});
			colObj={
				header: f.header,
				width: 'auto',
				dataIndex: f.id,
				hidden: hCol,
				width: f.width,
				style: l_labelStyle,
				sortable: true,
				editor: editor,
				filter: {
				  type: fType
	            }
			};
        }

	    //set widths here?
	   	ijfUtils.setColWidthForItemList(colObj);
		colSettingsArray.push(colObj);


	});


    //preap and apply actions.
    var actions=null;
    var aWidth = 10;
    try
    {
        actions = JSON.parse(inField.dataReference2);
    }
    catch(e){}
    if(actions)
    {
        var actionItems = [];
        for(var a in actions)
        {
            if(actions.hasOwnProperty(a))
            {
              switch(actions[a].action)
              {
                  case "popForm":
                      actionItems.push({icon   : actions[a].icon,
                              action: actions[a],
                              handler: function(grid, rowIndex, colIndex, itm) {
                              var rec = grid.getStore().getAt(rowIndex);
                              var thisId =rec.data.iid;
                              //var tItem = mwf_loadChildItemSynchronous(thisId);
                              //itm.action.inField = inField;
                              //renderPopupForm(inFormKey,tItem,itm.action)
                            }
                          });
                      break;
                  case "runSnippet":
                      actionItems.push({icon   : actions[a].icon,
                          action: actions[a],
                          handler: function(grid, rowIndex, colIndex, itm) {
                              try
                              {
                                  ijf.snippets[itm.action.snippet](grid, rowIndex, colIndex, itm);
                              }
                              catch(e)
                              {
                                  footLog("Failed snippet action: " + itm.action.snippet);
                              }
                          }
                      });
                      break;
                  case "openForm":
                      actionItems.push({icon   : actions[a].icon,
                          action: actions[a],
                          handler: function(grid, rowIndex, colIndex,itm) {

                              var rec = grid.getStore().getAt(rowIndex);
                              var thisId =rec.data.iid;
                              if(thisId==0)
                              {
                                  ijfUtils.modalDialogMessage("Error Message", "Unable to find Item id");
                              }
                              else
                              {
                                  if(window.onbeforeunload==null)
                                  {
										ijf.currentItem=null;
										ijf.main.itemId = thisId;
										window.g_formId=itm.action.form;;
										ijf.main.processSetup("ijfContent");
                                  }
                                  else
                                  {
                                      var dFunc = function(){
                                          window.onbeforeunload= null;
											ijf.currentItem=null;
											window.g_itemId= thisId;
											window.g_formId=itm.action.form;;
											ijf.main.processSetup("ijfContent");
                                      };
                                      ijfUtils.modalDialog("Warning",ijf.main.gNavigateOnChange,dFunc);
                                  }
                              }
                          }
                      });
                      break;
                  default:
                      ijfUtils.footLog("No action: " + actions[a].action);
              }
              aWidth = aWidth + 30;
            }
        }
        if(actionItems.length>0)
        {
			colSettingsArray.push({
				header: 'Actions',
				xtype: 'actioncolumn',
				width: aWidth,
				items: actionItems
			});
		}


    }
    if(!Ext.ClassManager.isCreated(inField.dataSource + inField.formCell.replace(/,/g,"")))
    {
        Ext.define(inField.dataSource + inField.formCell.replace(/,/g,""), {
            extend: 'Ext.data.Model',
            fields: gridFieldArray
        });
    }
    var itemsPerPage =1001;
    if(!jqlType)
    {
		var store = Ext.create('Ext.data.Store', {
			model: inField.dataSource + inField.formCell.replace(/,/g,""),
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}},
			autoLoad: false});
		store.proxy.data=dataItems;
		store.load();
    }
    else
    {
        itemsPerPage = 1001;
        var l_PageSize=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"paging");
		if(l_PageSize) itemsPerPage = l_PageSize/1;


        //if itemsPerPage > 10000, then pull all the data and disable paging and just load all the data.

        if(itemsPerPage > 99999)
        {
            //call it a few times...
            var tSearch = "jql="+lds+"&startAt=SEARCHSTART&maxResults=300&fields="+translateFields;
			tSearch = ijfUtils.replaceKeyValues(tSearch,item);
			var aUrl = '/rest/api/2/search?'+tSearch;

            var allDataArray = [];
            var startAt = 0;
            var loadData = function(inArray)
            {
                var tempUrl = aUrl.replace("SEARCHSTART",startAt);
				if(inField.form.formProxy=="true")
				{
					aUrl=aUrl.replace(/ /g,"%20");
					var rawList = ijfUtils.getProxyApiCallSync(tempUrl, inField.form.formSet.id);
				}
				else
				{
					var rawList = ijfUtils.jiraApiSync('GET',tempUrl, null);
				}

		        var totalResultRows = rawList.total;
				rawList.issues.forEach(function(i)
				{
					inArray.push(i);
				});
				startAt+=300;
				if(rawList.issues.length<300) return true;
				return false;

			}
			var dataLoaded = false;
			while(!dataLoaded) dataLoaded = loadData(allDataArray);

			var dataItems = allDataArray.map(function(i){
							var retObj ={};
							translateFields.split(",").forEach(function(f){
								var thisField = f.trim();
								var dVal = "unknown";
								var jField = ijfUtils.getJiraFieldById(thisField);
								if(i.fields.hasOwnProperty(jField.id))
								{
									dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
									//perhaps build the types here...
									colMeta[jField.id]=jField;
								}
								retObj[thisField]= dVal;
							});
							//retObj.iid=i.id;
							retObj.iid=i.key;
							retObj.key = i.key
							if(urlkey) retObj.key="<a href='/browse/"+i.key+"' target='_blank'>"+i.key+"</a>";

							return retObj;
						});
				if(ijf.snippets.hasOwnProperty(inField.referenceFilter)) dataItems = ijf.snippets[inField.referenceFilter](dataItems);

			var store = Ext.create('Ext.data.Store', {
				model: inField.dataSource + inField.formCell.replace(/,/g,""),
				proxy: {
					type: 'memory',
					reader: {
						type: 'json'
					}},
				autoLoad: false});
			store.proxy.data=dataItems;
			store.load();


		}
		else
		{
			var tSearch = "jql="+lds+"&fields="+translateFields;
			tSearch = ijfUtils.replaceKeyValues(tSearch,item);
			//var rawList = ijfUtils.jiraApiSync('GET','/rest/api/2/search?'+tSearch, null);

			var aUrl = '/rest/api/2/search?'+tSearch;
			var xtraParams = {};
			if(inField.form.formProxy=="true")
			{
				//aUrl = aUrl.replace(/ /g,"%20");
				xtraParams = {
					"ijfAction":"proxyApiCall",
					"url": encodeURI(aUrl.replace(/ /g,"%20")),
					"formSetId":inField.form.formSet.id
				}
				aUrl=g_root + "/plugins/servlet/iforms";
				//?ijfAction=proxyApiCall&formSetId="+inField.form.formSet.id+"&url="+encodeURI(aUrl);
			}

			var store = Ext.create('Ext.data.Store', {
				model: inField.dataSource + inField.formCell.replace(/,/g,""),
				pageSize: itemsPerPage,
				proxy: {
						type: 'ajax',
						url: aUrl,
						extraParams: xtraParams,
						reader: {
							type: 'json',
							rootProperty: 'issues',
							totalProperty: 'total',
							transform: function(data) {
									// do some manipulation of the raw data object

									var tFields = [];
									translateFields.split(",").forEach(function(f){
										var thisField = f.trim();
										var jField = ijfUtils.getJiraFieldById(thisField);
										tFields[thisField]=jField;
									});

									var dataItems = data.issues.map(function(i){
												var retObj ={};
												/*
												translateFields.split(",").forEach(function(f){
													var thisField = f.trim();
													var dVal = "unknown";
													var jField = ijfUtils.getJiraFieldById(thisField);
													if(i.fields.hasOwnProperty(jField.id))
													{
														dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
														//perhaps build the types here...
														colMeta[jField.id]=jField;
													}
													retObj[thisField]= dVal;
												});
												*/
												Object.keys(tFields).forEach(function(f){
													var jField = tFields[f];
													var dVal = "unknown";
													if(i.fields.hasOwnProperty(jField.id))
													{
														dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
														//perhaps build the types here...
														colMeta[jField.id]=jField;
													}
													retObj[f]= dVal;
												});

												//retObj.iid=i.id;
												retObj.iid=i.key;
												retObj.key = i.key
												if(urlkey) retObj.key="<a href='/browse/"+i.key+"' target='_blank'>"+i.key+"</a>";

												return retObj;
											});
									if(ijf.snippets.hasOwnProperty(inField.referenceFilter)) dataItems = ijf.snippets[inField.referenceFilter](dataItems);
									data.issues=dataItems;
									return data;
							}
						}
				},
				listeners: {"beforeload":function (store, operation, eOpts ) {
					var test = "here";
					operation._proxy.extraParams["maxResults"]= operation._limit;
					operation._proxy.extraParams["startAt"]= operation._start;
				}}
			});
			store.load({
						params: {
							limit: itemsPerPage,
							start: 0,
							// specify params for the first page load if using paging
							startAt: 0,
							maxResults: itemsPerPage,
						}
					});
	    }
	}


    var myBbar = null;
    if(itemsPerPage<1000)
    {
		myBbar={
				        xtype: 'pagingtoolbar',
				        displayInfo: true
    	};
	}

    if(editing)
    {
		var gridMenu = new Ext.menu.Menu({ items:
		[
             { text: 'Add', handler: function()  {

					//add the issue with "new item" summary and insert into grid no refresh...

					//Issue type and link type = referenceFilter:type
					//links:  normal,  child,  normal-related
					//[issuetype]:[normal|child|related]
					//normal and child require a currentItem
        			if(!inField.referenceFilter)
					{
						ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issuetype");
						return;
					}
					var iTypeParts = inField.referenceFilter.split(":");
					var iProject = iTypeParts[0];
					var iType = iTypeParts[1];
					var iLink = "normal";
					if(iTypeParts.length==3) iLink=iTypeParts[2];

					if((!iProject) || (!iType))
					{
						ijfUtils.modalDialogMessage("Error","Unable to determine project and type from reference filter.");
						return;
					}


					if((iLink=="child") || (iLink=="related"))
					{
						if(!ijf.currentItem)
						{
							ijfUtils.modalDialogMessage("Error","There must be a current item in memory for this type of add.");
							return;
						}
					}


					var putObj = {};
					putObj["fields"]={};
					putObj["fields"]["summary"]="(enter new summary here)";
        			putObj.fields.project = {"key":iProject};
        			//Parent ID and Issue Type must be set
        			putObj.fields.issuetype = {"name":iType};

        			if(iLink=="child")
        			{
						putObj["fields"]["parent"]={"key":ijf.currentItem.key};
					}

					var jData = JSON.stringify(putObj);
					var tApi = "/rest/api/2/issue";
					saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
					//saveRes is the Key of the new issue if successfull,
					if(saveRes.key)
					{
					   if(iLink=="related")
					   {
							//now create the relationship
							var jsonString = {
												"type": {
													"name": "Relates"
												   },
												"inwardIssue": {
													"key": ijf.currentItem.key
												   },
												"outwardIssue": {
													"key": saveRes.key
												   },
												"comment":{
													"body":"Linked related issue"
												  }
								};
								var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
								if(saveRelRes!="OK")
								{
									ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
									return;
								}
					   }

						//reload the current form....
					   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
					   window.setTimeout(resetForm,50);
					   return;

					}
					else
					{
						ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + saveRes);
					}
				} },
 				{text: 'Delete Task', handler: function()  {
					var rId = grid.selection.data.iid

					var delFunc = function()
					{
						var tApi = "/rest/api/2/issue/"+rId;
						var delRes = ijfUtils.jiraApiSync("DELETE",tApi,null);
						try
						{
							if(delRes=="OK")
							{
							   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
							   window.setTimeout(resetForm,50);
							   return;
							}
							else
							{
								ijfUtils.modalDialogMessage("Error","Unable to delete all the issue");
								return;
							}
						}
						catch(e)
						{
							ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the delete: " + e.message);
							return
						}
				    }
				    ijfUtils.modalDialog("Warning","You are about to permanently remove this item, continue?",delFunc);
				} }
		]});
	}

    var plugins = ['gridfilters'];
    if(editing)
    {
		plugins.push({
			ptype: 'cellediting',
			clicksToEdit: 1
        });
	}
    var bViewConfigPlugins = null;
    if(dragdrop==true)
    {
	    bViewConfigPlugins ={
						ptype: 'gridviewdragdrop',
						containerScroll: true,
						dragGroup: dragGroup,
						dropGroup: dropGroup,
						dragText: dragdropmessage
					};
    }


    var l_tbar=[];
    var lXtype="";
    var grid= new Ext.grid.GridPanel({
		title: lCaption,
        store: store,
        plugins: plugins,
        viewConfig: { plugins: bViewConfigPlugins},
        collapsible : collapsible,
        collapsed: collapsed,
        style: l_panelStyle,
        height: l_Height,
        width: "100%",
        layout: 'fit',
        ijfForm: inField,
        enableLocking: enableLocking,
        columns: colSettingsArray,
        selModel: {selType: 'rowmodel', mode: 'SINGLE'},
        bbar: myBbar,
        listeners: {
            'beforedrop': function(node, data, overModel, dropPosition, dropHandlers) {
                //dropHandlers.wait = true;
                //debugger;
                if(dragdropsnippet)
                {
					if(ijf.snippets[dragdropsnippet])
					{
						ijf.snippets[dragdropsnippet](node, data, overModel, dropPosition, dropHandlers);
					}
					else
					{
						dropHandlers.cancelDrop();
					}
				}
				else dropHandlers.cancelDrop();
			},
            'selectionchange':  function(selMod, record, something ){
				//if event,
					//see if name = form, if so, set the item to this selectoin and render form
					//look for event by name, then run if there...
				try
				{
                	ijf.main.gItemSectionGridIndex = record[0].data.iid;
				}
				catch(e)
				{
					return;
				}
				var tEvent = this.ijfForm.event;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record[0].data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record[0].data.iid,this);
					return;
				}

				//look for popform: xxx and pop the form
				tEvent=tEvent.replace("popform:","");
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
 				    var action = {};
					action.form = tEvent;
					action.type = "open item";
					action.itemId = record.data.iid;
					action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey, item, action)
					return;
				}

            },
			'beforeitemdblclick': function(selMod, record, something ){
                ijf.main.gItemSectionGridIndex = record.data.iid;
				var tEvent = this.ijfForm.tableDblClick;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijfUtils.showProgress();
					var renderForm = function(){
						ijf.currentItem=null;
						ijf.main.itemId= record.data.iid;
						window.g_formId=tEvent;
						ijf.main.processSetup("ijfContent");
					}
					window.setTimeout(renderForm,50);
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record.data.iid,this, record);
					return;
				}
				//look for popform: xxx and pop the form
				tEvent=tEvent.replace("popform:","");
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
 				    var action = {};
					action.form = tEvent;
					action.type = "open item";
					action.itemId = record.data.iid;
					action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey, item, action)
					return;
				}
			}
		}
    });
    var layout = new Ext.Panel({
        //title: lCaption,
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: "100%",
        layout: 'fit',
        //layoutConfig: {
        //    columns: 1
        //},
        style: l_Style,
        items: [grid]
    });


	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);

	if(editing)
	{
		grid.getEl().on('contextmenu', function(e) {
				e.preventDefault();
				gridMenu.showAt(e.clientX+window.pageXOffset,e.clientY+window.pageYOffset);
		});
	}

},

renderItemTree:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var hideField = ijfUtils.renderIfShowField("",inField);


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;


    var collapsible = true;
    if (inField.style.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";

	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

   //item list may be query, related or child
   	   var colMeta = [];
   	   colMeta["key"]={"id":"key","name":"key","schema":{}};
   	   var dataItems =[];

	    var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);
	    var lJql = ijfUtils.replaceKeyValues(inField.dataSource,item);
		var tSearch = "jql="+lJql+"&fields="+translateFields+",issuelinks";

		var rawList = ijfUtils.jiraApiSync('GET','/rest/api/2/search?'+tSearch, null);
		//bail if dataItems not

		var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
					//perhaps build the types here...
					colMeta[jField.id]=jField;
				}
				retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;

			if(i.fields.issuelinks.length > 0)
			{
				//set an issues parent assignments
				retObj.parents = i.fields.issuelinks.reduce(function(inParents,link)
				{
					if(link.inwardIssue)
					{
						inParents.push(link.inwardIssue.key);
					}
					return inParents;
				},[]);
			}
			retObj.leaf = true;
			return retObj;
		});

        var taskOrderKey = Object.keys(colMeta).reduce(function(inV,c)
        {
			if(colMeta[c].name=="taskOrder") inV=colMeta[c].id;
			return inV;},null);
        //now rip through and set parent assignments,
        dataItems.forEach(function(i){
			if(i.parents)
			{
				i.parents.forEach(function(pKey){
					dataItems.forEach(function(p){
						if(p.iid==pKey)
						{
							//this is parent of i
							i.moved=true;
							p.leaf=false;
							if(p.children)	p.children.push(i);
							else p.children = [i];
						}
					});
				});
			}
		});
		//reduce moved
		dataItems = dataItems.reduce(function(inArray,i){
			if(i.moved) return inArray;
			inArray.push(i);
			return inArray;
		},[]);

    //add sort function to all nodes...if taskOrder is included...
    if(tSearch.indexOf("taskOrder")>-1)
    {
		dataItems.forEach(function(i){
			i.sort = function(a,b)
			{
				return(a[taskOrderKey]-b[taskOrderKey]);
			};
		});
	}

   //data items are here, you now need to restructure into a tree based on Item relations...
    if(inField.referenceFilter)
    {
        //filter the items...
        if(ijf.snippets.hasOwnProperty(inField.referenceFilter))
	        dataItems = ijf.snippets[inField.referenceFilter](dataItems);
    }

	//calculate column widths...and headers
	var colWidths=[];
	var colNames = translateFields.split(","); //inField.dataReference.split(",");
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	var colHeaders = [];
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");
	for (var i = 0; i<colNames.length;i++)
	{
		if(colWidths[i])
		{
			if(isNaN(colWidths[i]))
			{
				//it's a string...
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i];
			}
			else
			{
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i]/1;
			}
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].width=100;
		}

		if(colHeaders[i])
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colHeaders[i];
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colMeta[colNames[i]].name;
		}
	}

    var updateTreeQuiet = function(inId,inName,inValue)
    {
		var taskOrderKey = null;
		var iKey = inId;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;

		return ijfUtils.jiraApiSync("PUT",tApi,jData);
	}
    var updateTree = function(container,inName,inValue)
    {
		var taskOrderKey = null;
		var iKey = container.grid.selection.data.iid;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;
		var cRow = container.grid.selection;//container.grid.selection.data.index;

        var onsuccess =  function(data,e,f) {
                 ijfUtils.footLog("Successful data response code: " + f.status);
                 if((f.status==200) || (f.status==201) || (f.status==204))
                 {
					var delayCommit = function() {
						cRow.commit()
					};
					window.setTimeout(delayCommit,300);
				 }
				 else
				 {
					 ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
				 }
        };
        var onerror = function(e) {
				 if(e.status==201)
                 {
				 	var delayCommit = function() {cRow.commit()};
					window.setTimeout(delayCommit,300);
				 }
                 else
                 {
                     ijfUtils.footLog("Failed data post: " + " "  + e.statusText);
                     ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
                 }
	    };
		ijfUtils.jiraApi("PUT",tApi,jData,onsuccess,onerror);
	}



    var colSettingsArray = [];
    var gridFieldArray=[];
    //colSettingsArray.push(new Ext.grid.RowNumberer());
    //push iid as special first field...

    //look for key, hide if not there...
	var hideKey=true;
    if(inField.dataReference.indexOf("key")>-1) hideKey=false;
	var kWidth = 150;
	if(colMeta.key) kWidth = colMeta.key.width/1;
    gridFieldArray.push({name: "iid", type: "string"});
    colSettingsArray.push({
		xtype: 'treecolumn',
        text: colMeta["key"].header,
        dataIndex: "iid",
        hidden: hideKey,
        //flex: 1,
        style: l_labelStyle,
        width: kWidth,
        sortable: true
    });
	delete colMeta["key"];

    var colObj={};

    Object.keys(colMeta).forEach(function(k){
		var f = colMeta[k];
		if(f.schema.type=="date")
		{
			gridFieldArray.push({name: f.id, type: "date"});
			colObj ={
				text: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				editor: {
					completeOnEnter: true,
					field: {
						xtype: 'datefield',
						format: 'm/d/y',
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,moment(n.lastValue).format("YYYY-MM-DD"));
							}
						}
					}
				},
				filter: {
				  type: 'date'
	            }
			};
		}
		else if(f.schema.type=="option")
		{
			//need metadata of the tree issues

			var eKey = dataItems[0].iid;
			if(!ijf.jiraEditMeta.hasOwnProperty(eKey))
			{
				//this must proxy as well, if the form is proxy
				if(inField.form.formProxy=="true")
				{
					//proxy auth
					ijf.jiraEditMeta[eKey] = ijfUtils.getProxyApiCallSync('/rest/api/2/issue/'+eKey+'/editmeta',thisForm.formSet.id);
					ijfUtils.footLog('Item edit meta aquired with proxy auth');
				}
				else
				{
					//normal
					ijf.jiraEditMeta[eKey] = ijfUtils.getJiraIssueMetaSync(eKey);
				}

				ijf.jiraEditMetaKeyed[eKey] = [];
				Object.keys(ijf.jiraEditMeta[eKey].fields).forEach(function(f)
				{
					ijf.jiraEditMetaKeyed[eKey][ijf.jiraEditMeta[eKey].fields[f].name]=ijf.jiraEditMeta[eKey].fields[f];
				});
			}

			var lookup = ijf.jiraEditMeta[eKey].fields[f.id].allowedValues.map(function(e)
			{
				return [e.id,e.value];
			});

			gridFieldArray.push({name: f.id, type: "string"});
            colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				sortable: true,
				filter: {
				  type: 'list'
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'combobox',
						store: lookup,
						allowBlank: true,
						forceSelection: true,
						displayField: 1,
						valueField: 0,
						listeners: {
							focusenter: function(f,o,n)
							{
									var container = f.up();
									var curVal = container.grid.selection.get(f.name);
									f.setValue(f.store.getData().items.reduce(function(inVal,i){if(i.data.field2==curVal) inVal=i.data.field1; return inVal;},null));
							},
							focusleave: function(f,o,n)
							{
									var newVal = f.value;
									var container = f.up();
									if(!container) return;
									if(container.grid.selection.get(f.name)==newVal) return;
									var tUpdate = function(){container.grid.selection.set(f.name,f.rawValue);}
									window.setTimeout(tUpdate,20);
									var uVal = {"id":newVal};
									if(!newVal) uVal=null;
									updateTree(container,f.name,uVal);
							}
						}
					}
				}

			};

		}
		else if(f.schema.type=="datetime")
		{
			gridFieldArray.push({name: f.id, type: "date"});
			colObj ={
				text: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: true,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				filter: {
				  type: 'date'
	            }
			};
		}
		else  if(f.schema.type=="number")
		{
			gridFieldArray.push({name: f.id, type: "number"});
			var hideIt = false;
			if(f.id==taskOrderKey) hideIt=true;
			colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				style: l_labelStyle,
				sortable: true,
				hidden: hideIt,
				filter: {
				  type: fType
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'numberfield',
						//allowBlank: (col.required!="Yes"),
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,n.lastValue);
							}
						}
					}
				}

			};
        }
        else if(f.schema.type=="user")
		{
			var editor = null;

			var apiUrl = "/rest/api/2/user/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'users';
			if(f.schema.system=="assignee")
			{
				apiUrl = "/rest/api/2/user/assignable/search";
				fParam = "username";
				xtrParam={project:inField.form.formSet.projectId};
				uRoot = '';
			}
			Ext.define('JiraUserModel'+f.id, {
				extend: 'Ext.data.Model',
				fields: [{name:'name', type: 'string'},
						 {name: 'displayName', type: 'string'}]
			});

			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'userDropdownId'+f.id,
				model: 'JiraUserModel'+f.id,
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
			});

			var editor = {
				completeOnEnter: true,
				field: {xtype: 'combobox',
							store: lookup,
							displayField: 'displayName',
							valueField: 'name',
							labelAlign: 'left',
							value: f.id,
							hideTrigger: true,
							triggerAction: 'all',
							queryMode: 'remote',
							queryParam: fParam,
							minChars: 2,
							emptyText:'Start typing...',
							selectOnFocus:true,
							listeners: {
								focusleave: function(f,n,o){
									if(f.originalValue==f.value) return;
									var newVal = f.value;
									var container = f.up();
									if(!container) return;
									updateTree(container,f.name,{"name":newVal});
								}
							}

				}
			};

			gridFieldArray.push({name: f.id, type: "string"});
			colObj ={
				header: f.header,
				dataIndex: f.id,
				sourceField: f,
				sortable: true,
				width: f.width,
				style: l_labelStyle,
				editor: editor,
				filter: {
				  type: 'list'
	            }
			};
		}
		else
		{
			var fType = 'list';
			if(f.id=="summary") fType='string';
			gridFieldArray.push({name: f.id, type: "string"});
			colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				style: l_labelStyle,
				sortable: true,
				filter: {
				  type: fType
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'textfield',
						//allowBlank: (col.required!="Yes"),
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,n.lastValue);
							}
						}
					}
				}

			};
        }

        //set widths here?
		ijfUtils.setColWidthForItemList(colObj);
		colSettingsArray.push(colObj);
	});

    //preap and apply actions.
    var actions=null;
    var aWidth = 10;

    if(!Ext.ClassManager.isCreated(inField.dataSource + inField.formCell.replace(/,/g,"")))
    {
        Ext.define(inField.dataSource + inField.formCell.replace(/,/g,""), {
            extend: 'Ext.data.Model',
            fields: gridFieldArray
        });
    }
    var store = Ext.create('Ext.data.TreeStore', {
        model: inField.dataSource + inField.formCell.replace(/,/g,""),
        root: {
			 	expanded:true,
			 	children: dataItems
			},
		sorters: [{
					property: taskOrderKey,
					direction: 'ASC'}]
	});
	var treeMenu = new Ext.menu.Menu({ items:
		[
			{ text: 'Add Child Task', handler: function()  {
					var rId = tree.selection.data.iid
					//add the issue with "new item" summary and insert into grid no refresh...
					var putObj = {};
					putObj["fields"]={};
					putObj["fields"]["summary"]="new item";
        			putObj.fields.project = {"key":inField.form.formSet.projectId};

        			//Parent ID and Issue Type must be set
        			if(!inField.referenceFilter)
					{
						ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
						return;
					}
        			putObj.fields.issuetype = {"name":inField.referenceFilter};
        			putObj["fields"]["parent"]={"key":ijf.currentItem.key};

					var jData = JSON.stringify(putObj);
					var tApi = "/rest/api/2/issue";
					saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
					//saveRes is the Key of the new issue if successfull,
					//set the relationship and reload
					try
					{
						if(saveRes.key)
						{
							var jsonString = {
											"type": {
												"name": "Relates"
											   },
											"inwardIssue": {
												"key": rId
											   },
											"outwardIssue": {
												"key": saveRes.key
											   },
											"comment":{
												"body":"Linked related issue"
											  }
							};
							var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
							if(saveRelRes!="OK")
							{
								ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
								return;
							}
							var rec = Ext.create(tree.store.model);
							rec.data.iid=saveRes.key;
							rec.data.text=saveRes.key;
							rec.data.summary= "new item";
							//refresh the grid....
							tree.selection.appendChild(rec);
							tree.selection.expand();
						}
						else
						{
							ijfUtils.modalDialogMessage("Error","Unable to add the issue");
						}
					}
					catch(e)
					{
						ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + e.message);
					}


				} },
                { text: 'Add Peer Task', handler: function()  {
					var rId = tree.selection.data.iid
					//add the issue with "new item" summary and insert into grid no refresh...
					var putObj = {};
					putObj["fields"]={};
					putObj["fields"]["summary"]="new item";
        			putObj.fields.project = {"key":inField.form.formSet.projectId};
        			//Parent ID and Issue Type must be set
        			if(!inField.referenceFilter)
					{
						ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
						return;
					}
        			putObj.fields.issuetype = {"name":inField.referenceFilter};
        			putObj["fields"]["parent"]={"key":ijf.currentItem.key};

					var jData = JSON.stringify(putObj);
					var tApi = "/rest/api/2/issue";
					saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
					//saveRes is the Key of the new issue if successfull,
					//set the relationship and reload
	 				var pNode = tree.selection.parentNode;
					try
					{
						if(saveRes.key)
						{
							//if parant NOT Root.  Set the parent to the current selection parent....
							if(pNode.data.text!="Root")
							{
								var jsonString = {
												"type": {
													"name": "Relates"
												   },
												"inwardIssue": {
													"key": pNode.data.iid
												   },
												"outwardIssue": {
													"key": saveRes.key
												   },
												"comment":{
													"body":"Linked related issue"
												  }
								};
								var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
								if(saveRelRes!="OK")
								{
									ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
									return;
								}
						    }
						   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
						   window.setTimeout(resetForm,50);
						   return;
							/*
							var rec = Ext.create(tree.store.model);
							rec.data.iid=saveRes.key;
							rec.data.text=saveRes.key;
							rec.data.summary= "new item";
							//refresh the grid....
							pNode.appendChild(rec);
							*/
						}
						else
						{
							ijfUtils.modalDialogMessage("Error","Unable to add the issue");
						}
					}
					catch(e)
					{
						ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + e.message);
					}
				} },
                { text: 'Add Root Task', handler: function()  {

					//add the issue with "new item" summary and insert into grid no refresh...
					var putObj = {};
					putObj["fields"]={};
					putObj["fields"]["summary"]="new item";
        			putObj.fields.project = {"key":inField.form.formSet.projectId};
        			//Parent ID and Issue Type must be set
        			if(!inField.referenceFilter)
					{
						ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
						return;
					}
        			putObj.fields.issuetype = {"name":inField.referenceFilter};
        			putObj["fields"]["parent"]={"key":ijf.currentItem.key};

					var jData = JSON.stringify(putObj);
					var tApi = "/rest/api/2/issue";
					saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
					//saveRes is the Key of the new issue if successfull,
					if(saveRes.key)
					{
						//reload the current form....
					   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
					   window.setTimeout(resetForm,50);
					   return;
						/*
						var rec = Ext.create(tree.store.model);
						rec.data.iid=saveRes.key;
						rec.data.text=saveRes.key;
						rec.data.summary= "new item";
						//refresh the grid....
						tree.store.root.appendChild(rec);
						*/
					}
					else
					{
						ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + saveRes);
					}
				} },
 				{text: 'Delete Task', handler: function()  {
					var rId = tree.selection.data.iid

					var delFunc = function()
					{
						var delKeys = [];
						var getKeys = function(inNode){if(inNode.data.iid) delKeys.push(inNode.data.iid); inNode.childNodes.forEach(function(n){getKeys(n)});};
						getKeys(tree.selection);
						delKeys.reverse();
						delKeys.forEach(function(k)
						{
							var tApi = "/rest/api/2/issue/"+k;
							var delRes = ijfUtils.jiraApiSync("DELETE",tApi,null);
							try
							{
								if(delRes=="OK")
								{
								   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
								   window.setTimeout(resetForm,50);
								   return;
								}
								else
								{
									ijfUtils.modalDialogMessage("Error","Unable to delete all the issues");
									return;
								}
							}
							catch(e)
							{
								ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the delete: " + e.message);
								return
							}
						});
				    }
				    ijfUtils.modalDialog("Warning","You are about to permanently remove this item and it's children, continue?",delFunc);
				} }
		]});

   //alter if edit exists
	if(inField.tableDblClick)
	{
		treeMenu.add(
   			{ text: 'Edit Task', handler: function()  {
   					var rId = tree.selection.data.iid
   					ijf.main.gItemSectionGridIndex = rId;
   					var tEvent = tree.ijfForm.tableDblClick;
   					tEvent=tEvent.replace("popform:","");
   					if(ijf.fw.forms.hasOwnProperty(tEvent))
   					{
   						var action = {};
   						action.form = tEvent;
   						action.type = "open item";
   						action.itemId = rId;
   						action.inField = inField;
   						ijf.extUtils.renderPopupForm(inFormKey, item, action)
   						return;
   					}
				} });
     }


	//alter tree menue to only show order options if "taskOrder" exists in query

	var refCheck = 	Object.keys(colMeta).reduce(function(inV,c){if(colMeta[c].name=="taskOrder") inV=true; return inV;},false);
	if(refCheck)
	{
		treeMenu.add({  text: 'Move Up', handler: function()  {
					var rId = tree.selection.data.iid
					//find out it it's order and flip it's order with the node above
					var cNode = tree.selection;
	 				var pNode = tree.selection.parentNode;

					var cOrder = cNode.data[taskOrderKey];
					var switchOrder = -999999999;
					var switchWith = null;
					//switch orders with the one just above.
					pNode.childNodes.forEach(function(n)
					{
						if((n.data.iid!=rId)&&(n.data[taskOrderKey] <= cOrder))
						{
							if(n.data[taskOrderKey] > switchOrder)
							{
								switchOrder = n.data[taskOrderKey];
								switchWith = n;
							}
						}
					});
					if(switchWith)
					{
						//two updates, the refresh tree.
						if(switchOrder == cOrder) switchOrder=switchOrder-1;
						var res = updateTreeQuiet(cNode.data.iid,taskOrderKey,switchOrder);
						var res2 = updateTreeQuiet(switchWith.data.iid,taskOrderKey,cOrder);
						if((res!="OK") || (res2!="OK"))
						{
							ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, try again.");
						}
						else
						{
							cNode.set(taskOrderKey,switchOrder);
							cNode.commit();
							switchWith.set(taskOrderKey,cOrder);
							switchWith.commit();
							pNode.sort();
						}
					}
				} });
treeMenu.add({  text: 'Move Down', handler: function()  {
					var rId = tree.selection.data.iid
					//find out it it's order and flip it's order with the node above
					var cNode = tree.selection;
	 				var pNode = tree.selection.parentNode;

					var cOrder = cNode.data[taskOrderKey];
					var switchOrder = 999999999;
					var switchWith = null;
					//switch orders with the one just above.
					pNode.childNodes.forEach(function(n)
					{
						if((n.data.iid!=rId)&&(n.data[taskOrderKey] >= cOrder))
						{
							if(n.data[taskOrderKey] < switchOrder)
							{
								switchOrder = n.data[taskOrderKey];
								switchWith = n;
							}
						}
					});
					if(switchWith)
					{
						//two updates, the refresh tree.
						if(switchOrder == cOrder) switchOrder=switchOrder+1;
						var res = updateTreeQuiet(cNode.data.iid,taskOrderKey,switchOrder);
						var res2 = updateTreeQuiet(switchWith.data.iid,taskOrderKey,cOrder);
						if((res!="OK") || (res2!="OK"))
						{
							ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, try again.");
						}
						else
						{
							cNode.set(taskOrderKey,switchOrder);
							cNode.commit();
							switchWith.set(taskOrderKey,cOrder);
							switchWith.commit();
							pNode.sort();
						}
					}
				} });
		/*
		treeMenu.add({ text: 'Indent', handler: function()  {
					//each row, blow away if same cell.
					ijfUtils.modalDialogMessage("Hi","here");
		} });
		treeMenu.add({ text: 'Outdent', handler: function()  {
					//each row, blow away if same cell.
					ijfUtils.modalDialogMessage("Hi","here");
		} });
		*/
	}


    var tree= new Ext.tree.Panel({
        store: store,
        style: l_panelStyle,
        height: l_Height,
        useArrows: true,
        width: "100%",
        ijfForm: inField,
       	id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        rootVisible: false,
        columns: colSettingsArray,
        ijfForm: inField,
		plugins: {
		        ptype: 'cellediting',
		        clicksToEdit: 1
        },
		listeners: {
            'selectionchange':  function(selMod, record, something ){
				//if event,
					//see if name = form, if so, set the item to this selectoin and render form
					//look for event by name, then run if there...

                ijf.main.gItemSectionGridIndex = record[0].data.iid;
				var tEvent = this.ijfForm.event;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record[0].data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record[0].data.iid,this);
					return;
				}
            },
			'beforeitemdblclick': function(selMod, record, something ){

                ijf.main.gItemSectionGridIndex = record.data.iid;
				var tEvent = this.ijfForm.tableDblClick;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record.data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record.data.iid,this);
					return;
				}
				//look for popform: xxx and pop the form
				tEvent=tEvent.replace("popform:","");
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
 				    var action = {};
					action.form = tEvent;
					action.type = "open item";
					action.itemId = record.data.iid;
					action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey, item, action)
					return;
				}
			}
		}
    });

    var layout = new Ext.Panel({
        title: lCaption,
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: "100%",
        layoutConfig: {
            columns: 1
        },
        bodyStyle: l_Style,
        items: [tree]
    });

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);

    tree.expandAll();
    //lastly disable context menu for this element
	tree.getEl().on('contextmenu', function(e) {
  	    e.preventDefault();
		treeMenu.showAt(e.clientX+window.pageXOffset,e.clientY+window.pageYOffset);
	});

},
renderItemlistHtml:function(inFormKey,item, inField, inContainer)
{
	inContainer.title = inField.toolTip;
	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_fieldStyle = inField.fieldStyle;
	var l_Style = inField.style;

	if(!l_labelStyle) l_labelStyle="background:transparent";
	if(!l_panelStyle) l_panelStyle="background:transparent";
	if(!l_Style) l_Style="background:transparent";
    if(!l_Style) l_Style = l_panelStyle;
//get type definition

    inContainer.title = inField.toolTip;


       var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);

	   var lds = inField.dataSource;

        var tSearch = "jql="+lds+"&fields="+translateFields;
 	    tSearch = ijfUtils.replaceKeyValues(tSearch,item);
		var aUrl = '/rest/api/2/search?'+tSearch;

        if(inField.form.formProxy=="true")
        {
			aUrl=aUrl.replace(/ /g,"%20");
 	   		var rawList = ijfUtils.getProxyApiCallSync(aUrl, inField.form.formSet.id);
	    }
	    else
	    {
		    var rawList = ijfUtils.jiraApiSync('GET',aUrl, null);
		}

        var colMeta = [];
        var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
					//perhaps build the types here...
					colMeta[jField.id]=jField;
				}
				retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;
			retObj.key=i.key;
			return retObj;
		});



	var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

	//create Table from Json
    var gCols = translateFields.split(",");

    var tOut = "<table id="+inFormKey+'_tbl_'+inField.formCell.replace(/,/g,"_")+" cellspacing=0 cellpadding=4 style='"+l_fieldStyle+"'><tr>";
    var cIndex=0;
    gCols.forEach(function(col){
			var thisColWidth = 120;
			if(colWidths[cIndex]) thisColWidth=colWidths[cIndex]/1;
			var thisColHeader = col.columnName;
			if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
			var thStyle = "width:"+thisColWidth + ";"+l_labelStyle;
		    tOut += "<td style='"+thStyle+"'>"+thisColHeader+"</td>";
		    cIndex++;
	});
    tOut += "</tr>";
    if(dataItems)
    {
		try
		{
			dataItems.forEach(function(r){
			    tOut += "<tr>";
				gCols.forEach(function(col){
					var outVal = r[col];
					var cMeta = colMeta[col];
					if((cMeta) && (cMeta.schema))
					{
						switch(cMeta.schema.type)
						{
							case "date":
								if(col.format) outVal = Ext.util.Format.dateRenderer('dd/mm/yyyy')(outVal); //moment(val).format(col.format);
								break;
							case "datetime":
								if(col.format) outVal = Ext.util.Format.dateRenderer('dd/mm/yyyy')(outVal); //moment(val).format(col.format);
								break;
							case "numberfield":
								if(col.format) outVal = Ext.util.Format.numberRenderer(col.format)(outVal); //moment(val).format(col.format);
								break;
							default:
						}
					}
					tOut += "<td>"+outVal+"</td>";
				});
			    tOut += "</tr>";
			});

		}
		catch(e)
		{
			throw('Failed to parse the grid json');
		}
	}
    tOut += "</table>";


    var outHtml = tOut;

    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderItemFolders:function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }


    var hideField = ijfUtils.renderIfShowField("",inField);


	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!rOnly) && (!perms.canEdit)) rOnly=true;
	if((!hideField) && (!perms.canSee))	hideField=true;


    var collapsible = true;
    if (inField.style.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";


    var dragzone = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dragzone");
    if(dragzone=="") dragzone = 'folderDdGroup';
    var dropzone = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dropzone");
    if(dropzone=="") dropzone = 'folderDdGroup';



    var hideKeys = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"hidekeys");
    if(hideKeys=="true")
    {
		hideKeys=true;
	} else hideKeys=false;

    var dropsnippet = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dropsnippet");

    var showLinks = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"showlinks");
    var showLinksLabel = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"showlinkslabel");
    if(showLinks=="true")
    {
		showLinks=true;
		if((!showLinksLabel) || (!showLinksLabel=="")) showLinksLabel = "Show Links";
	} else showLinks=false;
    var showLinksChecked = false;
	if(ijf.session.hasOwnProperty("showlinks_" + inField.formCell + "_" + inField.form.name)) showLinksChecked=ijf.session["showlinks_" + inField.formCell + "_" + inField.form.name];


    var scrollY = 0;
	if(ijf.session.hasOwnProperty("scrollY_" + inField.formCell + "_" + inField.form.name)) scrollY=ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name];

    var selectedNode = null;
	if(ijf.session.hasOwnProperty("selectedNode_" + inField.formCell + "_" + inField.form.name)) selectedNode=ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name];

	if(!ijf.session.hasOwnProperty("expandStates_" + inField.formCell + "_" + inField.form.name)) ijf.session["expandStates_" + inField.formCell + "_" + inField.form.name]={};
    var ecStates = ijf.session["expandStates_" + inField.formCell + "_" + inField.form.name];


	var l_Width=ijfUtils.getNameValueFromStyleString(l_Style,"width");
	if(l_Width=="")
	{
		l_Width='auto';
	}
	else
	{
		l_Width = l_Width.replace("px","")/1;
	}


	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

   //item list may be query, related or child
   	   var colMeta = [];
   	   colMeta["key"]={"id":"key","name":"key","schema":{}};
   	   var dataItems =[];

	    var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);
	    var lJql = ijfUtils.replaceKeyValues(inField.dataSource,item);
		var tSearch = "jql="+lJql+"&fields="+translateFields+",issuelinks";

		var rawList = ijfUtils.jiraApiSync('GET','/rest/api/2/search?'+tSearch, null);
		//bail if dataItems not

		var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
					//perhaps build the types here...
					colMeta[jField.id]=jField;
				}
				retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;
			retObj.key=i.key;
			if(hideKeys) retObj.key="";
			retObj.parents=[];
			retObj.parentLinkIds = [];
			if(i.fields.issuelinks.length > 0)
			{
				//set an issues parent assignments

				retObj.parents = i.fields.issuelinks.reduce(function(inParents,link)
				{
					if(link.inwardIssue)
					{
						inParents.push(link.inwardIssue.key);
						retObj.parentLinkIds.push(link.id);
					}
					return inParents;
				},[]);
				if(showLinksChecked)
				{
					retObj.children = i.fields.issuelinks.reduce(function(inChildren,link)
					{
						if(link.outwardIssue)
						{
							//add this if it is not the folder typs, AND, show related children == true
							if(inField.referenceFilter != link.outwardIssue.fields.issuetype.name)
							{
								var tKey=link.outwardIssue.key;
								if(hideKeys) tKey = "";
								inChildren.push({
									"key":tKey,
									"iid":link.outwardIssue.key,
									"summary":link.outwardIssue.fields.summary,
									"parentLinkId":link.id,
									"parentKey":i.key,
									"leaf":true
								});
							}
						}
						return inChildren;
					},[]);
				}
			}
			retObj.leaf = false;  //makes all of root query folders...
			return retObj;
		});

       //dataReference CSV contains the ordering field.  it must be the last value
	var taskOrderKey = Object.keys(colMeta)[Object.keys(colMeta).length-1];   //ijf.jiraFieldsKeyed["taskOrder"].id;


        //now rip through and set parent assignments,
        dataItems.forEach(function(i){
			if(i.parents)
			{
				i.parents.forEach(function(pKey){
					dataItems.forEach(function(p){
						if(p.iid==pKey)
						{
							//this is parent of i
							i.moved=true;
							p.leaf=false;
							if(p.children)	p.children.push(i);
							else p.children = [i];
						}
					});
				});
			}
		});
		//reduce moved
		dataItems = dataItems.reduce(function(inArray,i){
			if(i.moved) return inArray;
			inArray.push(i);
			return inArray;
		},[]);

    //add sort function to all nodes...if taskOrder is included...

		dataItems.forEach(function(i){
			i.sort = function(a,b)
			{
				return(a[taskOrderKey]-b[taskOrderKey]);
			};
		});


   //data items are here, you now need to restructure into a tree based on Item relations...
   //splitting dataReference2 with json in case we need to override onDelete...onFilter
    var onDeleteFolder = null;
    var onFilterFolders = null;
    if(inField.dataReference2)
    {
		try
		{
			var dr2 = JSON.parse(inField.dataReference2);
			onDeleteFolder=dr2.onDelete;
			onFilterFolders=dr2.onFilter;
			if(onFilterFolders)
				if(ijf.snippets.hasOwnProperty(onFilterFolders))
	   	            dataItems = ijf.snippets[onFilterFolders](dataItems);
		}
		catch(je)
		{
			//it's not json so just look for default filtering
            //filter the items...
            if(ijf.snippets.hasOwnProperty(inField.dataReference2))
   	            dataItems = ijf.snippets[inField.dataReference2](dataItems);

		}
    }

	//calculate column widths...and headers
	var colWidths=[];
	var colNames = translateFields.split(","); //inField.dataReference.split(",");
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	var colHeaders = [];
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");
	for (var i = 0; i<colNames.length;i++)
	{
		if(colWidths[i])
		{
			if(isNaN(colWidths[i]))
			{
				//it's a string...
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i];
			}
			else
			{
				if(colMeta[colNames[i]]) colMeta[colNames[i]].width=colWidths[i]/1;
			}
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].width=100;
		}

		if(colHeaders[i])
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colHeaders[i];
		}
		else
		{
			if(colMeta[colNames[i]]) colMeta[colNames[i]].header=colMeta[colNames[i]].name;
		}
	}

    var updateTreeQuiet = function(inId,inName,inValue)
    {
		var iKey = inId;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;

		return ijfUtils.jiraApiSync("PUT",tApi,jData);
	}
    var updateTree = function(container,inName,inValue)
    {
		var iKey = container.grid.selection.data.iid;
		var putObj = {};
		putObj["fields"]={};
		putObj["fields"][inName]=inValue;
		//how to save asynch....
		var jData = JSON.stringify(putObj);
		var tApi = "/rest/api/2/issue/"+iKey;
		var cRow = container.grid.selection;//container.grid.selection.data.index;

        var onsuccess =  function(data,e,f) {
                 ijfUtils.footLog("Successful data response code: " + f.status);
                 if((f.status==200) || (f.status==201) || (f.status==204))
                 {
					var delayCommit = function() {
						cRow.commit()
					};
					window.setTimeout(delayCommit,300);
				 }
				 else
				 {
					 ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
				 }
        };
        var onerror = function(e) {
				 if(e.status==201)
                 {
				 	var delayCommit = function() {cRow.commit()};
					window.setTimeout(delayCommit,300);
				 }
                 else
                 {
                     ijfUtils.footLog("Failed data post: " + " "  + e.statusText);
                     ijfUtils.modalDialogMessage('Error','Sorry a network error prevented the field from saving.');
                 }
	    };
		ijfUtils.jiraApi("PUT",tApi,jData,onsuccess,onerror);
	}



    var colSettingsArray = [];
    var gridFieldArray=[];
    //colSettingsArray.push(new Ext.grid.RowNumberer());
    //push iid as special first field...

    //look for key, hide if not there...
	var hideKey=true;
    if(inField.dataReference.indexOf("key")>-1) hideKey=false;
	var kWidth = 150;
	if(colMeta.key) kWidth = colMeta.key.width/1;
    gridFieldArray.push({name: "iid", type: "string"});
    colSettingsArray.push({
		xtype: 'treecolumn',
        text: colMeta["key"].header,
        dataIndex: "key",
        hidden: hideKey,
        //flex: 1,
        style: l_labelStyle,
        width: kWidth,
        sortable: false
    });
	delete colMeta["key"];

    var colObj={};

    Object.keys(colMeta).forEach(function(k){
		var f = colMeta[k];
		if(f.schema.type=="date")
		{
			gridFieldArray.push({name: f.id, type: "date"});
			colObj ={
				text: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: false,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				editor: {
					completeOnEnter: true,
					field: {
						xtype: 'datefield',
						format: 'm/d/y',
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,moment(n.lastValue).format("YYYY-MM-DD"));
							}
						}
					}
				},
				filter: {
				  type: 'date'
	            }
			};
		}
		else if(f.schema.type=="option")
		{
			//need metadata of the tree issues

			var eKey = dataItems[0].iid;
			if(!ijf.jiraEditMeta.hasOwnProperty(eKey))
			{
				//this must proxy as well, if the form is proxy
				if(inField.form.formProxy=="true")
				{
					//proxy auth
					ijf.jiraEditMeta[eKey] = ijfUtils.getProxyApiCallSync('/rest/api/2/issue/'+eKey+'/editmeta',thisForm.formSet.id);
					ijfUtils.footLog('Item edit meta aquired with proxy auth');
				}
				else
				{
					//normal
					ijf.jiraEditMeta[eKey] = ijfUtils.getJiraIssueMetaSync(eKey);
				}

				ijf.jiraEditMetaKeyed[eKey] = [];
				Object.keys(ijf.jiraEditMeta[eKey].fields).forEach(function(f)
				{
					ijf.jiraEditMetaKeyed[eKey][ijf.jiraEditMeta[eKey].fields[f].name]=ijf.jiraEditMeta[eKey].fields[f];
				});
			}

			var lookup = ijf.jiraEditMeta[eKey].fields[f.id].allowedValues.map(function(e)
			{
				return [e.id,e.value];
			});

			gridFieldArray.push({name: f.id, type: "string"});
            colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				sortable: false,
				filter: {
				  type: 'list'
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'combobox',
						store: lookup,
						allowBlank: true,
						forceSelection: true,
						displayField: 1,
						valueField: 0,
						listeners: {
							focusenter: function(f,o,n)
							{
									var container = f.up();
									var curVal = container.grid.selection.get(f.name);
									f.setValue(f.store.getData().items.reduce(function(inVal,i){if(i.data.field2==curVal) inVal=i.data.field1; return inVal;},null));
							},
							focusleave: function(f,o,n)
							{
									var newVal = f.value;
									var container = f.up();
									if(!container) return;
									if(container.grid.selection.get(f.name)==newVal) return;
									var tUpdate = function(){container.grid.selection.set(f.name,f.rawValue);}
									window.setTimeout(tUpdate,20);
									var uVal = {"id":newVal};
									if(!newVal) uVal=null;
									updateTree(container,f.name,uVal);
							}
						}
					}
				}

			};

		}
		else if(f.schema.type=="datetime")
		{
			gridFieldArray.push({name: f.id, type: "date"});
			colObj ={
				text: f.header,
				dataIndex: f.id,
				xtype: 'datecolumn',
				sortable: false,
				width: f.width,
				style: l_labelStyle,
				format: 'm/d/y',
				filter: {
				  type: 'date'
	            }
			};
		}
		else  if(f.schema.type=="number")
		{
			gridFieldArray.push({name: f.id, type: "number"});
			var hideIt = false;
			if(f.id==taskOrderKey) hideIt=true;
			colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				style: l_labelStyle,
				sortable: false,
				hidden: hideIt,
				filter: {
				  type: fType
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'numberfield',
						//allowBlank: (col.required!="Yes"),
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,n.lastValue);
							}
						}
					}
				}

			};
        }
        else if(f.schema.type=="user")
		{
			var editor = null;

			var apiUrl = "/rest/api/2/user/picker";
			var	fParam = "query";
			var xtrParam = null;
			var uRoot = 'users';
			if(f.schema.system=="assignee")
			{
				apiUrl = "/rest/api/2/user/assignable/search";
				fParam = "username";
				xtrParam={project:inField.form.formSet.projectId};
				uRoot = '';
			}
			Ext.define('JiraUserModel'+f.id, {
				extend: 'Ext.data.Model',
				fields: [{name:'name', type: 'string'},
						 {name: 'displayName', type: 'string'}]
			});

			var lookup = Ext.create('Ext.data.Store', {
				storeId: 'userDropdownId'+f.id,
				model: 'JiraUserModel'+f.id,
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: g_root + apiUrl,
					extraParams : xtrParam,
					filterParam: fParam,
					groupParam: '',
					limitParam: '',
					pageParam: '',
					sortParam: '',
					startParam: '',
					reader: {
						type: 'json',
						root: uRoot
					}
				}
			});

			var editor = {
				completeOnEnter: true,
				field: {xtype: 'combobox',
							store: lookup,
							displayField: 'displayName',
							valueField: 'name',
							labelAlign: 'left',
							value: f.id,
							hideTrigger: true,
							triggerAction: 'all',
							queryMode: 'remote',
							queryParam: fParam,
							minChars: 2,
							emptyText:'Start typing...',
							selectOnFocus:true,
							listeners: {
								focusleave: function(f,n,o){
									if(f.originalValue==f.value) return;
									var newVal = f.value;
									var container = f.up();
									if(!container) return;
									updateTree(container,f.name,{"name":newVal});
								}
							}

				}
			};

			gridFieldArray.push({name: f.id, type: "string"});
			colObj ={
				header: f.header,
				dataIndex: f.id,
				sourceField: f,
				sortable: false,
				width: f.width,
				style: l_labelStyle,
				editor: editor,
				filter: {
				  type: 'list'
	            }
			};
		}
		else
		{
			var fType = 'list';
			if(f.id=="summary") fType='string';
			gridFieldArray.push({name: f.id, type: "string"});
			colObj ={
				text: f.header,
				width: 'auto',
				dataIndex: f.id,
				width: f.width,
				style: l_labelStyle,
				sortable: false,
				filter: {
				  type: fType
	            },
	            editor: {
					completeOnEnter: true,
					field: {
						xtype:'textfield',
						//allowBlank: (col.required!="Yes"),
						listeners: {
							focusleave: function(n,o,f)
							{
								if(n.lastValue==n.originalValue) return;
								var container = n.up();
								if(!container) return;
								updateTree(container,n.name,n.lastValue);
							}
						}
					}
				}

			};
        }

        //set widths here?
		ijfUtils.setColWidthForItemList(colObj);
		colSettingsArray.push(colObj);
	});

    //preap and apply actions.
    var actions=null;
    var aWidth = 10;

    if(!Ext.ClassManager.isCreated(inField.dataSource + inField.formCell.replace(/,/g,"")))
    {
        Ext.define(inField.dataSource + inField.formCell.replace(/,/g,""), {
            extend: 'Ext.data.Model',
            fields: gridFieldArray
        });
    }
    var store = Ext.create('Ext.data.TreeStore', {
        model: inField.dataSource + inField.formCell.replace(/,/g,""),
        root: {
			 	expanded:true,
			 	children: dataItems
			},
		sorters: [{
					property: taskOrderKey,
					direction: 'ASC'}]
	});
	var treeMenu = new Ext.menu.Menu({ items:
		[
			{ text: 'Add Child Folder', handler: function()  {
					var rId = tree.selection.data.iid
					//add the issue with "new item" summary and insert into grid no refresh...

                    if(tree.selection.data.leaf)
                    {
							ijfUtils.modalDialogMessage("Info","You cannot perform this action on a folder leaf.");
							tree.unmask();
							return;
					}


					var delayAdd = function()
					{
						var putObj = {};
						putObj["fields"]={};
						putObj["fields"]["summary"]="new item";
						putObj.fields.project = {"key":inField.form.formSet.projectId};
						putObj["fields"][taskOrderKey]=10000;
						//Parent ID and Issue Type must be set
						if(!inField.referenceFilter)
						{
							ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
							tree.unmask();
							return;
						}
						putObj.fields.issuetype = {"name":inField.referenceFilter};

						var jData = JSON.stringify(putObj);
						var tApi = "/rest/api/2/issue";
						saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
						//saveRes is the Key of the new issue if successfull,
						//set the relationship and reload
						try
						{
							if(saveRes.key)
							{
								var jsonString = {
												"type": {
													"name": "Relates"
												   },
												"inwardIssue": {
													"key": rId
												   },
												"outwardIssue": {
													"key": saveRes.key
												   },
												"comment":{
													"body":"Linked related issue"
												  }
								};
								var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
								if(saveRelRes!="OK")
								{
									ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
									tree.unmask();
									return;
								}
								var rec = Ext.create(tree.store.model);
								rec.data.iid=saveRes.key;
								rec.data.key=saveRes.key;
								if(hideKeys) rec.data.key = "";
								rec.data.text=saveRes.key;
								rec.data.summary= "new item";
								//refresh the grid....
								tree.selection.appendChild(rec);
								tree.selection.expand();

								//select the new record....
								tree.suspendEvents();
								tree.setSelection(rec);
							    tree.resumeEvents(false);
							}
							else
							{
								ijfUtils.modalDialogMessage("Error","Unable to add the issue");
							}
						}
						catch(e)
						{
							ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + e.message);
						}
						tree.unmask();
					}
                    ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();
					tree.mask("Adding");
					window.setTimeout(delayAdd,10);


				} },
                { text: 'Add Peer Folder', handler: function()  {
					var rId = tree.selection.data.iid
					//add the issue with "new item" summary and insert into grid no refresh...

                    if(tree.selection.data.leaf)
                    {
							ijfUtils.modalDialogMessage("Info","You cannot perform this action on a folder leaf.");
							tree.unmask();
							return;
					}
					var delayAdd = function()
					{

						var putObj = {};
						putObj["fields"]={};
						putObj["fields"]["summary"]="new item";
						putObj["fields"][taskOrderKey]=10000;
						putObj.fields.project = {"key":inField.form.formSet.projectId};

						//Parent ID and Issue Type must be set
						if(!inField.referenceFilter)
						{
							ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
							tree.unmask();
							return;
						}
						putObj.fields.issuetype = {"name":inField.referenceFilter};

						var jData = JSON.stringify(putObj);
						var tApi = "/rest/api/2/issue";
						saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
						//saveRes is the Key of the new issue if successfull,
						//set the relationship and reload
						var pNode = tree.selection.parentNode;
						try
						{
							if(saveRes.key)
							{
								//if parant NOT Root.  Set the parent to the current selection parent....
								if(pNode.data.text!="Root")
								{
									var jsonString = {
													"type": {
														"name": "Relates"
													   },
													"inwardIssue": {
														"key": pNode.data.iid
													   },
													"outwardIssue": {
														"key": saveRes.key
													   },
													"comment":{
														"body":"Linked related issue"
													  }
									};
									var saveRelRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
									if(saveRelRes!="OK")
									{
										ijfUtils.modalDialogMessage("Error","Unable to establish the issue link: " + saveRes);
										tree.unmask();
										return;
									}
								}

								//set selected
								ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = saveRes.key;
							   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
							   window.setTimeout(resetForm,50);
							}
							else
							{
								ijfUtils.modalDialogMessage("Error","Unable to add the issue");
							}
						}
						catch(e)
						{
							ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + e.message);
						}
						//tree.unmask();
					}
                    ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();
					tree.mask("Adding");
					window.setTimeout(delayAdd,10);

				} },
                { text: 'Add Root Folder', handler: function()  {


					var delayAdd = function()
					{
						//add the issue with "new item" summary and insert into grid no refresh...
						var putObj = {};
						putObj["fields"]={};
						putObj["fields"]["summary"]="new item";
						if(taskOrderKey!="key") putObj["fields"][taskOrderKey]=10000;
						putObj.fields.project = {"key":inField.form.formSet.projectId};
						//Parent ID and Issue Type must be set
						if(!inField.referenceFilter)
						{
							ijfUtils.modalDialogMessage("Error","Field Reference Filter must be valid issue 'subtype'");
							tree.unmask();
							return;
						}
						putObj.fields.issuetype = {"name":inField.referenceFilter};

						var jData = JSON.stringify(putObj);
						var tApi = "/rest/api/2/issue";
						saveRes = ijfUtils.jiraApiSync("POST",tApi,jData);
						//saveRes is the Key of the new issue if successfull,
						if(saveRes.key)
						{
							//reload the current form....
						    //set selected
						   ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = saveRes.key;
						   var resetForm = function(){   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);};
						   window.setTimeout(resetForm,50);
						}
						else
						{
							ijfUtils.modalDialogMessage("Error","Sorry, there was an error with the add: " + saveRes);
						}
						//tree.unmask();
					}
					ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();
					tree.mask("Adding");
					window.setTimeout(delayAdd,10);
				} },
 				{text: 'Delete Folder', handler: function()  {
					var rId = tree.selection.data.iid
                    ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();

					//look for an override of delete folder,then do it if needed...
					//pattern is if return is true, continue, if not do not continue....
					if(onDeleteFolder)
					{
				         if(ijf.snippets.hasOwnProperty(onDeleteFolder))
	   	            		if(!ijf.snippets[onDeleteFolder](rId)) return;
					}

                    if(tree.selection.data.leaf)
                    {
						//the query must be changed due to the removal of the linkedIssueIn, or change to it's parent....
						var parentKey = tree.selection.data.parentKey;
						    //break this link...
						var delayDel = function()
					    {
							deleteParentLinks([tree.selection.data.parentLinkId]);
							//set the selection to be it's parent...
							if(parentKey)
							{
                             ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = parentKey;
						    }
						    else
						    {
							 ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = null;
							}

							ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);
							return;
						}
						tree.mask("Removing Link");
					    window.setTimeout(delayDel,10);
					    return;
					}
					var parentKey = tree.selection.data.parents[0];
					var delFunc = function()
					{
						var delayDel = function()
					    {
							var delKeys = [];
							var getKeys = function(inNode){
									if((inNode.data.iid) && (!inNode.data.leaf)) delKeys.push(inNode.data.iid);
									inNode.childNodes.forEach(function(n){getKeys(n)});
							};
							getKeys(tree.selection);
							delKeys.reverse();
							var deleteOk = true;
							try
							{
								delKeys.forEach(function(k)
								{
									var tApi = "/rest/api/2/issue/"+k;
									var delRes = ijfUtils.jiraApiSync("DELETE",tApi,null);
									if(delRes!="OK") deleteOk=false;
								});
							}
							catch(e)
							{
								deleteOk=false;
								console.log(e);
							}

							if(!deleteOk)
							{
								ijfUtils.modalDialogMessage("Error","Unable to delete all the issues, please refresh your browser and try again.");
							}
							else
							{

								if(parentKey)
								{
								 ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = parentKey;
								 //inField.dataSource = inField.dataSource.replace(/and issue in linkedIssues\(.*?\)/gi,"and issue in linkedIssues("+parentKey +")");
								}
								else
								{
  							     ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = null;
								}

								ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);
							}
							//tree.unmask();

						}
						tree.mask("Deleting");
					    window.setTimeout(delayDel,10);

				    }
				    ijfUtils.modalDialog("Warning","You are about to permanently remove this item and it's children, continue?",delFunc);
				} }
		]});

   //alter if edit exists
	if(inField.tableDblClick)
	{
		treeMenu.add(
   			{ text: 'Open Item', handler: function()  {
   					var rId = tree.selection.data.iid
   					ijf.main.gItemSectionGridIndex = rId;
   					var tEvent = tree.ijfForm.tableDblClick;
   					tEvent=tEvent.replace("popform:","");
   					if(ijf.fw.forms.hasOwnProperty(tEvent))
   					{
   						var action = {};
   						action.form = tEvent;
   						action.type = "open item";
   						action.itemId = rId;
   						action.inField = inField;
   						ijf.extUtils.renderPopupForm(inFormKey, item, action)
   						return;
   					}
				} });
     }


//add a new link inward is the parent...
    var setParentLink = function(inData,inParentKey)
    {
		try
		{
			var jsonString = {
							"type": {
								"name": "Relates"
							   },
							"inwardIssue": {
								"key": inParentKey
							   },
							"outwardIssue": {
								"key": inData.iid
							   },
							"comment":{
								"body":"Linked related issue"
							  }
			};
			var saveRes = ijfUtils.jiraApiSync("POST","/rest/api/2/issueLink",JSON.stringify(jsonString));
			if(saveRes!="OK") return false;

			//sadly, this does not provide the linkId of what was just created...you need to get
			//the inData.key issue links and set parentKeys and parentLinkIds
			var thisIssue = ijfUtils.getJiraIssueSync(inData.iid);
			inData.parents = [];
			inData.parentLinkIds = [];
            if(thisIssue.fields.issuelinks.length > 0)
			{
				//set an issues parent assignments

				inData.parents = thisIssue.fields.issuelinks.reduce(function(inParents,link)
				{
					if(link.inwardIssue)
					{
						inParents.push(link.inwardIssue.key);
						inData.parentLinkIds.push(link.id);
					}
					return inParents;
				},[]);
			}
			return true;
		}
		catch(e)
		{
			return false;
		}
	}


    var deleteParentLinks = function(inLinks)
    {
		var successfulDelete = true;
		inLinks.forEach(function(linkId)
		{
			if(!successfulDelete) return;
			var saveRes = ijfUtils.jiraApiSync('DELETE','/rest/api/2/issueLink/'+linkId,null);
			if(saveRes!="OK") successfulDelete=false;
		});
		return successfulDelete;
	};

    var rippleUp = function(rootKey,inNode,inValue)
    {
			if(!inNode) return true;
			var nextValue = inValue;
            if(inNode.data.iid!=rootKey)
            {
				//set the taskOrder
				//console.log(inNode.data.iid + "  setting to " + inValue);

				var res = updateTreeQuiet(inNode.data.iid,taskOrderKey,inValue);
				if(res!="OK")
				{
					return false;
				}
				nextValue=nextValue-1;
			} //else console.log(inNode.data.iid + "  skipping ");
            return rippleUp(rootKey,inNode.previousSibling,nextValue)
	}
    var rippleDown = function(rootKey,inNode,inValue)
    {
			if(!inNode) return true;
			var nextValue = inValue;
            if(inNode.data.iid!=rootKey)
            {
				//set the taskOrder
				//console.log(inNode.data.iid + "  setting to " + inValue);
				var res = updateTreeQuiet(inNode.data.iid,taskOrderKey,inValue);
				if(res!="OK")
				{
					return false;
				}
				nextValue=nextValue+1;
			} //else console.log(inNode.data.iid + "  skipping ");
            return rippleDown(rootKey,inNode.nextSibling,nextValue)
	}

    var moveNode = function(node, data, overModel, dropPosition, dropHandlers,eOpts) {

        //look to see if parent changed, if so, change parent....
        if(overModel.parentNode.data.iid!=data.records[0].data.parents[0])
        {
			//parent changed...if root, set to null.  else, set to the value of key
			if(overModel.parentNode.data.iid)
			{
				//set to key, which means...delete the existing parent link and add a new one...
				if(!deleteParentLinks(data.records[0].data.parentLinkIds))
				{
					ijfUtils.modalDialogMessage("Error","Unable to remove the issue links, please refresh your browser and try again.");
					tree.unmask();
					return;
				};
				data.records[0].data.parentLinkIds=[];
				data.records[0].data.parents=[];

				//add a new link inward is the parent...
				if(!setParentLink(data.records[0].data,overModel.parentNode.data.iid))
				{
					ijfUtils.modalDialogMessage("Error","Unable to establish the issue link, please refresh your browser and try again.");
					tree.unmask();
					return;
				}
				console.log(data.records[0].data.iid + " Change parent to " + overModel.parentNode.data.iid);

			}
			else
			{
				//set to null
				console.log(data.records[0].data.iid + " Changing parent to null");
				//set to key, which means...delete the existing parent link and add a new one...
				if(!deleteParentLinks(data.records[0].data.parentLinkIds))
				{
					ijfUtils.modalDialogMessage("Error","Unable to remove the issue links, please refresh your browser and try again.");
					tree.unmask();
					return;
				};
				data.records[0].data.parentLinkIds=[];
				data.records[0].data.parents=[];
			}
		}

		//process before.....
		if(dropPosition=="before")
		{
			//data.item.taskOrder must = node.taskORder - 1
			//then recurse up the children and make sure each one is less than prior one


            var newTaskOrder = overModel.data[taskOrderKey]/1-1;
            console.log(data.records[0].data.iid + " setting to " + newTaskOrder);
            var res = updateTreeQuiet(data.records[0].data.iid,taskOrderKey,newTaskOrder);
            newTaskOrder=newTaskOrder-1;

            if(!rippleUp(data.records[0].data.iid, overModel.previousSibling, newTaskOrder))
            {
	 		     //error occured...
				ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, please refresh your browser and try again.");
			}
            tree.unmask();

		}else if(dropPosition=="after")
		{
			//data.item.taskOrder must = node.taskORder - 1
			//then recurse up the children and make sure each one is less than prior one
            var newTaskOrder = overModel.data[taskOrderKey]/1+1;
            console.log(data.records[0].data.iid + " setting to " + newTaskOrder);
            var res = updateTreeQuiet(data.records[0].data.iid,taskOrderKey,newTaskOrder);
            newTaskOrder=newTaskOrder+1;

            if(!rippleDown(data.records[0].data.iid, overModel.nextSibling, newTaskOrder))
            {
				//error occured...
				ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, please refresh your browser and try again.");
			}

			tree.unmask();
		} else if(dropPosition=="appendx")
		{
			//data.item.taskOrder must = node.taskORder - 1
			//then recurse up the children and make sure each one is less than prior one
            var newTaskOrder = overModel.data[taskOrderKey]/1+1;
            console.log(data.records[0].data.iid + " setting to " + newTaskOrder);
            var res = updateTreeQuiet(data.records[0].data.iid,taskOrderKey,newTaskOrder);
            newTaskOrder=newTaskOrder+1;

            if(!rippleDown(data.records[0].data.iid, overModel.nextSibling, newTaskOrder))
            {
				//error occured...
				ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, please refresh your browser and try again.");
			}

			tree.unmask();
		} else
		{
			//wierd state, no drop position, this means...it's being dropped as a child a parent it was under, at the top of the
			//new tree
			if(overModel.data.iid)
			{
				//set to key, which means...delete the existing parent link and add a new one...
				if(!deleteParentLinks(data.records[0].data.parentLinkIds))
				{
					ijfUtils.modalDialogMessage("Error","Unable to remove the issue links, please refresh your browser and try again.");
					tree.unmask();
					return;
				};
				data.records[0].data.parentLinkIds=[];
				data.records[0].data.parents=[];

				//add a new link inward is the parent...
				if(!setParentLink(data.records[0].data,overModel.data.iid))
				{
					ijfUtils.modalDialogMessage("Error","Unable to establish the issue link, please refresh your browser and try again.");
					tree.unmask();
					return;
				}
				console.log(data.records[0].data.key + " Change parent to " + overModel.parentNode.data.iid);
				tree.unmask();
			}
			else
			{
				tree.unmask();
                ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, please refresh your browser and try again.");
			}
		}

	};


	var tPlugins = null;
	var tViewConfigPlugins=null;
	if(!rOnly)
	{
		tPlugins = [{
						ptype: 'cellediting',
						clicksToEdit: 2
			},'gridfilters'];

		 tViewConfigPlugins ={
						ptype: 'treeviewdragdrop',
						containerScroll: true,
						dragGroup: dragzone,
						dropGroup: dropzone,
						dragText: 'Drag and drop to reorganize'
					};
	}



	var headerButtons =[];

	if(showLinks)
	{
		headerButtons.push({
				xtype:'checkboxfield',
				boxLabel:showLinksLabel,
				value: showLinksChecked,
				handler: function(f,c){
				   ijf.session["showlinks_" + inField.formCell + "_" + inField.form.name] = c;
				   ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = 0;  //reset scroll position

				   var delayIt=function()
				   {
					   ijf.main.renderForm("ijfContent", ijf.main.outerForm.name, false, ijf.currentItem);
				   }
				   tree.mask("Loading");
				   window.setTimeout(delayIt,1000);
				}
			});
	}

	headerButtons.push({
				xtype:'button',
				text:"Expand All",
				scope: this,
				handler: function(){
				   tree.expandAll();

				   Object.keys(ecStates).forEach(function(n){ecStates[n]=true;});

				}
			});
	headerButtons.push({
				xtype:'button',
				text:"Collapse All",
				scope: this,
				handler: function(){
				   tree.collapseAll();
				   Object.keys(ecStates).forEach(function(n){ecStates[n]=false;});

				}
			});




    var tree= new Ext.tree.Panel({
        store: store,
		 header:{
				titlePosition: 0,
				items: headerButtons
		},
        style: l_panelStyle,
        title: lCaption,
        height: l_Height,
        //maxHeight: 600,
        useArrows: true,
        width: "100%",
        ijfForm: inField,
       	id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        rootVisible: false,
        columns: colSettingsArray,
        ijfForm: inField,
		plugins: tPlugins,
        viewConfig: {
		        plugins: tViewConfigPlugins
        },
		listeners: {
			'beforeitemexpand':function(inNode, eOpts )
			{
				if((inNode.data) && (inNode.data.iid)) ecStates[inNode.data.iid]=true;
			},
			'beforeitemcollapse':function(inNode, eOpts )
			{
				if((inNode.data) && (inNode.data.iid)) ecStates[inNode.data.iid]=false;
			},
			'beforedrop': function(node, data, overModel, dropPosition, dropHandlers) {
                //dropHandlers.wait = true;
                //debugger;

				if(dropsnippet)
				{
					try
					{
						dropHandlers.wait = true;
					    if(!ijf.snippets[dropsnippet](node, data, overModel, dropPosition, dropHandlers,tree))
					    {
							return;
						}
					}
					catch(e)
					{
						ijfUtils.modalDialogMessage("Error","Failed to run the drop snippet");
						dropHandlers.cancelDrop();
						return;
					}
				}

				if(data.records[0].data.leaf)
				{
 					    dropHandlers.cancelDrop();
						ijfUtils.modalDialogMessage("Info","You cannot perform a move on a folder leaf.");
						tree.unmask();
						return;
				}

                tree.mask("Moving...");
   				dropHandlers.processDrop();
   				var delayMove = function()
   				{
					try
					{
						moveNode(node, data, overModel, dropPosition, dropHandlers);
					}
					catch(e)
					{
						dropHandlers.cancelDrop();
						tree.unmask();
						ijfUtils.modalDialogMessage("Error","Sorry but the reorder did not save properly, please refresh your browser and try again.");
					}
				};
				window.setTimeout(delayMove,10);

				/*
				dropHandlers.wait = true;
				Ext.MessageBox.confirm('Drop', 'Are you sure', function(btn){
					if (btn === 'yes') {
						dropHandlers.processDrop();
					} else {
						dropHandlers.cancelDrop();
					}
				});
				*/
			},
            'selectionchange':  function(selMod, record, something ){
				//if event,
					//see if name = form, if so, set the item to this selectoin and render form
					//look for event by name, then run if there...
				if((record) && (record[0])) ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = record[0].data.iid;
				else ijf.session["selectedNode_" + inField.formCell + "_" + inField.form.name] = null;

                ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();

			    if((!record[0]) || (!record[0].data) || !(record[0].data.iid)) return;
                ijf.main.gItemSectionGridIndex = record[0].data.iid;
				var tEvent = this.ijfForm.event;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record[0].data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record[0].data.iid,record, something,this);
					return;
				}
            },
			'beforeitemdblclick': function(selMod, record, something ){

                ijf.session["scrollY_" + inField.formCell + "_" + inField.form.name] = tree.getScrollY();

                ijf.main.gItemSectionGridIndex = record.data.iid;
				var tEvent = this.ijfForm.tableDblClick;
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
					ijf.currentItem=null;
                    ijf.main.itemId= record.data.iid;
                    window.g_formId=tEvent;
                    ijf.main.processSetup("ijfContent");
					return;
				}

				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tEvent))
				{
					ijf.snippets[tEvent](record.data.iid,this);
					return;
				}
				//look for popform: xxx and pop the form
				tEvent=tEvent.replace("popform:","");
				if(ijf.fw.forms.hasOwnProperty(tEvent))
				{
 				    var action = {};
					action.form = tEvent;
					action.type = "open item";
					action.itemId = record.data.iid;
					action.inField = inField;
                    ijf.extUtils.renderPopupForm(inFormKey, item, action)
					return;
				}
			}
		}
    });

    var layout = new Ext.Panel({
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: l_Width,
        layoutConfig: {
            columns: 1
        },
        bodyStyle: l_Style,
        items: [tree]
    });

	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);

    //tree.expandAll();

    //ecStates has paths to expand
    function setNodeExpand(inNode)
    {
		if(inNode.id!="root")
		{
			if((inNode.data) && (inNode.data.iid))
				if(ecStates.hasOwnProperty(inNode.data.iid))
					if(ecStates[inNode.data.iid]) inNode.expand();
		}
		if(inNode.childNodes)
		{
			inNode.childNodes.forEach(function(n)
			{
				setNodeExpand(n);
			});
		}
	}
	setNodeExpand(tree.getRootNode());


    Object.keys(ecStates).forEach(function(p){tree.expandPath(p)});

	if(selectedNode)
	{
		tree.suspendEvents();
	    tree.setScrollY(scrollY);
	    var newSelection = tree.getStore().findRecord("iid",selectedNode)
	    if(newSelection) tree.setSelection(newSelection);
	    tree.resumeEvents(false);
	}


    //lastly disable context menu for this element
    if(!rOnly)
	{
		tree.getEl().on('contextmenu', function(e) {



			e.preventDefault();

			treeMenu.items.items.forEach(function(m){
				m.setVisible(false);
			});

			if((e.record) && (e.record.data.leaf))
			{
				treeMenu.items.items["3"].setVisible(true);
				treeMenu.items.items["3"].setText("Remove Link");
			}
			else if(!e.record)
			{
				treeMenu.items.items["2"].setVisible(true);
			}
			else
			{
				treeMenu.items.items.forEach(function(m){
					m.setVisible(true);
				});
				treeMenu.items.items["3"].setText("Delete Folder");
			}

			treeMenu.showAt(e.clientX+window.pageXOffset,e.clientY+window.pageYOffset);
		});
	}

},
renderItemlistHtml:function(inFormKey,item, inField, inContainer)
{
	inContainer.title = inField.toolTip;
	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_fieldStyle = inField.fieldStyle;
	var l_Style = inField.style;

	if(!l_labelStyle) l_labelStyle="background:transparent";
	if(!l_panelStyle) l_panelStyle="background:transparent";
	if(!l_Style) l_Style="background:transparent";
    if(!l_Style) l_Style = l_panelStyle;
//get type definition

    inContainer.title = inField.toolTip;


       var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);

	   var lds = inField.dataSource;

        var tSearch = "jql="+lds+"&fields="+translateFields;
 	    tSearch = ijfUtils.replaceKeyValues(tSearch,item);
		var aUrl = '/rest/api/2/search?'+tSearch;

        if(inField.form.formProxy=="true")
        {
			aUrl=aUrl.replace(/ /g,"%20");
 	   		var rawList = ijfUtils.getProxyApiCallSync(aUrl, inField.form.formSet.id);
	    }
	    else
	    {
		    var rawList = ijfUtils.jiraApiSync('GET',aUrl, null);
		}

        var colMeta = [];
        var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "unknown";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
					//perhaps build the types here...
					colMeta[jField.id]=jField;
				}
				retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;
			retObj.key=i.key;
			return retObj;
		});



	var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

	//create Table from Json
    var gCols = translateFields.split(",");

    var tOut = "<table id="+inFormKey+'_tbl_'+inField.formCell.replace(/,/g,"_")+" cellspacing=0 cellpadding=4 style='"+l_fieldStyle+"'><tr>";
    var cIndex=0;
    gCols.forEach(function(col){
			var thisColWidth = 120;
			if(colWidths[cIndex]) thisColWidth=colWidths[cIndex]/1;
			var thisColHeader = col.columnName;
			if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
			var thStyle = "width:"+thisColWidth + ";"+l_labelStyle;
		    tOut += "<td style='"+thStyle+"'>"+thisColHeader+"</td>";
		    cIndex++;
	});
    tOut += "</tr>";
    if(dataItems)
    {
		try
		{
			dataItems.forEach(function(r){
			    tOut += "<tr>";
				gCols.forEach(function(col){
					var outVal = r[col];
					var cMeta = colMeta[col];
					if((cMeta) && (cMeta.schema))
					{
						switch(cMeta.schema.type)
						{
							case "date":
								if(col.format) outVal = Ext.util.Format.dateRenderer('dd/mm/yyyy')(outVal); //moment(val).format(col.format);
								break;
							case "datetime":
								if(col.format) outVal = Ext.util.Format.dateRenderer('dd/mm/yyyy')(outVal); //moment(val).format(col.format);
								break;
							case "numberfield":
								if(col.format) outVal = Ext.util.Format.numberRenderer(col.format)(outVal); //moment(val).format(col.format);
								break;
							default:
						}
					}
					tOut += "<td>"+outVal+"</td>";
				});
			    tOut += "</tr>";
			});

		}
		catch(e)
		{
			throw('Failed to parse the grid json');
		}
	}
    tOut += "</table>";


    var outHtml = tOut;

    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderGridHtml:function(inFormKey,item, inField, inContainer)
{
	inContainer.title = inField.toolTip;
	var l_labelStyle = inField.labelStyle;
	var l_panelStyle = inField.panelStyle;
	var l_fieldStyle = inField.fieldStyle;
	var l_Style = inField.style;

	if(!l_labelStyle) l_labelStyle="background:transparent";
	if(!l_panelStyle) l_panelStyle="background:transparent";
	if(!l_Style) l_Style="background:transparent";
    if(!l_Style) l_Style = l_panelStyle;
//get type definition
	var thisT = {};
    for(var tF in ijf.fw.CustomTypes){
		if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
  		if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
	}

	if(!thisT)	throw("Invalid type name: " + inField.dataSource);

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[thisT.fieldName];
	var jfFieldDef = ijf.jiraFieldsKeyed[thisT.fieldName];
	var jf=item.fields[jfFieldDef.id];

	var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

	var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");


		//lazy load handling for custom types
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}

	//create Table from Json
    var gCols = JSON.parse(thisT.settings);
    //order by order
    gCols = gCols.sort(function(a,b){return (a.order-b.order);});
    var cIndex = 0;
    //write out the header

    var tOut = "<table id="+inFormKey+'_tbl_'+inField.formCell.replace(/,/g,"_")+" cellspacing=0 cellpadding=4 style='"+l_fieldStyle+"'><tr>";
    gCols.forEach(function(col){
			var thisColWidth = 120;
			if(colWidths[cIndex]) thisColWidth=colWidths[cIndex]/1;
			var thisColHeader = col.columnName;
			if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];
			var thStyle = "width:"+thisColWidth + ";"+l_labelStyle;
		    tOut += "<td style='"+thStyle+"'>"+thisColHeader+"</td>";
		    cIndex++;
	});
    tOut += "</tr>";
    if(data)
    {
		try
		{
			var cts = JSON.parse(data);
			cts.forEach(function(r){
			    tOut += "<tr>";
				gCols.forEach(function(col){
					var outVal = r[col.columnName];
					switch(col.controlType)
					{
						case "datefield":
							if(col.format) outVal = Ext.util.Format.dateRenderer(col.format)(outVal); //moment(val).format(col.format);
							break;
						case "numberfield":
							if(col.format) outVal = Ext.util.Format.numberRenderer(col.format)(outVal); //moment(val).format(col.format);
							break;
						default:
					}
					tOut += "<td>"+outVal+"</td>";
				});
			    tOut += "</tr>";
			});

		}
		catch(e)
		{
			throw('Failed to parse the grid json');
		}
	}
    tOut += "</table>";


    var outHtml = tOut;

    //rendeIf logic
    var hideField = ijfUtils.renderIfShowField("",inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var pnl = new Ext.FormPanel({
        labelAlign: 'left',
        border:false,
        hidden: hideField,
        bodyStyle: l_Style,
        items: {
            html: outHtml,
            frame: false,
            border: false,
            bodyStyle:  l_panelStyle,
            xtype: "panel"}
    });
    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](pnl,inFormKey,item, inField, inContainer);
    pnl.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, pnl, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](pnl, inFormKey,item, inField, inContainer);

}
,
renderGridPanel:function(inFormKey,item, inField, inContainer)
{
	//get type definition
	var thisT = {};
    for(var tF in ijf.fw.CustomTypes){
		if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
  		if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
	}

	if(!thisT)	throw("Invalid type name: " + inField.dataSource);

    inContainer.title = inField.toolTip;

	var jfFieldMeta = ijf.jiraMetaKeyed[thisT.fieldName];
	var jfFieldDef = ijf.jiraFieldsKeyed[thisT.fieldName];
	var jf=item.fields[jfFieldDef.id];

	var data = ijfUtils.handleJiraFieldType(jfFieldDef,jf);

    if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    var colLockStr = ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'freezecols');
    var colLocks = [];
    if(colLockStr) colLocks = colLockStr.split(",");
    colLocks = colLocks.map(function(c){return c.trim()/1-1;});

    var lMaxsize =  Number.MAX_VALUE;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.fieldStyle.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var enableLocking = false;
    if (inField.fieldStyle.indexOf('locking:true')>-1)
    {
        enableLocking = true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	//if(rOnly) l_fieldStyle="background:lightgray";

    var dragdrop = false;
    var dragGroup = "gridDrag";
    var dropGroup = "gridDrop";
    var dragdropmessage = "Drag and drop to reorganize";
    var dragdropsnippet = null;
    if (inField.fieldStyle.indexOf('dragdrop:true')>-1)
    {
        dragdrop = true;
        dragGroup = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"draggroup");
        dropGroup = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dropgroup");
        dragdropmessage = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dragdropmessage");
        dragdropsnippet = ijfUtils.getNameValueFromStyleString(l_fieldStyle,"dragdropsnippet");
    }

    var ocf =  ijfUtils.getEvent(inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}

	if((!hideField) && (!perms.canSee))	hideField=true;
	if (!perms.canEdit)	rOnly=true;
	//end permissions

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (l_fieldStyle.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    var noSort = false;
    if (l_fieldStyle.indexOf('nosort:true')>-1)
    {
	        noSort=true;
    }
    var renderHeaders = true;
    if (l_fieldStyle.indexOf('headers:false')>-1)
    {
	        renderHeaders=false;
    }
	if (!perms.canEdit)	renderHeaders=false;

	var features = null;
    if (l_fieldStyle.indexOf('sums:true')>-1)
    {
        features=[{
		        ftype: 'summary'
		        }];
    }
    if(inField.dataReference2)
    {
		//features handler...
		if(!features) features=[];

		try
		{
			var rawFeatures = JSON.parse(inField.dataReference2);
			rawFeatures.forEach(function(f){
				features.push(f);
			});

		}
		catch(e)
		{
			ijfUtils.footLog("failed to set features for GRID");
		}
	}


	var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
    	l_Width = l_Width.replace("px","")/1;
	}

	var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

    //The grid setup....
    var listColumns = [];
    var tFields = [];
    var lookups = [];

		//lazy load handling for custom types
			if(!thisT.settings)
			{
			   var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

				//load the settings...
               var fullTypeRaw = ijfUtils.jiraApiSync('GET',g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId='+thisT.id, null);
			   var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g,"\"");
			   cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			   cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			   thisT = JSON.parse(cleanDoubleDouble);

			   //update local memory
			   ijf.fw.CustomTypes.splice(typeIndex, 1);
			   ijf.fw.CustomTypes.push(thisT);
			}

    var gCols = JSON.parse(thisT.settings);
    //order by order
    gCols = gCols.sort(function(a,b){return (a.order-b.order);});
    var cIndex = 0;
    var lookups = [];
    var colObj = {};


    gCols.forEach(function(col){

        var locked=false;
        if(colLocks.indexOf(cIndex)>-1) locked=true;

		var lValidator = function(v){return true};
		if((col.regEx!=null) && (col.regEx!=""))
		{
			lValidator = function(v)
			{
				var rgx = new RegExp(col.regEx);
				if (!rgx.exec(v)) {
					return col.regExMess;
				}
				return true;
			}
	    }

        var validRenderer = function (val, meta, rec, rowIndex, colIndex, store) {
                //at this poing you have the column def, if required or regex fails, make pink

                if((col.required=="Yes") && (!val))
                {
                    meta.style = "background-color:pink;";
				}
				if((col.regEx!=null) && (col.regEx!=""))
				{
					var rgxRenderCheck = new RegExp(col.regEx);
					if (!rgxRenderCheck.exec(val)) {
						meta.style = "background-color:pink;";
					}
				}

			//now manage the value formatting....
			switch(col.controlType)
			{
				case "datefield":
					if(col.format==null) col.format = 'm/d/Y';
					if(col.format=="") col.format = 'm/d/Y';
					return Ext.util.Format.dateRenderer(col.format)(val); //moment(val).format(col.format);
					break;
				case "combobox":
					//if value lookup is two dimensional, lookup value of val...
					var retVal = val;
					if(lookups[col.columnName])
					{
						var lLookup = lookups[col.columnName];
						if(lLookup)
						{
							if((typeof lLookup[0]) == "object") lLookup.forEach(function(r){if(r[0]==val) retVal=r[1];});
						}
					}
					return retVal;
					break;
			    case "numberfield":
					if(col.format) return Ext.util.Format.numberRenderer(col.format)(val); //moment(val).format(col.format);
					return val;
					break;
				default:
					return val;
			}
        }

		var thisColWidth = 120;
		if(colWidths[cIndex]) thisColWidth=colWidths[cIndex]/1;
		var thisColHeader = col.columnName;
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];

		switch(col.controlType)
		{
			case "datefield":
					tFields.push({name: col.columnName, type: 'date'});
						if(col.format==null) col.format = 'm/d/Y';
						if(col.format=="") col.format = 'm/d/Y';
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							xtype: 'datecolumn',
							renderer: validRenderer,
							ijfColumn: col,
							locked: locked,
							width: thisColWidth,
							dataIndex: col.columnName,
							filter: {
								type: 'date'
							},
							editor: {
								completeOnEnter: true,
								field: {
									xtype: col.controlType,
									allowBlank: (col.required!="Yes"),
									validator: lValidator,
									format:col.format,
									listeners: {
										change: function(n,o,f)
										{
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
										}
									}
								}
							}
			};
			break;
			case "numberfield":
					tFields.push({name: col.columnName, type: 'number'});
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							xtype: 'numbercolumn',
							renderer: validRenderer,
							align: 'end',
							width: thisColWidth,
							locked: locked,
							dataIndex: col.columnName,
							filter: {
								type: 'number'
							},
							editor: {
								completeOnEnter: true,
								field: {
									xtype: col.controlType,
									allowBlank: (col.required!="Yes"),
									validator: lValidator,
									format:col.format,
									listeners: {
										change: function(n,o,f)
										{
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
										}
									}
								}
							}
			};
			break;
			case "checkbox":
				tFields.push({name: col.columnName, type: 'boolean'});
				colObj={
						header: thisColHeader,
						sortable: true,
						hidden: false,
						disabled: rOnly,
						xtype: 'checkcolumn',
						centered:true,
						locked: locked,
						//renderer: validRenderer,
						width: thisColWidth,
						dataIndex: col.columnName,
						listeners: {
							checkchange: function(n,o,f)
							{
								ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
							}
						}
			};
			break;
			case "combobox":
					tFields.push({name: col.columnName, type: 'string'});
					//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
					var cLookupDef = {"index":"0"};
					var cListener = {
										change: function(n,o,f)
										{
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
										},
										focus: function(){
											this.validate();
										}
									};
					if(ijf.fw.CustomTypes.reduce(function(inObj,t){if(t.name==col.reference) inObj=t; return inObj;},null))
					{
						lookups[col.columnName] = ijfUtils.getReferenceDataByName(col.reference,"0",false,noSort);
					}
					else
					{
						//complex cascade...
						try
						{
							cLookupDef = JSON.parse(col.reference);
							lookups[col.columnName] = ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index,false,noSort);

							//establish a listener for this combo if necessary
							if(cLookupDef.parents)
							{
								var parentIds = cLookupDef.parents;
								var cFilters = parentIds.reduce(function(inFilter,p){
										inFilter.push({"property":p.dataIndex.toString(), "value":"tbd", "columnName":p.columnName});
										return inFilter;
									},[]);
								cListener["beforeQuery"] = function(query) {
										 	var cContainer = this.up();
											//cFilters["value"]= cValue;
											cFilters.forEach(function(f){
												//for each filter param, we need to get the correct value...
												var cValue = cContainer.grid.getSelectionModel().getSelected().items[0].data[f.columnName];
												if(!cValue) cValue = 'novaluetofilterwith';
												f.value=cValue;
											});
											this.store.clearFilter();
											this.store.filter(cFilters);
										};
							}

							//for each child, you need to clear it's value
							if(cLookupDef.children)
							{
								var childFields = cLookupDef.children;
								cListener["change"]= function(n,o,f)
								{
										var cContainer = this.up();
										childFields.forEach(function(f){
											cContainer.grid.getSelectionModel().getSelected().items[0].set(f,null);
										});
										ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
								};
							}

						}
						catch(le)
						{
							ijfUtils.footLog("failed to handle complex lookup: " + le.message);
							lookups[col.columnName] = [];
						}
					}
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							width: thisColWidth,
							dataIndex: col.columnName,
							renderer: validRenderer,
							locked: locked,
							filter: {
								type: 'list'
							},
							editor: {
								completeOnEnter: true,
								field: {
									xtype: col.controlType,
									allowBlank: (col.required!="Yes"),
									validator: lValidator,
									forceSelection: true,
									store: lookups[col.columnName],
									lookupDef: cLookupDef,
									displayField: cLookupDef.index,
								    valueField: cLookupDef.index,
								    //triggerAction: 'all',
								    //mode: 'local',
								    //lastQuery: '',
									listeners: cListener
								}
							}
			};
			break;
            case "multiselect":
					tFields.push({name: col.columnName, type: 'string'});
					//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
					var cLookupDef = {"index":"0"};
					var msLookup=[];
					var lId = 0;
					var cListener = {
										change: function(n,o,f)
										{
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
										},
										focus: function(){
											this.validate();
										}
									};

					cLookupDef = JSON.parse(col.reference);
					//lookups[col.columnName] = ijfUtils.getReferenceDataByName(cLookupDef.name,cLookupDef.index,false,noSort);
					lookups[col.columnName] = ijfUtils.getReferenceDataRaw(cLookupDef.name);
					if(lookups[col.columnName])
					{
						//this must uniquify
						var uCheck = [];
						msLookup = lookups[col.columnName].reduce(function(inA,e)
						{
							if(uCheck.hasOwnProperty(e[cLookupDef.index])) return inA;
							inA.push({id: e[cLookupDef.index], show: e[cLookupDef.index]});
							uCheck.push(e[cLookupDef.index]);
							return  inA;
						},[]);
					}
					//need to sortMsLookup
						msLookup = msLookup.sort(function(inA, inB)
						{
							a = inB.id;
							b = inA.id;
							return a>b ? -1 : a<b ? 1 : 0;
						});

					var shows = Ext.create('Ext.data.Store', {
					  fields: ['id','show'],
					  data: msLookup
				    });
					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							width: thisColWidth,
							dataIndex: col.columnName,
							renderer: validRenderer,
							locked: locked,
							filter: {
								type: 'list'
							},
							editor: {
								completeOnEnter: true,
								field: {
									xtype: 'tagfield',
									filterPickList: true,
									allowBlank: (col.required!="Yes"),
									validator: lValidator,
									forceSelection: true,
									store: shows,
									lookupDef: cLookupDef,
            valueField: 'id',
			displayField: 'show',
			value: [],
			queryMode: 'local',
			triggerAction: 'all',
			emptyText:'Please select...',
			selectOnFocus:true,
									listeners: cListener
								}
							}
			};
			break;
			default:
					tFields.push({name: col.columnName, type: 'string'});

					colObj={
							header: thisColHeader,
							sortable: true,
							hidden: false,
							width: thisColWidth,
							dataIndex: col.columnName,
							renderer: validRenderer,
							locked: locked,
							filter: {
								type: 'string'
							},
							editor: {
								completeOnEnter: true,
								field: {
									xtype: col.controlType,
									allowBlank: (col.required!="Yes"),
									validator: lValidator,
									listeners: {
										change: function(n,o,f)
										{
											ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
										},
										focus: function(){
											this.validate();
										}
									}
								}
							}
			};
		}
		ijfUtils.setColWidth(colObj,cIndex,colWidths,120);
		listColumns.push(colObj);
		cIndex++;
	});

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    var gridStore = new Ext.data.Store({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")
    });
	gridStore.ijfCols = gCols;

    //thisT.settings...
    if(data)
    {
		try
		{
			var cts = JSON.parse(data);
			cts = cts.map(function(r){ delete r.id; return r;});
			gridStore.loadData(cts);
		}
		catch(e)
		{
			throw('Failed to parse the grid json');
		}
	}
	var headerButtons =[];
		headerButtons.push({
						xtype:'button',
						text: 'Save',
						//scope: this,
						handler: function(){
							 //create record...

							var u1=this.up(); //header
							var u2=u1.up(); //grid
							try
							{
								u2.editingPlugin.completeEdit();
							}
							catch(e){}

							var onSuccessSave = function()
							{
								ijfUtils.hideProgress();
								if(ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information",ijf.main.saveResultMessage);
								ijf.main.setAllClean();
								ijf.main.resetForm();
							};
							Ext.getBody().mask("Saving...");

							if(inField.dataReference)
							{
								ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference,item);
							}
							else
							{
								ijf.main.saveResultMessage = null;
							}




							var saveIt = function(){ijf.main.saveForm(onSuccessSave,null,inField.form,item)};
							window.setTimeout(saveIt,50);
						}
					});
		headerButtons.push({
						xtype:'button',
						text: 'Add Row',
						scope: this,
						handler: function(){
							 //create record...

							var newRecord = Ext.create(gridStore.model); //switch to store record type...{id:Ext.id()};
							gCols.forEach(function(col){
								newRecord[col.columnName]=col["default"];
							});
							 //gridStore.parentGridPanel.stopEditing();
							 var position = gridStore.getCount();
							 gridStore.insert(position, newRecord);

							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);

							//force new record into edit mode
							gridStore.parentGridPanel.editingPlugin.startEdit(newRecord, 0);

						}
					});
		headerButtons.push({
						xtype:'button',
						text: 'Delete Row',
						scope: this,
						handler: function(){
							var selection = gridStore.parentGridPanel.getSelection();
							if (selection) {
								selection.forEach(function(r){
									gridStore.remove(r);
								});
							}
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
						}
					});
		headerButtons.push({
					xtype:'button',
					text:"Clear All",
					scope: this,
					handler: function(){
					   //need the formset ID...
					   var clearGridRows = function(){
							gridStore.getData().each(function(r){
									gridStore.remove(r);
							});
							ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
					   };
					   ijfUtils.modalDialog("Warning","You are about to remove all rows, are you sure?",clearGridRows);
					}
				});
		headerButtons.push({
					xtype:'button',
					text: 'Download',
					margin: '0 0 0 20',
					scope: this,
					handler: function(){
						var outStr = "";
						gridStore.ijfCols
						gridStore.ijfCols.forEach(function(c){
							outStr+= "\"" + c.columnName.replace(/"/g,"\"\"") + "\","
						});
						outStr+="\n";
						gridStore.getData().each(function(r){
							gridStore.ijfCols.forEach(function(c){
								if(r.data.hasOwnProperty(c.columnName))
								{
									//must cast this correctly
									switch(c.controlType)
									{
										case "datefield":
											outStr+=Ext.util.Format.dateRenderer(c.format)(r.data[c.columnName]) + ","
										break;
										case "numberfield":
											outStr+=r.data[c.columnName] + ","
										break;
										default:
										    if(r.data[c.columnName])
												outStr+="\"" + r.data[c.columnName].replace(/"/g,"\"\"") + "\",";
											else
												outStr+="\"" + r.data[c.columnName] + "\",";

									}
								}
								else
								{
									outStr+=",";
								}
							});
							outStr+="\n";
						});
						var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
						saveAs(blob,inField.dataSource+".csv");
					}
				});
			headerButtons.push({
				html:  "<form enctype='multipart/form-data' id='"+inFormKey+'_upGrdFrm_'+inField.formCell.replace(/,/g,"_")+"'><input id='"+inFormKey+'_upGrd_'+inField.formCell.replace(/,/g,"_")+"' type='file' name='file' onchange='ijfUtils.gridUploadCsvFile(event,\""+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"\",\""+inFormKey+'_fld_'+inField.formCell+"\");'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"});
			headerButtons.push({
				xtype:'button',
				text:"Upload",
				scope: this,
				handler: function(){
				   //need the formset ID...
				   var jKey = '#'+inFormKey+'_upGrd_'+inField.formCell.replace(/,/g,"_");
				   jQuery(jKey).val("");
				   jQuery(jKey).trigger('click');
				}
			});

    var pluginSettings = ['gridfilters',{
				ptype: 'cellediting',
				clicksToEdit: 1
        }];
    var selModelSettings = 'cellmodel';

    var listenerSettings = null;
    var tblDblClick = inField.tableDblClick;
    if(rOnly)
    {
	    pluginSettings = ['gridfilters'];
	    selModelSettings = {selType: 'rowmodel', mode: 'SINGLE'};
	    listenerSettings = {
			'beforeitemdblclick': function(selMod, record, something ){
				//look for snippet...
				if(ijf.snippets.hasOwnProperty(tblDblClick))
				{
					ijf.snippets[tblDblClick](record.data.iid,this, record);
					return;
				}
			}
		};
	}

	if(dragdrop)
	{
		if(!listenerSettings) listenerSettings={};

		listenerSettings["beforedrop"] = function(node, data, overModel, dropPosition, dropHandlers) {

                if(dragdropsnippet)
                {
					if(ijf.snippets[dragdropsnippet])
					{
						ijf.snippets[dragdropsnippet](node, data, overModel, dropPosition, dropHandlers, gridPanel);
					}
					else
					{
						dropHandlers.cancelDrop();
					}
				}
				else dropHandlers.cancelDrop();
			}
	}


    if(!renderHeaders) headerButtons=null;
    var gridPanel = new Ext.grid.GridPanel({
		 title: lCaption,
		 style: l_Style,
		 hidden: hideField,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
		 header:{
				titlePosition: 0,
				items: headerButtons
		},
        store: gridStore,
        width:l_Width,
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        enableLocking: enableLocking,
        collapsible: collapsible,
        collapsed: collapsed,
        selModel: selModelSettings,
        //disabled: rOnly,
        features: features,
		plugins: pluginSettings,
		listeners: listenerSettings
    });

	gridStore.parentGridPanel = gridPanel;

	//this is pretty much a repeat of render cell, check required and regex for every value....
	gridPanel.items.items[0].isValid = function(){
        var retVal = true;
		var gridData = gridStore.getData();
		//look for bad data and return false...
		gridData.items.forEach(function(r){
			//r = object of a row of data, keys are the columnNames
			gCols.forEach(function(col){
				var rowVal = r.data[col.columnName];
				//validate...
					if((col.required=="Yes") && (!rowVal)) retVal= false;
					if((col.regEx!=null) && (col.regEx!=""))
					{
						var rgxRenderCheck = new RegExp(col.regEx);
						if (!rgxRenderCheck.exec(rowVal)) retVal= false;
					}
			});
		});
		return retVal;
	};

    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](gridPanel,inFormKey,item, inField, inContainer);

    gridPanel.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, gridPanel, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](gridPanel, inFormKey,item, inField, inContainer);
}
,
renderGridRefEditor:function(inFormKey,item, inField, inContainer)
{
	//get type definition
	var thisT = {};
    for(var tF in ijf.fw.CustomTypes){
		if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
  		if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
	}

	if(!thisT)	throw("Invalid type name: " + inField.dataSource);

    inContainer.title = inField.toolTip;

	var data = ijfUtils.getReferenceDataRaw(thisT.name);


    if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle,'required')=="true") lAllowBlank=false;

    var lMaxsize =  Number.MAX_VALUE;

    var lValidator = function(v){return true};
    var lRegex =  inField.regEx;
    if((lRegex!=null) && (lRegex!=""))
    {
        lValidator = function(v)
        {
            var rgx = new RegExp(lRegex);
            if (!rgx.exec(v)) {
                return inField.regExMessage;
            }
            return true;
        }
    }
    var hideField = ijfUtils.renderIfShowField(data,inField);
    var hideLabel = false;
    if (inField.caption=="")
        var lCaption = inField.dataSource;
    else if(inField.caption=="none")
    {
        var lCaption = "";
        hideLabel=true;
    }
    else
        var lCaption = inField.caption;
    if (inField.style.indexOf('hidden:true')>-1)
    {
        hideLabel=true;
        hideField=true;
    }

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }
    if (inField.style.indexOf('enteronce:true')>-1)
    {
        if (!!data) rOnly=true;
    }

    var l_labelStyle = inField.labelStyle;
    var l_panelStyle = inField.panelStyle;
    var l_Style = inField.style;
    var l_fieldStyle = inField.fieldStyle;


    if(!l_labelStyle) l_labelStyle="background:transparent";
    if(!l_panelStyle) l_panelStyle="background:transparent";
    if(!l_Style) l_Style="background:transparent";
    if(!l_fieldStyle) l_fieldStyle="background:white";
	//if(rOnly) l_fieldStyle="background:lightgray";

    var ocf =  ijfUtils.getEvent(inField);

	//permissions check....has to exist...
	if(inField.permissions.enabled)
	{
		var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
	}
	else
	{
		if(inField.form.permissions.enabled) var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser); else var perms = ijfUtils.getPermissionObj(ijf.main.outerForm.permissions,ijf.currentItem,ijf.main.currentUser);
	}

	if((!hideField) && (!perms.canSee))	hideField=true;
	//end permissions

    var collapsible = true;
    if (l_fieldStyle.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (l_fieldStyle.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }
    //check if user indicated if the Paste Table         //DAYNE UPDATES
    var pasteTable = false;
    if(l_fieldStyle.indexOf('pasteTable:true')>-1){
        pasteTable=true;
    }

	var features = null;
    if (l_fieldStyle.indexOf('sums:true')>-1)
    {
        features=[{
		        ftype: 'summary'
		        }];
    }

    var enableLocking = false;
    if (l_fieldStyle.indexOf('locking:true')>-1)
    {
        enableLocking = true;
    }

	var l_Height = 300;
    var l_Height=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"height");
    if(l_Height=="")
    {
		l_Height=300;
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}

	var l_Width = 600;
    var l_Width=ijfUtils.getNameValueFromStyleString(l_fieldStyle,"width");
    if(l_Width=="")
    {
		l_Width=600;
	}
	else
	{
    	l_Width = l_Width.replace("px","")/1;
	}

	var colWidths=[];
	var colHeaders = [];
	if(inField.tableWidths) colWidths=inField.tableWidths.split(",");
	if(inField.tableHeaders) colHeaders=inField.tableHeaders.split(",");

    //The grid setup....
    var listColumns = [];
    var tFields = [];
    var lookups = [];

    var gCols = Object.keys(data[0]);

    var cIndex = 0;
    var lookups = [];


    gCols.forEach(function(col){

		var thisColWidth = 120;
		if(colWidths[cIndex]) thisColWidth=colWidths[cIndex]/1;
		var thisColHeader = col;
		if(colHeaders[cIndex]) thisColHeader=colHeaders[cIndex];

		tFields.push({name: col, type: 'string'});

		listColumns.push({
				header: thisColHeader,
				sortable: true,
				hidden: false,
				width: thisColWidth,
				dataIndex: col,
				filter: {
					type: 'list'
				},
				editor: {
					completeOnEnter: true,
					field: {
						xtype: 'textfield',
						allowBlank: true,
						listeners: {
							change: function(n,o,f)
							{

							},
							focus: function(){

							}
						}
					}
				}
		});

		cIndex++;
	});

    if(!Ext.ClassManager.isCreated(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")))
    {
        Ext.define(inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_"), {
            extend: 'Ext.data.Model',
            fields: tFields
        });
    }

    var gridStore = new Ext.data.Store({
        model: inFormKey+'_mdl_'+inField.formCell.replace(/,/g,"_")
    });
	gridStore.ijfCols = gCols;

	if(data)
    {
		gridStore.loadData(data);
	}

	var headerButtons =[];
		headerButtons.push({
						xtype:'button',
						text: 'Save Values',
						scope: this,
						handler: function(){
							 //save values..
							var gridData = gridStore.getData();
							var dataArray = gridData.items.map(function(r){return r.data;});
							//sanitize grid
							dataArray = dataArray.map(function(r){delete r.id; return Object.keys(r).map(function(c){return r[c]}).join("\t")}).join("\n");

							thisT.settings = JSON.stringify(dataArray);
							var jOut = {
										customTypeId: thisT.id,
										name: thisT.name,
										description: thisT.description,
										customType: thisT.customType,
										fieldName: thisT.fieldName,
										settings: JSON.stringify(thisT.settings)
							};
							var jdata = JSON.stringify(jOut);
							var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");
							if(isNaN(sStat))
							{
								ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
							}
							else
							{
								gridData.items.forEach(function(r){r.commit()});
								ijfUtils.modalDialogMessage("Info","Saved");
							}
						}
					});
		headerButtons.push({
						xtype:'button',
						text: 'Add Row',
						scope: this,
						handler: function(){
							 //create record...
							var newRecord = {id:Ext.id()};
							gCols.forEach(function(col){
								newRecord[col.columnName]=col["default"];
							});
							 //gridStore.parentGridPanel.stopEditing();
							var position = gridStore.getCount();
							gridStore.insert(position, newRecord);
						}
					});
		headerButtons.push({
						xtype:'button',
						text: 'Delete Row',
						scope: this,
						handler: function(){
							var selection = gridStore.parentGridPanel.getSelection();
							if (selection) {
								selection.forEach(function(r){
									gridStore.remove(r);
								});
							}
						}
					});
		headerButtons.push({
					xtype:'button',
					text:"Clear All",
					scope: this,
					handler: function(){
					   //need the formset ID...
					   var clearGridRows = function(){
							gridStore.getData().each(function(r){
									gridStore.remove(r);
							});
					   };
					   ijfUtils.modalDialog("Warning","You are about to remove all rows, are you sure?",clearGridRows);
					}
				});
		headerButtons.push({
					xtype:'button',
					text: 'Download',
					margin: '0 0 0 20',
					scope: this,
					handler: function(){
						var outStr = "";
						gridStore.ijfCols
						gridStore.getData().each(function(r){
							gridStore.ijfCols.forEach(function(c){
								if(r.data.hasOwnProperty(c))
								{
									outStr+="\"" + r.data[c] + "\","
								}
								else
								{
									outStr+=",";
								}
							});
							outStr+="\n";
						});
						var blob = new Blob([outStr], {type: "text/plain;charset=utf-8"});
						saveAs(blob,inField.dataSource+".csv");
					}
				});
			headerButtons.push({
				html:  "<form enctype='multipart/form-data' id='"+inFormKey+'_upGrdFrm_'+inField.formCell.replace(/,/g,"_")+"'><input id='"+inFormKey+'_upGrd_'+inField.formCell.replace(/,/g,"_")+"' type='file' name='file' onchange='ijfUtils.gridUploadCsvFile(event,\""+inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_")+"\",\""+inFormKey+'_fld_'+inField.formCell+"\",true);'></form>",
				frame: false,
				hidden: true,
				border: false,
			    xtype: "panel"});
			headerButtons.push({
				xtype:'button',
				text:"Upload",
				scope: this,
				handler: function(){
				   //need the formset ID...
				   var jKey = '#'+inFormKey+'_upGrd_'+inField.formCell.replace(/,/g,"_");
				   jQuery(jKey).val("");
				   jQuery(jKey).trigger('click');
				}
			});

		if(pasteTable){
			headerButtons.push({
			xtype:'button',
			text:"Paste Table",
			scope: this,
			//hidden: false,
			handler: function(){
				//----------------------------------------//
				var saveGrid = function(gridStore){
					//get type definition
					var thisT = {};
					for(var tF in ijf.fw.CustomTypes){
					  if(!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
					  if(ijf.fw.CustomTypes[tF].name==inField.dataSource) thisT=ijf.fw.CustomTypes[tF];
					}

					if(!thisT)	throw("Invalid type name: " + inField.dataSource);
					//save values..
					var gridData = gridStore.getData();
					var dataArray = gridData.items.map(function(r){return r.data;});
					//sanitize grid
					dataArray = dataArray.map(function(r){delete r.id; return Object.keys(r).map(function(c){return r[c]}).join("\t")}).join("\n");

					thisT.settings = JSON.stringify(dataArray);
					var jOut = {
						customTypeId: thisT.id,
						name: thisT.name,
						description: thisT.description,
						customType: thisT.customType,
						fieldName: thisT.fieldName,
						settings: JSON.stringify(thisT.settings)
					};
					var jdata = JSON.stringify(jOut);
					var sStat = ijfUtils.saveJiraFormSync(jdata,"saveCustomType");
					if(isNaN(sStat)){
					 ijfUtils.modalDialogMessage("Save Error","Sorry, something went wrong with the save: " + sStat);
					}else{
					 gridData.items.forEach(function(r){r.commit()});
					}
				}
				//----------------------------------------//
				var resetPromptBox = function(){
					var promptBox = Ext.Msg;
					promptBox.buttonText={
					yes: 'Yes',
					no: 'No'
					};
				}
				//----------------------------------------//
				var ParseUserData = function(Data){
					var array = Data.split("\n");
					var tableArray = [];
					array.forEach(function(r){
						if(r != ""){
							tableArray.push(r.split("\t"));
							//ArofAr[0].join(",")
						}
					})
					return tableArray;
				}
				//----------------------------------------//
				var promptBox = Ext.Msg;
				promptBox.buttonText={
					yes: 'Append data',
					no: 'Paste over current data'
				};
				//----------------------------------------//
				//call back functions
				var callBack = function(button) {
					if(button == "yes"){ //append
						var ArofAr = ParseUserData(document.getElementById('inputText').value);
						//add this data
						gridStore.add(ArofAr);
						//save this data
						saveGrid(gridStore);
					}else if(button == "no"){   //pasteover
						var ArofAr = ParseUserData(document.getElementById('inputText').value);
						//remove current data
						gridStore.getData().each(function(r){
										gridStore.remove(r);
								});
						//set ArofAr to table
						gridStore.loadData(ArofAr);
						//save this data
						saveGrid(gridStore);
					}else if(button == "cancel"){ //cancel buttons

					}
					//at the end of all of this
					resetPromptBox();
					}
				/********************/
				//give a text area for user
				var getTD = function() {
					Ext.Msg.show({
						title: 'Paste Table Data Below',
						msg: '<textarea rows="25" cols="78" id="inputText"></textarea>',
						buttons: Ext.Msg.YESNOCANCEL,
						width: 1200,
						height: 1200,
						fn: callBack
						}, {}, 4);
				}
				/********************/
				getTD();
			} //end of handler function
		  });
		}

    var gridPanel = new Ext.grid.GridPanel({
		 title: lCaption,
		 style: l_Style,
		 hidden: hideField,
		 bodyStyle: l_panelStyle,
		 height: l_Height,
		 header:{
				titlePosition: 0,
				items: headerButtons
		},
        store: gridStore,
        width:l_Width,
        enableLocking: enableLocking,
        id: inFormKey+'_ctr_'+inField.formCell.replace(/,/g,"_"),
        //reserveScrollOffset: true,
        columns: listColumns,
        frame: true,
        collapsible: collapsible,
        collapsed: collapsed,
        selModel: 'cellmodel',
        disabled: rOnly,
        features: features,
		plugins: ['gridfilters',{
			ptype: 'cellediting',
			clicksToEdit: 1
        }]
    });

	gridStore.parentGridPanel = gridPanel;

    //before render....
    if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](gridPanel,inFormKey,item, inField, inContainer);

    gridPanel.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, gridPanel, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](gridPanel, inFormKey,item, inField, inContainer);
}
,
//charting
renderPieChart :function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var hideField = ijfUtils.renderIfShowField("",inField);

    var collapsible = true;
    if (inField.style.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";

	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}


    var store = Ext.create('Ext.data.Store', {
		fields: ['wedge', 'data1' ],
		data: [
			{ wedge: 'Android', data1: 68.3 },
			{ wedge: 'BlackBerry', data1: 1.7 },
			{ wedge: 'iOS', data1: 17.9 },
			{ wedge: 'Windows Phone', data1: 10.2 },
			{ wedge: 'Others', data1: 1.9 }
		]
	});

    var layout = new Ext.Panel({
        title: lCaption,
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: "100%",
        controller:  Ext.create('Ext.app.ViewController', {
		    onDataRender: function (v) {
		        return v + '%';
		    },
		    onSeriesTooltipRender: function (tooltip, record, item) {
		        tooltip.setHtml(record.get('wedge') + ': ' + record.get('data1') + '%');
		    }
		}),
        layoutConfig: {
            columns: 1
        },
        bodyStyle: l_Style,
        items: [Ext.create('Ext.chart.PolarChart',{
			        theme: 'default-gradients',
			        width: '100%',
			        height: 500,
			        insetPadding: 50,
			        innerPadding: 20,
			        store: store,
			        legend: {
			            docked: 'bottom'
			        },
			        interactions: ['rotate'],
			        sprites: [{
			            type: 'text',
			            text: 'Title of my Pie Chart',
			            fontSize: 22,
			            width: 100,
			            height: 30,
			            x: 40, // the sprite x position
			            y: 20  // the sprite y position
			        }, {
			            type: 'text',
			            text: 'Use beforeRender to alter data',
			            x: 12,
			            y: 375
			        }, {
			            type: 'text',
			            text: 'signature of before render: (chart, inFormKey,item, inField, inContainer)',
			            x: 12,
			            y: 390
			        }],
			        series: [{
			            type: 'pie',
			            angleField: 'data1',
			            label: {
			                field: 'wedge',
			                calloutLine: {
			                    length: 60,
			                    width: 3
			                    // specifying 'color' is also possible here
			                }
			            },
			            highlight: true,
			            tooltip: {
			                trackMouse: true,
			                renderer: 'onSeriesTooltipRender'
			            }
			        }]
    		})]
    });


	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);
}
,

renderBarChart :function(inFormKey,item, inField, inContainer)
{

    inContainer.title = inField.toolTip;

    var curIndex = 0;

    var lCaption = inField.caption;

    var rOnly = false;
    if (inField.fieldStyle.indexOf('readonly:true')>-1)
    {
        rOnly=true;
    }

    var hideField = ijfUtils.renderIfShowField("",inField);

    var collapsible = true;
    if (inField.style.indexOf('collapsible:false')>-1)
    {
        collapsible=false;
    }
    var collapsed = false;
    if (inField.style.indexOf('collapsed:true')>-1)
    {
        collapsed=true;
    }


	    var l_labelStyle = inField.labelStyle;
	    var l_panelStyle = inField.panelStyle;
	    var l_Style = inField.style;
	    var l_fieldStyle = inField.fieldStyle;


	    if(!l_labelStyle) l_labelStyle="background:transparent";
	    if(!l_panelStyle) l_panelStyle="background:transparent";
	    if(!l_Style) l_Style="background:transparent";
	    if(!l_fieldStyle) l_fieldStyle="background:transparent";

	var l_Height = 'auto';
    var l_Height=ijfUtils.getNameValueFromStyleString(l_panelStyle,"height");
    if(l_Height=="")
    {
		l_Height='auto';
	}
	else
	{
    	l_Height = l_Height.replace("px","")/1;
	}


    var store = Ext.create('Ext.data.Store', {
    fields: ['category', 'value'],
    data: [
        { category: 'USA',     value:20},
        { category: 'China',   value:30},
        { category: 'Japan',   value:40},
        { category: 'UK',      value:50}
    ]
	});

    var layout = new Ext.Panel({
        title: lCaption,
        collapsible: false,
        collapsed: false,
        hidden: hideField,
        width: "100%",
        layoutConfig: {
            columns: 1
        },
        bodyStyle: l_Style,
        controller:  Ext.create('Ext.app.ViewController', {

				onAxisLabelRender: function (axis, label, layoutContext) {
					return Ext.util.Format.number(layoutContext.renderer(label), '0,000');
				},

				onSeriesLabelRender: function (v) {
					return Ext.util.Format.number(v, '0,000');
				},

				onItemEditTooltipRender: function (tooltip, item, target, e) {
					var formatString = '0,000',
						record = item.record;

					tooltip.setHtml(record.get('category') + ': ' +
						Ext.util.Format.number(target.yValue, formatString));
				},

				onSeriesTooltipRender: function(tooltip, record, item) {
					var formatString = '0,000';

					tooltip.setHtml(record.get('category') + ': ' +
						Ext.util.Format.number(record.get('value'), formatString));
				},

				onColumnRender: function (v) {
					return v;
				}
		}),
          items: [Ext.create('Ext.chart.CartesianChart',{
		        width: '100%',
		        height: 500,
		        insetPadding: 40,
		        flipXY: false,
		        interactions: {
		            type: 'itemedit',
		            style: {
		                lineWidth: 2
		            },
		            tooltip: {
		                renderer: 'onItemEditTooltipRender'
		            }
		        },
		        animation: {
		            easing: 'easeOut',
		            duration: 500
		        },
		        store: store,
		        axes: [{
		            type: 'numeric',
		            position: 'left',
		            fields: 'value',
		            grid: false,
		            maximum: 100,
		            majorTickSteps: 10,
		            title: 'My Axis Title',
		            renderer: 'onAxisLabelRender'
		        }, {
		            type: 'category',
		            position: 'bottom',
		            fields: 'category',
		            grid: true
		        }],
		        series: [{
		            type: 'bar',
		            xField: 'category',
		            yField: 'value',
		            style: {
		                minGapWidth: 10
		            },
		            highlightCfg: {
		                strokeStyle: 'black',
		                radius: 10
		            },
		            label: {
		                field: 'value',
		                display: 'insideEnd',
		                renderer: 'onSeriesLabelRender'
		            },
		            tooltip: {
		                trackMouse: true,
		                renderer: 'onSeriesTooltipRender'
		            }
		        }],
		        sprites: [{
		            type: 'text',
		            text: 'Title of My Bar Chart',
		            fontSize: 22,
		            width: 100,
		            height: 30,
		            x: 40, // the sprite x position
		            y: 20  // the sprite y position
		        }, {
		            type: 'text',
		            text: 'Use beforeRender to alter: signature(chart, inFormKey, item, inField, inContainer)',
		            fontSize: 10,
		            x: 12,
		            y: 490
		        }]
		    })]

    });


	//before render....
	if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](layout, inFormKey,item, inField, inContainer);

    layout.render(inContainer);
    var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, layout, inContainer);
    ijf.main.controlSet[thisControl.id]=thisControl;
    //after render....
    if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](layout, inFormKey,item, inField, inContainer);
}


}

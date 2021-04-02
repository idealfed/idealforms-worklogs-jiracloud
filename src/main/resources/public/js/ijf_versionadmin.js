var ijf = ijf || {};

ijf.versionAdmin = {
    localProduct:null,
    iftProduct:null,
    productBackups:null,
    productVersions:null,

    isUserJiraAdmin:function() {
        return ijf.main.currentUser.groupList.reduce(function(inB, g) {
            if (["jira-adminisrators"].indexOf(g) > -1)
                inB = true;
            return inB;
        }, false);
    },
    getConfiguration:function(inId)
    {
		try
		{
            var thisConfig = ijfUtils.jiraApiSync("GET",'/plugins/servlet/iforms?ijfAction=getConfig&version='+inId,null);

			//todo:  may not need to do this encoding for cloud
			var cleanDoubleDouble = thisConfig.replace(/\"\"/g,"\"");
			cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g,"%");
			cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"","\"\"");
			var parsedConfig = JSON.parse(cleanDoubleDouble);

            var retConfig = ijfUtils.formatConfigJson(parsedConfig);


			return retConfig;
	    }
	    catch(e)
	    {
			return null;
		}
	},
    getIftConfiguration:function(inId)
    {
		try
		{
            var thisConfig = ijfUtils.jiraApiSync("GET",'/ift/rest/product/'+g_IftProduct+'/version/'+inId,null);

			return thisConfig.result;
	    }
	    catch(e)
	    {
			return null;
		}
	},
	applyConfiguration:function(inId)
	{
		var thisConfig = this.getConfiguration(inId);

		if(thisConfig)
		{
			var applyConfig = function(){
				ijfUtils.writeFullConfig(thisConfig, true, "You have reverted to a prior configuration version to your product, please open or refresh the application to see changes.");
			}
			ijfUtils.modalDialog("Warning","You are about to revert to this saved configuration, are you sure?",applyConfig);
		}
		else
		{
			ijfUtils.modalDialogMessage("Error","Unable to parse the selected configuration, please try a different one.");
			var sUp = function(){window.scrollTo(0,0);};
			window.setTimeout(sUp,500);
		}
	},
	applyIftVersion:function(inId)
	{
		var thisConfig = this.getIftConfiguration(inId);

		if(thisConfig)
		{
			var applyConfig = function(){
				ijfUtils.writeFullConfig(thisConfig, true,"You have applied an IFT configuration version for your product, please open or refresh the application to see changes.");
			}
			ijfUtils.modalDialog("Warning","You are about to apply to this IFT configuration, are you sure?",applyConfig);

		}
		else
		{
			ijfUtils.modalDialogMessage("Error","Unable to parse the selected version, please contact support.");
			var sUp = function(){window.scrollTo(0,0);};
			window.setTimeout(sUp,500);
		}
	},
	onOpenFormDesigner:function()
	{
				//do a standard popform....
			var targetDiv = document.getElementById("iftProductForms_id");
			var productForms = ["IFT My Worklogs","IFT Worklog Report"]


			var outHtml = "<br>The IFT Worklogs product is built and configured using Ideal Forms for JIRA.  This product includes a portion of Ideal Forms that allows you to edit and modify your version of Worklogs.  The links below will open the forms designer for your two forms.  When you save, the system will continually backup your current version and it will keep the last 50 versions you save which you can revert to at any time.  The designer is complex so please reach out with questions.  Adding columns to a display is pretty easy, altering behavoir will requires some javascript coding.<br>";

			outHtml += ijf.versionAdmin.localProduct.forms.reduce(function(inV, f){
				if(productForms.indexOf(f.name)>-1)
					inV += "<br><a target='_blank' href='"+getIjfRoot()+"/run?debug=true&craft=true&itemId=&formId="+f.name+"&jwt="+getJwtToken()+"'>Click here to design "+f.name+"</a>";
				return inV;
				},"");

			targetDiv.innerHTML=outHtml;
			targetDiv.style.marginToptop="5px";
			targetDiv.style.marginLeft="10px";
			targetDiv.style.display='inline-block';

			var eContainer = Ext.getCmp("whatYouCanDoId");
			eContainer.setHeight(400);
            document.getElementById("formListLinkId").style.display="none";

	},
    render_Borderlayout:function(inContainerId) {
        var colSpans = {};
        ijfUtils.setContent(inContainerId, 1, 1, colSpans, false, colSpans);

		var iftProductsRaw =  ijfUtils.jiraApiSync("GET",'/ift/rest/products',null);

		this.iftProduct = iftProductsRaw.resultSet.reduce(function(inV,p){
		   if(p.productId==g_IftProduct) inV=p; return inV;
		},null);

        this.localProduct = ijf.fw.formSets.reduce(function(inV,f){if(f.iftFormGroup==g_IftProduct) inV=f; return inV;},null);
        var baseSys = document.location.ancestorOrigins[0];

        var outHtml1="";
        var outHtml2="";
        var outHtml3="";
        var outHtml4="<hr>";

        if((this.iftProduct) && (this.localProduct))
        {
            //this is an installed producted.  Show versions and options...
            outHtml1="<div style='margin-bottom:5px;font-weight:bold;font-size:24pt'>Ideal Federal Technologies (IFT): " + this.iftProduct.name + "</div><br>Greetings, thank you for installing IFT Worklogs.  You are viewing the configuration options for your IFT product.  IFT products, such as Worklogs, are defined using a configuration package that allows you to run different product versions as you see fit.  You can also modify your own version if you want to alter the product's behavior.";

            outHtml2 = "<div style='margin-top:5px;margin-bottom:5px;font-weight:bold;font-size:20pt'>About "+this.iftProduct.name+":</div><br>" +this.iftProduct.description;

            var pActionHtml = "<ul>";
            pActionHtml+="<li style='margin-top:0px'>Open the Worklogs application using the menu item inside \"Apps\" in the JIRA header above. Or click <a href='"+baseSys+"/plugins/servlet/ac/com-idealfed-forms10/ijf-worklogs-runtime' target='_blank'>here</a> to open in a new tab.</li>";
            pActionHtml+="<li style='margin-top:15px'>Modify your own Worklogs forms... <a id='formListLinkId' href='javascript:ijf.versionAdmin.onOpenFormDesigner()'>more</a>.<div style='display:none' id='iftProductForms_id'></div></li>";
            pActionHtml+="<li style='margin-top:15px'>Change your working version to one of your backups (below left).</li>";
            pActionHtml+="<li style='margin-top:15px'>Change your working version to one of IFT versions (below right).</li>";
            pActionHtml+="<li style='margin-top:15px'>Open our <a href='https://www.idealfed.com/products/"+g_IftProduct+"' target='_blank'>feedback and comments page</a> and provide IFT feedback on this product.</li>";
            pActionHtml+="</ul>";

            outHtml3 = "<div style='margin-top:5px;margin-bottom:0px;font-weight:bold;font-size:20pt'>What you can do:</div><br>" +pActionHtml;

        }
        else
        {
            var outHtml1="<div style='font-weight:bold;font-size:24pt'>Ideal Federal Technologies (IFT): Unable to find product</div><br>";


            var outHtml2="We are unable to identify your currently installed product for this plugin.  Can you please contact IFT support here (add link)";

        }
        var customerBaseUrl = document.location.ancestorOrigins[0];
        if(customerBaseUrl.indexOf("idealfed")>-1)
        {
			//add admin link for idealfed utils
			outHtml4 = "<br><a href='"+g_root+"/admin?mode=forms&jwt="+getJwtToken() + "' target='_blank'> Idealfed Adminstration</a><br><hr>";
		}

        //get the save history
		var saveHistory = ijfUtils.jiraApiSync("GET","/plugins/servlet/iforms","ijfAction=getVersions");
		var saveData = saveHistory; //JSON.parse(saveHistory);
		var tblStart = "<table cellspacing=0 cellpadding=2 style='width:100%'><tr><td style='color:white;background-color:black' colspan=3>Local Product Backups</td></tr>";
		tblStart+="<tr><td style='font-weight:bold;border-bottom:solid black 1px'>User</td><td style='font-weight:bold;border-bottom:solid black 1px'>Date</td><td style='border-bottom:solid black 1px'></td></tr>";
		var outStr = saveData.resultSet.reduce(function(bStr, s){
			if(!s.author) return bStr;
			bStr+= "<tr><td>Backup ID: "+s.id +"</td><td>" + s.created + "</td><td><a href=JAVASCRIPT:ijf.versionAdmin.applyConfiguration("+s.id+")>Apply</a></td></tr>";
			return bStr;
		},tblStart);
		outStr += "</table>";
		this.productBackups = outStr;


        //get the product versions
		var tblStart = "<table cellspacing=0 cellpadding=2 style='width:100%'><tr><td style='color:white;background-color:black' colspan=3>IFT Product Versions</td></tr>";
		tblStart+="<tr><td style='font-weight:bold;border-bottom:solid black 1px'>Version</td><td style='font-weight:bold;border-bottom:solid black 1px'>Description</td><td style='border-bottom:solid black 1px'></td></tr>";
        var versions = ijfUtils.jiraApiSync("GET", '/ift/rest/product/' + this.iftProduct.id+ '/versions', null);
        outStr = versions.resultSet.reduce(function(bStr,s) {
			if(!s.author) return bStr;
			bStr+= "<tr><td>"+s.version +"</td><td>" + s.description + "</td><td><a href=JAVASCRIPT:ijf.versionAdmin.applyIftVersion("+s.id+")>Apply</a></td></tr>";
			return bStr;
 		},tblStart);
		outStr += "</table>";
		this.productVersions = outStr;






        var pnl = new Ext.FormPanel({
            layout: 'vbox',
            border:false,
            hidden: false,
            flex: 1,
            bodyStyle: "background-color:transparent",
            style: "margin-left:20px;margin-top:20px",
            items: [
                {
                    xtype: "panel",
                    html: outHtml1,

                    frame: false,
                    border: false,
                    //height: 200,
                    flex: 1,
                    width: "80%",
                    style: "height:auto;background:transparent;margin:5px 5px 5px 5px; padding:10px 10px 10px 10px",
                    bodyStyle:  "overflow-wrap: break-word;height:300px;background:transparent;margin:5px 5px 5px 5px; padding:5px 5px 5px 5px"},
                {
                    xtype: "panel",
                    html: outHtml2,
                    frame: false,
                    border: false,
                    flex: 1,
                    width: "80%",
                    style: "height:auto;background:transparent;margin:5px 5px 5px 5px; padding:10px 10px 10px 10px",
                    bodyStyle:  "overflow-wrap: break-word;height:auto;background:transparent;margin:5px 5px 5px 5px; padding:5px 5px 5px 5px"},
                {
                    xtype: "panel",
                    id: "whatYouCanDoId",
                    html: outHtml3,
                    frame: false,
                    border: false,
                    flex: 1,
                    width: "80%",
                    height: "auto",
                    style: "background:transparent;margin:5px 5px 5px 5px; padding:10px 10px 10px 10px",
                    bodyStyle:  "overflow-wrap: break-word;background:transparent;margin:5px 5px 5px 5px; padding:5px 5px 5px 5px"},
                {
                    xtype: "panel",
                    html: outHtml4,
                    frame: false,
                    border: false,
                    flex: 1,
                    width: "80%",
                    height: "auto",
                    style: "background:transparent",
                    bodyStyle:  "background:transparent"},
                {
                    xtype: "panel",
                    layout: 'hbox',
                    frame: false,
                    border: false,
                    flex: 1,
                    width: "80%",
                    height: "auto",
                    style: "background:transparent;margin:5px 5px 5px 5px; padding:10px 10px 10px 10px",
                    bodyStyle:  "overflow-wrap: break-word;height:300px;background:transparent;margin:5px 5px 5px 5px; padding:5px 5px 5px 5px",
                    items: [
                        {
                            xtype: "panel",
                            html: this.productBackups,
                            frame: false,
                            border: false,
							flex: 1,
							width: "100%",
							style: "height:auto;background:transparent;margin:5px 5px 5px 5px;",
							bodyStyle:  "overflow-wrap: break-word;height:300px;background:transparent;margin:5px 5px 5px 5px;"},
                        {
                            xtype: "panel",
                            html: this.productVersions,
                            frame: false,
                            border: false,
							flex: 1,
							width: "100%",
							style: "height:auto;background:transparent;margin:5px 5px 5px 5px;",
							bodyStyle:  "overflow-wrap: break-word;height:300px;background:transparent;margin:5px 5px 5px 5px;"}
                    ]
                },
                {
                    xtype: "panel",
                    html: "",
                    frame: false,
                    border: false,
                    bodyStyle:  null}
            ]
        });


        var tElement = document.getElementById(inContainerId+"_1_1");
        var wWidth = window.innerWidth-100 + "px";

        tElement.style.width= wWidth;
        pnl.render(tElement);

        ijf.main.controlSet[tElement.id] =   new itemControl(tElement.id, null, null, pnl, null);
    }

}
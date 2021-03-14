//manual imports
var MuiTextField = window['material-ui']["TextField"];
var MuiThemeProvider = window['material-ui']["MuiThemeProvider"];
var MuiButton = window['material-ui']["Button"];
var Icon = window['material-ui']['Icon'];
var IconButton = window['material-ui']['IconButton'];
var Card = window['material-ui']['Card'];
var CardActions =  window['material-ui']['CardActions'];
var CardContent =  window['material-ui']['CardContent'];
var CardHeader =  window['material-ui']['CardHeader'];

var Typography =  window['material-ui']['Typography'];
var withStyles =  window['material-ui']['withStyles'];

var Menu =  window['material-ui']['Menu'];
var MenuItem =  window['material-ui']['MenuItem'];



var ijf = ijf || {};
ijf.reactUtils ={



renderTextbox(inFormKey,item, inField, inContainer)
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
			var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		//console.log(JSON.stringify(perms));
		if((!rOnly) && (!perms.canEdit)) rOnly=true;
		if((!hideField) && (!perms.canSee))	hideField=true;
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

		class LocalMuiTextField extends React.Component {

		  constructor(props) {
			super(props);
			this.state = {
			  value: data,
			};
		  }
		  handleChange = (event) => {
			//add OCF call here..
			if(inField.dataSource=="session")
			{
				ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
			}
			else
			{
				ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
			}
			if(lValidator(event.target.value))
			{
				ocf(event);
			}
			this.setState({
			  value: event.target.value,
			});
		  };

		  render() {
			return (
			  <div>
			   <MuiThemeProvider>
				<MuiTextField
				  fullWidth={true}
				  label={lCaption}
				  disabled={rOnly}
				  required={true}
				  multiline={false}
				  id={inFormKey+'_ctr_'+inField.formCell.replace(",","_")}
				  value={this.state.value}
				  onChange={this.handleChange}
				/>
				</MuiThemeProvider>
			  </div>
			);
		  }
		}

		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTextField,inFormKey,item, inField, inContainer);

		var controlReference = ReactDOM.render(<LocalMuiTextField />, inContainer);

		var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id]=thisControl;
		//after render....
		if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey,item, inField, inContainer);
	},

	renderTextarea(inFormKey,item, inField, inContainer)
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
				var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser);
			}
			//console.log(JSON.stringify(perms));
			if((!rOnly) && (!perms.canEdit)) rOnly=true;
			if((!hideField) && (!perms.canSee))	hideField=true;
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

			class LocalMuiTextField extends React.Component {

			  constructor(props) {
				super(props);
				this.state = {
				  value: data,
				};
			  }
			  handleChange = (event) => {
				//add OCF call here..
				if(inField.dataSource=="session")
				{
					ijf.session[inFormKey+'_fld_'+inField.formCell]=n;
				}
				else
				{
					ijf.main.controlChanged(inFormKey+'_fld_'+inField.formCell);
				}
				if(lValidator(event.target.value))
				{
					ocf(event);
				}
				this.setState({
				  value: event.target.value,
				});
			  };

			  render() {
				return (
				  <div>
					<MuiTextField
					  fullWidth={true}
					  label={lCaption}
					  disabled={rOnly}
					  required={true}
					  multiline={true}
					  id={inFormKey+'_ctr_'+inField.formCell.replace(",","_")}
					  value={this.state.value}
					  onChange={this.handleChange}
					/>
				  </div>
				);
			  }
			}

			//before render....
			if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTextField,inFormKey,item, inField, inContainer);

			var controlReference = ReactDOM.render(<LocalMuiTextField />, inContainer);

			var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, controlReference, inContainer);

			ijf.main.controlSet[thisControl.id]=thisControl;
			//after render....
			if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey,item, inField, inContainer);
		},

	 renderButton:function(inFormKey,item, inField, inContainer)
	{
		inContainer.title = inField.toolTip;

		var hideField = ijfUtils.renderIfShowField(null,inField);
        var readOnly = false;
		var lCaption = inField.caption;

		var ocf =  ijfUtils.getEvent(inField);


		//permissions check....has to exist...
		if(inField.permissions.enabled)
		{
			var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		else
		{
			var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		if((!hideField) && (!perms.canSee))	hideField=true;
		//end permissions
		try
		{
			var style = JSON.parse(inField.style);
		}
		catch(e)
		{
			var style = {}
		}
		try
		{
			var fieldSettings = JSON.parse(inField.fieldStyle);
		}
		catch(e)
		{
			var fieldSettings = {}
		}

		var disabled = false;
		if(hideField) style.visibility = "hidden";
		if(fieldSettings.readonly) disabled = true;
		if(!fieldSettings.size) fieldSettings.size = "medium";



		const LocalMuiButton = () => (
		  <div>
			  <MuiButton onClick={ocf} disabled={disabled} size={fieldSettings.size} color={fieldSettings.color} variant={fieldSettings.variant} style={style}>
				{lCaption}
			  </MuiButton>
		  </div>
		);


		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiButton, item, inField, inContainer);

		var controlReference = ReactDOM.render(<LocalMuiButton />, inContainer);
		var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id]=thisControl;
		//after render....
		if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey,item, inField, inContainer);
	  },

	 renderCardList:function(inFormKey,item, inField, inContainer)
	{
		inContainer.title = inField.toolTip;

		var hideField = ijfUtils.renderIfShowField(null,inField);
        var readOnly = false;
		var lCaption = inField.caption;

		var ocf =  ijfUtils.getEvent(inField);

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
        var dataItems = rawList.issues.map(function(i){
			var retObj ={};
			translateFields.split(",").forEach(function(f){
				var thisField = f.trim();
				var dVal = "";
				var jField = ijfUtils.getJiraFieldById(thisField);
				if(i.fields.hasOwnProperty(jField.id))
				{
					dVal = ijfUtils.handleJiraFieldType(jField,i.fields[jField.id],true);
				}
				if(!dVal) dVal="";
				if(jField.name) retObj[jField.name]= dVal;
					else retObj[thisField]= dVal;
			});
			//retObj.iid=i.id;
			retObj.iid=i.key;
			retObj.key=i.key;
			return retObj;
		});


		//permissions check....has to exist...
		if(inField.permissions.enabled)
		{
			var perms = ijfUtils.getPermissionObj(inField.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		else
		{
			var perms = ijfUtils.getPermissionObj(inField.form.permissions,ijf.currentItem,ijf.main.currentUser);
		}
		if((!hideField) && (!perms.canSee))	hideField=true;
		//end permissions
		try
		{
			var style = JSON.parse(inField.style);
		}
		catch(e)
		{
			var style = {}
		}
		try
		{
			var panelStyle = JSON.parse(inField.panelStyle);
		}
		catch(e)
		{
			var panelStyle = {}
		}
		try
		{
			var fieldStyle = JSON.parse(inField.fieldStyle);
		}
		catch(e)
		{
			var fieldStyle = {}
		}


		var disabled = false;
		if(hideField) style.visibility = "hidden";

       //REACT section
       	class DynamicMenuRow extends React.Component {
	   			  constructor(props) {
	   				super(props);
	   				this.state = {
	   				  menuRow: props.menuRow,
	   				  owningClass: props.owningClass,
	   				};
	   			  }

	   			  handleClick(inOwner){
					  this.state.owningClass.handleClose();
					  ijf.snippets[this.state.menuRow.snippet](inOwner);
				  }
	   			  render()
	   			  {
	   				return (
	   				    <MenuItem onClick={() => this.handleClick(this.state.owningClass)}>{this.state.menuRow.label}</MenuItem>
	   		  		);
	   		      }
	     }

		class DynamicHtml extends React.Component {
			  constructor(props) {
				super(props);
				//need to do replaces here...

				var tempHtml = ijfUtils.switchAttsGeneric(props.htmlContent,props.dataRow);
				this.state = {
				  template: { __html: tempHtml },
				  dataRow: props.dataRow
				};
			  }
			  render()
			  {
				return (
				<div dangerouslySetInnerHTML={this.state.template} />
		  		);
		      }
	     }

		class MuiCard extends React.Component {
			  constructor(props) {
				super(props);
				this.state = {
				  row: props.dataRow,
  				  owningClass:props.owningClass,
				  title:props.title,
				  subHeader:props.subHeader,
				  contentOut:props.contentOut,
				  cardMenu:props.cardMenu,
  			      anchorEl: null
				};
			  }


			  handleClick = event => {
				this.setState({ anchorEl: event.currentTarget });
			  };

			  handleClose = () => {
				this.setState({ anchorEl: null });
			  };

			  getMenuRow(r, owningClass)
			  {
				  return (<DynamicMenuRow menuRow={r} owningClass={owningClass}/>)
			  }

			  getMenu(menuRows,owningClass)
			  {
				  if(!menuRows) return;
				  return (
					  <Menu
							id={"card_menu_id_"+owningClass.state.row.key}
							anchorEl={owningClass.state.anchorEl}
							open={Boolean(owningClass.state.anchorEl)}
							onClose={owningClass.handleClose}
						  >
						   {menuRows.map(function(r){return owningClass.getMenuRow(r,owningClass)})}
					  </Menu>

				  );
			  }
			  render()
			  {
				return (<div>
						  <Card style={style}>
							<CardHeader style={panelStyle}
									  avatar = {<Icon color="primary">{fieldStyle.avatar}</Icon>}
									  action={
										  <IconButton onClick={this.handleClick}
											  aria-owns={this.state.anchorEl ? 'simple-menu' : null}
											  aria-haspopup="true">
											<Icon>{fieldStyle.actionIcon}</Icon>
										  </IconButton>
										}
										title={<Typography variant="headline" component="h2">
													<DynamicHtml htmlContent={this.state.title} dataRow={this.state.row} />
												</Typography>}
										subheader={<DynamicHtml htmlContent={this.state.subHeader} dataRow={this.state.row} />}
							/>
							<CardContent>
							   <Typography  component="p">
								<DynamicHtml htmlContent={this.state.contentOut} dataRow={this.state.row} />
								</Typography>
							</CardContent>
						  </Card>
							 {this.getMenu(this.state.cardMenu, this)}
						</div>
				  );
		  	}
		}

		class CardList extends React.Component {
			  constructor(props) {
				super(props);
				this.state = {
				  value: dataItems
				};
			  }

			   getCard(row,owningClass)
			   {
				    //must transform content using field Style
				    //row has the fields...must translate content into values using replaceKeyValues
				    var title = fieldStyle.title
				    var subHeader = fieldStyle.subHeader
				    var contentOut = fieldStyle.content
				    var cardMenu = fieldStyle.menu
				    var lRow = row

					return (
						<div>
						  <MuiCard dataRow={row}
							  owningClass={owningClass}
							  title={title}
							  subHeader={subHeader}
							  contentOut={contentOut}
							  cardMenu={cardMenu} />
						</div>
					  );
			   }

			   getCards(inData, owningClass)
			   {
				   return inData.map(function(r){return owningClass.getCard(r,owningClass)});
			   }

		  render()
		  {
		    return (
			<div>
				{this.getCards(this.state.value, this)}
			</div>
		  );
	  	}
	  }

		//before render....
		if(ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](CardList, item, inField, inContainer);

		var controlReference = ReactDOM.render(<CardList />, inContainer);
		var thisControl = new itemControl(inFormKey+'_fld_'+inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id]=thisControl;
		//after render....
		if(ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey,item, inField, inContainer);
	  }
}

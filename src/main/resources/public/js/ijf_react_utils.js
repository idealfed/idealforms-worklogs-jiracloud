'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//manual imports
var MuiTextField = window['material-ui']["TextField"];
var MuiThemeProvider = window['material-ui']["MuiThemeProvider"];
var MuiButton = window['material-ui']["Button"];

var Icon = window['material-ui']['Icon'];
var IconButton = window['material-ui']['IconButton'];
var InputAdornment = window['material-ui']['InputAdornment'];

var Card = window['material-ui']['Card'];
var CardActions = window['material-ui']['CardActions'];
var CardContent = window['material-ui']['CardContent'];
var CardHeader = window['material-ui']['CardHeader'];

var Typography = window['material-ui']['Typography'];
var withStyles = window['material-ui']['withStyles'];
var withTheme = window['material-ui']['withTheme'];
var Menu = window['material-ui']['Menu'];
var MenuItem = window['material-ui']['MenuItem'];
var Drawer = window['material-ui']['Drawer'];
var Divider = window['material-ui']['Divider'];
var List = window['material-ui']['List'];
var ListItem = window['material-ui']['ListItem'];
var ListItemIcon = window['material-ui']['ListItemIcon'];
var ListItemText = window['material-ui']['ListItemText'];

var MuiSelect = window['material-ui']['Select'];
var MuiInputLabel = window['material-ui']['InputLabel'];
var MuiFormLabel = window['material-ui']['FormLabel'];
var MuiFormControl = window['material-ui']['FormControl'];
var MuiFormHelperText = window['material-ui']['FormHelperText'];
var MuiInput = window['material-ui']['Input'];

var MuiRadio = window['material-ui']['Radio'];
var MuiRadioGroup = window['material-ui']['RadioGroup'];
var MuiFormControlLabel = window['material-ui']['FormControlLabel'];

var MuiPaper = window['material-ui']['Paper'];
var MuiTable = window['material-ui']['Table'];
var MuiTableBody = window['material-ui']['TableBody'];
var MuiTableCell = window['material-ui']['TableCell'];
var MuiTableHead = window['material-ui']['TableHead'];
var MuiTableRow = window['material-ui']['TableRow'];

var MuiExpansionPanel = window['material-ui']['ExpansionPanel'];
var MuiExpansionPanelSummary = window['material-ui']['ExpansionPanelSummary'];
var MuiExpansionPanelDetails = window['material-ui']['ExpansionPanelDetails'];

var MuiAppBar = window['material-ui']['AppBar'];
var MuiToolBar = window['material-ui']['Toolbar'];

var MuiToolTip = window['material-ui']['Tooltip'];

var ijf = ijf || {};
ijf.reactUtils = {
	renderAppBar: function renderAppBar(inFormKey, item, inField, inContainer) {

		inContainer.title = inField.toolTip;

		var hideField = ijfUtils.renderIfShowField(null, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		if (inField.style.indexOf('hidden:true') > -1) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (inField.fieldStyle.indexOf('readonly:true') > -1) {
			rOnly = true;
		}

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions


		//section for dynamic control rendering using !{x,y,z}  where it's a key to a field
		var dynamicFields = [];
		var setDynamicControls = function setDynamicControls(inText) {
			var retText = inText;
			var pat = "\!\{.*?\}";
			var rgx = new RegExp(pat);
			var m = rgx.exec(retText);

			if (m == null) {
				return retText;
			} else {
				//you have a dynamic field....
				var keyVal = m[0].replace("!{", "");
				keyVal = keyVal.replace("}", "");
				var dFieldId = inFormKey + '_ctr_d_' + keyVal.replace(/,/g, "_");
				//var dFieldTblId = inFormKey+'_tbl_d_'+keyVal.replace(/,/g,"_");
				//var dFieldTbl = "<table  role='presentation' id='"+dFieldTblId+"' cellspacing=0 cellpadding=3><tr><td>";
				retText = retText.replace(m[0], "<div id='" + dFieldId + "'></div>");
				dynamicFields.push({ "containerId": dFieldId, "fieldId": keyVal });
				return setDynamicControls(retText);
			}
		};

		var outHtml = setDynamicControls(lCaption);

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = { "flexGrow": 1 };
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		var DynamicHtml = function (_React$Component) {
			_inherits(DynamicHtml, _React$Component);

			function DynamicHtml(props) {
				_classCallCheck(this, DynamicHtml);

				//need to do replaces here...
				var _this = _possibleConstructorReturn(this, (DynamicHtml.__proto__ || Object.getPrototypeOf(DynamicHtml)).call(this, props));

				var tempHtml = outHtml;
				_this.state = {
					template: { __html: tempHtml }
				};
				return _this;
			}

			_createClass(DynamicHtml, [{
				key: 'render',
				value: function render() {
					return React.createElement('div', { style: { "width": "100%" }, dangerouslySetInnerHTML: this.state.template });
				}
			}]);

			return DynamicHtml;
		}(React.Component);

		var LocalMuiAppBar = function (_React$Component2) {
			_inherits(LocalMuiAppBar, _React$Component2);

			function LocalMuiAppBar(props) {
				_classCallCheck(this, LocalMuiAppBar);

				return _possibleConstructorReturn(this, (LocalMuiAppBar.__proto__ || Object.getPrototypeOf(LocalMuiAppBar)).call(this, props));
			}

			_createClass(LocalMuiAppBar, [{
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ style: style },
						React.createElement(
							MuiAppBar,
							{ style: panelStyle, color: fieldStyle.color, position: fieldStyle.position },
							React.createElement(
								MuiToolBar,
								{ style: fieldStyle },
								React.createElement(DynamicHtml, null)
							)
						)
					);
				}
			}]);

			return LocalMuiAppBar;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiAppBar, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiAppBar, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);

		dynamicFields.forEach(function (f) {
			//find field by key....
			if (inField.form.fields.hasOwnProperty(f.fieldId)) var targetField = inField.form.fields[f.fieldId];else var targetField = inField.form.fields.reduce(function (inObj, ff) {
				if (ff.formCell == f.fieldId) inObj = ff;return inObj;
			}, null);
			var container = document.getElementById(f.containerId);
			if (!targetField || !container) {
				ijfUtils.footLog("Failed to render dynamic field " + f.fieldId);
				return;
			}
			try {
				targetField.form = inField.form;
				ijf.extUtils.renderField(inFormKey, item, targetField, container);
			} catch (e) {
				ijfUtils.footLog(targetField.formCell + " " + targetField.controlType + " failed to render: " + e.message);
			}
		});
	},
	renderDatebox: function renderDatebox(inFormKey, item, inField, inContainer) {

		//inContainer.title = inField.toolTip;
		var lAllowBlank = true;
		//adding concept of session vars.
		if (inField.dataSource == "session") {
			var data = ijf.session[inFormKey + '_fld_' + inField.formCell];
			if (!data) data = inField.dataReference2;
		} else {
			var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
			var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
			var jf = item.fields[jfFieldDef.id];

			if (inField.dataReference == "html") {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf, false, true);
			} else {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);
			}

			if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = jfFieldMeta.required ? false : true;
		}

		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		if (data) data = ijfUtils.ConvertShort2Db2Date(data);

		var lMaxsize = Number.MAX_VALUE;

		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		if (style.hidden) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (fieldStyle.readonly) rOnly = true;

		if (fieldStyle.enterOnce) if (!!data) rOnly = true;

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}

		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions

		//from meta data, set readonly if we don't have the ability...
		if (jfFieldMeta) if (!jfFieldMeta.operations && inField.dataSource != "session") rOnly = true;

		var ocf = ijfUtils.getEvent(inField);

		//if(hideField) style.visibility="hidden";
		if (hideField) style.display = "none";

		if (!lAllowBlank) fieldStyle.required = true;

		var lValidator = function lValidator(v) {
			if (fieldStyle.required && (v == null || v == "")) {
				inContainer.title = "This field is required";
				return false;
			}
			inContainer.removeAttribute("title");
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					inContainer.title = inField.regExMessage;
					return false;
				}
				if (fieldStyle.required && (v == null || v == "")) {
					inContainer.title = "This field is required";
					return false;
				}
				inContainer.removeAttribute("title");
				return true;
			};
		}

		var LocalMuiTextField = function (_React$Component3) {
			_inherits(LocalMuiTextField, _React$Component3);

			function LocalMuiTextField(props) {
				_classCallCheck(this, LocalMuiTextField);

				var _this3 = _possibleConstructorReturn(this, (LocalMuiTextField.__proto__ || Object.getPrototypeOf(LocalMuiTextField)).call(this, props));

				_this3.handleChange = function (event) {
					//add OCF call here..
					if (inField.dataSource == "session") {
						ijf.session[inFormKey + '_fld_' + inField.formCell] = event.target.value;
					} else {
						ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
					}
					if (lValidator(event.target.value)) {
						_this3.state.errored = false;
						ocf(event);
					} else _this3.state.errored = true;
					_this3.setState({
						value: event.target.value
					});
				};

				_this3.setValue = function (inValue) {
					_this3.setState({
						value: inValue
					});
				};

				_this3.getInputId = function () {
					return inFormKey + '_ctr_' + inField.formCell.replace(",", "_");
				};

				_this3.state = {
					value: data,
					errored: !lValidator(data)
				};
				return _this3;
			}

			_createClass(LocalMuiTextField, [{
				key: 'getTip',
				value: function getTip() {
					if (inField.toolTip) return React.createElement(
						MuiFormHelperText,
						null,
						inField.toolTip
					);
					return;
				}
			}, {
				key: 'getToolTip',
				value: function getToolTip(curContent, toolTip) {
					if (toolTip) return React.createElement(
						MuiToolTip,
						{ enterDelay: 150, title: toolTip },
						curContent
					);
					return curContent;
				}
			}, {
				key: 'getInputProps',
				value: function getInputProps() {
					var retProps = null;
					if (fieldStyle.inputProps) {
						if (fieldStyle.inputProps.startAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.startAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.startAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.startAdornment.icon.indexOf("fa-") > -1) {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.startAdornment.style, className: fieldStyle.inputProps.startAdornment.icon })
									), fieldStyle.inputProps.startAdornment)
								);
							} else {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.startAdornment.style },
											fieldStyle.inputProps.startAdornment.icon
										)
									), fieldStyle.inputProps.startAdornment)
								);
							}
						}
						if (fieldStyle.inputProps.endAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.endAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.endAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.endAdornment.icon.indexOf("fa-") > -1) {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.endAdornment.style, className: fieldStyle.inputProps.endAdornment.icon })
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							} else {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.endAdornment.style },
											fieldStyle.inputProps.endAdornment.icon
										)
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							}
						}
					}
					return retProps;
				}
			}, {
				key: 'getInputLabelProps',
				value: function getInputLabelProps() {
					var retProps = null;
					if (fieldStyle.inputLabelProps) {
						if (fieldStyle.inputLabelProps.shrink) {
							if (!retProps) retProps = {};
							retProps.shrink = fieldStyle.inputLabelProps.shrink;
						}

						if (fieldStyle.inputLabelProps.disableAnimation) {
							if (!retProps) retProps = {};
							retProps.disableAnimation = fieldStyle.inputLabelProps.disableAnimation;
						}
					}
					return retProps;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(
							MuiThemeProvider,
							{ style: panelStyle },
							React.createElement(MuiTextField, {
								error: this.state.errored,
								style: fieldStyle,
								InputProps: this.getInputProps(),
								InputLabelProps: this.getInputLabelProps(),
								fullWidth: true,
								label: lCaption,
								type: 'date',
								disabled: rOnly,
								required: fieldStyle.required,
								autoFocus: fieldStyle.autoFocus,
								multiline: false,
								id: inFormKey + '_ctr_' + inField.formCell.replace(",", "_"),
								value: this.state.value,
								onChange: this.handleChange
							})
						),
						this.getTip()
					);
				}
			}]);

			return LocalMuiTextField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTextField, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiTextField, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},
	renderTextbox: function renderTextbox(inFormKey, item, inField, inContainer) {

		//inContainer.title = inField.toolTip;
		var lAllowBlank = true;
		//adding concept of session vars.
		if (inField.dataSource == "session") {
			var data = ijf.session[inFormKey + '_fld_' + inField.formCell];
			if (!data) data = inField.dataReference2;
		} else {
			var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
			var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
			var jf = item.fields[jfFieldDef.id];

			if (inField.dataReference == "html") {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf, false, true);
			} else {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);
			}

			if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = jfFieldMeta.required ? false : true;
		}

		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		var lMaxsize = Number.MAX_VALUE;

		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		if (style.hidden) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (fieldStyle.readonly) rOnly = true;

		if (fieldStyle.enterOnce) if (!!data) rOnly = true;

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}

		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions

		//from meta data, set readonly if we don't have the ability...
		if (jfFieldMeta) if (!jfFieldMeta.operations && inField.dataSource != "session") rOnly = true;

		var ocf = ijfUtils.getEvent(inField);

		//if(hideField) style.visibility="hidden";
		if (hideField) style.display = "none";

		if (!lAllowBlank) fieldStyle.required = true;

		var lValidator = function lValidator(v) {
			if (fieldStyle.required && (v == null || v == "")) {
				inContainer.title = "This field is required";
				return false;
			}
			inContainer.removeAttribute("title");
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					inContainer.title = inField.regExMessage;
					return false;
				}
				if (fieldStyle.required && (v == null || v == "")) {
					inContainer.title = "This field is required";
					return false;
				}
				inContainer.removeAttribute("title");
				return true;
			};
		}

		var LocalMuiTextField = function (_React$Component4) {
			_inherits(LocalMuiTextField, _React$Component4);

			function LocalMuiTextField(props) {
				_classCallCheck(this, LocalMuiTextField);

				var _this4 = _possibleConstructorReturn(this, (LocalMuiTextField.__proto__ || Object.getPrototypeOf(LocalMuiTextField)).call(this, props));

				_this4.handleChange = function (event) {
					//add OCF call here..
					if (inField.dataSource == "session") {
						ijf.session[inFormKey + '_fld_' + inField.formCell] = event.target.value;
					} else {
						ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
					}
					if (lValidator(event.target.value)) {
						_this4.state.errored = false;
						ocf(event);
					} else _this4.state.errored = true;
					_this4.setState({
						value: event.target.value
					});
				};

				_this4.setValue = function (inValue) {
					_this4.setState({
						value: inValue
					});
				};

				_this4.getInputId = function () {
					return inFormKey + '_ctr_' + inField.formCell.replace(",", "_");
				};

				_this4.state = {
					value: data,
					errored: !lValidator(data)
				};
				return _this4;
			}

			_createClass(LocalMuiTextField, [{
				key: 'getTip',
				value: function getTip() {
					if (inField.toolTip) return React.createElement(
						MuiFormHelperText,
						null,
						inField.toolTip
					);
					return;
				}
			}, {
				key: 'getToolTip',
				value: function getToolTip(curContent, toolTip) {
					if (toolTip) return React.createElement(
						MuiToolTip,
						{ enterDelay: 150, title: toolTip },
						curContent
					);
					return curContent;
				}
			}, {
				key: 'getInputProps',
				value: function getInputProps() {
					var retProps = null;
					if (fieldStyle.inputProps) {
						if (fieldStyle.inputProps.startAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.startAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.startAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.startAdornment.icon.indexOf("fa-") > -1) {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.startAdornment.style, className: fieldStyle.inputProps.startAdornment.icon })
									), fieldStyle.inputProps.startAdornment)
								);
							} else {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.startAdornment.style },
											fieldStyle.inputProps.startAdornment.icon
										)
									), fieldStyle.inputProps.startAdornment)
								);
							}
						}
						if (fieldStyle.inputProps.endAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.endAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.endAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.endAdornment.icon.indexOf("fa-") > -1) {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.endAdornment.style, className: fieldStyle.inputProps.endAdornment.icon })
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							} else {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.endAdornment.style },
											fieldStyle.inputProps.endAdornment.icon
										)
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							}
						}
					}
					return retProps;
				}
			}, {
				key: 'getInputLabelProps',
				value: function getInputLabelProps() {
					var retProps = null;
					if (fieldStyle.inputLabelProps) {
						if (fieldStyle.inputLabelProps.shrink) {
							if (!retProps) retProps = {};
							retProps.shrink = fieldStyle.inputLabelProps.shrink;
						}

						if (fieldStyle.inputLabelProps.disableAnimation) {
							if (!retProps) retProps = {};
							retProps.disableAnimation = fieldStyle.inputLabelProps.disableAnimation;
						}
					}
					return retProps;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(
							MuiThemeProvider,
							{ style: panelStyle },
							React.createElement(MuiTextField, {
								error: this.state.errored,
								style: fieldStyle,
								onFocus: function onFocus(a) {
									//IE bug on the auto focus
									if (ijfUtils.detectIE()) {
										if (a.target.value.length > 0) a.currentTarget.setSelectionRange(a.target.value.length, a.target.value.length);
									}
								},
								InputProps: this.getInputProps(),
								InputLabelProps: this.getInputLabelProps(),
								fullWidth: true,
								label: lCaption,
								disabled: rOnly,
								required: fieldStyle.required,
								autoFocus: fieldStyle.autoFocus,
								multiline: false,
								id: inFormKey + '_ctr_' + inField.formCell.replace(",", "_"),
								value: this.state.value,
								onChange: this.handleChange
							})
						),
						this.getTip()
					);
				}
			}]);

			return LocalMuiTextField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTextField, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiTextField, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},
	renderTextarea: function renderTextarea(inFormKey, item, inField, inContainer) {

		//inContainer.title = inField.toolTip;
		var lAllowBlank = true;
		//adding concept of session vars.
		if (inField.dataSource == "session") {
			var data = ijf.session[inFormKey + '_fld_' + inField.formCell];
			if (!data && inField.style.indexOf('query:true') < 0) data = inField.dataReference2;
		} else {
			var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
			var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
			var jf = item.fields[jfFieldDef.id];

			if (inField.dataReference == "html") {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf, false, true);
			} else {
				var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);
			}

			if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = jfFieldMeta.required ? false : true;
		}

		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		var lMaxsize = Number.MAX_VALUE;

		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		if (style.hidden) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (fieldStyle.readonly) rOnly = true;

		if (fieldStyle.enterOnce) if (!!data) rOnly = true;

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}

		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions

		//from meta data, set readonly if we don't have the ability...
		if (jfFieldMeta) if (!jfFieldMeta.operations && inField.dataSource != "session") rOnly = true;

		var ocf = ijfUtils.getEvent(inField);

		//if(hideField) style.visibility="hidden";
		if (hideField) style.display = "none";

		if (!lAllowBlank) fieldStyle.required = true;

		var lValidator = function lValidator(v) {
			if (fieldStyle.required && (v == null || v == "")) {
				inContainer.title = "This field is required";
				return false;
			}
			inContainer.removeAttribute("title");
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					inContainer.title = inField.regExMessage;
					return false;
				}
				if (fieldStyle.required && (v == null || v == "")) {
					inContainer.title = "This field is required";
					return false;
				}
				inContainer.removeAttribute("title");
				return true;
			};
		}

		var LocalMuiTextField = function (_React$Component5) {
			_inherits(LocalMuiTextField, _React$Component5);

			function LocalMuiTextField(props) {
				_classCallCheck(this, LocalMuiTextField);

				var _this5 = _possibleConstructorReturn(this, (LocalMuiTextField.__proto__ || Object.getPrototypeOf(LocalMuiTextField)).call(this, props));

				_this5.handleChange = function (event) {
					//add OCF call here..
					if (inField.dataSource == "session") {
						ijf.session[inFormKey + '_fld_' + inField.formCell] = event.target.value;
					} else {
						ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
					}
					var ocf = ijfUtils.getEvent(inField);
					if (lValidator(event.target.value)) {
						_this5.state.errored = false;
						ocf(event);
					} else _this5.state.errored = true;
					_this5.setState({
						value: event.target.value
					});
				};

				_this5.state = {
					value: data,
					errored: !lValidator(data)
				};

				return _this5;
			}

			_createClass(LocalMuiTextField, [{
				key: 'getTip',
				value: function getTip() {
					if (inField.toolTip) return React.createElement(
						MuiFormHelperText,
						null,
						inField.toolTip
					);
					return;
				}
			}, {
				key: 'getInputProps',
				value: function getInputProps() {
					var retProps = null;
					if (fieldStyle.inputProps) {
						if (fieldStyle.inputProps.startAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.startAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.startAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.startAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.startAdornment.icon.indexOf("fa-") > -1) {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.startAdornment.style, className: fieldStyle.inputProps.startAdornment.icon })
									), fieldStyle.inputProps.startAdornment)
								);
							} else {
								retProps.startAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.startAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.startAdornment.style },
											fieldStyle.inputProps.startAdornment.icon
										)
									), fieldStyle.inputProps.startAdornment)
								);
							}
						}
						if (fieldStyle.inputProps.endAdornment) {
							if (!retProps) retProps = {};
							var tFunc = function tFunc() {};
							var tThis = this;
							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.snippet)) tFunc = function tFunc() {
								ijf.snippets[fieldStyle.inputProps.endAdornment.snippet](tThis);
							};

							if (ijf.snippets.hasOwnProperty(fieldStyle.inputProps.endAdornment.renderIf)) if (ijf.snippets[fieldStyle.inputProps.endAdornment.renderIf]() == false) return;

							if (fieldStyle.inputProps.endAdornment.icon.indexOf("fa-") > -1) {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(Icon, { style: fieldStyle.inputProps.endAdornment.style, className: fieldStyle.inputProps.endAdornment.icon })
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							} else {
								retProps.endAdornment = React.createElement(
									InputAdornment,
									{ position: fieldStyle.inputProps.endAdornment.position },
									this.getToolTip(React.createElement(
										IconButton,
										{ onClick: tFunc },
										React.createElement(
											Icon,
											{ style: fieldStyle.inputProps.endAdornment.style },
											fieldStyle.inputProps.endAdornment.icon
										)
									), fieldStyle.inputProps.endAdornment.toolTip)
								);
							}
						}
					}
					return retProps;
				}
			}, {
				key: 'getInputLabelProps',
				value: function getInputLabelProps() {
					var retProps = null;
					if (fieldStyle.inputLabelProps) {
						if (fieldStyle.inputLabelProps.shrink) {
							if (!retProps) retProps = {};
							retProps.shrink = fieldStyle.inputLabelProps.shrink;
						}

						if (fieldStyle.inputLabelProps.disableAnimation) {
							if (!retProps) retProps = {};
							retProps.disableAnimation = fieldStyle.inputLabelProps.disableAnimation;
						}
					}
					return retProps;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(MuiTextField, { style: fieldStyle,
							error: this.state.errored,
							fullWidth: true,
							label: lCaption,
							InputProps: this.getInputProps(),
							InputLabelProps: this.getInputLabelProps(),
							disabled: rOnly,
							required: fieldStyle.required,
							autoFocus: fieldStyle.autoFocus,
							multiline: true,
							id: inFormKey + '_ctr_' + inField.formCell.replace(",", "_"),
							value: this.state.value,
							onChange: this.handleChange
						}),
						this.getTip()
					);
				}
			}]);

			return LocalMuiTextField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTextField, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiTextField, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},


	renderButton: function renderButton(inFormKey, item, inField, inContainer) {
		inContainer.title = inField.toolTip;
		var hideField = ijfUtils.renderIfShowField(null, inField);
		var readOnly = false;
		var lCaption = inField.caption;

		var ocf = ijfUtils.getEvent(inField);

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		if (!hideField && !perms.canSee) hideField = true;

		//end permissions
		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldSettings = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldSettings = {};
		}
		try {
			var labelSettings = JSON.parse(inField.labelStyle);
		} catch (e) {
			var labelSettings = {};
		}

		//from meta data, set readonly if we don't have the ability...
		if (fieldSettings['hideIfReadOnly'] == true) {
			var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
			if (jfFieldMeta) if (!jfFieldMeta.operations) hideField = true;
		}

		var disabled = false;
		if (hideField) panelStyle.visibility = "hidden";
		if (fieldSettings.readonly) disabled = true;
		if (!fieldSettings.size) fieldSettings.size = "medium";

		var getIcon = function getIcon() {

			if (fieldSettings.icon) {
				var style = {};
				if (fieldSettings.icon.icon) {
					var icon = fieldSettings.icon.icon;
					style = fieldSettings.icon.style;
				} else {
					var icon = fieldSettings.icon;
				}

				if (icon.indexOf("fa-") > -1) return React.createElement(Icon, { className: icon, style: style });else return React.createElement(
					Icon,
					{ style: style },
					icon
				);
			} else return;
		};

		var LocalMuiButton = function (_React$Component6) {
			_inherits(LocalMuiButton, _React$Component6);

			function LocalMuiButton() {
				var _ref;

				var _temp, _this6, _ret;

				_classCallCheck(this, LocalMuiButton);

				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return _ret = (_temp = (_this6 = _possibleConstructorReturn(this, (_ref = LocalMuiButton.__proto__ || Object.getPrototypeOf(LocalMuiButton)).call.apply(_ref, [this].concat(args))), _this6), _this6.state = {
					anchorEl: null,
					disabled: disabled
				}, _this6.handleClick = function (event) {
					_this6.setState({ anchorEl: event.currentTarget });
					ocf(event.currentTarget);
				}, _this6.handleClose = function () {
					_this6.setState({ anchorEl: null });
				}, _this6.getCaption = function () {

					if (labelSettings.snippet) {
						try {
							return ijf.snippets[labelSettings.snippet](lCaption);
						} catch (e) {
							return lCaption;
						}
					} else {
						return lCaption;
					}
				}, _temp), _possibleConstructorReturn(_this6, _ret);
			}

			_createClass(LocalMuiButton, [{
				key: 'getMenuRow',
				value: function getMenuRow(r, owningClass) {
					var handler = function handler() {
						owningClass.handleClose();ijf.snippets[r.snippet](r);
					};
					return React.createElement(
						MenuItem,
						{ onClick: handler },
						r.label
					);
				}
			}, {
				key: 'getMenu',
				value: function getMenu(fieldSettings, owningClass) {
					if (!fieldSettings || !fieldSettings.menu) return;
					return React.createElement(
						Menu,
						{
							anchorEl: owningClass.state.anchorEl,
							open: Boolean(owningClass.state.anchorEl),
							onClose: owningClass.handleClose
						},
						fieldSettings.menu.reduce(function (inA, r) {
							if (r.renderIf) {
								try {
									if (ijf.snippets[r.renderIf]()) inA.push(owningClass.getMenuRow(r, owningClass));
								} catch (e) {}
							} else {
								inA.push(owningClass.getMenuRow(r, owningClass));
							}
							return inA;
						}, [])
					);
				}
			}, {
				key: 'setDisabled',
				value: function setDisabled(inDisabled) {
					this.setState({ "disabled": inDisabled });
				}
			}, {
				key: 'render',
				value: function render() {
					var anchorEl = this.state.anchorEl;


					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(
							MuiButton,
							{ onClick: this.handleClick, disabled: this.state.disabled, size: fieldSettings.size,
								color: fieldSettings.color, variant: fieldSettings.variant, style: panelStyle,
								id: inFormKey + '_fldCtlId_' + inField.formCell },
							getIcon(),
							this.getCaption()
						),
						this.getMenu(fieldSettings, this)
					);
				}
			}]);

			return LocalMuiButton;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiButton, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiButton, null), inContainer);
		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},

	renderHtml: function renderHtml(inFormKey, item, inField, inContainer) {

		var hideField = ijfUtils.renderIfShowField(null, inField);
		var readOnly = false;
		var lCaption = inField.caption;

		var ocf = ijfUtils.getEvent(inField);

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions
		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldSettings = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldSettings = {};
		}

		var disabled = false;
		if (hideField) style.visibility = "hidden";
		if (fieldSettings.readonly) disabled = true;
		if (!fieldSettings.size) fieldSettings.size = "medium";

		if (inField.dataReference == "html") {
			var outHtml = ijfUtils.replaceKeyValues(inField.dataSource, item, true);
		} else {
			var outHtml = ijfUtils.replaceKeyValues(inField.dataSource, item);
		}

		var DynamicHtml = function (_React$Component7) {
			_inherits(DynamicHtml, _React$Component7);

			function DynamicHtml(props) {
				_classCallCheck(this, DynamicHtml);

				//need to do replaces here...
				var _this7 = _possibleConstructorReturn(this, (DynamicHtml.__proto__ || Object.getPrototypeOf(DynamicHtml)).call(this, props));

				_this7.state = {
					template: { __html: outHtml }
				};
				return _this7;
			}

			_createClass(DynamicHtml, [{
				key: 'render',
				value: function render() {
					return React.createElement('div', { style: panelStyle, dangerouslySetInnerHTML: this.state.template });
				}
			}]);

			return DynamicHtml;
		}(React.Component);

		var LocalMuiButton = function LocalMuiButton() {
			return React.createElement(
				'div',
				{ style: style },
				React.createElement(DynamicHtml, { html: inField.dataSource })
			);
		};

		//before render....
		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiButton, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiButton, null), inContainer);
		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},
	renderIcon: function renderIcon(inFormKey, item, inField, inContainer) {

		//rendeIf logic
		var hideField = ijfUtils.renderIfShowField("", inField);

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}
		var getToolTip = function getToolTip(curContent) {
			if (inField.toolTip) {
				var ttip = ijfUtils.replaceKeyValues(inField.toolTip, item);
				return React.createElement(
					MuiToolTip,
					{ enterDelay: 150, title: ttip },
					curContent
				);
			}
			return curContent;
		};
		var getIcon = function getIcon() {
			if (hideField) return;
			if (inField.dataSource) {
				var muiRet = null;
				if (inField.event) {
					if (inField.dataSource.indexOf("fa-") > -1) muiRet = React.createElement(
						IconButton,
						{ style: fieldStyle, onClick: ijf.snippets[inField.event] },
						React.createElement(Icon, { style: panelStyle, className: inField.dataSource })
					);else muiRet = React.createElement(
						IconButton,
						{ style: fieldStyle, onClick: ijf.snippets[inField.event] },
						React.createElement(
							Icon,
							{ style: panelStyle },
							inField.dataSource
						)
					);
				} else {
					if (inField.dataSource.indexOf("fa-") > -1) muiRet = React.createElement(Icon, { style: panelStyle, className: inField.dataSource });else muiRet = React.createElement(
						Icon,
						{ style: panelStyle },
						inField.dataSource
					);
				}

				muiRet = getToolTip(muiRet);
				return muiRet;
			} else return;
		};
		var LocalMuiIcon = function LocalMuiIcon() {
			return React.createElement(
				'div',
				{ style: style },
				getIcon()
			);
		};

		//before render....
		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiIcon, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiIcon, null), inContainer);
		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},
	renderHistoryList: function renderHistoryList(inFormKey, item, inField, inContainer) {
		inField.dataReference = "author,change,date,time";
		if (!item.changelog) {
			var tItem = ijfUtils.jiraApiSync("GET", "/rest/api/2/issue/" + item.key + "?expand=changelog", null);
			item.changelog = tItem.changelog;
		}
		var sortedLogs = [];
		if (item.changelog.histories) {
			//sort desc
			sortedLogs = item.changelog.histories.sort(function (a, b) {
				a = new Date(a.created);
				b = new Date(b.created);
				return a > b ? -1 : a < b ? 1 : 0;
			});

			sortedLogs = sortedLogs.map(function (a) {

				var chng = a.items.reduce(function (oStr, i) {
					oStr += "<b>Field:</b> " + i.field;
					oStr += "<br>&nbsp;&nbsp;&nbsp;<b>From Value:</b> " + i.fromString;
					oStr += "<br>&nbsp;&nbsp;&nbsp;<b>To Value:</b> " + i.toString;
					oStr += "<br><br>";
					return oStr;
				}, "");

				a.change = chng.replace(/\n/g, "<br>");
				a.author = a.author.displayName;
				a.date = moment(a.created).format('ll');
				a.time = moment(a.created).format('LT');

				return a;
			});
		}
		this.renderCardList(inFormKey, item, inField, inContainer, sortedLogs, false);
	},
	renderCommentList: function renderCommentList(inFormKey, item, inField, inContainer) {
		inField.dataReference = "author,body,date,time";
		var sortedLogs = [];
		if (item.fields.comment.comments) {
			//sort desc
			var sortedLogs = item.fields.comment.comments.sort(function (a, b) {
				a = new Date(a.created);
				b = new Date(b.created);
				return a > b ? -1 : a < b ? 1 : 0;
			});

			sortedLogs = sortedLogs.map(function (a) {
				a.body = a.body.replace(/\n/g, "<br>");
				if (a.author) a.author = a.author.displayName;
				if (a.updateAuthor) a.author = a.updateAuthor.displayName;
				a.date = moment(a.created).format('ll');
				a.time = moment(a.created).format('LT');
				return a;
			});
		}
		this.renderCardList(inFormKey, item, inField, inContainer, sortedLogs, false);
	},
	renderSuperCommentList: function renderSuperCommentList(inFormKey, item, inField, inContainer) {
		inField.dataReference = "author,body,date,time";

		//IF I have a parent, construct the parent Item...
		var workingIssue = ijf.currentItem;
		if (workingIssue.fields.parent) {
			workingIssue = ijfUtils.getJiraIssueSync(workingIssue.fields.parent.key);
		}
		var keyList = [];
		keyList.push(workingIssue.key);
		if (workingIssue.fields.subtasks) {
			workingIssue.fields.subtasks.forEach(function (t) {
				keyList.push(t.key);
			});
		}

		var jql = "key in (" + keyList.join(",") + ")";
		var flds = "comment";
		var contextField = null;
		if (inField.referenceFilter) {
			contextField = inField.referenceFilter;
			flds += "," + contextField;
		}
		var suffix = "";
		if (flds) suffix = "&fields=" + flds + "&maxResults=999";
		var aUrl = '/rest/api/2/search?jql=' + jql + suffix;
		var sortedLogs = [];
		var allLogs = [];
		var rawList = ijfUtils.jiraApiSync('GET', aUrl, null);
		if (rawList.issues) {
			rawList.issues.forEach(function (i) {
				if (i.fields.comment.comments) {
					i.fields.comment.comments.forEach(function (l) {
						if (contextField) l.contextField = i.fields[contextField];
						allLogs.push(l);
					});
				}
			});
		}
		//sort desc
		var sortedLogs = allLogs.sort(function (a, b) {
			a = new Date(a.created);
			b = new Date(b.created);
			return a > b ? -1 : a < b ? 1 : 0;
		});

		sortedLogs = sortedLogs.map(function (a) {
			a.body = a.body.replace(/\n/g, "<br>");
			if (a.author) a.author = a.author.displayName;
			if (a.updateAuthor) a.author = a.updateAuthor.displayName;
			if (a.contextField) {
				if (a.contextField.name) a.author = a.contextField.name + " - " + a.author;else a.author = a.contextField + " - " + a.author;
			}
			a.date = moment(a.created).format('ll');
			a.time = moment(a.created).format('LT');
			return a;
		});

		this.renderCardList(inFormKey, item, inField, inContainer, sortedLogs, false);
	},
	renderCardList: function renderCardList(inFormKey, item, inField, inContainer, inData, withExpander) {
		inContainer.title = inField.toolTip;

		var hideField = ijfUtils.renderIfShowField(null, inField);
		var readOnly = false;
		var lCaption = inField.caption;

		var ocf = ijfUtils.getEvent(inField);

		var translateFields = ijfUtils.translateJiraFieldsToIds(inField.dataReference);

		var lds = inField.dataSource;

		var tSearch = "jql=" + lds + "&fields=" + translateFields;
		tSearch = ijfUtils.replaceKeyValues(tSearch, item);
		var aUrl = '/rest/api/2/search?' + tSearch;

		if (inData) {
			var dataItems = inData;
		} else {
			if (inField.form.formProxy == "true") {
				aUrl = aUrl.replace(/ /g, "%20");
				var rawList = ijfUtils.getProxyApiCallSync(aUrl, inField.form.formSet.id);
			} else {
				var rawList = ijfUtils.jiraApiSync('GET', aUrl, null);
			}
			var dataItems = rawList.issues.map(function (i) {
				var retObj = {};
				translateFields.split(",").forEach(function (f) {
					var thisField = f.trim();
					var dVal = "";
					var jField = ijfUtils.getJiraFieldById(thisField);
					if (i.fields.hasOwnProperty(jField.id)) {
						dVal = ijfUtils.handleJiraFieldType(jField, i.fields[jField.id], true);
					}
					if (!dVal) dVal = "";
					if (jField.name) retObj[jField.name] = dVal;else retObj[thisField] = dVal;
				});
				//retObj.iid=i.id;
				retObj.iid = i.key;
				retObj.key = i.key;
				return retObj;
			});
		}

		//transform data....
		if (inField.referenceFilter) {
			//filter the items...
			if (ijf.snippets.hasOwnProperty(inField.referenceFilter)) dataItems = ijf.snippets[inField.referenceFilter](dataItems);
		}

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions
		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		//filter section...you have data, and style...bind visibility to style for filter
		//syntax for filter:  cardFilter_[formcell]
		//   [array of:
		//       {name:value}
		if (ijf.session["cardFilter_" + inField.formCell]) {
			dataItems.forEach(function (r) {
				r.visibility = "hidden";

				//this is a boolean OR
				ijf.session["cardFilter_" + inField.formCell].forEach(function (f) {
					if (f.value == r[f.name]) r.visibility = "visible";
				});
				//if filters enabled
			});
			dataItems = dataItems.reduce(function (inA, r) {
				if (r.visibility == "visible") inA.push(r);return inA;
			}, []);
		} else {
			dataItems.forEach(function (r) {
				r.visibility = "visible";
			});
		}

		//filter section...you have data, and style...bind visibility to style for filter
		//syntax for filter:  cardFilter_[formcell]
		//   [array of:
		//       {name:value}
		if (ijf.session["cardFilterAnd_" + inField.formCell]) {
			dataItems.forEach(function (r) {
				r.visibility = "hidden";

				//this is a boolean AND
				var showIt = true;
				ijf.session["cardFilterAnd_" + inField.formCell].forEach(function (f) {
					if (f.value != r[f.name]) showIt = false;
				});
				if (showIt) r.visibility = "visible";
			});
			dataItems = dataItems.reduce(function (inA, r) {
				if (r.visibility == "visible") inA.push(r);return inA;
			}, []);
		}

		//card search section...
		//syntax for filter:  cardSearch_[formcell]
		//   simple string....
		if (ijf.session["cardSearch_" + inField.formCell]) {
			var searchStr = ijf.session["cardSearch_" + inField.formCell].toLowerCase();
			searchStr = searchStr.trim();
			var searchKeys = searchStr.split(" ");
			var keyCount = searchKeys.length;
			dataItems.forEach(function (r) {
				r.visibility = "hidden";
				var runningCount = 0;
				var keyCheck = {};
				searchKeys.forEach(function (sk) {
					if (!sk || sk == "") return;
					Object.keys(r).forEach(function (k) {
						try {
							if (keyCheck.hasOwnProperty(sk)) return;
							if (r[k].toLowerCase().indexOf(sk) > -1) {
								keyCheck[sk] = "found";
								runningCount++;
							}
						} catch (e) {
							var testE = e;
						}
					});
				});
				if (runningCount == keyCount) r.visibility = "visible";
				//if filters enabled
			});
			dataItems = dataItems.reduce(function (inA, r) {
				if (r.visibility == "visible") inA.push(r);return inA;
			}, []);
		} else {
			dataItems.forEach(function (r) {
				r.visibility = "visible";
			});
		}

		//sort section...if a sort param is here, sort the data on it
		//syntax for filter:  cardSort_[formcell]
		//       array of fields to sort by or object  with "field" and "direction"
		if (ijf.session["cardSort_" + inField.formCell]) {
			var sorts = ijf.session["cardSort_" + inField.formCell];
			if (sorts.length > 1) {
				dataItems = dataItems.sort(function (a, b) {
					var tb = b;

					var b = sorts.reduce(function (inV, s) {
						inV += a[s];return inV;
					}, "");
					var a = sorts.reduce(function (inV, s) {
						inV += tb[s];return inV;
					}, "");

					if (a) a = a.toLowerCase();else a = "";
					if (b) b = b.toLowerCase();else b = "";
					return a > b ? -1 : a < b ? 1 : 0;
				});
			} else {
				//the below does one after the other
				ijf.session["cardSort_" + inField.formCell].forEach(function (s) {
					var sDir = "asc";
					var sField = s;
					var sType = "string";
					if (s.direction) sDir = s.direction;
					if (s.field) sField = s.field;
					if (s.type) sType = s.type;
					if (dataItems.length < 1) return;
					if (!dataItems[0].hasOwnProperty(sField)) return;
					dataItems = dataItems.sort(function (a, b) {
						//if(a.indexOf("displayName")>-1) a=JSON.parse(a).displayName;
						//if(b.indexOf("displayName")>-1) b=JSON.parse(b).displayName;

						if (sDir == "asc") {
							var tb = b;
							var b = a[sField];
							var a = tb[sField];
						} else {
							var a = a[sField];
							var b = b[sField];
						}
						if (a) a = a.toLowerCase();else a = "";
						if (b) b = b.toLowerCase();else b = "";

						if (sType == "date") {
							a = new Date(a);
							b = new Date(b);
						}

						return a > b ? -1 : a < b ? 1 : 0;
					});
				});
			}
		}

		var disabled = false;
		if (hideField) fieldStyle.visibility = "hidden";

		var dataStart = 0;
		var resultRows = 100000;
		if (withExpander) {
			var dataStart = 0;
			var resultRows = 3;
		}
		var raised = false;
		if (panelStyle.raised) raised = true;

		//REACT section

		var DynamicMenuRow = function (_React$Component8) {
			_inherits(DynamicMenuRow, _React$Component8);

			function DynamicMenuRow(props) {
				_classCallCheck(this, DynamicMenuRow);

				var _this8 = _possibleConstructorReturn(this, (DynamicMenuRow.__proto__ || Object.getPrototypeOf(DynamicMenuRow)).call(this, props));

				_this8.state = {
					menuRow: props.menuRow,
					owningClass: props.owningClass
				};
				return _this8;
			}

			_createClass(DynamicMenuRow, [{
				key: 'handleClick',
				value: function handleClick(inOwner) {
					this.state.owningClass.handleClose();
					ijf.snippets[this.state.menuRow.snippet](inOwner);
				}
			}, {
				key: 'render',
				value: function render() {
					var _this9 = this;

					return React.createElement(
						MenuItem,
						{ onClick: function onClick() {
								return _this9.handleClick(_this9.state.owningClass);
							} },
						this.state.menuRow.label
					);
				}
			}]);

			return DynamicMenuRow;
		}(React.Component);

		var DynamicHtml = function (_React$Component9) {
			_inherits(DynamicHtml, _React$Component9);

			function DynamicHtml(props) {
				_classCallCheck(this, DynamicHtml);

				//need to do replaces here...

				var _this10 = _possibleConstructorReturn(this, (DynamicHtml.__proto__ || Object.getPrototypeOf(DynamicHtml)).call(this, props));

				var tempHtml = ijfUtils.switchAttsGeneric(props.htmlContent, props.dataRow);
				_this10.state = {
					template: { __html: tempHtml },
					dataRow: props.dataRow
				};
				return _this10;
			}

			_createClass(DynamicHtml, [{
				key: 'render',
				value: function render() {
					return React.createElement('div', { dangerouslySetInnerHTML: this.state.template });
				}
			}]);

			return DynamicHtml;
		}(React.Component);

		var MuiCard = function (_React$Component10) {
			_inherits(MuiCard, _React$Component10);

			function MuiCard(props) {
				_classCallCheck(this, MuiCard);

				var _this11 = _possibleConstructorReturn(this, (MuiCard.__proto__ || Object.getPrototypeOf(MuiCard)).call(this, props));

				_this11.handleClick = function (event) {
					_this11.setState({ anchorEl: event.currentTarget });
				};

				_this11.handleClose = function () {
					_this11.setState({ anchorEl: null });
				};

				_this11.handleDblClick = function (event) {
					//console.log(event.type);
					ocf(event, _this11);
				};

				_this11.state = {
					row: props.dataRow,
					owningClass: props.owningClass,
					title: props.title,
					subHeader: props.subHeader,
					contentOut: props.contentOut,
					cardMenu: props.cardMenu,
					actionMenu: props.actionMenu,
					anchorEl: null
				};
				return _this11;
			}

			_createClass(MuiCard, [{
				key: 'getMenuRow',
				value: function getMenuRow(r, owningClass) {
					return React.createElement(DynamicMenuRow, { menuRow: r, owningClass: owningClass });
				}
			}, {
				key: 'getMenu',
				value: function getMenu(menuRows, owningClass) {
					if (!menuRows) return;
					return React.createElement(
						Menu,
						{
							id: "card_menu_id_" + owningClass.state.row.key,
							anchorEl: owningClass.state.anchorEl,
							open: Boolean(owningClass.state.anchorEl),
							onClose: owningClass.handleClose
						},
						menuRows.map(function (r) {
							return owningClass.getMenuRow(r, owningClass);
						})
					);
				}
			}, {
				key: 'getIcon',
				value: function getIcon(r) {
					if (!r.icon) return;
					if (r.icon.indexOf("fa-") > -1) return React.createElement(Icon, { className: r.icon });else return React.createElement(
						Icon,
						null,
						r.icon
					);
				}
			}, {
				key: 'getCardActions',
				value: function getCardActions() {
					if (this.state.actionMenu) {
						var lThis = this;
						return React.createElement(
							CardActions,
							{ disableActionSpacing: true },
							this.state.actionMenu.map(function (r) {
								if (!r.style) r.style = {};
								if (!r.style.size) r.style.size = "medium";
								return React.createElement(
									MuiButton,
									{ onClick: function onClick() {
											return ijf.snippets[r.snippet](lThis);
										}, color: r.color, variant: r.variant, disabled: r.disabled, size: r.size, style: r.style },
									lThis.getIcon(r),
									r.label
								);
							}),
							'  '
						);
					}
					return;
				}
			}, {
				key: 'setStyleFilter',
				value: function setStyleFilter() {
					panelStyle.visibility = this.state.row.visibility;
					return panelStyle;
				}
			}, {
				key: 'getAvatarStyleSnippet',
				value: function getAvatarStyleSnippet(inContextData, inSnippet) {
					if (ijf.snippets.hasOwnProperty(inSnippet)) {
						return ijf.snippets[inSnippet](inContextData);
					}
					return null;
				}
			}, {
				key: 'getAvatar',
				value: function getAvatar(inDataRow) {
					if (fieldStyle.avatar) {
						if (fieldStyle.avatar.icon.indexOf("fa-") > -1) {
							if (fieldStyle.avatar.styleSnippet) return React.createElement(Icon, { className: fieldStyle.avatar.icon, style: this.getAvatarStyleSnippet(inDataRow, fieldStyle.avatar.styleSnippet) });else return React.createElement(Icon, { className: fieldStyle.avatar.icon, style: fieldStyle.avatar.style });
						} else if (fieldStyle.avatar.styleSnippet) return React.createElement(
							Icon,
							{ style: this.getAvatarStyleSnippet(inDataRow, fieldStyle.avatar.styleSnippet) },
							fieldStyle.avatar.icon
						);else return React.createElement(
							Icon,
							{ style: fieldStyle.avatar.style },
							fieldStyle.avatar.icon
						);
					} else return;
				}
			}, {
				key: 'getActionIconType',
				value: function getActionIconType() {
					if (fieldStyle.actionIcon) {
						if (fieldStyle.actionIcon.icon.indexOf("fa-") > -1) return React.createElement(Icon, { className: fieldStyle.actionIcon.icon, style: fieldStyle.actionIcon.style });else return React.createElement(
							Icon,
							{ style: fieldStyle.actionIcon.style },
							fieldStyle.actionIcon.icon
						);
					} else return;
				}
			}, {
				key: 'getActionIcon',
				value: function getActionIcon() {
					if (fieldStyle.actionIcon) return React.createElement(
						IconButton,
						{ onClick: this.handleClick,
							'aria-owns': this.state.anchorEl ? 'simple-menu' : null,
							'aria-haspopup': 'true' },
						this.getActionIconType()
					);else return;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ style: style },
						React.createElement(
							Card,
							{ style: this.setStyleFilter(), raised: raised, onClick: this.handleDblClick },
							React.createElement(CardHeader, { style: fieldStyle.headStyle,
								avatar: this.getAvatar(this.state.row),
								action: this.getActionIcon(),
								title: React.createElement(DynamicHtml, { htmlContent: this.state.title, dataRow: this.state.row }),
								subheader: React.createElement(DynamicHtml, { htmlContent: this.state.subHeader, dataRow: this.state.row })
							}),
							React.createElement(
								CardContent,
								{ style: fieldStyle.contentStyle },
								React.createElement(
									Typography,
									{ component: 'p' },
									React.createElement(DynamicHtml, { htmlContent: this.state.contentOut, dataRow: this.state.row })
								)
							),
							this.getCardActions()
						),
						this.getMenu(this.state.cardMenu, this)
					);
				}
			}]);

			return MuiCard;
		}(React.Component);

		var CardList = function (_React$Component11) {
			_inherits(CardList, _React$Component11);

			function CardList(props) {
				_classCallCheck(this, CardList);

				var _this12 = _possibleConstructorReturn(this, (CardList.__proto__ || Object.getPrototypeOf(CardList)).call(this, props));

				_this12.state = {
					value: dataItems
				};
				return _this12;
			}

			_createClass(CardList, [{
				key: 'getState',
				value: function getState() {
					return this.state;
				}
			}, {
				key: 'getValue',
				value: function getValue() {
					return this.state.value;
				}
			}, {
				key: 'getCard',
				value: function getCard(row, owningClass) {
					//must transform content using field Style
					//row has the fields...must translate content into values using replaceKeyValues
					var title = fieldStyle.title;
					var subHeader = fieldStyle.subHeader;
					var contentOut = fieldStyle.content;
					var cardMenu = fieldStyle.menu;
					var actionMenu = fieldStyle.actionMenu;
					var lRow = row;

					return React.createElement(
						'div',
						null,
						React.createElement(MuiCard, { dataRow: row,
							owningClass: owningClass,
							title: title,
							subHeader: subHeader,
							contentOut: contentOut,
							cardMenu: cardMenu,
							actionMenu: actionMenu })
					);
				}
			}, {
				key: 'getCards',
				value: function getCards(inData, owningClass, inStartAt, inReturnVals) {
					var returnVals = 100000;
					if (inReturnVals) returnVals = inReturnVals;
					var startAt = 0;
					if (inStartAt) startAt = inStartAt;
					var ctr = 0;
					var retArr = [];
					inData.forEach(function (r) {
						ctr++;
						if (ctr > returnVals) return;
						if (ctr < startAt) return;
						retArr.push(owningClass.getCard(r, owningClass));
					});
					return retArr;
				}
			}, {
				key: 'getExpansionCards',
				value: function getExpansionCards(inData, owningClass) {
					if (!withExpander) return;
					return React.createElement(
						MuiExpansionPanel,
						null,
						React.createElement(
							MuiExpansionPanelSummary,
							{ expandIcon: React.createElement(
									Icon,
									null,
									'expand_more'
								) },
							'Expand for more'
						),
						React.createElement(
							MuiExpansionPanelDetails,
							null,
							owningClass.getCards(owningClass.state.value, owningClass, 3, 100000)
						)
					);
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ style: style },
						this.getCards(this.state.value, this, dataStart, resultRows),
						this.getExpansionCards(this.state.value, this)
					);
				}
			}]);

			return CardList;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](CardList, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(CardList, null), inContainer);
		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},

	renderDrawer: function renderDrawer(inFormKey, item, inField, inContainer) {
		inContainer.title = inField.toolTip;

		var hideField = ijfUtils.renderIfShowField(null, inField);
		var readOnly = false;
		var lCaption = inField.caption;

		var ocf = ijfUtils.getEvent(inField);

		var sessionDrawerOpen = false;
		if (ijf.session.hasOwnProperty("drawerState_" + inField.formCell)) {
			sessionDrawerOpen = ijf.session["drawerState_" + inField.formCell];
		};

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions
		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldSettings = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldSettings = {};
		}
		try {
			var buttonStyle = JSON.parse(inField.labelStyle);
		} catch (e) {
			var buttonStyle = {};
		}
		if (hideField) buttonStyle.visibility = "hidden";

		var variant = "persistent";
		if (fieldSettings.variant) variant = fieldSettings.variant;

		if (!panelStyle.width) panelStyle.width = "20px";
		var originalWidth = inContainer.style.width;
		//if open then set the correct width....
		if (sessionDrawerOpen) inContainer.style.width = panelStyle.width;
		if (variant == "permanent") inContainer.style.width = panelStyle.width;

		var MuiDrawer = function (_React$Component12) {
			_inherits(MuiDrawer, _React$Component12);

			function MuiDrawer() {
				var _ref2;

				var _temp2, _this13, _ret2;

				_classCallCheck(this, MuiDrawer);

				for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
					args[_key2] = arguments[_key2];
				}

				return _ret2 = (_temp2 = (_this13 = _possibleConstructorReturn(this, (_ref2 = MuiDrawer.__proto__ || Object.getPrototypeOf(MuiDrawer)).call.apply(_ref2, [this].concat(args))), _this13), _this13.state = {
					open: sessionDrawerOpen,
					top: false,
					left: false,
					bottom: false,
					right: false
				}, _this13.toggleDrawer = function (side, open) {
					return function () {

						ijf.session["drawerState_" + inField.formCell] = open;
						if (!open && variant == "persistent") {
							inContainer.style.width = originalWidth;
						}

						_this13.setState(_defineProperty({}, side, open));
						_this13.setState({
							"open": open
						});

						ocf(open);
					};
				}, _this13.openFromChevron = function (side, open) {
					return function () {

						ijf.session["drawerState_" + inField.formCell] = open;
						//if this is persistent, alter underlying div width to width of this animal...
						if (variant == "persistent") {
							inContainer.style.width = panelStyle.width;
						}
						_this13.setState(_defineProperty({}, side, open));
						_this13.setState({
							"open": open
						});
						ocf(open);
					};
				}, _temp2), _possibleConstructorReturn(_this13, _ret2);
			}

			_createClass(MuiDrawer, [{
				key: 'getMenuIcon',
				value: function getMenuIcon(m) {
					if (!m.icon) return;
					var iconStyle = { "width": "30px" };
					if (m.iconStyle) iconStyle = m.iconStyle;
					if (m.icon.indexOf("fa-") > -1) return React.createElement(Icon, { className: m.icon, style: iconStyle });else return React.createElement(
						Icon,
						{ style: iconStyle },
						m.icon
					);
				}
			}, {
				key: 'getToolTip',
				value: function getToolTip(curContent, m) {
					if (m.toolTip) return React.createElement(
						MuiToolTip,
						{ enterDelay: 150, title: m.toolTip },
						curContent
					);
					return curContent;
				}
			}, {
				key: 'getMenu',
				value: function getMenu(menuRows, owningClass) {
					if (!menuRows) return;

					return menuRows.map(function (m) {
						if (m.type == "button") {
							var snip = function snip() {};
							if (ijf.snippets.hasOwnProperty(m.snippet)) snip = function snip() {
								//if variant = temporary...close the drawer first...
								if (variant == "temporary") {
									//sets drawer to close
									ijf.session["drawerState_" + inField.formCell] = false;
									owningClass.toggleDrawer(fieldSettings.direction, false);
								}

								ijf.snippets[m.snippet](m);
							};

							var bStyle = {};
							if (m.style) bStyle = m.style;
							if (ijf.session.hasOwnProperty(m.family)) {
								if (ijf.session[m.family].hasOwnProperty(m.text)) {
									bStyle = ijf.session[m.family][m.text].style;
								} else {
									bStyle = {};
								}
							}

							var myRet = React.createElement(
								List,
								{ component: 'nav' },
								React.createElement(
									ListItem,
									{ button: true, onClick: snip, style: bStyle },
									owningClass.getMenuIcon(m),
									React.createElement(ListItemText, { id: m.id, primary: m.text })
								)
							);

							myRet = owningClass.getToolTip(myRet, m);
							return myRet;
						} else {
							//assume divider
							return React.createElement(Divider, null);
						}
					});
				}
			}, {
				key: 'getIcon',
				value: function getIcon() {
					if (variant == "permanent") return;else return React.createElement(
						IconButton,
						{ onClick: this.toggleDrawer(fieldSettings.direction, false) },
						React.createElement(
							Icon,
							null,
							'chevron_left'
						)
					);
				}
			}, {
				key: 'getHeaderIcon',
				value: function getHeaderIcon() {
					if (!style.headerIcon) return;else {
						var iconStyle = { "width": "40px" };
						if (style.headerIconStyle) iconStyle = style.headerIconStyle;
						if (style.headerIcon.indexOf("fa-") > -1) return React.createElement(Icon, { className: style.headerIcon, style: iconStyle });else return React.createElement(
							Icon,
							{ style: iconStyle },
							style.headerIcon
						);
					}
				}
			}, {
				key: 'getDrawerTitle',
				value: function getDrawerTitle() {
					if (!style.headerCaption) return;else {
						//look for icon...
						return React.createElement(
							'span',
							null,
							'\xA0',
							style.headerCaption
						);
					}
				}
			}, {
				key: 'getDrawerTitleHtml',
				value: function getDrawerTitleHtml() {
					if (!style.headerHtml) return;else {
						return React.createElement('div', { dangerouslySetInnerHTML: { __html: style.headerHtml } });
					}
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						null,
						React.createElement(
							Icon,
							{ style: buttonStyle, onClick: this.openFromChevron(fieldSettings.direction, true) },
							fieldSettings.icon
						),
						React.createElement(
							Drawer,
							{
								variant: variant, anchor: fieldSettings.direction, open: this.state.open, onClose: this.toggleDrawer(fieldSettings.direction, false) },
							React.createElement(
								'div',
								{ style: style },
								this.getHeaderIcon(),
								this.getDrawerTitleHtml(),
								this.getDrawerTitle(),
								this.getIcon()
							),
							React.createElement(Divider, null),
							React.createElement(
								'div',
								{
									tabIndex: 0,
									role: 'button',
									onClick: this.openFromChevron(fieldSettings.direction, true),
									onKeyDown: this.openFromChevron(fieldSettings.direction, true)
								},
								React.createElement(
									'div',
									{ style: panelStyle },
									this.getMenu(fieldSettings.menu, this)
								)
							)
						)
					);
				}
			}]);

			return MuiDrawer;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](MuiDrawer, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(MuiDrawer, null), inContainer);
		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},

	renderSelect: function renderSelect(inFormKey, item, inField, inContainer) {
		if (inField.dataSource == "session") {
			var jfFieldMeta = {};
			if (inField.dataReference != "ijfReference") jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
			var jfFieldDef = {};
			jfFieldDef.id = inField.formCell;
			jfFieldDef.schema = {};
			jfFieldDef.schema.type = "option";
			var data = ijf.session[inFormKey + '_fld_' + inField.formCell];

			if (!data) {
				data = inField.dataReference2;
			}
		} else {
			var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
			var jf = item.fields[jfFieldDef.id];
			var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);

			//if status, the transitions are the field meta...
			if (jfFieldDef.schema.type == 'status') {
				//cache this?
				if (!item.transitions) {
					item.transitions = ijfUtils.jiraApiSync('GET', '/rest/api/2/issue/' + item.key + '/transitions', null);
				}
				var jfFieldMeta = item.transitions;
			} else {
				var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
			}
		}

		if (!data) {
			data = "tbd";
		}

		if (data.indexOf("displayName") > -1) {
			data = JSON.parse(data);
			data = data.name;
		}

		var lAllowBlank = true;
		if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = jfFieldMeta.required ? false : true;
		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		//get lookups

		//two forms:  JIRA references or IJF references
		var combo = {};
		var lookup = [];
		var rawLookup = [];
		var selectParents = null;
		var selectChildren = null;
		var myRefIndex = null;
		switch (inField.dataReference) {
			case "jiraGroup":
				var groupName = inField.referenceFilter;
				if (groupName) {
					try {
						var groupNames = groupName.split(",");
						for (var i = 0; i < groupNames.length; i++) {
							if (groupNames[i]) {
								var rawGroups = ijfUtils.getGroupMembersSync(groupNames[i].trim());
								var parsedGroups = JSON.parse(rawGroups);
								parsedGroups.results.forEach(function (r) {
									lookup.push([r.name, r.displayName]);
								});
							}
						};
						//make unique
						var uVals = [];
						lookup = lookup.reduce(function (inA, v) {
							if (uVals.indexOf(v[0]) > -1) return inA;
							uVals.push(v[0]);
							inA.push(v);
							return inA;
						}, []);

						//now we need to sort it on display name....because of multiple lists
						lookup = lookup.sort(function (a, b) {
							var as = b[1];
							var bs = a[1];
							return as > bs ? -1 : as < bs ? 1 : 0;
						});
					} catch (e) {
						ijfUtils.footLog("Error parsing group members");
					}
				}
				break;
			case "ijfReference":

				//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells

				var refCheck = ijf.fw.CustomTypes.reduce(function (inObj, t) {
					if (t.name == inField.referenceFilter) inObj = t;return inObj;
				}, null);

				if (refCheck) {
					rawLookup = ijfUtils.getReferenceDataByName(inField.referenceFilter, "0", true);
					myRefIndex = 0;
					lookup = rawLookup.map(function (r) {
						return [r[cLookupDef.index], r[cLookupDef.index]];
					});
					//need just unique values from lookup...
					var uVals = [];
					lookup = lookup.reduce(function (inA, v) {
						if (uVals.indexOf(v[0]) > -1) return inA;
						uVals.push(v[0]);
						inA.push(v);
						return inA;
					}, []);
				} else {
					//complex cascade...
					try {
						var cLookupDef = JSON.parse(inField.referenceFilter);
						myRefIndex = cLookupDef.index;
						rawLookup = ijfUtils.getReferenceDataByName(cLookupDef.name, cLookupDef.index, true);
						lookup = rawLookup.map(function (r) {
							return [r[cLookupDef.index], r[cLookupDef.index]];
						});

						//need just unique values from lookup...
						var uVals = [];
						lookup = lookup.reduce(function (inA, v) {
							if (uVals.indexOf(v[0]) > -1) return inA;
							uVals.push(v[0]);
							inA.push(v);
							return inA;
						}, []);

						//establish a listener for this combo if necessary
						if (cLookupDef.parents) {
							var parentIds = cLookupDef.parents;
							selectParents = parentIds.reduce(function (inFilter, p) {
								inFilter.push({ "property": p.dataIndex.toString(), "value": "tbd", "fieldName": p.fieldName });
								return inFilter;
							}, []);
						}
						//for each child, you need to clear it's value
						if (cLookupDef.children) {
							selectChildren = cLookupDef.children;
						}
					} catch (le) {
						ijfUtils.footLog("failed to handle complex lookup: " + le.message);
						lookups[col.columnName] = [];
					}
				}

				break;
			default:

				switch (jfFieldDef.schema.type) {
					case "securitylevel":
					case "priority":
						var lookup = jfFieldMeta.allowedValues.map(function (e) {
							return [e.id, e.name];
						});
						break;
					case "status":
						var lookup = jfFieldMeta.transitions.map(function (e) {
							return [e.id, e.name];
						});
						lookup.push([data, item.fields.status.name]);
						break;
					case "option":
						var lookup = jfFieldMeta.allowedValues.map(function (e) {
							return [e.id, e.value];
						});
						break;
					default:
						var lookup = [];
						ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
				}

				break;
		}

		var lMaxsize = Number.MAX_VALUE;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}

		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		if (style.hidden) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (fieldStyle.readonly) {
			rOnly = true;
		}

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions

		if (hideField) style.visibility = "hidden";
		if (!lAllowBlank) fieldStyle.required = true;
		var ocf = ijfUtils.getEvent(inField);

		var lValidator = function lValidator(v) {
			if (fieldStyle.required && (v == null || v == "")) {
				inContainer.title = "This field is required";
				return false;
			}
			inContainer.removeAttribute("title");
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					inContainer.title = inField.regExMessage;
					return false;
				}
				if (fieldStyle.required && (v == null || v == "")) {
					inContainer.title = "This field is required";
					return false;
				}
				inContainer.removeAttribute("title");
				return true;
			};
		}

		var LocalMuiMenuItem = function (_React$Component13) {
			_inherits(LocalMuiMenuItem, _React$Component13);

			function LocalMuiMenuItem(props) {
				_classCallCheck(this, LocalMuiMenuItem);

				var _this14 = _possibleConstructorReturn(this, (LocalMuiMenuItem.__proto__ || Object.getPrototypeOf(LocalMuiMenuItem)).call(this, props));

				_this14.handleVisibility = function () {
					_this14.setState({ style: _this14.props.style });
				};

				_this14.state = {
					style: props.style
				};
				return _this14;
			}

			_createClass(LocalMuiMenuItem, [{
				key: 'render',
				value: function render() {
					return React.createElement(
						MenuItem,
						{ style: this.state.style, value: this.props.value },
						this.props.display
					);
				}
			}]);

			return LocalMuiMenuItem;
		}(React.Component);

		//from meta data, set readonly if we don't have the ability...


		if (jfFieldMeta) if (!jfFieldMeta.operations && inField.dataSource != "session") rOnly = true;

		var tData = data;
		if (tData == "tbd") tData = null;

		var LocalMuiSelectField = function (_React$Component14) {
			_inherits(LocalMuiSelectField, _React$Component14);

			function LocalMuiSelectField(props) {
				_classCallCheck(this, LocalMuiSelectField);

				var _this15 = _possibleConstructorReturn(this, (LocalMuiSelectField.__proto__ || Object.getPrototypeOf(LocalMuiSelectField)).call(this, props));

				_this15.handleOpen = function (event) {
					//if parents, then the getMenu has to change to filter the values...
					_this15.setState({ open: true });
				};

				_this15.handleChange = function (event) {
					//add OCF call here..
					if (inField.dataSource == "session") {
						ijf.session[inFormKey + '_fld_' + inField.formCell] = event.target.value;
					} else {
						ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
					}
					if (lValidator(event.target.value)) {
						_this15.state.errored = false;
						ocf(event);
					} else _this15.state.errored = true;

					//now look for children...for each one you need to set the value to null....
					if (_this15.props.selectChildren) {
						_this15.props.selectChildren.forEach(function (c) {
							var ctl = ijfUtils.getControlByDataSource(c);
							if (!ctl) ctl = ijfUtils.getControlByKey(c);
							if (ctl) {
								ctl.control.clearValue();
							}
						});
					}

					_this15.setState(_defineProperty({}, event.target.name, event.target.value));
				};

				_this15.handleClose = function () {
					_this15.setState({ open: false });
				};

				_this15.clearValue = function () {
					_this15.setState({ value: null });
				};

				_this15.state = {
					value: data,
					lookup: lookup,
					rawlookup: rawLookup,
					parents: selectParents,
					errored: !lValidator(tData),
					open: false
				};
				return _this15;
			}

			_createClass(LocalMuiSelectField, [{
				key: 'getMenu',
				value: function getMenu() {
					if (!this.state.lookup) return;
					//var menuItems = this.state.lookup.map(function(r){return (<MenuItem style={{"visibility":"visible"}} value={r[0]}>{r[1]}</MenuItem>)});
					if (this.state.parents) {
						var parent = this.state.parents.reduce(function (inObj, f) {
							inObj = f;return inObj;
						}, null);

						var cValue = 'novaluetofilterwith';
						var ctl = ijfUtils.getControlByDataSource(parent.fieldName);
						if (!ctl) ctl = ijfUtils.getControlByKey(parent.fieldName);
						if (ctl) {
							cValue = ctl.control.state.value;
							console.log(cValue);
							var lState = this.state;
							var menuItems = this.state.lookup.map(function (m) {

								var showIt = lState.rawlookup.reduce(function (inChk, r) {
									if (r[parent.property] == cValue && r[myRefIndex] == m[1]) inChk = true;
									return inChk;
								}, false);
								if (showIt) return React.createElement(
									MenuItem,
									{ value: m[0] },
									m[1]
								);else return;
							});

							return menuItems;
						} else return;
					} else {
						return this.state.lookup.map(function (r) {
							return React.createElement(
								MenuItem,
								{ value: r[0] },
								r[1]
							);
						});
					}
				}
			}, {
				key: 'getTip',
				value: function getTip() {
					if (inField.toolTip) return React.createElement(
						MuiFormHelperText,
						null,
						inField.toolTip
					);
					return;
				}
			}, {
				key: 'getCaption',
				value: function getCaption() {
					//<MuiInputLabel htmlFor={"value-helper"+inField.formCell}>{lCaption}</MuiInputLabel>
					if (lCaption) return React.createElement(
						MuiInputLabel,
						null,
						lCaption
					);
					return;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(
							MuiFormControl,
							{ style: panelStyle, error: this.state.errored, required: fieldStyle.required, disabled: rOnly },
							this.getCaption(),
							React.createElement(
								MuiSelect,
								{
									value: this.state.value,
									open: this.state.open,
									onClose: this.handleClose,
									onOpen: this.handleOpen,
									onChange: this.handleChange,
									input: React.createElement(MuiInput, { style: fieldStyle, name: 'value', id: "value-helper" + inField.formCell, readOnly: rOnly })
								},
								this.getMenu()
							),
							this.getTip()
						)
					);
				}
			}]);

			return LocalMuiSelectField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiSelectField, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiSelectField, { selectChildren: selectChildren }), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},
	renderRadio: function renderRadio(inFormKey, item, inField, inContainer) {

		if (inField.dataSource == "session") {
			var jfFieldMeta = {};
			if (inField.dataReference != "ijfReference") jfFieldMeta.allowedValues = JSON.parse(inField.dataReference);
			var jfFieldDef = {};
			jfFieldDef.id = inField.formCell;
			jfFieldDef.schema = {};
			jfFieldDef.schema.type = "option";
			var data = ijf.session[inFormKey + '_fld_' + inField.formCell];
			if (!data) data = inField.dataReference2;
		} else {
			var jfFieldDef = ijf.jiraFieldsKeyed[inField.dataSource];
			var jf = item.fields[jfFieldDef.id];
			var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);

			//if status, the transitions are the field meta...
			if (jfFieldDef.schema.type == 'status') {
				//cache this?
				if (!item.transitions) {
					item.transitions = ijfUtils.jiraApiSync('GET', '/rest/api/2/issue/' + item.key + '/transitions', null);
				}
				var jfFieldMeta = item.transitions;
			} else {
				var jfFieldMeta = ijf.jiraMetaKeyed[inField.dataSource];
			}
		}
		if (!data) data = "tbd";

		var lAllowBlank = true;
		if (jfFieldMeta.hasOwnProperty("required")) lAllowBlank = jfFieldMeta.required ? false : true;
		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		//get lookuips

		//two forms:  JIRA references or IJF references
		var combo = {};
		var lookup = [];
		var rawLookup = [];
		var selectParents = null;
		var selectChildren = null;
		var myRefIndex = null;
		switch (inField.dataReference) {
			case "ijfReference":

				//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells

				var refCheck = ijf.fw.CustomTypes.reduce(function (inObj, t) {
					if (t.name == inField.referenceFilter) inObj = t;return inObj;
				}, null);

				if (refCheck) {
					rawLookup = ijfUtils.getReferenceDataByName(inField.referenceFilter, "0", true);
					myRefIndex = 0;
					lookup = rawLookup.map(function (r) {
						return [r[cLookupDef.index], r[cLookupDef.index]];
					});
				} else {
					//complex cascade...
					try {
						var cLookupDef = JSON.parse(inField.referenceFilter);
						myRefIndex = cLookupDef.index;
						rawLookup = ijfUtils.getReferenceDataByName(cLookupDef.name, cLookupDef.index, true);
						lookup = rawLookup.map(function (r) {
							return [r[cLookupDef.index], r[cLookupDef.index]];
						});
						//establish a listener for this combo if necessary
					} catch (le) {
						ijfUtils.footLog("failed to handle complex lookup: " + le.message);
						lookups[col.columnName] = [];
					}
				}

				break;
			default:

				switch (jfFieldDef.schema.type) {
					case "securitylevel":
					case "priority":
						var lookup = jfFieldMeta.allowedValues.map(function (e) {
							return [e.id, e.name];
						});
						break;
					case "status":
						var lookup = jfFieldMeta.transitions.map(function (e) {
							return [e.id, e.name];
						});
						lookup.push([data, item.fields.status.name]);
						break;
					case "option":
						var lookup = jfFieldMeta.allowedValues.map(function (e) {
							return [e.id, e.value];
						});
						break;
					default:
						var lookup = [];
						ijfUtils.footLog("No options found for schema: " + jfFieldDef.schema.type);
				}

				break;
		}

		var lMaxsize = Number.MAX_VALUE;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}
		try {
			var labelStyle = JSON.parse(inField.labelStyle);
		} catch (e) {
			var labelStyle = {};
		}

		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;

		if (style.hidden) {
			hideLabel = true;
			hideField = true;
		}
		var rOnly = false;
		if (fieldStyle.readonly) {
			rOnly = true;
		}

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		//console.log(JSON.stringify(perms));
		if (!rOnly && !perms.canEdit) rOnly = true;
		if (!hideField && !perms.canSee) hideField = true;
		//end permissions

		if (hideField) style.visibility = "hidden";
		if (!lAllowBlank) fieldStyle.required = true;
		var ocf = ijfUtils.getEvent(inField);

		var lValidator = function lValidator(v) {
			if (fieldStyle.required && (v == null || v == "")) {
				inContainer.title = "This field is required";
				return false;
			}
			inContainer.removeAttribute("title");
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					inContainer.title = inField.regExMessage;
					return false;
				}
				if (fieldStyle.required && (v == null || v == "")) {
					inContainer.title = "This field is required";
					return false;
				}
				inContainer.removeAttribute("title");
				return true;
			};
		}

		var tData = data;
		if (tData == "tbd") tData = null;

		//from meta data, set readonly if we don't have the ability...
		if (jfFieldMeta) if (!jfFieldMeta.operations && inField.dataSource != "session") rOnly = true;

		var LocalMuiRadioField = function (_React$Component15) {
			_inherits(LocalMuiRadioField, _React$Component15);

			function LocalMuiRadioField(props) {
				_classCallCheck(this, LocalMuiRadioField);

				var _this16 = _possibleConstructorReturn(this, (LocalMuiRadioField.__proto__ || Object.getPrototypeOf(LocalMuiRadioField)).call(this, props));

				_this16.handleChange = function (event) {
					//add OCF call here..
					if (inField.dataSource == "session") {
						ijf.session[inFormKey + '_fld_' + inField.formCell] = event.target.value;
					} else {
						ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
					}
					if (lValidator(event.target.value)) {
						_this16.state.errored = false;
						ocf(event);
					} else _this16.state.errored = true;

					_this16.setState({ value: event.target.value });
				};

				_this16.clearValue = function () {
					_this16.setState({ value: null });
				};

				_this16.state = {
					value: data,
					lookup: lookup,
					errored: !lValidator(tData)
				};
				return _this16;
			}

			_createClass(LocalMuiRadioField, [{
				key: 'getMenu',
				value: function getMenu() {
					if (!this.state.lookup) return;
					return this.state.lookup.map(function (r) {
						return React.createElement(MuiFormControlLabel, { value: r[0], control: React.createElement(MuiRadio, { style: panelStyle, color: 'primary' }), label: r[1] });
					});
				}
			}, {
				key: 'getTip',
				value: function getTip() {
					if (inField.toolTip) return React.createElement(
						MuiFormHelperText,
						null,
						inField.toolTip
					);
					return;
				}
			}, {
				key: 'getCaption',
				value: function getCaption() {
					//if(lCaption) return (<MuiInputLabel component="legend">{lCaption}</MuiInputLabel>)
					if (lCaption) return React.createElement(
						MuiFormLabel,
						{ required: this.state.errored, style: labelStyle },
						lCaption
					);
					return;
				}
			}, {
				key: 'render',
				value: function render() {
					return React.createElement(
						'div',
						{ id: inFormKey + '_fldDivId_' + inField.formCell, style: style },
						React.createElement(
							MuiFormControl,
							{ margin: panelStyle.margin, error: this.state.errored, style: panelStyle, component: 'fieldset', required: fieldStyle.required, disabled: rOnly },
							this.getCaption(),
							React.createElement(
								MuiRadioGroup,
								{ style: fieldStyle,
									name: "radioGroup_name_" + inField.formCell,
									value: this.state.value,
									onChange: this.handleChange
								},
								this.getMenu()
							),
							this.getTip()
						)
					);
				}
			}]);

			return LocalMuiRadioField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiRadioField, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiRadioField, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},

	renderGrid: function renderGrid(inFormKey, item, inField, inContainer) {
		//get type definition
		var thisT = {};
		for (var tF in ijf.fw.CustomTypes) {
			if (!ijf.fw.CustomTypes.hasOwnProperty(tF)) return;
			if (ijf.fw.CustomTypes[tF].name == inField.dataSource) thisT = ijf.fw.CustomTypes[tF];
		}

		if (!thisT) throw "Invalid type name: " + inField.dataSource;

		inContainer.title = inField.toolTip;

		var jfFieldMeta = ijf.jiraMetaKeyed[thisT.fieldName];
		var jfFieldDef = ijf.jiraFieldsKeyed[thisT.fieldName];
		var jf = item.fields[jfFieldDef.id];

		var data = ijfUtils.handleJiraFieldType(jfFieldDef, jf);

		if (!data) data = "[]";

		if (ijfUtils.getNameValueFromStyleString(inField.fieldStyle, 'required') == "true") lAllowBlank = false;

		var lMaxsize = Number.MAX_VALUE;

		var lValidator = function lValidator(v) {
			return true;
		};
		var lRegex = inField.regEx;
		if (lRegex != null && lRegex != "") {
			lValidator = function lValidator(v) {
				var rgx = new RegExp(lRegex);
				if (!rgx.exec(v)) {
					return inField.regExMessage;
				}
				return true;
			};
		}
		var hideField = ijfUtils.renderIfShowField(data, inField);
		var hideLabel = false;
		if (inField.caption == "") var lCaption = inField.dataSource;else if (inField.caption == "none") {
			var lCaption = "";
			hideLabel = true;
		} else var lCaption = inField.caption;
		if (inField.style.indexOf('hidden:true') > -1) {
			hideLabel = true;
			hideField = true;
		}

		var rOnly = false;
		if (inField.fieldStyle.indexOf('readonly:true') > -1) {
			rOnly = true;
		}
		if (inField.style.indexOf('enteronce:true') > -1) {
			if (!!data) rOnly = true;
		}

		var l_labelStyle = inField.labelStyle;
		var l_panelStyle = inField.panelStyle;
		var l_Style = inField.style;
		var l_fieldStyle = inField.fieldStyle;

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldStyle = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldStyle = {};
		}
		try {
			var labelStyle = JSON.parse(inField.labelStyle);
		} catch (e) {
			var labelStyle = {};
		}

		var ocf = ijfUtils.getEvent(inField);

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}

		if (!hideField && !perms.canSee) hideField = true;
		if (!perms.canEdit) rOnly = true;
		//end permissions

		var collapsible = true;
		if (l_fieldStyle.indexOf('collapsible:false') > -1) {
			collapsible = false;
		}
		var collapsed = false;
		if (l_fieldStyle.indexOf('collapsed:true') > -1) {
			collapsed = true;
		}

		var features = null;
		if (l_fieldStyle.indexOf('sums:true') > -1) {
			features = [{
				ftype: 'summary'
			}];
		}

		var colWidths = [];
		var colHeaders = [];
		try {
			colHeaders = JSON.parse(inField.tableHeaders);

			colHeaders = colHeaders.reduce(function (inA, h) {
				inA[h.column] = h;
				return inA;
			}, []);
		} catch (e) {
			colHeaders = [];
			if (inField.colHeaders) {
				var tempColWidths = inField.tableHeaders.split(",");
				var colInd = 0;
				tempColWidths.forEach(function (c) {
					if (c) var w = c;else var w = "tbd";
					colWidths[colInd] = { "caption": w, "cellStyle": null };
				});
			}
		}
		try {
			colWidths = JSON.parse(inField.tableWidths);
			colWidths = colWidths.reduce(function (inA, h) {
				inA[h.column] = h;
				return inA;
			}, []);
		} catch (e) {
			colWidths = [];
			if (inField.tableWidths) {
				var tempColWidths = inField.tableWidths.split(",");
				var colInd = 0;
				tempColWidths.forEach(function (c) {
					if (c) var w = c;else var w = "100px";
					colWidths[colInd] = { "width": w, "cellStyle": null, "numeric": false, "rowStyle": null };
				});
			}
		}

		//The grid setup....
		var listColumns = [];
		var tFields = [];
		var lookups = [];

		if (!thisT.settings) {
			var typeIndex = ijf.fw.CustomTypes.indexOf(thisT);

			//load the settings...
			var fullTypeRaw = ijfUtils.jiraApiSync('GET', g_root + '/plugins/servlet/iforms?ijfAction=getCustomType&customTypeId=' + thisT.id, null);
			var cleanDoubleDouble = fullTypeRaw.replace(/\"\"/g, "\"");
			cleanDoubleDouble = cleanDoubleDouble.replace(/~pct~/g, "%");
			cleanDoubleDouble = cleanDoubleDouble.replace("\"~\"", "\"\"");
			thisT = JSON.parse(cleanDoubleDouble);

			//update local memory
			ijf.fw.CustomTypes.splice(typeIndex, 1);
			ijf.fw.CustomTypes.push(thisT);
		}

		var gCols = JSON.parse(thisT.settings);
		//order by order
		gCols = gCols.sort(function (a, b) {
			return a.order - b.order;
		});
		var cIndex = 0;
		var lookups = [];
		var colObj = {};
		gCols.forEach(function (col) {
			var _colObj;

			var lValidator = function lValidator(v) {
				return true;
			};
			if (col.regEx != null && col.regEx != "") {
				lValidator = function lValidator(v) {
					var rgx = new RegExp(col.regEx);
					if (!rgx.exec(v)) {
						return col.regExMess;
					}
					return true;
				};
			}

			var validRenderer = function validRenderer(val, meta, rec, rowIndex, colIndex, store) {
				//at this poing you have the column def, if required or regex fails, make pink

				if (col.required == "Yes" && !val) {
					meta.style = "background-color:pink;";
				}
				if (col.regEx != null && col.regEx != "") {
					var rgxRenderCheck = new RegExp(col.regEx);
					if (!rgxRenderCheck.exec(val)) {
						meta.style = "background-color:pink;";
					}
				}

				//now manage the value formatting....
				switch (col.controlType) {
					case "datefield":
						if (col.format == null) col.format = 'm/d/Y';
						if (col.format == "") col.format = 'm/d/Y';
						return Ext.util.Format.dateRenderer(col.format)(val); //moment(val).format(col.format);
						break;
					case "combobox":
						//if value lookup is two dimensional, lookup value of val...
						var retVal = val;
						if (lookups[col.columnName]) {
							var lLookup = lookups[col.columnName];
							if (lLookup) {
								if (_typeof(lLookup[0]) == "object") lLookup.forEach(function (r) {
									if (r[0] == val) retVal = r[1];
								});
							}
						}
						return retVal;
						break;
					case "numberfield":
						if (col.format) return Ext.util.Format.numberRenderer(col.format)(val); //moment(val).format(col.format);
						return val;
						break;
					default:
						return val;
				}
			};

			var thisColHeader = col.columnName;
			if (colHeaders[cIndex] && colHeaders[cIndex].caption) thisColHeader = colHeaders[cIndex].caption;

			switch (col.controlType) {
				case "datefield":
					if (col.format == null) col.format = 'm/d/Y';
					if (col.format == "") col.format = 'm/d/Y';
					colObj = (_colObj = {
						header: thisColHeader,
						renderer: validRenderer,
						ijfColumn: col,
						headerObj: colHeaders[cIndex],
						widthObj: colWidths[cIndex]
					}, _defineProperty(_colObj, 'renderer', function renderer(inVal) {
						if (inVal) return Ext.util.Format.dateRenderer(col.format)(new Date(inVal));else return "";
						//moment(new Date(inVal)).format(col.format);
					}), _defineProperty(_colObj, 'dataIndex', col.columnName), _colObj);
					break;
				case "numberfield":
					tFields.push({ name: col.columnName, type: 'number' });
					colObj = {
						header: thisColHeader,
						renderer: validRenderer,
						dataIndex: col.columnName,
						ijfColumn: col,
						headerObj: colHeaders[cIndex],
						widthObj: colWidths[cIndex]
					};
					break;
				case "checkbox":
					tFields.push({ name: col.columnName, type: 'boolean' });
					colObj = {
						header: thisColHeader,
						ijfColumn: col,
						headerObj: colHeaders[cIndex],
						widthObj: colWidths[cIndex],
						dataIndex: col.columnName,
						listeners: {
							checkchange: function checkchange(n, o, f) {
								ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
							}
						}
					};
					break;
				case "combobox":
					tFields.push({ name: col.columnName, type: 'string' });
					//The lookup may be simple 1D array or part of a complex cascade.  The syntax of co.reference tells
					var cLookupDef = { "index": "0" };
					var cListener = {
						change: function change(n, o, f) {
							ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
						},
						focus: function focus() {
							this.validate();
						}
					};
					if (ijf.fw.CustomTypes.reduce(function (inObj, t) {
						if (t.name == col.reference) inObj = t;return inObj;
					}, null)) {
						lookups[col.columnName] = ijfUtils.getReferenceDataByName(col.reference, "0");
					} else {
						//complex cascade...
						try {
							cLookupDef = JSON.parse(col.reference);
							lookups[col.columnName] = ijfUtils.getReferenceDataByName(cLookupDef.name, cLookupDef.index);

							//establish a listener for this combo if necessary
							if (cLookupDef.parents) {
								var parentIds = cLookupDef.parents;
								var cFilters = parentIds.reduce(function (inFilter, p) {
									inFilter.push({ "property": p.dataIndex.toString(), "value": "tbd", "columnName": p.columnName });
									return inFilter;
								}, []);
								cListener["beforeQuery"] = function (query) {
									var cContainer = this.up();
									//cFilters["value"]= cValue;
									cFilters.forEach(function (f) {
										//for each filter param, we need to get the correct value...
										var cValue = cContainer.grid.getSelectionModel().getSelected().items[0].data[f.columnName];
										if (!cValue) cValue = 'novaluetofilterwith';
										f.value = cValue;
									});
									this.store.clearFilter();
									this.store.filter(cFilters);
								};
							}

							//for each child, you need to clear it's value
							if (cLookupDef.children) {
								var childFields = cLookupDef.children;
								cListener["change"] = function (n, o, f) {
									var cContainer = this.up();
									childFields.forEach(function (f) {
										cContainer.grid.getSelectionModel().getSelected().items[0].set(f, null);
									});
									ijf.main.controlChanged(inFormKey + '_fld_' + inField.formCell);
								};
							}
						} catch (le) {
							ijfUtils.footLog("failed to handle complex lookup: " + le.message);
							lookups[col.columnName] = [];
						}
					}
					colObj = {
						header: thisColHeader,
						ijfColumn: col,
						headerObj: colHeaders[cIndex],
						widthObj: colWidths[cIndex],
						dataIndex: col.columnName,
						renderer: validRenderer
					};
					break;
				default:
					tFields.push({ name: col.columnName, type: 'string' });

					colObj = {
						header: thisColHeader,
						ijfColumn: col,
						headerObj: colHeaders[cIndex],
						widthObj: colWidths[cIndex],
						dataIndex: col.columnName,
						renderer: validRenderer
					};
			}
			listColumns.push(colObj);
			cIndex++;
		});

		//thisT.settings...
		if (data) {
			try {
				var cts = JSON.parse(data);
				//cts = cts.map(function(r){ delete r.id; return r;});
				data = cts;
			} catch (e) {
				throw 'Failed to parse the grid json';
			}
		}

		var LocalMuiTable = function (_React$Component16) {
			_inherits(LocalMuiTable, _React$Component16);

			function LocalMuiTable(props) {
				_classCallCheck(this, LocalMuiTable);

				return _possibleConstructorReturn(this, (LocalMuiTable.__proto__ || Object.getPrototypeOf(LocalMuiTable)).call(this, props));
			}

			_createClass(LocalMuiTable, [{
				key: 'getHeaders',
				value: function getHeaders() {

					return listColumns.reduce(function (inA, h) {
						if (h.headerObj) {
							if (h.headerObj.cellStyle.visibility == "hidden") return inA;else inA.push(React.createElement(
								MuiTableCell,
								{ style: h.headerObj.cellStyle },
								h["header"]
							));
						} else {
							inA.push(React.createElement(
								MuiTableCell,
								null,
								h["header"]
							));
						}
						return inA;
					}, []);
				}
			}, {
				key: 'getDataRows',
				value: function getDataRows() {
					return data.map(function (n) {

						return React.createElement(
							MuiTableRow,
							{ style: panelStyle, key: n.id },
							listColumns.reduce(function (inA, c) {

								if (c.headerObj) {
									try {
										if (c.headerObj.cellStyle.visibility == "hidden") return inA;
									} catch (e) {}
								}

								var lNumeric = false;
								var lCellStyle = null;
								if (c.widthObj) {
									if (c.widthObj.numeric) lNumeric = c.widthObj.numeric;
									if (c.widthObj.cellStyle) lCellStyle = c.widthObj.cellStyle;
								}

								var outVal = n[c["dataIndex"]];
								if (c.renderer) outVal = c.renderer(outVal);
								inA.push(React.createElement(
									MuiTableCell,
									{ numeric: lNumeric, style: lCellStyle },
									outVal
								));
								return inA;
							}, [])
						);
					});
				}
			}, {
				key: 'render',
				value: function render() {
					if (style.paper) {
						return React.createElement(
							MuiPaper,
							null,
							React.createElement(
								MuiTable,
								{ style: style },
								React.createElement(
									MuiTableHead,
									null,
									React.createElement(
										MuiTableRow,
										{ style: labelStyle },
										this.getHeaders()
									)
								),
								React.createElement(
									MuiTableBody,
									{ style: fieldStyle },
									this.getDataRows()
								)
							)
						);
					} else {
						return React.createElement(
							MuiTable,
							{ style: style },
							React.createElement(
								MuiTableHead,
								null,
								React.createElement(
									MuiTableRow,
									{ style: labelStyle },
									this.getHeaders()
								)
							),
							React.createElement(
								MuiTableBody,
								{ style: fieldStyle },
								this.getDataRows()
							)
						);
					}
				}
			}]);

			return LocalMuiTable;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiTable, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiTable, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	},

	renderFormButtons: function renderFormButtons(inFormKey, item, inField, inContainer) {

		inContainer.title = inField.toolTip;

		var readOnly = false;

		var ocf = ijfUtils.getEvent(inField);

		//rendeIf logic
		var hideField = ijfUtils.renderIfShowField("", inField);

		//permissions check....has to exist...
		if (inField.permissions.enabled) {
			var perms = ijfUtils.getPermissionObj(inField.permissions, ijf.currentItem, ijf.main.currentUser);
		} else {
			var perms = ijfUtils.getPermissionObj(inField.form.permissions, ijf.currentItem, ijf.main.currentUser);
		}
		if (!hideField && !perms.canSee) hideField = true;
		if (!perms.canEdit) readOnly = true;

		//end permissions

		var l_save = "Save";
		var l_reload = "Reload";
		var l_done = "Done";
		var l_style = "";

		if (inField.dataReference2) {
			l_style = inField.dataReference2.split(",");
			if (l_style.length == 3) {
				l_save = l_style[0];
				l_reload = l_style[1];
				l_done = l_style[2];
			}
		}

		try {
			var style = JSON.parse(inField.style);
		} catch (e) {
			var style = {};
		}
		try {
			var panelStyle = JSON.parse(inField.panelStyle);
		} catch (e) {
			var panelStyle = {};
		}
		try {
			var fieldSettings = JSON.parse(inField.fieldStyle);
		} catch (e) {
			var fieldSettings = {};
		}

		//from meta data, set readonly if we don't have the ability...
		var hideSave = false;
		if (fieldSettings["hideIfReadOnly"] == true) {
			var jfFieldMeta = ijf.jiraMetaKeyed["Summary"];
			if (jfFieldMeta) if (!jfFieldMeta.operations) hideSave = true;
		}

		var disabled = false;
		if (hideField) style.visibility = "hidden";
		if (fieldSettings.readonly) disabled = true;
		if (readOnly) disabled = true;
		if (!fieldSettings.size) fieldSettings.size = "medium";

		var getIcon = function getIcon(inLabel) {
			if (fieldSettings[inLabel + "icon"]) return React.createElement(
				Icon,
				null,
				fieldSettings[inLabel + "icon"]
			);else return;
		};

		var handleSave = function handleSave() {
			if (ijf.snippets.hasOwnProperty(inField["event"])) {
				var fValFail = ijf.snippets[inField["event"]]();
				if (!fValFail) {
					ijfUtils.footLog("form failed validation");
					return;
				}
			}

			if (inField.dataReference) {
				ijf.main.saveResultMessage = ijfUtils.replaceKeyValues(inField.dataReference, item);
			} else {
				ijf.main.saveResultMessage = null;
			}
			var onSuccessSave = function onSuccessSave() {
				ijfUtils.hideProgress();
				if (ijf.main.saveResultMessage) ijfUtils.modalDialogMessage("Information", ijf.main.saveResultMessage);
				ijf.main.setAllClean();
				//ijf.currentItem=ijfUtils.getJiraIssueSync(ijf.main.itemId);
				g_itemId = ijf.main.itemId;
				if (inField.referenceFilter) g_formId = inField.referenceFilter;
				ijf.main.resetForm();
			};
			var tForm = inField.form;

			if (ijf.fw.forms.hasOwnProperty(inField.referenceFilter)) {
				tForm = ijf.fw.forms[inField.referenceFilter];
			}
			Ext.getBody().mask("Saving...");
			var saveIt = function saveIt() {
				ijf.main.saveForm(onSuccessSave, null, tForm, item);
			};
			window.setTimeout(saveIt, 50);
		};

		var handleReload = function handleReload() {
			if (window.onbeforeunload == null) {
				ijf.main.resetForm();
			} else {
				var dFunc = function dFunc() {
					window.onbeforeunload = null;
					ijf.main.resetForm();
				};
				ijfUtils.modalDialog("Warning", ijf.main.gNavigateOnChange, dFunc);
			}
		};

		var handleDone = function handleDone() {
			//target form is dataSource if it exists or default form if it exists...
			var tForm = "";
			if (ijf.fw.forms.hasOwnProperty(inField.dataSource)) {
				tForm = inField.dataSource;
			} else if (ijf.fw.forms.hasOwnProperty(inField.form.formSet.settings.defaultForm)) {
				tForm = inField.form.formSet.settings.defaultForm;
			} else {
				ijfUtils.modalDialogMessage("Information", "Sorry but the done action needs a form or the form group needs a default form.");
				return;
			}

			//12/5/2017 - changing to reset item to null unless persist item  true...
			var tarItem = item;
			if (inField.referenceFilter != "persistItem") {
				tarItem = null;
				window.g_itemId = null;
			}

			if (window.onbeforeunload == null) {
				window.g_formId = tForm;
				ijf.main.renderForm("ijfContent", tForm, false, tarItem);
			} else {
				var dFunc = function dFunc() {
					window.onbeforeunload = null;
					window.g_formId = tForm;
					ijf.main.renderForm("ijfContent", tForm, false, tarItem);
				};
				ijfUtils.modalDialog("Warning", ijf.main.gNavigateOnChange, dFunc);
			}
		};

		var getSave = function getSave() {
			if (!l_save || hideSave) return;else return React.createElement(
				MuiButton,
				{ onClick: handleSave, disabled: disabled, size: fieldSettings.size, color: fieldSettings.color, variant: fieldSettings.variant, style: panelStyle },
				getIcon(l_save),
				l_save
			);
		};
		var getReload = function getReload() {
			if (!l_reload) return;else return React.createElement(
				MuiButton,
				{ onClick: handleReload, size: fieldSettings.size, color: fieldSettings.color, variant: fieldSettings.variant, style: panelStyle },
				getIcon(l_reload),
				l_reload
			);
		};
		var getDone = function getDone() {
			if (!l_done) return;else return React.createElement(
				MuiButton,
				{ onClick: handleDone, size: fieldSettings.size, color: fieldSettings.color, variant: fieldSettings.variant, style: panelStyle },
				getIcon(l_done),
				l_done
			);
		};
		var LocalMuiButton = function LocalMuiButton() {
			return React.createElement(
				'div',
				{ style: style },
				getSave(),
				getReload(),
				getDone()
			);
		};
		//before render....
		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](LocalMuiButton, inFormKey, item, inField, inContainer);

		var controlReference = ReactDOM.render(React.createElement(LocalMuiButton, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, controlReference, inContainer);
		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](controlReference, inFormKey, item, inField, inContainer);
	}

};

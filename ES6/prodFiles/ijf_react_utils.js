"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//manual imports
var TextField = window['material-ui']["TextField"];

var ijf = ijf || {};
ijf.reactUtils = {
	renderTextbox: function renderTextbox(inFormKey, item, inField, inContainer) {

		inContainer.title = inField.toolTip;
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


		var l_labelStyle = inField.labelStyle;
		var l_panelStyle = inField.panelStyle;
		var l_Style = inField.style;
		var l_fieldStyle = inField.fieldStyle;

		if (!l_labelStyle) l_labelStyle = "background:transparent";
		if (!l_panelStyle) l_panelStyle = "background:transparent";
		if (!l_Style) l_Style = "background:transparent";
		if (!l_fieldStyle) l_fieldStyle = "background:white";
		if (rOnly) l_fieldStyle = l_fieldStyle + ";background:lightgray";

		var ocf = ijfUtils.getEvent(inField);

		var MuiTextField = function (_React$Component) {
			_inherits(MuiTextField, _React$Component);

			function MuiTextField(props) {
				_classCallCheck(this, MuiTextField);

				var _this = _possibleConstructorReturn(this, (MuiTextField.__proto__ || Object.getPrototypeOf(MuiTextField)).call(this, props));

				_this.handleChange = function (event) {
					_this.setState({
						value: event.target.value
					});
				};

				_this.state = {
					value: data
				};
				return _this;
			}

			_createClass(MuiTextField, [{
				key: "render",
				value: function render() {
					return React.createElement(
						"div",
						null,
						React.createElement(TextField, {
							id: inFormKey + '_ctr_' + inField.formCell.replace(",", "_"),
							value: this.state.value,
							onChange: this.handleChange
						})
					);
				}
			}]);

			return MuiTextField;
		}(React.Component);

		//before render....


		if (ijf.snippets.hasOwnProperty(inField["beforeRender"])) ijf.snippets[inField["beforeRender"]](muiTextField, inFormKey, item, inField, inContainer);

		ReactDOM.render(React.createElement(MuiTextField, null), inContainer);

		var thisControl = new itemControl(inFormKey + '_fld_' + inField.formCell, inField, item, MuiTextField, inContainer);

		ijf.main.controlSet[thisControl.id] = thisControl;
		//after render....
		if (ijf.snippets.hasOwnProperty(inField["afterRender"])) ijf.snippets[inField["afterRender"]](muiTextField, inFormKey, item, inField, inContainer);
	}
};
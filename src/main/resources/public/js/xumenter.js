(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/* eslint-disable no-var */
var Docxtemplater = require("../js/docxtemplater.js");
window.Docxtemplater = Docxtemplater;
var expressions = require("angular-expressions");
//var JSZip = require("jszip");
window.expressions = expressions;

},{"../js/docxtemplater.js":3,"angular-expressions":20}],2:[function(require,module,exports){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var memoize = require("./memoize");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var Errors = require("./errors");

var DocUtils = {};

function parser(tag) {
	return _defineProperty({}, "get", function get(scope) {
		if (tag === ".") {
			return scope;
		}
		return scope[tag];
	});
}

DocUtils.defaults = {
	nullGetter: function nullGetter(part) {
		if (!part.module) {
			return "undefined";
		}
		if (part.module === "rawxml") {
			return "";
		}
		return "";
	},

	parser: memoize(parser),
	intelligentTagging: true,
	fileType: "docx",
	delimiters: {
		start: "{",
		end: "}"
	}
};

DocUtils.mergeObjects = function () {
	var resObj = {};
	var obj = void 0,
	    keys = void 0;
	for (var i = 0; i < arguments.length; i += 1) {
		obj = arguments[i];
		keys = Object.keys(obj);
		for (var j = 0; j < keys.length; j += 1) {
			resObj[keys[j]] = obj[keys[j]];
		}
	}
	return resObj;
};

DocUtils.xml2str = function (xmlNode) {
	var a = new XMLSerializer();
	return a.serializeToString(xmlNode);
};

DocUtils.decodeUtf8 = function (s) {
	try {
		if (s === undefined) {
			return undefined;
		}
		// replace Ascii 160 space by the normal space, Ascii 32
		return decodeURIComponent(escape(DocUtils.convertSpaces(s)));
	} catch (e) {
		var err = new Error("End");
		err.properties.data = s;
		err.properties.explanation = "Could not decode string to UTF8";
		throw err;
	}
};

DocUtils.encodeUtf8 = function (s) {
	return unescape(encodeURIComponent(s));
};

DocUtils.str2xml = function (str, errorHandler) {
	var parser = new DOMParser({ errorHandler: errorHandler });
	return parser.parseFromString(str, "text/xml");
};

DocUtils.charMap = {
	"&": "&amp;",
	"'": "&apos;",
	"<": "&lt;",
	">": "&gt;"
};

var regexStripRegexp = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;
DocUtils.escapeRegExp = function (str) {
	return str.replace(regexStripRegexp, "\\$&");
};

DocUtils.charMapRegexes = Object.keys(DocUtils.charMap).map(function (endChar) {
	var startChar = DocUtils.charMap[endChar];
	return {
		rstart: new RegExp(DocUtils.escapeRegExp(startChar), "g"),
		rend: new RegExp(DocUtils.escapeRegExp(endChar), "g"),
		start: startChar,
		end: endChar
	};
});

DocUtils.wordToUtf8 = function (string) {
	var r = void 0;
	for (var i = 0, l = DocUtils.charMapRegexes.length; i < l; i++) {
		r = DocUtils.charMapRegexes[i];
		string = string.replace(r.rstart, r.end);
	}
	return string;
};

DocUtils.utf8ToWord = function (string) {
	if (typeof string !== "string") {
		string = string.toString();
	}
	var r = void 0;
	for (var i = 0, l = DocUtils.charMapRegexes.length; i < l; i++) {
		r = DocUtils.charMapRegexes[i];
		string = string.replace(r.rend, r.start);
	}
	return string;
};

DocUtils.cloneDeep = function (obj) {
	return JSON.parse(JSON.stringify(obj));
};

DocUtils.concatArrays = function (arrays) {
	return Array.prototype.concat.apply([], arrays);
};

var spaceRegexp = new RegExp(String.fromCharCode(160), "g");
DocUtils.convertSpaces = function (s) {
	return s.replace(spaceRegexp, " ");
};

DocUtils.pregMatchAll = function (regex, content) {
	/* regex is a string, content is the content. It returns an array of all matches with their offset, for example:
 	 regex=la
 	 content=lolalolilala
 returns: [{array: {0: 'la'},offset: 2},{array: {0: 'la'},offset: 8},{array: {0: 'la'} ,offset: 10}]
 */
	var matchArray = [];
	var match = void 0;
	while ((match = regex.exec(content)) != null) {
		matchArray.push({ array: match, offset: match.index });
	}
	return matchArray;
};

DocUtils.sizeOfObject = function (obj) {
	return Object.keys(obj).length;
};

function throwXmlTagNotFound(options) {
	var err = new Errors.XTTemplateError("No tag '" + options.element + "' was found at the " + options.position);
	err.properties = {
		id: "no_xml_tag_found_at_" + options.position,
		explanation: "No tag '" + options.element + "' was found at the " + options.position,
		parsed: options.parsed,
		index: options.index,
		element: options.element
	};
	throw err;
}

DocUtils.getRight = function (parsed, element, index) {
	for (var i = index, l = parsed.length; i < l; i++) {
		var part = parsed[i];
		if (part.value === "</" + element + ">") {
			return i;
		}
	}
	throwXmlTagNotFound({ position: "right", element: element, parsed: parsed, index: index });
};

DocUtils.getLeft = function (parsed, element, index) {
	var parts = parsed.slice(0, index);
	for (var i = parts.length - 1; i >= 0; i--) {
		var part = parts[i];
		if (part.value.indexOf("<" + element) === 0 && [">", " "].indexOf(part.value[element.length + 1]) !== -1) {
			return i;
		}
	}
	throwXmlTagNotFound({ position: "left", element: element, parsed: parsed, index: index });
};

module.exports = DocUtils;

DocUtils.traits = require("./traits");
},{"./errors":4,"./memoize":8,"./traits":17,"xmldom":22}],3:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocUtils = require("./doc-utils");

var Docxtemplater = function () {
	function Docxtemplater() {
		_classCallCheck(this, Docxtemplater);

		if (arguments.length > 0) {
			throw new Error("The constructor with parameters have been removed in docxtemplater 3.0, please check the upgrade guide.");
		}
		this.compiled = {};
		this.modules = [];
		this.setOptions({});
	}

	_createClass(Docxtemplater, [{
		key: "attachModule",
		value: function attachModule(module) {
			this.modules.push(module);
			return this;
		}
	}, {
		key: "setOptions",
		value: function setOptions(options) {
			var _this = this;

			this.options = options;
			Object.keys(DocUtils.defaults).forEach(function (key) {
				var defaultValue = DocUtils.defaults[key];
				_this[key] = _this.options[key] != null ? _this.options[key] : defaultValue;
			});
			if (this.fileType === "docx" || this.fileType === "pptx" || this.fileType === "xlsx") {
				this.fileTypeConfig = Docxtemplater.FileTypeConfig[this.fileType];
			}
			this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig;
			this.options.xmlFileNames = [];
			return this;
		}
	}, {
		key: "loadZip",
		value: function loadZip(zip) {
			if (zip.loadAsync) {
				throw new Error("Docxtemplater doesn't handle JSZip version >=3, see changelog");
			}
			this.zip = zip;
			return this;
		}
	}, {
		key: "renderFile",
		value: function renderFile(fileName) {
			var currentFile = this.createTemplateClass(fileName);
			currentFile.render();
			this.zip.file(fileName, currentFile.content);
			this.compiled[fileName] = currentFile.postparsed;
			//this.commentRanges[fileName] = currentFile.commentRanges;
		}
	}, {
		key: "parseFileContent",
		value: function parseFileContent(fileName) {
			var currentFile = this.createTemplateClass(fileName);
			console.info("created new docxTemplater object for file " + fileName);
			console.info("Calling render on this file");
			currentFile["textRanges"] = this.textRanges;
			currentFile.parseContent();
			console.info("out of file parser");
		}
	}, {
		key: "compile",
		value: function compile() {
			this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
		}
	}, {
		key: "parseContent",
		value: function parseContent() {
			var _this2 = this;

			this.modules = this.fileTypeConfig.baseModules.map(function (moduleFunction) {
				return moduleFunction();
			}).concat(this.modules);
			this.options = this.modules.reduce(function (options, module) {
				return module.optionsTransformer ? module.optionsTransformer(options, _this2) : options;
			}, this.options);
			this.xmlDocuments = this.options.xmlFileNames.reduce(function (xmlDocuments, fileName) {
				var content = _this2.zip.files[fileName].asText();
				xmlDocuments[fileName] = DocUtils.str2xml(content);
				return xmlDocuments;
			}, {});
			this.modules.forEach(function (module) {
				if (module.set) {
					module.set({ zip: _this2.zip, xmlDocuments: _this2.xmlDocuments });
				}
			});
			this.compile();
			// Loop inside all templatedFiles (ie xml files with content).
			// Sometimes they don't exist (footer.xml for example)
			//this.commentContent={};
			//this.comentRangeText={};
			this.templatedFiles.forEach(function (fileName) {
				if (_this2.zip.files[fileName] != null) {
					console.info("____________________________________");
					console.info("calling this parseFileContent " + fileName);
					_this2.parseFileContent(fileName);
				}
			});

			Object.keys(this.xmlDocuments).forEach(function (fileName) {
				_this2.zip.remove(fileName);
				var content = DocUtils.encodeUtf8(DocUtils.xml2str(_this2.xmlDocuments[fileName]));
				return _this2.zip.file(fileName, content, {});
			});
			return this;
		}
	}, {
		key: "render",
		value: function render() {
			var _this3 = this;

			this.modules = this.fileTypeConfig.baseModules.map(function (moduleFunction) {
				return moduleFunction();
			}).concat(this.modules);
			this.options = this.modules.reduce(function (options, module) {
				return module.optionsTransformer ? module.optionsTransformer(options, _this3) : options;
			}, this.options);
			this.xmlDocuments = this.options.xmlFileNames.reduce(function (xmlDocuments, fileName) {
				var content = _this3.zip.files[fileName].asText();
				xmlDocuments[fileName] = DocUtils.str2xml(content);
				return xmlDocuments;
			}, {});
			this.modules.forEach(function (module) {
				if (module.set) {
					module.set({ zip: _this3.zip, xmlDocuments: _this3.xmlDocuments });
				}
			});
			this.compile();

			// this.commentRanges=[];
			// Loop inside all templatedFiles (ie xml files with content).
			// Sometimes they don't exist (footer.xml for example)
			this.templatedFiles.forEach(function (fileName) {
				if (_this3.zip.files[fileName] != null) {
					_this3.renderFile(fileName);
				}
			});

			//at this point all data has been rendered, and if tags included, then the commentId
			//sections have been added.  here is a good place to add the comments files if necessary
			/*
     if(this.includeTags)
   {
   	//this.commentRanges has the comments by filename.  Do just the word doc first_name
   	var cRanges = this.commentRanges["word/document.xml"];
   	if(cRanges)
   	{
   		var cFile = Docxtemplater.FileTypeConfig["commentFile"];
   		var cContent = "";
   		var cStart = cFile.preamble;
   		//look for existing comments file..
   		if(this.zip.files.hasOwnProperty("word/comments.xml"))
   		{
   				//attempt to remove the old comments and comments extended
   				//replace with your own...
   				cStart = this.zip.files["word/comments.xml"].asText();
   				cStart = cStart.replace("</w:comments>","");
   				delete this.zip.files["word/comments.xml"];
   		}
   		else {
   			//need to add the relationship ID to the word doc...don't know how to
   		}
   		 cContent = cRanges.reduce(function(cContent, c){
   					  cContent+=cFile.startComment + c.commentText + cFile.endComment;
   						return cContent;
   		 },cStart);
   		 cContent+=cFile.suffix;
   		 this.zip.file(cFile.textPath, cContent);
   	}
   }
   */

			Object.keys(this.xmlDocuments).forEach(function (fileName) {
				_this3.zip.remove(fileName);
				var content = DocUtils.encodeUtf8(DocUtils.xml2str(_this3.xmlDocuments[fileName]));
				return _this3.zip.file(fileName, content, {});
			});
			return this;
		}
	}, {
		key: "setData",
		value: function setData(tags) {
			this.tags = tags;
			return this;
		}
	}, {
		key: "getZip",
		value: function getZip() {
			return this.zip;
		}
	}, {
		key: "createTemplateClass",
		value: function createTemplateClass(path) {
			var usedData = this.zip.files[path].asText();
			return this.createTemplateClassFromContent(usedData, path);
		}
	}, {
		key: "createTemplateClassFromContent",
		value: function createTemplateClassFromContent(content, filePath) {
			var _this4 = this;

			var xmltOptions = {
				tags: this.tags,
				includeTags: this.includeTags,
				filePath: filePath
			};
			Object.keys(DocUtils.defaults).forEach(function (key) {
				xmltOptions[key] = _this4[key];
			});
			xmltOptions.fileTypeConfig = this.fileTypeConfig;
			xmltOptions.modules = this.modules;
			return new Docxtemplater.XmlTemplater(content, xmltOptions);
		}
	}, {
		key: "getFullText",
		value: function getFullText(path) {
			return this.createTemplateClass(path || this.fileTypeConfig.textPath).getFullText();
		}
	}, {
		key: "getTemplatedFiles",
		value: function getTemplatedFiles() {
			this.compile();
			return this.templatedFiles;
		}
	}]);

	return Docxtemplater;
}();

Docxtemplater.DocUtils = require("./doc-utils");
Docxtemplater.Errors = require("./errors");
Docxtemplater.XmlTemplater = require("./xml-templater");
Docxtemplater.FileTypeConfig = require("./file-type-config");
Docxtemplater.XmlMatcher = require("./xml-matcher");
module.exports = Docxtemplater;
},{"./doc-utils":2,"./errors":4,"./file-type-config":5,"./xml-matcher":18,"./xml-templater":19}],4:[function(require,module,exports){
"use strict";

function XTError(message) {
	this.name = "GenericError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTError.prototype = Error.prototype;

function XTTemplateError(message) {
	this.name = "TemplateError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTTemplateError.prototype = new XTError();

function XTScopeParserError(message) {
	this.name = "ScopeParserError";
	this.message = message;
	this.stack = new Error(message).stack;
}
XTScopeParserError.prototype = new XTError();

function XTInternalError(message) {
	this.name = "InternalError";
	this.properties = { explanation: "InternalError" };
	this.message = message;
	this.stack = new Error(message).stack;
}
XTInternalError.prototype = new XTError();

module.exports = {
	XTError: XTError,
	XTTemplateError: XTTemplateError,
	XTInternalError: XTInternalError,
	XTScopeParserError: XTScopeParserError
};
},{}],5:[function(require,module,exports){
"use strict";

var loopModule = require("./modules/loop");
var spacePreserveModule = require("./modules/space-preserve");
var RawXmlModule = require("./modules/rawxml");
var expandPairTrait = require("./modules/expand-pair-trait");

var PptXFileTypeConfig = {
	getTemplatedFiles: function getTemplatedFiles(zip) {
		var slideTemplates = zip.file(/ppt\/(slides|slideMasters)\/(slide|slideMaster)\d+\.xml/).map(function (file) {
			return file.name;
		});
		return slideTemplates.concat(["ppt/presentation.xml"]);
	},

	textPath: "ppt/slides/slide1.xml",
	tagsXmlTextArray: ["a:t", "m:t"],
	tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:table", "a:p", "a:r"],
	tagRawXml: "p:sp",
	tagTextXml: "a:t",
	baseModules: [function () {
		return expandPairTrait;
	}, function () {
		return new RawXmlModule();
	}, function () {
		return loopModule;
	}]
};

var DocXFileTypeConfig = {
	getTemplatedFiles: function getTemplatedFiles(zip) {
		var slideTemplates = zip.file(/word\/(header|footer)\d+\.xml/).map(function (file) {
			return file.name;
		});
		//slideTemplates = slideTemplates.concat(zip.file(/word\/comments\.xml/).map(function (file) { return file.name; }));
		return slideTemplates.concat(["word/document.xml"]);
	},

	textPath: "word/document.xml",
	tagsXmlTextArray: ["w:t", "m:t"],
	tagsXmlLexedArray: ["w:tc", "w:tr", "w:table", "w:p", "w:r"],
	tagRawXml: "w:p",
	tagTextXml: "w:t",
	baseModules: [function () {
		return spacePreserveModule;
	}, function () {
		return expandPairTrait;
	}, function () {
		return new RawXmlModule();
	}, function () {
		return loopModule;
	}]
};
//, "w:comment"

var XlsXFileTypeConfig = {
	getTemplatedFiles: function getTemplatedFiles(zip) {
		var slideTemplates = zip.file(/xl\/worksheets\/sheet\d+\.xml/).map(function (file) {
			return file.name;
		});
		//slideTemplates = slideTemplates.concat(zip.file(/word\/comments\.xml/).map(function (file) { return file.name; }));
		return slideTemplates.concat(["xl/sharedStrings.xml"]);
		return slideTemplates;
	},

	textPath: "xl/sharedStrings.xml",
	tagsXmlTextArray: ["v", "t"],
	tagsXmlLexedArray: ["c", "si"],
	tagRawXml: "w:p",
	tagTextXml: "w:t",
	baseModules: [function () {
		return spacePreserveModule;
	}, function () {
		return expandPairTrait;
	}, function () {
		return new RawXmlModule();
	}, function () {
		return loopModule;
	}]
};

//'<w:p w14:paraId="20E7BB22" w14:textId="5584C8FD" w:rsidR="00BC20FF" w:rsidRDefault="00BC20FF">' +
var DocXCommentsFileConfig = {
	textPath: "word/comments.xml",
	preamble: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:comments xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas" xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex" xmlns:cx1="http://schemas.microsoft.com/office/drawing/2015/9/8/chartex" xmlns:cx2="http://schemas.microsoft.com/office/drawing/2015/10/21/chartex" xmlns:cx3="http://schemas.microsoft.com/office/drawing/2016/5/9/chartex" xmlns:cx4="http://schemas.microsoft.com/office/drawing/2016/5/10/chartex" xmlns:cx5="http://schemas.microsoft.com/office/drawing/2016/5/11/chartex" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:w10="urn:schemas-microsoft-com:office:word" xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml" xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml" xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex" xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup" xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk" xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml" xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape" mc:Ignorable="w14 w15 w16se wp14">',
	startComment: '<w:comment w:id="5" w:author="Author" w:initials="A">' + '<w:p w14:paraId="24BE470A" w14:textId="77777777" w:rsidR="00E33166" w:rsidRDefault="00E33166">' + '<w:pPr>' + '<w:pStyle w:val="CommentText"/>' + '</w:pPr>' + '<w:r>' + '<w:rPr>' + '<w:rStyle w:val="CommentReference"/>' + '</w:rPr>' + '<w:annotationRef/>' + '</w:r>' + '<w:r>' + '<w:t>',
	endComment: '</w:t>' + '</w:r>' + '</w:p>' + '</w:comment>',
	suffix: '</w:comments>'
};

module.exports = {
	docx: DocXFileTypeConfig,
	pptx: PptXFileTypeConfig,
	commentFile: DocXCommentsFileConfig,
	xlsx: XlsXFileTypeConfig
};
},{"./modules/expand-pair-trait":10,"./modules/loop":11,"./modules/rawxml":12,"./modules/space-preserve":13}],6:[function(require,module,exports){
"use strict";

//ijfXumUtils

function ijfQueryData(inAction, inContext, inDebug) {
	var tbd = "new";
	return false;
}
},{}],7:[function(require,module,exports){
"use strict";

var Errors = require("./errors");

function inRange(range, match) {
	return range[0] <= match.offset && match.offset < range[1];
}

function updateInTextTag(part, inTextTag) {
	if (part.type === "tag" && part.position === "start" && part.text) {
		if (inTextTag) {
			throw new Error("Malformed xml : Already in text tag");
		}
		return true;
	}
	if (part.type === "tag" && part.position === "end" && part.text) {
		if (!inTextTag) {
			throw new Error("Malformed xml : Already not in text tag");
		}
		return false;
	}
	return inTextTag;
}

function offsetSort(a, b) {
	return a.offset - b.offset;
}

function getTag(tag) {
	var start = 1;
	if (tag[1] === "/") {
		start = 2;
	}
	var index = tag.indexOf(" ");
	var end = index === -1 ? tag.length - 1 : index;
	return {
		tag: tag.slice(start, end),
		position: start === 1 ? "start" : "end"
	};
}

function tagMatcher(content, textMatchArray, othersMatchArray) {
	var cursor = 0;
	var contentLength = content.length;
	var allMatches = textMatchArray.map(function (tag) {
		return { tag: tag, text: true };
	}).concat(othersMatchArray.map(function (tag) {
		return { tag: tag, text: false };
	})).reduce(function (allMatches, t) {
		allMatches[t.tag] = t.text;
		return allMatches;
	}, {});
	var totalMatches = [];

	while (cursor < contentLength) {
		cursor = content.indexOf("<", cursor);
		if (cursor === -1) {
			break;
		}
		var offset = cursor;
		cursor = content.indexOf(">", cursor);
		var tagText = content.slice(offset, cursor + 1);

		var _getTag = getTag(tagText),
		    tag = _getTag.tag,
		    position = _getTag.position;

		var text = allMatches[tag];
		if (text == null) {
			continue;
		}
		totalMatches.push({ type: "tag", position: position, text: text, offset: offset, value: tagText });
	}

	return totalMatches;
}

function throwUnopenedTagException(options) {
	var err = new Errors.XTTemplateError("Unopened tag");
	err.properties = {
		xtag: options.xtag.split(" ")[0],
		id: "unopened_tag",
		context: options.xtag,
		explanation: "The tag beginning with '" + options.xtag.substr(0, 10) + "' is unclosed"
	};
	throw err;
}

function throwUnclosedTagException(options) {
	var err = new Errors.XTTemplateError("Unclosed tag");
	err.properties = {
		xtag: options.xtag.split(" ")[0].substr(1),
		id: "unclosed_tag",
		context: options.xtag,
		explanation: "The tag beginning with '" + options.xtag.substr(0, 10) + "' is unclosed"
	};
	throw err;
}

function assertDelimiterOrdered(delimiterMatches, fullText) {
	var inDelimiter = false;
	var lastDelimiterMatch = { offset: 0 };
	var xtag = void 0;
	delimiterMatches.forEach(function (delimiterMatch) {
		xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
		if (delimiterMatch.position === "start" && inDelimiter || delimiterMatch.position === "end" && !inDelimiter) {
			if (delimiterMatch.position === "start") {
				throwUnclosedTagException({ xtag: xtag });
			} else {
				throwUnopenedTagException({ xtag: xtag });
			}
		}
		inDelimiter = !inDelimiter;
		lastDelimiterMatch = delimiterMatch;
	});
	var delimiterMatch = { offset: fullText.length };
	xtag = fullText.substr(lastDelimiterMatch.offset, delimiterMatch.offset - lastDelimiterMatch.offset);
	if (inDelimiter) {
		throwUnclosedTagException({ xtag: xtag });
	}
}

function getAllIndexes(arr, val, position) {
	var indexes = [];
	var offset = -1;
	do {
		offset = arr.indexOf(val, offset + 1);
		if (offset !== -1) {
			indexes.push({ offset: offset, position: position });
		}
	} while (offset !== -1);
	return indexes;
}

function Reader(innerContentParts) {
	var _this = this;

	this.innerContentParts = innerContentParts;
	this.full = "";
	this.parseDelimiters = function (delimiters) {
		_this.full = _this.innerContentParts.join("");
		var offset = 0;
		_this.ranges = _this.innerContentParts.map(function (part) {
			offset += part.length;
			return offset - part.length;
		});

		var delimiterMatches = getAllIndexes(_this.full, delimiters.start, "start").concat(getAllIndexes(_this.full, delimiters.end, "end")).sort(offsetSort);
		assertDelimiterOrdered(delimiterMatches, _this.full);
		var delimiterLength = { start: delimiters.start.length, end: delimiters.end.length };
		var cutNext = 0;
		var delimiterIndex = 0;

		_this.parsed = _this.ranges.map(function (offset, i) {
			var range = [offset, offset + this.innerContentParts[i].length];
			var partContent = this.innerContentParts[i];
			var delimitersInOffset = [];
			while (delimiterIndex < delimiterMatches.length && inRange(range, delimiterMatches[delimiterIndex])) {
				delimitersInOffset.push(delimiterMatches[delimiterIndex]);
				delimiterIndex++;
			}
			var parts = [];
			var cursor = 0;
			if (cutNext > 0) {
				cursor = cutNext;
				cutNext = 0;
			}
			delimitersInOffset.forEach(function (delimiterInOffset) {
				var value = partContent.substr(cursor, delimiterInOffset.offset - offset - cursor);
				if (value.length > 0) {
					parts.push({ type: "content", value: value });
				}
				parts.push({ type: "delimiter", position: delimiterInOffset.position });
				cursor = delimiterInOffset.offset - offset + delimiterLength[delimiterInOffset.position];
			});
			cutNext = cursor - partContent.length;
			var value = partContent.substr(cursor);
			if (value.length > 0) {
				parts.push({ type: "content", value: value });
			}
			return parts;
		}, _this);
	};
}

module.exports = {
	parse: function parse(xmlparsed, delimiters) {
		var inTextTag = false;
		var innerContentParts = [];
		xmlparsed.forEach(function (part) {
			inTextTag = updateInTextTag(part, inTextTag);
			if (inTextTag && part.type === "content") {
				innerContentParts.push(part.value);
			}
		});
		var reader = new Reader(innerContentParts);
		reader.parseDelimiters(delimiters);

		var newArray = [];
		var index = 0;
		xmlparsed.forEach(function (part) {
			inTextTag = updateInTextTag(part, inTextTag);
			if (part.type === "content") {
				part.position = inTextTag ? "insidetag" : "outsidetag";
			}
			if (inTextTag && part.type === "content") {
				Array.prototype.push.apply(newArray, reader.parsed[index].map(function (p) {
					if (p.type === "content") {
						p.position = "insidetag";
					}
					return p;
				}));
				index++;
			} else {
				newArray.push(part);
			}
		});
		return newArray;
	},
	xmlparse: function xmlparse(content, xmltags) {
		var matches = tagMatcher(content, xmltags.text, xmltags.other);
		var cursor = 0;
		var parsed = matches.reduce(function (parsed, match) {
			var value = content.substr(cursor, match.offset - cursor);
			if (value.length > 0) {
				parsed.push({ type: "content", value: value });
			}
			cursor = match.offset + match.value.length;
			delete match.offset;
			if (match.value.length > 0) {
				parsed.push(match);
			}
			return parsed;
		}, []);
		var value = content.substr(cursor);
		if (value.length > 0) {
			parsed.push({ type: "content", value: value });
		}
		return parsed;
	}
};
},{"./errors":4}],8:[function(require,module,exports){
"use strict";

function memoize(func) {
	var stringifyJson = JSON.stringify,
	    cache = {};
	function cachedfun() {
		var hash = stringifyJson(arguments);
		return hash in cache ? cache[hash] : cache[hash] = func.apply(this, arguments);
	}
	return cachedfun;
}

module.exports = memoize;
},{}],9:[function(require,module,exports){
"use strict";

function getMinFromArrays(arrays, state) {
	var minIndex = -1;
	for (var i = 0, l = arrays.length; i < l; i++) {
		if (state[i] >= arrays[i].length) {
			continue;
		}
		if (minIndex === -1 || arrays[i][state[i]].offset < arrays[minIndex][state[minIndex]].offset) {
			minIndex = i;
		}
	}
	if (minIndex === -1) {
		throw new Error("minIndex negative");
	}
	return minIndex;
}

module.exports = function (arrays) {
	var totalLength = arrays.reduce(function (sum, array) {
		return sum + array.length;
	}, 0);
	arrays = arrays.filter(function (array) {
		return array.length > 0;
	});

	var resultArray = new Array(totalLength);

	var state = arrays.map(function () {
		return 0;
	});

	var i = 0;

	while (i <= totalLength - 1) {
		var arrayIndex = getMinFromArrays(arrays, state);
		resultArray[i] = arrays[arrayIndex][state[arrayIndex]];
		state[arrayIndex]++;
		i++;
	}

	return resultArray;
};
},{}],10:[function(require,module,exports){
"use strict";

var traitName = "expandPair";
var mergeSort = require("../mergesort");
var DocUtils = require("../doc-utils");

var _require = require("../traits"),
    getExpandToDefault = _require.getExpandToDefault;

var Errors = require("../errors");

function throwUnmatchedLoopException(options) {
	var location = options.location;
	var t = location === "start" ? "unclosed" : "unopened";
	var T = location === "start" ? "Unclosed" : "Unopened";

	var err = new Errors.XTTemplateError(T + " loop");
	var tag = options.part.value;
	err.properties = {
		id: t + "_loop",
		explanation: "The loop with tag " + tag + " is " + t,
		xtag: tag
	};
	throw err;
}

function throwClosingTagNotMatchOpeningTag(options) {
	var tags = options.tags;

	var err = new Errors.XTTemplateError("Closing tag does not match opening tag");
	err.properties = {
		id: "closing_tag_does_not_match_opening_tag",
		explanation: "The tag \"" + tags[0].value + "\" is closed by the tag \"" + tags[1].value + "\"",
		openingtag: tags[0].value,
		closingtag: tags[1].value
	};
	throw err;
}

function getOpenCountChange(part) {
	switch (part.location) {
		case "start":
			return 1;
		case "end":
			return -1;
		default:
			throw new Error("Location should be one of 'start' or 'end' (given : " + part.location + ")");

	}
}

function getPairs(traits) {
	if (traits.length === 0) {
		return [];
	}
	var firstTrait = traits[0];
	if (traits.length === 1) {
		var part = firstTrait.part;
		throwUnmatchedLoopException({ part: part, location: firstTrait.part.location });
	}
	var countOpen = 1;
	for (var i = 1; i < traits.length; i++) {
		var currentTrait = traits[i];
		countOpen += getOpenCountChange(currentTrait.part);
		if (countOpen === 0) {
			if (currentTrait.part.value !== firstTrait.part.value && currentTrait.part.value !== "") {
				throwClosingTagNotMatchOpeningTag({ tags: [firstTrait.part, currentTrait.part] });
			}
			var outer = getPairs(traits.slice(i + 1));
			return [[firstTrait, currentTrait]].concat(outer);
		}
	}
}

var expandPairTrait = {
	postparse: function postparse(parsed, _ref) {
		var getTraits = _ref.getTraits,
		    _postparse = _ref.postparse;

		var traits = getTraits(traitName, parsed);
		traits = traits.map(function (trait) {
			return trait || [];
		});
		traits = mergeSort(traits);
		var pairs = getPairs(traits);
		var expandedPairs = pairs.map(function (pair) {
			var expandTo = pair[0].part.expandTo;
			if (expandTo === "auto") {
				expandTo = getExpandToDefault(parsed.slice(pair[0].offset, pair[1].offset));
			}
			if (!expandTo) {
				return [pair[0].offset, pair[1].offset];
			}
			var left = DocUtils.getLeft(parsed, expandTo, pair[0].offset);
			var right = DocUtils.getRight(parsed, expandTo, pair[1].offset);
			return [left, right];
		});

		var currentPairIndex = 0;
		var innerParts = void 0;
		return parsed.reduce(function (newParsed, part, i) {
			var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i;
			var pair = pairs[currentPairIndex];
			var expandedPair = expandedPairs[currentPairIndex];
			if (!inPair) {
				newParsed.push(part);
				return newParsed;
			}
			if (expandedPair[0] === i) {
				innerParts = [];
			}
			if (pair[0].offset !== i && pair[1].offset !== i) {
				innerParts.push(part);
			}
			if (expandedPair[1] === i) {
				var basePart = parsed[pair[0].offset];
				delete basePart.location;
				delete basePart.expandTo;
				basePart.subparsed = _postparse(innerParts);
				newParsed.push(basePart);
				currentPairIndex++;
				return newParsed;
			}
			return newParsed;
		}, []);
	}
};

module.exports = expandPairTrait;
},{"../doc-utils":2,"../errors":4,"../mergesort":9,"../traits":17}],11:[function(require,module,exports){
"use strict";

var DocUtils = require("../doc-utils");
var dashInnerRegex = /^-([^\s]+)\s(.+)$/;

var moduleName = "loop";

var loopModule = {
	parse: function parse(placeHolderContent) {
		var module = moduleName;
		var type = "placeholder";
		if (placeHolderContent[0] === "#") {
			return { type: type, value: placeHolderContent.substr(1), expandTo: "auto", module: module, location: "start", inverted: false };
		}
		if (placeHolderContent[0] === "^") {
			return { type: type, value: placeHolderContent.substr(1), expandTo: "auto", module: module, location: "start", inverted: true };
		}
		if (placeHolderContent[0] === "/") {
			return { type: type, value: placeHolderContent.substr(1), module: module, location: "end" };
		}
		if (placeHolderContent[0] === "-") {
			var value = placeHolderContent.replace(dashInnerRegex, "$2");
			var expandTo = placeHolderContent.replace(dashInnerRegex, "$1");
			return { type: type, value: value, expandTo: expandTo, module: module, location: "start", inverted: false };
		}
		return null;
	},
	getTraits: function getTraits(traitName, parsed) {
		if (traitName !== "expandPair") {
			return;
		}

		return parsed.reduce(function (tags, part, offset) {
			if (part.type === "placeholder" && part.module === moduleName) {
				tags.push({ part: part, offset: offset });
			}
			return tags;
		}, []);
	},
	render: function render(part, options) {
		if (!part.type === "placeholder" || part.module !== moduleName) {
			return null;
		}
		var totalValue = [];
		function loopOver(scope) {
			var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value);
			var tVal = DocUtils.mergeObjects({}, options, {
				compiled: part.subparsed,
				tags: {},
				scopeManager: scopeManager
			});
			var tVal2 = options.render(tVal);
			totalValue.push(tVal2);
		}
		options.scopeManager.loopOver(part.value, loopOver, part.inverted);
		var tVal3 = totalValue.join("");
		return { value: tVal3 };
	}
};

module.exports = loopModule;
},{"../doc-utils":2}],12:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocUtils = require("../doc-utils");
var Errors = require("../errors");

var moduleName = "rawxml";

function throwRawTagShouldBeOnlyTextInParagraph(options) {
	var err = new Errors.XTTemplateError("Raw tag should be the only text in paragraph");
	var tag = options.part.value;
	err.properties = {
		id: "raw_xml_tag_should_be_only_text_in_paragraph",
		explanation: "The tag " + tag,
		xtag: options.part.value,
		paragraphParts: options.paragraphParts
	};
	throw err;
}

function getInner(_ref) {
	var part = _ref.part,
	    left = _ref.left,
	    right = _ref.right,
	    postparsed = _ref.postparsed,
	    index = _ref.index;

	var paragraphParts = postparsed.slice(left + 1, right);
	paragraphParts.forEach(function (p, i) {
		if (i === index - left - 1) {
			return;
		}
		if (p.type === "placeholder" || p.type === "content" && p.position === "insidetag") {
			throwRawTagShouldBeOnlyTextInParagraph({ paragraphParts: paragraphParts, part: part });
		}
	});
	return part;
}

var rawXmlModule = function () {
	function rawXmlModule() {
		_classCallCheck(this, rawXmlModule);
	}

	_createClass(rawXmlModule, [{
		key: "optionsTransformer",
		value: function optionsTransformer(options, docxtemplater) {
			this.fileTypeConfig = docxtemplater.fileTypeConfig;
			return options;
		}
	}, {
		key: "parse",
		value: function parse(placeHolderContent) {
			var type = "placeholder";
			if (placeHolderContent[0] !== "@") {
				return null;
			}
			return { type: type, value: placeHolderContent.substr(1), module: moduleName };
		}
	}, {
		key: "postparse",
		value: function postparse(parsed) {
			return DocUtils.traits.expandToOne(parsed, { moduleName: moduleName, getInner: getInner, expandTo: this.fileTypeConfig.tagRawXml });
		}
	}, {
		key: "render",
		value: function render(part, options) {
			if (part.module !== moduleName) {
				return null;
			}
			var value = options.scopeManager.getValue(part.value);
			if (value == null) {
				value = options.nullGetter(part);
			}
			return { value: value };
		}
	}]);

	return rawXmlModule;
}();

module.exports = rawXmlModule;
},{"../doc-utils":2,"../errors":4}],13:[function(require,module,exports){
"use strict";

var spacePreserve = {
	postparse: function postparse(parsed) {
		var chunk = [];
		var inChunk = false;

		var tVal = parsed.reduce(function (parsed, part) {
			if (part.type === "tag" && part.position === "start" && part.text && part.value === "<w:t>") {
				inChunk = true;
			}
			if (inChunk) {
				if (part.type === "placeholder" && !part.module) {
					chunk[0].value = '<w:t xml:space="preserve">';
				}
				chunk.push(part);
			} else {
				parsed.push(part);
			}
			if (part.type === "tag" && part.position === "end" && part.text && part.value === "</w:t>") {
				Array.prototype.push.apply(parsed, chunk);
				inChunk = false;
				chunk = [];
			}
			return parsed;
		}, []);
		var tVal2 = tVal.concat(chunk);

		return tVal2;
	}
};
module.exports = spacePreserve;
},{}],14:[function(require,module,exports){
"use strict";

var DocUtils = require("./doc-utils");

var parser = {
	postparse: function postparse(parsed, modules) {
		function getTraits(traitName, parsed) {
			return modules.map(function (module) {
				if (module.getTraits) {
					var retT = module.getTraits(traitName, parsed);
					return retT;
				} else {
					return null;
				}
				//return module.getTraits ? module.getTraits(traitName, parsed) : null;
			});
		}
		function postparse(parsed) {

			return modules.reduce(function (parsed, module) {
				if (module.postparse) {
					var tRet2 = module.postparse(parsed, { postparse: postparse, getTraits: getTraits });
					return tRet2;
				} else {
					return parsed;
				}
				//return module.postparse ? module.postparse(parsed, {postparse, getTraits}) : parsed;
			}, parsed);
		}
		return postparse(parsed);
	},
	parse: function parse(lexed, modules) {
		function moduleParse(placeHolderContent, parsed) {
			var moduleParsed = void 0;
			for (var i = 0, l = modules.length; i < l; i++) {
				var _module = modules[i];
				if (!_module.parse) {
					continue;
				}
				moduleParsed = _module.parse(placeHolderContent);
				if (moduleParsed) {
					parsed.push(moduleParsed);
					return moduleParsed;
				}
			}
			return null;
		}

		var inPlaceHolder = false;
		var placeHolderContent = void 0;
		var tailParts = [];
		return lexed.reduce(function (parsed, token) {
			if (token.type === "delimiter") {
				inPlaceHolder = token.position === "start";
				if (token.position === "end") {
					placeHolderContent = DocUtils.wordToUtf8(placeHolderContent);
					if (!moduleParse(placeHolderContent, parsed)) {
						parsed.push({ type: "placeholder", value: placeHolderContent });
					}
					Array.prototype.push.apply(parsed, tailParts);
					tailParts = [];
					return parsed;
				}
				placeHolderContent = "";
				return parsed;
			}
			if (inPlaceHolder) {
				if (token.type === "content" && token.position === "insidetag") {
					placeHolderContent += token.value;
				} else {
					tailParts.push(token);
				}
				return parsed;
			}
			parsed.push(token);
			return parsed;
		}, []);
	}
};

module.exports = parser;
},{"./doc-utils":2}],15:[function(require,module,exports){
"use strict";

var ScopeManager = require("./scope-manager");
var DocUtils = require("./doc-utils");
var ijfXumUtils = require("./ijfXumUtils");

function moduleRender(part, options) {
	var moduleRendered = void 0;
	for (var i = 0, l = options.modules.length; i < l; i++) {
		var _module = options.modules[i];
		if (!_module.render) {
			continue;
		}
		moduleRendered = _module.render(part, options);
		if (moduleRendered) {
			return moduleRendered;
		}
	}
	return false;
}

function render(options) {

	//*****************local IJF Functions
	function ijfQueryData(inAction, options, inDebug) {
		if (inDebug) {
			inContext["debug"] = [{ "name": "Tom" }, { "name": "Dick" }, { "name": "Harry" }];
			return;
		}
		//parse inAction
		//{action:query, jql:"project=DJP", fields:"summary,duedate", path:"issues", snippet:""}
		var tStr = "{" + inAction + "}";
		var action = JSON.parse(tStr);

		var jql = action.jql;
		if (action.maxResults) jql = jql + "&maxResults=" + action.maxResults;

		var varBindings = jql.split("$").reduce(function (inKeys, p) {
			//must walk forward and end on ", ) or space
			var i = 0;
			while (i < p.length) {
				if (p[i] == "\"" || p[i] == " " || p[i] == ")" || p[i] == "'") break;
				i++;
			}
			var key = p.substring(0, i);
			inKeys.push(key);
			return inKeys;
		}, []);
		varBindings = varBindings.slice(1);
		varBindings.forEach(function (b) {
			var newVal = options.scopeManager.getValue(b);
			if (newVal) jql = jql.replace("$" + b, newVal);
		});

		var flds = action.fields;
		//need to translate fields to custom fields....
		if (!ijf.jiraFields) {
			ijf.jiraFields = ijfUtils.getJiraFieldsSync();
			ijf.jiraFieldsKeyed = [];
			ijf.jiraFields.forEach(function (f) {
				ijf.jiraFieldsKeyed[f.name] = f;
			});
		}
		var translateFields = ijfUtils.translateJiraFieldsToIds(flds);

		var suffix = "";
		if (flds) suffix = "&fields=" + translateFields;

		var aUrl = '/rest/api/2/search?jql=' + jql + suffix;
		var rawList = ijfUtils.jiraApiSync('GET', aUrl, null);
		var newVals = [];
		rawList.issues.forEach(function (i) {
			var itemData = {};

			if (i.fields) {
				var fieldMap = ijfUtils.translateJiraFieldsToObjs(flds);
				fieldMap.forEach(function (f) {
					if (ijf.jiraFieldsKeyed.hasOwnProperty(f.name)) {
						var v = ijfUtils.handleJiraFieldType(ijf.jiraFieldsKeyed[f.name], i.fields[f.id], true, true);
						itemData[action.path + "." + f.name] = v;
					} else {
						itemData[action.path + "." + f.id] = i.fields[f.id];
					}
				});
			}
			itemData[action.path + "." + "key"] = i.key;
			itemData[action.path + "." + "id"] = i.id;
			itemData[action.path + "." + "self"] = i.self;
			newVals.push(itemData);
		});
		if (action.snippet) {
			if (ijf.snippets.hasOwnProperty(action.snippet)) newVals = ijf.snippets[action.snippet](newVals);
		}
		options.scopeManager.scopeList[options.scopeManager.scopeList.length - 1][action.path] = newVals;
	}

	function ijfLog(inMessage) {
		if (ijfUtils) {
			ijfUtils.footLog(inMessage);
		} else {
			console.info(inMessage);
		}
	}

	//*******************end local IJF Functions

	options.render = render;
	options.modules = options.modules;
	if (!options.scopeManager) {
		options.scopeManager = ScopeManager.createBaseScopeManager(options);
	}
	var compArr = [];
	options.compiled.forEach(function (part) {
		var moduleRendered = moduleRender(part, options);
		var value = null;
		if (moduleRendered) {
			//return moduleRendered.value;
			compArr.push(moduleRendered.value);
			return;
		}
		if (part.type === "placeholder") {
			value = options.scopeManager.getValue(part.value);
			if (value == null) {
				value = options.nullGetter(part);
			}

			//special handling for altering data model and extending data dynamically
			//syntax:
			//{action:query, jql:"", fields:"", path:"pathtojsonlocationtosave", snippet:"snippet that alters data optionally"}
			//console.info("About to process: " + part.value);
			var cleanWordChars = ijfUtils.replaceWordChars(part.value);
			if (cleanWordChars.indexOf("\"action\":") > -1) {
				//console.info("Processing action: " + part.value); //query is only real one now...
				try {
					ijfQueryData(cleanWordChars, options);
				} catch (e) {
					//failed to update data
					ijfLog("Failed inline word action: " + JSON.stringify(e));
					//return "Failed inline word action: " + JSON.stringify(e);
					compArr.push("Failed inline word action: " + JSON.stringify(e));
					return;
				}
				return;
			} else {
				//special hanlding to manimpualte word XML
				if (cleanWordChars.indexOf("\"key\":") > -1) {
					try {
						var tStr = "{" + cleanWordChars + "}";
						var action = JSON.parse(tStr);
						value = options.scopeManager.getValue(action.key);
						if (value == null) {
							value = options.nullGetter(part);
						}
						//need to manipulate the base word document.  syntax is:
						//{"key":"val","tagName":"w:shd","attribute":"w:fill","value":"hexVal"}
						/*
      for(var i=compArr.length-1;i>-1;i--)
      {
      	//walk backards in compArray, look for value...
      	if(compArr[i].indexOf(action.tagName) > -1)
      	{
      		//look for attribute, and update it's value
      		var splitTagArr = compArr[i].split(action.tagName);
      		var splitAttArr = splitTagArr[splitTagArr.length-1].split(action.attribute);
      		if(splitAttArr.length>1)
      		{
      			//there is an attribute to deal with. it starts on second element.  split on " and replace values
      			var attValueArr = splitAttArr[1].split("\"");
      			attValueArr[1]=action.value;
      			splitAttArr[1] =  attValueArr.join("\"");
      			splitTagArr[splitTagArr.length-1] = splitAttArr.join(action.attribute);
      			compArr[i] = splitTagArr.join(action.tagName);
      		}
      		break;
      	}
      }
      */
						//New approach...call snippet get array of tags to handle....
						//�key�:�Waiver�,�snippet�:�getMyNewValue�}
						//Expected return must be:	[{�tagName�:�w:shd�,�attribute�:�w:fill�,�value�:�#FFF�}]
						if (ijf.snippets.hasOwnProperty(action.snippet)) {
							var tagArray = ijf.snippets[action.snippet](value);
							tagArray.forEach(function (t) {
								for (var i = compArr.length - 1; i > -1; i--) {
									//walk backards in compArray, look for value...
									if (compArr[i].indexOf(t.tagName) > -1) {
										//look for attribute, and update it's value
										var splitTagArr = compArr[i].split(t.tagName);
										var splitAttArr = splitTagArr[splitTagArr.length - 1].split(t.attribute);
										if (splitAttArr.length > 1) {
											//there is an attribute to deal with. it starts on second element.  split on " and replace values
											var attValueArr = splitAttArr[1].split("\"");
											attValueArr[1] = t.value;
											splitAttArr[1] = attValueArr.join("\"");
											splitTagArr[splitTagArr.length - 1] = splitAttArr.join(t.attribute);
											compArr[i] = splitTagArr.join(t.tagName);
										}
										break;
									}
								}
							});
						}
					} catch (e) {
						ijfLog("Failed to update word xml: " + JSON.stringify(e));
						return;
					}
				}

				if (value == "undefined") {
					if (options.includeTags) {
						compArr.push("NOVALUE-" + part.value + "-FORTAG");
					}
					return;
				}

				if (typeof value == "string") {
					var cleanWordChars = ijfUtils.replaceWordChars(value);
					//please change
					compArr.push(cleanWordChars.replace(/\n/g, "<w:br/>"));
					return;
				}
				//return value;
				compArr.push(value);
				return;
			}
		}
		if (part.type === "content" || part.type === "tag") {
			compArr.push(part.value);
			return; // part.value;
		}
		throw new Error("Unimplemented tag type \"" + part.type + "\"");
	});
	var retVal = compArr.join("");
	return retVal;
}

module.exports = render;
},{"./doc-utils":2,"./ijfXumUtils":6,"./scope-manager":16}],16:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Errors = require("./errors");

// This class responsibility is to manage the scope
var ScopeManager = function () {
	function ScopeManager(options) {
		_classCallCheck(this, ScopeManager);

		this.scopePath = options.scopePath;
		this.scopeList = options.scopeList;
		this.parser = options.parser;
	}

	_createClass(ScopeManager, [{
		key: "loopOver",
		value: function loopOver(tag, callback, inverted) {
			inverted = inverted || false;
			return this.loopOverValue(this.getValue(tag), callback, inverted);
		}
	}, {
		key: "functorIfInverted",
		value: function functorIfInverted(inverted, functor, value) {
			if (inverted) {
				functor(value);
			}
		}
	}, {
		key: "isValueFalsy",
		value: function isValueFalsy(value, type) {
			return value == null || !value || type === "[object Array]" && value.length === 0;
		}
	}, {
		key: "loopOverValue",
		value: function loopOverValue(value, functor, inverted) {
			var type = Object.prototype.toString.call(value);
			var currentValue = this.scopeList[this.num];
			if (this.isValueFalsy(value, type)) {
				return this.functorIfInverted(inverted, functor, currentValue);
			}
			if (type === "[object Array]") {
				for (var i = 0, scope; i < value.length; i++) {
					scope = value[i];
					this.functorIfInverted(!inverted, functor, scope);
				}
				return;
			}
			if (type === "[object Object]") {
				return this.functorIfInverted(!inverted, functor, value);
			}
			if (value === true) {
				return this.functorIfInverted(!inverted, functor, currentValue);
			}
		}
	}, {
		key: "getValue",
		value: function getValue(tag, num) {
			// search in the scopes (in reverse order) and keep the first defined value
			this.num = num == null ? this.scopeList.length - 1 : num;
			var err = void 0;
			var parser = void 0;
			var result = void 0;
			var scope = this.scopeList[this.num];
			try {
				parser = this.parser(tag);
			} catch (error) {
				err = new Errors.XTScopeParserError("Scope parser compilation failed");
				err.properties = {
					id: "scopeparser_compilation_failed",
					tag: tag,
					explanation: "The scope parser for the tag " + tag + " failed to compile",
					rootError: error
				};
				throw err;
			}
			try {
				result = parser.get(scope, { num: this.num, scopeList: this.scopeList });
			} catch (error) {
				err = new Errors.XTScopeParserError("Scope parser execution failed");
				err.properties = {
					id: "scopeparser_execution_failed",
					explanation: "The scope parser for the tag " + tag + " failed to execute",
					scope: scope,
					tag: tag,
					rootError: error
				};
				throw err;
			}
			if (result == null && this.num > 0) {
				return this.getValue(tag, this.num - 1);
			}
			return result;
		}
	}, {
		key: "createSubScopeManager",
		value: function createSubScopeManager(scope, tag) {
			var options = {
				scopePath: this.scopePath.slice(0),
				scopeList: this.scopeList.slice(0)
			};

			options.parser = this.parser;
			options.scopeList = this.scopeList.concat(scope);
			options.scopePath = this.scopePath.concat(tag);
			return new ScopeManager(options);
		}
	}]);

	return ScopeManager;
}();

ScopeManager.createBaseScopeManager = function (_ref) {
	var parser = _ref.parser,
	    tags = _ref.tags;

	var options = { parser: parser, tags: tags };
	options.scopePath = [];
	options.scopeList = [tags];
	return new ScopeManager(options);
};

module.exports = ScopeManager;
},{"./errors":4}],17:[function(require,module,exports){
"use strict";

var DocUtils = require("./doc-utils");
var Errors = require("./errors");

function throwRawTagNotInParagraph(options) {
	var err = new Errors.XTTemplateError("Raw tag not in paragraph");
	var tag = options.part.value;
	err.properties = {
		id: "raw_tag_outerxml_invalid",
		explanation: "The tag \"" + tag + "\"",
		rootError: options.rootError,
		xtag: tag
	};
	throw err;
}

function lastTagIsOpenTag(array, tag) {
	if (array.length === 0) {
		return false;
	}
	var lastTag = array[array.length - 1];
	var innerLastTag = lastTag.tag.substr(1);
	var innerCurrentTag = tag.substr(2, tag.length - 3);
	return innerLastTag.indexOf(innerCurrentTag) === 0;
}

function addTag(array, tag) {
	return array.concat({ tag: tag });
}

function getListXmlElements(parts) {
	/*
 get the different closing and opening tags between two texts (doesn't take into account tags that are opened then closed (those that are closed then opened are returned)):
 returns:[{"tag":"</w:r>","offset":13},{"tag":"</w:p>","offset":265},{"tag":"</w:tc>","offset":271},{"tag":"<w:tc>","offset":828},{"tag":"<w:p>","offset":883},{"tag":"<w:r>","offset":1483}]
 */
	var tags = parts.filter(function (part) {
		return part.type === "tag";
	}).map(function (part) {
		return part.value;
	});

	var result = [];

	for (var i = 0, tag; i < tags.length; i++) {
		tag = tags[i];
		// closing tag
		if (tag[1] === "/") {
			if (lastTagIsOpenTag(result, tag)) {
				result.pop();
			} else {
				result = addTag(result, tag);
			}
		} else if (tag[tag.length - 1] !== "/") {
			result = addTag(result, tag);
		}
	}
	return result;
}

function getExpandToDefault(parts) {
	var xmlElements = getListXmlElements(parts);
	for (var i = 0; i < xmlElements.length; i++) {
		var xmlElement = xmlElements[i];
		if (xmlElement.tag.indexOf("<w:tc") === 0) {
			return "w:tr";
		}
	}
	return false;
}

function expandOne(part, postparsed, options) {
	var expandTo = part.expandTo || options.expandTo;
	var index = postparsed.indexOf(part);
	if (!expandTo) {
		return postparsed;
	}
	var right = void 0,
	    left = void 0;
	try {
		right = DocUtils.getRight(postparsed, expandTo, index);
		left = DocUtils.getLeft(postparsed, expandTo, index);
	} catch (rootError) {
		throwRawTagNotInParagraph({ part: part, rootError: rootError });
	}
	var leftParts = postparsed.slice(left, index);
	var rightParts = postparsed.slice(index + 1, right + 1);
	var inner = options.getInner({ index: index, part: part, leftParts: leftParts, rightParts: rightParts, left: left, right: right, postparsed: postparsed });
	var type = Object.prototype.toString.call(inner);
	if (type === "[object Array]") {
		inner = DocUtils.concatArrays(inner);
	}
	return DocUtils.concatArrays([postparsed.slice(0, left), inner, postparsed.slice(right + 1)]);
}

function expandToOne(postparsed, options) {
	var expandToElements = postparsed.reduce(function (elements, part) {
		if (part.type === "placeholder" && part.module === options.moduleName) {
			elements.push(part);
		}
		return elements;
	}, []);

	expandToElements.forEach(function (part) {
		postparsed = expandOne(part, postparsed, options);
	});
	return postparsed;
}

module.exports = {
	expandToOne: expandToOne,
	getExpandToDefault: getExpandToDefault
};
},{"./doc-utils":2,"./errors":4}],18:[function(require,module,exports){
"use strict";
// res class responsibility is to parse the XML.

var DocUtils = require("./doc-utils");
var memoize = require("./memoize");

function handleRecursiveCase(res) {
	/*
 	 Because xmlTemplater is recursive (meaning it can call it self), we need to handle special cases where the XML is not valid:
 	 For example with res string "I am</w:t></w:r></w:p><w:p><w:r><w:t>sleeping",
 	 - we need to match also the string that is inside an implicit <w:t> (that's the role of replacerUnshift) (in res case 'I am')
 	 - we need to match the string that is at the right of a <w:t> (that's the role of replacerPush) (in res case 'sleeping')
 	 the test: describe "scope calculation" it "should compute the scope between 2 <w:t>" makes sure that res part of code works
 	 It should even work if they is no XML at all, for example if the code is just "I am sleeping", in res case however, they should only be one match
 	 */

	function replacerUnshift() {
		var pn = { array: Array.prototype.slice.call(arguments) };
		pn.array.shift();
		var match = pn.array[0] + pn.array[1];
		// add match so that pn[0] = whole match, pn[1]= first parenthesis,...
		pn.array.unshift(match);
		pn.array.pop();
		var offset = pn.array.pop();
		pn.offset = offset;
		pn.first = true;
		// add at the beginning
		res.matches.unshift(pn);
		res.charactersAdded.unshift(0);
		return res.charactersAddedCumulative.unshift(0);
	}

	if (res.content.indexOf("<") === -1 && res.content.indexOf(">") === -1) {
		res.content.replace(/^()([^<>]*)$/, replacerUnshift);
	}

	var r = new RegExp("^()([^<]+)</(?:" + res.tagsXmlArrayJoined + ")>");
	res.content.replace(r, replacerUnshift);

	function replacerPush() {
		var pn = { array: Array.prototype.slice.call(arguments) };
		pn.array.pop();
		var offset = pn.array.pop();
		pn.offset = offset;
		pn.last = true;
		// add at the end
		res.matches.push(pn);
		res.charactersAdded.push(0);
		return res.charactersAddedCumulative.push(0);
	}

	r = new RegExp("(<(?:" + res.tagsXmlArrayJoined + ")[^>]*>)([^>]+)$");
	res.content.replace(r, replacerPush);
	return res;
}

function xmlMatcher(content, tagsXmlArray) {
	var res = {};
	res.content = content;
	res.tagsXmlArray = tagsXmlArray;
	res.tagsXmlArrayJoined = res.tagsXmlArray.join("|");
	var regexp = new RegExp("(<(?:" + res.tagsXmlArrayJoined + ")[^>]*>)([^<>]*)</(?:" + res.tagsXmlArrayJoined + ")>", "g");
	res.matches = DocUtils.pregMatchAll(regexp, res.content);
	res.charactersAddedCumulative = res.matches.map(function () {
		return 0;
	});
	res.charactersAdded = res.matches.map(function () {
		return 0;
	});
	return handleRecursiveCase(res);
}

var memoized = memoize(xmlMatcher);

module.exports = function (content, tagsXmlArray) {
	return DocUtils.cloneDeep(memoized(content, tagsXmlArray));
};
},{"./doc-utils":2,"./memoize":8}],19:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocUtils = require("./doc-utils");
var ScopeManager = require("./scope-manager");
var xmlMatcher = require("./xml-matcher");
var Errors = require("./errors");
var Lexer = require("./lexer");
var Parser = require("./parser.js");
var _render = require("./render.js");

function _getFullText(content, tagsXmlArray) {
	var matcher = xmlMatcher(content, tagsXmlArray);
	var result = matcher.matches.map(function (match) {
		return match.array[2];
	});
	return DocUtils.wordToUtf8(DocUtils.convertSpaces(result.join("")));
}

module.exports = function () {
	function XmlTemplater(content, options) {
		_classCallCheck(this, XmlTemplater);

		this.fromJson(options);
		this.setModules({ inspect: { filePath: this.filePath } });
		this.load(content);
	}

	_createClass(XmlTemplater, [{
		key: "load",
		value: function load(content) {
			if (typeof content !== "string") {
				var err = new Errors.XTInternalError("Content must be a string");
				err.properties.id = "xmltemplater_content_must_be_string";
				throw err;
			}
			this.content = content;
		}
	}, {
		key: "fromJson",
		value: function fromJson(options) {
			this.tags = options.tags != null ? options.tags : {};
			this.filePath = options.filePath;
			this.modules = options.modules;
			this.includeTags = options.includeTags;
			this.fileTypeConfig = options.fileTypeConfig;
			this.scopeManager = ScopeManager.createBaseScopeManager({ tags: this.tags, parser: this.parser });
			Object.keys(DocUtils.defaults).map(function (key) {
				var defaultValue = DocUtils.defaults[key];
				this[key] = options[key] != null ? options[key] : defaultValue;
			}, this);
		}
	}, {
		key: "getFullText",
		value: function getFullText() {
			return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
		}
	}, {
		key: "setModules",
		value: function setModules(obj) {
			this.modules.forEach(function (module) {
				if (module.set) {
					module.set(obj);
				}
			});
		}
		/*
  content is the whole content to be tagged
  scope is the current scope
  returns the new content of the tagged content
  */

	}, {
		key: "parseContent",
		value: function parseContent() {
			console.info("    In the main xml parsing");
			this.xmllexed = Lexer.xmlparse(this.content, { text: this.fileTypeConfig.tagsXmlTextArray, other: this.fileTypeConfig.tagsXmlLexedArray });
			console.info("        done xmllexed");

			//handle the comments file as a special case
			/*
   if(this.filePath.indexOf("comments.xml")>-1)
   {
   	var commentContent = {"inTextTag":false,"inComment":false,"comments":[], "tempText":""};
   	this.commentContent = this.xmllexed.reduce(function(commentContent, el) {
   		if(el.value.substr(0,5)=="<?xml") return commentContent;
   		if(el.value.indexOf("<w:comment ")>-1)
   		{
   			var commentId = el.value.substr(el.value.indexOf("<w:comment "));
   			commentId = commentId.substr(commentId.indexOf("w:id="));
   			commentId=commentId.replace("w:id=\"","");
   			commentId = commentId.substring(0,commentId.indexOf("\""));
   			commentContent.tempId=commentId;
   			commentContent.inComment=true;
   			commentContent.tempText="";
   			return commentContent;
   		}
   		if(el.value.indexOf("</w:comment>")>-1)
   		{
   			commentContent.comments[commentContent.tempId]={"value":commentContent.tempText};
   			commentContent.inComment=false;
   			commentContent.tempText="";
   			return commentContent;
   		}
   		if((el.value.substring(0,4)==="<w:t") || (el.value==="</w:t>"))
   		{
   			(el.value.substring(0,4)==="<w:t") ? commentContent.inTextTag=true : commentContent.inTextTag=false;
   			return commentContent;
   		}
   		if((commentContent.inTextTag) && (el.type==="content"))
   		{
   			commentContent.tempText+=el.value;
   		}
   		return commentContent;
   	},commentContent);
   	return this;
   }
    */
			//handle normal content files
			//var textContent = {"inTextTag":false,"inTextRange":false,"value":"", "textRanges":this.textRanges};
			var textContent = { "inTextTag": false, "value": "" };
			this.textContent = this.xmllexed.reduce(function (textContent, el) {
				/*
         if(el.value.indexOf("<w:commentRangeStart")>-1)
    	{
    			var commentId = el.value.replace("<w:commentRangeStart w:id=\"","").replace("\"\/>","");
    			textContent.commentRanges[commentId]={"tag":el.value,
    																		"id":commentId,
    																		"comment":"",
    																	  "inComment":true};
             textContent.inComment=true;
    			return textContent;
    	}
    	if(el.value.indexOf("<w:commentRangeEnd")>-1)
    	{
    			var commentId = el.value.replace("<w:commentRangeEnd w:id=\"","").replace("\"\/>","");
    			var lc = textContent.commentRanges[commentId];
    			if(lc)
    			{
    				lc.inComment=false;
    				textContent.inComment = textContent.commentRanges.reduce(function(prevValue,cr){
    					if(prevValue) return true;
    					return cr.inComment;
    				},false);
    			}
    			else
    			{
    				//error, closing a content we didn't have openned
    				console.info("bad state...found a close comment we did not have");
    			}
    			return textContent;
    	}
    */
				if (el.value.substring(0, 4) === "<w:t" || el.value === "</w:t>") {
					el.value.substring(0, 4) === "<w:t" ? textContent.inTextTag = true : textContent.inTextTag = false;
					return textContent;
				}
				if (textContent.inTextTag && el.type === "content") {
					textContent.value += el.value;
				}
				/*
    textContent.commentRanges.reduce(function(inText, cr){
    	if (cr.inComment)
    	{
    			cr.comment += inText;
    	}
    	return inText;
    },el.value);
    }
    */
				return textContent;
			}, textContent);

			//now, this.textRanges are the ranges we're looking for.  for each we should find the text....
			this.textRanges.forEach(function (r) {
				if (textContent.value.indexOf(r.start) > -1 && textContent.value.indexOf(r.end) > -1) {
					r["value"] = textContent.value.substring(textContent.value.indexOf(r.start) + r.start.length, textContent.value.indexOf(r.end));
				} else {
					r["value"] = "boundary tags not found";
				}
			});

			console.info(textContent.value);
			return this;
		}
		/*
  content is the whole content to be tagged
  scope is the current scope
  returns the new content of the tagged content
  */

	}, {
		key: "render",
		value: function render() {
			this.xmllexed = Lexer.xmlparse(this.content, { text: this.fileTypeConfig.tagsXmlTextArray, other: this.fileTypeConfig.tagsXmlLexedArray });
			this.setModules({ inspect: { xmllexed: this.xmllexed } });
			this.lexed = Lexer.parse(this.xmllexed, this.delimiters);
			this.setModules({ inspect: { lexed: this.lexed } });
			this.parsed = Parser.parse(this.lexed, this.modules);
			this.setModules({ inspect: { parsed: this.parsed } });
			this.postparsed = Parser.postparse(this.parsed, this.modules);
			this.setModules({ inspect: { postparsed: this.postparsed } });
			//this.commentRanges = [];
			this.content = _render({
				compiled: this.postparsed,
				includeTags: this.includeTags,
				commentRanges: this.commentRanges,
				tags: this.tags,
				modules: this.modules,
				parser: this.parser,
				nullGetter: this.nullGetter,
				filePath: this.filePath
			});
			this.setModules({ inspect: { content: this.content } });
			return this;
		}
	}]);

	return XmlTemplater;
}();
},{"./doc-utils":2,"./errors":4,"./lexer":7,"./parser.js":14,"./render.js":15,"./scope-manager":16,"./xml-matcher":18}],20:[function(require,module,exports){
"use strict";

var parse = require("./parse.js");

var filters = {};
var Lexer = parse.Lexer;
var Parser = parse.Parser;
var lexer = new Lexer({});
var parser = new Parser(lexer, getFilter);

/**
 * Compiles src and returns a function that executes src on a target object.
 * The compiled function is cached under compile.cache[src] to speed up further calls.
 *
 * @param {string} src
 * @returns {function}
 */
function compile(src) {
    var cached;

    if (typeof src !== "string") {
        throw new TypeError("src must be a string, instead saw '" + typeof src + "'");
    }

    if (!compile.cache) {
        return parser.parse(src);
    }

    cached = compile.cache[src];
    if (!cached) {
        cached = compile.cache[src] = parser.parse(src);
    }

    return cached;
}

/**
 * A cache containing all compiled functions. The src is used as key.
 * Set this on false to disable the cache.
 *
 * @type {object}
 */
compile.cache = {};

/**
 * Just a stub of angular's $filter-method
 *
 * @private
 * @param {string} name
 * @returns {function}
 */
function getFilter(name) {
    return filters[name];
}

exports.Lexer = Lexer;
exports.Parser = Parser;
exports.compile = compile;
exports.filters = filters;
},{"./parse.js":21}],21:[function(require,module,exports){
"use strict";

// Angular environment stuff
// ------------------------------
function noop() {}

// Simplified extend() for our use-case
function extend(dst, obj) {
    var key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            dst[key] = obj[key];
        }
    }

    return dst;
}

function isDefined(value) { return typeof value !== 'undefined'; }

function valueFn(value) { return function () { return value; }; }

function $parseMinErr(module, message, arg1, arg2, arg3) {
    var args = arguments;

    message = message.replace(/{(\d)}/g, function (match) {
        return args[2 + parseInt(match[1])];
    });

    throw new SyntaxError(message);
}

function lowercase (string) {return typeof string === "string" ? string.toLowerCase() : string;}

// Simplified forEach() for our use-case
function forEach(arr, iterator) {
    arr.forEach(iterator);
}

// Sandboxing Angular Expressions
// ------------------------------
// Angular expressions are generally considered safe because these expressions only have direct
// access to $scope and locals. However, one can obtain the ability to execute arbitrary JS code by
// obtaining a reference to native JS functions such as the Function constructor.
//
// As an example, consider the following Angular expression:
//
//   {}.toString.constructor(alert("evil JS code"))
//
// We want to prevent this type of access. For the sake of performance, during the lexing phase we
// disallow any "dotted" access to any member named "constructor".
//
// For reflective calls (a[b]) we check that the value of the lookup is not the Function constructor
// while evaluating the expression, which is a stronger but more expensive test. Since reflective
// calls are expensive anyway, this is not such a big deal compared to static dereferencing.
//
// This sandboxing technique is not perfect and doesn't aim to be. The goal is to prevent exploits
// against the expression language, but not to prevent exploits that were enabled by exposing
// sensitive JavaScript or browser apis on Scope. Exposing such objects on a Scope is never a good
// practice and therefore we are not even trying to protect against interaction with an object
// explicitly exposed in this way.
//
// A developer could foil the name check by aliasing the Function constructor under a different
// name on the scope.
//
// In general, it is not possible to access a Window object from an angular expression unless a
// window or some DOM object that has a reference to window is published onto a Scope.

function ensureSafeMemberName(name, fullExpression) {
  if (name === "constructor") {
    throw $parseMinErr('isecfld',
        'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}',
        fullExpression);
  }
  return name;
}

function ensureSafeObject(obj, fullExpression) {
  // nifty check if obj is Function that is fast and works across iframes and other contexts
  if (obj) {
    if (obj.constructor === obj) {
      throw $parseMinErr('isecfn',
          'Referencing Function in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    } else if (// isWindow(obj)
        obj.document && obj.location && obj.alert && obj.setInterval) {
      throw $parseMinErr('isecwindow',
          'Referencing the Window in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    } else if (// isElement(obj)
        obj.children && (obj.nodeName || (obj.prop && obj.attr && obj.find))) {
      throw $parseMinErr('isecdom',
          'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}',
          fullExpression);
    }
  }
  return obj;
}

var OPERATORS = {
    /* jshint bitwise : false */
    'null':function(){return null;},
    'true':function(){return true;},
    'false':function(){return false;},
    undefined:noop,
    '+':function(self, locals, a,b){
      a=a(self, locals); b=b(self, locals);
      if (isDefined(a)) {
        if (isDefined(b)) {
          return a + b;
        }
        return a;
      }
      return isDefined(b)?b:undefined;},
    '-':function(self, locals, a,b){
          a=a(self, locals); b=b(self, locals);
          return (isDefined(a)?a:0)-(isDefined(b)?b:0);
        },
    '*':function(self, locals, a,b){return a(self, locals)*b(self, locals);},
    '/':function(self, locals, a,b){return a(self, locals)/b(self, locals);},
    '%':function(self, locals, a,b){return a(self, locals)%b(self, locals);},
    '^':function(self, locals, a,b){return a(self, locals)^b(self, locals);},
    '=':noop,
    '===':function(self, locals, a, b){return a(self, locals)===b(self, locals);},
    '!==':function(self, locals, a, b){return a(self, locals)!==b(self, locals);},
    '==':function(self, locals, a,b){return a(self, locals)==b(self, locals);},
    '!=':function(self, locals, a,b){return a(self, locals)!=b(self, locals);},
    '<':function(self, locals, a,b){return a(self, locals)<b(self, locals);},
    '>':function(self, locals, a,b){return a(self, locals)>b(self, locals);},
    '<=':function(self, locals, a,b){return a(self, locals)<=b(self, locals);},
    '>=':function(self, locals, a,b){return a(self, locals)>=b(self, locals);},
    '&&':function(self, locals, a,b){return a(self, locals)&&b(self, locals);},
    '||':function(self, locals, a,b){return a(self, locals)||b(self, locals);},
    '&':function(self, locals, a,b){return a(self, locals)&b(self, locals);},
//    '|':function(self, locals, a,b){return a|b;},
    '|':function(self, locals, a,b){return b(self, locals)(self, locals, a(self, locals));},
    '!':function(self, locals, a){return !a(self, locals);}
};
/* jshint bitwise: true */
var ESCAPE = {"n":"\n", "f":"\f", "r":"\r", "t":"\t", "v":"\v", "'":"'", '"':'"'};


/////////////////////////////////////////


/**
 * @constructor
 */
var Lexer = function (options) {
  this.options = options;
};

Lexer.prototype = {
  constructor: Lexer,

  lex: function (text) {
    this.text = text;

    this.index = 0;
    this.ch = undefined;
    this.lastCh = ':'; // can start regexp

    this.tokens = [];

    var token;
    var json = [];

    while (this.index < this.text.length) {
      this.ch = this.text.charAt(this.index);
      if (this.is('"\'')) {
        this.readString(this.ch);
      } else if (this.isNumber(this.ch) || this.is('.') && this.isNumber(this.peek())) {
        this.readNumber();
      } else if (this.isIdent(this.ch)) {
        this.readIdent();
        // identifiers can only be if the preceding char was a { or ,
        if (this.was('{,') && json[0] === '{' &&
            (token = this.tokens[this.tokens.length - 1])) {
          token.json = token.text.indexOf('.') === -1;
        }
      } else if (this.is('(){}[].,;:?')) {
        this.tokens.push({
          index: this.index,
          text: this.ch,
          json: (this.was(':[,') && this.is('{[')) || this.is('}]:,')
        });
        if (this.is('{[')) json.unshift(this.ch);
        if (this.is('}]')) json.shift();
        this.index++;
      } else if (this.isWhitespace(this.ch)) {
        this.index++;
        continue;
      } else {
        var ch2 = this.ch + this.peek();
        var ch3 = ch2 + this.peek(2);
        var fn = OPERATORS[this.ch];
        var fn2 = OPERATORS[ch2];
        var fn3 = OPERATORS[ch3];
        if (fn3) {
          this.tokens.push({index: this.index, text: ch3, fn: fn3});
          this.index += 3;
        } else if (fn2) {
          this.tokens.push({index: this.index, text: ch2, fn: fn2});
          this.index += 2;
        } else if (fn) {
          this.tokens.push({
            index: this.index,
            text: this.ch,
            fn: fn,
            json: (this.was('[,:') && this.is('+-'))
          });
          this.index += 1;
        } else {
          this.throwError('Unexpected next character ', this.index, this.index + 1);
        }
      }
      this.lastCh = this.ch;
    }
    return this.tokens;
  },

  is: function(chars) {
    return chars.indexOf(this.ch) !== -1;
  },

  was: function(chars) {
    return chars.indexOf(this.lastCh) !== -1;
  },

  peek: function(i) {
    var num = i || 1;
    return (this.index + num < this.text.length) ? this.text.charAt(this.index + num) : false;
  },

  isNumber: function(ch) {
    return ('0' <= ch && ch <= '9');
  },

  isWhitespace: function(ch) {
    // IE treats non-breaking space as \u00A0
    return (ch === ' ' || ch === '\r' || ch === '\t' ||
            ch === '\n' || ch === '\v' || ch === '\u00A0');
  },

  isIdent: function(ch) {
    return ('a' <= ch && ch <= 'z' ||
            'A' <= ch && ch <= 'Z' ||
            '_' === ch || ch === '$');
  },

  isExpOperator: function(ch) {
    return (ch === '-' || ch === '+' || this.isNumber(ch));
  },

  throwError: function(error, start, end) {
    end = end || this.index;
    var colStr = (isDefined(start)
            ? 's ' + start +  '-' + this.index + ' [' + this.text.substring(start, end) + ']'
            : ' ' + end);
    throw $parseMinErr('lexerr', 'Lexer Error: {0} at column{1} in expression [{2}].',
        error, colStr, this.text);
  },

  readNumber: function() {
    var number = '';
    var start = this.index;
    while (this.index < this.text.length) {
      var ch = lowercase(this.text.charAt(this.index));
      if (ch == '.' || this.isNumber(ch)) {
        number += ch;
      } else {
        var peekCh = this.peek();
        if (ch == 'e' && this.isExpOperator(peekCh)) {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            peekCh && this.isNumber(peekCh) &&
            number.charAt(number.length - 1) == 'e') {
          number += ch;
        } else if (this.isExpOperator(ch) &&
            (!peekCh || !this.isNumber(peekCh)) &&
            number.charAt(number.length - 1) == 'e') {
          this.throwError('Invalid exponent');
        } else {
          break;
        }
      }
      this.index++;
    }
    number = 1 * number;
    this.tokens.push({
      index: start,
      text: number,
      json: true,
      fn: function() { return number; }
    });
  },

  readIdent: function() {
    var parser = this;

    var ident = '';
    var start = this.index;

    var lastDot, peekIndex, methodName, ch;

    while (this.index < this.text.length) {
      ch = this.text.charAt(this.index);
      if (ch === '.' || this.isIdent(ch) || this.isNumber(ch)) {
        if (ch === '.') lastDot = this.index;
        ident += ch;
      } else {
        break;
      }
      this.index++;
    }

    //check if this is not a method invocation and if it is back out to last dot
    if (lastDot) {
      peekIndex = this.index;
      while (peekIndex < this.text.length) {
        ch = this.text.charAt(peekIndex);
        if (ch === '(') {
          methodName = ident.substr(lastDot - start + 1);
          ident = ident.substr(0, lastDot - start);
          this.index = peekIndex;
          break;
        }
        if (this.isWhitespace(ch)) {
          peekIndex++;
        } else {
          break;
        }
      }
    }


    var token = {
      index: start,
      text: ident
    };

    // OPERATORS is our own object so we don't need to use special hasOwnPropertyFn
    if (OPERATORS.hasOwnProperty(ident)) {
      token.fn = OPERATORS[ident];
      token.json = OPERATORS[ident];
    } else {
      var getter = getterFn(ident, this.options, this.text);
      token.fn = extend(function(self, locals) {
        return (getter(self, locals));
      }, {
        assign: function(self, value) {
          return setter(self, ident, value, parser.text, parser.options);
        }
      });
    }

    this.tokens.push(token);

    if (methodName) {
      this.tokens.push({
        index:lastDot,
        text: '.',
        json: false
      });
      this.tokens.push({
        index: lastDot + 1,
        text: methodName,
        json: false
      });
    }
  },

  readString: function(quote) {
    var start = this.index;
    this.index++;
    var string = '';
    var rawString = quote;
    var escape = false;
    while (this.index < this.text.length) {
      var ch = this.text.charAt(this.index);
      rawString += ch;
      if (escape) {
        if (ch === 'u') {
          var hex = this.text.substring(this.index + 1, this.index + 5);
          if (!hex.match(/[\da-f]{4}/i))
            this.throwError('Invalid unicode escape [\\u' + hex + ']');
          this.index += 4;
          string += String.fromCharCode(parseInt(hex, 16));
        } else {
          var rep = ESCAPE[ch];
          if (rep) {
            string += rep;
          } else {
            string += ch;
          }
        }
        escape = false;
      } else if (ch === '\\') {
        escape = true;
      } else if (ch === quote) {
        this.index++;
        this.tokens.push({
          index: start,
          text: rawString,
          string: string,
          json: true,
          fn: function() { return string; }
        });
        return;
      } else {
        string += ch;
      }
      this.index++;
    }
    this.throwError('Unterminated quote', start);
  }
};


/**
 * @constructor
 */
var Parser = function (lexer, $filter, options) {
  this.lexer = lexer;
  this.$filter = $filter;
  this.options = options;
};

Parser.ZERO = function () { return 0; };

Parser.prototype = {
  constructor: Parser,

  parse: function (text) {
    this.text = text;

    this.tokens = this.lexer.lex(text);

    var value = this.statements();

    if (this.tokens.length !== 0) {
      this.throwError('is an unexpected token', this.tokens[0]);
    }

    value.literal = !!value.literal;
    value.constant = !!value.constant;

    return value;
  },

  primary: function () {
    var primary;
    if (this.expect('(')) {
      primary = this.filterChain();
      this.consume(')');
    } else if (this.expect('[')) {
      primary = this.arrayDeclaration();
    } else if (this.expect('{')) {
      primary = this.object();
    } else {
      var token = this.expect();
      primary = token.fn;
      if (!primary) {
        this.throwError('not a primary expression', token);
      }
      if (token.json) {
        primary.constant = true;
        primary.literal = true;
      }
    }

    var next, context;
    while ((next = this.expect('(', '[', '.'))) {
      if (next.text === '(') {
        primary = this.functionCall(primary, context);
        context = null;
      } else if (next.text === '[') {
        context = primary;
        primary = this.objectIndex(primary);
      } else if (next.text === '.') {
        context = primary;
        primary = this.fieldAccess(primary);
      } else {
        this.throwError('IMPOSSIBLE');
      }
    }
    return primary;
  },

  throwError: function(msg, token) {
    throw $parseMinErr('syntax',
        'Syntax Error: Token \'{0}\' {1} at column {2} of the expression [{3}] starting at [{4}].',
          token.text, msg, (token.index + 1), this.text, this.text.substring(token.index));
  },

  peekToken: function() {
    if (this.tokens.length === 0)
      throw $parseMinErr('ueoe', 'Unexpected end of expression: {0}', this.text);
    return this.tokens[0];
  },

  peek: function(e1, e2, e3, e4) {
    if (this.tokens.length > 0) {
      var token = this.tokens[0];
      var t = token.text;
      if (t === e1 || t === e2 || t === e3 || t === e4 ||
          (!e1 && !e2 && !e3 && !e4)) {
        return token;
      }
    }
    return false;
  },

  expect: function(e1, e2, e3, e4){
    var token = this.peek(e1, e2, e3, e4);
    if (token) {
      this.tokens.shift();
      return token;
    }
    return false;
  },

  consume: function(e1){
    if (!this.expect(e1)) {
      this.throwError('is unexpected, expecting [' + e1 + ']', this.peek());
    }
  },

  unaryFn: function(fn, right) {
    return extend(function(self, locals) {
      return fn(self, locals, right);
    }, {
      constant:right.constant
    });
  },

  ternaryFn: function(left, middle, right){
    return extend(function(self, locals){
      return left(self, locals) ? middle(self, locals) : right(self, locals);
    }, {
      constant: left.constant && middle.constant && right.constant
    });
  },

  binaryFn: function(left, fn, right) {
    return extend(function(self, locals) {
      return fn(self, locals, left, right);
    }, {
      constant:left.constant && right.constant
    });
  },

  statements: function() {
    var statements = [];
    while (true) {
      if (this.tokens.length > 0 && !this.peek('}', ')', ';', ']'))
        statements.push(this.filterChain());
      if (!this.expect(';')) {
        // optimize for the common case where there is only one statement.
        // TODO(size): maybe we should not support multiple statements?
        return (statements.length === 1)
            ? statements[0]
            : function(self, locals) {
                var value;
                for (var i = 0; i < statements.length; i++) {
                  var statement = statements[i];
                  if (statement) {
                    value = statement(self, locals);
                  }
                }
                return value;
              };
      }
    }
  },

  filterChain: function() {
    var left = this.expression();
    var token;
    while (true) {
      if ((token = this.expect('|'))) {
        left = this.binaryFn(left, token.fn, this.filter());
      } else {
        return left;
      }
    }
  },

  filter: function() {
    var token = this.expect();
    var fn = this.$filter(token.text);
    var argsFn = [];
    while (true) {
      if ((token = this.expect(':'))) {
        argsFn.push(this.expression());
      } else {
        var fnInvoke = function(self, locals, input) {
          var args = [input];
          for (var i = 0; i < argsFn.length; i++) {
            args.push(argsFn[i](self, locals));
          }
          return fn.apply(self, args);
        };
        return function() {
          return fnInvoke;
        };
      }
    }
  },

  expression: function() {
    return this.assignment();
  },

  assignment: function() {
    var left = this.ternary();
    var right;
    var token;
    if ((token = this.expect('='))) {
      if (!left.assign) {
        this.throwError('implies assignment but [' +
            this.text.substring(0, token.index) + '] can not be assigned to', token);
      }
      right = this.ternary();
      return function(scope, locals) {
        return left.assign(scope, right(scope, locals), locals);
      };
    }
    return left;
  },

  ternary: function() {
    var left = this.logicalOR();
    var middle;
    var token;
    if ((token = this.expect('?'))) {
      middle = this.ternary();
      if ((token = this.expect(':'))) {
        return this.ternaryFn(left, middle, this.ternary());
      } else {
        this.throwError('expected :', token);
      }
    } else {
      return left;
    }
  },

  logicalOR: function() {
    var left = this.logicalAND();
    var token;
    while (true) {
      if ((token = this.expect('||'))) {
        left = this.binaryFn(left, token.fn, this.logicalAND());
      } else {
        return left;
      }
    }
  },

  logicalAND: function() {
    var left = this.equality();
    var token;
    if ((token = this.expect('&&'))) {
      left = this.binaryFn(left, token.fn, this.logicalAND());
    }
    return left;
  },

  equality: function() {
    var left = this.relational();
    var token;
    if ((token = this.expect('==','!=','===','!=='))) {
      left = this.binaryFn(left, token.fn, this.equality());
    }
    return left;
  },

  relational: function() {
    var left = this.additive();
    var token;
    if ((token = this.expect('<', '>', '<=', '>='))) {
      left = this.binaryFn(left, token.fn, this.relational());
    }
    return left;
  },

  additive: function() {
    var left = this.multiplicative();
    var token;
    while ((token = this.expect('+','-'))) {
      left = this.binaryFn(left, token.fn, this.multiplicative());
    }
    return left;
  },

  multiplicative: function() {
    var left = this.unary();
    var token;
    while ((token = this.expect('*','/','%'))) {
      left = this.binaryFn(left, token.fn, this.unary());
    }
    return left;
  },

  unary: function() {
    var token;
    if (this.expect('+')) {
      return this.primary();
    } else if ((token = this.expect('-'))) {
      return this.binaryFn(Parser.ZERO, token.fn, this.unary());
    } else if ((token = this.expect('!'))) {
      return this.unaryFn(token.fn, this.unary());
    } else {
      return this.primary();
    }
  },

  fieldAccess: function(object) {
    var parser = this;
    var field = this.expect().text;
    var getter = getterFn(field, this.options, this.text);

    return extend(function(scope, locals, self) {
      return getter(self || object(scope, locals));
    }, {
      assign: function(scope, value, locals) {
        var o = object(scope, locals);
        if (!o) object.assign(scope, o = {}, locals);
        return setter(o, field, value, parser.text, parser.options);
      }
    });
  },

  objectIndex: function(obj) {
    var parser = this;

    var indexFn = this.expression();
    this.consume(']');

    return extend(function(self, locals) {
      var o = obj(self, locals),
          i = indexFn(self, locals),
          v, p;

      if (!o) return undefined;
      v = ensureSafeObject(o[i], parser.text);
      return v;
    }, {
      assign: function(self, value, locals) {
        var key = indexFn(self, locals);
        // prevent overwriting of Function.constructor which would break ensureSafeObject check
        var o = ensureSafeObject(obj(self, locals), parser.text);
        if (!o) obj.assign(self, o = [], locals);
        return o[key] = value;
      }
    });
  },

  functionCall: function(fn, contextGetter) {
    var argsFn = [];
    if (this.peekToken().text !== ')') {
      do {
        argsFn.push(this.expression());
      } while (this.expect(','));
    }
    this.consume(')');

    var parser = this;

    return function(scope, locals) {
      var args = [];
      var context = contextGetter ? contextGetter(scope, locals) : scope;

      for (var i = 0; i < argsFn.length; i++) {
        args.push(argsFn[i](scope, locals));
      }
      var fnPtr = fn(scope, locals, context) || noop;

      ensureSafeObject(context, parser.text);
      ensureSafeObject(fnPtr, parser.text);

      // IE stupidity! (IE doesn't have apply for some native functions)
      var v = fnPtr.apply
            ? fnPtr.apply(context, args)
            : fnPtr(args[0], args[1], args[2], args[3], args[4]);

      return ensureSafeObject(v, parser.text);
    };
  },

  // This is used with json array declaration
  arrayDeclaration: function () {
    var elementFns = [];
    var allConstant = true;
    if (this.peekToken().text !== ']') {
      do {
        if (this.peek(']')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var elementFn = this.expression();
        elementFns.push(elementFn);
        if (!elementFn.constant) {
          allConstant = false;
        }
      } while (this.expect(','));
    }
    this.consume(']');

    return extend(function(self, locals) {
      var array = [];
      for (var i = 0; i < elementFns.length; i++) {
        array.push(elementFns[i](self, locals));
      }
      return array;
    }, {
      literal: true,
      constant: allConstant
    });
  },

  object: function () {
    var keyValues = [];
    var allConstant = true;
    if (this.peekToken().text !== '}') {
      do {
        if (this.peek('}')) {
          // Support trailing commas per ES5.1.
          break;
        }
        var token = this.expect(),
        key = token.string || token.text;
        this.consume(':');
        var value = this.expression();
        keyValues.push({key: key, value: value});
        if (!value.constant) {
          allConstant = false;
        }
      } while (this.expect(','));
    }
    this.consume('}');

    return extend(function(self, locals) {
      var object = {};
      for (var i = 0; i < keyValues.length; i++) {
        var keyValue = keyValues[i];
        object[keyValue.key] = keyValue.value(self, locals);
      }
      return object;
    }, {
      literal: true,
      constant: allConstant
    });
  }
};


//////////////////////////////////////////////////
// Parser helper functions
//////////////////////////////////////////////////

function setter(obj, path, setValue, fullExp) {
  var element = path.split('.'), key;
  for (var i = 0; element.length > 1; i++) {
    key = ensureSafeMemberName(element.shift(), fullExp);
    var propertyObj = obj[key];
    if (!propertyObj) {
      propertyObj = {};
      obj[key] = propertyObj;
    }
    obj = propertyObj;
  }
  key = ensureSafeMemberName(element.shift(), fullExp);
  obj[key] = setValue;
  return setValue;
}

var getterFnCache = {};

/**
 * Implementation of the "Black Hole" variant from:
 * - http://jsperf.com/angularjs-parse-getter/4
 * - http://jsperf.com/path-evaluation-simplified/7
 */
function cspSafeGetterFn(key0, key1, key2, key3, key4, fullExp) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);
  ensureSafeMemberName(key2, fullExp);
  ensureSafeMemberName(key3, fullExp);
  ensureSafeMemberName(key4, fullExp);

  return function cspSafeGetter(scope, locals) {
          var pathVal = (locals && locals.hasOwnProperty(key0)) ? locals : scope;

          if (pathVal == null) return pathVal;
          pathVal = pathVal[key0];

          if (!key1) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key1];

          if (!key2) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key2];

          if (!key3) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key3];

          if (!key4) return pathVal;
          if (pathVal == null) return undefined;
          pathVal = pathVal[key4];

          return pathVal;
        };
}

function simpleGetterFn1(key0, fullExp) {
  ensureSafeMemberName(key0, fullExp);

  return function simpleGetterFn1(scope, locals) {
    if (scope == null) return undefined;
    return ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
  };
}

function simpleGetterFn2(key0, key1, fullExp) {
  ensureSafeMemberName(key0, fullExp);
  ensureSafeMemberName(key1, fullExp);

  return function simpleGetterFn2(scope, locals) {
    if (scope == null) return undefined;
    scope = ((locals && locals.hasOwnProperty(key0)) ? locals : scope)[key0];
    return scope == null ? undefined : scope[key1];
  };
}

function getterFn(path, options, fullExp) {
  // Check whether the cache has this getter already.
  // We can use hasOwnProperty directly on the cache because we ensure,
  // see below, that the cache never stores a path called 'hasOwnProperty'
  if (getterFnCache.hasOwnProperty(path)) {
    return getterFnCache[path];
  }

  var pathKeys = path.split('.'),
      pathKeysLength = pathKeys.length,
      fn;

  // When we have only 1 or 2 tokens, use optimized special case closures.
  // http://jsperf.com/angularjs-parse-getter/6
  if (pathKeysLength === 1) {
    fn = simpleGetterFn1(pathKeys[0], fullExp);
  } else if (pathKeysLength === 2) {
    fn = simpleGetterFn2(pathKeys[0], pathKeys[1], fullExp);
  } else if (options.csp) {
    if (pathKeysLength < 6) {
      fn = cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4], fullExp,
                          options);
    } else {
      fn = function(scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++],
                                pathKeys[i++], fullExp, options)(scope, locals);

          locals = undefined; // clear after first iteration
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    }
  } else {
    var code = 'var p;\n';
    forEach(pathKeys, function(key, index) {
      ensureSafeMemberName(key, fullExp);
      code += 'if(s == null) return undefined;\n' +
              's='+ (index
                      // we simply dereference 's' on any .dot notation
                      ? 's'
                      // but if we are first then we check locals first, and if so read it first
                      : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n';
    });
    code += 'return s;';

    /* jshint -W054 */
    var evaledFnGetter = new Function('s', 'k', 'pw', code); // s=scope, k=locals, pw=promiseWarning
    /* jshint +W054 */
    evaledFnGetter.toString = valueFn(code);
    fn = evaledFnGetter;
  }

  // Only cache the value if it's not going to mess up the cache object
  // This is more performant that using Object.prototype.hasOwnProperty.call
  if (path !== 'hasOwnProperty') {
    getterFnCache[path] = fn;
  }
  return fn;
}

exports.Lexer = Lexer;
exports.Parser = Parser;
},{}],22:[function(require,module,exports){
function DOMParser(options){
	this.options = options ||{locator:{}};
	
}
DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var entityMap = {'lt':'<','gt':'>','amp':'&','quot':'"','apos':"'"}
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}
	
	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(/\/x?html?$/.test(mimeType)){
		entityMap.nbsp = '\xa0';
		entityMap.copy = '\xa9';
		defaultNSMap['']= 'http://www.w3.org/1999/xhtml';
	}
	defaultNSMap.xml = defaultNSMap.xml || 'http://www.w3.org/XML/1998/namespace';
	if(source){
		sax.parse(source,defaultNSMap,entityMap);
	}else{
		sax.errorHandler.error("invalid doc source");
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler 
 * 
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */ 
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;
	    
		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},
	
	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},
	
	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		console.error('[xmldom fatalError]\t'+error,_locator(this.locator));
	    throw error;
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

//if(typeof require == 'function'){
	var XMLReader = require('./sax').XMLReader;
	var DOMImplementation = exports.DOMImplementation = require('./dom').DOMImplementation;
	exports.XMLSerializer = require('./dom').XMLSerializer ;
	exports.DOMParser = DOMParser;
//}

},{"./dom":23,"./sax":24}],23:[function(require,module,exports){
/*
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 */

function copy(src,dest){
	for(var p in src){
		dest[p] = src[p];
	}
}
/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(Object.create){
		var ppt = Object.create(Super.prototype)
		pt.__proto__ = ppt;
	}
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknow Class:"+Class)
		}
		pt.constructor = Class
	}
}
var htmlns = 'http://www.w3.org/1999/xhtml' ;
// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);


function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)
/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0, 
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long 
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index. 
	 */
	item: function(index) {
		return this[index] || null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	}
};
function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if(list._inc != inc){
		var ls = list._refresh(list._node);
		//console.log(ls.length)
		__set__(list,'length',ls.length);
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i];
}

_extends(LiveNodeList,NodeList);
/**
 * 
 * Objects implementing the NamedNodeMap interface are used to represent collections of nodes that can be accessed by name. Note that NamedNodeMap does not inherit from NodeList; NamedNodeMaps are not maintained in any particular order. Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index, but this is simply to allow convenient enumeration of the contents of a NamedNodeMap, and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities 
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
		
		
	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
	
	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};
/**
 * @see http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490
 */
function DOMImplementation(/* Object */ features) {
	this._features = {};
	if (features) {
		for (var feature in features) {
			 this._features = features[feature];
		}
	}
};

DOMImplementation.prototype = {
	hasFeature: function(/* string */ feature, /* string */ version) {
		var versions = this._features[feature.toLowerCase()];
		if (versions && (!version || version in versions)) {
			return true;
		} else {
			return false;
		}
	},
	// Introduced in DOM Level 2:
	createDocument:function(namespaceURI,  qualifiedName, doctype){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR,WRONG_DOCUMENT_ERR
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype;
		if(doctype){
			doc.appendChild(doctype);
		}
		if(qualifiedName){
			var root = doc.createElementNS(namespaceURI,qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	// Introduced in DOM Level 2:
	createDocumentType:function(qualifiedName, publicId, systemId){// raises:INVALID_CHARACTER_ERR,NAMESPACE_ERR
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId;
		node.systemId = systemId;
		// Introduced in DOM Level 2:
		//readonly attribute DOMString        internalSubset;
		
		//TODO:..
		//  readonly attribute NamedNodeMap     entities;
		//  readonly attribute NamedNodeMap     notations;
		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises 
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises 
		this.insertBefore(newChild,oldChild);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
    				if(map[n] == namespaceURI){
    					return n;
    				}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(prefix in map){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
}
function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}
function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns == 'http://www.w3.org/2000/xmlns/'){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}
function _onUpdateChild(doc,el,newChild){
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if(newChild){
			cs[cs.length++] = newChild;
		}else{
			//console.log(1)
			var child = el.firstChild;
			var i = 0;
			while(child){
				cs[i++] = child;
				child =child.nextSibling;
			}
			cs.length = i;
		}
	}
}

/**
 * attributes;
 * children;
 * 
 * writeable properties:
 * nodeValue,Attr:value,CharacterData:data
 * prefix
 */
function _removeChild(parentNode,child){
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if(previous){
		previous.nextSibling = next;
	}else{
		parentNode.firstChild = next
	}
	if(next){
		next.previousSibling = previous;
	}else{
		parentNode.lastChild = previous;
	}
	_onUpdateChild(parentNode.ownerDocument,parentNode);
	return child;
}
/**
 * preformance key(refChild == null)
 */
function _insertBefore(parentNode,newChild,nextChild){
	var cp = newChild.parentNode;
	if(cp){
		cp.removeChild(newChild);//remove and update
	}
	if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = newChild.firstChild;
		if (newFirst == null) {
			return newChild;
		}
		var newLast = newChild.lastChild;
	}else{
		newFirst = newLast = newChild;
	}
	var pre = nextChild ? nextChild.previousSibling : parentNode.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = nextChild;
	
	
	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parentNode.firstChild = newFirst;
	}
	if(nextChild == null){
		parentNode.lastChild = newLast;
	}else{
		nextChild.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parentNode;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parentNode.ownerDocument||parentNode,parentNode);
	//console.log(parentNode.lastChild.nextSibling == null)
	if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
		newChild.firstChild = newChild.lastChild = null;
	}
	return newChild;
}
function _appendSingleChild(parentNode,newChild){
	var cp = newChild.parentNode;
	if(cp){
		var pre = parentNode.lastChild;
		cp.removeChild(newChild);//remove and update
		var pre = parentNode.lastChild;
	}
	var pre = parentNode.lastChild;
	newChild.parentNode = parentNode;
	newChild.previousSibling = pre;
	newChild.nextSibling = null;
	if(pre){
		pre.nextSibling = newChild;
	}else{
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument,parentNode,newChild);
	return newChild;
	//console.log("__aa",parentNode.lastChild.nextSibling == null)
}
Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	doctype :  null,
	documentElement :  null,
	_inc : 1,
	
	insertBefore :  function(newChild, refChild){//raises 
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		if(this.documentElement == null && newChild.nodeType == ELEMENT_NODE){
			this.documentElement = newChild;
		}
		
		return _insertBefore(this,newChild,refChild),(newChild.ownerDocument = this),newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},
	
	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.target = target;
		node.nodeValue= node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},
	
	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},
	
	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},
	
	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;
			
		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);
	
	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9?this.documentElement:this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;
	
	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}
function needNamespaceDefine(node,isHTML, visibleNamespaces) {
	var prefix = node.prefix||'';
	var uri = node.namespaceURI;
	if (!prefix && !uri){
		return false;
	}
	if (prefix === "xml" && uri === "http://www.w3.org/XML/1998/namespace" 
		|| uri == 'http://www.w3.org/2000/xmlns/'){
		return false;
	}
	
	var i = visibleNamespaces.length 
	//console.log('@@@@',node.tagName,prefix,uri,visibleNamespaces)
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		//console.log(node.nodeType,node.tagName,ns.prefix,prefix)
		if (ns.prefix == prefix){
			return ns.namespace != uri;
		}
	}
	//console.log(isHTML,uri,prefix=='')
	//if(isHTML && prefix ==null && uri == 'http://www.w3.org/1999/xhtml'){
	//	return false;
	//}
	//node.flag = '11111'
	//console.error(3,true,node.flag,node.prefix,node.namespaceURI)
	return true;
}
function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}
	switch(node.nodeType){
	case ELEMENT_NODE:
		if (!visibleNamespaces) visibleNamespaces = [];
		var startVisibleNamespaces = visibleNamespaces.length;
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;
		
		isHTML =  (htmlns === node.namespaceURI) ||isHTML 
		buf.push('<',nodeName);
		
		
		
		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}
		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				var ns = prefix ? ' xmlns:' + prefix : " xmlns";
				buf.push(ns, '="' , uri , '"');
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}
		// add namespace for current node		
		if (needNamespaceDefine(node,isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			var ns = prefix ? ' xmlns:' + prefix : " xmlns";
			buf.push(ns, '="' , uri , '"');
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}
		
		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
					child = child.nextSibling;
				}
			}
			buf.push('</',nodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child,buf,isHTML,nodeFilter,visibleNamespaces);
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return buf.push(' ',node.name,'="',node.value.replace(/[<&"]/g,_xmlEncoder),'"');
	case TEXT_NODE:
		return buf.push(node.data.replace(/[<&]/g,_xmlEncoder));
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC "',pubid);
			if (sysid && sysid!='.') {
				buf.push( '" "',sysid);
			}
			buf.push('">');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM "',sysid,'">');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for(var n in node){
		var v = node[n];
		if(typeof v != 'object' ){
			if(v != node2[n]){
				node2[n] = v;
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});
		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},
			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;
				default:
					//TODO:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})
		
		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}
		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DOMImplementation = DOMImplementation;
	exports.XMLSerializer = XMLSerializer;
//}

},{}],24:[function(require,module,exports){
//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring 
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

function XMLReader(){
	
}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if(k in entityMap){
			return entityMap[k]; 
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;
	
	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart+2,end);
				var config = parseStack.pop();
				if(end<0){
					
	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		//console.error('#@@@@@@'+tagName)
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				//console.error(parseStack.length,parseStack)
				//console.error(config);
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for(var prefix in localNSMap){
							domBuilder.endPrefixMapping(prefix) ;
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName );
					}
		        }else{
		        	parseStack.push(config)
		        }
				
				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;
				
				
				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					//}catch(e){console.error('@@@@@'+e)}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}
				
				
				
				if(el.uri === 'http://www.w3.org/1999/xhtml' && !el.closed){
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				}else{
					end++;
				}
			}
		}catch(e){
			errorHandler.error('element parse error: '+e)
			//errorHandler.error('element parse error: '+e);
			end = -1;
			//throw e;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName');
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					el.add(attrName,value,start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
				//console.log(attrName,value,start,p)
				el.add(attrName,value,start);
				//console.dir(el)
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="');
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
			case S_ATTR_SPACE:
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')")
			}
			break;
		case ''://end document
			//throw new Error('unexpected end of input')
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value.replace(/&#?\w+;/g,entityReplacer),start)
				}else{
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					el.add(value,value,start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start,p).replace(/&#?\w+;/g,entityReplacer);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					el.add(attrName,value,start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if(currentNSMap[''] !== 'http://www.w3.org/1999/xhtml' || !attrName.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					el.add(attrName,attrName,start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute 
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = 'http://www.w3.org/2000/xmlns/'
			domBuilder.startPrefixMapping(nsPrefix, value) 
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = 'http://www.w3.org/XML/1998/namespace';
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']
				
				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for(prefix in localNSMap){
				domBuilder.endPrefixMapping(prefix) 
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}
			
		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//} 
}
function _copy(source,target){
	for(var n in source){target[n] = source[n]}
}
function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA() 
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId) 
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = len>3 && /^public$/i.test(matchs[2][0]) && matchs[3][0]
			var sysid = len>4 && matchs[4][0];
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name,pubid && pubid.replace(/^(['"])(.*?)\1$/,'$2'),
					sysid && sysid.replace(/^(['"])(.*?)\1$/,'$2'));
			domBuilder.endDTD();
			
			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

/**
 * @param source
 */
function ElementAttributes(source){
	
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	add:function(qName,value,offset){
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//			
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}




function _set_proto_(thiz,parent){
	thiz.__proto__ = parent;
	return thiz;
}
if(!(_set_proto_({},_set_proto_.prototype) instanceof _set_proto_)){
	_set_proto_ = function(thiz,parent){
		function p(){};
		p.prototype = parent;
		p = new p();
		for(parent in thiz){
			p[parent] = thiz[parent];
		}
		return p;
	}
}

function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;


},{}]},{},[1]);

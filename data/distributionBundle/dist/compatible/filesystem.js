if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_push_js_baa3ea94__ from "core-js/modules/es.array.push.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_constructor_js_833f4df9__ from "core-js/modules/es.iterator.constructor.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_filter_js_abae28b4__ from "core-js/modules/es.iterator.filter.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_for_each_js_2628f2dd__ from "core-js/modules/es.iterator.for-each.js";
/******/ var __webpack_modules__ = ([
/* 0 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 1 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   uJ: function() { return /* binding */ DEFAULT_ENCODING; }
/* harmony export */ });
/* unused harmony exports CLI_COLOR, CLOSE_EVENT_NAMES, CONSOLE_METHODS, VALUE_COPY_SYMBOL, IGNORE_NULL_AND_UNDEFINED_SYMBOL, ABBREVIATIONS, ANIMATION_END_EVENT_NAMES, CLASS_TO_TYPE_MAPPING, KEY_CODES, KEYBOARD_CODES, LOCALES, PLAIN_OBJECT_PROTOTYPES, SPECIAL_REGEX_SEQUENCES, TRANSITION_END_EVENT_NAMES */
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module constants *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/var CLI_COLOR=(/* unused pure expression or super */ null && ({black:"\x1B[30m",blink:"\x1B[5m",blue:"\x1B[0;34m",bold:"\x1B[1m",cyan:"\x1B[36m",darkGray:"\x1B[0;90m",default:"\x1B[0m",dim:"\x1B[2m",green:"\x1B[32m",invert:"\x1B[7m",invisible:"\x1B[8m",lightBlue:"\x1B[0;94m",lightCyan:"\x1B[0;96m",lightGray:"\x1B[0;37m",lightGreen:"\x1B[0;92m",lightMagenta:"\x1B[0;95m",lightRed:"\x1B[0;91m",lightYellow:"\x1B[0;93m",magenta:"\x1B[35m",nodim:"\x1B[22m",noblink:"\x1B[25m",nobold:"\x1B[21m",noinvert:"\x1B[27m",noinvisible:"\x1B[28m",nounderline:"\x1B[24m",red:"\x1B[31m",underline:"\x1B[4m",white:"\x1B[37m",yellow:"\x1B[33m"}));var DEFAULT_ENCODING="utf8";var CLOSE_EVENT_NAMES=(/* unused pure expression or super */ null && (["close","exit","SIGINT","SIGTERM","SIGQUIT","uncaughtException"]));var CONSOLE_METHODS=(/* unused pure expression or super */ null && (["debug","error","info","log","warn"]));var VALUE_COPY_SYMBOL=Symbol.for("clientnodeValue");var IGNORE_NULL_AND_UNDEFINED_SYMBOL=Symbol.for("clientnodeIgnoreNullAndUndefined");// Lists all known abbreviation for proper camel case to delimited and back
// conversion.
var ABBREVIATIONS=(/* unused pure expression or super */ null && (["html","id","url","us","de","api","href"]));// Saves a string with all css3 browser specific animation end event names.
var ANIMATION_END_EVENT_NAMES="animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";// String representation to object type name mapping.
var CLASS_TO_TYPE_MAPPING=(/* unused pure expression or super */ null && ({"[object Array]":"array","[object Boolean]":"boolean","[object Date]":"date","[object Error]":"error","[object Function]":"function","[object Map]":"map","[object Number]":"number","[object Object]":"object","[object RegExp]":"regexp","[object Set]":"set","[object String]":"string"}));// Saves a mapping from key codes to their corresponding name.
var KEY_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:8,SPACE:32,TAB:9,DELETE:46,ENTER:13,COMMA:188,PERIOD:190,END:35,ESCAPE:27,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,HOME:36,NUMPAD_ADD:107,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,PAGE_UP:33,PAGE_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39}));var KEYBOARD_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:"Backspace",SPACE:"Space",TAB:"Tab",DELETE:"Delete",ENTER:"Enter",COMMA:"Comma",PERIOD:"Period",END:"End",ESCAPE:"Escape",F1:"F1",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",F10:"F10",F11:"F111",F12:"F12",HOME:"Home",NUMPAD_ADD:"NumpadAdd",NUMPAD_SUBTRACT:"NumpadSubtract",NUMPAD_DECIMAL:"NumpadDecimal",NUMPAD_DIVIDE:"NumpadDivide",NUMPAD_ENTER:"NumpadEnter",NUMPAD_MULTIPLY:"NumpadMultiply",PAGE_UP:"PageUp",PAGE_DOWN:"PageUp",UP:"ArrowUp",DOWN:"ArrowDown",LEFT:"ArrowLeft",RIGHT:"ArrowUp"}));var LOCALES=(/* unused pure expression or super */ null && ([]));var PLAIN_OBJECT_PROTOTYPES=[Object.prototype];// A list of special regular expression symbols.
var SPECIAL_REGEX_SEQUENCES=(/* unused pure expression or super */ null && (["-","[","]","(",")","^","$","*","+",".","{","}"]));// Saves a string with all css3 browser specific transition end event names.
var TRANSITION_END_EVENT_NAMES="transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";

/***/ }),
/* 3 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I5: function() { return /* binding */ optionalRequire; },
/* harmony export */   Sw: function() { return /* binding */ optionalImport; },
/* harmony export */   a8: function() { return /* binding */ determineGlobalContext; }
/* harmony export */ });
/* unused harmony exports currentRequire, setOptionalRequire, clearRequireCache, getCurrentRequire, isImportSyntaxSupported, isolatedRequire */
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* module decorator */ module = __webpack_require__.hmd(module);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module module *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e};function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(_defaults(r,GeneratorFunctionPrototype),_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}var determineGlobalContext=function determineGlobalContext(){if(typeof globalThis==="undefined"){if(typeof window==="undefined"){if(typeof __webpack_require__.g==="undefined")return  false?0:module;if(Object.prototype.hasOwnProperty.call(__webpack_require__.g,"window"))return __webpack_require__.g.window;return __webpack_require__.g}return window}return globalThis};var globalContext=determineGlobalContext();var currentRequire=typeof globalContext.require==="undefined"?null:globalContext.require;var optionalRequire;var setOptionalRequire=function setOptionalRequire(localCurrentRequire){optionalRequire=function optionalRequire(id){try{return localCurrentRequire?localCurrentRequire(id):null}catch(_unused){return null}}};setOptionalRequire(currentRequire);var clearRequireCache=function clearRequireCache(cache){if(cache===void 0){var _currentRequire;cache=((_currentRequire=currentRequire)===null||_currentRequire===void 0?void 0:_currentRequire.cache)||__webpack_require__.c}var backup={};for(var _i=0,_Object$entries=Object.entries(cache);_i<_Object$entries.length;_i++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i],2),key=_Object$entries$_i[0],_module=_Object$entries$_i[1];backup[key]=_module;delete cache[key]}return backup};// Make preprocessed require function available at runtime.
var getCurrentRequire=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _getCurrentRequire=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(){var _yield$import,createRequire,_t;return _regenerator().w(function(_context){while(1)switch(_context.p=_context.n){case 0:if(!currentRequire){_context.n=1;break}return _context.a(2,currentRequire);case 1:_context.p=1;_context.n=2;return import(/* webpackIgnore: true */"node:module");case 2:_yield$import=_context.v;createRequire=_yield$import.createRequire;currentRequire=createRequire(import.meta.url);setOptionalRequire(currentRequire);return _context.a(2,currentRequire);case 3:_context.p=3;_t=_context.v;console.error(_t);return _context.a(2,null)}},_callee,null,[[1,3]])}));function getCurrentRequire(){return _getCurrentRequire.apply(this,arguments)}return getCurrentRequire}()));var isImportSyntaxSupported=function isImportSyntaxSupported(){try{// eslint-disable-next-line @typescript-eslint/no-implied-eval
new Function("import(\"data:text/javascript,\")");return true}catch(_unused2){return false}};var isolatedRequire=function isolatedRequire(path,requireFunction){if(requireFunction===void 0){requireFunction=currentRequire||__webpack_require__(10)}var backup=clearRequireCache(requireFunction.cache);try{return requireFunction(path);// eslint-disable-next-line no-useless-catch
}catch(error){throw error}finally{restoreRequireCache(requireFunction.cache,backup)}};var optionalImport=/*#__PURE__*/function(){var _optionalImport=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(id,options){var _t2,_t3;return _regenerator().w(function(_context2){while(1)switch(_context2.p=_context2.n){case 0:if(options===void 0){options={}}_context2.p=1;if(!isImportSyntaxSupported()){_context2.n=3;break}_context2.n=2;return import(/* webpackIgnore: true */id,options);case 2:_t2=_context2.v;_context2.n=5;break;case 3:_context2.n=4;return Promise.resolve(null);case 4:_t2=_context2.v;case 5:return _context2.a(2,_t2);case 6:_context2.p=6;_t3=_context2.v;_context2.n=7;return Promise.resolve(null);case 7:return _context2.a(2,_context2.v)}},_callee2,null,[[1,6]])}));function optionalImport(_x,_x2){return _optionalImport.apply(this,arguments)}return optionalImport}();var restoreRequireCache=function restoreRequireCache(cache,backup){if(cache===void 0){var _currentRequire2;cache=((_currentRequire2=currentRequire)===null||_currentRequire2===void 0?void 0:_currentRequire2.cache)||__webpack_require__.c}clearRequireCache();for(var _i2=0,_Object$entries2=Object.entries(backup);_i2<_Object$entries2.length;_i2++){var _Object$entries2$_i=_slicedToArray(_Object$entries2[_i2],2),key=_Object$entries2$_i[0],_module2=_Object$entries2$_i[1];cache[key]=_module2}};

/***/ }),
/* 5 */,
/* 6 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 7 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tE: function() { return /* binding */ NOOP; }
/* harmony export */ });
/* unused harmony exports globalContext, setGlobalContext, MAXIMAL_NUMBER_OF_ITERATIONS, mockConsole */
/* unused harmony import specifier */ var CONSOLE_METHODS;
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module context *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/var _optionalRequire$defa,_optionalRequire;function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};var globalContext=(0,_module_js__WEBPACK_IMPORTED_MODULE_0__/* .determineGlobalContext */ .a8)();var setGlobalContext=function setGlobalContext(context){globalContext=context};globalContext.fetch=globalContext.fetch?globalContext.fetch.bind(globalContext):(_optionalRequire$defa=(_optionalRequire=(0,_module_js__WEBPACK_IMPORTED_MODULE_0__/* .optionalRequire */ .I5)("node-fetch"))===null||_optionalRequire===void 0?void 0:_optionalRequire.default)!==null&&_optionalRequire$defa!==void 0?_optionalRequire$defa:function(){for(var _len=arguments.length,parameters=new Array(_len),_key=0;_key<_len;_key++){parameters[_key]=arguments[_key]}return (0,_module_js__WEBPACK_IMPORTED_MODULE_0__/* .optionalImport */ .Sw)(/* webpackIgnore: true */"node-fetch").then(function(module){var _ref;return(_ref=module).default.apply(_ref,parameters)})};var MAXIMAL_NUMBER_OF_ITERATIONS=(/* unused pure expression or super */ null && ({value:100}));// A no-op dummy function.
var NOOP=function NOOP(){// Do nothing.
};var mockConsole=function mockConsole(){// Avoid errors in browsers that lack a console.
if(!Object.prototype.hasOwnProperty.call(globalContext,"console"))globalContext.console={};if(!globalContext.console)globalContext.console={};var _iterator=_createForOfIteratorHelper(CONSOLE_METHODS),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var methodName=_step.value;if(!(methodName in globalContext.console))globalContext.console[methodName]=NOOP}}catch(err){_iterator.e(err)}finally{_iterator.f()}};

/***/ }),
/* 10 */
/***/ (function(module) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 10;
module.exports = webpackEmptyContext;

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   L5: function() { return /* binding */ importFilesystemAPI; },
/* harmony export */   VW: function() { return /* binding */ imports; },
/* harmony export */   WY: function() { return /* binding */ isFileSync; },
/* harmony export */   Xp: function() { return /* binding */ copyFileSync; },
/* harmony export */   ZP: function() { return /* binding */ isDirectorySync; },
/* harmony export */   fo: function() { return /* binding */ isFile; },
/* harmony export */   hu: function() { return /* binding */ _walkDirectoryRecursivelySync; },
/* harmony export */   m3: function() { return /* binding */ copyFile; },
/* harmony export */   uD: function() { return /* binding */ copyDirectoryRecursiveSync; },
/* harmony export */   vX: function() { return /* binding */ copyDirectoryRecursive; },
/* harmony export */   wd: function() { return /* binding */ isDirectory; },
/* harmony export */   y3: function() { return /* binding */ _walkDirectoryRecursively; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module filesystem *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(_defaults(r,GeneratorFunctionPrototype),_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}};var imports={};var mkdirSync;var readdirSync;var readFileSync;var statSync;var writeFileSync;var mkdir;var readdir;var readFile;var stat;var writeFile;var basename;var join;var resolve;var importPromises=[];var importFilesystemAPI=function importFilesystemAPI(){if(importPromises.length>0)return Promise.all(importPromises);var fsImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_7__/* .optionalImport */ .Sw)("fs");void fsImportPromise.then(function(module){imports.fs=module;if(module){mkdirSync=module.mkdirSync;readdirSync=module.readdirSync;readFileSync=module.readFileSync;statSync=module.statSync;writeFileSync=module.writeFileSync}else{mkdirSync=null;readdirSync=null;readFileSync=null;statSync=null;writeFileSync=null}});var fsPromisesImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_7__/* .optionalImport */ .Sw)("fs/promises");void fsPromisesImportPromise.then(function(module){imports.fsPromises=module;if(module){mkdir=module.mkdir;readdir=module.readdir;readFile=module.readFile;stat=module.stat;writeFile=module.writeFile}else{mkdir=null;readdir=null;readFile=null;stat=null;writeFile=null}});var pathImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_7__/* .optionalImport */ .Sw)("path");void pathImportPromise.then(function(module){imports.path=module;if(module){basename=module.basename;join=module.join;resolve=module.resolve}else{basename=null;join=null;resolve=null}});importPromises.push(fsImportPromise,fsPromisesImportPromise,pathImportPromise);return Promise.all(importPromises)};/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param contents - Indicates whether we only want to copy content of source
 * path without recreating the sourcefile itself on target location.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Promise holding the determined target directory path.
 */var copyDirectoryRecursive=/*#__PURE__*/function(){var _copyDirectoryRecursive=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(sourcePath,targetPath,contents,callback,readOptions,writeOptions){var _iterator,_step,_currentSourceFile$st,currentSourceFile,currentTargetPath,_t,_t2,_t3,_t4,_t5;return _regenerator().w(function(_context){while(1)switch(_context.p=_context.n){case 0:if(contents===void 0){contents=false}if(callback===void 0){callback=_context_js__WEBPACK_IMPORTED_MODULE_6__/* .NOOP */ .tE}if(readOptions===void 0){readOptions={encoding:null,flag:"r"}}if(writeOptions===void 0){writeOptions={encoding:_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ,flag:"w",mode:438}}if(basename&&join&&mkdir&&resolve){_context.n=1;break}throw new Error("Could not load filesystem functions.");case 1:sourcePath=resolve(sourcePath);_t=!contents;if(!_t){_context.n=3;break}_context.n=2;return isDirectory(targetPath);case 2:_t=_context.v;case 3:if(!_t){_context.n=4;break}targetPath=resolve(targetPath,basename(sourcePath));case 4:_context.p=4;_context.n=5;return mkdir(targetPath);case 5:_context.n=7;break;case 6:_context.p=6;_t2=_context.v;if(!(_t2.code!=="EEXIST")){_context.n=7;break}throw _t2;case 7:_t3=_createForOfIteratorHelper;_context.n=8;return _walkDirectoryRecursively(sourcePath,callback);case 8:_iterator=_t3(_context.v);_context.p=9;_iterator.s();case 10:if((_step=_iterator.n()).done){_context.n=17;break}currentSourceFile=_step.value;currentTargetPath=join(targetPath,currentSourceFile.path.substring(sourcePath.length));if(!((_currentSourceFile$st=currentSourceFile.stats)!==null&&_currentSourceFile$st!==void 0&&_currentSourceFile$st.isDirectory())){_context.n=15;break}_context.p=11;_context.n=12;return mkdir(currentTargetPath);case 12:_context.n=14;break;case 13:_context.p=13;_t4=_context.v;if(!(_t4.code!=="EEXIST")){_context.n=14;break}throw _t4;case 14:_context.n=16;break;case 15:_context.n=16;return copyFile(currentSourceFile.path,currentTargetPath,readOptions,writeOptions);case 16:_context.n=10;break;case 17:_context.n=19;break;case 18:_context.p=18;_t5=_context.v;_iterator.e(_t5);case 19:_context.p=19;_iterator.f();return _context.f(19);case 20:return _context.a(2,targetPath)}},_callee,null,[[11,13],[9,18,19,20],[4,6]])}));function copyDirectoryRecursive(_x,_x2,_x3,_x4,_x5,_x6){return _copyDirectoryRecursive.apply(this,arguments)}return copyDirectoryRecursive}();/**
 * Copies given source directory via path to given target directory location
 * with same target name as source file has or copy to given complete target
 * directory path.
 * @param sourcePath - Path to directory to copy.
 * @param targetPath - Target directory or complete directory location to copy
 * in.
 * @param contents - Indicates whether we only want to copy content of source
 * path without recreating the sourcefile itself on target location.
 * @param callback - Function to invoke for each traversed file.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target directory path.
 */var copyDirectoryRecursiveSync=function copyDirectoryRecursiveSync(sourcePath,targetPath,contents,callback,readOptions,writeOptions){if(contents===void 0){contents=false}if(callback===void 0){callback=_context_js__WEBPACK_IMPORTED_MODULE_6__/* .NOOP */ .tE}if(readOptions===void 0){readOptions={encoding:null,flag:"r"}}if(writeOptions===void 0){writeOptions={encoding:_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ,flag:"w",mode:438}}if(!(basename&&join&&mkdirSync&&resolve))throw new Error("Could not load filesystem functions.");sourcePath=resolve(sourcePath);if(!contents&&isDirectorySync(targetPath))targetPath=resolve(targetPath,basename(sourcePath));// NOTE: Try/Check if target folder needs to be created.
try{mkdirSync(targetPath)}catch(error){if(error.code!=="EEXIST")throw error}for(var _i=0,_walkDirectoryRecursi=_walkDirectoryRecursivelySync(sourcePath,callback);_i<_walkDirectoryRecursi.length;_i++){var _currentSourceFile$st2;var currentSourceFile=_walkDirectoryRecursi[_i];var currentTargetPath=join(targetPath,currentSourceFile.path.substring(sourcePath.length));if((_currentSourceFile$st2=currentSourceFile.stats)!==null&&_currentSourceFile$st2!==void 0&&_currentSourceFile$st2.isDirectory())try{mkdirSync(currentTargetPath)}catch(error){if(error.code!=="EEXIST")throw error}else copyFileSync(currentSourceFile.path,currentTargetPath,readOptions,writeOptions)}return targetPath};/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */var copyFile=/*#__PURE__*/function(){var _copyFile=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(sourcePath,targetPath,readOptions,writeOptions){var _t6,_t7;return _regenerator().w(function(_context2){while(1)switch(_context2.n){case 0:if(readOptions===void 0){readOptions={encoding:null,flag:"r"}}if(writeOptions===void 0){writeOptions={encoding:_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ,flag:"w",mode:438}}if(basename&&readFile&&resolve&&writeFile){_context2.n=1;break}throw new Error("Could not load filesystem functions.");case 1:_context2.n=2;return isDirectory(targetPath);case 2:if(!_context2.v){_context2.n=3;break}targetPath=resolve(targetPath,basename(sourcePath));case 3:_t6=writeFile;_t7=targetPath;_context2.n=4;return readFile(sourcePath,readOptions);case 4:_context2.n=5;return _t6(_t7,_context2.v,writeOptions);case 5:return _context2.a(2,targetPath)}},_callee2)}));function copyFile(_x7,_x8,_x9,_x0){return _copyFile.apply(this,arguments)}return copyFile}();/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */var copyFileSync=function copyFileSync(sourcePath,targetPath,readOptions,writeOptions){if(readOptions===void 0){readOptions={encoding:null,flag:"r"}}if(writeOptions===void 0){writeOptions={encoding:_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ,flag:"w",mode:438}}if(!(basename&&readFileSync&&resolve&&writeFileSync))throw new Error("Could not load filesystem functions.");/*
        NOTE: If target path references a directory a new file with the same
        name will be created.
    */if(isDirectorySync(targetPath))targetPath=resolve(targetPath,basename(sourcePath));writeFileSync(targetPath,readFileSync(sourcePath,readOptions),writeOptions);return targetPath};/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */var isDirectory=/*#__PURE__*/function(){var _isDirectory=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(filePath){var _t8;return _regenerator().w(function(_context3){while(1)switch(_context3.p=_context3.n){case 0:if(stat){_context3.n=1;break}throw new Error("Could not load filesystem functions.");case 1:_context3.p=1;_context3.n=2;return stat(filePath);case 2:return _context3.a(2,_context3.v.isDirectory());case 3:_context3.p=3;_t8=_context3.v;if(!(Object.prototype.hasOwnProperty.call(_t8,"code")&&["ENOENT","ENOTDIR"].includes(_t8.code))){_context3.n=4;break}return _context3.a(2,false);case 4:throw _t8;case 5:return _context3.a(2)}},_callee3,null,[[1,3]])}));function isDirectory(_x1){return _isDirectory.apply(this,arguments)}return isDirectory}();/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A boolean which indicates directory existence.
 */var isDirectorySync=function isDirectorySync(filePath){if(!statSync)throw new Error("Could not load filesystem functions.");try{return statSync(filePath).isDirectory()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */var isFile=/*#__PURE__*/function(){var _isFile=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(filePath){var _t9;return _regenerator().w(function(_context4){while(1)switch(_context4.p=_context4.n){case 0:if(stat){_context4.n=1;break}throw new Error("Could not load filesystem functions.");case 1:_context4.p=1;_context4.n=2;return stat(filePath);case 2:return _context4.a(2,_context4.v.isFile());case 3:_context4.p=3;_t9=_context4.v;if(!(Object.prototype.hasOwnProperty.call(_t9,"code")&&["ENOENT","ENOTDIR"].includes(_t9.code))){_context4.n=4;break}return _context4.a(2,false);case 4:throw _t9;case 5:return _context4.a(2)}},_callee4,null,[[1,3]])}));function isFile(_x10){return _isFile.apply(this,arguments)}return isFile}();/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to file.
 * @returns A boolean which indicates file existence.
 */var isFileSync=function isFileSync(filePath){if(!statSync)throw new Error("Could not load filesystem functions.");try{return statSync(filePath).isFile()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding stat
 * object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file and potentially
 * manipulate further traversing in alphabetical sorted order.
 * If it returns "null" or a promise resolving to "null", no further files
 * will be traversed afterward.
 * If it handles a directory and returns "false" or a promise resolving to
 * "false" no traversing into that directory will occur.
 * @param options - Options to use for nested "readdir" calls.
 * @returns A promise holding the determined files.
 */var _walkDirectoryRecursively=/*#__PURE__*/function(){var _walkDirectoryRecursively2=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(directoryPath,callback,options){var files,_iterator2,_step2,directoryEntry,filePath,_file,finalFiles,_i2,_files,_file$stats,file,result,_t0,_t1,_t10,_t11;return _regenerator().w(function(_context5){while(1)switch(_context5.p=_context5.n){case 0:if(callback===void 0){callback=null}if(options===void 0){options=_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ}if(readdir&&resolve&&stat){_context5.n=1;break}throw new Error("Could not load filesystem functions.");case 1:files=[];_t0=_createForOfIteratorHelper;_context5.n=2;return readdir(directoryPath,typeof options==="string"?{encoding:options,withFileTypes:true}:_objectSpread(_objectSpread({},options),{},{withFileTypes:true}));case 2:_iterator2=_t0(_context5.v);_context5.p=3;_iterator2.s();case 4:if((_step2=_iterator2.n()).done){_context5.n=10;break}directoryEntry=_step2.value;filePath=resolve(directoryPath,directoryEntry.name);_file={directoryPath:directoryPath,directoryEntry:directoryEntry,error:null,name:directoryEntry.name,path:filePath,stats:null};_context5.p=5;_context5.n=6;return stat(filePath);case 6:_file.stats=_context5.v;_context5.n=8;break;case 7:_context5.p=7;_t1=_context5.v;_file.error=_t1;case 8:files.push(_file);case 9:_context5.n=4;break;case 10:_context5.n=12;break;case 11:_context5.p=11;_t10=_context5.v;_iterator2.e(_t10);case 12:_context5.p=12;_iterator2.f();return _context5.f(12);case 13:if(callback)/*
            NOTE: Directories and have to be iterated first to be able to
            avoid deeper unwanted traversing.
        */files.sort(function(firstFile,secondFile){var _firstFile$stats,_secondFile$stats2;if((_firstFile$stats=firstFile.stats)!==null&&_firstFile$stats!==void 0&&_firstFile$stats.isDirectory()){var _secondFile$stats;if((_secondFile$stats=secondFile.stats)!==null&&_secondFile$stats!==void 0&&_secondFile$stats.isDirectory())return 0;return-1}if((_secondFile$stats2=secondFile.stats)!==null&&_secondFile$stats2!==void 0&&_secondFile$stats2.isDirectory())return 1;return 0});finalFiles=[];_i2=0,_files=files;case 14:if(!(_i2<_files.length)){_context5.n=21;break}file=_files[_i2];finalFiles.push(file);result=callback?callback(file):undefined;if(!(result===null)){_context5.n=15;break}return _context5.a(3,21);case 15:if(!(_typeof(result)==="object"&&"then"in result)){_context5.n=17;break}_context5.n=16;return result;case 16:result=_context5.v;case 17:if(!(result===null)){_context5.n=18;break}return _context5.a(3,21);case 18:if(!(result!==false&&(_file$stats=file.stats)!==null&&_file$stats!==void 0&&_file$stats.isDirectory())){_context5.n=20;break}_t11=finalFiles;_context5.n=19;return _walkDirectoryRecursively(file.path,callback,options);case 19:finalFiles=_t11.concat.call(_t11,_context5.v);case 20:_i2++;_context5.n=14;break;case 21:return _context5.a(2,finalFiles)}},_callee5,null,[[5,7],[3,11,12,13]])}));function walkDirectoryRecursively(_x11,_x12,_x13){return _walkDirectoryRecursively2.apply(this,arguments)}return walkDirectoryRecursively}();/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding
 * stats object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file.
 * @param options - Options to use for nested "readdir" calls.
 * @returns Determined list if all files.
 */var _walkDirectoryRecursivelySync=function walkDirectoryRecursivelySync(directoryPath,callback,options){if(callback===void 0){callback=_context_js__WEBPACK_IMPORTED_MODULE_6__/* .NOOP */ .tE}if(options===void 0){options=_constants_js__WEBPACK_IMPORTED_MODULE_5__/* .DEFAULT_ENCODING */ .uJ}if(!(readdirSync&&resolve&&statSync))throw new Error("Could not load filesystem functions.");var files=[];var _iterator3=_createForOfIteratorHelper(readdirSync(directoryPath,typeof options==="string"?{encoding:options,withFileTypes:true}:_objectSpread(_objectSpread({},options),{},{withFileTypes:true}))),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var directoryEntry=_step3.value;var filePath=resolve(directoryPath,directoryEntry.name);var _file2={directoryPath:directoryPath,directoryEntry:directoryEntry,error:null,name:directoryEntry.name,path:filePath,stats:null};try{_file2.stats=statSync(filePath)}catch(error){_file2.error=error}files.push(_file2)}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}var finalFiles=[];if(callback){/*
            NOTE: Directories have to be iterated first to potentially
            avoid deeper iterations.
        */files.sort(function(firstFile,secondFile){var _firstFile$stats2,_secondFile$stats4;if((_firstFile$stats2=firstFile.stats)!==null&&_firstFile$stats2!==void 0&&_firstFile$stats2.isDirectory()){var _secondFile$stats3;if((_secondFile$stats3=secondFile.stats)!==null&&_secondFile$stats3!==void 0&&_secondFile$stats3.isDirectory())return 0;return-1}if((_secondFile$stats4=secondFile.stats)!==null&&_secondFile$stats4!==void 0&&_secondFile$stats4.isDirectory())return 1;return 0});var _iterator4=_createForOfIteratorHelper(files),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var _file$stats2;var file=_step4.value;finalFiles.push(file);var result=callback(file);if(result===null)break;if(result!==false&&(_file$stats2=file.stats)!==null&&_file$stats2!==void 0&&_file$stats2.isDirectory())finalFiles=finalFiles.concat(_walkDirectoryRecursivelySync(file.path,callback,options))}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}}return finalFiles};

/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/******/ // expose the module cache
/******/ __webpack_require__.c = __webpack_module_cache__;
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ !function() {
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = function(exports, definition) {
/******/ 		if(Array.isArray(definition)) {
/******/ 			var i = 0;
/******/ 			while(i < definition.length) {
/******/ 				var key = definition[i++];
/******/ 				var binding = definition[i++];
/******/ 				if(!__webpack_require__.o(exports, key)) {
/******/ 					if(binding === 0) {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, value: definition[i++] });
/******/ 					} else {
/******/ 						Object.defineProperty(exports, key, { enumerable: true, get: binding });
/******/ 					}
/******/ 				} else if(binding === 0) { i++; }
/******/ 			}
/******/ 		} else {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/global */
/******/ !function() {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ }();
/******/ 
/******/ /* webpack/runtime/harmony module decorator */
/******/ !function() {
/******/ 	__webpack_require__.hmd = function(module) {
/******/ 		module = Object.create(module);
/******/ 		if (!module.children) module.children = [];
/******/ 		Object.defineProperty(module, 'exports', {
/******/ 			enumerable: true,
/******/ 			set: function() {
/******/ 				throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 			}
/******/ 		});
/******/ 		return module;
/******/ 	};
/******/ }();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/************************************************************************/
/******/ 
/******/ // module cache are used so entry inlining is disabled
/******/ // startup
/******/ // Load entry module and return exports
/******/ var __webpack_exports__ = __webpack_require__(29);
/******/ var __webpack_exports__copyDirectoryRecursive = __webpack_exports__.vX;
/******/ var __webpack_exports__copyDirectoryRecursiveSync = __webpack_exports__.uD;
/******/ var __webpack_exports__copyFile = __webpack_exports__.m3;
/******/ var __webpack_exports__copyFileSync = __webpack_exports__.Xp;
/******/ var __webpack_exports__importFilesystemAPI = __webpack_exports__.L5;
/******/ var __webpack_exports__imports = __webpack_exports__.VW;
/******/ var __webpack_exports__isDirectory = __webpack_exports__.wd;
/******/ var __webpack_exports__isDirectorySync = __webpack_exports__.ZP;
/******/ var __webpack_exports__isFile = __webpack_exports__.fo;
/******/ var __webpack_exports__isFileSync = __webpack_exports__.WY;
/******/ var __webpack_exports__walkDirectoryRecursively = __webpack_exports__.y3;
/******/ var __webpack_exports__walkDirectoryRecursivelySync = __webpack_exports__.hu;
/******/ export { __webpack_exports__copyDirectoryRecursive as copyDirectoryRecursive, __webpack_exports__copyDirectoryRecursiveSync as copyDirectoryRecursiveSync, __webpack_exports__copyFile as copyFile, __webpack_exports__copyFileSync as copyFileSync, __webpack_exports__importFilesystemAPI as importFilesystemAPI, __webpack_exports__imports as imports, __webpack_exports__isDirectory as isDirectory, __webpack_exports__isDirectorySync as isDirectorySync, __webpack_exports__isFile as isFile, __webpack_exports__isFileSync as isFileSync, __webpack_exports__walkDirectoryRecursively as walkDirectoryRecursively, __webpack_exports__walkDirectoryRecursivelySync as walkDirectoryRecursivelySync };
/******/ 

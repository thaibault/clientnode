if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_push_js_baa3ea94__ from "core-js/modules/es.array.push.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_constructor_js_833f4df9__ from "core-js/modules/es.iterator.constructor.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_filter_js_abae28b4__ from "core-js/modules/es.iterator.filter.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_for_each_js_2628f2dd__ from "core-js/modules/es.iterator.for-each.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_map_js_b8c7c9ee__ from "core-js/modules/es.iterator.map.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_reduce_js_64e0ffd5__ from "core-js/modules/es.iterator.reduce.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_some_js_c8a39cc8__ from "core-js/modules/es.iterator.some.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_json_stringify_js_ab8145f9__ from "core-js/modules/es.json.stringify.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_map_get_or_insert_computed_js_7751ea4f__ from "core-js/modules/es.map.get-or-insert-computed.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_map_get_or_insert_js_7d374552__ from "core-js/modules/es.map.get-or-insert.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_regexp_flags_js_c0be7d17__ from "core-js/modules/es.regexp.flags.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_difference_v2_js_c7777eb4__ from "core-js/modules/es.set.difference.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_intersection_v2_js_fd73acd5__ from "core-js/modules/es.set.intersection.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_is_disjoint_from_v2_js_19c2c792__ from "core-js/modules/es.set.is-disjoint-from.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_is_subset_of_v2_js_de1a6459__ from "core-js/modules/es.set.is-subset-of.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_is_superset_of_v2_js_5d5cb0e4__ from "core-js/modules/es.set.is-superset-of.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_symmetric_difference_v2_js_bcbc0051__ from "core-js/modules/es.set.symmetric-difference.v2.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_set_union_v2_js_b973f519__ from "core-js/modules/es.set.union.v2.js";
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
/* harmony export */   FI: function() { return /* binding */ SPECIAL_REGEX_SEQUENCES; },
/* harmony export */   Fp: function() { return /* binding */ VALUE_COPY_SYMBOL; },
/* harmony export */   jE: function() { return /* binding */ PLAIN_OBJECT_PROTOTYPES; },
/* harmony export */   p_: function() { return /* binding */ IGNORE_NULL_AND_UNDEFINED_SYMBOL; },
/* harmony export */   rq: function() { return /* binding */ CLASS_TO_TYPE_MAPPING; }
/* harmony export */ });
/* unused harmony exports CLI_COLOR, DEFAULT_ENCODING, CLOSE_EVENT_NAMES, CONSOLE_METHODS, ABBREVIATIONS, ANIMATION_END_EVENT_NAMES, KEY_CODES, KEYBOARD_CODES, LOCALES, TRANSITION_END_EVENT_NAMES */
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
var CLASS_TO_TYPE_MAPPING={"[object Array]":"array","[object Boolean]":"boolean","[object Date]":"date","[object Error]":"error","[object Function]":"function","[object Map]":"map","[object Number]":"number","[object Object]":"object","[object RegExp]":"regexp","[object Set]":"set","[object String]":"string"};// Saves a mapping from key codes to their corresponding name.
var KEY_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:8,SPACE:32,TAB:9,DELETE:46,ENTER:13,COMMA:188,PERIOD:190,END:35,ESCAPE:27,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,HOME:36,NUMPAD_ADD:107,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,PAGE_UP:33,PAGE_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39}));var KEYBOARD_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:"Backspace",SPACE:"Space",TAB:"Tab",DELETE:"Delete",ENTER:"Enter",COMMA:"Comma",PERIOD:"Period",END:"End",ESCAPE:"Escape",F1:"F1",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",F10:"F10",F11:"F111",F12:"F12",HOME:"Home",NUMPAD_ADD:"NumpadAdd",NUMPAD_SUBTRACT:"NumpadSubtract",NUMPAD_DECIMAL:"NumpadDecimal",NUMPAD_DIVIDE:"NumpadDivide",NUMPAD_ENTER:"NumpadEnter",NUMPAD_MULTIPLY:"NumpadMultiply",PAGE_UP:"PageUp",PAGE_DOWN:"PageUp",UP:"ArrowUp",DOWN:"ArrowDown",LEFT:"ArrowLeft",RIGHT:"ArrowUp"}));var LOCALES=(/* unused pure expression or super */ null && ([]));var PLAIN_OBJECT_PROTOTYPES=[Object.prototype];// A list of special regular expression symbols.
var SPECIAL_REGEX_SEQUENCES=["-","[","]","(",")","^","$","*","+",".","{","}"];// Saves a string with all css3 browser specific transition end event names.
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
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Do: function() { return /* binding */ _represent; },
/* harmony export */   Sj: function() { return /* binding */ determineType; },
/* harmony export */   aI: function() { return /* binding */ _equals; }
/* harmony export */ });
/* unused harmony exports addDynamicGetterAndSetter, convertCircularObjectToJSON, convertMapToPlainObject, convertPlainObjectToMap, convertSubstringInPlainObject, copy, evaluateAsyncDynamicData, evaluateDynamicData, removeKeysInEvaluation, extend, getProxyHandler, mask, modifyObject, removeKeyPrefixes, sort, unwrapProxy */
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var core_js_modules_es_iterator_reduce_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(20);
/* harmony import */ var core_js_modules_es_iterator_some_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(11);
/* harmony import */ var core_js_modules_es_json_stringify_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(21);
/* harmony import */ var core_js_modules_es_map_get_or_insert_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(22);
/* harmony import */ var core_js_modules_es_map_get_or_insert_computed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(23);
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(24);
/* harmony import */ var core_js_modules_es_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(12);
/* harmony import */ var core_js_modules_es_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(13);
/* harmony import */ var core_js_modules_es_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(15);
/* harmony import */ var core_js_modules_es_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_set_union_v2_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(18);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(2);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(8);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(25);
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(19);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module object *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(_defaults(r,GeneratorFunctionPrototype),_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)};function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)};/**
 * Adds dynamic getter and setter to any given data structure such as maps.
 * @param object - Object to proxy.
 * @param getterWrapper - Function to wrap each property get.
 * @param setterWrapper - Function to wrap each property set.
 * @param methodNames - Method names to perform actions on the given
 * object.
 * @param deep - Indicates to perform a deep wrapping of specified types.
 * @param typesToExtend - Types which should be extended (Checks are
 * performed via "value instanceof type".).
 * @returns Returns given object wrapped with a dynamic getter proxy.
 */var _addDynamicGetterAndSetter=function addDynamicGetterAndSetter(object,getterWrapper,setterWrapper,methodNames,deep,typesToExtend){if(getterWrapper===void 0){getterWrapper=null}if(setterWrapper===void 0){setterWrapper=null}if(methodNames===void 0){methodNames={}}if(deep===void 0){deep=true}if(typesToExtend===void 0){typesToExtend=[Object]}if(deep&&_typeof(object)==="object")if(Array.isArray(object)){var index=0;var _iterator=_createForOfIteratorHelper(object),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var value=_step.value;object[index]=_addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep);index+=1}}catch(err){_iterator.e(err)}finally{_iterator.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _iterator2=_createForOfIteratorHelper(object),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var _step2$value=_slicedToArray(_step2.value,2),key=_step2$value[0],_value=_step2$value[1];object.set(key,_addDynamicGetterAndSetter(_value,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var cache=[];var _iterator3=_createForOfIteratorHelper(object),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var _value3=_step3.value;object.delete(_value3);cache.push(_addDynamicGetterAndSetter(_value3,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}for(var _i=0,_cache=cache;_i<_cache.length;_i++){var _value2=_cache[_i];object.add(_value2)}}else if(object!==null)for(var _i2=0,_Object$entries=Object.entries(object);_i2<_Object$entries.length;_i2++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i2],2),_key=_Object$entries$_i[0],_value4=_Object$entries$_i[1];object[_key]=_addDynamicGetterAndSetter(_value4,getterWrapper,setterWrapper,methodNames,deep)}if(getterWrapper||setterWrapper){var _iterator4=_createForOfIteratorHelper(typesToExtend),_step4;try{var _loop=function _loop(){var type=_step4.value;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(object)&&object instanceof type){var defaultHandler=getProxyHandler(object,methodNames);var handler=getProxyHandler(object,methodNames);if(getterWrapper)handler.get=function(_target,name){if(name==="__target__")return object;if(name==="__revoke__")return function(){revoke();return object};if(typeof object[name]==="function")return object[name];return getterWrapper(defaultHandler.get(proxy,name),name,object)};if(setterWrapper)handler.set=function(_target,name,value){return defaultHandler.set(proxy,name,setterWrapper(name,value,object))};var _Proxy$revocable=Proxy.revocable({},handler),proxy=_Proxy$revocable.proxy,revoke=_Proxy$revocable.revoke;return{v:proxy}}},_ret;for(_iterator4.s();!(_step4=_iterator4.n()).done;){_ret=_loop();if(_ret)return _ret.v}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}}return object};/**
 * Converts given object into its serialized JSON representation by
 * replacing circular references with a given provided value.
 *
 * This method traverses given object recursively and tracks of seen and
 * already serialized structures to reuse generated strings or mark a
 * circular reference.
 * @param object - Object to serialize.
 * @param determineCircularReferenceValue - Callback to create a fallback
 * value depending on given redundant value.
 * @param numberOfSpaces - Number of spaces to use for string formatting.
 * @returns The formatted JSON string.
 */var convertCircularObjectToJSON=function convertCircularObjectToJSON(object,determineCircularReferenceValue,numberOfSpaces){if(determineCircularReferenceValue===void 0){determineCircularReferenceValue=function determineCircularReferenceValue(serializedValue){return serializedValue!==null&&serializedValue!==void 0?serializedValue:"__circularReference__"}}if(numberOfSpaces===void 0){numberOfSpaces=0}var seenObjects=new Map;var stringifier=function stringifier(object){var _replacer=function replacer(key,value){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(value)){var _seenObjects$get;if(seenObjects.has(value))return determineCircularReferenceValue((_seenObjects$get=seenObjects.get(value))!==null&&_seenObjects$get!==void 0?_seenObjects$get:null,key,value,seenObjects);// NOTE: Set before traversing deeper to detect cycles.
seenObjects.set(value,null);var result;if(Array.isArray(value)){result=[];var _iterator5=_createForOfIteratorHelper(value),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var item=_step5.value;result.push(_replacer(null,item))}}catch(err){_iterator5.e(err)}finally{_iterator5.f()}}else{result={};for(var _i3=0,_Object$entries2=Object.entries(value);_i3<_Object$entries2.length;_i3++){var _Object$entries2$_i=_slicedToArray(_Object$entries2[_i3],2),name=_Object$entries2$_i[0],subValue=_Object$entries2$_i[1];result[name]=_replacer(name,subValue)}}seenObjects.set(value,result);return result}return value};return JSON.stringify(object,_replacer,numberOfSpaces)};return stringifier(object)};/**
 * Converts given map and all nested found maps objects to corresponding
 * object.
 * @param object - Map to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given map as object.
 */var _convertMapToPlainObject=function convertMapToPlainObject(object,deep){if(deep===void 0){deep=true}if(_typeof(object)==="object"){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var newObject={};var _iterator6=_createForOfIteratorHelper(object),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var _step6$value=_slicedToArray(_step6.value,2),key=_step6$value[0],value=_step6$value[1];if(deep)value=_convertMapToPlainObject(value,deep);if(["number","string"].includes(_typeof(key)))newObject[String(key)]=value}}catch(err){_iterator6.e(err)}finally{_iterator6.f()}return newObject}if(deep)if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(object))for(var _i4=0,_Object$entries3=Object.entries(object);_i4<_Object$entries3.length;_i4++){var _Object$entries3$_i=_slicedToArray(_Object$entries3[_i4],2),_key2=_Object$entries3$_i[0],_value5=_Object$entries3$_i[1];object[_key2]=_convertMapToPlainObject(_value5,deep)}else if(Array.isArray(object)){var index=0;for(var _i5=0,_arr=object;_i5<_arr.length;_i5++){var _value6=_arr[_i5];object[index]=_convertMapToPlainObject(_value6,deep);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var cache=[];var _iterator7=_createForOfIteratorHelper(object),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var _value8=_step7.value;object.delete(_value8);cache.push(_convertMapToPlainObject(_value8,deep))}}catch(err){_iterator7.e(err)}finally{_iterator7.f()}for(var _i6=0,_cache2=cache;_i6<_cache2.length;_i6++){var _value7=_cache2[_i6];object.add(_value7)}}}return object};/**
 * Converts given plain object and all nested found objects to
 * corresponding map.
 * @param object - Object to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given object as map.
 */var _convertPlainObjectToMap=function convertPlainObjectToMap(object,deep){if(deep===void 0){deep=true}if(_typeof(object)==="object"){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(object)){var newObject=new Map;for(var _i7=0,_Object$entries4=Object.entries(object);_i7<_Object$entries4.length;_i7++){var _Object$entries4$_i=_slicedToArray(_Object$entries4[_i7],2),key=_Object$entries4$_i[0],value=_Object$entries4$_i[1];if(deep)object[key]=_convertPlainObjectToMap(value,deep);newObject.set(key,object[key])}return newObject}if(deep)if(Array.isArray(object)){var index=0;for(var _i8=0,_arr2=object;_i8<_arr2.length;_i8++){var _value9=_arr2[_i8];object[index]=_convertPlainObjectToMap(_value9,deep);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _iterator8=_createForOfIteratorHelper(object),_step8;try{for(_iterator8.s();!(_step8=_iterator8.n()).done;){var _step8$value=_slicedToArray(_step8.value,2),_key3=_step8$value[0],_value0=_step8$value[1];object.set(_key3,_convertPlainObjectToMap(_value0,deep))}}catch(err){_iterator8.e(err)}finally{_iterator8.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var cache=[];var _iterator9=_createForOfIteratorHelper(object),_step9;try{for(_iterator9.s();!(_step9=_iterator9.n()).done;){var _value10=_step9.value;object.delete(_value10);cache.push(_convertPlainObjectToMap(_value10,deep))}}catch(err){_iterator9.e(err)}finally{_iterator9.f()}for(var _i9=0,_cache3=cache;_i9<_cache3.length;_i9++){var _value1=_cache3[_i9];object.add(_value1)}}}return object};/**
 * Replaces given pattern in each value in given object recursively with
 * given string replacement.
 * @param object - Object to convert substrings in.
 * @param pattern - Regular expression to replace.
 * @param replacement - String to use as replacement for found patterns.
 * @returns Converted object with replaced patterns.
 */var _convertSubstringInPlainObject=function convertSubstringInPlainObject(object,pattern,replacement){for(var _i0=0,_Object$entries5=Object.entries(object);_i0<_Object$entries5.length;_i0++){var _Object$entries5$_i=_slicedToArray(_Object$entries5[_i0],2),key=_Object$entries5$_i[0],value=_Object$entries5$_i[1];if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(value))object[key]=_convertSubstringInPlainObject(value,pattern,replacement);else if(typeof value==="string")object[key]=value.replace(pattern,replacement)}return object};/* eslint-disable jsdoc/require-description-complete-sentence *//**
 * Copies given object (of any type) into optionally given destination.
 * @param source - Object to copy.
 * @param copyBlobs - Determines whether to copy blobs as well.
 * @param recursionLimit - Specifies how deep we should traverse into given
 * object recursively.
 * @param recursionEndValue - Indicates which value to use for recursion ends.
 * Usually a reference to corresponding source value will be used.
 * @param destination - Target to copy source to.
 * @param cyclic - Indicates whether known sub structures should be copied or
 * referenced (if "true" endless loops can occur if source has cyclic
 * structures).
 * @param knownReferences - Used to avoid traversing loops and not to copy
 * references e.g. to objects not to copy (e.g. symbol polyfills).
 * @param recursionLevel - Internally used to track current recursion level in
 * given source data structure.
 * @returns Value "true" if both objects are equal and "false" otherwise.
 */var _copy=function copy(source,copyBlobs,recursionLimit,recursionEndValue,destination,cyclic,knownReferences,recursionLevel){if(copyBlobs===void 0){copyBlobs=false}if(recursionLimit===void 0){recursionLimit=-1}if(recursionEndValue===void 0){recursionEndValue=_constants_js__WEBPACK_IMPORTED_MODULE_18__/* .VALUE_COPY_SYMBOL */ .Fp}if(destination===void 0){destination=null}if(cyclic===void 0){cyclic=false}if(knownReferences===void 0){knownReferences=[]}if(recursionLevel===void 0){recursionLevel=0}/* eslint-enable jsdoc/require-description-complete-sentence */if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(source))if(destination){if(source===destination)throw new Error("Can't copy because source and destination are "+"identical.");if(!cyclic&&![undefined,null].includes(source)){var index=knownReferences.indexOf(source);if(index!==-1)return knownReferences[index];knownReferences.push(source)}var copyValue=function copyValue(value){if(recursionLimit!==-1&&recursionLimit<recursionLevel+1)return recursionEndValue===_constants_js__WEBPACK_IMPORTED_MODULE_18__/* .VALUE_COPY_SYMBOL */ .Fp?value:recursionEndValue;var result=_copy(value,copyBlobs,recursionLimit,recursionEndValue,null,cyclic,knownReferences,recursionLevel+1);if(!cyclic&&![undefined,null].includes(value)&&_typeof(value)==="object")knownReferences.push(value);return result};if(Array.isArray(source)){var _iterator0=_createForOfIteratorHelper(source),_step0;try{for(_iterator0.s();!(_step0=_iterator0.n()).done;){var item=_step0.value;destination.push(copyValue(item))}}catch(err){_iterator0.e(err)}finally{_iterator0.f()}}else if(source instanceof Map){var _iterator1=_createForOfIteratorHelper(source),_step1;try{for(_iterator1.s();!(_step1=_iterator1.n()).done;){var _step1$value=_slicedToArray(_step1.value,2),key=_step1$value[0],value=_step1$value[1];destination.set(key,copyValue(value))}}catch(err){_iterator1.e(err)}finally{_iterator1.f()}}else if(source instanceof Set){var _iterator10=_createForOfIteratorHelper(source),_step10;try{for(_iterator10.s();!(_step10=_iterator10.n()).done;){var _value11=_step10.value;destination.add(copyValue(_value11))}}catch(err){_iterator10.e(err)}finally{_iterator10.f()}}else for(var _i1=0,_Object$entries6=Object.entries(source);_i1<_Object$entries6.length;_i1++){var _Object$entries6$_i=_slicedToArray(_Object$entries6[_i1],2),_key4=_Object$entries6$_i[0],_value12=_Object$entries6$_i[1];try{destination[_key4]=copyValue(_value12)}catch(error){throw new Error("Failed to copy property value object \""+"".concat(_key4,"\": ").concat(_represent(error)),{cause:error})}}}else{if(Array.isArray(source))return _copy(source,copyBlobs,recursionLimit,recursionEndValue,[],cyclic,knownReferences,recursionLevel);if(source instanceof Map)return _copy(source,copyBlobs,recursionLimit,recursionEndValue,new Map,cyclic,knownReferences,recursionLevel);if(source instanceof Set)return _copy(source,copyBlobs,recursionLimit,recursionEndValue,new Set,cyclic,knownReferences,recursionLevel);if(source instanceof Date)return new Date(source.getTime());if(source instanceof RegExp){var modifier=/[^/]*$/.exec(source.toString());destination=new RegExp(source.source,modifier?modifier[0]:undefined);destination.lastIndex=source.lastIndex;return destination}if(typeof Blob!=="undefined"&&source instanceof Blob)return copyBlobs?source.slice(0,source.size,source.type):source;return _copy(source,copyBlobs,recursionLimit,recursionEndValue,{},cyclic,knownReferences,recursionLevel)}return destination||source};/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param value - Value to analyze.
 * @returns Name of determined type.
 */var determineType=function determineType(value){if([null,undefined].includes(value))return String(value);var type=_typeof(value);if(["function","object"].includes(type)&&"toString"in value){var stringRepresentation=Object.prototype.toString.call(value);if(Object.prototype.hasOwnProperty.call(_constants_js__WEBPACK_IMPORTED_MODULE_18__/* .CLASS_TO_TYPE_MAPPING */ .rq,stringRepresentation))return _constants_js__WEBPACK_IMPORTED_MODULE_18__/* .CLASS_TO_TYPE_MAPPING */ .rq[stringRepresentation]}return type};/**
 * Returns true if given items are equal for given property list. If
 * property list isn't set all properties will be checked. All keys which
 * starts with one of the exception prefixes will be omitted.
 * @param firstValue - First object to compare.
 * @param secondValue - Second object to compare.
 * @param givenOptions - Options to define how to compare.
 * @param givenOptions.properties - Property names to check. Check all if
 * "null" is selected (default).
 * @param givenOptions.deep - Recursion depth negative values means
 * infinitely deep (default).
 * @param givenOptions.exceptionPrefixes - Property prefixes which
 * indicates properties to ignore.
 * @param givenOptions.ignoreFunctions - Indicates whether functions have
 * to be identical to interpret is as equal. If set to "true" two functions
 * will be assumed to be equal (default).
 * @param givenOptions.compareBlobs - Indicates whether binary data should
 * be converted to a base64 string to compare their content. Makes this
 * function asynchronous in browsers and potentially takes a lot of
 * resources.
 * @returns Value "true" if both objects are equal and "false" otherwise.
 * If "compareBlobs" is activated, and we're running in a browser like
 * environment and binary data is given, then a promise wrapping the
 * determined boolean values is returned.
 */var _equals=function equals(firstValue,secondValue,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({compareBlobs:false,deep:-1,exceptionPrefixes:[],ignoreFunctions:true,properties:null,returnReasonIfNotEqual:false},givenOptions);if(options.ignoreFunctions&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isFunction */ .Tn)(firstValue)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isFunction */ .Tn)(secondValue)||firstValue===secondValue||(0,_number_js__WEBPACK_IMPORTED_MODULE_20__/* .isNotANumber */ .W2)(firstValue)&&(0,_number_js__WEBPACK_IMPORTED_MODULE_20__/* .isNotANumber */ .W2)(secondValue)||firstValue instanceof RegExp&&secondValue instanceof RegExp&&firstValue.toString()===secondValue.toString()&&firstValue.flags.split("").sort().join("")===secondValue.flags.split("").sort().join("")||firstValue instanceof Date&&secondValue instanceof Date&&(isNaN(firstValue.getTime())&&isNaN(secondValue.getTime())||!isNaN(firstValue.getTime())&&!isNaN(secondValue.getTime())&&firstValue.getTime()===secondValue.getTime())||options.compareBlobs&&eval("typeof Buffer")!=="undefined"&&Object.prototype.hasOwnProperty.call(eval("Buffer"),"isBuffer")&&firstValue instanceof eval("Buffer")&&secondValue instanceof eval("Buffer")&&firstValue.toString("base64")===secondValue.toString("base64"))return true;if(options.compareBlobs&&typeof Blob!=="undefined"&&firstValue instanceof Blob&&secondValue instanceof Blob)return new Promise(function(resolve){var values=[];for(var _i10=0,_arr3=[firstValue,secondValue];_i10<_arr3.length;_i10++){var value=_arr3[_i10];var fileReader=new FileReader;fileReader.onload=function(event){if(event.target===null)values.push(null);else values.push(event.target.result);if(values.length===2)if(values[0]===values[1])resolve(true);else resolve(options.returnReasonIfNotEqual?">>> Blob(".concat(_represent(values[0]),")  !== ")+"Blob(".concat(_represent(values[1]),")"):false)};fileReader.readAsDataURL(value)}});if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(firstValue)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(secondValue)&&!(firstValue instanceof RegExp||secondValue instanceof RegExp)||Array.isArray(firstValue)&&Array.isArray(secondValue)&&firstValue.length===secondValue.length||determineType(firstValue)===determineType(secondValue)&&["map","set"].includes(determineType(firstValue))&&firstValue.size===secondValue.size){var promises=[];for(var _i11=0,_arr4=[[firstValue,secondValue],[secondValue,firstValue]];_i11<_arr4.length;_i11++){var _arr4$_i=_slicedToArray(_arr4[_i11],2),first=_arr4$_i[0],second=_arr4$_i[1];var firstIsArray=Array.isArray(first);if(firstIsArray&&(!Array.isArray(second)||first.length!==second.length))return options.returnReasonIfNotEqual?".length":false;var firstIsMap=(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(first);if(firstIsMap&&(!(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;var firstIsSet=(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(first);if(firstIsSet&&(!(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;if(firstIsArray){var index=0;var _loop2=function _loop2(){var value=_arr5[_i12];if(options.deep!==0){var result=_equals(value,second[index],_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(!result)return{v:false};var currentIndex=index;var determineResult=function determineResult(result){var _$$result$;return typeof result==="string"?"[".concat(String(currentIndex),"]")+((_$$result$={"[":"",">":" "}[result[0]])!==null&&_$$result$!==void 0?_$$result$:".")+result:result};if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return{v:determineResult(result)}}index+=1},_ret2;for(var _i12=0,_arr5=first;_i12<_arr5.length;_i12++){_ret2=_loop2();if(_ret2)return _ret2.v}}else if(firstIsMap){var _iterator11=_createForOfIteratorHelper(first),_step11;try{var _loop3=function _loop3(){var _step11$value=_slicedToArray(_step11.value,2),key=_step11$value[0],value=_step11$value[1];if(options.deep!==0){var result=_equals(value,second.get(key),_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(!result)return{v:false};var determineResult=function determineResult(result){var _$$result$2;return typeof result==="string"?"get(".concat(_represent(key),")")+((_$$result$2={"[":"",">":" "}[result[0]])!==null&&_$$result$2!==void 0?_$$result$2:".")+result:result};if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return{v:determineResult(result)}}},_ret3;for(_iterator11.s();!(_step11=_iterator11.n()).done;){_ret3=_loop3();if(_ret3)return _ret3.v}}catch(err){_iterator11.e(err)}finally{_iterator11.f()}}else if(firstIsSet){var _iterator12=_createForOfIteratorHelper(first),_step12;try{var _loop4=function _loop4(){var value=_step12.value;if(options.deep!==0){var equal=false;var subPromises=[];/*
                            NOTE: Check if their exists at least one being
                            equally.
                        */var _iterator13=_createForOfIteratorHelper(second),_step13;try{for(_iterator13.s();!(_step13=_iterator13.n()).done;){var _secondValue=_step13.value;var result=_equals(value,_secondValue,_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(typeof result==="boolean"){if(result){equal=true;break}}else subPromises.push(result)}}catch(err){_iterator13.e(err)}finally{_iterator13.f()}var determineResult=function determineResult(equal){return equal?true:options.returnReasonIfNotEqual?">>> {-> ".concat(_represent(value)," not found}"):false};if(equal)/*
                                NOTE: We do not have to wait for promises to be
                                resolved when one match could be found.
                            */return 0;// continue
if(subPromises.length)promises.push(new Promise(function(resolve){Promise.all(subPromises).then(function(results){resolve(determineResult(results.some(function(result){return result})))},function(){// Do nothing.
})}));return{v:determineResult(false)}}},_ret4;for(_iterator12.s();!(_step12=_iterator12.n()).done;){_ret4=_loop4();if(_ret4===0)continue;if(_ret4)return _ret4.v}}catch(err){_iterator12.e(err)}finally{_iterator12.f()}}else{var _loop5=function _loop5(){var _Object$entries7$_i=_slicedToArray(_Object$entries7[_i13],2),key=_Object$entries7$_i[0],value=_Object$entries7$_i[1];if(options.properties&&!options.properties.includes(key))return 0;// break
var doBreak=false;var _iterator14=_createForOfIteratorHelper(options.exceptionPrefixes),_step14;try{for(_iterator14.s();!(_step14=_iterator14.n()).done;){var exceptionPrefix=_step14.value;if(key.startsWith(exceptionPrefix)){doBreak=true;break}}}catch(err){_iterator14.e(err)}finally{_iterator14.f()}if(doBreak)return 0;// break
if(options.deep!==0){var result=_equals(value,second[key],_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(!result)return{v:false};var determineResult=function determineResult(result){var _$$result$3;return typeof result==="string"?key+((_$$result$3={"[":"",">":" "}[result[0]])!==null&&_$$result$3!==void 0?_$$result$3:".")+result:result};if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return{v:determineResult(result)}}},_ret5;for(var _i13=0,_Object$entries7=Object.entries(first);_i13<_Object$entries7.length;_i13++){_ret5=_loop5();if(_ret5===0)break;if(_ret5)return _ret5.v}}}if(promises.length)return new Promise(function(resolve){Promise.all(promises).then(function(results){var _iterator15=_createForOfIteratorHelper(results),_step15;try{for(_iterator15.s();!(_step15=_iterator15.n()).done;){var result=_step15.value;if(!result||typeof result==="string"){resolve(result);break}}}catch(err){_iterator15.e(err)}finally{_iterator15.f()}resolve(true)},function(){// Do nothing.
})});return true}return options.returnReasonIfNotEqual?">>> ".concat(_represent(firstValue)," !== ").concat(_represent(secondValue)):false};/**
 * Searches for indicating keys and replaces that data with corresponding
 * evaluated and promise resolved value.
 * @param data - Given mapping to resolve.
 * @param givenOptions - Options to configure evaluation.
 * @param givenOptions.scope - Scope to use evaluate again.
 * @param givenOptions.selfReferenceName - Name to use for reference to given
 * object.
 * @param givenOptions.expressionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @param givenOptions.executionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @returns Evaluated given mapping.
 */var _evaluateAsyncDynamicData=/*#__PURE__*/function(){var _evaluateAsyncDynamicData2=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data,givenOptions){var options,result,index,_iterator16,_step16,item,_i14,_Object$entries8,_Object$entries8$_i,key,value,_t;return _regenerator().w(function(_context){while(1)switch(_context.p=_context.n){case 0:if(givenOptions===void 0){givenOptions={}}options=_objectSpread({scope:{},selfReferenceName:"self",expressionIndicatorKey:"__async_evaluate__",executionIndicatorKey:"__async_execute__"},givenOptions);if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(data)){_context.n=1;break}return _context.a(2,data);case 1:if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=data;result=data;if(!Array.isArray(data)){_context.n=10;break}index=0;_iterator16=_createForOfIteratorHelper(data);_context.p=2;_iterator16.s();case 3:if((_step16=_iterator16.n()).done){_context.n=6;break}item=_step16.value;_context.n=4;return _evaluateAsyncDynamicData(item,options);case 4:result[index]=_context.v;index+=1;case 5:_context.n=3;break;case 6:_context.n=8;break;case 7:_context.p=7;_t=_context.v;_iterator16.e(_t);case 8:_context.p=8;_iterator16.f();return _context.f(8);case 9:return _context.a(2,result);case 10:_i14=0,_Object$entries8=Object.entries(data);case 11:if(!(_i14<_Object$entries8.length)){_context.n=16;break}_Object$entries8$_i=_slicedToArray(_Object$entries8[_i14],2),key=_Object$entries8$_i[0],value=_Object$entries8$_i[1];if(![options.expressionIndicatorKey,options.executionIndicatorKey].includes(key)){_context.n=13;break}_context.n=12;return (0,_string_js__WEBPACK_IMPORTED_MODULE_21__/* .evaluateOrThrowError */ .VK)(value,{scope:options.scope,async:true,execute:key===options.executionIndicatorKey});case 12:return _context.a(2,_context.v);case 13:_context.n=14;return _evaluateAsyncDynamicData(value,options);case 14:result[key]=_context.v;case 15:_i14++;_context.n=11;break;case 16:return _context.a(2,result)}},_callee,null,[[2,7,8,9]])}));function evaluateAsyncDynamicData(_x,_x2){return _evaluateAsyncDynamicData2.apply(this,arguments)}return evaluateAsyncDynamicData}();/**
 * Wraps given data structure into proxies recursively to evaluate and resolve
 * each get request to data having an object with indicating keys and replaces
 * that object with corresponding evaluated values. All nested objects are
 * wrapped with a proxy to resolve chains of referencing expressions as well.
 * @param object - Given mapping to resolve.
 * @param givenOptions - Options to configure evaluation.
 * @param givenOptions.scope - Scope to use evaluate again.
 * @param givenOptions.selfReferenceName - Name to use for reference to given
 * object.
 * @param givenOptions.expressionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @param givenOptions.executionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @returns Evaluated given mapping.
 */var evaluateDynamicData=function evaluateDynamicData(object,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({scope:{},selfReferenceName:"self",expressionIndicatorKey:"__evaluate__",executionIndicatorKey:"__execute__"},givenOptions);if(_typeof(object)!=="object"||object===null)return object;if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=object;var internalEvaluateAndThrowError=function internalEvaluateAndThrowError(code,type){if(type===void 0){type=options.expressionIndicatorKey}return (0,_string_js__WEBPACK_IMPORTED_MODULE_21__/* .evaluateOrThrowError */ .VK)(code,{scope:options.scope,async:false,execute:type===options.executionIndicatorKey})};var _addProxyRecursively=function addProxyRecursively(data){if(_typeof(data)!=="object"||data===null||typeof Proxy==="undefined")return data;for(var _i15=0,_Object$entries9=Object.entries(data);_i15<_Object$entries9.length;_i15++){var _Object$entries9$_i=_slicedToArray(_Object$entries9[_i15],2),key=_Object$entries9$_i[0],givenValue=_Object$entries9$_i[1];if(key!=="__target__"&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(givenValue)){var value=givenValue;_addProxyRecursively(value);// NOTE: We only wrap needed objects for performance reasons.
if(Object.prototype.hasOwnProperty.call(value,options.expressionIndicatorKey)||Object.prototype.hasOwnProperty.call(value,options.executionIndicatorKey)){var backup=value;data[key]=new Proxy(value,{get:function get(target,key){if(key==="__target__")return target;if(key==="hasOwnProperty")/*
                                        eslint-disable
                                        @typescript-eslint/unbound-method
                                    */return target[key];/*
                                        eslint-enable
                                        @typescript-eslint/unbound-method
                                    *//*
                                    NOTE: Very complicated section, do only
                                    changes while having good tests.
                                */for(var _i16=0,_arr6=[options.expressionIndicatorKey,options.executionIndicatorKey];_i16<_arr6.length;_i16++){var type=_arr6[_i16];if(key===type&&typeof target[key]==="string")return _resolve(internalEvaluateAndThrowError(target[key],type))}var resolvedTarget=_resolve(target);if(key==="toString"){var result=internalEvaluateAndThrowError(resolvedTarget);return result[key].bind(result)}if(typeof key!=="string"){var _result$key;var _result=internalEvaluateAndThrowError(resolvedTarget);if((_result$key=_result[key])!==null&&_result$key!==void 0&&_result$key.bind)return _result[key].bind(_result);return _result[key]}for(var _i17=0,_arr7=[options.expressionIndicatorKey,options.executionIndicatorKey];_i17<_arr7.length;_i17++){var _type=_arr7[_i17];if(Object.prototype.hasOwnProperty.call(target,_type)){var _result2=internalEvaluateAndThrowError(target[_type],_type);/*
                                            NOTE: Resolving the whole
                                            evaluated result could re-enter
                                            the currently running evaluation
                                            (cyclic references between
                                            dynamic values) so only the
                                            accessed value gets resolved.
                                        */var _value13=_resolve(_result2[key]);if(_value13!==null&&_value13!==void 0&&_value13.bind)return _value13.bind(_result2);return _value13}}return resolvedTarget[key];// End of complicated stuff.
},ownKeys:function ownKeys(target){for(var _i18=0,_arr8=[options.expressionIndicatorKey,options.executionIndicatorKey];_i18<_arr8.length;_i18++){var type=_arr8[_i18];if(Object.prototype.hasOwnProperty.call(target,type))return Object.getOwnPropertyNames(_resolve(internalEvaluateAndThrowError(target[type],type)))}return Object.getOwnPropertyNames(target)}});/*
                        NOTE: Known proxy polyfills does not provide the
                        "__target__" api.
                    */if(!data[key].__target__)data[key].__target__=backup}}}return data};var _resolve=function resolve(data){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(data)){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isProxy */ .ju)(data)){// NOTE: We have to skip "ownKeys" proxy trap here.
for(var _i19=0,_arr9=[options.expressionIndicatorKey,options.executionIndicatorKey];_i19<_arr9.length;_i19++){var type=_arr9[_i19];if(Object.prototype.hasOwnProperty.call(data,type))return data[type]}data=data.__target__}for(var _i20=0,_Object$entries0=Object.entries(data);_i20<_Object$entries0.length;_i20++){var _Object$entries0$_i=_slicedToArray(_Object$entries0[_i20],2),key=_Object$entries0$_i[0],value=_Object$entries0$_i[1];if([options.expressionIndicatorKey,options.executionIndicatorKey].includes(key)){if(typeof Proxy==="undefined")return _resolve(internalEvaluateAndThrowError(value));return value}data[key]=_resolve(value)}}return data};options.scope.resolve=_resolve;var _removeProxyRecursively=function removeProxyRecursively(data){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(data))for(var _i21=0,_Object$entries1=Object.entries(data);_i21<_Object$entries1.length;_i21++){var _Object$entries1$_i=_slicedToArray(_Object$entries1[_i21],2),key=_Object$entries1$_i[0],value=_Object$entries1$_i[1];if(key!=="__target__"&&value!==null&&["function","undefined"].includes(_typeof(value))){var target=value.__target__;if(typeof target!=="undefined")data[key]=target;_removeProxyRecursively(value)}}return data};if(Object.prototype.hasOwnProperty.call(object,options.expressionIndicatorKey))return internalEvaluateAndThrowError(object[options.expressionIndicatorKey]);else if(Object.prototype.hasOwnProperty.call(object,options.executionIndicatorKey))return internalEvaluateAndThrowError(object[options.executionIndicatorKey],options.executionIndicatorKey);return _removeProxyRecursively(_resolve(_addProxyRecursively(object)))};/**
 * Removes properties in objects where a dynamic indicator lives.
 * @param data - Object to traverse recursively.
 * @param expressionIndicators - Property key to remove.
 * @returns Given object with removed properties.
 */var _removeKeysInEvaluation=function removeKeysInEvaluation(data,expressionIndicators){if(expressionIndicators===void 0){expressionIndicators=["__evaluate__","__execute__"]}for(var _i22=0,_Object$entries10=Object.entries(data);_i22<_Object$entries10.length;_i22++){var _Object$entries10$_i=_slicedToArray(_Object$entries10[_i22],2),key=_Object$entries10$_i[0],value=_Object$entries10$_i[1];if(!expressionIndicators.includes(key)&&expressionIndicators.some(function(name){return Object.prototype.hasOwnProperty.call(data,name)}))delete data[key];else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(value))_removeKeysInEvaluation(value,expressionIndicators)}return data};/**
 * Extends given target object with given sources object. As target and
 * sources many expandable types are allowed but target and sources have to
 * come from the same type.
 * @param targetOrDeepIndicator - Maybe the target or deep indicator.
 * @param targetOrSource - Target or source object; depending on first
 * argument.
 * @param additionalSources - Source objects to extend into target.
 * @returns Returns given target extended with all given sources.
 */var _extend=function extend(targetOrDeepIndicator,targetOrSource){var deep=false;for(var _len=arguments.length,additionalSources=new Array(_len>2?_len-2:0),_key5=2;_key5<_len;_key5++){additionalSources[_key5-2]=arguments[_key5]}var sources=additionalSources;var target;if(targetOrDeepIndicator===_constants_js__WEBPACK_IMPORTED_MODULE_18__/* .IGNORE_NULL_AND_UNDEFINED_SYMBOL */ .p_||typeof targetOrDeepIndicator==="boolean"){// Handle a deep copy situation and skip deep indicator and target.
deep=targetOrDeepIndicator;target=targetOrSource}else{target=targetOrDeepIndicator;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(targetOrSource))sources=[targetOrSource].concat(_toConsumableArray(sources));else if(targetOrSource!==undefined)target=targetOrSource}var mergeValue=function mergeValue(targetValue,value){if(value===targetValue)return targetValue;// Traverse recursively if we're merging plain objects or maps.
if(deep&&value&&((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(value)||(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(value))){var clone;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(value))clone=targetValue&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(targetValue)?targetValue:new Map;else clone=targetValue&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(targetValue)?targetValue:{};return _extend(deep,clone,value)}return value};var _iterator17=_createForOfIteratorHelper(sources),_step17;try{for(_iterator17.s();!(_step17=_iterator17.n()).done;){var source=_step17.value;var targetType=_typeof(target);var sourceType=_typeof(source);if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(target))targetType+=" Map";if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(source))sourceType+=" Map";if(targetType===sourceType&&target!==source){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(target)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(source)){var _iterator18=_createForOfIteratorHelper(source),_step18;try{for(_iterator18.s();!(_step18=_iterator18.n()).done;){var _step18$value=_slicedToArray(_step18.value,2),key=_step18$value[0],value=_step18$value[1];target.set(key,mergeValue(target.get(key),value))}}catch(err){_iterator18.e(err)}finally{_iterator18.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(target)&&!Array.isArray(target)&&!(typeof Blob!=="undefined"&&target instanceof Blob)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(source)&&!Array.isArray(source)&&!(typeof Blob!=="undefined"&&source instanceof Blob)){for(var _i23=0,_Object$entries11=Object.entries(source);_i23<_Object$entries11.length;_i23++){var _Object$entries11$_i=_slicedToArray(_Object$entries11[_i23],2),_key6=_Object$entries11$_i[0],_value14=_Object$entries11$_i[1];if(!(deep===_constants_js__WEBPACK_IMPORTED_MODULE_18__/* .IGNORE_NULL_AND_UNDEFINED_SYMBOL */ .p_&&[null,undefined].includes(_value14)))target[_key6]=mergeValue(target[_key6],_value14)}}else target=source;}else target=source}}catch(err){_iterator17.e(err)}finally{_iterator17.f()}return target};/**
 * Generates a proxy handler which forwards all operations to given object
 * as there wouldn't be a proxy.
 * @param target - Object to proxy.
 * @param methodNames - Mapping of operand name to object specific method
 * name.
 * @returns Determined proxy handler.
 */var getProxyHandler=function getProxyHandler(target,methodNames){if(methodNames===void 0){methodNames={}}methodNames=_objectSpread({delete:"[]",get:"[]",has:"[]",set:"[]"},methodNames);return{deleteProperty:function deleteProperty(_targetObject,key){if(methodNames.delete==="[]"&&typeof key==="string")delete target[key];else return target[methodNames.delete](key);return true},get:function get(_targetObject,key){if(methodNames.get==="[]"&&typeof key==="string")return target[key];return target[methodNames.get](key)},has:function has(_targetObject,key){if(methodNames.has==="[]")return key in target;return target[methodNames.has](key)},set:function set(_targetObject,key,value){if(methodNames.set==="[]"&&typeof key==="string")target[key]=value;else return target[methodNames.set](key,value);return true}}};/**
 * Slices all properties from given object which does not match provided
 * object mask. Items can be explicitly whitelisted via "include" mask
 * configuration or black listed via "exclude" mask configuration.
 * @param object - Object to slice.
 * @param maskConfiguration - Mask configuration.
 * @returns Given but sliced object. If (nested) object will be modified a
 * flat copy of that object will be returned.
 */var _mask=function mask(object,maskConfiguration){maskConfiguration=_objectSpread({exclude:false,include:true},maskConfiguration);if(maskConfiguration.exclude===true||Array.isArray(maskConfiguration.exclude)&&maskConfiguration.exclude.length===0||maskConfiguration.include===false||_typeof(object)!=="object")return{};var exclude=Array.isArray(maskConfiguration.exclude)?maskConfiguration.exclude.reduce(function(mask,key){return _objectSpread(_objectSpread({},mask),{},_defineProperty({},key,true))},{}):maskConfiguration.exclude;var include=Array.isArray(maskConfiguration.include)?maskConfiguration.include.reduce(function(mask,key){return _objectSpread(_objectSpread({},mask),{},_defineProperty({},key,true))},{}):maskConfiguration.include;var result={};if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(include)){for(var _i24=0,_Object$entries12=Object.entries(include);_i24<_Object$entries12.length;_i24++){var _Object$entries12$_i=_slicedToArray(_Object$entries12[_i24],2),key=_Object$entries12$_i[0],value=_Object$entries12$_i[1];if(Object.prototype.hasOwnProperty.call(object,key))if(value===true)result[key]=object[key];else if(((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(value)||Array.isArray(value)&&value.length)&&_typeof(object[key])==="object")result[key]=_mask(object[key],{include:value})}}else// In this branch "mask.include === true" holds.
result=object;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(exclude)){var useCopy=false;var copy=_objectSpread({},result);for(var _i25=0,_Object$entries13=Object.entries(exclude);_i25<_Object$entries13.length;_i25++){var _Object$entries13$_i=_slicedToArray(_Object$entries13[_i25],2),_key7=_Object$entries13$_i[0],_value15=_Object$entries13$_i[1];if(Object.prototype.hasOwnProperty.call(copy,_key7))if(_value15===true){useCopy=true;delete copy[_key7]}else if(((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isPlainObject */ .Qd)(_value15)||Array.isArray(_value15)&&_value15.length)&&_typeof(copy[_key7])==="object"){var current=copy[_key7];copy[_key7]=_mask(copy[_key7],{exclude:_value15});if(copy[_key7]!==current)useCopy=true}}if(useCopy)result=copy}return result};/**
 * Modifies given target corresponding to given source and removes source
 * modification infos.
 * @param target - Object to modify.
 * @param source - Source object to load modifications from.
 * @param removeIndicatorKey - Indicator property name or value to mark a
 * value to remove from object or list.
 * @param prependIndicatorKey - Indicator property name to mark a value to
 * prepend to target list.
 * @param appendIndicatorKey - Indicator property name to mark a value to
 * append to target list.
 * @param positionPrefix - Indicates a prefix to use a value on given
 * position to add or remove.
 * @param positionSuffix - Indicates a suffix to use a value on given
 * position to add or remove.
 * @param parentSource - Source context to remove modification info from
 * (usually only needed internally).
 * @param parentKey - Source key in given source context to remove
 * modification info from (usually only needed internally).
 * @returns Given target modified with given source.
 */var _modifyObject=function modifyObject(target,source,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,parentSource,parentKey){if(removeIndicatorKey===void 0){removeIndicatorKey="__remove__"}if(prependIndicatorKey===void 0){prependIndicatorKey="__prepend__"}if(appendIndicatorKey===void 0){appendIndicatorKey="__append__"}if(positionPrefix===void 0){positionPrefix="__"}if(positionSuffix===void 0){positionSuffix="__"}if(parentSource===void 0){parentSource=null}if(parentKey===void 0){parentKey=null}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(source)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(target)){var _iterator19=_createForOfIteratorHelper(source),_step19;try{for(_iterator19.s();!(_step19=_iterator19.n()).done;){var _step19$value=_slicedToArray(_step19.value,2),key=_step19$value[0],value=_step19$value[1];if(target.has(key))_modifyObject(target.get(key),value,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,key)}}catch(err){_iterator19.e(err)}finally{_iterator19.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(source)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(target))for(var _i26=0,_Object$entries14=Object.entries(source);_i26<_Object$entries14.length;_i26++){var _Object$entries14$_i=_slicedToArray(_Object$entries14[_i26],2),_key8=_Object$entries14$_i[0],sourceValue=_Object$entries14$_i[1];var index=NaN;if(Array.isArray(target)&&_key8.startsWith(positionPrefix)&&_key8.endsWith(positionSuffix)){index=parseInt(_key8.substring(positionPrefix.length,_key8.length-positionSuffix.length),10);if(index<0||index>=target.length)index=NaN}if([removeIndicatorKey,prependIndicatorKey,appendIndicatorKey].includes(_key8)||!isNaN(index)){if(Array.isArray(target)){if(_key8===removeIndicatorKey){var values=[].concat(sourceValue);var _iterator20=_createForOfIteratorHelper(values),_step20;try{for(_iterator20.s();!(_step20=_iterator20.n()).done;){var _value16=_step20.value;if(typeof _value16==="string"&&_value16.startsWith(positionPrefix)&&_value16.endsWith(positionSuffix))target.splice(parseInt(_value16.substring(positionPrefix.length,_value16.length-positionSuffix.length),10),1);else if(target.includes(_value16))target.splice(target.indexOf(_value16),1);else if(typeof _value16==="number"&&_value16<target.length)target.splice(_value16,1)}}catch(err){_iterator20.e(err)}finally{_iterator20.f()}}else if(_key8===appendIndicatorKey)target=target.concat(sourceValue);else if(_key8===prependIndicatorKey)target=[].concat(sourceValue).concat(target);else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(target[index])&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(sourceValue))_extend(true,_modifyObject(target[index],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix),target[index],sourceValue);else target[index]=sourceValue;}else if(_key8===removeIndicatorKey){var _iterator21=_createForOfIteratorHelper([].concat(sourceValue)),_step21;try{for(_iterator21.s();!(_step21=_iterator21.n()).done;){var _value17=_step21.value;if(typeof _value17==="string"&&Object.prototype.hasOwnProperty.call(target,_value17))delete target[_value17]}}catch(err){_iterator21.e(err)}finally{_iterator21.f()}}delete source[_key8];if(parentSource&&typeof parentKey==="string")delete parentSource[parentKey]}else if(target!==null&&Object.prototype.hasOwnProperty.call(target,_key8))target[_key8]=_modifyObject(target[_key8],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,_key8)}return target};/**
 * Removes given key from given object recursively.
 * @param object - Object to process.
 * @param keys - List of keys to remove.
 * @returns Processed given object.
 */var _removeKeyPrefixes=function removeKeyPrefixes(object,keys){if(keys===void 0){keys="#"}var resolvedKeys=[].concat(keys);if(Array.isArray(object)){var index=0;var _iterator22=_createForOfIteratorHelper(object.slice()),_step22;try{for(_iterator22.s();!(_step22=_iterator22.n()).done;){var subObject=_step22.value;var skip=false;if(typeof subObject==="string"){var _iterator23=_createForOfIteratorHelper(resolvedKeys),_step23;try{for(_iterator23.s();!(_step23=_iterator23.n()).done;){var key=_step23.value;if(subObject.startsWith("".concat(key,":"))){object.splice(index,1);skip=true;break}}}catch(err){_iterator23.e(err)}finally{_iterator23.f()}if(skip)continue}object[index]=_removeKeyPrefixes(subObject,resolvedKeys);index+=1}}catch(err){_iterator22.e(err)}finally{_iterator22.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var _iterator24=_createForOfIteratorHelper(new Set(object)),_step24;try{for(_iterator24.s();!(_step24=_iterator24.n()).done;){var _subObject=_step24.value;var _skip=false;if(typeof _subObject==="string"){var _iterator25=_createForOfIteratorHelper(resolvedKeys),_step25;try{for(_iterator25.s();!(_step25=_iterator25.n()).done;){var _key9=_step25.value;if(_subObject.startsWith("".concat(_key9,":"))){object.delete(_subObject);_skip=true;break}}}catch(err){_iterator25.e(err)}finally{_iterator25.f()}if(_skip)continue}_removeKeyPrefixes(_subObject,resolvedKeys)}}catch(err){_iterator24.e(err)}finally{_iterator24.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _iterator26=_createForOfIteratorHelper(new Map(object)),_step26;try{for(_iterator26.s();!(_step26=_iterator26.n()).done;){var _step26$value=_slicedToArray(_step26.value,2),_key0=_step26$value[0],_subObject2=_step26$value[1];var _skip2=false;if(typeof _key0==="string"){var _iterator27=_createForOfIteratorHelper(resolvedKeys),_step27;try{for(_iterator27.s();!(_step27=_iterator27.n()).done;){var resolvedKey=_step27.value;var escapedKey=(0,_string_js__WEBPACK_IMPORTED_MODULE_21__/* .escapeRegularExpressions */ .jt)(resolvedKey);if(new RegExp("^".concat(escapedKey,"[0-9]*$")).test(_key0)){object.delete(_key0);_skip2=true;break}}}catch(err){_iterator27.e(err)}finally{_iterator27.f()}if(_skip2)continue}object.set(_key0,_removeKeyPrefixes(_subObject2,resolvedKeys))}}catch(err){_iterator26.e(err)}finally{_iterator26.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(object))for(var _i27=0,_Object$entries15=Object.entries(Object.assign({},object));_i27<_Object$entries15.length;_i27++){var _Object$entries15$_i=_slicedToArray(_Object$entries15[_i27],2),_key1=_Object$entries15$_i[0],value=_Object$entries15$_i[1];var _skip3=false;var _iterator28=_createForOfIteratorHelper(resolvedKeys),_step28;try{for(_iterator28.s();!(_step28=_iterator28.n()).done;){var _resolvedKey=_step28.value;var _escapedKey=(0,_string_js__WEBPACK_IMPORTED_MODULE_21__/* .escapeRegularExpressions */ .jt)(_resolvedKey);if(new RegExp("^".concat(_escapedKey,"[0-9]*$")).test(_key1)){delete object[_key1];_skip3=true;break}}}catch(err){_iterator28.e(err)}finally{_iterator28.f()}if(_skip3)continue;object[_key1]=_removeKeyPrefixes(value,resolvedKeys)}return object};/**
 * Represents given object as formatted string.
 * @param object - Object to represent.
 * @param maximumLengthOfLists - Maximum number of array item to render.
 * @param indention - String (usually whitespaces) to use as indention.
 * @param initialIndention - String (usually whitespaces) to use as
 * additional indention for the first object traversing level.
 * @param maximumNumberOfLevelsReachedIdentifier - Replacement for objects
 * which are out of specified bounds to traverse.
 * @param numberOfLevels - Specifies number of levels to traverse given
 * data structure.
 * @returns Representation string.
 */var _represent=function represent(object,maximumLengthOfLists,indention,initialIndention,maximumNumberOfLevelsReachedIdentifier,numberOfLevels){if(maximumLengthOfLists===void 0){maximumLengthOfLists=30}if(indention===void 0){indention="    "}if(initialIndention===void 0){initialIndention=""}if(maximumNumberOfLevelsReachedIdentifier===void 0){maximumNumberOfLevelsReachedIdentifier="__maximum_number_of_levels_reached__"}if(numberOfLevels===void 0){numberOfLevels=8}if(numberOfLevels===0)return String(maximumNumberOfLevelsReachedIdentifier);if(object===null)return"null";if(object===undefined)return"undefined";if(typeof object==="string")return"\"".concat(object.replace(/\n/g,"\n".concat(initialIndention)),"\"");if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isNumeric */ .kf)(object)||typeof object==="boolean")return String(object);if(object instanceof Date)return object.toISOString();if(Array.isArray(object)){var _result3="[";var _firstSeen=false;var _counter=1;var _iterator29=_createForOfIteratorHelper(object),_step29;try{for(_iterator29.s();!(_step29=_iterator29.n()).done;){var item=_step29.value;if(_counter>maximumLengthOfLists){_result3+="\n".concat(initialIndention,"...");break}if(_firstSeen)_result3+=",";_result3+="\n".concat(initialIndention).concat(indention)+_represent(item,maximumLengthOfLists,indention,"".concat(initialIndention).concat(indention),maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);_firstSeen=true;_counter+=1}}catch(err){_iterator29.e(err)}finally{_iterator29.f()}if(_firstSeen)_result3+="\n".concat(initialIndention);_result3+="]";return _result3}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _result4="";var _firstSeen2=false;var _counter2=1;var _iterator30=_createForOfIteratorHelper(object),_step30;try{for(_iterator30.s();!(_step30=_iterator30.n()).done;){var _step30$value=_slicedToArray(_step30.value,2),key=_step30$value[0],_item=_step30$value[1];if(_counter2>maximumLengthOfLists){_result4+=",\n".concat(initialIndention,"...");break}if(_firstSeen2)_result4+=",\n".concat(initialIndention).concat(indention);_result4+=_represent(key,maximumLengthOfLists,indention,"".concat(initialIndention).concat(indention),maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1)+" -> "+_represent(_item,maximumLengthOfLists,indention,"".concat(initialIndention).concat(indention),maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);_firstSeen2=true;_counter2+=1}}catch(err){_iterator30.e(err)}finally{_iterator30.f()}if(!_firstSeen2)_result4="EmptyMap";return _result4}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var _result5="{";var _firstSeen3=false;var _counter3=1;var _iterator31=_createForOfIteratorHelper(object),_step31;try{for(_iterator31.s();!(_step31=_iterator31.n()).done;){var _item2=_step31.value;if(_counter3>maximumLengthOfLists){_result5+=",\n".concat(initialIndention,"...");break}if(_firstSeen3)_result5+=",";_result5+="\n".concat(initialIndention).concat(indention)+_represent(_item2,maximumLengthOfLists,indention,"".concat(initialIndention).concat(indention),maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);_firstSeen3=true;_counter3+=1}}catch(err){_iterator31.e(err)}finally{_iterator31.f()}if(_firstSeen3)_result5+="\n".concat(initialIndention,"}");else _result5="EmptySet";return _result5}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isFunction */ .Tn)(object))return"__function__";var result="{";var keys=Object.getOwnPropertyNames(object).sort();var firstSeen=false;var counter=1;var _iterator32=_createForOfIteratorHelper(keys),_step32;try{for(_iterator32.s();!(_step32=_iterator32.n()).done;){var _key10=_step32.value;if(counter>maximumLengthOfLists){result+=",\n".concat(initialIndention,"...");break}if(firstSeen)result+=",";result+="\n".concat(initialIndention).concat(indention).concat(_key10,": ")+_represent(object[_key10],maximumLengthOfLists,indention,"".concat(initialIndention).concat(indention),maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);firstSeen=true;counter+=1}}catch(err){_iterator32.e(err)}finally{_iterator32.f()}if(firstSeen)result+="\n".concat(initialIndention);result+="}";return result};/**
 * Sort given objects keys.
 * @param object - Object which keys should be sorted.
 * @returns Sorted list of given keys.
 */var sort=function sort(object){var keys=[];if(Array.isArray(object))for(var index=0;index<object.length;index++)keys.push(index);else if(_typeof(object)==="object")if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _iterator33=_createForOfIteratorHelper(object),_step33;try{for(_iterator33.s();!(_step33=_iterator33.n()).done;){var keyValuePair=_step33.value;keys.push(keyValuePair[0])}}catch(err){_iterator33.e(err)}finally{_iterator33.f()}}else if(object!==null)for(var _i28=0,_Object$keys=Object.keys(object);_i28<_Object$keys.length;_i28++){var key=_Object$keys[_i28];keys.push(key)}return keys.sort()};/**
 * Removes a proxy from given data structure recursively.
 * @param object - Object to proxy.
 * @param seenObjects - Tracks all already processed objects to avoid
 * endless loops (usually only needed for internal purpose).
 * @returns Returns given object unwrapped from a dynamic proxy.
 */var _unwrapProxy=function unwrapProxy(object,seenObjects){if(seenObjects===void 0){seenObjects=new Set}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isObject */ .Gv)(object)){if(seenObjects.has(object))return object;try{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isFunction */ .Tn)(object.__revoke__)){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isProxy */ .ju)(object))object=object.__target__;object.__revoke__()}}catch(_unused){return object}finally{seenObjects.add(object)}if(Array.isArray(object)){var index=0;var _iterator34=_createForOfIteratorHelper(object),_step34;try{for(_iterator34.s();!(_step34=_iterator34.n()).done;){var value=_step34.value;object[index]=_unwrapProxy(value,seenObjects);index+=1}}catch(err){_iterator34.e(err)}finally{_iterator34.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isMap */ .jh)(object)){var _iterator35=_createForOfIteratorHelper(object),_step35;try{for(_iterator35.s();!(_step35=_iterator35.n()).done;){var _step35$value=_slicedToArray(_step35.value,2),key=_step35$value[0],_value18=_step35$value[1];object.set(key,_unwrapProxy(_value18,seenObjects))}}catch(err){_iterator35.e(err)}finally{_iterator35.f()}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_19__/* .isSet */ .vM)(object)){var cache=[];var _iterator36=_createForOfIteratorHelper(object),_step36;try{for(_iterator36.s();!(_step36=_iterator36.n()).done;){var _value20=_step36.value;object.delete(_value20);cache.push(_unwrapProxy(_value20,seenObjects))}}catch(err){_iterator36.e(err)}finally{_iterator36.f()}for(var _i29=0,_cache4=cache;_i29<_cache4.length;_i29++){var _value19=_cache4[_i29];object.add(_value19)}}else for(var _i30=0,_Object$entries16=Object.entries(object);_i30<_Object$entries16.length;_i30++){var _Object$entries16$_i=_slicedToArray(_Object$entries16[_i30],2),_key11=_Object$entries16$_i[0],_value21=_Object$entries16$_i[1];object[_key11]=_unwrapProxy(_value21,seenObjects)}}return object};

/***/ }),
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
/* 8 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gv: function() { return /* binding */ isObject; },
/* harmony export */   Qd: function() { return /* binding */ isPlainObject; },
/* harmony export */   Tn: function() { return /* binding */ isFunction; },
/* harmony export */   jh: function() { return /* binding */ isMap; },
/* harmony export */   ju: function() { return /* binding */ isProxy; },
/* harmony export */   kf: function() { return /* binding */ isNumeric; },
/* harmony export */   vM: function() { return /* binding */ isSet; }
/* harmony export */ });
/* unused harmony exports isAnyMatching, isArrayLike, isWindow */
/* unused harmony import specifier */ var determineType;
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module indicators *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)};function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};/**
 * Checks whether one of the given pattern matches given string.
 * @param target - Target to check in pattern for.
 * @param pattern - List of pattern to check for.
 * @returns Value "true" if given object is matches by at leas one of the
 * given pattern and "false" otherwise.
 */var isAnyMatching=function isAnyMatching(target,pattern){var _iterator=_createForOfIteratorHelper(pattern),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var currentPattern=_step.value;if(typeof currentPattern==="string"){if(currentPattern===target)return true}else if(currentPattern.test(target))return true}}catch(err){_iterator.e(err)}finally{_iterator.f()}return false};/**
 * Checks if given object is similar to an array and can be handled like an
 * array.
 * @param object - Object to check behavior for.
 * @returns A boolean value indicating whether given object is array like.
 */var isArrayLike=function isArrayLike(object){var length;try{length=Boolean(object)&&object.length}catch(_unused){return false}var type=determineType(object);if(type==="function"||isWindow(object))return false;if(type==="array"||length===0)return true;if(typeof length==="number"&&length>0)try{var _dump=object[length-1];return true}catch(_unused2){// Continue regardless of an error.
}return false};/**
 * Checks whether given object is a function.
 * @param value - Value to check.
 * @returns Value "true" if given object is a function and "false"
 * otherwise.
 */var isFunction=function isFunction(value){return Boolean(value)&&["[object AsyncFunction]","[object Function]"].includes({}.toString.call(value))};/**
 * Checks whether given object is a map.
 * @param value - Value to check.
 * @returns Value "true" if given object is a map and "false" otherwise.
 */var isMap=function isMap(value){return (0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value)==="map"};/**
 * Determines whether its argument represents a JavaScript number.
 * @param value - Value to analyze.
 * @returns A boolean value indicating whether given object is numeric
 * like.
 */var isNumeric=function isNumeric(value){var type=(0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value);/*
        NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
        misinterprets leading-number strings, particularly hex literals
        ("0x...") subtraction forces infinities to NaN.
    */return["number","string"].includes(type)&&!isNaN(value-parseFloat(value))};/**
 * Checks whether given object is a native object but not null.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */var isObject=function isObject(value){return value!==null&&_typeof(value)==="object"};/**
 * Checks whether given object is a plain native object.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */var isPlainObject=function isPlainObject(value){var _prototype$constructo;if(!isObject(value))return false;var prototype=Object.getPrototypeOf(value);if(_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .PLAIN_OBJECT_PROTOTYPES */ .jE.includes(prototype))return true;/*
        NOTE: Plain objects created in another realm (a vm context like used by
        test runners or a worker for example) have their own "Object.prototype"
        instance and would not be recognized by the identity check above.
    */return prototype!==null&&Object.getPrototypeOf(prototype)===null&&((_prototype$constructo=prototype.constructor)===null||_prototype$constructo===void 0?void 0:_prototype$constructo.name)==="Object"};/**
 * Checks whether given object is a proxy.
 * @param value - Value to check.
 * @returns Value "true" if given object is a proxy and "false" otherwise.
 */var isProxy=function isProxy(value){return Boolean(value===null||value===void 0?void 0:value.__target__)};/**
 * Checks whether given object is a set.
 * @param value - Value to check.
 * @returns Value "true" if given object is a set and "false" otherwise.
 */var isSet=function isSet(value){return (0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value)==="set"};/**
 * Determine whether the argument is a window.
 * @param value - Value to check for.
 * @returns Boolean value indicating the result.
 */var isWindow=function isWindow(value){return![null,undefined].includes(value)&&_typeof(value)==="object"&&value===(value===null||value===void 0?void 0:value.window)};

/***/ }),
/* 9 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lz: function() { return /* binding */ globalContext; }
/* harmony export */ });
/* unused harmony exports setGlobalContext, MAXIMAL_NUMBER_OF_ITERATIONS, NOOP, mockConsole */
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
/* 11 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 12 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 13 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 14 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 15 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 16 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 17 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 18 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 19 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VK: function() { return /* binding */ evaluateOrThrowError; },
/* harmony export */   jt: function() { return /* binding */ escapeRegularExpressions; }
/* harmony export */ });
/* unused harmony exports KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS, POLYFILL_TEMPLATE_STRINGS, ALLOWED_VARIABLE_SYMBOLS, ALLOWED_STARTING_VARIABLE_SYMBOLS, FIX_ENCODING_ERROR_MAPPING, AsyncFunction, addSeparatorToPath, encodeURIComponentExtended, getDomainName, getPortNumber, getProtocolName, getURLParameter, hasPathPrefix, normalizeURL, representURL, serviceURLEquals, camelCaseToDelimited, capitalize, compile, evaluate, compressStyleValue, convertToValidVariableName, decodeHTMLEntities, delimitedToCamelCase, findNormalizedMatchRange, fixKnownEncodingErrors, format, getEditDistance, limit, lowerCase, mark, maskForRegularExpression, normalizeDomNodeSelector, normalizePhoneNumber, normalizeZipCode, parseEncodedObject, representPhoneNumber, sliceAllExceptNumberAndLastSeparator */
/* unused harmony import specifier */ var ABBREVIATIONS;
/* unused harmony import specifier */ var DEFAULT_ENCODING;
/* unused harmony import specifier */ var globalContext;
/* unused harmony import specifier */ var MAXIMAL_NUMBER_OF_ITERATIONS;
/* unused harmony import specifier */ var imports;
/* unused harmony import specifier */ var isFileSync;
/* unused harmony import specifier */ var determineType;
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var core_js_modules_es_iterator_map_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(28);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module string *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/// region imports
function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}function _construct(e,o,p){if(_isNativeReflectConstruct())return Reflect.construct.apply(null,arguments);var n=[null];n.push.apply(n,o);var l=new(e.bind.apply(e,n));return p&&_setPrototypeOf(l,p.prototype),l}function _setPrototypeOf(t,e){return _setPrototypeOf=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return _defaults(t,e),t},_setPrototypeOf(t,e)}function _isNativeReflectConstruct(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch(t){}return(_isNativeReflectConstruct=function _isNativeReflectConstruct(){return!!t})()}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)};function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};// endregion
var KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS=["default","if","for","class","function","return","const","let","var"];var POLYFILL_TEMPLATE_STRINGS={value:false};// Partial regular expression matching symbols which should be allowed within a
// variable name excluding the first character.
var ALLOWED_VARIABLE_SYMBOLS="0-9a-zA-Z_$";// Partial regular expression matching symbols which should be allowed as
// starting character for a variable name.
var ALLOWED_STARTING_VARIABLE_SYMBOLS="a-zA-Z_$";var FIX_ENCODING_ERROR_MAPPING=(/* unused pure expression or super */ null && ([["\xC3\\x84","\xC4"],["\xC3\\x96","\xD6"],["\xC3\\x9c","\xDC"],["\xC3\xA4","\xE4"],["\xC3\xB6","\xF6"],["\xC3\xBC","\xFC"],["\\x96","-"],["\xC3\xA9","\xE9"],["\xC3\xA8","e"],["\xC3\xB4","o"],["\xC3 ","\xE1"],["\xC3\xB8","\xF8"],["\xC3\\x9f","\xDF"],["\xC3","\xDF"]]));var AsyncFunction=/*
        eslint-disable
        @typescript-eslint/no-implied-eval,@typescript-eslint/no-unsafe-call
    */new Function("return Object.getPrototypeOf(async function() {})")().constructor;/*
        eslint-enable
        @typescript-eslint/no-implied-eval,@typescript-eslint/no-unsafe-call
    */// region url handling
/**
 * Appends a path selector to the given path if there isn't one yet.
 * @param path - The path for appending a selector.
 * @param pathSeparator - The selector for appending to a path.
 * @returns The appended path.
 */var addSeparatorToPath=function addSeparatorToPath(path,pathSeparator){if(pathSeparator===void 0){pathSeparator="/"}path=path.trim();if(path.substring(path.length-1)!==pathSeparator&&path.length)return path+pathSeparator;return path};/**
 * This method is intended for encoding *key* or *value* parts of a query
 * component. We need a custom method because "encodeURIComponent()" is too
 * aggressive and encodes stuff that doesn't have to be encoded per
 * "http://tools.ietf.org/html/rfc3986:".
 * @param url - URL to encode.
 * @param encodeSpaces - Indicates whether given url should encode
 * whitespaces as "+" or "%20".
 * @returns Encoded given url.
 */var encodeURIComponentExtended=function encodeURIComponentExtended(url,encodeSpaces){if(encodeSpaces===void 0){encodeSpaces=false}return encodeURIComponent(url).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,encodeSpaces?"%20":"+")};/**
 * Extracts domain name from given url. If no explicit domain name given
 * current domain name will be assumed. If no parameter is given, the current
 * domain name will be determined.
 * @param url - The url to extract domain from.
 * @param fallback - The fallback host name if no one exits in given url
 * (default is current hostname).
 * @returns Extracted domain.
 */var getDomainName=function getDomainName(url,fallback){if(url===void 0){var _globalContext$locati;url=((_globalContext$locati=globalContext.location)===null||_globalContext$locati===void 0?void 0:_globalContext$locati.href)||""}if(fallback===void 0){var _globalContext$locati2;fallback=((_globalContext$locati2=globalContext.location)===null||_globalContext$locati2===void 0?void 0:_globalContext$locati2.hostname)||""}var result=/^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url);if(result&&result.length>2&&result[1]&&result[2])return result[2];return fallback};/**
 * Extracts port number from given url. If no explicit port number is given
 * and no fallback is defined, the current port number will be assumed for local
 * links. For external links 80 will be assumed for http protocols and 443
 * for https protocols.
 * @param url - The url to extract port from.
 * @param fallback - Fallback port number if no explicit one was found.
 * Default is derived from the current protocol name.
 * @returns Extracted port number.
 */var getPortNumber=function getPortNumber(url,fallback){var _globalContext$locati5;if(url===void 0){var _globalContext$locati3;url=((_globalContext$locati3=globalContext.location)===null||_globalContext$locati3===void 0?void 0:_globalContext$locati3.href)||""}if(fallback===void 0){var _globalContext$locati4;fallback=(_globalContext$locati4=globalContext.location)!==null&&_globalContext$locati4!==void 0&&_globalContext$locati4.port?parseInt(globalContext.location.port):null}var result=/^(?:[a-z]*:?\/\/[^/]+?)?[^/]+?:([0-9]+)/i.exec(url);if(result&&result.length>1)return parseInt(result[1],10);if(fallback!==null)return fallback;if(// NOTE: Would result in an endless loop:
// serviceURLEquals(url, ...parameters) &&
(_globalContext$locati5=globalContext.location)!==null&&_globalContext$locati5!==void 0&&_globalContext$locati5.port&&parseInt(globalContext.location.port,10))return parseInt(globalContext.location.port,10);return getProtocolName(url)==="https"?443:80};/**
 * Extracts protocol name from given url. If no explicit url is given,
 * the current protocol will be assumed. If no parameter is given, the current
 * protocol number will be determined.
 * @param url - The url to extract protocol from.
 * @param fallback - Fallback port to use if no protocol exists in given
 * url (default is current protocol).
 * @returns Extracted protocol.
 */var getProtocolName=function getProtocolName(url,fallback){if(url===void 0){var _globalContext$locati6;url=((_globalContext$locati6=globalContext.location)===null||_globalContext$locati6===void 0?void 0:_globalContext$locati6.href)||""}if(fallback===void 0){var _globalContext$locati7;fallback=((_globalContext$locati7=globalContext.location)===null||_globalContext$locati7===void 0?void 0:_globalContext$locati7.protocol)&&globalContext.location.protocol.substring(0,globalContext.location.protocol.length-1)||""}var result=/^([a-z]+):\/\//i.exec(url);if(result&&result.length>1&&result[1])return result[1];return fallback};/**
 * Read a page's GET URL variables and return them as an associative array
 * and preserves ordering.
 * @param keyToGet - If provided the corresponding value for a given key is
 * returned or full object otherwise.
 * @param allowDuplicates - Indicates whether to return arrays of values or
 * single values. If set to "false" (default) last values will overwrite
 * preceding values.
 * @param givenInput - An alternative input to the url search parameter. If
 * "#" is given, the complete current hashtag will be interpreted as url and
 * search parameter will be extracted from there. If "&" is given a classical
 * search parameter, and hash parameter will be taken in an account. If a
 * search string is given, this will be analyzed. The default is to take a
 * given search part into account.
 * @param subDelimiter - Defines which sequence indicates the start of
 * parameter in a hash part of the url.
 * @param hashedPathIndicator - If defined and given hash starts with this
 * indicator, given hash will be interpreted as a path containing search and
 * hash parts.
 * @param givenSearch - Search part to take into account defaults to
 * current url search part.
 * @param givenHash - Hash part to take into account defaults to current
 * url hash part.
 * @returns Returns the current get array or requested value. If the requested
 * key doesn't exist, "undefined" is returned.
 */var getURLParameter=function getURLParameter(keyToGet,allowDuplicates,givenInput,subDelimiter,hashedPathIndicator,givenSearch,givenHash){if(keyToGet===void 0){keyToGet=null}if(allowDuplicates===void 0){allowDuplicates=false}if(givenInput===void 0){givenInput=null}if(subDelimiter===void 0){subDelimiter="$"}if(hashedPathIndicator===void 0){hashedPathIndicator="!"}if(givenSearch===void 0){givenSearch=null}if(givenHash===void 0){var _globalContext$locati8,_globalContext$locati9;givenHash=(_globalContext$locati8=(_globalContext$locati9=globalContext.location)===null||_globalContext$locati9===void 0?void 0:_globalContext$locati9.hash)!==null&&_globalContext$locati8!==void 0?_globalContext$locati8:""}// region set search and hash
var hash=givenHash!==null&&givenHash!==void 0?givenHash:"#";var search="";if(givenSearch)search=givenSearch;else if(hashedPathIndicator&&hash.startsWith(hashedPathIndicator)){var subHashStartIndex=hash.indexOf("#");var pathAndSearch;if(subHashStartIndex===-1){pathAndSearch=hash.substring(hashedPathIndicator.length);hash=""}else{pathAndSearch=hash.substring(hashedPathIndicator.length,subHashStartIndex);hash=hash.substring(subHashStartIndex)}var subSearchStartIndex=pathAndSearch.indexOf("?");if(subSearchStartIndex!==-1)search=pathAndSearch.substring(subSearchStartIndex)}else if(globalContext.location)search=globalContext.location.search||"";var input=givenInput?givenInput:search;// endregion
// region determine data from search and hash if specified
var both=input==="&";if(both||input==="#"){var decodedHash="";try{decodedHash=decodeURIComponent(hash)}catch(_unused){// Continue regardless of an error.
}var subDelimiterIndex=decodedHash.indexOf(subDelimiter);if(subDelimiterIndex===-1)input="";else{input=decodedHash.substring(subDelimiterIndex);if(input.startsWith(subDelimiter))input=input.substring(subDelimiter.length)}}else if(input.startsWith("?"))input=input.substring("?".length);var data=input?input.split("&"):[];search=search.substring("?".length);if(both&&search)data=data.concat(search.split("&"));// endregion
// region construct data structure
var parameters=[];var _iterator=_createForOfIteratorHelper(data),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var _value=_step.value;var keyValuePair=_value.split("=");var key=void 0;try{key=decodeURIComponent(keyValuePair[0])}catch(_unused2){key=""}try{_value=decodeURIComponent(keyValuePair[1])}catch(_unused3){_value=""}parameters.push(key);if(allowDuplicates){if(Object.prototype.hasOwnProperty.call(parameters,key)&&Array.isArray(parameters[key]))parameters[key].push(_value);else parameters[key]=[_value];}else parameters[key]=_value}// endregion
}catch(err){_iterator.e(err)}finally{_iterator.f()}if(keyToGet){if(Object.prototype.hasOwnProperty.call(parameters,keyToGet))return parameters[keyToGet];return null}return parameters};/**
 * Checks if a given path has given path prefix.
 * @param prefix - Path prefix to search for.
 * @param path - Path to search in.
 * @param separator - Delimiter to use in a path (default is the posix
 * conform slash).
 * @returns Value "true" if given prefix occurs and "false" otherwise.
 */var hasPathPrefix=function hasPathPrefix(prefix,path,separator){if(prefix===void 0){prefix="/admin"}if(path===void 0){var _globalContext$locati0;path=((_globalContext$locati0=globalContext.location)===null||_globalContext$locati0===void 0?void 0:_globalContext$locati0.pathname)||""}if(separator===void 0){separator="/"}if(typeof prefix==="string"){if(!prefix.endsWith(separator))prefix+=separator;return path===prefix.substring(0,prefix.length-separator.length)||path.startsWith(prefix)}return false};/**
 * Normalized given website url.
 * @param givenURL - Uniform resource locator to normalize.
 * @returns Normalized result.
 */var normalizeURL=function normalizeURL(givenURL){if(typeof givenURL==="string"){var url=givenURL.replace(/^:?\/+/,"").replace(/\/+$/,"").trim();if(url.startsWith("http"))return url;return"http://".concat(url)}return""};/**
 * Represents given website url.
 * @param url - Uniform resource locator to represent.
 * @returns Represented result.
 */var representURL=function representURL(url){if(typeof url==="string")return url.replace(/^(https?)?:?\/+/,"").replace(/\/+$/,"").trim();return""};/**
 * Checks if given url points to another "service" than the second given url.
 * If no second given url is provided, the current url will be assumed.
 * @param url - URL to check against second url.
 * @param referenceURL - URL to check against first url.
 * @returns Returns "true" if given first url has same domain as given
 * second (or current).
 */var serviceURLEquals=function serviceURLEquals(url,referenceURL){if(referenceURL===void 0){var _globalContext$locati1;referenceURL=((_globalContext$locati1=globalContext.location)===null||_globalContext$locati1===void 0?void 0:_globalContext$locati1.href)||""}var domain=getDomainName(url,"");var protocol=getProtocolName(url,"");var port=getPortNumber(url);return(domain===""||domain===getDomainName(referenceURL))&&(protocol===""||protocol===getProtocolName(referenceURL))&&(port===null||port===getPortNumber(referenceURL))};// endregion
/**
 * Converts a camel-cased string to its delimited string version.
 * @param value - The string to format.
 * @param delimiter - Defines delimiter string.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @returns The formatted string.
 */var camelCaseToDelimited=function camelCaseToDelimited(value,delimiter,abbreviations){if(delimiter===void 0){delimiter="-"}if(abbreviations===void 0){abbreviations=null}if(!abbreviations)abbreviations=ABBREVIATIONS;var escapedDelimiter=maskForRegularExpression(delimiter);if(abbreviations.length){var abbreviationPattern="";var _iterator2=_createForOfIteratorHelper(abbreviations),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var abbreviation=_step2.value;if(abbreviationPattern)abbreviationPattern+="|";abbreviationPattern+=abbreviation.toUpperCase()}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}value=value.replace(new RegExp("(".concat(abbreviationPattern,")(").concat(abbreviationPattern,")"),"g"),"$1".concat(delimiter,"$2"))}value=value.replace(new RegExp("([^".concat(escapedDelimiter,"])([A-Z][a-z]+)"),"g"),"$1".concat(delimiter,"$2"));return value.replace(new RegExp("([a-z0-9])([A-Z])","g"),"$1".concat(delimiter,"$2")).toLowerCase()};/**
 * Converts a string to its capitalized representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */var capitalize=function capitalize(string){return string.charAt(0).toUpperCase()+string.substring(1)};/**
 * Compiles a given string as an expression with given scope names.
 * @param expression - The string to interpret.
 * @param givenOptions - Expression options.
 * @param givenOptions.scope - Scope to extract names from.
 * @param givenOptions.execute - Indicates whether to execute or evaluate.
 * @param givenOptions.removeGlobalScope - Indicates whether to shadow global
 * scope.
 * @param givenOptions.binding - Object to apply as "this" in evaluation scope.
 * @param givenOptions.async - Indicates whether to compile an async function.
 * @returns Object of prepared scope name mappings and compiled function or
 * error string message if given expression couldn't be compiled.
 */var compile=function compile(expression,givenOptions){var _Babel;if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({scope:[],async:false,execute:false,removeGlobalScope:true,binding:{}},givenOptions);/*
        NOTE: We do this global variable name determining as close as possible
        to the compiling step to cover as much as possible global introduces
        variables.
    */var globalNames=Object.keys(globalThis).concat("globalThis").filter(function(name){return new RegExp("^[".concat(ALLOWED_STARTING_VARIABLE_SYMBOLS,"]")+"[".concat(ALLOWED_VARIABLE_SYMBOLS,"]*$")).test(name)&&!KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS.includes(name)});var result={error:null,globalNames:globalNames,globalNamesUndefinedList:globalNames.map(function(){return undefined}),originalScopeNames:Array.isArray(options.scope)?options.scope:typeof options.scope==="string"?[options.scope]:Object.keys(options.scope),scopeNameMapping:{},scopeNames:[],templateFunction:function templateFunction(){return undefined}};var _iterator3=_createForOfIteratorHelper(result.originalScopeNames),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var name=_step3.value;var newName=convertToValidVariableName(name);result.scopeNameMapping[name]=newName;result.scopeNames.push(newName)}// region try to polyfill template string literals for older engines
}catch(err){_iterator3.e(err)}finally{_iterator3.f()}if(POLYFILL_TEMPLATE_STRINGS.value)if((_Babel=_context_js__WEBPACK_IMPORTED_MODULE_7__/* .globalContext */ .Lz.Babel)!==null&&_Babel!==void 0&&_Babel.transform)expression=_context_js__WEBPACK_IMPORTED_MODULE_7__/* .globalContext */ .Lz.Babel.transform("(".concat(expression,")"),{plugins:["transform-template-literals"]}).code;else if(expression.startsWith("`")&&expression.endsWith("`")){var escapeMarker="####";// Convert template string into legacy string concatenations.
expression=expression// Mark simple escape sequences.
.replace(/\\\$/g,escapeMarker)// Handle avoidable template expression: Use raw code.
.replace(/^`\$\{([\s\S]+)}`$/,"String($1)")// Use plain string with single quotes.
.replace(/^`([^']+)`$/,"'$1'")// Use plain string with double quotes.
.replace(/^`([^"]+)`$/,"\"$1\"");// Use single quotes and hope (just a heuristic).
var quote=expression.charAt(0)==="`"?"'":expression.charAt(0);expression=expression// Replace a simple placeholder.
// NOTE: Replace complete bracket pairs.
.replace(/\$\{((([^{]*{[^}]*}[^}]*})|[^{}]+)+)}/g,"".concat(quote,"+($1)+").concat(quote)).replace(/^`([\s\S]+)`$/,"".concat(quote,"$1").concat(quote))// Remove remaining newlines.
.replace(/\n+/g,"")// Replace marked escape sequences.
.replace(new RegExp(escapeMarker,"g"),"\\$")}// endregion
var innerTemplateFunction;try{// eslint-disable-next-line @typescript-eslint/no-unsafe-call
innerTemplateFunction=_construct(options.async?AsyncFunction:Function,_toConsumableArray(options.removeGlobalScope?result.globalNames:[]).concat(_toConsumableArray(result.scopeNames),["".concat(options.execute?"":"return ").concat(expression)]))}catch(error){result.error="Given ".concat(options.async?"async":"sync"," expression ")+"\"".concat(expression,"\" could not be compiled width ")+"given scope names \"".concat(result.scopeNames.join("\", \""),"\": ")+(0,_object_js__WEBPACK_IMPORTED_MODULE_8__/* .represent */ .Do)(error)}if(innerTemplateFunction){var boundInnerTemplateFunction=innerTemplateFunction.bind(options.binding);result.templateFunction=options.removeGlobalScope?function(){for(var _len=arguments.length,parameters=new Array(_len),_key=0;_key<_len;_key++){parameters[_key]=arguments[_key]}return(/*
                    NOTE: We shadow existing global names to sandbox
                    expressions.
                */boundInnerTemplateFunction.apply(void 0,_toConsumableArray(result.globalNamesUndefinedList).concat(parameters)))}:boundInnerTemplateFunction}return result};/**
 * Evaluates a given string as an expression against a given scope.
 * @param expression - The string to interpret.
 * @param givenOptions - Expression options.
 * @param givenOptions.scope - Scope to extract names from.
 * @param givenOptions.execute - Indicates whether to execute or evaluate.
 * @param givenOptions.removeGlobalScope - Indicates whether to shadow global
 * scope.
 * @param givenOptions.binding - Object to apply as "this" in evaluation scope.
 * @param givenOptions.async - Indicates whether to compile an async function.
 * @returns Object with an error message during parsing / running or result.
 */var evaluate=function evaluate(expression,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({scope:{},async:false,execute:false,removeGlobalScope:true,binding:{}},givenOptions);// NOTE: We extract string-only types from given scope type.
var _compile=compile(expression,options),error=_compile.error,originalScopeNames=_compile.originalScopeNames,scopeNames=_compile.scopeNames,templateFunction=_compile.templateFunction;var result={compileError:null,runtimeError:null,error:"Not yet evaluated.",result:undefined};if(error){result.compileError=result.error=error;return result}try{result={compileError:null,runtimeError:null,error:null,result:templateFunction.apply(void 0,_toConsumableArray(originalScopeNames.map(function(name){return options.scope[name]})))}}catch(error){result.error=result.runtimeError="Given ".concat(options.async?"async":"sync"," expression ")+"\"".concat(expression,"\" could not be evaluated with given scope ")+"names \"".concat(scopeNames.join("\", \""),"\": ")+(0,_object_js__WEBPACK_IMPORTED_MODULE_8__/* .represent */ .Do)(error)}return result};/**
 * Evaluates a given string as an expression against a given scope. Does same
 * as "evaluate" but throws an exception if an error occurs and returns the
 * evaluated value instead of an object with error and result.
 * @param expression - The string to interpret.
 * @param options - Expression options.
 * @param options.scope - Scope to extract names from.
 * @param options.execute - Indicates whether to execute or evaluate.
 * @param options.removeGlobalScope - Indicates whether to shadow global scope.
 * @param options.binding - Object to apply as "this" in evaluation scope.
 * @param options.async - Indicates whether to compile an async function.
 * @returns Object with an error message during parsing / running or result.
 */var evaluateOrThrowError=function evaluateOrThrowError(expression,options){if(options===void 0){options={}}var evaluated=evaluate(expression,options);if(evaluated.error)throw new Error(evaluated.error);return evaluated.result};/**
 * Compresses given style attribute value.
 * @param styleValue - Style value to compress.
 * @returns The compressed value.
 */var compressStyleValue=function compressStyleValue(styleValue){return styleValue.replace(/ *([:;]) */g,"$1").replace(/ +/g," ").replace(/^;+/,"").replace(/;+$/,"").trim()};/**
 * Translates a given name into a valid JavaScript one.
 * @param name - Name to convert.
 * @returns Converted name is returned.
 */var convertToValidVariableName=function convertToValidVariableName(name){if(["class","default"].includes(name))return"_".concat(name);return name// Remove all disallowed starting characters.
.replace(new RegExp("^[^".concat(ALLOWED_STARTING_VARIABLE_SYMBOLS,"]+")),"")// Remove all disallowed characters within a variable name and make
// continuing character upper case.
.replace(new RegExp("[^".concat(ALLOWED_VARIABLE_SYMBOLS,"]+([a-zA-Z])"),"g"),function(_fullMatch,firstLetter){return firstLetter.toUpperCase()})};/**
 * Decodes all html symbols in text nodes in a given html string.
 * @param htmlString - HTML string to decode.
 * @returns Decoded html string.
 */var decodeHTMLEntities=function decodeHTMLEntities(htmlString){if(globalContext.document){var textareaDomNode=globalContext.document.createElement("textarea");textareaDomNode.innerHTML=htmlString;return textareaDomNode.value}return null};/**
 * Converts a delimited string to its camel case representation.
 * @param value - The string to format.
 * @param delimiter - Delimiter string to use.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
 * formatted camel case abbreviations will be ignored.
 * @param removeMultipleDelimiter - Indicates whether a series of delimiter
 * should be consolidated.
 * @returns The formatted string.
 */var delimitedToCamelCase=function delimitedToCamelCase(value,delimiter,abbreviations,preserveWrongFormattedAbbreviations,removeMultipleDelimiter){if(delimiter===void 0){delimiter="-"}if(abbreviations===void 0){abbreviations=null}if(preserveWrongFormattedAbbreviations===void 0){preserveWrongFormattedAbbreviations=false}if(removeMultipleDelimiter===void 0){removeMultipleDelimiter=false}var escapedDelimiter=maskForRegularExpression(delimiter);if(!abbreviations)abbreviations=ABBREVIATIONS;var abbreviationPattern;if(preserveWrongFormattedAbbreviations)abbreviationPattern=ABBREVIATIONS.join("|");else{abbreviationPattern="";var _iterator4=_createForOfIteratorHelper(abbreviations),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var abbreviation=_step4.value;if(abbreviationPattern)abbreviationPattern+="|";abbreviationPattern+="".concat(capitalize(abbreviation),"|").concat(abbreviation)}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}}var stringStartsWithDelimiter=value.startsWith(delimiter);if(stringStartsWithDelimiter)value=value.substring(delimiter.length);value=value.replace(new RegExp("(".concat(escapedDelimiter,")(").concat(abbreviationPattern,")")+"(".concat(escapedDelimiter,"|$)"),"g"),function(_fullMatch,before,abbreviation,after){return before+abbreviation.toUpperCase()+after});if(removeMultipleDelimiter)escapedDelimiter="(?:".concat(escapedDelimiter,")+");value=value.replace(new RegExp("".concat(escapedDelimiter,"([a-zA-Z0-9])"),"g"),function(_fullMatch,firstLetter){return firstLetter.toUpperCase()});if(stringStartsWithDelimiter)value=delimiter+value;return value};/**
 * Translates a given string into the regular expression validated
 * representation.
 * @param value - String to convert.
 * @param excludeSymbols - Symbols not to escape.
 * @returns Converted string.
 */var escapeRegularExpressions=function escapeRegularExpressions(value,excludeSymbols){if(excludeSymbols===void 0){excludeSymbols=[]}// NOTE: This is only for performance improvements.
if(value.length===1&&!_constants_js__WEBPACK_IMPORTED_MODULE_6__/* .SPECIAL_REGEX_SEQUENCES */ .FI.includes(value))return value;// The escape sequence must also be escaped; but at first.
if(!excludeSymbols.includes("\\"))value.replace(/\\/g,"\\\\");var _iterator5=_createForOfIteratorHelper(_constants_js__WEBPACK_IMPORTED_MODULE_6__/* .SPECIAL_REGEX_SEQUENCES */ .FI),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var replace=_step5.value;if(!excludeSymbols.includes(replace))value=value.replace(new RegExp("\\".concat(replace),"g"),"\\".concat(replace))}}catch(err){_iterator5.e(err)}finally{_iterator5.f()}return value};/**
 * Finds the string match of a given query in a given target text by applying a
 * given normalization function to target and query.
 * @param target - Target to search in.
 * @param query - Search string to search for.
 * @param normalizer - Function to use as normalization for queries and search
 * targets.
 * @param skipTagDelimitedParts - Indicates whether to, for example, ignore
 * html tags via "['<', '>']" (the default).
 * @returns Start and end index of matching range.
 */var findNormalizedMatchRange=function findNormalizedMatchRange(target,query,normalizer,skipTagDelimitedParts){if(normalizer===void 0){normalizer=function normalizer(value){return typeof value==="string"?value.trim().toLowerCase():value}}if(skipTagDelimitedParts===void 0){skipTagDelimitedParts=["<",">"]}var normalizedQuery=normalizer(query);var stringNormalizedQuery;if(typeof normalizedQuery==="string")stringNormalizedQuery=normalizedQuery;else{var match=target.match(normalizedQuery);stringNormalizedQuery=match?match[0]:""}if(!stringNormalizedQuery)return null;var normalizedTarget=normalizer(target);if(!normalizedTarget)return null;var stringTarget=typeof target==="string"?target:normalizedTarget;var inTag=false;for(var index=0;index<stringTarget.length;index+=1){if(inTag){if(Array.isArray(skipTagDelimitedParts)&&stringTarget.charAt(index)===skipTagDelimitedParts[1])inTag=false;continue}if(Array.isArray(skipTagDelimitedParts)&&stringTarget.charAt(index)===skipTagDelimitedParts[0]){inTag=true;continue}/*
            Skip positions the normalizer strips away (e.g. leading
            whitespace), so the reported match index aligns with the real
            character.
        */if(!normalizer(stringTarget.charAt(index)))continue;if(normalizer(stringTarget.substring(index)).startsWith(stringNormalizedQuery)){if(stringNormalizedQuery.length===1)return[index,index+1];for(var subIndex=stringTarget.length;subIndex>index;subIndex-=1)if(!normalizer(stringTarget.substring(index,subIndex)).startsWith(stringNormalizedQuery))return[index,subIndex+1]}}return null};/**
 * Fixes known encoding problems in given data.
 * @param data - To process.
 * @returns Processed data.
 */var fixKnownEncodingErrors=function fixKnownEncodingErrors(data){for(var _i=0,_FIX_ENCODING_ERROR_M=FIX_ENCODING_ERROR_MAPPING;_i<_FIX_ENCODING_ERROR_M.length;_i++){var _FIX_ENCODING_ERROR_M2=_slicedToArray(_FIX_ENCODING_ERROR_M[_i],2),search=_FIX_ENCODING_ERROR_M2[0],replacement=_FIX_ENCODING_ERROR_M2[1];data=data.replace(new RegExp(search,"g"),replacement)}return data};/**
 * Performs a string formation. Replaces every placeholder "{i}" with the i'th
 * argument.
 * @param string - The string to format.
 * @param additionalArguments - Additional arguments are interpreted as
 * replacements for string formatting.
 * @returns The formatted string.
 */var format=function format(string){for(var _len2=arguments.length,additionalArguments=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){additionalArguments[_key2-1]=arguments[_key2]}additionalArguments.unshift(string);var index=0;for(var _i2=0,_additionalArguments=additionalArguments;_i2<_additionalArguments.length;_i2++){var _value2=_additionalArguments[_i2];string=string.replace(new RegExp("\\{".concat(String(index),"\\}"),"gm"),String(_value2));index+=1}return string};/**
 * Calculates the edit (levenstein) distance between two given strings.
 * @param first - First string to compare.
 * @param second - Second string to compare.
 * @returns The distance as number.
 */var getEditDistance=function getEditDistance(first,second){/*
        Create empty edit distance matrix for all possible modifications of
        substrings of "first" to substrings of "second".
    */var distanceMatrix=Array(second.length+1).fill(null).map(function(){return Array(first.length+1).fill(null)});/*
        Fill the first row of the matrix.
        If this is the first row, then, we're transforming an empty string to
        "first". In this case the number of transformations equals to the size
        of the "first" substring.
    */for(var index=0;index<=first.length;index++)distanceMatrix[0][index]=index;/*
        Fill the first column of the matrix.
        If this is the first column, then we're transforming an empty string to
        "second".
        In this case the number of transformations equals to the size of the
        "second" substring.
    */for(var _index=0;_index<=second.length;_index++)distanceMatrix[_index][0]=_index;for(var firstIndex=1;firstIndex<=second.length;firstIndex++)for(var secondIndex=1;secondIndex<=first.length;secondIndex++){var indicator=first[secondIndex-1]===second[firstIndex-1]?0:1;distanceMatrix[firstIndex][secondIndex]=Math.min(// deletion
distanceMatrix[firstIndex][secondIndex-1]+1,// insertion
distanceMatrix[firstIndex-1][secondIndex]+1,// substitution
distanceMatrix[firstIndex-1][secondIndex-1]+indicator)}return distanceMatrix[second.length][first.length]};/**
 * Abbreviates a given string if it excesses a given limit.
 * @param value - String to abbreviate.
 * @param limit - Maximum length of processed string.
 * @returns Abbreviated given string.
 */var limit=function limit(value,_limit){if(_limit===void 0){_limit=100}if(value.length<=_limit)return value;var dots="...";return value.substring(0,_limit-dots.length)+dots};/**
 * Converts a string to its lower case representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */var lowerCase=function lowerCase(string){return string.charAt(0).toLowerCase()+string.substring(1)};/**
 * Wraps given mark strings in a given target with a given marker.
 * @param target - String to search in.
 * @param givenSearchWords - String or regular expression or array of those to
 * search for.
 * @param givenOptions - Defines highlighting behavior.
 * @param givenOptions.marker - HTML template string to mark.
 * @param givenOptions.normalizer - Pure normalization function to use before
 * searching for matches.
 * @param givenOptions.skipTagDelimitedParts - Indicates whether to, for
 * example, ignore html tags via "['<', '>']" (the default).
 * @returns Processed result.
 */var mark=function mark(target,givenSearchWords,givenOptions){if(givenOptions===void 0){givenOptions={}}if(typeof target==="string"&&(Array.isArray(givenSearchWords)&&givenSearchWords.length||givenSearchWords instanceof RegExp||typeof givenSearchWords==="string"&&givenSearchWords.length)){var options=_objectSpread({marker:"<span class=\"tools-mark\">{1}</span>",normalizer:function normalizer(value){return typeof value==="string"?value.trim().toLowerCase():value},skipTagDelimitedParts:["<",">"]},givenOptions);target=target.trim();var markedTarget=[];var searchWords=[].concat(givenSearchWords);var index=0;var _iterator6=_createForOfIteratorHelper(searchWords),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var _word=_step6.value;searchWords[index]=options.normalizer(_word);index+=1}}catch(err){_iterator6.e(err)}finally{_iterator6.f()}var restTarget=target;var offset=0;/*
            Search for matches as long there is enough target text remaining to
            walk through.
        */for(var iteration=0;iteration<MAXIMAL_NUMBER_OF_ITERATIONS.value;iteration++){var nearestRange=null;var currentRange=void 0;// Find the nearest next matching word.
var _iterator7=_createForOfIteratorHelper(searchWords),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var word=_step7.value;currentRange=findNormalizedMatchRange(restTarget,word,options.normalizer,options.skipTagDelimitedParts);if(currentRange&&(!nearestRange||currentRange[0]<nearestRange[0]))nearestRange=currentRange}}catch(err){_iterator7.e(err)}finally{_iterator7.f()}if(nearestRange){if(nearestRange[0]>0)markedTarget.push(target.substring(offset,offset+nearestRange[0]));markedTarget.push(typeof options.marker==="string"?format(options.marker,target.substring(offset+nearestRange[0],offset+nearestRange[1])):options.marker(target.substring(offset+nearestRange[0],offset+nearestRange[1]),markedTarget));offset+=nearestRange[1];restTarget=target.substring(offset)}else{if(restTarget.length)markedTarget.push(restTarget);break}}return typeof options.marker==="string"?markedTarget.join(""):markedTarget}return target};/**
 * Validates the current string for using in a regular expression pattern.
 * Special regular expression chars will be escaped.
 * @param value - The string to format.
 * @returns The formatted string.
 */var maskForRegularExpression=function maskForRegularExpression(value){return value.replace(/([\\|.*$^+[\]()?\-{}])/g,"\\$1")};/**
 * Converts a dom selector to a prefixed dom selector string.
 * @param selector - A dom node selector.
 * @param selectorPrefix - A dom node selector prefix to take into account.
 * @returns Returns given selector prefixed.
 */var normalizeDomNodeSelector=function normalizeDomNodeSelector(selector,selectorPrefix){if(selectorPrefix===void 0){selectorPrefix=""}var domNodeSelectorPrefix="";if(selectorPrefix)domNodeSelectorPrefix="".concat(selectorPrefix," ");if(!(selector.startsWith(domNodeSelectorPrefix)||selector.trim().startsWith("<")))selector=domNodeSelectorPrefix+selector;return selector.trim()};/**
 * Normalizes a given phone number for automatic dialing or comparison.
 * @param value - Number to normalize.
 * @param dialable - Indicates whether the result should be dialed or
 * represented as lossless data.
 * @returns Normalized number.
 */var normalizePhoneNumber=function normalizePhoneNumber(value,dialable){if(dialable===void 0){dialable=true}if(typeof value==="string"||typeof value==="number"){var normalizedValue=String(value).trim();// Normalize country code prefix.
normalizedValue=normalizedValue.replace(/^[^0-9]*\+/,"00");// Remove alternate direct dial numbers.
normalizedValue=normalizedValue.replace(/([0-9].*?) *(,|o[rd]?)\.? ?-?[0-9]+$/,"$1");if(dialable)return normalizedValue.replace(/[^0-9]+/g,"");var separatorPattern="(?:[ /\\-]+)";// Remove unneeded area code zero in brackets.
normalizedValue=normalizedValue.replace(new RegExp("^(.+?)".concat(separatorPattern,"?\\(0\\)").concat(separatorPattern,"?")+"(.+)$"),"$1-$2");// Remove unneeded area code brackets.
normalizedValue=normalizedValue.replace(new RegExp("^(.+?)".concat(separatorPattern,"?\\((.+)\\)")+"".concat(separatorPattern,"?(.+)$")),"$1-$2-$3");/*
            Remove separators that don't mark semantics:
            1: Country code
            2: Area code
            3: Number
        */var compiledPattern=new RegExp("^(00[0-9]+)".concat(separatorPattern,"([0-9]+)").concat(separatorPattern)+"(.+)$");if(compiledPattern.test(normalizedValue))// Country code and area code matched.
normalizedValue=normalizedValue.replace(compiledPattern,function(_match,countryCode,areaCode,number){return"".concat(countryCode,"-").concat(areaCode,"-")+sliceAllExceptNumberAndLastSeparator(number)});else{/*
                One prefix code matched:
                1: Prefix code
                2: Number
            */compiledPattern=/^([0-9 ]+)[/-](.+)$/;var replacer=function replacer(_match,prefixCode,number){return"".concat(prefixCode.replace(/ +/,""),"-")+sliceAllExceptNumberAndLastSeparator(number)};if(compiledPattern.test(normalizedValue))// Prefer "/" or "-" over " " as area code separator.
normalizedValue=normalizedValue.replace(compiledPattern,replacer);else normalizedValue=normalizedValue.replace(new RegExp("^([0-9]+)".concat(separatorPattern,"(.+)$")),replacer)}return normalizedValue.replace(/[^0-9-]+/g,"").replace(/^-+$/,"")}return""};/**
 * Normalizes a given zip code for automatic address processing.
 * @param value - Number to normalize.
 * @returns Normalized number.
 */var normalizeZipCode=function normalizeZipCode(value){if(typeof value==="string"||typeof value==="number")return String(value).trim().replace(/^([^0-9]*[a-zA-Z]-)?(.+)$/,function(match,prefix,code){if(prefix)prefix=prefix.substring(prefix.length-2).charAt(0).toUpperCase()+"-";return(prefix!==null&&prefix!==void 0?prefix:"")+(code!==null&&code!==void 0?code:"").trim().replace(/[^0-9]+/g,"")});return""};/**
 * Converts a given serialized, base64 encoded or file path given object into a
 * native JavaScript one if possible.
 * @param serializedObject - Object as string.
 * @param scope - An optional scope which will be used to evaluate given object
 * in.
 * @param name - The name under given scope will be available.
 * @returns The parsed object if possible and null otherwise.
 */var parseEncodedObject=function parseEncodedObject(serializedObject,scope,name){var _imports$fs;if(scope===void 0){scope={}}if(name===void 0){name="scope"}if(!((_imports$fs=imports.fs)!==null&&_imports$fs!==void 0&&_imports$fs.readFileSync))throw new Error("File system api could not be loaded.");if(serializedObject.endsWith(".json")&&isFileSync(serializedObject))serializedObject=imports.fs.readFileSync(serializedObject,{encoding:DEFAULT_ENCODING});serializedObject=serializedObject.trim();if(!serializedObject.startsWith("{"))serializedObject=eval("Buffer").from(serializedObject,"base64").toString(DEFAULT_ENCODING);var result=evaluate(serializedObject,{scope:_defineProperty({},name,scope)});if(_typeof(result.result)==="object")return result.result;return null};/**
 * Represents a given phone number. NOTE: Currently only support German phone
 * numbers.
 * @param value - Number to format.
 * @returns Formatted number.
 */var representPhoneNumber=function representPhoneNumber(value){if(["number","string"].includes(determineType(value))&&value){// Represent country code and leading area code zero.
var normalizedValue=// eslint-disable-next-line @typescript-eslint/no-base-to-string
String(value).replace(/^(00|\+)([0-9]+)-([0-9-]+)$/,"+$2 (0) $3");// Add German country code if not exists.
normalizedValue=normalizedValue.replace(/^0([1-9][0-9-]+)$/,"+49 (0) $1");// Separate area code from base number.
normalizedValue=normalizedValue.replace(/^([^-]+)-([0-9-]+)$/,"$1 / $2");// Partition base number in one triple and tuples or tuples only.
return normalizedValue.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/,function(_match,prefix,number,suffix){return prefix+(number.length%2===0?number.replace(/([0-9]{2})/g,"$1 "):number.replace(/^([0-9]{3})([0-9]+)$/,function(_match,triple,rest){return"".concat(triple," ")+rest.replace(/([0-9]{2})/g,"$1 ").trim()})+suffix).trim()}).trim()}return""};/**
 * Slices all none numbers but preserves last separator.
 * @param value - String to process.
 * @returns - Sliced given value.
 */var sliceAllExceptNumberAndLastSeparator=function sliceAllExceptNumberAndLastSeparator(value){/*
        1: baseNumber
        2: directDialingNumberSuffix
    */var compiledPattern=/^(.*[0-9].*)-([0-9]+)$/;if(compiledPattern.test(value))return value.replace(compiledPattern,function(_match,baseNumber,directDialingNumberSuffix){return"".concat(baseNumber.replace(/[^0-9]+/g,""),"-")+directDialingNumberSuffix});return value.replace(/[^0-9]+/g,"")};

/***/ }),
/* 20 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 21 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 22 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 23 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 24 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 25 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   W2: function() { return /* binding */ isNotANumber; }
/* harmony export */ });
/* unused harmony exports ceil, floor, round, getUTCTimestamp */
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module number *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*//**
 * Rounds a given number up accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */var ceil=function ceil(number,digits){if(digits===void 0){digits=0}return Math.ceil(number*Math.pow(10,digits))/Math.pow(10,digits)};/**
 * Rounds a given number down accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */var floor=function floor(number,digits){if(digits===void 0){digits=0}return Math.floor(number*Math.pow(10,digits))/Math.pow(10,digits)};/**
 * Rounds a given number accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */var round=function round(number,digits){if(digits===void 0){digits=0}return Math.round(number*Math.pow(10,digits))/Math.pow(10,digits)};/**
 * Determines corresponding utc timestamp for given date object.
 * @param value - Date to convert.
 * @param inMilliseconds - Indicates whether given number should be in
 * seconds (default) or milliseconds.
 * @returns Determined numerous value.
 */var getUTCTimestamp=function getUTCTimestamp(value,inMilliseconds){if(inMilliseconds===void 0){inMilliseconds=false}var date=[null,undefined].includes(value)?new Date:new Date(value);return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds(),date.getUTCMilliseconds())/(inMilliseconds?1:1000)};/**
 * Checks if given object is java scripts native "Number.NaN" object.
 * @param value - Value to check.
 * @returns Returns whether given value is not a number or not.
 */var isNotANumber=function isNotANumber(value){return (0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .determineType */ .Sj)(value)==="number"&&isNaN(value)};

/***/ }),
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),
/* 29 */,
/* 30 */,
/* 31 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $y: function() { return /* binding */ isSwitchExpression; },
/* harmony export */   G3: function() { return /* binding */ isCondition; },
/* harmony export */   Gc: function() { return /* binding */ isAndExpression; },
/* harmony export */   HK: function() { return /* binding */ isConcatExpression; },
/* harmony export */   MP: function() { return /* binding */ isIfExpression; },
/* harmony export */   YG: function() { return /* binding */ isOperation; },
/* harmony export */   Z9: function() { return /* binding */ isMappingExpression; },
/* harmony export */   ZI: function() { return /* binding */ isArrayContainsExpression; },
/* harmony export */   bF: function() { return /* binding */ isUnaryOperation; },
/* harmony export */   bQ: function() { return /* binding */ isSpecificExpression; },
/* harmony export */   cB: function() { return /* binding */ isSelector; },
/* harmony export */   g6: function() { return /* binding */ isOrExpression; },
/* harmony export */   ml: function() { return /* binding */ isValue; }
/* harmony export */ });
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};var isSpecificExpression=function isSpecificExpression(expression,indicatorKey,properties){if(properties===void 0){properties=[]}if(!((0,_indicators_js__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(expression)&&Object.prototype.hasOwnProperty.call(expression,indicatorKey)))return false;var _iterator=_createForOfIteratorHelper(properties),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var name=_step.value;if(!Object.prototype.hasOwnProperty.call(expression,name))return false}}catch(err){_iterator.e(err)}finally{_iterator.f()}return true};var isCondition=function isCondition(expression){return isSpecificExpression(expression,"$comparator",["value1","value2"])};var isAndExpression=function isAndExpression(expression){return isSpecificExpression(expression,"$and")};var isOrExpression=function isOrExpression(expression){return isSpecificExpression(expression,"$or")};var isConcatExpression=function isConcatExpression(expression){return isSpecificExpression(expression,"$concat")};var isMappingExpression=function isMappingExpression(expression){return isSpecificExpression(expression,"$mapping",["data"])};var isOperation=function isOperation(expression){return isSpecificExpression(expression,"$operator",["operand1","operand2"])};var isUnaryOperation=function isUnaryOperation(expression){return isSpecificExpression(expression,"$operator",["operand"])};var isIfExpression=function isIfExpression(expression){return isSpecificExpression(expression,"$if")};var isSwitchExpression=function isSwitchExpression(expression){return isSpecificExpression(expression,"$switch")};var isArrayContainsExpression=function isArrayContainsExpression(expression){return isSpecificExpression(expression,"$arrayContains")};var isSelector=function isSelector(expression){return isSpecificExpression(expression,"$select")};var isValue=function isValue(expression){return!(isSelector(expression)||isCondition(expression)||isUnaryOperation(expression)||isOperation(expression)||isAndExpression(expression)||isOrExpression(expression)||isConcatExpression(expression)||isMappingExpression(expression)||isIfExpression(expression)||isSwitchExpression(expression)||isArrayContainsExpression(expression))};

/***/ }),
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CH: function() { return /* binding */ evaluateUnaryOperation; },
/* harmony export */   Cp: function() { return /* binding */ evaluateArrayContains; },
/* harmony export */   F9: function() { return /* binding */ evaluateCondition; },
/* harmony export */   Fm: function() { return /* binding */ selectArrayItem; },
/* harmony export */   Hg: function() { return /* binding */ evaluateOr; },
/* harmony export */   Lm: function() { return /* binding */ evaluateSelector; },
/* harmony export */   Pl: function() { return /* binding */ _normalizeSelector; },
/* harmony export */   Q2: function() { return /* binding */ evaluateConcat; },
/* harmony export */   YN: function() { return /* binding */ NO_ITEM_FOUND_SYMBOL; },
/* harmony export */   ZF: function() { return /* binding */ evaluateOperation; },
/* harmony export */   cB: function() { return /* binding */ evaluateMapping; },
/* harmony export */   f7: function() { return /* binding */ evaluateOptionalThen; },
/* harmony export */   fG: function() { return /* binding */ SELECTOR_KEY_NAMES; },
/* harmony export */   j0: function() { return /* binding */ evaluateAnd; },
/* harmony export */   j4: function() { return /* binding */ evaluateSwitch; },
/* harmony export */   lp: function() { return /* binding */ DEFAULT_OPTIONS; },
/* harmony export */   rb: function() { return /* binding */ evaluateIf; },
/* harmony export */   yf: function() { return /* binding */ evaluateSelectorUntilLastObject; }
/* harmony export */ });
/* unused harmony export evaluateExpression */
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var core_js_modules_es_iterator_some_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var core_js_modules_es_set_difference_v2_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(12);
/* harmony import */ var core_js_modules_es_set_intersection_v2_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var core_js_modules_es_set_is_disjoint_from_v2_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(14);
/* harmony import */ var core_js_modules_es_set_is_subset_of_v2_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(15);
/* harmony import */ var core_js_modules_es_set_is_superset_of_v2_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16);
/* harmony import */ var core_js_modules_es_set_symmetric_difference_v2_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(17);
/* harmony import */ var core_js_modules_es_set_union_v2_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(18);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(8);
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(5);
/* harmony import */ var _indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(31);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};var SELECTOR_KEY_NAMES=new Set(["name"]);var NO_ITEM_FOUND_SYMBOL=Symbol.for("EXPRESSION_EVALUATOR_NO_ITEM_FOUND");var DEFAULT_OPTIONS={skipMissingLevel:false,contextReplacements:{},delimiter:"."};var addBracketBasedPathElements=function addBracketBasedPathElements(subParts){var path=[];// NOTE: We add index assignments into path array.
var _iterator=_createForOfIteratorHelper(subParts),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var subPart=_step.value;var openingBracketPosition=subPart.indexOf("[");if(openingBracketPosition>0)path.push(subPart.substring(0,openingBracketPosition));// Trim bracket padding "[index]" => "index".
path.push(subPart.substring(openingBracketPosition+1,subPart.length-1))}}catch(err){_iterator.e(err)}finally{_iterator.f()}return path};var _normalizeSelector=function normalizeSelector(selector,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread(_objectSpread({},DEFAULT_OPTIONS),{},{scope:{}},givenOptions);var path=[];var _iterator2=_createForOfIteratorHelper([].concat(selector)),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var component=_step2.value;if(typeof component==="string"){var parts=component.split(options.delimiter);var _iterator3=_createForOfIteratorHelper(parts),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var part=_step3.value;if(!part)continue;if((0,_index_js__WEBPACK_IMPORTED_MODULE_12__/* .isFunction */ .Tn)(part)){path.push(part);continue}// Identify bracket based selectors like "[index]".
var openingBracketPosition=part.indexOf("[");var restPart=part;if(openingBracketPosition!==-1){restPart=part.substring(openingBracketPosition);part=part.substring(0,openingBracketPosition)}if(Object.prototype.hasOwnProperty.call(options.contextReplacements,part))path.push.apply(path,_toConsumableArray(_normalizeSelector(options.contextReplacements[part],options)));else path.push(part);if(restPart!==part){// Trim bracket padding "[index]" => "index".
var subParts=restPart.match(/[^[]*\[\d+]/g);path.push.apply(path,_toConsumableArray(addBracketBasedPathElements(subParts)))}}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}}else path.push(evaluateExpression(component,options.scope,options))}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}return path};var selectArrayItem=function selectArrayItem(data,keyOrIndex){// Assume that an array item should be found by its property name.
var _iterator4=_createForOfIteratorHelper(data),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var item=_step4.value;var _iterator5=_createForOfIteratorHelper(SELECTOR_KEY_NAMES),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var selectorKeyName=_step5.value;if(Object.prototype.hasOwnProperty.call(item,selectorKeyName)&&item[selectorKeyName]===keyOrIndex)return item}}catch(err){_iterator5.e(err)}finally{_iterator5.f()}}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}return NO_ITEM_FOUND_SYMBOL};/**
 * Retrieves substructure in given object referenced by given selector
 * path.
 * @param selector - Selector path.
 * @param scope - Object to search in.
 * @param givenOptions - Object to configure evaluation.
 * @param givenOptions.contextReplacements - Configuration how to replace
 * "this" and "thisParent" keywords in selectors.
 * @param givenOptions.delimiter - Delimiter to delimit given selector
 * components.
 * @param givenOptions.skipMissingLevel - Indicates to skip missing level in
 * given path.
 * @returns Determined sub structure of given data or "undefined".
 */var evaluateSelectorUntilLastObject=function evaluateSelectorUntilLastObject(selector,scope,givenOptions){if(scope===void 0){scope={}}if(givenOptions===void 0){givenOptions={}}var options=_objectSpread(_objectSpread({},DEFAULT_OPTIONS),givenOptions);/*
        Create a list of keys or indexes to retrieve specified value from given
        object.
    */var path=_normalizeSelector(selector,_objectSpread(_objectSpread({},options),{},{scope:scope}));// Dig into given scope for each previously found key or index.
var result=scope;var index=0;var _iterator6=_createForOfIteratorHelper(path),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var keyOrIndex=_step6.value;var isLastPart=index===path.length-1;if((0,_index_js__WEBPACK_IMPORTED_MODULE_12__/* .isObject */ .Gv)(result)){if(Array.isArray(result)&&typeof keyOrIndex==="string"&&isNaN(parseInt(keyOrIndex))){var item=selectArrayItem(result,keyOrIndex);if(item!==NO_ITEM_FOUND_SYMBOL){if(isLastPart)return typeof keyOrIndex==="number"?[result,keyOrIndex]:[result,result.indexOf(item)];result=item}}else if(isLastPart)return[result,keyOrIndex];else if((0,_index_js__WEBPACK_IMPORTED_MODULE_12__/* .isFunction */ .Tn)(keyOrIndex))result=keyOrIndex(result);else if(Object.prototype.hasOwnProperty.call(result,keyOrIndex))result=result[keyOrIndex];else if(!options.skipMissingLevel)return[result,keyOrIndex]}else if(isLastPart)return[result,keyOrIndex];else if(!options.skipMissingLevel)return[result,keyOrIndex];index+=1}}catch(err){_iterator6.e(err)}finally{_iterator6.f()}return[{},""]};/**
 * Retrieves substructure in given object referenced by given selector
 * path.
 * @param selector - Selector path.
 * @param scope - Object to search in.
 * @param options - Options object to configure evaluation.
 * @param options.contextReplacements - Configuration how to replace "this"
 * and "thisParent" keywords in selectors.
 * @param options.delimiter - Delimiter to delimit given selector components.
 * @param options.skipMissingLevel - Indicates to skip missing level in given
 * path.
 * @returns Determined sub structure of given data or "undefined".
 */var evaluateSelector=function evaluateSelector(selector,scope,options){if(scope===void 0){scope={}}if(options===void 0){options={}}var _evaluateSelectorUnti=evaluateSelectorUntilLastObject(selector,scope,options),_evaluateSelectorUnti2=_slicedToArray(_evaluateSelectorUnti,2),lastObject=_evaluateSelectorUnti2[0],lastKey=_evaluateSelectorUnti2[1];if(lastKey==="")return scope;if((0,_index_js__WEBPACK_IMPORTED_MODULE_12__/* .isFunction */ .Tn)(lastKey))return lastKey(lastObject);if(Object.prototype.hasOwnProperty.call(lastObject,lastKey))return lastObject[lastKey];return options.skipMissingLevel?lastObject:undefined};var evaluateCondition=function evaluateCondition(condition,scope,options){var value1=evaluateExpression(condition.value1,scope,options);var value2=evaluateExpression(condition.value2,scope,options);switch(condition.$comparator){case"==":return (0,_index_js__WEBPACK_IMPORTED_MODULE_13__/* .equals */ .aI)(value1,value2);case"!=":return!(0,_index_js__WEBPACK_IMPORTED_MODULE_13__/* .equals */ .aI)(value1,value2);case"<":return value1<value2;case"<=":return value1<=value2;case">":return value1>value2;case">=":return value1>=value2}};var evaluateOperation=function evaluateOperation(operation,scope,options){var operand1=evaluateExpression(operation.operand1,scope,options);var operand2=evaluateExpression(operation.operand2,scope,options);switch(operation.$operator){case"+":return operand1+operand2;case"-":return operand1-operand2;case"*":return operand1*operand2;case"**":return Math.pow(operand1,operand2);case"/":return operand1/operand2}};var evaluateUnaryOperation=function evaluateUnaryOperation(operation,scope,options){var operand=evaluateExpression(operation.operand,scope,options);switch(operation.$operator){case"!":return!operand;case"!!":return Boolean(operand)}};var evaluateOptionalThen=function evaluateOptionalThen(expression,scope,options){if(typeof expression.then==="undefined")return undefined;return evaluateExpression(expression.then,scope,options)};var evaluateIf=function evaluateIf(expression,scope,options){if(evaluateExpression(expression.$if,scope,options))return evaluateOptionalThen(expression,scope,options);return typeof expression.else==="undefined"?undefined:evaluateExpression(expression.else,scope)};var evaluateSwitch=function evaluateSwitch(expression,scope,options){var value=evaluateExpression(expression.$switch,scope);var _iterator7=_createForOfIteratorHelper(expression.caseExpressions),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var caseExpression=_step7.value;if(value===evaluateExpression(caseExpression.$case,scope,options))return evaluateOptionalThen(caseExpression,scope,options)}}catch(err){_iterator7.e(err)}finally{_iterator7.f()}if(typeof expression.default!=="undefined")return evaluateExpression(expression.default,scope,options);return undefined};var evaluateAnd=function evaluateAnd(expression,scope,options){var _iterator8=_createForOfIteratorHelper(expression.$and),_step8;try{for(_iterator8.s();!(_step8=_iterator8.n()).done;){var condition=_step8.value;if(!evaluateExpression(condition,scope,options))return false}}catch(err){_iterator8.e(err)}finally{_iterator8.f()}return true};var evaluateOr=function evaluateOr(expression,scope,options){var _iterator9=_createForOfIteratorHelper(expression.$or),_step9;try{for(_iterator9.s();!(_step9=_iterator9.n()).done;){var condition=_step9.value;if(evaluateExpression(condition,scope,options))return true}}catch(err){_iterator9.e(err)}finally{_iterator9.f()}return false};var evaluateConcat=function evaluateConcat(expression,scope,options){var result=[];var isArray=false;var _iterator0=_createForOfIteratorHelper(expression.$concat),_step0;try{for(_iterator0.s();!(_step0=_iterator0.n()).done;){var item=_step0.value;var value=evaluateExpression(item,scope,options);if(Array.isArray(value))isArray=true;result=result.concat(value)}}catch(err){_iterator0.e(err)}finally{_iterator0.f()}return isArray?result:result.join("")};var evaluateMapping=function evaluateMapping(expression,scope,options){var givenData=evaluateExpression(expression.data,scope,options);var normalizedGivenData=[];if(Array.isArray(givenData))normalizedGivenData=givenData;else for(var _i=0,_Object$entries=Object.entries(givenData);_i<_Object$entries.length;_i++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i],2),key=_Object$entries$_i[0],value=_Object$entries$_i[1];normalizedGivenData.push(_objectSpread(_objectSpread({},value),{},{$key:key}))}var result=[];var _iterator1=_createForOfIteratorHelper(normalizedGivenData),_step1;try{for(_iterator1.s();!(_step1=_iterator1.n()).done;){var item=_step1.value;var _value={};for(var _i2=0,_Object$entries2=Object.entries(expression.$mapping);_i2<_Object$entries2.length;_i2++){var _Object$entries2$_i=_slicedToArray(_Object$entries2[_i2],2),sourceName=_Object$entries2$_i[0],targetName=_Object$entries2$_i[1];if(Object.prototype.hasOwnProperty.call(item,sourceName))_value[targetName]=item[sourceName]}result.push(_value)}}catch(err){_iterator1.e(err)}finally{_iterator1.f()}return result};var evaluateArrayContains=function evaluateArrayContains(expression,scope,options){var array=scope;if(expression.$arrayContains.target!=null)array=evaluateExpression(expression.$arrayContains.target,scope,options);var value=evaluateExpression(expression.$arrayContains.value,scope,options);var key=evaluateExpression(expression.$arrayContains.key,scope,options);if(!Array.isArray(array))return false;return array.some(function(item){if(typeof key==="string"&&(0,_index_js__WEBPACK_IMPORTED_MODULE_12__/* .isPlainObject */ .Qd)(item)&&Object.prototype.hasOwnProperty.call(item,key)){var record=item;return record[key]===value}return item===value})};function evaluateExpression(expression,scope,options){if(scope===void 0){scope={}}if(options===void 0){options={}}if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isSelector */ .cB)(expression))return evaluateSelector(expression.$select,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isCondition */ .G3)(expression))return evaluateCondition(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isUnaryOperation */ .bF)(expression))return evaluateUnaryOperation(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isOperation */ .YG)(expression))return evaluateOperation(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isOrExpression */ .g6)(expression))return evaluateOr(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isAndExpression */ .Gc)(expression))return evaluateAnd(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isConcatExpression */ .HK)(expression))return evaluateConcat(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isMappingExpression */ .Z9)(expression))return evaluateMapping(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isIfExpression */ .MP)(expression))return evaluateIf(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isSwitchExpression */ .$y)(expression))return evaluateSwitch(expression,scope,options);if((0,_indicator_functions_js__WEBPACK_IMPORTED_MODULE_14__/* .isArrayContainsExpression */ .ZI)(expression))return evaluateArrayContains(expression,scope,options);return expression}/* harmony default export */ __webpack_exports__.Ay = (evaluateExpression);

/***/ }),
/* 37 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: function() { return /* binding */ viewArrayAsScope; },
/* harmony export */   x: function() { return /* binding */ _viewObjectAsScope; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)};function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}var viewArrayAsScope=function viewArrayAsScope(data,childrenPropertyNames,propertyReferenceKeys){return new Proxy(data,{ownKeys:function ownKeys(target){return Reflect.ownKeys(target)},get:function get(target,name){var _iterator=_createForOfIteratorHelper(target),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var element=_step.value;var _iterator2=_createForOfIteratorHelper(propertyReferenceKeys),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var key=_step2.value;if(element[key]===name){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
// type ScopeValueType = object
/*
                            eslint-disable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */return _viewObjectAsScope(element,childrenPropertyNames,propertyReferenceKeys);/*
                            eslint-enable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */}}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}}}catch(err){_iterator.e(err)}finally{_iterator.f()}return undefined},set:function set(target,name,value){var index=0;var _iterator3=_createForOfIteratorHelper(target),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var item=_step3.value;var _iterator4=_createForOfIteratorHelper(propertyReferenceKeys),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var key=_step4.value;if(item[key]===name){target[index]=value;return true}}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}index+=1}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}return false}})};var _viewObjectAsScope=function viewObjectAsScope(data,childrenPropertyNames,propertyReferenceKeys){if(childrenPropertyNames===void 0){childrenPropertyNames=["children"]}if(propertyReferenceKeys===void 0){propertyReferenceKeys=["name"]}return new Proxy(data,{ownKeys:function ownKeys(target){return Reflect.ownKeys(target)},get:function get(target,name){var value=target[name];if(Object.prototype.hasOwnProperty.call(target,name)){if(childrenPropertyNames.includes(name)&&Array.isArray(value)){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
return viewArrayAsScope(value,childrenPropertyNames,propertyReferenceKeys)}if(value!==null&&_typeof(value)==="object"){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
// type ScopeValueType = object
/*
                        eslint-disable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */return _viewObjectAsScope(value,childrenPropertyNames,propertyReferenceKeys);/*
                        eslint-enable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */}return value}return undefined},set:function set(target,name,value){if(Object.prototype.hasOwnProperty.call(target,name))if(Object.prototype.hasOwnProperty.call(target,name)){target[name]=value;return true}return false}})};

/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $y: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.$y; },
/* harmony export */   CH: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.CH; },
/* harmony export */   Cp: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Cp; },
/* harmony export */   F9: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.F9; },
/* harmony export */   Fm: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Fm; },
/* harmony export */   G3: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.G3; },
/* harmony export */   Gc: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.Gc; },
/* harmony export */   HK: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.HK; },
/* harmony export */   Hg: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Hg; },
/* harmony export */   Ld: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.cB; },
/* harmony export */   Lm: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Lm; },
/* harmony export */   MP: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.MP; },
/* harmony export */   O4: function() { return /* binding */ evaluateExpression; },
/* harmony export */   Pl: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Pl; },
/* harmony export */   Q2: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.Q2; },
/* harmony export */   YG: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.YG; },
/* harmony export */   YN: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.YN; },
/* harmony export */   Z9: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.Z9; },
/* harmony export */   ZF: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.ZF; },
/* harmony export */   ZI: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.ZI; },
/* harmony export */   bC: function() { return /* reexport safe */ _helper_js__WEBPACK_IMPORTED_MODULE_1__.b; },
/* harmony export */   bF: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.bF; },
/* harmony export */   bQ: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.bQ; },
/* harmony export */   cB: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.cB; },
/* harmony export */   f7: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.f7; },
/* harmony export */   fG: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.fG; },
/* harmony export */   g6: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.g6; },
/* harmony export */   j0: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.j0; },
/* harmony export */   j4: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.j4; },
/* harmony export */   lp: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.lp; },
/* harmony export */   ml: function() { return /* reexport safe */ _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__.ml; },
/* harmony export */   rb: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.rb; },
/* harmony export */   xk: function() { return /* reexport safe */ _helper_js__WEBPACK_IMPORTED_MODULE_1__.x; },
/* harmony export */   yf: function() { return /* reexport safe */ _evaluators_js__WEBPACK_IMPORTED_MODULE_0__.yf; }
/* harmony export */ });
/* harmony import */ var _evaluators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);
/* harmony import */ var _indicator_functions_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/var evaluateExpression=_evaluators_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay;/* harmony default export */ __webpack_exports__.Ay = (evaluateExpression);

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
/******/ var __webpack_exports__ = __webpack_require__(38);
/******/ var __webpack_exports__DEFAULT_OPTIONS = __webpack_exports__.lp;
/******/ var __webpack_exports__NO_ITEM_FOUND_SYMBOL = __webpack_exports__.YN;
/******/ var __webpack_exports__SELECTOR_KEY_NAMES = __webpack_exports__.fG;
/******/ var __webpack_exports__default = __webpack_exports__.Ay;
/******/ var __webpack_exports__evaluateAnd = __webpack_exports__.j0;
/******/ var __webpack_exports__evaluateArrayContains = __webpack_exports__.Cp;
/******/ var __webpack_exports__evaluateConcat = __webpack_exports__.Q2;
/******/ var __webpack_exports__evaluateCondition = __webpack_exports__.F9;
/******/ var __webpack_exports__evaluateExpression = __webpack_exports__.O4;
/******/ var __webpack_exports__evaluateIf = __webpack_exports__.rb;
/******/ var __webpack_exports__evaluateMapping = __webpack_exports__.cB;
/******/ var __webpack_exports__evaluateOperation = __webpack_exports__.ZF;
/******/ var __webpack_exports__evaluateOptionalThen = __webpack_exports__.f7;
/******/ var __webpack_exports__evaluateOr = __webpack_exports__.Hg;
/******/ var __webpack_exports__evaluateSelector = __webpack_exports__.Lm;
/******/ var __webpack_exports__evaluateSelectorUntilLastObject = __webpack_exports__.yf;
/******/ var __webpack_exports__evaluateSwitch = __webpack_exports__.j4;
/******/ var __webpack_exports__evaluateUnaryOperation = __webpack_exports__.CH;
/******/ var __webpack_exports__isAndExpression = __webpack_exports__.Gc;
/******/ var __webpack_exports__isArrayContainsExpression = __webpack_exports__.ZI;
/******/ var __webpack_exports__isConcatExpression = __webpack_exports__.HK;
/******/ var __webpack_exports__isCondition = __webpack_exports__.G3;
/******/ var __webpack_exports__isIfExpression = __webpack_exports__.MP;
/******/ var __webpack_exports__isMappingExpression = __webpack_exports__.Z9;
/******/ var __webpack_exports__isOperation = __webpack_exports__.YG;
/******/ var __webpack_exports__isOrExpression = __webpack_exports__.g6;
/******/ var __webpack_exports__isSelector = __webpack_exports__.Ld;
/******/ var __webpack_exports__isSpecificExpression = __webpack_exports__.bQ;
/******/ var __webpack_exports__isSwitchExpression = __webpack_exports__.$y;
/******/ var __webpack_exports__isUnaryOperation = __webpack_exports__.bF;
/******/ var __webpack_exports__isValue = __webpack_exports__.ml;
/******/ var __webpack_exports__normalizeSelector = __webpack_exports__.Pl;
/******/ var __webpack_exports__selectArrayItem = __webpack_exports__.Fm;
/******/ var __webpack_exports__viewArrayAsScope = __webpack_exports__.bC;
/******/ var __webpack_exports__viewObjectAsScope = __webpack_exports__.xk;
/******/ export { __webpack_exports__DEFAULT_OPTIONS as DEFAULT_OPTIONS, __webpack_exports__NO_ITEM_FOUND_SYMBOL as NO_ITEM_FOUND_SYMBOL, __webpack_exports__SELECTOR_KEY_NAMES as SELECTOR_KEY_NAMES, __webpack_exports__default as default, __webpack_exports__evaluateAnd as evaluateAnd, __webpack_exports__evaluateArrayContains as evaluateArrayContains, __webpack_exports__evaluateConcat as evaluateConcat, __webpack_exports__evaluateCondition as evaluateCondition, __webpack_exports__evaluateExpression as evaluateExpression, __webpack_exports__evaluateIf as evaluateIf, __webpack_exports__evaluateMapping as evaluateMapping, __webpack_exports__evaluateOperation as evaluateOperation, __webpack_exports__evaluateOptionalThen as evaluateOptionalThen, __webpack_exports__evaluateOr as evaluateOr, __webpack_exports__evaluateSelector as evaluateSelector, __webpack_exports__evaluateSelectorUntilLastObject as evaluateSelectorUntilLastObject, __webpack_exports__evaluateSwitch as evaluateSwitch, __webpack_exports__evaluateUnaryOperation as evaluateUnaryOperation, __webpack_exports__isAndExpression as isAndExpression, __webpack_exports__isArrayContainsExpression as isArrayContainsExpression, __webpack_exports__isConcatExpression as isConcatExpression, __webpack_exports__isCondition as isCondition, __webpack_exports__isIfExpression as isIfExpression, __webpack_exports__isMappingExpression as isMappingExpression, __webpack_exports__isOperation as isOperation, __webpack_exports__isOrExpression as isOrExpression, __webpack_exports__isSelector as isSelector, __webpack_exports__isSpecificExpression as isSpecificExpression, __webpack_exports__isSwitchExpression as isSwitchExpression, __webpack_exports__isUnaryOperation as isUnaryOperation, __webpack_exports__isValue as isValue, __webpack_exports__normalizeSelector as normalizeSelector, __webpack_exports__selectArrayItem as selectArrayItem, __webpack_exports__viewArrayAsScope as viewArrayAsScope, __webpack_exports__viewObjectAsScope as viewObjectAsScope };
/******/ 

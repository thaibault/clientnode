if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_push_js_baa3ea94__ from "core-js/modules/es.array.push.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_constructor_js_833f4df9__ from "core-js/modules/es.iterator.constructor.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_filter_js_abae28b4__ from "core-js/modules/es.iterator.filter.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_for_each_js_2628f2dd__ from "core-js/modules/es.iterator.for-each.js";
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
import { expect as __WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__, test as __WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__ } from "@jest/globals";
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
/* harmony export */   rq: function() { return /* binding */ CLASS_TO_TYPE_MAPPING; }
/* harmony export */ });
/* unused harmony exports CLI_COLOR, DEFAULT_ENCODING, CLOSE_EVENT_NAMES, CONSOLE_METHODS, VALUE_COPY_SYMBOL, IGNORE_NULL_AND_UNDEFINED_SYMBOL, ABBREVIATIONS, ANIMATION_END_EVENT_NAMES, KEY_CODES, KEYBOARD_CODES, LOCALES, PLAIN_OBJECT_PROTOTYPES, SPECIAL_REGEX_SEQUENCES, TRANSITION_END_EVENT_NAMES */
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
/* 4 */,
/* 5 */
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Do: function() { return /* binding */ _represent; },
/* harmony export */   Sj: function() { return /* binding */ determineType; }
/* harmony export */ });
/* unused harmony exports addDynamicGetterAndSetter, convertCircularObjectToJSON, convertMapToPlainObject, convertPlainObjectToMap, convertSubstringInPlainObject, copy, equals, evaluateAsyncDynamicData, evaluateDynamicData, removeKeysInEvaluation, extend, getProxyHandler, mask, modifyObject, removeKeyPrefixes, sort, unwrapProxy */
/* unused harmony import specifier */ var VALUE_COPY_SYMBOL;
/* unused harmony import specifier */ var IGNORE_NULL_AND_UNDEFINED_SYMBOL;
/* unused harmony import specifier */ var isMap;
/* unused harmony import specifier */ var isSet;
/* unused harmony import specifier */ var isObject;
/* unused harmony import specifier */ var isPlainObject;
/* unused harmony import specifier */ var isFunction;
/* unused harmony import specifier */ var isProxy;
/* unused harmony import specifier */ var isNotANumber;
/* unused harmony import specifier */ var evaluateOrThrowError;
/* unused harmony import specifier */ var escapeRegularExpressions;
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
*/function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(r.__proto__=GeneratorFunctionPrototype,_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)};function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)};/**
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
 */var _addDynamicGetterAndSetter=function addDynamicGetterAndSetter(object,getterWrapper,setterWrapper,methodNames,deep,typesToExtend){if(getterWrapper===void 0){getterWrapper=null}if(setterWrapper===void 0){setterWrapper=null}if(methodNames===void 0){methodNames={}}if(deep===void 0){deep=true}if(typesToExtend===void 0){typesToExtend=[Object]}if(deep&&_typeof(object)==="object")if(Array.isArray(object)){var index=0;var _iterator=_createForOfIteratorHelper(object),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var value=_step.value;object[index]=_addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep);index+=1}}catch(err){_iterator.e(err)}finally{_iterator.f()}}else if(isMap(object)){var _iterator2=_createForOfIteratorHelper(object),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var _step2$value=_slicedToArray(_step2.value,2),key=_step2$value[0],_value=_step2$value[1];object.set(key,_addDynamicGetterAndSetter(_value,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}}else if(isSet(object)){var cache=[];var _iterator3=_createForOfIteratorHelper(object),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var _value3=_step3.value;object.delete(_value3);cache.push(_addDynamicGetterAndSetter(_value3,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}for(var _i=0,_cache=cache;_i<_cache.length;_i++){var _value2=_cache[_i];object.add(_value2)}}else if(object!==null)for(var _i2=0,_Object$entries=Object.entries(object);_i2<_Object$entries.length;_i2++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i2],2),_key=_Object$entries$_i[0],_value4=_Object$entries$_i[1];object[_key]=_addDynamicGetterAndSetter(_value4,getterWrapper,setterWrapper,methodNames,deep)}if(getterWrapper||setterWrapper){var _iterator4=_createForOfIteratorHelper(typesToExtend),_step4;try{var _loop=function _loop(){var type=_step4.value;if(isObject(object)&&object instanceof type){var defaultHandler=getProxyHandler(object,methodNames);var handler=getProxyHandler(object,methodNames);if(getterWrapper)handler.get=function(_target,name){if(name==="__target__")return object;if(name==="__revoke__")return function(){revoke();return object};if(typeof object[name]==="function")return object[name];return getterWrapper(defaultHandler.get(proxy,name),name,object)};if(setterWrapper)handler.set=function(_target,name,value){return defaultHandler.set(proxy,name,setterWrapper(name,value,object))};var _Proxy$revocable=Proxy.revocable({},handler),proxy=_Proxy$revocable.proxy,revoke=_Proxy$revocable.revoke;return{v:proxy}}},_ret;for(_iterator4.s();!(_step4=_iterator4.n()).done;){_ret=_loop();if(_ret)return _ret.v}}catch(err){_iterator4.e(err)}finally{_iterator4.f()}}return object};/**
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
 */var convertCircularObjectToJSON=function convertCircularObjectToJSON(object,determineCircularReferenceValue,numberOfSpaces){if(determineCircularReferenceValue===void 0){determineCircularReferenceValue=function determineCircularReferenceValue(serializedValue){return serializedValue!==null&&serializedValue!==void 0?serializedValue:"__circularReference__"}}if(numberOfSpaces===void 0){numberOfSpaces=0}var seenObjects=new Map;var stringifier=function stringifier(object){var _replacer=function replacer(key,value){if(isObject(value)){var _seenObjects$get;if(seenObjects.has(value))return determineCircularReferenceValue((_seenObjects$get=seenObjects.get(value))!==null&&_seenObjects$get!==void 0?_seenObjects$get:null,key,value,seenObjects);// NOTE: Set before traversing deeper to detect cycles.
seenObjects.set(value,null);var result;if(Array.isArray(value)){result=[];var _iterator5=_createForOfIteratorHelper(value),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var item=_step5.value;result.push(_replacer(null,item))}}catch(err){_iterator5.e(err)}finally{_iterator5.f()}}else{result={};for(var _i3=0,_Object$entries2=Object.entries(value);_i3<_Object$entries2.length;_i3++){var _Object$entries2$_i=_slicedToArray(_Object$entries2[_i3],2),name=_Object$entries2$_i[0],subValue=_Object$entries2$_i[1];result[name]=_replacer(name,subValue)}}seenObjects.set(value,result);return result}return value};return JSON.stringify(object,_replacer,numberOfSpaces)};return stringifier(object)};/**
 * Converts given map and all nested found maps objects to corresponding
 * object.
 * @param object - Map to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given map as object.
 */var _convertMapToPlainObject=function convertMapToPlainObject(object,deep){if(deep===void 0){deep=true}if(_typeof(object)==="object"){if(isMap(object)){var newObject={};var _iterator6=_createForOfIteratorHelper(object),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var _step6$value=_slicedToArray(_step6.value,2),key=_step6$value[0],value=_step6$value[1];if(deep)value=_convertMapToPlainObject(value,deep);if(["number","string"].includes(_typeof(key)))newObject[String(key)]=value}}catch(err){_iterator6.e(err)}finally{_iterator6.f()}return newObject}if(deep)if(isPlainObject(object))for(var _i4=0,_Object$entries3=Object.entries(object);_i4<_Object$entries3.length;_i4++){var _Object$entries3$_i=_slicedToArray(_Object$entries3[_i4],2),_key2=_Object$entries3$_i[0],_value5=_Object$entries3$_i[1];object[_key2]=_convertMapToPlainObject(_value5,deep)}else if(Array.isArray(object)){var index=0;for(var _i5=0,_arr=object;_i5<_arr.length;_i5++){var _value6=_arr[_i5];object[index]=_convertMapToPlainObject(_value6,deep);index+=1}}else if(isSet(object)){var cache=[];var _iterator7=_createForOfIteratorHelper(object),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var _value8=_step7.value;object.delete(_value8);cache.push(_convertMapToPlainObject(_value8,deep))}}catch(err){_iterator7.e(err)}finally{_iterator7.f()}for(var _i6=0,_cache2=cache;_i6<_cache2.length;_i6++){var _value7=_cache2[_i6];object.add(_value7)}}}return object};/**
 * Converts given plain object and all nested found objects to
 * corresponding map.
 * @param object - Object to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given object as map.
 */var _convertPlainObjectToMap=function convertPlainObjectToMap(object,deep){if(deep===void 0){deep=true}if(_typeof(object)==="object"){if(isPlainObject(object)){var newObject=new Map;for(var _i7=0,_Object$entries4=Object.entries(object);_i7<_Object$entries4.length;_i7++){var _Object$entries4$_i=_slicedToArray(_Object$entries4[_i7],2),key=_Object$entries4$_i[0],value=_Object$entries4$_i[1];if(deep)object[key]=_convertPlainObjectToMap(value,deep);newObject.set(key,object[key])}return newObject}if(deep)if(Array.isArray(object)){var index=0;for(var _i8=0,_arr2=object;_i8<_arr2.length;_i8++){var _value9=_arr2[_i8];object[index]=_convertPlainObjectToMap(_value9,deep);index+=1}}else if(isMap(object)){var _iterator8=_createForOfIteratorHelper(object),_step8;try{for(_iterator8.s();!(_step8=_iterator8.n()).done;){var _step8$value=_slicedToArray(_step8.value,2),_key3=_step8$value[0],_value0=_step8$value[1];object.set(_key3,_convertPlainObjectToMap(_value0,deep))}}catch(err){_iterator8.e(err)}finally{_iterator8.f()}}else if(isSet(object)){var cache=[];var _iterator9=_createForOfIteratorHelper(object),_step9;try{for(_iterator9.s();!(_step9=_iterator9.n()).done;){var _value10=_step9.value;object.delete(_value10);cache.push(_convertPlainObjectToMap(_value10,deep))}}catch(err){_iterator9.e(err)}finally{_iterator9.f()}for(var _i9=0,_cache3=cache;_i9<_cache3.length;_i9++){var _value1=_cache3[_i9];object.add(_value1)}}}return object};/**
 * Replaces given pattern in each value in given object recursively with
 * given string replacement.
 * @param object - Object to convert substrings in.
 * @param pattern - Regular expression to replace.
 * @param replacement - String to use as replacement for found patterns.
 * @returns Converted object with replaced patterns.
 */var _convertSubstringInPlainObject=function convertSubstringInPlainObject(object,pattern,replacement){for(var _i0=0,_Object$entries5=Object.entries(object);_i0<_Object$entries5.length;_i0++){var _Object$entries5$_i=_slicedToArray(_Object$entries5[_i0],2),key=_Object$entries5$_i[0],value=_Object$entries5$_i[1];if(isPlainObject(value))object[key]=_convertSubstringInPlainObject(value,pattern,replacement);else if(typeof value==="string")object[key]=value.replace(pattern,replacement)}return object};/* eslint-disable jsdoc/require-description-complete-sentence *//**
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
 */var _copy=function copy(source,copyBlobs,recursionLimit,recursionEndValue,destination,cyclic,knownReferences,recursionLevel){if(copyBlobs===void 0){copyBlobs=false}if(recursionLimit===void 0){recursionLimit=-1}if(recursionEndValue===void 0){recursionEndValue=VALUE_COPY_SYMBOL}if(destination===void 0){destination=null}if(cyclic===void 0){cyclic=false}if(knownReferences===void 0){knownReferences=[]}if(recursionLevel===void 0){recursionLevel=0}/* eslint-enable jsdoc/require-description-complete-sentence */if(isObject(source))if(destination){if(source===destination)throw new Error("Can't copy because source and destination are "+"identical.");if(!cyclic&&![undefined,null].includes(source)){var index=knownReferences.indexOf(source);if(index!==-1)return knownReferences[index];knownReferences.push(source)}var copyValue=function copyValue(value){if(recursionLimit!==-1&&recursionLimit<recursionLevel+1)return recursionEndValue===VALUE_COPY_SYMBOL?value:recursionEndValue;var result=_copy(value,copyBlobs,recursionLimit,recursionEndValue,null,cyclic,knownReferences,recursionLevel+1);if(!cyclic&&![undefined,null].includes(value)&&_typeof(value)==="object")knownReferences.push(value);return result};if(Array.isArray(source)){var _iterator0=_createForOfIteratorHelper(source),_step0;try{for(_iterator0.s();!(_step0=_iterator0.n()).done;){var item=_step0.value;destination.push(copyValue(item))}}catch(err){_iterator0.e(err)}finally{_iterator0.f()}}else if(source instanceof Map){var _iterator1=_createForOfIteratorHelper(source),_step1;try{for(_iterator1.s();!(_step1=_iterator1.n()).done;){var _step1$value=_slicedToArray(_step1.value,2),key=_step1$value[0],value=_step1$value[1];destination.set(key,copyValue(value))}}catch(err){_iterator1.e(err)}finally{_iterator1.f()}}else if(source instanceof Set){var _iterator10=_createForOfIteratorHelper(source),_step10;try{for(_iterator10.s();!(_step10=_iterator10.n()).done;){var _value11=_step10.value;destination.add(copyValue(_value11))}}catch(err){_iterator10.e(err)}finally{_iterator10.f()}}else for(var _i1=0,_Object$entries6=Object.entries(source);_i1<_Object$entries6.length;_i1++){var _Object$entries6$_i=_slicedToArray(_Object$entries6[_i1],2),_key4=_Object$entries6$_i[0],_value12=_Object$entries6$_i[1];try{destination[_key4]=copyValue(_value12)}catch(error){throw new Error("Failed to copy property value object \""+"".concat(_key4,"\": ").concat(_represent(error)),{cause:error})}}}else{if(Array.isArray(source))return _copy(source,copyBlobs,recursionLimit,recursionEndValue,[],cyclic,knownReferences,recursionLevel);if(source instanceof Map)return _copy(source,copyBlobs,recursionLimit,recursionEndValue,new Map,cyclic,knownReferences,recursionLevel);if(source instanceof Set)return _copy(source,copyBlobs,recursionLimit,recursionEndValue,new Set,cyclic,knownReferences,recursionLevel);if(source instanceof Date)return new Date(source.getTime());if(source instanceof RegExp){var modifier=/[^/]*$/.exec(source.toString());destination=new RegExp(source.source,modifier?modifier[0]:undefined);destination.lastIndex=source.lastIndex;return destination}if(typeof Blob!=="undefined"&&source instanceof Blob)return copyBlobs?source.slice(0,source.size,source.type):source;return _copy(source,copyBlobs,recursionLimit,recursionEndValue,{},cyclic,knownReferences,recursionLevel)}return destination||source};/**
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
 */var _equals=function equals(firstValue,secondValue,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({compareBlobs:false,deep:-1,exceptionPrefixes:[],ignoreFunctions:true,properties:null,returnReasonIfNotEqual:false},givenOptions);if(options.ignoreFunctions&&isFunction(firstValue)&&isFunction(secondValue)||firstValue===secondValue||isNotANumber(firstValue)&&isNotANumber(secondValue)||firstValue instanceof RegExp&&secondValue instanceof RegExp&&firstValue.toString()===secondValue.toString()&&firstValue.flags.split("").sort().join("")===secondValue.flags.split("").sort().join("")||firstValue instanceof Date&&secondValue instanceof Date&&(isNaN(firstValue.getTime())&&isNaN(secondValue.getTime())||!isNaN(firstValue.getTime())&&!isNaN(secondValue.getTime())&&firstValue.getTime()===secondValue.getTime())||options.compareBlobs&&eval("typeof Buffer")!=="undefined"&&Object.prototype.hasOwnProperty.call(eval("Buffer"),"isBuffer")&&firstValue instanceof eval("Buffer")&&secondValue instanceof eval("Buffer")&&firstValue.toString("base64")===secondValue.toString("base64"))return true;if(options.compareBlobs&&typeof Blob!=="undefined"&&firstValue instanceof Blob&&secondValue instanceof Blob)return new Promise(function(resolve){var values=[];for(var _i10=0,_arr3=[firstValue,secondValue];_i10<_arr3.length;_i10++){var value=_arr3[_i10];var fileReader=new FileReader;fileReader.onload=function(event){if(event.target===null)values.push(null);else values.push(event.target.result);if(values.length===2)if(values[0]===values[1])resolve(true);else resolve(options.returnReasonIfNotEqual?">>> Blob(".concat(_represent(values[0]),")  !== ")+"Blob(".concat(_represent(values[1]),")"):false)};fileReader.readAsDataURL(value)}});if(isPlainObject(firstValue)&&isPlainObject(secondValue)&&!(firstValue instanceof RegExp||secondValue instanceof RegExp)||Array.isArray(firstValue)&&Array.isArray(secondValue)&&firstValue.length===secondValue.length||determineType(firstValue)===determineType(secondValue)&&["map","set"].includes(determineType(firstValue))&&firstValue.size===secondValue.size){var promises=[];for(var _i11=0,_arr4=[[firstValue,secondValue],[secondValue,firstValue]];_i11<_arr4.length;_i11++){var _arr4$_i=_slicedToArray(_arr4[_i11],2),first=_arr4$_i[0],second=_arr4$_i[1];var firstIsArray=Array.isArray(first);if(firstIsArray&&(!Array.isArray(second)||first.length!==second.length))return options.returnReasonIfNotEqual?".length":false;var firstIsMap=isMap(first);if(firstIsMap&&(!isMap(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;var firstIsSet=isSet(first);if(firstIsSet&&(!isSet(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;if(firstIsArray){var index=0;var _loop2=function _loop2(){var value=_arr5[_i12];if(options.deep!==0){var result=_equals(value,second[index],_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(!result)return{v:false};var currentIndex=index;var determineResult=function determineResult(result){var _$$result$;return typeof result==="string"?"[".concat(String(currentIndex),"]")+((_$$result$={"[":"",">":" "}[result[0]])!==null&&_$$result$!==void 0?_$$result$:".")+result:result};if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return{v:determineResult(result)}}index+=1},_ret2;for(var _i12=0,_arr5=first;_i12<_arr5.length;_i12++){_ret2=_loop2();if(_ret2)return _ret2.v}}else if(firstIsMap){var _iterator11=_createForOfIteratorHelper(first),_step11;try{var _loop3=function _loop3(){var _step11$value=_slicedToArray(_step11.value,2),key=_step11$value[0],value=_step11$value[1];if(options.deep!==0){var result=_equals(value,second.get(key),_objectSpread(_objectSpread({},options),{},{deep:options.deep-1}));if(!result)return{v:false};var determineResult=function determineResult(result){var _$$result$2;return typeof result==="string"?"get(".concat(_represent(key),")")+((_$$result$2={"[":"",">":" "}[result[0]])!==null&&_$$result$2!==void 0?_$$result$2:".")+result:result};if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return{v:determineResult(result)}}},_ret3;for(_iterator11.s();!(_step11=_iterator11.n()).done;){_ret3=_loop3();if(_ret3)return _ret3.v}}catch(err){_iterator11.e(err)}finally{_iterator11.f()}}else if(firstIsSet){var _iterator12=_createForOfIteratorHelper(first),_step12;try{var _loop4=function _loop4(){var value=_step12.value;if(options.deep!==0){var equal=false;var subPromises=[];/*
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
 */var _evaluateAsyncDynamicData=/*#__PURE__*/(/* unused pure expression or super */ null && (function(){var _evaluateAsyncDynamicData2=_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data,givenOptions){var options,result,index,_iterator16,_step16,item,_i14,_Object$entries8,_Object$entries8$_i,key,value,_t;return _regenerator().w(function(_context){while(1)switch(_context.p=_context.n){case 0:if(givenOptions===void 0){givenOptions={}}options=_objectSpread({scope:{},selfReferenceName:"self",expressionIndicatorKey:"__async_evaluate__",executionIndicatorKey:"__async_execute__"},givenOptions);if(isObject(data)){_context.n=1;break}return _context.a(2,data);case 1:if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=data;result=data;if(!Array.isArray(data)){_context.n=10;break}index=0;_iterator16=_createForOfIteratorHelper(data);_context.p=2;_iterator16.s();case 3:if((_step16=_iterator16.n()).done){_context.n=6;break}item=_step16.value;_context.n=4;return _evaluateAsyncDynamicData(item,options);case 4:result[index]=_context.v;index+=1;case 5:_context.n=3;break;case 6:_context.n=8;break;case 7:_context.p=7;_t=_context.v;_iterator16.e(_t);case 8:_context.p=8;_iterator16.f();return _context.f(8);case 9:return _context.a(2,result);case 10:_i14=0,_Object$entries8=Object.entries(data);case 11:if(!(_i14<_Object$entries8.length)){_context.n=16;break}_Object$entries8$_i=_slicedToArray(_Object$entries8[_i14],2),key=_Object$entries8$_i[0],value=_Object$entries8$_i[1];if(![options.expressionIndicatorKey,options.executionIndicatorKey].includes(key)){_context.n=13;break}_context.n=12;return evaluateOrThrowError(value,{scope:options.scope,async:true,execute:key===options.executionIndicatorKey});case 12:return _context.a(2,_context.v);case 13:_context.n=14;return _evaluateAsyncDynamicData(value,options);case 14:result[key]=_context.v;case 15:_i14++;_context.n=11;break;case 16:return _context.a(2,result)}},_callee,null,[[2,7,8,9]])}));function evaluateAsyncDynamicData(_x,_x2){return _evaluateAsyncDynamicData2.apply(this,arguments)}return evaluateAsyncDynamicData}()));/**
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
 */var evaluateDynamicData=function evaluateDynamicData(object,givenOptions){if(givenOptions===void 0){givenOptions={}}var options=_objectSpread({scope:{},selfReferenceName:"self",expressionIndicatorKey:"__evaluate__",executionIndicatorKey:"__execute__"},givenOptions);if(_typeof(object)!=="object"||object===null)return object;if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=object;var internalEvaluateAndThrowError=function internalEvaluateAndThrowError(code,type){if(type===void 0){type=options.expressionIndicatorKey}return evaluateOrThrowError(code,{scope:options.scope,async:false,execute:type===options.executionIndicatorKey})};var _addProxyRecursively=function addProxyRecursively(data){if(_typeof(data)!=="object"||data===null||typeof Proxy==="undefined")return data;for(var _i15=0,_Object$entries9=Object.entries(data);_i15<_Object$entries9.length;_i15++){var _Object$entries9$_i=_slicedToArray(_Object$entries9[_i15],2),key=_Object$entries9$_i[0],givenValue=_Object$entries9$_i[1];if(key!=="__target__"&&isObject(givenValue)){var value=givenValue;_addProxyRecursively(value);// NOTE: We only wrap needed objects for performance reasons.
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
                    */if(!data[key].__target__)data[key].__target__=backup}}}return data};var _resolve=function resolve(data){if(isObject(data)){if(isProxy(data)){// NOTE: We have to skip "ownKeys" proxy trap here.
for(var _i19=0,_arr9=[options.expressionIndicatorKey,options.executionIndicatorKey];_i19<_arr9.length;_i19++){var type=_arr9[_i19];if(Object.prototype.hasOwnProperty.call(data,type))return data[type]}data=data.__target__}for(var _i20=0,_Object$entries0=Object.entries(data);_i20<_Object$entries0.length;_i20++){var _Object$entries0$_i=_slicedToArray(_Object$entries0[_i20],2),key=_Object$entries0$_i[0],value=_Object$entries0$_i[1];if([options.expressionIndicatorKey,options.executionIndicatorKey].includes(key)){if(typeof Proxy==="undefined")return _resolve(internalEvaluateAndThrowError(value));return value}data[key]=_resolve(value)}}return data};options.scope.resolve=_resolve;var _removeProxyRecursively=function removeProxyRecursively(data){if(isObject(data))for(var _i21=0,_Object$entries1=Object.entries(data);_i21<_Object$entries1.length;_i21++){var _Object$entries1$_i=_slicedToArray(_Object$entries1[_i21],2),key=_Object$entries1$_i[0],value=_Object$entries1$_i[1];if(key!=="__target__"&&value!==null&&["function","undefined"].includes(_typeof(value))){var target=value.__target__;if(typeof target!=="undefined")data[key]=target;_removeProxyRecursively(value)}}return data};if(Object.prototype.hasOwnProperty.call(object,options.expressionIndicatorKey))return internalEvaluateAndThrowError(object[options.expressionIndicatorKey]);else if(Object.prototype.hasOwnProperty.call(object,options.executionIndicatorKey))return internalEvaluateAndThrowError(object[options.executionIndicatorKey],options.executionIndicatorKey);return _removeProxyRecursively(_resolve(_addProxyRecursively(object)))};/**
 * Removes properties in objects where a dynamic indicator lives.
 * @param data - Object to traverse recursively.
 * @param expressionIndicators - Property key to remove.
 * @returns Given object with removed properties.
 */var _removeKeysInEvaluation=function removeKeysInEvaluation(data,expressionIndicators){if(expressionIndicators===void 0){expressionIndicators=["__evaluate__","__execute__"]}for(var _i22=0,_Object$entries10=Object.entries(data);_i22<_Object$entries10.length;_i22++){var _Object$entries10$_i=_slicedToArray(_Object$entries10[_i22],2),key=_Object$entries10$_i[0],value=_Object$entries10$_i[1];if(!expressionIndicators.includes(key)&&expressionIndicators.some(function(name){return Object.prototype.hasOwnProperty.call(data,name)}))delete data[key];else if(isPlainObject(value))_removeKeysInEvaluation(value,expressionIndicators)}return data};/**
 * Extends given target object with given sources object. As target and
 * sources many expandable types are allowed but target and sources have to
 * come from the same type.
 * @param targetOrDeepIndicator - Maybe the target or deep indicator.
 * @param targetOrSource - Target or source object; depending on first
 * argument.
 * @param additionalSources - Source objects to extend into target.
 * @returns Returns given target extended with all given sources.
 */var _extend=function extend(targetOrDeepIndicator,targetOrSource){var deep=false;for(var _len=arguments.length,additionalSources=new Array(_len>2?_len-2:0),_key5=2;_key5<_len;_key5++){additionalSources[_key5-2]=arguments[_key5]}var sources=additionalSources;var target;if(targetOrDeepIndicator===IGNORE_NULL_AND_UNDEFINED_SYMBOL||typeof targetOrDeepIndicator==="boolean"){// Handle a deep copy situation and skip deep indicator and target.
deep=targetOrDeepIndicator;target=targetOrSource}else{target=targetOrDeepIndicator;if(isObject(targetOrSource))sources=[targetOrSource].concat(_toConsumableArray(sources));else if(targetOrSource!==undefined)target=targetOrSource}var mergeValue=function mergeValue(targetValue,value){if(value===targetValue)return targetValue;// Traverse recursively if we're merging plain objects or maps.
if(deep&&value&&(isPlainObject(value)||isMap(value))){var clone;if(isMap(value))clone=targetValue&&isMap(targetValue)?targetValue:new Map;else clone=targetValue&&isPlainObject(targetValue)?targetValue:{};return _extend(deep,clone,value)}return value};var _iterator17=_createForOfIteratorHelper(sources),_step17;try{for(_iterator17.s();!(_step17=_iterator17.n()).done;){var source=_step17.value;var targetType=_typeof(target);var sourceType=_typeof(source);if(isMap(target))targetType+=" Map";if(isMap(source))sourceType+=" Map";if(targetType===sourceType&&target!==source){if(isMap(target)&&isMap(source)){var _iterator18=_createForOfIteratorHelper(source),_step18;try{for(_iterator18.s();!(_step18=_iterator18.n()).done;){var _step18$value=_slicedToArray(_step18.value,2),key=_step18$value[0],value=_step18$value[1];target.set(key,mergeValue(target.get(key),value))}}catch(err){_iterator18.e(err)}finally{_iterator18.f()}}else if(isObject(target)&&!Array.isArray(target)&&!(typeof Blob!=="undefined"&&target instanceof Blob)&&isObject(source)&&!Array.isArray(source)&&!(typeof Blob!=="undefined"&&source instanceof Blob)){for(var _i23=0,_Object$entries11=Object.entries(source);_i23<_Object$entries11.length;_i23++){var _Object$entries11$_i=_slicedToArray(_Object$entries11[_i23],2),_key6=_Object$entries11$_i[0],_value14=_Object$entries11$_i[1];if(!(deep===IGNORE_NULL_AND_UNDEFINED_SYMBOL&&[null,undefined].includes(_value14)))target[_key6]=mergeValue(target[_key6],_value14)}}else target=source;}else target=source}}catch(err){_iterator17.e(err)}finally{_iterator17.f()}return target};/**
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
 */var _mask=function mask(object,maskConfiguration){maskConfiguration=_objectSpread({exclude:false,include:true},maskConfiguration);if(maskConfiguration.exclude===true||Array.isArray(maskConfiguration.exclude)&&maskConfiguration.exclude.length===0||maskConfiguration.include===false||_typeof(object)!=="object")return{};var exclude=Array.isArray(maskConfiguration.exclude)?maskConfiguration.exclude.reduce(function(mask,key){return _objectSpread(_objectSpread({},mask),{},_defineProperty({},key,true))},{}):maskConfiguration.exclude;var include=Array.isArray(maskConfiguration.include)?maskConfiguration.include.reduce(function(mask,key){return _objectSpread(_objectSpread({},mask),{},_defineProperty({},key,true))},{}):maskConfiguration.include;var result={};if(isPlainObject(include)){for(var _i24=0,_Object$entries12=Object.entries(include);_i24<_Object$entries12.length;_i24++){var _Object$entries12$_i=_slicedToArray(_Object$entries12[_i24],2),key=_Object$entries12$_i[0],value=_Object$entries12$_i[1];if(Object.prototype.hasOwnProperty.call(object,key))if(value===true)result[key]=object[key];else if((isPlainObject(value)||Array.isArray(value)&&value.length)&&_typeof(object[key])==="object")result[key]=_mask(object[key],{include:value})}}else// In this branch "mask.include === true" holds.
result=object;if(isPlainObject(exclude)){var useCopy=false;var copy=_objectSpread({},result);for(var _i25=0,_Object$entries13=Object.entries(exclude);_i25<_Object$entries13.length;_i25++){var _Object$entries13$_i=_slicedToArray(_Object$entries13[_i25],2),_key7=_Object$entries13$_i[0],_value15=_Object$entries13$_i[1];if(Object.prototype.hasOwnProperty.call(copy,_key7))if(_value15===true){useCopy=true;delete copy[_key7]}else if((isPlainObject(_value15)||Array.isArray(_value15)&&_value15.length)&&_typeof(copy[_key7])==="object"){var current=copy[_key7];copy[_key7]=_mask(copy[_key7],{exclude:_value15});if(copy[_key7]!==current)useCopy=true}}if(useCopy)result=copy}return result};/**
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
 */var _modifyObject=function modifyObject(target,source,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,parentSource,parentKey){if(removeIndicatorKey===void 0){removeIndicatorKey="__remove__"}if(prependIndicatorKey===void 0){prependIndicatorKey="__prepend__"}if(appendIndicatorKey===void 0){appendIndicatorKey="__append__"}if(positionPrefix===void 0){positionPrefix="__"}if(positionSuffix===void 0){positionSuffix="__"}if(parentSource===void 0){parentSource=null}if(parentKey===void 0){parentKey=null}if(isMap(source)&&isMap(target)){var _iterator19=_createForOfIteratorHelper(source),_step19;try{for(_iterator19.s();!(_step19=_iterator19.n()).done;){var _step19$value=_slicedToArray(_step19.value,2),key=_step19$value[0],value=_step19$value[1];if(target.has(key))_modifyObject(target.get(key),value,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,key)}}catch(err){_iterator19.e(err)}finally{_iterator19.f()}}else if(isObject(source)&&isObject(target))for(var _i26=0,_Object$entries14=Object.entries(source);_i26<_Object$entries14.length;_i26++){var _Object$entries14$_i=_slicedToArray(_Object$entries14[_i26],2),_key8=_Object$entries14$_i[0],sourceValue=_Object$entries14$_i[1];var index=NaN;if(Array.isArray(target)&&_key8.startsWith(positionPrefix)&&_key8.endsWith(positionSuffix)){index=parseInt(_key8.substring(positionPrefix.length,_key8.length-positionSuffix.length),10);if(index<0||index>=target.length)index=NaN}if([removeIndicatorKey,prependIndicatorKey,appendIndicatorKey].includes(_key8)||!isNaN(index)){if(Array.isArray(target)){if(_key8===removeIndicatorKey){var values=[].concat(sourceValue);var _iterator20=_createForOfIteratorHelper(values),_step20;try{for(_iterator20.s();!(_step20=_iterator20.n()).done;){var _value16=_step20.value;if(typeof _value16==="string"&&_value16.startsWith(positionPrefix)&&_value16.endsWith(positionSuffix))target.splice(parseInt(_value16.substring(positionPrefix.length,_value16.length-positionSuffix.length),10),1);else if(target.includes(_value16))target.splice(target.indexOf(_value16),1);else if(typeof _value16==="number"&&_value16<target.length)target.splice(_value16,1)}}catch(err){_iterator20.e(err)}finally{_iterator20.f()}}else if(_key8===appendIndicatorKey)target=target.concat(sourceValue);else if(_key8===prependIndicatorKey)target=[].concat(sourceValue).concat(target);else if(isObject(target[index])&&isObject(sourceValue))_extend(true,_modifyObject(target[index],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix),target[index],sourceValue);else target[index]=sourceValue;}else if(_key8===removeIndicatorKey){var _iterator21=_createForOfIteratorHelper([].concat(sourceValue)),_step21;try{for(_iterator21.s();!(_step21=_iterator21.n()).done;){var _value17=_step21.value;if(typeof _value17==="string"&&Object.prototype.hasOwnProperty.call(target,_value17))delete target[_value17]}}catch(err){_iterator21.e(err)}finally{_iterator21.f()}}delete source[_key8];if(parentSource&&typeof parentKey==="string")delete parentSource[parentKey]}else if(target!==null&&Object.prototype.hasOwnProperty.call(target,_key8))target[_key8]=_modifyObject(target[_key8],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,_key8)}return target};/**
 * Removes given key from given object recursively.
 * @param object - Object to process.
 * @param keys - List of keys to remove.
 * @returns Processed given object.
 */var _removeKeyPrefixes=function removeKeyPrefixes(object,keys){if(keys===void 0){keys="#"}var resolvedKeys=[].concat(keys);if(Array.isArray(object)){var index=0;var _iterator22=_createForOfIteratorHelper(object.slice()),_step22;try{for(_iterator22.s();!(_step22=_iterator22.n()).done;){var subObject=_step22.value;var skip=false;if(typeof subObject==="string"){var _iterator23=_createForOfIteratorHelper(resolvedKeys),_step23;try{for(_iterator23.s();!(_step23=_iterator23.n()).done;){var key=_step23.value;if(subObject.startsWith("".concat(key,":"))){object.splice(index,1);skip=true;break}}}catch(err){_iterator23.e(err)}finally{_iterator23.f()}if(skip)continue}object[index]=_removeKeyPrefixes(subObject,resolvedKeys);index+=1}}catch(err){_iterator22.e(err)}finally{_iterator22.f()}}else if(isSet(object)){var _iterator24=_createForOfIteratorHelper(new Set(object)),_step24;try{for(_iterator24.s();!(_step24=_iterator24.n()).done;){var _subObject=_step24.value;var _skip=false;if(typeof _subObject==="string"){var _iterator25=_createForOfIteratorHelper(resolvedKeys),_step25;try{for(_iterator25.s();!(_step25=_iterator25.n()).done;){var _key9=_step25.value;if(_subObject.startsWith("".concat(_key9,":"))){object.delete(_subObject);_skip=true;break}}}catch(err){_iterator25.e(err)}finally{_iterator25.f()}if(_skip)continue}_removeKeyPrefixes(_subObject,resolvedKeys)}}catch(err){_iterator24.e(err)}finally{_iterator24.f()}}else if(isMap(object)){var _iterator26=_createForOfIteratorHelper(new Map(object)),_step26;try{for(_iterator26.s();!(_step26=_iterator26.n()).done;){var _step26$value=_slicedToArray(_step26.value,2),_key0=_step26$value[0],_subObject2=_step26$value[1];var _skip2=false;if(typeof _key0==="string"){var _iterator27=_createForOfIteratorHelper(resolvedKeys),_step27;try{for(_iterator27.s();!(_step27=_iterator27.n()).done;){var resolvedKey=_step27.value;var escapedKey=escapeRegularExpressions(resolvedKey);if(new RegExp("^".concat(escapedKey,"[0-9]*$")).test(_key0)){object.delete(_key0);_skip2=true;break}}}catch(err){_iterator27.e(err)}finally{_iterator27.f()}if(_skip2)continue}object.set(_key0,_removeKeyPrefixes(_subObject2,resolvedKeys))}}catch(err){_iterator26.e(err)}finally{_iterator26.f()}}else if(isObject(object))for(var _i27=0,_Object$entries15=Object.entries(Object.assign({},object));_i27<_Object$entries15.length;_i27++){var _Object$entries15$_i=_slicedToArray(_Object$entries15[_i27],2),_key1=_Object$entries15$_i[0],value=_Object$entries15$_i[1];var _skip3=false;var _iterator28=_createForOfIteratorHelper(resolvedKeys),_step28;try{for(_iterator28.s();!(_step28=_iterator28.n()).done;){var _resolvedKey=_step28.value;var _escapedKey=escapeRegularExpressions(_resolvedKey);if(new RegExp("^".concat(_escapedKey,"[0-9]*$")).test(_key1)){delete object[_key1];_skip3=true;break}}}catch(err){_iterator28.e(err)}finally{_iterator28.f()}if(_skip3)continue;object[_key1]=_removeKeyPrefixes(value,resolvedKeys)}return object};/**
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
 */var sort=function sort(object){var keys=[];if(Array.isArray(object))for(var index=0;index<object.length;index++)keys.push(index);else if(_typeof(object)==="object")if(isMap(object)){var _iterator33=_createForOfIteratorHelper(object),_step33;try{for(_iterator33.s();!(_step33=_iterator33.n()).done;){var keyValuePair=_step33.value;keys.push(keyValuePair[0])}}catch(err){_iterator33.e(err)}finally{_iterator33.f()}}else if(object!==null)for(var _i28=0,_Object$keys=Object.keys(object);_i28<_Object$keys.length;_i28++){var key=_Object$keys[_i28];keys.push(key)}return keys.sort()};/**
 * Removes a proxy from given data structure recursively.
 * @param object - Object to proxy.
 * @param seenObjects - Tracks all already processed objects to avoid
 * endless loops (usually only needed for internal purpose).
 * @returns Returns given object unwrapped from a dynamic proxy.
 */var _unwrapProxy=function unwrapProxy(object,seenObjects){if(seenObjects===void 0){seenObjects=new Set}if(isObject(object)){if(seenObjects.has(object))return object;try{if(isFunction(object.__revoke__)){if(isProxy(object))object=object.__target__;object.__revoke__()}}catch(_unused){return object}finally{seenObjects.add(object)}if(Array.isArray(object)){var index=0;var _iterator34=_createForOfIteratorHelper(object),_step34;try{for(_iterator34.s();!(_step34=_iterator34.n()).done;){var value=_step34.value;object[index]=_unwrapProxy(value,seenObjects);index+=1}}catch(err){_iterator34.e(err)}finally{_iterator34.f()}}else if(isMap(object)){var _iterator35=_createForOfIteratorHelper(object),_step35;try{for(_iterator35.s();!(_step35=_iterator35.n()).done;){var _step35$value=_slicedToArray(_step35.value,2),key=_step35$value[0],_value18=_step35$value[1];object.set(key,_unwrapProxy(_value18,seenObjects))}}catch(err){_iterator35.e(err)}finally{_iterator35.f()}}else if(isSet(object)){var cache=[];var _iterator36=_createForOfIteratorHelper(object),_step36;try{for(_iterator36.s();!(_step36=_iterator36.n()).done;){var _value20=_step36.value;object.delete(_value20);cache.push(_unwrapProxy(_value20,seenObjects))}}catch(err){_iterator36.e(err)}finally{_iterator36.f()}for(var _i29=0,_cache4=cache;_i29<_cache4.length;_i29++){var _value19=_cache4[_i29];object.add(_value19)}}else for(var _i30=0,_Object$entries16=Object.entries(object);_i30<_Object$entries16.length;_i30++){var _Object$entries16$_i=_slicedToArray(_Object$entries16[_i30],2),_key11=_Object$entries16$_i[0],_value21=_Object$entries16$_i[1];object[_key11]=_unwrapProxy(_value21,seenObjects)}}return object};

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
/* harmony export */   Tn: function() { return /* binding */ isFunction; },
/* harmony export */   jh: function() { return /* binding */ isMap; },
/* harmony export */   kf: function() { return /* binding */ isNumeric; },
/* harmony export */   vM: function() { return /* binding */ isSet; }
/* harmony export */ });
/* unused harmony exports isAnyMatching, isArrayLike, isObject, isPlainObject, isProxy, isWindow */
/* unused harmony import specifier */ var PLAIN_OBJECT_PROTOTYPES;
/* unused harmony import specifier */ var determineType;
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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
 */var isPlainObject=function isPlainObject(value){var _prototype$constructo;if(!isObject(value))return false;var prototype=Object.getPrototypeOf(value);if(PLAIN_OBJECT_PROTOTYPES.includes(prototype))return true;/*
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
/* 9 */,
/* 10 */,
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
/* 19 */,
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
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
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
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ !function() {
/******/ 	__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ }();
/******/ 
/************************************************************************/

;// external "@jest/globals"

// EXTERNAL MODULE: ./src/object.ts
var object = __webpack_require__(5);
;// ./src/test-helper.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module testHelper *//* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion

    generic test boilerplate:

    test.each([[EXPECTED, ...PARAMETERS], ...])(
        '%p === FUNCTION(...%p)',
        (expected: ReturnType<FUNCTION>, ...parameters: Parameters<FUNCTION>) =>
            expect(FUNCTION(...parameters)).toStrictEqual(expected)
    )
*/// region imports
function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(r.__proto__=GeneratorFunctionPrototype,_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}};// endregion
var TEST_DEFINED_SYMBOL=Symbol.for("clientnodeTestHelperDefined");var TEST_THROW_SYMBOL=Symbol.for("clientnodeTestHelperThrow");var TEST_UNDEFINED_SYMBOL=Symbol.for("clientnodeTestHelperUndefined");/**
 * Tests given result against given expectations. Respects special symbol
 * values.
 * @param givenResult - Target to compare expectation against.
 * @param expected - Expected result.
 * @param wrap - Indicates whether to wrap with an expect function call.
 * @returns Nothing or a promise resolving to nothing.
 */var expectExpectedType=function expectExpectedType(givenResult,expected,wrap){if(wrap===void 0){wrap=true}var result=wrap?__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(givenResult):givenResult;if(expected===TEST_DEFINED_SYMBOL)return result.toBeDefined();if(expected===TEST_UNDEFINED_SYMBOL)return result.not.toBeDefined();if(expected===TEST_THROW_SYMBOL)return result.toThrow();return result.toStrictEqual(expected)};// region testEach
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEach=function _testEach(tester,functionName,callback){for(var _len=arguments.length,functionTestTuple=new Array(_len>3?_len-3:0),_key=3;_key<_len;_key++){functionTestTuple[_key-3]=arguments[_key]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),function(expected){for(var _len2=arguments.length,parameters=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){parameters[_key2-1]=arguments[_key2]}expectExpectedType(callback.apply(void 0,parameters),expected)})};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEach=function testEach(functionName,callback){for(var _len3=arguments.length,functionTestTuple=new Array(_len3>2?_len3-2:0),_key3=2;_key3<_len3;_key3++){functionTestTuple[_key3-2]=arguments[_key3]}_testEach.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEach.only=function(functionName,callback){for(var _len4=arguments.length,functionTestTuple=new Array(_len4>2?_len4-2:0),_key4=2;_key4<_len4;_key4++){functionTestTuple[_key4-2]=arguments[_key4]}_testEach.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEach.skip=function(functionName,callback){for(var _len5=arguments.length,functionTestTuple=new Array(_len5>2?_len5-2:0),_key5=2;_key5<_len5;_key5++){functionTestTuple[_key5-2]=arguments[_key5]}_testEach.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEachAgainstResolvedPromise=function _testEachAgainstResolvedPromise(tester,functionName,callback){for(var _len6=arguments.length,functionTestTuple=new Array(_len6>3?_len6-3:0),_key6=3;_key6<_len6;_key6++){functionTestTuple[_key6-3]=arguments[_key6]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(expected){var _len7,parameters,_key7,_args=arguments,_t,_t2;return _regenerator().w(function(_context){while(1)switch(_context.n){case 0:for(_len7=_args.length,parameters=new Array(_len7>1?_len7-1:0),_key7=1;_key7<_len7;_key7++){parameters[_key7-1]=_args[_key7]}_t=expectExpectedType;_t2=callback.apply(void 0,parameters);_context.n=1;return expected;case 1:_t(_t2,_context.v);case 2:return _context.a(2)}},_callee)})))};/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEachAgainstResolvedPromise=function testEachAgainstResolvedPromise(functionName,callback){for(var _len8=arguments.length,functionTestTuple=new Array(_len8>2?_len8-2:0),_key8=2;_key8<_len8;_key8++){functionTestTuple[_key8-2]=arguments[_key8]}_testEachAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEachAgainstResolvedPromise.only=function(functionName,callback){for(var _len9=arguments.length,functionTestTuple=new Array(_len9>2?_len9-2:0),_key9=2;_key9<_len9;_key9++){functionTestTuple[_key9-2]=arguments[_key9]}_testEachAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEachAgainstResolvedPromise.skip=function(functionName,callback){for(var _len0=arguments.length,functionTestTuple=new Array(_len0>2?_len0-2:0),_key0=2;_key0<_len0;_key0++){functionTestTuple[_key0-2]=arguments[_key0]}_testEachAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachResolvedPromise
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEachResolvedPromise=function _testEachResolvedPromise(tester,functionName,callback){for(var _len1=arguments.length,functionTestTuple=new Array(_len1>3?_len1-3:0),_key1=3;_key1<_len1;_key1++){functionTestTuple[_key1-3]=arguments[_key1]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),function(expected){for(var _len10=arguments.length,parameters=new Array(_len10>1?_len10-1:0),_key10=1;_key10<_len10;_key10++){parameters[_key10-1]=arguments[_key10]}return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,parameters)).resolves,expected,false)})};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEachResolvedPromise=function testEachResolvedPromise(functionName,callback){for(var _len11=arguments.length,functionTestTuple=new Array(_len11>2?_len11-2:0),_key11=2;_key11<_len11;_key11++){functionTestTuple[_key11-2]=arguments[_key11]}_testEachResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEachResolvedPromise.only=function(functionName,callback){for(var _len12=arguments.length,functionTestTuple=new Array(_len12>2?_len12-2:0),_key12=2;_key12<_len12;_key12++){functionTestTuple[_key12-2]=arguments[_key12]}_testEachResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEachResolvedPromise.skip=function(functionName,callback){for(var _len13=arguments.length,functionTestTuple=new Array(_len13>2?_len13-2:0),_key13=2;_key13<_len13;_key13++){functionTestTuple[_key13-2]=arguments[_key13]}_testEachResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachResolvedPromiseAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEachResolvedPromiseAgainstResolvedPromise=function _testEachResolvedPromiseAgainstResolvedPromise(tester,functionName,callback){for(var _len14=arguments.length,functionTestTuple=new Array(_len14>3?_len14-3:0),_key14=3;_key14<_len14;_key14++){functionTestTuple[_key14-3]=arguments[_key14]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(expected){var _len15,parameters,_key15,_args2=arguments,_t3,_t4;return _regenerator().w(function(_context2){while(1)switch(_context2.n){case 0:for(_len15=_args2.length,parameters=new Array(_len15>1?_len15-1:0),_key15=1;_key15<_len15;_key15++){parameters[_key15-1]=_args2[_key15]}_t3=expectExpectedType;_t4=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,parameters)).resolves;_context2.n=1;return expected;case 1:return _context2.a(2,_t3(_t4,_context2.v,false))}},_callee2)})))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEachResolvedPromiseAgainstResolvedPromise=function testEachResolvedPromiseAgainstResolvedPromise(functionName,callback){for(var _len16=arguments.length,functionTestTuple=new Array(_len16>2?_len16-2:0),_key16=2;_key16<_len16;_key16++){functionTestTuple[_key16-2]=arguments[_key16]}_testEachResolvedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEachResolvedPromise.only=function(functionName,callback){for(var _len17=arguments.length,functionTestTuple=new Array(_len17>2?_len17-2:0),_key17=2;_key17<_len17;_key17++){functionTestTuple[_key17-2]=arguments[_key17]}_testEachResolvedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEachResolvedPromise.skip=function(functionName,callback){for(var _len18=arguments.length,functionTestTuple=new Array(_len18>2?_len18-2:0),_key18=2;_key18<_len18;_key18++){functionTestTuple[_key18-2]=arguments[_key18]}_testEachResolvedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachRejectedPromise
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEachRejectedPromise=function _testEachRejectedPromise(tester,functionName,callback){for(var _len19=arguments.length,functionTestTuple=new Array(_len19>3?_len19-3:0),_key19=3;_key19<_len19;_key19++){functionTestTuple[_key19-3]=arguments[_key19]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),function(expected){for(var _len20=arguments.length,parameters=new Array(_len20>1?_len20-1:0),_key20=1;_key20<_len20;_key20++){parameters[_key20-1]=arguments[_key20]}return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,parameters)).rejects,expected,false)})};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEachRejectedPromise=function testEachRejectedPromise(functionName,callback){for(var _len21=arguments.length,functionTestTuple=new Array(_len21>2?_len21-2:0),_key21=2;_key21<_len21;_key21++){functionTestTuple[_key21-2]=arguments[_key21]}_testEachRejectedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEachRejectedPromise.only=function(functionName,callback){for(var _len22=arguments.length,functionTestTuple=new Array(_len22>2?_len22-2:0),_key22=2;_key22<_len22;_key22++){functionTestTuple[_key22-2]=arguments[_key22]}_testEachRejectedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEachRejectedPromise.skip=function(functionName,callback){for(var _len23=arguments.length,functionTestTuple=new Array(_len23>2?_len23-2:0),_key23=2;_key23<_len23;_key23++){functionTestTuple[_key23-2]=arguments[_key23]}_testEachRejectedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachRejectedPromiseAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var _testEachRejectedPromiseAgainstResolvedPromise=function _testEachRejectedPromiseAgainstResolvedPromise(tester,functionName,callback){for(var _len24=arguments.length,functionTestTuple=new Array(_len24>3?_len24-3:0),_key24=3;_key24<_len24;_key24++){functionTestTuple[_key24-3]=arguments[_key24]}tester([].concat(functionTestTuple))("%p === ".concat(functionName,"(%p, ...)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(expected){var _len25,parameters,_key25,_args3=arguments,_t5,_t6;return _regenerator().w(function(_context3){while(1)switch(_context3.n){case 0:for(_len25=_args3.length,parameters=new Array(_len25>1?_len25-1:0),_key25=1;_key25<_len25;_key25++){parameters[_key25-1]=_args3[_key25]}_t5=expectExpectedType;_t6=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,parameters)).rejects;_context3.n=1;return expected;case 1:return _context3.a(2,_t5(_t6,_context3.v,false))}},_callee3)})))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */var testEachRejectedPromiseAgainstResolvedPromise=function testEachRejectedPromiseAgainstResolvedPromise(functionName,callback){for(var _len26=arguments.length,functionTestTuple=new Array(_len26>2?_len26-2:0),_key26=2;_key26<_len26;_key26++){functionTestTuple[_key26-2]=arguments[_key26]}_testEachRejectedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback].concat(functionTestTuple))};testEachRejectedPromiseAgainstResolvedPromise.only=function(functionName,callback){for(var _len27=arguments.length,functionTestTuple=new Array(_len27>2?_len27-2:0),_key27=2;_key27<_len27;_key27++){functionTestTuple[_key27-2]=arguments[_key27]}_testEachRejectedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback].concat(functionTestTuple))};testEachRejectedPromiseAgainstResolvedPromise.skip=function(functionName,callback){for(var _len28=arguments.length,functionTestTuple=new Array(_len28>2?_len28-2:0),_key28=2;_key28<_len28;_key28++){functionTestTuple[_key28-2]=arguments[_key28]}_testEachRejectedPromiseAgainstResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback].concat(functionTestTuple))};// endregion
// region testEachSingleParameterAgainstSameExpectation
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var _testEachSingleParameterAgainstSameExpectation=function _testEachSingleParameterAgainstSameExpectation(tester,functionName,callback,expected){for(var _len29=arguments.length,parameters=new Array(_len29>4?_len29-4:0),_key29=4;_key29<_len29;_key29++){parameters[_key29-4]=arguments[_key29]}tester([].concat(parameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p)"),function(parameter){expectExpectedType(expected===TEST_THROW_SYMBOL?function(){return callback(parameter)}:callback(parameter),expected)})};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var testEachSingleParameterAgainstSameExpectation=function testEachSingleParameterAgainstSameExpectation(functionName,callback,expected){for(var _len30=arguments.length,parameters=new Array(_len30>3?_len30-3:0),_key30=3;_key30<_len30;_key30++){parameters[_key30-3]=arguments[_key30]}_testEachSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(parameters))};testEachSingleParameterAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len31=arguments.length,parameters=new Array(_len31>3?_len31-3:0),_key31=3;_key31<_len31;_key31++){parameters[_key31-3]=arguments[_key31]}_testEachSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(parameters))};testEachSingleParameterAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len32=arguments.length,parameters=new Array(_len32>3?_len32-3:0),_key32=3;_key32<_len32;_key32++){parameters[_key32-3]=arguments[_key32]}_testEachSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(parameters))};// endregion
// region testEachResolvedPromiseWithSingleParameterAgainstSameExpectation
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation=function _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(tester,functionName,callback,expected){for(var _len33=arguments.length,parameters=new Array(_len33>4?_len33-4:0),_key33=4;_key33<_len33;_key33++){parameters[_key33-4]=arguments[_key33]}tester([].concat(parameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p)"),function(parameter){return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback(parameter)).resolves,expected,false)})};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var testEachResolvedPromiseWithSingleParameterAgainstSameExpectation=function testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(functionName,callback,expected){for(var _len34=arguments.length,parameters=new Array(_len34>3?_len34-3:0),_key34=3;_key34<_len34;_key34++){parameters[_key34-3]=arguments[_key34]}_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(parameters))};testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len35=arguments.length,parameters=new Array(_len35>3?_len35-3:0),_key35=3;_key35<_len35;_key35++){parameters[_key35-3]=arguments[_key35]}_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(parameters))};testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len36=arguments.length,parameters=new Array(_len36>3?_len36-3:0),_key36=3;_key36<_len36;_key36++){parameters[_key36-3]=arguments[_key36]}_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(parameters))};// endregion
// region testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise
/**
 * Tests each given single parameter against same given promises resolving to
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise=function _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(tester,functionName,callback,expected){for(var _len37=arguments.length,parameters=new Array(_len37>4?_len37-4:0),_key37=4;_key37<_len37;_key37++){parameters[_key37-4]=arguments[_key37]}tester([].concat(parameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(parameter){var _t7,_t8;return _regenerator().w(function(_context4){while(1)switch(_context4.n){case 0:_t7=expectExpectedType;_t8=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback(parameter)).resolves;_context4.n=1;return expected;case 1:return _context4.a(2,_t7(_t8,_context4.v,false))}},_callee4)})))};/**
 * Tests each given single parameter against same given promises resolving to
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise=function testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(functionName,callback,expected){for(var _len38=arguments.length,parameters=new Array(_len38>3?_len38-3:0),_key38=3;_key38<_len38;_key38++){parameters[_key38-3]=arguments[_key38]}_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(parameters))};testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.only=function(functionName,callback,expected){for(var _len39=arguments.length,parameters=new Array(_len39>3?_len39-3:0),_key39=3;_key39<_len39;_key39++){parameters[_key39-3]=arguments[_key39]}_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(parameters))};testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.skip=function(functionName,callback,expected){for(var _len40=arguments.length,parameters=new Array(_len40>3?_len40-3:0),_key40=3;_key40<_len40;_key40++){parameters[_key40-3]=arguments[_key40]}_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(parameters))};// endregion
// region testEachRejectedPromiseWithSingleParameterAgainstSameExpectation
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation=function _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(tester,functionName,callback,expected){for(var _len41=arguments.length,parameters=new Array(_len41>4?_len41-4:0),_key41=4;_key41<_len41;_key41++){parameters[_key41-4]=arguments[_key41]}tester([].concat(parameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p)"),function(parameter){return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback(parameter)).rejects,expected,false)})};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var testEachRejectedPromiseWithSingleParameterAgainstSameExpectation=function testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(functionName,callback,expected){for(var _len42=arguments.length,parameters=new Array(_len42>3?_len42-3:0),_key42=3;_key42<_len42;_key42++){parameters[_key42-3]=arguments[_key42]}_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(parameters))};testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len43=arguments.length,parameters=new Array(_len43>3?_len43-3:0),_key43=3;_key43<_len43;_key43++){parameters[_key43-3]=arguments[_key43]}_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(parameters))};testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len44=arguments.length,parameters=new Array(_len44>3?_len44-3:0),_key44=3;_key44<_len44;_key44++){parameters[_key44-3]=arguments[_key44]}_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(parameters))};// endregion
// region testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise
/**
 * Tests each given single parameter against same given promise resolving
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise=function _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(tester,functionName,callback,expected){for(var _len45=arguments.length,parameters=new Array(_len45>4?_len45-4:0),_key45=4;_key45<_len45;_key45++){parameters[_key45-4]=arguments[_key45]}tester([].concat(parameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(parameter){var _t9,_t0;return _regenerator().w(function(_context5){while(1)switch(_context5.n){case 0:_t9=expectExpectedType;_t0=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback(parameter)).rejects;_context5.n=1;return expected;case 1:return _context5.a(2,_t9(_t0,_context5.v,false))}},_callee5)})))};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */var testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise=function testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(functionName,callback,expected){for(var _len46=arguments.length,parameters=new Array(_len46>3?_len46-3:0),_key46=3;_key46<_len46;_key46++){parameters[_key46-3]=arguments[_key46]}_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(parameters))};testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.only=function(functionName,callback,expected){for(var _len47=arguments.length,parameters=new Array(_len47>3?_len47-3:0),_key47=3;_key47<_len47;_key47++){parameters[_key47-3]=arguments[_key47]}_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(parameters))};testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.skip=function(functionName,callback,expected){for(var _len48=arguments.length,parameters=new Array(_len48>3?_len48-3:0),_key48=3;_key48<_len48;_key48++){parameters[_key48-3]=arguments[_key48]}_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(parameters))};// endregion
// region testEachAgainstSameExpectation
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var _testEachAgainstSameExpectation=function _testEachAgainstSameExpectation(tester,functionName,callback,expected){for(var _len49=arguments.length,functionParameters=new Array(_len49>4?_len49-4:0),_key49=4;_key49<_len49;_key49++){functionParameters[_key49-4]=arguments[_key49]}tester([].concat(functionParameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p, ...)"),function(){for(var _len50=arguments.length,parameters=new Array(_len50),_key50=0;_key50<_len50;_key50++){parameters[_key50]=arguments[_key50]}expectExpectedType(expected===TEST_THROW_SYMBOL?function(){return callback.apply(void 0,parameters)}:callback.apply(void 0,parameters),expected)})};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var testEachAgainstSameExpectation=function testEachAgainstSameExpectation(functionName,callback,expected){for(var _len51=arguments.length,functionParameters=new Array(_len51>3?_len51-3:0),_key51=3;_key51<_len51;_key51++){functionParameters[_key51-3]=arguments[_key51]}_testEachAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(functionParameters))};testEachAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len52=arguments.length,functionParameters=new Array(_len52>3?_len52-3:0),_key52=3;_key52<_len52;_key52++){functionParameters[_key52-3]=arguments[_key52]}_testEachAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(functionParameters))};testEachAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len53=arguments.length,functionParameters=new Array(_len53>3?_len53-3:0),_key53=3;_key53<_len53;_key53++){functionParameters[_key53-3]=arguments[_key53]}_testEachAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(functionParameters))};// endregion
// region testEachResolvedPromiseAgainstSameExpectation
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var _testEachResolvedPromiseAgainstSameExpectation=function _testEachResolvedPromiseAgainstSameExpectation(tester,functionName,callback,expected){for(var _len54=arguments.length,functionParameters=new Array(_len54>4?_len54-4:0),_key54=4;_key54<_len54;_key54++){functionParameters[_key54-4]=arguments[_key54]}tester([].concat(functionParameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p, ...)"),function(){return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,arguments)).resolves,expected,false)})};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var testEachResolvedPromiseAgainstSameExpectation=function testEachResolvedPromiseAgainstSameExpectation(functionName,callback,expected){for(var _len55=arguments.length,functionParameters=new Array(_len55>3?_len55-3:0),_key55=3;_key55<_len55;_key55++){functionParameters[_key55-3]=arguments[_key55]}_testEachResolvedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(functionParameters))};testEachResolvedPromiseAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len56=arguments.length,functionParameters=new Array(_len56>3?_len56-3:0),_key56=3;_key56<_len56;_key56++){functionParameters[_key56-3]=arguments[_key56]}_testEachResolvedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(functionParameters))};testEachResolvedPromiseAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len57=arguments.length,functionParameters=new Array(_len57>3?_len57-3:0),_key57=3;_key57<_len57;_key57++){functionParameters[_key57-3]=arguments[_key57]}_testEachResolvedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(functionParameters))};// endregion
// region testEachResolvedPromiseAgainstSameResolvedPromise
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var _testEachResolvedPromiseAgainstSameResolvedPromise=function _testEachResolvedPromiseAgainstSameResolvedPromise(tester,functionName,callback,expected){for(var _len58=arguments.length,functionParameters=new Array(_len58>4?_len58-4:0),_key58=4;_key58<_len58;_key58++){functionParameters[_key58-4]=arguments[_key58]}tester([].concat(functionParameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p, ...)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(){var _args6=arguments,_t1,_t10;return _regenerator().w(function(_context6){while(1)switch(_context6.n){case 0:_t1=expectExpectedType;_t10=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,_args6)).resolves;_context6.n=1;return expected;case 1:return _context6.a(2,_t1(_t10,_context6.v,false))}},_callee6)})))};/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var testEachResolvedPromiseAgainstSameResolvedPromise=function testEachResolvedPromiseAgainstSameResolvedPromise(functionName,callback,expected){for(var _len59=arguments.length,functionParameters=new Array(_len59>3?_len59-3:0),_key59=3;_key59<_len59;_key59++){functionParameters[_key59-3]=arguments[_key59]}_testEachResolvedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(functionParameters))};testEachResolvedPromiseAgainstSameResolvedPromise.only=function(functionName,callback,expected){for(var _len60=arguments.length,functionParameters=new Array(_len60>3?_len60-3:0),_key60=3;_key60<_len60;_key60++){functionParameters[_key60-3]=arguments[_key60]}_testEachResolvedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(functionParameters))};testEachResolvedPromiseAgainstSameResolvedPromise.skip=function(functionName,callback,expected){for(var _len61=arguments.length,functionParameters=new Array(_len61>3?_len61-3:0),_key61=3;_key61<_len61;_key61++){functionParameters[_key61-3]=arguments[_key61]}_testEachResolvedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(functionParameters))};// endregion
// region testEachRejectedPromiseAgainstSameExpectation
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var _testEachRejectedPromiseAgainstSameExpectation=function _testEachRejectedPromiseAgainstSameExpectation(tester,functionName,callback,expected){for(var _len62=arguments.length,functionParameters=new Array(_len62>4?_len62-4:0),_key62=4;_key62<_len62;_key62++){functionParameters[_key62-4]=arguments[_key62]}tester([].concat(functionParameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p, ...)"),function(){return expectExpectedType(__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,arguments)).rejects,expected,false)})};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var testEachRejectedPromiseAgainstSameExpectation=function testEachRejectedPromiseAgainstSameExpectation(functionName,callback,expected){for(var _len63=arguments.length,functionParameters=new Array(_len63>3?_len63-3:0),_key63=3;_key63<_len63;_key63++){functionParameters[_key63-3]=arguments[_key63]}_testEachRejectedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(functionParameters))};testEachRejectedPromiseAgainstSameExpectation.only=function(functionName,callback,expected){for(var _len64=arguments.length,functionParameters=new Array(_len64>3?_len64-3:0),_key64=3;_key64<_len64;_key64++){functionParameters[_key64-3]=arguments[_key64]}_testEachRejectedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(functionParameters))};testEachRejectedPromiseAgainstSameExpectation.skip=function(functionName,callback,expected){for(var _len65=arguments.length,functionParameters=new Array(_len65>3?_len65-3:0),_key65=3;_key65<_len65;_key65++){functionParameters[_key65-3]=arguments[_key65]}_testEachRejectedPromiseAgainstSameExpectation.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(functionParameters))};// endregion
// region testEachRejectedPromiseAgainstSameResolvedPromise
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to Value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var _testEachRejectedPromiseAgainstSameResolvedPromise=function _testEachRejectedPromiseAgainstSameResolvedPromise(tester,functionName,callback,expected){for(var _len66=arguments.length,functionParameters=new Array(_len66>4?_len66-4:0),_key66=4;_key66<_len66;_key66++){functionParameters[_key66-4]=arguments[_key66]}tester([].concat(functionParameters))("".concat((0,object/* represent */.Do)(expected)," === ").concat(functionName,"(%p, ...)"),/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(){var _args7=arguments,_t11,_t12;return _regenerator().w(function(_context7){while(1)switch(_context7.n){case 0:_t11=expectExpectedType;_t12=__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_expect__(callback.apply(void 0,_args7)).rejects;_context7.n=1;return expected;case 1:return _context7.a(2,_t11(_t12,_context7.v,false))}},_callee7)})))};/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */var testEachRejectedPromiseAgainstSameResolvedPromise=function testEachRejectedPromiseAgainstSameResolvedPromise(functionName,callback,expected){for(var _len67=arguments.length,functionParameters=new Array(_len67>3?_len67-3:0),_key67=3;_key67<_len67;_key67++){functionParameters[_key67-3]=arguments[_key67]}_testEachRejectedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.each,functionName,callback,expected].concat(functionParameters))};testEachRejectedPromiseAgainstSameResolvedPromise.only=function(functionName,callback,expected){for(var _len68=arguments.length,functionParameters=new Array(_len68>3?_len68-3:0),_key68=3;_key68<_len68;_key68++){functionParameters[_key68-3]=arguments[_key68]}_testEachRejectedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.only.each,functionName,callback,expected].concat(functionParameters))};testEachRejectedPromiseAgainstSameResolvedPromise.skip=function(functionName,callback,expected){for(var _len69=arguments.length,functionParameters=new Array(_len69>3?_len69-3:0),_key69=3;_key69<_len69;_key69++){functionParameters[_key69-3]=arguments[_key69]}_testEachRejectedPromiseAgainstSameResolvedPromise.apply(void 0,[__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c_test__.skip.each,functionName,callback,expected].concat(functionParameters))};// endregion
/* harmony default export */ var test_helper = (testEach);
export { TEST_DEFINED_SYMBOL, TEST_THROW_SYMBOL, TEST_UNDEFINED_SYMBOL, test_helper as default, expectExpectedType, testEach, testEachAgainstResolvedPromise, testEachAgainstSameExpectation, testEachRejectedPromise, testEachRejectedPromiseAgainstResolvedPromise, testEachRejectedPromiseAgainstSameExpectation, testEachRejectedPromiseAgainstSameResolvedPromise, testEachRejectedPromiseWithSingleParameterAgainstSameExpectation, testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise, testEachResolvedPromise, testEachResolvedPromiseAgainstResolvedPromise, testEachResolvedPromiseAgainstSameExpectation, testEachResolvedPromiseAgainstSameResolvedPromise, testEachResolvedPromiseWithSingleParameterAgainstSameExpectation, testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise, testEachSingleParameterAgainstSameExpectation };

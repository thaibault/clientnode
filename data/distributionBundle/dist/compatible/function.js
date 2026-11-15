if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_push_js_baa3ea94__ from "core-js/modules/es.array.push.js";
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
var __webpack_exports__ = {};
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D_: function() { return /* binding */ identity; },
/* harmony export */   Gj: function() { return /* binding */ _getParameterNames; },
/* harmony export */   gH: function() { return /* binding */ invertArrayFilter; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module function *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n}/**
 * Determines all parameter names from given callable (function or class,
 * ...).
 * @param callable - Function or function code to inspect.
 * @returns List of parameter names.
 */var _getParameterNames=function getParameterNames(callable){var functionCode=(typeof callable==="string"?callable:// Strip comments.
callable.toString()).replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,"");if(functionCode.startsWith("class"))return _getParameterNames("function "+functionCode.replace(/.*(constructor\([^)]+\))/m,"$1"));// Try classic function declaration.
var parameter=/^function\s*[^(]*\(\s*([^)]*)\)/m.exec(functionCode);if(parameter===null)// Try arrow function declaration.
parameter=/^[^(]*\(\s*([^)]*)\) *=>.*/m.exec(functionCode);if(parameter===null)// Try one argument and without brackets arrow function declaration.
parameter=/([^= ]+) *=>.*/m.exec(functionCode);var names=[];if(parameter&&parameter.length>1&&parameter[1].trim().length){var _iterator=_createForOfIteratorHelper(parameter[1].split(",")),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;)// Remove default parameter values.
{var name=_step.value;names.push(name.replace(/=.+$/g,"").trim())}}catch(err){_iterator.e(err)}finally{_iterator.f()}return names}return names};/**
 * Implements the identity function.
 * @param value - A value to return.
 * @returns Returns the given value.
 */var identity=function identity(value){return value};/**
 * Inverted filter helper to inverse each given filter.
 * @param filter - A function that filters an array.
 * @returns The inverted filter.
 */var invertArrayFilter=function invertArrayFilter(filter){return function(data){if(Array.isArray(data)){for(var _len=arguments.length,additionalParameter=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){additionalParameter[_key-1]=arguments[_key]}var filteredData=filter.apply(void 0,[data].concat(additionalParameter));var result=[];if(filteredData.length){var _iterator2=_createForOfIteratorHelper(data),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var date=_step2.value;if(!filteredData.includes(date))result.push(date)}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}}else result=data;return result}return data}};
export { _getParameterNames as getParameterNames, identity, invertArrayFilter };

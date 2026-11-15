#!/usr/bin/env node
// -*- coding: utf-8 -*-
import "node:buffer";
import "stream";
import { default as __WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__ } from "prop-types";
import * as __WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__ from "@jest/globals";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_regexp_flags_js_c0be7d17__ from "core-js/modules/es.regexp.flags.js";
/******/ var __webpack_modules__ = ([
/* 0 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lz: () => (/* binding */ globalContext)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
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
*/let globalContext=(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .determineGlobalContext */ .a8)();const setGlobalContext=context=>{globalContext=context};globalContext.fetch=globalContext.fetch?globalContext.fetch.bind(globalContext):(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalRequire */ .I5)("node-fetch")?.default??((...parameters)=>(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalImport */ .Sw)(/* webpackIgnore: true */"node-fetch").then(module=>module.default(...parameters)));const MAXIMAL_NUMBER_OF_ITERATIONS={value:100};// A no-op dummy function.
const NOOP=()=>{// Do nothing.
};const mockConsole=()=>{// Avoid errors in browsers that lack a console.
if(!Object.prototype.hasOwnProperty.call(globalContext,"console"))globalContext.console={};if(!globalContext.console)globalContext.console={};for(const methodName of _constants_js__WEBPACK_IMPORTED_MODULE_0__/* .CONSOLE_METHODS */ .jg)if(!(methodName in globalContext.console))globalContext.console[methodName]=NOOP};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "$Q", 0, /* binding */ MAXIMAL_NUMBER_OF_ITERATIONS,
/* harmony export */   "QH", 0, /* binding */ mockConsole,
/* harmony export */   "tE", 0, /* binding */ NOOP,
/* harmony export */   "zm", 0, /* binding */ setGlobalContext
/* harmony export */ ]);


/***/ }),
/* 1 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const x = (y) => {
	const x = {}; __webpack_require__.d(x, y); return x
} 
const y = (x) => (() => (x))
module.exports = x({  });

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const x = (y) => {
	const x = {}; __webpack_require__.d(x, y); return x
} 
const y = (x) => (() => (x))
module.exports = x({ ["beforeAll"]: () => (__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__.beforeAll), ["describe"]: () => (__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__.describe), ["expect"]: () => (__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__.expect), ["jest"]: () => (__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__.jest), ["test"]: () => (__WEBPACK_EXTERNAL_MODULE__jest_globals_d700ac6c__.test) });

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GP: () => (/* binding */ isAnyMatching),
/* harmony export */   Gv: () => (/* binding */ isObject),
/* harmony export */   Qd: () => (/* binding */ isPlainObject),
/* harmony export */   Tn: () => (/* binding */ isFunction),
/* harmony export */   Xj: () => (/* binding */ isArrayLike),
/* harmony export */   jh: () => (/* binding */ isMap),
/* harmony export */   ju: () => (/* binding */ isProxy),
/* harmony export */   kf: () => (/* binding */ isNumeric),
/* harmony export */   l6: () => (/* binding */ isWindow),
/* harmony export */   vM: () => (/* binding */ isSet)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
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
*//**
 * Checks whether one of the given pattern matches given string.
 * @param target - Target to check in pattern for.
 * @param pattern - List of pattern to check for.
 * @returns Value "true" if given object is matches by at leas one of the
 * given pattern and "false" otherwise.
 */const isAnyMatching=(target,pattern)=>{for(const currentPattern of pattern)if(typeof currentPattern==="string"){if(currentPattern===target)return true}else if(currentPattern.test(target))return true;return false};/**
 * Checks if given object is similar to an array and can be handled like an
 * array.
 * @param object - Object to check behavior for.
 * @returns A boolean value indicating whether given object is array like.
 */const isArrayLike=object=>{let length;try{length=Boolean(object)&&object.length}catch{return false}const type=(0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(object);if(type==="function"||isWindow(object))return false;if(type==="array"||length===0)return true;if(typeof length==="number"&&length>0)try{const _dump=object[length-1];return true}catch{// Continue regardless of an error.
}return false};/**
 * Checks whether given object is a function.
 * @param value - Value to check.
 * @returns Value "true" if given object is a function and "false"
 * otherwise.
 */const isFunction=value=>Boolean(value)&&["[object AsyncFunction]","[object Function]"].includes({}.toString.call(value));/**
 * Checks whether given object is a map.
 * @param value - Value to check.
 * @returns Value "true" if given object is a map and "false" otherwise.
 */const isMap=value=>(0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value)==="map";/**
 * Determines whether its argument represents a JavaScript number.
 * @param value - Value to analyze.
 * @returns A boolean value indicating whether given object is numeric
 * like.
 */const isNumeric=value=>{const type=(0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value);/*
        NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
        misinterprets leading-number strings, particularly hex literals
        ("0x...") subtraction forces infinities to NaN.
    */return["number","string"].includes(type)&&!isNaN(value-parseFloat(value))};/**
 * Checks whether given object is a native object but not null.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */const isObject=value=>value!==null&&typeof value==="object";/**
 * Checks whether given object is a plain native object.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */const isPlainObject=value=>{if(!isObject(value))return false;const prototype=Object.getPrototypeOf(value);if(_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .PLAIN_OBJECT_PROTOTYPES */ .jE.includes(prototype))return true;/*
        NOTE: Plain objects created in another realm (a vm context like used by
        test runners or a worker for example) have their own "Object.prototype"
        instance and would not be recognized by the identity check above.
    */return prototype!==null&&Object.getPrototypeOf(prototype)===null&&prototype.constructor?.name==="Object"};/**
 * Checks whether given object is a proxy.
 * @param value - Value to check.
 * @returns Value "true" if given object is a proxy and "false" otherwise.
 */const isProxy=value=>Boolean(value?.__target__);/**
 * Checks whether given object is a set.
 * @param value - Value to check.
 * @returns Value "true" if given object is a set and "false" otherwise.
 */const isSet=value=>(0,_object_js__WEBPACK_IMPORTED_MODULE_2__/* .determineType */ .Sj)(value)==="set";/**
 * Determine whether the argument is a window.
 * @param value - Value to check for.
 * @returns Boolean value indicating the result.
 */const isWindow=value=>![null,undefined].includes(value)&&typeof value==="object"&&value===value?.window;

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ copy),
/* harmony export */   Do: () => (/* binding */ represent),
/* harmony export */   J3: () => (/* binding */ evaluateDynamicData),
/* harmony export */   Pi: () => (/* binding */ evaluateAsyncDynamicData),
/* harmony export */   QB: () => (/* binding */ addDynamicGetterAndSetter),
/* harmony export */   Sj: () => (/* binding */ determineType),
/* harmony export */   X$: () => (/* binding */ extend),
/* harmony export */   _2: () => (/* binding */ modifyObject),
/* harmony export */   aI: () => (/* binding */ equals),
/* harmony export */   bo: () => (/* binding */ getProxyHandler),
/* harmony export */   dK: () => (/* binding */ mask),
/* harmony export */   di: () => (/* binding */ sort),
/* harmony export */   dr: () => (/* binding */ convertSubstringInPlainObject),
/* harmony export */   eQ: () => (/* binding */ convertPlainObjectToMap),
/* harmony export */   iE: () => (/* binding */ removeKeysInEvaluation),
/* harmony export */   oW: () => (/* binding */ convertMapToPlainObject),
/* harmony export */   q1: () => (/* binding */ unwrapProxy),
/* harmony export */   uu: () => (/* binding */ removeKeyPrefixes),
/* harmony export */   zP: () => (/* binding */ convertCircularObjectToJSON)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_regexp_flags_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
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
*//**
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
 */const addDynamicGetterAndSetter=(object,getterWrapper=null,setterWrapper=null,methodNames={},deep=true,typesToExtend=[Object])=>{if(deep&&typeof object==="object")if(Array.isArray(object)){let index=0;for(const value of object){object[index]=addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object))for(const[key,value]of object)object.set(key,addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep));else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object)){const cache=[];for(const value of object){object.delete(value);cache.push(addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep))}for(const value of cache)object.add(value)}else if(object!==null)for(const[key,value]of Object.entries(object))object[key]=addDynamicGetterAndSetter(value,getterWrapper,setterWrapper,methodNames,deep);if(getterWrapper||setterWrapper)for(const type of typesToExtend)if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(object)&&object instanceof type){const defaultHandler=getProxyHandler(object,methodNames);const handler=getProxyHandler(object,methodNames);if(getterWrapper)handler.get=(_target,name)=>{if(name==="__target__")return object;if(name==="__revoke__")return()=>{revoke();return object};if(typeof object[name]==="function")return object[name];return getterWrapper(defaultHandler.get(proxy,name),name,object)};if(setterWrapper)handler.set=(_target,name,value)=>defaultHandler.set(proxy,name,setterWrapper(name,value,object));const{proxy,revoke}=Proxy.revocable({},handler);return proxy}return object};/**
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
 */const convertCircularObjectToJSON=(object,determineCircularReferenceValue=serializedValue=>serializedValue??"__circularReference__",numberOfSpaces=0)=>{const seenObjects=new Map;const stringifier=object=>{const replacer=(key,value)=>{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(value)){if(seenObjects.has(value))return determineCircularReferenceValue(seenObjects.get(value)??null,key,value,seenObjects);// NOTE: Set before traversing deeper to detect cycles.
seenObjects.set(value,null);let result;if(Array.isArray(value)){result=[];for(const item of value)result.push(replacer(null,item))}else{result={};for(const[name,subValue]of Object.entries(value))result[name]=replacer(name,subValue)}seenObjects.set(value,result);return result}return value};return JSON.stringify(object,replacer,numberOfSpaces)};return stringifier(object)};/**
 * Converts given map and all nested found maps objects to corresponding
 * object.
 * @param object - Map to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given map as object.
 */const convertMapToPlainObject=(object,deep=true)=>{if(typeof object==="object"){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object)){const newObject={};for(let[key,value]of object){if(deep)value=convertMapToPlainObject(value,deep);if(["number","string"].includes(typeof key))newObject[String(key)]=value}return newObject}if(deep)if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(object))for(const[key,value]of Object.entries(object))object[key]=convertMapToPlainObject(value,deep);else if(Array.isArray(object)){let index=0;for(const value of object){object[index]=convertMapToPlainObject(value,deep);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object)){const cache=[];for(const value of object){object.delete(value);cache.push(convertMapToPlainObject(value,deep))}for(const value of cache)object.add(value)}}return object};/**
 * Converts given plain object and all nested found objects to
 * corresponding map.
 * @param object - Object to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given object as map.
 */const convertPlainObjectToMap=(object,deep=true)=>{if(typeof object==="object"){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(object)){const newObject=new Map;for(const[key,value]of Object.entries(object)){if(deep)object[key]=convertPlainObjectToMap(value,deep);newObject.set(key,object[key])}return newObject}if(deep)if(Array.isArray(object)){let index=0;for(const value of object){object[index]=convertPlainObjectToMap(value,deep);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object))for(const[key,value]of object)object.set(key,convertPlainObjectToMap(value,deep));else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object)){const cache=[];for(const value of object){object.delete(value);cache.push(convertPlainObjectToMap(value,deep))}for(const value of cache)object.add(value)}}return object};/**
 * Replaces given pattern in each value in given object recursively with
 * given string replacement.
 * @param object - Object to convert substrings in.
 * @param pattern - Regular expression to replace.
 * @param replacement - String to use as replacement for found patterns.
 * @returns Converted object with replaced patterns.
 */const convertSubstringInPlainObject=(object,pattern,replacement)=>{for(const[key,value]of Object.entries(object))if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(value))object[key]=convertSubstringInPlainObject(value,pattern,replacement);else if(typeof value==="string")object[key]=value.replace(pattern,replacement);return object};/* eslint-disable jsdoc/require-description-complete-sentence *//**
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
 */const copy=(source,copyBlobs=false,recursionLimit=-1,recursionEndValue=_constants_js__WEBPACK_IMPORTED_MODULE_2__/* .VALUE_COPY_SYMBOL */ .Fp,destination=null,cyclic=false,knownReferences=[],recursionLevel=0)=>{/* eslint-enable jsdoc/require-description-complete-sentence */if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(source))if(destination){if(source===destination)throw new Error(`Can't copy because source and destination are `+"identical.");if(!cyclic&&![undefined,null].includes(source)){const index=knownReferences.indexOf(source);if(index!==-1)return knownReferences[index];knownReferences.push(source)}const copyValue=value=>{if(recursionLimit!==-1&&recursionLimit<recursionLevel+1)return recursionEndValue===_constants_js__WEBPACK_IMPORTED_MODULE_2__/* .VALUE_COPY_SYMBOL */ .Fp?value:recursionEndValue;const result=copy(value,copyBlobs,recursionLimit,recursionEndValue,null,cyclic,knownReferences,recursionLevel+1);if(!cyclic&&![undefined,null].includes(value)&&typeof value==="object")knownReferences.push(value);return result};if(Array.isArray(source))for(const item of source)destination.push(copyValue(item));else if(source instanceof Map)for(const[key,value]of source)destination.set(key,copyValue(value));else if(source instanceof Set)for(const value of source)destination.add(copyValue(value));else for(const[key,value]of Object.entries(source))try{destination[key]=copyValue(value)}catch(error){throw new Error("Failed to copy property value object \""+`${key}": ${represent(error)}`,{cause:error})}}else{if(Array.isArray(source))return copy(source,copyBlobs,recursionLimit,recursionEndValue,[],cyclic,knownReferences,recursionLevel);if(source instanceof Map)return copy(source,copyBlobs,recursionLimit,recursionEndValue,new Map,cyclic,knownReferences,recursionLevel);if(source instanceof Set)return copy(source,copyBlobs,recursionLimit,recursionEndValue,new Set,cyclic,knownReferences,recursionLevel);if(source instanceof Date)return new Date(source.getTime());if(source instanceof RegExp){const modifier=/[^/]*$/.exec(source.toString());destination=new RegExp(source.source,modifier?modifier[0]:undefined);destination.lastIndex=source.lastIndex;return destination}if(typeof Blob!=="undefined"&&source instanceof Blob)return copyBlobs?source.slice(0,source.size,source.type):source;return copy(source,copyBlobs,recursionLimit,recursionEndValue,{},cyclic,knownReferences,recursionLevel)}return destination||source};/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param value - Value to analyze.
 * @returns Name of determined type.
 */const determineType=value=>{if([null,undefined].includes(value))return String(value);const type=typeof value;if(["function","object"].includes(type)&&"toString"in value){const stringRepresentation=Object.prototype.toString.call(value);if(Object.prototype.hasOwnProperty.call(_constants_js__WEBPACK_IMPORTED_MODULE_2__/* .CLASS_TO_TYPE_MAPPING */ .rq,stringRepresentation))return _constants_js__WEBPACK_IMPORTED_MODULE_2__/* .CLASS_TO_TYPE_MAPPING */ .rq[stringRepresentation]}return type};/**
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
 */const equals=(firstValue,secondValue,givenOptions={})=>{const options={compareBlobs:false,deep:-1,exceptionPrefixes:[],ignoreFunctions:true,properties:null,returnReasonIfNotEqual:false,...givenOptions};if(options.ignoreFunctions&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn)(firstValue)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn)(secondValue)||firstValue===secondValue||(0,_number_js__WEBPACK_IMPORTED_MODULE_4__/* .isNotANumber */ .W2)(firstValue)&&(0,_number_js__WEBPACK_IMPORTED_MODULE_4__/* .isNotANumber */ .W2)(secondValue)||firstValue instanceof RegExp&&secondValue instanceof RegExp&&firstValue.toString()===secondValue.toString()&&firstValue.flags.split("").sort().join("")===secondValue.flags.split("").sort().join("")||firstValue instanceof Date&&secondValue instanceof Date&&(isNaN(firstValue.getTime())&&isNaN(secondValue.getTime())||!isNaN(firstValue.getTime())&&!isNaN(secondValue.getTime())&&firstValue.getTime()===secondValue.getTime())||options.compareBlobs&&eval("typeof Buffer")!=="undefined"&&Object.prototype.hasOwnProperty.call(eval("Buffer"),"isBuffer")&&firstValue instanceof eval("Buffer")&&secondValue instanceof eval("Buffer")&&firstValue.toString("base64")===secondValue.toString("base64"))return true;if(options.compareBlobs&&typeof Blob!=="undefined"&&firstValue instanceof Blob&&secondValue instanceof Blob)return new Promise(resolve=>{const values=[];for(const value of[firstValue,secondValue]){const fileReader=new FileReader;fileReader.onload=event=>{if(event.target===null)values.push(null);else values.push(event.target.result);if(values.length===2)if(values[0]===values[1])resolve(true);else resolve(options.returnReasonIfNotEqual?`>>> Blob(${represent(values[0])})  !== `+`Blob(${represent(values[1])})`:false)};fileReader.readAsDataURL(value)}});if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(firstValue)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(secondValue)&&!(firstValue instanceof RegExp||secondValue instanceof RegExp)||Array.isArray(firstValue)&&Array.isArray(secondValue)&&firstValue.length===secondValue.length||determineType(firstValue)===determineType(secondValue)&&["map","set"].includes(determineType(firstValue))&&firstValue.size===secondValue.size){const promises=[];for(const[first,second]of[[firstValue,secondValue],[secondValue,firstValue]]){const firstIsArray=Array.isArray(first);if(firstIsArray&&(!Array.isArray(second)||first.length!==second.length))return options.returnReasonIfNotEqual?".length":false;const firstIsMap=(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(first);if(firstIsMap&&(!(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;const firstIsSet=(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(first);if(firstIsSet&&(!(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(second)||first.size!==second.size))return options.returnReasonIfNotEqual?".size":false;if(firstIsArray){let index=0;for(const value of first){if(options.deep!==0){const result=equals(value,second[index],{...options,deep:options.deep-1});if(!result)return false;const currentIndex=index;const determineResult=result=>typeof result==="string"?`[${String(currentIndex)}]`+({"[":"",">":" "}[result[0]]??".")+result:result;if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return determineResult(result)}index+=1}}else if(firstIsMap){for(const[key,value]of first)if(options.deep!==0){const result=equals(value,second.get(key),{...options,deep:options.deep-1});if(!result)return false;const determineResult=result=>typeof result==="string"?`get(${represent(key)})`+({"[":"",">":" "}[result[0]]??".")+result:result;if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return determineResult(result)}}else if(firstIsSet){for(const value of first)if(options.deep!==0){let equal=false;const subPromises=[];/*
                            NOTE: Check if their exists at least one being
                            equally.
                        */for(const secondValue of second){const result=equals(value,secondValue,{...options,deep:options.deep-1});if(typeof result==="boolean"){if(result){equal=true;break}}else subPromises.push(result)}const determineResult=equal=>equal?true:options.returnReasonIfNotEqual?`>>> {-> ${represent(value)} not found}`:false;if(equal)/*
                                NOTE: We do not have to wait for promises to be
                                resolved when one match could be found.
                            */continue;if(subPromises.length)promises.push(new Promise(resolve=>{Promise.all(subPromises).then(results=>{resolve(determineResult(results.some(result=>result)))},()=>{// Do nothing.
})}));return determineResult(false)}}else for(const[key,value]of Object.entries(first)){if(options.properties&&!options.properties.includes(key))break;let doBreak=false;for(const exceptionPrefix of options.exceptionPrefixes)if(key.startsWith(exceptionPrefix)){doBreak=true;break}if(doBreak)break;if(options.deep!==0){const result=equals(value,second[key],{...options,deep:options.deep-1});if(!result)return false;const determineResult=result=>typeof result==="string"?key+({"[":"",">":" "}[result[0]]??".")+result:result;if(Object.prototype.hasOwnProperty.call(result,"then"))promises.push(result.then(determineResult));if(typeof result==="string")return determineResult(result)}}}if(promises.length)return new Promise(resolve=>{Promise.all(promises).then(results=>{for(const result of results)if(!result||typeof result==="string"){resolve(result);break}resolve(true)},()=>{// Do nothing.
})});return true}return options.returnReasonIfNotEqual?`>>> ${represent(firstValue)} !== ${represent(secondValue)}`:false};/**
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
 */const evaluateAsyncDynamicData=async(data,givenOptions={})=>{const options={scope:{},selfReferenceName:"self",expressionIndicatorKey:"__async_evaluate__",executionIndicatorKey:"__async_execute__",...givenOptions};if(!(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(data))return data;if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=data;const result=data;if(Array.isArray(data)){let index=0;for(const item of data){result[index]=await evaluateAsyncDynamicData(item,options);index+=1}return result}for(const[key,value]of Object.entries(data)){if([options.expressionIndicatorKey,options.executionIndicatorKey].includes(key))return await (0,_string_js__WEBPACK_IMPORTED_MODULE_5__/* .evaluateOrThrowError */ .VK)(value,{scope:options.scope,async:true,execute:key===options.executionIndicatorKey});result[key]=await evaluateAsyncDynamicData(value,options)}return result};/**
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
 */const evaluateDynamicData=(object,givenOptions={})=>{const options={scope:{},selfReferenceName:"self",expressionIndicatorKey:"__evaluate__",executionIndicatorKey:"__execute__",...givenOptions};if(typeof object!=="object"||object===null)return object;if(!(options.selfReferenceName in options.scope))options.scope[options.selfReferenceName]=object;const internalEvaluateAndThrowError=(code,type=options.expressionIndicatorKey)=>(0,_string_js__WEBPACK_IMPORTED_MODULE_5__/* .evaluateOrThrowError */ .VK)(code,{scope:options.scope,async:false,execute:type===options.executionIndicatorKey});const addProxyRecursively=data=>{if(typeof data!=="object"||data===null||typeof Proxy==="undefined")return data;for(const[key,givenValue]of Object.entries(data))if(key!=="__target__"&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(givenValue)){const value=givenValue;addProxyRecursively(value);// NOTE: We only wrap needed objects for performance reasons.
if(Object.prototype.hasOwnProperty.call(value,options.expressionIndicatorKey)||Object.prototype.hasOwnProperty.call(value,options.executionIndicatorKey)){const backup=value;data[key]=new Proxy(value,{get:(target,key)=>{if(key==="__target__")return target;if(key==="hasOwnProperty")/*
                                        eslint-disable
                                        @typescript-eslint/unbound-method
                                    */return target[key];/*
                                        eslint-enable
                                        @typescript-eslint/unbound-method
                                    *//*
                                    NOTE: Very complicated section, do only
                                    changes while having good tests.
                                */for(const type of[options.expressionIndicatorKey,options.executionIndicatorKey])if(key===type&&typeof target[key]==="string")return resolve(internalEvaluateAndThrowError(target[key],type));const resolvedTarget=resolve(target);if(key==="toString"){const result=internalEvaluateAndThrowError(resolvedTarget);return result[key].bind(result)}if(typeof key!=="string"){const result=internalEvaluateAndThrowError(resolvedTarget);if(result[key]?.bind)return result[key].bind(result);return result[key]}for(const type of[options.expressionIndicatorKey,options.executionIndicatorKey])if(Object.prototype.hasOwnProperty.call(target,type)){const result=internalEvaluateAndThrowError(target[type],type);/*
                                            NOTE: Resolving the whole
                                            evaluated result could re-enter
                                            the currently running evaluation
                                            (cyclic references between
                                            dynamic values) so only the
                                            accessed value gets resolved.
                                        */const value=resolve(result[key]);if(value?.bind)return value.bind(result);return value}return resolvedTarget[key];// End of complicated stuff.
},ownKeys:target=>{for(const type of[options.expressionIndicatorKey,options.executionIndicatorKey])if(Object.prototype.hasOwnProperty.call(target,type))return Object.getOwnPropertyNames(resolve(internalEvaluateAndThrowError(target[type],type)));return Object.getOwnPropertyNames(target)}});/*
                        NOTE: Known proxy polyfills does not provide the
                        "__target__" api.
                    */if(!data[key].__target__)data[key].__target__=backup}}return data};const resolve=data=>{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(data)){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isProxy */ .ju)(data)){// NOTE: We have to skip "ownKeys" proxy trap here.
for(const type of[options.expressionIndicatorKey,options.executionIndicatorKey])if(Object.prototype.hasOwnProperty.call(data,type))return data[type];data=data.__target__}for(const[key,value]of Object.entries(data)){if([options.expressionIndicatorKey,options.executionIndicatorKey].includes(key)){if(typeof Proxy==="undefined")return resolve(internalEvaluateAndThrowError(value));return value}data[key]=resolve(value)}}return data};options.scope.resolve=resolve;const removeProxyRecursively=data=>{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(data))for(const[key,value]of Object.entries(data))if(key!=="__target__"&&value!==null&&["function","undefined"].includes(typeof value)){const target=value.__target__;if(typeof target!=="undefined")data[key]=target;removeProxyRecursively(value)}return data};if(Object.prototype.hasOwnProperty.call(object,options.expressionIndicatorKey))return internalEvaluateAndThrowError(object[options.expressionIndicatorKey]);else if(Object.prototype.hasOwnProperty.call(object,options.executionIndicatorKey))return internalEvaluateAndThrowError(object[options.executionIndicatorKey],options.executionIndicatorKey);return removeProxyRecursively(resolve(addProxyRecursively(object)))};/**
 * Removes properties in objects where a dynamic indicator lives.
 * @param data - Object to traverse recursively.
 * @param expressionIndicators - Property key to remove.
 * @returns Given object with removed properties.
 */const removeKeysInEvaluation=(data,expressionIndicators=["__evaluate__","__execute__"])=>{for(const[key,value]of Object.entries(data))if(!expressionIndicators.includes(key)&&expressionIndicators.some(name=>Object.prototype.hasOwnProperty.call(data,name)))delete data[key];else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(value))removeKeysInEvaluation(value,expressionIndicators);return data};/**
 * Extends given target object with given sources object. As target and
 * sources many expandable types are allowed but target and sources have to
 * come from the same type.
 * @param targetOrDeepIndicator - Maybe the target or deep indicator.
 * @param targetOrSource - Target or source object; depending on first
 * argument.
 * @param additionalSources - Source objects to extend into target.
 * @returns Returns given target extended with all given sources.
 */const extend=(targetOrDeepIndicator,targetOrSource,...additionalSources)=>{let deep=false;let sources=additionalSources;let target;if(targetOrDeepIndicator===_constants_js__WEBPACK_IMPORTED_MODULE_2__/* .IGNORE_NULL_AND_UNDEFINED_SYMBOL */ .p_||typeof targetOrDeepIndicator==="boolean"){// Handle a deep copy situation and skip deep indicator and target.
deep=targetOrDeepIndicator;target=targetOrSource}else{target=targetOrDeepIndicator;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(targetOrSource))sources=[targetOrSource,...sources];else if(targetOrSource!==undefined)target=targetOrSource}const mergeValue=(targetValue,value)=>{if(value===targetValue)return targetValue;// Traverse recursively if we're merging plain objects or maps.
if(deep&&value&&((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(value)||(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(value))){let clone;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(value))clone=targetValue&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(targetValue)?targetValue:new Map;else clone=targetValue&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(targetValue)?targetValue:{};return extend(deep,clone,value)}return value};for(const source of sources){let targetType=typeof target;let sourceType=typeof source;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(target))targetType+=" Map";if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(source))sourceType+=" Map";if(targetType===sourceType&&target!==source){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(target)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(source))for(const[key,value]of source)target.set(key,mergeValue(target.get(key),value));else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(target)&&!Array.isArray(target)&&!(typeof Blob!=="undefined"&&target instanceof Blob)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(source)&&!Array.isArray(source)&&!(typeof Blob!=="undefined"&&source instanceof Blob)){for(const[key,value]of Object.entries(source))if(!(deep===_constants_js__WEBPACK_IMPORTED_MODULE_2__/* .IGNORE_NULL_AND_UNDEFINED_SYMBOL */ .p_&&[null,undefined].includes(value)))target[key]=mergeValue(target[key],value)}else target=source;}else target=source}return target};/**
 * Generates a proxy handler which forwards all operations to given object
 * as there wouldn't be a proxy.
 * @param target - Object to proxy.
 * @param methodNames - Mapping of operand name to object specific method
 * name.
 * @returns Determined proxy handler.
 */const getProxyHandler=(target,methodNames={})=>{methodNames={delete:"[]",get:"[]",has:"[]",set:"[]",...methodNames};return{deleteProperty:(_targetObject,key)=>{if(methodNames.delete==="[]"&&typeof key==="string")delete target[key];else return target[methodNames.delete](key);return true},get:(_targetObject,key)=>{if(methodNames.get==="[]"&&typeof key==="string")return target[key];return target[methodNames.get](key)},has:(_targetObject,key)=>{if(methodNames.has==="[]")return key in target;return target[methodNames.has](key)},set:(_targetObject,key,value)=>{if(methodNames.set==="[]"&&typeof key==="string")target[key]=value;else return target[methodNames.set](key,value);return true}}};/**
 * Slices all properties from given object which does not match provided
 * object mask. Items can be explicitly whitelisted via "include" mask
 * configuration or black listed via "exclude" mask configuration.
 * @param object - Object to slice.
 * @param maskConfiguration - Mask configuration.
 * @returns Given but sliced object. If (nested) object will be modified a
 * flat copy of that object will be returned.
 */const mask=(object,maskConfiguration)=>{maskConfiguration={exclude:false,include:true,...maskConfiguration};if(maskConfiguration.exclude===true||Array.isArray(maskConfiguration.exclude)&&maskConfiguration.exclude.length===0||maskConfiguration.include===false||typeof object!=="object")return{};const exclude=Array.isArray(maskConfiguration.exclude)?maskConfiguration.exclude.reduce((mask,key)=>({...mask,[key]:true}),{}):maskConfiguration.exclude;const include=Array.isArray(maskConfiguration.include)?maskConfiguration.include.reduce((mask,key)=>({...mask,[key]:true}),{}):maskConfiguration.include;let result={};if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(include)){for(const[key,value]of Object.entries(include))if(Object.prototype.hasOwnProperty.call(object,key))if(value===true)result[key]=object[key];else if(((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(value)||Array.isArray(value)&&value.length)&&typeof object[key]==="object")result[key]=mask(object[key],{include:value})}else// In this branch "mask.include === true" holds.
result=object;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(exclude)){let useCopy=false;const copy={...result};for(const[key,value]of Object.entries(exclude))if(Object.prototype.hasOwnProperty.call(copy,key))if(value===true){useCopy=true;delete copy[key]}else if(((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(value)||Array.isArray(value)&&value.length)&&typeof copy[key]==="object"){const current=copy[key];copy[key]=mask(copy[key],{exclude:value});if(copy[key]!==current)useCopy=true}if(useCopy)result=copy}return result};/**
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
 */const modifyObject=(target,source,removeIndicatorKey="__remove__",prependIndicatorKey="__prepend__",appendIndicatorKey="__append__",positionPrefix="__",positionSuffix="__",parentSource=null,parentKey=null)=>{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(source)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(target)){for(const[key,value]of source)if(target.has(key))modifyObject(target.get(key),value,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,key)}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(source)&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(target))for(const[key,sourceValue]of Object.entries(source)){let index=NaN;if(Array.isArray(target)&&key.startsWith(positionPrefix)&&key.endsWith(positionSuffix)){index=parseInt(key.substring(positionPrefix.length,key.length-positionSuffix.length),10);if(index<0||index>=target.length)index=NaN}if([removeIndicatorKey,prependIndicatorKey,appendIndicatorKey].includes(key)||!isNaN(index)){if(Array.isArray(target)){if(key===removeIndicatorKey){const values=[].concat(sourceValue);for(const value of values)if(typeof value==="string"&&value.startsWith(positionPrefix)&&value.endsWith(positionSuffix))target.splice(parseInt(value.substring(positionPrefix.length,value.length-positionSuffix.length),10),1);else if(target.includes(value))target.splice(target.indexOf(value),1);else if(typeof value==="number"&&value<target.length)target.splice(value,1)}else if(key===appendIndicatorKey)target=target.concat(sourceValue);else if(key===prependIndicatorKey)target=[].concat(sourceValue).concat(target);else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(target[index])&&(0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(sourceValue))extend(true,modifyObject(target[index],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix),target[index],sourceValue);else target[index]=sourceValue;}else if(key===removeIndicatorKey)for(const value of[].concat(sourceValue))if(typeof value==="string"&&Object.prototype.hasOwnProperty.call(target,value))delete target[value];delete source[key];if(parentSource&&typeof parentKey==="string")delete parentSource[parentKey]}else if(target!==null&&Object.prototype.hasOwnProperty.call(target,key))target[key]=modifyObject(target[key],sourceValue,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,key)}return target};/**
 * Removes given key from given object recursively.
 * @param object - Object to process.
 * @param keys - List of keys to remove.
 * @returns Processed given object.
 */const removeKeyPrefixes=(object,keys="#")=>{const resolvedKeys=[].concat(keys);if(Array.isArray(object)){let index=0;for(const subObject of object.slice()){let skip=false;if(typeof subObject==="string"){for(const key of resolvedKeys)if(subObject.startsWith(`${key}:`)){object.splice(index,1);skip=true;break}if(skip)continue}object[index]=removeKeyPrefixes(subObject,resolvedKeys);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object))for(const subObject of new Set(object)){let skip=false;if(typeof subObject==="string"){for(const key of resolvedKeys)if(subObject.startsWith(`${key}:`)){object.delete(subObject);skip=true;break}if(skip)continue}removeKeyPrefixes(subObject,resolvedKeys)}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object))for(const[key,subObject]of new Map(object)){let skip=false;if(typeof key==="string"){for(const resolvedKey of resolvedKeys){const escapedKey=(0,_string_js__WEBPACK_IMPORTED_MODULE_5__/* .escapeRegularExpressions */ .jt)(resolvedKey);if(new RegExp(`^${escapedKey}[0-9]*$`).test(key)){object.delete(key);skip=true;break}}if(skip)continue}object.set(key,removeKeyPrefixes(subObject,resolvedKeys))}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(object))for(const[key,value]of Object.entries(Object.assign({},object))){let skip=false;for(const resolvedKey of resolvedKeys){const escapedKey=(0,_string_js__WEBPACK_IMPORTED_MODULE_5__/* .escapeRegularExpressions */ .jt)(resolvedKey);if(new RegExp(`^${escapedKey}[0-9]*$`).test(key)){delete object[key];skip=true;break}}if(skip)continue;object[key]=removeKeyPrefixes(value,resolvedKeys)}return object};/**
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
 */const represent=(object,maximumLengthOfLists=30,indention="    ",initialIndention="",maximumNumberOfLevelsReachedIdentifier="__maximum_number_of_levels_reached__",numberOfLevels=8)=>{if(numberOfLevels===0)return String(maximumNumberOfLevelsReachedIdentifier);if(object===null)return"null";if(object===undefined)return"undefined";if(typeof object==="string")return`"${object.replace(/\n/g,`\n${initialIndention}`)}"`;if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isNumeric */ .kf)(object)||typeof object==="boolean")return String(object);if(object instanceof Date)return object.toISOString();if(Array.isArray(object)){let result="[";let firstSeen=false;let counter=1;for(const item of object){if(counter>maximumLengthOfLists){result+=`\n${initialIndention}...`;break}if(firstSeen)result+=",";result+=`\n${initialIndention}${indention}`+represent(item,maximumLengthOfLists,indention,`${initialIndention}${indention}`,maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);firstSeen=true;counter+=1}if(firstSeen)result+=`\n${initialIndention}`;result+="]";return result}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object)){let result="";let firstSeen=false;let counter=1;for(const[key,item]of object){if(counter>maximumLengthOfLists){result+=`,\n${initialIndention}...`;break}if(firstSeen)result+=`,\n${initialIndention}${indention}`;result+=represent(key,maximumLengthOfLists,indention,`${initialIndention}${indention}`,maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1)+" -> "+represent(item,maximumLengthOfLists,indention,`${initialIndention}${indention}`,maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);firstSeen=true;counter+=1}if(!firstSeen)result="EmptyMap";return result}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object)){let result="{";let firstSeen=false;let counter=1;for(const item of object){if(counter>maximumLengthOfLists){result+=`,\n${initialIndention}...`;break}if(firstSeen)result+=",";result+=`\n${initialIndention}${indention}`+represent(item,maximumLengthOfLists,indention,`${initialIndention}${indention}`,maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);firstSeen=true;counter+=1}if(firstSeen)result+=`\n${initialIndention}}`;else result="EmptySet";return result}if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn)(object))return"__function__";let result="{";const keys=Object.getOwnPropertyNames(object).sort();let firstSeen=false;let counter=1;for(const key of keys){if(counter>maximumLengthOfLists){result+=`,\n${initialIndention}...`;break}if(firstSeen)result+=",";result+=`\n${initialIndention}${indention}${key}: `+represent(object[key],maximumLengthOfLists,indention,`${initialIndention}${indention}`,maximumNumberOfLevelsReachedIdentifier,numberOfLevels-1);firstSeen=true;counter+=1}if(firstSeen)result+=`\n${initialIndention}`;result+="}";return result};/**
 * Sort given objects keys.
 * @param object - Object which keys should be sorted.
 * @returns Sorted list of given keys.
 */const sort=object=>{const keys=[];if(Array.isArray(object))for(let index=0;index<object.length;index++)keys.push(index);else if(typeof object==="object")if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object))for(const keyValuePair of object)keys.push(keyValuePair[0]);else if(object!==null)for(const key of Object.keys(object))keys.push(key);return keys.sort()};/**
 * Removes a proxy from given data structure recursively.
 * @param object - Object to proxy.
 * @param seenObjects - Tracks all already processed objects to avoid
 * endless loops (usually only needed for internal purpose).
 * @returns Returns given object unwrapped from a dynamic proxy.
 */const unwrapProxy=(object,seenObjects=new Set)=>{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv)(object)){if(seenObjects.has(object))return object;try{if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn)(object.__revoke__)){if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isProxy */ .ju)(object))object=object.__target__;object.__revoke__()}}catch{return object}finally{seenObjects.add(object)}if(Array.isArray(object)){let index=0;for(const value of object){object[index]=unwrapProxy(value,seenObjects);index+=1}}else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh)(object))for(const[key,value]of object)object.set(key,unwrapProxy(value,seenObjects));else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM)(object)){const cache=[];for(const value of object){object.delete(value);cache.push(unwrapProxy(value,seenObjects))}for(const value of cache)object.add(value)}else for(const[key,value]of Object.entries(object))object[key]=unwrapProxy(value,seenObjects)}return object};

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports CLOSE_EVENT_NAMES, ANIMATION_END_EVENT_NAMES, KEY_CODES, KEYBOARD_CODES, TRANSITION_END_EVENT_NAMES */
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
*/const CLI_COLOR={black:"[30m",blink:"[5m",blue:"[0;34m",bold:"[1m",cyan:"[36m",darkGray:"[0;90m",default:"[0m",dim:"[2m",green:"[32m",invert:"[7m",invisible:"[8m",lightBlue:"[0;94m",lightCyan:"[0;96m",lightGray:"[0;37m",lightGreen:"[0;92m",lightMagenta:"[0;95m",lightRed:"[0;91m",lightYellow:"[0;93m",magenta:"[35m",nodim:"[22m",noblink:"[25m",nobold:"[21m",noinvert:"[27m",noinvisible:"[28m",nounderline:"[24m",red:"[31m",underline:"[4m",white:"[37m",yellow:"[33m"};const DEFAULT_ENCODING="utf8";const CLOSE_EVENT_NAMES=(/* unused pure expression or super */ null && (["close","exit","SIGINT","SIGTERM","SIGQUIT","uncaughtException"]));const CONSOLE_METHODS=["debug","error","info","log","warn"];const VALUE_COPY_SYMBOL=Symbol.for("clientnodeValue");const IGNORE_NULL_AND_UNDEFINED_SYMBOL=Symbol.for("clientnodeIgnoreNullAndUndefined");// Lists all known abbreviation for proper camel case to delimited and back
// conversion.
const ABBREVIATIONS=["html","id","url","us","de","api","href"];// Saves a string with all css3 browser specific animation end event names.
const ANIMATION_END_EVENT_NAMES="animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";// String representation to object type name mapping.
const CLASS_TO_TYPE_MAPPING={"[object Array]":"array","[object Boolean]":"boolean","[object Date]":"date","[object Error]":"error","[object Function]":"function","[object Map]":"map","[object Number]":"number","[object Object]":"object","[object RegExp]":"regexp","[object Set]":"set","[object String]":"string"};// Saves a mapping from key codes to their corresponding name.
const KEY_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:8,SPACE:32,TAB:9,DELETE:46,ENTER:13,COMMA:188,PERIOD:190,END:35,ESCAPE:27,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,HOME:36,NUMPAD_ADD:107,NUMPAD_SUBTRACT:109,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,PAGE_UP:33,PAGE_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39}));const KEYBOARD_CODES=(/* unused pure expression or super */ null && ({BACKSPACE:"Backspace",SPACE:"Space",TAB:"Tab",DELETE:"Delete",ENTER:"Enter",COMMA:"Comma",PERIOD:"Period",END:"End",ESCAPE:"Escape",F1:"F1",F2:"F2",F3:"F3",F4:"F4",F5:"F5",F6:"F6",F7:"F7",F8:"F8",F9:"F9",F10:"F10",F11:"F111",F12:"F12",HOME:"Home",NUMPAD_ADD:"NumpadAdd",NUMPAD_SUBTRACT:"NumpadSubtract",NUMPAD_DECIMAL:"NumpadDecimal",NUMPAD_DIVIDE:"NumpadDivide",NUMPAD_ENTER:"NumpadEnter",NUMPAD_MULTIPLY:"NumpadMultiply",PAGE_UP:"PageUp",PAGE_DOWN:"PageUp",UP:"ArrowUp",DOWN:"ArrowDown",LEFT:"ArrowLeft",RIGHT:"ArrowUp"}));const LOCALES=[];const PLAIN_OBJECT_PROTOTYPES=[Object.prototype];// A list of special regular expression symbols.
const SPECIAL_REGEX_SEQUENCES=["-","[","]","(",")","^","$","*","+",".","{","}"];// Saves a string with all css3 browser specific transition end event names.
const TRANSITION_END_EVENT_NAMES="transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "FI", 0, /* binding */ SPECIAL_REGEX_SEQUENCES,
/* harmony export */   "Fp", 0, /* binding */ VALUE_COPY_SYMBOL,
/* harmony export */   "Iy", 0, /* binding */ ABBREVIATIONS,
/* harmony export */   "YZ", 0, /* binding */ LOCALES,
/* harmony export */   "jE", 0, /* binding */ PLAIN_OBJECT_PROTOTYPES,
/* harmony export */   "jg", 0, /* binding */ CONSOLE_METHODS,
/* harmony export */   "l_", 0, /* binding */ CLI_COLOR,
/* harmony export */   "p_", 0, /* binding */ IGNORE_NULL_AND_UNDEFINED_SYMBOL,
/* harmony export */   "rq", 0, /* binding */ CLASS_TO_TYPE_MAPPING
/* harmony export */ ]);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports TEST_UNDEFINED_SYMBOL, expectExpectedType, testEachAgainstResolvedPromise, testEachResolvedPromiseAgainstResolvedPromise, testEachRejectedPromise, testEachRejectedPromiseAgainstResolvedPromise, testEachResolvedPromiseWithSingleParameterAgainstSameExpectation, testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise, testEachRejectedPromiseWithSingleParameterAgainstSameExpectation, testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise, testEachResolvedPromiseAgainstSameResolvedPromise, testEachRejectedPromiseAgainstSameResolvedPromise */
/* unused harmony import specifier */ var test;
/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
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
// endregion
const TEST_DEFINED_SYMBOL=Symbol.for("clientnodeTestHelperDefined");const TEST_THROW_SYMBOL=Symbol.for("clientnodeTestHelperThrow");const TEST_UNDEFINED_SYMBOL=Symbol.for("clientnodeTestHelperUndefined");/**
 * Tests given result against given expectations. Respects special symbol
 * values.
 * @param givenResult - Target to compare expectation against.
 * @param expected - Expected result.
 * @param wrap - Indicates whether to wrap with an expect function call.
 * @returns Nothing or a promise resolving to nothing.
 */const expectExpectedType=(givenResult,expected,wrap=true)=>{const result=wrap?(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(givenResult):givenResult;if(expected===TEST_DEFINED_SYMBOL)return result.toBeDefined();if(expected===TEST_UNDEFINED_SYMBOL)return result.not.toBeDefined();if(expected===TEST_THROW_SYMBOL)return result.toThrow();return result.toStrictEqual(expected)};// region testEach
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const _testEach=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,(expected,...parameters)=>{expectExpectedType(callback(...parameters),expected)})};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEach=(functionName,callback,...functionTestTuple)=>{_testEach(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,...functionTestTuple)};testEach.only=(functionName,callback,...functionTestTuple)=>{_testEach(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEach.skip=(functionName,callback,...functionTestTuple)=>{_testEach(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachAgainstResolvedPromise=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,async(expected,...parameters)=>{expectExpectedType(callback(...parameters),await expected)})};/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEachAgainstResolvedPromise=(functionName,callback,...functionTestTuple)=>{_testEachAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,...functionTestTuple)};testEachAgainstResolvedPromise.only=(functionName,callback,...functionTestTuple)=>{_testEachAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEachAgainstResolvedPromise.skip=(functionName,callback,...functionTestTuple)=>{_testEachAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachResolvedPromise=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,(expected,...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).resolves,expected,false))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEachResolvedPromise=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,...functionTestTuple)};testEachResolvedPromise.only=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEachResolvedPromise.skip=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachResolvedPromiseAgainstResolvedPromise=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,async(expected,...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).resolves,await expected,false))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEachResolvedPromiseAgainstResolvedPromise=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromiseAgainstResolvedPromise(test.each,functionName,callback,...functionTestTuple)};testEachResolvedPromise.only=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromiseAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEachResolvedPromise.skip=(functionName,callback,...functionTestTuple)=>{_testEachResolvedPromiseAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachRejectedPromise=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,(expected,...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).rejects,expected,false))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEachRejectedPromise=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,...functionTestTuple)};testEachRejectedPromise.only=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEachRejectedPromise.skip=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachRejectedPromiseAgainstResolvedPromise=(tester,functionName,callback,...functionTestTuple)=>{tester([...functionTestTuple])(`%p === ${functionName}(%p, ...)`,async(expected,...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).rejects,await expected,false))};/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */const testEachRejectedPromiseAgainstResolvedPromise=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromiseAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,...functionTestTuple)};testEachRejectedPromiseAgainstResolvedPromise.only=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromiseAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,...functionTestTuple)};testEachRejectedPromiseAgainstResolvedPromise.skip=(functionName,callback,...functionTestTuple)=>{_testEachRejectedPromiseAgainstResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,...functionTestTuple)};// endregion
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
 */const _testEachSingleParameterAgainstSameExpectation=(tester,functionName,callback,expected,...parameters)=>{tester([...parameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p)`,parameter=>{expectExpectedType(expected===TEST_THROW_SYMBOL?()=>callback(parameter):callback(parameter),expected)})};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */const testEachSingleParameterAgainstSameExpectation=(functionName,callback,expected,...parameters)=>{_testEachSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...parameters)};testEachSingleParameterAgainstSameExpectation.only=(functionName,callback,expected,...parameters)=>{_testEachSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...parameters)};testEachSingleParameterAgainstSameExpectation.skip=(functionName,callback,expected,...parameters)=>{_testEachSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...parameters)};// endregion
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
 */const _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation=(tester,functionName,callback,expected,...parameters)=>{tester([...parameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p)`,parameter=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(parameter)).resolves,expected,false))};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */const testEachResolvedPromiseWithSingleParameterAgainstSameExpectation=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...parameters)};testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.only=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...parameters)};testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.skip=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...parameters)};// endregion
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
 */const _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise=(tester,functionName,callback,expected,...parameters)=>{tester([...parameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p)`,async parameter=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(parameter)).resolves,await expected,false))};/**
 * Tests each given single parameter against same given promises resolving to
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */const testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...parameters)};testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.only=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...parameters)};testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.skip=(functionName,callback,expected,...parameters)=>{_testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...parameters)};// endregion
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
 */const _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation=(tester,functionName,callback,expected,...parameters)=>{tester([...parameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p)`,parameter=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(parameter)).rejects,expected,false))};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */const testEachRejectedPromiseWithSingleParameterAgainstSameExpectation=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...parameters)};testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.only=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...parameters)};testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.skip=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...parameters)};// endregion
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
 */const _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise=(tester,functionName,callback,expected,...parameters)=>{tester([...parameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p)`,async parameter=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(parameter)).rejects,await expected,false))};/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */const testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...parameters)};testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.only=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...parameters)};testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.skip=(functionName,callback,expected,...parameters)=>{_testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...parameters)};// endregion
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
 */const _testEachAgainstSameExpectation=(tester,functionName,callback,expected,...functionParameters)=>{tester([...functionParameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p, ...)`,(...parameters)=>{expectExpectedType(expected===TEST_THROW_SYMBOL?()=>callback(...parameters):callback(...parameters),expected)})};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */const testEachAgainstSameExpectation=(functionName,callback,expected,...functionParameters)=>{_testEachAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...functionParameters)};testEachAgainstSameExpectation.only=(functionName,callback,expected,...functionParameters)=>{_testEachAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...functionParameters)};testEachAgainstSameExpectation.skip=(functionName,callback,expected,...functionParameters)=>{_testEachAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...functionParameters)};// endregion
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
 */const _testEachResolvedPromiseAgainstSameExpectation=(tester,functionName,callback,expected,...functionParameters)=>{tester([...functionParameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p, ...)`,(...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).resolves,expected,false))};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */const testEachResolvedPromiseAgainstSameExpectation=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...functionParameters)};testEachResolvedPromiseAgainstSameExpectation.only=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...functionParameters)};testEachResolvedPromiseAgainstSameExpectation.skip=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...functionParameters)};// endregion
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
 */const _testEachResolvedPromiseAgainstSameResolvedPromise=(tester,functionName,callback,expected,...functionParameters)=>{tester([...functionParameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p, ...)`,async(...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).resolves,await expected,false))};/**
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
 */const testEachResolvedPromiseAgainstSameResolvedPromise=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...functionParameters)};testEachResolvedPromiseAgainstSameResolvedPromise.only=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...functionParameters)};testEachResolvedPromiseAgainstSameResolvedPromise.skip=(functionName,callback,expected,...functionParameters)=>{_testEachResolvedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...functionParameters)};// endregion
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
 */const _testEachRejectedPromiseAgainstSameExpectation=(tester,functionName,callback,expected,...functionParameters)=>{tester([...functionParameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p, ...)`,(...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).rejects,expected,false))};/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */const testEachRejectedPromiseAgainstSameExpectation=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...functionParameters)};testEachRejectedPromiseAgainstSameExpectation.only=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...functionParameters)};testEachRejectedPromiseAgainstSameExpectation.skip=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameExpectation(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...functionParameters)};// endregion
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
 */const _testEachRejectedPromiseAgainstSameResolvedPromise=(tester,functionName,callback,expected,...functionParameters)=>{tester([...functionParameters])(`${(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .represent */ .Do)(expected)} === ${functionName}(%p, ...)`,async(...parameters)=>expectExpectedType((0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback(...parameters)).rejects,await expected,false))};/**
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
 */const testEachRejectedPromiseAgainstSameResolvedPromise=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each,functionName,callback,expected,...functionParameters)};testEachRejectedPromiseAgainstSameResolvedPromise.only=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.only.each,functionName,callback,expected,...functionParameters)};testEachRejectedPromiseAgainstSameResolvedPromise.skip=(functionName,callback,expected,...functionParameters)=>{_testEachRejectedPromiseAgainstSameResolvedPromise(_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip.each,functionName,callback,expected,...functionParameters)};// endregion
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (testEach)));
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "FQ", 0, /* binding */ testEachResolvedPromise,
/* harmony export */   "NO", 0, /* binding */ testEachAgainstSameExpectation,
/* harmony export */   "_Z", 0, /* binding */ testEachSingleParameterAgainstSameExpectation,
/* harmony export */   "ar", 0, /* binding */ testEachRejectedPromiseAgainstSameExpectation,
/* harmony export */   "oN", 0, /* binding */ testEach,
/* harmony export */   "pN", 0, /* binding */ TEST_THROW_SYMBOL,
/* harmony export */   "sl", 0, /* binding */ testEachResolvedPromiseAgainstSameExpectation,
/* harmony export */   "u0", 0, /* binding */ TEST_DEFINED_SYMBOL
/* harmony export */ ]);


/***/ }),
/* 7 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I5: () => (/* binding */ optionalRequire),
/* harmony export */   Ni: () => (/* binding */ clearRequireCache),
/* harmony export */   SD: () => (/* binding */ setOptionalRequire),
/* harmony export */   Sw: () => (/* binding */ optionalImport),
/* harmony export */   a8: () => (/* binding */ determineGlobalContext),
/* harmony export */   lE: () => (/* binding */ currentRequire),
/* harmony export */   xN: () => (/* binding */ isImportSyntaxSupported),
/* harmony export */   zM: () => (/* binding */ getCurrentRequire)
/* harmony export */ });
/* unused harmony export isolatedRequire */
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
*/const determineGlobalContext=()=>{if(typeof globalThis==="undefined"){if(typeof window==="undefined"){if(typeof __webpack_require__.g==="undefined")return  false?0:module;if(Object.prototype.hasOwnProperty.call(__webpack_require__.g,"window"))return __webpack_require__.g.window;return __webpack_require__.g}return window}return globalThis};const globalContext=determineGlobalContext();let currentRequire=typeof globalContext.require==="undefined"?null:globalContext.require;let optionalRequire;const setOptionalRequire=localCurrentRequire=>{optionalRequire=id=>{try{return localCurrentRequire?localCurrentRequire(id):null}catch{return null}}};setOptionalRequire(currentRequire);const clearRequireCache=(cache=currentRequire?.cache||__webpack_require__.c)=>{const backup={};for(const[key,module]of Object.entries(cache)){backup[key]=module;delete cache[key]}return backup};// Make preprocessed require function available at runtime.
const getCurrentRequire=async()=>{if(currentRequire)return currentRequire;try{const{createRequire}=await import(/* webpackIgnore: true */"node:module");currentRequire=createRequire(import.meta.url);setOptionalRequire(currentRequire);return currentRequire}catch(error){console.error(error);return null}};const isImportSyntaxSupported=()=>{try{// eslint-disable-next-line @typescript-eslint/no-implied-eval
new Function("import(\"data:text/javascript,\")");return true}catch{return false}};const isolatedRequire=(path,requireFunction=currentRequire||__webpack_require__(20))=>{const backup=clearRequireCache(requireFunction.cache);try{return requireFunction(path);// eslint-disable-next-line no-useless-catch
}catch(error){throw error}finally{restoreRequireCache(requireFunction.cache,backup)}};const optionalImport=async(id,options={})=>{try{/*
            NOTE: Avoid compiling the import expression at runtime (e.g. via
            "new Function"): Sandboxes like jest's vm modules bind such
            imports to the first context which compiled the surrounding
            module, so they fail in all subsequently created contexts.
            The magic comment avoids bundling given request.
        */return isImportSyntaxSupported()?await import(/* webpackIgnore: true */id,options):await Promise.resolve(null)}catch/* (error)*/{// NOTE: Use for debugging only:
// console.error('OptionalImport failed for', id, error)
return await Promise.resolve(null)}};const restoreRequireCache=(cache=currentRequire?.cache||__webpack_require__.c,backup)=>{clearRequireCache();for(const[key,module]of Object.entries(backup))cache[key]=module};

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module utility *//* !
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
 * Prevents event functions from triggering too close after each trigger by
 * defining a minimal span between each function call. Additional arguments
 * given to this function will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */const debounce=(callback,thresholdInMilliseconds=600,...additionalArguments)=>{let timeoutPromise;let nextResultPromiseResolver;let nextResultPromise=new Promise(resolve=>{nextResultPromiseResolver=resolve});return(...parameters)=>{parameters=parameters.concat(additionalArguments);timeoutPromise?.clear();timeoutPromise=timeout(()=>{nextResultPromiseResolver(callback(...parameters));nextResultPromise=new Promise(resolve=>{nextResultPromiseResolver=resolve})},thresholdInMilliseconds);return nextResultPromise}};/**
 * Prevents event functions from triggering too often by defining a minimal
 * span between each function call. Additional arguments given to this function
 * will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */const trailingThrottle=(callback,thresholdInMilliseconds=600,...additionalArguments)=>{let timeoutID=null;let recentParameters=[];return(...parameters)=>{recentParameters=parameters;if(timeoutID)return;timeoutID=setTimeout(()=>{callback(...recentParameters,...additionalArguments);// Reset for next cycle.
timeoutID=null;recentParameters=[]},thresholdInMilliseconds)}};const preventDefault=event=>{event.preventDefault()};const stopPropagation=event=>{event.stopPropagation()};/**
 * Triggers given callback after given duration. Supports unlimited
 * duration length and returns a promise which will be resolved after given
 * duration has been passed.
 * @param parameters - Observes the first three existing parameters. If one
 * is a number it will be interpreted as delay in milliseconds until given
 * callback will be triggered. If one is of type function it will be used
 * as callback and if one is of type boolean it will indicate if returning
 * promise should be rejected or resolved if given internally created
 * timeout should be canceled. Additional parameters will be forwarded to
 * given callback.
 * @returns A promise resolving after given delay or being rejected if
 * value "true" is within one of the first three parameters. The promise
 * holds a boolean indicating whether timeout has been canceled or
 * resolved.
 */const timeout=(...parameters)=>{let callback=_context_js__WEBPACK_IMPORTED_MODULE_0__/* .NOOP */ .tE;let delayInMilliseconds=0;let throwOnTimeoutClear=false;for(const value of parameters)if(typeof value==="number"&&!isNaN(value))delayInMilliseconds=value;else if(typeof value==="boolean")throwOnTimeoutClear=value;else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_1__/* .isFunction */ .Tn)(value))callback=value;let rejectCallback;let resolveCallback;const result=new Promise((resolve,reject)=>{rejectCallback=reject;resolveCallback=resolve});const wrappedCallback=()=>{callback.call(result,...parameters);resolveCallback(false)};const maximumTimeoutDelayInMilliseconds=2147483647;if(delayInMilliseconds<=maximumTimeoutDelayInMilliseconds)result.timeoutID=setTimeout(wrappedCallback,delayInMilliseconds);else{/*
            Determine the number of times we need to delay by maximum
            possible timeout duration.
        */let numberOfRemainingTimeouts=Math.floor(delayInMilliseconds/maximumTimeoutDelayInMilliseconds);const finalTimeoutDuration=delayInMilliseconds%maximumTimeoutDelayInMilliseconds;const delay=()=>{if(numberOfRemainingTimeouts>0){numberOfRemainingTimeouts-=1;result.timeoutID=setTimeout(delay,maximumTimeoutDelayInMilliseconds)}else result.timeoutID=setTimeout(wrappedCallback,finalTimeoutDuration)};delay()}result.clear=()=>{if(Object.prototype.hasOwnProperty.call(result,"timeoutID")){clearTimeout(result.timeoutID);(throwOnTimeoutClear?rejectCallback:resolveCallback)(true)}};return result};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "dG", 0, /* binding */ stopPropagation,
/* harmony export */   "p0", 0, /* binding */ trailingThrottle,
/* harmony export */   "sg", 0, /* binding */ debounce,
/* harmony export */   "wR", 0, /* binding */ timeout,
/* harmony export */   "wo", 0, /* binding */ preventDefault
/* harmony export */ ]);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AB: () => (/* binding */ limit),
/* harmony export */   GP: () => (/* binding */ format),
/* harmony export */   Gy: () => (/* binding */ mark),
/* harmony export */   K$: () => (/* binding */ normalizeZipCode),
/* harmony export */   KC: () => (/* binding */ representPhoneNumber),
/* harmony export */   LK: () => (/* binding */ getURLParameter),
/* harmony export */   Lt: () => (/* binding */ decodeHTMLEntities),
/* harmony export */   RS: () => (/* binding */ normalizeDomNodeSelector),
/* harmony export */   Tx: () => (/* binding */ findNormalizedMatchRange),
/* harmony export */   U7: () => (/* binding */ sliceAllExceptNumberAndLastSeparator),
/* harmony export */   Ud: () => (/* binding */ POLYFILL_TEMPLATE_STRINGS),
/* harmony export */   Un: () => (/* binding */ getEditDistance),
/* harmony export */   V5: () => (/* binding */ encodeURIComponentExtended),
/* harmony export */   VK: () => (/* binding */ evaluateOrThrowError),
/* harmony export */   VU: () => (/* binding */ getPortNumber),
/* harmony export */   W5: () => (/* binding */ maskForRegularExpression),
/* harmony export */   Wq: () => (/* binding */ getDomainName),
/* harmony export */   XD: () => (/* binding */ delimitedToCamelCase),
/* harmony export */   Yn: () => (/* binding */ hasPathPrefix),
/* harmony export */   ZH: () => (/* binding */ capitalize),
/* harmony export */   _3: () => (/* binding */ evaluate),
/* harmony export */   _4: () => (/* binding */ serviceURLEquals),
/* harmony export */   a$: () => (/* binding */ convertToValidVariableName),
/* harmony export */   dc: () => (/* binding */ normalizeURL),
/* harmony export */   gB: () => (/* binding */ getProtocolName),
/* harmony export */   gQ: () => (/* binding */ lowerCase),
/* harmony export */   h1: () => (/* binding */ camelCaseToDelimited),
/* harmony export */   h2: () => (/* binding */ normalizePhoneNumber),
/* harmony export */   jL: () => (/* binding */ parseEncodedObject),
/* harmony export */   jt: () => (/* binding */ escapeRegularExpressions),
/* harmony export */   oz: () => (/* binding */ representURL),
/* harmony export */   p0: () => (/* binding */ addSeparatorToPath),
/* harmony export */   pM: () => (/* binding */ fixKnownEncodingErrors),
/* harmony export */   v0: () => (/* binding */ compressStyleValue),
/* harmony export */   wE: () => (/* binding */ compile)
/* harmony export */ });
/* unused harmony exports KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS, ALLOWED_VARIABLE_SYMBOLS, ALLOWED_STARTING_VARIABLE_SYMBOLS, FIX_ENCODING_ERROR_MAPPING, AsyncFunction */
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _filesystem_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4);
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
// endregion
const KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS=["default","if","for","class","function","return","const","let","var"];const POLYFILL_TEMPLATE_STRINGS={value:false};// Partial regular expression matching symbols which should be allowed within a
// variable name excluding the first character.
const ALLOWED_VARIABLE_SYMBOLS="0-9a-zA-Z_$";// Partial regular expression matching symbols which should be allowed as
// starting character for a variable name.
const ALLOWED_STARTING_VARIABLE_SYMBOLS="a-zA-Z_$";const FIX_ENCODING_ERROR_MAPPING=[["Ã\\x84","Ä"],["Ã\\x96","Ö"],["Ã\\x9c","Ü"],["Ã¤","ä"],["Ã¶","ö"],["Ã¼","ü"],["\\x96","-"],["Ã©","é"],["Ã¨","e"],["Ã´","o"],["Ã ","á"],["Ã¸","ø"],["Ã\\x9f","ß"],["Ã","ß"]];const AsyncFunction=/*
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
 */const addSeparatorToPath=(path,pathSeparator="/")=>{path=path.trim();if(path.substring(path.length-1)!==pathSeparator&&path.length)return path+pathSeparator;return path};/**
 * This method is intended for encoding *key* or *value* parts of a query
 * component. We need a custom method because "encodeURIComponent()" is too
 * aggressive and encodes stuff that doesn't have to be encoded per
 * "http://tools.ietf.org/html/rfc3986:".
 * @param url - URL to encode.
 * @param encodeSpaces - Indicates whether given url should encode
 * whitespaces as "+" or "%20".
 * @returns Encoded given url.
 */const encodeURIComponentExtended=(url,encodeSpaces=false)=>{return encodeURIComponent(url).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,encodeSpaces?"%20":"+")};/**
 * Extracts domain name from given url. If no explicit domain name given
 * current domain name will be assumed. If no parameter is given, the current
 * domain name will be determined.
 * @param url - The url to extract domain from.
 * @param fallback - The fallback host name if no one exits in given url
 * (default is current hostname).
 * @returns Extracted domain.
 */const getDomainName=(url=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.href||"",fallback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.hostname||"")=>{const result=/^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url);if(result&&result.length>2&&result[1]&&result[2])return result[2];return fallback};/**
 * Extracts port number from given url. If no explicit port number is given
 * and no fallback is defined, the current port number will be assumed for local
 * links. For external links 80 will be assumed for http protocols and 443
 * for https protocols.
 * @param url - The url to extract port from.
 * @param fallback - Fallback port number if no explicit one was found.
 * Default is derived from the current protocol name.
 * @returns Extracted port number.
 */const getPortNumber=(url=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.href||"",fallback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.port?parseInt(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.port):null)=>{const result=/^(?:[a-z]*:?\/\/[^/]+?)?[^/]+?:([0-9]+)/i.exec(url);if(result&&result.length>1)return parseInt(result[1],10);if(fallback!==null)return fallback;if(// NOTE: Would result in an endless loop:
// serviceURLEquals(url, ...parameters) &&
_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.port&&parseInt(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.port,10))return parseInt(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.port,10);return getProtocolName(url)==="https"?443:80};/**
 * Extracts protocol name from given url. If no explicit url is given,
 * the current protocol will be assumed. If no parameter is given, the current
 * protocol number will be determined.
 * @param url - The url to extract protocol from.
 * @param fallback - Fallback port to use if no protocol exists in given
 * url (default is current protocol).
 * @returns Extracted protocol.
 */const getProtocolName=(url=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.href||"",fallback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.protocol&&_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.protocol.length-1)||"")=>{const result=/^([a-z]+):\/\//i.exec(url);if(result&&result.length>1&&result[1])return result[1];return fallback};/**
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
 */const getURLParameter=(keyToGet=null,allowDuplicates=false,givenInput=null,subDelimiter="$",hashedPathIndicator="!",givenSearch=null,givenHash=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.hash??"")=>{// region set search and hash
let hash=givenHash??"#";let search="";if(givenSearch)search=givenSearch;else if(hashedPathIndicator&&hash.startsWith(hashedPathIndicator)){const subHashStartIndex=hash.indexOf("#");let pathAndSearch;if(subHashStartIndex===-1){pathAndSearch=hash.substring(hashedPathIndicator.length);hash=""}else{pathAndSearch=hash.substring(hashedPathIndicator.length,subHashStartIndex);hash=hash.substring(subHashStartIndex)}const subSearchStartIndex=pathAndSearch.indexOf("?");if(subSearchStartIndex!==-1)search=pathAndSearch.substring(subSearchStartIndex)}else if(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location)search=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location.search||"";let input=givenInput?givenInput:search;// endregion
// region determine data from search and hash if specified
const both=input==="&";if(both||input==="#"){let decodedHash="";try{decodedHash=decodeURIComponent(hash)}catch{// Continue regardless of an error.
}const subDelimiterIndex=decodedHash.indexOf(subDelimiter);if(subDelimiterIndex===-1)input="";else{input=decodedHash.substring(subDelimiterIndex);if(input.startsWith(subDelimiter))input=input.substring(subDelimiter.length)}}else if(input.startsWith("?"))input=input.substring("?".length);let data=input?input.split("&"):[];search=search.substring("?".length);if(both&&search)data=data.concat(search.split("&"));// endregion
// region construct data structure
const parameters=[];for(let value of data){const keyValuePair=value.split("=");let key;try{key=decodeURIComponent(keyValuePair[0])}catch{key=""}try{value=decodeURIComponent(keyValuePair[1])}catch{value=""}parameters.push(key);if(allowDuplicates){if(Object.prototype.hasOwnProperty.call(parameters,key)&&Array.isArray(parameters[key]))parameters[key].push(value);else parameters[key]=[value];}else parameters[key]=value}// endregion
if(keyToGet){if(Object.prototype.hasOwnProperty.call(parameters,keyToGet))return parameters[keyToGet];return null}return parameters};/**
 * Checks if a given path has given path prefix.
 * @param prefix - Path prefix to search for.
 * @param path - Path to search in.
 * @param separator - Delimiter to use in a path (default is the posix
 * conform slash).
 * @returns Value "true" if given prefix occurs and "false" otherwise.
 */const hasPathPrefix=(prefix="/admin",path=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.pathname||"",separator="/")=>{if(typeof prefix==="string"){if(!prefix.endsWith(separator))prefix+=separator;return path===prefix.substring(0,prefix.length-separator.length)||path.startsWith(prefix)}return false};/**
 * Normalized given website url.
 * @param givenURL - Uniform resource locator to normalize.
 * @returns Normalized result.
 */const normalizeURL=givenURL=>{if(typeof givenURL==="string"){const url=givenURL.replace(/^:?\/+/,"").replace(/\/+$/,"").trim();if(url.startsWith("http"))return url;return`http://${url}`}return""};/**
 * Represents given website url.
 * @param url - Uniform resource locator to represent.
 * @returns Represented result.
 */const representURL=url=>{if(typeof url==="string")return url.replace(/^(https?)?:?\/+/,"").replace(/\/+$/,"").trim();return""};/**
 * Checks if given url points to another "service" than the second given url.
 * If no second given url is provided, the current url will be assumed.
 * @param url - URL to check against second url.
 * @param referenceURL - URL to check against first url.
 * @returns Returns "true" if given first url has same domain as given
 * second (or current).
 */const serviceURLEquals=(url,referenceURL=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.location?.href||"")=>{const domain=getDomainName(url,"");const protocol=getProtocolName(url,"");const port=getPortNumber(url);return(domain===""||domain===getDomainName(referenceURL))&&(protocol===""||protocol===getProtocolName(referenceURL))&&(port===null||port===getPortNumber(referenceURL))};// endregion
/**
 * Converts a camel-cased string to its delimited string version.
 * @param value - The string to format.
 * @param delimiter - Defines delimiter string.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @returns The formatted string.
 */const camelCaseToDelimited=(value,delimiter="-",abbreviations=null)=>{if(!abbreviations)abbreviations=_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .ABBREVIATIONS */ .Iy;const escapedDelimiter=maskForRegularExpression(delimiter);if(abbreviations.length){let abbreviationPattern="";for(const abbreviation of abbreviations){if(abbreviationPattern)abbreviationPattern+="|";abbreviationPattern+=abbreviation.toUpperCase()}value=value.replace(new RegExp(`(${abbreviationPattern})(${abbreviationPattern})`,"g"),`$1${delimiter}$2`)}value=value.replace(new RegExp(`([^${escapedDelimiter}])([A-Z][a-z]+)`,"g"),`$1${delimiter}$2`);return value.replace(new RegExp("([a-z0-9])([A-Z])","g"),`$1${delimiter}$2`).toLowerCase()};/**
 * Converts a string to its capitalized representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */const capitalize=string=>{return string.charAt(0).toUpperCase()+string.substring(1)};/**
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
 */const compile=(expression,givenOptions={})=>{const options={scope:[],async:false,execute:false,removeGlobalScope:true,binding:{},...givenOptions};/*
        NOTE: We do this global variable name determining as close as possible
        to the compiling step to cover as much as possible global introduces
        variables.
    */const globalNames=Object.keys(globalThis).concat("globalThis").filter(name=>new RegExp(`^[${ALLOWED_STARTING_VARIABLE_SYMBOLS}]`+`[${ALLOWED_VARIABLE_SYMBOLS}]*$`).test(name)&&!KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS.includes(name));const result={error:null,globalNames:globalNames,globalNamesUndefinedList:globalNames.map(()=>undefined),originalScopeNames:Array.isArray(options.scope)?options.scope:typeof options.scope==="string"?[options.scope]:Object.keys(options.scope),scopeNameMapping:{},scopeNames:[],templateFunction:()=>undefined};for(const name of result.originalScopeNames){const newName=convertToValidVariableName(name);result.scopeNameMapping[name]=newName;result.scopeNames.push(newName)}// region try to polyfill template string literals for older engines
if(POLYFILL_TEMPLATE_STRINGS.value)if(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.Babel?.transform)expression=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.Babel.transform(`(${expression})`,{plugins:["transform-template-literals"]}).code;else if(expression.startsWith("`")&&expression.endsWith("`")){const escapeMarker="####";// Convert template string into legacy string concatenations.
expression=expression// Mark simple escape sequences.
.replace(/\\\$/g,escapeMarker)// Handle avoidable template expression: Use raw code.
.replace(/^`\$\{([\s\S]+)}`$/,"String($1)")// Use plain string with single quotes.
.replace(/^`([^']+)`$/,`'$1'`)// Use plain string with double quotes.
.replace(/^`([^"]+)`$/,"\"$1\"");// Use single quotes and hope (just a heuristic).
const quote=expression.charAt(0)==="`"?`'`:expression.charAt(0);expression=expression// Replace a simple placeholder.
// NOTE: Replace complete bracket pairs.
.replace(/\$\{((([^{]*{[^}]*}[^}]*})|[^{}]+)+)}/g,`${quote}+($1)+${quote}`).replace(/^`([\s\S]+)`$/,`${quote}$1${quote}`)// Remove remaining newlines.
.replace(/\n+/g,"")// Replace marked escape sequences.
.replace(new RegExp(escapeMarker,"g"),"\\$")}// endregion
let innerTemplateFunction;try{// eslint-disable-next-line @typescript-eslint/no-unsafe-call
innerTemplateFunction=new(options.async?AsyncFunction:Function)(...(options.removeGlobalScope?result.globalNames:[]),...result.scopeNames,`${options.execute?"":"return "}${expression}`)}catch(error){result.error=`Given ${options.async?"async":"sync"} expression `+`"${expression}" could not be compiled width `+`given scope names "${result.scopeNames.join("\", \"")}": `+(0,_object_js__WEBPACK_IMPORTED_MODULE_4__/* .represent */ .Do)(error)}if(innerTemplateFunction){const boundInnerTemplateFunction=innerTemplateFunction.bind(options.binding);result.templateFunction=options.removeGlobalScope?(...parameters)=>/*
                    NOTE: We shadow existing global names to sandbox
                    expressions.
                */boundInnerTemplateFunction(...result.globalNamesUndefinedList,...parameters):boundInnerTemplateFunction}return result};/**
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
 */const evaluate=(expression,givenOptions={})=>{const options={scope:{},async:false,execute:false,removeGlobalScope:true,binding:{},...givenOptions};// NOTE: We extract string-only types from given scope type.
const{error,originalScopeNames,scopeNames,templateFunction}=compile(expression,options);let result={compileError:null,runtimeError:null,error:"Not yet evaluated.",result:undefined};if(error){result.compileError=result.error=error;return result}try{result={compileError:null,runtimeError:null,error:null,result:templateFunction(/*
                    NOTE: We want to be sure to have the same ordering as we
                    have for the scope names and to call internal registered
                    getter by retrieving values. So simple using
                    "...Object.values(scope)" is not appreciate here.
                */...originalScopeNames.map(name=>options.scope[name]))}}catch(error){result.error=result.runtimeError=`Given ${options.async?"async":"sync"} expression `+`"${expression}" could not be evaluated with given scope `+`names "${scopeNames.join("\", \"")}": `+(0,_object_js__WEBPACK_IMPORTED_MODULE_4__/* .represent */ .Do)(error)}return result};/**
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
 */const evaluateOrThrowError=(expression,options={})=>{const evaluated=evaluate(expression,options);if(evaluated.error)throw new Error(evaluated.error);return evaluated.result};/**
 * Compresses given style attribute value.
 * @param styleValue - Style value to compress.
 * @returns The compressed value.
 */const compressStyleValue=styleValue=>{return styleValue.replace(/ *([:;]) */g,"$1").replace(/ +/g," ").replace(/^;+/,"").replace(/;+$/,"").trim()};/**
 * Translates a given name into a valid JavaScript one.
 * @param name - Name to convert.
 * @returns Converted name is returned.
 */const convertToValidVariableName=name=>{if(["class","default"].includes(name))return`_${name}`;return name// Remove all disallowed starting characters.
.replace(new RegExp(`^[^${ALLOWED_STARTING_VARIABLE_SYMBOLS}]+`),"")// Remove all disallowed characters within a variable name and make
// continuing character upper case.
.replace(new RegExp(`[^${ALLOWED_VARIABLE_SYMBOLS}]+([a-zA-Z])`,"g"),(_fullMatch,firstLetter)=>firstLetter.toUpperCase())};/**
 * Decodes all html symbols in text nodes in a given html string.
 * @param htmlString - HTML string to decode.
 * @returns Decoded html string.
 */const decodeHTMLEntities=htmlString=>{if(_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.document){const textareaDomNode=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .globalContext */ .Lz.document.createElement("textarea");textareaDomNode.innerHTML=htmlString;return textareaDomNode.value}return null};/**
 * Converts a delimited string to its camel case representation.
 * @param value - The string to format.
 * @param delimiter - Delimiter string to use.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
 * formatted camel case abbreviations will be ignored.
 * @param removeMultipleDelimiter - Indicates whether a series of delimiter
 * should be consolidated.
 * @returns The formatted string.
 */const delimitedToCamelCase=(value,delimiter="-",abbreviations=null,preserveWrongFormattedAbbreviations=false,removeMultipleDelimiter=false)=>{let escapedDelimiter=maskForRegularExpression(delimiter);if(!abbreviations)abbreviations=_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .ABBREVIATIONS */ .Iy;let abbreviationPattern;if(preserveWrongFormattedAbbreviations)abbreviationPattern=_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .ABBREVIATIONS */ .Iy.join("|");else{abbreviationPattern="";for(const abbreviation of abbreviations){if(abbreviationPattern)abbreviationPattern+="|";abbreviationPattern+=`${capitalize(abbreviation)}|${abbreviation}`}}const stringStartsWithDelimiter=value.startsWith(delimiter);if(stringStartsWithDelimiter)value=value.substring(delimiter.length);value=value.replace(new RegExp(`(${escapedDelimiter})(${abbreviationPattern})`+`(${escapedDelimiter}|$)`,"g"),(_fullMatch,before,abbreviation,after)=>before+abbreviation.toUpperCase()+after);if(removeMultipleDelimiter)escapedDelimiter=`(?:${escapedDelimiter})+`;value=value.replace(new RegExp(`${escapedDelimiter}([a-zA-Z0-9])`,"g"),(_fullMatch,firstLetter)=>firstLetter.toUpperCase());if(stringStartsWithDelimiter)value=delimiter+value;return value};/**
 * Translates a given string into the regular expression validated
 * representation.
 * @param value - String to convert.
 * @param excludeSymbols - Symbols not to escape.
 * @returns Converted string.
 */const escapeRegularExpressions=(value,excludeSymbols=[])=>{// NOTE: This is only for performance improvements.
if(value.length===1&&!_constants_js__WEBPACK_IMPORTED_MODULE_1__/* .SPECIAL_REGEX_SEQUENCES */ .FI.includes(value))return value;// The escape sequence must also be escaped; but at first.
if(!excludeSymbols.includes("\\"))value.replace(/\\/g,"\\\\");for(const replace of _constants_js__WEBPACK_IMPORTED_MODULE_1__/* .SPECIAL_REGEX_SEQUENCES */ .FI)if(!excludeSymbols.includes(replace))value=value.replace(new RegExp(`\\${replace}`,"g"),`\\${replace}`);return value};/**
 * Finds the string match of a given query in a given target text by applying a
 * given normalization function to target and query.
 * @param target - Target to search in.
 * @param query - Search string to search for.
 * @param normalizer - Function to use as normalization for queries and search
 * targets.
 * @param skipTagDelimitedParts - Indicates whether to, for example, ignore
 * html tags via "['<', '>']" (the default).
 * @returns Start and end index of matching range.
 */const findNormalizedMatchRange=(target,query,normalizer=value=>typeof value==="string"?value.trim().toLowerCase():value,skipTagDelimitedParts=["<",">"])=>{const normalizedQuery=normalizer(query);let stringNormalizedQuery;if(typeof normalizedQuery==="string")stringNormalizedQuery=normalizedQuery;else{const match=target.match(normalizedQuery);stringNormalizedQuery=match?match[0]:""}if(!stringNormalizedQuery)return null;const normalizedTarget=normalizer(target);if(!normalizedTarget)return null;const stringTarget=typeof target==="string"?target:normalizedTarget;let inTag=false;for(let index=0;index<stringTarget.length;index+=1){if(inTag){if(Array.isArray(skipTagDelimitedParts)&&stringTarget.charAt(index)===skipTagDelimitedParts[1])inTag=false;continue}if(Array.isArray(skipTagDelimitedParts)&&stringTarget.charAt(index)===skipTagDelimitedParts[0]){inTag=true;continue}/*
            Skip positions the normalizer strips away (e.g. leading
            whitespace), so the reported match index aligns with the real
            character.
        */if(!normalizer(stringTarget.charAt(index)))continue;if(normalizer(stringTarget.substring(index)).startsWith(stringNormalizedQuery)){if(stringNormalizedQuery.length===1)return[index,index+1];for(let subIndex=stringTarget.length;subIndex>index;subIndex-=1)if(!normalizer(stringTarget.substring(index,subIndex)).startsWith(stringNormalizedQuery))return[index,subIndex+1]}}return null};/**
 * Fixes known encoding problems in given data.
 * @param data - To process.
 * @returns Processed data.
 */const fixKnownEncodingErrors=data=>{for(const[search,replacement]of FIX_ENCODING_ERROR_MAPPING)data=data.replace(new RegExp(search,"g"),replacement);return data};/**
 * Performs a string formation. Replaces every placeholder "{i}" with the i'th
 * argument.
 * @param string - The string to format.
 * @param additionalArguments - Additional arguments are interpreted as
 * replacements for string formatting.
 * @returns The formatted string.
 */const format=(string,...additionalArguments)=>{additionalArguments.unshift(string);let index=0;for(const value of additionalArguments){string=string.replace(new RegExp(`\\{${String(index)}\\}`,"gm"),String(value));index+=1}return string};/**
 * Calculates the edit (levenstein) distance between two given strings.
 * @param first - First string to compare.
 * @param second - Second string to compare.
 * @returns The distance as number.
 */const getEditDistance=(first,second)=>{/*
        Create empty edit distance matrix for all possible modifications of
        substrings of "first" to substrings of "second".
    */const distanceMatrix=Array(second.length+1).fill(null).map(()=>Array(first.length+1).fill(null));/*
        Fill the first row of the matrix.
        If this is the first row, then, we're transforming an empty string to
        "first". In this case the number of transformations equals to the size
        of the "first" substring.
    */for(let index=0;index<=first.length;index++)distanceMatrix[0][index]=index;/*
        Fill the first column of the matrix.
        If this is the first column, then we're transforming an empty string to
        "second".
        In this case the number of transformations equals to the size of the
        "second" substring.
    */for(let index=0;index<=second.length;index++)distanceMatrix[index][0]=index;for(let firstIndex=1;firstIndex<=second.length;firstIndex++)for(let secondIndex=1;secondIndex<=first.length;secondIndex++){const indicator=first[secondIndex-1]===second[firstIndex-1]?0:1;distanceMatrix[firstIndex][secondIndex]=Math.min(// deletion
distanceMatrix[firstIndex][secondIndex-1]+1,// insertion
distanceMatrix[firstIndex-1][secondIndex]+1,// substitution
distanceMatrix[firstIndex-1][secondIndex-1]+indicator)}return distanceMatrix[second.length][first.length]};/**
 * Abbreviates a given string if it excesses a given limit.
 * @param value - String to abbreviate.
 * @param limit - Maximum length of processed string.
 * @returns Abbreviated given string.
 */const limit=(value,limit=100)=>{if(value.length<=limit)return value;const dots="...";return value.substring(0,limit-dots.length)+dots};/**
 * Converts a string to its lower case representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */const lowerCase=string=>{return string.charAt(0).toLowerCase()+string.substring(1)};/**
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
 */const mark=(target,givenSearchWords,givenOptions={})=>{if(typeof target==="string"&&(Array.isArray(givenSearchWords)&&givenSearchWords.length||givenSearchWords instanceof RegExp||typeof givenSearchWords==="string"&&givenSearchWords.length)){const options={marker:"<span class=\"tools-mark\">{1}</span>",normalizer:value=>typeof value==="string"?value.trim().toLowerCase():value,skipTagDelimitedParts:["<",">"],...givenOptions};target=target.trim();const markedTarget=[];const searchWords=[].concat(givenSearchWords);let index=0;for(const word of searchWords){searchWords[index]=options.normalizer(word);index+=1}let restTarget=target;let offset=0;/*
            Search for matches as long there is enough target text remaining to
            walk through.
        */for(let iteration=0;iteration<_context_js__WEBPACK_IMPORTED_MODULE_2__/* .MAXIMAL_NUMBER_OF_ITERATIONS */ .$Q.value;iteration++){let nearestRange=null;let currentRange;// Find the nearest next matching word.
for(const word of searchWords){currentRange=findNormalizedMatchRange(restTarget,word,options.normalizer,options.skipTagDelimitedParts);if(currentRange&&(!nearestRange||currentRange[0]<nearestRange[0]))nearestRange=currentRange}if(nearestRange){if(nearestRange[0]>0)markedTarget.push(target.substring(offset,offset+nearestRange[0]));markedTarget.push(typeof options.marker==="string"?format(options.marker,target.substring(offset+nearestRange[0],offset+nearestRange[1])):options.marker(target.substring(offset+nearestRange[0],offset+nearestRange[1]),markedTarget));offset+=nearestRange[1];restTarget=target.substring(offset)}else{if(restTarget.length)markedTarget.push(restTarget);break}}return typeof options.marker==="string"?markedTarget.join(""):markedTarget}return target};/**
 * Validates the current string for using in a regular expression pattern.
 * Special regular expression chars will be escaped.
 * @param value - The string to format.
 * @returns The formatted string.
 */const maskForRegularExpression=value=>{return value.replace(/([\\|.*$^+[\]()?\-{}])/g,"\\$1")};/**
 * Converts a dom selector to a prefixed dom selector string.
 * @param selector - A dom node selector.
 * @param selectorPrefix - A dom node selector prefix to take into account.
 * @returns Returns given selector prefixed.
 */const normalizeDomNodeSelector=(selector,selectorPrefix="")=>{let domNodeSelectorPrefix="";if(selectorPrefix)domNodeSelectorPrefix=`${selectorPrefix} `;if(!(selector.startsWith(domNodeSelectorPrefix)||selector.trim().startsWith("<")))selector=domNodeSelectorPrefix+selector;return selector.trim()};/**
 * Normalizes a given phone number for automatic dialing or comparison.
 * @param value - Number to normalize.
 * @param dialable - Indicates whether the result should be dialed or
 * represented as lossless data.
 * @returns Normalized number.
 */const normalizePhoneNumber=(value,dialable=true)=>{if(typeof value==="string"||typeof value==="number"){let normalizedValue=String(value).trim();// Normalize country code prefix.
normalizedValue=normalizedValue.replace(/^[^0-9]*\+/,"00");// Remove alternate direct dial numbers.
normalizedValue=normalizedValue.replace(/([0-9].*?) *(,|o[rd]?)\.? ?-?[0-9]+$/,"$1");if(dialable)return normalizedValue.replace(/[^0-9]+/g,"");const separatorPattern="(?:[ /\\-]+)";// Remove unneeded area code zero in brackets.
normalizedValue=normalizedValue.replace(new RegExp(`^(.+?)${separatorPattern}?\\(0\\)${separatorPattern}?`+"(.+)$"),"$1-$2");// Remove unneeded area code brackets.
normalizedValue=normalizedValue.replace(new RegExp(`^(.+?)${separatorPattern}?\\((.+)\\)`+`${separatorPattern}?(.+)$`),"$1-$2-$3");/*
            Remove separators that don't mark semantics:
            1: Country code
            2: Area code
            3: Number
        */let compiledPattern=new RegExp(`^(00[0-9]+)${separatorPattern}([0-9]+)${separatorPattern}`+"(.+)$");if(compiledPattern.test(normalizedValue))// Country code and area code matched.
normalizedValue=normalizedValue.replace(compiledPattern,(_match,countryCode,areaCode,number)=>`${countryCode}-${areaCode}-`+sliceAllExceptNumberAndLastSeparator(number));else{/*
                One prefix code matched:
                1: Prefix code
                2: Number
            */compiledPattern=/^([0-9 ]+)[/-](.+)$/;const replacer=(_match,prefixCode,number)=>`${prefixCode.replace(/ +/,"")}-`+sliceAllExceptNumberAndLastSeparator(number);if(compiledPattern.test(normalizedValue))// Prefer "/" or "-" over " " as area code separator.
normalizedValue=normalizedValue.replace(compiledPattern,replacer);else normalizedValue=normalizedValue.replace(new RegExp(`^([0-9]+)${separatorPattern}(.+)$`),replacer)}return normalizedValue.replace(/[^0-9-]+/g,"").replace(/^-+$/,"")}return""};/**
 * Normalizes a given zip code for automatic address processing.
 * @param value - Number to normalize.
 * @returns Normalized number.
 */const normalizeZipCode=value=>{if(typeof value==="string"||typeof value==="number")return String(value).trim().replace(/^([^0-9]*[a-zA-Z]-)?(.+)$/,(match,prefix,code)=>{if(prefix)prefix=prefix.substring(prefix.length-2).charAt(0).toUpperCase()+"-";return(prefix??"")+(code??"").trim().replace(/[^0-9]+/g,"")});return""};/**
 * Converts a given serialized, base64 encoded or file path given object into a
 * native JavaScript one if possible.
 * @param serializedObject - Object as string.
 * @param scope - An optional scope which will be used to evaluate given object
 * in.
 * @param name - The name under given scope will be available.
 * @returns The parsed object if possible and null otherwise.
 */const parseEncodedObject=(serializedObject,scope={},name="scope")=>{if(!_filesystem_js__WEBPACK_IMPORTED_MODULE_3__/* .imports */ .VW.fs?.readFileSync)throw new Error("File system api could not be loaded.");if(serializedObject.endsWith(".json")&&(0,_filesystem_js__WEBPACK_IMPORTED_MODULE_3__/* .isFileSync */ .WY)(serializedObject))serializedObject=_filesystem_js__WEBPACK_IMPORTED_MODULE_3__/* .imports */ .VW.fs.readFileSync(serializedObject,{encoding:(/* inlined export .DEFAULT_ENCODING */"utf8")});serializedObject=serializedObject.trim();if(!serializedObject.startsWith("{"))serializedObject=eval("Buffer").from(serializedObject,"base64").toString((/* inlined export .DEFAULT_ENCODING */"utf8"));const result=evaluate(serializedObject,{scope:{[name]:scope}});if(typeof result.result==="object")return result.result;return null};/**
 * Represents a given phone number. NOTE: Currently only support German phone
 * numbers.
 * @param value - Number to format.
 * @returns Formatted number.
 */const representPhoneNumber=value=>{if(["number","string"].includes((0,_object_js__WEBPACK_IMPORTED_MODULE_4__/* .determineType */ .Sj)(value))&&value){// Represent country code and leading area code zero.
let normalizedValue=// eslint-disable-next-line @typescript-eslint/no-base-to-string
String(value).replace(/^(00|\+)([0-9]+)-([0-9-]+)$/,"+$2 (0) $3");// Add German country code if not exists.
normalizedValue=normalizedValue.replace(/^0([1-9][0-9-]+)$/,"+49 (0) $1");// Separate area code from base number.
normalizedValue=normalizedValue.replace(/^([^-]+)-([0-9-]+)$/,"$1 / $2");// Partition base number in one triple and tuples or tuples only.
return normalizedValue.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/,(_match,prefix,number,suffix)=>prefix+(number.length%2===0?number.replace(/([0-9]{2})/g,"$1 "):number.replace(/^([0-9]{3})([0-9]+)$/,(_match,triple,rest)=>`${triple} `+rest.replace(/([0-9]{2})/g,"$1 ").trim())+suffix).trim()).trim()}return""};/**
 * Slices all none numbers but preserves last separator.
 * @param value - String to process.
 * @returns - Sliced given value.
 */const sliceAllExceptNumberAndLastSeparator=value=>{/*
        1: baseNumber
        2: directDialingNumberSuffix
    */const compiledPattern=/^(.*[0-9].*)-([0-9]+)$/;if(compiledPattern.test(value))return value.replace(compiledPattern,(_match,baseNumber,directDialingNumberSuffix)=>`${baseNumber.replace(/[^0-9]+/g,"")}-`+directDialingNumberSuffix);return value.replace(/[^0-9]+/g,"")};

/***/ }),
/* 10 */
/***/ ((__webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* unused harmony exports browser, log */
/* harmony import */ var clientnode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var clientnode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module browser */


/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports

// endregion
// region declaration

//  endregion
//  region variables
const onCreatedListener = [];
const browser = {
  debug: false,
  domContentLoaded: false,
  DOM: null,
  initialized: false,
  instance: null,
  window: null,
  windowLoaded: false
};
const log = new clientnode__WEBPACK_IMPORTED_MODULE_1__/* .Logger */ .Vy({
  name: 'weboptimizer.browser'
});
// endregion
// region ensure presence of common browser environment
if (true) {
  // region mock browser environment
  const [{
    JSDOM,
    VirtualConsole: VirtualConsoleImplementation
  }, path] = await Promise.all([Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 29)), Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 30))]);
  const virtualConsole = new VirtualConsoleImplementation();
  for (const name of clientnode__WEBPACK_IMPORTED_MODULE_0__/* .CONSOLE_METHODS */ .jg) virtualConsole.on(name, console[name].bind(console));
  virtualConsole.on('error', error => {
    if (!browser.debug && ['XMLHttpRequest', 'resource loading'].includes(error.type)) void log.warn(`Loading resource failed: ${error.toString()}.`);else void log.error(error.stack, error.detail);
  });
  const render = template => {
    browser.DOM = JSDOM;
    browser.initialized = true;
    browser.instance = new browser.DOM(template, {
      beforeParse: window => {
        // We want to use it in a polymorphic way.
        /*
            eslint-disable
            @typescript-eslint/no-unnecessary-type-assertion
        */
        browser.window = __webpack_require__.g.window ?? window;
        /*
            eslint-enable
            @typescript-eslint/no-unnecessary-type-assertion
        */

        window.document.addEventListener('DOMContentLoaded', () => {
          /*
              Move template results into global
              pre-defined dom.
          */
          if (__webpack_require__.g.window) for (const type of ['head', 'body']) __webpack_require__.g.window.document[type].innerHTML = window.document[type].innerHTML;
          browser.domContentLoaded = true;
        });
        window.addEventListener('load', () => {
          /*
              NOTE: Maybe we have miss the "DOMContentLoaded"
              event caused by a race condition.
          */
          browser.domContentLoaded = browser.windowLoaded = true;
        });
        for (const callback of onCreatedListener) void callback();
      },
      resources: 'usable',
      runScripts: 'dangerously',
      url: 'http://localhost',
      virtualConsole
    });
  };
  let evaluatedContent = '';
  if (false) // removed by dead control flow
{} else evaluatedContent = (await Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 31))).default;
  render(evaluatedContent);
  // endregion
} else // removed by dead control flow
{}
// endregion
/**
 * Provides a generic browser api in node or web contexts.
 * @param replaceWindow - Indicates whether a potential existing window object
 * should be replaced or not.
 * @returns Determined environment.
 */
const getInitializedBrowser = async (replaceWindow = true) => {
  let resolvePromise;
  const promise = new Promise(resolve => {
    resolvePromise = resolve;
  });

  /*
      NOTE: We have to define window globally before anything is loaded to
      ensure that all future instances share the same window object.
  */
  const wrappedCallback = () => {
    if (replaceWindow && typeof __webpack_require__.g !== 'undefined' && __webpack_require__.g !== browser.window) __webpack_require__.g.window = browser.window;
    resolvePromise(browser);
  };
  if (browser.initialized) wrappedCallback();else onCreatedListener.push(wrappedCallback);
  return promise;
};
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (getInitializedBrowser)));
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "hA", 0, /* binding */ getInitializedBrowser
/* harmony export */ ]);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LI: () => (/* binding */ round),
/* harmony export */   RI: () => (/* binding */ floor),
/* harmony export */   W2: () => (/* binding */ isNotANumber),
/* harmony export */   mk: () => (/* binding */ ceil),
/* harmony export */   n$: () => (/* binding */ getUTCTimestamp)
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
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
 */const ceil=(number,digits=0)=>Math.ceil(number*Math.pow(10,digits))/Math.pow(10,digits);/**
 * Rounds a given number down accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */const floor=(number,digits=0)=>Math.floor(number*Math.pow(10,digits))/Math.pow(10,digits);/**
 * Rounds a given number accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */const round=(number,digits=0)=>Math.round(number*Math.pow(10,digits))/Math.pow(10,digits);/**
 * Determines corresponding utc timestamp for given date object.
 * @param value - Date to convert.
 * @param inMilliseconds - Indicates whether given number should be in
 * seconds (default) or milliseconds.
 * @returns Determined numerous value.
 */const getUTCTimestamp=(value,inMilliseconds=false)=>{const date=[null,undefined].includes(value)?new Date:new Date(value);return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds(),date.getUTCMilliseconds())/(inMilliseconds?1:1000)};/**
 * Checks if given object is java scripts native "Number.NaN" object.
 * @param value - Value to check.
 * @returns Returns whether given value is not a number or not.
 */const isNotANumber=value=>(0,_object_js__WEBPACK_IMPORTED_MODULE_1__/* .determineType */ .Sj)(value)==="number"&&isNaN(value);

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
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
*/const imports={};let mkdirSync;let readdirSync;let readFileSync;let statSync;let writeFileSync;let mkdir;let readdir;let readFile;let stat;let writeFile;let basename;let join;let resolve;const importPromises=[];const importFilesystemAPI=()=>{if(importPromises.length>0)return Promise.all(importPromises);const fsImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_3__/* .optionalImport */ .Sw)("fs");void fsImportPromise.then(module=>{imports.fs=module;if(module){mkdirSync=module.mkdirSync;readdirSync=module.readdirSync;readFileSync=module.readFileSync;statSync=module.statSync;writeFileSync=module.writeFileSync}else{mkdirSync=null;readdirSync=null;readFileSync=null;statSync=null;writeFileSync=null}});const fsPromisesImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_3__/* .optionalImport */ .Sw)("fs/promises");void fsPromisesImportPromise.then(module=>{imports.fsPromises=module;if(module){mkdir=module.mkdir;readdir=module.readdir;readFile=module.readFile;stat=module.stat;writeFile=module.writeFile}else{mkdir=null;readdir=null;readFile=null;stat=null;writeFile=null}});const pathImportPromise=(0,_module_js__WEBPACK_IMPORTED_MODULE_3__/* .optionalImport */ .Sw)("path");void pathImportPromise.then(module=>{imports.path=module;if(module){basename=module.basename;join=module.join;resolve=module.resolve}else{basename=null;join=null;resolve=null}});importPromises.push(fsImportPromise,fsPromisesImportPromise,pathImportPromise);return Promise.all(importPromises)};/**
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
 */const copyDirectoryRecursive=async(sourcePath,targetPath,contents=false,callback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,readOptions={encoding:null,flag:"r"},writeOptions={encoding:(/* inlined export .DEFAULT_ENCODING */"utf8"),flag:"w",mode:438})=>{if(!(basename&&join&&mkdir&&resolve))throw new Error("Could not load filesystem functions.");sourcePath=resolve(sourcePath);if(!contents&&(await isDirectory(targetPath)))targetPath=resolve(targetPath,basename(sourcePath));// NOTE: Check if folder needs to be created or integrated.
try{await mkdir(targetPath)}catch(error){if(error.code!=="EEXIST")throw error}for(const currentSourceFile of await walkDirectoryRecursively(sourcePath,callback)){const currentTargetPath=join(targetPath,currentSourceFile.path.substring(sourcePath.length));if(currentSourceFile.stats?.isDirectory())try{await mkdir(currentTargetPath)}catch(error){if(error.code!=="EEXIST")throw error}else await copyFile(currentSourceFile.path,currentTargetPath,readOptions,writeOptions)}return targetPath};/**
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
 */const copyDirectoryRecursiveSync=(sourcePath,targetPath,contents=false,callback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,readOptions={encoding:null,flag:"r"},writeOptions={encoding:(/* inlined export .DEFAULT_ENCODING */"utf8"),flag:"w",mode:438})=>{if(!(basename&&join&&mkdirSync&&resolve))throw new Error("Could not load filesystem functions.");sourcePath=resolve(sourcePath);if(!contents&&isDirectorySync(targetPath))targetPath=resolve(targetPath,basename(sourcePath));// NOTE: Try/Check if target folder needs to be created.
try{mkdirSync(targetPath)}catch(error){if(error.code!=="EEXIST")throw error}for(const currentSourceFile of walkDirectoryRecursivelySync(sourcePath,callback)){const currentTargetPath=join(targetPath,currentSourceFile.path.substring(sourcePath.length));if(currentSourceFile.stats?.isDirectory())try{mkdirSync(currentTargetPath)}catch(error){if(error.code!=="EEXIST")throw error}else copyFileSync(currentSourceFile.path,currentTargetPath,readOptions,writeOptions)}return targetPath};/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */const copyFile=async(sourcePath,targetPath,readOptions={encoding:null,flag:"r"},writeOptions={encoding:(/* inlined export .DEFAULT_ENCODING */"utf8"),flag:"w",mode:438})=>{if(!(basename&&readFile&&resolve&&writeFile))throw new Error("Could not load filesystem functions.");/*
        NOTE: If target path references a directory a new file with the same
        name will be created.
    */if(await isDirectory(targetPath))targetPath=resolve(targetPath,basename(sourcePath));await writeFile(targetPath,await readFile(sourcePath,readOptions),writeOptions);return targetPath};/**
 * Copies given source file via path to given target directory location with
 * same target name as source file has or copy to given complete target file
 * path.
 * @param sourcePath - Path to file to copy.
 * @param targetPath - Target directory or complete file location to copy to.
 * @param readOptions - Options to use for reading source file.
 * @param writeOptions - Options to use for writing to target file.
 * @returns Determined target file path.
 */const copyFileSync=(sourcePath,targetPath,readOptions={encoding:null,flag:"r"},writeOptions={encoding:(/* inlined export .DEFAULT_ENCODING */"utf8"),flag:"w",mode:438})=>{if(!(basename&&readFileSync&&resolve&&writeFileSync))throw new Error("Could not load filesystem functions.");/*
        NOTE: If target path references a directory a new file with the same
        name will be created.
    */if(isDirectorySync(targetPath))targetPath=resolve(targetPath,basename(sourcePath));writeFileSync(targetPath,readFileSync(sourcePath,readOptions),writeOptions);return targetPath};/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */const isDirectory=async filePath=>{if(!stat)throw new Error("Could not load filesystem functions.");try{return(await stat(filePath)).isDirectory()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
 * Checks if given path points to a valid directory.
 * @param filePath - Path to directory.
 * @returns A boolean which indicates directory existence.
 */const isDirectorySync=filePath=>{if(!statSync)throw new Error("Could not load filesystem functions.");try{return statSync(filePath).isDirectory()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to directory.
 * @returns A promise holding a boolean which indicates directory existence.
 */const isFile=async filePath=>{if(!stat)throw new Error("Could not load filesystem functions.");try{return(await stat(filePath)).isFile()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
 * Checks if given path points to a valid file.
 * @param filePath - Path to file.
 * @returns A boolean which indicates file existence.
 */const isFileSync=filePath=>{if(!statSync)throw new Error("Could not load filesystem functions.");try{return statSync(filePath).isFile()}catch(error){if(Object.prototype.hasOwnProperty.call(error,"code")&&["ENOENT","ENOTDIR"].includes(error.code))return false;throw error}};/**
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
 */const walkDirectoryRecursively=async(directoryPath,callback=null,options=(/* inlined export .DEFAULT_ENCODING */"utf8"))=>{if(!(readdir&&resolve&&stat))throw new Error("Could not load filesystem functions.");const files=[];for(const directoryEntry of await readdir(directoryPath,typeof options==="string"?{encoding:options,withFileTypes:true}:{...options,withFileTypes:true})){const filePath=resolve(directoryPath,directoryEntry.name);const file={directoryPath,directoryEntry,error:null,name:directoryEntry.name,path:filePath,stats:null};try{file.stats=await stat(filePath)}catch(error){file.error=error}files.push(file)}if(callback)/*
            NOTE: Directories and have to be iterated first to be able to
            avoid deeper unwanted traversing.
        */files.sort((firstFile,secondFile)=>{if(firstFile.stats?.isDirectory()){if(secondFile.stats?.isDirectory())return 0;return-1}if(secondFile.stats?.isDirectory())return 1;return 0});let finalFiles=[];for(const file of files){finalFiles.push(file);let result=callback?callback(file):undefined;if(result===null)break;if(typeof result==="object"&&"then"in result)result=await result;if(result===null)break;if(result!==false&&file.stats?.isDirectory())finalFiles=finalFiles.concat(await walkDirectoryRecursively(file.path,callback,options))}return finalFiles};/**
 * Iterates through given directory structure recursively and calls given
 * callback for each found file. Callback gets file path and corresponding
 * stats object as argument.
 * @param directoryPath - Path to directory structure to traverse.
 * @param callback - Function to invoke for each traversed file.
 * @param options - Options to use for nested "readdir" calls.
 * @returns Determined list if all files.
 */const walkDirectoryRecursivelySync=(directoryPath,callback=_context_js__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,options=(/* inlined export .DEFAULT_ENCODING */"utf8"))=>{if(!(readdirSync&&resolve&&statSync))throw new Error("Could not load filesystem functions.");const files=[];for(const directoryEntry of readdirSync(directoryPath,typeof options==="string"?{encoding:options,withFileTypes:true}:{...options,withFileTypes:true})){const filePath=resolve(directoryPath,directoryEntry.name);const file={directoryPath,directoryEntry,error:null,name:directoryEntry.name,path:filePath,stats:null};try{file.stats=statSync(filePath)}catch(error){file.error=error}files.push(file)}let finalFiles=[];if(callback){/*
            NOTE: Directories have to be iterated first to potentially
            avoid deeper iterations.
        */files.sort((firstFile,secondFile)=>{if(firstFile.stats?.isDirectory()){if(secondFile.stats?.isDirectory())return 0;return-1}if(secondFile.stats?.isDirectory())return 1;return 0});for(const file of files){finalFiles.push(file);const result=callback(file);if(result===null)break;if(result!==false&&file.stats?.isDirectory())finalFiles=finalFiles.concat(walkDirectoryRecursivelySync(file.path,callback,options))}}return finalFiles};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "L5", 0, /* binding */ importFilesystemAPI,
/* harmony export */   "VW", 0, /* binding */ imports,
/* harmony export */   "WY", 0, /* binding */ isFileSync,
/* harmony export */   "Xp", 0, /* binding */ copyFileSync,
/* harmony export */   "ZP", 0, /* binding */ isDirectorySync,
/* harmony export */   "fo", 0, /* binding */ isFile,
/* harmony export */   "hu", 0, /* binding */ walkDirectoryRecursivelySync,
/* harmony export */   "m3", 0, /* binding */ copyFile,
/* harmony export */   "uD", 0, /* binding */ copyDirectoryRecursiveSync,
/* harmony export */   "vX", 0, /* binding */ copyDirectoryRecursive,
/* harmony export */   "wd", 0, /* binding */ isDirectory,
/* harmony export */   "y3", 0, /* binding */ walkDirectoryRecursively
/* harmony export */ ]);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
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
*/const isSpecificExpression=(expression,indicatorKey,properties=[])=>{if(!((0,_indicators_js__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(expression)&&Object.prototype.hasOwnProperty.call(expression,indicatorKey)))return false;for(const name of properties)if(!Object.prototype.hasOwnProperty.call(expression,name))return false;return true};const isCondition=expression=>isSpecificExpression(expression,"$comparator",["value1","value2"]);const isAndExpression=expression=>isSpecificExpression(expression,"$and");const isOrExpression=expression=>isSpecificExpression(expression,"$or");const isConcatExpression=expression=>isSpecificExpression(expression,"$concat");const isMappingExpression=expression=>isSpecificExpression(expression,"$mapping",["data"]);const isOperation=expression=>isSpecificExpression(expression,"$operator",["operand1","operand2"]);const isUnaryOperation=expression=>isSpecificExpression(expression,"$operator",["operand"]);const isIfExpression=expression=>isSpecificExpression(expression,"$if");const isSwitchExpression=expression=>isSpecificExpression(expression,"$switch");const isArrayContainsExpression=expression=>isSpecificExpression(expression,"$arrayContains");const isSelector=expression=>isSpecificExpression(expression,"$select");const isValue=expression=>!(isSelector(expression)||isCondition(expression)||isUnaryOperation(expression)||isOperation(expression)||isAndExpression(expression)||isOrExpression(expression)||isConcatExpression(expression)||isMappingExpression(expression)||isIfExpression(expression)||isSwitchExpression(expression)||isArrayContainsExpression(expression));
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "$y", 0, /* binding */ isSwitchExpression,
/* harmony export */   "G3", 0, /* binding */ isCondition,
/* harmony export */   "Gc", 0, /* binding */ isAndExpression,
/* harmony export */   "HK", 0, /* binding */ isConcatExpression,
/* harmony export */   "MP", 0, /* binding */ isIfExpression,
/* harmony export */   "YG", 0, /* binding */ isOperation,
/* harmony export */   "Z9", 0, /* binding */ isMappingExpression,
/* harmony export */   "ZI", 0, /* binding */ isArrayContainsExpression,
/* harmony export */   "bF", 0, /* binding */ isUnaryOperation,
/* harmony export */   "bQ", 0, /* binding */ isSpecificExpression,
/* harmony export */   "cB", 0, /* binding */ isSelector,
/* harmony export */   "g6", 0, /* binding */ isOrExpression,
/* harmony export */   "ml", 0, /* binding */ isValue
/* harmony export */ ]);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Vy: () => (/* binding */ Logger)
/* harmony export */ });
/* unused harmony exports LEVELS, LEVELS_COLOR */
/* harmony import */ var _cli_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Logger *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/var _Logger;function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==typeof o?o:o+""}function _toPrimitive(t,e){if("object"!=typeof t||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)};const LEVELS=["error","critical","warn","info","debug"];const LEVELS_COLOR=[_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.red,_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.magenta,_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.yellow,_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.green,_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.blue];/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for dependent gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse  option objects dom trees or handle events is also
 * provided.
 * @property level - Logging level.
 * @property name - Logger description.
 */class Logger{/**
     * Configures all logger instances.
     * @param options - Options to set.
     */static configureAllInstances(options={}){if(options.level)Logger.defaultLevel=options.level;if(options.name)Logger.defaultName=options.name;for(const logger of Object.values(Logger.instances))logger.configure(options)}/**
     * Initializes logger.
     * @param options - Options to set.
     */constructor(options={}){_defineProperty(this,"level",Logger.defaultLevel);_defineProperty(this,"name",Logger.defaultName);this.configure(options);Logger.instances[this.name]=this}/**
     * Configures logger.
     * @param options - Options to set.
     * @param options.name - Description of the logger instance.
     * @param options.level - Logging level to configure.
     */configure({name,level}){if(level)this.level=level;else this.level=Logger.defaultLevel;if(name)this.name=name;else this.name=Logger.defaultName}/**
     * Shows the given object's representation in the browsers console if
     * possible or in a standalone alert-window as fallback.
     * @param object - Any object to print.
     * @param force - If set to "true" given input will be shown independently
     * of current logging configuration or interpreter's console
     * implementation.
     * @param avoidAnnotation - If set to "true" given input has no module or
     * log level specific annotations.
     * @param level - Description of log messages importance.
     * @param additionalArguments - Additional values to print.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */async log(object="",force=false,avoidAnnotation=false,level="info",...additionalArguments){const currentLevelIndex=LEVELS.indexOf(this.level);const levelIndex=LEVELS.indexOf(level);if(force||currentLevelIndex>=levelIndex){const messages=[];const annotation=`${LEVELS_COLOR[levelIndex]}${level}`+`${_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.default}:${this.name}:`+`${(new Date).toISOString()}:`;if(avoidAnnotation)messages.push(object);else if(typeof object==="string")messages.push(annotation,object,...additionalArguments);else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_2__/* .isNumeric */ .kf)(object)||typeof object==="boolean")messages.push(annotation,object.toString(),...additionalArguments);else{const multiLineAnnotation=annotation.substring(0,annotation.length-1);const lineLength=79-2;// Color codes are invisible so we have to add it.
const remainingLength=lineLength+LEVELS_COLOR[levelIndex].length+_cli_js__WEBPACK_IMPORTED_MODULE_0__/* .CLI_COLOR */ .l_.default.length-multiLineAnnotation.length;const halfRemainingLength=Math.floor(remainingLength/2);await this.log(`,${"-".repeat(halfRemainingLength)}`+multiLineAnnotation+"-".repeat(halfRemainingLength)+`${"-".repeat(remainingLength%2)},`,force,true,level);await this.log(object,force,true,level);await this.log(`'${"-".repeat(lineLength)}'`,force,true,level)}// NOTE: There is no native "console.critical" method.
const consoleMethodName=level==="critical"?"error":level;if(messages.length)/*
                    eslint-disable @typescript-eslint/no-unnecessary-condition
                */if(typeof process!=="undefined"&&process.stdout)/*
                    eslint-enable @typescript-eslint/no-unnecessary-condition
                */await new Promise((resolve,reject)=>{process.stdout.write(`${messages.map(String).join(" ")}\n`,error=>{if(error)/*
                                            eslint-disable
                                            prefer-promise-reject-errors
                                        */reject(error);/*
                                            eslint-enable
                                            prefer-promise-reject-errors
                                        */else resolve()})});else if(!(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.console&&consoleMethodName in _context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.console)||_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.console[consoleMethodName]===_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE){if(Object.prototype.hasOwnProperty.call(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz,"window")&&Object.prototype.hasOwnProperty.call(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.window,"alert"))_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.window?.alert(messages.join(" "))}else _context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.console[consoleMethodName](...messages)}}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */info(object="",...additionalArguments){return this.log(object,false,false,"info",...additionalArguments)}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */debug(object="",...additionalArguments){return this.log(object,false,false,"debug",...additionalArguments)}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */error(object="",...additionalArguments){return this.log(object,true,false,"error",...additionalArguments)}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */critical(object="",...additionalArguments){return this.log(object,true,false,"critical",...additionalArguments)}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */warn(object="",...additionalArguments){return this.log(object,false,false,"warn",...additionalArguments)}/**
     * Dumps a given object in a human-readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */static show(object,level=3,currentLevel=0){let output="";if((0,_object_js__WEBPACK_IMPORTED_MODULE_3__/* .determineType */ .Sj)(object)==="object"){for(const[key,value]of Object.entries(object)){output+=`${key}: `;if(currentLevel<=level)output+=Logger.show(value,level,currentLevel+1);else output+=String(value);output+="\n"}return output.trim()}output=String(object).trim();return`${output} (Type: "${(0,_object_js__WEBPACK_IMPORTED_MODULE_3__/* .determineType */ .Sj)(object)}")`}}_Logger=Logger;_defineProperty(Logger,"defaultLevel","warn");_defineProperty(Logger,"defaultName","app");_defineProperty(Logger,"selfClass",_Logger);_defineProperty(Logger,"instances",{});_defineProperty(Logger,"runtimeVersion",Math.random());/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logger);
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "Ay", 0, /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module array *//* !
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
 * Summarizes given property of given item list.
 * @param data - Array of objects with given property name.
 * @param propertyName - Property name to summarize.
 * @param defaultValue - Value to return if property values doesn't match.
 * @returns Aggregated value.
 */const aggregatePropertyIfEqual=(data,propertyName,defaultValue="")=>{let result=defaultValue;if(Array.isArray(data)&&data.length&&Object.prototype.hasOwnProperty.call(data[0],propertyName)){result=data[0][propertyName];for(const item of makeArray(data))if(item[propertyName]!==result)return defaultValue}return result};/**
 * Deletes every item witch has only empty attributes for given property names.
 * If given property names are empty each attribute will be considered. The
 * empty string, "null" and "undefined" will be interpreted as empty.
 * @param data - Data to filter.
 * @param propertyNames - Properties to consider.
 * @returns Given data without empty items.
 */const deleteEmptyItems=(data,propertyNames=[])=>{const result=[];for(const item of makeArray(data)){let empty=true;for(const[propertyName,value]of Object.entries(item))if(!["",null,undefined].includes(value)&&(!propertyNames.length||makeArray(propertyNames).includes(propertyName))){empty=false;break}if(!empty)result.push(item)}return result};/**
 * Extracts all properties from all items which occur in given property names.
 * @param data - Data where each item should be sliced.
 * @param propertyNames - Property names to extract.
 * @returns Data with sliced items.
 */const extract=(data,propertyNames)=>{const result=[];for(const item of makeArray(data)){const newItem={};for(const propertyName of makeArray(propertyNames))if(Object.prototype.hasOwnProperty.call(item,propertyName))newItem[propertyName]=item[propertyName];result.push(newItem)}return result};/**
 * Extracts all values which matches given regular expression.
 * @param data - Data to filter.
 * @param regularExpression - Pattern to match for.
 * @returns Filtered data.
 */const extractIfMatches=(data,regularExpression)=>{if(!regularExpression)return makeArray(data);const result=[];for(const value of makeArray(data))if((typeof regularExpression==="string"?new RegExp(regularExpression):regularExpression).test(value))result.push(value);return result};/**
 * Filters given data if given property is set or not.
 * @param data - Data to filter.
 * @param propertyName - Property name to check for existence.
 * @returns Given data without the items which doesn't have specified property.
 */const extractIfPropertyExists=(data,propertyName)=>{if(data&&propertyName){const result=[];for(const item of makeArray(data)){let exists=false;for(const[key,value]of Object.entries(item))if(key===propertyName&&![null,undefined].includes(value)){exists=true;break}if(exists)result.push(item)}return result}return data};/**
 * Extract given data where specified property value matches given patterns.
 * @param data - Data to filter.
 * @param propertyPattern - Mapping of property names to pattern.
 * @returns Filtered data.
 */const extractIfPropertyMatches=(data,propertyPattern)=>{if(data){const result=[];for(const item of makeArray(data)){let matches=true;for(const propertyName in propertyPattern)if(!(propertyPattern[propertyName]&&(typeof propertyPattern[propertyName]==="string"?new RegExp(propertyPattern[propertyName]):propertyPattern[propertyName]).test(item[propertyName]))){matches=false;break}if(matches)result.push(item)}return result}return data};/**
 * Determines all objects which exists in "first" and in "second".
 * Object key which will be compared are given by "keys". If an empty array is
 * given each key will be compared. If an object is given corresponding initial
 * data key will be mapped to referenced new data key.
 * @param first - Referenced data to check for.
 * @param second - Data to check for existence.
 * @param keys - Keys to define equality.
 * @param strict - The strict parameter indicates whether "null" and
 * "undefined" should be interpreted as equal (takes only effect if given keys
 * aren't empty).
 * @returns Data which does exit in given initial data.
 */const intersect=(first,second,keys=[],strict=true)=>{const containingData=[];second=makeArray(second);const intersectItem=(firstItem,secondItem,firstKey,secondKey,keysAreAnArray,iterateGivenKeys)=>{if(iterateGivenKeys){if(keysAreAnArray)firstKey=secondKey}else secondKey=firstKey;if(secondItem[secondKey]!==firstItem[firstKey]&&(strict||!([null,undefined].includes(secondItem[secondKey])&&[null,undefined].includes(firstItem[firstKey]))))return false};for(const firstItem of makeArray(first))if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(firstItem))for(const secondItem of second){let exists=true;let iterateGivenKeys;const keysAreAnArray=Array.isArray(keys);if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_1__/* .isPlainObject */ .Qd)(keys)||keysAreAnArray&&keys.length)iterateGivenKeys=true;else{iterateGivenKeys=false;keys=firstItem}if(Array.isArray(keys)){let index=0;for(const key of keys){if(intersectItem(firstItem,secondItem,index,key,keysAreAnArray,iterateGivenKeys)===false){exists=false;break}index+=1}}else for(const[key,value]of Object.entries(keys))if(intersectItem(firstItem,secondItem,key,value,keysAreAnArray,iterateGivenKeys)===false){exists=false;break}if(exists){containingData.push(firstItem);break}}else if(second.includes(firstItem))containingData.push(firstItem);return containingData};/**
 * Converts given object into an array.
 * @param object - Target to convert.
 * @returns Generated array.
 */const makeArray=object=>{const result=[];if(![null,undefined].includes(object))if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_1__/* .isArrayLike */ .Xj)(Object(object)))merge(result,typeof object==="string"?[object]:object);else result.push(object);return result};/**
 * Creates a list of items within given range.
 * @param range - Array of lower and upper bounds. If only one value is given
 * lower bound will be assumed to be zero. Both integers have to be positive
 * and will be contained in the resulting array. If more than two numbers are
 * provided given range will be returned.
 * @param step - Space between two consecutive values.
 * @param ignoreLastStep - Removes last step.
 * @returns Produced array of integers.
 */const makeRange=(range,step=1,ignoreLastStep=false)=>{range=[].concat(range);let index;let higherBound;if(range.length===1){index=0;higherBound=parseInt(String(range[0]),10)}else if(range.length===2){index=parseInt(String(range[0]),10);higherBound=parseInt(String(range[1]),10)}else return range;if(higherBound<index)return[];const result=[index];while(index<=higherBound-step){index+=step;if(!ignoreLastStep||index<=higherBound-step)result.push(index)}return result};/**
 * Merge the contents of two arrays together into the first array.
 * @param target - Target array.
 * @param source - Source array.
 * @returns Target array with merged given source one.
 */const merge=(target,source)=>{if(!Array.isArray(source))source=Array.prototype.slice.call(source);for(const value of source)target.push(value);return target};/**
 * Generates a list if pagination symbols to render a pagination from.
 * @param options - Configure bounds and current page of pagination to
 * determine.
 * @param options.boundaryCount - Indicates where to start pagination within
 * given total range.
 * @param options.disabled - Indicates whether to disable all items.
 * @param options.hideNextButton - Indicates whether to show a jump to next
 * item.
 * @param options.hidePrevButton - Indicates whether to show a jump to previous
 * item.
 * @param options.page - Indicates current visible page.
 * @param options.pageSize - Number of items per page.
 * @param options.showFirstButton - Indicates whether to show a jump to first
 * item.
 * @param options.showLastButton - Indicates whether to show a jump to last
 * item.
 * @param options.siblingCount - Number of sibling page symbols next to current
 * page symbol.
 * @param options.total - Number of all items to paginate.
 * @returns A list of pagination symbols.
 */const paginate=(options={})=>{const{boundaryCount=1,disabled=false,hideNextButton=false,hidePrevButton=false,page=1,pageSize=5,showFirstButton=false,showLastButton=false,siblingCount=4,total=100}=options;const numberOfPages=typeof pageSize==="number"&&!isNaN(pageSize)?Math.ceil(total/pageSize):total;const startPages=makeRange([1,Math.min(boundaryCount,numberOfPages)]);const endPages=makeRange([Math.max(numberOfPages-boundaryCount+1,boundaryCount+1),numberOfPages]);const siblingsStart=Math.max(Math.min(// Left boundary for lower pages.
page-siblingCount,// Lower boundary for higher pages.
numberOfPages-boundaryCount-siblingCount*2-1),// If number is greater than number of "startPages".
boundaryCount+2);const siblingsEnd=Math.min(Math.max(// Right bound for higher pages.
page+siblingCount,// Upper boundary for lower pages.
boundaryCount+siblingCount*2+2),// If number is less than number of "endPages".
endPages.length>0?endPages[0]-2:numberOfPages-1);/*
        Symbol list of items to render represent as pagination.

        Example result:

        [
            'first', 'previous',
            1,
            'start-ellipsis',
            4, 5, 6,
            'end-ellipsis',
            10,
            'next', 'last'
        ]
    */return[...(showFirstButton?["first"]:[]),...(hidePrevButton?[]:["previous"]),...startPages,// Start ellipsis
...(siblingsStart>boundaryCount+2?["start-ellipsis"]:boundaryCount+1<numberOfPages-boundaryCount?[boundaryCount+1]:[]),// Sibling pages
...makeRange([siblingsStart,siblingsEnd]),// End ellipsis
...(siblingsEnd<numberOfPages-boundaryCount-1?["end-ellipsis"]:numberOfPages-boundaryCount>boundaryCount?[numberOfPages-boundaryCount]:[]),...endPages,...(hideNextButton?[]:["next"]),...(showLastButton?["last"]:[])].map(item=>typeof item==="number"?{disabled,page:item,selected:item===page,type:"page"}:{disabled:disabled||item.indexOf("ellipsis")===-1&&(item==="next"||item==="last"?page>=numberOfPages:page<=1),selected:false,type:item,...(item.endsWith("-ellipsis")?{}:{page:{first:1,last:numberOfPages}[item]??item==="next"?Math.min(page+1,numberOfPages):// NOTE: Is "previous" type.
Math.max(page-1,1)})})};/**
 * Generates all permutations of given iterable.
 * @param data - Array like object.
 * @returns Array of permuted arrays.
 */const permute=data=>{const result=[];const permute=(currentData,dataToMixin=[])=>{if(currentData.length===0)result.push(dataToMixin);else for(let index=0;index<currentData.length;index++){const copy=currentData.slice();permute(copy,dataToMixin.concat(copy.splice(index,1)))}};permute(data);return result};/**
 * Generates all lengths permutations of given iterable.
 * @param data - Array like object.
 * @param minimalSubsetLength - Defines how long the minimal subset length
 * should be.
 * @returns Array of permuted arrays.
 */const permuteLength=(data,minimalSubsetLength=1)=>{const result=[];if(data.length===0)return result;const generate=(index,source,rest)=>{if(index===0){if(rest.length>0)result[result.length]=rest;return}for(let sourceIndex=0;sourceIndex<source.length;sourceIndex++)generate(index-1,source.slice(sourceIndex+1),rest.concat([source[sourceIndex]]))};for(let index=minimalSubsetLength;index<data.length;index++)generate(index,data,[]);result.push(data);return result};/**
 * Removes given target on given list.
 * @param list - Array to splice.
 * @param target - Target to remove from given list.
 * @param strict - Indicates whether to fire an exception if given target
 * doesn't exist given list.
 * @returns Item with the appended target.
 */const removeArrayItem=(list,target,strict=false)=>{const index=list.indexOf(target);if(index===-1){if(strict)throw new Error(`Given target doesn't exists in given list.`)}else list.splice(index,1);return list};/**
 * Sorts given object of dependencies in a topological order.
 * @param items - Items to sort.
 * @returns Sorted array of given items respecting their dependencies.
 */const sortTopological=items=>{const edges=[];for(const[name,value]of Object.entries(items)){items[name]=[].concat(value);if(value.length>0)for(const dependencyName of makeArray(value))edges.push([name,dependencyName]);else edges.push([name])}const nodes=[];// Accumulate unique nodes into a large list.
for(const edge of edges)for(const node of edge)if(!nodes.includes(node))nodes.push(node);const sorted=[];// Define a visitor function that recursively traverses dependencies.
const visit=(node,predecessors)=>{// Check if a node is dependent of itself.
if(predecessors.length!==0&&predecessors.includes(node))throw new Error(`Cyclic dependency found. "${node}" is dependent of `+"itself.\n"+`Dependency chain: "${predecessors.join("\" -> \"")}" => "`+`${node}".`);const index=nodes.indexOf(node);// If the node still exists, traverse its dependencies.
if(index!==-1){let copy;// Mark the node to exclude it from future iterations.
nodes[index]=null;/*
                Loop through all edges and follow dependencies of the current
                node
            */for(const edge of edges)if(edge[0]===node){/*
                        Lazily create a copy of predecessors with the current
                        node concatenated onto it.
                    */copy=copy||predecessors.concat([node]);// Recursively traverse to node dependencies.
visit(edge[1],copy)}sorted.push(node)}};for(let index=0;index<nodes.length;index++){const node=nodes[index];// Ignore nodes that have been excluded.
if(node){// Mark the node to exclude it from future iterations.
nodes[index]=null;/*
                Loop through all edges and follow dependencies of the current
                node.
            */for(const edge of edges)if(edge[0]===node)// Recursively traverse to node dependencies.
visit(edge[1],[node]);sorted.push(node)}}return sorted};/**
 * Sums up given property of given item list.
 * @param data - The objects with specified property to sum up.
 * @param propertyName - Property name to sum up its value.
 * @returns The aggregated value.
 */const sumUpProperty=(data,propertyName)=>{let result=0;if(Array.isArray(data)&&data.length)for(const item of data)if(Object.prototype.hasOwnProperty.call(item,propertyName))result+=parseFloat(item[propertyName]||0);return result};/**
 * Makes all values in given iterable unique by removing duplicates (The first
 * occurrences will be left).
 * @param data - Array like object.
 * @returns Sliced version of given object.
 */const unique=data=>{const result=[];for(const value of makeArray(data))if(!result.includes(value))result.push(value);return result};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "Am", 0, /* binding */ unique,
/* harmony export */   "En", 0, /* binding */ paginate,
/* harmony export */   "Hb", 0, /* binding */ removeArrayItem,
/* harmony export */   "Ht", 0, /* binding */ extractIfPropertyMatches,
/* harmony export */   "Ny", 0, /* binding */ permute,
/* harmony export */   "QR", 0, /* binding */ makeRange,
/* harmony export */   "ST", 0, /* binding */ aggregatePropertyIfEqual,
/* harmony export */   "UX", 0, /* binding */ sortTopological,
/* harmony export */   "_2", 0, /* binding */ sumUpProperty,
/* harmony export */   "bH", 0, /* binding */ permuteLength,
/* harmony export */   "dO", 0, /* binding */ deleteEmptyItems,
/* harmony export */   "gv", 0, /* binding */ makeArray,
/* harmony export */   "h1", 0, /* binding */ merge,
/* harmony export */   "o6", 0, /* binding */ extract,
/* harmony export */   "q6", 0, /* binding */ extractIfPropertyExists,
/* harmony export */   "u7", 0, /* binding */ extractIfMatches,
/* harmony export */   "y$", 0, /* binding */ intersect
/* harmony export */ ]);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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
*//**
 * Determines all parameter names from given callable (function or class,
 * ...).
 * @param callable - Function or function code to inspect.
 * @returns List of parameter names.
 */const getParameterNames=callable=>{const functionCode=(typeof callable==="string"?callable:// Strip comments.
callable.toString()).replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,"");if(functionCode.startsWith("class"))return getParameterNames("function "+functionCode.replace(/.*(constructor\([^)]+\))/m,"$1"));// Try classic function declaration.
let parameter=/^function\s*[^(]*\(\s*([^)]*)\)/m.exec(functionCode);if(parameter===null)// Try arrow function declaration.
parameter=/^[^(]*\(\s*([^)]*)\) *=>.*/m.exec(functionCode);if(parameter===null)// Try one argument and without brackets arrow function declaration.
parameter=/([^= ]+) *=>.*/m.exec(functionCode);const names=[];if(parameter&&parameter.length>1&&parameter[1].trim().length){for(const name of parameter[1].split(","))// Remove default parameter values.
names.push(name.replace(/=.+$/g,"").trim());return names}return names};/**
 * Implements the identity function.
 * @param value - A value to return.
 * @returns Returns the given value.
 */const identity=value=>value;/**
 * Inverted filter helper to inverse each given filter.
 * @param filter - A function that filters an array.
 * @returns The inverted filter.
 */const invertArrayFilter=filter=>{return(data,...additionalParameter)=>{if(Array.isArray(data)){const filteredData=filter(data,...additionalParameter);let result=[];if(filteredData.length){for(const date of data)if(!filteredData.includes(date))result.push(date)}else result=data;return result}return data}};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "D_", 0, /* binding */ identity,
/* harmony export */   "Gj", 0, /* binding */ getParameterNames,
/* harmony export */   "gH", 0, /* binding */ invertArrayFilter
/* harmony export */ ]);


/***/ }),
/* 17 */
/***/ ((__webpack_module__, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(__webpack_module__, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _src_test_expression_evaluators_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(18);
/* harmony import */ var _src_test_expression_helper_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(21);
/* harmony import */ var _src_test_expression_indicator_functions_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(22);
/* harmony import */ var _src_test_Lock_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(23);
/* harmony import */ var _src_test_Logger_ts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* harmony import */ var _src_test_Semaphore_ts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(25);
/* harmony import */ var _src_test_array_ts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var _src_test_context_ts__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(27);
/* harmony import */ var _src_test_cookie_ts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(28);
/* harmony import */ var _src_test_data_transfer_ts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(32);
/* harmony import */ var _src_test_datetime_ts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(33);
/* harmony import */ var _src_test_domNode_ts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(34);
/* harmony import */ var _src_test_filesystem_ts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(35);
/* harmony import */ var _src_test_function_ts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(36);
/* harmony import */ var _src_test_indicators_ts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(37);
/* harmony import */ var _src_test_module_ts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(38);
/* harmony import */ var _src_test_number_ts__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(39);
/* harmony import */ var _src_test_object_ts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(40);
/* harmony import */ var _src_test_process_ts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(41);
/* harmony import */ var _src_test_property_types_ts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(42);
/* harmony import */ var _src_test_scope_ts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(43);
/* harmony import */ var _src_test_string_ts__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(44);
/* harmony import */ var _src_test_utility_ts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(45);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_src_test_cookie_ts__WEBPACK_IMPORTED_MODULE_8__, _src_test_indicators_ts__WEBPACK_IMPORTED_MODULE_14__]);
([_src_test_cookie_ts__WEBPACK_IMPORTED_MODULE_8__, _src_test_indicators_ts__WEBPACK_IMPORTED_MODULE_14__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
























__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: ./src/indicators.ts
var indicators = __webpack_require__(3);
// EXTERNAL MODULE: ./src/object.ts
var object = __webpack_require__(4);
// EXTERNAL MODULE: ./src/expression/indicator-functions.ts
var indicator_functions = __webpack_require__(13);
;// ./src/expression/evaluators.ts
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
*/const SELECTOR_KEY_NAMES=new Set(["name"]);const NO_ITEM_FOUND_SYMBOL=Symbol.for("EXPRESSION_EVALUATOR_NO_ITEM_FOUND");const DEFAULT_OPTIONS={skipMissingLevel:false,contextReplacements:{},delimiter:"."};const addBracketBasedPathElements=subParts=>{const path=[];// NOTE: We add index assignments into path array.
for(const subPart of subParts){const openingBracketPosition=subPart.indexOf("[");if(openingBracketPosition>0)path.push(subPart.substring(0,openingBracketPosition));// Trim bracket padding "[index]" => "index".
path.push(subPart.substring(openingBracketPosition+1,subPart.length-1))}return path};const normalizeSelector=(selector,givenOptions={})=>{const options={...DEFAULT_OPTIONS,scope:{},...givenOptions};const path=[];for(const component of[].concat(selector))if(typeof component==="string"){const parts=component.split(options.delimiter);for(let part of parts){if(!part)continue;if((0,indicators/* isFunction */.Tn)(part)){path.push(part);continue}// Identify bracket based selectors like "[index]".
const openingBracketPosition=part.indexOf("[");let restPart=part;if(openingBracketPosition!==-1){restPart=part.substring(openingBracketPosition);part=part.substring(0,openingBracketPosition)}if(Object.prototype.hasOwnProperty.call(options.contextReplacements,part))path.push(...normalizeSelector(options.contextReplacements[part],options));else path.push(part);if(restPart!==part){// Trim bracket padding "[index]" => "index".
const subParts=restPart.match(/[^[]*\[\d+]/g);path.push(...addBracketBasedPathElements(subParts))}}}else path.push(evaluateExpression(component,options.scope,options));return path};const selectArrayItem=(data,keyOrIndex)=>{// Assume that an array item should be found by its property name.
for(const item of data)for(const selectorKeyName of SELECTOR_KEY_NAMES)if(Object.prototype.hasOwnProperty.call(item,selectorKeyName)&&item[selectorKeyName]===keyOrIndex)return item;return NO_ITEM_FOUND_SYMBOL};/**
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
 */const evaluateSelectorUntilLastObject=(selector,scope={},givenOptions={})=>{const options={...DEFAULT_OPTIONS,...givenOptions};/*
        Create a list of keys or indexes to retrieve specified value from given
        object.
    */const path=normalizeSelector(selector,{...options,scope});// Dig into given scope for each previously found key or index.
let result=scope;let index=0;for(const keyOrIndex of path){const isLastPart=index===path.length-1;if((0,indicators/* isObject */.Gv)(result)){if(Array.isArray(result)&&typeof keyOrIndex==="string"&&isNaN(parseInt(keyOrIndex))){const item=selectArrayItem(result,keyOrIndex);if(item!==NO_ITEM_FOUND_SYMBOL){if(isLastPart)return typeof keyOrIndex==="number"?[result,keyOrIndex]:[result,result.indexOf(item)];result=item}}else if(isLastPart)return[result,keyOrIndex];else if((0,indicators/* isFunction */.Tn)(keyOrIndex))result=keyOrIndex(result);else if(Object.prototype.hasOwnProperty.call(result,keyOrIndex))result=result[keyOrIndex];else if(!options.skipMissingLevel)return[result,keyOrIndex]}else if(isLastPart)return[result,keyOrIndex];else if(!options.skipMissingLevel)return[result,keyOrIndex];index+=1}return[{},""]};/**
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
 */const evaluateSelector=(selector,scope={},options={})=>{const[lastObject,lastKey]=evaluateSelectorUntilLastObject(selector,scope,options);if(lastKey==="")return scope;if((0,indicators/* isFunction */.Tn)(lastKey))return lastKey(lastObject);if(Object.prototype.hasOwnProperty.call(lastObject,lastKey))return lastObject[lastKey];return options.skipMissingLevel?lastObject:undefined};const evaluateCondition=(condition,scope,options)=>{const value1=evaluateExpression(condition.value1,scope,options);const value2=evaluateExpression(condition.value2,scope,options);switch(condition.$comparator){case"==":return (0,object/* equals */.aI)(value1,value2);case"!=":return!(0,object/* equals */.aI)(value1,value2);case"<":return value1<value2;case"<=":return value1<=value2;case">":return value1>value2;case">=":return value1>=value2}};const evaluateOperation=(operation,scope,options)=>{const operand1=evaluateExpression(operation.operand1,scope,options);const operand2=evaluateExpression(operation.operand2,scope,options);switch(operation.$operator){case"+":return operand1+operand2;case"-":return operand1-operand2;case"*":return operand1*operand2;case"**":return operand1**operand2;case"/":return operand1/operand2}};const evaluateUnaryOperation=(operation,scope,options)=>{const operand=evaluateExpression(operation.operand,scope,options);switch(operation.$operator){case"!":return!operand;case"!!":return Boolean(operand)}};const evaluateOptionalThen=(expression,scope,options)=>{if(typeof expression.then==="undefined")return undefined;return evaluateExpression(expression.then,scope,options)};const evaluateIf=(expression,scope,options)=>{if(evaluateExpression(expression.$if,scope,options))return evaluateOptionalThen(expression,scope,options);return typeof expression.else==="undefined"?undefined:evaluateExpression(expression.else,scope)};const evaluateSwitch=(expression,scope,options)=>{const value=evaluateExpression(expression.$switch,scope);for(const caseExpression of expression.caseExpressions)if(value===evaluateExpression(caseExpression.$case,scope,options))return evaluateOptionalThen(caseExpression,scope,options);if(typeof expression.default!=="undefined")return evaluateExpression(expression.default,scope,options);return undefined};const evaluateAnd=(expression,scope,options)=>{for(const condition of expression.$and)if(!evaluateExpression(condition,scope,options))return false;return true};const evaluateOr=(expression,scope,options)=>{for(const condition of expression.$or)if(evaluateExpression(condition,scope,options))return true;return false};const evaluateConcat=(expression,scope,options)=>{let result=[];let isArray=false;for(const item of expression.$concat){const value=evaluateExpression(item,scope,options);if(Array.isArray(value))isArray=true;result=result.concat(value)}return isArray?result:result.join("")};const evaluateMapping=(expression,scope,options)=>{const givenData=evaluateExpression(expression.data,scope,options);let normalizedGivenData=[];if(Array.isArray(givenData))normalizedGivenData=givenData;else for(const[key,value]of Object.entries(givenData))normalizedGivenData.push({...value,$key:key});const result=[];for(const item of normalizedGivenData){const value={};for(const[sourceName,targetName]of Object.entries(expression.$mapping))if(Object.prototype.hasOwnProperty.call(item,sourceName))value[targetName]=item[sourceName];result.push(value)}return result};const evaluateArrayContains=(expression,scope,options)=>{let array=scope;if(expression.$arrayContains.target!=null)array=evaluateExpression(expression.$arrayContains.target,scope,options);const value=evaluateExpression(expression.$arrayContains.value,scope,options);const key=evaluateExpression(expression.$arrayContains.key,scope,options);if(!Array.isArray(array))return false;return array.some(item=>{if(typeof key==="string"&&(0,indicators/* isPlainObject */.Qd)(item)&&Object.prototype.hasOwnProperty.call(item,key)){const record=item;return record[key]===value}return item===value})};function evaluateExpression(expression,scope={},options={}){if((0,indicator_functions/* isSelector */.cB)(expression))return evaluateSelector(expression.$select,scope,options);if((0,indicator_functions/* isCondition */.G3)(expression))return evaluateCondition(expression,scope,options);if((0,indicator_functions/* isUnaryOperation */.bF)(expression))return evaluateUnaryOperation(expression,scope,options);if((0,indicator_functions/* isOperation */.YG)(expression))return evaluateOperation(expression,scope,options);if((0,indicator_functions/* isOrExpression */.g6)(expression))return evaluateOr(expression,scope,options);if((0,indicator_functions/* isAndExpression */.Gc)(expression))return evaluateAnd(expression,scope,options);if((0,indicator_functions/* isConcatExpression */.HK)(expression))return evaluateConcat(expression,scope,options);if((0,indicator_functions/* isMappingExpression */.Z9)(expression))return evaluateMapping(expression,scope,options);if((0,indicator_functions/* isIfExpression */.MP)(expression))return evaluateIf(expression,scope,options);if((0,indicator_functions/* isSwitchExpression */.$y)(expression))return evaluateSwitch(expression,scope,options);if((0,indicator_functions/* isArrayContainsExpression */.ZI)(expression))return evaluateArrayContains(expression,scope,options);return expression}/* harmony default export */ const evaluators = (evaluateExpression);
;// ./src/expression/index.ts
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
*/const expression_evaluateExpression=evaluators;/* harmony default export */ const expression = (expression_evaluateExpression);
// EXTERNAL MODULE: ./src/test-helper.ts
var test_helper = __webpack_require__(6);
;// ./src/test/expression/evaluators.ts
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
*/(0,globals_.describe)("Evaluators",()=>{(0,test_helper/* testEach */.oN)("evaluates values",expression,[false,false],[true,true],[0,0],[5,5],[Infinity,Infinity],[null,null],["",""],["value","value"],[[],[]],[[1],[1]],[[1,2],[1,2]],[[{},1,2],[{},1,2]],[[undefined,"Hello",{$if:{}}],[undefined,"Hello",{$if:{}}]],[{},{}],[{a:2},{a:2}]);(0,test_helper/* testEach */.oN)("normalizeSelector",normalizeSelector,[[],""],[[],"",{scope:{}}],[["key"],"key",{scope:{}}],[["a","b"],"a.b",{scope:{}}],[["a","b","1"],"a.b[1]"],[["a","b"],"this",{contextReplacements:{this:["a","b"]}}],[["a","b","c","0","d"],"this.c.0.d",{contextReplacements:{this:["a","b"]}}],[["a","b","0","0","d"],"this[0].0.d",{contextReplacements:{this:["a","b"]}}],[["a","b"],"thisParent",{contextReplacements:{thisParent:["a","b"]}}],[["a","b","c","0","d"],"thisParent.c.0.d",{contextReplacements:{thisParent:["a","b"]}}],[["a","b","0","0","d"],"thisParent[0].0.d",{contextReplacements:{thisParent:["a","b"]}}]);(0,test_helper/* testEach */.oN)("evaluateSelectorUntilLastObject",evaluateSelectorUntilLastObject,[[{},""],""],[[{},""],"",{}],[[[0],"1"],"1",[0]],[[[0],"1"],"a.1",{a:[0]}],[[{a:"A",b:"B"},"b"],"sub.b",{sub:{a:"A",b:"B"}}],[[{a:"A",b:"B"},"b"],"sub.b",{sub:{a:"A",b:"B"}}],[[{},"notExisting"],"notExisting",{}],[[{},"sub"],"sub.notExisting",{}],[[{},"notExisting"],"sub.notExisting",{},{skipMissingLevel:true}]);(0,test_helper/* testEach */.oN)("evaluateSelector",evaluateSelector,[{},[],{}],[undefined,["notExisting"],{}],[{},["notExisting"],{},{skipMissingLevel:true}],[{},[""],{}],[{},"",{}],[1,["a"],{a:1}],[null,"a.a",{a:{a:null}}],[[],"a.a",{a:{a:[]}}],[3,["a","b.c"],{a:{b:{c:3}}}],[3,["a","b.c[0]"],{a:{b:{c:[3]}}}],[3,["a","b/c[0]"],{a:{b:{c:[3]}}},{delimiter:"/"}],[3,["","a","","b.c[0]","",""],{a:{b:{c:[3]}}}],[3,root=>root.a.b.c[1],{a:{b:{c:[1,3,2]}}}],[3,["a",root=>root.b.c[1]],{a:{b:{c:[1,3,2]}}}]);(0,test_helper/* testEach */.oN)("evaluateSelectorExpression",expression,[5,{$select:"key"},{key:5}],[2,{$select:"a.b.c"},{a:{b:{c:2}}}],[2,{$select:"this.c"},{a:{b:{c:2}}},{contextReplacements:{this:["a","b"]}}],[2,{$select:"thisParent.c"},{a:{b:{c:2}}},{contextReplacements:{thisParent:["a","b"]}}],[undefined,{$select:"a.b.c.d"},{a:{b:{c:2}}}],[{a:2},{$select:""},{a:2}],[1,{$select:"a[0]"},{a:[1,2]}],[2,{$select:"a[0][1]"},{a:[[1,2]]}],["deep",{$select:"a[0][1][0].b[0][1]"},{a:[[0,[{b:[[1,"deep"]]}]]]}],[2,{$select:"a[1]"},{a:[1,2]}],[undefined,{$select:"a[2]"},{a:[1,2]}],[2,{$select:"a.b.c[1]"},{a:{b:{c:[1,2]}}}],[2,{$select:"a.b.c.1"},{a:{b:{c:[1,2]}}}],[undefined,{$select:"a.b.c.1"},{a:{b:{}}}],[1,{$select:"a.b b.c"},{a:{"b b":{c:1}}}],["dynamically selected",{$select:["a",{$select:"keyB"}]},{a:{b:"dynamically selected"},keyB:"b"}],["dynamically selected",{$select:["a",{$select:"this"}]},{a:{b:"dynamically selected"},keyB:"b"},{contextReplacements:{this:["keyB"]}}],["dynamically selected",{$select:["a",{$select:"thisParent"}]},{a:{b:"dynamically selected"},keyB:"b"},{contextReplacements:{thisParent:["keyB"]}}],["dynamically selected",{$select:["a","b",{$select:"key.of.c"}]},{a:{b:{c:"dynamically selected"}},key:{of:{c:"c"}}}],["dynamically selected",{$select:["a","b",{$select:"key.this.c"}]},{a:{b:{c:"dynamically selected"}},key:{of:{c:"c"}}},{contextReplacements:{this:"of"}}],["dynamically selected",{$select:["a","b",{$if:true,then:"this"}]},{a:{b:{this:"dynamically selected"}}},{contextReplacements:{this:"of"}}],["dynamically selected",{$select:["a","b",{$select:"key.thisParent.c"}]},{a:{b:{c:"dynamically selected"}},key:{of:{c:"c"}}},{contextReplacements:{thisParent:"of"}}],["dynamically selected",{$select:["a","b",{$if:true,then:"thisParent"}]},{a:{b:{thisParent:"dynamically selected"}}},{contextReplacements:{thisParent:"of"}}],[5,{$select:"a.b.c"},{a:[{name:"b",c:5}]}],[4,{$select:"a.b.c.d"},{a:[{name:"b",c:{d:4}}]}],[5,{$select:"a.b"},[{name:"a",b:5}]],[4,{$select:"a.b.c.d"},[{name:"a",b:[{name:"c",d:4}]}]]);SELECTOR_KEY_NAMES.add("headline");(0,globals_.expect)(expression({$select:"a.b.c.d"},[{headline:"a",b:[{name:"c",d:4}]}])).toStrictEqual(4);SELECTOR_KEY_NAMES.delete("headline");const nestedObject={name:"From",value:"target"};(0,globals_.expect)(expression({$select:"MappingGroup.children.Mapping.children.From"},[{name:"BasicInformationGroup"},{name:"ConfigurationGroup"},{name:"MappingGroup",children:[{name:"Mapping",children:[{name:"From",value:"target"}]}]},{name:"MappingGroup",children:[{name:"Mapping",children:[nestedObject]}]}])).toStrictEqual(nestedObject);(0,test_helper/* testEach */.oN)("evaluate condition expressions",expression,[true,{value1:1,$comparator:"==",value2:1}],[false,{value1:1,$comparator:"!=",value2:1}],[true,{value1:true,$comparator:"==",value2:true}],[true,{value1:true,$comparator:"==",value2:{operand:false,$operator:"!"}}],[true,{value1:{},$comparator:"==",value2:{}}],[true,{value1:[],$comparator:"==",value2:[]}],[false,{value1:{a:1},$comparator:"==",value2:{a:1,b:1}}],[false,{value1:{a:1,b:1},$comparator:"==",value2:{a:1}}],[true,{value1:{a:1},$comparator:"==",value2:{a:1}}],[false,{value1:[1],$comparator:"==",value2:[]}],[true,{value1:[1],$comparator:"==",value2:[1]}],[false,{value1:new Map([["a",1]]),$comparator:"==",value2:new Map([["a",1],["b",1]])}],[false,{value1:new Map([["a",1],["b",1]]),$comparator:"==",value2:new Map([["a",1]])}],[true,{value1:new Map([["a",1]]),$comparator:"==",value2:new Map([["a",1]])}],[false,{value1:new Set(["a"]),$comparator:"==",value2:new Set(["a","b"])}],[false,{value1:new Set(["a","b"]),$comparator:"==",value2:new Set(["a"])}],[true,{value1:new Set(["a"]),$comparator:"==",value2:new Set(["a"])}]);(0,test_helper/* testEach */.oN)("evaluate operator expressions",expression,[true,{operand:false,$operator:"!"}],[false,{operand:true,$operator:"!"}],[true,{operand:true,$operator:"!!"}],[true,{operand:0,$operator:"!"}],[false,{operand:1,$operator:"!"}],[false,{operand:0,$operator:"!!"}],[true,{operand:1,$operator:"!!"}],[0,{operand1:0,$operator:"+",operand2:0}],[1,{operand1:0,$operator:"+",operand2:1}],[2,{operand1:1,$operator:"+",operand2:1}],[0,{operand1:0,$operator:"-",operand2:0}],[-1,{operand1:0,$operator:"-",operand2:1}],[1,{operand1:2,$operator:"-",operand2:1}],[0,{operand1:0,$operator:"*",operand2:0}],[0,{operand1:0,$operator:"*",operand2:1}],[6,{operand1:2,$operator:"*",operand2:3}],[0,{operand1:0,$operator:"/",operand2:1}],[1,{operand1:1,$operator:"/",operand2:1}],[2,{operand1:4,$operator:"/",operand2:2}],[0,{operand1:0,$operator:"**",operand2:1}],[1,{operand1:1,$operator:"**",operand2:1}],[8,{operand1:2,$operator:"**",operand2:3}]);(0,test_helper/* testEach */.oN)("evaluate if expressions",expression,// == true (then branch)
[true,{$if:{value1:5,$comparator:"==",value2:5},then:true}],[undefined,{$if:{value1:5,$comparator:"==",value2:5}}],[true,{$if:{value1:0,$comparator:"==",value2:0},then:true}],[true,{$if:{value1:false,$comparator:"==",value2:false},then:true}],[true,{$if:{value1:true,$comparator:"==",value2:true},then:true}],// == false (else branch)
[false,{$if:{value1:5,$comparator:"==",value2:2},else:false}],[false,{$if:{value1:0,$comparator:"==",value2:2},else:false}],[false,{$if:{value1:false,$comparator:"==",value2:true},else:false}],[false,{$if:{value1:false,$comparator:"==",value2:true},else:false}],// !=
[true,{$if:{value1:2,$comparator:"!=",value2:5},then:true}],[true,{$if:{value1:2,$comparator:"!=",value2:0},then:true}],[false,{$if:{value1:false,$comparator:"!=",value2:false},else:false}],[false,{$if:{value1:true,$comparator:"!=",value2:true},else:false}],// < and >
[true,{$if:{value1:2,$comparator:"<",value2:5},then:true}],[false,{$if:{value1:0,$comparator:"<",value2:0},else:false}],[false,{$if:{value1:2,$comparator:">",value2:5},else:false}],[true,{$if:{value1:5,$comparator:">",value2:2},then:true}],// <= and >=
[true,{$if:{value1:2,$comparator:"<=",value2:5},then:true}],[true,{$if:{value1:0,$comparator:"<=",value2:0},then:true}],[false,{$if:{value1:2,$comparator:">=",value2:5},else:false}],[true,{$if:{value1:5,$comparator:">=",value2:2},then:true}],// with $select
[true,{$if:{value1:{$select:"a"},$comparator:"==",value2:5},then:true},{a:5}],[true,{$if:{value1:{$select:"a"},$comparator:"==",value2:{$select:"a"}},then:true},{a:5}],[false,{$if:{value1:{$select:"a"},$comparator:"==",value2:2},else:false},{a:5}],[false,{$if:{value1:{$select:"a"},$comparator:"==",value2:{$select:"b"}},else:false},{a:5}],["then value",{$if:{value1:{$select:"a"},$comparator:"==",value2:5},then:"then value"},{a:5}],[5,{$if:{value1:{$select:"a"},$comparator:"==",value2:{$select:"a"}},then:{$select:"a"}},{a:5}]);(0,test_helper/* testEach */.oN)("evaluate switch case default expressions",expression,["then value",{$switch:{$select:"a"},caseExpressions:[{$case:5,then:"then value"}]},{a:5}],[true,{$switch:5,caseExpressions:[{$case:5,then:true}]}],[undefined,{$switch:2,caseExpressions:[{$case:5,then:true}]}],[false,{$switch:2,caseExpressions:[{$case:5}],default:false}],["fallback value",{$switch:2,caseExpressions:[{$case:5}],default:"fallback value"}],["second case",{$switch:true,caseExpressions:[{$case:5},{$case:{value1:2,$comparator:"<",value2:5},then:"second case"}],default:"fallback value"}],["then value",{$switch:true,caseExpressions:[{$case:5},{$case:{value1:2,$comparator:"<",value2:5},then:"then value"}],default:"fallback value"}],["first case",{$switch:5,caseExpressions:[{$case:5,then:"first case"},{$case:5,then:"second case"}],default:"fallback value"}],["then value",{$switch:true,caseExpressions:[{$case:{value1:2,$comparator:">",value2:5}},{$case:{value1:2,$comparator:"==",value2:5}},{$case:{value1:1,$comparator:"!=",value2:1}},{$case:{value1:true,$comparator:"!=",value2:false},then:"then value"}],default:"fallback value"}],["fallback value",{$switch:true,caseExpressions:[{$case:{value1:2,$comparator:">",value2:5}},{$case:{value1:2,$comparator:"==",value2:5},then:"then value"},{$case:{value1:1,$comparator:"!=",value2:1}},{$case:{value1:true,$comparator:"==",value2:false}}],default:"fallback value"}]);(0,test_helper/* testEach */.oN)("evaluate and expressions",expression,[true,{$and:[{value1:{$select:"a"},$comparator:"==",value2:5}]},{a:5}],[true,{$and:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"==",value2:2}]},{a:5}],[false,{$and:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"!=",value2:2}]},{a:5}],[false,{$and:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"!=",value2:2}]},{a:5}],[5,{$if:{$and:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"==",value2:2}]},then:5},{a:5}]);(0,test_helper/* testEach */.oN)("evaluate or expressions",expression,[true,{$or:[{value1:{$select:"a"},$comparator:"==",value2:5}]},{a:5}],[true,{$or:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"==",value2:2}]},{a:5}],[true,{$or:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"!=",value2:2}]},{a:5}],[false,{$or:[{value1:{$select:"a"},$comparator:"!=",value2:5},{value1:2,$comparator:"!=",value2:2}]},{a:5}],[5,{$if:{$or:[{value1:{$select:"a"},$comparator:"==",value2:5},{value1:2,$comparator:"==",value2:2}]},then:5},{a:5}]);(0,test_helper/* testEach */.oN)("evaluate concat expressions",expression,["",{$concat:[]}],[[],{$concat:[[]]}],["a",{$concat:["a"]}],["ab",{$concat:["a","b"]}],["abc",{$concat:["a","b","c"]}],["1",{$concat:[1]}],["ab3",{$concat:["a","b",3]}],["1b3",{$concat:[1,"b",3]}]);(0,test_helper/* testEach */.oN)("evaluate mapping expressions",expression,[[],{$mapping:{},data:[]}],[[],{$mapping:{source:"target"},data:[]}],[[{}],{$mapping:{noExisting:"target"},data:[{key:"value"}]}],[[{target:"value"}],{$mapping:{source:"target"},data:[{source:"value"}]}],[[{A:"a",B:"b"}],{$mapping:{a:"A",b:"B"},data:[{a:"a",b:"b",c:"c"}]}],[[{A:"a",B:"b"},{A:"a",B:"b"},{A:"a",B:"b"}],{$mapping:{a:"A",b:"B"},data:[{a:"a",b:"b",c:"c"},{a:"a",b:"b",c:"c$"},{a:"a",b:"b",c:"c"}]}],[[{ID:"a",B:"b"},{ID:"b",B:"b"},{ID:"c",B:"b"}],{$mapping:{$key:"ID",b:"B"},data:{a:{b:"b",c:"c"},b:{b:"b",c:"c"},c:{b:"b",c:"c"}}}]);(0,globals_.describe)("evaluateArrayContains",()=>{(0,globals_.test)(`
                when input is an array of primitive values, evaluates to true
                when array contains the specified value
            `.trim(),()=>{(0,globals_.expect)(expression({$arrayContains:{value:2}},[1,2,3])).toStrictEqual(true)});(0,globals_.test)(`
                when input is an array of objects, evaluates to true when array
                contains the specified key and value
            `.trim(),()=>{(0,globals_.expect)(expression({$arrayContains:{key:"b",value:"foo"}},[{a:1,b:"foo"},{a:2,b:"bar"}])).toStrictEqual(true)});(0,globals_.test)(`
                when input is an array of objects, evaluates to false when
                array does not contain the specified value
            `.trim(),()=>{(0,globals_.expect)(expression({$arrayContains:{key:"b",value:"baz"}},[{a:1,b:"foo"},{a:2,b:"bar"}])).toStrictEqual(false)});(0,globals_.test)(`
                when input is an array of objects, evaluates to false when
                array does not contain the specified key
            `.trim(),()=>{(0,globals_.expect)(expression({$arrayContains:{key:"c",value:"foo"}},[{a:1,b:"foo"},{a:2,b:"bar"}])).toStrictEqual(false)});(0,globals_.test)("when input is a nested object, traverses to the array",()=>{(0,globals_.expect)(expression({$arrayContains:{target:{$select:["foo","bar"]},key:"b",value:"abc"}},{foo:{bar:[{a:1,b:"abc"},{a:2,b:"def"}]}})).toStrictEqual(true)});(0,globals_.test)("when key and value are expressions, returns true",()=>{(0,globals_.expect)(expression({$arrayContains:{target:{$select:["foo","bar"]},key:{$if:{value1:5,$comparator:"==",value2:5},then:"b"},value:{$select:["val"]}}},{foo:{bar:[{a:1,b:"abc"},{a:2,b:"def"}]},val:"def"})).toStrictEqual(true)});(0,globals_.test)(`
                when selector is an expression that returns the array, returns
                true
            `.trim(),()=>{(0,globals_.expect)(expression({$arrayContains:{target:{$if:{value1:5,$comparator:"==",value2:5},then:[{a:1,b:"abc"},{a:2,b:"def"}]},key:{$if:{value1:5,$comparator:"==",value2:5},then:"b"},value:{$select:["val"]}}},{val:"def"})).toStrictEqual(true)})});(0,globals_.test)(`
            evaluates complex expressions:
            if (
                (a == 2 || equals(a, a)) &&
                a.a[0][1].a == 5
            ) then "final value"
        `.trim(),()=>{(0,globals_.expect)(expression({$if:{$and:[{$or:[{value1:{$select:"a"},$comparator:"==",value2:2},// false
{value1:{$select:"a"},$comparator:"==",value2:{$select:"a"}}// true
]// true
},{value1:{$select:"a.a[0][1].a"},$comparator:"==",value2:5}// true
]},then:"final value"},{a:{a:[[0,{a:5}]]}})).toStrictEqual("final value")})});

/***/ }),
/* 19 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const x = (y) => {
	const x = {}; __webpack_require__.d(x, y); return x
} 
const y = (x) => (() => (x))
module.exports = x({  });

/***/ }),
/* 20 */
/***/ ((module) => {

function webpackEmptyContext(req) {
	const e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = () => ([]);
webpackEmptyContext.resolve = webpackEmptyContext;
webpackEmptyContext.id = 20;
module.exports = webpackEmptyContext;

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
;// ./src/expression/helper.ts
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
*/const viewArrayAsScope=(data,childrenPropertyNames,propertyReferenceKeys)=>new Proxy(data,{ownKeys(target){return Reflect.ownKeys(target)},get(target,name){for(const element of target)for(const key of propertyReferenceKeys)if(element[key]===name){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
// type ScopeValueType = object
/*
                            eslint-disable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */return viewObjectAsScope(element,childrenPropertyNames,propertyReferenceKeys);/*
                            eslint-enable
                            @typescript-eslint/no-unnecessary-type-arguments
                        */}return undefined},set(target,name,value){let index=0;for(const item of target){for(const key of propertyReferenceKeys)if(item[key]===name){target[index]=value;return true}index+=1}return false}});const viewObjectAsScope=(data,childrenPropertyNames=["children"],propertyReferenceKeys=["name"])=>new Proxy(data,{ownKeys(target){return Reflect.ownKeys(target)},get(target,name){const value=target[name];if(Object.prototype.hasOwnProperty.call(target,name)){if(childrenPropertyNames.includes(name)&&Array.isArray(value)){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
return viewArrayAsScope(value,childrenPropertyNames,propertyReferenceKeys)}if(value!==null&&typeof value==="object"){// NOTE: Type[keyof Type]
// NOTE: ScopeType[keyof ScopeType]
// type ScopeValueType = object
/*
                        eslint-disable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */return viewObjectAsScope(value,childrenPropertyNames,propertyReferenceKeys);/*
                        eslint-enable
                        @typescript-eslint/no-unnecessary-type-arguments
                    */}return value}return undefined},set(target,name,value){if(Object.prototype.hasOwnProperty.call(target,name))if(Object.prototype.hasOwnProperty.call(target,name)){target[name]=value;return true}return false}});
;// ./src/test/expression/helper.ts
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
*/(0,globals_.describe)("helper",()=>{(0,globals_.test)("viewArrayAsScope",()=>{const data=[{name:"first",value:1,children:[{name:"child",value:3}]},{id:"second",value:2}];const scope=viewArrayAsScope(data,["children"],["name","id"]);// Read items by any of the given reference keys.
(0,globals_.expect)(scope.first.value).toStrictEqual(1);(0,globals_.expect)(scope.second?.value).toStrictEqual(2);(0,globals_.expect)(scope.third).toStrictEqual(undefined);// Children are viewed as scope as well.
(0,globals_.expect)(scope.first.children.child.value).toStrictEqual(3);// Replace an item by its reference key.
const replacement={name:"first",value:4,children:[]};scope.first=replacement;(0,globals_.expect)(data[0]).toStrictEqual(replacement);// Unknown items can not be set.
const shouldFail=()=>{scope.third={value:5}};(0,globals_.expect)(shouldFail).toThrow(TypeError);(0,globals_.expect)(data).toHaveLength(2)});(0,globals_.test)("viewObjectAsScope with children",()=>{const data={a:"a",children:[{name:"childB",b:"b",children:[{name:"childC",c:"c"}],nested:{}}]};const scope=viewObjectAsScope(data);// Read from data
(0,globals_.expect)(scope.children.childB.b).toStrictEqual("b");(0,globals_.expect)(scope.children.childB.nested).toEqual({});// We can trigger "ownKeys" proxy method.
(0,globals_.expect)(scope.children).toStrictEqual(scope.children);(0,globals_.expect)(scope.children[0]).toStrictEqual(undefined);(0,globals_.expect)(data.children[0].b).toStrictEqual("b");// Write into data
scope.children.childB.b="another b";(0,globals_.expect)(scope.children.childB.b).toStrictEqual("another b");(0,globals_.expect)(data.children[0].b).toStrictEqual("another b");const shouldFail=()=>{scope.children.childB.nested.a=undefined};(0,globals_.expect)(shouldFail).toThrow(TypeError);// Read from data
(0,globals_.expect)(scope.children.childB.children.childC.c).toStrictEqual("c");// Write into data
scope.children.childB.children.childC.c="another c";(0,globals_.expect)(scope.children.childB.children.childC.c).toStrictEqual("another c");(0,globals_.expect)(data.children[0].children[0].c).toStrictEqual("another c")});(0,globals_.test)("viewObjectAsScope with alternate children property name",()=>{const data={a:"a",members:[{name:"childB",b:"b"}]};const scope=viewObjectAsScope(data,["members"]);// Read from data
(0,globals_.expect)(scope.members.childB.b).toStrictEqual("b");(0,globals_.expect)(scope.members[0]).toStrictEqual(undefined);(0,globals_.expect)(data.members[0].b).toStrictEqual("b");// Write into data
scope.members.childB.b="another b";(0,globals_.expect)(scope.members.childB.b).toStrictEqual("another b");(0,globals_.expect)(data.members[0].b).toStrictEqual("another b")});(0,globals_.test)("viewObjectAsScope with members and children property names",()=>{const data={a:"a",members:[{name:"childB",b:"b",children:[{name:"childC",c:"c"},{name:"childD",d:"d"}]}]};const scope=viewObjectAsScope(data,["children","members"]);// Read from data
(0,globals_.expect)(scope.members.childB.children.childC.c).toStrictEqual("c");(0,globals_.expect)(scope.members.childB.children[0]).toStrictEqual(undefined);(0,globals_.expect)(data.members[0].children[0].c).toStrictEqual("c");// Write into data
scope.members.childB.children.childC.c="another c";(0,globals_.expect)(scope.members.childB.children.childC.c).toStrictEqual("another c");(0,globals_.expect)(data.members[0].children[0].c).toStrictEqual("another c");scope.members.childB.children.childC={name:"childC",c:"c"};(0,globals_.expect)(scope.members.childB.children.childC.c).toStrictEqual("c");(0,globals_.expect)(data.members[0].children[0].c).toStrictEqual("c");scope.members.childB.children.childD={name:"childD",d:"another d"};(0,globals_.expect)(scope.members.childB.children.childD.d).toStrictEqual("another d");(0,globals_.expect)(data.members[0].children[1].d).toStrictEqual("another d");const shouldFail=()=>{scope.members.childB.children.childE=""};(0,globals_.expect)(shouldFail).toThrow(TypeError)})});(0,globals_.test)("viewObjectAsScope with children ambiguously property names",()=>{const data={a:"a",children:[{name:"childB",b:"first b"},{name:"childB",b:"second b"}]};const scope=viewObjectAsScope(data);// Read from data
(0,globals_.expect)(scope.children.childB.b).toStrictEqual("first b");(0,globals_.expect)(scope.children[0]).toStrictEqual(undefined);// Write into data
scope.children.childB.b="another b";(0,globals_.expect)(scope.children.childB.b).toStrictEqual("another b");(0,globals_.expect)(data.children[0].b).toStrictEqual("another b")});

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _expression_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
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
*/(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.describe)("indicator-functions",()=>{(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isSpecificExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isSpecificExpression */ .bQ,[true,{$a:1},"$a"],[true,{$a:1,b:2},"$a",["b"]],[false,{$a:1},"$a",["b"]],[false,{a:1},"$a"],[false,5,"$a"],[false,null,"$a"],[false,[],"$a"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isCondition",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isCondition */ .G3,[true,{$comparator:"==",value1:1,value2:2}],[false,{$comparator:"==",value1:1}],[false,{value1:1,value2:2}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isAndExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isAndExpression */ .Gc,[true,{$and:[]}],[false,{$or:[]}],[false,"and"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isOrExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isOrExpression */ .g6,[true,{$or:[]}],[false,{$and:[]}],[false,"or"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isConcatExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isConcatExpression */ .HK,[true,{$concat:[]}],[false,{$and:[]}],[false,"concat"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isMappingExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isMappingExpression */ .Z9,[true,{$mapping:{},data:[]}],[false,{$mapping:{}}],[false,{data:[]}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isOperation",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isOperation */ .YG,[true,{$operator:"+",operand1:1,operand2:2}],[false,{$operator:"!",operand:true}],[false,{$operator:"+",operand1:1}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isUnaryOperation",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isUnaryOperation */ .bF,[true,{$operator:"!",operand:true}],[false,{$operator:"+",operand1:1,operand2:2}],[false,{operand:true}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isIfExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isIfExpression */ .MP,[true,{$if:true}],[true,{$if:true,then:1,else:2}],[false,{then:1}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isSwitchExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isSwitchExpression */ .$y,[true,{$switch:[]}],[false,{$if:true}],[false,[]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isArrayContainsExpression",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isArrayContainsExpression */ .ZI,[true,{$arrayContains:{key:"a"}}],[false,{$select:"a"}],[false,null]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isSelector",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isSelector */ .cB,[true,{$select:"a.b"}],[true,{$select:""}],[false,{select:"a.b"}],[false,"a.b"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("isValue",_expression_index_js__WEBPACK_IMPORTED_MODULE_1__/* .isValue */ .ml,[true,5],[true,{}],[true,{$value:2}],[true,{$operator:{}}],[false,{$operator:{},operand:2}],[false,{$select:""}],[false,{$switch:[]}],[true,{$operator:{}}],[true,{$mapping:{}}],[false,{$mapping:{},data:[]}],[false,{$arrayContains:{key:"foo"}}],[false,{$arrayContains:{key:"foo",value:"bar"}}],[false,{$arrayContains:{key:"foo",value:"bar",target:{$select:""}}}])});

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
;// ./src/Lock.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Lock *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==typeof o?o:o+""}function _toPrimitive(t,e){if("object"!=typeof t||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}/**
 * Represents the lock state.
 * @property locks - Mapping of lock descriptions to their corresponding
 * callbacks.
 */class Lock{/**
     * Initializes locks.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     */constructor(locks={}){_defineProperty(this,"lock",void 0);_defineProperty(this,"locks",void 0);this.locks=locks}/**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be bind to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callback - A procedure which should only be executed if the
     * interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns a promise which will be resolved after releasing lock.
     */acquire(description,callback,autoRelease=false){return new Promise(resolve=>{const wrappedCallback=description=>{let result;if(callback)result=callback(description);const finish=value=>{if(autoRelease)void this.release(description);resolve(value);return value};if(result?.then)return result.then(finish);finish(result);return result};if(description){if(Object.prototype.hasOwnProperty.call(this.locks,description))this.locks[description].push(wrappedCallback);else{this.locks[description]=[];void wrappedCallback(description)}return}if(this.lock)this.lock.push(wrappedCallback);else{this.lock=[];void wrappedCallback(description)}})}/**
     * Calling this method causes the given critical area to be finished and
     * all functions given to "acquire()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquire" method.
     */async release(description){if(description){if(Object.prototype.hasOwnProperty.call(this.locks,description)){const callback=this.locks[description].shift();if(callback===undefined)delete this.locks[description];else return await callback(description)}return}const callback=this.lock?.shift();if(callback===undefined)this.lock=undefined;else return await callback()}}/* harmony default export */ const src_Lock = (Lock);
// EXTERNAL MODULE: ./src/utility.ts
var utility = __webpack_require__(8);
;// ./src/test/Lock.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,globals_.test)("acquire|release",async()=>{const lock=new src_Lock;const anotherLock=new src_Lock;const simpleLock=new src_Lock;await (0,globals_.expect)(lock.acquire()).resolves.toBeUndefined();await (0,globals_.expect)(simpleLock.release()).resolves.toBeUndefined();let testValue="a";await lock.acquire("test",()=>{testValue="b"});(0,globals_.expect)(testValue).toStrictEqual("b");(0,globals_.expect)(lock.acquire("test",()=>{testValue="a"})).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("b");(0,globals_.expect)(anotherLock.release("test")).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("b");(0,globals_.expect)(lock.release("test")).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("a");(0,globals_.expect)(lock.release("test")).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("a");await lock.acquire("test",()=>{testValue="b"});(0,globals_.expect)(testValue).toStrictEqual("b");(0,globals_.expect)(lock.acquire("test",()=>{testValue="a"})).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("b");(0,globals_.expect)(lock.acquire("test",()=>{testValue="b"})).toBeInstanceOf(Promise);(0,globals_.expect)(testValue).toStrictEqual("b");await lock.release("test");(0,globals_.expect)(testValue).toStrictEqual("a");await lock.release("test");(0,globals_.expect)(testValue).toStrictEqual("b");const stringLock=new src_Lock;void stringLock.acquire("test",()=>"result").then(async result=>{(0,globals_.expect)(result).toStrictEqual("result");void (0,utility/* timeout */.wR)(()=>lock.release("test"));await stringLock.acquire("test");void (0,utility/* timeout */.wR)(()=>lock.release("test"));await stringLock.acquire("test",()=>new Promise(resolve=>{void (0,utility/* timeout */.wR)(()=>{testValue="a";resolve(testValue)})}));(0,globals_.expect)(testValue).toStrictEqual("a")});await stringLock.release("test")});

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _Logger_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/const TEST_ENVIRONMENT= true?typeof document==="undefined"?"node":"node-with-dom":0;const logger=new _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay;(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("configureAllInstances",()=>{const{defaultLevel,defaultName}=_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay;const configurations=Object.values(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.instances).map(instance=>[instance,instance.level,instance.name]);const instance=new _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay({name:"configureAllInstancesTest"});try{_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.configureAllInstances({level:"debug",name:"other"});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultLevel).toStrictEqual("debug");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultName).toStrictEqual("other");for(const configuredLogger of[instance,logger]){(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(configuredLogger.level).toStrictEqual("debug");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(configuredLogger.name).toStrictEqual("other")};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((new _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay).level).toStrictEqual("debug")}finally{_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultLevel=defaultLevel;_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultName=defaultName;for(const[configuredLogger,level,name]of configurations)configuredLogger.configure({level,name});delete _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.instances.configureAllInstancesTest;delete _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.instances.other}});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("configure",()=>{const instance=new _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay({level:"error",name:"configureTest"});try{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(instance.level).toStrictEqual("error");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(instance.name).toStrictEqual("configureTest");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.instances.configureTest).toStrictEqual(instance);instance.configure({level:"debug"});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(instance.level).toStrictEqual("debug");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(instance.name).toStrictEqual(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultName);instance.configure({});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(instance.level).toStrictEqual(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.defaultLevel)}finally{delete _Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.instances.configureTest}});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("log",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(logger.log("test")).resolves.toBeUndefined()});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("info",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(logger.info("test {0}")).resolves.toBeUndefined()});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("debug",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(logger.debug("test")).resolves.toBeUndefined()});// NOTE: This test breaks JavaScript modules in strict mode.
_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.skip(`${TEST_ENVIRONMENT}-error`,()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(logger.error("ignore this error, it is only a {1}","test")).resolves.toBeUndefined()});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("critical",async()=>{// NOTE: Node writes to stdout directly, otherwise the console is used.
const output=typeof process==="undefined"?_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.spyOn(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.console,"error").mockImplementation(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE):_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.spyOn(process.stdout,"write").mockImplementation((_message,callback)=>{callback?.();return true});try{await logger.critical("test");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(output).toHaveBeenCalledTimes(1);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(String(output.mock.calls[0][0])).toContain("critical")}finally{output.mockRestore()}});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("warn",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(logger.warn("test")).resolves.toBeUndefined()});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("show",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(/^.+\(Type: "function"\)$/su.test(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.show(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE))).toStrictEqual(true)});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("show",_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay.show.bind(_Logger_js__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Ay),["1 (Type: \"number\")",1],["null (Type: \"null\")",null],["/a/ (Type: \"regexp\")",/a/],["hans (Type: \"string\")","hans"],["A: a (Type: \"string\")\nB: b (Type: \"string\")",{A:"a",B:"b"}]);

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
;// ./src/Semaphore.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Semaphore *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==typeof o?o:o+""}function _toPrimitive(t,e){if("object"!=typeof t||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}/**
 * Represents the semaphore state.
 * @property queue - List of waiting resource requests.
 * @property numberOfFreeResources - Number free allowed concurrent resource
 * uses.
 * @property numberOfResources - Number of allowed concurrent resource uses.
 */class Semaphore{/**
     * Initializes number of resources.
     * @param numberOfResources - Number of resources to manage.
     */constructor(numberOfResources=2){_defineProperty(this,"queue",[]);_defineProperty(this,"numberOfResources",void 0);_defineProperty(this,"numberOfFreeResources",void 0);this.numberOfResources=numberOfResources;this.numberOfFreeResources=numberOfResources}/**
     * Acquires a new resource and runs given callback if available.
     * @returns A promise which will be resolved if requested resource is
     * available.
     */acquire(){return new Promise(resolve=>{if(this.numberOfFreeResources<=0)this.queue.push(resolve);else{this.numberOfFreeResources-=1;resolve(this.numberOfFreeResources)}})}/**
     * Releases a resource and runs a waiting resolver if there exists some.
     */release(){const callback=this.queue.shift();if(callback===undefined)this.numberOfFreeResources+=1;else callback(this.numberOfFreeResources)}}/* harmony default export */ const src_Semaphore = ((/* unused pure expression or super */ null && (Semaphore)));
;// ./src/test/Semaphore.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,globals_.test)("constructor",()=>{(0,globals_.expect)(new Semaphore).toHaveProperty("numberOfResources",2);(0,globals_.expect)(new Semaphore).toHaveProperty("numberOfFreeResources",(new Semaphore).numberOfResources)});(0,globals_.test)("acquire/release",async()=>{const semaphore1=new Semaphore;(0,globals_.expect)(semaphore1.numberOfFreeResources).toStrictEqual(2);(0,globals_.expect)(await semaphore1.acquire()).toStrictEqual(1);(0,globals_.expect)(semaphore1.numberOfFreeResources).toStrictEqual(1);semaphore1.release();(0,globals_.expect)(semaphore1.numberOfFreeResources).toStrictEqual(2);const semaphore2=new Semaphore(2);(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(2);(0,globals_.expect)(semaphore2.numberOfResources).toStrictEqual(2);await semaphore2.acquire();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(1);(0,globals_.expect)(semaphore2.numberOfResources).toStrictEqual(2);await semaphore2.acquire();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(0);void semaphore2.acquire();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(1);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(0);void semaphore2.acquire();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(2);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(0);semaphore2.release();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(1);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(0);semaphore2.release();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(0);semaphore2.release();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(1);semaphore2.release();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(2);semaphore2.release();(0,globals_.expect)(semaphore2.queue.length).toStrictEqual(0);(0,globals_.expect)(semaphore2.numberOfFreeResources).toStrictEqual(3)});

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
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
*/(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("aggregatePropertyIfEqual",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .aggregatePropertyIfEqual */ .ST,["b",[{a:"b"}],"a"],["b",[{a:"b"},{a:"b"}],"a"],["",[{a:"b"},{a:"c"}],"a"],[false,[{a:"b"},{a:"c"}],"a",false]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("deleteEmptyItems",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .deleteEmptyItems */ .dO,[[],[{a:null}]],[[{a:null,b:2}],[{a:null,b:2}]],[[],[{a:null,b:2}],["a"]],[[],[],["a"]],[[],[]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("extract",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .extract */ .o6,[[{a:"b"}],[{a:"b",c:"d"}],["a"]],[[{}],[{a:"b",c:"d"}],["b"]],[[{c:"d"}],[{a:"b",c:"d"}],["c"]],[[{c:"d"},{}],[{a:"b",c:"d"},{a:3}],["c"]],[[{c:"d"},{c:3}],[{a:"b",c:"d"},{c:3}],["c"]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("extractIfMatches",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .extractIfMatches */ .u7,[["b"],["b"],/b/],[["b"],["b"],"b"],[[],["b"],"a"],[[],[],"a"],[["a","b"],["a","b"],""],[[],["a","b"],"^$"],[["b"],["a","b"],"b"],[["a","b"],["a","b"],"[ab]"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("extractIfPropertyExists",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .extractIfPropertyExists */ .q6,[[{a:2}],[{a:2}],"a"],[[],[{a:2}],"b"],[[],[],"b"],[[{a:2}],[{a:2},{b:3}],"a"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("extractIfPropertyMatches",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .extractIfPropertyMatches */ .Ht,[[{a:"b"}],[{a:"b"}],{a:"b"}],[[{a:"b"}],[{a:"b"}],{a:"."}],[[],[{a:"b"}],{a:"a"}],[[],[],{a:"a"}],[[],[{a:2}],{b:/a/}],[[{mimeType:"text/x-webm"}],[{mimeType:"text/x-webm"}],{mimeType:/^text\/x-webm$/}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("intersect",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .intersect */ .y$,[["A"],["A"],["A"]],[["A"],["A","B"],["A"]],[[],[],[]],[[],[5],[]],[[{a:2}],[{a:2}],[{a:2}]],[[],[{a:3}],[{a:2}]],[[],[{a:3}],[{b:3}]],[[],[{a:3}],[{b:3}],["b"]],[[],[{a:3}],[{b:3}],["b"],false],[[{b:null}],[{b:null}],[{b:null}],["b"]],[[],[{b:null}],[{b:undefined}],["b"]],[[{b:null}],[{b:null}],[{b:undefined}],["b"],false],[[{b:null}],[{b:null}],[{}],["b"],false],[[{b:undefined}],[{b:undefined}],[{}],["b"],false],[[{}],[{}],[{}],["b"],false],[[],[{b:null}],[{}],["b"]],[[{b:undefined}],[{b:undefined}],[{}],["b"],true],[[{b:1}],[{b:1}],[{a:1}],{b:"a"},true]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("makeArray",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .makeArray */ .gv,[[],[]],[[1,2,3],[1,2,3]],[[1],1]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("makeRange",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .makeRange */ .QR,[[],[]],[[0],0],[[0],[0]],[[0,1,2,3,4,5],[5]],[[2,3,4,5],[2,5]],[[1,2,3],[1,2,3]],[[],[2,1]],[[2,4,6,8,10],[2,10],2],[[2,4,6,8],[2,10],2,true]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("merge",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .merge */ .h1,[[],[],[]],[[1],[1],[]],[[1],[],[1]],[[1,1],[1],[1]],[[1,2,3,1,1,2,3],[1,2,3,1],[1,2,3]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("paginate",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .paginate */ .En,[[{disabled:true,page:1,selected:false,type:"previous"},{disabled:false,page:1,selected:true,type:"page"},{disabled:true,page:1,selected:false,type:"next"}],{total:1}],[[{disabled:false,page:2,selected:false,type:"previous"},{disabled:false,page:1,selected:false,type:"page"},{disabled:false,page:2,selected:false,type:"page"},{disabled:false,page:3,selected:true,type:"page"},{disabled:false,page:4,selected:false,type:"page"},{disabled:false,page:5,selected:false,type:"page"},{disabled:false,selected:false,type:"end-ellipsis"},{disabled:false,page:100,selected:false,type:"page"},{disabled:false,page:4,selected:false,type:"next"}],{page:3,siblingCount:1,total:500}],[[{disabled:false,page:1,selected:false,type:"first"},{disabled:false,page:1,selected:false,type:"previous"},{disabled:false,page:1,selected:false,type:"page"},{disabled:false,page:2,selected:true,type:"page"},{disabled:false,page:3,selected:false,type:"page"},{disabled:false,page:3,selected:false,type:"next"},{disabled:false,page:3,selected:false,type:"last"}],{page:2,showFirstButton:true,showLastButton:true,siblingCount:1,total:15}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("permute",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .permute */ .Ny,[[[]],[]],[[[1]],[1]],[[[1,2],[2,1]],[1,2]],[[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]],[1,2,3]],[[["1","2","3"],["1","3","2"],["2","1","3"],["2","3","1"],["3","1","2"],["3","2","1"]],["1","2","3"]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("permuteLength",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .permuteLength */ .bH,[[],[]],[[[1]],[1]],[[[1],[2],[1,2]],[1,2]],[[[1],[2],[3],[1,2],[1,3],[2,3],[1,2,3]],[1,2,3]],[[["1"],["2"],["3"],["1","2"],["1","3"],["2","3"],["1","2","3"]],["1","2","3"]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("removeArrayItem",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .removeArrayItem */ .Hb,[[],[],2],[[],[2],2],[[],[2],2,true],[[1],[1,2],2],[[1],[1,2],2,true]);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("arrayRemove([], 2, true) -> throws Exception",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(()=>(0,_array_js__WEBPACK_IMPORTED_MODULE_1__/* .removeArrayItem */ .Hb)([],2,true)).toThrow(new Error(`Given target doesn't exists in given list.`))});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("sortTopological",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .sortTopological */ .UX,[[],{}],[["a"],{a:[]}],[["b","a"],{a:"b"}],[["a","b"],{a:[],b:"a"}],[["a","b"],{a:[],b:["a"]}],[["b","a"],{a:["b"],b:[]}],[["a","b","c"],{c:"b",a:[],b:["a"]}],[["a","b","c"],{b:["a"],a:[],c:["a","b"]}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("sortTopological",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .sortTopological */ .UX,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .TEST_THROW_SYMBOL */ .pN,{a:"a"},{a:"b",b:"a"},{a:"b",b:"c",c:"a"});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("sumUpProperty",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .sumUpProperty */ ._2,[5,[{a:2},{a:3}],"a"],[2,[{a:2},{b:3}],"a"],[0,[{a:2},{b:3}],"c"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_2__/* .testEach */ .oN)("unique",_array_js__WEBPACK_IMPORTED_MODULE_1__/* .unique */ .Am,[[1,2,3],[1,2,3,1]],[[1,2,3],[1,2,3,1,2,3]],[[],[]],[[1,2,3],[1,2,3]]);

/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("setGlobalContext",()=>{const originalContext=_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz;const context={};try{(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .setGlobalContext */ .zm)(context);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz).toBe(context)}finally{;(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .setGlobalContext */ .zm)(originalContext)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz).toBe(originalContext)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("NOOP",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE)()).toStrictEqual(undefined)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("mockConsole",()=>{const originalContext=_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz;try{const context={};(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .setGlobalContext */ .zm)(context);(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .mockConsole */ .QH)();for(const name of["debug","error","info","log","warn"])(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(context.console[name]).toStrictEqual(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE);const log=()=>{// Do nothing.
};const contextWithConsole={console:{log}};(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .setGlobalContext */ .zm)(contextWithConsole);(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .mockConsole */ .QH)();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(contextWithConsole.console.log).toStrictEqual(log);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(contextWithConsole.console.warn).toStrictEqual(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE)}finally{;(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .setGlobalContext */ .zm)(originalContext)}});

/***/ }),
/* 28 */
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(46);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_async_dependencies_result__[0];
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/const TEST_ENVIRONMENT= true?typeof document==="undefined"?"node":"node-with-dom":0;const HAS_DOM=["browser","node-with-dom"].includes(TEST_ENVIRONMENT);if(HAS_DOM){(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.test)(`deleteCookie (${TEST_ENVIRONMENT})`,async()=>{await (0,weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__/* .getInitializedBrowser */ .hA)();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)(_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document?.cookie).toStrictEqual("");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .setCookie */ .TV)("name","value",{minimal:true})).toStrictEqual(true);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("value");(0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .deleteCookie */ .Yj)("name");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("");if(_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document)_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document.cookie=""});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.test)(`getCookie (${TEST_ENVIRONMENT})`,async()=>{await (0,weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__/* .getInitializedBrowser */ .hA)();if(!_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document)throw new Error("Browser api is missing.");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("")).toStrictEqual("");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .setCookie */ .TV)("name","value",{minimal:true})).toStrictEqual(true);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("value");_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document.cookie=""});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.test)(`setCookie (${TEST_ENVIRONMENT})`,async()=>{await (0,weboptimizer_browser__WEBPACK_IMPORTED_MODULE_2__/* .getInitializedBrowser */ .hA)();if(!_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document)throw new Error("Browser api is missing.");_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document.cookie="";(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .setCookie */ .TV)("name","value",{minimal:true})).toStrictEqual(true);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("value");_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document.cookie="";(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .setCookie */ .TV)("name","",{minimal:true})).toStrictEqual(true);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_1__.expect)((0,_cookie_js__WEBPACK_IMPORTED_MODULE_4__/* .getCookie */ .Ri)("name")).toStrictEqual("");_context_js__WEBPACK_IMPORTED_MODULE_3__/* .globalContext */ .Lz.document.cookie=""})}
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 29 */
/***/ ((module) => {

module.exports = import("jsdom");;

/***/ }),
/* 30 */
/***/ ((module) => {

module.exports = import("path");;

/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// Module
var code = `<!doctype html><html class="no-javascript" lang="en"><head><meta charset="utf-8"><meta content="no-cache" http-equiv="cache-control"><meta content="0" http-equiv="expires"><meta content="no-cache" http-equiv="pragma"><title>clientnode - test</title>${"<" + "script"}>window.document.documentElement.className=window.document.documentElement.className.replace(/(^|\\s)no-javascript(\\s|\$)/,"\$1javascript\$2")${"<" + "/script"}></head><body class="no-javascript">${"<" + "script"}>window.document.body.className=window.document.body.className.replace(/(^|\\s)no-javascript(\\s|\$)/,"\$1javascript\$2")${"<" + "/script"}></body></html>`;
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "default", 0, /* export default binding */ __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ ]);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
// EXTERNAL MODULE: ./src/indicators.ts
var indicators = __webpack_require__(3);
// EXTERNAL MODULE: ./src/context.ts
var context = __webpack_require__(0);
// EXTERNAL MODULE: ./src/object.ts
var object = __webpack_require__(4);
// EXTERNAL MODULE: ./src/utility.ts
var utility = __webpack_require__(8);
;// ./src/data-transfer.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module data-transfer *//* !
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
 * Preloads a given url via a temporary created image element.
 * @param url - To image which should be downloaded.
 * @returns A Promise indicating whether the image was loaded.
 */const cacheImage=url=>{return new Promise((resolve,reject)=>{const imageElement=document.createElement("img");imageElement.onload=()=>{const isLoaded=imageElement.complete;imageElement.remove();if(isLoaded)resolve();else reject(new Error("Image could not be loaded."))};imageElement.src=url})};/**
 * Checks if given url response with given status code.
 * @param url - Url to check reachability.
 * @param givenOptions - Options to configure.
 * @param givenOptions.wait - Boolean indicating if we should retry until a
 * status code will be given.
 * @param givenOptions.statusCodes - Status codes to check for.
 * @param givenOptions.timeoutInSeconds - Delay after assuming given resource
 * isn't available if no response is coming.
 * @param givenOptions.pollIntervalInSeconds - Seconds between two tries to
 * reach given url.
 * @param givenOptions.options - Fetch options to use.
 * @param givenOptions.expectedIntermediateStatusCodes - A list of expected but
 * unwanted response codes. If detecting them waiting will continue until an
 * expected (positive) code occurs or timeout is reached.
 * @returns A promise which will be resolved if a request to given url has
 * finished and resulting status code matches given expected status code.
 * Otherwise, returned promise will be rejected.
 */const checkReachability=async(url,givenOptions={})=>{if(!context/* globalContext */.Lz.fetch)throw new Error("Missing fetch implementation available.");const abortController=givenOptions.abortController??new AbortController;const options=(0,object/* extend */.X$)(true,{expectedIntermediateStatusCodes:[],options:{signal:abortController.signal},pollIntervalInSeconds:0.1,statusCodes:200,timeoutInSeconds:10,wait:false},givenOptions);const statusCodes=[].concat(options.statusCodes);const expectedIntermediateStatusCodes=[].concat(options.expectedIntermediateStatusCodes);const isStatusCodeExpected=(response,statusCodes)=>"status"in response&&statusCodes.includes(response.status);const checkAndThrow=response=>{if(!isStatusCodeExpected(response,statusCodes))throw new Error(`Given status code ${String(response.status)} `+`differs from ${statusCodes.join(", ")}.`);return response};if(options.wait)return new Promise((resolve,reject)=>{let timedOut=false;const timer=(0,utility/* timeout */.wR)(options.timeoutInSeconds*1000);const retryErrorHandler=error=>{if(!timedOut){currentlyRunningTimer=(0,utility/* timeout */.wR)(options.pollIntervalInSeconds*1000,wrapper);/*
                        NOTE: A timer rejection is expected. Avoid throwing
                        errors about unhandled promise rejections.
                    */currentlyRunningTimer.catch(()=>{// Do nothing regardless of an error.
})}return error};const wrapper=async()=>{let response;try{// @ts-expect-error Already wrapped in try catch.
response=await context/* globalContext */.Lz.fetch(url,options.options)}catch(error){return retryErrorHandler(error)}try{resolve(checkAndThrow(response));timer.clear()}catch(error){if(isStatusCodeExpected(response,expectedIntermediateStatusCodes))return retryErrorHandler(error);/* eslint-disable prefer-promise-reject-errors */reject(error);/* eslint-enable prefer-promise-reject-errors */timer.clear()}return response};let currentlyRunningTimer=(0,utility/* timeout */.wR)(wrapper);timer.then(()=>{timedOut=true;currentlyRunningTimer.clear();reject(new Error(`Timeout of ${String(options.timeoutInSeconds)} `+"seconds reached."));abortController.abort()},()=>{// Do nothing.
})});return checkAndThrow(await context/* globalContext */.Lz.fetch(url,options.options))};/**
 * Checks if given url isn't reachable.
 * @param url - Url to check reachability.
 * @param givenOptions - Options to configure.
 * @param givenOptions.wait - Boolean indicating if we should retry until a
 * status code will be given.
 * @param givenOptions.timeoutInSeconds - Delay after assuming given resource
 * will stay available.
 * @param givenOptions.pollIntervalInSeconds - Seconds between two tries to
 * reach given url.
 * @param givenOptions.statusCodes - Status codes to check for.
 * @param givenOptions.options - Fetch options to use.
 * @returns A promise which will be resolved if a request to given url couldn't
 * be finished. Otherwise, returned promise will be rejected. If "wait" is set
 * to "true" we will resolve to another promise still resolving when final
 * timeout is reached or the endpoint is unreachable (after some tries).
 */const checkUnreachability=async(url,givenOptions={})=>{if(!context/* globalContext */.Lz.fetch)throw new Error("Missing fetch implementation available.");const abortController=givenOptions.abortController??new AbortController;const options=(0,object/* extend */.X$)(true,{options:{signal:abortController.signal},pollIntervalInSeconds:0.1,statusCodes:[],timeoutInSeconds:10,wait:false},givenOptions);const check=response=>{const statusCodes=[].concat(options.statusCodes);if(statusCodes.length){if((0,indicators/* isObject */.Gv)(response)&&"status"in response&&statusCodes.includes(response.status))throw new Error(`Given url "${url}" is reachable and responses with `+`status code "${String(response.status)}".`);return new Error(`Given status code is not "${statusCodes.join(", ")}".`)}return null};if(options.wait)return new Promise((resolve,reject)=>{let timedOut=false;const wrapper=async()=>{try{const response=// @ts-expect-error Already wrapped in try catch.
await context/* globalContext */.Lz.fetch(url,options.options);if(timedOut)return response;const result=check(response);if(result){timer.clear();resolve(result);return result}currentlyRunningTimer=(0,utility/* timeout */.wR)(options.pollIntervalInSeconds*1000,wrapper);/*
                        NOTE: A timer rejection is expected. Avoid throwing
                        errors about unhandled promise rejections.
                    */currentlyRunningTimer.catch(()=>{// Do nothing regardless of an error.
})}catch(error){timer.clear();resolve(error);return error}return null};let currentlyRunningTimer=(0,utility/* timeout */.wR)(wrapper);const timer=(0,utility/* timeout */.wR)(options.timeoutInSeconds*1000);timer.then(()=>{timedOut=true;currentlyRunningTimer.clear();reject(new Error(`Timeout of ${String(options.timeoutInSeconds)} `+"seconds reached."));abortController.abort()},()=>{// Do nothing.
})});try{const result=check(await context/* globalContext */.Lz.fetch(url,options.options));if(result)return result}catch(error){return error}throw new Error(`Given url "${url}" is reachable.`)};
// EXTERNAL MODULE: ./src/test-helper.ts
var test_helper = __webpack_require__(6);
;// ./src/test/data-transfer.ts
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
*/(0,test_helper/* testEachRejectedPromiseAgainstSameExpectation */.ar)("checkReachability",checkReachability,test_helper/* TEST_DEFINED_SYMBOL */.u0,["unknownURL"],["unknownURL",{statusCodes:301}],["http://unknownHostName",{statusCodes:200,timeoutInSeconds:.001,wait:true}],["http://unknownHostName",{statusCodes:[200],timeoutInSeconds:.001,wait:true}],["http://unknownHostName",{statusCodes:[200,301],timeoutInSeconds:.001,wait:true}]);(0,test_helper/* testEachResolvedPromiseAgainstSameExpectation */.sl)("checkUnreachability",checkUnreachability,test_helper/* TEST_DEFINED_SYMBOL */.u0,["unknownURL",{statusCodes:200}],["unknownURL",{statusCodes:200,wait:true}],["unknownURL",{statusCodes:[200],wait:true}],["unknownURL",{statusCodes:[200,301],wait:true}]);(0,globals_.test)("checkUnreachability",()=>{const abortController=new AbortController;void (0,utility/* timeout */.wR)(0.25,()=>{abortController.abort()});void (0,globals_.expect)(checkUnreachability("http://unknownHostName",{options:{signal:abortController},statusCodes:200,wait:true})).resolves.toBeDefined()});

/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
// EXTERNAL MODULE: ./src/constants.ts
var constants = __webpack_require__(5);
// EXTERNAL MODULE: ./src/string.ts
var string = __webpack_require__(9);
;// ./src/datetime.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module dateTime *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/// Caches compiled date tine pattern regular expressions.
const DATE_TIME_PATTERN_CACHE=[];/**
 * Formats given date or current via given format specification.
 * @param format - Format specification.
 * @param dateTime - Date time to format.
 * @param options - Additional configuration options for "Intl.DateTimeFormat".
 * @param locales - Locale or list of locales to use for formatting. First one
 * take precedence of latter ones.
 * @returns Formatted date time string.
 */const dateTimeFormat=(format="full",dateTime=new Date,options={},locales=constants/* LOCALES */.YZ)=>{if(typeof dateTime==="number")/*
            NOTE: "Date" constructor expects milliseconds as unit instead
            of more common used seconds.
        */dateTime*=1000;const normalizedDateTime=new Date(dateTime);if(["full","long","medium","short"].includes(format))return new Intl.DateTimeFormat([].concat(locales,"en-US"),{dateStyle:format,timeStyle:format,...options}).format(normalizedDateTime);const scope={};for(const style of["full","long","medium","short"]){scope[`${style}Literals`]=[];const dateTimeFormat=new Intl.DateTimeFormat([].concat(locales,"en-US"),{dateStyle:style,timeStyle:style,...options});scope[style]=dateTimeFormat.format(normalizedDateTime);for(const item of dateTimeFormat.formatToParts(normalizedDateTime))if(item.type==="literal")scope[`${style}Literals`].push(item.value);else scope[`${style}${(0,string/* capitalize */.ZH)(item.type)}`]=item.value}const evaluated=(0,string/* evaluate */._3)(`\`${format}\``,{scope});if(evaluated.error)throw new Error(evaluated.error);/*
        NOTE: For some reason hidden symbols are injected differently on
        different platforms, so we have to normalize for predictable
        testing.
    */return evaluated.result.replace(/\s/g," ")};/**
 * Interprets given content string as date time.
 * @param value - Date time string to interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is depended on
 * given format and number like string as utc.
 * @returns Interpret date time object.
 */const interpretDateTime=(value,interpretAsUTC)=>{let resolvedInterpretAsUTC=Boolean(interpretAsUTC);// region iso format
/*
        Let's first check if we have a simplified iso 8602 date time
        representation like:

        "YYYY-MM-DDTHH:mm:ss.sssZ" or "YYYY-MM-DDTHH:mm:ss.sss+HH:mm".

        Please note for the native "Date" implementation:

        When the time zone offset is absent, date-only forms are interpreted as
        a UTC time and date-time forms are interpreted as local time. This is
        due to a historical spec error that was not consistent with ISO 8601
        but could not be changed due to web compatibility.
    */const hourAndMinutesPattern="[0-2][0-9]:[0-6][0-9]";const pattern="^"+(// Year, month and day:
"[0-9]{4}-[01][0-9]-[0-3][0-9]"+"(?<time>"+("(?:T"+(hourAndMinutesPattern+"(?:"+(// Seconds:
":[0-6][0-9]"+// Milliseconds:
"(?:\\.[0-9]+)?")+")?"+// Timezone definition:
`(?<dateTimeTimezone>Z|(?:[+-]${hourAndMinutesPattern}))?`)+")"+"|"+// Timezone definition:
`(?<dateTimezone>Z|(?:[+-]${hourAndMinutesPattern}))`)+")?")+"$";const match=value.match(new RegExp(pattern,"i"));if(match){const result=new Date(value);if(isNaN(result.getDate()))return null;const timezone=match.groups?.dateTimeTimezone??match.groups?.dateTimezone;if(!timezone){if([null,undefined].includes(interpretAsUTC))resolvedInterpretAsUTC=false;if(resolvedInterpretAsUTC){if(!match.groups?.time)/*
                        NOTE: Date only strings will be interpreted as UTC
                        already.
                    */return result;// local to utc
return new Date(result.getTime()-result.getTimezoneOffset()*60*1000)}if(match.groups?.time)/*
                    NOTE: Date time strings will be interpreted as local
                    already.
                */return result;// utc to local
return new Date(result.getTime()+result.getTimezoneOffset()*60*1000)}return result}// endregion
value=value.replace(/^(-?)-*0*([1-9][0-9]*)$/,"$1$2");// region interpret integer number
/*
        NOTE: Do not use "parseFloat" since we want to interpret delimiter as
        date delimiters.
    */if(String(parseInt(value))===value){if([null,undefined].includes(interpretAsUTC))resolvedInterpretAsUTC=true;const roughDateForTimeZoneDetermining=new Date(parseInt(value)*1000);return new Date((parseInt(value)+(resolvedInterpretAsUTC?0:roughDateForTimeZoneDetermining.getTimezoneOffset()*60))*1000)}// endregion
if(!DATE_TIME_PATTERN_CACHE.length){// region pre-compile regular expressions
/// region pattern
const millisecondPattern="(?<millisecond>(?:0{0,3}[0-9])|(?:0{0,2}[1-9]{2})|"+"(?:0?[1-9]{3})|(?:1[1-9]{3}))";const minuteAndSecondPattern="(?:0?[0-9])|(?:[1-5][0-9])|(?:60)";const secondPattern=`(?<second>${minuteAndSecondPattern})`;const minutePattern=`(?<minute>${minuteAndSecondPattern})`;const hourPattern="(?<hour>(?:0?[0-9])|(?:1[0-9])|(?:2[0-4]))";const noonIndicatorPattern="(?<noonIndicator> *(?:(?:a\\.?m\\.?)|(?:p\\.?m\\.?)))?";const dayPattern="(?<day>(?:0?[1-9])|(?:[1-2][0-9])|(?:3[01]))";const monthPattern="(?<month>(?:0?[1-9])|(?:1[0-2]))";const yearPattern="(?<year>(?:0?[1-9])|(?:[1-9][0-9]+))";/// endregion
const patternPresenceCache={};for(const timeDelimiter of["t"," "])for(const timeComponentDelimiter of[":","/","-"," "])for(const timeFormat of[hourPattern+`${timeComponentDelimiter}+`+minutePattern+noonIndicatorPattern,hourPattern+`${timeComponentDelimiter}+`+minutePattern+`${timeComponentDelimiter}+`+secondPattern+noonIndicatorPattern,hourPattern+`${timeComponentDelimiter}+`+minutePattern+`${timeComponentDelimiter}+`+secondPattern+`${timeComponentDelimiter}+`+millisecondPattern+noonIndicatorPattern,hourPattern+noonIndicatorPattern])for(const dateTimeFormat of[{delimiter:["/","-"," "],pattern:[monthPattern+"${delimiter}"+dayPattern+"${delimiter}"+yearPattern,monthPattern+"${delimiter}"+dayPattern+" +"+yearPattern,yearPattern+"${delimiter}"+monthPattern+"${delimiter}"+dayPattern,yearPattern+" +"+monthPattern+"${delimiter}"+dayPattern,monthPattern+"${delimiter}"+dayPattern+"${delimiter}"+yearPattern+`${timeDelimiter}+`+timeFormat,monthPattern+"${delimiter}"+dayPattern+" +"+yearPattern+`${timeDelimiter}+`+timeFormat,timeFormat+`${timeDelimiter}+`+monthPattern+"${delimiter}"+dayPattern+"${delimiter}"+yearPattern,timeFormat+`${timeDelimiter}+`+monthPattern+"${delimiter}"+dayPattern+" +"+yearPattern,yearPattern+"${delimiter}"+monthPattern+"${delimiter}"+dayPattern+`${timeDelimiter}+`+timeFormat,yearPattern+" +"+monthPattern+"${delimiter}"+dayPattern+`${timeDelimiter}+`+timeFormat,timeFormat+`${timeDelimiter}+`+yearPattern+"${delimiter}"+monthPattern+"${delimiter}"+dayPattern,timeFormat+`${timeDelimiter}+`+yearPattern+" +"+monthPattern+"${delimiter}"+dayPattern]},{delimiter:"\\.",pattern:[dayPattern+"${delimiter}"+monthPattern+"${delimiter}"+yearPattern,dayPattern+"${delimiter}"+monthPattern+" +"+yearPattern,yearPattern+"${delimiter}"+dayPattern+"${delimiter}"+monthPattern,yearPattern+" +"+dayPattern+"${delimiter}"+monthPattern,dayPattern+"${delimiter}"+monthPattern+"${delimiter}"+yearPattern+`${timeDelimiter}+`+timeFormat,dayPattern+"${delimiter}"+monthPattern+" +"+yearPattern+`${timeDelimiter}+`+timeFormat,timeFormat+`${timeDelimiter}+`+dayPattern+"${delimiter}"+monthPattern+"${delimiter}"+yearPattern,timeFormat+`${timeDelimiter}+`+dayPattern+"${delimiter}"+monthPattern+" +"+yearPattern,yearPattern+"${delimiter}"+dayPattern+"${delimiter}"+monthPattern+`${timeDelimiter}+`+timeFormat,yearPattern+" +"+dayPattern+"${delimiter}"+monthPattern+`${timeDelimiter}+`+timeFormat,timeFormat+`${timeDelimiter}+`+yearPattern+"${delimiter}"+dayPattern+"${delimiter}"+monthPattern,timeFormat+`${timeDelimiter}+`+yearPattern+" +"+dayPattern+"${delimiter}"+monthPattern]},{pattern:timeFormat}])for(const delimiter of[].concat(Object.prototype.hasOwnProperty.call(dateTimeFormat,"delimiter")?dateTimeFormat.delimiter:"-"))for(const pattern of[].concat(dateTimeFormat.pattern)){const evaluatedPattern=(0,string/* evaluate */._3)(`\`^${pattern}$\``,{scope:{delimiter:`${delimiter}+`}}).result;if(evaluatedPattern&&!Object.prototype.hasOwnProperty.call(patternPresenceCache,evaluatedPattern)){patternPresenceCache[evaluatedPattern]=true;DATE_TIME_PATTERN_CACHE.push(new RegExp(evaluatedPattern))}}// endregion
}// region pre-process
// NOTE: All patterns can assume lower cased strings.
value=value.toLowerCase();/*
        Reduce each sequence on none alphanumeric symbols to the first
        symbol (consolidate delimiters).
    */value=value.replace(/([^0-9a-z])[^0-9a-z]+/g,"$1");let monthNumber=1;for(const monthVariation of[["jan","january?","janvier"],["feb","february?","février"],["m(?:a|ae|ä)r","m(?:a|ae|ä)r(?:ch|s|z)"],["ap[rv]","a[pv]ril"],["ma[iy]"],["ju[ein]","jui?n[ei]?"],["jul","jul[iy]","juillet"],["aug","august","août"],["sep","septemb(?:er|re)"],["o[ck]t","o[ck]tob(?:er|re)"],["nov","novemb(?:er|re)"],["de[cz]","d[eé][cz]emb(?:er|re)"]]){let matched=false;for(const name of monthVariation){const pattern=new RegExp(`(^|[^a-z])${name}([^a-z]|$)`);if(pattern.test(value)){value=value.replace(pattern,`$1${String(monthNumber)}$2`);matched=true;break}}if(matched)break;monthNumber+=1}value=sliceWeekday(value);const timezonePattern=/(.+)\+(.+)$/;const timezoneMatch=timezonePattern.exec(value);if(timezoneMatch)value=value.replace(timezonePattern,"$1");for(const wordToSlice of["","Uhr",`o'clock`])value=value.replace(wordToSlice,"");value=value.trim();// endregion
// region try to match a pattern
for(const dateTimePattern of DATE_TIME_PATTERN_CACHE){let match=null;try{match=value.match(dateTimePattern)}catch{// Continue regardless of an error.
}if(match){const get=(name,fallback=0)=>match.groups&&name in match.groups?parseInt(match.groups[name],10):fallback;const parameter=[get("year",1970),get("month",1)-1,get("day",1),get("hour"),get("minute"),get("second"),get("millisecond")];if(match.groups?.noonIndicator&&match.groups.noonIndicator.trim().replace(/\./g,"")==="pm"&&parameter[3]<=12)parameter[3]+=12;let result=null;if(timezoneMatch){const timeShift=interpretDateTime(timezoneMatch[2],true);if(timeShift)result=new Date(Date.UTC(...parameter)-timeShift.getTime())}if(!result)if(resolvedInterpretAsUTC)result=new Date(Date.UTC(...parameter));else result=new Date(...parameter);if(isNaN(result.getDate()))return null;return result}}// endregion
return null};/**
 * Interprets a date object from given artifact.
 * @param value - To interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is dependent on
 * given format and numbers as utc.
 * @returns Interpreted date object or "null" if given value couldn't be
 * interpreted.
 */const normalizeDateTime=(value=null,interpretAsUTC)=>{let resolvedInterpretAsUTC=Boolean(interpretAsUTC);if(value===null)return new Date;if(typeof value==="string"){/*
            We make a simple pre-check to determine if it could be a date like
            representation. Idea: There should be at least some numbers and
            separators.
        */if(/^.*(?:(?:[0-9]{1,4}[^0-9]){2}|[0-9]{1,4}[^0-9.]).*$/.test(value)){value=interpretDateTime(value,resolvedInterpretAsUTC);if(value===null)return value;return value}const floatRepresentation=parseFloat(value);if(String(floatRepresentation)===value)value=floatRepresentation}if(typeof value==="number"){if([null,undefined].includes(interpretAsUTC))resolvedInterpretAsUTC=true;const roughDateForTimeZoneDetermining=new Date(value*1000);return new Date((value+(resolvedInterpretAsUTC?0:roughDateForTimeZoneDetermining.getTimezoneOffset()*60))*1000)}// Try to deal with types which are either numbers or strings.
const result=new Date(value);if(isNaN(result.getDate()))return null;return result};/**
 * Slice weekday from given date representation.
 * @param value - String to process.
 * @returns Sliced given string.
 */const sliceWeekday=value=>{const weekdayPattern=/[a-z]{2}\.+ *([^ ].*)$/i;const weekdayMatch=weekdayPattern.exec(value);if(weekdayMatch)return value.replace(weekdayPattern,"$1");return value};
// EXTERNAL MODULE: ./src/test-helper.ts
var test_helper = __webpack_require__(6);
;// ./src/test/datetime.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/const now=new Date;const testDate=new Date(0);(0,test_helper/* testEach */.oN)("dateTimeFormat",dateTimeFormat,["",""],["","",0],["","","1970-01-01T00:00:00.000Z"],["","",testDate],["1/1/70, 12:00 AM","${short}",testDate,{timeZone:"UTC"}],["1/1/70, 12:00 AM","${short}",0,{timeZone:"UTC"}],["1/1/70, 12:00 AM","${short}","1970-01-01T00:00:00.000Z",{timeZone:"UTC"}],["1.1.1970 12:00:00","${shortDay}.${shortMonth}.${fullYear} "+"${shortHour}:${shortMinute}:${mediumSecond}",testDate,{timeZone:"UTC"}],["1.1.1970 12:00:00","${shortDay}.${shortMonth}.${fullYear} "+"${shortHour}:${shortMinute}:${mediumSecond}",0,{timeZone:"UTC"}],["1.1.1970 12:00:00","${shortDay}.${shortMonth}.${fullYear} "+"${shortHour}:${shortMinute}:${mediumSecond}","1970-01-01T00:00:00.000Z",{timeZone:"UTC"}]);(0,test_helper/* testEach */.oN)("interpretDateTime",interpretDateTime,[null,""],[new Date("1970-01-01T08:30:01.021Z"),"1970-01-01T08:30:01.021Z"],[new Date("1970-01-01T08:30:01.021Z"),"1970-01-01T08:30:01.021Z",true],[new Date("1970-01-01T08:30:01.001"),"1970-01-01T08:30:01.001"],[new Date("1970-01-01T08:30:01.002"),"1970-01-01T08:30:01.002",false],[new Date("1970-01-01T08:30:01.003Z"),"1970-01-01T08:30:01.003",true],[new Date("1970-01-01T08:30:01.001+03:00"),"1970-01-01T08:30:01.001+03:00"],[new Date("1970-01-01T08:30:01.002+03:00"),"1970-01-01T08:30:01.002+03:00",false],[new Date("1970-01-01T05:30:01.003Z"),"1970-01-01T08:30:01.003+03:00",true],[new Date("1970-01-01T00:00:00.000"),"1970-01-01"],[new Date("1970-01-01T00:00:00.000"),"1970-01-01",false],[new Date("1970-01-01T00:00:00.000Z"),"1970-01-01",true],[new Date(Date.UTC(1970,1-1,1,0,0,1)),"1"],[new Date(Date.UTC(1970,1-1,1,0,0,-1)),"-1"],[new Date(Date.UTC(1970,1-1,1,0,0,1)),"01"],[new Date(Date.UTC(1970,1-1,1,0,0,-1)),"--01"],[new Date(1970,1-1,1,0,0,1),"1",false],[new Date(1970,1-1,1,0,0,1),"01",false],[new Date(1970,1-1,1,1),"01:00"],[new Date(1970,1-1,1,1),"01:00 A.M."],[new Date(1970,1-1,1,1),"01:00 a.m."],[new Date(1970,1-1,1,1),"01:00 am"],[new Date(1970,1-1,1,14),"02:00 pm"],[new Date(1970,1-1,1,13),"13:00 pm"],[new Date(1970,1-1,2),"12:00 pm"],[new Date(1970,1-1,1,14),"02:00 p.m"],[new Date(1970,1-1,1,14),"02:00 p.m."],[new Date(1970,1-1,1,14),"02:00  p.m."],[new Date(1970,1-1,1,8,55),"08:55"],[new Date(1970,1-1,1,1,2),"01:02"],[new Date(1970,1-1,1,1),"01:00:00"],[new Date(1970,1-1,1,1,2),"01:02:00"],[new Date(1970,1-1,1,1,2,3),"01:02:03"],[new Date(1970,1-1,1,1,2,3),"01:02:03:0"],[new Date(1970,1-1,1,1,2,3,4),"01:02:03:4"],[new Date(1970,1-1,1),"1.1.1970"],[new Date(1970,2-1,1),"1.2.1970"],[new Date(1970,1-1,1,10),"1.1.1970 10"],[new Date(1970,1-1,1,10,30),"1.1.1970 10:30"],[new Date(1970,1-1,1,10,30,30),"1.1.1970 10:30:30"],[new Date(2014,11-1,26,8,30),"2014-11-26 08:30:00"],[new Date(2014,11-1,26,8,30),"2014-11-26T08:30:00"],[new Date(Date.UTC(2014,11-1,26,7,30)),"2014-11-26T08:30:00+01:00"],[new Date(Date.UTC(2014,11-1,10,7,30)),"2014-11-10T08:30:00+01:00"],[new Date(Date.UTC(2014,11-1,10,6,30)),"2014-11-10T08:30:00+02:00"],[new Date(Date.UTC(2023,10-1,26,8,40,1)),"2023-10-26T08:40:01+00:00"],[new Date(1970,1-1,1,8,30),"1.1.1970 08:30:00"],[new Date(1970,1-1,1),"Mo. 1.1.1970"],[new Date(1970,1-1,2),"Di. 2.1.1970"],[new Date(1970,1-1,3),"Fr. 3.1.1970"],[new Date(1970,1-1,3),"3.Jan.1970"],[new Date(1970,1-1,3),"3. Jan. 1970"],[new Date(1970,5-1,3),"3. mai. 1970"],[new Date(1970,5-1,3),"3. may 1970"],[new Date(1970,3-1,3),"3. märz 1970"],[new Date(1970,12-1,3),"3. Dezember 1970"]);(0,globals_.test)("normalizeDateTime",()=>{(0,globals_.expect)(typeof normalizeDateTime()).toStrictEqual("object")});(0,test_helper/* testEach */.oN)("normalizeDateTime",normalizeDateTime,[now,now],[new Date("1970-01-01"),"1970-01-01",true],[new Date("1970-01-01T00:00:00"),"1970-01-01",false],[new Date("1970-01-01T00:00:00Z"),"1970-01-01",true],[new Date("1970-01-01T08:38:00.020+02:02"),"1970-01-01T08:38:00.020+02:02"],[new Date("1970-01-01T08:38:00.020Z"),"1970-01-01T08:38:00.020Z"],[new Date(1.2*1000),1.2],[new Date(1.2*1000),"1.2"],[new Date(1970,1-1,1,8,55),"08:55"],[new Date(1*1000),1],[new Date(1970,2-1,1),"2/1/1970"],[new Date(Date.UTC(1970,1-1,1,0,0,0,1)),0.001],[new Date(1970,1-1,1,8,30),new Date(1970,1-1,1,8,30)],[null,"abc"],[null,"1+1+1970 08+30+00"]);(0,test_helper/* testEach */.oN)("sliceWeekday",sliceWeekday,["",""],["a","a"],["1.1.1970","1.1.1970"],["1.1.1970","Do. 1.1.1970"],["1.1.1970","We. 1.1.1970"],["1.1.1970","Mo. 1.1.1970"],["10","Mo. 10"],["Mo. ","Mo. "]);

/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
// EXTERNAL MODULE: ./src/context.ts
var context = __webpack_require__(0);
// EXTERNAL MODULE: ./src/utility.ts
var utility = __webpack_require__(8);
;// ./src/domNode.ts
/* unused harmony import specifier */ var NOOP;
/* unused harmony import specifier */ var globalContext;
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module domNode *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/const STOP_AUTO_SCROLLING=(/* unused pure expression or super */ null && ({value:NOOP}));const MANUAL_SCROLL_EVENT_NAMES=["DOMMouseScroll","keydown","mousedown","mousewheel","wheel","touchstart","touchmove"];const SCROLL_EVENT_NAMES=["scroll"].concat(MANUAL_SCROLL_EVENT_NAMES);const closest=(node,selector,startWithParent=false)=>"closest"in node&&!startWithParent?node.closest(selector):node.parentElement?.closest(selector)||null;const createDomNodes=html=>{const domNodeWrapper=document.createElement("div");domNodeWrapper.innerHTML=html;if(domNodeWrapper.childNodes.length===1)/*
            NOTE: We need to clone the nested child to decouple it from its
            parent node.
        */return domNodeWrapper.childNodes[0].cloneNode(true);return domNodeWrapper};const fade=(domNode,intervalInMilliseconds=200,out=true)=>{const transitionBackup=domNode.style.transition;const visibleBackup=domNode.style.visibility;const opacityBackup=domNode.style.opacity;const hadStyleAttribute=domNode.hasAttribute("style");if(out){domNode.style.visibility="hidden";domNode.style.opacity="0";domNode.style.transition=`visibility 0s ${String(intervalInMilliseconds)}ms, `+`opacity ${String(intervalInMilliseconds)}ms linear`}else{domNode.style.visibility="visible";domNode.style.opacity="1";domNode.style.transition=`opacity ${String(intervalInMilliseconds)}ms linear`}let clearTimeoutAndResetDomNode=context/* NOOP */.tE;let resolved=false;const promise=new Promise(resolve=>{clearTimeoutAndResetDomNode=()=>{domNode.style.transition=transitionBackup;resolved=true;resolve()};void (0,utility/* timeout */.wR)(intervalInMilliseconds).then(clearTimeoutAndResetDomNode)});promise.clear=()=>{if(!resolved){domNode.style.transition="none";clearTimeoutAndResetDomNode()}};promise.resetStyles=()=>{if(hadStyleAttribute){domNode.style.transition=transitionBackup;domNode.style.visibility=visibleBackup;domNode.style.opacity=opacityBackup}else domNode.removeAttribute("style")};return promise};const fadeIn=(domNode,intervalInMilliseconds=200)=>fade(domNode,intervalInMilliseconds,false);const fadeOut=(domNode,intervalInMilliseconds=200)=>fade(domNode,intervalInMilliseconds);const getAll=root=>{if(!context/* globalContext */.Lz.document)return[];const nodes=[];// SHOW_ALL includes elements, text, and comments
const walker=context/* globalContext */.Lz.document.createTreeWalker(root,NodeFilter.SHOW_ALL,null);let currentNode=walker.currentNode;while(currentNode){nodes.push(currentNode);currentNode=walker.nextNode()}return nodes};const getParents=node=>{const result=[];while(node.parentNode){result.push(node.parentNode);node=node.parentNode}return result};const getText=(root,recursive=false)=>{if(root.nodeType===Node.TEXT_NODE){const content=root.nodeValue?.trim();if(content)return[content]}const result=[];for(const domNode of root.childNodes)if(recursive||domNode.nodeType===Node.TEXT_NODE)result.push(...getText(domNode));return result};/**
 * Smoothly scrolls both horizontally and vertically to a target DOM node.
 * Cancels instantly if the user interacts with the mouse, touch, or keys.
 * @param givenOptions - Configuration options.
 * @param givenOptions.targetDomNode - The DOM node you want to scroll to.
 * @param givenOptions.containerDomNode - The scrollable parent.
 * @param givenOptions.durationInMilliseconds - Animation duration in
 * milliseconds.
 * @param givenOptions.interruptOnManualScroll - Whether to stop the animation
 * if the user starts to scroll manually.
 * @param givenOptions.offset - Pixel offsets.
 * @param givenOptions.offset.top - Vertical offset in pixels.
 * @param givenOptions.offset.left - Horizontal offset in pixels.
 */const interruptableScrollTo=(givenOptions={})=>{if(!(globalContext.document&&globalContext.window))return;const document=globalContext.document;const body=document.body;const window=globalContext.window;if(givenOptions.containerDomNode&&!("getBoundingClientRect"in givenOptions.containerDomNode)&&"parentElement"in givenOptions.containerDomNode)givenOptions.containerDomNode=givenOptions.containerDomNode.parentElement;if(givenOptions.targetDomNode&&!("getBoundingClientRect"in givenOptions.targetDomNode)&&"parentElement"in givenOptions.targetDomNode)givenOptions.targetDomNode=givenOptions.targetDomNode.parentElement;const options={targetDomNode:body,containerDomNode:window,durationInMilliseconds:500,offset:{top:0,left:0,...(givenOptions.offset||{})},interruptOnManualScroll:true,...givenOptions};const isWindow=options.containerDomNode===window;// 1. Get current starting scroll positions
const startY=isWindow?window.scrollY||document.documentElement.scrollTop:options.containerDomNode.scrollTop;const startX=isWindow?window.scrollX||document.documentElement.scrollLeft:options.containerDomNode.scrollLeft;// 2. Calculate targetDomNode positions for both axes
let targetY;let targetX;if(isWindow){const rect=options.targetDomNode.getBoundingClientRect();targetY=rect.top+(window.scrollY||document.documentElement.scrollTop)-options.offset.top;targetX=rect.left+(window.scrollX||document.documentElement.scrollLeft)-options.offset.left}else{// Relative to the scrollable parent container
targetY=options.targetDomNode.offsetTop-options.containerDomNode.offsetTop-options.offset.top;targetX=options.targetDomNode.offsetLeft-options.containerDomNode.offsetLeft-options.offset.left}const distanceY=targetY-startY;const distanceX=targetX-startX;// If no movement is needed, exit immediately
if(distanceY===0&&distanceX===0)return;let startTime=null;let animationFrameId=null;// Easing function
const easeInOutQuad=time=>time<0.5?2*time*time:-1+(4-2*time)*time;if(options.interruptOnManualScroll){// 3. Define the interrupt / teardown system
STOP_AUTO_SCROLLING.value=()=>{if(animationFrameId){cancelAnimationFrame(animationFrameId);animationFrameId=null}for(const node of[body,document.querySelector("html"),window])for(const name of MANUAL_SCROLL_EVENT_NAMES)node?.removeEventListener(name,STOP_AUTO_SCROLLING.value);STOP_AUTO_SCROLLING.value=NOOP};for(const node of[body,document.querySelector("html"),window])for(const name of MANUAL_SCROLL_EVENT_NAMES)node?.addEventListener(name,STOP_AUTO_SCROLLING.value,{passive:true})}// 4. Multi-axis animation loop
const step=currentTime=>{if(!startTime)startTime=currentTime;const progress=currentTime-startTime;const timeRatio=Math.min(progress/options.durationInMilliseconds,1);const easedRatio=easeInOutQuad(timeRatio);// Linearly interpolate the positions based on eased progress.
const nextY=startY+distanceY*easedRatio;const nextX=startX+distanceX*easedRatio;// Apply scroll to window or container.
if(isWindow)window.scrollTo(nextX,nextY);else{;options.containerDomNode.scrollTop=nextY;options.containerDomNode.scrollLeft=nextX}if(timeRatio<1)animationFrameId=requestAnimationFrame(step);else STOP_AUTO_SCROLLING.value()};animationFrameId=requestAnimationFrame(step)};/**
 * Scrolls to the given DomNode's location or tio of the page.
 * @param targetDomNode - DomNode to scroll to. If not given, scrolls to the
 * top of the page.
 * @param behavior - Scroll behavior to use.
 */const scrollTo=(targetDomNode=null,behavior="smooth")=>{if(targetDomNode&&!("getBoundingClientRect"in targetDomNode))targetDomNode=targetDomNode.parentElement;const{left,top}=targetDomNode?targetDomNode.getBoundingClientRect():{left:0,top:0};globalContext.window?.scrollTo({left,top,behavior})};/**
 * Checks whether given html or text strings are equal.
 * @param first - First html, selector to dom node or text to compare.
 * @param second - Second html, selector to dom node or text to compare.
 * @param forceHTMLString - Indicates whether given contents are
 * interpreted as html string (otherwise automatic detection will be
 * triggered).
 * @returns Returns true if both dom representations are equivalent.
 */const isEquivalent=(first,second,forceHTMLString=false)=>{if(first===second)return true;if(!(first&&second))return false;if(!context/* globalContext */.Lz.document)throw new Error("Missing document in global context.");const createElement=context/* globalContext */.Lz.document.createElement.bind(context/* globalContext */.Lz.document);const determineHTMLPattern=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;const inputs={first,second};const domNodes={first:createElement("dummy"),second:createElement("dummy")};/*
        NOTE: Assume that strings that start "<" and end with ">" are mark up
        and skip the more expensive regular expression check.
    */for(const[type,html]of Object.entries(inputs))if(typeof html==="string"){if(forceHTMLString||html.startsWith("<")&&html.endsWith(">")&&html.length>=3||determineHTMLPattern.test(html))domNodes[type]=createDomNodes(html);else{const domNode=document.querySelector(html);if(domNode)/*
                        NOTE: We copy the node tree to not manipulate the
                        original dom node by normalizing it afterward.
                    */domNodes[type]=domNode.cloneNode(true);else return false}}else if("cloneNode"in html)domNodes[type]=html.cloneNode(true);else return false;domNodes.first.normalize();domNodes.second.normalize();return domNodes.first.isEqualNode(domNodes.second)};/**
 * Checks whether the given dom node is visible or takes space in the document
 * flow.
 * Elements with visibility: hidden or opacity: 0 are considered to be visible,
 * since they still consume space in the layout. During animations that hide an
 * element, the element is considered to be visible until the end of the
 * animation.
 * @param domNode - To inspect.
 * @returns A boolean indicating the visibility.
 */const isHidden=domNode=>!context/* globalContext */.Lz.document?.contains(domNode)||domNode.style.display==="none"||domNode.nodeName==="INPUT"&&domNode.getAttribute("type")==="hidden"||["contents","inline"].includes(domNode.style.display)&&(!("innerHTML"in domNode)||domNode.innerHTML.trim()==="")||domNode.style.height==="0px"&&domNode.style.width==="0px"||Boolean(domNode.parentElement)&&isHidden(domNode.parentElement);const onDocumentReady=callback=>new Promise(resolve=>void(async()=>{// See if document object model is already available.
if(["complete","interactive"].includes(document.readyState)){// Call on next available tick.
await (0,utility/* timeout */.wR)();resolve();callback?.()}else document.addEventListener("DOMContentLoaded",()=>{resolve();callback?.()})})());/**
 * Replaces a given dom node with given nodes.
 * @param domNodeToReplace - Node to replace its children.
 * @param replacementDomNodes - Node or array of nodes to use as replacement.
 * @param skipEmptyTextNodes - Configures whether to trim text.
 */const replace=(domNodeToReplace,replacementDomNodes,skipEmptyTextNodes=false)=>{for(const replacement of[].concat(replacementDomNodes).reverse())if(!(skipEmptyTextNodes&&replacement.nodeType===Node.TEXT_NODE&&replacement.nodeValue?.trim()===""))domNodeToReplace.after(replacement);domNodeToReplace.remove()};/**
 * Moves the content of a given dom node one level up and removes the given
 * node.
 * @param domNode - Node to unwrap.
 * @returns List of unwrapped nodes.
 */const unwrap=domNode=>{const parent=domNode.parentNode;const result=[];// NOTE: We need to use "Array.from" to copy the list.
for(const childNode of Array.from(domNode.childNodes)){result.push(childNode);if(parent)parent.insertBefore(childNode,domNode)}if(parent)parent.removeChild(domNode);return result};const wrap=(domNodes,wrapper)=>{const domNodeList=domNodes.length?Array.from(domNodes):[domNodes];// Use the first element's position as the anchor point
const first=domNodeList[0];if(first.parentNode)first.parentNode.insertBefore(wrapper,first);for(const domNode of domNodeList)wrapper.appendChild(domNode)};
// EXTERNAL MODULE: ./src/test-helper.ts
var test_helper = __webpack_require__(6);
;// ./src/test/domNode.ts
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
*/const TEST_ENVIRONMENT= true?typeof document==="undefined"?"node":"node-with-dom":0;if(TEST_ENVIRONMENT!=="node"){const divElement=document.createElement("div");globals_.test.each([[null,"<div></div>","p"],["DIV","<div></div>","div"],[null,"<div></div>","div",true],["DIV","<div><div id=\"start\"></div></div>","div"],["P","<div><p><a id=\"start\"></a></p></div>","p"],["DIV","<div><p><a id=\"start\"></a></p></div>","div"]])("%o === closest(%o, %s, %b)",(expected,domNodes,selector,startWithParent=false)=>{const rootNode=createDomNodes(domNodes);(0,globals_.expect)(closest(rootNode.querySelector("#start")||rootNode,selector,startWithParent)?.nodeName||null).toEqual(expected)});(0,globals_.test)("createDomNodes",()=>{const document=createDomNodes("<div></div>");(0,globals_.expect)(document.nodeName).toStrictEqual("DIV");(0,globals_.expect)(document.parentNode).toBeNull()});(0,globals_.test)("fade",()=>{void (0,globals_.expect)(fade(divElement)).resolves.toBeUndefined()});(0,globals_.test)("fadeIn",()=>{void (0,globals_.expect)(fadeIn(divElement)).resolves.toBeUndefined()});(0,globals_.test)("fadeOut",()=>{void (0,globals_.expect)(fadeOut(divElement)).resolves.toBeUndefined()});(0,test_helper/* testEach */.oN)("getAll",getAll,[[divElement],divElement]);globals_.test.each([[[],"<div></div>"],[["DIV"],"<div><div id=\"start\"></div></div>"],[["P","DIV"],"<div><p><a id=\"start\"></a></p></div>"],[["P","DIV","DIV"],"<div><div><p><a id=\"start\"></a></p></div></div>"]])("%o === getParents(%o)",(expected,domNodes)=>{const rootNode=createDomNodes(domNodes);(0,globals_.expect)(getParents(rootNode.querySelector("#start")||rootNode).map(node=>node.nodeName)).toEqual(expected)});(0,test_helper/* testEach */.oN)("getText",getText,[[],divElement],[["hans"],createDomNodes("<div>hans</div>")],[[],createDomNodes("<div><div>hans</div</div>")],[["hans"],createDomNodes("<div><div>hans</div</div>"),true],[["hans"],createDomNodes("<div>hans<div>peter</div></div>")]);(0,test_helper/* testEachAgainstSameExpectation */.NO)("isEquivalent",isEquivalent,true,["test","test"],["test test","test test"],["<div>","<div>"],["<div class>","<div class=\"\">"],["<div style>","<div style=\"\">"],["<div></div>","<div>"],["<div class=\"a\"></div>","<div class=\"a\"></div>"],[createDomNodes("<a target=\"_blank\" class=\"a\"></a>"),"<a class=\"a\" target=\"_blank\"></a>"],["<a target=\"_blank\" class=\"a\"></a>","<a class=\"a\" target=\"_blank\"></a>"],["<a target=\"_blank\" class=\"a\"><div b=\"3\" a=\"2\"></div></a>","<a class=\"a\" target=\"_blank\"><div a=\"2\" b=\"3\"></div></a>"],[`
                <a target="_blank" class="a b">
                    <div b="3" a="2"></div>
                </a>
            `,`
                <a class="a b" target="_blank">
                    <div a="2" b="3"></div>
                </a>
            `],["<div>a</div><div>b</div>","<div>a</div><div>b</div>"],["<div>a</div>b","<div>a</div>b"],["<br>","<br />"],["<div><br><br /></div>","<div><br /><br /></div>"],[" <div style=\"\">"+"german<!--deDE--><!--enUS: english --> </div>"," <div style=\"\">german<!--deDE--><!--enUS: english --> "+"</div>"],["a<br>","a<br />",true]);(0,test_helper/* testEachAgainstSameExpectation */.NO)("isEquivalent",isEquivalent,false,["test",""],["test","hans"],["test test","testtest"],["test test:",""],["<div class=\"a\"></div>","<div>"],[createDomNodes("<a class=\"a\"></a>"),"<a class=\"a\" target=\"_blank\"></a>"],["<a target=\"_blank\" class=\"a\"><div a=\"2\"></div></a>","<a class=\"a\" target=\"_blank\"></a>"],["<div>a</div>b","<div>a</div>c"],[" <div>a</div>","<div>a</div>"],["<div>a</div><div>bc</div>","<div>a</div><div>b</div>"],["text","text a"],["text","text a"],["text","text a & +"]);(0,globals_.test)("isHidden",()=>{const domNode=createDomNodes("<div></div>");domNode.style.height="100px";domNode.style.width="100px";// Not connected to DOM.
(0,globals_.expect)(isHidden(domNode)).toStrictEqual(true);document.body.appendChild(domNode);// Connected to DOM.
(0,globals_.expect)(isHidden(domNode)).toStrictEqual(false);// Hidden via CSS.
domNode.style.display="none";(0,globals_.expect)(isHidden(domNode)).toStrictEqual(true);// Hidden block elements still take space in layout.
domNode.style.display="block";domNode.style.visibility="hidden";(0,globals_.expect)(isHidden(domNode)).toStrictEqual(false);domNode.style.height="0";domNode.style.width="0";(0,globals_.expect)(isHidden(domNode)).toStrictEqual(true);domNode.style.height="100px";domNode.style.width="100px";domNode.style.display="inline";(0,globals_.expect)(isHidden(domNode)).toStrictEqual(true);domNode.textContent="some content";(0,globals_.expect)(isHidden(domNode)).toStrictEqual(false);// Parent is hidden.
const wrapperDomNode=createDomNodes("<div><div id=\"target\"></div></div>");document.body.appendChild(wrapperDomNode);const nestedDomNode=wrapperDomNode.querySelector("#target");(0,globals_.expect)(isHidden(nestedDomNode)).toStrictEqual(false);wrapperDomNode.style.display="none";(0,globals_.expect)(isHidden(nestedDomNode)).toStrictEqual(true);// Form input is visible/hidden.
const inputDomNode=createDomNodes("<input />");document.body.appendChild(inputDomNode);(0,globals_.expect)(isHidden(inputDomNode)).toStrictEqual(false);inputDomNode.setAttribute("type","hidden");(0,globals_.expect)(isHidden(inputDomNode)).toStrictEqual(true)});(0,globals_.test)("onDocumentReady",async()=>{const mockCallback=globals_.jest.fn();await onDocumentReady(mockCallback);(0,globals_.expect)(mockCallback).toHaveBeenCalledTimes(1)});(0,globals_.test)("replace",()=>{const context=createDomNodes("<div><p></p></div>");const domNode=context.querySelector("p");const replacement=createDomNodes("<span></span>");replace(domNode,replacement);(0,globals_.expect)(isEquivalent(context,"<div><span></span></div>")).toStrictEqual(true)});globals_.test.each([["<div><wrapper><p></p></wrapper></div>","<div><p></p></div>",1],["<div><wrapper><p></p>text</wrapper></div>","<div><p></p>text</div>",2],["<wrapper>text</wrapper>","<wrapper>text</wrapper>",1],["<div><wrapper></wrapper></div>","<div></div>",0]])("%s => %s; unwrap().length === %d",(context,expectedContext,expectedChildNodesLength)=>{const contextDomNode=createDomNodes(context);const wrapper=contextDomNode.querySelector("wrapper")??contextDomNode;(0,globals_.expect)(unwrap(wrapper)).toHaveProperty("length",expectedChildNodesLength);(0,globals_.expect)(isEquivalent(contextDomNode,expectedContext)).toStrictEqual(true)});(0,globals_.test)("bound unwrap",()=>{const boundWrapperContext=createDomNodes("<div><wrapper><div></div></wrapper></div>");const boundWrapper=boundWrapperContext.querySelector("wrapper")??boundWrapperContext;document.body.appendChild(boundWrapperContext);(0,globals_.expect)(unwrap(boundWrapper)).toHaveProperty("length",1);(0,globals_.expect)(isEquivalent(boundWrapperContext,"<div><div></div></div>")).toStrictEqual(true)});(0,globals_.test)("wrap",()=>{const domNode=createDomNodes("<div></div>");const wrapper=createDomNodes("<wrapper></wrapper>");wrap(domNode,wrapper);(0,globals_.expect)(isEquivalent(wrapper,"<wrapper><div></div></wrapper>")).toStrictEqual(true);const boundWrapper=createDomNodes("<wrapper></wrapper>");document.body.appendChild(boundWrapper);wrap(wrapper,boundWrapper);(0,globals_.expect)(isEquivalent(boundWrapper,"<wrapper><wrapper><div></div></wrapper></wrapper>")).toStrictEqual(true)})}

/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _filesystem_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(12);
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);
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
*/// NOTE: Jest does not support dynamic imports outside of test.
const TEST_ENVIRONMENT= true?typeof document==="undefined"?"node":"node-with-dom":0;if(true){let resolve=null;let removeSync=null;let unlink=null;(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.beforeAll)(async()=>{const importFilesystemAPIPromise=(0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .importFilesystemAPI */ .L5)();const currentRequire=await (0,_module_js__WEBPACK_IMPORTED_MODULE_3__/* .getCurrentRequire */ .zM)();resolve=currentRequire("path").resolve;removeSync=currentRequire("fs").rmSync;unlink=currentRequire("fs/promises").unlink;await importFilesystemAPIPromise});const testPath="./copyDirectoryRecursiveTest.compiled";(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("importFilesystemAPI",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(removeSync).toBeDefined();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(resolve).toBeDefined();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(unlink).toBeDefined();void (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .importFilesystemAPI */ .L5)()).resolves.toBeDefined()});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("copyDirectoryRecursive",async()=>{removeSync(testPath,{force:true,recursive:true});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .copyDirectoryRecursive */ .vX)("./node_modules/.bin",testPath,false,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE)).toMatch(/\/copyDirectoryRecursiveTest.compiled$/);removeSync(testPath,{force:true,recursive:true})});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("copyDirectoryRecursiveSync",()=>{removeSync(testPath,{force:true,recursive:true});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .copyDirectoryRecursiveSync */ .uD)("./node_modules/.bin",testPath,false,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE)).toMatch(/\/copyDirectoryRecursiveTest.compiled$/);removeSync(testPath,{force:true,recursive:true})});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("copyFile",async()=>{try{await unlink(`./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`)}catch{// Continue regardless of an error.
}let result="";try{result=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .copyFile */ .m3)(resolve("./src/filesystem.ts"),`./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(result).toMatch(new RegExp(`\\.\\/test\\.copyFile\\.${TEST_ENVIRONMENT}\\.compiled\\.js$`));/*
            NOTE: A race condition was identified here. So we need an
            additional digest loop to have this test artifact placed here.
        */await (0,_utility_js__WEBPACK_IMPORTED_MODULE_5__/* .timeout */ .wR)();await unlink(`./test.copyFile.${TEST_ENVIRONMENT}.compiled.js`)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("copyFileSync",async()=>{try{await unlink(`./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`)}catch{// Continue regardless of an error.
};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .copyFileSync */ .Xp)(resolve("./src/filesystem.ts"),`./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`)).toMatch(new RegExp(`\\.\\/test\\.copyFileSync\\.${TEST_ENVIRONMENT}\\.compiled\\`+".js$"));await unlink(`./test.copyFileSync.${TEST_ENVIRONMENT}.compiled.js`)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("isDirectory",async()=>{for(const filePath of["./","../"]){let result=false;try{result=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isDirectory */ .wd)(filePath)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(result).toStrictEqual(true)}for(const filePath of[resolve("./test.ts")]){let result=true;try{result=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isDirectory */ .wd)(filePath)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(result).toStrictEqual(false)}});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isDirectorySync",_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isDirectorySync */ .ZP,true,"./","../");(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isDirectorySync",_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isDirectorySync */ .ZP,false,"./test.ts");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("isFile",async()=>{for(const filePath of[resolve("./src/filesystem.ts")]){let result=false;try{result=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isFile */ .fo)(filePath)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(result).toStrictEqual(true)}for(const filePath of["./","../"]){let result=true;try{result=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isFile */ .fo)(filePath)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(result).toStrictEqual(false)}});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isFileSync",_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isFileSync */ .WY,true,"./src/filesystem.ts");(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isFileSync",_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .isFileSync */ .WY,false,"./","../");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("walkDirectoryRecursively",async()=>{const filePaths=[];const callback=file=>{filePaths.push(file.path);return null};let files=[];try{files=await (0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .walkDirectoryRecursively */ .y3)("./",callback)}catch(error){console.error(error)};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files).toHaveLength(1);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files[0]).toHaveProperty("path");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files[0]).toHaveProperty("stats");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(filePaths).toHaveLength(1)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("walkDirectoryRecursivelySync",()=>{const filePaths=[];const callback=filePath=>{filePaths.push(filePath);return null};const files=(0,_filesystem_js__WEBPACK_IMPORTED_MODULE_2__/* .walkDirectoryRecursivelySync */ .hu)("./",callback);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files).toHaveLength(1);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files[0]).toHaveProperty("path");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(files[0]).toHaveProperty("stats");(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(filePaths).toHaveLength(1)})}

/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _object_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
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
*/(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getParameterNames",_function_js__WEBPACK_IMPORTED_MODULE_2__/* .getParameterNames */ .Gj,[[],function(){// Do nothing.
}],[[],"function() {}"],[["a","b","c"],"function(a, /* dummy*/ b, c/**/) {}"],[["a","b","c"],"(a, /*dummy*/b, c/**/) => {}"],[["a","b","c"],`(a, /*dummy*/b, c/**/) => {
                return 2
            }`],[["a","b","c"],"(a, /* dummy*/b, c/* */) => 2"],[["a","b","c"],"(a, /* dummy*/b = 2, c/* */) => 2"],[["a"],"a => 2"],[["a","b","c"],`class A {
                constructor(a, b, c) {}
                a() {}
            }`]);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("identity",()=>{const testObject={};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_)(testObject)===(0,_object_js__WEBPACK_IMPORTED_MODULE_3__/* .copy */ .C)(testObject)).toStrictEqual(false);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_)(testObject)).toStrictEqual(testObject)});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("identity",_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_,[2,2],["",""],[undefined,undefined],[null,null],["hans","hans"]);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("invertArrayFilter",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_function_js__WEBPACK_IMPORTED_MODULE_2__/* .invertArrayFilter */ .gH)(_array_js__WEBPACK_IMPORTED_MODULE_1__/* .deleteEmptyItems */ .dO)([{a:null}])).toStrictEqual([{a:null}]);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_function_js__WEBPACK_IMPORTED_MODULE_2__/* .invertArrayFilter */ .gH)(_array_js__WEBPACK_IMPORTED_MODULE_1__/* .extractIfMatches */ .u7)(["a","b"],"^a$")).toStrictEqual(["b"])});

/***/ }),
/* 37 */
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var weboptimizer_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(10);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([weboptimizer_browser__WEBPACK_IMPORTED_MODULE_1__]);
var __webpack_async_dependencies_result__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
weboptimizer_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_async_dependencies_result__[0];
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("isAnyMatching",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isAnyMatching */ .GP,true,["",[""]],["test",[/test/]],["test",[/a/,/b/,/es/]],["test",["","test"]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("isAnyMatching",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isAnyMatching */ .GP,false,["",[]],["test",[/tes$/]],["test",[/^est/]],["test",[/^est$/]],["test",["a"]]);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("isArrayLike",async()=>{const browser=await (0,weboptimizer_browser__WEBPACK_IMPORTED_MODULE_1__/* .getInitializedBrowser */ .hA)();for(const value of[[],browser.window.document.querySelectorAll("*")])(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isArrayLike */ .Xj)(value)).toStrictEqual(true)});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isArrayLike",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isArrayLike */ .Xj,false,{},null,undefined,false,true,/a/);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isFunction",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn,true,Object,// eslint-disable-next-line @typescript-eslint/no-implied-eval
new Function("return 1"),function(){// Do nothing.
},_context_js__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE,async()=>{// Do nothing.
});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isFunction",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isFunction */ .Tn,false,null,false,0,1,undefined,{},new Boolean);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isMap",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh,true,new Map,new Map([["a",1]]));(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isMap",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isMap */ .jh,false,null,undefined,{},[],new Set,new WeakMap);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isNumeric",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isNumeric */ .kf,true,0,1,"-10","0",255,"0xFF","8e5","3.1415",10,-10);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isNumeric",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isNumeric */ .kf,false,null,undefined,false,true,"","a",{},/a/,"-0x42","7.2acdgs",NaN,Infinity);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isObject",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv,true,{},[],new Map,new Date,/a/,Object.create(null));(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isObject",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isObject */ .Gv,false,null,undefined,0,"",true,_context_js__WEBPACK_IMPORTED_MODULE_2__/* .NOOP */ .tE);/*
    NOTE: Simulates a plain object created in another realm (a vm context used
    by a test runner or a worker for example) which has its own
    "Object.prototype" instance.
*/const foreignRealmObjectPrototype=Object.create(null);foreignRealmObjectPrototype.constructor=Object.defineProperty(()=>{// Do nothing.
},"name",{value:"Object"});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isPlainObject",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd,true,{},{a:1},// eslint-disable-next-line no-new-object
new Object,Object.create(foreignRealmObjectPrototype));(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isPlainObject",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd,false,new String,Object,null,0,1,true,undefined);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isProxy",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isProxy */ .ju,true,{__target__:{}},{__target__:[]});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isProxy",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isProxy */ .ju,false,null,undefined,0,{},[],{__target__:null},new Proxy({},{}));(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isSet",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM,true,new Set,new Set([1,2]));(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachSingleParameterAgainstSameExpectation */ ._Z)("isSet",_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isSet */ .vM,false,null,undefined,{},[],new Map,new WeakSet);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("isWindow",async()=>{const browser=await (0,weboptimizer_browser__WEBPACK_IMPORTED_MODULE_1__/* .getInitializedBrowser */ .hA)();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isWindow */ .l6)(browser.window)).toStrictEqual(true);for(const value of[null,{},browser])(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_indicators_js__WEBPACK_IMPORTED_MODULE_3__/* .isWindow */ .l6)(value)).toStrictEqual(false)});
__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _module_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("determineGlobalContext",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .determineGlobalContext */ .a8)()).toBe(globalThis)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("setOptionalRequire",()=>{const fakeRequire=id=>{if(id==="missing")throw new Error(`Cannot find module "${id}".`);return{id}};try{(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .setOptionalRequire */ .SD)(fakeRequire);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalRequire */ .I5)("existing")).toStrictEqual({id:"existing"});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalRequire */ .I5)("missing")).toStrictEqual(null);(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .setOptionalRequire */ .SD)(null);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalRequire */ .I5)("existing")).toStrictEqual(null)}finally{;(0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .setOptionalRequire */ .SD)(_module_js__WEBPACK_IMPORTED_MODULE_1__/* .currentRequire */ .lE)}});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("clearRequireCache",()=>{const module={id:"a"};const cache={a:module};(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .clearRequireCache */ .Ni)(cache)).toStrictEqual({a:module});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(cache).toStrictEqual({});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .clearRequireCache */ .Ni)(cache)).toStrictEqual({})});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("isImportSyntaxSupported",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .isImportSyntaxSupported */ .xN)()).toStrictEqual(true)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("optionalImport",async()=>{await (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_module_js__WEBPACK_IMPORTED_MODULE_1__/* .optionalImport */ .Sw)("clientnode-not-existing-module")).resolves.toStrictEqual(null)});

/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
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
*/const now=new Date;(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .testEach */ .oN)("ceil",_number_js__WEBPACK_IMPORTED_MODULE_0__/* .ceil */ .mk,[2,1.5,0],[2,1.4,0],[10,1.4,-1],[1000,1000,-2],[1000,999,-2],[1000,950,-2],[1000,949,-2],[2,1.2345],[1.24,1.2345,2],[1.235,1.2345,3],[1.2345,1.2345,4],[700,699,-2],[700,650,-2],[700,649,-2]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .testEach */ .oN)("floor",_number_js__WEBPACK_IMPORTED_MODULE_0__/* .floor */ .RI,[1,1.5,0],[1,1.4,0],[0,1.4,-1],[1000,1000,-2],[900,999,-2],[900,950,-2],[900,949,-2],[1,1.2345],[1.23,1.2345,2],[1.234,1.2345,3],[1.2345,1.2345,4],[600,699,-2],[600,650,-2],[600,649,-2]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .testEach */ .oN)("round",_number_js__WEBPACK_IMPORTED_MODULE_0__/* .round */ .LI,[2,1.5,0],[1,1.4,0],[0,1.4,-1],[1000,1000,-2],[1000,999,-2],[1000,950,-2],[900,949,-2],[1,1.2345],[1.23,1.2345,2],[1.235,1.2345,3],[1.2345,1.2345,4],[700,699,-2],[700,650,-2],[600,649,-2]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .testEach */ .oN)("getUTCTimestamp",_number_js__WEBPACK_IMPORTED_MODULE_0__/* .getUTCTimestamp */ .n$,[0,new Date(0)],[0,0],[0.001,new Date(1)],[0,new Date(0),true],[1,new Date(1000),false],[1000,new Date(1000),true],[1000,1000,true],[0,new Date(0),false]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_1__/* .testEach */ .oN)("isNotANumber",_number_js__WEBPACK_IMPORTED_MODULE_0__/* .isNotANumber */ .W2,[true,NaN],[false,{}],[false,undefined],[false,now.toString()],[false,null],[false,false],[false,true],[false,0]);

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: ./src/constants.ts
var constants = __webpack_require__(5);
// EXTERNAL MODULE: ./src/context.ts
var context = __webpack_require__(0);
// EXTERNAL MODULE: ./src/indicators.ts
var indicators = __webpack_require__(3);
// EXTERNAL MODULE: ./src/object.ts
var src_object = __webpack_require__(4);
// EXTERNAL MODULE: ./src/test-helper.ts
var test_helper = __webpack_require__(6);
;// external "node:buffer"

;// ./src/test/object.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
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
*/const now=new Date;(0,globals_.test)("addDynamicGetterAndSetter",()=>{(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)(null)).toStrictEqual(null);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)(true)).toStrictEqual(true);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:2})).toStrictEqual({a:2});(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({})).not.toHaveProperty("__target__");(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({},value=>value).__target__).toBeInstanceOf(Object);const mockup={};(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)(mockup)).toStrictEqual(mockup);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)(mockup,value=>value).__target__).toStrictEqual(mockup);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:1},value=>value+2).a).toStrictEqual(3);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:{a:1}},value=>(0,indicators/* isPlainObject */.Qd)(value)?value:value+2).a.a).toStrictEqual(3);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:{a:[{a:1}]}},value=>(0,indicators/* isPlainObject */.Qd)(value)?value:value+2).a.a[0].a).toStrictEqual(3);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:{a:1}},value=>(0,indicators/* isPlainObject */.Qd)(value)?value:value+2,null,{has:"hasOwnProperty"},false).a.a).toStrictEqual(1);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:1},value=>(0,indicators/* isPlainObject */.Qd)(value)?value:value+2,null,{has:"hasOwnProperty"},false,[]).a).toStrictEqual(1);(0,globals_.expect)((0,src_object/* addDynamicGetterAndSetter */.QB)({a:new Map([["a",1]])},value=>(0,indicators/* isPlainObject */.Qd)(value)?value:value+2,null,{delete:"delete",get:"get",set:"set",has:"has"},true,[Map]).a.a).toStrictEqual(3)});(0,globals_.test)("convertCircularObjectToJSON",()=>{const object={a:{}};object.b=object.a;(0,globals_.expect)((0,src_object/* convertCircularObjectToJSON */.zP)(object)).toStrictEqual("{\"a\":{},\"b\":{}}")});(0,globals_.test)("convertCircularObjectToJSON",()=>{const object={};const subObject={a:object};object.a=subObject;(0,globals_.expect)((0,src_object/* convertCircularObjectToJSON */.zP)(object)).toStrictEqual("{\"a\":{\"a\":\"__circularReference__\"}}")});(0,globals_.test)("convertCircularObjectToJSON",()=>{const rootObject=[];const subObject={a:rootObject};rootObject.push(subObject);(0,globals_.expect)((0,src_object/* convertCircularObjectToJSON */.zP)(rootObject)).toStrictEqual("[{\"a\":\"__circularReference__\"}]")});(0,test_helper/* testEach */.oN)("convertCircularObjectToJSON",src_object/* convertCircularObjectToJSON */.zP,["null",null],[undefined,undefined],["5",5],["[]",[]],["[5]",[5]],["[\"a\"]",["a"]],["[\"a\",{\"a\":[]}]",["a",{a:[]}]],["\"A\"","A"],["{}",{}],["{\"a\":null}",{a:null}],["{\"a\":{\"a\":2}}",{a:{a:2}}],["{\"a\":{\"a\":null}}",{a:{a:Infinity}}]);(0,test_helper/* testEach */.oN)("convertMapToPlainObject",src_object/* convertMapToPlainObject */.oW,[null,null],[true,true],[0,0],[2,2],["a","a"],[{},new Map],[[{}],[new Map]],[[new Map],[new Map],false],[[{a:2,"2":2}],[new Map([["a",2],["2",2]])]],[[[{a:{},"2":2}]],[[new Map([["a",new Map],["2",2]])]]],[[[{a:{a:2},"2":2}]],[[new Map([["a",new Map([["a",2]])],["2",2]])]]]);(0,test_helper/* testEach */.oN)("convertPlainObjectToMap",src_object/* convertPlainObjectToMap */.eQ,[null,null],[true,true],[0,0],[2,2],["a","a"],[new Map,{}],[[new Map],[{}]],[[{}],[{}],false],[[new Map([["a",new Map],["b",2]])],[{a:{},b:2}]],[[new Map([["a",new Map],["b",2]])],[{b:2,a:{}}]],[[new Map([["a",new Map],["b",2]])],[{b:2,a:new Map}]],[[new Map([["a",[new Map]],["b",2]])],[{b:2,a:[{}]}]],[[new Map([["a",new Set([new Map])],["b",2]])],[{b:2,a:new Set([{}])}]]);(0,test_helper/* testEach */.oN)("convertSubstringInPlainObject",src_object/* convertSubstringInPlainObject */.dr,[{},{},/a/,""],[{a:"b"},{a:"a"},/a/,"b"],[{a:"ba"},{a:"aa"},/a/,"b"],[{a:"bb"},{a:"aa"},/a/g,"b"],[{a:{a:"bb"}},{a:{a:"aa"}},/a/g,"b"]);(0,test_helper/* testEach */.oN)("copy",src_object/* copy */.C,[21,21],[0,0],[0,0,false,-1],[0,0,false,1],[0,0,false,10],[new Date(0),new Date(0)],[/a/,/a/],[{},{}],[{},{},false,-1],[[],[]],[new Map,new Map],[new Set,new Set],[{a:2},{a:2},false,0],[{a:null},{a:{a:2}},false,0,null],[{a:{a:2}},{a:{a:2}},false,0],[{a:{a:2}},{a:{a:2}},false,1],[{a:{a:2}},{a:{a:2}},false,2],[{a:[null]},{a:[{a:2}]},false,1,null],[{a:[{a:2}]},{a:[{a:2}]},false,2],[{a:{a:2}},{a:{a:2}},false,10],[new Map([["a",2]]),new Map([["a",2]]),false,0],[new Map([["a",null]]),new Map([["a",new Map([["a",2]])]]),false,0,null],[new Map([["a",new Map([["a",2]])]]),new Map([["a",new Map([["a",2]])]]),false,0],[new Map([["a",new Map([["a",2]])]]),new Map([["a",new Map([["a",2]])]]),false,1],[new Map([["a",new Map([["a",2]])]]),new Map([["a",new Map([["a",2]])]]),false,2],[new Map([["a",[null]]]),new Map([["a",[new Map([["a",2]])]]]),false,1,null],[new Map([["a",[new Map([["a",2]])]]]),new Map([["a",[new Map([["a",2]])]]]),false,2],[new Map([["a",new Map([["a",2]])]]),new Map([["a",new Map([["a",2]])]]),false,10],[new Map([["a",new Map([["a",2]])]]),new Map([["a",new Map([["a",2]])]]),false,10],[new Set(["a",2]),new Set(["a",2]),false,0],[new Set([null,null]),new Set(["a",new Set(["a",2])]),false,0,null],[new Set(["a",new Set([null,null])]),new Set(["a",new Set(["a",2])]),false,1,null],[new Set(["a",new Set(["a",2])]),new Set(["a",new Set(["a",2])]),false,1],[new Set(["a",new Set(["a",2])]),new Set(["a",new Set(["a",2])]),false,2],[new Set(["a",[null]]),new Set(["a",[new Set(["a",2])]]),false,1,null],[new Set(["a",[new Set(["a",2])]]),new Set(["a",[new Set(["a",2])]]),false,2],[new Set(["a",new Set(["a",2])]),new Set(["a",new Set(["a",2])]),false,10],[new Set(["a",new Set(["a",2])]),new Set(["a",new Set(["a",2])]),false,10],[{VALUE_COPY_SYMBOL: constants/* VALUE_COPY_SYMBOL */.Fp},{VALUE_COPY_SYMBOL: constants/* VALUE_COPY_SYMBOL */.Fp}]);(0,globals_.test)("determineType",()=>{(0,globals_.expect)((0,src_object/* determineType */.Sj)()).toStrictEqual("undefined")});(0,test_helper/* testEach */.oN)("determineType",src_object/* determineType */.Sj,["undefined",undefined],["undefined",{}.notDefined],["null",null],["boolean",true],["boolean",new Boolean],["number",3],["number",new Number(3)],["string",""],["string",new String("")],["string","test"],["string",new String("test")],["function",function(){// Do nothing.
}],["function",context/* NOOP */.tE],["array",[]],/*
        eslint-disable
        @typescript-eslint/no-array-constructor,no-array-constructor
    */["array",new Array],/*
        eslint-enable
        @typescript-eslint/no-array-constructor,no-array-constructor
    */["date",now],["error",new Error],["map",new Map],["set",new Set],["regexp",/test/]);(0,test_helper/* testEachAgainstSameExpectation */.NO)("equals",src_object/* equals */.aI,true,[1,1],[now,now],[new Date(1995,11,17),new Date(1995,11,17)],[/a/,/a/],[{a:2},{a:2}],[{a:2,b:3},{a:2,b:3}],[[1,2,3],[1,2,3]],[[],[]],[{},{}],[new Map,new Map],[new Set,new Set],[[1,2,3,{a:2}],[1,2,3,{a:2}]],[[1,2,3,new Map([["a",2]])],[1,2,3,new Map([["a",2]])]],[[1,2,3,new Set(["a",2])],[1,2,3,new Set(["a",2])]],[[1,2,3,[1,2]],[1,2,3,[1,2]]],[[{a:1}],[{a:1}]],[[{a:1,b:1}],[{a:1}],{properties:[]}],[[{a:1,b:1}],[{a:1}],{properties:["a"]}],[2,2,{deep:0}],[[{a:1,b:1}],[{a:1}],{deep:0}],[[{a:1},{b:1}],[{a:1},{b:1}],{deep:1}],[[{a:{b:1}},{b:1}],[{a:1},{b:1}],{deep:1}],[[{a:{b:1}},{b:1}],[{a:{b:1}},{b:1}],{deep:2}],[[{a:{b:{c:1}}},{b:1}],[{a:{b:1}},{b:1}],{deep:2}],[[{a:{b:{c:1}}},{b:1}],[{a:{b:1}},{b:1}],{deep:3,properties:["b"]}],[context/* NOOP */.tE,context/* NOOP */.tE],[context/* NOOP */.tE,context/* NOOP */.tE,{ignoreFunctions:false}]);if(true)(0,globals_.test)("equals",()=>{(0,globals_.expect)((0,src_object/* equals */.aI)(Buffer.from("a"),Buffer.from("a"),{compareBlobs:true,properties:[]})).toStrictEqual(true)});else// removed by dead control flow
{};(0,test_helper/* testEachAgainstSameExpectation */.NO)("equals",src_object/* equals */.aI,false,[[{a:{b:1}},{b:1}],[{a:1},{b:1}],{deep:2}],[[{a:{b:{c:1}}},{b:1}],[{a:{b:1}},{b:1}],{deep:3}],[new Date(1995,11,17),new Date(1995,11,16)],[/a/i,/a/],[1,2],[{a:2,b:3},{a:2}],[[1,2,3,4],[1,2,3,5]],[[1,2,3,4],[1,2,3]],[[1,2,3,{a:2}],[1,2,3,{b:2}]],[[1,2,3,new Map([["a",2]])],[1,2,3,new Map([["b",2]])]],[[1,2,3,new Set(["a",2])],[1,2,3,new Set(["b",2])]],[[1,2,3,[1,2]],[1,2,3,[1,2,3]]],[[1,2,3,[1,2,3]],[1,2,3,[1,2]]],[[1,2,3,[1,2,3]],[1,2,3,[1,2,{}]]],[[{a:1,b:1}],[{a:1}]],[[{a:1,b:1}],[{a:1}],{properties:["a","b"]}],[1,2,{deep:0}],[[{a:1},{b:1}],[{a:1}],{deep:1}],[context/* NOOP */.tE,()=>{// Do nothing.
},{deep:-1,ignoreFunctions:false,properties:[]}]);(0,test_helper/* testEach */.oN)("equals",src_object/* equals */.aI,[">>> 1 !== 2",1,2,{returnReasonIfNotEqual:true}],["a >>> 1 !== 2",{a:1},{a:2},{returnReasonIfNotEqual:true}],["a[1] >>> 2 !== 1",{a:[1,2]},{a:[1,1]},{returnReasonIfNotEqual:true}],["a[1].a >>> 2 !== 1",{a:[1,{a:2}]},{a:[1,{a:1}]},{returnReasonIfNotEqual:true}],["a[1].a >>> {-> 2 not found}",{a:[1,{a:new Set([2])}]},{a:[1,{a:new Set([1])}]},{returnReasonIfNotEqual:true}],["a[1].a.get(1) >>> 1 !== 2",{a:[1,{a:new Map([[1,1]])}]},{a:[1,{a:new Map([[1,2]])}]},{returnReasonIfNotEqual:true}]);(0,test_helper/* testEachResolvedPromise */.FQ)("evaluateAsyncDynamicData",src_object/* evaluateAsyncDynamicData */.Pi,[4,{__async_evaluate__:"Promise.resolve(1 + 3)"}],[[1],[{__async_evaluate__:"Promise.resolve(1)"}]],[["1"],[{__async_evaluate__:`Promise.resolve('1')`}]]);(0,test_helper/* testEach */.oN)("evaluateDynamicData",src_object/* evaluateDynamicData */.J3,[null,null],[false,false],["1","1"],[3,3],[{},{}],[{a:null},{a:null}],[4,{__evaluate__:"1 + 3"}],[[1],[{__evaluate__:"1"}]],[["1"],[{__evaluate__:`'1'`}]],[{a:"a"},{a:{__evaluate__:`'a'`}}],[{a:1},{a:{__evaluate__:"1"}}],[{a:{__evaluate__:"self.b"},b:2},{a:{__evaluate__:"self.b"},b:2},{scope:{},selfReferenceName:"self",expressionIndicatorKey:"__run__"}],[{a:1,b:1},{a:{__run:"_.b"},b:1},{scope:{},selfReferenceName:"_",expressionIndicatorKey:"__run"}],[{a:[1],b:1},{a:[{__run:"self.b"}],b:1},{scope:{},selfReferenceName:"self",expressionIndicatorKey:"__run"}],[{a:2,b:2},{a:{__evaluate__:"self.b"},b:2}],[{a:2,b:2},{a:{__evaluate__:"c.b"},b:2},{scope:{},selfReferenceName:"c"}],[{a:2,b:2,c:2},{a:{__evaluate__:"self.b"},b:{__evaluate__:"self.c"},c:2}],[{a:3,b:3,c:3,d:3,e:3,f:3},{a:{__execute__:"return self.b"},b:{__execute__:"return self.c"},c:{__execute__:"return self.d"},d:{__execute__:"return self.e"},e:{__execute__:"return self.f"},f:3}],[{commandLine:{test:{command:"run node && run jsdom",environments:["node","jsdom"]}},generic:{isWeb:true}},{commandLine:{test:{command:{__evaluate__:"self.commandLine.test.environments"+".map((environment) => `run ${environment}`)"+".join(' && ')"},environments:{__evaluate__:`['node'].concat(
                            self.generic.isWeb ? 'jsdom' : []
                        )`}}},generic:{isWeb:true}}],[{module:{preprocessor:{ejs:{options:{locals:{LANGUAGES:["enUS","deDE"],NAME:"web-documentation"}}},html:{options:{locals:{LANGUAGES:["enUS","deDE"],NAME:"web-documentation"}}}}}},{module:{preprocessor:{ejs:{options:{locals:{LANGUAGES:{__evaluate__:"self.module.preprocessor.html.options.locals"+".NAME === 'web-documentation' ? "+"['enUS', 'deDE'] : ['enUS']"},NAME:"web-documentation"}}},html:{options:{locals:{__evaluate__:"self.module.preprocessor.ejs.options.locals"}}}}}}],[{a:3,b:{d:{e:3}},c:{d:{e:3}}},{a:{__evaluate__:"self.b.d.e"},b:{__evaluate__:"self.c"},c:{d:{e:3}}}],[{a:"kk <-> \"1\", \"2\", \"3\" <-> jj",b:"kk <-> \"1\", \"2\", \"3\" <-> jj",c:"kk <-> \"1\", \"2\", \"3\" <-> jj",d:"kk <-> \"1\", \"2\", \"3\" <-> jj",e:"kk <-> \"1\", \"2\", \"3\" <-> jj",f:{i:"kk <-> \"1\", \"2\", \"3\" <-> jj"},g:{h:{i:"kk <-> \"1\", \"2\", \"3\" <-> jj"}},j:"jj",k:"kk <-> \"1\", \"2\", \"3\"",l:[1,2,3],m:{a:[1,2,3]},n:{a:[1,2,3]},o:[{a:2,b:[[[100]]]}]},{n:{__evaluate__:"{a: [1, 2, 3]}"},b:{__evaluate__:"self.c"},f:{__evaluate__:"self.g.h"},d:{__evaluate__:"self.e"},a:{__evaluate__:"self.b"},e:{__evaluate__:"self.f.i"},k:{__evaluate__:"`kk <-> \"${self.l.join('\", \"')}\"`"},c:{__evaluate__:"self.d"},o:[{a:2,b:[[[{__evaluate__:"10 ** 2"}]]]}],l:{__evaluate__:"self.m.a"},g:{h:{i:{__evaluate__:"`${self.k} <-> ${self.j}`"}}},m:{a:[1,2,{__evaluate__:"3"}]},j:"jj"}],[{a:[2],b:{d:{e:[2]}},c:{d:{e:[2]}}},{a:{__evaluate__:"_.b.d.e"},b:{__evaluate__:"_.c"},c:{d:{e:{__evaluate__:"tools.copy([2])"}}}},{scope:{tools:{copy: src_object/* copy */.C}},selfReferenceName:"_"}],[{a:{b:1,c:1}},{a:{b:1,c:{__evaluate__:"self.a.b"}}}],[{a:{b:null,c:null}},{a:{b:null,c:{__evaluate__:"self.a.b"}}}],[{a:{b:undefined,c:undefined}},{a:{b:undefined,c:{__evaluate__:"self.a.b"}}}],[{a:{b:"jau",c:"jau"}},{a:{b:"jau",c:{__evaluate__:"self.a.b"}}}],[{a:{b:{c:"jau",d:"jau"}}},{a:{b:{c:"jau",d:{__evaluate__:"self.a.b.c"}}}}],[{a:{b:"test",c:"tet"}},{a:{b:{__evaluate__:"\"t\" + \"es\" + \"t\""},c:{__evaluate__:"removeS(self.a.b)"}}},{scope:{removeS:value=>value.replace("s","")}}],[{a:"a",b:"a"},{a:{__evaluate__:"toString(self.b)"},b:{__evaluate__:`'a'`}},{scope:{toString:value=>value}}],[{a:["a"],b:{a:2}},{a:{__evaluate__:"Object.getOwnPropertyNames(self.b)"},b:{__evaluate__:"{a: 2}"}}],[{a:["a"],b:{a:2}},{a:{__evaluate__:"Reflect.ownKeys(self.b)"},b:{__evaluate__:"{a: 2}"}}],[{a:["a","b"],b:{a:1,b:2},c:{a:1,b:2}},{a:{__evaluate__:"Object.getOwnPropertyNames(self.b)"},b:{__evaluate__:"self.c"},c:{__execute__:"return {a: 1, b: 2}"}}],/*
        NOTE: This describes a workaround until the "ownKeys" proxy trap works
        for this use cases.
    */[{a:["a"],b:{a:2}},{a:{__evaluate__:"Object.keys(resolve(self.b))"},b:{__evaluate__:"{a: 2}"}}],[{a:["a","b","c"],b:{a:1,b:2,c:3}},{a:{__evaluate__:`(() => {
                    const result = []
                    for (const key in resolve(self.b))
                        result.push(key)
                    return result
                })()`},b:{__evaluate__:"{a: 1, b: 2, c: 3}"}}]);(0,test_helper/* testEach */.oN)("removeKeysInEvaluation",src_object/* removeKeysInEvaluation */.iE,[{},{}],[{a:2},{a:2}],[{__evaluate__:""},{a:2,__evaluate__:""}],[{a:2,b:{__evaluate__:""}},{a:2,b:{__evaluate__:"",c:4}}]);(0,globals_.test)("extend",()=>{const target={a:[1,2]};(0,src_object/* extend */.X$)(true,target,{a:[3,4]});(0,globals_.expect)(target).toStrictEqual({a:[3,4]});const blob=new Blob;(0,src_object/* extend */.X$)(true,target,{blob});(0,globals_.expect)(target.blob).toStrictEqual(blob)});const bufferA=new Buffer(0);const bufferB=new Buffer(1);const arrayBufferA=new ArrayBuffer(1);const arrayBufferB=new ArrayBuffer(2);(0,test_helper/* testEach */.oN)("extend",src_object/* extend */.X$,[[],[]],[{},{}],[{a:1},{a:1}],[{a:2},{a:1},{a:2}],[{a:2},{},{a:1},{a:2}],[{a:2},{},{a:1},{a:2}],[{a:2,b:{b:1}},{a:1,b:{a:1}},{a:2,b:{b:1}}],[{a:{b:bufferB}},{a:{b:bufferA}},{a:{b:bufferB}}],[{a:{b:arrayBufferB}},{a:{b:arrayBufferA}},{a:{b:arrayBufferB}}],[[1],[1,2],[1]],[new Map,new Map],[new Set,new Set],[new Map([["a",1]]),new Map([["a",1]])],[new Map([["a",2]]),new Map([["a",1]]),new Map([["a",2]])],[new Map([["a",2]]),new Map,new Map([["a",1]]),new Map([["a",2]])],[new Map([["a",2]]),new Map,new Map([["a",1]]),new Map([["a",2]])],[new Map([["a",2],["b",new Map([["b",1]])]]),new Map([["a",1],["b",new Map([["a",1]])]]),new Map([["a",2],["b",new Map([["b",1]])]])],[{},true,{}],[{a:2,b:{a:1,b:1}},true,{a:1,b:{a:1}},{a:2,b:{b:1}}],[{a:2,b:{a:[],b:1}},true,{a:1,b:{a:[]}},{a:2,b:{b:1}}],[{a:{a:[3,4]}},true,{a:{a:[1,2]}},{a:{a:[3,4]}}],[{a:{a:null}},true,{a:{a:[1,2]}},{a:{a:null}}],[{a:true},true,{a:{a:[1,2]}},{a:true}],[{a:{_a:1,b:2}},true,{a:{_a:1}},{a:{b:2}}],[{a:2,_a:1},false,{_a:1},{a:2}],[false,true,{a:{a:[1,2]}},false],[undefined,true,{a:{a:[1,2]}},undefined],[{a:3},true,{a:1},{a:2},{a:3}],[[1,2],true,[1],[1,2]],[[1],true,[1,2],[1]],[new Map,true,new Map],[new Map([["a",2],["b",new Map([["a",1],["b",1]])]]),true,new Map([["a",1],["b",new Map([["a",1]])]]),new Map([["a",2],["b",new Map([["b",1]])]])],[new Map([["a",2],["b",new Map([["a",[]],["b",1]])]]),true,new Map([["a",1],["b",new Map([["a",[]]])]]),new Map([["a",2],["b",new Map([["b",1]])]])],[new Map([["a",new Map([["a",[3,4]]])]]),true,new Map([["a",new Map([["a",[1,2]]])]]),new Map([["a",new Map([["a",[3,4]]])]])],[[1,2],[1,2],undefined],[undefined,true,[1,2],undefined],[null,[1,2],null]);(0,globals_.test)("getProxyHandler",()=>{(0,globals_.expect)((0,indicators/* isPlainObject */.Qd)((0,src_object/* getProxyHandler */.bo)({}))).toStrictEqual(true);(0,globals_.expect)((0,indicators/* isPlainObject */.Qd)((0,src_object/* getProxyHandler */.bo)(new Map,{get:"get"}))).toStrictEqual(true)});(0,test_helper/* testEach */.oN)("mask",src_object/* mask */.dK,[{},{},{}],[{a:2},{a:2},{}],[{},{a:2},{include:false}],[{a:2},{a:2},{include:true}],[{a:2},{a:2},{include:{a:true}}],[{},{a:2},{include:{b:true}}],[{},{a:2},{include:{a:false}}],[{},{a:2},{include:{b:false}}],[{a:2},{a:2,b:3},{include:{a:true}}],[{},{a:2,b:3},{include:{}}],[{b:3},{a:2,b:3},{include:{a:false,b:true}}],[{b:{a:2}},{a:2,b:{a:2}},{include:{a:false,b:true}}],[{b:{}},{a:2,b:{a:2}},{include:{a:false,b:{}}}],[{b:{a:2}},{a:2,b:{a:2}},{include:{a:false,b:{a:true}}}],[{a:2,b:{}},{a:2,b:{a:2}},{include:{a:true,b:{a:false}}}],[{a:2,b:{}},{a:2,b:{a:2}},{include:{a:true,b:{a:false},c:true}}],[{a:2,b:{a:2}},{a:2,b:{a:2}},{include:{a:true,b:{a:true}}}],[{a:{a:{a:{a:2}}}},{a:{a:{a:{a:2,b:3}}}},{include:{a:{a:{a:{a:true}}}}}],[{a:{a:{a:{a:2,b:3}}}},{a:{a:{a:{a:2,b:3}}}},{include:{a:{a:{a:true}}}}],[{},{a:2},{exclude:true}],[{a:2},{a:2},{exclude:false}],[{},{a:2},{exclude:{a:true}}],[{a:2},{a:2},{exclude:{b:true}}],[{a:2},{a:2},{exclude:{b:true}}],[{a:2},{a:2,b:3},{exclude:{b:true}}],[{a:2,b:3},{a:2,b:3},{exclude:{b:false}}],[{a:2,b:{a:2}},{a:2,b:{a:2}},{exclude:{b:{}}}],[{a:2,b:{}},{a:2,b:{a:2}},{exclude:{b:{a:true}}}],[{a:2},{a:2,b:{a:2}},{exclude:{b:true}}],[{a:2,b:{a:2}},{a:2,b:{a:2}},{exclude:{b:{a:false}}}],[{a:{a:{a:{b:3}}}},{a:{a:{a:{a:2,b:3}}}},{exclude:{a:{a:{a:{a:true}}}}}],[{a:{a:{}}},{a:{a:{a:{a:2,b:3}}}},{exclude:{a:{a:{a:true}}}}],[{a:"a"},{a:"a",b:"b"},{exclude:["b"]}],[{b:"b"},{a:"a",b:"b"},{include:["b"]}]);globals_.test.each([[{},{},{},{}],[{a:2},{},{a:2},{}],[{a:2},{b:1},{a:2},{b:1}],[{},{},{a:2},{__remove__:"a"}],[{},{},{a:2},{__remove__:["a"]}],[{a:[1,2]},{},{a:[2]},{a:{__prepend__:1}}],[{a:[2]},{},{a:[2]},{a:{__remove__:1}}],[{a:[2]},{},{a:[2,1]},{a:{__remove__:1}}],[{a:[]},{},{a:[2,1]},{a:{__remove__:[1,2]}}],[{a:[]},{},{a:[1]},{a:{__remove__:1}}],[{a:[]},{},{a:[1]},{a:{__remove__:[1,2]}}],[{a:[2,1]},{},{a:[2]},{a:{__append__:1}}],[{a:[2,1,2]},{},{a:[2]},{a:{__append__:[1,2]}}],[{a:[2,1,2]},{b:1},{a:[2]},{a:{__append__:[1,2]},b:1}],[{a:[2,1,2]},{b:1},{a:[2]},{a:{add:[1,2]},b:1},"rm","unshift","add"],[{a:[2]},{a:{__prepend__:1}},{a:[2]},{a:{__prepend__:1}},"_r","_p"],[{a:[1,3,2]},{},{a:[2]},{a:{__prepend__:[1,3]}}],[{a:["s",2,1,2]},{},{a:[2]},{a:{__append__:[1,2],__prepend__:"s"}}],[{a:["s",2]},{},{a:[2,2]},{a:{__prepend__:"s",__remove__:2}}],[{a:["s"]},{},{a:[2,2]},{a:{__prepend__:"s",__remove__:[2,2]}}],[{a:["s",1,"a"]},{},{a:[2,1,2]},{a:{__prepend__:"s",__remove__:[2,2],__append__:"a"}}],[{a:[2,"s",2]},{},{a:[2,1,2]},{a:{__1__:"s"}}],// A nested object in an array should be extended.
[{a:[1,{a:2,b:3},2]},{},{a:[1,{a:1,b:3},2]},{a:{__1__:{a:2}}}],// Index assignment is not present. Nothing will be modified.
[{a:[2,1,2]},{a:{__3__:"s"}},{a:[2,1,2]},{a:{__3__:"s"}}],[{a:[2,1,2]},{a:{__evaluate__:"s"}},{a:[2,1,2]},{a:{__evaluate__:"s"}}]])("%p (=> %p) === modifyObject(%p, %p, ...%p)",(sliced,modified,...parameters)=>{(0,globals_.expect)((0,src_object/* modifyObject */._2)(...parameters)).toStrictEqual(sliced);(0,globals_.expect)(parameters[1]).toStrictEqual(modified)});(0,test_helper/* testEach */.oN)("removeKeyPrefixes",src_object/* removeKeyPrefixes */.uu,[{},{},[]],[new Set,new Set,"#"],[new Map,new Map,[]],[5,5,[]],["a","a",[]],[[],[],[]],[{b:3},{a:2,b:3},["a"]],[{b:3},{a:2,a0:2,b:3},["a"]],[new Map([["3",[]]]),new Map([["3",["a:to remove"]],["a",3]]),"a"],[[{a:["value"]}],[{a:["#:comment","value","#: remove"]}],"#"],[[{a:new Set(["value"])}],[{a:new Set(["#:comment","value","#: remove"])}],"#"],[[{a:new Map([["key","value"]])}],[{a:new Map([["#","comment"],["key","value"],["#","remove"]])}],"#"]);(0,test_helper/* testEach */.oN)("represent",src_object/* represent */.Do,["\"\"",""],[`{
                a: "A",
                b: 123,
                c: null,
                d: [
                    "a",
                    1,
                    null
                ]
            }`.replace(/(\n) {12}/g,"$1"),{a:"A",b:123,c:null,d:["a",1,null]}]);(0,test_helper/* testEach */.oN)("sort",src_object/* sort */.di,[[],[]],[[],{}],[[0],[1]],[[0,1,2],[1,2,3]],[[0,1,2],[3,2,1]],[[0,1,2],[2,3,1]],[["1","2","3"],{"1":2,"2":5,"3":"a"}],[["-5","1","2"],{"2":2,"1":5,"-5":"a"}],[["1","2","3"],{"3":2,"2":5,"1":"a"}],[["a","b","c"],{a:2,b:5,c:"a"}],[["a","b","c"],{c:2,b:5,a:"a"}],[["b","c","z"],{b:2,c:5,z:"a"}]);(0,test_helper/* testEach */.oN)("unwrapProxy",src_object/* unwrapProxy */.q1,[{},{}],[{a:"a"},{a:"a"}],[{a:"aa"},{a:"aa"}],[{a:2},{a:{__revoke__:context/* NOOP */.tE,__target__:2}}]);

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: ./src/context.ts
var context = __webpack_require__(0);
;// ./src/process.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module process *//* !
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
 * Generates a one shot close handler which triggers given promise methods.
 * If a reason is provided it will be given as resolve target. An Error will be
 * generated if return code is not zero. The generated Error has a property
 * "returnCode" which provides corresponding process return code.
 * @param resolve - Promise's resolve function.
 * @param reject - Promise's reject function.
 * @param reason - Promise target if process has a zero return code.
 * @param callback - Optional function to call of process has successfully
 * finished.
 * @returns Process close handler function.
 */const getProcessCloseHandler=(resolve,reject,reason=null,callback=context/* NOOP */.tE)=>{let finished=false;return(returnCode,...parameters)=>{if(finished)finished=true;else{finished=true;if(typeof returnCode!=="number"||returnCode===0){callback();resolve({reason,parameters})}else{const error=new Error(`Task exited with error code ${String(returnCode)}`);error.returnCode=returnCode;error.parameters=parameters;reject(error)}}}};/**
 * Forwards given child process communication channels to corresponding current
 * process communication channels.
 * @param childProcess - Child process meta data.
 * @returns Given child process meta data.
 */const handleChildProcess=childProcess=>{if(childProcess.stdout)childProcess.stdout.pipe(process.stdout);if(childProcess.stderr)childProcess.stderr.pipe(process.stderr);childProcess.on("close",returnCode=>{if(returnCode!==0)console.error(`Task exited with error code ${String(returnCode)}`)});return childProcess};
// EXTERNAL MODULE: ./src/module.ts
var src_module = __webpack_require__(7);
;// external "stream"

;// ./src/test/process.ts
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
*/const{ChildProcess=null}=(0,src_module/* optionalRequire */.I5)("child_process")||{};if(ChildProcess){(0,globals_.test)("getProcessCloseHandler",()=>{(0,globals_.expect)(typeof getProcessCloseHandler(context/* NOOP */.tE,context/* NOOP */.tE)).toStrictEqual("function")});(0,globals_.test)("handleChildProcess",()=>{/**
         * A mockup duplex stream for mocking "stdout" and "strderr" process
         * connections.
         */class MockupDuplexStream extends (0,src_module/* optionalRequire */.I5)("stream").Duplex{/**
             * Triggers if contents from current stream should be red.
             */_read(){// Do nothing.
}/**
             * Triggers if contents should be written on current stream.
             * @param _chunk - The chunk to be written. Will always be a buffer
             * unless the "decodeStrings" option was set to "false".
             * @param _encoding - Specifies encoding to be used as input data.
             * @param callback - Will be called if data has been written.
             */_write(_chunk,_encoding,callback){callback(new Error("test"))}}const stdoutMockupDuplexStream=new MockupDuplexStream;const stderrMockupDuplexStream=new MockupDuplexStream;const childProcess=new ChildProcess;childProcess.stdout=stdoutMockupDuplexStream;childProcess.stderr=stderrMockupDuplexStream;(0,globals_.expect)(handleChildProcess(childProcess)).toStrictEqual(childProcess)})}

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
;// external "prop-types"

;// ./src/property-types.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module propertTypes *//* !
    region header
    [Project page](https://tsickert.com/react-material-input)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/// region imports
function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==typeof o?o:o+""}function _toPrimitive(t,e){if("object"!=typeof t||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)};// endregion
const NullSymbol=Symbol("clientnodePropertyTypesNull");const UndefinedSymbol=Symbol("clientnodePropertyTypesUndefined");const RealTypes={any:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.any,array:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.array,arrayOf:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.arrayOf,bool:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.bool,boolean:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.bool,element:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.element,elementType:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.elementType,exact:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.exact,func:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.func,instanceOf:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.instanceOf,node:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.node,number:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.number,object:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.object,objectOf:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.objectOf,oneOf:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.oneOf,oneOfType:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.oneOfType,shape:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.shape,string:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.string,symbol:__WEBPACK_EXTERNAL_MODULE_prop_types_4fd581b5_default__.symbol};const createDummy=(result=null)=>{const type=()=>result;type.isRequired=()=>null;return type};/**
 * Dummy validation class.
 * @property message - Holds error message as string.
 */class ValidationError extends Function{/**
     * Initializes dummy validation error instance.
     */constructor(){super("return null");_defineProperty(this,"message","DummyErrorMessage")}}/*
    NOTE: Each value has to be different (a real copy) to distinguish them from
    each other during runtime property reflections.
    Strict equality checks between different values have to be negative.
*/const DummyTypes={any:createDummy(),array:createDummy(),arrayOf:createDummy(new ValidationError),bool:createDummy(),boolean:createDummy(),element:createDummy(),elementType:createDummy(new ValidationError),exact:createDummy(),func:createDummy(),instanceOf:createDummy(new ValidationError),node:createDummy(),number:createDummy(),object:createDummy(),objectOf:createDummy(new ValidationError),oneOf:createDummy(new ValidationError),oneOfType:createDummy(new ValidationError),shape:createDummy(new ValidationError),string:createDummy(),symbol:createDummy()};const PropertyTypes=["debug","dev","development"].includes((process.env.NODE_ENV||"").trim().toLowerCase())?RealTypes:DummyTypes;const any=PropertyTypes.any;const array=PropertyTypes.array;const arrayOf=PropertyTypes.arrayOf;const bool=PropertyTypes.bool;const property_types_boolean=PropertyTypes.bool;const property_types_element=PropertyTypes.element;const elementType=PropertyTypes.elementType;const exact=PropertyTypes.exact;const func=PropertyTypes.func;const instanceOf=PropertyTypes.instanceOf;const node=PropertyTypes.node;const number=PropertyTypes.number;const object=PropertyTypes.object;const objectOf=PropertyTypes.objectOf;const oneOf=PropertyTypes.oneOf;const oneOfType=PropertyTypes.oneOfType;const shape=PropertyTypes.shape;const string=PropertyTypes.string;const symbol=PropertyTypes.symbol;/* harmony default export */ const property_types = ((/* unused pure expression or super */ null && (PropertyTypes)));
;// ./src/test/property-types.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,globals_.test)("createDummy",()=>{const dummy=createDummy();(0,globals_.expect)(dummy).toBeInstanceOf(Function);(0,globals_.expect)(dummy()).toStrictEqual(null);(0,globals_.expect)(dummy.isRequired({},"","","","")).toStrictEqual(null);const error=new Error("test");(0,globals_.expect)(createDummy(error)()).toStrictEqual(error);(0,globals_.expect)(createDummy()).not.toStrictEqual(createDummy())});(0,globals_.test)("DummyTypes",()=>{(0,globals_.expect)(DummyTypes.any).not.toStrictEqual(DummyTypes.array);(0,globals_.expect)(DummyTypes.any).toBeInstanceOf(Function);(0,globals_.expect)(DummyTypes.any()).toStrictEqual(null);(0,globals_.expect)(DummyTypes.any).toHaveProperty("isRequired");(0,globals_.expect)(DummyTypes.any.isRequired).toBeInstanceOf(Function);(0,globals_.expect)(DummyTypes.any.isRequired({},"","","","")).toStrictEqual(null);(0,globals_.expect)(DummyTypes.arrayOf).toBeInstanceOf(Function);(0,globals_.expect)(DummyTypes.arrayOf()).toBeInstanceOf(Function);(0,globals_.expect)(DummyTypes.arrayOf()()).toStrictEqual(null)});

/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: external "@jest/globals"
var globals_ = __webpack_require__(2);
// EXTERNAL MODULE: external "core-js/modules/es.array.includes.js"
var es_array_includes_js_ = __webpack_require__(1);
// EXTERNAL MODULE: ./src/context.ts
var context = __webpack_require__(0);
;// ./src/scope.ts
/* unused harmony import specifier */ var array;
/* unused harmony import specifier */ var datetime;
/* unused harmony import specifier */ var filesystem;
/* unused harmony import specifier */ var functions;
/* unused harmony import specifier */ var indicators;
/* unused harmony import specifier */ var logger;
/* unused harmony import specifier */ var scope_module;
/* unused harmony import specifier */ var number;
/* unused harmony import specifier */ var object;
/* unused harmony import specifier */ var string;
/* unused harmony import specifier */ var utility;
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module scope *//* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/const UTILITY_SCOPE=(/* unused pure expression or super */ null && ({array,datetime,filesystem,functions,indicators,logger,module: scope_module,number,object,string,utility}));/*
    NOTE: Not generating these two arrays facilitates static code analysis in
    consuming code.
*/const UTILITY_SCOPE_NAMES=(/* unused pure expression or super */ null && (["array","datetime","filesystem","functions","indicators","logger","module","number","object","string","utility"]));const UTILITY_SCOPE_VALUES=(/* unused pure expression or super */ null && ([array,datetime,filesystem,functions,indicators,logger,scope_module,number,object,string,utility]));/**
 * Generates a unique name in given scope (useful for jsonp requests).
 * @param prefix - A prefix which will be prepended to unique name.
 * @param suffix - A suffix which will be prepended to unique name.
 * @param scope - A scope where the name should be unique.
 * @param initialUniqueName - An initial scope name to use if not exists.
 * @returns The function name.
 */const determineUniqueScopeName=(prefix="callback",suffix="",scope=context/* globalContext */.Lz,initialUniqueName="")=>{if(initialUniqueName.length&&!(initialUniqueName in scope))return initialUniqueName;let uniqueName=prefix+suffix;for(let iteration=0;iteration<context/* MAXIMAL_NUMBER_OF_ITERATIONS */.$Q.value;iteration++){uniqueName=prefix+String(Math.round(Math.random()*Math.pow(10,10)))+suffix;if(!(uniqueName in scope))break}return uniqueName};/**
 * Overwrites all inherited variables from parent scope with "undefined".
 * @param scope - A scope where inherited names will be removed.
 * @param prefixesToIgnore - Name prefixes to ignore during deleting names in
 * given scope.
 * @returns The isolated scope.
 */const isolateScope=(scope,prefixesToIgnore=[])=>{for(const name in scope)if(!(prefixesToIgnore.includes(name.charAt(0))||["constructor","prototype","this"].includes(name)||Object.prototype.hasOwnProperty.call(scope,name)))/*
                NOTE: Delete ("delete $scope[name]") doesn't destroy the
                automatic lookup to parent scope.
            */scope[name]=undefined;return scope};
;// ./src/test/scope.ts
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,globals_.test)("determineUniqueScopeName",()=>{(0,globals_.expect)(determineUniqueScopeName()).toStrictEqual(globals_.expect.stringMatching(/^callback/));(0,globals_.expect)(determineUniqueScopeName("hans")).toStrictEqual(globals_.expect.stringMatching(/^hans/));(0,globals_.expect)(determineUniqueScopeName("hans","",{})).toStrictEqual(globals_.expect.stringMatching(/^hans/));(0,globals_.expect)(determineUniqueScopeName("hans","",{},"peter")).toStrictEqual("peter");(0,globals_.expect)(determineUniqueScopeName("hans","",{peter:2},"peter")).toStrictEqual(globals_.expect.stringMatching(/^hans/));const name=determineUniqueScopeName("hans","klaus",{peter:2},"peter");(0,globals_.expect)(name).toStrictEqual(globals_.expect.stringMatching(/^hans/));(0,globals_.expect)(name).toStrictEqual(globals_.expect.stringMatching(/klaus$/));(0,globals_.expect)(name.length).toBeGreaterThan("hans".length+"klaus".length)});(0,globals_.test)("isolateScope",()=>{(0,globals_.expect)(isolateScope({})).toStrictEqual({});(0,globals_.expect)(isolateScope({a:2})).toStrictEqual({a:2});(0,globals_.expect)(isolateScope({a:2,b:{a:[1,2]}})).toStrictEqual({a:2,b:{a:[1,2]}});let Scope=function(){this.a=2};Scope.prototype={_a:5,b:2};let scope=new Scope;isolateScope(scope,["_"]);let finalScope={};// eslint-disable-next-line guard-for-in
for(const name in scope)finalScope[name]=scope[name];(0,globals_.expect)(finalScope).toStrictEqual({_a:5,a:2,b:undefined});scope.b=3;isolateScope(scope,["_"]);finalScope={};// eslint-disable-next-line guard-for-in
for(const name in scope)finalScope[name]=scope[name];(0,globals_.expect)(finalScope).toStrictEqual({_a:5,a:2,b:3});(0,globals_.expect)(isolateScope(scope)).toStrictEqual({_a:undefined,a:2,b:3});scope._a=6;(0,globals_.expect)(isolateScope(scope,["_"])).toStrictEqual({_a:6,a:2,b:3});Scope=function(){this.a=2};Scope.prototype={b:3};scope=isolateScope(new Scope,["b"]);finalScope={};// eslint-disable-next-line guard-for-in
for(const name in scope)finalScope[name]=scope[name];(0,globals_.expect)(finalScope).toStrictEqual({a:2,b:3});(0,globals_.expect)(isolateScope(new Scope)).toStrictEqual({a:2,b:undefined})});

/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var _function_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _test_helper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
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
*/(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("addSeparatorToPath",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .addSeparatorToPath */ .p0,["",""],["/","/"],["/a/","/a"],["/a/bb/","/a/bb/"],["/a/bb/","/a/bb"],["/a/bb|","/a/bb","|"],["/a/bb/|","/a/bb/","|"]);//// region url handling
(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("encodeURIComponentExtended",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .encodeURIComponentExtended */ .V5,["",""],["+"," "],["%20"," ",true],["@:$,+","@:$, "],["%2B","+"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getDomainName",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getDomainName */ .Wq,["www.test.de","https://www.test.de/site/subSite?param=value#hash"],["","a",""],["www.test.de","http://www.test.de"],["a.de","http://a.de"],["localhost","http://localhost"],["a","localhost","a"],/*
        NOTE: "globalContext.location?.hostname" does not work since
        experiencing a compiler bug.
    */[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname||"","a",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname],["a","//a"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname||"","a/site/subSite?param=value#hash",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname||"","/a/site/subSite?param=value#hash",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.hostname],["alternate.local","//alternate.local/a/site/subSite?param=value#hash"],["alternate.local","//alternate.local/"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getPortNumber",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getPortNumber */ .VU,[443,"https://www.test.de/site/subSite?param=value#hash"],[80,"http://www.test.de"],[0,"http://www.test.de",0],[0,"www.test.de",0],[0,"a",0],[0,"a",0],[80,"a:80"],[20,"a:20"],[444,"a:444"],[89,"http://localhost:89"],[89,"https://localhost:89"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getProtocolName",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getProtocolName */ .gB,["https","https://www.test.de/site/subSite?param=value#hash"],["http","http://www.test.de"],/*
        NOTE: "globalContext.location?.hostname" does not work since
        experiencing a compiler bug.
    */[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)||"","//www.test.de",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)],["http","http://a.de"],["ftp","ftp://localhost"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)||"","a",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)||"","a/site/subSite?param=value#hash",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)],["a","/a/site/subSite?param=value#hash","a"],["b","alternate.local/a/site/subSite?param=value#hash","b"],["c","alternate.local/","c"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)||"","",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.substring(0,_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol.length-1)]);_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each([[null],[null,true,"&"],[null,false,"&"],[null,false,"#"]])("Array.isArray(getURLParameter(...%p)) === true",(...parameters)=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(Array.isArray((0,_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getURLParameter */ .LK)(...parameters))).toStrictEqual(true)});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getURLParameter",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getURLParameter */ .LK,[null,"notExisting"],[null,"notExisting",true],[null,"notExisting",false,"&"],[null,"notExisting",false,"#"],[null,"notExisting",true,"#"],["2","test",false,"?test=2"],["2","test",false,"test=2"],["2","test",false,"test=2&a=2"],["2","test",false,"b=3&test=2&a=2"],["2","test",false,"?b=3&test=2&a=2"],["2","test",false,"?b=3&test=2&a=2"],[["2"],"test",true,"?b=3&test=2&a=2"],[["1","2"],"test",true,"?test=1&b=3&test=2&a=2"],["2","test",false,"&","$","!","","#$test=2"],["4","test",false,"&","$","!","?test=4","#$test=3"],[null,"a",false,"&","$","!","?test=4","#$test=3"],["3","test",false,"#","$","!","?test=4","#$test=3"],["4","test",false,"#","$","!","","#!test#$test=4"],["4","test",false,"#","$","!","","#!/test/a#$test=4"],["4","test",false,"#","$","!","","#!/test/a/#$test=4"],["4","test",false,"#","$","!","","#!test/a/#$test=4"],["4","test",false,"#","$","!","","#!/#$test=4"],["4","test",false,"#","$","!","","#!test?test=3#$test=4"],["3","test",false,"&","?","!",null,"#!a?test=3"],["4","test",false,"&","$","!",null,"#!test#$test=4"],["4","test",false,"&","$","!",null,"#!test?test=3#$test=4"],[["4"],"test",true,"&","$","!",null,"#!test?test=3#$test=4"],[["2","4"],"test",true,"&","$","!",null,"#!test?test=3#$test=2&test=4"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("hasPathPrefix",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .hasPathPrefix */ .Yn,true,["/admin","/admin"],["test","test"],["",""],["a","a/b"],["a/","a/b"],["/admin","/admin#test","#"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("hasPathPrefix",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .hasPathPrefix */ .Yn,false,["b","a/b"],["b/","a/b"],["/admin/","/admin/test","#"],["/admin","/admin/test","#"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("normalizeURL",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizeURL */ .dc,["http://www.test.com","www.test.com"],["http://test","test"],["http://test","http://test"],["https://test","https://test"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("representURL",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .representURL */ .oz,["www.test.com","http://www.test.com"],["ftp://www.test.com","ftp://www.test.com"],["www.test.com","https://www.test.com"],["",undefined],["",null],["",false],["",true],["",""],[""," "]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("serviceURLEquals",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .serviceURLEquals */ ._4,true,["https://www.test.de/site/subSite?param=value#hash","https://www.test.de/site/subSite?param=value#hash"],["//www.test.de/site/subSite?param=value#hash","//www.test.de/site/subSite?param=value#hash"],/*
        NOTE: "globalContext.location?.hostname" does not work since
        experiencing a compiler bug.
    */[`${_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location?_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location?.protocol:"http:"}//www.test.de/`+"site/subSite?param=value#hash",`${_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location?_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol:"http:"}//www.test.de/`+"site/subSite?param=value#hash"],["https://www.test.de:443/site/subSite?param=value#hash","https://www.test.de/site/subSite?param=value#hash"],["//www.test.de:80/site/subSite?param=value#hash","//www.test.de/site/subSite?param=value#hash"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost"],["1",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost"],["#1",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost"],["/a",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEachAgainstSameExpectation */ .NO)("serviceURLEquals",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .serviceURLEquals */ ._4,false,/*
        NOTE: "globalContext.location?.hostname" does not work since
        experiencing a compiler bug.
    */[`${_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location?_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol:"http:"}//www.test.de/`+"site/subSite?param=value#hash","ftp://www.test.de/site/subSite?param=value#hash"],["https://www.test.de/site/subSite?param=value#hash","http://www.test.de/site/subSite?param=value#hash"],["http://www.test.de/site/subSite?param=value#hash","test.de/site/subSite?param=value#hash"],[`${_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location?_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.protocol:"http:"}//www.test.de:`+String(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.port||8)+"/site/subSite?param=value#hash/site/subSite?param=value#hash",_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.href||"http://localhost:8080"],["http://www.test.de:"+String(_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location&&_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.location.port||80)+"/site/subSite?param=value#hash","https://www.test.de/site/subSite?param=value#hash"]);//// endregion
(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("camelCaseToDelimited",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .camelCaseToDelimited */ .h1,["hans-peter","hansPeter"],["hans|peter","hansPeter","|"],["",""],["h","h"],["hp","hP",""],["hans-peter","hansPeter"],["hans-peter","hans-peter"],["hans_peter","hansPeter","_"],["hans+peter","hansPeter","+"],["hans","Hans"],["hans-api-url","hansAPIURL","-",["api","url"]],["hans-peter","hansPeter","-",[]]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("capitalize",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .capitalize */ .ZH,["HansPeter","hansPeter"],["",""],["A","a"],["A","A"],["AA","AA"],["Aa","Aa"],["Aa","aa"]);_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each([["function","null",{scope:[]}],["function","null",{scope:{}}],["function","5 === 3",{scope:{name:2}}],["function","5 === 3",{scope:["name"]}],["function","",{scope:[]}]])(`'%s' === typeof compile('%s', %p).templateFunction`,(expected,...parameters)=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(typeof (0,_string_js__WEBPACK_IMPORTED_MODULE_3__/* .compile */ .wE)(...parameters).templateFunction).toStrictEqual(expected)});//// region compile / evaluation
///// region compile
/*
test.each([

    ['string', '= null', []],
    ['string', '{', {}],
    ['object', '', {}]
])(
    `'%s' === typeof compile('%s', %p).error`,
    (expected: string, ...parameters: Parameters<typeof compile>) =>
        expect<string>(typeof compile(...parameters).error)
            .toStrictEqual(expected)
)
test.each([
    [
        `
            function anonymous(
            ) {
            return null
            }
        `,
        'null'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \${test} value\`
            }
        `,
        '`test ${test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \${test} value\`
            }
        `,
        '`test ${test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return \`test \\\${test} value\`
            }
        `,
        '`test \\${test} value`'
    ]
])(
    '"%s" === String(compile("%s").templateFunction)',
    (expected: string, expression: FirstParameter<typeof compile>) =>
        expect(
            String(compile(expression, [], false, false)
                .templateFunction)
        ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))
)
test.each([
    [
        `
            function anonymous(
            ) {
            return String(a + b)
            }
        `,
        '`${a + b}`'
    ],
    [
        `
            function anonymous(
            ) {
            return 'test '+(name)+' - '+(other)+' value'
            }
        `,
        '`test ${name} - ${other} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return "test "+(name)+" '-' "+(other)+" value"
            }
        `,
        '`test ${name} \'-\' ${other} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return "test "+(name)+" '-' "+(other)+"                  value"
            }
        `,
        `\`test \${name} '-' \${other}
                  value\``
    ],
    [
        `
            function anonymous(
            ) {
            return String(loading ? 'A' : 'B')
            }
        `,
        `\`\${loading ? 'A' : 'B'}\``
    ],
    [
        `
            function anonymous(
            ) {
            return String(loading ? 'A' : results.join(''))
            }
        `,
        `\`\${loading ? 'A' : results.join('')}\``
    ],
    [
        `
            function anonymous(
            ) {
            return "[: "+(loading ? 'A' : results.join(''))+" :]"
            }
        `,
        `\`[: \${loading ? 'A' : results.join('')} :]\``
    ],
    [
        `
            function anonymous(
            ) {
            return '[: '+(a ? '<div class="idle">loading...</div>' : ` +
                `results.join(''))+' :]'
            }
        `,
        `\`[: \${a ?\n '<div class="idle">loading...</div>' : ` +
        `results.join('')} :]\``
    ],
    [
        `
        function anonymous(
        ) {
        return ' '+(loading ?        ` +
        `    '<div class="idle">loading...</div>' :        ` +
        `    results.map(function(result) {        ` +
        `        return ('<ul>' +        ` +
        `            '<li>' +            ` +
        `            Object.keys(result)            ` +
        `                .filter(function(name) {            ` +
        `                    return ['number', 'string']            ` +
        `                        .includes(typeof result[name])            ` +
        `                })            ` +
        `                .join('') +        ` +
        `            '</li>' +        ` +
        `        '</ul>')        ` +
        `    }).join('')        ` +
        `)+''
        }
        `,
        `\` \${loading ?
            '<div class="idle">loading...</div>' :
            results.map(function(result) {
                return ('<ul>' +
                    '<li>' +
                        Object.keys(result)
                            .filter(function(name) {
                                return ['number', 'string']
                                    .includes(typeof result[name])
                            })
                            .join('') +
                    '</li>' +
                '</ul>')
            }).join('')
        }\``.replace('\n', '')
    ],
    [
        `
            function anonymous(
            ) {
            return 'test {test} value'
            }
        `,
        '`test {test} value`'
    ],
    [
        `
            function anonymous(
            ) {
            return 'test \\\${test} value \\\${test}'
            }
        `,
        '`test \\${test} value \\${test}`'
    ]
])(
    'IE 11: "%s" === String(compile("%s").templateFunction)',
    (expected: string, expression: FirstParameter<typeof compile>) => {
        const backup = POLYFILL_TEMPLATE_STRINGS.value
        POLYFILL_TEMPLATE_STRINGS.value = true

        expect(
            String(compile(expression, [], false, false).templateFunction)
        ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))

        POLYFILL_TEMPLATE_STRINGS.value = backup
    }
)
 *////// endregion
///// region evaluate
const advancedTemplateEvaluationExample=`\`\${loading ?
        '<div class="idle">loading...</div>' :
        results.map(function(result) {
            return ('<ul>' +
                '<li>' +
                    Object.keys(result)
                        .filter(function(name) {
                            return ['number', 'string']
                                .includes(typeof result[name])
                        })
                        .join('') +
                '</li>' +
            '</ul>')
        }).join('')
    }\``.replace("\n","");_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each([["null",{},"result",null],["this",{},"result",new Number(5),5],["this.a",{},"result",5,{a:5}],["globalThis",{},"result",undefined],["null",{},"result",null],["window",{},"result",undefined],["globalThis",{},"result",undefined],["globalThis",{globalThis:5},"result",5],["5",{},"result",5],["a",{a:2},"result",2],["a + b",{a:2,b:3},"result",5],["a + b + this.c",{a:2,b:3},"result",6,{c:1}],["a + b + c",{a:2,b:3},"runtimeError"],["}",{a:2},"compileError"],["}",{},"compileError"],["`test \\${test} value \\${test}`",{},"result","test ${test} value ${test}"],[advancedTemplateEvaluationExample,{loading:false,results:[]},"result",""],[advancedTemplateEvaluationExample,{loading:false,results:[{a:"a"}]},"result","<ul><li>a</li></ul>"],[advancedTemplateEvaluationExample,{loading:true,results:[]},"result","<div class=\"idle\">loading...</div>"]].map(parameters=>parameters.concat(undefined,undefined).slice(0,5)))("evaluate(`%s`, %p...)[%p] === %p",(expression,scope,resultKey,expected,binding)=>{const evaluation=(0,_string_js__WEBPACK_IMPORTED_MODULE_3__/* .evaluate */ ._3)(expression,{scope,async:false,execute:false,removeGlobalScope:true,binding});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation).toHaveProperty(resultKey);if(expected!==undefined)if(resultKey==="result"&&typeof evaluation[resultKey]==="string")(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation[resultKey].trim()).toStrictEqual(expected);else (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation[resultKey]).toStrictEqual(expected)});_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test.each([["`test \\${test} value \\${test}`",{},"result","test ${test} value ${test}"],/*
        Nested quotes in code can work in IE 11 if only one type of quote
        is used according to escaping.
    */[`\`
            <div class="test">
                \\\${Object.keys(item)
                    .filter(function(name) {
                        return true
                    })
                    .join(",")
                }
            </div>
        \``.replace(/(\s\s+)|\n+/g,""),{},"result","<div class=\"test\">"+"${Object.keys(item).filter(function(name) {"+"return true"+"}).join(\",\")}"+"</div>"],[advancedTemplateEvaluationExample,{loading:false,results:[]},"result",""],[advancedTemplateEvaluationExample,{loading:false,results:[{a:"a"}]},"result","<ul><li>a</li></ul>"],[advancedTemplateEvaluationExample,{loading:true,results:[]},"result","<div class=\"idle\">loading...</div>"]].map(parameters=>parameters.concat(undefined,undefined).slice(0,5)))("IE 11: evaluate(`%s`, %p...)[%p] === %p",(expression,scope,resultKey,expected,binding)=>{const backup=_string_js__WEBPACK_IMPORTED_MODULE_3__/* .POLYFILL_TEMPLATE_STRINGS */ .Ud.value;_string_js__WEBPACK_IMPORTED_MODULE_3__/* .POLYFILL_TEMPLATE_STRINGS */ .Ud.value=true;const evaluation=(0,_string_js__WEBPACK_IMPORTED_MODULE_3__/* .evaluate */ ._3)(expression,{scope,execute:false,removeGlobalScope:true,binding});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation).toHaveProperty(resultKey);if(expected!==undefined)if(resultKey==="result"&&typeof evaluation[resultKey]==="string")(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation[resultKey].trim()).toStrictEqual(expected);else (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(evaluation[resultKey]).toStrictEqual(expected);_string_js__WEBPACK_IMPORTED_MODULE_3__/* .POLYFILL_TEMPLATE_STRINGS */ .Ud.value=backup});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("evaluateOrThrowError",()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(()=>{(0,_string_js__WEBPACK_IMPORTED_MODULE_3__/* .evaluateOrThrowError */ .VK)("notExistingVariable")}).toThrow()});(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("compressStyleValue",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .compressStyleValue */ .v0,["",""],["border:1px solid red"," border: 1px  solid red;"],["border:1px solid red","border : 1px solid red "],["border:1px solid red","border : 1px  solid red ;"],["border:1px solid red","border : 1px  solid red   ; "],["height:1px;width:2px","height: 1px ; width:2px ; "],["height:1px;width:2px",";;height: 1px ; width:2px ; ;"],["height:1px;width:2px"," ;;height: 1px ; width:2px ; ;"],["height:1px;width:2px",";height: 1px ; width:2px ; "]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("convertToValidVariableName",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .convertToValidVariableName */ .a$,["",""],["a","a"],["_a","_a"],["_a_a","_a_a"],["_aA","_a-a"],["aA","-a-a"],["aA","-a--a"],["aA","--a--a"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("decodeHTMLEntities",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .decodeHTMLEntities */ .Lt,[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.document?"":null,""],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.document?"<div></div>":null,"<div></div>"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.document?"<div>&</div>":null,"<div>&amp;</div>"],[_context_js__WEBPACK_IMPORTED_MODULE_1__/* .globalContext */ .Lz.document?"<div>&äÄüÜöÖ</div>":null,"<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("delimitedToCamelCase",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .delimitedToCamelCase */ .XD,["hansPeter","hans-peter"],["hansPeter","hans|peter","|"],["",""],["h","h"],["hansPeter","hans-peter"],["hans-Peter","hans--peter"],["HansPeter","Hans-Peter"],["-HansPeter","-Hans-Peter"],["-","-"],["hans-peter","hans-peter","_"],["hansPeter","hans_peter","_"],["hansID","hans_id","_"],["urlHANSId","url_hans_id","_",["hans"]],["urlHans1","url_hans_1","_"],["hansUrl1","hansUrl1","-",["url"],true],["hansURL","hans-url","-",["url"],true],["hansUrl","hans-Url","-",["url"],true],["hansURL","hans-Url","-",["url"],false],["hansUrl","hans-Url","-",[],false],["hansUrl","hans--Url","-",[],false,true]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("EscapeRegularExpressions",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .escapeRegularExpressions */ .jt,["",""],[`that's no regex: \\.\\*\\$`,`that's no regex: .*$`],["\\-\\\\[\\]\\(\\)\\^\\$\\*\\+\\.}\\-","-\\[]()^$*+.}-",["}"]],["\\-\\[]()^$*+.{\\}\\-","-\\[]()^$*+.{}-",["[","]","(",")","^","$","*","+",".","{"]],["\\-","-",["\\"]]);///// endregion
//// endregion
(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("findNormalizedMatchRange",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .findNormalizedMatchRange */ .Tx,[null,"",""],[null,"hans",""],[[1,2],"hans","a"],[[1,3],"hans","an"],[[0,3],"hans","han"],[[0,4],"hans","hans"],[[1,4],"hans","ans"],[[1,4],"hans hans","ans"],[[2,5]," hAns ","ans",value=>value.toLowerCase()],[[2,8],"a straße b","strasse",value=>value.replace(/ß/g,"ss").toLowerCase()],[[2,9],"a strasse b","strasse",value=>value.replace(/ß/g,"ss").toLowerCase()],[[2,9],"a strasse b","straße",value=>value.replace(/ß/g,"ss").toLowerCase()]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("fixKnownEncodingErrors",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .fixKnownEncodingErrors */ .pM,["",""],["a","a"],["-",""],["a-a","aa"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("gormat",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .format */ .GP,["test","{1}","test"],["","","test"],["{1}","{1}"],["1 test 2 - 2","{1} test {2} - {2}",1,2]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("getEditDistance",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .getEditDistance */ .Un,[0,"",""],[0,"h","h"],[0,"hans","hans"],[1,"hans","hansa"],[1,"hansa","hans"],[1,"hans","hbns"],[1,"hbns","hans"],[2,"hbbs","hans"],[4,"beer","hans"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("limit",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .limit */ .AB,["",""],["test","test"],["test ","test "],["12345...","123456789excess",8],["1...","123456789excess",4]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("lowerCase",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .lowerCase */ .gQ,["hansPeter","HansPeter"],["",""],["a","A"],["a","a"],["aa","aa"],["aa","Aa"],["aA","aA"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("mark",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .mark */ .Gy,["",""],["","",new RegExp("")],["t<span class=\"tools-mark\">e</span>st","test","e"],["t<span class=\"tools-mark\">e</span>st","test",new RegExp("e")],["t<span class=\"tools-mark\">es</span>t","test","es"],["t<span class=\"tools-mark\">es</span>t","test",new RegExp("es")],["<span class=\"tools-mark\">test</span>","test","test"],["<span class=\"tools-mark\">test</span>","test",/test/],["h<span class=\"tools-mark\">a</span>ns "+"<span class=\"tools-mark\">a</span>oom","hans aoom","a"],["h<span class=\"tools-mark\">a</span>ns "+"<span class=\"tools-mark\">b</span>oom","hans boom",/a|b/],["test","test",""],["test","test","tests"],["","","test"],["t<a>e</a>st","test","e",{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase()}],["t<a>e</a>st","test",["e"],{marker:"<a>{1}</a>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["t<a>e</a>st","test","E",{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase()}],["t<a>E</a>st","tEst","e",{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase()}],["<a>t</a>es<a>T</a>","tesT","t",{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase()}],["<a>t - t</a>es<a>T - T</a>","tesT","t",{marker:"<a>{1} - {1}</a>",normalizer:value=>String(value).toLowerCase()}],["test","test","E",{marker:"<a>{1}</a>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["<span class=\"tools-mark\">a</span>b<span class=\"tools-mark\">c</span>d","abcd",["a","c"]],["<span class=\"tools-mark\">a</span><span class=\"tools-mark\">a</span>b"+"<span class=\"tools-mark\">c</span>d","aabcd",["a","c"]],["<span class=\"tools-mark\">a</span><span class=\"tools-mark\">c</span>b"+"<span class=\"tools-mark\">c</span><span class=\"tools-mark\">d</span>","acbcd",["a","c","d"]],["a <a>EBikes</a> <a>München</a>","a EBikes München",["ebikes","münchen"],{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase()}],["a <a>E-Bikes</a> <a>München</a>","a E-Bikes München",["ebikes","münchen"],{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase().replace("-","")}],["a <a>str.</a> <a>2</a>","a str. 2",["straße","2"],{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase().replace("str.","strasse").replace("ß","ss")}],["EGO Movement Store <a>E-Bikes</a> <a>München</a>","EGO Movement Store E-Bikes München",["eBikes","München"],{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase().replace(/[-_]+/g,"").replace(/ß/g,"ss").replace(/(^| )str\./g,"$1strasse").replace(/[& ]+/g," ")}],["<a>str.</a>A <a>strasse</a> B <a>straße</a> C <a>str.</a> D","str.A strasse B straße C str. D",["str."],{marker:"<a>{1}</a>",normalizer:value=>String(value).toLowerCase().replace(/[-_]+/g,"").replace(/ß/g,"ss").replace(/(^| )str\./g,"$1strasse").replace(/[& ]+/g," ")}],["<mark>test</mark> <a>link</a>","test <a>link</a>",["test"],{marker:"<mark>{1}</mark>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["test <a><mark>link</mark></a>","test <a>link</a>",["link"],{marker:"<mark>{1}</mark>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["test <a href=\"foo\">link</a>","test <a href=\"foo\">link</a>",["foo"],{marker:"<mark>{1}</mark>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["test <a href=\"foo\">a <mark>foo</mark> link</a>","test <a href=\"foo\">a foo link</a>",["foo"],{marker:"<mark>{1}</mark>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],["test [a href=\"foo\"]a [mark]foo[/mark] link[/a]","test [a href=\"foo\"]a foo link[/a]",["foo"],{marker:"[mark]{1}[/mark]",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_,skipTagDelimitedParts:["[","]"]}],["<mark>foo</mark> <mark>foo</mark> <mark>foo</mark>","foo foo foo",["foo"],{marker:"<mark>{1}</mark>",normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],[["<mark>foo</mark>"," ","<mark>foo</mark>"," ","<mark>foo</mark>"],"foo foo foo",["foo"],{marker:foundWord=>`<mark>${foundWord}</mark>`,normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],[[],"",["foo"],{marker:foundWord=>`<a>${foundWord}</a>`,normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],[["<a>a</a>"],"a",["a"],{marker:foundWord=>`<a>${foundWord}</a>`,normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],[["a",{foundWord:"b"},"a"],"aba",["b"],{marker:foundWord=>({foundWord}),normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}],[["a ",{foundWord:"b"}," a"],"a b a",["b"],{marker:foundWord=>({foundWord}),normalizer:_function_js__WEBPACK_IMPORTED_MODULE_2__/* .identity */ .D_}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("maskForRegularExpression",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .maskForRegularExpression */ .W5,[`that's no regex: \\.\\*\\$`,`that's no regex: .*$`],["",""],["\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\","-[]()^$*+.}-\\"],["\\-","-"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("normalizeDomNodeSelector",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizeDomNodeSelector */ .RS,["body div","div","body"],["body div p","div p","body"],["body div","body div","body"],["body div p","body div p","body"],["body","","body"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("normalizeDomNodeSelector",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizeDomNodeSelector */ .RS,["",""],["div","div"],["div, p","div, p"]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("normalizePhoneNumber",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizePhoneNumber */ .h2,["0","0"],["0"," 0  "],["0",0],["12345",12345],["0049172002123","+49 172 (0) / 0212 - 3"],["","no entry",true],["","no entry",false],["","",false],["0","0",false],["0"," 0  ",false],["0",0,false],["12345",12345,false],["0049-176-1234-56","+49 (0) 176-12 34-56",false],["0049-176-123456","+49(0)176 12-34 56",false],["0049-176-123456","+49 176 12 34 56",false],["0049-176-123456","+49-176-12 34 56",false],["0172-12555433","0172/12555433",false],["0176-123456","0176 12 34 56",false],["01761-23456","01761 234 56",false],["0049-178-123456","+49 (178) 12 34 56",false],["0049-178-123456","+49(178)123456",false],["0049-178-12345-6","+49(178)12345-6",false],["0049-178-12345-6","+49 (178) 123 45-6",false],["06132-77-0","06132-77-0",false],["06132-77-0","06132-77-0 ",false],["06132-770","06132-77-0a",false],["06132-770","06132-77-0a ",false],["06132-770","  06132-77-0a ",false],["06132-770","  061 32-77-0a ",false],["06132-77-0","  061 32-77-0 ",false],["0061-32-77-0","  0061 32-77-0 ",false],["0061-32-77-0","  +61 32-77-0 ",false],["05661-711677","05661-711677",false],["0174-5661677","0174/5661677",false],["0049-123-4567890","+49 (0) 123 / 456 78 90",false],["0049-123-4567890","+49 (123) 456 78 90",false],["0049-123-4567890"," +49 (123) 456 78 90 ",false],["0291-1234","02 91 / 12 34",false],["01234567890","01234567890",false],["01234-5678-90","01234/5678-90 od. 11",false],["01234567890","01234/5678-90 od. 11",true],["0671-12345","0671/12345 o.543210",false],["067112345","0671/12345 o.543210",true]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("normalizeZipCode",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .normalizeZipCode */ .K$,["0","0"],["0"," 0  "],["0",0],["12345",12345],["","abc"],["12345","1B23A45"],["12345"," 1B23A45 "],["D-12345","D-1B23A45 "],["L-12345","L-12345"],["L-12345","xL-1a2b3c4d5e"]);if(true)(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("parseEncodedObject",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .parseEncodedObject */ .jL,[null,""],[null,"null"],[{a:undefined},"{a: undefined}"],[{a:undefined},Buffer.from("{a: undefined}").toString("base64")],[{a:2},"{a: 2}"],[{a:1},Buffer.from("{a: 1}").toString("base64")],[null,"null"],[null,Buffer.from("null").toString("base64")],[{},"{}"],[{},Buffer.from("{}").toString("base64")],[null,"{a: a}"],[null,Buffer.from("{a: a}").toString("base64")],[{a:2},"{a: scope.a}",{a:2}],[{a:2},Buffer.from("{a: scope.a}").toString("base64"),{a:2}]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("representPhoneNumber",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .representPhoneNumber */ .KC,["0","0"],["+49 (0) 172 / 123 21-1","0172-12321-1"],["+49 (0) 172 / 12 32 11","0172-123211"],["+49 (0) 172 / 123 21 11","0172-1232111"],["",undefined],["",null],["",false],["",true],["",""],[""," "]);(0,_test_helper_js__WEBPACK_IMPORTED_MODULE_4__/* .testEach */ .oN)("sliceAllExceptNumberAndLastSeparator",_string_js__WEBPACK_IMPORTED_MODULE_3__/* .sliceAllExceptNumberAndLastSeparator */ .U7,["1234-56","12-34-56"],["123456","12 34 56"],["123456","123456"]);

/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _jest_globals__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 4.0 international license.
    See https://creativecommons.org/licenses/by/4.0/deed.de
    endregion
*/(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("debounce",async()=>{let testValue=false;void (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .debounce */ .sg)(()=>{testValue=true})();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(testValue).toStrictEqual(false);await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(testValue).toStrictEqual(true);const callback=_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.fn();const debouncedCallback=(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .debounce */ .sg)(callback,1000);void debouncedCallback();void debouncedCallback();void debouncedCallback();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(0);await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(1);void debouncedCallback();await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(2);const debouncedAsynchronousCallback=(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .debounce */ .sg)(async()=>{await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)();return true});void (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(debouncedAsynchronousCallback()).resolves.toStrictEqual(true);void (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(debouncedAsynchronousCallback()).resolves.toStrictEqual(true);void (0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(debouncedAsynchronousCallback()).resolves.toStrictEqual(true)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("trailingThrottle",async()=>{let testValue=false;(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .trailingThrottle */ .p0)(()=>{testValue=true})();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(testValue).toStrictEqual(false);await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(testValue).toStrictEqual(true);const callback=_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.fn();const throttledCallback=(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .trailingThrottle */ .p0)(callback,1000);throttledCallback();throttledCallback();throttledCallback();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(0);await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(1);throttledCallback();await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1000);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(2)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("preventDefault",()=>{const mockCallback=_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.fn();const mockEvent={preventDefault:mockCallback};(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .preventDefault */ .wo)(mockEvent);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(mockCallback).toHaveBeenCalledTimes(1)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("stopPropagation",()=>{const mockCallback=_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.fn();const mockEvent={stopPropagation:mockCallback};(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .stopPropagation */ .dG)(mockEvent);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(mockCallback).toHaveBeenCalledTimes(1)});(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.test)("timeout",async()=>{(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)()).toStrictEqual(false);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(0)).toStrictEqual(false);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(1)).toStrictEqual(false);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)()).toBeInstanceOf(Promise);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)((0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)()).toHaveProperty("clear");const callback=_jest_globals__WEBPACK_IMPORTED_MODULE_0__.jest.fn();const result=(0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(10**20,true);result.catch(callback);result.clear();await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)();(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(1);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenLastCalledWith(true);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(await (0,_utility_js__WEBPACK_IMPORTED_MODULE_1__/* .timeout */ .wR)(callback)).toStrictEqual(false);(0,_jest_globals__WEBPACK_IMPORTED_MODULE_0__.expect)(callback).toHaveBeenCalledTimes(2)});

/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module cookie *//* !
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
 * Deletes a cookie value by given name.
 * @param name - Name to identify requested value.
 */const deleteCookie=name=>{if(_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document)_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document.cookie=`${name}=; Max-Age=-99999999;`};/**
 * Gets a cookie value by given name.
 * @param name - Name to identify requested value.
 * @returns Requested value.
 */const getCookie=name=>{if(_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document){const key=`${name}=`;const decodedCookie=decodeURIComponent(_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document.cookie);for(let date of decodedCookie.split(";")){while(date.startsWith(" "))date=date.substring(1);if(date.startsWith(key))return date.substring(key.length,date.length)}return""}return null};/**
 * Sets a cookie key-value-pair.
 * @param name - Name to identify given value.
 * @param value - Value to set.
 * @param givenOptions - Cookie set options.
 * @param givenOptions.domain - Domain to reference with given key-value-pair.
 * @param givenOptions.httpOnly - Indicates if this cookie should be accessible
 * from client or not.
 * @param givenOptions.minimal - Set only minimum number of options.
 * @param givenOptions.numberOfDaysUntilExpiration - Number of days until given
 * key shouldn't be deleted.
 * @param givenOptions.path - Path to reference with given key-value-pair.
 * @param givenOptions.sameSite - Set same site policy to "Lax", "None" or
 * "Strict".
 * @param givenOptions.secure - Indicates if this cookie is only valid for
 * "https" connections.
 * @returns A boolean indicating whether cookie could be set or not.
 */const setCookie=(name,value,givenOptions={})=>{if(_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document){const options={domain:"",httpOnly:false,minimal:false,numberOfDaysUntilExpiration:365,path:"/",sameSite:"Lax",secure:true,...givenOptions};const now=new Date;now.setTime(now.getTime()+options.numberOfDaysUntilExpiration*24*60*60*1000);if(options.domain===""&&_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.location?.hostname)options.domain=_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.location.hostname;_context_js__WEBPACK_IMPORTED_MODULE_0__/* .globalContext */ .Lz.document.cookie=`${name}=${value}`+(options.minimal?"":`;Expires="${now.toUTCString()}`+`;Path=${options.path}`+`;Domain=${options.domain}`+(options.sameSite?`;SameSite=${options.sameSite}`:"")+(options.secure?";Secure":"")+(options.httpOnly?";HttpOnly":""));return true}return false};
/* harmony export */ __webpack_require__.d(__webpack_exports__, [
/* harmony export */   "Ri", 0, /* binding */ getCookie,
/* harmony export */   "TV", 0, /* binding */ setCookie,
/* harmony export */   "Yj", 0, /* binding */ deleteCookie
/* harmony export */ ]);


/***/ })
/******/ ]);
/************************************************************************/
/******/ // The module cache
/******/ const __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	const cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	const module = __webpack_module_cache__[moduleId] = {
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
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	const webpackQueues = Symbol("webpack queues");
/******/ 	const webpackExports = Symbol("webpack exports");
/******/ 	const webpackError = Symbol("webpack error");
/******/ 	
/******/ 	const resolveQueue = (queue) => {
/******/ 		if(queue?.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	const wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 	
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				const queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				const obj = {};
/******/ 	
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		const ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__webpack_require__.a = (module, body, hasAwait) => {
/******/ 		let queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		const depQueues = new Set();
/******/ 		const exports = module.exports;
/******/ 		let currentDeps;
/******/ 		let outerResolve;
/******/ 		let reject;
/******/ 		const promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		const handle = (deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			let fn;
/******/ 			const getResult = () => (currentDeps.map((d) => {
/******/ 	
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			const promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				const fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.forEach((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}
/******/ 		const done = (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue))
/******/ 	
/******/ 		body(handle, done);
/******/ 		queue?.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
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
/******/ })();
/******/ 
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/harmony module decorator */
/******/ (() => {
/******/ 	__webpack_require__.hmd = (module) => {
/******/ 		module = Object.create(module);
/******/ 		if (!module.children) module.children = [];
/******/ 		Object.defineProperty(module, 'exports', {
/******/ 			enumerable: true,
/******/ 			set() {
/******/ 				throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 			}
/******/ 		});
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
/******/ 
/******/ // module cache are used so entry inlining is disabled
/******/ // startup
/******/ // Load entry module and return exports
/******/ let __webpack_exports__ = __webpack_require__(17);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 

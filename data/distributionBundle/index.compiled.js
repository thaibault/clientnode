'use strict';
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory((function webpackLoadOptionalExternalModule() { try { return require('jquery'); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define("clientnode", ['jquery'], factory);
	else if(typeof exports === 'object')
		exports["clientnode"] = factory((function webpackLoadOptionalExternalModule() { try { return require('jquery'); } catch(e) {} }()));
	else
		root['clientnode'] = factory(root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module, global, process) {// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module clientnode *//* !
    region header
    [Project page](http://torben.website/clientnode)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See http://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/// region imports
Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _asyncToGenerator(fn){return function(){var gen=fn.apply(this,arguments);return new Promise(function(resolve,reject){function step(key,arg){try{var info=gen[key](arg);var value=info.value}catch(error){reject(error);return}if(info.done){resolve(value)}else{return Promise.resolve(value).then(function(value){step('next',value)},function(err){step('throw',err)})}}return step('next')})}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var fileSystem={};try{fileSystem=eval('require')('fs')}catch(error){}var path={};try{path=eval('require')('path')}catch(error){}// NOTE: Only needed for debugging this file.
try{module.require('source-map-support/register')}catch(error){}// endregion
// region types
// / region browser
// / endregion
// endregion
// region determine context
var globalContext=exports.globalContext=function(){if(typeof window==='undefined'){if(typeof global==='undefined')return  false?{}:module;if('window'in global)return global.window;return global}return window}();/* eslint-disable no-use-before-define */var $=exports.$=function(){/* eslint-enable no-use-before-define */var _$=void 0;if('$'in globalContext&&globalContext.$!==null)_$=globalContext.$;else{if(!('$'in globalContext)&&'document'in globalContext)try{return __webpack_require__(5)}catch(error){}var _selector='document'in globalContext&&'querySelectorAll'in globalContext.document?globalContext.document.querySelectorAll.bind(globalContext.document):function(){return null};_$=function $(parameter){for(var _len=arguments.length,additionalArguments=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){additionalArguments[_key-1]=arguments[_key]}if(typeof parameter==='string'){var $domNodes=_selector.apply(undefined,[parameter].concat(additionalArguments));if('fn'in _$)for(var _key2 in _$.fn){if(_$.fn.hasOwnProperty(_key2))// IgnoreTypeCheck
$domNodes[_key2]=_$.fn[_key2].bind($domNodes)}return $domNodes}/* eslint-disable no-use-before-define */if(Tools.isFunction(parameter)&&'document'in globalContext)/* eslint-enable no-use-before-define */globalContext.document.addEventListener('DOMContentLoaded',parameter);return parameter};_$.fn={}}return _$}();if(!('global'in $))$.global=globalContext;if(!('context'in $)&&'document'in $.global)$.context=$.global.document;// endregion
// region plugins/classes
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for depending gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse option objects dom trees or handle events is also
 * provided.
 * @property static:abbreviations - Lists all known abbreviation for proper
 * camel case to delimited and back conversion.
 * @property static:animationEndEventNames - Saves a string with all css3
 * browser specific animation end event names.
 * @property static:classToTypeMapping - String representation to object type
 * name mapping.
 * @property static:closeEventNames - Process event names which indicates that
 * a process has finished.
 * @property static:consoleMethodNames - This variable contains a collection of
 * methods usually binded to the console object.
 * @property static:keyCode - Saves a mapping from key codes to their
 * corresponding name.
 * @property static:maximalSupportedInternetExplorerVersion - Saves currently
 * minimal supported internet explorer version. Saves zero if no internet
 * explorer present.
 * @property static:noop - A no-op dummy function.
 * @property static:specialRegexSequences - A list of special regular
 * expression symbols.
 * @property static:transitionEndEventNames - Saves a string with all css3
 * browser specific transition end event names.
 * @property static:_javaScriptDependentContentHandled - Indicates whether
 * javaScript dependent content where hide or shown.
 *
 * @property $domNode - $-extended dom node if one was given to the constructor
 * method.
 * @property locks - Mapping of lock descriptions to there corresponding
 * callbacks.
 *
 * @property _options - Options given to the constructor.
 * @property _defaultOptions - Fallback options if not overwritten by the
 * options given to the constructor method.
 * @property _defaultOptions.logging {boolean} - Indicates whether logging
 * should be active.
 * @property _defaultOptions.domNodeSelectorPrefix {string} - Selector prefix
 * for all needed dom nodes.
 * @property _defaultOptions.domNode {Object.<string, string>} - Mapping of
 * names to needed dom nodes referenced by there selector.
 * @property _defaultOptions.domNode.hideJavaScriptEnabled {string} - Selector
 * to dom nodes which should be hidden if javaScript is available.
 * @property _defaultOptions.domNode.showJavaScriptEnabled {string} - Selector
 * to dom nodes which should be visible if javaScript is available.
 */var Tools=function(){// endregion
// region public methods
// / region special
/**
     * This method should be overwritten normally. It is triggered if current
     * object is created via the "new" keyword. The dom node selector prefix
     * enforces to not globally select any dom nodes which aren't in the
     * expected scope of this plugin. "{1}" will be automatically replaced with
     * this plugin name suffix ("tools"). You don't have to use "{1}" but it
     * can help you to write code which is more reconcilable with the dry
     * concept.
     * @param $domNode - $-extended dom node to use as reference in various
     * methods.
     * @param options - Options to change runtime behavior.
     * @param defaultOptions - Default options to ensure to be present in any
     * options instance.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     * @returns Returns nothing but if invoked with "new" an instance of this
     * class will be given back.
     */// endregion
// region dynamic properties
// region static properties
function Tools(){var $domNode=arguments.length>0&&arguments[0]!==undefined?arguments[0]:null;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var defaultOptions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{domNode:{hideJavaScriptEnabled:'.tools-hidden-on-javascript-enabled',showJavaScriptEnabled:'.tools-visible-on-javascript-enabled'},domNodeSelectorPrefix:'body',logging:false};var locks=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{};_classCallCheck(this,Tools);if($domNode)this.$domNode=$domNode;this._options=options;this._defaultOptions=defaultOptions;this.locks=locks;// Avoid errors in browsers that lack a console.
if(!('console'in $.global))$.global.console={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.constructor.consoleMethodNames[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var methodName=_step.value;if(!(methodName in $.global.console))$.global.console[methodName]=this.constructor.noop}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}if(!this.constructor._javaScriptDependentContentHandled&&'document'in $.global&&'filter'in $&&'hide'in $&&'show'in $){this.constructor._javaScriptDependentContentHandled=true;$(this._defaultOptions.domNodeSelectorPrefix+' '+this._defaultOptions.domNode.hideJavaScriptEnabled).filter(function(){return!$(this).data('javaScriptDependentContentHide')}).data('javaScriptDependentContentHide',true).hide();$(this._defaultOptions.domNodeSelectorPrefix+' '+this._defaultOptions.domNode.showJavaScriptEnabled).filter(function(){return!$(this).data('javaScriptDependentContentShow')}).data('javaScriptDependentContentShow',true).show()}}/**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */_createClass(Tools,[{key:'destructor',value:function destructor(){if('off'in $.fn)this.off('*');return this}/**
     * This method should be overwritten normally. It is triggered if current
     * object was created via the "new" keyword and is called now.
     * @param options - An options object.
     * @returns Returns the current instance.
     */},{key:'initialize',value:function initialize(){var options=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};/*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */this._options=this.constructor.extendObject(true,{},this._defaultOptions,this._options,options);/*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */this._options.domNodeSelectorPrefix=this.constructor.stringFormat(this._options.domNodeSelectorPrefix,this.constructor.stringCamelCaseToDelimited(this.constructor.name));return this}// / endregion
// / region object orientation
/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * Defines a generic controller for dom node aware plugins.
     * @param object - The object or class to control. If "object" is a class
     * an instance will be generated.
     * @param parameter - The initially given arguments object.
     * @param $domNode - Optionally a $-extended dom node to use as reference.
     * @returns Returns whatever the initializer method returns.
     */},{key:'controller',value:function controller(object,parameter){var _object2;var $domNode=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;/* eslint-enable jsdoc/require-description-complete-sentence */if(typeof object==='function'){object=new object($domNode);if(!(object instanceof Tools))object=this.constructor.extendObject(true,new Tools,object)}parameter=this.constructor.arrayMake(parameter);if($domNode&&'data'in $domNode&&!$domNode.data(object.constructor.name))// Attach extended object to the associated dom node.
$domNode.data(object.constructor.name,object);if(parameter[0]in object){var _object;if(Tools.isFunction(object[parameter[0]]))return(_object=object)[parameter[0]].apply(_object,_toConsumableArray(parameter.slice(1)));return object[parameter[0]]}else if(parameter.length===0||_typeof(parameter[0])==='object')/*
                If an options object or no method name is given the initializer
                will be called.
            */return(_object2=object).initialize.apply(_object2,_toConsumableArray(parameter));throw new Error('Method "'+parameter[0]+'" does not exist on $-extended dom node '+('"'+object.constructor.name+'".'))}// / endregion
// / region mutual exclusion
/**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be binded to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callbackFunction - A procedure which should only be executed if
     * the interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns a promise which will be resolved after releasing lock.
     */},{key:'acquireLock',value:function(){var _ref=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee2(description){var _this=this;var callbackFunction=arguments.length>1&&arguments[1]!==undefined?arguments[1]:Tools.noop;var autoRelease=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;return regeneratorRuntime.wrap(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:return _context2.abrupt('return',new Promise(function(resolve){var wrappedCallbackFunction=function(){var _ref2=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee(description){var result,finish;return regeneratorRuntime.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:result=callbackFunction(description);finish=function finish(value){if(autoRelease)_this.releaseLock(description);resolve(value)};if(!(result!==null&&(typeof result==='undefined'?'undefined':_typeof(result))==='object'&&'then'in result)){_context.next=4;break}return _context.abrupt('return',result.then(finish));case 4:finish(description);case 5:case'end':return _context.stop();}}},_callee,_this)}));return function wrappedCallbackFunction(_x10){return _ref2.apply(this,arguments)}}();if(_this.locks.hasOwnProperty(description))_this.locks[description].push(wrappedCallbackFunction);else{_this.locks[description]=[];wrappedCallbackFunction(description)}}));case 1:case'end':return _context2.stop();}}},_callee2,this)}));function acquireLock(_x7){return _ref.apply(this,arguments)}return acquireLock}()/**
     * Calling this method  causes the given critical area to be finished and
     * all functions given to "acquireLock()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquireLock" method.
     */},{key:'releaseLock',value:function(){var _ref3=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee3(description){var result;return regeneratorRuntime.wrap(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:result=void 0;if(!this.locks.hasOwnProperty(description)){_context3.next=9;break}if(!this.locks[description].length){_context3.next=8;break}_context3.next=5;return this.locks[description].shift()(description);case 5:result=_context3.sent;_context3.next=9;break;case 8:delete this.locks[description];case 9:return _context3.abrupt('return',result);case 10:case'end':return _context3.stop();}}},_callee3,this)}));function releaseLock(_x11){return _ref3.apply(this,arguments)}return releaseLock}()/**
     * Generate a semaphore object with given number of resources.
     * @param numberOfResources - Number of allowed concurrent resource uses.
     * @returns The requested semaphore instance.
     */},{key:'log',// / endregion
// / region logging
/**
     * Shows the given object's representation in the browsers console if
     * possible or in a standalone alert-window as fallback.
     * @param object - Any object to print.
     * @param force - If set to "true" given input will be shown independently
     * from current logging configuration or interpreter's console
     * implementation.
     * @param avoidAnnotation - If set to "true" given input has no module or
     * log level specific annotations.
     * @param level - Description of log messages importance.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */value:function log(object){var force=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var avoidAnnotation=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var level=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'info';if(this._options.logging||force||['error','critical'].includes(level)){var message=void 0;if(avoidAnnotation)message=object;else if(typeof object==='string'){var _constructor;for(var _len2=arguments.length,additionalArguments=Array(_len2>4?_len2-4:0),_key3=4;_key3<_len2;_key3++){additionalArguments[_key3-4]=arguments[_key3]}additionalArguments.unshift(object);message=this.constructor.name+' ('+level+'): '+(_constructor=this.constructor).stringFormat.apply(_constructor,additionalArguments)}else if(this.constructor.isNumeric(object)||typeof object==='boolean')message=this.constructor.name+' ('+level+'): '+object.toString();else{this.log(',--------------------------------------------,');this.log(object,force,true);this.log('\'--------------------------------------------\'')}if(message)if(!('console'in $.global&&level in $.global.console)||$.global.console[level]===this.constructor.noop){if('alert'in $.global)$.global.alert(message)}else $.global.console[level](message)}return this}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */},{key:'info',value:function info(object){for(var _len3=arguments.length,additionalArguments=Array(_len3>1?_len3-1:0),_key4=1;_key4<_len3;_key4++){additionalArguments[_key4-1]=arguments[_key4]}return this.log.apply(this,[object,false,false,'info'].concat(additionalArguments))}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */},{key:'debug',value:function debug(object){for(var _len4=arguments.length,additionalArguments=Array(_len4>1?_len4-1:0),_key5=1;_key5<_len4;_key5++){additionalArguments[_key5-1]=arguments[_key5]}return this.log.apply(this,[object,false,false,'debug'].concat(additionalArguments))}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */},{key:'error',value:function error(object){for(var _len5=arguments.length,additionalArguments=Array(_len5>1?_len5-1:0),_key6=1;_key6<_len5;_key6++){additionalArguments[_key6-1]=arguments[_key6]}return this.log.apply(this,[object,true,false,'error'].concat(additionalArguments))}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */},{key:'critical',value:function critical(object){for(var _len6=arguments.length,additionalArguments=Array(_len6>1?_len6-1:0),_key7=1;_key7<_len6;_key7++){additionalArguments[_key7-1]=arguments[_key7]}return this.log.apply(this,[object,true,false,'warn'].concat(additionalArguments))}/**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */},{key:'warn',value:function warn(object){for(var _len7=arguments.length,additionalArguments=Array(_len7>1?_len7-1:0),_key8=1;_key8<_len7;_key8++){additionalArguments[_key8-1]=arguments[_key8]}return this.log.apply(this,[object,false,false,'warn'].concat(additionalArguments))}/**
     * Dumps a given object in a human readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */},{key:'getPositionRelativeToViewport',/**
     * Determines where current dom node is relative to current view port
     * position.
     * @param delta - Allows deltas for "top", "left", "bottom" and "right" for
     * determining positions.
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */value:function getPositionRelativeToViewport(){var delta=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};delta=this.constructor.extendObject({top:0,left:0,bottom:0,right:0},delta);if('window'in $.global&&this.$domNode&&this.$domNode.length&&this.$domNode[0]){var $window=$($.global.window);var rectangle=this.$domNode[0].getBoundingClientRect();if(rectangle.top+delta.top<0)return'above';if(rectangle.left+delta.left<0)return'left';if($window.height()<rectangle.bottom+delta.bottom)return'below';if($window.width()<rectangle.right+delta.right)return'right'}return'in'}/**
     * Generates a directive name corresponding selector string.
     * @param directiveName - The directive name.
     * @returns Returns generated selector.
     */},{key:'removeDirective',/**
     * Removes a directive name corresponding class or attribute.
     * @param directiveName - The directive name.
     * @returns Returns current dom node.
     */value:function removeDirective(directiveName){var delimitedName=this.constructor.stringCamelCaseToDelimited(directiveName);return this.$domNode.removeClass(delimitedName).removeAttr(delimitedName).removeAttr('data-'+delimitedName).removeAttr('x-'+delimitedName).removeAttr(delimitedName.replace('-',':')).removeAttr(delimitedName.replace('-','_'))}/**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding name.
     */},{key:'getDirectiveValue',/**
     * Determines a directive attribute value.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding attribute value or "null" if no
     * attribute value exists.
     */value:function getDirectiveValue(directiveName){var delimitedName=this.constructor.stringCamelCaseToDelimited(directiveName);var _arr=[delimitedName,'data-'+delimitedName,'x-'+delimitedName,delimitedName.replace('-','\\:')];for(var _i=0;_i<_arr.length;_i++){var _attributeName=_arr[_i];var _value=this.$domNode.attr(_attributeName);if(_value!==undefined)return _value}return null}/**
     * Removes a selector prefix from a given selector. This methods searches
     * in the options object for a given "domNodeSelectorPrefix".
     * @param domNodeSelector - The dom node selector to slice.
     * @returns Returns the sliced selector.
     */},{key:'sliceDomNodeSelectorPrefix',value:function sliceDomNodeSelectorPrefix(domNodeSelector){if('domNodeSelectorPrefix'in this._options&&domNodeSelector.startsWith(this._options.domNodeSelectorPrefix))return domNodeSelector.substring(this._options.domNodeSelectorPrefix.length).trim();return domNodeSelector}/**
     * Determines the dom node name of a given dom node string.
     * @param domNodeSelector - A given to dom node selector to determine its
     * name.
     * @returns Returns The dom node name.
     * @example
     * // returns 'div'
     * $.Tools.getDomNodeName('&lt;div&gt;')
     * @example
     * // returns 'div'
     * $.Tools.getDomNodeName('&lt;div&gt;&lt;/div&gt;')
     * @example
     * // returns 'br'
     * $.Tools.getDomNodeName('&lt;br/&gt;')
     */},{key:'grabDomNode',/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * Converts an object of dom selectors to an array of $ wrapped dom nodes.
     * Note if selector description as one of "class" or "id" as suffix element
     * will be ignored.
     * @param domNodeSelectors - An object with dom node selectors.
     * @param wrapperDomNode - A dom node to be the parent or wrapper of all
     * retrieved dom nodes.
     * @returns Returns All $ wrapped dom nodes corresponding to given
     * selectors.
     */value:function grabDomNode(domNodeSelectors,wrapperDomNode){/* eslint-enable jsdoc/require-description-complete-sentence */var domNodes={};if(domNodeSelectors)if(wrapperDomNode){var $wrapperDomNode=$(wrapperDomNode);for(var _name in domNodeSelectors){if(domNodeSelectors.hasOwnProperty(_name))domNodes[_name]=$wrapperDomNode.find(domNodeSelectors[_name])}}else for(var _name2 in domNodeSelectors){if(domNodeSelectors.hasOwnProperty(_name2)){var match=domNodeSelectors[_name2].match(', *');if(match){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=domNodeSelectors[_name2].split(match[0])[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var selectorPart=_step2.value;domNodeSelectors[_name2]+=', '+this.normalizeDomNodeSelector(selectorPart)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}domNodes[_name2]=$(this.normalizeDomNodeSelector(domNodeSelectors[_name2]))}}if(this._options.domNodeSelectorPrefix)domNodes.parent=$(this._options.domNodeSelectorPrefix);if('window'in $.global)domNodes.window=$($.global.window);if('document'in $.global)domNodes.document=$($.global.document);return domNodes}// / endregion
// / region scope
/**
     * Overwrites all inherited variables from parent scope with "undefined".
     * @param scope - A scope where inherited names will be removed.
     * @param prefixesToIgnore - Name prefixes to ignore during deleting names
     * in given scope.
     * @returns The isolated scope.
     */},{key:'fireEvent',/**
     * Searches for internal event handler methods and runs them by default. In
     * addition this method searches for a given event method by the options
     * object. Additional arguments are forwarded to respective event
     * functions.
     * @param eventName - An event name.
     * @param callOnlyOptionsMethod - Prevents from trying to call an internal
     * event handler.
     * @param scope - The scope from where the given event handler should be
     * called.
     * @param additionalArguments - Additional arguments to forward to
     * corresponding event handlers.
     * @returns - Returns "true" if an options event handler was called and
     * "false" otherwise.
     */value:function fireEvent(eventName){var _scope$_options$event;var callOnlyOptionsMethod=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var scope=arguments.length>2&&arguments[2]!==undefined?arguments[2]:this;var eventHandlerName='on'+this.constructor.stringCapitalize(eventName);for(var _len8=arguments.length,additionalArguments=Array(_len8>3?_len8-3:0),_key9=3;_key9<_len8;_key9++){additionalArguments[_key9-3]=arguments[_key9]}if(!callOnlyOptionsMethod)if(eventHandlerName in scope)scope[eventHandlerName].apply(scope,additionalArguments);else if('_'+eventHandlerName in scope)scope['_'+eventHandlerName].apply(scope,additionalArguments);if(scope._options&&eventHandlerName in scope._options&&scope._options[eventHandlerName]!==this.constructor.noop)return(_scope$_options$event=scope._options[eventHandlerName]).call.apply(_scope$_options$event,[this].concat(additionalArguments));return true}/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * A wrapper method for "$.on()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.on()".
     * @param parameter - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */},{key:'on',value:function on(){for(var _len9=arguments.length,parameter=Array(_len9),_key10=0;_key10<_len9;_key10++){parameter[_key10]=arguments[_key10]}/* eslint-enable jsdoc/require-description-complete-sentence */return this._bindEventHelper(parameter,false)}/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @param parameter - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */},{key:'off',value:function off(){for(var _len10=arguments.length,parameter=Array(_len10),_key11=0;_key11<_len10;_key11++){parameter[_key11]=arguments[_key11]}/* eslint-enable jsdoc/require-description-complete-sentence */return this._bindEventHelper(parameter,true,'off')}// / endregion
// / region object
/**
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
     */},{key:'normalizeDomNodeSelector',/**
     * Converts a dom selector to a prefixed dom selector string.
     * @param selector - A dom node selector.
     * @returns Returns given selector prefixed.
     */value:function normalizeDomNodeSelector(selector){var domNodeSelectorPrefix='';if(this._options.domNodeSelectorPrefix)domNodeSelectorPrefix=this._options.domNodeSelectorPrefix+' ';if(!(selector.startsWith(domNodeSelectorPrefix)||selector.trim().startsWith('<')))selector=domNodeSelectorPrefix+selector;return selector.trim()}// / endregion
// / region number
/**
     * Determines corresponding utc timestamp for given date object.
     * @param value - Date to convert.
     * @param inMilliseconds - Indicates whether given number should be in
     * seconds (default) or milliseconds.
     * @returns Determined numerous value.
     */},{key:'sendToExternalURL',/**
     * Send given data to a temporary created iframe.
     * @param url - URL to send to data to.
     * @param data - Data holding object to send data to.
     * @param requestType - The forms action attribute value. If nothing is
     * provided "post" will be used as default.
     * @param removeAfterLoad - Indicates if created iframe should be removed
     * right after load event.
     * @returns Returns the dynamically created iframe.
     */value:function sendToExternalURL(url,data){var requestType=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'post';var removeAfterLoad=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var $iFrameDomNode=$('<iframe>').attr('name',this.constructor.name.charAt(0).toLowerCase()+this.constructor.name.substring(1)+new Date().getTime()).hide();this.$domNode.append($iFrameDomNode);this.constructor.sendToIFrame($iFrameDomNode,url,data,requestType,removeAfterLoad);return $iFrameDomNode}// / endregion
// / region file
/**
     * Copies given source directory via path to given target directory
     * location with same target name as source file has or copy to given
     * complete target directory path.
     * @param sourcePath - Path to directory to copy.
     * @param targetPath - Target directory or complete directory location to
     * copy in.
     * @param callback - Function to invoke for each traversed file.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Promise holding the determined target directory path.
     */},{key:'_bindEventHelper',// / endregion
// endregion
// region protected methods
/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * Helper method for attach event handler methods and their event handler
     * remove pendants.
     * @param parameter - Arguments object given to methods like "bind()" or
     * "unbind()".
     * @param removeEvent - Indicates if "unbind()" or "bind()" was given.
     * @param eventFunctionName - Name of function to wrap.
     * @returns Returns $'s wrapped dom node.
     */value:function _bindEventHelper(parameter){var removeEvent=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var eventFunctionName=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'on';/* eslint-enable jsdoc/require-description-complete-sentence */var $domNode=$(parameter[0]);if(this.constructor.determineType(parameter[1])==='object'&&!removeEvent){for(var eventType in parameter[1]){if(parameter[1].hasOwnProperty(eventType))// IgnoreTypeCheck
this[eventFunctionName]($domNode,eventType,parameter[1][eventType])}return $domNode}parameter=this.constructor.arrayMake(parameter).slice(1);if(parameter.length===0)parameter.push('');if(!parameter[0].includes('.'))parameter[0]+='.'+this.constructor.name;if(removeEvent)return $domNode[eventFunctionName].apply($domNode,_toConsumableArray(parameter));return $domNode[eventFunctionName].apply($domNode,_toConsumableArray(parameter))}// endregion
},{key:'normalizedClassNames',// / endregion
// / region dom node
/**
     * Normalizes class name order of current dom node.
     * @returns Current instance.
     */get:function get(){// IgnoreTypeCheck
this.$domNode.find('*').addBack().each(function(){var $thisDomNode=$(this);if($thisDomNode.attr('class')){var sortedClassNames=$thisDomNode.attr('class').split(' ').sort()||[];$thisDomNode.attr('class','');var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=sortedClassNames[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var _className=_step3.value;$thisDomNode.addClass(_className)}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}else if($thisDomNode.is('[class]'))$thisDomNode.removeAttr('class')});return this}/**
     * Normalizes style attributes order of current dom node.
     * @returns Returns current instance.
     */},{key:'normalizedStyles',get:function get(){var self=this;// IgnoreTypeCheck
this.$domNode.find('*').addBack().each(function(){var $thisDomNode=$(this);var serializedStyles=$thisDomNode.attr('style');if(serializedStyles){var sortedStyles=self.constructor.stringCompressStyleValue(serializedStyles).split(';').sort()||[];$thisDomNode.attr('style','');var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=sortedStyles[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var style=_step4.value;$thisDomNode.css.apply($thisDomNode,_toConsumableArray(style.trim().split(':')))}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}$thisDomNode.attr('style',self.constructor.stringCompressStyleValue($thisDomNode.attr('style')))}else if($thisDomNode.is('[style]'))$thisDomNode.removeAttr('style')});return this}/**
     * Retrieves a mapping of computed style attributes to their corresponding
     * values.
     * @returns The computed style mapping.
     */},{key:'style',get:function get(){var result={};if('window'in $.global&&$.global.window.getComputedStyle){var _styleProperties=$.global.window.getComputedStyle(this.$domNode[0],null);if(_styleProperties){if('length'in _styleProperties)for(var index=0;index<_styleProperties.length;index+=1){result[this.constructor.stringDelimitedToCamelCase(_styleProperties[index])]=_styleProperties.getPropertyValue(_styleProperties[index])}else for(var propertyName in _styleProperties){if(_styleProperties.hasOwnProperty(propertyName))result[this.constructor.stringDelimitedToCamelCase(propertyName)]=propertyName in _styleProperties&&_styleProperties[propertyName]||_styleProperties.getPropertyValue(propertyName)}return result}}var styleProperties=this.$domNode[0].currentStyle;if(styleProperties){for(var _propertyName in styleProperties){if(styleProperties.hasOwnProperty(_propertyName))result[_propertyName]=styleProperties[_propertyName]}return result}styleProperties=this.$domNode[0].style;if(styleProperties)for(var _propertyName2 in styleProperties){if(typeof styleProperties[_propertyName2]!=='function')result[_propertyName2]=styleProperties[_propertyName2]}return result}/**
     * Get text content of current element without it children's text contents.
     * @returns The text string.
     */},{key:'text',get:function get(){return this.$domNode.clone().children().remove().end().text()}/**
     * Checks whether given html or text strings are equal.
     * @param first - First html, selector to dom node or text to compare.
     * @param second - Second html, selector to dom node  or text to compare.
     * @param forceHTMLString - Indicates whether given contents are
     * interpreted as html string (otherwise an automatic detection will be
     * triggered).
     * @returns Returns true if both dom representations are equivalent.
     */}],[{key:'getSemaphore',value:function getSemaphore(){var numberOfResources=arguments.length>0&&arguments[0]!==undefined?arguments[0]:2;/**
         * Represents the semaphore state.
         * @property queue - List of waiting resource requests.
         * @property numberOfFreeResources - Number free allowed concurrent
         * resource uses.
         * @property numberOfResources - Number of allowed concurrent resource
         * uses.
         */return new(function(){function _class2(){_classCallCheck(this,_class2);this.queue=[];this.numberOfResources=numberOfResources;this.numberOfFreeResources=numberOfResources}_createClass(_class2,[{key:'acquire',/**
             * Acquires a new resource and runs given callback if available.
             * @returns A promise which will be resolved if requested a
             * resource is available.
             */value:function acquire(){var _this2=this;return new Promise(function(resolve){if(_this2.numberOfFreeResources<=0)_this2.queue.push(resolve);else{_this2.numberOfFreeResources-=1;resolve(_this2.numberOfFreeResources)}})}/**
             * Releases a resource and runs a waiting resolver if there exists
             * some.
             * @returns Nothing.
             */},{key:'release',value:function release(){if(this.queue.length===0)this.numberOfFreeResources+=1;else this.queue.pop()(this.numberOfFreeResources)}}]);return _class2}())}// / endregion
// / region boolean
/**
     * Determines whether its argument represents a JavaScript number.
     * @param object - Object to analyze.
     * @returns A boolean value indicating whether given object is numeric
     * like.
     */},{key:'isNumeric',value:function isNumeric(object){var type=Tools.determineType(object);/*
            NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
            misinterprets leading-number strings, particularly hex literals
            ("0x...") subtraction forces infinities to NaN.
        */return['number','string'].includes(type)&&!isNaN(object-parseFloat(object))}/**
     * Determine whether the argument is a window.
     * @param object - Object to check for.
     * @returns Boolean value indicating the result.
     */},{key:'isWindow',value:function isWindow(object){return![undefined,null].includes(object)&&(typeof object==='undefined'?'undefined':_typeof(object))==='object'&&'window'in object&&object===object.window}/**
     * Checks if given object is similar to an array and can be handled like an
     * array.
     * @param object - Object to check behavior for.
     * @returns A boolean value indicating whether given object is array like.
     */},{key:'isArrayLike',value:function isArrayLike(object){var length=void 0;try{length=Boolean(object)&&'length'in object&&object.length}catch(error){return false}var type=Tools.determineType(object);if(type==='function'||Tools.isWindow(object))return false;if(type==='array'||length===0)return true;if(typeof length==='number'&&length>0)try{/* eslint-disable no-unused-expressions */object[length-1];/* eslint-enable no-unused-expressions */return true}catch(error){}return false}/**
     * Checks whether one of the given pattern matches given string.
     * @param target - Target to check in pattern for.
     * @param pattern - List of pattern to check for.
     * @returns Value "true" if given object is matches by at leas one of the
     * given pattern and "false" otherwise.
     */},{key:'isAnyMatching',value:function isAnyMatching(target,pattern){var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=pattern[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var currentPattern=_step5.value;if(typeof currentPattern==='string'){if(currentPattern===target)return true}else if(currentPattern.test(target))return true}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}return false}/**
     * Checks whether given object is a plain native object.
     * @param object - Object to check.
     * @returns Value "true" if given object is a plain javaScript object and
     * "false" otherwise.
     */},{key:'isPlainObject',value:function isPlainObject(object){return(typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null&&Tools.plainObjectPrototypes.includes(Object.getPrototypeOf(object))}/**
     * Checks whether given object is a function.
     * @param object - Object to check.
     * @returns Value "true" if given object is a function and "false"
     * otherwise.
     */},{key:'isFunction',value:function isFunction(object){return Boolean(object)&&{}.toString.call(object)==='[object Function]'}// / endregion
// / region language fixes
/**
     * This method fixes an ugly javaScript bug. If you add a mouseout event
     * listener to a dom node the given handler will be called each time any
     * dom node inside the observed dom node triggers a mouseout event. This
     * methods guarantees that the given event handler is only called if the
     * observed dom node was leaved.
     * @param eventHandler - The mouse out event handler.
     * @returns Returns the given function wrapped by the workaround logic.
     */},{key:'mouseOutEventHandlerFix',value:function mouseOutEventHandlerFix(eventHandler){var _this3=this;return function(event){for(var _len11=arguments.length,additionalParameter=Array(_len11>1?_len11-1:0),_key12=1;_key12<_len11;_key12++){additionalParameter[_key12-1]=arguments[_key12]}var relatedTarget=event.toElement;if('relatedTarget'in event)relatedTarget=event.relatedTarget;while(relatedTarget&&relatedTarget.tagName!=='BODY'){if(relatedTarget===_this3)return;relatedTarget=relatedTarget.parentNode}return eventHandler.call.apply(eventHandler,[_this3].concat(additionalParameter))}}},{key:'show',value:function show(object){var level=arguments.length>1&&arguments[1]!==undefined?arguments[1]:3;var currentLevel=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var output='';if(Tools.determineType(object)==='object'){for(var _key13 in object){if(object.hasOwnProperty(_key13)){output+=_key13.toString()+': ';if(currentLevel<=level)output+=Tools.show(object[_key13],level,currentLevel+1);else output+=''+object[_key13];output+='\n'}}return output.trim()}output=(''+object).trim();return output+' (Type: "'+Tools.determineType(object)+'")'}},{key:'isEquivalentDOM',value:function isEquivalentDOM(first,second){var forceHTMLString=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(first===second)return true;if(first&&second){var detemermineHTMLPattern=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;var inputs={first:first,second:second};var $domNodes={first:$('<dummy>'),second:$('<dummy>')/*
                NOTE: Assume that strings that start "<" and end with ">" are
                markup and skip the more expensive regular expression check.
            */};var _arr2=['first','second'];for(var _i2=0;_i2<_arr2.length;_i2++){var _type=_arr2[_i2];if(typeof inputs[_type]==='string'&&(forceHTMLString||inputs[_type].startsWith('<')&&inputs[_type].endsWith('>')&&inputs[_type].length>=3||detemermineHTMLPattern.test(inputs[_type])))$domNodes[_type]=$('<div>'+inputs[_type]+'</div>');else try{var $selectedDomNode=$(inputs[_type]);if($selectedDomNode.length)$domNodes[_type]=$('<div>').append($selectedDomNode.clone());else return false}catch(error){return false}}if($domNodes.first.length&&$domNodes.first.length===$domNodes.second.length){$domNodes.first=$domNodes.first.Tools('normalizedClassNames').$domNode.Tools('normalizedStyles').$domNode;$domNodes.second=$domNodes.second.Tools('normalizedClassNames').$domNode.Tools('normalizedStyles').$domNode;var index=0;var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=$domNodes.first[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _domNode=_step6.value;if(!_domNode.isEqualNode($domNodes.second[index]))return false}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return true}}return false}},{key:'generateDirectiveSelector',value:function generateDirectiveSelector(directiveName){var delimitedName=Tools.stringCamelCaseToDelimited(directiveName);return delimitedName+', .'+delimitedName+', ['+delimitedName+'], '+('[data-'+delimitedName+'], [x-'+delimitedName+']')+(delimitedName.includes('-')?', ['+delimitedName.replace(/-/g,'\\:')+'], '+('['+delimitedName.replace(/-/g,'_')+']'):'')}},{key:'getNormalizedDirectiveName',value:function getNormalizedDirectiveName(directiveName){var _arr3=['-',':','_'];for(var _i3=0;_i3<_arr3.length;_i3++){var delimiter=_arr3[_i3];var prefixFound=false;var _arr5=['data'+delimiter,'x'+delimiter];for(var _i5=0;_i5<_arr5.length;_i5++){var prefix=_arr5[_i5];if(directiveName.startsWith(prefix)){directiveName=directiveName.substring(prefix.length);prefixFound=true;break}}if(prefixFound)break}var _arr4=['-',':','_'];for(var _i4=0;_i4<_arr4.length;_i4++){var _delimiter=_arr4[_i4];directiveName=Tools.stringDelimitedToCamelCase(directiveName,_delimiter)}return directiveName}},{key:'getDomNodeName',value:function getDomNodeName(domNodeSelector){var match=domNodeSelector.match(new RegExp('^<?([a-zA-Z]+).*>?.*'));if(match)return match[1];return null}},{key:'isolateScope',value:function isolateScope(scope){var prefixesToIgnore=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];for(var _name3 in scope){if(!(prefixesToIgnore.includes(_name3.charAt(0))||['this','constructor'].includes(_name3)||scope.hasOwnProperty(_name3)))/*
                    NOTE: Delete ("delete $scope[name]") doesn't destroy the
                    automatic lookup to parent scope.
                */scope[_name3]=undefined}return scope}/**
     * Generates a unique name in given scope (useful for jsonp requests).
     * @param prefix - A prefix which will be prepended to unique name.
     * @param suffix - A suffix which will be prepended to unique name.
     * @param scope - A scope where the name should be unique.
     * @param initialUniqueName - An initial scope name to use if not exists.
     * @returns The function name.
     */},{key:'determineUniqueScopeName',value:function determineUniqueScopeName(){var prefix=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'callback';var suffix=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'';var scope=arguments.length>2&&arguments[2]!==undefined?arguments[2]:$.global;var initialUniqueName=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'';if(initialUniqueName.length&&!(initialUniqueName in scope))return initialUniqueName;var uniqueName=prefix+suffix;while(true){uniqueName=prefix+parseInt(Math.random()*Math.pow(10,10),10)+suffix;if(!(uniqueName in scope))break}return uniqueName}// / endregion
// / region function
/**
     * Determines all parameter names from given callable (function or class,
     * ...).
     * @param callable - Function or function code to inspect.
     * @returns List of parameter names.
     */},{key:'getParameterNames',value:function getParameterNames(callable){var functionCode=(typeof callable==='string'?callable:callable.toString()).replace(// Strip comments.
/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,'');if(functionCode.startsWith('class'))return Tools.getParameterNames('function '+functionCode.replace(/.*(constructor\([^)]+\))/m,'$1'));// Try classic function declaration.
var parameter=functionCode.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);if(parameter===null)// Try arrow function declaration.
parameter=functionCode.match(/^[^\(]*\(\s*([^\)]*)\) *=>.*/m);if(parameter===null)// Try one argument and without brackets arrow function declaration.
parameter=functionCode.match(/([^= ]+) *=>.*/m);var names=[];if(parameter&&parameter.length>1&&parameter[1].trim().length){var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=parameter[1].split(',')[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var _name4=_step7.value;// Remove default parameter values.
names.push(_name4.replace(/=.+$/g,'').trim())}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}return names}return names}/**
     * Implements the identity function.
     * @param value - A value to return.
     * @returns Returns the given value.
     */},{key:'identity',value:function identity(value){return value}/**
     * Inverted filter helper to inverse each given filter.
     * @param filter - A function that filters an array.
     * @returns The inverted filter.
     */},{key:'invertArrayFilter',value:function invertArrayFilter(filter){return function(data){if(data){for(var _len12=arguments.length,additionalParameter=Array(_len12>1?_len12-1:0),_key14=1;_key14<_len12;_key14++){additionalParameter[_key14-1]=arguments[_key14]}var filteredData=filter.call.apply(filter,[this,data].concat(additionalParameter));var result=[];/* eslint-disable curly */if(filteredData.length){var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=data[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var date=_step8.value;if(!filteredData.includes(date))result.push(date)}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}}else/* eslint-enable curly */result=data;return result}return data}}/**
     * Triggers given callback after given duration. Supports unlimited
     * duration length and returns a promise which will be resolved after given
     * duration has been passed.
     * @param parameter - Observes the first three existing parameter. If one
     * is a number it will be interpret as delay in milliseconds until given
     * callback will be triggered. If one is of type function it will be used
     * as callback and if one is of type boolean it will indicate if returning
     * promise should be rejected or resolved if given internally created
     * timeout should be canceled. Additional parameter will be forwarded to
     * given callback.
     * @returns A promise resolving after given delay or being rejected if
     * value "true" is within one of the first three parameter. The promise
     * holds a boolean indicating whether timeout has been canceled or
     * resolved.
     */},{key:'timeout',value:function timeout(){for(var _len13=arguments.length,parameter=Array(_len13),_key15=0;_key15<_len13;_key15++){parameter[_key15]=arguments[_key15]}var callback=Tools.noop;var delayInMilliseconds=0;var throwOnTimeoutClear=false;var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=parameter[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _value2=_step9.value;if(typeof _value2==='number'&&!Number.isNaN(_value2))delayInMilliseconds=_value2;else if(typeof _value2==='boolean')throwOnTimeoutClear=_value2;else if(Tools.isFunction(_value2))callback=_value2}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}var rejectCallback=void 0;var resolveCallback=void 0;var result=new Promise(function(resolve,reject){rejectCallback=reject;resolveCallback=resolve});var wrappedCallback=function wrappedCallback(){var _callback;(_callback=callback).call.apply(_callback,[result].concat(parameter));resolveCallback(false)};var maximumTimeoutDelayInMilliseconds=2147483647;if(delayInMilliseconds<=maximumTimeoutDelayInMilliseconds)// IgnoreTypeCheck
result.timeoutID=setTimeout(wrappedCallback,delayInMilliseconds);else{/*
                Determine the number of times we need to delay by maximum
                possible timeout duration.
            */var numberOfRemainingTimeouts=Math.floor(delayInMilliseconds/maximumTimeoutDelayInMilliseconds);var finalTimeoutDuration=delayInMilliseconds%maximumTimeoutDelayInMilliseconds;var delay=function delay(){if(numberOfRemainingTimeouts>0){numberOfRemainingTimeouts-=1;// IgnoreTypeCheck
result.timeoutID=setTimeout(delay,maximumTimeoutDelayInMilliseconds)}else// IgnoreTypeCheck
result.timeoutID=setTimeout(wrappedCallback,finalTimeoutDuration)};delay()}// IgnoreTypeCheck
result.clear=function(){if(result.timeoutID){clearTimeout(result.timeoutID);(throwOnTimeoutClear?rejectCallback:resolveCallback)(true)}};return result}// / endregion
// / region event
/**
     * Prevents event functions from triggering to often by defining a minimal
     * span between each function call. Additional arguments given to this
     * function will be forwarded to given event function call. The function
     * wrapper returns null if current function will be omitted due to
     * debounceing.
     * @param eventFunction - The function to call debounced.
     * @param thresholdInMilliseconds - The minimum time span between each
     * function call.
     * @param additionalArguments - Additional arguments to forward to given
     * function.
     * @returns Returns the wrapped method.
     */},{key:'debounce',value:function debounce(eventFunction){for(var _len14=arguments.length,additionalArguments=Array(_len14>2?_len14-2:0),_key16=2;_key16<_len14;_key16++){additionalArguments[_key16-2]=arguments[_key16]}var thresholdInMilliseconds=arguments.length>1&&arguments[1]!==undefined?arguments[1]:600;var lock=false;var waitingCallArguments=null;var timer=null;return function(){for(var _len15=arguments.length,parameter=Array(_len15),_key17=0;_key17<_len15;_key17++){parameter[_key17]=arguments[_key17]}parameter=parameter.concat(additionalArguments||[]);if(lock)waitingCallArguments=parameter;else{lock=true;eventFunction.apply(undefined,_toConsumableArray(parameter));timer=Tools.timeout(thresholdInMilliseconds,function(){lock=false;if(waitingCallArguments){eventFunction.apply(undefined,_toConsumableArray(waitingCallArguments));waitingCallArguments=null}})}return timer}}},{key:'addDynamicGetterAndSetter',value:function addDynamicGetterAndSetter(object){var getterWrapper=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var setterWrapper=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var methodNames=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{};var deep=arguments.length>4&&arguments[4]!==undefined?arguments[4]:true;var typesToExtend=arguments.length>5&&arguments[5]!==undefined?arguments[5]:[Object];if(deep&&(typeof object==='undefined'?'undefined':_typeof(object))==='object')if(Array.isArray(object)){var index=0;var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=object[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var _value3=_step10.value;object[index]=Tools.addDynamicGetterAndSetter(_value3,getterWrapper,setterWrapper,methodNames,deep);index+=1}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return()}}finally{if(_didIteratorError10){throw _iteratorError10}}}}else if(Tools.determineType(object)==='map'){var _iteratorNormalCompletion11=true;var _didIteratorError11=false;var _iteratorError11=undefined;try{for(var _iterator11=object[Symbol.iterator](),_step11;!(_iteratorNormalCompletion11=(_step11=_iterator11.next()).done);_iteratorNormalCompletion11=true){var _ref4=_step11.value;var _ref5=_slicedToArray(_ref4,2);var _key18=_ref5[0];var _value4=_ref5[1];object.set(_key18,Tools.addDynamicGetterAndSetter(_value4,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_didIteratorError11=true;_iteratorError11=err}finally{try{if(!_iteratorNormalCompletion11&&_iterator11.return){_iterator11.return()}}finally{if(_didIteratorError11){throw _iteratorError11}}}}else if(Tools.determineType(object)==='set'){var cache=[];var _iteratorNormalCompletion12=true;var _didIteratorError12=false;var _iteratorError12=undefined;try{for(var _iterator12=object[Symbol.iterator](),_step12;!(_iteratorNormalCompletion12=(_step12=_iterator12.next()).done);_iteratorNormalCompletion12=true){var _value5=_step12.value;object.delete(_value5);cache.push(Tools.addDynamicGetterAndSetter(_value5,getterWrapper,setterWrapper,methodNames,deep))}}catch(err){_didIteratorError12=true;_iteratorError12=err}finally{try{if(!_iteratorNormalCompletion12&&_iterator12.return){_iterator12.return()}}finally{if(_didIteratorError12){throw _iteratorError12}}}var _iteratorNormalCompletion13=true;var _didIteratorError13=false;var _iteratorError13=undefined;try{for(var _iterator13=cache[Symbol.iterator](),_step13;!(_iteratorNormalCompletion13=(_step13=_iterator13.next()).done);_iteratorNormalCompletion13=true){var _value6=_step13.value;object.add(_value6)}}catch(err){_didIteratorError13=true;_iteratorError13=err}finally{try{if(!_iteratorNormalCompletion13&&_iterator13.return){_iterator13.return()}}finally{if(_didIteratorError13){throw _iteratorError13}}}}else if(object!==null){for(var _key19 in object){if(object.hasOwnProperty(_key19))object[_key19]=Tools.addDynamicGetterAndSetter(object[_key19],getterWrapper,setterWrapper,methodNames,deep)}}if(getterWrapper||setterWrapper){var _iteratorNormalCompletion14=true;var _didIteratorError14=false;var _iteratorError14=undefined;try{for(var _iterator14=typesToExtend[Symbol.iterator](),_step14;!(_iteratorNormalCompletion14=(_step14=_iterator14.next()).done);_iteratorNormalCompletion14=true){var _type2=_step14.value;if((typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object instanceof _type2&&object!==null){var _ret=function(){var defaultHandler=Tools.getProxyHandler(object,methodNames);var handler=Tools.getProxyHandler(object,methodNames);if(getterWrapper)handler.get=function(proxy,name){if(name==='__target__')return object;if(name==='__revoke__')return function(){revoke();return object};if(typeof object[name]==='function')return object[name];// IgnoreTypeCheck
return getterWrapper(defaultHandler.get(proxy,name),name,object)};if(setterWrapper)handler.set=function(proxy,name,value){return defaultHandler.set(proxy,name,setterWrapper(name,value,object))};var _Proxy$revocable=Proxy.revocable({},handler),proxy=_Proxy$revocable.proxy,revoke=_Proxy$revocable.revoke;return{v:proxy}}();if((typeof _ret==='undefined'?'undefined':_typeof(_ret))==='object')return _ret.v}}}catch(err){_didIteratorError14=true;_iteratorError14=err}finally{try{if(!_iteratorNormalCompletion14&&_iterator14.return){_iterator14.return()}}finally{if(_didIteratorError14){throw _iteratorError14}}}}return object}/**
     * Converts given object into its serialized json representation by
     * replacing circular references with a given provided value.
     * @param object - Object to serialize.
     * @param determineCicularReferenceValue - Callback to create a fallback
     * value depending on given redundant value.
     * @param numberOfSpaces - Number of spaces to use for string formatting.
     * @returns The formatted json string.
     */},{key:'convertCircularObjectToJSON',value:function convertCircularObjectToJSON(object){var determineCicularReferenceValue=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){return'__circularReference__'};var numberOfSpaces=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var seenObjects=[];return JSON.stringify(object,function(key,value){if((typeof value==='undefined'?'undefined':_typeof(value))==='object'&&value!==null){if(seenObjects.includes(value))return determineCicularReferenceValue(key,value,seenObjects);seenObjects.push(value);return value}return value},numberOfSpaces)}/**
     * Converts given map and all nested found maps objects to corresponding
     * object.
     * @param object - Map to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given map as object.
     */},{key:'convertMapToPlainObject',value:function convertMapToPlainObject(object){var deep=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;if((typeof object==='undefined'?'undefined':_typeof(object))==='object'){if(Tools.determineType(object)==='map'){var newObject={};var _iteratorNormalCompletion15=true;var _didIteratorError15=false;var _iteratorError15=undefined;try{for(var _iterator15=object[Symbol.iterator](),_step15;!(_iteratorNormalCompletion15=(_step15=_iterator15.next()).done);_iteratorNormalCompletion15=true){var _ref6=_step15.value;var _ref7=_slicedToArray(_ref6,2);var _key20=_ref7[0];var _value7=_ref7[1];if(deep)_value7=Tools.convertMapToPlainObject(_value7,deep);newObject[''+_key20]=_value7}}catch(err){_didIteratorError15=true;_iteratorError15=err}finally{try{if(!_iteratorNormalCompletion15&&_iterator15.return){_iterator15.return()}}finally{if(_didIteratorError15){throw _iteratorError15}}}return newObject}if(deep)if(Tools.isPlainObject(object)){for(var _key21 in object){if(object.hasOwnProperty(_key21))object[_key21]=Tools.convertMapToPlainObject(object[_key21],deep)}}else if(Array.isArray(object)){var index=0;var _iteratorNormalCompletion16=true;var _didIteratorError16=false;var _iteratorError16=undefined;try{for(var _iterator16=object[Symbol.iterator](),_step16;!(_iteratorNormalCompletion16=(_step16=_iterator16.next()).done);_iteratorNormalCompletion16=true){var _value8=_step16.value;object[index]=Tools.convertMapToPlainObject(_value8,deep);index+=1}}catch(err){_didIteratorError16=true;_iteratorError16=err}finally{try{if(!_iteratorNormalCompletion16&&_iterator16.return){_iterator16.return()}}finally{if(_didIteratorError16){throw _iteratorError16}}}}else if(Tools.determineType(object)==='set'){var cache=[];var _iteratorNormalCompletion17=true;var _didIteratorError17=false;var _iteratorError17=undefined;try{for(var _iterator17=object[Symbol.iterator](),_step17;!(_iteratorNormalCompletion17=(_step17=_iterator17.next()).done);_iteratorNormalCompletion17=true){var _value9=_step17.value;object.delete(_value9);cache.push(Tools.convertMapToPlainObject(_value9,deep))}}catch(err){_didIteratorError17=true;_iteratorError17=err}finally{try{if(!_iteratorNormalCompletion17&&_iterator17.return){_iterator17.return()}}finally{if(_didIteratorError17){throw _iteratorError17}}}var _iteratorNormalCompletion18=true;var _didIteratorError18=false;var _iteratorError18=undefined;try{for(var _iterator18=cache[Symbol.iterator](),_step18;!(_iteratorNormalCompletion18=(_step18=_iterator18.next()).done);_iteratorNormalCompletion18=true){var _value10=_step18.value;object.add(_value10)}}catch(err){_didIteratorError18=true;_iteratorError18=err}finally{try{if(!_iteratorNormalCompletion18&&_iterator18.return){_iterator18.return()}}finally{if(_didIteratorError18){throw _iteratorError18}}}}}return object}/**
     * Converts given plain object and all nested found objects to
     * corresponding map.
     * @param object - Object to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given object as map.
     */},{key:'convertPlainObjectToMap',value:function convertPlainObjectToMap(object){var deep=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;if((typeof object==='undefined'?'undefined':_typeof(object))==='object'){if(Tools.isPlainObject(object)){var newObject=new Map;for(var _key22 in object){if(object.hasOwnProperty(_key22)){if(deep)object[_key22]=Tools.convertPlainObjectToMap(object[_key22],deep);newObject.set(_key22,object[_key22])}}return newObject}if(deep)if(Array.isArray(object)){var index=0;var _iteratorNormalCompletion19=true;var _didIteratorError19=false;var _iteratorError19=undefined;try{for(var _iterator19=object[Symbol.iterator](),_step19;!(_iteratorNormalCompletion19=(_step19=_iterator19.next()).done);_iteratorNormalCompletion19=true){var _value11=_step19.value;object[index]=Tools.convertPlainObjectToMap(_value11,deep);index+=1}}catch(err){_didIteratorError19=true;_iteratorError19=err}finally{try{if(!_iteratorNormalCompletion19&&_iterator19.return){_iterator19.return()}}finally{if(_didIteratorError19){throw _iteratorError19}}}}else if(Tools.determineType(object)==='map'){var _iteratorNormalCompletion20=true;var _didIteratorError20=false;var _iteratorError20=undefined;try{for(var _iterator20=object[Symbol.iterator](),_step20;!(_iteratorNormalCompletion20=(_step20=_iterator20.next()).done);_iteratorNormalCompletion20=true){var _ref8=_step20.value;var _ref9=_slicedToArray(_ref8,2);var _key23=_ref9[0];var _value12=_ref9[1];object.set(_key23,Tools.convertPlainObjectToMap(_value12,deep))}}catch(err){_didIteratorError20=true;_iteratorError20=err}finally{try{if(!_iteratorNormalCompletion20&&_iterator20.return){_iterator20.return()}}finally{if(_didIteratorError20){throw _iteratorError20}}}}else if(Tools.determineType(object)==='set'){var cache=[];var _iteratorNormalCompletion21=true;var _didIteratorError21=false;var _iteratorError21=undefined;try{for(var _iterator21=object[Symbol.iterator](),_step21;!(_iteratorNormalCompletion21=(_step21=_iterator21.next()).done);_iteratorNormalCompletion21=true){var _value13=_step21.value;object.delete(_value13);cache.push(Tools.convertPlainObjectToMap(_value13,deep))}}catch(err){_didIteratorError21=true;_iteratorError21=err}finally{try{if(!_iteratorNormalCompletion21&&_iterator21.return){_iterator21.return()}}finally{if(_didIteratorError21){throw _iteratorError21}}}var _iteratorNormalCompletion22=true;var _didIteratorError22=false;var _iteratorError22=undefined;try{for(var _iterator22=cache[Symbol.iterator](),_step22;!(_iteratorNormalCompletion22=(_step22=_iterator22.next()).done);_iteratorNormalCompletion22=true){var _value14=_step22.value;object.add(_value14)}}catch(err){_didIteratorError22=true;_iteratorError22=err}finally{try{if(!_iteratorNormalCompletion22&&_iterator22.return){_iterator22.return()}}finally{if(_didIteratorError22){throw _iteratorError22}}}}}return object}/**
     * Replaces given pattern in each value in given object recursively with
     * given string replacement.
     * @param object - Object to convert substrings in.
     * @param pattern - Regular expression to replace.
     * @param replacement - String to use as replacement for found patterns.
     * @returns Converted object with replaced patterns.
     */},{key:'convertSubstringInPlainObject',value:function convertSubstringInPlainObject(object,pattern,replacement){for(var _key24 in object){if(object.hasOwnProperty(_key24))if(Tools.isPlainObject(object[_key24]))object[_key24]=Tools.convertSubstringInPlainObject(object[_key24],pattern,replacement);else if(typeof object[_key24]==='string')object[_key24]=object[_key24].replace(pattern,replacement)}return object}/**
     * Copies given object (of any type) into optionally given destination.
     * @param source - Object to copy.
     * @param recursionLimit - Specifies how deep we should traverse into given
     * object recursively.
     * @param cyclic - Indicates whether known sub structures should be copied
     * or referenced (if "true" endless loops can occur of source has cyclic
     * structures).
     * @param destination - Target to copy source to.
     * @param stackSource - Internally used to avoid traversing loops.
     * @param stackDestination - Internally used to avoid traversing loops and
     * referencing them correctly.
     * @param recursionLevel - Internally used to track current recursion
     * level in given source data structure.
     * @returns Value "true" if both objects are equal and "false" otherwise.
     */},{key:'copyLimitedRecursively',value:function copyLimitedRecursively(source){var recursionLimit=arguments.length>1&&arguments[1]!==undefined?arguments[1]:-1;var cyclic=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var destination=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;var stackSource=arguments.length>4&&arguments[4]!==undefined?arguments[4]:[];var stackDestination=arguments.length>5&&arguments[5]!==undefined?arguments[5]:[];var recursionLevel=arguments.length>6&&arguments[6]!==undefined?arguments[6]:0;if((typeof source==='undefined'?'undefined':_typeof(source))==='object')if(destination){if(source===destination)throw new Error('Can\'t copy because source and destination are '+'identical.');if(recursionLimit!==-1&&recursionLimit<recursionLevel)return null;if(!cyclic&&![undefined,null].includes(source)){var index=stackSource.indexOf(source);if(index!==-1)return stackDestination[index];stackSource.push(source);stackDestination.push(destination)}var copyValue=function copyValue(value){var result=Tools.copyLimitedRecursively(value,recursionLimit,cyclic,null,stackSource,stackDestination,recursionLevel+1);if(!cyclic&&![undefined,null].includes(value)&&(typeof value==='undefined'?'undefined':_typeof(value))==='object'){stackSource.push(value);stackDestination.push(result)}return result};if(Array.isArray(source)){var _iteratorNormalCompletion23=true;var _didIteratorError23=false;var _iteratorError23=undefined;try{for(var _iterator23=source[Symbol.iterator](),_step23;!(_iteratorNormalCompletion23=(_step23=_iterator23.next()).done);_iteratorNormalCompletion23=true){var item=_step23.value;destination.push(copyValue(item))}}catch(err){_didIteratorError23=true;_iteratorError23=err}finally{try{if(!_iteratorNormalCompletion23&&_iterator23.return){_iterator23.return()}}finally{if(_didIteratorError23){throw _iteratorError23}}}}else if(Tools.determineType(source)==='map'){var _iteratorNormalCompletion24=true;var _didIteratorError24=false;var _iteratorError24=undefined;try{for(var _iterator24=source[Symbol.iterator](),_step24;!(_iteratorNormalCompletion24=(_step24=_iterator24.next()).done);_iteratorNormalCompletion24=true){var _ref10=_step24.value;var _ref11=_slicedToArray(_ref10,2);var _key25=_ref11[0];var _value15=_ref11[1];destination.set(_key25,copyValue(_value15))}}catch(err){_didIteratorError24=true;_iteratorError24=err}finally{try{if(!_iteratorNormalCompletion24&&_iterator24.return){_iterator24.return()}}finally{if(_didIteratorError24){throw _iteratorError24}}}}else if(Tools.determineType(source)==='set'){var _iteratorNormalCompletion25=true;var _didIteratorError25=false;var _iteratorError25=undefined;try{for(var _iterator25=source[Symbol.iterator](),_step25;!(_iteratorNormalCompletion25=(_step25=_iterator25.next()).done);_iteratorNormalCompletion25=true){var _value16=_step25.value;destination.add(copyValue(_value16))}}catch(err){_didIteratorError25=true;_iteratorError25=err}finally{try{if(!_iteratorNormalCompletion25&&_iterator25.return){_iterator25.return()}}finally{if(_didIteratorError25){throw _iteratorError25}}}}else if(source!==null)for(var _key26 in source){if(source.hasOwnProperty(_key26))destination[_key26]=copyValue(source[_key26])}}else if(source){if(Array.isArray(source))return Tools.copyLimitedRecursively(source,recursionLimit,cyclic,[],stackSource,stackDestination,recursionLevel);if(Tools.determineType(source)==='map')return Tools.copyLimitedRecursively(source,recursionLimit,cyclic,new Map,stackSource,stackDestination,recursionLevel);if(Tools.determineType(source)==='set')return Tools.copyLimitedRecursively(source,recursionLimit,cyclic,new Set,stackSource,stackDestination,recursionLevel);if(Tools.determineType(source)==='date')return new Date(source.getTime());if(Tools.determineType(source)==='regexp'){destination=new RegExp(source.source,source.toString().match(/[^\/]*$/)[0]);destination.lastIndex=source.lastIndex;return destination}return Tools.copyLimitedRecursively(source,recursionLimit,cyclic,{},stackSource,stackDestination,recursionLevel)}return destination||source}/**
     * Determine the internal JavaScript [[Class]] of an object.
     * @param object - Object to analyze.
     * @returns Name of determined class.
     */},{key:'determineType',value:function determineType(){var object=arguments.length>0&&arguments[0]!==undefined?arguments[0]:undefined;if([undefined,null].includes(object))return''+object;if(['object','function'].includes(typeof object==='undefined'?'undefined':_typeof(object))&&'toString'in object){var stringRepresentation=Tools.classToTypeMapping.toString.call(object);if(Tools.classToTypeMapping.hasOwnProperty(stringRepresentation))return Tools.classToTypeMapping[stringRepresentation]}return typeof object==='undefined'?'undefined':_typeof(object)}/**
     * Returns true if given items are equal for given property list. If
     * property list isn't set all properties will be checked. All keys which
     * starts with one of the exception prefixes will be omitted.
     * @param firstValue - First object to compare.
     * @param secondValue - Second object to compare.
     * @param properties - Property names to check. Check all if "null" is
     * selected (default).
     * @param deep - Recursion depth negative values means infinitely deep
     * (default).
     * @param exceptionPrefixes - Property prefixes which indicates properties
     * to ignore.
     * @param ignoreFunctions - Indicates whether functions have to be
     * identical to interpret is as equal. If set to "true" two functions will
     * be assumed to be equal (default).
     * @param compareBlobs - Indicates whether binary data should be converted
     * to a base64 string to compare their content. Makes this function
     * asynchronous in browsers and potentially takes a lot of resources.
     * @returns Value "true" if both objects are equal and "false" otherwise.
     * If "compareBlobs" is activated and we're running in a browser like
     * environment and binary data is given, then a promise wrapping the
     * determined boolean values is returned.
     */},{key:'equals',value:function equals(firstValue,secondValue){var properties=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var deep=arguments.length>3&&arguments[3]!==undefined?arguments[3]:-1;var exceptionPrefixes=arguments.length>4&&arguments[4]!==undefined?arguments[4]:[];var _this4=this;var ignoreFunctions=arguments.length>5&&arguments[5]!==undefined?arguments[5]:true;var compareBlobs=arguments.length>6&&arguments[6]!==undefined?arguments[6]:false;if(ignoreFunctions&&Tools.isFunction(firstValue)&&Tools.isFunction(secondValue)||firstValue===secondValue||Tools.numberIsNotANumber(firstValue)&&Tools.numberIsNotANumber(secondValue)||firstValue instanceof RegExp&&secondValue instanceof RegExp&&firstValue.toString()===secondValue.toString()||firstValue instanceof Date&&secondValue instanceof Date&&(isNaN(firstValue.getTime())&&isNaN(secondValue.getTime())||!isNaN(firstValue.getTime())&&!isNaN(secondValue.getTime())&&firstValue.getTime()===secondValue.getTime())||compareBlobs&&eval('typeof Buffer')!=='undefined'&&eval('Buffer').isBuffer&&firstValue instanceof eval('Buffer')&&secondValue instanceof eval('Buffer')&&firstValue.toString('base64')===secondValue.toString('base64'))return true;if(compareBlobs&&typeof Blob!=='undefined'&&firstValue instanceof Blob&&secondValue instanceof Blob)return new Promise(function(resolve){var values=[];var _arr6=[firstValue,secondValue];for(var _i6=0;_i6<_arr6.length;_i6++){var _value17=_arr6[_i6];var fileReader=new FileReader;fileReader.onload=function(event){values.push(event.target.result);if(values.length===2)resolve(values[0]===values[1])};fileReader.readAsDataURL(_value17)}});if(Tools.isPlainObject(firstValue)&&Tools.isPlainObject(secondValue)&&!(firstValue instanceof RegExp||secondValue instanceof RegExp)||Array.isArray(firstValue)&&Array.isArray(secondValue)&&firstValue.length===secondValue.length||(Tools.determineType(firstValue)==='map'&&Tools.determineType(secondValue)==='map'||Tools.determineType(firstValue)==='set'&&Tools.determineType(secondValue)==='set')&&firstValue.size===secondValue.size){var promises=[];var _arr7=[[firstValue,secondValue],[secondValue,firstValue]];for(var _i7=0;_i7<_arr7.length;_i7++){var _ref12=_arr7[_i7];var _ref13=_slicedToArray(_ref12,2);var first=_ref13[0];var second=_ref13[1];var firstIsArray=Array.isArray(first);if(firstIsArray&&(!Array.isArray(second)||first.length!==second.length))return false;var firstIsMap=Tools.determineType(first)==='map';if(firstIsMap&&(Tools.determineType(second)!=='map'||first.size!==second.size))return false;var firstIsSet=Tools.determineType(first)==='set';if(firstIsSet&&(Tools.determineType(second)!=='set'||first.size!==second.size))return false;if(firstIsArray){var index=0;var _iteratorNormalCompletion26=true;var _didIteratorError26=false;var _iteratorError26=undefined;try{for(var _iterator26=first[Symbol.iterator](),_step26;!(_iteratorNormalCompletion26=(_step26=_iterator26.next()).done);_iteratorNormalCompletion26=true){var _value18=_step26.value;if(deep!==0){var result=Tools.equals(_value18,second[index],properties,deep-1,exceptionPrefixes,ignoreFunctions,compareBlobs);if(!result)return false;else if((typeof result==='undefined'?'undefined':_typeof(result))==='object'&&'then'in result)promises.push(result)}index+=1}/* eslint-disable curly */}catch(err){_didIteratorError26=true;_iteratorError26=err}finally{try{if(!_iteratorNormalCompletion26&&_iterator26.return){_iterator26.return()}}finally{if(_didIteratorError26){throw _iteratorError26}}}}else if(firstIsMap){var _iteratorNormalCompletion27=true;var _didIteratorError27=false;var _iteratorError27=undefined;try{for(var _iterator27=first[Symbol.iterator](),_step27;!(_iteratorNormalCompletion27=(_step27=_iterator27.next()).done);_iteratorNormalCompletion27=true){var _ref15=_step27.value;var _ref16=_slicedToArray(_ref15,2);var _key27=_ref16[0];var _value19=_ref16[1];if(deep!==0){var _result=Tools.equals(_value19,second.get(_key27),properties,deep-1,exceptionPrefixes,ignoreFunctions,compareBlobs);if(!_result)return false;else if((typeof _result==='undefined'?'undefined':_typeof(_result))==='object'&&'then'in _result)promises.push(_result)}}}catch(err){_didIteratorError27=true;_iteratorError27=err}finally{try{if(!_iteratorNormalCompletion27&&_iterator27.return){_iterator27.return()}}finally{if(_didIteratorError27){throw _iteratorError27}}}}else if(firstIsSet){/* eslint-enable curly */var _iteratorNormalCompletion28=true;var _didIteratorError28=false;var _iteratorError28=undefined;try{for(var _iterator28=first[Symbol.iterator](),_step28;!(_iteratorNormalCompletion28=(_step28=_iterator28.next()).done);_iteratorNormalCompletion28=true){var _value20=_step28.value;if(deep!==0){var _ret2=function(){var equal=false;var subPromises=[];var _iteratorNormalCompletion29=true;var _didIteratorError29=false;var _iteratorError29=undefined;try{for(var _iterator29=second[Symbol.iterator](),_step29;!(_iteratorNormalCompletion29=(_step29=_iterator29.next()).done);_iteratorNormalCompletion29=true){var _secondValue=_step29.value;var _result2=Tools.equals(_value20,_secondValue,properties,deep-1,exceptionPrefixes,ignoreFunctions,compareBlobs);if(typeof _result2==='boolean'){if(_result2){equal=true;break}}else subPromises.push(_result2)}}catch(err){_didIteratorError29=true;_iteratorError29=err}finally{try{if(!_iteratorNormalCompletion29&&_iterator29.return){_iterator29.return()}}finally{if(_didIteratorError29){throw _iteratorError29}}}if(subPromises.length)promises.push(new Promise(function(){var _ref17=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee5(resolve){return regeneratorRuntime.wrap(function _callee5$(_context5){while(1){switch(_context5.prev=_context5.next){case 0:_context5.t0=resolve;_context5.next=3;return Promise.all(subPromises);case 3:_context5.t1=Tools.identity;_context5.t2=_context5.sent.some(_context5.t1);return _context5.abrupt('return',(0,_context5.t0)(_context5.t2));case 6:case'end':return _context5.stop();}}},_callee5,_this4)}));return function(_x54){return _ref17.apply(this,arguments)}}()));else if(!equal)return{v:false}}();if((typeof _ret2==='undefined'?'undefined':_typeof(_ret2))==='object')return _ret2.v}}}catch(err){_didIteratorError28=true;_iteratorError28=err}finally{try{if(!_iteratorNormalCompletion28&&_iterator28.return){_iterator28.return()}}finally{if(_didIteratorError28){throw _iteratorError28}}}}else for(var _key28 in first){if(first.hasOwnProperty(_key28)){if(properties&&!properties.includes(_key28))break;var doBreak=false;var _iteratorNormalCompletion30=true;var _didIteratorError30=false;var _iteratorError30=undefined;try{for(var _iterator30=exceptionPrefixes[Symbol.iterator](),_step30;!(_iteratorNormalCompletion30=(_step30=_iterator30.next()).done);_iteratorNormalCompletion30=true){var exceptionPrefix=_step30.value;if(_key28.toString().startsWith(exceptionPrefix)){doBreak=true;break}}}catch(err){_didIteratorError30=true;_iteratorError30=err}finally{try{if(!_iteratorNormalCompletion30&&_iterator30.return){_iterator30.return()}}finally{if(_didIteratorError30){throw _iteratorError30}}}if(doBreak)break;if(deep!==0){var _result3=Tools.equals(first[_key28],second[_key28],properties,deep-1,exceptionPrefixes,ignoreFunctions,compareBlobs);if(!_result3)return false;else if((typeof _result3==='undefined'?'undefined':_typeof(_result3))==='object'&&'then'in _result3)promises.push(_result3)}}}}if(promises.length)return new Promise(function(){var _ref14=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee4(resolve){return regeneratorRuntime.wrap(function _callee4$(_context4){while(1){switch(_context4.prev=_context4.next){case 0:_context4.t0=resolve;_context4.next=3;return Promise.all(promises);case 3:_context4.t1=Tools.identity;_context4.t2=_context4.sent.every(_context4.t1);return _context4.abrupt('return',(0,_context4.t0)(_context4.t2));case 6:case'end':return _context4.stop();}}},_callee4,_this4)}));return function(_x53){return _ref14.apply(this,arguments)}}());return true}return false}/**
     * Searches for nested mappings with given indicator key and resolves
     * marked values. Additionally all objects are wrapped with a proxy to
     * dynamically resolve nested properties.
     * @param object - Given mapping to resolve.
     * @param scope - Scope to to use evaluate again.
     * @param selfReferenceName - Name to use for reference to given object.
     * @param expressionIndicatorKey - Indicator property name to mark a value
     * to evaluate.
     * @param executionIndicatorKey - Indicator property name to mark a value
     * to evaluate.
     * @returns Evaluated given mapping.
     */},{key:'evaluateDynamicDataStructure',value:function evaluateDynamicDataStructure(object){var scope=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var selfReferenceName=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'self';var expressionIndicatorKey=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'__evaluate__';var executionIndicatorKey=arguments.length>4&&arguments[4]!==undefined?arguments[4]:'__execute__';if((typeof object==='undefined'?'undefined':_typeof(object))!=='object'||object===null)return object;if(!(selfReferenceName in scope))scope[selfReferenceName]=object;var evaluate=function evaluate(code){var type=arguments.length>1&&arguments[1]!==undefined?arguments[1]:expressionIndicatorKey;code=type===expressionIndicatorKey?'return '+code:code;var compiledFunction=void 0;try{var _Function$prototype$b;/* eslint-disable new-parens */// IgnoreTypeCheck
compiledFunction=new((_Function$prototype$b=Function.prototype.bind).call.apply(_Function$prototype$b,[/* eslint-enable new-parens */Function,null].concat(_toConsumableArray(Object.keys(scope)),[code])))}catch(error){throw new Error('Error during compiling code "'+code+'": "'+(Tools.representObject(error)+'".'))}try{return compiledFunction.apply(undefined,_toConsumableArray(Object.values(scope)))}catch(error){throw new Error('Error running code "'+code+'" in scope with variables "'+(Object.keys(scope).join('", "')+'": "')+(Tools.representObject(error)+'".'))}};var addProxyRecursively=function addProxyRecursively(data){if((typeof data==='undefined'?'undefined':_typeof(data))!=='object'||data===null)return data;for(var _key29 in data){if(data.hasOwnProperty(_key29)&&_key29!=='__target__'&&_typeof(data[_key29])==='object'&&data[_key29]!==null){addProxyRecursively(data[_key29]);/*
                        NOTE: We only wrap needed objects for performance
                        reasons.
                    */if(data[_key29].hasOwnProperty(expressionIndicatorKey)||data[_key29].hasOwnProperty(executionIndicatorKey))data[_key29]=new Proxy(data[_key29],{get:function get(target,key){if(key==='__target__')return target;if(key==='hasOwnProperty')return target[key];/*
                                    NOTE: Very complicated stuff section, only
                                    change while doing a lot of tests.
                                */var _arr8=[expressionIndicatorKey,executionIndicatorKey];for(var _i8=0;_i8<_arr8.length;_i8++){var _type3=_arr8[_i8];if(key===_type3)return resolve(evaluate(target[key],_type3))}var resolvedTarget=resolve(target);if(key==='toString'){var result=evaluate(resolvedTarget);return result[key].bind(result)}if(typeof key!=='string'){var _result4=evaluate(resolvedTarget);if(_result4[key]&&_result4[key].call)return _result4[key].bind(_result4);return _result4[key]}var _arr9=[expressionIndicatorKey,executionIndicatorKey];for(var _i9=0;_i9<_arr9.length;_i9++){var _type4=_arr9[_i9];if(target.hasOwnProperty(_type4))return evaluate(resolvedTarget,_type4)[key]}return resolvedTarget[key];// End of complicated stuff.
},ownKeys:function ownKeys(target){var _arr10=[expressionIndicatorKey,executionIndicatorKey];for(var _i10=0;_i10<_arr10.length;_i10++){var _type5=_arr10[_i10];if(target.hasOwnProperty(_type5))return Object.getOwnPropertyNames(resolve(evaluate(target[_type5],_type5)))}return Object.getOwnPropertyNames(target)}})}}return data};var resolve=function resolve(data){if((typeof data==='undefined'?'undefined':_typeof(data))==='object'&&data!==null){if(data.__target__){// NOTE: We have to skip "ownKeys" proxy trap here.
var _arr11=[expressionIndicatorKey,executionIndicatorKey];for(var _i11=0;_i11<_arr11.length;_i11++){var _type6=_arr11[_i11];if(data.hasOwnProperty(_type6))return data[_type6]}data=data.__target__}for(var _key30 in data){if(data.hasOwnProperty(_key30))if([expressionIndicatorKey,executionIndicatorKey].includes(_key30))return data[_key30];else data[_key30]=resolve(data[_key30])}}return data};scope.resolve=resolve;var removeProxyRecursively=function removeProxyRecursively(data){if((typeof data==='undefined'?'undefined':_typeof(data))==='object'&&data!==null)for(var _key31 in data){if(data.hasOwnProperty(_key31)&&_key31!=='__target__'&&_typeof(data[_key31])==='object'&&data[_key31]!==null){var _target=data[_key31].__target__;if(typeof _target!=='undefined')data[_key31]=_target;removeProxyRecursively(data[_key31])}}return data};if((typeof object==='undefined'?'undefined':_typeof(object))==='object'&&object!==null)if(object.hasOwnProperty(expressionIndicatorKey))return evaluate(object[expressionIndicatorKey]);else if(object.hasOwnProperty(executionIndicatorKey))return evaluate(object[executionIndicatorKey],executionIndicatorKey);return removeProxyRecursively(resolve(addProxyRecursively(object)))}/**
     * Extends given target object with given sources object. As target and
     * sources many expandable types are allowed but target and sources have to
     * to come from the same type.
     * @param targetOrDeepIndicator - Maybe the target or deep indicator.
     * @param targetAndOrSources - Target and at least one source object.
     * @returns Returns given target extended with all given sources.
     */},{key:'extendObject',value:function extendObject(targetOrDeepIndicator){var index=0;var deep=false;var target=void 0;if(typeof targetOrDeepIndicator==='boolean'){// Handle a deep copy situation and skip deep indicator and target.
deep=targetOrDeepIndicator;target=arguments.length<=index+1?undefined:arguments[index+1];index=1}else target=targetOrDeepIndicator;var mergeValue=function mergeValue(targetValue,value){if(value===targetValue)return targetValue;// Recurse if we're merging plain objects or maps.
if(deep&&value&&(Tools.isPlainObject(value)||Tools.determineType(value)==='map')){var clone=void 0;if(Tools.determineType(value)==='map')clone=targetValue&&Tools.determineType(targetValue)==='map'?targetValue:new Map;else clone=targetValue&&Tools.isPlainObject(targetValue)?targetValue:{};return Tools.extendObject(deep,clone,value)}return value};while(index<(arguments.length<=1?0:arguments.length-1)){var source=arguments.length<=index+1?undefined:arguments[index+1];var targetType=typeof target==='undefined'?'undefined':_typeof(target);var sourceType=typeof source==='undefined'?'undefined':_typeof(source);if(Tools.determineType(target)==='map')targetType+=' Map';if(Tools.determineType(source)==='map')sourceType+=' Map';if(targetType===sourceType&&target!==source){if(Tools.determineType(target)==='map'&&Tools.determineType(source)==='map'){var _iteratorNormalCompletion31=true;var _didIteratorError31=false;var _iteratorError31=undefined;try{for(var _iterator31=source[Symbol.iterator](),_step31;!(_iteratorNormalCompletion31=(_step31=_iterator31.next()).done);_iteratorNormalCompletion31=true){var _ref18=_step31.value;var _ref19=_slicedToArray(_ref18,2);var _key32=_ref19[0];var _value21=_ref19[1];target.set(_key32,mergeValue(target.get(_key32),_value21))}}catch(err){_didIteratorError31=true;_iteratorError31=err}finally{try{if(!_iteratorNormalCompletion31&&_iterator31.return){_iterator31.return()}}finally{if(_didIteratorError31){throw _iteratorError31}}}}else if(target!==null&&!Array.isArray(target)&&(typeof target==='undefined'?'undefined':_typeof(target))==='object'&&source!==null&&!Array.isArray(source)&&(typeof source==='undefined'?'undefined':_typeof(source))==='object'){for(var _key33 in source){if(source.hasOwnProperty(_key33))target[_key33]=mergeValue(target[_key33],source[_key33])}}else target=source;}else target=source;index+=1}return target}/**
     * Iterates given objects own properties in sorted fashion. For
     * each key value pair given iterator function will be called with
     * value and key as arguments.
     * @param object - Object to iterate.
     * @param iterator - Function to execute for each key value pair. Value
     * will be the first and key will be the second argument.
     * @param context - The "this" binding for given iterator function.
     * @returns List of given sorted keys.
     */},{key:'forEachSorted',value:function forEachSorted(object,iterator,context){var keys=Tools.sort(object);var _iteratorNormalCompletion32=true;var _didIteratorError32=false;var _iteratorError32=undefined;try{for(var _iterator32=keys[Symbol.iterator](),_step32;!(_iteratorNormalCompletion32=(_step32=_iterator32.next()).done);_iteratorNormalCompletion32=true){var _key34=_step32.value;if((typeof object==='undefined'?'undefined':_typeof(object))==='object')if(['map','set'].includes(Tools.determineType(object)))// IgnoreTypeCheck
iterator.call(context,object.get(_key34),_key34);else if(Array.isArray(object)||object instanceof Object)iterator.call(context,object[_key34],_key34)}}catch(err){_didIteratorError32=true;_iteratorError32=err}finally{try{if(!_iteratorNormalCompletion32&&_iterator32.return){_iterator32.return()}}finally{if(_didIteratorError32){throw _iteratorError32}}}return keys}/**
     * Generates a proxy handler which forwards all operations to given object
     * as there wouldn't be a proxy.
     * @param target - Object to proxy.
     * @param methodNames - Mapping of operand name to object specific method
     * name.
     * @returns Determined proxy handler.
     */},{key:'getProxyHandler',value:function getProxyHandler(target){var methodNames=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};methodNames=Tools.extendObject({delete:'[]',get:'[]',has:'[]',set:'[]'},methodNames);return{deleteProperty:function deleteProperty(proxy,key){if(methodNames.delete==='[]')delete target[key];else return target[methodNames.delete](key)},get:function get(proxy,key){if(methodNames.get==='[]')return target[key];return target[methodNames.get](key)},has:function has(proxy,key){if(methodNames.has==='[]')return key in target;return target[methodNames.has](key)},set:function set(proxy,key,value){if(methodNames.set==='[]')target[key]=value;else return target[methodNames.set](value)}}}/**
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
     */},{key:'modifyObject',value:function modifyObject(target,source){var removeIndicatorKey=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'__remove__';var prependIndicatorKey=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'__prepend__';var appendIndicatorKey=arguments.length>4&&arguments[4]!==undefined?arguments[4]:'__append__';var positionPrefix=arguments.length>5&&arguments[5]!==undefined?arguments[5]:'__';var positionSuffix=arguments.length>6&&arguments[6]!==undefined?arguments[6]:'__';var parentSource=arguments.length>7&&arguments[7]!==undefined?arguments[7]:null;var parentKey=arguments.length>8&&arguments[8]!==undefined?arguments[8]:null;/* eslint-disable curly */if(Tools.determineType(source)==='map'&&Tools.determineType(target)==='map'){var _iteratorNormalCompletion33=true;var _didIteratorError33=false;var _iteratorError33=undefined;try{for(var _iterator33=source[Symbol.iterator](),_step33;!(_iteratorNormalCompletion33=(_step33=_iterator33.next()).done);_iteratorNormalCompletion33=true){var _ref20=_step33.value;var _ref21=_slicedToArray(_ref20,2);var _key35=_ref21[0];var _value22=_ref21[1];if(target.has(_key35))Tools.modifyObject(target.get(_key35),_value22,removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,_key35)}}catch(err){_didIteratorError33=true;_iteratorError33=err}finally{try{if(!_iteratorNormalCompletion33&&_iterator33.return){_iterator33.return()}}finally{if(_didIteratorError33){throw _iteratorError33}}}}else if(/* eslint-enable curly */source!==null&&(typeof source==='undefined'?'undefined':_typeof(source))==='object'&&target!==null&&(typeof target==='undefined'?'undefined':_typeof(target))==='object')for(var _key36 in source){if(source.hasOwnProperty(_key36))if([removeIndicatorKey,prependIndicatorKey,appendIndicatorKey].includes(_key36)){if(Array.isArray(target)){if(_key36===removeIndicatorKey){var _iteratorNormalCompletion34=true;var _didIteratorError34=false;var _iteratorError34=undefined;try{for(var _iterator34=[].concat(source[_key36])[Symbol.iterator](),_step34;!(_iteratorNormalCompletion34=(_step34=_iterator34.next()).done);_iteratorNormalCompletion34=true){var valueToModify=_step34.value;if(typeof valueToModify==='string'&&valueToModify.startsWith(positionPrefix)&&valueToModify.endsWith(positionSuffix))target.splice(parseInt(valueToModify.substring(positionPrefix.length,valueToModify.length-positionSuffix.length)),1);else if(target.includes(valueToModify))target.splice(target.indexOf(valueToModify),1)}}catch(err){_didIteratorError34=true;_iteratorError34=err}finally{try{if(!_iteratorNormalCompletion34&&_iterator34.return){_iterator34.return()}}finally{if(_didIteratorError34){throw _iteratorError34}}}}else if(_key36===prependIndicatorKey)target=[].concat(source[_key36]).concat(target);else target=target.concat(source[_key36]);}else if(_key36===removeIndicatorKey){var _iteratorNormalCompletion35=true;var _didIteratorError35=false;var _iteratorError35=undefined;try{for(var _iterator35=[].concat(source[_key36])[Symbol.iterator](),_step35;!(_iteratorNormalCompletion35=(_step35=_iterator35.next()).done);_iteratorNormalCompletion35=true){var _valueToModify=_step35.value;if(target.hasOwnProperty(_valueToModify))delete target[_valueToModify]}}catch(err){_didIteratorError35=true;_iteratorError35=err}finally{try{if(!_iteratorNormalCompletion35&&_iterator35.return){_iterator35.return()}}finally{if(_didIteratorError35){throw _iteratorError35}}}}delete source[_key36];if(parentSource&&parentKey)delete parentSource[parentKey]}else if(target!==null&&target.hasOwnProperty(_key36))// IgnoreTypeCheck
target[_key36]=Tools.modifyObject(// IgnoreTypeCheck
target[_key36],source[_key36],removeIndicatorKey,prependIndicatorKey,appendIndicatorKey,positionPrefix,positionSuffix,source,_key36)}return target}/**
     * Represents given object as formatted string.
     * @param object - Object to Represents.
     * @param indention - String (usually whitespaces) to use as indention.
     * @param initialIndention - String (usually whitespaces) to use as
     * additional indention for the first object traversing level.
     * @returns Representation string.
     */},{key:'representObject',value:function representObject(object){var indention=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'    ';var initialIndention=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';if(object===null)return'null';if(object===undefined)return'undefined';if(typeof object==='string')return'"'+object.replace(/\n/g,'\n'+initialIndention)+'"';if(Tools.isNumeric(object)||typeof object==='boolean')return''+object;if(Array.isArray(object)){var _result5='[';var _firstSeen=false;var _iteratorNormalCompletion36=true;var _didIteratorError36=false;var _iteratorError36=undefined;try{for(var _iterator36=object[Symbol.iterator](),_step36;!(_iteratorNormalCompletion36=(_step36=_iterator36.next()).done);_iteratorNormalCompletion36=true){var item=_step36.value;if(_firstSeen)_result5+=',';_result5+='\n'+initialIndention+indention+Tools.representObject(item,indention,''+initialIndention+indention);_firstSeen=true}}catch(err){_didIteratorError36=true;_iteratorError36=err}finally{try{if(!_iteratorNormalCompletion36&&_iterator36.return){_iterator36.return()}}finally{if(_didIteratorError36){throw _iteratorError36}}}if(_firstSeen)_result5+='\n'+initialIndention;_result5+=']';return _result5}if(Tools.determineType(object)==='map'){var _result6='';var _firstSeen2=false;var _iteratorNormalCompletion37=true;var _didIteratorError37=false;var _iteratorError37=undefined;try{for(var _iterator37=object[Symbol.iterator](),_step37;!(_iteratorNormalCompletion37=(_step37=_iterator37.next()).done);_iteratorNormalCompletion37=true){var _ref22=_step37.value;var _ref23=_slicedToArray(_ref22,2);var _key37=_ref23[0];var _item=_ref23[1];if(_firstSeen2)_result6+=',\n'+initialIndention+indention;_result6+=Tools.representObject(_key37,indention,''+initialIndention+indention)+' -> '+Tools.representObject(_item,indention,''+initialIndention+indention);_firstSeen2=true}}catch(err){_didIteratorError37=true;_iteratorError37=err}finally{try{if(!_iteratorNormalCompletion37&&_iterator37.return){_iterator37.return()}}finally{if(_didIteratorError37){throw _iteratorError37}}}if(!_firstSeen2)_result6='EmptyMap';return _result6}if(Tools.determineType(object)==='set'){var _result7='{';var _firstSeen3=false;var _iteratorNormalCompletion38=true;var _didIteratorError38=false;var _iteratorError38=undefined;try{for(var _iterator38=object[Symbol.iterator](),_step38;!(_iteratorNormalCompletion38=(_step38=_iterator38.next()).done);_iteratorNormalCompletion38=true){var _item2=_step38.value;if(_firstSeen3)_result7+=',';_result7+='\n'+initialIndention+indention+Tools.representObject(_item2,indention,''+initialIndention+indention);_firstSeen3=true}}catch(err){_didIteratorError38=true;_iteratorError38=err}finally{try{if(!_iteratorNormalCompletion38&&_iterator38.return){_iterator38.return()}}finally{if(_didIteratorError38){throw _iteratorError38}}}if(_firstSeen3)_result7+='\n'+initialIndention+'}';else _result7='EmptySet';return _result7}var result='{';var keys=Object.getOwnPropertyNames(object).sort();var firstSeen=false;var _iteratorNormalCompletion39=true;var _didIteratorError39=false;var _iteratorError39=undefined;try{for(var _iterator39=keys[Symbol.iterator](),_step39;!(_iteratorNormalCompletion39=(_step39=_iterator39.next()).done);_iteratorNormalCompletion39=true){var _key38=_step39.value;if(firstSeen)result+=',';result+='\n'+initialIndention+indention+_key38+': '+Tools.representObject(object[_key38],indention,''+initialIndention+indention);firstSeen=true}}catch(err){_didIteratorError39=true;_iteratorError39=err}finally{try{if(!_iteratorNormalCompletion39&&_iterator39.return){_iterator39.return()}}finally{if(_didIteratorError39){throw _iteratorError39}}}if(firstSeen)result+='\n'+initialIndention;result+='}';return result}/**
     * Sort given objects keys.
     * @param object - Object which keys should be sorted.
     * @returns Sorted list of given keys.
     */},{key:'sort',value:function sort(object){var keys=[];if(Array.isArray(object))for(var index=0;index<object.length;index++){keys.push(index)}else if((typeof object==='undefined'?'undefined':_typeof(object))==='object')if(Tools.determineType(object)==='map'){var _iteratorNormalCompletion40=true;var _didIteratorError40=false;var _iteratorError40=undefined;try{for(var _iterator40=object[Symbol.iterator](),_step40;!(_iteratorNormalCompletion40=(_step40=_iterator40.next()).done);_iteratorNormalCompletion40=true){var keyValuePair=_step40.value;keys.push(keyValuePair[0])}}catch(err){_didIteratorError40=true;_iteratorError40=err}finally{try{if(!_iteratorNormalCompletion40&&_iterator40.return){_iterator40.return()}}finally{if(_didIteratorError40){throw _iteratorError40}}}}else if(object!==null)for(var _key39 in object){if(object.hasOwnProperty(_key39))keys.push(_key39)}return keys.sort()}/**
     * Removes a proxy from given data structure recursively.
     * @param object - Object to proxy.
     * @param seenObjects - Tracks all already processed objects to avoid
     * endless loops (usually only needed for internal purpose).
     * @returns Returns given object unwrapped from a dynamic proxy.
     */},{key:'unwrapProxy',value:function unwrapProxy(object){var seenObjects=arguments.length>1&&arguments[1]!==undefined?arguments[1]:new Set;if(object!==null&&(typeof object==='undefined'?'undefined':_typeof(object))==='object'){if(seenObjects.has(object))return object;try{if(object.__revoke__){object=object.__target__;object.__revoke__()}}catch(error){return object}finally{seenObjects.add(object)}if(Array.isArray(object)){var index=0;var _iteratorNormalCompletion41=true;var _didIteratorError41=false;var _iteratorError41=undefined;try{for(var _iterator41=object[Symbol.iterator](),_step41;!(_iteratorNormalCompletion41=(_step41=_iterator41.next()).done);_iteratorNormalCompletion41=true){var _value23=_step41.value;object[index]=Tools.unwrapProxy(_value23,seenObjects);index+=1}}catch(err){_didIteratorError41=true;_iteratorError41=err}finally{try{if(!_iteratorNormalCompletion41&&_iterator41.return){_iterator41.return()}}finally{if(_didIteratorError41){throw _iteratorError41}}}}else if(Tools.determineType(object)==='map'){var _iteratorNormalCompletion42=true;var _didIteratorError42=false;var _iteratorError42=undefined;try{for(var _iterator42=object[Symbol.iterator](),_step42;!(_iteratorNormalCompletion42=(_step42=_iterator42.next()).done);_iteratorNormalCompletion42=true){var _ref24=_step42.value;var _ref25=_slicedToArray(_ref24,2);var _key40=_ref25[0];var _value24=_ref25[1];object.set(_key40,Tools.unwrapProxy(_value24,seenObjects))}}catch(err){_didIteratorError42=true;_iteratorError42=err}finally{try{if(!_iteratorNormalCompletion42&&_iterator42.return){_iterator42.return()}}finally{if(_didIteratorError42){throw _iteratorError42}}}}else if(Tools.determineType(object)==='set'){var cache=[];var _iteratorNormalCompletion43=true;var _didIteratorError43=false;var _iteratorError43=undefined;try{for(var _iterator43=object[Symbol.iterator](),_step43;!(_iteratorNormalCompletion43=(_step43=_iterator43.next()).done);_iteratorNormalCompletion43=true){var _value25=_step43.value;object.delete(_value25);cache.push(Tools.unwrapProxy(_value25,seenObjects))}}catch(err){_didIteratorError43=true;_iteratorError43=err}finally{try{if(!_iteratorNormalCompletion43&&_iterator43.return){_iterator43.return()}}finally{if(_didIteratorError43){throw _iteratorError43}}}var _iteratorNormalCompletion44=true;var _didIteratorError44=false;var _iteratorError44=undefined;try{for(var _iterator44=cache[Symbol.iterator](),_step44;!(_iteratorNormalCompletion44=(_step44=_iterator44.next()).done);_iteratorNormalCompletion44=true){var _value26=_step44.value;object.add(_value26)}}catch(err){_didIteratorError44=true;_iteratorError44=err}finally{try{if(!_iteratorNormalCompletion44&&_iterator44.return){_iterator44.return()}}finally{if(_didIteratorError44){throw _iteratorError44}}}}else for(var _key41 in object){if(object.hasOwnProperty(_key41))object[_key41]=Tools.unwrapProxy(object[_key41],seenObjects)}}return object}// / endregion
// / region array
/**
     * Merge the contents of two arrays together into the first array.
     * @param target - Target array.
     * @param source - Source array.
     * @returns Target array with merged given source one.
     */},{key:'arrayMerge',value:function arrayMerge(target,source){if(!Array.isArray(source))source=Array.prototype.slice.call(source);var _iteratorNormalCompletion45=true;var _didIteratorError45=false;var _iteratorError45=undefined;try{for(var _iterator45=source[Symbol.iterator](),_step45;!(_iteratorNormalCompletion45=(_step45=_iterator45.next()).done);_iteratorNormalCompletion45=true){var _value27=_step45.value;target.push(_value27)}}catch(err){_didIteratorError45=true;_iteratorError45=err}finally{try{if(!_iteratorNormalCompletion45&&_iterator45.return){_iterator45.return()}}finally{if(_didIteratorError45){throw _iteratorError45}}}return target}/**
     * Converts given object into an array.
     * @param object - Target to convert.
     * @returns Generated array.
     */},{key:'arrayMake',value:function arrayMake(object){var result=[];if(![null,undefined].includes(result))if(Tools.isArrayLike(Object(object)))Tools.arrayMerge(result,typeof object==='string'?[object]:object);else result.push(object);return result}/**
     * Makes all values in given iterable unique by removing duplicates (The
     * first occurrences will be left).
     * @param data - Array like object.
     * @returns Sliced version of given object.
     */},{key:'arrayUnique',value:function arrayUnique(data){var result=[];var _iteratorNormalCompletion46=true;var _didIteratorError46=false;var _iteratorError46=undefined;try{for(var _iterator46=Tools.arrayMake(data)[Symbol.iterator](),_step46;!(_iteratorNormalCompletion46=(_step46=_iterator46.next()).done);_iteratorNormalCompletion46=true){var _value28=_step46.value;if(!result.includes(_value28))result.push(_value28)}}catch(err){_didIteratorError46=true;_iteratorError46=err}finally{try{if(!_iteratorNormalCompletion46&&_iterator46.return){_iterator46.return()}}finally{if(_didIteratorError46){throw _iteratorError46}}}return result}/**
     * Summarizes given property of given item list.
     * @param data - Array of objects with given property name.
     * @param propertyName - Property name to summarize.
     * @param defaultValue - Value to return if property values doesn't match.
     * @returns Summarized array.
     */},{key:'arrayAggregatePropertyIfEqual',value:function arrayAggregatePropertyIfEqual(data,propertyName){var defaultValue=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'';var result=defaultValue;if(data&&data.length&&data[0].hasOwnProperty(propertyName)){result=data[0][propertyName];var _iteratorNormalCompletion47=true;var _didIteratorError47=false;var _iteratorError47=undefined;try{for(var _iterator47=Tools.arrayMake(data)[Symbol.iterator](),_step47;!(_iteratorNormalCompletion47=(_step47=_iterator47.next()).done);_iteratorNormalCompletion47=true){var item=_step47.value;if(item[propertyName]!==result)return defaultValue}}catch(err){_didIteratorError47=true;_iteratorError47=err}finally{try{if(!_iteratorNormalCompletion47&&_iterator47.return){_iterator47.return()}}finally{if(_didIteratorError47){throw _iteratorError47}}}}return result}/**
     * Deletes every item witch has only empty attributes for given property
     * names. If given property names are empty each attribute will be
     * considered. The empty string, "null" and "undefined" will be interpreted
     * as empty.
     * @param data - Data to filter.
     * @param propertyNames - Properties to consider.
     * @returns Given data without empty items.
     */},{key:'arrayDeleteEmptyItems',value:function arrayDeleteEmptyItems(data){var propertyNames=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];if(!data)return data;var result=[];var _iteratorNormalCompletion48=true;var _didIteratorError48=false;var _iteratorError48=undefined;try{for(var _iterator48=Tools.arrayMake(data)[Symbol.iterator](),_step48;!(_iteratorNormalCompletion48=(_step48=_iterator48.next()).done);_iteratorNormalCompletion48=true){var item=_step48.value;var empty=true;for(var propertyName in item){if(item.hasOwnProperty(propertyName))if(!['',null,undefined].includes(item[propertyName])&&(!propertyNames.length||Tools.arrayMake(propertyNames).includes(propertyName))){empty=false;break}}if(!empty)result.push(item)}}catch(err){_didIteratorError48=true;_iteratorError48=err}finally{try{if(!_iteratorNormalCompletion48&&_iterator48.return){_iterator48.return()}}finally{if(_didIteratorError48){throw _iteratorError48}}}return result}/**
     * Extracts all properties from all items wich occur in given property
     * names.
     * @param data - Data where each item should be sliced.
     * @param propertyNames - Property names to extract.
     * @returns Data with sliced items.
     */},{key:'arrayExtract',value:function arrayExtract(data,propertyNames){var result=[];var _iteratorNormalCompletion49=true;var _didIteratorError49=false;var _iteratorError49=undefined;try{for(var _iterator49=Tools.arrayMake(data)[Symbol.iterator](),_step49;!(_iteratorNormalCompletion49=(_step49=_iterator49.next()).done);_iteratorNormalCompletion49=true){var item=_step49.value;var newItem={};var _iteratorNormalCompletion50=true;var _didIteratorError50=false;var _iteratorError50=undefined;try{for(var _iterator50=Tools.arrayMake(propertyNames)[Symbol.iterator](),_step50;!(_iteratorNormalCompletion50=(_step50=_iterator50.next()).done);_iteratorNormalCompletion50=true){var propertyName=_step50.value;if(item.hasOwnProperty(propertyName))newItem[propertyName]=item[propertyName]}}catch(err){_didIteratorError50=true;_iteratorError50=err}finally{try{if(!_iteratorNormalCompletion50&&_iterator50.return){_iterator50.return()}}finally{if(_didIteratorError50){throw _iteratorError50}}}result.push(newItem)}}catch(err){_didIteratorError49=true;_iteratorError49=err}finally{try{if(!_iteratorNormalCompletion49&&_iterator49.return){_iterator49.return()}}finally{if(_didIteratorError49){throw _iteratorError49}}}return result}/**
     * Extracts all values which matches given regular expression.
     * @param data - Data to filter.
     * @param regularExpression - Pattern to match for.
     * @returns Filtered data.
     */},{key:'arrayExtractIfMatches',value:function arrayExtractIfMatches(data,regularExpression){if(!regularExpression)return Tools.arrayMake(data);var result=[];var _iteratorNormalCompletion51=true;var _didIteratorError51=false;var _iteratorError51=undefined;try{for(var _iterator51=Tools.arrayMake(data)[Symbol.iterator](),_step51;!(_iteratorNormalCompletion51=(_step51=_iterator51.next()).done);_iteratorNormalCompletion51=true){var _value29=_step51.value;if((typeof regularExpression==='string'?new RegExp(regularExpression):regularExpression).test(_value29))result.push(_value29)}}catch(err){_didIteratorError51=true;_iteratorError51=err}finally{try{if(!_iteratorNormalCompletion51&&_iterator51.return){_iterator51.return()}}finally{if(_didIteratorError51){throw _iteratorError51}}}return result}/**
     * Filters given data if given property is set or not.
     * @param data - Data to filter.
     * @param propertyName - Property name to check for existence.
     * @returns Given data without the items which doesn't have specified
     * property.
     */},{key:'arrayExtractIfPropertyExists',value:function arrayExtractIfPropertyExists(data,propertyName){if(data&&propertyName){var result=[];var _iteratorNormalCompletion52=true;var _didIteratorError52=false;var _iteratorError52=undefined;try{for(var _iterator52=Tools.arrayMake(data)[Symbol.iterator](),_step52;!(_iteratorNormalCompletion52=(_step52=_iterator52.next()).done);_iteratorNormalCompletion52=true){var item=_step52.value;var exists=false;for(var _key42 in item){if(_key42===propertyName&&item.hasOwnProperty(_key42)&&![undefined,null].includes(item[_key42])){exists=true;break}}if(exists)result.push(item)}}catch(err){_didIteratorError52=true;_iteratorError52=err}finally{try{if(!_iteratorNormalCompletion52&&_iterator52.return){_iterator52.return()}}finally{if(_didIteratorError52){throw _iteratorError52}}}return result}return data}/**
     * Extract given data where specified property value matches given
     * patterns.
     * @param data - Data to filter.
     * @param propertyPattern - Mapping of property names to pattern.
     * @returns Filtered data.
     */},{key:'arrayExtractIfPropertyMatches',value:function arrayExtractIfPropertyMatches(data,propertyPattern){if(data&&propertyPattern){var result=[];var _iteratorNormalCompletion53=true;var _didIteratorError53=false;var _iteratorError53=undefined;try{for(var _iterator53=Tools.arrayMake(data)[Symbol.iterator](),_step53;!(_iteratorNormalCompletion53=(_step53=_iterator53.next()).done);_iteratorNormalCompletion53=true){var item=_step53.value;var matches=true;for(var propertyName in propertyPattern){if(!(propertyPattern[propertyName]&&(typeof propertyPattern[propertyName]==='string'?new RegExp(propertyPattern[propertyName]):propertyPattern[propertyName]).test(item[propertyName]))){matches=false;break}}if(matches)result.push(item)}}catch(err){_didIteratorError53=true;_iteratorError53=err}finally{try{if(!_iteratorNormalCompletion53&&_iterator53.return){_iterator53.return()}}finally{if(_didIteratorError53){throw _iteratorError53}}}return result}return data}/**
     * Determines all objects which exists in "first" and in "second".
     * Object key which will be compared are given by "keys". If an empty array
     * is given each key will be compared. If an object is given corresponding
     * initial data key will be mapped to referenced new data key.
     * @param first - Referenced data to check for.
     * @param second - Data to check for existence.
     * @param keys - Keys to define equality.
     * @param strict - The strict parameter indicates whether "null" and
     * "undefined" should be interpreted as equal (takes only effect if given
     * keys aren't empty).
     * @returns Data which does exit in given initial data.
     */},{key:'arrayIntersect',value:function arrayIntersect(first,second){var keys=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var strict=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;var containingData=[];second=Tools.arrayMake(second);var intersectItem=function intersectItem(firstItem,secondItem,firstKey,secondKey,keysAreAnArray,iterateGivenKeys){if(iterateGivenKeys){if(keysAreAnArray)firstKey=secondKey}else secondKey=firstKey;if(secondItem[secondKey]!==firstItem[firstKey]&&(strict||!([null,undefined].includes(secondItem[secondKey])&&[null,undefined].includes(firstItem[firstKey]))))return false};var _iteratorNormalCompletion54=true;var _didIteratorError54=false;var _iteratorError54=undefined;try{for(var _iterator54=Tools.arrayMake(first)[Symbol.iterator](),_step54;!(_iteratorNormalCompletion54=(_step54=_iterator54.next()).done);_iteratorNormalCompletion54=true){var firstItem=_step54.value;if(Tools.isPlainObject(firstItem)){var _iteratorNormalCompletion55=true;var _didIteratorError55=false;var _iteratorError55=undefined;try{for(var _iterator55=second[Symbol.iterator](),_step55;!(_iteratorNormalCompletion55=(_step55=_iterator55.next()).done);_iteratorNormalCompletion55=true){var secondItem=_step55.value;var exists=true;var iterateGivenKeys=void 0;var keysAreAnArray=Array.isArray(keys);if(Tools.isPlainObject(keys)||keysAreAnArray&&keys.length)iterateGivenKeys=true;else{iterateGivenKeys=false;keys=firstItem}if(Array.isArray(keys)){var index=0;var _iteratorNormalCompletion56=true;var _didIteratorError56=false;var _iteratorError56=undefined;try{for(var _iterator56=keys[Symbol.iterator](),_step56;!(_iteratorNormalCompletion56=(_step56=_iterator56.next()).done);_iteratorNormalCompletion56=true){var _key43=_step56.value;if(intersectItem(firstItem,secondItem,index,_key43,keysAreAnArray,iterateGivenKeys)===false){exists=false;break}index+=1}}catch(err){_didIteratorError56=true;_iteratorError56=err}finally{try{if(!_iteratorNormalCompletion56&&_iterator56.return){_iterator56.return()}}finally{if(_didIteratorError56){throw _iteratorError56}}}}else for(var _key44 in keys){if(keys.hasOwnProperty(_key44))if(intersectItem(firstItem,secondItem,_key44,keys[_key44],keysAreAnArray,iterateGivenKeys)===false){exists=false;break}}if(exists){containingData.push(firstItem);break}}}catch(err){_didIteratorError55=true;_iteratorError55=err}finally{try{if(!_iteratorNormalCompletion55&&_iterator55.return){_iterator55.return()}}finally{if(_didIteratorError55){throw _iteratorError55}}}}else if(second.includes(firstItem))containingData.push(firstItem)}}catch(err){_didIteratorError54=true;_iteratorError54=err}finally{try{if(!_iteratorNormalCompletion54&&_iterator54.return){_iterator54.return()}}finally{if(_didIteratorError54){throw _iteratorError54}}}return containingData}/**
     * Creates a list of items within given range.
     * @param range - Array of lower and upper bounds. If only one value is
     * given lower bound will be assumed to be zero. Both integers have to be
     * positive and will be contained in the resulting array.
     * @param step - Space between two consecutive values.
     * @returns Produced array of integers.
     */},{key:'arrayMakeRange',value:function arrayMakeRange(range){var step=arguments.length>1&&arguments[1]!==undefined?arguments[1]:1;var index=void 0;var higherBound=void 0;if(range.length===1){index=0;higherBound=parseInt(range[0],10)}else if(range.length===2){index=parseInt(range[0],10);higherBound=parseInt(range[1],10)}else return range;var result=[index];while(index<=higherBound-step){index+=step;result.push(index)}return result}/**
     * Sums up given property of given item list.
     * @param data - The objects with specified property to sum up.
     * @param propertyName - Property name to sum up its value.
     * @returns The aggregated value.
     */},{key:'arraySumUpProperty',value:function arraySumUpProperty(data,propertyName){var result=0;if(Array.isArray(data)&&data.length){var _iteratorNormalCompletion57=true;var _didIteratorError57=false;var _iteratorError57=undefined;try{for(var _iterator57=data[Symbol.iterator](),_step57;!(_iteratorNormalCompletion57=(_step57=_iterator57.next()).done);_iteratorNormalCompletion57=true){var item=_step57.value;if(item.hasOwnProperty(propertyName))result+=parseFloat(item[propertyName]||0)}}catch(err){_didIteratorError57=true;_iteratorError57=err}finally{try{if(!_iteratorNormalCompletion57&&_iterator57.return){_iterator57.return()}}finally{if(_didIteratorError57){throw _iteratorError57}}}}return result}/**
     * Adds an item to another item as array connection (many to one).
     * @param item - Item where the item should be appended to.
     * @param target - Target to add to given item.
     * @param name - Name of the target connection.
     * @param checkIfExists - Indicates if duplicates are allowed in resulting
     * list (will result in linear runtime instead of constant one).
     * @returns Item with the appended target.
     */},{key:'arrayAppendAdd',value:function arrayAppendAdd(item,target,name){var checkIfExists=arguments.length>3&&arguments[3]!==undefined?arguments[3]:true;if(item.hasOwnProperty(name)){if(!(checkIfExists&&item[name].includes(target)))item[name].push(target)}else item[name]=[target];return item}/**
     * Removes given target on given list.
     * @param list - Array to splice.
     * @param target - Target to remove from given list.
     * @param strict - Indicates whether to fire an exception if given target
     * doesn't exists given list.
     * @returns Item with the appended target.
     */},{key:'arrayRemove',value:function arrayRemove(list,target){var strict=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(Array.isArray(list)){var index=list.indexOf(target);if(index===-1){if(strict)throw new Error('Given target doesn\'t exists in given list.')}else/* eslint-disable max-statements-per-line */list.splice(index,1);/* eslint-enable max-statements-per-line */}else if(strict)throw new Error('Given target isn\'t an array.');return list}/**
     * Sorts given object of dependencies in a topological order.
     * @param items - Items to sort.
     * @returns Sorted array of given items respecting their dependencies.
     */},{key:'arraySortTopological',value:function arraySortTopological(items){var edges=[];for(var _name5 in items){if(items.hasOwnProperty(_name5)){if(!Array.isArray(items[_name5]))items[_name5]=[items[_name5]];if(items[_name5].length>0){var _iteratorNormalCompletion58=true;var _didIteratorError58=false;var _iteratorError58=undefined;try{for(var _iterator58=Tools.arrayMake(items[_name5])[Symbol.iterator](),_step58;!(_iteratorNormalCompletion58=(_step58=_iterator58.next()).done);_iteratorNormalCompletion58=true){var dependencyName=_step58.value;edges.push([_name5,dependencyName])}}catch(err){_didIteratorError58=true;_iteratorError58=err}finally{try{if(!_iteratorNormalCompletion58&&_iterator58.return){_iterator58.return()}}finally{if(_didIteratorError58){throw _iteratorError58}}}}else edges.push([_name5])}}var nodes=[];// Accumulate unique nodes into a large list.
var _iteratorNormalCompletion59=true;var _didIteratorError59=false;var _iteratorError59=undefined;try{for(var _iterator59=edges[Symbol.iterator](),_step59;!(_iteratorNormalCompletion59=(_step59=_iterator59.next()).done);_iteratorNormalCompletion59=true){var edge=_step59.value;var _iteratorNormalCompletion62=true;var _didIteratorError62=false;var _iteratorError62=undefined;try{for(var _iterator62=edge[Symbol.iterator](),_step62;!(_iteratorNormalCompletion62=(_step62=_iterator62.next()).done);_iteratorNormalCompletion62=true){var _node=_step62.value;if(!nodes.includes(_node))nodes.push(_node)}}catch(err){_didIteratorError62=true;_iteratorError62=err}finally{try{if(!_iteratorNormalCompletion62&&_iterator62.return){_iterator62.return()}}finally{if(_didIteratorError62){throw _iteratorError62}}}}}catch(err){_didIteratorError59=true;_iteratorError59=err}finally{try{if(!_iteratorNormalCompletion59&&_iterator59.return){_iterator59.return()}}finally{if(_didIteratorError59){throw _iteratorError59}}}var sorted=[];// Define a visitor function that recursively traverses dependencies.
var visit=function visit(node,predecessors){// Check if a node is dependent of itself.
if(predecessors.length!==0&&predecessors.includes(node))throw new Error('Cyclic dependency found. "'+node+'" is dependent of '+'itself.\n'+('Dependency chain: "'+predecessors.join('" -> "')+'" => "')+(node+'".'));var index=nodes.indexOf(node);// If the node still exists, traverse its dependencies.
if(index!==-1){var copy=void 0;// Mark the node to exclude it from future iterations.
nodes[index]=null;/*
                    Loop through all edges and follow dependencies of the
                    current node
                */var _iteratorNormalCompletion60=true;var _didIteratorError60=false;var _iteratorError60=undefined;try{for(var _iterator60=edges[Symbol.iterator](),_step60;!(_iteratorNormalCompletion60=(_step60=_iterator60.next()).done);_iteratorNormalCompletion60=true){var _edge=_step60.value;if(_edge[0]===node){/*
                            Lazily create a copy of predecessors with the
                            current node concatenated onto it.
                        */copy=copy||predecessors.concat([node]);// Recurse to node dependencies.
visit(_edge[1],copy)}}}catch(err){_didIteratorError60=true;_iteratorError60=err}finally{try{if(!_iteratorNormalCompletion60&&_iterator60.return){_iterator60.return()}}finally{if(_didIteratorError60){throw _iteratorError60}}}sorted.push(node)}};for(var index=0;index<nodes.length;index++){var node=nodes[index];// Ignore nodes that have been excluded.
if(node){// Mark the node to exclude it from future iterations.
nodes[index]=null;/*
                    Loop through all edges and follow dependencies of the
                    current node.
                */var _iteratorNormalCompletion61=true;var _didIteratorError61=false;var _iteratorError61=undefined;try{for(var _iterator61=edges[Symbol.iterator](),_step61;!(_iteratorNormalCompletion61=(_step61=_iterator61.next()).done);_iteratorNormalCompletion61=true){var _edge2=_step61.value;if(_edge2[0]===node)// Recurse to node dependencies.
visit(_edge2[1],[node])}}catch(err){_didIteratorError61=true;_iteratorError61=err}finally{try{if(!_iteratorNormalCompletion61&&_iterator61.return){_iterator61.return()}}finally{if(_didIteratorError61){throw _iteratorError61}}}sorted.push(node)}}return sorted}// / endregion
// / region string
// // region url handling
/**
     * Translates given string into the regular expression validated
     * representation.
     * @param value - String to convert.
     * @param excludeSymbols - Symbols not to escape.
     * @returns Converted string.
     */},{key:'stringEscapeRegularExpressions',value:function stringEscapeRegularExpressions(value){var excludeSymbols=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];// NOTE: This is only for performance improvements.
if(value.length===1&&!Tools.specialRegexSequences.includes(value))return value;// The escape sequence must also be escaped; but at first.
if(!excludeSymbols.includes('\\'))value.replace(/\\/g,'\\\\');var _iteratorNormalCompletion63=true;var _didIteratorError63=false;var _iteratorError63=undefined;try{for(var _iterator63=Tools.specialRegexSequences[Symbol.iterator](),_step63;!(_iteratorNormalCompletion63=(_step63=_iterator63.next()).done);_iteratorNormalCompletion63=true){var _replace=_step63.value;if(!excludeSymbols.includes(_replace))value=value.replace(new RegExp('\\'+_replace,'g'),'\\'+_replace)}}catch(err){_didIteratorError63=true;_iteratorError63=err}finally{try{if(!_iteratorNormalCompletion63&&_iterator63.return){_iterator63.return()}}finally{if(_didIteratorError63){throw _iteratorError63}}}return value}/**
     * Translates given name into a valid javaScript one.
     * @param name - Name to convert.
     * @param allowedSymbols - String of symbols which should be allowed within
     * a variable name (not the first character).
     * @returns Converted name is returned.
     */},{key:'stringConvertToValidVariableName',value:function stringConvertToValidVariableName(name){var allowedSymbols=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'0-9a-zA-Z_$';return name.toString().replace(/^[^a-zA-Z_$]+/,'').replace(new RegExp('[^'+allowedSymbols+']+([a-zA-Z0-9])','g'),function(fullMatch,firstLetter){return firstLetter.toUpperCase()})}/**
     * This method is intended for encoding *key* or *value* parts of query
     * component. We need a custom method because "encodeURIComponent()" is too
     * aggressive and encodes stuff that doesn't have to be encoded per
     * "http://tools.ietf.org/html/rfc3986:".
     * @param url - URL to encode.
     * @param encodeSpaces - Indicates whether given url should encode
     * whitespaces as "+" or "%20".
     * @returns Encoded given url.
     */},{key:'stringEncodeURIComponent',value:function stringEncodeURIComponent(url,encodeSpaces){return encodeURIComponent(url).replace(/%40/gi,'@').replace(/%3A/gi,':').replace(/%24/g,'$').replace(/%2C/gi,',').replace(/%20/g,encodeSpaces?'%20':'+')}/**
     * Appends a path selector to the given path if there isn't one yet.
     * @param path - The path for appending a selector.
     * @param pathSeparator - The selector for appending to path.
     * @returns The appended path.
     */},{key:'stringAddSeparatorToPath',value:function stringAddSeparatorToPath(path){var pathSeparator=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'/';path=path.trim();if(path.substr(-1)!==pathSeparator&&path.length)return path+pathSeparator;return path}/**
     * Checks if given path has given path prefix.
     * @param prefix - Path prefix to search for.
     * @param path - Path to search in.
     * @param separator - Delimiter to use in path (default is the posix
     * conform slash).
     * @returns Value "true" if given prefix occur and "false" otherwise.
     */},{key:'stringHasPathPrefix',value:function stringHasPathPrefix(){var prefix=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'/admin';var path=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'location'in $.global&&$.global.location.pathname||'';var separator=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'/';if(typeof prefix==='string'){if(!prefix.endsWith(separator))prefix+=separator;return path===prefix.substring(0,prefix.length-separator.length)||path.startsWith(prefix)}return false}/**
     * Extracts domain name from given url. If no explicit domain name given
     * current domain name will be assumed. If no parameter given current
     * domain name will be determined.
     * @param url - The url to extract domain from.
     * @param fallback - The fallback host name if no one exits in given url
     * (default is current hostname).
     * @returns Extracted domain.
     */},{key:'stringGetDomainName',value:function stringGetDomainName(){var url=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'location'in $.global&&$.global.location.href||'';var fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'location'in $.global&&$.global.location.hostname||'';var result=/^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url);if(result&&result.length>2&&result[1]&&result[2])return result[2];return fallback}/**
     * Extracts port number from given url. If no explicit port number given
     * and no fallback is defined current port number will be assumed for local
     * links. For external links 80 will be assumed for http protocol or 443
     * for https.
     * @param url - The url to extract port from.
     * @param fallback - Fallback port number if no explicit one was found.
     * Default is derived from current protocol name.
     * @param parameter - Additional parameter for checking if given url is an
     * internal url. Given url and this parameter will be forwarded to the
     * "stringIsInternalURL()" method.
     * @returns Extracted port number.
     */},{key:'stringGetPortNumber',value:function stringGetPortNumber(){var url=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'location'in $.global&&$.global.location.href||'';var fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var parameter=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var result=/^(?:[a-z]*:?\/\/[^/]+?)?(?:[^/]+?):([0-9]+)/i.exec(url);if(result&&result.length>1)return parseInt(result[1],10);if(fallback!==null)return fallback;if(Tools.stringIsInternalURL.apply(Tools,[url].concat(_toConsumableArray(parameter)))&&'location'in $.global&&$.global.location.port&&parseInt($.global.location.port,10))return parseInt($.global.location.port,10);return Tools.stringGetProtocolName(url)==='https'?443:80}/**
     * Extracts protocol name from given url. If no explicit url is given,
     * current protocol will be assumed. If no parameter given current protocol
     * number will be determined.
     * @param url - The url to extract protocol from.
     * @param fallback - Fallback port to use if no protocol exists in given
     * url (default is current protocol).
     * returns Extracted protocol.
     */},{key:'stringGetProtocolName',value:function stringGetProtocolName(){var url=arguments.length>0&&arguments[0]!==undefined?arguments[0]:'location'in $.global&&$.global.location.href||'';var fallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'location'in $.global&&$.global.location.protocol.substring(0,$.global.location.protocol.length-1)||'';var result=/^([a-z]+):\/\//i.exec(url);if(result&&result.length>1&&result[1])return result[1];return fallback}/**
     * Read a page's GET URL variables and return them as an associative array
     * and preserves ordering.
     * @param keyToGet - If key given the corresponding value is returned and
     * full object otherwise.
     * @param givenInput - An alternative input to the url search parameter. If
     * "#" is given the complete current hash tag will be interpreted as url
     * and search parameter will be extracted from there. If "&" is given
     * classical search parameter and hash parameter will be taken in account.
     * If a search string is given this will be analyzed. The default is to
     * take given search part into account.
     * @param subDelimiter - Defines which sequence indicates the start of
     * parameter in a hash part of the url.
     * @param hashedPathIndicator - If defined and given hash starts with this
     * indicator given hash will be interpreted as path containing search and
     * hash parts.
     * @param givenSearch - Search part to take into account defaults to
     * current url search part.
     * @param givenHash - Hash part to take into account defaults to current
     * url hash part.
     * @returns Returns the current get array or requested value. If requested
     * key doesn't exist "undefined" is returned.
     */},{key:'stringGetURLVariable',value:function stringGetURLVariable(keyToGet,givenInput){var subDelimiter=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'$';var hashedPathIndicator=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'!';var givenSearch=arguments[4];var givenHash=arguments.length>5&&arguments[5]!==undefined?arguments[5]:'location'in $.global&&$.global.location.hash||'';// region set search and hash
var hash=givenHash?givenHash:'#';var search='';if(givenSearch)search=givenSearch;else if(hashedPathIndicator&&hash.startsWith(hashedPathIndicator)){var subHashStartIndex=hash.indexOf('#');var pathAndSearch=void 0;if(subHashStartIndex===-1){pathAndSearch=hash.substring(hashedPathIndicator.length);hash=''}else{pathAndSearch=hash.substring(hashedPathIndicator.length,subHashStartIndex);hash=hash.substring(subHashStartIndex)}var subSearchStartIndex=pathAndSearch.indexOf('?');if(subSearchStartIndex!==-1)search=pathAndSearch.substring(subSearchStartIndex)}else if('location'in $.global)search=$.global.location.search||'';var input=givenInput?givenInput:search;// endregion
// region determine data from search and hash if specified
var both=input==='&';if(both||input==='#'){var decodedHash='';try{decodedHash=decodeURIComponent(hash)}catch(error){}var subDelimiterIndex=decodedHash.indexOf(subDelimiter);if(subDelimiterIndex===-1)input='';else{input=decodedHash.substring(subDelimiterIndex);if(input.startsWith(subDelimiter))input=input.substring(subDelimiter.length)}}else if(input.startsWith('?'))input=input.substring('?'.length);var data=input?input.split('&'):[];search=search.substring('?'.length);if(both&&search)data=data.concat(search.split('&'));// endregion
// region construct data structure
var variables=[];var _iteratorNormalCompletion64=true;var _didIteratorError64=false;var _iteratorError64=undefined;try{for(var _iterator64=data[Symbol.iterator](),_step64;!(_iteratorNormalCompletion64=(_step64=_iterator64.next()).done);_iteratorNormalCompletion64=true){var _value30=_step64.value;var keyValuePair=_value30.split('=');var _key45=void 0;try{_key45=decodeURIComponent(keyValuePair[0])}catch(error){_key45=''}try{_value30=decodeURIComponent(keyValuePair[1])}catch(error){_value30=''}variables.push(_key45);// IgnoreTypeCheck
variables[_key45]=_value30}// endregion
}catch(err){_didIteratorError64=true;_iteratorError64=err}finally{try{if(!_iteratorNormalCompletion64&&_iterator64.return){_iterator64.return()}}finally{if(_didIteratorError64){throw _iteratorError64}}}if(keyToGet)// IgnoreTypeCheck
return variables[keyToGet];return variables}/**
     * Checks if given url points to another domain than second given url. If
     * no second given url provided current url will be assumed.
     * @param firstURL - URL to check against second url.
     * @param secondURL - URL to check against first url.
     * @returns Returns "true" if given first url has same domain as given
     * second (or current).
     */},{key:'stringIsInternalURL',value:function stringIsInternalURL(firstURL){var secondURL=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'location'in $.global&&$.global.location.href||'';var explicitDomainName=Tools.stringGetDomainName(firstURL,false);var explicitProtocolName=Tools.stringGetProtocolName(firstURL,false);var explicitPortNumber=Tools.stringGetPortNumber(firstURL,false);return(!explicitDomainName||explicitDomainName===Tools.stringGetDomainName(secondURL))&&(!explicitProtocolName||explicitProtocolName===Tools.stringGetProtocolName(secondURL))&&(!explicitPortNumber||explicitPortNumber===Tools.stringGetPortNumber(secondURL))}/**
     * Normalized given website url.
     * @param url - Uniform resource locator to normalize.
     * @returns Normalized result.
     */},{key:'stringNormalizeURL',value:function stringNormalizeURL(url){if(url){url=url.replace(/^:?\/+/,'').replace(/\/+$/,'').trim();if(url.startsWith('http'))return url;return'http://'+url}return''}/**
     * Represents given website url.
     * @param url - Uniform resource locator to represent.
     * @returns Represented result.
     */},{key:'stringRepresentURL',value:function stringRepresentURL(url){if(typeof url==='string')return url.replace(/^(https?)?:?\/+/,'').replace(/\/+$/,'').trim();return''}// // endregion
/**
     * Compresses given style attribute value.
     * @param styleValue - Style value to compress.
     * @returns The compressed value.
     */},{key:'stringCompressStyleValue',value:function stringCompressStyleValue(styleValue){return styleValue.replace(/ *([:;]) */g,'$1').replace(/ +/g,' ').replace(/^;+/,'').replace(/;+$/,'').trim()}/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * Converts a camel cased string to its delimited string version.
     * @param string - The string to format.
     * @param delimiter - Delimiter string
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @returns The formatted string.
     */},{key:'stringCamelCaseToDelimited',value:function stringCamelCaseToDelimited(string){var delimiter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'-';var abbreviations=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;/* eslint-enable jsdoc/require-description-complete-sentence */if(!abbreviations)abbreviations=Tools.abbreviations;var escapedDelimiter=Tools.stringGetRegularExpressionValidated(delimiter);if(abbreviations.length){var abbreviationPattern='';var _iteratorNormalCompletion65=true;var _didIteratorError65=false;var _iteratorError65=undefined;try{for(var _iterator65=abbreviations[Symbol.iterator](),_step65;!(_iteratorNormalCompletion65=(_step65=_iterator65.next()).done);_iteratorNormalCompletion65=true){var abbreviation=_step65.value;if(abbreviationPattern)abbreviationPattern+='|';abbreviationPattern+=abbreviation.toUpperCase()}}catch(err){_didIteratorError65=true;_iteratorError65=err}finally{try{if(!_iteratorNormalCompletion65&&_iterator65.return){_iterator65.return()}}finally{if(_didIteratorError65){throw _iteratorError65}}}string=string.replace(new RegExp('('+abbreviationPattern+')('+abbreviationPattern+')','g'),'$1'+delimiter+'$2')}string=string.replace(new RegExp('([^'+escapedDelimiter+'])([A-Z][a-z]+)','g'),'$1'+delimiter+'$2');return string.replace(new RegExp('([a-z0-9])([A-Z])','g'),'$1'+delimiter+'$2').toLowerCase()}/* eslint-disable jsdoc/require-description-complete-sentence *//**
     * Converts a string to its capitalize representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */},{key:'stringCapitalize',value:function stringCapitalize(string){/* eslint-enable jsdoc/require-description-complete-sentence */return string.charAt(0).toUpperCase()+string.substring(1)}/**
     * Converts a delimited string to its camel case representation.
     * @param string - The string to format.
     * @param delimiter - Delimiter string to use.
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
     * formatted camel case abbreviations will be ignored.
     * @param removeMultipleDelimiter - Indicates whether a series of delimiter
     * should be consolidated.
     * @returns The formatted string.
     */},{key:'stringDelimitedToCamelCase',value:function stringDelimitedToCamelCase(string){var delimiter=arguments.length>1&&arguments[1]!==undefined?arguments[1]:'-';var abbreviations=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var preserveWrongFormattedAbbreviations=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var removeMultipleDelimiter=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;var escapedDelimiter=Tools.stringGetRegularExpressionValidated(delimiter);if(!abbreviations)abbreviations=Tools.abbreviations;var abbreviationPattern=void 0;if(preserveWrongFormattedAbbreviations)abbreviationPattern=abbreviations.join('|');else{abbreviationPattern='';var _iteratorNormalCompletion66=true;var _didIteratorError66=false;var _iteratorError66=undefined;try{for(var _iterator66=abbreviations[Symbol.iterator](),_step66;!(_iteratorNormalCompletion66=(_step66=_iterator66.next()).done);_iteratorNormalCompletion66=true){var abbreviation=_step66.value;if(abbreviationPattern)abbreviationPattern+='|';abbreviationPattern+=Tools.stringCapitalize(abbreviation)+'|'+abbreviation}}catch(err){_didIteratorError66=true;_iteratorError66=err}finally{try{if(!_iteratorNormalCompletion66&&_iterator66.return){_iterator66.return()}}finally{if(_didIteratorError66){throw _iteratorError66}}}}var stringStartsWithDelimiter=false;if(string.startsWith(delimiter)){string=string.substring(delimiter.length);stringStartsWithDelimiter=true}string=string.replace(new RegExp('('+escapedDelimiter+')('+abbreviationPattern+')'+('('+escapedDelimiter+'|$)'),'g'),function(fullMatch,before,abbreviation,after){return before+abbreviation.toUpperCase()+after});if(removeMultipleDelimiter)escapedDelimiter='(?:'+escapedDelimiter+')+';string=string.replace(new RegExp(escapedDelimiter+'([a-zA-Z0-9])','g'),function(fullMatch,firstLetter){return firstLetter.toUpperCase()});if(stringStartsWithDelimiter)string=delimiter+string;return string}/**
     * Performs a string formation. Replaces every placeholder "{i}" with the
     * i'th argument.
     * @param string - The string to format.
     * @param additionalArguments - Additional arguments are interpreted as
     * replacements for string formating.
     * @returns The formatted string.
     */},{key:'stringFormat',value:function stringFormat(string){for(var _len16=arguments.length,additionalArguments=Array(_len16>1?_len16-1:0),_key46=1;_key46<_len16;_key46++){additionalArguments[_key46-1]=arguments[_key46]}additionalArguments.unshift(string);var index=0;var _iteratorNormalCompletion67=true;var _didIteratorError67=false;var _iteratorError67=undefined;try{for(var _iterator67=additionalArguments[Symbol.iterator](),_step67;!(_iteratorNormalCompletion67=(_step67=_iterator67.next()).done);_iteratorNormalCompletion67=true){var _value31=_step67.value;string=string.replace(new RegExp('\\{'+index+'\\}','gm'),''+_value31);index+=1}}catch(err){_didIteratorError67=true;_iteratorError67=err}finally{try{if(!_iteratorNormalCompletion67&&_iterator67.return){_iterator67.return()}}finally{if(_didIteratorError67){throw _iteratorError67}}}return string}/**
     * Validates the current string for using in a regular expression pattern.
     * Special regular expression chars will be escaped.
     * @param string - The string to format.
     * @returns The formatted string.
     */},{key:'stringGetRegularExpressionValidated',value:function stringGetRegularExpressionValidated(string){return string.replace(/([\\|.*$^+[\]()?\-{}])/g,'\\$1')}/**
     * Converts a string to its lower case representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */},{key:'stringLowerCase',value:function stringLowerCase(string){return string.charAt(0).toLowerCase()+string.substring(1)}/**
     * Finds the string match of given query in given target text by applying
     * given normalisation function to target and query.
     * @param target - Target to search in.
     * @param query - Search string to search for.
     * @param normalizer - Function to use as normalisation for queries and
     * search targets.
     */},{key:'stringFindNormalizedMatchRange',value:function stringFindNormalizedMatchRange(target,query){var normalizer=arguments.length>2&&arguments[2]!==undefined?arguments[2]:function(value){return(''+value).toLowerCase()};query=normalizer(query);if(normalizer(target)&&query)for(var index=0;index<target.length;index+=1){if(normalizer(target.substring(index)).startsWith(query)){if(query.length===1)return[index,index+1];for(var subIndex=target.length;subIndex>index;subIndex-=1){if(!normalizer(target.substring(index,subIndex)).startsWith(query))return[index,subIndex+1]}}}return null}/**
     * Wraps given mark strings in given target with given marker.
     * @param target - String to search for marker.
     * @param words - String or array of strings to search in target for.
     * @param marker - HTML template string to mark.
     * @param normalizer - Pure normalisation function to use before searching
     * for matches.
     * @returns Processed result.
     */},{key:'stringMark',value:function stringMark(target,words){var marker=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'<span class="tools-mark">{1}</span>';var normalizer=arguments.length>3&&arguments[3]!==undefined?arguments[3]:function(value){return(''+value).toLowerCase()};if(target&&words&&words.length){target=target.trim();if(!Array.isArray(words))words=[words];var index=0;var _iteratorNormalCompletion68=true;var _didIteratorError68=false;var _iteratorError68=undefined;try{for(var _iterator68=words[Symbol.iterator](),_step68;!(_iteratorNormalCompletion68=(_step68=_iterator68.next()).done);_iteratorNormalCompletion68=true){var word=_step68.value;words[index]=normalizer(word).trim();index+=1}}catch(err){_didIteratorError68=true;_iteratorError68=err}finally{try{if(!_iteratorNormalCompletion68&&_iterator68.return){_iterator68.return()}}finally{if(_didIteratorError68){throw _iteratorError68}}}var restTarget=target;var offset=0;while(true){var nearestRange=void 0;var currentRange=void 0;var _iteratorNormalCompletion69=true;var _didIteratorError69=false;var _iteratorError69=undefined;try{for(var _iterator69=words[Symbol.iterator](),_step69;!(_iteratorNormalCompletion69=(_step69=_iterator69.next()).done);_iteratorNormalCompletion69=true){var _word=_step69.value;currentRange=Tools.stringFindNormalizedMatchRange(restTarget,_word,normalizer);if(currentRange&&(!nearestRange||currentRange[0]<nearestRange[0]))nearestRange=currentRange}}catch(err){_didIteratorError69=true;_iteratorError69=err}finally{try{if(!_iteratorNormalCompletion69&&_iterator69.return){_iterator69.return()}}finally{if(_didIteratorError69){throw _iteratorError69}}}if(nearestRange){target=target.substring(0,offset+nearestRange[0])+Tools.stringFormat(marker,target.substring(offset+nearestRange[0],offset+nearestRange[1]))+target.substring(offset+nearestRange[1]);offset+=nearestRange[1]+(marker.length-'{1}'.length);if(target.length<=offset)break;restTarget=target.substring(offset)}else break}}return target}/**
     * Implements the md5 hash algorithm.
     * @param value - Value to calculate md5 hash for.
     * @param onlyAscii - Set to true if given input has ascii characters only
     * to get more performance.
     * @returns Calculated md5 hash value.
     */},{key:'stringMD5',value:function stringMD5(value){var onlyAscii=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var hexCharacters='0123456789abcdef'.split('');// region sub helper
/**
         * This function is much faster, so if possible we use it. Some IEs
         * are the only ones I know of that need the idiotic second function,
         * generated by an if clause in the end.
         * @param first - First operand to add.
         * @param second - Second operant to add.
         * @returns The sum of both given operands.
        */var unsignedModule2PowerOf32Addition=function unsignedModule2PowerOf32Addition(first,second){return first+second&4294967295};// / region primary functions needed for the algorithm
/*
         * Implements the basic operation for each round of the algorithm.
         */var cmn=function cmn(q,a,b,x,s,t){a=unsignedModule2PowerOf32Addition(unsignedModule2PowerOf32Addition(a,q),unsignedModule2PowerOf32Addition(x,t));return unsignedModule2PowerOf32Addition(a<<s|a>>>32-s,b)};/**
         * First algorithm part.
         * @param a - Operand.
         * @param b - Operand.
         * @param c - Operand.
         * @param d - Operand.
         * @param x - Operand.
         * @param s - Operand.
         * @param t - Operand.
         * @returns Result.
         */var ff=function ff(a,b,c,d,x,s,t){return cmn(b&c|~b&d,a,b,x,s,t)};/**
         * Second algorithm part.
         * @param a - Operand.
         * @param b - Operand.
         * @param c - Operand.
         * @param d - Operand.
         * @param x - Operand.
         * @param s - Operand.
         * @param t - Operand.
         * @returns Result.
         */var gg=function gg(a,b,c,d,x,s,t){return cmn(b&d|c&~d,a,b,x,s,t)};/**
         * Third algorithm part.
         * @param a - Operand.
         * @param b - Operand.
         * @param c - Operand.
         * @param d - Operand.
         * @param x - Operand.
         * @param s - Operand.
         * @param t - Operand.
         * @returns Result.
         */var hh=function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)};/**
         * Fourth algorithm part.
         * @param a - Operand.
         * @param b - Operand.
         * @param c - Operand.
         * @param d - Operand.
         * @param x - Operand.
         * @param s - Operand.
         * @param t - Operand.
         * @returns Result.
         */var ii=function ii(a,b,c,d,x,s,t){return cmn(c^(b|~d),a,b,x,s,t)};/**
         * Performs all 16 needed steps.
         * @param state - Current state.
         * @param blocks - Blocks to cycle through.
         * @returns Returns given state.
         */var cycle=function cycle(state,blocks){var a=state[0];var b=state[1];var c=state[2];var d=state[3];// region round 1
a=ff(a,b,c,d,blocks[0],7,-680876936);d=ff(d,a,b,c,blocks[1],12,-389564586);c=ff(c,d,a,b,blocks[2],17,606105819);b=ff(b,c,d,a,blocks[3],22,-1044525330);a=ff(a,b,c,d,blocks[4],7,-176418897);d=ff(d,a,b,c,blocks[5],12,1200080426);c=ff(c,d,a,b,blocks[6],17,-1473231341);b=ff(b,c,d,a,blocks[7],22,-45705983);a=ff(a,b,c,d,blocks[8],7,1770035416);d=ff(d,a,b,c,blocks[9],12,-1958414417);c=ff(c,d,a,b,blocks[10],17,-42063);b=ff(b,c,d,a,blocks[11],22,-1990404162);a=ff(a,b,c,d,blocks[12],7,1804603682);d=ff(d,a,b,c,blocks[13],12,-40341101);c=ff(c,d,a,b,blocks[14],17,-1502002290);b=ff(b,c,d,a,blocks[15],22,1236535329);// endregion
// region round 2
a=gg(a,b,c,d,blocks[1],5,-165796510);d=gg(d,a,b,c,blocks[6],9,-1069501632);c=gg(c,d,a,b,blocks[11],14,643717713);b=gg(b,c,d,a,blocks[0],20,-373897302);a=gg(a,b,c,d,blocks[5],5,-701558691);d=gg(d,a,b,c,blocks[10],9,38016083);c=gg(c,d,a,b,blocks[15],14,-660478335);b=gg(b,c,d,a,blocks[4],20,-405537848);a=gg(a,b,c,d,blocks[9],5,568446438);d=gg(d,a,b,c,blocks[14],9,-1019803690);c=gg(c,d,a,b,blocks[3],14,-187363961);b=gg(b,c,d,a,blocks[8],20,1163531501);a=gg(a,b,c,d,blocks[13],5,-1444681467);d=gg(d,a,b,c,blocks[2],9,-51403784);c=gg(c,d,a,b,blocks[7],14,1735328473);b=gg(b,c,d,a,blocks[12],20,-1926607734);// endregion
// region round 3
a=hh(a,b,c,d,blocks[5],4,-378558);d=hh(d,a,b,c,blocks[8],11,-2022574463);c=hh(c,d,a,b,blocks[11],16,1839030562);b=hh(b,c,d,a,blocks[14],23,-35309556);a=hh(a,b,c,d,blocks[1],4,-1530992060);d=hh(d,a,b,c,blocks[4],11,1272893353);c=hh(c,d,a,b,blocks[7],16,-155497632);b=hh(b,c,d,a,blocks[10],23,-1094730640);a=hh(a,b,c,d,blocks[13],4,681279174);d=hh(d,a,b,c,blocks[0],11,-358537222);c=hh(c,d,a,b,blocks[3],16,-722521979);b=hh(b,c,d,a,blocks[6],23,76029189);a=hh(a,b,c,d,blocks[9],4,-640364487);d=hh(d,a,b,c,blocks[12],11,-421815835);c=hh(c,d,a,b,blocks[15],16,530742520);b=hh(b,c,d,a,blocks[2],23,-995338651);// endregion
// region round 4
a=ii(a,b,c,d,blocks[0],6,-198630844);d=ii(d,a,b,c,blocks[7],10,1126891415);c=ii(c,d,a,b,blocks[14],15,-1416354905);b=ii(b,c,d,a,blocks[5],21,-57434055);a=ii(a,b,c,d,blocks[12],6,1700485571);d=ii(d,a,b,c,blocks[3],10,-1894986606);c=ii(c,d,a,b,blocks[10],15,-1051523);b=ii(b,c,d,a,blocks[1],21,-2054922799);a=ii(a,b,c,d,blocks[8],6,1873313359);d=ii(d,a,b,c,blocks[15],10,-30611744);c=ii(c,d,a,b,blocks[6],15,-1560198380);b=ii(b,c,d,a,blocks[13],21,1309151649);a=ii(a,b,c,d,blocks[4],6,-145523070);d=ii(d,a,b,c,blocks[11],10,-1120210379);c=ii(c,d,a,b,blocks[2],15,718787259);b=ii(b,c,d,a,blocks[9],21,-343485551);// endregion
state[0]=unsignedModule2PowerOf32Addition(a,state[0]);state[1]=unsignedModule2PowerOf32Addition(b,state[1]);state[2]=unsignedModule2PowerOf32Addition(c,state[2]);state[3]=unsignedModule2PowerOf32Addition(d,state[3]);return state};// / endregion
/**
         * Converts given character to its corresponding hex code
         * representation.
         * @param character - Character to convert.
         * @returns Converted hex code string.
         */var convertCharactorToHexCode=function convertCharactorToHexCode(character){var hexString='';for(var round=0;round<4;round++){hexString+=hexCharacters[character>>round*8+4&15]+hexCharacters[character>>round*8&15]}return hexString};/**
         * Converts given byte array to its corresponding hex code as string.
         * @param value - Array of characters to convert.
         * @returns Converted hex code.
         */var convertToHexCode=function convertToHexCode(value){for(var index=0;index<value.length;index++){value[index]=convertCharactorToHexCode(value[index])}return value.join('')};/**
         * There needs to be support for unicode here, unless we pretend that
         * we can redefine the md5 algorithm for multi-byte characters
         * (perhaps by adding every four 16-bit characters and shortening the
         * sum to 32 bits). Otherwise I suggest performing md5 as if every
         * character was two bytes--e.g., 0040 0025 = @%--but then how will an
         * ordinary md5 sum be matched? There is no way to standardize text
         * to something like utf-8 before transformation; speed cost is
         * utterly prohibitive. The JavaScript standard itself needs to look
         * at this: it should start providing access to strings as preformed
         * utf-8 8-bit unsigned value arrays.
         * @param value - Value to process with each block.
         * @returns Converted byte array.
         */var handleBlock=function handleBlock(value){var blocks=[];for(var blockNumber=0;blockNumber<64;blockNumber+=4){blocks[blockNumber>>2]=value.charCodeAt(blockNumber)+(value.charCodeAt(blockNumber+1)<<8)+(value.charCodeAt(blockNumber+2)<<16)+(value.charCodeAt(blockNumber+3)<<24)}return blocks};// endregion
/**
         * Triggers the main algorithm to calculate the md5 representation of
         * given value.
         * @param value - String to convert to its md5 representation.
         * @returns Array of blocks.
         */var main=function main(value){var length=value.length;var state=[1732584193,-271733879,-1732584194,271733878];var blockNumber=void 0;for(blockNumber=64;blockNumber<=value.length;blockNumber+=64){cycle(state,handleBlock(value.substring(blockNumber-64,blockNumber)))}value=value.substring(blockNumber-64);var tail=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(blockNumber=0;blockNumber<value.length;blockNumber++){tail[blockNumber>>2]|=value.charCodeAt(blockNumber)<<(blockNumber%4<<3)}tail[blockNumber>>2]|=128<<(blockNumber%4<<3);if(blockNumber>55){cycle(state,tail);for(var index=0;index<16;index++){tail[index]=0}}tail[14]=length*8;cycle(state,tail);return state};// region final call
if(convertToHexCode(main('hello'))!=='5d41402abc4b2a76b9719d911017c592')/**
             * This function is much faster, so if possible we use it. Some IEs
             * are the only ones I know of that need the idiotic second
             * function, generated by an if clause in the end.
             * @private
             * @param first - First operand to add.
             * @param second - Second operant to add.
             * @returns The sum of both given operands.
            */unsignedModule2PowerOf32Addition=function unsignedModule2PowerOf32Addition(first,second){var lsw=(first&65535)+(second&65535);var msw=(first>>16)+(second>>16)+(lsw>>16);return msw<<16|lsw&65535};return convertToHexCode(main(onlyAscii?value:unescape(encodeURIComponent(value))));// endregion
}/**
     * Normalizes given phone number for automatic dialing mechanisms.
     * @param phoneNumber - Number to normalize.
     * @returns Normalized number.
     */},{key:'stringNormalizePhoneNumber',value:function stringNormalizePhoneNumber(phoneNumber){if(typeof phoneNumber==='string'||typeof phoneNumber==='number')return(''+phoneNumber).replace(/[^0-9]*\+/,'00').replace(/[^0-9]+/g,'');return''}/**
     * Converts given serialized, base64 encoded or file path given object into
     * a native javaScript one if possible.
     * @param serializedObject - Object as string.
     * @param scope - An optional scope which will be used to evaluate given
     * object in.
     * @param name - The name under given scope will be available.
     * @returns The parsed object if possible and null otherwise.
     */},{key:'stringParseEncodedObject',value:function stringParseEncodedObject(serializedObject){var scope=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var name=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'scope';if(serializedObject.endsWith('.json')&&Tools.isFileSync(serializedObject))serializedObject=fileSystem.readFileSync(serializedObject,{encoding:'utf-8'});serializedObject=serializedObject.trim();if(!serializedObject.startsWith('{'))serializedObject=eval('Buffer').from(serializedObject,'base64').toString('utf8');var result=void 0;try{// IgnoreTypeCheck
result=new Function(name,'return '+serializedObject)(scope)}catch(error){}if((typeof result==='undefined'?'undefined':_typeof(result))==='object')return result;return null}/**
     * Represents given phone number. NOTE: Currently only support german phone
     * numbers.
     * @param phoneNumber - Number to format.
     * @returns Formatted number.
     */},{key:'stringRepresentPhoneNumber',value:function stringRepresentPhoneNumber(phoneNumber){if(['number','string'].includes(Tools.determineType(phoneNumber))&&phoneNumber){// Represent country code and leading area code zero.
phoneNumber=(''+phoneNumber).replace(/^(00|\+)([0-9]+)-([0-9-]+)$/,'+$2 (0) $3');// Add German country code if not exists.
phoneNumber=phoneNumber.replace(/^0([1-9][0-9-]+)$/,'+49 (0) $1');// Separate area code from base number.
phoneNumber=phoneNumber.replace(/^([^-]+)-([0-9-]+)$/,'$1 / $2');// Partition base number in one triple and tuples or tuples only.
return phoneNumber.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/,function(match,prefix,number,suffix){return prefix+(number.length%2===0?number.replace(/([0-9]{2})/g,'$1 '):number.replace(/^([0-9]{3})([0-9]+)$/,function(match,triple,rest){return triple+' '+rest.replace(/([0-9]{2})/g,'$1 ').trim()})+suffix).trim()}).trim()}return''}/**
     * Decodes all html symbols in text nodes in given html string.
     * @param htmlString - HTML string to decode.
     * @returns Decoded html string.
     */},{key:'stringDecodeHTMLEntities',value:function stringDecodeHTMLEntities(htmlString){if('document'in $.global){var textareaDomNode=$.global.document.createElement('textarea');textareaDomNode.innerHTML=htmlString;return textareaDomNode.value}return null}},{key:'numberGetUTCTimestamp',value:function numberGetUTCTimestamp(value){var inMilliseconds=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var date=[undefined,null].includes(value)?new Date:new Date(value);return Date.UTC(date.getUTCFullYear(),date.getUTCMonth(),date.getUTCDate(),date.getUTCHours(),date.getUTCMinutes(),date.getUTCSeconds(),date.getUTCMilliseconds())/(inMilliseconds?1:1000)}/**
     * Checks if given object is java scripts native "Number.NaN" object.
     * @param object - Object to Check.
     * @returns Returns whether given value is not a number or not.
     */},{key:'numberIsNotANumber',value:function numberIsNotANumber(object){return Tools.determineType(object)==='number'&&isNaN(object)}/**
     * Rounds a given number accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     * @returns Returns the rounded number.
     */},{key:'numberRound',value:function numberRound(number){var digits=arguments.length>1&&arguments[1]!==undefined?arguments[1]:0;return Math.round(number*Math.pow(10,digits))/Math.pow(10,digits)}// / endregion
// / region data transfer
/**
     * Checks if given url response with given status code.
     * @param url - Url to check reachability.
     * @param wait - Boolean indicating if we should retry until a status code
     * will be given.
     * @param expectedStatusCodes - Status codes to check for.
     * @param timeoutInSeconds - Delay after assuming given resource isn't
     * available if no response is coming.
     * @param pollIntervallInSeconds - Seconds between two tries to reach given
     * url.
     * @param options - Fetch options to use.
     * @returns A promise which will be resolved if a request to given url has
     * finished and resulting status code matches given expectedstatus code.
     * Otherwise returned promise will be rejected.
     */},{key:'checkReachability',value:function(){var _ref26=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee8(url){var wait=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var expectedStatusCodes=arguments.length>2&&arguments[2]!==undefined?arguments[2]:200;var timeoutInSeconds=arguments.length>3&&arguments[3]!==undefined?arguments[3]:10;var _this5=this;var pollIntervallInSeconds=arguments.length>4&&arguments[4]!==undefined?arguments[4]:0.1;var options=arguments.length>5&&arguments[5]!==undefined?arguments[5]:{};var check;return regeneratorRuntime.wrap(function _callee8$(_context8){while(1){switch(_context8.prev=_context8.next){case 0:expectedStatusCodes=[].concat(expectedStatusCodes);check=function check(response){if(response&&'status'in response&&// IgnoreTypeCheck
!expectedStatusCodes.includes(response.status))throw new Error('Given status code '+response.status+' differs from '+(// IgnoreTypeCheck
expectedStatusCodes.join(', ')+'.'));return response};if(!wait){_context8.next=4;break}return _context8.abrupt('return',new Promise(function(){var _ref27=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee7(resolve,reject){var timedOut,wrapper,currentlyRunningTimer,timer;return regeneratorRuntime.wrap(function _callee7$(_context7){while(1){switch(_context7.prev=_context7.next){case 0:timedOut=false;wrapper=function(){var _ref28=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee6(){var response;return regeneratorRuntime.wrap(function _callee6$(_context6){while(1){switch(_context6.prev=_context6.next){case 0:response=void 0;_context6.prev=1;_context6.next=4;return fetch(url,options);case 4:response=_context6.sent;_context6.next=11;break;case 7:_context6.prev=7;_context6.t0=_context6['catch'](1);if(!timedOut){/* eslint-disable no-use-before-define */currentlyRunningTimer=Tools.timeout(pollIntervallInSeconds*1000,wrapper);/* eslint-enable no-use-before-define *//*
                                NOTE: A timer rejection is expected. Avoid
                                throwing errors about unhandled promise
                                rejections.
                            */currentlyRunningTimer.catch(Tools.noop)}return _context6.abrupt('return',_context6.t0);case 11:try{resolve(check(response))}catch(error){reject(error)}finally{/* eslint-disable no-use-before-define */// IgnoreTypeCheck
timer.clear();/* eslint-enable no-use-before-define */}return _context6.abrupt('return',response);case 13:case'end':return _context6.stop();}}},_callee6,_this5,[[1,7]])}));return function wrapper(){return _ref28.apply(this,arguments)}}();currentlyRunningTimer=Tools.timeout(0,wrapper);timer=Tools.timeout(timeoutInSeconds*1000);_context7.prev=4;_context7.next=7;return timer;case 7:_context7.next=11;break;case 9:_context7.prev=9;_context7.t0=_context7['catch'](4);case 11:timedOut=true;// IgnoreTypeCheck
currentlyRunningTimer.clear();reject('Timeout of '+timeoutInSeconds+' seconds reached.');case 14:case'end':return _context7.stop();}}},_callee7,_this5,[[4,9]])}));return function(_x115,_x116){return _ref27.apply(this,arguments)}}()));case 4:_context8.t0=check;_context8.next=7;return fetch(url,options);case 7:_context8.t1=_context8.sent;return _context8.abrupt('return',(0,_context8.t0)(_context8.t1));case 9:case'end':return _context8.stop();}}},_callee8,this)}));function checkReachability(_x109){return _ref26.apply(this,arguments)}return checkReachability}()/**
     * Checks if given url isn't reachable.
     * @param url - Url to check reachability.
     * @param wait - Boolean indicating if we should retry until a status code
     * will be given.
     * @param timeoutInSeconds - Delay after assuming given resource will stay
     * available.
     * @param pollIntervallInSeconds - Seconds between two tries to reach given
     * url.
     * @param unexpectedStatusCodes - Status codes to check for.
     * @param options - Fetch options to use.
     * @returns A promise which will be resolved if a request to given url
     * couldn't finished. Otherwise returned promise will be rejected.
     */},{key:'checkUnreachability',value:function(){var _ref29=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee11(url){var wait=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var timeoutInSeconds=arguments.length>2&&arguments[2]!==undefined?arguments[2]:10;var pollIntervallInSeconds=arguments.length>3&&arguments[3]!==undefined?arguments[3]:0.1;var _this6=this;var unexpectedStatusCodes=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;var options=arguments.length>5&&arguments[5]!==undefined?arguments[5]:{};var check,result;return regeneratorRuntime.wrap(function _callee11$(_context11){while(1){switch(_context11.prev=_context11.next){case 0:check=function check(response){if(unexpectedStatusCodes){unexpectedStatusCodes=[].concat(unexpectedStatusCodes);if(response&&'status'in response&&unexpectedStatusCodes.includes(response.status))throw new Error('Given url "'+url+'" is reachable ans responses with '+('unexpected status code "'+response.status+'".'));return new Error('Given status code is not "'+(unexpectedStatusCodes.join(', ')+'".'))}};if(!wait){_context11.next=3;break}return _context11.abrupt('return',new Promise(function(){var _ref30=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee10(resolve,reject){var timedOut,wrapper,currentlyRunningTimer,timer;return regeneratorRuntime.wrap(function _callee10$(_context10){while(1){switch(_context10.prev=_context10.next){case 0:timedOut=false;wrapper=function(){var _ref31=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee9(){var response,result;return regeneratorRuntime.wrap(function _callee9$(_context9){while(1){switch(_context9.prev=_context9.next){case 0:_context9.prev=0;_context9.next=3;return fetch(url,options);case 3:response=_context9.sent;if(!timedOut){_context9.next=6;break}return _context9.abrupt('return',response);case 6:result=check(response);if(!result){_context9.next=11;break}// IgnoreTypeCheck
timer.clear();resolve(result);return _context9.abrupt('return',result);case 11:/* eslint-disable no-use-before-define */currentlyRunningTimer=Tools.timeout(pollIntervallInSeconds*1000,wrapper);/* eslint-enable no-use-before-define *//*
                            NOTE: A timer rejection is expected. Avoid throwing
                            errors about unhandled promise rejections.
                        */currentlyRunningTimer.catch(Tools.noop);_context9.next=20;break;case 15:_context9.prev=15;_context9.t0=_context9['catch'](0);/* eslint-disable no-use-before-define */// IgnoreTypeCheck
timer.clear();/* eslint-enable no-use-before-define */resolve(_context9.t0);return _context9.abrupt('return',_context9.t0);case 20:case'end':return _context9.stop();}}},_callee9,_this6,[[0,15]])}));return function wrapper(){return _ref31.apply(this,arguments)}}();currentlyRunningTimer=Tools.timeout(0,wrapper);timer=Tools.timeout(timeoutInSeconds*1000);_context10.prev=4;_context10.next=7;return timer;case 7:_context10.next=11;break;case 9:_context10.prev=9;_context10.t0=_context10['catch'](4);case 11:timedOut=true;// IgnoreTypeCheck
currentlyRunningTimer.clear();reject('Timeout of '+timeoutInSeconds+' seconds reached.');case 14:case'end':return _context10.stop();}}},_callee10,_this6,[[4,9]])}));return function(_x123,_x124){return _ref30.apply(this,arguments)}}()));case 3:_context11.prev=3;_context11.t0=check;_context11.next=7;return fetch(url,options);case 7:_context11.t1=_context11.sent;result=(0,_context11.t0)(_context11.t1);if(!result){_context11.next=11;break}return _context11.abrupt('return',result);case 11:_context11.next=16;break;case 13:_context11.prev=13;_context11.t2=_context11['catch'](3);return _context11.abrupt('return',_context11.t2);case 16:throw new Error('Given url "'+url+'" is reachable.');case 17:case'end':return _context11.stop();}}},_callee11,this,[[3,13]])}));function checkUnreachability(_x117){return _ref29.apply(this,arguments)}return checkUnreachability}()/**
     * Send given data to a given iframe.
     * @param target - Name of the target iframe or the target iframe itself.
     * @param url - URL to send to data to.
     * @param data - Data holding object to send data to.
     * @param requestType - The forms action attribute value. If nothing is
     * provided "post" will be used as default.
     * @param removeAfterLoad - Indicates if created iframe should be removed
     * right after load event. Only works if an iframe object is given instead
     * of a simple target name.
     * @returns Returns the given target as extended dom node.
     */},{key:'sendToIFrame',value:function sendToIFrame(target,url,data){var requestType=arguments.length>3&&arguments[3]!==undefined?arguments[3]:'post';var removeAfterLoad=arguments.length>4&&arguments[4]!==undefined?arguments[4]:false;var $targetDomNode=typeof target==='string'?$('iframe[name"'+target+'"]'):$(target);var $formDomNode=$('<form>').attr({action:url,method:requestType,target:$targetDomNode.attr('name')});for(var _name6 in data){if(data.hasOwnProperty(_name6))$formDomNode.append($('<input>').attr({type:'hidden',name:_name6,value:data[_name6]}))}/*
            NOTE: The given target form have to be injected into document
            object model to successfully submit.
        */if(removeAfterLoad)$targetDomNode.on('load',function(){return $targetDomNode.remove()});$formDomNode.insertAfter($targetDomNode);$formDomNode[0].submit();$formDomNode.remove();return $targetDomNode}},{key:'copyDirectoryRecursive',value:function copyDirectoryRecursive(sourcePath,targetPath){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:Tools.noop;var _this7=this;var readOptions=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{encoding:null,flag:'r'};var writeOptions=arguments.length>4&&arguments[4]!==undefined?arguments[4]:{encoding:'utf8',flag:'w',mode:438};return new Promise(function(){var _ref32=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee13(resolve,reject){var isDirectory;return regeneratorRuntime.wrap(function _callee13$(_context13){while(1){switch(_context13.prev=_context13.next){case 0:// NOTE: Check if folder needs to be created or integrated.
isDirectory=void 0;_context13.prev=1;_context13.next=4;return Tools.isDirectory(targetPath);case 4:isDirectory=_context13.sent;_context13.next=10;break;case 7:_context13.prev=7;_context13.t0=_context13['catch'](1);return _context13.abrupt('return',reject(_context13.t0));case 10:if(isDirectory)targetPath=path.resolve(targetPath,path.basename(sourcePath));sourcePath=path.resolve(sourcePath);fileSystem.mkdir(targetPath,function(){var _ref33=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee12(error){var files,_iteratorNormalCompletion70,_didIteratorError70,_iteratorError70,_iterator70,_step70,currentSourceFile,currentTargetPath;return regeneratorRuntime.wrap(function _callee12$(_context12){while(1){switch(_context12.prev=_context12.next){case 0:if(!(error&&!('code'in error&&error.code==='EEXIST'))){_context12.next=2;break}return _context12.abrupt('return',reject(error));case 2:files=void 0;_context12.prev=3;_context12.next=6;return Tools.walkDirectoryRecursively(sourcePath,callback);case 6:files=_context12.sent;_context12.next=12;break;case 9:_context12.prev=9;_context12.t0=_context12['catch'](3);return _context12.abrupt('return',reject(_context12.t0));case 12:_iteratorNormalCompletion70=true;_didIteratorError70=false;_iteratorError70=undefined;_context12.prev=15;_iterator70=files[Symbol.iterator]();case 17:if(_iteratorNormalCompletion70=(_step70=_iterator70.next()).done){_context12.next=42;break}currentSourceFile=_step70.value;currentTargetPath=path.join(targetPath,currentSourceFile.path.substring(sourcePath.length));if(!currentSourceFile.stat.isDirectory()){_context12.next=31;break}_context12.prev=21;fileSystem.mkdirSync(currentTargetPath);_context12.next=29;break;case 25:_context12.prev=25;_context12.t1=_context12['catch'](21);if('code'in _context12.t1&&_context12.t1.code==='EEXIST'){_context12.next=29;break}throw _context12.t1;case 29:_context12.next=39;break;case 31:_context12.prev=31;_context12.next=34;return Tools.copyFile(currentSourceFile.path,currentTargetPath,readOptions,writeOptions);case 34:_context12.next=39;break;case 36:_context12.prev=36;_context12.t2=_context12['catch'](31);return _context12.abrupt('return',reject(_context12.t2));case 39:_iteratorNormalCompletion70=true;_context12.next=17;break;case 42:_context12.next=48;break;case 44:_context12.prev=44;_context12.t3=_context12['catch'](15);_didIteratorError70=true;_iteratorError70=_context12.t3;case 48:_context12.prev=48;_context12.prev=49;if(!_iteratorNormalCompletion70&&_iterator70.return){_iterator70.return()}case 51:_context12.prev=51;if(!_didIteratorError70){_context12.next=54;break}throw _iteratorError70;case 54:return _context12.finish(51);case 55:return _context12.finish(48);case 56:resolve(targetPath);case 57:case'end':return _context12.stop();}}},_callee12,_this7,[[3,9],[15,44,48,56],[21,25],[31,36],[49,,51,55]])}));return function(_x132){return _ref33.apply(this,arguments)}}());case 13:case'end':return _context13.stop();}}},_callee13,_this7,[[1,7]])}));return function(_x130,_x131){return _ref32.apply(this,arguments)}}())}/**
     * Copies given source directory via path to given target directory
     * location with same target name as source file has or copy to given
     * complete target directory path.
     * @param sourcePath - Path to directory to copy.
     * @param targetPath - Target directory or complete directory location to
     * copy in.
     * @param callback - Function to invoke for each traversed file.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Determined target directory path.
     */},{key:'copyDirectoryRecursiveSync',value:function copyDirectoryRecursiveSync(sourcePath,targetPath){var callback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:Tools.noop;var readOptions=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{encoding:null,flag:'r'};var writeOptions=arguments.length>4&&arguments[4]!==undefined?arguments[4]:{encoding:'utf8',flag:'w',mode:438};// Check if folder needs to be created or integrated.
sourcePath=path.resolve(sourcePath);if(Tools.isDirectorySync(targetPath))targetPath=path.resolve(targetPath,path.basename(sourcePath));fileSystem.mkdirSync(targetPath);var _iteratorNormalCompletion71=true;var _didIteratorError71=false;var _iteratorError71=undefined;try{for(var _iterator71=Tools.walkDirectoryRecursivelySync(sourcePath,callback)[Symbol.iterator](),_step71;!(_iteratorNormalCompletion71=(_step71=_iterator71.next()).done);_iteratorNormalCompletion71=true){var currentSourceFile=_step71.value;var currentTargetPath=path.join(targetPath,currentSourceFile.path.substring(sourcePath.length));if(currentSourceFile.stat.isDirectory())fileSystem.mkdirSync(currentTargetPath);else Tools.copyFileSync(currentSourceFile.path,currentTargetPath,readOptions,writeOptions)}}catch(err){_didIteratorError71=true;_iteratorError71=err}finally{try{if(!_iteratorNormalCompletion71&&_iterator71.return){_iterator71.return()}}finally{if(_didIteratorError71){throw _iteratorError71}}}return targetPath}/**
     * Copies given source file via path to given target directory location
     * with same target name as source file has or copy to given complete
     * target file path.
     * @param sourcePath - Path to file to copy.
     * @param targetPath - Target directory or complete file location to copy
     * to.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Determined target file path.
     */},{key:'copyFile',value:function copyFile(sourcePath,targetPath){var _this8=this;var readOptions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{encoding:null,flag:'r'};var writeOptions=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{encoding:'utf8',flag:'w',mode:438};/*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */return new Promise(function(){var _ref34=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee14(resolve,reject){var isDirectory;return regeneratorRuntime.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:isDirectory=void 0;_context14.prev=1;_context14.next=4;return Tools.isDirectory(targetPath);case 4:isDirectory=_context14.sent;_context14.next=10;break;case 7:_context14.prev=7;_context14.t0=_context14['catch'](1);return _context14.abrupt('return',reject(_context14.t0));case 10:if(isDirectory)targetPath=path.resolve(targetPath,path.basename(sourcePath));fileSystem.readFile(sourcePath,readOptions,function(error,data){if(error)reject(error);else fileSystem.writeFile(targetPath,data,writeOptions,function(error){if(error)reject(error);else resolve(targetPath)})});case 12:case'end':return _context14.stop();}}},_callee14,_this8,[[1,7]])}));return function(_x138,_x139){return _ref34.apply(this,arguments)}}())}/**
     * Copies given source file via path to given target directory location
     * with same target name as source file has or copy to given complete
     * target file path.
     * @param sourcePath - Path to file to copy.
     * @param targetPath - Target directory or complete file location to copy
     * to.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Determined target file path.
     */},{key:'copyFileSync',value:function copyFileSync(sourcePath,targetPath){var readOptions=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{encoding:null,flag:'r'};var writeOptions=arguments.length>3&&arguments[3]!==undefined?arguments[3]:{encoding:'utf8',flag:'w',mode:438};/*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */if(Tools.isDirectorySync(targetPath))targetPath=path.resolve(targetPath,path.basename(sourcePath));fileSystem.writeFileSync(targetPath,fileSystem.readFileSync(sourcePath,readOptions),writeOptions);return targetPath}/**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     * @returns A promise holding a boolean which indicates directory
     * existents.
     */},{key:'isDirectory',value:function isDirectory(filePath){return new Promise(function(resolve,reject){return fileSystem.stat(filePath,function(error,stat){if(error){if(error.hasOwnProperty('code'// IgnoreTypeCheck
)&&['ENOENT','ENOTDIR'].includes(error.code))resolve(false);else reject(error);}else resolve(stat.isDirectory())})})}/**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     * @returns A boolean which indicates directory existents.
     */},{key:'isDirectorySync',value:function isDirectorySync(filePath){try{return fileSystem.statSync(filePath).isDirectory()}catch(error){if(error.hasOwnProperty('code')&&['ENOENT','ENOTDIR'].includes(error.code))return false;throw error}}/**
     * Checks if given path points to a valid file.
     * @param filePath - Path to directory.
     * @returns A promise holding a boolean which indicates directory
     * existents.
     */},{key:'isFile',value:function isFile(filePath){return new Promise(function(resolve,reject){return fileSystem.stat(filePath,function(error,stat){if(error){if(error.hasOwnProperty('code'// IgnoreTypeCheck
)&&['ENOENT','ENOTDIR'].includes(error.code))resolve(false);else reject(error);}else resolve(stat.isFile())})})}/**
     * Checks if given path points to a valid file.
     * @param filePath - Path to file.
     * @returns A boolean which indicates file existents.
     */},{key:'isFileSync',value:function isFileSync(filePath){try{return fileSystem.statSync(filePath).isFile()}catch(error){if(error.hasOwnProperty('code')&&['ENOENT','ENOTDIR'].includes(error.code))return false;throw error}}/**
     * Iterates through given directory structure recursively and calls given
     * callback for each found file. Callback gets file path and corresponding
     * stat object as argument.
     * @param directoryPath - Path to directory structure to traverse.
     * @param callback - Function to invoke for each traversed file and
     * potentially manipulate further traversing.
     * @param options - Options to use for nested "readdir" calls.
     * @returns A promise holding the determined files.
     */},{key:'walkDirectoryRecursively',value:function walkDirectoryRecursively(directoryPath){var _this9=this;var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:Tools.noop;var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'utf8';return new Promise(function(resolve,reject){return fileSystem.readdir(directoryPath,options,function(){var _ref35=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function _callee15(error,fileNames){var files,statPromises,_loop,_iteratorNormalCompletion72,_didIteratorError72,_iteratorError72,_iterator72,_step72,fileName,finalFiles,_iteratorNormalCompletion73,_didIteratorError73,_iteratorError73,_iterator73,_step73,file,result;return regeneratorRuntime.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:if(!error){_context15.next=2;break}return _context15.abrupt('return',reject(error));case 2:files=[];statPromises=[];_loop=function _loop(fileName){var filePath=path.resolve(directoryPath,fileName);statPromises.push(new Promise(function(resolve){return fileSystem.stat(filePath,function(error,stat){files.push({directoryPath:directoryPath,name:fileName,path:filePath,stat:error||stat});resolve()})}))};_iteratorNormalCompletion72=true;_didIteratorError72=false;_iteratorError72=undefined;_context15.prev=8;for(_iterator72=fileNames[Symbol.iterator]();!(_iteratorNormalCompletion72=(_step72=_iterator72.next()).done);_iteratorNormalCompletion72=true){fileName=_step72.value;_loop(fileName)}_context15.next=16;break;case 12:_context15.prev=12;_context15.t0=_context15['catch'](8);_didIteratorError72=true;_iteratorError72=_context15.t0;case 16:_context15.prev=16;_context15.prev=17;if(!_iteratorNormalCompletion72&&_iterator72.return){_iterator72.return()}case 19:_context15.prev=19;if(!_didIteratorError72){_context15.next=22;break}throw _iteratorError72;case 22:return _context15.finish(19);case 23:return _context15.finish(16);case 24:_context15.next=26;return Promise.all(statPromises);case 26:if(callback)/*
                        NOTE: Directories have to be iterated first to
                        potentially avoid deeper iterations.
                    */files.sort(function(firstFile,secondFile){if(firstFile.stat.isDirectory()){if(secondFile.stat.isDirectory())return 0;return-1}if(secondFile.stat.isDirectory())return 1;return 0});finalFiles=[];_iteratorNormalCompletion73=true;_didIteratorError73=false;_iteratorError73=undefined;_context15.prev=31;_iterator73=files[Symbol.iterator]();case 33:if(_iteratorNormalCompletion73=(_step73=_iterator73.next()).done){_context15.next=54;break}file=_step73.value;finalFiles.push(file);result=callback(file);if(!(result===null)){_context15.next=39;break}return _context15.abrupt('break',54);case 39:if(!((typeof result==='undefined'?'undefined':_typeof(result))==='object'&&'then'in result)){_context15.next=43;break}_context15.next=42;return result;case 42:result=_context15.sent;case 43:if(!(result===null)){_context15.next=45;break}return _context15.abrupt('break',54);case 45:if(!(result!==false&&file.stat.isDirectory())){_context15.next=51;break}_context15.t1=finalFiles;_context15.next=49;return Tools.walkDirectoryRecursively(file.path,callback);case 49:_context15.t2=_context15.sent;finalFiles=_context15.t1.concat.call(_context15.t1,_context15.t2);case 51:_iteratorNormalCompletion73=true;_context15.next=33;break;case 54:_context15.next=60;break;case 56:_context15.prev=56;_context15.t3=_context15['catch'](31);_didIteratorError73=true;_iteratorError73=_context15.t3;case 60:_context15.prev=60;_context15.prev=61;if(!_iteratorNormalCompletion73&&_iterator73.return){_iterator73.return()}case 63:_context15.prev=63;if(!_didIteratorError73){_context15.next=66;break}throw _iteratorError73;case 66:return _context15.finish(63);case 67:return _context15.finish(60);case 68:resolve(finalFiles);case 69:case'end':return _context15.stop();}}},_callee15,_this9,[[8,12,16,24],[17,,19,23],[31,56,60,68],[61,,63,67]])}));return function(_x144,_x145){return _ref35.apply(this,arguments)}}())})}/**
     * Iterates through given directory structure recursively and calls given
     * callback for each found file. Callback gets file path and corresponding
     * stat object as argument.
     * @param directoryPath - Path to directory structure to traverse.
     * @param callback - Function to invoke for each traversed file.
     * @param options - Options to use for nested "readdir" calls.
     * @returns Determined list if all files.
     */},{key:'walkDirectoryRecursivelySync',value:function walkDirectoryRecursivelySync(directoryPath){var callback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:Tools.noop;var options=arguments.length>2&&arguments[2]!==undefined?arguments[2]:'utf8';var files=[];var _iteratorNormalCompletion74=true;var _didIteratorError74=false;var _iteratorError74=undefined;try{for(var _iterator74=fileSystem.readdirSync(directoryPath,options)[Symbol.iterator](),_step74;!(_iteratorNormalCompletion74=(_step74=_iterator74.next()).done);_iteratorNormalCompletion74=true){var fileName=_step74.value;var _filePath=path.resolve(directoryPath,fileName);files.push({directoryPath:directoryPath,name:fileName,path:_filePath,stat:fileSystem.statSync(_filePath)})}}catch(err){_didIteratorError74=true;_iteratorError74=err}finally{try{if(!_iteratorNormalCompletion74&&_iterator74.return){_iterator74.return()}}finally{if(_didIteratorError74){throw _iteratorError74}}}if(callback)/*
                NOTE: Directories have to be iterated first to potentially
                avoid deeper iterations.
            */files.sort(function(firstFile,secondFile){if(firstFile.stat.isDirectory()){if(secondFile.stat.isDirectory())return 0;return-1}if(secondFile.stat.isDirectory())return 1;return 0});var finalFiles=[];var _iteratorNormalCompletion75=true;var _didIteratorError75=false;var _iteratorError75=undefined;try{for(var _iterator75=files[Symbol.iterator](),_step75;!(_iteratorNormalCompletion75=(_step75=_iterator75.next()).done);_iteratorNormalCompletion75=true){var file=_step75.value;finalFiles.push(file);var result=callback(file);if(result===null)break;if(result!==false&&file.stat.isDirectory())finalFiles=finalFiles.concat(Tools.walkDirectoryRecursivelySync(file.path,callback))}}catch(err){_didIteratorError75=true;_iteratorError75=err}finally{try{if(!_iteratorNormalCompletion75&&_iterator75.return){_iterator75.return()}}finally{if(_didIteratorError75){throw _iteratorError75}}}return finalFiles}// / endregion
// / region process handler
/**
     * Generates a one shot close handler which triggers given promise methods.
     * If a reason is provided it will be given as resolve target. An Error
     * will be generated if return code is not zero. The generated Error has
     * a property "returnCode" which provides corresponding process return
     * code.
     * @param resolve - Promise's resolve function.
     * @param reject - Promise's reject function.
     * @param reason - Promise target if process has a zero return code.
     * @param callback - Optional function to call of process has successfully
     * finished.
     * @returns Process close handler function.
     */},{key:'getProcessCloseHandler',value:function getProcessCloseHandler(resolve,reject){var reason=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;var callback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:function(){};var finished=false;return function(returnCode){for(var _len17=arguments.length,parameter=Array(_len17>1?_len17-1:0),_key47=1;_key47<_len17;_key47++){parameter[_key47-1]=arguments[_key47]}if(finished)finished=true;else{finished=true;if(typeof returnCode!=='number'||returnCode===0){callback();resolve({reason:reason,parameter:parameter})}else{var error=new Error('Task exited with error code '+returnCode);// IgnoreTypeCheck
error.returnCode=returnCode;// IgnoreTypeCheck
error.parameter=parameter;reject(error)}}}}/**
     * Forwards given child process communication channels to corresponding
     * current process communication channels.
     * @param childProcess - Child process meta data.
     * @returns Given child process meta data.
     */},{key:'handleChildProcess',value:function handleChildProcess(childProcess){childProcess.stdout.pipe(process.stdout);childProcess.stderr.pipe(process.stderr);childProcess.on('close',function(returnCode){if(returnCode!==0)console.error('Task exited with error code '+returnCode)});return childProcess}}]);return Tools}();// endregion
// region handle $ extending
Tools.abbreviations=['html','id','url','us','de','api','href'];Tools.animationEndEventNames='animationend webkitAnimationEnd '+'oAnimationEnd MSAnimationEnd';Tools.classToTypeMapping={'[object Array]':'array','[object Boolean]':'boolean','[object Date]':'date','[object Error]':'error','[object Function]':'function','[object Map]':'map','[object Number]':'number','[object Object]':'object','[object RegExp]':'regexp','[object Set]':'set','[object String]':'string'};Tools.closeEventNames=['exit','close','uncaughtException','SIGINT','SIGTERM','SIGQUIT'];Tools.consoleMethodNames=['assert','clear','count','debug','dir','dirxml','error','exception','group','groupCollapsed','groupEnd','info','log','markTimeline','profile','profileEnd','table','time','timeEnd','timeStamp','trace','warn'];Tools.keyCode={BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,HOME:36,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38};Tools.maximalSupportedInternetExplorerVersion=function(){if(!('document'in $.global))return 0;var div=$.global.document.createElement('div');var version=void 0;for(version=0;version<10;version++){/*
                NOTE: We split html comment sequences to avoid wrong
                interpretation if this code is embedded in markup.
                NOTE: Internet Explorer 9 and lower sometimes doesn't
                understand conditional comments wich doesn't starts with a
                whitespace. If the conditional markup isn't in a commend.
                Otherwise there shouldn't be any whitespace!
            *//* eslint-disable no-useless-concat */div.innerHTML='<!'+('--[if gt IE '+version+']><i></i><![e')+'ndif]-'+'->';/* eslint-enable no-useless-concat */if(div.getElementsByTagName('i').length===0)break}// Try special detection for internet explorer 10 and 11.
if(version===0&&'navigator'in $.global)if($.global.navigator.appVersion.includes('MSIE 10'))return 10;else if($.global.navigator.userAgent.includes('Trident')&&$.global.navigator.userAgent.includes('rv:11'))return 11;return version}();Tools.noop='noop'in $?$.noop:function(){};Tools.plainObjectPrototypes=[Object.prototype];Tools.specialRegexSequences=['-','[',']','(',')','^','$','*','+','.','{','}'];Tools.transitionEndEventNames='transitionend '+'webkitTransitionEnd oTransitionEnd MSTransitionEnd';Tools._javaScriptDependentContentHandled=false;exports.default=Tools;if('fn'in $)$.fn.Tools=function(){for(var _len18=arguments.length,parameter=Array(_len18),_key48=0;_key48<_len18;_key48++){parameter[_key48]=arguments[_key48]}return new Tools().controller(Tools,parameter,this)};$.Tools=function(){for(var _len19=arguments.length,parameter=Array(_len19),_key49=0;_key49<_len19;_key49++){parameter[_key49]=arguments[_key49]}return new Tools().controller(Tools,parameter)};$.Tools.class=Tools;if('fn'in $){// region prop fix for comments and text nodes
var nativePropFunction=$.fn.prop;/**
     * JQuery's native prop implementation ignores properties for text nodes,
     * comments and attribute nodes.
     * @param key - Name of property to retrieve from current dom node.
     * @param additionalParameter - Additional parameter will be forwarded to
     * native prop function also.
     * @returns Returns value if used as getter or current dom node if used as
     * setter.
     */$.fn.prop=function(key){for(var _len20=arguments.length,additionalParameter=Array(_len20>1?_len20-1:0),_key50=1;_key50<_len20;_key50++){additionalParameter[_key50-1]=arguments[_key50]}if(additionalParameter.length<2&&this.length&&['#text','#comment'].includes(this[0].nodeName)&&key in this[0]){if(additionalParameter.length===0)return this[0][key];if(additionalParameter.length===1){this[0][key]=additionalParameter[0];return this}}return nativePropFunction.call.apply(nativePropFunction,[this,key].concat(additionalParameter))};// endregion
// region fix script loading errors with canceling requests after dom ready
$.readyException=function(error){if(!(typeof error==='string'&&error==='canceled'))throw error};// endregion
}// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), __webpack_require__(3), __webpack_require__(4)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

if(typeof __WEBPACK_EXTERNAL_MODULE_5__ === 'undefined') {var e = new Error("Cannot find module \"jQuery\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ })
/******/ ]);
});
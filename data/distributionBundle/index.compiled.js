(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-runtime/core-js/get-iterator"), require("babel-runtime/core-js/json/stringify"), require("babel-runtime/core-js/map"), require("babel-runtime/core-js/object/get-prototype-of"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/createClass"), require("babel-runtime/helpers/slicedToArray"), require("babel-runtime/helpers/typeof"), (function webpackLoadOptionalExternalModule() { try { return require('jquery'); } catch(e) {} }()));
	else if(typeof define === 'function' && define.amd)
		define("clientnode", ["babel-runtime/core-js/get-iterator", "babel-runtime/core-js/json/stringify", "babel-runtime/core-js/map", "babel-runtime/core-js/object/get-prototype-of", "babel-runtime/helpers/classCallCheck", "babel-runtime/helpers/createClass", "babel-runtime/helpers/slicedToArray", "babel-runtime/helpers/typeof", 'jquery'], factory);
	else if(typeof exports === 'object')
		exports["clientnode"] = factory(require("babel-runtime/core-js/get-iterator"), require("babel-runtime/core-js/json/stringify"), require("babel-runtime/core-js/map"), require("babel-runtime/core-js/object/get-prototype-of"), require("babel-runtime/helpers/classCallCheck"), require("babel-runtime/helpers/createClass"), require("babel-runtime/helpers/slicedToArray"), require("babel-runtime/helpers/typeof"), (function webpackLoadOptionalExternalModule() { try { return require('jquery'); } catch(e) {} }()));
	else
		root['clientnode'] = factory(root["babel-runtime/core-js/get-iterator"], root["babel-runtime/core-js/json/stringify"], root["babel-runtime/core-js/map"], root["babel-runtime/core-js/object/get-prototype-of"], root["babel-runtime/helpers/classCallCheck"], root["babel-runtime/helpers/createClass"], root["babel-runtime/helpers/slicedToArray"], root["babel-runtime/helpers/typeof"], root["jQuery"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** multi index ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! index.js */1);


/***/ },
/* 1 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, module) {
	// #!/usr/bin/env node
	// -*- coding: utf-8 -*-
	/** @module clientnode */
	'use strict';
	/* !
	    region header
	    [Project page](http://torben.website/clientnode)

	    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

	    License
	    -------

	    This library written by Torben Sickert stand under a creative commons
	    naming 3.0 unported license.
	    See http://creativecommons.org/licenses/by/3.0/deed.de
	    endregion
	*/
	// region imports

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.$ = exports.globalContext = undefined;

	var _stringify = __webpack_require__(/*! babel-runtime/core-js/json/stringify */ 4);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _slicedToArray2 = __webpack_require__(/*! babel-runtime/helpers/slicedToArray */ 9);

	var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

	var _map = __webpack_require__(/*! babel-runtime/core-js/map */ 5);

	var _map2 = _interopRequireDefault(_map);

	var _getPrototypeOf = __webpack_require__(/*! babel-runtime/core-js/object/get-prototype-of */ 6);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _getIterator2 = __webpack_require__(/*! babel-runtime/core-js/get-iterator */ 3);

	var _getIterator3 = _interopRequireDefault(_getIterator2);

	var _classCallCheck2 = __webpack_require__(/*! babel-runtime/helpers/classCallCheck */ 7);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(/*! babel-runtime/helpers/createClass */ 8);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _typeof2 = __webpack_require__(/*! babel-runtime/helpers/typeof */ 10);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// endregion
	// region determine context

	// endregion
	// region types
	var globalContext = exports.globalContext = function () {
	    if (typeof window === 'undefined') {
	        if (typeof global === 'undefined') return  false ? {} : module;
	        if ('window' in global) return global.window;
	        return global;
	    }
	    return window;
	}();
	/* eslint-disable no-use-before-define */
	var $ = exports.$ = function () {
	    /* eslint-enable no-use-before-define */
	    var _$ = void 0;
	    if ('$' in globalContext && globalContext.$ !== null) _$ = globalContext.$;else {
	        var _ret = function () {
	            if (!('$' in globalContext)) try {
	                return {
	                    v: __webpack_require__(/*! jquery */ 11)
	                };
	            } catch (error) {}
	            var selector = 'document' in globalContext && 'querySelectorAll' in globalContext.document ? globalContext.document.querySelectorAll : function () {
	                return null;
	            };
	            _$ = function $(parameter) {
	                if (typeof parameter === 'string') {
	                    var $domNodes = selector.apply(globalContext.document, arguments);
	                    if ('fn' in _$) for (var _key in _$.fn) {
	                        if (_$.fn.hasOwnProperty(_key))
	                            // IgnoreTypeCheck
	                            $domNodes[_key] = _$.fn[_key].bind($domNodes);
	                    }return $domNodes;
	                }
	                /* eslint-disable no-use-before-define */
	                if (Tools.isFunction(parameter) && 'document' in globalContext)
	                    /* eslint-enable no-use-before-define */
	                    globalContext.document.addEventListener('DOMContentLoaded', parameter);
	                return parameter;
	            };
	            _$.fn = {};
	        }();

	        if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
	    }
	    return _$;
	}();
	if (!('global' in $)) $.global = globalContext;
	if (!('context' in $) && 'document' in $.global) $.contest = $.global.document;
	// endregion
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
	 * @property static:keyCode - Saves a mapping from key codes to their
	 * corresponding name.
	 * @property static:maximalSupportedInternetExplorerVersion - Saves currently
	 * minimal supported internet explorer version. Saves zero if no internet
	 * explorer present.
	 * @property static:transitionEndEventNames - Saves a string with all css3
	 * browser specific transition end event names.
	 * @property static:consoleMethodNames - This variable contains a collection of
	 * methods usually binded to the console object.
	 * @property static:_javaScriptDependentContentHandled - Indicates whether
	 * javaScript dependent content where hide or shown.
	 * @property static:_name - Defines this class name to allow retrieving them
	 * after name mangling.
	 * @property $domNode - $-extended dom node if one was given to the constructor
	 * method.
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
	 * @property _locks - Mapping of lock descriptions to there corresponding
	 * callbacks.
	 */

	var Tools = function () {
	    // endregion
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
	     */

	    // endregion
	    // region dynamic properties
	    function Tools() {
	        var $domNode = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
	        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	        var defaultOptions = arguments.length <= 2 || arguments[2] === undefined ? {
	            logging: false, domNodeSelectorPrefix: 'body', domNode: {
	                hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
	                showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
	            }
	        } : arguments[2];
	        var locks = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	        (0, _classCallCheck3.default)(this, Tools);

	        if ($domNode) this.$domNode = $domNode;
	        this._options = options;
	        this._defaultOptions = defaultOptions;
	        this._locks = locks;
	        // Avoid errors in browsers that lack a console.
	        if (!('console' in $.global)) $.global.console = {};
	        var _iteratorNormalCompletion = true;
	        var _didIteratorError = false;
	        var _iteratorError = undefined;

	        try {
	            for (var _iterator = (0, _getIterator3.default)(this.constructor.consoleMethodNames), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                var methodName = _step.value;

	                if (!(methodName in $.global.console)) $.global.console[methodName] = this.constructor.noop;
	            }
	        } catch (err) {
	            _didIteratorError = true;
	            _iteratorError = err;
	        } finally {
	            try {
	                if (!_iteratorNormalCompletion && _iterator.return) {
	                    _iterator.return();
	                }
	            } finally {
	                if (_didIteratorError) {
	                    throw _iteratorError;
	                }
	            }
	        }

	        if (!this.constructor._javaScriptDependentContentHandled && 'document' in $.global && 'filter' in $ && 'hide' in $ && 'show' in $) {
	            this.constructor._javaScriptDependentContentHandled = true;
	            $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNode.hideJavaScriptEnabled).filter(function () {
	                return !$(this).data('javaScriptDependentContentHide');
	            }).data('javaScriptDependentContentHide', true).hide();
	            $(this._defaultOptions.domNodeSelectorPrefix + ' ' + this._defaultOptions.domNode.showJavaScriptEnabled).filter(function () {
	                return !$(this).data('javaScriptDependentContentShow');
	            }).data('javaScriptDependentContentShow', true).show();
	        }
	    }
	    /**
	     * This method could be overwritten normally. It acts like a destructor.
	     * @returns Returns the current instance.
	     */

	    // region static properties


	    (0, _createClass3.default)(Tools, [{
	        key: 'destructor',
	        value: function destructor() {
	            if ('off' in $.fn) this.off('*');
	            return this;
	        }
	        /**
	         * This method should be overwritten normally. It is triggered if current
	         * object was created via the "new" keyword and is called now.
	         * @param options - An options object.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'initialize',
	        value: function initialize() {
	            var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            /*
	                NOTE: We have to create a new options object instance to avoid
	                changing a static options object.
	            */
	            this._options = this.constructor.extendObject(true, {}, this._defaultOptions, this._options, options);
	            /*
	                The selector prefix should be parsed after extending options
	                because the selector would be overwritten otherwise.
	            */
	            this._options.domNodeSelectorPrefix = this.constructor.stringFormat(this._options.domNodeSelectorPrefix, this.constructor.stringCamelCaseToDelimited(this.constructor._name));
	            return this;
	        }
	        // / endregion
	        // / region object orientation
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * Defines a generic controller for dom node aware plugins.
	         * @param object - The object or class to control. If "object" is a class
	         * an instance will be generated.
	         * @param parameter - The initially given arguments object.
	         * @param $domNode - Optionally a $-extended dom node to use as reference.
	         * @returns Returns whatever the initializer method returns.
	         */

	    }, {
	        key: 'controller',
	        value: function controller(object, parameter) {
	            var $domNode = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            if (typeof object === 'function') {
	                object = new object($domNode);
	                if (!object instanceof Tools) object = this.constructor.extendObject(true, new Tools(), object);
	            }
	            parameter = this.constructor.arrayMake(parameter);
	            if ($domNode && 'data' in $domNode && !$domNode.data(object.constructor._name))
	                // Attach extended object to the associated dom node.
	                $domNode.data(object.constructor._name, object);
	            if (parameter[0] in object) return object[parameter[0]].apply(object, parameter.slice(1));else if (parameter.length === 0 || (0, _typeof3.default)(parameter[0]) === 'object')
	                /*
	                    If an options object or no method name is given the initializer
	                    will be called.
	                */
	                return object.initialize.apply(object, parameter);
	            throw Error('Method "' + parameter[0] + '" does not exist on $-extended dom node ' + ('"' + object.constructor._name + '".'));
	        }
	        // / endregion
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
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'acquireLock',
	        value: function acquireLock(description, callbackFunction) {
	            var _this = this;

	            var autoRelease = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            var wrappedCallbackFunction = function wrappedCallbackFunction(description) {
	                callbackFunction(description);
	                if (autoRelease) _this.releaseLock(description);
	            };
	            if (this._locks.hasOwnProperty(description)) this._locks[description].push(wrappedCallbackFunction);else {
	                this._locks[description] = [];
	                wrappedCallbackFunction(description);
	            }
	            return this;
	        }
	        /**
	         * Calling this method  causes the given critical area to be finished and
	         * all functions given to "this.acquireLock()" will be executed in right
	         * order.
	         * @param description - A short string describing the critical areas
	         * properties.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'releaseLock',
	        value: function releaseLock(description) {
	            if (this._locks.hasOwnProperty(description)) if (this._locks[description].length) this._locks[description].shift()(description);else delete this._locks[description];
	            return this;
	        }
	        // / endregion
	        // / region boolean
	        /**
	         * Determines whether its argument represents a JavaScript number.
	         * @param object - Object to analyze.
	         * @returns A boolean value indicating whether given object is numeric
	         * like.
	         */

	    }, {
	        key: 'log',

	        // / endregion
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
	         */
	        value: function log(object) {
	            var force = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	            var avoidAnnotation = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	            var level = arguments.length <= 3 || arguments[3] === undefined ? 'info' : arguments[3];

	            if (this._options.logging || force || ['error', 'critical'].includes(level)) {
	                var message = void 0;
	                if (avoidAnnotation) message = object;else if (typeof object === 'string') {
	                    for (var _len = arguments.length, additionalArguments = Array(_len > 4 ? _len - 4 : 0), _key2 = 4; _key2 < _len; _key2++) {
	                        additionalArguments[_key2 - 4] = arguments[_key2];
	                    }

	                    additionalArguments.unshift(object);
	                    message = this.constructor._name + ' (' + level + '): ' + this.constructor.stringFormat.apply(this, additionalArguments);
	                } else if (this.constructor.isNumeric(object) || typeof object === 'boolean') message = this.constructor._name + ' (' + level + '): ' + object.toString();else {
	                    this.log(',--------------------------------------------,');
	                    this.log(object, force, true);
	                    this.log("'--------------------------------------------'");
	                }
	                if (message) if (!('console' in $.global && level in $.global.console) || $.global.console[level] === this.constructor.noop) {
	                    if ('alert' in $.global) $.global.alert(message);
	                } else $.global.console[level](message);
	            }
	            return this;
	        }
	        /**
	         * Wrapper method for the native console method usually provided by
	         * interpreter.
	         * @param object - Any object to print.
	         * @param additionalArguments - Additional arguments are used for string
	         * formating.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'info',
	        value: function info(object) {
	            for (var _len2 = arguments.length, additionalArguments = Array(_len2 > 1 ? _len2 - 1 : 0), _key3 = 1; _key3 < _len2; _key3++) {
	                additionalArguments[_key3 - 1] = arguments[_key3];
	            }

	            // IgnoreTypeCheck
	            return this.log.apply(this, [object, false, false, 'info'].concat(additionalArguments));
	        }
	        /**
	         * Wrapper method for the native console method usually provided by
	         * interpreter.
	         * @param object - Any object to print.
	         * @param additionalArguments - Additional arguments are used for string
	         * formating.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'debug',
	        value: function debug(object) {
	            for (var _len3 = arguments.length, additionalArguments = Array(_len3 > 1 ? _len3 - 1 : 0), _key4 = 1; _key4 < _len3; _key4++) {
	                additionalArguments[_key4 - 1] = arguments[_key4];
	            }

	            // IgnoreTypeCheck
	            return this.log.apply(this, [object, false, false, 'debug'].concat(additionalArguments));
	        }
	        /**
	         * Wrapper method for the native console method usually provided by
	         * interpreter.
	         * @param object - Any object to print.
	         * @param additionalArguments - Additional arguments are used for string
	         * formating.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'error',
	        value: function error(object) {
	            for (var _len4 = arguments.length, additionalArguments = Array(_len4 > 1 ? _len4 - 1 : 0), _key5 = 1; _key5 < _len4; _key5++) {
	                additionalArguments[_key5 - 1] = arguments[_key5];
	            }

	            // IgnoreTypeCheck
	            return this.log.apply(this, [object, true, false, 'error'].concat(additionalArguments));
	        }
	        /**
	         * Wrapper method for the native console method usually provided by
	         * interpreter.
	         * @param object - Any object to print.
	         * @param additionalArguments - Additional arguments are used for string
	         * formating.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'critical',
	        value: function critical(object) {
	            for (var _len5 = arguments.length, additionalArguments = Array(_len5 > 1 ? _len5 - 1 : 0), _key6 = 1; _key6 < _len5; _key6++) {
	                additionalArguments[_key6 - 1] = arguments[_key6];
	            }

	            // IgnoreTypeCheck
	            return this.log.apply(this, [object, true, false, 'warn'].concat(additionalArguments));
	        }
	        /**
	         * Wrapper method for the native console method usually provided by
	         * interpreter.
	         * @param object - Any object to print.
	         * @param additionalArguments - Additional arguments are used for string
	         * formating.
	         * @returns Returns the current instance.
	         */

	    }, {
	        key: 'warn',
	        value: function warn(object) {
	            for (var _len6 = arguments.length, additionalArguments = Array(_len6 > 1 ? _len6 - 1 : 0), _key7 = 1; _key7 < _len6; _key7++) {
	                additionalArguments[_key7 - 1] = arguments[_key7];
	            }

	            // IgnoreTypeCheck
	            return this.log.apply(this, [object, false, false, 'warn'].concat(additionalArguments));
	        }
	        /**
	         * Dumps a given object in a human readable format.
	         * @param object - Any object to show.
	         * @param level - Number of levels to dig into given object recursively.
	         * @param currentLevel - Maximal number of recursive function calls to
	         * represent given object.
	         * @returns Returns the serialized version of given object.
	         */

	    }, {
	        key: 'getText',

	        // / endregion
	        // / region dom node
	        /**
	         * Get text content of current element without it children's text contents.
	         * @returns The text string.
	         */
	        value: function getText() {
	            return this.$domNode.clone().children().remove().end().text();
	        }
	        /**
	         * Normalizes class name order of current dom node.
	         * @returns Current instance.
	         */

	    }, {
	        key: 'normalizeClassNames',
	        value: function normalizeClassNames() {
	            this.$domNode.find('*').addBack().each(function () {
	                var $thisDomNode = $(this);
	                if ($thisDomNode.attr('class')) {
	                    var sortedClassNames = $thisDomNode.attr('class').split(' ').sort() || [];
	                    $thisDomNode.attr('class', '');
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        for (var _iterator2 = (0, _getIterator3.default)(sortedClassNames), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            var _className = _step2.value;

	                            $thisDomNode.addClass(_className);
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }
	                } else if ($thisDomNode.is('[class]')) $thisDomNode.removeAttr('class');
	            });
	            return this;
	        }
	        /**
	         * Normalizes style attributes order of current dom node.
	         * @returns Returns current instance.
	         */

	    }, {
	        key: 'normalizeStyles',
	        value: function normalizeStyles() {
	            var self = this;
	            this.$domNode.find('*').addBack().each(function () {
	                var $thisDomNode = $(this);
	                var serializedStyles = $thisDomNode.attr('style');
	                if (serializedStyles) {
	                    var sortedStyles = self.constructor.stringCompressStyleValue(serializedStyles).split(';').sort() || [];
	                    $thisDomNode.attr('style', '');
	                    var _iteratorNormalCompletion3 = true;
	                    var _didIteratorError3 = false;
	                    var _iteratorError3 = undefined;

	                    try {
	                        for (var _iterator3 = (0, _getIterator3.default)(sortedStyles), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                            var style = _step3.value;

	                            $thisDomNode.css.apply($thisDomNode, style.trim().split(':'));
	                        }
	                    } catch (err) {
	                        _didIteratorError3 = true;
	                        _iteratorError3 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                _iterator3.return();
	                            }
	                        } finally {
	                            if (_didIteratorError3) {
	                                throw _iteratorError3;
	                            }
	                        }
	                    }

	                    $thisDomNode.attr('style', self.constructor.stringCompressStyleValue($thisDomNode.attr('style')));
	                } else if ($thisDomNode.is('[style]')) $thisDomNode.removeAttr('style');
	            });
	            return this;
	        }
	        /**
	         * Checks whether given html or text strings are equal.
	         * @param first - First html, selector to dom node or text to compare.
	         * @param second - Second html, selector to dom node  or text to compare.
	         * @param forceHTMLString - Indicates whether given contents are
	         * interpreted as html string (otherwise an automatic detection will be
	         * triggered).
	         * @returns Returns true if both dom representations are equivalent.
	         */

	    }, {
	        key: 'getPositionRelativeToViewport',

	        /**
	         * Determines where current dom node is relative to current view port
	         * position.
	         * @param delta - Allows deltas for "top", "left", "bottom" and "right" for
	         * determining positions.
	         * @returns Returns one of "above", "left", "below", "right" or "in".
	         */
	        value: function getPositionRelativeToViewport() {
	            var delta = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	            delta = this.constructor.extendObject({ top: 0, left: 0, bottom: 0, right: 0 }, delta);
	            if ('window' in $.global && this.$domNode && this.$domNode.length && this.$domNode[0]) {
	                var $window = $($.global.window);
	                var rectangle = this.$domNode[0].getBoundingClientRect();
	                if (rectangle.top + delta.top < 0) return 'above';
	                if (rectangle.left + delta.left < 0) return 'left';
	                if ($window.height() < rectangle.bottom + delta.bottom) return 'below';
	                if ($window.width() < rectangle.right + delta.right) return 'right';
	            }
	            return 'in';
	        }
	        /**
	         * Generates a directive name corresponding selector string.
	         * @param directiveName - The directive name.
	         * @returns Returns generated selector.
	         */

	    }, {
	        key: 'removeDirective',

	        /**
	         * Removes a directive name corresponding class or attribute.
	         * @param directiveName - The directive name.
	         * @returns Returns current dom node.
	         */
	        value: function removeDirective(directiveName) {
	            var delimitedName = this.constructor.stringCamelCaseToDelimited(directiveName);
	            return this.$domNode.removeClass(delimitedName).removeAttr(delimitedName).removeAttr('data-' + delimitedName).removeAttr('x-' + delimitedName).removeAttr(delimitedName.replace('-', ':')).removeAttr(delimitedName.replace('-', '_'));
	        }
	        /**
	         * Determines a normalized camel case directive name representation.
	         * @param directiveName - The directive name.
	         * @returns Returns the corresponding name.
	         */

	    }, {
	        key: 'getDirectiveValue',

	        /**
	         * Determines a directive attribute value.
	         * @param directiveName - The directive name.
	         * @returns Returns the corresponding attribute value or "null" if no
	         * attribute value exists.
	         */
	        value: function getDirectiveValue(directiveName) {
	            var delimitedName = this.constructor.stringCamelCaseToDelimited(directiveName);
	            var _arr = [delimitedName, 'data-' + delimitedName, 'x-' + delimitedName, delimitedName.replace('-', '\\:')];
	            for (var _i = 0; _i < _arr.length; _i++) {
	                var _attributeName = _arr[_i];
	                var _value = this.$domNode.attr(_attributeName);
	                if (_value !== undefined) return _value;
	            }
	            return null;
	        }
	        /**
	         * Removes a selector prefix from a given selector. This methods searches
	         * in the options object for a given "domNodeSelectorPrefix".
	         * @param domNodeSelector - The dom node selector to slice.
	         * @returns Returns the sliced selector.
	         */

	    }, {
	        key: 'sliceDomNodeSelectorPrefix',
	        value: function sliceDomNodeSelectorPrefix(domNodeSelector) {
	            if ('domNodeSelectorPrefix' in this._options && domNodeSelector.startsWith(this._options.domNodeSelectorPrefix)) return domNodeSelector.substring(this._options.domNodeSelectorPrefix.length).trim();
	            return domNodeSelector;
	        }
	        /**
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
	         */

	    }, {
	        key: 'grabDomNode',

	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * Converts an object of dom selectors to an array of $ wrapped dom nodes.
	         * Note if selector description as one of "class" or "id" as suffix element
	         * will be ignored.
	         * @param domNodeSelectors - An object with dom node selectors.
	         * @param wrapperDomNode - A dom node to be the parent or wrapper of all
	         * retrieved dom nodes.
	         * @returns Returns All $ wrapped dom nodes corresponding to given
	         * selectors.
	         */
	        value: function grabDomNode(domNodeSelectors, wrapperDomNode) {
	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            var domNodes = {};
	            if (domNodeSelectors) if (wrapperDomNode) {
	                var $wrapperDomNode = $(wrapperDomNode);
	                for (var _name in domNodeSelectors) {
	                    if (domNodeSelectors.hasOwnProperty(_name)) domNodes[_name] = $wrapperDomNode.find(domNodeSelectors[_name]);
	                }
	            } else for (var _name2 in domNodeSelectors) {
	                if (domNodeSelectors.hasOwnProperty(_name2)) {
	                    var match = domNodeSelectors[_name2].match(', *');
	                    if (match) {
	                        var _iteratorNormalCompletion4 = true;
	                        var _didIteratorError4 = false;
	                        var _iteratorError4 = undefined;

	                        try {
	                            for (var _iterator4 = (0, _getIterator3.default)(domNodeSelectors[_name2].split(match[0])), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                                var _selectorPart = _step4.value;

	                                domNodeSelectors[_name2] += ', ' + this.normalizeDomNodeSelector(_selectorPart);
	                            }
	                        } catch (err) {
	                            _didIteratorError4 = true;
	                            _iteratorError4 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                    _iterator4.return();
	                                }
	                            } finally {
	                                if (_didIteratorError4) {
	                                    throw _iteratorError4;
	                                }
	                            }
	                        }
	                    }domNodes[_name2] = $(this.normalizeDomNodeSelector(domNodeSelectors[_name2]));
	                }
	            }if (this._options.domNodeSelectorPrefix) domNodes.parent = $(this._options.domNodeSelectorPrefix);
	            if ('window' in $.global) domNodes.window = $($.global.window);
	            if ('document' in $.global) domNodes.document = $($.global.document);
	            return domNodes;
	        }
	        // / endregion
	        // / region scope
	        /**
	         * Overwrites all inherited variables from parent scope with "undefined".
	         * @param scope - A scope where inherited names will be removed.
	         * @param prefixesToIgnore - Name prefixes to ignore during deleting names
	         * in given scope.
	         * @returns The isolated scope.
	         */

	    }, {
	        key: 'getMethod',

	        // / endregion
	        // / region function
	        /**
	         * Methods given by this method has the plugin scope referenced with
	         * "this". Otherwise "this" usually points to the object the given method
	         * was attached to. If "method" doesn't match string arguments are passed
	         * through a wrapper function with "context" setted as "scope" or "this" if
	         * nothing is provided.
	         * @param method - A method name of given scope.
	         * @param scope - A given scope.
	         * @param additionalArguments - A list of additional arguments to forward
	         * to given function, when it should be called.
	         * @returns Returns the given methods return value.
	         */
	        value: function getMethod(method) {
	            for (var _len7 = arguments.length, additionalArguments = Array(_len7 > 2 ? _len7 - 2 : 0), _key8 = 2; _key8 < _len7; _key8++) {
	                additionalArguments[_key8 - 2] = arguments[_key8];
	            }

	            var scope = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

	            /*
	                This following outcomment line would be responsible for a bug in
	                yuicompressor. Because of declaration of arguments the parser
	                things that arguments is a local variable and could be renamed. It
	                doesn't care about that the magic arguments object is necessary to
	                generate the arguments array in this context.
	                 var arguments = this.constructor.arrayMake(arguments)
	            */
	            if (!scope) scope = this;
	            if (typeof method === 'string' && (typeof scope === 'undefined' ? 'undefined' : (0, _typeof3.default)(scope)) === 'object') return function () {
	                if (!scope[method] && typeof method === 'string') throw Error('Method "' + method + '" doesn\'t exists in "' + scope + '".');
	                return scope[method].apply(scope, additionalArguments.concat(this.constructor.arrayMake(arguments)));
	            };
	            var self = this;
	            return function () {
	                // IgnoreTypeCheck
	                return method.apply(scope, self.constructor.arrayMake(arguments).concat(additionalArguments));
	            };
	        }
	        /**
	         * Implements the identity function.
	         * @param value - A value to return.
	         * @returns Returns the given value.
	         */

	    }, {
	        key: 'fireEvent',

	        /**
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
	         */
	        value: function fireEvent(eventName) {
	            var callOnlyOptionsMethod = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	            var scope = arguments.length <= 2 || arguments[2] === undefined ? this : arguments[2];

	            var eventHandlerName = 'on' + this.constructor.stringCapitalize(eventName);

	            for (var _len8 = arguments.length, additionalArguments = Array(_len8 > 3 ? _len8 - 3 : 0), _key9 = 3; _key9 < _len8; _key9++) {
	                additionalArguments[_key9 - 3] = arguments[_key9];
	            }

	            if (!callOnlyOptionsMethod) if (eventHandlerName in scope) scope[eventHandlerName].apply(scope, additionalArguments);else if ('_' + eventHandlerName in scope) scope['_' + eventHandlerName].apply(scope, additionalArguments);
	            if (scope._options && eventHandlerName in scope._options) {
	                scope._options[eventHandlerName].apply(scope, additionalArguments);
	                return true;
	            }
	            return false;
	        }
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * A wrapper method for "$.on()". It sets current plugin name as event
	         * scope if no scope is given. Given arguments are modified and passed
	         * through "$.on()".
	         * @returns Returns $'s grabbed dom node.
	         */

	    }, {
	        key: 'on',
	        value: function on() {
	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            return this._bindEventHelper(arguments, false);
	        }
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * A wrapper method fo "$.off()". It sets current plugin name as event
	         * scope if no scope is given. Given arguments are modified and passed
	         * through "$.off()".
	         * @returns Returns $'s grabbed dom node.
	         */

	    }, {
	        key: 'off',
	        value: function off() {
	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            return this._bindEventHelper(arguments, true, 'off');
	        }
	        // / endregion
	        // / region object
	        /**
	         * Determine the internal JavaScript [[Class]] of an object.
	         * @param object - Object to analyze.
	         * @returns Name of determined class.
	         */

	    }, {
	        key: 'normalizeDomNodeSelector',

	        /**
	         * Converts a dom selector to a prefixed dom selector string.
	         * @param selector - A dom node selector.
	         * @returns Returns given selector prefixed.
	         */
	        value: function normalizeDomNodeSelector(selector) {
	            var domNodeSelectorPrefix = '';
	            if (this._options.domNodeSelectorPrefix) domNodeSelectorPrefix = this._options.domNodeSelectorPrefix + ' ';
	            if (!(selector.startsWith(domNodeSelectorPrefix) || selector.trim().startsWith('<'))) selector = domNodeSelectorPrefix + selector;
	            return selector.trim();
	        }
	        // / endregion
	        // / region number
	        /**
	         * Checks if given object is java scripts native "Number.NaN" object.
	         * @param object - Object to Check.
	         * @returns Returns whether given value is not a number or not.
	         */

	    }, {
	        key: 'sendToExternalURL',

	        /**
	         * Send given data to a temporary created iframe.
	         * @param url - URL to send to data to.
	         * @param data - Data holding object to send data to.
	         * @param requestType - The forms action attribute value. If nothing is
	         * provided "post" will be used as default.
	         * @param removeAfterLoad - Indicates if created iframe should be removed
	         * right after load event.
	         * @returns Returns the dynamically created iframe.
	         */
	        value: function sendToExternalURL(url, data) {
	            var requestType = arguments.length <= 2 || arguments[2] === undefined ? 'post' : arguments[2];
	            var removeAfterLoad = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	            var $iFrameDomNode = $('<iframe>').attr('name', this.constructor._name.charAt(0).toLowerCase() + this.constructor._name.substring(1) + new Date().getTime()).hide();
	            this.$domNode.after($iFrameDomNode);
	            return this.constructor.sendToIFrame($iFrameDomNode, url, data, requestType, removeAfterLoad);
	        }
	        // / endregion
	        // endregion
	        // region protected
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * Helper method for attach event handler methods and their event handler
	         * remove pendants.
	         * @param parameter - Arguments object given to methods like "bind()" or
	         * "unbind()".
	         * @param removeEvent - Indicates if "unbind()" or "bind()" was given.
	         * @param eventFunctionName - Name of function to wrap.
	         * @returns Returns $'s wrapped dom node.
	         */

	    }, {
	        key: '_bindEventHelper',
	        value: function _bindEventHelper(parameter) {
	            var removeEvent = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];
	            var eventFunctionName = arguments.length <= 2 || arguments[2] === undefined ? 'on' : arguments[2];

	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            var $domNode = $(parameter[0]);
	            if (this.constructor.determineType(parameter[1]) === 'object' && !removeEvent) {
	                for (var eventType in parameter[1]) {
	                    if (parameter[1].hasOwnProperty(eventType))
	                        // IgnoreTypeCheck
	                        this[eventFunctionName]($domNode, eventType, parameter[1][eventType]);
	                }return $domNode;
	            }
	            parameter = this.constructor.arrayMake(parameter).slice(1);
	            if (parameter.length === 0) parameter.push('');
	            if (!parameter[0].includes('.')) parameter[0] += '.' + this.constructor._name;
	            if (removeEvent) return $domNode[eventFunctionName].apply($domNode, parameter);
	            return $domNode[eventFunctionName].apply($domNode, parameter);
	        }
	        // endregion

	    }], [{
	        key: 'isNumeric',
	        value: function isNumeric(object) {
	            var type = Tools.determineType(object);
	            /*
	                NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
	                misinterprets leading-number strings, particularly hex literals
	                ("0x...") subtraction forces infinities to NaN.
	            */
	            return ['number', 'string'].includes(type) && !isNaN(object - parseFloat(object));
	        }
	        /**
	         * Determine whether the argument is a window.
	         * @param object - Object to check for.
	         * @returns Boolean value indicating the result.
	         */

	    }, {
	        key: 'isWindow',
	        value: function isWindow(object) {
	            return ![undefined, null].includes(object) && (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && 'window' in object && object === object.window;
	        }
	        /**
	         * Checks if given object is similar to an array and can be handled like an
	         * array.
	         * @param object - Object to check behavior for.
	         * @returns A boolean value indicating whether given object is array like.
	         */

	    }, {
	        key: 'isArrayLike',
	        value: function isArrayLike(object) {
	            var length = void 0;
	            try {
	                length = Boolean(object) && 'length' in object && object.length;
	            } catch (error) {
	                return false;
	            }
	            var type = Tools.determineType(object);
	            if (type === 'function' || Tools.isWindow(object)) return false;
	            if (type === 'array' || length === 0) return true;
	            if (typeof length === 'number' && length > 0) try {
	                /* eslint-disable no-unused-expressions */
	                object[length - 1];
	                /* eslint-enable no-unused-expressions */
	                return true;
	            } catch (error) {}
	            return false;
	        }
	        /**
	         * Checks whether one of the given pattern matches given string.
	         * @param target - Target to check in pattern for.
	         * @param pattern - List of pattern to check for.
	         * @returns Value "true" if given object is matches by at leas one of the
	         * given pattern and "false" otherwise.
	         */

	    }, {
	        key: 'isAnyMatching',
	        value: function isAnyMatching(target, pattern) {
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;

	            try {
	                for (var _iterator5 = (0, _getIterator3.default)(pattern), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var currentPattern = _step5.value;

	                    if (typeof currentPattern === 'string') {
	                        if (currentPattern === target) return true;
	                    } else if (currentPattern.test(target)) return true;
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }

	            return false;
	        }
	        /**
	         * Checks whether given object is a plain native object.
	         * @param object - Object to check.
	         * @returns Value "true" if given object is a plain javaScript object and
	         * "false" otherwise.
	         */

	    }, {
	        key: 'isPlainObject',
	        value: function isPlainObject(object) {
	            return (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && object !== null && (0, _getPrototypeOf2.default)(object) === Object.prototype;
	        }
	        /**
	         * Checks whether given object is a function.
	         * @param object - Object to check.
	         * @returns Value "true" if given object is a function and "false"
	         * otherwise.
	         */

	    }, {
	        key: 'isFunction',
	        value: function isFunction(object) {
	            return Boolean(object) && {}.toString.call(object) === '[object Function]';
	        }
	        // / endregion
	        // / region language fixes
	        /**
	         * This method fixes an ugly javaScript bug. If you add a mouseout event
	         * listener to a dom node the given handler will be called each time any
	         * dom node inside the observed dom node triggers a mouseout event. This
	         * methods guarantees that the given event handler is only called if the
	         * observed dom node was leaved.
	         * @param eventHandler - The mouse out event handler.
	         * @returns Returns the given function wrapped by the workaround logic.
	         */

	    }, {
	        key: 'mouseOutEventHandlerFix',
	        value: function mouseOutEventHandlerFix(eventHandler) {
	            var self = this;
	            return function (event) {
	                var relatedTarget = event.toElement;
	                if ('relatedTarget' in event) relatedTarget = event.relatedTarget;
	                while (relatedTarget && relatedTarget.tagName !== 'BODY') {
	                    if (relatedTarget === this) return;
	                    relatedTarget = relatedTarget.parentNode;
	                }
	                return eventHandler.apply(self, arguments);
	            };
	        }
	    }, {
	        key: 'show',
	        value: function show(object) {
	            var level = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];
	            var currentLevel = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            var output = '';
	            if (Tools.determineType(object) === 'object') {
	                for (var _key10 in object) {
	                    if (object.hasOwnProperty(_key10)) {
	                        output += _key10.toString() + ': ';
	                        if (currentLevel <= level) output += Tools.show(object[_key10], level, currentLevel + 1);else output += '' + object[_key10];
	                        output += '\n';
	                    }
	                }return output.trim();
	            }
	            output = ('' + object).trim();
	            return output + ' (Type: "' + Tools.determineType(object) + '")';
	        }
	    }, {
	        key: 'isEquivalentDom',
	        value: function isEquivalentDom(first, second) {
	            var forceHTMLString = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            if (first === second) return true;
	            if (first && second) {
	                var detemermineHTMLPattern = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
	                var inputs = { first: first, second: second };
	                var $domNodes = {
	                    first: $('<dummy>'), second: $('<dummy>')
	                };
	                /*
	                    NOTE: Assume that strings that start "<" and end with ">" are
	                    markup and skip the more expensive regular expression check.
	                */
	                var _arr2 = ['first', 'second'];
	                for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
	                    var type = _arr2[_i2];
	                    if (typeof inputs[type] === 'string' && (forceHTMLString || inputs[type].startsWith('<') && inputs[type].endsWith('>') && inputs[type].length >= 3 || detemermineHTMLPattern.test(inputs[type]))) $domNodes[type] = $('<div>' + inputs[type] + '</div>');else try {
	                        var $selectedDomNode = $(inputs[type]);
	                        if ($selectedDomNode.length) $domNodes[type] = $('<div>').append($selectedDomNode.clone());else return false;
	                    } catch (error) {
	                        return false;
	                    }
	                }if ($domNodes.first.length && $domNodes.first.length === $domNodes.second.length) {
	                    $domNodes.first = $domNodes.first.Tools('normalizeClassNames').$domNode.Tools('normalizeStyles').$domNode;
	                    $domNodes.second = $domNodes.second.Tools('normalizeClassNames').$domNode.Tools('normalizeStyles').$domNode;
	                    var index = 0;
	                    var _iteratorNormalCompletion6 = true;
	                    var _didIteratorError6 = false;
	                    var _iteratorError6 = undefined;

	                    try {
	                        for (var _iterator6 = (0, _getIterator3.default)($domNodes.first), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                            var _domNode = _step6.value;

	                            if (!_domNode.isEqualNode($domNodes.second[index])) return false;
	                        }
	                    } catch (err) {
	                        _didIteratorError6 = true;
	                        _iteratorError6 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                                _iterator6.return();
	                            }
	                        } finally {
	                            if (_didIteratorError6) {
	                                throw _iteratorError6;
	                            }
	                        }
	                    }

	                    return true;
	                }
	            }
	            return false;
	        }
	    }, {
	        key: 'generateDirectiveSelector',
	        value: function generateDirectiveSelector(directiveName) {
	            var delimitedName = Tools.stringCamelCaseToDelimited(directiveName);
	            return delimitedName + ', .' + delimitedName + ', [' + delimitedName + '], ' + ('[data-' + delimitedName + '], [x-' + delimitedName + ']') + (delimitedName.includes('-') ? ', [' + delimitedName.replace(/-/g, '\\:') + '], ' + ('[' + delimitedName.replace(/-/g, '_') + ']') : '');
	        }
	    }, {
	        key: 'getNormalizedDirectiveName',
	        value: function getNormalizedDirectiveName(directiveName) {
	            var _arr3 = ['-', ':', '_'];

	            for (var _i3 = 0; _i3 < _arr3.length; _i3++) {
	                var delimiter = _arr3[_i3];
	                var prefixFound = false;
	                var _arr5 = ['data' + delimiter, 'x' + delimiter];
	                for (var _i5 = 0; _i5 < _arr5.length; _i5++) {
	                    var prefix = _arr5[_i5];
	                    if (directiveName.startsWith(prefix)) {
	                        directiveName = directiveName.substring(prefix.length);
	                        prefixFound = true;
	                        break;
	                    }
	                }if (prefixFound) break;
	            }
	            var _arr4 = ['-', ':', '_'];
	            for (var _i4 = 0; _i4 < _arr4.length; _i4++) {
	                var _delimiter = _arr4[_i4];
	                directiveName = Tools.stringDelimitedToCamelCase(directiveName, _delimiter);
	            }return directiveName;
	        }
	    }, {
	        key: 'getDomNodeName',
	        value: function getDomNodeName(domNodeSelector) {
	            var match = domNodeSelector.match(new RegExp('^<?([a-zA-Z]+).*>?.*'));
	            if (match) return match[1];
	            return null;
	        }
	    }, {
	        key: 'isolateScope',
	        value: function isolateScope(scope) {
	            var prefixesToIgnore = arguments.length <= 1 || arguments[1] === undefined ? ['$', '_'] : arguments[1];

	            for (var _name3 in scope) {
	                if (!(prefixesToIgnore.includes(_name3.charAt(0)) || ['this', 'constructor'].includes(_name3) || scope.hasOwnProperty(_name3)))
	                    /*
	                        NOTE: Delete ("delete $scope[name]") doesn't destroy the
	                        automatic lookup to parent scope.
	                    */
	                    scope[_name3] = undefined;
	            }return scope;
	        }
	        /**
	         * Generates a unique name in given scope (usefull for jsonp requests).
	         * @param prefix - A prefix which will be preprended to uniqe name.
	         * @param suffix - A suffix which will be preprended to uniqe name.
	         * @param scope - A scope where the name should be unique.
	         * @param initialUniqueName - An initial scope name to use if not exists.
	         * @returns The function name.
	         */

	    }, {
	        key: 'determineUniqueScopeName',
	        value: function determineUniqueScopeName() {
	            var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'callback' : arguments[0];
	            var suffix = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
	            var scope = arguments.length <= 2 || arguments[2] === undefined ? $.global : arguments[2];
	            var initialUniqueName = arguments.length <= 3 || arguments[3] === undefined ? '' : arguments[3];

	            if (initialUniqueName.length && !(initialUniqueName in scope)) return initialUniqueName;
	            var uniqueName = prefix + suffix;
	            while (true) {
	                uniqueName = prefix + parseInt(Math.random() * Math.pow(10, 10), 10) + suffix;
	                if (!(uniqueName in scope)) break;
	            }
	            return uniqueName;
	        }
	    }, {
	        key: 'identity',
	        value: function identity(value) {
	            return value;
	        }
	        /**
	         * Inverted filter helper to inverse each given filter.
	         * @param filter - A function that filters an array.
	         * @returns The inverted filter.
	         */

	    }, {
	        key: 'invertArrayFilter',
	        value: function invertArrayFilter(filter) {
	            return function (data) {
	                if (data) {
	                    var filteredData = filter.apply(this, arguments);
	                    var result = [];
	                    /* eslint-disable curly */
	                    if (filteredData.length) {
	                        var _iteratorNormalCompletion7 = true;
	                        var _didIteratorError7 = false;
	                        var _iteratorError7 = undefined;

	                        try {
	                            for (var _iterator7 = (0, _getIterator3.default)(data), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                                var date = _step7.value;

	                                if (!filteredData.includes(date)) result.push(date);
	                            }
	                        } catch (err) {
	                            _didIteratorError7 = true;
	                            _iteratorError7 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                    _iterator7.return();
	                                }
	                            } finally {
	                                if (_didIteratorError7) {
	                                    throw _iteratorError7;
	                                }
	                            }
	                        }
	                    } else
	                        /* eslint-enable curly */
	                        result = data;
	                    return result;
	                }
	                return data;
	            };
	        }
	        // / endregion
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
	         */

	    }, {
	        key: 'debounce',
	        value: function debounce(eventFunction) {
	            for (var _len9 = arguments.length, additionalArguments = Array(_len9 > 2 ? _len9 - 2 : 0), _key11 = 2; _key11 < _len9; _key11++) {
	                additionalArguments[_key11 - 2] = arguments[_key11];
	            }

	            var thresholdInMilliseconds = arguments.length <= 1 || arguments[1] === undefined ? 600 : arguments[1];

	            var lock = false;
	            var waitingCallArguments = null;
	            var timeoutID = null;
	            return function () {
	                var _this2 = this;

	                var parameter = Tools.arrayMake(arguments);
	                if (lock) waitingCallArguments = parameter.concat(additionalArguments || []);else {
	                    lock = true;
	                    timeoutID = setTimeout(function () {
	                        lock = false;
	                        if (waitingCallArguments) {
	                            eventFunction.apply(_this2, waitingCallArguments);
	                            waitingCallArguments = null;
	                        }
	                    }, thresholdInMilliseconds);
	                    eventFunction.apply(this, parameter.concat(additionalArguments || []));
	                }
	                return timeoutID;
	            };
	        }
	    }, {
	        key: 'determineType',
	        value: function determineType() {
	            var object = arguments.length <= 0 || arguments[0] === undefined ? undefined : arguments[0];

	            if ([undefined, null].includes(object)) return '' + object;
	            if (['object', 'function'].includes(typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) && 'toString' in object) {
	                var stringRepresentation = Tools.classToTypeMapping.toString.call(object);
	                if (Tools.classToTypeMapping.hasOwnProperty(stringRepresentation)) return Tools.classToTypeMapping[stringRepresentation];
	            }
	            return typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object);
	        }
	        /**
	         * Replaces given pattern in each value in given object recursively with
	         * given string replacement.
	         * @param object - Object to convert substrings in.
	         * @param pattern - Regular expression to replace.
	         * @param replacement - String to use as replacement for found patterns.
	         * @returns Converted object with replaced patterns.
	         */

	    }, {
	        key: 'convertSubstringInPlainObject',
	        value: function convertSubstringInPlainObject(object, pattern, replacement) {
	            for (var _key12 in object) {
	                if (object.hasOwnProperty(_key12)) if (Tools.isPlainObject(object[_key12])) object[_key12] = Tools.convertSubstringInPlainObject(object[_key12], pattern, replacement);else if (typeof object[_key12] === 'string') object[_key12] = object[_key12].replace(pattern, replacement);
	            }return object;
	        }
	        /**
	         * Extends given target object with given sources object. As target and
	         * sources many expandable types are allowed but target and sources have to
	         * to come from the same type.
	         * @param targetOrDeepIndicator - Maybe the target or deep indicator.
	         * @param _targetAndOrSources - Target and at least one source object.
	         * @returns Returns given target extended with all given sources.
	         */

	    }, {
	        key: 'extendObject',
	        value: function extendObject(targetOrDeepIndicator) {
	            for (var _len10 = arguments.length, _targetAndOrSources = Array(_len10 > 1 ? _len10 - 1 : 0), _key13 = 1; _key13 < _len10; _key13++) {
	                _targetAndOrSources[_key13 - 1] = arguments[_key13];
	            }

	            var index = 1;
	            var deep = false;
	            var target = void 0;
	            if (typeof targetOrDeepIndicator === 'boolean') {
	                // Handle a deep copy situation and skip deep indicator and target.
	                deep = targetOrDeepIndicator;
	                target = arguments[index];
	                index = 2;
	            } else target = targetOrDeepIndicator;
	            var mergeValue = function mergeValue(key, value, targetValue) {
	                if (value === targetValue) return targetValue;
	                // Recurse if we're merging plain objects or maps.
	                if (deep && value && (Tools.isPlainObject(value) || value instanceof _map2.default)) {
	                    var clone = void 0;
	                    if (value instanceof _map2.default) clone = targetValue && targetValue instanceof _map2.default ? targetValue : new _map2.default();else clone = targetValue && Tools.isPlainObject(targetValue) ? targetValue : {};
	                    return Tools.extendObject(deep, clone, value);
	                }
	                return value;
	            };
	            while (index < arguments.length) {
	                var source = arguments[index];
	                var targetType = typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target);
	                var sourceType = typeof source === 'undefined' ? 'undefined' : (0, _typeof3.default)(source);
	                if (target instanceof _map2.default) targetType += ' Map';
	                if (source instanceof _map2.default) sourceType += ' Map';
	                if (targetType === sourceType && target !== source) {
	                    if (target instanceof _map2.default && source instanceof _map2.default) {
	                        var _iteratorNormalCompletion8 = true;
	                        var _didIteratorError8 = false;
	                        var _iteratorError8 = undefined;

	                        try {
	                            for (var _iterator8 = (0, _getIterator3.default)(source), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                                var _step8$value = (0, _slicedToArray3.default)(_step8.value, 2);

	                                var _key14 = _step8$value[0];
	                                var _value2 = _step8$value[1];

	                                target.set(_key14, mergeValue(_key14, _value2, target.get(_key14)));
	                            }
	                        } catch (err) {
	                            _didIteratorError8 = true;
	                            _iteratorError8 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                                    _iterator8.return();
	                                }
	                            } finally {
	                                if (_didIteratorError8) {
	                                    throw _iteratorError8;
	                                }
	                            }
	                        }
	                    } else if (target !== null && !Array.isArray(target) && (typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) === 'object' && source !== null && !Array.isArray(source) && (typeof source === 'undefined' ? 'undefined' : (0, _typeof3.default)(source)) === 'object') {
	                        for (var _key15 in source) {
	                            if (source.hasOwnProperty(_key15)) target[_key15] = mergeValue(_key15, source[_key15], target[_key15]);
	                        }
	                    } else target = source;
	                } else target = source;
	                index += 1;
	            }
	            return target;
	        }
	        /**
	         * Removes a proxies from given data structure recursivley.
	         * @param object - Object to proxy.
	         * @param seenObjects - Tracks all already processed obejcts to avoid
	         * endless loops (usually only needed for internal prupose).
	         * @returns Returns given object unwrapped from a dynamic proxy.
	         */

	    }, {
	        key: 'unwrapProxy',
	        value: function unwrapProxy(object) {
	            var seenObjects = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            if (object !== null && (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object') {
	                while (object.__target__) {
	                    object = object.__target__;
	                }var index = seenObjects.indexOf(object);
	                if (index !== -1) return seenObjects[index];
	                seenObjects.push(object);
	                if (Array.isArray(object)) {
	                    var _index = 0;
	                    var _iteratorNormalCompletion9 = true;
	                    var _didIteratorError9 = false;
	                    var _iteratorError9 = undefined;

	                    try {
	                        for (var _iterator9 = (0, _getIterator3.default)(object), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
	                            var _value3 = _step9.value;

	                            object[_index] = Tools.unwrapProxy(_value3, seenObjects);
	                            _index += 1;
	                        }
	                    } catch (err) {
	                        _didIteratorError9 = true;
	                        _iteratorError9 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion9 && _iterator9.return) {
	                                _iterator9.return();
	                            }
	                        } finally {
	                            if (_didIteratorError9) {
	                                throw _iteratorError9;
	                            }
	                        }
	                    }
	                } else if (object instanceof _map2.default) {
	                    var _iteratorNormalCompletion10 = true;
	                    var _didIteratorError10 = false;
	                    var _iteratorError10 = undefined;

	                    try {
	                        for (var _iterator10 = (0, _getIterator3.default)(object), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
	                            var _step10$value = (0, _slicedToArray3.default)(_step10.value, 2);

	                            var _key16 = _step10$value[0];
	                            var _value4 = _step10$value[1];

	                            object.set(_key16, Tools.unwrapProxy(_value4, seenObjects));
	                        }
	                    } catch (err) {
	                        _didIteratorError10 = true;
	                        _iteratorError10 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
	                                _iterator10.return();
	                            }
	                        } finally {
	                            if (_didIteratorError10) {
	                                throw _iteratorError10;
	                            }
	                        }
	                    }
	                } else for (var _key17 in object) {
	                    if (object.hasOwnProperty(_key17)) object[_key17] = Tools.unwrapProxy(object[_key17], seenObjects);
	                }
	            }
	            return object;
	        }
	        /**
	         * Adds dynamic getter and setter to any given data structure such as maps.
	         * @param object - Object to proxy.
	         * @param getterWrapper - Function to wrap each property get.
	         * @param setterWrapper - Function to wrap each property set.
	         * @param getterMethodName - Method name to get a stored value by key.
	         * @param setterMethodName - Method name to set a stored value by key.
	         * @param containesMethodName - Method name to indicate if a key is stored
	         * in given data structure.
	         * @param deep - Indicates to perform a deep wrapping of specified types.
	         * performed via "value instanceof type".).
	         * @param typesToExtend - Types which should be extended (Checks are
	         * performed via "value instanceof type".).
	         * @returns Returns given object wrapped with a dynamic getter proxy.
	         */

	    }, {
	        key: 'addDynamicGetterAndSetter',
	        value: function addDynamicGetterAndSetter(object) {
	            var getterWrapper = arguments.length <= 1 || arguments[1] === undefined ? function (value) {
	                return value;
	            } : arguments[1];
	            var setterWrapper = arguments.length <= 2 || arguments[2] === undefined ? function (key, value) {
	                return value;
	            } : arguments[2];
	            var getterMethodName = arguments.length <= 3 || arguments[3] === undefined ? '[]' : arguments[3];
	            var setterMethodName = arguments.length <= 4 || arguments[4] === undefined ? '[]' : arguments[4];
	            var containesMethodName = arguments.length <= 5 || arguments[5] === undefined ? 'hasOwnProperty' : arguments[5];
	            var deep = arguments.length <= 6 || arguments[6] === undefined ? true : arguments[6];
	            var typesToExtend = arguments.length <= 7 || arguments[7] === undefined ? [Object] : arguments[7];

	            if (deep) if (object instanceof _map2.default) {
	                var _iteratorNormalCompletion11 = true;
	                var _didIteratorError11 = false;
	                var _iteratorError11 = undefined;

	                try {
	                    for (var _iterator11 = (0, _getIterator3.default)(object), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
	                        var _step11$value = (0, _slicedToArray3.default)(_step11.value, 2);

	                        var _key18 = _step11$value[0];
	                        var _value5 = _step11$value[1];

	                        object.set(_key18, Tools.addDynamicGetterAndSetter(_value5, getterWrapper, setterWrapper, getterMethodName, setterMethodName, containesMethodName, deep, typesToExtend));
	                    }
	                } catch (err) {
	                    _didIteratorError11 = true;
	                    _iteratorError11 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion11 && _iterator11.return) {
	                            _iterator11.return();
	                        }
	                    } finally {
	                        if (_didIteratorError11) {
	                            throw _iteratorError11;
	                        }
	                    }
	                }
	            } else if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && object !== null) {
	                for (var _key19 in object) {
	                    if (object.hasOwnProperty(_key19)) object[_key19] = Tools.addDynamicGetterAndSetter(object[_key19], getterWrapper, setterWrapper, getterMethodName, setterMethodName, containesMethodName, deep, typesToExtend);
	                }
	            } else if (Array.isArray(object)) {
	                var index = 0;
	                var _iteratorNormalCompletion12 = true;
	                var _didIteratorError12 = false;
	                var _iteratorError12 = undefined;

	                try {
	                    for (var _iterator12 = (0, _getIterator3.default)(object), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
	                        var _value6 = _step12.value;

	                        object[index] = Tools.addDynamicGetterAndSetter(_value6, getterWrapper, setterWrapper, getterMethodName, setterMethodName, containesMethodName, deep, typesToExtend);
	                        index += 1;
	                    }
	                } catch (err) {
	                    _didIteratorError12 = true;
	                    _iteratorError12 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion12 && _iterator12.return) {
	                            _iterator12.return();
	                        }
	                    } finally {
	                        if (_didIteratorError12) {
	                            throw _iteratorError12;
	                        }
	                    }
	                }
	            }
	            var _iteratorNormalCompletion13 = true;
	            var _didIteratorError13 = false;
	            var _iteratorError13 = undefined;

	            try {
	                for (var _iterator13 = (0, _getIterator3.default)(typesToExtend), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
	                    var type = _step13.value;

	                    if (object instanceof type) {
	                        if (object.__target__) return object;
	                        var handler = {};
	                        if (containesMethodName) handler.has = function (target, name) {
	                            if (containesMethodName === '[]') return name in target;
	                            return target[containesMethodName](name);
	                        };
	                        if (containesMethodName && getterMethodName) handler.get = function (target, name) {
	                            if (name === '__target__') return target;
	                            if (typeof target[name] === 'function') return target[name].bind(target);
	                            if (target[containesMethodName](name)) {
	                                if (getterMethodName === '[]') return getterWrapper(target[name]);
	                                return getterWrapper(target[getterMethodName](name));
	                            }
	                            return target[name];
	                        };
	                        if (setterMethodName) handler.set = function (target, name, value) {
	                            if (setterMethodName === '[]') target[name] = setterWrapper(name, value);else target[setterMethodName](name, setterWrapper(name, value));
	                        };
	                        // IgnoreTypeCheck
	                        return new Proxy(object, handler);
	                    }
	                }
	            } catch (err) {
	                _didIteratorError13 = true;
	                _iteratorError13 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion13 && _iterator13.return) {
	                        _iterator13.return();
	                    }
	                } finally {
	                    if (_didIteratorError13) {
	                        throw _iteratorError13;
	                    }
	                }
	            }

	            return object;
	        }
	        /**
	         * Searches for nested mappings with given indicator key and resolves
	         * marked values. Additionally all objects are wrapped with a proxy to
	         * dynamically resolve nested properties.
	         * @param object - Given mapping to resolve.
	         * @param parameterDescription - Array of scope names.
	         * @param parameter - Array of values for given scope names. If there is
	         * one missing given object will be added.
	         * @param deep - Indicates whether to perform a recursive resolving.
	         * @param evaluationIndicatorKey - Indicator property name to mark a value
	         * to evaluate.
	         * @param executionIndicatorKey - Indicator property name to mark a value
	         * to evaluate.
	         * @returns Evaluated given mapping.
	         */

	    }, {
	        key: 'resolveDynamicDataStructure',
	        value: function resolveDynamicDataStructure(object) {
	            var parameterDescription = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	            var parameter = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	            var deep = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];
	            var evaluationIndicatorKey = arguments.length <= 4 || arguments[4] === undefined ? '__evaluate__' : arguments[4];
	            var executionIndicatorKey = arguments.length <= 5 || arguments[5] === undefined ? '__execute__' : arguments[5];

	            if (object === null || (typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) !== 'object') return object;
	            var configuration = object;
	            if (deep && configuration && !configuration.__target__) configuration = Tools.addDynamicGetterAndSetter(Tools.copyLimitedRecursively(object), function (value) {
	                return Tools.resolveDynamicDataStructure(value, parameterDescription, parameter, false, evaluationIndicatorKey, executionIndicatorKey);
	            }, function (key, value) {
	                return value;
	            }, '[]', '');
	            if (parameterDescription.length > parameter.length) parameter.push(configuration);
	            if (Array.isArray(object) && deep) {
	                var index = 0;
	                var _iteratorNormalCompletion14 = true;
	                var _didIteratorError14 = false;
	                var _iteratorError14 = undefined;

	                try {
	                    for (var _iterator14 = (0, _getIterator3.default)(object), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
	                        var _value7 = _step14.value;

	                        object[index] = Tools.resolveDynamicDataStructure(_value7, parameterDescription, parameter, deep, evaluationIndicatorKey, executionIndicatorKey);
	                        index += 1;
	                    }
	                } catch (err) {
	                    _didIteratorError14 = true;
	                    _iteratorError14 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion14 && _iterator14.return) {
	                            _iterator14.return();
	                        }
	                    } finally {
	                        if (_didIteratorError14) {
	                            throw _iteratorError14;
	                        }
	                    }
	                }
	            } else for (var _key20 in object) {
	                if (object.hasOwnProperty(_key20)) if ([evaluationIndicatorKey, executionIndicatorKey].includes(_key20)) try {
	                    return Tools.resolveDynamicDataStructure(new (
	                    // IgnoreTypeCheck
	                    Function.prototype.bind.apply(Function, [null].concat(parameterDescription).concat((_key20 === evaluationIndicatorKey ? 'return ' : '') + object[_key20])))().apply(null, parameter), parameterDescription, parameter, false, evaluationIndicatorKey, executionIndicatorKey);
	                } catch (error) {
	                    throw Error('Error during ' + (_key20 === evaluationIndicatorKey ? 'executing' : 'evaluating') + (' "' + object[_key20] + '": ' + error));
	                } else if (deep) object[_key20] = Tools.resolveDynamicDataStructure(object[_key20], parameterDescription, parameter, deep, evaluationIndicatorKey, executionIndicatorKey);
	            }return object;
	        }
	        /**
	         * Converts given object into its serialized json representation by
	         * replacing circular references with a given provided value.
	         * @param object - Object to serialize.
	         * @param determineCicularReferenceValue - Callback to create a fallback
	         * value depending on given redundant value.
	         * @param numberOfSpaces - Number of spaces to use for string formatting.
	         */

	    }, {
	        key: 'convertCircularObjectToJSON',
	        value: function convertCircularObjectToJSON(object) {
	            var determineCicularReferenceValue = arguments.length <= 1 || arguments[1] === undefined ? function () {
	                return '__circularReference__';
	            } : arguments[1];
	            var numberOfSpaces = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            var seenObjects = [];
	            return (0, _stringify2.default)(object, function (key, value) {
	                if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value !== null) {
	                    if (seenObjects.includes(value)) return determineCicularReferenceValue(key, value, seenObjects);
	                    seenObjects.push(value);
	                    return value;
	                }
	                return value;
	            }, numberOfSpaces);
	        }
	        /**
	         * Converts given plain object and all nested found objects to
	         * corresponding map.
	         * @param object - Object to convert to.
	         * @param deep - Indicates whether to perform a recursive conversion.
	         * @returns Given object as map.
	         */

	    }, {
	        key: 'convertPlainObjectToMap',
	        value: function convertPlainObjectToMap(object) {
	            var deep = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && Tools.isPlainObject(object)) {
	                var newObject = new _map2.default();
	                for (var _key21 in object) {
	                    if (object.hasOwnProperty(_key21)) {
	                        if (deep) object[_key21] = Tools.convertPlainObjectToMap(object[_key21], deep);
	                        newObject.set(_key21, object[_key21]);
	                    }
	                }return newObject;
	            }
	            if (deep) if (Array.isArray(object)) {
	                var index = 0;
	                var _iteratorNormalCompletion15 = true;
	                var _didIteratorError15 = false;
	                var _iteratorError15 = undefined;

	                try {
	                    for (var _iterator15 = (0, _getIterator3.default)(object), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
	                        var _value8 = _step15.value;

	                        object[index] = Tools.convertPlainObjectToMap(_value8, deep);
	                        index += 1;
	                    }
	                } catch (err) {
	                    _didIteratorError15 = true;
	                    _iteratorError15 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion15 && _iterator15.return) {
	                            _iterator15.return();
	                        }
	                    } finally {
	                        if (_didIteratorError15) {
	                            throw _iteratorError15;
	                        }
	                    }
	                }
	            } else if (object instanceof _map2.default) {
	                var _iteratorNormalCompletion16 = true;
	                var _didIteratorError16 = false;
	                var _iteratorError16 = undefined;

	                try {
	                    for (var _iterator16 = (0, _getIterator3.default)(object), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
	                        var _step16$value = (0, _slicedToArray3.default)(_step16.value, 2);

	                        var _key22 = _step16$value[0];
	                        var _value9 = _step16$value[1];

	                        object.set(_key22, Tools.convertPlainObjectToMap(_value9, deep));
	                    }
	                } catch (err) {
	                    _didIteratorError16 = true;
	                    _iteratorError16 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion16 && _iterator16.return) {
	                            _iterator16.return();
	                        }
	                    } finally {
	                        if (_didIteratorError16) {
	                            throw _iteratorError16;
	                        }
	                    }
	                }
	            }
	            return object;
	        }
	        /**
	         * Converts given map and all nested found maps objects to corresponding
	         * object.
	         * @param object - Map to convert to.
	         * @param deep - Indicates whether to perform a recursive conversion.
	         * @returns Given map as object.
	         */

	    }, {
	        key: 'convertMapToPlainObject',
	        value: function convertMapToPlainObject(object) {
	            var deep = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	            if (object instanceof _map2.default) {
	                var newObject = {};
	                var _iteratorNormalCompletion17 = true;
	                var _didIteratorError17 = false;
	                var _iteratorError17 = undefined;

	                try {
	                    for (var _iterator17 = (0, _getIterator3.default)(object), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
	                        var _step17$value = (0, _slicedToArray3.default)(_step17.value, 2);

	                        var _key23 = _step17$value[0];
	                        var _value10 = _step17$value[1];

	                        if (deep) _value10 = Tools.convertMapToPlainObject(_value10, deep);
	                        newObject['' + _key23] = _value10;
	                    }
	                } catch (err) {
	                    _didIteratorError17 = true;
	                    _iteratorError17 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
	                            _iterator17.return();
	                        }
	                    } finally {
	                        if (_didIteratorError17) {
	                            throw _iteratorError17;
	                        }
	                    }
	                }

	                return newObject;
	            }
	            if (deep) if ((typeof object === 'undefined' ? 'undefined' : (0, _typeof3.default)(object)) === 'object' && Tools.isPlainObject(object)) {
	                for (var _key24 in object) {
	                    if (object.hasOwnProperty(_key24)) object[_key24] = Tools.convertMapToPlainObject(object[_key24], deep);
	                }
	            } else if (Array.isArray(object)) {
	                var index = 0;
	                var _iteratorNormalCompletion18 = true;
	                var _didIteratorError18 = false;
	                var _iteratorError18 = undefined;

	                try {
	                    for (var _iterator18 = (0, _getIterator3.default)(object), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
	                        var _value11 = _step18.value;

	                        object[index] = Tools.convertMapToPlainObject(_value11, deep);
	                        index += 1;
	                    }
	                } catch (err) {
	                    _didIteratorError18 = true;
	                    _iteratorError18 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion18 && _iterator18.return) {
	                            _iterator18.return();
	                        }
	                    } finally {
	                        if (_didIteratorError18) {
	                            throw _iteratorError18;
	                        }
	                    }
	                }
	            }
	            return object;
	        }
	        /**
	         * Iterates given objects own properties in sorted fashion. For
	         * each key value pair given iterator function will be called with
	         * value and key as arguments.
	         * @param object - Object to iterate.
	         * @param iterator - Function to execute for each key value pair. Value
	         * will be the first and key will be the second argument.
	         * @param context - The "this" binding for given iterator function.
	         * @returns List of given sorted keys.
	         */

	    }, {
	        key: 'forEachSorted',
	        value: function forEachSorted(object, iterator, context) {
	            var keys = Tools.sort(object);
	            var _iteratorNormalCompletion19 = true;
	            var _didIteratorError19 = false;
	            var _iteratorError19 = undefined;

	            try {
	                for (var _iterator19 = (0, _getIterator3.default)(keys), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
	                    var _key25 = _step19.value;

	                    if (object instanceof _map2.default) iterator.call(context, object.get(_key25), _key25);else if (Array.isArray(object) || object instanceof Object) iterator.call(context, object[_key25], _key25);
	                }
	            } catch (err) {
	                _didIteratorError19 = true;
	                _iteratorError19 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion19 && _iterator19.return) {
	                        _iterator19.return();
	                    }
	                } finally {
	                    if (_didIteratorError19) {
	                        throw _iteratorError19;
	                    }
	                }
	            }

	            return keys;
	        }
	        /**
	         * Sort given objects keys.
	         * @param object - Object which keys should be sorted.
	         * @returns Sorted list of given keys.
	         */

	    }, {
	        key: 'sort',
	        value: function sort(object) {
	            var keys = [];
	            if (Array.isArray(object)) for (var index = 0; index < object.length; index++) {
	                keys.push(index);
	            } else if (object instanceof _map2.default) {
	                var _iteratorNormalCompletion20 = true;
	                var _didIteratorError20 = false;
	                var _iteratorError20 = undefined;

	                try {
	                    for (var _iterator20 = (0, _getIterator3.default)(object), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
	                        var _keyValuePair = _step20.value;

	                        keys.push(_keyValuePair[0]);
	                    }
	                } catch (err) {
	                    _didIteratorError20 = true;
	                    _iteratorError20 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion20 && _iterator20.return) {
	                            _iterator20.return();
	                        }
	                    } finally {
	                        if (_didIteratorError20) {
	                            throw _iteratorError20;
	                        }
	                    }
	                }
	            } else if (object instanceof Object) for (var _key26 in object) {
	                if (object.hasOwnProperty(_key26)) keys.push(_key26);
	            }return keys.sort();
	        }
	        /**
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
	         * @returns Value "true" if both objects are equal and "false" otherwise.
	         */

	    }, {
	        key: 'equals',
	        value: function equals(firstValue, secondValue) {
	            var properties = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	            var deep = arguments.length <= 3 || arguments[3] === undefined ? -1 : arguments[3];
	            var exceptionPrefixes = arguments.length <= 4 || arguments[4] === undefined ? ['$', '_'] : arguments[4];
	            var ignoreFunctions = arguments.length <= 5 || arguments[5] === undefined ? true : arguments[5];

	            if (ignoreFunctions && Tools.isFunction(firstValue) && Tools.isFunction(secondValue) || firstValue === secondValue || Tools.numberIsNotANumber(firstValue) && Tools.numberIsNotANumber(secondValue) || firstValue instanceof RegExp && secondValue instanceof RegExp && firstValue.toString() === secondValue.toString() || firstValue instanceof Date && secondValue instanceof Date && (isNaN(firstValue.getTime()) && isNaN(secondValue.getTime()) || !isNaN(firstValue.getTime()) && !isNaN(secondValue.getTime()) && firstValue.getTime() === secondValue.getTime())) return true;
	            if (Tools.isPlainObject(firstValue) && Tools.isPlainObject(secondValue) && !(firstValue instanceof RegExp || secondValue instanceof RegExp) || Array.isArray(firstValue) && Array.isArray(secondValue) && firstValue.length === secondValue.length) {
	                var _arr6 = [[firstValue, secondValue], [secondValue, firstValue]];

	                for (var _i6 = 0; _i6 < _arr6.length; _i6++) {
	                    var _arr6$_i = (0, _slicedToArray3.default)(_arr6[_i6], 2);

	                    var first = _arr6$_i[0];
	                    var second = _arr6$_i[1];

	                    var firstIsArray = Array.isArray(first);
	                    if (firstIsArray && !Array.isArray(second) || first.length !== second.length) return false;
	                    var equal = true;
	                    if (firstIsArray) {
	                        var index = 0;
	                        var _iteratorNormalCompletion21 = true;
	                        var _didIteratorError21 = false;
	                        var _iteratorError21 = undefined;

	                        try {
	                            for (var _iterator21 = (0, _getIterator3.default)(first), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
	                                var _value12 = _step21.value;

	                                if (deep !== 0 && !Tools.equals(_value12, second[index], properties, deep - 1, exceptionPrefixes)) equal = false;
	                                index += 1;
	                            }
	                        } catch (err) {
	                            _didIteratorError21 = true;
	                            _iteratorError21 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion21 && _iterator21.return) {
	                                    _iterator21.return();
	                                }
	                            } finally {
	                                if (_didIteratorError21) {
	                                    throw _iteratorError21;
	                                }
	                            }
	                        }
	                    } else for (var _key27 in first) {
	                        if (first.hasOwnProperty(_key27)) {
	                            if (!equal || properties && !properties.includes(_key27)) break;
	                            var doBreak = false;
	                            var _iteratorNormalCompletion22 = true;
	                            var _didIteratorError22 = false;
	                            var _iteratorError22 = undefined;

	                            try {
	                                for (var _iterator22 = (0, _getIterator3.default)(exceptionPrefixes), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
	                                    var exceptionPrefix = _step22.value;

	                                    if (_key27.toString().startsWith(exceptionPrefix)) {
	                                        doBreak = true;
	                                        break;
	                                    }
	                                }
	                            } catch (err) {
	                                _didIteratorError22 = true;
	                                _iteratorError22 = err;
	                            } finally {
	                                try {
	                                    if (!_iteratorNormalCompletion22 && _iterator22.return) {
	                                        _iterator22.return();
	                                    }
	                                } finally {
	                                    if (_didIteratorError22) {
	                                        throw _iteratorError22;
	                                    }
	                                }
	                            }

	                            if (doBreak) break;
	                            if (deep !== 0 && !Tools.equals(first[_key27], second[_key27], properties, deep - 1, exceptionPrefixes)) equal = false;
	                        }
	                    }if (!equal) return false;
	                }
	                return true;
	            }
	            return false;
	        }
	        /**
	         * Copies given object (of any type) into optionally given destination.
	         * @param source - Object to copy.
	         * @param recursionLimit - Specifies how deep we should traverse into given
	         * object recursively.
	         * @param destination - Target to copy source to.
	         * @param stackSource - Internally used to avoid traversing loops.
	         * @param stackDestination - Internally used to avoid traversing loops and
	         * referencing them correctly.
	         * @param recursionLevel - Internally used to track current recursion
	         * level in given source data structure.
	         * @returns Value "true" if both objects are equal and "false" otherwise.
	         */

	    }, {
	        key: 'copyLimitedRecursively',
	        value: function copyLimitedRecursively(source) {
	            var recursionLimit = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	            var destination = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	            var stackSource = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];
	            var stackDestination = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	            var recursionLevel = arguments.length <= 5 || arguments[5] === undefined ? 0 : arguments[5];

	            if (destination) {
	                if (source === destination) throw Error("Can't copy because source and destination are identical.");
	                if (recursionLimit !== -1 && recursionLimit < recursionLevel) return null;
	                if (![undefined, null].includes(source) && (typeof source === 'undefined' ? 'undefined' : (0, _typeof3.default)(source)) === 'object') {
	                    var index = stackSource.indexOf(source);
	                    if (index !== -1) return stackDestination[index];
	                    stackSource.push(source);
	                    stackDestination.push(destination);
	                }
	                var copyValue = function copyValue(value) {
	                    var result = Tools.copyLimitedRecursively(value, recursionLimit, null, stackSource, stackDestination, recursionLevel + 1);
	                    if (![undefined, null].includes(value) && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
	                        stackSource.push(value);
	                        stackDestination.push(result);
	                    }
	                    return result;
	                };
	                if (Array.isArray(source)) {
	                    var _iteratorNormalCompletion23 = true;
	                    var _didIteratorError23 = false;
	                    var _iteratorError23 = undefined;

	                    try {
	                        for (var _iterator23 = (0, _getIterator3.default)(source), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
	                            var _item = _step23.value;

	                            destination.push(copyValue(_item));
	                        }
	                    } catch (err) {
	                        _didIteratorError23 = true;
	                        _iteratorError23 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion23 && _iterator23.return) {
	                                _iterator23.return();
	                            }
	                        } finally {
	                            if (_didIteratorError23) {
	                                throw _iteratorError23;
	                            }
	                        }
	                    }
	                }if (source instanceof _map2.default) {
	                    var _iteratorNormalCompletion24 = true;
	                    var _didIteratorError24 = false;
	                    var _iteratorError24 = undefined;

	                    try {
	                        for (var _iterator24 = (0, _getIterator3.default)(source), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
	                            var _step24$value = (0, _slicedToArray3.default)(_step24.value, 2);

	                            var _key28 = _step24$value[0];
	                            var _value13 = _step24$value[1];

	                            destination.set(_key28, copyValue(_value13));
	                        }
	                    } catch (err) {
	                        _didIteratorError24 = true;
	                        _iteratorError24 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion24 && _iterator24.return) {
	                                _iterator24.return();
	                            }
	                        } finally {
	                            if (_didIteratorError24) {
	                                throw _iteratorError24;
	                            }
	                        }
	                    }
	                } else for (var _key29 in source) {
	                    if (source.hasOwnProperty(_key29)) destination[_key29] = copyValue(source[_key29]);
	                }
	            } else if (source) {
	                if (Array.isArray(source)) return Tools.copyLimitedRecursively(source, recursionLimit, [], stackSource, stackDestination, recursionLevel);
	                if (source instanceof _map2.default) return Tools.copyLimitedRecursively(source, recursionLimit, new _map2.default(), stackSource, stackDestination, recursionLevel);
	                if (Tools.determineType(source) === 'date') return new Date(source.getTime());
	                if (Tools.determineType(source) === 'regexp') {
	                    destination = new RegExp(source.source, source.toString().match(/[^\/]*$/)[0]);
	                    destination.lastIndex = source.lastIndex;
	                    return destination;
	                }
	                if (![undefined, null].includes(source) && (typeof source === 'undefined' ? 'undefined' : (0, _typeof3.default)(source)) === 'object') return Tools.copyLimitedRecursively(source, recursionLimit, {}, stackSource, stackDestination, recursionLevel);
	            }
	            return destination || source;
	        }
	        // / endregion
	        // / region array
	        /**
	         * Merge the contents of two arrays together into the first array.
	         * @param target - Target array.
	         * @param source - Source array.
	         * @returns Target array with merged given source one.
	         */

	    }, {
	        key: 'arrayMerge',
	        value: function arrayMerge(target, source) {
	            var length = Number(source.length);
	            var sourceIndex = 0;
	            var targetIndex = target.length;
	            for (; sourceIndex < length; sourceIndex++) {
	                target[targetIndex++] = source[sourceIndex];
	            }target.length = targetIndex;
	            return target;
	        }
	        /**
	         * Converts given object into an array.
	         * @param object - Target to convert.
	         * @returns Generated array.
	         */

	    }, {
	        key: 'arrayMake',
	        value: function arrayMake(object) {
	            var result = [];
	            if (![null, undefined].includes(result)) if (Tools.isArrayLike(Object(object))) Tools.arrayMerge(result, typeof object === 'string' ? [object] : object);else result.push(object);
	            return result;
	        }
	        /**
	         * Makes all values in given iterable unique by removing duplicates (The
	         * first occurrences will be left).
	         * @param data - Array like object.
	         * @returns Sliced version of given object.
	         */

	    }, {
	        key: 'arrayUnique',
	        value: function arrayUnique(data) {
	            var result = [];
	            var _iteratorNormalCompletion25 = true;
	            var _didIteratorError25 = false;
	            var _iteratorError25 = undefined;

	            try {
	                for (var _iterator25 = (0, _getIterator3.default)(data), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
	                    var _value14 = _step25.value;

	                    if (!result.includes(_value14)) result.push(_value14);
	                }
	            } catch (err) {
	                _didIteratorError25 = true;
	                _iteratorError25 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion25 && _iterator25.return) {
	                        _iterator25.return();
	                    }
	                } finally {
	                    if (_didIteratorError25) {
	                        throw _iteratorError25;
	                    }
	                }
	            }

	            return result;
	        }
	        /**
	         * Summarizes given property of given item list.
	         * @param data - Array of objects with given property name.
	         * @param propertyName - Property name to summarize.
	         * @param defaultValue - Value to return if property values doesn't match.
	         * @returns Summarized array.
	         */

	    }, {
	        key: 'arrayAggregatePropertyIfEqual',
	        value: function arrayAggregatePropertyIfEqual(data, propertyName) {
	            var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

	            var result = defaultValue;
	            if (data && data.length && data[0].hasOwnProperty(propertyName)) {
	                result = data[0][propertyName];
	                var _iteratorNormalCompletion26 = true;
	                var _didIteratorError26 = false;
	                var _iteratorError26 = undefined;

	                try {
	                    for (var _iterator26 = (0, _getIterator3.default)(data), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
	                        var item = _step26.value;

	                        if (item[propertyName] !== result) return defaultValue;
	                    }
	                } catch (err) {
	                    _didIteratorError26 = true;
	                    _iteratorError26 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion26 && _iterator26.return) {
	                            _iterator26.return();
	                        }
	                    } finally {
	                        if (_didIteratorError26) {
	                            throw _iteratorError26;
	                        }
	                    }
	                }
	            }
	            return result;
	        }
	        /**
	         * Deletes every item witch has only empty attributes for given property
	         * names. If given property names are empty each attribute will be
	         * considered. The empty string, "null" and "undefined" will be interpreted
	         * as empty.
	         * @param data - Data to filter.
	         * @param propertyNames - Properties to consider.
	         * @returns Given data without empty items.
	         */

	    }, {
	        key: 'arrayDeleteEmptyItems',
	        value: function arrayDeleteEmptyItems(data) {
	            var propertyNames = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            if (!data) return data;
	            var result = [];
	            var _iteratorNormalCompletion27 = true;
	            var _didIteratorError27 = false;
	            var _iteratorError27 = undefined;

	            try {
	                for (var _iterator27 = (0, _getIterator3.default)(data), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
	                    var item = _step27.value;

	                    var empty = true;
	                    for (var propertyName in item) {
	                        if (item.hasOwnProperty(propertyName)) if (!['', null, undefined].includes(item[propertyName]) && (!propertyNames.length || propertyNames.includes(propertyName))) {
	                            empty = false;
	                            break;
	                        }
	                    }if (!empty) result.push(item);
	                }
	            } catch (err) {
	                _didIteratorError27 = true;
	                _iteratorError27 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion27 && _iterator27.return) {
	                        _iterator27.return();
	                    }
	                } finally {
	                    if (_didIteratorError27) {
	                        throw _iteratorError27;
	                    }
	                }
	            }

	            return result;
	        }
	        /**
	         * Extracts all properties from all items wich occur in given property
	         * names.
	         * @param data - Data where each item should be sliced.
	         * @param propertyNames - Property names to extract.
	         * @returns Data with sliced items.
	         */

	    }, {
	        key: 'arrayExtract',
	        value: function arrayExtract(data, propertyNames) {
	            var result = [];
	            var _iteratorNormalCompletion28 = true;
	            var _didIteratorError28 = false;
	            var _iteratorError28 = undefined;

	            try {
	                for (var _iterator28 = (0, _getIterator3.default)(data), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
	                    var item = _step28.value;

	                    var newItem = {};
	                    var _iteratorNormalCompletion29 = true;
	                    var _didIteratorError29 = false;
	                    var _iteratorError29 = undefined;

	                    try {
	                        for (var _iterator29 = (0, _getIterator3.default)(propertyNames), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
	                            var propertyName = _step29.value;

	                            if (item.hasOwnProperty(propertyName)) newItem[propertyName] = item[propertyName];
	                        }
	                    } catch (err) {
	                        _didIteratorError29 = true;
	                        _iteratorError29 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion29 && _iterator29.return) {
	                                _iterator29.return();
	                            }
	                        } finally {
	                            if (_didIteratorError29) {
	                                throw _iteratorError29;
	                            }
	                        }
	                    }

	                    result.push(newItem);
	                }
	            } catch (err) {
	                _didIteratorError28 = true;
	                _iteratorError28 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion28 && _iterator28.return) {
	                        _iterator28.return();
	                    }
	                } finally {
	                    if (_didIteratorError28) {
	                        throw _iteratorError28;
	                    }
	                }
	            }

	            return result;
	        }
	        /**
	         * Extracts all values which matches given regular expression.
	         * @param data - Data to filter.
	         * @param regularExpression - Pattern to match for.
	         * @returns Filtered data.
	         */

	    }, {
	        key: 'arrayExtractIfMatches',
	        value: function arrayExtractIfMatches(data, regularExpression) {
	            var result = [];
	            var _iteratorNormalCompletion30 = true;
	            var _didIteratorError30 = false;
	            var _iteratorError30 = undefined;

	            try {
	                for (var _iterator30 = (0, _getIterator3.default)(data), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
	                    var _value15 = _step30.value;

	                    if ((typeof regularExpression === 'string' ? new RegExp(regularExpression) : regularExpression).test(_value15)) result.push(_value15);
	                }
	            } catch (err) {
	                _didIteratorError30 = true;
	                _iteratorError30 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion30 && _iterator30.return) {
	                        _iterator30.return();
	                    }
	                } finally {
	                    if (_didIteratorError30) {
	                        throw _iteratorError30;
	                    }
	                }
	            }

	            return result;
	        }
	        /**
	         * Filters given data if given property is set or not.
	         * @param data - Data to filter.
	         * @param propertyName - Property name to check for existence.
	         * @returns Given data without the items which doesn't have specified
	         * property.
	         */

	    }, {
	        key: 'arrayExtractIfPropertyExists',
	        value: function arrayExtractIfPropertyExists(data, propertyName) {
	            if (data && propertyName) {
	                var result = [];
	                var _iteratorNormalCompletion31 = true;
	                var _didIteratorError31 = false;
	                var _iteratorError31 = undefined;

	                try {
	                    for (var _iterator31 = (0, _getIterator3.default)(data), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
	                        var item = _step31.value;

	                        var exists = false;
	                        for (var _key30 in item) {
	                            if (_key30 === propertyName && item.hasOwnProperty(_key30) && ![undefined, null].includes(item[_key30])) {
	                                exists = true;
	                                break;
	                            }
	                        }if (exists) result.push(item);
	                    }
	                } catch (err) {
	                    _didIteratorError31 = true;
	                    _iteratorError31 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion31 && _iterator31.return) {
	                            _iterator31.return();
	                        }
	                    } finally {
	                        if (_didIteratorError31) {
	                            throw _iteratorError31;
	                        }
	                    }
	                }

	                return result;
	            }
	            return data;
	        }
	        /**
	         * Extract given data where specified property value matches given
	         * patterns.
	         * @param data - Data to filter.
	         * @param propertyPattern - Mapping of property names to pattern.
	         * @returns Filtered data.
	         */

	    }, {
	        key: 'arrayExtractIfPropertyMatches',
	        value: function arrayExtractIfPropertyMatches(data, propertyPattern) {
	            if (data && propertyPattern) {
	                var result = [];
	                var _iteratorNormalCompletion32 = true;
	                var _didIteratorError32 = false;
	                var _iteratorError32 = undefined;

	                try {
	                    for (var _iterator32 = (0, _getIterator3.default)(data), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
	                        var item = _step32.value;

	                        var matches = true;
	                        for (var propertyName in propertyPattern) {
	                            if (!(propertyPattern[propertyName] instanceof RegExp ? propertyPattern[propertyName] : new RegExp(propertyPattern[propertyName])).test(item[propertyName])) {
	                                matches = false;
	                                break;
	                            }
	                        }if (matches) result.push(item);
	                    }
	                } catch (err) {
	                    _didIteratorError32 = true;
	                    _iteratorError32 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion32 && _iterator32.return) {
	                            _iterator32.return();
	                        }
	                    } finally {
	                        if (_didIteratorError32) {
	                            throw _iteratorError32;
	                        }
	                    }
	                }

	                return result;
	            }
	            return data;
	        }
	        /**
	         * Determines all objects which exists in "firstSet" and in "secondSet".
	         * Object key which will be compared are given by "keys". If an empty array
	         * is given each key will be compared. If an object is given corresponding
	         * initial data key will be mapped to referenced new data key.
	         * @param firstSet - Referenced data to check for.
	         * @param secondSet - Data to check for existence.
	         * @param keys - Keys to define equality.
	         * @param strict - The strict parameter indicates whether "null" and
	         * "undefined" should be interpreted as equal (takes only effect if given
	         * keys aren't empty).
	         * @returns Data which does exit in given initial data.
	         */

	    }, {
	        key: 'arrayIntersect',
	        value: function arrayIntersect(firstSet, secondSet) {
	            var keys = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	            var strict = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	            var containingData = [];
	            var _iteratorNormalCompletion33 = true;
	            var _didIteratorError33 = false;
	            var _iteratorError33 = undefined;

	            try {
	                var _loop = function _loop() {
	                    var initialItem = _step33.value;

	                    if (Tools.isPlainObject(initialItem)) {
	                        var _iteratorNormalCompletion34 = true;
	                        var _didIteratorError34 = false;
	                        var _iteratorError34 = undefined;

	                        try {
	                            var _loop2 = function _loop2() {
	                                var newItem = _step34.value;

	                                var exists = true;
	                                var iterateGivenKeys = void 0;
	                                var keysAreAnArray = Array.isArray(keys);
	                                if (Tools.isPlainObject(keys) || keysAreAnArray && keys.length) iterateGivenKeys = true;else {
	                                    iterateGivenKeys = false;
	                                    keys = initialItem;
	                                }
	                                var handle = function handle(firstSetKey, secondSetKey) {
	                                    if (keysAreAnArray && iterateGivenKeys) firstSetKey = secondSetKey;else if (!iterateGivenKeys) secondSetKey = firstSetKey;
	                                    if (newItem[secondSetKey] !== initialItem[firstSetKey] && (strict || !([null, undefined].includes(newItem[secondSetKey]) && [null, undefined].includes(initialItem[firstSetKey])))) {
	                                        exists = false;
	                                        return false;
	                                    }
	                                };
	                                if (Array.isArray(keys)) {
	                                    var index = 0;
	                                    var _iteratorNormalCompletion35 = true;
	                                    var _didIteratorError35 = false;
	                                    var _iteratorError35 = undefined;

	                                    try {
	                                        for (var _iterator35 = (0, _getIterator3.default)(keys), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
	                                            var _key31 = _step35.value;

	                                            if (handle(index, _key31) === false) break;
	                                            index += 1;
	                                        }
	                                    } catch (err) {
	                                        _didIteratorError35 = true;
	                                        _iteratorError35 = err;
	                                    } finally {
	                                        try {
	                                            if (!_iteratorNormalCompletion35 && _iterator35.return) {
	                                                _iterator35.return();
	                                            }
	                                        } finally {
	                                            if (_didIteratorError35) {
	                                                throw _iteratorError35;
	                                            }
	                                        }
	                                    }
	                                } else for (var _key32 in keys) {
	                                    if (keys.hasOwnProperty(_key32)) if (handle(_key32, keys[_key32]) === false) break;
	                                }if (exists) {
	                                    containingData.push(initialItem);
	                                    return 'break';
	                                }
	                            };

	                            for (var _iterator34 = (0, _getIterator3.default)(secondSet), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
	                                var _ret3 = _loop2();

	                                if (_ret3 === 'break') break;
	                            }
	                        } catch (err) {
	                            _didIteratorError34 = true;
	                            _iteratorError34 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion34 && _iterator34.return) {
	                                    _iterator34.return();
	                                }
	                            } finally {
	                                if (_didIteratorError34) {
	                                    throw _iteratorError34;
	                                }
	                            }
	                        }
	                    } else if (secondSet.includes(initialItem)) containingData.push(initialItem);
	                };

	                for (var _iterator33 = (0, _getIterator3.default)(firstSet), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
	                    _loop();
	                }
	            } catch (err) {
	                _didIteratorError33 = true;
	                _iteratorError33 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion33 && _iterator33.return) {
	                        _iterator33.return();
	                    }
	                } finally {
	                    if (_didIteratorError33) {
	                        throw _iteratorError33;
	                    }
	                }
	            }

	            return containingData;
	        }
	        /**
	         * Creates a list of items within given range.
	         * @param range - Array of lower and upper bounds. If only one value is
	         * given lower bound will be assumed to be zero. Both integers have to be
	         * positive and will be contained in the resulting array.
	         * @param step - Space between two consecutive values.
	         * @returns Produced array of integers.
	         */

	    }, {
	        key: 'arrayMakeRange',
	        value: function arrayMakeRange(range) {
	            var step = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	            var index = void 0;
	            var higherBound = void 0;
	            if (range.length === 1) {
	                index = 0;
	                higherBound = parseInt(range[0], 10);
	            } else if (range.length === 2) {
	                index = parseInt(range[0], 10);
	                higherBound = parseInt(range[1], 10);
	            } else return range;
	            var result = [index];
	            while (index <= higherBound - step) {
	                index += step;
	                result.push(index);
	            }
	            return result;
	        }
	        /**
	         * Sums up given property of given item list.
	         * @param data - The objects with specified property to sum up.
	         * @param propertyName - Property name to sum up its value.
	         * @returns The aggregated value.
	         */

	    }, {
	        key: 'arraySumUpProperty',
	        value: function arraySumUpProperty(data, propertyName) {
	            var result = 0;
	            if (Array.isArray(data) && data.length) {
	                var _iteratorNormalCompletion36 = true;
	                var _didIteratorError36 = false;
	                var _iteratorError36 = undefined;

	                try {
	                    for (var _iterator36 = (0, _getIterator3.default)(data), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
	                        var _item2 = _step36.value;

	                        if (_item2.hasOwnProperty(propertyName)) result += parseFloat(_item2[propertyName] || 0);
	                    }
	                } catch (err) {
	                    _didIteratorError36 = true;
	                    _iteratorError36 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion36 && _iterator36.return) {
	                            _iterator36.return();
	                        }
	                    } finally {
	                        if (_didIteratorError36) {
	                            throw _iteratorError36;
	                        }
	                    }
	                }
	            }return result;
	        }
	        /**
	         * Adds an item to another item as array connection (many to one).
	         * @param item - Item where the item should be appended to.
	         * @param target - Target to add to given item.
	         * @param name - Name of the target connection.
	         * @param checkIfExists - Indicates if duplicates are allowed in resulting
	         * list (will result in linear runtime instead of constant one).
	         * @returns Item with the appended target.
	         */

	    }, {
	        key: 'arrayAppendAdd',
	        value: function arrayAppendAdd(item, target, name) {
	            var checkIfExists = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

	            if (item.hasOwnProperty(name)) {
	                if (!(checkIfExists && item[name].includes(target))) item[name].push(target);
	            } else item[name] = [target];
	            return item;
	        }
	        /**
	         * Removes given target on given list.
	         * @param list - Array to splice.
	         * @param target - Target to remove from given list.
	         * @param strict - Indicates whether to fire an exception if given target
	         * doesn't exists given list.
	         * @returns Item with the appended target.
	         */

	    }, {
	        key: 'arrayRemove',
	        value: function arrayRemove(list, target) {
	            var strict = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	            if (Array.isArray(list)) {
	                var index = list.indexOf(target);
	                if (index === -1) {
	                    if (strict) throw Error("Given target doesn't exists in given list.");
	                } else
	                    /* eslint-disable max-statements-per-line */
	                    list.splice(index, 1);
	                /* eslint-enable max-statements-per-line */
	            } else if (strict) throw Error("Given target isn't an array.");
	            return list;
	        }
	        // / endregion
	        // / region string
	        // // region url handling
	        /**
	         * Translates given string into the regular expression validated
	         * representation.
	         * @param value - String to convert.
	         * @param excludeSymbols - Symbols not to escape.
	         * @returns Converted string.
	         */

	    }, {
	        key: 'stringConvertToValidRegularExpression',
	        value: function stringConvertToValidRegularExpression(value) {
	            var excludeSymbols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	            // NOTE: This is only for performance improvements.
	            if (value.length === 1 && !Tools.specialRegexSequences.includes(value)) return value;
	            // The escape sequence must also be escaped; but at first.
	            if (!excludeSymbols.includes('\\')) value.replace(/\\/g, '\\\\');
	            var _iteratorNormalCompletion37 = true;
	            var _didIteratorError37 = false;
	            var _iteratorError37 = undefined;

	            try {
	                for (var _iterator37 = (0, _getIterator3.default)(Tools.specialRegexSequences), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
	                    var replace = _step37.value;

	                    if (!excludeSymbols.includes(replace)) value = value.replace(new RegExp('\\' + replace, 'g'), '\\' + replace);
	                }
	            } catch (err) {
	                _didIteratorError37 = true;
	                _iteratorError37 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion37 && _iterator37.return) {
	                        _iterator37.return();
	                    }
	                } finally {
	                    if (_didIteratorError37) {
	                        throw _iteratorError37;
	                    }
	                }
	            }

	            return value;
	        }
	        /**
	         * Translates given name into a valid javaScript one.
	         * @param name - Name to convert.
	         * @param allowedSymbols - String of symbols which should be allowed within
	         * a variable name (not the first character).
	         * @returns Converted name is returned.
	         */

	    }, {
	        key: 'stringConvertToValidVariableName',
	        value: function stringConvertToValidVariableName(name) {
	            var allowedSymbols = arguments.length <= 1 || arguments[1] === undefined ? '0-9a-zA-Z_$' : arguments[1];

	            return name.toString().replace(/^[^a-zA-Z_$]+/, '').replace(new RegExp('[^' + allowedSymbols + ']+([a-zA-Z0-9])', 'g'), function (fullMatch, firstLetter) {
	                return firstLetter.toUpperCase();
	            });
	        }
	        /**
	         * This method is intended for encoding *key* or *value* parts of query
	         * component. We need a custom method because "encodeURIComponent()" is too
	         * aggressive and encodes stuff that doesn't have to be encoded per
	         * "http://tools.ietf.org/html/rfc3986:".
	         * @param url - URL to encode.
	         * @param encodeSpaces - Indicates whether given url should encode
	         * whitespaces as "+" or "%20".
	         * @returns Encoded given url.
	         */

	    }, {
	        key: 'stringEncodeURIComponent',
	        value: function stringEncodeURIComponent(url, encodeSpaces) {
	            return encodeURIComponent(url).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, encodeSpaces ? '%20' : '+');
	        }
	        /**
	         * Appends a path selector to the given path if there isn't one yet.
	         * @param path - The path for appending a selector.
	         * @param pathSeparator - The selector for appending to path.
	         * @returns The appended path.
	         */

	    }, {
	        key: 'stringAddSeparatorToPath',
	        value: function stringAddSeparatorToPath(path) {
	            var pathSeparator = arguments.length <= 1 || arguments[1] === undefined ? '/' : arguments[1];

	            path = path.trim();
	            if (path.substr(-1) !== pathSeparator && path.length) return path + pathSeparator;
	            return path;
	        }
	        /**
	         * Checks if given path has given path prefix.
	         * @param prefix - Path prefix to search for.
	         * @param path - Path to search in.
	         * @param separator - Delimiter to use in path (default is the posix
	         * conform slash).
	         * @returns Value "true" if given prefix occur and "false" otherwise.
	         */

	    }, {
	        key: 'stringHasPathPrefix',
	        value: function stringHasPathPrefix() {
	            var prefix = arguments.length <= 0 || arguments[0] === undefined ? '/admin' : arguments[0];
	            var path = arguments.length <= 1 || arguments[1] === undefined ? 'location' in $.global && $.global.location.pathname || '' : arguments[1];
	            var separator = arguments.length <= 2 || arguments[2] === undefined ? '/' : arguments[2];

	            if (typeof prefix === 'string') {
	                if (!prefix.endsWith(separator)) prefix += separator;
	                return path === prefix.substring(0, prefix.length - separator.length) || path.startsWith(prefix);
	            }
	            return false;
	        }
	        /**
	         * Extracts domain name from given url. If no explicit domain name given
	         * current domain name will be assumed. If no parameter given current
	         * domain name will be determined.
	         * @param url - The url to extract domain from.
	         * @param fallback - The fallback host name if no one exits in given url
	         * (default is current hostname).
	         * @returns Extracted domain.
	         */

	    }, {
	        key: 'stringGetDomainName',
	        value: function stringGetDomainName() {
	            var url = arguments.length <= 0 || arguments[0] === undefined ? 'location' in $.global && $.global.location.href || '' : arguments[0];
	            var fallback = arguments.length <= 1 || arguments[1] === undefined ? 'location' in $.global && $.global.location.hostname || '' : arguments[1];

	            var result = /^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url);
	            if (result && result.length > 2 && result[1] && result[2]) return result[2];
	            return fallback;
	        }
	        /**
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
	         */

	    }, {
	        key: 'stringGetPortNumber',
	        value: function stringGetPortNumber() {
	            var url = arguments.length <= 0 || arguments[0] === undefined ? 'location' in $.global && $.global.location.href || '' : arguments[0];
	            var fallback = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	            var parameter = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	            var result = /^(?:[a-z]*:?\/\/[^/]+?)?(?:[^/]+?):([0-9]+)/i.exec(url);
	            if (result && result.length > 1) return parseInt(result[1], 10);
	            if (fallback !== null) return fallback;
	            if (Tools.stringIsInternalURL.apply(this, [url].concat(parameter)) && 'location' in $.global && $.global.location.port && parseInt($.global.location.port, 10)) return parseInt($.global.location.port, 10);
	            return Tools.stringGetProtocolName(url) === 'https' ? 443 : 80;
	        }
	        /**
	         * Extracts protocol name from given url. If no explicit url is given,
	         * current protocol will be assumed. If no parameter given current protocol
	         * number will be determined.
	         * @param url - The url to extract protocol from.
	         * @param fallback - Fallback port to use if no protocol exists in given
	         * url (default is current protocol).
	         * returns Extracted protocol.
	         */

	    }, {
	        key: 'stringGetProtocolName',
	        value: function stringGetProtocolName() {
	            var url = arguments.length <= 0 || arguments[0] === undefined ? 'location' in $.global && $.global.location.href || '' : arguments[0];
	            var fallback = arguments.length <= 1 || arguments[1] === undefined ? 'location' in $.global && $.global.location.protocol.substring(0, $.global.location.protocol.length - 1) || '' : arguments[1];

	            var result = /^([a-z]+):\/\//i.exec(url);
	            if (result && result.length > 1 && result[1]) return result[1];
	            return fallback;
	        }
	        /**
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
	         */

	    }, {
	        key: 'stringGetURLVariable',
	        value: function stringGetURLVariable(keyToGet, givenInput) {
	            var subDelimiter = arguments.length <= 2 || arguments[2] === undefined ? '$' : arguments[2];
	            var hashedPathIndicator = arguments.length <= 3 || arguments[3] === undefined ? '!' : arguments[3];
	            var givenSearch = arguments[4];
	            var givenHash = arguments.length <= 5 || arguments[5] === undefined ? 'location' in $.global && $.global.location.hash || '' : arguments[5];

	            // region set search and hash
	            var hash = givenHash ? givenHash : '#';
	            var search = '';
	            if (givenSearch) search = givenSearch;else if (hashedPathIndicator && hash.startsWith(hashedPathIndicator)) {
	                var subHashStartIndex = hash.indexOf('#');
	                var pathAndSearch = void 0;
	                if (subHashStartIndex === -1) {
	                    pathAndSearch = hash.substring(hashedPathIndicator.length);
	                    hash = '';
	                } else {
	                    pathAndSearch = hash.substring(hashedPathIndicator.length, subHashStartIndex);
	                    hash = hash.substring(subHashStartIndex);
	                }
	                var subSearchStartIndex = pathAndSearch.indexOf('?');
	                if (subSearchStartIndex !== -1) search = pathAndSearch.substring(subSearchStartIndex);
	            } else if ('location' in $.global) search = $.global.location.search || '';
	            var input = givenInput ? givenInput : search;
	            // endregion
	            // region determine data from search and hash if specified
	            var both = input === '&';
	            if (both || input === '#') {
	                var decodedHash = '';
	                try {
	                    decodedHash = decodeURIComponent(hash);
	                } catch (error) {}
	                var subDelimiterIndex = decodedHash.indexOf(subDelimiter);
	                if (subDelimiterIndex === -1) input = '';else {
	                    input = decodedHash.substring(subDelimiterIndex);
	                    if (input.startsWith(subDelimiter)) input = input.substring(subDelimiter.length);
	                }
	            } else if (input.startsWith('?')) input = input.substring('?'.length);
	            var data = input ? input.split('&') : [];
	            search = search.substring('?'.length);
	            if (both && search) data = data.concat(search.split('&'));
	            // endregion
	            // region construct data structure
	            var variables = [];
	            var _iteratorNormalCompletion38 = true;
	            var _didIteratorError38 = false;
	            var _iteratorError38 = undefined;

	            try {
	                for (var _iterator38 = (0, _getIterator3.default)(data), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
	                    var _value16 = _step38.value;

	                    var keyValuePair = _value16.split('=');
	                    var _key33 = void 0;
	                    try {
	                        _key33 = decodeURIComponent(keyValuePair[0]);
	                    } catch (error) {
	                        _key33 = '';
	                    }
	                    try {
	                        _value16 = decodeURIComponent(keyValuePair[1]);
	                    } catch (error) {
	                        _value16 = '';
	                    }
	                    variables.push(_key33);
	                    // IgnoreTypeCheck
	                    variables[_key33] = _value16;
	                }
	                // endregion
	            } catch (err) {
	                _didIteratorError38 = true;
	                _iteratorError38 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion38 && _iterator38.return) {
	                        _iterator38.return();
	                    }
	                } finally {
	                    if (_didIteratorError38) {
	                        throw _iteratorError38;
	                    }
	                }
	            }

	            if (keyToGet)
	                // IgnoreTypeCheck
	                return variables[keyToGet];
	            return variables;
	        }
	        /**
	         * Checks if given url points to another domain than second given url. If
	         * no second given url provided current url will be assumed.
	         * @param firstURL - URL to check against second url.
	         * @param secondURL - URL to check against first url.
	         * @returns Returns "true" if given first url has same domain as given
	         * second (or current).
	         */

	    }, {
	        key: 'stringIsInternalURL',
	        value: function stringIsInternalURL(firstURL) {
	            var secondURL = arguments.length <= 1 || arguments[1] === undefined ? 'location' in $.global && $.global.location.href || '' : arguments[1];

	            var explicitDomainName = Tools.stringGetDomainName(firstURL, false);
	            var explicitProtocolName = Tools.stringGetProtocolName(firstURL, false);
	            var explicitPortNumber = Tools.stringGetPortNumber(firstURL, false);
	            return (!explicitDomainName || explicitDomainName === Tools.stringGetDomainName(secondURL)) && (!explicitProtocolName || explicitProtocolName === Tools.stringGetProtocolName(secondURL)) && (!explicitPortNumber || explicitPortNumber === Tools.stringGetPortNumber(secondURL));
	        }
	        /**
	         * Normalized given website url.
	         * @param url - Uniform resource locator to normalize.
	         * @returns Normalized result.
	         */

	    }, {
	        key: 'stringNormalizeURL',
	        value: function stringNormalizeURL(url) {
	            if (url) {
	                url = url.replace(/^:?\/+/, '').replace(/\/+$/, '').trim();
	                if (url.startsWith('http')) return url;
	                return 'http://' + url;
	            }
	            return '';
	        }
	        /**
	         * Represents given website url.
	         * @param url - Uniform resource locator to represent.
	         * @returns Represented result.
	         */

	    }, {
	        key: 'stringRepresentURL',
	        value: function stringRepresentURL(url) {
	            if (typeof url === 'string') return url.replace(/^(https?)?:?\/+/, '').replace(/\/+$/, '').trim();
	            return '';
	        }
	        // // endregion
	        /**
	         * Compresses given style attribute value.
	         * @param styleValue - Style value to compress.
	         * @returns The compressed value.
	         */

	    }, {
	        key: 'stringCompressStyleValue',
	        value: function stringCompressStyleValue(styleValue) {
	            return styleValue.replace(/ *([:;]) */g, '$1').replace(/ +/g, ' ').replace(/^;+/, '').replace(/;+$/, '').trim();
	        }
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * Converts a camel cased string to its delimited string version.
	         * @param string - The string to format.
	         * @param delimiter - Delimiter string
	         * @param abbreviations - Collection of shortcut words to represent upper
	         * cased.
	         * @returns The formatted string.
	         */

	    }, {
	        key: 'stringCamelCaseToDelimited',
	        value: function stringCamelCaseToDelimited(string) {
	            var delimiter = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];
	            var abbreviations = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            if (!abbreviations) abbreviations = Tools.abbreviations;
	            var escapedDelimiter = Tools.stringGetRegularExpressionValidated(delimiter);
	            if (abbreviations.length) {
	                var abbreviationPattern = '';
	                var _iteratorNormalCompletion39 = true;
	                var _didIteratorError39 = false;
	                var _iteratorError39 = undefined;

	                try {
	                    for (var _iterator39 = (0, _getIterator3.default)(abbreviations), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
	                        var abbreviation = _step39.value;

	                        if (abbreviationPattern) abbreviationPattern += '|';
	                        abbreviationPattern += abbreviation.toUpperCase();
	                    }
	                } catch (err) {
	                    _didIteratorError39 = true;
	                    _iteratorError39 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion39 && _iterator39.return) {
	                            _iterator39.return();
	                        }
	                    } finally {
	                        if (_didIteratorError39) {
	                            throw _iteratorError39;
	                        }
	                    }
	                }

	                string = string.replace(new RegExp('(' + abbreviationPattern + ')(' + abbreviationPattern + ')', 'g'), '$1' + delimiter + '$2');
	            }
	            string = string.replace(new RegExp('([^' + escapedDelimiter + '])([A-Z][a-z]+)', 'g'), '$1' + delimiter + '$2');
	            return string.replace(new RegExp('([a-z0-9])([A-Z])', 'g'), '$1' + delimiter + '$2').toLowerCase();
	        }
	        /* eslint-disable jsdoc/require-description-complete-sentence */
	        /**
	         * Converts a string to its capitalize representation.
	         * @param string - The string to format.
	         * @returns The formatted string.
	         */

	    }, {
	        key: 'stringCapitalize',
	        value: function stringCapitalize(string) {
	            /* eslint-enable jsdoc/require-description-complete-sentence */
	            return string.charAt(0).toUpperCase() + string.substring(1);
	        }
	        /**
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
	         */

	    }, {
	        key: 'stringDelimitedToCamelCase',
	        value: function stringDelimitedToCamelCase(string) {
	            var delimiter = arguments.length <= 1 || arguments[1] === undefined ? '-' : arguments[1];
	            var abbreviations = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	            var preserveWrongFormattedAbbreviations = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	            var removeMultipleDelimiter = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	            var escapedDelimiter = Tools.stringGetRegularExpressionValidated(delimiter);
	            if (!abbreviations) abbreviations = Tools.abbreviations;
	            var abbreviationPattern = void 0;
	            if (preserveWrongFormattedAbbreviations) abbreviationPattern = abbreviations.join('|');else {
	                abbreviationPattern = '';
	                var _iteratorNormalCompletion40 = true;
	                var _didIteratorError40 = false;
	                var _iteratorError40 = undefined;

	                try {
	                    for (var _iterator40 = (0, _getIterator3.default)(abbreviations), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
	                        var abbreviation = _step40.value;

	                        if (abbreviationPattern) abbreviationPattern += '|';
	                        abbreviationPattern += Tools.stringCapitalize(abbreviation) + '|' + abbreviation;
	                    }
	                } catch (err) {
	                    _didIteratorError40 = true;
	                    _iteratorError40 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion40 && _iterator40.return) {
	                            _iterator40.return();
	                        }
	                    } finally {
	                        if (_didIteratorError40) {
	                            throw _iteratorError40;
	                        }
	                    }
	                }
	            }
	            var stringStartsWithDelimiter = false;
	            if (string.startsWith(delimiter)) {
	                string = string.substring(delimiter.length);
	                stringStartsWithDelimiter = true;
	            }
	            string = string.replace(new RegExp('(' + escapedDelimiter + ')(' + abbreviationPattern + ')' + ('(' + escapedDelimiter + '|$)'), 'g'), function (fullMatch, before, abbreviation, after) {
	                return before + abbreviation.toUpperCase() + after;
	            });
	            if (removeMultipleDelimiter) escapedDelimiter = '(?:' + escapedDelimiter + ')+';
	            string = string.replace(new RegExp(escapedDelimiter + '([a-zA-Z0-9])', 'g'), function (fullMatch, firstLetter) {
	                return firstLetter.toUpperCase();
	            });
	            if (stringStartsWithDelimiter) string = delimiter + string;
	            return string;
	        }
	        /**
	         * Performs a string formation. Replaces every placeholder "{i}" with the
	         * i'th argument.
	         * @param string - The string to format.
	         * @param additionalArguments - Additional arguments are interpreted as
	         * replacements for string formating.
	         * @returns The formatted string.
	         */

	    }, {
	        key: 'stringFormat',
	        value: function stringFormat(string) {
	            for (var _len11 = arguments.length, additionalArguments = Array(_len11 > 1 ? _len11 - 1 : 0), _key34 = 1; _key34 < _len11; _key34++) {
	                additionalArguments[_key34 - 1] = arguments[_key34];
	            }

	            additionalArguments.unshift(string);
	            var index = 0;
	            var _iteratorNormalCompletion41 = true;
	            var _didIteratorError41 = false;
	            var _iteratorError41 = undefined;

	            try {
	                for (var _iterator41 = (0, _getIterator3.default)(additionalArguments), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
	                    var _value17 = _step41.value;

	                    string = string.replace(new RegExp('\\{' + index + '\\}', 'gm'), '' + _value17);
	                    index += 1;
	                }
	            } catch (err) {
	                _didIteratorError41 = true;
	                _iteratorError41 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion41 && _iterator41.return) {
	                        _iterator41.return();
	                    }
	                } finally {
	                    if (_didIteratorError41) {
	                        throw _iteratorError41;
	                    }
	                }
	            }

	            return string;
	        }
	        /**
	         * Validates the current string for using in a regular expression pattern.
	         * Special regular expression chars will be escaped.
	         * @param string - The string to format.
	         * @returns The formatted string.
	         */

	    }, {
	        key: 'stringGetRegularExpressionValidated',
	        value: function stringGetRegularExpressionValidated(string) {
	            return string.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1');
	        }
	        /**
	         * Converts a string to its lower case representation.
	         * @param string - The string to format.
	         * @returns The formatted string.
	         */

	    }, {
	        key: 'stringLowerCase',
	        value: function stringLowerCase(string) {
	            return string.charAt(0).toLowerCase() + string.substring(1);
	        }
	        /**
	         * Wraps given mark strings in given target with given marker.
	         * @param target - String to search for marker.
	         * @param mark - String to search in target for.
	         * @param marker - HTML template string to mark.
	         * @param caseSensitive - Indicates whether case takes a role during
	         * searching.
	         * @returns Processed result.
	         */

	    }, {
	        key: 'stringMark',
	        value: function stringMark(target, mark) {
	            var marker = arguments.length <= 2 || arguments[2] === undefined ? '<span class="tools-mark">{1}</span>' : arguments[2];
	            var caseSensitive = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	            if (target && mark) {
	                target = target.trim();
	                mark = mark.trim();
	                var offset = 0;
	                var searchTarget = target;
	                if (!caseSensitive) searchTarget = searchTarget.toLowerCase();
	                if (!caseSensitive) mark = mark.toLowerCase();
	                while (true) {
	                    var index = searchTarget.indexOf(mark, offset);
	                    if (index === -1) break;else {
	                        target = target.substring(0, index) + Tools.stringFormat(marker, target.substr(index, mark.length)) + target.substring(index + mark.length);
	                        if (!caseSensitive) searchTarget = target.toLowerCase();
	                        offset = index + (marker.length - '{1}'.length) + mark.length;
	                    }
	                }
	            }
	            return target;
	        }
	        /**
	         * Implements the md5 hash algorithm.
	         * @param value - Value to calculate md5 hash for.
	         * @param onlyAscii - Set to true if given input has ascii characters only
	         * to get more performance.
	         * @returns Calculated md5 hash value.
	         */

	    }, {
	        key: 'stringMD5',
	        value: function stringMD5(value) {
	            var onlyAscii = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

	            var hexCharacters = '0123456789abcdef'.split('');
	            // region sub helper
	            /**
	             * This function is much faster, so if possible we use it. Some IEs
	             * are the only ones I know of that need the idiotic second function,
	             * generated by an if clause in the end.
	             * @param first - First operand to add.
	             * @param second - Second operant to add.
	             * @returns The sum of both given operands.
	            */
	            var unsignedModule2PowerOf32Addition = function unsignedModule2PowerOf32Addition(first, second) {
	                return first + second & 0xFFFFFFFF;
	            };
	            // / region primary functions needed for the algorithm
	            /*
	             * Implements the basic operation for each round of the algorithm.
	             */
	            var cmn = function cmn(q, a, b, x, s, t) {
	                a = unsignedModule2PowerOf32Addition(unsignedModule2PowerOf32Addition(a, q), unsignedModule2PowerOf32Addition(x, t));
	                return unsignedModule2PowerOf32Addition(a << s | a >>> 32 - s, b);
	            };
	            /**
	             * First algorithm part.
	             * @param a - Operand.
	             * @param b - Operand.
	             * @param c - Operand.
	             * @param d - Operand.
	             * @param x - Operand.
	             * @param s - Operand.
	             * @param t - Operand.
	             * @returns Result.
	             */
	            var ff = function ff(a, b, c, d, x, s, t) {
	                return cmn(b & c | ~b & d, a, b, x, s, t);
	            };
	            /**
	             * Second algorithm part.
	             * @param a - Operand.
	             * @param b - Operand.
	             * @param c - Operand.
	             * @param d - Operand.
	             * @param x - Operand.
	             * @param s - Operand.
	             * @param t - Operand.
	             * @returns Result.
	             */
	            var gg = function gg(a, b, c, d, x, s, t) {
	                return cmn(b & d | c & ~d, a, b, x, s, t);
	            };
	            /**
	             * Third algorithm part.
	             * @param a - Operand.
	             * @param b - Operand.
	             * @param c - Operand.
	             * @param d - Operand.
	             * @param x - Operand.
	             * @param s - Operand.
	             * @param t - Operand.
	             * @returns Result.
	             */
	            var hh = function hh(a, b, c, d, x, s, t) {
	                return cmn(b ^ c ^ d, a, b, x, s, t);
	            };
	            /**
	             * Fourth algorithm part.
	             * @param a - Operand.
	             * @param b - Operand.
	             * @param c - Operand.
	             * @param d - Operand.
	             * @param x - Operand.
	             * @param s - Operand.
	             * @param t - Operand.
	             * @returns Result.
	             */
	            var ii = function ii(a, b, c, d, x, s, t) {
	                return cmn(c ^ (b | ~d), a, b, x, s, t);
	            };
	            /**
	             * Performs all 16 needed steps.
	             * @param state - Current state.
	             * @param blocks - Blocks to cycle through.
	             * @returns Returns given state.
	             */
	            var cycle = function cycle(state, blocks) {
	                var a = state[0];
	                var b = state[1];
	                var c = state[2];
	                var d = state[3];
	                // region round 1
	                a = ff(a, b, c, d, blocks[0], 7, -680876936);
	                d = ff(d, a, b, c, blocks[1], 12, -389564586);
	                c = ff(c, d, a, b, blocks[2], 17, 606105819);
	                b = ff(b, c, d, a, blocks[3], 22, -1044525330);

	                a = ff(a, b, c, d, blocks[4], 7, -176418897);
	                d = ff(d, a, b, c, blocks[5], 12, 1200080426);
	                c = ff(c, d, a, b, blocks[6], 17, -1473231341);
	                b = ff(b, c, d, a, blocks[7], 22, -45705983);

	                a = ff(a, b, c, d, blocks[8], 7, 1770035416);
	                d = ff(d, a, b, c, blocks[9], 12, -1958414417);
	                c = ff(c, d, a, b, blocks[10], 17, -42063);
	                b = ff(b, c, d, a, blocks[11], 22, -1990404162);

	                a = ff(a, b, c, d, blocks[12], 7, 1804603682);
	                d = ff(d, a, b, c, blocks[13], 12, -40341101);
	                c = ff(c, d, a, b, blocks[14], 17, -1502002290);
	                b = ff(b, c, d, a, blocks[15], 22, 1236535329);
	                // endregion
	                // region round 2
	                a = gg(a, b, c, d, blocks[1], 5, -165796510);
	                d = gg(d, a, b, c, blocks[6], 9, -1069501632);
	                c = gg(c, d, a, b, blocks[11], 14, 643717713);
	                b = gg(b, c, d, a, blocks[0], 20, -373897302);

	                a = gg(a, b, c, d, blocks[5], 5, -701558691);
	                d = gg(d, a, b, c, blocks[10], 9, 38016083);
	                c = gg(c, d, a, b, blocks[15], 14, -660478335);
	                b = gg(b, c, d, a, blocks[4], 20, -405537848);

	                a = gg(a, b, c, d, blocks[9], 5, 568446438);
	                d = gg(d, a, b, c, blocks[14], 9, -1019803690);
	                c = gg(c, d, a, b, blocks[3], 14, -187363961);
	                b = gg(b, c, d, a, blocks[8], 20, 1163531501);

	                a = gg(a, b, c, d, blocks[13], 5, -1444681467);
	                d = gg(d, a, b, c, blocks[2], 9, -51403784);
	                c = gg(c, d, a, b, blocks[7], 14, 1735328473);
	                b = gg(b, c, d, a, blocks[12], 20, -1926607734);
	                // endregion
	                // region round 3
	                a = hh(a, b, c, d, blocks[5], 4, -378558);
	                d = hh(d, a, b, c, blocks[8], 11, -2022574463);
	                c = hh(c, d, a, b, blocks[11], 16, 1839030562);
	                b = hh(b, c, d, a, blocks[14], 23, -35309556);

	                a = hh(a, b, c, d, blocks[1], 4, -1530992060);
	                d = hh(d, a, b, c, blocks[4], 11, 1272893353);
	                c = hh(c, d, a, b, blocks[7], 16, -155497632);
	                b = hh(b, c, d, a, blocks[10], 23, -1094730640);

	                a = hh(a, b, c, d, blocks[13], 4, 681279174);
	                d = hh(d, a, b, c, blocks[0], 11, -358537222);
	                c = hh(c, d, a, b, blocks[3], 16, -722521979);
	                b = hh(b, c, d, a, blocks[6], 23, 76029189);

	                a = hh(a, b, c, d, blocks[9], 4, -640364487);
	                d = hh(d, a, b, c, blocks[12], 11, -421815835);
	                c = hh(c, d, a, b, blocks[15], 16, 530742520);
	                b = hh(b, c, d, a, blocks[2], 23, -995338651);
	                // endregion
	                // region round 4
	                a = ii(a, b, c, d, blocks[0], 6, -198630844);
	                d = ii(d, a, b, c, blocks[7], 10, 1126891415);
	                c = ii(c, d, a, b, blocks[14], 15, -1416354905);
	                b = ii(b, c, d, a, blocks[5], 21, -57434055);

	                a = ii(a, b, c, d, blocks[12], 6, 1700485571);
	                d = ii(d, a, b, c, blocks[3], 10, -1894986606);
	                c = ii(c, d, a, b, blocks[10], 15, -1051523);
	                b = ii(b, c, d, a, blocks[1], 21, -2054922799);

	                a = ii(a, b, c, d, blocks[8], 6, 1873313359);
	                d = ii(d, a, b, c, blocks[15], 10, -30611744);
	                c = ii(c, d, a, b, blocks[6], 15, -1560198380);
	                b = ii(b, c, d, a, blocks[13], 21, 1309151649);

	                a = ii(a, b, c, d, blocks[4], 6, -145523070);
	                d = ii(d, a, b, c, blocks[11], 10, -1120210379);
	                c = ii(c, d, a, b, blocks[2], 15, 718787259);
	                b = ii(b, c, d, a, blocks[9], 21, -343485551);
	                // endregion
	                state[0] = unsignedModule2PowerOf32Addition(a, state[0]);
	                state[1] = unsignedModule2PowerOf32Addition(b, state[1]);
	                state[2] = unsignedModule2PowerOf32Addition(c, state[2]);
	                state[3] = unsignedModule2PowerOf32Addition(d, state[3]);
	                return state;
	            };
	            // / endregion
	            /**
	             * Converts given character to its corresponding hex code
	             * representation.
	             * @param character - Character to convert.
	             * @returns Converted hex code string.
	             */
	            var convertCharactorToHexCode = function convertCharactorToHexCode(character) {
	                var hexString = '';
	                for (var round = 0; round < 4; round++) {
	                    hexString += hexCharacters[character >> round * 8 + 4 & 0x0F] + hexCharacters[character >> round * 8 & 0x0F];
	                }return hexString;
	            };
	            /**
	             * Converts given byte array to its corresponding hex code as string.
	             * @param value - Array of characters to convert.
	             * @returns Converted hex code.
	             */
	            var convertToHexCode = function convertToHexCode(value) {
	                for (var index = 0; index < value.length; index++) {
	                    value[index] = convertCharactorToHexCode(value[index]);
	                }return value.join('');
	            };
	            /**
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
	             */
	            var handleBlock = function handleBlock(value) {
	                var blocks = [];
	                for (var blockNumber = 0; blockNumber < 64; blockNumber += 4) {
	                    blocks[blockNumber >> 2] = value.charCodeAt(blockNumber) + (value.charCodeAt(blockNumber + 1) << 8) + (value.charCodeAt(blockNumber + 2) << 16) + (value.charCodeAt(blockNumber + 3) << 24);
	                }return blocks;
	            };
	            // endregion
	            /**
	             * Triggers the main algorithm to calculate the md5 representation of
	             * given value.
	             * @param value - String to convert to its md5 representation.
	             * @returns Array of blocks.
	             */
	            var main = function main(value) {
	                var length = value.length;
	                var state = [1732584193, -271733879, -1732584194, 271733878];
	                var blockNumber = void 0;
	                for (blockNumber = 64; blockNumber <= value.length; blockNumber += 64) {
	                    cycle(state, handleBlock(value.substring(blockNumber - 64, blockNumber)));
	                }value = value.substring(blockNumber - 64);
	                var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	                for (blockNumber = 0; blockNumber < value.length; blockNumber++) {
	                    tail[blockNumber >> 2] |= value.charCodeAt(blockNumber) << (blockNumber % 4 << 3);
	                }tail[blockNumber >> 2] |= 0x80 << (blockNumber % 4 << 3);
	                if (blockNumber > 55) {
	                    cycle(state, tail);
	                    for (var index = 0; index < 16; index++) {
	                        tail[index] = 0;
	                    }
	                }
	                tail[14] = length * 8;
	                cycle(state, tail);
	                return state;
	            };
	            // region final call
	            if (convertToHexCode(main('hello')) !== '5d41402abc4b2a76b9719d911017c592')
	                /**
	                 * This function is much faster, so if possible we use it. Some IEs
	                 * are the only ones I know of that need the idiotic second
	                 * function, generated by an if clause in the end.
	                 * @private
	                 * @param first - First operand to add.
	                 * @param second - Second operant to add.
	                 * @returns The sum of both given operands.
	                */
	                unsignedModule2PowerOf32Addition = function unsignedModule2PowerOf32Addition(first, second) {
	                    var lsw = (first & 0xFFFF) + (second & 0xFFFF);
	                    var msw = (first >> 16) + (second >> 16) + (lsw >> 16);
	                    return msw << 16 | lsw & 0xFFFF;
	                };
	            // IgnoreTypeCheck
	            return convertToHexCode(main(onlyAscii ? value : unescape(encodeURIComponent(value))));
	            // endregion
	        }
	        /**
	         * Normalizes given phone number for automatic dialing mechanisms.
	         * @param phoneNumber - Number to normalize.
	         * @returns Normalized number.
	         */

	    }, {
	        key: 'stringNormalizePhoneNumber',
	        value: function stringNormalizePhoneNumber(phoneNumber) {
	            if (typeof phoneNumber === 'string' || typeof phoneNumber === 'number') return ('' + phoneNumber).replace(/[^0-9]*\+/, '00').replace(/[^0-9]+/g, '');
	            return '';
	        }
	        /**
	         * Represents given phone number. NOTE: Currently only support german phone
	         * numbers.
	         * @param phoneNumber - Number to format.
	         * @returns Formatted number.
	         */

	    }, {
	        key: 'stringRepresentPhoneNumber',
	        value: function stringRepresentPhoneNumber(phoneNumber) {
	            if (['number', 'string'].includes(Tools.determineType(phoneNumber)) && phoneNumber) {
	                // Represent country code and leading area code zero.
	                phoneNumber = ('' + phoneNumber).replace(/^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3');
	                // Add German country code if not exists.
	                phoneNumber = phoneNumber.replace(/^0([1-9][0-9-]+)$/, '+49 (0) $1');
	                // Separate area code from base number.
	                phoneNumber = phoneNumber.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2');
	                // Partition base number in one triple and tuples or tuples only.
	                return phoneNumber.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/, function (match, prefix, number, suffix) {
	                    return prefix + (number.length % 2 === 0 ? number.replace(/([0-9]{2})/g, '$1 ') : number.replace(/^([0-9]{3})([0-9]+)$/, function (match, triple, rest) {
	                        return triple + ' ' + rest.replace(/([0-9]{2})/g, '$1 ').trim();
	                    }) + suffix).trim();
	                }).trim();
	            }
	            return '';
	        }
	        /**
	         * Decodes all html symbols in text nodes in given html string.
	         * @param htmlString - HTML string to decode.
	         * @returns Decoded html string.
	         */

	    }, {
	        key: 'stringDecodeHTMLEntities',
	        value: function stringDecodeHTMLEntities(htmlString) {
	            if ('document' in $.global) {
	                var textareaDomNode = $.global.document.createElement('textarea');
	                textareaDomNode.innerHTML = htmlString;
	                return textareaDomNode.value;
	            }
	            return null;
	        }
	    }, {
	        key: 'numberIsNotANumber',
	        value: function numberIsNotANumber(object) {
	            return Tools.determineType(object) === 'number' && isNaN(object);
	        }
	        /**
	         * Rounds a given number accurate to given number of digits.
	         * @param number - The number to round.
	         * @param digits - The number of digits after comma.
	         * @returns Returns the rounded number.
	         */

	    }, {
	        key: 'numberRound',
	        value: function numberRound(number) {
	            var digits = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

	            return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
	        }
	        // / endregion
	        // / region data transfer
	        /**
	         * Send given data to a given iframe.
	         * @param target - Name of the target iframe or the target iframe itself.
	         * @param url - URL to send to data to.
	         * @param data - Data holding object to send data to.
	         * @param requestType - The forms action attribute value. If nothing is
	         * provided "post" will be used as default.
	         * @param removeAfterLoad - Indicates if created iframe should be removed
	         * right after load event. Only works if an iframe object is given instead
	         * of a simple target name.
	         * @returns Returns the given target.
	         */

	    }, {
	        key: 'sendToIFrame',
	        value: function sendToIFrame(target, url, data) {
	            var requestType = arguments.length <= 3 || arguments[3] === undefined ? 'post' : arguments[3];
	            var removeAfterLoad = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	            var targetName = typeof target === 'string' ? target : target.attr('name');
	            var $formDomNode = $('<form>').attr({
	                action: url,
	                method: requestType,
	                target: targetName
	            });
	            for (var _name4 in data) {
	                if (data.hasOwnProperty(_name4)) $formDomNode.append($('<input>').attr({
	                    type: 'hidden',
	                    name: _name4,
	                    value: data[_name4]
	                }));
	            }$formDomNode.submit().remove();
	            if (removeAfterLoad && (typeof target === 'undefined' ? 'undefined' : (0, _typeof3.default)(target)) === 'object' && 'on' in target)
	                // IgnoreTypeCheck
	                target.on('load', function () {
	                    return target.remove();
	                });
	            return targetName;
	        }
	    }]);
	    return Tools;
	}();
	// endregion
	// region handle $ extending


	Tools.abbreviations = ['html', 'id', 'url', 'us', 'de', 'api', 'href'];
	Tools.animationEndEventNames = 'animationend webkitAnimationEnd ' + 'oAnimationEnd MSAnimationEnd';
	Tools.classToTypeMapping = {
	    '[object Array]': 'array',
	    '[object Boolean]': 'boolean',
	    '[object Date]': 'date',
	    '[object Error]': 'error',
	    '[object Function]': 'function',
	    '[object Number]': 'number',
	    '[object Object]': 'object',
	    '[object RegExp]': 'regexp',
	    '[object String]': 'string'
	};
	Tools.keyCode = {
	    BACKSPACE: 8,
	    COMMA: 188,
	    DELETE: 46,
	    DOWN: 40,
	    END: 35,
	    ENTER: 13,
	    ESCAPE: 27,
	    HOME: 36,
	    LEFT: 37,
	    NUMPAD_ADD: 107,
	    NUMPAD_DECIMAL: 110,
	    NUMPAD_DIVIDE: 111,
	    NUMPAD_ENTER: 108,
	    NUMPAD_MULTIPLY: 106,
	    NUMPAD_SUBTRACT: 109,
	    PAGE_DOWN: 34,
	    PAGE_UP: 33,
	    PERIOD: 190,
	    RIGHT: 39,
	    SPACE: 32,
	    TAB: 9,
	    UP: 38
	};

	Tools.maximalSupportedInternetExplorerVersion = function () {
	    if (!('document' in $.global)) return 0;
	    var div = $.global.document.createElement('div');
	    var version = void 0;
	    for (version = 0; version < 10; version++) {
	        /*
	            NOTE: We split html comment sequences to avoid wrong
	            interpretation if this code is embedded in markup.
	            NOTE: Internet Explorer 9 and lower sometimes doesn't
	            understand conditional comments wich doesn't starts with a
	            whitespace. If the conditional markup isn't in a commend.
	            Otherwise there shouldn't be any whitespace!
	        */
	        /* eslint-disable no-useless-concat */
	        div.innerHTML = '<!' + ('--[if gt IE ' + version + ']><i></i><![e') + 'ndif]-' + '->';
	        /* eslint-enable no-useless-concat */
	        if (div.getElementsByTagName('i').length === 0) break;
	    }
	    // Try special detection for internet explorer 10 and 11.
	    if (version === 0 && 'navigator' in $.global) if ($.global.navigator.appVersion.includes('MSIE 10')) return 10;else if ($.global.navigator.userAgent.includes('Trident') && $.global.navigator.userAgent.includes('rv:11')) return 11;
	    return version;
	}();

	Tools.noop = 'noop' in $ ? $.noop : function () {};
	Tools.specialRegexSequences = ['-', '[', ']', '(', ')', '^', '$', '*', '+', '.', '{', '}'];
	Tools.transitionEndEventNames = 'transitionend ' + 'webkitTransitionEnd oTransitionEnd MSTransitionEnd';
	Tools.consoleMethodNames = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
	Tools._javaScriptDependentContentHandled = false;
	Tools._name = 'Tools';
	exports.default = Tools;
	if ('fn' in $) $.fn.Tools = function () {
	    return new Tools().controller(Tools, arguments, this);
	};
	$.Tools = function () {
	    return new Tools().controller(Tools, arguments);
	};
	$.Tools.class = Tools;
	// / region prop fix for comments and text nodes
	if ('fn' in $) {
	    (function () {
	        var nativePropFunction = $.fn.prop;
	        /**
	         * JQuery's native prop implementation ignores properties for text nodes,
	         * comments and attribute nodes.
	         * @param key - Name of property to retrieve from current dom node.
	         * @param value - Value to set for given property by name.
	         * @returns Returns value if used as getter or current dom node if used as
	         * setter.
	         */
	        $.fn.prop = function (key, value) {
	            if (arguments.length < 3 && this.length && ['#text', '#comment'].includes(this[0].nodeName) && key in this[0]) {
	                if (arguments.length === 1) return this[0][key];
	                if (arguments.length === 2) {
	                    this[0][key] = value;
	                    return this;
	                }
	            }
	            return nativePropFunction.apply(this, arguments);
	        };
	    })();
	}
	// / endregion
	// endregion
	// region vim modline
	// vim: set tabstop=4 shiftwidth=4 expandtab:
	// vim: foldmethod=marker foldmarker=region,endregion:
	// endregion
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(/*! ./~/webpack/buildin/module.js */ 2)(module)))

/***/ },
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/*!*****************************************************!*\
  !*** external "babel-runtime/core-js/get-iterator" ***!
  \*****************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/*!*******************************************************!*\
  !*** external "babel-runtime/core-js/json/stringify" ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/*!********************************************!*\
  !*** external "babel-runtime/core-js/map" ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/*!****************************************************************!*\
  !*** external "babel-runtime/core-js/object/get-prototype-of" ***!
  \****************************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/*!*******************************************************!*\
  !*** external "babel-runtime/helpers/classCallCheck" ***!
  \*******************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/*!****************************************************!*\
  !*** external "babel-runtime/helpers/createClass" ***!
  \****************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/*!******************************************************!*\
  !*** external "babel-runtime/helpers/slicedToArray" ***!
  \******************************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/*!***********************************************!*\
  !*** external "babel-runtime/helpers/typeof" ***!
  \***********************************************/
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/***/ function(module, exports) {

	if(typeof __WEBPACK_EXTERNAL_MODULE_11__ === 'undefined') {var e = new Error("Cannot find module \"jQuery\""); e.code = 'MODULE_NOT_FOUND'; throw e;}
	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])
});
;
if(typeof window==='undefined'||window===null)var window=(typeof globalThis==='undefined'||globalThis===null)?{}:globalThis;import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_includes_js_66c3fd7d__ from "core-js/modules/es.array.includes.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_array_push_js_baa3ea94__ from "core-js/modules/es.array.push.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_constructor_js_833f4df9__ from "core-js/modules/es.iterator.constructor.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_filter_js_abae28b4__ from "core-js/modules/es.iterator.filter.js";
import * as __WEBPACK_EXTERNAL_MODULE_core_js_modules_es_iterator_for_each_js_2628f2dd__ from "core-js/modules/es.iterator.for-each.js";
/******/ var __webpack_modules__ = ({

/***/ 9:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Lz: function() { return /* binding */ globalContext; },
/* harmony export */   tE: function() { return /* binding */ NOOP; }
/* harmony export */ });
/* unused harmony exports setGlobalContext, MAXIMAL_NUMBER_OF_ITERATIONS, mockConsole */
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

/***/ 42:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C_: function() { return /* binding */ createDomNodes; },
/* harmony export */   Cc: function() { return /* binding */ interruptableScrollTo; },
/* harmony export */   D7: function() { return /* binding */ STOP_AUTO_SCROLLING; },
/* harmony export */   HC: function() { return /* binding */ replace; },
/* harmony export */   LV: function() { return /* binding */ wrap; },
/* harmony export */   Rv: function() { return /* binding */ fade; },
/* harmony export */   S: function() { return /* binding */ SCROLL_EVENT_NAMES; },
/* harmony export */   UK: function() { return /* binding */ getAll; },
/* harmony export */   VG: function() { return /* binding */ scrollTo; },
/* harmony export */   Xn: function() { return /* binding */ fadeOut; },
/* harmony export */   ZQ: function() { return /* binding */ MANUAL_SCROLL_EVENT_NAMES; },
/* harmony export */   dK: function() { return /* binding */ _isHidden; },
/* harmony export */   kp: function() { return /* binding */ closest; },
/* harmony export */   l2: function() { return /* binding */ isEquivalent; },
/* harmony export */   oA: function() { return /* binding */ unwrap; },
/* harmony export */   q4: function() { return /* binding */ _getText; },
/* harmony export */   qG: function() { return /* binding */ fadeIn; },
/* harmony export */   qq: function() { return /* binding */ onDocumentReady; },
/* harmony export */   wT: function() { return /* binding */ getParents; }
/* harmony export */ });
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var core_js_modules_es_iterator_constructor_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var core_js_modules_es_iterator_filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var core_js_modules_es_iterator_for_each_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _utility_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30);
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
*/function _defaults(e,r){for(var t=Object.getOwnPropertyNames(r),o=0;o<t.length;o++){var n=t[o],a=Object.getOwnPropertyDescriptor(r,n);a&&a.configurable&&void 0===e[n]&&Object.defineProperty(e,n,a)}return e}function _typeof(o){"@babel/helpers - typeof";return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_typeof(o)}function _regenerator(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */var r,e,o="function"==typeof Symbol?Symbol:{},n=o.iterator||"@@iterator",a=o.toStringTag||"@@toStringTag";function i(o,n,a,i){var u=n&&n.prototype instanceof Generator?n:Generator,f=Object.create(u.prototype);return _regeneratorDefine2(f,"_invoke",function(t,o,n){var a,i,u,f=0,p=n||[],y=!1,G={p:0,n:0,v:r,a:l,f:l.bind(r,4),d:function d(t,e){return a=t,i=0,u=r,G.n=e,c}};function l(t,o){for(i=t,u=o,e=0;!y&&f&&!n&&e<p.length;e++){var n,a=p[e],l=G.p,F=a[2];t>3?(n=F===o)&&(u=a[(i=a[4])?5:(i=3,3)],a[4]=a[5]=r):a[0]<=l&&((n=t<2&&l<a[1])?(i=0,G.v=o,G.n=a[1]):l<F&&(n=t<3||a[0]>o||o>F)&&(a[4]=t,a[5]=o,G.n=F,i=0))}if(n||t>1)return c;throw y=!0,o}return function(n,p,F){if(f>1)throw TypeError("Generator is already running");for(y&&1===p&&l(p,F),i=p,u=F;(e=i<2?r:u)||!y;){a||(i?(i>1&&(G.n=i<3?-1:u),l(i,u)):G.v=u);try{if(f=2,a){if(i||(n="next"),e=a[n]){if(!(e=e.call(a,u)))throw TypeError("iterator result is not an object");if(!e.done)return e;u=e.value,i<2&&(i=0)}else 1===i&&(e=a.return)&&e.call(a),i<2&&(u=TypeError("The iterator does not provide a '"+n+"' method"),i=1);a=r}else if((e=(y=G.n<0)?u:t.call(o,G))!==c)break}catch(t){a=r,i=1,u=t}finally{f=1}}return{value:e,done:y}}}(o,a,i),!0),f}var c={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}e=Object.getPrototypeOf;var u=[][n]?e(e([][n]())):(_regeneratorDefine2(e={},n,function(){return this}),e),f=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(u);function p(r){return Object.setPrototypeOf?Object.setPrototypeOf(r,GeneratorFunctionPrototype):(_defaults(r,GeneratorFunctionPrototype),_regeneratorDefine2(r,a,"GeneratorFunction")),r.prototype=Object.create(f),r}return GeneratorFunction.prototype=GeneratorFunctionPrototype,_regeneratorDefine2(f,"constructor",GeneratorFunctionPrototype),_regeneratorDefine2(GeneratorFunctionPrototype,"constructor",GeneratorFunction),GeneratorFunction.displayName="GeneratorFunction",_regeneratorDefine2(GeneratorFunctionPrototype,a,"GeneratorFunction"),_regeneratorDefine2(f),_regeneratorDefine2(f,a,"Generator"),_regeneratorDefine2(f,n,function(){return this}),_regeneratorDefine2(f,"toString",function(){return"[object Generator]"}),(_regenerator=function _regenerator(){return{w:i,m:p}})()}function _regeneratorDefine2(e,r,n,t){var i=Object.defineProperty;try{i({},"",{})}catch(e){i=0}_regeneratorDefine2=function _regeneratorDefine(e,r,n,t){function o(r,n){_regeneratorDefine2(e,r,function(e){return this._invoke(r,n,e)})}r?i?i(e,r,{value:n,enumerable:!t,configurable:!t,writable:!t}):e[r]=n:(o("next",0),o("throw",1),o("return",2))},_regeneratorDefine2(e,r,n,t)}function asyncGeneratorStep(n,t,e,r,o,a,c){try{var i=n[a](c),u=i.value}catch(n){return void e(n)}i.done?t(u):Promise.resolve(u).then(r,o)}function _asyncToGenerator(n){return function(){var t=this,e=arguments;return new Promise(function(r,o){var a=n.apply(t,e);function _next(n){asyncGeneratorStep(a,r,o,_next,_throw,"next",n)}function _throw(n){asyncGeneratorStep(a,r,o,_next,_throw,"throw",n)}_next(void 0)})}}function _slicedToArray(e,i){return _iterableToArrayLimit(e,i)||_unsupportedIterableToArray(e,i)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArrayLimit(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){var l,n,i,a,u=[],o=!0,f=!1;try{if(i=(e=e.call(r)).next,0===t){if(Object(e)!==e)return;o=!1}else for(;!(o=(l=i.call(e)).done)&&(u.push(l.value),u.length!==t);o=!0);}catch(r){f=!0,n=r}finally{try{if(!o&&null!=e.return&&(a=e.return(),Object(a)!==a))return}finally{if(f)throw n}}return u}}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter(function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable})),t.push.apply(t,o)}return t}function _objectSpread(r){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(o),!0).forEach(function(t){_defineProperty(r,t,o[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):ownKeys(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}function _defineProperty(r,t,o){return(t=_toPropertyKey(t))in r?Object.defineProperty(r,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):r[t]=o,r}function _toPropertyKey(r){var o=_toPrimitive(r,"string");return"symbol"==_typeof(o)?o:o+""}function _toPrimitive(t,e){if("object"!=_typeof(t)||!t)return t;var r;if("undefined"!=typeof Symbol&&void 0!==(r=t[Symbol.toPrimitive])){var i=r.call(t,e||"default");if("object"!=_typeof(i))return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _createForOfIteratorHelper(e,t){var _n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!_n){if(Array.isArray(e)||(_n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){_n&&(e=_n);var o=0,F=function F(){};return{s:F,n:function n(){return o>=e.length?{done:!0}:{done:!1,value:e[o++]}},e:function e(r){throw r},f:F}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,u,i=!0;return{s:function s(){_n=_n.call(e)},n:function n(){i=!0;var r=_n.next();return r.done?{done:!0}:{value:r.value,done:i=!1}},e:function e(r){a=!0,u=r},f:function f(){try{i||null==_n.return||_n.return()}finally{if(a)throw u}}}}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};var STOP_AUTO_SCROLLING={value:_context_js__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE};var MANUAL_SCROLL_EVENT_NAMES=["DOMMouseScroll","keydown","mousedown","mousewheel","wheel","touchstart","touchmove"];var SCROLL_EVENT_NAMES=["scroll"].concat(MANUAL_SCROLL_EVENT_NAMES);var closest=function closest(node,selector,startWithParent){var _node$parentElement;if(startWithParent===void 0){startWithParent=false}return"closest"in node&&!startWithParent?node.closest(selector):((_node$parentElement=node.parentElement)===null||_node$parentElement===void 0?void 0:_node$parentElement.closest(selector))||null};var createDomNodes=function createDomNodes(html){var domNodeWrapper=document.createElement("div");domNodeWrapper.innerHTML=html;if(domNodeWrapper.childNodes.length===1)/*
            NOTE: We need to clone the nested child to decouple it from its
            parent node.
        */return domNodeWrapper.childNodes[0].cloneNode(true);return domNodeWrapper};var fade=function fade(domNode,intervalInMilliseconds,out){if(intervalInMilliseconds===void 0){intervalInMilliseconds=200}if(out===void 0){out=true}var transitionBackup=domNode.style.transition;var visibleBackup=domNode.style.visibility;var opacityBackup=domNode.style.opacity;var hadStyleAttribute=domNode.hasAttribute("style");if(out){domNode.style.visibility="hidden";domNode.style.opacity="0";domNode.style.transition="visibility 0s ".concat(String(intervalInMilliseconds),"ms, ")+"opacity ".concat(String(intervalInMilliseconds),"ms linear")}else{domNode.style.visibility="visible";domNode.style.opacity="1";domNode.style.transition="opacity ".concat(String(intervalInMilliseconds),"ms linear")}var clearTimeoutAndResetDomNode=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE;var resolved=false;var promise=new Promise(function(resolve){clearTimeoutAndResetDomNode=function clearTimeoutAndResetDomNode(){domNode.style.transition=transitionBackup;resolved=true;resolve()};void (0,_utility_js__WEBPACK_IMPORTED_MODULE_6__/* .timeout */ .wR)(intervalInMilliseconds).then(clearTimeoutAndResetDomNode)});promise.clear=function(){if(!resolved){domNode.style.transition="none";clearTimeoutAndResetDomNode()}};promise.resetStyles=function(){if(hadStyleAttribute){domNode.style.transition=transitionBackup;domNode.style.visibility=visibleBackup;domNode.style.opacity=opacityBackup}else domNode.removeAttribute("style")};return promise};var fadeIn=function fadeIn(domNode,intervalInMilliseconds){if(intervalInMilliseconds===void 0){intervalInMilliseconds=200}return fade(domNode,intervalInMilliseconds,false)};var fadeOut=function fadeOut(domNode,intervalInMilliseconds){if(intervalInMilliseconds===void 0){intervalInMilliseconds=200}return fade(domNode,intervalInMilliseconds)};var getAll=function getAll(root){if(!_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document)return[];var nodes=[];// SHOW_ALL includes elements, text, and comments
var walker=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document.createTreeWalker(root,NodeFilter.SHOW_ALL,null);var currentNode=walker.currentNode;while(currentNode){nodes.push(currentNode);currentNode=walker.nextNode()}return nodes};var getParents=function getParents(node){var result=[];while(node.parentNode){result.push(node.parentNode);node=node.parentNode}return result};var _getText=function getText(root,recursive){if(recursive===void 0){recursive=false}if(root.nodeType===Node.TEXT_NODE){var _root$nodeValue;var content=(_root$nodeValue=root.nodeValue)===null||_root$nodeValue===void 0?void 0:_root$nodeValue.trim();if(content)return[content]}var result=[];var _iterator=_createForOfIteratorHelper(root.childNodes),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var domNode=_step.value;if(recursive||domNode.nodeType===Node.TEXT_NODE)result.push.apply(result,_toConsumableArray(_getText(domNode)))}}catch(err){_iterator.e(err)}finally{_iterator.f()}return result};/**
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
 */var interruptableScrollTo=function interruptableScrollTo(givenOptions){if(givenOptions===void 0){givenOptions={}}if(!(_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document&&_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.window))return;var document=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document;var body=document.body;var window=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.window;if(givenOptions.containerDomNode&&!("getBoundingClientRect"in givenOptions.containerDomNode)&&"parentElement"in givenOptions.containerDomNode)givenOptions.containerDomNode=givenOptions.containerDomNode.parentElement;if(givenOptions.targetDomNode&&!("getBoundingClientRect"in givenOptions.targetDomNode)&&"parentElement"in givenOptions.targetDomNode)givenOptions.targetDomNode=givenOptions.targetDomNode.parentElement;var options=_objectSpread({targetDomNode:body,containerDomNode:window,durationInMilliseconds:500,offset:_objectSpread({top:0,left:0},givenOptions.offset||{}),interruptOnManualScroll:true},givenOptions);var isWindow=options.containerDomNode===window;// 1. Get current starting scroll positions
var startY=isWindow?window.scrollY||document.documentElement.scrollTop:options.containerDomNode.scrollTop;var startX=isWindow?window.scrollX||document.documentElement.scrollLeft:options.containerDomNode.scrollLeft;// 2. Calculate targetDomNode positions for both axes
var targetY;var targetX;if(isWindow){var rect=options.targetDomNode.getBoundingClientRect();targetY=rect.top+(window.scrollY||document.documentElement.scrollTop)-options.offset.top;targetX=rect.left+(window.scrollX||document.documentElement.scrollLeft)-options.offset.left}else{// Relative to the scrollable parent container
targetY=options.targetDomNode.offsetTop-options.containerDomNode.offsetTop-options.offset.top;targetX=options.targetDomNode.offsetLeft-options.containerDomNode.offsetLeft-options.offset.left}var distanceY=targetY-startY;var distanceX=targetX-startX;// If no movement is needed, exit immediately
if(distanceY===0&&distanceX===0)return;var startTime=null;var animationFrameId=null;// Easing function
var easeInOutQuad=function easeInOutQuad(time){return time<0.5?2*time*time:-1+(4-2*time)*time};if(options.interruptOnManualScroll){// 3. Define the interrupt / teardown system
STOP_AUTO_SCROLLING.value=function(){if(animationFrameId){cancelAnimationFrame(animationFrameId);animationFrameId=null}for(var _i=0,_arr=[body,document.querySelector("html"),window];_i<_arr.length;_i++){var node=_arr[_i];for(var _i2=0,_MANUAL_SCROLL_EVENT_=MANUAL_SCROLL_EVENT_NAMES;_i2<_MANUAL_SCROLL_EVENT_.length;_i2++){var name=_MANUAL_SCROLL_EVENT_[_i2];node===null||node===void 0||node.removeEventListener(name,STOP_AUTO_SCROLLING.value)}}STOP_AUTO_SCROLLING.value=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .NOOP */ .tE};for(var _i3=0,_arr2=[body,document.querySelector("html"),window];_i3<_arr2.length;_i3++){var node=_arr2[_i3];for(var _i4=0,_MANUAL_SCROLL_EVENT_2=MANUAL_SCROLL_EVENT_NAMES;_i4<_MANUAL_SCROLL_EVENT_2.length;_i4++){var name=_MANUAL_SCROLL_EVENT_2[_i4];node===null||node===void 0||node.addEventListener(name,STOP_AUTO_SCROLLING.value,{passive:true})}}}// 4. Multi-axis animation loop
var _step2=function step(currentTime){if(!startTime)startTime=currentTime;var progress=currentTime-startTime;var timeRatio=Math.min(progress/options.durationInMilliseconds,1);var easedRatio=easeInOutQuad(timeRatio);// Linearly interpolate the positions based on eased progress.
var nextY=startY+distanceY*easedRatio;var nextX=startX+distanceX*easedRatio;// Apply scroll to window or container.
if(isWindow)window.scrollTo(nextX,nextY);else{;options.containerDomNode.scrollTop=nextY;options.containerDomNode.scrollLeft=nextX}if(timeRatio<1)animationFrameId=requestAnimationFrame(_step2);else STOP_AUTO_SCROLLING.value()};animationFrameId=requestAnimationFrame(_step2)};/**
 * Scrolls to the given DomNode's location or tio of the page.
 * @param targetDomNode - DomNode to scroll to. If not given, scrolls to the
 * top of the page.
 * @param behavior - Scroll behavior to use.
 */var scrollTo=function scrollTo(targetDomNode,behavior){var _globalContext$window;if(targetDomNode===void 0){targetDomNode=null}if(behavior===void 0){behavior="smooth"}if(targetDomNode&&!("getBoundingClientRect"in targetDomNode))targetDomNode=targetDomNode.parentElement;var _ref=targetDomNode?targetDomNode.getBoundingClientRect():{left:0,top:0},left=_ref.left,top=_ref.top;(_globalContext$window=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.window)===null||_globalContext$window===void 0||_globalContext$window.scrollTo({left:left,top:top,behavior:behavior})};/**
 * Checks whether given html or text strings are equal.
 * @param first - First html, selector to dom node or text to compare.
 * @param second - Second html, selector to dom node or text to compare.
 * @param forceHTMLString - Indicates whether given contents are
 * interpreted as html string (otherwise automatic detection will be
 * triggered).
 * @returns Returns true if both dom representations are equivalent.
 */var isEquivalent=function isEquivalent(first,second,forceHTMLString){if(forceHTMLString===void 0){forceHTMLString=false}if(first===second)return true;if(!(first&&second))return false;if(!_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document)throw new Error("Missing document in global context.");var createElement=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document.createElement.bind(_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document);var determineHTMLPattern=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;var inputs={first:first,second:second};var domNodes={first:createElement("dummy"),second:createElement("dummy")};/*
        NOTE: Assume that strings that start "<" and end with ">" are mark up
        and skip the more expensive regular expression check.
    */for(var _i5=0,_Object$entries=Object.entries(inputs);_i5<_Object$entries.length;_i5++){var _Object$entries$_i=_slicedToArray(_Object$entries[_i5],2),type=_Object$entries$_i[0],html=_Object$entries$_i[1];if(typeof html==="string"){if(forceHTMLString||html.startsWith("<")&&html.endsWith(">")&&html.length>=3||determineHTMLPattern.test(html))domNodes[type]=createDomNodes(html);else{var domNode=document.querySelector(html);if(domNode)/*
                        NOTE: We copy the node tree to not manipulate the
                        original dom node by normalizing it afterward.
                    */domNodes[type]=domNode.cloneNode(true);else return false}}else if("cloneNode"in html)domNodes[type]=html.cloneNode(true);else return false}domNodes.first.normalize();domNodes.second.normalize();return domNodes.first.isEqualNode(domNodes.second)};/**
 * Checks whether the given dom node is visible or takes space in the document
 * flow.
 * Elements with visibility: hidden or opacity: 0 are considered to be visible,
 * since they still consume space in the layout. During animations that hide an
 * element, the element is considered to be visible until the end of the
 * animation.
 * @param domNode - To inspect.
 * @returns A boolean indicating the visibility.
 */var _isHidden=function isHidden(domNode){var _globalContext$docume;return!((_globalContext$docume=_context_js__WEBPACK_IMPORTED_MODULE_5__/* .globalContext */ .Lz.document)!==null&&_globalContext$docume!==void 0&&_globalContext$docume.contains(domNode))||domNode.style.display==="none"||domNode.nodeName==="INPUT"&&domNode.getAttribute("type")==="hidden"||["contents","inline"].includes(domNode.style.display)&&(!("innerHTML"in domNode)||domNode.innerHTML.trim()==="")||domNode.style.height==="0px"&&domNode.style.width==="0px"||Boolean(domNode.parentElement)&&_isHidden(domNode.parentElement)};var onDocumentReady=function onDocumentReady(callback){return new Promise(function(resolve){return void _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(){return _regenerator().w(function(_context){while(1)switch(_context.n){case 0:if(!["complete","interactive"].includes(document.readyState)){_context.n=2;break}_context.n=1;return (0,_utility_js__WEBPACK_IMPORTED_MODULE_6__/* .timeout */ .wR)();case 1:resolve();callback===null||callback===void 0||callback();_context.n=3;break;case 2:document.addEventListener("DOMContentLoaded",function(){resolve();callback===null||callback===void 0||callback()});case 3:return _context.a(2)}},_callee)}))()})};/**
 * Replaces a given dom node with given nodes.
 * @param domNodeToReplace - Node to replace its children.
 * @param replacementDomNodes - Node or array of nodes to use as replacement.
 * @param skipEmptyTextNodes - Configures whether to trim text.
 */var replace=function replace(domNodeToReplace,replacementDomNodes,skipEmptyTextNodes){if(skipEmptyTextNodes===void 0){skipEmptyTextNodes=false}var _iterator2=_createForOfIteratorHelper([].concat(replacementDomNodes).reverse()),_step3;try{for(_iterator2.s();!(_step3=_iterator2.n()).done;){var _replacement$nodeValu;var replacement=_step3.value;if(!(skipEmptyTextNodes&&replacement.nodeType===Node.TEXT_NODE&&((_replacement$nodeValu=replacement.nodeValue)===null||_replacement$nodeValu===void 0?void 0:_replacement$nodeValu.trim())===""))domNodeToReplace.after(replacement)}}catch(err){_iterator2.e(err)}finally{_iterator2.f()}domNodeToReplace.remove()};/**
 * Moves the content of a given dom node one level up and removes the given
 * node.
 * @param domNode - Node to unwrap.
 * @returns List of unwrapped nodes.
 */var unwrap=function unwrap(domNode){var parent=domNode.parentNode;var result=[];// NOTE: We need to use "Array.from" to copy the list.
for(var _i6=0,_Array$from=Array.from(domNode.childNodes);_i6<_Array$from.length;_i6++){var childNode=_Array$from[_i6];result.push(childNode);if(parent)parent.insertBefore(childNode,domNode)}if(parent)parent.removeChild(domNode);return result};var wrap=function wrap(domNodes,wrapper){var domNodeList=domNodes.length?Array.from(domNodes):[domNodes];// Use the first element's position as the anchor point
var first=domNodeList[0];if(first.parentNode)first.parentNode.insertBefore(wrapper,first);var _iterator3=_createForOfIteratorHelper(domNodeList),_step4;try{for(_iterator3.s();!(_step4=_iterator3.n()).done;){var domNode=_step4.value;wrapper.appendChild(domNode)}}catch(err){_iterator3.e(err)}finally{_iterator3.f()}};

/***/ }),

/***/ 8:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tn: function() { return /* binding */ isFunction; }
/* harmony export */ });
/* unused harmony exports isAnyMatching, isArrayLike, isMap, isNumeric, isObject, isPlainObject, isProxy, isSet, isWindow */
/* unused harmony import specifier */ var PLAIN_OBJECT_PROTOTYPES;
/* unused harmony import specifier */ var determineType;
/* harmony import */ var core_js_modules_es_array_includes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
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
 */var isMap=function isMap(value){return determineType(value)==="map"};/**
 * Determines whether its argument represents a JavaScript number.
 * @param value - Value to analyze.
 * @returns A boolean value indicating whether given object is numeric
 * like.
 */var isNumeric=function isNumeric(value){var type=determineType(value);/*
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
 */var isSet=function isSet(value){return determineType(value)==="set"};/**
 * Determine whether the argument is a window.
 * @param value - Value to check for.
 * @returns Boolean value indicating the result.
 */var isWindow=function isWindow(value){return![null,undefined].includes(value)&&_typeof(value)==="object"&&value===(value===null||value===void 0?void 0:value.window)};

/***/ }),

/***/ 4:
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

/***/ 30:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   wR: function() { return /* binding */ timeout; }
/* harmony export */ });
/* unused harmony exports debounce, trailingThrottle, preventDefault, stopPropagation */
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _indicators_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
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
*/function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_unsupportedIterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(t,e){if(t){if("string"==typeof t)return _arrayLikeToArray(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?_arrayLikeToArray(t,e):void 0}}function _iterableToArray(r){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(Array.isArray(r)&&(null==e||e===("undefined"!=typeof Symbol&&[][Symbol.iterator])||e===[]["@@iterator"]))return r;if(null!=e){for(var t,o=[],a=e.call(r);!(t=a.next()).done;)o.push(t.value);return o}}function _arrayWithoutHoles(a){if(Array.isArray(a))return _arrayLikeToArray(a)}function _arrayLikeToArray(r,a){(null==a||a>r.length)&&(a=r.length);for(var e=0,n=Array(a);e<a;e++)n[e]=r[e];return n};/**
 * Prevents event functions from triggering too close after each trigger by
 * defining a minimal span between each function call. Additional arguments
 * given to this function will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */var debounce=function debounce(callback,thresholdInMilliseconds){if(thresholdInMilliseconds===void 0){thresholdInMilliseconds=600}for(var _len=arguments.length,additionalArguments=new Array(_len>2?_len-2:0),_key=2;_key<_len;_key++){additionalArguments[_key-2]=arguments[_key]}var timeoutPromise;var nextResultPromiseResolver;var nextResultPromise=new Promise(function(resolve){nextResultPromiseResolver=resolve});return function(){var _timeoutPromise;for(var _len2=arguments.length,parameters=new Array(_len2),_key2=0;_key2<_len2;_key2++){parameters[_key2]=arguments[_key2]}parameters=parameters.concat(additionalArguments);(_timeoutPromise=timeoutPromise)===null||_timeoutPromise===void 0||_timeoutPromise.clear();timeoutPromise=timeout(function(){nextResultPromiseResolver(callback.apply(void 0,_toConsumableArray(parameters)));nextResultPromise=new Promise(function(resolve){nextResultPromiseResolver=resolve})},thresholdInMilliseconds);return nextResultPromise}};/**
 * Prevents event functions from triggering too often by defining a minimal
 * span between each function call. Additional arguments given to this function
 * will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */var trailingThrottle=function trailingThrottle(callback,thresholdInMilliseconds){if(thresholdInMilliseconds===void 0){thresholdInMilliseconds=600}for(var _len3=arguments.length,additionalArguments=new Array(_len3>2?_len3-2:0),_key3=2;_key3<_len3;_key3++){additionalArguments[_key3-2]=arguments[_key3]}var timeoutID=null;var recentParameters=[];return function(){for(var _len4=arguments.length,parameters=new Array(_len4),_key4=0;_key4<_len4;_key4++){parameters[_key4]=arguments[_key4]}recentParameters=parameters;if(timeoutID)return;timeoutID=setTimeout(function(){callback.apply(void 0,_toConsumableArray(recentParameters).concat(additionalArguments));// Reset for next cycle.
timeoutID=null;recentParameters=[]},thresholdInMilliseconds)}};var preventDefault=function preventDefault(event){event.preventDefault()};var stopPropagation=function stopPropagation(event){event.stopPropagation()};/**
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
 */var timeout=function timeout(){for(var _len5=arguments.length,parameters=new Array(_len5),_key5=0;_key5<_len5;_key5++){parameters[_key5]=arguments[_key5]}var callback=_context_js__WEBPACK_IMPORTED_MODULE_1__/* .NOOP */ .tE;var delayInMilliseconds=0;var throwOnTimeoutClear=false;for(var _i=0,_parameters=parameters;_i<_parameters.length;_i++){var value=_parameters[_i];if(typeof value==="number"&&!isNaN(value))delayInMilliseconds=value;else if(typeof value==="boolean")throwOnTimeoutClear=value;else if((0,_indicators_js__WEBPACK_IMPORTED_MODULE_2__/* .isFunction */ .Tn)(value))callback=value}var rejectCallback;var resolveCallback;var result=new Promise(function(resolve,reject){rejectCallback=reject;resolveCallback=resolve});var wrappedCallback=function wrappedCallback(){var _callback;(_callback=callback).call.apply(_callback,[result].concat(parameters));resolveCallback(false)};var maximumTimeoutDelayInMilliseconds=2147483647;if(delayInMilliseconds<=maximumTimeoutDelayInMilliseconds)result.timeoutID=setTimeout(wrappedCallback,delayInMilliseconds);else{/*
            Determine the number of times we need to delay by maximum
            possible timeout duration.
        */var numberOfRemainingTimeouts=Math.floor(delayInMilliseconds/maximumTimeoutDelayInMilliseconds);var finalTimeoutDuration=delayInMilliseconds%maximumTimeoutDelayInMilliseconds;var _delay=function delay(){if(numberOfRemainingTimeouts>0){numberOfRemainingTimeouts-=1;result.timeoutID=setTimeout(_delay,maximumTimeoutDelayInMilliseconds)}else result.timeoutID=setTimeout(wrappedCallback,finalTimeoutDuration)};_delay()}result.clear=function(){if(Object.prototype.hasOwnProperty.call(result,"timeoutID")){clearTimeout(result.timeoutID);(throwOnTimeoutClear?rejectCallback:resolveCallback)(true)}};return result};

/***/ }),

/***/ 10:
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

/***/ 1:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),

/***/ 0:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),

/***/ 3:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),

/***/ 6:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ }),

/***/ 7:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var x = function(y) {
	var x = {}; __webpack_require__.d(x, y); return x
} 
var y = function(x) { return function() { return x; }; }
module.exports = x({  });

/***/ })

/******/ });
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
/******/ var __webpack_exports__ = __webpack_require__(42);
/******/ var __webpack_exports__MANUAL_SCROLL_EVENT_NAMES = __webpack_exports__.ZQ;
/******/ var __webpack_exports__SCROLL_EVENT_NAMES = __webpack_exports__.S;
/******/ var __webpack_exports__STOP_AUTO_SCROLLING = __webpack_exports__.D7;
/******/ var __webpack_exports__closest = __webpack_exports__.kp;
/******/ var __webpack_exports__createDomNodes = __webpack_exports__.C_;
/******/ var __webpack_exports__fade = __webpack_exports__.Rv;
/******/ var __webpack_exports__fadeIn = __webpack_exports__.qG;
/******/ var __webpack_exports__fadeOut = __webpack_exports__.Xn;
/******/ var __webpack_exports__getAll = __webpack_exports__.UK;
/******/ var __webpack_exports__getParents = __webpack_exports__.wT;
/******/ var __webpack_exports__getText = __webpack_exports__.q4;
/******/ var __webpack_exports__interruptableScrollTo = __webpack_exports__.Cc;
/******/ var __webpack_exports__isEquivalent = __webpack_exports__.l2;
/******/ var __webpack_exports__isHidden = __webpack_exports__.dK;
/******/ var __webpack_exports__onDocumentReady = __webpack_exports__.qq;
/******/ var __webpack_exports__replace = __webpack_exports__.HC;
/******/ var __webpack_exports__scrollTo = __webpack_exports__.VG;
/******/ var __webpack_exports__unwrap = __webpack_exports__.oA;
/******/ var __webpack_exports__wrap = __webpack_exports__.LV;
/******/ export { __webpack_exports__MANUAL_SCROLL_EVENT_NAMES as MANUAL_SCROLL_EVENT_NAMES, __webpack_exports__SCROLL_EVENT_NAMES as SCROLL_EVENT_NAMES, __webpack_exports__STOP_AUTO_SCROLLING as STOP_AUTO_SCROLLING, __webpack_exports__closest as closest, __webpack_exports__createDomNodes as createDomNodes, __webpack_exports__fade as fade, __webpack_exports__fadeIn as fadeIn, __webpack_exports__fadeOut as fadeOut, __webpack_exports__getAll as getAll, __webpack_exports__getParents as getParents, __webpack_exports__getText as getText, __webpack_exports__interruptableScrollTo as interruptableScrollTo, __webpack_exports__isEquivalent as isEquivalent, __webpack_exports__isHidden as isHidden, __webpack_exports__onDocumentReady as onDocumentReady, __webpack_exports__replace as replace, __webpack_exports__scrollTo as scrollTo, __webpack_exports__unwrap as unwrap, __webpack_exports__wrap as wrap };
/******/ 

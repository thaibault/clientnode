// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module clientnode */
'use strict'
/* !
    region header
    [Project page](https://torben.website/clientnode)

    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
// region imports
import {ChildProcess} from 'child_process'
import {
    Response as FetchResponse,
    RequestInit as FetchOptions,
    RequestInfo as FetchURL
} from 'node-fetch'

import {
    File,
    GetterFunction,
    LockCallbackFunction,
    Mapping,
    Noop,
    ObjectMaskConfiguration,
    Options,
    PlainObject,
    Position,
    ProcessCloseCallback,
    ProcessCloseReason,
    ProcessError,
    ProcessErrorCallback,
    ProcessHandler,
    ProxyHandler,
    RelativePosition,
    SetterFunction,
    TimeoutPromise,
    ToolsFunction,
    $DomNode,
    $Function,
    $Global
} from './type'
// endregion
declare const __non_webpack_require__:typeof require
export const currentRequire = typeof __non_webpack_require__ === 'function' ?
    __non_webpack_require__ :
    eval('require')
export const optionalRequire = (...parameter:Array<any>):any => {
    try {
        return currentRequire(...parameter)
    } catch (error) {
        return
    }
}
export const CloseEventNames = [
    'close', 'exit', 'SIGINT', 'SIGTERM', 'SIGQUIT', 'uncaughtException'
] as const
export const ConsoleOutputMethods = [
    'debug', 'error', 'info', 'log', 'warn'
] as const
export const ValueCopySymbol = Symbol('Value')
// region determine environment
// / region context
export const determineGlobalContext:(() => $Global) = ():$Global => {
    if (typeof globalThis === 'undefined') {
        if (typeof window === 'undefined') {
            if (typeof global === 'undefined')
                return ((typeof module === 'undefined') ? {} : module) as $Global
            if ('window' in global)
                return (global as typeof globalThis).window as unknown as $Global
            return global as unknown as $Global
        }
        return window as unknown as $Global
    }
    return globalThis as unknown as $Global
}
export let globalContext:$Global = determineGlobalContext()
export const setGlobalContext = (context:$Global):void => {
    globalContext = context
}
const fetch = 'fetch' in globalContext ?
    globalContext.fetch :
    optionalRequire('node-fetch')
const synchronousFileSystem = optionalRequire('fs')
const fileSystem = synchronousFileSystem ?
    synchronousFileSystem.promises :
    undefined
const path = optionalRequire('path')
// / endregion
// / region $
export const determine$:(() => $Function) = ():$Function => {
    let $:$Function|undefined
    if ('$' in globalContext && globalContext.$ !== null)
        $ = globalContext.$
    else {
        if (!('$' in globalContext) && 'document' in globalContext)
            /* eslint-disable no-empty */
            try {
                $ = require('jquery')
            } catch (error) {}
            /* eslint-enable no-empty */
        if (typeof $ === 'undefined') {
            const selector:any = (
                'document' in globalContext &&
                'querySelectorAll' in globalContext.document
            ) ?
                globalContext.document.querySelectorAll.bind(
                    globalContext.document
                ) :
                ():null => null
            $ = ((parameter:any, ...additionalArguments:Array<any>):any => {
                if (typeof parameter === 'string') {
                    const $domNodes:NodeList = selector(
                        parameter, ...additionalArguments
                    )
                    if ($domNodes && 'fn' in ($ as unknown as $Function))
                        for (const key in ($ as unknown as $Function).fn)
                            if (Object.prototype.hasOwnProperty.call(
                                ($ as unknown as $Function).fn, key
                            ))
                                $domNodes[key] = (
                                    ($ as unknown as $Function).fn[key] as
                                        unknown as Function
                                ).bind($domNodes)
                    return $domNodes
                }
                /* eslint-disable @typescript-eslint/no-use-before-define */
                if (Tools.isFunction(parameter) && 'document' in globalContext)
                /* eslint-enable @typescript-eslint/no-use-before-define */
                    globalContext.document.addEventListener(
                        'DOMContentLoaded', parameter
                    )
                return parameter
            }) as $Function
            ($.fn as object) = {}
        }
    }
    if (!('global' in $))
        $.global = globalContext
    if (!('context' in $) && 'document' in $.global && $.global.document)
        $.context = $.global.document
    return $
}
export let $:$Function = determine$()
// / endregion
// endregion
// region plugins/classes
/**
 * Represents the semaphore state.
 * @property queue - List of waiting resource requests.
 * @property numberOfFreeResources - Number free allowed concurrent resource
 * uses.
 * @property numberOfResources - Number of allowed concurrent resource uses.
 */
export class Semaphore {
    queue:Array<Function> = []
    numberOfResources:number
    numberOfFreeResources:number
    /**
     * Initializes number of resources.
     * @param numberOfResources - Number of resources to manage.
     * @returns Nothing.
     */
    constructor(numberOfResources = 2) {
        this.numberOfResources = numberOfResources
        this.numberOfFreeResources = numberOfResources
    }
    /**
     * Acquires a new resource and runs given callback if available.
     * @returns A promise which will be resolved if requested resource
     * is available.
     */
    acquire():Promise<void> {
        return new Promise((resolve:Function):void => {
            if (this.numberOfFreeResources <= 0)
                this.queue.push(resolve)
            else {
                this.numberOfFreeResources -= 1
                resolve(this.numberOfFreeResources)
            }
        })
    }
    /**
     * Releases a resource and runs a waiting resolver if there exists some.
     * @returns Nothing.
     */
    release():void {
        const callback:Function|undefined = this.queue.pop()
        if (callback === undefined)
            this.numberOfFreeResources += 1
        else
            callback(this.numberOfFreeResources)
    }
}
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
 * @property static:keyCode - Saves a mapping from key codes to their
 * corresponding name.
 * @property static:maximalSupportedInternetExplorerVersion - Saves currently
 * minimal supported internet explorer version. Saves zero if no internet
 * explorer present.
 * @property static:name - Not minifyable class name.
 * @property static:noop - A no-op dummy function.
 * @property static:specialRegexSequences - A list of special regular
 * expression symbols.
 * @property static:transitionEndEventNames - Saves a string with all css3
 * browser specific transition end event names.
 *
 * @property static:_dateTimePatternCache - Caches compiled date tine pattern
 * regular expressions.
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
 */
export class Tools<TElement = HTMLElement> {
    // region static properties
    static abbreviations:Array<string> = [
        'html', 'id', 'url', 'us', 'de', 'api', 'href'
    ]
    static readonly animationEndEventNames =
        'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd'
    static readonly classToTypeMapping:Mapping = {
        '[object Array]': 'array',
        '[object Boolean]': 'boolean',
        '[object Date]': 'date',
        '[object Error]': 'error',
        '[object Function]': 'function',
        '[object Map]': 'map',
        '[object Number]': 'number',
        '[object Object]': 'object',
        '[object RegExp]': 'regexp',
        '[object Set]': 'set',
        '[object String]': 'string'
    }
    static readonly keyCode:Mapping<number> = {
        BACKSPACE: 8,
        COMMA: 188,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
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
    }
    static readonly maximalSupportedInternetExplorerVersion:number = ((
    ):number => {
        /*
            NOTE: This method uses "Array.indexOf" instead of "Array.includes"
            since this function could be crucial in wide browser support.
        */
        if (!('document' in $.global && $.global.document))
            return 0
        const div = $.global.document.createElement('div')
        let version:number
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
            div.innerHTML = (
                '<!' + `--[if gt IE ${version}]><i></i><![e` + 'ndif]-' + '->')
            /* eslint-enable no-useless-concat */
            if (div.getElementsByTagName('i').length === 0)
                break
        }
        // Try special detection for internet explorer 10 and 11.
        if (version === 0 && 'navigator' in $.global)
            /* eslint-disable @typescript-eslint/prefer-includes */
            if ($.global.navigator.appVersion.indexOf('MSIE 10') !== -1)
                return 10
            else if (
                $.global.navigator.userAgent.indexOf('Trident') !== -1 &&
                $.global.navigator.userAgent.indexOf('rv:11') !== -1
            )
                return 11
            /* eslint-enable @typescript-eslint/prefer-includes */
        return version
    })()
    /* eslint-disable @typescript-eslint/no-empty-function */
    static noop:Noop = ('noop' in $) ? $.noop as Noop : ():void => {}
    /* eslint-enable @typescript-eslint/no-empty-function */
    static plainObjectPrototypes:Array<any> = [Object.prototype]
    static readonly specialRegexSequences:Array<string> = [
        '-', '[', ']', '(', ')', '^', '$', '*', '+', '.', '{', '}'
    ]
    static readonly transitionEndEventNames:string = 'transitionend ' +
        'webkitTransitionEnd oTransitionEnd MSTransitionEnd'

    static _dateTimePatternCache:Array<RegExp> = []
    static _javaScriptDependentContentHandled = false
    /*
        NOTE: Cannot be "name" to avoid conflicts with native "Function.name"
        property.
        NOTE: Type cannot be value type "Tools" to enable subclasses to
        overwrite with their specific name.
    */
    static readonly _name:string = 'Tools'
    // endregion
    // region dynamic properties
    $domNode:null|$DomNode<TElement> = null
    locks:Mapping<Array<LockCallbackFunction>>

    _defaultOptions:Options
    _options:Options
    readonly _self:typeof Tools = Tools
    // endregion
    // region public methods
    // / region special
    /**
     * Triggered if current object is created via the "new" keyword. The dom
     * node selector prefix enforces to not globally select any dom nodes which
     * aren't in the expected scope of this plugin. "{1}" will be automatically
     * replaced with this plugin name suffix ("tools"). You don't have to use
     * "{1}" but it can help you to write code which is more reconcilable with
     * the dry concept.
     * @param $domNode - $-extended dom node to use as reference in various
     * methods.
     * @param options - Options to change runtime behavior.
     * @param defaultOptions - Default options to ensure to be present in any
     * options instance.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     * @returns Nothing.
     */
    constructor(
        $domNode?:$DomNode<TElement>,
        options?:Options,
        defaultOptions:Options = {
            domNode: {
                hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
                showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
            },
            domNodeSelectorPrefix: 'body',
            logging: false
        },
        locks:Mapping<Array<LockCallbackFunction>> = {}
    ) {
        if ($domNode)
            this.$domNode = $domNode
        this._defaultOptions = defaultOptions
        if (options)
            this._options = options
        else
            this._options = this._defaultOptions
        this.locks = locks
        // Avoid errors in browsers that lack a console.
        if (!('console' in $.global))
            ($.global as unknown as {console:{}}).console = {}
        for (const methodName of ConsoleOutputMethods)
            if (!(methodName in $.global.console))
                $.global.console[methodName as keyof Console] = this._self.noop
        if (
            !this._self._javaScriptDependentContentHandled &&
            'document' in $.global &&
            'filter' in $ &&
            'hide' in $ &&
            'show' in $
        ) {
            this._self._javaScriptDependentContentHandled = true
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.hideJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentHide')
                )
                .data('javaScriptDependentContentHide', true)
                .hide()
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.showJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentShow')
                )
                .data('javaScriptDependentContentShow', true)
                .show()
        }
    }
    /**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */
    destructor():Tools<TElement> {
        if ('off' in $.fn)
            this.off('*')
        return this
    }
    /**
     * This method should be overwritten normally. It is triggered if current
     * object was created via the "new" keyword and is called now.
     * @param options - An options object.
     * @returns Returns the current instance.
     */
    initialize(
        options:object = {}
    ):Promise<$DomNode<TElement>>|Tools<TElement> {
        /*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */
        this._options = this._self.extend(
            true, {}, this._defaultOptions, this._options, options
        )
        /*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */
        this._options.domNodeSelectorPrefix = this._self.stringFormat(
            this._options.domNodeSelectorPrefix,
            this._self.stringCamelCaseToDelimited(this._self._name)
        )
        return this
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
    controller(
        object:any,
        parameter:Array<any>,
        $domNode:null|$DomNode<TElement> = null
    ):any {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (typeof object === 'function') {
            object = new object($domNode)
            if (!(object instanceof Tools))
                object = this._self.extend(true, new Tools(), object)
        }
        const name:string = object.constructor._name || object.constructor.name
        parameter = this._self.arrayMake(parameter)
        if ($domNode && 'data' in $domNode && !$domNode.data(name))
            // Attach extended object to the associated dom node.
            $domNode.data(name, object)
        if (
            parameter.length &&
            typeof parameter[0] === 'string' &&
            parameter[0] in object
        ) {
            if (Tools.isFunction(object[parameter[0]]))
                return object[parameter[0]](...parameter.slice(1))
            return object[parameter[0]]
        } else if (parameter.length === 0 || typeof parameter[0] === 'object')
            /*
                If an options object or no method name is given the initializer
                will be called.
            */
            return object.initialize(...parameter)
        if (parameter.length && typeof parameter[0] === 'string')
            throw new Error(
                `Method "${parameter[0]}" does not exist on $-extended dom ` +
                `node "${name}".`
            )
    }
    // / endregion
    // / region mutual exclusion
    /**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be binded to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callback - A procedure which should only be executed if the
     * interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns a promise which will be resolved after releasing lock.
     */
    acquireLock(
        description:string, callback?:LockCallbackFunction, autoRelease = false
    ):Promise<any> {
        return new Promise((resolve:Function):void => {
            const wrappedCallback:LockCallbackFunction = (
                description:string
            ):Promise<any>|void => {
                let result:any
                if (callback)
                    result = callback(description)
                const finish:Function = (value:any):void => {
                    if (autoRelease)
                        this.releaseLock(description)
                    resolve(value)
                }
                /* eslint-disable no-empty */
                try {
                    return result.then(finish)
                } catch (error) {}
                /* eslint-enable no-empty */
                finish(description)
            }
            if (Object.prototype.hasOwnProperty.call(this.locks, description))
                this.locks[description].push(wrappedCallback)
            else {
                this.locks[description] = []
                wrappedCallback(description)
            }
        })
    }
    /**
     * Calling this method  causes the given critical area to be finished and
     * all functions given to "acquireLock()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquireLock" method.
     */
    async releaseLock(description:string):Promise<any> {
        let result:any
        if (Object.prototype.hasOwnProperty.call(this.locks, description)) {
            const callback:LockCallbackFunction|undefined =
                this.locks[description].shift()
            if (callback === undefined)
                delete this.locks[description]
            else
                result = await callback(description)
        }
        return result
    }
    /**
     * Generate a semaphore object with given number of resources.
     * @param numberOfResources - Number of allowed concurrent resource uses.
     * @returns The requested semaphore instance.
     */
    static getSemaphore(numberOfResources = 2):Semaphore {
        return new Semaphore(numberOfResources)
    }
    // / endregion
    // / region boolean
    /**
     * Determines whether its argument represents a JavaScript number.
     * @param object - Object to analyze.
     * @returns A boolean value indicating whether given object is numeric
     * like.
     */
    static isNumeric(object:any):object is number {
        const type:string = Tools.determineType(object)
        /*
            NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
            misinterprets leading-number strings, particularly hex literals
            ("0x...") subtraction forces infinities to NaN.
        */
        return (
            ['number', 'string'].includes(type) &&
            !isNaN(object - parseFloat(object))
        )
    }
    /**
     * Determine whether the argument is a window.
     * @param object - Object to check for.
     * @returns Boolean value indicating the result.
     */
    static isWindow(object:any):object is Window {
        return (
            ![undefined, null].includes(object) &&
            typeof object === 'object' &&
            'window' in object &&
            object === object.window
        )
    }
    /**
     * Checks if given object is similar to an array and can be handled like an
     * array.
     * @param object - Object to check behavior for.
     * @returns A boolean value indicating whether given object is array like.
     */
    static isArrayLike(object:any):boolean {
        let length:number|boolean
        try {
            length = Boolean(object) && 'length' in object && object.length
        } catch (error) {
            return false
        }
        const type:string = Tools.determineType(object)
        if (type === 'function' || Tools.isWindow(object))
            return false
        if (type === 'array' || length === 0)
            return true
        if (typeof length === 'number' && length > 0)
            try {
                /* eslint-disable no-unused-expressions */
                object[length - 1]
                /* eslint-enable no-unused-expressions */
                return true
            } catch (error) {}
        return false
    }
    /**
     * Checks whether one of the given pattern matches given string.
     * @param target - Target to check in pattern for.
     * @param pattern - List of pattern to check for.
     * @returns Value "true" if given object is matches by at leas one of the
     * given pattern and "false" otherwise.
     */
    static isAnyMatching(target:string, pattern:Array<string|RegExp>):boolean {
        for (const currentPattern of pattern)
            if (typeof currentPattern === 'string') {
                if (currentPattern === target)
                    return true
            } else if (currentPattern.test(target))
                return true
        return false
    }
    /**
     * Checks whether given object is a plain native object.
     * @param object - Object to check.
     * @returns Value "true" if given object is a plain javaScript object and
     * "false" otherwise.
     */
    static isPlainObject(object:any):object is PlainObject {
        return (
            typeof object === 'object' &&
            object !== null &&
            Tools.plainObjectPrototypes.includes(Object.getPrototypeOf(object))
        )
    }
    /**
     * Checks whether given object is a set.
     * @param object - Object to check.
     * @returns Value "true" if given object is a set and "false" otherwise.
     */
    static isSet(object:any):object is Set<unknown> {
        return Tools.determineType(object) === 'set'
    }
    /**
     * Checks whether given object is a map.
     * @param object - Object to check.
     * @returns Value "true" if given object is a map and "false" otherwise.
     */
    static isMap(object:any):object is Map<unknown, unknown> {
        return Tools.determineType(object) === 'map'
    }
    /**
     * Checks whether given object is a function.
     * @param object - Object to check.
     * @returns Value "true" if given object is a function and "false"
     * otherwise.
     */
    static isFunction(object:any):object is Function {
        return (
            Boolean(object) &&
            ['[object AsyncFunction]', '[object Function]'].includes(
                {}.toString.call(object)
            )
        )
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
    static mouseOutEventHandlerFix(eventHandler:Function):Function {
        return function(
            this:any, event:any, ...additionalParameter:Array<any>
        ):any {
            let relatedTarget:Element = event.toElement
            if ('relatedTarget' in event)
                relatedTarget = event.relatedTarget
            while (relatedTarget && relatedTarget.tagName !== 'BODY') {
                if (
                    relatedTarget === this || relatedTarget.parentNode === null
                )
                    return
                relatedTarget = relatedTarget.parentNode as Element
            }
            return eventHandler.call(this, ...additionalParameter)
        }
    }
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
    log(
        object:any,
        force = false,
        avoidAnnotation = false,
        level:keyof Console = 'info',
        ...additionalArguments:Array<any>
    ):Tools<TElement> {
        if (
            this._options.logging ||
            force ||
            ['error', 'critical'].includes(level)
        ) {
            let message:any
            if (avoidAnnotation)
                message = object
            else if (typeof object === 'string')
                message =
                    `${this._self._name} (${level}): ` +
                    this._self.stringFormat(object, ...additionalArguments)
            else if (
                this._self.isNumeric(object) || typeof object === 'boolean'
            )
                message = `${this._self._name} (${level}): ${object.toString()}`
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log(`'--------------------------------------------'`)
            }
            if (message)
                if (
                    !('console' in $.global && level in $.global.console) ||
                    ($.global.console[level] === this._self.noop)
                ) {
                    if ('alert' in $.global)
                        $.global.alert(message)
                } else
                    $.global.console[level](message)
        }
        return this
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    info(object:any, ...additionalArguments:Array<any>):Tools<TElement> {
        return this.log(object, false, false, 'info', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    debug(object:any, ...additionalArguments:Array<any>):Tools<TElement> {
        return this.log(object, false, false, 'debug', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    error(object:any, ...additionalArguments:Array<any>):Tools<TElement> {
        return this.log(object, true, false, 'error', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    critical(object:any, ...additionalArguments:Array<any>):Tools<TElement> {
        return this.log(object, true, false, 'warn', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formating.
     * @returns Returns the current instance.
     */
    warn(object:any, ...additionalArguments:Array<any>):Tools<TElement> {
        return this.log(object, false, false, 'warn', ...additionalArguments)
    }
    /**
     * Dumps a given object in a human readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */
    static show(object:any, level = 3, currentLevel = 0):string {
        let output = ''
        if (Tools.determineType(object) === 'object') {
            for (const key in object)
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    output += `${key.toString()}: `
                    if (currentLevel <= level)
                        output += Tools.show(
                            object[key], level, currentLevel + 1)
                    else
                        output += `${object[key]}`
                    output += '\n'
                }
            return output.trim()
        }
        output = `${object}`.trim()
        return `${output} (Type: "${Tools.determineType(object)}")`
    }
    // / endregion
    // / region cookie
    /**
     * Deletes a cookie value by given name.
     * @param name - Name to identify requested value.
     * @returns Nothing.
     */
    static deleteCookie(name:string):void {
        if ('document' in $.global)
            $.global.document.cookie = `${name}=; Max-Age=-99999999;`
    }
    /**
     * Gets a cookie value by given name.
     * @param name - Name to identify requested value.
     * @returns Requested value.
     */
    static getCookie(name:string):string|null {
        if ('document' in $.global) {
            const key = `${name}=`
            const decodedCookie:string = decodeURIComponent(
                $.global.document.cookie)
            for (let date of decodedCookie.split(';')) {
                while (date.startsWith(' '))
                    date = date.substring(1)
                if (date.startsWith(key))
                    return date.substring(key.length, date.length)
            }
        }
        return null
    }
    /**
     * Sets a cookie key-value-pair.
     * @param name - Name to identify given value.
     * @param value - Value to set.
     * @param domain - Domain to reference with given key-value-pair.
     * @param sameSite - Set same site policy to "Lax", "None" or "Strict".
     * @param numberOfDaysUntilExpiration - Number of days until given key
     * shouldn't be deleted.
     * @param path - Path to reference with given key-value-pair.
     * @param secure - Indicates if this cookie is only valid for "https"
     * connections.
     * @param httpOnly - Indicates if this cookie should be accessible from
     * client or not.
     * @returns A boolean indicating whether cookie could be set or not.
     */
    static setCookie(
        name:string,
        value:string,
        domain = '',
        sameSite:'Lax'|'None'|'Strict'|'' = 'Lax',
        numberOfDaysUntilExpiration = 365,
        path = '/',
        secure = true,
        httpOnly = false
    ):boolean {
        if ('document' in $.global) {
            const now:Date = new Date()
            now.setTime(
                now.getTime() +
                (numberOfDaysUntilExpiration * 24 * 60 * 60 * 1000)
            )
            if (
                domain === '' &&
                'location' in $.global &&
                'hostname' in $.global.location
            )
                domain = $.global.location.hostname
            $.global.document.cookie =
                `${name}=${value};` +
                `Expires="${now.toUTCString()};` +
                `Path=${path};` +
                `Domain=${domain}` +
                (sameSite ? `;SameSite=${sameSite}` : '') +
                (secure ? ';Secure' : '') +
                (httpOnly ? ';HttpOnly' : '')
            return true
        }
        return false
    }
    // / endregion
    // / region dom node
    /**
     * Normalizes class name order of current dom node.
     * @returns Current instance.
     */
    get normalizedClassNames():Tools<TElement> {
        if (this.$domNode) {
            const className = 'class'
            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):void => {
                    const $domNode:$DomNode = $(domNode)
                    const classValue:string|undefined = $domNode.attr(
                        className)
                    if (classValue)
                        $domNode.attr(
                            className,
                            (classValue.split(' ').sort() || []).join(' ')
                        )
                    else if ($domNode.is(`[${className}]`))
                        $domNode.removeAttr(className)
                })
        }
        return this
    }
    /**
     * Normalizes style attributes order of current dom node.
     * @returns Returns current instance.
     */
    get normalizedStyles():Tools<TElement> {
        if (this.$domNode) {
            const styleName = 'style'
            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):any => {
                    const $domNode:$DomNode = $(domNode)
                    const serializedStyles:string|undefined =
                        $domNode.attr(styleName)
                    if (serializedStyles)
                        $domNode.attr(
                            styleName,
                            this._self.stringCompressStyleValue(
                                (
                                    this._self
                                        .stringCompressStyleValue(
                                            serializedStyles
                                        )
                                        .split(';')
                                        .sort() ||
                                    []
                                )
                                    .map((style:string):string => style.trim())
                                    .join(';')
                            )
                        )
                    else if ($domNode.is(`[${styleName}]`))
                        $domNode.removeAttr(styleName)
                })
        }
        return this
    }
    /**
     * Retrieves a mapping of computed style attributes to their corresponding
     * values.
     * @returns The computed style mapping.
     */
    get style():Mapping<number|string> {
        const result:Mapping<number|string> = {}
        const $domNode:null|$DomNode<TElement> = this.$domNode
        if ($domNode && $domNode.length) {
            let styleProperties:any
            if ('window' in $.global && $.global.window.getComputedStyle) {
                styleProperties = $.global.window.getComputedStyle(
                    $domNode[0] as unknown as Element, null
                )
                if (styleProperties) {
                    if ('length' in styleProperties)
                        for (
                            let index = 0;
                            index < styleProperties.length;
                            index += 1
                        )
                            result[this._self.stringDelimitedToCamelCase(
                                styleProperties[index]
                            )] =
                                styleProperties.getPropertyValue(
                                    styleProperties[index]
                                )
                    else
                        for (const propertyName in styleProperties)
                            if (Object.prototype.hasOwnProperty.call(
                                styleProperties, propertyName
                            ))
                                result[this._self.stringDelimitedToCamelCase(
                                    propertyName
                                )] =
                                    propertyName in styleProperties &&
                                    styleProperties[propertyName] ||
                                    styleProperties.getPropertyValue(
                                        propertyName)
                    return result
                }
            }
            styleProperties = (
                $domNode[0] as unknown as {currentStyle:Mapping<number|string>}
            ).currentStyle
            if (styleProperties) {
                for (const propertyName in styleProperties)
                    if (Object.prototype.hasOwnProperty.call(
                        styleProperties, propertyName
                    ))
                        result[propertyName] = styleProperties[propertyName]
                return result
            }
            styleProperties = ($domNode[0] as unknown as HTMLElement).style
            if (styleProperties)
                for (const propertyName in styleProperties)
                    if (typeof styleProperties[propertyName] !== 'function')
                        result[propertyName] = styleProperties[propertyName]
        }
        return result
    }
    /**
     * Get text content of current element without it children's text contents.
     * @returns The text string.
     */
    get text():string {
        if (this.$domNode)
            return this.$domNode.clone().children().remove().end().text()
        return ''
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
    static isEquivalentDOM(
        first:any, second:any, forceHTMLString = false
    ):boolean {
        if (first === second)
            return true
        if (first && second) {
            const detemermineHTMLPattern =
                /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
            const inputs:Mapping<any> = {first, second}
            const $domNodes:Mapping<$DomNode> = {
                first: $('<dummy>'), second: $('<dummy>')
            }
            /*
                NOTE: Assume that strings that start "<" and end with ">" are
                markup and skip the more expensive regular expression check.
            */
            for (const type in inputs)
                if (
                    Object.prototype.hasOwnProperty.call(inputs, type) &&
                    typeof inputs[type] === 'string' &&
                    (
                        forceHTMLString ||
                        (
                            inputs[type].startsWith('<') &&
                            inputs[type].endsWith('>') &&
                            inputs[type].length >= 3 ||
                            detemermineHTMLPattern.test(inputs[type])
                        )
                    )
                )
                    $domNodes[type] = $(`<div>${inputs[type]}</div>`)
                else
                    try {
                        const $copiedDomNode:$DomNode =
                            $(inputs[type]).clone()
                        if ($copiedDomNode.length)
                            $domNodes[type] = $('<div>').append($copiedDomNode)
                        else
                            return false
                    } catch (error) {
                        return false
                    }
            if (
                ($domNodes.first as unknown as Array<Node>).length &&
                ($domNodes.first as unknown as Array<Node>).length ===
                ($domNodes.second as unknown as Array<Node>).length
            ) {
                $domNodes.first = $domNodes
                    .first
                    .Tools('normalizedClassNames')
                    .$domNode
                    .Tools('normalizedStyles')
                    .$domNode
                $domNodes.second = $domNodes
                    .second
                    .Tools('normalizedClassNames')
                    .$domNode
                    .Tools('normalizedStyles')
                    .$domNode
                let index = 0
                for (const domNode of (
                    $domNodes.first as unknown as Array<Node>
                )) {
                    if (!domNode.isEqualNode((
                        $domNodes.second as unknown as Array<Node>
                    )[index]))
                        return false
                    index += 1
                }
                return true
            }
        }
        return false
    }
    /**
     * Determines where current dom node is relative to current view port
     * position.
     * @param givenDelta - Allows deltas for "top", "left", "bottom" and
     * "right" for determining positions.
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */
    getPositionRelativeToViewport(
        givenDelta:{bottom?:number;left?:number;right?:number;top?:number} = {}
    ):RelativePosition {
        const delta:Position = this._self.extend(
            {bottom: 0, left: 0, right: 0, top: 0}, givenDelta)
        const $domNode:null|$DomNode<TElement> = this.$domNode
        if (
            'window' in $.global &&
            $domNode &&
            $domNode.length &&
            $domNode[0] &&
            'getBoundingClientRect' in $domNode[0]
        ) {
            const $window:$DomNode<Window> = $($.global.window)
            const rectangle:Position = ($domNode[0] as unknown as Element)
                .getBoundingClientRect()
            if (rectangle) {
                if (rectangle.top && (rectangle.top + delta.top) < 0)
                    return 'above'
                if ((rectangle.left + delta.left) < 0)
                    return 'left'
                const windowHeight:number|undefined = $window.height()
                if (
                    typeof windowHeight === 'number' &&
                    windowHeight < (rectangle.bottom + delta.bottom)
                )
                    return 'below'
                const windowWidth:number|undefined = $window.width()
                if (
                    typeof windowWidth === 'number' &&
                    windowWidth < (rectangle.right + delta.right)
                )
                    return 'right'
            }
        }
        return 'in'
    }
    /**
     * Generates a directive name corresponding selector string.
     * @param directiveName - The directive name.
     * @returns Returns generated selector.
     */
    static generateDirectiveSelector(directiveName:string):string {
        const delimitedName:string = Tools.stringCamelCaseToDelimited(
            directiveName)
        return `${delimitedName}, .${delimitedName}, [${delimitedName}], ` +
            `[data-${delimitedName}], [x-${delimitedName}]` + (
            (delimitedName.includes('-') ? (
                `, [${delimitedName.replace(/-/g, '\\:')}], ` +
                `[${delimitedName.replace(/-/g, '_')}]`) : ''))
    }
    /**
     * Removes a directive name corresponding class or attribute.
     * @param directiveName - The directive name.
     * @returns Returns current dom node.
     */
    removeDirective(directiveName:string):null|$DomNode<TElement> {
        if (this.$domNode === null)
            return null
        const delimitedName:string =
            this._self.stringCamelCaseToDelimited(directiveName)
        return this.$domNode
            .removeClass(delimitedName)
            .removeAttr(delimitedName)
            .removeAttr(`data-${delimitedName}`)
            .removeAttr(`x-${delimitedName}`)
            .removeAttr(delimitedName.replace('-', ':'))
            .removeAttr(delimitedName.replace('-', '_'))
    }
    /**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding name.
     */
    static getNormalizedDirectiveName(directiveName:string):string {
        for (const delimiter of ['-', ':', '_']) {
            let prefixFound = false
            for (const prefix of [`data${delimiter}`, `x${delimiter}`])
                if (directiveName.startsWith(prefix)) {
                    directiveName = directiveName.substring(prefix.length)
                    prefixFound = true
                    break
                }
            if (prefixFound)
                break
        }
        for (const delimiter of ['-', ':', '_'])
            directiveName = Tools.stringDelimitedToCamelCase(
                directiveName, delimiter)
        return directiveName
    }
    /**
     * Determines a directive attribute value.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding attribute value or "null" if no
     * attribute value exists.
     */
    getDirectiveValue(directiveName:string):null|string {
        if (this.$domNode === null)
            return null
        const delimitedName:string =
            this._self.stringCamelCaseToDelimited(directiveName)
        for (const attributeName of [
            delimitedName,
            `data-${delimitedName}`,
            `x-${delimitedName}`,
            delimitedName.replace('-', '\\:')
        ]) {
            const value:string|undefined = this.$domNode.attr(attributeName)
            if (typeof value === 'string')
                return value
        }
        return null
    }
    /**
     * Removes a selector prefix from a given selector. This methods searches
     * in the options object for a given "domNodeSelectorPrefix".
     * @param domNodeSelector - The dom node selector to slice.
     * @returns Returns the sliced selector.
     */
    sliceDomNodeSelectorPrefix(domNodeSelector:string):string {
        if (
            'domNodeSelectorPrefix' in this._options &&
            domNodeSelector.startsWith(this._options.domNodeSelectorPrefix)
        )
            return domNodeSelector
                .substring(this._options.domNodeSelectorPrefix.length)
                .trim()
        return domNodeSelector
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
    static getDomNodeName(domNodeSelector:string):null|string {
        const match:Array<string>|null = /^<?([a-zA-Z]+).*>?.*/.exec(
            domNodeSelector)
        if (match)
            return match[1]
        return null
    }
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
    grabDomNode(
        domNodeSelectors:Mapping,
        wrapperDomNode:Node|null|string|$DomNode = null
    ):Mapping<$DomNode> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        const domNodes:Mapping<$DomNode> = {}
        if (domNodeSelectors)
            if (wrapperDomNode) {
                const $wrapperDomNode:$DomNode = $(wrapperDomNode)
                for (const name in domNodeSelectors)
                    if (Object.prototype.hasOwnProperty.call(
                        domNodeSelectors, name
                    ))
                        domNodes[name] = $wrapperDomNode.find(
                            domNodeSelectors[name]
                        )
            } else
                for (const name in domNodeSelectors)
                    if (Object.prototype.hasOwnProperty.call(
                        domNodeSelectors, name
                    )) {
                        const match:Array<string>|null =
                            domNodeSelectors[name].match(', *')
                        if (match)
                            domNodeSelectors[name] +=
                                domNodeSelectors[name]
                                    .split(match[0])
                                    .map((selectorPart:string):string =>
                                        ', ' +
                                        this.stringNormalizeDomNodeSelector(
                                            selectorPart
                                        )
                                    )
                                    .join('')
                        domNodes[name] = $(this.stringNormalizeDomNodeSelector(
                            domNodeSelectors[name]
                        ))
                    }
        if (this._options.domNodeSelectorPrefix)
            domNodes.parent = $(this._options.domNodeSelectorPrefix)
        if ('window' in $.global)
            domNodes.window = $($.global.window as unknown as HTMLElement)
        if ('document' in $.global)
            domNodes.document = $($.global.document as unknown as HTMLElement)
        return domNodes
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
    static isolateScope<T extends Object>(
        scope:T, prefixesToIgnore:Array<string> = []
    ):T {
        for (const name in scope)
            if (!(
                prefixesToIgnore.includes(name.charAt(0)) ||
                ['constructor', 'prototype', 'this'].includes(name) ||
                Object.prototype.hasOwnProperty.call(scope, name)
            ))
                /*
                    NOTE: Delete ("delete $scope[name]") doesn't destroy the
                    automatic lookup to parent scope.
                */
                (scope[name] as any) = undefined
        return scope
    }
    /**
     * Generates a unique name in given scope (useful for jsonp requests).
     * @param prefix - A prefix which will be prepended to unique name.
     * @param suffix - A suffix which will be prepended to unique name.
     * @param scope - A scope where the name should be unique.
     * @param initialUniqueName - An initial scope name to use if not exists.
     * @returns The function name.
     */
    static determineUniqueScopeName(
        prefix:string = 'callback',
        suffix:string = '',
        scope:object = $.global,
        initialUniqueName:string = ''
    ):string {
        if (initialUniqueName.length && !(initialUniqueName in scope))
            return initialUniqueName
        let uniqueName:string = prefix + suffix
        while (true) {
            uniqueName =
                prefix +
                `${Math.round(Math.random() * Math.pow(10, 10))}` +
                suffix
            if (!(uniqueName in scope))
                break
        }
        return uniqueName
    }
    // / endregion
    // / region function
    /**
     * Determines all parameter names from given callable (function or class,
     * ...).
     * @param callable - Function or function code to inspect.
     * @returns List of parameter names.
     */
    static getParameterNames(callable:Function|string):Array<string> {
        const functionCode:string = (
            (typeof callable === 'string') ?
                callable :
                // Strip comments.
                callable.toString()
        ).replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
        if (functionCode.startsWith('class'))
            return Tools.getParameterNames(
                'function ' +
                functionCode.replace(/.*(constructor\([^)]+\))/m, '$1')
            )
        // Try classic function declaration.
        let parameter:Array<string>|null = functionCode.match(
            /^function\s*[^\(]*\(\s*([^\)]*)\)/m)
        if (parameter === null)
            // Try arrow function declaration.
            parameter = functionCode.match(/^[^\(]*\(\s*([^\)]*)\) *=>.*/m)
        if (parameter === null)
            // Try one argument and without brackets arrow function declaration.
            parameter = functionCode.match(/([^= ]+) *=>.*/m)
        const names:Array<string> = []
        if (parameter && parameter.length > 1 && parameter[1].trim().length) {
            for (const name of parameter[1].split(','))
                // Remove default parameter values.
                names.push(name.replace(/=.+$/g, '').trim())
            return names
        }
        return names
    }
    /**
     * Implements the identity function.
     * @param value - A value to return.
     * @returns Returns the given value.
     */
    static identity<T>(value:T):T {
        return value
    }
    /**
     * Inverted filter helper to inverse each given filter.
     * @param filter - A function that filters an array.
     * @returns The inverted filter.
     */
    static invertArrayFilter(
        filter:(this:any, data:any, ...additionalParameter:Array<any>) => any
    ):(data:any, ...additionalParameter:Array<any>) => any {
        return function(
            this:any, data:any, ...additionalParameter:Array<any>
        ):any {
            if (data) {
                const filteredData:any = filter(data, ...additionalParameter)
                let result:Array<any> = []
                /* eslint-disable curly */
                if (filteredData.length) {
                    for (const date of data)
                        if (!filteredData.includes(date))
                            result.push(date)
                } else
                /* eslint-enable curly */
                    result = data
                return result
            }
            return data
        }
    }
    /**
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
     */
    static timeout(...parameter:Array<any>):TimeoutPromise {
        let callback:Function = Tools.noop
        let delayInMilliseconds:number = 0
        let throwOnTimeoutClear:boolean = false
        for (const value of parameter)
            if (typeof value === 'number' && !Number.isNaN(value))
                delayInMilliseconds = value
            else if (typeof value === 'boolean')
                throwOnTimeoutClear = value
            else if (Tools.isFunction(value))
                callback = value
        let rejectCallback:Function
        let resolveCallback:Function
        const result:TimeoutPromise = new Promise((
            resolve:Function, reject:Function
        ):void => {
            rejectCallback = reject
            resolveCallback = resolve
        }) as TimeoutPromise
        const wrappedCallback:Function = ():void => {
            callback.call(result, ...parameter)
            resolveCallback(false)
        }
        const maximumTimeoutDelayInMilliseconds:number = 2147483647
        if (delayInMilliseconds <= maximumTimeoutDelayInMilliseconds)
            result.timeoutID = setTimeout(wrappedCallback, delayInMilliseconds)
        else {
            /*
                Determine the number of times we need to delay by maximum
                possible timeout duration.
            */
            let numberOfRemainingTimeouts:number = Math.floor(
                delayInMilliseconds / maximumTimeoutDelayInMilliseconds)
            const finalTimeoutDuration:number = delayInMilliseconds %
                maximumTimeoutDelayInMilliseconds
            const delay:Function = ():void => {
                if (numberOfRemainingTimeouts > 0) {
                    numberOfRemainingTimeouts -= 1
                    result.timeoutID = setTimeout(
                        delay, maximumTimeoutDelayInMilliseconds)
                } else
                    result.timeoutID = setTimeout(
                        wrappedCallback, finalTimeoutDuration)
            }
            delay()
        }
        result.clear = ():void => {
            if (result.timeoutID) {
                clearTimeout(result.timeoutID);
                (throwOnTimeoutClear ? rejectCallback : resolveCallback)(true)
            }
        }
        return result
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
    static debounce(
        eventFunction:Function,
        thresholdInMilliseconds:number = 600,
        ...additionalArguments:Array<any>
    ):Function {
        let lock:boolean = false
        let waitingCallArguments:Array<any>|null = null
        let timer:null|Promise<boolean> = null
        return (...parameter:Array<any>):null|Promise<boolean> => {
            parameter = parameter.concat(additionalArguments || [])
            if (lock)
                waitingCallArguments = parameter
            else {
                lock = true
                eventFunction(...parameter)
                timer = Tools.timeout(thresholdInMilliseconds, ():void => {
                    lock = false
                    if (waitingCallArguments) {
                        eventFunction(...waitingCallArguments)
                        waitingCallArguments = null
                    }
                })
            }
            return timer
        }
    }
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
    fireEvent(
        eventName:string,
        callOnlyOptionsMethod:boolean = false,
        scope:any = this,
        ...additionalArguments:Array<any>
    ):any {
        const eventHandlerName:string =
            `on${this._self.stringCapitalize(eventName)}`
        if (!callOnlyOptionsMethod)
            if (eventHandlerName in scope)
                scope[eventHandlerName](...additionalArguments)
            else if (`_${eventHandlerName}` in scope)
                scope[`_${eventHandlerName}`](...additionalArguments)
        if (
            scope._options &&
            eventHandlerName in scope._options &&
            scope._options[eventHandlerName] !== this._self.noop
        )
            return scope._options[eventHandlerName].call(
                this, ...additionalArguments
            )
        return true
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method for "$.on()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.on()".
     * @param parameter - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */
    on<TElement = HTMLElement>(...parameter:Array<any>):$DomNode<TElement> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameter, false)
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @param parameter - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */
    off<TElement = HTMLElement>(...parameter:Array<any>):$DomNode<TElement> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameter, true)
    }
    // / endregion
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
     */
    static addDynamicGetterAndSetter(
        object:any,
        getterWrapper:GetterFunction|null = null,
        setterWrapper:null|SetterFunction = null,
        methodNames:Mapping = {},
        deep:boolean = true,
        typesToExtend:Array<any> = [Object]
    ):any {
        if (deep && typeof object === 'object')
            if (Array.isArray(object)) {
                let index:number = 0
                for (const value of object) {
                    object[index] = Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    index += 1
                }
            } else if (Tools.isMap(object))
                for (const [key, value] of object)
                    object.set(key, Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
            else if (Tools.isSet(object)) {
                const cache:Array<any> = []
                for (const value of object) {
                    object.delete(value)
                    cache.push(Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
                }
                for (const value of cache)
                    object.add(value)
            } else if (object !== null) {
                for (const key in object)
                    if (Object.prototype.hasOwnProperty.call(object, key))
                        object[key] = Tools.addDynamicGetterAndSetter(
                            object[key],
                            getterWrapper,
                            setterWrapper,
                            methodNames,
                            deep
                        )
            }
        if (getterWrapper || setterWrapper)
            for (const type of typesToExtend)
                if (
                    typeof object === 'object' &&
                    object instanceof type &&
                    object !== null
                ) {
                    const defaultHandler:ProxyHandler = Tools.getProxyHandler(
                        object, methodNames)
                    const handler:ProxyHandler = Tools.getProxyHandler(
                        object, methodNames)
                    if (getterWrapper)
                        handler.get = (target:any, name:string):any => {
                            if (name === '__target__')
                                return object
                            if (name === '__revoke__')
                                return ():any => {
                                    revoke()
                                    return object
                                }
                            if (typeof object[name] === 'function')
                                return object[name]
                            return getterWrapper(
                                defaultHandler.get(proxy, name), name, object
                            )
                        }
                    if (setterWrapper)
                        handler.set = (
                            target:any, name:string, value:any
                        ):any =>
                            defaultHandler.set(
                                proxy, name, setterWrapper(name, value, object)
                            )
                    const {proxy, revoke} = Proxy.revocable({}, handler)
                    return proxy
                }
        return object
    }
    /**
     * Converts given object into its serialized json representation by
     * replacing circular references with a given provided value.
     * @param object - Object to serialize.
     * @param determineCicularReferenceValue - Callback to create a fallback
     * value depending on given redundant value.
     * @param numberOfSpaces - Number of spaces to use for string formatting.
     * @returns The formatted json string.
     */
    static convertCircularObjectToJSON(
        object:object,
        determineCicularReferenceValue:((
            key:string, value:any, seenObjects:Array<any>
        ) => any) = ():string => '__circularReference__',
        numberOfSpaces:number = 0
    ):string {
        const seenObjects:Array<any> = []
        return JSON.stringify(
            object,
            (key:string, value:any):any => {
                if (typeof value === 'object' && value !== null) {
                    if (seenObjects.includes(value))
                        return determineCicularReferenceValue(
                            key, value, seenObjects)
                    seenObjects.push(value)
                    return value
                }
                return value
            },
            numberOfSpaces
        )
    }
    /**
     * Converts given map and all nested found maps objects to corresponding
     * object.
     * @param object - Map to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given map as object.
     */
    static convertMapToPlainObject(object:any, deep:boolean = true):any {
        if (typeof object === 'object') {
            if (Tools.isMap(object)) {
                const newObject:Mapping<any> = {}
                for (let [key, value] of object) {
                    if (deep)
                        value = Tools.convertMapToPlainObject(value, deep)
                    if (['number', 'string'].includes(typeof key))
                        newObject[`${key}`] = value
                }
                return newObject
            }
            if (deep)
                if (Tools.isPlainObject(object)) {
                    for (const key in object)
                        if (Object.prototype.hasOwnProperty.call(object, key))
                            object[key] = Tools.convertMapToPlainObject(
                                object[key], deep)
                } else if (Array.isArray(object)) {
                    let index:number = 0
                    for (const value of object) {
                        object[index] = Tools.convertMapToPlainObject(
                            value, deep)
                        index += 1
                    }
                } else if (Tools.isSet(object)) {
                    const cache:Array<any> = []
                    for (const value of object) {
                        object.delete(value)
                        cache.push(Tools.convertMapToPlainObject(value, deep))
                    }
                    for (const value of cache)
                        object.add(value)
                }
        }
        return object
    }
    /**
     * Converts given plain object and all nested found objects to
     * corresponding map.
     * @param object - Object to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     * @returns Given object as map.
     */
    static convertPlainObjectToMap(object:any, deep:boolean = true):any {
        if (typeof object === 'object') {
            if (Tools.isPlainObject(object)) {
                const newObject:Map<number|string, any> = new Map()
                for (const key in object)
                    if (Object.prototype.hasOwnProperty.call(object, key)) {
                        if (deep)
                            object[key] = Tools.convertPlainObjectToMap(
                                object[key], deep)
                        newObject.set(key, object[key])
                    }
                return newObject
            }
            if (deep)
                if (Array.isArray(object)) {
                    let index:number = 0
                    for (const value of object) {
                        object[index] = Tools.convertPlainObjectToMap(
                            value, deep)
                        index += 1
                    }
                } else if (Tools.isMap(object))
                    for (const [key, value] of object)
                        object.set(
                            key, Tools.convertPlainObjectToMap(value, deep)
                        )
                else if (Tools.isSet(object)) {
                    const cache:Array<any> = []
                    for (const value of object) {
                        object.delete(value)
                        cache.push(Tools.convertPlainObjectToMap(value, deep))
                    }
                    for (const value of cache)
                        object.add(value)
                }
        }
        return object
    }
    /**
     * Replaces given pattern in each value in given object recursively with
     * given string replacement.
     * @param object - Object to convert substrings in.
     * @param pattern - Regular expression to replace.
     * @param replacement - String to use as replacement for found patterns.
     * @returns Converted object with replaced patterns.
     */
    static convertSubstringInPlainObject<T extends Object>(
        object:T, pattern:RegExp|string, replacement:string
    ):T {
        for (const key in object)
            if (Object.prototype.hasOwnProperty.call(object, key))
                if (Tools.isPlainObject(object[key]))
                    object[key] = Tools.convertSubstringInPlainObject(
                        object[key], pattern, replacement)
                else if (typeof object[key] === 'string')
                    (object[key] as unknown as string) =
                        (object[key] as unknown as string).replace(
                            pattern, replacement)
        return object
    }
    /**
     * Copies given object (of any type) into optionally given destination.
     * @param source - Object to copy.
     * @param recursionLimit - Specifies how deep we should traverse into given
     * object recursively.
     * @param recursionEndValue - Indicates which value to use for recursion
     * ends. Usually a reference to corresponding source value will be used.
     * @param destination - Target to copy source to.
     * @param cyclic - Indicates whether known sub structures should be copied
     * or referenced (if "true" endless loops can occur if source has cyclic
     * structures).
     * @param stackSource - Internally used to avoid traversing loops.
     * @param stackDestination - Internally used to avoid traversing loops and
     * referencing them correctly.
     * @param recursionLevel - Internally used to track current recursion
     * level in given source data structure.
     * @returns Value "true" if both objects are equal and "false" otherwise.
     */
    static copy<T>(
        source:T,
        recursionLimit:number = -1,
        recursionEndValue:any = ValueCopySymbol,
        destination:null|T = null,
        cyclic:boolean = false,
        stackSource:Array<any> = [],
        stackDestination:Array<any> = [],
        recursionLevel:number = 0
    ):T {
        if (source !== null && typeof source === 'object')
            if (destination) {
                if (source === destination)
                    throw new Error(
                        `Can't copy because source and destination are ` +
                        'identical.'
                    )
                if (!cyclic && ![undefined, null].includes(source as any)) {
                    const index:number = stackSource.indexOf(source)
                    if (index !== -1)
                        return stackDestination[index]
                    stackSource.push(source)
                    stackDestination.push(destination)
                }
                const copyValue:Function = <V>(value:V):null|V => {
                    if (
                        recursionLimit !== -1 &&
                        recursionLimit < recursionLevel + 1
                    )
                        return recursionEndValue === ValueCopySymbol ?
                            value :
                            recursionEndValue
                    const result:any = Tools.copy(
                        value,
                        recursionLimit,
                        recursionEndValue,
                        null,
                        cyclic,
                        stackSource,
                        stackDestination,
                        recursionLevel + 1
                    )
                    if (
                        !cyclic &&
                        ![undefined, null].includes(value as any) &&
                        typeof value === 'object'
                    ) {
                        stackSource.push(value)
                        stackDestination.push(result)
                    }
                    return result
                }
                if (Array.isArray(source))
                    for (const item of source)
                        (destination as unknown as Array<any>).push(
                            copyValue(item)
                        )
                else if (source instanceof Map)
                    for (const [key, value] of source)
                        (destination as unknown as Map<any, any>).set(
                            key, copyValue(value)
                        )
                else if (source instanceof Set)
                    for (const value of source)
                        (destination as unknown as Set<any>).add(
                            copyValue(value)
                        )
                else
                    for (const key in source)
                        if (Object.prototype.hasOwnProperty.call(source, key))
                            try {
                                destination[key] = copyValue(source[key])
                            } catch (error) {
                                throw new Error(
                                    'Failed to copy property value object "' +
                                    `${key}": ${Tools.represent(error)}`
                                )
                            }
            } else if (source) {
                if (Array.isArray(source))
                    return Tools.copy(
                        source,
                        recursionLimit,
                        recursionEndValue,
                        ([] as unknown as T),
                        cyclic,
                        stackSource,
                        stackDestination,
                        recursionLevel
                    )
                if (source instanceof Map)
                    return Tools.copy(
                        source,
                        recursionLimit,
                        recursionEndValue,
                        (new Map() as unknown as T),
                        cyclic,
                        stackSource,
                        stackDestination,
                        recursionLevel
                    )
                if (source instanceof Set)
                    return Tools.copy(
                        source,
                        recursionLimit,
                        recursionEndValue,
                        (new Set() as unknown as T),
                        cyclic,
                        stackSource,
                        stackDestination,
                        recursionLevel
                    )
                if (source instanceof Date)
                    return new Date(source.getTime()) as unknown as T
                if (source instanceof RegExp) {
                    const modifier =
                        (source as RegExp).toString().match(/[^\/]*$/)
                    destination = new RegExp(
                        source.source,
                        modifier ? modifier[0] : undefined
                    ) as unknown as T
                    (destination as unknown as RegExp).lastIndex = source.lastIndex
                    return destination
                }
                return Tools.copy(
                    source,
                    recursionLimit,
                    recursionEndValue,
                    ({} as unknown as T),
                    cyclic,
                    stackSource,
                    stackDestination,
                    recursionLevel
                )
            }
        return destination || source
    }
    /**
     * Determine the internal JavaScript [[Class]] of an object.
     * @param object - Object to analyze.
     * @returns Name of determined class.
     */
    static determineType(object:any = undefined):string {
        if ([null, undefined].includes(object))
            return `${object}`
        if (
            ['function', 'object'].includes(typeof object) &&
            'toString' in object
        ) {
            const stringRepresentation:string =
                Tools.classToTypeMapping.toString.call(object)
            if (Object.prototype.hasOwnProperty.call(
                Tools.classToTypeMapping, stringRepresentation
            ))
                return Tools.classToTypeMapping[stringRepresentation]
        }
        return typeof object
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
     * @param compareBlobs - Indicates whether binary data should be converted
     * to a base64 string to compare their content. Makes this function
     * asynchronous in browsers and potentially takes a lot of resources.
     * @returns Value "true" if both objects are equal and "false" otherwise.
     * If "compareBlobs" is activated and we're running in a browser like
     * environment and binary data is given, then a promise wrapping the
     * determined boolean values is returned.
     */
    static equals(
        firstValue:any,
        secondValue:any,
        properties:Array<any>|null = null,
        deep:number = -1,
        exceptionPrefixes:Array<string> = [],
        ignoreFunctions:boolean = true,
        compareBlobs:boolean = false
    ):Promise<boolean>|boolean {
        if (
            ignoreFunctions &&
            Tools.isFunction(firstValue) &&
            Tools.isFunction(secondValue) ||
            firstValue === secondValue ||
            Tools.numberIsNotANumber(firstValue) &&
            Tools.numberIsNotANumber(secondValue) ||
            firstValue instanceof RegExp &&
            secondValue instanceof RegExp &&
            firstValue.toString() === secondValue.toString() ||
            firstValue instanceof Date &&
            secondValue instanceof Date && (
                isNaN(firstValue.getTime()) &&
                isNaN(secondValue.getTime()) ||
                !isNaN(firstValue.getTime()) &&
                !isNaN(secondValue.getTime()) &&
                firstValue.getTime() === secondValue.getTime()
            ) ||
            compareBlobs &&
            eval('typeof Buffer') !== 'undefined' &&
            eval('Buffer').isBuffer &&
            firstValue instanceof eval('Buffer') &&
            secondValue instanceof eval('Buffer') &&
            firstValue.toString('base64') === secondValue.toString('base64')
        )
            return true
        if (
            compareBlobs &&
            typeof Blob !== 'undefined' &&
            firstValue instanceof Blob &&
            secondValue instanceof Blob
        )
            return new Promise((resolve:Function):void => {
                const values:Array<ArrayBuffer|null|string> = []
                for (const value of [firstValue, secondValue]) {
                    const fileReader:FileReader = new FileReader()
                    fileReader.onload = (event:Event):void => {
                        if (event.target === null)
                            values.push(null)
                        else
                            values.push((event.target as FileReader).result)
                        if (values.length === 2)
                            resolve(values[0] === values[1])
                    }
                    fileReader.readAsDataURL(value)
                }
            })
        if (
            Tools.isPlainObject(firstValue) &&
            Tools.isPlainObject(secondValue) &&
            !(
                firstValue instanceof RegExp || secondValue instanceof RegExp
            ) ||
            Array.isArray(firstValue) &&
            Array.isArray(secondValue) &&
            firstValue.length === secondValue.length ||
            (
                (
                    Tools.determineType(firstValue) ===
                        Tools.determineType(secondValue) &&
                    ['map', 'set'].includes(Tools.determineType(firstValue))
                ) &&
                firstValue.size === secondValue.size
            )
        ) {
            const promises:Array<Promise<boolean>> = []
            for (const [first, second] of [
                [firstValue, secondValue],
                [secondValue, firstValue]
            ]) {
                const firstIsArray:boolean = Array.isArray(first)
                if (
                    firstIsArray &&
                    (!Array.isArray(second) || first.length !== second.length)
                )
                    return false
                const firstIsMap:boolean = Tools.isMap(first)
                if (
                    firstIsMap &&
                    (!Tools.isMap(second) || first.size !== second.size)
                )
                    return false
                const firstIsSet:boolean = Tools.isSet(first)
                if (
                    firstIsSet &&
                    (!Tools.isSet(second) || first.size !== second.size)
                )
                    return false
                if (firstIsArray) {
                    let index:number = 0
                    for (const value of first) {
                        if (deep !== 0) {
                            const result:any = Tools.equals(
                                value,
                                second[index],
                                properties,
                                deep - 1,
                                exceptionPrefixes,
                                ignoreFunctions,
                                compareBlobs
                            )
                            if (!result)
                                return false
                            else if (
                                typeof result === 'object' && 'then' in result
                            )
                                promises.push(result)
                        }
                        index += 1
                    }
                /* eslint-disable curly */
                } else if (firstIsMap) {
                    for (const [key, value] of first)
                        if (deep !== 0) {
                            const result:any = Tools.equals(
                                value,
                                second.get(key),
                                properties,
                                deep - 1,
                                exceptionPrefixes,
                                ignoreFunctions,
                                compareBlobs
                            )
                            if (!result)
                                return false
                            else if (
                                typeof result === 'object' && 'then' in result
                            )
                                promises.push(result)
                        }
                } else if (firstIsSet) {
                /* eslint-enable curly */
                    for (const value of first)
                        if (deep !== 0) {
                            let equal:boolean = false
                            const subPromises:Array<Promise<boolean>> = []
                            for (const secondValue of second) {
                                const result:any = Tools.equals(
                                    value,
                                    secondValue,
                                    properties,
                                    deep - 1,
                                    exceptionPrefixes,
                                    ignoreFunctions,
                                    compareBlobs
                                )
                                if (typeof result === 'boolean') {
                                    if (result) {
                                        equal = true
                                        break
                                    }
                                } else
                                    subPromises.push(result)
                            }
                            if (subPromises.length)
                                promises.push(new Promise(async (
                                    resolve:Function
                                ):Promise<void> => resolve(
                                    (await Promise.all(subPromises))
                                        .some(Tools.identity)
                                )))
                            else if (!equal)
                                return false
                        }
                } else
                    for (const key in first)
                        if (Object.prototype.hasOwnProperty.call(first, key)) {
                            if (properties && !properties.includes(key))
                                break
                            let doBreak:boolean = false
                            for (const exceptionPrefix of exceptionPrefixes)
                                if (key.toString().startsWith(
                                    exceptionPrefix
                                )) {
                                    doBreak = true
                                    break
                                }
                            if (doBreak)
                                break
                            if (deep !== 0) {
                                const result:any = Tools.equals(
                                    first[key],
                                    second[key],
                                    properties,
                                    deep - 1,
                                    exceptionPrefixes,
                                    ignoreFunctions,
                                    compareBlobs
                                )
                                if (!result)
                                    return false
                                else if (
                                    typeof result === 'object' &&
                                    'then' in result
                                )
                                    promises.push(result)
                            }
                        }
            }
            if (promises.length)
                return new Promise(async (resolve:Function):Promise<void> =>
                    resolve((await Promise.all(promises)).every(
                        Tools.identity)))
            return true
        }
        return false
    }
    /**
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
     */
    static evaluateDynamicData(
        object:any,
        scope:Mapping<any> = {},
        selfReferenceName:string = 'self',
        expressionIndicatorKey:string = '__evaluate__',
        executionIndicatorKey:string = '__execute__'
    ):any {
        if (typeof object !== 'object' || object === null)
            return object
        if (!(selfReferenceName in scope))
            scope[selfReferenceName] = object
        const evaluate:Function = (
            code:string, type:string = expressionIndicatorKey
        ):any => {
            code = (type === expressionIndicatorKey) ? `return ${code}` : code
            let compiledFunction:Function
            try {
                /* eslint-disable new-parens */
                compiledFunction = new (Function.prototype.bind.call(
                /* eslint-enable new-parens */
                    Function, null, ...Object.keys(scope), code
                ))
            } catch (error) {
                throw new Error(
                    `Error during compiling code "${code}": "` +
                    `${Tools.represent(error)}".`
                )
            }
            try {
                return compiledFunction(...Object.values(scope))
            } catch (error) {
                throw new Error(
                    `Error running code "${code}" in scope with variables "` +
                    `${Object.keys(scope).join('", "')}": "` +
                    `${Tools.represent(error)}".`
                )
            }
        }
        const addProxyRecursively:Function = (data:any):any => {
            if (
                typeof data !== 'object' ||
                data === null ||
                typeof Proxy === 'undefined'
            )
                return data
            for (const key in data)
                if (
                    Object.prototype.hasOwnProperty.call(data, key) &&
                    key !== '__target__' &&
                    typeof data[key] === 'object' &&
                    data[key] !== null
                ) {
                    addProxyRecursively(data[key])
                    /*
                        NOTE: We only wrap needed objects for performance
                        reasons.
                    */
                    if (
                        Object.prototype.hasOwnProperty.call(
                            data[key], expressionIndicatorKey) ||
                        Object.prototype.hasOwnProperty.call(
                            data[key], executionIndicatorKey)
                    ) {
                        const backup:object = data[key]
                        data[key] = new Proxy(data[key], {
                            get: (target:any, key:any):any => {
                                if (key === '__target__')
                                    return target
                                if (key === 'hasOwnProperty')
                                    return target[key]
                                /*
                                    NOTE: Very complicated stuff section, only
                                    change while doing a lot of tests.
                                */
                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (key === type)
                                        return resolve(evaluate(
                                            target[key], type))
                                const resolvedTarget:any = resolve(target)
                                if (key === 'toString') {
                                    const result:any = evaluate(resolvedTarget)
                                    return result[key].bind(result)
                                }
                                if (typeof key !== 'string') {
                                    const result:any = evaluate(resolvedTarget)
                                    if (result[key] && result[key].call)
                                        return result[key].bind(result)
                                    return result[key]
                                }
                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (Object.prototype.hasOwnProperty.call(
                                        target, type
                                    ))
                                        return evaluate(
                                            resolvedTarget, type
                                        )[key]
                                return resolvedTarget[key]
                                // End of complicated stuff.
                            },
                            ownKeys: (target:any):Array<string> => {
                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (Object.prototype.hasOwnProperty.call(
                                        target, type
                                    ))
                                        return Object.getOwnPropertyNames(
                                            resolve(evaluate(
                                                target[type], type)))
                                return Object.getOwnPropertyNames(target)
                            }
                        })
                        /*
                            NOTE: Known proxy polyfills does not provide the
                            "__target__" api.
                        */
                        if (!data[key].__target__)
                            data[key].__target__ = backup
                    }
                }
            return data
        }
        const resolve:Function = (data:any):any => {
            if (typeof data === 'object' && data !== null) {
                if (data.__target__) {
                    // NOTE: We have to skip "ownKeys" proxy trap here.
                    for (const type of [
                        expressionIndicatorKey, executionIndicatorKey
                    ])
                        if (Object.prototype.hasOwnProperty.call(data, type))
                            return data[type]
                    data = data.__target__
                }
                for (const key in data)
                    if (Object.prototype.hasOwnProperty.call(data, key)) {
                        if ([
                            expressionIndicatorKey, executionIndicatorKey
                        ].includes(key)) {
                            if (typeof Proxy === 'undefined')
                                return resolve(evaluate(data[key]))
                            return data[key]
                        }
                        data[key] = resolve(data[key])
                    }
            }
            return data
        }
        scope.resolve = resolve
        const removeProxyRecursively:Function = (data:any):any => {
            if (typeof data === 'object' && data !== null)
                for (const key in data)
                    if (
                        Object.prototype.hasOwnProperty.call(data, key) &&
                        key !== '__target__' &&
                        ['function', 'undefined'].includes(typeof data[key]) &&
                        data[key] !== null
                    ) {
                        const target:any = data[key].__target__
                        if (typeof target !== 'undefined')
                            data[key] = target
                        removeProxyRecursively(data[key])
                    }
            return data
        }
        if (typeof object === 'object' && object !== null)
            if (Object.prototype.hasOwnProperty.call(
                object, expressionIndicatorKey
            ))
                return evaluate(object[expressionIndicatorKey])
            else if (Object.prototype.hasOwnProperty.call(
                object, executionIndicatorKey
            ))
                return evaluate(
                    object[executionIndicatorKey], executionIndicatorKey)
        return removeProxyRecursively(resolve(addProxyRecursively(object)))
    }
    /**
     * Removes properties in objects where a dynamic indicator lives.
     * @param data - Object to traverse recursively.
     * @param expressionIndicators - Property key to remove.
     * @returns Given object with removed properties.
     */
    static removeEvaluationInDynamicData(
        data:PlainObject,
        expressionIndicators:Array<string> = ['__evaluate__', '__execute__']
    ):PlainObject {
        for (const key in data)
            if (
                data.hasOwnProperty(key) &&
                !expressionIndicators.includes(key) &&
                expressionIndicators.some((name:string):boolean =>
                    data.hasOwnProperty(name)
                )
            )
                delete data[key]
            else if (Tools.isPlainObject(data[key]))
                Tools.removeEvaluationInDynamicData(data[key] as PlainObject)
        return data
    }
    /**
     * Extends given target object with given sources object. As target and
     * sources many expandable types are allowed but target and sources have to
     * to come from the same type.
     * @param targetOrDeepIndicator - Maybe the target or deep indicator.
     * @param targetAndOrSources - Target and at least one source object.
     * @returns Returns given target extended with all given sources.
     */
    static extend(
        targetOrDeepIndicator:boolean|any, ...targetAndOrSources:Array<any>
    ):any {
        let index:number = 0
        let deep:boolean = false
        let target:any
        if (typeof targetOrDeepIndicator === 'boolean') {
            // Handle a deep copy situation and skip deep indicator and target.
            deep = targetOrDeepIndicator
            target = targetAndOrSources[index]
            index = 1
        } else
            target = targetOrDeepIndicator
        const mergeValue = (targetValue:any, value:any):any => {
            if (value === targetValue)
                return targetValue
            // Recurse if we're merging plain objects or maps.
            if (
                deep &&
                value &&
                (Tools.isPlainObject(value) || Tools.isMap(value))
            ) {
                let clone:any
                if (Tools.isMap(value))
                    clone = (targetValue && Tools.isMap(targetValue)) ?
                        targetValue :
                        new Map()
                else
                    clone = (
                        targetValue &&
                        Tools.isPlainObject(targetValue)
                    ) ? targetValue : {}
                return Tools.extend(deep, clone, value)
            }
            return value
        }
        while (index < targetAndOrSources.length) {
            const source:any = targetAndOrSources[index]
            let targetType:string = typeof target
            let sourceType:string = typeof source
            if (Tools.isMap(target))
                targetType += ' Map'
            if (Tools.isMap(source))
                sourceType += ' Map'
            if (targetType === sourceType && target !== source)
                if (Tools.isMap(target) && Tools.isMap(source))
                    for (const [key, value] of source)
                        target.set(key, mergeValue(target.get(key), value))
                else if (
                    target !== null &&
                    !Array.isArray(target) &&
                    typeof target === 'object' &&
                    source !== null &&
                    !Array.isArray(source) &&
                    typeof source === 'object'
                ) {
                    for (const key in source)
                        if (Object.prototype.hasOwnProperty.call(source, key))
                            target[key] = mergeValue(target[key], source[key])
                } else
                    target = source
            else
                target = source
            index += 1
        }
        return target
    }
    /**
     * Retrieves substructure in given object referenced by given selector
     * path.
     * @param target - Object to search in.
     * @param selector - Selector path.
     * @param skipMissingLevel - Indicates to skip missing level in given path.
     * @param delimiter - Delimiter to delimit given selector components.
     * @returns Determined sub structure of given data or "undefined".
     */
    static getSubstructure(
        target:any,
        selector:Array<string>|string,
        skipMissingLevel:boolean = true,
        delimiter:string = '.'
    ):any {
        let path:Array<string> = []
        for (const component of ([] as Array<string>).concat(
            selector
        ))
            path = path.concat(component.split(delimiter))
        let result:any = target
        for (const name of path)
            if (
                result !== null &&
                typeof result === 'object' &&
                Object.prototype.hasOwnProperty.call(result, name)
            )
                result = result[name]
            else if (!skipMissingLevel)
                return undefined
        return result
    }
    /**
     * Generates a proxy handler which forwards all operations to given object
     * as there wouldn't be a proxy.
     * @param target - Object to proxy.
     * @param methodNames - Mapping of operand name to object specific method
     * name.
     * @returns Determined proxy handler.
     */
    static getProxyHandler(target:any, methodNames:Mapping = {}):ProxyHandler {
        methodNames = Tools.extend(
            {
                delete: '[]',
                get: '[]',
                has: '[]',
                set: '[]'
            },
            methodNames
        )
        return {
            deleteProperty: (targetObject:any, key:string|Symbol):boolean => {
                if (methodNames.delete === '[]' && typeof key === 'string')
                    delete target[key]
                else
                    return target[methodNames.delete](key)
                return true
            },
            get: (targetObject:any, key:string|Symbol):any => {
                if (methodNames.get === '[]' && typeof key === 'string')
                    return target[key]
                return target[methodNames.get](key)
            },
            has: (targetObject:any, key:string|Symbol):boolean => {
                if (methodNames.has === '[]')
                    return key in target
                return target[methodNames.has](key)
            },
            set: (targetObject:any, key:string|Symbol, value:any):boolean => {
                if (methodNames.set === '[]' && typeof key === 'string')
                    target[key] = value
                else
                    return target[methodNames.set](value)
                return true
            }
        }
    }
    /**
     * Slices all properties from given object which does not match provided
     * object mask. Items can be explicitly white listed via "include" mask
     * configuration or black listed via "exclude" mask configuration.
     * @param object - Object to slice.
     * @param mask - Mask configuration.
     * @returns Given but sliced object. If object (or nested object will be
     * modified a flat copy of that object will be returned.
     */
    static maskObject(object:object, mask:ObjectMaskConfiguration):object {
        mask = Tools.extend({exclude: false, include: true}, mask)
        if (
            mask.exclude === true ||
            mask.include === false ||
            typeof object !== 'object'
        )
            return {}
        let result:object = {}
        if (Tools.isPlainObject(mask.include)) {
            for (const key in mask.include)
                if (
                    mask.include.hasOwnProperty(key) &&
                    object.hasOwnProperty(key)
                )
                    if (mask.include[key] === true)
                        result[key as keyof object] =
                            object[key as keyof object]
                    else if (
                        Tools.isPlainObject(mask.include[key]) &&
                        typeof object[key as keyof object] === 'object'
                    )
                        (result[key as keyof object] as object) =
                            this.maskObject(
                                object[key as keyof object],
                                {include: mask.include[key]}
                            )
        } else
            result = object
        if (Tools.isPlainObject(mask.exclude))
            for (const key in mask.exclude)
                if (
                    mask.exclude.hasOwnProperty(key) &&
                    result.hasOwnProperty(key)
                )
                    if (mask.exclude[key] === true)
                        delete result[key as keyof object]
                    else if (
                        Tools.isPlainObject(mask.exclude[key]) &&
                        typeof result[key as keyof object] === 'object'
                    )
                        (result[key as keyof object] as object) =
                            this.maskObject(
                                result[key as keyof object],
                                {exclude: mask.exclude[key]}
                            )
        return result
    }
    /**
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
     */
    static modifyObject(
        target:any,
        source:any,
        removeIndicatorKey:string = '__remove__',
        prependIndicatorKey:string = '__prepend__',
        appendIndicatorKey:string = '__append__',
        positionPrefix:string = '__',
        positionSuffix:string = '__',
        parentSource:any = null,
        parentKey:any = null
    ):any {
        /* eslint-disable curly */
        if (Tools.isMap(source) && Tools.isMap(target)) {
            for (const [key, value] of source)
                if (target.has(key))
                    Tools.modifyObject(
                        target.get(key),
                        value,
                        removeIndicatorKey,
                        prependIndicatorKey,
                        appendIndicatorKey,
                        positionPrefix,
                        positionSuffix,
                        source,
                        key
                    )
        } else if (
        /* eslint-enable curly */
            source !== null &&
            typeof source === 'object' &&
            target !== null &&
            typeof target === 'object'
        )
            for (const key in source)
                if (Object.prototype.hasOwnProperty.call(source, key))
                    if ([
                        removeIndicatorKey,
                        prependIndicatorKey,
                        appendIndicatorKey
                    ].includes(key)) {
                        if (Array.isArray(target))
                            if (key === removeIndicatorKey) {
                                const values:Array<any> =
                                    [].concat(source[key])
                                for (const value of values)
                                    if (
                                        typeof value === 'string' &&
                                        value.startsWith(positionPrefix) &&
                                        value.endsWith(positionSuffix)
                                    )
                                        target.splice(
                                            parseInt(
                                                value.substring(
                                                    positionPrefix.length,
                                                    value.length -
                                                    positionSuffix.length
                                                ),
                                                10
                                            ),
                                            1
                                        )
                                    else if (target.includes(value))
                                        target.splice(target.indexOf(value), 1)
                                    else if (
                                        typeof value === 'number' &&
                                        value < target.length
                                    )
                                        target.splice(value, 1)
                            } else if (key === prependIndicatorKey)
                                target = ([] as Array<any>)
                                    .concat(source[key])
                                    .concat(target)
                            else
                                target = target.concat(source[key])
                        else if (key === removeIndicatorKey)
                            for (const value of [].concat(source[key]))
                                if (Object.prototype.hasOwnProperty.call(
                                    target, value
                                ))
                                    delete target[value]
                        delete source[key]
                        if (parentSource && parentKey)
                            delete parentSource[parentKey]
                    } else if (
                        target !== null &&
                        Object.prototype.hasOwnProperty.call(target, key)
                    )
                        target[key] = Tools.modifyObject(
                            target[key],
                            source[key],
                            removeIndicatorKey,
                            prependIndicatorKey,
                            appendIndicatorKey,
                            positionPrefix,
                            positionSuffix,
                            source,
                            key
                        )
        return target
    }
    /**
     * Interprets a date object from given artefact.
     * @param value - To interpret.
     * @param interpretAsUTC - Identifies if given date should be interpret as
     * utc.
     * @returns Interpreted date object or "null" if given value couldn't be
     * interpret.
     */
    static normalizeDateTime(
        value:string|null|number|Date = null, interpretAsUTC:boolean = true
    ):Date|null {
        if (value === null)
            return new Date()
        if (typeof value === 'string')
            /*
                We make a simple precheck to determine if it could be a date
                like representation. Idea: There should be at least some
                numbers and separators.
            */
            if (/^.*(?:(?:[0-9]{1,4}[^0-9]){2}|[0-9]{1,4}[^0-9.]).*$/.test(
                value
            )) {
                value = Tools.stringInterpretDateTime(value, interpretAsUTC)
                if (value === null)
                    return value
            } else {
                const floatRepresentation:number = parseFloat(value)
                if (`${floatRepresentation}` === value)
                    value = floatRepresentation
            }
        if (typeof value === 'number')
            return new Date(value * 1000)
        const result:Date = new Date(value)
        if (isNaN(result.getDate()))
            return null
        return result
    }
    /**
     * Removes given key from given object recursively.
     * @param object - Object to process.
     * @param keys - List of keys to remove.
     * @returns Processed given object.
     */
    static removeKeys<T>(object:T, keys:Array<string>|string = '#'):T {
        const resolvedKeys:Array<string> = ([] as Array<string>).concat(keys)
        if (Array.isArray(object)) {
            let index:number = 0
            for (const subObject of object.slice()) {
                let skip:boolean = false
                if (typeof subObject === 'string') {
                    for (const key of resolvedKeys)
                        if (subObject.startsWith(`${key}:`)) {
                            object.splice(index, 1)
                            skip = true
                            break
                        }
                    if (skip)
                        continue
                }
                object[index] = Tools.removeKeys(subObject, resolvedKeys)
                index += 1
            }
        } else if (Tools.isSet(object))
            for (const subObject of new Set(object)) {
                let skip:boolean = false
                if (typeof subObject === 'string') {
                    for (const key of resolvedKeys)
                        if (subObject.startsWith(`${key}:`)) {
                            object.delete(subObject)
                            skip = true
                            break
                        }
                    if (skip)
                        continue
                }
                Tools.removeKeys(subObject, resolvedKeys)
            }
        else if (Tools.isMap(object))
            for (const [key, subObject] of new Map(object)) {
                let skip:boolean = false
                if (typeof key === 'string') {
                    for (const resolvedKey of resolvedKeys) {
                        const escapedKey:string =
                            Tools.stringEscapeRegularExpressions(resolvedKey)
                        if (new RegExp(`^${escapedKey}[0-9]*$`).test(key)) {
                            object.delete(key)
                            skip = true
                            break
                        }
                    }
                    if (skip)
                        continue
                }
                object.set(key, Tools.removeKeys(subObject, resolvedKeys))
            }
        else if (object !== null && typeof object === 'object')
            for (const key in Object.assign({}, object))
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    let skip:boolean = false
                    for (const resolvedKey of resolvedKeys) {
                        const escapedKey:string =
                            Tools.stringEscapeRegularExpressions(resolvedKey)
                        if (new RegExp(`^${escapedKey}[0-9]*$`).test(key)) {
                            delete object[key]
                            skip = true
                            break
                        }
                    }
                    if (skip)
                        continue
                    object[key] = Tools.removeKeys(object[key], resolvedKeys)
                }
        return object
    }
    /**
     * Represents given object as formatted string.
     * @param object - Object to represent.
     * @param indention - String (usually whitespaces) to use as indention.
     * @param initialIndention - String (usually whitespaces) to use as
     * additional indention for the first object traversing level.
     * @param maximumNumberOfLevelsReachedIdentifier - Replacement for objects
     * which are out of specified bounds to traverse.
     * @param numberOfLevels - Specifies number of levels to traverse given
     * data structure.
     * @returns Representation string.
     */
    static represent(
        object:any,
        indention:string = '    ',
        initialIndention:string = '',
        maximumNumberOfLevelsReachedIdentifier:any =
            '__maximum_number_of_levels_reached__',
        numberOfLevels:number = 8
    ):string {
        if (numberOfLevels === 0)
            return maximumNumberOfLevelsReachedIdentifier
        if (object === null)
            return 'null'
        if (object === undefined)
            return 'undefined'
        if (typeof object === 'string')
            return `"${object.replace(/\n/g, `\n${initialIndention}`)}"`
        if (Tools.isNumeric(object) || typeof object === 'boolean')
            return `${object}`
        if (Array.isArray(object)) {
            let result:string = '['
            let firstSeen:boolean = false
            for (const item of object) {
                if (firstSeen)
                    result += ','
                result += `\n${initialIndention}${indention}` +
                    Tools.represent(
                        item,
                        indention,
                        `${initialIndention}${indention}`,
                        maximumNumberOfLevelsReachedIdentifier,
                        numberOfLevels - 1
                    )
                firstSeen = true
            }
            if (firstSeen)
                result += `\n${initialIndention}`
            result += ']'
            return result
        }
        if (Tools.isMap(object)) {
            let result:string = ''
            let firstSeen:boolean = false
            for (const [key, item] of object) {
                if (firstSeen)
                    result += `,\n${initialIndention}${indention}`
                result +=
                    Tools.represent(
                        key,
                        indention,
                        `${initialIndention}${indention}`,
                        maximumNumberOfLevelsReachedIdentifier,
                        numberOfLevels - 1
                    ) +
                    ' -> ' +
                    Tools.represent(
                        item,
                        indention,
                        `${initialIndention}${indention}`,
                        maximumNumberOfLevelsReachedIdentifier,
                        numberOfLevels - 1
                    )
                firstSeen = true
            }
            if (!firstSeen)
                result = 'EmptyMap'
            return result
        }
        if (Tools.isSet(object)) {
            let result:string = '{'
            let firstSeen:boolean = false
            for (const item of object) {
                if (firstSeen)
                    result += ','
                result +=
                    `\n${initialIndention}${indention}` +
                    Tools.represent(
                        item,
                        indention,
                        `${initialIndention}${indention}`,
                        maximumNumberOfLevelsReachedIdentifier,
                        numberOfLevels - 1
                    )
                firstSeen = true
            }
            if (firstSeen)
                result += `\n${initialIndention}}`
            else
                result = 'EmptySet'
            return result
        }
        let result:string = '{'
        const keys:Array<string> = Object.getOwnPropertyNames(object).sort()
        let firstSeen:boolean = false
        for (const key of keys) {
            if (firstSeen)
                result += ','
            result += `\n${initialIndention}${indention}${key}: ` +
                Tools.represent(
                    object[key],
                    indention,
                    `${initialIndention}${indention}`,
                    maximumNumberOfLevelsReachedIdentifier,
                    numberOfLevels - 1
                )
            firstSeen = true
        }
        if (firstSeen)
            result += `\n${initialIndention}`
        result += '}'
        return result
    }
    /**
     * Sort given objects keys.
     * @param object - Object which keys should be sorted.
     * @returns Sorted list of given keys.
     */
    static sort(object:any):Array<any> {
        const keys:Array<any> = []
        if (Array.isArray(object))
            for (let index:number = 0; index < object.length; index++)
                keys.push(index)
        else if (typeof object === 'object')
            if (Tools.isMap(object))
                for (const keyValuePair of object)
                    keys.push(keyValuePair[0])
            else if (object !== null)
                for (const key in object)
                    if (Object.prototype.hasOwnProperty.call(object, key))
                        keys.push(key)
        return keys.sort()
    }
    /**
     * Removes a proxy from given data structure recursively.
     * @param object - Object to proxy.
     * @param seenObjects - Tracks all already processed objects to avoid
     * endless loops (usually only needed for internal purpose).
     * @returns Returns given object unwrapped from a dynamic proxy.
     */
    static unwrapProxy(object:any, seenObjects:Set<any> = new Set()):any {
        if (object !== null && typeof object === 'object') {
            if (seenObjects.has(object))
                return object
            try {
                if (object.__revoke__) {
                    object = object.__target__
                    object.__revoke__()
                }
            } catch (error) {
                return object
            } finally {
                seenObjects.add(object)
            }
            if (Array.isArray(object)) {
                let index:number = 0
                for (const value of object) {
                    object[index] = Tools.unwrapProxy(value, seenObjects)
                    index += 1
                }
            } else if (Tools.isMap(object))
                for (const [key, value] of object)
                    object.set(key, Tools.unwrapProxy(value, seenObjects))
            else if (Tools.isSet(object)) {
                const cache:Array<any> = []
                for (const value of object) {
                    object.delete(value)
                    cache.push(Tools.unwrapProxy(value, seenObjects))
                }
                for (const value of cache)
                    object.add(value)
            } else
                for (const key in object)
                    if (Object.prototype.hasOwnProperty.call(object, key))
                        object[key] = Tools.unwrapProxy(
                            object[key], seenObjects)
        }
        return object
    }
    // / endregion
    // / region array
    /**
     * Summarizes given property of given item list.
     * @param data - Array of objects with given property name.
     * @param propertyName - Property name to summarize.
     * @param defaultValue - Value to return if property values doesn't match.
     * @returns Summarized array.
     */
    static arrayAggregatePropertyIfEqual(
        data:Array<Mapping<any>>,
        propertyName:string,
        defaultValue:any = ''
    ):any {
        let result:any = defaultValue
        if (
            data &&
            data.length &&
            Object.prototype.hasOwnProperty.call(data[0], propertyName)
        ) {
            result = data[0][propertyName]
            for (const item of Tools.arrayMake(data))
                if (item[propertyName] !== result)
                    return defaultValue
        }
        return result
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
    static arrayDeleteEmptyItems(
        data:any, propertyNames:Array<string> = []
    ):any {
        if (!data)
            return data
        const result:Array<any> = []
        for (const item of Tools.arrayMake(data)) {
            let empty:boolean = true
            for (const propertyName in item)
                if (Object.prototype.hasOwnProperty.call(item, propertyName))
                    if (
                        !['', null, undefined].includes(item[propertyName]) &&
                        (
                            !propertyNames.length ||
                            Tools.arrayMake(propertyNames).includes(
                                propertyName)
                        )
                    ) {
                        empty = false
                        break
                    }
            if (!empty)
                result.push(item)
        }
        return result
    }
    /**
     * Extracts all properties from all items wich occur in given property
     * names.
     * @param data - Data where each item should be sliced.
     * @param propertyNames - Property names to extract.
     * @returns Data with sliced items.
     */
    static arrayExtract(
        data:Array<Mapping<any>>, propertyNames:Array<string>
    ):Array<Object> {
        const result:Array<Mapping<any>> = []
        for (const item of Tools.arrayMake(data)) {
            const newItem:Mapping<any> = {}
            for (const propertyName of Tools.arrayMake(propertyNames))
                if (Object.prototype.hasOwnProperty.call(item, propertyName))
                    newItem[propertyName] = item[propertyName]
            result.push(newItem)
        }
        return result
    }
    /**
     * Extracts all values which matches given regular expression.
     * @param data - Data to filter.
     * @param regularExpression - Pattern to match for.
     * @returns Filtered data.
     */
    static arrayExtractIfMatches(
        data:Array<string>, regularExpression:string|RegExp
    ):Array<string> {
        if (!regularExpression)
            return Tools.arrayMake(data)
        const result:Array<string> = []
        for (const value of Tools.arrayMake(data))
            if (
                ((typeof regularExpression === 'string') ?
                    new RegExp(regularExpression) :
                    regularExpression
                ).test(value)
            )
                result.push(value)
        return result
    }
    /**
     * Filters given data if given property is set or not.
     * @param data - Data to filter.
     * @param propertyName - Property name to check for existence.
     * @returns Given data without the items which doesn't have specified
     * property.
     */
    static arrayExtractIfPropertyExists(data:any, propertyName:string):any {
        if (data && propertyName) {
            const result:Array<Object> = []
            for (const item of Tools.arrayMake(data)) {
                let exists:boolean = false
                for (const key in item)
                    if (
                        key === propertyName &&
                        Object.prototype.hasOwnProperty.call(item, key) &&
                        ![null, undefined].includes(item[key])
                    ) {
                        exists = true
                        break
                    }
                if (exists)
                    result.push(item)
            }
            return result
        }
        return data
    }
    /**
     * Extract given data where specified property value matches given
     * patterns.
     * @param data - Data to filter.
     * @param propertyPattern - Mapping of property names to pattern.
     * @returns Filtered data.
     */
    static arrayExtractIfPropertyMatches(
        data:any, propertyPattern:Mapping<RegExp|string>
    ):any {
        if (data && propertyPattern) {
            const result:Array<Object> = []
            for (const item of Tools.arrayMake(data)) {
                let matches:boolean = true
                for (const propertyName in propertyPattern)
                    if (!(
                        propertyPattern[propertyName] &&
                        (
                            (typeof propertyPattern[propertyName] ===
                                'string'
                            ) ?
                                new RegExp(propertyPattern[propertyName]) :
                                propertyPattern[propertyName] as RegExp
                        ).test(item[propertyName])
                    )) {
                        matches = false
                        break
                    }
                if (matches)
                    result.push(item)
            }
            return result
        }
        return data
    }
    /**
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
     */
    static arrayIntersect(
        first:Array<any>,
        second:Array<any>,
        keys:any|Array<string> = [],
        strict:boolean = true
    ):Array<any> {
        const containingData:Array<any> = []
        second = Tools.arrayMake(second)
        const intersectItem:Function = (
            firstItem:any,
            secondItem:any,
            firstKey:string|number,
            secondKey:string|number,
            keysAreAnArray:boolean,
            iterateGivenKeys:boolean
        ):false|undefined => {
            if (iterateGivenKeys) {
                if (keysAreAnArray)
                    firstKey = secondKey
            } else
                secondKey = firstKey
            if (
                secondItem[secondKey] !== firstItem[firstKey] &&
                (
                    strict ||
                    !(
                        [null, undefined].includes(secondItem[secondKey]) &&
                        [null, undefined].includes(firstItem[firstKey])
                    )
                )
            )
                return false
        }
        for (const firstItem of Tools.arrayMake(first))
            if (Tools.isPlainObject(firstItem))
                for (const secondItem of second) {
                    let exists:boolean = true
                    let iterateGivenKeys:boolean
                    const keysAreAnArray:boolean = Array.isArray(keys)
                    if (
                        Tools.isPlainObject(keys) ||
                        keysAreAnArray &&
                        keys.length
                    )
                        iterateGivenKeys = true
                    else {
                        iterateGivenKeys = false
                        keys = firstItem
                    }
                    if (Array.isArray(keys)) {
                        let index:number = 0
                        for (const key of keys) {
                            if (intersectItem(
                                firstItem,
                                secondItem,
                                index,
                                key,
                                keysAreAnArray,
                                iterateGivenKeys
                            ) === false) {
                                exists = false
                                break
                            }
                            index += 1
                        }
                    } else
                        for (const key in keys)
                            if (
                                Object.prototype.hasOwnProperty.call(keys, key)
                            )
                                if (intersectItem(
                                    firstItem,
                                    secondItem,
                                    key,
                                    keys[key],
                                    keysAreAnArray,
                                    iterateGivenKeys
                                ) === false) {
                                    exists = false
                                    break
                                }
                    if (exists) {
                        containingData.push(firstItem)
                        break
                    }
                }
            else if (second.includes(firstItem))
                containingData.push(firstItem)
        return containingData
    }
    /**
     * Creates a list of items within given range.
     * @param range - Array of lower and upper bounds. If only one value is
     * given lower bound will be assumed to be zero. Both integers have to be
     * positive and will be contained in the resulting array.
     * @param step - Space between two consecutive values.
     * @returns Produced array of integers.
     */
    static arrayMakeRange(range:Array<number>, step:number = 1):Array<number> {
        let index:number
        let higherBound:number
        if (range.length === 1) {
            index = 0
            higherBound = parseInt(`${range[0]}`, 10)
        } else if (range.length === 2) {
            index = parseInt(`${range[0]}`, 10)
            higherBound = parseInt(`${range[1]}`, 10)
        } else
            return range
        const result = [index]
        while (index <= higherBound - step) {
            index += step
            result.push(index)
        }
        return result
    }
    /**
     * Merge the contents of two arrays together into the first array.
     * @param target - Target array.
     * @param source - Source array.
     * @returns Target array with merged given source one.
     */
    static arrayMerge(target:Array<any>, source:Array<any>):Array<any> {
        if (!Array.isArray(source))
            source = Array.prototype.slice.call(source)
        for (const value of source)
            target.push(value)
        return target
    }
    /**
     * Converts given object into an array.
     * @param object - Target to convert.
     * @returns Generated array.
     */
    static arrayMake(object:any):Array<any> {
        const result:Array<any> = []
        if (![null, undefined].includes(object))
            if (Tools.isArrayLike(Object(object)))
                Tools.arrayMerge(
                    result, typeof object === 'string' ? [object] : object)
            else
                result.push(object)
        return result
    }
    /**
     * Makes all values in given iterable unique by removing duplicates (The
     * first occurrences will be left).
     * @param data - Array like object.
     * @returns Sliced version of given object.
     */
    static arrayUnique(data:Array<any>):Array<any> {
        const result:Array<any> = []
        for (const value of Tools.arrayMake(data))
            if (!result.includes(value))
                result.push(value)
        return result
    }
    /**
     * Generates all permutations of given iterable.
     * @param data - Array like object.
     * @returns Array of permuted arrays.
     */
    static arrayPermutate(data:Array<any>):Array<Array<any>> {
        const result:Array<Array<any>> = []

        const permute:Function = (
            currentData:Array<any>, dataToMixin:Array<any> = []
        ):void => {
            if (currentData.length === 0)
                result.push(dataToMixin)
            else
                for (
                    let index:number = 0; index < currentData.length; index++
                ) {
                    const copy = currentData.slice()
                    permute(copy, dataToMixin.concat(copy.splice(index, 1)))
                }
        }

        permute(data)
        return result
    }
    /**
     * Generates all lengths permutations of given iterable.
     * @param data - Array like object.
     * @param minimalSubsetLength - Defines how long the minimal subset length
     * should be.
     * @returns Array of permuted arrays.
     */
    static arrayPermutateLength(
        data:Array<any>, minimalSubsetLength:number = 1
    ):Array<Array<any>> {
        const result:Array<Array<any>> = []
        if (data.length === 0)
            return result
        const generate:Function = (
            index:number, source:Array<any>, rest:Array<any>
        ):void => {
            if (index === 0) {
                if (rest.length > 0)
                    result[result.length] = rest
                return
            }
            for (
                let sourceIndex:number = 0;
                sourceIndex < source.length;
                sourceIndex++
            )
                generate(
                    index - 1,
                    source.slice(sourceIndex + 1),
                    rest.concat([source[sourceIndex]])
                )
        }
        for (
            let index:number = minimalSubsetLength;
            index < data.length;
            index++
        )
            generate(index, data, [])
        result.push(data)
        return result
    }
    /**
     * Sums up given property of given item list.
     * @param data - The objects with specified property to sum up.
     * @param propertyName - Property name to sum up its value.
     * @returns The aggregated value.
     */
    static arraySumUpProperty(data:any, propertyName:string):number {
        let result:number = 0
        if (Array.isArray(data) && data.length)
            for (const item of data)
                if (Object.prototype.hasOwnProperty.call(item, propertyName))
                    result += parseFloat(item[propertyName] || 0)
        return result
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
    static arrayAppendAdd(
        item:Mapping<any>,
        target:any,
        name:string,
        checkIfExists:boolean = true
    ):Mapping<any> {
        if (Object.prototype.hasOwnProperty.call(item, name)) {
            if (!(checkIfExists && item[name].includes(target)))
                item[name].push(target)
        } else
            item[name] = [target]
        return item
    }
    /**
     * Removes given target on given list.
     * @param list - Array to splice.
     * @param target - Target to remove from given list.
     * @param strict - Indicates whether to fire an exception if given target
     * doesn't exists given list.
     * @returns Item with the appended target.
     */
    static arrayRemove<T>(list:T, target:any, strict:boolean = false):T {
        if (Array.isArray(list)) {
            const index:number = list.indexOf(target)
            if (index === -1) {
                if (strict)
                    throw new Error(
                        `Given target doesn't exists in given list.`
                    )
            } else
                list.splice(index, 1)
        } else if (strict)
            throw new Error(`Given target isn't an array.`)
        return list
    }
    /**
     * Sorts given object of dependencies in a topological order.
     * @param items - Items to sort.
     * @returns Sorted array of given items respecting their dependencies.
     */
    static arraySortTopological(
        items:Mapping<Array<string>|string>
    ):Array<string> {
        const edges:Array<Array<string>> = []
        for (const name in items)
            if (Object.prototype.hasOwnProperty.call(items, name)) {
                items[name] = ([] as Array<string>).concat(items[name])
                if (items[name].length > 0)
                    for (const dependencyName of Tools.arrayMake(items[name]))
                        edges.push([name, dependencyName])
                else
                    edges.push([name])
            }
        const nodes:Array<null|string> = []
        // Accumulate unique nodes into a large list.
        for (const edge of edges)
            for (const node of edge)
                if (!nodes.includes(node))
                    nodes.push(node)
        const sorted:Array<string> = []
        // Define a visitor function that recursively traverses dependencies.
        const visit:Function = (
            node:string, predecessors:Array<string>
        ):void => {
            // Check if a node is dependent of itself.
            if (predecessors.length !== 0 && predecessors.includes(node))
                throw new Error(
                    `Cyclic dependency found. "${node}" is dependent of ` +
                    'itself.\n' +
                    `Dependency chain: "${predecessors.join('" -> "')}" => "` +
                    `${node}".`
                )
            const index = nodes.indexOf(node)
            // If the node still exists, traverse its dependencies.
            if (index !== -1) {
                let copy:Array<string>|undefined
                // Mark the node to exclude it from future iterations.
                nodes[index] = null
                /*
                    Loop through all edges and follow dependencies of the
                    current node
                */
                for (const edge of edges)
                    if (edge[0] === node) {
                        /*
                            Lazily create a copy of predecessors with the
                            current node concatenated onto it.
                        */
                        copy = copy || predecessors.concat([node])
                        // Recurse to node dependencies.
                        visit(edge[1], copy)
                    }
                sorted.push(node)
            }
        }
        for (let index = 0; index < nodes.length; index++) {
            const node:null|string = nodes[index]
            // Ignore nodes that have been excluded.
            if (node) {
                // Mark the node to exclude it from future iterations.
                nodes[index] = null
                /*
                    Loop through all edges and follow dependencies of the
                    current node.
                */
                for (const edge of edges)
                    if (edge[0] === node)
                        // Recurse to node dependencies.
                        visit(edge[1], [node])
                sorted.push(node)
            }
        }
        return sorted
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
    static stringEscapeRegularExpressions(
        value:string, excludeSymbols:Array<string> = []
    ):string {
        // NOTE: This is only for performance improvements.
        if (value.length === 1 && !Tools.specialRegexSequences.includes(value))
            return value
        // The escape sequence must also be escaped; but at first.
        if (!excludeSymbols.includes('\\'))
            value.replace(/\\/g, '\\\\')
        for (const replace of Tools.specialRegexSequences)
            if (!excludeSymbols.includes(replace))
                value = value.replace(
                    new RegExp(`\\${replace}`, 'g'), `\\${replace}`)
        return value
    }
    /**
     * Translates given name into a valid javaScript one.
     * @param name - Name to convert.
     * @param allowedSymbols - String of symbols which should be allowed within
     * a variable name (not the first character).
     * @returns Converted name is returned.
     */
    static stringConvertToValidVariableName(
        name:string, allowedSymbols:string = '0-9a-zA-Z_$'
    ):string {
        return name.toString().replace(/^[^a-zA-Z_$]+/, '').replace(
            new RegExp(`[^${allowedSymbols}]+([a-zA-Z0-9])`, 'g'),
            (fullMatch:string, firstLetter:string):string =>
                firstLetter.toUpperCase()
        )
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
    static stringEncodeURIComponent(url:string, encodeSpaces:boolean):string {
        return encodeURIComponent(url)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, (encodeSpaces) ? '%20' : '+')
    }
    /**
     * Appends a path selector to the given path if there isn't one yet.
     * @param path - The path for appending a selector.
     * @param pathSeparator - The selector for appending to path.
     * @returns The appended path.
     */
    static stringAddSeparatorToPath(
        path:string, pathSeparator:string = '/'
    ):string {
        path = path.trim()
        if (path.substr(-1) !== pathSeparator && path.length)
            return path + pathSeparator
        return path
    }
    /**
     * Checks if given path has given path prefix.
     * @param prefix - Path prefix to search for.
     * @param path - Path to search in.
     * @param separator - Delimiter to use in path (default is the posix
     * conform slash).
     * @returns Value "true" if given prefix occur and "false" otherwise.
     */
    static stringHasPathPrefix(
        prefix:any|string = '/admin',
        path:string = (
            'location' in $.global && $.global.location.pathname || ''
        ),
        separator:string = '/'
    ):boolean {
        if (typeof prefix === 'string') {
            if (!prefix.endsWith(separator))
                prefix += separator
            return (
                path === prefix.substring(
                    0, prefix.length - separator.length
                ) ||
                path.startsWith(prefix)
            )
        }
        return false
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
    static stringGetDomainName(
        url:string = 'location' in $.global && $.global.location.href || '',
        fallback:any = (
            'location' in $.global && $.global.location.hostname || ''
        )
    ):any {
        const result:Array<string>|null =
            /^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url)
        if (result && result.length > 2 && result[1] && result[2])
            return result[2]
        return fallback
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
    static stringGetPortNumber(
        url:string = 'location' in $.global && $.global.location.href || '',
        fallback:any = null,
        parameter:Array<string> = []
    ):number {
        const result:Array<string>|null =
            /^(?:[a-z]*:?\/\/[^/]+?)?(?:[^/]+?):([0-9]+)/i.exec(url)
        if (result && result.length > 1)
            return parseInt(result[1], 10)
        if (fallback !== null)
            return fallback
        if (
            Tools.stringIsInternalURL(url, ...parameter) &&
            'location' in $.global &&
            $.global.location.port &&
            parseInt($.global.location.port, 10)
        )
            return parseInt($.global.location.port, 10)
        return (Tools.stringGetProtocolName(url) === 'https') ? 443 : 80
    }
    /**
     * Extracts protocol name from given url. If no explicit url is given,
     * current protocol will be assumed. If no parameter given current protocol
     * number will be determined.
     * @param url - The url to extract protocol from.
     * @param fallback - Fallback port to use if no protocol exists in given
     * url (default is current protocol).
     * @returns Extracted protocol.
     */
    static stringGetProtocolName(
        url:string = 'location' in $.global && $.global.location.href || '',
        fallback:any = 'location' in $.global &&
        $.global.location.protocol.substring(
            0, $.global.location.protocol.length - 1
        ) ||
        ''
    ):any {
        const result:Array<string>|null = /^([a-z]+):\/\//i.exec(url)
        if (result && result.length > 1 && result[1])
            return result[1]
        return fallback
    }
    /**
     * Read a page's GET URL variables and return them as an associative array
     * and preserves ordering.
     * @param keyToGet - If key given the corresponding value is returned and
     * full object otherwise.
     * @param allowDuplicates - Indicates whether to return arrays of values or
     * single values. If set to "false" (default) last values will overwrite
     * preceding values.
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
    static stringGetURLParameter(
        keyToGet:null|string = null,
        allowDuplicates:boolean = false,
        givenInput:null|string = null,
        subDelimiter:string = '$',
        hashedPathIndicator:string = '!',
        givenSearch:null|string = null,
        givenHash:string = (
            'location' in $.global &&
            typeof $.global.location.hash === 'string'
        ) ?
            $.global.location.hash :
            ''
    ):Array<string>|null|string {
        // region set search and hash
        let hash:string = (givenHash) ? givenHash : '#'
        let search:string = ''
        if (givenSearch)
            search = givenSearch
        else if (hashedPathIndicator && hash.startsWith(hashedPathIndicator)) {
            const subHashStartIndex:number = hash.indexOf('#')
            let pathAndSearch:string
            if (subHashStartIndex === -1) {
                pathAndSearch = hash.substring(hashedPathIndicator.length)
                hash = ''
            } else {
                pathAndSearch = hash.substring(
                    hashedPathIndicator.length, subHashStartIndex)
                hash = hash.substring(subHashStartIndex)
            }
            const subSearchStartIndex:number = pathAndSearch.indexOf('?')
            if (subSearchStartIndex !== -1)
                search = pathAndSearch.substring(subSearchStartIndex)
        } else if ('location' in $.global)
            search = $.global.location.search || ''
        let input:string = givenInput ? givenInput : search
        // endregion
        // region determine data from search and hash if specified
        const both:boolean = input === '&'
        if (both || input === '#') {
            let decodedHash:string = ''
            try {
                decodedHash = decodeURIComponent(hash)
            } catch (error) {}
            const subDelimiterIndex:number = decodedHash.indexOf(subDelimiter)
            if (subDelimiterIndex === -1)
                input = ''
            else {
                input = decodedHash.substring(subDelimiterIndex)
                if (input.startsWith(subDelimiter))
                    input = input.substring(subDelimiter.length)
            }
        } else if (input.startsWith('?'))
            input = input.substring('?'.length)
        let data:Array<string> = (input) ? input.split('&') : []
        search = search.substring('?'.length)
        if (both && search)
            data = data.concat(search.split('&'))
        // endregion
        // region construct data structure
        const parameter:Array<string> = []
        for (let value of data) {
            const keyValuePair:Array<string> = value.split('=')
            let key:string
            try {
                key = decodeURIComponent(keyValuePair[0])
            } catch (error) {
                key = ''
            }
            try {
                value = decodeURIComponent(keyValuePair[1])
            } catch (error) {
                value = ''
            }
            parameter.push(key)
            if (allowDuplicates)
                if (
                    parameter.hasOwnProperty(key) &&
                    Array.isArray(
                        (parameter as unknown as Mapping<Array<string>>)[key]
                    )
                )
                    (parameter as unknown as Mapping<Array<string>>)[key].push(
                        value
                    )
                else
                    (parameter as unknown as Mapping<Array<string>>)[key] =
                        [value]
            else
                (parameter as unknown as Mapping)[key] = value
        }
        // endregion
        if (keyToGet) {
            if (Object.prototype.hasOwnProperty.call(parameter, keyToGet))
                return (parameter as unknown as Mapping)[keyToGet]
            return null
        }
        return parameter
    }
    /**
     * Checks if given url points to another domain than second given url. If
     * no second given url provided current url will be assumed.
     * @param firstURL - URL to check against second url.
     * @param secondURL - URL to check against first url.
     * @returns Returns "true" if given first url has same domain as given
     * second (or current).
     */
    static stringIsInternalURL(
        firstURL:string,
        secondURL:string = (
            'location' in $.global && $.global.location.href || ''
        )
    ):boolean {
        const explicitDomainName:string = Tools.stringGetDomainName(
            firstURL, false)
        const explicitProtocolName:string = Tools.stringGetProtocolName(
            firstURL, false)
        const explicitPortNumber = Tools.stringGetPortNumber(firstURL, false)
        return (
            (
                !explicitDomainName ||
                explicitDomainName === Tools.stringGetDomainName(secondURL)
            ) &&
            (
                !explicitProtocolName ||
                explicitProtocolName === Tools.stringGetProtocolName(secondURL)
            ) &&
            (
                !explicitPortNumber ||
                explicitPortNumber === Tools.stringGetPortNumber(secondURL)
            )
        )
    }
    /**
     * Normalized given website url.
     * @param url - Uniform resource locator to normalize.
     * @returns Normalized result.
     */
    static stringNormalizeURL(url:any):string {
        if (typeof url === 'string') {
            url = url.replace(/^:?\/+/, '').replace(/\/+$/, '').trim()
            if (url.startsWith('http'))
                return url
            return `http://${url}`
        }
        return ''
    }
    /**
     * Represents given website url.
     * @param url - Uniform resource locator to represent.
     * @returns Represented result.
     */
    static stringRepresentURL(url:any):string {
        if (typeof url === 'string')
            return url.replace(/^(https?)?:?\/+/, '').replace(
                /\/+$/, ''
            ).trim()
        return ''
    }
    // // endregion
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Converts a camel cased string to its delimited string version.
     * @param string - The string to format.
     * @param delimiter - Delimiter string
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @returns The formatted string.
     */
    static stringCamelCaseToDelimited(
        string:string,
        delimiter:string = '-',
        abbreviations:Array<string>|null = null
    ):string {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (!abbreviations)
            abbreviations = Tools.abbreviations
        const escapedDelimiter:string =
            Tools.stringGetRegularExpressionValidated(delimiter)
        if (abbreviations.length) {
            let abbreviationPattern:string = ''
            for (const abbreviation of abbreviations) {
                if (abbreviationPattern)
                    abbreviationPattern += '|'
                abbreviationPattern += abbreviation.toUpperCase()
            }
            string = string.replace(
                new RegExp(
                    `(${abbreviationPattern})(${abbreviationPattern})`, 'g'
                ),
                `$1${delimiter}$2`
            )
        }
        string = string.replace(
            new RegExp(`([^${escapedDelimiter}])([A-Z][a-z]+)`, 'g'),
            `$1${delimiter}$2`
        )
        return string.replace(
            new RegExp('([a-z0-9])([A-Z])', 'g'), `$1${delimiter}$2`
        ).toLowerCase()
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Converts a string to its capitalize representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringCapitalize(string:string):string {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return string.charAt(0).toUpperCase() + string.substring(1)
    }
    /**
     * Compresses given style attribute value.
     * @param styleValue - Style value to compress.
     * @returns The compressed value.
     */
    static stringCompressStyleValue(styleValue:string):string {
        return styleValue
            .replace(/ *([:;]) */g, '$1')
            .replace(/ +/g, ' ')
            .replace(/^;+/, '')
            .replace(/;+$/, '')
            .trim()
    }
    /**
     * Decodes all html symbols in text nodes in given html string.
     * @param htmlString - HTML string to decode.
     * @returns Decoded html string.
     */
    static stringDecodeHTMLEntities(htmlString:string):null|string {
        if ('document' in $.global) {
            const textareaDomNode = $.global.document.createElement('textarea')
            textareaDomNode.innerHTML = htmlString
            return textareaDomNode.value
        }
        return null
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
    static stringDelimitedToCamelCase(
        string:string,
        delimiter:string = '-',
        abbreviations:Array<string>|null = null,
        preserveWrongFormattedAbbreviations:boolean = false,
        removeMultipleDelimiter:boolean = false
    ):string {
        let escapedDelimiter:string =
            Tools.stringGetRegularExpressionValidated(delimiter)
        if (!abbreviations)
            abbreviations = Tools.abbreviations
        let abbreviationPattern:string
        if (preserveWrongFormattedAbbreviations)
            abbreviationPattern = abbreviations.join('|')
        else {
            abbreviationPattern = ''
            for (const abbreviation of abbreviations) {
                if (abbreviationPattern)
                    abbreviationPattern += '|'
                abbreviationPattern +=
                    `${Tools.stringCapitalize(abbreviation)}|${abbreviation}`
            }
        }
        let stringStartsWithDelimiter:boolean = false
        if (string.startsWith(delimiter)) {
            string = string.substring(delimiter.length)
            stringStartsWithDelimiter = true
        }
        string = string.replace(
            new RegExp(
                `(${escapedDelimiter})(${abbreviationPattern})` +
                `(${escapedDelimiter}|$)`,
                'g'
            ),
            (
                fullMatch:string,
                before:string,
                abbreviation:string,
                after:string
            ):string => before + abbreviation.toUpperCase() + after
        )
        if (removeMultipleDelimiter)
            escapedDelimiter = `(?:${escapedDelimiter})+`
        string = string.replace(
            new RegExp(`${escapedDelimiter}([a-zA-Z0-9])`, 'g'),
            (fullMatch:string, firstLetter:string):string =>
                firstLetter.toUpperCase()
        )
        if (stringStartsWithDelimiter)
            string = delimiter + string
        return string
    }
    /**
     * Finds the string match of given query in given target text by applying
     * given normalisation function to target and query.
     * @param target - Target to search in.
     * @param query - Search string to search for.
     * @param normalizer - Function to use as normalisation for queries and
     * search targets.
     */
    static stringFindNormalizedMatchRange(
        target:any,
        query:any,
        normalizer:Function = (value:any):string => `${value}`.toLowerCase()
    ):Array<number>|null {
        query = normalizer(query)
        if (normalizer(target) && query)
            for (let index = 0; index < target.length; index += 1)
                if (normalizer(target.substring(index)).startsWith(query)) {
                    if (query.length === 1)
                        return [index, index + 1]
                    for (
                        let subIndex = target.length;
                        subIndex > index;
                        subIndex -= 1
                    )
                        if (!normalizer(target.substring(
                            index, subIndex
                        )).startsWith(query))
                            return [index, subIndex + 1]
                }
        return null
    }
    /**
     * Performs a string formation. Replaces every placeholder "{i}" with the
     * i'th argument.
     * @param string - The string to format.
     * @param additionalArguments - Additional arguments are interpreted as
     * replacements for string formating.
     * @returns The formatted string.
     */
    static stringFormat(
        string:string, ...additionalArguments:Array<any>
    ):string {
        additionalArguments.unshift(string)
        let index:number = 0
        for (const value of additionalArguments) {
            string = string.replace(
                new RegExp(`\\{${index}\\}`, 'gm'), `${value}`
            )
            index += 1
        }
        return string
    }
    /**
     * Calculates the edit (levenstein) distance between two given strings.
     * @param first - First string to compare.
     * @param second - Second string to compare.
     * @returns The distance as number.
     */
    static stringGetEditDistance(first:string, second:string):number {
        /*
            Create empty edit distance matrix for all possible modifications of
            substrings of "first" to substrings of "second".
        */
        const distanceMatrix:Array<Array<number>> =
            Array(second.length + 1).fill(null).map(():Array<number> =>
                Array(first.length + 1).fill(null)
            )
        /*
            Fill the first row of the matrix.
            If this is first row then we're transforming empty string to
            "first".
            In this case the number of transformations equals to size of
            "first" substring.
        */
        for (let index:number = 0; index <= first.length; index++)
            distanceMatrix[0][index] = index
        /*
            Fill the first column of the matrix.
            If this is first column then we're transforming empty string to
            "second".
            In this case the number of transformations equals to size of
            "second" substring.
        */
        for (let index:number = 0; index <= second.length; index++)
            distanceMatrix[index][0] = index
        for (
            let firstIndex:number = 1;
            firstIndex <= second.length;
            firstIndex++
        )
            for (
                let secondIndex = 1;
                secondIndex <= first.length;
                secondIndex++
            ) {
                const indicator:number =
                    first[secondIndex - 1] === second[firstIndex - 1] ? 0 : 1
                distanceMatrix[firstIndex][secondIndex] = Math.min(
                    // deletion
                    distanceMatrix[firstIndex][secondIndex - 1] + 1,
                    // insertion
                    distanceMatrix[firstIndex - 1][secondIndex] + 1,
                    // substitution
                    distanceMatrix[firstIndex - 1][secondIndex - 1] + indicator
                )
            }

        return distanceMatrix[second.length][first.length]
    }
    /**
     * Validates the current string for using in a regular expression pattern.
     * Special regular expression chars will be escaped.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringGetRegularExpressionValidated(string:string):string {
        return string.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1')
    }
    /**
     * Interprets given content string as date time.
     * @param value - Date time string to interpret.
     * @param interpretAsUTC - Identifies if given date should be interpret as
     * utc.
     * @returns Interpret date time object.
     */
    static stringInterpretDateTime(
        value:string, interpretAsUTC:boolean = true
    ):Date|null {
        // NOTE: All patterns can assume lower cased strings.
        // TODO handle am/pm
        if (!Tools._dateTimePatternCache.length) {
            // region pre-compile regular expressions
            // / region pattern
            const millisecondPattern:string =
                '(?<millisecond>(?:0{0,3}[0-9])|(?:0{0,2}[1-9]{2})|' +
                '(?:0?[1-9]{3})|(?:1[1-9]{3}))'
            const minuteAndSecondPattern:string =
                '(?:0?[0-9])|(?:[1-5][0-9])|(?:60)'
            const secondPattern:string = `(?<second>${minuteAndSecondPattern})`
            const minutePattern:string = `(?<minute>${minuteAndSecondPattern})`
            const hourPattern:string =
                '(?<hour>(?:0?[0-9])|(?:1[0-9])|(?:2[0-4]))'
            const dayPattern:string =
                '(?<day>(?:0?[1-9])|(?:[1-2][0-9])|(?:3[01]))'
            const monthPattern:string = '(?<month>(?:0?[1-9])|(?:1[0-2]))'
            const yearPattern:string = '(?<year>(?:0?[1-9])|(?:[1-9][0-9]+))'
            // / endregion
            const patternPresenceCache:Mapping<true> = {}
            for (const timeDelimiter of ['t', ' '])
                for (const timeComponentDelimiter of [':', '/', '-', ' '])
                    for (const timeFormat of [
                        hourPattern +
                        `${timeComponentDelimiter}+` +
                        minutePattern,

                        hourPattern +
                        `${timeComponentDelimiter}+` +
                        minutePattern +
                        `${timeComponentDelimiter}+` +
                        secondPattern,

                        hourPattern +
                        `${timeComponentDelimiter}+` +
                        minutePattern +
                        `${timeComponentDelimiter}+` +
                        secondPattern +
                        `${timeComponentDelimiter}+` +
                        millisecondPattern,

                        hourPattern
                    ])
                        for (const dateTimeFormat of [
                            {
                                delimiter: ['/', '-', ' '],
                                pattern: [
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    yearPattern,

                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    ' +' +
                                    yearPattern,

                                    yearPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern,

                                    yearPattern +
                                    ' +' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern,

                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    yearPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    ' +' +
                                    yearPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    yearPattern,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    ' +' +
                                    yearPattern,

                                    yearPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    yearPattern +
                                    ' +' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    yearPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    yearPattern +
                                    ' +' +
                                    monthPattern +
                                    '${delimiter}' +
                                    dayPattern
                                ]
                            },
                            {
                                delimiter: '\\.',
                                pattern: [
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    yearPattern,

                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    ' +' +
                                    yearPattern,

                                    yearPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern,

                                    yearPattern +
                                    ' +' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern,

                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    yearPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    ' +' +
                                    yearPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    '${delimiter}' +
                                    yearPattern,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    ' +' +
                                    yearPattern,

                                    yearPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    yearPattern +
                                    ' +' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern +
                                    `${timeDelimiter}+` +
                                    timeFormat,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    yearPattern +
                                    '${delimiter}' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern,

                                    timeFormat +
                                    `${timeDelimiter}+` +
                                    yearPattern +
                                    ' +' +
                                    dayPattern +
                                    '${delimiter}' +
                                    monthPattern
                                ]
                            },
                            {pattern: timeFormat}
                        ])
                            for (
                                const delimiter of ([] as Array<string>)
                                    .concat(
                                        Object.prototype.hasOwnProperty.call(
                                            dateTimeFormat, 'delimiter'
                                        ) ?
                                            (dateTimeFormat.delimiter as
                                                string
                                            ) :
                                            '-'
                                    )
                            )
                                for (let pattern of ([] as Array<string>)
                                    .concat(dateTimeFormat.pattern)
                                ) {
                                    pattern = (new Function(
                                        'delimiter', `return \`^${pattern}$\``
                                    ))(`${delimiter}+`)
                                    if (!Object.prototype.hasOwnProperty.call(
                                        patternPresenceCache, pattern
                                    )) {
                                        patternPresenceCache[pattern] = true
                                        Tools._dateTimePatternCache.push(
                                            new RegExp(pattern))
                                    }
                                }
            // endregion
        }
        // region pre-process
        value = value.toLowerCase()
        // Reduce each none alphanumeric symbol to a single one.
        value = value.replace(/([^0-9a-z])[^0-9a-z]+/g, '$1')
        let monthNumber:number = 1
        for (const monthVariation of [
            ['jan', 'january?', 'janvier'],
            ['feb', 'february?', 'février'],
            ['m(?:a|ae|ä)r', 'm(?:a|ae|ä)r(?:ch|s|z)'],
            ['ap[rv]', 'a[pv]ril'],
            ['ma[iy]'],
            ['ju[ein]', 'jui?n[ei]?'],
            ['jul', 'jul[iy]', 'juillet'],
            ['aug', 'august', 'août'],
            ['sep', 'septemb(?:er|re)'],
            ['o[ck]t', 'o[ck]tob(?:er|re)'],
            ['nov', 'novemb(?:er|re)'],
            ['de[cz]', 'd[eé][cz]emb(?:er|re)']
        ]) {
            let matched:boolean = false
            for (const name of monthVariation) {
                const pattern:RegExp = new RegExp(
                    `(^|[^a-z])${name}([^a-z]|$)`)
                if (pattern.test(value)) {
                    value = value.replace(pattern, `$1${monthNumber}$2`)
                    matched = true
                    break
                }
            }
            if (matched)
                break
            monthNumber += 1
        }
        value = Tools.stringSliceWeekday(value)
        const timezonePattern:RegExp = /(.+)\+(.+)$/
        const timezoneMatch:Array<any>|null = value.match(timezonePattern)
        if (timezoneMatch)
            value = value.replace(timezonePattern, '$1')
        for (const wordToSlice of ['', 'Uhr', `o'clock`])
            value = value.replace(wordToSlice, '')
        value = value.trim()
        // endregion
        for (const dateTimePattern of Tools._dateTimePatternCache) {
            let match:any = null
            try {
                match = value.match(dateTimePattern)
            } catch (error) {}
            if (match) {
                const get:Function = (
                    name:string, fallback:number = 0
                ):number =>
                    name in match.groups ?
                        parseInt(match.groups[name], 10) :
                        fallback
                const parameter:[
                    number, number, number, number, number, number, number
                ] = [
                    get('year', 1970), get('month', 1) - 1, get('day', 1),
                    get('hour'), get('minute'), get('second'),
                    get('millisecond')
                ]
                let result:Date|null = null
                if (timezoneMatch) {
                    const timeShift:Date|null = Tools.stringInterpretDateTime(
                        timezoneMatch[2], true)
                    if (timeShift)
                        result = new Date(
                            Date.UTC(...parameter) - timeShift.getTime())
                }
                if (!result)
                    if (interpretAsUTC)
                        result = new Date(Date.UTC(...parameter))
                    else
                        result = new Date(...parameter)
                if (isNaN(result.getDate()))
                    return null
                return result
            }
        }
        return null
    }
    /**
     * Converts a string to its lower case representation.
     * @param string - The string to format.
     * @returns The formatted string.
     */
    static stringLowerCase(string:string):string {
        return string.charAt(0).toLowerCase() + string.substring(1)
    }
    /**
     * Wraps given mark strings in given target with given marker.
     * @param target - String to search for marker.
     * @param words - String or array of strings to search in target for.
     * @param marker - HTML template string to mark.
     * @param normalizer - Pure normalisation function to use before searching
     * for matches.
     * @returns Processed result.
     */
    static stringMark(
        target:any,
        words:any,
        marker:string = '<span class="tools-mark">{1}</span>',
        normalizer:Function = (value:any):string => `${value}`.toLowerCase()
    ):any {
        if (typeof target === 'string' && words && words.length) {
            target = target.trim()
            if (!Array.isArray(words))
                words = [words]
            let index:number = 0
            for (const word of words) {
                words[index] = normalizer(word).trim()
                index += 1
            }
            let restTarget:string = target
            let offset:number = 0
            while (true) {
                let nearestRange:Array<number>|null = null
                let currentRange:Array<number>|null = null
                for (const word of words) {
                    currentRange = Tools.stringFindNormalizedMatchRange(
                        restTarget, word, normalizer)
                    if (
                        currentRange &&
                        (!nearestRange || currentRange[0] < nearestRange[0])
                    )
                        nearestRange = currentRange
                }
                if (nearestRange) {
                    target =
                        target.substring(0, offset + nearestRange[0]) +
                        Tools.stringFormat(
                            marker,
                            target.substring(
                                offset + nearestRange[0],
                                offset + nearestRange[1]
                            )
                        ) +
                        target.substring(offset + nearestRange[1])
                    offset += nearestRange[1] + (marker.length - '{1}'.length)
                    if (target.length <= offset)
                        break
                    restTarget = target.substring(offset)
                } else
                    break
            }
        }
        return target
    }
    /**
     * Implements the md5 hash algorithm.
     * @param value - Value to calculate md5 hash for.
     * @param onlyAscii - Set to true if given input has ascii characters only
     * to get more performance.
     * @returns Calculated md5 hash value.
     */
    static stringMD5(value:string, onlyAscii:boolean = false):string {
        const hexCharacters:Array<string> = '0123456789abcdef'.split('')
        // region sub helper
        /**
         * This function is much faster, so if possible we use it. Some IEs
         * are the only ones I know of that need the idiotic second function,
         * generated by an if clause in the end.
         * @param first - First operand to add.
         * @param second - Second operant to add.
         * @returns The sum of both given operands.
        */
        let unsignedModule2PowerOf32Addition = (
            first:number, second:number
        ):number => (first + second) & 0xFFFFFFFF
        // / region primary functions needed for the algorithm
        /*
         * Implements the basic operation for each round of the algorithm.
         */
        const cmn = (
            q:number, a:number, b:number, x:number, s:number, t:number
        ):number => {
            a = unsignedModule2PowerOf32Addition(
                unsignedModule2PowerOf32Addition(a, q),
                unsignedModule2PowerOf32Addition(x, t)
            )
            return unsignedModule2PowerOf32Addition(
                (a << s) | (a >>> (32 - s)), b)
        }
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
        const ff = (
            a:number,
            b:number,
            c:number,
            d:number,
            x:number,
            s:number,
            t:number
        ):number => cmn((b & c) | ((~b) & d), a, b, x, s, t)
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
        const gg = (
            a:number,
            b:number,
            c:number,
            d:number,
            x:number,
            s:number,
            t:number
        ):number => cmn((b & d) | (c & (~d)), a, b, x, s, t)
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
        const hh = (
            a:number,
            b:number,
            c:number,
            d:number,
            x:number,
            s:number,
            t:number
        ):number => cmn(b ^ c ^ d, a, b, x, s, t)
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
        const ii = (
            a:number,
            b:number,
            c:number,
            d:number,
            x:number,
            s:number,
            t:number
        ):number => cmn(c ^ (b | (~d)), a, b, x, s, t)
        /**
         * Performs all 16 needed steps.
         * @param state - Current state.
         * @param blocks - Blocks to cycle through.
         * @returns Returns given state.
         */
        const cycle = (state:Array<any>, blocks:Array<any>):Array<any> => {
            let a:any = state[0]
            let b:any = state[1]
            let c:any = state[2]
            let d:any = state[3]
            // region round 1
            a = ff(a, b, c, d, blocks[0], 7, -680876936)
            d = ff(d, a, b, c, blocks[1], 12, -389564586)
            c = ff(c, d, a, b, blocks[2], 17, 606105819)
            b = ff(b, c, d, a, blocks[3], 22, -1044525330)

            a = ff(a, b, c, d, blocks[4], 7, -176418897)
            d = ff(d, a, b, c, blocks[5], 12, 1200080426)
            c = ff(c, d, a, b, blocks[6], 17, -1473231341)
            b = ff(b, c, d, a, blocks[7], 22, -45705983)

            a = ff(a, b, c, d, blocks[8], 7, 1770035416)
            d = ff(d, a, b, c, blocks[9], 12, -1958414417)
            c = ff(c, d, a, b, blocks[10], 17, -42063)
            b = ff(b, c, d, a, blocks[11], 22, -1990404162)

            a = ff(a, b, c, d, blocks[12], 7, 1804603682)
            d = ff(d, a, b, c, blocks[13], 12, -40341101)
            c = ff(c, d, a, b, blocks[14], 17, -1502002290)
            b = ff(b, c, d, a, blocks[15], 22, 1236535329)
            // endregion
            // region round 2
            a = gg(a, b, c, d, blocks[1], 5, -165796510)
            d = gg(d, a, b, c, blocks[6], 9, -1069501632)
            c = gg(c, d, a, b, blocks[11], 14, 643717713)
            b = gg(b, c, d, a, blocks[0], 20, -373897302)

            a = gg(a, b, c, d, blocks[5], 5, -701558691)
            d = gg(d, a, b, c, blocks[10], 9, 38016083)
            c = gg(c, d, a, b, blocks[15], 14, -660478335)
            b = gg(b, c, d, a, blocks[4], 20, -405537848)

            a = gg(a, b, c, d, blocks[9], 5, 568446438)
            d = gg(d, a, b, c, blocks[14], 9, -1019803690)
            c = gg(c, d, a, b, blocks[3], 14, -187363961)
            b = gg(b, c, d, a, blocks[8], 20, 1163531501)

            a = gg(a, b, c, d, blocks[13], 5, -1444681467)
            d = gg(d, a, b, c, blocks[2], 9, -51403784)
            c = gg(c, d, a, b, blocks[7], 14, 1735328473)
            b = gg(b, c, d, a, blocks[12], 20, -1926607734)
            // endregion
            // region round 3
            a = hh(a, b, c, d, blocks[5], 4, -378558)
            d = hh(d, a, b, c, blocks[8], 11, -2022574463)
            c = hh(c, d, a, b, blocks[11], 16, 1839030562)
            b = hh(b, c, d, a, blocks[14], 23, -35309556)

            a = hh(a, b, c, d, blocks[1], 4, -1530992060)
            d = hh(d, a, b, c, blocks[4], 11, 1272893353)
            c = hh(c, d, a, b, blocks[7], 16, -155497632)
            b = hh(b, c, d, a, blocks[10], 23, -1094730640)

            a = hh(a, b, c, d, blocks[13], 4, 681279174)
            d = hh(d, a, b, c, blocks[0], 11, -358537222)
            c = hh(c, d, a, b, blocks[3], 16, -722521979)
            b = hh(b, c, d, a, blocks[6], 23, 76029189)

            a = hh(a, b, c, d, blocks[9], 4, -640364487)
            d = hh(d, a, b, c, blocks[12], 11, -421815835)
            c = hh(c, d, a, b, blocks[15], 16, 530742520)
            b = hh(b, c, d, a, blocks[2], 23, -995338651)
            // endregion
            // region round 4
            a = ii(a, b, c, d, blocks[0], 6, -198630844)
            d = ii(d, a, b, c, blocks[7], 10, 1126891415)
            c = ii(c, d, a, b, blocks[14], 15, -1416354905)
            b = ii(b, c, d, a, blocks[5], 21, -57434055)

            a = ii(a, b, c, d, blocks[12], 6, 1700485571)
            d = ii(d, a, b, c, blocks[3], 10, -1894986606)
            c = ii(c, d, a, b, blocks[10], 15, -1051523)
            b = ii(b, c, d, a, blocks[1], 21, -2054922799)

            a = ii(a, b, c, d, blocks[8], 6, 1873313359)
            d = ii(d, a, b, c, blocks[15], 10, -30611744)
            c = ii(c, d, a, b, blocks[6], 15, -1560198380)
            b = ii(b, c, d, a, blocks[13], 21, 1309151649)

            a = ii(a, b, c, d, blocks[4], 6, -145523070)
            d = ii(d, a, b, c, blocks[11], 10, -1120210379)
            c = ii(c, d, a, b, blocks[2], 15, 718787259)
            b = ii(b, c, d, a, blocks[9], 21, -343485551)
            // endregion
            state[0] = unsignedModule2PowerOf32Addition(a, state[0])
            state[1] = unsignedModule2PowerOf32Addition(b, state[1])
            state[2] = unsignedModule2PowerOf32Addition(c, state[2])
            state[3] = unsignedModule2PowerOf32Addition(d, state[3])
            return state
        }
        // / endregion
        /**
         * Converts given character to its corresponding hex code
         * representation.
         * @param character - Character to convert.
         * @returns Converted hex code string.
         */
        const convertCharactorToHexCode = (character:any):string => {
            let hexString:string = ''
            for (let round:number = 0; round < 4; round++)
                // NOTE: "+=" can not be used here since the minifier breaks.
                hexString = hexString + hexCharacters[(character >> (
                    round * 8 + 4
                )) & 0x0F] + hexCharacters[(character >> (round * 8)) & 0x0F]
            return hexString
        }
        /**
         * Converts given byte array to its corresponding hex code as string.
         * @param value - Array of characters to convert.
         * @returns Converted hex code.
         */
        const convertToHexCode = (value:Array<any>):string => {
            for (let index:number = 0; index < value.length; index++)
                value[index] = convertCharactorToHexCode(value[index])
            return value.join('')
        }
        /* eslint-disable jsdoc/require-description-complete-sentence */
        /**
         * There needs to be support for unicode here, unless we pretend that
         * we can redefine the md5 algorithm for multi-byte characters
         * (perhaps by adding every four 16-bit characters and shortening the
         * sum to 32 bits). Otherwise I suggest performing md5 as if every
         * character was two bytes e.g., 0040 0025 = @%--but then how will an
         * ordinary md5 sum be matched? There is no way to standardize text
         * to something like utf-8 before transformation; speed cost is
         * utterly prohibitive. The JavaScript standard itself needs to look
         * at this: it should start providing access to strings as preformed
         * utf-8 8-bit unsigned value arrays.
         * @param value - Value to process with each block.
         * @returns Converted byte array.
         */
        const handleBlock = (value:string):Array<any> => {
            const blocks:Array<any> = []
            for (
                let blockNumber:number = 0; blockNumber < 64; blockNumber += 4
            )
                blocks[blockNumber >> 2] =
                    value.charCodeAt(blockNumber) +
                    (value.charCodeAt(blockNumber + 1) << 8) +
                    (value.charCodeAt(blockNumber + 2) << 16) +
                    (value.charCodeAt(blockNumber + 3) << 24)
            return blocks
        }
        /* eslint-enable jsdoc/require-description-complete-sentence */
        // endregion
        /**
         * Triggers the main algorithm to calculate the md5 representation of
         * given value.
         * @param value - String to convert to its md5 representation.
         * @returns Array of blocks.
         */
        const main = (value:string):Array<any> => {
            const length:number = value.length
            const state:Array<any> = [
                1732584193, -271733879, -1732584194, 271733878
            ]
            let blockNumber:number
            for (
                blockNumber = 64;
                blockNumber <= value.length;
                blockNumber += 64
            )
                cycle(state, handleBlock(value.substring(
                    blockNumber - 64, blockNumber)))
            value = value.substring(blockNumber - 64)
            const tail:Array<number> = [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            for (blockNumber = 0; blockNumber < value.length; blockNumber++)
                tail[blockNumber >> 2] |= value.charCodeAt(blockNumber) << ((
                    blockNumber % 4
                ) << 3)
            tail[blockNumber >> 2] |= 0x80 << ((blockNumber % 4) << 3)
            if (blockNumber > 55) {
                cycle(state, tail)
                for (let index:number = 0; index < 16; index++)
                    tail[index] = 0
            }
            tail[14] = length * 8
            cycle(state, tail)
            return state
        }
        // region final call
        if (convertToHexCode(main(
            'hello'
        )) !== '5d41402abc4b2a76b9719d911017c592')
            /**
             * This function is much faster, so if possible we use it. Some IEs
             * are the only ones I know of that need the idiotic second
             * function, generated by an if clause in the end.
             * @private
             * @param first - First operand to add.
             * @param second - Second operant to add.
             * @returns The sum of both given operands.
            */
            unsignedModule2PowerOf32Addition = (
                first:number, second:number
            ):number => {
                const lsw = (first & 0xFFFF) + (second & 0xFFFF)
                const msw = (first >> 16) + (second >> 16) + (lsw >> 16)
                return (msw << 16) | (lsw & 0xFFFF)
            }
        return convertToHexCode(main((onlyAscii) ? value : unescape(
            encodeURIComponent(value))))
        // endregion
    }
    /**
     * Normalizes given phone number for automatic dialing or comparison.
     * @param value - Number to normalize.
     * @param dialable - Indicates whether the result should be dialed or
     * represented as lossless data.
     * @returns Normalized number.
     */
    static stringNormalizePhoneNumber(
        value:any, dialable:boolean=true
    ):string {
        if (typeof value === 'string' || typeof value === 'number') {
            value = `${value}`.trim()
            // Normalize country code prefix.
            value = value.replace(/^[^0-9]*\+/, '00')
            if (dialable)
                return value.replace(/[^0-9]+/g, '')
            const separatorPattern:string = '(?:[ /\\-]+)'
            // Remove unneeded area code zero in brackets.
            value = value.replace(
                new RegExp(
                    `^(.+?)${separatorPattern}?\\(0\\)${separatorPattern}?` +
                    '(.+)$'
                ),
                '$1-$2'
            )
            // Remove unneeded area code brackets.
            value = value.replace(
                new RegExp(
                    `^(.+?)${separatorPattern}?\\((.+)\\)` +
                    `${separatorPattern}?(.+)$`
                ),
                '$1-$2-$3'
            )
            /*
                Remove separators which doesn't mark semantics:
                1: Country code
                2: Area code
                3: Number
            */
            let compiledPattern:RegExp = new RegExp(
                `^(00[0-9]+)${separatorPattern}([0-9]+)${separatorPattern}` +
                '(.+)$'
            )
            if (compiledPattern.test(value))
                // Country code and area code matched.
                value = value.replace(compiledPattern, (
                    match:string,
                    countryCode:string,
                    areaCode:string,
                    number:string
                ):string =>
                    `${countryCode}-${areaCode}-` +
                    Tools.stringSliceAllExceptNumberAndLastSeperator(number)
                )
            else {
                /*
                    One prefix code matched:
                    1: Prefix code
                    2: Number
                */
                compiledPattern = /^([0-9 ]+)[\/-](.+)$/
                const replacer:Function = (
                    match:string, prefixCode:string, number:string
                ):string =>
                    `${prefixCode.replace(/ +/, '')}-` +
                    Tools.stringSliceAllExceptNumberAndLastSeperator(number)
                if (compiledPattern.test(value))
                    // Prefer "/" or "-" over " " as area code separator.
                    value = value.replace(compiledPattern, replacer)
                else
                    value = value.replace(
                        new RegExp(`^([0-9]+)${separatorPattern}(.+)$`),
                        replacer
                    )
            }
            return value.replace(/[^0-9-]+/g, '')
        }
        return ''
    }
    /**
     * Normalizes given zip code for automatic address processing.
     * @param value - Number to normalize.
     * @returns Normalized number.
     */
    static stringNormalizeZipCode(value:any):string {
        if (typeof value === 'string' || typeof value === 'number')
            return `${value}`.trim().replace(/[^0-9]+/g, '')
        return ''
    }
    /**
     * Converts given serialized, base64 encoded or file path given object into
     * a native javaScript one if possible.
     * @param serializedObject - Object as string.
     * @param scope - An optional scope which will be used to evaluate given
     * object in.
     * @param name - The name under given scope will be available.
     * @returns The parsed object if possible and null otherwise.
     */
    static stringParseEncodedObject(
        serializedObject:string, scope:object = {}, name:string = 'scope'
    ):null|PlainObject {
        if (
            serializedObject.endsWith('.json') &&
            Tools.isFileSync(serializedObject)
        )
            serializedObject = synchronousFileSystem.readFileSync(
                serializedObject, {encoding: 'utf-8'}
            )
        serializedObject = serializedObject.trim()
        if (!serializedObject.startsWith('{'))
            serializedObject = eval('Buffer')
                .from(serializedObject, 'base64')
                .toString('utf8')
        let result:any
        try {
            result = (new Function(name, `return ${serializedObject}`))(scope)
        } catch (error) {}
        if (typeof result === 'object')
            return result
        return null
    }
    /**
     * Represents given phone number. NOTE: Currently only support german phone
     * numbers.
     * @param value - Number to format.
     * @returns Formatted number.
     */
    static stringRepresentPhoneNumber(value:any):string {
        if (
            ['number', 'string'].includes(Tools.determineType(value)) &&
            value
        ) {
            // Represent country code and leading area code zero.
            value = `${value}`.replace(
                /^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3')
            // Add German country code if not exists.
            value = value.replace(/^0([1-9][0-9-]+)$/, '+49 (0) $1')
            // Separate area code from base number.
            value = value.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2')
            // Partition base number in one triple and tuples or tuples only.
            return value.replace(/^(.*?)([0-9]+)(-?[0-9]*)$/, (
                match:string, prefix:string, number:string, suffix:string
            ):string =>
                prefix +
                (
                    (number.length % 2 === 0) ?
                        number.replace(/([0-9]{2})/g, '$1 ') :
                        number.replace(
                            /^([0-9]{3})([0-9]+)$/,
                            (
                                match:string, triple:string, rest:string
                            ):string =>
                                `${triple} ` +
                                rest.replace(/([0-9]{2})/g, '$1 ').trim()
                        ) + suffix
                ).trim()
            ).trim()
        }
        return ''
    }
    /**
     * Slices all none numbers but preserves last separator.
     * @param value - String to process.
     * @returns - Sliced given value.
     */
    static stringSliceAllExceptNumberAndLastSeperator(value:string):string {
        /*
            1: baseNumber
            2: directDialingNumberSuffix
        */
        const compiledPattern:RegExp = /^(.*[0-9].*)-([0-9]+)$/
        if (compiledPattern.test(value))
            return value.replace(compiledPattern, (
                match:string,
                baseNumber:string,
                directDialingNumberSuffix:string
            ):string =>
                `${baseNumber.replace(/[^0-9]+/g, '')}-` +
                directDialingNumberSuffix
            )
        return value.replace(/[^0-9]+/g, '')
    }
    /**
     * Slice weekday from given date representation.
     * @param value - String to process.
     * @returns Sliced given string.
     */
    static stringSliceWeekday(value:string):string {
        const weekdayPattern:RegExp = /[a-z]{2}\.+ *([^ ].*)$/i
        const weekdayMatch:Array<any>|null = value.match(weekdayPattern)
        if (weekdayMatch)
            return value.replace(weekdayPattern, '$1')
        return value
    }
    /**
     * Converts a dom selector to a prefixed dom selector string.
     * @param selector - A dom node selector.
     * @returns Returns given selector prefixed.
     */
    stringNormalizeDomNodeSelector(selector:string):string {
        let domNodeSelectorPrefix:string = ''
        if (this._options.domNodeSelectorPrefix)
            domNodeSelectorPrefix = `${this._options.domNodeSelectorPrefix} `
        if (!(
            selector.startsWith(domNodeSelectorPrefix) ||
            selector.trim().startsWith('<')
        ))
            selector = domNodeSelectorPrefix + selector
        return selector.trim()
    }
    // / endregion
    // / region number
    /**
     * Determines corresponding utc timestamp for given date object.
     * @param value - Date to convert.
     * @param inMilliseconds - Indicates whether given number should be in
     * seconds (default) or milliseconds.
     * @returns Determined numerous value.
     */
    static numberGetUTCTimestamp(
        value:any, inMilliseconds:boolean = false
    ):number {
        const date:Date =
            [undefined, null].includes(value) ? new Date() : new Date(value)
        return (
            Date.UTC(
                date.getUTCFullYear(),
                date.getUTCMonth(),
                date.getUTCDate(),
                date.getUTCHours(),
                date.getUTCMinutes(),
                date.getUTCSeconds(),
                date.getUTCMilliseconds()
            ) /
            (inMilliseconds ? 1 : 1000)
        )
    }
    /**
     * Checks if given object is java scripts native "Number.NaN" object.
     * @param object - Object to Check.
     * @returns Returns whether given value is not a number or not.
     */
    static numberIsNotANumber(object:any):boolean {
        return Tools.determineType(object) === 'number' && isNaN(object)
    }
    /**
     * Rounds a given number accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     * @returns Returns the rounded number.
     */
    static numberRound(number:number, digits:number = 0):number {
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
    // / endregion
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
     * @param expectedIntermediateStatusCodes - A list of expected but
     * unwanted response codes. If detecting them waiting will continue until
     * an expected (positiv) code occurs or timeout is reached.
     * @returns A promise which will be resolved if a request to given url has
     * finished and resulting status code matches given expected status code.
     * Otherwise returned promise will be rejected.
     */
    static async checkReachability(
        url:string,
        wait:boolean = false,
        givenExpectedStatusCodes:Array<number>|number = 200,
        timeoutInSeconds:number = 10,
        pollIntervallInSeconds:number = 0.1,
        options:FetchOptions = {},
        givenExpectedIntermediateStatusCodes:Array<number>|number = []
    ):Promise<FetchResponse> {
        const expectedStatusCodes:Array<number> =
            ([] as Array<number>).concat(givenExpectedStatusCodes)
        const expectedIntermediateStatusCodes:Array<number> =
            ([] as Array<number>).concat(givenExpectedIntermediateStatusCodes)
        const isStatusCodeExpected:Function = (
            response:any, expectedStatusCodes:Array<number>
        ):boolean => Boolean(
            response !== null &&
            typeof response === 'object' &&
            'status' in response &&
            expectedStatusCodes.includes(response.status)
        )
        const checkAndThrow:Function = (response:any):any => {
            if (!isStatusCodeExpected(response, expectedStatusCodes))
                throw new Error(
                    `Given status code ${response.status} differs from ` +
                    `${expectedStatusCodes.join(', ')}.`
                )
            return response
        }
        if (wait)
            return new Promise(async (
                resolve:Function, reject:Function
            ):Promise<void> => {
                let timedOut:boolean = false
                const timer:TimeoutPromise = Tools.timeout(
                    timeoutInSeconds * 1000)
                const retryErrorHandler = <ErrorType=Error>(
                    error:ErrorType
                ):ErrorType => {
                    if (!timedOut) {
                        /* eslint-disable no-use-before-define */
                        currentlyRunningTimer = Tools.timeout(
                            pollIntervallInSeconds * 1000, wrapper)
                        /* eslint-enable no-use-before-define */
                        /*
                            NOTE: A timer rejection is expected. Avoid
                            throwing errors about unhandled promise
                            rejections.
                        */
                        currentlyRunningTimer.catch(Tools.noop)
                    }
                    return error
                }
                const wrapper = async ():Promise<any> => {
                    let response:FetchResponse
                    try {
                        response = await fetch(url, options)
                    } catch (error) {
                        return retryErrorHandler(error)
                    }
                    try {
                        resolve(checkAndThrow(response))
                        timer.clear()
                    } catch (error) {
                        if (isStatusCodeExpected(
                            response, expectedIntermediateStatusCodes
                        ))
                            return retryErrorHandler(error)
                        reject(error)
                        timer.clear()
                    }
                    return response
                }
                let currentlyRunningTimer = Tools.timeout(wrapper)
                try {
                    await timer
                } catch (error) {}
                timedOut = true
                currentlyRunningTimer.clear()
                reject(new Error(
                    `Timeout of ${timeoutInSeconds} seconds reached.`
                ))
            })
        return checkAndThrow(await fetch(url, options))
    }
    /**
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
     * couldn't finished. Otherwise returned promise will be rejected. If
     * "wait" is set to "true" we will resolve to another promise still
     * resolving when final timeout is reached or the endpoint is unreachable
     * (after some tries).
     */
    static async checkUnreachability(
        url:string,
        wait:boolean = false,
        timeoutInSeconds:number = 10,
        pollIntervallInSeconds:number = 0.1,
        unexpectedStatusCodes:null|number|Array<number> = null,
        options:FetchOptions = {}
    ):Promise<Error|null|Promise<Error|null>> {
        const check = (response:FetchResponse):Error|null => {
            if (unexpectedStatusCodes) {
                unexpectedStatusCodes =
                    ([] as Array<number>).concat(unexpectedStatusCodes)
                if (
                    response !== null &&
                    typeof response === 'object' &&
                    'status' in response &&
                    (unexpectedStatusCodes as Array<number>).includes(
                        response.status
                    )
                )
                    throw new Error(
                        `Given url "${url}" is reachable and responses with ` +
                        `unexpected status code "${response.status}".`
                    )
                return new Error(
                    'Given status code is not "' +
                    `${(unexpectedStatusCodes as Array<number>).join(', ')}".`
                )
            }
            return null
        }
        if (wait)
            return new Promise(async (
                resolve:Function, reject:Function
            ):Promise<void> => {
                let timedOut:boolean = false
                const wrapper:Function = async (
                ):Promise<Error|FetchResponse|null> => {
                    try {
                        const response:FetchResponse =
                            await fetch(url, options)
                        if (timedOut)
                            return response
                        const result:Error|null = check(response)
                        if (result) {
                            timer.clear()
                            resolve(result)
                            return result
                        }
                        /* eslint-disable no-use-before-define */
                        currentlyRunningTimer = Tools.timeout(
                            pollIntervallInSeconds * 1000, wrapper
                        )
                        /* eslint-enable no-use-before-define */
                        /*
                            NOTE: A timer rejection is expected. Avoid throwing
                            errors about unhandled promise rejections.
                        */
                        currentlyRunningTimer.catch(Tools.noop)
                    } catch (error) {
                        /* eslint-disable no-use-before-define */
                        timer.clear()
                        /* eslint-enable no-use-before-define */
                        resolve(error)
                        return error
                    }
                    return null
                }
                let currentlyRunningTimer = Tools.timeout(wrapper)
                const timer:TimeoutPromise = Tools.timeout(
                    timeoutInSeconds * 1000
                )
                try {
                    await timer
                } catch (error) {}
                timedOut = true
                currentlyRunningTimer.clear()
                reject(new Error(
                    `Timeout of ${timeoutInSeconds} seconds reached.`
                ))
            })
        try {
            const result:Error|null = check(await fetch(url, options))
            if (result)
                return result
        } catch (error) {
            return error
        }
        throw new Error(`Given url "${url}" is reachable.`)
    }
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
     * @returns Returns the given target as extended dom node.
     */
    static sendToIFrame(
        target:$DomNode|HTMLIFrameElement|string,
        url:string,
        data:Mapping<any>,
        requestType:string = 'post',
        removeAfterLoad:boolean = false
    ):$DomNode {
        const $targetDomNode:$DomNode<HTMLIFrameElement> =
            (typeof target === 'string') ?
                $<HTMLIFrameElement>(`iframe[name"${target}"]`) :
                $(target as HTMLIFrameElement)
        const $formDomNode:$DomNode<HTMLFormElement> =
            $<HTMLFormElement>('<form>').attr({
                action: url,
                method: requestType,
                target: $targetDomNode.attr('name')
            })
        for (const name in data)
            if (Object.prototype.hasOwnProperty.call(data, name))
                $formDomNode.append($('<input>').attr({
                    name, type: 'hidden', value: data[name]
                }))
        /*
            NOTE: The given target form have to be injected into document
            object model to successfully submit.
        */
        if (removeAfterLoad)
            $targetDomNode.on('load', ():$DomNode<HTMLIFrameElement> =>
                $targetDomNode.remove()
            )
        $formDomNode.insertAfter($targetDomNode)
        $formDomNode[0].submit()
        $formDomNode.remove()
        return $targetDomNode
    }
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
    sendToExternalURL(
        url:string,
        data:Mapping<any>,
        requestType:string = 'post',
        removeAfterLoad:boolean = true
    ):$DomNode<HTMLIFrameElement> {
        const $iFrameDomNode:$DomNode<HTMLIFrameElement> =
            $<HTMLIFrameElement>('<iframe>')
                .attr(
                    'name',
                    this._self._name.charAt(0).toLowerCase() +
                    this._self._name.substring(1) +
                    (new Date()).getTime()
                )
                .hide()
        if (this.$domNode)
            this.$domNode.append($iFrameDomNode)
        this._self.sendToIFrame(
            $iFrameDomNode, url, data, requestType, removeAfterLoad)
        return $iFrameDomNode
    }
    // / endregion
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
     */
    static async copyDirectoryRecursive(
        sourcePath:string,
        targetPath:string,
        callback:Function = Tools.noop,
        readOptions:PlainObject = {encoding: null, flag: 'r'},
        writeOptions:PlainObject = {encoding: 'utf8', flag: 'w', mode: 0o666}
    ):Promise<string> {
        // NOTE: Check if folder needs to be created or integrated.
        sourcePath = path.resolve(sourcePath)
        if (await Tools.isDirectory(targetPath))
            targetPath = path.resolve(targetPath, path.basename(sourcePath))
        try {
            await fileSystem.mkdir(targetPath)
        } catch (error) {
            if (!('code' in error && error.code === 'EEXIST'))
                throw error
        }
        for (
            const currentSourceFile of
            await Tools.walkDirectoryRecursively(sourcePath, callback)
        ) {
            const currentTargetPath:string = path.join(
                targetPath, currentSourceFile.path.substring(sourcePath.length)
            )
            if (
                currentSourceFile.stats &&
                currentSourceFile.stats.isDirectory()
            )
                try {
                    await fileSystem.mkdir(currentTargetPath)
                } catch (error) {
                    if (!('code' in error && error.code === 'EEXIST'))
                        throw error
                }
            else
                await Tools.copyFile(
                    currentSourceFile.path,
                    currentTargetPath,
                    readOptions,
                    writeOptions
                )
        }
        return targetPath
    }
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
     * @returns Determined target directory path.
     */
    static copyDirectoryRecursiveSync(
        sourcePath:string,
        targetPath:string,
        callback:Function = Tools.noop,
        readOptions:PlainObject = {encoding: null, flag: 'r'},
        writeOptions:PlainObject = {encoding: 'utf8', flag: 'w', mode: 0o666}
    ):string {
        // NOTE: Check if folder needs to be created or integrated.
        sourcePath = path.resolve(sourcePath)
        if (Tools.isDirectorySync(targetPath))
            targetPath = path.resolve(targetPath, path.basename(sourcePath))
        try {
            synchronousFileSystem.mkdirSync(targetPath)
        } catch (error) {
            if (!('code' in error && error.code === 'EEXIST'))
                throw error
        }
        for (
            const currentSourceFile of
            Tools.walkDirectoryRecursivelySync(sourcePath, callback)
        ) {
            const currentTargetPath:string = path.join(
                targetPath, currentSourceFile.path.substring(sourcePath.length)
            )
            if (
                currentSourceFile.stats &&
                currentSourceFile.stats.isDirectory()
            )
                try {
                    synchronousFileSystem.mkdirSync(currentTargetPath)
                } catch (error) {
                    if (!('code' in error && error.code === 'EEXIST'))
                        throw error
                }
            else
                Tools.copyFileSync(
                    currentSourceFile.path,
                    currentTargetPath,
                    readOptions,
                    writeOptions
                )
        }
        return targetPath
    }
    /**
     * Copies given source file via path to given target directory location
     * with same target name as source file has or copy to given complete
     * target file path.
     * @param sourcePath - Path to file to copy.
     * @param targetPath - Target directory or complete file location to copy
     * to.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Determined target file path.
     */
    static async copyFile(
        sourcePath:string,
        targetPath:string,
        readOptions:PlainObject = {encoding: null, flag: 'r'},
        writeOptions:PlainObject = {encoding: 'utf8', flag: 'w', mode: 0o666}
    ):Promise<string> {
        /*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */
        if (await Tools.isDirectory(targetPath))
            targetPath = path.resolve(targetPath, path.basename(sourcePath))
        const data:object|string = await fileSystem.readFile(
            sourcePath, readOptions
        )
        fileSystem.writeFile(targetPath, data, writeOptions)
        return targetPath
    }
    /**
     * Copies given source file via path to given target directory location
     * with same target name as source file has or copy to given complete
     * target file path.
     * @param sourcePath - Path to file to copy.
     * @param targetPath - Target directory or complete file location to copy
     * to.
     * @param readOptions - Options to use for reading source file.
     * @param writeOptions - Options to use for writing to target file.
     * @returns Determined target file path.
     */
    static copyFileSync(
        sourcePath:string,
        targetPath:string,
        readOptions:PlainObject = {encoding: null, flag: 'r'},
        writeOptions:PlainObject = {encoding: 'utf8', flag: 'w', mode: 0o666}
    ):string {
        /*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */
        if (Tools.isDirectorySync(targetPath))
            targetPath = path.resolve(targetPath, path.basename(sourcePath))
        synchronousFileSystem.writeFileSync(
            targetPath,
            synchronousFileSystem.readFileSync(sourcePath, readOptions),
            writeOptions
        )
        return targetPath
    }
    /**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     * @returns A promise holding a boolean which indicates directory
     * existents.
     */
    static async isDirectory(filePath:string):Promise<boolean> {
        try {
            return (await fileSystem.stat(filePath)).isDirectory()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(error.code)
            )
                return false
            throw error
        }
    }
    /**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     * @returns A boolean which indicates directory existents.
     */
    static isDirectorySync(filePath:string):boolean {
        try {
            return synchronousFileSystem.statSync(filePath).isDirectory()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(error.code)
            )
                return false
            throw error
        }
    }
    /**
     * Checks if given path points to a valid file.
     * @param filePath - Path to directory.
     * @returns A promise holding a boolean which indicates directory
     * existents.
     */
    static async isFile(filePath:string):Promise<boolean> {
        try {
            return (await fileSystem.stat(filePath)).isFile()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(error.code)
            )
                return false
            throw error
        }
    }
    /**
     * Checks if given path points to a valid file.
     * @param filePath - Path to file.
     * @returns A boolean which indicates file existents.
     */
    static isFileSync(filePath:string):boolean {
        try {
            return synchronousFileSystem.statSync(filePath).isFile()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(error.code)
            )
                return false
            throw error
        }
    }
    /**
     * Iterates through given directory structure recursively and calls given
     * callback for each found file. Callback gets file path and corresponding
     * stat object as argument.
     * @param directoryPath - Path to directory structure to traverse.
     * @param callback - Function to invoke for each traversed file and
     * potentially manipulate further traversing.
     * @param options - Options to use for nested "readdir" calls.
     * @returns A promise holding the determined files.
     */
    static async walkDirectoryRecursively(
        directoryPath:string,
        callback:Function = Tools.noop,
        options:PlainObject|string = 'utf8'
    ):Promise<Array<File>> {
        const files:Array<File> = []
        // TODO use (everywhere) direct with "withFileTypes" option.
        for (const fileName of await fileSystem.readdir(
            directoryPath, options
        )) {
            const filePath:string = path.resolve(directoryPath, fileName)
            const file:File = {
                directoryPath,
                error: null,
                name: fileName,
                path: filePath,
                stats: null
            }
            try {
                file.stats = await fileSystem.stat(filePath)
            } catch (error) {
                file.error = error
            }
            files.push(file)
        }
        if (callback)
            /*
                NOTE: Directories have to be iterated first to potentially
                avoid deeper iterations.
            */
            files.sort((firstFile:File, secondFile:File):number => {
                if (firstFile.error) {
                    if (secondFile.error)
                        return 0
                    return 1
                }
                if (firstFile.stats && firstFile.stats.isDirectory()) {
                    if (
                        secondFile.error ||
                        secondFile.stats &&
                        secondFile.stats.isDirectory()
                    )
                        return 0
                    return -1
                }
                if (secondFile.error)
                    return -1
                if (secondFile.stats && secondFile.stats.isDirectory())
                    return 1
                return 0
            })
        let finalFiles:Array<File> = []
        for (const file of files) {
            finalFiles.push(file)
            const result:any = callback(file)
            if (result === null)
                break
            if (
                result !== false &&
                file.stats &&
                file.stats.isDirectory()
            )
                finalFiles = finalFiles.concat(
                    Tools.walkDirectoryRecursivelySync(file.path, callback))
        }
        return finalFiles
    }
    /**
     * Iterates through given directory structure recursively and calls given
     * callback for each found file. Callback gets file path and corresponding
     * stats object as argument.
     * @param directoryPath - Path to directory structure to traverse.
     * @param callback - Function to invoke for each traversed file.
     * @param options - Options to use for nested "readdir" calls.
     * @returns Determined list if all files.
     */
    static walkDirectoryRecursivelySync(
        directoryPath:string,
        callback:Function = Tools.noop,
        options:PlainObject|string = 'utf8'
    ):Array<File> {
        const files:Array<File> = []
        for (const fileName of synchronousFileSystem.readdirSync(
            directoryPath, options
        )) {
            const filePath:string = path.resolve(directoryPath, fileName)
            const file:File = {
                directoryPath,
                error: null,
                name: fileName,
                path: filePath,
                stats: null
            }
            try {
                file.stats = synchronousFileSystem.statSync(filePath)
            } catch (error) {
                file.error = error
            }
            files.push(file)
        }
        if (callback)
            /*
                NOTE: Directories have to be iterated first to potentially
                avoid deeper iterations.
            */
            files.sort((firstFile:File, secondFile:File):number => {
                if (firstFile.error) {
                    if (secondFile.error)
                        return 0
                    return 1
                }
                if (firstFile.stats && firstFile.stats.isDirectory()) {
                    if (
                        secondFile.error ||
                        secondFile.stats &&
                        secondFile.stats.isDirectory()
                    )
                        return 0
                    return -1
                }
                if (secondFile.error)
                    return -1
                if (secondFile.stats && secondFile.stats.isDirectory())
                    return 1
                return 0
            })
        let finalFiles:Array<File> = []
        for (const file of files) {
            finalFiles.push(file)
            const result:any = callback(file)
            if (result === null)
                break
            if (
                result !== false &&
                file.stats &&
                file.stats.isDirectory()
            )
                finalFiles = finalFiles.concat(
                    Tools.walkDirectoryRecursivelySync(file.path, callback))
        }
        return finalFiles
    }
    // / endregion
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
     */
    static getProcessCloseHandler(
        resolve:ProcessCloseCallback,
        reject:ProcessErrorCallback,
        reason:any = null,
        callback:Function = Tools.noop
    ):ProcessHandler {
        let finished:boolean = false
        return (returnCode:any, ...parameter:Array<any>):void => {
            if (finished)
                finished = true
            else {
                finished = true
                if (typeof returnCode !== 'number' || returnCode === 0) {
                    callback()
                    resolve({reason, parameter})
                } else {
                    const error:ProcessError = new Error(
                        `Task exited with error code ${returnCode}`
                    ) as ProcessError
                    error.returnCode = returnCode
                    error.parameter = parameter
                    reject(error)
                }
            }
        }
    }
    /**
     * Forwards given child process communication channels to corresponding
     * current process communication channels.
     * @param childProcess - Child process meta data.
     * @returns Given child process meta data.
     */
    static handleChildProcess(childProcess:ChildProcess):ChildProcess {
        if (childProcess.stdout)
            childProcess.stdout.pipe(process.stdout)
        if (childProcess.stderr)
            childProcess.stderr.pipe(process.stderr)
        childProcess.on('close', (returnCode:number):void => {
            if (returnCode !== 0)
                console.error(`Task exited with error code ${returnCode}`)
        })
        return childProcess
    }
    // / endregion
    // endregion
    // region protected methods
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Helper method for attach/remove event handler methods.
     * @param parameter - Arguments object given to methods like "on()" or
     * "off()".
     * @param removeEvent - Indicates if handler should be attached or removed.
     * @param eventFunctionName - Name of function to wrap.
     * @returns Returns $'s wrapped dom node.
     */
    _bindEventHelper<TElement = HTMLElement>(
        parameter:Array<any>,
        removeEvent:boolean = false,
        eventFunctionName?:string
    ):$DomNode<TElement> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (!eventFunctionName)
            eventFunctionName = removeEvent ? 'off' : 'on'
        const $domNode:$DomNode<TElement> = $(parameter[0])
        if (
            this._self.determineType(parameter[1]) === 'object' && !removeEvent
        ) {
            for (const eventType in parameter[1])
                if (Object.prototype.hasOwnProperty.call(
                    parameter[1], eventType
                ))
                    (
                        this[eventFunctionName as keyof Tools<TElement>] as
                            Function
                    )($domNode, eventType, parameter[1][eventType])
            return $domNode
        }
        parameter = this._self.arrayMake(parameter).slice(1)
        if (parameter.length === 0)
            parameter.push('')
        if (!parameter[0].includes('.'))
            parameter[0] += `.${this._self._name}`
        return (
            $domNode[eventFunctionName as keyof $DomNode] as Function
        ).apply($domNode, parameter)
    }
    // endregion
}
export class BoundTools<TElement extends HTMLElement = HTMLElement> extends
    Tools<TElement> {
    $domNode:$DomNode<TElement>
    readonly self:typeof BoundTools = BoundTools
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
     * @returns Nothing.
     */
    constructor($domNode:$DomNode<TElement>, ...parameter:Array<any>) {
        super($domNode, ...parameter)
        this.$domNode = $domNode
    }
}
export default Tools
// endregion
// region handle $ extending
export const augment$ = (value:$Function):void => {
    $ = value
    if (!('global' in $))
        $.global = globalContext
    if (!('context' in $) && 'document' in $.global && $.global.document)
        $.context = $.global.document
    if ('fn' in $)
        $.fn.Tools = function<TElement = HTMLElement>(
            this:$DomNode<TElement>, ...parameter:Array<any>
        ):any {
            return (new Tools<TElement>()).controller(
                Tools, parameter, this as $DomNode<TElement>
            )
        } as ToolsFunction<HTMLElement>
    $.Tools = ((...parameter:Array<any>):any =>
        (new Tools()).controller(Tools, parameter)
    ) as ToolsFunction
    $.Tools.class = Tools
    if ('fn' in $) {
        // region prop fix for comments and text nodes
        const nativePropFunction = $.fn.prop
        /**
         * Scopes native prop implementation ignores properties for text nodes,
         * comments and attribute nodes.
         * @param key - Name of property to retrieve from current dom node.
         * @param additionalParameter - Additional parameter will be forwarded
         * to native prop function also.
         * @returns Returns value if used as getter or current dom node if used
         * as setter.
         */
        $.fn.prop = function(
            this:Array<Element>, key:any, ...additionalParameter:Array<any>
        ):any {
            if (
                additionalParameter.length < 2 &&
                this.length &&
                ['#text', '#comment'].includes(
                    this[0].nodeName.toLowerCase()
                ) &&
                key in this[0]
            ) {
                if (additionalParameter.length === 0)
                    return this[0][key as keyof Element]
                if (additionalParameter.length === 1) {
                    /*
                        NOTE: "textContent" represents a writable element
                        property.
                    */
                    this[0][key as 'textContent'] = additionalParameter[0]
                    return this
                }
            }
            return nativePropFunction.call(
                this, key, ...(additionalParameter as [])
            )
        }
        // endregion
    }
}
augment$($)
// / region fix script loading errors with canceling requests
$.readyException = (error:Error|string):void => {
    if (!(typeof error === 'string' && error === 'canceled'))
        throw error
}
// / endregion
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

// @flow
// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module clientnode */
'use strict'
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
import type {ChildProcess} from 'child_process'
let fileSystem:Object = {}
try {
    fileSystem = eval('require')('fs')
} catch (error) {}
let path:Object = {}
try {
    path = eval('require')('path')
} catch (error) {}
// NOTE: Only needed for debugging this file.
try {
    module.require('source-map-support/register')
} catch (error) {}
// endregion
// region types
export type PlainObject = {[key:string]:any}
export type ProcedureFunction = () => void|Promise<void>
export type File = {
    directoryPath:string;
    name:string;
    path:string;
    stat:Object;
}
export type GetterFunction = (keyOrValue:any, key:?any, target:?any) => any
export type SetterFunction = (key:any, value:any, target:?any) => any
export type Position = {
    top?:number;
    left?:number;
    right?:number;
    bottom?:number;
}
export type RelativePosition = 'in'|'above'|'left'|'below'|'right'
export type Options = {
    domNodeSelectorPrefix:string;
    [key:string]:any;
}
export type LockCallbackFunction = (description:string) => ?Promise<any>
export type $DomNode = {
    [key:number|string]:DomNode;
    addClass(className:string):$DomNode;
    addBack():$DomNode;
    after(domNode:any):$DomNode;
    append(domNode:any):$DomNode;
    attr(attributeName:string|{[key:string]:string}, value:any):any;
    data(key:string, value:any):any;
    each():$DomNode;
    find(filter:any):$DomNode;
    height():number;
    is(selector:string):boolean;
    remove():$DomNode;
    removeAttr(attributeName:string):$DomNode;
    removeClass(className:string|Array<string>):$DomNode;
    submit():$DomNode;
    width():number;
    Tools(functionName:string, ...additionalArguments:Array<any>):any;
}
export type $Deferred<Type> = {
    always:() => $Deferred<Type>;
    resolve:() => $Deferred<Type>;
    done:() => $Deferred<Type>;
    fail:() => $Deferred<Type>;
    isRejected:() => $Deferred<Type>;
    isResolved:() => $Deferred<Type>;
    notify:() => $Deferred<Type>;
    notifyWith:() => $Deferred<Type>;
    progress:() => $Deferred<Type>;
    promise:() => $Deferred<Type>;
    reject:() => $Deferred<Type>;
    rejectWith:() => $Deferred<Type>;
    resolveWith:() => $Deferred<Type>;
    state:() => $Deferred<Type>;
    then:() => $Deferred<Type>;
}
// / region browser
export type DomNode = any
export type Location = {
    hash:string;
    search:string;
    pathname:string;
    port:string;
    hostname:string;
    host:string;
    protocol:string;
    origin:string;
    href:string;
    username:string;
    password:string;
    assign:Function;
    reload:Function;
    replace:Function;
    toString:() => string
}
export type Storage = {
    getItem(key:string):any;
    setItem(key:string, value:any):void;
    removeItem(key:string, value:any):void;
}
export type Window = {
    addEventListener:(type:string, callback:Function) => void;
    document:Object;
    location:Location;
    localStorage:Storage;
    sessionStorage:Storage;
    close:() => void;
}
// / endregion
// endregion
// region determine context
export const globalContext:Object = (():Object => {
    if (typeof window === 'undefined') {
        if (typeof global === 'undefined')
            return (typeof module === 'undefined') ? {} : module
        if ('window' in global)
            return global.window
        return global
    }
    return window
})()
/* eslint-disable no-use-before-define */
export const $:any = (():any => {
/* eslint-enable no-use-before-define */
    let $:any
    if ('$' in globalContext && globalContext.$ !== null)
        $ = globalContext.$
    else {
        if (!('$' in globalContext) && 'document' in globalContext)
            try {
                return require('jquery')
            } catch (error) {}
        const selector:any = (
            'document' in globalContext &&
            'querySelectorAll' in globalContext.document
        ) ?
            globalContext.document.querySelectorAll.bind(
                globalContext.document
            ) : ():null => null
        $ = (parameter:any, ...additionalArguments:Array<any>):any => {
            if (typeof parameter === 'string') {
                const $domNodes:Array<any> = selector(
                    parameter, ...additionalArguments)
                if ('fn' in $)
                    for (const key:string in $.fn)
                        if ($.fn.hasOwnProperty(key))
                            // IgnoreTypeCheck
                            $domNodes[key] = $.fn[key].bind($domNodes)
                return $domNodes
            }
            /* eslint-disable no-use-before-define */
            if (Tools.isFunction(parameter) && 'document' in globalContext)
            /* eslint-enable no-use-before-define */
                globalContext.document.addEventListener(
                    'DOMContentLoaded', parameter)
            return parameter
        }
        $.fn = {}
    }
    return $
})()
if (!('global' in $))
    $.global = globalContext
if (!('context' in $) && 'document' in $.global)
    $.context = $.global.document
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
    constructor(numberOfResources:number = 2) {
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
     * Releases a resource and runs a waiting resolver if there exists
     * some.
     * @returns Nothing.
     */
    release():void {
        if (this.queue.length === 0)
            this.numberOfFreeResources += 1
        else
            this.queue.pop()(this.numberOfFreeResources)
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
 *
 * @property static:_name - Not minifyable class name.
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
export class Tools {
    // region static properties
    static abbreviations:Array<string> = [
        'html', 'id', 'url', 'us', 'de', 'api', 'href']
    static animationEndEventNames:string = 'animationend webkitAnimationEnd ' +
        'oAnimationEnd MSAnimationEnd'
    static classToTypeMapping:{[key:string]:string} = {
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
    static closeEventNames:Array<string> = [
        'exit', 'close', 'uncaughtException', 'SIGINT', 'SIGTERM', 'SIGQUIT']
    static consoleMethodNames:Array<string> = [
        'assert',
        'clear',
        'count',
        'debug',
        'dir',
        'dirxml',
        'error',
        'exception',
        'group',
        'groupCollapsed',
        'groupEnd',
        'info',
        'log',
        'markTimeline',
        'profile',
        'profileEnd',
        'table',
        'time',
        'timeEnd',
        'timeStamp',
        'trace',
        'warn'
    ]
    static keyCode:{[key:string]:number} = {
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
    static maximalSupportedInternetExplorerVersion:number = (():number => {
        if (!('document' in $.global))
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
            if ($.global.navigator.appVersion.includes('MSIE 10'))
                return 10
            else if ($.global.navigator.userAgent.includes(
                'Trident'
            ) && $.global.navigator.userAgent.includes('rv:11'))
                return 11
        return version
    })()
    static noop:Function = ('noop' in $) ? $.noop : ():void => {}
    static plainObjectPrototypes:Array<any> = [Object.prototype]
    static specialRegexSequences:Array<string> = [
        '-', '[', ']', '(', ')', '^', '$', '*', '+', '.', '{', '}']
    static transitionEndEventNames:string = 'transitionend ' +
        'webkitTransitionEnd oTransitionEnd MSTransitionEnd'

    static _javaScriptDependentContentHandled:boolean = false
    static _name:string = 'tools'
    // endregion
    // region dynamic properties
    $domNode:$DomNode
    locks:{[key:string]:Array<LockCallbackFunction>};
    _options:Options
    _defaultOptions:PlainObject
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
    constructor(
        $domNode:?$DomNode = null,
        options:Object = {},
        defaultOptions:PlainObject = {
            domNode: {
                hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
                showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
            },
            domNodeSelectorPrefix: 'body',
            logging: false
        },
        locks:{[key:string]:Array<LockCallbackFunction>} = {}
    ):void {
        if ($domNode)
            this.$domNode = $domNode
        this._options = options
        this._defaultOptions = defaultOptions
        this.locks = locks
        // Avoid errors in browsers that lack a console.
        if (!('console' in $.global))
            $.global.console = {}
        for (const methodName:string of this.constructor.consoleMethodNames)
            if (!(methodName in $.global.console))
                $.global.console[methodName] = this.constructor.noop
        if (
            !this.constructor._javaScriptDependentContentHandled &&
            'document' in $.global && 'filter' in $ && 'hide' in $ &&
            'show' in $
        ) {
            this.constructor._javaScriptDependentContentHandled = true
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.hideJavaScriptEnabled
            ).filter(function():boolean {
                return !$(this).data('javaScriptDependentContentHide')
            }).data('javaScriptDependentContentHide', true).hide()
            $(
                `${this._defaultOptions.domNodeSelectorPrefix} ` +
                this._defaultOptions.domNode.showJavaScriptEnabled
            ).filter(function():boolean {
                return !$(this).data('javaScriptDependentContentShow')
            }).data('javaScriptDependentContentShow', true).show()
        }
    }
    /**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */
    destructor():Tools {
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
    initialize(options:PlainObject = {}):Tools {
        /*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */
        this._options = this.constructor.extendObject(
            true, {}, this._defaultOptions, this._options, options)
        /*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */
        this._options.domNodeSelectorPrefix = this.constructor.stringFormat(
            this._options.domNodeSelectorPrefix,
            this.constructor.stringCamelCaseToDelimited(
                this.constructor._name))
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
        object:Object, parameter:Array<any>, $domNode:?$DomNode = null
    ):any {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (typeof object === 'function') {
            object = new object($domNode)
            if (!(object instanceof Tools))
                object = this.constructor.extendObject(
                    true, new Tools(), object)
        }
        const name:string = object.constructor._name || object.constructor.name
        parameter = this.constructor.arrayMake(parameter)
        if ($domNode && 'data' in $domNode && !$domNode.data(name))
            // Attach extended object to the associated dom node.
            $domNode.data(name)
        if (parameter[0] in object) {
            if (Tools.isFunction(object[parameter[0]]))
                return object[parameter[0]](...parameter.slice(1))
            return object[parameter[0]]
        } else if (parameter.length === 0 || typeof parameter[0] === 'object')
            /*
                If an options object or no method name is given the initializer
                will be called.
            */
            return object.initialize(...parameter)
        throw new Error(
            `Method "${parameter[0]}" does not exist on $-extended dom node ` +
            `"${name}".`)
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
     * @returns Returns a promise which will be resolved after releasing lock.
     */
    acquireLock(
        description:string, callbackFunction:LockCallbackFunction = Tools.noop,
        autoRelease:boolean = false
    ):Promise<any> {
        return new Promise((resolve:Function):void => {
            const wrappedCallbackFunction:LockCallbackFunction = (
                description:string
            ):?Promise<any> => {
                const result:any = callbackFunction(description)
                const finish:Function = (value:any):void => {
                    if (autoRelease)
                        this.releaseLock(description)
                    resolve(value)
                }
                try {
                    return result.then(finish)
                } catch (error) {}
                finish(description)
            }
            if (this.locks.hasOwnProperty(description))
                this.locks[description].push(wrappedCallbackFunction)
            else {
                this.locks[description] = []
                wrappedCallbackFunction(description)
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
        if (this.locks.hasOwnProperty(description))
            if (this.locks[description].length)
                result = await this.locks[description].shift()(description)
            else
                delete this.locks[description]
        return result
    }
    /**
     * Generate a semaphore object with given number of resources.
     * @param numberOfResources - Number of allowed concurrent resource uses.
     * @returns The requested semaphore instance.
     */
    static getSemaphore(numberOfResources:number = 2):Semaphore {
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
    static isNumeric(object:any):boolean {
        const type:string = Tools.determineType(object)
        /*
            NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
            misinterprets leading-number strings, particularly hex literals
            ("0x...") subtraction forces infinities to NaN.
        */
        return ['number', 'string'].includes(type) && !isNaN(
            object - parseFloat(object))
    }
    /**
     * Determine whether the argument is a window.
     * @param object - Object to check for.
     * @returns Boolean value indicating the result.
     */
    static isWindow(object:any):boolean {
        return (
            ![undefined, null].includes(object) &&
            typeof object === 'object' && 'window' in object &&
            object === object.window)
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
            length = Boolean(
                object
            ) && 'length' in object && object.length
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
        for (const currentPattern:RegExp|string of pattern)
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
    static isPlainObject(object:mixed):boolean {
        return (
            typeof object === 'object' && object !== null &&
            Tools.plainObjectPrototypes.includes(Object.getPrototypeOf(object))
        )
    }
    /**
     * Checks whether given object is a function.
     * @param object - Object to check.
     * @returns Value "true" if given object is a function and "false"
     * otherwise.
     */
    static isFunction(object:mixed):boolean {
        return Boolean(object) && {}.toString.call(
            object
        ) === '[object Function]'
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
        return (event:Object, ...additionalParameter:Array<any>):any => {
            let relatedTarget:DomNode = event.toElement
            if ('relatedTarget' in event)
                relatedTarget = event.relatedTarget
            while (relatedTarget && relatedTarget.tagName !== 'BODY') {
                if (relatedTarget === this)
                    return
                relatedTarget = relatedTarget.parentNode
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
        object:any, force:boolean = false, avoidAnnotation:boolean = false,
        level:string = 'info', ...additionalArguments:Array<any>
    ):Tools {
        if (this._options.logging || force || ['error', 'critical'].includes(
            level
        )) {
            let message:any
            if (avoidAnnotation)
                message = object
            else if (typeof object === 'string') {
                additionalArguments.unshift(object)
                message = `${this.constructor._name} (${level}): ` +
                    this.constructor.stringFormat(...additionalArguments)
            } else if (this.constructor.isNumeric(
                object
            ) || typeof object === 'boolean')
                message = `${this.constructor._name} (${level}): ` +
                    object.toString()
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log(`'--------------------------------------------'`)
            }
            if (message)
                if (!('console' in $.global && level in $.global.console) || (
                    $.global.console[level] === this.constructor.noop
                )) {
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
    info(object:any, ...additionalArguments:Array<any>):Tools {
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
    debug(object:any, ...additionalArguments:Array<any>):Tools {
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
    error(object:any, ...additionalArguments:Array<any>):Tools {
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
    critical(object:any, ...additionalArguments:Array<any>):Tools {
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
    warn(object:any, ...additionalArguments:Array<any>):Tools {
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
    static show(object:any, level:number = 3, currentLevel:number = 0):string {
        let output:string = ''
        if (Tools.determineType(object) === 'object') {
            for (const key:string in object)
                if (object.hasOwnProperty(key)) {
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
    // / region dom node
    /**
     * Normalizes class name order of current dom node.
     * @returns Current instance.
     */
    get normalizedClassNames():Tools {
        // IgnoreTypeCheck
        this.$domNode.find('*').addBack().each(function():void {
            const $thisDomNode:$DomNode = $(this)
            if ($thisDomNode.attr('class'))
                $thisDomNode.attr('class', ($thisDomNode.attr('class').split(
                    ' '
                ).sort() || []).join(' '))
            else if ($thisDomNode.is('[class]'))
                $thisDomNode.removeAttr('class')
        })
        return this
    }
    /**
     * Normalizes style attributes order of current dom node.
     * @returns Returns current instance.
     */
    get normalizedStyles():Tools {
        const self:Tools = this
        // IgnoreTypeCheck
        this.$domNode.find('*').addBack().each(function():void {
            const $thisDomNode:$DomNode = $(this)
            let serializedStyles:?string = $thisDomNode.attr('style')
            if (serializedStyles)
                $thisDomNode.attr(
                    'style', self.constructor.stringCompressStyleValue(
                        self.constructor.stringCompressStyleValue(
                            serializedStyles
                        ).split(';').sort() || []).map((style:string):string =>
                            style.trim()).join(';'))
            else if ($thisDomNode.is('[style]'))
                $thisDomNode.removeAttr('style')
        })
        return this
    }
    /**
     * Retrieves a mapping of computed style attributes to their corresponding
     * values.
     * @returns The computed style mapping.
     */
    get style():PlainObject {
        const result:PlainObject = {}
        if ('window' in $.global && $.global.window.getComputedStyle) {
            const styleProperties:?any = $.global.window.getComputedStyle(
                this.$domNode[0], null)
            if (styleProperties) {
                if ('length' in styleProperties)
                    for (
                        let index:number = 0; index < styleProperties.length;
                        index += 1
                    )
                        result[this.constructor.stringDelimitedToCamelCase(
                            styleProperties[index]
                        )] = styleProperties.getPropertyValue(
                            styleProperties[index])
                else
                    for (const propertyName:string in styleProperties)
                        if (styleProperties.hasOwnProperty(propertyName))
                            result[this.constructor.stringDelimitedToCamelCase(
                                propertyName
                            )] = propertyName in styleProperties &&
                            styleProperties[
                                propertyName
                            ] || styleProperties.getPropertyValue(propertyName)
                return result
            }
        }
        let styleProperties:?PlainObject = this.$domNode[0].currentStyle
        if (styleProperties) {
            for (const propertyName:string in styleProperties)
                if (styleProperties.hasOwnProperty(propertyName))
                    result[propertyName] = styleProperties[propertyName]
            return result
        }
        styleProperties = this.$domNode[0].style
        if (styleProperties)
            for (const propertyName:string in styleProperties)
                if (typeof styleProperties[propertyName] !== 'function')
                    result[propertyName] = styleProperties[propertyName]
        return result
    }
    /**
     * Get text content of current element without it children's text contents.
     * @returns The text string.
     */
    get text():string {
        return this.$domNode.clone().children().remove().end().text()
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
        first:any, second:any, forceHTMLString:boolean = false
    ):boolean {
        if (first === second)
            return true
        if (first && second) {
            const detemermineHTMLPattern:RegExp =
                /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
            const inputs:{first:any;second:any} = {first, second}
            const $domNodes:{first:$DomNode;second:$DomNode} = {
                first: $('<dummy>'), second: $('<dummy>')
            }
            /*
                NOTE: Assume that strings that start "<" and end with ">" are
                markup and skip the more expensive regular expression check.
            */
            for (const type:string of ['first', 'second'])
                if (typeof inputs[type] === 'string' && (forceHTMLString || (
                    inputs[type].startsWith('<') &&
                    inputs[type].endsWith('>') && inputs[type].length >= 3 ||
                    detemermineHTMLPattern.test(inputs[type])
                )))
                    $domNodes[type] = $(`<div>${inputs[type]}</div>`)
                else
                    try {
                        let $selectedDomNode:$DomNode = $(inputs[type])
                        if ($selectedDomNode.length)
                            $domNodes[type] = $('<div>').append(
                                $selectedDomNode.clone())
                        else
                            return false
                    } catch (error) {
                        return false
                    }
            if (
                $domNodes.first.length &&
                $domNodes.first.length === $domNodes.second.length
            ) {
                $domNodes.first = $domNodes.first.Tools(
                    'normalizedClassNames'
                ).$domNode.Tools('normalizedStyles').$domNode
                $domNodes.second = $domNodes.second.Tools(
                    'normalizedClassNames'
                ).$domNode.Tools('normalizedStyles').$domNode
                let index:number = 0
                return !$domNodes.first.some((domNode:DomNode):boolean =>
                    !domNode.isEqualNode($domNodes.second[index]))
            }
        }
        return false
    }
    /**
     * Determines where current dom node is relative to current view port
     * position.
     * @param delta - Allows deltas for "top", "left", "bottom" and "right" for
     * determining positions.
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */
    getPositionRelativeToViewport(delta:Position = {}):RelativePosition {
        delta = this.constructor.extendObject(
            {top: 0, left: 0, bottom: 0, right: 0}, delta)
        if (
            'window' in $.global && this.$domNode && this.$domNode.length &&
            this.$domNode[0]
        ) {
            const $window:$DomNode = $($.global.window)
            const rectangle:Position = this.$domNode[0].getBoundingClientRect()
            if ((rectangle.top + delta.top) < 0)
                return 'above'
            if ((rectangle.left + delta.left) < 0)
                return 'left'
            if ($window.height() < (rectangle.bottom + delta.bottom))
                return 'below'
            if ($window.width() < (rectangle.right + delta.right))
                return 'right'
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
    removeDirective(directiveName:string):$DomNode {
        const delimitedName:string =
            this.constructor.stringCamelCaseToDelimited(directiveName)
        return this.$domNode.removeClass(delimitedName).removeAttr(
            delimitedName
        ).removeAttr(`data-${delimitedName}`).removeAttr(
            `x-${delimitedName}`
        ).removeAttr(delimitedName.replace('-', ':')).removeAttr(
            delimitedName.replace('-', '_'))
    }
    /**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     * @returns Returns the corresponding name.
     */
    static getNormalizedDirectiveName(directiveName:string):string {
        for (const delimiter:string of ['-', ':', '_']) {
            let prefixFound:boolean = false
            for (const prefix:string of [`data${delimiter}`, `x${delimiter}`])
                if (directiveName.startsWith(prefix)) {
                    directiveName = directiveName.substring(prefix.length)
                    prefixFound = true
                    break
                }
            if (prefixFound)
                break
        }
        for (const delimiter:string of ['-', ':', '_'])
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
    getDirectiveValue(directiveName:string):?string {
        const delimitedName:string =
            this.constructor.stringCamelCaseToDelimited(directiveName)
        for (const attributeName:string of [
            delimitedName, `data-${delimitedName}`, `x-${delimitedName}`,
            delimitedName.replace('-', '\\:')
        ]) {
            const value:string = this.$domNode.attr(attributeName)
            if (value !== undefined)
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
            return domNodeSelector.substring(
                this._options.domNodeSelectorPrefix.length
            ).trim()
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
    static getDomNodeName(domNodeSelector:string):?string {
        const match:?Array<string> = domNodeSelector.match(
            new RegExp('^<?([a-zA-Z]+).*>?.*'))
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
        domNodeSelectors:PlainObject, wrapperDomNode:DomNode|$DomNode
    ):{[key:string]:$DomNode} {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        const domNodes:{[key:string]:$DomNode} = {}
        if (domNodeSelectors)
            if (wrapperDomNode) {
                const $wrapperDomNode:$DomNode = $(wrapperDomNode)
                for (const name:string in domNodeSelectors)
                    if (domNodeSelectors.hasOwnProperty(name))
                        domNodes[name] = $wrapperDomNode.find(
                            domNodeSelectors[name])
            } else
                for (const name:string in domNodeSelectors)
                    if (domNodeSelectors.hasOwnProperty(name)) {
                        const match:?Array<string> =
                            domNodeSelectors[name].match(', *')
                        if (match)
                            domNodeSelectors[name] += domNodeSelectors[
                                name
                            ].split(match[0]).map((
                                selectorPart:string
                            ):string =>
                                ', ' + this.stringNormalizeDomNodeSelector(
                                    selectorPart)
                            ).join('')
                        domNodes[name] = $(this.stringNormalizeDomNodeSelector(
                            domNodeSelectors[name]))
                    }
        if (this._options.domNodeSelectorPrefix)
            domNodes.parent = $(this._options.domNodeSelectorPrefix)
        if ('window' in $.global)
            domNodes.window = $($.global.window)
        if ('document' in $.global)
            domNodes.document = $($.global.document)
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
    static isolateScope(
        scope:Object, prefixesToIgnore:Array<string> = []
    ):Object {
        for (const name:string in scope)
            if (!(prefixesToIgnore.includes(name.charAt(0)) || [
                'this', 'constructor'
            ].includes(name) || scope.hasOwnProperty(name)))
                /*
                    NOTE: Delete ("delete $scope[name]") doesn't destroy the
                    automatic lookup to parent scope.
                */
                scope[name] = undefined
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
        prefix:string = 'callback', suffix:string = '',
        scope:Object = $.global, initialUniqueName:string = ''
    ):string {
        if (initialUniqueName.length && !(initialUniqueName in scope))
            return initialUniqueName
        let uniqueName:string = prefix + suffix
        while (true) {
            uniqueName = prefix + parseInt(Math.random() * Math.pow(
                10, 10
            ), 10) + suffix
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
        const functionCode:string = ((
            typeof callable === 'string'
        ) ? callable : callable.toString()).replace(
            // Strip comments.
            /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
        if (functionCode.startsWith('class'))
            return Tools.getParameterNames('function ' + functionCode.replace(
                /.*(constructor\([^)]+\))/m, '$1'))
        // Try classic function declaration.
        let parameter:?Array<string> = functionCode.match(
            /^function\s*[^\(]*\(\s*([^\)]*)\)/m)
        if (parameter === null)
            // Try arrow function declaration.
            parameter = functionCode.match(/^[^\(]*\(\s*([^\)]*)\) *=>.*/m)
        if (parameter === null)
            // Try one argument and without brackets arrow function declaration.
            parameter = functionCode.match(/([^= ]+) *=>.*/m)
        const names:Array<string> = []
        if (parameter && parameter.length > 1 && parameter[1].trim().length) {
            for (const name:string of parameter[1].split(','))
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
    static identity(value:any):any {
        return value
    }
    /**
     * Inverted filter helper to inverse each given filter.
     * @param filter - A function that filters an array.
     * @returns The inverted filter.
     */
    static invertArrayFilter(filter:Function):Function {
        return function(data:any, ...additionalParameter:Array<any>):any {
            if (data) {
                const filteredData:any = filter.call(
                    this, data, ...additionalParameter)
                let result:Array<any> = []
                /* eslint-disable curly */
                if (filteredData.length) {
                    for (const date:any of data)
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
    static timeout(...parameter:Array<any>):Promise<boolean> {
        let callback:Function = Tools.noop
        let delayInMilliseconds:number = 0
        let throwOnTimeoutClear:boolean = false
        for (const value:any of parameter)
            if (typeof value === 'number' && !Number.isNaN(value))
                delayInMilliseconds = value
            else if (typeof value === 'boolean')
                throwOnTimeoutClear = value
            else if (Tools.isFunction(value))
                callback = value
        let rejectCallback:Function
        let resolveCallback:Function
        const result:Promise<boolean> = new Promise((
            resolve:Function, reject:Function
        ):void => {
            rejectCallback = reject
            resolveCallback = resolve
        })
        const wrappedCallback:Function = ():void => {
            callback.call(result, ...parameter)
            resolveCallback(false)
        }
        const maximumTimeoutDelayInMilliseconds:number = 2147483647
        if (delayInMilliseconds <= maximumTimeoutDelayInMilliseconds)
            // IgnoreTypeCheck
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
                    // IgnoreTypeCheck
                    result.timeoutID = setTimeout(
                        delay, maximumTimeoutDelayInMilliseconds)
                } else
                    // IgnoreTypeCheck
                    result.timeoutID = setTimeout(
                        wrappedCallback, finalTimeoutDuration)
            }
            delay()
        }
        // IgnoreTypeCheck
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
        eventFunction:Function, thresholdInMilliseconds:number = 600,
        ...additionalArguments:Array<any>
    ):Function {
        let lock:boolean = false
        let waitingCallArguments:?Array<any> = null
        let timer:?Promise<boolean> = null
        return (...parameter:Array<any>):?Promise<boolean> => {
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
        eventName:string, callOnlyOptionsMethod:boolean = false,
        scope:any = this, ...additionalArguments:Array<any>
    ):any {
        const eventHandlerName:string =
            `on${this.constructor.stringCapitalize(eventName)}`
        if (!callOnlyOptionsMethod)
            if (eventHandlerName in scope)
                scope[eventHandlerName](...additionalArguments)
            else if (`_${eventHandlerName}` in scope)
                scope[`_${eventHandlerName}`](...additionalArguments)
        if (
            scope._options && eventHandlerName in scope._options &&
            scope._options[eventHandlerName] !== this.constructor.noop
        )
            return scope._options[eventHandlerName].call(
                this, ...additionalArguments)
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
    on(...parameter:Array<any>):$DomNode {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper(parameter, false)
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @param parameter - Parameter to forward.
     * @returns Returns $'s grabbed dom node.
     */
    off(...parameter:Array<any>):$DomNode {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper(parameter, true, 'off')
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
        object:any, getterWrapper:?GetterFunction = null,
        setterWrapper:?SetterFunction = null, methodNames:PlainObject = {},
        deep:boolean = true, typesToExtend:Array<mixed> = [Object]
    ):any {
        if (deep && typeof object === 'object')
            if (Array.isArray(object)) {
                let index:number = 0
                for (const value:any of object) {
                    object[index] = Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    index += 1
                }
            } else if (Tools.determineType(object) === 'map')
                for (const [key:any, value:any] of object)
                    object.set(key, Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
            else if (Tools.determineType(object) === 'set') {
                const cache:Array<any> = []
                for (const value:any of object) {
                    object.delete(value)
                    cache.push(Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
                }
                for (const value:any of cache)
                    object.add(value)
            } else if (object !== null) {
                for (const key:string in object)
                    if (object.hasOwnProperty(key))
                        object[key] = Tools.addDynamicGetterAndSetter(
                            object[key], getterWrapper, setterWrapper,
                            methodNames, deep)
            }
        if (getterWrapper || setterWrapper)
            for (const type:mixed of typesToExtend)
                if (
                    typeof object === 'object' && object instanceof type &&
                    object !== null
                ) {
                    const defaultHandler = Tools.getProxyHandler(
                        object, methodNames)
                    const handler:Object = Tools.getProxyHandler(
                        object, methodNames)
                    if (getterWrapper)
                        handler.get = (proxy:Proxy<any>, name:string):any => {
                            if (name === '__target__')
                                return object
                            if (name === '__revoke__')
                                return ():any => {
                                    revoke()
                                    return object
                                }
                            if (typeof object[name] === 'function')
                                return object[name]
                            // IgnoreTypeCheck
                            return getterWrapper(
                                defaultHandler.get(proxy, name), name, object)
                        }
                    if (setterWrapper)
                        handler.set = (
                            proxy:Proxy<any>, name:string, value:any
                        // IgnoreTypeCheck
                        ):any => defaultHandler.set(proxy, name, setterWrapper(
                            name, value, object))
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
        object:Object, determineCicularReferenceValue:((
            key:string, value:any, seenObjects:Array<any>
        ) => any) = ():string => '__circularReference__',
        numberOfSpaces:number = 0
    ):string {
        const seenObjects:Array<any> = []
        return JSON.stringify(object, (key:string, value:any):any => {
            if (typeof value === 'object' && value !== null) {
                if (seenObjects.includes(value))
                    return determineCicularReferenceValue(
                        key, value, seenObjects)
                seenObjects.push(value)
                return value
            }
            return value
        }, numberOfSpaces)
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
            if (Tools.determineType(object) === 'map') {
                const newObject:PlainObject = {}
                for (let [key:any, value:any] of object) {
                    if (deep)
                        value = Tools.convertMapToPlainObject(value, deep)
                    newObject[`${key}`] = value
                }
                return newObject
            }
            /* TODO minify error ->*/
            if (deep)
                if (Tools.isPlainObject(object)) {
                    for (const key:string in object)
                        if (object.hasOwnProperty(key))
                            object[key] = Tools.convertMapToPlainObject(
                                object[key], deep)
                } else if (Array.isArray(object)) {
                    let index:number = 0
                    for (const value:any of object) {
                        object[index] = Tools.convertMapToPlainObject(
                            value, deep)
                        index += 1
                    }
                } else if (Tools.determineType(object) === 'set') {
                    const cache:Array<any> = []
                    for (const value:any of object) {
                        object.delete(value)
                        cache.push(Tools.convertMapToPlainObject(value, deep))
                    }
                    for (const value:any of cache)
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
                const newObject:Map<any, any> = new Map()
                for (const key:string in object)
                    if (object.hasOwnProperty(key)) {
                        if (deep)
                            object[key] = Tools.convertPlainObjectToMap(
                                object[key], deep)
                        newObject.set(key, object[key])
                    }
                return newObject
            }
            /* TODO minify error ->*/
            if (deep)
                if (Array.isArray(object)) {
                    let index:number = 0
                    for (const value:any of object) {
                        object[index] = Tools.convertPlainObjectToMap(
                            value, deep)
                        index += 1
                    }
                } else if (Tools.determineType(object) === 'map')
                    for (const [key:any, value:any] of object)
                        object.set(key, Tools.convertPlainObjectToMap(
                            value, deep))
                else if (Tools.determineType(object) === 'set') {
                    const cache:Array<any> = []
                    for (const value:any of object) {
                        object.delete(value)
                        cache.push(Tools.convertPlainObjectToMap(value, deep))
                    }
                    for (const value:any of cache)
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
    static convertSubstringInPlainObject(
        object:PlainObject, pattern:RegExp, replacement:string
    ):PlainObject {
        for (const key:string in object)
            if (object.hasOwnProperty(key))
                if (Tools.isPlainObject(object[key]))
                    object[key] = Tools.convertSubstringInPlainObject(
                        object[key], pattern, replacement)
                else if (typeof object[key] === 'string')
                    object[key] = object[key].replace(pattern, replacement)
        return object
    }
    /**
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
     */
    static copyLimitedRecursively(
        source:any, recursionLimit:number = -1, cyclic:boolean = false,
        destination:any = null, stackSource:Array<any> = [],
        stackDestination:Array<any> = [], recursionLevel:number = 0
    ):any {
        if (typeof source === 'object')
            if (destination) {
                if (source === destination)
                    throw new Error(
                        `Can't copy because source and destination are ` +
                        `identical.`)
                if (recursionLimit !== -1 && recursionLimit < recursionLevel)
                    return null
                if (!cyclic && ![undefined, null].includes(source)) {
                    const index:number = stackSource.indexOf(source)
                    if (index !== -1)
                        return stackDestination[index]
                    stackSource.push(source)
                    stackDestination.push(destination)
                }
                const copyValue:Function = (value:any):any => {
                    const result:any = Tools.copyLimitedRecursively(
                        value, recursionLimit, cyclic, null, stackSource,
                        stackDestination, recursionLevel + 1)
                    if (!cyclic && ![undefined, null].includes(
                        value
                    ) && typeof value === 'object') {
                        stackSource.push(value)
                        stackDestination.push(result)
                    }
                    return result
                }
            // TODO -> minify error
                if (Array.isArray(source))
                    for (const item:any of source)
                        destination.push(copyValue(item))
                else if (Tools.determineType(source) === 'map')
                    for (const [key:any, value:any] of source)
                        destination.set(key, copyValue(value))
                else if (Tools.determineType(source) === 'set')
                    for (const value:any of source)
                        destination.add(copyValue(value))
                else if (source !== null)
                    for (const key:string in source)
                        if (source.hasOwnProperty(key))
                            destination[key] = copyValue(source[key])
            } else if (source) {
                if (Array.isArray(source))
                    return Tools.copyLimitedRecursively(
                        source, recursionLimit, cyclic, [], stackSource,
                        stackDestination, recursionLevel)
                if (Tools.determineType(source) === 'map')
                    return Tools.copyLimitedRecursively(
                        source, recursionLimit, cyclic, new Map(), stackSource,
                        stackDestination, recursionLevel)
                if (Tools.determineType(source) === 'set')
                    return Tools.copyLimitedRecursively(
                        source, recursionLimit, cyclic, new Set(), stackSource,
                        stackDestination, recursionLevel)
                if (Tools.determineType(source) === 'date')
                    return new Date(source.getTime())
                if (Tools.determineType(source) === 'regexp') {
                    destination = new RegExp(
                        source.source, source.toString().match(/[^\/]*$/)[0])
                    destination.lastIndex = source.lastIndex
                    return destination
                }
                return Tools.copyLimitedRecursively(
                    source, recursionLimit, cyclic, {}, stackSource,
                    stackDestination, recursionLevel)
            }
        return destination || source
    }

    // / endregion
    // endregion
    // region protected methods
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
    _bindEventHelper(
        parameter:Array<any>, removeEvent:boolean = false,
        eventFunctionName:string = 'on'
    ):$DomNode {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        const $domNode:$DomNode = $(parameter[0])
        if (this.constructor.determineType(
            parameter[1]
        ) === 'object' && !removeEvent) {
            for (const eventType:string in parameter[1])
                if (parameter[1].hasOwnProperty(eventType))
                    // IgnoreTypeCheck
                    this[eventFunctionName](
                        $domNode, eventType, parameter[1][eventType])
            return $domNode
        }
        parameter = this.constructor.arrayMake(parameter).slice(1)
        if (parameter.length === 0)
            parameter.push('')
        if (!parameter[0].includes('.'))
            parameter[0] += `.${this.constructor._name}`
        if (removeEvent)
            return $domNode[eventFunctionName](...parameter)
        return $domNode[eventFunctionName](...parameter)
    }
    // endregion
}
export default Tools
// endregion
// region handle $ extending
if ('fn' in $)
    $.fn.Tools = function(...parameter:Array<any>):any {
        return (new Tools()).controller(Tools, parameter, this)
    }
$.Tools = (...parameter:Array<any>):any => (new Tools()).controller(
    Tools, parameter)
$.Tools.class = Tools
if ('fn' in $) {
    // region prop fix for comments and text nodes
    const nativePropFunction = $.fn.prop
    /**
     * JQuery's native prop implementation ignores properties for text nodes,
     * comments and attribute nodes.
     * @param key - Name of property to retrieve from current dom node.
     * @param additionalParameter - Additional parameter will be forwarded to
     * native prop function also.
     * @returns Returns value if used as getter or current dom node if used as
     * setter.
     */
    $.fn.prop = function(key:string, ...additionalParameter:Array<any>):any {
        if (additionalParameter.length < 2 && this.length && [
            '#text', '#comment'
        ].includes(this[0].nodeName) && key in this[0]) {
            if (additionalParameter.length === 0)
                return this[0][key]
            if (additionalParameter.length === 1) {
                this[0][key] = additionalParameter[0]
                return this
            }
        }
        return nativePropFunction.call(this, key, ...additionalParameter)
    }
    // endregion
    // region fix script loading errors with canceling requests after dom ready
    $.readyException = (error:Error):void => {
        if (!(typeof error === 'string' && error === 'canceled'))
            throw error
    }
    // endregion
}
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

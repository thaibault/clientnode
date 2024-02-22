// #!/usr/bin/env babel-node
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
    AnyFunction,
    ArrayTransformer,
    BaseSelector,
    BoundToolsFunction,
    CookieOptions,
    CheckReachabilityOptions,
    CompareOptions,
    CompilationResult,
    Encoding,
    EvaluationResult,
    File,
    FileTraversionResult,
    FirstParameter,
    GetterFunction,
    ImportFunction,
    LockCallbackFunction,
    Mapping,
    ObjectMaskConfiguration,
    Options,
    Page,
    PageType,
    PaginateOptions,
    ParametersExceptFirst,
    PlainObject,
    Position,
    Primitive,
    ProcedureFunction,
    ProcessCloseCallback,
    ProcessError,
    ProcessErrorCallback,
    ProcessHandler,
    ProxyHandler,
    ProxyType,
    QueryParameters,
    RecursiveEvaluateable,
    RecursivePartial,
    RelativePosition,
    SecondParameter,
    Selector,
    SetterFunction,
    StringMarkOptions,
    TemplateFunction,
    TimeoutPromise,
    ToolsFunction,
    UnknownFunction,
    ValueOf,
    $DomNodes,
    $Global,
    $T,
    $TStatic
} from './type'
// endregion
export const DEFAULT_ENCODING:Encoding = 'utf8'
export const CloseEventNames = [
    'close', 'exit', 'SIGINT', 'SIGTERM', 'SIGQUIT', 'uncaughtException'
] as const
export const ConsoleOutputMethods = [
    'debug', 'error', 'info', 'log', 'warn'
] as const
export const ValueCopySymbol = Symbol.for('clientnodeValue')
export const IgnoreNullAndUndefinedSymbol =
    Symbol.for('clientnodeIgnoreNullAndUndefined')
// region determine environment
/// region context
export const determineGlobalContext:(() => $Global) = ():$Global => {
    if (typeof globalThis === 'undefined') {
        if (typeof window === 'undefined') {
            if (typeof global === 'undefined')
                return ((typeof module === 'undefined') ? {} : module) as
                    $Global

            if (global.window)
                return global.window as unknown as $Global

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
// Make preprocessed require function available at runtime.
/*
    NOTE: This results in an webpack error when post processing this compiled
    pendant in another webpack context.

    declare const __non_webpack_require__:typeof require
*/
export const currentRequire:null|typeof require =
    /*
        typeof __non_webpack_require__ === 'function' ?
            __non_webpack_require__ :
    */
    eval(`typeof require === 'undefined' ? null : require`) as
        null|typeof require

let currentOptionalImport:ImportFunction|null = null
try {
    currentOptionalImport =
        eval(`typeof import === 'undefined' ? null : import`) as
            ImportFunction|null
} catch (error) {
    // Continue regardless of an error.
}
export const currentImport:null|ImportFunction = currentOptionalImport
export const optionalRequire = <T = unknown>(id:string):null|T => {
    try {
        return currentRequire ? currentRequire(id) as T : null
    } catch (error) {
        return null
    }
}
globalContext.fetch =
    // eslint-disable-next-line @typescript-eslint/unbound-method
    globalContext.fetch ??
    optionalRequire<{default:typeof fetch}>('node-fetch')?.default ??
    ((...parameters:Parameters<typeof fetch>):ReturnType<typeof fetch> =>
        currentImport!(/* webpackIgnore: true */ 'node-fetch')
            .then((module:unknown):ReturnType<typeof fetch> =>
                (module as {default:typeof fetch})?.default(...parameters)
            )
    )
const {
    mkdirSync = null,
    readdirSync = null,
    readFileSync = null,
    statSync = null,
    writeFileSync = null
} = optionalRequire<typeof import('fs')>('fs') || {}
const {
    mkdir = null,
    readdir = null,
    readFile = null,
    stat = null,
    writeFile = null
} = optionalRequire<typeof import('fs/promises')>('fs/promises') || {}
// eslint-disable-next-line @typescript-eslint/unbound-method
const {basename = null, join = null, resolve = null} =
    optionalRequire<typeof import('path')>('path') || {}
/// endregion
/// region $
export const determine$:(() => $TStatic) = ():$TStatic => {
    let $:$TStatic = (() => {
        // Do nothing.
    }) as unknown as $TStatic
    if (globalContext.$ && globalContext.$ !== null)
        $ = globalContext.$
    else {
        if (!globalContext.$ && globalContext.document)
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                $ = require('jquery') as $TStatic
            } catch (error) {
                // Continue regardless of an error.
            }

        if (
            typeof $ === 'undefined' ||
            $ === null ||
            typeof $ === 'object' && Object.keys($).length === 0
        ) {
            const selector = globalContext.document?.querySelectorAll ?
                globalContext.document.querySelectorAll.bind(
                    globalContext.document
                ) :
                () => null

            $ = ((parameter:unknown):unknown => {
                let $domNodes:null|$T = null
                if (typeof parameter === 'string')
                    $domNodes = selector(parameter) as unknown as null|$T
                else if (Array.isArray(parameter))
                    $domNodes = parameter as unknown as null|$T
                else if (
                    typeof HTMLElement === 'object' &&
                    parameter instanceof HTMLElement ||
                    (parameter as Node)?.nodeType === 1 &&
                    typeof (parameter as Node)?.nodeName === 'string'
                )
                    $domNodes = [parameter] as unknown as $T

                if ($domNodes) {
                    if ($.fn)
                        for (const [key, plugin] of Object.entries($.fn))
                            $domNodes[key as 'add'] = (
                                plugin as unknown as UnknownFunction
                            ).bind($domNodes) as $T['add']

                    $domNodes.jquery = 'clientnode'

                    return $domNodes
                }

                /* eslint-disable @typescript-eslint/no-use-before-define */
                if (Tools.isFunction(parameter) && globalContext.document)
                    globalContext.document.addEventListener(
                        'DOMContentLoaded',
                        parameter as unknown as EventListenerObject
                    )
                /* eslint-enable @typescript-eslint/no-use-before-define */

                return parameter
            }) as $TStatic

            ;($ as {fn:$T}).fn = {} as $T
        }
    }

    if (!$.global)
        $.global = globalContext

    if ($.global.window) {
        if (!$.document && $.global.window.document)
            $.document = $.global.window.document
        if (!$.location && $.global.window.location)
            $.location = $.global.window.location
    }

    return $
}
export let $ = determine$()
/// endregion
// endregion
// region plugins/classes
/// region lock
/**
 * Represents the lock state.
 * @property locks - Mapping of lock descriptions to there corresponding
 * callbacks.
 */
export class Lock<Type = string|void> {
    locks:Mapping<Array<LockCallbackFunction<Type>>>
    /**
     * Initializes locks.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     *
     * @returns Nothing.
     */
    constructor(locks:Mapping<Array<LockCallbackFunction<Type>>> = {}) {
        this.locks = locks
    }
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
     *
     * @returns Returns a promise which will be resolved after releasing lock.
     */
    acquire(
        description:string,
        callback?:LockCallbackFunction<Type>,
        autoRelease = false
    ):Promise<Type> {
        return new Promise<Type>((resolve:(_value:Type) => void):void => {
            const wrappedCallback:LockCallbackFunction<Type> = (
                description:string
            ):Promise<Type>|Type => {
                let result:Promise<Type>|Type|undefined
                if (callback)
                    result = callback(description)

                const finish = (value:Type):Type => {
                    if (autoRelease)
                        void this.release(description)

                    resolve(value)

                    return value
                }

                if ((result as Promise<Type>)?.then)
                    return (result as Promise<Type>).then(finish)

                finish(description as unknown as Type)

                return result!
            }

            if (Object.prototype.hasOwnProperty.call(this.locks, description))
                this.locks[description].push(wrappedCallback)
            else {
                this.locks[description] = []

                /* eslint-disable @typescript-eslint/no-floating-promises */
                wrappedCallback(description)
                /* eslint-enable @typescript-eslint/no-floating-promises */
            }
        })
    }
    /**
     * Calling this method  causes the given critical area to be finished and
     * all functions given to "acquire()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     *
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquire" method.
     */
    async release(description:string):Promise<Type|void> {
        if (Object.prototype.hasOwnProperty.call(this.locks, description)) {
            const callback:LockCallbackFunction<Type>|undefined =
                this.locks[description].shift()

            if (callback === undefined)
                delete this.locks[description]
            else
                return await callback(description)
        }
    }
}
/// endregion
/// region semaphore
/**
 * Represents the semaphore state.
 * @property queue - List of waiting resource requests.
 *
 * @property numberOfFreeResources - Number free allowed concurrent resource
 * uses.
 * @property numberOfResources - Number of allowed concurrent resource uses.
 */
export class Semaphore {
    queue:Array<AnyFunction> = []

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
     * @returns A promise which will be resolved if requested resource is
     * available.
     */
    acquire():Promise<number> {
        return new Promise<number>((resolve:(_value:number) => void):void => {
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
        const callback:AnyFunction|undefined = this.queue.pop()
        if (callback === undefined)
            this.numberOfFreeResources += 1
        else
            callback(this.numberOfFreeResources)
    }
}
/// endregion
/// region static tools
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for depending gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse  option objects dom trees or handle events is also
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
 * maximal supported internet explorer version. Saves zero if no internet
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
 *
 * @property static:_defaultOptions - Fallback options if not overwritten by
 * the options given to the constructor method.
 * @property static:_defaultOptions.logging {boolean} - Indicates whether
 * logging should be active.
 * @property static:_defaultOptions.domNodeSelectorInfix {string} - Selector
 * infix for all needed dom nodes.
 * @property static:_defaultOptions.domNodeSelectorPrefix {string} - Selector
 * prefix for all needed dom nodes.
 * @property static:_defaultOptions.domNodes {Object.<string, string>} -
 * Mapping of names to needed dom nodes referenced by there selector.
 * @property static:_defaultOptions.domNodes.hideJavaScriptEnabled {string} -
 * Selector to dom nodes which should be hidden if javaScript is available.
 * @property static:_defaultOptions.domNodes.showJavaScriptEnabled {string} -
 * Selector to dom nodes which should be visible if javaScript is available.
 *
 * @property static:_javaScriptDependentContentHandled - Indicates whether
 * javaScript dependent content where hide or shown.
 *
 * @property $domNode - $-extended dom node if one was given to the constructor
 * method.
 *
 * @property options - Options given to the constructor.
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
    static locales:Array<string> = []
    static readonly maximalSupportedInternetExplorerVersion:number = ((
    ):number => {
        /*
            NOTE: This method uses "Array.indexOf" instead of "Array.includes"
            since this function could be crucial in wide browser support.
        */
        if (!$.document)
            return 0

        const div = $.document.createElement('div')
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
            div.innerHTML = (
                // eslint-disable-next-line no-useless-concat
                '<!' + `--[if gt IE ${version}]><i></i><![e` + 'ndif]-' + '->'
            )

            if (div.getElementsByTagName('i').length === 0)
                break
        }

        // Try special detection for internet explorer 10 and 11.
        if (version === 0 && $.global.window.navigator)
            /* eslint-disable @typescript-eslint/prefer-includes */
            if ($.global.window.navigator.appVersion.indexOf('MSIE 10') !== -1)
                return 10
            else if (
                ![
                    $.global.window.navigator.userAgent.indexOf('Trident'),
                    $.global.window.navigator.userAgent.indexOf('rv:11')
                ].includes(-1)
            )
                return 11
            /* eslint-enable @typescript-eslint/prefer-includes */

        return version
    })()
    static noop:AnyFunction =
        $.noop ?
            // eslint-disable-next-line @typescript-eslint/unbound-method
            $.noop as AnyFunction :
            ():void => {
                // Do nothing.
            }
    static plainObjectPrototypes:Array<FirstParameter<
        typeof Object.getPrototypeOf
    >> = [Object.prototype]
    static readonly specialRegexSequences:Array<string> = [
        '-', '[', ']', '(', ')', '^', '$', '*', '+', '.', '{', '}'
    ]
    static readonly transitionEndEventNames =
        'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'

    static _dateTimePatternCache:Array<RegExp> = []

    /*
        NOTE: Define entity as partial to be able to extend this class without
        repeating all this content.
    */
    static _defaultOptions:Partial<Options> = {
        domNodes: {
            hideJavaScriptEnabled: '.tools-hidden-on-javascript-enabled',
            showJavaScriptEnabled: '.tools-visible-on-javascript-enabled'
        },
        domNodeSelectorInfix: '',
        domNodeSelectorPrefix: 'body',
        logging: false,
        name: 'Tools'
    }

    static _javaScriptDependentContentHandled = false
    // endregion
    // region dynamic properties
    $domNode:null|$T<TElement> = null
    options:Options
    // endregion
    // region public methods
    /// region special
    /**
     * Triggered if current object is created via the "new" keyword. The dom
     * node selector prefix enforces to not globally select any dom nodes which
     * aren't in the expected scope of this plugin. "{1}" will be automatically
     * replaced with this plugin name suffix ("tools"). You don't have to use
     * "{1}" but it can help you to write code which is more reconcilable with
     * the dry concept.
     * @param $domNode - $-extended dom node to use as reference in various
     * methods.
     *
     * @returns Nothing.
     */
    constructor($domNode?:$T<TElement>) {
        if ($domNode)
            this.$domNode = $domNode

        this.options = Tools._defaultOptions as Options

        // Avoid errors in browsers that lack a console.
        if (!$.global.console)
            ($.global as unknown as {console:Mapping<AnyFunction>}).console =
                {}

        for (const methodName of ConsoleOutputMethods)
            if (!(methodName in $.global.console))
                $.global.console[methodName as 'log'] =
                    Tools.noop as Console['log']
    }
    /**
     * This method could be overwritten normally. It acts like a destructor.
     * @returns Returns the current instance.
     */
    destructor():this {
        if (($.fn as {off?:AnyFunction})?.off)
            this.off('*')

        return this
    }
    /**
     * This method should be overwritten normally. It is triggered if current
     * object was created via the "new" keyword and is called now.
     * @param options - An options object.
     *
     * @returns Returns the current instance.
     */
    initialize<R = this>(options:RecursivePartial<Options> = {}):R {
        /*
            NOTE: We have to create a new options object instance to avoid
            changing a static options object.
        */
        this.options = Tools.extend<Options>(
            true, {} as Options, Tools._defaultOptions, options
        )
        /*
            The selector prefix should be parsed after extending options
            because the selector would be overwritten otherwise.
        */
        this.options.domNodeSelectorPrefix = Tools.stringFormat(
            this.options.domNodeSelectorPrefix,
            Tools.stringCamelCaseToDelimited(
                this.options.domNodeSelectorInfix === null ?
                    '' :
                    this.options.domNodeSelectorInfix || this.options.name
            )
        )

        this.renderJavaScriptDependentVisibility()

        return this as unknown as R
    }
    /// endregion
    /// region object orientation
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Defines a generic controller for dom node aware plugins.
     * @param object - The object or class to control. If "object" is a class
     * an instance will be generated.
     * @param parameters - The initially given arguments object.
     * @param $domNode - Optionally a $-extended dom node to use as reference.
     *
     * @returns Returns whatever the initializer method returns.
     */
    static controller<TElement = HTMLElement>(
        this:void,
        object:unknown,
        parameters:unknown,
        $domNode:null|$T<TElement> = null
    ):unknown {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (typeof object === 'function') {
            object = new (
                object as {new (_$domNode:null|$T<TElement>):unknown}
            )($domNode)

            if (!(object instanceof Tools))
                object = Tools.extend<Tools>(
                    true, new Tools<HTMLElement>(), object as Tools
                )
        }

        const normalizedParameters:Array<unknown> = Tools.arrayMake(parameters)

        if (
            normalizedParameters.length &&
            typeof normalizedParameters[0] === 'string' &&
            normalizedParameters[0] in (object as Mapping<unknown>)
        ) {
            if (Tools.isFunction(
                (object as Mapping<unknown>)[normalizedParameters[0]]
            ))
                return (object as
                    Mapping<(..._parameters:Array<unknown>) => unknown>
                )[normalizedParameters[0]](...normalizedParameters.slice(1))

            return (object as Mapping<unknown>)[normalizedParameters[0]]
        } else if (
            normalizedParameters.length === 0 ||
            typeof normalizedParameters[0] === 'object'
        ) {
            /*
                If an options object or no method name is given the initializer
                will be called.
            */
            const result:unknown = (object as Tools).initialize(
                ...normalizedParameters as Parameters<Tools['initialize']>
            )

            const name:string =
                (object as Tools).options.name ||
                (object as Tools).constructor.name

            if ($domNode?.data && !$domNode.data(name))
                // Attach extended object to the associated dom node.
                $domNode.data(
                    name,
                    object as
                        boolean|null|number|Mapping<unknown>|string|symbol
                )

            return result
        }

        if (
            normalizedParameters.length &&
            typeof normalizedParameters[0] === 'string'
        )
            throw new Error(
                `Method "${normalizedParameters[0]}" does not exist on ` +
                `$-extended dom node "${object as string}".`
            )
    }
    /// endregion
    /// region date time
    /**
     * Formats given date or current via given format specification.
     * @param format - Format specification.
     * @param dateTime - Date time to format.
     * @param options - Additional configuration options for
     *                  "Intl.DateTimeFormat".
     * @param locales - Locale or list of locales to use for formatting. First
     *                  one take precedence of latter ones.
     *
     * @returns Formatted date time string.
     */
    static dateTimeFormat(
        this:void,
        format = 'full',
        dateTime:Date|number|string = new Date(),
        options:SecondParameter<typeof Intl.DateTimeFormat> = {},
        locales:Array<string>|string = Tools.locales
    ):string {
        if (typeof dateTime === 'number')
            /*
                NOTE: "Date" constructor expects milliseconds as unit instead
                of more common used seconds.
            */
            dateTime *= 1000

        const normalizedDateTime:Date = new Date(dateTime)

        if (['full', 'long', 'medium', 'short'].includes(format))
            return new Intl.DateTimeFormat(
                ([] as Array<string>).concat(locales, 'en-US'),
                {dateStyle: format, timeStyle: format, ...options} as
                    SecondParameter<typeof Intl.DateTimeFormat>
            )
                .format(normalizedDateTime)

        const scope:Mapping<Array<string>|string> = {}
        for (const style of ['full', 'long', 'medium', 'short'] as const) {
            scope[`${style}Literals`] = []

            const dateTimeFormat:Intl.DateTimeFormat = new Intl.DateTimeFormat(
                ([] as Array<string>).concat(locales, 'en-US'),
                {dateStyle: style, timeStyle: style, ...options} as
                    SecondParameter<typeof Intl.DateTimeFormat>
            )

            scope[style] = dateTimeFormat.format(normalizedDateTime)

            for (const item of dateTimeFormat.formatToParts(
                normalizedDateTime
            ))
                if (item.type === 'literal')
                    (scope[`${style}Literals`] as Array<string>)
                        .push(item.value)
                else
                    scope[`${style}${Tools.stringCapitalize(item.type)}`] =
                        item.value
        }

        const evaluated:EvaluationResult =
            Tools.stringEvaluate(`\`${format}\``, scope)
        if (evaluated.error)
            throw new Error(evaluated.error)

        /*
            NOTE: For some reason hidden symbols are injected differently on
            different platforms, so we have to normalize for predictable
            testing.
        */
        return evaluated.result.replace(/\s/g, ' ')
    }
    /// endregion
    /// region boolean
    /**
     * Determines whether its argument represents a JavaScript number.
     * @param value - Value to analyze.
     *
     * @returns A boolean value indicating whether given object is numeric
     * like.
     */
    static isNumeric(this:void, value:unknown):value is number {
        const type:string = Tools.determineType(value)
        /*
            NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
            misinterprets leading-number strings, particularly hex literals
            ("0x...") subtraction forces infinities to NaN.
        */
        return (
            ['number', 'string'].includes(type) &&
            !isNaN(value as number - parseFloat(value as string))
        )
    }
    /**
     * Determine whether the argument is a window.
     * @param value - Value to check for.
     *
     * @returns Boolean value indicating the result.
     */
    static isWindow(this:void, value:unknown):value is Window {
        return (
            ![null, undefined].includes(value as null) &&
            typeof value === 'object' &&
            value === (value as Window)?.window
        )
    }
    /**
     * Checks if given object is similar to an array and can be handled like an
     * array.
     * @param object - Object to check behavior for.
     *
     * @returns A boolean value indicating whether given object is array like.
     */
    static isArrayLike(this:void, object:unknown):boolean {
        let length:number|boolean
        try {
            length = Boolean(object) && (object as Array<unknown>).length
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
                // eslint-disable-next-line no-unused-expressions
                (object as Array<unknown>)[length - 1]

                return true
            } catch (error) {
                // Continue regardless of an error.
            }

        return false
    }
    /**
     * Checks whether one of the given pattern matches given string.
     * @param target - Target to check in pattern for.
     * @param pattern - List of pattern to check for.
     *
     * @returns Value "true" if given object is matches by at leas one of the
     * given pattern and "false" otherwise.
     */
    static isAnyMatching(
        this:void, target:string, pattern:Array<string|RegExp>
    ):boolean {
        for (const currentPattern of pattern)
            if (typeof currentPattern === 'string') {
                if (currentPattern === target)
                    return true
            } else if (currentPattern.test(target))
                return true

        return false
    }
    /**
     * Checks whether given object is a native object but not null.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a plain javaScript object and
     * "false" otherwise.
     */
    static isObject(this:void, value:unknown):value is Mapping<unknown> {
        return value !== null && typeof value === 'object'
    }
    /**
     * Checks whether given object is a plain native object.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a plain javaScript object and
     * "false" otherwise.
     */
    static isPlainObject(this:void, value:unknown):value is PlainObject {
        return (
            value !== null &&
            typeof value === 'object' &&
            Tools.plainObjectPrototypes.includes(Object.getPrototypeOf(value))
        )
    }
    /**
     * Checks whether given object is a set.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a set and "false" otherwise.
     */
    static isSet(this:void, value:unknown):value is Set<unknown> {
        return Tools.determineType(value) === 'set'
    }
    /**
     * Checks whether given object is a map.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a map and "false" otherwise.
     */
    static isMap(this:void, value:unknown):value is Map<unknown, unknown> {
        return Tools.determineType(value) === 'map'
    }
    /**
     * Checks whether given object is a proxy.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a proxy and "false" otherwise.
     */
    static isProxy(this:void, value:unknown):value is ProxyType {
        return Boolean((value as ProxyType).__target__)
    }
    /**
     * Checks whether given object is a function.
     * @param value - Value to check.
     *
     * @returns Value "true" if given object is a function and "false"
     * otherwise.
     */
    static isFunction(this:void, value:unknown):value is AnyFunction {
        return (
            Boolean(value) &&
            ['[object AsyncFunction]', '[object Function]'].includes(
                {}.toString.call(value)
            )
        )
    }
    /// endregion
    /// region logging
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
     * formatting.
     *
     * @returns Nothing.
     */
    log(
        object:unknown,
        force = false,
        avoidAnnotation = false,
        level:keyof Console = 'info',
        ...additionalArguments:Array<unknown>
    ):void {
        if (
            this.options.logging ||
            force ||
            ['error', 'critical'].includes(level)
        ) {
            let message:unknown

            if (avoidAnnotation)
                message = object
            else if (typeof object === 'string')
                message =
                    `${this.options.name} (${level}): ` +
                    Tools.stringFormat(object, ...additionalArguments)
            else if (Tools.isNumeric(object) || typeof object === 'boolean')
                message =
                    `${this.options.name} (${level}): ${object.toString()}`
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log(`'--------------------------------------------'`)
            }

            if (message)
                if (
                    !($.global.console && level in $.global.console) ||
                    ($.global.console[level] === Tools.noop)
                ) {
                    if ($.global.window?.alert)
                        $.global.window.alert(message)
                } else
                    ($.global.console[level] as Console['log'])(message)
        }
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     *
     * @returns Nothing.
     */
    info(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'info', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     *
     * @returns Nothing.
     */
    debug(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'debug', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     *
     * @returns Nothing.
     */
    error(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, true, false, 'error', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     *
     * @returns Nothing.
     */
    critical(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, true, false, 'warn', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     *
     * @returns Nothing.
     */
    warn(object:unknown, ...additionalArguments:Array<unknown>):void {
        this.log(object, false, false, 'warn', ...additionalArguments)
    }
    /**
     * Dumps a given object in a human readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     *
     * @returns Returns the serialized version of given object.
     */
    static show(
        this:void, object:unknown, level = 3, currentLevel = 0
    ):string {
        let output = ''

        if (Tools.determineType(object) === 'object') {
            for (const [key, value] of Object.entries(
                object as Mapping<unknown>
            )) {
                output += `${key.toString()}: `

                if (currentLevel <= level)
                    output += Tools.show(value, level, currentLevel + 1)
                else
                    output += `${value as string}`

                output += '\n'
            }

            return output.trim()
        }

        output = `${object as string}`.trim()

        return `${output} (Type: "${Tools.determineType(object)}")`
    }
    /// endregion
    /// region cookie
    /**
     * Deletes a cookie value by given name.
     * @param name - Name to identify requested value.
     *
     * @returns Nothing.
     */
    static deleteCookie(this:void, name:string):void {
        if ($.document)
            $.document.cookie = `${name}=; Max-Age=-99999999;`
    }
    /**
     * Gets a cookie value by given name.
     * @param name - Name to identify requested value.
     *
     * @returns Requested value.
     */
    static getCookie(this:void, name:string):string|null {
        if ($.document) {
            const key = `${name}=`
            const decodedCookie:string = decodeURIComponent($.document.cookie)
            for (let date of decodedCookie.split(';')) {
                while (date.startsWith(' '))
                    date = date.substring(1)

                if (date.startsWith(key))
                    return date.substring(key.length, date.length)
            }

            return ''
        }

        return null
    }
    /**
     * Sets a cookie key-value-pair.
     * @param name - Name to identify given value.
     * @param value - Value to set.
     * @param givenOptions - Cookie set options.
     * @param givenOptions.domain - Domain to reference with given
     * key-value-pair.
     * @param givenOptions.httpOnly - Indicates if this cookie should be
     * accessible from client or not.

     * @param givenOptions.minimal - Set only minimum number of options.
     * @param givenOptions.numberOfDaysUntilExpiration - Number of days until
     * given key shouldn't be deleted.
     * @param givenOptions.path - Path to reference with given key-value-pair.
     * @param givenOptions.sameSite - Set same site policy to "Lax", "None" or
     * "Strict".
     * @param givenOptions.secure - Indicates if this cookie is only valid for
     * "https" connections.
     *
     * @returns A boolean indicating whether cookie could be set or not.
     */
    static setCookie(
        this:void,
        name:string,
        value:string,
        givenOptions:Partial<CookieOptions> = {}
    ):boolean {
        if ($.document) {
            const options:CookieOptions = {
                domain: '',
                httpOnly: false,
                minimal: false,
                numberOfDaysUntilExpiration: 365,
                path: '/',
                sameSite: 'Lax',
                secure: true,
                ...givenOptions
            }

            const now = new Date()
            now.setTime(
                now.getTime() +
                (options.numberOfDaysUntilExpiration * 24 * 60 * 60 * 1000)
            )

            if (options.domain === '' && $.location?.hostname)
                options.domain = $.location.hostname

            const newCookie =
                `${name}=${value}` +
                (
                    options.minimal ?
                        '' :
                        (
                            `;Expires="${now.toUTCString()}` +
                            `;Path=${options.path}` +
                            `;Domain=${options.domain}` +
                            (
                                options.sameSite ?
                                    `;SameSite=${options.sameSite}` :
                                    ''
                            ) +
                            (options.secure ? ';Secure' : '') +
                            (options.httpOnly ? ';HttpOnly' : '')
                        )
                )

            $.document.cookie = newCookie

            return true
        }

        return false
    }
    /// endregion
    /// region dom node
    /**
     * Normalizes class name order of current dom node.
     * @returns Current instance.
     */
    get normalizedClassNames():this {
        if (this.$domNode) {
            const className = 'class'

            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):void => {
                    const $domNode:$T = $(domNode)
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
    get normalizedStyles():this {
        if (this.$domNode) {
            const styleName = 'style'

            this.$domNode
                .find('*')
                .addBack()
                .each((index:number, domNode:HTMLElement):void => {
                    const $domNode:$T = $(domNode)
                    const serializedStyles:string|undefined =
                        $domNode.attr(styleName)

                    if (serializedStyles)
                        $domNode.attr(
                            styleName,
                            Tools.stringCompressStyleValue(
                                (
                                    Tools
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
        const $domNode:null|$T<TElement> = this.$domNode

        if ($domNode?.length) {
            let styleProperties:CSSStyleDeclaration

            if ($.global.window?.getComputedStyle) {
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
                            result[Tools.stringDelimitedToCamelCase(
                                styleProperties[index]
                            )] =
                                styleProperties.getPropertyValue(
                                    styleProperties[index]
                                )
                    else
                        for (const [propertyName, value] of Object.entries(
                            styleProperties
                        ))
                            result[Tools.stringDelimitedToCamelCase(
                                propertyName
                            )] =
                                value as number|string ||
                                (styleProperties as CSSStyleDeclaration)
                                    .getPropertyValue(propertyName)

                    return result
                }
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
     *
     * @returns Returns true if both dom representations are equivalent.
     */
    static isEquivalentDOM(
        this:void,
        first:Node|string|$T<HTMLElement>|$T<Node>,
        second:Node|string|$T<HTMLElement>|$T<Node>,
        forceHTMLString = false
    ):boolean {
        if (first === second)
            return true

        if (first && second) {
            const detemermineHTMLPattern =
                /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/
            const inputs:Mapping<Node|string|$T<HTMLElement>|$T<Node>> =
                {first, second}
            const $domNodes:Mapping<$T> = {
                first: $('<dummy>'), second: $('<dummy>')
            }

            /*
                NOTE: Assume that strings that start "<" and end with ">" are
                markup and skip the more expensive regular expression check.
            */
            for (const [type, tag] of Object.entries(inputs))
                if (
                    typeof tag === 'string' &&
                    (
                        forceHTMLString ||
                        (
                            tag.startsWith('<') &&
                            tag.endsWith('>') &&
                            tag.length >= 3 ||
                            detemermineHTMLPattern.test(tag)
                        )
                    )
                )
                    $domNodes[type] = $(`<div>${tag}</div>`)
                else
                    try {
                        const $copiedDomNode:$T<JQuery.Node> =
                            $<JQuery.Node>(tag as JQuery.Node).clone()

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
     * @param givenDelta.bottom - Bottom delta.
     * @param givenDelta.left - Left delta.
     * @param givenDelta.right - Right delta.
     * @param givenDelta.top - Top delta.
     *
     * @returns Returns one of "above", "left", "below", "right" or "in".
     */
    getPositionRelativeToViewport(
        givenDelta:{bottom?:number;left?:number;right?:number;top?:number} = {}
    ):RelativePosition {
        const delta:Position = Tools.extend<Position>(
            {bottom: 0, left: 0, right: 0, top: 0}, givenDelta
        )

        const $domNode:null|$T<TElement> = this.$domNode

        if (
            $.global.window &&
            $domNode?.length &&
            $domNode[0] &&
            'getBoundingClientRect' in ($domNode[0] as unknown as HTMLElement)
        ) {
            const $window:$T<Window & typeof globalThis> = $($.global.window)

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
     *
     * @returns Returns generated selector.
     */
    static generateDirectiveSelector(this:void, directiveName:string):string {
        const delimitedName:string =
            Tools.stringCamelCaseToDelimited(directiveName)

        return `${delimitedName}, .${delimitedName}, [${delimitedName}], ` +
            `[data-${delimitedName}], [x-${delimitedName}]` + (
            (delimitedName.includes('-') ? (
                `, [${delimitedName.replace(/-/g, '\\:')}], ` +
                `[${delimitedName.replace(/-/g, '_')}]`) : ''))
    }
    /**
     * Removes a directive name corresponding class or attribute.
     * @param directiveName - The directive name.
     *
     * @returns Returns current dom node.
     */
    removeDirective(directiveName:string):null|$T<TElement> {
        if (this.$domNode === null)
            return null

        const delimitedName:string =
            Tools.stringCamelCaseToDelimited(directiveName)

        return this.$domNode
            .removeClass(delimitedName)
            .removeAttr(delimitedName)
            .removeAttr(`data-${delimitedName}`)
            .removeAttr(`x-${delimitedName}`)
            .removeAttr(delimitedName.replace('-', ':'))
            .removeAttr(delimitedName.replace('-', '_'))
    }
    /**
     * Hide or show all marked nodes which should be displayed depending on
     * java script availability.
     * @returns Nothing.
     */
    renderJavaScriptDependentVisibility():void {
        if (
            !Tools._javaScriptDependentContentHandled &&
            $.document &&
            'filter' in $ &&
            'hide' in $ &&
            'show' in $
        ) {
            $(
                `${this.options.domNodeSelectorPrefix} ` +
                this.options.domNodes.hideJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentHide')
                )
                .data('javaScriptDependentContentHide', true)
                .hide()

            $(
                `${this.options.domNodeSelectorPrefix} ` +
                this.options.domNodes.showJavaScriptEnabled
            )
                .filter(
                    (index:number, domNode:HTMLElement):boolean =>
                        !$(domNode).data('javaScriptDependentContentShow')
                )
                .data('javaScriptDependentContentShow', true)
                .show()

            Tools._javaScriptDependentContentHandled = true
        }
    }
    /**
     * Determines a normalized camel case directive name representation.
     * @param directiveName - The directive name.
     *
     * @returns Returns the corresponding name.
     */
    static getNormalizedDirectiveName(this:void, directiveName:string):string {
        for (const delimiter of ['-', ':', '_'] as const) {
            let prefixFound = false

            for (
                const prefix of [`data${delimiter}`, `x${delimiter}`] as const
            )
                if (directiveName.startsWith(prefix)) {
                    directiveName = directiveName.substring(prefix.length)
                    prefixFound = true

                    break
                }

            if (prefixFound)
                break
        }

        for (const delimiter of ['-', ':', '_'] as const)
            directiveName =
                Tools.stringDelimitedToCamelCase(directiveName, delimiter)

        return directiveName
    }
    /**
     * Determines a directive attribute value.
     * @param directiveName - The directive name.
     *
     * @returns Returns the corresponding attribute value or "null" if no
     * attribute value exists.
     */
    getDirectiveValue(directiveName:string):null|string {
        if (this.$domNode === null)
            return null

        const delimitedName:string =
            Tools.stringCamelCaseToDelimited(directiveName)

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
            this.options.domNodeSelectorPrefix &&
            domNodeSelector.startsWith(this.options.domNodeSelectorPrefix)
        )
            return domNodeSelector
                .substring(this.options.domNodeSelectorPrefix.length)
                .trim()
        return domNodeSelector
    }
    /**
     * Determines the dom node name of a given dom node string.
     * @param domNodeSelector - A given to dom node selector to determine its
     * name.
     *
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
    static getDomNodeName(this:void, domNodeSelector:string):null|string {
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
     *
     * @returns Returns All $ wrapped dom nodes corresponding to given
     * selectors.
     */
    grabDomNodes(
        domNodeSelectors:Mapping,
        wrapperDomNode?:Node|null|string|$T<Node>
    ):$DomNodes {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        const domNodes:$DomNodes = {} as $DomNodes

        if (domNodeSelectors)
            if (wrapperDomNode) {
                const $wrapperDomNode:$T<Node> =
                    $(wrapperDomNode as Node) as $T<Node>
                for (const [name, selector] of Object.entries(
                    domNodeSelectors
                ))
                    domNodes[name] = $wrapperDomNode.find(selector)
            } else
                for (const [name, selector] of Object.entries(
                    domNodeSelectors
                )) {
                    const match:Array<string>|null = /, */.exec(selector)
                    if (match)
                        domNodeSelectors[name] += selector
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

        if (this.options.domNodeSelectorPrefix)
            domNodes.parent = $(this.options.domNodeSelectorPrefix)
        if ($.global.window) {
            domNodes.window = $($.global.window as unknown as HTMLElement)

            if ($.document)
                domNodes.document = $($.document as unknown as HTMLElement)
        }

        return domNodes
    }
    /// endregion
    /// region scope
    /**
     * Overwrites all inherited variables from parent scope with "undefined".
     * @param scope - A scope where inherited names will be removed.
     * @param prefixesToIgnore - Name prefixes to ignore during deleting names
     * in given scope.
     *
     * @returns The isolated scope.
     */
    static isolateScope<T extends Mapping<unknown>>(
        this:void, scope:T, prefixesToIgnore:Array<string> = []
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
                (scope[name] as unknown) = undefined

        return scope
    }
    /**
     * Generates a unique name in given scope (useful for jsonp requests).
     * @param prefix - A prefix which will be prepended to unique name.
     * @param suffix - A suffix which will be prepended to unique name.
     * @param scope - A scope where the name should be unique.
     * @param initialUniqueName - An initial scope name to use if not exists.
     *
     * @returns The function name.
     */
    static determineUniqueScopeName(
        this:void,
        prefix = 'callback',
        suffix = '',
        scope:Mapping<unknown> = $.global as unknown as Mapping<unknown>,
        initialUniqueName = ''
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
    /// endregion
    /// region function
    /**
     * Determines all parameter names from given callable (function or class,
     * ...).
     * @param callable - Function or function code to inspect.
     *
     * @returns List of parameter names.
     */
    static getParameterNames(
        this:void, callable:AnyFunction|string
    ):Array<string> {
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
        let parameter:Array<string>|null =
            /^function\s*[^(]*\(\s*([^)]*)\)/m.exec(functionCode)
        if (parameter === null)
            // Try arrow function declaration.
            parameter = /^[^(]*\(\s*([^)]*)\) *=>.*/m.exec(functionCode)
        if (parameter === null)
            // Try one argument and without brackets arrow function declaration.
            parameter = /([^= ]+) *=>.*/m.exec(functionCode)

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
     *
     * @returns Returns the given value.
     */
    static identity<T>(this:void, value:T):T {
        return value
    }
    /**
     * Inverted filter helper to inverse each given filter.
     * @param filter - A function that filters an array.
     *
     * @returns The inverted filter.
     */
    static invertArrayFilter<T>(this:void, filter:T):T {
        return ((
            data:Array<unknown>, ...additionalParameter:Array<unknown>
        ):Array<unknown> => {
            if (data) {
                const filteredData:Array<unknown> = (
                    filter as unknown as ArrayTransformer
                )(data, ...additionalParameter)

                let result:Array<unknown> = []
                if (filteredData.length) {
                    for (const date of data)
                        if (!filteredData.includes(date))
                            result.push(date)
                } else
                    result = data

                return result
            }

            return data
        }) as unknown as T
    }
    /**
     * Triggers given callback after given duration. Supports unlimited
     * duration length and returns a promise which will be resolved after given
     * duration has been passed.
     * @param parameters - Observes the first three existing parameters. If one
     * is a number it will be interpret as delay in milliseconds until given
     * callback will be triggered. If one is of type function it will be used
     * as callback and if one is of type boolean it will indicate if returning
     * promise should be rejected or resolved if given internally created
     * timeout should be canceled. Additional parameters will be forwarded to
     * given callback.
     *
     * @returns A promise resolving after given delay or being rejected if
     * value "true" is within one of the first three parameters. The promise
     * holds a boolean indicating whether timeout has been canceled or
     * resolved.
     */
    static timeout(this:void, ...parameters:Array<unknown>):TimeoutPromise {
        let callback:AnyFunction = Tools.noop
        let delayInMilliseconds = 0
        let throwOnTimeoutClear = false

        for (const value of parameters)
            if (typeof value === 'number' && !isNaN(value))
                delayInMilliseconds = value
            else if (typeof value === 'boolean')
                throwOnTimeoutClear = value
            else if (Tools.isFunction(value))
                callback = value

        let rejectCallback:(_reason:true) => void
        let resolveCallback:(_value:boolean) => void

        const result:TimeoutPromise = new Promise<boolean>((
            resolve:(_value:boolean) => void, reject:(_reason:true) => void
        ):void => {
            rejectCallback = reject
            resolveCallback = resolve
        }) as TimeoutPromise

        const wrappedCallback:ProcedureFunction = ():void => {
            callback.call(result, ...parameters)
            resolveCallback(false)
        }
        const maximumTimeoutDelayInMilliseconds = 2147483647

        if (delayInMilliseconds <= maximumTimeoutDelayInMilliseconds)
            result.timeoutID = setTimeout(wrappedCallback, delayInMilliseconds)
        else {
            /*
                Determine the number of times we need to delay by maximum
                possible timeout duration.
            */
            let numberOfRemainingTimeouts:number = Math.floor(
                delayInMilliseconds / maximumTimeoutDelayInMilliseconds
            )
            const finalTimeoutDuration:number =
                delayInMilliseconds % maximumTimeoutDelayInMilliseconds

            const delay = ():void => {
                if (numberOfRemainingTimeouts > 0) {
                    numberOfRemainingTimeouts -= 1

                    result.timeoutID =
                        setTimeout(delay, maximumTimeoutDelayInMilliseconds) as
                            unknown as
                            NodeJS.Timeout
                } else
                    result.timeoutID =
                        setTimeout(wrappedCallback, finalTimeoutDuration)
            }
            delay()
        }

        result.clear = ():void => {
            if (result.timeoutID) {
                clearTimeout(result.timeoutID)
                ;(throwOnTimeoutClear ? rejectCallback : resolveCallback)(true)
            }
        }

        return result
    }
    /// endregion
    /// region event
    /**
     * Prevents event functions from triggering to often by defining a minimal
     * span between each function call. Additional arguments given to this
     * function will be forwarded to given event function call.
     * @param callback - The function to call debounced.
     * @param thresholdInMilliseconds - The minimum time span between each
     * function call.
     * @param additionalArguments - Additional arguments to forward to given
     * function.
     *
     * @returns Returns the wrapped method.
     */
    static debounce<T = unknown>(
        this:void,
        callback:UnknownFunction,
        thresholdInMilliseconds = 600,
        ...additionalArguments:Array<unknown>
    ):((...parameters:Array<unknown>) => Promise<T>) {
        let waitForNextSlot = false
        let parametersForNextSlot:Array<unknown>|null = null
        // NOTE: Type "T" will be added via "then" method when called.
        let resolveNextSlotPromise:(value:T) => void
        let rejectNextSlotPromise:(reason:unknown) => void
        let nextSlotPromise:Promise<T> = new Promise<T>((
            resolve:(value:T) => void, reject:(reason:unknown) => void
        ):void => {
            resolveNextSlotPromise = resolve
            rejectNextSlotPromise = reject
        })

        return (...parameters:Array<unknown>):Promise<T> => {
            parameters = parameters.concat(additionalArguments || [])

            if (waitForNextSlot) {
                /*
                    NOTE: We have to reserve next time slot let given callback
                    be called with latest known provided arguments.
                */
                parametersForNextSlot = parameters

                return nextSlotPromise
            }

            waitForNextSlot = true

            const currentSlotPromise:Promise<T> = nextSlotPromise
            const resolveCurrentSlotPromise = resolveNextSlotPromise
            const rejectCurrentSlotPromise = rejectNextSlotPromise

            // NOTE: We call callback synchronously if possible.
            const result:Promise<T>|T = callback(...parameters) as Promise<T>|T

            if ((result as Promise<T>)?.then)
                (result as Promise<T>).then(
                    (result:T):void => resolveCurrentSlotPromise(result),
                    (reason:unknown):void => rejectCurrentSlotPromise(reason)
                )
            else
                resolveCurrentSlotPromise(result as T)

            /*
                Initialize new promise which will be used for next call request
                and is marked as delayed.
            */
            nextSlotPromise = new Promise<T>((
                resolve:(value:T) => void, reject:(reason:unknown) => void
            ):void => {
                resolveNextSlotPromise = resolve
                rejectNextSlotPromise = reject

                // Initialize new time slot to trigger given callback.
                void Tools.timeout(
                    thresholdInMilliseconds,
                    ():void => {
                        /*
                            Next new incoming call request can be handled
                            synchronously.
                        */
                        waitForNextSlot = false

                        // NOTE: Check if this slot should be used.
                        if (parametersForNextSlot) {
                            const result:Promise<T>|T =
                                callback(...parametersForNextSlot) as
                                    Promise<T>|T
                            parametersForNextSlot = null

                            if ((result as Promise<T>)?.then)
                                (result as Promise<T>).then(
                                    (result:T):void => resolve(result),
                                    (reason:unknown):void => reject(reason)
                                )
                            else
                                resolve(result as T)

                            /*
                                Initialize new promise which will be used for
                                next call request without waiting.
                            */
                            nextSlotPromise = new Promise<T>((
                                resolve:(value:T) => void,
                                reject:(reason:unknown) => void
                            ):void => {
                                resolveNextSlotPromise = resolve
                                rejectNextSlotPromise = reject
                            })
                        }
                    }
                )
            })

            return currentSlotPromise
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
     *
     * @returns - Returns result of an options event handler (when called) and
     * "true" otherwise.
     */
    fireEvent(
        eventName:string,
        callOnlyOptionsMethod = false,
        scope:unknown = this,
        ...additionalArguments:Array<unknown>
    ):unknown {
        const eventHandlerName = `on${Tools.stringCapitalize(eventName)}`

        interface Scope {
            callable:AnyFunction
            options:Mapping<AnyFunction>
        }
        const castedScope:Scope = scope as Scope

        if (!callOnlyOptionsMethod)
            if (eventHandlerName in castedScope)
                castedScope[eventHandlerName as 'callable'](
                    ...additionalArguments
                )
            else if (`_${eventHandlerName}` in castedScope)
                castedScope[`_${eventHandlerName}` as unknown as 'callable'](
                    ...additionalArguments
                )

        if (
            castedScope.options &&
            eventHandlerName in castedScope.options &&
            castedScope.options[eventHandlerName] !== Tools.noop
        )
            return castedScope.options[eventHandlerName].call(
                this, ...additionalArguments
            )

        return true
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method for "$.on()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.on()".
     * @param parameters - Parameter to forward.
     *
     * @returns Returns $'s grabbed dom node.
     */
    on<TElement = HTMLElement>(...parameters:Array<unknown>):$T<TElement> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameters, false)
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * A wrapper method fo "$.off()". It sets current plugin name as event
     * scope if no scope is given. Given arguments are modified and passed
     * through "$.off()".
     * @param parameters - Parameter to forward.
     *
     * @returns Returns $'s grabbed dom node.
     */
    off<TElement = HTMLElement>(...parameters:Array<unknown>):$T<TElement> {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return this._bindEventHelper<TElement>(parameters, true)
    }
    /// endregion
    /// region object
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
     *
     * @returns Returns given object wrapped with a dynamic getter proxy.
     */
    static addDynamicGetterAndSetter<T = unknown>(
        this:void,
        object:T,
        getterWrapper:GetterFunction|null = null,
        setterWrapper:null|SetterFunction = null,
        methodNames:Mapping = {},
        deep = true,
        typesToExtend:Array<unknown> = [Object]
    ):ProxyType<T>|T {
        if (deep && typeof object === 'object')
            if (Array.isArray(object)) {
                let index = 0
                for (const value of object) {
                    object[index] = Tools.addDynamicGetterAndSetter<unknown>(
                        value, getterWrapper, setterWrapper, methodNames, deep
                    )

                    index += 1
                }
            } else if (Tools.isMap(object))
                for (const [key, value] of object)
                    object.set(key, Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
            else if (Tools.isSet(object)) {
                const cache:Array<unknown> = []
                for (const value of object) {
                    object.delete(value)
                    cache.push(Tools.addDynamicGetterAndSetter(
                        value, getterWrapper, setterWrapper, methodNames, deep)
                    )
                }

                for (const value of cache)
                    object.add(value)
            } else if (object !== null)
                for (const [key, value] of Object.entries(object))
                    (object as unknown as Mapping<unknown>)[key] =
                        Tools.addDynamicGetterAndSetter<
                            T[Extract<keyof T, string>]
                        >(
                            value as T[Extract<keyof T, string>],
                            getterWrapper,
                            setterWrapper,
                            methodNames,
                            deep
                        ) as unknown as T[Extract<keyof T, string>]

        if (getterWrapper || setterWrapper)
            for (const type of typesToExtend)
                if (
                    object !== null &&
                    typeof object === 'object' &&
                    object instanceof (type as AnyFunction)
                ) {
                    const defaultHandler:ProxyHandler<T> =
                        Tools.getProxyHandler<T>(object, methodNames)
                    const handler:ProxyHandler<T> =
                        Tools.getProxyHandler<T>(object, methodNames)

                    if (getterWrapper)
                        handler.get = (
                            target:T, name:string|symbol
                        ):unknown => {
                            if (name === '__target__')
                                return object

                            if (name === '__revoke__')
                                return ():unknown => {
                                    revoke()

                                    return object
                                }

                            if (typeof object[name as keyof T] === 'function')
                                return object[name as keyof T]

                            return getterWrapper(
                                defaultHandler.get(proxy as T, name),
                                name,
                                object
                            )
                        }

                    if (setterWrapper)
                        handler.set = (
                            target:T, name:string|symbol, value:unknown
                        ):boolean =>
                            defaultHandler.set(
                                proxy as T,
                                name,
                                setterWrapper(name, value, object)
                            )
                    const {proxy, revoke} =
                        Proxy.revocable({}, handler as ProxyHandler<object>)

                    return proxy as ProxyType<T>
                }

        return object
    }
    /**
     * Converts given object into its serialized json representation by
     * replacing circular references with a given provided value.
     *
     * This method traverses given object recursively and tracks of seen and
     * already serialized structures to reuse generated strings or mark a
     * circular reference.
     * @param object - Object to serialize.
     * @param determineCircularReferenceValue - Callback to create a fallback
     * value depending on given redundant value.
     * @param numberOfSpaces - Number of spaces to use for string formatting.
     *
     * @returns The formatted json string.
     */
    static convertCircularObjectToJSON(
        this:void,
        object:unknown,
        determineCircularReferenceValue:((
            serializedValue:unknown,
            key:null|string,
            value:unknown,
            seenObjects:Map<unknown, unknown>
        ) => unknown) = (serializedValue:unknown):unknown =>
            serializedValue ?? '__circularReference__',
        numberOfSpaces = 0
    ):ReturnType<typeof JSON.stringify>|undefined {
        const seenObjects:Map<unknown, unknown> = new Map<unknown, unknown>()

        const stringifier = (object:unknown):string => {
            const replacer = (key:null|string, value:unknown):unknown => {
                if (value !== null && typeof value === 'object') {
                    if (seenObjects.has(value))
                        return determineCircularReferenceValue(
                            seenObjects.get(value) ?? null,
                            key,
                            value,
                            seenObjects
                        )

                    // NOTE: Set before traversing deeper to detect cycles.
                    seenObjects.set(value, null)

                    let result:Array<unknown>|Mapping<unknown>
                    if (Array.isArray(value)) {
                        result = []
                        for (const item of value)
                            result.push(replacer(null, item))
                    } else {
                        result = {}
                        for (const [name, subValue] of Object.entries(value))
                            result[name] = replacer(name, subValue)
                    }

                    seenObjects.set(value, result)

                    return result
                }

                return value
            }

            return JSON.stringify(object, replacer, numberOfSpaces)
        }

        return stringifier(object)
    }
    /**
     * Converts given map and all nested found maps objects to corresponding
     * object.
     * @param object - Map to convert to.
     * @param deep - Indicates whether to perform a recursive conversion.
     *
     * @returns Given map as object.
     */
    static convertMapToPlainObject(
        this:void, object:unknown, deep = true
    ):unknown {
        if (typeof object === 'object') {
            if (Tools.isMap(object)) {
                const newObject:Mapping<unknown> = {}
                for (let [key, value] of object) {
                    if (deep)
                        value = Tools.convertMapToPlainObject(value, deep)

                    if (['number', 'string'].includes(typeof key))
                        newObject[`${key as string}`] = value
                }

                return newObject
            }

            if (deep)
                if (Tools.isPlainObject(object))
                    for (const [key, value] of Object.entries(object))
                        (object as Mapping<unknown>)[key] =
                            Tools.convertMapToPlainObject(value, deep)
                else if (Array.isArray(object)) {
                    let index = 0

                    for (const value of object as Array<unknown>) {
                        (object as Array<unknown>)[index] =
                            Tools.convertMapToPlainObject(value, deep)

                        index += 1
                    }
                } else if (Tools.isSet(object)) {
                    const cache:Array<unknown> = []

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
     *
     * @returns Given object as map.
     */
    static convertPlainObjectToMap(
        this:void, object:unknown, deep = true
    ):unknown {
        if (typeof object === 'object') {
            if (Tools.isPlainObject(object)) {
                const newObject:Map<number|string, unknown> = new Map()
                for (const [key, value] of Object.entries(object)) {
                    if (deep)
                        (object as Mapping<unknown>)[key] =
                            Tools.convertPlainObjectToMap(value, deep) as
                                Primitive

                    newObject.set(key, (object as Mapping<unknown>)[key])
                }

                return newObject
            }

            if (deep)
                if (Array.isArray(object)) {
                    let index = 0
                    for (const value of object as Array<unknown>) {
                        (object as Array<unknown>)[index] =
                            Tools.convertPlainObjectToMap(value, deep)

                        index += 1
                    }
                } else if (Tools.isMap(object))
                    for (const [key, value] of object)
                        object.set(
                            key, Tools.convertPlainObjectToMap(value, deep)
                        )
                else if (Tools.isSet(object)) {
                    const cache:Array<unknown> = []

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
     *
     * @returns Converted object with replaced patterns.
     */
    static convertSubstringInPlainObject<
        Type extends Mapping<unknown> = PlainObject
    >(
        this:void,
        object:Type,
        pattern:RegExp|string,
        replacement:string
    ):Type {
        for (const [key, value] of Object.entries(object))
            if (Tools.isPlainObject(value))
                object[key as keyof Type] =
                    Tools.convertSubstringInPlainObject<PlainObject>(
                        value as unknown as PlainObject,
                        pattern,
                        replacement
                    ) as unknown as ValueOf<Type>
            else if (typeof value === 'string')
                (object as unknown as Mapping)[key] =
                    (value as unknown as string).replace(pattern, replacement)

        return object
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
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
     * @param knownReferences - Used to avoid traversing loops and not to copy
     * references e.g. to objects not to copy (e.g. symbol polyfills).
     * @param recursionLevel - Internally used to track current recursion
     * level in given source data structure.
     *
     * @returns Value "true" if both objects are equal and "false" otherwise.
     */
    static copy<Type = unknown>(
        this:void,
        source:Type,
        recursionLimit = -1,
        recursionEndValue:unknown = ValueCopySymbol,
        destination:null|Type = null,
        cyclic = false,
        knownReferences:Array<unknown> = [],
        recursionLevel = 0
    ):Type {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (source !== null && typeof source === 'object')
            if (destination) {
                if (source === destination)
                    throw new Error(
                        `Can't copy because source and destination are ` +
                        'identical.'
                    )

                if (
                    !cyclic &&
                    ![undefined, null].includes(source as unknown as null)
                ) {
                    const index:number = knownReferences.indexOf(source)
                    if (index !== -1)
                        return knownReferences[index] as Type

                    knownReferences.push(source)
                }

                const copyValue = <V>(value:V):null|V => {
                    if (
                        recursionLimit !== -1 &&
                        recursionLimit < recursionLevel + 1
                    )
                        return recursionEndValue === ValueCopySymbol ?
                            value :
                            recursionEndValue as null|V

                    const result:null|V = Tools.copy(
                        value,
                        recursionLimit,
                        recursionEndValue,
                        null,
                        cyclic,
                        knownReferences,
                        recursionLevel + 1
                    )

                    if (
                        !cyclic &&
                        ![undefined, null].includes(
                            value as unknown as null
                        ) &&
                        typeof value === 'object'
                    )
                        knownReferences.push(value)

                    return result
                }

                if (Array.isArray(source))
                    for (const item of source)
                        (destination as unknown as Array<unknown>)
                            .push(copyValue(item))
                else if (source instanceof Map)
                    for (const [key, value] of source)
                        (destination as unknown as Map<unknown, unknown>)
                            .set(key, copyValue(value))
                else if (source instanceof Set)
                    for (const value of source)
                        (destination as unknown as Set<unknown>)
                            .add(copyValue(value))
                else
                    for (const [key, value] of Object.entries(source))
                        try {
                            (destination as Mapping<ValueOf<Type>>)[key] =
                                copyValue<ValueOf<Type>>(
                                    value as ValueOf<Type>
                                )!
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
                        ([] as unknown as Type),
                        cyclic,
                        knownReferences,
                        recursionLevel
                    )

                if (source instanceof Map)
                    return Tools.copy(
                        source,
                        recursionLimit,
                        recursionEndValue,
                        (new Map() as unknown as Type),
                        cyclic,
                        knownReferences,
                        recursionLevel
                    )

                if (source instanceof Set)
                    return Tools.copy(
                        source,
                        recursionLimit,
                        recursionEndValue,
                        (new Set() as unknown as Type),
                        cyclic,
                        knownReferences,
                        recursionLevel
                    )

                if (source instanceof Date)
                    return new Date(source.getTime()) as unknown as Type

                if (source instanceof RegExp) {
                    const modifier = /[^/]*$/.exec(source.toString())
                    destination = new RegExp(
                        source.source,
                        modifier ? modifier[0] : undefined
                    ) as unknown as Type
                    (destination as unknown as RegExp).lastIndex =
                        source.lastIndex

                    return destination
                }

                if (typeof Blob !== 'undefined' && source instanceof Blob)
                    return source.slice(0, source.size, source.type) as
                        unknown as
                        Type

                return Tools.copy(
                    source,
                    recursionLimit,
                    recursionEndValue,
                    ({} as unknown as Type),
                    cyclic,
                    knownReferences,
                    recursionLevel
                )
            }

        return destination || source
    }
    /**
     * Determine the internal JavaScript [[Class]] of an object.
     * @param value - Value to analyze.
     *
     * @returns Name of determined type.
     */
    static determineType(this:void, value:unknown = undefined):string {
        if ([null, undefined].includes(value as null|undefined))
            return `${value as string}`

        const type:string = typeof value

        if (
            ['function', 'object'].includes(type) &&
            (value as Mapping).toString
        ) {
            const stringRepresentation:string =
                Tools.classToTypeMapping.toString.call(value)

            if (Object.prototype.hasOwnProperty.call(
                Tools.classToTypeMapping, stringRepresentation
            ))
                return Tools.classToTypeMapping[stringRepresentation]
        }

        return type
    }
    /**
     * Returns true if given items are equal for given property list. If
     * property list isn't set all properties will be checked. All keys which
     * starts with one of the exception prefixes will be omitted.
     * @param firstValue - First object to compare.
     * @param secondValue - Second object to compare.
     *
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
     *
     * @returns Value "true" if both objects are equal and "false" otherwise.
     * If "compareBlobs" is activated and we're running in a browser like
     * environment and binary data is given, then a promise wrapping the
     * determined boolean values is returned.
     */
    static equals(
        this:void,
        firstValue:unknown,
        secondValue:unknown,
        givenOptions:Partial<CompareOptions> = {}
    ):boolean|Promise<boolean|string>|string {
        const options:CompareOptions = {
            compareBlobs: false,
            deep: -1,
            exceptionPrefixes: [],
            ignoreFunctions: true,
            properties: null,
            returnReasonIfNotEqual: false,
            ...givenOptions
        }

        if (
            options.ignoreFunctions &&
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
            options.compareBlobs &&
            eval('typeof Buffer') !== 'undefined' &&
            (eval('Buffer') as typeof Buffer).isBuffer &&
            firstValue instanceof eval('Buffer') &&
            secondValue instanceof eval('Buffer') &&
            (firstValue as Buffer).toString('base64') ===
                (secondValue as Buffer).toString('base64')
        )
            return true

        if (
            options.compareBlobs &&
            typeof Blob !== 'undefined' &&
            firstValue instanceof Blob &&
            secondValue instanceof Blob
        )
            return new Promise<boolean|string>((
                resolve:(_value:boolean|string) => void
            ):void => {
                const values:Array<ArrayBuffer|null|string> = []
                for (const value of [firstValue, secondValue]) {
                    const fileReader:FileReader = new FileReader()
                    fileReader.onload = (event:Event):void => {
                        if (event.target === null)
                            values.push(null)
                        else
                            values.push((event.target as FileReader).result)

                        if (values.length === 2)
                            if (values[0] === values[1])
                                resolve(true)
                            else
                                resolve(options.returnReasonIfNotEqual ?
                                    `>>> Blob(${Tools.represent(values[0])})` +
                                    ' !== Blob(' +
                                    `${Tools.represent(values[1])})` :
                                    false
                                )
                    }

                    fileReader.readAsDataURL(value)
                }
            })

        if (
            Tools.isPlainObject(firstValue) &&
            Tools.isPlainObject(secondValue) &&
            !(firstValue instanceof RegExp || secondValue instanceof RegExp) ||
            Array.isArray(firstValue) &&
            Array.isArray(secondValue) &&
            firstValue.length === secondValue.length ||
            (
                (
                    Tools.determineType(firstValue) ===
                        Tools.determineType(secondValue) &&
                    ['map', 'set'].includes(Tools.determineType(firstValue))
                ) &&
                (firstValue as Set<unknown>).size ===
                    (secondValue as Set<unknown>).size
            )
        ) {
            const promises:Array<Promise<boolean|string>> = []
            for (const [first, second] of [
                [firstValue, secondValue],
                [secondValue, firstValue]
            ]) {
                const firstIsArray:boolean = Array.isArray(first)
                if (
                    firstIsArray &&
                    (
                        !Array.isArray(second) ||
                        (first as Array<unknown>).length !==
                            (second as Array<unknown>).length
                    )
                )
                    return options.returnReasonIfNotEqual ? '.length' : false

                const firstIsMap:boolean = Tools.isMap(first)
                if (
                    firstIsMap &&
                    (
                        !Tools.isMap(second) ||
                        (first as Map<unknown, unknown>).size !== second.size
                    )
                )
                    return options.returnReasonIfNotEqual ? '.size' : false

                const firstIsSet:boolean = Tools.isSet(first)
                if (
                    firstIsSet &&
                    (
                        !Tools.isSet(second) ||
                        (first as Set<unknown>).size !== second.size
                    )
                )
                    return options.returnReasonIfNotEqual ? '.size' : false

                if (firstIsArray) {
                    let index = 0
                    for (const value of first as Array<unknown>) {
                        if (options.deep !== 0) {
                            const result:(
                                boolean|Promise<boolean|string>|string
                            ) = Tools.equals(
                                value,
                                (second as Array<unknown>)[index],
                                {...options, deep: options.deep - 1}
                            )

                            if (!result)
                                return false

                            const currentIndex:number = index

                            const determineResult = (
                                result:boolean|string
                            ):boolean|string =>
                                typeof result === 'string' ?
                                    `[${currentIndex}]` +
                                    ({'[': '', '>': ' '}[result[0]] ?? '.') +
                                    result :
                                    result

                            if ((result as Promise<boolean|string>)?.then)
                                promises.push((
                                    result as Promise<boolean|string>
                                ).then(determineResult))

                            if (typeof result === 'string')
                                return determineResult(result)
                        }

                        index += 1
                    }
                /* eslint-disable curly */
                } else if (firstIsMap) {
                    for (const [key, value] of first as Map<unknown, unknown>)
                        if (options.deep !== 0) {
                            const result:(
                                boolean|Promise<boolean|string>|string
                            ) = Tools.equals(
                                value,
                                (second as Map<unknown, unknown>).get(key),
                                {...options, deep: options.deep - 1}
                            )

                            if (!result)
                                return false

                            const determineResult = (
                                result:boolean|string
                            ):boolean|string =>
                                typeof result === 'string' ?
                                    `get(${Tools.represent(key)})` +
                                    ({'[': '', '>': ' '}[result[0]] ?? '.') +
                                    result :
                                    result

                            if ((result as Promise<boolean|string>)?.then)
                                promises.push((
                                    result as Promise<boolean|string>
                                ).then(determineResult))

                            if (typeof result === 'string')
                                return determineResult(result)
                        }
                } else if (firstIsSet) {
                /* eslint-enable curly */
                    for (const value of first as Set<unknown>)
                        if (options.deep !== 0) {
                            let equal = false
                            const subPromises:Array<Promise<boolean|string>> =
                                []
                            /*
                                NOTE: Check if their exists at least one being
                                equally.
                            */
                            for (const secondValue of second as Set<unknown>) {
                                const result:(
                                    boolean|Promise<boolean|string>|string
                                ) = Tools.equals(
                                    value,
                                    secondValue,
                                    {...options, deep: options.deep - 1}
                                )

                                if (typeof result === 'boolean') {
                                    if (result) {
                                        equal = true
                                        break
                                    }
                                } else
                                    subPromises.push(
                                        result as Promise<boolean|string>
                                    )
                            }


                            const determineResult = (
                                equal:boolean
                            ):boolean|string => equal ?
                                true :
                                options.returnReasonIfNotEqual ?
                                    `>>> {-> ${Tools.represent(value)} not ` +
                                    'found}' :
                                    false

                            if (equal)
                                /*
                                    NOTE: We do not have to wait for promises
                                    to be resolved when one match could be
                                    found.
                                */
                                continue

                            if (subPromises.length)
                                promises.push(new Promise<boolean|string>((
                                    resolve:(_value:boolean|string) => void
                                ):void => {
                                    Promise.all<boolean|string>(
                                        subPromises
                                    ).then(
                                        (results:Array<boolean|string>):void =>
                                            resolve(determineResult(
                                                results.some(Tools.identity)
                                            )),
                                        Tools.noop
                                    )
                                }))

                            return determineResult(false)
                        }
                } else
                    for (const [key, value] of Object.entries(
                        first as Mapping<unknown>
                    )) {
                        if (
                            options.properties &&
                            !options.properties.includes(key)
                        )
                            break

                        let doBreak = false
                        for (
                            const exceptionPrefix of
                            options.exceptionPrefixes
                        )
                            if (key.toString().startsWith(
                                exceptionPrefix
                            )) {
                                doBreak = true
                                break
                            }

                        if (doBreak)
                            break

                        if (options.deep !== 0) {
                            const result:(
                                boolean|Promise<boolean|string>|string
                            ) = Tools.equals(
                                value,
                                (second as Mapping<unknown>)[key],
                                {...options, deep: options.deep - 1}
                            )

                            if (!result)
                                return false

                            const determineResult = (
                                result:boolean|string
                            ):boolean|string =>
                                typeof result === 'string' ?
                                    (
                                        key +
                                        ({'[': '', '>': ' '}[result[0]] ??
                                            '.'
                                        ) +
                                        result
                                    ) :
                                    result

                            if ((result as Promise<boolean|string>)?.then)
                                promises.push((
                                    result as Promise<boolean|string>
                                ).then(determineResult))

                            if (typeof result === 'string')
                                return determineResult(result)
                        }
                    }
            }

            if (promises.length)
                return new Promise<boolean|string>((
                    resolve:(_value:boolean|string) => void
                ):void => {
                    Promise.all(promises).then(
                        (results:Array<boolean|string>):void => {
                            for (const result of results)
                                if (!result || typeof result === 'string') {
                                    resolve(result)

                                    break
                                }

                            resolve(true)
                        },
                        Tools.noop
                    )
                })

            return true
        }

        return options.returnReasonIfNotEqual ?
            `>>> ${Tools.represent(firstValue)} !== ` +
            Tools.represent(secondValue) :
            false
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
     *
     * @returns Evaluated given mapping.
     */
    static evaluateDynamicData<Type = unknown>(
        this:void,
        object:null|RecursiveEvaluateable<Type>,
        scope:Mapping<unknown> = {},
        selfReferenceName = 'self',
        expressionIndicatorKey = '__evaluate__',
        executionIndicatorKey = '__execute__'
    ):Type {
        if (typeof object !== 'object' || object === null)
            return object as unknown as Type

        if (!(selfReferenceName in scope))
            scope[selfReferenceName] = object

        const evaluate = (
            code:string, type:string = expressionIndicatorKey
        ):unknown => {
            const evaluated:EvaluationResult = Tools.stringEvaluate(
                code, scope, type === executionIndicatorKey
            )

            if (evaluated.error)
                throw new Error(evaluated.error)

            return evaluated.result
        }

        const addProxyRecursively = (data:unknown):unknown => {
            if (
                typeof data !== 'object' ||
                data === null ||
                typeof Proxy === 'undefined'
            )
                return data

            for (const [key, givenValue] of Object.entries(data))
                if (
                    key !== '__target__' &&
                    givenValue !== null &&
                    typeof givenValue === 'object'
                ) {
                    const value:unknown = givenValue

                    addProxyRecursively(value)
                    /*
                        NOTE: We only wrap needed objects for performance
                        reasons.
                    */
                    if (
                        Object.prototype.hasOwnProperty.call(
                            value, expressionIndicatorKey
                        ) ||
                        Object.prototype.hasOwnProperty.call(
                            value, executionIndicatorKey
                        )
                    ) {
                        const backup:Mapping<unknown> =
                            value as Mapping<unknown>
                        (data as Mapping<ProxyType>)[key] = new Proxy(
                            value as {[key:string|symbol]:unknown},
                            {
                                get: (
                                    target:{[key:string|symbol]:unknown},
                                    key:string|symbol
                                ):unknown => {
                                    if (key === '__target__')
                                        return target

                                    if (key === 'hasOwnProperty')
                                        return target[key]

                                    /*
                                        NOTE: Very complicated section, do only
                                        changes while having good tests.
                                    */
                                    for (const type of [
                                        expressionIndicatorKey,
                                        executionIndicatorKey
                                    ])
                                        if (
                                            key === type &&
                                            typeof target[key] === 'string'
                                        )
                                            return resolve(evaluate(
                                                target[key] as string, type
                                            ))

                                    const resolvedTarget:unknown =
                                        resolve(target)
                                    if (key === 'toString') {
                                        const result:Mapping<UnknownFunction> =
                                            evaluate(
                                                resolvedTarget as string
                                            ) as Mapping<UnknownFunction>

                                        return result[key].bind(result)
                                    }

                                    if (typeof key !== 'string') {
                                        const result:{[key:symbol]:unknown} =
                                            evaluate(
                                                resolvedTarget as string
                                            ) as {[key:symbol]:unknown}

                                        if ((
                                            result[key] as null|UnknownFunction
                                        )?.bind)
                                            return (
                                                result[key] as UnknownFunction
                                            ).bind(result)

                                        return result[key]
                                    }

                                    for (const type of [
                                        expressionIndicatorKey,
                                        executionIndicatorKey
                                    ])
                                        if (Object.prototype.hasOwnProperty
                                            .call(target, type)
                                        )
                                            return (evaluate(
                                                resolvedTarget as string, type
                                            ) as Mapping<unknown>)[key]

                                    return (
                                        resolvedTarget as Mapping<unknown>
                                    )[key]
                                    // End of complicated stuff.
                                },
                                ownKeys: (
                                    target:Mapping<unknown>
                                ):Array<string> => {
                                    for (const type of [
                                        expressionIndicatorKey,
                                        executionIndicatorKey
                                    ])
                                        if (Object.prototype.hasOwnProperty
                                            .call(target, type)
                                        )
                                            return Object.getOwnPropertyNames(
                                                resolve(evaluate(
                                                    target[type] as string,
                                                    type
                                                ))
                                            )

                                    return Object.getOwnPropertyNames(target)
                                }
                            }
                        ) as ProxyType

                        /*
                            NOTE: Known proxy polyfills does not provide the
                            "__target__" api.
                        */
                        if (!(data as Mapping<ProxyType>)[key].__target__)
                            (data as Mapping<ProxyType>)[key].__target__ =
                                backup
                    }
                }

            return data
        }

        const resolve = (data:unknown):unknown => {
            if (data !== null && typeof data === 'object') {
                if (Tools.isProxy(data)) {
                    // NOTE: We have to skip "ownKeys" proxy trap here.
                    for (const type of [
                        expressionIndicatorKey, executionIndicatorKey
                    ])
                        if (Object.prototype.hasOwnProperty.call(data, type))
                            return (data as Mapping<unknown>)[type]

                    data = data.__target__
                }

                for (const [key, value] of Object.entries(
                    data as Mapping<unknown>
                )) {
                    if ([
                        expressionIndicatorKey, executionIndicatorKey
                    ].includes(key)) {
                        if (typeof Proxy === 'undefined')
                            return resolve(evaluate(value as string))

                        return value
                    }

                    (data as Mapping<unknown>)[key] = resolve(value)
                }
            }

            return data
        }

        scope.resolve = resolve
        const removeProxyRecursively = (data:unknown):unknown => {
            if (data !== null && typeof data === 'object')
                for (const [key, value] of Object.entries(data))
                    if (
                        key !== '__target__' &&
                        value !== null &&
                        ['function', 'undefined'].includes(typeof value)
                    ) {
                        const target:unknown =
                            (value as {__target__:unknown}).__target__
                        if (typeof target !== 'undefined')
                            (data as Mapping<unknown>)[key] = target
                        removeProxyRecursively(value)
                    }

            return data
        }

        if (object !== null && typeof object === 'object')
            if (Object.prototype.hasOwnProperty.call(
                object, expressionIndicatorKey
            ))
                return evaluate(object[
                    expressionIndicatorKey as keyof RecursiveEvaluateable<Type>
                ]) as Type
            else if (Object.prototype.hasOwnProperty.call(
                object, executionIndicatorKey
            ))
                return evaluate(
                    object[
                        executionIndicatorKey as
                            keyof RecursiveEvaluateable<Type>
                    ],
                    executionIndicatorKey
                ) as Type

        return removeProxyRecursively(resolve(addProxyRecursively(object))) as
            Type
    }
    /**
     * Removes properties in objects where a dynamic indicator lives.
     * @param data - Object to traverse recursively.
     * @param expressionIndicators - Property key to remove.
     *
     * @returns Given object with removed properties.
     */
    static removeKeysInEvaluation<
        T extends Mapping<unknown> = Mapping<unknown>
    >(
        this:void,
        data:T,
        expressionIndicators:Array<string> = ['__evaluate__', '__execute__']
    ):T {
        for (const [key, value] of Object.entries(data))
            if (
                !expressionIndicators.includes(key) &&
                expressionIndicators.some((name:string):boolean =>
                    Object.prototype.hasOwnProperty.call(
                        data as unknown as Mapping<unknown>, name
                    )
                )
            )
                delete (data as unknown as Mapping<unknown>)[key]
            else if (Tools.isPlainObject(value))
                Tools.removeKeysInEvaluation(value, expressionIndicators)

        return data
    }
    /**
     * Extends given target object with given sources object. As target and
     * sources many expandable types are allowed but target and sources have to
     * to come from the same type.
     * @param targetOrDeepIndicator - Maybe the target or deep indicator.
     * @param targetOrSource - Target or source object; depending on first
     * argument.
     * @param additionalSources - Source objects to extend into target.
     *
     * @returns Returns given target extended with all given sources.
     */
    static extend<T = Mapping<unknown>>(
        this:void,
        targetOrDeepIndicator:(
            boolean|typeof IgnoreNullAndUndefinedSymbol|RecursivePartial<T>
        ),
        targetOrSource?:RecursivePartial<T>,
        ...additionalSources:Array<RecursivePartial<T>>
    ):T {
        let deep:boolean|typeof IgnoreNullAndUndefinedSymbol = false
        let sources:Array<RecursivePartial<T>> = additionalSources
        let target:RecursivePartial<T>|undefined

        if (
            targetOrDeepIndicator === IgnoreNullAndUndefinedSymbol ||
            typeof targetOrDeepIndicator === 'boolean'
        ) {
            // Handle a deep copy situation and skip deep indicator and target.
            deep = targetOrDeepIndicator as
                boolean|typeof IgnoreNullAndUndefinedSymbol
            target = targetOrSource
        } else {
            target = targetOrDeepIndicator
            if (targetOrSource !== null && typeof targetOrSource === 'object')
                sources = [targetOrSource, ...sources]
            else if (targetOrSource !== undefined)
                target = targetOrSource
        }

        const mergeValue = (
            targetValue:ValueOf<T>, value:ValueOf<T>
        ):ValueOf<T> => {
            if (value === targetValue)
                return targetValue

            // Traverse recursively if we're merging plain objects or maps.
            if (
                deep &&
                value &&
                (Tools.isPlainObject(value) || Tools.isMap(value))
            ) {
                let clone:ValueOf<T>
                if (Tools.isMap(value))
                    clone = (targetValue && Tools.isMap(targetValue)) ?
                        targetValue :
                        new Map() as unknown as ValueOf<T>
                else
                    clone = (targetValue && Tools.isPlainObject(targetValue)) ?
                        targetValue :
                        {} as unknown as ValueOf<T>

                return Tools.extend<ValueOf<T>>(deep, clone, value)
            }

            return value
        }

        for (const source of sources) {
            let targetType:string = typeof target
            let sourceType:string = typeof source

            if (Tools.isMap(target))
                targetType += ' Map'
            if (Tools.isMap(source))
                sourceType += ' Map'

            if (targetType === sourceType && target !== source)
                if (Tools.isMap(target) && Tools.isMap(source))
                    for (const [key, value] of source)
                        target.set(
                            key,
                            mergeValue(
                                target.get(key) as ValueOf<T>,
                                value as ValueOf<T>
                            )
                        )
                else if (
                    target !== null &&
                    !Array.isArray(target) &&
                    typeof target === 'object' &&
                    source !== null &&
                    !Array.isArray(source) &&
                    typeof source === 'object'
                ) {
                    for (const [key, value] of Object.entries(source))
                        if (!(
                            deep === IgnoreNullAndUndefinedSymbol &&
                            [null, undefined].includes(value as null)
                        ))
                            target[key as keyof T] = mergeValue(
                                target[key as keyof T] as ValueOf<T>,
                                value as ValueOf<T>
                            )
                } else
                    target = source
            else
                target = source
        }

        return target as T
    }
    /**
     * Retrieves substructure in given object referenced by given selector
     * path.
     * @param target - Object to search in.
     * @param selector - Selector path.
     * @param skipMissingLevel - Indicates to skip missing level in given path.
     * @param delimiter - Delimiter to delimit given selector components.
     *
     * @returns Determined sub structure of given data or "undefined".
     */
    static getSubstructure<T = unknown, E = unknown>(
        this:void,
        target:T,
        selector:Selector<T, E>,
        skipMissingLevel = true,
        delimiter = '.'
    ):E {
        let path:Array<BaseSelector<T, E>> = []
        for (const component of ([] as Array<BaseSelector<T, E>>).concat(
            selector
        ))
            if (typeof component === 'string') {
                const parts:Array<string> = component.split(delimiter)
                for (const part of parts) {
                    if (!part)
                        continue

                    const subParts:Array<string>|null =
                        part.match(/(.*?)(\[[0-9]+\])/g)
                    if (subParts)
                        // NOTE: We add index assignments into path array.
                        for (const subPart of subParts) {
                            const [, prefix, indexAssignment] =
                                /(.*?)(\[[0-9]+\])/.exec(subPart)!

                            if (prefix)
                                path.push(prefix)

                            // Trim bracket padding "[index]" => "index".
                            path.push(indexAssignment.substring(
                                1, indexAssignment.length - 1
                            ))
                        }
                    else
                        path.push(part)
                }
            } else
                path = path.concat(component)

        let result:unknown = target
        for (const selector of path)
            if (result !== null && typeof result === 'object') {
                if (
                    typeof selector === 'string' &&
                    Object.prototype.hasOwnProperty.call(result, selector)
                )
                    result = (result as Mapping<unknown>)[selector]
                else if (Tools.isFunction(selector))
                    result = selector(result as unknown as T)
                else if (!skipMissingLevel)
                    return undefined as unknown as E
            } else if (!skipMissingLevel)
                return undefined as unknown as E

        return result as E
    }
    /**
     * Generates a proxy handler which forwards all operations to given object
     * as there wouldn't be a proxy.
     * @param target - Object to proxy.
     * @param methodNames - Mapping of operand name to object specific method
     * name.
     *
     * @returns Determined proxy handler.
     */
    static getProxyHandler<T = unknown>(
        this:void, target:T, methodNames:Mapping = {}
    ):ProxyHandler<T> {
        methodNames = {
            delete: '[]',
            get: '[]',
            has: '[]',
            set: '[]',
            ...methodNames
        }

        return {
            deleteProperty: (targetObject:T, key:string|symbol):boolean => {
                if (methodNames.delete === '[]' && typeof key === 'string')
                    delete target[key as keyof T]
                else
                    return (
                        target[methodNames.delete as keyof T] as
                            unknown as
                            (key:string|symbol) => boolean
                    )(key)

                return true
            },
            get: (targetObject:T, key:string|symbol):unknown => {
                if (methodNames.get === '[]' && typeof key === 'string')
                    return target[key as keyof T]

                return (
                    target[methodNames.get as keyof T] as
                        unknown as
                        (key:string|symbol) => unknown
                )(key)
            },
            has: (targetObject:T, key:string|symbol):boolean => {
                if (methodNames.has === '[]')
                    return key in (target as object)

                return (
                    target[methodNames.has as keyof T] as
                        unknown as
                        (key:string|symbol) => boolean
                )(key)
            },
            set: (
                targetObject:T, key:string|symbol, value:unknown
            ):boolean => {
                if (methodNames.set === '[]' && typeof key === 'string')
                    target[key as keyof T] = value as T[keyof T]
                else
                    return (target[methodNames.set as keyof T] as
                        unknown as
                        (key:string|symbol, value:unknown) => boolean
                    )(key, value)

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
     *
     * @returns Given but sliced object. If (nested) object will be modified a
     * flat copy of that object will be returned.
     */
    static mask<Type extends Mapping<unknown> = Mapping<unknown>>(
        this:void, object:Type, mask:ObjectMaskConfiguration
    ):RecursivePartial<Type> {
        mask = {exclude: false, include: true, ...mask}

        if (
            mask.exclude === true ||
            mask.include === false ||
            typeof object !== 'object'
        )
            return {}

        let result:Partial<Type> = {} as Partial<Type>
        if (Tools.isPlainObject(mask.include)) {
            for (const [key, value] of Object.entries(mask.include))
                if (Object.prototype.hasOwnProperty.call(object, key))
                    if (value === true)
                        result[key as keyof Type] = object[key as keyof Type]
                    else if (
                        Tools.isPlainObject(value) &&
                        typeof object[key as keyof Type] === 'object'
                    )
                        (result as Mapping<Mapping<unknown>>)[key] =
                            Tools.mask(
                                (object as Mapping<Mapping<unknown>>)[key],
                                {include: value}
                            )
        } else
            // In this branch "mask.include === true" holds.
            result = object

        if (Tools.isPlainObject(mask.exclude)) {
            let useCopy = false
            const copy:RecursivePartial<Type> = {...result}

            for (const [key, value] of Object.entries(mask.exclude))
                if (Object.prototype.hasOwnProperty.call(copy, key))
                    if (value === true) {
                        useCopy = true

                        delete copy[key as keyof Type]
                    } else if (
                        Tools.isPlainObject(value) &&
                        typeof copy[key as keyof Type] === 'object'
                    ) {
                        const current:ValueOf<Type> =
                            copy[key as keyof Type] as ValueOf<Type>

                        ;(copy as Mapping<Mapping<unknown>>)[key] =
                            Tools.mask(
                                (copy as Mapping<Mapping<unknown>>)[key],
                                {exclude: value}
                            )

                        if (
                            copy[key as keyof Type] as ValueOf<Type> !==
                                current
                        )
                            useCopy = true
                    }

            if (useCopy)
                result = copy
        }

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
     *
     * @returns Given target modified with given source.
     */
    static modifyObject<T = unknown>(
        this:void,
        target:T,
        source:unknown,
        removeIndicatorKey = '__remove__',
        prependIndicatorKey = '__prepend__',
        appendIndicatorKey = '__append__',
        positionPrefix = '__',
        positionSuffix = '__',
        parentSource:unknown = null,
        parentKey:unknown = null
    ):T|null {
        /* eslint-disable curly */
        if (Tools.isMap(source) && Tools.isMap(target)) {
            for (const [key, value] of source)
                if (target.has(key))
                    Tools.modifyObject<ValueOf<T>>(
                        target.get(key) as ValueOf<T>,
                        value as Map<unknown, unknown>|Mapping<unknown>|null,
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
            for (const [key, sourceValue] of Object.entries(source)) {
                let index = NaN
                if (
                    Array.isArray(target) &&
                    key.startsWith(positionPrefix) &&
                    key.endsWith(positionSuffix)
                ) {
                    index = parseInt(
                        key.substring(
                            positionPrefix.length,
                            key.length -
                            positionSuffix.length
                        ),
                        10
                    )
                    if (index < 0 || index >= target.length)
                        index = NaN
                }

                if (
                    [
                        removeIndicatorKey,
                        prependIndicatorKey,
                        appendIndicatorKey
                    ].includes(key) ||
                    !isNaN(index)
                ) {
                    if (Array.isArray(target))
                        if (key === removeIndicatorKey) {
                            const values:Array<unknown> =
                                ([] as Array<unknown>).concat(sourceValue)
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
                        } else if (key === appendIndicatorKey)
                            target = target.concat(sourceValue) as unknown as T
                        else if (key === prependIndicatorKey)
                            target = ([] as Array<unknown>)
                                .concat(sourceValue)
                                .concat(target) as unknown as T
                        else if (
                            target[index] !== null &&
                            typeof target[index] === 'object' &&
                            sourceValue !== null &&
                            typeof sourceValue === 'object'
                        )
                            Tools.extend(
                                true,
                                Tools.modifyObject<
                                    RecursivePartial<ValueOf<T>>
                                >(
                                    target[index] as
                                        RecursivePartial<ValueOf<T>>,
                                    sourceValue as
                                        RecursivePartial<ValueOf<T>>,
                                    removeIndicatorKey,
                                    prependIndicatorKey,
                                    appendIndicatorKey,
                                    positionPrefix,
                                    positionSuffix
                                )!,
                                target[index] as
                                    RecursivePartial<ValueOf<T>>,
                                sourceValue as RecursivePartial<ValueOf<T>>
                            )
                        else
                            target[index] = sourceValue as ValueOf<T>
                    else if (key === removeIndicatorKey)
                        for (const value of ([] as Array<unknown>).concat(
                            sourceValue
                        ))
                            if (
                                typeof value === 'string' &&
                                Object.prototype.hasOwnProperty.call(
                                    target, value
                                )
                            )
                                delete (
                                    target as unknown as Mapping<unknown>
                                )[value]
                    delete (source as Mapping<unknown>)[key]

                    if (parentSource && typeof parentKey === 'string')
                        delete (
                            parentSource as Mapping<unknown>
                        )[parentKey]
                } else if (
                    target !== null &&
                    Object.prototype.hasOwnProperty.call(target, key)
                )
                    (target as unknown as Mapping<unknown>)[key] =
                        Tools.modifyObject<ValueOf<T>>(
                            (target as unknown as Mapping<ValueOf<T>>)[key],
                            sourceValue,
                            removeIndicatorKey,
                            prependIndicatorKey,
                            appendIndicatorKey,
                            positionPrefix,
                            positionSuffix,
                            source,
                            key
                        )
            }

        return target
    }
    /**
     * Interprets a date object from given artefact.
     * @param value - To interpret.
     * @param interpretAsUTC - Identifies if given date should be interpret as
     * utc. If not set given strings will be interpret as it is depending on
     * given format and numbers as utc.
     *
     * @returns Interpreted date object or "null" if given value couldn't be
     * interpret.
     */
    static normalizeDateTime(
        this:void,
        value:string|null|number|Date = null,
        interpretAsUTC?:null|boolean
    ):Date|null {
        let resolvedInterpretAsUTC = Boolean(interpretAsUTC)

        if (value === null)
            return new Date()

        if (typeof value === 'string') {
            /*
                We make a simple pre-check to determine if it could be a date
                like representation. Idea: There should be at least some
                numbers and separators.
            */
            if (/^.*(?:(?:[0-9]{1,4}[^0-9]){2}|[0-9]{1,4}[^0-9.]).*$/.test(
                value
            )) {
                value = Tools.stringInterpretDateTime(
                    value, resolvedInterpretAsUTC
                )

                if (value === null)
                    return value

                return value
            }

            const floatRepresentation:number = parseFloat(value)
            if (`${floatRepresentation}` === value)
                value = floatRepresentation
        }

        if (typeof value === 'number') {
            if ([null, undefined].includes(interpretAsUTC as null))
                resolvedInterpretAsUTC = true

            return new Date(
                (
                    value +
                    (resolvedInterpretAsUTC ?
                        0 :
                        (new Date().getTimezoneOffset() * 60)
                    )
                ) *
                1000
            )
        }

        // Try to deal with types which are either numbers or strings.
        const result = new Date(value)

        if (isNaN(result.getDate()))
            return null

        return result
    }
    /**
     * Removes given key from given object recursively.
     * @param object - Object to process.
     * @param keys - List of keys to remove.
     *
     * @returns Processed given object.
     */
    static removeKeyPrefixes<T>(
        this:void, object:T, keys:Array<string>|string = '#'
    ):T {
        const resolvedKeys:Array<string> = ([] as Array<string>).concat(keys)

        if (Array.isArray(object)) {
            let index = 0
            for (const subObject of object.slice()) {
                let skip = false
                if (typeof subObject === 'string') {
                    for (const key of resolvedKeys)
                        if (subObject.startsWith(`${key}:`)) {
                            (object as Array<string>).splice(index, 1)

                            skip = true
                            break
                        }

                    if (skip)
                        continue
                }

                (object as Array<unknown>)[index] =
                    Tools.removeKeyPrefixes(subObject, resolvedKeys)

                index += 1
            }
        } else if (Tools.isSet(object))
            for (const subObject of new Set(object)) {
                let skip = false

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

                Tools.removeKeyPrefixes(subObject, resolvedKeys)
            }
        else if (Tools.isMap(object))
            for (const [key, subObject] of new Map(object)) {
                let skip = false

                if (typeof key === 'string') {
                    for (const resolvedKey of resolvedKeys) {
                        const escapedKey =
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

                object.set(
                    key, Tools.removeKeyPrefixes(subObject, resolvedKeys)
                )
            }
        else if (object !== null && typeof object === 'object')
            for (const [key, value] of Object.entries(Object.assign(
                {}, object
            ))) {
                let skip = false

                for (const resolvedKey of resolvedKeys) {
                    const escapedKey:string =
                        Tools.stringEscapeRegularExpressions(resolvedKey)

                    if (new RegExp(`^${escapedKey}[0-9]*$`).test(key)) {
                        delete (object as unknown as Mapping<unknown>)[key]
                        skip = true
                        break
                    }
                }

                if (skip)
                    continue

                // eslint-disable-next-line @typescript-eslint/no-extra-semi
                ;(object as unknown as Mapping<unknown>)[key] =
                    Tools.removeKeyPrefixes(value, resolvedKeys)
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
     *
     * @returns Representation string.
     */
    static represent(
        this:void,
        object:unknown,
        indention = '    ',
        initialIndention = '',
        maximumNumberOfLevelsReachedIdentifier:number|string =
        '__maximum_number_of_levels_reached__',
        numberOfLevels = 8
    ):string {
        if (numberOfLevels === 0)
            return `${maximumNumberOfLevelsReachedIdentifier}`

        if (object === null)
            return 'null'

        if (object === undefined)
            return 'undefined'

        if (typeof object === 'string')
            return `"${object.replace(/\n/g, `\n${initialIndention}`)}"`

        if (Tools.isNumeric(object) || typeof object === 'boolean')
            return `${object as unknown as string}`

        if (Array.isArray(object)) {
            let result = '['

            let firstSeen = false
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
                result += `\n${initialIndention}`

            result += ']'

            return result
        }

        if (Tools.isMap(object)) {
            let result = ''

            let firstSeen = false
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
            let result = '{'

            let firstSeen = false
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

        if (Tools.isFunction(object))
            return '__function__'

        let result = '{'
        const keys:Array<string> = Object.getOwnPropertyNames(object).sort()
        let firstSeen = false
        for (const key of keys) {
            if (firstSeen)
                result += ','

            result += `\n${initialIndention}${indention}${key}: ` +
                Tools.represent(
                    (object as Mapping<unknown>)[key],
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
     *
     * @returns Sorted list of given keys.
     */
    static sort(this:void, object:unknown):Array<unknown> {
        const keys:Array<unknown> = []

        if (Array.isArray(object))
            for (let index = 0; index < object.length; index++)
                keys.push(index)
        else if (typeof object === 'object')
            if (Tools.isMap(object))
                for (const keyValuePair of object)
                    keys.push(keyValuePair[0])
            else if (object !== null)
                for (const key of Object.keys(object))
                    keys.push(key)

        return keys.sort()
    }
    /**
     * Removes a proxy from given data structure recursively.
     * @param object - Object to proxy.
     * @param seenObjects - Tracks all already processed objects to avoid
     * endless loops (usually only needed for internal purpose).
     *
     * @returns Returns given object unwrapped from a dynamic proxy.
     */
    static unwrapProxy<T = unknown>(
        this:void,
        object:ProxyType<T>|T,
        seenObjects:Set<unknown> = new Set<unknown>()
    ):T {
        if (object !== null && typeof object === 'object') {
            if (seenObjects.has(object))
                return object

            try {
                if (Tools.isFunction((object as ProxyType<T>).__revoke__)) {
                    if (Tools.isProxy(object))
                        object = object.__target__

                    // eslint-disable-next-line indent
                    ;(object as unknown as ProxyType<T>).__revoke__!()
                }
            } catch (error) {
                return object
            } finally {
                seenObjects.add(object)
            }

            if (Array.isArray(object)) {
                let index = 0
                for (const value of object) {
                    object[index] =
                        Tools.unwrapProxy<unknown>(value, seenObjects)

                    index += 1
                }
            } else if (Tools.isMap(object))
                for (const [key, value] of object)
                    object.set(key, Tools.unwrapProxy(value, seenObjects))
            else if (Tools.isSet(object)) {
                const cache:Array<unknown> = []

                for (const value of object) {
                    object.delete(value)
                    cache.push(Tools.unwrapProxy(value, seenObjects))
                }

                for (const value of cache)
                    object.add(value)
            } else
                for (const [key, value] of Object.entries(
                    object as unknown as object
                ))
                    object[key as keyof T] =
                        Tools.unwrapProxy(value, seenObjects) as ValueOf<T>
        }

        return object
    }
    /// endregion
    /// region array
    /**
     * Summarizes given property of given item list.
     * @param data - Array of objects with given property name.
     * @param propertyName - Property name to summarize.
     * @param defaultValue - Value to return if property values doesn't match.
     *
     * @returns Aggregated value.
     */
    static arrayAggregatePropertyIfEqual<T = unknown>(
        this:void,
        data:Array<Mapping<unknown>>,
        propertyName:string,
        defaultValue:T = '' as unknown as T
    ):T {
        let result:T = defaultValue

        if (
            Array.isArray(data) &&
            data.length &&
            Object.prototype.hasOwnProperty.call(data[0], propertyName)
        ) {
            result = data[0][propertyName] as T

            for (const item of Tools.arrayMake<Mapping<unknown>>(data))
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
     *
     * @returns Given data without empty items.
     */
    static arrayDeleteEmptyItems<
        T extends Mapping<unknown> = Mapping<unknown>
    >(
        this:void, data:Array<T>, propertyNames:Array<string|symbol> = []
    ):Array<T> {
        const result:Array<T> = []

        for (const item of Tools.arrayMake<T>(data)) {
            let empty = true

            for (const [propertyName, value] of Object.entries(item))
                if (
                    !['', null, undefined].includes(value as null) &&
                    (
                        !propertyNames.length ||
                        Tools.arrayMake(propertyNames).includes(propertyName)
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
     *
     * @returns Data with sliced items.
     */
    static arrayExtract<T = Mapping<unknown>>(
        this:void, data:unknown, propertyNames:Array<string>
    ):Array<T> {
        const result:Array<T> = []

        for (const item of Tools.arrayMake<Mapping<unknown>>(data)) {
            const newItem:T = {} as T
            for (const propertyName of Tools.arrayMake<string>(
                propertyNames
            ))
                if (Object.prototype.hasOwnProperty.call(item, propertyName))
                    newItem[propertyName as keyof T] =
                        item[propertyName] as ValueOf<T>

            result.push(newItem)
        }

        return result
    }
    /**
     * Extracts all values which matches given regular expression.
     * @param data - Data to filter.
     * @param regularExpression - Pattern to match for.
     *
     * @returns Filtered data.
     */
    static arrayExtractIfMatches(
        this:void, data:unknown, regularExpression:string|RegExp
    ):Array<string> {
        if (!regularExpression)
            return Tools.arrayMake<string>(data)

        const result:Array<string> = []
        for (const value of Tools.arrayMake<string>(data))
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
     *
     * @returns Given data without the items which doesn't have specified
     * property.
     */
    static arrayExtractIfPropertyExists<
        T extends Mapping<unknown> = Mapping<unknown>
    >(this:void, data:unknown, propertyName:string):Array<T> {
        if (data && propertyName) {
            const result:Array<T> = []

            for (const item of Tools.arrayMake<T>(data)) {
                let exists = false
                for (const [key, value] of Object.entries(item))
                    if (
                        key === propertyName &&
                        ![null, undefined].includes(value as null)
                    ) {
                        exists = true
                        break
                    }

                if (exists)
                    result.push(item)
            }

            return result
        }

        return data as Array<T>
    }
    /**
     * Extract given data where specified property value matches given
     * patterns.
     * @param data - Data to filter.
     * @param propertyPattern - Mapping of property names to pattern.
     *
     * @returns Filtered data.
     */
    static arrayExtractIfPropertyMatches<T = unknown>(
        this:void, data:unknown, propertyPattern:Mapping<RegExp|string>
    ):Array<T> {
        if (data && propertyPattern) {
            const result:Array<T> = []

            for (const item of Tools.arrayMake<T>(data)) {
                let matches = true
                for (const propertyName in propertyPattern)
                    if (!(
                        propertyPattern[propertyName] &&
                        (
                            (typeof propertyPattern[propertyName] ===
                                'string'
                            ) ?
                                new RegExp(propertyPattern[propertyName]) :
                                propertyPattern[propertyName] as RegExp
                        ).test((item as unknown as Mapping)[propertyName])
                    )) {
                        matches = false
                        break
                    }

                if (matches)
                    result.push(item)
            }

            return result
        }

        return data as Array<T>
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
     *
     * @returns Data which does exit in given initial data.
     */
    static arrayIntersect<T = unknown>(
        this:void,
        first:unknown,
        second:unknown,
        keys:Array<string>|Mapping<number|string> = [],
        strict = true
    ):Array<T> {
        const containingData:Array<T> = []

        second = Tools.arrayMake(second)

        const intersectItem = (
            firstItem:Mapping<unknown>,
            secondItem:Mapping<unknown>,
            firstKey:string|number,
            secondKey:string|number,
            keysAreAnArray:boolean,
            iterateGivenKeys:boolean
        ):false|void => {
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
                        [null, undefined].includes(
                            secondItem[secondKey] as null
                        ) &&
                        [null, undefined].includes(firstItem[firstKey] as null)
                    )
                )
            )
                return false
        }

        for (const firstItem of Tools.arrayMake<T>(first))
            if (Tools.isPlainObject(firstItem))
                for (const secondItem of (second as Array<T>)) {
                    let exists = true
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
                        keys = firstItem as Mapping<number|string>
                    }

                    if (Array.isArray(keys)) {
                        let index = 0
                        for (const key of keys) {
                            if (intersectItem(
                                firstItem,
                                secondItem as unknown as Mapping<unknown>,
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
                        for (const [key, value] of Object.entries(keys))
                            if (intersectItem(
                                firstItem,
                                secondItem as unknown as Mapping<unknown>,
                                key,
                                value,
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
            else if ((second as Array<T>).includes(firstItem))
                containingData.push(firstItem)

        return containingData
    }
    /**
     * Converts given object into an array.
     * @param object - Target to convert.
     *
     * @returns Generated array.
     */
    static arrayMake<T = unknown>(this:void, object:unknown):Array<T> {
        const result:Array<unknown> = []
        if (![null, undefined].includes(object as null))
            if (Tools.isArrayLike(Object(object)))
                Tools.arrayMerge(
                    result,
                    typeof object === 'string' ? [object] : object as Array<T>
                )
            else
                result.push(object)

        return result as Array<T>
    }
    /**
     * Creates a list of items within given range.
     * @param range - Array of lower and upper bounds. If only one value is
     * given lower bound will be assumed to be zero. Both integers have to be
     * positive and will be contained in the resulting array. If more than two
     * numbers are provided given range will be returned.
     * @param step - Space between two consecutive values.
     * @param ignoreLastStep - Removes last step.
     *
     * @returns Produced array of integers.
     */
    static arrayMakeRange(
        this:void,
        range:number|[number]|[number, number]|Array<number>,
        step = 1,
        ignoreLastStep = false
    ):Array<number> {
        range = ([] as Array<number>).concat(range)

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

        if (higherBound < index)
            return []

        const result = [index]
        while (index <= higherBound - step) {
            index += step
            if (!ignoreLastStep || index <= higherBound - step)
                result.push(index)
        }

        return result
    }
    /**
     * Merge the contents of two arrays together into the first array.
     * @param target - Target array.
     * @param source - Source array.
     *
     * @returns Target array with merged given source one.
     */
    static arrayMerge<T = unknown>(
        this:void, target:Array<T>, source:Array<T>
    ):Array<T> {
        if (!Array.isArray(source))
            source = Array.prototype.slice.call(source) as Array<T>

        for (const value of source)
            target.push(value)

        return target
    }
    /**
     * Generates a list if pagination symbols to render a pagination from.
     * @param options - Configure bounds and current page of pagination to
     * determine.
     * @param options.boundaryCount - Indicates where to start pagination
     * within given total range.
     * @param options.disabled - Indicates whether to disable all items.
     * @param options.hideNextButton - Indicates whether to show a jump to next
     * item.
     * @param options.hidePrevButton - Indicates whether to show a jump to
     * previous item.
     * @param options.page - Indicates current visible page.
     * @param options.pageSize - Number of items per page.
     * @param options.showFirstButton - Indicates whether to show a jump to
     * first item.
     * @param options.showLastButton - Indicates whether to show a jump to last
     * item.
     * @param options.siblingCount - Number of sibling page symbols next to
     * current page symbol.
     * @param options.total - Number of all items to paginate.
     *
     * @returns A list of pagination symbols.
     */
    static arrayPaginate(
        this:void, options:Partial<PaginateOptions> = {}
    ):Array<Page> {
        const {
            boundaryCount = 1,
            disabled = false,
            hideNextButton = false,
            hidePrevButton = false,
            page = 1,
            pageSize = 5,
            showFirstButton = false,
            showLastButton = false,
            siblingCount = 4,
            total = 100
        } = options

        const numberOfPages:number =
            typeof pageSize === 'number' && !isNaN(pageSize) ?
                Math.ceil(total / pageSize) :
                total

        const startPages:Array<number> =
            Tools.arrayMakeRange([1, Math.min(boundaryCount, numberOfPages)])
        const endPages:Array<number> = Tools.arrayMakeRange([
            Math.max(numberOfPages - boundaryCount + 1, boundaryCount + 1),
            numberOfPages
        ])

        const siblingsStart:number = Math.max(
            Math.min(
                // Left boundary for lower pages.
                page - siblingCount,
                // Lower boundary for higher pages.
                numberOfPages - boundaryCount - siblingCount * 2 - 1
            ),
            // If number is greater than number of "startPages".
            boundaryCount + 2
        )

        const siblingsEnd:number = Math.min(
            Math.max(
                // Right bound for higher pages.
                page + siblingCount,
                // Upper boundary for lower pages.
                boundaryCount + siblingCount * 2 + 2
            ),
            // If number is less than number of "endPages".
            endPages.length > 0 ? endPages[0] - 2 : numberOfPages - 1
        )

        /*
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
        */
        return ([
            ...(showFirstButton ? ['first'] : []),
            ...(hidePrevButton ? [] : ['previous']),
            ...startPages,

            // Start ellipsis
            ...(
                siblingsStart > boundaryCount + 2 ?
                    ['start-ellipsis'] :
                    boundaryCount + 1 < numberOfPages - boundaryCount ?
                        [boundaryCount + 1] :
                        []
            ),

            // Sibling pages
            ...Tools.arrayMakeRange([siblingsStart, siblingsEnd]),

            // End ellipsis
            ...(
                siblingsEnd < numberOfPages - boundaryCount - 1 ?
                    ['end-ellipsis'] :
                    numberOfPages - boundaryCount > boundaryCount ?
                        [numberOfPages - boundaryCount] :
                        []
            ),

            ...endPages,
            ...(hideNextButton ? [] : ['next']),
            ...(showLastButton ? ['last'] : [])
        ] as Array<number|PageType>).map((item:number|PageType):Page =>
            typeof item === 'number' ?
                {
                    disabled,
                    page: item,
                    selected: item === page,
                    type: 'page'
                } :
                {
                    disabled:
                        disabled ||
                        (
                            item.indexOf('ellipsis') === -1 &&
                            (
                                item === 'next' || item === 'last' ?
                                    page >= numberOfPages :
                                    page <= 1
                            )
                        ),
                    selected: false,
                    type: item,
                    ...(item.endsWith('-ellipsis') ?
                        {} :
                        {page:
                            {
                                first: 1,
                                last: numberOfPages
                            }[item as 'first'|'last'] ??
                                item === 'next' ?
                                Math.min(page + 1, numberOfPages) :
                                // NOTE: Is "previous" type.
                                Math.max(page - 1, 1)
                        }
                    )
                }
        )
    }
    /**
     * Generates all permutations of given iterable.
     * @param data - Array like object.
     *
     * @returns Array of permuted arrays.
     */
    static arrayPermutate<T = unknown>(
        this:void, data:Array<T>
    ):Array<Array<T>> {
        const result:Array<Array<T>> = []

        const permute = (
            currentData:Array<T>, dataToMixin:Array<T> = []
        ):void => {
            if (currentData.length === 0)
                result.push(dataToMixin)
            else
                for (let index = 0; index < currentData.length; index++) {
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
     *
     * @returns Array of permuted arrays.
     */
    static arrayPermutateLength<T = unknown>(
        this:void, data:Array<T>, minimalSubsetLength = 1
    ):Array<Array<T>> {
        const result:Array<Array<T>> = []
        if (data.length === 0)
            return result

        const generate = (
            index:number, source:Array<T>, rest:Array<T>
        ):void => {
            if (index === 0) {
                if (rest.length > 0)
                    result[result.length] = rest

                return
            }

            for (
                let sourceIndex = 0; sourceIndex < source.length; sourceIndex++
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
     *
     * @returns The aggregated value.
     */
    static arraySumUpProperty(
        this:void, data:unknown, propertyName:string
    ):number {
        let result = 0

        if (Array.isArray(data) && data.length)
            for (const item of data)
                if (Object.prototype.hasOwnProperty.call(item, propertyName))
                    result += parseFloat(
                        ((item as Mapping)[propertyName] || 0) as
                            unknown as
                            string
                    )

        return result
    }
    /**
     * Adds an item to another item as array connection (many to one).
     * @param item - Item where the item should be appended to.
     * @param target - Target to add to given item.
     * @param name - Name of the target connection.
     * @param checkIfExists - Indicates if duplicates are allowed in resulting
     * list (will result in linear runtime instead of constant one).
     *
     * @returns Item with the appended target.
     */
    static arrayAppendAdd<T = unknown>(
        this:void,
        item:Mapping<T>,
        target:unknown,
        name:string,
        checkIfExists = true
    ):Mapping<T> {
        if (Object.prototype.hasOwnProperty.call(item, name)) {
            if (!(
                checkIfExists &&
                (item[name] as unknown as Array<unknown>).includes(target)
            ))
                (item[name] as unknown as Array<unknown>).push(target)
        } else
            (item as Mapping<unknown>)[name] = [target]

        return item
    }
    /**
     * Removes given target on given list.
     * @param list - Array to splice.
     * @param target - Target to remove from given list.
     * @param strict - Indicates whether to fire an exception if given target
     * doesn't exists given list.
     *
     * @returns Item with the appended target.
     */
    static arrayRemove<T = unknown>(
        this:void, list:Array<T>, target:T, strict = false
    ):Array<T> {
        const index:number = list.indexOf(target)
        if (index === -1) {
            if (strict)
                throw new Error(
                    `Given target doesn't exists in given list.`
                )
        } else
            list.splice(index, 1)

        return list
    }
    /**
     * Sorts given object of dependencies in a topological order.
     * @param items - Items to sort.
     *
     * @returns Sorted array of given items respecting their dependencies.
     */
    static arraySortTopological(
        this:void, items:Mapping<Array<string>|string>
    ):Array<string> {
        const edges:Array<Array<string>> = []

        for (const [name, value] of Object.entries(items)) {
            items[name] = ([] as Array<string>).concat(value)
            if (value.length > 0)
                for (const dependencyName of Tools.arrayMake<string>(value))
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
        const visit = (node:string, predecessors:Array<string>):void => {
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
                        // Recursively traverse to node dependencies.
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
                        // Recursively traverse to node dependencies.
                        visit(edge[1], [node])

                sorted.push(node)
            }
        }

        return sorted
    }
    /**
     * Makes all values in given iterable unique by removing duplicates (The
     * first occurrences will be left).
     * @param data - Array like object.
     *
     * @returns Sliced version of given object.
     */
    static arrayUnique<T = unknown>(this:void, data:Array<T>):Array<T> {
        const result:Array<T> = []

        for (const value of Tools.arrayMake(data))
            if (!result.includes(value as T))
                result.push(value as T)

        return result
    }
    /// endregion
    /// region string
    //// region url handling
    /**
     * Translates given string into the regular expression validated
     * representation.
     * @param value - String to convert.
     * @param excludeSymbols - Symbols not to escape.
     *
     * @returns Converted string.
     */
    static stringEscapeRegularExpressions(
        this:void, value:string, excludeSymbols:Array<string> = []
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
     *
     * @returns Converted name is returned.
     */
    static stringConvertToValidVariableName(
        this:void, name:string, allowedSymbols = '0-9a-zA-Z_$'
    ):string {
        if (['class', 'default'].includes(name))
            return `_${name}`

        return name
            .toString()
            .replace(/^[^a-zA-Z_$]+/, '')
            .replace(
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
     *
     * @returns Encoded given url.
     */
    static stringEncodeURIComponent(
        this:void, url:string, encodeSpaces = false
    ):string {
        return encodeURIComponent(url)
            .replace(/%40/gi, '@')
            .replace(/%3A/gi, ':')
            .replace(/%24/g, '$')
            .replace(/%2C/gi, ',')
            .replace(/%20/g, encodeSpaces ? '%20' : '+')
    }
    /**
     * Appends a path selector to the given path if there isn't one yet.
     * @param path - The path for appending a selector.
     * @param pathSeparator - The selector for appending to path.
     *
     * @returns The appended path.
     */
    static stringAddSeparatorToPath(
        this:void, path:string, pathSeparator = '/'
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
     *
     * @returns Value "true" if given prefix occur and "false" otherwise.
     */
    static stringHasPathPrefix(
        this:void,
        prefix:unknown = '/admin',
        path:string = $.location?.pathname || '',
        separator = '/'
    ):boolean {
        if (typeof prefix === 'string') {
            if (!prefix.endsWith(separator))
                prefix += separator

            return (
                path ===
                    prefix.substring(0, prefix.length - separator.length) ||
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
     *
     * @returns Extracted domain.
     */
    static stringGetDomainName(
        this:void,
        url:string = $.location?.href || '',
        fallback:string = $.location?.hostname || ''
    ):string {
        const result:Array<string>|null =
            /^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url)

        if (result && result.length > 2 && result[1] && result[2])
            return result[2]

        return fallback
    }
    /**
     * Extracts port number from given url. If no explicit port number given
     * and no fallback is defined current port number will be assumed for local
     * links. For external links 80 will be assumed for http protocols and 443
     * for https protocols.
     * @param url - The url to extract port from.
     * @param fallback - Fallback port number if no explicit one was found.
     * Default is derived from current protocol name.
     *
     * @returns Extracted port number.
     */
    static stringGetPortNumber(
        this:void,
        url:string = $.location?.href || '',
        fallback:null|number = $.location?.port ?
            parseInt($.location.port) :
            null
    ):null|number {
        const result:Array<string>|null =
            /^(?:[a-z]*:?\/\/[^/]+?)?(?:[^/]+?):([0-9]+)/i.exec(url)

        if (result && result.length > 1)
            return parseInt(result[1], 10)

        if (fallback !== null)
            return fallback

        if (
            // NOTE: Would result in an endless loop:
            // Tools.stringServiceURLEquals(url, ...parameters) &&
            $.location?.port &&
            parseInt($.location.port, 10)
        )
            return parseInt($.location.port, 10)

        return Tools.stringGetProtocolName(url) === 'https' ? 443 : 80
    }
    /**
     * Extracts protocol name from given url. If no explicit url is given,
     * current protocol will be assumed. If no parameter given current protocol
     * number will be determined.
     * @param url - The url to extract protocol from.
     * @param fallback - Fallback port to use if no protocol exists in given
     * url (default is current protocol).
     *
     * @returns Extracted protocol.
     */
    static stringGetProtocolName(
        this:void,
        url:string = $.location?.href || '',
        fallback:string = (
            $.location?.protocol &&
            $.location.protocol.substring(0, $.location.protocol.length - 1) ||
            ''
        )
    ):string {
        const result:Array<string>|null = /^([a-z]+):\/\//i.exec(url)

        if (result && result.length > 1 && result[1])
            return result[1]

        return fallback
    }
    /**
     * Read a page's GET URL variables and return them as an associative array
     * and preserves ordering.
     * @param keyToGet - If provided the corresponding value for given key is
     * returned or full object otherwise.
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
     *
     * @returns Returns the current get array or requested value. If requested
     * key doesn't exist "undefined" is returned.
     */
    static stringGetURLParameter(
        this:void,
        keyToGet:null|string = null,
        allowDuplicates = false,
        givenInput:null|string = null,
        subDelimiter = '$',
        hashedPathIndicator = '!',
        givenSearch:null|string = null,
        givenHash:string = $.location?.hash ?? ''
    ):Array<string>|null|QueryParameters|string {
        // region set search and hash
        let hash:string = givenHash ?? '#'
        let search = ''
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
                    hashedPathIndicator.length, subHashStartIndex
                )
                hash = hash.substring(subHashStartIndex)
            }
            const subSearchStartIndex:number = pathAndSearch.indexOf('?')
            if (subSearchStartIndex !== -1)
                search = pathAndSearch.substring(subSearchStartIndex)
        } else if ($.location)
            search = $.location.search || ''
        let input:string = givenInput ? givenInput : search
        // endregion
        // region determine data from search and hash if specified
        const both:boolean = input === '&'
        if (both || input === '#') {
            let decodedHash = ''
            try {
                decodedHash = decodeURIComponent(hash)
            } catch (error) {
                // Continue regardless of an error.
            }
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
        let data:Array<string> = input ? input.split('&') : []
        search = search.substring('?'.length)
        if (both && search)
            data = data.concat(search.split('&'))
        // endregion
        // region construct data structure
        const parameters:QueryParameters = [] as unknown as QueryParameters
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

            parameters.push(key)
            if (allowDuplicates)
                if (
                    Object.prototype.hasOwnProperty.call(parameters, key) &&
                    Array.isArray(parameters[key])
                )
                    (parameters[key] as Array<string>).push(value)
                else
                    parameters[key] = [value]
            else
                parameters[key] = value
        }
        // endregion

        if (keyToGet) {
            if (Object.prototype.hasOwnProperty.call(parameters, keyToGet))
                return parameters[keyToGet]

            return null
        }

        return parameters
    }
    /**
     * Checks if given url points to another "service" than second given url.
     * If no second given url provided current url will be assumed.
     * @param url - URL to check against second url.
     * @param referenceURL - URL to check against first url.
     *
     * @returns Returns "true" if given first url has same domain as given
     * second (or current).
     */
    static stringServiceURLEquals(
        this:void, url:string, referenceURL:string = $.location?.href || ''
    ):boolean {
        const domain:string = Tools.stringGetDomainName(url, '')
        const protocol:string = Tools.stringGetProtocolName(url, '')
        const port:null|number = Tools.stringGetPortNumber(url)

        return (
            (
                domain === '' ||
                domain === Tools.stringGetDomainName(referenceURL)
            ) &&
            (
                protocol === '' ||
                protocol === Tools.stringGetProtocolName(referenceURL)
            ) &&
            (port === null || port === Tools.stringGetPortNumber(referenceURL))
        )
    }
    /**
     * Normalized given website url.
     * @param url - Uniform resource locator to normalize.
     *
     * @returns Normalized result.
     */
    static stringNormalizeURL(this:void, url:string):string {
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
     *
     * @returns Represented result.
     */
    static stringRepresentURL(this:void, url:unknown):string {
        if (typeof url === 'string')
            return url
                .replace(/^(https?)?:?\/+/, '')
                .replace(/\/+$/, '')
                .trim()

        return ''
    }
    //// endregion
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Converts a camel cased string to its delimited string version.
     * @param value - The string to format.
     * @param delimiter - Delimiter string
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     *
     * @returns The formatted string.
     */
    static stringCamelCaseToDelimited(
        this:void,
        value:string,
        delimiter = '-',
        abbreviations:Array<string>|null = null
    ):string {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (!abbreviations)
            abbreviations = Tools.abbreviations

        const escapedDelimiter:string =
            Tools.stringMaskForRegularExpression(delimiter)

        if (abbreviations.length) {
            let abbreviationPattern = ''
            for (const abbreviation of abbreviations) {
                if (abbreviationPattern)
                    abbreviationPattern += '|'
                abbreviationPattern += abbreviation.toUpperCase()
            }

            value = value.replace(
                new RegExp(
                    `(${abbreviationPattern})(${abbreviationPattern})`, 'g'
                ),
                `$1${delimiter}$2`
            )
        }

        value = value.replace(
            new RegExp(`([^${escapedDelimiter}])([A-Z][a-z]+)`, 'g'),
            `$1${delimiter}$2`
        )

        return value
            .replace(new RegExp('([a-z0-9])([A-Z])', 'g'), `$1${delimiter}$2`)
            .toLowerCase()
    }
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Converts a string to its capitalize representation.
     * @param string - The string to format.
     *
     * @returns The formatted string.
     */
    static stringCapitalize(this:void, string:string):string {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        return string.charAt(0).toUpperCase() + string.substring(1)
    }
    /**
     * Compresses given style attribute value.
     * @param styleValue - Style value to compress.
     *
     * @returns The compressed value.
     */
    static stringCompressStyleValue(this:void, styleValue:string):string {
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
     *
     * @returns Decoded html string.
     */
    static stringDecodeHTMLEntities(this:void, htmlString:string):null|string {
        if ($.document) {
            const textareaDomNode = $.document.createElement('textarea')
            textareaDomNode.innerHTML = htmlString

            return textareaDomNode.value
        }

        return null
    }
    /**
     * Converts a delimited string to its camel case representation.
     * @param value - The string to format.
     * @param delimiter - Delimiter string to use.
     * @param abbreviations - Collection of shortcut words to represent upper
     * cased.
     * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
     * formatted camel case abbreviations will be ignored.
     * @param removeMultipleDelimiter - Indicates whether a series of delimiter
     * should be consolidated.
     *
     * @returns The formatted string.
     */
    static stringDelimitedToCamelCase(
        this:void,
        value:string,
        delimiter = '-',
        abbreviations:Array<string>|null = null,
        preserveWrongFormattedAbbreviations = false,
        removeMultipleDelimiter = false
    ):string {
        let escapedDelimiter:string =
            Tools.stringMaskForRegularExpression(delimiter)

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

        const stringStartsWithDelimiter:boolean = value.startsWith(delimiter)
        if (stringStartsWithDelimiter)
            value = value.substring(delimiter.length)

        value = value.replace(
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

        value = value.replace(
            new RegExp(`${escapedDelimiter}([a-zA-Z0-9])`, 'g'),
            (fullMatch:string, firstLetter:string):string =>
                firstLetter.toUpperCase()
        )

        if (stringStartsWithDelimiter)
            value = delimiter + value

        return value
    }
    /**
     * Compiles a given string as expression with given scope names.
     * @param expression - The string to interpret.
     * @param scope - Scope to extract names from.
     * @param execute - Indicates whether to execute or evaluate.
     *
     * @returns Object of prepared scope name mappings and compiled function or
     * error string message if given expression couldn't be compiled.
     */
    static stringCompile<T = string, N extends Array<string> = Array<string>>(
        this:void,
        expression:string,
        scope:N|Mapping<unknown, N[number]>|N[number] = [] as unknown as N,
        execute = false
    ):CompilationResult<T, N> {
        const result:CompilationResult<T, N> = {
            error: null,
            originalScopeNames: (
                Array.isArray(scope) ?
                    scope :
                    typeof scope === 'string' ? [scope] : Object.keys(scope)
            ) as N,
            scopeNameMapping: {} as {[key in N[number]]:string},
            scopeNames: [],
            templateFunction: ():T => null as unknown as T
        }

        for (const name of result.originalScopeNames) {
            const newName:string = Tools.stringConvertToValidVariableName(name)
            result.scopeNameMapping[name as N[number]] = newName
            result.scopeNames.push(newName)
        }

        if (Tools.maximalSupportedInternetExplorerVersion !== 0)
            if ($.global.Babel?.transform)
                expression = $.global.Babel?.transform(
                    `(${expression})`,
                    {plugins: ['transform-template-literals']}
                ).code
            else if (
                expression.startsWith('`') && expression.endsWith('`')
            ) {
                const escapeMarker = '####'
                // Convert template string into legacy string concatenations.
                expression = expression
                    // Mark simple escape sequences.
                    .replace(/\\\$/g, escapeMarker)
                    // Handle avoidable template expression: Use raw code.
                    .replace(/^`\$\{([\s\S]+)\}`$/, 'String($1)')
                    // Use plain string with single quotes.
                    .replace(/^`([^']+)`$/, `'$1'`)
                    // Use plain string with double quotes.
                    .replace(/^`([^"]+)`$/, '"$1"')
                // Use single quotes and hope (just a heuristic).
                const quote:string =
                    expression.charAt(0) === '`' ? `'` : expression.charAt(0)
                expression = expression
                    // Replace simple placeholder.
                    // NOTE: Replace complete bracket pairs.
                    .replace(
                        /\$\{((([^{]*{[^}]*}[^}]*})|[^{}]+)+)\}/g,
                        `${quote}+($1)+${quote}`
                    )
                    .replace(/^`([\s\S]+)`$/, `${quote}$1${quote}`)
                    // Remove remaining newlines.
                    .replace(/\n+/g, '')
                    // Replace marked escape sequences.
                    .replace(new RegExp(escapeMarker, 'g'), '\\$')
            }

        try {
            // eslint-disable-next-line @typescript-eslint/no-implied-eval
            result.templateFunction = new Function(
                ...result.scopeNames,
                `${execute ? '' : 'return '}${expression}`
            ) as TemplateFunction<T>
        } catch (error) {
            result.error =
                `Given expression "${expression}" could not be compiled ` +
                `with given scope names "${result.scopeNames.join('", "')}":` +
                ` ${Tools.represent(error)}`
        }

        return result
    }
    /**
     * Evaluates a given string as expression against given scope.
     * @param expression - The string to interpret.
     * @param scope - Scope to render against.
     * @param execute - Indicates whether to execute or evaluate.
     * @param binding - Object to apply as "this" in evaluation scope.
     *
     * @returns Object with error message during parsing / running or result.
     */
    static stringEvaluate<
        T = string, S extends Mapping<unknown> = Mapping<unknown>
    >(
        this:void,
        expression:string,
        scope:S = {} as S,
        execute = false,
        binding?:unknown
    ):EvaluationResult<T> {
        // NOTE: We extract string only types from given scope type.
        type N = Array<keyof S extends string ? keyof S : never>

        const {error, originalScopeNames, scopeNames, templateFunction} =
            Tools.stringCompile<T, N>(expression, scope, execute)

        const result:EvaluationResult<T> = {
            compileError: null,
            error: null,
            result: null as unknown as T,
            runtimeError: null
        }

        if (error) {
            result.compileError = result.error = error

            return result
        }

        try {
            result.result =
                (binding ? templateFunction.bind(binding) : templateFunction)(
                    /*
                        NOTE: We want to be ensure to have same ordering as we
                        have for the scope names and to call internal
                        registered getter by retrieving values. So simple using
                        "...Object.values(scope)" is not appreciate here.
                    */
                    ...originalScopeNames.map((name:keyof S):ValueOf<S> =>
                        scope[name]
                    )
                )
        } catch (error) {
            result.error =
            result.runtimeError = (
                `Given expression "${expression}" could not be evaluated ` +
                `with given scope names "${scopeNames.join('", "')}": ` +
                Tools.represent(error)
            )
        }

        return result
    }
    /**
     * Finds the string match of given query in given target text by applying
     * given normalisation function to target and query.
     * @param target - Target to search in.
     * @param query - Search string to search for.
     * @param normalizer - Function to use as normalisation for queries and
     * search targets.
     * @param skipTagDelimitedParts - Indicates whether to for example ignore
     * html tags via "['<', '>']" (the default).
     *
     * @returns Start and end index of matching range.
     */
    static stringFindNormalizedMatchRange(
        this:void,
        target:unknown,
        query:unknown,
        normalizer = (value:unknown):string =>
            `${value as string}`.toLowerCase(),
        skipTagDelimitedParts:null|[string, string] = ['<', '>']
    ):Array<number>|null {
        const normalizedQuery:string = normalizer(query)
        const normalizedTarget:string = normalizer(target)

        const stringTarget = typeof target === 'string' ?
            target :
            normalizedTarget

        if (normalizedTarget && normalizedQuery) {
            let inTag = false
            for (let index = 0; index < stringTarget.length; index += 1) {
                if (inTag) {
                    if (
                        stringTarget.charAt(index) ===
                            skipTagDelimitedParts![1]
                    )
                        inTag = false

                    continue
                }

                if (
                    Array.isArray(skipTagDelimitedParts) &&
                    stringTarget.charAt(index) === skipTagDelimitedParts[0]
                ) {
                    inTag = true

                    continue
                }

                if (normalizer(stringTarget.substring(index)).startsWith(
                    normalizedQuery
                )) {
                    if (normalizedQuery.length === 1)
                        return [index, index + 1]

                    for (
                        let subIndex = stringTarget.length;
                        subIndex > index;
                        subIndex -= 1
                    )
                        if (!normalizer(stringTarget.substring(
                            index, subIndex
                        )).startsWith(normalizedQuery))
                            return [index, subIndex + 1]
                }
            }
        }

        return null
    }
    /**
     * Fixes known encoding problems in given data.
     * @param data - To process.
     *
     * @returns Processed data.
     */
    static stringFixKnownEncodingErrors(this:void, data:string):string {
        const mapping:Mapping = {
            'Ã\\x84': 'Ä',
            'Ã\\x96': 'Ö',
            'Ã\\x9c': 'Ü',
            'Ã¤': 'ä',
            'Ã¶': 'ö',
            'Ã¼': 'ü',
            'Ã\\x9f': 'ß',
            '\\x96': '-'
        }

        for (const [search, replacement] of Object.entries(mapping))
            data = data.replace(new RegExp(search, 'g'), replacement)

        return data
    }
    /**
     * Performs a string formation. Replaces every placeholder "{i}" with the
     * i'th argument.
     * @param string - The string to format.
     * @param additionalArguments - Additional arguments are interpreted as
     * replacements for string formatting.
     *
     * @returns The formatted string.
     */
    static stringFormat(
        this:void, string:string, ...additionalArguments:Array<unknown>
    ):string {
        additionalArguments.unshift(string)

        let index = 0
        for (const value of additionalArguments) {
            string = string.replace(
                new RegExp(`\\{${index}\\}`, 'gm'), `${value as string}`
            )

            index += 1
        }

        return string
    }
    /**
     * Calculates the edit (levenstein) distance between two given strings.
     * @param first - First string to compare.
     * @param second - Second string to compare.
     *
     * @returns The distance as number.
     */
    static stringGetEditDistance(
        this:void, first:string, second:string
    ):number {
        /*
            Create empty edit distance matrix for all possible modifications of
            substrings of "first" to substrings of "second".
        */
        const distanceMatrix:Array<Array<number>> =
            Array(second.length + 1).fill(null).map(():Array<number> =>
                Array(first.length + 1).fill(null) as Array<number>
            )
        /*
            Fill the first row of the matrix.
            If this is first row then we're transforming empty string to
            "first".
            In this case the number of transformations equals to size of
            "first" substring.
        */
        for (let index = 0; index <= first.length; index++)
            distanceMatrix[0][index] = index
        /*
            Fill the first column of the matrix.
            If this is first column then we're transforming empty string to
            "second".
            In this case the number of transformations equals to size of
            "second" substring.
        */
        for (let index = 0; index <= second.length; index++)
            distanceMatrix[index][0] = index

        for (let firstIndex = 1; firstIndex <= second.length; firstIndex++)
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
     * @param value - The string to format.
     *
     * @returns The formatted string.
     */
    static stringMaskForRegularExpression(this:void, value:string):string {
        return value.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1')
    }
    /**
     * Interprets given content string as date time.
     * @param value - Date time string to interpret.
     * @param interpretAsUTC - Identifies if given date should be interpret as
     * utc. If not set given strings will be interpret as it is depending on
     * given format and number like string as utc.
     *
     * @returns Interpret date time object.
     */
    static stringInterpretDateTime(
        this:void, value:string, interpretAsUTC?:null|boolean
    ):Date|null {
        let resolvedInterpretAsUTC = Boolean(interpretAsUTC)
        // region iso format
        /*
            Let's first check if we have a simplified iso 8602 date time
            representation like:

            "YYYY-MM-DDTHH:mm:ss.sssZ" or "YYYY-MM-DDTHH:mm:ss.sss+HH:mm".

            Please note for the native "Date" implementation:

            When the time zone offset is absent, date-only forms are
            interpreted as a UTC time and date-time forms are
            interpreted as local time. This is due to a historical spec
            error that was not consistent with ISO 8601 but could not
            be changed due to web compatibility.
        */
        const hourAndMinutesPattern = '[0-2][0-9]:[0-6][0-9]'
        const pattern = '^' + (
            // Year, month and day:
            '[0-9]{4}-[01][0-9]-[0-3][0-9]' +
            '(?<time>' + (
                '(?:T' + (
                    hourAndMinutesPattern +
                    '(?:' + (
                        // Seconds:
                        ':[0-6][0-9]' +
                        // Milliseconds:
                        '(?:\\.[0-9]+)?'
                    ) + ')?' +
                    // Timezone definition:
                    `(?<dateTimeTimezone>Z|(?:[+-]${hourAndMinutesPattern}))?`
                ) + ')' +
                '|' +
                // Timezone definition:
                `(?<dateTimezone>Z|(?:[+-]${hourAndMinutesPattern}))`
            ) + ')?'
        ) + '$'
        const match = value.match(new RegExp(pattern, 'i'))
        if (match) {
            const result = new Date(value)

            if (isNaN(result.getDate()))
                return null

            const timezone =
                match.groups?.dateTimeTimezone ?? match.groups?.dateTimezone
            if (!timezone) {
                if ([null, undefined].includes(interpretAsUTC as null))
                    resolvedInterpretAsUTC = false

                if (resolvedInterpretAsUTC) {
                    if (!match.groups?.time)
                        /*
                            NOTE: Date only strings will be interpret as UTC
                            already.
                        */
                        return result

                    // local to utc
                    return new Date(
                        result.getTime() -
                        (new Date().getTimezoneOffset() * 60) * 1000
                    )
                }

                if (match.groups?.time)
                    /*
                        NOTE: Date time strings will be interpret as local
                        already.
                    */
                    return result

                // utc to local
                return new Date(
                    result.getTime() +
                    (new Date().getTimezoneOffset() * 60) * 1000
                )
            }

            return result
        }
        // endregion
        value = value.replace(/^(-?)-*0*([1-9][0-9]*)$/, '$1$2')
        // region interpret integer number
        /*
            NOTE: Do not use "parseFloat" since we want to interpret delimiter
            as date delimiters.
        */
        if (`${parseInt(value)}` === value) {
            if ([null, undefined].includes(interpretAsUTC as null))
                resolvedInterpretAsUTC = true

            return new Date(
                (
                    parseInt(value) +
                    (resolvedInterpretAsUTC ?
                        0 :
                        (new Date().getTimezoneOffset() * 60)
                    )
                ) *
                1000
            )
        }
        // endregion
        // TODO handle am/pm
        if (!Tools._dateTimePatternCache.length) {
            // region pre-compile regular expressions
            /// region pattern
            const millisecondPattern =
                '(?<millisecond>(?:0{0,3}[0-9])|(?:0{0,2}[1-9]{2})|' +
                '(?:0?[1-9]{3})|(?:1[1-9]{3}))'
            const minuteAndSecondPattern = '(?:0?[0-9])|(?:[1-5][0-9])|(?:60)'
            const secondPattern = `(?<second>${minuteAndSecondPattern})`
            const minutePattern = `(?<minute>${minuteAndSecondPattern})`
            const hourPattern = '(?<hour>(?:0?[0-9])|(?:1[0-9])|(?:2[0-4]))'
            const dayPattern = '(?<day>(?:0?[1-9])|(?:[1-2][0-9])|(?:3[01]))'
            const monthPattern = '(?<month>(?:0?[1-9])|(?:1[0-2]))'
            const yearPattern = '(?<year>(?:0?[1-9])|(?:[1-9][0-9]+))'
            /// endregion
            const patternPresenceCache:Mapping<true> = {}
            for (const timeDelimiter of ['t', ' '] as const)
                for (const timeComponentDelimiter of [
                    ':', '/', '-', ' '
                ] as const)
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
                                    pattern = Tools.stringEvaluate(
                                        `\`^${pattern}$\``,
                                        {delimiter: `${delimiter}+`}
                                    ).result
                                    if (
                                        pattern &&
                                        !Object.prototype.hasOwnProperty.call(
                                            patternPresenceCache, pattern
                                        )
                                    ) {
                                        patternPresenceCache[pattern] = true
                                        Tools._dateTimePatternCache.push(
                                            new RegExp(pattern)
                                        )
                                    }
                                }
            // endregion
        }
        // region pre-process
        // NOTE: All patterns can assume lower cased strings.
        value = value.toLowerCase()
        /*
            Reduce each sequence on none alphanumeric symbols to the first
            symbol.
        */
        value = value.replace(/([^0-9a-z])[^0-9a-z]+/g, '$1')

        let monthNumber = 1
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
            let matched = false
            for (const name of monthVariation) {
                const pattern = new RegExp(`(^|[^a-z])${name}([^a-z]|$)`)
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

        const timezonePattern = /(.+)\+(.+)$/
        const timezoneMatch:Array<string>|null = timezonePattern.exec(value)
        if (timezoneMatch)
            value = value.replace(timezonePattern, '$1')

        for (const wordToSlice of ['', 'Uhr', `o'clock`] as const)
            value = value.replace(wordToSlice, '')

        value = value.trim()
        // endregion
        // region try to match a pattern
        for (const dateTimePattern of Tools._dateTimePatternCache) {
            let match:ReturnType<string['match']> = null

            try {
                match = value.match(dateTimePattern)
            } catch (error) {
                // Continue regardless of an error.
            }

            if (match) {
                const get = (name:string, fallback = 0):number =>
                    match?.groups && name in match.groups ?
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
                    const timeShift:Date|null =
                        Tools.stringInterpretDateTime(timezoneMatch[2], true)
                    if (timeShift)
                        result = new Date(
                            Date.UTC(...parameter) - timeShift.getTime()
                        )
                }

                if (!result)
                    if (resolvedInterpretAsUTC)
                        result = new Date(Date.UTC(...parameter))
                    else
                        result = new Date(...parameter)

                if (isNaN(result.getDate()))
                    return null

                return result
            }
        }
        // endregion
        return null
    }
    /**
     * Converts a string to its lower case representation.
     * @param string - The string to format.
     *
     * @returns The formatted string.
     */
    static stringLowerCase(this:void, string:string):string {
        return string.charAt(0).toLowerCase() + string.substring(1)
    }
    /**
     * Wraps given mark strings in given target with given marker.
     * @param target - String to search for marker.
     * @param givenWords - String or array of strings to search in target for.
     * @param options - Defines highlighting behavior.
     * @param options.marker - HTML template string to mark.
     * @param options.normalizer - Pure normalisation function to use before
     * searching for matches.
     * @param options.skipTagDelimitedParts - Indicates whether to for example
     * ignore html tags via "['<', '>']" (the default).
     *
     * @returns Processed result.
     */
    static stringMark(
        this:void,
        target:unknown,
        givenWords?:Array<string>|string,
        options:Partial<StringMarkOptions> = {}
    ):unknown {
        if (typeof target === 'string' && givenWords?.length) {
            options = {
                marker: '<span class="tools-mark">{1}</span>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase(),
                skipTagDelimitedParts: ['<', '>'],
                ...options
            }

            target = target.trim()
            const markedTarget:Array<unknown> = []

            const words:Array<string> =
                ([] as Array<string>).concat(givenWords)
            let index = 0
            for (const word of words) {
                words[index] = options.normalizer!(word).trim()

                index += 1
            }

            let restTarget:string = target as string
            let offset = 0
            /*
                Search for matches as long there is enough target text
                remaining to walk through.
            */
            while (true) {
                let nearestRange:Array<number>|null = null
                let currentRange:Array<number>|null = null

                // Find the nearest next matching word.
                for (const word of words) {
                    currentRange = Tools.stringFindNormalizedMatchRange(
                        restTarget,
                        word,
                        options.normalizer,
                        options.skipTagDelimitedParts
                    )
                    if (
                        currentRange &&
                        (!nearestRange || currentRange[0] < nearestRange[0])
                    )
                        nearestRange = currentRange
                }

                if (nearestRange) {
                    if (nearestRange[0] > 0)
                        markedTarget.push(
                            (target as string)
                                .substring(offset, offset + nearestRange[0])
                        )
                    markedTarget.push(
                        typeof options.marker === 'string' ?
                            Tools.stringFormat(
                                options.marker,
                                (target as string).substring(
                                    offset + nearestRange[0],
                                    offset + nearestRange[1]
                                )
                            ) :
                            options.marker!(
                                (target as string).substring(
                                    offset + nearestRange[0],
                                    offset + nearestRange[1]
                                ),
                                markedTarget
                            )
                    )

                    offset += nearestRange[1]

                    restTarget = (target as string).substring(offset)
                } else {
                    if (restTarget.length)
                        markedTarget.push(restTarget)

                    break
                }
            }

            return typeof options.marker === 'string' ?
                markedTarget.join('') :
                markedTarget
        }

        return target
    }
    /**
     * Normalizes given phone number for automatic dialing or comparison.
     * @param value - Number to normalize.
     * @param dialable - Indicates whether the result should be dialed or
     * represented as lossless data.
     *
     * @returns Normalized number.
     */
    static stringNormalizePhoneNumber(
        this:void, value:unknown, dialable = true
    ):string {
        if (typeof value === 'string' || typeof value === 'number') {
            let normalizedValue:string = `${value}`.trim()

            // Normalize country code prefix.
            normalizedValue = normalizedValue.replace(/^[^0-9]*\+/, '00')

            if (dialable)
                return normalizedValue.replace(/[^0-9]+/g, '')

            const separatorPattern = '(?:[ /\\-]+)'
            // Remove unneeded area code zero in brackets.
            normalizedValue = normalizedValue.replace(
                new RegExp(
                    `^(.+?)${separatorPattern}?\\(0\\)${separatorPattern}?` +
                    '(.+)$'
                ),
                '$1-$2'
            )
            // Remove unneeded area code brackets.
            normalizedValue = normalizedValue.replace(
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
            let compiledPattern = new RegExp(
                `^(00[0-9]+)${separatorPattern}([0-9]+)${separatorPattern}` +
                '(.+)$'
            )

            if (compiledPattern.test(normalizedValue))
                // Country code and area code matched.
                normalizedValue = normalizedValue.replace(compiledPattern, (
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
                compiledPattern = /^([0-9 ]+)[/-](.+)$/
                const replacer = (
                    match:string, prefixCode:string, number:string
                ):string =>
                    `${prefixCode.replace(/ +/, '')}-` +
                    Tools.stringSliceAllExceptNumberAndLastSeperator(number)

                if (compiledPattern.test(normalizedValue))
                    // Prefer "/" or "-" over " " as area code separator.
                    normalizedValue =
                        normalizedValue.replace(compiledPattern, replacer)
                else
                    normalizedValue = normalizedValue.replace(
                        new RegExp(`^([0-9]+)${separatorPattern}(.+)$`),
                        replacer
                    )
            }

            return normalizedValue.replace(/[^0-9-]+/g, '').replace(/^-+$/, '')
        }

        return ''
    }
    /**
     * Normalizes given zip code for automatic address processing.
     * @param value - Number to normalize.
     *
     * @returns Normalized number.
     */
    static stringNormalizeZipCode(this:void, value:unknown):string {
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
     *
     * @returns The parsed object if possible and null otherwise.
     */
    static stringParseEncodedObject<T = PlainObject>(
        this:void,
        serializedObject:string,
        scope:Mapping<unknown> = {},
        name = 'scope'
    ):null|T {
        if (
            serializedObject.endsWith('.json') &&
            Tools.isFileSync(serializedObject)
        )
            serializedObject =
                readFileSync!(serializedObject, {encoding: DEFAULT_ENCODING})

        serializedObject = serializedObject.trim()

        if (!serializedObject.startsWith('{'))
            serializedObject = (eval('Buffer') as typeof Buffer)
                .from(serializedObject, 'base64')
                .toString(DEFAULT_ENCODING)

        const result:EvaluationResult =
            Tools.stringEvaluate(serializedObject, {[name]: scope})

        if (typeof result.result === 'object')
            return result.result

        return null
    }
    /**
     * Represents given phone number. NOTE: Currently only support german phone
     * numbers.
     * @param value - Number to format.
     *
     * @returns Formatted number.
     */
    static stringRepresentPhoneNumber(this:void, value:unknown):string {
        if (
            ['number', 'string'].includes(Tools.determineType(value)) &&
            value
        ) {
            // Represent country code and leading area code zero.
            let normalizedValue:string =
                `${value as string}`
                    .replace(/^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3')

            // Add German country code if not exists.
            normalizedValue =
                normalizedValue.replace(/^0([1-9][0-9-]+)$/, '+49 (0) $1')
            // Separate area code from base number.
            normalizedValue =
                normalizedValue.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2')

            // Partition base number in one triple and tuples or tuples only.
            return normalizedValue.replace(
                /^(.*?)([0-9]+)(-?[0-9]*)$/,
                (
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
     *
     * @returns - Sliced given value.
     */
    static stringSliceAllExceptNumberAndLastSeperator(
        this:void, value:string
    ):string {
        /*
            1: baseNumber
            2: directDialingNumberSuffix
        */
        const compiledPattern = /^(.*[0-9].*)-([0-9]+)$/
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
     *
     * @returns Sliced given string.
     */
    static stringSliceWeekday(this:void, value:string):string {
        const weekdayPattern = /[a-z]{2}\.+ *([^ ].*)$/i
        const weekdayMatch = weekdayPattern.exec(value)

        if (weekdayMatch)
            return value.replace(weekdayPattern, '$1')

        return value
    }
    /**
     * Converts a dom selector to a prefixed dom selector string.
     * @param selector - A dom node selector.
     *
     * @returns Returns given selector prefixed.
     */
    stringNormalizeDomNodeSelector = (selector:string):string => {
        let domNodeSelectorPrefix = ''
        if (this.options.domNodeSelectorPrefix)
            domNodeSelectorPrefix = `${this.options.domNodeSelectorPrefix} `
        if (!(
            selector.startsWith(domNodeSelectorPrefix) ||
            selector.trim().startsWith('<')
        ))
            selector = domNodeSelectorPrefix + selector

        return selector.trim()
    }
    /// endregion
    /// region number
    /**
     * Determines corresponding utc timestamp for given date object.
     * @param value - Date to convert.
     * @param inMilliseconds - Indicates whether given number should be in
     * seconds (default) or milliseconds.
     *
     * @returns Determined numerous value.
     */
    static numberGetUTCTimestamp(
        this:void, value?:Date|null|number|string, inMilliseconds = false
    ):number {
        const date:Date = [null, undefined].includes(value as null) ?
            new Date() :
            new Date(value!)

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
     * @param value - Value to check.
     *
     * @returns Returns whether given value is not a number or not.
     */
    static numberIsNotANumber(this:void, value:unknown):boolean {
        return (
            Tools.determineType(value) === 'number' && isNaN(value as number)
        )
    }
    /**
     * Rounds a given number accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     *
     * @returns Returns the rounded number.
     */
    static numberRound(this:void, number:number, digits = 0):number {
        return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
    /**
     * Rounds a given number up accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     *
     * @returns Returns the rounded number.
     */
    static numberCeil(this:void, number:number, digits = 0):number {
        return Math.ceil(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
    /**
     * Rounds a given number down accurate to given number of digits.
     * @param number - The number to round.
     * @param digits - The number of digits after comma.
     *
     * @returns Returns the rounded number.
     */
    static numberFloor(this:void, number:number, digits = 0):number {
        return Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits)
    }
    /// endregion
    /// region data transfer
    /**
     * Checks if given url response with given status code.
     * @param url - Url to check reachability.
     *
     * @param givenOptions - Options to configure.
     * @param givenOptions.wait - Boolean indicating if we should retry until a
     * status code will be given.
     * @param givenOptions.statusCodes - Status codes to check for.
     * @param givenOptions.timeoutInSeconds - Delay after assuming given
     * resource isn't available if no response is coming.
     * @param givenOptions.pollIntervallInSeconds - Seconds between two tries
     * to reach given url.
     * @param givenOptions.options - Fetch options to use.
     * @param givenOptions.expectedIntermediateStatusCodes - A list of expected
     * but unwanted response codes. If detecting them waiting will continue
     * until an expected (positiv) code occurs or timeout is reached.
     *
     * @returns A promise which will be resolved if a request to given url has
     * finished and resulting status code matches given expected status code.
     * Otherwise returned promise will be rejected.
     */
    static async checkReachability(
        this:void,
        url:string,
        givenOptions:RecursivePartial<CheckReachabilityOptions> = {}
    ):ReturnType<typeof fetch> {
        const options:CheckReachabilityOptions = Tools.extend(
            true,
            {
                expectedIntermediateStatusCodes: [],
                options: {},
                pollIntervallInSeconds: 0.1,
                statusCodes: 200,
                timeoutInSeconds: 10,
                wait: false
            },
            givenOptions
        )

        const statusCodes:Array<number> =
            ([] as Array<number>).concat(options.statusCodes)
        const expectedIntermediateStatusCodes:Array<number> =
            ([] as Array<number>)
                .concat(options.expectedIntermediateStatusCodes)

        const isStatusCodeExpected = (
            response:Response, statusCodes:Array<number>
        ):boolean => Boolean(
            response !== null &&
            typeof response === 'object' &&
            'status' in response &&
            statusCodes.includes(response.status)
        )

        const checkAndThrow = (response:Response):Response => {
            if (!isStatusCodeExpected(response, statusCodes))
                throw new Error(
                    `Given status code ${response.status} differs from ` +
                    `${statusCodes.join(', ')}.`
                )

            return response
        }

        if (options.wait)
            return new Promise<Response>((
                resolve:(response:Response) => void,
                reject:(reason:Error) => void
            ):void => {
                let timedOut = false
                const timer:TimeoutPromise =
                    Tools.timeout(options.timeoutInSeconds * 1000)

                const retryErrorHandler = (error:Error):Error => {
                    if (!timedOut) {
                        // eslint-disable-next-line no-use-before-define
                        currentlyRunningTimer = Tools.timeout(
                            options.pollIntervallInSeconds * 1000, wrapper
                        )
                        /*
                            NOTE: A timer rejection is expected. Avoid
                            throwing errors about unhandled promise
                            rejections.
                        */
                        currentlyRunningTimer.catch(Tools.noop)
                    }

                    return error
                }

                const wrapper = async ():Promise<Error|Response> => {
                    let response:Response
                    try {
                        response =
                            await globalContext.fetch(url, options.options)
                    } catch (error) {
                        return retryErrorHandler(error as Error)
                    }

                    try {
                        resolve(checkAndThrow(response))
                        timer.clear()
                    } catch (error) {
                        if (isStatusCodeExpected(
                            response, expectedIntermediateStatusCodes
                        ))
                            return retryErrorHandler(error as Error)

                        /* eslint-disable prefer-promise-reject-errors */
                        reject(error as Error)
                        /* eslint-enable prefer-promise-reject-errors */
                        timer.clear()
                    }

                    return response
                }

                let currentlyRunningTimer = Tools.timeout(wrapper)

                timer.then(
                    ():void => {
                        timedOut = true
                        currentlyRunningTimer.clear()

                        reject(new Error(
                            `Timeout of ${options.timeoutInSeconds} seconds ` +
                            'reached.'
                        ))
                    },
                    Tools.noop
                )
            })

        return checkAndThrow(await globalContext.fetch(url, options.options))
    }
    /**
     * Checks if given url isn't reachable.
     * @param url - Url to check reachability.
     *
     * @param givenOptions - Options to configure.
     * @param givenOptions.wait - Boolean indicating if we should retry until a
     * status code will be given.
     * @param givenOptions.timeoutInSeconds - Delay after assuming given
     * resource will stay available.
     * @param givenOptions.pollIntervallInSeconds - Seconds between two tries
     * to reach given url.
     * @param givenOptions.statusCodes - Status codes to check for.
     * @param givenOptions.options - Fetch options to use.
     *
     * @returns A promise which will be resolved if a request to given url
     * couldn't finished. Otherwise returned promise will be rejected. If
     * "wait" is set to "true" we will resolve to another promise still
     * resolving when final timeout is reached or the endpoint is unreachable
     * (after some tries).
     */
    static async checkUnreachability(
        this:void,
        url:string,
        givenOptions:RecursivePartial<CheckReachabilityOptions> = {}
    ):Promise<Error|null|Promise<Error|null>> {
        const options:CheckReachabilityOptions = Tools.extend(
            true,
            {
                wait: false,
                timeoutInSeconds: 10,
                pollIntervallInSeconds: 0.1,
                statusCodes: [],
                options: {}
            },
            givenOptions
        )

        const check = (response:Response):Error|null => {
            const statusCodes:Array<number> =
                ([] as Array<number>).concat(options.statusCodes)
            if (statusCodes.length) {
                if (
                    response !== null &&
                    typeof response === 'object' &&
                    'status' in response &&
                    statusCodes.includes(response.status)
                )
                    throw new Error(
                        `Given url "${url}" is reachable and responses with ` +
                        `status code "${response.status}".`
                    )

                return new Error(
                    `Given status code is not "${statusCodes.join(', ')}".`
                )
            }

            return null
        }

        if (options.wait)
            return new Promise<Error|null|Promise<Error|null>>((
                resolve:(_value:Error|null) => void,
                reject:(_reason:Error) => void
            ):void => {
                let timedOut = false

                const wrapper = async ():Promise<Error|Response|null> => {
                    try {
                        const response:Response =
                            await globalContext.fetch(url, options.options)

                        if (timedOut)
                            return response

                        const result:Error|null = check(response)
                        if (result) {
                            timer.clear()
                            resolve(result)

                            return result
                        }

                        // eslint-disable-next-line no-use-before-define
                        currentlyRunningTimer = Tools.timeout(
                            options.pollIntervallInSeconds * 1000, wrapper
                        )

                        /*
                            NOTE: A timer rejection is expected. Avoid throwing
                            errors about unhandled promise rejections.
                        */
                        currentlyRunningTimer.catch(Tools.noop)
                    } catch (error) {
                        // eslint-disable-next-line no-use-before-define
                        timer.clear()
                        resolve(error as Error)

                        return error as Error
                    }

                    return null
                }

                let currentlyRunningTimer = Tools.timeout(wrapper)
                const timer:TimeoutPromise =
                    Tools.timeout(options.timeoutInSeconds * 1000)

                timer.then(
                    () => {
                        timedOut = true

                        currentlyRunningTimer.clear()

                        reject(new Error(
                            `Timeout of ${options.timeoutInSeconds} seconds ` +
                            'reached.'
                        ))
                    },
                    Tools.noop
                )
            })

        try {
            const result:Error|null =
                check(await globalContext.fetch(url, options.options))

            if (result)
                return result
        } catch (error) {
            return error as Error
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
     *
     * @returns Returns the given target as extended dom node.
     */
    static sendToIFrame(
        this:void,
        target:$T<HTMLIFrameElement>|HTMLIFrameElement|string,
        url:string,
        data:Mapping<unknown>,
        requestType = 'post',
        removeAfterLoad = false
    ):$T<HTMLIFrameElement> {
        const $targetDomNode:$T<HTMLIFrameElement> =
            (typeof target === 'string') ?
                $<HTMLIFrameElement>(`iframe[name"${target}"]`) :
                $(target as HTMLIFrameElement)

        const $formDomNode:$T<HTMLFormElement> =
            $<HTMLFormElement>('<form>').attr({
                action: url,
                method: requestType,
                target: $targetDomNode.attr('name')
            })

        for (const [name, value] of Object.entries(data))
            $formDomNode.append(
                $<HTMLInputElement>('<input>')
                    .attr({name, type: 'hidden', value}) as
                        unknown as
                        JQuery.Node
            )

        /*
            NOTE: The given target form have to be injected into document
            object model to successfully submit.
        */
        if (removeAfterLoad)
            $targetDomNode.on('load', ():$T<HTMLIFrameElement> =>
                $targetDomNode.remove()
            )

        $formDomNode.insertAfter($targetDomNode as unknown as JQuery.Node)
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
     *
     * @returns Returns the dynamically created iframe.
     */
    sendToExternalURL = (
        url:string,
        data:Mapping<unknown>,
        requestType = 'post',
        removeAfterLoad = true
    ):$T<HTMLIFrameElement> => {
        const $iFrameDomNode:$T<HTMLIFrameElement> =
            $<HTMLIFrameElement>('<iframe>')
                .attr(
                    'name',
                    this.options.name.charAt(0).toLowerCase() +
                    this.options.name.substring(1) +
                    `${(new Date()).getTime()}`
                )
                .hide()

        if (this.$domNode)
            this.$domNode.append($iFrameDomNode as unknown as JQuery.Node)

        Tools.sendToIFrame(
            $iFrameDomNode, url, data, requestType, removeAfterLoad
        )

        return $iFrameDomNode
    }
    /// endregion
    /// region file
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
     *
     * @returns Promise holding the determined target directory path.
     */
    static async copyDirectoryRecursive(
        this:void,
        sourcePath:string,
        targetPath:string,
        callback:AnyFunction = Tools.noop,
        readOptions = {encoding: null, flag: 'r'},
        writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
    ):Promise<string> {
        // NOTE: Check if folder needs to be created or integrated.
        sourcePath = resolve!(sourcePath)
        if (await Tools.isDirectory(targetPath))
            targetPath = resolve!(targetPath, basename!(sourcePath))

        try {
            await mkdir!(targetPath)
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
                throw error
        }
        for (
            const currentSourceFile of
            await Tools.walkDirectoryRecursively(sourcePath, callback)
        ) {
            const currentTargetPath:string = join!(
                targetPath, currentSourceFile.path.substring(sourcePath.length)
            )

            if (currentSourceFile.stats?.isDirectory())
                try {
                    await mkdir!(currentTargetPath)
                } catch (error) {
                    if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
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
     *
     * @returns Determined target directory path.
     */
    static copyDirectoryRecursiveSync(
        this:void,
        sourcePath:string,
        targetPath:string,
        callback:AnyFunction = Tools.noop,
        readOptions = {encoding: null, flag: 'r'},
        writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
    ):string {
        // NOTE: Check if folder needs to be created or integrated.
        sourcePath = resolve!(sourcePath)
        if (Tools.isDirectorySync(targetPath))
            targetPath = resolve!(targetPath, basename!(sourcePath))
        try {
            mkdirSync!(targetPath)
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
                throw error
        }

        for (
            const currentSourceFile of
            Tools.walkDirectoryRecursivelySync(sourcePath, callback)
        ) {
            const currentTargetPath:string = join!(
                targetPath, currentSourceFile.path.substring(sourcePath.length)
            )
            if (currentSourceFile.stats?.isDirectory())
                try {
                    mkdirSync!(currentTargetPath)
                } catch (error) {
                    if ((error as NodeJS.ErrnoException).code !== 'EEXIST')
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
     *
     * @returns Determined target file path.
     */
    static async copyFile(
        this:void,
        sourcePath:string,
        targetPath:string,
        readOptions = {encoding: null, flag: 'r'},
        writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
    ):Promise<string> {
        /*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */
        if (await Tools.isDirectory(targetPath))
            targetPath = resolve!(targetPath, basename!(sourcePath))

        await writeFile!(
            targetPath, await readFile!(sourcePath, readOptions), writeOptions
        )

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
     *
     * @returns Determined target file path.
     */
    static copyFileSync(
        this:void,
        sourcePath:string,
        targetPath:string,
        readOptions = {encoding: null, flag: 'r'},
        writeOptions = {encoding: DEFAULT_ENCODING, flag: 'w', mode: 0o666}
    ):string {
        /*
            NOTE: If target path references a directory a new file with the
            same name will be created.
        */
        if (Tools.isDirectorySync(targetPath))
            targetPath = resolve!(targetPath, basename!(sourcePath))

        writeFileSync!(
            targetPath,
            readFileSync!(sourcePath, readOptions),
            writeOptions
        )

        return targetPath
    }
    /**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     *
     * @returns A promise holding a boolean which indicates directory
     * existence.
     */
    static async isDirectory(this:void, filePath:string):Promise<boolean> {
        try {
            return (await stat!(filePath)).isDirectory()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(
                    (error as NodeJS.ErrnoException).code!
                )
            )
                return false

            throw error
        }
    }
    /**
     * Checks if given path points to a valid directory.
     * @param filePath - Path to directory.
     *
     * @returns A boolean which indicates directory existents.
     */
    static isDirectorySync(this:void, filePath:string):boolean {
        try {
            return statSync!(filePath).isDirectory()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(
                    (error as NodeJS.ErrnoException).code!
                )
            )
                return false

            throw error
        }
    }
    /**
     * Checks if given path points to a valid file.
     * @param filePath - Path to directory.
     *
     * @returns A promise holding a boolean which indicates directory
     * existence.
     */
    static async isFile(this:void, filePath:string):Promise<boolean> {
        try {
            return (await stat!(filePath)).isFile()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(
                    (error as NodeJS.ErrnoException).code!
                )
            )
                return false

            throw error
        }
    }
    /**
     * Checks if given path points to a valid file.
     * @param filePath - Path to file.
     *
     * @returns A boolean which indicates file existence.
     */
    static isFileSync(this:void, filePath:string):boolean {
        try {
            return statSync!(filePath).isFile()
        } catch (error) {
            if (
                Object.prototype.hasOwnProperty.call(error, 'code') &&
                ['ENOENT', 'ENOTDIR'].includes(
                    (error as NodeJS.ErrnoException).code!
                )
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
     * potentially manipulate further traversing in alphabetical sorted order.
     * If it returns "null" or a promise resolving to "null", no further files
     * will be traversed afterwards.
     * If it handles a directory and returns "false" or a promise resolving to
     * "false" no traversing into that directory will occur.
     * @param options - Options to use for nested "readdir" calls.
     *
     * @returns A promise holding the determined files.
     */
    static async walkDirectoryRecursively(
        this:void,
        directoryPath:string,
        callback:null|((_file:File) => FileTraversionResult) = null,
        options:(
            Encoding|SecondParameter<typeof import('fs').readdir>
        ) = DEFAULT_ENCODING
    ):Promise<Array<File>> {
        const files:Array<File> = []
        for (const directoryEntry of await readdir!(
            directoryPath,
            typeof options === 'string' ?
                {encoding: options, withFileTypes: true} :
                {...options, withFileTypes: true}
        )) {
            const filePath:string = resolve!(directoryPath, directoryEntry.name)
            const file:File = {
                directoryPath,
                directoryEntry,
                error: null,
                name: directoryEntry.name,
                path: filePath,
                stats: null
            }

            try {
                file.stats = await stat!(filePath)
            } catch (error) {
                file.error = error as NodeJS.ErrnoException
            }

            files.push(file)
        }

        if (callback)
            /*
                NOTE: Directories and have to be iterated first to be able to
                avoid deeper unwanted traversing.
            */
            files.sort((firstFile:File, secondFile:File):-1|0|1 => {
                if (firstFile.stats?.isDirectory()) {
                    if (secondFile.stats?.isDirectory())
                        return 0

                    return -1
                }

                if (secondFile.stats?.isDirectory())
                    return 1

                return 0
            })

        let finalFiles:Array<File> = []
        for (const file of files) {
            finalFiles.push(file)

            let result:FileTraversionResult =
                callback ? callback(file) : undefined

            if (result === null)
                break

            if (typeof result === 'object' && 'then' in result)
                result = await result

            if (result === null)
                break

            if (result !== false && file.stats?.isDirectory())
                finalFiles = finalFiles.concat(
                    await Tools.walkDirectoryRecursively(
                        file.path, callback, options
                    )
                )
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
     *
     * @returns Determined list if all files.
     */
    static walkDirectoryRecursivelySync(
        this:void,
        directoryPath:string,
        callback:AnyFunction|null = Tools.noop,
        options:(
            Encoding|SecondParameter<typeof import('fs').readdirSync>
        ) = DEFAULT_ENCODING
    ):Array<File> {
        const files:Array<File> = []

        for (const directoryEntry of readdirSync!(
            directoryPath,
            typeof options === 'string' ?
                {encoding: options, withFileTypes: true} :
                {...options, withFileTypes: true}
        )) {
            const filePath:string =
                resolve!(directoryPath, directoryEntry.name)
            const file:File = {
                directoryPath,
                directoryEntry,
                error: null,
                name: directoryEntry.name,
                path: filePath,
                stats: null
            }
            try {
                file.stats = statSync!(filePath)
            } catch (error) {
                file.error = error as NodeJS.ErrnoException
            }
            files.push(file)
        }

        let finalFiles:Array<File> = []

        if (callback) {
            /*
                NOTE: Directories have to be iterated first to potentially
                avoid deeper iterations.
            */
            files.sort((firstFile:File, secondFile:File):number => {
                if (firstFile.stats?.isDirectory()) {
                    if (secondFile.stats?.isDirectory())
                        return 0

                    return -1
                }

                if (secondFile.stats?.isDirectory())
                    return 1

                return 0
            })

            for (const file of files) {
                finalFiles.push(file)

                const result:unknown = callback(file)

                if (result === null)
                    break

                if (result !== false && file.stats?.isDirectory())
                    finalFiles = finalFiles.concat(
                        Tools.walkDirectoryRecursivelySync(
                            file.path, callback, options
                        )
                    )
            }
        }

        return finalFiles
    }
    /// endregion
    /// region process handler
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
     *
     * @returns Process close handler function.
     */
    static getProcessCloseHandler(
        this:void,
        resolve:ProcessCloseCallback,
        reject:ProcessErrorCallback,
        reason:unknown = null,
        callback:AnyFunction = Tools.noop
    ):ProcessHandler {
        let finished = false

        return (returnCode:unknown, ...parameters:Array<unknown>):void => {
            if (finished)
                finished = true
            else {
                finished = true
                if (typeof returnCode !== 'number' || returnCode === 0) {
                    callback()
                    resolve({reason, parameters})
                } else {
                    const error:ProcessError = new Error(
                        `Task exited with error code ${returnCode}`
                    ) as ProcessError

                    error.returnCode = returnCode
                    error.parameters = parameters

                    reject(error)
                }
            }
        }
    }
    /**
     * Forwards given child process communication channels to corresponding
     * current process communication channels.
     * @param childProcess - Child process meta data.
     *
     * @returns Given child process meta data.
     */
    static handleChildProcess(
        this:void, childProcess:ChildProcess
    ):ChildProcess {
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
    /// endregion
    // endregion
    // region protected methods
    /* eslint-disable jsdoc/require-description-complete-sentence */
    /**
     * Helper method for attach/remove event handler methods.
     * @param parameters - Arguments object given to methods like "on()" or
     * "off()".
     * @param removeEvent - Indicates if handler should be attached or removed.
     * @param eventFunctionName - Name of function to wrap.
     *
     * @returns Returns $'s wrapped dom node.
     */
    _bindEventHelper = <TElement = HTMLElement>(
        parameters:Array<unknown>,
        removeEvent = false,
        eventFunctionName?:string
    ):$T<TElement> => {
    /* eslint-enable jsdoc/require-description-complete-sentence */
        if (!eventFunctionName)
            eventFunctionName = removeEvent ? 'off' : 'on'

        const $domNode:$T<TElement> =
            $(parameters[0] as HTMLElement) as unknown as $T<TElement>
        if (Tools.determineType(parameters[1]) === 'object' && !removeEvent) {
            for (const [eventType, parameter] of Object.entries(
                parameters[1] as Mapping<unknown>
            ))
                this[eventFunctionName as 'on']($domNode, eventType, parameter)

            return $domNode
        }

        parameters = Tools.arrayMake(parameters).slice(1)
        if (parameters.length === 0)
            parameters.push('')
        if (!(parameters[0] as Array<string>).includes('.'))
            (parameters[0] as string) += `.${this.options.name}`

        return ($domNode[eventFunctionName as keyof $T] as UnknownFunction)
            .apply($domNode, parameters) as $T<TElement>
    }
    // endregion
}
/// endregion
/// region bound tools
/**
 * Dom bound version of Tools class.
 */
export class BoundTools<TElement = HTMLElement> extends Tools<TElement> {
    $domNode:$T<TElement>
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
     * @param additionalParameters - Additional parameters to call super method
     * with.
     *
     * @returns Nothing.
     */
    constructor(
        $domNode:$T<TElement>,
        ...additionalParameters:ParametersExceptFirst<Tools['constructor']>
    ) {
        super($domNode, ...additionalParameters)

        this.$domNode = $domNode
    }
}
/// endregion
export default Tools
// endregion
// region handle $ extending
export const augment$ = (value:$TStatic):void => {
    $ = value

    if (!$.global)
        $.global = globalContext

    if ($.global.window) {
        if (!$.document && $.global.window.document)
            $.document = $.global.window.document
        if (!$.location && $.global.window.location)
            $.location = $.global.window.location
    }

    if ($.fn)
        $.fn.Tools = function<TElement = HTMLElement>(
            this:$T<TElement>,
            ...parameters:ParametersExceptFirst<(typeof Tools)['controller']>
        ) {
            return Tools.controller<TElement>(Tools, parameters, this)
        } as BoundToolsFunction

    $.Tools = ((...parameters:Array<unknown>):unknown =>
        Tools.controller(Tools, parameters)
    ) as ToolsFunction
    $.Tools.class = Tools

    if ($.fn) {
        // region prop fix for comments and text nodes
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const nativePropFunction = $.fn.prop
        /**
         * Scopes native prop implementation ignores properties for text nodes,
         * comments and attribute nodes.
         * @param key - Name of property to retrieve from current dom node.
         * @param additionalParameters - Additional parameter will be forwarded
         * to native prop function also.
         *
         * @returns Returns value if used as getter or current dom node if used
         * as setter.
         */
        $.fn.prop = function(
            this:Array<Element>,
            key:keyof Element,
            ...additionalParameters:ParametersExceptFirst<
                (typeof $)['fn']['prop']
            >
        ):ReturnType<(typeof $)['fn']['prop']> {
            if (
                additionalParameters.length < 2 &&
                this.length &&
                ['#text', '#comment'].includes(
                    this[0].nodeName.toLowerCase()
                ) &&
                key in this[0]
            ) {
                if (additionalParameters.length === 0)
                    return this[0][key]

                if (additionalParameters.length === 1) {
                    /*
                        NOTE: "textContent" represents a writable element
                        property.
                    */
                    this[0][key as 'textContent'] =
                        (additionalParameters as unknown as [string])[0]

                    return this
                }
            }

            return nativePropFunction.call(
                this, key, ...(additionalParameters as [])
            )
        } as (typeof $)['fn']['prop']
        // endregion
    }
}
augment$($)
/// region fix script loading errors with canceling requests
$.readyException = (error:Error|string):void => {
    if (!(typeof error === 'string' && error === 'canceled'))
        throw error
}
/// endregion
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

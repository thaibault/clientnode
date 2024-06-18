// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module context */
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
import {isFunction} from './indicators'
import Tools from './Tools'
import {
    $Global,
    $T,
    $TStatic,
    BoundToolsFunction,
    ImportFunction,
    ParametersExceptFirst,
    ToolsFunction,
    UnknownFunction
} from './type'

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
    NOTE: This results in an webpack error when postprocessing this compiled
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

/// region context
globalContext.fetch =
    globalContext.fetch ??
    optionalRequire<{default:typeof fetch}>('node-fetch')?.default ??
    ((...parameters:Parameters<typeof fetch>):ReturnType<typeof fetch> =>
            currentImport!(/* webpackIgnore: true */ 'node-fetch')
                .then((module:unknown):ReturnType<typeof fetch> =>
                    (module as {default:typeof fetch})?.default(...parameters)
                )
    )
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

                if (isFunction(parameter) && globalContext.document)
                    globalContext.document.addEventListener(
                        'DOMContentLoaded',
                        parameter as unknown as EventListenerObject
                    )

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
        const nativePropFunction = $.fn.prop
        /**
         * Scopes native prop implementation ignores properties for text nodes,
         * comments and attribute nodes.
         * @param key - Name of property to retrieve from current dom node.
         * @param additionalParameters - Additional parameter will be forwarded
         * to native prop function also.
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

            return nativePropFunction.call(this, key, ...additionalParameters)
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

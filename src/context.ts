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
import {currentImport, optionalRequire} from './require'
import Tools from './Tools'
import {
    $Global,
    $T,
    $TStatic,
    AnyFunction,
    BoundToolsFunction,
    Mapping,
    ParametersExceptFirst,
    ToolsFunction,
    UnknownFunction
} from './type'

export const determineGlobalContext: (() => $Global) = (): $Global => {
    if (typeof globalThis === 'undefined') {
        if (typeof window === 'undefined') {
            if (typeof global === 'undefined')
                return ((typeof module === 'undefined') ? {} : module) as
                    $Global

            if (Object.prototype.hasOwnProperty.call(global, 'window'))
                return global.window as unknown as $Global

            return global as unknown as $Global
        }

        return window as unknown as $Global
    }

    return globalThis as unknown as $Global
}
export let globalContext: $Global = determineGlobalContext()
export const setGlobalContext = (context: $Global) => {
    globalContext = context
}

/// region context
globalContext.fetch =
    globalContext.fetch ?
        globalContext.fetch.bind(globalContext) :
        optionalRequire<{default: typeof fetch}>('node-fetch')?.default ??
        ((...parameters: Parameters<typeof fetch>): ReturnType<typeof fetch> =>
            currentImport ?
                currentImport(/* webpackIgnore: true */ 'node-fetch')
                    .then((module: unknown): ReturnType<typeof fetch> =>
                        (module as {default: typeof fetch}).default(
                            ...parameters
                        )
                    ) :
                null as unknown as ReturnType<typeof fetch>
        )
/// endregion
/// region
export const determine$: (() => $TStatic) = (): $TStatic => {
    let $: $TStatic = (() => {
        // Do nothing.
    }) as unknown as $TStatic
    if (Object.prototype.hasOwnProperty.call(globalContext, '$'))
        $ = globalContext.$
    else {
        if (Object.prototype.hasOwnProperty.call(globalContext, 'document'))
            try {
                /* eslint-disable @typescript-eslint/no-require-imports */
                $ = require('jquery') as $TStatic
                /* eslint-enable @typescript-eslint/no-require-imports */
            } catch {
                // Continue regardless of an error.
            }

        if (
            typeof $ === 'undefined' ||
            typeof $ === 'object' && Object.keys($).length === 0
        ) {
            const selector = globalContext.document?.querySelectorAll ?
                globalContext.document.querySelectorAll.bind(
                    globalContext.document
                ) :
                () => null

            $ = ((parameter: unknown): unknown => {
                let $domNodes: null | $T = null
                if (typeof parameter === 'string')
                    $domNodes = selector(parameter) as unknown as null | $T
                else if (Array.isArray(parameter))
                    $domNodes = parameter as unknown as null | $T
                else if (
                    typeof HTMLElement === 'object' &&
                    parameter instanceof HTMLElement ||
                    (parameter as Mapping<unknown> | undefined)?.nodeType ===
                        1 &&
                    typeof (parameter as Mapping<unknown>).nodeName ===
                        'string'
                )
                    $domNodes = [parameter] as unknown as $T

                if ($domNodes) {
                    if (Object.prototype.hasOwnProperty.call($, 'fn'))
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

            ;($ as {fn: $T}).fn = {} as $T
        }
    }

    if (!Object.prototype.hasOwnProperty.call($, 'global'))
        $.global = globalContext

    if (Object.prototype.hasOwnProperty.call($.global, 'window')) {
        if (
            !$.document &&
            Object.prototype.hasOwnProperty.call($.global.window, 'document')
        )
            $.document = $.global.window?.document
        if (
            !$.location &&
            Object.prototype.hasOwnProperty.call($.global.window, 'location')
        )
            $.location = $.global.window?.location
    }

    return $
}
export let $ = determine$()

export const MAXIMAL_NUMBER_OF_ITERATIONS = {value: 100}
// Saves currently maximal supported Internet Explorer version. Saves zero if
// no Internet Explorer present.
export const MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION = {value: ((
): number => {
    /*
        NOTE: This method uses "Array.indexOf" instead of "Array.includes"
        since this function could be crucial in wide browser support.
    */
    if (!$.document)
        return 0

    const div = $.document.createElement('div')
    let version: number
    for (version = 0; version < 10; version++) {
        /*
            NOTE: We split html comment sequences to avoid wrong interpretation
            if this code is embedded in markup.
            NOTE: Internet Explorer 9 and lower sometimes doesn't understand
            conditional comments wich doesn't start with a whitespace. If the
            conditional markup isn't in commend, otherwise there shouldn't be
            any whitespace!
        */
        div.innerHTML = (
            '<!' + `--[if gt IE ${String(version)}]><i></i><![e` + 'ndif]-' +
            '->'
        )

        if (div.getElementsByTagName('i').length === 0)
            break
    }

    // Try special detection for internet explorer 10 and 11.
    if (
        version === 0 &&
        Object.prototype.hasOwnProperty.call($.global.window, 'navigator')
    ) {
        if ($.global.window?.navigator.appVersion.indexOf('MSIE 10') !== -1)
            return 10

        if (
            ![
                $.global.window.navigator.userAgent.indexOf('Trident'),
                $.global.window.navigator.userAgent.indexOf('rv:11')
            ].includes(-1)
        )
            return 11
    }

    return version
})()}

// A no-op dummy function.
export const NOOP: AnyFunction =
    Object.prototype.hasOwnProperty.call($, 'noop') ?
        $.noop.bind($) as AnyFunction :
        () => {
            // Do nothing.
        }
/// endregion
// region handle $ extending
export const augment$ = (value: $TStatic): void => {
    $ = value

    if (!Object.prototype.hasOwnProperty.call($, 'global'))
        $.global = globalContext

    if (Object.prototype.hasOwnProperty.call($.global, 'window')) {
        if (
            !$.document &&
            Object.prototype.hasOwnProperty.call($.global.window, 'document')
        )
            $.document = $.global.window?.document
        if (
            !$.location &&
            Object.prototype.hasOwnProperty.call($.global.window, 'location')
        )
            $.location = $.global.window?.location
    }

    if (Object.prototype.hasOwnProperty.call($, 'fn'))
        $.fn.Tools = function<TElement = HTMLElement>(
            this: $T<TElement>,
            ...parameters: ParametersExceptFirst<(typeof Tools)['controller']>
        ) {
            return Tools.controller<TElement>(Tools, parameters, this)
        } as BoundToolsFunction

    $.Tools = ((...parameters: Array<unknown>): unknown =>
        Tools.controller(Tools, parameters)
    ) as ToolsFunction
    $.Tools.class = Tools

    if (Object.prototype.hasOwnProperty.call($, 'fn')) {
        // region prop fix for comments and text nodes
        /*
            NOTE: All functions under "$.fn.*" will get current selected dom
            node as bounded context.
        */
        // eslint-disable-next-line @typescript-eslint/unbound-method
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
            this: Array<Element>,
            key: keyof Element,
            ...additionalParameters: ParametersExceptFirst<
                (typeof $)['fn']['prop']
            >
        ): ReturnType<(typeof $)['fn']['prop']> {
            if (
                /*
                    eslint-disable @typescript-eslint/no-unnecessary-condition
                */
                additionalParameters.length < 2 &&
                /* eslint-enable @typescript-eslint/no-unnecessary-condition */
                this.length &&
                ['#text', '#comment'].includes(
                    this[0].nodeName.toLowerCase()
                ) &&
                key in this[0]
            ) {
                /*
                    eslint-disable @typescript-eslint/no-unnecessary-condition
                */
                if (additionalParameters.length === 0)
                /* eslint-enable @typescript-eslint/no-unnecessary-condition */
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
$.readyException = (error: Error | string): void => {
    if (!(typeof error === 'string' && error === 'canceled'))
        // eslint-disable-next-line no-throw-literal
        throw error as Error
}
/// endregion
// endregion

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
import {CONSOLE_METHODS} from './constants'
import {currentImport, optionalRequire} from './require'
import {$Global, AnyFunction, Mapping} from './type'

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

export const MAXIMAL_NUMBER_OF_ITERATIONS = {value: 100}
// A no-op dummy function.
export const NOOP: AnyFunction = () => {
    // Do nothing.
}
export const mockConsole = () => {
    // Avoid errors in browsers that lack a console.
    if (!Object.prototype.hasOwnProperty.call(globalContext, 'console'))
        (globalContext as unknown as {console: Mapping<AnyFunction>})
            .console = {}

    if (!globalContext.console)
        globalContext.console = {} as Console

    for (const methodName of CONSOLE_METHODS)
        if (!(methodName in globalContext.console))
            globalContext.console[methodName as 'log'] =
                NOOP as Console['log']
}

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

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {AnyFunction, Mapping} from './type'

import {CONSOLE_METHODS} from './constants'
import {
    determineGlobalContext, optionalImport, optionalRequire
} from './module'

export let globalContext = determineGlobalContext()
export const setGlobalContext = (context: typeof globalThis) => {
    globalContext = context
}

globalContext.fetch =
    globalContext.fetch ?
        globalContext.fetch.bind(globalContext) :
        optionalRequire<{default: typeof fetch}>('node-fetch')?.default ??
        ((...parameters: Parameters<typeof fetch>): ReturnType<typeof fetch> =>
            optionalImport(/* webpackIgnore: true */ 'node-fetch')
                .then((module: unknown): ReturnType<typeof fetch> =>
                    (module as {default: typeof fetch}).default(
                        ...parameters
                    )
                )
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

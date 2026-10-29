// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {expect, test} from '@jest/globals'

import {globalContext, mockConsole, NOOP, setGlobalContext} from '../context'

test('setGlobalContext', () => {
    const originalContext = globalContext as typeof globalThis
    const context = {} as typeof globalThis

    try {
        setGlobalContext(context)
        expect(globalContext).toBe(context)
    } finally {
        setGlobalContext(originalContext)
    }

    expect(globalContext).toBe(originalContext)
})
test('NOOP', () => {
    expect(NOOP()).toStrictEqual(undefined)
})
test('mockConsole', () => {
    const originalContext = globalContext as typeof globalThis

    try {
        const context = {} as typeof globalThis
        setGlobalContext(context)
        mockConsole()
        for (const name of ['debug', 'error', 'info', 'log', 'warn'] as const)
            expect(context.console[name]).toStrictEqual(NOOP)

        const log = (): void => {
            // Do nothing.
        }
        const contextWithConsole = {
            console: {log} as unknown as Console
        } as typeof globalThis
        setGlobalContext(contextWithConsole)
        mockConsole()
        expect(contextWithConsole.console.log).toStrictEqual(log)
        expect(contextWithConsole.console.warn).toStrictEqual(NOOP)
    } finally {
        setGlobalContext(originalContext)
    }
})

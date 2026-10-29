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

import {
    clearRequireCache,
    currentRequire,
    determineGlobalContext,
    isImportSyntaxSupported,
    optionalImport,
    optionalRequire,
    setOptionalRequire
} from '../module'

test('determineGlobalContext', () => {
    expect(determineGlobalContext()).toBe(globalThis)
})
test('setOptionalRequire', () => {
    const fakeRequire = ((id: string): unknown => {
        if (id === 'missing')
            throw new Error(`Cannot find module "${id}".`)

        return {id}
    }) as unknown as typeof require

    try {
        setOptionalRequire(fakeRequire)
        expect(optionalRequire('existing')).toStrictEqual({id: 'existing'})
        expect(optionalRequire('missing')).toStrictEqual(null)

        setOptionalRequire(null)
        expect(optionalRequire('existing')).toStrictEqual(null)
    } finally {
        setOptionalRequire(currentRequire)
    }
})
test('clearRequireCache', () => {
    const module = {id: 'a'} as NodeJS.Module
    const cache: typeof require.cache = {a: module}

    expect(clearRequireCache(cache)).toStrictEqual({a: module})
    expect(cache).toStrictEqual({})
    expect(clearRequireCache(cache)).toStrictEqual({})
})
test('isImportSyntaxSupported', () => {
    expect(isImportSyntaxSupported()).toStrictEqual(true)
})
test('optionalImport', async (): Promise<void> => {
    await expect(optionalImport('clientnode-not-existing-module'))
        .resolves.toStrictEqual(null)
})

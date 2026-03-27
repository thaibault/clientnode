// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {expect, test} from '@jest/globals'
import {InitializedBrowser} from 'weboptimizer/type'
import {getInitializedBrowser} from 'weboptimizer/browser'

import {NOOP} from '../context'
import {
    isAnyMatching, isArrayLike, isFunction, isNumeric, isPlainObject, isWindow
} from '../indicators'
import {
    testEachAgainstSameExpectation,
    testEachSingleParameterAgainstSameExpectation
} from '../test-helper'

testEachSingleParameterAgainstSameExpectation(
    'isNumeric',
    isNumeric,
    true,

    0,
    1,
    '-10',
    '0',
    0xFF,
    '0xFF',
    '8e5',
    '3.1415',
    10,
    -10
)
testEachSingleParameterAgainstSameExpectation(
    'isNumeric',
    isNumeric,
    false,

    null,
    undefined,
    false,
    true,
    '',
    'a',
    {},
    /a/,
    '-0x42',
    '7.2acdgs',
    NaN,
    Infinity
)
test('isWindow', async (): Promise<void> => {
    const browser: InitializedBrowser = await getInitializedBrowser()

    expect(isWindow(browser.window)).toStrictEqual(true)

    for (const value of [null, {}, browser])
        expect(isWindow(value)).toStrictEqual(false)
})
test('isArrayLike', async (): Promise<void> => {
    const browser: InitializedBrowser = await getInitializedBrowser()
    for (const value of [
        [], browser.window.document.querySelectorAll('*')
    ])
        expect(isArrayLike(value)).toStrictEqual(true)
})
testEachSingleParameterAgainstSameExpectation(
    'isArrayLike',
    isArrayLike,
    false,

    {},
    null,
    undefined,
    false,
    true,
    /a/
)
testEachAgainstSameExpectation(
    'isAnyMatching',
    isAnyMatching,
    true,

    ['', ['']],
    ['test', [/test/]],
    ['test', [/a/, /b/, /es/]],
    ['test', ['', 'test']]
)
testEachAgainstSameExpectation(
    'isAnyMatching',
    isAnyMatching,
    false,

    ['', []],
    ['test', [/tes$/]],
    ['test', [/^est/]],
    ['test', [/^est$/]],
    ['test', ['a']]
)
testEachSingleParameterAgainstSameExpectation(
    'isPlainObject',
    isPlainObject,
    true,

    {},
    {a: 1},
    // eslint-disable-next-line no-new-object
    new Object()
)
testEachSingleParameterAgainstSameExpectation(
    'isPlainObject',
    isPlainObject,
    false,

    new String(),
    Object,
    null,
    0,
    1,
    true,
    undefined
)
testEachSingleParameterAgainstSameExpectation(
    'isFunction',
    isFunction,
    true,

    Object,
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    new Function('return 1'),
    function() {
        // Do nothing.
    },
    NOOP,
    async (): Promise<void> => {
        // Do nothing.
    }
)
testEachSingleParameterAgainstSameExpectation(
    'isFunction',
    isFunction,
    false,

    null,
    false,
    0,
    1,
    undefined,
    {},
    new Boolean()
)

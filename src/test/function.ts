// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module utility */
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
import {expect, test} from '@jest/globals'

import {deleteEmptyItems, extractIfMatches} from '../array'
import {getParameterNames, identity, invertArrayFilter} from '../function'
import {copy} from '../object'
import {testEach} from '../test-helper'

testEach<typeof getParameterNames>(
    'getParameterNames',
    getParameterNames,

    [
        [],
        function() {
            // Do nothing.
        }
    ],
    [[], 'function() {}'],
    [['a', 'b', 'c'], 'function(a, /* dummy*/ b, c/**/) {}'],
    [['a', 'b', 'c'], '(a, /*dummy*/b, c/**/) => {}'],
    [
        ['a', 'b', 'c'],
        `(a, /*dummy*/b, c/**/) => {
                return 2
            }`
    ],
    [['a', 'b', 'c'], '(a, /* dummy*/b, c/* */) => 2'],
    [['a', 'b', 'c'], '(a, /* dummy*/b = 2, c/* */) => 2'],
    [['a'], 'a => 2'],
    [
        ['a', 'b', 'c'],
        `class A {
                constructor(a, b, c) {}
                a() {}
            }`
    ]
)
test('identity', ():void => {
    const testObject = {}
    expect(identity(testObject) === copy(testObject))
        .toStrictEqual(false)
    expect(identity(testObject)).toStrictEqual(testObject)
})
testEach<typeof identity>(
    'identity',
    identity,

    [2, 2],
    ['', ''],
    [undefined, undefined],
    [null, null],
    ['hans', 'hans']
)
test('invertArrayFilter', ():void => {
    expect(invertArrayFilter(deleteEmptyItems)([{a: null}]))
        .toStrictEqual([{a: null}])
    expect(invertArrayFilter(extractIfMatches)(['a', 'b'], '^a$'))
        .toStrictEqual(['b'])
})
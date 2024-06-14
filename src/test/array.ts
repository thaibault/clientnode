// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module dateTime */
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

import {
    aggregatePropertyIfEqual,
    deleteEmptyItems,
    extract,
    extractIfMatches,
    extractIfPropertyExists,
    extractIfPropertyMatches,
    intersect,
    makeArray,
    makeRange,
    merge,
    paginate,
    permutate,
    permutateLength, removeArrayItem, sortTopological, sumUpProperty, unique
} from '../array'
import {
    testEach,
    testEachSingleParameterAgainstSameExpectation,
    TEST_THROW_SYMBOL
} from '../test-helper'

testEach<typeof aggregatePropertyIfEqual>(
    'aggregatePropertyIfEqual',
    aggregatePropertyIfEqual,

    ['b', [{a: 'b'}], 'a'],
    ['b', [{a: 'b'}, {a: 'b'}], 'a'],
    ['', [{a: 'b'}, {a: 'c'}], 'a'],
    [false, [{a: 'b'}, {a: 'c'}], 'a', false]
)
testEach<typeof deleteEmptyItems>(
    'deleteEmptyItems',
    deleteEmptyItems,

    [[], [{a: null}]],
    [[{a: null, b: 2}], [{a: null, b: 2}]],
    [[], [{a: null, b: 2}], ['a']],
    [[], [], ['a']],
    [[], []]
)
testEach<typeof extract>(
    'extract',
    extract,

    [[{a: 'b'}], [{a: 'b', c: 'd'}], ['a']],
    [[{}], [{a: 'b', c: 'd'}], ['b']],
    [[{c: 'd'}], [{a: 'b', c: 'd'}], ['c']],
    [[{c: 'd'}, {}], [{a: 'b', c: 'd'}, {a: 3}], ['c']],
    [[{c: 'd'}, {c: 3}], [{a: 'b', c: 'd'}, {c: 3}], ['c']]
)
testEach<typeof extractIfMatches>(
    'extractIfMatches',
    extractIfMatches,

    [['b'], ['b'], /b/],
    [['b'], ['b'], 'b'],
    [[], ['b'], 'a'],
    [[], [], 'a'],
    [['a', 'b'], ['a', 'b'], ''],
    [[], ['a', 'b'], '^$'],
    [['b'], ['a', 'b'], 'b'],
    [['a', 'b'], ['a', 'b'], '[ab]']
)
testEach<typeof extractIfPropertyExists>(
    'extractIfPropertyExists',
    extractIfPropertyExists,

    [[{a: 2}], [{a: 2}], 'a'],
    [[], [{a: 2}], 'b'],
    [[], [], 'b'],
    [[{a: 2}], [{a: 2}, {b: 3}], 'a']
)
testEach<typeof extractIfPropertyMatches>(
    'extractIfPropertyMatches',
    extractIfPropertyMatches,

    [[{a: 'b'}], [{a: 'b'}], {a: 'b'}],
    [[{a: 'b'}], [{a: 'b'}], {a: '.'}],
    [[], [{a: 'b'}], {a: 'a'}],
    [[], [], {a: 'a'}],
    [[], [{a: 2}], {b: /a/}],
    [
        [{mimeType: 'text/x-webm'}],
        [{mimeType: 'text/x-webm'}],
        {mimeType: /^text\/x-webm$/}
    ]
)
testEach<typeof intersect>(
    'intersect',
    intersect,

    [['A'], ['A'], ['A']],
    [['A'], ['A', 'B'], ['A']],
    [[], [], []],
    [[], [5], []],
    [[{a: 2}], [{a: 2}], [{a: 2}]],
    [[], [{a: 3}], [{a: 2}]],
    [[], [{a: 3}], [{b: 3}]],
    [[], [{a: 3}], [{b: 3}], ['b']],
    [[], [{a: 3}], [{b: 3}], ['b'], false],
    [[{b: null}], [{b: null}], [{b: null}], ['b']],
    [[], [{b: null}], [{b: undefined}], ['b']],
    [[{b: null}], [{b: null}], [{b: undefined}], ['b'], false],
    [[{b: null}], [{b: null}], [{}], ['b'], false],
    [[{b: undefined}], [{b: undefined}], [{}], ['b'], false],
    [[{}], [{}], [{}], ['b'], false],
    [[], [{b: null}], [{}], ['b']],
    [[{b: undefined}], [{b: undefined}], [{}], ['b'], true],
    [[{b: 1}], [{b: 1}], [{a: 1}], {b: 'a'}, true]
)
testEach<typeof makeArray>(
    'makeArray',
    makeArray,

    [[], []],
    [[1, 2, 3], [1, 2, 3]],
    [[1], 1]
)
testEach<typeof makeRange>(
    'makeRange',
    makeRange,

    [[], []],
    [[0], 0],
    [[0], [0]],
    [[0, 1, 2, 3, 4, 5], [5]],
    [[2, 3, 4, 5], [2, 5]],
    [[1, 2, 3], [1, 2, 3]],
    [[], [2, 1]],
    [[2, 4, 6, 8, 10], [2, 10], 2],
    [[2, 4, 6, 8], [2, 10], 2, true]
)
testEach<typeof merge>(
    'merge',
    merge,

    [[], [], []],
    [[1], [1], []],
    [[1], [], [1]],
    [[1, 1], [1], [1]],
    [[1, 2, 3, 1, 1, 2, 3], [1, 2, 3, 1], [1, 2, 3]]
)
testEach<typeof paginate>(
    'paginate',
    paginate,

    [
        [
            {
                disabled: true,
                page: 1,
                selected: false,
                type: 'previous'
            },
            {
                disabled: false,
                page: 1,
                selected: true,
                type: 'page'
            },
            {
                disabled: true,
                page: 1,
                selected: false,
                type: 'next'
            }
        ],
        {total: 1}
    ],
    [
        [
            {
                disabled: false,
                page: 2,
                selected: false,
                type: 'previous'
            },
            {
                disabled: false,
                page: 1,
                selected: false,
                type: 'page'
            },
            {
                disabled: false,
                page: 2,
                selected: false,
                type: 'page'
            },
            {
                disabled: false,
                page: 3,
                selected: true,
                type: 'page'
            },
            {
                disabled: false,
                page: 4,
                selected: false,
                type: 'page'
            },
            {
                disabled: false,
                page: 5,
                selected: false,
                type: 'page'
            },
            {
                disabled: false,
                selected: false,
                type: 'end-ellipsis'
            },
            {
                disabled: false,
                page: 100,
                selected: false,
                type: 'page'
            },
            {
                disabled: false,
                page: 4,
                selected: false,
                type: 'next'
            }
        ],
        {
            page: 3,
            siblingCount: 1,
            total: 500
        }
    ]
)
testEach<typeof permutate>(
    'permutate',
    permutate,

    [[[]], []],
    [[[1]], [1]],
    [[[1, 2], [2, 1]], [1, 2]],
    [
        [
            [1, 2, 3],
            [1, 3, 2],
            [2, 1, 3],
            [2, 3, 1],
            [3, 1, 2],
            [3, 2, 1]
        ],
        [1, 2, 3]
    ],
    [
        [
            ['1', '2', '3'],
            ['1', '3', '2'],
            ['2', '1', '3'],
            ['2', '3', '1'],
            ['3', '1', '2'],
            ['3', '2', '1']
        ],
        ['1', '2', '3']
    ]
)
testEach<typeof permutateLength>(
    'permutateLength',
    permutateLength,

    [[], []],
    [[[1]], [1]],
    [[[1], [2], [1, 2]], [1, 2]],
    [
        [
            [1],
            [2],
            [3],
            [1, 2],
            [1, 3],
            [2, 3],
            [1, 2, 3]
        ],
        [1, 2, 3]
    ],
    [
        [
            ['1'],
            ['2'],
            ['3'],
            ['1', '2'],
            ['1', '3'],
            ['2', '3'],
            ['1', '2', '3']
        ],
        ['1', '2', '3']
    ]
)
testEach<typeof sumUpProperty>(
    'sumUpProperty',
    sumUpProperty,

    [5, [{a: 2}, {a: 3}], 'a'],
    [2, [{a: 2}, {b: 3}], 'a'],
    [0, [{a: 2}, {b: 3}], 'c']
)
testEach<typeof removeArrayItem>(
    'removeArrayItem',
    removeArrayItem,

    [[], [], 2],
    [[], [2], 2],
    [[], [2], 2, true],
    [[1], [1, 2], 2],
    [[1], [1, 2], 2, true]
)
test('arrayRemove([], 2, true) -> throws Exception', ():void =>
    expect(():Array<number> => removeArrayItem<number>([], 2, true))
        .toThrow(new Error(`Given target doesn't exists in given list.`))
)
testEach<typeof sortTopological>(
    'sortTopological',
    sortTopological,

    [[], {}],
    [['a'], {a: []}],
    [['b', 'a'], {a: 'b'}],
    [['a', 'b'], {a: [], b: 'a'}],
    [['a', 'b'], {a: [], b: ['a']}],
    [['b', 'a'], {a: ['b'], b: []}],
    [['a', 'b', 'c'], {c: 'b', a: [], b: ['a']}],
    [['a', 'b', 'c'], {b: ['a'], a: [], c: ['a', 'b']}]
)
testEachSingleParameterAgainstSameExpectation<typeof sortTopological>(
    'sortTopological',
    sortTopological,
    TEST_THROW_SYMBOL,

    {a: 'a'},
    {a: 'b', b: 'a'},
    {a: 'b', b: 'c', c: 'a'}
)
testEach<typeof unique>(
    'unique',
    unique,

    [[1, 2, 3], [1, 2, 3, 1]],
    [[1, 2, 3], [1, 2, 3, 1, 2, 3]],
    [[], []],
    [[1, 2, 3], [1, 2, 3]]
)
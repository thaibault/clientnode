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

    generic test boilerplate:

    test.each([[EXPECTED, ...PARAMETERS], ...])(
        '%p === FUNCTION(...%p)',
        (expected: ReturnType<FUNCTION>, ...parameters: Parameters<FUNCTION>) =>
            expect(FUNCTION(...parameters)).toStrictEqual(expected)
    )
*/
import {expect, test} from '@jest/globals'

import {VALUE_COPY_SYMBOL} from '../constants'
import {NOOP} from '../context'
import {isPlainObject} from '../indicators'
import {
    addDynamicGetterAndSetter,
    convertCircularObjectToJSON,
    convertMapToPlainObject,
    convertPlainObjectToMap,
    convertSubstringInPlainObject,
    copy,
    determineType,
    equals,
    evaluateDynamicData,
    extend,
    getProxyHandler,
    getSubstructure,
    mask,
    modifyObject,
    removeKeyPrefixes,
    removeKeysInEvaluation,
    represent,
    sort,
    unwrapProxy
} from '../object'
import {
    testEach,
    testEachAgainstSameExpectation,
    testEachPromise,
    testEachPromiseAgainstSameExpectation
} from '../test-helper'
import {FirstParameter, PlainObject, ProxyType, SecondParameter} from '../type'

declare const TARGET_TECHNOLOGY: string

const now = new Date()

test('addDynamicGetterAndSetter', (): void => {
    expect(addDynamicGetterAndSetter(null)).toStrictEqual(null)
    expect(addDynamicGetterAndSetter(true)).toStrictEqual(true)
    expect(addDynamicGetterAndSetter({a: 2})).toStrictEqual({a: 2})
    expect(addDynamicGetterAndSetter({}))
        .not.toHaveProperty('__target__')
    expect(
        (addDynamicGetterAndSetter(
            {}, (value: unknown): unknown => value
        ) as ProxyType).__target__
    ).toBeInstanceOf(Object)
    const mockup = {}
    expect(addDynamicGetterAndSetter(mockup)).toStrictEqual(mockup)
    expect(
        (addDynamicGetterAndSetter(
            mockup, (value: unknown): unknown => value
        ) as ProxyType).__target__
    ).toStrictEqual(mockup)
    expect(
        addDynamicGetterAndSetter(
            {a: 1}, (value: unknown): number => (value as number) + 2
        ).a
    ).toStrictEqual(3)
    expect(
        addDynamicGetterAndSetter(
            {a: {a: 1}},
            (value: unknown): number | PlainObject =>
                isPlainObject(value) ? value : (value as number) + 2
        ).a.a
    ).toStrictEqual(3)
    expect(
        addDynamicGetterAndSetter(
            {a: {a: [{a: 1}]}},
            (value: unknown): number | PlainObject =>
                isPlainObject(value) ? value : (value as number) + 2
        ).a.a[0].a
    ).toStrictEqual(3)
    expect(
        addDynamicGetterAndSetter(
            {a: {a: 1}},
            (value: unknown): number | PlainObject =>
                isPlainObject(value) ? value : (value as number) + 2,
            null,
            {has: 'hasOwnProperty'},
            false
        ).a.a
    ).toStrictEqual(1)
    expect(
        addDynamicGetterAndSetter(
            {a: 1},
            (value: unknown): number | PlainObject =>
                isPlainObject(value) ? value : (value as number) + 2,
            null,
            {has: 'hasOwnProperty'},
            false,
            []
        ).a
    ).toStrictEqual(1)
    expect(
        (addDynamicGetterAndSetter(
            {a: new Map([['a', 1]])},
            (value: unknown): number | PlainObject =>
                isPlainObject(value) ? value : (value as number) + 2,
            null,
            {delete: 'delete', get: 'get', set: 'set', has: 'has'},
            true,
            [Map]
        ).a as unknown as {a: number}).a
    ).toStrictEqual(3)
})
test('convertCircularObjectToJSON', (): void => {
    const object: {a: PlainObject, b?: PlainObject} = {a: {}}
    object.b = object.a

    expect(convertCircularObjectToJSON(object))
        .toStrictEqual('{"a":{},"b":{}}')
})
test('convertCircularObjectToJSON', () => {
    const object: {a?: PlainObject} = {}
    const subObject: {a: PlainObject} = {a: object}
    object.a = subObject

    expect(convertCircularObjectToJSON(object))
        .toStrictEqual('{"a":{"a":"__circularReference__"}}')
})
test('convertCircularObjectToJSON', () => {
    const rootObject: Array<{a: unknown}> = []
    const subObject: {a: typeof rootObject} = {a: rootObject}
    rootObject.push(subObject)

    expect(convertCircularObjectToJSON(rootObject))
        .toStrictEqual('[{"a":"__circularReference__"}]')
})
testEach<typeof convertCircularObjectToJSON>(
    'convertCircularObjectToJSON',
    convertCircularObjectToJSON,

    ['null', null],
    [undefined, undefined],
    ['5', 5],
    ['[]', []],
    ['[5]', [5]],
    ['["a"]', ['a']],
    ['["a",{"a":[]}]', ['a', {a: []}]],
    ['"A"', 'A'],
    ['{}', {}],
    ['{"a":null}', {a: null}],
    ['{"a":{"a":2}}', {a: {a: 2}}],
    ['{"a":{"a":null}}', {a: {a: Infinity}}]
)
testEach<typeof convertMapToPlainObject>(
    'convertMapToPlainObject',
    convertMapToPlainObject,

    [null, null],
    [true, true],
    [0, 0],
    [2, 2],
    ['a', 'a'],
    [{}, new Map()],
    [[{}], [new Map()]],
    [[new Map()], [new Map()], false],
    [[{a: 2, '2': 2}], [new Map<string, number>([['a', 2], ['2', 2]])]],
    [
        [[{a: {}, '2': 2}]],
        [[new Map<string, Map<string, string> | number>(
            [['a', new Map()], ['2', 2]]
        )]]
    ],
    [
        [[{a: {a: 2}, '2': 2}]],
        [[new Map<string, Map<string, number> | number>(
            [['a', new Map([['a', 2]])], ['2', 2]]
        )]]
    ]
)
testEach<typeof convertPlainObjectToMap>(
    'convertPlainObjectToMap',
    convertPlainObjectToMap,

    [null, null],
    [true, true],
    [0, 0],
    [2, 2],
    ['a', 'a'],
    [new Map(), {}],
    [[new Map()], [{}]],
    [[{}], [{}], false],
    [
        [new Map<string, Map<string, string> | number>(
            [['a', new Map()], ['b', 2]]
        )],
        [{a: {}, b: 2}]
    ],
    [
        [new Map<string, Map<string, string> | number>(
            [['a', new Map()], ['b', 2]]
        )],
        [{b: 2, a: {}}]
    ],
    [
        [new Map<string, Map<string, string> | number>(
            [['a', new Map()], ['b', 2]]
        )],
        [{b: 2, a: new Map()}]
    ],
    [
        [new Map<string, [Map<string, string>] | number>(
            [['a', [new Map()]], ['b', 2]]
        )],
        [{b: 2, a: [{}]}]
    ],
    [
        [new Map<string, Set<Map<string, string>> | number>(
            [['a', new Set([new Map()])], ['b', 2]]
        )],
        [{b: 2, a: new Set([{}])}]
    ]
)
testEach<typeof convertSubstringInPlainObject>(
    'convertSubstringInPlainObject',
    convertSubstringInPlainObject,

    [{}, {}, /a/, ''],
    [{a: 'b'}, {a: 'a'}, /a/, 'b'],
    [{a: 'ba'}, {a: 'aa'}, /a/, 'b'],
    [{a: 'bb'}, {a: 'aa'}, /a/g, 'b'],
    [{a: {a: 'bb'}}, {a: {a: 'aa'}}, /a/g, 'b']
)
testEach<typeof copy>(
    'copy',
    copy,

    [21, 21],
    [0, 0],
    [0, 0, -1],
    [0, 0, 1],
    [0, 0, 10],
    [new Date(0), new Date(0)],
    [/a/, /a/],
    [{}, {}],
    [{}, {}, -1],
    [[], []],
    [new Map(), new Map()],
    [new Set(), new Set()],
    [{a: 2}, {a: 2}, 0],
    [{a: null}, {a: {a: 2}}, 0, null],
    [{a: {a: 2}}, {a: {a: 2}}, 0],
    [{a: {a: 2}}, {a: {a: 2}}, 1],
    [{a: {a: 2}}, {a: {a: 2}}, 2],
    [{a: [null]}, {a: [{a: 2}]}, 1, null],
    [{a: [{a: 2}]}, {a: [{a: 2}]}, 2],
    [{a: {a: 2}}, {a: {a: 2}}, 10],
    [new Map([['a', 2]]), new Map([['a', 2]]), 0],
    [
        new Map([['a', null]]),
        new Map([['a', new Map([['a', 2]])]]),
        0,
        null
    ],
    [
        new Map([['a', new Map([['a', 2]])]]),
        new Map([['a', new Map([['a', 2]])]]),
        0
    ],
    [
        new Map([['a', new Map([['a', 2]])]]),
        new Map([['a', new Map([['a', 2]])]]),
        1
    ],
    [
        new Map([['a', new Map([['a', 2]])]]),
        new Map([['a', new Map([['a', 2]])]]),
        2
    ],
    [
        new Map([['a', [null]]]),
        new Map([['a', [new Map([['a', 2]])]]]),
        1,
        null
    ],
    [
        new Map([['a', [new Map([['a', 2]])]]]),
        new Map([['a', [new Map([['a', 2]])]]]),
        2
    ],
    [
        new Map([['a', new Map([['a', 2]])]]),
        new Map([['a', new Map([['a', 2]])]]),
        10
    ],
    [
        new Map([['a', new Map([['a', 2]])]]),
        new Map([['a', new Map([['a', 2]])]]),
        10
    ],
    [new Set(['a', 2]), new Set(['a', 2]), 0],
    [new Set([null, null]), new Set(['a', new Set(['a', 2])]), 0, null],
    [
        new Set(['a', new Set([null, null])]),
        new Set(['a', new Set(['a', 2])]),
        1,
        null
    ],
    [
        new Set(['a', new Set(['a', 2])]),
        new Set(['a', new Set(['a', 2])]),
        1
    ],
    [
        new Set(['a', new Set(['a', 2])]),
        new Set(['a', new Set(['a', 2])]),
        2
    ],
    [
        new Set(['a', [null]]),
        new Set(['a', [new Set(['a', 2])]]),
        1,
        null
    ],
    [
        new Set(['a', [new Set(['a', 2])]]),
        new Set(['a', [new Set(['a', 2])]]),
        2
    ],
    [
        new Set(['a', new Set(['a', 2])]),
        new Set(['a', new Set(['a', 2])]),
        10
    ],
    [
        new Set(['a', new Set(['a', 2])]),
        new Set(['a', new Set(['a', 2])]),
        10
    ],
    [{VALUE_COPY_SYMBOL}, {VALUE_COPY_SYMBOL}]
)
test('determineType', () => {
    expect(determineType()).toStrictEqual('undefined')
})
testEach<typeof determineType>(
    'determineType',
    determineType,

    ['undefined', undefined],
    ['undefined', ({} as {notDefined: undefined}).notDefined],
    ['null', null],
    ['boolean', true],
    ['boolean', new Boolean()],
    ['number', 3],
    ['number', new Number(3)],
    ['string', ''],
    ['string', new String('')],
    ['string', 'test'],
    ['string', new String('test')],
    ['function', function(): void {
        // Do nothing.
    }],
    ['function', NOOP],
    ['array', []],
    /*
        eslint-disable
        @typescript-eslint/no-array-constructor,no-array-constructor
    */
    ['array', new Array()],
    /*
        eslint-enable
        @typescript-eslint/no-array-constructor,no-array-constructor
    */
    ['date', now],
    ['error', new Error()],
    ['map', new Map()],
    ['set', new Set()],
    ['regexp', /test/]
)
testEachAgainstSameExpectation<typeof equals>(
    'equals',
    equals,
    true,

    [1, 1],
    [now, now],
    [new Date(1995, 11, 17), new Date(1995, 11, 17)],
    [/a/, /a/],
    [{a: 2}, {a: 2}],
    [{a: 2, b: 3}, {a: 2, b: 3}],
    [[1, 2, 3], [1, 2, 3]],
    [[], []],
    [{}, {}],
    [new Map(), new Map()],
    [new Set(), new Set()],
    [[1, 2, 3, {a: 2}], [1, 2, 3, {a: 2}]],
    [[1, 2, 3, new Map([['a', 2]])], [1, 2, 3, new Map([['a', 2]])]],
    [[1, 2, 3, new Set(['a', 2])], [1, 2, 3, new Set(['a', 2])]],
    [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]],
    [[{a: 1}], [{a: 1}]],
    [[{a: 1, b: 1}], [{a: 1}], {properties: []}],
    [[{a: 1, b: 1}], [{a: 1}], {properties: ['a']}],
    [2, 2, {deep: 0}],
    [[{a: 1, b: 1}], [{a: 1}], {deep: 0}],
    [[{a: 1}, {b: 1}], [{a: 1}, {b: 1}], {deep: 1}],
    [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], {deep: 1}],
    [[{a: {b: 1}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 2}],
    [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 2}],
    [
        [{a: {b: {c: 1}}}, {b: 1}],
        [{a: {b: 1}}, {b: 1}],
        {deep: 3, properties: ['b']}
    ],
    [NOOP, NOOP],
    [NOOP, NOOP, {ignoreFunctions: false}]
)
if (TARGET_TECHNOLOGY === 'node')
    test('equals', () => {
        expect(equals(
            Buffer.from('a'),
            Buffer.from('a'),
            {compareBlobs: true, properties: []}
        )).toStrictEqual(true)
    })
else {
    testEachPromiseAgainstSameExpectation<typeof equals>(
        'equals',
        equals,
        true,

        ...([
            [
                new Blob(['a'], {type: 'text/plain'}),
                new Blob(['a'], {type: 'text/plain'})
            ],
            [
                [new Blob(['a'], {type: 'text/plain'})],
                [new Blob(['a'], {type: 'text/plain'})]
            ],
            [
                {a: new Blob(['a'], {type: 'text/plain'})},
                {a: new Blob(['a'], {type: 'text/plain'})}
            ],
            [
                new Map([['a', new Blob(['a'], {type: 'text/plain'})]]),
                new Map([['a', new Blob(['a'], {type: 'text/plain'})]])
            ],
            [
                new Set([new Blob(['a'], {type: 'text/plain'})]),
                new Set([new Blob(['a'], {type: 'text/plain'})])
            ],
            [
                {
                    a: new Set([[new Map([['a', new Blob(['a'], {
                        type: 'text/plain'
                    })]])]]),
                    b: 2
                },
                {
                    a: new Set([[new Map([['a', new Blob(['a'], {
                        type: 'text/plain'
                    })]])]]),
                    b: 2
                }
            ]
        ] as Array<[
            FirstParameter<typeof equals>,
            SecondParameter<typeof equals>
        ]>).map((parameters: [
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]): Parameters<typeof equals> =>
                parameters.concat({compareBlobs: true}) as
                    Parameters<typeof equals>
        )
    )
    testEachPromiseAgainstSameExpectation<typeof equals>(
        'equals',
        equals,
        false,

        ...([
            [
                new Blob(['a'], {type: 'text/plain'}),
                new Blob(['b'], {type: 'text/plain'})
            ],
            [
                [new Blob(['a'], {type: 'text/plain'})],
                [new Blob(['b'], {type: 'text/plain'})]
            ],
            [
                {a: new Blob(['a'], {type: 'text/plain'})},
                {a: new Blob(['b'], {type: 'text/plain'})}
            ],
            [
                new Map([['a', new Blob(['a'], {type: 'text/plain'})]]),
                new Map([['a', new Blob(['b'], {type: 'text/plain'})]])
            ],
            [
                new Set([new Blob(['a'], {type: 'text/plain'})]),
                new Set([new Blob(['b'], {type: 'text/plain'})])
            ],
            [
                {
                    a: new Set([[new Map([[
                        'a', new Blob(['a'], {type: 'text/plain'})
                    ]])]]),
                    b: 2
                },
                {
                    a: new Set([[new Map([['a', new Blob(['b'], {
                        type: 'text/plain'
                    })]])]]),
                    b: 2
                }
            ]
        ] as Array<[
            FirstParameter<typeof equals>,
            SecondParameter<typeof equals>
        ]>).map((parameter: [
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]): Parameters<typeof equals> =>
                parameter.concat({compareBlobs: true}) as
                    Parameters<typeof equals>
        )
    )
    testEachPromise<typeof equals>(
        'equals',
        equals,

        [
            '>>> Blob("data:text/plain;base64,YQ==") !== ' +
            'Blob("data:text/plain;base64,Yg==")',
            new Blob(['a'], {type: 'text/plain'}),
            new Blob(['b'], {type: 'text/plain'}),
            {compareBlobs: true, returnReasonIfNotEqual: true}
        ],
        [
            'a[1].a.get(1) >>> Blob("data:text/plain;base64,YQ==") !== ' +
            'Blob("data:text/plain;base64,Yg==")',
            {
                a: [
                    1,
                    {a: new Map(
                        [[1, new Blob(['a'], {type: 'text/plain'})]]
                    )}
                ]
            },
            {
                a: [
                    1,
                    {a: new Map(
                        [[1, new Blob(['b'], {type: 'text/plain'})]]
                    )}
                ]
            },
            {compareBlobs: true, returnReasonIfNotEqual: true}
        ]
    )
}
testEachAgainstSameExpectation<typeof equals>(
    'equals',
    equals,
    false,

    [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], {deep: 2}],
    [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 3}],
    [new Date(1995, 11, 17), new Date(1995, 11, 16)],
    [/a/i, /a/],
    [1, 2],
    [{a: 2, b: 3}, {a: 2}],
    [[1, 2, 3, 4], [1, 2, 3, 5]],
    [[1, 2, 3, 4], [1, 2, 3]],
    [[1, 2, 3, {a: 2}], [1, 2, 3, {b: 2}]],
    [[1, 2, 3, new Map([['a', 2]])], [1, 2, 3, new Map([['b', 2]])]],
    [[1, 2, 3, new Set(['a', 2])], [1, 2, 3, new Set(['b', 2])]],
    [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]],
    [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2]]],
    [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, {}]]],
    [[{a: 1, b: 1}], [{a: 1}]],
    [[{a: 1, b: 1}], [{a: 1}], {properties: ['a', 'b']}],
    [1, 2, {deep: 0}],
    [[{a: 1}, {b: 1}], [{a: 1}], {deep: 1}],
    [
        NOOP,
        () => {
            // Do nothing.
        },
        {deep: -1, ignoreFunctions: false, properties: []}
    ]
)
testEach<typeof equals>(
    'equals',
    equals,

    ['>>> 1 !== 2', 1, 2, {returnReasonIfNotEqual: true}],
    ['a >>> 1 !== 2', {a: 1}, {a: 2}, {returnReasonIfNotEqual: true}],
    [
        'a[1] >>> 2 !== 1',
        {a: [1, 2]},
        {a: [1, 1]},
        {returnReasonIfNotEqual: true}
    ],
    [
        'a[1].a >>> 2 !== 1',
        {a: [1, {a: 2}]},
        {a: [1, {a: 1}]},
        {returnReasonIfNotEqual: true}
    ],
    [
        'a[1].a >>> {-> 2 not found}',
        {a: [1, {a: new Set([2])}]},
        {a: [1, {a: new Set([1])}]},
        {returnReasonIfNotEqual: true}
    ],
    [
        'a[1].a.get(1) >>> 1 !== 2',
        {a: [1, {a: new Map([[1, 1]])}]},
        {a: [1, {a: new Map([[1, 2]])}]},
        {returnReasonIfNotEqual: true}
    ]
)
testEach<typeof evaluateDynamicData>(
    'evaluateDynamicData',
    evaluateDynamicData,

    [null, null],
    [false, false],
    ['1', '1'],
    [3, 3],
    [{}, {}],
    [{a: null}, {a: null}],
    [4, {__evaluate__: '1 + 3'}],
    [[1], [{__evaluate__: '1'}]],
    [['1'], [{__evaluate__: `'1'`}]],
    [{a: 'a'}, {a: {__evaluate__: `'a'`}}],
    [{a: 1}, {a: {__evaluate__: '1'}}],
    [
        {a: {__evaluate__: 'self.b'}, b: 2},
        {a: {__evaluate__: 'self.b'}, b: 2},
        {},
        'self',
        '__run__'
    ],
    [{a: 1, b: 1}, {a: {__run: '_.b'}, b: 1}, {}, '_', '__run'],
    [
        {a: [1], b: 1},
        {a: [{__run: 'self.b'}], b: 1},
        {},
        'self',
        '__run'
    ],
    [{a: 2, b: 2}, {a: {__evaluate__: 'self.b'}, b: 2}],
    [{a: 2, b: 2}, {a: {__evaluate__: 'c.b'}, b: 2}, {}, 'c'],
    [
        {a: 2, b: 2, c: 2},
        {
            a: {__evaluate__: 'self.b'},
            b: {__evaluate__: 'self.c'},
            c: 2
        }
    ],
    [
        {a: 3, b: 3, c: 3, d: 3, e: 3, f: 3},
        {
            a: {__execute__: 'return self.b'},
            b: {__execute__: 'return self.c'},
            c: {__execute__: 'return self.d'},
            d: {__execute__: 'return self.e'},
            e: {__execute__: 'return self.f'},
            f: 3
        }
    ],
    [
        {a: 3, b: {d: {e: 3}}, c: {d: {e: 3}}},
        {
            a: {__evaluate__: 'self.b.d.e'},
            b: {__evaluate__: 'self.c'},
            c: {d: {e: 3}}
        }
    ],
    [
        {
            a: 'kk <-> "1", "2", "3" <-> jj',
            b: 'kk <-> "1", "2", "3" <-> jj',
            c: 'kk <-> "1", "2", "3" <-> jj',
            d: 'kk <-> "1", "2", "3" <-> jj',
            e: 'kk <-> "1", "2", "3" <-> jj',
            f: {i: 'kk <-> "1", "2", "3" <-> jj'},
            g: {h: {i: 'kk <-> "1", "2", "3" <-> jj'}},
            j: 'jj',
            k: 'kk <-> "1", "2", "3"',
            l: [1, 2, 3],
            m: {a: [1, 2, 3]},
            n: {a: [1, 2, 3]},
            o: [{a: 2, b: [[[100]]]}]
        },
        {
            n: {__evaluate__: '{a: [1, 2, 3]}'},
            b: {__evaluate__: 'self.c'},
            f: {__evaluate__: 'self.g.h'},
            d: {__evaluate__: 'self.e'},
            a: {__evaluate__: 'self.b'},
            e: {__evaluate__: 'self.f.i'},
            k: {__evaluate__: '`kk <-> "${self.l.join(\'", "\')}"`'},
            c: {__evaluate__: 'self.d'},
            o: [{a: 2, b: [[[{__evaluate__: '10 ** 2'}]]]}],
            l: {__evaluate__: 'self.m.a'},
            g: {h: {i: {__evaluate__: '`${self.k} <-> ${self.j}`'}}},
            m: {a: [1, 2, {__evaluate__: '3'}]},
            j: 'jj'
        }
    ],
    [
        {a: [2], b: {d: {e: [2]}}, c: {d: {e: [2]}}},
        {
            a: {__evaluate__: '_.b.d.e'},
            b: {__evaluate__: '_.c'},
            c: {d: {e: {__evaluate__: 'tools.copy([2])'}}}
        },
        {tools: {copy}},
        '_'
    ],
    [
        {a: {b: 1, c: 1}},
        {a: {
            b: 1,
            c: {__evaluate__: 'self.a.b'}
        }}
    ],
    [
        {a: {b: null, c: null}},
        {a: {
            b: null,
            c: {__evaluate__: 'self.a.b'}
        }}
    ],
    [
        {a: {b: undefined, c: undefined}},
        {a: {
            b: undefined,
            c: {__evaluate__: 'self.a.b'}
        }}
    ],
    [
        {a: {b: 'jau', c: 'jau'}},
        {a: {
            b: 'jau',
            c: {__evaluate__: 'self.a.b'}
        }}
    ],
    [
        {a: {b: {c: 'jau', d: 'jau'}}},
        {a: {
            b: {
                c: 'jau',
                d: {__evaluate__: 'self.a.b.c'}
            }
        }}
    ],
    [
        {a: {b: 'test', c: 'tet'}},
        {a: {
            b: {__evaluate__: '"t" + "es" + "t"'},
            c: {__evaluate__: 'removeS(self.a.b)'}
        }},
        {removeS: (value: string): string => value.replace('s', '')}
    ],
    [
        {a: 'a', b: 'a'},
        {
            a: {__evaluate__: 'toString(self.b)'},
            b: {__evaluate__: `'a'`}
        },
        {toString: (value: string): string => value}
    ],
    [
        {a: ['a'], b: {a: 2}},
        {
            a: {__evaluate__: 'Object.getOwnPropertyNames(self.b)'},
            b: {__evaluate__: '{a: 2}'}
        }
    ],
    [
        {a: ['a'], b: {a: 2}},
        {
            a: {__evaluate__: 'Reflect.ownKeys(self.b)'},
            b: {__evaluate__: '{a: 2}'}
        }
    ],
    [
        {a: ['a', 'b'], b: {a: 1, b: 2}, c: {a: 1, b: 2}},
        {
            a: {__evaluate__: 'Object.getOwnPropertyNames(self.b)'},
            b: {__evaluate__: 'self.c'},
            c: {__execute__: 'return {a: 1, b: 2}'}
        }
    ],
    /*
        NOTE: This describes a workaround until the "ownKeys" proxy trap works
        for this use cases.
    */
    [
        {a: ['a'], b: {a: 2}},
        {
            a: {__evaluate__: 'Object.keys(resolve(self.b))'},
            b: {__evaluate__: '{a: 2}'}
        }
    ],
    [
        {a: ['a', 'b', 'c'], b: {a: 1, b: 2, c: 3}},
        {
            a: {
                __evaluate__: `(() => {
                    const result = []
                    for (const key in resolve(self.b))
                        result.push(key)
                    return result
                })()`
            },
            b: {__evaluate__: '{a: 1, b: 2, c: 3}'}
        }
    ]
)
testEach<typeof removeKeysInEvaluation>(
    'removeKeysInEvaluation',
    removeKeysInEvaluation,

    [{}, {}],
    [{a: 2}, {a: 2}],
    [{__evaluate__: ''}, {a: 2, __evaluate__: ''}],
    [
        {a: 2, b: {__evaluate__: ''}},
        {a: 2, b: {__evaluate__: '', c: 4}}
    ]
)
test('extend', () => {
    const target: PlainObject = {a: [1, 2]}
    extend(true, target, {a: [3, 4]})
    expect(target).toStrictEqual({a: [3, 4]})
})
testEach<typeof extend>(
    'extend',
    extend,

    [[], []],
    [{}, {}],
    [{a: 1}, {a: 1}],
    [{a: 2}, {a: 1}, {a: 2}],
    [{a: 2}, {}, {a: 1}, {a: 2}],
    [{a: 2}, {}, {a: 1}, {a: 2}],
    [{a: 2, b: {b: 1}}, {a: 1, b: {a: 1}}, {a: 2, b: {b: 1}}],
    [[1], [1, 2], [1]],
    [new Map(), new Map()],
    [new Set(), new Set()],
    [new Map([['a', 1]]), new Map([['a', 1]])],
    [new Map([['a', 2]]), new Map([['a', 1]]), new Map([['a', 2]])],
    [
        new Map([['a', 2]]),
        new Map(),
        new Map([['a', 1]]),
        new Map([['a', 2]])
    ],
    [
        new Map([['a', 2]]),
        new Map(),
        new Map([['a', 1]]),
        new Map([['a', 2]])
    ],
    [
        new Map<string, Map<string, number> | number>(
            [['a', 2], ['b', new Map([['b', 1]])]]
        ),
        new Map<string, Map<string, number> | number>(
            [['a', 1], ['b', new Map<string, number>([['a', 1]])]]
        ),
        new Map<string, Map<string, number> | number>(
            [['a', 2], ['b', new Map<string, number>([['b', 1]])]]
        )
    ],
    [{}, true, {}],
    [
        {a: 2, b: {a: 1, b: 1}},
        true,
        {a: 1, b: {a: 1}},
        {a: 2, b: {b: 1}}
    ],
    [
        {a: 2, b: {a: [], b: 1}},
        true,
        {a: 1, b: {a: []}},
        {a: 2, b: {b: 1}}
    ],
    [{a: {a: [3, 4]}}, true, {a: {a: [1, 2]}}, {a: {a: [3, 4]}}],
    [{a: {a: null}}, true, {a: {a: [1, 2]}}, {a: {a: null}}],
    [{a: true}, true, {a: {a: [1, 2]}}, {a: true}],
    [{a: {_a: 1, b: 2}}, true, {a: {_a: 1}}, {a: {b: 2}}],
    [{a: 2, _a: 1}, false, {_a: 1}, {a: 2}],
    [false, true, {a: {a: [1, 2]}}, false],
    [
        undefined,
        true,
        {a: {a: [1, 2]}},
        undefined as unknown as Partial<unknown>
    ],
    [{a: 3}, true, {a: 1}, {a: 2}, {a: 3}],
    [[1, 2], true, [1], [1, 2]],
    [[1], true, [1, 2], [1]],
    [new Map(), true, new Map()],
    [
        new Map<string, Map<string, number> | number>(
            [['a', 2], ['b', new Map([['a', 1], ['b', 1]])]]
        ),
        true,
        new Map<string, Map<string, number> | number>(
            [['a', 1], ['b', new Map([['a', 1]])]]
        ),
        new Map<string, Map<string, number> | number>(
            [['a', 2], ['b', new Map([['b', 1]])]]
        )
    ],
    [
        new Map<string, Map<string, [] | number> | number>(
            [
                ['a', 2],
                ['b', new Map<string, [] | number>([['a', []], ['b', 1]])]
            ]
        ),
        true,
        new Map<string, Map<string, []> | number>(
            [['a', 1], ['b', new Map([['a', []]])]]
        ),
        new Map<string, Map<string, number> | number>(
            [['a', 2], ['b', new Map([['b', 1]])]]
        )
    ],
    [
        new Map<string, Map<string, Array<number>>>(
            [['a', new Map<string, Array<number>>([['a', [3, 4]]])]]
        ),
        true,
        new Map<string, Map<string, Array<number>>>(
            [['a', new Map([['a', [1, 2]]])]]
        ),
        new Map<string, Map<string, Array<number>>>(
            [['a', new Map([['a', [3, 4]]])]]
        )
    ],
    [[1, 2], [1, 2], undefined],
    [undefined, true, [1, 2], undefined as unknown as Partial<unknown>],
    [null, [1, 2], null as unknown as Partial<unknown>]
)
testEach<typeof getSubstructure>(
    'getSubstructure',
    getSubstructure,

    [{}, {}, []],
    [{}, {}, ['']],
    [{}, {}, ''],
    [1, {a: 1}, ['a']],
    [null, {a: {a: null}}, 'a.a'],
    [[], {a: {a: []}}, 'a.a'],
    [3, {a: {b: {c: 3}}}, ['a', 'b.c']],
    [3, {a: {b: {c: [3]}}}, ['a', 'b.c[0]']],
    [3, {a: {b: {c: [3]}}}, ['', 'a', '', 'b.c[0]', '', '']],
    [
        3,
        {a: {b: {c: [1, 3, 2]}}},
        (root: unknown): number =>
            (root as {a: {b: {c: Array<number>}}}).a.b.c[1]
    ],
    [
        3,
        {a: {b: {c: [1, 3, 2]}}},
        ['a', (root: unknown): number =>
            (root as {b: {c: Array<number>}}).b.c[1]]
    ]
)
test('getProxyHandler', () => {
    expect(isPlainObject(getProxyHandler({})))
        .toStrictEqual(true)
    expect(isPlainObject(getProxyHandler(new Map(), {get: 'get'})))
        .toStrictEqual(true)
})
testEach<typeof mask>(
    'mask',
    mask,

    [{}, {}, {}],
    [{a: 2}, {a: 2}, {}],
    [{}, {a: 2}, {include: false}],
    [{a: 2}, {a: 2}, {include: true}],
    [{a: 2}, {a: 2}, {include: {a: true}}],
    [{}, {a: 2}, {include: {b: true}}],
    [{}, {a: 2}, {include: {a: false}}],
    [{}, {a: 2}, {include: {b: false}}],
    [{a: 2}, {a: 2, b: 3}, {include: {a: true}}],
    [{}, {a: 2, b: 3}, {include: {}}],
    [{b: 3}, {a: 2, b: 3}, {include: {a: false, b: true}}],
    [{b: {a: 2}}, {a: 2, b: {a: 2}}, {include: {a: false, b: true}}],
    [{b: {}}, {a: 2, b: {a: 2}}, {include: {a: false, b: {}}}],
    [{b: {a: 2}}, {a: 2, b: {a: 2}}, {include: {a: false, b: {a: true}}}],
    [
        {a: 2, b: {}},
        {a: 2, b: {a: 2}},
        {include: {a: true, b: {a: false}}}
    ],
    [
        {a: 2, b: {}},
        {a: 2, b: {a: 2}},
        {include: {a: true, b: {a: false}, c: true}}
    ],
    [
        {a: 2, b: {a: 2}},
        {a: 2, b: {a: 2}},
        {include: {a: true, b: {a: true}}}
    ],
    [
        {a: {a: {a: {a: 2}}}},
        {a: {a: {a: {a: 2, b: 3}}}},
        {include: {a: {a: {a: {a: true}}}}}
    ],
    [
        {a: {a: {a: {a: 2, b: 3}}}},
        {a: {a: {a: {a: 2, b: 3}}}},
        {include: {a: {a: {a: true}}}}
    ],
    [{}, {a: 2}, {exclude: true}],
    [{a: 2}, {a: 2}, {exclude: false}],
    [{}, {a: 2}, {exclude: {a: true}}],
    [{a: 2}, {a: 2}, {exclude: {b: true}}],
    [{a: 2}, {a: 2}, {exclude: {b: true}}],
    [{a: 2}, {a: 2, b: 3}, {exclude: {b: true}}],
    [{a: 2, b: 3}, {a: 2, b: 3}, {exclude: {b: false}}],
    [{a: 2, b: {a: 2}}, {a: 2, b: {a: 2}}, {exclude: {b: {}}}],
    [{a: 2, b: {}}, {a: 2, b: {a: 2}}, {exclude: {b: {a: true}}}],
    [{a: 2}, {a: 2, b: {a: 2}}, {exclude: {b: true}}],
    [{a: 2, b: {a: 2}}, {a: 2, b: {a: 2}}, {exclude: {b: {a: false}}}],
    [
        {a: {a: {a: {b: 3}}}},
        {a: {a: {a: {a: 2, b: 3}}}},
        {exclude: {a: {a: {a: {a: true}}}}}
    ],
    [
        {a: {a: {}}},
        {a: {a: {a: {a: 2, b: 3}}}},
        {exclude: {a: {a: {a: true}}}}
    ],
    [{a: 'a'}, {a: 'a', b: 'b'}, {exclude: ['b']}],
    [{b: 'b'}, {a: 'a', b: 'b'}, {include: ['b']}]
)
test.each([
    [{}, {}, {}, {}],
    [{a: 2}, {}, {a: 2}, {}],
    [{a: 2}, {b: 1}, {a: 2}, {b: 1}],
    [{}, {}, {a: 2}, {__remove__: 'a'}],
    [{}, {}, {a: 2}, {__remove__: ['a']}],
    [{a: [1, 2]}, {}, {a: [2]}, {a: {__prepend__: 1}}],
    [{a: [2]}, {}, {a: [2]}, {a: {__remove__: 1}}],
    [{a: [2]}, {}, {a: [2, 1]}, {a: {__remove__: 1}}],
    [{a: []}, {}, {a: [2, 1]}, {a: {__remove__: [1, 2]}}],
    [{a: []}, {}, {a: [1]}, {a: {__remove__: 1}}],
    [{a: []}, {}, {a: [1]}, {a: {__remove__: [1, 2]}}],
    [{a: [2, 1]}, {}, {a: [2]}, {a: {__append__: 1}}],
    [{a: [2, 1, 2]}, {}, {a: [2]}, {a: {__append__: [1, 2]}}],
    [
        {a: [2, 1, 2]},
        {b: 1},
        {a: [2]},
        {a: {__append__: [1, 2]}, b: 1}
    ],
    [
        {a: [2, 1, 2]},
        {b: 1},
        {a: [2]},
        {a: {add: [1, 2]}, b: 1},
        'rm',
        'unshift',
        'add'
    ],
    [
        {a: [2]},
        {a: {__prepend__: 1}},
        {a: [2]},
        {a: {__prepend__: 1}},
        '_r',
        '_p'
    ],
    [{a: [1, 3, 2]}, {}, {a: [2]}, {a: {__prepend__: [1, 3]}}],
    [
        {a: ['s', 2, 1, 2]},
        {},
        {a: [2]},
        {a: {__append__: [1, 2], __prepend__: 's'}}
    ],
    [
        {a: ['s', 2]},
        {},
        {a: [2, 2]},
        {a: {__prepend__: 's', __remove__: 2}}
    ],
    [
        {a: ['s']},
        {},
        {a: [2, 2]},
        {a: {__prepend__: 's', __remove__: [2, 2]}}
    ],
    [
        {a: ['s', 1, 'a']},
        {},
        {a: [2, 1, 2]},
        {a: {__prepend__: 's', __remove__: [2, 2], __append__: 'a'}}
    ],
    [
        {a: [2, 's', 2]},
        {},
        {a: [2, 1, 2]},
        {a: {__1__: 's'}}
    ],
    [
        {a: [2, 1, 2]},
        {a: {__3__: 's'}},
        {a: [2, 1, 2]},
        {a: {__3__: 's'}}
    ],
    [
        {a: [2, 1, 2]},
        {a: {__evaluate__: 's'}},
        {a: [2, 1, 2]},
        {a: {__evaluate__: 's'}}
    ]
])(
    '%p (=> %p) === modifyObject(%p, %p, ...%p)',
    (
        sliced: ReturnType<typeof modifyObject>,
        modified: SecondParameter<typeof modifyObject>,
        ...parameters: Parameters<typeof modifyObject>
    ) => {
        expect(modifyObject(...parameters)).toStrictEqual(sliced)
        expect(parameters[1]).toStrictEqual(modified)
    }
)
testEach<typeof removeKeyPrefixes>(
    'removeKeyPrefixes',
    removeKeyPrefixes,

    [{}, {}, []],
    [new Set(), new Set(), '#'],
    [new Map(), new Map(), []],
    [5, 5, []],
    ['a', 'a', []],
    [[], [], []],
    [{b: 3}, {a: 2, b: 3}, ['a']],
    [{b: 3}, {a: 2, a0: 2, b: 3}, ['a']],
    [
        new Map([['3', []]]),
        new Map<string, [string] | number>(
            [['3', ['a:to remove']], ['a', 3]]
        ),
        'a'
    ],
    [
        [{a: ['value']}],
        [{a: ['#:comment', 'value', '#: remove']}],
        '#'
    ],
    [
        [{a: new Set(['value'])}],
        [{a: new Set(['#:comment', 'value', '#: remove'])}],
        '#'
    ],
    [
        [{a: new Map([['key', 'value']])}],
        [{a: new Map([
            ['#', 'comment'], ['key', 'value'], ['#', 'remove']
        ])}],
        '#'
    ]
)
testEach<typeof represent>(
    'represent',
    represent,

    ['""', ''],
    [
        `{
                a: "A",
                b: 123,
                c: null,
                d: [
                    "a",
                    1,
                    null
                ]
            }`.replace(/(\n) {12}/g, '$1'),
        {
            a: 'A',
            b: 123,
            c: null,
            d: ['a', 1, null]
        }
    ]
)
testEach<typeof sort>(
    'sort',
    sort,

    [[], []],
    [[], {}],
    [[0], [1]],
    [[0, 1, 2], [1, 2, 3]],
    [[0, 1, 2], [3, 2, 1]],
    [[0, 1, 2], [2, 3, 1]],
    [['1', '2', '3'], {'1': 2, '2': 5, '3': 'a'}],
    [['-5', '1', '2'], {'2': 2, '1': 5, '-5': 'a'}],
    [['1', '2', '3'], {'3': 2, '2': 5, '1': 'a'}],
    [['a', 'b', 'c'], {a: 2, b: 5, c: 'a'}],
    [['a', 'b', 'c'], {c: 2, b: 5, a: 'a'}],
    [['b', 'c', 'z'], {b: 2, c: 5, z: 'a'}]
)
testEach<typeof unwrapProxy>(
    'unwrapProxy',
    unwrapProxy,

    [{}, {}],
    [{a: 'a'}, {a: 'a'}],
    [{a: 'aa'}, {a: 'aa'}],
    [{a: 2}, {a: {__revoke__: NOOP, __target__: 2}}]
)

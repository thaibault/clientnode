// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
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
import {describe, expect, test} from '@jest/globals'

import {Mapping} from '../../'

import evaluate, {
    evaluateSelector,
    evaluateSelectorUntilLastObject,
    normalizeSelector,
    SELECTOR_KEY_NAMES
} from '../../expression'
import {testEach} from '../../test-helper'

describe('Evaluators', () => {
    testEach(
        'evaluates values',
        evaluate,

        [false, false],
        [true, true],
        [0, 0],
        [5, 5],
        [Infinity, Infinity],
        [null, null],
        ['', ''],
        ['value', 'value'],
        [[], []],
        [[1], [1]],
        [[1, 2], [1, 2]],
        [[{}, 1, 2], [{}, 1, 2]],
        [[undefined, 'Hello', {$if: {}}], [undefined, 'Hello', {$if: {}}]],
        [{}, {}],
        [{a: 2}, {a: 2}]
    )

    testEach(
        'normalizeSelector',
        normalizeSelector,

        [[], ''],
        [[], '', {}],
        [['key'], 'key', {}],
        [['a', 'b'], 'a.b', {}],
        [['a', 'b', '1'], 'a.b[1]']
    )

    testEach(
        'evaluateSelectorUntilLastObject',
        evaluateSelectorUntilLastObject,

        [[{}, ''], ''],
        [[{}, ''], '', {}],
        [[[0], '1'], '1', [0]],
        [[[0], '1'], 'a.1', {a: [0]}]
    )

    testEach(
        'evaluateSelector',
        evaluateSelector,

        [{}, [], {}],
        [{}, [''], {}],
        [{}, '', {}],
        [1, ['a'], {a: 1}],
        [null, 'a.a', {a: {a: null}}],
        [[], 'a.a', {a: {a: []}}],
        [3, ['a', 'b.c'], {a: {b: {c: 3}}}],
        [3, ['a', 'b.c[0]'], {a: {b: {c: [3]}}}],
        [3, ['', 'a', '', 'b.c[0]', '', ''], {a: {b: {c: [3]}}}],
        [
            3,
            (root: unknown): unknown =>
                (root as {a: {b: {c: Array<number>}}}).a.b.c[1],
            {a: {b: {c: [1, 3, 2]}}}
        ],
        [
            3,
            [
                'a',
                (root: unknown): number =>
                    (root as {b: {c: Array<number>}}).b.c[1]
            ],
            {a: {b: {c: [1, 3, 2]}}}
        ]
    )

    testEach(
        'evaluateSelectorExpression',
        evaluate,

        [5, {$select: 'key'}, {key: 5}],
        [2, {$select: 'a.b.c'}, {a: {b: {c: 2}}}],
        [undefined, {$select: 'a.b.c.d'}, {a: {b: {c: 2}}}],
        [{a: 2}, {$select: ''}, {a: 2}],
        [1, {$select: 'a[0]'}, {a: [1, 2]}],
        [2, {$select: 'a[0][1]'}, {a: [[1, 2]]}],
        [
            'deep',
            {$select: 'a[0][1][0].b[0][1]'}, {a: [[0, [{b: [[1, 'deep']]}]]]}
        ],
        [2, {$select: 'a[1]'}, {a: [1, 2]}],
        [undefined, {$select: 'a[2]'}, {a: [1, 2]}],
        [2, {$select: 'a.b.c[1]'}, {a: {b: {c: [1, 2]}}}],
        [2, {$select: 'a.b.c.1'}, {a: {b: {c: [1, 2]}}}],
        [undefined, {$select: 'a.b.c.1'}, {a: {b: {}}}],
        [1, {$select: 'a.b b.c'}, {a: {'b b': {c: 1}}}],
        [
            'dynamically selected',
            {$select: ['a', {$select: 'keyB'}]},
            {a: {b: 'dynamically selected'}, keyB: 'b'}
        ],
        [
            'dynamically selected',
            {$select: ['a', 'b', {$select: 'key.of.c'}]},
            {
                a: {b: {c: 'dynamically selected'}},
                key: {of: {c: 'c'}}
            }
        ],
        [5, {$select: 'a.b.c'}, {a: [{name: 'b', c: 5}]}],
        [4, {$select: 'a.b.c.d'}, {a: [{name: 'b', c: {d: 4}}]}],
        [5, {$select: 'a.b'}, [{name: 'a', b: 5}]],
        [4, {$select: 'a.b.c.d'}, [{name: 'a', b: [{name: 'c', d: 4}]}]]
    )

    SELECTOR_KEY_NAMES.add('headline')
    expect(evaluate(
        {$select: 'a.b.c.d'}, [{headline: 'a', b: [{name: 'c', d: 4}]}]
    )).toStrictEqual(4)
    SELECTOR_KEY_NAMES.delete('headline')

    const nestedObject = {name: 'From', value: 'target'}
    expect(evaluate(
        {$select: 'MappingGroup.children.Mapping.children.From'},

        [
            {name: 'BasicInformationGroup'},
            {name: 'ConfigurationGroup'},
            {
                name: 'MappingGroup',
                children: [
                    {
                        name: 'Mapping',
                        children: [{name: 'From', value: 'target'}]
                    }
                ]
            },
            {
                name: 'MappingGroup',
                children: [{name: 'Mapping', children: [nestedObject]}]
            }
        ]
    )).toStrictEqual(nestedObject)

    describe('evaluateArrayContains', () => {
        test(
            `
                when input is an array of primitive values, evaluates to true
                when array contains the specified value
            `.trim(),
            () => {
                expect(evaluate({$arrayContains: {value: 2}}, [1, 2, 3]))
                    .toStrictEqual(true)
            }
        )

        test(
            `
                when input is an array of objects, evaluates to true when array
                contains the specified key and value
            `.trim(),
            () => {
                expect(evaluate(
                    {$arrayContains: {key: 'b', value: 'foo'}},
                    [{a: 1, b: 'foo'}, {a: 2, b: 'bar'}]
                )).toStrictEqual(true)
            }
        )

        test(
            `
                when input is an array of objects, evaluates to false when
                array does not contain the specified value
            `.trim(),
            () => {
                expect(evaluate(
                    {$arrayContains: {key: 'b', value: 'baz'}},
                    [{a: 1, b: 'foo'}, {a: 2, b: 'bar'}]
                )).toStrictEqual(false)
            }
        )

        test(
            `
                when input is an array of objects, evaluates to false when
                array does not contain the specified key
            `.trim(),
            () => {
                expect(evaluate(
                    {$arrayContains: {key: 'c', value: 'foo'}},
                    [{a: 1, b: 'foo'}, {a: 2, b: 'bar'}]
                )).toStrictEqual(false)
            }
        )

        test('when input is a nested object, traverses to the array', () => {
            expect(evaluate(
                {
                    $arrayContains: {
                        target: {$select: ['foo', 'bar']},
                        key: 'b',
                        value: 'abc'
                    }
                },
                {foo: {bar: [{a: 1, b: 'abc'}, {a: 2, b: 'def'}]}}
            )).toStrictEqual(true)
        })

        test('when key and value are expressions, returns true', () => {
            expect(evaluate(
                {
                    $arrayContains: {
                        target: {$select: ['foo', 'bar']},
                        key: {
                            $if: {value1: 5, $comparator: '==', value2: 5},
                            then: 'b'
                        },
                        value: {$select: ['val']}
                    }
                },
                {foo: {bar: [{a: 1, b: 'abc'}, {a: 2, b: 'def'}]}, val: 'def'}
            )).toStrictEqual(true)
        })

        test(
            `
                when selector is an expression that returns the array, returns
                true
            `.trim(),
            () => {
                expect(evaluate(
                    {
                        $arrayContains: {
                            target: {
                                $if: {
                                    value1: 5,
                                    $comparator: '==',
                                    value2: 5
                                },
                                then: [{a: 1, b: 'abc'}, {a: 2, b: 'def'}]
                            },
                            key: {
                                $if: {value1: 5, $comparator: '==', value2: 5},
                                then: 'b'
                            },
                            value: {$select: ['val']}
                        }
                    },
                    {val: 'def'}
                )).toStrictEqual(true)
            }
        )
    })

    test('evaluates operations', () => {
        expect(evaluate({operand: false, $operator: '!'})).toStrictEqual(true)
        expect(evaluate({operand: true, $operator: '!'})).toStrictEqual(false)
        expect(evaluate({operand: true, $operator: '!!'})).toStrictEqual(true)
        expect(evaluate({operand: 0, $operator: '!'})).toStrictEqual(true)
        expect(evaluate({operand: 1, $operator: '!'})).toStrictEqual(false)
        expect(evaluate({operand: 0, $operator: '!!'})).toStrictEqual(false)
        expect(evaluate({operand: 1, $operator: '!!'})).toStrictEqual(true)

        expect(evaluate({
            operand1: 0,
            $operator: '+',
            operand2: 0
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 0,
            $operator: '+',
            operand2: 1
        })).toStrictEqual(1)
        expect(evaluate({
            operand1: 1,
            $operator: '+',
            operand2: 1
        })).toStrictEqual(2)

        expect(evaluate({
            operand1: 0,
            $operator: '-',
            operand2: 0
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 0,
            $operator: '-',
            operand2: 1
        })).toStrictEqual(-1)
        expect(evaluate({
            operand1: 2,
            $operator: '-',
            operand2: 1
        })).toStrictEqual(1)

        expect(evaluate({
            operand1: 0,
            $operator: '*',
            operand2: 0
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 0,
            $operator: '*',
            operand2: 1
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 2,
            $operator: '*',
            operand2: 3
        })).toStrictEqual(6)

        expect(evaluate({
            operand1: 0,
            $operator: '/',
            operand2: 1
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 1,
            $operator: '/',
            operand2: 1
        })).toStrictEqual(1)
        expect(evaluate({
            operand1: 4,
            $operator: '/',
            operand2: 2
        })).toStrictEqual(2)

        expect(evaluate({
            operand1: 0,
            $operator: '**',
            operand2: 1
        })).toStrictEqual(0)
        expect(evaluate({
            operand1: 1,
            $operator: '**',
            operand2: 1
        })).toStrictEqual(1)
        expect(evaluate({
            operand1: 2,
            $operator: '**',
            operand2: 3
        })).toStrictEqual(8)
    })

    test('evaluates conditions', () => {
        expect(evaluate({
            value1: 1,
            $comparator: '==',
            value2: 1
        })).toStrictEqual(true)
        expect(evaluate({
            value1: 1,
            $comparator: '!=',
            value2: 1
        })).toStrictEqual(false)

        expect(evaluate({
            value1: true,
            $comparator: '==',
            value2: true
        })).toStrictEqual(true)

        expect(evaluate({
            value1: true,
            $comparator: '==',
            value2: {operand: false, $operator: '!'}
        }))
            .toStrictEqual(true)

        expect(evaluate({
            value1: {},
            $comparator: '==',
            value2: {}
        })).toStrictEqual(true)
        expect(evaluate({
            value1: [],
            $comparator: '==',
            value2: []
        })).toStrictEqual(true)

        expect(evaluate({
            value1: {a: 1},
            $comparator: '==',
            value2: {a: 1, b: 1}
        })).toStrictEqual(false)
        expect(evaluate({
            value1: {a: 1, b: 1},
            $comparator: '==',
            value2: {a: 1}
        })).toStrictEqual(false)
        expect(evaluate({
            value1: {a: 1},
            $comparator: '==',
            value2: {a: 1}
        })).toStrictEqual(true)

        expect(evaluate({
            value1: [1],
            $comparator: '==',
            value2: []
        })).toStrictEqual(false)
        expect(evaluate({
            value1: [1],
            $comparator: '==',
            value2: [1]
        })).toStrictEqual(true)

        expect(evaluate({
            value1: new Map([['a', 1]]),
            $comparator: '==',
            value2: new Map([['a', 1], ['b', 1]])
        })).toStrictEqual(false)
        expect(evaluate({
            value1: new Map([['a', 1], ['b', 1]]),
            $comparator: '==',
            value2: new Map([['a', 1]])
        })).toStrictEqual(false)
        expect(evaluate({
            value1: new Map([['a', 1]]),
            $comparator: '==',
            value2: new Map([['a', 1]])
        })).toStrictEqual(true)

        expect(evaluate({
            value1: new Set(['a']),
            $comparator: '==',
            value2: new Set(['a', 'b'])
        }))
            .toStrictEqual(false)
        expect(evaluate({
            value1: new Set(['a', 'b']),
            $comparator: '==',
            value2: new Set(['a'])
        }))
            .toStrictEqual(false)
        expect(evaluate({
            value1: new Set(['a']),
            $comparator: '==',
            value2: new Set(['a'])
        }))
            .toStrictEqual(true)
    })

    test('evaluates if expressions', () => {
        expect(evaluate({
            $if: {value1: 5, $comparator: '==', value2: 5},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {
                value1: 5,
                $comparator: '==',
                value2: 5
            }
        })).toStrictEqual(undefined)
        expect(evaluate({
            $if: {value1: 0, $comparator: '==', value2: 0},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {
                value1: false,
                $comparator: '==',
                value2: false
            },
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {value1: true, $comparator: '==', value2: true},
            then: true
        })).toStrictEqual(true)

        expect(evaluate({
            $if: {value1: 5, $comparator: '==', value2: 2},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: 0, $comparator: '==', value2: 2},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: false, $comparator: '==', value2: true},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: false, $comparator: '==', value2: true},
            else: false
        })).toStrictEqual(false)

        expect(evaluate({
            $if: {value1: 2, $comparator: '!=', value2: 5},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {value1: 2, $comparator: '!=', value2: 0},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {
                value1: false,
                $comparator: '!=',
                value2: false
            },
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: true, $comparator: '!=', value2: true},
            else: false
        })).toStrictEqual(false)

        expect(evaluate({
            $if: {value1: 2, $comparator: '<', value2: 5},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {value1: 0, $comparator: '<', value2: 0},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: 2, $comparator: '>', value2: 5},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: 5, $comparator: '>', value2: 2},
            then: true
        })).toStrictEqual(true)

        expect(evaluate({
            $if: {value1: 2, $comparator: '<=', value2: 5},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {value1: 0, $comparator: '<=', value2: 0},
            then: true
        })).toStrictEqual(true)
        expect(evaluate({
            $if: {value1: 2, $comparator: '>=', value2: 5},
            else: false
        })).toStrictEqual(false)
        expect(evaluate({
            $if: {value1: 5, $comparator: '>=', value2: 2},
            then: true
        })).toStrictEqual(true)

        expect(evaluate(
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: 5
                },
                then: true
            },
            {a: 5}
        )).toStrictEqual(true)
        expect(evaluate(
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'a'}
                },
                then: true
            },
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: 2
                }, else: false
            },
            {a: 5}
        )).toStrictEqual(false)
        expect(evaluate(
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'b'}
                }, else: false
            },
            {a: 5}
        )).toStrictEqual(false)

        expect(evaluate(
            {
                $if: {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                then: 'then value'
            },
            {a: 5}
        )).toStrictEqual('then value')
        expect(evaluate(
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'a'}
                },
                then: {$select: 'a'}
            },
            {a: 5}
        )).toStrictEqual(5)
    })

    test('evaluates switch case default expressions', () => {
        expect(evaluate(
            {
                $switch: {$select: 'a'},
                caseExpressions: [
                    {
                        $case: 5,
                        then: 'then value'
                    }
                ]
            },
            {a: 5}
        )).toStrictEqual('then value')

        expect(evaluate({
            $switch: 5, caseExpressions: [{$case: 5, then: true}]
        })).toStrictEqual(true)

        expect(evaluate({
            $switch: 2,
            caseExpressions: [{$case: 5, then: true}]
        })).toStrictEqual(undefined)

        expect(evaluate({
            $switch: 2,
            caseExpressions: [{$case: 5}],
            default: false
        })).toStrictEqual(false)

        expect(evaluate({
            $switch: 2,
            caseExpressions: [{$case: 5}],
            default: 'fallback value'
        })).toStrictEqual('fallback value')

        expect(evaluate<string, Mapping<never>>({
            $switch: true,
            caseExpressions: [
                {$case: 5},
                {
                    $case: {value1: 2, $comparator: '<', value2: 5},
                    then: 'second case'
                }
            ],
            default: 'fallback value'
        })).toStrictEqual('second case')

        expect(evaluate({
            $switch: true,
            caseExpressions: [
                {$case: 5},
                {
                    $case: {value1: 2, $comparator: '<', value2: 5},
                    then: 'then value'
                }
            ],
            default: 'fallback value'
        })).toStrictEqual('then value')

        expect(evaluate<string, Mapping<never>>({
            $switch: 5,
            caseExpressions: [{$case: 5, then: 'first case'}, {
                $case: 5,
                then: 'second case'
            }],
            default: 'fallback value'
        })).toStrictEqual('first case')

        expect(evaluate({
            $switch: true,
            caseExpressions: [
                {$case: {value1: 2, $comparator: '>', value2: 5}},
                {$case: {value1: 2, $comparator: '==', value2: 5}},
                {$case: {value1: 1, $comparator: '!=', value2: 1}},
                {
                    $case: {value1: true, $comparator: '!=', value2: false},
                    then: 'then value'
                }
            ],
            default: 'fallback value'
        })).toStrictEqual('then value')

        expect(evaluate({
            $switch: true,
            caseExpressions: [
                {$case: {value1: 2, $comparator: '>', value2: 5}},
                {
                    $case: {value1: 2, $comparator: '==', value2: 5},
                    then: 'then value'
                },
                {$case: {value1: 1, $comparator: '!=', value2: 1}},
                {$case: {value1: true, $comparator: '==', value2: false}}
            ],
            default: 'fallback value'
        })).toStrictEqual('fallback value')
    })

    test('evaluates and expressions', () => {
        expect(evaluate(
            {$and: [{value1: {$select: 'a'}, $comparator: '==', value2: 5}]},
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '==', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(false)

        expect(evaluate(
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(false)

        expect(evaluate(
            {
                $if: {
                    $and: [
                        {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                        {value1: 2, $comparator: '==', value2: 2}
                    ]
                },
                then: 5
            },
            {a: 5}
        )).toStrictEqual(5)
    })

    test('evaluates or expressions', () => {
        expect(evaluate(
            {$or: [{value1: {$select: 'a'}, $comparator: '==', value2: 5}]},
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '==', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(true)

        expect(evaluate(
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '!=', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        )).toStrictEqual(false)

        expect(evaluate(
            {
                $if: {
                    $or: [
                        {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                        {value1: 2, $comparator: '==', value2: 2}
                    ]
                },
                then: 5
            },
            {a: 5}
        )).toStrictEqual(5)
    })

    test('evaluates concat expressions', () => {
        expect(evaluate({$concat: []})).toStrictEqual('')
        expect(evaluate({$concat: [[]]})).toStrictEqual([])

        expect(evaluate({$concat: ['a']})).toStrictEqual('a')
        expect(evaluate({$concat: ['a', 'b']})).toStrictEqual('ab')
        expect(evaluate({$concat: ['a', 'b', 'c']})).toStrictEqual('abc')

        expect(evaluate({$concat: [1]})).toStrictEqual('1')
        expect(evaluate({$concat: ['a', 'b', 3]})).toStrictEqual('ab3')
        expect(evaluate({$concat: [1, 'b', 3]})).toStrictEqual('1b3')
    })

    test('evaluates mapping expressions', () => {
        expect(evaluate({$mapping: {}, data: []})).toStrictEqual([])
        expect(evaluate({$mapping: {source: 'target'}, data: []}))
            .toStrictEqual([])
        expect(evaluate(
            {$mapping: {noExisting: 'target'}, data: [{key: 'value'}]}
        )).toStrictEqual([{}])

        expect(evaluate(
            {$mapping: {source: 'target'}, data: [{source: 'value'}]}
        )).toStrictEqual([{target: 'value'}])
        expect(evaluate(
            {$mapping: {a: 'A', b: 'B'}, data: [{a: 'a', b: 'b', c: 'c'}]}
        )).toStrictEqual([{A: 'a', B: 'b'}])
        expect(evaluate(
            {
                $mapping: {a: 'A', b: 'B'},
                data: [
                    {a: 'a', b: 'b', c: 'c'},
                    {a: 'a', b: 'b', c: 'c$'},
                    {a: 'a', b: 'b', c: 'c'}
                ]
            })
        ).toStrictEqual([
            {A: 'a', B: 'b'},
            {A: 'a', B: 'b'},
            {A: 'a', B: 'b'}
        ])

        expect(evaluate(
            {
                $mapping: {$key: 'ID', b: 'B'},
                data: {
                    a: {b: 'b', c: 'c'},
                    b: {b: 'b', c: 'c'},
                    c: {b: 'b', c: 'c'}
                }
            }
        )).toStrictEqual([
            {ID: 'a', B: 'b'},
            {ID: 'b', B: 'b'},
            {ID: 'c', B: 'b'}
        ])
    })

    test(
        `
            evaluates complex expressions:
            if (
                (a == 2 || equals(a, a)) &&
                a.a[0][1].a == 5
            ) then "final value"
        `.trim(),
        () => {
            expect(evaluate(
                {
                    $if: {
                        $and: [
                            {
                                $or: [
                                    {
                                        value1: {$select: 'a'},
                                        $comparator: '==',
                                        value2: 2
                                    }, // false
                                    {
                                        value1: {$select: 'a'},
                                        $comparator: '==',
                                        value2: {$select: 'a'}
                                    } // true
                                ] // true
                            },
                            {
                                value1: {$select: 'a.a[0][1].a'},
                                $comparator: '==',
                                value2: 5
                            } // true
                        ]
                    },
                    then: 'final value'
                },
                {a: {a: [[0, {a: 5}]]}}
            )).toStrictEqual('final value')
        }
    )
})

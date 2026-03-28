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

    testEach(
        'evaluate operator expressions',
        evaluate,
        [true, {operand: false, $operator: '!'}],
        [false, {operand: true, $operator: '!'}],
        [true, {operand: true, $operator: '!!'}],
        [true, {operand: 0, $operator: '!'}],
        [false, {operand: 1, $operator: '!'}],
        [false, {operand: 0, $operator: '!!'}],
        [true, {operand: 1, $operator: '!!'}],

        [0, {operand1: 0, $operator: '+', operand2: 0}],
        [1, {operand1: 0, $operator: '+', operand2: 1}],
        [2, {operand1: 1, $operator: '+', operand2: 1}],

        [0, {operand1: 0, $operator: '-', operand2: 0}],
        [-1, {operand1: 0, $operator: '-', operand2: 1}],
        [1, {operand1: 2, $operator: '-', operand2: 1}],

        [0, {operand1: 0, $operator: '*', operand2: 0}],
        [0, {operand1: 0, $operator: '*', operand2: 1}],
        [6, {operand1: 2, $operator: '*', operand2: 3}],

        [0, {operand1: 0, $operator: '/', operand2: 1}],
        [1, {operand1: 1, $operator: '/', operand2: 1}],
        [2, {operand1: 4, $operator: '/', operand2: 2}],

        [0, {operand1: 0, $operator: '**', operand2: 1}],
        [1, {operand1: 1, $operator: '**', operand2: 1}],
        [8, {operand1: 2, $operator: '**', operand2: 3}]
    )

    testEach(
        'evaluate condition expressions',
        evaluate,

        [true, {value1: 1, $comparator: '==', value2: 1}],
        [false, {value1: 1, $comparator: '!=', value2: 1}],
        [true, {value1: true, $comparator: '==', value2: true}],
        [true, {
            value1: true,
            $comparator: '==',
            value2: {operand: false, $operator: '!'}
        }],

        [true, {value1: {}, $comparator: '==', value2: {}}],
        [true, {value1: [], $comparator: '==', value2: []}],

        [false, {value1: {a: 1}, $comparator: '==', value2: {a: 1, b: 1}}],
        [false, {value1: {a: 1, b: 1}, $comparator: '==', value2: {a: 1}}],
        [true, {value1: {a: 1}, $comparator: '==', value2: {a: 1}}],

        [false, {value1: [1], $comparator: '==', value2: []}],
        [true, {value1: [1], $comparator: '==', value2: [1]}],

        [
            false,
            {
                value1: new Map([['a', 1]]),
                $comparator: '==',
                value2: new Map([['a', 1], ['b', 1]])
            }
        ],
        [
            false,
            {
                value1: new Map([['a', 1], ['b', 1]]),
                $comparator: '==',
                value2: new Map([['a', 1]])
            }
        ],
        [
            true,
            {
                value1: new Map([['a', 1]]),
                $comparator: '==',
                value2: new Map([['a', 1]])
            }
        ],

        [
            false,
            {
                value1: new Set(['a']),
                $comparator: '==',
                value2: new Set(['a', 'b'])
            }
        ],
        [
            false,
            {
                value1: new Set(['a', 'b']),
                $comparator: '==',
                value2: new Set(['a'])
            }
        ],
        [
            true,
            {value1: new Set(['a']), $comparator: '==', value2: new Set(['a'])}
        ]
    )

    testEach(
        'evaluate if expressions',
        evaluate,

        // == true (then branch)
        [true, {$if: {value1: 5, $comparator: '==', value2: 5}, then: true}],
        [undefined, {$if: {value1: 5, $comparator: '==', value2: 5}}],
        [true, {$if: {value1: 0, $comparator: '==', value2: 0}, then: true}],
        [
            true,
            {
                $if: {value1: false, $comparator: '==', value2: false},
                then: true
            }
        ],
        [
            true,
            {
                $if: {value1: true, $comparator: '==', value2: true},
                then: true
            }
        ],

        // == false (else branch)
        [false, {$if: {value1: 5, $comparator: '==', value2: 2}, else: false}],
        [false, {$if: {value1: 0, $comparator: '==', value2: 2}, else: false}],
        [
            false,
            {
                $if: {value1: false, $comparator: '==', value2: true},
                else: false
            }
        ],
        [
            false,
            {
                $if: {value1: false, $comparator: '==', value2: true},
                else: false
            }
        ],

        // !=
        [true, {$if: {value1: 2, $comparator: '!=', value2: 5}, then: true}],
        [true, {$if: {value1: 2, $comparator: '!=', value2: 0}, then: true}],
        [
            false,
            {
                $if: {value1: false, $comparator: '!=', value2: false},
                else: false
            }
        ],
        [
            false,
            {
                $if: {value1: true, $comparator: '!=', value2: true},
                else: false
            }
        ],

        // < and >
        [true, {$if: {value1: 2, $comparator: '<', value2: 5}, then: true}],
        [false, {$if: {value1: 0, $comparator: '<', value2: 0}, else: false}],
        [false, {$if: {value1: 2, $comparator: '>', value2: 5}, else: false}],
        [true, {$if: {value1: 5, $comparator: '>', value2: 2}, then: true}],

        // <= and >=
        [true, {$if: {value1: 2, $comparator: '<=', value2: 5}, then: true}],
        [true, {$if: {value1: 0, $comparator: '<=', value2: 0}, then: true}],
        [false, {$if: {value1: 2, $comparator: '>=', value2: 5}, else: false}],
        [true, {$if: {value1: 5, $comparator: '>=', value2: 2}, then: true}],

        // with $select
        [
            true,
            {
                $if: {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                then: true
            },
            {a: 5}
        ],
        [
            true,
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'a'}
                },
                then: true
            },
            {a: 5}
        ],

        [
            false,
            {
                $if: {value1: {$select: 'a'}, $comparator: '==', value2: 2},
                else: false
            },
            {a: 5}
        ],
        [
            false,
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'b'}
                },
                else: false
            },
            {a: 5}
        ],

        [
            'then value',
            {
                $if: {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                then: 'then value'
            },
            {a: 5}
        ],
        [
            5,
            {
                $if: {
                    value1: {$select: 'a'},
                    $comparator: '==',
                    value2: {$select: 'a'}
                },
                then: {$select: 'a'}
            },
            {a: 5}
        ]
    )

    testEach(
        'evaluate switch case default expressions',
        evaluate,

        [
            'then value',
            {
                $switch: {$select: 'a'},
                caseExpressions: [{$case: 5, then: 'then value'}]
            },
            {a: 5}
        ],
        [true, {$switch: 5, caseExpressions: [{$case: 5, then: true}]}],
        [undefined, {$switch: 2, caseExpressions: [{$case: 5, then: true}]}],
        [false, {$switch: 2, caseExpressions: [{$case: 5}], default: false}],
        [
            'fallback value',
            {
                $switch: 2, caseExpressions: [{$case: 5}],
                default: 'fallback value'
            }
        ],
        [
            'second case',
            {
                $switch: true,
                caseExpressions: [
                    {$case: 5},
                    {
                        $case: {value1: 2, $comparator: '<', value2: 5},
                        then: 'second case'
                    }
                ],
                default: 'fallback value'
            }
        ],
        [
            'then value',
            {
                $switch: true,
                caseExpressions: [
                    {$case: 5},
                    {
                        $case: {value1: 2, $comparator: '<', value2: 5},
                        then: 'then value'
                    }
                ],
                default: 'fallback value'
            }
        ],
        [
            'first case',
            {
                $switch: 5,
                caseExpressions: [
                    {$case: 5, then: 'first case'},
                    {$case: 5, then: 'second case'}
                ],
                default: 'fallback value'
            }
        ],
        [
            'then value',
            {
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
            }
        ],
        [
            'fallback value',
            {
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
            }
        ]
    )

    testEach(
        'evaluate and expressions',
        evaluate,

        [
            true,
            {$and: [{value1: {$select: 'a'}, $comparator: '==', value2: 5}]},
            {a: 5}
        ],
        [
            true,
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '==', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            false,
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            false,
            {
                $and: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            5,
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
        ]
    )

    testEach(
        'evaluate or expressions',
        evaluate,

        [
            true,
            {$or: [{value1: {$select: 'a'}, $comparator: '==', value2: 5}]},
            {a: 5}
        ],
        [
            true,
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '==', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            true,
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '==', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            false,
            {
                $or: [
                    {value1: {$select: 'a'}, $comparator: '!=', value2: 5},
                    {value1: 2, $comparator: '!=', value2: 2}
                ]
            },
            {a: 5}
        ],
        [
            5,
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
        ]
    )

    testEach(
        'evaluate concat expressions',
        evaluate,

        ['', {$concat: []}],
        [[], {$concat: [[]]}],
        ['a', {$concat: ['a']}],
        ['ab', {$concat: ['a', 'b']}],
        ['abc', {$concat: ['a', 'b', 'c']}],
        ['1', {$concat: [1]}],
        ['ab3', {$concat: ['a', 'b', 3]}],
        ['1b3', {$concat: [1, 'b', 3]}]
    )

    testEach(
        'evaluate mapping expressions',
        evaluate,

        [[], {$mapping: {}, data: []}],
        [[], {$mapping: {source: 'target'}, data: []}],
        [[{}], {$mapping: {noExisting: 'target'}, data: [{key: 'value'}]}],
        [
            [{target: 'value'}],
            {$mapping: {source: 'target'}, data: [{source: 'value'}]}
        ],
        [
            [{A: 'a', B: 'b'}],
            {$mapping: {a: 'A', b: 'B'}, data: [{a: 'a', b: 'b', c: 'c'}]}
        ],
        [
            [{A: 'a', B: 'b'}, {A: 'a', B: 'b'}, {A: 'a', B: 'b'}],
            {
                $mapping: {a: 'A', b: 'B'},
                data: [
                    {a: 'a', b: 'b', c: 'c'},
                    {a: 'a', b: 'b', c: 'c$'},
                    {a: 'a', b: 'b', c: 'c'}
                ]
            }
        ],
        [
            [{ID: 'a', B: 'b'}, {ID: 'b', B: 'b'}, {ID: 'c', B: 'b'}],
            {
                $mapping: {$key: 'ID', b: 'B'},
                data: {
                    a: {b: 'b', c: 'c'},
                    b: {b: 'b', c: 'c'},
                    c: {b: 'b', c: 'c'}
                }
            }
        ]
    )

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

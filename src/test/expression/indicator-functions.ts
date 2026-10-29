// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {describe} from '@jest/globals'

import {
    isAndExpression,
    isArrayContainsExpression,
    isConcatExpression,
    isCondition,
    isIfExpression,
    isMappingExpression,
    isOperation,
    isOrExpression,
    isSelector,
    isSpecificExpression,
    isSwitchExpression,
    isUnaryOperation,
    isValue
} from '../../expression/index'
import {testEach} from '../../test-helper'

describe('indicator-functions', () => {
    testEach(
        'isSpecificExpression',
        isSpecificExpression,

        [true, {$a: 1}, '$a'],
        [true, {$a: 1, b: 2}, '$a', ['b']],
        [false, {$a: 1}, '$a', ['b']],
        [false, {a: 1}, '$a'],
        [false, 5, '$a'],
        [false, null, '$a'],
        [false, [], '$a']
    )
    testEach(
        'isCondition',
        isCondition,

        [true, {$comparator: '==', value1: 1, value2: 2}],
        [false, {$comparator: '==', value1: 1}],
        [false, {value1: 1, value2: 2}]
    )
    testEach(
        'isAndExpression',
        isAndExpression,

        [true, {$and: []}],
        [false, {$or: []}],
        [false, 'and']
    )
    testEach(
        'isOrExpression',
        isOrExpression,

        [true, {$or: []}],
        [false, {$and: []}],
        [false, 'or']
    )
    testEach(
        'isConcatExpression',
        isConcatExpression,

        [true, {$concat: []}],
        [false, {$and: []}],
        [false, 'concat']
    )
    testEach(
        'isMappingExpression',
        isMappingExpression,

        [true, {$mapping: {}, data: []}],
        [false, {$mapping: {}}],
        [false, {data: []}]
    )
    testEach(
        'isOperation',
        isOperation,

        [true, {$operator: '+', operand1: 1, operand2: 2}],
        [false, {$operator: '!', operand: true}],
        [false, {$operator: '+', operand1: 1}]
    )
    testEach(
        'isUnaryOperation',
        isUnaryOperation,

        [true, {$operator: '!', operand: true}],
        [false, {$operator: '+', operand1: 1, operand2: 2}],
        [false, {operand: true}]
    )
    testEach(
        'isIfExpression',
        isIfExpression,

        [true, {$if: true}],
        [true, {$if: true, then: 1, else: 2}],
        [false, {then: 1}]
    )
    testEach(
        'isSwitchExpression',
        isSwitchExpression,

        [true, {$switch: []}],
        [false, {$if: true}],
        [false, []]
    )
    testEach(
        'isArrayContainsExpression',
        isArrayContainsExpression,

        [true, {$arrayContains: {key: 'a'}}],
        [false, {$select: 'a'}],
        [false, null]
    )
    testEach(
        'isSelector',
        isSelector,

        [true, {$select: 'a.b'}],
        [true, {$select: ''}],
        [false, {select: 'a.b'}],
        [false, 'a.b']
    )
    testEach(
        'isValue',
        isValue,

        [true, 5],
        [true, {}],
        [true, {$value: 2}],
        [true, {$operator: {}}],

        [false, {$operator: {}, operand: 2}],
        [false, {$select: ''}],
        [false, {$switch: []}],
        [true, {$operator: {}}],

        [true, {$mapping: {}}],
        [false, {$mapping: {}, data: []}],

        [false, {$arrayContains: {key: 'foo'}}],
        [false, {$arrayContains: {key: 'foo', value: 'bar'}}],
        [false, {
            $arrayContains: {key: 'foo', value: 'bar', target: {$select: ''}}
        }]
    )
})

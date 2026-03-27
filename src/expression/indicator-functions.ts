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
import {isPlainObject} from '../indicators'

import {
    BasicScopeType,

    AndExpression,
    OrExpression,
    ConcatExpression,
    MappingExpression,

    Expression,
    IfExpression,
    SwitchExpression,

    Operation,
    UnaryOperation,

    Condition,
    SelectorExpression,
    ArrayContainsExpression
} from './types'

export const isSpecificExpression = (
    expression: Expression,
    indicatorKey: string,
    properties: Array<string> = []
) => {
    if (!(
        isPlainObject(expression) &&
        Object.prototype.hasOwnProperty.call(expression, indicatorKey)
    ))
        return false

    for (const name of properties)
        if (!Object.prototype.hasOwnProperty.call(expression, name))
            return false

    return true
}

export const isCondition = (expression: Expression): expression is Condition =>
    isSpecificExpression(expression, '$comparator', ['value1', 'value2'])


export const isAndExpression =
    (expression: Expression): expression is AndExpression =>
        isSpecificExpression(expression, '$and')

export const isOrExpression =
    (expression: Expression): expression is OrExpression =>
        isSpecificExpression(expression, '$or')

export const isConcatExpression =
    (expression: Expression): expression is ConcatExpression =>
        isSpecificExpression(expression, '$concat')

export const isMappingExpression =
    (expression: Expression): expression is MappingExpression =>
        isSpecificExpression(expression, '$mapping', ['data'])


export const isOperation = (expression: Expression): expression is Operation =>
    isSpecificExpression(expression, '$operator', ['operand1', 'operand2'])

export const isUnaryOperation =
    (expression: Expression): expression is UnaryOperation =>
        isSpecificExpression(expression, '$operator', ['operand'])


export const isIfExpression =
    <Type>(expression: Expression<Type>): expression is IfExpression<Type> =>
        isSpecificExpression(expression, '$if')

export const isSwitchExpression = <Type>(
    expression: Expression<Type>
): expression is SwitchExpression<Type> =>
        isSpecificExpression(expression, '$switch')


export const isSelector = <Type, ScopeType extends BasicScopeType>(
    expression: Expression<Type, ScopeType>
): expression is SelectorExpression<ScopeType> =>
        isSpecificExpression(expression, '$select')

export const isArrayContainsExpression = <
    Type, ScopeType extends BasicScopeType
>(
        expression: Expression<Type, ScopeType>
    ): expression is ArrayContainsExpression =>
        isSpecificExpression(expression, '$arrayContains')

export const isValue = <Type, ScopeType extends BasicScopeType>(
    expression: Expression<Type, ScopeType>
): expression is Type =>
        !(
            isSelector<Type, ScopeType>(expression) ||
            isCondition(expression) ||
            isUnaryOperation(expression) ||
            isOperation(expression) ||
            isAndExpression(expression) ||
            isOrExpression(expression) ||
            isConcatExpression(expression) ||
            isMappingExpression(expression) ||
            isIfExpression(expression) ||
            isSwitchExpression(expression) ||
            isArrayContainsExpression(expression)
        )

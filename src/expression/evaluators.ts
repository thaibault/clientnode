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
import {
    equals,
    isFunction,
    isObject,
    isPlainObject,
    Mapping,
    NormalizedSelector,
    Selector,
    SelectorItem,
    SimpleRecursiveKeyOf
} from '../'

import {
    isAndExpression,
    isOrExpression,
    isConcatExpression,
    isMappingExpression,
    isIfExpression,
    isSwitchExpression,
    isSelector,
    isCondition,
    isOperation,
    isUnaryOperation,
    isArrayContainsExpression
} from './indicator-functions'
import {
    AndExpression,
    OrExpression,
    ConcatExpression,

    Expression,
    IfExpression,
    SwitchExpression,
    CaseExpression,

    UnaryOperation,
    Operation,

    Condition,

    BasicScopeType,
    RecursiveKeyOf,
    MappingExpression, ArrayContainsExpression
} from './types'

export const SELECTOR_KEY_NAMES = new Set<string>(['name'])
export const NO_ITEM_FOUND_SYMBOL =
    Symbol.for('EXPRESSION_EVALUATOR_NO_ITEM_FOUND')

const addBracketBasedPathElements = (subParts: Array<string>) => {
    const path: Array<SimpleRecursiveKeyOf> = []
    // NOTE: We add index assignments into path array.
    for (const subPart of subParts)
        if (subPart.startsWith('['))
            // Trim bracket padding "[index]" => "index".
            path.push(subPart.substring(1, subPart.length - 1))
        else {
            const openingBracketPosition = subPart.indexOf('[')
            path.push(subPart.substring(0, openingBracketPosition))
            // Trim bracket padding "[index]" => "index".
            path.push(subPart.substring(
                openingBracketPosition + 1, subPart.length - 1
            ))
        }

    return path
}

export const normalizeSelector = <ScopeType extends BasicScopeType>(
    selector: Selector<ScopeType>,
    scope: ScopeType = {} as ScopeType,
    delimiter = '.'
): NormalizedSelector<ScopeType> => {
    const path: NormalizedSelector<ScopeType> = []
    for (const component of ([] as NormalizedSelector<ScopeType>).concat(
        selector
    ))
        if (typeof component === 'string') {
            const parts: Array<string> = component.split(delimiter)
            for (const part of parts) {
                if (!part)
                    continue

                if (isFunction(part)) {
                    path.push(part)

                    continue
                }

                // Trim bracket padding "[index]" => "index".
                const subParts: null | Array<string> =
                    part.match(/[^[]*\[\d+]/g)
                path.push(...(subParts ?
                    addBracketBasedPathElements(subParts) :
                    [part]
                ) as unknown as Array<RecursiveKeyOf>)
            }
        } else
            path.push(
                evaluateExpression(component, scope) as SelectorItem<ScopeType>
            )

    return path
}

export const selectArrayItem = (
    data: Array<unknown>, keyOrIndex: number | string
) => {
    // Assume that an array item should be found by its property name.
    for (const item of data)
        for (const selectorKeyName of SELECTOR_KEY_NAMES)
            if (
                Object.prototype.hasOwnProperty.call(item, selectorKeyName) &&
                (item as Mapping)[selectorKeyName] === keyOrIndex
            )
                return item

    return NO_ITEM_FOUND_SYMBOL
}
/**
 * Retrieves substructure in given object referenced by given selector
 * path.
 * @param selector - Selector path.
 * @param scope - Object to search in.
 * @param skipMissingLevel - Indicates to skip missing level in given path.
 * @param delimiter - Delimiter to delimit given selector components.
 * @returns Determined sub structure of given data or "undefined".
 */
export const evaluateSelectorUntilLastObject = <
    ScopeType extends BasicScopeType
>(
        selector: Selector<ScopeType>,
        scope: ScopeType = {} as ScopeType,
        skipMissingLevel = false,
        delimiter = '.'
    ): [ScopeType, RecursiveKeyOf] => {
    /*
        Create a list of keys or indexes to retrieve specified value from given
        object.
    */
    const path: NormalizedSelector<ScopeType> =
        normalizeSelector(selector, scope, delimiter)
    // Dig into given scope for each previously found key or index.
    let result = scope
    let index = 0
    for (const keyOrIndex of path) {
        const isLastPart = index === path.length - 1

        if (isObject(result)) {
            if (
                Array.isArray(result) &&
                (typeof keyOrIndex === 'string' &&
                    isNaN(parseInt(keyOrIndex)))
            ) {
                const item = selectArrayItem(result, keyOrIndex)
                if (item !== NO_ITEM_FOUND_SYMBOL) {
                    if (isLastPart)
                        return typeof keyOrIndex === 'number' ?
                            [result, keyOrIndex] :
                            [
                                result,
                                result.indexOf(item) as
                                    unknown as
                                    RecursiveKeyOf
                            ]

                    result = item as ScopeType
                }
            } else if (isLastPart)
                return [result, keyOrIndex as RecursiveKeyOf]
            else if (isFunction(keyOrIndex))
                result = keyOrIndex(result) as ScopeType
            else if (Object.prototype.hasOwnProperty.call(
                result, keyOrIndex as unknown as string
            ))
                result = result[keyOrIndex as keyof ScopeType] as ScopeType
            else if (!skipMissingLevel)
                return [result, keyOrIndex as RecursiveKeyOf]
        } else if (isLastPart)
            return [result, keyOrIndex as RecursiveKeyOf]
        else if (!skipMissingLevel)
            return [result, keyOrIndex as RecursiveKeyOf]

        index += 1
    }

    return [{} as ScopeType, '' as unknown as RecursiveKeyOf]
}
/**
 * Retrieves substructure in given object referenced by given selector
 * path.
 * @param selector - Selector path.
 * @param scope - Object to search in.
 * @param skipMissingLevel - Indicates to skip missing level in given path.
 * @param delimiter - Delimiter to delimit given selector components.
 * @returns Determined sub structure of given data or "undefined".
 */
export const evaluateSelector = <Type, ScopeType extends BasicScopeType>(
    selector: Selector<ScopeType>,
    scope: ScopeType,
    skipMissingLevel = false,
    delimiter = '.'
): Type => {
    const [lastObject, lastKey] = evaluateSelectorUntilLastObject(
        selector, scope, skipMissingLevel, delimiter
    )

    if ((lastKey as unknown as string) === '')
        return scope as unknown as Type

    if (isFunction(lastKey))
        return lastKey(lastObject) as Type

    if (Object.prototype.hasOwnProperty.call(lastObject, lastKey))
        return (lastObject as Mapping<Type>)[lastKey]

    return undefined as Type
}

export const evaluateCondition = <ScopeType extends BasicScopeType>(
    condition: Condition, scope: ScopeType
): boolean => {
    const value1 = evaluateExpression(condition.value1, scope)
    const value2 = evaluateExpression(condition.value2, scope)

    switch (condition.$comparator) {
    case '==':
        return equals(value1, value2) as boolean
    case '!=':
        return !equals(value1, value2)
    case '<':
        return (value1 as number) < (value2 as number)
    case '<=':
        return (value1 as number) <= (value2 as number)
    case '>':
        return (value1 as number) > (value2 as number)
    case '>=':
        return (value1 as number) >= (value2 as number)
    }
}

export const evaluateUnaryOperation = <ScopeType extends BasicScopeType>(
    operation: UnaryOperation, scope: ScopeType
): boolean => {
    const operand = evaluateExpression(operation.operand, scope)

    switch (operation.$operator) {
    case '!':
        return !operand
    case '!!':
        return Boolean(operand)
    }
}

export const evaluateOperation = <ScopeType extends BasicScopeType>(
    operation: Operation, scope: ScopeType
): number => {
    const operand1 = evaluateExpression(operation.operand1, scope)
    const operand2 = evaluateExpression(operation.operand2, scope)

    switch (operation.$operator) {
    case '+':
        return operand1 + operand2
    case '-':
        return operand1 - operand2
    case '*':
        return operand1 * operand2
    case '**':
        return operand1 ** operand2
    case '/':
        return operand1 / operand2
    }
}

export const evaluateOptionalThen = <Type, ScopeType extends BasicScopeType>(
    expression: IfExpression<Type> | CaseExpression<Type>, scope: ScopeType
): Type => {
    if (typeof expression.then === 'undefined')
        return undefined as Type

    return evaluateExpression(expression.then, scope)
}

export const evaluateIf = <Type, ScopeType extends BasicScopeType>(
    expression: IfExpression<Type>, scope: ScopeType
): Type => {
    if (evaluateExpression(expression.$if, scope))
        return evaluateOptionalThen(expression, scope)

    return typeof expression.else === 'undefined' ?
        undefined as Type :
        evaluateExpression(expression.else, scope)
}

export const evaluateSwitch = <Type, ScopeType extends BasicScopeType>(
    expression: SwitchExpression<Type>, scope: ScopeType
): Type => {
    const value = evaluateExpression(expression.$switch, scope)

    for (const caseExpression of expression.caseExpressions)
        if (value === evaluateExpression(caseExpression.$case, scope))
            return evaluateOptionalThen(caseExpression, scope)

    if (typeof expression.default !== 'undefined')
        return evaluateExpression(expression.default, scope)

    return undefined as Type
}

export const evaluateAnd = <ScopeType extends BasicScopeType>(
    expression: AndExpression, scope: ScopeType
): boolean => {
    for (const condition of expression.$and)
        if (!evaluateExpression(condition, scope))
            return false

    return true
}

export const evaluateOr = <ScopeType extends BasicScopeType>(
    expression: OrExpression, scope: ScopeType
): boolean => {
    for (const condition of expression.$or)
        if (evaluateExpression(condition, scope))
            return true

    return false
}

export const evaluateConcat = <ScopeType extends BasicScopeType>(
    expression: ConcatExpression, scope: ScopeType
): Array<unknown> | string => {
    let result: Array<unknown> = []
    let isArray = false
    for (const item of expression.$concat) {
        const value = evaluateExpression(item, scope)
        if (Array.isArray(value))
            isArray = true

        result = result.concat(value)
    }

    return isArray ? result : result.join('')
}

export const evaluateMapping = <ScopeType extends BasicScopeType>(
    expression: MappingExpression, scope: ScopeType
): Array<Mapping<unknown>> => {
    const givenData = evaluateExpression(expression.data, scope)

    let normalizedGivenData: Array<Mapping<unknown>> = []
    if (Array.isArray(givenData))
        normalizedGivenData = givenData
    else
        for (const [key, value] of Object.entries(givenData))
            normalizedGivenData.push({...value, $key: key})

    const result: Array<Mapping<unknown>> = []
    for (const item of normalizedGivenData) {
        const value: Mapping<unknown> = {}
        for (const [sourceName, targetName] of Object.entries(
            expression.$mapping
        ))
            if (Object.prototype.hasOwnProperty.call(item, sourceName))
                (value[targetName as string]) = item[sourceName]

        result.push(value)
    }

    return result
}

export const evaluateArrayContains = (
    expression: ArrayContainsExpression, scope: BasicScopeType
): boolean => {
    let array: unknown = scope

    if (expression.$arrayContains.target != null)
        array = evaluateExpression(expression.$arrayContains.target, scope)

    const value = evaluateExpression(expression.$arrayContains.value, scope)
    const key = evaluateExpression(expression.$arrayContains.key, scope)

    if (!Array.isArray(array))
        return false

    return array.some((item: unknown) => {
        if (
            typeof key === 'string' &&
            isPlainObject(item) &&
            Object.prototype.hasOwnProperty.call(item, key)
        ) {
            const record = item as Mapping<unknown>
            return record[key] === value
        }
        return item === value
    })
}

export function evaluateExpression<Type, ScopeType extends BasicScopeType>(
    expression: Expression<Type, ScopeType>, scope: ScopeType = {} as ScopeType
): Type {
    if (isSelector(expression))
        return evaluateSelector(expression.$select, scope)


    if (isCondition(expression))
        return evaluateCondition(expression, scope) as Type


    if (isUnaryOperation(expression))
        return evaluateUnaryOperation(expression, scope) as Type

    if (isOperation(expression))
        return evaluateOperation(expression, scope) as Type


    if (isOrExpression(expression))
        return evaluateOr(expression, scope) as Type

    if (isAndExpression(expression))
        return evaluateAnd(expression, scope) as Type

    if (isConcatExpression(expression))
        return evaluateConcat(expression, scope) as Type

    if (isMappingExpression(expression))
        return evaluateMapping(expression, scope) as Type


    if (isIfExpression(expression))
        return evaluateIf(expression, scope)

    if (isSwitchExpression(expression))
        return evaluateSwitch(expression, scope)

    if (isArrayContainsExpression(expression))
        return evaluateArrayContains(expression, scope) as Type


    return expression
}

export default evaluateExpression

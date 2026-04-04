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
    Mapping, Options
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
    NormalizedSelector,
    Selector,
    SelectorItem,
    SimpleRecursiveKeyOf,

    ArrayContainsExpression,
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
    MappingExpression
} from './types'

export const SELECTOR_KEY_NAMES = new Set<string>(['name'])
export const NO_ITEM_FOUND_SYMBOL =
    Symbol.for('EXPRESSION_EVALUATOR_NO_ITEM_FOUND')

export const DEFAULT_OPTIONS = {
    skipMissingLevel: false,
    contextReplacements: {},
    delimiter: '.'
}

const addBracketBasedPathElements = (subParts: Array<string>) => {
    const path: Array<SimpleRecursiveKeyOf> = []
    // NOTE: We add index assignments into path array.
    for (const subPart of subParts) {
        const openingBracketPosition = subPart.indexOf('[')
        if (openingBracketPosition > 0)
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
    givenOptions: Partial<Options<ScopeType> & {scope: ScopeType}> = {}
): NormalizedSelector<ScopeType> => {
    const options: Options<ScopeType> & {scope: ScopeType} =
        {...DEFAULT_OPTIONS, scope: {} as ScopeType, ...givenOptions}

    const path: NormalizedSelector<ScopeType> = []
    for (const component of ([] as NormalizedSelector<ScopeType>).concat(
        selector
    ))
        if (typeof component === 'string') {
            const parts: Array<string> = component.split(options.delimiter)
            for (let part of parts) {
                if (!part)
                    continue

                if (isFunction(part)) {
                    path.push(part)

                    continue
                }

                // Identify bracket based selectors like "[index]".
                const openingBracketPosition = part.indexOf('[')
                let restPart = part
                if (openingBracketPosition !== -1) {
                    restPart = part.substring(openingBracketPosition)
                    part = part.substring(0, openingBracketPosition)
                }

                if (Object.prototype.hasOwnProperty.call(
                    options.contextReplacements, part
                ))
                    path.push(...normalizeSelector(
                        options.contextReplacements[part], options
                    ))
                else
                    path.push(part)

                if (restPart !== part) {
                    // Trim bracket padding "[index]" => "index".
                    const subParts = restPart.match(/[^[]*\[\d+]/g) as
                        Array<string>
                    path.push(...addBracketBasedPathElements(subParts) as
                        unknown as
                        Array<RecursiveKeyOf>
                    )
                }
            }
        } else
            path.push(
                evaluateExpression(component, options.scope, options) as
                    SelectorItem<ScopeType>
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
 * @param givenOptions - Object to configure evaluation.
 * @param givenOptions.contextReplacements - Configuration how to replace
 * "this" and "thisParent" keywords in selectors.
 * @param givenOptions.delimiter - Delimiter to delimit given selector
 * components.
 * @param givenOptions.skipMissingLevel - Indicates to skip missing level in
 * given path.
 * @returns Determined sub structure of given data or "undefined".
 */
export const evaluateSelectorUntilLastObject = <
    ScopeType extends BasicScopeType
>(
        selector: Selector<ScopeType>,
        scope: ScopeType = {} as ScopeType,
        givenOptions: Partial<Options<ScopeType>> = {}
    ): [ScopeType, RecursiveKeyOf] => {
    const options: Options<ScopeType> = {...DEFAULT_OPTIONS, ...givenOptions}

    /*
        Create a list of keys or indexes to retrieve specified value from given
        object.
    */
    const path: NormalizedSelector<ScopeType> =
        normalizeSelector(selector, {...options, scope})
    // Dig into given scope for each previously found key or index.
    let result = scope
    let index = 0
    for (const keyOrIndex of path) {
        const isLastPart = index === path.length - 1

        if (isObject(result)) {
            if (
                Array.isArray(result) &&
                (typeof keyOrIndex === 'string' && isNaN(parseInt(keyOrIndex)))
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
            else if (!options.skipMissingLevel)
                return [result, keyOrIndex as RecursiveKeyOf]
        } else if (isLastPart)
            return [result, keyOrIndex as RecursiveKeyOf]
        else if (!options.skipMissingLevel)
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
 * @param options - Options object to configure evaluation.
 * @param options.contextReplacements - Configuration how to replace "this"
 * and "thisParent" keywords in selectors.
 * @param options.delimiter - Delimiter to delimit given selector components.
 * @param options.skipMissingLevel - Indicates to skip missing level in given
 * path.
 * @returns Determined sub structure of given data or "undefined".
 */
export const evaluateSelector = <Type, ScopeType extends BasicScopeType>(
    selector: Selector<ScopeType>,
    scope: ScopeType = {} as ScopeType,
    options: Partial<Options<ScopeType>> = {}
): Type => {
    const [lastObject, lastKey] =
        evaluateSelectorUntilLastObject(selector, scope, options)

    if ((lastKey as unknown as string) === '')
        return scope as unknown as Type

    if (isFunction(lastKey))
        return lastKey(lastObject) as Type

    if (Object.prototype.hasOwnProperty.call(lastObject, lastKey))
        return (lastObject as Mapping<Type>)[lastKey]

    return undefined as Type
}

export const evaluateCondition = <ScopeType extends BasicScopeType>(
    condition: Condition,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): boolean => {
    const value1 = evaluateExpression(condition.value1, scope, options)
    const value2 = evaluateExpression(condition.value2, scope, options)

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
    operation: UnaryOperation,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): boolean => {
    const operand = evaluateExpression(operation.operand, scope, options)

    switch (operation.$operator) {
    case '!':
        return !operand
    case '!!':
        return Boolean(operand)
    }
}

export const evaluateOperation = <ScopeType extends BasicScopeType>(
    operation: Operation,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): number => {
    const operand1 = evaluateExpression(operation.operand1, scope, options)
    const operand2 = evaluateExpression(operation.operand2, scope, options)

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
    expression: IfExpression<Type> | CaseExpression<Type>,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): Type => {
    if (typeof expression.then === 'undefined')
        return undefined as Type

    return evaluateExpression(expression.then, scope, options)
}

export const evaluateIf = <Type, ScopeType extends BasicScopeType>(
    expression: IfExpression<Type>,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): Type => {
    if (evaluateExpression(expression.$if, scope, options))
        return evaluateOptionalThen(expression, scope, options)

    return typeof expression.else === 'undefined' ?
        undefined as Type :
        evaluateExpression(expression.else, scope)
}

export const evaluateSwitch = <Type, ScopeType extends BasicScopeType>(
    expression: SwitchExpression<Type>,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): Type => {
    const value = evaluateExpression(expression.$switch, scope)

    for (const caseExpression of expression.caseExpressions)
        if (value === evaluateExpression(caseExpression.$case, scope, options))
            return evaluateOptionalThen(caseExpression, scope, options)

    if (typeof expression.default !== 'undefined')
        return evaluateExpression(expression.default, scope, options)

    return undefined as Type
}

export const evaluateAnd = <ScopeType extends BasicScopeType>(
    expression: AndExpression,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): boolean => {
    for (const condition of expression.$and)
        if (!evaluateExpression(condition, scope, options))
            return false

    return true
}

export const evaluateOr = <ScopeType extends BasicScopeType>(
    expression: OrExpression,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): boolean => {
    for (const condition of expression.$or)
        if (evaluateExpression(condition, scope, options))
            return true

    return false
}

export const evaluateConcat = <ScopeType extends BasicScopeType>(
    expression: ConcatExpression,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): Array<unknown> | string => {
    let result: Array<unknown> = []
    let isArray = false
    for (const item of expression.$concat) {
        const value = evaluateExpression(item, scope, options)
        if (Array.isArray(value))
            isArray = true

        result = result.concat(value)
    }

    return isArray ? result : result.join('')
}

export const evaluateMapping = <ScopeType extends BasicScopeType>(
    expression: MappingExpression,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): Array<Mapping<unknown>> => {
    const givenData = evaluateExpression(expression.data, scope, options)

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

export const evaluateArrayContains = <ScopeType extends BasicScopeType>(
    expression: ArrayContainsExpression,
    scope: ScopeType,
    options: Partial<Options<ScopeType>>
): boolean => {
    let array: unknown = scope

    if (expression.$arrayContains.target != null)
        array = evaluateExpression(
            expression.$arrayContains.target, scope, options
        )

    const value =
        evaluateExpression(expression.$arrayContains.value, scope, options)
    const key =
        evaluateExpression(expression.$arrayContains.key, scope, options)

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
    expression: Expression<Type, ScopeType>,
    scope: ScopeType = {} as ScopeType,
    options: Partial<Options<ScopeType>> = {}
): Type {
    if (isSelector(expression))
        return evaluateSelector(expression.$select, scope, options)


    if (isCondition(expression))
        return evaluateCondition(expression, scope, options) as Type


    if (isUnaryOperation(expression))
        return evaluateUnaryOperation(expression, scope, options) as Type

    if (isOperation(expression))
        return evaluateOperation(expression, scope, options) as Type


    if (isOrExpression(expression))
        return evaluateOr(expression, scope, options) as Type

    if (isAndExpression(expression))
        return evaluateAnd(expression, scope, options) as Type

    if (isConcatExpression(expression))
        return evaluateConcat(expression, scope, options) as Type

    if (isMappingExpression(expression))
        return evaluateMapping(expression, scope, options) as Type


    if (isIfExpression(expression))
        return evaluateIf(expression, scope, options)

    if (isSwitchExpression(expression))
        return evaluateSwitch(expression, scope, options)

    if (isArrayContainsExpression(expression))
        return evaluateArrayContains(expression, scope, options) as Type


    return expression
}

export default evaluateExpression

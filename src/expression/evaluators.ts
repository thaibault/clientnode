import {equals, Mapping} from '../'

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
    KeyPathOf,
    RecursiveKeyOf,
    MappingExpression, ArrayContainsExpression
} from './types'
import {isPlainObject} from '../indicators'

export const SELECTOR_KEY_NAMES = new Set<string>(['name'])
export const NO_ITEM_FOUND_SYMBOL =
    Symbol.for('EXPRESSION_EVALUATOR_NO_ITEM_FOUND')

export const normalizeSelector = <ScopeType extends BasicScopeType>(
    selector: (
        KeyPathOf<ScopeType> |
        Array<Expression<RecursiveKeyOf<ScopeType>, ScopeType>>
    ),
    scope: ScopeType = {} as ScopeType
): Array<RecursiveKeyOf<ScopeType>> => {
    const path: Array<RecursiveKeyOf<ScopeType>> = []
    for (const part of (
        Array.isArray(selector) ? selector : selector.split('.')
    )) {
        if (!part)
            continue

        if (typeof part !== 'string') {
            path.push(
                evaluate<RecursiveKeyOf<ScopeType>, ScopeType>(part, scope)
            )
            continue
        }
    }

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

export const evaluateSelectorUntilLastObject = <
    ScopeType extends BasicScopeType
>(
        selector: (
            KeyPathOf<ScopeType> |
            Array<Expression<RecursiveKeyOf<ScopeType>, ScopeType>>
        ),
        scope: ScopeType = {} as ScopeType
    ): [ScopeType, RecursiveKeyOf<ScopeType>] => {
    // Create a list of keys or indexes to retrieve specified value from given
    // object.
    const path: Array<RecursiveKeyOf<ScopeType>> =
        normalizeSelector(selector, scope)
    // Dig into given scope for each previously found key or index.
    let result = scope
    let index = 0
    for (const keyOrIndex of path) {
        const isLastPart = index === path.length - 1
        if (Object.prototype.hasOwnProperty.call(result, keyOrIndex)) {
            if (isLastPart)
                return [result, keyOrIndex]

            result = result[keyOrIndex as keyof ScopeType] as ScopeType
        } else if (
            Array.isArray(result) &&
            (typeof keyOrIndex === 'string' && isNaN(parseInt(keyOrIndex)))
        ) {
            const item = selectArrayItem(result, keyOrIndex)
            if (item !== NO_ITEM_FOUND_SYMBOL) {
                if (isLastPart)
                    return typeof keyOrIndex === 'number' ?
                        [result, keyOrIndex] :
                        [result, result.indexOf(item)]

                result = item as ScopeType
            }
        } else
            return [result, keyOrIndex]

        index += 1
    }

    return [{} as ScopeType, '']
}

export const evaluateSelector = <Type, ScopeType extends BasicScopeType>(
    selector: (
        KeyPathOf<ScopeType> |
        Array<Expression<RecursiveKeyOf<ScopeType>, ScopeType>>
    ),
    scope: ScopeType
): Type => {
    const [lastObject, lastKey] =
        evaluateSelectorUntilLastObject(selector, scope)

    if (Object.prototype.hasOwnProperty.call(lastObject, lastKey))
        return (lastObject as Mapping<Type>)[lastKey]

    return undefined as Type
}

export const evaluateCondition = <ScopeType extends BasicScopeType>(
    condition: Condition, scope: ScopeType
): boolean => {
    const value1 = evaluate<unknown, ScopeType>(condition.value1, scope)
    const value2 = evaluate<unknown, ScopeType>(condition.value2, scope)

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
    const operand = evaluate<unknown, ScopeType>(operation.operand, scope)

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
    const operand1 = evaluate<number, ScopeType>(operation.operand1, scope)
    const operand2 = evaluate<number, ScopeType>(operation.operand2, scope)

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

    return evaluate<Type, ScopeType>(expression.then, scope)
}

export const evaluateIf = <Type, ScopeType extends BasicScopeType>(
    expression: IfExpression<Type>, scope: ScopeType
): Type => {
    if (evaluate<boolean, ScopeType>(expression.$if, scope))
        return evaluateOptionalThen<Type, ScopeType>(expression, scope)

    return typeof expression.else === 'undefined' ?
        undefined as Type :
        evaluate<Type, ScopeType>(expression.else, scope)
}

export const evaluateSwitch = <Type, ScopeType extends BasicScopeType>(
    expression: SwitchExpression<Type>, scope: ScopeType
): Type => {
    const value = evaluate(expression.$switch, scope)

    for (const caseExpression of expression.caseExpressions)
        if (value === evaluate(caseExpression.$case, scope))
            return evaluateOptionalThen<Type, ScopeType>(caseExpression, scope)

    if (typeof expression.default !== 'undefined')
        return evaluate<Type, ScopeType>(expression.default, scope)

    return undefined as Type
}

export const evaluateAnd = <ScopeType extends BasicScopeType>(
    expression: AndExpression, scope: ScopeType
): boolean => {
    for (const condition of expression.$and)
        if (!evaluate<boolean, ScopeType>(condition, scope))
            return false

    return true
}

export const evaluateOr = <ScopeType extends BasicScopeType>(
    expression: OrExpression, scope: ScopeType
): boolean => {
    for (const condition of expression.$or)
        if (evaluate<boolean, ScopeType>(condition, scope))
            return true

    return false
}

export const evaluateConcat = <ScopeType extends BasicScopeType>(
    expression: ConcatExpression, scope: ScopeType
): Array<unknown> | string => {
    let result: Array<unknown> = []
    let isArray = false
    for (const item of expression.$concat) {
        const value = evaluate<Array<unknown> | string, ScopeType>(item, scope)
        if (Array.isArray(value))
            isArray = true

        result = result.concat(value)
    }

    return isArray ? result : result.join('')
}

export const evaluateMapping = <ScopeType extends BasicScopeType>(
    expression: MappingExpression, scope: ScopeType
): Mapping<Array<unknown>> => {
    const givenData = evaluate<
        Mapping<Mapping<unknown>> | Array<Mapping<unknown>>,
        ScopeType
    >(expression.data, scope)

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
        array = evaluate<unknown, BasicScopeType>(
            expression.$arrayContains.target, scope
        )

    const value = evaluate(expression.$arrayContains.value, scope)
    const key = evaluate(expression.$arrayContains.key, scope)

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

export function evaluate<Type, ScopeType extends BasicScopeType>(
    expression: Expression<Type, ScopeType>, scope: ScopeType = {} as ScopeType
): Type {
    if (isSelector<Type, ScopeType>(expression))
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

export default evaluate

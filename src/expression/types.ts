import {Mapping} from '../'

/*
    TOO expensive so far:

    export type KeyPathOf<TObj extends BasicScopeType> = {
        [TKey in keyof TObj & (string | number)]:
            TObj[TKey] extends unknown[] ?
                // NOTE: "TKey | `${TKey}[${KeyPathOf<TObj[TKey]>}]` :" cannot
                // statically analyze multiple array item types.
                string :
                TObj[TKey] extends object ?
                    TKey | `${TKey}.${KeyPathOf<TObj[TKey]>}` :
                    TKey
        }[keyof TObj & (string | number)]

    export type RecursiveKeyOf<TObj extends BasicScopeType> = {
        [TKey in keyof TObj & (string | number)]:
            TObj[TKey] extends unknown[] ?
                // NOTE: "TKey | RecursiveKeyOf<TObj[TKey]> :" cannot
                // statically analyze multiple array item types.
                number | string :
                TObj[TKey] extends object ?
                    TKey | RecursiveKeyOf<TObj[TKey]> :
                    TKey
    }[keyof TObj & (string | number)]
*/
export type BasicScopeType = Array<unknown> | Mapping<unknown>

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type KeyPathOf<TObj extends BasicScopeType> = string
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type RecursiveKeyOf<TObj extends BasicScopeType> = number | string

export type Comparator = '==' | '!=' | '<' | '>' | '<=' | '>='
export type UnaryOperator = '!' | '!!'
export type Operator = '+' | '-' | '*' | '**' | '/'
export type Scope<Type = unknown> = Mapping<Type>

/*
    Expressions needs to be distinguishable from plain data. The "$" prefix
    indicates to be and expression.
*/

// Conditionals

export interface Condition {
    value1: Expression
    $comparator: Comparator
    value2: Expression
}

export interface IfExpression<Type> {
    $if: Expression<boolean>
    then?: Expression<Type>
    else?: Expression<Type>
}

export interface SwitchExpression<Type> {
    $switch: Expression
    caseExpressions: Array<CaseExpression<Type>>
    default?: Expression<Type>
}
export interface CaseExpression<Type> {
    $case: Expression,
    then?: Expression<Type>
}

export interface ArrayContainsExpression {
    $arrayContains: {
        target?: Expression;
        key?: Expression<string>;
        value: Expression<string | number | boolean>;
    }
}

// Aggregating

export interface AndExpression {
    $and: Array<Expression<boolean>>
}

export interface OrExpression {
    $or: Array<Expression<boolean>>
}

export interface ConcatExpression {
    $concat: Array<Expression<Array<unknown> | string>>
}

export interface MappingExpression {
    $mapping: Expression<Mapping>
    data: Expression<Mapping<Mapping<unknown>> | Array<Mapping<unknown>>>
}

// Operations

export interface UnaryOperation {
    operand: Expression
    $operator: UnaryOperator
}

export interface Operation {
    operand1: Expression<number>
    $operator: Operator
    operand2: Expression<number>
}

// Dynamically picking data

export interface Selector<ScopeType extends BasicScopeType> {
    $select: (
        KeyPathOf<ScopeType> |
        Array<
            number |
            Expression<RecursiveKeyOf<ScopeType> | number> |
            RecursiveKeyOf<ScopeType>
        >
    )
}

export type Expression<
    Type = unknown, ScopeType extends BasicScopeType = BasicScopeType
> =
    Condition |

    AndExpression |
    OrExpression |

    ConcatExpression |
    MappingExpression |

    UnaryOperation |
    Operation |

    IfExpression<Type> |
    SwitchExpression<Type> |
    ArrayContainsExpression |

    Selector<ScopeType> |

    Type

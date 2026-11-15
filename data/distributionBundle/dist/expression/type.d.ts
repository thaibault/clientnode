import type { Mapping } from '../';
export type BasicScopeType = Array<unknown> | Mapping<unknown> | unknown;
export type KeyPathOf = string;
export type SimpleRecursiveKeyOf = number | string;
export type RecursiveKeyOf = ((scope: unknown) => unknown) | SimpleRecursiveKeyOf;
export type SelectorItem<Type extends BasicScopeType> = RecursiveKeyOf | Expression<RecursiveKeyOf | number, Type>;
export type NormalizedSelector<Type extends BasicScopeType> = Array<SelectorItem<Type>>;
export type Selector<Type extends BasicScopeType> = SelectorItem<Type> | NormalizedSelector<Type>;
export type ContextReplacements<ScopeType extends BasicScopeType> = Mapping<Selector<ScopeType>>;
export interface Options<ScopeType extends BasicScopeType> {
    contextReplacements: ContextReplacements<ScopeType>;
    delimiter: string;
    skipMissingLevel: boolean;
}
export type Comparator = '==' | '!=' | '<' | '>' | '<=' | '>=';
export type UnaryOperator = '!' | '!!';
export type Operator = '+' | '-' | '*' | '**' | '/';
export type Scope<Type = unknown> = Mapping<Type>;
export interface Condition {
    value1: Expression;
    $comparator: Comparator;
    value2: Expression;
}
export interface IfExpression<Type> {
    $if: Expression<boolean>;
    then?: Expression<Type>;
    else?: Expression<Type>;
}
export interface SwitchExpression<Type> {
    $switch: Expression;
    caseExpressions: Array<CaseExpression<Type>>;
    default?: Expression<Type>;
}
export interface CaseExpression<Type> {
    $case: Expression;
    then?: Expression<Type>;
}
export interface ArrayContainsExpression {
    $arrayContains: {
        target?: Expression;
        key?: Expression<string>;
        value: Expression<string | number | boolean>;
    };
}
export interface AndExpression {
    $and: Array<Expression<boolean>>;
}
export interface OrExpression {
    $or: Array<Expression<boolean>>;
}
export interface ConcatExpression {
    $concat: Array<Expression<Array<unknown> | string>>;
}
export interface MappingExpression {
    $mapping: Expression<Mapping>;
    data: Expression<Mapping<Mapping<unknown>> | Array<Mapping<unknown>>>;
}
export interface UnaryOperation {
    operand: Expression;
    $operator: UnaryOperator;
}
export interface Operation {
    operand1: Expression<number>;
    $operator: Operator;
    operand2: Expression<number>;
}
export interface SelectorExpression<ScopeType extends BasicScopeType> {
    $select: Selector<ScopeType>;
}
export type Expression<Type = unknown, ScopeType extends BasicScopeType = BasicScopeType> = Condition | AndExpression | OrExpression | ConcatExpression | MappingExpression | UnaryOperation | Operation | IfExpression<Type> | SwitchExpression<Type> | ArrayContainsExpression | SelectorExpression<ScopeType> | Type;

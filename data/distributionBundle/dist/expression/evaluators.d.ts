import type { Mapping, Options } from '../';
import type { NormalizedSelector, Selector, ArrayContainsExpression, AndExpression, OrExpression, ConcatExpression, Expression, IfExpression, SwitchExpression, CaseExpression, UnaryOperation, Operation, Condition, BasicScopeType, RecursiveKeyOf, MappingExpression } from './type';
export declare const SELECTOR_KEY_NAMES: Set<string>;
export declare const NO_ITEM_FOUND_SYMBOL: unique symbol;
export declare const DEFAULT_OPTIONS: {
    skipMissingLevel: boolean;
    contextReplacements: {};
    delimiter: string;
};
export declare const normalizeSelector: <ScopeType extends BasicScopeType>(selector: Selector<ScopeType>, givenOptions?: Partial<Options<ScopeType> & {
    scope: ScopeType;
}>) => NormalizedSelector<ScopeType>;
export declare const selectArrayItem: (data: Array<unknown>, keyOrIndex: number | string) => unknown;
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
export declare const evaluateSelectorUntilLastObject: <ScopeType extends BasicScopeType>(selector: Selector<ScopeType>, scope?: ScopeType, givenOptions?: Partial<Options<ScopeType>>) => [ScopeType, RecursiveKeyOf];
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
export declare const evaluateSelector: <Type, ScopeType extends BasicScopeType>(selector: Selector<ScopeType>, scope?: ScopeType, options?: Partial<Options<ScopeType>>) => Type;
export declare const evaluateCondition: <ScopeType extends BasicScopeType>(condition: Condition, scope: ScopeType, options: Partial<Options<ScopeType>>) => boolean;
export declare const evaluateOperation: <ScopeType extends BasicScopeType>(operation: Operation, scope: ScopeType, options: Partial<Options<ScopeType>>) => number;
export declare const evaluateUnaryOperation: <ScopeType extends BasicScopeType>(operation: UnaryOperation, scope: ScopeType, options: Partial<Options<ScopeType>>) => boolean;
export declare const evaluateOptionalThen: <Type, ScopeType extends BasicScopeType>(expression: IfExpression<Type> | CaseExpression<Type>, scope: ScopeType, options: Partial<Options<ScopeType>>) => Type;
export declare const evaluateIf: <Type, ScopeType extends BasicScopeType>(expression: IfExpression<Type>, scope: ScopeType, options: Partial<Options<ScopeType>>) => Type;
export declare const evaluateSwitch: <Type, ScopeType extends BasicScopeType>(expression: SwitchExpression<Type>, scope: ScopeType, options: Partial<Options<ScopeType>>) => Type;
export declare const evaluateAnd: <ScopeType extends BasicScopeType>(expression: AndExpression, scope: ScopeType, options: Partial<Options<ScopeType>>) => boolean;
export declare const evaluateOr: <ScopeType extends BasicScopeType>(expression: OrExpression, scope: ScopeType, options: Partial<Options<ScopeType>>) => boolean;
export declare const evaluateConcat: <ScopeType extends BasicScopeType>(expression: ConcatExpression, scope: ScopeType, options: Partial<Options<ScopeType>>) => Array<unknown> | string;
export declare const evaluateMapping: <ScopeType extends BasicScopeType>(expression: MappingExpression, scope: ScopeType, options: Partial<Options<ScopeType>>) => Array<Mapping<unknown>>;
export declare const evaluateArrayContains: <ScopeType extends BasicScopeType>(expression: ArrayContainsExpression, scope: ScopeType, options: Partial<Options<ScopeType>>) => boolean;
export declare function evaluateExpression<Type, ScopeType extends BasicScopeType>(expression: Expression<Type, ScopeType>, scope?: ScopeType, options?: Partial<Options<ScopeType>>): Type;
export default evaluateExpression;

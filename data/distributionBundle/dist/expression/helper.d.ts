import type { Mapping } from '../';
import type { BasicScopeType } from './type';
export declare const viewArrayAsScope: <Type extends Array<Mapping<unknown>>, ScopeType extends BasicScopeType>(data: Type, childrenPropertyNames: Array<string>, propertyReferenceKeys: Array<string>) => ScopeType;
export declare const viewObjectAsScope: <Type extends Mapping<unknown>, ScopeType extends BasicScopeType = BasicScopeType>(data: Type, childrenPropertyNames?: string[], propertyReferenceKeys?: string[]) => ScopeType;

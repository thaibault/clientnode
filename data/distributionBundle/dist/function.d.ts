import type { AnyFunction } from './type';
/**
 * Determines all parameter names from given callable (function or class,
 * ...).
 * @param callable - Function or function code to inspect.
 * @returns List of parameter names.
 */
export declare const getParameterNames: (callable: AnyFunction | string) => Array<string>;
/**
 * Implements the identity function.
 * @param value - A value to return.
 * @returns Returns the given value.
 */
export declare const identity: <T>(value: T) => T;
/**
 * Inverted filter helper to inverse each given filter.
 * @param filter - A function that filters an array.
 * @returns The inverted filter.
 */
export declare const invertArrayFilter: <T, D = Array<unknown>>(filter: T) => T;

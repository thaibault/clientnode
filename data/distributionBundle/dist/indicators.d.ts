import type { AnyFunction, Mapping, PlainObject, ProxyType } from './type';
/**
 * Checks whether one of the given pattern matches given string.
 * @param target - Target to check in pattern for.
 * @param pattern - List of pattern to check for.
 * @returns Value "true" if given object is matches by at leas one of the
 * given pattern and "false" otherwise.
 */
export declare const isAnyMatching: (target: string, pattern: Array<RegExp | string>) => boolean;
/**
 * Checks if given object is similar to an array and can be handled like an
 * array.
 * @param object - Object to check behavior for.
 * @returns A boolean value indicating whether given object is array like.
 */
export declare const isArrayLike: (object: unknown) => boolean;
/**
 * Checks whether given object is a function.
 * @param value - Value to check.
 * @returns Value "true" if given object is a function and "false"
 * otherwise.
 */
export declare const isFunction: (value: unknown) => value is AnyFunction;
/**
 * Checks whether given object is a map.
 * @param value - Value to check.
 * @returns Value "true" if given object is a map and "false" otherwise.
 */
export declare const isMap: (value: unknown) => value is Map<unknown, unknown>;
/**
 * Determines whether its argument represents a JavaScript number.
 * @param value - Value to analyze.
 * @returns A boolean value indicating whether given object is numeric
 * like.
 */
export declare const isNumeric: (value: unknown) => value is number;
/**
 * Checks whether given object is a native object but not null.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */
export declare const isObject: (value: unknown) => value is Mapping<unknown>;
/**
 * Checks whether given object is a plain native object.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */
export declare const isPlainObject: (value: unknown) => value is PlainObject;
/**
 * Checks whether given object is a proxy.
 * @param value - Value to check.
 * @returns Value "true" if given object is a proxy and "false" otherwise.
 */
export declare const isProxy: (value: unknown) => value is ProxyType;
/**
 * Checks whether given object is a set.
 * @param value - Value to check.
 * @returns Value "true" if given object is a set and "false" otherwise.
 */
export declare const isSet: (value: unknown) => value is Set<unknown>;
/**
 * Determine whether the argument is a window.
 * @param value - Value to check for.
 * @returns Boolean value indicating the result.
 */
export declare const isWindow: (value: unknown) => value is Window;

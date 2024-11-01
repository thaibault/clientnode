// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module indicators */
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
import {PLAIN_OBJECT_PROTOTYPES} from './constants'
import {determineType} from './object'
import {AnyFunction, Mapping, PlainObject, ProxyType} from './type'

/**
 * Determines whether its argument represents a JavaScript number.
 * @param value - Value to analyze.
 * @returns A boolean value indicating whether given object is numeric
 * like.
 */
export const isNumeric = (value: unknown): value is number => {
    const type: string = determineType(value)
    /*
        NOTE: "parseFloat" "NaNs" numeric-cast false positives ("") but
        misinterprets leading-number strings, particularly hex literals
        ("0x...") subtraction forces infinities to NaN.
    */
    return (
        ['number', 'string'].includes(type) &&
        !isNaN(value as number - parseFloat(value as string))
    )
}
/**
 * Determine whether the argument is a window.
 * @param value - Value to check for.
 * @returns Boolean value indicating the result.
 */
export const isWindow = (value: unknown): value is Window =>
    ![null, undefined].includes(value as null) &&
    typeof value === 'object' &&
    value === (value as null | Window)?.window
/**
 * Checks if given object is similar to an array and can be handled like an
 * array.
 * @param object - Object to check behavior for.
 * @returns A boolean value indicating whether given object is array like.
 */
export const isArrayLike = (object: unknown): boolean => {
    let length: number | boolean
    try {
        length = Boolean(object) && (object as Array<unknown>).length
    } catch (_error) {
        return false
    }

    const type: string = determineType(object)

    if (type === 'function' || isWindow(object))
        return false

    if (type === 'array' || length === 0)
        return true

    if (typeof length === 'number' && length > 0)
        try {
            const _dump = (object as Array<unknown>)[length - 1]

            return true
        } catch (_error) {
            // Continue regardless of an error.
        }

    return false
}
/**
 * Checks whether one of the given pattern matches given string.
 * @param target - Target to check in pattern for.
 * @param pattern - List of pattern to check for.
 * @returns Value "true" if given object is matches by at leas one of the
 * given pattern and "false" otherwise.
 */
export const isAnyMatching = (
    target: string, pattern: Array<RegExp | string>
): boolean => {
    for (const currentPattern of pattern)
        if (typeof currentPattern === 'string') {
            if (currentPattern === target)
                return true
        } else if (currentPattern.test(target))
            return true

    return false
}
/**
 * Checks whether given object is a native object but not null.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */
export const isObject = (value: unknown): value is Mapping<unknown> =>
    value !== null && typeof value === 'object'
/**
 * Checks whether given object is a plain native object.
 * @param value - Value to check.
 * @returns Value "true" if given object is a plain javaScript object and
 * "false" otherwise.
 */
export const isPlainObject = (value: unknown): value is PlainObject =>
    isObject(value) &&
    PLAIN_OBJECT_PROTOTYPES.includes(Object.getPrototypeOf(value))
/**
 * Checks whether given object is a set.
 * @param value - Value to check.
 * @returns Value "true" if given object is a set and "false" otherwise.
 */
export const isSet = (value: unknown): value is Set<unknown> =>
    determineType(value) === 'set'
/**
 * Checks whether given object is a map.
 * @param value - Value to check.
 * @returns Value "true" if given object is a map and "false" otherwise.
 */
export const isMap = (value: unknown): value is Map<unknown, unknown> =>
    determineType(value) === 'map'
/**
 * Checks whether given object is a proxy.
 * @param value - Value to check.
 * @returns Value "true" if given object is a proxy and "false" otherwise.
 */
export const isProxy = (value: unknown): value is ProxyType =>
    Boolean((value as ProxyType).__target__)
/**
 * Checks whether given object is a function.
 * @param value - Value to check.
 * @returns Value "true" if given object is a function and "false"
 * otherwise.
 */
export const isFunction = (value: unknown): value is AnyFunction =>
    Boolean(value) &&
    ['[object AsyncFunction]', '[object Function]'].includes(
        {}.toString.call(value)
    )

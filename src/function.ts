// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module function */
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
import {AnyFunction, ArrayTransformer} from './type'

/**
 * Determines all parameter names from given callable (function or class,
 * ...).
 * @param callable - Function or function code to inspect.
 * @returns List of parameter names.
 */
export const getParameterNames = (
    callable:AnyFunction|string
):Array<string> => {
    const functionCode:string = (
        (typeof callable === 'string') ?
            callable :
            // Strip comments.
            callable.toString()
    ).replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')

    if (functionCode.startsWith('class'))
        return getParameterNames(
            'function ' +
            functionCode.replace(/.*(constructor\([^)]+\))/m, '$1')
        )

    // Try classic function declaration.
    let parameter:Array<string>|null =
        /^function\s*[^(]*\(\s*([^)]*)\)/m.exec(functionCode)
    if (parameter === null)
        // Try arrow function declaration.
        parameter = /^[^(]*\(\s*([^)]*)\) *=>.*/m.exec(functionCode)
    if (parameter === null)
        // Try one argument and without brackets arrow function declaration.
        parameter = /([^= ]+) *=>.*/m.exec(functionCode)

    const names:Array<string> = []
    if (parameter && parameter.length > 1 && parameter[1].trim().length) {
        for (const name of parameter[1].split(','))
            // Remove default parameter values.
            names.push(name.replace(/=.+$/g, '').trim())
        return names
    }

    return names
}
/**
 * Implements the identity function.
 * @param value - A value to return.
 * @returns Returns the given value.
 */
export const identity = <T>(value:T):T => value
/**
 * Inverted filter helper to inverse each given filter.
 * @param filter - A function that filters an array.
 * @returns The inverted filter.
 */
export const invertArrayFilter = <T>(filter:T):T => {
    return ((
        data:Array<unknown>, ...additionalParameter:Array<unknown>
    ):Array<unknown> => {
        if (data) {
            const filteredData:Array<unknown> = (
                filter as unknown as ArrayTransformer
            )(data, ...additionalParameter)

            let result:Array<unknown> = []
            if (filteredData.length) {
                for (const date of data)
                    if (!filteredData.includes(date))
                        result.push(date)
            } else
                result = data

            return result
        }

        return data
    }) as unknown as T
}
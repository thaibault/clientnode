// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module require */
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
import {FirstParameter, ImportFunction} from './type'
// Make preprocessed require function available at runtime.
/*
    NOTE: This results in a webpack error when postprocessing this compiled
    pendant in another webpack context.

    declare const __non_webpack_require__: typeof require
*/
export const currentRequire: null | typeof require =
    /*
        typeof __non_webpack_require__ === 'function' ?
            __non_webpack_require__ :
    */
    eval(`typeof require === 'undefined' ? null : require`) as
        null | typeof require

let currentOptionalImport: ImportFunction | null = null
try {
    currentOptionalImport =
        eval(`typeof import === 'undefined' ? null : import`) as
            ImportFunction | null
} catch {
    // Continue regardless of an error.
}
export const currentImport: null | ImportFunction = currentOptionalImport
export const optionalRequire = <T = unknown>(id: string): null | T => {
    try {
        return currentRequire ? currentRequire(id) as T : null
    } catch {
        return null
    }
}
export const clearRequireCache = (
    cache: typeof require.cache = currentRequire?.cache || require.cache
): typeof require.cache => {
    const backup: typeof require.cache = {}
    for (const [key, module] of Object.entries(cache)) {
        backup[key] = module
        delete cache[key]
    }

    return backup
}
const restoreRequireCache = (
    cache: typeof require.cache = currentRequire?.cache || require.cache,
    backup: typeof require.cache
) => {
    clearRequireCache()

    for (const [key, module] of Object.entries(backup))
        cache[key] = module
}

export const isolatedRequire = (
    path: FirstParameter<typeof require>,
    requireFunction: typeof require = currentRequire || require
): ReturnType<typeof require> => {
    const backup = clearRequireCache(requireFunction.cache)

    try {
        // @ts-expect-error Typescript cannot reolve this.
        return requireFunction(path) as ReturnType<typeof require>
    // eslint-disable-next-line no-useless-catch
    } catch (error) {
        throw error
    } finally {
        restoreRequireCache(requireFunction.cache, backup)
    }
}

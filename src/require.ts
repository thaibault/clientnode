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

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {FirstParameter, ImportFunction} from './type'

export const determineGlobalContext = (): Partial<typeof globalThis> => {
    if (typeof globalThis === 'undefined') {
        if (typeof window === 'undefined') {
            if (typeof global === 'undefined')
                return ((typeof module === 'undefined') ? {} : module) as
                    typeof globalThis

            if (Object.prototype.hasOwnProperty.call(global, 'window'))
                return global.window

            return global
        }

        return window
    }

    return globalThis
}
const globalContext = determineGlobalContext()

// Make preprocessed require function available at runtime.
export const currentRequire: null | typeof require =
    typeof globalContext.require === 'undefined' ?
        null :
        globalContext.require as null | typeof require
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
        return requireFunction(path as unknown as string) as
            ReturnType<typeof require>
        // eslint-disable-next-line no-useless-catch
    } catch (error) {
        throw error
    } finally {
        restoreRequireCache(requireFunction.cache, backup)
    }
}

// Make preprocessed import function available at runtime.
export const isImportSyntaxSupported = () => {
    try {
        new Function('import("data:text/javascript,")')
        return true
    } catch {
        return false
    }
}
export const optionalImport = <T = unknown>(id: string): Promise<T> => {
    try {
        return isImportSyntaxSupported() ?
            (new Function(`return import('${id}')`))() as Promise<T> :
            Promise.resolve(null)
    } catch {
        return Promise.resolve(null)
    }
}

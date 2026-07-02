// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module module */
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
import type {FirstParameter} from './type'

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

// Make preprocessed import function available at runtime.
export const isImportSyntaxSupported = () => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        new Function('import("data:text/javascript,")')
        return true
    } catch {
        return false
    }
}

// Make preprocessed require function available at runtime.
let customRequire: null | typeof require =
    typeof globalContext.require === 'undefined' ?
        null :
        globalContext.require as null | typeof require
if (!customRequire && isImportSyntaxSupported())
    try {
        const {createRequire} =
            /*
                eslint-disable
                @typescript-eslint/no-implied-eval,
                @typescript-eslint/no-unsafe-call
            */
            await new Function('return import("node:module")')()
            /*
                eslint-enable
                @typescript-eslint/no-implied-eval,
                @typescript-eslint/no-unsafe-call
            */
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        customRequire = createRequire(import.meta.url)
    } catch {
        // Ignore error.
    }
export const currentRequire = customRequire
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

export const optionalImport = async <T = unknown>(
    id: string, options = {}
): Promise<null | T> => {
    try {
        return isImportSyntaxSupported() ?
            /*
                eslint-disable
                @typescript-eslint/no-implied-eval,
                @typescript-eslint/no-unsafe-call
            */
            await ((new Function(
                'options', `return import('${id}', options)`
            ))(options) as Promise<T>) :
            await Promise.resolve(null)
            /*
                eslint-enable
                @typescript-eslint/no-implied-eval,
                @typescript-eslint/no-unsafe-call
            */
    } catch {
        return await Promise.resolve(null)
    }
}

// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module object */
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
import {
    CLASS_TO_TYPE_MAPPING, IGNORE_NULL_AND_UNDEFINED_SYMBOL, VALUE_COPY_SYMBOL
} from './constants'
import {
    isFunction, isObject, isPlainObject, isMap, isProxy, isSet, isNumeric
} from './indicators'
import {isNotANumber} from './number'
import {escapeRegularExpressions, evaluate} from './string'
import {
    AnyFunction,
    BaseSelector,
    CompareOptions,
    EvaluationResult,
    GetterFunction,
    Mapping,
    NormalizedObjectMask,
    ObjectMaskConfiguration,
    PlainObject,
    Primitive,
    ProxyHandler,
    ProxyType,
    RecursiveEvaluateable,
    RecursivePartial,
    Selector,
    SetterFunction,
    UnknownFunction,
    ValueOf
} from './type'

/**
 * Adds dynamic getter and setter to any given data structure such as maps.
 * @param object - Object to proxy.
 * @param getterWrapper - Function to wrap each property get.
 * @param setterWrapper - Function to wrap each property set.
 * @param methodNames - Method names to perform actions on the given
 * object.
 * @param deep - Indicates to perform a deep wrapping of specified types.
 * @param typesToExtend - Types which should be extended (Checks are
 * performed via "value instanceof type".).
 * @returns Returns given object wrapped with a dynamic getter proxy.
 */
export const addDynamicGetterAndSetter = <T = unknown>(
    object: T,
    getterWrapper: GetterFunction | null = null,
    setterWrapper: null | SetterFunction = null,
    methodNames: Mapping = {},
    deep = true,
    typesToExtend: Array<unknown> = [Object]
): ProxyType<T> | T => {
    if (deep && typeof object === 'object')
        if (Array.isArray(object)) {
            let index = 0
            for (const value of object) {
                object[index] = addDynamicGetterAndSetter(
                    value, getterWrapper, setterWrapper, methodNames, deep
                )

                index += 1
            }
        } else if (isMap(object))
            for (const [key, value] of object)
                object.set(key, addDynamicGetterAndSetter(
                    value, getterWrapper, setterWrapper, methodNames, deep)
                )
        else if (isSet(object)) {
            const cache: Array<unknown> = []
            for (const value of object) {
                object.delete(value)
                cache.push(addDynamicGetterAndSetter(
                    value, getterWrapper, setterWrapper, methodNames, deep)
                )
            }

            for (const value of cache)
                object.add(value)
        } else if (object !== null)
            for (const [key, value] of Object.entries(object))
                (object as unknown as Mapping<unknown>)[key] =
                    addDynamicGetterAndSetter<T[Extract<keyof T, string>]>(
                        value as T[Extract<keyof T, string>],
                        getterWrapper,
                        setterWrapper,
                        methodNames,
                        deep
                    ) as unknown as T[Extract<keyof T, string>]

    if (getterWrapper || setterWrapper)
        for (const type of typesToExtend)
            if (
                isObject(object) && object instanceof (type as AnyFunction)
            ) {
                const defaultHandler: ProxyHandler<T> =
                    getProxyHandler<T>(object, methodNames)
                const handler: ProxyHandler<T> =
                    getProxyHandler<T>(object, methodNames)

                if (getterWrapper)
                    handler.get = (
                        _target: T, name: string | symbol
                    ): unknown => {
                        if (name === '__target__')
                            return object

                        if (name === '__revoke__')
                            return (): unknown => {
                                revoke()

                                return object
                            }

                        if (typeof object[name as keyof T] === 'function')
                            return object[name as keyof T]

                        return getterWrapper(
                            defaultHandler.get(proxy as T, name),
                            name,
                            object
                        )
                    }

                if (setterWrapper)
                    handler.set = (
                        _target: T, name: string | symbol, value: unknown
                    ): boolean =>
                        defaultHandler.set(
                            proxy as T,
                            name,
                            setterWrapper(name, value, object)
                        )
                const {proxy, revoke} =
                    Proxy.revocable({}, handler as ProxyHandler<object>)

                return proxy as ProxyType<T>
            }

    return object
}
/**
 * Converts given object into its serialized json representation by
 * replacing circular references with a given provided value.
 *
 * This method traverses given object recursively and tracks of seen and
 * already serialized structures to reuse generated strings or mark a
 * circular reference.
 * @param object - Object to serialize.
 * @param determineCircularReferenceValue - Callback to create a fallback
 * value depending on given redundant value.
 * @param numberOfSpaces - Number of spaces to use for string formatting.
 * @returns The formatted json string.
 */
export const convertCircularObjectToJSON = (
    object: unknown,
    determineCircularReferenceValue: ((
        serializedValue: unknown,
        key: null | string,
        value: unknown,
        seenObjects: Map<unknown, unknown>
    ) => unknown) = (serializedValue: unknown): unknown =>
        serializedValue ?? '__circularReference__',
    numberOfSpaces = 0
): ReturnType<typeof JSON.stringify> | undefined => {
    const seenObjects: Map<unknown, unknown> = new Map<unknown, unknown>()

    const stringifier = (object: unknown): string => {
        const replacer = (key: null | string, value: unknown): unknown => {
            if (isObject(value)) {
                if (seenObjects.has(value))
                    return determineCircularReferenceValue(
                        seenObjects.get(value) ?? null,
                        key,
                        value,
                        seenObjects
                    )

                // NOTE: Set before traversing deeper to detect cycles.
                seenObjects.set(value, null)

                let result: Array<unknown> | Mapping<unknown>
                if (Array.isArray(value)) {
                    result = []
                    for (const item of value)
                        result.push(replacer(null, item))
                } else {
                    result = {}
                    for (const [name, subValue] of Object.entries(value))
                        result[name] = replacer(name, subValue)
                }

                seenObjects.set(value, result)

                return result
            }

            return value
        }

        return JSON.stringify(object, replacer, numberOfSpaces)
    }

    return stringifier(object)
}
/**
 * Converts given map and all nested found maps objects to corresponding
 * object.
 * @param object - Map to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given map as object.
 */
export const convertMapToPlainObject = (
    object: unknown, deep = true
): unknown => {
    if (typeof object === 'object') {
        if (isMap(object)) {
            const newObject: Mapping<unknown> = {}
            for (let [key, value] of object) {
                if (deep)
                    value = convertMapToPlainObject(value, deep)

                if (['number', 'string'].includes(typeof key))
                    newObject[String(key)] = value
            }

            return newObject
        }

        if (deep)
            if (isPlainObject(object))
                for (const [key, value] of Object.entries(object))
                    (object as Mapping<unknown>)[key] =
                        convertMapToPlainObject(value, deep)
            else if (Array.isArray(object)) {
                let index = 0

                for (const value of object as Array<unknown>) {
                    (object as Array<unknown>)[index] =
                        convertMapToPlainObject(value, deep)

                    index += 1
                }
            } else if (isSet(object)) {
                const cache: Array<unknown> = []

                for (const value of object) {
                    object.delete(value)

                    cache.push(convertMapToPlainObject(value, deep))
                }

                for (const value of cache)
                    object.add(value)
            }
    }

    return object
}
/**
 * Converts given plain object and all nested found objects to
 * corresponding map.
 * @param object - Object to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given object as map.
 */
export const convertPlainObjectToMap = (
    object: unknown, deep = true
): unknown => {
    if (typeof object === 'object') {
        if (isPlainObject(object)) {
            const newObject = new Map<number | string, unknown>()
            for (const [key, value] of Object.entries(object)) {
                if (deep)
                    (object as Mapping<unknown>)[key] =
                        convertPlainObjectToMap(value, deep) as Primitive

                newObject.set(key, (object as Mapping<unknown>)[key])
            }

            return newObject
        }

        if (deep)
            if (Array.isArray(object)) {
                let index = 0
                for (const value of object as Array<unknown>) {
                    (object as Array<unknown>)[index] =
                        convertPlainObjectToMap(value, deep)

                    index += 1
                }
            } else if (isMap(object))
                for (const [key, value] of object)
                    object.set(key, convertPlainObjectToMap(value, deep))
            else if (isSet(object)) {
                const cache: Array<unknown> = []

                for (const value of object) {
                    object.delete(value)
                    cache.push(convertPlainObjectToMap(value, deep))
                }

                for (const value of cache)
                    object.add(value)
            }
    }

    return object
}
/**
 * Replaces given pattern in each value in given object recursively with
 * given string replacement.
 * @param object - Object to convert substrings in.
 * @param pattern - Regular expression to replace.
 * @param replacement - String to use as replacement for found patterns.
 * @returns Converted object with replaced patterns.
 */
export const convertSubstringInPlainObject = <
    Type extends Mapping<unknown> = PlainObject
>(object: Type, pattern: RegExp | string, replacement: string): Type => {
    for (const [key, value] of Object.entries(object))
        if (isPlainObject(value))
            object[key as keyof Type] =
                convertSubstringInPlainObject(
                    value as unknown as PlainObject, pattern, replacement
                ) as unknown as ValueOf<Type>
        else if (typeof value === 'string')
            (object as unknown as Mapping)[key] =
                (value as unknown as string).replace(pattern, replacement)

    return object
}
/* eslint-disable jsdoc/require-description-complete-sentence */
/**
 * Copies given object (of any type) into optionally given destination.
 * @param source - Object to copy.
 * @param recursionLimit - Specifies how deep we should traverse into given
 * object recursively.
 * @param recursionEndValue - Indicates which value to use for recursion ends.
 * Usually a reference to corresponding source value will be used.
 * @param destination - Target to copy source to.
 * @param cyclic - Indicates whether known sub structures should be copied or
 * referenced (if "true" endless loops can occur if source has cyclic
 * structures).
 * @param knownReferences - Used to avoid traversing loops and not to copy
 * references e.g. to objects not to copy (e.g. symbol polyfills).
 * @param recursionLevel - Internally used to track current recursion level in
 * given source data structure.
 * @returns Value "true" if both objects are equal and "false" otherwise.
 */
export const copy = <Type = unknown>(
    source: Type,
    recursionLimit = -1,
    recursionEndValue: unknown = VALUE_COPY_SYMBOL,
    destination: null | Type = null,
    cyclic = false,
    knownReferences: Array<unknown> = [],
    recursionLevel = 0
): Type => {
    /* eslint-enable jsdoc/require-description-complete-sentence */
    if (isObject(source))
        if (destination) {
            if (source === destination)
                throw new Error(
                    `Can't copy because source and destination are ` +
                    'identical.'
                )

            if (
                !cyclic &&
                ![undefined, null].includes(source as unknown as null)
            ) {
                const index: number = knownReferences.indexOf(source)
                if (index !== -1)
                    return knownReferences[index] as Type

                knownReferences.push(source)
            }

            const copyValue = <V>(value: V): null | V => {
                if (
                    recursionLimit !== -1 &&
                    recursionLimit < recursionLevel + 1
                )
                    return recursionEndValue === VALUE_COPY_SYMBOL ?
                        value :
                        recursionEndValue as null | V

                const result: null | V = copy(
                    value,
                    recursionLimit,
                    recursionEndValue,
                    null,
                    cyclic,
                    knownReferences,
                    recursionLevel + 1
                )

                if (
                    !cyclic &&
                    ![undefined, null].includes(
                        value as unknown as null
                    ) &&
                    typeof value === 'object'
                )
                    knownReferences.push(value)

                return result
            }

            if (Array.isArray(source))
                for (const item of source)
                    (destination as unknown as Array<unknown>)
                        .push(copyValue(item))
            else if (source instanceof Map)
                for (const [key, value] of source)
                    (destination as unknown as Map<unknown, unknown>)
                        .set(key, copyValue(value))
            else if (source instanceof Set)
                for (const value of source)
                    (destination as unknown as Set<unknown>)
                        .add(copyValue(value))
            else
                for (const [key, value] of Object.entries(source))
                    try {
                        (destination as Mapping<ValueOf<Type>>)[key] =
                            copyValue<ValueOf<Type>>(
                                value as ValueOf<Type>
                            ) as ValueOf<Type>
                    } catch (error) {
                        throw new Error(
                            'Failed to copy property value object "' +
                            `${key}": ${represent(error)}`
                        )
                    }
        } else {
            if (Array.isArray(source))
                return copy(
                    source,
                    recursionLimit,
                    recursionEndValue,
                    ([] as unknown as Type),
                    cyclic,
                    knownReferences,
                    recursionLevel
                )

            if (source instanceof Map)
                return copy(
                    source,
                    recursionLimit,
                    recursionEndValue,
                    (new Map() as unknown as Type),
                    cyclic,
                    knownReferences,
                    recursionLevel
                )

            if (source instanceof Set)
                return copy(
                    source,
                    recursionLimit,
                    recursionEndValue,
                    (new Set() as unknown as Type),
                    cyclic,
                    knownReferences,
                    recursionLevel
                )

            if (source instanceof Date)
                return new Date(source.getTime()) as unknown as Type

            if (source instanceof RegExp) {
                const modifier = /[^/]*$/.exec(source.toString())
                destination = new RegExp(
                    source.source,
                    modifier ? modifier[0] : undefined
                ) as unknown as Type
                (destination as unknown as RegExp).lastIndex =
                    source.lastIndex

                return destination
            }

            if (typeof Blob !== 'undefined' && source instanceof Blob)
                return source.slice(0, source.size, source.type) as
                    unknown as
                    Type

            return copy(
                source,
                recursionLimit,
                recursionEndValue,
                ({} as unknown as Type),
                cyclic,
                knownReferences,
                recursionLevel
            )
        }

    return destination || source
}
/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param value - Value to analyze.
 * @returns Name of determined type.
 */
export const determineType = (value?: unknown): string => {
    if ([null, undefined].includes(value as null))
        return String(value)

    const type: string = typeof value

    if (
        ['function', 'object'].includes(type) &&
        'toString' in (value as object)
    ) {
        const stringRepresentation =
            Object.prototype.toString.call(value)

        if (Object.prototype.hasOwnProperty.call(
            CLASS_TO_TYPE_MAPPING, stringRepresentation
        ))
            return CLASS_TO_TYPE_MAPPING[
                stringRepresentation as
                    keyof typeof CLASS_TO_TYPE_MAPPING
            ]
    }

    return type
}
/**
 * Returns true if given items are equal for given property list. If
 * property list isn't set all properties will be checked. All keys which
 * starts with one of the exception prefixes will be omitted.
 * @param firstValue - First object to compare.
 * @param secondValue - Second object to compare.
 * @param givenOptions - Options to define how to compare.
 * @param givenOptions.properties - Property names to check. Check all if
 * "null" is selected (default).
 * @param givenOptions.deep - Recursion depth negative values means
 * infinitely deep (default).
 * @param givenOptions.exceptionPrefixes - Property prefixes which
 * indicates properties to ignore.
 * @param givenOptions.ignoreFunctions - Indicates whether functions have
 * to be identical to interpret is as equal. If set to "true" two functions
 * will be assumed to be equal (default).
 * @param givenOptions.compareBlobs - Indicates whether binary data should
 * be converted to a base64 string to compare their content. Makes this
 * function asynchronous in browsers and potentially takes a lot of
 * resources.
 * @returns Value "true" if both objects are equal and "false" otherwise.
 * If "compareBlobs" is activated, and we're running in a browser like
 * environment and binary data is given, then a promise wrapping the
 * determined boolean values is returned.
 */
export const equals = (
    firstValue: unknown,
    secondValue: unknown,
    givenOptions: Partial<CompareOptions> = {}
): boolean | Promise<boolean | string> | string => {
    const options: CompareOptions = {
        compareBlobs: false,
        deep: -1,
        exceptionPrefixes: [],
        ignoreFunctions: true,
        properties: null,
        returnReasonIfNotEqual: false,
        ...givenOptions
    }

    if (
        options.ignoreFunctions &&
        isFunction(firstValue) && isFunction(secondValue) ||
        firstValue === secondValue ||
        isNotANumber(firstValue) && isNotANumber(secondValue) ||
        firstValue instanceof RegExp && secondValue instanceof RegExp &&
        firstValue.toString() === secondValue.toString() ||
        firstValue instanceof Date && secondValue instanceof Date &&
        (
            isNaN(firstValue.getTime()) &&
            isNaN(secondValue.getTime()) ||
            !isNaN(firstValue.getTime()) &&
            !isNaN(secondValue.getTime()) &&
            firstValue.getTime() === secondValue.getTime()
        ) ||
        options.compareBlobs &&
        eval('typeof Buffer') !== 'undefined' &&
        Object.prototype.hasOwnProperty.call(
            (eval('Buffer') as typeof Buffer), 'isBuffer'
        ) &&
        firstValue instanceof eval('Buffer') &&
        secondValue instanceof eval('Buffer') &&
        (firstValue as Buffer).toString('base64') ===
        (secondValue as Buffer).toString('base64')
    )
        return true

    if (
        options.compareBlobs &&
        typeof Blob !== 'undefined' &&
        firstValue instanceof Blob &&
        secondValue instanceof Blob
    )
        return new Promise<boolean | string>((
            resolve: (value: boolean | string) => void
        ): void => {
            const values: Array<ArrayBuffer | null | string> = []
            for (const value of [firstValue, secondValue]) {
                const fileReader: FileReader = new FileReader()
                fileReader.onload = (event: Event): void => {
                    if (event.target === null)
                        values.push(null)
                    else
                        values.push((event.target as FileReader).result)

                    if (values.length === 2)
                        if (values[0] === values[1])
                            resolve(true)
                        else
                            resolve(options.returnReasonIfNotEqual ?
                                `>>> Blob(${represent(values[0])})  !== ` +
                                `Blob(${represent(values[1])})` :
                                false
                            )
                }

                fileReader.readAsDataURL(value)
            }
        })

    if (
        isPlainObject(firstValue) &&
        isPlainObject(secondValue) &&
        !(firstValue instanceof RegExp || secondValue instanceof RegExp) ||
        Array.isArray(firstValue) &&
        Array.isArray(secondValue) &&
        firstValue.length === secondValue.length ||
        (
            (
                determineType(firstValue) === determineType(secondValue) &&
                ['map', 'set'].includes(determineType(firstValue))
            ) &&
            (firstValue as Set<unknown>).size ===
            (secondValue as Set<unknown>).size
        )
    ) {
        const promises: Array<Promise<boolean | string>> = []
        for (const [first, second] of [
            [firstValue, secondValue],
            [secondValue, firstValue]
        ]) {
            const firstIsArray: boolean = Array.isArray(first)
            if (
                firstIsArray &&
                (
                    !Array.isArray(second) ||
                    (first as Array<unknown>).length !==
                    (second as Array<unknown>).length
                )
            )
                return options.returnReasonIfNotEqual ? '.length' : false

            const firstIsMap = isMap(first)
            if (firstIsMap && (!isMap(second) || first.size !== second.size))
                return options.returnReasonIfNotEqual ? '.size' : false

            const firstIsSet = isSet(first)
            if (firstIsSet && (!isSet(second) || first.size !== second.size))
                return options.returnReasonIfNotEqual ? '.size' : false

            if (firstIsArray) {
                let index = 0
                for (const value of first as Array<unknown>) {
                    if (options.deep !== 0) {
                        const result: (
                            boolean | Promise<boolean | string> | string
                        ) = equals(
                            value,
                            (second as Array<unknown>)[index],
                            {...options, deep: options.deep - 1}
                        )

                        if (!result)
                            return false

                        const currentIndex: number = index

                        const determineResult = (
                            result: boolean | string
                        ): boolean | string =>
                            typeof result === 'string' ?
                                `[${String(currentIndex)}]` +
                                ({'[': '', '>': ' '}[result[0]] ?? '.') +
                                result :
                                result

                        if (Object.prototype.hasOwnProperty.call(
                            result, 'then'
                        ))
                            promises.push((
                                result as Promise<boolean | string>
                            ).then(determineResult))

                        if (typeof result === 'string')
                            return determineResult(result)
                    }

                    index += 1
                }
            } else if (firstIsMap) {
                for (const [key, value] of first)
                    if (options.deep !== 0) {
                        const result: (
                            boolean | Promise<boolean | string> | string
                        ) = equals(
                            value,
                            (second as Map<unknown, unknown>).get(key),
                            {...options, deep: options.deep - 1}
                        )

                        if (!result)
                            return false

                        const determineResult = (
                            result: boolean | string
                        ): boolean | string =>
                            typeof result === 'string' ?
                                `get(${represent(key)})` +
                                ({'[': '', '>': ' '}[result[0]] ?? '.') +
                                result :
                                result

                        if (Object.prototype.hasOwnProperty.call(
                            result, 'then'
                        ))
                            promises.push((
                                result as Promise<boolean | string>
                            ).then(determineResult))

                        if (typeof result === 'string')
                            return determineResult(result)
                    }
            } else if (firstIsSet) {
                for (const value of first)
                    if (options.deep !== 0) {
                        let equal = false
                        const subPromises: Array<Promise<boolean | string>> =
                            []
                        /*
                            NOTE: Check if their exists at least one being
                            equally.
                        */
                        for (const secondValue of second as Set<unknown>) {
                            const result: (
                                boolean | Promise<boolean | string> | string
                            ) = equals(
                                value,
                                secondValue,
                                {...options, deep: options.deep - 1}
                            )

                            if (typeof result === 'boolean') {
                                if (result) {
                                    equal = true
                                    break
                                }
                            } else
                                subPromises.push(
                                    result as Promise<boolean | string>
                                )
                        }


                        const determineResult = (
                            equal: boolean
                        ): boolean | string => equal ?
                            true :
                            options.returnReasonIfNotEqual ?
                                `>>> {-> ${represent(value)} not found}` :
                                false

                        if (equal)
                            /*
                                NOTE: We do not have to wait for promises to be
                                resolved when one match could be found.
                            */
                            continue

                        if (subPromises.length)
                            promises.push(new Promise<boolean | string>((
                                resolve: (value: boolean | string) => void
                            ) => {
                                Promise.all<boolean | string>(
                                    subPromises
                                ).then(
                                    (results: Array<boolean | string>) => {
                                        resolve(determineResult(
                                            results.some((result) => result)
                                        ))
                                    },
                                    () => {
                                        // Do nothing.
                                    }
                                )
                            }))

                        return determineResult(false)
                    }
            } else
                for (const [key, value] of Object.entries(
                    first as Mapping<unknown>
                )) {
                    if (
                        options.properties && !options.properties.includes(key)
                    )
                        break

                    let doBreak = false
                    for (const exceptionPrefix of options.exceptionPrefixes)
                        if (key.startsWith(exceptionPrefix)) {
                            doBreak = true
                            break
                        }

                    if (doBreak)
                        break

                    if (options.deep !== 0) {
                        const result: (
                            boolean | Promise<boolean | string> | string
                        ) = equals(
                            value,
                            (second as Mapping<unknown>)[key],
                            {...options, deep: options.deep - 1}
                        )

                        if (!result)
                            return false

                        const determineResult = (
                            result: boolean | string
                        ): boolean | string =>
                            typeof result === 'string' ?
                                (
                                    key +
                                    ({'[': '', '>': ' '}[result[0]] ?? '.') +
                                    result
                                ) :
                                result

                        if (Object.prototype.hasOwnProperty.call(
                            result, 'then'
                        ))
                            promises.push((
                                result as Promise<boolean | string>
                            ).then(determineResult))

                        if (typeof result === 'string')
                            return determineResult(result)
                    }
                }
        }

        if (promises.length)
            return new Promise<boolean | string>((
                resolve: (value: boolean | string) => void
            ): void => {
                Promise.all(promises).then(
                    (results: Array<boolean | string>): void => {
                        for (const result of results)
                            if (!result || typeof result === 'string') {
                                resolve(result)

                                break
                            }

                        resolve(true)
                    },
                    () => {
                        // Do nothing.
                    }
                )
            })

        return true
    }

    return options.returnReasonIfNotEqual ?
        `>>> ${represent(firstValue)} !== ${represent(secondValue)}` :
        false
}
/**
 * Searches for nested mappings with given indicator key and resolves
 * marked values. Additionally, all objects are wrapped with a proxy to
 * dynamically resolve nested properties.
 * @param object - Given mapping to resolve.
 * @param scope - Scope to use evaluate again.
 * @param selfReferenceName - Name to use for reference to given object.
 * @param expressionIndicatorKey - Indicator property name to mark a value
 * to evaluate.
 * @param executionIndicatorKey - Indicator property name to mark a value
 * to evaluate.
 * @returns Evaluated given mapping.
 */
export const evaluateDynamicData = <Type = unknown>(
    object: null | RecursiveEvaluateable<Type>,
    scope: Mapping<unknown> = {},
    selfReferenceName = 'self',
    expressionIndicatorKey = '__evaluate__',
    executionIndicatorKey = '__execute__'
): Type => {
    if (typeof object !== 'object' || object === null)
        return object as unknown as Type

    if (!(selfReferenceName in scope))
        scope[selfReferenceName] = object

    const evaluateAndThrowError = (
        code: string, type: string = expressionIndicatorKey
    ): unknown => {
        const evaluated: EvaluationResult = evaluate(
            code, scope, type === executionIndicatorKey
        )

        if (evaluated.error)
            throw new Error(evaluated.error)

        return evaluated.result
    }

    const addProxyRecursively = (data: unknown): unknown => {
        if (
            typeof data !== 'object' ||
            data === null ||
            typeof Proxy === 'undefined'
        )
            return data

        for (const [key, givenValue] of Object.entries(data))
            if (key !== '__target__' && isObject(givenValue)) {
                const value: unknown = givenValue

                addProxyRecursively(value)
                // NOTE: We only wrap needed objects for performance reasons.
                if (
                    Object.prototype.hasOwnProperty.call(
                        value, expressionIndicatorKey
                    ) ||
                    Object.prototype.hasOwnProperty.call(
                        value, executionIndicatorKey
                    )
                ) {
                    const backup: Mapping<unknown> =
                        value as Mapping<unknown>
                    (data as Mapping<ProxyType>)[key] = new Proxy(
                        value as Record<string | symbol, unknown>,
                        {
                            get: (
                                target: Record<string | symbol, unknown>,
                                key: string | symbol
                            ): unknown => {
                                if (key === '__target__')
                                    return target

                                if (key === 'hasOwnProperty')
                                    return target[key]

                                /*
                                    NOTE: Very complicated section, do only
                                    changes while having good tests.
                                */
                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (
                                        key === type &&
                                        typeof target[key] === 'string'
                                    )
                                        return resolve(evaluateAndThrowError(
                                            target[key], type
                                        ))

                                const resolvedTarget: unknown = resolve(target)
                                if (key === 'toString') {
                                    const result: Mapping<UnknownFunction> =
                                        evaluateAndThrowError(
                                            resolvedTarget as string
                                        ) as Mapping<UnknownFunction>

                                    return result[key].bind(result)
                                }

                                if (typeof key !== 'string') {
                                    const result = evaluateAndThrowError(
                                        resolvedTarget as string
                                    ) as Record<symbol, unknown>

                                    if ((
                                        result[key] as null | UnknownFunction
                                    )?.bind)
                                        return (
                                            result[key] as UnknownFunction
                                        ).bind(result)

                                    return result[key]
                                }

                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (Object.prototype.hasOwnProperty
                                        .call(target, type)
                                    )
                                        return (evaluateAndThrowError(
                                            resolvedTarget as string, type
                                        ) as Mapping<unknown>)[key]

                                return (
                                    resolvedTarget as Mapping<unknown>
                                )[key]
                                // End of complicated stuff.
                            },
                            ownKeys: (
                                target: Mapping<unknown>
                            ): Array<string> => {
                                for (const type of [
                                    expressionIndicatorKey,
                                    executionIndicatorKey
                                ])
                                    if (Object.prototype.hasOwnProperty
                                        .call(target, type)
                                    )
                                        return Object.getOwnPropertyNames(
                                            resolve(evaluateAndThrowError(
                                                target[type] as string, type
                                            ))
                                        )

                                return Object.getOwnPropertyNames(target)
                            }
                        }
                    ) as ProxyType

                    /*
                        NOTE: Known proxy polyfills does not provide the
                        "__target__" api.
                    */
                    if (!(data as Mapping<ProxyType>)[key].__target__)
                        (data as Mapping<ProxyType>)[key].__target__ =
                            backup
                }
            }

        return data
    }

    const resolve = (data: unknown): unknown => {
        if (isObject(data)) {
            if (isProxy(data)) {
                // NOTE: We have to skip "ownKeys" proxy trap here.
                for (const type of [
                    expressionIndicatorKey, executionIndicatorKey
                ])
                    if (Object.prototype.hasOwnProperty.call(data, type))
                        return (data as Mapping<unknown>)[type]

                data = data.__target__
            }

            for (const [key, value] of Object.entries(
                data as Mapping<unknown>
            )) {
                if ([
                    expressionIndicatorKey, executionIndicatorKey
                ].includes(key)) {
                    if (typeof Proxy === 'undefined')
                        return resolve(evaluateAndThrowError(value as string))

                    return value
                }

                (data as Mapping<unknown>)[key] = resolve(value)
            }
        }

        return data
    }

    scope.resolve = resolve
    const removeProxyRecursively = (data: unknown): unknown => {
        if (isObject(data))
            for (const [key, value] of Object.entries(data))
                if (
                    key !== '__target__' &&
                    value !== null &&
                    ['function', 'undefined'].includes(typeof value)
                ) {
                    const target: unknown =
                        (value as {__target__: unknown}).__target__
                    if (typeof target !== 'undefined')
                        data[key] = target
                    removeProxyRecursively(value)
                }

        return data
    }

    if (Object.prototype.hasOwnProperty.call(object, expressionIndicatorKey))
        return evaluateAndThrowError(object[
            expressionIndicatorKey as keyof RecursiveEvaluateable<Type>
        ]) as Type
    else if (Object.prototype.hasOwnProperty.call(
        object, executionIndicatorKey
    ))
        return evaluateAndThrowError(
            object[executionIndicatorKey as keyof RecursiveEvaluateable<Type>],
            executionIndicatorKey
        ) as Type

    return removeProxyRecursively(resolve(addProxyRecursively(object))) as Type
}
/**
 * Removes properties in objects where a dynamic indicator lives.
 * @param data - Object to traverse recursively.
 * @param expressionIndicators - Property key to remove.
 * @returns Given object with removed properties.
 */
export const removeKeysInEvaluation = <
    T extends Mapping<unknown> = Mapping<unknown>
>(
        data: T,
        expressionIndicators: Array<string> = ['__evaluate__', '__execute__']
    ): T => {
    for (const [key, value] of Object.entries(data))
        if (
            !expressionIndicators.includes(key) &&
            expressionIndicators.some((name: string): boolean =>
                Object.prototype.hasOwnProperty.call(
                    data as unknown as Mapping<unknown>, name
                )
            )
        )
            delete (data as unknown as Mapping<unknown>)[key]
        else if (isPlainObject(value))
            removeKeysInEvaluation(value, expressionIndicators)

    return data
}
/**
 * Extends given target object with given sources object. As target and
 * sources many expandable types are allowed but target and sources have to
 * come from the same type.
 * @param targetOrDeepIndicator - Maybe the target or deep indicator.
 * @param targetOrSource - Target or source object; depending on first
 * argument.
 * @param additionalSources - Source objects to extend into target.
 * @returns Returns given target extended with all given sources.
 */
export const extend = <T = Mapping<unknown>>(
    targetOrDeepIndicator: (
        boolean | typeof IGNORE_NULL_AND_UNDEFINED_SYMBOL | RecursivePartial<T>
    ),
    targetOrSource?: null | RecursivePartial<T>,
    ...additionalSources: Array<RecursivePartial<T>>
): T => {
    let deep: boolean | typeof IGNORE_NULL_AND_UNDEFINED_SYMBOL = false
    let sources: Array<RecursivePartial<T> | null> = additionalSources
    let target: null | RecursivePartial<T> | undefined

    if (
        targetOrDeepIndicator === IGNORE_NULL_AND_UNDEFINED_SYMBOL ||
        typeof targetOrDeepIndicator === 'boolean'
    ) {
        // Handle a deep copy situation and skip deep indicator and target.
        deep = targetOrDeepIndicator as
            boolean | typeof IGNORE_NULL_AND_UNDEFINED_SYMBOL
        target = targetOrSource
    } else {
        target = targetOrDeepIndicator
        if (isObject(targetOrSource))
            sources = [targetOrSource, ...sources]
        else if (targetOrSource !== undefined)
            target = targetOrSource
    }

    const mergeValue = (
        targetValue: ValueOf<T>, value: ValueOf<T>
    ): ValueOf<T> => {
        if (value === targetValue)
            return targetValue

        // Traverse recursively if we're merging plain objects or maps.
        if (deep && value && (isPlainObject(value) || isMap(value))) {
            let clone: ValueOf<T>
            if (isMap(value))
                clone = (targetValue && isMap(targetValue)) ?
                    targetValue :
                    new Map() as unknown as ValueOf<T>
            else
                clone = (targetValue && isPlainObject(targetValue)) ?
                    targetValue :
                    {} as unknown as ValueOf<T>

            return extend<ValueOf<T>>(deep, clone, value)
        }

        return value
    }

    for (const source of sources) {
        let targetType: string = typeof target
        let sourceType: string = typeof source

        if (isMap(target))
            targetType += ' Map'
        if (isMap(source))
            sourceType += ' Map'

        if (targetType === sourceType && target !== source)
            if (isMap(target) && isMap(source))
                for (const [key, value] of source)
                    target.set(
                        key,
                        mergeValue(
                            target.get(key) as ValueOf<T>,
                            value as ValueOf<T>
                        )
                    )
            else if (
                isObject(target) && !Array.isArray(target) &&
                isObject(source) && !Array.isArray(source)
            ) {
                for (const [key, value] of Object.entries(source))
                    if (!(
                        deep === IGNORE_NULL_AND_UNDEFINED_SYMBOL &&
                        [null, undefined].includes(value as null)
                    ))
                        target[key as keyof T] = mergeValue(
                            target[key as keyof T] as ValueOf<T>,
                            value as ValueOf<T>
                        )
            } else
                target = source
        else
            target = source
    }

    return target as T
}
/**
 * Retrieves substructure in given object referenced by given selector
 * path.
 * @param target - Object to search in.
 * @param selector - Selector path.
 * @param skipMissingLevel - Indicates to skip missing level in given path.
 * @param delimiter - Delimiter to delimit given selector components.
 * @returns Determined sub structure of given data or "undefined".
 */
export const getSubstructure = <T = unknown, E = unknown>(
    target: T,
    selector: Selector<T, E>,
    skipMissingLevel = true,
    delimiter = '.'
): E => {
    let path: Array<BaseSelector<T, E>> = []
    for (const component of ([] as Array<BaseSelector<T, E>>).concat(
        selector
    ))
        if (typeof component === 'string') {
            const parts: Array<string> = component.split(delimiter)
            for (const part of parts) {
                if (!part)
                    continue

                const subParts: Array<string> | null =
                    part.match(/(.*?)(\[[0-9]+])/g)
                if (subParts)
                    // NOTE: We add index assignments into path array.
                    for (const subPart of subParts) {
                        const match = /(.*?)(\[[0-9]+])/.exec(subPart)
                        let prefix = ''
                        let indexAssignment= ''
                        if (match) {
                            [, prefix, indexAssignment] = match

                            if (prefix)
                                path.push(prefix)
                        }

                        // Trim bracket padding "[index]" => "index".
                        path.push(indexAssignment.substring(
                            1, indexAssignment.length - 1
                        ))
                    }
                else
                    path.push(part)
            }
        } else
            path = path.concat(component)

    let result: unknown = target
    for (const selector of path)
        if (isObject(result)) {
            if (
                typeof selector === 'string' &&
                Object.prototype.hasOwnProperty.call(result, selector)
            )
                result = result[selector]
            else if (isFunction(selector))
                result = selector(result as unknown as T)
            else if (!skipMissingLevel)
                return undefined as unknown as E
        } else if (!skipMissingLevel)
            return undefined as unknown as E

    return result as E
}
/**
 * Generates a proxy handler which forwards all operations to given object
 * as there wouldn't be a proxy.
 * @param target - Object to proxy.
 * @param methodNames - Mapping of operand name to object specific method
 * name.
 * @returns Determined proxy handler.
 */
export const getProxyHandler = <T = unknown>(
    target: T, methodNames: Mapping = {}
): ProxyHandler<T> => {
    methodNames = {
        delete: '[]',
        get: '[]',
        has: '[]',
        set: '[]',
        ...methodNames
    }

    return {
        deleteProperty: (_targetObject: T, key: string | symbol): boolean => {
            if (methodNames.delete === '[]' && typeof key === 'string')
                delete target[key as keyof T]
            else
                return (
                    target[methodNames.delete as keyof T] as
                        unknown as
                        (key: string | symbol) => boolean
                )(key)

            return true
        },
        get: (_targetObject: T, key: string | symbol): unknown => {
            if (methodNames.get === '[]' && typeof key === 'string')
                return target[key as keyof T]

            return (
                target[methodNames.get as keyof T] as
                    unknown as
                    (key: string | symbol) => unknown
            )(key)
        },
        has: (_targetObject: T, key: string | symbol): boolean => {
            if (methodNames.has === '[]')
                return key in (target as object)

            return (
                target[methodNames.has as keyof T] as
                    unknown as
                    (key: string | symbol) => boolean
            )(key)
        },
        set: (
            _targetObject: T, key: string | symbol, value: unknown
        ): boolean => {
            if (methodNames.set === '[]' && typeof key === 'string')
                target[key as keyof T] = value as T[keyof T]
            else
                return (target[methodNames.set as keyof T] as
                        unknown as
                        (key: string | symbol, value: unknown) => boolean
                )(key, value)

            return true
        }
    }
}
/**
 * Slices all properties from given object which does not match provided
 * object mask. Items can be explicitly whitelisted via "include" mask
 * configuration or black listed via "exclude" mask configuration.
 * @param object - Object to slice.
 * @param maskConfiguration - Mask configuration.
 * @returns Given but sliced object. If (nested) object will be modified a
 * flat copy of that object will be returned.
 */
export const mask = <Type extends Mapping<unknown> = Mapping<unknown>>(
    object: Type, maskConfiguration: ObjectMaskConfiguration
): RecursivePartial<Type> => {
    maskConfiguration = {exclude: false, include: true, ...maskConfiguration}

    if (
        maskConfiguration.exclude === true ||
        Array.isArray(maskConfiguration.exclude) &&
        maskConfiguration.exclude.length === 0 ||
        maskConfiguration.include === false ||
        typeof object !== 'object'
    )
        return {}

    const exclude: NormalizedObjectMask =
        Array.isArray(maskConfiguration.exclude) ?
            maskConfiguration.exclude.reduce(
                (mask, key) => ({...mask, [key]: true}),
                {}
            ) as NormalizedObjectMask :
            maskConfiguration.exclude as NormalizedObjectMask
    const include: NormalizedObjectMask =
        Array.isArray(maskConfiguration.include) ?
            maskConfiguration.include.reduce(
                (mask, key) => ({...mask, [key]: true}),
                {}
            ) as NormalizedObjectMask :
            maskConfiguration.include as NormalizedObjectMask

    let result: Partial<Type> = {} as Partial<Type>
    if (isPlainObject(include)) {
        for (const [key, value] of Object.entries(include))
            if (Object.prototype.hasOwnProperty.call(object, key))
                if (value === true)
                    result[key as keyof Type] = object[key as keyof Type]
                else if (
                    (
                        isPlainObject(value) ||
                        Array.isArray(value) && value.length
                    ) &&
                    typeof object[key as keyof Type] === 'object'
                )
                    (result as Mapping<Mapping<unknown>>)[key] = mask(
                        (object as Mapping<Mapping<unknown>>)[key],
                        {include: value}
                    )
    } else
        // In this branch "mask.include === true" holds.
        result = object

    if (isPlainObject(exclude)) {
        let useCopy = false
        const copy: RecursivePartial<Type> = {...result}

        for (const [key, value] of Object.entries(exclude))
            if (Object.prototype.hasOwnProperty.call(copy, key))
                if (value === true) {
                    useCopy = true

                    delete copy[key as keyof Type]
                } else if (
                    (
                        isPlainObject(value) ||
                        Array.isArray(value) && value.length
                    ) &&
                    typeof copy[key as keyof Type] === 'object'
                ) {
                    const current: ValueOf<Type> =
                        copy[key as keyof Type] as ValueOf<Type>

                    ;(copy as Mapping<Mapping<unknown>>)[key] = mask(
                        (copy as Mapping<Mapping<unknown>>)[key],
                        {exclude: value}
                    )

                    if (
                        copy[key as keyof Type] as ValueOf<Type> !==
                        current
                    )
                        useCopy = true
                }

        if (useCopy)
            result = copy
    }

    return result
}
/**
 * Modifies given target corresponding to given source and removes source
 * modification infos.
 * @param target - Object to modify.
 * @param source - Source object to load modifications from.
 * @param removeIndicatorKey - Indicator property name or value to mark a
 * value to remove from object or list.
 * @param prependIndicatorKey - Indicator property name to mark a value to
 * prepend to target list.
 * @param appendIndicatorKey - Indicator property name to mark a value to
 * append to target list.
 * @param positionPrefix - Indicates a prefix to use a value on given
 * position to add or remove.
 * @param positionSuffix - Indicates a suffix to use a value on given
 * position to add or remove.
 * @param parentSource - Source context to remove modification info from
 * (usually only needed internally).
 * @param parentKey - Source key in given source context to remove
 * modification info from (usually only needed internally).
 * @returns Given target modified with given source.
 */
export const modifyObject = <T = unknown>(
    target: T,
    source: unknown,
    removeIndicatorKey = '__remove__',
    prependIndicatorKey = '__prepend__',
    appendIndicatorKey = '__append__',
    positionPrefix = '__',
    positionSuffix = '__',
    parentSource: unknown = null,
    parentKey: unknown = null
): T => {
    if (isMap(source) && isMap(target)) {
        for (const [key, value] of source)
            if (target.has(key))
                modifyObject<ValueOf<T>>(
                    target.get(key) as ValueOf<T>,
                    value as Map<unknown, unknown> | Mapping<unknown> | null,
                    removeIndicatorKey,
                    prependIndicatorKey,
                    appendIndicatorKey,
                    positionPrefix,
                    positionSuffix,
                    source,
                    key
                )
    } else if (isObject(source) && isObject(target))
        for (const [key, sourceValue] of Object.entries(source)) {
            let index = NaN
            if (
                Array.isArray(target) &&
                key.startsWith(positionPrefix) &&
                key.endsWith(positionSuffix)
            ) {
                index = parseInt(
                    key.substring(
                        positionPrefix.length,
                        key.length -
                        positionSuffix.length
                    ),
                    10
                )
                if (index < 0 || index >= target.length)
                    index = NaN
            }

            if (
                [
                    removeIndicatorKey,
                    prependIndicatorKey,
                    appendIndicatorKey
                ].includes(key) ||
                !isNaN(index)
            ) {
                if (Array.isArray(target))
                    if (key === removeIndicatorKey) {
                        const values: Array<unknown> =
                            ([] as Array<unknown>).concat(sourceValue)
                        for (const value of values)
                            if (
                                typeof value === 'string' &&
                                value.startsWith(positionPrefix) &&
                                value.endsWith(positionSuffix)
                            )
                                target.splice(
                                    parseInt(
                                        value.substring(
                                            positionPrefix.length,
                                            value.length -
                                            positionSuffix.length
                                        ),
                                        10
                                    ),
                                    1
                                )
                            else if (target.includes(value))
                                target.splice(target.indexOf(value), 1)
                            else if (
                                typeof value === 'number' &&
                                value < target.length
                            )
                                target.splice(value, 1)
                    } else if (key === appendIndicatorKey)
                        target = target.concat(sourceValue) as unknown as T
                    else if (key === prependIndicatorKey)
                        target = ([] as Array<unknown>)
                            .concat(sourceValue)
                            .concat(target) as unknown as T
                    else if (isObject(target[index]) && isObject(sourceValue))
                        extend(
                            true,
                            modifyObject<RecursivePartial<ValueOf<T>>>(
                                target[index] as
                                    RecursivePartial<ValueOf<T>>,
                                sourceValue as
                                    RecursivePartial<ValueOf<T>>,
                                removeIndicatorKey,
                                prependIndicatorKey,
                                appendIndicatorKey,
                                positionPrefix,
                                positionSuffix
                            ),
                            target[index] as
                                RecursivePartial<ValueOf<T>>,
                            sourceValue as RecursivePartial<ValueOf<T>>
                        )
                    else
                        target[index] = sourceValue as ValueOf<T>
                else if (key === removeIndicatorKey)
                    for (const value of ([] as Array<unknown>).concat(
                        sourceValue
                    ))
                        if (
                            typeof value === 'string' &&
                            Object.prototype.hasOwnProperty.call(
                                target, value
                            )
                        )
                            delete (
                                target as unknown as Mapping<unknown>
                            )[value]
                delete source[key]

                if (parentSource && typeof parentKey === 'string')
                    delete (
                        parentSource as Mapping<unknown>
                    )[parentKey]
            } else if (
                target !== null &&
                Object.prototype.hasOwnProperty.call(target, key)
            )
                (target as unknown as Mapping<unknown>)[key] =
                    modifyObject<ValueOf<T>>(
                        (target as unknown as Mapping<ValueOf<T>>)[key],
                        sourceValue,
                        removeIndicatorKey,
                        prependIndicatorKey,
                        appendIndicatorKey,
                        positionPrefix,
                        positionSuffix,
                        source,
                        key
                    )
        }

    return target
}
/**
 * Removes given key from given object recursively.
 * @param object - Object to process.
 * @param keys - List of keys to remove.
 * @returns Processed given object.
 */
export const removeKeyPrefixes = <T>(
    object: T, keys: Array<string> | string = '#'
): T => {
    const resolvedKeys: Array<string> = ([] as Array<string>).concat(keys)

    if (Array.isArray(object)) {
        let index = 0
        for (const subObject of object.slice()) {
            let skip = false
            if (typeof subObject === 'string') {
                for (const key of resolvedKeys)
                    if (subObject.startsWith(`${key}:`)) {
                        (object as Array<string>).splice(index, 1)

                        skip = true
                        break
                    }

                if (skip)
                    continue
            }

            (object as Array<unknown>)[index] =
                removeKeyPrefixes(subObject, resolvedKeys)

            index += 1
        }
    } else if (isSet(object))
        for (const subObject of new Set(object)) {
            let skip = false

            if (typeof subObject === 'string') {
                for (const key of resolvedKeys)
                    if (subObject.startsWith(`${key}:`)) {
                        object.delete(subObject)
                        skip = true
                        break
                    }

                if (skip)
                    continue
            }

            removeKeyPrefixes(subObject, resolvedKeys)
        }
    else if (isMap(object))
        for (const [key, subObject] of new Map(object)) {
            let skip = false

            if (typeof key === 'string') {
                for (const resolvedKey of resolvedKeys) {
                    const escapedKey = escapeRegularExpressions(resolvedKey)
                    if (new RegExp(`^${escapedKey}[0-9]*$`).test(key)) {
                        object.delete(key)
                        skip = true
                        break
                    }
                }

                if (skip)
                    continue
            }

            object.set(key, removeKeyPrefixes(subObject, resolvedKeys))
        }
    else if (isObject(object))
        for (const [key, value] of Object.entries(Object.assign(
            {}, object
        ))) {
            let skip = false

            for (const resolvedKey of resolvedKeys) {
                const escapedKey: string = escapeRegularExpressions(resolvedKey)

                if (new RegExp(`^${escapedKey}[0-9]*$`).test(key)) {
                    delete (object as unknown as Mapping<unknown>)[key]
                    skip = true
                    break
                }
            }

            if (skip)
                continue

            ;(object as unknown as Mapping<unknown>)[key] =
                removeKeyPrefixes(value, resolvedKeys)
        }

    return object
}
/**
 * Represents given object as formatted string.
 * @param object - Object to represent.
 * @param indention - String (usually whitespaces) to use as indention.
 * @param initialIndention - String (usually whitespaces) to use as
 * additional indention for the first object traversing level.
 * @param maximumNumberOfLevelsReachedIdentifier - Replacement for objects
 * which are out of specified bounds to traverse.
 * @param numberOfLevels - Specifies number of levels to traverse given
 * data structure.
 * @returns Representation string.
 */
export const represent = (
    object: unknown,
    indention = '    ',
    initialIndention = '',
    maximumNumberOfLevelsReachedIdentifier: number | string =
    '__maximum_number_of_levels_reached__',
    numberOfLevels = 8
): string => {
    if (numberOfLevels === 0)
        return String(maximumNumberOfLevelsReachedIdentifier)

    if (object === null)
        return 'null'

    if (object === undefined)
        return 'undefined'

    if (typeof object === 'string')
        return `"${object.replace(/\n/g, `\n${initialIndention}`)}"`

    if (isNumeric(object) || typeof object === 'boolean')
        return String(object)

    if (object instanceof Date)
        return object.toISOString()

    if (Array.isArray(object)) {
        let result = '['

        let firstSeen = false
        for (const item of object) {
            if (firstSeen)
                result += ','

            result +=
                `\n${initialIndention}${indention}` +
                represent(
                    item,
                    indention,
                    `${initialIndention}${indention}`,
                    maximumNumberOfLevelsReachedIdentifier,
                    numberOfLevels - 1
                )

            firstSeen = true
        }

        if (firstSeen)
            result += `\n${initialIndention}`

        result += ']'

        return result
    }

    if (isMap(object)) {
        let result = ''

        let firstSeen = false
        for (const [key, item] of object) {
            if (firstSeen)
                result += `,\n${initialIndention}${indention}`

            result +=
                represent(
                    key,
                    indention,
                    `${initialIndention}${indention}`,
                    maximumNumberOfLevelsReachedIdentifier,
                    numberOfLevels - 1
                ) +
                ' -> ' +
                represent(
                    item,
                    indention,
                    `${initialIndention}${indention}`,
                    maximumNumberOfLevelsReachedIdentifier,
                    numberOfLevels - 1
                )

            firstSeen = true
        }

        if (!firstSeen)
            result = 'EmptyMap'

        return result
    }

    if (isSet(object)) {
        let result = '{'

        let firstSeen = false
        for (const item of object) {
            if (firstSeen)
                result += ','

            result +=
                `\n${initialIndention}${indention}` +
                represent(
                    item,
                    indention,
                    `${initialIndention}${indention}`,
                    maximumNumberOfLevelsReachedIdentifier,
                    numberOfLevels - 1
                )

            firstSeen = true
        }

        if (firstSeen)
            result += `\n${initialIndention}}`
        else
            result = 'EmptySet'

        return result
    }

    if (isFunction(object))
        return '__function__'

    let result = '{'
    const keys: Array<string> = Object.getOwnPropertyNames(object).sort()
    let firstSeen = false
    for (const key of keys) {
        if (firstSeen)
            result += ','

        result +=
            `\n${initialIndention}${indention}${key}: ` +
            represent(
                (object as Mapping<unknown>)[key],
                indention,
                `${initialIndention}${indention}`,
                maximumNumberOfLevelsReachedIdentifier,
                numberOfLevels - 1
            )

        firstSeen = true
    }

    if (firstSeen)
        result += `\n${initialIndention}`

    result += '}'

    return result
}
/**
 * Sort given objects keys.
 * @param object - Object which keys should be sorted.
 * @returns Sorted list of given keys.
 */
export const sort = (object: unknown): Array<unknown> => {
    const keys: Array<unknown> = []

    if (Array.isArray(object))
        for (let index = 0; index < object.length; index++)
            keys.push(index)
    else if (typeof object === 'object')
        if (isMap(object))
            for (const keyValuePair of object)
                keys.push(keyValuePair[0])
        else if (object !== null)
            for (const key of Object.keys(object))
                keys.push(key)

    return keys.sort()
}
/**
 * Removes a proxy from given data structure recursively.
 * @param object - Object to proxy.
 * @param seenObjects - Tracks all already processed objects to avoid
 * endless loops (usually only needed for internal purpose).
 * @returns Returns given object unwrapped from a dynamic proxy.
 */
export const unwrapProxy = <T = unknown>(
    object: ProxyType<T> | T, seenObjects: Set<unknown> = new Set<unknown>()
): T => {
    if (isObject(object)) {
        if (seenObjects.has(object))
            return object

        try {
            if (isFunction(object.__revoke__)) {
                if (isProxy(object))
                    object = object.__target__

                ;(object as unknown as {__revoke__: () => void}).__revoke__()
            }
        } catch {
            return object
        } finally {
            seenObjects.add(object)
        }

        if (Array.isArray(object)) {
            let index = 0
            for (const value of object) {
                object[index] = unwrapProxy(value, seenObjects)

                index += 1
            }
        } else if (isMap(object))
            for (const [key, value] of object)
                object.set(key, unwrapProxy(value, seenObjects))
        else if (isSet(object)) {
            const cache: Array<unknown> = []

            for (const value of object) {
                object.delete(value)
                cache.push(unwrapProxy(value, seenObjects))
            }

            for (const value of cache)
                object.add(value)
        } else
            for (const [key, value] of Object.entries(
                object as unknown as object
            ))
                object[key as keyof T] =
                    unwrapProxy(value, seenObjects) as ValueOf<T>
    }

    return object
}

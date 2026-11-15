import type { CompareOptions, EvaluateDynamicDataOptions, GetterFunction, Mapping, ObjectMaskConfiguration, PlainObject, ProxyHandler, ProxyType, RecursiveAsyncEvaluateable, RecursiveEvaluateable, RecursivePartial, SetterFunction } from './type';
import { IGNORE_NULL_AND_UNDEFINED_SYMBOL } from './constants';
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
export declare const addDynamicGetterAndSetter: <T = unknown>(object: T, getterWrapper?: GetterFunction | null, setterWrapper?: null | SetterFunction, methodNames?: Mapping, deep?: boolean, typesToExtend?: Array<unknown>) => ProxyType<T> | T;
/**
 * Converts given object into its serialized JSON representation by
 * replacing circular references with a given provided value.
 *
 * This method traverses given object recursively and tracks of seen and
 * already serialized structures to reuse generated strings or mark a
 * circular reference.
 * @param object - Object to serialize.
 * @param determineCircularReferenceValue - Callback to create a fallback
 * value depending on given redundant value.
 * @param numberOfSpaces - Number of spaces to use for string formatting.
 * @returns The formatted JSON string.
 */
export declare const convertCircularObjectToJSON: (object: unknown, determineCircularReferenceValue?: ((serializedValue: unknown, key: null | string, value: unknown, seenObjects: Map<unknown, unknown>) => unknown), numberOfSpaces?: number) => ReturnType<typeof JSON.stringify> | undefined;
/**
 * Converts given map and all nested found maps objects to corresponding
 * object.
 * @param object - Map to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given map as object.
 */
export declare const convertMapToPlainObject: (object: unknown, deep?: boolean) => unknown;
/**
 * Converts given plain object and all nested found objects to
 * corresponding map.
 * @param object - Object to convert to.
 * @param deep - Indicates whether to perform a recursive conversion.
 * @returns Given object as map.
 */
export declare const convertPlainObjectToMap: (object: unknown, deep?: boolean) => unknown;
/**
 * Replaces given pattern in each value in given object recursively with
 * given string replacement.
 * @param object - Object to convert substrings in.
 * @param pattern - Regular expression to replace.
 * @param replacement - String to use as replacement for found patterns.
 * @returns Converted object with replaced patterns.
 */
export declare const convertSubstringInPlainObject: <Type extends Mapping<unknown> = PlainObject>(object: Type, pattern: RegExp | string, replacement: string) => Type;
/**
 * Copies given object (of any type) into optionally given destination.
 * @param source - Object to copy.
 * @param copyBlobs - Determines whether to copy blobs as well.
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
export declare const copy: <Type = unknown>(source: Type, copyBlobs?: boolean, recursionLimit?: number, recursionEndValue?: unknown, destination?: null | Type, cyclic?: boolean, knownReferences?: Array<unknown>, recursionLevel?: number) => Type;
/**
 * Determine the internal JavaScript [[Class]] of an object.
 * @param value - Value to analyze.
 * @returns Name of determined type.
 */
export declare const determineType: (value?: unknown) => string;
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
export declare const equals: (firstValue: unknown, secondValue: unknown, givenOptions?: Partial<CompareOptions>) => boolean | Promise<boolean | string> | string;
/**
 * Searches for indicating keys and replaces that data with corresponding
 * evaluated and promise resolved value.
 * @param data - Given mapping to resolve.
 * @param givenOptions - Options to configure evaluation.
 * @param givenOptions.scope - Scope to use evaluate again.
 * @param givenOptions.selfReferenceName - Name to use for reference to given
 * object.
 * @param givenOptions.expressionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @param givenOptions.executionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @returns Evaluated given mapping.
 */
export declare const evaluateAsyncDynamicData: <Type = unknown>(data: null | RecursiveAsyncEvaluateable<Type>, givenOptions?: Partial<EvaluateDynamicDataOptions>) => Promise<Type>;
/**
 * Wraps given data structure into proxies recursively to evaluate and resolve
 * each get request to data having an object with indicating keys and replaces
 * that object with corresponding evaluated values. All nested objects are
 * wrapped with a proxy to resolve chains of referencing expressions as well.
 * @param object - Given mapping to resolve.
 * @param givenOptions - Options to configure evaluation.
 * @param givenOptions.scope - Scope to use evaluate again.
 * @param givenOptions.selfReferenceName - Name to use for reference to given
 * object.
 * @param givenOptions.expressionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @param givenOptions.executionIndicatorKey - Indicator property name to mark
 * a value to evaluate.
 * @returns Evaluated given mapping.
 */
export declare const evaluateDynamicData: <Type = unknown>(object: null | RecursiveEvaluateable<Type>, givenOptions?: Partial<EvaluateDynamicDataOptions>) => Type;
/**
 * Removes properties in objects where a dynamic indicator lives.
 * @param data - Object to traverse recursively.
 * @param expressionIndicators - Property key to remove.
 * @returns Given object with removed properties.
 */
export declare const removeKeysInEvaluation: <T extends Mapping<unknown> = Mapping<unknown>>(data: T, expressionIndicators?: Array<string>) => T;
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
export declare const extend: <T = Mapping<unknown>>(targetOrDeepIndicator: (boolean | typeof IGNORE_NULL_AND_UNDEFINED_SYMBOL | RecursivePartial<T>), targetOrSource?: null | RecursivePartial<T>, ...additionalSources: Array<RecursivePartial<T>>) => T;
/**
 * Generates a proxy handler which forwards all operations to given object
 * as there wouldn't be a proxy.
 * @param target - Object to proxy.
 * @param methodNames - Mapping of operand name to object specific method
 * name.
 * @returns Determined proxy handler.
 */
export declare const getProxyHandler: <T = unknown>(target: T, methodNames?: Mapping) => ProxyHandler<T>;
/**
 * Slices all properties from given object which does not match provided
 * object mask. Items can be explicitly whitelisted via "include" mask
 * configuration or black listed via "exclude" mask configuration.
 * @param object - Object to slice.
 * @param maskConfiguration - Mask configuration.
 * @returns Given but sliced object. If (nested) object will be modified a
 * flat copy of that object will be returned.
 */
export declare const mask: <Type extends Mapping<unknown> = Mapping<unknown>>(object: Type, maskConfiguration: ObjectMaskConfiguration) => RecursivePartial<Type>;
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
export declare const modifyObject: <T = unknown>(target: T, source: unknown, removeIndicatorKey?: string, prependIndicatorKey?: string, appendIndicatorKey?: string, positionPrefix?: string, positionSuffix?: string, parentSource?: unknown, parentKey?: unknown) => T;
/**
 * Removes given key from given object recursively.
 * @param object - Object to process.
 * @param keys - List of keys to remove.
 * @returns Processed given object.
 */
export declare const removeKeyPrefixes: <T>(object: T, keys?: Array<string> | string) => T;
/**
 * Represents given object as formatted string.
 * @param object - Object to represent.
 * @param maximumLengthOfLists - Maximum number of array item to render.
 * @param indention - String (usually whitespaces) to use as indention.
 * @param initialIndention - String (usually whitespaces) to use as
 * additional indention for the first object traversing level.
 * @param maximumNumberOfLevelsReachedIdentifier - Replacement for objects
 * which are out of specified bounds to traverse.
 * @param numberOfLevels - Specifies number of levels to traverse given
 * data structure.
 * @returns Representation string.
 */
export declare const represent: (object: unknown, maximumLengthOfLists?: number, indention?: string, initialIndention?: string, maximumNumberOfLevelsReachedIdentifier?: number | string, numberOfLevels?: number) => string;
/**
 * Sort given objects keys.
 * @param object - Object which keys should be sorted.
 * @returns Sorted list of given keys.
 */
export declare const sort: (object: unknown) => Array<unknown>;
/**
 * Removes a proxy from given data structure recursively.
 * @param object - Object to proxy.
 * @param seenObjects - Tracks all already processed objects to avoid
 * endless loops (usually only needed for internal purpose).
 * @returns Returns given object unwrapped from a dynamic proxy.
 */
export declare const unwrapProxy: <T = unknown>(object: ProxyType<T> | T, seenObjects?: Set<unknown>) => T;

import type { CompilationResult, CompileExpressionOptions, EvaluateExpressionOptions, EvaluationResult, Mapping, PlainObject, StringMarkOptions, QueryParameters } from './type';
export declare const KNOWN_DISALLOWED_VARIABLE_NAMES_BUT_OBJECT_KEYS: string[];
export declare const POLYFILL_TEMPLATE_STRINGS: {
    value: boolean;
};
export declare const ALLOWED_VARIABLE_SYMBOLS = "0-9a-zA-Z_$";
export declare const ALLOWED_STARTING_VARIABLE_SYMBOLS = "a-zA-Z_$";
export declare const FIX_ENCODING_ERROR_MAPPING: readonly [readonly ['Ã\\x84', 'Ä'], readonly ['Ã\\x96', 'Ö'], readonly ['Ã\\x9c', 'Ü'], readonly ['Ã¤', 'ä'], readonly ['Ã¶', 'ö'], readonly ['Ã¼', 'ü'], readonly ['\\x96', '-'], readonly ['Ã©', 'é'], readonly ['Ã¨', 'e'], readonly ['Ã´', 'o'], readonly ['Ã ', 'á'], readonly ['Ã¸', 'ø'], readonly ['Ã\\x9f', 'ß'], readonly ['Ã', 'ß']];
export declare const AsyncFunction: any;
/**
 * Appends a path selector to the given path if there isn't one yet.
 * @param path - The path for appending a selector.
 * @param pathSeparator - The selector for appending to a path.
 * @returns The appended path.
 */
export declare const addSeparatorToPath: (path: string, pathSeparator?: string) => string;
/**
 * This method is intended for encoding *key* or *value* parts of a query
 * component. We need a custom method because "encodeURIComponent()" is too
 * aggressive and encodes stuff that doesn't have to be encoded per
 * "http://tools.ietf.org/html/rfc3986:".
 * @param url - URL to encode.
 * @param encodeSpaces - Indicates whether given url should encode
 * whitespaces as "+" or "%20".
 * @returns Encoded given url.
 */
export declare const encodeURIComponentExtended: (url: string, encodeSpaces?: boolean) => string;
/**
 * Extracts domain name from given url. If no explicit domain name given
 * current domain name will be assumed. If no parameter is given, the current
 * domain name will be determined.
 * @param url - The url to extract domain from.
 * @param fallback - The fallback host name if no one exits in given url
 * (default is current hostname).
 * @returns Extracted domain.
 */
export declare const getDomainName: (url?: string, fallback?: string) => string;
/**
 * Extracts port number from given url. If no explicit port number is given
 * and no fallback is defined, the current port number will be assumed for local
 * links. For external links 80 will be assumed for http protocols and 443
 * for https protocols.
 * @param url - The url to extract port from.
 * @param fallback - Fallback port number if no explicit one was found.
 * Default is derived from the current protocol name.
 * @returns Extracted port number.
 */
export declare const getPortNumber: (url?: string, fallback?: null | number) => null | number;
/**
 * Extracts protocol name from given url. If no explicit url is given,
 * the current protocol will be assumed. If no parameter is given, the current
 * protocol number will be determined.
 * @param url - The url to extract protocol from.
 * @param fallback - Fallback port to use if no protocol exists in given
 * url (default is current protocol).
 * @returns Extracted protocol.
 */
export declare const getProtocolName: (url?: string, fallback?: string) => string;
/**
 * Read a page's GET URL variables and return them as an associative array
 * and preserves ordering.
 * @param keyToGet - If provided the corresponding value for a given key is
 * returned or full object otherwise.
 * @param allowDuplicates - Indicates whether to return arrays of values or
 * single values. If set to "false" (default) last values will overwrite
 * preceding values.
 * @param givenInput - An alternative input to the url search parameter. If
 * "#" is given, the complete current hashtag will be interpreted as url and
 * search parameter will be extracted from there. If "&" is given a classical
 * search parameter, and hash parameter will be taken in an account. If a
 * search string is given, this will be analyzed. The default is to take a
 * given search part into account.
 * @param subDelimiter - Defines which sequence indicates the start of
 * parameter in a hash part of the url.
 * @param hashedPathIndicator - If defined and given hash starts with this
 * indicator, given hash will be interpreted as a path containing search and
 * hash parts.
 * @param givenSearch - Search part to take into account defaults to
 * current url search part.
 * @param givenHash - Hash part to take into account defaults to current
 * url hash part.
 * @returns Returns the current get array or requested value. If the requested
 * key doesn't exist, "undefined" is returned.
 */
export declare const getURLParameter: (keyToGet?: null | string, allowDuplicates?: boolean, givenInput?: null | string, subDelimiter?: string, hashedPathIndicator?: string, givenSearch?: null | string, givenHash?: null | string) => Array<string> | null | QueryParameters | string;
/**
 * Checks if a given path has given path prefix.
 * @param prefix - Path prefix to search for.
 * @param path - Path to search in.
 * @param separator - Delimiter to use in a path (default is the posix
 * conform slash).
 * @returns Value "true" if given prefix occurs and "false" otherwise.
 */
export declare const hasPathPrefix: (prefix?: unknown, path?: string, separator?: string) => boolean;
/**
 * Normalized given website url.
 * @param givenURL - Uniform resource locator to normalize.
 * @returns Normalized result.
 */
export declare const normalizeURL: (givenURL: unknown) => string;
/**
 * Represents given website url.
 * @param url - Uniform resource locator to represent.
 * @returns Represented result.
 */
export declare const representURL: (url: unknown) => string;
/**
 * Checks if given url points to another "service" than the second given url.
 * If no second given url is provided, the current url will be assumed.
 * @param url - URL to check against second url.
 * @param referenceURL - URL to check against first url.
 * @returns Returns "true" if given first url has same domain as given
 * second (or current).
 */
export declare const serviceURLEquals: (url: string, referenceURL?: string) => boolean;
/**
 * Converts a camel-cased string to its delimited string version.
 * @param value - The string to format.
 * @param delimiter - Defines delimiter string.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @returns The formatted string.
 */
export declare const camelCaseToDelimited: (value: string, delimiter?: string, abbreviations?: Array<string> | null) => string;
/**
 * Converts a string to its capitalized representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */
export declare const capitalize: (string: string) => string;
/**
 * Compiles a given string as an expression with given scope names.
 * @param expression - The string to interpret.
 * @param givenOptions - Expression options.
 * @param givenOptions.scope - Scope to extract names from.
 * @param givenOptions.execute - Indicates whether to execute or evaluate.
 * @param givenOptions.removeGlobalScope - Indicates whether to shadow global
 * scope.
 * @param givenOptions.binding - Object to apply as "this" in evaluation scope.
 * @param givenOptions.async - Indicates whether to compile an async function.
 * @returns Object of prepared scope name mappings and compiled function or
 * error string message if given expression couldn't be compiled.
 */
export declare const compile: <T = string, N extends Array<string> = Array<string>>(expression: string, givenOptions?: Partial<CompileExpressionOptions<N>>) => CompilationResult<T, N>;
/**
 * Evaluates a given string as an expression against a given scope.
 * @param expression - The string to interpret.
 * @param givenOptions - Expression options.
 * @param givenOptions.scope - Scope to extract names from.
 * @param givenOptions.execute - Indicates whether to execute or evaluate.
 * @param givenOptions.removeGlobalScope - Indicates whether to shadow global
 * scope.
 * @param givenOptions.binding - Object to apply as "this" in evaluation scope.
 * @param givenOptions.async - Indicates whether to compile an async function.
 * @returns Object with an error message during parsing / running or result.
 */
export declare const evaluate: <T = string, S extends object = object>(expression: string, givenOptions?: Partial<EvaluateExpressionOptions<S>>) => EvaluationResult<T>;
/**
 * Evaluates a given string as an expression against a given scope. Does same
 * as "evaluate" but throws an exception if an error occurs and returns the
 * evaluated value instead of an object with error and result.
 * @param expression - The string to interpret.
 * @param options - Expression options.
 * @param options.scope - Scope to extract names from.
 * @param options.execute - Indicates whether to execute or evaluate.
 * @param options.removeGlobalScope - Indicates whether to shadow global scope.
 * @param options.binding - Object to apply as "this" in evaluation scope.
 * @param options.async - Indicates whether to compile an async function.
 * @returns Object with an error message during parsing / running or result.
 */
export declare const evaluateOrThrowError: <Result = string, Scope extends object = object>(expression: string, options?: Partial<EvaluateExpressionOptions<Scope>>) => Result;
/**
 * Compresses given style attribute value.
 * @param styleValue - Style value to compress.
 * @returns The compressed value.
 */
export declare const compressStyleValue: (styleValue: string) => string;
/**
 * Translates a given name into a valid JavaScript one.
 * @param name - Name to convert.
 * @returns Converted name is returned.
 */
export declare const convertToValidVariableName: (name: string) => string;
/**
 * Decodes all html symbols in text nodes in a given html string.
 * @param htmlString - HTML string to decode.
 * @returns Decoded html string.
 */
export declare const decodeHTMLEntities: (htmlString: string) => null | string;
/**
 * Converts a delimited string to its camel case representation.
 * @param value - The string to format.
 * @param delimiter - Delimiter string to use.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @param preserveWrongFormattedAbbreviations - If set to "True" wrong
 * formatted camel case abbreviations will be ignored.
 * @param removeMultipleDelimiter - Indicates whether a series of delimiter
 * should be consolidated.
 * @returns The formatted string.
 */
export declare const delimitedToCamelCase: (value: string, delimiter?: string, abbreviations?: Array<string> | null, preserveWrongFormattedAbbreviations?: boolean, removeMultipleDelimiter?: boolean) => string;
/**
 * Translates a given string into the regular expression validated
 * representation.
 * @param value - String to convert.
 * @param excludeSymbols - Symbols not to escape.
 * @returns Converted string.
 */
export declare const escapeRegularExpressions: (value: string, excludeSymbols?: Array<string>) => string;
/**
 * Finds the string match of a given query in a given target text by applying a
 * given normalization function to target and query.
 * @param target - Target to search in.
 * @param query - Search string to search for.
 * @param normalizer - Function to use as normalization for queries and search
 * targets.
 * @param skipTagDelimitedParts - Indicates whether to, for example, ignore
 * html tags via "['<', '>']" (the default).
 * @returns Start and end index of matching range.
 */
export declare const findNormalizedMatchRange: (target: string, query: RegExp | string, normalizer?: <T extends RegExp | string>(value: T) => T, skipTagDelimitedParts?: null | [string, string]) => Array<number> | null;
/**
 * Fixes known encoding problems in given data.
 * @param data - To process.
 * @returns Processed data.
 */
export declare const fixKnownEncodingErrors: (data: string) => string;
/**
 * Performs a string formation. Replaces every placeholder "{i}" with the i'th
 * argument.
 * @param string - The string to format.
 * @param additionalArguments - Additional arguments are interpreted as
 * replacements for string formatting.
 * @returns The formatted string.
 */
export declare const format: (string: string, ...additionalArguments: Array<unknown>) => string;
/**
 * Calculates the edit (levenstein) distance between two given strings.
 * @param first - First string to compare.
 * @param second - Second string to compare.
 * @returns The distance as number.
 */
export declare const getEditDistance: (first: string, second: string) => number;
/**
 * Abbreviates a given string if it excesses a given limit.
 * @param value - String to abbreviate.
 * @param limit - Maximum length of processed string.
 * @returns Abbreviated given string.
 */
export declare const limit: (value: string, limit?: number) => string;
/**
 * Converts a string to its lower case representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */
export declare const lowerCase: (string: string) => string;
/**
 * Wraps given mark strings in a given target with a given marker.
 * @param target - String to search in.
 * @param givenSearchWords - String or regular expression or array of those to
 * search for.
 * @param givenOptions - Defines highlighting behavior.
 * @param givenOptions.marker - HTML template string to mark.
 * @param givenOptions.normalizer - Pure normalization function to use before
 * searching for matches.
 * @param givenOptions.skipTagDelimitedParts - Indicates whether to, for
 * example, ignore html tags via "['<', '>']" (the default).
 * @returns Processed result.
 */
export declare const mark: (target: RegExp | string, givenSearchWords?: Array<RegExp | string> | RegExp | string, givenOptions?: Partial<StringMarkOptions>) => unknown;
/**
 * Validates the current string for using in a regular expression pattern.
 * Special regular expression chars will be escaped.
 * @param value - The string to format.
 * @returns The formatted string.
 */
export declare const maskForRegularExpression: (value: string) => string;
/**
 * Converts a dom selector to a prefixed dom selector string.
 * @param selector - A dom node selector.
 * @param selectorPrefix - A dom node selector prefix to take into account.
 * @returns Returns given selector prefixed.
 */
export declare const normalizeDomNodeSelector: (selector: string, selectorPrefix?: string) => string;
/**
 * Normalizes a given phone number for automatic dialing or comparison.
 * @param value - Number to normalize.
 * @param dialable - Indicates whether the result should be dialed or
 * represented as lossless data.
 * @returns Normalized number.
 */
export declare const normalizePhoneNumber: (value: unknown, dialable?: boolean) => string;
/**
 * Normalizes a given zip code for automatic address processing.
 * @param value - Number to normalize.
 * @returns Normalized number.
 */
export declare const normalizeZipCode: (value: unknown) => string;
/**
 * Converts a given serialized, base64 encoded or file path given object into a
 * native JavaScript one if possible.
 * @param serializedObject - Object as string.
 * @param scope - An optional scope which will be used to evaluate given object
 * in.
 * @param name - The name under given scope will be available.
 * @returns The parsed object if possible and null otherwise.
 */
export declare const parseEncodedObject: <T = PlainObject>(serializedObject: string, scope?: Mapping<unknown>, name?: string) => null | T;
/**
 * Represents a given phone number. NOTE: Currently only support German phone
 * numbers.
 * @param value - Number to format.
 * @returns Formatted number.
 */
export declare const representPhoneNumber: (value: unknown) => string;
/**
 * Slices all none numbers but preserves last separator.
 * @param value - String to process.
 * @returns - Sliced given value.
 */
export declare const sliceAllExceptNumberAndLastSeparator: (value: string) => string;

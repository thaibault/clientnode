// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module string */
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
// region url handling
import {
    ABBREVIATIONS, DEFAULT_ENCODING, SPECIAL_REGEX_SEQUENCES
} from './constants'
import {
    MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION,
    $,
    MAXIMAL_NUMBER_OF_ITERATIONS
} from './context'
import {isFileSync, readFileSync} from './filesystem'
import {determineType, represent} from './object'
import {
    CompilationResult,
    EvaluationResult,
    Mapping,
    PlainObject,
    StringMarkOptions,
    TemplateFunction,
    QueryParameters,
    ValueOf
} from './type'

// Partial regular expression matching symbols which should be allowed within a
// variable name excluding the first character.
export const ALLOWED_VARIABLE_SYMBOLS = '0-9a-zA-Z_$'
// Partial regular expression matching symbols which should be allowed as
// starting character for a variable name.
export const ALLOWED_STARTING_VARIABLE_SYMBOLS = 'a-zA-Z_$'
export const FIX_ENCODING_ERROR_MAPPING = [
    ['Ã\\x84', 'Ä'],
    ['Ã\\x96', 'Ö'],
    ['Ã\\x9c', 'Ü'],
    ['Ã¤', 'ä'],
    ['Ã¶', 'ö'],
    ['Ã¼', 'ü'],

    ['\\x96', '-'],

    ['Ã©', 'é'],
    ['Ã¨', 'e'],

    ['Ã´', 'o'],

    ['Ã ', 'á'],
    ['Ã¸', 'ø'],

    ['Ã\\x9f', 'ß'],
    ['Ã', 'ß']
] as const

/**
 * Translates given string into the regular expression validated
 * representation.
 * @param value - String to convert.
 * @param excludeSymbols - Symbols not to escape.
 * @returns Converted string.
 */
export const escapeRegularExpressions = (
    value: string, excludeSymbols: Array<string> = []
): string => {
    // NOTE: This is only for performance improvements.
    if (value.length === 1 && !SPECIAL_REGEX_SEQUENCES.includes(value))
        return value

    // The escape sequence must also be escaped; but at first.
    if (!excludeSymbols.includes('\\'))
        value.replace(/\\/g, '\\\\')

    for (const replace of SPECIAL_REGEX_SEQUENCES)
        if (!excludeSymbols.includes(replace))
            value = value.replace(
                new RegExp(`\\${replace}`, 'g'), `\\${replace}`)

    return value
}
/**
 * Translates given name into a valid javaScript one.
 * @param name - Name to convert.
 * @returns Converted name is returned.
 */
export const convertToValidVariableName = (name: string): string => {
    if (['class', 'default'].includes(name))
        return `_${name}`

    return name
        // Remove all disallowed starting characters.
        .replace(new RegExp(`^[^${ALLOWED_STARTING_VARIABLE_SYMBOLS}]+`), '')
        // Remove all disallowed characters within a variable name and make
        // continuing character upper case.
        .replace(
            new RegExp(`[^${ALLOWED_VARIABLE_SYMBOLS}]+([a-zA-Z])`, 'g'),
            (_fullMatch: string, firstLetter: string): string =>
                firstLetter.toUpperCase()
        )
}
/**
 * This method is intended for encoding *key* or *value* parts of query
 * component. We need a custom method because "encodeURIComponent()" is too
 * aggressive and encodes stuff that doesn't have to be encoded per
 * "http://tools.ietf.org/html/rfc3986:".
 * @param url - URL to encode.
 * @param encodeSpaces - Indicates whether given url should encode
 * whitespaces as "+" or "%20".
 * @returns Encoded given url.
 */
export const encodeURIComponentExtended = (
    url: string, encodeSpaces = false
): string => {
    return encodeURIComponent(url)
        .replace(/%40/gi, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, encodeSpaces ? '%20' : '+')
}
/**
 * Appends a path selector to the given path if there isn't one yet.
 * @param path - The path for appending a selector.
 * @param pathSeparator - The selector for appending to path.
 * @returns The appended path.
 */
export const addSeparatorToPath = (
    path: string, pathSeparator = '/'
): string => {
    path = path.trim()

    if (path.substring(path.length - 1) !== pathSeparator && path.length)
        return path + pathSeparator

    return path
}
/**
 * Checks if given path has given path prefix.
 * @param prefix - Path prefix to search for.
 * @param path - Path to search in.
 * @param separator - Delimiter to use in path (default is the posix
 * conform slash).
 * @returns Value "true" if given prefix occur and "false" otherwise.
 */
export const hasPathPrefix = (
    prefix: unknown = '/admin',
    path: string = $.location?.pathname || '',
    separator = '/'
): boolean => {
    if (typeof prefix === 'string') {
        if (!prefix.endsWith(separator))
            prefix += separator

        return (
            path ===
            prefix.substring(0, prefix.length - separator.length) ||
            path.startsWith(prefix)
        )
    }

    return false
}
/**
 * Extracts domain name from given url. If no explicit domain name given
 * current domain name will be assumed. If no parameter given current
 * domain name will be determined.
 * @param url - The url to extract domain from.
 * @param fallback - The fallback host name if no one exits in given url
 * (default is current hostname).
 * @returns Extracted domain.
 */
export const getDomainName = (
    url: string = $.location?.href || '',
    fallback: string = $.location?.hostname || ''
): string => {
    const result: Array<string> | null =
        /^([a-z]*:?\/\/)?([^/]+?)(?::[0-9]+)?(?:\/.*|$)/i.exec(url)

    if (result && result.length > 2 && result[1] && result[2])
        return result[2]

    return fallback
}
/**
 * Extracts port number from given url. If no explicit port number given
 * and no fallback is defined current port number will be assumed for local
 * links. For external links 80 will be assumed for http protocols and 443
 * for https protocols.
 * @param url - The url to extract port from.
 * @param fallback - Fallback port number if no explicit one was found.
 * Default is derived from current protocol name.
 * @returns Extracted port number.
 */
export const getPortNumber = (
    url: string = $.location?.href || '',
    fallback: null | number = $.location?.port ?
        parseInt($.location.port) :
        null
): null | number => {
    const result: Array<string> | null =
        /^(?:[a-z]*:?\/\/[^/]+?)?[^/]+?:([0-9]+)/i.exec(url)

    if (result && result.length > 1)
        return parseInt(result[1], 10)

    if (fallback !== null)
        return fallback

    if (
        // NOTE: Would result in an endless loop:
        // serviceURLEquals(url, ...parameters) &&
        $.location?.port &&
        parseInt($.location.port, 10)
    )
        return parseInt($.location.port, 10)

    return getProtocolName(url) === 'https' ? 443 : 80
}
/**
 * Extracts protocol name from given url. If no explicit url is given,
 * current protocol will be assumed. If no parameter given current protocol
 * number will be determined.
 * @param url - The url to extract protocol from.
 * @param fallback - Fallback port to use if no protocol exists in given
 * url (default is current protocol).
 * @returns Extracted protocol.
 */
export const getProtocolName = (
    url: string = $.location?.href || '',
    fallback: string = (
        $.location?.protocol &&
        $.location.protocol.substring(0, $.location.protocol.length - 1) ||
        ''
    )
): string => {
    const result: Array<string> | null = /^([a-z]+):\/\//i.exec(url)

    if (result && result.length > 1 && result[1])
        return result[1]

    return fallback
}
/**
 * Read a page's GET URL variables and return them as an associative array
 * and preserves ordering.
 * @param keyToGet - If provided the corresponding value for given key is
 * returned or full object otherwise.
 * @param allowDuplicates - Indicates whether to return arrays of values or
 * single values. If set to "false" (default) last values will overwrite
 * preceding values.
 * @param givenInput - An alternative input to the url search parameter. If
 * "#" is given the complete current hashtag will be interpreted as url and
 * search parameter will be extracted from there. If "&" is given classical
 * search parameter and hash parameter will be taken in account. If a search
 * string is given this will be analyzed. The default is to take given search
 * part into account.
 * @param subDelimiter - Defines which sequence indicates the start of
 * parameter in a hash part of the url.
 * @param hashedPathIndicator - If defined and given hash starts with this
 * indicator given hash will be interpreted as path containing search and
 * hash parts.
 * @param givenSearch - Search part to take into account defaults to
 * current url search part.
 * @param givenHash - Hash part to take into account defaults to current
 * url hash part.
 * @returns Returns the current get array or requested value. If requested
 * key doesn't exist "undefined" is returned.
 */
export const getURLParameter = (
    keyToGet: null | string = null,
    allowDuplicates = false,
    givenInput: null | string = null,
    subDelimiter = '$',
    hashedPathIndicator = '!',
    givenSearch: null | string = null,
    givenHash: null | string = $.location?.hash ?? ''
): Array<string> | null | QueryParameters | string => {
    // region set search and hash
    let hash: string = givenHash ?? '#'
    let search = ''
    if (givenSearch)
        search = givenSearch
    else if (hashedPathIndicator && hash.startsWith(hashedPathIndicator)) {
        const subHashStartIndex: number = hash.indexOf('#')
        let pathAndSearch: string
        if (subHashStartIndex === -1) {
            pathAndSearch = hash.substring(hashedPathIndicator.length)
            hash = ''
        } else {
            pathAndSearch = hash.substring(
                hashedPathIndicator.length, subHashStartIndex
            )
            hash = hash.substring(subHashStartIndex)
        }
        const subSearchStartIndex: number = pathAndSearch.indexOf('?')
        if (subSearchStartIndex !== -1)
            search = pathAndSearch.substring(subSearchStartIndex)
    } else if ($.location)
        search = $.location.search || ''
    let input: string = givenInput ? givenInput : search
    // endregion
    // region determine data from search and hash if specified
    const both: boolean = input === '&'
    if (both || input === '#') {
        let decodedHash = ''
        try {
            decodedHash = decodeURIComponent(hash)
        } catch {
            // Continue regardless of an error.
        }
        const subDelimiterIndex: number = decodedHash.indexOf(subDelimiter)
        if (subDelimiterIndex === -1)
            input = ''
        else {
            input = decodedHash.substring(subDelimiterIndex)
            if (input.startsWith(subDelimiter))
                input = input.substring(subDelimiter.length)
        }
    } else if (input.startsWith('?'))
        input = input.substring('?'.length)
    let data: Array<string> = input ? input.split('&') : []
    search = search.substring('?'.length)
    if (both && search)
        data = data.concat(search.split('&'))
    // endregion
    // region construct data structure
    const parameters: QueryParameters = [] as unknown as QueryParameters
    for (let value of data) {
        const keyValuePair: Array<string> = value.split('=')
        let key: string
        try {
            key = decodeURIComponent(keyValuePair[0])
        } catch {
            key = ''
        }
        try {
            value = decodeURIComponent(keyValuePair[1])
        } catch {
            value = ''
        }

        parameters.push(key)
        if (allowDuplicates)
            if (
                Object.prototype.hasOwnProperty.call(parameters, key) &&
                Array.isArray(parameters[key])
            )
                (parameters[key] as Array<string>).push(value)
            else
                parameters[key] = [value]
        else
            parameters[key] = value
    }
    // endregion

    if (keyToGet) {
        if (Object.prototype.hasOwnProperty.call(parameters, keyToGet))
            return parameters[keyToGet]

        return null
    }

    return parameters
}
/**
 * Checks if given url points to another "service" than second given url.
 * If no second given url provided current url will be assumed.
 * @param url - URL to check against second url.
 * @param referenceURL - URL to check against first url.
 * @returns Returns "true" if given first url has same domain as given
 * second (or current).
 */
export const serviceURLEquals = (
    url: string, referenceURL: string = $.location?.href || ''
): boolean => {
    const domain: string = getDomainName(url, '')
    const protocol: string = getProtocolName(url, '')
    const port: null | number = getPortNumber(url)

    return (
        (domain === '' || domain === getDomainName(referenceURL)) &&
        (protocol === '' || protocol === getProtocolName(referenceURL)) &&
        (port === null || port === getPortNumber(referenceURL))
    )
}
/**
 * Normalized given website url.
 * @param givenURL - Uniform resource locator to normalize.
 * @returns Normalized result.
 */
export const normalizeURL = (givenURL: unknown): string => {
    if (typeof givenURL === 'string') {
        const url = givenURL.replace(/^:?\/+/, '').replace(/\/+$/, '').trim()

        if (url.startsWith('http'))
            return url

        return `http://${url}`
    }

    return ''
}
/**
 * Represents given website url.
 * @param url - Uniform resource locator to represent.
 * @returns Represented result.
 */
export const representURL = (url: unknown): string => {
    if (typeof url === 'string')
        return url
            .replace(/^(https?)?:?\/+/, '')
            .replace(/\/+$/, '')
            .trim()

    return ''
}
//// endregion
/**
 * Converts a camel cased string to its delimited string version.
 * @param value - The string to format.
 * @param delimiter - Defines delimiter string.
 * @param abbreviations - Collection of shortcut words to represent uppercased.
 * @returns The formatted string.
 */
export const camelCaseToDelimited = (
    value: string,
    delimiter = '-',
    abbreviations: Array<string> | null = null
): string => {
    if (!abbreviations)
        abbreviations = ABBREVIATIONS

    const escapedDelimiter: string = maskForRegularExpression(delimiter)

    if (abbreviations.length) {
        let abbreviationPattern = ''
        for (const abbreviation of abbreviations) {
            if (abbreviationPattern)
                abbreviationPattern += '|'
            abbreviationPattern += abbreviation.toUpperCase()
        }

        value = value.replace(
            new RegExp(
                `(${abbreviationPattern})(${abbreviationPattern})`, 'g'
            ),
            `$1${delimiter}$2`
        )
    }

    value = value.replace(
        new RegExp(`([^${escapedDelimiter}])([A-Z][a-z]+)`, 'g'),
        `$1${delimiter}$2`
    )

    return value
        .replace(new RegExp('([a-z0-9])([A-Z])', 'g'), `$1${delimiter}$2`)
        .toLowerCase()
}
/**
 * Converts a string to its capitalize representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */
export const capitalize = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.substring(1)
}
/**
 * Compresses given style attribute value.
 * @param styleValue - Style value to compress.
 * @returns The compressed value.
 */
export const compressStyleValue = (styleValue: string): string => {
    return styleValue
        .replace(/ *([:;]) */g, '$1')
        .replace(/ +/g, ' ')
        .replace(/^;+/, '')
        .replace(/;+$/, '')
        .trim()
}
/**
 * Decodes all html symbols in text nodes in given html string.
 * @param htmlString - HTML string to decode.
 * @returns Decoded html string.
 */
export const decodeHTMLEntities = (htmlString: string): null | string => {
    if ($.document) {
        const textareaDomNode = $.document.createElement('textarea')
        textareaDomNode.innerHTML = htmlString

        return textareaDomNode.value
    }

    return null
}
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
export const delimitedToCamelCase = (
    value: string,
    delimiter = '-',
    abbreviations: Array<string> | null = null,
    preserveWrongFormattedAbbreviations = false,
    removeMultipleDelimiter = false
): string => {
    let escapedDelimiter: string = maskForRegularExpression(delimiter)

    if (!abbreviations)
        abbreviations = ABBREVIATIONS
    let abbreviationPattern: string
    if (preserveWrongFormattedAbbreviations)
        abbreviationPattern = ABBREVIATIONS.join('|')
    else {
        abbreviationPattern = ''
        for (const abbreviation of abbreviations) {
            if (abbreviationPattern)
                abbreviationPattern += '|'
            abbreviationPattern +=
                `${capitalize(abbreviation)}|${abbreviation}`
        }
    }

    const stringStartsWithDelimiter: boolean = value.startsWith(delimiter)
    if (stringStartsWithDelimiter)
        value = value.substring(delimiter.length)

    value = value.replace(
        new RegExp(
            `(${escapedDelimiter})(${abbreviationPattern})` +
            `(${escapedDelimiter}|$)`,
            'g'
        ),
        (
            _fullMatch: string,
            before: string,
            abbreviation: string,
            after: string
        ): string => before + abbreviation.toUpperCase() + after
    )

    if (removeMultipleDelimiter)
        escapedDelimiter = `(?:${escapedDelimiter})+`

    value = value.replace(
        new RegExp(`${escapedDelimiter}([a-zA-Z0-9])`, 'g'),
        (_fullMatch: string, firstLetter: string): string =>
            firstLetter.toUpperCase()
    )

    if (stringStartsWithDelimiter)
        value = delimiter + value

    return value
}
/**
 * Compiles a given string as expression with given scope names.
 * @param expression - The string to interpret.
 * @param scope - Scope to extract names from.
 * @param execute - Indicates whether to execute or evaluate.
 * @param removeGlobalScope - Indicates whether to shadow global variables via
 * "undefined".
 * @param binding - Object to apply as "this" in evaluation scope.
 * @returns Object of prepared scope name mappings and compiled function or
 * error string message if given expression couldn't be compiled.
 */
export const compile = <T = string, N extends Array<string> = Array<string>>(
    expression: string,
    scope:
        Mapping<unknown, N[number]> |
        N |
        N[number] |
        string = [] as unknown as N,
    execute = false,
    removeGlobalScope = true,
    binding: unknown = {}
): CompilationResult<T, N> => {
    /*
        NOTE: We do this global variable names determining as close as possible
        to the compiling step to cover as much as possible global introduces
        variables.
    */
    const globalNames = Object.keys(globalThis)
        .concat('globalThis')
        .filter((name) =>
            new RegExp(
                `^[${ALLOWED_STARTING_VARIABLE_SYMBOLS}]` +
                `[${ALLOWED_VARIABLE_SYMBOLS}]*$`
            ).test(name)
        )
    const result: CompilationResult<T, N> = {
        error: null,
        globalNames: globalNames,
        globalNamesUndefinedList: globalNames.map(() => undefined),
        originalScopeNames: (
            Array.isArray(scope) ?
                scope :
                typeof scope === 'string' ? [scope] : Object.keys(scope)
        ) as N,
        scopeNameMapping: {} as Record<N[number], string>,
        scopeNames: [],
        templateFunction: (): T => undefined as unknown as T
    }

    for (const name of result.originalScopeNames) {
        const newName: string = convertToValidVariableName(name)
        result.scopeNameMapping[name as N[number]] = newName
        result.scopeNames.push(newName)
    }
    // region try to polyfill template string literals for older browsers
    if (MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value !== 0)
        if ($.global.Babel?.transform)
            expression = $.global.Babel.transform(
                `(${expression})`,
                {plugins: ['transform-template-literals']}
            ).code
        else if (
            expression.startsWith('`') && expression.endsWith('`')
        ) {
            const escapeMarker = '####'
            // Convert template string into legacy string concatenations.
            expression = expression
                // Mark simple escape sequences.
                .replace(/\\\$/g, escapeMarker)
                // Handle avoidable template expression: Use raw code.
                .replace(/^`\$\{([\s\S]+)}`$/, 'String($1)')
                // Use plain string with single quotes.
                .replace(/^`([^']+)`$/, `'$1'`)
                // Use plain string with double quotes.
                .replace(/^`([^"]+)`$/, '"$1"')
            // Use single quotes and hope (just a heuristic).
            const quote: string =
                expression.charAt(0) === '`' ? `'` : expression.charAt(0)
            expression = expression
                // Replace simple placeholder.
                // NOTE: Replace complete bracket pairs.
                .replace(
                    /\$\{((([^{]*{[^}]*}[^}]*})|[^{}]+)+)}/g,
                    `${quote}+($1)+${quote}`
                )
                .replace(/^`([\s\S]+)`$/, `${quote}$1${quote}`)
                // Remove remaining newlines.
                .replace(/\n+/g, '')
                // Replace marked escape sequences.
                .replace(new RegExp(escapeMarker, 'g'), '\\$')
        }
    // endregion
    let innerTemplateFunction: TemplateFunction<T> | undefined

    try {
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        innerTemplateFunction = new Function(
            ...(removeGlobalScope ? result.globalNames : []),
            ...result.scopeNames,
            `${execute ? '' : 'return '}${expression}`
        ) as TemplateFunction<T>
    } catch (error) {
        result.error =
            `Given expression "${expression}" could not be compiled width ` +
            `given scope names "${result.scopeNames.join('", "')}": ` +
            represent(error)
    }
    if (innerTemplateFunction) {
        const boundInnerTemplateFunction =
            innerTemplateFunction.bind(binding)
        result.templateFunction = removeGlobalScope ?
            (...parameters) =>
                /*
                    NOTE: We shadow existing global names to sandbox
                    expressions.
                */
                boundInnerTemplateFunction(
                    ...result.globalNamesUndefinedList, ...parameters
                ) :
            boundInnerTemplateFunction
    }

    return result
}
/**
 * Evaluates a given string as expression against given scope.
 * @param expression - The string to interpret.
 * @param scope - Scope to render against.
 * @param execute - Indicates whether to execute or evaluate.
 * @param removeGlobalScope - Indicates whether to shadow global variables via
 * "undefined".
 * @param binding - Object to apply as "this" in evaluation scope.
 * @returns Object with error message during parsing / running or result.
 */
export const evaluate = <T = string, S extends object = object>(
    expression: string,
    scope: S = {} as S,
    execute = false,
    removeGlobalScope = true,
    binding: unknown = {}
): EvaluationResult<T> => {
    // NOTE: We extract string only types from given scope type.
    type N = Array<keyof S extends string ? keyof S : never>

    const {
        error,
        originalScopeNames,
        scopeNames,
        templateFunction
    } = compile<T, N>(expression, scope, execute, removeGlobalScope, binding)

    let result: EvaluationResult<T> = {
        compileError: null,
        runtimeError: null,
        error: 'Not yet evaluated.',

        result: undefined
    }

    if (error) {
        result.compileError = result.error = error

        return result
    }

    try {
        result = {
            compileError: null,
            runtimeError: null,
            error: null,
            result: templateFunction(
                /*
                    NOTE: We want to be sure to have same ordering as we have
                    for the scope names and to call internal registered getter
                    by retrieving values. So simple using
                    "...Object.values(scope)" is not appreciate here.
                */
                ...originalScopeNames.map((name: keyof S): ValueOf<S> =>
                    scope[name]
                )
            )
        }
    } catch (error) {
        result.error =
            result.runtimeError = (
                `Given expression "${expression}" could not be evaluated ` +
                `with given scope names "${scopeNames.join('", "')}": ` +
                represent(error)
            )
    }

    return result
}
/**
 * Finds the string match of given query in given target text by applying given
 * normalisation function to target and query.
 * @param target - Target to search in.
 * @param query - Search string to search for.
 * @param normalizer - Function to use as normalisation for queries and search
 * targets.
 * @param skipTagDelimitedParts - Indicates whether to for example ignore html
 * tags via "['<', '>']" (the default).
 * @returns Start and end index of matching range.
 */
export const findNormalizedMatchRange = (
    target: unknown,
    query: unknown,
    normalizer = (value: unknown): string => String(value).toLowerCase(),
    skipTagDelimitedParts: null | [string, string] = ['<', '>']
): Array<number> | null => {
    const normalizedQuery: string = normalizer(query)
    const normalizedTarget: string = normalizer(target)

    const stringTarget = typeof target === 'string' ?
        target :
        normalizedTarget

    if (normalizedTarget && normalizedQuery) {
        let inTag = false
        for (let index = 0; index < stringTarget.length; index += 1) {
            if (inTag) {
                if (
                    Array.isArray(skipTagDelimitedParts) &&
                    stringTarget.charAt(index) === skipTagDelimitedParts[1]
                )
                    inTag = false

                continue
            }

            if (
                Array.isArray(skipTagDelimitedParts) &&
                stringTarget.charAt(index) === skipTagDelimitedParts[0]
            ) {
                inTag = true

                continue
            }

            if (normalizer(stringTarget.substring(index)).startsWith(
                normalizedQuery
            )) {
                if (normalizedQuery.length === 1)
                    return [index, index + 1]

                for (
                    let subIndex = stringTarget.length;
                    subIndex > index;
                    subIndex -= 1
                )
                    if (!normalizer(stringTarget.substring(
                        index, subIndex
                    )).startsWith(normalizedQuery))
                        return [index, subIndex + 1]
            }
        }
    }

    return null
}
/**
 * Fixes known encoding problems in given data.
 * @param data - To process.
 * @returns Processed data.
 */
export const fixKnownEncodingErrors = (data: string): string => {
    for (const [search, replacement] of FIX_ENCODING_ERROR_MAPPING)
        data = data.replace(new RegExp(search, 'g'), replacement)

    return data
}
/**
 * Performs a string formation. Replaces every placeholder "{i}" with the i'th
 * argument.
 * @param string - The string to format.
 * @param additionalArguments - Additional arguments are interpreted as
 * replacements for string formatting.
 * @returns The formatted string.
 */
export const format = (
    string: string, ...additionalArguments: Array<unknown>
): string => {
    additionalArguments.unshift(string)

    let index = 0
    for (const value of additionalArguments) {
        string = string.replace(
            new RegExp(`\\{${String(index)}\\}`, 'gm'), String(value)
        )

        index += 1
    }

    return string
}
/**
 * Calculates the edit (levenstein) distance between two given strings.
 * @param first - First string to compare.
 * @param second - Second string to compare.
 * @returns The distance as number.
 */
export const getEditDistance = (first: string, second: string): number => {
    /*
        Create empty edit distance matrix for all possible modifications of
        substrings of "first" to substrings of "second".
    */
    const distanceMatrix: Array<Array<number>> =
        Array(second.length + 1).fill(null).map((): Array<number> =>
            Array(first.length + 1).fill(null) as Array<number>
        )
    /*
        Fill the first row of the matrix.
        If this is first row then we're transforming empty string to "first".
        In this case the number of transformations equals to size of "first"
        substring.
    */
    for (let index = 0; index <= first.length; index++)
        distanceMatrix[0][index] = index
    /*
        Fill the first column of the matrix.
        If this is first column then we're transforming empty string to
        "second".
        In this case the number of transformations equals to size of "second"
        substring.
    */
    for (let index = 0; index <= second.length; index++)
        distanceMatrix[index][0] = index

    for (let firstIndex = 1; firstIndex <= second.length; firstIndex++)
        for (
            let secondIndex = 1;
            secondIndex <= first.length;
            secondIndex++
        ) {
            const indicator: number =
                first[secondIndex - 1] === second[firstIndex - 1] ? 0 : 1
            distanceMatrix[firstIndex][secondIndex] = Math.min(
                // deletion
                distanceMatrix[firstIndex][secondIndex - 1] + 1,
                // insertion
                distanceMatrix[firstIndex - 1][secondIndex] + 1,
                // substitution
                distanceMatrix[firstIndex - 1][secondIndex - 1] + indicator
            )
        }

    return distanceMatrix[second.length][first.length]
}
/**
 * Validates the current string for using in a regular expression pattern.
 * Special regular expression chars will be escaped.
 * @param value - The string to format.
 * @returns The formatted string.
 */
export const maskForRegularExpression = (value: string): string => {
    return value.replace(/([\\|.*$^+[\]()?\-{}])/g, '\\$1')
}
/**
 * Converts a string to its lower case representation.
 * @param string - The string to format.
 * @returns The formatted string.
 */
export const lowerCase = (string: string): string => {
    return string.charAt(0).toLowerCase() + string.substring(1)
}
/**
 * Wraps given mark strings in given target with given marker.
 * @param target - String to search for marker.
 * @param givenWords - String or array of strings to search in target for.
 * @param givenOptions - Defines highlighting behavior.
 * @param givenOptions.marker - HTML template string to mark.
 * @param givenOptions.normalizer - Pure normalisation function to use before
 * searching for matches.
 * @param givenOptions.skipTagDelimitedParts - Indicates whether to for example
 * ignore html tags via "['<', '>']" (the default).
 * @returns Processed result.
 */
export const mark = (
    target: unknown,
    givenWords?: Array<string> | string,
    givenOptions: Partial<StringMarkOptions> = {}
): unknown => {
    if (typeof target === 'string' && givenWords?.length) {
        const options: StringMarkOptions = {
            marker: '<span class="tools-mark">{1}</span>',
            normalizer: (value: unknown) => String(value).toLowerCase(),
            skipTagDelimitedParts: ['<', '>'],
            ...givenOptions
        }

        target = target.trim()
        const markedTarget: Array<unknown> = []

        const words: Array<string> =
            ([] as Array<string>).concat(givenWords)
        let index = 0
        for (const word of words) {
            words[index] = options.normalizer(word).trim()

            index += 1
        }

        let restTarget: string = target as string
        let offset = 0
        /*
            Search for matches as long there is enough target text remaining to
            walk through.
        */
        for (
            let iteration = 0;
            iteration < MAXIMAL_NUMBER_OF_ITERATIONS.value;
            iteration++
        ) {
            let nearestRange: Array<number> | null = null
            let currentRange: Array<number> | null

            // Find the nearest next matching word.
            for (const word of words) {
                currentRange = findNormalizedMatchRange(
                    restTarget,
                    word,
                    options.normalizer,
                    options.skipTagDelimitedParts
                )
                if (
                    currentRange &&
                    (!nearestRange || currentRange[0] < nearestRange[0])
                )
                    nearestRange = currentRange
            }

            if (nearestRange) {
                if (nearestRange[0] > 0)
                    markedTarget.push(
                        (target as string)
                            .substring(offset, offset + nearestRange[0])
                    )
                markedTarget.push(
                    typeof options.marker === 'string' ?
                        format(
                            options.marker,
                            (target as string).substring(
                                offset + nearestRange[0],
                                offset + nearestRange[1]
                            )
                        ) :
                        options.marker(
                            (target as string).substring(
                                offset + nearestRange[0],
                                offset + nearestRange[1]
                            ),
                            markedTarget
                        )
                )

                offset += nearestRange[1]

                restTarget = (target as string).substring(offset)
            } else {
                if (restTarget.length)
                    markedTarget.push(restTarget)

                break
            }
        }

        return typeof options.marker === 'string' ?
            markedTarget.join('') :
            markedTarget
    }

    return target
}
/**
 * Normalizes given phone number for automatic dialing or comparison.
 * @param value - Number to normalize.
 * @param dialable - Indicates whether the result should be dialed or
 * represented as lossless data.
 * @returns Normalized number.
 */
export const normalizePhoneNumber = (
    value: unknown, dialable = true
): string => {
    if (typeof value === 'string' || typeof value === 'number') {
        let normalizedValue: string = String(value).trim()

        // Normalize country code prefix.
        normalizedValue = normalizedValue.replace(/^[^0-9]*\+/, '00')

        // Remove alternate direct dial numbers.
        normalizedValue = normalizedValue.replace(
            /([0-9].*?) *(,|o[rd]?)\.? ?-?[0-9]+$/, '$1'
        )

        if (dialable)
            return normalizedValue.replace(/[^0-9]+/g, '')

        const separatorPattern = '(?:[ /\\-]+)'
        // Remove unneeded area code zero in brackets.
        normalizedValue = normalizedValue.replace(
            new RegExp(
                `^(.+?)${separatorPattern}?\\(0\\)${separatorPattern}?` +
                '(.+)$'
            ),
            '$1-$2'
        )
        // Remove unneeded area code brackets.
        normalizedValue = normalizedValue.replace(
            new RegExp(
                `^(.+?)${separatorPattern}?\\((.+)\\)` +
                `${separatorPattern}?(.+)$`
            ),
            '$1-$2-$3'
        )
        /*
            Remove separators which doesn't mark semantics:
            1: Country code
            2: Area code
            3: Number
        */
        let compiledPattern = new RegExp(
            `^(00[0-9]+)${separatorPattern}([0-9]+)${separatorPattern}` +
            '(.+)$'
        )

        if (compiledPattern.test(normalizedValue))
            // Country code and area code matched.
            normalizedValue = normalizedValue.replace(compiledPattern, (
                _match: string,
                countryCode: string,
                areaCode: string,
                number: string
            ): string =>
                `${countryCode}-${areaCode}-` +
                sliceAllExceptNumberAndLastSeparator(number)
            )
        else {
            /*
                One prefix code matched:
                1: Prefix code
                2: Number
            */
            compiledPattern = /^([0-9 ]+)[/-](.+)$/
            const replacer = (
                _match: string, prefixCode: string, number: string
            ): string =>
                `${prefixCode.replace(/ +/, '')}-` +
                sliceAllExceptNumberAndLastSeparator(number)

            if (compiledPattern.test(normalizedValue))
                // Prefer "/" or "-" over " " as area code separator.
                normalizedValue =
                    normalizedValue.replace(compiledPattern, replacer)
            else
                normalizedValue = normalizedValue.replace(
                    new RegExp(`^([0-9]+)${separatorPattern}(.+)$`),
                    replacer
                )
        }

        return normalizedValue.replace(/[^0-9-]+/g, '').replace(/^-+$/, '')
    }

    return ''
}
/**
 * Normalizes given zip code for automatic address processing.
 * @param value - Number to normalize.
 * @returns Normalized number.
 */
export const normalizeZipCode = (value: unknown): string => {
    if (typeof value === 'string' || typeof value === 'number')
        return String(value).trim().replace(
            /^([^0-9]*[a-zA-Z]-)?(.+)$/,
            (match: string, prefix?: string, code?: string) => {
                if (prefix)
                    prefix =
                        prefix
                            .substring(prefix.length - 2)
                            .charAt(0)
                            .toUpperCase() +
                        '-'
                return (
                    (prefix ?? '') +
                    (code ?? '').trim().replace(/[^0-9]+/g, '')
                )
            }
        )

    return ''
}
/**
 * Converts given serialized, base64 encoded or file path given object into a
 * native javaScript one if possible.
 * @param serializedObject - Object as string.
 * @param scope - An optional scope which will be used to evaluate given object
 * in.
 * @param name - The name under given scope will be available.
 * @returns The parsed object if possible and null otherwise.
 */
export const parseEncodedObject = <T = PlainObject>(
    serializedObject: string, scope: Mapping<unknown> = {}, name = 'scope'
): null | T => {
    if (!readFileSync)
        throw new Error('File system api could not be loaded.')

    if (serializedObject.endsWith('.json') && isFileSync(serializedObject))
        serializedObject =
            readFileSync(serializedObject, {encoding: DEFAULT_ENCODING})

    serializedObject = serializedObject.trim()

    if (!serializedObject.startsWith('{'))
        serializedObject = (eval('Buffer') as typeof Buffer)
            .from(serializedObject, 'base64')
            .toString(DEFAULT_ENCODING)

    const result: EvaluationResult<T> =
        evaluate<T>(serializedObject, {[name]: scope})

    if (typeof result.result === 'object')
        return result.result

    return null
}
/**
 * Represents given phone number. NOTE: Currently only support german phone
 * numbers.
 * @param value - Number to format.
 * @returns Formatted number.
 */
export const representPhoneNumber = (value: unknown): string => {
    if (['number', 'string'].includes(determineType(value)) && value) {
        // Represent country code and leading area code zero.
        let normalizedValue =
            String(value as number)
                .replace(/^(00|\+)([0-9]+)-([0-9-]+)$/, '+$2 (0) $3')

        // Add German country code if not exists.
        normalizedValue =
            normalizedValue.replace(/^0([1-9][0-9-]+)$/, '+49 (0) $1')
        // Separate area code from base number.
        normalizedValue =
            normalizedValue.replace(/^([^-]+)-([0-9-]+)$/, '$1 / $2')

        // Partition base number in one triple and tuples or tuples only.
        return normalizedValue.replace(
            /^(.*?)([0-9]+)(-?[0-9]*)$/,
            (
                _match: string, prefix: string, number: string, suffix: string
            ): string =>
                prefix +
                (
                    (number.length % 2 === 0) ?
                        number.replace(/([0-9]{2})/g, '$1 ') :
                        number.replace(
                            /^([0-9]{3})([0-9]+)$/,
                            (
                                _match: string, triple: string, rest: string
                            ): string =>
                                `${triple} ` +
                                rest.replace(/([0-9]{2})/g, '$1 ').trim()
                        ) + suffix
                ).trim()
        ).trim()
    }

    return ''
}
/**
 * Slices all none numbers but preserves last separator.
 * @param value - String to process.
 * @returns - Sliced given value.
 */
export const sliceAllExceptNumberAndLastSeparator = (value: string): string => {
    /*
        1: baseNumber
        2: directDialingNumberSuffix
    */
    const compiledPattern = /^(.*[0-9].*)-([0-9]+)$/
    if (compiledPattern.test(value))
        return value.replace(compiledPattern, (
            _match: string,
            baseNumber: string,
            directDialingNumberSuffix: string
        ): string =>
            `${baseNumber.replace(/[^0-9]+/g, '')}-` +
            directDialingNumberSuffix
        )

    return value.replace(/[^0-9]+/g, '')
}
/**
 * Converts a dom selector to a prefixed dom selector string.
 * @param selector - A dom node selector.
 * @param selectorPrefix - A dom node selector prefix to take into account.
 * @returns Returns given selector prefixed.
 */
export const normalizeDomNodeSelector = (
    selector: string, selectorPrefix = ''
): string => {
    let domNodeSelectorPrefix = ''
    if (selectorPrefix)
        domNodeSelectorPrefix = `${selectorPrefix} `
    if (!(
        selector.startsWith(domNodeSelectorPrefix) ||
        selector.trim().startsWith('<')
    ))
        selector = domNodeSelectorPrefix + selector

    return selector.trim()
}

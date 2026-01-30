// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module dateTime */
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
import {LOCALES} from './constants'
import {
    EvaluationResult,
    Mapping,
    PositiveEvaluationResult,
    SecondParameter
} from './type'
import {capitalize, evaluate} from './string'

// Caches compiled date tine pattern regular expressions.
export const DATE_TIME_PATTERN_CACHE: Array<RegExp> = []

/**
 * Formats given date or current via given format specification.
 * @param format - Format specification.
 * @param dateTime - Date time to format.
 * @param options - Additional configuration options for "Intl.DateTimeFormat".
 * @param locales - Locale or list of locales to use for formatting. First one
 * take precedence of latter ones.
 * @returns Formatted date time string.
 */
export const dateTimeFormat = (
    format = 'full',
    dateTime: Date | number | string = new Date(),
    options: SecondParameter<typeof Intl.DateTimeFormat> = {},
    locales: Array<string> | string = LOCALES
): string => {
    if (typeof dateTime === 'number')
        /*
            NOTE: "Date" constructor expects milliseconds as unit instead
            of more common used seconds.
        */
        dateTime *= 1000

    const normalizedDateTime: Date = new Date(dateTime)

    if (['full', 'long', 'medium', 'short'].includes(format))
        return new Intl.DateTimeFormat(
            ([] as Array<string>).concat(locales, 'en-US'),
            {dateStyle: format, timeStyle: format, ...options} as
                SecondParameter<typeof Intl.DateTimeFormat>
        )
            .format(normalizedDateTime)

    const scope: Mapping<Array<string> | string> = {}
    for (const style of ['full', 'long', 'medium', 'short'] as const) {
        scope[`${style}Literals`] = []

        const dateTimeFormat: Intl.DateTimeFormat = new Intl.DateTimeFormat(
            ([] as Array<string>).concat(locales, 'en-US'),
            {dateStyle: style, timeStyle: style, ...options} as
                SecondParameter<typeof Intl.DateTimeFormat>
        )

        scope[style] = dateTimeFormat.format(normalizedDateTime)

        for (const item of dateTimeFormat.formatToParts(
            normalizedDateTime
        ))
            if (item.type === 'literal')
                (scope[`${style}Literals`] as Array<string>)
                    .push(item.value)
            else
                scope[`${style}${capitalize(item.type)}`] = item.value
    }

    const evaluated: EvaluationResult = evaluate(`\`${format}\``, scope)
    if (evaluated.error)
        throw new Error(evaluated.error)

    /*
        NOTE: For some reason hidden symbols are injected differently on
        different platforms, so we have to normalize for predictable
        testing.
    */
    return (evaluated as PositiveEvaluationResult)
        .result.replace(/\s/g, ' ')
}
/**
 * Interprets given content string as date time.
 * @param value - Date time string to interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is depended on
 * given format and number like string as utc.
 * @returns Interpret date time object.
 */
export const interpretDateTime = (
    value: string, interpretAsUTC?: boolean | null
): Date | null => {
    let resolvedInterpretAsUTC = Boolean(interpretAsUTC)
    // region iso format
    /*
        Let's first check if we have a simplified iso 8602 date time
        representation like:

        "YYYY-MM-DDTHH:mm:ss.sssZ" or "YYYY-MM-DDTHH:mm:ss.sss+HH:mm".

        Please note for the native "Date" implementation:

        When the time zone offset is absent, date-only forms are interpreted as
        a UTC time and date-time forms are interpreted as local time. This is
        due to a historical spec error that was not consistent with ISO 8601
        but could not be changed due to web compatibility.
    */
    const hourAndMinutesPattern = '[0-2][0-9]:[0-6][0-9]'
    const pattern = '^' + (
        // Year, month and day:
        '[0-9]{4}-[01][0-9]-[0-3][0-9]' +
        '(?<time>' + (
            '(?:T' + (
                hourAndMinutesPattern +
                '(?:' + (
                    // Seconds:
                    ':[0-6][0-9]' +
                    // Milliseconds:
                    '(?:\\.[0-9]+)?'
                ) + ')?' +
                // Timezone definition:
                `(?<dateTimeTimezone>Z|(?:[+-]${hourAndMinutesPattern}))?`
            ) + ')' +
            '|' +
            // Timezone definition:
            `(?<dateTimezone>Z|(?:[+-]${hourAndMinutesPattern}))`
        ) + ')?'
    ) + '$'
    const match = value.match(new RegExp(pattern, 'i'))
    if (match) {
        const result = new Date(value)

        if (isNaN(result.getDate()))
            return null

        const timezone =
            match.groups?.dateTimeTimezone ?? match.groups?.dateTimezone
        if (!timezone) {
            if ([null, undefined].includes(interpretAsUTC as null))
                resolvedInterpretAsUTC = false

            if (resolvedInterpretAsUTC) {
                if (!match.groups?.time)
                    /*
                        NOTE: Date only strings will be interpreted as UTC
                        already.
                    */
                    return result

                // local to utc
                return new Date(
                    result.getTime() -
                    (result.getTimezoneOffset() * 60) * 1000
                )
            }

            if (match.groups?.time)
                /*
                    NOTE: Date time strings will be interpreted as local
                    already.
                */
                return result

            // utc to local
            return new Date(
                result.getTime() +
                (result.getTimezoneOffset() * 60) * 1000
            )
        }

        return result
    }
    // endregion
    value = value.replace(/^(-?)-*0*([1-9][0-9]*)$/, '$1$2')
    // region interpret integer number
    /*
        NOTE: Do not use "parseFloat" since we want to interpret delimiter as
        date delimiters.
    */
    if (String(parseInt(value)) === value) {
        if ([null, undefined].includes(interpretAsUTC as null))
            resolvedInterpretAsUTC = true

        const roughDateForTimeZoneDetermining =
            new Date(parseInt(value) * 1000)
        return new Date(
            (
                parseInt(value) +
                (resolvedInterpretAsUTC ?
                    0 :
                    (roughDateForTimeZoneDetermining.getTimezoneOffset() * 60)
                )
            ) *
            1000
        )
    }
    // endregion
    if (!DATE_TIME_PATTERN_CACHE.length) {
        // region pre-compile regular expressions
        /// region pattern
        const millisecondPattern =
            '(?<millisecond>(?:0{0,3}[0-9])|(?:0{0,2}[1-9]{2})|' +
            '(?:0?[1-9]{3})|(?:1[1-9]{3}))'
        const minuteAndSecondPattern = '(?:0?[0-9])|(?:[1-5][0-9])|(?:60)'
        const secondPattern = `(?<second>${minuteAndSecondPattern})`
        const minutePattern = `(?<minute>${minuteAndSecondPattern})`
        const hourPattern = '(?<hour>(?:0?[0-9])|(?:1[0-9])|(?:2[0-4]))'
        const noonIndicatorPattern =
            '(?<noonIndicator> *(?:(?:a\\.?m\\.?)|(?:p\\.?m\\.?)))?'
        const dayPattern = '(?<day>(?:0?[1-9])|(?:[1-2][0-9])|(?:3[01]))'
        const monthPattern = '(?<month>(?:0?[1-9])|(?:1[0-2]))'
        const yearPattern = '(?<year>(?:0?[1-9])|(?:[1-9][0-9]+))'
        /// endregion
        const patternPresenceCache: Mapping<true> = {}
        for (const timeDelimiter of ['t', ' '] as const)
            for (const timeComponentDelimiter of [
                ':', '/', '-', ' '
            ] as const)
                for (const timeFormat of [
                    hourPattern +
                    `${timeComponentDelimiter}+` +
                    minutePattern +
                    noonIndicatorPattern,

                    hourPattern +
                    `${timeComponentDelimiter}+` +
                    minutePattern +
                    `${timeComponentDelimiter}+` +
                    secondPattern +
                    noonIndicatorPattern,

                    hourPattern +
                    `${timeComponentDelimiter}+` +
                    minutePattern +
                    `${timeComponentDelimiter}+` +
                    secondPattern +
                    `${timeComponentDelimiter}+` +
                    millisecondPattern +
                    noonIndicatorPattern,

                    hourPattern +
                    noonIndicatorPattern
                ])
                    for (const dateTimeFormat of [
                        {
                            delimiter: ['/', '-', ' '],
                            pattern: [
                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                yearPattern,

                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                ' +' +
                                yearPattern,

                                yearPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern,

                                yearPattern +
                                ' +' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern,

                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                yearPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                ' +' +
                                yearPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                timeFormat +
                                `${timeDelimiter}+` +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                yearPattern,

                                timeFormat +
                                `${timeDelimiter}+` +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                ' +' +
                                yearPattern,

                                yearPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                yearPattern +
                                ' +' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                timeFormat +
                                `${timeDelimiter}+` +
                                yearPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern,

                                timeFormat +
                                `${timeDelimiter}+` +
                                yearPattern +
                                ' +' +
                                monthPattern +
                                '${delimiter}' +
                                dayPattern
                            ]
                        },
                        {
                            delimiter: '\\.',
                            pattern: [
                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                yearPattern,

                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                ' +' +
                                yearPattern,

                                yearPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern,

                                yearPattern +
                                ' +' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern,

                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                yearPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                ' +' +
                                yearPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                timeFormat +
                                `${timeDelimiter}+` +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                '${delimiter}' +
                                yearPattern,

                                timeFormat +
                                `${timeDelimiter}+` +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                ' +' +
                                yearPattern,

                                yearPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                yearPattern +
                                ' +' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern +
                                `${timeDelimiter}+` +
                                timeFormat,

                                timeFormat +
                                `${timeDelimiter}+` +
                                yearPattern +
                                '${delimiter}' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern,

                                timeFormat +
                                `${timeDelimiter}+` +
                                yearPattern +
                                ' +' +
                                dayPattern +
                                '${delimiter}' +
                                monthPattern
                            ]
                        },
                        {pattern: timeFormat}
                    ])
                        for (
                            const delimiter of ([] as Array<string>)
                                .concat(
                                    Object.prototype.hasOwnProperty.call(
                                        dateTimeFormat, 'delimiter'
                                    ) ?
                                        (dateTimeFormat.delimiter as string) :
                                        '-'
                                )
                        )
                            for (
                                const pattern of ([] as Array<string>)
                                    .concat(dateTimeFormat.pattern)
                            ) {
                                const evaluatedPattern = evaluate(
                                    `\`^${pattern}$\``,
                                    {delimiter: `${delimiter}+`}
                                ).result
                                if (
                                    evaluatedPattern &&
                                    !Object.prototype.hasOwnProperty.call(
                                        patternPresenceCache, evaluatedPattern
                                    )
                                ) {
                                    patternPresenceCache[evaluatedPattern] =
                                        true
                                    DATE_TIME_PATTERN_CACHE.push(
                                        new RegExp(evaluatedPattern)
                                    )
                                }
                            }
        // endregion
    }
    // region pre-process
    // NOTE: All patterns can assume lower cased strings.
    value = value.toLowerCase()
    /*
        Reduce each sequence on none alphanumeric symbols to the first
        symbol (consolidate delimiters).
    */
    value = value.replace(/([^0-9a-z])[^0-9a-z]+/g, '$1')

    let monthNumber = 1
    for (const monthVariation of [
        ['jan', 'january?', 'janvier'],
        ['feb', 'february?', 'février'],
        ['m(?:a|ae|ä)r', 'm(?:a|ae|ä)r(?:ch|s|z)'],
        ['ap[rv]', 'a[pv]ril'],
        ['ma[iy]'],
        ['ju[ein]', 'jui?n[ei]?'],
        ['jul', 'jul[iy]', 'juillet'],
        ['aug', 'august', 'août'],
        ['sep', 'septemb(?:er|re)'],
        ['o[ck]t', 'o[ck]tob(?:er|re)'],
        ['nov', 'novemb(?:er|re)'],
        ['de[cz]', 'd[eé][cz]emb(?:er|re)']
    ]) {
        let matched = false
        for (const name of monthVariation) {
            const pattern = new RegExp(`(^|[^a-z])${name}([^a-z]|$)`)
            if (pattern.test(value)) {
                value = value.replace(pattern, `$1${String(monthNumber)}$2`)
                matched = true
                break
            }
        }

        if (matched)
            break

        monthNumber += 1
    }

    value = sliceWeekday(value)

    const timezonePattern = /(.+)\+(.+)$/
    const timezoneMatch: Array<string> | null = timezonePattern.exec(value)
    if (timezoneMatch)
        value = value.replace(timezonePattern, '$1')

    for (const wordToSlice of ['', 'Uhr', `o'clock`] as const)
        value = value.replace(wordToSlice, '')

    value = value.trim()
    // endregion
    // region try to match a pattern
    for (const dateTimePattern of DATE_TIME_PATTERN_CACHE) {
        let match: ReturnType<string['match']> = null

        try {
            match = value.match(dateTimePattern)
        } catch {
            // Continue regardless of an error.
        }

        if (match) {
            const get = (name: string, fallback = 0): number =>
                match.groups && name in match.groups ?
                    parseInt(match.groups[name], 10) :
                    fallback

            const parameter: [
                number, number, number, number, number, number, number
            ] = [
                get('year', 1970), get('month', 1) - 1, get('day', 1),
                get('hour'), get('minute'), get('second'),
                get('millisecond')
            ]

            if (
                match.groups?.noonIndicator &&
                match.groups.noonIndicator
                    .trim()
                    .replace(/\./g, '') ===
                        'pm' &&
                parameter[3] <= 12
            )
                parameter[3] += 12

            let result: Date | null = null
            if (timezoneMatch) {
                const timeShift: Date | null =
                    interpretDateTime(timezoneMatch[2], true)
                if (timeShift)
                    result = new Date(
                        Date.UTC(...parameter) - timeShift.getTime()
                    )
            }

            if (!result)
                if (resolvedInterpretAsUTC)
                    result = new Date(Date.UTC(...parameter))
                else
                    result = new Date(...parameter)

            if (isNaN(result.getDate()))
                return null

            return result
        }
    }
    // endregion
    return null
}
/**
 * Interprets a date object from given artefact.
 * @param value - To interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is dependent on
 * given format and numbers as utc.
 * @returns Interpreted date object or "null" if given value couldn't be
 * interpreted.
 */
export const normalizeDateTime = (
    value: string | null | number | Date = null,
    interpretAsUTC?: boolean | null
): Date | null => {
    let resolvedInterpretAsUTC = Boolean(interpretAsUTC)

    if (value === null)
        return new Date()

    if (typeof value === 'string') {
        /*
            We make a simple pre-check to determine if it could be a date like
            representation. Idea: There should be at least some numbers and
            separators.
        */
        if (/^.*(?:(?:[0-9]{1,4}[^0-9]){2}|[0-9]{1,4}[^0-9.]).*$/.test(
            value
        )) {
            value = interpretDateTime(value, resolvedInterpretAsUTC)

            if (value === null)
                return value

            return value
        }

        const floatRepresentation: number = parseFloat(value)
        if (String(floatRepresentation) === value)
            value = floatRepresentation
    }

    if (typeof value === 'number') {
        if ([null, undefined].includes(interpretAsUTC as null))
            resolvedInterpretAsUTC = true

        const roughDateForTimeZoneDetermining = new Date(value * 1000)
        return new Date(
            (
                value +
                (resolvedInterpretAsUTC ?
                    0 :
                    (roughDateForTimeZoneDetermining.getTimezoneOffset() * 60)
                )
            ) *
            1000
        )
    }

    // Try to deal with types which are either numbers or strings.
    const result = new Date(value)

    if (isNaN(result.getDate()))
        return null

    return result
}
/**
 * Slice weekday from given date representation.
 * @param value - String to process.
 * @returns Sliced given string.
 */
export const sliceWeekday = (value: string): string => {
    const weekdayPattern = /[a-z]{2}\.+ *([^ ].*)$/i
    const weekdayMatch = weekdayPattern.exec(value)

    if (weekdayMatch)
        return value.replace(weekdayPattern, '$1')

    return value
}

// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module number */
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
import {determineType} from './object'

/**
 * Determines corresponding utc timestamp for given date object.
 * @param value - Date to convert.
 * @param inMilliseconds - Indicates whether given number should be in
 * seconds (default) or milliseconds.
 * @returns Determined numerous value.
 */
export const getUTCTimestamp = (
    value?:Date|null|number|string, inMilliseconds = false
):number => {
    const date:Date = [null, undefined].includes(value as null) ?
        new Date() :
        new Date(value as Date|number|string)

    return (
        Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds()
        ) /
        (inMilliseconds ? 1 : 1000)
    )
}
/**
 * Checks if given object is java scripts native "Number.NaN" object.
 * @param value - Value to check.
 * @returns Returns whether given value is not a number or not.
 */
export const isNotANumber = (value:unknown):boolean =>
    determineType(value) === 'number' && isNaN(value as number)
/**
 * Rounds a given number accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */
export const round = (number:number, digits = 0):number =>
    Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits)
/**
 * Rounds a given number up accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */
export const ceil = (number:number, digits = 0):number =>
    Math.ceil(number * Math.pow(10, digits)) / Math.pow(10, digits)
/**
 * Rounds a given number down accurate to given number of digits.
 * @param number - The number to round.
 * @param digits - The number of digits after comma.
 * @returns Returns the rounded number.
 */
export const floor = (number:number, digits = 0):number =>
    Math.floor(number * Math.pow(10, digits)) / Math.pow(10, digits)

// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module constants */
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
export {Lock} from './Lock'
export {Semaphore} from './Semaphore'
import {Encoding, FirstParameter} from './type'

export const DEFAULT_ENCODING:Encoding = 'utf8'
export const CLOSE_EVENT_NAMES = [
    'close', 'exit', 'SIGINT', 'SIGTERM', 'SIGQUIT', 'uncaughtException'
] as const
export const CONSOLE_METHODS = [
    'debug', 'error', 'info', 'log', 'warn'
] as const
export const VALUE_COPY_SYMBOL = Symbol.for('clientnodeValue')
export const IGNORE_NULL_AND_UNDEFINED_SYMBOL =
    Symbol.for('clientnodeIgnoreNullAndUndefined')

// Lists all known abbreviation for proper camel case to delimited and back
// conversion.
export const ABBREVIATIONS:Array<string> = [
    'html', 'id', 'url', 'us', 'de', 'api', 'href'
] as const
// Saves a string with all css3 browser specific animation end event names.
export const ANIMATION_END_EVENT_NAMES =
    'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd'
// String representation to object type name mapping.
export const CLASS_TO_TYPE_MAPPING = {
    '[object Array]': 'array',
    '[object Boolean]': 'boolean',
    '[object Date]': 'date',
    '[object Error]': 'error',
    '[object Function]': 'function',
    '[object Map]': 'map',
    '[object Number]': 'number',
    '[object Object]': 'object',
    '[object RegExp]': 'regexp',
    '[object Set]': 'set',
    '[object String]': 'string'
} as const
// Saves a mapping from key codes to their corresponding name.
export const KEY_CODES = {
    BACKSPACE: 8,
    COMMA: 188,
    DELETE: 46,
    DOWN: 40,
    END: 35,
    ENTER: 13,
    ESCAPE: 27,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    HOME: 36,
    LEFT: 37,
    NUMPAD_ADD: 107,
    NUMPAD_DECIMAL: 110,
    NUMPAD_DIVIDE: 111,
    NUMPAD_ENTER: 108,
    NUMPAD_MULTIPLY: 106,
    NUMPAD_SUBTRACT: 109,
    PAGE_DOWN: 34,
    PAGE_UP: 33,
    PERIOD: 190,
    RIGHT: 39,
    SPACE: 32,
    TAB: 9,
    UP: 38
} as const
export const LOCALES:Array<string> = []
export const PLAIN_OBJECT_PROTOTYPES:Array<FirstParameter<
    typeof Object.getPrototypeOf
>> = [Object.prototype]
// A list of special regular expression symbols.
export const SPECIAL_REGEX_SEQUENCES:Array<string> = [
    '-', '[', ']', '(', ')', '^', '$', '*', '+', '.', '{', '}'
] as const
// Saves a string with all css3 browser specific transition end event names.
export const TRANSITION_END_EVENT_NAMES =
    'transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'

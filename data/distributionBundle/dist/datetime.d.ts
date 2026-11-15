import type { SecondParameter } from './type';
export declare const DATE_TIME_PATTERN_CACHE: Array<RegExp>;
/**
 * Formats given date or current via given format specification.
 * @param format - Format specification.
 * @param dateTime - Date time to format.
 * @param options - Additional configuration options for "Intl.DateTimeFormat".
 * @param locales - Locale or list of locales to use for formatting. First one
 * take precedence of latter ones.
 * @returns Formatted date time string.
 */
export declare const dateTimeFormat: (format?: string, dateTime?: Date | number | string, options?: SecondParameter<typeof Intl.DateTimeFormat>, locales?: Array<string> | string) => string;
/**
 * Interprets given content string as date time.
 * @param value - Date time string to interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is depended on
 * given format and number like string as utc.
 * @returns Interpret date time object.
 */
export declare const interpretDateTime: (value: string, interpretAsUTC?: boolean | null) => Date | null;
/**
 * Interprets a date object from given artifact.
 * @param value - To interpret.
 * @param interpretAsUTC - Identifies if given date should be interpreted as
 * utc. If not set given strings will be interpreted as it is dependent on
 * given format and numbers as utc.
 * @returns Interpreted date object or "null" if given value couldn't be
 * interpreted.
 */
export declare const normalizeDateTime: (value?: string | null | number | Date, interpretAsUTC?: boolean | null) => Date | null;
/**
 * Slice weekday from given date representation.
 * @param value - String to process.
 * @returns Sliced given string.
 */
export declare const sliceWeekday: (value: string) => string;

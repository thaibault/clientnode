import type { Mapping, Page, PaginateOptions } from './type';
/**
 * Summarizes given property of given item list.
 * @param data - Array of objects with given property name.
 * @param propertyName - Property name to summarize.
 * @param defaultValue - Value to return if property values doesn't match.
 * @returns Aggregated value.
 */
export declare const aggregatePropertyIfEqual: <T = unknown>(data: Array<Mapping<unknown>>, propertyName: string, defaultValue?: T) => T;
/**
 * Deletes every item witch has only empty attributes for given property names.
 * If given property names are empty each attribute will be considered. The
 * empty string, "null" and "undefined" will be interpreted as empty.
 * @param data - Data to filter.
 * @param propertyNames - Properties to consider.
 * @returns Given data without empty items.
 */
export declare const deleteEmptyItems: <T extends Mapping<unknown> = Mapping<unknown>>(data: Array<T>, propertyNames?: Array<string | symbol>) => Array<T>;
/**
 * Extracts all properties from all items which occur in given property names.
 * @param data - Data where each item should be sliced.
 * @param propertyNames - Property names to extract.
 * @returns Data with sliced items.
 */
export declare const extract: <T = Mapping<unknown>>(data: unknown, propertyNames: Array<string>) => Array<T>;
/**
 * Extracts all values which matches given regular expression.
 * @param data - Data to filter.
 * @param regularExpression - Pattern to match for.
 * @returns Filtered data.
 */
export declare const extractIfMatches: (data: unknown, regularExpression: string | RegExp) => Array<string>;
/**
 * Filters given data if given property is set or not.
 * @param data - Data to filter.
 * @param propertyName - Property name to check for existence.
 * @returns Given data without the items which doesn't have specified property.
 */
export declare const extractIfPropertyExists: <T extends Mapping<unknown> = Mapping<unknown>>(data: unknown, propertyName: string) => Array<T>;
/**
 * Extract given data where specified property value matches given patterns.
 * @param data - Data to filter.
 * @param propertyPattern - Mapping of property names to pattern.
 * @returns Filtered data.
 */
export declare const extractIfPropertyMatches: <T = unknown>(data: unknown, propertyPattern: Mapping<RegExp | string>) => Array<T>;
/**
 * Determines all objects which exists in "first" and in "second".
 * Object key which will be compared are given by "keys". If an empty array is
 * given each key will be compared. If an object is given corresponding initial
 * data key will be mapped to referenced new data key.
 * @param first - Referenced data to check for.
 * @param second - Data to check for existence.
 * @param keys - Keys to define equality.
 * @param strict - The strict parameter indicates whether "null" and
 * "undefined" should be interpreted as equal (takes only effect if given keys
 * aren't empty).
 * @returns Data which does exit in given initial data.
 */
export declare const intersect: <T = unknown>(first: unknown, second: unknown, keys?: Array<string> | Mapping<number | string>, strict?: boolean) => Array<T>;
/**
 * Converts given object into an array.
 * @param object - Target to convert.
 * @returns Generated array.
 */
export declare const makeArray: <T = unknown>(object: unknown) => Array<T>;
/**
 * Creates a list of items within given range.
 * @param range - Array of lower and upper bounds. If only one value is given
 * lower bound will be assumed to be zero. Both integers have to be positive
 * and will be contained in the resulting array. If more than two numbers are
 * provided given range will be returned.
 * @param step - Space between two consecutive values.
 * @param ignoreLastStep - Removes last step.
 * @returns Produced array of integers.
 */
export declare const makeRange: (range: number | Array<number> | [number] | [number, number], step?: number, ignoreLastStep?: boolean) => Array<number>;
/**
 * Merge the contents of two arrays together into the first array.
 * @param target - Target array.
 * @param source - Source array.
 * @returns Target array with merged given source one.
 */
export declare const merge: <T = unknown>(target: Array<T>, source: Array<T>) => Array<T>;
/**
 * Generates a list if pagination symbols to render a pagination from.
 * @param options - Configure bounds and current page of pagination to
 * determine.
 * @param options.boundaryCount - Indicates where to start pagination within
 * given total range.
 * @param options.disabled - Indicates whether to disable all items.
 * @param options.hideNextButton - Indicates whether to show a jump to next
 * item.
 * @param options.hidePrevButton - Indicates whether to show a jump to previous
 * item.
 * @param options.page - Indicates current visible page.
 * @param options.pageSize - Number of items per page.
 * @param options.showFirstButton - Indicates whether to show a jump to first
 * item.
 * @param options.showLastButton - Indicates whether to show a jump to last
 * item.
 * @param options.siblingCount - Number of sibling page symbols next to current
 * page symbol.
 * @param options.total - Number of all items to paginate.
 * @returns A list of pagination symbols.
 */
export declare const paginate: (options?: Partial<PaginateOptions>) => Array<Page>;
/**
 * Generates all permutations of given iterable.
 * @param data - Array like object.
 * @returns Array of permuted arrays.
 */
export declare const permute: <T = unknown>(data: Array<T>) => Array<Array<T>>;
/**
 * Generates all lengths permutations of given iterable.
 * @param data - Array like object.
 * @param minimalSubsetLength - Defines how long the minimal subset length
 * should be.
 * @returns Array of permuted arrays.
 */
export declare const permuteLength: <T = unknown>(data: Array<T>, minimalSubsetLength?: number) => Array<Array<T>>;
/**
 * Removes given target on given list.
 * @param list - Array to splice.
 * @param target - Target to remove from given list.
 * @param strict - Indicates whether to fire an exception if given target
 * doesn't exist given list.
 * @returns Item with the appended target.
 */
export declare const removeArrayItem: <T = unknown>(list: Array<T>, target: T, strict?: boolean) => Array<T>;
/**
 * Sorts given object of dependencies in a topological order.
 * @param items - Items to sort.
 * @returns Sorted array of given items respecting their dependencies.
 */
export declare const sortTopological: (items: Mapping<Array<string> | string>) => Array<string>;
/**
 * Sums up given property of given item list.
 * @param data - The objects with specified property to sum up.
 * @param propertyName - Property name to sum up its value.
 * @returns The aggregated value.
 */
export declare const sumUpProperty: (data: unknown, propertyName: string) => number;
/**
 * Makes all values in given iterable unique by removing duplicates (The first
 * occurrences will be left).
 * @param data - Array like object.
 * @returns Sliced version of given object.
 */
export declare const unique: <T = unknown>(data: Array<T>) => Array<T>;

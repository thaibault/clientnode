import type { Mapping } from './type';
import * as array from './array';
import * as datetime from './datetime';
import * as filesystem from './filesystem';
import * as functions from './function';
import * as indicators from './indicators';
import * as logger from './Logger';
import * as module from './module';
import * as number from './number';
import * as object from './object';
import * as string from './string';
import * as utility from './utility';
export declare const UTILITY_SCOPE: {
    readonly array: typeof array;
    readonly datetime: typeof datetime;
    readonly filesystem: typeof filesystem;
    readonly functions: typeof functions;
    readonly indicators: typeof indicators;
    readonly logger: typeof logger;
    readonly module: typeof module;
    readonly number: typeof number;
    readonly object: typeof object;
    readonly string: typeof string;
    readonly utility: typeof utility;
};
export declare const UTILITY_SCOPE_NAMES: readonly ['array', 'datetime', 'filesystem', 'functions', 'indicators', 'logger', 'module', 'number', 'object', 'string', 'utility'];
export declare const UTILITY_SCOPE_VALUES: readonly [typeof array, typeof datetime, typeof filesystem, typeof functions, typeof indicators, typeof logger, typeof module, typeof number, typeof object, typeof string, typeof utility];
/**
 * Generates a unique name in given scope (useful for jsonp requests).
 * @param prefix - A prefix which will be prepended to unique name.
 * @param suffix - A suffix which will be prepended to unique name.
 * @param scope - A scope where the name should be unique.
 * @param initialUniqueName - An initial scope name to use if not exists.
 * @returns The function name.
 */
export declare const determineUniqueScopeName: (prefix?: string, suffix?: string, scope?: Mapping<unknown>, initialUniqueName?: string) => string;
/**
 * Overwrites all inherited variables from parent scope with "undefined".
 * @param scope - A scope where inherited names will be removed.
 * @param prefixesToIgnore - Name prefixes to ignore during deleting names in
 * given scope.
 * @returns The isolated scope.
 */
export declare const isolateScope: <T extends Mapping<unknown>>(scope: T, prefixesToIgnore?: Array<string>) => T;

import type { TimeoutPromise } from './type';
/**
 * Prevents event functions from triggering too close after each trigger by
 * defining a minimal span between each function call. Additional arguments
 * given to this function will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */
export declare const debounce: <T = unknown>(callback: (...parameters: Array<unknown>) => T, thresholdInMilliseconds?: number, ...additionalArguments: Array<unknown>) => ((...parameters: Array<unknown>) => Promise<T>);
/**
 * Prevents event functions from triggering too often by defining a minimal
 * span between each function call. Additional arguments given to this function
 * will be forwarded to the given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */
export declare const trailingThrottle: <T = unknown>(callback: (...parameters: Array<unknown>) => T, thresholdInMilliseconds?: number, ...additionalArguments: Array<unknown>) => (...parameters: Array<unknown>) => void;
export declare const preventDefault: (event: Event) => void;
export declare const stopPropagation: (event: Event) => void;
/**
 * Triggers given callback after given duration. Supports unlimited
 * duration length and returns a promise which will be resolved after given
 * duration has been passed.
 * @param parameters - Observes the first three existing parameters. If one
 * is a number it will be interpreted as delay in milliseconds until given
 * callback will be triggered. If one is of type function it will be used
 * as callback and if one is of type boolean it will indicate if returning
 * promise should be rejected or resolved if given internally created
 * timeout should be canceled. Additional parameters will be forwarded to
 * given callback.
 * @returns A promise resolving after given delay or being rejected if
 * value "true" is within one of the first three parameters. The promise
 * holds a boolean indicating whether timeout has been canceled or
 * resolved.
 */
export declare const timeout: (...parameters: Array<unknown>) => TimeoutPromise;

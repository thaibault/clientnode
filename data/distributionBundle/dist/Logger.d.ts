import type { LoggerOptions, Mapping } from './type';
export declare const LEVELS: readonly ['error', 'critical', 'warn', 'info', 'debug'];
export declare const LEVELS_COLOR: ("\u001B[0;34m" | "\u001B[31m" | "\u001B[32m" | "\u001B[33m" | "\u001B[35m")[];
export type Level = typeof LEVELS[number];
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for dependent gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse  option objects dom trees or handle events is also
 * provided.
 * @property level - Logging level.
 * @property name - Logger description.
 */
export declare class Logger {
    static defaultLevel: Level;
    static defaultName: string;
    static selfClass: typeof Logger;
    static instances: Mapping<Logger>;
    static runtimeVersion: number;
    /**
     * Configures all logger instances.
     * @param options - Options to set.
     */
    static configureAllInstances(options?: Partial<LoggerOptions>): void;
    level: Level;
    name: string;
    /**
     * Initializes logger.
     * @param options - Options to set.
     */
    constructor(options?: Partial<LoggerOptions>);
    /**
     * Configures logger.
     * @param options - Options to set.
     * @param options.name - Description of the logger instance.
     * @param options.level - Logging level to configure.
     */
    configure({ name, level }: Partial<LoggerOptions>): void;
    /**
     * Shows the given object's representation in the browsers console if
     * possible or in a standalone alert-window as fallback.
     * @param object - Any object to print.
     * @param force - If set to "true" given input will be shown independently
     * of current logging configuration or interpreter's console
     * implementation.
     * @param avoidAnnotation - If set to "true" given input has no module or
     * log level specific annotations.
     * @param level - Description of log messages importance.
     * @param additionalArguments - Additional values to print.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    log(object?: unknown, force?: boolean, avoidAnnotation?: boolean, level?: Level, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    info(object?: unknown, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    debug(object?: unknown, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    error(object?: unknown, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    critical(object?: unknown, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    warn(object?: unknown, ...additionalArguments: Array<unknown>): Promise<void>;
    /**
     * Dumps a given object in a human-readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */
    static show(object: unknown, level?: number, currentLevel?: number): string;
}
export default Logger;

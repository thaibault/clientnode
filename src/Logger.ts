// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Logger */
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
import {$, NOOP} from './context'
import {isNumeric} from './indicators'
import {determineType} from './object'
import {format} from './string'
import {LoggerOptions, Mapping} from './type'

export const LEVELS = [
    'debug',
    'info',
    'warn',
    'warning',
    'critical',
    'error'
] as const

export type Level = typeof LEVELS[number]
/**
 * This plugin provides such interface logic like generic controller logic for
 * integrating plugins into $, mutual exclusion for dependent gui elements,
 * logging additional string, array or function handling. A set of helper
 * functions to parse  option objects dom trees or handle events is also
 * provided.
 * @property level - Logging level.
 * @property name - Logger description.
 */
export class Logger {
    static defaultLevel: Level = 'info'
    static defaultName = 'app'
    static instances: Array<Logger> = []

    /**
     * Configures all logger instances.
     * @param options - Options to set.
     */
    static configureAllInstances(options: Partial<LoggerOptions> = {}) {
        for (const logger of Logger.instances)
            logger.configure(options)
    }

    level: Level = Logger.defaultLevel
    name = Logger.defaultName

    /**
     * Initializes logger.
     * @param options - Options to set.
     */
    constructor(options: Partial<LoggerOptions> = {}) {
        this.configure(options)

        Logger.instances.push(this)
    }
    /**
     * Configures logger.
     * @param options - Options to set.
     * @param options.level - Logging level to configure.
     * @param options.name - Description of the logger instance.
     */
    configure({level, name}: Partial<LoggerOptions>) {
        if (level)
            this.level = level
        else
            this.level = Logger.defaultLevel

        if (name)
            this.name = name
        else
            this.name = Logger.defaultName
    }
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
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    log(
        object: unknown,
        force = false,
        avoidAnnotation = false,
        level: Level = 'info',
        ...additionalArguments: Array<unknown>
    ): void {
        if (force || LEVELS.indexOf(this.level) >= LEVELS.indexOf(level)) {
            let message: unknown

            if (avoidAnnotation)
                message = object
            else if (typeof object === 'string')
                message =
                    `${level}: ${this.name} - ${new Date().toISOString()} - ` +
                    format(object, ...additionalArguments)
            else if (isNumeric(object) || typeof object === 'boolean')
                message =
                    `${level}: ${this.name} - ${new Date().toISOString()} - ` +
                    object.toString()
            else {
                this.log(',--------------------------------------------,')
                this.log(object, force, true)
                this.log(`'--------------------------------------------'`)
            }

            if (message)
                if (
                    !($.global.console && level in $.global.console) ||
                    ($.global.console[level as keyof Console] === NOOP)
                ) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            $.global, 'window'
                        ) &&
                        Object.prototype.hasOwnProperty.call(
                            $.global.window, 'alert'
                        )
                    )
                        $.global.window?.alert(message)
                } else
                    ($.global.console[level as keyof Console] as
                        Console['log']
                    )(message)
        }
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    info(object: unknown, ...additionalArguments: Array<unknown>): void {
        this.log(object, false, false, 'info', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    debug(object: unknown, ...additionalArguments: Array<unknown>): void {
        this.log(object, false, false, 'debug', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    error(object: unknown, ...additionalArguments: Array<unknown>): void {
        this.log(object, true, false, 'error', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    critical(object: unknown, ...additionalArguments: Array<unknown>) {
        this.log(object, true, false, 'warn', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     */
    warn(object: unknown, ...additionalArguments: Array<unknown>) {
        this.log(object, false, false, 'warn', ...additionalArguments)
    }
    /**
     * Dumps a given object in a human-readable format.
     * @param object - Any object to show.
     * @param level - Number of levels to dig into given object recursively.
     * @param currentLevel - Maximal number of recursive function calls to
     * represent given object.
     * @returns Returns the serialized version of given object.
     */
    static show(
        object: unknown, level = 3, currentLevel = 0
    ): string {
        let output = ''

        if (determineType(object) === 'object') {
            for (const [key, value] of Object.entries(
                object as Mapping<unknown>
            )) {
                output += `${key}: `

                if (currentLevel <= level)
                    output += Logger.show(value, level, currentLevel + 1)
                else
                    output += String(value)

                output += '\n'
            }

            return output.trim()
        }

        output = String(object).trim()

        return `${output} (Type: "${determineType(object)}")`
    }
}
export default Logger

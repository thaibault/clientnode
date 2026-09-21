// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Logger */
'use strict'
/* !
    region header
    [Project page](https://tsickert.com/clientnode)

    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {LoggerOptions, Mapping} from './type'

import {CLI_COLOR} from './cli'
import {globalContext, NOOP} from './context'
import {isNumeric} from './indicators'
import {determineType} from './object'

export const LEVELS = [
    'error',
    'critical',
    'warn',
    'info',
    'debug'
] as const
export const LEVELS_COLOR = [
    CLI_COLOR.red,
    CLI_COLOR.magenta,
    CLI_COLOR.yellow,
    CLI_COLOR.green,
    CLI_COLOR.blue
]

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
    static defaultLevel: Level = 'warn'
    static defaultName = 'app'

    static selfClass = Logger
    static instances: Mapping<Logger> = {}

    static runtimeVersion = Math.random()

    /**
     * Configures all logger instances.
     * @param options - Options to set.
     */
    static configureAllInstances(options: Partial<LoggerOptions> = {}) {
        if (options.level)
            Logger.defaultLevel = options.level

        if (options.name)
            Logger.defaultName = options.name

        for (const logger of Object.values(Logger.instances))
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

        Logger.instances[this.name] = this
    }
    /**
     * Configures logger.
     * @param options - Options to set.
     * @param options.name - Description of the logger instance.
     * @param options.level - Logging level to configure.
     */
    configure({name, level}: Partial<LoggerOptions>) {
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
     * @param additionalArguments - Additional values to print.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    async log(
        object: unknown = '',
        force = false,
        avoidAnnotation = false,
        level: Level = 'info',
        ...additionalArguments: Array<unknown>
    ): Promise<void> {
        const currentLevelIndex = LEVELS.indexOf(this.level)
        const levelIndex = LEVELS.indexOf(level)

        if (force || currentLevelIndex >= levelIndex) {
            const messages: Array<unknown> = []
            const annotation =
                `${LEVELS_COLOR[levelIndex]}${level}` +
                `${CLI_COLOR.default}:${this.name}:` +
                `${new Date().toISOString()}:`

            if (avoidAnnotation)
                messages.push(object)
            else if (typeof object === 'string')
                messages.push(annotation, object, ...additionalArguments)
            else if (isNumeric(object) || typeof object === 'boolean')
                messages.push(
                    annotation, object.toString(), ...additionalArguments
                )
            else {
                const multiLineAnnotation =
                    annotation.substring(0, annotation.length - 1)
                const lineLength = 79 - 2
                // Color codes are invisible so we have to add it.
                const remainingLength =
                    lineLength +
                    LEVELS_COLOR[levelIndex].length +
                    CLI_COLOR.default.length -
                    multiLineAnnotation.length
                const halfRemainingLength = Math.floor(remainingLength / 2)

                await this.log(
                    (
                        `,${'-'.repeat(halfRemainingLength)}` +
                        multiLineAnnotation +
                        '-'.repeat(halfRemainingLength) +
                        `${'-'.repeat(remainingLength % 2)},`
                    ),
                    force,
                    true,
                    level
                )
                await this.log(object, force, true, level)
                await this.log(
                    `'${'-'.repeat(lineLength)}'`,
                    force,
                    true,
                    level
                )
            }

            if (messages.length)
                if (
                    !(
                        globalContext.console &&
                        level in globalContext.console
                    ) ||
                    (globalContext.console[level as keyof Console] === NOOP)
                ) {
                    if (
                        Object.prototype.hasOwnProperty.call(
                            globalContext, 'window'
                        ) &&
                        Object.prototype.hasOwnProperty.call(
                            globalContext.window, 'alert'
                        )
                    )
                        globalContext.window?.alert(messages.join(' '))
                /*
                    eslint-disable @typescript-eslint/no-unnecessary-condition
                */
                } else if (typeof process !== 'undefined' && process.stdout)
                /*
                    eslint-enable @typescript-eslint/no-unnecessary-condition
                */
                    await new Promise(
                        (
                            resolve: (value?: undefined) => void,
                            reject: (error: Error) => void
                        ) => {
                            process.stdout.write(
                                `${messages.map(String).join(' ')}\n`,
                                (error?: unknown) => {
                                    if (error)
                                        /*
                                            eslint-disable
                                            prefer-promise-reject-errors
                                        */
                                        reject(error as Error)
                                        /*
                                            eslint-enable
                                            prefer-promise-reject-errors
                                        */
                                    else
                                        resolve()
                                }
                            )
                        })
                else
                    (globalContext.console[level as keyof Console] as
                        Console['log']
                    )(...messages)
        }
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    info(
        object: unknown = '', ...additionalArguments: Array<unknown>
    ): Promise<void> {
        return this.log(object, false, false, 'info', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    debug(
        object: unknown = '', ...additionalArguments: Array<unknown>
    ): Promise<void> {
        return this.log(object, false, false, 'debug', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    error(
        object: unknown = '', ...additionalArguments: Array<unknown>
    ): Promise<void> {
        return this.log(object, true, false, 'error', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    critical(
        object: unknown = '', ...additionalArguments: Array<unknown>
    ): Promise<void> {
        return this.log(object, true, false, 'warn', ...additionalArguments)
    }
    /**
     * Wrapper method for the native console method usually provided by
     * interpreter.
     * @param object - Any object to print.
     * @param additionalArguments - Additional arguments are used for string
     * formatting.
     * @returns Returns a promise which resolves when the log message has been
     * printed.
     */
    warn(
        object: unknown = '', ...additionalArguments: Array<unknown>
    ): Promise<void> {
        return this.log(object, false, false, 'warn', ...additionalArguments)
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

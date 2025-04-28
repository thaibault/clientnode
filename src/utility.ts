// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module utility */
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
import {NOOP} from './context'
import {isFunction} from './indicators'
import {AnyFunction, ProcedureFunction, TimeoutPromise} from './type'

/**
 * Prevents event functions from triggering to often by defining a minimal
 * span between each function call. Additional arguments given to this
 * function will be forwarded to given event function call.
 * @param callback - The function to call debounced.
 * @param thresholdInMilliseconds - The minimum time span between each
 * function call.
 * @param additionalArguments - Additional arguments to forward to given
 * function.
 * @returns Returns the wrapped method.
 */
export const debounce = <T = unknown>(
    callback: (...parameters: Array<unknown>) => T,
    thresholdInMilliseconds = 600,
    ...additionalArguments: Array<unknown>
): ((...parameters: Array<unknown>) => Promise<T>) => {
    let timeoutPromise: TimeoutPromise | undefined

    let nextResultPromiseResolver: (value: T) => void
    let nextResultPromise = new Promise<T>((resolve) => {
        nextResultPromiseResolver = resolve
    })

    return (...parameters: Array<unknown>) => {
        parameters = parameters.concat(additionalArguments)

        timeoutPromise?.clear()

        timeoutPromise = timeout(
            () => {
                nextResultPromiseResolver(callback(...parameters))

                nextResultPromise = new Promise<T>((resolve) => {
                    nextResultPromiseResolver = resolve
                })
            },
            thresholdInMilliseconds
        )

        return nextResultPromise
    }
}
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
export const timeout = (...parameters: Array<unknown>): TimeoutPromise => {
    let callback: AnyFunction = NOOP
    let delayInMilliseconds = 0
    let throwOnTimeoutClear = false

    for (const value of parameters)
        if (typeof value === 'number' && !isNaN(value))
            delayInMilliseconds = value
        else if (typeof value === 'boolean')
            throwOnTimeoutClear = value
        else if (isFunction(value))
            callback = value

    let rejectCallback: (_reason: true) => void
    let resolveCallback: (_value: boolean) => void

    const result: TimeoutPromise = new Promise<boolean>((
        resolve: (_value: boolean) => void, reject: (_reason: true) => void
    ) => {
        rejectCallback = reject
        resolveCallback = resolve
    }) as TimeoutPromise

    const wrappedCallback: ProcedureFunction = () => {
        callback.call(result, ...parameters)
        resolveCallback(false)
    }
    const maximumTimeoutDelayInMilliseconds = 2147483647

    if (delayInMilliseconds <= maximumTimeoutDelayInMilliseconds)
        result.timeoutID = setTimeout(wrappedCallback, delayInMilliseconds)
    else {
        /*
            Determine the number of times we need to delay by maximum
            possible timeout duration.
        */
        let numberOfRemainingTimeouts: number = Math.floor(
            delayInMilliseconds / maximumTimeoutDelayInMilliseconds
        )
        const finalTimeoutDuration: number =
            delayInMilliseconds % maximumTimeoutDelayInMilliseconds

        const delay = () => {
            if (numberOfRemainingTimeouts > 0) {
                numberOfRemainingTimeouts -= 1

                result.timeoutID =
                    setTimeout(delay, maximumTimeoutDelayInMilliseconds) as
                        unknown as
                        NodeJS.Timeout
            } else
                result.timeoutID =
                    setTimeout(wrappedCallback, finalTimeoutDuration)
        }
        delay()
    }

    result.clear = () => {
        if (Object.prototype.hasOwnProperty.call(result, 'timeoutID')) {
            clearTimeout(result.timeoutID)
            ;(throwOnTimeoutClear ? rejectCallback : resolveCallback)(true)
        }
    }

    return result
}

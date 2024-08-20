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
import {
    AnyFunction, ProcedureFunction, TimeoutPromise, UnknownFunction
} from './type'

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
    callback:UnknownFunction,
    thresholdInMilliseconds = 600,
    ...additionalArguments:Array<unknown>
):((...parameters:Array<unknown>) => Promise<T>) => {
    let waitForNextSlot = false
    let parametersForNextSlot:Array<unknown>|null = null
    // NOTE: Type "T" will be added via "then" method when called.
    let resolveNextSlotPromise:(value:T) => void
    let rejectNextSlotPromise:(reason:unknown) => void
    let nextSlotPromise:Promise<T> = new Promise<T>((
        resolve:(value:T) => void, reject:(reason:unknown) => void
    ) => {
        resolveNextSlotPromise = resolve
        rejectNextSlotPromise = reject
    })

    return (...parameters:Array<unknown>):Promise<T> => {
        parameters = parameters.concat(additionalArguments)

        if (waitForNextSlot) {
            /*
                NOTE: We have to reserve next time slot let given callback
                be called with latest known provided arguments.
            */
            parametersForNextSlot = parameters

            return nextSlotPromise
        }

        waitForNextSlot = true

        const currentSlotPromise:Promise<T> = nextSlotPromise
        const resolveCurrentSlotPromise = resolveNextSlotPromise
        const rejectCurrentSlotPromise = rejectNextSlotPromise

        // NOTE: We call callback synchronously if possible.
        const result:Promise<T>|T = callback(...parameters) as Promise<T>|T

        if (result && Object.prototype.hasOwnProperty.call(result, 'then'))
            (result as Promise<T>).then(
                (result:T) => {
                    resolveCurrentSlotPromise(result)
                },
                (reason:unknown) => {
                    rejectCurrentSlotPromise(reason)
                }
            )
        else
            resolveCurrentSlotPromise(result as T)

        /*
            Initialize new promise which will be used for next call request
            and is marked as delayed.
        */
        nextSlotPromise = new Promise<T>((
            resolve:(value:T) => void, reject:(reason:unknown) => void
        ):void => {
            resolveNextSlotPromise = resolve
            rejectNextSlotPromise = reject

            // Initialize new time slot to trigger given callback.
            void timeout(
                thresholdInMilliseconds,
                ():void => {
                    /*
                        Next new incoming call request can be handled
                        synchronously.
                    */
                    waitForNextSlot = false

                    // NOTE: Check if this slot should be used.
                    if (parametersForNextSlot) {
                        const result:Promise<T>|T =
                            callback(...parametersForNextSlot) as
                                Promise<T>|T
                        parametersForNextSlot = null

                        if (
                            result &&
                            Object.prototype.hasOwnProperty.call(
                                result, 'then'
                            )
                        )
                            (result as Promise<T>).then(
                                (result:T) => {
                                    resolve(result)
                                },
                                (reason:unknown) => {
                                    reject(reason)
                                }
                            )
                        else
                            resolve(result as T)

                        /*
                            Initialize new promise which will be used for
                            next call request without waiting.
                        */
                        nextSlotPromise = new Promise<T>((
                            resolve:(value:T) => void,
                            reject:(reason:unknown) => void
                        ):void => {
                            resolveNextSlotPromise = resolve
                            rejectNextSlotPromise = reject
                        })
                    }
                }
            )
        })

        return currentSlotPromise
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
export const timeout = (...parameters:Array<unknown>):TimeoutPromise => {
    let callback:AnyFunction = NOOP
    let delayInMilliseconds = 0
    let throwOnTimeoutClear = false

    for (const value of parameters)
        if (typeof value === 'number' && !isNaN(value))
            delayInMilliseconds = value
        else if (typeof value === 'boolean')
            throwOnTimeoutClear = value
        else if (isFunction(value))
            callback = value

    let rejectCallback:(_reason:true) => void
    let resolveCallback:(_value:boolean) => void

    const result:TimeoutPromise = new Promise<boolean>((
        resolve:(_value:boolean) => void, reject:(_reason:true) => void
    ):void => {
        rejectCallback = reject
        resolveCallback = resolve
    }) as TimeoutPromise

    const wrappedCallback:ProcedureFunction = ():void => {
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
        let numberOfRemainingTimeouts:number = Math.floor(
            delayInMilliseconds / maximumTimeoutDelayInMilliseconds
        )
        const finalTimeoutDuration:number =
            delayInMilliseconds % maximumTimeoutDelayInMilliseconds

        const delay = ():void => {
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

    result.clear = ():void => {
        if (Object.prototype.hasOwnProperty.call(result, 'timeoutID')) {
            clearTimeout(result.timeoutID)
            ;(throwOnTimeoutClear ? rejectCallback : resolveCallback)(true)
        }
    }

    return result
}

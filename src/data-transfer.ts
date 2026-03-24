// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module data-transfer */
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
import {isObject} from './indicators'
import {globalContext} from './context'
import {extend} from './object'
import {
    CheckReachabilityOptions, RecursivePartial, TimeoutPromise
} from './type'
import {timeout} from './utility'

/**
 * Checks if given url response with given status code.
 * @param url - Url to check reachability.
 * @param givenOptions - Options to configure.
 * @param givenOptions.wait - Boolean indicating if we should retry until a
 * status code will be given.
 * @param givenOptions.statusCodes - Status codes to check for.
 * @param givenOptions.timeoutInSeconds - Delay after assuming given resource
 * isn't available if no response is coming.
 * @param givenOptions.pollIntervallInSeconds - Seconds between two tries to
 * reach given url.
 * @param givenOptions.options - Fetch options to use.
 * @param givenOptions.expectedIntermediateStatusCodes - A list of expected but
 * unwanted response codes. If detecting them waiting will continue until an
 * expected (positive) code occurs or timeout is reached.
 * @returns A promise which will be resolved if a request to given url has
 * finished and resulting status code matches given expected status code.
 * Otherwise, returned promise will be rejected.
 */
export const checkReachability = async (
    url: string,
    givenOptions: RecursivePartial<CheckReachabilityOptions> = {}
): ReturnType<typeof fetch> => {
    if (!globalContext.fetch)
        throw new Error('Missing fetch implementation available.')

    const abortController: AbortController =
        givenOptions.abortController as AbortController | undefined ??
        new AbortController()
    const options: CheckReachabilityOptions = extend(
        true,
        {
            expectedIntermediateStatusCodes: [],
            options: {signal: abortController.signal},
            pollIntervallInSeconds: 0.1,
            statusCodes: 200,
            timeoutInSeconds: 10,
            wait: false
        },
        givenOptions
    )

    const statusCodes: Array<number> =
        ([] as Array<number>).concat(options.statusCodes)
    const expectedIntermediateStatusCodes: Array<number> =
        ([] as Array<number>)
            .concat(options.expectedIntermediateStatusCodes)

    const isStatusCodeExpected = (
        response: Response, statusCodes: Array<number>
    ): boolean =>
        'status' in response &&
        statusCodes.includes(response.status)

    const checkAndThrow = (response: Response): Response => {
        if (!isStatusCodeExpected(response, statusCodes))
            throw new Error(
                `Given status code ${String(response.status)} ` +
                `differs from ${statusCodes.join(', ')}.`
            )

        return response
    }

    if (options.wait)
        return new Promise<Response>((
            resolve: (response: Response) => void,
            reject: (reason: Error) => void
        ): void => {
            let timedOut = false
            const timer: TimeoutPromise =
                timeout(options.timeoutInSeconds * 1000)

            const retryErrorHandler = (error: Error): Error => {
                if (!timedOut) {
                    currentlyRunningTimer = timeout(
                        options.pollIntervallInSeconds * 1000, wrapper
                    )
                    /*
                        NOTE: A timer rejection is expected. Avoid throwing
                        errors about unhandled promise rejections.
                    */
                    currentlyRunningTimer.catch(() => {
                        // Do nothing regardless of an error.
                    })
                }

                return error
            }

            const wrapper = async (): Promise<Error | Response> => {
                let response: Response
                try {
                    /* eslint-disable @typescript-eslint/no-unsafe-call */
                    response = await globalContext.fetch(url, options.options)
                    /* eslint-enable @typescript-eslint/no-unsafe-call */
                } catch (error) {
                    return retryErrorHandler(error as Error)
                }

                try {
                    resolve(checkAndThrow(response))
                    timer.clear()
                } catch (error) {
                    if (isStatusCodeExpected(
                        response, expectedIntermediateStatusCodes
                    ))
                        return retryErrorHandler(error as Error)

                    /* eslint-disable prefer-promise-reject-errors */
                    reject(error as Error)
                    /* eslint-enable prefer-promise-reject-errors */
                    timer.clear()
                }

                return response
            }

            let currentlyRunningTimer = timeout(wrapper)

            timer.then(
                () => {
                    timedOut = true
                    currentlyRunningTimer.clear()

                    reject(new Error(
                        `Timeout of ${String(options.timeoutInSeconds)} ` +
                        'seconds reached.'
                    ))

                    abortController.abort()
                },
                () => {
                    // Do nothing.
                }
            )
        })

    return checkAndThrow(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await globalContext.fetch(url, options.options) as Response
    )
}
/**
 * Checks if given url isn't reachable.
 * @param url - Url to check reachability.
 * @param givenOptions - Options to configure.
 * @param givenOptions.wait - Boolean indicating if we should retry until a
 * status code will be given.
 * @param givenOptions.timeoutInSeconds - Delay after assuming given resource
 * will stay available.
 * @param givenOptions.pollIntervallInSeconds - Seconds between two tries to
 * reach given url.
 * @param givenOptions.statusCodes - Status codes to check for.
 * @param givenOptions.options - Fetch options to use.
 * @returns A promise which will be resolved if a request to given url couldn't
 * be finished. Otherwise, returned promise will be rejected. If "wait" is set
 * to "true" we will resolve to another promise still resolving when final
 * timeout is reached or the endpoint is unreachable (after some tries).
 */
export const checkUnreachability = async (
    url: string, givenOptions: RecursivePartial<CheckReachabilityOptions> = {}
): Promise<Error | null | Promise<Error | null>> => {
    if (!globalContext.fetch)
        throw new Error('Missing fetch implementation available.')

    const abortController: AbortController =
        givenOptions.abortController as AbortController | undefined ??
        new AbortController()
    const options: CheckReachabilityOptions = extend(
        true,
        {
            options: {signal: abortController.signal},
            pollIntervallInSeconds: 0.1,
            statusCodes: [],
            timeoutInSeconds: 10,
            wait: false
        },
        givenOptions
    )

    const check = (response: null | Response): Error | null => {
        const statusCodes: Array<number> =
            ([] as Array<number>).concat(options.statusCodes)
        if (statusCodes.length) {
            if (
                isObject(response) &&
                'status' in response &&
                statusCodes.includes(response.status)
            )
                throw new Error(
                    `Given url "${url}" is reachable and responses with ` +
                    `status code "${String(response.status)}".`
                )

            return new Error(
                `Given status code is not "${statusCodes.join(', ')}".`
            )
        }

        return null
    }

    if (options.wait)
        return new Promise<Error | null | Promise<Error | null>>((
            resolve: (value: Error | null) => void,
            reject: (reason: Error) => void
        ): void => {
            let timedOut = false

            const wrapper = async (): Promise<Error | Response | null> => {
                try {
                    const response: Response =
                        /* eslint-disable @typescript-eslint/no-unsafe-call */
                        await globalContext.fetch(url, options.options)
                        /* eslint-enable @typescript-eslint/no-unsafe-call */

                    if (timedOut)
                        return response

                    const result: Error | null = check(response)
                    if (result) {
                        timer.clear()
                        resolve(result)

                        return result
                    }

                    currentlyRunningTimer = timeout(
                        options.pollIntervallInSeconds * 1000, wrapper
                    )

                    /*
                        NOTE: A timer rejection is expected. Avoid throwing
                        errors about unhandled promise rejections.
                    */
                    currentlyRunningTimer.catch(() => {
                        // Do nothing regardless of an error.
                    })
                } catch (error) {
                    timer.clear()
                    resolve(error as Error)

                    return error as Error
                }

                return null
            }

            let currentlyRunningTimer = timeout(wrapper)
            const timer = timeout(options.timeoutInSeconds * 1000)

            timer.then(
                () => {
                    timedOut = true

                    currentlyRunningTimer.clear()

                    reject(new Error(
                        `Timeout of ${String(options.timeoutInSeconds)} ` +
                        'seconds reached.'
                    ))

                    abortController.abort()
                },
                () => {
                    // Do nothing.
                }
            )
        })

    try {
        const result: Error | null =
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            check(await globalContext.fetch(url, options.options) as Response)

        if (result)
            return result
    } catch (error) {
        return error as Error
    }

    throw new Error(`Given url "${url}" is reachable.`)
}
/**
 * Preloads a given url via a temporary created image element.
 * @param url - To image which should be downloaded.
 * @returns A Promise indicating whether the image was loaded.
 */
export const cacheImage = (url: string) => {
    return new Promise<void>((resolve, reject) => {
        const imageElement = document.createElement('img')
        imageElement.onload = () => {
            const isLoaded = imageElement.complete
            imageElement.remove()
            if (isLoaded)
                resolve()
            else
                reject(new Error('Image could not be loaded.'))
        }
        imageElement.src = url
    })
}

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
    $T,
    CheckReachabilityOptions,
    Mapping,
    RecursivePartial,
    TimeoutPromise
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

    const options: CheckReachabilityOptions = extend(
        true,
        {
            expectedIntermediateStatusCodes: [],
            options: {},
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
    ): boolean => Boolean(
        'status' in response &&
        statusCodes.includes(response.status)
    )

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
                    // @ts-expect-error We already catch the error.
                    response = await globalContext.fetch(url, options.options)
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
                },
                () => {
                    // Do nothing.
                }
            )
        })

    return checkAndThrow(await globalContext.fetch(url, options.options))
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

    const options: CheckReachabilityOptions = extend(
        true,
        {
            wait: false,
            timeoutInSeconds: 10,
            pollIntervallInSeconds: 0.1,
            statusCodes: [],
            options: {}
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
                        // @ts-expect-error We already catch the error.
                        await globalContext.fetch(url, options.options)

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
                },
                () => {
                    // Do nothing.
                }
            )
        })

    try {
        const result: Error | null =
            check(await globalContext.fetch(url, options.options))

        if (result)
            return result
    } catch (error) {
        return error as Error
    }

    throw new Error(`Given url "${url}" is reachable.`)
}
/**
 * Send given data to a given iframe.
 * @param target - Name of the target iframe or the target iframe itself.
 * @param url - URL to send to data to.
 * @param data - Data holding object to send data to.
 * @param requestType - The forms action attribute value. If nothing is
 * provided "post" will be used as default.
 * @param removeAfterLoad - Indicates if created iframe should be removed right
 * after load event. Only works if an iframe object is given instead of a
 * simple target name.
 * @returns Returns the given target as extended dom node.
 */
export const sendToIFrame = (
    target: $T<HTMLIFrameElement> | HTMLIFrameElement | string,
    url: string,
    data: Mapping<unknown>,
    requestType = 'post',
    removeAfterLoad = false
): $T<HTMLIFrameElement> => {
    const $targetDomNode: $T<HTMLIFrameElement> =
    (typeof target === 'string') ?
        $<HTMLIFrameElement>(`iframe[name"${target}"]`) :
        $(target as HTMLIFrameElement)

    const $formDomNode: $T<HTMLFormElement> =
        $<HTMLFormElement>('<form>').attr({
            action: url,
            method: requestType,
            target: $targetDomNode.attr('name')
        })

    for (const [name, value] of Object.entries(data))
        $formDomNode.append(
            $<HTMLInputElement>('<input>')
                .attr({name, type: 'hidden', value}) as
                unknown as
                JQuery.Node
        )

    /*
        NOTE: The given target form have to be injected into document
        object model to successfully submit.
    */
    if (removeAfterLoad)
        $targetDomNode.on('load', (): $T<HTMLIFrameElement> =>
            $targetDomNode.remove()
        )

    $formDomNode.insertAfter($targetDomNode as unknown as JQuery.Node)
    $formDomNode[0].submit()
    $formDomNode.remove()

    return $targetDomNode
}
/**
 * Send given data to a temporary created iframe.
 * @param url - URL to send to data to.
 * @param data - Data holding object to send data to.
 * @param requestType - The forms action attribute value. If nothing is
 * provided "post" will be used as default.
 * @param removeAfterLoad - Indicates if created iframe should be removed right
 * after load event.
 * @param domNode - Optional dom node to append dynamically created iframe to.
 * @returns Returns the dynamically created iframe.
 */
export const sendToExternalURL = (
    url: string,
    data: Mapping<unknown>,
    requestType = 'post',
    removeAfterLoad = true,
    domNode: HTMLElement | null = null
): $T<HTMLIFrameElement> => {
    const $iFrameDomNode: $T<HTMLIFrameElement> =
        $<HTMLIFrameElement>('<iframe>')
            .attr('name', `clientnode-${String((new Date()).getTime())}`)
            .hide()

    if (domNode)
        domNode.append($iFrameDomNode as unknown as JQuery.Node)

    sendToIFrame($iFrameDomNode, url, data, requestType, removeAfterLoad)

    return $iFrameDomNode
}

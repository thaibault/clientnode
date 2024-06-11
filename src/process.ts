// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module process */
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
import {NOOP} from './constants'
import {
    AnyFunction,
    ProcessCloseCallback, ProcessError,
    ProcessErrorCallback,
    ProcessHandler
} from './type'
import {ChildProcess} from 'child_process'

/**
 * Generates a one shot close handler which triggers given promise methods.
 * If a reason is provided it will be given as resolve target. An Error will be
 * generated if return code is not zero. The generated Error has a property
 * "returnCode" which provides corresponding process return code.
 * @param resolve - Promise's resolve function.
 * @param reject - Promise's reject function.
 * @param reason - Promise target if process has a zero return code.
 * @param callback - Optional function to call of process has successfully
 * finished.
 * @returns Process close handler function.
 */
export const getProcessCloseHandler = (
    resolve:ProcessCloseCallback,
    reject:ProcessErrorCallback,
    reason:unknown = null,
    callback:AnyFunction = NOOP
):ProcessHandler => {
    let finished = false

    return (returnCode:unknown, ...parameters:Array<unknown>):void => {
        if (finished)
            finished = true
        else {
            finished = true
            if (typeof returnCode !== 'number' || returnCode === 0) {
                callback()
                resolve({reason, parameters})
            } else {
                const error =
                    new Error(`Task exited with error code ${returnCode}`) as
                        ProcessError

                error.returnCode = returnCode
                error.parameters = parameters

                reject(error)
            }
        }
    }
}
/**
 * Forwards given child process communication channels to corresponding current
 * process communication channels.
 * @param childProcess - Child process meta data.
 * @returns Given child process meta data.
 */
export const handleChildProcess = (childProcess:ChildProcess):ChildProcess => {
    if (childProcess.stdout)
        childProcess.stdout.pipe(process.stdout)
    if (childProcess.stderr)
        childProcess.stderr.pipe(process.stderr)

    childProcess.on('close', (returnCode:number):void => {
        if (returnCode !== 0)
            console.error(`Task exited with error code ${returnCode}`)
    })

    return childProcess
}
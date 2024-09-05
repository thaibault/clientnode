// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Lock */
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
import {LockCallbackFunction, Mapping} from './type'

/**
 * Represents the lock state.
 * @property locks - Mapping of lock descriptions to there corresponding
 * callbacks.
 */
export class Lock<Type = string|undefined> {
    locks:Mapping<Array<LockCallbackFunction<Type>>>
    /**
     * Initializes locks.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     */
    constructor(locks:Mapping<Array<LockCallbackFunction<Type>>> = {}) {
        this.locks = locks
    }
    /**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be binded to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callback - A procedure which should only be executed if the
     * interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns a promise which will be resolved after releasing lock.
     */
    acquire(
        description:string,
        callback?:LockCallbackFunction<Type>,
        autoRelease = false
    ):Promise<Type> {
        return new Promise<Type>((resolve:(value:Type) => void):void => {
            const wrappedCallback:LockCallbackFunction<Type> = (
                description:string
            ):Promise<Type>|Type => {
                let result:Promise<Type>|Type|undefined
                if (callback)
                    result = callback(description)

                const finish = (value:Type):Type => {
                    if (autoRelease)
                        void this.release(description)

                    resolve(value)

                    return value
                }

                if ((result as null|Promise<Type>)?.then)
                    return (result as Promise<Type>).then(finish)

                finish(result as Type)

                return result as Type
            }

            if (Object.prototype.hasOwnProperty.call(this.locks, description))
                this.locks[description].push(wrappedCallback)
            else {
                this.locks[description] = []

                void wrappedCallback(description)
            }
        })
    }
    /**
     * Calling this method  causes the given critical area to be finished and
     * all functions given to "acquire()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquire" method.
     */
    async release(description:string):Promise<Type|undefined> {
        if (Object.prototype.hasOwnProperty.call(this.locks, description)) {
            const callback:LockCallbackFunction<Type>|undefined =
                this.locks[description].shift()

            if (callback === undefined)
                delete this.locks[description]
            else
                return await callback(description)
        }
    }
}

export default Lock

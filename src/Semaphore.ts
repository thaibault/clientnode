// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module Semaphore */
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
import {AnyFunction} from './type'

/**
 * Represents the semaphore state.
 * @property queue - List of waiting resource requests.
 * @property numberOfFreeResources - Number free allowed concurrent resource
 * uses.
 * @property numberOfResources - Number of allowed concurrent resource uses.
 */
export class Semaphore {
    queue:Array<AnyFunction> = []

    numberOfResources:number
    numberOfFreeResources:number
    /**
     * Initializes number of resources.
     * @param numberOfResources - Number of resources to manage.
     */
    constructor(numberOfResources = 2) {
        this.numberOfResources = numberOfResources
        this.numberOfFreeResources = numberOfResources
    }
    /**
     * Acquires a new resource and runs given callback if available.
     * @returns A promise which will be resolved if requested resource is
     * available.
     */
    acquire():Promise<number> {
        return new Promise<number>((resolve:(_value:number) => void):void => {
            if (this.numberOfFreeResources <= 0)
                this.queue.push(resolve)
            else {
                this.numberOfFreeResources -= 1

                resolve(this.numberOfFreeResources)
            }
        })
    }
    /**
     * Releases a resource and runs a waiting resolver if there exists some.
     */
    release():void {
        const callback:AnyFunction|undefined = this.queue.pop()
        if (callback === undefined)
            this.numberOfFreeResources += 1
        else
            callback(this.numberOfFreeResources)
    }
}

export default Semaphore

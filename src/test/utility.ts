// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stand under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import {expect, jest, test} from '@jest/globals'
import {debounce, timeout} from '../utility'
import {TimeoutPromise} from '../type'

test('debounce', ():void => {
    let testValue = false
    void debounce(() => {
        testValue = true
    })()
    expect(testValue).toStrictEqual(true)

    const callback = jest.fn()
    const debouncedCallback = debounce(callback, 1000)
    void debouncedCallback()
    void debouncedCallback()
    expect(callback).toHaveBeenCalledTimes(1)

    const debouncedAsyncronousCallback =
        debounce(async ():Promise<boolean> => {
            await timeout()

            return true
        })
    expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
    expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
    expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
})
test('timeout', async ():Promise<void> => {
    expect(await timeout()).toStrictEqual(false)
    expect(await timeout(0)).toStrictEqual(false)
    expect(await timeout(1)).toStrictEqual(false)
    expect(timeout()).toBeInstanceOf(Promise)
    expect(timeout()).toHaveProperty('clear')

    const callback = jest.fn()

    const result:TimeoutPromise = timeout(10 ** 20, true)
    result.catch(callback)
    result.clear()
    await timeout()
    expect(callback).toHaveBeenCalledTimes(1)
    expect(callback).toHaveBeenLastCalledWith(true)

    expect(await timeout(callback)).toStrictEqual(false)
    expect(callback).toHaveBeenCalledTimes(2)
})
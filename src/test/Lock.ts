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
import {expect, test} from '@jest/globals'
import Lock from '../Lock'
import {timeout} from '../utility'

test('acquire|release', async ():Promise<void> => {
    const lock = new Lock()
    const anotherLock = new Lock()

    let testValue = 'a'
    await lock.acquire('test', () => {
        testValue = 'b'
    })
    expect(testValue).toStrictEqual('b')
    expect(lock.acquire(
        'test',
        ()=> {
            testValue = 'a'
        }
    )).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('b')
    expect(anotherLock.release('test')).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('b')
    expect(lock.release('test')).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('a')
    expect(lock.release('test')).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('a')
    await lock.acquire('test', () => {
        testValue = 'b'
    })
    expect(testValue).toStrictEqual('b')
    expect(lock.acquire(
        'test',
        () => {
            testValue = 'a'
        }
    )).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('b')
    expect(lock.acquire(
        'test',
        () => {
            testValue = 'b'
        }
    )).toBeInstanceOf(Promise)
    expect(testValue).toStrictEqual('b')
    await lock.release('test')
    expect(testValue).toStrictEqual('a')
    await lock.release('test')
    expect(testValue).toStrictEqual('b')
    const promise:Promise<void> = lock.acquire('test').then(
        async (result:string|void):Promise<void> => {
            expect(result).toStrictEqual('test')
            void timeout(():Promise<string|void> => lock.release('test'))
            result = await lock.acquire('test')
            expect(result).toStrictEqual('test')
            void timeout(():Promise<string|void> =>
                lock.release('test')
            )
            await lock.acquire(
                'test',
                ():Promise<string|void> =>
                    new Promise((resolve:(_value:string) => void) => {
                        void timeout(() => {
                            testValue = 'a'
                            resolve(testValue)
                        })
                    })
            )
            expect(testValue).toStrictEqual('a')
        }
    )
    await lock.release('test')
    await promise
})
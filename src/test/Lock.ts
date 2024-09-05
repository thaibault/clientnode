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

test('acquire|release', async (): Promise<void> => {
    const lock = new Lock<void>()
    const anotherLock = new Lock<void>()

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

    const stringLock = new Lock<string>()
    void stringLock.acquire('test', () => 'result').then(
        async (result: string) => {
            expect(result).toStrictEqual('result')
            void timeout(() => lock.release('test'))
            await stringLock.acquire('test')
            void timeout(() => lock.release('test'))
            await stringLock.acquire(
                'test',
                () =>
                    new Promise<string>((resolve: (value: string) => void) => {
                        void timeout(() => {
                            testValue = 'a'
                            resolve(testValue)
                        })
                    })
            )
            expect(testValue).toStrictEqual('a')
        }
    )
    await stringLock.release('test')
})

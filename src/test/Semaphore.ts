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

import {Semaphore} from '../Semaphore'

test('constructor', (): void => {
    expect(new Semaphore()).toHaveProperty('numberOfResources', 2)
    expect(new Semaphore()).toHaveProperty(
        'numberOfFreeResources', (new Semaphore()).numberOfResources
    )
})
test('acquire/release', async (): Promise<void> => {
    const semaphore1 = new Semaphore()

    expect(semaphore1.numberOfFreeResources).toStrictEqual(2)
    expect(await semaphore1.acquire()).toStrictEqual(1)
    expect(semaphore1.numberOfFreeResources).toStrictEqual(1)

    semaphore1.release()

    expect(semaphore1.numberOfFreeResources).toStrictEqual(2)

    const semaphore2: Semaphore = new Semaphore(2)

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(2)
    expect(semaphore2.numberOfResources).toStrictEqual(2)

    await semaphore2.acquire()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(1)
    expect(semaphore2.numberOfResources).toStrictEqual(2)

    await semaphore2.acquire()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(0)

    void semaphore2.acquire()

    expect(semaphore2.queue.length).toStrictEqual(1)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(0)

    void semaphore2.acquire()

    expect(semaphore2.queue.length).toStrictEqual(2)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(0)
    semaphore2.release()

    expect(semaphore2.queue.length).toStrictEqual(1)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(0)

    semaphore2.release()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(0)

    semaphore2.release()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(1)

    semaphore2.release()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(2)

    semaphore2.release()

    expect(semaphore2.queue.length).toStrictEqual(0)
    expect(semaphore2.numberOfFreeResources).toStrictEqual(3)
})

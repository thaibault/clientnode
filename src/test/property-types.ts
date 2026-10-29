// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]tsickert.com) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
    naming 3.0 unported license.
    See https://creativecommons.org/licenses/by/3.0/deed.de
    endregion
*/
import type {Requireable} from 'prop-types'

import type {UnknownFunction} from '../type'

import {expect, test} from '@jest/globals'

import {createDummy, DummyTypes} from '../property-types'

test('createDummy', () => {
    const dummy = createDummy() as Requireable<unknown>
    expect(dummy).toBeInstanceOf(Function)
    expect((dummy as UnknownFunction)()).toStrictEqual(null)
    expect(dummy.isRequired({}, '', '', '', '')).toStrictEqual(null)

    const error = new Error('test')
    expect((createDummy(error) as UnknownFunction)()).toStrictEqual(error)

    expect(createDummy()).not.toStrictEqual(createDummy())
})
test('DummyTypes', () => {
    expect(DummyTypes.any).not.toStrictEqual(DummyTypes.array)
    expect(DummyTypes.any).toBeInstanceOf(Function)
    expect((DummyTypes.any as UnknownFunction)()).toStrictEqual(null)

    expect(DummyTypes.any).toHaveProperty('isRequired')
    expect((DummyTypes.any as Requireable<unknown>).isRequired)
        .toBeInstanceOf(Function)
    expect(
        ((DummyTypes.any as Requireable<unknown>).isRequired)(
            {}, '', '', '', ''
        )
    ).toStrictEqual(null)

    expect(DummyTypes.arrayOf).toBeInstanceOf(Function)
    expect((DummyTypes.arrayOf as UnknownFunction)())
        .toBeInstanceOf(Function)
    expect(((DummyTypes.arrayOf as UnknownFunction)() as () => null)())
        .toStrictEqual(null)
})

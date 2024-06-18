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
import {Requireable} from 'prop-types'

import {DummyTypes} from '../property-types'
import {UnknownFunction} from '../type'

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

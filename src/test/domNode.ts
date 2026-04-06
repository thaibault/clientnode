// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
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
import {expect, test} from '@jest/globals'

import {fadeIn, fadeOut, getAll, getText} from '../domNode'
import {testEach} from '../test-helper'

declare const TARGET_TECHNOLOGY: string

const TEST_ENVIRONMENT: string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

if (TEST_ENVIRONMENT !== 'node') {
    const divElement = document.createElement('div')

    test('fadeIn', () => {
        expect(fadeIn(divElement)).toBeDefined()
    })

    test('fadeOut', () => {
        expect(fadeOut(divElement)).toBeDefined()
    })

    testEach(
        'getAll',
        getAll,

        [[divElement], divElement]
    )

    testEach(
        'getText',
        getText,

        [[], divElement]
    )
}

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
import {describe} from '@jest/globals'

import {isValue} from '../../expression'
import {testEach} from '../../test-helper'

describe('indicator-functions', () => {
    testEach(
        'isValue',
        isValue,

        [true, 5],
        [true, {}],
        [true, {$value: 2}],
        [true, {$operator: {}}],

        [false, {$operator: {}, operand: 2}],
        [false, {$select: ''}],
        [false, {$switch: []}],
        [true, {$operator: {}}],

        [true, {$mapping: {}}],
        [false, {$mapping: {}, data: []}],

        [false, {$arrayContains: {key: 'foo'}}],
        [false, {$arrayContains: {key: 'foo', value: 'bar'}}],
        [false, {
            $arrayContains: {key: 'foo', value: 'bar', target: {$select: ''}}
        }]
    )
})

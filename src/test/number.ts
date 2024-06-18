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
import {ceil, floor, getUTCTimestamp, isNotANumber, round} from '../number'
import {testEach} from '../test-helper'

const now = new Date()

testEach<typeof getUTCTimestamp>(
    'getUTCTimestamp',
    getUTCTimestamp,

    [0, new Date(0)],
    [0, 0],
    [0.001, new Date(1)],
    [0, new Date(0), true],
    [1, new Date(1000), false],
    [1000, new Date(1000), true],
    [1000, 1000, true],
    [0, new Date(0), false]
)
testEach<typeof isNotANumber>(
    'isNotANumber',
    isNotANumber,

    [true, NaN],
    [false, {}],
    [false, undefined],
    [false, now.toString()],
    [false, null],
    [false, false],
    [false, true],
    [false, 0]
)
testEach<typeof round>(
    'round',
    round,

    [2, 1.5, 0],
    [1, 1.4, 0],
    [0, 1.4, -1],
    [1000, 1000, -2],
    [1000, 999, -2],
    [1000, 950, -2],
    [900, 949, -2],
    [1, 1.2345],
    [1.23, 1.2345, 2],
    [1.235, 1.2345, 3],
    [1.2345, 1.2345, 4],
    [700, 699, -2],
    [700, 650, -2],
    [600, 649, -2]
)
testEach<typeof floor>(
    'floor',
    floor,

    [1, 1.5, 0],
    [1, 1.4, 0],
    [0, 1.4, -1],
    [1000, 1000, -2],
    [900, 999, -2],
    [900, 950, -2],
    [900, 949, -2],
    [1, 1.2345],
    [1.23, 1.2345, 2],
    [1.234, 1.2345, 3],
    [1.2345, 1.2345, 4],
    [600, 699, -2],
    [600, 650, -2],
    [600, 649, -2]
)
testEach<typeof ceil>(
    'ceil',
    ceil,

    [2, 1.5, 0],
    [2, 1.4, 0],
    [10, 1.4, -1],
    [1000, 1000, -2],
    [1000, 999, -2],
    [1000, 950, -2],
    [1000, 949, -2],
    [2, 1.2345],
    [1.24, 1.2345, 2],
    [1.235, 1.2345, 3],
    [1.2345, 1.2345, 4],
    [700, 699, -2],
    [700, 650, -2],
    [700, 649, -2]
)

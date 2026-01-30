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

import {
    dateTimeFormat, interpretDateTime, normalizeDateTime, sliceWeekday
} from '../datetime'
import {testEach} from '../test-helper'

const now = new Date()
const testDate = new Date(0)

testEach<typeof dateTimeFormat>(
    'dateTimeFormat',
    dateTimeFormat,

    ['', ''],
    ['', '', 0],
    ['', '', '1970-01-01T00:00:00.000Z'],
    ['', '', testDate],

    ['1/1/70, 12:00 AM', '${short}', testDate, {timeZone: 'UTC'}],
    ['1/1/70, 12:00 AM', '${short}', 0, {timeZone: 'UTC'}],
    [
        '1/1/70, 12:00 AM',
        '${short}',
        '1970-01-01T00:00:00.000Z',
        {timeZone: 'UTC'}
    ],

    [
        '1.1.1970 12:00:00',
        '${shortDay}.${shortMonth}.${fullYear} ' +
        '${shortHour}:${shortMinute}:${mediumSecond}',
        testDate,
        {timeZone: 'UTC'}
    ],
    [
        '1.1.1970 12:00:00',
        '${shortDay}.${shortMonth}.${fullYear} ' +
        '${shortHour}:${shortMinute}:${mediumSecond}',
        0,
        {timeZone: 'UTC'}
    ],
    [
        '1.1.1970 12:00:00',
        '${shortDay}.${shortMonth}.${fullYear} ' +
        '${shortHour}:${shortMinute}:${mediumSecond}',
        '1970-01-01T00:00:00.000Z',
        {timeZone: 'UTC'}
    ]
)
testEach<typeof interpretDateTime>(
    'interpretDateTime',
    interpretDateTime,

    [null, ''],
    [new Date('1970-01-01T08:30:01.021Z'), '1970-01-01T08:30:01.021Z'],
    [
        new Date('1970-01-01T08:30:01.021Z'),
        '1970-01-01T08:30:01.021Z',
        true
    ],
    [new Date('1970-01-01T08:30:01.001'), '1970-01-01T08:30:01.001'],
    [new Date('1970-01-01T08:30:01.002'), '1970-01-01T08:30:01.002', false],
    [new Date('1970-01-01T08:30:01.003Z'), '1970-01-01T08:30:01.003', true],
    [
        new Date('1970-01-01T08:30:01.001+03:00'),
        '1970-01-01T08:30:01.001+03:00'
    ],
    [
        new Date('1970-01-01T08:30:01.002+03:00'),
        '1970-01-01T08:30:01.002+03:00',
        false
    ],
    [
        new Date('1970-01-01T05:30:01.003Z'),
        '1970-01-01T08:30:01.003+03:00',
        true
    ],
    [new Date('1970-01-01T00:00:00.000'), '1970-01-01'],
    [new Date('1970-01-01T00:00:00.000'), '1970-01-01', false],
    [new Date('1970-01-01T00:00:00.000Z'), '1970-01-01', true],
    [new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, 1)), '1'],
    [new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, -1)), '-1'],
    [new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, 1)), '01'],
    [new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, -1)), '--01'],
    [new Date(1970, 1 - 1, 1, 0, 0, 1), '1', false],
    [new Date(1970, 1 - 1, 1, 0, 0, 1), '01', false],
    [new Date(1970, 1 - 1, 1, 1), '01:00'],
    [new Date(1970, 1 - 1, 1, 1), '01:00 A.M.'],
    [new Date(1970, 1 - 1, 1, 1), '01:00 a.m.'],
    [new Date(1970, 1 - 1, 1, 1), '01:00 am'],
    [new Date(1970, 1 - 1, 1, 14), '02:00 pm'],
    [new Date(1970, 1 - 1, 1, 13), '13:00 pm'],
    [new Date(1970, 1 - 1, 2), '12:00 pm'],
    [new Date(1970, 1 - 1, 1, 14), '02:00 p.m'],
    [new Date(1970, 1 - 1, 1, 14), '02:00 p.m.'],
    [new Date(1970, 1 - 1, 1, 14), '02:00  p.m.'],
    [new Date(1970, 1 - 1, 1, 8, 55), '08:55'],
    [new Date(1970, 1 - 1, 1, 1, 2), '01:02'],
    [new Date(1970, 1 - 1, 1, 1), '01:00:00'],
    [new Date(1970, 1 - 1, 1, 1, 2), '01:02:00'],
    [new Date(1970, 1 - 1, 1, 1, 2, 3), '01:02:03'],
    [new Date(1970, 1 - 1, 1, 1, 2, 3), '01:02:03:0'],
    [new Date(1970, 1 - 1, 1, 1, 2, 3, 4), '01:02:03:4'],
    [new Date(1970, 1 - 1, 1), '1.1.1970'],
    [new Date(1970, 2 - 1, 1), '1.2.1970'],
    [new Date(1970, 1 - 1, 1, 10), '1.1.1970 10'],
    [new Date(1970, 1 - 1, 1, 10, 30), '1.1.1970 10:30'],
    [new Date(1970, 1 - 1, 1, 10, 30, 30), '1.1.1970 10:30:30'],
    [new Date(2014, 11 - 1, 26, 8, 30), '2014-11-26 08:30:00'],
    [new Date(2014, 11 - 1, 26, 8, 30), '2014-11-26T08:30:00'],
    [
        new Date(Date.UTC(2014, 11 - 1, 26, 7, 30)),
        '2014-11-26T08:30:00+01:00'
    ],
    [
        new Date(Date.UTC(2014, 11 - 1, 10, 7, 30)),
        '2014-11-10T08:30:00+01:00'
    ],
    [
        new Date(Date.UTC(2014, 11 - 1, 10, 6, 30)),
        '2014-11-10T08:30:00+02:00'
    ],
    [
        new Date(Date.UTC(2023, 10 - 1, 26, 8, 40, 1)),
        '2023-10-26T08:40:01+00:00'
    ],
    [new Date(1970, 1 - 1, 1, 8, 30), '1.1.1970 08:30:00'],
    [new Date(1970, 1 - 1, 1), 'Mo. 1.1.1970'],
    [new Date(1970, 1 - 1, 2), 'Di. 2.1.1970'],
    [new Date(1970, 1 - 1, 3), 'Fr. 3.1.1970'],
    [new Date(1970, 1 - 1, 3), '3.Jan.1970'],
    [new Date(1970, 1 - 1, 3), '3. Jan. 1970'],
    [new Date(1970, 5 - 1, 3), '3. mai. 1970'],
    [new Date(1970, 5 - 1, 3), '3. may 1970'],
    [new Date(1970, 3 - 1, 3), '3. märz 1970'],
    [new Date(1970, 12 - 1, 3), '3. Dezember 1970']
)
test('normalizeDateTime', () => {
    expect(typeof normalizeDateTime()).toStrictEqual('object')
})
testEach<typeof normalizeDateTime>(
    'normalizeDateTime',
    normalizeDateTime,

    [now, now],
    [new Date('1970-01-01'), '1970-01-01', true],
    [new Date('1970-01-01T00:00:00'), '1970-01-01', false],
    [new Date('1970-01-01T00:00:00Z'), '1970-01-01', true],
    [
        new Date('1970-01-01T08:38:00.020+02:02'),
        '1970-01-01T08:38:00.020+02:02'
    ],
    [new Date('1970-01-01T08:38:00.020Z'), '1970-01-01T08:38:00.020Z'],
    [new Date(1.2 * 1000), 1.2],
    [new Date(1.2 * 1000), '1.2'],
    [new Date(1970, 1 - 1, 1, 8, 55), '08:55'],
    [new Date(1 * 1000), 1],
    [new Date(1970, 2 - 1, 1), '2/1/1970'],
    [new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, 0, 1)), 0.001],
    [new Date(1970, 1 - 1, 1, 8, 30), new Date(1970, 1 - 1, 1, 8, 30)],
    [null, 'abc'],
    [null, '1+1+1970 08+30+00']
)
testEach<typeof sliceWeekday>(
    'sliceWeekday',
    sliceWeekday,

    ['', ''],
    ['a', 'a'],
    ['1.1.1970', '1.1.1970'],
    ['1.1.1970', 'Do. 1.1.1970'],
    ['1.1.1970', 'We. 1.1.1970'],
    ['1.1.1970', 'Mo. 1.1.1970'],
    ['10', 'Mo. 10'],
    ['Mo. ', 'Mo. ']
)

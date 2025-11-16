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

import {NOOP} from '../context'
import {testEach} from '../test-helper'
import Logger from '../Logger'

declare const TARGET_TECHNOLOGY: string
const TEST_ENVIRONMENT: string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const logger = new Logger()
test('log', () => {
    logger.log('test')
    expect(true).toStrictEqual(true)
})
test('info', () => {
    logger.info('test {0}')
    expect(true).toStrictEqual(true)
})
test('debug', () => {
    logger.debug('test')
    expect(true).toStrictEqual(true)
})
// NOTE: This test breaks javaScript modules in strict mode.
test.skip(`${TEST_ENVIRONMENT}-error`, () => {
    logger.error('ignore this error, it is only a {1}', 'test')
    expect(true).toStrictEqual(true)
})
test('warn', () => {
    logger.warn('test')
    expect(true).toStrictEqual(true)
})
test('show', () => {
    expect(/^.+\(Type: "function"\)$/su.test(Logger.show(NOOP)))
        .toStrictEqual(true)
})
testEach<typeof Logger.show>(
    'show',
    Logger.show.bind(Logger),

    ['1 (Type: "number")', 1],
    ['null (Type: "null")', null],
    ['/a/ (Type: "regexp")', /a/],
    ['hans (Type: "string")', 'hans'],
    ['A: a (Type: "string")\nB: b (Type: "string")', {A: 'a', B: 'b'}]
)

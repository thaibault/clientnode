// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
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
    expect(logger.log('test')).resolves.toBeUndefined()
})
test('info', () => {
    expect(logger.info('test {0}')).resolves.toBeUndefined()
})
test('debug', () => {
    expect(logger.debug('test')).resolves.toBeUndefined()
})
// NOTE: This test breaks JavaScript modules in strict mode.
test.skip(`${TEST_ENVIRONMENT}-error`, () => {
    expect(logger.error('ignore this error, it is only a {1}', 'test'))
        .resolves.toBeUndefined()
})
test('warn', () => {
    expect(logger.warn('test')).resolves.toBeUndefined()
})
test('show', () => {
    expect(/^.+\(Type: "function"\)$/su.test(Logger.show(NOOP)))
        .toStrictEqual(true)
})
testEach(
    'show',
    Logger.show.bind(Logger),

    ['1 (Type: "number")', 1],
    ['null (Type: "null")', null],
    ['/a/ (Type: "regexp")', /a/],
    ['hans (Type: "string")', 'hans'],
    ['A: a (Type: "string")\nB: b (Type: "string")', {A: 'a', B: 'b'}]
)

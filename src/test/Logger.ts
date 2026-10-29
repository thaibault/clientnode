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
import {expect, jest, test} from '@jest/globals'

import {globalContext, NOOP} from '../context'
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
test('configureAllInstances', () => {
    const {defaultLevel, defaultName} = Logger
    const configurations = Object.values(Logger.instances).map(
        (instance: Logger): [Logger, Logger['level'], string] =>
            [instance, instance.level, instance.name]
    )
    const instance = new Logger({name: 'configureAllInstancesTest'})

    try {
        Logger.configureAllInstances({level: 'debug', name: 'other'})

        expect(Logger.defaultLevel).toStrictEqual('debug')
        expect(Logger.defaultName).toStrictEqual('other')
        for (const configuredLogger of [instance, logger]) {
            expect(configuredLogger.level).toStrictEqual('debug')
            expect(configuredLogger.name).toStrictEqual('other')
        }
        expect(new Logger().level).toStrictEqual('debug')
    } finally {
        Logger.defaultLevel = defaultLevel
        Logger.defaultName = defaultName
        for (const [configuredLogger, level, name] of configurations)
            configuredLogger.configure({level, name})
        delete Logger.instances.configureAllInstancesTest
        delete Logger.instances.other
    }
})
test('configure', () => {
    const instance = new Logger({level: 'error', name: 'configureTest'})

    try {
        expect(instance.level).toStrictEqual('error')
        expect(instance.name).toStrictEqual('configureTest')
        expect(Logger.instances.configureTest).toStrictEqual(instance)

        instance.configure({level: 'debug'})
        expect(instance.level).toStrictEqual('debug')
        expect(instance.name).toStrictEqual(Logger.defaultName)

        instance.configure({})
        expect(instance.level).toStrictEqual(Logger.defaultLevel)
    } finally {
        delete Logger.instances.configureTest
    }
})
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
test('critical', async () => {
    // NOTE: Node writes to stdout directly, otherwise the console is used.
    const output = typeof process === 'undefined' ?
        jest.spyOn(globalContext.console as Console, 'error')
            .mockImplementation(NOOP) :
        jest.spyOn(process.stdout, 'write').mockImplementation(((
            _message: string, callback?: () => void
        ) => {
            callback?.()

            return true
        }) as typeof process.stdout.write)

    try {
        await logger.critical('test')

        expect(output).toHaveBeenCalledTimes(1)
        expect(String(output.mock.calls[0][0])).toContain('critical')
    } finally {
        output.mockRestore()
    }
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

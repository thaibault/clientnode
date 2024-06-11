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

    generic test boilerplate:

    test.each([[EXPECTED, ...PARAMETERS], ...])(
        '%p === FUNCTION(...%p)',
        (expected:ReturnType<FUNCTION>, ...parameters:Parameters<FUNCTION>) =>
            expect(FUNCTION(...parameters)).toStrictEqual(expected)
    )
*/
// region imports
import {describe, expect, jest, test} from '@jest/globals'
import {ChildProcess as ChildProcessType} from 'child_process'
import {Duplex as DuplexType} from 'stream'
import nodeFetch from 'node-fetch'
import {Requireable} from 'prop-types'
import {getInitializedBrowser} from 'weboptimizer/browser'
import {InitializedBrowser} from 'weboptimizer/type'

import {
    MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION,
    NOOP,
    VALUE_COPY_SYMBOL
} from './constants'
import {globalContext, optionalRequire, $} from './context'
import {
    dateTimeFormat,
    interpretDateTime,
    normalizeDateTime,
    sliceWeekday
} from './datetime'
import {debounce, timeout} from './utility'
import Lock from './Lock'
import {DummyTypes} from './property-types'
import Semaphore from './Semaphore'
import {
    camelCaseToDelimited,
    capitalize,
    compressStyleValue,
    compile,
    convertToValidVariableName,
    decodeHTMLEntities,
    delimitedToCamelCase,
    encodeURIComponent,
    escapeRegularExpressions,
    evaluate,
    findNormalizedMatchRange,
    fixKnownEncodingErrors,
    format,
    lowerCase,
    mark,
    normalizeDomNodeSelector,
    normalizePhoneNumber,
    normalizeZipCode,
    parseEncodedObject,
    representPhoneNumber,
    sliceAllExceptNumberAndLastSeperator,
    addSeparatorToPath,
    hasPathPrefix,
    getURLParameter,
    serviceURLEquals,
    normalizeURL,
    representURL,
    getDomainName, getPortNumber, getProtocolName
} from './string'
import {
    TEST_DEFINED_SYMBOL,
    TEST_THROW_SYMBOL,
    testEach,
    testEachAgainstSameExpectation,
    testEachPromise,
    testEachPromiseAgainstSameExpectation,
    testEachPromiseRejectionAgainstSameExpectation,
    testEachSingleParameterAgainstSameExpectation
} from './test-helper'
import Tools from './Tools'
import {
    AnyFunction,
    EvaluationResult,
    File,
    FirstParameter,
    Mapping,
    PlainObject,
    ProxyType,
    SecondParameter,
    TimeoutPromise,
    UnknownFunction,
    $T
} from './type'
import {
    isAnyMatching,
    isArrayLike,
    isFunction,
    isNumeric,
    isPlainObject,
    isWindow
} from './indicators'
import {getEditDistance, maskForRegularExpression} from './string'
import {getParameterNames, identity, invertArrayFilter} from './function'
import {deleteCookie, getCookie, setCookie} from './cookie'
import {determineUniqueScopeName, isolateScope} from './scope'
import {
    addDynamicGetterAndSetter,
    convertCircularObjectToJSON,
    convertMapToPlainObject,
    convertPlainObjectToMap,
    convertSubstringInPlainObject,
    copy,
    determineType,
    equals,
    evaluateDynamicData,
    extend,
    getProxyHandler,
    getSubstructure,
    mask,
    modifyObject,
    removeKeyPrefixes,
    removeKeysInEvaluation, represent, sort, unwrapProxy
} from './object'
import {
    aggregatePropertyIfEqual,
    deleteEmptyItems, extract,
    extractIfMatches,
    extractIfPropertyExists,
    extractIfPropertyMatches,
    intersect,
    makeArray,
    makeRange,
    merge, paginate,
    permutate,
    permutateLength, removeArrayItem, sortTopological,
    sumUpProperty, unique
} from './array'
import {ceil, floor, getUTCTimestamp, isNotANumber, round} from './number'
import {
    checkReachability,
    checkUnreachability, sendToExternalURL,
    sendToIFrame
} from './data-transfer'
import {
    copyDirectoryRecursive,
    copyDirectoryRecursiveSync,
    copyFile,
    copyFileSync,
    isDirectory,
    isDirectorySync,
    isFile,
    isFileSync,
    walkDirectoryRecursively, walkDirectoryRecursivelySync
} from './filesystem'
import {getProcessCloseHandler, handleChildProcess} from './process'
// endregion
/*
    NOTE: We have to preload this module to avoid introducing an additional
    asynchronous chunk.
*/
require('node-fetch/src/utils/multipart-parser')
// region declaration
declare const TARGET_TECHNOLOGY:string
// endregion
// region determine technology specific implementations
globalContext.fetch = nodeFetch as unknown as typeof fetch

const {ChildProcess = null} =
    optionalRequire<typeof import('child_process')>('child_process') || {}
// eslint-disable-next-line @typescript-eslint/unbound-method
const {resolve = null} = optionalRequire<typeof import('path')>('path') || {}
const {sync: removeDirectoryRecursivelySync = null} =
    optionalRequire<typeof import('rimraf')>('rimraf') || {}
const {unlink} =
    optionalRequire<typeof import('fs/promises')>('fs/promises') || {}

const testEnvironment:string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const hasDOM:boolean = ['browser', 'node-with-dom'].includes(testEnvironment)
// endregion
// region property-types
describe(`property-types (${testEnvironment})`, ():void => {
    test('DummyTypes', ():void => {
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
})
// endregion
// region lock
describe(`Lock (${testEnvironment})`, ():void => {
    test(`acquire|release (${testEnvironment})`, async ():Promise<void> => {
        const lock:Lock = new Lock()
        const anotherLock:Lock = new Lock()

        let testValue = 'a'
        await lock.acquire('test', ():void => {
            testValue = 'b'
        })
        expect(testValue).toStrictEqual('b')
        expect(lock.acquire(
            'test',
            ():void => {
                testValue = 'a'
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('b')
        expect(anotherLock.release('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('b')
        expect(lock.release('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('a')
        expect(lock.release('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('a')
        await lock.acquire('test', ():void => {
            testValue = 'b'
        })
        expect(testValue).toStrictEqual('b')
        expect(lock.acquire(
            'test',
            ():void => {
                testValue = 'a'
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('b')
        expect(lock.acquire(
            'test',
            ():void => {
                testValue = 'b'
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual('b')
        await lock.release('test')
        expect(testValue).toStrictEqual('a')
        await lock.release('test')
        expect(testValue).toStrictEqual('b')
        const promise:Promise<void> = lock.acquire('test').then(
            async (result:string|void):Promise<void> => {
                expect(result).toStrictEqual('test')
                void timeout(():Promise<string|void> => lock.release('test'))
                result = await lock.acquire('test')
                expect(result).toStrictEqual('test')
                void timeout(():Promise<string|void> =>
                    lock.release('test')
                )
                result = await lock.acquire(
                    'test',
                    ():Promise<string|void> =>
                        new Promise((resolve:(_value:string) => void) => {
                            void timeout(() => {
                                testValue = 'a'
                                resolve(testValue)
                            })
                        })
                )
                expect(testValue).toStrictEqual('a')
            }
        )
        await lock.release('test')
        await promise
    })
})
// endregion
// region semaphore
describe(`Semaphore (${testEnvironment})`, ():void => {
    test('constructor', () => {
        expect(new Semaphore()).toHaveProperty('numberOfResources', 2)
        expect(new Semaphore()).toHaveProperty(
            'numberOfFreeResources', (new Semaphore()).numberOfResources
        )
    })
    test('acquire/release', async ():Promise<void> => {
        const semaphore1 = new Semaphore()

        expect(semaphore1.numberOfFreeResources).toStrictEqual(2)
        expect(await semaphore1.acquire()).toStrictEqual(1)
        expect(semaphore1.numberOfFreeResources).toStrictEqual(1)

        semaphore1.release()

        expect(semaphore1.numberOfFreeResources).toStrictEqual(2)

        const semaphore2:Semaphore = new Semaphore(2)

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
})
// endregion
// region tools
describe(`Tools (${testEnvironment})`, ():void => {
    const now:Date = new Date()
    const tools:Tools = new Tools()
    // region public methods
    /// region special
    test('constructor', () => {
        expect(Tools).toHaveProperty('abbreviations')
        expect(new Tools()).toHaveProperty('options')
    })
    test('destructor', () =>
        expect(tools.destructor()).toStrictEqual(tools)
    )
    test('initialize', () => {
        const secondToolsInstance:Tools = $.Tools({logging: true})
        const thirdToolsInstance:Tools = $.Tools({
            domNodeSelectorPrefix: 'body.{1} div.{1}'
        })

        expect(tools.options).toHaveProperty('logging', false)
        expect(secondToolsInstance.options).toHaveProperty('logging', true)
        expect(thirdToolsInstance.options.domNodeSelectorPrefix)
            .toStrictEqual('body.tools div.tools')
    })
    /// endregion
    /// region  object orientation
    test('controller', () => {
        expect(Tools.controller(tools, [])).toStrictEqual(tools)
        expect((Tools.controller($.Tools.class, [], $('body')) as Tools)
            .constructor.name
        ).toStrictEqual(Tools.name)
        expect((Tools.controller(Tools, [], $('body')) as Tools)
            .constructor.name
        ).toStrictEqual(Tools.name)
    })
    /// endregion
    /// region date time
    const testDate:Date = new Date(0)
    testEach<typeof dateTimeFormat>(
        `dateTimeFormat (${testEnvironment})`,
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
    /// endregion
    /// region boolean
    testEachSingleParameterAgainstSameExpectation<typeof isNumeric>(
        'isNumeric',
        isNumeric,
        true,

        0,
        1,
        '-10',
        '0',
        0xFF,
        '0xFF',
        '8e5',
        '3.1415',
        +10
    )
    testEachSingleParameterAgainstSameExpectation<typeof isNumeric>(
        'isNumeric',
        isNumeric,
        false,

        null,
        undefined,
        false,
        true,
        '',
        'a',
        {},
        /a/,
        '-0x42',
        '7.2acdgs',
        NaN,
        Infinity
    )
    test('isWindow', async ():Promise<void> => {
        const browser:InitializedBrowser = await getInitializedBrowser()

        expect(isWindow(browser.window)).toStrictEqual(true)

        for (const value of [null, {}, browser])
            expect(isWindow(value)).toStrictEqual(false)
    })
    test('isArrayLike', async ():Promise<void> => {
        const browser:InitializedBrowser = await getInitializedBrowser()
        for (const value of [
            [], browser.window.document.querySelectorAll('*')
        ])
            expect(isArrayLike(value)).toStrictEqual(true)
    })
    testEachSingleParameterAgainstSameExpectation<typeof isArrayLike>(
        'isArrayLike',
        isArrayLike,
        false,

        {},
        null,
        undefined,
        false,
        true,
        /a/
    )
    testEachAgainstSameExpectation<typeof isAnyMatching>(
        'isAnyMatching',
        isAnyMatching,
        true,

        ['', ['']],
        ['test', [/test/]],
        ['test', [/a/, /b/, /es/]],
        ['test', ['', 'test']]
    )
    testEachAgainstSameExpectation<typeof isAnyMatching>(
        'isAnyMatching',
        isAnyMatching,
        false,

        ['', []],
        ['test', [/tes$/]],
        ['test', [/^est/]],
        ['test', [/^est$/]],
        ['test', ['a']]
    )
    testEachSingleParameterAgainstSameExpectation<typeof isPlainObject>(
        'isPlainObject',
        isPlainObject,
        true,

        {},
        {a: 1},
        // eslint-disable-next-line no-new-object
        new Object()
    )
    testEachSingleParameterAgainstSameExpectation<typeof isPlainObject>(
        'isPlainObject',
        isPlainObject,
        false,

        new String(),
        Object,
        null,
        0,
        1,
        true,
        undefined
    )
    testEachSingleParameterAgainstSameExpectation<typeof isFunction>(
        'isFunction',
        isFunction,
        true,

        Object,
        // eslint-disable-next-line @typescript-eslint/no-implied-eval
        new Function('return 1'),
        function() {
            // Do nothing.
        },
        NOOP,
        async ():Promise<void> => {
            // Do nothing.
        }
    )
    testEachSingleParameterAgainstSameExpectation<typeof isFunction>(
        'isFunction',
        isFunction,
        false,

        null,
        false,
        0,
        1,
        undefined,
        {},
        new Boolean()
    )
    /// endregion
    /// region logging
    test('log', ():void => expect(tools.log('test')).toStrictEqual(undefined))
    test('info', ():void =>
        expect(tools.info('test {0}')).toStrictEqual(undefined)
    )
    test('debug', ():void =>
        expect(tools.debug('test')).toStrictEqual(undefined)
    )
    // NOTE: This test breaks javaScript modules in strict mode.
    test.skip(`${testEnvironment}-error`, ():void =>
        expect(tools.error('ignore this error, it is only a {1}', 'test'))
            .toStrictEqual(undefined)
    )
    test('warn', ():void =>
        expect(tools.warn('test')).toStrictEqual(undefined)
    )
    test('show', ():void =>
        // eslint-disable-next-line no-control-regex
        expect(/^.+\(Type: "function"\)$/su.test(Tools.show(NOOP)))
            .toStrictEqual(true)
    )
    testEach<typeof Tools.show>(
        'show',
        Tools.show,

        ['1 (Type: "number")', 1],
        ['null (Type: "null")', null],
        ['/a/ (Type: "regexp")', /a/],
        ['hans (Type: "string")', 'hans'],
        ['A: a (Type: "string")\nB: b (Type: "string")', {A: 'a', B: 'b'}]
    )
    /// endregion
    /// region cookie
    if (hasDOM) {
        test(
            `deleteCookie (${testEnvironment})`, async ():Promise<void> => {
                await getInitializedBrowser()

                expect($.document!.cookie).toStrictEqual('')

                expect(setCookie('name', 'value', {minimal: true}))
                    .toStrictEqual(true)
                expect(getCookie('name')).toStrictEqual('value')
                deleteCookie('name')
                expect(getCookie('name')).toStrictEqual('')

                $.document!.cookie = ''
            }
        )
        test(`getCookie (${testEnvironment})`, async ():Promise<void> => {
            await getInitializedBrowser()

            expect(getCookie('')).toStrictEqual('')

            expect(getCookie('name')).toStrictEqual('')

            expect(setCookie('name', 'value', {minimal: true}))
                .toStrictEqual(true)
            expect(getCookie('name')).toStrictEqual('value')

            $.document!.cookie = ''
        })
        test(`setCookie (${testEnvironment})`, async ():Promise<void> => {
            await getInitializedBrowser()

            $.document!.cookie = ''

            expect(setCookie('name', 'value', {minimal: true}))
                .toStrictEqual(true)
            expect(getCookie('name')).toStrictEqual('value')

            $.document!.cookie = ''

            expect(setCookie('name', '', {minimal: true})).toStrictEqual(true)
            expect(getCookie('name')).toStrictEqual('')

            $.document!.cookie = ''
        })
    }
    /// endregion
    /// region dom node handling
    if (hasDOM) {
        // region getter
        test(`get normalizedClassNames (${testEnvironment})`, async (
        ):Promise<void> => {
            await getInitializedBrowser()

            expect(
                $('<div>')
                    .Tools('normalizedClassNames')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual($('<div>').prop('outerHTML'))
            expect(
                $('<div class>').Tools('normalizedClassNames').$domNode.html()
            ).toStrictEqual($('<div>').html())
            expect(
                $('<div class="">')
                    .Tools('normalizedClassNames')
                    .$domNode
                    .html()
            ).toStrictEqual($('<div>').html())
            expect(
                $('<div class="a">')
                    .Tools('normalizedClassNames')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual($('<div class="a">').prop('outerHTML'))
            expect(
                $('<div class="b a">')
                    .Tools('normalizedClassNames')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual($('<div class="a b">').prop('outerHTML'))
            expect(
                $('<div class="b a"><pre class="c b a"></pre></div>')
                    .Tools('normalizedClassNames')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual(
                $('<div class="a b"><pre class="a b c"></pre></div>')
                    .prop('outerHTML')
            )
        })
        test(`get normalizedStyles (${testEnvironment})`, ():void => {
            expect(
                $('<div>').Tools('normalizedStyles').$domNode.prop('outerHTML')
            ).toStrictEqual($('<div>').prop('outerHTML'))
            expect(
                $('<div style>').Tools('normalizedStyles').$domNode.html()
            ).toStrictEqual($('<div>').html())
            expect(
                $('<div style="">').Tools('normalizedStyles').$domNode.html()
            ).toStrictEqual($('<div>').html())
            expect(
                $('<div style="border: 1px solid  red ;">')
                    .Tools('normalizedStyles')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual(
                $('<div style="border:1px solid red">').prop('outerHTML')
            )
            expect(
                $('<div style="width: 50px;height: 100px;">')
                    .Tools('normalizedStyles')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual(
                $('<div style="height:100px;width:50px">').prop('outerHTML')
            )
            expect(
                $('<div style=";width: 50px ; height:100px">')
                    .Tools('normalizedStyles')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual(
                $('<div style="height:100px;width:50px">').prop('outerHTML')
            )
            expect(
                $(
                    '<div style="width:10px;height:50px">' +
                    '    <pre style=";;width:2px;height:1px; color: red; ">' +
                        '</pre>' +
                    '</div>'
                )
                    .Tools('normalizedStyles')
                    .$domNode
                    .prop('outerHTML')
            ).toStrictEqual(
                $(
                    '<div style="height:50px;width:10px">' +
                    '    <pre style="color:red;height:1px;width:2px"></pre>' +
                    '</div>'
                )
                    .prop('outerHTML')
            )
        })
        test.each([
            ['<span>', {}],
            ['<span>hans</span>', {}],
            ['<span style="display:block"></span>', {display: 'block'}],
            [
                '<span style="display:block;height:100px;"></span>',
                {display: 'block', height: '100px'}
            ]
        ])(
            `get style '%s' => %p (${testEnvironment})`,
            (html:string, css:Mapping):void => {
                const $domNode:$T = $<HTMLElement>(html)

                $('body').append($domNode[0])

                const styles:Mapping<number|string> = $domNode.Tools('style')
                for (const propertyName in css)
                    if (Object.prototype.hasOwnProperty.call(
                        css, propertyName
                    ))
                        expect(styles)
                            .toHaveProperty(propertyName, css[propertyName])

                $domNode.remove()
            }
        )
        test.each([
            ['<div>', ''],
            ['<div>hans</div>', 'hans'],
            ['<div><div>hans</div</div>', ''],
            ['<div>hans<div>peter</div></div>', 'hans']
        ])(
            `get text '%s' => '%s' (${testEnvironment})`,
            (html:string, text:string):void =>
                expect($(html).Tools('text')).toStrictEqual(text)
        )
        // endregion
        testEachAgainstSameExpectation<typeof Tools.isEquivalentDOM>(
            'isEquivalentDOM',
            Tools.isEquivalentDOM,
            true,

            ['test', 'test'],
            ['test test', 'test test'],
            ['<div>', '<div>'],
            ['<div class>', '<div>'],
            ['<div class="">', '<div>'],
            ['<div style>', '<div>'],
            ['<div style="">', '<div>'],
            ['<div></div>', '<div>'],
            ['<div class="a"></div>', '<div class="a"></div>'],
            [
                $<HTMLElement>('<a target="_blank" class="a"></a>'),
                '<a class="a" target="_blank"></a>'
            ],
            [
                '<a target="_blank" class="a"></a>',
                '<a class="a" target="_blank"></a>'
            ],
            [
                '<a target="_blank" class="a"><div b="3" a="2"></div></a>',
                '<a class="a" target="_blank"><div a="2" b="3"></div></a>'
            ],
            [
                `
                    <a target="_blank" class="b a">
                        <div b="3" a="2"></div>
                    </a>
                `,
                `
                    <a class="a b" target="_blank">
                        <div a="2" b="3"></div>
                    </a>
                `
            ],
            ['<div>a</div><div>b</div>', '<div>a</div><div>b</div>'],
            ['<div>a</div>b', '<div>a</div>b'],
            ['<br>', '<br />'],
            ['<div><br><br /></div>', '<div><br /><br /></div>'],
            [
                ' <div style="">' +
                'german<!--deDE--><!--enUS: english --> </div>',
                ' <div style="">german<!--deDE--><!--enUS: english --> ' +
                '</div>'
            ],
            ['a<br>', 'a<br />', true]
        )
        testEachAgainstSameExpectation<typeof Tools.isEquivalentDOM>(
            'isEquivalentDOM',
            Tools.isEquivalentDOM,
            false,

            ['test', ''],
            ['test', 'hans'],
            ['test test', 'testtest'],
            ['test test:', ''],
            ['<div class="a"></div>', '<div>'],
            [$('<a class="a"></a>'), '<a class="a" target="_blank"></a>'],
            [
                '<a target="_blank" class="a"><div a="2"></div></a>',
                '<a class="a" target="_blank"></a>'
            ],
            ['<div>a</div>b', '<div>a</div>c'],
            [' <div>a</div>', '<div>a</div>'],
            ['<div>a</div><div>bc</div>', '<div>a</div><div>b</div>'],
            ['text', 'text a'],
            ['text', 'text a'],
            ['text', 'text a & +']
        )
        test('getPositionRelativeToViewport', ():void =>
            expect(['above', 'left', 'right', 'below', 'in'])
                .toContain(tools.getPositionRelativeToViewport())
        )
    }
    testEach<typeof Tools.generateDirectiveSelector>(
        'generateDirectiveSelector',
        Tools.generateDirectiveSelector,

        ['a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]', 'a-b'],
        ['a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]', 'aB'],
        ['a, .a, [a], [data-a], [x-a]', 'a'],
        ['aa, .aa, [aa], [data-aa], [x-aa]', 'aa'],
        [
            'aa-bb, .aa-bb, ' +
            '[aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], [aa_bb]',
            'aaBB'
        ],
        [
            'aa-bb-cc-dd, .aa-bb-cc-dd, ' +
            '[aa-bb-cc-dd], [data-aa-bb-cc-dd], [x-aa-bb-cc-dd], ' +
            '[aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]',
            'aaBbCcDd'
        ],
        [
            'mce-href, .mce-href, ' +
            '[mce-href], [data-mce-href], [x-mce-href], [mce\\:href], ' +
            '[mce_href]',
            'mceHREF'
        ]
    )
    if (hasDOM)
        test('removeDirective', async ():Promise<void> => {
            await getInitializedBrowser()

            const $localBodyDomNode:$T<HTMLElement> =
                $<HTMLElement>('body').Tools('removeDirective', 'a')

            expect($localBodyDomNode.Tools().removeDirective('a'))
                .toStrictEqual($localBodyDomNode)
        })
    testEach<typeof Tools.getNormalizedDirectiveName>(
        'getNormalizedDirectiveName',
        Tools.getNormalizedDirectiveName,

        ['a', 'data-a'],
        ['a', 'x-a'],
        ['aBb', 'data-a-bb'],
        ['aB', 'x:a:b']
    )
    if (hasDOM)
        test('getDirectiveValue', async ():Promise<void> => {
            await getInitializedBrowser()

            expect($('body').Tools('getDirectiveValue', 'a'))
                .toStrictEqual(null)
        })
    test('sliceDomNodeSelectorPrefix', ():void => {
        expect(tools.sliceDomNodeSelectorPrefix('body div'))
            .toStrictEqual('div')
        expect(
            $.Tools({domNodeSelectorPrefix: 'body div'})
                .sliceDomNodeSelectorPrefix('body div')
        ).toStrictEqual('')
        expect(
            $.Tools({domNodeSelectorPrefix: ''})
                .sliceDomNodeSelectorPrefix('body div')
        ).toStrictEqual('body div')
    })
    testEach<typeof Tools.getDomNodeName>(
        'getDomNodeName',
        Tools.getDomNodeName,

        ['div', 'div'],
        ['div', '<div>'],
        ['div', '<div />'],
        ['div', '<div></div>'],
        ['a', 'a'],
        ['a', '<a>'],
        ['a', '<a />'],
        ['a', '<a></a>']
    )
    if (hasDOM)
        test('grabDomNodes', async ():Promise<void> => {
            await getInitializedBrowser()

            for (const [expected, parameters] of [
                [{a: $('div'), parent: $('body')}, [{a: 'div'}]],
                [
                    {a: $('body').find('script'), parent: $('body')},
                    [{a: 'script'}, 'body']
                ]
            ] as Array<[Mapping<$T>, [Mapping, string?]]>) {
                const $domNodes = tools.grabDomNodes(...parameters)

                delete $domNodes.window
                delete $domNodes.document

                expect($domNodes).toStrictEqual(expected)
            }
        })
    /// endregion
    /// region scope
    test('isolateScope', ():void => {
        expect(isolateScope({})).toStrictEqual({})
        expect(isolateScope({a: 2})).toStrictEqual({a: 2})
        expect(isolateScope({a: 2, b: {a: [1, 2]}}))
            .toStrictEqual({a: 2, b: {a: [1, 2]}})

        let Scope:(new () => Mapping<number>) =
            // eslint-disable-next-line no-unused-vars
            function(this:Mapping<number>):void {
                this.a = 2
            } as unknown as (new () => Mapping<number>)
        Scope.prototype = {_a: 5, b: 2}
        let scope:Mapping<number|undefined> = new Scope()

        isolateScope(scope, ['_'])
        let finalScope:Mapping<number|undefined> = {}
        // eslint-disable-next-line guard-for-in
        for (const name in scope)
            finalScope[name] = scope[name]

        expect(finalScope).toStrictEqual({_a: 5, a: 2, b: undefined})

        scope.b = 3
        isolateScope(scope, ['_'])
        finalScope = {}
        // eslint-disable-next-line guard-for-in
        for (const name in scope)
            finalScope[name] = scope[name]

        expect(finalScope).toStrictEqual({_a: 5, a: 2, b: 3})
        expect(isolateScope(scope))
            .toStrictEqual({_a: undefined, a: 2, b: 3})

        scope._a = 6
        expect(isolateScope(scope, ['_'])).toStrictEqual({_a: 6, a: 2, b: 3})

        // eslint-disable-next-line no-unused-vars
        Scope = function(this:Mapping<number>):void {
            this.a = 2
        } as unknown as (new () => Mapping<number>)
        Scope.prototype = {b: 3}
        scope = isolateScope(new Scope(), ['b'])
        finalScope = {}
        // eslint-disable-next-line guard-for-in
        for (const name in scope)
            finalScope[name] = scope[name]

        expect(finalScope).toStrictEqual({a: 2, b: 3})
        expect(isolateScope(new Scope())).toStrictEqual({a: 2, b: undefined})
    })
    test('determineUniqueScopeName', ():void => {
        expect(determineUniqueScopeName())
            .toStrictEqual(expect.stringMatching(/^callback/))
        expect(determineUniqueScopeName('hans'))
            .toStrictEqual(expect.stringMatching(/^hans/))
        expect(determineUniqueScopeName('hans', '', {}))
            .toStrictEqual(expect.stringMatching(/^hans/))
        expect(determineUniqueScopeName('hans', '', {}, 'peter'))
            .toStrictEqual('peter')
        expect(
            determineUniqueScopeName('hans', '', {peter: 2}, 'peter')
        ).toStrictEqual(expect.stringMatching(/^hans/))
        const name:string = determineUniqueScopeName(
            'hans', 'klaus', {peter: 2}, 'peter'
        )
        expect(name).toStrictEqual(expect.stringMatching(/^hans/))
        expect(name).toStrictEqual(expect.stringMatching(/klaus$/))
        expect(name.length).toBeGreaterThan('hans'.length + 'klaus'.length)
    })
    /// endregion
    /// region function handling
    testEach<typeof getParameterNames>(
        'getParameterNames',
        getParameterNames,

        [
            [],
            function() {
                // Do nothing.
            }
        ],
        [[], 'function() {}'],
        [['a', 'b', 'c'], 'function(a, /* dummy*/ b, c/**/) {}'],
        [['a', 'b', 'c'], '(a, /*dummy*/b, c/**/) => {}'],
        [
            ['a', 'b', 'c'],
            `(a, /*dummy*/b, c/**/) => {
                return 2
            }`
        ],
        [['a', 'b', 'c'], '(a, /* dummy*/b, c/* */) => 2'],
        [['a', 'b', 'c'], '(a, /* dummy*/b = 2, c/* */) => 2'],
        [['a'], 'a => 2'],
        [
            ['a', 'b', 'c'],
            `class A {
                constructor(a, b, c) {}
                a() {}
            }`
        ]
    )
    test('identity', ():void => {
        const testObject = {}
        expect(identity(testObject) === copy(testObject))
            .toStrictEqual(false)
        expect(identity(testObject)).toStrictEqual(testObject)
    })
    testEach<typeof identity>(
        'identity',
        identity,

        [2, 2],
        ['', ''],
        [undefined, undefined],
        [null, null],
        ['hans', 'hans']
    )
    test('invertArrayFilter', ():void => {
        expect(invertArrayFilter(deleteEmptyItems)([{a: null}]))
            .toStrictEqual([{a: null}])
        expect(invertArrayFilter(extractIfMatches)(['a', 'b'], '^a$'))
            .toStrictEqual(['b'])
    })
    test('timeout', async ():Promise<void> => {
        expect(await timeout()).toStrictEqual(false)
        expect(await timeout(0)).toStrictEqual(false)
        expect(await timeout(1)).toStrictEqual(false)
        expect(timeout()).toBeInstanceOf(Promise)
        expect(timeout()).toHaveProperty('clear')

        const callback = jest.fn()

        const result:TimeoutPromise = timeout(10 ** 20, true)
        result.catch(callback)
        result.clear()
        await timeout()
        expect(callback).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenLastCalledWith(true)

        expect(await timeout(callback)).toStrictEqual(false)
        expect(callback).toHaveBeenCalledTimes(2)
    })
    /// endregion
    /// region event
    test('debounce', ():void => {
        let testValue = false
        void debounce(() => {
            testValue = true
        })()
        expect(testValue).toStrictEqual(true)

        const callback = jest.fn()
        const debouncedCallback = debounce(callback, 1000)
        void debouncedCallback()
        void debouncedCallback()
        expect(callback).toHaveBeenCalledTimes(1)

        const debouncedAsyncronousCallback =
            debounce(async ():Promise<boolean> => {
                await timeout()

                return true
            })
        /* eslint-disable @typescript-eslint/no-floating-promises */
        expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
        expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
        expect(debouncedAsyncronousCallback()).resolves.toStrictEqual(true)
        /* eslint-enable @typescript-eslint/no-floating-promises */
    })
    test('fireEvent', ():void => {
        expect(
            $.Tools({onClick: ():2 => 2}).fireEvent('click', true)
        ).toStrictEqual(2)
        expect(
            $.Tools({onClick: ():false => false}).fireEvent('click', true)
        ).toStrictEqual(false)
        expect(tools.fireEvent('click')).toStrictEqual(true)
        /**
         * Mock plugin class.
         */
        class Plugin extends Tools {
            /**
             * On click handler.
             * @returns Number 3.
             */
            onClick():3 {
                return 3
            }
        }
        const plugin:Plugin = new Plugin()
        expect(plugin.fireEvent('click')).toStrictEqual(true)
        expect(plugin.fireEvent('click')).toStrictEqual(true)
    })
    if (hasDOM) {
        test('on', ():void => {
            let testValue = false
            expect(
                tools.on('body', 'click', ():void => {
                    testValue = true
                })[0]
            ).toStrictEqual($('body')[0])

            $('body').trigger('click')
            expect(testValue).toStrictEqual(true)
        })
        test('off', ():void => {
            let testValue = false
            expect(
                tools.on('body', 'click', ():void => {
                    testValue = true
                })[0]
            ).toStrictEqual($('body')[0])
            expect(tools.off('body', 'click')[0]).toStrictEqual($('body')[0])

            $('body').trigger('click')
            expect(testValue).toStrictEqual(false)
        })
    }
    /// endregion
    /// region object
    test('addDynamicGetterAndSetter', ():void => {
        expect(addDynamicGetterAndSetter(null)).toStrictEqual(null)
        expect(addDynamicGetterAndSetter(true)).toStrictEqual(true)
        expect(addDynamicGetterAndSetter({a: 2})).toStrictEqual({a: 2})
        expect(addDynamicGetterAndSetter({}))
            .not.toHaveProperty('__target__')
        expect(
            (addDynamicGetterAndSetter(
                {}, (value:unknown):unknown => value
            ) as ProxyType).__target__
        ).toBeInstanceOf(Object)
        const mockup = {}
        expect(addDynamicGetterAndSetter(mockup)).toStrictEqual(mockup)
        expect(
            (addDynamicGetterAndSetter(
                mockup, (value:unknown):unknown => value
            ) as ProxyType).__target__
        ).toStrictEqual(mockup)
        expect(
            addDynamicGetterAndSetter(
                {a: 1}, (value:unknown):number => (value as number) + 2
            ).a
        ).toStrictEqual(3)
        expect(
            addDynamicGetterAndSetter(
                {a: {a: 1}},
                (value:unknown):number|PlainObject =>
                    isPlainObject(value) ? value : (value as number) + 2
            ).a.a
        ).toStrictEqual(3)
        expect(
            addDynamicGetterAndSetter(
                {a: {a: [{a: 1}]}},
                (value:unknown):number|PlainObject =>
                    isPlainObject(value) ? value : (value as number) + 2
            ).a.a[0].a
        ).toStrictEqual(3)
        expect(
            addDynamicGetterAndSetter(
                {a: {a: 1}},
                (value:unknown):number|PlainObject =>
                    isPlainObject(value) ? value : (value as number) + 2,
                null,
                {has: 'hasOwnProperty'},
                false
            ).a.a
        ).toStrictEqual(1)
        expect(
            addDynamicGetterAndSetter(
                {a: 1},
                (value:unknown):number|PlainObject =>
                    isPlainObject(value) ? value : (value as number) + 2,
                null,
                {has: 'hasOwnProperty'},
                false,
                []
            ).a
        ).toStrictEqual(1)
        expect(
            (addDynamicGetterAndSetter(
                {a: new Map([['a', 1]])},
                (value:unknown):number|PlainObject =>
                    isPlainObject(value) ? value : (value as number) + 2,
                null,
                {delete: 'delete', get: 'get', set: 'set', has: 'has'},
                true,
                [Map]
            ).a as unknown as {a:number}).a
        ).toStrictEqual(3)
    })
    test('convertCircularObjectToJSON', ():void => {
        const object:{a:PlainObject, b?:PlainObject} = {a: {}}
        object.b = object.a

        expect(convertCircularObjectToJSON(object))
            .toStrictEqual('{"a":{},"b":{}}')
    })
    test('convertCircularObjectToJSON', ():void => {
        const object:{a?:PlainObject} = {}
        const subObject:{a:PlainObject} = {a: object}
        object.a = subObject

        expect(convertCircularObjectToJSON(object))
            .toStrictEqual('{"a":{"a":"__circularReference__"}}')
    })
    test('convertCircularObjectToJSON', ():void => {
        const rootObject:Array<{a:unknown}> = []
        const subObject:{a:typeof rootObject} = {a: rootObject}
        rootObject.push(subObject)

        expect(convertCircularObjectToJSON(rootObject))
            .toStrictEqual('[{"a":"__circularReference__"}]')
    })
    testEach<typeof convertCircularObjectToJSON>(
        'convertCircularObjectToJSON',
        convertCircularObjectToJSON,

        ['null', null],
        [undefined, undefined],
        ['5', 5],
        ['[]', []],
        ['[5]', [5]],
        ['["a"]', ['a']],
        ['["a",{"a":[]}]', ['a', {a: []}]],
        ['"A"', 'A'],
        ['{}', {}],
        ['{"a":null}', {a: null}],
        ['{"a":{"a":2}}', {a: {a: 2}}],
        ['{"a":{"a":null}}', {a: {a: Infinity}}]
    )
    testEach<typeof convertMapToPlainObject>(
        'convertMapToPlainObject',
        convertMapToPlainObject,

        [null, null],
        [true, true],
        [0, 0],
        [2, 2],
        ['a', 'a'],
        [{}, new Map()],
        [[{}], [new Map()]],
        [[new Map()], [new Map()], false],
        [[{a: 2, '2': 2}], [new Map<string, number>([['a', 2], ['2', 2]])]],
        [
            [[{a: {}, '2': 2}]],
            [[new Map<string, Map<string, string>|number>(
                [['a', new Map()], ['2', 2]]
            )]]
        ],
        [
            [[{a: {a: 2}, '2': 2}]],
            [[new Map<string, Map<string, number>|number>(
                [['a', new Map([['a', 2]])], ['2', 2]]
            )]]
        ]
    )
    testEach<typeof convertPlainObjectToMap>(
        'convertPlainObjectToMap',
        convertPlainObjectToMap,

        [null, null],
        [true, true],
        [0, 0],
        [2, 2],
        ['a', 'a'],
        [new Map(), {}],
        [[new Map()], [{}]],
        [[{}], [{}], false],
        [
            [new Map<string, Map<string, string>|number>(
                [['a', new Map()], ['b', 2]]
            )],
            [{a: {}, b: 2}]
        ],
        [
            [new Map<string, Map<string, string>|number>(
                [['a', new Map()], ['b', 2]]
            )],
            [{b: 2, a: {}}]
        ],
        [
            [new Map<string, Map<string, string>|number>(
                [['a', new Map()], ['b', 2]]
            )],
            [{b: 2, a: new Map()}]
        ],
        [
            [new Map<string, [Map<string, string>]|number>(
                [['a', [new Map()]], ['b', 2]]
            )],
            [{b: 2, a: [{}]}]
        ],
        [
            [new Map<string, Set<Map<string, string>>|number>(
                [['a', new Set([new Map()])], ['b', 2]]
            )],
            [{b: 2, a: new Set([{}])}]
        ]
    )
    testEach<typeof convertSubstringInPlainObject>(
        'convertSubstringInPlainObject',
        convertSubstringInPlainObject,

        [{}, {}, /a/, ''],
        [{a: 'b'}, {a: 'a'}, /a/, 'b'],
        [{a: 'ba'}, {a: 'aa'}, /a/, 'b'],
        [{a: 'bb'}, {a: 'aa'}, /a/g, 'b'],
        [{a: {a: 'bb'}}, {a: {a: 'aa'}}, /a/g, 'b']
    )
    testEach<typeof copy>(
        'copy',
        copy,

        [21, 21],
        [0, 0],
        [0, 0, -1],
        [0, 0, 1],
        [0, 0, 10],
        [new Date(0), new Date(0)],
        [/a/, /a/],
        [{}, {}],
        [{}, {}, -1],
        [[], []],
        [new Map(), new Map()],
        [new Set(), new Set()],
        [{a: 2}, {a: 2}, 0],
        [{a: null}, {a: {a: 2}}, 0, null],
        [{a: {a: 2}}, {a: {a: 2}}, 0],
        [{a: {a: 2}}, {a: {a: 2}}, 1],
        [{a: {a: 2}}, {a: {a: 2}}, 2],
        [{a: [null]}, {a: [{a: 2}]}, 1, null],
        [{a: [{a: 2}]}, {a: [{a: 2}]}, 2],
        [{a: {a: 2}}, {a: {a: 2}}, 10],
        [new Map([['a', 2]]), new Map([['a', 2]]), 0],
        [
            new Map([['a', null]]),
            new Map([['a', new Map([['a', 2]])]]),
            0,
            null
        ],
        [
            new Map([['a', new Map([['a', 2]])]]),
            new Map([['a', new Map([['a', 2]])]]),
            0
        ],
        [
            new Map([['a', new Map([['a', 2]])]]),
            new Map([['a', new Map([['a', 2]])]]),
            1
        ],
        [
            new Map([['a', new Map([['a', 2]])]]),
            new Map([['a', new Map([['a', 2]])]]),
            2
        ],
        [
            new Map([['a', [null]]]),
            new Map([['a', [new Map([['a', 2]])]]]),
            1,
            null
        ],
        [
            new Map([['a', [new Map([['a', 2]])]]]),
            new Map([['a', [new Map([['a', 2]])]]]),
            2
        ],
        [
            new Map([['a', new Map([['a', 2]])]]),
            new Map([['a', new Map([['a', 2]])]]),
            10
        ],
        [
            new Map([['a', new Map([['a', 2]])]]),
            new Map([['a', new Map([['a', 2]])]]),
            10
        ],
        [new Set(['a', 2]), new Set(['a', 2]), 0],
        [new Set([null, null]), new Set(['a', new Set(['a', 2])]), 0, null],
        [
            new Set(['a', new Set([null, null])]),
            new Set(['a', new Set(['a', 2])]),
            1,
            null
        ],
        [
            new Set(['a', new Set(['a', 2])]),
            new Set(['a', new Set(['a', 2])]),
            1
        ],
        [
            new Set(['a', new Set(['a', 2])]),
            new Set(['a', new Set(['a', 2])]),
            2
        ],
        [
            new Set(['a', [null]]),
            new Set(['a', [new Set(['a', 2])]]),
            1,
            null
        ],
        [
            new Set(['a', [new Set(['a', 2])]]),
            new Set(['a', [new Set(['a', 2])]]),
            2
        ],
        [
            new Set(['a', new Set(['a', 2])]),
            new Set(['a', new Set(['a', 2])]),
            10
        ],
        [
            new Set(['a', new Set(['a', 2])]),
            new Set(['a', new Set(['a', 2])]),
            10
        ],
        [{VALUE_COPY_SYMBOL}, {VALUE_COPY_SYMBOL}]
    )
    test('determineType', ():void =>
        expect(determineType()).toStrictEqual('undefined')
    )
    testEach<typeof determineType>(
        'determineType',
        determineType,

        ['undefined', undefined],
        ['undefined', ({} as {notDefined:undefined}).notDefined],
        ['null', null],
        ['boolean', true],
        ['boolean', new Boolean()],
        ['number', 3],
        ['number', new Number(3)],
        ['string', ''],
        ['string', new String('')],
        ['string', 'test'],
        ['string', new String('test')],
        ['function', function():void {
            // Do nothing.
        }],
        ['function', NOOP],
        ['array', []],
        // eslint-disable-next-line no-array-constructor
        // TODO ['array', new Array()],
        ['date', now],
        ['error', new Error()],
        ['map', new Map()],
        ['set', new Set()],
        ['regexp', /test/]
    )
    testEachAgainstSameExpectation<typeof equals>(
        'equals',
        equals,
        true,

        [1, 1],
        [now, now],
        [new Date(1995, 11, 17), new Date(1995, 11, 17)],
        [/a/, /a/],
        [{a: 2}, {a: 2}],
        [{a: 2, b: 3}, {a: 2, b: 3}],
        [[1, 2, 3], [1, 2, 3]],
        [[], []],
        [{}, {}],
        [new Map(), new Map()],
        [new Set(), new Set()],
        [[1, 2, 3, {a: 2}], [1, 2, 3, {a: 2}]],
        [[1, 2, 3, new Map([['a', 2]])], [1, 2, 3, new Map([['a', 2]])]],
        [[1, 2, 3, new Set(['a', 2])], [1, 2, 3, new Set(['a', 2])]],
        [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2]]],
        [[{a: 1}], [{a: 1}]],
        [[{a: 1, b: 1}], [{a: 1}], {properties: []}],
        [[{a: 1, b: 1}], [{a: 1}], {properties: ['a']}],
        [2, 2, {deep: 0}],
        [[{a: 1, b: 1}], [{a: 1}], {deep: 0}],
        [[{a: 1}, {b: 1}], [{a: 1}, {b: 1}], {deep: 1}],
        [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], {deep: 1}],
        [[{a: {b: 1}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 2}],
        [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 2}],
        [
            [{a: {b: {c: 1}}}, {b: 1}],
            [{a: {b: 1}}, {b: 1}],
            {deep: 3, properties: ['b']}
        ],
        [NOOP, NOOP],
        [NOOP, NOOP, {ignoreFunctions: false}]
    )
    if (TARGET_TECHNOLOGY === 'node')
        test('equals', ():void =>
            expect(equals(
                Buffer.from('a'),
                Buffer.from('a'),
                {compareBlobs: true, properties: []}
            )).toStrictEqual(true)
        )
    else {
        testEachPromiseAgainstSameExpectation<typeof equals>(
            'equals',
            equals,
            true,

            ...([
                [
                    new Blob(['a'], {type: 'text/plain'}),
                    new Blob(['a'], {type: 'text/plain'})
                ],
                [
                    [new Blob(['a'], {type: 'text/plain'})],
                    [new Blob(['a'], {type: 'text/plain'})]
                ],
                [
                    {a: new Blob(['a'], {type: 'text/plain'})},
                    {a: new Blob(['a'], {type: 'text/plain'})}
                ],
                [
                    new Map([['a', new Blob(['a'], {type: 'text/plain'})]]),
                    new Map([['a', new Blob(['a'], {type: 'text/plain'})]])
                ],
                [
                    new Set([new Blob(['a'], {type: 'text/plain'})]),
                    new Set([new Blob(['a'], {type: 'text/plain'})])
                ],
                [
                    {
                        a: new Set([[new Map([['a', new Blob(['a'], {
                            type: 'text/plain'
                        })]])]]),
                        b: 2
                    },
                    {
                        a: new Set([[new Map([['a', new Blob(['a'], {
                            type: 'text/plain'
                        })]])]]),
                        b: 2
                    }
                ]
            ] as Array<[
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]>).map((parameters:[
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]):Parameters<typeof equals> =>
                parameters.concat({compareBlobs: true}) as
                    Parameters<typeof equals>
            )
        )
        testEachPromiseAgainstSameExpectation<typeof equals>(
            'equals',
            equals,
            false,

            ...([
                [
                    new Blob(['a'], {type: 'text/plain'}),
                    new Blob(['b'], {type: 'text/plain'})
                ],
                [
                    [new Blob(['a'], {type: 'text/plain'})],
                    [new Blob(['b'], {type: 'text/plain'})]
                ],
                [
                    {a: new Blob(['a'], {type: 'text/plain'})},
                    {a: new Blob(['b'], {type: 'text/plain'})}
                ],
                [
                    new Map([['a', new Blob(['a'], {type: 'text/plain'})]]),
                    new Map([['a', new Blob(['b'], {type: 'text/plain'})]])
                ],
                [
                    new Set([new Blob(['a'], {type: 'text/plain'})]),
                    new Set([new Blob(['b'], {type: 'text/plain'})])
                ],
                [
                    {
                        a: new Set([[new Map([[
                            'a', new Blob(['a'], {type: 'text/plain'})
                        ]])]]),
                        b: 2
                    },
                    {
                        a: new Set([[new Map([['a', new Blob(['b'], {
                            type: 'text/plain'
                        })]])]]),
                        b: 2
                    }
                ]
            ] as Array<[
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]>).map((parameter:[
                FirstParameter<typeof equals>,
                SecondParameter<typeof equals>
            ]):Parameters<typeof equals> =>
                parameter.concat({compareBlobs: true}) as
                    Parameters<typeof equals>
            )
        )
        testEachPromise<typeof equals>(
            'equals',
            equals,

            [
                '>>> Blob("data:text/plain;base64,YQ==") !== ' +
                'Blob("data:text/plain;base64,Yg==")',
                new Blob(['a'], {type: 'text/plain'}),
                new Blob(['b'], {type: 'text/plain'}),
                {compareBlobs: true, returnReasonIfNotEqual: true}
            ],
            [
                'a[1].a.get(1) >>> Blob("data:text/plain;base64,YQ==") !== ' +
                'Blob("data:text/plain;base64,Yg==")',
                {
                    a: [
                        1,
                        {a: new Map(
                            [[1, new Blob(['a'], {type: 'text/plain'})]]
                        )}
                    ]
                },
                {
                    a: [
                        1,
                        {a: new Map(
                            [[1, new Blob(['b'], {type: 'text/plain'})]]
                        )}
                    ]
                },
                {compareBlobs: true, returnReasonIfNotEqual: true}
            ]
        )
    }
    testEachAgainstSameExpectation<typeof equals>(
        'equals',
        equals,
        false,

        [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], {deep: 2}],
        [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], {deep: 3}],
        [new Date(1995, 11, 17), new Date(1995, 11, 16)],
        [/a/i, /a/],
        [1, 2],
        [{a: 2, b: 3}, {a: 2}],
        [[1, 2, 3, 4], [1, 2, 3, 5]],
        [[1, 2, 3, 4], [1, 2, 3]],
        [[1, 2, 3, {a: 2}], [1, 2, 3, {b: 2}]],
        [[1, 2, 3, new Map([['a', 2]])], [1, 2, 3, new Map([['b', 2]])]],
        [[1, 2, 3, new Set(['a', 2])], [1, 2, 3, new Set(['b', 2])]],
        [[1, 2, 3, [1, 2]], [1, 2, 3, [1, 2, 3]]],
        [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2]]],
        [[1, 2, 3, [1, 2, 3]], [1, 2, 3, [1, 2, {}]]],
        [[{a: 1, b: 1}], [{a: 1}]],
        [[{a: 1, b: 1}], [{a: 1}], {properties: ['a', 'b']}],
        [1, 2, {deep: 0}],
        [[{a: 1}, {b: 1}], [{a: 1}], {deep: 1}],
        [
            NOOP,
            ():void => {
                // Do nothing.
            },
            {deep: -1, ignoreFunctions: false, properties: []}
        ]
    )
    testEach<typeof equals>(
        'equals',
        equals,

        ['>>> 1 !== 2', 1, 2, {returnReasonIfNotEqual: true}],
        ['a >>> 1 !== 2', {a: 1}, {a: 2}, {returnReasonIfNotEqual: true}],
        [
            'a[1] >>> 2 !== 1',
            {a: [1, 2]},
            {a: [1, 1]},
            {returnReasonIfNotEqual: true}
        ],
        [
            'a[1].a >>> 2 !== 1',
            {a: [1, {a: 2}]},
            {a: [1, {a: 1}]},
            {returnReasonIfNotEqual: true}
        ],
        [
            'a[1].a >>> {-> 2 not found}',
            {a: [1, {a: new Set([2])}]},
            {a: [1, {a: new Set([1])}]},
            {returnReasonIfNotEqual: true}
        ],
        [
            'a[1].a.get(1) >>> 1 !== 2',
            {a: [1, {a: new Map([[1, 1]])}]},
            {a: [1, {a: new Map([[1, 2]])}]},
            {returnReasonIfNotEqual: true}
        ]
    )
    testEach<typeof evaluateDynamicData>(
        'evaluateDynamicData',
        evaluateDynamicData,

        [null, null],
        [false, false],
        ['1', '1'],
        [3, 3],
        [{}, {}],
        [{a: null}, {a: null}],
        [4, {__evaluate__: '1 + 3'}],
        [[1], [{__evaluate__: '1'}]],
        [['1'], [{__evaluate__: `'1'`}]],
        [{a: 'a'}, {a: {__evaluate__: `'a'`}}],
        [{a: 1}, {a: {__evaluate__: '1'}}],
        [
            {a: {__evaluate__: 'self.b'}, b: 2},
            {a: {__evaluate__: 'self.b'}, b: 2},
            {},
            'self',
            '__run__'
        ],
        [{a: 1, b: 1}, {a: {__run: '_.b'}, b: 1}, {}, '_', '__run'],
        [
            {a: [1], b: 1},
            {a: [{__run: 'self.b'}], b: 1},
            {},
            'self',
            '__run'
        ],
        [{a: 2, b: 2}, {a: {__evaluate__: 'self.b'}, b: 2}],
        [{a: 2, b: 2}, {a: {__evaluate__: 'c.b'}, b: 2}, {}, 'c'],
        [
            {a: 2, b: 2, c: 2},
            {
                a: {__evaluate__: 'self.b'},
                b: {__evaluate__: 'self.c'},
                c: 2
            }
        ],
        [
            {a: 3, b: 3, c: 3, d: 3, e: 3, f: 3},
            {
                a: {__execute__: 'return self.b'},
                b: {__execute__: 'return self.c'},
                c: {__execute__: 'return self.d'},
                d: {__execute__: 'return self.e'},
                e: {__execute__: 'return self.f'},
                f: 3
            }
        ],
        [
            {a: 3, b: {d: {e: 3}}, c: {d: {e: 3}}},
            {
                a: {__evaluate__: 'self.b.d.e'},
                b: {__evaluate__: 'self.c'},
                c: {d: {e: 3}}
            }
        ],
        [
            {
                a: 'kk <-> "1", "2", "3" <-> jj',
                b: 'kk <-> "1", "2", "3" <-> jj',
                c: 'kk <-> "1", "2", "3" <-> jj',
                d: 'kk <-> "1", "2", "3" <-> jj',
                e: 'kk <-> "1", "2", "3" <-> jj',
                f: {i: 'kk <-> "1", "2", "3" <-> jj'},
                g: {h: {i: 'kk <-> "1", "2", "3" <-> jj'}},
                j: 'jj',
                k: 'kk <-> "1", "2", "3"',
                l: [1, 2, 3],
                m: {a: [1, 2, 3]},
                n: {a: [1, 2, 3]},
                o: [{a: 2, b: [[[100]]]}]
            },
            {
                n: {__evaluate__: '{a: [1, 2, 3]}'},
                b: {__evaluate__: 'self.c'},
                f: {__evaluate__: 'self.g.h'},
                d: {__evaluate__: 'self.e'},
                a: {__evaluate__: 'self.b'},
                e: {__evaluate__: 'self.f.i'},
                k: {__evaluate__: '`kk <-> "${self.l.join(\'", "\')}"`'},
                c: {__evaluate__: 'self.d'},
                o: [{a: 2, b: [[[{__evaluate__: '10 ** 2'}]]]}],
                l: {__evaluate__: 'self.m.a'},
                g: {h: {i: {__evaluate__: '`${self.k} <-> ${self.j}`'}}},
                m: {a: [1, 2, {__evaluate__: '3'}]},
                j: 'jj'
            }
        ],
        [
            {a: [2], b: {d: {e: [2]}}, c: {d: {e: [2]}}},
            {
                a: {__evaluate__: '_.b.d.e'},
                b: {__evaluate__: '_.c'},
                c: {d: {e: {__evaluate__: 'tools.copy([2])'}}}
            },
            {tools: copy($.Tools.class)}, '_'
        ],
        [
            {a: {b: 1, c: 1}},
            {a: {
                b: 1,
                c: {__evaluate__: 'self.a.b'}
            }}
        ],
        [
            {a: {b: null, c: null}},
            {a: {
                b: null,
                c: {__evaluate__: 'self.a.b'}
            }}
        ],
        [
            {a: {b: undefined, c: undefined}},
            {a: {
                b: undefined,
                c: {__evaluate__: 'self.a.b'}
            }}
        ],
        [
            {a: {b: 'jau', c: 'jau'}},
            {a: {
                b: 'jau',
                c: {__evaluate__: 'self.a.b'}
            }}
        ],
        [
            {a: {b: {c: 'jau', d: 'jau'}}},
            {a: {
                b: {
                    c: 'jau',
                    d: {__evaluate__: 'self.a.b.c'}
                }
            }}
        ],
        [
            {a: {b: 'test', c: 'tet'}},
            {a: {
                b: {__evaluate__: '"t" + "es" + "t"'},
                c: {__evaluate__: 'removeS(self.a.b)'}
            }},
            {removeS: (value:string):string => value.replace('s', '')}
        ],
        [
            {a: 'a', b: 'a'},
            {
                a: {__evaluate__: 'toString(self.b)'},
                b: {__evaluate__: `'a'`}
            },
            {toString: (value:string):string => value.toString()}
        ],
        [
            {a: ['a'], b: {a: 2}},
            {
                a: {__evaluate__: 'Object.getOwnPropertyNames(self.b)'},
                b: {__evaluate__: '{a: 2}'}
            }
        ],
        [
            {a: ['a'], b: {a: 2}},
            {
                a: {__evaluate__: 'Reflect.ownKeys(self.b)'},
                b: {__evaluate__: '{a: 2}'}
            }
        ],
        [
            {a: ['a', 'b'], b: {a: 1, b: 2}, c: {a: 1, b: 2}},
            {
                a: {__evaluate__: 'Object.getOwnPropertyNames(self.b)'},
                b: {__evaluate__: 'self.c'},
                c: {__execute__: 'return {a: 1, b: 2}'}
            }
        ],
        /*
            NOTE: This describes a workaround until the "ownKeys" proxy trap
            works for this use cases.
        */
        [
            {a: ['a'], b: {a: 2}},
            {
                a: {__evaluate__: 'Object.keys(resolve(self.b))'},
                b: {__evaluate__: '{a: 2}'}
            }
        ],
        [
            {a: ['a', 'b', 'c'], b: {a: 1, b: 2, c: 3}},
            {
                a: {__evaluate__: `(() => {
                    const result = []
                    for (const key in resolve(self.b))
                        result.push(key)
                    return result
                })()`},
                b: {__evaluate__: '{a: 1, b: 2, c: 3}'}
            }
        ]
    )
    testEach<typeof removeKeysInEvaluation>(
        'removeKeysInEvaluation',
        removeKeysInEvaluation,

        [{}, {}],
        [{a: 2}, {a: 2}],
        [{__evaluate__: ''}, {a: 2, __evaluate__: ''}],
        [
            {a: 2, b: {__evaluate__: ''}},
            {a: 2, b: {__evaluate__: '', c: 4}}
        ]
    )
    test('extend', ():void => {
        const target:PlainObject = {a: [1, 2]}
        extend(true, target, {a: [3, 4]})
        expect(target).toStrictEqual({a: [3, 4]})
    })
    testEach<typeof extend>(
        'extend',
        extend,

        [[], []],
        [{}, {}],
        [{a: 1}, {a: 1}],
        [{a: 2}, {a: 1}, {a: 2}],
        [{a: 2}, {}, {a: 1}, {a: 2}],
        [{a: 2}, {}, {a: 1}, {a: 2}],
        [{a: 2, b: {b: 1}}, {a: 1, b: {a: 1}}, {a: 2, b: {b: 1}}],
        [[1], [1, 2], [1]],
        [new Map(), new Map()],
        [new Set(), new Set()],
        [new Map([['a', 1]]), new Map([['a', 1]])],
        [new Map([['a', 2]]), new Map([['a', 1]]), new Map([['a', 2]])],
        [
            new Map([['a', 2]]),
            new Map(),
            new Map([['a', 1]]),
            new Map([['a', 2]])
        ],
        [
            new Map([['a', 2]]),
            new Map(),
            new Map([['a', 1]]),
            new Map([['a', 2]])
        ],
        [
            new Map<string, Map<string, number>|number>(
                [['a', 2], ['b', new Map([['b', 1]])]]
            ),
            new Map<string, Map<string, number>|number>(
                [['a', 1], ['b', new Map<string, number>([['a', 1]])]]
            ),
            new Map<string, Map<string, number>|number>(
                [['a', 2], ['b', new Map<string, number>([['b', 1]])]]
            )
        ],
        [{}, true, {}],
        [
            {a: 2, b: {a: 1, b: 1}},
            true,
            {a: 1, b: {a: 1}},
            {a: 2, b: {b: 1}}
        ],
        [
            {a: 2, b: {a: [], b: 1}},
            true,
            {a: 1, b: {a: []}},
            {a: 2, b: {b: 1}}
        ],
        [{a: {a: [3, 4]}}, true, {a: {a: [1, 2]}}, {a: {a: [3, 4]}}],
        [{a: {a: null}}, true, {a: {a: [1, 2]}}, {a: {a: null}}],
        [{a: true}, true, {a: {a: [1, 2]}}, {a: true}],
        [{a: {_a: 1, b: 2}}, true, {a: {_a: 1}}, {a: {b: 2}}],
        [{a: 2, _a: 1}, false, {_a: 1}, {a: 2}],
        [false, true, {a: {a: [1, 2]}}, false],
        [
            undefined,
            true,
            {a: {a: [1, 2]}},
            undefined as unknown as Partial<unknown>
        ],
        [{a: 3}, true, {a: 1}, {a: 2}, {a: 3}],
        [[1, 2], true, [1], [1, 2]],
        [[1], true, [1, 2], [1]],
        [new Map(), true, new Map()],
        [
            new Map<string, Map<string, number>|number>(
                [['a', 2], ['b', new Map([['a', 1], ['b', 1]])]]
            ),
            true,
            new Map<string, Map<string, number>|number>(
                [['a', 1], ['b', new Map([['a', 1]])]]
            ),
            new Map<string, Map<string, number>|number>(
                [['a', 2], ['b', new Map([['b', 1]])]]
            )
        ],
        [
            new Map<string, Map<string, []|number>|number>(
                [
                    ['a', 2],
                    ['b', new Map<string, []|number>([['a', []], ['b', 1]])]
                ]
            ),
            true,
            new Map<string, Map<string, []>|number>(
                [['a', 1], ['b', new Map([['a', []]])]]
            ),
            new Map<string, Map<string, number>|number>(
                [['a', 2], ['b', new Map([['b', 1]])]]
            )
        ],
        [
            new Map<string, Map<string, Array<number>>>(
                [['a', new Map<string, Array<number>>([['a', [3, 4]]])]]
            ),
            true,
            new Map<string, Map<string, Array<number>>>(
                [['a', new Map([['a', [1, 2]]])]]
            ),
            new Map<string, Map<string, Array<number>>>(
                [['a', new Map([['a', [3, 4]]])]]
            )
        ],
        [[1, 2], [1, 2], undefined],
        [undefined, true, [1, 2], undefined as unknown as Partial<unknown>],
        [null, [1, 2], null as unknown as Partial<unknown>]
    )
    testEach<typeof getSubstructure>(
        'getSubstructure',
        getSubstructure,

        [{}, {}, []],
        [{}, {}, ['']],
        [{}, {}, ''],
        [1, {a: 1}, ['a']],
        [null, {a: {a: null}}, 'a.a'],
        [[], {a: {a: []}}, 'a.a'],
        [3, {a: {b: {c: 3}}}, ['a', 'b.c']],
        [3, {a: {b: {c: [3]}}}, ['a', 'b.c[0]']],
        [3, {a: {b: {c: [3]}}}, ['', 'a', '', 'b.c[0]', '', '']],
        [
            3,
            {a: {b: {c: [1, 3, 2]}}},
            (root:unknown):number =>
                (root as {a:{b:{c:Array<number>}}}).a.b.c[1]
        ],
        [
            3,
            {a: {b: {c: [1, 3, 2]}}},
            ['a', (root:unknown):number =>
                (root as {b:{c:Array<number>}}).b.c[1]]
        ]
    )
    test('getProxyHandler', ():void => {
        expect(isPlainObject(getProxyHandler({})))
            .toStrictEqual(true)
        expect(isPlainObject(getProxyHandler(new Map(), {get: 'get'})))
            .toStrictEqual(true)
    })
    testEach<typeof mask>(
        'mask',
        mask,

        [{}, {}, {}],
        [{a: 2}, {a: 2}, {}],
        [{}, {a: 2}, {include: false}],
        [{a: 2}, {a: 2}, {include: true}],
        [{a: 2}, {a: 2}, {include: {a: true}}],
        [{}, {a: 2}, {include: {b: true}}],
        [{}, {a: 2}, {include: {a: false}}],
        [{}, {a: 2}, {include: {b: false}}],
        [{a: 2}, {a: 2, b: 3}, {include: {a: true}}],
        [{}, {a: 2, b: 3}, {include: {}}],
        [{b: 3}, {a: 2, b: 3}, {include: {a: false, b: true}}],
        [{b: {a: 2}}, {a: 2, b: {a: 2}}, {include: {a: false, b: true}}],
        [{b: {}}, {a: 2, b: {a: 2}}, {include: {a: false, b: {}}}],
        [{b: {a: 2}}, {a: 2, b: {a: 2}}, {include: {a: false, b: {a: true}}}],
        [
            {a: 2, b: {}},
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: false}}}
        ],
        [
            {a: 2, b: {}},
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: false}, c: true}}
        ],
        [
            {a: 2, b: {a: 2}},
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: true}}}
        ],
        [
            {a: {a: {a: {a: 2}}}},
            {a: {a: {a: {a: 2, b: 3}}}},
            {include: {a: {a: {a: {a: true}}}}}
        ],
        [
            {a: {a: {a: {a: 2, b: 3}}}},
            {a: {a: {a: {a: 2, b: 3}}}},
            {include: {a: {a: {a: true}}}}
        ],
        [{}, {a: 2}, {exclude: true}],
        [{a: 2}, {a: 2}, {exclude: false}],
        [{}, {a: 2}, {exclude: {a: true}}],
        [{a: 2}, {a: 2}, {exclude: {b: true}}],
        [{a: 2}, {a: 2}, {exclude: {b: true}}],
        [{a: 2}, {a: 2, b: 3}, {exclude: {b: true}}],
        [{a: 2, b: 3}, {a: 2, b: 3}, {exclude: {b: false}}],
        [{a: 2, b: {a: 2}}, {a: 2, b: {a: 2}}, {exclude: {b: {}}}],
        [{a: 2, b: {}}, {a: 2, b: {a: 2}}, {exclude: {b: {a: true}}}],
        [{a: 2}, {a: 2, b: {a: 2}}, {exclude: {b: true}}],
        [{a: 2, b: {a: 2}}, {a: 2, b: {a: 2}}, {exclude: {b: {a: false}}}],
        [
            {a: {a: {a: {b: 3}}}},
            {a: {a: {a: {a: 2, b: 3}}}},
            {exclude: {a: {a: {a: {a: true}}}}}
        ],
        [
            {a: {a: {}}},
            {a: {a: {a: {a: 2, b: 3}}}},
            {exclude: {a: {a: {a: true}}}}
        ],
        [{a: 'a'}, {a: 'a', b: 'b'}, {exclude: ['b']}],
        [{b: 'b'}, {a: 'a', b: 'b'}, {include: ['b']}]
    )
    test.each([
        [{}, {}, {}, {}],
        [{a: 2}, {}, {a: 2}, {}],
        [{a: 2}, {b: 1}, {a: 2}, {b: 1}],
        [{}, {}, {a: 2}, {__remove__: 'a'}],
        [{}, {}, {a: 2}, {__remove__: ['a']}],
        [{a: [1, 2]}, {}, {a: [2]}, {a: {__prepend__: 1}}],
        [{a: [2]}, {}, {a: [2]}, {a: {__remove__: 1}}],
        [{a: [2]}, {}, {a: [2, 1]}, {a: {__remove__: 1}}],
        [{a: []}, {}, {a: [2, 1]}, {a: {__remove__: [1, 2]}}],
        [{a: []}, {}, {a: [1]}, {a: {__remove__: 1}}],
        [{a: []}, {}, {a: [1]}, {a: {__remove__: [1, 2]}}],
        [{a: [2, 1]}, {}, {a: [2]}, {a: {__append__: 1}}],
        [{a: [2, 1, 2]}, {}, {a: [2]}, {a: {__append__: [1, 2]}}],
        [
            {a: [2, 1, 2]},
            {b: 1},
            {a: [2]},
            {a: {__append__: [1, 2]}, b: 1}
        ],
        [
            {a: [2, 1, 2]},
            {b: 1},
            {a: [2]},
            {a: {add: [1, 2]}, b: 1},
            'rm',
            'unshift',
            'add'
        ],
        [
            {a: [2]},
            {a: {__prepend__: 1}},
            {a: [2]},
            {a: {__prepend__: 1}},
            '_r',
            '_p'
        ],
        [{a: [1, 3, 2]}, {}, {a: [2]}, {a: {__prepend__: [1, 3]}}],
        [
            {a: ['s', 2, 1, 2]},
            {},
            {a: [2]},
            {a: {__append__: [1, 2], __prepend__: 's'}}
        ],
        [
            {a: ['s', 2]},
            {},
            {a: [2, 2]},
            {a: {__prepend__: 's', __remove__: 2}}
        ],
        [
            {a: ['s']},
            {},
            {a: [2, 2]},
            {a: {__prepend__: 's', __remove__: [2, 2]}}
        ],
        [
            {a: ['s', 1, 'a']},
            {},
            {a: [2, 1, 2]},
            {a: {__prepend__: 's', __remove__: [2, 2], __append__: 'a'}}
        ],
        [
            {a: [2, 's', 2]},
            {},
            {a: [2, 1, 2]},
            {a: {__1__: 's'}}
        ],
        [
            {a: [2, 1, 2]},
            {a: {__3__: 's'}},
            {a: [2, 1, 2]},
            {a: {__3__: 's'}}
        ],
        [
            {a: [2, 1, 2]},
            {a: {__evaluate__: 's'}},
            {a: [2, 1, 2]},
            {a: {__evaluate__: 's'}}
        ]
    ])(
        '%p (=> %p) === modifyObject(%p, %p, ...%p)',
        (
            sliced:ReturnType<typeof modifyObject>,
            modified:SecondParameter<typeof modifyObject>,
            ...parameters:Parameters<typeof modifyObject>
        ):void => {
            expect(modifyObject(...parameters)).toStrictEqual(sliced)
            expect(parameters[1]).toStrictEqual(modified)
        }
    )
    test('normalizeDateTime', () =>
        expect(typeof normalizeDateTime()).toStrictEqual('object')
    )
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
    testEach<typeof removeKeyPrefixes>(
        'removeKeyPrefixes',
        removeKeyPrefixes,

        [{}, {}, []],
        [new Set(), new Set(), '#'],
        [new Map(), new Map(), []],
        [5, 5, []],
        ['a', 'a', []],
        [[], [], []],
        [{b: 3}, {a: 2, b: 3}, ['a']],
        [{b: 3}, {a: 2, a0: 2, b: 3}, ['a']],
        [
            new Map([['3', []]]),
            new Map<string, [string]|number>(
                [['3', ['a:to remove']], ['a', 3]]
            ),
            'a'
        ],
        [
            [{a: ['value']}],
            [{a: ['#:comment', 'value', '#: remove']}],
            '#'
        ],
        [
            [{a: new Set(['value'])}],
            [{a: new Set(['#:comment', 'value', '#: remove'])}],
            '#'
        ],
        [
            [{a: new Map([['key', 'value']])}],
            [{a: new Map([
                ['#', 'comment'], ['key', 'value'], ['#', 'remove']
            ])}],
            '#'
        ]
    )
    testEach<typeof represent>(
        'represent',
        represent,

        ['""', ''],
        [
            `{
                a: "A",
                b: 123,
                c: null,
                d: [
                    "a",
                    1,
                    null
                ]
            }`.replace(/(\n) {12}/g, '$1'),
            {
                a: 'A',
                b: 123,
                c: null,
                d: ['a', 1, null]
            }
        ]
    )
    testEach<typeof sort>(
        'sort',
        sort,

        [[], []],
        [[], {}],
        [[0], [1]],
        [[0, 1, 2], [1, 2, 3]],
        [[0, 1, 2], [3, 2, 1]],
        [[0, 1, 2], [2, 3, 1]],
        [['1', '2', '3'], {'1': 2, '2': 5, '3': 'a'}],
        [['-5', '1', '2'], {'2': 2, '1': 5, '-5': 'a'}],
        [['1', '2', '3'], {'3': 2, '2': 5, '1': 'a'}],
        [['a', 'b', 'c'], {a: 2, b: 5, c: 'a'}],
        [['a', 'b', 'c'], {c: 2, b: 5, a: 'a'}],
        [['b', 'c', 'z'], {b: 2, c: 5, z: 'a'}]
    )
    testEach<typeof unwrapProxy>(
        'unwrapProxy',
        unwrapProxy,

        [{}, {}],
        [{a: 'a'}, {a: 'a'}],
        [{a: 'aa'}, {a: 'aa'}],
        [{a: 2}, {a: {__revoke__: NOOP, __target__: 2}}]
    )
    /// endregion
    /// region array
    testEach<typeof aggregatePropertyIfEqual>(
        'aggregatePropertyIfEqual',
        aggregatePropertyIfEqual,

        ['b', [{a: 'b'}], 'a'],
        ['b', [{a: 'b'}, {a: 'b'}], 'a'],
        ['', [{a: 'b'}, {a: 'c'}], 'a'],
        [false, [{a: 'b'}, {a: 'c'}], 'a', false]
    )
    testEach<typeof deleteEmptyItems>(
        'deleteEmptyItems',
        deleteEmptyItems,

        [[], [{a: null}]],
        [[{a: null, b: 2}], [{a: null, b: 2}]],
        [[], [{a: null, b: 2}], ['a']],
        [[], [], ['a']],
        [[], []]
    )
    testEach<typeof extract>(
        'extract',
        extract,

        [[{a: 'b'}], [{a: 'b', c: 'd'}], ['a']],
        [[{}], [{a: 'b', c: 'd'}], ['b']],
        [[{c: 'd'}], [{a: 'b', c: 'd'}], ['c']],
        [[{c: 'd'}, {}], [{a: 'b', c: 'd'}, {a: 3}], ['c']],
        [[{c: 'd'}, {c: 3}], [{a: 'b', c: 'd'}, {c: 3}], ['c']]
    )
    testEach<typeof extractIfMatches>(
        'extractIfMatches',
        extractIfMatches,

        [['b'], ['b'], /b/],
        [['b'], ['b'], 'b'],
        [[], ['b'], 'a'],
        [[], [], 'a'],
        [['a', 'b'], ['a', 'b'], ''],
        [[], ['a', 'b'], '^$'],
        [['b'], ['a', 'b'], 'b'],
        [['a', 'b'], ['a', 'b'], '[ab]']
    )
    testEach<typeof extractIfPropertyExists>(
        'extractIfPropertyExists',
        extractIfPropertyExists,

        [[{a: 2}], [{a: 2}], 'a'],
        [[], [{a: 2}], 'b'],
        [[], [], 'b'],
        [[{a: 2}], [{a: 2}, {b: 3}], 'a']
    )
    testEach<typeof extractIfPropertyMatches>(
        'extractIfPropertyMatches',
        extractIfPropertyMatches,

        [[{a: 'b'}], [{a: 'b'}], {a: 'b'}],
        [[{a: 'b'}], [{a: 'b'}], {a: '.'}],
        [[], [{a: 'b'}], {a: 'a'}],
        [[], [], {a: 'a'}],
        [[], [{a: 2}], {b: /a/}],
        [
            [{mimeType: 'text/x-webm'}],
            [{mimeType: 'text/x-webm'}],
            {mimeType: /^text\/x-webm$/}
        ]
    )
    testEach<typeof intersect>(
        'intersect',
        intersect,

        [['A'], ['A'], ['A']],
        [['A'], ['A', 'B'], ['A']],
        [[], [], []],
        [[], [5], []],
        [[{a: 2}], [{a: 2}], [{a: 2}]],
        [[], [{a: 3}], [{a: 2}]],
        [[], [{a: 3}], [{b: 3}]],
        [[], [{a: 3}], [{b: 3}], ['b']],
        [[], [{a: 3}], [{b: 3}], ['b'], false],
        [[{b: null}], [{b: null}], [{b: null}], ['b']],
        [[], [{b: null}], [{b: undefined}], ['b']],
        [[{b: null}], [{b: null}], [{b: undefined}], ['b'], false],
        [[{b: null}], [{b: null}], [{}], ['b'], false],
        [[{b: undefined}], [{b: undefined}], [{}], ['b'], false],
        [[{}], [{}], [{}], ['b'], false],
        [[], [{b: null}], [{}], ['b']],
        [[{b: undefined}], [{b: undefined}], [{}], ['b'], true],
        [[{b: 1}], [{b: 1}], [{a: 1}], {b: 'a'}, true]
    )
    testEach<typeof makeArray>(
        'makeArray',
        makeArray,

        [[], []],
        [[1, 2, 3], [1, 2, 3]],
        [[1], 1]
    )
    testEach<typeof makeRange>(
        'makeRange',
        makeRange,

        [[], []],
        [[0], 0],
        [[0], [0]],
        [[0, 1, 2, 3, 4, 5], [5]],
        [[2, 3, 4, 5], [2, 5]],
        [[1, 2, 3], [1, 2, 3]],
        [[], [2, 1]],
        [[2, 4, 6, 8, 10], [2, 10], 2],
        [[2, 4, 6, 8], [2, 10], 2, true]
    )
    testEach<typeof merge>(
        'merge',
        merge,

        [[], [], []],
        [[1], [1], []],
        [[1], [], [1]],
        [[1, 1], [1], [1]],
        [[1, 2, 3, 1, 1, 2, 3], [1, 2, 3, 1], [1, 2, 3]]
    )
    testEach<typeof paginate>(
        'paginate',
        paginate,

        [
            [
                {
                    disabled: true,
                    page: 1,
                    selected: false,
                    type: 'previous'
                },
                {
                    disabled: false,
                    page: 1,
                    selected: true,
                    type: 'page'
                },
                {
                    disabled: true,
                    page: 1,
                    selected: false,
                    type: 'next'
                }
            ],
            {total: 1}
        ],
        [
            [
                {
                    disabled: false,
                    page: 2,
                    selected: false,
                    type: 'previous'
                },
                {
                    disabled: false,
                    page: 1,
                    selected: false,
                    type: 'page'
                },
                {
                    disabled: false,
                    page: 2,
                    selected: false,
                    type: 'page'
                },
                {
                    disabled: false,
                    page: 3,
                    selected: true,
                    type: 'page'
                },
                {
                    disabled: false,
                    page: 4,
                    selected: false,
                    type: 'page'
                },
                {
                    disabled: false,
                    page: 5,
                    selected: false,
                    type: 'page'
                },
                {
                    disabled: false,
                    selected: false,
                    type: 'end-ellipsis'
                },
                {
                    disabled: false,
                    page: 100,
                    selected: false,
                    type: 'page'
                },
                {
                    disabled: false,
                    page: 4,
                    selected: false,
                    type: 'next'
                }
            ],
            {
                page: 3,
                siblingCount: 1,
                total: 500
            }
        ]
    )
    testEach<typeof permutate>(
        'permutate',
        permutate,

        [[[]], []],
        [[[1]], [1]],
        [[[1, 2], [2, 1]], [1, 2]],
        [
            [
                [1, 2, 3],
                [1, 3, 2],
                [2, 1, 3],
                [2, 3, 1],
                [3, 1, 2],
                [3, 2, 1]
            ],
            [1, 2, 3]
        ],
        [
            [
                ['1', '2', '3'],
                ['1', '3', '2'],
                ['2', '1', '3'],
                ['2', '3', '1'],
                ['3', '1', '2'],
                ['3', '2', '1']
            ],
            ['1', '2', '3']
        ]
    )
    testEach<typeof permutateLength>(
        'permutateLength',
        permutateLength,

        [[], []],
        [[[1]], [1]],
        [[[1], [2], [1, 2]], [1, 2]],
        [
            [
                [1],
                [2],
                [3],
                [1, 2],
                [1, 3],
                [2, 3],
                [1, 2, 3]
            ],
            [1, 2, 3]
        ],
        [
            [
                ['1'],
                ['2'],
                ['3'],
                ['1', '2'],
                ['1', '3'],
                ['2', '3'],
                ['1', '2', '3']
            ],
            ['1', '2', '3']
        ]
    )
    testEach<typeof sumUpProperty>(
        'sumUpProperty',
        sumUpProperty,

        [5, [{a: 2}, {a: 3}], 'a'],
        [2, [{a: 2}, {b: 3}], 'a'],
        [0, [{a: 2}, {b: 3}], 'c']
    )
    testEach<typeof removeArrayItem>(
        'removeArrayItem',
        removeArrayItem,

        [[], [], 2],
        [[], [2], 2],
        [[], [2], 2, true],
        [[1], [1, 2], 2],
        [[1], [1, 2], 2, true]
    )
    test('arrayRemove([], 2, true) -> throws Exception', ():void =>
        expect(():Array<number> => removeArrayItem<number>([], 2, true))
            .toThrow(new Error(`Given target doesn't exists in given list.`))
    )
    testEach<typeof sortTopological>(
        'sortTopological',
        sortTopological,

        [[], {}],
        [['a'], {a: []}],
        [['b', 'a'], {a: 'b'}],
        [['a', 'b'], {a: [], b: 'a'}],
        [['a', 'b'], {a: [], b: ['a']}],
        [['b', 'a'], {a: ['b'], b: []}],
        [['a', 'b', 'c'], {c: 'b', a: [], b: ['a']}],
        [['a', 'b', 'c'], {b: ['a'], a: [], c: ['a', 'b']}]
    )
    testEachSingleParameterAgainstSameExpectation<typeof sortTopological>(
        'sortTopological',
        sortTopological,
        TEST_THROW_SYMBOL,

        {a: 'a'},
        {a: 'b', b: 'a'},
        {a: 'b', b: 'c', c: 'a'}
    )
    testEach<typeof unique>(
        'unique',
        unique,

        [[1, 2, 3], [1, 2, 3, 1]],
        [[1, 2, 3], [1, 2, 3, 1, 2, 3]],
        [[], []],
        [[1, 2, 3], [1, 2, 3]]
    )
    /// endregion
    /// region string
    testEach<typeof escapeRegularExpressions>(
        'EscapeRegularExpressions',
        escapeRegularExpressions,

        ['', ''],
        [`that's no regex: \\.\\*\\$`, `that's no regex: .*$`],
        ['\\-\\\\[\\]\\(\\)\\^\\$\\*\\+\\.}\\-', '-\\[]()^$*+.}-', ['}']],
        [
            '\\-\\[]()^$*+.{\\}\\-',
            '-\\[]()^$*+.{}-',
            ['[', ']', '(', ')', '^', '$', '*', '+', '.', '{']
        ],
        ['\\-', '-', ['\\']]
    )
    testEach<typeof convertToValidVariableName>(
        'convertToValidVariableName',
        convertToValidVariableName,

        ['', ''],
        ['a', 'a'],
        ['_a', '_a'],
        ['_a_a', '_a_a'],
        ['_aA', '_a-a'],
        ['aA', '-a-a'],
        ['aA', '-a--a'],
        ['aA', '--a--a']
    )
    //// region url handling
    testEach<typeof encodeURIComponent>(
        'encodeURIComponent',
        encodeURIComponent,

        ['', ''],
        ['+', ' '],
        ['%20', ' ', true],
        ['@:$,+', '@:$, '],
        ['%2B', '+']
    )
    testEach<typeof addSeparatorToPath>(
        'addSeparatorToPath',
        addSeparatorToPath,

        ['', ''],
        ['/', '/'],
        ['/a/', '/a'],
        ['/a/bb/', '/a/bb/'],
        ['/a/bb/', '/a/bb'],
        ['/a/bb|', '/a/bb', '|'],
        ['/a/bb/|', '/a/bb/', '|']
    )
    testEachAgainstSameExpectation<typeof hasPathPrefix>(
        'hasPathPrefix',
        hasPathPrefix,
        true,

        ['/admin', '/admin'],
        ['test', 'test'],
        ['', ''],
        ['a', 'a/b'],
        ['a/', 'a/b'],
        ['/admin', '/admin#test', '#']
    )
    testEachAgainstSameExpectation<typeof hasPathPrefix>(
        'hasPathPrefix',
        hasPathPrefix,
        false,

        ['b', 'a/b'],
        ['b/', 'a/b'],
        ['/admin/', '/admin/test', '#'],
        ['/admin', '/admin/test', '#']
    )
    testEach<typeof getDomainName>(
        'getDomainName',
        getDomainName,

        ['www.test.de', 'https://www.test.de/site/subSite?param=value#hash'],
        ['', 'a', ''],
        ['www.test.de', 'http://www.test.de'],
        ['a.de', 'http://a.de'],
        ['localhost', 'http://localhost'],
        ['a', 'localhost', 'a'],
        /*
            NOTE: "$.location?.hostname" does not work since experiencing a
            compiler bug.
        */
        [
            $.location && $.location.hostname || '',
            'a',
            $.location && $.location.hostname
        ],
        ['a', '//a'],
        [
            $.location && $.location.hostname || '',
            'a/site/subSite?param=value#hash',
            $.location && $.location.hostname
        ],
        [
            $.location && $.location.hostname || '',
            '/a/site/subSite?param=value#hash',
            $.location && $.location.hostname
        ],
        [
            'alternate.local',
            '//alternate.local/a/site/subSite?param=value#hash'
        ],
        ['alternate.local', '//alternate.local/']
    )
    testEach<typeof getPortNumber>(
        'getPortNumber',
        getPortNumber,

        [443, 'https://www.test.de/site/subSite?param=value#hash'],
        [80, 'http://www.test.de'],
        [0, 'http://www.test.de', 0],
        [0, 'www.test.de', 0],
        [0, 'a', 0],
        [0, 'a', 0],
        [80, 'a:80'],
        [20, 'a:20'],
        [444, 'a:444'],
        [89, 'http://localhost:89'],
        [89, 'https://localhost:89']
    )
    testEach<typeof getProtocolName>(
        'getProtocolName',
        getProtocolName,

        ['https', 'https://www.test.de/site/subSite?param=value#hash'],
        ['http', 'http://www.test.de'],
        /*
            NOTE: "$.location?.hostname" does not work since experiencing a
            compiler bug.
        */
        [
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1) ||
                '',
            '//www.test.de',
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1)
        ],
        ['http', 'http://a.de'],
        ['ftp', 'ftp://localhost'],
        [
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1) ||
                '',
            'a',
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1)

        ],
        [
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1) ||
                '',
            'a/site/subSite?param=value#hash',
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1)

        ],
        ['a', '/a/site/subSite?param=value#hash', 'a'],
        ['b', 'alternate.local/a/site/subSite?param=value#hash', 'b'],
        ['c', 'alternate.local/', 'c'],
        [
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1) ||
                '',
            '',
            $.location &&
            $.location.protocol.substring(0, $.location.protocol.length - 1)
        ]
    )
    test.each([
        [null], [null, true, '&'], [null, false, '&'], [null, false, '#']
    ])(
        'Array.isArray(getURLParameter(...%p)) === true',
        (...parameters:Parameters<typeof getURLParameter>):void =>
            expect(Array.isArray(getURLParameter(...parameters)))
                .toStrictEqual(true)
    )
    testEach<typeof getURLParameter>(
        'getURLParameter',
        getURLParameter,

        [null, 'notExisting'],
        [null, 'notExisting', true],
        [null, 'notExisting', false, '&'],
        [null, 'notExisting', false, '#'],
        [null, 'notExisting', true, '#'],
        ['2', 'test', false, '?test=2'],
        ['2', 'test', false, 'test=2'],
        ['2', 'test', false, 'test=2&a=2'],
        ['2', 'test', false, 'b=3&test=2&a=2'],
        ['2', 'test', false, '?b=3&test=2&a=2'],
        ['2', 'test', false, '?b=3&test=2&a=2'],
        [['2'], 'test', true, '?b=3&test=2&a=2'],
        [['1', '2'], 'test', true, '?test=1&b=3&test=2&a=2'],
        ['2', 'test', false, '&', '$', '!', '', '#$test=2'],
        ['4', 'test', false, '&', '$', '!', '?test=4', '#$test=3'],
        [null, 'a', false, '&', '$', '!', '?test=4', '#$test=3'],
        ['3', 'test', false, '#', '$', '!', '?test=4', '#$test=3'],
        ['4', 'test', false, '#', '$', '!', '', '#!test#$test=4'],
        ['4', 'test', false, '#', '$', '!', '', '#!/test/a#$test=4'],
        ['4', 'test', false, '#', '$', '!', '', '#!/test/a/#$test=4'],
        ['4', 'test', false, '#', '$', '!', '', '#!test/a/#$test=4'],
        ['4', 'test', false, '#', '$', '!', '', '#!/#$test=4'],
        ['4', 'test', false, '#', '$', '!', '', '#!test?test=3#$test=4'],
        ['3', 'test', false, '&', '?', '!', null, '#!a?test=3'],
        ['4', 'test', false, '&', '$', '!', null, '#!test#$test=4'],
        ['4', 'test', false, '&', '$', '!', null, '#!test?test=3#$test=4'],
        [['4'], 'test', true, '&', '$', '!', null, '#!test?test=3#$test=4'],
        [
            ['2', '4'],
            'test',
            true,
            '&',
            '$',
            '!',
            null,
            '#!test?test=3#$test=2&test=4'
        ]
    )
    testEachAgainstSameExpectation<typeof serviceURLEquals>(
        'serviceURLEquals',
        serviceURLEquals,
        true,

        [
            'https://www.test.de/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'
        ],
        [
            '//www.test.de/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'
        ],
        /*
            NOTE: "$.location?.hostname" does not work since experiencing a
            compiler bug.
        */
        [
            `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
                'site/subSite?param=value#hash',
            `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
                'site/subSite?param=value#hash'
        ],
        [
            'https://www.test.de:443/site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'
        ],
        [
            '//www.test.de:80/site/subSite?param=value#hash',
            '//www.test.de/site/subSite?param=value#hash'
        ],
        [
            $.location && $.location.href || 'http://localhost',
            $.location && $.location.href || 'http://localhost'
        ],
        ['1', $.location && $.location.href || 'http://localhost'],
        ['#1', $.location && $.location.href || 'http://localhost'],
        ['/a', $.location && $.location.href || 'http://localhost']
    )
    testEachAgainstSameExpectation<typeof serviceURLEquals>(
        'serviceURLEquals',
        serviceURLEquals,
        false,

        /*
            NOTE: "$.location?.hostname" does not work since experiencing a
            compiler bug.
        */
        [
            `${$.location && $.location.protocol || 'http:'}//www.test.de/` +
                'site/subSite?param=value#hash',
            'ftp://www.test.de/site/subSite?param=value#hash'
        ],
        [
            'https://www.test.de/site/subSite?param=value#hash',
            'http://www.test.de/site/subSite?param=value#hash'
        ],
        [
            'http://www.test.de/site/subSite?param=value#hash',
            'test.de/site/subSite?param=value#hash'
        ],
        [
            `${$.location && $.location.protocol || 'http:'}//www.test.de:` +
            `${$.location && $.location.port || 80}/site/subSite` +
            '?param=value#hash/site/subSite?param=value#hash',
            $.location && $.location.href || 'http://localhost:8080'
        ],
        [
            `http://www.test.de:${$.location && $.location.port || 80}/` +
                'site/subSite?param=value#hash',
            'https://www.test.de/site/subSite?param=value#hash'
        ]
    )
    testEach<typeof normalizeURL>(
        'normalizeURL',
        normalizeURL,

        ['http://www.test.com', 'www.test.com'],
        ['http://test', 'test'],
        ['http://test', 'http://test'],
        ['https://test', 'https://test']
    )
    testEach<typeof representURL>(
        'representURL',
        representURL,

        ['www.test.com', 'http://www.test.com'],
        ['ftp://www.test.com', 'ftp://www.test.com'],
        ['www.test.com', 'https://www.test.com'],
        ['', undefined],
        ['', null],
        ['', false],
        ['', true],
        ['', ''],
        ['', ' ']
    )
    //// endregion
    testEach<typeof camelCaseToDelimited>(
        'camelCaseToDelimited',
        camelCaseToDelimited,

        ['hans-peter', 'hansPeter'],
        ['hans|peter', 'hansPeter', '|'],
        ['', ''],
        ['h', 'h'],
        ['hp', 'hP', ''],
        ['hans-peter', 'hansPeter'],
        ['hans-peter', 'hans-peter'],
        ['hans_peter', 'hansPeter', '_'],
        ['hans+peter', 'hansPeter', '+'],
        ['hans', 'Hans'],
        ['hans-api-url', 'hansAPIURL', '-', ['api', 'url']],
        ['hans-peter', 'hansPeter', '-', []]
    )
    testEach<typeof capitalize>(
        'capitalize',
        capitalize,

        ['HansPeter', 'hansPeter'],
        ['', ''],
        ['A', 'a'],
        ['A', 'A'],
        ['AA', 'AA'],
        ['Aa', 'Aa'],
        ['Aa', 'aa']
    )
    testEach<typeof compressStyleValue>(
        'compressStyleValue',
        compressStyleValue,

        ['', ''],
        ['border:1px solid red', ' border: 1px  solid red;'],
        ['border:1px solid red', 'border : 1px solid red '],
        ['border:1px solid red', 'border : 1px  solid red ;'],
        ['border:1px solid red', 'border : 1px  solid red   ; '],
        ['height:1px;width:2px', 'height: 1px ; width:2px ; '],
        ['height:1px;width:2px', ';;height: 1px ; width:2px ; ;'],
        ['height:1px;width:2px', ' ;;height: 1px ; width:2px ; ;'],
        ['height:1px;width:2px', ';height: 1px ; width:2px ; ']
    )
    testEach<typeof decodeHTMLEntities>(
        'decodeHTMLEntities',
        decodeHTMLEntities,

        [$.document ? '' : null, ''],
        [$.document ? '<div></div>' : null, '<div></div>'],
        [$.document ? '<div>&</div>' : null, '<div>&amp;</div>'],
        [
            $.document ? '<div>&äÄüÜöÖ</div>' : null,
            '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>'
        ]
    )
    testEach<typeof delimitedToCamelCase>(
        'delimitedToCamelCase',
        delimitedToCamelCase,

        ['hansPeter', 'hans-peter'],
        ['hansPeter', 'hans|peter', '|'],
        ['', ''],
        ['h', 'h'],
        ['hansPeter', 'hans-peter'],
        ['hans-Peter', 'hans--peter'],
        ['HansPeter', 'Hans-Peter'],
        ['-HansPeter', '-Hans-Peter'],
        ['-', '-'],
        ['hans-peter', 'hans-peter', '_'],
        ['hansPeter', 'hans_peter', '_'],
        ['hansID', 'hans_id', '_'],
        ['urlHANSId', 'url_hans_id', '_', ['hans']],
        ['urlHans1', 'url_hans_1', '_'],
        ['hansUrl1', 'hansUrl1', '-', ['url'], true],
        ['hansURL', 'hans-url', '-', ['url'], true],
        ['hansUrl', 'hans-Url', '-', ['url'], true],
        ['hansURL', 'hans-Url', '-', ['url'], false],
        ['hansUrl', 'hans-Url', '-', [], false],
        ['hansUrl', 'hans--Url', '-', [], false, true]
    )
    test.each([
        ['function', 'null', []],
        ['function', 'null', {}],
        ['function', '5 === 3', {name: 2}],
        ['function', '5 === 3', ['name']],
        ['function', '', []]
    ])(
        `'%s' === typeof compile('%s', %p).templateFunction`,
        (expected:string, ...parameters:Parameters<typeof compile>) =>
            expect<string>(typeof compile(...parameters).templateFunction)
                .toStrictEqual(expected)
    )
    //// region compile / evaluation
    ///// region compile
    test.each([
        ['string', '= null', []],
        ['string', '{', {}],
        ['object', '', {}]
    ])(
        `'%s' === typeof compile('%s', %p).error`,
        (expected:string, ...parameters:Parameters<typeof compile>) =>
            expect<string>(typeof compile(...parameters).error)
                .toStrictEqual(expected)
    )
    test.each([
        [
            `
                function anonymous(
                ) {
                return null
                }
            `,
            'null'
        ],
        [
            `
                function anonymous(
                ) {
                return \`test \${test} value\`
                }
            `,
            '`test ${test} value`'
        ],
        [
            `
                function anonymous(
                ) {
                return \`test \${test} value\`
                }
            `,
            '`test ${test} value`'
        ],
        [
            `
                function anonymous(
                ) {
                return \`test \\\${test} value\`
                }
            `,
            '`test \\${test} value`'
        ]
    ])(
        '"%s" === String(compile("%s").templateFunction)',
        (expected:string, expression:FirstParameter<typeof compile>) =>
            expect(
                String(compile(expression, [], false, false)
                    .templateFunction)
            ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))
    )
    test.each([
        [
            `
                function anonymous(
                ) {
                return String(a + b)
                }
            `,
            '`${a + b}`'
        ],
        [
            `
                function anonymous(
                ) {
                return 'test '+(name)+' - '+(other)+' value'
                }
            `,
            '`test ${name} - ${other} value`'
        ],
        [
            `
                function anonymous(
                ) {
                return "test "+(name)+" '-' "+(other)+" value"
                }
            `,
            '`test ${name} \'-\' ${other} value`'
        ],
        [
            `
                function anonymous(
                ) {
                return "test "+(name)+" '-' "+(other)+"                  value"
                }
            `,
            `\`test \${name} '-' \${other}
                  value\``
        ],
        [
            `
                function anonymous(
                ) {
                return String(loading ? 'A' : 'B')
                }
            `,
            `\`\${loading ? 'A' : 'B'}\``
        ],
        [
            `
                function anonymous(
                ) {
                return String(loading ? 'A' : results.join(''))
                }
            `,
            `\`\${loading ? 'A' : results.join('')}\``
        ],
        [
            `
                function anonymous(
                ) {
                return "[: "+(loading ? 'A' : results.join(''))+" :]"
                }
            `,
            `\`[: \${loading ? 'A' : results.join('')} :]\``
        ],
        [
            `
                function anonymous(
                ) {
                return '[: '+(a ? '<div class="idle">loading...</div>' : ` +
            `results.join(''))+' :]'
                }
            `,
            `\`[: \${a ?\n '<div class="idle">loading...</div>' : ` +
            `results.join('')} :]\``
        ],
        [
            `
                function anonymous(
                ) {
                return ' '+(loading ?                ` +
            `'<div class="idle">loading...</div>' :                ` +
            `results.map(function(result) {                    ` +
            `return ('<ul>' +                        '<li>' +               ` +
            `             Object.keys(result)                               ` +
            ` .filter(function(name) {                                    ` +
            `return ['number', 'string']                                    ` +
            `    .includes(typeof result[name])                             ` +
            `   })                                .join('') +               ` +
            `         '</li>' +                    '</ul>')                ` +
            `}).join('')            )+''
                }
            `,
            `\` \${loading ?
                '<div class="idle">loading...</div>' :
                results.map(function(result) {
                    return ('<ul>' +
                        '<li>' +
                            Object.keys(result)
                                .filter(function(name) {
                                    return ['number', 'string']
                                        .includes(typeof result[name])
                                })
                                .join('') +
                        '</li>' +
                    '</ul>')
                }).join('')
            }\``.replace('\n', '')
        ],
        [
            `
                function anonymous(
                ) {
                return 'test {test} value'
                }
            `,
            '`test {test} value`'
        ],
        [
            `
                function anonymous(
                ) {
                return 'test \\\${test} value \\\${test}'
                }
            `,
            '`test \\${test} value \\${test}`'
        ]
    ])(
        'IE 11: "%s" === String(compile("%s").templateFunction)',
        (expected:string, expression:FirstParameter<typeof compile>) => {
            const backup = MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value
            MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = 11

            expect(
                String(compile(expression, [], false, false).templateFunction)
            ).toStrictEqual(expected.trim().replace(/\n +/g, '\n'))

            MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = backup
        }
    )
    ///// endregion
    ///// region evaluate
    const advancedTemplateEvaluationExample:string = `\`\${loading ?
        '<div class="idle">loading...</div>' :
        results.map(function(result) {
            return ('<ul>' +
                '<li>' +
                    Object.keys(result)
                        .filter(function(name) {
                            return ['number', 'string']
                                .includes(typeof result[name])
                        })
                        .join('') +
                '</li>' +
            '</ul>')
        }).join('')
    }\``.replace('\n', '')
    type MandatoryGivenStringEvaluateTestTuple = [
        FirstParameter<typeof evaluate>,
        Mapping<unknown>,
        'compileError'|'result'|'runtimeError'
    ]
    type GivenStringEvaluateTestTuple = [
        ...MandatoryGivenStringEvaluateTestTuple, unknown?, unknown?
    ]
    type StringEvaluateTestTuple = [
        ...MandatoryGivenStringEvaluateTestTuple, unknown, unknown
    ]
    test.each(([
        ['null', {}, 'result', null],
        ['5', {}, 'result', 5],
        ['a', {a: 2}, 'result', 2],
        ['a + b', {a: 2, b: 3}, 'result', 5],
        ['a + b + this.c', {a: 2, b: 3}, 'result', 6, {c: 1}],
        ['a + b + c', {a: 2, b: 3}, 'runtimeError'],
        ['}', {a: 2}, 'compileError'],
        ['}', {}, 'compileError'],
        [
            '`test \\${test} value \\${test}`',
            {},
            'result',
            'test ${test} value ${test}'
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: false, results: []},
            'result',
            ''
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: false, results: [{a: 'a'}]},
            'result',
            '<ul><li>a</li></ul>'
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: true, results: []},
            'result',
            '<div class="idle">loading...</div>'
        ]
    ] as Array<GivenStringEvaluateTestTuple>).map((
        parameters:GivenStringEvaluateTestTuple
    ):StringEvaluateTestTuple =>
        parameters.concat(undefined, undefined).slice(0, 5) as
            StringEvaluateTestTuple
    ))(
        'evaluate(`%s`, %p...)[%p] === %p',
        (
            expression:string,
            scope:Mapping<unknown>,
            resultKey:string,
            expected:unknown,
            binding:unknown
        ):void => {
            const evaluation:EvaluationResult = evaluate(
                expression,
                scope,
                false,
                false,
                binding
            )

            expect(evaluation).toHaveProperty(resultKey)

            if (expected !== undefined)
                if (
                    resultKey === 'result' &&
                    typeof evaluation[resultKey] === 'string'
                )
                    expect(evaluation[resultKey].trim())
                        .toStrictEqual(expected)
                else
                    expect(evaluation[resultKey as keyof EvaluationResult])
                        .toStrictEqual(expected)
        }
    )
    test.each(([
        ['null', {}, 'result', null],
        ['window', {}, 'result', undefined],
        ['globalThis', {}, 'result', undefined],
        ['globalThis', {globalThis: 5}, 'result', 5]
    ] as Array<GivenStringEvaluateTestTuple>).map((
        parameters:GivenStringEvaluateTestTuple
    ):StringEvaluateTestTuple =>
            parameters.concat(undefined, undefined).slice(0, 5) as
                StringEvaluateTestTuple
    ))(
        'evaluate(`%s`, %p...)[%p] === %p',
        (
            expression:string,
            scope:Mapping<unknown>,
            resultKey:string,
            expected:unknown
        ):void => {
            const evaluation:EvaluationResult = evaluate(
                expression,
                scope,
                false
            )

            expect(evaluation).toHaveProperty(resultKey)

            if (expected !== undefined)
                if (
                    resultKey === 'result' &&
                    typeof evaluation[resultKey] === 'string'
                )
                    expect(evaluation[resultKey].trim())
                        .toStrictEqual(expected)
                else
                    expect(evaluation[resultKey as keyof EvaluationResult])
                        .toStrictEqual(expected)
        }
    )
    test.each(([
        [
            '`test \\${test} value \\${test}`',
            {},
            'result',
            'test ${test} value ${test}'
        ],
        /*
            Nested quotes in code can work in IE 11 if only one type of quote
            is used according to escaping.
        */
        [
            `\`
                <div class="test">
                    \\\${Object.keys(item)
                        .filter(function(name) {
                            return true
                        })
                        .join(",")
                    }
                </div>
            \``.replace(/(\s\s+)|\n+/g, ''),
            {},
            'result',
            '<div class="test">' +
            '${Object.keys(item).filter(function(name) {' +
            'return true' +
            '}).join(",")}' +
            '</div>'
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: false, results: []}, 'result', ''
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: false, results: [{a: 'a'}]},
            'result',
            '<ul><li>a</li></ul>'
        ],
        [
            advancedTemplateEvaluationExample,
            {loading: true, results: []},
            'result',
            '<div class="idle">loading...</div>'
        ]
    ] as Array<GivenStringEvaluateTestTuple>).map((
        parameters:GivenStringEvaluateTestTuple
    ):StringEvaluateTestTuple =>
        parameters.concat(undefined, undefined).slice(0, 5) as
            StringEvaluateTestTuple
    ))(
        'IE 11: evaluate(`%s`, %p...)[%p] === %p',
        (
            expression:string,
            scope:Mapping<unknown>,
            resultKey:string,
            expected:unknown,
            binding:unknown
        ):void => {
            const backup = MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value
            MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = 11

            const evaluation:EvaluationResult = evaluate(
                expression,
                scope,
                false,
                true,
                binding
            )

            expect(evaluation).toHaveProperty(resultKey)

            if (expected !== undefined)
                if (
                    resultKey === 'result' &&
                    typeof evaluation[resultKey] === 'string'
                )
                    expect(evaluation[resultKey].trim())
                        .toStrictEqual(expected)
                else
                    expect(evaluation[resultKey as keyof EvaluationResult])
                        .toStrictEqual(expected)

            MAXIMAL_SUPPORTED_INTERNET_EXPLORER_VERSION.value = backup
        }
    )
    ///// endregion
    //// endregion
    testEach<typeof findNormalizedMatchRange>(
        'findNormalizedMatchRange',
        findNormalizedMatchRange,

        [null, '', ''],
        [null, 'hans', ''],
        [[1, 2], 'hans', 'a'],
        [[1, 3], 'hans', 'an'],
        [[0, 3], 'hans', 'han'],
        [[0, 4], 'hans', 'hans'],
        [[1, 4], 'hans', 'ans'],
        [[1, 4], 'hans hans', 'ans'],
        [
            [2, 5],
            ' hAns ',
            'ans',
            (value:unknown):string => (value as string).toLowerCase()
        ],
        [
            [2, 8],
            'a straße b', 'strasse',
            (value:unknown):string =>
                (value as string).replace(/ß/g, 'ss').toLowerCase()
        ],
        [
            [2, 9],
            'a strasse b',
            'strasse',
            (value:unknown):string =>
                (value as string).replace(/ß/g, 'ss').toLowerCase()
        ],
        [
            [2, 9],
            'a strasse b',
            'straße',
            (value:unknown):string =>
                (value as string).replace(/ß/g, 'ss').toLowerCase()
        ]
    )
    testEach<typeof fixKnownEncodingErrors>(
        'fixKnownEncodingErrors',
        fixKnownEncodingErrors,

        ['', ''],
        ['a', 'a'],
        ['-', '\x96'],
        ['a-a', 'a\x96a']
    )
    testEach<typeof format>(
        'gormat',
        format,

        ['test', '{1}', 'test'],
        ['', '', 'test'],
        ['{1}', '{1}'],
        ['1 test 2 - 2', '{1} test {2} - {2}', 1, 2]
    )
    testEach<typeof getEditDistance>(
        'getEditDistance',
        getEditDistance,

        [0, '', ''],
        [0, 'h', 'h'],
        [0, 'hans', 'hans'],
        [1, 'hans', 'hansa'],
        [1, 'hansa', 'hans'],
        [1, 'hans', 'hbns'],
        [1, 'hbns', 'hans'],
        [2, 'hbbs', 'hans'],
        [4, 'beer', 'hans']
    )
    testEach<typeof maskForRegularExpression>(
        'maskForRegularExpression',
        maskForRegularExpression,

        [`that's no regex: \\.\\*\\$`, `that's no regex: .*$`],
        ['', ''],
        ['\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\', '-[]()^$*+.}-\\'],
        ['\\-', '-']
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
        // TODO [new Date(1970, 1 - 1, 1, 1), '01:00 A.M.'],
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
    testEach<typeof lowerCase>(
        'lowerCase',
        lowerCase,

        ['hansPeter', 'HansPeter'],
        ['', ''],
        ['a', 'A'],
        ['a', 'a'],
        ['aa', 'aa'],
        ['aa', 'Aa'],
        ['aA', 'aA']
    )
    testEach<typeof mark>(
        'mark',
        mark,

        ['', ''],
        ['t<span class="tools-mark">e</span>st', 'test', 'e'],
        ['t<span class="tools-mark">es</span>t', 'test', 'es'],
        ['<span class="tools-mark">test</span>', 'test', 'test'],
        ['test', 'test', ''],
        ['test', 'test', 'tests'],
        ['', '', 'test'],
        [
            't<a>e</a>st',
            'test',
            'e',
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            't<a>e</a>st',
            'test',
            ['e'],
            {
                marker: '<a>{1}</a>',
                normalizer: identity as (_value:unknown) => string
            }
        ],
        [
            't<a>e</a>st',
            'test',
            'E',
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            't<a>E</a>st',
            'tEst',
            'e',
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            '<a>t</a>es<a>T</a>',
            'tesT',
            't',
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            '<a>t - t</a>es<a>T - T</a>',
            'tesT',
            't',
            {
                marker: '<a>{1} - {1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            'test',
            'test',
            'E',
            {
                marker: '<a>{1}</a>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            '<span class="tools-mark">a</span>b' +
            '<span class="tools-mark">c</span>d',
            'abcd',
            ['a', 'c']
        ],
        [
            '<span class="tools-mark">a</span>' +
            '<span class="tools-mark">a</span>b' +
            '<span class="tools-mark">c</span>d',
            'aabcd',
            ['a', 'c']
        ],
        [
            '<span class="tools-mark">a</span>' +
            '<span class="tools-mark">c</span>b' +
            '<span class="tools-mark">c</span>' +
            '<span class="tools-mark">d</span>',
            'acbcd',
            ['a', 'c', 'd']
        ],
        [
            'a <a>EBikes</a> <a>München</a>',
            'a EBikes München',
            ['ebikes', 'münchen'],
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase()
            }
        ],
        [
            'a <a>E-Bikes</a> <a>München</a>',
            'a E-Bikes München',
            ['ebikes', 'münchen'],
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`.toLowerCase().replace('-', '')
            }
        ],
        [
            'a <a>str.</a> <a>2</a>',
            'a str. 2',
            ['straße', '2'],
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`
                        .toLowerCase()
                        .replace('str.', 'strasse')
                        .replace('ß', 'ss')
            }
        ],
        [
            'EGO Movement Store <a>E-Bikes</a> <a>München</a>',
            'EGO Movement Store E-Bikes München',
            ['eBikes', 'München'],
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`
                        .toLowerCase()
                        .replace(/[-_]+/g, '')
                        .replace(/ß/g, 'ss')
                        .replace(/(^| )str\./g, '$1strasse')
                        .replace(/[& ]+/g, ' ')
            }
        ],
        [
            '<a>str.</a>A <a>strasse</a> B <a>straße</a> C <a>str.</a> D',
            'str.A strasse B straße C str. D',
            ['str.'],
            {
                marker: '<a>{1}</a>',
                normalizer: (value:unknown):string =>
                    `${value as string}`
                        .toLowerCase()
                        .replace(/[-_]+/g, '')
                        .replace(/ß/g, 'ss')
                        .replace(/(^| )str\./g, '$1strasse')
                        .replace(/[& ]+/g, ' ')
            }
        ],
        [
            '<mark>test</mark> <a>link</a>',
            'test <a>link</a>',
            ['test'],
            {
                marker: '<mark>{1}</mark>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            'test <a><mark>link</mark></a>',
            'test <a>link</a>',
            ['link'],
            {
                marker: '<mark>{1}</mark>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            'test <a href="foo">link</a>',
            'test <a href="foo">link</a>',
            ['foo'],
            {
                marker: '<mark>{1}</mark>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            'test <a href="foo">a <mark>foo</mark> link</a>',
            'test <a href="foo">a foo link</a>',
            ['foo'],
            {
                marker: '<mark>{1}</mark>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            'test [a href="foo"]a [mark]foo[/mark] link[/a]',
            'test [a href="foo"]a foo link[/a]',
            ['foo'],
            {
                marker: '[mark]{1}[/mark]',
                normalizer: identity as (value:unknown) => string,
                skipTagDelimitedParts: ['[', ']']
            }
        ],
        [
            '<mark>foo</mark> <mark>foo</mark> <mark>foo</mark>',
            'foo foo foo',
            ['foo'],
            {
                marker: '<mark>{1}</mark>',
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            [
                '<mark>foo</mark>',
                ' ',
                '<mark>foo</mark>',
                ' ',
                '<mark>foo</mark>'
            ],
            'foo foo foo',
            ['foo'],
            {
                marker: (foundWord:string) => `<mark>${foundWord}</mark>`,
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            [],
            '',
            ['foo'],
            {
                marker: (foundWord:string) => `<a>${foundWord}</a>`,
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            ['<a>a</a>'],
            'a',
            ['a'],
            {
                marker: (foundWord:string) => `<a>${foundWord}</a>`,
                normalizer: identity as (value:unknown) => string
            }
        ],
        [
            ['a', {foundWord: 'b'}, 'a'],
            'aba',
            ['b'],
            {
                marker: (foundWord:string):{foundWord:string} => ({foundWord}),
                normalizer: identity as (value:unknown) => string
            }
        ]
    )
    testEach<typeof normalizePhoneNumber>(
        'normalizePhoneNumber',
        normalizePhoneNumber,

        ['0', '0'],
        ['0', ' 0  '],
        ['0', 0],
        ['12345', 12345],
        ['0049172002123', '+49 172 (0) / 0212 - 3'],
        ['', 'no entry', true],
        ['', 'no entry', false],
        ['', '', false],
        ['0', '0', false],
        ['0', ' 0  ', false],
        ['0', 0, false],
        ['12345', 12345, false],
        ['0049-176-1234-56', '+49 (0) 176-12 34-56', false],
        ['0049-176-123456', '+49(0)176 12-34 56', false],
        ['0049-176-123456', '+49 176 12 34 56', false],
        ['0049-176-123456', '+49-176-12 34 56', false],
        ['0172-12555433', '0172/12555433', false],
        ['0176-123456', '0176 12 34 56', false],
        ['01761-23456', '01761 234 56', false],
        ['0049-178-123456', '+49 (178) 12 34 56', false],
        ['0049-178-123456', '+49(178)123456', false],
        ['0049-178-12345-6', '+49(178)12345-6', false],
        ['0049-178-12345-6', '+49 (178) 123 45-6', false],
        ['06132-77-0', '06132-77-0', false],
        ['06132-77-0', '06132-77-0 ', false],
        ['06132-770', '06132-77-0a', false],
        ['06132-770', '06132-77-0a ', false],
        ['06132-770', '  06132-77-0a ', false],
        ['06132-770', '  061 32-77-0a ', false],
        ['06132-77-0', '  061 32-77-0 ', false],
        ['0061-32-77-0', '  0061 32-77-0 ', false],
        ['0061-32-77-0', '  +61 32-77-0 ', false],
        ['05661-711677', '05661-711677', false],
        ['0174-5661677', '0174/5661677', false],
        ['0049-174-5661677', '+49 (0) 174 / 566 16 77', false],
        ['0049-174-5661677', '+49 (174) 566 16 77', false],
        ['0049-174-5661677', ' +49 (174) 566 16 77 ', false],
        ['0291-1455', '02 91 / 14 55', false],
        ['03677842375', '03677842375', false]
    )
    testEach<typeof normalizeZipCode>(
        'normalizeZipCode',
        normalizeZipCode,

        ['0', '0'],
        ['0', ' 0  '],
        ['0', 0],
        ['12345', 12345],
        ['', 'abc'],
        ['12345', '1B23A45'],
        ['12345', ' 1B23A45 ']
    )
    if (TARGET_TECHNOLOGY === 'node')
        testEach<typeof parseEncodedObject>(
            'parseEncodedObject',
            parseEncodedObject,

            [null, ''],
            [null, 'null'],
            [{a: undefined}, '{a: undefined}'],
            [{a: undefined}, Buffer.from('{a: undefined}').toString('base64')],
            [{a: 2}, '{a: 2}'],
            [{a: 1}, Buffer.from('{a: 1}').toString('base64')],
            [null, 'null'],
            [null, Buffer.from('null').toString('base64')],
            [{}, '{}'],
            [{}, Buffer.from('{}').toString('base64')],
            [null, '{a: a}'],
            [null, Buffer.from('{a: a}').toString('base64')],
            [{a: 2}, '{a: scope.a}', {a: 2}],
            [{a: 2}, Buffer.from('{a: scope.a}').toString('base64'), {a: 2}]
        )
    testEach<typeof sliceAllExceptNumberAndLastSeperator>(
        'sliceAllExceptNumberAndLastSeperator',
        sliceAllExceptNumberAndLastSeperator,

        ['1234-56', '12-34-56'],
        ['123456', '12 34 56'],
        ['123456', '123456']
    )
    testEach<typeof representPhoneNumber>(
        'representPhoneNumber',
        representPhoneNumber,

        ['0', '0'],
        ['+49 (0) 172 / 123 21-1', '0172-12321-1'],
        ['+49 (0) 172 / 12 32 11', '0172-123211'],
        ['+49 (0) 172 / 123 21 11', '0172-1232111'],
        ['', undefined],
        ['', null],
        ['', false],
        ['', true],
        ['', ''],
        ['', ' ']
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
    testEach<typeof normalizeDomNodeSelector>(
        'normalizeDomNodeSelector',
        normalizeDomNodeSelector,

        ['body div', 'div'],
        ['body div p', 'div p'],
        ['body div', 'body div'],
        ['body div p', 'body div p'],
        ['body', '']
    )
    testEach<typeof normalizeDomNodeSelector>(
        'normalizeDomNodeSelector',
        normalizeDomNodeSelector,

        ['', ''],
        ['div', 'div'],
        ['div, p', 'div, p']
    )
    /// endregion
    /// region number
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
    /// endregion
    /// region data transfer
    testEachPromiseRejectionAgainstSameExpectation<typeof checkReachability>(
        'checkReachability',
        checkReachability,
        TEST_DEFINED_SYMBOL,

        ['unknownURL'],
        ['unknownURL', {statusCodes: 301}],
        [
            'http://unknownHostName',
            {statusCodes: 200, timeoutInSeconds: .001, wait: true}
        ],
        [
            'http://unknownHostName',
            {statusCodes: [200], timeoutInSeconds: .001, wait: true}
        ],
        [
            'http://unknownHostName',
            {statusCodes: [200, 301], timeoutInSeconds: .001, wait: true}
        ]
    )
    testEachPromiseAgainstSameExpectation<typeof checkUnreachability>(
        'checkUnreachability',
        checkUnreachability,
        TEST_DEFINED_SYMBOL,

        ['unknownURL', {statusCodes: 200}],
        ['unknownURL', {statusCodes: 200, wait: true}],
        ['unknownURL', {statusCodes: [200], wait: true}],
        ['unknownURL', {statusCodes: [200, 301], wait: true}]
    )
    test('checkUnreachability', ():void => {
        const abortController = new AbortController()
        void timeout(0.25, ():void => abortController.abort())

        void expect(checkUnreachability(
            'http://unknownHostName',
            {
                options: {signal: abortController as unknown as AbortSignal},
                statusCodes: 200,
                wait: true
            }
        )).resolves.toBeDefined()
    })
    if (TARGET_TECHNOLOGY !== 'node') {
        test('sendToIFrame', ():void => {
            const $iFrame:$T<HTMLIFrameElement> =
                $<HTMLIFrameElement>('<iframe>').hide().attr('name', 'test')

            $('body').append($iFrame[0])

            expect(sendToIFrame(
                $iFrame, window.document.URL, {test: 5}, 'get', true
            )).toBeDefined()
        })

        test('sendToExternalURL', ():void =>
            expect(sendToExternalURL(window.document.URL, {test: 5}))
                .toBeDefined()
        )
    }
    /// endregion
    /// region file
    if (TARGET_TECHNOLOGY === 'node') {
        const testPath = './copyDirectoryRecursiveTest.compiled'
        test('copyDirectoryRecursive', async ():Promise<void> => {
            removeDirectoryRecursivelySync!(testPath)
            expect(await copyDirectoryRecursive(
                './node_modules/.bin', testPath, NOOP
            )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
            removeDirectoryRecursivelySync!(testPath)
        })
        test('copyDirectoryRecursiveSync', ():void => {
            removeDirectoryRecursivelySync!(testPath)
            expect(copyDirectoryRecursiveSync(
                './node_modules/.bin', testPath, NOOP
            )).toMatch(/\/copyDirectoryRecursiveTest.compiled$/)
            removeDirectoryRecursivelySync!(testPath)
        })
        test('copyFile', async ():Promise<void> => {
            try {
                await unlink!(`./test.copyFile.${testEnvironment}.compiled.js`)
            } catch (error) {
                // Continue regardless of an error.
            }
            let result = ''
            try {
                result = await copyFile(
                    resolve!('./test.ts'),
                    `./test.copyFile.${testEnvironment}.compiled.js`
                )
            } catch (error) {
                console.error(error)
            }
            expect(result).toMatch(new RegExp(
                `\\.\\/test\\.copyFile\\.${testEnvironment}\\.compiled\\.js$`
            ))
            /*
                NOTE: A race condition was identified here. So we need an
                additional digest loop to have this test artefact placed here.
            */
            await timeout()
            await unlink!(`./test.copyFile.${testEnvironment}.compiled.js`)
        })
        test('copyFileSync', async ():Promise<void> => {
            try {
                await unlink!(
                    `./test.copyFileSync.${testEnvironment}.compiled.js`
                )
            } catch (error) {
                // Continue regardless of an error.
            }

            expect(copyFileSync(
                resolve!('./test.ts'),
                `./test.copyFileSync.${testEnvironment}.compiled.js`
            )).toMatch(new RegExp(
                `\\.\\/test\\.copyFileSync\\.${testEnvironment}\\.compiled\\` +
                '.js$'
            ))

            await unlink!(`./test.copyFileSync.${testEnvironment}.compiled.js`)
        })
        test('isDirectory', async ():Promise<void> => {
            for (const filePath of ['./', '../']) {
                let result = false
                try {
                    result = await isDirectory(filePath)
                } catch (error) {
                    console.error(error)
                }
                expect(result).toStrictEqual(true)
            }
            for (const filePath of [resolve!('./test.ts')]) {
                let result = true
                try {
                    result = await isDirectory(filePath)
                } catch (error) {
                    console.error(error)
                }
                expect(result).toStrictEqual(false)
            }
        })
        testEachSingleParameterAgainstSameExpectation<typeof isDirectorySync>(
            'isDirectorySync',
            isDirectorySync,
            true,

            './',
            '../'
        )
        testEachSingleParameterAgainstSameExpectation<typeof isDirectorySync>(
            'isDirectorySync',
            isDirectorySync,
            false,

            resolve!('./test.ts')
        )
        test('isFile', async ():Promise<void> => {
            for (const filePath of [resolve!('./test.ts')]) {
                let result = false
                try {
                    result = await isFile(filePath)
                } catch (error) {
                    console.error(error)
                }
                expect(result).toStrictEqual(true)
            }

            for (const filePath of ['./', '../']) {
                let result = true
                try {
                    result = await isFile(filePath)
                } catch (error) {
                    console.error(error)
                }
                expect(result).toStrictEqual(false)
            }
        })
        testEachSingleParameterAgainstSameExpectation<typeof isFileSync>(
            'isFileSync',
            isFileSync,
            true,

            resolve!('./test.ts')
        )
        testEachSingleParameterAgainstSameExpectation<typeof isFileSync>(
            'isFileSync',
            isFileSync,
            false,

            './',
            '../'
        )
        test('walkDirectoryRecursively', async ():Promise<void> => {
            const filePaths:Array<string> = []
            const callback = (file:File):null => {
                filePaths.push(file.path)

                return null
            }

            let files:Array<File> = []
            try {
                files = await walkDirectoryRecursively('./', callback)
            } catch (error) {
                console.error(error)
            }

            expect(files).toHaveLength(1)
            expect(files[0]).toHaveProperty('path')
            expect(files[0]).toHaveProperty('stats')
            expect(filePaths).toHaveLength(1)
        })
        test('walkDirectoryRecursivelySync', ():void => {
            const filePaths:Array<string> = []
            const callback = (filePath:string):null => {
                filePaths.push(filePath)

                return null
            }
            const files:Array<File> =
                walkDirectoryRecursivelySync('./', callback)
            expect(files).toHaveLength(1)
            expect(files[0]).toHaveProperty('path')
            expect(files[0]).toHaveProperty('stats')
            expect(filePaths).toHaveLength(1)
        })
    }
    /// endregion
    /// region process handler
    if (TARGET_TECHNOLOGY === 'node') {
        test('getProcessCloseHandler', () =>
            expect(typeof getProcessCloseHandler(NOOP, NOOP))
                .toStrictEqual('function')
        )
        test('handleChildProcess', ():void => {
            /**
             * A mockup duplex stream for mocking "stdout" and "strderr"
             * process connections.
             */
            class MockupDuplexStream extends (
                optionalRequire('stream') as typeof import('stream')
            ).Duplex implements DuplexType {
                /**
                 * Triggers if contents from current stream should be red.
                 * @returns Red data.
                 */
                _read():void {
                    // Do noyything.
                }
                /**
                 * Triggers if contents should be written on current stream.
                 * @param chunk - The chunk to be written. Will always be a
                 * buffer unless the "decodeStrings" option was set to "false".
                 * @param encoding - Specifies encoding to be used as input
                 * data.
                 * @param callback - Will be called if data has been written.
                 *
                 * @returns Returns Nothing.
                 */
                _write(
                    chunk:Buffer|string, encoding:string, callback:AnyFunction
                ):void {
                    callback(new Error('test'))
                }
            }
            const stdoutMockupDuplexStream:MockupDuplexStream =
                new MockupDuplexStream()
            const stderrMockupDuplexStream:MockupDuplexStream =
                new MockupDuplexStream()
            const childProcess:ChildProcessType = new ChildProcess!()
            childProcess.stdout = stdoutMockupDuplexStream
            childProcess.stderr = stderrMockupDuplexStream

            expect(handleChildProcess(childProcess))
                .toStrictEqual(childProcess)
        })
    }
    /// endregion
    // endregion
    // region protected
    if (testEnvironment !== 'node')
        testEachAgainstSameExpectation<Tools['_bindEventHelper']>(
            '_bindEventHelper',
            tools._bindEventHelper,
            TEST_DEFINED_SYMBOL,

            [['body']],
            [['body'], true],
            [['body'], false, 'bind']
        )
    // endregion
})
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

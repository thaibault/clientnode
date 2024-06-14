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
import {describe, expect, test} from '@jest/globals'
import {ChildProcess as ChildProcessType} from 'child_process'
import {Duplex as DuplexType} from 'stream'
import nodeFetch from 'node-fetch'
import {getInitializedBrowser} from 'weboptimizer/browser'

import {NOOP} from '../constants'
import {globalContext, optionalRequire, $} from '../context'
import {timeout} from '../utility'
import {
    TEST_DEFINED_SYMBOL,
    testEach,
    testEachAgainstSameExpectation,
    testEachPromiseAgainstSameExpectation,
    testEachPromiseRejectionAgainstSameExpectation,
    testEachSingleParameterAgainstSameExpectation
} from '../test-helper'
import Tools from '../Tools'
import {
    AnyFunction,
    File,
    Mapping,
    $T
} from '../type'
import {ceil, floor, getUTCTimestamp, isNotANumber, round} from '../number'
import {
    checkReachability, checkUnreachability, sendToExternalURL, sendToIFrame
} from '../data-transfer'
import {
    copyDirectoryRecursive,
    copyDirectoryRecursiveSync,
    copyFile,
    copyFileSync,
    isDirectory,
    isDirectorySync,
    isFile,
    isFileSync,
    walkDirectoryRecursively,
    walkDirectoryRecursivelySync
} from '../filesystem'
import {getProcessCloseHandler, handleChildProcess} from '../process'
// endregion
/*
    NOTE: We have to preload this module to avoid introducing an additional
    asynchronous chunk.
*/
require('node-fetch/src/utils/multipart-parser')

declare const TARGET_TECHNOLOGY:string

// region determine technology specific implementations
globalContext.fetch = nodeFetch as unknown as typeof fetch

const {ChildProcess = null} =
    optionalRequire<typeof import('child_process')>('child_process') || {}
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

const hasDOM = ['browser', 'node-with-dom'].includes(testEnvironment)
// endregion
describe(`Tools (${testEnvironment})`, ():void => {
    const now = new Date()
    const tools = new Tools()
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
    /// region logging
    test('log', () => expect(tools.log('test')).toStrictEqual(undefined))
    test('info', () =>
        expect(tools.info('test {0}')).toStrictEqual(undefined)
    )
    test('debug', () =>
        expect(tools.debug('test')).toStrictEqual(undefined)
    )
    // NOTE: This test breaks javaScript modules in strict mode.
    test.skip(`${testEnvironment}-error`, () =>
        expect(tools.error('ignore this error, it is only a {1}', 'test'))
            .toStrictEqual(undefined)
    )
    test('warn', () =>
        expect(tools.warn('test')).toStrictEqual(undefined)
    )
    test('show', () =>
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
    /// region event
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
                 */
                _read() {
                    // Do nothing.
                }
                /**
                 * Triggers if contents should be written on current stream.
                 * @param chunk - The chunk to be written. Will always be a
                 * buffer unless the "decodeStrings" option was set to "false".
                 * @param encoding - Specifies encoding to be used as input
                 * data.
                 * @param callback - Will be called if data has been written.
                 */
                _write(
                    chunk:Buffer|string, encoding:string, callback:AnyFunction
                ) {
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

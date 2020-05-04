// #!/usr/bin/env node
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
// region imports
import Tools, {globalContext, Semaphore, $} from './index'
import {
    File,
    Mapping,
    ObjectMaskConfiguration,
    PlainObject,
    TimeoutPromise,
    $DomNode
} from './type'
if (!('fetch' in globalContext))
    try {
        globalContext.fetch = eval('require')('node-fetch')
    } catch (error) {}
try {
    /* eslint-disable no-var */
    var ChildProcess = eval('require')('child_process').ChildProcess
    /* eslint-enable no-var */
} catch (error) {}
import {getInitializedBrowser} from 'weboptimizer/browser'
import {InitializedBrowser} from 'weboptimizer/type'
// endregion
// region declaration
declare var TARGET_TECHNOLOGY:string
// endregion
// region determine technology specific implementations
let path:Object
let removeDirectoryRecursivelySync:Function
let synchronousFileSystem:Object
let testEnvironment:string = 'browser'
if (typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node') {
    path = require('path')
    removeDirectoryRecursivelySync = require('rimraf').sync
    synchronousFileSystem = require('fs')
    testEnvironment = typeof document === 'undefined' ?
        'node' :
        'node-with-dom'
}
const hasDOM:boolean = ['browser', 'node-with-dom'].includes(testEnvironment)
// endregion
// region semaphore
describe(`clientNode.Semaphore (${testEnvironment})`, ():void => {
    test('constructor', ():void => {
        expect(new Semaphore()).toHaveProperty('numberOfResources', 2)
        expect(new Semaphore()).toHaveProperty(
            'numberOfFreeResources', (new Semaphore()).numberOfResources)
    })
    test('acquire/release', async ():Promise<void> => {
        const semaphore = new Semaphore()
        expect(semaphore.numberOfFreeResources).toStrictEqual(2)
        expect(await semaphore.acquire()).toStrictEqual(1)
        expect(semaphore.numberOfFreeResources).toStrictEqual(1)
        semaphore.release()
        expect(semaphore.numberOfFreeResources).toStrictEqual(2)
    })
})
// endregion
// region tools
describe(`clientNode.Tools (${testEnvironment})`, ():void => {
    const now:Date = new Date()
    const tools:Tools = new Tools()
    // region public methods
    // / region special
    test('constructor', ():void => {
        expect(Tools).toHaveProperty('abbreviations')
        expect(new Tools()).toHaveProperty('_options')
    })
    test('destructor', ():void =>
        expect(tools.destructor()).toStrictEqual(tools)
    )
    test('initialize', ():void => {
        const secondToolsInstance:Tools = $.Tools({logging: true})
        const thirdToolsInstance:Tools = $.Tools({
            domNodeSelectorPrefix: 'body.{1} div.{1}'
        })

        expect(tools._options).toHaveProperty('logging', false)
        expect(secondToolsInstance._options).toHaveProperty('logging', true)
        expect(thirdToolsInstance._options.domNodeSelectorPrefix)
            .toStrictEqual('body.tools div.tools')
    })
    // / endregion
    // / region  object orientation
    test('controller', ():void => {
        expect(tools.controller(tools, [])).toStrictEqual(tools)
        expect(tools.controller($.Tools.class, [], $('body')).constructor.name)
            .toStrictEqual(Tools.name)
        expect(tools.controller(Tools, [], $('body')).constructor.name)
            .toStrictEqual(Tools.name)
    })
    // / endregion
    // / region mutual exclusion
    test(`acquireLock|releaseLock (${testEnvironment})`, async (
        done:Function
    ):Promise<void> => {
        let testValue:boolean = false
        await tools.acquireLock('test', ():void => {
            testValue = true
        })
        expect(testValue).toStrictEqual(true)
        expect(tools.acquireLock(
            'test',
            ():void => {
                testValue = false
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(true)
        expect($.Tools().releaseLock('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(true)
        expect(tools.releaseLock('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(false)
        expect(tools.releaseLock('test')).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(false)
        await tools.acquireLock('test', ():void => {
            testValue = true
        })
        expect(testValue).toStrictEqual(true)
        expect(tools.acquireLock(
            'test',
            ():void => {
                testValue = false
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(true)
        expect(tools.acquireLock(
            'test',
            ():void => {
                testValue = true
            }
        )).toBeInstanceOf(Promise)
        expect(testValue).toStrictEqual(true)
        tools.releaseLock('test')
        expect(testValue).toStrictEqual(false)
        tools.releaseLock('test')
        expect(testValue).toStrictEqual(true)
        tools.acquireLock('test').then(async (result:string):Promise<void> => {
            expect(result).toStrictEqual('test')
            Tools.timeout(():Promise<void> =>
                tools.releaseLock('test')
            )
            result = await tools.acquireLock('test')
            expect(result).toStrictEqual('test')
            Tools.timeout(():Promise<void> =>
                tools.releaseLock('test')
            )
            result = await tools.acquireLock('test', ():Promise<boolean> => {
                return new Promise(async (resolve:Function):Promise<void> => {
                    await Tools.timeout()
                    testValue = false
                    resolve(testValue)
                })
            })
            expect(testValue).toStrictEqual(false)
            done()
        })
        tools.releaseLock('test')
    })
    test('getSemaphore', async ():Promise<void> => {
        const semaphore:Semaphore = Tools.getSemaphore(2)
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(2)
        expect(semaphore.numberOfResources).toStrictEqual(2)
        await semaphore.acquire()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(1)
        expect(semaphore.numberOfResources).toStrictEqual(2)
        await semaphore.acquire()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(0)
        semaphore.acquire()
        expect(semaphore.queue.length).toStrictEqual(1)
        expect(semaphore.numberOfFreeResources).toStrictEqual(0)
        semaphore.acquire()
        expect(semaphore.queue.length).toStrictEqual(2)
        expect(semaphore.numberOfFreeResources).toStrictEqual(0)
        semaphore.release()
        expect(semaphore.queue.length).toStrictEqual(1)
        expect(semaphore.numberOfFreeResources).toStrictEqual(0)
        semaphore.release()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(0)
        semaphore.release()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(1)
        semaphore.release()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(2)
        semaphore.release()
        expect(semaphore.queue.length).toStrictEqual(0)
        expect(semaphore.numberOfFreeResources).toStrictEqual(3)
    })
    // / endregion
    // / region boolean
    test.each([0, 1, '-10', '0', 0xFF, '0xFF', '8e5', '3.1415', +10])(
        '.isNumeric(%s) === true',
        (value:any):void => expect(Tools.isNumeric(value)).toStrictEqual(true)
    )
    test.each([
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
    ])(
        '.isNumeric(%p) === false',
        (value:any):void => expect(Tools.isNumeric(value)).toStrictEqual(false)
    )
    test('isWindow', async ():Promise<void> => {
        const browser:InitializedBrowser = await getInitializedBrowser()
        expect(Tools.isWindow(browser.window)).toStrictEqual(true)
        for (const value of [null, {}, browser])
            expect(Tools.isWindow(value)).toStrictEqual(false)
    })
    test('isArrayLike', async ():Promise<void> => {
        const browser:InitializedBrowser = await getInitializedBrowser()
        for (const value of [
            [], browser.window.document.querySelectorAll('*')
        ])
            expect(Tools.isArrayLike(value)).toStrictEqual(true)
    })
    test.each([{}, null, undefined, false, true, /a/])(
        '.isArrayLike(%p) === false',
        (value:any):void =>
            expect(Tools.isArrayLike(value)).toStrictEqual(false)
    )
    test.each([
        ['', ['']],
        ['test', [/test/]],
        ['test', [/a/, /b/, /es/]],
        ['test', ['', 'test']]
    ])(
        `.isAnyMatching('%s', %p) === true`,
        (target:string, pattern:Array<string|RegExp>):void =>
            expect(Tools.isAnyMatching(target, pattern)).toStrictEqual(true)
    )
    test.each([
        ['', []],
        ['test', [/tes$/]],
        ['test', [/^est/]],
        ['test', [/^est$/]],
        ['test', ['a']]
    ])(
        `.isAnyMatching('%s', %p) === false`,
        (target:string, pattern:Array<string|RegExp>):void =>
            expect(Tools.isAnyMatching(target, pattern)).toStrictEqual(false)
    )
    test.each([
        {},
        {a: 1},
        /* eslint-disable no-new-object */
        new Object()
        /* eslint-enable no-new-object */
    ])('.isPlainObject(%p) === true', (value:any):void =>
        expect(Tools.isPlainObject(value)).toStrictEqual(true)
    )
    test.each([new String(), Object, null, 0, 1, true, undefined])(
        '.isPlainObject(%p) === false',
        (value:any):void =>
            expect(Tools.isPlainObject(value)).toStrictEqual(false)
    )
    test.each([
        Object,
        new Function('return 1'),
        function():void {},
        ():void => {},
        async ():Promise<void> => {}
    ])('.isFunction(%p) === true', (value:any):void =>
        expect(Tools.isFunction(value)).toStrictEqual(true)
    )
    test.each([null, false, 0, 1, undefined, {}, new Boolean()])(
        '.isFunction(%p) === false', (value:any):void =>
            expect(Tools.isFunction(value)).toStrictEqual(false)
    )
    // / endregion
    // / region language fixes
    test('mouseOutEventHandlerFix', ():void =>
        expect(Tools.mouseOutEventHandlerFix(():void => {})).toBeTruthy()
    )
    // / endregion
    // / region logging
    test('log', ():void => expect(tools.log('test')).toStrictEqual(tools))
    test('info', ():void =>
        expect(tools.info('test {0}')).toStrictEqual(tools)
    )
    test('debug', ():void => expect(tools.debug('test')).toStrictEqual(tools))
    // NOTE: This test breaks javaScript modules in strict mode.
    test.skip(`${testEnvironment}-error`, ():void =>
        expect(tools.error('ignore this error, it is only a {1}', 'test'))
            .toStrictEqual(tools)
    )
    test('warn', ():void => expect(tools.warn('test')).toStrictEqual(tools))
    test('show', ():void =>
        /* eslint-disable no-control-regex */
        expect(/^.+\(Type: "function"\)$/su.test(Tools.show(Tools.noop)))
            .toStrictEqual(true)
        /* eslint-enable no-control-regex */
    )
    test.each([
        [1, '1 (Type: "number")'],
        [null, 'null (Type: "null")'],
        [/a/, '/a/ (Type: "regexp")'],
        ['hans', 'hans (Type: "string")'],
        [{A: 'a', B: 'b'}, 'A: a (Type: "string")\nB: b (Type: "string")']
    ])('.show(%p) === %s', (value:any, expected:string):void =>
        expect(Tools.show(value)).toStrictEqual(expected)
    )
    // / endregion
    // / region dom node handling
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
                    .prop('outerHTML'),
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
                const $domNode:$DomNode = $(html)
                $('body').append($domNode)
                const styles:Mapping = $domNode.Tools('style')
                for (const propertyName in css)
                    if (css.hasOwnProperty(propertyName)) {
                        expect(styles.hasOwnProperty(propertyName))
                            .toStrictEqual(true)
                        expect(styles[propertyName])
                            .toStrictEqual(css[propertyName])
                    }
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
        test.each([
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
                $('<a target="_blank" class="a"></a>'),
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
        ])(
            `.isEquivalentDOM('%s', '%s') === true`,
            (
                first:string,
                second:string,
                forceHTMLString:boolean = false
            ):void =>
                expect(Tools.isEquivalentDOM(first, second, forceHTMLString))
                    .toStrictEqual(true)
        )
        test.each([
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
        ])(
            `.isEquivalentDOM('%s', '%s') === false`,
            (first:string, second:string):void =>
                expect(Tools.isEquivalentDOM(first, second))
                    .toStrictEqual(false)
        )
        test('getPositionRelativeToViewport', ():void =>
            expect(['above', 'left', 'right', 'below', 'in'])
                .toContain(tools.getPositionRelativeToViewport())
        )
    }
    test.each([
        ['a-b', 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'],
        ['aB', 'a-b, .a-b, [a-b], [data-a-b], [x-a-b], [a\\:b], [a_b]'],
        ['a', 'a, .a, [a], [data-a], [x-a]'],
        ['aa', 'aa, .aa, [aa], [data-aa], [x-aa]'],
        [
            'aaBB',
            'aa-bb, .aa-bb, ' +
            '[aa-bb], [data-aa-bb], [x-aa-bb], [aa\\:bb], [aa_bb]'
        ],
        [
            'aaBbCcDd',
            'aa-bb-cc-dd, .aa-bb-cc-dd, ' +
            '[aa-bb-cc-dd], [data-aa-bb-cc-dd], [x-aa-bb-cc-dd], ' +
            '[aa\\:bb\\:cc\\:dd], [aa_bb_cc_dd]'
        ],
        [
            'mceHREF',
            'mce-href, .mce-href, ' +
            '[mce-href], [data-mce-href], [x-mce-href], [mce\\:href], ' +
            '[mce_href]'
        ]
    ])(
        `.generateDirectiveSelector('%s') === '%s'`,
        (name:string, selector:string):void =>
            expect(Tools.generateDirectiveSelector(name))
                .toStrictEqual(selector)
    )
    if (hasDOM)
        test('removeDirective', async ():Promise<void> => {
            await getInitializedBrowser()
            const $localBodyDomNode = $('body').Tools('removeDirective', 'a')
            expect($localBodyDomNode.Tools().removeDirective('a'))
                .toStrictEqual($localBodyDomNode)
        })
    test.each([
        ['data-a', 'a'], ['x-a', 'a'], ['data-a-bb', 'aBb'], ['x:a:b', 'aB']
    ])(
        `.getNormalizedDirectiveName('%s') === '%s'`,
        (directive:string, name:string):void =>
            expect(Tools.getNormalizedDirectiveName(directive))
                .toStrictEqual(name)
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
    test.each([
        ['div', 'div'],
        ['<div>', 'div'],
        ['<div />', 'div'],
        ['<div></div>', 'div'],
        ['a', 'a'],
        ['<a>', 'a'],
        ['<a />', 'a'],
        ['<a></a>', 'a']
    ])(`.getDomNodeName('%s') === '%s'`, (html:string, name:string):void =>
        expect(Tools.getDomNodeName(html)).toStrictEqual(name)
    )
    if (hasDOM)
        test('grabDomNode', async ():Promise<void> => {
            const browser:InitializedBrowser = await getInitializedBrowser()
            for (const test of [
                [[{a: 'div'}], {a: $('div'), parent: $('body')}],
                [
                    [{a: 'script'}, 'body'],
                    {a: $('body').find('script'), parent: $('body')}
                ]
            ] as Array<[[Mapping, string?], Mapping<$DomNode>]>) {
                const $domNodes = tools.grabDomNode(...test[0])
                delete $domNodes.window
                delete $domNodes.document
                expect($domNodes).toStrictEqual(test[1])
            }
        })
    // / endregion
    // / region scope
    test('isolateScope', ():void => {
        expect(Tools.isolateScope({})).toStrictEqual({})
        expect(Tools.isolateScope({a: 2})).toStrictEqual({a: 2})
        expect(Tools.isolateScope({a: 2, b: {a: [1, 2]}}))
            .toStrictEqual({a: 2, b: {a: [1, 2]}})
        let Scope:Function = function(this:Mapping<number>):void {
            this.a = 2
        }
        Scope.prototype = {_a: 5, b: 2}
        let scope:Mapping<number> = new (Scope as (new () => Mapping<number>))()
        Tools.isolateScope(scope, ['_'])
        let finalScope:Mapping<number> = {}
        for (const name in scope)
            finalScope[name] = scope[name]
        expect(finalScope).toStrictEqual({_a: 5, a: 2, b: undefined})
        scope.b = 3
        Tools.isolateScope(scope, ['_'])
        finalScope = {}
        for (const name in scope)
            finalScope[name] = scope[name]
        expect(finalScope).toStrictEqual({_a: 5, a: 2, b: 3})
        expect(Tools.isolateScope(scope))
            .toStrictEqual({_a: undefined, a: 2, b: 3})
        scope._a = 6
        expect(Tools.isolateScope(scope, ['_']))
            .toStrictEqual({_a: 6, a: 2, b: 3})
        Scope = function(this:Mapping<number>):void {
            this.a = 2
        }
        Scope.prototype = {b: 3}
        scope = Tools.isolateScope(
            new (Scope as (new () => Mapping<number>))(), ['b']
        )
        finalScope = {}
        for (const name in scope)
            finalScope[name] = scope[name]
        expect(finalScope).toStrictEqual({a: 2, b: 3})
        expect(Tools.isolateScope(new (Scope as (new () => Mapping<number>))()))
            .toStrictEqual({a: 2, b: undefined})
    })
    test('determineUniqueScopeName', ():void => {
        expect(Tools.determineUniqueScopeName())
            .toStrictEqual(expect.stringMatching(/^callback/))
        expect(Tools.determineUniqueScopeName('hans'))
            .toStrictEqual(expect.stringMatching(/^hans/))
        expect(Tools.determineUniqueScopeName('hans', '', {}))
            .toStrictEqual(expect.stringMatching(/^hans/))
        expect(Tools.determineUniqueScopeName('hans', '', {}, 'peter'))
            .toStrictEqual('peter')
        expect(
            Tools.determineUniqueScopeName('hans', '', {peter: 2}, 'peter')
        ).toStrictEqual(expect.stringMatching(/^hans/))
        const name:string = Tools.determineUniqueScopeName(
            'hans', 'klaus', {peter: 2}, 'peter')
        expect(name).toStrictEqual(expect.stringMatching(/^hans/))
        expect(name).toStrictEqual(expect.stringMatching(/klaus$/))
        expect(name.length).toBeGreaterThan('hans'.length + 'klaus'.length)
    })
    // / endregion
    // / region function handling
    test.each([
        [function():void {}, []],
        ['function() {}', []],
        ['function(a, /* dummy*/ b, c/**/) {}', ['a', 'b', 'c']],
        ['(a, /*dummy*/b, c/**/) => {}', ['a', 'b', 'c']],
        [
            `(a, /*dummy*/b, c/**/) => {
                return 2
            }`,
            ['a', 'b', 'c']
        ],
        ['(a, /* dummy*/b, c/* */) => 2', ['a', 'b', 'c']],
        ['(a, /* dummy*/b = 2, c/* */) => 2', ['a', 'b', 'c']],
        ['a => 2', ['a']],
        [
            `class A {
                constructor(a, b, c) {}
                a() {}
            }`,
            ['a', 'b', 'c']
        ]
    ])(
        `.getParameterNames('%s') === %p`,
        (code:Function|string, parameterNames:Array<string>):void =>
            expect(Tools.getParameterNames(code)).toStrictEqual(parameterNames)
    )
    test('identity', ():void => {
        expect(Tools.identity({}) === {}).toStrictEqual(false)
        const testObject = {}
        expect(Tools.identity(testObject)).toStrictEqual(testObject)
    })
    test.each([
        [2, 2],
        ['', ''],
        [undefined, undefined],
        [null, null],
        ['hans', 'hans']
    ])('.identity(%p) === %p', (given:any, expected:any):void =>
        expect(Tools.identity(given)).toStrictEqual(expected)
    )
    test('invertArrayFilter', ():void => {
        expect(
            Tools.invertArrayFilter(Tools.arrayDeleteEmptyItems)([{a: null}])
        ).toStrictEqual([{a: null}])
        expect(Tools.invertArrayFilter(Tools.arrayExtractIfMatches)(
            ['a', 'b'], '^a$'
        )).toStrictEqual(['b'])
    })
    test('timeout', async ():Promise<void> => {
        expect(await Tools.timeout()).toStrictEqual(false)
        expect(await Tools.timeout(0)).toStrictEqual(false)
        expect(await Tools.timeout(1)).toStrictEqual(false)
        expect(Tools.timeout()).toBeInstanceOf(Promise)
        expect(Tools.timeout().hasOwnProperty('clear')).toStrictEqual(true)
        let test:boolean = false
        const result:TimeoutPromise = Tools.timeout(10 ** 20, true)
        result.catch(():void => {
            test = true
        })
        result.clear()
        let test2:boolean = false
        expect(await Tools.timeout(():void => {
            test2 = true
        })).toStrictEqual(false)
        expect(test).toStrictEqual(true)
        expect(test2).toStrictEqual(true)
    })
    // / endregion
    // / region event
    test('debounce', ():void => {
        let testValue = false
        Tools.debounce(():void => {
            testValue = true
        })()
        expect(testValue).toStrictEqual(true)
        const callback:Function = Tools.debounce(
            ():void => {
                testValue = !testValue
            },
            1000
        )
        callback()
        callback()
        expect(testValue).toStrictEqual(false)
    })
    test('fireEvent', ():void => {
        expect(
            $.Tools({onClick: ():2 => 2}).fireEvent('click', true)
        ).toStrictEqual(2)
        expect(
            $.Tools({onClick: ():false => false}).fireEvent('click', true)
        ).toStrictEqual(false)
        expect(tools.fireEvent('click')).toStrictEqual(true)
        class Plugin extends Tools {
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
    // / endregion
    // / region object
    test('addDynamicGetterAndSetter', (assert:Object):void => {
        expect(Tools.addDynamicGetterAndSetter(null)).toStrictEqual(null)
        expect(Tools.addDynamicGetterAndSetter(true)).toStrictEqual(true)
        expect(Tools.addDynamicGetterAndSetter({a: 2})).toStrictEqual({a: 2})
        expect(Tools.addDynamicGetterAndSetter({}).__target__)
            .not.toBeInstanceOf(Object)
        expect(
            Tools.addDynamicGetterAndSetter(
                {}, (value:any):any => value
            ).__target__
        ).toBeInstanceOf(Object)
        const mockup = {}
        expect(Tools.addDynamicGetterAndSetter(mockup)).toStrictEqual(mockup)
        expect(
            Tools.addDynamicGetterAndSetter(
                mockup, (value:any):any => value
            ).__target__
        ).toStrictEqual(mockup)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: 1}, (value:any):any => value + 2
            ).a
        ).toStrictEqual(3)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: {a: 1}},
                (value:any):any => (value instanceof Object) ?
                    value :
                    value + 2
            ).a.a
        ).toStrictEqual(3)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: {a: [{a: 1}]}},
                (value:any):any => (value instanceof Object) ?
                    value :
                    value + 2
            ).a.a[0].a
        ).toStrictEqual(3)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: {a: 1}},
                (value:any):any => (value instanceof Object) ?
                    value :
                    value + 2,
                null,
                {has: 'hasOwnProperty'},
                false
            ).a.a
        ).toStrictEqual(1)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: 1},
                (value:any):any =>
                    (value instanceof Object) ? value : value + 2,
                null,
                {has: 'hasOwnProperty'},
                false,
                []
            ).a
        ).toStrictEqual(1)
        expect(
            Tools.addDynamicGetterAndSetter(
                {a: new Map([['a', 1]])},
                (value:any):any =>
                    (value instanceof Object) ? value : value + 2,
                null,
                {delete: 'delete', get: 'get', set: 'set', has: 'has'},
                true,
                [Map]
            ).a.a
        ).toStrictEqual(3)
    })
    test('convertCircularObjectToJSON', ():void => {
        const object1:{a?:object} = {}
        const object2:{a:object} = {a: object1}
        object1.a = object2
        expect(Tools.convertCircularObjectToJSON(object1))
            .toStrictEqual('{"a":{"a":"__circularReference__"}}')
    })
    test.each([
        [{}, '{}'],
        [{a: null}, '{"a":null}'],
        [{a: {a: 2}}, '{"a":{"a":2}}'],
        [{a: {a: Infinity}}, '{"a":{"a":null}}']
    ])(
        `.convertCircularObjectToJSON(%p) === '%s'`,
        (value:any, expected:string):void =>
            expect(Tools.convertCircularObjectToJSON(value))
                .toStrictEqual(expected)
    )
    test.each([
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
    ])(
        '.convertMapToPlainObject(...%p) === %p',
        (expected:any, object:any, deep:boolean = true):void =>
            expect(Tools.convertMapToPlainObject(object, deep))
                .toStrictEqual(expected)
    )
    test.each([
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
    ])(
        '.convertPlainObjectToMap(...%p) === %p',
        (expected:any, object:any, deep:boolean = true):void =>
            expect(Tools.convertPlainObjectToMap(object, deep))
                .toStrictEqual(expected)
    )
    test.each([
        [{}, /a/, '', {}],
        [{a: 'a'}, /a/, 'b', {a: 'b'}],
        [{a: 'aa'}, /a/, 'b', {a: 'ba'}],
        [{a: 'aa'}, /a/g, 'b', {a: 'bb'}],
        [{a: {a: 'aa'}}, /a/g, 'b', {a: {a: 'bb'}}]
    ])(
        `.convertSubstringInPlainObject(%p, %p, '%s') === %p`,
        (
            object:PlainObject,
            pattern:RegExp|string,
            replacement:string,
            expected:PlainObject
        ):void =>
            expect(
                Tools.convertSubstringInPlainObject(
                    object, pattern, replacement
                )
            ).toStrictEqual(expected)
    )
    test.each([
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
        ]
    ])(
        '.copy(...%p) === %p',
        (expected:any, object:any, ...parameter:Array<any>):void =>
            expect(Tools.copy<any>(object, ...parameter))
                .toStrictEqual(expected)
    )
    test('determineType', ():void =>
        expect(Tools.determineType()).toStrictEqual('undefined')
    )
    test.each([
        [undefined, 'undefined'],
        // @ts-ignore: Expected.
        [{}.notDefined, 'undefined'],
        [null, 'null'],
        [true, 'boolean'],
        [new Boolean(), 'boolean'],
        [3, 'number'],
        [new Number(3), 'number'],
        ['', 'string'],
        [new String(''), 'string'],
        ['test', 'string'],
        [new String('test'), 'string'],
        [function():void {}, 'function'],
        [():void => {}, 'function'],
        [[], 'array'],
        /* eslint-disable no-array-constructor */
        // TODO [new Array(), 'array'],
        /* eslint-enable no-array-constructor */
        [now, 'date'],
        [new Error(), 'error'],
        [new Map(), 'map'],
        [new Set(), 'set'],
        [/test/, 'regexp']
    ])(`.determineType(%p) === '%s'`, (object:any, expected:string):void =>
        expect(Tools.determineType(object)).toStrictEqual(expected)
    )
    test.each([
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
        [[{a: 1, b: 1}], [{a: 1}], []],
        [[{a: 1, b: 1}], [{a: 1}], ['a']],
        [2, 2, 0],
        [[{a: 1, b: 1}], [{a: 1}], null, 0],
        [[{a: 1}, {b: 1}], [{a: 1}, {b: 1}], null, 1],
        [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 1],
        [[{a: {b: 1}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2],
        [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 2],
        [
            [{a: {b: {c: 1}}}, {b: 1}],
            [{a: {b: 1}}, {b: 1}],
            null,
            3,
            ['b']
        ],
        [Tools.noop, Tools.noop],
        [Tools.noop, Tools.noop, null, -1, [], false]
    ])(
        '.equals(%p, %p, ...%p) === true',
        (first:any, second:any, ...parameter:Array<any>):void =>
            expect(Tools.equals(first, second, ...parameter))
                .toStrictEqual(true)
    )
    if (TARGET_TECHNOLOGY === 'node')
        test('equals', ():void =>
            expect(Tools.equals(
                Buffer.from('a'), Buffer.from('a'), null, -1, [], true, true
            )).toStrictEqual(true)
        )
    else {
        test.each([
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
        ])(
            '.equals(%p, %p, null, -1, [], true, true) === true',
            async (first:any, second:any):Promise<void> =>
                expect(
                    await Tools.equals(first, second, null, -1, [], true, true)
                ).toStrictEqual(true)
        )
        test.each([
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
                    a: new Set([[new Map([['a', new Blob(['a'], {
                        type: 'text/plain'
                    })]])]]),
                    b: 2
                },
                {
                    a: new Set([[new Map([['a', new Blob(['b'], {
                        type: 'text/plain'
                    })]])]]),
                    b: 2
                }
            ]
        ])(
            '.equals(%p, %p) === false',
            async (first:any, second:any):Promise<void> =>
                expect(await Tools.equals(
                    first, second, null, -1, [], true, true
                )).toStrictEqual(false)
        )
    }
    test.each([
        [[{a: {b: 1}}, {b: 1}], [{a: 1}, {b: 1}], null, 2],
        [[{a: {b: {c: 1}}}, {b: 1}], [{a: {b: 1}}, {b: 1}], null, 3],
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
        [[{a: 1, b: 1}], [{a: 1}], ['a', 'b']],
        [1, 2, 0],
        [[{a: 1}, {b: 1}], [{a: 1}], null, 1],
        [():void => {}, ():void => {}, null, -1, [], false]
    ])(
        '.equals(%p, %p, ...%p) === false',
        (first:any, second:any, ...parameter:Array<any>):void =>
            expect(Tools.equals(first, second, ...parameter))
                .toStrictEqual(false)
    )
    test.each([
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
        [{a: 2, b: 2}, [{a: {__evaluate__: 'c.b'}, b: 2}, {}, 'c']],
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
            {tools: $.Tools.class}, '_'
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
            {removeS: (value:string):string => value.replace('s', '')},
        ],
        [
            {a: 'a', b: 'a'},
            {
                a: {__evaluate__: 'toString(self.b)'},
                b: {__evaluate__: `'a'`}
            },
            {toString: (value:any):string => value.toString()}
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
            NOTE: This describes a workaround until the "ownKeys" proxy
            trap works for this use cases.
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
    ])(
        '.evaluateDynamicDataStructure(...%p) === %p',
        (expected:any, ...parameter:Array<any>):void =>
            expect(Tools.copy(
                Tools.evaluateDynamicDataStructure(...parameter), -1, true
            )).toStrictEqual(expected)
    )
    test('extend', ():void => {
        const target:Object = {a: [1, 2]}
        Tools.extend(true, target, {a: [3, 4]})
        expect(target).toStrictEqual({a: [3, 4]})
    })
    test.each([
        [[[]], []],
        [[{}], {}],
        [[{a: 1}], {a: 1}],
        [[{a: 1}, {a: 2}], {a: 2}],
        [[{}, {a: 1}, {a: 2}], {a: 2}],
        [[{}, {a: 1}, {a: 2}], {a: 2}],
        [[{a: 1, b: {a: 1}}, {a: 2, b: {b: 1}}], {a: 2, b: {b: 1}}],
        [[[1, 2], [1]], [1]],
        [[new Map()], new Map()],
        [[new Set()], new Set()],
        [[new Map([['a', 1]])], new Map([['a', 1]])],
        [
            [new Map([['a', 1]]), new Map([['a', 2]])],
            new Map([['a', 2]])
        ],
        [
            [new Map(), new Map([['a', 1]]), new Map([['a', 2]])],
            new Map([['a', 2]])
        ],
        [
            [new Map(), new Map([['a', 1]]), new Map([['a', 2]])],
            new Map([['a', 2]])
        ],
        [
            [
                new Map([['a', 1], ['b', new Map([['a', 1]])]]),
                new Map([['a', 2], ['b', new Map([['b', 1]])]])
            ],
            new Map([['a', 2], ['b', new Map([['b', 1]])]])
        ],
        [[true, {}], {}],
        [
            [true, {a: 1, b: {a: 1}}, {a: 2, b: {b: 1}}],
            {a: 2, b: {a: 1, b: 1}}
        ],
        [
            [true, {a: 1, b: {a: []}}, {a: 2, b: {b: 1}}],
            {a: 2, b: {a: [], b: 1}}
        ],
        [[true, {a: {a: [1, 2]}}, {a: {a: [3, 4]}}], {a: {a: [3, 4]}}],
        [
            [true, {a: {a: [1, 2]}}, {a: {a: null}}],
            {a: {a: null}}
        ],
        [[true, {a: {a: [1, 2]}}, {a: true}], {a: true}],
        [[true, {a: {_a: 1}}, {a: {b: 2}}], {a: {_a: 1, b: 2}}],
        [[false, {_a: 1}, {a: 2}], {a: 2, _a: 1}],
        [[true, {a: {a: [1, 2]}}, false], false],
        [[true, {a: {a: [1, 2]}}, undefined], undefined],
        [[true, {a: 1}, {a: 2}, {a: 3}], {a: 3}],
        [[true, [1], [1, 2]], [1, 2]],
        [[true, [1, 2], [1]], [1]],
        [[true, new Map()], new Map()],
        [
            [
                true, new Map([['a', 1], ['b', new Map([['a', 1]])]]),
                new Map([['a', 2], ['b', new Map([['b', 1]])]])
            ],
            new Map([['a', 2], ['b', new Map([['a', 1], ['b', 1]])]])
        ],
        [
            [
                true, new Map([['a', 1], ['b', new Map([['a', []]])]]),
                new Map([['a', 2], ['b', new Map([['b', 1]])]])
            ],
            new Map([['a', 2], ['b', new Map([['a', []], ['b', 1]])]])
        ],
        [
            [
                true, new Map([['a', new Map([['a', [1, 2]]])]]),
                new Map([['a', new Map([['a', [3, 4]]])]])
            ],
            new Map([['a', new Map([['a', [3, 4]]])]])
        ],
        [[[1, 2], undefined], undefined],
        [[[1, 2], null], null]
    ])('.extend(...%p) === %p', (parameter:Array<any>, expected:any):void =>
        expect(Tools.extend(...parameter)).toStrictEqual(expected)
    )
    test.each([
        [[{}, []], {}],
        [[{a: 1}, ['a']], 1],
        [[{a: {a: null}}, 'a.a'], null],
        [[{a: {a: []}}, 'a.a'], []],
        [[{a: {b: {c: 3}}}, ['a', 'b.c']], 3]
    ])(
        '.getSubstructure(...%p) === %p',
        (parameter:Array<any>, expected:any):void =>
            expect(Tools.getSubstructure(...parameter)).toStrictEqual(expected)
    )
    test('getProxyHandler', ():void => {
        expect(Tools.isPlainObject(Tools.getProxyHandler({})))
            .toStrictEqual(true)
        expect(
            Tools.isPlainObject(Tools.getProxyHandler(new Map(), {get: 'get'}))
        ).toStrictEqual(true)
    })
    test.each([
        [{}, {}, {}],
        [{a: 2}, {}, {a: 2}],
        [{a: 2}, {include: false}, {}],
        [{a: 2}, {include: true}, {a: 2}],
        [{a: 2}, {include: {a: true}}, {a: 2}],
        [{a: 2}, {include: {b: true}}, {}],
        [{a: 2}, {include: {a: false}}, {}],
        [{a: 2}, {include: {b: false}}, {}],
        [{a: 2, b: 3}, {include: {a: true}}, {a: 2}],
        [{a: 2, b: 3}, {include: {}}, {}],
        [{a: 2, b: 3}, {include: {a: false, b: true}}, {b: 3}],
        [{a: 2, b: {a: 2}}, {include: {a: false, b: true}}, {b: {a: 2}}],
        [{a: 2, b: {a: 2}}, {include: {a: false, b: {}}}, {b: {}}],
        [{a: 2, b: {a: 2}}, {include: {a: false, b: {a: true}}}, {b: {a: 2}}],
        [
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: false}}},
            {a: 2, b: {}}
        ],
        [
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: false}, c: true}},
            {a: 2, b: {}}
        ],
        [
            {a: 2, b: {a: 2}},
            {include: {a: true, b: {a: true}}},
            {a: 2, b: {a: 2}}
        ],
        [
            {a: {a: {a: {a: 2, b: 3}}}},
            {include: {a: {a: {a: {a: true}}}}},
            {a: {a: {a: {a: 2}}}},
        ],
        [
            {a: {a: {a: {a: 2, b: 3}}}},
            {include: {a: {a: {a: true}}}},
            {a: {a: {a: {a: 2, b: 3}}}},
        ],
        [{a: 2}, {exclude: true}, {}],
        [{a: 2}, {exclude: false}, {a: 2}],
        [{a: 2}, {exclude: {a: true}}, {}],
        [{a: 2}, {exclude: {b: true}}, {a: 2}],
        [{a: 2}, {exclude: {b: true}}, {a: 2}],
        [{a: 2, b: 3}, {exclude: {b: true}}, {a: 2}],
        [{a: 2, b: 3}, {exclude: {b: false}}, {a: 2, b: 3}],
        [{a: 2, b: {a: 2}}, {exclude: {b: {}}}, {a: 2, b: {a: 2}}],
        [{a: 2, b: {a: 2}}, {exclude: {b: {a: true}}}, {a: 2, b: {}}],
        [{a: 2, b: {a: 2}}, {exclude: {b: true}}, {a: 2}],
        [{a: 2, b: {a: 2}}, {exclude: {b: {a: false}}}, {a: 2, b: {a: 2}}],
        [
            {a: {a: {a: {a: 2, b: 3}}}},
            {exclude: {a: {a: {a: {a: true}}}}},
            {a: {a: {a: {b: 3}}}},
        ],
        [
            {a: {a: {a: {a: 2, b: 3}}}},
            {exclude: {a: {a: {a: true}}}},
            {a: {a: {}}},
        ]
    ])(
        '.maskObject(%p, %p) === %p',
        (
            object:object, mask:ObjectMaskConfiguration, expected:object
        ):void =>
            expect(Tools.maskObject(object, mask)).toStrictEqual(expected)
    )
    test.each([
        [[{}, {}], {}, {}],
        [[{a: 2}, {}], {a: 2}, {}],
        [[{a: 2}, {b: 1}], {a: 2}, {b: 1}],
        [[{a: 2}, {__remove__: 'a'}], {}, {}],
        [[{a: 2}, {__remove__: ['a']}], {}, {}],
        [[{a: [2]}, {a: {__prepend__: 1}}], {a: [1, 2]}, {}],
        [[{a: [2]}, {a: {__remove__: 1}}], {a: [2]}, {}],
        [[{a: [2, 1]}, {a: {__remove__: 1}}], {a: [2]}, {}],
        [[{a: [2, 1]}, {a: {__remove__: [1, 2]}}], {a: []}, {}],
        [[{a: [1]}, {a: {__remove__: 1}}], {a: []}, {}],
        [[{a: [1]}, {a: {__remove__: [1, 2]}}], {a: []}, {}],
        [[{a: [2]}, {a: {__append__: 1}}], {a: [2, 1]}, {}],
        [[{a: [2]}, {a: {__append__: [1, 2]}}], {a: [2, 1, 2]}, {}],
        [
            [{a: [2]}, {a: {__append__: [1, 2]}, b: 1}],
            {a: [2, 1, 2]},
            {b: 1}
        ],
        [
            [{a: [2]}, {a: {add: [1, 2]}, b: 1}, 'rm', 'unshift', 'add'],
            {a: [2, 1, 2]},
            {b: 1}
        ],
        [
            [{a: [2]}, {a: {__prepend__: 1}}, '_r', '_p'],
            {a: [2]},
            {a: {__prepend__: 1}}
        ],
        [[{a: [2]}, {a: {__prepend__: [1, 3]}}], {a: [1, 3, 2]}, {}],
        [
            [{a: [2]}, {a: {__append__: [1, 2], __prepend__: 's'}}],
            {a: ['s', 2, 1, 2]},
            {}
        ],
        [
            [{a: [2, 2]}, {a: {__prepend__: 's', __remove__: 2}}],
            {a: ['s', 2]},
            {}
        ],
        [
            [{a: [2, 2]}, {a: {__prepend__: 's', __remove__: [2, 2]}}],
            {a: ['s']},
            {}
        ],
        [
            [
                {a: [2, 1, 2]},
                {a: {__prepend__: 's', __remove__: [2, 2], __append__: 'a'}}
            ],
            {a: ['s', 1, 'a']},
            {}
        ]
    ])(
        '.modifyObject(...%p) === %p => %p',
        (
            parameter:Array<PlainObject>,
            sliced:PlainObject,
            modified:PlainObject
        ):void => {
            expect(Tools.modifyObject(...parameter)).toStrictEqual(sliced)
            expect(parameter[1]).toStrictEqual(modified)
        }
    )
    test('normalizeDateTime', ():void =>
        expect(typeof Tools.normalizeDateTime()).toStrictEqual('object')
    )
    test.each([
        [now, now],
        [1.2, new Date(1.2 * 1000)],
        ['1.2', new Date(1.2 * 1000)],
        ['08:55', new Date(1970, 1 - 1, 1, 8, 55)],
        [1, new Date(1 * 1000)],
        ['2/1/1970', new Date(1970, 2 - 1, 1)],
        [0.001, new Date(Date.UTC(1970, 1 - 1, 1, 0, 0, 0, 1))],
        [new Date(1970, 1 - 1, 1, 8, 30), new Date(1970, 1 - 1, 1, 8, 30)],
        ['abc', null],
        ['1+1+1970 08+30+00', null]
    ])('.normalizeDateTime(%p) === %p', (value:any, expected:Date|null):void =>
        expect(Tools.equals(
            Tools.normalizeDateTime(value, false), expected
        )).toStrictEqual(true)
    )
    test.each([
        [{}, [], {}],
        [new Set(), '#', new Set()],
        [new Map(), [], new Map()],
        [5, [], 5],
        ['a', [], 'a'],
        [[], [], []],
        [{a: 2, b: 3}, ['a'], {b: 3}],
        [{a: 2, a0: 2, b: 3}, ['a'], {b: 3}],
        [
            new Map([['3', ['a:to remove']], ['a', 3]]),
            'a',
            new Map([['3', []]])
        ],
        [
            [{a: ['#:comment', 'value', '#: remove']}],
            '#',
            [{a: ['value']}]
        ],
        [
            [{a: new Set(['#:comment', 'value', '#: remove'])}],
            '#',
            [{a: new Set(['value'])}]
        ],
        [
            [{a: new Map([
                ['#', 'comment'], ['key', 'value'], ['#', 'remove']
            ])}],
            '#',
            [{a: new Map([['key', 'value']])}]
        ]
    ])(
        '.removeKeys(%p, %p) === %p',
        (source:any, keysToRemove:Array<string>|string, expected:any):void =>
            expect(Tools.removeKeys(source, keysToRemove))
                .toStrictEqual(expected)
    )
    test.each([
        ['', '""'],
        [
            {
                a: 'A',
                b: 123,
                c: null,
                d: ['a', 1, null]
            },
            `{
                a: "A",
                b: 123,
                c: null,
                d: [
                    "a",
                    1,
                    null
                ]
            }`.replace(/(\n) {12}/g, '$1')
        ]
    ])(`.represent(%p) === '%s'`, (source:any, expected:string):void =>
        expect(Tools.represent(source)).toStrictEqual(expected)
    )
    test.each([
        [[], []],
        [{}, []],
        [[1], [0]],
        [[1, 2, 3], [0, 1, 2]],
        [[3, 2, 1], [0, 1, 2]],
        [[2, 3, 1], [0, 1, 2]],
        [{'1': 2, '2': 5, '3': 'a'}, ['1', '2', '3']],
        [{'2': 2, '1': 5, '-5': 'a'}, ['-5', '1', '2']],
        [{'3': 2, '2': 5, '1': 'a'}, ['1', '2', '3']],
        [{a: 2, b: 5, c: 'a'}, ['a', 'b', 'c']],
        [{c: 2, b: 5, a: 'a'}, ['a', 'b', 'c']],
        [{b: 2, c: 5, z: 'a'}, ['b', 'c', 'z']]
    ])('.sort(%p) === %p', (source:Array<any>, expected:Array<any>):void =>
        expect(Tools.sort(source)).toStrictEqual(expected)
    )
    test.each([
        [{}, {}],
        [{a: 'a'}, {a: 'a'}],
        [{a: 'aa'}, {a: 'aa'}],
        [{a: {__target__: 2, __revoke__: ():void => {}}}, {a: 2}]
    ])(
        '.unwrapProxy(%p) === %p',
        (source:PlainObject, expected:PlainObject):void =>
            expect(Tools.unwrapProxy(source)).toStrictEqual(expected)
    )
    // / endregion
    /* TODO
    // / region array
    test('arrayAggregatePropertyIfEqual', (
        assert:Object
    ):void => {
        for (const test of [
            [[[{a: 'b'}], 'a'], 'b'],
            [[[{a: 'b'}, {a: 'b'}], 'a'], 'b'],
            [[[{a: 'b'}, {a: 'c'}], 'a'], ''],
            [[[{a: 'b'}, {a: 'c'}], 'a', false], false]
        ])
            assert.strictEqual(Tools.arrayAggregatePropertyIfEqual(
                ...test[0]
            ), test[1])
    })
    test('arrayDeleteEmptyItems', ():void => {
        for (const test of [
            [[[{a: null}]], []],
            [[[{a: null, b: 2}]], [{a: null, b: 2}]],
            [[[{a: null, b: 2}], ['a']], []],
            [[[], ['a']], []],
            [[[]], []]
        ])
            assert.deepEqual(
                Tools.arrayDeleteEmptyItems(...test[0]), test[1])
    })
    test('arrayExtract', ():void => {
        for (const test of [
            [[[{a: 'b', c: 'd'}], ['a']], [{a: 'b'}]],
            [[[{a: 'b', c: 'd'}], ['b']], [{}]],
            [[[{a: 'b', c: 'd'}], ['c']], [{c: 'd'}]],
            [[[{a: 'b', c: 'd'}, {a: 3}], ['c']], [{c: 'd'}, {}]],
            [[[{a: 'b', c: 'd'}, {c: 3}], ['c']], [{c: 'd'}, {c: 3}]]
        ])
            assert.deepEqual(
                Tools.arrayExtract(...test[0]), test[1])
    })
    test('arrayExtractIfMatches', ():void => {
        for (const test of [
            [['b'], /b/, ['b']],
            [['b'], 'b', ['b']],
            [['b'], 'a', []],
            [[], 'a', []],
            [['a', 'b'], '', ['a', 'b']],
            [['a', 'b'], '^$', []],
            [['a', 'b'], 'b', ['b']],
            [['a', 'b'], '[ab]', ['a', 'b']]
        ])
            assert.deepEqual(Tools.arrayExtractIfMatches(
                test[0], test[1]
            ), test[2])
    })
    test('arrayExtractIfPropertyExists', (
        assert:Object
    ):void => {
        for (const test of [
            [[{a: 2}], 'a', [{a: 2}]],
            [[{a: 2}], 'b', []],
            [[], 'b', []],
            [[{a: 2}, {b: 3}], 'a', [{a: 2}]]
        ])
            assert.deepEqual(Tools.arrayExtractIfPropertyExists(
                test[0], test[1]
            ), test[2])
    })
    test('arrayExtractIfPropertyMatches', (
        assert:Object
    ):void => {
        for (const test of [
            [[{a: 'b'}], {a: 'b'}, [{a: 'b'}]],
            [[{a: 'b'}], {a: '.'}, [{a: 'b'}]],
            [[{a: 'b'}], {a: 'a'}, []],
            [[], {a: 'a'}, []],
            [[{a: 2}], {b: /a/}, []],
            [
                [{mimeType: 'text/x-webm'}],
                {mimeType: /^text\/x-webm$/},
                [{mimeType: 'text/x-webm'}]
            ]
        ])
            assert.deepEqual(Tools.arrayExtractIfPropertyMatches(
                test[0], test[1]
            ), test[2])
    })
    test('arrayIntersect', ():void => {
        for (const test of [
            [[['A'], ['A']], ['A']],
            [[['A', 'B'], ['A']], ['A']],
            [[[], []], []],
            [[[5], []], []],
            [[[{a: 2}], [{a: 2}]], [{a: 2}]],
            [[[{a: 3}], [{a: 2}]], []],
            [[[{a: 3}], [{b: 3}]], []],
            [[[{a: 3}], [{b: 3}], ['b']], []],
            [[[{a: 3}], [{b: 3}], ['b'], false], []],
            [[[{b: null}], [{b: null}], ['b']], [{b: null}]],
            [[[{b: null}], [{b: undefined}], ['b']], []],
            [[[{b: null}], [{b: undefined}], ['b'], false], [{b: null}]],
            [[[{b: null}], [{}], ['b'], false], [{b: null}]],
            [[[{b: undefined}], [{}], ['b'], false], [{b: undefined}]],
            [[[{}], [{}], ['b'], false], [{}]],
            [[[{b: null}], [{}], ['b']], []],
            [[[{b: undefined}], [{}], ['b'], true], [{b: undefined}]],
            [[[{b: 1}], [{a: 1}], {b: 'a'}, true], [{b: 1}]]
        ])
            assert.deepEqual(Tools.arrayIntersect(...test[0]), test[1])
    })
    test('arrayMakeRange', ():void => {
        for (const test:Array<any> of [
            [[[0]], [0]],
            [[[5]], [0, 1, 2, 3, 4, 5]],
            [[[]], []],
            [[[2, 5]], [2, 3, 4, 5]],
            [[[2, 10], 2], [2, 4, 6, 8, 10]]
        ])
            assert.deepEqual(Tools.arrayMakeRange(...test[0]), test[1])
    })
    test('arrayMerge', ():void => {
        for (const test:Array<any> of [
            [[], [], []],
            [[1], [], [1]],
            [[], [1], [1]],
            [[1], [1], [1, 1]],
            [[1, 2, 3, 1], [1, 2, 3], [1, 2, 3, 1, 1, 2, 3]]
        ])
            assert.deepEqual(
                Tools.arrayMerge(test[0], test[1]), test[2])
    })
    test('arrayMake', ():void => {
        for (const test:Array<any> of [
            [[], []],
            [[1, 2, 3], [1, 2, 3]],
            [1, [1]]
        ])
            assert.deepEqual(Tools.arrayMake(test[0]), test[1])
    })
    test('arrayPermutate', ():void => {
        for (const test:Array<any> of [
            [[], [[]]],
            [[1], [[1]]],
            [[1, 2], [[1, 2], [2, 1]]],
            [
                [1, 2, 3],
                [
                    [1, 2, 3],
                    [1, 3, 2],
                    [2, 1, 3],
                    [2, 3, 1],
                    [3, 1, 2],
                    [3, 2, 1]
                ]
            ],
            [
                ['1', '2', '3'],
                [
                    ['1', '2', '3'],
                    ['1', '3', '2'],
                    ['2', '1', '3'],
                    ['2', '3', '1'],
                    ['3', '1', '2'],
                    ['3', '2', '1']
                ]
            ]
        ])
            assert.deepEqual(Tools.arrayPermutate(test[0]), test[1])
    })
    test('arrayPermutateLength', ():void => {
        for (const test:Array<any> of [
            [[], []],
            [[1], [[1]]],
            [[1, 2], [[1], [2], [1, 2]]],
            [
                [1, 2, 3],
                [
                    [1],
                    [2],
                    [3],
                    [1, 2],
                    [1, 3],
                    [2, 3],
                    [1, 2, 3]
                ]
            ],
            [
                ['1', '2', '3'],
                [
                    ['1'],
                    ['2'],
                    ['3'],
                    ['1', '2'],
                    ['1', '3'],
                    ['2', '3'],
                    ['1', '2', '3']
                ]
            ]
        ])
            assert.deepEqual(
                Tools.arrayPermutateLength(test[0]), test[1])
    })
    test('arrayUnique', ():void => {
        for (const test:Array<any> of [
            [[1, 2, 3, 1], [1, 2, 3]],
            [[1, 2, 3, 1, 2, 3], [1, 2, 3]],
            [[], []],
            [[1, 2, 3], [1, 2, 3]]
        ])
            assert.deepEqual(Tools.arrayUnique(test[0]), test[1])
    })
    test('arraySumUpProperty', ():void => {
        for (const test:Array<any> of [
            [[[{a: 2}, {a: 3}], 'a'], 5],
            [[[{a: 2}, {b: 3}], 'a'], 2],
            [[[{a: 2}, {b: 3}], 'c'], 0]
        ])
            assert.strictEqual(
                Tools.arraySumUpProperty(...test[0]), test[1])
    })
    test('arrayAppendAdd', ():void => {
        const testObject:Object = {}
        for (const test:Array<any> of [
            [[{}, {}, 'b'], {b: [{}]}],
            [[testObject, {a: 3}, 'b'], {b: [{a: 3}]}],
            [[testObject, {a: 3}, 'b'], {b: [{a: 3}, {a: 3}]}],
            [[{b: [2]}, 2, 'b', false], {b: [2, 2]}],
            [[{b: [2]}, 2, 'b'], {b: [2]}]
        ])
            assert.deepEqual(Tools.arrayAppendAdd(...test[0]), test[1])
    })
    test('arrayRemove', ():void => {
        for (const test:Array<any> of [
            [[[], 2], []],
            [[[2], 2], []],
            [[[2], 2, true], []],
            [[[1, 2], 2], [1]],
            [[[1, 2], 2, true], [1]]
        ])
            assert.deepEqual(Tools.arrayRemove(...test[0]), test[1])
        assert.throws(():?Array<any> => Tools.arrayRemove(
            [], 2, true
        ), new Error(`Given target doesn't exists in given list.`))
    })
    test('arraySortTopological', ():void => {
        for (const test:Array<any> of [
            [{}, []],
            [{a: []}, ['a']],
            [{a: 'b'}, ['b', 'a']],
            [{a: [], b: 'a'}, ['a', 'b']],
            [{a: [], b: ['a']}, ['a', 'b']],
            [{a: ['b'], b: []}, ['b', 'a']],
            [{c: 'b', a: [], b: ['a']}, ['a', 'b', 'c']],
            [{b: ['a'], a: [], c: ['a', 'b']}, ['a', 'b', 'c']]
        ])
            assert.deepEqual(
                Tools.arraySortTopological(test[0]), test[1])
        for (const test:any of [
            {a: 'a'},
            {a: 'b', b: 'a'},
            {a: 'b', b: 'c', c: 'a'}
        ])
            assert.throws(():void => Tools.arraySortTopological(test))
    })
    // / endregion
    // / region string
    test('stringEscapeRegularExpressions', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [[''], ''],
            [[`that's no regex: .*$`], `that's no regex: \\.\\*\\$`],
            [
                ['-\\[]()^$*+.}-', '}'],
                '\\-\\\\[\\]\\(\\)\\^\\$\\*\\+\\.}\\-'
            ],
            [[
                '-\\[]()^$*+.{}-',
                ['[', ']', '(', ')', '^', '$', '*', '+', '.', '{']
            ], '\\-\\[]()^$*+.{\\}\\-'],
            [['-', '\\'], '\\-']
        ])
            assert.strictEqual(
                Tools.stringEscapeRegularExpressions(...test[0]),
                test[1])
    })
    test('stringConvertToValidVariableName', ():void => {
        for (const test:Array<string> of [
            ['', ''],
            ['a', 'a'],
            ['_a', '_a'],
            ['_a_a', '_a_a'],
            ['_a-a', '_aA'],
            ['-a-a', 'aA'],
            ['-a--a', 'aA'],
            ['--a--a', 'aA']
        ])
            assert.strictEqual(
                Tools.stringConvertToValidVariableName(
                    test[0]
                ), test[1])
    })
    // // region url handling
    test('stringEncodeURIComponent', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [[''], ''],
            [[' '], '+'],
            [[' ', true], '%20'],
            [['@:$, '], '@:$,+'],
            [['+'], '%2B']
        ])
            assert.strictEqual(
                Tools.stringEncodeURIComponent(...test[0]), test[1])
    })
    test('stringAddSeparatorToPath', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [[''], ''],
            [['/'], '/'],
            [['/a'], '/a/'],
            [['/a/bb/'], '/a/bb/'],
            [['/a/bb'], '/a/bb/'],
            [['/a/bb', '|'], '/a/bb|'],
            [['/a/bb/', '|'], '/a/bb/|']
        ])
            assert.strictEqual(
                Tools.stringAddSeparatorToPath(...test[0]), test[1])
    })
    test('stringHasPathPrefix', ():void => {
        for (const test:Array<any> of [
            ['/admin', '/admin'],
            ['test', 'test'],
            ['', ''],
            ['a', 'a/b'],
            ['a/', 'a/b'],
            ['/admin', '/admin#test', '#']
        ])
            assert.ok(Tools.stringHasPathPrefix(...test))
        for (const test:Array<any> of [
            ['b', 'a/b'],
            ['b/', 'a/b'],
            ['/admin/', '/admin/test', '#'],
            ['/admin', '/admin/test', '#']
        ])
            assert.notOk(Tools.stringHasPathPrefix(...test))
    })
    test('stringGetDomainName', ():void => {
        for (const test:Array<any> of [
            [
                ['https://www.test.de/site/subSite?param=value#hash'],
                'www.test.de'
            ],
            [['a', true], true],
            [['http://www.test.de'], 'www.test.de'],
            [['http://a.de'], 'a.de'],
            [['http://localhost'], 'localhost'],
            [['localhost', 'a'], 'a'],
            [['a', $.global.location.hostname], $.global.location.hostname],
            [['//a'], 'a'],
            [
                [
                    'a/site/subSite?param=value#hash',
                    $.global.location.hostname
                ],
                $.global.location.hostname
            ],
            [
                [
                    '/a/site/subSite?param=value#hash',
                    $.global.location.hostname
                ],
                $.global.location.hostname
            ],
            [
                ['//alternate.local/a/site/subSite?param=value#hash'],
                'alternate.local'
            ],
            [['//alternate.local/'], 'alternate.local']
        ])
            assert.strictEqual(
                Tools.stringGetDomainName(...test[0]), test[1])
    })
    test('stringGetPortNumber', ():void => {
        for (const test:Array<any> of [
            [['https://www.test.de/site/subSite?param=value#hash'], 443],
            [['http://www.test.de'], 80],
            [['http://www.test.de', true], true],
            [['www.test.de', true], true],
            [['a', true], true],
            [['a', true], true],
            [['a:80'], 80],
            [['a:20'], 20],
            [['a:444'], 444],
            [['http://localhost:89'], 89],
            [['https://localhost:89'], 89]
        ])
            assert.strictEqual(
                Tools.stringGetPortNumber(...test[0]), test[1])
    })
    test('stringGetProtocolName', ():void => {
        for (const test:Array<any> of [
            [
                ['https://www.test.de/site/subSite?param=value#hash'],
                'https'
            ],
            [['http://www.test.de'], 'http'],
            [
                ['//www.test.de', $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)],
                $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)
            ],
            [['http://a.de'], 'http'],
            [['ftp://localhost'], 'ftp'],
            [
                ['a', $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)],
                $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)
            ],
            [
                [
                    'a/site/subSite?param=value#hash',
                    $.global.location.protocol.substring(
                        0, $.global.location.protocol.length - 1)
                ],
                $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)
            ],
            [['/a/site/subSite?param=value#hash', 'a'], 'a'],
            [
                ['alternate.local/a/site/subSite?param=value#hash', 'b'],
                'b'
            ],
            [['alternate.local/', 'c'], 'c'],
            [
                [
                    '', $.global.location.protocol.substring(
                        0, $.global.location.protocol.length - 1)
                ],
                $.global.location.protocol.substring(
                    0, $.global.location.protocol.length - 1)
            ]
        ])
            assert.strictEqual(
                Tools.stringGetProtocolName(...test[0]), test[1])
    })
    test('stringGetURLVariable', ():void => {
        assert.ok(Array.isArray(Tools.stringGetURLVariable()))
        assert.ok(Array.isArray(Tools.stringGetURLVariable(null, '&')))
        assert.ok(Array.isArray(Tools.stringGetURLVariable(null, '#')))
        for (const test:Array<any> of [
            [['notExisting'], null],
            [['notExisting', '&'], null],
            [['notExisting', '#'], null],
            [['test', '?test=2'], '2'],
            [['test', 'test=2'], '2'],
            [['test', 'test=2&a=2'], '2'],
            [['test', 'b=3&test=2&a=2'], '2'],
            [['test', '?b=3&test=2&a=2'], '2'],
            [['test', '?b=3&test=2&a=2'], '2'],
            [['test', '&', '$', '!', '', '#$test=2'], '2'],
            [['test', '&', '$', '!', '?test=4', '#$test=3'], '4'],
            [['a', '&', '$', '!', '?test=4', '#$test=3'], null],
            [['test', '#', '$', '!', '?test=4', '#$test=3'], '3'],
            [['test', '#', '$', '!', '', '#!test#$test=4'], '4'],
            [['test', '#', '$', '!', '', '#!/test/a#$test=4'], '4'],
            [['test', '#', '$', '!', '', '#!/test/a/#$test=4'], '4'],
            [['test', '#', '$', '!', '', '#!test/a/#$test=4'], '4'],
            [['test', '#', '$', '!', '', '#!/#$test=4'], '4'],
            [['test', '#', '$', '!', '', '#!test?test=3#$test=4'], '4'],
            [['test', '&', '?', '!', null, '#!a?test=3'], '3'],
            [['test', '&', '$', '!', null, '#!test#$test=4'], '4'],
            [['test', '&', '$', '!', null, '#!test?test=3#$test=4'], '4']
        ])
            assert.strictEqual(
                Tools.stringGetURLVariable(...test[0]), test[1])
    })
    test('stringIsInternalURL', ():void => {
        for (const test:Array<any> of [
            [
                'https://www.test.de/site/subSite?param=value#hash',
                'https://www.test.de/site/subSite?param=value#hash'
            ],
            [
                '//www.test.de/site/subSite?param=value#hash',
                '//www.test.de/site/subSite?param=value#hash'
            ],
            [
                `${$.global.location.protocol}//www.test.de/site/subSite` +
                    '?param=value#hash',
                `${$.global.location.protocol}//www.test.de/site/subSite` +
                    `?param=value#hash`
            ],
            [
                'https://www.test.de:443/site/subSite?param=value#hash',
                'https://www.test.de/site/subSite?param=value#hash'
            ],
            [
                '//www.test.de:80/site/subSite?param=value#hash',
                '//www.test.de/site/subSite?param=value#hash'
            ],
            [$.global.location.href, $.global.location.href],
            ['1', $.global.location.href],
            ['#1', $.global.location.href],
            ['/a', $.global.location.href]
        ])
            assert.ok(Tools.stringIsInternalURL(...test))
        for (const test:Array<any> of [
            [
                `${$.global.location.protocol}//www.test.de/site/subSite` +
                    '?param=value#hash',
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
                `${$.global.location.protocol}//www.test.de:` +
                `${$.global.location.port}/site/subSite` +
                '?param=value#hash/site/subSite?param=value#hash'
            ],
            [
                `http://www.test.de:${$.global.location.port}/site/subSite?` +
                    'param=value#hash',
                'https://www.test.de/site/subSite?param=value#hash'
            ]
        ])
            assert.notOk(Tools.stringIsInternalURL(...test))
    })
    test('stringNormalizeURL', ():void => {
        for (const test:Array<any> of [
            ['www.test.com', 'http://www.test.com'],
            ['test', 'http://test'],
            ['http://test', 'http://test'],
            ['https://test', 'https://test']
        ])
            assert.strictEqual(
                Tools.stringNormalizeURL(test[0]), test[1])
    })
    test('stringRepresentURL', ():void => {
        for (const test:Array<any> of [
            ['http://www.test.com', 'www.test.com'],
            ['ftp://www.test.com', 'ftp://www.test.com'],
            ['https://www.test.com', 'www.test.com'],
            [undefined, ''],
            [null, ''],
            [false, ''],
            [true, ''],
            ['', ''],
            [' ', '']
        ])
            assert.strictEqual(
                Tools.stringRepresentURL(test[0]), test[1])
    })
    // // endregion
    test('stringCamelCaseToDelimited', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [['hansPeter'], 'hans-peter'],
            [['hansPeter', '|'], 'hans|peter'],
            [[''], ''],
            [['h'], 'h'],
            [['hP', ''], 'hp'],
            [['hansPeter'], 'hans-peter'],
            [['hans-peter'], 'hans-peter'],
            [['hansPeter', '_'], 'hans_peter'],
            [['hansPeter', '+'], 'hans+peter'],
            [['Hans'], 'hans'],
            [['hansAPIURL', '-', ['api', 'url']], 'hans-api-url'],
            [['hansPeter', '-', []], 'hans-peter']
        ])
            assert.strictEqual(
                Tools.stringCamelCaseToDelimited(...test[0]), test[1])
    })
    test('stringCapitalize', ():void => {
        for (const test:Array<any> of [
            ['hansPeter', 'HansPeter'],
            ['', ''],
            ['a', 'A'],
            ['A', 'A'],
            ['AA', 'AA'],
            ['Aa', 'Aa'],
            ['aa', 'Aa']
        ])
            assert.strictEqual(
                Tools.stringCapitalize(test[0]), test[1])
    })
    test('stringCompressStyleValue', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['', ''],
            [' border: 1px  solid red;', 'border:1px solid red'],
            ['border : 1px solid red ', 'border:1px solid red'],
            ['border : 1px  solid red ;', 'border:1px solid red'],
            ['border : 1px  solid red   ; ', 'border:1px solid red'],
            ['height: 1px ; width:2px ; ', 'height:1px;width:2px'],
            [';;height: 1px ; width:2px ; ;', 'height:1px;width:2px'],
            [' ;;height: 1px ; width:2px ; ;', 'height:1px;width:2px'],
            [';height: 1px ; width:2px ; ', 'height:1px;width:2px']
        ])
            assert.strictEqual(
                Tools.stringCompressStyleValue(test[0]), test[1])
    })
    test('stringDecodeHTMLEntities', (
        assert:Object
    ):void => {
        for (const test:Array<string> of [
            ['', ''],
            ['<div></div>', '<div></div>'],
            ['<div>&amp;</div>', '<div>&</div>'],
            [
                '<div>&amp;&auml;&Auml;&uuml;&Uuml;&ouml;&Ouml;</div>',
                '<div>&äÄüÜöÖ</div>'
            ]
        ])
            assert.equal(
                Tools.stringDecodeHTMLEntities(test[0]), test[1])
    })
    test('stringDelimitedToCamelCase', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [['hans-peter'], 'hansPeter'],
            [['hans|peter', '|'], 'hansPeter'],
            [[''], ''],
            [['h'], 'h'],
            [['hans-peter'], 'hansPeter'],
            [['hans--peter'], 'hans-Peter'],
            [['Hans-Peter'], 'HansPeter'],
            [['-Hans-Peter'], '-HansPeter'],
            [['-'], '-'],
            [['hans-peter', '_'], 'hans-peter'],
            [['hans_peter', '_'], 'hansPeter'],
            [['hans_id', '_'], 'hansID'],
            [['url_hans_id', '_', ['hans']], 'urlHANSId'],
            [['url_hans_1', '_'], 'urlHans1'],
            [['hansUrl1', '-', ['url'], true], 'hansUrl1'],
            [['hans-url', '-', ['url'], true], 'hansURL'],
            [['hans-Url', '-', ['url'], true], 'hansUrl'],
            [['hans-Url', '-', ['url'], false], 'hansURL'],
            [['hans-Url', '-', [], false], 'hansUrl'],
            [['hans--Url', '-', [], false, true], 'hansUrl']
        ])
            assert.strictEqual(
                Tools.stringDelimitedToCamelCase(...test[0]), test[1])
    })
    test('stringFindNormalizedMatchRange', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [['', ''], null],
            [['hans', ''], null],
            [['hans', 'a'], [1, 2]],
            [['hans', 'an'], [1, 3]],
            [['hans', 'han'], [0, 3]],
            [['hans', 'hans'], [0, 4]],
            [['hans', 'ans'], [1, 4]],
            [['hans hans', 'ans'], [1, 4]],
            [
                [' hAns ', 'ans', (value:any):string => value.toLowerCase()],
                [2, 5]
            ],
            [
                ['a straße b', 'strasse', (value:any):string =>
                    value.replace(/ß/g, 'ss').toLowerCase()
                ],
                [2, 8]
            ],
            [
                ['a strasse b', 'strasse', (value:any):string =>
                    value.replace(/ß/g, 'ss').toLowerCase()
                ],
                [2, 9]
            ],
            [
                ['a strasse b', 'straße', (value:any):string =>
                    value.replace(/ß/g, 'ss').toLowerCase()
                ],
                [2, 9]
            ]
        ])
            assert.deepEqual(Tools.stringFindNormalizedMatchRange(
                ...test[0]
            ), test[1])
    })
    test('stringFormat', ():void => {
        for (const test:Array<any> of [
            [['{1}', 'test'], 'test'],
            [['', 'test'], ''],
            [['{1}'], '{1}'],
            [['{1} test {2} - {2}', 1, 2], '1 test 2 - 2']
        ])
            assert.strictEqual(
                Tools.stringFormat(...test[0]), test[1])
    })
    test('stringGetEditDistance', ():void => {
        for (const test:Array<any> of [
            ['', '', 0],
            ['h', 'h', 0],
            ['hans', 'hans', 0],
            ['hans', 'hansa', 1],
            ['hansa', 'hans', 1],
            ['hans', 'hbns', 1],
            ['hbns', 'hans', 1],
            ['hbbs', 'hans', 2],
            ['beer', 'hans', 4]
        ])
            assert.strictEqual(
                Tools.stringGetEditDistance(test[0], test[1]), test[2])
    })
    test('stringGetRegularExpressionValidated', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            [`that's no regex: .*$`, `that's no regex: \\.\\*\\$`],
            ['', ''],
            ['-[]()^$*+.}-\\', '\\-\\[\\]\\(\\)\\^\\$\\*\\+\\.\\}\\-\\\\'],
            ['-', '\\-']
        ])
            assert.strictEqual(
                Tools.stringGetRegularExpressionValidated(test[0]),
                test[1])
    })
    test('stringInterpretDateTime', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['', null],
            ['01:00', new Date(1970, 1 - 1, 1, 1)],
            // TODO ['01:00 A.M.', new Date(1970, 1 - 1, 1, 1)],
            ['08:55', new Date(1970, 1 - 1, 1, 8, 55)],
            ['01:02', new Date(1970, 1 - 1, 1, 1, 2)],
            ['01:00:00', new Date(1970, 1 - 1, 1, 1)],
            ['01:02:00', new Date(1970, 1 - 1, 1, 1, 2)],
            ['01:02:03', new Date(1970, 1 - 1, 1, 1, 2, 3)],
            ['01:02:03:0', new Date(1970, 1 - 1, 1, 1, 2, 3)],
            ['01:02:03:4', new Date(1970, 1 - 1, 1, 1, 2, 3, 4)],
            ['1.1.1970', new Date(1970, 1 - 1, 1)],
            ['1.2.1970', new Date(1970, 2 - 1, 1)],
            ['1.1.1970 10', new Date(1970, 1 - 1, 1, 10)],
            ['1.1.1970 10:30', new Date(1970, 1 - 1, 1, 10, 30)],
            ['1.1.1970 10:30:30', new Date(1970, 1 - 1, 1, 10, 30, 30)],
            ['2014-11-26 08:30:00', new Date(2014, 11 - 1, 26, 8, 30)],
            ['2014-11-26T08:30:00', new Date(2014, 11 - 1, 26, 8, 30)],
            [
                '2014-11-26T08:30:00+01:00',
                new Date(Date.UTC(2014, 11 - 1, 26, 7, 30))
            ],
            [
                '2014-11-10T08:30:00+01:00',
                new Date(Date.UTC(2014, 11 - 1, 10, 7, 30))
            ],
            [
                '2014-11-10T08:30:00+02:00',
                new Date(Date.UTC(2014, 11 - 1, 10, 6, 30))
            ],
            ['1.1.1970 08:30:00', new Date(1970, 1 - 1, 1, 8, 30)],
            ['Mo. 1.1.1970', new Date(1970, 1 - 1, 1)],
            ['Di. 2.1.1970', new Date(1970, 1 - 1, 2)],
            ['Fr. 3.1.1970', new Date(1970, 1 - 1, 3)],
            ['3.Jan.1970', new Date(1970, 1 - 1, 3)],
            ['3. Jan. 1970', new Date(1970, 1 - 1, 3)],
            ['3. mai. 1970', new Date(1970, 5 - 1, 3)],
            ['3. may 1970', new Date(1970, 5 - 1, 3)],
            ['3. märz 1970', new Date(1970, 3 - 1, 3)],
            ['3. Dezember 1970', new Date(1970, 12 - 1, 3)]
        ])
            assert.ok(Tools.equals(
                Tools.stringInterpretDateTime(test[0], false), test[1]
            ))
    })
    test('stringLowerCase', ():void => {
        for (const test:Array<any> of [
            ['HansPeter', 'hansPeter'],
            ['', ''],
            ['A', 'a'],
            ['a', 'a'],
            ['aa', 'aa'],
            ['Aa', 'aa'],
            ['aa', 'aa']
        ])
            assert.strictEqual(Tools.stringLowerCase(test[0]), test[1])
    })
    test('stringMark', ():void => {
        for (const test:Array<any> of [
            [[''], ''],
            [['test', 'e'], 't<span class="tools-mark">e</span>st'],
            [['test', 'es'], 't<span class="tools-mark">es</span>t'],
            [['test', 'test'], '<span class="tools-mark">test</span>'],
            [['test', ''], 'test'],
            [['test', 'tests'], 'test'],
            [['', 'test'], ''],
            [['test', 'e', '<a>{1}</a>'], 't<a>e</a>st'],
            [['test', ['e'], '<a>{1}</a>'], 't<a>e</a>st'],
            [['test', 'E', '<a>{1}</a>'], 't<a>e</a>st'],
            [['test', 'E', '<a>{1}</a>'], 't<a>e</a>st'],
            [['tesT', 't', '<a>{1}</a>'], '<a>t</a>es<a>T</a>'],
            [
                ['tesT', 't', '<a>{1} - {1}</a>'],
                '<a>t - t</a>es<a>T - T</a>'
            ],
            [
                ['test', 'E', '<a>{1}</a>', (value:any):string => `${value}`],
                'test'
            ],
            [
                ['abcd', ['a', 'c']],
                '<span class="tools-mark">a</span>b' +
                '<span class="tools-mark">c</span>d'
            ],
            [
                ['aabcd', ['a', 'c']],
                '<span class="tools-mark">a</span>' +
                '<span class="tools-mark">a</span>b' +
                '<span class="tools-mark">c</span>d'
            ],
            [
                ['acbcd', ['a', 'c', 'd']],
                '<span class="tools-mark">a</span>' +
                '<span class="tools-mark">c</span>b' +
                '<span class="tools-mark">c</span>' +
                '<span class="tools-mark">d</span>'
            ],
            [
                ['a EBikes München', ['ebikes', 'münchen'], '<a>{1}</a>', (
                    value:any
                ):string => `${value}`.toLowerCase()],
                'a <a>EBikes</a> <a>München</a>'
            ],
            [
                ['a E-Bikes München', ['ebikes', 'münchen'], '<a>{1}</a>', (
                    value:any
                ):string => `${value}`.toLowerCase().replace('-', '')],
                'a <a>E-Bikes</a> <a>München</a>'
            ],
            [
                ['a str. 2', ['straße', '2'], '<a>{1}</a>', (
                    value:any
                ):string => `${value}`.toLowerCase().replace(
                    'str.', 'strasse'
                ).replace('ß', 'ss')],
                'a <a>str.</a> <a>2</a>'
            ],
            [
                [
                    'EGO Movement Store E-Bikes München',
                    ['eBikes', 'München'],
                    '<a>{1}</a>', (value:any):string => `${value}`.toLowerCase(
                    ).replace(/[-_]+/g, '').replace(/ß/g, 'ss').replace(
                        /(^| )str\./g, '$1strasse'
                    ).replace(/[& ]+/g, ' ')
                ], 'EGO Movement Store <a>E-Bikes</a> <a>München</a>'
            ],
            [
                [
                    'str.A strasse B straße C str. D', ['str.'],
                    '<a>{1}</a>', (value:any):string => `${value}`.toLowerCase(
                    ).replace(/[-_]+/g, '').replace(/ß/g, 'ss').replace(
                        /(^| )str\./g, '$1strasse'
                    ).replace(/[& ]+/g, ' ')
                ],
                '<a>str.</a>A <a>strasse</a> B <a>straße</a> C <a>str.</a> D'
            ]
        ])
            assert.strictEqual(Tools.stringMark(...test[0]), test[1])
    })
    test(`stringMD5 (${testEnvironment})`, ():void => {
        for (const test:Array<any> of [
            [[''], 'd41d8cd98f00b204e9800998ecf8427e'],
            [['test'], '098f6bcd4621d373cade4e832627b4f6'],
            [['ä'], '8419b71c87a225a2c70b50486fbee545'],
            [['test', true], '098f6bcd4621d373cade4e832627b4f6'],
            [['ä', true], 'c15bcc5577f9fade4b4a3256190a59b0']
        ])
            assert.strictEqual(Tools.stringMD5(...test[0]), test[1])
    })
    test('stringNormalizePhoneNumber', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['0', '0'],
            [' 0  ', '0'],
            [0, '0'],
            [12345, '12345'],
            ['+49 172 (0) / 0212 - 3', '0049172002123']
        ])
            assert.strictEqual(
                Tools.stringNormalizePhoneNumber(test[0]), test[1])
        for (const test:Array<any> of [
            ['0', '0'],
            [' 0  ', '0'],
            [0, '0'],
            [12345, '12345'],
            ['+49 (0) 176-12 34-56', '0049-176-1234-56'],
            ['+49(0)176 12-34 56', '0049-176-123456'],
            ['+49 176 12 34 56', '0049-176-123456'],
            ['+49-176-12 34 56', '0049-176-123456'],
            ['0172/12555433', '0172-12555433'],
            ['0176 12 34 56', '0176-123456'],
            ['01761 234 56', '01761-23456'],
            ['+49 (178) 12 34 56', '0049-178-123456'],
            ['+49(178)123456', '0049-178-123456'],
            ['+49(178)12345-6', '0049-178-12345-6'],
            ['+49 (178) 123 45-6', '0049-178-12345-6'],
            ['06132-77-0', '06132-77-0'],
            ['06132-77-0 ', '06132-77-0'],
            ['06132-77-0a', '06132-770'],
            ['06132-77-0a ', '06132-770'],
            ['  06132-77-0a ', '06132-770'],
            ['  061 32-77-0a ', '06132-770'],
            ['  061 32-77-0 ', '06132-77-0'],
            ['  0061 32-77-0 ', '0061-32-77-0'],
            ['  +61 32-77-0 ', '0061-32-77-0'],
            ['05661-711677', '05661-711677'],
            ['0174/5661677', '0174-5661677'],
            ['+49 (0) 174 / 566 16 77', '0049-174-5661677'],
            ['+49 (174) 566 16 77', '0049-174-5661677'],
            [' +49 (174) 566 16 77 ', '0049-174-5661677'],
            ['02 91 / 14 55', '0291-1455'],
            ['03677842375', '03677842375']
        ])
            assert.strictEqual(
                Tools.stringNormalizePhoneNumber(test[0], false),
                test[1]
            )
    })
    test('stringNormalizeZipCode', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['0', '0'],
            [' 0  ', '0'],
            [0, '0'],
            [12345, '12345'],
            ['abc', ''],
            ['1B23A45', '12345'],
            [' 1B23A45 ', '12345']
        ])
            assert.strictEqual(
                Tools.stringNormalizeZipCode(test[0]), test[1])
    })
    if (TARGET_TECHNOLOGY === 'node')
        test('stringParseEncodedObject', ():void => {
            for (const test:Array<any> of [
                [[''], null],
                [['null'], null],
                [['{a: undefined}'], {a: undefined}],
                [
                    [Buffer.from('{a: undefined}').toString('base64')],
                    {a: undefined}
                ],
                [['{a: 2}'], {a: 2}],
                [[Buffer.from('{a: 1}').toString('base64')], {a: 1}],
                [['null'], null],
                [[Buffer.from('null').toString('base64')], null],
                [['{}'], {}],
                [[Buffer.from('{}').toString('base64')], {}],
                [['{a: a}'], null],
                [[Buffer.from('{a: a}').toString('base64')], null],
                [['{a: scope.a}', {a: 2}], {a: 2}],
                [
                    [Buffer.from('{a: scope.a}').toString('base64'), {a: 2}],
                    {a: 2}
                ]
            ])
                assert.deepEqual(
                    Tools.stringParseEncodedObject(...test[0]), test[1]
                )
        })
    test('stringSliceAllExceptNumberAndLastSeperator', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['12-34-56', '1234-56'],
            ['12 34 56', '123456'],
            ['123456', '123456']
        ])
            assert.strictEqual(
                Tools.stringSliceAllExceptNumberAndLastSeperator(
                    test[0]),
                test[1]
            )
    })
    test('stringRepresentPhoneNumber', (
        assert:Object
    ):void => {
        for (const test:Array<any> of [
            ['0', '0'],
            ['0172-12321-1', '+49 (0) 172 / 123 21-1'],
            ['0172-123211', '+49 (0) 172 / 12 32 11'],
            ['0172-1232111', '+49 (0) 172 / 123 21 11'],
            [undefined, ''],
            [null, ''],
            [false, ''],
            [true, ''],
            ['', ''],
            [' ', '']
        ])
            assert.strictEqual(
                Tools.stringRepresentPhoneNumber(test[0]), test[1])
    })
    test('stringSliceWeekday', ():void => {
        for (const test:Array<string> of [
            ['', ''],
            ['a', 'a'],
            ['1.1.1970', '1.1.1970'],
            ['Do. 1.1.1970', '1.1.1970'],
            ['We. 1.1.1970', '1.1.1970'],
            ['Mo. 1.1.1970', '1.1.1970'],
            ['Mo. 10', '10'],
            ['Mo. ', 'Mo. ']
        ])
            assert.strictEqual(
                Tools.stringSliceWeekday(test[0]), test[1]
            )
    })
    test('stringNormalizeDomNodeSelector', (
        assert:Object
    ):void => {
        for (const test:Array<string> of [
            ['div', 'body div'],
            ['div p', 'body div p'],
            ['body div', 'body div'],
            ['body div p', 'body div p'],
            ['', 'body']
        ])
            assert.strictEqual(
                tools.stringNormalizeDomNodeSelector(test[0]), test[1])
        for (const test:string of [
            '',
            'div',
            'div, p'
        ])
            assert.strictEqual($.Tools({
                domNodeSelectorPrefix: ''
            }).stringNormalizeDomNodeSelector(test), test)
    })
    // / endregion
    // / region number
    test('numberGetUTCTimestamp', ():void => {
        for (const test:Array<any> of [
            [[new Date(0)], 0],
            [[new Date(1)], 0.001],
            [[new Date(0), true], 0],
            [[new Date(1000), false], 1],
            [[new Date(1000), true], 1000],
            [[new Date(0), false], 0]
        ])
            assert.strictEqual(
                Tools.numberGetUTCTimestamp(...test[0]), test[1])
    })
    test('numberIsNotANumber', ():void => {
        for (const test:Array<any> of [
            [NaN, true],
            [{}, false],
            [undefined, false],
            [now.toString(), false],
            [null, false],
            [false, false],
            [true, false],
            [0, false]
        ])
            assert.strictEqual(
                Tools.numberIsNotANumber(test[0]), test[1])
    })
    test('numberRound', ():void => {
        for (const test:Array<any> of [
            [[1.5, 0], 2],
            [[1.4, 0], 1],
            [[1.4, -1], 0],
            [[1000, -2], 1000],
            [[999, -2], 1000],
            [[950, -2], 1000],
            [[949, -2], 900],
            [[1.2345], 1],
            [[1.2345, 2], 1.23],
            [[1.2345, 3], 1.235],
            [[1.2345, 4], 1.2345],
            [[699, -2], 700],
            [[650, -2], 700],
            [[649, -2], 600]
        ])
            assert.strictEqual(Tools.numberRound(...test[0]), test[1])
    })
    // / endregion
    // / region data transnfer
    test('checkReachability', async ():Promise<void> => {
        const done:Function = assert.async()
        for (const test:Array<any> of [
            ['unknownURL', false],
            ['unknownURL', false, 301],
            ['http://unknownHostName', true, 200, 0.025],
            ['http://unknownHostName', true, [200], 0.025],
            ['http://unknownHostName', true, [200, 301], 0.025]
        ])
            try {
                await Tools.checkReachability(...test)
                assert.ok(false)
            } catch (error) {
                assert.ok(true)
            }
        done()
    })
    test('checkUnreachability', async ():Promise<void> => {
        const done:Function = assert.async()
        for (const test:Array<any> of [
            ['unknownURL', false, 10, 0.1, 200],
            ['unknownURL', true, 10, 0.1, 200],
            ['unknownURL', true, 10, 0.1, [200]],
            ['unknownURL', true, 10, 0.1, [200, 301]],
            ['http://unknownHostName', true]
        ])
            try {
                await Tools.checkUnreachability(...test)
                assert.ok(true)
            } catch (error) {
                assert.ok(false)
            }
        done()
    })
    if (
        typeof targetTechnology !== 'undefined' &&
        targetTechnology === 'web' &&
        testEnvironment === 'full'
    ) {
        test('sendToIFrame', ():void => {
            const iFrame = $('<iframe>').hide().attr('name', 'test')
            $('body').append(iFrame)
            assert.ok(Tools.sendToIFrame(
                iFrame, window.document.URL, {test: 5}, 'get', true))
        })
        test('sendToExternalURL', (
            assert:Object
        ):void => assert.ok(tools.sendToExternalURL(
            window.document.URL, {test: 5})))
    }
    // / endregion
    // / region file
    if (TARGET_TECHNOLOGY === 'node') {
        test('copyDirectoryRecursive', async (
            assert:Object
        ):Promise<void> => {
            const done:Function = assert.async()
            assert.ok((await Tools.copyDirectoryRecursive(
                './node_modules/.bin',
                './copyDirectoryRecursiveTest.compiled',
                Tools.noop
            )).endsWith('/copyDirectoryRecursiveTest.compiled'))
            removeDirectoryRecursivelySync(
                './copyDirectoryRecursiveTest.compiled')
            done()
        })
        test('copyDirectoryRecursiveSync', (
            assert:Object
        ):void => {
            assert.ok(Tools.copyDirectoryRecursiveSync(
                './node_modules/.bin',
                './copyDirectoryRecursiveTestSync.compiled',
                Tools.noop
            ).endsWith('/copyDirectoryRecursiveTestSync.compiled'))
            removeDirectoryRecursivelySync(
                './copyDirectoryRecursiveTestSync.compiled')
        })
        test('copyFile', async (
            assert:Object
        ):Promise<void> => {
            const done:Function = assert.async()
            let result:string = ''
            try {
                result = await Tools.copyFile(
                    path.resolve('./', path.basename(__filename)),
                    `./test.${testEnvironment}.compiled.js`
                )
            } catch (error) {
                console.error(error)
            }
            assert.ok(result.endsWith(`./test.${testEnvironment}.compiled.js`))
            /*
                NOTE: A race condition was identified here. So we need an
                additional digest loop to have this test artefact placed here.
            */
    /*
            await Tools.timeout()
            synchronousFileSystem.unlinkSync(`./test.${testEnvironment}.compiled.js`)
            done()
        })
        test('copyFileSync', ():void => {
            assert.ok(Tools.copyFileSync(
                path.resolve('./', path.basename(__filename)),
                './synctest.compiled.js'
            ).endsWith('/synctest.compiled.js'))
            synchronousFileSystem.unlinkSync('./synctest.compiled.js')
        })
        test('isDirectory', async (
            assert:Object
        ):Promise<void> => {
            const done:Function = assert.async()
            for (const filePath:string of ['./', '../']) {
                let result:boolean
                try {
                    result = await Tools.isDirectory(filePath)
                } catch (error) {
                    console.error(error)
                }
                assert.ok(result)
            }
            for (const filePath:string of [
                path.resolve('./', path.basename(__filename))
            ]) {
                let result:boolean
                try {
                    result = await Tools.isDirectory(filePath)
                } catch (error) {
                    console.error(error)
                }
                assert.notOk(result)
            }
            done()
        })
        test('isDirectorySync', ():void => {
            for (const filePath:string of ['./', '../'])
                assert.ok(Tools.isDirectorySync(filePath))
            for (const filePath:string of [
                path.resolve('./', path.basename(__filename))
            ])
                assert.notOk(Tools.isDirectorySync(filePath))
        })
        test('isFile', async (
            assert:Object
        ):Promise<void> => {
            const done:Function = assert.async()
            for (const filePath:string of [
                path.resolve('./', path.basename(__filename))
            ]) {
                let result:boolean
                try {
                    result = await Tools.isFile(filePath)
                } catch (error) {
                    console.error(error)
                }
                assert.ok(result)
            }
            for (const filePath:string of ['./', '../']) {
                let result:boolean
                try {
                    result = await Tools.isFile(filePath)
                } catch (error) {
                    console.error(error)
                }
                assert.notOk(result)
            }
            done()
        })
        test('isFileSync', ():void => {
            for (const filePath:string of [
                path.resolve('./', path.basename(__filename))
            ])
                assert.ok(Tools.isFileSync(filePath))
            for (const filePath:string of ['./', '../'])
                assert.notOk(Tools.isFileSync(filePath))
        })
        test('walkDirectoryRecursively', async (
            assert:Object
        ):Promise<void> => {
            const done:Function = assert.async()
            const filePaths:Array<string> = []
            const callback:Function = (filePath:string):null => {
                filePaths.push(filePath)
                return null
            }
            let files:Array<File> = []
            try {
                files = await Tools.walkDirectoryRecursively(
                    './', callback)
            } catch (error) {
                console.error(error)
            }
            assert.strictEqual(files.length, 1)
            assert.ok(files[0].hasOwnProperty('path'))
            assert.ok(files[0].hasOwnProperty('stats'))
            assert.strictEqual(filePaths.length, 1)
            done()
        })
        test('walkDirectoryRecursivelySync', (
            assert:Object
        ):void => {
            const filePaths:Array<string> = []
            const callback:Function = (filePath:string):null => {
                filePaths.push(filePath)
                return null
            }
            const files:Array<File> =
                Tools.walkDirectoryRecursivelySync('./', callback)
            assert.strictEqual(files.length, 1)
            assert.ok(files[0].hasOwnProperty('path'))
            assert.ok(files[0].hasOwnProperty('stats'))
            assert.strictEqual(filePaths.length, 1)
        })
    }
    // / endregion
    // / region process handler
    if (TARGET_TECHNOLOGY === 'node') {
        test('getProcessCloseHandler', (
            assert:Object
        ):void => assert.strictEqual(
            typeof Tools.getProcessCloseHandler(
                ():void => {}, ():void => {}
            ), 'function'))
        test('handleChildProcess', (
            assert:Object
        ):void => {
            /**
             * A mockup duplex stream for mocking "stdout" and "strderr"
             * process connections.
             *//*TODO
            class MockupDuplexStream extends require('stream').Duplex {
                /**
                 * Triggers if contents from current stream should be red.
                 * @param _size - Number of bytes to read asynchronously.
                 * @returns Red data.
                 *//*TODO
                _read(_size?:number):void {}
                /**
                 * Triggers if contents should be written on current stream.
                 * @param chunk - The chunk to be written. Will always be a
                 * buffer unless the "decodeStrings" option was set to "false".
                 * @param encoding - Specifies encoding to be used as input
                 * data.
                 * @param callback - Will be called if data has been written.
                 * @returns Returns Nothing.
                 *//*TODO
                _write(
                    chunk:Buffer|string, encoding:string, callback:Function
                ):void {
                    callback(new Error('test'))
                }
            }
            const stdoutMockupDuplexStream:MockupDuplexStream =
                new MockupDuplexStream()
            const stderrMockupDuplexStream:MockupDuplexStream =
                new MockupDuplexStream()
            const childProcess:ChildProcess = new ChildProcess()
            childProcess.stdout = stdoutMockupDuplexStream
            childProcess.stderr = stderrMockupDuplexStream

            assert.strictEqual(
                Tools.handleChildProcess(childProcess), childProcess)
        })
    }
    // / endregion
    // endregion
    // region protected
    if (testEnvironment === 'full')
        test(`_bindEventHelper (${testEnvironment})`, (
            assert:Object
        ):void => {
            for (const test:Array<any> of [
                [['body']],
                [['body'], true],
                [['body'], false, 'bind']
            ])
                assert.ok(tools._bindEventHelper(...test))
        })
    // endregion
    */
})
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

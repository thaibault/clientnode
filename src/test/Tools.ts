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
import nodeFetch from 'node-fetch'
import {getInitializedBrowser} from 'weboptimizer/browser'

import {$, globalContext, NOOP} from '../context'
import {
    TEST_DEFINED_SYMBOL, testEach, testEachAgainstSameExpectation
} from '../test-helper'
import Tools from '../Tools'
import {Mapping, $T} from '../type'
/*
    NOTE: We have to preload this module to avoid introducing an additional
    asynchronous chunk.
*/
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('node-fetch/src/utils/multipart-parser')

declare const TARGET_TECHNOLOGY:string

// region determine technology specific implementations
globalContext.fetch = nodeFetch as unknown as typeof fetch

const testEnvironment:string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const hasDOM = ['browser', 'node-with-dom'].includes(testEnvironment)
// endregion
const tools = new Tools()
// region public methods
/// region special
test('constructor', () => {
    expect(Tools).toHaveProperty('_defaultOptions')
    expect(new Tools()).toHaveProperty('options')
})
test('destructor', () => {
    expect(tools.destructor()).toStrictEqual(tools)
})
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
    const $body = $('body')

    expect(Tools.controller(tools, [])).toStrictEqual(tools)
    expect((Tools.controller($.Tools.class, [], $body) as Tools)
        .constructor.name
    ).toStrictEqual(Tools.name)
    expect((Tools.controller(Tools, [], $body) as Tools)
        .constructor.name
    ).toStrictEqual(Tools.name)
})
/// endregion
/// region logging
test('log', () => {
    tools.log('test')
    expect(true).toStrictEqual(true)
})
test('info', () => {
    tools.info('test {0}')
    expect(true).toStrictEqual(true)
})
test('debug', () => {
    tools.debug('test')
    expect(true).toStrictEqual(true)
})
// NOTE: This test breaks javaScript modules in strict mode.
test.skip(`${testEnvironment}-error`, () => {
    tools.error('ignore this error, it is only a {1}', 'test')
    expect(true).toStrictEqual(true)
})
test('warn', () => {
    tools.warn('test')
    expect(true).toStrictEqual(true)
})
test('show', () => {
    expect(/^.+\(Type: "function"\)$/su.test(Tools.show(NOOP)))
        .toStrictEqual(true)
})
testEach<typeof Tools.show>(
    'show',
    Tools.show.bind(Tools),

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
        (html:string, css:Mapping) => {
            const $domNode:$T = $(html)

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
        (html:string, text:string) => {
            expect($(html).Tools('text')).toStrictEqual(text)
        }
    )
    // endregion
    testEachAgainstSameExpectation<typeof Tools.isEquivalentDOM>(
        'isEquivalentDOM',
        Tools.isEquivalentDOM.bind(Tools),
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
    )
    testEachAgainstSameExpectation<typeof Tools.isEquivalentDOM>(
        'isEquivalentDOM',
        Tools.isEquivalentDOM.bind(Tools),
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
    test('getPositionRelativeToViewport', () => {
        expect(['above', 'left', 'right', 'below', 'in'])
            .toContain(tools.getPositionRelativeToViewport())
    })
}
testEach<typeof Tools.generateDirectiveSelector>(
    'generateDirectiveSelector',
    Tools.generateDirectiveSelector.bind(Tools),

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

        const $localBodyDomNode:$T = $('body').Tools('removeDirective', 'a')

        expect($localBodyDomNode.Tools().removeDirective('a'))
            .toStrictEqual($localBodyDomNode)
    })
testEach<typeof Tools.getNormalizedDirectiveName>(
    'getNormalizedDirectiveName',
    Tools.getNormalizedDirectiveName.bind(Tools),

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
    Tools.getDomNodeName.bind(Tools),

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

        const $body = $('body')

        for (const [expected, parameters] of [
            [{a: $('div'), parent: $body}, [{a: 'div'}]],
            [
                {a: $body.find('script'), parent: $body},
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
    test('on', () => {
        const $body = $('body')

        let testValue = false
        expect(
            tools.on('body', 'click', () => {
                testValue = true
            })[0]
        ).toStrictEqual($body[0])

        $body.trigger('click')
        expect(testValue).toStrictEqual(true)
    })
    test('off', ():void => {
        const $body = $('body')

        let testValue = false
        expect(
            tools.on('body', 'click', ():void => {
                testValue = true
            })[0]
        ).toStrictEqual($body[0])
        expect(tools.off('body', 'click')[0]).toStrictEqual($body[0])

        $body.trigger('click')
        expect(testValue).toStrictEqual(false)
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

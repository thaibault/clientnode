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
import {expect, jest, test} from '@jest/globals'

import {
    createDomNodes,
    fade,
    fadeIn,
    fadeOut,
    getAll,
    getParents,
    getText,
    isEquivalent,
    isHidden,
    onDocumentReady,
    unwrap,
    wrap
} from '../domNode'
import {testEach, testEachAgainstSameExpectation} from '../test-helper'

declare const TARGET_TECHNOLOGY: string

const TEST_ENVIRONMENT: string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

if (TEST_ENVIRONMENT !== 'node') {
    const divElement = document.createElement('div')

    test('createDomNodes', () => {
        const document = createDomNodes('<div></div>')

        expect(document.nodeName).toStrictEqual('DIV')
        expect(document.parentNode).toBeNull()
    })

    test('fade', () => {
        void expect(fade(divElement)).resolves.toBeUndefined()
    })

    test('fadeIn', () => {
        void expect(fadeIn(divElement)).resolves.toBeUndefined()
    })

    test('fadeOut', () => {
        void expect(fadeOut(divElement)).resolves.toBeUndefined()
    })

    testEach(
        'getAll',
        getAll,

        [[divElement], divElement]
    )

    test.each([
        [[], '<div id="start"></div>'],
        [['DIV'], '<div><div id="start"></div></div>'],
        [['DIV', 'P'], '<div><p><a id="start"></a></p></div>'],
        [
            ['DIV', 'DIV', 'P'],
            '<div><div><p><a id="start"></a></p></div></div>'
        ]
    ])('%o === getParents(%o)', (expected, domNodes) => {
        expect(
            getParents((createDomNodes<HTMLElement>(domNodes))
                .querySelector('#start') as HTMLElement
            ).map((node) => node.nodeName)
        ).toEqual(expected)
    })

    testEach(
        'getText',
        getText,

        [[], divElement],
        [['hans'], createDomNodes('<div>hans</div>')],
        [[], createDomNodes('<div><div>hans</div</div>')],
        [['hans'], createDomNodes('<div>hans<div>peter</div></div>')]
    )

    testEachAgainstSameExpectation(
        'isEquivalent',
        isEquivalent,
        true,

        ['test', 'test'],
        ['test test', 'test test'],
        ['<div>', '<div>'],
        ['<div class>', '<div class="">'],
        ['<div style>', '<div style="">'],
        ['<div></div>', '<div>'],
        ['<div class="a"></div>', '<div class="a"></div>'],
        [
            createDomNodes('<a target="_blank" class="a"></a>'),
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
                <a target="_blank" class="a b">
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
    testEachAgainstSameExpectation(
        'isEquivalent',
        isEquivalent,
        false,

        ['test', ''],
        ['test', 'hans'],
        ['test test', 'testtest'],
        ['test test:', ''],
        ['<div class="a"></div>', '<div>'],
        [
            createDomNodes('<a class="a"></a>'),
            '<a class="a" target="_blank"></a>'
        ],
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

    test('isHidden', () => {
        const domNode =
            createDomNodes<HTMLDivElement>('<div></div>')
        domNode.style.height = '100px'
        domNode.style.width = '100px'

        // Not connected to DOM.
        expect(isHidden(domNode)).toStrictEqual(true)

        document.body.appendChild(domNode)

        // Connected to DOM.
        expect(isHidden(domNode)).toStrictEqual(false)

        // Hidden via CSS.
        domNode.style.display = 'none'
        expect(isHidden(domNode)).toStrictEqual(true)
        // Hidden block elements still take space in layout.
        domNode.style.display = 'block'
        domNode.style.visibility = 'hidden'
        expect(isHidden(domNode)).toStrictEqual(false)
        domNode.style.height = '0'
        domNode.style.width = '0'
        expect(isHidden(domNode)).toStrictEqual(true)
        domNode.style.height = '100px'
        domNode.style.width = '100px'
        domNode.style.display = 'inline'
        expect(isHidden(domNode)).toStrictEqual(true)

        domNode.textContent = 'some content'
        expect(isHidden(domNode)).toStrictEqual(false)

        // Parent is hidden.
        const wrapperDomNode = createDomNodes<HTMLDivElement>(
            '<div><div id="target"></div></div>'
        )
        document.body.appendChild(wrapperDomNode)
        const nestedDomNode =
            wrapperDomNode.querySelector('#target') as HTMLDivElement
        expect(isHidden(nestedDomNode)).toStrictEqual(false)
        wrapperDomNode.style.display = 'none'
        expect(isHidden(nestedDomNode)).toStrictEqual(true)

        // Form input is visible/hidden.
        const inputDomNode =
            createDomNodes<HTMLDivElement>('<input />')
        document.body.appendChild(inputDomNode)
        expect(isHidden(inputDomNode)).toStrictEqual(false)
        inputDomNode.setAttribute('type', 'hidden')
        expect(isHidden(inputDomNode)).toStrictEqual(true)
    })

    test('onDocumentReady', async () => {
        const mockCallback = jest.fn()
        await onDocumentReady(mockCallback)
        expect(mockCallback).toHaveBeenCalledTimes(1)
    })

    test('wrap', () => {
        const domNode = createDomNodes('<div></div>')
        const wrapper = createDomNodes<HTMLElement>('<wrapper></wrapper>')

        wrap(domNode, wrapper)

        expect(isEquivalent(wrapper, '<wrapper><div></div></wrapper>'))
            .toStrictEqual(true)

        const boundWrapper = createDomNodes<HTMLElement>('<wrapper></wrapper>')

        document.body.appendChild(boundWrapper)

        wrap(wrapper, boundWrapper)

        expect(isEquivalent(
            boundWrapper, '<wrapper><wrapper><div></div></wrapper></wrapper>'
        )).toStrictEqual(true)
    })

    test.each(
        [
            ['<div><wrapper><p></p></wrapper></div>', '<div><p></p></div>', 1],
            [
                '<div><wrapper><p></p>text</wrapper></div>',
                '<div><p></p>text</div>',
                2
            ],
            ['<wrapper>text</wrapper>', '<wrapper>text</wrapper>', 1],
            ['<div><wrapper></wrapper></div>', '<div></div>', 0]
        ]
    )(
        '%s => %s; unwrap().length === %d',
        (context, expectedContext, expectedChildNodesLength) => {
            const contextDomNode = createDomNodes<HTMLElement>(context)
            const wrapper =
                contextDomNode.querySelector<HTMLElement>('wrapper') ??
                contextDomNode

            expect(unwrap(wrapper))
                .toHaveProperty('length', expectedChildNodesLength)

            expect(isEquivalent(contextDomNode, expectedContext))
                .toStrictEqual(true)
        }
    )

    test('bound unwrap', () => {
        const boundWrapperContext = createDomNodes<HTMLElement>(
            '<div><wrapper><div></div></wrapper></div>'
        )
        const boundWrapper =
            boundWrapperContext.querySelector<HTMLElement>('wrapper') ??
            boundWrapperContext

        document.body.appendChild(boundWrapperContext)

        expect(unwrap(boundWrapper)).toHaveProperty('length', 1)

        expect(isEquivalent(boundWrapperContext, '<div><div></div></div>'))
            .toStrictEqual(true)
    })
}

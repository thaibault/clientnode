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
import {expect, test} from '@jest/globals'

import {
    createDomNodes,
    fade,
    fadeIn,
    fadeOut,
    getAll, getParents,
    getText,
    isEquivalentDOM
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
        'isEquivalentDOM',
        isEquivalentDOM,
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
        'isEquivalentDOM',
        isEquivalentDOM,
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
}

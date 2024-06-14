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
    TEST_DEFINED_SYMBOL,
    testEachPromiseAgainstSameExpectation,
    testEachPromiseRejectionAgainstSameExpectation
} from '../test-helper'
import {
    checkReachability, checkUnreachability, sendToExternalURL, sendToIFrame
} from '../data-transfer'
import {timeout} from '../utility'
import {$T} from '../type'
import {$} from '../context'

declare const TARGET_TECHNOLOGY:string

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
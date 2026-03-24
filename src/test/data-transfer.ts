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

import {checkReachability, checkUnreachability} from '../data-transfer'
import {
    TEST_DEFINED_SYMBOL,
    testEachPromiseAgainstSameExpectation,
    testEachPromiseRejectionAgainstSameExpectation
} from '../test-helper'
import {timeout} from '../utility'

testEachPromiseRejectionAgainstSameExpectation(
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
testEachPromiseAgainstSameExpectation(
    'checkUnreachability',
    checkUnreachability,
    TEST_DEFINED_SYMBOL,

    ['unknownURL', {statusCodes: 200}],
    ['unknownURL', {statusCodes: 200, wait: true}],
    ['unknownURL', {statusCodes: [200], wait: true}],
    ['unknownURL', {statusCodes: [200, 301], wait: true}]
)
test('checkUnreachability', () => {
    const abortController = new AbortController()
    void timeout(0.25, () => {
        abortController.abort()
    })

    void expect(checkUnreachability(
        'http://unknownHostName',
        {
            options: {signal: abortController as unknown as AbortSignal},
            statusCodes: 200,
            wait: true
        }
    )).resolves.toBeDefined()
})

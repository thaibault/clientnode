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

import {getInitializedBrowser} from 'weboptimizer/browser'
import {$} from '../context'
import {deleteCookie, getCookie, setCookie} from '../cookie'

declare const TARGET_TECHNOLOGY: string

const TEST_ENVIRONMENT: string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const HAS_DOM = ['browser', 'node-with-dom'].includes(TEST_ENVIRONMENT)

if (HAS_DOM) {
    test(
        `deleteCookie (${TEST_ENVIRONMENT})`, async (): Promise<void> => {
            await getInitializedBrowser()

            expect($.document?.cookie).toStrictEqual('')

            expect(setCookie('name', 'value', {minimal: true}))
                .toStrictEqual(true)
            expect(getCookie('name')).toStrictEqual('value')
            deleteCookie('name')
            expect(getCookie('name')).toStrictEqual('')

            if ($.document)
                $.document.cookie = ''
        }
    )
    test(`getCookie (${TEST_ENVIRONMENT})`, async (): Promise<void> => {
        await getInitializedBrowser()

        if (!$.document)
            throw new Error('Browser api is missing.')

        expect(getCookie('')).toStrictEqual('')

        expect(getCookie('name')).toStrictEqual('')

        expect(setCookie('name', 'value', {minimal: true}))
            .toStrictEqual(true)
        expect(getCookie('name')).toStrictEqual('value')

        $.document.cookie = ''
    })
    test(`setCookie (${TEST_ENVIRONMENT})`, async (): Promise<void> => {
        await getInitializedBrowser()

        if (!$.document)
            throw new Error('Browser api is missing.')

        $.document.cookie = ''

        expect(setCookie('name', 'value', {minimal: true}))
            .toStrictEqual(true)
        expect(getCookie('name')).toStrictEqual('value')

        $.document.cookie = ''

        expect(setCookie('name', '', {minimal: true})).toStrictEqual(true)
        expect(getCookie('name')).toStrictEqual('')

        $.document.cookie = ''
    })
}

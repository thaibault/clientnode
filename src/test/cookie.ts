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

declare const TARGET_TECHNOLOGY:string

const testEnvironment:string = (
    typeof TARGET_TECHNOLOGY === 'undefined' || TARGET_TECHNOLOGY === 'node'
) ?
    typeof document === 'undefined' ?
        'node' :
        'node-with-dom' :
    'browser'

const hasDOM = ['browser', 'node-with-dom'].includes(testEnvironment)

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

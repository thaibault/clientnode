// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module cookie */
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
import {$} from './context'
import {CookieOptions} from './type'

/**
 * Deletes a cookie value by given name.
 * @param name - Name to identify requested value.
 */
export const deleteCookie = (name:string):void => {
    if ($.document)
        $.document.cookie = `${name}=; Max-Age=-99999999;`
}
/**
 * Gets a cookie value by given name.
 * @param name - Name to identify requested value.
 * @returns Requested value.
 */
export const getCookie = (name:string):string|null => {
    if ($.document) {
        const key = `${name}=`
        const decodedCookie:string = decodeURIComponent($.document.cookie)
        for (let date of decodedCookie.split(';')) {
            while (date.startsWith(' '))
                date = date.substring(1)

            if (date.startsWith(key))
                return date.substring(key.length, date.length)
        }

        return ''
    }

    return null
}
/**
 * Sets a cookie key-value-pair.
 * @param name - Name to identify given value.
 * @param value - Value to set.
 * @param givenOptions - Cookie set options.
 * @param givenOptions.domain - Domain to reference with given key-value-pair.
 * @param givenOptions.httpOnly - Indicates if this cookie should be accessible
 * from client or not.
 * @param givenOptions.minimal - Set only minimum number of options.
 * @param givenOptions.numberOfDaysUntilExpiration - Number of days until given
 * key shouldn't be deleted.
 * @param givenOptions.path - Path to reference with given key-value-pair.
 * @param givenOptions.sameSite - Set same site policy to "Lax", "None" or
 * "Strict".
 * @param givenOptions.secure - Indicates if this cookie is only valid for
 * "https" connections.
 * @returns A boolean indicating whether cookie could be set or not.
 */
export const setCookie = (
    name:string, value:string, givenOptions:Partial<CookieOptions> = {}
):boolean => {
    if ($.document) {
        const options:CookieOptions = {
            domain: '',
            httpOnly: false,
            minimal: false,
            numberOfDaysUntilExpiration: 365,
            path: '/',
            sameSite: 'Lax',
            secure: true,
            ...givenOptions
        }

        const now = new Date()
        now.setTime(
            now.getTime() +
            (options.numberOfDaysUntilExpiration * 24 * 60 * 60 * 1000)
        )

        if (options.domain === '' && $.location?.hostname)
            options.domain = $.location.hostname

        const newCookie =
            `${name}=${value}` +
            (
                options.minimal ?
                    '' :
                    (
                        `;Expires="${now.toUTCString()}` +
                        `;Path=${options.path}` +
                        `;Domain=${options.domain}` +
                        (
                            options.sameSite ?
                                `;SameSite=${options.sameSite}` :
                                ''
                        ) +
                        (options.secure ? ';Secure' : '') +
                        (options.httpOnly ? ';HttpOnly' : '')
                    )
            )

        $.document.cookie = newCookie

        return true
    }

    return false
}

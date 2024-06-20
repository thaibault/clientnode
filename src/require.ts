// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module require */
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
import {ImportFunction} from './type'
// Make preprocessed require function available at runtime.
/*
    NOTE: This results in an webpack error when postprocessing this compiled
    pendant in another webpack context.

    declare const __non_webpack_require__:typeof require
*/
export const currentRequire:null|typeof require =
    /*
        typeof __non_webpack_require__ === 'function' ?
            __non_webpack_require__ :
    */
    eval(`typeof require === 'undefined' ? null : require`) as
        null|typeof require

let currentOptionalImport:ImportFunction|null = null
try {
    currentOptionalImport =
        eval(`typeof import === 'undefined' ? null : import`) as
            ImportFunction|null
} catch (error) {
    // Continue regardless of an error.
}
export const currentImport:null|ImportFunction = currentOptionalImport
export const optionalRequire = <T = unknown>(id:string):null|T => {
    try {
        return currentRequire ? currentRequire(id) as T : null
    } catch (error) {
        return null
    }
}

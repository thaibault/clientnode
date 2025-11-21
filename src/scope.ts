// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module scope */
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
import {Mapping} from './type'

import {MAXIMAL_NUMBER_OF_ITERATIONS} from './context'
import * as array from './array'
import * as datetime from './datetime'
import * as filesystem from './filesystem'
import * as functions from './function'
import * as indicators from './indicators'
import * as logger from './Logger'
import * as number from './number'
import * as object from './object'
import * as require from './require'
import * as string from './string'
import * as utility from './utility'

export const UTILITY_SCOPE = {
    array,
    datetime,
    filesystem,
    functions,
    indicators,
    logger,
    number,
    object,
    require,
    string,
    utility
} as const
/*
    NOTE: Not generating these two arrays facilitates static code analysis in
    consuming code.
*/
export const UTILITY_SCOPE_NAMES = [
    'array',
    'datetime',
    'filesystem',
    'functions',
    'indicators',
    'logger',
    'number',
    'object',
    'require',
    'string',
    'utility'
] as const
export const UTILITY_SCOPE_VALUES = [
    array,
    datetime,
    filesystem,
    functions,
    indicators,
    logger,
    number,
    object,
    require,
    string,
    utility
] as const
/**
 * Overwrites all inherited variables from parent scope with "undefined".
 * @param scope - A scope where inherited names will be removed.
 * @param prefixesToIgnore - Name prefixes to ignore during deleting names in
 * given scope.
 * @returns The isolated scope.
 */
export const isolateScope = <T extends Mapping<unknown>>(
    scope: T, prefixesToIgnore: Array<string> = []
): T => {
    for (const name in scope)
        if (!(
            prefixesToIgnore.includes(name.charAt(0)) ||
            ['constructor', 'prototype', 'this'].includes(name) ||
            Object.prototype.hasOwnProperty.call(scope, name)
        ))
            /*
                NOTE: Delete ("delete $scope[name]") doesn't destroy the
                automatic lookup to parent scope.
            */
            (scope[name] as unknown) = undefined

    return scope
}
/**
 * Generates a unique name in given scope (useful for jsonp requests).
 * @param prefix - A prefix which will be prepended to unique name.
 * @param suffix - A suffix which will be prepended to unique name.
 * @param scope - A scope where the name should be unique.
 * @param initialUniqueName - An initial scope name to use if not exists.
 * @returns The function name.
 */
export const determineUniqueScopeName = (
    prefix = 'callback',
    suffix = '',
    scope: Mapping<unknown> = $.global as unknown as Mapping<unknown>,
    initialUniqueName = ''
): string => {
    if (initialUniqueName.length && !(initialUniqueName in scope))
        return initialUniqueName

    let uniqueName: string = prefix + suffix
    for (
        let iteration = 0;
        iteration < MAXIMAL_NUMBER_OF_ITERATIONS.value;
        iteration++
    ) {
        uniqueName =
            prefix +
            String(Math.round(Math.random() * Math.pow(10, 10))) +
            suffix
        if (!(uniqueName in scope))
            break
    }

    return uniqueName
}

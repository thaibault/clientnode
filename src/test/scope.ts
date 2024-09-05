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

import {determineUniqueScopeName, isolateScope} from '../scope'
import {Mapping} from '../type'

test('isolateScope', ():void => {
    expect(isolateScope({})).toStrictEqual({})
    expect(isolateScope({a: 2})).toStrictEqual({a: 2})
    expect(isolateScope({a: 2, b: {a: [1, 2]}}))
        .toStrictEqual({a: 2, b: {a: [1, 2]}})

    let Scope:(new () => Mapping<number>) =
        function(this:Mapping<number>):void {
            this.a = 2
        } as unknown as (new () => Mapping<number>)
    Scope.prototype = {_a: 5, b: 2}
    let scope:Mapping<number|undefined> = new Scope()

    isolateScope(scope, ['_'])
    let finalScope:Mapping<number|undefined> = {}
    // eslint-disable-next-line guard-for-in
    for (const name in scope)
        finalScope[name] = scope[name]

    expect(finalScope).toStrictEqual({_a: 5, a: 2, b: undefined})

    scope.b = 3
    isolateScope(scope, ['_'])
    finalScope = {}
    // eslint-disable-next-line guard-for-in
    for (const name in scope)
        finalScope[name] = scope[name]

    expect(finalScope).toStrictEqual({_a: 5, a: 2, b: 3})
    expect(isolateScope(scope))
        .toStrictEqual({_a: undefined, a: 2, b: 3})

    scope._a = 6
    expect(isolateScope(scope, ['_'])).toStrictEqual({_a: 6, a: 2, b: 3})

    Scope = function(this:Mapping<number>):void {
        this.a = 2
    } as unknown as (new () => Mapping<number>)
    Scope.prototype = {b: 3}
    scope = isolateScope(new Scope(), ['b'])
    finalScope = {}
    // eslint-disable-next-line guard-for-in
    for (const name in scope)
        finalScope[name] = scope[name]

    expect(finalScope).toStrictEqual({a: 2, b: 3})
    expect(isolateScope(new Scope())).toStrictEqual({a: 2, b: undefined})
})
test('determineUniqueScopeName', ():void => {
    expect(determineUniqueScopeName())
        .toStrictEqual(expect.stringMatching(/^callback/))
    expect(determineUniqueScopeName('hans'))
        .toStrictEqual(expect.stringMatching(/^hans/))
    expect(determineUniqueScopeName('hans', '', {}))
        .toStrictEqual(expect.stringMatching(/^hans/))
    expect(determineUniqueScopeName('hans', '', {}, 'peter'))
        .toStrictEqual('peter')
    expect(
        determineUniqueScopeName('hans', '', {peter: 2}, 'peter')
    ).toStrictEqual(expect.stringMatching(/^hans/))
    const name:string = determineUniqueScopeName(
        'hans', 'klaus', {peter: 2}, 'peter'
    )
    expect(name).toStrictEqual(expect.stringMatching(/^hans/))
    expect(name).toStrictEqual(expect.stringMatching(/klaus$/))
    expect(name.length).toBeGreaterThan('hans'.length + 'klaus'.length)
})

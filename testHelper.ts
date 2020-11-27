// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module testHelper */
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

    generic test boilerplate:

    test.each<FunctionTestTuple<FUNCTION>>([
        [EXPECTED, ...PARAMETERS],
        ...
    ])(
        '%p === FUNCTION(...%p)',
        (expected:ReturnType<FUNCTION>, ...parameters:Parameters<FUNCTION>) =>
            expect(FUNCTION(...parameters)).toStrictEqual(expected)
    )
*/
// region imports
import Tools from './index'
import {FirstParameter, FunctionTestTuple, GenericFunction} from './type'
// endregion
/**
 * TODO
 * @returns Nothing.
 */
export const testEach = <
    FunctionType extends GenericFunction = GenericFunction
>(
    functionName:string,
    callback:FunctionType,
    ...functionTestTuple:Array<FunctionTestTuple<FunctionType>>
):void =>
    test.each<FunctionTestTuple<FunctionType>>([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        (
            expected:ReturnType<FunctionType>,
            ...parameters:Parameters<FunctionType>
        ):void =>
            expect(callback(...parameters)).toStrictEqual(expected)
    )
/**
 * TODO
 * @returns Nothing.
 */
export const testEachSingleParameter = <
    FunctionType extends GenericFunction = GenericFunction
>(
    functionName:string,
    callback:FunctionType,
    ...functionTestTuple:Array<[
        ReturnType<FunctionType>, FirstParameter<FunctionType>
    ]>
):void =>
    test.each<[ReturnType<FunctionType>, FirstParameter<FunctionType>]>(
        [...functionTestTuple]
    )(
        `%p === ${functionName}(%p)`,
        (
            expected:ReturnType<FunctionType>,
            parameter:FirstParameter<FunctionType>
        ):void =>
            expect(callback(parameter)).toStrictEqual(expected)
    )
/**
 * TODO
 * @returns Nothing.
 */
export const testEachSingleParameterAgainstSameExpectation = <
    FunctionType extends GenericFunction = GenericFunction
>(
    functionName:string,
    callback:FunctionType,
    expected:ReturnType<FunctionType>,
    ...parameters:Array<FirstParameter<FunctionType>>
):void =>
    test.each<FirstParameter<FunctionType>>([...parameters])(
        `${Tools.represent(expected)} === ${functionName}(%p)`,
        (parameter:FirstParameter<FunctionType>):void =>
            expect(callback(parameter)).toStrictEqual(expected)
    )
/**
 * TODO
 * @returns Nothing.
 */
export const testEachAgainstSameExpectation = <
    FunctionType extends GenericFunction = GenericFunction
>(
    functionName:string,
    callback:FunctionType,
    expected:ReturnType<FunctionType>,
    ...functionParameters:Array<Parameters<FunctionType>>
):void =>
    test.each<Parameters<FunctionType>>([...functionParameters])(
        `${Tools.represent(expected)} === ${functionName}(%p, ...)`,
        (...parameters:Parameters<FunctionType>):void =>
            expect(callback(...parameters)).toStrictEqual(expected)
    )

export default testEach
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

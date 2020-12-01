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
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 *
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
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
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 *
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionTestTuple - Additional arrays of parameter to test given
 * function with.
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
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 *
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionTestTuple - Additional arrays of parameters to test given
 * function again.
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

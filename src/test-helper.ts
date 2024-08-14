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

    test.each([[EXPECTED, ...PARAMETERS], ...])(
        '%p === FUNCTION(...%p)',
        (expected:ReturnType<FUNCTION>, ...parameters:Parameters<FUNCTION>) =>
            expect(FUNCTION(...parameters)).toStrictEqual(expected)
    )
*/
// region imports
import {expect, test} from '@jest/globals'
import {Global as JestGlobal} from '@jest/types'

import {represent} from './object'
import {
    AnyFunction,
    FirstParameter,
    FunctionTestTuple,
    FunctionTestPromiseTuple,
    FunctionTestPromiseRejectionTuple,
    TestMatchers as Matchers,
    TestSymbol,
    ThenParameter,
    UnknownFunction, TestMatchers
} from './type'
// endregion
export const TEST_DEFINED_SYMBOL = Symbol.for('clientnodeTestHelperDefined')
export const TEST_THROW_SYMBOL = Symbol.for('clientnodeTestHelperThrow')
export const TEST_UNDEFINED_SYMBOL = Symbol.for('clientnodeTestHelperUndefined')
/**
 * Tests given result against given expectations. Respects special symbol
 * values.
 * @param givenResult - Target to compare expectation against.
 * @param expected - Expected result.
 * @param wrap - Indicates whether to wrap with an expect function call.
 * @returns Nothing or a promise resolving to nothing.
 */
export const testExpectedType = <
    Type = unknown, Result extends Promise<void>|void = void
>(
        givenResult:Matchers<Result>|Result,
        expected:TestSymbol|Type,
        wrap = true
    ):Result => {
    const result:Matchers<Result> = wrap ?
        expect<Result>(givenResult as Result) as unknown as Matchers<Result> :
        givenResult as Matchers<Result>

    if (expected === TEST_DEFINED_SYMBOL)
        return result.toBeDefined()

    if (expected === TEST_THROW_SYMBOL)
        return result.toThrow()

    if (expected === TEST_UNDEFINED_SYMBOL)
        return result.not.toBeDefined()

    return result.toStrictEqual(expected)
}
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
export const testEach = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        ...functionTestTuple:Array<FunctionTestTuple<FunctionType>>
    ) => {
    test.each([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            expected:ReturnType<FunctionType>|TestSymbol,
            ...parameters:Parameters<FunctionType>
        ) => {
            testExpectedType<ReturnType<FunctionType>>(
                callback(...parameters) as TestMatchers<void>|void,
                expected
            )
        }) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
export const testEachPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        ...functionTestTuple:Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    test.each([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
            ...parameters:Parameters<FunctionType>
        ):Promise<void> =>
            testExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, expected, false)
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
export const testEachPromiseRejection = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        ...functionTestTuple:Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    test.each([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            expected:Error | TestSymbol,
            ...parameters:Parameters<FunctionType>
        ):Promise<void> =>
            testExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, expected, false
            )
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
export const testEachSingleParameterAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:ReturnType<FunctionType>|TestSymbol,
        ...parameters:Array<FirstParameter<FunctionType>>
    ) => {
    test.each([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter:FirstParameter<FunctionType>) => {
            testExpectedType<ReturnType<FunctionType>>(
                (expected === TEST_THROW_SYMBOL ?
                    () => callback(parameter) as unknown :
                    callback(parameter)
                ) as TestMatchers<void> | void,
                expected
            )
        }) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
export const testEachSingleParameterAgainstSamePromisedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
        ...parameters:Array<FirstParameter<FunctionType>>
    ) => {
    test.each([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter:FirstParameter<FunctionType>) =>
            testExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(parameter)).resolves, expected, false)
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
export const testEachSingleParameterAgainstSameRejectedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:Error|TestSymbol,
        ...parameters:Array<FirstParameter<FunctionType>>
    ) => {
    test.each([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter:FirstParameter<FunctionType>):Promise<void> =>
            testExpectedType<Error, Promise<void>>(
                expect(callback(parameter)).rejects, expected, false
            )
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
export const testEachAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:ReturnType<FunctionType>|TestSymbol,
        ...functionParameters:Array<Parameters<FunctionType>>
    ) => {
    test.each([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters:Parameters<FunctionType>) => {
            testExpectedType<ReturnType<FunctionType>>(
                (expected === TEST_THROW_SYMBOL ?
                    () => callback(...parameters) as unknown :
                    callback(...parameters)
                ) as TestMatchers<void> | void,
                expected
            )
        }) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
export const testEachPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters:Array<Parameters<FunctionType>>
    ) => {
    test.each([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters:Parameters<FunctionType>) =>
            testExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, expected, false)
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
export const testEachPromiseRejectionAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:Error|TestSymbol,
        ...functionParameters:Array<Parameters<FunctionType>>
    ) => {
    test.each([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters:Parameters<FunctionType>):Promise<void> =>
            testExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, expected, false
            )
        ) as JestGlobal.EachTestFn<JestGlobal.TestFn>
    )
}
export default testEach

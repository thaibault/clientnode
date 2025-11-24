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
        (expected: ReturnType<FUNCTION>, ...parameters: Parameters<FUNCTION>) =>
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
export const expectExpectedType = <
    Type = unknown, Result extends Promise<void> | void = void
>(
        givenResult: Matchers<Result> | Result,
        expected: TestSymbol | Type,
        wrap = true
    ): Result => {
    const result: Matchers<Result> = wrap ?
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
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEach = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            /*
                eslint-disable
                @typescript-eslint/no-redundant-type-constituents
            */
            expected: ReturnType<FunctionType> | TestSymbol,
            /*
                eslint-enable @typescript-eslint/no-redundant-type-constituents
            */
            ...parameters: Parameters<FunctionType>
        ) => {
            expectExpectedType<ReturnType<FunctionType>>(
                callback(...parameters) as TestMatchers<void> | void,
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
export const testEach = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
    ) => {
    _testEach(test.each, functionName, callback, ...functionTestTuple)
}
testEach.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
    ) => {
    _testEach(test.only.each, functionName, callback, ...functionTestTuple)
}
testEach.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
    ) => {
    _testEach(test.skip.each, functionName, callback, ...functionTestTuple)
}
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEachPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            /*
                eslint-disable
                @typescript-eslint/no-redundant-type-constituents
            */
            expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
            /*
                eslint-enable @typescript-eslint/no-redundant-type-constituents
            */
            ...parameters: Parameters<FunctionType>
        ): Promise<void> =>
            expectExpectedType<
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
export const testEachPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachPromise(test.each, functionName, callback, ...functionTestTuple)
}
testEachPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEachPromiseRejection = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        ((
            expected: Error | TestSymbol,
            ...parameters: Parameters<FunctionType>
        ): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, expected, false
            )
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
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachPromiseRejection(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachPromiseRejection.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachPromiseRejection(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachPromiseRejection.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachPromiseRejection(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
const _testEachSingleParameterAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter: FirstParameter<FunctionType>) => {
            expectExpectedType<ReturnType<FunctionType>>(
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
export const testEachSingleParameterAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameExpectation(
        test.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
const _testEachSingleParameterAgainstSamePromisedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter: FirstParameter<FunctionType>) =>
            expectExpectedType<
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
export const testEachSingleParameterAgainstSamePromisedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSamePromisedExpectation(
        test.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSamePromisedExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSamePromisedExpectation(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSamePromisedExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSamePromisedExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
const _testEachSingleParameterAgainstSameRejectedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter: FirstParameter<FunctionType>): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(parameter)).rejects, expected, false
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
export const testEachSingleParameterAgainstSameRejectedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameRejectedExpectation(
        test.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSameRejectedExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameRejectedExpectation(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachSingleParameterAgainstSameRejectedExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameRejectedExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
const _testEachAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters: Parameters<FunctionType>) => {
            expectExpectedType<ReturnType<FunctionType>>(
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
export const testEachAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachAgainstSameExpectation(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: ReturnType<FunctionType> | TestSymbol,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
const _testEachPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters: Parameters<FunctionType>) =>
            expectExpectedType<
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
export const testEachPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseAgainstSameExpectation(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachPromiseAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachPromiseAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        /*
            eslint-disable @typescript-eslint/no-redundant-type-constituents
        */
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        /*
            eslint-enable @typescript-eslint/no-redundant-type-constituents
        */
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
const _testEachPromiseRejectionAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters: Parameters<FunctionType>): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, expected, false
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
export const testEachPromiseRejectionAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseRejectionAgainstSameExpectation(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachPromiseRejectionAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseRejectionAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachPromiseRejectionAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachPromiseRejectionAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
export default testEach

// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module testHelper */
'use strict'
/* !
    region header
    Copyright Torben Sickert (info["~at~"]torben.website) 16.12.2012

    License
    -------

    This library written by Torben Sickert stands under a creative commons
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
import {
    AnyFunction,
    FirstParameter,
    FunctionTestTuple,
    FunctionTestPromiseTuple,
    FunctionTestPromiseRejectionTuple,
    TestMatchers as Matchers,
    TestSymbol,
    ThenParameter,
    UnknownFunction, FunctionTestAgainstResolvedPromiseTuple,
    FunctionTestPromiseAgainstResolvedPromiseTuple,
    FunctionTestPromiseRejectionAgainstResolvedPromiseTuple
} from './type'

import {expect, test} from '@jest/globals'

import {represent} from './object'
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
        expect(givenResult as Result) as unknown as Matchers<Result> :
        givenResult as Matchers<Result>

    if (expected === TEST_DEFINED_SYMBOL)
        return result.toBeDefined()

    if (expected === TEST_UNDEFINED_SYMBOL)
        return result.not.toBeDefined()

    if (expected === TEST_THROW_SYMBOL)
        return result.toThrow()

    return result.toStrictEqual(expected)
}
// region testEach
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
            expected: ReturnType<FunctionType> | TestSymbol,
            ...parameters: Parameters<FunctionType>
        ) => {
            expectExpectedType<ReturnType<FunctionType>>(
                callback(...parameters) as Matchers<void> | void,
                expected
            )
        })
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
export const testEach = <FunctionType extends AnyFunction = UnknownFunction>(
    functionName: string,
    callback: FunctionType,
    ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
) => {
    _testEach(test.each, functionName, callback, ...functionTestTuple)
}
testEach.only = <FunctionType extends AnyFunction = UnknownFunction>(
    functionName: string,
    callback: FunctionType,
    ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
) => {
    _testEach(test.only.each, functionName, callback, ...functionTestTuple)
}
testEach.skip = <FunctionType extends AnyFunction = UnknownFunction>(
    functionName: string,
    callback: FunctionType,
    ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>
) => {
    _testEach(test.skip.each, functionName, callback, ...functionTestTuple)
}
// endregion
// region testEachAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEachAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<
            FunctionType
        >>
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        (async (
            expected: Promise<ReturnType<FunctionType> | TestSymbol>,
            ...parameters: Parameters<FunctionType>
        ) => {
            expectExpectedType<ReturnType<FunctionType>>(
                callback(...parameters) as Matchers<void> | void,
                await expected
            )
        })
    )
}
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
export const testEachAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<
            FunctionType
        >>
    ) => {
    _testEachAgainstResolvedPromise(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachAgainstResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<
            FunctionType
        >>
    ) => {
    _testEachAgainstResolvedPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachAgainstResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<
            FunctionType
        >>
    ) => {
    _testEachAgainstResolvedPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
// endregion
// region testEachResolvedPromise
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
const _testEachResolvedPromise = <
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
            expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
            ...parameters: Parameters<FunctionType>
        ): Promise<void> =>
            expectExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, expected, false)
        )
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
export const testEachResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachResolvedPromise(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachResolvedPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>
    ) => {
    _testEachResolvedPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
// endregion
// region testEachResolvedPromiseAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEachResolvedPromiseAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>
        >
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        (async (
            expected: (
                Promise<ThenParameter<ReturnType<FunctionType>> | TestSymbol>
            ),
            ...parameters: Parameters<FunctionType>
        ): Promise<void> =>
            expectExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, await expected, false)
        )
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
export const testEachResolvedPromiseAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>
        >
    ) => {
    _testEachResolvedPromiseAgainstResolvedPromise(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>
        >
    ) => {
    _testEachResolvedPromiseAgainstResolvedPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>
        >
    ) => {
    _testEachResolvedPromiseAgainstResolvedPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
// endregion
// region testEachRejectedPromise
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
const _testEachRejectedPromise = <
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
        )
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
export const testEachRejectedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachRejectedPromise(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachRejectedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachRejectedPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachRejectedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ) => {
    _testEachRejectedPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
// endregion
// region testEachRejectedPromiseAgainstResolvedPromise
/**
 * Tests each given test set (promise resolving to expected value follows by
 * various list of function parameters). It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 */
const _testEachRejectedPromiseAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<
                FunctionType
            >
        >
    ) => {
    tester([...functionTestTuple])(
        `%p === ${functionName}(%p, ...)`,
        (async (
            expected: Promise<Error | TestSymbol>,
            ...parameters: Parameters<FunctionType>
        ): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, await expected, false
            )
        )
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
export const testEachRejectedPromiseAgainstResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<
               FunctionType
            >
        >
    ) => {
    _testEachRejectedPromiseAgainstResolvedPromise(
        test.each, functionName, callback, ...functionTestTuple
    )
}
testEachRejectedPromiseAgainstResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<
                FunctionType
            >
        >
    ) => {
    _testEachRejectedPromiseAgainstResolvedPromise(
        test.only.each, functionName, callback, ...functionTestTuple
    )
}
testEachRejectedPromiseAgainstResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        ...functionTestTuple: Array<
            FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<
                FunctionType
            >
        >
    ) => {
    _testEachRejectedPromiseAgainstResolvedPromise(
        test.skip.each, functionName, callback, ...functionTestTuple
    )
}
// endregion
// region testEachSingleParameterAgainstSameExpectation
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
        expected: ReturnType<FunctionType> | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter: FirstParameter<FunctionType>) => {
            expectExpectedType<ReturnType<FunctionType>>(
                (expected === TEST_THROW_SYMBOL ?
                    () => callback(parameter) as unknown :
                    callback(parameter)
                ) as Matchers<void> | void,
                expected
            )
        })
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
        expected: ReturnType<FunctionType> | TestSymbol,
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
        expected: ReturnType<FunctionType> | TestSymbol,
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
        expected: ReturnType<FunctionType> | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachSingleParameterAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
// endregion
// region testEachResolvedPromiseWithSingleParameterAgainstSameExpectation
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
const _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        ((parameter: FirstParameter<FunctionType>) =>
            expectExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(parameter)).resolves, expected, false)
        )
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
export const
    testEachResolvedPromiseWithSingleParameterAgainstSameExpectation = <
        FunctionType extends AnyFunction = UnknownFunction
    >(
            functionName: string,
            callback: FunctionType,
            expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
            ...parameters: Array<FirstParameter<FunctionType>>
        ) => {
        _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(
            test.each, functionName, callback, expected, ...parameters
        )
    }
testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachResolvedPromiseWithSingleParameterAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachResolvedPromiseWithSingleParameterAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
// endregion
// region testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise
/**
 * Tests each given single parameter against same given promises resolving to
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
const _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Promise<
            TestSymbol | ThenParameter<ReturnType<FunctionType>>
        >,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        (async (parameter: FirstParameter<FunctionType>) =>
            expectExpectedType<
                Promise<ThenParameter<ReturnType<FunctionType>>>, Promise<void>
            >(expect(callback(parameter)).resolves, await expected, false)
        )
    )
}
/**
 * Tests each given single parameter against same given promises resolving to
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
export const
    testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise = <
        FunctionType extends AnyFunction = UnknownFunction
    >(
            functionName: string,
            callback: FunctionType,
            expected: Promise<
                TestSymbol | ThenParameter<ReturnType<FunctionType>>
            >,
            ...parameters: Array<FirstParameter<FunctionType>>
        ) => {
        _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(
            test.each, functionName, callback, expected, ...parameters
        )
    }
testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<
            TestSymbol | ThenParameter<ReturnType<FunctionType>>
        >,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<
            TestSymbol | ThenParameter<ReturnType<FunctionType>>
        >,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
// endregion
// region testEachRejectedPromiseWithSingleParameterAgainstSameExpectation
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
const _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation = <
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
        )
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
export const
    testEachRejectedPromiseWithSingleParameterAgainstSameExpectation = <
        FunctionType extends AnyFunction = UnknownFunction
    >(
            functionName: string,
            callback: FunctionType,
            expected: Error | TestSymbol,
            ...parameters: Array<FirstParameter<FunctionType>>
        ) => {
        _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(
            test.each, functionName, callback, expected, ...parameters
        )
    }
testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachRejectedPromiseWithSingleParameterAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachRejectedPromiseWithSingleParameterAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
// endregion
// region testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise
/**
 * Tests each given single parameter against same given promise resolving
 * expected value. It respects function signature to raise compile time errors
 * if given test set does not match given function signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param parameters - Additional first parameters to test given function with.
 */
const _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    tester([...parameters])(
        `${represent(expected)} === ${functionName}(%p)`,
        (async (parameter: FirstParameter<FunctionType>): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(parameter)).rejects, await expected, false
            )
        )
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
export const
    testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise = <
        FunctionType extends AnyFunction = UnknownFunction
    >(
            functionName: string,
            callback: FunctionType,
            expected: Promise<Error | TestSymbol>,
            ...parameters: Array<FirstParameter<FunctionType>>
        ) => {
        _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(
            test.each, functionName, callback, expected, ...parameters
        )
    }
testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(
        test.only.each, functionName, callback, expected, ...parameters
    )
}
testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...parameters: Array<FirstParameter<FunctionType>>
    ) => {
    _testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise(
        test.skip.each, functionName, callback, expected, ...parameters
    )
}
// endregion
// region testEachAgainstSameExpectation
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
        expected: ReturnType<FunctionType> | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters: Parameters<FunctionType>) => {
            expectExpectedType<ReturnType<FunctionType>>(
                (expected === TEST_THROW_SYMBOL ?
                    () => callback(...parameters) as unknown :
                    callback(...parameters)
                ) as Matchers<void> | void,
                expected
            )
        })
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
        expected: ReturnType<FunctionType> | TestSymbol,
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
        expected: ReturnType<FunctionType> | TestSymbol,
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
        expected: ReturnType<FunctionType> | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
// endregion
// region testEachResolvedPromiseAgainstSameExpectation
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
const _testEachResolvedPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        ((...parameters: Parameters<FunctionType>) =>
            expectExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, expected, false)
        )
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
export const testEachResolvedPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameExpectation(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachResolvedPromiseAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachResolvedPromiseAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
// endregion
// region testEachResolvedPromiseAgainstSameResolvedPromise
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
const _testEachResolvedPromiseAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Promise<
            TestSymbol | ThenParameter<ReturnType<FunctionType>>
        >,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        (async (...parameters: Parameters<FunctionType>) =>
            expectExpectedType<
                ThenParameter<ReturnType<FunctionType>>, Promise<void>
            >(expect(callback(...parameters)).resolves, await expected, false)
        )
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
export const testEachResolvedPromiseAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameResolvedPromise(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachResolvedPromiseAgainstSameResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameResolvedPromise(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachResolvedPromiseAgainstSameResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachResolvedPromiseAgainstSameResolvedPromise(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
// endregion
// region testEachRejectedPromiseAgainstSameExpectation
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
const _testEachRejectedPromiseAgainstSameExpectation = <
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
        )
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
export const testEachRejectedPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameExpectation(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachRejectedPromiseAgainstSameExpectation.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameExpectation(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachRejectedPromiseAgainstSameExpectation.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Error | TestSymbol,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameExpectation(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
// endregion
// region testEachRejectedPromiseAgainstSameResolvedPromise
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param tester - Underling testing function to use.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to Value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
const _testEachRejectedPromiseAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        tester: typeof test.each,
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    tester([...functionParameters])(
        `${represent(expected)} === ${functionName}(%p, ...)`,
        (async (...parameters: Parameters<FunctionType>): Promise<void> =>
            expectExpectedType<Error, Promise<void>>(
                expect(callback(...parameters)).rejects, await expected, false
            )
        )
    )
}
/**
 * Tests each given test set (various list of function parameters) against same
 * given promise resolving expected value. It respects function signature to
 * raise compile time errors if given test set does not match given function
 * signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Promise resolving to value to check each function call
 * return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 */
export const testEachRejectedPromiseAgainstSameResolvedPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameResolvedPromise(
        test.each, functionName, callback, expected, ...functionParameters
    )
}
testEachRejectedPromiseAgainstSameResolvedPromise.only = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameResolvedPromise(
        test.only.each, functionName, callback, expected, ...functionParameters
    )
}
testEachRejectedPromiseAgainstSameResolvedPromise.skip = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName: string,
        callback: FunctionType,
        expected: Promise<Error | TestSymbol>,
        ...functionParameters: Array<Parameters<FunctionType>>
    ) => {
    _testEachRejectedPromiseAgainstSameResolvedPromise(
        test.skip.each, functionName, callback, expected, ...functionParameters
    )
}
// endregion

export default testEach

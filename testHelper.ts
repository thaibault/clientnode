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
import {
    AnyFunction,
    FirstParameter,
    FunctionTestTuple,
    FunctionTestPromiseTuple,
    FunctionTestPromiseRejectionTuple,
    TestSymbol,
    ThenParameter,
    UnknownFunction
} from './type'
// endregion
export const DefinedSymbol = Symbol.for('clientnodeTestHelperDefined')
export const ThrowSymbol = Symbol.for('clientnodeTestHelperThrow')
export const UndefinedSymbol = Symbol.for('clientnodeTestHelperUndefined')
/**
 * Tests given result against given expectations. Respects special symbol
 * values.
 * @param givenResult - Target to compare expectation against.
 * @param expected - Expected result.
 * @param wrap - Indicates whether to wrap with an expect function call.
 *
 * @returns Nothing.
 */
export const testExpectedType = <Type = unknown>(
    givenResult:jest.JestMatchers<Type>|Type,
    expected:TestSymbol|Type,
    wrap = true
):Promise<void>|void => {
    const result:jest.JestMatchers<Type> = wrap ?
        expect(givenResult) :
        givenResult as jest.JestMatchers<Type>

    if (expected === DefinedSymbol)
        return result.toBeDefined()

    if (expected === ThrowSymbol)
        return result.toThrow()

    if (expected === UndefinedSymbol)
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
 *
 * @returns Nothing.
 */
export const testEach = <FunctionType extends AnyFunction = UnknownFunction>(
    functionName:string,
    callback:FunctionType,
    ...functionTestTuple:Array<FunctionTestTuple<FunctionType>>
):void =>
        test.each<FunctionTestTuple<FunctionType>>([...functionTestTuple])(
            `%p === ${functionName}(%p, ...)`,
            (
                expected:ReturnType<FunctionType>|TestSymbol,
                ...parameters:Parameters<FunctionType>
            ):void =>
                testExpectedType<ReturnType<FunctionType>>(
                    /* eslint-disable @typescript-eslint/no-unsafe-argument */
                    callback(...parameters), expected
                    /* eslint-enable @typescript-eslint/no-unsafe-argument */
                ) as void
        )
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 *
 * @returns Nothing.
 */
export const testEachPromise = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        ...functionTestTuple:Array<FunctionTestPromiseTuple<FunctionType>>
    ):void =>
        test.each<FunctionTestPromiseTuple<FunctionType>>(
            [...functionTestTuple]
        )(
            `%p === ${functionName}(%p, ...)`,
            (
                expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
                ...parameters:Parameters<FunctionType>
            ):Promise<void> =>
                testExpectedType<ThenParameter<ReturnType<FunctionType>>>(
                    expect(callback(...parameters)).resolves as
                        unknown as
                        jest.JestMatchers<ThenParameter<ReturnType<
                            FunctionType
                        >>>,
                    expected,
                    false
                ) as Promise<void>
        )
/**
 * Tests each given test set (expected value follows by various list of
 * function parameters). It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param functionTestTuple - Additional arrays of test sets to test given
 * function again.
 *
 * @returns Nothing.
 */
export const testEachPromiseRejection = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        ...functionTestTuple:Array<FunctionTestPromiseRejectionTuple<
            FunctionType
        >>
    ):void =>
        test.each<FunctionTestPromiseRejectionTuple<FunctionType>>(
            [...functionTestTuple]
        )(
            `%p === ${functionName}(%p, ...)`,
            (
                expected:Error|TestSymbol,
                ...parameters:Parameters<FunctionType>
            ):Promise<void> =>
                testExpectedType<Error>(
                    expect(callback(...parameters)).rejects as
                        unknown as
                        jest.JestMatchers<Error>,
                    expected,
                    false
                ) as Promise<void>
        )
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 *
 * @returns Nothing.
 */
export const testEachSingleParameterAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:ReturnType<FunctionType>|TestSymbol,
        ...parameters:Array<FirstParameter<FunctionType>>
    ):void =>
        test.each<FirstParameter<FunctionType>>([...parameters])(
            `${Tools.represent(expected)} === ${functionName}(%p)`,
            (parameter:FirstParameter<FunctionType>):void =>
                /* eslint-disable @typescript-eslint/no-unsafe-return */
                testExpectedType<ReturnType<FunctionType>>(
                    /* eslint-disable @typescript-eslint/no-unsafe-argument */
                    expected === ThrowSymbol ?
                    /* eslint-enable @typescript-eslint/no-unsafe-argument */
                        ():ReturnType<FunctionType> => callback(parameter) :
                        callback(parameter),
                    expected
                ) as void
                /* eslint-enable @typescript-eslint/no-unsafe-return */
        )
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 *
 * @returns Nothing.
 */
export const testEachSingleParameterAgainstSamePromisedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
        ...parameters:Array<FirstParameter<FunctionType>>
    ):void =>
        test.each<FirstParameter<FunctionType>>([...parameters])(
            `${Tools.represent(expected)} === ${functionName}(%p)`,
            (parameter:FirstParameter<FunctionType>):Promise<void> =>
                testExpectedType<ThenParameter<ReturnType<FunctionType>>>(
                    expect(callback(parameter)).resolves as
                        unknown as
                        jest.JestMatchers<ThenParameter<ReturnType<
                            FunctionType
                        >>>,
                    expected,
                    false
                ) as Promise<void>
        )
/**
 * Tests each given single parameter against same given expected value. It
 * respects function signature to raise compile time errors if given test set
 * does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param parameters - Additional first parameters to test given function with.
 *
 * @returns Nothing.
 */
export const testEachSingleParameterAgainstSameRejectedExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:Error|TestSymbol,
        ...parameters:Array<FirstParameter<FunctionType>>
    ):void =>
        test.each<FirstParameter<FunctionType>>([...parameters])(
            `${Tools.represent(expected)} === ${functionName}(%p)`,
            (parameter:FirstParameter<FunctionType>):Promise<void> =>
                testExpectedType<Error>(
                    expect(callback(parameter)).rejects as
                        unknown as
                        jest.JestMatchers<Error>,
                    expected,
                    false
                ) as Promise<void>
        )
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 *
 * @returns Nothing.
 */
export const testEachAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:ReturnType<FunctionType>|TestSymbol,
        ...functionParameters:Array<Parameters<FunctionType>>
    ):void =>
        test.each<Parameters<FunctionType>>([...functionParameters])(
            `${Tools.represent(expected)} === ${functionName}(%p, ...)`,
            (...parameters:Parameters<FunctionType>):void =>
                /* eslint-disable @typescript-eslint/no-unsafe-return */
                testExpectedType<ReturnType<FunctionType>>(
                    /* eslint-disable @typescript-eslint/no-unsafe-argument */
                    expected === ThrowSymbol ?
                    /* eslint-enable @typescript-eslint/no-unsafe-argument */
                        ():ReturnType<FunctionType> =>
                            callback(...parameters) :
                        callback(...parameters),
                    expected
                ) as void
                /* eslint-enable @typescript-eslint/no-unsafe-return */
        )
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 *
 * @returns Nothing.
 */
export const testEachPromiseAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:TestSymbol|ThenParameter<ReturnType<FunctionType>>,
        ...functionParameters:Array<Parameters<FunctionType>>
    ):void =>
        test.each<Parameters<FunctionType>>([...functionParameters])(
            `${Tools.represent(expected)} === ${functionName}(%p, ...)`,
            (...parameters:Parameters<FunctionType>):Promise<void> =>
                testExpectedType<ThenParameter<ReturnType<FunctionType>>>(
                    expect(callback(...parameters)).resolves as
                        unknown as
                        jest.JestMatchers<ThenParameter<ReturnType<
                            FunctionType
                        >>>,
                    expected,
                    false
                ) as Promise<void>
        )
/**
 * Tests each given test set (various list of function parameters) against same
 * given expected value. It respects function signature to raise compile time
 * errors if given test set does not match given function signature.
 * @param functionName - Function description to test.
 * @param callback - Function reference to test.
 * @param expected - Value to check each function call return value against.
 * @param functionParameters - Additional lists of parameters to test given
 * function again.
 *
 * @returns Nothing.
 */
export const testEachPromiseRejectionAgainstSameExpectation = <
    FunctionType extends AnyFunction = UnknownFunction
>(
        functionName:string,
        callback:FunctionType,
        expected:Error|TestSymbol,
        ...functionParameters:Array<Parameters<FunctionType>>
    ):void =>
        test.each<Parameters<FunctionType>>([...functionParameters])(
            `${Tools.represent(expected)} === ${functionName}(%p, ...)`,
            (...parameters:Parameters<FunctionType>):Promise<void> =>
                testExpectedType<Error>(
                    expect(callback(...parameters)).rejects as
                        unknown as
                        jest.JestMatchers<Error>,
                    expected,
                    false
                ) as Promise<void>
        )
export default testEach
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

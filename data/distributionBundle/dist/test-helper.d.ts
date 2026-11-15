import type { AnyFunction, FirstParameter, FunctionTestTuple, FunctionTestPromiseTuple, FunctionTestPromiseRejectionTuple, TestMatchers as Matchers, TestSymbol, ThenParameter, UnknownFunction, FunctionTestAgainstResolvedPromiseTuple, FunctionTestPromiseAgainstResolvedPromiseTuple, FunctionTestPromiseRejectionAgainstResolvedPromiseTuple } from './type';
export declare const TEST_DEFINED_SYMBOL: unique symbol;
export declare const TEST_THROW_SYMBOL: unique symbol;
export declare const TEST_UNDEFINED_SYMBOL: unique symbol;
/**
 * Tests given result against given expectations. Respects special symbol
 * values.
 * @param givenResult - Target to compare expectation against.
 * @param expected - Expected result.
 * @param wrap - Indicates whether to wrap with an expect function call.
 * @returns Nothing or a promise resolving to nothing.
 */
export declare const expectExpectedType: <Type = unknown, Result extends Promise<void> | void = void>(givenResult: Matchers<Result> | Result, expected: TestSymbol | Type, wrap?: boolean) => Result;
export declare function testEach<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>): void;
export declare namespace testEach {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestTuple<FunctionType>>) => void;
}
export declare function testEachAgainstResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<FunctionType>>): void;
export declare namespace testEachAgainstResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestAgainstResolvedPromiseTuple<FunctionType>>) => void;
}
export declare function testEachResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>): void;
export declare namespace testEachResolvedPromise {
    var only: (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>) => void) | (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>>) => void);
    var skip: (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>) => void) | (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>>) => void);
    var only: (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>) => void) | (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>>) => void);
    var skip: (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseTuple<FunctionType>>) => void) | (<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>>) => void);
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
export declare const testEachResolvedPromiseAgainstResolvedPromise: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseAgainstResolvedPromiseTuple<FunctionType>>) => void;
export declare function testEachRejectedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<FunctionType>>): void;
export declare namespace testEachRejectedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionTuple<FunctionType>>) => void;
}
export declare function testEachRejectedPromiseAgainstResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<FunctionType>>): void;
export declare namespace testEachRejectedPromiseAgainstResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, ...functionTestTuple: Array<FunctionTestPromiseRejectionAgainstResolvedPromiseTuple<FunctionType>>) => void;
}
export declare function testEachSingleParameterAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>): void;
export declare namespace testEachSingleParameterAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>) => void;
}
export declare function testEachResolvedPromiseWithSingleParameterAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...parameters: Array<FirstParameter<FunctionType>>): void;
export declare namespace testEachResolvedPromiseWithSingleParameterAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
}
export declare function testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...parameters: Array<FirstParameter<FunctionType>>): void;
export declare namespace testEachResolvedPromiseWithSingleParameterAgainstSameResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
}
export declare function testEachRejectedPromiseWithSingleParameterAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>): void;
export declare namespace testEachRejectedPromiseWithSingleParameterAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...parameters: Array<FirstParameter<FunctionType>>) => void;
}
export declare function testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...parameters: Array<FirstParameter<FunctionType>>): void;
export declare namespace testEachRejectedPromiseWithSingleParameterAgainstSameResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...parameters: Array<FirstParameter<FunctionType>>) => void;
}
export declare function testEachAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>): void;
export declare namespace testEachAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: ReturnType<FunctionType> | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>) => void;
}
export declare function testEachResolvedPromiseAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...functionParameters: Array<Parameters<FunctionType>>): void;
export declare namespace testEachResolvedPromiseAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: TestSymbol | ThenParameter<ReturnType<FunctionType>>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
}
export declare function testEachResolvedPromiseAgainstSameResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...functionParameters: Array<Parameters<FunctionType>>): void;
export declare namespace testEachResolvedPromiseAgainstSameResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<TestSymbol | ThenParameter<ReturnType<FunctionType>>>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
}
export declare function testEachRejectedPromiseAgainstSameExpectation<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>): void;
export declare namespace testEachRejectedPromiseAgainstSameExpectation {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Error | TestSymbol, ...functionParameters: Array<Parameters<FunctionType>>) => void;
}
export declare function testEachRejectedPromiseAgainstSameResolvedPromise<FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...functionParameters: Array<Parameters<FunctionType>>): void;
export declare namespace testEachRejectedPromiseAgainstSameResolvedPromise {
    var only: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
    var skip: <FunctionType extends AnyFunction = UnknownFunction>(functionName: string, callback: FunctionType, expected: Promise<Error | TestSymbol>, ...functionParameters: Array<Parameters<FunctionType>>) => void;
}
export default testEach;

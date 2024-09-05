// -*- coding: utf-8 -*-
/** @module type */
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
// region imports
import {Matchers} from 'expect'
import {Dirent as DirectoryEntry, Stats as FileStats} from 'fs'

import Tools, {BoundTools} from './Tools'
import {
    TEST_DEFINED_SYMBOL, TEST_THROW_SYMBOL, TEST_UNDEFINED_SYMBOL
} from './test-helper'
// endregion
// region exports
/// region helper
/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFunction = (...parameters: Array<any>) => any
/* eslint-enable @typescript-eslint/no-explicit-any */

export type Unpacked<T> = T extends Array<infer U> ?
    U :
    T extends (...parameters: Array<unknown>) => infer U ?
        U :
        T extends Promise<infer U> ?
            U :
            T

export type FirstParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[0]
export type SecondParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[1]
export type ThirdParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[2]
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ParametersExceptFirst<FunctionType> = FunctionType extends
    (parameter: any, ...additionalParameters: infer AdditionalParameters) =>
        any ?
            AdditionalParameters :
            []
/* eslint-enable @typescript-eslint/no-explicit-any */

export type FunctionTestTuple<FunctionType extends AnyFunction> =
    [ReturnType<FunctionType>, ...Parameters<FunctionType>]
export type FunctionTestPromiseTuple<FunctionType extends AnyFunction> =
    [ThenParameter<ReturnType<FunctionType>>, ...Parameters<FunctionType>]
export type FunctionTestPromiseRejectionTuple<
    FunctionType extends AnyFunction
> = [Error, ...Parameters<FunctionType>]

export type BaseSelector<T = unknown, E = unknown> =
    number|string|((target: T) => E)
export type Selector<T = unknown, E = unknown> =
    Array<BaseSelector<T, E>>|BaseSelector<T, E>

export type TestSymbol = (
    typeof TEST_DEFINED_SYMBOL |
    typeof TEST_THROW_SYMBOL |
    typeof TEST_UNDEFINED_SYMBOL
)

export type ThenParameter<Type> = Type extends PromiseLike<infer U> ? U : Type
export type ThenParameterRecursive<Type> =
    Type extends PromiseLike<infer U> ? ThenParameterRecursive<U> : Type

export type ValueOf<Type> = Type[keyof Type]

export type RecursiveNonNullable<Type> = {
    [Property in keyof Type]: Type[Property] extends Array<infer OtherType> ?
        Array<RecursiveNonNullable<OtherType>> :
        Type[Property] extends AnyFunction ?
            NonNullable<Type[Property]> :
            Type[Property] extends Mapping<unknown> ?
                RecursiveNonNullable<Type[Property]> :
                NonNullable<Type[Property]>
}
export type RecursivePartial<Type> =
    Partial<Type> |
    {
        [Property in keyof Type]?: Type[
            Property
        ] extends Array<infer OtherType> ?
            Array<RecursivePartial<OtherType>> :
            Type[Property] extends AnyFunction ?
                Partial<Type[Property]> :
                Type[Property] extends Mapping<unknown> ?
                    RecursivePartial<Type[Property]> :
                    Partial<Type[Property]>
    }

export type FileTraversionResult =
    false|null|Promise<false|null|undefined>|undefined

export type TestMatchers<T extends Promise<void>|void> =
    Matchers<T> & {not: Matchers<T>}
/// endregion
/// region native
export type ImportFunction =
    (id: string) => Promise<ReturnType<typeof require>>
export type HTMLItem = Comment|Document|HTMLElement|Text

export type Primitive = boolean|null|number|string|undefined
export type Mapping<V = string, K extends string = string> = {
    [key in K]: V
}
// NOTE: Mapping cannot be used here to avoid circular references.
export type PlainObject<V = Primitive, K extends string = string> =
    {[key in K]: Array<PlainObject<V, K>|V>|PlainObject<V, K>|V}

export interface ProxyHandler<T = unknown> {
    deleteProperty: (target: T, key: string|symbol) => boolean
    get: (target: T, key: string|symbol) => unknown
    has: (target: T, key: string|symbol) => boolean
    set: (target: T, key: string|symbol, value: unknown) => boolean
}
export type ProxyType<T = unknown> = T & {
    __revoke__?: () => void
    __target__: T
}

export interface CookieOptions {
    domain: string
    httpOnly: boolean
    minimal: boolean
    numberOfDaysUntilExpiration: number
    path: string
    sameSite: 'Lax'|'None'|'Strict'|''
    secure: boolean
}
//// region functions
export type UnknownFunction = (...parameters: Array<unknown>) => unknown
export type ArrayTransformer<T = unknown, R = unknown, P = unknown> = (
    data: Array<T>, ...additionalParameter: Array<P>
) => Array<R>

export type SynchronousProcedureFunction = (...parameters: Array<unknown>) =>
    void
export type AsynchronousProcedureFunction = (...parameters: Array<unknown>) =>
    Promise<void>
export type ProcedureFunction =
    AsynchronousProcedureFunction|SynchronousProcedureFunction

export type GetterFunction =
    (keyOrValue: unknown, key: string|symbol, target: unknown) => unknown
export type SetterFunction =
    (key: string|symbol, value: unknown, target: unknown) => unknown
//// endregion
/// endregion
/// region clientnode helper
export interface CheckReachabilityOptions {
    expectedIntermediateStatusCodes: Array<number>|number
    options: RequestInit
    pollIntervallInSeconds: number
    statusCodes: Array<number>|number
    timeoutInSeconds: number
    wait: boolean
}

export interface CompareOptions {
    compareBlobs: boolean
    deep: number
    exceptionPrefixes: Array<string>
    ignoreFunctions: boolean
    properties: Array<string>|null
    returnReasonIfNotEqual: boolean
}

export type Encoding =
    'ascii' |
    'base64' |
    'binary' |
    'hex' |
    'latin1' |
    'ucs2' |
    'ucs-2' |
    'utf8' |
    'utf16le' |
    'utf-8'
export interface File {
    directoryPath: string
    directoryEntry: DirectoryEntry|null
    error: Error|null
    name: string
    path: string
    stats: FileStats|null
}

export interface ProcessError extends Error {
    parameters: Array<unknown>
    returnCode: number
}

export type QueryParameters =
    Array<Array<string>|string> & Mapping<Array<string>|string>

export interface TimeoutPromise extends Promise<boolean> {
    clear: () => void
    timeoutID: NodeJS.Timeout
}

// NOTE: Mapping cannot be used here to avoid circular references.
export type ObjectMask = Array<string>|boolean|{[key: string]: ObjectMask}
export type NormalizedObjectMask = boolean|Record<string, ObjectMask>
export interface ObjectMaskConfiguration {
    exclude?: ObjectMask
    include?: ObjectMask
}

export interface EvaluateObject {
    __evaluate__: string
}
export interface ExecuteObject {
    __execute__: string
}
export type Evaluateable = EvaluateObject|ExecuteObject

export type EvaluatedObject<Type extends object> = {
    [Property in keyof Type]: (
        Type[Property] extends Evaluateable ?
            unknown :
            Type[Property] extends object ?
                EvaluatedObject<Type[Property]> :
                Type[Property]
        )
}
export type RecursiveEvaluateable<Type> = Evaluateable|{
    [Property in keyof Type]: (
        Evaluateable|(Type[Property] extends Array<infer OtherType> ?
            Array<RecursiveEvaluateable<OtherType>> :
            Type[Property] extends Mapping<unknown> ?
                RecursiveEvaluateable<Type[Property]> :
                Evaluateable|Type[Property]
        )
    )
}

export interface PaginateOptions {
    boundaryCount: number
    disabled: boolean
    hideNextButton: boolean
    hidePrevButton: boolean
    page: number
    pageSize?: null|number
    showFirstButton: boolean
    showLastButton: boolean
    siblingCount: number
    total: number
}
export interface Page {
    disabled: boolean
    page?: number
    selected: boolean
    type: PageType
}
export type PageType =
    'end-ellipsis'|'first'|'last'|'next'|'page'|'previous'|'start-ellipsis'

export interface Offset {
    left: number
    top: number
}
export interface Position extends Offset {
    bottom: number
    right: number
}

export type ProcessHandler =
    (returnCode: unknown, ...parameters: Array<unknown>) => void
export interface ProcessCloseReason {
    parameters: Array<unknown>
    reason: unknown
}
export type ProcessCloseCallback = (reason: ProcessCloseReason) => void
export type ProcessErrorCallback = (reason: ProcessError) => void

export type RelativePosition = 'above'|'below'|'in'|'left'|'right'

export type TemplateFunction<Type = string> =
    (...parameters: Array<unknown>) => Type
export interface CompilationResult<
    T = string, N extends Array<string> = Array<string>
> {
    error: null|string

    globalNames: Array<string>
    globalNamesUndefinedList: Array<undefined>
    originalScopeNames: N
    scopeNameMapping: {[key in N[number]]: string}
    scopeNames: Array<string>

    templateFunction: TemplateFunction<T>
}
export interface EvaluationResult<Type = string> {
    compileError: null|string
    error: null|string
    result: Type
    runtimeError: null|string
}

export type LockCallbackFunction<Type> =
    (description: string) => Promise<Type>|Type
/// endregion
/// region global scope
export type DomNodes<Type = string> =
    Mapping<Type> &
    {
        hideJavaScriptEnabled: Type
        parent?: Type
        showJavaScriptEnabled: Type
        window?: Type
    }
export type $DomNodes<TElement = HTMLElement> = DomNodes<$T<TElement>>

export interface Options<Type = string> {
    domNodes: DomNodes<Type>
    domNodeSelectorInfix: null|string
    domNodeSelectorPrefix: string
    logging: boolean
    name: string
}

export type $TStatic = JQueryStatic
export type $T<TElement = HTMLElement> = JQuery<TElement>
export interface $Global extends Omit<Window, 'document'> {
    Babel?: {transform: (code: string, configuration: PlainObject) => {
        code: string
    }}
    console: Console
    dataLayer?: Array<PlainObject>
    document?: Window['document']
    $: $TStatic
}
export interface ToolsFunction<TElement = HTMLElement> {
    class: typeof Tools

    (...parameters: Array<unknown>): Tools<TElement>
}
export interface BoundToolsFunction<TElement = HTMLElement> {
    (
        methodName: 'normalizedClassNames'|'normalizedStyles'
    ): BoundTools<TElement>
    (methodName: 'removeDirective', directiveName: string): $T<TElement>
    (methodName: 'style'): Mapping<number|string>
    (methodName: 'text'): string
    (...parameters: Array<unknown>): BoundTools<TElement>
}

declare global {
    interface JQuery<TElement = HTMLElement> {
        Tools: BoundToolsFunction<TElement>
    }
    interface JQueryStatic {
        document?: Document
        global: $Global
        location?: Location
        Tools: ToolsFunction
    }
}
/// endregion
export interface StringMarkOptions {
    marker: (
        ((foundWord: string, markedTarget: Array<unknown>) => unknown) |
        string
    )
    normalizer: (value: unknown) => string
    skipTagDelimitedParts: null|[string, string]
}
// endregion

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
import JQuery from 'jquery'
import {Dirent as DirectoryEntry, Stats as FileStats} from 'fs'

import Tools, {BoundTools} from './index'
import {DefinedSymbol, ThrowSymbol, UndefinedSymbol} from './testHelper'
// endregion
// region exports
// / region helper
/* eslint-disable @typescript-eslint/no-explicit-any */
export type AnyFunction = (..._parameters:Array<any>) => any
/* eslint-enable @typescript-eslint/no-explicit-any */

export type FirstParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[0]
export type SecondParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[1]
export type ThirdParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[2]
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ParametersExceptFirst<FunctionType> = FunctionType extends
    (_parameter:any, ..._additionalParameters:infer AdditionalParameters) =>
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
    number|string|((_target:T) => E)
export type Selector<T = unknown, E = unknown> =
    Array<BaseSelector<T, E>>|BaseSelector<T, E>

export type TestSymbol =
    typeof DefinedSymbol|typeof ThrowSymbol|typeof UndefinedSymbol

export type ThenParameter<Type> = Type extends PromiseLike<infer U> ? U : Type
export type ThenParameterRecursive<Type> =
    Type extends PromiseLike<infer U> ? ThenParameterRecursive<U> : Type

export type ValueOf<Type> = Type[keyof Type]

export type RecursiveNonNullable<Type> = {
    [Property in keyof Type]:Type[Property] extends (infer OtherType)[] ?
        RecursiveNonNullable<OtherType>[] :
        Type[Property] extends AnyFunction ?
            NonNullable<Type[Property]> :
            Type[Property] extends Mapping<unknown> ?
                RecursiveNonNullable<Type[Property]> :
                NonNullable<Type[Property]>
}
export type RecursivePartial<Type> =
    Partial<Type> |
    {
        [Property in keyof Type]?:Type[Property] extends (infer OtherType)[] ?
            RecursivePartial<OtherType>[] :
            Type[Property] extends AnyFunction ?
                Partial<Type[Property]> :
                Type[Property] extends Mapping<unknown> ?
                    RecursivePartial<Type[Property]> :
                    Partial<Type[Property]>
    }
// / endregion
// / region native
export type ImportFunction =
    (_id:string) => Promise<ReturnType<typeof require>>
export type HTMLItem = Comment|Document|HTMLElement|Text

export type Primitive = boolean|null|number|string|undefined
// NOTE: Mapping cannot be used here to avoid circular references.
export type PlainObject<Type = Primitive> =
    {[key:string]:Array<PlainObject<Type>|Type>|PlainObject<Type>|Type}

export interface ProxyHandler<T = unknown> {
    deleteProperty:(_target:T, _key:string|symbol) => boolean
    get:(_target:T, _key:string|symbol) => unknown
    has:(_target:T, _key:string|symbol) => boolean
    set:(_target:T, _key:string|symbol, _value:unknown) => boolean
}
export type ProxyType<T = unknown> = T & {
    __revoke__?:AnyFunction
    __target__:T
}
// // region functions
export type UnknownFunction = (..._parameters:Array<unknown>) => unknown
export type ArrayTransformer<T = unknown, R = unknown, P = unknown> = (
    _data:Array<T>, ..._additionalParameter:Array<P>
) => Array<R>

export type SynchronousProcedureFunction = (..._parameters:Array<unknown>) =>
    void
export type AsynchronousProcedureFunction = (..._parameters:Array<unknown>) =>
    Promise<void>
export type ProcedureFunction =
    AsynchronousProcedureFunction|SynchronousProcedureFunction

export type GetterFunction =
    (_keyOrValue:unknown, _key:string|symbol, _target:unknown) => unknown
export type SetterFunction =
    (_key:string|symbol, _value:unknown, _target:unknown) => unknown
// // endregion
// / endregion
// / region clientnode helper
export interface CheckReachabilityOptions {
    expectedIntermediateStatusCodes:Array<number>|number
    options:RequestInit
    pollIntervallInSeconds:number
    statusCodes:Array<number>|number
    timeoutInSeconds:number
    wait:boolean
}

export interface CompareOptions {
    compareBlobs:boolean
    deep:number
    exceptionPrefixes:Array<string>
    ignoreFunctions:boolean
    properties:Array<string>|null
    returnReasonIfNotEqual:boolean
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
    directoryPath:string
    directoryEntry:DirectoryEntry|null
    error:Error|null
    name:string
    path:string
    stats:FileStats|null
}

export interface ProcessError extends Error {
    parameters:Array<unknown>
    returnCode:number
}

export type QueryParameters =
    Array<Array<string>|string> & Mapping<Array<string>|string>

export interface TimeoutPromise extends Promise<boolean> {
    clear:() => void
    timeoutID:NodeJS.Timeout
}

export type Mapping<T=string> = {[key:string]:T}
// NOTE: Mapping cannot be used here to avoid circular references.
export type ObjectMask = boolean|{[key:string]:boolean|ObjectMask}
export interface ObjectMaskConfiguration {
    exclude?:ObjectMask
    include?:ObjectMask
}

export type Evaluateable = {__evaluate__:string}|{__execute__:string}
export type RecursiveEvaluateable<Type> = Evaluateable|{
    [Property in keyof Type]:(
        Evaluateable|(Type[Property] extends (infer OtherType)[] ?
            RecursiveEvaluateable<OtherType>[] :
            Type[Property] extends Mapping<unknown> ?
                RecursiveEvaluateable<Type[Property]> :
                Evaluateable|Type[Property]
        )
    )
}

export interface PaginateOptions {
    boundaryCount:number
    disabled:boolean
    hideNextButton:boolean
    hidePrevButton:boolean
    page:number
    pageSize?:null|number
    showFirstButton:boolean
    showLastButton:boolean
    siblingCount:number
    total:number
}
export interface Page {
    disabled:boolean
    page?:number
    selected:boolean
    type:PageType
}
export type PageType =
    'end-ellipsis'|'first'|'last'|'next'|'page'|'previous'|'start-ellipsis'

export interface Offset {
    left:number
    top:number
}
export interface Position extends Offset {
    bottom:number
    right:number
}

export type ProcessHandler =
    (_returnCode:unknown, ..._parameters:Array<unknown>) => void
export interface ProcessCloseReason {
    parameters:Array<unknown>
    reason:unknown
}
export type ProcessCloseCallback = (_reason:ProcessCloseReason) => void
export type ProcessErrorCallback = (_reason:ProcessError) => void

export type RelativePosition = 'above'|'below'|'in'|'left'|'right'

export type TemplateFunction<Type = string> =
    (..._parameters:Array<unknown>) => Type
export interface CompilationResult<Type = string> {
    error:null|string
    originalScopeNames:Array<string>
    scopeNameMapping:Mapping<string>
    scopeNames:Array<string>
    templateFunction:TemplateFunction<Type>
}
export interface EvaluationResult<Type = string> {
    compileError:null|string
    error:null|string
    result:Type
    runtimeError:null|string
}

export type LockCallbackFunction<Type = string> =
    (_description:string) => Promise<Type>|Type
// / endregion
// / region global scope
export type DomNodes<Type = string> =
    Mapping<Type> &
    {
        hideJavaScriptEnabled:Type
        parent?:Type
        showJavaScriptEnabled:Type
        window?:Type
    }
export type $DomNodes<TElement = HTMLElement> = DomNodes<$T<TElement>>

export interface Options<Type = string> {
    domNodes:DomNodes<Type>
    domNodeSelectorPrefix:string
    logging:boolean
    name:string
}

export type $TStatic = JQueryStatic
export type $T<TElement = HTMLElement> = JQuery<TElement>
export interface $Global extends Window {
    Babel?:{transform:(_code:string, _configuration:PlainObject) => {
        code:string
    }}
    console:Console
    dataLayer:Array<PlainObject>
    $:$TStatic
}
export interface ToolsFunction<TElement = HTMLElement> {
    class:typeof Tools

    (..._parameters:Array<unknown>):Tools<TElement>
}
export interface BoundToolsFunction<TElement = HTMLElement> {
    (_methodName:'normalizedClassNames'):BoundTools<TElement>
    (_methodName:'normalizedStyles'):BoundTools<TElement>
    (_methodName:'removeDirective', _directiveName:string):$T<TElement>
    (_methodName:'style'):Mapping<number|string>
    (..._parameters:Array<unknown>):BoundTools<TElement>
}

export interface StaticScope {
    document?:Document
    global:$Global
    location?:Location
    Tools:ToolsFunction
}
declare global {
    interface JQuery<TElement = HTMLElement> {
        Tools:BoundToolsFunction<TElement>
    }
    interface JQueryStatic {
        document?:Document
        global:$Global
        location?:Location
        Tools:ToolsFunction
    }
}
// / endregion
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

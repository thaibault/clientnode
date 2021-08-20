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
import {Stats} from 'fs'

import Tools from './index'
import {DefinedSymbol, ThrowSymbol, UndefinedSymbol} from './testHelper'
// endregion
// region exports
export type AnyFunction = (...parameters:Array<any>) => any
export type FirstParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[0]
export type SecondParameter<FunctionType extends AnyFunction> =
    Parameters<FunctionType>[1]
export type FunctionTestTuple<FunctionType extends AnyFunction> =
    [ReturnType<FunctionType>, ...Parameters<FunctionType>]
export type FunctionTestPromiseTuple<FunctionType extends AnyFunction> =
    [ThenParameter<ReturnType<FunctionType>>, ...Parameters<FunctionType>]
export type FunctionTestPromiseRejectionTuple<FunctionType extends AnyFunction> =
    [Error, ...Parameters<FunctionType>]
export type BaseSelector<T = unknown, E = unknown> =
    number|string|((target:T) => E)
export type Selector<T = unknown, E = unknown> =
    Array<BaseSelector<T, E>>|BaseSelector<T, E>
export type TestSymbol =
    typeof DefinedSymbol|typeof ThrowSymbol|typeof UndefinedSymbol
export type ThenParameter<Type> = Type extends PromiseLike<infer U> ? U : Type
export type ThenParameterRecursive<Type> =
    Type extends PromiseLike<infer U> ? ThenParameterRecursive<U> : Type
export type ToolsFunction<TElement = HTMLElement, LockType = string> =
    ((...parameter:Array<any>) => any|Tools<TElement, LockType>) &
    {class:typeof Tools}
export type ProxyType<T = unknown> = T & {
    __target__:T
}
export type StaticScope =
    ((parameter:any, ...additionalArguments:Array<any>) => any) &
    {
        document?:Document
        global:$Global
        location?:Location
        Tools:ToolsFunction
    }
// / region interfaces
export interface Scope<TElement = HTMLElement> extends Iterable<TElement> {
    Tools:ToolsFunction<TElement>
}
declare global {
    interface JQuery<TElement = HTMLElement> extends Scope<TElement> {}
    interface JQueryStatic extends StaticScope {}
}
export interface ProcessError extends Error {
    parameter:Array<any>
    returnCode:number
}
export interface TimeoutPromise extends Promise<boolean> {
    clear:() => void
    timeoutID:NodeJS.Timeout
}
export interface CompareOptions {
    compareBlobs:boolean
    deep:number
    exceptionPrefixes:Array<string>
    ignoreFunctions:boolean
    properties:Array<any>|null
    returnReasonIfNotEqual:boolean
}
// / endregion
export type HTMLItem = Comment|Document|HTMLElement|Text
export type $DomNode<TElement = HTMLElement> = JQuery<TElement>
export type $Function = JQueryStatic & StaticScope
export type $Global = typeof globalThis & {
    Babel?:{transform:(code:string, configuration:PlainObject) => {
        code:string
    }}
    console:Console
    dataLayer:Array<PlainObject>
    $:$Function
}
export type Encoding =
    'ascii'|'base64'|'binary'|'hex'|'latin1'|'ucs2'|'ucs-2'|'utf8'|'utf16le'|'utf-8'
export interface File {
    directoryPath:string
    error:Error|null
    name:string
    path:string
    stats:Stats|null
}
export type Mapping<T=string> = {[key:string]:T}
export type Noop = (...parameter:Array<any>) => any
// NOTE: Mapping cannot be used here to avoid circular references.
export type ObjectMask = boolean|{[key:string]:boolean|ObjectMask}
export interface ObjectMaskConfiguration {
    exclude?:ObjectMask
    include?:ObjectMask
}
export type RecursiveNonNullable<Type> = {
    [Property in keyof Type]:Type[Property] extends (infer OtherType)[] ?
        RecursiveNonNullable<OtherType>[] :
        Type[Property] extends Function ?
            NonNullable<Type[Property]> :
            Type[Property] extends object ?
                RecursiveNonNullable<Type[Property]> :
                NonNullable<Type[Property]>
}
export type RecursivePartial<Type> = {
    [Property in keyof Type]?:Type[Property] extends (infer OtherType)[] ?
        RecursivePartial<OtherType>[] :
        Type[Property] extends Function ?
            Partial<Type[Property]> :
            Type[Property] extends object ?
                RecursivePartial<Type[Property]> :
                Partial<Type[Property]>
}
export type Evaluateable = {__evaluate__:string}|{__execute__:string}
export type RecursiveEvaluateable<Type> = Evaluateable|{
    [Property in keyof Type]:
        Evaluateable|(Type[Property] extends (infer OtherType)[] ?
            RecursiveEvaluateable<OtherType>[] :
            Type[Property] extends object ?
                RecursiveEvaluateable<Type[Property]> :
                Evaluateable|Type[Property]
        )
}
export type Primitive = boolean|null|number|string|undefined
// NOTE: Mapping cannot be used here to avoid circular references.
export type PlainObject<Type = Primitive> = {
    [key:string]:Array<PlainObject<Type>|Type>|PlainObject<Type>|Type
}
export type GenericFunction = (...parameter:Array<unknown>) => unknown
export type SynchronousProcedureFunction = (...parameter:Array<unknown>) =>
    void
export type AsynchronousProcedureFunction = (...parameter:Array<unknown>) =>
    Promise<void>
export type ProcedureFunction =
    AsynchronousProcedureFunction|SynchronousProcedureFunction
export type GetterFunction = (keyOrValue:any, key:any, target:any) => any
export type SetterFunction = (key:any, value:any, target:any) => any
export interface Offset {
    left:number
    top:number
}
export type PageType = 'end-ellipsis'|'first'|'last'|'next'|'page'|'previous'|'start-ellipsis'
export interface Page {
    disabled:boolean
    page?:number
    selected:boolean
    type:PageType
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
export interface Position extends Offset {
    bottom:number
    right:number
}
export type ProcessHandler = (returnCode:any, ...parameter:Array<any>) => void
export interface ProcessCloseReason {
    parameter:Array<any>
    reason:any
}
export type ProcessCloseCallback = (reason:ProcessCloseReason) => void
export type ProcessErrorCallback = (reason:ProcessError) => void
export type RelativePosition = 'above'|'below'|'in'|'left'|'right'
export interface DomNodes<Type = string> {
    hideJavaScriptEnabled:Type
    parent?:Type
    showJavaScriptEnabled:Type
    window?:Type
}
export type $DomNodes = DomNodes<$DomNode>
export interface Options<Type = string> {
    domNodes:DomNodes<Type>
    domNodeSelectorPrefix:string
    logging:boolean
}
export interface ProxyHandler <T = unknown>{
    deleteProperty:(target:T, key:any) => boolean
    get:(target:T, key:string) => unknown
    has:(target:T, key:string) => boolean
    set:(target:T, key:string, value:unknown) => boolean
}
export type TemplateFunction = (...parameter:Array<any>) => any
export interface CompilationResult {
    error:null|string
    originalScopeNames:Array<string>
    scopeNameMapping:Mapping<string>
    scopeNames:Array<string>
    templateFunction:TemplateFunction
}
export interface EvaluationResult {
    compileError:null|string
    error:null|string
    result:any
    runtimeError:null|string
}
export type LockCallbackFunction<Type = string> = (description:string) =>
    Promise<Type>|Type
export type ValueOf<Type> = Type[keyof Type]
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

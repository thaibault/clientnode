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
export type FirstParameter<FunctionType extends GenericFunction> =
    Parameters<FunctionType>[0]
export type SecondParameter<FunctionType extends GenericFunction> =
    Parameters<FunctionType>[1]
export type FunctionTestTuple<FunctionType extends GenericFunction> =
    [ReturnType<FunctionType>, ...Parameters<FunctionType>]
export type FunctionTestPromiseTuple<FunctionType extends GenericFunction> =
    [ThenParameter<ReturnType<FunctionType>>, ...Parameters<FunctionType>]
export type FunctionTestPromiseRejectionTuple<FunctionType extends GenericFunction> =
    [Error, ...Parameters<FunctionType>]
export type TestSymbol =
    typeof DefinedSymbol|typeof ThrowSymbol|typeof UndefinedSymbol
export type ThenParameter<Type> = Type extends PromiseLike<infer U> ? U : Type
export type ThenParameterRecursive<Type> =
    Type extends PromiseLike<infer U> ? ThenParameterRecursive<U> : Type
export type ToolsFunction<TElement = HTMLElement> =
    ((...parameter:Array<any>) => any|Tools<TElement>) & {class:typeof Tools}
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
export type File = {
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
export type ObjectMaskConfiguration = {
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
export type GenericFunction = (...parameter:Array<any>) => any
export type ProcedureFunction = (...parameter:Array<any>) => Promise<void>|void
export type GetterFunction = (keyOrValue:any, key:any, target:any) => any
export type SetterFunction = (key:any, value:any, target:any) => any
export type Offset = {
    top:number
    left:number
}
export type PageType = 'end-ellipsis'|'first'|'last'|'next'|'page'|'previous'|'start-ellipsis'
export type Page = {
    disabled:boolean
    type:PageType
    page?:number
    selected:boolean
}
export type PaginateOptions = {
    boundaryCount:number
    disabled:boolean
    hideNextButton:boolean
    hidePrevButton:boolean
    page:number
    showFirstButton:boolean
    showLastButton:boolean
    siblingCount:number
    total:number
}
export type Position = Offset & {
    bottom:number
    right:number
}
export type ProcessHandler = (returnCode:any, ...parameter:Array<any>) => void
export type ProcessCloseReason = {
    parameter:Array<any>
    reason:any
}
export type ProcessCloseCallback = (reason:ProcessCloseReason) => void
export type ProcessErrorCallback = (reason:ProcessError) => void
export type RelativePosition = 'above'|'below'|'in'|'left'|'right'
export type DomNodes<Type = string> = {
    hideJavaScriptEnabled:Type
    parent?:Type
    showJavaScriptEnabled:Type
    window?:Type
}
export type $DomNodes = DomNodes<$DomNode>
export type Options<Type = string> = {
    domNodes:DomNodes<Type>
    domNodeSelectorPrefix:string
    logging:boolean
}
export type ProxyHandler = {
    deleteProperty:(target:any, key:any) => boolean
    get:(target:any, key:string) => any
    has:(target:any, key:string) => boolean
    set:(target:any, key:string, value:any) => boolean
}
export type TemplateFunction = (...parameter:Array<any>) => any
export type CompilationResult = {
    error:null|string
    originalScopeNames:Array<string>
    scopeNameMapping:Mapping<string>
    scopeNames:Array<string>
    templateFunction:TemplateFunction
}
export type EvaluationResult = {
    compileError:null|string
    error:null|string
    result:any
    runtimeError:null|string
}
export type LockCallbackFunction = (description:string) => Promise<any>|void
export type ValueOf<Type> = Type[keyof Type]
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

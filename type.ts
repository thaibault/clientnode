// #!/usr/bin/env node
// -*- coding: utf-8 -*-
/** @module clientnode */
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
// endregion
// region exports
export type StaticScope = JQueryStatic
export type ToolsFunction<TElement = HTMLElement> =
    ((...parameter:Array<any>) => any|Tools<TElement>) & {class:typeof Tools}
// / region interfaces
export interface Scope<TElement = HTMLElement> extends Iterable<TElement> {
    Tools:ToolsFunction<TElement>;
}
declare global {
    interface JQuery<TElement = HTMLElement> extends Scope<TElement> {}
}
export interface ProcessError extends Error {
    parameter:Array<any>;
    returnCode:number;
}
export interface TimeoutPromise extends Promise<boolean> {
    clear:() => void;
    timeoutID:number;
}
// / endregion
export type $DomNode<TElement = HTMLElement> = JQuery<TElement>
export type $Function =
    StaticScope &
    ((parameter:any, ...additionalArguments:Array<any>) => any) &
    {
        context?:Document;
        global:$Global;
        Tools:ToolsFunction;
    }
export type $Global = typeof globalThis & {console:Console;$:$Function}
export type Noop = (...parameter:Array<any>) => any
export type Encoding = 'ascii'|'base64'|'binary'|'hex'|'latin1'|'ucs2'|'ucs-2'|'utf8'|'utf16le'|'utf-8'
export type Mapping<T=string> = {[key:string]:T}
export type ObjectMask = boolean|{[key:string]:boolean|ObjectMask}
export type ObjectMaskConfiguration = {exclude?:ObjectMask;include?:ObjectMask}
export type Primitive = boolean|null|number|string|undefined
export type PlainObject<T=Primitive> = {
    [key:string]:Array<PlainObject<T>|T>|PlainObject<T>|T;
}
export type ProcedureFunction = (...parameter:Array<any>) => void|Promise<void>
export type File = {
    directoryPath:string;
    error:Error|null;
    name:string;
    path:string;
    stats:Stats|null;
}
export type GetterFunction = (keyOrValue:any, key:any, target:any) => any
export type SetterFunction = (key:any, value:any, target:any) => any

export type Position = {bottom:number;left:number;right:number;top:number}
export type ProcessHandler = (returnCode:any, ...parameter:Array<any>) => void
export type ProcessCloseReason = {parameter:Array<any>;reason:any}
export type ProcessCloseCallback = (reason:ProcessCloseReason) => void
export type ProcessErrorCallback = (reason:ProcessError) => void
export type RelativePosition = 'in'|'above'|'left'|'below'|'right'
export type Options = {
    domNode:{
        hideJavaScriptEnabled:string;
        showJavaScriptEnabled:string;
    };
    domNodeSelectorPrefix:string;
    logging:boolean;
}
export type ExtendedOptions = {
    domNode?:Mapping;
    domNodeSelectorPrefix?:string;
    logging?:boolean;
}
export type ProxyHandler = {
    deleteProperty:(target:any, key:any) => boolean;
    get:(target:any, key:string) => any;
    has:(target:any, key:string) => boolean;
    set:(target:any, key:string, value:any) => boolean;
}
export type LockCallbackFunction = (description:string) => Promise<any>|void
export type ValueOf<Type> = Type[keyof Type]
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

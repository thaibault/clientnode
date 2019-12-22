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
// region exports
export type PlainObject = {[key:string]:any}
export type ProcedureFunction = () => void|Promise<void>
export type File = {
    directoryPath:string;
    error:Error|null;
    name:string;
    path:string;
    stats:Object|null;
}
export type GetterFunction = (keyOrValue:any, key:any, target:any) => any
export type SetterFunction = (key:any, value:any, target:any) => any
export type Position = {
    top:number|undefined;
    left:number|undefined;
    right:number|undefined;
    bottom:number|undefined;
}
export type RelativePosition = 'in'|'above'|'left'|'below'|'right'
export type Options = {
    domNodeSelectorPrefix:string;
    [key:string]:any;
}
export type LockCallbackFunction = (description:string) =>
    Promise<any>|undefined
export type $DomNode = {
    [key:number|string]:DomNode;
    addClass(className:string):$DomNode;
    addBack():$DomNode;
    after(domNode:any):$DomNode;
    append(domNode:any):$DomNode;
    attr(attributeName:string|{[key:string]:string}, value:any):any;
    data(key:string, value:any):any;
    each():$DomNode;
    find(filter:any):$DomNode;
    height():number;
    is(selector:string):boolean;
    remove():$DomNode;
    removeAttr(attributeName:string):$DomNode;
    removeClass(className:string|Array<string>):$DomNode;
    submit():$DomNode;
    width():number;
    Tools(functionName:string, ...additionalArguments:Array<any>):any;
}
export type $Deferred<Type> = {
    always:() => $Deferred<Type>;
    resolve:() => $Deferred<Type>;
    done:() => $Deferred<Type>;
    fail:() => $Deferred<Type>;
    isRejected:() => $Deferred<Type>;
    isResolved:() => $Deferred<Type>;
    notify:() => $Deferred<Type>;
    notifyWith:() => $Deferred<Type>;
    progress:() => $Deferred<Type>;
    promise:() => $Deferred<Type>;
    reject:() => $Deferred<Type>;
    rejectWith:() => $Deferred<Type>;
    resolveWith:() => $Deferred<Type>;
    state:() => $Deferred<Type>;
    then:() => $Deferred<Type>;
}
// / region browser
export type DomNode = any
export type Location = {
    hash:string;
    search:string;
    pathname:string;
    port:string;
    hostname:string;
    host:string;
    protocol:string;
    origin:string;
    href:string;
    username:string;
    password:string;
    assign:Function;
    reload:Function;
    replace:Function;
    toString:() => string
}
export type Storage = {
    getItem(key:string):any;
    setItem(key:string, value:any):void;
    removeItem(key:string, value:any):void;
}
export type Window = {
    addEventListener:(type:string, callback:Function) => void;
    close:() => void;
    document:Object;
    location:Location;
    localStorage:Storage;
    sessionStorage:Storage;
    $:Object;
}
// / endregion
// endregion
// region vim modline
// vim: set tabstop=4 shiftwidth=4 expandtab:
// vim: foldmethod=marker foldmarker=region,endregion:
// endregion

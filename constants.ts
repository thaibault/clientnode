// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
/** @module constants */
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
import {Encoding} from 'clientnode/type'

export {Lock} from './Lock'
export {Semaphore} from './Semaphore'

export const DEFAULT_ENCODING:Encoding = 'utf8'
export const CloseEventNames = [
    'close', 'exit', 'SIGINT', 'SIGTERM', 'SIGQUIT', 'uncaughtException'
] as const
export const ConsoleOutputMethods = [
    'debug', 'error', 'info', 'log', 'warn'
] as const
export const ValueCopySymbol = Symbol.for('clientnodeValue')
export const IgnoreNullAndUndefinedSymbol =
    Symbol.for('clientnodeIgnoreNullAndUndefined')
// #!/usr/bin/env babel-node
// -*- coding: utf-8 -*-
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
import {expect, test} from '@jest/globals'

import {getProcessCloseHandler, handleChildProcess} from '../process'
import {NOOP} from '../constants'
import {optionalRequire} from '../context'
import {Duplex as DuplexType} from 'stream'
import {AnyFunction} from '../type'
import {ChildProcess as ChildProcessType} from 'child_process'

declare const TARGET_TECHNOLOGY:string

const {ChildProcess = null} =
    optionalRequire<typeof import('child_process')>('child_process') || {}

if (TARGET_TECHNOLOGY === 'node') {
    test('getProcessCloseHandler', () =>
        expect(typeof getProcessCloseHandler(NOOP, NOOP))
            .toStrictEqual('function')
    )
    test('handleChildProcess', ():void => {
        /**
         * A mockup duplex stream for mocking "stdout" and "strderr" process
         * connections.
         */
        class MockupDuplexStream extends (
            optionalRequire('stream') as typeof import('stream')
        ).Duplex implements DuplexType {
            /**
             * Triggers if contents from current stream should be red.
             */
            _read() {
                // Do nothing.
            }
            /**
             * Triggers if contents should be written on current stream.
             * @param chunk - The chunk to be written. Will always be a buffer
             * unless the "decodeStrings" option was set to "false".
             * @param encoding - Specifies encoding to be used as input data.
             * @param callback - Will be called if data has been written.
             */
            _write(
                chunk:Buffer|string, encoding:string, callback:AnyFunction
            ) {
                callback(new Error('test'))
            }
        }
        const stdoutMockupDuplexStream:MockupDuplexStream =
            new MockupDuplexStream()
        const stderrMockupDuplexStream:MockupDuplexStream =
            new MockupDuplexStream()
        const childProcess:ChildProcessType = new ChildProcess!()
        childProcess.stdout = stdoutMockupDuplexStream
        childProcess.stderr = stderrMockupDuplexStream

        expect(handleChildProcess(childProcess))
            .toStrictEqual(childProcess)
    })
}

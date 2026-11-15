import type { ChildProcess } from 'child_process';
import type { AnyFunction, ProcessCloseCallback, ProcessErrorCallback, ProcessHandler } from './type';
/**
 * Generates a one shot close handler which triggers given promise methods.
 * If a reason is provided it will be given as resolve target. An Error will be
 * generated if return code is not zero. The generated Error has a property
 * "returnCode" which provides corresponding process return code.
 * @param resolve - Promise's resolve function.
 * @param reject - Promise's reject function.
 * @param reason - Promise target if process has a zero return code.
 * @param callback - Optional function to call of process has successfully
 * finished.
 * @returns Process close handler function.
 */
export declare const getProcessCloseHandler: (resolve: ProcessCloseCallback, reject: ProcessErrorCallback, reason?: unknown, callback?: AnyFunction) => ProcessHandler;
/**
 * Forwards given child process communication channels to corresponding current
 * process communication channels.
 * @param childProcess - Child process meta data.
 * @returns Given child process meta data.
 */
export declare const handleChildProcess: (childProcess: ChildProcess) => ChildProcess;

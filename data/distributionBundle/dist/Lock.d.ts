import type { LockCallbackFunction, Mapping } from './type';
/**
 * Represents the lock state.
 * @property locks - Mapping of lock descriptions to their corresponding
 * callbacks.
 */
export declare class Lock<Type = string | undefined> {
    lock?: Array<LockCallbackFunction<Type>>;
    locks: Mapping<Array<LockCallbackFunction<Type>>>;
    /**
     * Initializes locks.
     * @param locks - Mapping of a lock description to callbacks for calling
     * when given lock should be released.
     */
    constructor(locks?: Mapping<Array<LockCallbackFunction<Type>>>);
    /**
     * Calling this method introduces a starting point for a critical area with
     * potential race conditions. The area will be bind to given description
     * string. So don't use same names for different areas.
     * @param description - A short string describing the critical areas
     * properties.
     * @param callback - A procedure which should only be executed if the
     * interpreter isn't in the given critical area. The lock description
     * string will be given to the callback function.
     * @param autoRelease - Release the lock after execution of given callback.
     * @returns Returns a promise which will be resolved after releasing lock.
     */
    acquire(description?: string, callback?: LockCallbackFunction<Type>, autoRelease?: boolean): Promise<Type>;
    /**
     * Calling this method causes the given critical area to be finished and
     * all functions given to "acquire()" will be executed in right order.
     * @param description - A short string describing the critical areas
     * properties.
     * @returns Returns the return (maybe promise resolved) value of the
     * callback given to the "acquire" method.
     */
    release(description?: string): Promise<Type | undefined>;
}
export default Lock;

import type { AnyFunction } from './type';
/**
 * Represents the semaphore state.
 * @property queue - List of waiting resource requests.
 * @property numberOfFreeResources - Number free allowed concurrent resource
 * uses.
 * @property numberOfResources - Number of allowed concurrent resource uses.
 */
export declare class Semaphore {
    queue: Array<AnyFunction>;
    numberOfResources: number;
    numberOfFreeResources: number;
    /**
     * Initializes number of resources.
     * @param numberOfResources - Number of resources to manage.
     */
    constructor(numberOfResources?: number);
    /**
     * Acquires a new resource and runs given callback if available.
     * @returns A promise which will be resolved if requested resource is
     * available.
     */
    acquire(): Promise<number>;
    /**
     * Releases a resource and runs a waiting resolver if there exists some.
     */
    release(): void;
}
export default Semaphore;

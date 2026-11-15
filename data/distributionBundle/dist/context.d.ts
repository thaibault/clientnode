import type { AnyFunction } from './type';
export declare let globalContext: Partial<typeof globalThis>;
export declare const setGlobalContext: (context: typeof globalThis) => void;
export declare const MAXIMAL_NUMBER_OF_ITERATIONS: {
    value: number;
};
export declare const NOOP: AnyFunction;
export declare const mockConsole: () => void;

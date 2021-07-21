declare type DebouncePromiseFunc<ArgT extends Array<unknown>, RetT> = (...args: ArgT) => Promise<RetT>;
export default function debouncePromise<ArgT extends Array<unknown>, RetT>(func: DebouncePromiseFunc<ArgT, RetT>, timeout: number): DebouncePromiseFunc<ArgT, RetT>;
export {};

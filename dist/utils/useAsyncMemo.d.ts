/**
 * Like useMemo, but supports async factory
 * @param factory The value factory
 * @param dependencies The dependencies of the memo
 * @returns The value from the factory OR null while the factory is still updating
 */
declare const useAsyncMemo: <T>(factory: () => T | Promise<T>, dependencies: unknown[]) => T | null;
export default useAsyncMemo;

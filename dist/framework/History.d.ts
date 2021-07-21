import { History } from "history";
/**
 * The History used by the react-router instance provided by the framework
 * Can be used to navigate programmatically
 */
export declare let FrameworkHistory: History<unknown>;
/**
 * The history can be overwritten for compatibility with other libraries
 * @param history The history to use
 */
export declare const setFrameworkHistory: (history: History) => void;

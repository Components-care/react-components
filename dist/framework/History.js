import { createBrowserHistory } from "history";
/**
 * The History used by the react-router instance provided by the framework
 * Can be used to navigate programmatically
 */
export var FrameworkHistory = createBrowserHistory();
/**
 * The history can be overwritten for compatibility with other libraries
 * @param history The history to use
 */
export var setFrameworkHistory = function (history) {
    FrameworkHistory = history;
};

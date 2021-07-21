var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useContext, useMemo, useState } from "react";
/**
 * Context for the dialog state
 */
export var DialogContext = React.createContext(undefined);
export var useDialogContext = function () {
    var ctx = useContext(DialogContext);
    if (!ctx)
        throw new Error("DialogContext is missing, did you forget to add Components-Care Framework or DialogContextProvider?");
    return ctx;
};
/**
 * Provides the application with an state to display an dialog
 */
var DialogContextProvider = function (props) {
    var _a = useState([]), dialogs = _a[0], setDialogs = _a[1];
    var pushDialog = useCallback(function (dialog) {
        setDialogs(function (prevValue) { return prevValue.concat([dialog]); });
    }, [setDialogs]);
    var popDialog = useCallback(function () {
        setDialogs(function (prevValue) {
            prevValue.pop();
            return __spreadArray([], prevValue);
        });
    }, [setDialogs]);
    var dialogActions = useMemo(function () { return [pushDialog, popDialog]; }, [pushDialog, popDialog]);
    return (React.createElement(React.Fragment, null,
        React.createElement(DialogContext.Provider, { value: dialogActions },
            React.createElement(React.Fragment, null, props.children),
            React.createElement(React.Fragment, null, dialogs.map(function (dialog, index) { return (React.createElement(React.Fragment, { key: index.toString() }, dialog)); })))));
};
export default React.memo(DialogContextProvider);

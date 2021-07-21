var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback } from "react";
import { Collapse } from "@material-ui/core";
import { useDataGridState, useDataGridStyles, } from "../DataGrid";
import Dialog from "./SettingsDialog";
var DataGridSettings = function (props) {
    var classes = useDataGridStyles();
    var _a = useDataGridState(), state = _a[0], setState = _a[1];
    var closeGridSettings = useCallback(function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { showSettings: false })); });
    }, [setState]);
    var toggleColumnLock = useCallback(function (evt) {
        var value = evt.target.value;
        setState(function (prevState) { return (__assign(__assign({}, prevState), { lockedColumns: prevState.lockedColumns.includes(value)
                ? prevState.lockedColumns.filter(function (s) { return s !== value; })
                : __spreadArray(__spreadArray([], prevState.lockedColumns), [value]) })); });
    }, [setState]);
    var toggleColumnVisibility = useCallback(function (evt) {
        var value = evt.target.value;
        setState(function (prevState) { return (__assign(__assign({}, prevState), { hiddenColumns: prevState.hiddenColumns.includes(value)
                ? prevState.hiddenColumns.filter(function (s) { return s !== value; })
                : __spreadArray(__spreadArray([], prevState.hiddenColumns), [value]) })); });
    }, [setState]);
    return (React.createElement(Collapse, { className: classes.contentOverlayCollapse, in: state.showSettings },
        React.createElement(Dialog, { columns: props.columns, closeGridSettings: closeGridSettings, toggleColumnLock: toggleColumnLock, toggleColumnVisibility: toggleColumnVisibility, lockedColumns: state.lockedColumns, hiddenColumns: state.hiddenColumns })));
};
export default React.memo(DataGridSettings);

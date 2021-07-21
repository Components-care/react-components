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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDataGridColumnsWidthState, useDataGridState, } from "../DataGrid";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { MultiGrid } from "react-virtualized/dist/commonjs/MultiGrid";
import Cell from "./Cell";
import { applyColumnWidthLimits } from "./ColumnHeader";
import { CenteredTypography, Loader } from "../../index";
import useCCTranslations from "../../../utils/useCCTranslations";
var SELECT_ROW_WIDTH = 57;
var Content = function (props) {
    var rowsPerPage = props.rowsPerPage, columns = props.columns, disableSelection = props.disableSelection;
    var t = useCCTranslations().t;
    var _a = useDataGridState(), state = _a[0], setState = _a[1];
    var _b = useDataGridColumnsWidthState(), columnWidth = _b[0], setColumnWidth = _b[1];
    var _c = useState(0), width = _c[0], setWidth = _c[1];
    var hoverState = useState(null);
    var dataViewRef = useRef(null);
    var pages = state.pages;
    var onSectionRendered = useCallback(function (props) {
        var pageStart = (props.rowStartIndex / rowsPerPage) | 0;
        var pageEnd = (props.rowStopIndex / rowsPerPage) | 0;
        if (pageStart !== pages[0] || pageEnd !== pages[1]) {
            setState(function (prevState) { return (__assign(__assign({}, prevState), { pages: [pageStart, pageEnd] })); });
        }
    }, [rowsPerPage, setState, pages]);
    var onResize = useCallback(function (size) {
        setWidth(size.width);
    }, []);
    useEffect(function () {
        if (width <= 0)
            return;
        if (state.initialResize)
            return;
        // only run on initial resize
        setColumnWidth(function (prevState) {
            // resolve all visible columns which don't have an fixed initial width
            var columnsToResize = Object.keys(prevState)
                .map(function (field) { return columns.find(function (col) { return col.field === field; }); })
                .filter(function (entry) { return entry; })
                .filter(function (entry) { return !state.hiddenColumns.includes(entry.field); })
                .filter(function (entry) { return !entry.width || !entry.width[2]; });
            // determine width used by visible columns
            var usedWidth = Object.entries(prevState)
                .filter(function (_a) {
                var field = _a[0];
                return columnsToResize.find(function (col) { return col.field === field; });
            })
                .reduce(function (a, b) { return a + b[1]; }, 0) +
                (disableSelection ? 0 : SELECT_ROW_WIDTH);
            var remainingWidth = width - usedWidth;
            if (remainingWidth <= 0)
                return prevState;
            // divide width over the visible columns while honoring limits
            var newState = __assign({}, prevState);
            var _loop_1 = function () {
                var resizePerColumn = remainingWidth / columns.length;
                var newRemainingWidth = 0;
                columnsToResize.forEach(function (col) {
                    if (!(col.field in newState))
                        return;
                    var newSize = applyColumnWidthLimits(col, newState[col.field] + resizePerColumn);
                    var widthDiff = newState[col.field] + resizePerColumn - newSize;
                    if (widthDiff !== 0) {
                        // remove the current column from the resizable list if we hit max-width
                        columnsToResize = columnsToResize.filter(function (altcol) { return altcol.field !== col.field; });
                    }
                    newRemainingWidth += widthDiff;
                    newState[col.field] = newSize;
                });
                remainingWidth = newRemainingWidth;
            };
            while (remainingWidth > 0) {
                _loop_1();
            }
            return newState;
        });
        setState(function (prev) { return (__assign(__assign({}, prev), { initialResize: true })); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.initialResize, width]);
    useEffect(function () {
        if (!dataViewRef.current)
            return;
        dataViewRef.current.recomputeGridSize();
    }, [columnWidth]);
    return (React.createElement(AutoSizer, { onResize: onResize }, function (_a) {
        var _b, _c;
        var width = _a.width, height = _a.height;
        return (React.createElement(MultiGrid, { ref: dataViewRef, columnCount: columns.length + (disableSelection ? 0 : 1), columnWidth: function (_a) {
                var _b, _c;
                var index = _a.index;
                return disableSelection
                    ? (_b = columnWidth[columns[index].field]) !== null && _b !== void 0 ? _b : 200
                    : index === 0
                        ? SELECT_ROW_WIDTH
                        : (_c = columnWidth[columns[index - 1].field]) !== null && _c !== void 0 ? _c : 200;
            }, rowCount: ((_b = state.rowsFiltered) !== null && _b !== void 0 ? _b : state.rowsTotal) + 1, rowHeight: function (_a) {
                var index = _a.index;
                return (index === 0 ? 32 : 57);
            }, width: width, height: height, cellRenderer: function (gridProps) { return (React.createElement(Cell, __assign({ columns: columns, hoverState: hoverState }, gridProps))); }, enableFixedColumnScroll: true, enableFixedRowScroll: true, fixedColumnCount: columns.filter(function (col) { return col.isLocked; }).length +
                (disableSelection ? 0 : 1), fixedRowCount: 1, hideTopRightGridScrollbar: true, hideBottomLeftGridScrollbar: true, styleTopLeftGrid: { overflow: "hidden" }, styleTopRightGrid: { overflow: "hidden" }, styleBottomLeftGrid: {
                overflow: "hidden",
                display: ((_c = state.rowsFiltered) !== null && _c !== void 0 ? _c : state.rowsTotal) === 0
                    ? "none"
                    : undefined,
            }, styleBottomRightGrid: { outline: "none" }, onSectionRendered: onSectionRendered, noContentRenderer: function () {
                return state.refreshData ? (React.createElement(Loader, null)) : state.dataLoadError ? (React.createElement(CenteredTypography, { variant: "h5" }, state.dataLoadError.message)) : (React.createElement(CenteredTypography, { variant: "h4" }, t("standalone.data-grid.content.no-data")));
            } }));
    }));
};
export default React.memo(Content);

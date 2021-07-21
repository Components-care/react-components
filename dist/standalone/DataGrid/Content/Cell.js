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
import { useDataGridProps, useDataGridState, useDataGridStyles, } from "../DataGrid";
import React, { useCallback } from "react";
import ColumnHeader from "./ColumnHeader";
import SelectRow, { isSelected } from "./SelectRow";
import { Skeleton } from "@material-ui/lab";
import { combineClassNames } from "../../../utils";
var Cell = function (props) {
    var _a;
    var classes = useDataGridStyles();
    var columns = props.columns, columnIndex = props.columnIndex, rowIndex = props.rowIndex;
    var _b = useDataGridProps(), onEdit = _b.onEdit, prohibitMultiSelect = _b.prohibitMultiSelect, onRowDoubleClick = _b.onRowDoubleClick, disableSelection = _b.disableSelection;
    var _c = useDataGridState(), state = _c[0], setState = _c[1];
    var _d = props.hoverState, hover = _d[0], setHover = _d[1];
    var id = ((_a = state.rows[props.rowIndex - 1]) === null || _a === void 0 ? void 0 : _a.id) || "undefined";
    var toggleSelection = useCallback(function () {
        if (id === "undefined")
            return;
        setState(function (prevState) { return (__assign(__assign({}, prevState), { selectedRows: !prevState.selectedRows.includes(id)
                ? prohibitMultiSelect
                    ? [id]
                    : __spreadArray(__spreadArray([], prevState.selectedRows), [id])
                : prevState.selectedRows.filter(function (s) { return s !== id; }) })); });
    }, [setState, id, prohibitMultiSelect]);
    var editRecord = useCallback(function () {
        if (id === "undefined")
            return;
        if (onRowDoubleClick)
            onRowDoubleClick(id);
        if (onEdit)
            onEdit(id);
    }, [id, onRowDoubleClick, onEdit]);
    var column = columns[columnIndex - (disableSelection ? 0 : 1)];
    var content = null;
    if (rowIndex === 0 && columnIndex === 0 && !disableSelection) {
        // empty
    }
    else if (rowIndex === 0) {
        // header
        content = React.createElement(ColumnHeader, { column: column });
    }
    else if (columnIndex === 0 && !disableSelection) {
        content = React.createElement(SelectRow, { id: id });
    }
    else {
        content =
            rowIndex - 1 in state.rows ? (state.rows[rowIndex - 1][column.field]) : (React.createElement(Skeleton, { variant: "text" }));
        // special handling for objects (Date, etc). use toString on them
        if (content &&
            typeof content === "object" &&
            !React.isValidElement(content) &&
            "toString" in content) {
            content = content.toString();
        }
    }
    var startHover = useCallback(function () {
        if (rowIndex === 0)
            return;
        setHover(rowIndex);
    }, [setHover, rowIndex]);
    var endHover = useCallback(function () {
        setHover(null);
    }, [setHover]);
    return (React.createElement("div", { style: props.style, onMouseEnter: startHover, onMouseLeave: endHover, onClick: toggleSelection, onDoubleClick: editRecord, className: combineClassNames([
            classes.cell,
            props.rowIndex !== 0 ? classes.dataCell : classes.headerCell,
            props.rowIndex !== 0 &&
                (props.rowIndex % 2 === 0 ? classes.rowEven : classes.rowOdd),
            props.rowIndex !== 0 && column && "column-" + column.field,
            (hover == rowIndex ||
                isSelected(state.selectAll, state.selectedRows, id)) &&
                classes.dataCellSelected,
        ]) }, content));
};
export default Cell;

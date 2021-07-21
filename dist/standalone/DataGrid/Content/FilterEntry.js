import React, { useCallback, useState } from "react";
import { Checkbox, FormControlLabel, Grid, IconButton, List, ListItem, ListItemText, MenuItem, Select, TextField, Tooltip, } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import FilterCombinator from "./FilterCombinator";
import { useDataGridProps, useDataGridStyles, } from "../DataGrid";
import { LocalizedKeyboardDatePicker } from "../../LocalizedDateTimePickers";
import useCCTranslations from "../../../utils/useCCTranslations";
var FilterEntry = function (props) {
    var _a, _b, _c, _d, _e, _f, _g;
    var onChange = props.onChange, depth = props.depth, close = props.close;
    var isFirstFilter = depth === 1;
    var t = useCCTranslations().t;
    var _h = useDataGridProps(), filterLimit = _h.filterLimit, isFilterSupported = _h.isFilterSupported;
    var _j = useState(""), enumFilterSearch = _j[0], setEnumFilterSearch = _j[1];
    var classes = useDataGridStyles();
    var maxDepth = filterLimit;
    var defaultFilterType = props.valueType === "string"
        ? "contains"
        : props.valueType === "enum"
            ? "inSet"
            : "equals";
    var filterType = ((_a = props.value) === null || _a === void 0 ? void 0 : _a.type) || defaultFilterType;
    var filterValue = ((_b = props.value) === null || _b === void 0 ? void 0 : _b.value1) || "";
    var filterValue2 = ((_c = props.value) === null || _c === void 0 ? void 0 : _c.value2) || "";
    var subFilterComboType = ((_d = props.value) === null || _d === void 0 ? void 0 : _d.nextFilterType) || "and";
    var subFilter = ((_e = props.value) === null || _e === void 0 ? void 0 : _e.nextFilter) || undefined;
    var checkSupport = function (dataType, filterType) {
        if (!isFilterSupported)
            return true;
        return isFilterSupported(dataType, filterType);
    };
    var resetFilter = useCallback(function () {
        onChange({ type: defaultFilterType, value1: "", value2: "" });
        close();
    }, [close, onChange, defaultFilterType]);
    var updateParent = function () {
        return onChange({
            type: filterType,
            value1: filterValue,
            value2: filterValue2,
            nextFilterType: subFilterComboType,
            nextFilter: subFilter,
        });
    };
    var onFilterTypeChange = function (event) {
        // clear magic value
        if (filterType === "empty" || filterType === "notEmpty") {
            filterValue = "";
        }
        filterType = event.target.value;
        // set magic value to mark filter as active
        if (filterType === "empty" || filterType === "notEmpty") {
            filterValue = filterType;
        }
        filterValue2 = "";
        updateParent();
    };
    var onFilterValueChange = function (event) {
        filterValue = event.target.value;
        if (!filterValue) {
            subFilterComboType = "and";
            subFilter = undefined;
        }
        updateParent();
    };
    var onFilterValueChangeDate = function (date) {
        if (!date) {
            filterValue = "";
            subFilterComboType = "and";
            subFilter = undefined;
        }
        else {
            filterValue = date.toISOString();
        }
        updateParent();
    };
    var onFilterValueChangeBool = function () {
        filterType = "equals";
        if (!filterValue) {
            filterValue = "true";
        }
        else if (filterValue === "true") {
            filterValue = "false";
        }
        else {
            filterValue = "";
        }
        updateParent();
    };
    var onFilterValueChangeEnumAll = function (_, checked) {
        if (checked) {
            filterValue = props.valueData
                .map(function (entry) { return entry.value; })
                .join(",");
        }
        else {
            filterValue = "";
        }
        updateParent();
    };
    var onFilterValueChangeEnum = function (evt, checked) {
        var currentlyChecked = filterValue.split(",");
        if (!checked) {
            currentlyChecked = currentlyChecked.filter(function (val) { return val !== evt.target.value; });
        }
        else {
            currentlyChecked.push(evt.target.value);
        }
        filterValue = currentlyChecked.join(",");
        updateParent();
    };
    var onFilterValue2Change = function (event) {
        filterValue2 = event.target.value;
        updateParent();
    };
    var onFilterValue2ChangeDate = function (date) {
        filterValue2 = date ? date.toISOString() : "";
        updateParent();
    };
    var onSubFilterTypeChange = function (value) {
        subFilterComboType = value;
        updateParent();
    };
    var onSubFilterChange = function (value) {
        subFilter = value;
        updateParent();
    };
    var filterTypeMenuItems = [
        checkSupport(props.valueType, "equals") && (React.createElement(MenuItem, { key: "equals", value: "equals" }, t("standalone.data-grid.content.filter-type.eq"))),
        checkSupport(props.valueType, "notEqual") && (React.createElement(MenuItem, { key: "notEqual", value: "notEqual" }, t("standalone.data-grid.content.filter-type.not-eq"))),
        checkSupport(props.valueType, "empty") && (React.createElement(MenuItem, { key: "empty", value: "empty" }, t("standalone.data-grid.content.filter-type.empty"))),
        checkSupport(props.valueType, "notEmpty") && (React.createElement(MenuItem, { key: "notEmpty", value: "notEmpty" }, t("standalone.data-grid.content.filter-type.not-empty"))),
    ];
    if (props.valueType === "string") {
        filterTypeMenuItems.push(checkSupport(props.valueType, "contains") && (React.createElement(MenuItem, { key: "contains", value: "contains" }, t("standalone.data-grid.content.filter-type.contains"))), checkSupport(props.valueType, "notContains") && (React.createElement(MenuItem, { key: "notContains", value: "notContains" }, t("standalone.data-grid.content.filter-type.not-contains"))), checkSupport(props.valueType, "startsWith") && (React.createElement(MenuItem, { key: "startsWith", value: "startsWith" }, t("standalone.data-grid.content.filter-type.starts-with"))), checkSupport(props.valueType, "endsWith") && (React.createElement(MenuItem, { key: "endsWith", value: "endsWith" }, t("standalone.data-grid.content.filter-type.ends-with"))));
    }
    else if (props.valueType === "number") {
        filterTypeMenuItems.push(checkSupport(props.valueType, "lessThan") && (React.createElement(MenuItem, { key: "lessThan", value: "lessThan" }, t("standalone.data-grid.content.filter-type.lt"))), checkSupport(props.valueType, "lessThanOrEqual") && (React.createElement(MenuItem, { key: "lessThanOrEqual", value: "lessThanOrEqual" }, t("standalone.data-grid.content.filter-type.lte"))), checkSupport(props.valueType, "greaterThan") && (React.createElement(MenuItem, { key: "greaterThan", value: "greaterThan" }, t("standalone.data-grid.content.filter-type.gt"))), checkSupport(props.valueType, "greaterThanOrEqual") && (React.createElement(MenuItem, { key: "greaterThanOrEqual", value: "greaterThanOrEqual" }, t("standalone.data-grid.content.filter-type.gte"))), checkSupport(props.valueType, "inRange") && (React.createElement(MenuItem, { key: "inRange", value: "inRange" }, t("standalone.data-grid.content.filter-type.in-range"))));
    }
    else if (props.valueType === "date") {
        filterTypeMenuItems.push(checkSupport(props.valueType, "lessThan") && (React.createElement(MenuItem, { key: "lessThan", value: "lessThan" }, t("standalone.data-grid.content.filter-type.lt-date"))), checkSupport(props.valueType, "lessThanOrEqual") && (React.createElement(MenuItem, { key: "lessThanOrEqual", value: "lessThanOrEqual" }, t("standalone.data-grid.content.filter-type.lte-date"))), checkSupport(props.valueType, "greaterThan") && (React.createElement(MenuItem, { key: "greaterThan", value: "greaterThan" }, t("standalone.data-grid.content.filter-type.gt-date"))), checkSupport(props.valueType, "greaterThanOrEqual") && (React.createElement(MenuItem, { key: "greaterThanOrEqual", value: "greaterThanOrEqual" }, t("standalone.data-grid.content.filter-type.gte-date"))), checkSupport(props.valueType, "inRange") && (React.createElement(MenuItem, { key: "inRange", value: "inRange" }, t("standalone.data-grid.content.filter-type.in-range-date"))));
    }
    filterTypeMenuItems = filterTypeMenuItems.filter(function (e) { return e; });
    return (React.createElement(React.Fragment, null,
        isFirstFilter && ((_f = props.value) === null || _f === void 0 ? void 0 : _f.value1) && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Grid, { container: true, justify: "flex-end", alignItems: "center" },
                React.createElement(Grid, { item: true },
                    React.createElement(Tooltip, { title: (_g = t("standalone.data-grid.content.reset-column-filter")) !== null && _g !== void 0 ? _g : "" },
                        React.createElement("span", null,
                            React.createElement(IconButton, { className: classes.filterClearBtn, onClick: resetFilter },
                                React.createElement(CloseIcon, null)))))))),
        (props.valueType === "string" ||
            props.valueType === "number" ||
            props.valueType === "date") && (React.createElement(React.Fragment, null,
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Select, { onChange: onFilterTypeChange, value: filterType, fullWidth: true }, filterTypeMenuItems)),
            filterType !== "empty" && filterType !== "notEmpty" && (React.createElement(Grid, { item: true, xs: 12 }, props.valueType === "date" ? (React.createElement(LocalizedKeyboardDatePicker, { value: filterValue === "" ? null : filterValue, onChange: onFilterValueChangeDate, fullWidth: true })) : (React.createElement(TextField, { value: filterValue, onChange: onFilterValueChange, fullWidth: true })))),
            filterType === "inRange" && (React.createElement(Grid, { item: true, xs: 12 }, props.valueType === "date" ? (React.createElement(LocalizedKeyboardDatePicker, { value: filterValue2 === "" ? null : filterValue2, onChange: onFilterValue2ChangeDate, fullWidth: true })) : (React.createElement(TextField, { value: filterValue2, onChange: onFilterValue2Change, fullWidth: true })))))),
        props.valueType === "boolean" && (React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { checked: filterValue === "true", onClick: onFilterValueChangeBool, indeterminate: !filterValue }), label: t("standalone.data-grid.content.bool-filter." +
                    (filterValue || "any")) }))),
        props.valueType === "enum" && (React.createElement(React.Fragment, null,
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(TextField, { value: enumFilterSearch, onChange: function (evt) {
                        return setEnumFilterSearch(evt.target.value);
                    }, placeholder: t("standalone.data-grid.content.set-filter.search"), fullWidth: true })),
            React.createElement(Grid, { item: true, xs: 12, className: classes.setFilterContainer },
                React.createElement(List, null,
                    React.createElement(ListItem, null,
                        React.createElement(Checkbox, { checked: filterValue ===
                                props.valueData
                                    .map(function (entry) { return entry.value; })
                                    .join(","), onChange: onFilterValueChangeEnumAll }),
                        React.createElement(ListItemText, null, t("standalone.data-grid.content.set-filter.select-all"))),
                    props.valueData
                        .filter(function (entry) {
                        return entry.getLabelText().toLowerCase().includes(enumFilterSearch);
                    })
                        .map(function (entry) { return (React.createElement(ListItem, { key: entry.value },
                        React.createElement(Checkbox, { value: entry.value, checked: filterValue.split(",").includes(entry.value), onChange: onFilterValueChangeEnum }),
                        React.createElement(ListItemText, null, (entry.getLabel || entry.getLabelText)()))); }))))),
        filterValue &&
            props.valueType !== "enum" &&
            props.valueType !== "boolean" &&
            (!maxDepth || depth <= maxDepth) && (React.createElement(React.Fragment, null,
            React.createElement(FilterCombinator, { value: subFilterComboType, onChange: onSubFilterTypeChange }),
            React.createElement(FilterEntry, { onChange: onSubFilterChange, valueType: props.valueType, valueData: props.valueData, value: subFilter, close: close, depth: depth + 1 })))));
};
export default React.memo(FilterEntry);

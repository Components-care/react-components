import React, { useCallback } from "react";
import { MultiSelectWithCheckBox } from "../..";
import { Checkbox, FormControlLabel, Grid, Typography, } from "@material-ui/core";
var GridMultiSelectFilter = function (props) {
    var label = props.label, options = props.options, selected = props.selected, onSelect = props.onSelect, dialog = props.dialog;
    var handleDialogCheckboxToggle = useCallback(function (evt, checked) {
        onSelect(checked
            ? selected.concat([evt.target.name])
            : selected.filter(function (entry) { return entry !== evt.target.name; }));
    }, [selected, onSelect]);
    var getSelected = useCallback(function (values) {
        return values
            .map(function (selected) { var _a; return (_a = options.find(function (option) { return option.value === selected; })) === null || _a === void 0 ? void 0 : _a.label; })
            .filter(function (selected) { return selected; })
            .join(", ");
    }, [options]);
    var handleSelectorChange = useCallback(function (event) {
        onSelect(event.target.value);
    }, [onSelect]);
    if (dialog) {
        return (React.createElement(Grid, { item: true, xs: 12, md: 6, lg: 3, container: true, spacing: 2 },
            label && (React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Typography, null, label))),
            options.map(function (option) { return (React.createElement(Grid, { item: true, xs: 12, key: option.value },
                React.createElement(FormControlLabel, { control: React.createElement(Checkbox, { name: option.value, checked: selected.includes(option.value), onChange: handleDialogCheckboxToggle }), label: option.label }))); })));
    }
    else {
        return (React.createElement(Grid, { item: true, xs: 4 },
            React.createElement(MultiSelectWithCheckBox, { label: label, options: options, values: selected, onChange: handleSelectorChange, renderValue: function (selected) { return getSelected(selected); }, fullWidth: true })));
    }
};
export default React.memo(GridMultiSelectFilter);

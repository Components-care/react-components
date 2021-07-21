import React, { useCallback } from "react";
import { SingleSelect } from "../..";
import { FormControl, FormControlLabel, Grid, Radio, RadioGroup, Typography, } from "@material-ui/core";
var GridSingleSelectFilter = function (props) {
    var _a;
    var label = props.label, options = props.options, selected = props.selected, onSelect = props.onSelect, dialog = props.dialog, autocompleteId = props.autocompleteId;
    var handleDialogRadioToggle = useCallback(function (_, value) {
        onSelect(value);
    }, [onSelect]);
    var handleSelectorChange = useCallback(function (value) {
        var _a;
        onSelect((_a = value === null || value === void 0 ? void 0 : value.value) !== null && _a !== void 0 ? _a : "");
    }, [onSelect]);
    if (dialog) {
        return (React.createElement(Grid, { item: true, xs: 12, md: 6, lg: 3 },
            React.createElement(FormControl, { component: "fieldset" },
                React.createElement(RadioGroup, { value: selected, onChange: handleDialogRadioToggle },
                    React.createElement(Grid, { item: true, xs: 12, container: true, spacing: 2 },
                        label && (React.createElement(Grid, { item: true, xs: 12 },
                            React.createElement(Typography, null, label))),
                        options.map(function (option) { return (React.createElement(Grid, { item: true, xs: 12, key: option.value },
                            React.createElement(FormControlLabel, { control: React.createElement(Radio, null), name: option.value, value: option.value, label: option.label }))); }))))));
    }
    else {
        return (React.createElement(Grid, { item: true, xs: 4 },
            React.createElement(FormControl, { component: "fieldset", fullWidth: true },
                React.createElement(SingleSelect, { label: label, disableSearch: true, disableClearable: true, onLoad: function () { return options; }, selected: (_a = options.find(function (option) { return option.value === selected; })) !== null && _a !== void 0 ? _a : options[0], onSelect: handleSelectorChange, autocompleteId: autocompleteId }))));
    }
};
export default React.memo(GridSingleSelectFilter);

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import { Select, withStyles, MenuItem, Checkbox, ListItemText, makeStyles, InputBase, InputLabel, } from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { cleanClassMap, makeThemeStyles } from "../../utils";
var useStyles = makeStyles(function (theme) {
    var _a, _b;
    return ({
        checkboxStyle: __assign({ borderRadius: 4, width: 16, height: 16, marginRight: 10 }, (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.selectorWithCheckbox) === null || _b === void 0 ? void 0 : _b.checkboxStyle),
    });
}, { name: "CcMultiSelectWithCheckBox" });
var MenuItemCustom = withStyles(function (theme) {
    var _a, _b, _c, _d;
    return ({
        selected: __assign(__assign({ backgroundColor: "white !important" }, (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.selectorWithCheckbox) === null || _b === void 0 ? void 0 : _b.itemSelectedStyle), { "&:hover": __assign({ backgroundColor: "rgba(0, 0, 0, 0.04) !important" }, (_d = (_c = theme.componentsCare) === null || _c === void 0 ? void 0 : _c.selectorWithCheckbox) === null || _d === void 0 ? void 0 : _d.itemSelectedHoverStyle) }),
    });
})(MenuItem);
var ListItemTextCustom = withStyles(function (theme) {
    var _a, _b;
    return ({
        primary: __assign({ fontSize: 13 }, (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.selectorWithCheckbox) === null || _b === void 0 ? void 0 : _b.itemTextPrimaryStyle),
    });
})(ListItemText);
var InputCustom = withStyles(function (theme) {
    var _a, _b, _c, _d, _e, _f;
    return ({
        root: __assign({}, (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.selectorWithCheckbox) === null || _b === void 0 ? void 0 : _b.inputRootStyle),
        input: __assign(__assign({ borderRadius: 4, position: "relative", backgroundColor: theme.palette.background.paper, border: "1px solid #ced4da", fontSize: 13, padding: 9, transition: theme.transitions.create(["border-color", "box-shadow"]) }, (_d = (_c = theme.componentsCare) === null || _c === void 0 ? void 0 : _c.selectorWithCheckbox) === null || _d === void 0 ? void 0 : _d.inputStyle), { "&:focus": __assign({ borderRadius: 4, borderColor: theme.palette.primary.main }, (_f = (_e = theme.componentsCare) === null || _e === void 0 ? void 0 : _e.selectorWithCheckbox) === null || _f === void 0 ? void 0 : _f.inputFocusStyle) }),
    });
})(InputBase);
var useSelectStyles = makeThemeStyles(function (theme) { var _a, _b; return (_b = (_a = theme === null || theme === void 0 ? void 0 : theme.componentsCare) === null || _a === void 0 ? void 0 : _a.selectorWithCheckbox) === null || _b === void 0 ? void 0 : _b.selectStyle; }, "CcMultiSelectWithCheckboxSelect");
var MultiSelectWithCheckBox = function (props) {
    var label = props.label, options = props.options, values = props.values, selectProps = __rest(props, ["label", "options", "values"]);
    var classes = useStyles(cleanClassMap(props, true, "checkboxStyle"));
    var selectClasses = useSelectStyles(cleanClassMap(props, false, "checkboxStyle"));
    return (React.createElement(React.Fragment, null,
        props.label && React.createElement(InputLabel, { shrink: true }, label),
        React.createElement(Select, __assign({}, selectProps, { multiple: true, displayEmpty: true, classes: selectClasses, value: values, input: React.createElement(InputCustom, null), IconComponent: ExpandMore, MenuProps: {
                anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                },
                transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                },
                getContentAnchorEl: null,
                PaperProps: {
                    style: {
                        marginTop: 5,
                        border: "1px solid #d3d4d5",
                    },
                },
            } }), options.map(function (option) {
            return (React.createElement(MenuItemCustom, { key: option.label, value: option.value },
                React.createElement(Checkbox, { checked: values.indexOf(option.value) > -1, className: classes.checkboxStyle }),
                React.createElement(ListItemTextCustom, { primary: option.label })));
        }))));
};
export default React.memo(MultiSelectWithCheckBox);

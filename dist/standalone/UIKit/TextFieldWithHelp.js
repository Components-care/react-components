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
import { TextField, IconButton, InputAdornment, } from "@material-ui/core";
import { Info as InfoIcon } from "@material-ui/icons";
import { InputLabelConfig, useInputStyles } from "./CommonStyles";
var TextFieldWithHelp = React.forwardRef(function TextFieldWithHelpInner(props, ref) {
    var _a, _b, _c, _d;
    var openInfo = props.openInfo, important = props.important, muiProps = __rest(props, ["openInfo", "important"]);
    var inputClasses = useInputStyles({ important: important });
    return (React.createElement(TextField, __assign({ ref: ref, InputLabelProps: InputLabelConfig }, muiProps, { InputProps: __assign(__assign({ classes: inputClasses }, muiProps.InputProps), { endAdornment: openInfo ? (React.createElement(React.Fragment, null,
                React.createElement(InputAdornment, { position: "end" }, (_c = (_b = (_a = muiProps.InputProps) === null || _a === void 0 ? void 0 : _a.endAdornment) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 :
                    _c.children,
                    React.createElement(IconButton, { onClick: openInfo },
                        React.createElement(InfoIcon, { color: "disabled" }))))) : ((_d = muiProps.InputProps) === null || _d === void 0 ? void 0 : _d.endAdornment) }) })));
});
export default React.memo(TextFieldWithHelp);

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
import React, { useCallback } from "react";
import TextFieldWithHelp from "../TextFieldWithHelp";
import { parseLocalizedNumber, useInputCursorFix } from "../../../utils";
import useCCTranslations from "../../../utils/useCCTranslations";
var CurrencyInput = function (props) {
    var value = props.value, onChange = props.onChange, currency = props.currency, muiProps = __rest(props, ["value", "onChange", "currency"]);
    var i18n = useCCTranslations().i18n;
    var valueFormatted = value !== null
        ? value.toLocaleString(i18n.language, {
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        : "";
    var _a = useInputCursorFix(valueFormatted), handleCursorChange = _a.handleCursorChange, cursorInputRef = _a.cursorInputRef;
    // on change handling
    var handleChange = useCallback(function (event) {
        handleCursorChange(event);
        if (!onChange)
            return;
        onChange(event, parseLocalizedNumber(event.target.value));
    }, [onChange, handleCursorChange]);
    // component rendering
    return (React.createElement("div", null,
        React.createElement(TextFieldWithHelp, __assign({}, muiProps, { value: valueFormatted, onChange: handleChange, inputProps: __assign(__assign({}, muiProps.inputProps), { ref: cursorInputRef }) }))));
};
export default React.memo(CurrencyInput);

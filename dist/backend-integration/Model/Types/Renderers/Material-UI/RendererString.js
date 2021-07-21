var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import React from "react";
import TypeString from "../../TypeString";
import { FormHelperText, TextField, Typography, } from "@material-ui/core";
/**
 * Renders a text field
 */
var RendererString = /** @class */ (function (_super) {
    __extends(RendererString, _super);
    function RendererString(props) {
        var _this = _super.call(this, props === null || props === void 0 ? void 0 : props.multiline) || this;
        _this.props = props;
        return _this;
    }
    RendererString.prototype.render = function (params) {
        var visibility = params.visibility, field = params.field, value = params.value, label = params.label, handleChange = params.handleChange, handleBlur = params.handleBlur, errorMsg = params.errorMsg;
        if (visibility.disabled)
            return React.createElement(React.Fragment, null);
        if (visibility.hidden) {
            return (React.createElement("input", { type: "hidden", name: field, value: value, readOnly: true, "aria-hidden": "true" }));
        }
        if (visibility.editable) {
            if (visibility.grid)
                throw new Error("Not supported");
            return (React.createElement(React.Fragment, null,
                React.createElement(TextField, __assign({ variant: this.multiline ? "outlined" : undefined, fullWidth: true }, this.props, { name: field, value: value, label: label, disabled: visibility.readOnly, required: visibility.required, onChange: function (evt) {
                        handleChange(evt.target.name, evt.target.value);
                    }, onBlur: handleBlur, error: !!errorMsg })),
                React.createElement(FormHelperText, { error: !!errorMsg }, errorMsg)));
        }
        return (React.createElement(Typography, { noWrap: visibility.grid },
            !visibility.grid && label + ": ",
            value));
    };
    return RendererString;
}(TypeString));
export default RendererString;

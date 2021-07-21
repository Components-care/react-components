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
import React from "react";
import { FormHelperText, Typography } from "@material-ui/core";
import TypeDateNullable from "../../TypeDateNullable";
import ccI18n from "../../../../../i18n";
import { DateTimeInput } from "../../../../../standalone";
import i18n from "../../../../../i18n";
/**
 * Renders Date with Date Selector
 */
var RendererDateTimeNullable = /** @class */ (function (_super) {
    __extends(RendererDateTimeNullable, _super);
    function RendererDateTimeNullable() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RendererDateTimeNullable.prototype.render = function (params) {
        var _this = this;
        var visibility = params.visibility, field = params.field, value = params.value, touched = params.touched, label = params.label, handleChange = params.handleChange, handleBlur = params.handleBlur, errorMsg = params.errorMsg, setFieldTouched = params.setFieldTouched;
        if (visibility.disabled)
            return React.createElement(React.Fragment, null);
        if (visibility.hidden) {
            return (React.createElement("input", { type: "hidden", name: field, value: value ? value.toISOString() : "", readOnly: true, "aria-hidden": "true" }));
        }
        if (visibility.editable) {
            if (visibility.grid)
                throw new Error("Not supported");
            return (React.createElement(React.Fragment, null,
                React.createElement(DateTimeInput, { name: field, value: value, label: label, disabled: visibility.readOnly, onChange: function (date) {
                        return handleChange(field, date ? date.toDate() : null);
                    }, onBlur: handleBlur, error: !!errorMsg, onError: function (error) {
                        _this.error = error
                            ? ccI18n.t("backend-integration.model.types.renderers.date.validation-error")
                            : "";
                        setFieldTouched(field, touched, true);
                    }, fullWidth: true, clearable: true }),
                React.createElement(FormHelperText, { error: !!errorMsg }, errorMsg)));
        }
        return (React.createElement(Typography, null,
            !visibility.grid && label + ": ",
            value
                ? value.toLocaleString(i18n.language)
                : ccI18n.t("backend-integration.model.types.renderers.date.not-set")));
    };
    return RendererDateTimeNullable;
}(TypeDateNullable));
export default RendererDateTimeNullable;

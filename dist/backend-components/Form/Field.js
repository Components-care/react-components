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
import React, { useCallback, useEffect, useMemo } from "react";
import { useFormContext } from "./Form";
import { getVisibility } from "../../backend-integration/Model/Visibility";
var Field = function (props) {
    var _a = useFormContext(), values = _a.values, errors = _a.errors, touched = _a.touched, setFieldValue = _a.setFieldValue, handleBlur = _a.handleBlur, initialValues = _a.initialValues, setFieldTouched = _a.setFieldTouched, setError = _a.setError, model = _a.model, markFieldMounted = _a.markFieldMounted, relations = _a.relations, readOnly = _a.readOnly;
    var fieldDef = model.fields[props.name];
    if (!fieldDef)
        throw new Error("Invalid field name specified: " + props.name);
    if (props.overrides) {
        if (typeof props.overrides === "function") {
            fieldDef = props.overrides(fieldDef);
        }
        else if (typeof props.overrides === "object") {
            Object.assign(fieldDef, props.overrides);
        }
    }
    var onChange = fieldDef.onChange, type = fieldDef.type, getRelationModel = fieldDef.getRelationModel;
    var setFieldValueHookWrapper = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function (field, value, shouldValidate) {
        if (onChange) {
            value = onChange(value, model, setFieldValue);
        }
        setFieldValue(field, value, shouldValidate);
    }, [setFieldValue, onChange, model]);
    var relationModel = useMemo(function () { return (getRelationModel ? getRelationModel() : undefined); }, [getRelationModel]);
    // mark field as mounted
    useEffect(function () {
        markFieldMounted(props.name, true);
        return function () { return markFieldMounted(props.name, false); };
    }, [markFieldMounted, props.name]);
    var name = props.name;
    var value = values[name];
    var initialValue = initialValues[name];
    var hasId = "id" in values && values["id"];
    var label = fieldDef.getLabel();
    var touch = touched[props.name] || false;
    var errorMsg = (touch && errors[props.name]) || null;
    var relationData = relations[props.name];
    var visibility = getVisibility(hasId ? fieldDef.visibility.edit : fieldDef.visibility.create, values);
    return useMemo(function () {
        return type.render({
            field: name,
            value: value,
            touched: touch,
            initialValue: initialValue,
            visibility: readOnly ? __assign(__assign({}, visibility), { readOnly: true }) : visibility,
            handleChange: setFieldValueHookWrapper,
            handleBlur: handleBlur,
            label: label,
            errorMsg: errorMsg,
            setError: setError,
            setFieldTouched: setFieldTouched,
            relationModel: relationModel,
            relationData: relationData,
        });
    }, [
        value,
        name,
        type,
        label,
        visibility,
        setFieldValueHookWrapper,
        handleBlur,
        errorMsg,
        setError,
        setFieldTouched,
        initialValue,
        touch,
        relationModel,
        relationData,
        readOnly,
    ]);
};
export default React.memo(Field);

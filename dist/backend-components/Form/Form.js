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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState, } from "react";
import Loader from "../../standalone/Loader";
import { isObjectEmpty } from "../../utils";
/**
 * Context which stores information about the current form so it can be used by fields
 */
export var FormContext = React.createContext(null);
export var useFormContext = function () {
    var ctx = useContext(FormContext);
    if (!ctx)
        throw new Error("Form Context not set. Not using form engine?");
    return ctx;
};
export var FormContextLite = React.createContext(null);
export var useFormContextLite = function () {
    var ctx = useContext(FormContextLite);
    if (!ctx)
        throw new Error("Form Context (Lite) not set. Not using form engine?");
    return ctx;
};
var loaderContainerStyles = {
    height: 320,
    width: 320,
    margin: "auto",
};
/**
 * Normalizes data for validation to ensure dirty flag matches user perception
 * @param data The data to normalize
 */
var normalizeValues = function (data) {
    if (typeof data !== "object")
        throw new Error("Only Record<string, unknown> supported");
    var normalizedData = {};
    Object.entries(data).forEach(function (_a) {
        var k = _a[0], v = _a[1];
        var shouldBeNulled = v === "" || (Array.isArray(v) && v.length === 0);
        normalizedData[k] = shouldBeNulled ? null : v;
    });
    return normalizedData;
};
var Form = function (props) {
    var model = props.model, id = props.id, children = props.children, onSubmit = props.onSubmit, customProps = props.customProps, onlyValidateMounted = props.onlyValidateMounted, onlySubmitMounted = props.onlySubmitMounted, readOnly = props.readOnly, nestedFormName = props.nestedFormName, nestedFormPreSubmitHandler = props.nestedFormPreSubmitHandler;
    var ErrorComponent = props.errorComponent;
    // custom fields - dirty state
    // v1
    var _a = useState(0), customDirtyCounter = _a[0], setCustomDirtyCounter = _a[1];
    // v2
    var _b = useState([]), customDirtyFields = _b[0], setCustomDirtyFields = _b[1];
    var setCustomFieldDirty = useCallback(function (field, dirty) {
        setCustomDirtyFields(function (prev) {
            var prevDirty = prev.includes(field);
            if (prevDirty == dirty)
                return prev; // no changes
            if (dirty)
                return __spreadArray(__spreadArray([], prev), [field]);
            else
                return prev.filter(function (candidate) { return candidate !== field; });
        });
    }, []);
    var customDirty = customDirtyCounter > 0 || customDirtyFields.length > 0;
    // custom fields - pre submit handlers
    var customValidationHandlers = useRef({});
    var setCustomValidationHandler = useCallback(function (field, handler) {
        customValidationHandlers.current[field] = handler;
    }, []);
    var removeCustomValidationHandler = useCallback(function (field) {
        delete customValidationHandlers.current[field];
    }, []);
    // custom fields - post submit handlers
    var postSubmitHandlers = useRef({});
    var setPostSubmitHandler = useCallback(function (field, handler) {
        postSubmitHandlers.current[field] = handler;
    }, []);
    var removePostSubmitHandler = useCallback(function (field) {
        delete postSubmitHandlers.current[field];
    }, []);
    // custom fields - state
    var customFieldState = useRef({});
    var getCustomState = useCallback(function (field) {
        return customFieldState.current[field];
    }, []);
    var setCustomState = useCallback(function (field, value) {
        customFieldState.current[field] =
            typeof value === "function"
                ? value(customFieldState.current[field])
                : value;
    }, []);
    // main form handling
    var _c = model.get(id || null), isLoading = _c.isLoading, error = _c.error, serverData = _c.data;
    var updateData = model.createOrUpdate().mutateAsync;
    var _d = useState(null), updateError = _d[0], setUpdateError = _d[1];
    var valuesRef = useRef({});
    var _e = useState({}), values = _e[0], setValues = _e[1];
    var _f = useState({}), touched = _f[0], setTouched = _f[1];
    var dirty = useMemo(function () {
        return serverData
            ? JSON.stringify(normalizeValues(values)) !==
                JSON.stringify(normalizeValues(serverData[0]))
            : false;
    }, [values, serverData]) || customDirty;
    var _g = useState({}), errors = _g[0], setErrors = _g[1];
    var _h = useState(false), submitting = _h[0], setSubmitting = _h[1];
    // main form handling - mounted state tracking
    var _j = useState(function () {
        return Object.fromEntries(Object.keys(model.fields).map(function (field) { return [field, false]; }));
    }), mountedFields = _j[0], setMountedFields = _j[1];
    var markFieldMounted = useCallback(function (field, mounted) {
        setMountedFields(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = mounted, _a)));
        });
    }, []);
    // main form handling - dispatch
    var validateForm = useCallback(function (values) {
        var errors = model.validate(values !== null && values !== void 0 ? values : valuesRef.current, id ? "edit" : "create", onlyValidateMounted
            ? Object.keys(mountedFields).filter(function (field) { return mountedFields[field]; })
            : undefined);
        Object.entries(customValidationHandlers.current).forEach(function (_a) {
            var name = _a[0], handler = _a[1];
            var customErrors = handler();
            for (var key in customErrors) {
                if (!Object.prototype.hasOwnProperty.call(customErrors, key))
                    continue;
                errors[name + "_" + key] = customErrors[key];
            }
        });
        return errors;
    }, [model, id, onlyValidateMounted, mountedFields]);
    var validateField = useCallback(function (field, value) {
        var _a;
        var errors = validateForm(value !== undefined
            ? __assign(__assign({}, valuesRef.current), (_a = {}, _a[field] = value, _a)) : undefined);
        setErrors(errors);
    }, [validateForm]);
    var setFieldTouched = useCallback(function (field, newTouched, validate) {
        if (newTouched === void 0) { newTouched = true; }
        if (validate === void 0) { validate = false; }
        setTouched(function (prev) {
            var _a;
            return prev[field] === newTouched
                ? prev
                : __assign(__assign({}, prev), (_a = {}, _a[field] = newTouched, _a));
        });
        if (validate)
            validateField(field);
    }, [validateField]);
    var setFieldValue = useCallback(function (field, value, validate) {
        if (validate === void 0) { validate = true; }
        setFieldTouched(field, true, false);
        valuesRef.current[field] = value;
        setValues(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
        if (validate)
            validateField(field, value);
    }, [validateField, setFieldTouched]);
    var resetForm = useCallback(function () {
        if (!serverData || !serverData[0])
            return;
        valuesRef.current = __assign({}, serverData[0]);
        setValues(valuesRef.current);
    }, [serverData]);
    var handleBlur = useCallback(function (evt) {
        var _a, _b;
        var fieldName = (_b = (_a = evt.target.name) !== null && _a !== void 0 ? _a : evt.target.getAttribute("data-name")) !== null && _b !== void 0 ? _b : evt.target.id;
        if (!fieldName) {
            // eslint-disable-next-line no-console
            console.error("[Components-Care] [Form] Handling on blur event for element without name. Please set form name via one of these attributes: name, data-name or id", evt);
            return;
        }
        setFieldTouched(fieldName);
    }, [setFieldTouched]);
    // init data structs after first load
    useEffect(function () {
        if (isLoading || !serverData || !serverData[0])
            return;
        valuesRef.current = __assign({}, serverData[0]);
        setValues(valuesRef.current);
        setTouched(Object.fromEntries(Object.keys(serverData[0]).map(function (key) { return [key, false]; })));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);
    // update data struct after background fetch
    useEffect(function () {
        if (isLoading || !serverData || !serverData[0])
            return;
        var newValues = __assign({}, valuesRef.current);
        var untouchedFields = Object.entries(touched)
            .filter(function (_a) {
            var touched = _a[1];
            return !touched;
        })
            .map(function (_a) {
            var field = _a[0];
            return field;
        });
        untouchedFields
            .filter(function (field) { return field in serverData[0]; })
            .forEach(function (field) {
            newValues[field] = serverData[0][field];
        });
        valuesRef.current = newValues;
        setValues(newValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [serverData]);
    // main form - submit handler
    var submitForm = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var validation, result, newValues_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setSubmitting(true);
                    setTouched(function (prev) {
                        return Object.fromEntries(Object.keys(prev).map(function (field) { return [field, true]; }));
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, 7, 8]);
                    validation = validateForm();
                    setErrors(validation);
                    if (!isObjectEmpty(validation)) {
                        // noinspection ExceptionCaughtLocallyJS
                        throw validation;
                    }
                    return [4 /*yield*/, updateData(onlySubmitMounted
                            ? Object.fromEntries(Object.entries(valuesRef.current).filter(function (_a) {
                                var key = _a[0];
                                return mountedFields[key];
                            }))
                            : valuesRef.current)];
                case 2:
                    result = _a.sent();
                    newValues_1 = onlySubmitMounted
                        ? Object.assign({}, valuesRef.current, result[0])
                        : Object.assign({}, result[0]);
                    valuesRef.current = newValues_1;
                    setTouched(function (prev) {
                        return Object.fromEntries(Object.keys(prev).map(function (field) { return [field, false]; }));
                    });
                    return [4 /*yield*/, Promise.all(Object.values(postSubmitHandlers.current).map(function (handler) {
                            return handler(newValues_1.id);
                        }))];
                case 3:
                    _a.sent();
                    // re-render after post submit handler, this way we avoid mounting new components before the form is fully saved
                    setValues(newValues_1);
                    if (!onSubmit) return [3 /*break*/, 5];
                    return [4 /*yield*/, onSubmit(newValues_1)];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_1 = _a.sent();
                    // don't use this for validation errors
                    if (e_1 instanceof Error) {
                        setUpdateError(e_1);
                    }
                    throw e_1;
                case 7:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [
        validateForm,
        updateData,
        onlySubmitMounted,
        postSubmitHandlers,
        onSubmit,
        mountedFields,
    ]);
    var handleSubmit = useCallback(function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        void submitForm();
    }, [submitForm]);
    // nested forms
    var parentFormContext = useContext(FormContext);
    if (nestedFormName && !parentFormContext)
        throw new Error("Nested form mode wanted, but no parent context found");
    // nested forms - loading
    useEffect(function () {
        if (!parentFormContext || !nestedFormName)
            return;
        var state = parentFormContext.getCustomState(nestedFormName);
        if (!state)
            return;
        valuesRef.current = state.values;
        setValues(state.values);
        setErrors(state.errors);
        setTouched(state.touched);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // nested forms - saving
    useEffect(function () {
        if (!parentFormContext || !nestedFormName)
            return;
        parentFormContext.setCustomState(nestedFormName, function () { return ({
            values: values,
            errors: errors,
            touched: touched,
        }); });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        values,
        errors,
        touched,
        parentFormContext === null || parentFormContext === void 0 ? void 0 : parentFormContext.setCustomState,
        nestedFormName,
    ]);
    // nested forms - validation and submit hook
    useEffect(function () {
        if (!parentFormContext || !nestedFormName)
            return;
        var validateNestedForm = function () {
            setTouched(function (prev) {
                return Object.fromEntries(Object.keys(prev).map(function (field) { return [field, true]; }));
            });
            return validateForm();
        };
        var submitNestedForm = function (id) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!nestedFormPreSubmitHandler) return [3 /*break*/, 2];
                        return [4 /*yield*/, nestedFormPreSubmitHandler(id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, submitForm()];
                }
            });
        }); };
        parentFormContext.setCustomValidationHandler(nestedFormName, validateNestedForm);
        parentFormContext.setPostSubmitHandler(nestedFormName, submitNestedForm);
        return function () {
            if (parentFormContext.onlyValidateMounted)
                parentFormContext.removeCustomValidationHandler(nestedFormName);
            if (parentFormContext.onlySubmitMounted)
                parentFormContext.removePostSubmitHandler(nestedFormName);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        parentFormContext === null || parentFormContext === void 0 ? void 0 : parentFormContext.setCustomValidationHandler,
        parentFormContext === null || parentFormContext === void 0 ? void 0 : parentFormContext.onlyValidateMounted,
        parentFormContext === null || parentFormContext === void 0 ? void 0 : parentFormContext.onlySubmitMounted,
        validateForm,
        nestedFormPreSubmitHandler,
        submitForm,
        nestedFormName,
    ]);
    // Debug Helper (for React Devtools)
    useCallback(function (onlyDirty) {
        /* eslint-disable no-console */
        if (!serverData) {
            console.log("Can't determine Dirty State, No server data present");
            return;
        }
        // normalize data
        var localData = normalizeValues(values);
        var remoteData = normalizeValues(serverData[0]);
        console.log("Form Dirty Flag State:");
        console.log("Form Dirty State:", JSON.stringify(localData) !== JSON.stringify(remoteData));
        console.log("Custom Dirty State:", customDirty);
        console.log("Custom Dirty Fields:", customDirtyFields);
        console.log("Custom Dirty Counter:", customDirtyCounter);
        console.log("Server Data:", remoteData);
        console.log("Form Data:", localData);
        Object.keys(localData).forEach(function (key) {
            var server = remoteData[key];
            var form = localData[key];
            var dirty = JSON.stringify(server) !== JSON.stringify(form);
            if (onlyDirty && !dirty)
                return;
            console.log("Dirty[", key, "]: ByRef:", server !== form, "ByJSON:", dirty);
        });
        /* eslint-enable no-console */
    }, [customDirty, customDirtyCounter, customDirtyFields, serverData, values]);
    // context and rendering
    var Children = useMemo(function () { return React.memo(children); }, [children]);
    var setError = useCallback(function (error) {
        setUpdateError(error);
    }, [setUpdateError]);
    var formContextData = useMemo(function () { return ({
        model: model,
        relations: serverData && serverData[1] ? serverData[1] : {},
        setError: setError,
        markFieldMounted: markFieldMounted,
        setCustomDirtyCounter: setCustomDirtyCounter,
        setCustomFieldDirty: setCustomFieldDirty,
        dirty: dirty,
        getCustomState: getCustomState,
        setCustomState: setCustomState,
        setPostSubmitHandler: setPostSubmitHandler,
        removePostSubmitHandler: removePostSubmitHandler,
        setCustomValidationHandler: setCustomValidationHandler,
        removeCustomValidationHandler: removeCustomValidationHandler,
        onlySubmitMounted: !!onlySubmitMounted,
        onlyValidateMounted: !!onlyValidateMounted,
        submitting: submitting,
        values: values,
        initialValues: serverData ? serverData[0] : {},
        touched: touched,
        errors: errors,
        setFieldValue: setFieldValue,
        handleBlur: handleBlur,
        setFieldTouched: setFieldTouched,
        resetForm: resetForm,
        validateForm: validateForm,
        parentFormContext: nestedFormName ? parentFormContext : null,
        readOnly: !!readOnly,
    }); }, [
        model,
        serverData,
        setError,
        markFieldMounted,
        dirty,
        getCustomState,
        setCustomState,
        setCustomFieldDirty,
        setPostSubmitHandler,
        removePostSubmitHandler,
        setCustomValidationHandler,
        removeCustomValidationHandler,
        onlySubmitMounted,
        onlyValidateMounted,
        submitting,
        values,
        touched,
        errors,
        setFieldValue,
        handleBlur,
        setFieldTouched,
        resetForm,
        validateForm,
        parentFormContext,
        nestedFormName,
        readOnly,
    ]);
    var formContextDataLite = useMemo(function () { return ({
        model: model,
        onlySubmitMounted: !!onlySubmitMounted,
        onlyValidateMounted: !!onlyValidateMounted,
        readOnly: !!readOnly,
    }); }, [model, onlySubmitMounted, onlyValidateMounted, readOnly]);
    if (isLoading || isObjectEmpty(values)) {
        return React.createElement(Loader, null);
    }
    var displayError = error || updateError;
    if (!serverData || serverData.length !== 2 || isObjectEmpty(serverData[0])) {
        // eslint-disable-next-line no-console
        console.error("[Components-Care] [FormEngine] Data is faulty", serverData ? JSON.stringify(serverData, undefined, 4) : null);
        throw new Error("Data is not present, this should never happen");
    }
    return (React.createElement(FormContextLite.Provider, { value: formContextDataLite },
        React.createElement(FormContext.Provider, { value: formContextData },
            React.createElement("form", { onSubmit: handleSubmit },
                displayError && React.createElement(ErrorComponent, { error: displayError }),
                isLoading ? (React.createElement("div", { style: loaderContainerStyles },
                    React.createElement(Loader, null))) : (React.createElement(Children, { isSubmitting: submitting, values: props.renderConditionally ? values : undefined, submit: submitForm, reset: resetForm, dirty: dirty, id: id, customProps: customProps }))))));
};
export default React.memo(Form);

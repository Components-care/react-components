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
import { Loader } from "../../standalone";
import { BackendMultiSelect } from "./index";
import useCrudSelect from "./useCrudSelect";
var CrudMultiSelect = function (props) {
    var ErrorComponent = props.errorComponent;
    var _a = useCrudSelect(props), loading = _a.loading, error = _a.error, loadError = _a.loadError, selected = _a.selected, initialRawData = _a.initialRawData, handleSelect = _a.handleSelect, modelToSelectorData = _a.modelToSelectorData;
    if (loading)
        return React.createElement(Loader, null);
    if (loadError)
        return React.createElement("span", null, loadError.message);
    return (React.createElement(React.Fragment, null,
        error && React.createElement(ErrorComponent, { error: error }),
        React.createElement(BackendMultiSelect, __assign({}, props, { selected: selected.map(function (entry) { return entry.value; }), onSelect: handleSelect, modelToSelectorData: modelToSelectorData, initialData: initialRawData }))));
};
export default React.memo(CrudMultiSelect);

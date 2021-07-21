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
import React, { useCallback, useMemo, useState } from "react";
import DataGrid from "../../standalone/DataGrid/DataGrid";
import { useDialogContext } from "../../framework";
import { ErrorDialog, showConfirmDialog } from "../../non-standalone";
import useCCTranslations from "../../utils/useCCTranslations";
var BackendDataGrid = function (props) {
    var model = props.model, enableDelete = props.enableDelete, enableDeleteAll = props.enableDeleteAll;
    var t = useCCTranslations().t;
    var pushDialog = useDialogContext()[0];
    var _a = useState(""), refreshToken = _a[0], setRefreshToken = _a[1];
    if (enableDeleteAll && !model.doesSupportAdvancedDeletion()) {
        throw new Error("Delete All functionality requested, but not provided by model backend connector");
    }
    var loadData = useCallback(function (params) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, meta;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, model.index(params)];
                case 1:
                    _a = _b.sent(), result = _a[0], meta = _a[1];
                    // eslint-disable-next-line no-debugger
                    return [2 /*return*/, {
                            rowsTotal: meta.totalRows,
                            rowsFiltered: meta.filteredRows,
                            rows: result.map(function (entry) {
                                return Object.fromEntries(Object.entries(entry).map(function (kvs) {
                                    var _a;
                                    var key = kvs[0], value = kvs[1];
                                    // we cannot render the ID, this will cause issues with the selection
                                    if (key === "id") {
                                        return kvs;
                                    }
                                    var field = model.fields[key];
                                    var id = "id" in entry && entry["id"];
                                    return [
                                        key,
                                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                                        ((_a = field === null || field === void 0 ? void 0 : field.type) === null || _a === void 0 ? void 0 : _a.render({
                                            field: key,
                                            value: value,
                                            touched: false,
                                            initialValue: value,
                                            label: field.getLabel(),
                                            visibility: Object.assign({}, field.visibility.overview, {
                                                hidden: false,
                                            }),
                                            /**
                                             * The onChange handler for editable input fields
                                             */
                                            handleChange: function (field, value) { return __awaiter(void 0, void 0, void 0, function () {
                                                var _a, _b;
                                                var _c;
                                                return __generator(this, function (_d) {
                                                    switch (_d.label) {
                                                        case 0:
                                                            if (!id)
                                                                throw new Error("ID not set!");
                                                            _b = (_a = model.connector).update;
                                                            return [4 /*yield*/, model.applySerialization((_c = {
                                                                        id: id
                                                                    },
                                                                    _c[field] = value,
                                                                    _c), "serialize", "overview")];
                                                        case 1: return [4 /*yield*/, _b.apply(_a, [_d.sent()])];
                                                        case 2:
                                                            _d.sent();
                                                            setRefreshToken(new Date().getTime().toString());
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            }); },
                                            handleBlur: function () {
                                                // this is unhandled in the data grid
                                            },
                                            errorMsg: null,
                                            setError: function () {
                                                throw new Error("Not implemented in Grid");
                                            },
                                            setFieldTouched: function () {
                                                throw new Error("Not implemented in Grid");
                                            },
                                        })) || null,
                                    ];
                                }));
                            }),
                        }];
            }
        });
    }); }, [model]);
    var deleteAdvanced = model.deleteAdvanced().mutateAsync;
    var deleteMultiple = model.deleteMultiple().mutateAsync;
    var handleDelete = useCallback(function (invert, ids, filter) { return __awaiter(void 0, void 0, void 0, function () {
        var e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, showConfirmDialog(pushDialog, {
                        title: t("backend-components.data-grid.delete.confirm-dialog.title"),
                        message: t("backend-components.data-grid.delete.confirm-dialog." +
                            (invert ? "messageInverted" : "message"), { NUM: ids.length }),
                        textButtonYes: t("backend-components.data-grid.delete.confirm-dialog.buttons.yes"),
                        textButtonNo: t("backend-components.data-grid.delete.confirm-dialog.buttons.no"),
                    })];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 7, , 8]);
                    if (!enableDeleteAll) return [3 /*break*/, 4];
                    return [4 /*yield*/, deleteAdvanced([invert, ids, filter])];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, deleteMultiple(ids)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    setRefreshToken(new Date().getTime().toString());
                    return [3 /*break*/, 8];
                case 7:
                    e_1 = _a.sent();
                    setRefreshToken(new Date().getTime().toString());
                    pushDialog(React.createElement(ErrorDialog, { title: t("backend-components.data-grid.delete.error-dialog.title"), message: t("backend-components.data-grid.delete.error-dialog.message", { ERROR: e_1.message }), buttons: [
                            {
                                text: t("backend-components.data-grid.delete.error-dialog.buttons.okay"),
                            },
                        ] }));
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    }); }, [pushDialog, t, enableDeleteAll, deleteAdvanced, deleteMultiple]);
    var addNewButtons = useMemo(function () {
        var _a;
        if (!props.additionalNewButtons)
            return props.onAddNew;
        if (!props.onAddNew)
            return props.additionalNewButtons;
        var result;
        if (typeof props.onAddNew === "function") {
            result = [
                {
                    label: (_a = t("standalone.data-grid.header.new")) !== null && _a !== void 0 ? _a : "",
                    onClick: props.onAddNew,
                },
            ];
        }
        else if (props.onAddNew) {
            result = props.onAddNew;
        }
        else {
            result = [];
        }
        result = result.concat(props.additionalNewButtons);
        return result;
    }, [props.additionalNewButtons, props.onAddNew, t]);
    return (React.createElement(DataGrid, __assign({}, props, { onAddNew: addNewButtons, onDelete: enableDelete ? handleDelete : undefined, loadData: loadData, columns: model.toDataGridColumnDefinition(), forceRefreshToken: "" + (props.forceRefreshToken || "undefined") + refreshToken, exporters: props.disableExport ? undefined : model.connector.dataGridExporters })));
};
export default React.memo(BackendDataGrid);

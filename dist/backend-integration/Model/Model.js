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
import { getVisibility } from "./Visibility";
import { useMutation, useQuery } from "react-query";
import { ModelDataStore } from "../index";
import queryCache from "../Store";
var Model = /** @class */ (function () {
    /**
     * Creates a new model
     * @param name A unique name for the model (modelId)
     * @param model The actual model definition
     * @param connector A backend connector
     * @param cacheKeys Optional cache keys
     * @param cacheOptions Optional cache options
     */
    function Model(name, model, connector, cacheKeys, cacheOptions) {
        this.modelId = name;
        this.fields = model;
        this.connector = connector;
        this.cacheKeys = cacheKeys;
        this.cacheOptions = cacheOptions !== null && cacheOptions !== void 0 ? cacheOptions : {
            staleTime: 30000,
        };
    }
    /**
     * Loads a list of data entries by the given search params
     * @param params The search params
     */
    Model.prototype.index = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rawData, meta;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.connector.index(params, this)];
                    case 1:
                        _a = _b.sent(), rawData = _a[0], meta = _a[1];
                        return [4 /*yield*/, Promise.all(rawData.map(function (data) {
                                return _this.applySerialization(data, "deserialize", "overview");
                            }))];
                    case 2: 
                    // eslint-disable-next-line no-debugger
                    return [2 /*return*/, [
                            _b.sent(),
                            meta
                        ]];
                }
            });
        });
    };
    /**
     * Gets the react-query cache key for this model
     * @param id The record id
     */
    Model.prototype.getReactQueryKey = function (id) {
        return [this.modelId, { id: id }, this.cacheKeys];
    };
    /**
     * Provides a react-query useQuery hook for the given data id
     * @param id The data record id
     */
    Model.prototype.get = function (id) {
        var _this = this;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useQuery(this.getReactQueryKey(id), function () { return _this.getRaw(id); }, this.cacheOptions);
    };
    /**
     * Provides cached access for the given data id
     * @param id The data record id or null to obtain the default values
     */
    Model.prototype.getCached = function (id) {
        var _this = this;
        return queryCache.fetchQuery(this.getReactQueryKey(id), function () { return _this.getRaw(id); }, this.cacheOptions);
    };
    /**
     * Provides uncached access for the given data id
     * @param id The data record id or null to obtain the default values
     */
    Model.prototype.getRaw = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getDefaultValues()];
                    case 1: return [2 /*return*/, [_a.sent(), {}]];
                    case 2: return [4 /*yield*/, this.connector.read(id, this)];
                    case 3:
                        rawData = _a.sent();
                        return [2 /*return*/, this.deserializeResponse(rawData)];
                }
            });
        });
    };
    /**
     * Deserializes the given ModelGetResponse
     * @param rawData The data to deserialize
     * @private
     */
    Model.prototype.deserializeResponse = function (rawData) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.applySerialization(rawData[0], "deserialize", "edit")];
                    case 1:
                        _a = [
                            _d.sent()
                        ];
                        _c = (_b = Object).fromEntries;
                        return [4 /*yield*/, Promise.all(Object.entries(rawData[1]).map(function (keyValue) { return __awaiter(_this, void 0, void 0, function () {
                                var fieldName, values, refModel, _a, _b;
                                var _c;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            fieldName = keyValue[0];
                                            values = keyValue[1];
                                            refModel = (_c = this.fields[fieldName]) === null || _c === void 0 ? void 0 : _c.getRelationModel;
                                            if (!refModel) {
                                                // eslint-disable-next-line no-console
                                                console.warn("[Components-Care] [Model] Backend connector supplied related data, but no model is defined for this relationship (relationship name = " +
                                                    fieldName +
                                                    "). Data will be ignored.");
                                            }
                                            _a = [fieldName];
                                            if (!refModel) return [3 /*break*/, 2];
                                            return [4 /*yield*/, Promise.all(values.map(function (value) {
                                                    return refModel().applySerialization(value, "deserialize", "edit");
                                                }))];
                                        case 1:
                                            _b = _d.sent();
                                            return [3 /*break*/, 3];
                                        case 2:
                                            _b = null;
                                            _d.label = 3;
                                        case 3: return [2 /*return*/, _a.concat([
                                                _b
                                            ])];
                                    }
                                });
                            }); }))];
                    case 2: return [2 /*return*/, _a.concat([
                            _c.apply(_b, [_d.sent()])
                        ])];
                }
            });
        });
    };
    /**
     * Provides a react-query useMutation hook for creation or updates to an data entry
     */
    Model.prototype.createOrUpdate = function () {
        var _this = this;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMutation(this.modelId + "-create-or-update", function (values) { return __awaiter(_this, void 0, void 0, function () {
            var update, serializedValues, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        update = !!("id" in values && values.id);
                        return [4 /*yield*/, this.applySerialization(values, "serialize", update ? "edit" : "create")];
                    case 1:
                        serializedValues = _c.sent();
                        if (!update) return [3 /*break*/, 3];
                        _a = this.deserializeResponse;
                        return [4 /*yield*/, this.connector.update(serializedValues, this)];
                    case 2: return [2 /*return*/, _a.apply(this, [_c.sent()])];
                    case 3:
                        delete serializedValues["id"];
                        _b = this.deserializeResponse;
                        return [4 /*yield*/, this.connector.create(serializedValues, this)];
                    case 4: return [2 /*return*/, _b.apply(this, [_c.sent()])];
                }
            });
        }); }, {
            onSuccess: function (data) {
                ModelDataStore.setQueryData(_this.getReactQueryKey(data[0].id), data);
            },
        });
    };
    /**
     * Provides a react hook to delete a given record id
     */
    Model.prototype.delete = function () {
        var _this = this;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMutation(this.modelId + "-delete", function (id) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connector.delete(id, this)];
            });
        }); }, {
            onSuccess: function (data, id) {
                ModelDataStore.removeQueries(_this.getReactQueryKey(id));
            },
        });
    };
    /**
     * Provides a react hook to delete multiple records at once
     */
    Model.prototype.deleteMultiple = function () {
        var _this = this;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMutation(this.modelId + "-delete-multi", 
        // eslint-disable-next-line @typescript-eslint/require-await
        function (ids) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connector.deleteMultiple(ids, this)];
            });
        }); }, {
            onSuccess: function (data, ids) {
                ids.forEach(function (id) {
                    return ModelDataStore.setQueryData(_this.getReactQueryKey(id), undefined);
                });
            },
        });
    };
    /**
     * Does the connector support delete all functionality?
     */
    Model.prototype.doesSupportAdvancedDeletion = function () {
        return !!this.connector.deleteAdvanced;
    };
    /**
     * Provides a react hook to mass delete data
     */
    Model.prototype.deleteAdvanced = function () {
        var _this = this;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useMutation(this.modelId + "-delete-adv", function (req) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.connector.deleteAdvanced) {
                    throw new Error("Connector doesn't support advanced deletion");
                }
                return [2 /*return*/, this.connector.deleteAdvanced(req, this)];
            });
        }); }, {
            onSuccess: function (data, req) {
                if (!req[0]) {
                    req[1].forEach(function (id) {
                        return ModelDataStore.setQueryData(_this.getReactQueryKey(id), undefined);
                    });
                }
                else {
                    ModelDataStore.clear();
                }
            },
        });
    };
    /**
     * Updates stored data (not relations)
     * @param id The id of the record to edit
     * @param updater The function which updates the data
     */
    Model.prototype.updateStoredData = function (id, updater) {
        ModelDataStore.setQueryData(this.getReactQueryKey(id), function (data) {
            if (!data)
                throw new Error("Data not set");
            var record = data[0], other = data.slice(1);
            return __spreadArray([updater(record)], other);
        });
    };
    /**
     * Returns a data grid compatible column definition
     */
    Model.prototype.toDataGridColumnDefinition = function () {
        return Object.entries(this.fields)
            .filter(function (entry) {
            return !entry[1].visibility.overview.disabled;
        })
            .map(function (entry) {
            var key = entry[0];
            var value = entry[1];
            return {
                field: key,
                headerName: value.getLabel(),
                type: value.type.getFilterType(),
                hidden: value.visibility.overview.hidden,
                filterable: value.filterable,
                sortable: value.sortable,
                width: value.columnWidth,
            };
        });
    };
    /**
     * Validates the given values against the field defined validation rules
     * @param values The values to validate
     * @param view Optional view filter (only applies validations on fields present in given view)
     * @param fieldsToValidate List of fields to validate
     */
    Model.prototype.validate = function (values, view, fieldsToValidate) {
        var _this = this;
        var errors = {};
        Object.entries(values).forEach(function (_a) {
            var field = _a[0], value = _a[1];
            // skip validations for fields which aren't defined in the model or which are disabled in the current view or aren't currently mounted
            if (!(field in _this.fields))
                return;
            try {
                var fieldDef = _this.fields[field];
                if (view && getVisibility(fieldDef.visibility[view], values).disabled)
                    return;
                if (fieldsToValidate && !fieldsToValidate.includes(field))
                    return;
                // first apply type validation
                var error = fieldDef.type.validate(value);
                // then apply custom field validation if present
                var fieldValidation = fieldDef.validate;
                if (!error && fieldValidation) {
                    error = fieldValidation(value, values, fieldDef);
                }
                if (error)
                    errors[field] = error;
            }
            catch (e) {
                // eslint-disable-next-line no-console
                console.error("[Components-Care] [Model.validate] Error during field validation:", field, value, e);
            }
        });
        return errors;
    };
    /**
     * Gets an empty/default model data entry
     */
    Model.prototype.getDefaultValues = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, promises;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = {};
                        promises = Object.entries(this.fields).map(function (entry) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, field, def, _b, _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _a = entry, field = _a[0], def = _a[1];
                                        if (!def.getDefaultValue) return [3 /*break*/, 2];
                                        _b = data;
                                        _c = field;
                                        return [4 /*yield*/, def.getDefaultValue()];
                                    case 1:
                                        _b[_c] = _d.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        data[field] = def.type.getDefaultValue();
                                        _d.label = 3;
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(promises)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    /**
     * Serializes the given values into a JSON string
     * @param values The values to serialize
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     */
    Model.prototype.serialize = function (values, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var serializable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.applySerialization(values, "serialize", visibility)];
                    case 1:
                        serializable = _a.sent();
                        return [2 /*return*/, JSON.stringify(serializable)];
                }
            });
        });
    };
    /**
     * Deserializes the given JSON data back into a data record
     * @param data The JSON string
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     */
    Model.prototype.deserialize = function (data, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var parsed;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        parsed = JSON.parse(data);
                        return [4 /*yield*/, this.applySerialization(parsed, "deserialize", visibility)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Applies the given serialization function to the data
     * @param values The data
     * @param func The function to apply
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     * @returns A copy of the data (not deep-copy)
     */
    Model.prototype.applySerialization = function (values, func, visibility) {
        return __awaiter(this, void 0, void 0, function () {
            var copy, _a, _b, _i, key, field, visValue, serializeFunc, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        copy = {};
                        _a = [];
                        for (_b in values)
                            _a.push(_b);
                        _i = 0;
                        _e.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        key = _a[_i];
                        if (!Object.prototype.hasOwnProperty.call(values, key))
                            return [3 /*break*/, 4];
                        field = this.fields[key];
                        if (!field) {
                            return [3 /*break*/, 4];
                        }
                        visValue = getVisibility(field.visibility[visibility], values);
                        if (visValue.disabled &&
                            (func === "serialize" || !visValue.readOnly) &&
                            key !== "id") {
                            return [3 /*break*/, 4];
                        }
                        serializeFunc = field.type[func];
                        if (!serializeFunc) return [3 /*break*/, 3];
                        _c = copy;
                        _d = key;
                        return [4 /*yield*/, serializeFunc(values[key])];
                    case 2:
                        _c[_d] = (_e.sent());
                        return [3 /*break*/, 4];
                    case 3:
                        copy[key] = values[key];
                        _e.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, copy];
                }
            });
        });
    };
    return Model;
}());
export default Model;

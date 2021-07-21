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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState, useCallback, useEffect, } from "react";
import { ListItemText, IconButton, InputLabel, Paper, Divider, } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Add as AddIcon, ExpandMore, Info as InfoIcon, } from "@material-ui/icons";
import { cleanClassMap, combineClassNames, SelectorSmallListItem, SmallListItemIcon, } from "../..";
import { makeThemeStyles } from "../../utils";
import { makeStyles } from "@material-ui/core/styles";
import InputWithHelp from "../UIKit/InputWithHelp";
import OutlinedInputWithHelp from "../UIKit/OutlinedInputWithHelp";
import InlineSwitch from "../InlineSwitch";
import useCCTranslations from "../../utils/useCCTranslations";
var useCustomDefaultSelectorStyles = makeStyles({
    root: {},
    focused: {},
    tag: {},
    tagSizeSmall: {},
    inputRoot: {},
    input: {},
    inputFocused: {},
    endAdornment: {},
    clearIndicator: {},
    clearIndicatorDirty: {},
    popupIndicator: {},
    popupIndicatorOpen: {},
    popper: {},
    popperDisablePortal: {},
    paper: {},
    listbox: {},
    loading: {},
    noOptions: {},
    groupLabel: {},
    groupUl: {},
    option: {
        padding: 0,
        '&[aria-disabled="true"]': {
            opacity: 1,
        },
    },
}, { name: "CcBaseSelectorBase" });
var useThemeStyles = makeThemeStyles(function (theme) { var _a, _b, _c; return (_c = (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.uiKit) === null || _b === void 0 ? void 0 : _b.baseSelectorExpert) === null || _c === void 0 ? void 0 : _c.base; }, "CcBaseSelector", useCustomDefaultSelectorStyles);
var useCustomStylesBase = makeStyles(function (theme) { return ({
    infoBtn: {
        padding: 2,
        marginRight: -2,
    },
    textFieldStandard: {
        position: "absolute",
    },
    switch: {
        marginTop: -30,
    },
    labelWithSwitch: {
        marginTop: 0,
    },
    icon: function (props) {
        var _a, _b;
        return ({
            width: (_a = props.iconSize) !== null && _a !== void 0 ? _a : 32,
            height: (_b = props.iconSize) !== null && _b !== void 0 ? _b : 32,
            objectFit: "contain",
        });
    },
    wrapper: function (props) { return ({
        marginTop: props.label ? 16 : undefined,
    }); },
    listItem: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 6,
        paddingBottom: 6,
    },
    lruListItem: {
        backgroundColor: theme.palette.background.default,
        "&:hover": {
            backgroundColor: theme.palette.background.paper,
        },
    },
    divider: {
        width: "100%",
    },
}); }, { name: "CcBaseSelectorCustomBase" });
var useCustomStyles = makeThemeStyles(function (theme) { var _a, _b, _c; return (_c = (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.uiKit) === null || _b === void 0 ? void 0 : _b.baseSelectorExpert) === null || _c === void 0 ? void 0 : _c.extensions; }, "CcBaseSelectorCustom", useCustomStylesBase);
var variantInput = {
    outlined: OutlinedInputWithHelp,
    standard: InputWithHelp,
};
var BaseSelector = function (props) {
    var variant = props.variant, refreshToken = props.refreshToken, onSelect = props.onSelect, selected = props.selected, label = props.label, disabled = props.disabled, disableSearch = props.disableSearch, placeholder = props.placeholder, autocompleteId = props.autocompleteId, addNewLabel = props.addNewLabel, onLoad = props.onLoad, onAddNew = props.onAddNew, enableIcons = props.enableIcons, noOptionsText = props.noOptionsText, loadingText = props.loadingText, startTypingToSearchText = props.startTypingToSearchText, openText = props.openText, closeText = props.closeText, disableClearable = props.disableClearable, openInfo = props.openInfo, grouped = props.grouped, noGroupLabel = props.noGroupLabel, disableGroupSorting = props.disableGroupSorting, groupSorter = props.groupSorter, switchLabel = props.switchLabel, lru = props.lru, startAdornment = props.startAdornment, freeSolo = props.freeSolo, getIdOfData = props.getIdOfData, filterIds = props.filterIds;
    var getIdDefault = useCallback(function (data) { return data.value; }, []);
    var getId = getIdOfData !== null && getIdOfData !== void 0 ? getIdOfData : getIdDefault;
    var classes = useThemeStyles(props);
    var defaultSwitchValue = !!(props.displaySwitch && props.defaultSwitchValue);
    var _a = useState(defaultSwitchValue), switchValue = _a[0], setSwitchValue = _a[1];
    var t = useCCTranslations().t;
    var customClasses = useCustomStyles(cleanClassMap(props, true));
    var _b = useState(false), open = _b[0], setOpen = _b[1];
    var actualAddNewLabel = addNewLabel || t("standalone.selector.add-new");
    var _c = useState([]), selectorOptions = _c[0], setSelectorOptions = _c[1];
    var _d = useState(false), loading = _d[0], setLoading = _d[1];
    var _e = useState(""), query = _e[0], setQuery = _e[1];
    var _f = useState(function () {
        var _a;
        if (!lru)
            return [];
        try {
            var ret = JSON.parse((_a = localStorage.getItem(lru.storageKey)) !== null && _a !== void 0 ? _a : "[]");
            if (!Array.isArray(ret) ||
                ret.find(function (entry) { return typeof entry !== "string"; }))
                return []; // LRU != string[]
            return ret.slice(0, lru.count);
        }
        catch (e) {
            return []; // json parse error
        }
    }), lruIds = _f[0], setLruIds = _f[1];
    // save LRU ids
    useEffect(function () {
        if (!(lru === null || lru === void 0 ? void 0 : lru.storageKey))
            return;
        localStorage.setItem(lru.storageKey, JSON.stringify(lruIds));
    }, [lruIds, lru === null || lru === void 0 ? void 0 : lru.storageKey]);
    var renderIcon = useCallback(function (icon) {
        return typeof icon === "string" ? (React.createElement("img", { src: icon, alt: "", className: customClasses.icon })) : (icon);
    }, [customClasses.icon]);
    var defaultRenderer = useCallback(function (data) {
        if (data.isDivider)
            return React.createElement(Divider, { className: customClasses.divider });
        return (React.createElement(SelectorSmallListItem
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: Typescript complains about the button property being "required"
        , { 
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: Typescript complains about the button property being "required"
            component: "div", className: combineClassNames([
                customClasses.listItem,
                data.className,
            ]), style: data.isDisabled ? { opacity: 0.38 } : undefined },
            enableIcons && (React.createElement(SmallListItemIcon, null, renderIcon(data.icon))),
            React.createElement(ListItemText, null, data.label)));
    }, [enableIcons, renderIcon, customClasses]);
    var onChangeHandler = useCallback(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var created_1, dataNN_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!data || typeof data !== "object" || !("value" in data)) {
                        if (data) {
                            // eslint-disable-next-line no-console
                            console.warn("[Components-Care] [BaseSelector] Unexpected value passed to handleOptionSelect:", data);
                        }
                        return [2 /*return*/];
                    }
                    if (!(data &&
                        "isAddNewButton" in data &&
                        data.isAddNewButton)) return [3 /*break*/, 2];
                    if (!onAddNew)
                        return [2 /*return*/];
                    return [4 /*yield*/, onAddNew()];
                case 1:
                    created_1 = _a.sent();
                    if (!created_1)
                        return [2 /*return*/];
                    setSelectorOptions(function (old) { return __spreadArray([created_1], old); });
                    data = created_1;
                    _a.label = 2;
                case 2:
                    if (onSelect) {
                        onSelect(data);
                        if (lru && data) {
                            dataNN_1 = data;
                            // add to LRU
                            setLruIds(function (prev) {
                                return __spreadArray([getId(dataNN_1)], prev.filter(function (id) { return id !== getId(dataNN_1); })).slice(0, lru.count);
                            });
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); }, [onSelect, onAddNew, lru, getId]);
    var onSearchHandler = useCallback(function (query) { return __awaiter(void 0, void 0, void 0, function () {
        var addNewEntry, results, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    addNewEntry = {
                        value: "add-new-button",
                        label: actualAddNewLabel,
                        icon: React.createElement(AddIcon, null),
                        isAddNewButton: true,
                    };
                    setLoading(true);
                    if (!(lru && query === "" && (lruIds.length > 0 || lru.forceQuery))) return [3 /*break*/, 2];
                    _a = [[
                            onAddNew ? addNewEntry : undefined,
                            lruIds.length > 0 && onAddNew
                                ? {
                                    label: "",
                                    value: "lru-divider",
                                    isDivider: true,
                                }
                                : undefined
                        ]];
                    return [4 /*yield*/, Promise.all(lruIds.map(lru.loadData))];
                case 1:
                    results = __spreadArray.apply(void 0, _a.concat([(_b.sent()).map(function (entry) { return (__assign(__assign({}, entry), { className: combineClassNames([
                                customClasses.lruListItem,
                                entry.className,
                            ]) })); })])).filter(function (entry) { return entry; });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, onLoad(query, switchValue)];
                case 3:
                    results = _b.sent();
                    if (onAddNew) {
                        if (results.length > 0) {
                            results.push({
                                label: "",
                                value: "lru-divider",
                                isDivider: true,
                            });
                        }
                        results.push(addNewEntry);
                    }
                    _b.label = 4;
                case 4:
                    if (grouped && !disableGroupSorting) {
                        setSelectorOptions(results.sort(groupSorter !== null && groupSorter !== void 0 ? groupSorter : (function (a, b) {
                            var _a, _b, _c, _d;
                            return -((_b = (_a = b.group) !== null && _a !== void 0 ? _a : noGroupLabel) !== null && _b !== void 0 ? _b : "").localeCompare((_d = (_c = a.group) !== null && _c !== void 0 ? _c : noGroupLabel) !== null && _d !== void 0 ? _d : "");
                        })));
                    }
                    else {
                        setSelectorOptions(!filterIds
                            ? results
                            : results.filter(function (entry) { return !filterIds.includes(getId(entry)); }));
                    }
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [
        actualAddNewLabel,
        lru,
        lruIds,
        grouped,
        disableGroupSorting,
        customClasses.lruListItem,
        onLoad,
        switchValue,
        onAddNew,
        groupSorter,
        noGroupLabel,
        filterIds,
        getId,
    ]);
    var updateQuery = useCallback(function (_, newQuery) {
        setQuery(newQuery);
    }, []);
    // search handler
    useEffect(function () {
        if (!open)
            return;
        void onSearchHandler(query);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query, switchValue]);
    // initial option load and reset options upon selection
    useEffect(function () {
        void onSearchHandler("");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, switchValue, refreshToken]);
    var filterOptions = useCallback(function (options) { return options; }, []);
    var InputComponent = variantInput[variant !== null && variant !== void 0 ? variant : "outlined"];
    return (React.createElement(InlineSwitch, { visible: !!props.displaySwitch, value: switchValue, onChange: setSwitchValue, label: switchLabel, classes: customClasses },
        React.createElement(React.Fragment, null,
            label && React.createElement(InputLabel, { shrink: true }, label),
            React.createElement(Paper, { elevation: 0, className: customClasses.wrapper },
                React.createElement(Autocomplete, { id: autocompleteId, classes: classes, open: open, onOpen: function () {
                        setOpen(true);
                    }, onClose: function () {
                        setOpen(false);
                    }, disableClearable: disableClearable, loading: loading, loadingText: loadingText !== null && loadingText !== void 0 ? loadingText : t("standalone.selector.base-selector.loading-text"), autoComplete: true, disabled: disabled, selectOnFocus: !disableSearch, options: 
                    // add selected to selectorOptions if not present to suppress warnings
                    selected &&
                        !selectorOptions.find(function (option) { return option.value === selected.value; })
                        ? selectorOptions.concat([selected])
                        : selectorOptions, groupBy: grouped
                        ? function (option) { var _a, _b; return (_b = (_a = option.group) !== null && _a !== void 0 ? _a : noGroupLabel) !== null && _b !== void 0 ? _b : ""; }
                        : undefined, filterOptions: filterOptions, value: selected, inputValue: query, blurOnSelect: true, onInputChange: updateQuery, popupIcon: React.createElement(ExpandMore, null), freeSolo: freeSolo, noOptionsText: lru && query === ""
                        ? startTypingToSearchText !== null && startTypingToSearchText !== void 0 ? startTypingToSearchText : t("standalone.selector.base-selector.start-typing-to-search-text")
                        : noOptionsText !== null && noOptionsText !== void 0 ? noOptionsText : t("standalone.selector.base-selector.no-options-text"), openText: openText !== null && openText !== void 0 ? openText : t("standalone.selector.base-selector.open-icon-text"), closeText: closeText !== null && closeText !== void 0 ? closeText : t("standalone.selector.base-selector.close-icon-text"), getOptionLabel: function (option) { return option.label; }, renderOption: function (option) { return defaultRenderer(option); }, getOptionDisabled: function (option) {
                        return !!(option.isDisabled || option.isDivider);
                    }, getOptionSelected: function (option, value) { return option.value === value.value; }, onChange: function (_event, selectedValue) {
                        return onChangeHandler(selectedValue);
                    }, renderInput: function (params) {
                        var _a, _b, _c, _d;
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        var InputProps = params.InputProps, InputLabelProps = params.InputLabelProps, otherParams = __rest(params, ["InputProps", "InputLabelProps"]);
                        return (React.createElement(InputComponent, __assign({ readOnly: disableSearch }, InputProps, otherParams, { startAdornment: (_a = (enableIcons ? renderIcon(selected === null || selected === void 0 ? void 0 : selected.icon) : undefined)) !== null && _a !== void 0 ? _a : startAdornment, endAdornment: openInfo
                                ? React.cloneElement.apply(React, __spreadArray(__spreadArray([(_b = params.InputProps) === null || _b === void 0 ? void 0 : _b.endAdornment, {}], ((_c = params.InputProps) === null || _c === void 0 ? void 0 : _c.endAdornment).props.children), [React.createElement(IconButton, { onClick: openInfo, className: customClasses.infoBtn },
                                        React.createElement(InfoIcon, { color: "disabled" }))])) : (_d = params.InputProps) === null || _d === void 0 ? void 0 : _d.endAdornment, placeholder: placeholder, onChange: function (event) {
                                void onSearchHandler(event.target.value);
                            } })));
                    }, key: (refreshToken || "no-refresh-token") + " " + (onAddNew
                        ? "add-new" + (actualAddNewLabel || "no-add-new-label")
                        : "no-add-new") })))));
};
export default React.memo(BaseSelector);

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
import React, { useCallback, useContext, useMemo, useState } from "react";
import { Route, Switch, useRouteMatch, useHistory, useLocation, } from "react-router-dom";
import BackendDataGrid from "../DataGrid";
import { Form } from "../Form";
import { hasPermission, usePermissionContext, } from "../../framework";
import { makeStyles } from "@material-ui/core/styles";
var useStyles = makeStyles({
    hide: {
        display: "none",
        width: "100%",
        height: "100%",
    },
    show: {
        width: "100%",
        height: "100%",
    },
}, { name: "CcCrud" });
var CrudDispatchContext = React.createContext(undefined);
export var useCrudDispatchContext = function () {
    var ctx = useContext(CrudDispatchContext);
    if (!ctx)
        throw new Error("CrudDispatchContext not set");
    return ctx;
};
var CRUD = function (props) {
    var _a, _b;
    var history = useHistory();
    var _c = useRouteMatch(), path = _c.path, url = _c.url;
    var location = useLocation();
    var perms = usePermissionContext()[0];
    var disableRouting = props.disableRouting, disableBackgroundGrid = props.disableBackgroundGrid, ForbiddenPage = props.forbiddenPage;
    var RouteComponent = (_a = props.routeComponent) !== null && _a !== void 0 ? _a : Route;
    var _d = useState((_b = props.initialView) !== null && _b !== void 0 ? _b : null), id = _d[0], setId = _d[1];
    var _e = useState(new Date().getTime().toString()), gridRefreshToken = _e[0], setGridRefreshToken = _e[1];
    var classes = useStyles();
    var showEditPage = useCallback(function (id) {
        if (disableRouting) {
            setId(id);
        }
        else {
            history.push(url + "/" + id);
        }
    }, [history, url, disableRouting]);
    var showNewPage = useCallback(function () {
        if (disableRouting) {
            setId("new");
        }
        else {
            history.push(url + "/new");
        }
    }, [history, url, disableRouting]);
    var showOverview = useCallback(function () {
        if (disableRouting) {
            setId(null);
        }
        else {
            history.push(url);
        }
    }, [history, url, disableRouting]);
    var refreshGrid = useCallback(function () {
        setGridRefreshToken(new Date().getTime().toString());
    }, []);
    var handleSubmit = useCallback(function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!props.formProps.onSubmit) return [3 /*break*/, 2];
                    return [4 /*yield*/, props.formProps.onSubmit(data)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    id = data.id;
                    if (disableRouting) {
                        setId(function (oldId) { return (oldId === null ? null : id); });
                    }
                    else if (location.pathname.endsWith("/new")) {
                        history.push(url + "/" + id);
                    }
                    refreshGrid();
                    return [2 /*return*/];
            }
        });
    }); }, [
        props.formProps,
        disableRouting,
        location.pathname,
        history,
        url,
        refreshGrid,
    ]);
    var grid = function () {
        var _a;
        return (React.createElement(BackendDataGrid, __assign({ enableDelete: hasPermission(perms, props.deletePermission), disableExport: !hasPermission(perms, props.exportPermission) }, props.gridProps, { model: props.model, forceRefreshToken: gridRefreshToken, onEdit: (hasPermission(perms, props.readPermission) ||
                hasPermission(perms, props.editPermission)) &&
                props.children
                ? showEditPage
                : undefined, onAddNew: hasPermission(perms, props.newPermission) && props.children
                ? (_a = props.gridProps.onAddNew) !== null && _a !== void 0 ? _a : showNewPage
                : undefined })));
    };
    var form = function (id, formComponent) { return (React.createElement(Form, __assign({ id: id === "new" ? null : id, model: props.model, readOnly: !hasPermission(perms, props.editPermission) }, props.formProps, { onSubmit: handleSubmit, customProps: {
            goBack: showOverview,
        } }), formComponent)); };
    var dispatch = useMemo(function () { return ({
        refreshGrid: refreshGrid,
    }); }, [refreshGrid]);
    return (React.createElement(CrudDispatchContext.Provider, { value: dispatch }, disableRouting ? (React.createElement(React.Fragment, null,
        (id === null || !disableBackgroundGrid) && (React.createElement("div", { className: id !== null ? classes.hide : classes.show }, grid())),
        id !== null && props.children && form(id, props.children))) : (React.createElement(React.Fragment, null,
        (id === null || !disableBackgroundGrid) && (React.createElement("div", { className: location.pathname === url ? classes.show : classes.hide }, grid())),
        props.children && (React.createElement(Switch, null,
            React.createElement(RouteComponent, { path: path + "/:id", exact: true }, hasPermission(perms, props.readPermission) ||
                hasPermission(perms, props.editPermission) ||
                !ForbiddenPage ? (function (routeProps) {
                var _a, _b;
                return props.children &&
                    form((_b = (_a = routeProps.match) === null || _a === void 0 ? void 0 : _a.params.id) !== null && _b !== void 0 ? _b : "", props.children);
            }) : (React.createElement(ForbiddenPage, null)))))))));
};
export default React.memo(CRUD);

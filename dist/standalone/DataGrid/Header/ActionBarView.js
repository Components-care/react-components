import React, { useCallback, useState } from "react";
import { Grid, IconButton, Tooltip, useMediaQuery, useTheme, } from "@material-ui/core";
import { Add as AddIcon } from "@material-ui/icons";
import { ActionButton, ExportIcon, ResetIcon, SmallIconButton, TuneIcon, VerticalDivider, } from "../../index";
import ExportMenu from "./ExportMenu";
import ComponentWithLabel from "../../UIKit/ComponentWithLabel";
import ResetMenu from "./ResetMenu";
import useCCTranslations from "../../../utils/useCCTranslations";
var ActionBarView = function (props) {
    var _a, _b, _c, _d;
    var theme = useTheme();
    var bpMdUp = useMediaQuery(theme.breakpoints.up("md"), { noSsr: true });
    var bpSmUp = useMediaQuery(theme.breakpoints.up("sm"), { noSsr: true });
    var t = useCCTranslations().t;
    var _e = useState(undefined), exportAnchorEl = _e[0], setExportAnchorEl = _e[1];
    var openExportMenu = useCallback(function (evt) {
        setExportAnchorEl(evt.currentTarget);
    }, [setExportAnchorEl]);
    var closeExportMenu = useCallback(function () {
        setExportAnchorEl(null);
    }, [setExportAnchorEl]);
    var _f = useState(undefined), resetAnchorEl = _f[0], setResetAnchorEl = _f[1];
    var openResetDialog = useCallback(function (evt) {
        setResetAnchorEl(evt.currentTarget);
    }, []);
    var closeResetMenu = useCallback(function () {
        setResetAnchorEl(null);
    }, []);
    return (React.createElement(Grid, { container: true, alignItems: "stretch", wrap: "nowrap" },
        props.hasCustomFilterBar && (React.createElement(Grid, { item: true, key: "divider-1" },
            React.createElement(VerticalDivider, null))),
        React.createElement(Grid, { item: true, key: "settings" }, bpMdUp ? (React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary" },
                React.createElement(TuneIcon, null)), labelText: t("standalone.data-grid.header.settings"), onClick: props.toggleSettings, labelPlacement: "bottom" })) : (React.createElement(Tooltip, { title: (_a = t("standalone.data-grid.header.settings")) !== null && _a !== void 0 ? _a : "" },
            React.createElement(IconButton, { color: "primary", onClick: props.toggleSettings },
                React.createElement(TuneIcon, null))))),
        React.createElement(Grid, { item: true, key: "divider-4" },
            React.createElement(VerticalDivider, null)),
        React.createElement(Grid, { item: true, key: "reset" }, bpMdUp ? (React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary" },
                React.createElement(ResetIcon, null)), labelText: t("standalone.data-grid.header.reset"), onClick: openResetDialog, labelPlacement: "bottom" })) : (React.createElement(Tooltip, { title: (_b = t("standalone.data-grid.header.reset")) !== null && _b !== void 0 ? _b : "" },
            React.createElement(IconButton, { color: "primary", onClick: openResetDialog },
                React.createElement(ResetIcon, null))))),
        props.exporters && (React.createElement(React.Fragment, null,
            React.createElement(Grid, { item: true, key: "divider-3" },
                React.createElement(VerticalDivider, null)),
            React.createElement(Grid, { item: true, key: "export" },
                bpMdUp ? (React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary" },
                        React.createElement(ExportIcon, null)), labelText: t("standalone.data-grid.header.export"), onClick: openExportMenu, labelPlacement: "bottom" })) : (React.createElement(Tooltip, { title: (_c = t("standalone.data-grid.header.export")) !== null && _c !== void 0 ? _c : "" },
                    React.createElement(IconButton, { color: "primary", onClick: openExportMenu },
                        React.createElement(ExportIcon, null)))),
                React.createElement(ExportMenu, { exporters: props.exporters, anchorEl: exportAnchorEl, onClose: closeExportMenu })))),
        props.handleAddNew && (React.createElement(React.Fragment, null,
            React.createElement(Grid, { item: true, xs: true, key: "divider-2" }),
            React.createElement(Grid, { item: true, container: true, key: "new", justify: "flex-end", alignItems: "center", spacing: 2, wrap: "nowrap" }, typeof props.handleAddNew === "function" ? (React.createElement(Grid, { item: true },
                React.createElement(ActionButton, { small: !bpSmUp, icon: React.createElement(AddIcon, null), onClick: props.handleAddNew }, (_d = t("standalone.data-grid.header.new")) !== null && _d !== void 0 ? _d : ""))) : (props.handleAddNew.map(function (entry, index) {
                var _a;
                return (React.createElement(Grid, { item: true, key: index.toString() },
                    React.createElement(ActionButton, { small: !bpSmUp, icon: (_a = entry.icon) !== null && _a !== void 0 ? _a : React.createElement(AddIcon, null), onClick: entry.onClick, disabled: !entry.onClick }, entry.label)));
            }))))),
        React.createElement(ResetMenu, { anchorEl: resetAnchorEl, onClose: closeResetMenu, refresh: props.refresh, resetFilter: props.resetFilter, resetSort: props.resetSort, resetColumn: props.resetColumn, resetWidth: props.resetWidth, resetAll: props.resetAll })));
};
export default React.memo(ActionBarView);

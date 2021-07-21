import React from "react";
import { Grid } from "@material-ui/core";
import { SmallIconButton, VerticalDivider } from "../../index";
import ComponentWithLabel from "../../UIKit/ComponentWithLabel";
import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";
import SelectAll from "./SelectAll";
import { useDataGridStyles } from "../DataGrid";
import useCCTranslations from "../../../utils/useCCTranslations";
var DataActionBarView = function (props) {
    var _a;
    var classes = useDataGridStyles();
    var t = useCCTranslations().t;
    return (React.createElement(Grid, { container: true },
        !props.disableSelection && (React.createElement(Grid, { item: true, key: "select-all" },
            React.createElement(ComponentWithLabel, { control: React.createElement(SelectAll, null), labelText: t("standalone.data-grid.footer.select-all"), labelPlacement: "bottom", className: classes.selectAllWrapper }))),
        props.handleEdit && (React.createElement(React.Fragment, null,
            !props.disableSelection && (React.createElement(Grid, { item: true, key: "divider-1" },
                React.createElement(VerticalDivider, null))),
            React.createElement(Grid, { item: true, key: "edit" },
                React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary", disabled: props.numSelected !== 1 },
                        React.createElement(EditIcon, null)), labelText: t("standalone.data-grid.footer.edit"), onClick: props.handleEdit, labelPlacement: "bottom", disabled: props.numSelected !== 1 })))),
        props.handleDelete && (React.createElement(React.Fragment, null,
            React.createElement(Grid, { item: true, key: "divider-2" },
                React.createElement(VerticalDivider, null)),
            React.createElement(Grid, { item: true, key: "delete" },
                React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary", disabled: props.numSelected === 0 },
                        React.createElement(DeleteIcon, null)), labelText: t("standalone.data-grid.footer.delete"), onClick: props.handleDelete, labelPlacement: "bottom", disabled: props.numSelected === 0 })))), (_a = props.customButtons) === null || _a === void 0 ? void 0 :
        _a.map(function (entry) { return (React.createElement(React.Fragment, { key: entry.label },
            React.createElement(Grid, { item: true },
                React.createElement(VerticalDivider, null)),
            React.createElement(Grid, { item: true },
                React.createElement(ComponentWithLabel, { control: React.createElement(SmallIconButton, { color: "primary", disabled: entry.isDisabled(props.numSelected) }, entry.icon), labelText: entry.label, onClick: function () { return props.handleCustomButtonClick(entry.label); }, labelPlacement: "bottom", disabled: entry.isDisabled(props.numSelected) })))); })));
};
export default React.memo(DataActionBarView);

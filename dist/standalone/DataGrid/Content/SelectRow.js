import React from "react";
import { useDataGridProps, useDataGridState } from "../DataGrid";
import SelectRowView from "./SelectRowView";
var xor = function (v1, v2) {
    return v1 ? !v2 : v2;
};
export var isSelected = function (selectAll, selectedIds, id) { return xor(selectAll, selectedIds.includes(id)); };
var SelectRow = function (props) {
    var id = props.id;
    var state = useDataGridState()[0];
    var SelectRowControl = useDataGridProps().customSelectionControl || SelectRowView;
    return (React.createElement(SelectRowControl, { checked: isSelected(state.selectAll, state.selectedRows, id), id: id }));
};
export default React.memo(SelectRow);

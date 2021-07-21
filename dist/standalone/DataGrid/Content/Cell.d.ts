import { IDataGridColumnDef } from "../DataGrid";
import React, { Dispatch, SetStateAction } from "react";
import { GridCellProps } from "react-virtualized/dist/es/Grid";
export interface CellProps extends GridCellProps {
    /**
     * The grid columns
     */
    columns: IDataGridColumnDef[];
    /**
     * The hover state and set state action
     */
    hoverState: [number | null, Dispatch<SetStateAction<number | null>>];
}
declare const Cell: (props: CellProps) => React.ReactElement;
export default Cell;

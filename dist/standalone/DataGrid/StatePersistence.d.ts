import React from "react";
import { IDataGridColumnsState, IDataGridState } from "./DataGrid";
export interface DataGridPersistentState {
    columnState: IDataGridColumnsState;
    columnWidth: Record<string, number>;
    state: Partial<Pick<IDataGridState, "search" | "hiddenColumns" | "lockedColumns" | "customData">>;
}
export declare type DataGridPersistentStateContextType = [
    Partial<DataGridPersistentState> | undefined,
    (data: DataGridPersistentState) => void
];
export declare const DataGridPersistentStateContext: React.Context<DataGridPersistentStateContextType | undefined>;
declare const _default: React.MemoExoticComponent<() => JSX.Element>;
export default _default;

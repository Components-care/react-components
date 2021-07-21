import React from "react";
import { IDataGridColumnProps } from "../DataGrid";
export interface IDataGridContentProps extends IDataGridColumnProps {
    rowsPerPage: number;
}
declare const _default: React.MemoExoticComponent<(props: IDataGridContentProps) => JSX.Element>;
export default _default;

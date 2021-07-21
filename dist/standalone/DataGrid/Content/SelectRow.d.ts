import React from "react";
export interface IDataGridContentSelectRowProps {
    /**
     * The ID of the row
     */
    id: string;
}
export declare const isSelected: (selectAll: boolean, selectedIds: string[], id: string) => boolean;
declare const _default: React.MemoExoticComponent<(props: IDataGridContentSelectRowProps) => JSX.Element>;
export default _default;

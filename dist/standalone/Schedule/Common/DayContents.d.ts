import React from "react";
import { WithStyles } from "@material-ui/core";
export interface IDayData {
    /**
     * Unique identifier
     */
    id: string;
    /**
     * The text/title to display
     */
    title: string;
    /**
     * Optional left click handler
     */
    onClick?: () => void;
    /**
     * Optional middle click handler
     */
    onAuxClick?: () => void;
}
export interface IProps extends WithStyles {
    data: IDayData[];
}
declare const _default: React.ComponentType<Pick<IProps, "data"> & import("@material-ui/core").StyledComponentProps<"btn" | "btnDisabled">>;
export default _default;

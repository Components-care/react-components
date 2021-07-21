import React from "react";
import { ClassNameMap } from "@material-ui/styles/withStyles";
export interface HowToBoxProps {
    /**
     * Box title label
     */
    titleLabel?: React.ReactNode;
    /**
     * How to entries
     */
    labels: string[] | React.ReactNodeArray | string | React.ReactNode | undefined;
    /**
     * Custom CSS styles
     */
    classes?: ClassNameMap<keyof ReturnType<typeof useStyles>>;
}
declare const useStyles: (props?: any) => ClassNameMap<"groupBox">;
declare const _default: React.MemoExoticComponent<(props: HowToBoxProps) => JSX.Element>;
export default _default;

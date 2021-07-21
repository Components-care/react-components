import React from "react";
export interface FileProps {
    /**
     * The file name, including extension
     */
    name: string;
    /**
     * Optional callback for removing the file
     */
    onRemove?: () => void;
    /**
     * The size of the preview
     */
    size: number;
    /**
     * The preview to show instead of the file icon
     */
    preview?: string;
    /**
     * Display grayed-out (marked as deleted)
     */
    disabled: boolean;
    /**
     * The download link to open if the file is clicked
     */
    downloadLink?: string;
    /**
     * Custom styles
     */
    classes?: Partial<ReturnType<typeof useStyles>>;
}
declare const useStyles: (props?: any) => import("@material-ui/styles").ClassNameMap<"icon" | "downloadLink" | "clickable" | "iconContainer" | "closeIcon" | "iconDisabled">;
declare const _default: React.MemoExoticComponent<(props: FileProps) => JSX.Element>;
export default _default;

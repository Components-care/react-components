import React from "react";
import { IDownscaleProps } from "../../../utils/processImage";
export interface ImageSelectorProps {
    /**
     * The name of the input
     */
    name: string;
    /**
     * The current value of the input
     */
    value: string;
    /**
     * Allow capture?
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/capture
     */
    capture: false | "false" | "user" | "environment";
    /**
     * The label of the input
     */
    label?: string;
    /**
     * The alt text of the image
     */
    alt: string;
    /**
     * The label type of the box
     */
    smallLabel?: boolean;
    /**
     * The change handler of the input
     * @param name The field name
     * @param value The new value (data uri of selected image or empty string)
     */
    onChange?: (name: string, value: string) => void;
    /**
     * The blur event handler of the input
     */
    onBlur?: React.FocusEventHandler<HTMLElement>;
    /**
     * Label overwrite for Upload label
     */
    uploadLabel?: string;
    /**
     * Is the control read-only?
     */
    readOnly: boolean;
    /**
     * MimeType to convert the image to (e.g. image/png or image/jpg)
     */
    convertImagesTo?: string;
    /**
     * Settings to downscale an image
     */
    downscale?: IDownscaleProps;
    /**
     * Custom styles
     */
    classes?: Partial<ReturnType<typeof useStyles>>;
}
declare const useStyles: (props?: any) => import("@material-ui/styles").ClassNameMap<"root" | "imgWrapper" | "preview" | "changeEventHelper">;
declare const _default: React.MemoExoticComponent<(props: ImageSelectorProps) => JSX.Element>;
export default _default;

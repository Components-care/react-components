import React from "react";
import TypeString from "../../TypeString";
import { TextFieldProps } from "@material-ui/core";
import { ModelRenderParams } from "../../../index";
import { TextFieldWithHelpProps } from "../../../../../standalone/UIKit/TextFieldWithHelp";
export declare type ModelDataTypeStringRendererCCParams = Omit<TextFieldProps, "name" | "value" | "label" | "disabled" | "required" | "onChange" | "onBlur" | "error"> & TextFieldWithHelpProps;
/**
 * Renders a text field
 */
declare class RendererString extends TypeString {
    props?: ModelDataTypeStringRendererCCParams;
    constructor(props?: ModelDataTypeStringRendererCCParams);
    render(params: ModelRenderParams<string>): React.ReactElement;
}
export default RendererString;

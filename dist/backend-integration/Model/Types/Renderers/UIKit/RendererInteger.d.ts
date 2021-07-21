import React from "react";
import { TextFieldProps } from "@material-ui/core";
import { ModelRenderParams } from "../../../index";
import { TextFieldWithHelpProps } from "../../../../../standalone/UIKit/TextFieldWithHelp";
import TypeNumber from "../../TypeNumber";
export declare type ModelDataTypeIntegerRendererCCParams = Omit<TextFieldProps, "name" | "value" | "label" | "disabled" | "required" | "onChange" | "onBlur" | "error" | "multiline"> & TextFieldWithHelpProps;
/**
 * Renders a text field
 */
declare class RendererInteger extends TypeNumber {
    props?: ModelDataTypeIntegerRendererCCParams;
    constructor(props?: ModelDataTypeIntegerRendererCCParams);
    render(params: ModelRenderParams<number | null>): React.ReactElement;
}
export default RendererInteger;

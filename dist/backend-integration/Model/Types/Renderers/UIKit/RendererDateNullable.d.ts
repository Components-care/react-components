import React from "react";
import { ModelRenderParams } from "../../../index";
import TypeDateNullable from "../../TypeDateNullable";
import { DateInputProps } from "../../../../../standalone/UIKit/InputControls/DateInput";
export declare type RendererDateNullableProps = Omit<DateInputProps, "name" | "value" | "label" | "disabled" | "onChange" | "onBlur" | "error" | "onError" | "fullWidth" | "clearable">;
/**
 * Renders Date with Date Selector
 */
declare class RendererDateNullable extends TypeDateNullable {
    props?: RendererDateNullableProps;
    constructor(props?: RendererDateNullableProps);
    render(params: ModelRenderParams<Date | null>): React.ReactElement;
}
export default RendererDateNullable;

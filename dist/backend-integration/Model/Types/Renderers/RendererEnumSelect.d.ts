import React from "react";
import { ModelRenderParams } from "../../index";
import TypeEnum, { EnumValue } from "../TypeEnum";
import { BaseSelectorData, BaseSelectorProps } from "../../../../standalone/Selector";
declare type RendererEnumSelectProps = Omit<BaseSelectorProps<BaseSelectorData>, "selected" | "onLoad" | "onSelect" | "disabled">;
export declare type AdvancedEnumValue = Omit<BaseSelectorData, "label"> & Pick<EnumValue, "getLabel" | "invisible">;
/**
 * Renders TypeEnum as drop-down selector (with search)
 */
declare class RendererEnumSelect extends TypeEnum {
    private props?;
    constructor(values: AdvancedEnumValue[], props?: RendererEnumSelectProps);
    render(params: ModelRenderParams<string>): React.ReactElement;
}
export default RendererEnumSelect;

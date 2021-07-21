import React from "react";
import { ModelRenderParams } from "../../../index";
import TypeDate from "../../TypeDate";
/**
 * Renders Date with Date Selector
 */
declare class RendererDateNullable extends TypeDate {
    render(params: ModelRenderParams<Date>): React.ReactElement;
}
export default RendererDateNullable;

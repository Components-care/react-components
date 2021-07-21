import React from "react";
import { ModelRenderParams } from "../../../index";
import TypeDateNullable from "../../TypeDateNullable";
/**
 * Renders Date with Date Selector
 */
declare class RendererDateTimeNullable extends TypeDateNullable {
    render(params: ModelRenderParams<Date | null>): React.ReactElement;
}
export default RendererDateTimeNullable;

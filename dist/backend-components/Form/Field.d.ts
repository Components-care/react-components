import React from "react";
import { ModelFieldDefinition, PageVisibility } from "../../backend-integration";
declare type NonOverridableProps = "getDefaultValue" | "validate" | "filterable" | "sortable" | "columnWidth";
interface FieldProps {
    /**
     * The name of the field as specified in the model
     */
    name: string;
    /**
     * Overrides for the model information
     */
    overrides?: Partial<Omit<ModelFieldDefinition<unknown, string, PageVisibility, never>, NonOverridableProps>> | ((original: ModelFieldDefinition<unknown, string, PageVisibility, never>) => Omit<ModelFieldDefinition<unknown, string, PageVisibility, never>, NonOverridableProps>);
}
declare const _default: React.MemoExoticComponent<(props: FieldProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>>;
export default _default;

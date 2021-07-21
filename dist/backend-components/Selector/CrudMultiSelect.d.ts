import React from "react";
import { ModelFieldName, PageVisibility } from "../../backend-integration";
import { ErrorComponentProps } from "../Form";
import { MultiSelectorData } from "../../standalone";
import { BackendMultiSelectProps } from "./BackendMultiSelect";
import { UseCrudSelectParams } from "./useCrudSelect";
export interface CrudMultiSelectProps<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT, DataT extends MultiSelectorData> extends Omit<BackendMultiSelectProps<KeyT, VisibilityT, CustomT, DataT>, "modelToSelectorData" | "initialData" | "selected" | "onSelect" | "getIdOfData">, UseCrudSelectParams<KeyT, VisibilityT, CustomT, DataT> {
    /**
     * The error component that is used to display errors
     */
    errorComponent: React.ComponentType<ErrorComponentProps>;
    /**
     * Get ID of data
     */
    getIdOfData: NonNullable<BackendMultiSelectProps<KeyT, VisibilityT, CustomT, DataT>["getIdOfData"]>;
}
declare const _default: <KeyT extends string, VisibilityT extends PageVisibility, CustomT, DataT extends MultiSelectorData>(props: CrudMultiSelectProps<KeyT, VisibilityT, CustomT, DataT>) => JSX.Element;
export default _default;

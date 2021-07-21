/// <reference types="react" />
import { DataGridProps, IDataGridAddButton } from "../../standalone/DataGrid/DataGrid";
import Model, { ModelFieldName, PageVisibility } from "../../backend-integration/Model/Model";
export interface BackendDataGridProps<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomDataT> extends Omit<DataGridProps, "loadData" | "columns" | "exporters"> {
    /**
     * The model to use
     */
    model: Model<KeyT, VisibilityT, CustomDataT>;
    /**
     * Enable deletion?
     */
    enableDelete?: boolean;
    /**
     * Disable export?
     */
    disableExport?: boolean;
    /**
     * Additional buttons next to new button
     */
    additionalNewButtons?: IDataGridAddButton[];
}
declare const _default: <KeyT extends string, VisibilityT extends PageVisibility, CustomDataT>(props: BackendDataGridProps<KeyT, VisibilityT, CustomDataT>) => JSX.Element;
export default _default;

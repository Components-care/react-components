import { Connector, ModelFieldName, PageVisibility } from "../../backend-integration";
import { BaseSelectorData } from "../../standalone";
export interface UseCrudSelectParams<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT, DataT extends BaseSelectorData> {
    /**
     * The backend connector used as CRUD interface
     */
    connector: Connector<KeyT, VisibilityT, CustomT>;
    /**
     * Callback for serializing data before passing it to the backend connector
     * @param data The selector data to serialize
     * @returns Data to be passed to the backend connector, id may be null or data.value
     */
    serialize: (data: DataT) => Promise<Partial<Record<KeyT, unknown>>> | Partial<Record<KeyT, unknown>>;
    /**
     * Callback for deserializing data after getting it from the backend connector
     * @param data The data from the backend connector (index function)
     * @returns The selector data which can be used by the control
     */
    deserialize: (data: Record<KeyT, unknown>) => Promise<DataT> | DataT;
    /**
     * Callback for deserializing data from the model
     * @param data The data from the backend connector (index function)
     * @returns The selector data which can be used by the control
     */
    deserializeModel: (data: Record<KeyT, unknown>) => Promise<Omit<DataT, "value">> | Omit<DataT, "value">;
    /**
     * Selection change event
     * @param selected The new selection
     */
    onChange?: (selected: DataT[]) => void;
    /**
     * The initial selection (override). If set backend isn't consulted for data
     */
    initialSelected?: DataT[];
}
export interface UseCrudSelectResult<KeyT extends ModelFieldName, DataT extends BaseSelectorData> {
    /**
     * Fetching initial data?
     */
    loading: boolean;
    /**
     * Error while updating data
     */
    error: Error | null;
    /**
     * Error while fetching initial data
     */
    loadError: Error | null;
    /**
     * Currently selected entries
     */
    selected: DataT[];
    /**
     * Currently selected entries (raw data)
     */
    initialRawData: Record<KeyT, unknown>[];
    /**
     * Selection handler
     * @param ids The new selected entry ids
     * @param newSelected The new selected entries
     */
    handleSelect: (ids: string[], newSelected: DataT[]) => Promise<void>;
    /**
     * Conversion function for model data to selection data (handles special case when data comes from CRUD controller)
     * @param data The model data
     */
    modelToSelectorData: (data: Record<KeyT, unknown>) => Promise<DataT>;
}
declare const useCrudSelect: <KeyT extends string, VisibilityT extends PageVisibility, CustomT, DataT extends BaseSelectorData>(params: UseCrudSelectParams<KeyT, VisibilityT, CustomT, DataT>) => UseCrudSelectResult<KeyT, DataT>;
export default useCrudSelect;

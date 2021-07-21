import Type from "./Type";
import Visibility, { VisibilityCallback } from "./Visibility";
import Connector, { ResponseMeta } from "../Connector/Connector";
import { IDataGridColumnDef, IDataGridLoadDataParameters } from "../../standalone/DataGrid/DataGrid";
import { UseMutationResult, UseQueryResult } from "react-query/types/react/types";
import { QueryKey } from "react-query/types/core/types";
export interface PageVisibility {
    overview: Visibility;
    edit: VisibilityCallback;
    create: VisibilityCallback;
}
export declare type ModelRecord<ModelT extends Model<ModelFieldName, PageVisibility, unknown>> = {
    [Field in keyof ModelT["fields"]]: ReturnType<ModelT["fields"][Field]["type"]["getDefaultValue"]>;
};
export interface ModelFieldDefinition<TypeT, KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> {
    /**
     * The Renderer of the field
     */
    type: Type<TypeT>;
    /**
     * The visibility settings of the field
     */
    visibility: VisibilityT;
    /**
     * The label to display to the user
     */
    getLabel: () => string;
    /**
     * Enable filtering? (for BackendDataGrid)
     */
    filterable?: boolean;
    /**
     * Enable sorting? (for BackendDataGrid)
     */
    sortable?: boolean;
    /**
     * Column width settings (for BackendDataGrid)
     */
    columnWidth?: IDataGridColumnDef["width"];
    /**
     * The default value
     */
    getDefaultValue?: () => Promise<TypeT> | TypeT;
    /**
     * Callback to validate field
     * @param value The value of this field
     * @param values All field values
     * @param field This field
     */
    validate?: (value: TypeT, values: Record<KeyT, unknown>, field: ModelFieldDefinition<TypeT, KeyT, VisibilityT, CustomT>) => string | null;
    /**
     * User-defined data
     */
    customData: CustomT;
    /**
     * onChange event handler, fired before changes have been saved
     * @param value The new value
     * @param model The model definition
     * @param setFieldValue Allows setting of other values
     * @returns The updated value (can be modified by this handler)
     */
    onChange?: (value: TypeT, model: Model<KeyT, VisibilityT, CustomT>, setFieldValue: (field: KeyT, value: unknown, shouldValidate?: boolean) => void) => TypeT;
    /**
     * The referenced model for backend connected data types.
     * If TypeScript complains cast the return value to `Model<ModelFieldName, PageVisibility, unknown>`
     */
    getRelationModel?: () => Model<ModelFieldName, PageVisibility, unknown>;
}
export declare type ModelField<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> = Record<KeyT, ModelFieldDefinition<any, KeyT, VisibilityT, CustomT>>;
export declare type ModelFieldName = "id" | string;
export declare type ModelGetResponseRelations<KeyT extends ModelFieldName> = Partial<Record<KeyT, Record<ModelFieldName, unknown>[]>>;
export declare type ModelData<KeyT extends ModelFieldName> = Record<KeyT, unknown>;
/**
 * Response for GET single data entry
 */
export declare type ModelGetResponse<KeyT extends ModelFieldName> = [
    ModelData<KeyT>,
    ModelGetResponseRelations<KeyT>
];
/**
 * Deletion request. If invert is false only delete ids array. If invert is true delete everything except the given ids
 * @param invert Invert the selection
 * @param ids The selection
 */
export declare type AdvancedDeleteRequest = [
    invert: boolean,
    ids: string[],
    filter?: Pick<IDataGridLoadDataParameters, "quickFilter" | "additionalFilters" | "fieldFilter">
];
export interface CacheOptions {
    /**
     * Time to consider data valid in milliseconds
     * @default 30s
     */
    staleTime?: number;
    /**
     * Time to keep data cached after it's no longer in use
     * @default 5m
     */
    cacheTime?: number;
}
declare class Model<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> {
    /**
     * A unique model identifier, used for caching
     */
    readonly modelId: string;
    /**
     * The actual model definition
     */
    readonly fields: ModelField<KeyT, VisibilityT, CustomT>;
    /**
     * The backend connector providing a CRUD interface for the model
     */
    connector: Connector<KeyT, VisibilityT, CustomT>;
    /**
     * Optional additional cache keys
     */
    readonly cacheKeys?: unknown;
    /**
     * Caching options
     */
    cacheOptions?: CacheOptions;
    /**
     * Creates a new model
     * @param name A unique name for the model (modelId)
     * @param model The actual model definition
     * @param connector A backend connector
     * @param cacheKeys Optional cache keys
     * @param cacheOptions Optional cache options
     */
    constructor(name: string, model: ModelField<KeyT, VisibilityT, CustomT>, connector: Connector<KeyT, VisibilityT, CustomT>, cacheKeys?: unknown, cacheOptions?: CacheOptions);
    /**
     * Loads a list of data entries by the given search params
     * @param params The search params
     */
    index(params: Partial<IDataGridLoadDataParameters> | undefined): Promise<[Record<KeyT, unknown>[], ResponseMeta]>;
    /**
     * Gets the react-query cache key for this model
     * @param id The record id
     */
    getReactQueryKey(id: string | null): QueryKey;
    /**
     * Provides a react-query useQuery hook for the given data id
     * @param id The data record id
     */
    get(id: string | null): UseQueryResult<ModelGetResponse<KeyT>, Error>;
    /**
     * Provides cached access for the given data id
     * @param id The data record id or null to obtain the default values
     */
    getCached(id: string | null): Promise<ModelGetResponse<KeyT>>;
    /**
     * Provides uncached access for the given data id
     * @param id The data record id or null to obtain the default values
     */
    getRaw(id: string | null): Promise<ModelGetResponse<KeyT>>;
    /**
     * Deserializes the given ModelGetResponse
     * @param rawData The data to deserialize
     * @private
     */
    private deserializeResponse;
    /**
     * Provides a react-query useMutation hook for creation or updates to an data entry
     */
    createOrUpdate<TContext = unknown>(): UseMutationResult<ModelGetResponse<KeyT>, Error, Record<string, unknown>, TContext>;
    /**
     * Provides a react hook to delete a given record id
     */
    delete<TContext = unknown>(): UseMutationResult<void, Error, string, TContext>;
    /**
     * Provides a react hook to delete multiple records at once
     */
    deleteMultiple<TContext = unknown>(): UseMutationResult<void, Error, string[], TContext>;
    /**
     * Does the connector support delete all functionality?
     */
    doesSupportAdvancedDeletion(): boolean;
    /**
     * Provides a react hook to mass delete data
     */
    deleteAdvanced<TContext = unknown>(): UseMutationResult<void, Error, AdvancedDeleteRequest, TContext>;
    /**
     * Updates stored data (not relations)
     * @param id The id of the record to edit
     * @param updater The function which updates the data
     */
    updateStoredData(id: string, updater: (old: Record<KeyT, unknown>) => Record<KeyT, unknown>): void;
    /**
     * Returns a data grid compatible column definition
     */
    toDataGridColumnDefinition(): IDataGridColumnDef[];
    /**
     * Validates the given values against the field defined validation rules
     * @param values The values to validate
     * @param view Optional view filter (only applies validations on fields present in given view)
     * @param fieldsToValidate List of fields to validate
     */
    validate(values: Record<KeyT, unknown>, view?: "edit" | "create", fieldsToValidate?: KeyT[]): Record<string, string>;
    /**
     * Gets an empty/default model data entry
     */
    protected getDefaultValues(): Promise<Record<KeyT, unknown>>;
    /**
     * Serializes the given values into a JSON string
     * @param values The values to serialize
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     */
    serialize(values: Record<KeyT, unknown>, visibility: keyof PageVisibility): Promise<string>;
    /**
     * Deserializes the given JSON data back into a data record
     * @param data The JSON string
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     */
    deserialize(data: string, visibility: keyof PageVisibility): Promise<Record<KeyT, unknown>>;
    /**
     * Applies the given serialization function to the data
     * @param values The data
     * @param func The function to apply
     * @param visibility The visibility of the field to check. Field will be dropped if visibility has disabled == true.
     * @returns A copy of the data (not deep-copy)
     */
    applySerialization(values: Record<KeyT, unknown>, func: "serialize" | "deserialize", visibility: keyof PageVisibility): Promise<Record<KeyT, unknown>>;
}
export default Model;

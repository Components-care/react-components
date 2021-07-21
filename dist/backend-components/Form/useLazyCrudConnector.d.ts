import { LazyConnector, ModelFieldName, PageVisibility } from "../..";
import { ApiConnector } from "../../backend-integration";
export interface UseLazyCrudConnectorParams<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> {
    /**
     * The custom field name (must not be in model)
     */
    field: string;
    /**
     * The backend endpoint to use
     */
    getEndpoint: (id: string) => string;
    /**
     * Creates an instance of the underlying connector
     * @param initialEndpoint The initial endpoint to use
     */
    getConnector: (initialEndpoint: string) => ApiConnector<KeyT, VisibilityT, CustomT>;
    /**
     * The initial ID to use for getEndpoint
     */
    initialId: string | null;
}
export interface UseLazyCrudConnectorResult<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> {
    connector: LazyConnector<KeyT, VisibilityT, CustomT>;
}
declare const useLazyCrudConnector: <KeyT extends string, VisibilityT extends PageVisibility, CustomT>(params: UseLazyCrudConnectorParams<KeyT, VisibilityT, CustomT>) => UseLazyCrudConnectorResult<KeyT, VisibilityT, CustomT>;
export default useLazyCrudConnector;

import { Connector } from "../../../backend-integration/Connector";
import { ModelFieldName, ModelGetResponse, PageVisibility, ResponseMeta } from "../../../backend-integration";
declare class FormStoryConnector<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> extends Connector<KeyT, VisibilityT, CustomT> {
    create(): ModelGetResponse<KeyT>;
    delete(): Promise<void>;
    index(): Promise<[Record<KeyT, unknown>[], ResponseMeta]>;
    read(): ModelGetResponse<KeyT>;
    update(): ModelGetResponse<KeyT>;
}
export default FormStoryConnector;

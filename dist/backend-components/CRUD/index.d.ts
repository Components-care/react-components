import React from "react";
import Model, { ModelFieldName, PageVisibility } from "../../backend-integration/Model/Model";
import { Route } from "react-router-dom";
import { BackendDataGridProps } from "../DataGrid";
import { FormProps } from "../Form";
import { Permission } from "../../framework";
export interface CrudFormProps {
    /**
     * Callback for closing the form page
     */
    goBack: () => void;
}
export interface CrudProps<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT> {
    /**
     * The model to use
     */
    model: Model<KeyT, VisibilityT, CustomT>;
    /**
     * The properties to pass to form
     */
    formProps: Omit<FormProps<KeyT, VisibilityT, CustomT, CrudFormProps>, "id" | "model" | "children" | "customProps">;
    /**
     * The renderer function which returns the form component
     * @remarks Can be set to undefined to only render the Grid
     */
    children: FormProps<KeyT, VisibilityT, CustomT, CrudFormProps>["children"] | undefined;
    /**
     * The properties to pass to grid
     * @remarks onAddNew can be used to overwrite the new button action
     */
    gridProps: Omit<BackendDataGridProps<KeyT, VisibilityT, CustomT>, "model" | "enableDelete" | "disableExport" | "onEdit" | "forceRefreshToken" | "onAddNew"> & Pick<Partial<BackendDataGridProps<KeyT, VisibilityT, CustomT>>, "onAddNew">;
    /**
     * The delete record permission
     */
    deletePermission: Permission;
    /**
     * The view permission (shows form in read-only mode if edit permission is not present)
     * Set to `false` to only show the form page if edit permissions are present
     */
    readPermission: Permission;
    /**
     * The edit record permission
     */
    editPermission: Permission;
    /**
     * The create new record permission
     */
    newPermission: Permission;
    /**
     * The export records permission
     */
    exportPermission: Permission;
    /**
     * Disables routing and uses an internal state instead (useful for dialogs)
     */
    disableRouting?: boolean;
    /**
     * Unmounts the grid when showing form. Resets scroll in grid when coming back from form.
     * Useful for performance optimization or dialog handling where no Grid is shown
     */
    disableBackgroundGrid?: boolean;
    /**
     * If routing is disabled: set the initial view (id, "new" or null), defaults to null
     */
    initialView?: string | null;
    /**
     * Forbidden page to show if the user navigated to a URL he has no permissions for
     * If not set: Shows edit form in read-only mode
     */
    forbiddenPage?: React.ComponentType;
    /**
     * Route component to use
     */
    routeComponent?: typeof Route;
}
export interface CrudDispatch {
    /**
     * Force-refreshes the grid
     */
    refreshGrid: () => void;
}
export declare const useCrudDispatchContext: () => CrudDispatch;
declare const _default: <KeyT extends string, VisibilityT extends PageVisibility, CustomT>(props: CrudProps<KeyT, VisibilityT, CustomT>) => JSX.Element;
export default _default;

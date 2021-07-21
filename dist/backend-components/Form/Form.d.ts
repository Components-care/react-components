import React, { Dispatch, SetStateAction } from "react";
import Model, { ModelFieldName, ModelGetResponseRelations, PageVisibility } from "../../backend-integration/Model/Model";
/**
 * Pre submit handler for additional validations
 * Throw to cancel submit and display error.
 * Thrown error may be a Record<string, string> (validation error) or an normal Error (other error)
 */
export declare type CustomValidationHandler = () => Record<string, string>;
/**
 * Post submit handler to submit additional data for the submitted record
 */
export declare type PostSubmitHandler = (id: string) => Promise<void> | unknown;
export interface ErrorComponentProps {
    /**
     * The last error that happened
     */
    error: Error;
}
export interface PageProps<KeyT extends ModelFieldName, CustomPropsT> {
    /**
     * Indicates if the form is currently being submitted.
     * All submit buttons should be disabled if "isSubmitting" is true.
     */
    isSubmitting: boolean;
    /**
     * Is the form dirty?
     */
    dirty: boolean;
    /**
     * The values of the form, can be used for conditional rendering.
     * Only present if renderConditionally is set to true in FormProps
     */
    values?: Record<KeyT, unknown>;
    /**
     * Function to trigger form submit
     */
    submit: () => Promise<void>;
    /**
     * Function to trigger form reset
     */
    reset: () => void;
    /**
     * The current record id OR null if create new
     */
    id: string | null;
    /**
     * Custom props supplied by the parent for the children
     */
    customProps: CustomPropsT;
}
export interface FormProps<KeyT extends ModelFieldName, VisibilityT extends PageVisibility, CustomT, CustomPropsT> {
    /**
     * The data model this form follows
     */
    model: Model<KeyT, VisibilityT, CustomT>;
    /**
     * The current data entry id
     */
    id: string | null;
    /**
     * The error component that is used to display errors
     */
    errorComponent: React.ComponentType<ErrorComponentProps>;
    /**
     * The form contents
     */
    children: React.ComponentType<PageProps<KeyT, CustomPropsT>>;
    /**
     * Rerender page props if values changes
     */
    renderConditionally?: boolean;
    /**
     * Called upon successful submit
     * Contains data from server response
     * @param dataFromServer The data from the server response (model data)
     */
    onSubmit?: (dataFromServer: Record<KeyT, unknown>) => Promise<void> | void;
    /**
     * Custom props supplied by the parent for the children
     */
    customProps: CustomPropsT;
    /**
     * Only submit mounted fields
     */
    onlySubmitMounted?: boolean;
    /**
     * Only validate mounted fields
     */
    onlyValidateMounted?: boolean;
    /**
     * Is the form read-only?
     */
    readOnly?: boolean;
    /**
     * Nested form name
     * Enables nested form mode if set to non-empty string
     * Form is submitted with main form submit. Does not support multiple layers of nesting
     */
    nestedFormName?: string;
    /**
     * Submit preparation handler
     * Called after parent form submit, before this form submit
     * @param id The ID of the parent form (after submit)
     */
    nestedFormPreSubmitHandler?: (id: string) => Promise<void> | unknown;
}
export interface FormContextData {
    /**
     * The data model of this form
     */
    model: Model<ModelFieldName, PageVisibility, never>;
    /**
     * Relations of the model
     */
    relations: ModelGetResponseRelations<ModelFieldName>;
    /**
     * Helper function to display errors
     * @param error The error to display
     */
    setError: (error: Error) => void;
    /**
     * Marks the field as mounted
     * @param field The field name
     * @param mounted Is mounted?
     */
    markFieldMounted: (field: string, mounted: boolean) => void;
    /**
     * Sets the pre submit handler (for custom fields)
     * @param field custom field name (must not be in model)
     */
    setCustomValidationHandler: (field: string, handler: CustomValidationHandler) => void;
    /**
     * Removes a pre submit handler (for custom fields)
     * @param field custom field name (must not be in model)
     */
    removeCustomValidationHandler: (field: string) => void;
    /**
     * Sets the post submit handler (for custom fields)
     * @param field custom field name (must not be in model)
     */
    setPostSubmitHandler: (field: string, handler: PostSubmitHandler) => void;
    /**
     * Removes a post submit handler (for custom fields)
     * @param field custom field name (must not be in model)
     */
    removePostSubmitHandler: (field: string) => void;
    /**
     * Gets custom field state
     * @param field custom field name (must not be in model)
     */
    getCustomState: <T>(field: string) => T | undefined;
    /**
     * Sets custom field state
     * @param field custom field name (must not be in model)
     * @param data the set state action
     */
    setCustomState: <T>(field: string, data: Dispatch<SetStateAction<T | undefined>>) => void;
    /**
     * Set dirty custom field count (for fields modified by post submit handlers)
     * @deprecated Use setCustomFieldDirty instead
     */
    setCustomDirtyCounter: Dispatch<SetStateAction<number>>;
    /**
     * Set custom field dirty state
     * @param field The unique field name
     * @param dirty The dirty state
     */
    setCustomFieldDirty: (field: string, dirty: boolean) => void;
    /**
     * Is the form dirty?
     */
    dirty: boolean;
    /**
     * @see FormProps.onlySubmitMounted
     */
    onlySubmitMounted: boolean;
    /**
     * @see FormProps.onlyValidateMounted
     */
    onlyValidateMounted: boolean;
    /**
     * @see FormProps.readOnly
     */
    readOnly: boolean;
    /**
     * Is the form being submitted
     */
    submitting: boolean;
    /**
     * The current form values
     */
    values: Record<string, unknown>;
    /**
     * The initial form values
     */
    initialValues: Record<string, unknown>;
    /**
     * The current validation errors
     */
    errors: Record<string, string | null>;
    /**
     * The current field touched state
     */
    touched: Record<string, boolean>;
    /**
     * Sets a field value
     */
    setFieldValue: (field: string, value: unknown, validate?: boolean) => void;
    /**
     * Handle input blur events
     */
    handleBlur: React.FocusEventHandler<HTMLInputElement & HTMLElement>;
    /**
     * Set field touched state
     * @param field The field name
     * @param touched The new touched state
     * @param validate Should revalidate?
     */
    setFieldTouched: (field: string, touched?: boolean, validate?: boolean) => void;
    /**
     * Resets the form to server values
     */
    resetForm: () => void;
    /**
     * Validates the form and returns a list of validation errors
     * If the returned object is empty no validation errors occurred.
     */
    validateForm: () => Record<string, string>;
    /**
     * Parent form context (if present and FormProps.nestedFormName is set)
     */
    parentFormContext: FormContextData | null;
}
/**
 * Context which stores information about the current form so it can be used by fields
 */
export declare const FormContext: React.Context<FormContextData | null>;
export declare const useFormContext: () => FormContextData;
export declare type FormContextDataLite = Pick<FormContextData, "model" | "onlySubmitMounted" | "onlyValidateMounted" | "readOnly">;
export declare const FormContextLite: React.Context<FormContextDataLite | null>;
export declare const useFormContextLite: () => FormContextDataLite;
export interface FormNestedState {
    values: Record<string, unknown>;
    touched: Record<string, boolean>;
    errors: Record<string, string | null>;
}
declare const _default: <KeyT extends string, VisibilityT extends PageVisibility, CustomT, CustomPropsT>(props: FormProps<KeyT, VisibilityT, CustomT, CustomPropsT>) => JSX.Element;
export default _default;

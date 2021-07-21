import { DialogContextType } from "../../framework";
import { IDialogConfigConfirmAsync, IDialogConfigInputAsync, IDialogConfigSimple, IDialogConfigSign } from "./Types";
/**
 * Shows an awaitable confirm dialog
 * @param pushDialog The dialog context's (useDialogContext()) pushDialog function
 * @param props The dialog properties
 * @returns Awaitable promise, resolves if user clicks Yes, rejects otherwise
 */
export declare const showConfirmDialog: (pushDialog: DialogContextType[0], props: IDialogConfigConfirmAsync) => Promise<void>;
/**
 * Shows an awaitable confirm dialog (returns boolean)
 * @param pushDialog The dialog context's (useDialogContext()) pushDialog function
 * @param props The dialog properties
 * @returns Awaitable promise, resolves to true if user clicks yes, to false if user clicks no or closes dialog
 */
export declare const showConfirmDialogBool: (pushDialog: DialogContextType[0], props: IDialogConfigConfirmAsync) => Promise<boolean>;
/**
 * Shows an awaitable input dialog
 * @param pushDialog The dialog context's (useDialogContext()) pushDialog function
 * @param props The dialog properties
 * @returns Awaitable promise, resolves if user clicks Yes, rejects otherwise
 */
export declare const showInputDialog: (pushDialog: DialogContextType[0], props: IDialogConfigInputAsync) => Promise<string>;
/**
 * Shows an info dialog
 * @param pushDialog The dialog context's (useDialogContext()) pushDialog function
 * @param props The dialog properties (with buttons optional, defaults to an Okay button)
 */
export declare const showInfoDialog: (pushDialog: DialogContextType[0], props: Omit<IDialogConfigSimple, "buttons"> & Partial<Pick<IDialogConfigSimple, "buttons">>) => void;
/**
 * Shows signature pad dialog
 * @param pushDialog The dialog context's (useDialogContext()) pushDialog function
 * @param props The dialog properties for sign pad
 */
export declare const showSignPadDialog: (pushDialog: DialogContextType[0], props: IDialogConfigSign) => void;

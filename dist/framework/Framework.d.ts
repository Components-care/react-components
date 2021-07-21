import React from "react";
import { GetDefaultThemeCallback } from "./ThemeProvider";
/**
 * Properties for the Framework
 */
export interface IFrameworkProps {
    /**
     * Disable the Material-UI Date Picker utils?
     */
    disableMuiPickerUtils?: boolean;
    /**
     * The children which have access to the framework's capabilities (usually your whole app)
     */
    children: React.ReactNode;
}
export interface IFrameworkThemeProps {
    /**
     * Can be used to supply a default theme
     */
    defaultTheme?: GetDefaultThemeCallback;
}
declare type ICompleteFrameworkProps = IFrameworkProps & IFrameworkThemeProps;
declare const _default: React.MemoExoticComponent<(props: ICompleteFrameworkProps) => JSX.Element>;
export default _default;

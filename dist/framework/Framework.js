import React, { Suspense } from "react";
import { Loader } from "../standalone";
import { Router } from "react-router-dom";
import { DialogContextProvider, FrameworkHistory, CCI18nProvider } from ".";
import ThemeProvider, { getStandardTheme, } from "./ThemeProvider";
import { QueryClientProvider } from "react-query";
import { ModelDataStore } from "../backend-integration";
import MuiPickerUtils from "./MuiPickerUtils";
import PermissionContextProvider from "./PermissionContextProvider";
var loaderComponent = React.createElement(Loader, null);
/**
 * Provides:
 * - react-router instance
 * - dialog context
 * - i18n context (for components-care)
 * - react-query cache
 * - theme provider
 * - css baseline
 * - permission context
 * - material-ui date picker utils (optional, enabled by default, locale managed by i18n)
 */
var ComponentsCareFramework = function (props) { return (React.createElement(Suspense, { fallback: loaderComponent },
    React.createElement(CCI18nProvider, null,
        React.createElement(MuiPickerUtils, { disable: props.disableMuiPickerUtils },
            React.createElement(ThemeProvider, { defaultTheme: props.defaultTheme || getStandardTheme },
                React.createElement(QueryClientProvider, { client: ModelDataStore },
                    React.createElement(PermissionContextProvider, null,
                        React.createElement(Router, { history: FrameworkHistory },
                            React.createElement(DialogContextProvider, null, props.children))))))))); };
export default React.memo(ComponentsCareFramework);

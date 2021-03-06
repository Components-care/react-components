import React, { useCallback, useState } from "react";
import { IFrameworkProps } from "./Framework";
import {
	createMuiTheme,
	Theme,
	ThemeOptions,
	MuiThemeProvider,
	CssBaseline,
} from "@material-ui/core";

export type SetThemeAction = (theme: ThemeOptions) => void;
export type GetDefaultThemeCallback = (preferDark: boolean) => ThemeOptions;

export const getStandardTheme: GetDefaultThemeCallback = (
	preferDark: boolean
): ThemeOptions => ({
	palette: {
		type: preferDark ? "dark" : "light",
	},
});

export interface IThemeProviderProps extends IFrameworkProps {
	/**
	 * Provides the default Theme
	 */
	defaultTheme: GetDefaultThemeCallback;
}

/**
 * Context for the dialog state
 */
export const ThemeContext = React.createContext<SetThemeAction | undefined>(
	undefined
);

/**
 * Provides the application with an state to manage theming
 */
const ThemeProvider = (props: IThemeProviderProps) => {
	const [theme, setTheme] = useState<Theme>(() =>
		createMuiTheme(
			props.defaultTheme(matchMedia("(prefers-color-scheme: dark)").matches)
		)
	);
	const setNewTheme = useCallback<SetThemeAction>(
		(newTheme: ThemeOptions) => {
			setTheme(createMuiTheme(newTheme));
		},
		[setTheme]
	);

	return (
		<ThemeContext.Provider value={setNewTheme}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				<>{props.children}</>
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
};

export default React.memo(ThemeProvider);

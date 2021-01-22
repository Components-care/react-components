import React from "react";
import { TextField, TextFieldProps, IconButton } from "@material-ui/core";
import { Info as InfoIcon } from "@material-ui/icons";
import { InputLabelConfig, UIInputProps, useInputStyles } from "./CommonStyles";

export interface TextFieldWithHelpProps extends UIInputProps {
	openInfo?: () => void;
}

const TextFieldWithHelp = (props: TextFieldWithHelpProps & TextFieldProps) => {
	const { openInfo, important, ...muiProps } = props;
	const inputClasses = useInputStyles({ important });

	return (
		<TextField
			InputProps={{
				classes: inputClasses,
				endAdornment: openInfo && (
					<IconButton onClick={openInfo}>
						<InfoIcon color={"disabled"} />
					</IconButton>
				),
			}}
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			InputLabelProps={InputLabelConfig}
			{...muiProps}
		/>
	);
};

export default React.memo(TextFieldWithHelp);

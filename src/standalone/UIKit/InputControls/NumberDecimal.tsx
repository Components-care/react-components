import React, { useState } from "react";
import { TextFieldProps } from "@material-ui/core";
import TextFieldWithHelp from "../TextFieldWithHelp";
import { UIInputProps } from "../CommonStyles";
import ccI18n from "../../../i18n";
import Globalize from "globalize";

export interface NumberDecimalProps extends UIInputProps {
	infoText?: React.ReactNode;
	important?: boolean;
}

const NumberDecimal = (props: NumberDecimalProps & TextFieldProps) => {
	const { infoText, important, ...muiProps } = props;
	const [number, setNumber] = useState("");

	const handleChange = (
		event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const value = Number(event.target.value);
		const newValue = Globalize.default(ccI18n.language).formatNumber(value);

		setNumber(newValue);
	};

	return (
		<div>
			<TextFieldWithHelp
				{...muiProps}
				value={number}
				infoText={infoText}
				important={important}
				type="number"
				onChange={handleChange}
			/>
		</div>
	);
};

export default React.memo(NumberDecimal);

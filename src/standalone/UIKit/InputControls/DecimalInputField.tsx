import React, { useCallback } from "react";
import { TextFieldProps } from "@material-ui/core";
import TextFieldWithHelp, {
	TextFieldWithHelpProps,
} from "../TextFieldWithHelp";
import { parseLocalizedNumber, useInputCursorFix } from "../../../utils";
import useCCTranslations from "../../../utils/useCCTranslations";

export interface DecimalInputFieldProps extends TextFieldWithHelpProps {
	/**
	 * The current value or null if not set
	 */
	value: number | null;
	/**
	 * The change event handler
	 * @param evt
	 * @param value
	 */
	onChange?: (
		evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		value: number | null
	) => void;
}

const DecimalInputField = (
	props: DecimalInputFieldProps & Omit<TextFieldProps, "onChange" | "value">
) => {
	const { i18n } = useCCTranslations();
	const { value, onChange, ...muiProps } = props;
	const valueFormatted =
		value !== null ? value.toLocaleString(i18n.language) : "";
	const { handleCursorChange, cursorInputRef } = useInputCursorFix(
		valueFormatted
	);

	// on change handling
	const handleChange = useCallback(
		(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			handleCursorChange(event);
			if (!onChange) return;

			onChange(event, parseLocalizedNumber(event.target.value));
		},
		[onChange, handleCursorChange]
	);

	return (
		<TextFieldWithHelp
			{...muiProps}
			value={valueFormatted}
			onChange={handleChange}
			inputProps={{
				...muiProps.inputProps,
				ref: cursorInputRef,
			}}
		/>
	);
};

export default React.memo(DecimalInputField);

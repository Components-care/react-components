import React from "react";
import { FormHelperText, TextFieldProps, Typography } from "@material-ui/core";
import { ModelRenderParams } from "../../../index";
import { DecimalInputField, NumberFormatter } from "../../../../../standalone";
import { TextFieldWithHelpProps } from "../../../../../standalone/UIKit/TextFieldWithHelp";
import TypeNumber from "../../TypeNumber";

export type ModelDataTypeDecimalRendererCCParams = Omit<
	TextFieldProps,
	| "name"
	| "value"
	| "label"
	| "disabled"
	| "required"
	| "onChange"
	| "onBlur"
	| "error"
	| "multiline"
> &
	TextFieldWithHelpProps;

/**
 * Renders a text field
 */
class RendererDecimal extends TypeNumber {
	props?: ModelDataTypeDecimalRendererCCParams;

	constructor(props?: ModelDataTypeDecimalRendererCCParams) {
		super();

		this.props = props;
	}

	render(params: ModelRenderParams<number | null>): React.ReactElement {
		const {
			visibility,
			field,
			value,
			label,
			handleChange,
			handleBlur,
			errorMsg,
		} = params;

		if (visibility.disabled) return <></>;
		if (visibility.hidden) {
			return (
				<input
					type="hidden"
					name={field}
					value={this.stringify(value)}
					readOnly
					aria-hidden={"true"}
				/>
			);
		}
		if (visibility.editable) {
			if (visibility.grid) throw new Error("Not supported");

			return (
				<>
					<DecimalInputField
						fullWidth
						{...this.props}
						name={field}
						value={value}
						label={label}
						disabled={visibility.readOnly}
						required={visibility.required}
						onChange={(
							evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
							value: number | null
						) => {
							handleChange(evt.target.name, value);
						}}
						onBlur={handleBlur}
						error={!!errorMsg}
					/>
					<FormHelperText error={!!errorMsg}>{errorMsg}</FormHelperText>
				</>
			);
		}
		return (
			<Typography>
				{!visibility.grid && `${label}: `}
				<NumberFormatter value={value} />
			</Typography>
		);
	}
}

export default RendererDecimal;

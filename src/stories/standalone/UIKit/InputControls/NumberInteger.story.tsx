import React, { useState } from "react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import NumberInteger from "../../../../standalone/UIKit/InputControls/NumberInteger";
import { action, withActions } from "@storybook/addon-actions";

export const NumberIntegerStory = (): React.ReactElement => {
	const [value] = useState(text("value", ""));
	const onChange = action("onChange");

	const getValue = React.useCallback((num: number | null) => onChange(num), [
		onChange,
	]);

	return (
		<NumberInteger
			label={text("Label", "Number Integer Input")}
			placeholder={text("Placeholder", "Enter integer number")}
			fullWidth={boolean("Full Width", true)}
			value={(value as unknown) as number}
			getValue={getValue}
			autoFocus={true}
		/>
	);
};

NumberIntegerStory.storyName = "NumberInteger";
NumberIntegerStory.decorators = [withActions, withKnobs];
NumberIntegerStory.parameters = {
	knobs: {
		escapeHTML: false,
	},
};

import React, { useState } from "react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import DateTimeInput from "../../../../standalone/UIKit/InputControls/DateTimeInput";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { useDialogContext } from "../../../../framework";
import { showInfoDialog } from "../../../../non-standalone/Dialog";

export const DateTimeInputStory = (): React.ReactElement => {
	const [selectedDate, setSelectedDate] = useState<MaterialUiPickersDate>(null);
	const onChange = action("onChange");
	const [pushDialog] = useDialogContext();
	const dialogTitle = text("Dialog title", "Sample title");
	const infoText = text(
		"Info Text",
		"This is a pretty long info text which supports html. It really is.<br> It explains you what to write in here."
	);
	const dialogButtonLabel = text("Dialog button label", "Ok");
	const dialogButtonClick = action("onClose");

	const handleChange = React.useCallback(
		(date: MaterialUiPickersDate): MaterialUiPickersDate => {
			onChange(date);
			setSelectedDate(date);
			return date;
		},
		[onChange]
	);

	return (
		<DateTimeInput
			label={text("Label", "DateTime Field")}
			disabled={boolean("Disable", false)}
			fullWidth={boolean("100% Width", true)}
			important={boolean("Important", false)}
			placeholder={text("placeholder", "Please Select Date & Time")}
			value={selectedDate}
			onChange={handleChange}
			openInfo={() =>
				showInfoDialog(pushDialog, {
					title: dialogTitle,
					message: (
						<div
							dangerouslySetInnerHTML={{
								__html: infoText,
							}}
						/>
					),
					buttons: [
						{
							text: dialogButtonLabel,
							onClick: dialogButtonClick,
							autoFocus: true,
							color: "primary",
						},
					],
				})
			}
		/>
	);
};

DateTimeInputStory.storyName = "DateTimeInput";

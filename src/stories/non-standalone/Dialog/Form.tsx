import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { button, number, text, withKnobs } from "@storybook/addon-knobs";
import {
	Framework,
	DialogContext,
	IDialogButtonConfig,
	FormDialog,
	IDialogConfigSimple,
} from "../../..";
import { action } from "@storybook/addon-actions";
import { TextField } from "@material-ui/core";

export default {
	title: "Non-Standalone/Dialog",
	component: FormDialog,
	decorators: [withKnobs],
};

const MyCustomDialog = (props: IDialogConfigSimple) => {
	const [v1, setV1] = useState("Prefilled");
	const [v2, setV2] = useState("");
	const [v3, setV3] = useState("");
	return (
		<FormDialog
			{...props}
			inputs={[
				<TextField
					value={v1}
					key={"v1"}
					label={"Some prefilled input"}
					onChange={(evt: ChangeEvent<HTMLInputElement>) =>
						setV1(evt.target.value)
					}
					fullWidth
					margin={"normal"}
				/>,
				<TextField
					value={v2}
					key={"v2"}
					label={"Some empty input"}
					onChange={(evt: ChangeEvent<HTMLInputElement>) =>
						setV2(evt.target.value)
					}
					fullWidth
					margin={"normal"}
				/>,
				<TextField
					type={"password"}
					key={"v3"}
					value={v3}
					label={"Empty password input"}
					onChange={(evt: ChangeEvent<HTMLInputElement>) =>
						setV3(evt.target.value)
					}
					fullWidth
					margin={"normal"}
				/>,
			]}
		/>
	);
};

const DialogContent = () => {
	const [, setDialog] = useContext(DialogContext)!;

	const title = text("Title", "Storybook");
	const message = text("Message", "Enter your own text in Knobs!");
	const onClose = action("onClose");
	const buttons: IDialogButtonConfig[] = [];
	const buttonCount = number("Button Count", 1, {
		range: true,
		min: 1,
		max: 5,
		step: 1,
	});
	for (let i = 0; i < buttonCount; ++i) {
		buttons.push({
			text: text("Button " + i + " text", "Btn" + i),
			onClick: action("Button " + i + " onClick"),
			autoFocus: i === 0,
		});
	}

	const openDialog = () => {
		setDialog(
			<MyCustomDialog
				title={title}
				message={message}
				onClose={onClose}
				buttons={buttons}
			/>
		);
	};

	useEffect(openDialog, []);
	button("Open Dialog", openDialog);

	return <></>;
};

export const FormDialogStory = () => {
	return (
		<Framework>
			<DialogContent />
		</Framework>
	);
};

FormDialogStory.story = {
	name: "Form (custom)",
};
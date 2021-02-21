import React, { CSSProperties } from "react";
import {
	Select,
	SelectProps,
	withStyles,
	MenuItem,
	Checkbox,
	ListItemText,
	makeStyles,
	Theme,
	InputBase,
	SelectClassKey,
	InputLabel,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { MultiSelectOption } from "./TypesMultiSelect";
import { ClassNameMap } from "@material-ui/styles/withStyles";

export interface MultiSelectWithCheckBoxProps extends SelectProps {
	/**
	 * Selector options
	 */
	options: MultiSelectOption[];
	/**
	 * Selected values
	 */
	values: string[];
	/**
	 * Custom styles
	 */
	classes?: Partial<
		ClassNameMap<keyof ReturnType<typeof useStyles> | SelectClassKey>
	>;
}

export interface MultiSelectWithCheckBoxTheme {
	checkboxStyle?: CSSProperties;
	itemSelectedStyle?: CSSProperties;
	itemSelectedHoverStyle?: CSSProperties;
	itemTextPrimaryStyle?: CSSProperties;
	inputStyle?: CSSProperties;
	inputFocusStyle?: CSSProperties;
}

const useStyles = makeStyles((theme) => ({
	checkboxStyle: {
		borderRadius: 4,
		width: 16,
		height: 16,
		marginRight: 10,
		...theme.componentsCare?.selectorWithCheckbox?.checkboxStyle,
	},
}));

const MenuItemCustom = withStyles((theme) => ({
	selected: {
		backgroundColor: "white !important",
		...theme.componentsCare?.selectorWithCheckbox?.itemSelectedStyle,
		"&:hover": {
			backgroundColor: "rgba(0, 0, 0, 0.04) !important",
			...theme.componentsCare?.selectorWithCheckbox?.itemSelectedHoverStyle,
		},
	},
}))(MenuItem);

const ListItemTextCustom = withStyles((theme) => ({
	primary: {
		fontSize: 13,
		...theme.componentsCare?.selectorWithCheckbox?.itemTextPrimaryStyle,
	},
}))(ListItemText);

const InputCustom = withStyles((theme: Theme) => ({
	input: {
		borderRadius: 4,
		position: "relative",
		backgroundColor: theme.palette.background.paper,
		border: "1px solid #ced4da",
		fontSize: 13,
		padding: 9,
		transition: theme.transitions.create(["border-color", "box-shadow"]),
		...theme.componentsCare?.selectorWithCheckbox?.inputStyle,
		"&:focus": {
			borderRadius: 4,
			borderColor: theme.palette.primary.main,
			...theme.componentsCare?.selectorWithCheckbox?.inputFocusStyle,
		},
	},
}))(InputBase);

const MultiSelectWithCheckBox = (props: MultiSelectWithCheckBoxProps) => {
	const classes = useStyles(props);
	return (
		<>
			{props.label && <InputLabel shrink>{props.label}</InputLabel>}
			<Select
				{...props}
				multiple
				displayEmpty
				value={props.values}
				input={<InputCustom />}
				IconComponent={ExpandMore}
				MenuProps={{
					anchorOrigin: {
						vertical: "bottom",
						horizontal: "left",
					},
					transformOrigin: {
						vertical: "top",
						horizontal: "left",
					},
					getContentAnchorEl: null,
					PaperProps: {
						style: {
							marginTop: 5,
							border: "1px solid #d3d4d5",
						},
					},
				}}
			>
				{props.options.map((option: MultiSelectOption) => {
					return (
						<MenuItemCustom key={option.label} value={option.value}>
							<Checkbox
								checked={props.values.indexOf(option.value) > -1}
								className={classes.checkboxStyle}
							/>
							<ListItemTextCustom primary={option.label} />
						</MenuItemCustom>
					);
				})}
			</Select>
		</>
	);
};

export default React.memo(MultiSelectWithCheckBox);

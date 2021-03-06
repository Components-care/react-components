import React, { useCallback } from "react";
import { MultiSelectorData, MultiSelectWithCheckBox } from "../..";
import {
	Checkbox,
	FormControlLabel,
	Grid,
	Typography,
} from "@material-ui/core";

export interface GridMultiSelectFilterProps {
	/**
	 * Optional label for the filter
	 */
	label?: string;
	/**
	 * All available options
	 */
	options: MultiSelectorData[];
	/**
	 * The currently selected options
	 */
	selected: string[];
	/**
	 * Updates the currently selected options
	 * @param selected The selected options
	 */
	onSelect: (selected: string[]) => void;
	/**
	 * Is the grid filter rendered in a dialog?
	 */
	dialog: boolean;
}

const GridMultiSelectFilter = (props: GridMultiSelectFilterProps) => {
	const { label, options, selected, onSelect, dialog } = props;

	const handleDialogCheckboxToggle = useCallback(
		(evt: React.ChangeEvent<{ name: string }>, checked: boolean) => {
			onSelect(
				checked
					? selected.concat([evt.target.name])
					: selected.filter((entry) => entry !== evt.target.name)
			);
		},
		[selected, onSelect]
	);

	const getSelected = useCallback(
		(values: string[]): string => {
			return values
				.map(
					(selected) =>
						options.find((option) => option.value === selected)?.label
				)
				.filter((selected) => selected)
				.join(", ");
		},
		[options]
	);

	const handleSelectorChange = useCallback(
		(event: React.ChangeEvent<{ value: unknown }>) => {
			onSelect(event.target.value as string[]);
		},
		[onSelect]
	);

	if (dialog) {
		return (
			<Grid item xs={12} md={6} lg={3} container spacing={2}>
				{label && (
					<Grid item xs={12}>
						<Typography>{label}</Typography>
					</Grid>
				)}
				{options.map((option) => (
					<Grid item xs={12} key={option.value}>
						<FormControlLabel
							control={
								<Checkbox
									name={option.value}
									checked={selected.includes(option.value)}
									onChange={handleDialogCheckboxToggle}
								/>
							}
							label={option.label}
						/>
					</Grid>
				))}
			</Grid>
		);
	} else {
		return (
			<Grid item xs={4}>
				<MultiSelectWithCheckBox
					label={label}
					options={options}
					values={selected}
					onChange={handleSelectorChange}
					renderValue={(selected) => getSelected(selected as string[])}
					fullWidth
				/>
			</Grid>
		);
	}
};

export default React.memo(GridMultiSelectFilter);

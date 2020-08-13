import React, { ChangeEvent } from "react";
import {
	Box,
	Button,
	Checkbox,
	Divider,
	FormControlLabel,
	Grid,
	makeStyles,
	Paper,
	Theme,
	Typography,
} from "@material-ui/core";
import { IDataGridColumnDef, IDataGridColumnProps } from "../index";

export interface IDataGridSettingsDialogProps extends IDataGridColumnProps {
	closeGridSettings: () => void;
	toggleColumnLock: (evt: ChangeEvent<HTMLInputElement>) => void;
	toggleColumnVisibility: (evt: ChangeEvent<HTMLInputElement>) => void;
	lockedColumns: string[];
	hiddenColumns: string[];
}

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		padding: 16,
		borderBottom: `1px solid ${theme.palette.divider}`,
		borderRadius: 8,
	},
}));

const SettingsDialog = (props: IDataGridSettingsDialogProps) => {
	const classes = useStyles();

	return (
		<Paper elevation={0} className={classes.wrapper}>
			<Typography variant={"h6"}>Lock/Unlock Columns</Typography>
			<Divider />
			<Grid justify={"space-between"} container>
				{props.columns.slice(1).map((column: IDataGridColumnDef) => (
					<Grid item xs={4} key={column.field}>
						<FormControlLabel
							control={
								<Checkbox
									checked={props.lockedColumns.includes(column.field)}
									onChange={props.toggleColumnLock}
									value={column.field}
								/>
							}
							label={column.headerName}
						/>
					</Grid>
				))}
			</Grid>
			<Typography variant={"h6"}>Show/Hide Columns</Typography>
			<Divider />
			<Grid justify={"space-between"} container>
				{props.columns.slice(1).map((column: IDataGridColumnDef) => (
					<Grid item xs={4} key={column.field}>
						<FormControlLabel
							control={
								<Checkbox
									checked={!props.hiddenColumns.includes(column.field)}
									onChange={props.toggleColumnVisibility}
									value={column.field}
								/>
							}
							label={column.headerName}
						/>
					</Grid>
				))}
			</Grid>
			<Divider />
			<Grid container justify={"flex-end"}>
				<Grid item>
					<Box m={2}>
						<Button onClick={props.closeGridSettings} variant={"contained"}>
							Close
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default React.memo(SettingsDialog);
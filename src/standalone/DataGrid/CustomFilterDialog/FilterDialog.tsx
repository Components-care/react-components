import React from "react";
import {
	Box,
	Button,
	Divider,
	Grid,
	Paper,
	Typography,
} from "@material-ui/core";
import { useDataGridStyles } from "../index";
import i18n from "../../../i18n";
import { IDataGridFilterBarProps } from "../Header/FilterBar";

export interface DataGridCustomFilterDialogProps
	extends Omit<IDataGridFilterBarProps, "inDialog"> {
	/**
	 * Callback to close custom filter pop-over
	 */
	closeFilterDialog: () => void;
	/**
	 * The component to render
	 */
	customFilters: React.ComponentType<IDataGridFilterBarProps>;
}

const FilterDialog = (props: DataGridCustomFilterDialogProps) => {
	const classes = useDataGridStyles();
	const { customFilters: Filters, customData, setCustomData } = props;

	return (
		<Paper elevation={0} className={classes.contentOverlayPaper}>
			<Typography variant={"h6"}>
				{i18n.t("standalone.data-grid.custom-filters.title") || ""}
			</Typography>
			<Divider />
			<Grid justify={"space-between"} spacing={2} container>
				<Filters
					customData={customData}
					setCustomData={setCustomData}
					inDialog
				/>
			</Grid>
			<Divider />
			<Grid container justify={"flex-end"}>
				<Grid item>
					<Box m={2}>
						<Button onClick={props.closeFilterDialog} variant={"contained"}>
							{i18n.t("standalone.data-grid.settings.close") || ""}
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default React.memo(FilterDialog);
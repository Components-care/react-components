import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header, { IDataGridHeaderProps } from "./Header";
import Footer, { IDataGridFooterProps } from "./Footer";
import Settings from "./Settings";
import Content from "./Content";

export type IDataGridProps = IDataGridHeaderProps &
	IDataGridFooterProps &
	IDataGridColumnProps;

export interface IDataGridColumnProps {
	columns: IDataGridColumnDef[];
}

export interface IDataGridColumnDef {
	field: string;
	headerName: string;

	// internal fields, do not set
	isLocked?: boolean;
}

export interface IDataGridState {
	search: string;
	rowsPerPage: number;
	rowsTotal: number;
	pageIndex: number;
	showSettings: boolean;
	hiddenColumns: string[];
	lockedColumns: string[];
}

export const DataGridStateContext = React.createContext<
	[IDataGridState, Dispatch<SetStateAction<IDataGridState>>] | undefined
>(undefined);

const useStyles = makeStyles((theme: Theme) => ({
	wrapper: {
		width: "100%",
		height: "100%",
		border: `1px solid ${theme.palette.divider}`,
		borderRadius: 8,
	},
	middle: {
		borderTop: `1px solid ${theme.palette.divider}`,
		borderBottom: `1px solid ${theme.palette.divider}`,
		position: "relative",
	},
}));

export default React.memo((props: IDataGridProps) => {
	const { columns } = props;

	const classes = useStyles();
	const statePack = useState<IDataGridState>(() => ({
		search: "",
		rowsPerPage: 25,
		rowsTotal: 100,
		pageIndex: 0,
		showSettings: false,
		hiddenColumns: [],
		lockedColumns: [],
	}));
	const [state] = statePack;
	const { hiddenColumns, lockedColumns } = state;

	const visibleColumns = useMemo(
		() =>
			columns
				.filter((column) => !hiddenColumns.includes(column.field))
				.map((column) => ({
					...column,
					isLocked: lockedColumns.includes(column.field),
				})),
		[columns, hiddenColumns, lockedColumns]
	);

	return (
		<Grid
			container
			direction={"column"}
			justify={"space-between"}
			alignItems={"stretch"}
			className={classes.wrapper}
		>
			<DataGridStateContext.Provider value={statePack}>
				<Grid item>
					<Header />
				</Grid>
				<Grid item xs className={classes.middle}>
					<Settings columns={columns} />
					<Content columns={visibleColumns} rowsPerPage={state.rowsPerPage} />
				</Grid>
				<Grid item>
					<Footer />
				</Grid>
			</DataGridStateContext.Provider>
		</Grid>
	);
});

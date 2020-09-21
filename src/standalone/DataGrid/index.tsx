import React, {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Grid, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Header, { IDataGridHeaderProps } from "./Header";
import Footer, { IDataGridFooterProps } from "./Footer";
import Settings from "./Settings";
import Content from "./Content";
import { IFilterDef } from "./Content/FilterEntry";
import {
	DataGridColumnState,
	IDataGridColumnsState,
} from "./Content/ContentHeader";
import { Loader } from "../index";
import { debounce } from "../../utils";
import { dataGridPrepareFiltersAndSorts } from "./CallbackUtil";

export type IDataGridProps = IDataGridHeaderProps &
	IDataGridFooterProps &
	IDataGridColumnProps &
	IDataGridCallbacks;

export interface IDataGridCallbacks {
	/**
	 * Loads data for the grid
	 * @param page The page to load
	 * @param rows The amount of rows per page
	 * @param quickFilter The search box content
	 * @param additionalFilters Additional filters specified by you
	 * @param fieldFilter The field filter contents
	 * @param sort The sort settings
	 * @returns The loaded data (resolve) or an error (reject)
	 */
	loadData: (
		page: number,
		rows: number,
		quickFilter: string,
		additionalFilters: DataGridAdditionalFilters,
		fieldFilter: IDataGridFieldFilter,
		sort: DataGridSortSetting[]
	) => DataGridData | Promise<DataGridData>;
	/**
	 * Extracts additional filters from the provided custom data
	 * @param customData The custom user-defined state-stored data
	 */
	getAdditionalFilters?: (customData: unknown) => DataGridAdditionalFilters;
}

export type DataGridAdditionalFilters = { [name: string]: unknown };
export type DataGridSortSetting = { field: string; direction: -1 | 1 };

export interface IDataGridColumnProps {
	/**
	 * Column definitions
	 */
	columns: IDataGridColumnDef[];
	/**
	 * Placeholder for search box
	 */
	searchPlaceholder?: string;
	/**
	 * Add new handler, do not specify to disable add new button
	 */
	onAddNew?: () => void;
	/**
	 * Edit handler
	 * @param id The id to edit
	 */
	onEdit?: (id: string) => void;
	/**
	 * Delete handler, do not specify to disable deletion
	 * @param invert if invert is true, delete everything except ids, otherwise only delete ids
	 * @param ids The list of ids to (not) delete
	 */
	onDelete?: (invert: boolean, ids: string[]) => void;
}

export type IDataGridFieldFilter = { [field: string]: IFilterDef };

export interface IDataGridColumnDef {
	/**
	 * The field name
	 */
	field: string;
	/**
	 * The field label
	 */
	headerName: string;
	/**
	 * The data type
	 */
	type: "string" | "number";

	// internal fields, do not set, will be overwritten
	/**
	 * Is the column locked to the start
	 */
	isLocked?: boolean;
	/**
	 * Key to re-calc locked element position
	 */
	fixedColumnKey?: string;
}

export interface IDataGridColumnState {
	/**
	 * The current sort setting
	 */
	sort: -1 | 0 | 1;
	/**
	 * The sort priority (lower = higher priority)
	 */
	sortOrder?: number;
	/**
	 * The enabled filter
	 */
	filter: IFilterDef | undefined;
}

export interface DataGridData {
	/**
	 * Total amount of rows
	 */
	rowsTotal: number;
	/**
	 * Row data
	 */
	rows: DataGridRowData[];
}

export type DataGridRowData = { id: string } & {
	[key: string]: string | number | { toString: () => string } | null;
};

export type DataGridCustomDataType = { [key: string]: unknown };

export interface IDataGridState {
	/**
	 * The current search (quick filter) string
	 */
	search: string;
	/**
	 * The rows per page
	 */
	rowsPerPage: number;
	/**
	 * The total amount of rows
	 */
	rowsTotal: number;
	/**
	 * The current page (zero based index)
	 */
	pageIndex: number;
	/**
	 * Show the settings popover
	 */
	showSettings: boolean;
	/**
	 * The hidden fields
	 */
	hiddenColumns: string[];
	/**
	 * The locked fields
	 */
	lockedColumns: string[];
	/**
	 * Is everything selected? (inverts selection)
	 */
	selectAll: boolean;
	/**
	 * The selected rows
	 */
	selectedRows: string[];
	/**
	 * The rows to be shown
	 */
	rows: DataGridRowData[] | null;
	/**
	 * Error returned by loadData
	 */
	dataLoadError: Error | null;
	/**
	 * Should loadData be called?
	 */
	refreshData: boolean;
	/**
	 * Custom user-defined data
	 */
	customData: DataGridCustomDataType;
}

export const DataGridStateContext = React.createContext<
	[IDataGridState, Dispatch<SetStateAction<IDataGridState>>] | undefined
>(undefined);

export const DataGridPropsContext = React.createContext<
	IDataGridProps | undefined
>(undefined);

export const DataGridColumnsStateContext = React.createContext<
	DataGridColumnState | undefined
>(undefined);

export const DataGridDefaultState: IDataGridState = {
	search: "",
	rowsPerPage: 25,
	rowsTotal: 0,
	pageIndex: 0,
	showSettings: false,
	hiddenColumns: [],
	lockedColumns: [],
	selectAll: false,
	selectedRows: [],
	rows: null,
	dataLoadError: null,
	refreshData: true,
	customData: {},
};

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

const DataGrid = (props: IDataGridProps) => {
	const { columns, loadData, getAdditionalFilters } = props;

	const classes = useStyles();
	const statePack = useState<IDataGridState>(DataGridDefaultState);
	const [state, setState] = statePack;
	const {
		search,
		pageIndex,
		rowsPerPage,
		rows,
		dataLoadError,
		hiddenColumns,
		lockedColumns,
		refreshData,
	} = state;

	const visibleColumns = useMemo(
		() =>
			columns
				.filter((column) => !hiddenColumns.includes(column.field))
				.filter((column) => lockedColumns.includes(column.field))
				.concat(
					columns
						.filter((column) => !hiddenColumns.includes(column.field))
						.filter((column) => !lockedColumns.includes(column.field))
				)
				.map((column) => ({
					...column,
					isLocked: lockedColumns.includes(column.field),
					fixedColumnKey: lockedColumns.includes(column.field)
						? Math.random().toString()
						: "",
				})),
		[columns, hiddenColumns, lockedColumns]
	);

	const columnsStatePack = useState<IDataGridColumnsState>({});
	const [columnsState] = columnsStatePack;

	// refresh data if desired
	useEffect(() => {
		if (!refreshData) return;

		const [sorts, fieldFilter] = dataGridPrepareFiltersAndSorts(columnsState);

		void (async () => {
			try {
				const data = await loadData(
					pageIndex + 1,
					rowsPerPage,
					search,
					getAdditionalFilters ? getAdditionalFilters(state.customData) : {},
					fieldFilter,
					sorts
				);
				setState((prevState) => ({
					...prevState,
					rowsTotal: data.rowsTotal,
					rows: data.rows,
					refreshData: false,
				}));
			} catch (err) {
				setState((prevState) => ({
					...prevState,
					dataLoadError: err as Error,
					refreshData: false,
				}));
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refreshData]);

	// instant refresh on pagination change
	const refresh = useCallback(
		() =>
			setState((prevState) => ({
				...prevState,
				refreshData: true,
			})),
		[setState]
	);

	useEffect(refresh, [refresh, pageIndex, rowsPerPage]);

	// debounced refresh on filter and sort changes
	const debouncedRefresh = useMemo(() => debounce(refresh, 500), [refresh]);

	useEffect(debouncedRefresh, [debouncedRefresh, search, columnsState]);

	return (
		<Grid
			container
			direction={"column"}
			justify={"space-between"}
			alignItems={"stretch"}
			className={classes.wrapper}
		>
			<DataGridPropsContext.Provider value={props}>
				<DataGridStateContext.Provider value={statePack}>
					<DataGridColumnsStateContext.Provider value={columnsStatePack}>
						<Grid item>
							<Header />
						</Grid>
						<Grid item xs className={classes.middle}>
							<Settings columns={columns} />
							{rows === null && dataLoadError === null && <Loader />}
							{rows === null && dataLoadError !== null && dataLoadError.message}
							{rows !== null && rows.length === 0 && "No Data!"}
							{rows && (
								<Content
									columns={visibleColumns}
									rowsPerPage={state.rowsPerPage}
									rows={rows}
								/>
							)}
						</Grid>
						<Grid item>
							<Footer />
						</Grid>
					</DataGridColumnsStateContext.Provider>
				</DataGridStateContext.Provider>
			</DataGridPropsContext.Provider>
		</Grid>
	);
};

export default React.memo(DataGrid);

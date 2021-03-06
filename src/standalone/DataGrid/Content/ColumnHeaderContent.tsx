import React, { SyntheticEvent, useCallback, useState } from "react";
import {
	Box,
	Grid,
	IconButton,
	Popover,
	PopoverOrigin,
	Tooltip,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import FilterEntry, { IFilterDef } from "./FilterEntry";
import { ModelFilterType } from "../../../backend-integration/Model";
import { IDataGridColumnDef, useDataGridStyles } from "../DataGrid";
import { FilterIcon, FilterActiveIcon } from "../../Icons";
import useCCTranslations from "../../../utils/useCCTranslations";
import { combineClassNames } from "../../../utils";

export interface IDataGridContentColumnHeaderContentProps {
	/**
	 * The header columnHeaderLabel
	 */
	headerName: string;
	/**
	 * Allow resizing of column (disabled for locked columns)
	 */
	enableResize: boolean;
	/**
	 * Start dragging callback
	 */
	startDrag: () => void;
	/**
	 * Automatic resize callback
	 */
	autoResize: () => void;
	/**
	 * The currently active sort
	 */
	sort: -1 | 0 | 1;
	/**
	 * The sort priority (lower = higher priority)
	 */
	sortOrder: number | undefined;
	/**
	 * The currently active filter
	 */
	filter?: IFilterDef;
	/**
	 * Can the column be filtered?
	 */
	filterable: boolean;
	/**
	 * Updates the filter
	 * @param value The new filter
	 */
	onFilterChange: (value: IFilterDef) => void;
	/**
	 * The type of the column
	 */
	columnType: ModelFilterType;
	/**
	 * The filter data of the column
	 */
	filterData: IDataGridColumnDef["filterData"];
}

const anchorOrigin: PopoverOrigin = {
	vertical: "bottom",
	horizontal: "center",
};

const transformOrigin: PopoverOrigin = {
	vertical: "top",
	horizontal: "center",
};

const ColumnHeaderContent = (
	props: IDataGridContentColumnHeaderContentProps
) => {
	const { t } = useCCTranslations();
	const classes = useDataGridStyles();
	const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(
		null
	);

	const openFilter = useCallback(
		(event: React.MouseEvent<HTMLButtonElement>) => {
			event.stopPropagation();
			setFilterAnchorEl(event.currentTarget);
		},
		[setFilterAnchorEl]
	);
	const closeFilter = useCallback(() => setFilterAnchorEl(null), [
		setFilterAnchorEl,
	]);
	const preventPropagation = useCallback(
		(evt: SyntheticEvent<unknown>) => evt.stopPropagation(),
		[]
	);

	const CurrentFilterIcon =
		props.filter && props.filter.value1 ? FilterActiveIcon : FilterIcon;

	return (
		<>
			<Grid container justify={"flex-start"} wrap={"nowrap"}>
				<Grid
					item
					className={combineClassNames([
						classes.disableClick,
						classes.columnHeaderLabel,
					])}
					key={"header"}
				>
					<Tooltip title={props.headerName}>
						<span>{props.headerName}</span>
					</Tooltip>
				</Grid>
				<Grid item className={classes.columnHeaderSortIcon}>
					{props.sort === -1 && <ArrowDownward />}
					{props.sort === 1 && <ArrowUpward />}
				</Grid>
				<Grid item xs>
					{props.sort !== 0 && props.sortOrder?.toString()}
				</Grid>
				{props.filterable && (
					<Grid item key={"filter"}>
						<Tooltip title={t("standalone.data-grid.content.filter") || ""}>
							<IconButton
								className={classes.columnHeaderFilterButton}
								onClick={openFilter}
							>
								<CurrentFilterIcon className={classes.columnHeaderFilterIcon} />
							</IconButton>
						</Tooltip>
					</Grid>
				)}
			</Grid>
			{props.enableResize && (
				<div
					className={classes.columnHeaderResizer}
					onMouseDown={props.startDrag}
					onClick={preventPropagation}
					onDoubleClick={props.autoResize}
				/>
			)}
			<Popover
				open={filterAnchorEl !== null}
				anchorEl={filterAnchorEl}
				onClose={closeFilter}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
				onBackdropClick={preventPropagation}
				onClick={preventPropagation}
			>
				<Box m={2}>
					<Grid container className={classes.columnHeaderFilterPopup}>
						<FilterEntry
							valueType={props.columnType}
							onChange={props.onFilterChange}
							value={props.filter}
							valueData={props.filterData}
							close={closeFilter}
							depth={1}
						/>
					</Grid>
				</Box>
			</Popover>
		</>
	);
};

export default React.memo(ColumnHeaderContent);

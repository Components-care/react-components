import React, { useState } from "react";
import {
	Checkbox,
	FormControlLabel,
	Grid,
	List,
	ListItem,
	ListItemText,
	MenuItem,
	Select,
	TextField,
} from "@material-ui/core";
import FilterCombinator from "./FilterCombinator";
import { ModelFilterType } from "../../../backend-integration/Model";
import {
	DataGridSetFilterData,
	IDataGridColumnDef,
	useDataGridProps,
	useDataGridStyles,
} from "../DataGrid";
import { LocalizedKeyboardDatePicker } from "../../LocalizedDateTimePickers";
import { DateType } from "@date-io/type";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";

export type FilterType =
	| "contains"
	| "notContains"
	| "equals"
	| "notEqual"
	| "empty"
	| "notEmpty"
	| "startsWith"
	| "endsWith"
	| "lessThan"
	| "lessThanOrEqual"
	| "greaterThan"
	| "greaterThanOrEqual"
	| "inRange"
	| "inSet";
export type FilterComboType = "or" | "and";

export interface IFilterDef {
	/**
	 * Type of comparison
	 */
	type: FilterType;
	/**
	 * Value for comparison, always present
	 */
	value1: string;
	/**
	 * Second value for comparison, only present in select cases:
	 * - type == "inRange"
	 */
	value2: string;
	/**
	 * How to threat next filter entry (and or or)
	 */
	nextFilterType?: FilterComboType;
	/**
	 * The next filter to apply to the column
	 */
	nextFilter?: IFilterDef;
}

export interface DataGridContentFilterEntryProps {
	/**
	 * The type of the column value (string, number, etc). See ValueType
	 */
	valueType: ModelFilterType;
	/**
	 * Metadata for the filter
	 */
	valueData: IDataGridColumnDef["filterData"];
	/**
	 * The currently active filter
	 */
	value?: IFilterDef;
	/**
	 * Update filter
	 * @param def The new filter
	 */
	onChange: (def: IFilterDef) => void;
	/**
	 * The depth of the filter in the given filter chain
	 */
	depth: number;
}

const FilterEntry = (props: DataGridContentFilterEntryProps) => {
	const { onChange, depth } = props;
	const { t } = useTranslation(undefined, { i18n });
	const { filterLimit, isFilterSupported } = useDataGridProps();

	const [enumFilterSearch, setEnumFilterSearch] = useState("");

	const classes = useDataGridStyles();

	const maxDepth = filterLimit;
	let filterType: FilterType =
		props.value?.type ||
		(props.valueType === "string"
			? "contains"
			: props.valueType === "enum"
			? "inSet"
			: "equals");
	let filterValue = props.value?.value1 || "";
	let filterValue2 = props.value?.value2 || "";
	let subFilterComboType: FilterComboType =
		props.value?.nextFilterType || "and";
	let subFilter = props.value?.nextFilter || undefined;

	const checkSupport = (
		dataType: ModelFilterType,
		filterType: FilterType
	): boolean => {
		if (!isFilterSupported) return true;
		return isFilterSupported(dataType, filterType);
	};

	const updateParent = () =>
		onChange({
			type: filterType,
			value1: filterValue,
			value2: filterValue2,
			nextFilterType: subFilterComboType,
			nextFilter: subFilter,
		});

	const onFilterTypeChange = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		// clear magic value
		if (filterType === "empty" || filterType === "notEmpty") {
			filterValue = "";
		}
		filterType = event.target.value as FilterType;
		// set magic value to mark filter as active
		if (filterType === "empty" || filterType === "notEmpty") {
			filterValue = filterType;
		}
		filterValue2 = "";
		updateParent();
	};
	const onFilterValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		filterValue = event.target.value;
		if (!filterValue) {
			subFilterComboType = "and";
			subFilter = undefined;
		}
		updateParent();
	};
	const onFilterValueChangeDate = (date: DateType | null) => {
		if (!date) {
			filterValue = "";
			subFilterComboType = "and";
			subFilter = undefined;
		} else {
			filterValue = date.toISOString();
		}
		updateParent();
	};
	const onFilterValueChangeBool = () => {
		filterType = "equals";
		if (!filterValue) {
			filterValue = "true";
		} else if (filterValue === "true") {
			filterValue = "false";
		} else {
			filterValue = "";
		}
		updateParent();
	};
	const onFilterValueChangeEnumAll = (
		_: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => {
		if (checked) {
			filterValue = (props.valueData as DataGridSetFilterData)
				.map((entry) => entry.value)
				.join(",");
		} else {
			filterValue = "";
		}
		updateParent();
	};
	const onFilterValueChangeEnum = (
		evt: React.ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => {
		let currentlyChecked = filterValue.split(",");
		if (!checked) {
			currentlyChecked = currentlyChecked.filter(
				(val) => val !== evt.target.value
			);
		} else {
			currentlyChecked.push(evt.target.value);
		}
		filterValue = currentlyChecked.join(",");
		updateParent();
	};
	const onFilterValue2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
		filterValue2 = event.target.value;
		updateParent();
	};
	const onFilterValue2ChangeDate = (date: DateType | null) => {
		filterValue = date ? date.toISOString() : "";
		updateParent();
	};
	const onSubFilterTypeChange = (value: FilterComboType) => {
		subFilterComboType = value;
		updateParent();
	};
	const onSubFilterChange = (value: IFilterDef) => {
		subFilter = value;
		updateParent();
	};

	let filterTypeMenuItems = [
		checkSupport(props.valueType, "equals") && (
			<MenuItem key={"equals"} value={"equals"}>
				{t("standalone.data-grid.content.filter-type.eq")}
			</MenuItem>
		),
		checkSupport(props.valueType, "notEqual") && (
			<MenuItem key={"notEqual"} value={"notEqual"}>
				{t("standalone.data-grid.content.filter-type.not-eq")}
			</MenuItem>
		),
		checkSupport(props.valueType, "empty") && (
			<MenuItem key={"empty"} value={"empty"}>
				{t("standalone.data-grid.content.filter-type.empty")}
			</MenuItem>
		),
		checkSupport(props.valueType, "notEmpty") && (
			<MenuItem key={"notEmpty"} value={"notEmpty"}>
				{t("standalone.data-grid.content.filter-type.not-empty")}
			</MenuItem>
		),
	];
	if (props.valueType === "string") {
		filterTypeMenuItems.push(
			checkSupport(props.valueType, "contains") && (
				<MenuItem key={"contains"} value={"contains"}>
					{t("standalone.data-grid.content.filter-type.contains")}
				</MenuItem>
			),
			checkSupport(props.valueType, "notContains") && (
				<MenuItem key={"notContains"} value={"notContains"}>
					{t("standalone.data-grid.content.filter-type.not-contains")}
				</MenuItem>
			),
			checkSupport(props.valueType, "startsWith") && (
				<MenuItem key={"startsWith"} value={"startsWith"}>
					{t("standalone.data-grid.content.filter-type.starts-with")}
				</MenuItem>
			),
			checkSupport(props.valueType, "endsWith") && (
				<MenuItem key={"endsWith"} value={"endsWith"}>
					{t("standalone.data-grid.content.filter-type.ends-with")}
				</MenuItem>
			)
		);
	} else if (props.valueType === "number") {
		filterTypeMenuItems.push(
			checkSupport(props.valueType, "lessThan") && (
				<MenuItem key={"lessThan"} value={"lessThan"}>
					{t("standalone.data-grid.content.filter-type.lt")}
				</MenuItem>
			),
			checkSupport(props.valueType, "lessThanOrEqual") && (
				<MenuItem key={"lessThanOrEqual"} value={"lessThanOrEqual"}>
					{t("standalone.data-grid.content.filter-type.lte")}
				</MenuItem>
			),
			checkSupport(props.valueType, "greaterThan") && (
				<MenuItem key={"greaterThan"} value={"greaterThan"}>
					{t("standalone.data-grid.content.filter-type.gt")}
				</MenuItem>
			),
			checkSupport(props.valueType, "greaterThanOrEqual") && (
				<MenuItem key={"greaterThanOrEqual"} value={"greaterThanOrEqual"}>
					{t("standalone.data-grid.content.filter-type.gte")}
				</MenuItem>
			),
			checkSupport(props.valueType, "inRange") && (
				<MenuItem key={"inRange"} value={"inRange"}>
					{t("standalone.data-grid.content.filter-type.in-range")}
				</MenuItem>
			)
		);
	} else if (props.valueType === "date") {
		filterTypeMenuItems.push(
			checkSupport(props.valueType, "lessThan") && (
				<MenuItem key={"lessThan"} value={"lessThan"}>
					{t("standalone.data-grid.content.filter-type.lt-date")}
				</MenuItem>
			),
			checkSupport(props.valueType, "lessThanOrEqual") && (
				<MenuItem key={"lessThanOrEqual"} value={"lessThanOrEqual"}>
					{t("standalone.data-grid.content.filter-type.lte-date")}
				</MenuItem>
			),
			checkSupport(props.valueType, "greaterThan") && (
				<MenuItem key={"greaterThan"} value={"greaterThan"}>
					{t("standalone.data-grid.content.filter-type.gt-date")}
				</MenuItem>
			),
			checkSupport(props.valueType, "greaterThanOrEqual") && (
				<MenuItem key={"greaterThanOrEqual"} value={"greaterThanOrEqual"}>
					{t("standalone.data-grid.content.filter-type.gte-date")}
				</MenuItem>
			),
			checkSupport(props.valueType, "inRange") && (
				<MenuItem key={"inRange"} value={"inRange"}>
					{t("standalone.data-grid.content.filter-type.in-range-date")}
				</MenuItem>
			)
		);
	}

	filterTypeMenuItems = filterTypeMenuItems.filter((e) => e);

	return (
		<>
			{(props.valueType === "string" ||
				props.valueType === "number" ||
				props.valueType === "date") && (
				<>
					<Grid item xs={12}>
						<Select onChange={onFilterTypeChange} value={filterType} fullWidth>
							{filterTypeMenuItems}
						</Select>
					</Grid>
					{filterType !== "empty" && filterType !== "notEmpty" && (
						<Grid item xs={12}>
							{props.valueType === "date" ? (
								<LocalizedKeyboardDatePicker
									value={filterValue === "" ? null : filterValue}
									onChange={onFilterValueChangeDate}
									fullWidth
								/>
							) : (
								<TextField
									value={filterValue}
									onChange={onFilterValueChange}
									fullWidth
								/>
							)}
						</Grid>
					)}
					{filterType === "inRange" && (
						<Grid item xs={12}>
							{props.valueType === "date" ? (
								<LocalizedKeyboardDatePicker
									value={filterValue2 === "" ? null : filterValue2}
									onChange={onFilterValue2ChangeDate}
									fullWidth
								/>
							) : (
								<TextField
									value={filterValue2}
									onChange={onFilterValue2Change}
									fullWidth
								/>
							)}
						</Grid>
					)}
				</>
			)}
			{props.valueType === "boolean" && (
				<Grid item xs={12}>
					<FormControlLabel
						control={
							<Checkbox
								checked={filterValue === "true"}
								onClick={onFilterValueChangeBool}
								indeterminate={!filterValue}
							/>
						}
						label={t(
							"standalone.data-grid.content.bool-filter." +
								(filterValue || "any")
						)}
					/>
				</Grid>
			)}
			{props.valueType === "enum" && (
				<>
					<Grid item xs={12}>
						<TextField
							value={enumFilterSearch}
							onChange={(evt: React.ChangeEvent<HTMLInputElement>) =>
								setEnumFilterSearch(evt.target.value)
							}
							placeholder={t("standalone.data-grid.content.set-filter.search")}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12} className={classes.setFilterContainer}>
						<List>
							<ListItem>
								<Checkbox
									checked={
										filterValue ===
										(props.valueData as DataGridSetFilterData)
											.map((entry) => entry.value)
											.join(",")
									}
									onChange={onFilterValueChangeEnumAll}
								/>
								<ListItemText>
									{t("standalone.data-grid.content.set-filter.select-all")}
								</ListItemText>
							</ListItem>
							{(props.valueData as DataGridSetFilterData)
								.filter((entry) =>
									entry.getLabelText().toLowerCase().includes(enumFilterSearch)
								)
								.map((entry) => (
									<ListItem key={entry.value}>
										<Checkbox
											value={entry.value}
											checked={filterValue.split(",").includes(entry.value)}
											onChange={onFilterValueChangeEnum}
										/>
										<ListItemText>
											{(entry.getLabel || entry.getLabelText)()}
										</ListItemText>
									</ListItem>
								))}
						</List>
					</Grid>
				</>
			)}
			{filterValue &&
				props.valueType !== "enum" &&
				props.valueType !== "boolean" &&
				(!maxDepth || depth <= maxDepth) && (
					<>
						<FilterCombinator
							value={subFilterComboType}
							onChange={onSubFilterTypeChange}
						/>
						<FilterEntry
							onChange={onSubFilterChange}
							valueType={props.valueType}
							valueData={props.valueData}
							value={subFilter}
							depth={depth + 1}
						/>
					</>
				)}
		</>
	);
};

export default React.memo(FilterEntry);

import { DataGridSortSetting, IDataGridFieldFilter } from "./index";
import { IDataGridColumnsState } from "./Content/ContentHeader";

export const dataGridPrepareFiltersAndSorts = (
	columnsState: IDataGridColumnsState
): [DataGridSortSetting[], IDataGridFieldFilter] => {
	const baseSorts = [];
	const fieldFilter: IDataGridFieldFilter = {};

	for (const field in columnsState) {
		if (!columnsState.hasOwnProperty(field)) continue;

		if (columnsState[field].sort !== 0) {
			baseSorts.push({
				field,
				...columnsState[field],
			});
		}

		const filter = columnsState[field].filter;
		if (filter && filter.value1) {
			fieldFilter[field] = filter;
		}
	}

	const sorts: DataGridSortSetting[] = baseSorts
		.sort((a, b) => a.sortOrder! - b.sortOrder!)
		.map((col) => ({ field: col.field, direction: col.sort as -1 | 1 }));

	return [sorts, fieldFilter];
};
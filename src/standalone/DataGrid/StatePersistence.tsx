import React, { useContext, useEffect } from "react";
import {
	IDataGridColumnsState,
	IDataGridState,
	useDataGridColumnState,
	useDataGridColumnsWidthState,
	useDataGridState,
} from "./DataGrid";

export interface DataGridPersistentState {
	columnState: IDataGridColumnsState;
	columnWidth: Record<string, number>;
	state: Partial<
		Pick<
			IDataGridState,
			"search" | "hiddenColumns" | "lockedColumns" | "customData"
		>
	>;
}

export type DataGridPersistentStateContextType = [
	Partial<DataGridPersistentState> | undefined,
	(data: DataGridPersistentState) => void
];
export const DataGridPersistentStateContext = React.createContext<
	DataGridPersistentStateContextType | undefined
>(undefined);

/**
 * Logical component which takes care of optional state persistence for the data grid
 * @remarks Used internally in DataGrid, do not use in your code!
 */
const StatePersistence = () => {
	const persistedContext = useContext(DataGridPersistentStateContext);
	const [, setPersisted] = persistedContext || [];
	const [state] = useDataGridState();
	const [columnState] = useDataGridColumnState();
	const [columnWidthState] = useDataGridColumnsWidthState();

	// save on changes
	useEffect(() => {
		if (!setPersisted) return;

		setPersisted({
			columnState,
			columnWidth: columnWidthState,
			state: {
				search: state.search,
				hiddenColumns: state.hiddenColumns,
				lockedColumns: state.lockedColumns,
				customData: state.customData,
			},
		});
	}, [setPersisted, state, columnState, columnWidthState]);

	return <></>;
};

export default React.memo(StatePersistence);

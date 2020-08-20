import React, { useEffect, useRef, useState } from "react";
import { FixedDataGridCell } from "./CustomCells";
import { TableCellProps } from "@material-ui/core";

export interface IDataGridFixedCellProps extends TableCellProps {
	/**
	 * The fixed cell contents
	 */
	children: React.ReactNode;
	/**
	 * The cell component
	 */
	cellComponent?: React.ComponentType<TableCellProps>;
}

const FixedCell = (props: IDataGridFixedCellProps) => {
	const { cellComponent, ...childProps } = props;
	const CellComponent = cellComponent || FixedDataGridCell;

	const cellRef = useRef<typeof HTMLTableDataCellElement>();
	const [calcPos, setCalcPos] = useState(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (cellRef.current) {
			const ref = (cellRef.current as unknown) as HTMLTableCellElement;

			if (ref.style.left) {
				return;
			}

			if (!calcPos) {
				ref.style.left = "";
				ref.style.position = "";

				setCalcPos(true);
			} else {
				ref.style.left = `${ref.offsetLeft}px`;
			}
		}
	});

	return <CellComponent ref={cellRef} {...childProps} />;
};

export default React.memo(FixedCell);

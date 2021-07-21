import { DataGridRowData, IDataGridColumnDef, IDataGridLoadDataParameters } from "../standalone/DataGrid/DataGrid";
/**
 * Applies the given filters, sort and pagination settings to the given data
 * @param rowData The data to filter, sort and paginate
 * @param params The filter, sort and pagination settings
 * @param columnDef Metadata about the columns
 * @returns An array containing the filtered, sorted and paginated data in slot 0
 *          and the total amount of filtered rows before pagination in slot 2
 */
declare const filterSortPaginate: (rowData: DataGridRowData[], params: IDataGridLoadDataParameters, columnDef: IDataGridColumnDef[]) => [DataGridRowData[], number];
export default filterSortPaginate;

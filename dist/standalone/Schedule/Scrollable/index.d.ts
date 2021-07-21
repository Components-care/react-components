import React from "react";
import { WithStyles } from "@material-ui/core";
import { IDayData } from "../Common/DayContents";
/**
 * Callback to load week data from a data source
 * @param weekOffset The week relative to the current week of year
 * 					 Example: -1 for last week, 0 for this week, 1 for next week
 * @returns A promise containing the data for the days of the week, may throw an
 * 			error. Format: IDayData[weekday starting Monday][n]
 */
export declare type LoadWeekCallback = (weekOffset: number) => IDayData[][] | Promise<IDayData[][]>;
export interface IProps extends WithStyles {
    /**
     * CSS Class which specifies the infinite scroll height
     */
    wrapperClass: string;
    /**
     * The callback to load data for a week
     */
    loadWeekCallback: LoadWeekCallback;
}
declare const _default: React.ComponentType<Pick<IProps, "wrapperClass" | "loadWeekCallback"> & import("@material-ui/core").StyledComponentProps<never>>;
export default _default;

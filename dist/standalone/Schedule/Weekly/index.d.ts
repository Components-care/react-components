import React from "react";
import { WithStyles } from "@material-ui/core";
import { IDayData } from "../Common/DayContents";
import { WithTranslation } from "react-i18next";
export interface IProps extends WithStyles, WithTranslation {
    /**
     * Callback to load data of this week
     * @param weekOffset
     */
    loadData: (weekOffset: number) => IDayData[][] | Promise<IDayData[][]>;
}
declare const WeekViewWithTranslation: (props: Omit<IProps, keyof WithTranslation | keyof WithStyles>) => React.ReactElement;
export default WeekViewWithTranslation;

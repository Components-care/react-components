import React from "react";
import { DatePickerProps } from "@material-ui/pickers";
declare type LocalizedDatePickerProps = Omit<DatePickerProps, "invalidLabel" | "cancelLabel" | "clearLabel" | "okLabel" | "todayLabel" | "invalidDateMessage" | "minDateMessage" | "maxDateMessage" | "format" | "refuse" | "rifmFormatter">;
declare const _default: React.MemoExoticComponent<(props: LocalizedDatePickerProps) => JSX.Element>;
export default _default;

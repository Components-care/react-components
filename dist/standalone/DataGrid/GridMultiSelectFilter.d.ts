import React from "react";
import { MultiSelectorData } from "../..";
export interface GridMultiSelectFilterProps {
    /**
     * Optional label for the filter
     */
    label?: string;
    /**
     * All available options
     */
    options: MultiSelectorData[];
    /**
     * The currently selected options
     */
    selected: string[];
    /**
     * Updates the currently selected options
     * @param selected The selected options
     */
    onSelect: (selected: string[]) => void;
    /**
     * Is the grid filter rendered in a dialog?
     */
    dialog: boolean;
}
declare const _default: React.MemoExoticComponent<(props: GridMultiSelectFilterProps) => JSX.Element>;
export default _default;

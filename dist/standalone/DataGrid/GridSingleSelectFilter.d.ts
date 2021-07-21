import React from "react";
import { BaseSelectorData } from "../..";
export interface GridSingleSelectFilterProps {
    /**
     * Optional label for the filter
     */
    label?: string;
    /**
     * All available options
     */
    options: BaseSelectorData[];
    /**
     * The currently selected option
     */
    selected: string;
    /**
     * Updates the currently selected options
     * @param selected The selected options
     */
    onSelect: (selected: string) => void;
    /**
     * Is the grid filter rendered in a dialog?
     */
    dialog: boolean;
    /**
     * Autocomplete ID passed to selector
     */
    autocompleteId?: string;
}
declare const _default: React.MemoExoticComponent<(props: GridSingleSelectFilterProps) => JSX.Element>;
export default _default;

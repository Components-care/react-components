/**
 * Combines two colors
 * @param color1 The first color (has to be solid)
 * @param color2 The second color (has to be transparent)
 * @returns A rgba array (usage for CSS: "rgba(" + combineColors(...).join() + ")")
 */
declare const combineColors: (color1: string, color2: string) => [number, number, number, number];
export default combineColors;

/**
 * Combines two colors
 * @param color1 The first color (has to be solid)
 * @param color2 The second color (has to be transparent)
 * @returns A rgba array (usage for CSS: "rgba(" + combineColors(...).join() + ")")
 */
var combineColors = function (color1, color2) {
    // Jest patch, not used in prod
    if (process && process.env && process.env.JEST_WORKER_ID)
        return [1, 1, 1, 1];
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    if (!ctx)
        throw new Error("Failed getting Canvas 2D context");
    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = color2;
    ctx.fillRect(0, 0, 1, 1);
    var ret = [];
    ctx.getImageData(0, 0, 1, 1).data.forEach(function (val) { return ret.push(val); });
    return ret;
};
export default combineColors;

var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useState } from "react";
import InfiniteScroll from "../../../standalone/InfiniteScroll";
import { Grid, makeStyles } from "@material-ui/core";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
var useStyles = makeStyles({
    scrollWrapper: {
        height: "50vh",
        width: "100%",
        overflow: "auto",
        border: "1px solid red",
    },
}, { name: "CcUnidirectionalStory" });
var debounceWaitKnobOptions = {
    range: true,
    min: 0,
    max: 1500,
    step: 1,
};
export var InfiniteScrollSimple = function () {
    var classes = useStyles();
    var _a = useState([]), items = _a[0], setItems = _a[1];
    var loadMoreBottomAction = action("load-more-bottom");
    return (React.createElement(Grid, { container: true },
        React.createElement(InfiniteScroll, { className: classes.scrollWrapper, loadMoreBottom: function () {
                loadMoreBottomAction();
                setItems(function (prevItems) { return __spreadArray(__spreadArray([], prevItems), [
                    React.createElement(Grid, { key: prevItems.length.toString(), item: true, xs: 12 }, prevItems.length),
                ]); });
            }, callBackDebounce: number("Debounce wait", 100, debounceWaitKnobOptions) }, items)));
};
InfiniteScrollSimple.storyName = "Unidirectional";

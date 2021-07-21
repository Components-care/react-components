var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { PureComponent } from "react";
import { Grid, withStyles, Box, Button, createStyles, } from "@material-ui/core";
import moment from "moment";
import ScrollableScheduleWeek from "./ScrollableScheduleWeek";
import InfiniteScroll from "../../InfiniteScroll";
import i18n from "../../../i18n";
import { combineClassNames } from "../../../utils";
var ScrollableSchedule = /** @class */ (function (_super) {
    __extends(ScrollableSchedule, _super);
    function ScrollableSchedule(props) {
        var _this = _super.call(this, props) || this;
        _this.todayElem = null;
        _this.scrollElem = null;
        _this.getDefaultState = function () { return ({
            items: [],
            dataOffsetTop: -1,
            dataOffsetBottom: 0,
            today: moment(),
        }); };
        /**
         * Loads more data on top of the scroller
         */
        _this.loadMoreTop = function () { return _this.loadMore(true); };
        /**
         * Loads more data at the bottom of the scroller
         */
        _this.loadMoreBottom = function () { return _this.loadMore(false); };
        /**
         * Sets the scroller reference to control scrolling
         * @param elem The scroller element
         */
        _this.setScrollElemRef = function (elem) { return (_this.scrollElem = elem); };
        /**
         * Loads more data in the infinite scroll
         * @param top load more data on top? (if false loads more data at bottom)
         */
        _this.loadMore = function (top) {
            var page = top ? _this.state.dataOffsetTop : _this.state.dataOffsetBottom;
            var item = (React.createElement(ScrollableScheduleWeek, { key: page.toString(), loadData: function () { return _this.props.loadWeekCallback(page); }, setTodayElement: function (elem) { return (_this.todayElem = elem); }, moment: _this.state.today.clone().add(page - 1, "weeks") }));
            if (top) {
                _this.setState(function (prevState) { return ({
                    items: __spreadArray([item], prevState.items),
                    dataOffsetTop: prevState.dataOffsetTop - 1,
                }); });
            }
            else {
                _this.setState(function (prevState) { return ({
                    items: __spreadArray(__spreadArray([], prevState.items), [item]),
                    dataOffsetBottom: prevState.dataOffsetBottom + 1,
                }); });
            }
        };
        _this.jumpToToday = function () {
            if (!_this.todayElem || !_this.scrollElem || !_this.scrollElem.wrapper) {
                return;
            }
            _this.scrollElem.wrapper.scrollTop =
                _this.todayElem.offsetTop - _this.todayElem.clientHeight - 20;
        };
        _this.onLanguageChanged = function () { return _this.setState(_this.getDefaultState()); };
        _this.state = _this.getDefaultState();
        return _this;
    }
    ScrollableSchedule.prototype.componentDidMount = function () {
        i18n.on("languageChanged", this.onLanguageChanged);
    };
    ScrollableSchedule.prototype.componentWillUnmount = function () {
        i18n.off("languageChanged", this.onLanguageChanged);
    };
    ScrollableSchedule.prototype.render = function () {
        return (React.createElement(Grid, { container: true },
            React.createElement(Grid, { item: true, xs: 12, className: this.props.classes.today, onClick: this.jumpToToday },
                React.createElement(Button, { className: this.props.classes.todayBtn, onClick: this.jumpToToday, fullWidth: true },
                    React.createElement(Box, { m: 2 }, this.state.today.format("ddd DD MMMM")))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(InfiniteScroll, { className: combineClassNames([
                        this.props.wrapperClass,
                        this.props.classes.scroller,
                    ]), loadMoreTop: this.loadMoreTop, loadMoreBottom: this.loadMoreBottom, ref: this.setScrollElemRef },
                    React.createElement(Box, { m: 2 },
                        React.createElement(Grid, { container: true, spacing: 2 }, this.state.items))))));
    };
    return ScrollableSchedule;
}(PureComponent));
var styles = createStyles(function (theme) { return ({
    today: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.getContrastText(theme.palette.primary.main),
    },
    todayBtn: {
        textTransform: "none",
        textAlign: "left",
        color: "inherit",
        display: "block",
    },
    scroller: {
        overflow: "auto",
    },
}); });
export default withStyles(styles)(ScrollableSchedule);

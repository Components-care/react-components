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
import React, { PureComponent } from "react";
import { debounce } from "../../utils";
/**
 * Provides infinite scrolling to whatever is inside it
 */
var InfiniteScroll = /** @class */ (function (_super) {
    __extends(InfiniteScroll, _super);
    function InfiniteScroll(props) {
        var _this = _super.call(this, props) || this;
        _this.wrapper = null;
        _this.setScrollerRef = function (ref) {
            _this.wrapper = ref;
        };
        _this.handleResize = function () {
            if (!_this.wrapper)
                return;
            if (_this.wrapper.scrollHeight > _this.wrapper.clientHeight + 24) {
                if (!_this.state.initScroll) {
                    _this.wrapper.scrollTop = 24;
                    _this.setState({
                        initScroll: true,
                    });
                }
            }
            else {
                _this.state.loadMoreBottom();
            }
        };
        _this.handleScroll = function () {
            if (!_this.wrapper)
                return;
            if (_this.wrapper.scrollTop === 0 && _this.state.loadMoreTop) {
                _this.wrapper.scrollTop = 1;
                _this.state.loadMoreTop();
            }
            else if (_this.wrapper.scrollTop ===
                _this.wrapper.scrollHeight - _this.wrapper.clientHeight) {
                _this.state.loadMoreBottom();
            }
        };
        var debounceWait = _this.props.callBackDebounce !== undefined
            ? _this.props.callBackDebounce
            : 100;
        _this.state = {
            initScroll: !_this.props.loadMoreTop,
            loadMoreTop: debounceWait === 0
                ? _this.props.loadMoreTop
                    ? debounce(_this.props.loadMoreTop, debounceWait)
                    : undefined
                : _this.props.loadMoreTop,
            loadMoreBottom: debounceWait === 0
                ? _this.props.loadMoreBottom
                : debounce(_this.props.loadMoreBottom, debounceWait),
        };
        return _this;
    }
    InfiniteScroll.prototype.componentDidMount = function () {
        var _a;
        (_a = this.wrapper) === null || _a === void 0 ? void 0 : _a.addEventListener("scroll", this.handleScroll);
        this.handleResize();
    };
    InfiniteScroll.prototype.componentDidUpdate = function (prevProps) {
        if (prevProps.children !== this.props.children) {
            this.handleResize();
        }
    };
    InfiniteScroll.prototype.componentWillUnmount = function () {
        var _a;
        (_a = this.wrapper) === null || _a === void 0 ? void 0 : _a.removeEventListener("scroll", this.handleScroll);
    };
    InfiniteScroll.prototype.render = function () {
        return (React.createElement("div", { className: this.props.className, ref: this.setScrollerRef }, this.props.children));
    };
    return InfiniteScroll;
}(PureComponent));
export default InfiniteScroll;

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useCallback, useState } from "react";
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { Badge, Box, Divider, Grid, IconButton, Popover, Tooltip, Typography, } from "@material-ui/core";
import InfiniteScroll from "../InfiniteScroll";
import { makeStyles } from "@material-ui/core/styles";
import i18n from "../../i18n";
var anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
};
var transformOrigin = {
    vertical: "top",
    horizontal: "right",
};
var ageParser = function (timestamp) {
    var delta = new Date().getTime() - timestamp.getTime();
    if (delta < 5000 /* 5s */)
        return "just now";
    if (delta < 60000 /* 1m */)
        return "less than a minute ago";
    if (delta < 3600000 /* 1h */) {
        var minutes = delta / 60000;
        return minutes.toFixed(0) + " " + (minutes > 1 ? "minutes" : "minute") + " ago";
    }
    if (delta < 86400000 /* 1d */) {
        var hours = delta / 3600000;
        return hours.toFixed(0) + " " + (hours > 1 ? "hours" : "hour") + " ago";
    }
    var days = delta / 86400000;
    return days.toFixed(0) + " " + (days > 1 ? "days" : "day") + " ago";
};
var defaultImageStyle = {
    width: "auto",
    height: 96,
    borderRadius: "100%",
};
var unreadStyle = {};
var readStyle = __assign(__assign({}, unreadStyle), { opacity: 0.7 });
var defaultRenderer = function (notification) { return (React.createElement(Box, { p: 2, style: notification.read ? readStyle : unreadStyle, key: notification.id },
    React.createElement(Grid, { container: true, spacing: 2 },
        React.createElement(Grid, { item: true, xs: true }, notification.image && (React.createElement("img", { style: defaultImageStyle, src: notification.image, alt: "" }))),
        React.createElement(Grid, { item: true, xs: 9 },
            React.createElement(Box, { py: 2 },
                React.createElement(Grid, { container: true, spacing: 2 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, null, notification.message)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "body2" },
                            React.createElement(React.Fragment, null, notification.origin && React.createElement(React.Fragment, null,
                                notification.origin,
                                " ")),
                            React.createElement(Tooltip, { title: notification.created.toLocaleString(i18n.language) },
                                React.createElement("span", null, ageParser(notification.created)))))))),
        React.createElement(Grid, { item: true, xs: 12 },
            React.createElement(Divider, null))))); };
var useStyles = makeStyles({
    notificationArea: {
        height: "50vh",
        overflow: "auto",
    },
}, { name: "CcNotifications" });
var Notifications = function (props) {
    var classes = useStyles(props);
    var _a = useState(null), anchor = _a[0], setAnchor = _a[1];
    var onOpen = props.onOpen;
    var onIconClick = useCallback(function (evt) {
        setAnchor(evt.currentTarget);
        if (onOpen)
            onOpen(evt);
    }, [setAnchor, onOpen]);
    var onClose = useCallback(function () {
        setAnchor(null);
    }, [setAnchor]);
    var renderer = props.notificationRenderer || defaultRenderer;
    var notifications = props.notifications.filter(function (not) { return !not.expires || not.expires > new Date(); });
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { onClick: onIconClick },
            React.createElement(Badge, __assign({ badgeContent: notifications.filter(function (not) { return !not.read; }).length, max: 99, color: "error" }, props.BadgeProps),
                React.createElement(NotificationsIcon, null))),
        React.createElement(Popover, __assign({ open: !!anchor, anchorEl: anchor, anchorOrigin: anchorOrigin, transformOrigin: transformOrigin, onClose: onClose }, props.PopoverProps),
            React.createElement(Box, { p: 2 },
                React.createElement(Grid, { container: true, spacing: 2 },
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Typography, { variant: "h6" }, "Notifications")),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(Divider, null)),
                    React.createElement(Grid, { item: true, xs: 12 },
                        React.createElement(InfiniteScroll, { className: classes.notificationArea, loadMoreBottom: props.loadMore }, notifications.map(renderer))))))));
};
export default React.memo(Notifications);

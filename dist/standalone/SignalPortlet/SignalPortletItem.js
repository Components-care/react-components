import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, ListItem, ListItemAvatar, ListItemText, } from "@material-ui/core";
var useStyles = makeStyles(function (theme) { return ({
    itemColorActive: function (props) { return ({
        color: theme.palette.getContrastText(props.colorPresent),
        backgroundColor: props.colorPresent,
    }); },
    itemColorInactive: function (props) { return ({
        color: theme.palette.getContrastText(props.colorNotPresent),
        backgroundColor: props.colorNotPresent,
    }); },
    root: {},
    listAvatar: {},
    listText: {},
}); }, { name: "CcSignalPortletItem" });
var SignalPortletItem = function (props) {
    var count = props.count, link = props.link, text = props.text;
    var classes = useStyles(props);
    var history = useHistory();
    var handleClick = useCallback(function () {
        if (link) {
            history.push(link);
        }
    }, [history, link]);
    var counterClass = count
        ? classes.itemColorActive
        : classes.itemColorInactive;
    return (React.createElement(ListItem, { button: !!link /* https://github.com/mui-org/material-ui/issues/14971 */, onClick: handleClick, className: classes.root },
        React.createElement(ListItemAvatar, { className: classes.listAvatar },
            React.createElement(Avatar, { className: counterClass }, count.toString())),
        React.createElement(ListItemText, { className: classes.listText }, text)));
};
export default React.memo(SignalPortletItem);

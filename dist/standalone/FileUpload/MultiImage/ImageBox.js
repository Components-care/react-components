import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, IconButton } from "@material-ui/core";
import { Close as CloseIcon, ArrowBack as PrevIcon, ArrowForward as NextIcon, Delete as DeleteIcon, } from "@material-ui/icons";
import { combineClassNames, makeThemeStyles, useDropZone, } from "../../../utils";
var useStyles = makeStyles(function (theme) { return ({
    root: {
        borderRadius: 8,
        position: "relative",
        height: "100%",
        "& button": {
            visibility: "hidden",
            opacity: 0,
            transition: "visibility 0s linear 300ms, opacity 300ms",
        },
        "&:hover button": {
            visibility: "visible",
            opacity: 1,
            transition: "visibility 0s linear 0s, opacity 300ms",
        },
    },
    background: {
        backgroundColor: theme.palette.secondary.light,
    },
    clickable: {
        cursor: "pointer",
    },
    dragging: {
        border: "1px solid " + theme.palette.primary.main,
    },
    fullScreenImageWrapper: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: 8,
    },
    removeBtn: {
        padding: theme.spacing(1),
        position: "absolute",
        top: 0,
        right: 0,
    },
    prevBtn: {
        position: "absolute",
        top: "50%",
        left: 0,
        transform: "translateY(-50%)",
    },
    nextBtn: {
        position: "absolute",
        top: "50%",
        right: 0,
        transform: "translateY(-50%)",
    },
}); }, { name: "CcImageBox" });
var useThemeStyles = makeThemeStyles(function (theme) { var _a, _b, _c; return (_c = (_b = (_a = theme.componentsCare) === null || _a === void 0 ? void 0 : _a.fileUpload) === null || _b === void 0 ? void 0 : _b.multiImage) === null || _c === void 0 ? void 0 : _c.imageBox; }, "CcImageBox", useStyles);
var ImageBox = function (props) {
    var image = props.image, width = props.width, height = props.height, onClick = props.onClick, onFilesDropped = props.onFilesDropped, onRemove = props.onRemove, onNextImage = props.onNextImage, onPrevImage = props.onPrevImage, disableBackground = props.disableBackground;
    var classes = useThemeStyles(props);
    var _a = useDropZone(onFilesDropped), handleDragOver = _a.handleDragOver, handleDrop = _a.handleDrop, dragging = _a.dragging;
    var _b = useState(false), dialogOpen = _b[0], setDialogOpen = _b[1];
    var openDialog = useCallback(function () {
        setDialogOpen(true);
    }, []);
    var closeDialog = useCallback(function () {
        setDialogOpen(false);
    }, []);
    var handleRemove = useCallback(function (evt) {
        evt.stopPropagation();
        if (onRemove)
            onRemove();
    }, [onRemove]);
    var handlePrevImage = useCallback(function (evt) {
        evt.stopPropagation();
        if (onPrevImage)
            onPrevImage();
    }, [onPrevImage]);
    var handleNextImage = useCallback(function (evt) {
        evt.stopPropagation();
        if (onNextImage)
            onNextImage();
    }, [onNextImage]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onClick: onClick === null ? undefined : onClick !== null && onClick !== void 0 ? onClick : openDialog, onDragOver: handleDragOver, onDrop: handleDrop, style: { width: width, height: height }, className: combineClassNames([
                classes.root,
                !disableBackground && classes.background,
                dragging && classes.dragging,
                onClick !== null && classes.clickable,
            ]) },
            onRemove && (React.createElement(IconButton, { onClick: handleRemove, className: classes.removeBtn },
                React.createElement(DeleteIcon, null))),
            onPrevImage && (React.createElement(IconButton, { onClick: handlePrevImage, className: classes.prevBtn },
                React.createElement(PrevIcon, null))),
            onNextImage && (React.createElement(IconButton, { onClick: handleNextImage, className: classes.nextBtn },
                React.createElement(NextIcon, null))),
            React.createElement("img", { src: image, alt: "", className: classes.image })),
        !onClick && (React.createElement(Dialog, { open: dialogOpen, fullScreen: true, onClose: closeDialog },
            React.createElement(DialogContent, null,
                React.createElement("div", { className: classes.fullScreenImageWrapper },
                    React.createElement(IconButton, { onClick: closeDialog, className: classes.removeBtn },
                        React.createElement(CloseIcon, null)),
                    onPrevImage && (React.createElement(IconButton, { onClick: handlePrevImage, className: classes.prevBtn },
                        React.createElement(PrevIcon, null))),
                    onNextImage && (React.createElement(IconButton, { onClick: handleNextImage, className: classes.nextBtn },
                        React.createElement(NextIcon, null))),
                    React.createElement("img", { src: image, alt: "", className: classes.image })))))));
};
export default React.memo(ImageBox);

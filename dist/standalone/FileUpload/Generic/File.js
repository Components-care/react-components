import React, { useCallback } from "react";
import { Grid, Tooltip, Typography } from "@material-ui/core";
import { InsertDriveFileOutlined as DefaultFileIcon, CancelOutlined as CancelIcon, } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { ExcelFileIcon, PdfFileIcon, PowerPointFileIcon, WordFileIcon, } from "../FileIcons";
import { combineClassNames, getFileExt } from "../../../utils";
var useStyles = makeStyles(function (theme) { return ({
    iconContainer: {
        position: "relative",
    },
    closeIcon: {
        position: "absolute",
        cursor: "pointer",
        color: theme.palette.error.main,
    },
    icon: {
        width: "100%",
        height: "auto",
        marginTop: 16,
    },
    iconDisabled: {
        opacity: 0.5,
    },
    clickable: {
        cursor: "pointer",
    },
    downloadLink: {
        cursor: "pointer",
        "&:hover": {
            textDecoration: "underline",
        },
    },
}); }, { name: "CcFile" });
var ExcelFileExtensions = [
    "xlsx",
    "xlsm",
    "xltx",
    "xltm",
    "xls",
    "xlt",
    "xlm",
];
var WordFileExtensions = [
    "doc",
    "dot",
    "docx",
    "docm",
    "dotx",
    "dotm",
    "docb",
];
var PowerPointFileExtensions = [
    "ppt",
    "pot",
    "pps",
    "pptx",
    "pptm",
    "potx",
    "potm",
    "ppsx",
    "ppsm",
    "sldx",
    "sldm",
];
var PdfFileExtensions = ["pdf"];
var File = function (props) {
    var downloadLink = props.downloadLink;
    var classes = useStyles(props);
    var fileExt = getFileExt(props.name);
    var FileIcon = ExcelFileExtensions.includes(fileExt)
        ? ExcelFileIcon
        : WordFileExtensions.includes(fileExt)
            ? WordFileIcon
            : PowerPointFileExtensions.includes(fileExt)
                ? PowerPointFileIcon
                : PdfFileExtensions.includes(fileExt)
                    ? PdfFileIcon
                    : DefaultFileIcon;
    var openDownload = useCallback(function () {
        if (downloadLink)
            window.open(downloadLink, "_blank");
    }, [downloadLink]);
    return (React.createElement(Grid, { item: true, style: { width: props.size } },
        React.createElement(Grid, { container: true, spacing: 2 },
            React.createElement(Grid, { item: true, xs: 12, className: classes.iconContainer },
                props.onRemove && !props.disabled && (React.createElement(CancelIcon, { className: classes.closeIcon, onClick: props.onRemove })),
                props.preview ? (React.createElement("img", { src: props.preview, alt: props.name, className: combineClassNames([
                        classes.icon,
                        props.disabled && classes.iconDisabled,
                        downloadLink && classes.clickable,
                    ]), onClick: openDownload })) : (React.createElement(FileIcon, { className: combineClassNames([
                        classes.icon,
                        downloadLink && classes.clickable,
                    ]), onClick: openDownload }))),
            React.createElement(Grid, { item: true, xs: 12 },
                React.createElement(Tooltip, { title: props.name },
                    React.createElement(Typography, { align: "center", noWrap: true, className: downloadLink ? classes.downloadLink : undefined, onClick: openDownload, variant: "body2" }, props.name))))));
};
export default React.memo(File);

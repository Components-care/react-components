import React from "react";
import { makeStyles } from "@material-ui/core";
import { GroupBox } from "../index";
import useCCTranslations from "../../utils/useCCTranslations";
var useStyles = makeStyles({
    groupBox: {
        paddingLeft: "1.5rem",
    },
}, { name: "CcHowToBox" });
var HowToBox = function (props) {
    var titleLabel = props.titleLabel, labels = props.labels;
    var t = useCCTranslations().t;
    var classes = useStyles(props);
    if (!labels)
        return React.createElement(React.Fragment, null);
    return (React.createElement(GroupBox, { label: titleLabel !== null && titleLabel !== void 0 ? titleLabel : t("standalone.how-it-works.title") },
        React.createElement("ul", { className: classes.groupBox }, Array.isArray(labels) ? (labels.map(function (label, i) { return (React.createElement("li", { key: i.toString(16) }, label)); })) : (React.createElement("li", null, labels)))));
};
export default React.memo(HowToBox);

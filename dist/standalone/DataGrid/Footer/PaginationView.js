import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import { useDataGridStyles } from "../DataGrid";
import useCCTranslations from "../../../utils/useCCTranslations";
var PaginationView = function (props) {
    var _a;
    var classes = useDataGridStyles();
    var theme = useTheme();
    var isMobile = useMediaQuery(theme.breakpoints.only("xs"));
    var t = useCCTranslations().t;
    var total = props.rowsTotal;
    var filtered = (_a = props.rowsFiltered) !== null && _a !== void 0 ? _a : 0;
    var showFiltered = props.rowsFiltered !== null && props.rowsFiltered !== props.rowsTotal;
    var text = isMobile
        ? showFiltered
            ? "#" + filtered + "/" + total
            : "#" + total
        : "" + (showFiltered
            ? t("standalone.data-grid.footer.filtered") + " " + filtered + " "
            : "") + t("standalone.data-grid.footer.total") + " " + total;
    return (React.createElement(Box, { mx: 2 },
        React.createElement(Typography, { className: classes.paginationText }, text)));
};
export default React.memo(PaginationView);

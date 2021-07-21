var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import React, { useCallback, useRef } from "react";
import { Button, Grid } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
import { processImage } from "../../../utils";
import { makeStyles } from "@material-ui/core/styles";
import GroupBox from "../../GroupBox";
import useCCTranslations from "../../../utils/useCCTranslations";
var useStyles = makeStyles(function (theme) { return ({
    root: {
        width: "calc(100% - " + theme.spacing(2) + "px)",
        height: "calc(100% - " + theme.spacing(2) + "px)",
        marginTop: theme.spacing(2),
    },
    imgWrapper: {
        maxHeight: "100%",
    },
    preview: {
        objectFit: "contain",
        display: "block",
        width: "calc(100% - " + theme.spacing(2) + "px)",
        height: "calc(100% - " + theme.spacing(2) + "px)",
    },
    changeEventHelper: {
        display: "none",
    },
}); }, { name: "CcImageSelector" });
var ImageSelector = function (props) {
    var convertImagesTo = props.convertImagesTo, downscale = props.downscale, name = props.name, value = props.value, readOnly = props.readOnly, capture = props.capture, onChange = props.onChange;
    var classes = useStyles(props);
    var fileRef = useRef(null);
    var t = useCCTranslations().t;
    var processFile = useCallback(function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!onChange)
                        return [2 /*return*/];
                    _a = onChange;
                    _b = [name];
                    return [4 /*yield*/, processImage(file, convertImagesTo, downscale)];
                case 1:
                    _a.apply(void 0, _b.concat([_c.sent()]));
                    return [2 /*return*/];
            }
        });
    }); }, [name, onChange, convertImagesTo, downscale]);
    var handleFileChange = useCallback(function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var elem, file;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    elem = evt.currentTarget;
                    file = elem.files && elem.files[0];
                    if (!file)
                        return [2 /*return*/];
                    return [4 /*yield*/, processFile(file)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [processFile]);
    // upload click handler
    var handleUpload = useCallback(function () {
        var elem = fileRef.current;
        if (!elem)
            return;
        if (capture && capture !== "false") {
            elem.setAttribute("capture", capture);
        }
        elem.click();
    }, [capture]);
    var handleDrop = useCallback(function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (readOnly)
                        return [2 /*return*/];
                    evt.preventDefault();
                    return [4 /*yield*/, processFile((_a = evt.dataTransfer) === null || _a === void 0 ? void 0 : _a.files[0])];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [readOnly, processFile]);
    var handleDragOver = useCallback(function (evt) {
        if (readOnly)
            return;
        evt.preventDefault();
    }, [readOnly]);
    // render component
    return (React.createElement(GroupBox, { label: props.label, smallLabel: props.smallLabel },
        React.createElement(Grid, { container: true, spacing: 2, direction: "column", alignContent: "flex-start", alignItems: "stretch", justify: "center", wrap: "nowrap", className: classes.root, onDrop: handleDrop, onDragOver: handleDragOver },
            !props.readOnly && (React.createElement(Grid, { item: true, key: "upload" },
                React.createElement(Button, { startIcon: React.createElement(AttachFile, null), variant: "contained", color: "primary", name: props.name, onClick: handleUpload, onBlur: props.onBlur }, props.uploadLabel || t("standalone.file-upload.upload")),
                React.createElement("input", { type: "file", accept: "image/*", ref: fileRef, onChange: handleFileChange, className: classes.changeEventHelper }))),
            React.createElement(Grid, { item: true, xs: true, key: "image", className: classes.imgWrapper }, value && (React.createElement("img", { src: value, alt: props.alt, className: classes.preview }))))));
};
export default React.memo(ImageSelector);

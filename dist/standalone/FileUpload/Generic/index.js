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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, FormHelperText, Grid, Typography, } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";
import FilePreview from "./File";
import { combineClassNames, getFileExt, matchMime, processImage, useDropZone, } from "../../../utils";
import GroupBox from "../../GroupBox";
import { makeStyles } from "@material-ui/core/styles";
import useCCTranslations from "../../../utils/useCCTranslations";
var useStyles = makeStyles(function (theme) { return ({
    dropzone: {
        border: "2px solid " + theme.palette.primary.main,
    },
    formatText: {
        textAlign: "right",
    },
    fileInput: {
        display: "none",
    },
}); }, { name: "CcFileUpload" });
var FileUpload = function (props) {
    var convertImagesTo = props.convertImagesTo, imageDownscaleOptions = props.imageDownscaleOptions, previewImages = props.previewImages, previewSize = props.previewSize, maxFiles = props.maxFiles, handleError = props.handleError, accept = props.accept, acceptLabel = props.acceptLabel, onChange = props.onChange, label = props.label, smallLabel = props.smallLabel, readOnly = props.readOnly, onBlur = props.onBlur, uploadLabel = props.uploadLabel, allowDuplicates = props.allowDuplicates;
    var classes = useStyles(props);
    var loadInitialFiles = function () {
        return (props.files || props.defaultFiles || []).map(function (meta) { return (__assign({ canBeUploaded: false, delete: false }, meta)); });
    };
    var _a = useState(loadInitialFiles), files = _a[0], setFiles = _a[1];
    var inputRef = useRef(null);
    var t = useCCTranslations().t;
    var getRemainingFileCount = useCallback(function () {
        if (!maxFiles)
            throw new Error("max files isn't set, this function shouldn't be called");
        return maxFiles - files.filter(function (file) { return !file.delete; }).length;
    }, [maxFiles, files]);
    var processFiles = useCallback(function (files) { return __awaiter(void 0, void 0, void 0, function () {
        var processImages, newFiles, i, file, isImage, _a, _b, allowedTypes, allowedFileExt_1, allowedMimes_1;
        var _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    processImages = !!(convertImagesTo ||
                        imageDownscaleOptions ||
                        previewImages);
                    if (maxFiles) {
                        if (files.length > getRemainingFileCount()) {
                            handleError("files.selector.too-many", t("standalone.file-upload.error.too-many"));
                            return [2 /*return*/];
                        }
                    }
                    newFiles = [];
                    i = 0;
                    _d.label = 1;
                case 1:
                    if (!(i < files.length)) return [3 /*break*/, 5];
                    file = files[i];
                    isImage = file.type.startsWith("image/");
                    if (!(isImage && processImages)) return [3 /*break*/, 3];
                    _b = (_a = newFiles).push;
                    _c = {
                        file: file
                    };
                    return [4 /*yield*/, processImage(file, convertImagesTo, imageDownscaleOptions)];
                case 2:
                    _b.apply(_a, [(_c.preview = _d.sent(),
                            _c.canBeUploaded = true,
                            _c.delete = false,
                            _c)]);
                    return [3 /*break*/, 4];
                case 3:
                    newFiles.push({ file: file, canBeUploaded: true, delete: false });
                    _d.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 1];
                case 5:
                    if (accept) {
                        allowedTypes = accept.split(",").map(function (type) { return type.trim(); });
                        allowedFileExt_1 = allowedTypes
                            .filter(function (type) { return type.startsWith("."); })
                            .map(function (type) { return type.substring(1); });
                        allowedMimes_1 = allowedTypes.filter(function (type) { return type.includes("/"); });
                        if (newFiles.find(function (file) {
                            return !allowedMimes_1
                                .map(function (allowed) { return matchMime(allowed, file.file.type); })
                                .includes(true) &&
                                !allowedFileExt_1.includes(getFileExt(file.file.name));
                        })) {
                            handleError("files.type.invalid", t("standalone.file-upload.error.invalid-type"));
                            return [2 /*return*/];
                        }
                    }
                    setFiles(function (prev) {
                        var newValue = allowDuplicates
                            ? __spreadArray(__spreadArray([], prev), newFiles) : __spreadArray(__spreadArray([], prev.filter(
                        // check for file name duplicates and replace
                        function (file) {
                            return !newFiles
                                .map(function (newFile) { return newFile.file.name; })
                                .includes(file.file.name);
                        })), newFiles);
                        if (onChange)
                            onChange(newValue);
                        return newValue;
                    });
                    return [2 /*return*/];
            }
        });
    }); }, [
        accept,
        allowDuplicates,
        convertImagesTo,
        getRemainingFileCount,
        handleError,
        imageDownscaleOptions,
        maxFiles,
        onChange,
        previewImages,
        t,
    ]);
    var handleUpload = useCallback(function () {
        var elem = inputRef.current;
        if (!elem)
            return;
        if (maxFiles) {
            if (getRemainingFileCount() === 0) {
                handleError("files.selector.limit-reached", t("standalone.file-upload.error.limit-reached"));
                return;
            }
        }
        elem.click();
    }, [maxFiles, getRemainingFileCount, handleError, t]);
    var handleFileChange = useCallback(function (evt) { return __awaiter(void 0, void 0, void 0, function () {
        var files;
        return __generator(this, function (_a) {
            files = evt.currentTarget.files;
            if (!files)
                return [2 /*return*/];
            return [2 /*return*/, processFiles(files)];
        });
    }); }, [processFiles]);
    var removeFile = useCallback(function (file) {
        if ("downloadLink" in file.file) {
            file.delete = true;
            setFiles(function (prev) {
                var newValue = __spreadArray([], prev);
                if (onChange)
                    onChange(newValue);
                return newValue;
            });
            return;
        }
        setFiles(function (prev) {
            var newValue = prev.filter(function (f) { return f !== file; });
            if (onChange)
                onChange(newValue);
            return newValue;
        });
    }, [onChange]);
    var _b = useDropZone(readOnly ? undefined : processFiles), handleDrop = _b.handleDrop, handleDragOver = _b.handleDragOver, dragging = _b.dragging;
    // update files if necessary
    useEffect(function () {
        setFiles(loadInitialFiles);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.files]);
    return (React.createElement(GroupBox, { label: label, smallLabel: smallLabel },
        React.createElement(Grid, { container: true, spacing: 2, alignContent: "space-between", onDragOver: handleDragOver, onDrop: handleDrop, className: combineClassNames([
                "components-care-dropzone",
                dragging && classes.dropzone,
            ]) },
            !readOnly && (React.createElement(Grid, { item: true, xs: true, key: "upload" },
                React.createElement(Button, { startIcon: React.createElement(AttachFile, null), variant: "contained", color: "primary", onClick: handleUpload, onBlur: onBlur }, uploadLabel || t("standalone.file-upload.upload")),
                React.createElement("input", { type: "file", accept: accept || undefined, multiple: maxFiles ? getRemainingFileCount() > 1 : true, onChange: handleFileChange, className: classes.fileInput, ref: inputRef }))),
            React.createElement(Grid, { item: true, xs: 12, key: "files" },
                React.createElement(Grid, { container: true, spacing: 2, alignContent: "flex-start", alignItems: "flex-start" },
                    files.map(function (data, index) {
                        return data && (React.createElement(FilePreview, { name: data.file.name, downloadLink: "downloadLink" in data.file
                                ? data.file.downloadLink
                                : undefined, key: index + "-" + data.file.name, size: previewSize, preview: previewImages ? data.preview : undefined, disabled: data.delete || false, onRemove: readOnly || data.preventDelete
                                ? undefined
                                : function () { return removeFile(data); } }));
                    }),
                    readOnly && files.length === 0 && (React.createElement(Grid, { item: true },
                        React.createElement(Typography, null, t("standalone.file-upload.no-files")))))),
            !readOnly && (React.createElement(Grid, { item: true, xs: 12, key: "info" },
                React.createElement(FormHelperText, { className: classes.formatText },
                    "(",
                    t("standalone.file-upload.formats"),
                    ":",
                    " ",
                    acceptLabel || accept || t("standalone.file-upload.format.any"),
                    ")"))))));
};
export default FileUpload;

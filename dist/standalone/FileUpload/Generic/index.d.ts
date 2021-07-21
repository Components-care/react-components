import React from "react";
import { FileSelectorError } from "./Errors";
import { IDownscaleProps } from "../../../utils/processImage";
import { ClassNameMap } from "@material-ui/styles/withStyles";
export interface FileUploadProps {
    /**
     * Maximum amount of files allowed
     */
    maxFiles?: number;
    /**
     * Filter for allowed mime types and file extensions (see <input accept="VALUE">)
     */
    accept?: string;
    /**
     * Custom label for accepted file formats ("File formats:" prefix is prepended)
     */
    acceptLabel?: string;
    /**
     * Optional resolution restrictions for images
     */
    imageDownscaleOptions?: IDownscaleProps;
    /**
     * Optional mime type to convert images to
     */
    convertImagesTo?: string;
    /**
     * Properties for preview
     */
    previewSize: number;
    /**
     * The label type of the box
     */
    smallLabel?: boolean;
    /**
     * Should we show images instead of file icons?
     */
    previewImages?: boolean;
    /**
     * Should file duplicates be allowed? If not files with the same file name will be replaced
     */
    allowDuplicates?: boolean;
    /**
     * Called if an error occurred. Should provide feedback to the user
     * @param err The error that occurred
     * @param message A localized, human readable message
     */
    handleError: (err: FileSelectorError, message: string) => void;
    /**
     * Currently displayed files (for controlled input. for uncontrolled use defaultFiles)
     */
    files?: FileData<FileMeta>[];
    /**
     * Already selected files (for loading existing data)
     */
    defaultFiles?: FileData<FileMeta>[];
    /**
     * Called on file selection update
     * @param files The newly selected files
     */
    onChange?: (files: FileData[]) => void;
    /**
     * onBlur event handler
     */
    onBlur?: React.FocusEventHandler<HTMLElement>;
    /**
     * Custom label for the upload files button
     */
    uploadLabel?: string;
    /**
     * Makes the file upload control read only
     */
    readOnly?: boolean;
    /**
     * The label of the component
     */
    label?: string;
    /**
     * Custom CSS classes for styling
     */
    classes?: ClassNameMap<keyof ReturnType<typeof useStyles>>;
}
export interface FileMeta {
    /**
     * The file name
     */
    name: string;
    /**
     * The download link for the file
     */
    downloadLink?: string;
}
export interface FileData<T = File | FileMeta> {
    /**
     * The file from the file upload
     */
    file: T;
    /**
     * Prevent the file from getting deleted
     */
    preventDelete?: boolean;
    /**
     * The file can be uploaded? (has it been selected by the user?)
     * If canBeUploaded is true T is File, otherwise T is FileMeta
     */
    canBeUploaded?: boolean;
    /**
     * The processed image, if present: should be uploaded instead of file.
     */
    preview?: string;
    /**
     * Set to true if the file should be deleted from the server, only true if canBeUploaded is false
     */
    delete?: boolean;
}
declare const useStyles: (props?: any) => ClassNameMap<"dropzone" | "formatText" | "fileInput">;
declare const FileUpload: (props: FileUploadProps) => React.ReactElement;
export default FileUpload;

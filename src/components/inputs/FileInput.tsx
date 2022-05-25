import React, {forwardRef, useCallback} from 'react';
import UploadIcon from "../ui/icons/UploadIcon";
import Typography from "../common/Typography";
import RegularButton from "../ui/buttons/RegularButton";
import {useDropzone} from "react-dropzone";

interface FileInputProps {
    onChange: (files: File[]) => void;
    visible?: boolean;
    value?: '';
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({visible, onChange, value = ''}, ref) => {

    const onDrop = useCallback((files: File[]) => {
        onChange(files);
    }, []);

    const {getRootProps, getInputProps, isDragActive, open} = useDropzone({onDrop, noClick: true, multiple: false});

    return (
        <div className="file-input">
            {
                visible &&
                <>
                    <div className="d-flex flex-column align-items-center" {...getRootProps()}>
                        <UploadIcon/>
                        <Typography>{isDragActive ? 'Drop here' : 'Drag and drop here'}</Typography>
                        <Typography className="fw-bold my-2">Or</Typography>
                    </div>
                    <RegularButton onClick={open}>Select files</RegularButton>
                </>
            }
            <input {...getInputProps()}
                   multiple={true}
                   ref={ref}
                   className="file-input"
                   type="file"
                   value={value}
            />
        </div>
    );
});

export default FileInput;
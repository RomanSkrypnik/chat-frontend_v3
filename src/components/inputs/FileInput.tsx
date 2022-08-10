import React, { forwardRef, useCallback } from 'react';
import UploadIcon from '../ui/icons/UploadIcon';
import RegularButton from '../ui/buttons/RegularButton';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';
import { Typography } from '../common';

interface FileInputProps {
    name?: string;
    onChange: (files: File[]) => void;
    visible?: boolean;
    value?: string;
    multiple?: boolean;
    buttonText?: string;
}

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
                                                                    name,
                                                                    buttonText,
                                                                    multiple = true,
                                                                    visible,
                                                                    onChange,
                                                                    value = '',
                                                                }, ref) => {

    const onDrop = useCallback((files: File[]) => {
        onChange(files);
    }, []);

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({ onDrop, noClick: true, multiple });

    return (
        <div className={cn('file-input', isDragActive && '_active')}>

            {
                visible &&
                <>
                    <div className='d-flex flex-column align-items-center' {...getRootProps()}>
                        <UploadIcon />
                        <Typography>{isDragActive ? 'Drop here' : 'Drag and drop here'}</Typography>
                        <Typography className='fw-bold my-2'>Or</Typography>
                    </div>
                    <RegularButton onClick={open}>{buttonText ?? 'Select files'}</RegularButton>
                </>
            }

            <input {...getInputProps()}
                   name={name}
                   multiple={multiple}
                   ref={ref}
                   className='file-input'
                   type='file'
                   value={value}
            />
        </div>
    );
});

export default FileInput;

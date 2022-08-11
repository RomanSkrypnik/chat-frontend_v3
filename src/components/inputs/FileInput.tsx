import React, { forwardRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';
import { RegularButton, UploadIcon } from '../ui';

interface FileInputProps {
    name?: string;
    onChange: (files: File[]) => void;
    visible?: boolean;
    value?: string;
    multiple?: boolean;
    buttonText?: string;
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({
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
                        <h2 className='body-1'>{isDragActive ? 'Drop here' : 'Drag and drop here'}</h2>
                        <h3 className='body-2 fw-bold my-2'>Or</h3>
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

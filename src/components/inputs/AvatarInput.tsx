import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Avatar } from '@mui/material';

interface Props {
    imgSrc?: string;
    onChange: (file: File) => void;
}

export const AvatarInput: FC<Props> = ({ onChange, imgSrc }) => {
    const [src, setSrc] = useState<undefined | string>(imgSrc);

    const onDrop = useCallback((files: File[]) => {
        const file = files[0];
        onChange(file);

        const src = URL.createObjectURL(file);
        setSrc(src);
    }, []);

    useEffect(() => {
        setSrc(imgSrc);
    }, [imgSrc]);

    const { getInputProps, getRootProps } = useDropzone({ onDrop });

    return (
        <>
            <Avatar src={src} sx={{ width: 56, height: 56 }} {...getRootProps()}>
                <input type='file' style={{ display: 'none' }} {...getInputProps} />
            </Avatar>
        </>
    );
};

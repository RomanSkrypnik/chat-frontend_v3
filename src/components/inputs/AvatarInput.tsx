import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CameraIcon } from '../ui';

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
        <div className='avatar-input' {...getRootProps()}>
            {
                src ?
                    <img src={src} alt='Avatar' />
                    :
                    <div className='avatar-input__wrapper'>
                        <CameraIcon />
                    </div>
            }
            <input type='file' accept='image/png, image/gif, image/jpeg' {...getInputProps()} />
        </div>
    );
};

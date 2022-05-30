import React, {FC, useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import CameraIcon from "../ui/icons/CameraIcon";

interface AvatarInputProps {
    onChange: (file: File) => void;
}

const AvatarInput: FC<AvatarInputProps> = ({onChange}) => {
    const [src, setSrc] = useState<null | string>(null);

    const onDrop = useCallback((files: File[]) => {
        const file = files[0];
        onChange(file);

        const src = URL.createObjectURL(file);
        setSrc(src);
    }, []);

    const {getInputProps, getRootProps} = useDropzone({onDrop});

    return (
        <div className="avatar-input" {...getRootProps()}>

            {
                src ?
                    <img src={src} alt="Avatar"/>
                    :
                    <div className="avatar-input__wrapper">
                        <CameraIcon/>
                    </div>
            }

            <input type="file" accept="image/png, image/gif, image/jpeg" {...getInputProps()}/>
        </div>
    );
};

export default AvatarInput;
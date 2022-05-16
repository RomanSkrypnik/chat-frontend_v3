import React, {ReactNode, useEffect, useState} from "react";
import {ChatDocument, ChatPhoto} from "../components/partials/ChatMessageSwitch";
import {FileDto} from "../types";

export function useFileType(file: FileDto) {
    const [className, setClassName] = useState('');
    const [element, setElement] = useState<null | ReactNode>(null);

    useEffect(() => {
        const {ext} = file;

        if(ext === 'docx' || ext === 'zip') {
            setElement(<ChatDocument file={file} />);
            setClassName('_file');
        } else if (ext === 'png' || ext === 'jpg' || ext === 'svg') {
            setElement(<ChatPhoto file={file} />);
            setClassName('_picture');
        }
    }, []);

    return {className, element};
}
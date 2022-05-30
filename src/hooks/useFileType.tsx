import React, {ReactNode, useEffect, useState} from "react";
import {ChatDocument, ChatPhoto} from "../components/partials/ChatMessageSwitch";
import {FileDto} from "../types";
import {useTypedSelector} from "./useTypedSelector";
import {SERVER_URL} from "../http";

export function useFileType(file: FileDto) {
    const [className, setClassName] = useState('');
    const [element, setElement] = useState<null | ReactNode>(null);

    const {room} = useTypedSelector(state => state.room);

    useEffect(() => {
        const {ext} = file;
        const src = room ? SERVER_URL + '/room/message/' + file.filename : SERVER_URL + '/chat/' + file.filename;

        if (ext === 'docx' || ext === 'zip') {
            setElement(<ChatDocument src={src} file={file}/>);
            setClassName('_file');
        } else if (ext === 'png' || ext === 'jpg' || ext === 'svg') {
            setElement(<ChatPhoto src={src} file={file}/>);
            setClassName('_picture');
        }
    }, []);

    return {className, element};
}
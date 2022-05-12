import React, {FC, ReactNode, useEffect, useState} from 'react';
import {FileDto} from "../../types";
import {API_URL} from "../../http";
import cn from "classnames";
import DocumentIcon from "../ui/icons/DocumentIcon";

interface ChatSwitchProps {
    file: FileDto
}

const ChatDocument: FC<ChatSwitchProps> = ({file}) => {
    return (
        <div className="d-flex">
            <div className="chat-switch__document">
                <DocumentIcon/>
            </div>
            <div>
                <div>{file.filename}</div>
            </div>
        </div>
    );
};

const ChatPhoto: FC<ChatSwitchProps> = ({file}) => {
    return (
        <>
            <img src={API_URL + '/storage/' + file.filename} alt=""/>
        </>
    );
}

const ChatSwitch: FC<ChatSwitchProps> = ({file}) => {
    const [element, setElement] = useState<null | ReactNode>(null);
    const [className, setClassName] = useState('');

    useEffect(() => {
        switch (file.ext) {
            case 'docx':
                setElement(<ChatDocument file={file} />);
                setClassName('_docx')
                break;
            case 'png' || 'jpg' || 'svg':
                setElement(<ChatPhoto file={file} />);
                setClassName('_picture')
                break;
        }
    }, []);

    return (
        <div className={cn("chat-switch", className)}>
            {element}
        </div>
    );
};

export default ChatSwitch;
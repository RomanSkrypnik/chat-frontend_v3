import React, {FC, useState} from 'react';
import {FileDto} from "../../types";
import {SERVER_URL} from "../../http";
import cn from "classnames";
import DocumentIcon from "../ui/icons/DocumentIcon";
import {useFileType} from "../../hooks/useFileType";
import ImageDial from "../common/ImageDial";

interface ChatSwitchProps {
    file: FileDto;
}

interface ChatSwitchChildren extends ChatSwitchProps {
    src: string;
}

export const ChatDocument: FC<ChatSwitchChildren> = ({file, src}) => {
    return (
        <a href={src} className="chat-message__switch-link" download>
            <div className="chat-message__switch-icon">
                <DocumentIcon/>
            </div>
            <div>
                <div>{file.filename}</div>
            </div>
        </a>
    );
};

export const ChatPhoto: FC<ChatSwitchChildren> = ({src}) => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <div className="chat-message__switch-image">
            {show && <ImageDial onClose={handleClick} src={src}/>}
            <img src={src} onClick={handleClick} alt=""/>
        </div>
    );
};

const ChatMessageSwitch: FC<ChatSwitchProps> = ({file}) => {
    const {className, element} = useFileType(file);

    return (
        <div className={cn("chat-message__switch", className)}>
            {element}
        </div>
    );
};

export default ChatMessageSwitch;
import React, {FC} from 'react';
import {FileDto} from "../../types";
import {SERVER_URL} from "../../http";
import cn from "classnames";
import DocumentIcon from "../ui/icons/DocumentIcon";
import {useFileType} from "../../hooks/useFileType";

interface ChatSwitchProps {
    file: FileDto
}

export const ChatDocument: FC<ChatSwitchProps> = ({file}) => {
    return (
        <a href={`${SERVER_URL}/chat/${file.filename}`} className="chat-message__switch-link" download>
            <div className="chat-message__switch-icon">
                <DocumentIcon/>
            </div>
            <div>
                <div>{file.filename}</div>
            </div>
        </a>
    );
};

export const ChatPhoto: FC<ChatSwitchProps> = ({file}) => {
    return (
        <div className="chat-message__switch-image">
            <img src={`${SERVER_URL}/chat/${file.filename}`} alt=""/>
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
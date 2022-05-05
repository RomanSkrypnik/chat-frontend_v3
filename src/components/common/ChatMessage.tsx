import React, {FC} from 'react';
import {MessageDto} from "../../types";
import {Link} from "react-router-dom";

interface ChatMessageProps {
    message: MessageDto;
}

const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    return (
        <div className="mx-2">
            <Link to={message.user.hash} className="mb-2">{message.user.name}</Link>
            <div>{message.text}</div>
        </div>
    );
};

export default ChatMessage;
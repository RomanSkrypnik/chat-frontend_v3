import React, {FC} from 'react';
import {MessageDto} from "../../types";
import {Link} from "react-router-dom";

interface ChatMessageProps {
    message: MessageDto;
}

const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    return (
        <div className="chat__message mx-2 bg-light">
            <Link to={`/account/${message.user.hash}`} className="mb-2">{message.user.name}</Link>
            <div className="text-break">{message.text}</div>
        </div>
    );
};

export default ChatMessage;
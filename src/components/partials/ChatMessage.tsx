import React, {FC} from 'react';
import {MessageDto} from "../../types";
import ChatMessageSwitch from "./ChatMessageSwitch";
import cn from "classnames";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface ChatMessageProps {
    message: MessageDto;
}

const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    const {user} = useTypedSelector(state => state.auth);

    const isCurrUser = user?.hash === message.user.hash

    return (
        <div className={cn("chat-message mx-2 bg-light", !isCurrUser && '_alternate')}>
            {
                message.files.map(file => <ChatMessageSwitch file={file} key={file.id}/>)
            }
            <div className="text-break">{message.text}</div>
        </div>
    );
};

export default ChatMessage;
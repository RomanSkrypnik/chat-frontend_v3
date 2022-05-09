import React, {FC} from 'react';
import {ChatDto} from "../../types";
import MessageItem from "./MessageItem";

interface MessageListProps {
    chats: ChatDto[]
}

const MessageList: FC<MessageListProps> = ({chats}) => {
    return (
        <div className="message-list scrollbar">
            {
                chats.map(chat => {
                    return <MessageItem user={chat.user}
                                        message={chat.messages[chat.messages.length - 1]}
                                        key={chat.id}/>
                })
            }
        </div>
    );
};

export default MessageList;
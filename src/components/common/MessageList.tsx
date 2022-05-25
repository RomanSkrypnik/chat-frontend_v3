import React, {FC} from 'react';
import {ChatDto} from "../../types";
import MessageItem from "./MessageItem";

interface MessageListProps {
    chats: ChatDto[];
}

const MessageList: FC<MessageListProps> = ({chats}) => {

    return (
        <div className="message-list scrollbar">
            {
                chats.map((chat) => <MessageItem name={chat.user.name}
                                                 hash={chat.user.hash}
                                                 messages={chat.messages}
                                                 key={chat.id}
                />)
            }
        </div>
    );
};

export default MessageList;
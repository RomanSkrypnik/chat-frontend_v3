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
                chats.map(({user, messages, id}) => <MessageItem user={user} messages={messages} key={id}/>
                )
            }
        </div>
    );
};

export default MessageList;
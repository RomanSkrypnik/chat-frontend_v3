import React, {FC} from 'react';
import {MessageDto} from "../../types";
import ChatListItem from "./ChatListItem";

interface ChatListProps {
    messages: MessageDto[][]
}

const ChatList: FC<ChatListProps> = ({messages}) => {
    return (
        <ul className="chat-list list-group list-unstyled">
            {
                messages.map((messageRow) => {
                    return <ChatListItem messageRow={messageRow}  />
                })
            }
        </ul>
    );
};

export default ChatList;
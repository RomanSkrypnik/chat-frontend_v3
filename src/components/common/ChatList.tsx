import React, {FC, useEffect} from 'react';
import {MessageDto} from "../../types";
import ChatListItem from "./ChatListItem";
import {useMessageArr} from "../../hooks/useMessageArr";

interface ChatListProps {
    messages: MessageDto[]
}

const ChatList: FC<ChatListProps> = ({messages}) => {

    const twoDimsArr = useMessageArr(messages);

    return (
        <ul className="chat-list list-group list-unstyled">
            {
                twoDimsArr.map((messageRow, idx) => {
                    return <ChatListItem messageRow={messageRow} key={idx} />
                })
            }
        </ul>
    );
};

export default ChatList;
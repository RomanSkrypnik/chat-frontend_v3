import React, {FC, useEffect, useRef, useState} from 'react';
import {MessageDto} from "../../types";
import ChatListItem from "../partials/ChatListItem";
import {useMessageArr} from "../../hooks/useMessageArr";

interface ChatListProps {
    messages: MessageDto[]
}

const ChatList: FC<ChatListProps> = ({messages}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    const twoDimsArr = useMessageArr(messages);

    // TODO :: CHANGE TYPE
    const ref = useRef<any>();

    useEffect(() => {
        handleScrollToBottom();
    }, [twoDimsArr, isLoaded]);

    const handleScrollToBottom = () => {
        ref.current.scrollTo(0, ref.current.scrollHeight);
    }

    const handleScroll = () => {
        console.log(ref.current.scrollTop);
    }

    return (
        <ul className="chat-list scrollbar list-unstyled"
            ref={ref}
            onLoad={() => setIsLoaded(true)}
            onScroll={handleScroll}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx}/>)
            }
        </ul>
    );
};

export default ChatList;
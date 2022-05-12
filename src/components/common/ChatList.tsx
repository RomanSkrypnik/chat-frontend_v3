import React, {createContext, FC, useEffect, useRef} from 'react';
import {MessageDto} from "../../types";
import ChatListItem from "../partials/ChatListItem";
import {useMessageArr} from "../../hooks/useMessageArr";


export const ChatListContext = createContext<null | ((data: string) => void)>(null)

interface ChatListProps {
    messages: MessageDto[]
}

const ChatList: FC<ChatListProps> = ({messages}) => {
    const twoDimsArr = useMessageArr(messages);

    // TODO :: CHANGE TYPE
    const ref = useRef<any>();

    useEffect(() => {
        if (twoDimsArr.length > 0) {
            scrollIntoView();
        }
    }, [twoDimsArr]);

    const scrollIntoView = () => {
        ref.current.scrollTo(0, ref.current.scrollHeight);
    }

    return (
        <ul className="position-relative chat-list scrollbar list-unstyled" ref={ref}>
            {
                twoDimsArr.map((messageRow, idx) => {
                    return <ChatListItem messageRow={messageRow} key={idx}/>
                })
            }
        </ul>
    );
};

export default ChatList;
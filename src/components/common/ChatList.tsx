import React, { FC, MutableRefObject, useEffect, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatListItem } from '../partials';
import { useChatScroll, useLastMessage, useMessageArr, useTypedSelector } from '../../hooks';

interface ChatListProps {
    messages: MessageDto[];
}

export const ChatList: FC<ChatListProps> = ({ messages }) => {
    const { user } = useTypedSelector(state => state.auth);

    const twoDimsArr = useMessageArr(messages);

    const ref = useRef() as MutableRefObject<HTMLUListElement>;

    const handleScroll = useChatScroll(ref);

    const lastMessage = useLastMessage(twoDimsArr);

    useEffect(() => {
        if (lastMessage?.user.id === user?.id) {
            scrollToBottom();
        }
    }, [lastMessage]);

    const scrollToBottom = () => {
        if (ref) {
            ref.current.scrollTo(0, ref.current.scrollHeight);
        }
    };

    return (
        <ul className='chat-list scrollbar list-unstyled'
            ref={ref}
            onScroll={handleScroll}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx} />)
            }
        </ul>
    );
};

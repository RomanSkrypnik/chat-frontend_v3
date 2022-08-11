import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { MessageDto } from '../../types';
import { useAppDispatch } from '../../store';
import { fetchMessages as fetchChatMessages } from '../../store/slices/chat';
import { useParams } from 'react-router-dom';
import { fetchMessages as fetchRoomMessages } from '../../store/slices/room';
import { ChatListItem } from '../partials';
import { useChatScroll, useMessageArr, useTypedSelector } from '../../hooks';

interface ChatListProps {
    messages: MessageDto[];
}

export const ChatList: FC<ChatListProps> = ({ messages }) => {
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);

    const { user } = useTypedSelector(state => state.auth);

    const twoDimsArr = useMessageArr(messages);

    const ref = useRef() as MutableRefObject<HTMLUListElement>;

    const handleScroll = useChatScroll(ref);

    useEffect(() => {
        if (twoDimsArr.length > 0) {
            const i = twoDimsArr.length - 1;
            const j = twoDimsArr[i].length - 1;

            setLastMessage(twoDimsArr[i][j]);
        }
    }, [twoDimsArr]);

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

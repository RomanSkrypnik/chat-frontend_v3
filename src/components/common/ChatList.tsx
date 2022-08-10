import React, { FC, MutableRefObject, useEffect, useRef, useState } from 'react';
import { MessageDto } from '../../types';
import { useAppDispatch } from '../../store';
import { fetchMessages as fetchChatMessages } from '../../store/slices/chat';
import { useParams } from 'react-router-dom';
import { fetchMessages as fetchRoomMessages } from '../../store/slices/room';
import { ChatListItem } from '../partials';
import { useMessageArr, useTypedSelector } from '../../hooks';

interface ChatListProps {
    messages: MessageDto[];
}

export const ChatList: FC<ChatListProps> = ({ messages }) => {
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { hash } = useParams();

    const { user } = useTypedSelector(state => state.auth);
    const { chat } = useTypedSelector(state => state.chat);
    const { room } = useTypedSelector(state => state.room);

    const twoDimsArr = useMessageArr(messages);

    const dispatch = useAppDispatch();

    const ref = useRef() as MutableRefObject<HTMLUListElement>;

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

    useEffect(() => {
        setIsLoaded(false);
    }, [hash]);

    useEffect(() => {
        ref.current.scrollTo(0, ref.current.scrollHeight - scrollTop);
    }, [twoDimsArr, isLoaded]);

    const handleScroll = () => {
        if (ref.current.scrollTop === 0) {

            if (chat) {
                dispatch(fetchChatMessages(chat.id));
            } else if (room) {
                dispatch(fetchRoomMessages(room.id));
            }

            setScrollTop(ref.current.scrollHeight);
            setIsLoaded(false);
        }
    };

    const scrollToBottom = () => {
        if (ref) {
            ref.current.scrollTo(0, ref.current.scrollHeight);
        }
    };

    return (
        <ul className='chat-list scrollbar list-unstyled'
            ref={ref}
            onLoad={() => setIsLoaded(true)}
            onScroll={handleScroll}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx} />)
            }
        </ul>
    );
};

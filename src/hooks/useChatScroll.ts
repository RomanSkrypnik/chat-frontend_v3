import { MutableRefObject, useEffect, useState } from 'react';
import { fetchMessages as fetchChatMessages } from '../store/slices/chat';
import { fetchMessages as fetchRoomMessages } from '../store/slices/room';
import { useTypedSelector } from './useTypedSelector';
import { useAppDispatch } from '../store';
import { useParams } from 'react-router-dom';

export function useChatScroll(ref: MutableRefObject<HTMLUListElement>) {
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const { chat } = useTypedSelector(state => state.chat);
    const { room } = useTypedSelector(state => state.room);

    const dispatch = useAppDispatch();

    const { chatHash } = useParams();

    useEffect(() => {
        setIsLoaded(false);
    }, [chatHash]);

    useEffect(() => {
        ref.current.scrollTo(0, ref.current.scrollHeight - scrollTop);
    }, [isLoaded]);

    return () => {
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
}

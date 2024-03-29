import { RefObject } from 'react';
import { fetchMessages as fetchChatMessages } from '../store/slices/chat';
import { fetchMessages as fetchRoomMessages } from '../store/slices/room';
import { useTypedSelector } from './useTypedSelector';
import { useAppDispatch } from '../store';

export function useChatScroll(ref: RefObject<HTMLUListElement>) {

    const { chat } = useTypedSelector(state => state.chat);
    const { room } = useTypedSelector(state => state.room);

    const dispatch = useAppDispatch();

    return () => {
        if (ref?.current) {
            const { scrollTop } = ref.current;

            if (scrollTop === 0) {
                if (chat) {
                    dispatch(fetchChatMessages(chat.id));
                } else if (room) {
                    dispatch(fetchRoomMessages(room.id));
                }
            }
        }
    };
}

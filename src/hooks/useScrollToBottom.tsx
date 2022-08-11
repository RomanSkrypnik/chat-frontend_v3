import { MessageDto } from '../types';
import { MutableRefObject, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';

export function useScrollToBottom(ref: MutableRefObject<HTMLUListElement>, lastMessage: MessageDto | null) {
    const { user } = useTypedSelector(state => state.auth);

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
}

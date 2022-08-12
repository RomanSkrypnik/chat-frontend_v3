import { MessageDto } from '../types';
import { RefObject, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { useParams } from 'react-router-dom';

export function useScrollToBottom(ref: RefObject<HTMLUListElement>, lastMessage: MessageDto | null) {
    const { chatHash } = useParams();

    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        if (lastMessage?.user.id === user?.id) {
            scrollToBottom();
        }
    }, [lastMessage, chatHash]);

    const scrollToBottom = () => {
        ref?.current && ref.current.scrollTo(0, ref.current.scrollHeight);
    };
}

import { MessageDto } from '../types';
import { MutableRefObject, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { useParams } from 'react-router-dom';

export function useScrollToBottom(ref: MutableRefObject<HTMLUListElement>, lastMessage: MessageDto | null) {
    const { chatHash } = useParams();

    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        scrollToBottom();
    }, [lastMessage, chatHash]);

    const scrollToBottom = () => {
        ref.current.scrollTo(0, ref.current.scrollHeight);
    };
}

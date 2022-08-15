import { RefObject, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { useParams } from 'react-router-dom';

export function useScrollToBottom(ref: RefObject<HTMLUListElement>, userId: number | undefined) {
    const { chatHash } = useParams();

    const { user } = useTypedSelector(state => state.auth);

    useEffect(() => {
        if (userId === user?.id) {
            scrollToBottom();
        }
    }, [userId]);

    useEffect(() => {
        scrollToBottom();
    }, [chatHash]);


    const scrollToBottom = () => {
        ref?.current && ref.current.scrollTo(0, ref.current.scrollHeight);
    };
}

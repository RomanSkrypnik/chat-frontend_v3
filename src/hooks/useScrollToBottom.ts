import { RefObject, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export function useScrollToBottom(ref: RefObject<HTMLUListElement>, userId: number | undefined) {
    const { chatHash } = useParams();

    useEffect(() => {
        scrollToBottom();
    }, [userId]);

    useEffect(() => {
        scrollToBottom();
    }, [chatHash]);


    const scrollToBottom = () => {
        ref?.current && ref.current.scrollTo(0, ref.current.scrollHeight);
    };
}

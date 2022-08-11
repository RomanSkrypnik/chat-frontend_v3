import { useEffect, useState } from 'react';
import { MessageDto } from '../types';
import { useTypedSelector } from './useTypedSelector';

export function useCountUnread(messages: MessageDto[]) {
    const [unreadCount, setUnreadCount] = useState(0);

    const { user: currUser } = useTypedSelector(state => state.auth);

    useEffect(() => {
        const unreadMessages = messages.filter(({ isRead, user }) => !isRead && user.id !== currUser?.id);
        setUnreadCount(unreadMessages.length);
    }, [messages]);

    return unreadCount;
}

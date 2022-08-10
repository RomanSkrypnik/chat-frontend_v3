import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageDto } from '../../types';
import { Typography } from './Typography';
import { MessageItemFiles } from '../partials';
import { Avatar } from '../ui/buttons/Avatar';
import { useFormatDuration, useTypedSelector } from '../../hooks';

interface MessageItemProps {
    src?: string;
    online?: boolean;
    name: string;
    hash: string;
    messages: MessageDto[];
}

export const MessageItem: FC<MessageItemProps> = ({ src, name, hash, online, messages }) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);

    const { auth } = useTypedSelector(state => state);

    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[0]);
            countUnreadMessages();
        }
    }, [messages]);

    const date = useFormatDuration(messages[0]?.createdAt ?? '');

    const countUnreadMessages = () => {
        const unreadMessages = messages.filter(({ isRead, user }) => !isRead && user.id !== auth.user?.id);
        setUnreadCount(unreadMessages.length);
    };

    return (
        <NavLink to={`/${hash}`} className='message-item'>

            <div className='d-flex'>
                <Avatar src={src} isOnline={online} />
                <div className='d-flex justify-content-between w-100 ms-3'>
                    <Typography fz={18} className='message-item__text fw-bold mb-1'>{name}</Typography>
                    <Typography className='message-item__text'>{date}</Typography>
                </div>
            </div>

            <div className='d-flex'>
                {lastMessage && <Typography className='message-item__text fw-bold mt-3'>{lastMessage.text}</Typography>}
                {
                    unreadCount > 0 &&
                    <div className='position-relative ms-auto'>
                        <div className='message-item__unread'>{unreadCount}</div>
                    </div>
                }
            </div>

            {lastMessage && <MessageItemFiles files={lastMessage.files} />}
        </NavLink>
    );
};

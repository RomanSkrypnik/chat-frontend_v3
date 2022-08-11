import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { MessageDto } from '../../types';
import { MessageItemFiles } from '../partials';
import { Avatar } from '../ui/buttons/Avatar';
import { useCountUnread, useFormatDuration } from '../../hooks';

interface MessageItemDto {
    src?: string;
    online?: boolean;
    name: string;
    hash: string;
    messages: MessageDto[];
}

export const MessageItem: FC<MessageItemDto> = ({ src, name, hash, online, messages }) => {
    const unreadCount = useCountUnread(messages);

    const date = useFormatDuration(messages[0]?.createdAt ?? '');

    return (
        <NavLink to={`/${hash}`} className='message-item'>
            <div className='d-flex align-items-center'>
                <Avatar src={src} isOnline={online} />
                <div className='d-flex justify-content-between w-100 ms-3'>
                    <p className='body-1 message-item__text fw-bold mb-1'>{name}</p>
                    <p className='body-2 message-item__text'>{date}</p>
                </div>
            </div>
            <div className='d-flex'>
                {messages[0] && <p className='message-item__text fw-bold mt-3'>{messages[0].text}</p>}
                {
                    unreadCount > 0 &&
                    <div className='position-relative ms-auto'>
                        <div className='message-item__unread'>{unreadCount}</div>
                    </div>
                }
            </div>
            {messages[0] && <MessageItemFiles files={messages[0].files} />}
        </NavLink>
    );
};

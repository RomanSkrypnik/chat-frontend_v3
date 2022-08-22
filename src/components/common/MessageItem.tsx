import React, { FC } from 'react';
import { MessageDto } from '../../types';
import { useCountUnread, useFormatDuration } from '../../hooks';
import { Avatar, Box, Card, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getFirstLetter } from '../../helpers';
import { CHAT_AVATAR_URL } from '../../http';

interface MessageItemDto {
    src?: string;
    online?: boolean;
    name: string;
    username?: string;
    hash: string;
    messages: MessageDto[];
}

export const MessageItem: FC<MessageItemDto> = ({ src, name, hash, username, online, messages }) => {
    const unreadCount = useCountUnread(messages);

    const date = useFormatDuration(messages[0]?.createdAt ?? '');

    return (
        <NavLink to={hash} style={{ textDecoration: 'none' }}>
            <Card sx={sx}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={CHAT_AVATAR_URL + src} alt={getFirstLetter(username ?? name)} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', ml: 3 }}>
                        <Typography sx={{ color: 'text.secondary' }}>{name}</Typography>
                        <Typography>{date}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mt: 3 }}>{messages[0]?.text ?? 'No messages'}</Typography>
                    {
                        unreadCount > 0 &&
                        <div className='position-relative ms-auto'>
                            <div className='message-item__unread'>{unreadCount}</div>
                        </div>
                    }
                </Box>
            </Card>
        </NavLink>
    );
};

const sx = { display: 'block', borderRadius: '6px', mt: 3, p: 2 };

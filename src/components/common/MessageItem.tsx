import React, { FC } from 'react';
import { MessageDto } from '../../types';
import { useCountUnread, useFormatDuration } from '../../hooks';
import { Avatar, Box, Card, Link, Typography } from '@mui/material';

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
        <Link href={hash} underline='none'>
            <Card sx={sx}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={src} />
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
        </Link>
    );
};

const sx = { display: 'block', borderRadius: '6px', mt: 3, p: 2 };

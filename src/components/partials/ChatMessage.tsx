import React, { FC } from 'react';
import { FileDto } from '../../types';
import { ChatMessageSwitch } from './ChatMessageSwitch';
import { ClipsIcon } from '../ui';
import { useFormatDate, useIsCurrentUser, useReadMessage } from '../../hooks';
import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
    messageId: number;
    text: string;
    isRead: boolean;
    hash: string;
    createdAt: string;
    files: FileDto[];
}

export const ChatMessage: FC<ChatMessageProps> = ({ messageId, text, isRead, createdAt, hash, files }) => {
    const ref = useReadMessage({ messageId, isRead, hash });

    const date = useFormatDate(createdAt, 'HH:mm');

    const isCurrUser = useIsCurrentUser(hash);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} ref={ref}>
            <Box sx={{ ...sx, bgcolor: isCurrUser ? 'primary.main' : 'text.primary' }}>
                {
                    files.map(file => <ChatMessageSwitch file={file} key={file.id} />)
                }
                <Box sx={{ display: 'flex', color: 'white' }}>
                    <Typography variant='body1'>{text}</Typography>
                    <Typography variant='body2' sx={{ display: 'flex', alignSelf: 'flex-end', fontSize: 12 }}>
                        <Box sx={{ mx: 0.5 }}>{date}</Box>
                        {isCurrUser && <ClipsIcon isActive={isRead} />}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

const sx = {
    borderRadius: '6px',
    m: '0 8px 5px 0',
    p: 1,
};

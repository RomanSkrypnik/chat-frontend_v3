import React, { FC } from 'react';
import { FileDto } from '../../types';
import cn from 'classnames';
import { ChatMessageSwitch } from './ChatMessageSwitch';
import { ClipsIcon } from '../ui';
import { useIsCurrentUser, useReadMessage } from '../../hooks';
import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
    messageId: number;
    text: string;
    isRead: boolean;
    hash: string;
    files: FileDto[];
}

export const ChatMessage: FC<ChatMessageProps> = ({ messageId, text, isRead, hash, files }) => {
    const ref = useReadMessage({ messageId, isRead, hash });

    const isCurrUser = useIsCurrentUser(hash);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }} ref={ref}>
            <Box sx={{ ...sx, bgcolor: isCurrUser ? 'primary.main' : 'text.primary' }}>
                {
                    files.map(file => <ChatMessageSwitch file={file} key={file.id} />)
                }
                <Typography sx={{ color: 'white' }}>{text}</Typography>
            </Box>
            {isCurrUser && <ClipsIcon isActive={isRead} />}
        </Box>
    );
};

const sx = {
    borderRadius: '6px',
    m: '0 8px 5px 0',
    p: 1,
};

import React, { FC } from 'react';
import { MessageItemDto } from '../../types';
import { MessageItem } from './MessageItem';
import { Box } from '@mui/material';

interface Props {
    items: MessageItemDto[];
}

export const MessageList: FC<Props> = ({ items }) => {

    return (
        <Box sx={{ mt: 2 }}>
            {
                items.map(({ id, ...chat }) => <MessageItem {...chat} key={id} />)
            }
        </Box>
    );
};

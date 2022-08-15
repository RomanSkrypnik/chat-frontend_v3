import React, { FC } from 'react';
import { MessageDto } from '../../types';
import { ChatMessage } from './ChatMessage';
import { useTypedSelector } from '../../hooks';
import { Avatar, Box, ListItem } from '@mui/material';

interface ChatListItemProps {
    messageRow: MessageDto[];
}

export const ChatListItem: FC<ChatListItemProps> = ({ messageRow }) => {

    const { user } = useTypedSelector(state => state.auth);

    const isCurrUser = messageRow[0].user.id === user?.id;

    return (
        <ListItem sx={{ mt: 3, alignSelf: isCurrUser ? 'align-self-end' : 'align-self-start' }}>
            <Box sx={{ display: 'flex' }}>
                {!isCurrUser && <Avatar className='order-0' />}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignSelf: isCurrUser ? 'align-items-end' : 'align-items-start',
                }}>
                    {
                        messageRow.map(message => (<ChatMessage message={message} key={message.id} />))
                    }
                </Box>

            </Box>
        </ListItem>
    );
};

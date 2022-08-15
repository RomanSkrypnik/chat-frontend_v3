import React, { FC } from 'react';
import { MessageDto } from '../../types';
import { ChatMessage } from './ChatMessage';
import { useIsCurrentUser } from '../../hooks';
import { Avatar, Box, ListItem } from '@mui/material';

interface ChatListItemProps {
    messageRow: MessageDto[];
}

export const ChatListItem: FC<ChatListItemProps> = ({ messageRow }) => {
    const isCurrUser = useIsCurrentUser(messageRow[0].user.hash);

    return (
        <ListItem sx={{ p: 0, mt: 3 }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar />
                <Box sx={{ ml: 3, alignSelf: isCurrUser ? 'align-items-end' : 'align-items-start' }}>
                    {
                        messageRow.map(({ id, text, files, isRead, user: { hash } }) => (
                                <ChatMessage
                                    messageId={id}
                                    text={text}
                                    files={files}
                                    isRead={isRead}
                                    hash={hash}
                                    key={id}
                                />
                            ),
                        )
                    }
                </Box>
            </Box>
        </ListItem>
    );
};

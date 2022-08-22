import React, { FC } from 'react';
import { MessageDto } from '../../types';
import { ChatMessage } from './ChatMessage';
import { useGetUserFromRow, useIsCurrentUser } from '../../hooks';
import { Avatar, Box, ListItem } from '@mui/material';
import { getFirstLetter } from '../../helpers';
import { CHAT_AVATAR_URL } from '../../http';

interface ChatListItemProps {
    messageRow: MessageDto[];
}

export const ChatListItem: FC<ChatListItemProps> = ({ messageRow }) => {
    const { hash, username, avatar } = useGetUserFromRow(messageRow[0]);

    const isCurrUser = useIsCurrentUser(hash);

    return (
        <ListItem sx={{ p: 0, mt: 3 }}>
            <Box sx={{ display: 'flex' }}>
                <Avatar src={CHAT_AVATAR_URL + avatar} alt={getFirstLetter(username)} />
                <Box sx={{ ml: 3, alignSelf: isCurrUser ? 'align-items-end' : 'align-items-start' }}>
                    {
                        messageRow.map(({ id, text, files, isRead, createdAt, user: { hash } }) => (
                                <ChatMessage
                                    createdAt={createdAt}
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

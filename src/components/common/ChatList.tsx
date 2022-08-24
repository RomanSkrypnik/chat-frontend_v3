import React, { FC, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatAvatar, ChatDate, ChatMessage } from '../partials';
import { useChatScroll } from '../../hooks';
import { Box, List } from '@mui/material';

interface Props {
    messages: MessageDto[];
}

export const ChatList: FC<Props> = ({ messages }) => {

    const ref = useRef<HTMLUListElement>(null);

    const handleScroll = useChatScroll(ref);

    const reversed = [...messages].reverse();

    return (
        <List ref={ref} onScroll={handleScroll} sx={sx}>
            {
                reversed.map(({ id, text, isRead, user: { hash, username, avatar }, createdAt, files }, idx) => {
                        const prevCreatedAt = idx > 1 ? reversed[idx - 1].createdAt : null;
                        const prevUsername = idx > 1 ? reversed[idx - 1].user.username : null;
                        return (
                            <Box sx={{ display: 'flex', flexDirection: 'column' }} key={id}>
                                <ChatDate
                                    date={createdAt}
                                    previousDate={prevCreatedAt}
                                />
                                <Box sx={{ display: 'flex' }}>
                                    <ChatAvatar
                                        src={avatar}
                                        username={username}
                                        createdAt={createdAt}
                                        prevUsername={prevUsername}
                                        prevCreatedAt={prevCreatedAt}
                                    />
                                    <ChatMessage
                                        messageId={id}
                                        text={text}
                                        isRead={isRead}
                                        hash={hash}
                                        createdAt={createdAt}
                                        files={files}
                                    />
                                </Box>
                            </Box>
                        );
                    },
                )
            }
        </List>
    );
};

const sx = {
    display: 'flex',
    flexDirection: 'column',
    height: `${window.screen.height - 350}px`,
    overflowY: 'scroll',
};

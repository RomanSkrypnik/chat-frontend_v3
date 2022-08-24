import React, { FC, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatDate, ChatMessage } from '../partials';
import { useChatScroll } from '../../hooks';
import { Avatar, Box, List } from '@mui/material';
import { getFirstLetter } from '../../helpers';

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
                reversed.map(({ id, text, isRead, user: { hash, username }, createdAt, files }, idx) =>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }} key={id}>
                        <ChatDate
                            date={createdAt}
                            previousDate={idx > 1 ? reversed[idx - 1].createdAt : null}
                        />
                        <Box sx={{ display: 'flex' }}>
                            {<Avatar sx={{ mr: 1 }}>{getFirstLetter(username)}</Avatar>}
                            <ChatMessage
                                messageId={id}
                                text={text}
                                isRead={isRead}
                                hash={hash}
                                createdAt={createdAt}
                                files={files}
                            />
                        </Box>
                    </Box>,
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

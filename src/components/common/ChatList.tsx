import React, { FC, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatMessage } from '../partials';
import { useChatScroll } from '../../hooks';
import { List } from '@mui/material';

interface Props {
    messages: MessageDto[];
}

export const ChatList: FC<Props> = ({ messages }) => {

    const ref = useRef<HTMLUListElement>(null);

    const handleScroll = useChatScroll(ref);

    return (
        <List ref={ref} onScroll={handleScroll} sx={sx}>
            {
                messages.map(({ id, text, isRead, user: { hash }, createdAt, files }) =>
                    <ChatMessage messageId={id}
                                 text={text}
                                 isRead={isRead}
                                 hash={hash}
                                 createdAt={createdAt}
                                 files={files} />,
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

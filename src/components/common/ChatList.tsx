import React, { FC, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatListItem } from '../partials';
import { useChatScroll, useLastMessage, useMessageArr, useScrollToBottom } from '../../hooks';
import { List } from '@mui/material';

interface Props {
    messages: MessageDto[];
}

export const ChatList: FC<Props> = ({ messages }) => {
    const twoDimsArr = useMessageArr(messages);

    const ref = useRef<HTMLUListElement>(null);

    const handleScroll = useChatScroll(ref);

    const lastMessage = useLastMessage(twoDimsArr);

    useScrollToBottom(ref, lastMessage?.user.id);

    return (
        <List ref={ref} onScroll={handleScroll} sx={sx}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx} />)
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

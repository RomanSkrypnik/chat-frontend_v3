import React, { FC, useRef } from 'react';
import { MessageDto } from '../../types';
import { ChatListItem } from '../partials';
import { useChatScroll, useLastMessage, useMessageArr, useScrollToBottom } from '../../hooks';

interface Props {
    messages: MessageDto[];
}

export const ChatList: FC<Props> = ({ messages }) => {
    const twoDimsArr = useMessageArr(messages);

    const ref = useRef<HTMLUListElement>(null);

    const handleScroll = useChatScroll(ref);

    const lastMessage = useLastMessage(twoDimsArr);

    useScrollToBottom(ref, lastMessage);

    return (
        <ul className='chat-list scrollbar list-unstyled'
            ref={ref}
            onScroll={handleScroll}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx} />)
            }
        </ul>
    );
};

import React, { FC } from 'react';
import { MessageItemDto } from '../../types';
import { MessageItem } from './MessageItem';

interface Props {
    items: MessageItemDto[];
}

export const MessageList: FC<Props> = ({ items }) => {

    return (
        <div className='message-list scrollbar'>
            {
                items.map((chat) => <MessageItem {...chat} />)
            }
        </div>
    );
};

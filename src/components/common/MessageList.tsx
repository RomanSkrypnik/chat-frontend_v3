import React, { FC } from 'react';
import { ChatDto } from '../../types';
import { MessageItem } from './MessageItem';
import useStorageUrl from '../../hooks/useStorageUrl';

interface MessageListProps {
    chats: ChatDto[];
}

interface MessageItemProps {
    chat: ChatDto;
}

const MessageItemWrapper: FC<MessageItemProps> = ({ chat }) => {

    const src = useStorageUrl('/avatars/', chat.user.avatar);

    return (
        <MessageItem name={chat.user.name}
                     src={src}
                     hash={chat.user.hash}
                     messages={chat.messages}
                     key={chat.id}
        />
    );
};

export const MessageList: FC<MessageListProps> = ({ chats }) => {

    return (
        <div className='message-list scrollbar'>
            {
                chats.map((chat) => <MessageItemWrapper chat={chat} key={chat.id} />)
            }
        </div>
    );
};

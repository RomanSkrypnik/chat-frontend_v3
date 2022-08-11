import React, { FC } from 'react';
import { ChatDto } from '../../types';
import { MessageItem } from './MessageItem';
import { useStorageUrl } from '../../hooks';

interface Props {
    chats: ChatDto[];
}

export const MessageList: FC<Props> = ({ chats }) => {
    const path = useStorageUrl('/avatars/');

    return (
        <div className='message-list scrollbar'>
            {
                chats.map(({ user: { avatar, name, hash }, messages, id }) =>
                    <MessageItem
                        name={name}
                        src={avatar ? path + avatar : undefined}
                        messages={messages}
                        hash={hash}
                        key={id}
                    />,
                )
            }
        </div>
    );
};

import React, { FC } from 'react';
import { RoomDto } from '../../types/room';
import { MessageItem } from '../common';
import { useStorageUrl } from '../../hooks';

interface Props {
    rooms: RoomDto[];
}

export const RoomMessageList: FC<Props> = ({ rooms }) => {
    const path = useStorageUrl('/room/avatar/');

    return (
        <div className='message-list scrollbar'>
            {
                rooms.map(({ name, hash, messages, avatar, id }) =>
                    <MessageItem
                        name={name}
                        hash={hash}
                        messages={messages}
                        src={avatar ? path + avatar : undefined}
                        key={id}
                    />,
                )
            }
        </div>
    );
};

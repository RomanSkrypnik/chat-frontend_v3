import React, { FC } from 'react';
import { RoomDto } from '../../types/room';
import { MessageItem } from '../common';
import { useStorageUrl } from '../../hooks';

interface RoomMessageListProps {
    rooms: RoomDto[];
}

interface RoomMessageItemWrapper {
    room: RoomDto;
}

const RoomMessageWrapper: FC<RoomMessageItemWrapper> = ({ room }) => {

    const src = useStorageUrl('/room/avatar/', room.avatar);

    return (
        <MessageItem name={room.name}
                     hash={`rooms/${room.hash}`}
                     messages={room.messages}
                     src={src}
                     key={room.id}
        />
    );
};

export const RoomMessageList: FC<RoomMessageListProps> = ({ rooms }) => {
    return (
        <div className='message-list scrollbar'>
            {
                rooms.map((room) => <RoomMessageWrapper room={room} key={room.id} />)
            }
        </div>
    );
};

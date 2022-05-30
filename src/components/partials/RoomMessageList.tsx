import React, {FC} from 'react';
import MessageItem from "../common/MessageItem";
import {RoomDto} from "../../types/room";
import {ROOM_AVATAR_URL} from "../../http";

interface RoomMessageListProps {
    rooms: RoomDto[];
}

const RoomMessageList: FC<RoomMessageListProps> = ({rooms}) => {


    return (
        <div className="message-list scrollbar">
            {
                rooms.map((room) => <MessageItem name={room.name}
                                                 hash={`rooms/${room.hash}`}
                                                 messages={room.messages}
                                                 src={ROOM_AVATAR_URL + room.avatar}
                                                 key={room.id}
                />)
            }
        </div>
    );
};

export default RoomMessageList;
import React, {FC} from 'react';
import MessageItem from "../common/MessageItem";
import {RoomDto} from "../../types/room";

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
                                                 key={room.id}
                />)
            }
        </div>
    );
};

export default RoomMessageList;
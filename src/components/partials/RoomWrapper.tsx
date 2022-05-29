import React, {useContext, useEffect, useState} from 'react';
import ChatList from "../common/ChatList";
import ChatControls from "./ChatControls";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RoomHeader from "./RoomHeader";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../store";
import {fetchRoom} from "../../store/slices/room";
import {RoomMessageService} from "../../services/RoomMessageService";
import {CreateMessageValues} from "../../types";
import {RoomSocketContext} from "../providers/RoomSocketProvider";

const RoomWrapper = () => {
    const [roomId, setRoomId] = useState<null | number>(null);

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {room} = useTypedSelector(state => state.room);

    const roomSocket = useContext(RoomSocketContext);

    useEffect(() => {
        if (hash) {
            dispatch(fetchRoom(hash));
        }

        return () => {
            roomSocket?.emit('leave');
        }
    }, [hash]);

    useEffect(() => {
        if (room) {
            setRoomId(prev => prev !== room.id ? room.id : prev);
        }
    }, [room]);

    useEffect(() => {
        if (roomSocket && Number.isFinite(roomId)) {
            roomSocket.emit('join', room?.id);
        }
    }, [roomSocket, roomId]);

    const handleSubmit = async ({text, files}: CreateMessageValues) => {
        const fd = new FormData();

        fd.append('text', text);
        fd.append('roomId', `${room?.id}`);

        if (files.length > 0) {
            for (const file of files) {
                fd.append('files', file);
            }
        }

        const {data} = await RoomMessageService.create(fd);
        roomSocket?.emit('send-message', data.data);
    }

    return (
        <div className="flex-grow-1 bg-white">
            {
                room &&
                <>
                    <RoomHeader room={room}/>
                    <ChatList messages={room.messages}/>
                    <ChatControls onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default RoomWrapper;
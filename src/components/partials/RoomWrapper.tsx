import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { fetchRoom } from '../../store/slices/room';
import { RoomMessageService } from '../../services';
import { CreateMessageValues } from '../../types';
import { ChatList } from '../common';
import { ChatControls } from './ChatControls';
import { RoomHeader } from './RoomHeader';
import { useTypedSelector } from '../../hooks';
import { RoomSocketContext } from '../providers';

export const RoomWrapper = () => {
    const [roomId, setRoomId] = useState<null | number>(null);

    const { roomHash } = useParams();

    const dispatch = useAppDispatch();

    const { room } = useTypedSelector(state => state.room);

    const roomSocket = useContext(RoomSocketContext);

    useEffect(() => {
        if (roomHash) {
            dispatch(fetchRoom(roomHash));
        }

        return () => {
            roomSocket?.emit('leave');
        };
    }, [roomHash]);

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

    const handleSubmit = async ({ text, files }: CreateMessageValues) => {
        const fd = new FormData();

        fd.append('text', text);
        fd.append('roomId', `${room?.id}`);

        if (files.length > 0) {
            for (const file of files) {
                fd.append('files', file);
            }
        }

        const { data } = await RoomMessageService.create(fd);
        roomSocket?.emit('send-message', data.data);
    };

    return (
        <div className='flex-grow-1 bg-white'>
            {
                room &&
                <>
                    <RoomHeader room={room} />
                    <ChatList messages={room.messages} />
                    <ChatControls onSubmit={handleSubmit} />
                </>
            }
        </div>
    );
};

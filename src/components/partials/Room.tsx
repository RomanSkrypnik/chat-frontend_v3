import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { fetchRoom } from '../../store/slices/room';
import { ChatList } from '../common';
import { ChatControls } from './ChatControls';
import { RoomHeader } from './RoomHeader';
import { useCreateRoomMessage, useTypedSelector } from '../../hooks';
import { RoomSocketContext } from '../providers';
import { Box } from '@mui/material';

export const Room = () => {
    const { roomHash } = useParams();

    const dispatch = useAppDispatch();

    const { room } = useTypedSelector(state => state.room);

    const roomSocket = useContext(RoomSocketContext);

    const handleSubmit = useCreateRoomMessage();

    useEffect(() => {
        if (roomHash) {
            dispatch(fetchRoom(roomHash));
        }

        return () => {
            roomSocket?.emit('leave');
        };
    }, [roomHash]);

    useEffect(() => {
        if (room && roomSocket) {
            roomSocket.emit('join', room?.id);
        }
    }, [room]);

    return (
        <Box sx={{ flexGrow: 1, width: '70%' }}>
            {
                room &&
                <>
                    <RoomHeader room={room} />
                    <ChatList messages={room.messages} />
                    <ChatControls onSubmit={handleSubmit} />
                </>
            }
        </Box>
    );
};

import { useEffect } from 'react';
import { UserDto } from '../types';
import { addMessage, changeMessage, changeUserInRooms, changeUsers } from '../store/slices/room';
import { RoomMessageDto } from '../types/room';
import { useAppDispatch } from '../store';
import { Socket } from 'socket.io-client';

export function useRoomSocketEvents(socket: Socket | null) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (socket) {
            socket.on('login', (data: UserDto) => {
                dispatch(changeUserInRooms(data));
            });

            socket.on('logout', (data: UserDto) => {
                dispatch(changeUserInRooms(data));
            });

            socket.on('join', (data: UserDto[]) => {
                dispatch(changeUsers(data));
            });

            socket.on('leave', (data: UserDto[]) => {
                dispatch(changeUsers(data));
            });

            socket.on('room-message', (data: RoomMessageDto) => {
                dispatch(addMessage(data));
            });

            socket.on('read-message', (data: RoomMessageDto) => {
                dispatch(changeMessage(data));
            });

            // TODO :: :\
            return () => {
                setTimeout(() => {
                    socket.disconnect();
                }, 600);
            };

        }
    }, [socket]);
}

import React, { createContext, FC, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useSocketConnect } from '../../hooks';
import { useRoomSocketEvents } from '../../hooks/useRoomSocketEvents';

interface Props {
    children: ReactNode;
}

export const RoomSocketContext = createContext<null | Socket<any, any>>(null);

export const RoomSocketProvider: FC<Props> = ({ children }) => {
    const socket = useSocketConnect('localhost:5000/room');

    useRoomSocketEvents(socket);

    return (
        <RoomSocketContext.Provider value={socket}>
            {children}
        </RoomSocketContext.Provider>
    );
};

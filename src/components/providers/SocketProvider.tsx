import React, { createContext, FC, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useSocketConnect, useChatSocketEvents } from '../../hooks';

interface Props {
    children: ReactNode;
}

export const SocketContext = createContext<null | Socket<any, any>>(null);

export const SocketProvider: FC<Props> = ({ children }) => {
    const socket = useSocketConnect('localhost:5000');

    useChatSocketEvents(socket);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

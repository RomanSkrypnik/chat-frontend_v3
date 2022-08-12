import React, { createContext, FC, ReactNode } from 'react';
import { Socket } from 'socket.io-client';
import { useChatSocketConnect } from '../../hooks';
import { useChatSocketEvents } from '../../hooks/useChatSocketEvents';

interface Props {
    children: ReactNode;
}

export const SocketContext = createContext<null | Socket<any, any>>(null);

export const SocketProvider: FC<Props> = ({ children }) => {
    const socket = useChatSocketConnect();

    useChatSocketEvents(socket);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

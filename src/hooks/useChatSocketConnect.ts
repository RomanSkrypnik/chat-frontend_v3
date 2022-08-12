import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const options = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    },
};

export function useChatSocketConnect(): null | Socket {
    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    useEffect(() => {
        if (!socket) {
            setSocket(io('localhost:5000', options));
        }
    }, []);

    return socket;
}

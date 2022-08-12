import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export function useChatSocketConnect(): null | Socket {
    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    useEffect(() => {
        if (!socket) {
            setSocket(io('localhost:5000', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        },
                    },
                },
            }));
        }
    }, []);

    return socket;
}

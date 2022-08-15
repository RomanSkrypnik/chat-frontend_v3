import { useContext, useEffect } from 'react';
import { useTypedSelector } from './useTypedSelector';
import { useIsCurrentUser } from './useIsCurrentUser';
import { useInView } from 'react-intersection-observer';
import { RoomSocketContext, SocketContext } from '../components/providers';

interface Params {
    messageId: number;
    isRead: boolean;
    hash: string;
}

export function useReadMessage({ messageId, isRead, hash }: Params) {
    const { user } = useTypedSelector(state => state.auth);
    const { room } = useTypedSelector(state => state.room);

    const { inView, ref } = useInView({ threshold: 0.8 });

    const socket = useContext(SocketContext);
    const roomSocket = useContext(RoomSocketContext);

    const isCurrUser = useIsCurrentUser(hash);

    useEffect(() => {
        if (inView && !isRead) {
            if (!isCurrUser) {
                const messageBody = { userId: user?.id, messageId };

                if (room) {
                    roomSocket?.emit('read-message', { ...messageBody, roomId: room?.id });
                } else {
                    socket?.emit('read-message', messageBody);
                }
            }
        }
    }, [inView]);

    return ref;
}

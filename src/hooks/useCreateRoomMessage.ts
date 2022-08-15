import { CreateMessageValues } from '../types';
import { RoomMessageService } from '../services';
import { useContext } from 'react';
import { RoomSocketContext } from '../components/providers';
import { useTypedSelector } from './useTypedSelector';

export function useCreateRoomMessage() {
    const { room } = useTypedSelector(state => state.room);

    const roomSocket = useContext(RoomSocketContext);

    return async ({ text, files }: CreateMessageValues) => {
        const fd = new FormData();

        fd.append('text', text);
        fd.append('roomId', `${room?.id}`);

        if (files) {
            for (const file of files) {
                fd.append('files', file);
            }
        }

        const { data } = await RoomMessageService.create(fd);
        roomSocket?.emit('send-message', data.data);
    };
}

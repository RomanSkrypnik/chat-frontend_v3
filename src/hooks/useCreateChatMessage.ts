import { CreateMessageValues } from '../types';
import { MessageService } from '../services';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../components/providers';

export function useCreateChatMessage() {
    const { chatHash } = useParams();

    const socket = useContext(SocketContext);

    return async ({ files, text }: CreateMessageValues) => {
        if (chatHash) {
            const fd = new FormData();

            fd.append('hash', chatHash);
            fd.append('text', text);

            if (files.length > 0) {
                for (const file of files) {
                    fd.append('files', file);
                }
            }

            const { data } = await MessageService.create(fd);

            socket?.emit('send-message', { message: data.data, hash: chatHash });
        }
    };

}

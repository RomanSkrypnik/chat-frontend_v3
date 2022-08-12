import { CreateMessageValues } from '../types';
import { MessageService } from '../services';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../components/providers';
import { useAppDispatch } from '../store';
import { addMessage } from '../store/slices/chat';

export function useCreateChatMessage() {
    const { chatHash } = useParams();

    const socket = useContext(SocketContext);

    const dispatch = useAppDispatch();

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

            dispatch(addMessage(data.data));

            socket?.emit('send-message', { message: data.data, hash: chatHash });
        }
    };

}

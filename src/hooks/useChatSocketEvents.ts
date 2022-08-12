import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { ChatDto, MessageDto, UserDto } from '../types';
import { addChat, addMessage, changeChat, changeMessage, changeUser } from '../store/slices/chat';
import { useAppDispatch } from '../store';
import { useSnackbar } from './useSnackbar';

export function useChatSocketEvents(socket: Socket | null) {
    const dispatch = useAppDispatch();

    const { snackbar } = useSnackbar();

    useEffect(() => {
        if (socket) {
            socket.on('new-chat', (chat: ChatDto) => {
                dispatch(addChat(chat));
                snackbar(`User ${chat.user.name} has started new chat with you`);
            });

            socket.on('chat-message', (message: MessageDto) => {
                dispatch(addMessage(message));
                snackbar(message.text);
            });

            socket.on('read-message', (message: MessageDto) => {
                dispatch(changeMessage(message));
            });

            socket.on('logout', (user: UserDto) => {
                dispatch(changeUser(user));
            });

            socket.on('login', (user: UserDto) => {
                dispatch(changeUser(user));
            });

            socket.on('block-unblock', (chat: ChatDto) => {
                dispatch(changeChat(chat));
            });

            socket.on('mute-unmute', (chat: ChatDto) => {
                dispatch(changeChat(chat));
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [socket]);
}

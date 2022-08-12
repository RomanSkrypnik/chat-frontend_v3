import { Socket } from 'socket.io-client';
import { useEffect } from 'react';
import { ChatDto, MessageDto, UserDto } from '../types';
import { addMessage, changeChat, changeMessage, changeUser } from '../store/slices/chat';
import { useAppDispatch } from '../store';

export function useChatSocketEvents(socket: Socket | null) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (socket) {
            socket.on('chat-message', (message: MessageDto) => {
                dispatch(addMessage(message));
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

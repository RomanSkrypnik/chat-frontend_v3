import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import {io, Socket} from "socket.io-client";
import {ChatDto, MessageDto, UserDto} from "../../types";
import {addMessage, changeChat, changeMessage, changeUser} from "../../store/slices/chat";
import {SoundService} from "../../services/SoundService";
import SnackbarMessage from "../partials/SnackbarMessage";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useAppDispatch} from "../../store";
import {useSnackbar} from "../../hooks/useSnackbar";

interface SocketProviderProps {
    children: ReactNode;
}

export const SocketContext = createContext<null | Socket<any, any>>(null);

const SocketProvider: FC<SocketProviderProps> = ({children}) => {
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);
    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    const {chats} = useTypedSelector(state => state.chat);
    const {user} = useTypedSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const {snackbar} = useSnackbar();

    useEffect(() => {
        if (!socket) {
            setSocket(io('localhost:5000', {
                transportOptions: {
                    polling: {
                        extraHeaders: {
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        }
                    }
                }
            }));
        }
    }, []);

    useEffect(() => {
        if (socket) {

            socket.on('chat-message', (message: MessageDto) => {
                dispatch(addMessage(message));
                setLastMessage(message);
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
            }
        }
    }, [socket]);

    useEffect(() => {
        if (lastMessage) {
            const chat = chats.find(({id}) => id === lastMessage.chatId);

            if (!chat?.isMuted && lastMessage?.user.id !== user?.id) {
                SoundService.playSound();
                snackbar(<SnackbarMessage user={lastMessage.user} message={lastMessage}/>);
            }
        }
    }, [lastMessage]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
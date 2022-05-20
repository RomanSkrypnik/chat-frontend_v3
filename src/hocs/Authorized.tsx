import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {useAppDispatch} from "../store";
import {ChatDto, MessageDto, UserDto} from "../types";
import {addMessage, changeChat, changeMessage, changeUser} from "../store/slices/chat";
import {useSnackbar} from "../hooks/useSnackbar";
import SnackbarMessage from "../components/partials/SnackbarMessage";
import {SoundService} from "../services/SoundService";

export const SocketContext = createContext<null | Socket<any, any>>(null);

interface AuthorizedProps {
    children: ReactNode
}

const Authorized: FC<AuthorizedProps> = ({children}) => {

    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    const {isLogged, user} = useTypedSelector(state => state.auth);

    const {chat} = useTypedSelector(state => state.chat);

    const dispatch = useAppDispatch();

    const {snackbar} = useSnackbar();

    const navigate = useNavigate();

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
            })

            return () => {
                socket.disconnect();
            }
        }
    }, [socket]);

    // TODO :: MAKE CODE BETTER ( IF IT'S POSSIBLE )
    useEffect(() => {
        if (socket && chat && user) {
            socket.removeListener('chat-message');

            socket.on('chat-message', (message: MessageDto) => {
                dispatch(addMessage(message));

                if (message.user.id !== user.id && chat.id !== message.chatId && !chat.isMuted) {
                    SoundService.playSound();
                    snackbar(<SnackbarMessage user={message.user} message={message}/>);
                }
            });
        }
    }, [chat, user]);

    useEffect(() => {
        if (!isLogged) {
            return navigate('/login');
        }
    }, [isLogged]);

    return (
        <SocketContext.Provider value={socket}>{isLogged && children}</SocketContext.Provider>
    );
};

const withAuthorized = (Component: FC, Layout: FC<any> = DefaultLayout) => {
    return (
        <Authorized>
            <Layout>
                <Component/>
            </Layout>
        </Authorized>
    )
}

export default withAuthorized;
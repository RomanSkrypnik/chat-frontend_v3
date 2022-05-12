import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {io, Socket} from "socket.io-client";
import {useAppDispatch} from "../store";
import {MessageDto} from "../types";
import {addMessage} from "../store/slices/chat";

export const SocketContext = createContext<null | Socket<any, any>>(null);

interface AuthorizedProps {
    children: ReactNode
}

const Authorized: FC<AuthorizedProps> = ({children}) => {

    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    const {isLogged} = useTypedSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) {
            setSocket(io('localhost:5000', {
                autoConnect: false, transportOptions: {
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
        return () => { socket?.close(); }
    }, [socket]);

    useEffect(() => {
        if (socket) {
            socket.connect();

            socket.on('chat-message', (message: MessageDto) => {
                dispatch(addMessage(message))
            });
        }
    }, [socket]);

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
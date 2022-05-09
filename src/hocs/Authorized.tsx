import React, {createContext, FC, ReactNode, useEffect, useState} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";
import {io, Socket} from "socket.io-client";

export const SocketContext = createContext<null | Socket<any, any>>(null);

interface AuthorizedProps {
    children: ReactNode
}

const Authorized: FC<AuthorizedProps> = ({children}) => {

    const [socket, setSocket] = useState<null | Socket<any, any>>(null);

    const {isLogged} = useTypedSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!socket) {
            setSocket(io('http://localhost:5000/'));
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.on('message', () => {
                console.log('here');
            });
        }
    }, [socket]);

    useEffect(() => {
        if (!isLogged) navigate('/login')
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
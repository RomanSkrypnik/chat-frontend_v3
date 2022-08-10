import React, { FC, ReactNode, useEffect } from 'react';
import DefaultLayout from '../layouts/DefaultLayout';
import { useNavigate } from 'react-router-dom';
import { RoomSocketProvider, SocketProvider } from '../components/providers';
import { useTypedSelector } from '../hooks';

interface AuthorizedProps {
    children: ReactNode;
}

const Authorized: FC<AuthorizedProps> = ({ children }) => {
    const { isLogged } = useTypedSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            return navigate('/login');
        }
    }, [isLogged]);

    return (
        <SocketProvider>
            <RoomSocketProvider>
                {isLogged && children}
            </RoomSocketProvider>
        </SocketProvider>
    );
};

const withAuthorized = (Component: FC, Layout: FC<any> = DefaultLayout) => {
    return (
        <Authorized>
            <Layout>
                <Component />
            </Layout>
        </Authorized>
    );
};

export default withAuthorized;

import React, { FC, ReactNode, useEffect } from 'react';
import EmptyLayout from '../layouts/EmptyLayout';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks';

interface UnauthorizedProps {
    children: ReactNode;
}

const Unauthorized: FC<UnauthorizedProps> = ({ children }) => {

    const { isLogged } = useTypedSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLogged) navigate('/');
    }, [isLogged]);

    return (
        <>{!isLogged && children}</>
    );
};

const withUnauthorized = (Component: FC, Layout: FC<any> = EmptyLayout) => {
    return (
        <Unauthorized>
            <Layout>
                <Component />
            </Layout>
        </Unauthorized>
    );
};

export default withUnauthorized;

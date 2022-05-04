import React, {FC, ReactNode, useEffect} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useNavigate} from "react-router-dom";

interface AuthorizedProps {
    children: ReactNode
}

const Authorized: FC<AuthorizedProps> = ({children}) => {

    const {isLogged} = useTypedSelector(state => state.auth);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) navigate('/login')
    }, [isLogged]);

    return (
        <>{isLogged && children}</>
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
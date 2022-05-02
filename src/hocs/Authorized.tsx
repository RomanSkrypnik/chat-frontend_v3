import React, {FC, ReactNode} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";

interface AuthorizedProps {
    children: ReactNode
}

const Authorized: FC<AuthorizedProps> = ({children}) => {
    return (
        <>{children}</>
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
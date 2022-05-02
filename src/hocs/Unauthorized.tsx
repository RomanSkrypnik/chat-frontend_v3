import React, {FC, ReactNode} from 'react';
import DefaultLayout from "../layouts/DefaultLayout";
import EmptyLayout from "../layouts/EmptyLayout";

interface UnauthorizedProps {
    children: ReactNode
}

const Unauthorized: FC<UnauthorizedProps> = ({children}) => {
    return (
        <>{children}</>
    );
};

const withUnauthorized = (Component: FC, Layout: FC<any> = EmptyLayout) => {
    return (
        <Unauthorized>
            <Layout>
                <Component/>
            </Layout>
        </Unauthorized>
    )
}

export default withUnauthorized;
import React, {FC, ReactNode} from 'react';
import Sidebar from "../components/Sidebar";

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {



    return (
        <div className="default-layout">
            <div className="d-flex">
                <Sidebar/>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default DefaultLayout;
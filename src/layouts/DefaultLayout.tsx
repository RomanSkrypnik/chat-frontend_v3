import React, {FC, ReactNode} from 'react';
import Sidebar from "../components/Sidebar";

interface DefaultLayoutProps {
    children: ReactNode
}

const DefaultLayout: FC<DefaultLayoutProps> = ({children}) => {
    return (
        <div className="default-layout">
            <div className="d-flex">
                <Sidebar/>
                <main className="w-100">{children}</main>
            </div>
        </div>
    );
};

export default DefaultLayout;
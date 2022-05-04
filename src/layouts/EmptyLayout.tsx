import React, {FC, ReactNode} from 'react';

interface EmptyLayoutProps {
    children: ReactNode
}

const EmptyLayout: FC<EmptyLayoutProps> = ({children}) => {
    return (
        <div className="empty-layout">
            <main className="w-100">
                {children}
            </main>
        </div>
    );
};

export default EmptyLayout;
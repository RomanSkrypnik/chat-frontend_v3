import React, { FC, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export const CenteredContainer: FC<Props> = ({ children }) => {
    return (
        <div className='top-50 start-50 translate-middle position-absolute'>
            {children}
        </div>
    );
};

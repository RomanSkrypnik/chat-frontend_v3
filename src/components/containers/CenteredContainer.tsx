import React, {FC, ReactNode} from 'react';

interface CenteredContainerProps {
    children: ReactNode;
}

const CenteredContainer: FC<CenteredContainerProps> = ({children}) => {
    return (
        <div className="top-50 start-0 translate-middle position-absolute">
            {children}
        </div>
    );
};

export default CenteredContainer;
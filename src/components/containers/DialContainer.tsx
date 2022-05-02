import React, {FC, ReactNode} from 'react';

interface DialContainerProps {
    children: ReactNode;
}

const DialContainer: FC<DialContainerProps> = ({children}) => {
    return (
        <div className="dial-container">
            {children}
        </div>
    );
};

export default DialContainer;
import React, {FC, ReactNode} from 'react';
import Portal from "../Portal";

interface DialContainerProps {
    onClose: () => void;
    children: ReactNode;
}

const DialContainer: FC<DialContainerProps> = ({onClose, children}) => {
    return (
        <Portal onClick={onClose}>
            <div className="dial-container">
                {children}
            </div>
        </Portal>
    );
};

export default DialContainer;
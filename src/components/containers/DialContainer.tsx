import React, {FC, ReactNode} from 'react';
import Portal from "../Portal";
import cn from "classnames";

interface DialContainerProps {
    className?: string;
    onClose: () => void;
    children: ReactNode;
}

const DialContainer: FC<DialContainerProps> = ({className, onClose, children}) => {
    return (
        <Portal onClick={onClose}>
            <div className={cn("dial-container", className)}>
                {children}
            </div>
        </Portal>
    );
};

export default DialContainer;
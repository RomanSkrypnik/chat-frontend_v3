import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Portal } from '../Portal';

interface DialContainerProps {
    className?: string;
    onClose: () => void;
    children: ReactNode;
}

export const DialContainer: FC<DialContainerProps> = ({ className, onClose, children }) => {
    return (
        <Portal onClick={onClose}>
            <div className={cn('dial-container', className)}>
                {children}
            </div>
        </Portal>
    );
};

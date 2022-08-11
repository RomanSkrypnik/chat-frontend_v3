import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

interface Props {
    className?: string;
    onClick: () => void;
    children: ReactNode;
}

export const IconButton: FC<Props> = ({ onClick, className, children }) => {
    return (
        <button className={cn('icon-button', className)} onClick={onClick}>
            {children}
        </button>
    );
};

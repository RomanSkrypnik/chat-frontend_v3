import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

interface ButtonWithIconProps {
    onClick?: () => void;
    className?: string;
    icon: ReactNode;
    children: ReactNode;
}

export const ButtonIcon: FC<ButtonWithIconProps> = ({ onClick, className, icon, children }) => {
    return (
        <button className={cn('button-icon', className)} onClick={onClick}>
            {icon}
            <span className='ms-4'>{children}</span>
        </button>
    );
};

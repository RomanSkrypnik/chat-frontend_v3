import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import { Typography } from '../../common';

interface RegularButtonProps {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    icon?: ReactNode;
    children: ReactNode;
}

export const RegularButton: FC<RegularButtonProps> = ({ type = 'button', className, onClick, icon, children }) => {
    return (
        <button type={type} className={cn('regular-button', className)} onClick={onClick}>
            {icon && <span className='regular-button__icon'>{icon}</span>}
            <Typography fz={18} as='span'>{children}</Typography>
        </button>
    );
};

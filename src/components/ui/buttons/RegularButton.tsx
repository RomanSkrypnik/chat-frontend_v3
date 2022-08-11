import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

interface Props {
    type?: 'button' | 'submit' | 'reset';
    className?: string;
    onClick?: () => void;
    icon?: ReactNode;
    children: ReactNode;
}

export const RegularButton: FC<Props> = ({ type = 'button', className, onClick, icon, children }) => {
    return (
        <button type={type} className={cn('regular-button', className)} onClick={onClick}>
            {icon && <span className='regular-button__icon'>{icon}</span>}
            <span className='body-1'>{children}</span>
        </button>
    );
};

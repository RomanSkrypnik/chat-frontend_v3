import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

interface Props {
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    icon: ReactNode;
    className?: string;
}

export const CircleButton: FC<Props> = ({ disabled, onClick, icon, className, type = 'button' }) => {
    return (
        <button type={type} className={cn('circle-button', className)} onClick={onClick} disabled={disabled}>
            <span className='circle-button__icon'>
                {icon}
            </span>
        </button>
    );
};

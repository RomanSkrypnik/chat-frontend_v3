import React, { FC, ReactNode } from 'react';
import cn from 'classnames';

interface CardContainer {
    onClose?: () => void;
    title?: string;
    className?: string;
    children: ReactNode;
}

export const CardContainer: FC<CardContainer> = ({ onClose, className, title, children }) => {
    const withHeader = onClose || title;

    const handleClick = (e: any) => {
        e.nativeEvent.stopImmediatePropagation();
    };

    return (
        <div className={cn('card-container fade-in', className)} onClick={handleClick}>
            {
                withHeader &&
                <div className='card-container__header mb-4'>
                    {title && <h3>{title}</h3>}
                </div>
            }
            {children}
        </div>
    );
};

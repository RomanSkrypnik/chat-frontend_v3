import React, { FC, ReactNode } from 'react';
import cn from 'classnames';
import { NavLink } from 'react-router-dom';

interface Props {
    icon: ReactNode;
    text: string;
    onClick?: (param?: any) => void;
    className?: string;
    href?: string;
}

export const SidebarButton: FC<Props> = ({ icon, text, onClick, className, href }) => {

    return (
        <>
            {
                href ?
                    <NavLink className={cn('sidebar-button', className)} to={href}>
                        {icon}
                        <div className='sidebar-button__text'>{text}</div>
                    </NavLink>
                    :
                    <button className={cn('sidebar-button', className)} onClick={onClick}>
                        {icon}
                        <div className='sidebar-button__text'>{text}</div>
                    </button>

            }
        </>
    );
};

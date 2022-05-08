import React, {FC, ReactNode} from 'react';
import cn from "classnames";
import {NavLink} from "react-router-dom";

interface IconLinkProps {
    icon: ReactNode;
    text: string;
    onClick?: () => void;
    className?: string;
    href?: string;
}

const IconButton: FC<IconLinkProps> = ({icon, text, onClick, className, href}) => {

    return (
        <>
            {
                href ?
                    <NavLink className={cn("icon-button", className)} to={href}>
                        {icon}
                        <div className="icon-button__text">{text}</div>
                    </NavLink>
                    :
                    <button className={cn("icon-button", className)} onClick={onClick}>
                        {icon}
                        <div className="icon-button__text">{text}</div>
                    </button>

            }
        </>
    );
};

export default IconButton;
import React, {FC, ReactNode} from 'react';
import cn from "classnames";
import { Typography } from '../../common';

interface ButtonWithIconProps {
    onClick?: () => void;
    className?: string;
    icon: ReactNode;
    children: ReactNode;
}

export const ButtonIcon: FC<ButtonWithIconProps> = ({onClick, className, icon, children}) => {
    return (
        <button className={cn("button-icon", className)} onClick={onClick}>
            {icon}
            <Typography className="ms-4">{children}</Typography>
        </button>
    );
};

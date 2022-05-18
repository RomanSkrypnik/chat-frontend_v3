import React, {FC, ReactNode} from 'react';
import cn from "classnames";
import Typography from "../../common/Typography";

interface ButtonWithIconProps {
    onClick?: () => void;
    className?: string;
    icon: ReactNode;
    children: ReactNode;
}

const ButtonIcon: FC<ButtonWithIconProps> = ({onClick, className, icon, children}) => {
    return (
        <button className={cn("button-icon", className)} onClick={onClick}>
            {icon}
            <Typography className="ms-4">{children}</Typography>
        </button>
    );
};

export default ButtonIcon;
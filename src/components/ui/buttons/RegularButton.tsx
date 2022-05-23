import React, {FC, ReactNode} from 'react';
import cn from "classnames";
import Typography from "../../common/Typography";

interface RegularButtonProps {
    className?: string;
    onClick?: () => void;
    icon?: ReactNode;
    children: ReactNode;
}

const RegularButton: FC<RegularButtonProps> = ({className, onClick, icon, children}) => {
    return (
        <button className={cn("regular-button", className)} onClick={onClick}>
            {icon && <span className="regular-button__icon">{icon}</span>}
            <Typography fz={18}>{children}</Typography>
        </button>
    );
};

export default RegularButton;
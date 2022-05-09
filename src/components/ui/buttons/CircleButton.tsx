import React, {FC, ReactNode} from 'react';
import cn from "classnames";

interface CircleButtonProps {
    type?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: () => void;
    icon: ReactNode;
    className?: string;
}

const CircleButton: FC<CircleButtonProps> = ({onClick, icon, className, type = 'button'}) => {
    return (
        <button type={type} className={cn("circle-button", className)} onClick={onClick}>
            <span className="circle-button__icon">
                {icon}
            </span>
        </button>
    );
};

export default CircleButton;
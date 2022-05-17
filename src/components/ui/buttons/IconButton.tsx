import React, {FC, ReactNode} from 'react';
import cn from 'classnames';

interface IconButtonProps {
    className?: string;
    onClick: () => void;
    children: ReactNode;
}

const IconButton: FC<IconButtonProps> = ({onClick, className, children}) => {
    return (
        <button className={cn("icon-button", className)} onClick={onClick}>
            {children}
        </button>
    );
};

export default IconButton;
import React, {FC, ReactNode} from 'react';
import {CloseButton} from "react-bootstrap";
import Typography from "../common/Typography";
import cn from "classnames";

interface CardContainer {
    onClose?: () => void;
    title?: string;
    className?: string;
    children: ReactNode;
}

const CardContainer: FC<CardContainer> = ({onClose, className, title, children}) => {
    const withHeader = onClose || title;

    const handleClick = (e: any) => {
        e.nativeEvent.stopImmediatePropagation();
    }

    return (
        <div className={cn("card-container", className)} onClick={handleClick}>
            {
                withHeader &&
                <div className="card-container__header mb-4">
                    {title && <Typography fz={21}>{title}</Typography>}
                    {onClose && <CloseButton onClick={onClose}/>}
                </div>
            }
            {children}
        </div>
    );
};

export default CardContainer;
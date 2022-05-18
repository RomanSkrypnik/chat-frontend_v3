import React, {FC, ReactNode} from 'react';
import {CloseButton} from "react-bootstrap";
import Typography from "../common/Typography";

interface CardContainer {
    onClose?: () => void;
    title?: string;
    children: ReactNode;
}

const CardContainer: FC<CardContainer> = ({onClose, title, children}) => {
    const withHeader = onClose || title;

    const handleClick = (e: any) => e.nativeEvent.stopImmediatePropagation();

    return (
        <div className="card-container" onClick={handleClick}>
            {
                withHeader &&
                <div className="card-container__header mb-4">
                    {title && <Typography fz={20}>{title}</Typography>}
                    {onClose && <CloseButton onClick={onClose}/>}
                </div>
            }
            {children}
        </div>
    );
};

export default CardContainer;
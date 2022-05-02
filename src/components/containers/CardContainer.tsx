import React, {FC, ReactNode} from 'react';

interface CardContainer {
    children: ReactNode
}

const CardContainer: FC<CardContainer> = ({children}) => {
    return (
        <div className="card-container">
            {children}
        </div>
    );
};

export default CardContainer;
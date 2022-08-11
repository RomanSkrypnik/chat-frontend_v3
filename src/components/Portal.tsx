import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
    onClick: () => void;
    transparent?: boolean;
    children: ReactNode;
}

export const Portal: FC<Props> = ({ onClick, transparent = false, children }) => {

    const [container] = useState(() => document.createElement('div'));

    useEffect(() => {
        const activeOverlay = document.getElementsByClassName('overlay_black');

        document.body.appendChild(container);

        const className = getClassName(activeOverlay);

        container.classList.add('overlay', className);
        onClick && container.addEventListener('click', onClick);

        return () => {
            document.body.removeChild(container);
        };
    }, []);

    const getClassName = (activeOverlay: HTMLCollectionOf<Element>) => {
        let className = '';

        if (activeOverlay.length === 0 || !transparent) {
            className = 'overlay_black';
        }

        return className;
    };

    return createPortal(children, container);
};

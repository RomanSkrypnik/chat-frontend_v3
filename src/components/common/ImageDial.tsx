import React, { FC } from 'react';
import { DialContainer } from '../containers';

interface ImageDialProps {
    onClose: () => void;
    src: string;
}

export const ImageDial: FC<ImageDialProps> = ({ src, onClose }) => {

    return (
        <DialContainer onClose={onClose}>
            <img src={src} alt='' />
        </DialContainer>
    );
};

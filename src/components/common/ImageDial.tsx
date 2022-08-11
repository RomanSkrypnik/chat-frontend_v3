import React, { FC } from 'react';
import { DialContainer } from '../containers';

interface Props {
    onClose: () => void;
    src: string;
}

export const ImageDial: FC<Props> = ({ src, onClose }) => {

    return (
        <DialContainer onClose={onClose}>
            <img src={src} alt='' />
        </DialContainer>
    );
};

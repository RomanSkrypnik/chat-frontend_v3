import React, {FC} from 'react';
import DialContainer from "../containers/DialContainer";
import {CloseButton} from "react-bootstrap";

interface ImageDialProps {
    onClose: () => void;
    src: string;
}

const ImageDial: FC<ImageDialProps> = ({src, onClose}) => {

    return (
        <DialContainer onClose={onClose}>
            <img src={src} alt="Image"/>
        </DialContainer>
    );
};

export default ImageDial;
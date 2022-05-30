import React, {FC} from 'react';
import DialContainer from "../containers/DialContainer";

interface ImageDialProps {
    onClose: () => void;
    src: string;
}

const ImageDial: FC<ImageDialProps> = ({src, onClose}) => {

    return (
        <DialContainer onClose={onClose}>
            <img src={src} alt=""/>
        </DialContainer>
    );
};

export default ImageDial;
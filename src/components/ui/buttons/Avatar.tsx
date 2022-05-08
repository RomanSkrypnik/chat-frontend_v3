import React, {FC} from 'react';
import cn from "classnames";

interface AvatarProps {
    width?: number;
    height?: number;
    onClick?: () => void;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({className, width, height}) => {
    return (
        <button className={cn("avatar", className)} style={{width, height}}>
            <img src="https://www.meme-arsenal.com/memes/7e237779d9ae164f9f17ca960c2fa150.jpg" alt="" />
        </button>
    );
};

export default Avatar;
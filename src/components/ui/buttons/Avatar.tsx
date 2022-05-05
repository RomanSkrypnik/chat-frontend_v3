import React, {FC} from 'react';
import cn from "classnames";

interface AvatarProps {
    className?: string;
}

const Avatar: FC<AvatarProps> = ({className}) => {
    return (
        <div className={cn("avatar", className)}>
            <img src="https://www.meme-arsenal.com/memes/7e237779d9ae164f9f17ca960c2fa150.jpg" alt="" />
        </div>
    );
};

export default Avatar;
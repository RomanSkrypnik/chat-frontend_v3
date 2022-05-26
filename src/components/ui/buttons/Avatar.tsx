import React, {FC} from 'react';
import cn from "classnames";

interface AvatarProps {
    isOnline?: boolean;
    width?: number;
    height?: number;
    onClick?: () => void;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({className, width, height, isOnline = false}) => {
    return (
        <div className="position-relative">
            <button className={cn("avatar", className)} style={{width, height}}>
                <img src="https://www.meme-arsenal.com/memes/7e237779d9ae164f9f17ca960c2fa150.jpg" alt=""/>
            </button>
            {isOnline && <span className="avatar__online" />}
        </div>
    );
};

export default Avatar;
import React, {FC} from 'react';
import cn from "classnames";

interface AvatarProps {
    src?: string;
    alt?: string;
    isOnline?: boolean;
    width?: number;
    height?: number;
    onClick?: () => void;
    className?: string;
}

const Avatar: FC<AvatarProps> = ({src, alt, className, width, height, isOnline = false}) => {
    return (
        <div className="position-relative">
            <button className={cn("avatar", className)} style={{width, height}}>
                <img src={src} alt={alt}/>
            </button>
            {isOnline && <span className="avatar__online" />}
        </div>
    );
};

export default Avatar;
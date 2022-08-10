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

export const Avatar: FC<AvatarProps> = ({onClick, src, alt, className, width, height, isOnline = false}) => {
    return (
        <div className="position-relative">
            <button className={cn("avatar", className)} style={{width, height}} onClick={onClick}>
                <img src={src} alt={alt}/>
            </button>
            {isOnline && <span className="avatar__online" />}
        </div>
    );
};

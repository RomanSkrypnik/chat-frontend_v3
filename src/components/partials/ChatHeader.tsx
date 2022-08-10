import React, { FC, useState } from 'react';
import Avatar from "../ui/buttons/Avatar";
import {UserDto} from "../../types";
import CircleButton from "../ui/buttons/CircleButton";
import ThreeDotsIcon from "../ui/icons/ThreeDotsIcon";
import {useFormatDuration} from "../../hooks/useDate";
import UserProfile from "../common/UserProfile";
import { Typography } from '../common';

interface ChatHeaderProps {
    user: UserDto;
}

export const ChatHeader: FC<ChatHeaderProps> = ({user}) => {
    const [show, setShow] = useState(false);

    const lastSeen = useFormatDuration(user.lastSeen);

    const handleClick = () => setShow(!show);

    return (
        <>
            <div className="chat-header">
                <div className="d-flex justify-content-between">

                    <div className="d-flex">
                        <Avatar onClick={handleClick}/>
                        <div className="ms-3">
                            <Typography fz={18} className="fw-bold">{user.name}</Typography>
                            <Typography className="text-primary">
                                {(user.online && 'Online') || `last seen ${lastSeen}`}
                            </Typography>
                        </div>
                    </div>

                    <CircleButton onClick={handleClick} icon={<ThreeDotsIcon/>}/>
                </div>
            </div>

            {show && <UserProfile user={user} onClose={handleClick}/>}
        </>
    );
};

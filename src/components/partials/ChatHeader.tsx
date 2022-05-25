import React, {FC, useState} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {UserDto} from "../../types";
import CircleButton from "../ui/buttons/CircleButton";
import ThreeDotsIcon from "../ui/icons/ThreeDotsIcon";
import Typography from "../common/Typography";
import {useFormatDuration} from "../../hooks/useDate";
import UserProfile from "../common/UserProfile";

interface ChatHeaderProps {
    user: UserDto;
}

const ChatHeader: FC<ChatHeaderProps> = ({user}) => {
    const [show, setShow] = useState(false);

    const lastSeen = useFormatDuration(user.lastSeen);

    const handleClick = () => setShow(!show);

    return (
        <>
            <div className="chat-header">
                <div className="d-flex justify-content-between">

                    <div className="d-flex">
                        <Avatar/>
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

export default ChatHeader;
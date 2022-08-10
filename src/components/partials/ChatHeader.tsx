import React, { FC, useState } from 'react';
import { UserDto } from '../../types';
import { useFormatDuration } from '../../hooks/useDate';
import { Typography, UserProfile } from '../common';
import { CircleButton, ThreeDotsIcon } from '../ui';
import { Avatar } from '../ui/buttons/Avatar';

interface ChatHeaderProps {
    user: UserDto;
}

export const ChatHeader: FC<ChatHeaderProps> = ({ user }) => {
    const [show, setShow] = useState(false);

    const lastSeen = useFormatDuration(user.lastSeen);

    const handleClick = () => setShow(!show);

    return (
        <>
            <div className='chat-header'>
                <div className='d-flex justify-content-between'>

                    <div className='d-flex'>
                        <Avatar onClick={handleClick} />
                        <div className='ms-3'>
                            <Typography fz={18} className='fw-bold'>{user.name}</Typography>
                            <Typography className='text-primary'>
                                {(user.online && 'Online') || `last seen ${lastSeen}`}
                            </Typography>
                        </div>
                    </div>

                    <CircleButton onClick={handleClick} icon={<ThreeDotsIcon />} />
                </div>
            </div>

            {show && <UserProfile user={user} onClose={handleClick} />}
        </>
    );
};

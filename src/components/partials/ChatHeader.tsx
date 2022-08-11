import React, { FC, useState } from 'react';
import { UserDto } from '../../types';
import { useFormatDuration } from '../../hooks';
import { UserProfile } from '../common';
import { CircleButton, ThreeDotsIcon } from '../ui';
import { Avatar } from '../ui/buttons/Avatar';

interface Props {
    user: UserDto;
}

export const ChatHeader: FC<Props> = ({ user }) => {
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
                            <h2 className='body-1 fw-bold'>{user.name}</h2>
                            <h3 className='body-2 text-primary'>
                                {(user.online && 'Online') || `last seen ${lastSeen}`}
                            </h3>
                        </div>
                    </div>

                    <CircleButton onClick={handleClick} icon={<ThreeDotsIcon />} />
                </div>
            </div>

            {show && <UserProfile user={user} onClose={handleClick} />}
        </>
    );
};

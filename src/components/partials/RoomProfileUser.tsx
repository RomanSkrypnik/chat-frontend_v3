import React, { FC } from 'react';
import Avatar from '../ui/buttons/Avatar';
import { UserDto } from '../../types';
import { useFormatDuration } from '../../hooks/useDate';
import { Typography } from '../common';

interface RoomProfileUserProps {
    user: UserDto;
}

const RoomProfileUser: FC<RoomProfileUserProps> = ({ user }) => {

    const lastSeen = useFormatDuration(user.lastSeen);

    return (
        <div className='d-flex align-items-center mb-3'>
            <Avatar />
            <div className='ms-3'>
                <Typography>{user.name}</Typography>
                <Typography className='text-primary'>
                    {
                        (user.isInRoom && 'Currently in a room') || (user.online && 'online') || lastSeen
                    }
                </Typography>
            </div>
        </div>
    );
};

export default RoomProfileUser;

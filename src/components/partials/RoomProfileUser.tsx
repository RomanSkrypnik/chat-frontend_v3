import React, { FC } from 'react';
import { UserDto } from '../../types';
import { Typography } from '../common';
import { Avatar } from '../ui/buttons/Avatar';
import { useFormatDuration } from '../../hooks';

interface RoomProfileUserProps {
    user: UserDto;
}

export const RoomProfileUser: FC<RoomProfileUserProps> = ({ user }) => {

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

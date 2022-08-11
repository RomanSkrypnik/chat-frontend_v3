import React, { FC } from 'react';
import { UserDto } from '../../types';
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
                <p>{user.name}</p>
                <p className='text-primary'>
                    {
                        (user.isInRoom && 'Currently in a room') || (user.online && 'online') || lastSeen
                    }
                </p>
            </div>
        </div>
    );
};

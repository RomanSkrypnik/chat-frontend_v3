import React from 'react';
import { Typography } from '../common';
import { Avatar } from '../ui/buttons/Avatar';
import { useStorageUrl, useTypedSelector } from '../../hooks';

export const SidebarHeader = () => {

    const { user } = useTypedSelector(state => state.auth);

    const src = useStorageUrl('/avatars/', user?.avatar);

    return (
        <div className='sidebar__header'>
            <div className='d-flex flex-column align-items-center'>
                <Avatar src={src} isOnline={user?.online} width={96} height={96} className='mb-1' />
                {user && <Typography fz='18px' lh='21px' className='fw-bold mt-2'>{user.name}</Typography>}
            </div>
        </div>
    );
};

import React from 'react';
import { Avatar } from '../ui/buttons/Avatar';
import { useStorageUrl, useTypedSelector } from '../../hooks';

export const SidebarHeader = () => {

    const { user } = useTypedSelector(state => state.auth);

    const src = useStorageUrl('/avatars/', user?.avatar);

    return (
        <div className='sidebar__header'>
            <div className='d-flex flex-column align-items-center'>
                <Avatar src={src} isOnline={user?.online} width={96} height={96} className='mb-1' />
                {user && <span className='body-1 fw-bold mt-2'>{user.name}</span>}
            </div>
        </div>
    );
};

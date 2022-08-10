import React, { FC } from 'react';
import { UserDto } from '../../types';
import Avatar from '../ui/buttons/Avatar';
import useStorageUrl from '../../hooks/useStorageUrl';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../common';

interface UserSearchItemProps {
    user: UserDto;
    onClose: () => void;
}

const UserSearchItem: FC<UserSearchItemProps> = ({ user, onClose }) => {
    const navigate = useNavigate();

    const src = useStorageUrl('/avatars/', user.avatar);

    const handleClick = () => {
        navigate(`/${user.hash}`);
        onClose();
    };

    return (
        <div className='d-flex align-items-center mt-3'>
            <Avatar src={src} />
            <div className='d-flex justify-content-between align-items-center w-100 ms-3'>
                <Typography>{user.name}</Typography>
                <button className='btn btn-success' onClick={handleClick}>Send message</button>
            </div>
        </div>
    );
};

export default UserSearchItem;

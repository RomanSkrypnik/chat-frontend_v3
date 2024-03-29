import React, { FC } from 'react';
import { UserDto } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '../ui/buttons/Avatar';
import { useStorageUrl } from '../../hooks';

interface Props {
    user: UserDto;
    onClose: () => void;
}

export const UserSearchItem: FC<Props> = ({ user, onClose }) => {
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
                <span className='body-1'>{user.name}</span>
                <button className='btn btn-success' onClick={handleClick}>Send message</button>
            </div>
        </div>
    );
};

import React, { FC } from 'react';
import { MessageDto, UserDto } from '../../types';
import { Avatar } from '../ui/buttons/Avatar';
import { useFormatDate } from '../../hooks';

interface MessageSnackbarProps {
    user: UserDto;
    message: MessageDto;
}

export const SnackbarMessage: FC<MessageSnackbarProps> = ({ user, message }) => {
    const date = useFormatDate(message.createdAt, 'hh:mm');

    return (
        <>
            <div className='d-flex'>
                <Avatar isOnline={user.online} />
                <div className='ms-2'>{user.name}</div>
            </div>
            <div className='d-flex justify-content-between mt-2'>
                <div>Send you new message</div>
                <div>{date}</div>
            </div>
        </>
    );
};

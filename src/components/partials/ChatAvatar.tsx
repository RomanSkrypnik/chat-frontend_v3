import React, { FC } from 'react';
import { Avatar, Box } from '@mui/material';
import { getFirstLetter } from '../../helpers';
import { useShowAvatar } from '../../hooks';

interface Props {
    src: string | null;
    username: string;
    createdAt: string;
    prevUsername: string | null;
    prevCreatedAt: string | null;
}

export const ChatAvatar: FC<Props> = ({ src, username, createdAt, prevUsername, prevCreatedAt }) => {
    const show = useShowAvatar(username, createdAt, prevUsername, prevCreatedAt);

    return (
        <>
            {
                show
                    ? <Avatar src={src ?? undefined} sx={{ mr: '10px' }}>{getFirstLetter(username)}</Avatar>
                    : <Box sx={{ mr: '50px' }} />
            }
        </>
    );
};

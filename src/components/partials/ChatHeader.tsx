import React, { FC, useState } from 'react';
import { UserDto } from '../../types';
import { useFormatDuration } from '../../hooks';
import { UserProfile } from '../common';
import { ThreeDotsIcon } from '../ui';
import { Avatar, Box, Card, IconButton, Typography } from '@mui/material';

interface Props {
    user: UserDto;
}

export const ChatHeader: FC<Props> = ({ user }) => {
    const [show, setShow] = useState(false);

    const lastSeen = useFormatDuration(user.lastSeen);

    const handleClick = () => setShow(!show);

    return (
        <>
            <Card sx={sx}>
                <Box sx={{ display: 'flex' }}>
                    <Avatar src={user.avatar ?? undefined} onClick={handleClick} />
                    <Box sx={{ ml: 2 }}>
                        <Typography>{user.name}</Typography>
                        <Typography sx={{ color: 'primary.main' }}>
                            {(user.online && 'Online') || `last seen ${lastSeen}`}
                        </Typography>
                    </Box>
                </Box>
                <IconButton onClick={handleClick}>
                    <ThreeDotsIcon />
                </IconButton>
            </Card>
            {show && <UserProfile user={user} onClose={handleClick} />}
        </>
    );
};

const sx = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 };

import React, { FC, useContext } from 'react';
import { UserDto } from '../../types';
import { ProhibitedIcon, UnlockedIcon } from '../ui';
import { SocketContext } from '../providers';
import { useFormatDuration, useStorageUrl, useTypedSelector } from '../../hooks';
import { Avatar, Box, Dialog, DialogContent, DialogTitle, IconButton, Switch, Typography } from '@mui/material';
import { DialogHeader } from '../partials';

interface UserBioProps {
    bio: string;
}

const UserBio: FC<UserBioProps> = ({ bio }) => {
    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant='body1'>{bio}</Typography>
            <Typography variant='body2'>Bio</Typography>
        </Box>
    );
};

interface NotificationProps {
    isMuted: boolean;
    userId: number;
}

const Notification: FC<NotificationProps> = ({ isMuted, userId }) => {
    const socket = useContext(SocketContext);

    const muteUnmute = () => socket?.emit('mute-unmute', userId);

    return (
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='body1'>Notification</Typography>
            <Switch onChange={muteUnmute} checked={!isMuted} />
        </Box>
    );
};

interface BlockButtonProps {
    isBlockedByMe: boolean;
    userId: number;
}

const BlockButton: FC<BlockButtonProps> = ({ isBlockedByMe, userId }) => {
    const socket = useContext(SocketContext);

    const blockUnblock = () => socket?.emit('block-unblock', userId);

    return (
        <>
            {
                isBlockedByMe
                    ? <IconButton disableRipple onClick={blockUnblock} sx={{ px: 0, borderRadius: 0 }}>
                        <UnlockedIcon />
                        <Typography sx={{ ml: 1 }} variant='body1'>Unblock user</Typography>
                    </IconButton>
                    : <IconButton disableRipple onClick={blockUnblock} sx={{ px: 0, borderRadius: 0 }}>
                        <ProhibitedIcon />
                        <Typography sx={{ ml: 1 }} variant='body1'>Block user</Typography>
                    </IconButton>
            }
        </>
    );
};

interface UserProfileDialProps {
    open: boolean;
    handleClose: () => void;
    user: UserDto;
    onClose: () => void;
}

export const UserProfile: FC<UserProfileDialProps> = ({ handleClose, open, user, onClose }) => {
    const { chat } = useTypedSelector(state => state.chat);

    const date = useFormatDuration(user.lastSeen);

    const src = useStorageUrl('/avatars/', user.avatar);

    return (
        <Dialog
            fullWidth
            maxWidth='xs'
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogHeader onClose={handleClose}>
                User info
            </DialogHeader>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pb: 3 }}>
                    <Avatar src={src} />
                    <Box sx={{ ml: 2 }}>
                        <Typography variant='body1'>{user.name}</Typography>
                        <Typography variant='body1' sx={{ color: 'info.main' }}>
                            {(user.online && 'Online') || `last seen ${date}`}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ borderTop: 1, py: 1 }}>
                    <Typography variant='body1'>{user.username}</Typography>
                    <Typography variant='body2'>Username</Typography>
                    {user.bio && <UserBio bio={user.bio} />}
                    {chat && <Notification userId={user.id} isMuted={chat.isMuted} />}
                </Box>
                <Box sx={{ borderTop: 1, py: 1 }}>
                    {chat && <BlockButton userId={user.id} isBlockedByMe={chat.isBlockedByMe} />}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

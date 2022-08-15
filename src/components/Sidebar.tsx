import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { ChatIcon, HumanIcon, PowerOnIcon, SettingsIcon } from './ui';
import { logout } from '../store/slices/auth';
import {
    Avatar,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography,
} from '@mui/material';
import { useTypedSelector } from '../hooks';

export const Sidebar = () => {

    const { chatHash, roomHash } = useParams();

    const { user } = useTypedSelector(state => state.auth);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const items = [
        { icon: <ChatIcon />, text: 'Chats', to: `/${chatHash ?? ''}` },
        { icon: <HumanIcon />, text: 'Rooms', to: `/rooms/${roomHash ?? ''}` },
        { icon: <SettingsIcon />, text: 'Settings', to: '/settings' },
    ];

    const handleClick = (to: string) => navigate(to);

    const handleLogout = () => dispatch(logout());

    return (
        <Drawer sx={sx} variant='permanent' anchor='left'>
            <Toolbar>
                <Avatar alt={user?.username} />
                <Typography sx={{ ml: 2 }}>{user?.username}</Typography>
            </Toolbar>
            <Divider />
            <List disablePadding>
                {items.map(({ icon, text, to }, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton onClick={() => handleClick(to)}>
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List sx={{ mt: 'auto' }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <PowerOnIcon />
                        </ListItemIcon>
                        <ListItemText primary='Log out' />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

const sx = {
    width: 250,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 250,
        boxSizing: 'border-box',
    },
};

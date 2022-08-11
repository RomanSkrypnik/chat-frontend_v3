import React from 'react';
import { ChatIcon, HumanIcon, SettingsIcon, SidebarButton } from '../ui';
import { useParams } from 'react-router-dom';

export const SidebarMenu = () => {
    const { chatHash, roomHash } = useParams();

    const items = [
        { icon: <ChatIcon />, text: 'Chats', to: `/${chatHash ?? ''}`, key: 0 },
        { icon: <HumanIcon />, text: 'Rooms', to: `/rooms/${roomHash ?? ''}`, key: 1 },
        { icon: <SettingsIcon />, text: 'Settings', to: '/settings', key: 2 },
    ];

    return (
        <ul className='sidebar__menu list-unstyled'>
            {
                items.map(item =>
                    <SidebarButton
                        className='mt-4'
                        icon={item.icon}
                        text={item.text}
                        href={item.to}
                        key={item.key}
                    />,
                )
            }
        </ul>
    );
};

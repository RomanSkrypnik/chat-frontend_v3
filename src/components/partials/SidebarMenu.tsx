import React from 'react';
import { ChatIcon, HumanIcon, SettingsIcon, SidebarButton } from '../ui';

export const SidebarMenu = () => {

    const items = [
        { icon: <ChatIcon />, text: 'Chats', to: '/', key: 0 },
        { icon: <HumanIcon />, text: 'Rooms', to: '/rooms', key: 1 },
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

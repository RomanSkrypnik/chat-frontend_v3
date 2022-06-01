import React from 'react';
import ChatIcon from "../ui/icons/ChatIcon";
import HumanIcon from "../ui/icons/HumanIcon";
import SettingsIcon from "../ui/icons/SettingsIcon";
import SidebarButton from "../ui/buttons/SidebarButton";

const SidebarMenu = () => {

    const items = [
        {icon: <ChatIcon/>, text: 'Chats', to: '/', key: 0},
        {icon: <HumanIcon/>, text: 'Rooms', to: '/rooms', key: 1},
        {icon: <SettingsIcon/>, text: 'Settings', to: '/settings', key: 2}
    ];

    return (
        <ul className="sidebar__menu list-unstyled">
            {
                items.map(item =>
                    <SidebarButton
                        className="mt-4"
                        icon={item.icon}
                        text={item.text}
                        href={item.to}
                        key={item.key}
                    />
                )
            }
        </ul>
    );
};

export default SidebarMenu;
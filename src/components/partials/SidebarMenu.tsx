import React from 'react';
import ChatIcon from "../ui/icons/ChatIcon";
import HumanIcon from "../ui/icons/HumanIcon";
import PeopleIcon from "../ui/icons/PeopleIcon";
import SettingsIcon from "../ui/icons/SettingsIcon";
import SidebarButton from "../ui/buttons/SidebarButton";

const SidebarMenu = () => {

    const items = [
        {icon: <ChatIcon/>, text: 'Chats', to: '/', key: 0},
        {icon: <HumanIcon/>, text: 'Rooms', to: '/rooms', key: 1},
        {icon: <PeopleIcon/>, text: 'Users', to: '/users', key: 2},
        {icon: <SettingsIcon/>, text: 'Settings', to: '/settings', key: 3}
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
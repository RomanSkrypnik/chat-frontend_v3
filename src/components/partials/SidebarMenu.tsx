import React from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import HomeIcon from "../ui/icons/HomeIcon";
import ChatIcon from "../ui/icons/ChatIcon";
import HumanIcon from "../ui/icons/HumanIcon";
import PeopleIcon from "../ui/icons/PeopleIcon";
import SettingsIcon from "../ui/icons/SettingsIcon";
import IconButton from "../ui/buttons/IconButton";

const SidebarMenu = () => {

    const {user} = useTypedSelector(state => state.auth);

    const items = [
        {icon: <HomeIcon/>, text: 'My account', to: '/profile/' + user?.hash, key: 0},
        {icon: <ChatIcon/>, text: 'Messages', to: '/', key: 1},
        {icon: <HumanIcon/>, text: 'Rooms', to: '/rooms', key: 2},
        {icon: <PeopleIcon/>, text: 'Users', to: '/users', key: 3},
        {icon: <SettingsIcon/>, text: 'Settings', to: '/settings', key: 4}
    ];

    return (
        <ul className="sidebar__menu list-unstyled">
            {
                items.map(item =>
                    <IconButton
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
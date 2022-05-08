import React from 'react';
import {logout} from "../store/slices/auth";
import {useAppDispatch} from "../store";
import SidebarMenu from "./partials/SidebarMenu";
import SidebarHeader from "./partials/SidebarHeader";
import IconButton from "./ui/buttons/IconButton";
import PowerOnIcon from "./ui/icons/PowerOnIcon";

const Sidebar = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logout())

    return (
        <aside className="sidebar">
            <SidebarHeader/>
            <SidebarMenu/>
            <IconButton className="mt-auto" onClick={handleLogout} icon={<PowerOnIcon/>} text="Log out"/>
        </aside>
    );
};

export default Sidebar;
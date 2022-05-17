import React from 'react';
import {logout} from "../store/slices/auth";
import {useAppDispatch} from "../store";
import SidebarMenu from "./partials/SidebarMenu";
import SidebarHeader from "./partials/SidebarHeader";
import SidebarButton from "./ui/buttons/SidebarButton";
import PowerOnIcon from "./ui/icons/PowerOnIcon";

const Sidebar = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logout())

    return (
        <aside className="sidebar">
            <SidebarHeader/>
            <SidebarMenu/>
            <SidebarButton className="mt-auto" onClick={handleLogout} icon={<PowerOnIcon/>} text="Log out"/>
        </aside>
    );
};

export default Sidebar;
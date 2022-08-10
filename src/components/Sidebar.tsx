import React from 'react';
import { logout } from '../store/slices/auth';
import { useAppDispatch } from '../store';
import { SidebarHeader, SidebarMenu } from './partials';
import { PowerOnIcon, SidebarButton } from './ui';

const Sidebar = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logout());

    return (
        <aside className='sidebar'>
            <SidebarHeader />
            <SidebarMenu />
            <SidebarButton className='mt-auto' onClick={handleLogout} icon={<PowerOnIcon />} text='Log out' />
        </aside>
    );
};

export default Sidebar;

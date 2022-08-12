import React from 'react';
import { ChatIcon, HumanIcon, SettingsIcon } from '../ui';
import { NavLink, useParams } from 'react-router-dom';
import { logout } from '../../store/slices/auth';
import { useAppDispatch } from '../../store';

export const SidebarMenu = () => {
    const { chatHash, roomHash } = useParams();

    const dispatch = useAppDispatch();

    const items = [
        { icon: <ChatIcon />, text: 'Chats', to: `/${chatHash ?? ''}`, key: 0 },
        { icon: <HumanIcon />, text: 'Rooms', to: `/rooms/${roomHash ?? ''}`, key: 1 },
        { icon: <SettingsIcon />, text: 'Settings', to: '/settings', key: 2 },
    ];

    const handleLogout = () => dispatch(logout());

    return (
        <ul className='space-y-2 flex flex-col'>
            {
                items.map(({ text, to }) =>
                    <li>
                        <NavLink to={to}
                                 className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                            <span className='ml-3'>{text}</span>
                        </NavLink>
                    </li>,
                )
            }
            <button
                onClick={handleLogout}
                className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                <span className='ml-3'>Log out</span>
            </button>
        </ul>
    );
};

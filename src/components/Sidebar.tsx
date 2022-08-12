import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { ChatIcon, HumanIcon, PowerOnIcon, SettingsIcon } from './ui';
import { logout } from '../store/slices/auth';

export const Sidebar = () => {

    const { chatHash, roomHash } = useParams();

    const dispatch = useAppDispatch();

    const items = [
        { icon: <ChatIcon />, text: 'Chats', to: `/${chatHash ?? ''}`, key: 0 },
        { icon: <HumanIcon />, text: 'Rooms', to: `/rooms/${roomHash ?? ''}`, key: 1 },
        { icon: <SettingsIcon />, text: 'Settings', to: '/settings', key: 2 },
    ];

    const handleLogout = () => dispatch(logout());

    return (
        <aside className='w-64 h-screen' aria-label='Sidebar'>
            <div className='overflow-y-auto py-4 px-3 bg-gray-50 dark:bg-gray-800 h-full'>
                <ul className='flex flex-col h-full'>
                    {
                        items.map(({ text, to, icon }) =>
                            <li className='p-2 flex items-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mt-2'>
                                {icon}
                                <NavLink to={to}
                                         className='grow flex items-center text-lg font-normal text-gray-900 dark:text-white'>
                                    <span className='ml-3'>{text}</span>
                                </NavLink>
                            </li>,
                        )
                    }
                    <button
                        onClick={handleLogout}
                        className='flex items-center p-2 text-lg font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 mt-auto'>
                        <PowerOnIcon />
                        <span className='ml-3'>Log out</span>
                    </button>
                </ul>
            </div>
        </aside>
    );
};

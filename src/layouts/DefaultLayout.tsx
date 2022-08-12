import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components';
import { useTypedSelector } from '../hooks';
import { SocketProvider } from '../components/providers';

export const DefaultLayout = () => {
    const { isLogged } = useTypedSelector(state => state.auth);

    return (
        <>
            {
                isLogged
                    ?
                    <SocketProvider>
                        <div className='flex'>
                            <Sidebar />
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </SocketProvider>
                    :
                    <Navigate to='/login' />
            }
        </>
    );
};

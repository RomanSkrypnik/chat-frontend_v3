import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from '../components';
import { useTypedSelector } from '../hooks';

export const DefaultLayout = () => {
    const { isLogged } = useTypedSelector(state => state.auth);

    return (
        <>
            {
                isLogged
                    ?
                    <div className='default-layout'>
                        <div className='d-flex'>
                            <Sidebar />
                            <main>
                                <Outlet />
                            </main>
                        </div>
                    </div>
                    :
                    <Navigate to='/login' />
            }
        </>
    );
};

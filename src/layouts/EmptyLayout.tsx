import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useTypedSelector } from '../hooks';

export const EmptyLayout = () => {
    const { isLogged } = useTypedSelector(state => state.auth);

    return (
        <>
            {
                !isLogged
                    ?
                    <div className='empty-layout'>
                        <main>
                            <Outlet />
                        </main>
                    </div>
                    :
                    <Navigate to='/' />
            }
        </>
    );
};

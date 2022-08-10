import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { refresh } from './store/slices/auth';
import { useAppDispatch } from './store';
import { useTypedSelector } from './hooks';

function App() {

    const dispatch = useAppDispatch();

    const { isLoaded } = useTypedSelector(state => state.auth);

    useEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <div className='App'>
            {isLoaded && <AppRoutes />}
        </div>
    );
}

export default App;

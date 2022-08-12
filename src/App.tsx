import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { refresh } from './store/slices/auth';
import { useAppDispatch } from './store';
import { useTypedSelector } from './hooks';
import './index.css';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
    const dispatch = useAppDispatch();

    const { isLoaded } = useTypedSelector(state => state.auth);

    useEffect(() => {
        dispatch(refresh());
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            {isLoaded && <AppRoutes />}
        </QueryClientProvider>
    );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultLayout, EmptyLayout } from './layouts';
import { HomePage, LoginPage, RegisterPage, RoomsPage, SettingsPage } from './pages';

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route path='/' element={<HomePage />}>
                        <Route path=':chatHash' element={<HomePage />} />
                    </Route>
                    <Route path='rooms' element={<RoomsPage />}>
                        <Route path=':roomHash' element={<RoomsPage />} />h
                    </Route>
                    <Route path='settings' element={<SettingsPage />} />
                </Route>
                <Route element={<EmptyLayout />}>
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/register' element={<RegisterPage />} />
                    <Route path='/settings' element={<SettingsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Chat from "./pages/[hash]";
import Profile from "./pages/profile/[hash]";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Home}/>
                <Route path="/:hash" element={Home}/>
                <Route path="/login" element={Login}/>
                <Route path="/register" element={Register}/>
                <Route path="/profile/:hash" element={Profile} />
            </Routes>
        </BrowserRouter>
    )
}
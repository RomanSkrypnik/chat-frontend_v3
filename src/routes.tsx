import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";
import Settings from "./pages/settings";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Home}/>
                <Route path="/:hash" element={Home}/>
                <Route path="/login" element={Login}/>
                <Route path="/register" element={Register}/>
                <Route path="/settings" element={Settings} />
            </Routes>
        </BrowserRouter>
    )
}
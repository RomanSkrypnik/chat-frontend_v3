import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages";
import Login from "./pages/login";
import Register from "./pages/register";


export const ReactRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={Home}/>
                <Route path="/login" element={Login}/>
                <Route path="/register" element={Register} />
            </Routes>
        </BrowserRouter>
    )
}
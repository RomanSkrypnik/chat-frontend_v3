import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {logout} from "../store/slices/auth";
import {useAppDispatch} from "../store";

const Sidebar = () => {

    const dispatch = useAppDispatch();

    const handleLogout = () => dispatch(logout())

    const items = [
        {text: 'Messages', to: '/', key: 1},
        {text: 'Rooms', to: '/rooms', key: 2},
    ];

    return (
        <aside className="sidebar">
            <h4 className="text-center mb-3">Chat</h4>

            <ul className="sidebar__menu list-unstyled">
                {
                    items.map(item =>
                        <li className="sidebar__menu-item" key={item.key}>
                            <NavLink className="" to={item.to}>{item.text}</NavLink>
                        </li>
                    )
                }
            </ul>

            <button onClick={handleLogout} className="btn btn-secondary mt-auto">Log out</button>
        </aside>
    );
};

export default Sidebar;
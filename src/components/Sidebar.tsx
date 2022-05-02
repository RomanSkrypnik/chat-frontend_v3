import React from 'react';
import {NavLink} from "react-router-dom";

const Sidebar = () => {

    const items = [
        {text: 'Messages', to: '/'},
        {text: 'Rooms', to: '/rooms'}
    ];

    return (
        <aside className="sidebar">
            <h4 className="text-center mb-3">Chat</h4>
            <ul className="sidebar__menu list-unstyled">
                {
                    items.map(item =>
                        <li className="sidebar__menu-item">
                            <NavLink className="" to={item.to}>{item.text}</NavLink>
                        </li>
                    )
                }
            </ul>
        </aside>
    );
};

export default Sidebar;
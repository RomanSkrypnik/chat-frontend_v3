import React, {FC, useEffect, useState} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {Link, NavLink} from "react-router-dom";
import {MessageDto, UserDto} from "../../types";
import Typography from "./Typography";
import {format} from "date-fns";

interface MessageItemProps {
    user: UserDto;
    message?: MessageDto;
}

const MessageItem: FC<MessageItemProps> = ({user, message}) => {
    const [date, setDate] = useState<null | string>();

    useEffect(() => {
        if (message) {
            const date = format(new Date(message.createdAt), 'PP');
            setDate(date);
        }
    }, []);

    return (
        <NavLink to={`/${user.hash}`} className="message-item">
            <div className="d-flex">
                <Avatar/>
                <div className="d-flex justify-content-between w-100 ms-3">
                    <Typography fz={18} className="text-black fw-bold mb-1">{user.name}</Typography>
                    <Typography className="message-item__text">{date}</Typography>
                </div>
            </div>
            <div className="d-flex">
                {message && <Typography className="message-item__text fw-bold mt-3">{message.text}</Typography>}
            </div>
        </NavLink>
    );
};

export default MessageItem;
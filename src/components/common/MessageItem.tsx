import React, {FC, useContext, useEffect, useState} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {NavLink} from "react-router-dom";
import {MessageDto, UserDto} from "../../types";
import Typography from "./Typography";
import MessageItemFiles from "../partials/MessageItemFiles";
import {formatDistance} from "date-fns";
import {SocketContext} from "../../hocs/Authorized";

interface MessageItemProps {
    user: UserDto;
    message?: MessageDto;
}

const MessageItem: FC<MessageItemProps> = ({user, message}) => {
    const [date, setDate] = useState<null | string>(null);

    useEffect(() => {
        if (message){
            const date = formatDistance(new Date(message.createdAt), new Date());
            setDate(`${date} ago`);
        }
    }, []);

    return (
        <NavLink to={`/${user.hash}`} className="message-item">
            <div className="d-flex">
                <Avatar/>
                <div className="d-flex justify-content-between w-100 ms-3">
                    <Typography fz={18} className="message-item__text fw-bold mb-1">{user.name}</Typography>
                    <Typography className="message-item__text">{date}</Typography>
                </div>
            </div>
            <div className="d-flex">
                {message && <Typography className="message-item__text fw-bold mt-3">{message.text}</Typography>}
                <div className="position-relative ms-auto">
                    <div className="message-item__unread">5</div>
                </div>
            </div>
            {message && <MessageItemFiles files={message.files}/>}
        </NavLink>
    );
};

export default MessageItem;
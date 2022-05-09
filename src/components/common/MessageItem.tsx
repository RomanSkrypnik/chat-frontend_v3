import React, {FC} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {Link} from "react-router-dom";
import {MessageDto, UserDto} from "../../types";
import {useFormatDate} from "../../hooks/useDate";
import Typography from "./Typography";

interface MessageItemProps {
    user: UserDto;
    message: MessageDto;
}

const MessageItem: FC<MessageItemProps> = ({user, message}) => {
    const date = useFormatDate(message.createdAt, 'PP');

    return (
        <Link to={user.hash} className="message-item">
            <div className="d-flex">
                <Avatar/>
                <div className="d-flex justify-content-between w-100 ms-3">
                    <Typography fz={18} className="text-black fw-bold mb-1">{user.name}</Typography>
                    <Typography className="text-grey">{date}</Typography>
                </div>
            </div>
            <div className="d-flex">
                <Typography className="text-grey fw-bold mt-3">{message.text}</Typography>
            </div>
        </Link>
    );
};

export default MessageItem;
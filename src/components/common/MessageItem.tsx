import React, {FC} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {Link} from "react-router-dom";
import {MessageDto, UserDto} from "../../types";
import {useFormatDate} from "../../hooks/useDate";

interface MessageItemProps {
    user: UserDto;
    message: MessageDto;
}

const MessageItem: FC<MessageItemProps> = ({user, message}) => {
    const date = useFormatDate(message.createdAt, 'PP');

    return (
        <Link to={user.hash} className="d-flex justify-content-between list-group-item">
            <div className="d-flex">
                <Avatar/>
                <div className="ms-3">
                    <h6 className="mb-1">{user.name}</h6>
                    <div>{message.user.name}: {message.text}</div>
                </div>
            </div>
            <div className="flex-end">{date}</div>
        </Link>
    );
};

export default MessageItem;
import React, {FC} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {Link} from "react-router-dom";
import {MessageDto} from "../../types";
import {useFormatDate} from "../../hooks/useDate";

interface MessageItemProps {
    to: string;
    message: MessageDto;
}

const MessageItem: FC<MessageItemProps> = ({to, message}) => {
    const date = useFormatDate(message.createdAt, 'PP');

    return (
        <Link to={to} className="d-flex justify-content-between list-group-item">
            <div className="d-flex">
                <Avatar/>
                <div className="ms-3">
                    <h6 className="mb-1">{message.user.name}</h6>
                    <div>{message.text}</div>
                </div>
            </div>
            <div className="flex-end">{date}</div>
        </Link>
    );
};

export default MessageItem;
import React, {FC, useEffect, useState} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {NavLink} from "react-router-dom";
import {MessageDto, UserDto} from "../../types";
import Typography from "./Typography";
import MessageItemFiles from "../partials/MessageItemFiles";
import {formatDistance} from "date-fns";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface MessageItemProps {
    user: UserDto;
    messages: MessageDto[];
}

const MessageItem: FC<MessageItemProps> = ({user, messages}) => {
    const [date, setDate] = useState<null | string>(null);
    const [unreadCount, setUnreadCount] = useState(0);
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);

    const {auth} = useTypedSelector(state => state);

    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[messages.length - 1]);
            countUnreadMessages();
        }
    }, [messages]);

    useEffect(() => {
        formatDate();
    }, [lastMessage]);

    const formatDate = () => {
        if (lastMessage) {
            const date = formatDistance(new Date(lastMessage.createdAt), new Date());
            setDate(`${date} ago`);
        }
    }

    const countUnreadMessages = () => {
        const unreadMessages = messages.filter(({isRead, user}) => !isRead && user.id !== auth.user?.id);
        setUnreadCount(unreadMessages.length);
    }

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
                {lastMessage && <Typography className="message-item__text fw-bold mt-3">{lastMessage.text}</Typography>}
                {
                    unreadCount > 0 &&
                    <div className="position-relative ms-auto">
                        <div className="message-item__unread">{unreadCount}</div>
                    </div>
                }
            </div>
            {lastMessage && <MessageItemFiles files={lastMessage.files}/>}
        </NavLink>
    );
};

export default MessageItem;
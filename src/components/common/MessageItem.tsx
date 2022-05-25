import React, {FC, useEffect, useState} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {NavLink} from "react-router-dom";
import {MessageDto} from "../../types";
import Typography from "./Typography";
import MessageItemFiles from "../partials/MessageItemFiles";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useFormatDuration} from "../../hooks/useDate";

interface MessageItemProps {
    online?: boolean;
    name: string;
    hash: string;
    messages: MessageDto[];
}

const MessageItem: FC<MessageItemProps> = ({name, hash, online, messages}) => {
    const [unreadCount, setUnreadCount] = useState(0);
    const [lastMessage, setLastMessage] = useState<null | MessageDto>(null);

    const {auth} = useTypedSelector(state => state);

    useEffect(() => {
        if (messages.length > 0) {
            setLastMessage(messages[0]);
            countUnreadMessages();
        }
    }, [messages]);

    const date = useFormatDuration(messages[0]?.createdAt ?? '');

    const countUnreadMessages = () => {
        const unreadMessages = messages.filter(({isRead, user}) => !isRead && user.id !== auth.user?.id);
        setUnreadCount(unreadMessages.length);
    }

    return (
        <NavLink to={`/${hash}`} className="message-item">

            <div className="d-flex">
                <Avatar isOnline={online}/>
                <div className="d-flex justify-content-between w-100 ms-3">
                    <Typography fz={18} className="message-item__text fw-bold mb-1">{name}</Typography>
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
import React, {FC, useContext, useEffect} from 'react';
import {MessageDto} from "../../types";
import {Link} from "react-router-dom";
import {useInView} from "react-intersection-observer";
import {ChatListContext} from "../common/ChatList";
import ChatSwitch from "./ChatSwitch";

interface ChatMessageProps {
    message: MessageDto;
}

const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    const {inView, ref} = useInView({
        threshold: 0.8,
    });

    const handleInView = useContext(ChatListContext)

    useEffect(() => {
        if (handleInView) {
            handleInView(message.createdAt)
        }
    }, [inView])

    return (
        <div className="chat__message mx-2 bg-light" ref={ref}>
            <Link to={`/account/${message.user.hash}`} className="mb-2">{message.user.name}</Link>
            {
                message.files.map(file => <ChatSwitch file={file}/>)
            }
            <div className="text-break">{message.text}</div>
        </div>
    );
};

export default ChatMessage;
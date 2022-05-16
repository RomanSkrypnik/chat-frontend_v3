import React, {FC, useContext, useEffect} from 'react';
import {MessageDto} from "../../types";
import ChatMessageSwitch from "./ChatMessageSwitch";
import cn from "classnames";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useInView} from "react-intersection-observer";
import {SocketContext} from "../../hocs/Authorized";
import ClipsIcon from "../ui/icons/ClipsIcon";

interface ChatMessageProps {
    message: MessageDto;
}

const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    const {user} = useTypedSelector(state => state.auth);

    const {inView, ref} = useInView({threshold: 0.8});

    const socket = useContext(SocketContext);

    const isCurrUser = user?.hash === message.user.hash;

    useEffect(() => {
        if (inView && !message.isRead) {
            if (!isCurrUser) {
                socket?.emit('read-message', {userId: user?.id, messageId: message.id})
            }
        }
    }, [inView]);

    return (
        <div className="d-flex align-items-center" ref={ref}>
            <div className={cn("chat-message mx-2 bg-light", !isCurrUser && '_alternate')}>
                {
                    message.files.map(file => <ChatMessageSwitch file={file} key={file.id}/>)
                }
                <div className="text-break">{message.text}</div>
            </div>
            {isCurrUser && <ClipsIcon className={message.isRead ? '_active' : ''}/>}
        </div>
    );
};

export default ChatMessage;
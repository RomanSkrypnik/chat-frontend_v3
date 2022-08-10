import React, {FC, useContext, useEffect} from 'react';
import {MessageDto} from "../../types";
import cn from "classnames";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useInView} from "react-intersection-observer";
import ClipsIcon from "../ui/icons/ClipsIcon";
import {SocketContext} from "../providers/SocketProvider";
import {RoomSocketContext} from "../providers/RoomSocketProvider";
import { ChatMessageSwitch } from './ChatMessageSwitch';

interface ChatMessageProps {
    message: MessageDto;
}

export const ChatMessage: FC<ChatMessageProps> = ({message}) => {

    const {user} = useTypedSelector(state => state.auth);
    const {room} = useTypedSelector(state => state.room);

    const {inView, ref} = useInView({threshold: 0.8});

    const socket = useContext(SocketContext);
    const roomSocket = useContext(RoomSocketContext);

    const isCurrUser = user?.hash === message.user.hash;

    useEffect(() => {
        if (inView && !message.isRead) {
            if (!isCurrUser) {
                const messageBody = {userId: user?.id, messageId: message.id};

                if (room) {
                    console.log('here');
                    roomSocket?.emit('read-message', {...messageBody, roomId: room?.id});
                } else {
                    socket?.emit('read-message', messageBody);
                }
            }
        }
    }, [inView]);

    return (
        <div className="d-flex align-items-center mt-2" ref={ref}>
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

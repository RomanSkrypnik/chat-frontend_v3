import React, {useContext, useEffect} from 'react';
import ChatHeader from "./ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "./ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat, setChat} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CreateMessageValues} from "../../types";
import MessageService from "../../services/MessageService";
import {SocketContext} from "../providers/SocketProvider";

const ChatWrapper = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);

    const {chat} = useTypedSelector(state => state.chat);

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash))
        }

        return () => {
            dispatch(setChat(null));
        }
    }, [hash]);

    const handleSubmit = async ({files, text}: CreateMessageValues) => {
        if (hash) {
            const fd = new FormData();

            fd.append('hash', hash);
            fd.append('text', text);

            if (files.length > 0) {
                for (const file of files) {
                    fd.append('files', file);
                }
            }

            const {data} = await MessageService.create(fd);
            const withChat = !chat?.id

            socket?.emit('send-message', {message: data.data, hash, withChat});
        }
    }

    return (
        <div className="flex-grow-1 bg-white">
            {
                chat &&
                <>
                    <ChatHeader user={chat.user}/>
                    <ChatList messages={chat.messages}/>
                    <ChatControls isBlocked={chat.isBlockedByMe || chat.isBlockedByCompanion} onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default ChatWrapper;
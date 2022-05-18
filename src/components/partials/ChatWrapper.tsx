import React, {useContext, useEffect} from 'react';
import ChatHeader from "../common/ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "../common/ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CreateMessageValues} from "../../types";
import {SocketContext} from "../../hocs/Authorized";
import MessageService from "../../services/MessageService";

const ChatWrapper = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);

    const {chat} = useTypedSelector(state => state.chat);

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash))
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

            const {data} = await MessageService.create(fd)
            socket?.emit('send-message', {message: data.data, hash});
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
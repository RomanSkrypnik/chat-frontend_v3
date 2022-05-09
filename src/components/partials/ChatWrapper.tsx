import React, {useContext, useEffect} from 'react';
import ChatHeader from "../common/ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "../common/ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat, sendMessage} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CreateMessageValues} from "../../types";
import {SocketContext} from "../../hocs/Authorized";

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

    const handleSubmit = (data: CreateMessageValues) => {
        if (hash) {
            dispatch(sendMessage({message: data, hash}));
            socket?.emit('chat/message', 'fdsfs');
        }
    }

    return (
        <div className="flex-grow-1 bg-white">
            {
                chat &&
                <>
                    <ChatHeader user={chat.user}/>
                    <ChatList messages={chat.messages}/>
                    <ChatControls onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default ChatWrapper;
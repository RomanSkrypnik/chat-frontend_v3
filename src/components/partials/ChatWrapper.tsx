import React, {useEffect} from 'react';
import ChatHeader from "../common/ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "../common/ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat, setChat} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {sendMessage, setMessages} from "../../store/slices/message";
import {CreateMessageValues} from "../../types";

const ChatWrapper = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {chat, chats} = useTypedSelector(state => state.chat)

    const {messages} = useTypedSelector(state => state.message)

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash))
        }
    }, [hash]);

    useEffect(() => {
        if (chat) {
            dispatch(setMessages(chat.messages))
        } else {
            const chat = chats.find(({user}) => user.hash === hash)
            dispatch(setChat(chat))
        }
    }, [chat]);

    const handleSubmit = (data: CreateMessageValues) => {
        if (hash) {
            dispatch(sendMessage({message: data, hash}));
        }
    }

    return (
        <div className="chat__wrapper">
            {
                chat &&
                <>
                    <ChatHeader user={chat.user}/>
                    <ChatList messages={messages}/>
                    <ChatControls onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default ChatWrapper;
import React, {useEffect} from 'react';
import ChatHeader from "../common/ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "../common/ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {setMessages} from "../../store/slices/message";

const ChatWrapper = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {chat} = useTypedSelector(state => state.chat)

    const {messages} = useTypedSelector(state => state.message)

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash))
        }
    }, [hash]);

    useEffect(() => {
        if (chat) {
            dispatch(setMessages(chat.messages))
        }
    }, [chat]);

    return (
        <div className="chat__wrapper">
            {
                chat &&
                <>
                    <ChatHeader user={chat.user}/>
                    <ChatList messages={messages}/>
                    <ChatControls/>
                </>
            }
        </div>
    );
};

export default ChatWrapper;
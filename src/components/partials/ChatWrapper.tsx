import React, {useEffect} from 'react';
import ChatHeader from "../common/ChatHeader";
import ChatList from "../common/ChatList";
import ChatControls from "../common/ChatControls";
import {useAppDispatch} from "../../store";
import {fetchChat, sendMessage} from "../../store/slices/chat";
import {useParams} from "react-router-dom";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {CreateMessageValues} from "../../types";

const ChatWrapper = () => {

    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {chat} = useTypedSelector(state => state.chat)

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash))
        }
    }, [hash]);

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
                    <ChatList messages={chat.messages}/>
                    <ChatControls onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default ChatWrapper;
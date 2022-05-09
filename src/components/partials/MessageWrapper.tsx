import React, {useEffect} from 'react';
import MessageList from "../common/MessageList";
import TextInput from "../inputs/TextInput";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../store";
import {fetchChats, findChat} from "../../store/slices/chat";

const MessageWrapper = () => {

    const {chats} = useTypedSelector(state => state.chat);

    const {control, watch, handleSubmit} = useForm<{search: string}>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChats())
    }, []);

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSearchChange)())
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSearchChange = ({search}: {search: string}) => {
        dispatch(findChat(search));
    }

    return (
        <div className="message-wrapper me-3">
            <TextInput placeholder="Search" className="w-100 mb-3" control={control} name="search"/>
            <MessageList chats={chats}/>
        </div>
    );
};

export default MessageWrapper;
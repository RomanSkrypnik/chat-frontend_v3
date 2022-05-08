import React, {useEffect} from 'react';
import withAuthorized from "../hocs/Authorized";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAppDispatch} from "../store";
import {fetchChats, findChat} from "../store/slices/chat";
import MessageItem from "../components/common/MessageItem";
import TextInput from "../components/inputs/TextInput";
import {useForm} from "react-hook-form";

interface FormValues {
    search: string;
}

const Home = () => {

    const {chats} = useTypedSelector(state => state.chat);

    const {control, watch, handleSubmit} = useForm<FormValues>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSearchChange)())
        return () => subscription.unsubscribe();
    }, [watch]);

    useEffect(() => {
        dispatch(fetchChats())
    }, []);

    const onSearchChange = ({search}: FormValues) => {
        dispatch(findChat(search))
    }

    return (
        <section className="home">
            <div className="container">
                <TextInput className="w-100 mb-3" control={control} name="search"/>
                <ul className="list-group">
                    {
                        chats.map(chat => {
                            return <MessageItem user={chat.user}
                                                message={chat.messages[chat.messages.length - 1]}
                                                key={chat.id}/>
                        })
                    }
                </ul>
            </div>
        </section>
    );
};

export default withAuthorized(Home);
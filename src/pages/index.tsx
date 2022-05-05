import React, {useEffect} from 'react';
import withAuthorized from "../hocs/Authorized";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAppDispatch} from "../store";
import {fetchChats} from "../store/slices/chat";
import MessageItem from "../components/common/MessageItem";

const Home = () => {

    const {chats} = useTypedSelector(state => state.chat);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChats())
    }, []);

    return (
        <section className="home">
            <div className="container">
                <ul className="list-group">
                    {
                        chats.map(chat => {
                            const message = chat.messages[chat.messages.length - 1][0];
                            return <MessageItem to={chat.user.hash} message={message} />
                        })
                    }
                </ul>
            </div>
        </section>
    );
};

export default withAuthorized(Home);
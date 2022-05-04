import React, {useEffect} from 'react';
import withAuthorized from "../hocs/Authorized";
import {Link} from "react-router-dom";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useAppDispatch} from "../store";
import {fetchChats} from "../store/slices/chat";

const Home = () => {

    const { chats } = useTypedSelector(state => state.chat);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChats())
    }, []);

    return (
        <section className="home">
            <ul className="list-group">
                {
                    chats.map(({user, id, messages}) => (
                        <Link to={user.hash} className="list-group-item" key={id}>{messages[0].text}</Link>
                    ))
                }
            </ul>
        </section>
    );
};

export default withAuthorized(Home);
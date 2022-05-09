import React from 'react';
import withAuthorized from "../hocs/Authorized";
import Typography from "../components/common/Typography";
import MessageWrapper from "../components/partials/MessageWrapper";
import ChatWrapper from "../components/partials/ChatWrapper";
import {useParams} from "react-router-dom";

const Home = () => {

    const {hash} = useParams();

    return (
        <section className="home">
            <Typography className="mb-3" fz={36}>Chats</Typography>
            <div className="d-flex">
                <MessageWrapper/>
                {hash && <ChatWrapper/>}
            </div>
        </section>
    );
};

export default withAuthorized(Home);
import React from 'react';
import withAuthorized from "../hocs/Authorized";
import Typography from "../components/common/Typography";
import MessageWrapper from "../components/partials/MessageWrapper";
import ChatWrapper from "../components/partials/ChatWrapper";
import {useParams} from "react-router-dom";
import RegularButton from "../components/ui/buttons/RegularButton";

const Home = () => {

    const {hash} = useParams();

    return (
        <section className="home">
            <div className="d-flex">
                <div className="w-25 me-3">
                    <div className="d-flex justify-content-between mb-3">
                        <Typography className="mb-3" fz={36}>Chats</Typography>
                        <RegularButton>Create New Chat</RegularButton>
                    </div>
                    <MessageWrapper/>
                </div>
                {hash && <ChatWrapper/>}
            </div>
        </section>
    );
};

export default withAuthorized(Home);
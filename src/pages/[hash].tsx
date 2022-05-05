import React from 'react';
import ChatWrapper from "../components/partials/ChatWrapper";
import withAuthorized from "../hocs/Authorized";

const Chat = () => {
    return (
        <section className="chat">
            <div className="container">
                <ChatWrapper/>
            </div>
        </section>
    );
};

export default withAuthorized(Chat);
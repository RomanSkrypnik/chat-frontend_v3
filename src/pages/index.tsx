import React from 'react';
import withAuthorized from "../hocs/Authorized";

const Home = () => {
    return (
        <section className="home">
           home
        </section>
    );
};

export default withAuthorized(Home);
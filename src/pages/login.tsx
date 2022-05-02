import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import DialContainer from "../components/containers/DialContainer";
import CardContainer from "../components/containers/CardContainer";
import LoginForm from "../components/partials/LoginForm";

const Login = () => {
    return (
        <section className="login">
            <DialContainer>
                <CardContainer>
                    <LoginForm/>
                </CardContainer>
            </DialContainer>
        </section>
    );
};

export default withUnauthorized(Login);
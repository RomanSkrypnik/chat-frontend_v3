import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import CardContainer from "../components/containers/CardContainer";
import LoginForm from "../components/partials/LoginForm";
import CenteredContainer from "../components/containers/CenteredContainer";

const Login = () => {
    return (
        <section className="login">
            <CenteredContainer>
                <CardContainer>
                    <LoginForm/>
                </CardContainer>
            </CenteredContainer>
        </section>
    );
};

export default withUnauthorized(Login);
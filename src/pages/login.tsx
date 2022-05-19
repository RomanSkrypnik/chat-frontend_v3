import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import LoginForm from "../components/partials/LoginForm";

const Login = () => {
    return (
        <section className="login">
            <LoginForm/>
        </section>
    );
};

export default withUnauthorized(Login);
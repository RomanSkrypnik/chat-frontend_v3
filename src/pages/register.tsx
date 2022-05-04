import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import DialContainer from "../components/containers/DialContainer";
import CardContainer from "../components/containers/CardContainer";
import RegisterForm from "../components/partials/RegisterForm";

const Register = () => {
    return (
        <section className="register">
            <DialContainer>
                <CardContainer>
                    <RegisterForm/>
                </CardContainer>
            </DialContainer>
        </section>
    );
};

export default withUnauthorized(Register);
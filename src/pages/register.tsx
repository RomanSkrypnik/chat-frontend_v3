import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import CardContainer from "../components/containers/CardContainer";
import RegisterForm from "../components/partials/RegisterForm";
import CenteredContainer from "../components/containers/CenteredContainer";

const Register = () => {
    return (
        <section className="register">
            <CenteredContainer>
                <CardContainer>
                    <RegisterForm/>
                </CardContainer>
            </CenteredContainer>
        </section>
    );
};

export default withUnauthorized(Register);
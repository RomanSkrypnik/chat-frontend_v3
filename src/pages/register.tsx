import React from 'react';
import withUnauthorized from "../hocs/Unauthorized";
import { RegisterForm } from '../components/partials';

const Register = () => {
    return (
        <section className="register">
            <RegisterForm/>
        </section>
    );
};

export default withUnauthorized(Register);

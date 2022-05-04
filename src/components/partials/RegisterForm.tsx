import React from 'react';
import {useForm} from "react-hook-form";
import {RegisterDto} from "../../types/auth";
import TextInput from "../inputs/TextInput";
import {AuthService} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";

const RegisterForm = () => {

    const {control, handleSubmit} = useForm<RegisterDto>();

    const navigate = useNavigate();

    const handleFormSubmit = async (data: RegisterDto) => {
        try {
            await AuthService.register(data)
            navigate('/login')
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="register__form">
            <form className="d-flex flex-column" onSubmit={handleSubmit(handleFormSubmit)}>
                <h3 className="text-center mb-4">Register</h3>
                <TextInput control={control} placeholder="Email" name="email"/>
                <TextInput control={control} placeholder="Username" name="username"/>
                <TextInput control={control} placeholder="Name" name="name"/>
                <TextInput control={control} placeholder="Password" name="password"/>
                <button className="btn btn-primary mt-4">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
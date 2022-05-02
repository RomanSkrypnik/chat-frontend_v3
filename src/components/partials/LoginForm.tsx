import React from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import {LoginDto} from "../../types/auth";
import {login} from "../../store/slices/auth";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";

const LoginForm = () => {

    const {control, handleSubmit} = useForm<LoginDto>();

    const dispatch = useDispatch<AppDispatch>();

    const handleFormSubmit = (data: LoginDto) => {
        dispatch(login(data))
    }

    return (
        <div className="login__form">
            <form className="d-flex flex-column" onSubmit={handleSubmit(handleFormSubmit)}>
                <TextInput control={control} name="email" placeholder="email"/>
                <TextInput control={control} name="password" placeholder="password"/>
                <button className="btn">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
import React from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import {LoginDto} from "../../types";
import {login} from "../../store/slices/auth";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import {Link} from "react-router-dom";
import {yupResolver} from "@hookform/resolvers/yup";
import {loginSchema} from "../../validation";
import { Typography } from '../common';
import { CardContainer, CenteredContainer } from '../containers';

export const LoginForm = () => {

    const {control, handleSubmit} = useForm<LoginDto>({resolver: yupResolver(loginSchema)});

    const dispatch = useDispatch<AppDispatch>();

    const handleFormSubmit = (data: LoginDto) => {
        dispatch(login(data))
    }

    return (
        <CenteredContainer>
            <CardContainer className="_extended">
                <div className="login__form">
                    <form className="d-flex flex-column" onSubmit={handleSubmit(handleFormSubmit)}>
                        <Typography className="text-center" fz={32} as="h2">Login</Typography>
                        <Typography className="text-grey mt-1">To sign in, please enter your email and password</Typography>

                        <TextInput className="mt-3" control={control} name="email" placeholder="email"/>
                        <TextInput type="password" className="mt-3" control={control} name="password" placeholder="password"/>

                        <button className="btn btn-primary mt-4 p-2">
                            <Typography fz={18} as="span">Sign in</Typography>
                        </button>

                        <Link className="text-decoration-none mx-auto mt-3" to="/register">
                            <Typography as="span" fz={17}>To sign up - click here</Typography>
                        </Link>

                    </form>
                </div>
            </CardContainer>
        </CenteredContainer>
    );
};

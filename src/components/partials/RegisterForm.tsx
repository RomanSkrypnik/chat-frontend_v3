import React from 'react';
import {useForm} from "react-hook-form";
import {RegisterDto} from "../../types/auth";
import TextInput from "../inputs/TextInput";
import {AuthService} from "../../services/AuthService";
import {useNavigate} from "react-router-dom";
import CardContainer from "../containers/CardContainer";
import CenteredContainer from "../containers/CenteredContainer";
import Typography from "../common/Typography";

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
        <CenteredContainer>
            <CardContainer>
                <div className="register__form">
                    <form className="d-flex flex-column" onSubmit={handleSubmit(handleFormSubmit)}>
                        <Typography className="text-center" fz={32} as="h2">Register</Typography>
                        <Typography className="text-grey text-center mt-1">To sign up, please fill all the fields out</Typography>
                        <TextInput className="mt-3" control={control} placeholder="Email" name="email"/>
                        <TextInput className="mt-3" control={control} placeholder="Username" name="username"/>
                        <TextInput className="mt-3" control={control} placeholder="Name" name="name"/>
                        <TextInput className="mt-3" control={control} placeholder="Password" name="password"/>
                        <button className="btn btn-primary mt-4">
                            <Typography fz={18} as="span">Register</Typography>
                        </button>
                    </form>
                </div>
            </CardContainer>
        </CenteredContainer>
    );
};

export default RegisterForm;
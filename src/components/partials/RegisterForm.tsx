import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterDto } from '../../types';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validation';
import { AuthService } from '../../services';
import { CardContainer, CenteredContainer } from '../containers';
import { TextInput } from '../inputs';

export const RegisterForm = () => {

    const { control, handleSubmit } = useForm<RegisterDto>({ resolver: yupResolver(registerSchema) });

    const navigate = useNavigate();

    const handleFormSubmit = async (data: RegisterDto) => {
        try {
            await AuthService.register(data);
            navigate('/login');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <CenteredContainer>
            <CardContainer className='_extended'>
                <div className='register__form'>
                    <form className='d-flex flex-column' onSubmit={handleSubmit(handleFormSubmit)}>
                        <h2 className='text-center'>Register</h2>
                        <h3 className='body-1 text-grey text-center mt-1'>
                            To sign up, please fill all the fields out
                        </h3>
                        <TextInput className='mt-3' control={control} placeholder='Email' name='email' />
                        <TextInput className='mt-3' control={control} placeholder='Username' name='username' />
                        <TextInput className='mt-3' control={control} placeholder='Name' name='name' />
                        <TextInput type='password' className='mt-3' control={control} placeholder='Password'
                                   name='password' />
                        <button className='btn btn-primary mt-4'>
                            <span className='body-1'>Register</span>
                        </button>
                    </form>
                </div>
            </CardContainer>
        </CenteredContainer>
    );
};

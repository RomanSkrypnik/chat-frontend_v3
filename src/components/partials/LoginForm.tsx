import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginDto } from '../../types';
import { login } from '../../store/slices/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../validation';
import { CardContainer, CenteredContainer } from '../containers';
import { TextInput } from '../inputs';

export const LoginForm = () => {

    const { control, handleSubmit } = useForm<LoginDto>({ resolver: yupResolver(loginSchema) });

    const dispatch = useDispatch<AppDispatch>();

    const handleFormSubmit = (data: LoginDto) => {
        dispatch(login(data));
    };

    return (
        <CenteredContainer>
            <CardContainer className='_extended'>
                <div className='login__form'>
                    <form className='d-flex flex-column' onSubmit={handleSubmit(handleFormSubmit)}>
                        <h2 className='text-center'>Login</h2>
                        <h3 className='body-1 text-grey mt-1'>
                            To sign in, please enter your email and password
                        </h3>
                        <TextInput className='mt-3' control={control} name='email' placeholder='email' />
                        <TextInput type='password' className='mt-3' control={control} name='password'
                                   placeholder='password' />
                        <button className='btn btn-primary mt-4 p-2'>
                            <span className='body-1'>Sign in</span>
                        </button>
                        <Link className='text-decoration-none mx-auto mt-3' to='/register'>
                            <span className='body-1'>To sign up - click here</span>
                        </Link>
                    </form>
                </div>
            </CardContainer>
        </CenteredContainer>
    );
};

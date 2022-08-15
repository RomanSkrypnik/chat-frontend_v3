import React from 'react';
import { RegisterForm } from '../components/partials';
import { TextInput } from '../components/inputs';
import { Controller, useForm } from 'react-hook-form';
import { RegisterDto } from '../types';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { registerSchema } from '../validation';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services';
import { CenteredContainer } from '../components/containers';
import { Box, Button, Card, TextField, Typography } from '@mui/material';

export const RegisterPage = () => {

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
        <section className='register'>
            <CenteredContainer>
                <Card sx={{ maxWidth: 480 }}>
                    <form className='d-flex flex-column' onSubmit={handleSubmit(handleFormSubmit)}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                            <Typography variant='h4' sx={{ mb: 1 }}>Register</Typography>
                            <Typography sx={{ textAlign: 'center' }}>
                                To sign up, please fill all the fields out
                            </Typography>
                            <Box sx={{ py: 2 }}>
                                <Controller
                                    name='email'
                                    control={control}
                                    defaultValue=''
                                    render={({ field: { onChange, value } }) =>
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            placeholder='Email'
                                            sx={{ width: '100%' }}
                                        />
                                    }
                                />
                                <Controller
                                    name='username'
                                    control={control}
                                    defaultValue=''
                                    render={({ field: { onChange, value } }) =>
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            placeholder='Username'
                                            sx={{ width: '100%', mt: 2 }}
                                        />
                                    }
                                />
                                <Controller
                                    name='name'
                                    control={control}
                                    defaultValue=''
                                    render={({ field: { onChange, value } }) =>
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            placeholder='Name'
                                            sx={{ width: '100%', mt: 2 }}
                                        />
                                    }
                                />
                                <Controller
                                    name='password'
                                    control={control}
                                    defaultValue=''
                                    render={({ field: { onChange, value } }) =>
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            type='password'
                                            placeholder='Password'
                                            sx={{ width: '100%', mt: 2 }}
                                        />
                                    }
                                />
                            </Box>
                            <Button type='submit' sx={{ mt: 2 }} variant='contained'>
                                Sign up
                            </Button>
                        </Box>
                    </form>
                </Card>
            </CenteredContainer>
        </section>
    );
};

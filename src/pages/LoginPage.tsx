import React from 'react';
import { Box, Button, Card, Container, Link, TextField, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { LoginDto } from '../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../validation';
import { useAppDispatch } from '../store';
import { login } from '../store/slices/auth';
import { CenteredContainer } from '../components/containers';

export const LoginPage = () => {

    const { control, handleSubmit } = useForm<LoginDto>({ resolver: yupResolver(loginSchema) });

    const dispatch = useAppDispatch();

    const handleFormSubmit = (data: LoginDto) => {
        dispatch(login(data));
    };

    return (
        <section className='login'>
            <Container>
                <CenteredContainer>
                    <Card sx={{ maxWidth: 480 }}>
                        <form className='d-flex flex-column' onSubmit={handleSubmit(handleFormSubmit)}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                                <Typography variant='h4' sx={{ mb: 1 }}>Login</Typography>
                                <Typography sx={{ textAlign: 'center' }}>
                                    To sign in, please enter your email and password
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
                                                placeholder='email'
                                                sx={{ width: '100%' }}
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
                                                placeholder='password'
                                                sx={{ width: '100%', mt: 2 }}
                                            />
                                        }
                                    />
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Button variant='contained'>
                                        Sign in
                                    </Button>
                                    <Link sx={{ mt: 2 }} href='/register' underline='none'>
                                        To sign up - click here
                                    </Link>
                                </Box>
                            </Box>
                        </form>
                    </Card>
                </CenteredContainer>
            </Container>
        </section>
    );
};

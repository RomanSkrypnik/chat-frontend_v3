import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../validation';
import { CardContainer } from '../containers';
import { RegularButton } from '../ui';
import { useChangePassword, useComparePassword } from '../../hooks';
import { TextInput } from '../inputs';

interface FormValues {
    password: string;
    passwordConfirm: string;
    oldPassword: string;
}

export const SettingsPasswordForm = () => {

    const { control, handleSubmit } = useForm<FormValues>({ resolver: yupResolver(passwordSchema) });

    const compareMutation = useComparePassword();
    const changeMutation = useChangePassword();

    const onSubmit = async ({ oldPassword, password }: FormValues) => {
        const { data: { data: matches } } = await compareMutation.mutateAsync(oldPassword);
        matches && await changeMutation.mutateAsync(password);
    };

    return (
        <CardContainer>
            <h2 className='mb-4'>Password Settings</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='d-flex'>
                    <div className='flex-grow-1 me-4'>
                        <TextInput name='oldPassword' control={control} label='Old password' />
                        <TextInput name='password' control={control} label='New password' className='mt-3' />
                    </div>
                    <div className='flex-grow-1 align-self-end'>
                        <TextInput name='passwordConfirm' control={control} label='Confirm new password' />
                    </div>
                </div>
                <RegularButton type='submit' className='mt-4'>Change password</RegularButton>
            </form>
        </CardContainer>
    );
};

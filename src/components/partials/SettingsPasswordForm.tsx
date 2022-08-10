import React from 'react';
import TextInput from '../inputs/TextInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { passwordSchema } from '../../validation';
import { Typography } from '../common';
import { CardContainer } from '../containers';
import { UserService } from '../../services';
import { RegularButton } from '../ui';
import { useSnackbar } from '../../hooks';

interface FormValues {
    password: string;
    passwordConfirm: string;
    oldPassword: string;
}

export const SettingsPasswordForm = () => {

    const { control, handleSubmit } = useForm<FormValues>({ resolver: yupResolver(passwordSchema) });

    const { snackbar } = useSnackbar();

    const onSubmit = async (formValues: FormValues) => {
        try {
            const { data } = await UserService.comparePassword(formValues.password);
            if (data.data) {
                await UserService.changePassword(data.password);
                snackbar('Password is successfully changed');
            } else {
                snackbar('Entered password is wrong');
            }
        } catch (e) {
            throw e;
        }
    };

    return (
        <CardContainer>
            <Typography as='h2' className='mb-4'>Password Settings</Typography>

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

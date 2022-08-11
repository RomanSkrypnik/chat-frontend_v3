import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { editPersonalData } from '../../store/slices/auth';
import { EditUserDto } from '../../types';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountSchema } from '../../validation';
import { CardContainer } from '../containers';
import { RegularButton } from '../ui';
import { useSnackbar, useStorageUrl, useTypedSelector } from '../../hooks';
import { AvatarInput, TextInput } from '../inputs';

export const SettingsAccountForm = () => {
    const [file, setFile] = useState<null | File>(null);

    const { control, handleSubmit } = useForm<EditUserDto>({ resolver: yupResolver(accountSchema) });

    const { user } = useTypedSelector(state => state.auth);

    const { snackbar } = useSnackbar();

    const src = useStorageUrl('/avatars/', user?.avatar);

    const dispatch = useAppDispatch();

    const onSubmit = (data: EditUserDto) => {
        const fd = new FormData();

        fd.append('username', data.username);
        fd.append('name', data.name);
        fd.append('email', data.email);
        fd.append('bio', data.bio);

        if (file) {
            fd.append('avatar', file);
        }

        dispatch(editPersonalData(fd));
        snackbar('Personal data is successfully changed');
    };

    const handleChange = (file: File) => {
        setFile(file);
    };

    return (
        <CardContainer>
            <h2 className='mb-4'>Account Settings</h2>
            {
                user &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='d-flex'>
                        <div className='d-flex flex-column align-items-center me-5 pe-1'>
                            <AvatarInput imgSrc={src} onChange={handleChange} />
                            <p className='body-1 text-center mt-1'>Drag or click here</p>
                            <RegularButton type='submit' className='mt-4'>Change data</RegularButton>
                        </div>
                        <div className='flex-grow-1 me-4'>
                            <TextInput defaultValue={user.username}
                                       name='username'
                                       control={control}
                                       label='Username'
                            />
                            <TextInput defaultValue={user.email}
                                       name='email'
                                       control={control}
                                       label='Email'
                                       className='mt-3'
                            />
                        </div>
                        <div className='flex-grow-1'>
                            <TextInput defaultValue={user.name}
                                       name='name'
                                       control={control}
                                       label='Name'
                            />
                            <TextInput
                                defaultValue={user.bio}
                                name='bio'
                                control={control}
                                label='Bio'
                                className='mt-3'
                            />
                        </div>
                    </div>
                </form>
            }
        </CardContainer>
    );
};

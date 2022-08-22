import React, { FC } from 'react';
import { Controller } from 'react-hook-form';
import { DialogHeader, UserSearchItem } from '../partials';
import { useFetchUsers, useFetchUsersBySearch, useWatchField } from '../../hooks';
import { Box, CircularProgress, Dialog, DialogContent, TextField } from '@mui/material';
import { UserDto } from '../../types';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface FormValues {
    search: string;
}

export const UserSearch: FC<Props> = ({ open, onClose }) => {
    const { data: users, isLoading } = useFetchUsers();

    const control = useWatchField<FormValues>(useFetchUsersBySearch);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogHeader onClose={onClose}>
                User search
            </DialogHeader>
            <DialogContent>
                <Box>
                    <Controller
                        name='search'
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value } }) =>
                            <TextField onChange={onChange} value={value} name='search' placeholder='Search Users' />}
                    />
                    <div className='user-search__list scrollbar'>
                        {
                            isLoading && <CircularProgress />
                        }
                        {
                            users?.data.data.map((user: UserDto) => <UserSearchItem user={user} onClose={onClose} />)
                        }
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

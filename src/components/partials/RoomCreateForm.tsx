import React, { FC, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { createRoom } from '../../store/slices/room';
import { AvatarInput } from '../inputs';
import { Box, Button, Dialog, DialogContent, TextField } from '@mui/material';
import { DialogHeader } from './DialogHeader';

interface Props {
    open: boolean;
    onClose: () => void;
}

interface FormValues {
    name: string;
    description: string;
}

export const RoomCreateForm: FC<Props> = ({ open, onClose }) => {
    const [file, setFile] = useState<[] | File>([]);

    const { handleSubmit, control, reset } = useForm<FormValues>();

    const dispatch = useAppDispatch();

    const onSubmit = (data: FormValues) => {
        const fd = new FormData();

        fd.append('name', data.name);
        fd.append('description', data.description);

        if (file) {
            fd.append('avatar', file as Blob);
        }

        dispatch(createRoom(fd));

        onClose();

        reset({ name: '', description: '' });
    };

    const handleChange = (file: File) => {
        setFile(file);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth='xs'
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
        >
            <DialogHeader onClose={onClose}>
                Create New Room
            </DialogHeader>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 3 }}>
                        <AvatarInput onChange={handleChange} />
                        <Controller
                            name='name'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value } }) =>
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    sx={{ flexGrow: 1, ml: 3 }}
                                    placeholder='Name'
                                    defaultValue=''
                                    name='name'
                                />
                            }
                        />
                    </Box>

                    <Controller
                        name='description'
                        control={control}
                        defaultValue=''
                        render={({ field: { onChange, value } }) =>
                            <TextField
                                onChange={onChange}
                                value={value}
                                multiline
                                rows={4}
                                sx={{ mr: 3, width: '100%' }}
                                name='description'
                                placeholder='Description'
                            />
                        }
                    />
                    <Button type='submit' variant='contained' color='success' sx={{ mt: 2 }}>Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

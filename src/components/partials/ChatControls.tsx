import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateMessageValues } from '../../types';
import { TelegramIcon } from '../ui';
import { FileInput } from '../inputs';
import { Box, IconButton, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

interface Props {
    isBlocked?: boolean;
    onSubmit: (data: CreateMessageValues) => void;
}

export const ChatControls: FC<Props> = ({ isBlocked, onSubmit }) => {
    const [files, setFiles] = useState<File[] | null>(null);

    const { handleSubmit, control, reset } = useForm<CreateMessageValues>();

    const handleOnSubmit = (data: { text: string }) => {
        if (data.text || files) {
            onSubmit({ ...data, files });
            reset({ text: '' });
            setFiles(null);
        }
    };

    const handleFileChange = (files: File[] | null) => {
        setFiles(files);
    };

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <FileInput disabled={isBlocked} onChange={handleFileChange} />
                <Controller
                    name='text'
                    control={control}
                    defaultValue=''
                    render={({ field: { onChange, value } }) =>
                        <TextField
                            onChange={onChange}
                            value={value}
                            disabled={isBlocked}
                            placeholder='Type a message here'
                            sx={{ width: '100%', px: 3 }}
                        />
                    }
                />
                <IconButton sx={{ bgcolor: 'info.main' }} disabled={isBlocked} type='submit'>
                    <TelegramIcon />
                </IconButton>
            </Box>
        </form>
    );
};

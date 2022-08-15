import React, { ChangeEvent, FC } from 'react';
import { IconButton } from '@mui/material';
import { CrossIcon } from '../ui';

interface Props {
    onChange: (files: File[] | null) => void;
    value?: string;
}

export const FileInput: FC<Props> = ({ onChange, value }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files) {
            const arr = Array.from(files);
            onChange(arr);
        }
    };

    return (
        <IconButton sx={{ bgcolor: 'info.main' }} component='label'>
            <input type='file' onChange={handleChange} style={{ display: 'none' }} />
            <CrossIcon />
        </IconButton>
    );
};

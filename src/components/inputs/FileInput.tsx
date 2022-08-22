import React, { ChangeEvent, FC } from 'react';
import { IconButton } from '@mui/material';
import { CrossIcon } from '../ui';

interface Props {
    onChange: (files: File[] | null) => void;
    disabled?: boolean;
    value?: string;
}

export const FileInput: FC<Props> = ({ onChange, value, disabled }) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        if (files) {
            const arr = Array.from(files);
            onChange(arr);
        }
    };

    return (
        <IconButton disabled={disabled} sx={{ bgcolor: 'info.main' }} component='label'>
            <input value={value} type='file' onChange={handleChange} style={{ display: 'none' }} />
            <CrossIcon />
        </IconButton>
    );
};

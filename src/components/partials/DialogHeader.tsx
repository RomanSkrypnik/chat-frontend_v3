import React, { FC, ReactNode } from 'react';
import { DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    onClose: () => void;
    children: ReactNode;
}

export const DialogHeader: FC<Props> = ({ onClose, children }) => {
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} id='alert-dialog-title'>
            {children}
            {onClose ? (
                <IconButton
                    aria-label='close'
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

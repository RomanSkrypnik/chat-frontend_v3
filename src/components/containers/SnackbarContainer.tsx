import React, { FC, ReactNode } from 'react';
import { useSnackbar } from '../../hooks/useSnackbar';
import { CloseCrossIcon, IconButton } from '../ui';

interface SnackbarContainerProps {
    children: ReactNode;
}

export const SnackbarContainer: FC<SnackbarContainerProps> = ({ children }) => {
    const { close } = useSnackbar();

    return (
        <div className='snackbar-container'>
            <div className='position-relative'>
                <IconButton className='position-absolute top-0 end-0' onClick={close}>
                    <CloseCrossIcon />
                </IconButton>
                {children}
            </div>
        </div>
    );
};

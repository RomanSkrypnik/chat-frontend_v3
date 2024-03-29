import React, { FC, ReactNode } from 'react';
import { CloseCrossIcon, IconButton } from '../ui';
import { useSnackbar } from '../../hooks';

interface Props {
    children: ReactNode;
}

export const SnackbarContainer: FC<Props> = ({ children }) => {
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

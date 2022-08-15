import React, { FC, ReactNode } from 'react';
import { Box } from '@mui/material';

interface Props {
    children: ReactNode;
}

export const CenteredContainer: FC<Props> = ({ children }) => {
    return (
        <Box sx={sx}>
            {children}
        </Box>
    );
};

const sx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
};

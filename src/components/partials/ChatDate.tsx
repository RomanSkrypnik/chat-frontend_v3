import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useDateCompare, useFormatDate } from '../../hooks';

interface Props {
    date: string;
    previousDate: string | null;
}

export const ChatDate: FC<Props> = ({ date, previousDate }) => {

    const equals = useDateCompare(date, previousDate);

    const formatted = useFormatDate(date, 'MMMMd');

    return (
        <>
            {
                !equals &&
                <Box sx={{ bgcolor: '#303f9f', borderRadius: '16px' }}>
                    <Typography sx={{ color: '#ffffff' }}>{formatted}</Typography>
                </Box>
            }
        </>
    );
};

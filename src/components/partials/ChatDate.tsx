import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { useDateCompare, useFormatDate } from '../../hooks';

interface Props {
    date: string;
    previousDate: string | null;
}

export const ChatDate: FC<Props> = ({ date, previousDate }) => {

    const equals = useDateCompare(date, previousDate);

    const formatted = useFormatDate(date, 'MMMM d');

    return (
        <>
            {
                !equals &&
                <Box sx={{ bgcolor: '#303f9f', borderRadius: '16px', alignSelf: 'center', py: 1, px: 1.5 }}>
                    <Typography sx={{ color: '#ffffff' }}>{formatted}</Typography>
                </Box>
            }
        </>
    );
};

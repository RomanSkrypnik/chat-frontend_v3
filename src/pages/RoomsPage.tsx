import React, { useEffect, useState } from 'react';
import { Room, RoomCreateForm } from '../components/partials';
import { useAppDispatch } from '../store';
import { fetchRooms, setRoom } from '../store/slices/room';
import { useParams } from 'react-router-dom';
import { MessageItem } from '../components/common';
import { useRoomConvert, useSearch, useTypedSelector } from '../hooks';
import { RoomSocketProvider } from '../components/providers';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

export const RoomsPage = () => {
    const [show, setShow] = useState(false);

    const { roomHash } = useParams();

    const { rooms } = useTypedSelector(state => state.room);

    const converted = useRoomConvert(rooms);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
        return () => {
            dispatch(setRoom(null));
        };
    }, []);

    const handleChange = async ({ search }: { search: string }) => {
        // const {data} = await RoomService.getBySearch(search);
        // dispatch(setRooms(data.data));
    };

    const handleClick = () => setShow(!show);

    const control = useSearch(handleChange);

    return (
        <RoomSocketProvider>
            <section>
                <Box sx={{ display: 'flex', gap: '24px' }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <Typography variant='h3' sx={{ mr: 3 }}>Rooms</Typography>
                            <Button variant='contained' onClick={handleClick}>Create New Room</Button>
                        </Box>
                        <Box>
                            <Controller
                                name='search'
                                control={control}
                                defaultValue=''
                                render={({ field: { onChange, value } }) =>
                                    <TextField
                                        onChange={onChange}
                                        value={value}
                                        placeholder='Search'
                                        name='search'
                                        sx={{ width: '100%' }}
                                    />
                                }
                            />
                            <Box sx={{ mt: 2 }}>
                                {
                                    converted.map(({ id, ...chat }) => <MessageItem {...chat} key={id} />)
                                }
                            </Box>
                        </Box>
                    </Box>
                    {roomHash && <Room />}
                </Box>
            </section>
            <RoomCreateForm open={show} onClose={handleClick} />
        </RoomSocketProvider>
    );
};

import React, { useEffect, useState } from 'react';
import { RoomForm, Room } from '../components/partials';
import { useAppDispatch } from '../store';
import { fetchRooms, setRoom } from '../store/slices/room';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../components/ui';
import { TextInput } from '../components/inputs';
import { MessageItem, MessageList } from '../components/common';
import { useRoomConvert, useSearch, useTypedSelector } from '../hooks';
import { RoomSocketProvider } from '../components/providers';
import { Box } from '@mui/material';

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
            <section className='rooms'>
                <div className='d-flex fade-in'>
                    <div className='w-25 me-3'>
                        <div className='d-flex justify-content-between mb-3'>
                            <h2 className='h1 mb-3'>Rooms</h2>
                            <RegularButton onClick={handleClick}>Create New Room</RegularButton>
                        </div>
                        <div className='message-wrapper me-3'>
                            <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
                            <Box sx={{ mt: 2 }}>
                                {
                                    converted.map(({ id, ...chat }) => <MessageItem {...chat} key={id} />)
                                }
                            </Box>
                        </div>
                    </div>
                    {roomHash && <Room />}
                    {show && <RoomForm onClose={handleClick} />}
                </div>
            </section>
        </RoomSocketProvider>
    );
};

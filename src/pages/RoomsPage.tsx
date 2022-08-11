import React, { useEffect, useState } from 'react';
import { RoomForm, RoomWrapper } from '../components/partials';
import { useAppDispatch } from '../store';
import { fetchRooms, setRoom } from '../store/slices/room';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../components/ui';
import { TextInput } from '../components/inputs';
import { MessageList } from '../components/common';
import { useRoomConvert, useSearch, useTypedSelector } from '../hooks';

export const RoomsPage = () => {
    const [show, setShow] = useState(false);

    const { rooms } = useTypedSelector(state => state.room);

    const { roomHash } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
        return () => {
            dispatch(setRoom(null));
        };
    }, []);

    const onChange = async ({ search }: { search: string }) => {
        // const {data} = await RoomService.getBySearch(search);
        // dispatch(setRooms(data.data));
    };

    const handleClick = () => setShow(!show);

    const control = useSearch(onChange);

    const converted = useRoomConvert(rooms);

    return (
        <section className='rooms'>
            <div className='d-flex fade-in'>
                <div className='w-25 me-3'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h2 className='h1 mb-3'>Rooms</h2>
                        <RegularButton onClick={handleClick}>Create New Room</RegularButton>
                    </div>
                    <div className='message-wrapper me-3'>
                        <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
                        <MessageList items={converted} />
                    </div>
                </div>
                {roomHash && <RoomWrapper />}
                {show && <RoomForm onClose={handleClick} />}
            </div>
        </section>
    );
};

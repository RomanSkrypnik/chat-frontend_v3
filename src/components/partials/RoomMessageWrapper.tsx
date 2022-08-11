import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchRooms } from '../../store/slices/room';
import { RoomMessageList } from './RoomMessageList';
import { useSearch, useTypedSelector } from '../../hooks';
import { TextInput } from '../inputs';

export const RoomMessageWrapper = () => {
    const { rooms } = useTypedSelector(state => state.room);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);

    const onChange = async ({ search }: { search: string }) => {
        // const {data} = await RoomService.getBySearch(search);
        // dispatch(setRooms(data.data));
    };

    const control = useSearch(onChange);

    return (
        <div className='message-wrapper me-3'>
            <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
            <RoomMessageList rooms={rooms} />
        </div>
    );
};

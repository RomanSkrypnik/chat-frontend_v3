import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../store';
import { fetchRooms } from '../../store/slices/room';
import { RoomMessageList } from './RoomMessageList';
import { useTypedSelector } from '../../hooks';
import { TextInput } from '../inputs';

export const RoomMessageWrapper = () => {
    const { rooms } = useTypedSelector(state => state.room);

    const { control, watch, handleSubmit } = useForm<{ search: string }>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRooms());
    }, []);

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSearchChange)());
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSearchChange = async ({ search }: { search: string }) => {
        // const {data} = await RoomService.getBySearch(search);
        // dispatch(setRooms(data.data));
    };

    return (
        <div className='message-wrapper me-3'>
            <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
            <RoomMessageList rooms={rooms} />
        </div>
    );
};

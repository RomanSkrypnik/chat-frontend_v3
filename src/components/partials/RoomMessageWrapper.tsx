import React, {useEffect} from 'react';
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "../../store";
import TextInput from "../inputs/TextInput";
import {fetchRooms} from "../../store/slices/room";
import RoomMessageList from "./RoomMessageList";

const RoomMessageWrapper = () => {
    const {rooms} = useTypedSelector(state => state.room);

    const {control, watch, handleSubmit} = useForm<{search: string}>();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchRooms())
    }, []);

    useEffect(() => {
        const subscription = watch(() => handleSubmit(onSearchChange)())
        return () => subscription.unsubscribe();
    }, [watch]);

    const onSearchChange = ({search}: {search: string}) => {
        console.log('changed');
    }

    return (
        <div className="message-wrapper me-3">
            <TextInput placeholder="Search" className="w-100 mb-3" control={control} name="search"/>
            <RoomMessageList rooms={rooms}/>
        </div>
    );
};

export default RoomMessageWrapper;
import React, {useEffect} from 'react';
import ChatList from "../common/ChatList";
import ChatControls from "./ChatControls";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import RoomHeader from "./RoomHeader";
import {useParams} from "react-router-dom";
import {useAppDispatch} from "../../store";
import {fetchRoom} from "../../store/slices/room";

const RoomWrapper = () => {
    const {hash} = useParams();

    const dispatch = useAppDispatch();

    const {room} = useTypedSelector(state => state.room);

    useEffect(() => {
        if (hash) {
            dispatch(fetchRoom(hash));
        }
    }, [hash]);

    const handleSubmit = () => {
        console.log('submitted');
    }

    return (
        <div className="flex-grow-1 bg-white">
            {
                room &&
                <>
                    <RoomHeader room={room}/>
                    <ChatList messages={room.messages}/>
                    <ChatControls onSubmit={handleSubmit}/>
                </>
            }
        </div>
    );
};

export default RoomWrapper;
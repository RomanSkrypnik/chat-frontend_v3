import React, { useEffect, useState } from 'react';
import { RoomForm, RoomMessageWrapper, RoomWrapper } from '../components/partials';
import { useAppDispatch } from '../store';
import { setRoom } from '../store/slices/room';
import { useParams } from 'react-router-dom';
import { RegularButton } from '../components/ui';

export const RoomsPage = () => {
    const [show, setShow] = useState(false);

    const { roomHash } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        return () => {
            dispatch(setRoom(null));
        };
    }, []);

    const handleClick = () => setShow(!show);

    return (
        <section className='rooms'>
            <div className='d-flex fade-in'>
                <div className='w-25 me-3'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h2 className='h1 mb-3'>Rooms</h2>
                        <RegularButton onClick={handleClick}>Create New Room</RegularButton>
                    </div>
                    <RoomMessageWrapper />
                </div>
                {roomHash && <RoomWrapper />}
                {show && <RoomForm onClose={handleClick} />}
            </div>
        </section>
    );
};

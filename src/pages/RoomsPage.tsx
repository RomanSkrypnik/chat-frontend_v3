import React, { useEffect, useState } from 'react';
import { RoomForm, RoomMessageWrapper, RoomWrapper } from '../components/partials';
import { useAppDispatch } from '../store';
import { setRoom } from '../store/slices/room';
import { useParams } from 'react-router-dom';
import { Typography } from '../components/common';
import { RegularButton } from '../components/ui';

export const RoomsPage = () => {
    const [show, setShow] = useState(false);

    const { hash } = useParams();

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
                        <Typography className='mb-3' fz={36}>Rooms</Typography>
                        <RegularButton onClick={handleClick}>Create New Room</RegularButton>
                    </div>
                    <RoomMessageWrapper />
                </div>
                {hash && <RoomWrapper />}
                {show && <RoomForm onClose={handleClick} />}
            </div>
        </section>
    );
};
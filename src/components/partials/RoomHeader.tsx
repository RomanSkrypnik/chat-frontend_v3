import React, { FC, useState } from 'react';
import { RoomDto } from '../../types/room';
import { ROOM_AVATAR_URL } from '../../http';
import { RoomProfile } from '../common';
import { CircleButton, ThreeDotsIcon } from '../ui';
import { Avatar } from '../ui/buttons/Avatar';

interface RoomHeaderProps {
    room: RoomDto;
}

export const RoomHeader: FC<RoomHeaderProps> = ({ room }) => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <>
            <div className='chat-header'>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                        <Avatar src={ROOM_AVATAR_URL + room.avatar} />
                        <div className='ms-3'>
                            <p className='body-1 fw-bold'>{room.name}</p>
                        </div>
                    </div>

                    <CircleButton onClick={handleClick} icon={<ThreeDotsIcon />} />
                </div>
            </div>
            {show && <RoomProfile onClose={handleClick} />}
        </>
    );
};

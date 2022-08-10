import React, { FC, useState } from 'react';
import Avatar from '../ui/buttons/Avatar';
import CircleButton from '../ui/buttons/CircleButton';
import ThreeDotsIcon from '../ui/icons/ThreeDotsIcon';
import { RoomDto } from '../../types/room';
import { ROOM_AVATAR_URL } from '../../http';
import { RoomProfile, Typography } from '../common';

interface RoomHeaderProps {
    room: RoomDto;
}

const RoomHeader: FC<RoomHeaderProps> = ({ room }) => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <>
            <div className='chat-header'>
                <div className='d-flex justify-content-between'>

                    <div className='d-flex'>
                        <Avatar src={ROOM_AVATAR_URL + room.avatar} />
                        <div className='ms-3'>
                            <Typography fz={18} className='fw-bold'>{room.name}</Typography>
                        </div>
                    </div>

                    <CircleButton onClick={handleClick} icon={<ThreeDotsIcon />} />
                </div>
            </div>

            {show && <RoomProfile onClose={handleClick} />}
        </>
    );
};

export default RoomHeader;

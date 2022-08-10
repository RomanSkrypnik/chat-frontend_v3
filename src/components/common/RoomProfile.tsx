import React, { FC } from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { ROOM_AVATAR_URL } from '../../http';
import { Typography } from './Typography';
import { CardContainer, DialContainer } from '../containers';
import { RoomProfileUser } from '../partials';
import { Avatar } from '../ui/buttons/Avatar';

interface RoomProfileProps {
    onClose: () => void;
}

export const RoomProfile: FC<RoomProfileProps> = ({ onClose }) => {
    const { room } = useTypedSelector(state => state.room);

    return (
        <DialContainer onClose={onClose}>
            <CardContainer className='_extended' onClose={onClose} title='Group info'>
                <div className='user-profile'>

                    <div className='d-flex align-items-center pb-3'>
                        <Avatar src={ROOM_AVATAR_URL + room?.avatar} width={70} height={70} />
                        <div className='ms-4'>
                            <Typography fz={18} className='fw-bold'>{room?.name}</Typography>
                        </div>
                    </div>

                    <div className='border-top-grey py-3'>
                        <Typography>{room?.description}</Typography>
                        <Typography fz={14} className='text-grey'>Description</Typography>
                    </div>

                    <div className='border-top-grey py-3'>
                        <Typography className='mb-3' fz={20}>Users in room</Typography>
                        <div>
                            {
                                room?.users.map(user => <RoomProfileUser user={user} key={user.id} />)
                            }
                        </div>
                    </div>

                </div>
            </CardContainer>
        </DialContainer>
    );
};

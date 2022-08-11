import React, { FC } from 'react';
import { ROOM_AVATAR_URL } from '../../http';
import { CardContainer, DialContainer } from '../containers';
import { RoomProfileUser } from '../partials';
import { Avatar } from '../ui/buttons/Avatar';
import { useTypedSelector } from '../../hooks';

interface Props {
    onClose: () => void;
}

export const RoomProfile: FC<Props> = ({ onClose }) => {
    const { room } = useTypedSelector(state => state.room);

    return (
        <DialContainer onClose={onClose}>
            <CardContainer className='_extended' onClose={onClose} title='Group info'>
                <div className='user-profile'>
                    <div className='d-flex align-items-center pb-3'>
                        <Avatar src={ROOM_AVATAR_URL + room?.avatar} width={70} height={70} />
                        <div className='ms-4'>
                            <h2 className='body-1 fw-bold'>{room?.name}</h2>
                        </div>
                    </div>
                    <div className='border-top-grey py-3'>
                        <h2>{room?.description}</h2>
                        <h3 className='body-2 text-grey'>Description</h3>
                    </div>
                    <div className='border-top-grey py-3'>
                        <h3 className='mb-3'>Users in room</h3>
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

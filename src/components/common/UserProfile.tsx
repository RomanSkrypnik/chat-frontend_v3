import React, { FC, useContext } from 'react';
import { UserDto } from '../../types';
import { CardContainer, DialContainer } from '../containers';
import { ButtonIcon, ProhibitedIcon, SwitchButton, UnlockedIcon } from '../ui';
import { Avatar } from '../ui/buttons/Avatar';
import { SocketContext } from '../providers';
import { useFormatDuration, useStorageUrl, useTypedSelector } from '../../hooks';

interface UserBioProps {
    bio: string;
}

const UserBio: FC<UserBioProps> = ({ bio }) => {
    return (
        <div className='mt-3'>
            <h2 className='body-1 fw-bold'>{bio}</h2>
            <h3 className='body-2 text-grey'>Bio</h3>
        </div>
    );
};

interface NotificationProps {
    isMuted: boolean;
    userId: number;
}

const Notification: FC<NotificationProps> = ({ isMuted, userId }) => {
    const socket = useContext(SocketContext);

    const muteUnmute = () => socket?.emit('mute-unmute', userId);

    return (
        <div className='user-profile__personal mt-3'>
            <h2 className='body-1'>Notification</h2>
            <SwitchButton onChange={muteUnmute} value={!isMuted} />
        </div>
    );
};

interface BlockButtonProps {
    isBlockedByMe: boolean;
    userId: number;
}

const BlockButton: FC<BlockButtonProps> = ({ isBlockedByMe, userId }) => {
    const socket = useContext(SocketContext);

    const blockUnblock = () => socket?.emit('block-unblock', userId);

    return (
        <>
            {
                isBlockedByMe
                    ? <ButtonIcon onClick={blockUnblock} className='red' icon={<UnlockedIcon />}>
                        Unblock user
                    </ButtonIcon>
                    : <ButtonIcon onClick={blockUnblock} className='red' icon={<ProhibitedIcon />}>
                        Block user
                    </ButtonIcon>
            }
        </>
    );
};

interface UserProfileDialProps {
    user: UserDto;
    onClose: () => void;
}

export const UserProfile: FC<UserProfileDialProps> = ({ user, onClose }) => {
    const { chat } = useTypedSelector(state => state.chat);

    const date = useFormatDuration(user.lastSeen);

    const src = useStorageUrl('/avatars/', user.avatar);

    return (
        <DialContainer onClose={onClose}>
            <CardContainer className='_extended' onClose={onClose} title='User info'>
                <div className='user-profile'>
                    <div className='d-flex align-items-center pb-3'>
                        <Avatar src={src} width={70} height={70} />
                        <div className='ms-4'>
                            <h2 className='body-1 fw-bold'>{user.name}</h2>
                            <h2 className='body-1'>{(user.online && 'Online') || `last seen ${date}`}</h2>
                        </div>
                    </div>
                    <div className='border-top-grey py-3'>
                        <h2 className='body-1'>{user.username}</h2>
                        <h3 className='body-2 text-grey'>Username</h3>

                        {user.bio && <UserBio bio={user.bio} />}
                        {chat && <Notification userId={user.id} isMuted={chat?.isMuted} />}
                    </div>
                    <div className='border-top-grey pt-3'>
                        {chat && <BlockButton userId={user.id} isBlockedByMe={chat.isBlockedByMe} />}
                    </div>
                </div>
            </CardContainer>
        </DialContainer>
    );
};

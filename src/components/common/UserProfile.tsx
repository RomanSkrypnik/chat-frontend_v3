import React, {FC, useContext} from 'react';
import DialContainer from "../containers/DialContainer";
import CardContainer from "../containers/CardContainer";
import {UserDto} from "../../types";
import Avatar from "../ui/buttons/Avatar";
import {useFormatDuration} from "../../hooks/useDate";
import Typography from "./Typography";
import ProhibitedIcon from "../ui/icons/ProhibitedIcon";
import ButtonIcon from "../ui/buttons/ButtonIcon";
import SwitchButton from "../ui/buttons/SwitchButton";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UnlockedIcon from "../ui/icons/UnlockedIcon";
import {SocketContext} from "../providers/SocketProvider";

interface UserProfileDialProps {
    user: UserDto;
    onClose: () => void;
}

const UserProfile: FC<UserProfileDialProps> = ({user, onClose}) => {
    const {chat} = useTypedSelector(state => state.chat)

    const date = useFormatDuration(user.lastSeen);

    const socket = useContext(SocketContext);

    const blockUnblock = () => socket?.emit('block-unblock', user.id);

    const muteUnmute = () => socket?.emit('mute-unmute', user.id);

    return (
        <DialContainer onClose={onClose}>
            <CardContainer className="_extended" onClose={onClose} title="User info">
                <div className="user-profile">

                    <div className="d-flex align-items-center pb-3">
                        <Avatar width={70} height={70}/>
                        <div className="ms-4">
                            <Typography fz={18} className="fw-bold">{user.name}</Typography>
                            <Typography>{(user.online && 'Online') || `last seen ${date}`}</Typography>
                        </div>
                    </div>

                    <div className="border-top-grey py-3">
                        <Typography>{user.username}</Typography>
                        <Typography fz={14} className="text-grey">Username</Typography>

                        {
                            user.bio && <div className="mt-3">
                                <Typography>{user.bio}</Typography>
                                <Typography fz={14} className="text-grey">Bio</Typography>
                            </div>
                        }

                        <div className="user-profile__personal mt-3">
                            <Typography>Notification</Typography>
                            {chat && <SwitchButton onChange={muteUnmute} value={!chat.isMuted}/>}
                        </div>
                    </div>

                    <div className="border-top-grey pt-3">
                        {
                            chat?.isBlockedByMe
                                ? <ButtonIcon onClick={blockUnblock} className="red" icon={<UnlockedIcon/>}>
                                    Unblock user
                                </ButtonIcon>
                                : <ButtonIcon onClick={blockUnblock} className="red" icon={<ProhibitedIcon/>}>
                                    Block user
                                </ButtonIcon>
                        }
                    </div>

                </div>
            </CardContainer>
        </DialContainer>
    );
};

export default UserProfile;
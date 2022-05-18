import React, {FC, useContext, useState} from 'react';
import DialContainer from "../containers/DialContainer";
import CardContainer from "../containers/CardContainer";
import {UserDto} from "../../types";
import Avatar from "../ui/buttons/Avatar";
import {useFormatDuration} from "../../hooks/useDate";
import Typography from "./Typography";
import ProhibitedIcon from "../ui/icons/ProhibitedIcon";
import ButtonIcon from "../ui/buttons/ButtonIcon";
import SwitchButton from "../ui/buttons/SwitchButton";
import {SocketContext} from "../../hocs/Authorized";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import UnlockedIcon from "../ui/icons/UnlockedIcon";

interface UserProfileDialProps {
    user: UserDto;
    onClose: () => void;
}

const UserProfile: FC<UserProfileDialProps> = ({user, onClose}) => {
    const [toggled, setToggled] = useState(false);

    const {chat} = useTypedSelector(state => state.chat)

    const date = useFormatDuration(user.lastSeen);

    const socket = useContext(SocketContext);

    const handleToggle = (value: boolean) => setToggled(value);

    const blockUnblock = () => socket?.emit('block-unblock', user.id);

    return (
        <DialContainer onClose={onClose}>
            <CardContainer onClose={onClose} title="User info">
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
                        <div className="user-profile__personal mt-3">
                            <Typography>Notification</Typography>
                            <SwitchButton onChange={handleToggle} value={toggled}/>
                        </div>
                    </div>

                    <div className="border-top-grey pt-3">
                        {
                            chat?.isBlockedByMe
                                ? <ButtonIcon onClick={blockUnblock} className="red" icon={<UnlockedIcon/>}>Unblock user</ButtonIcon>
                                : <ButtonIcon onClick={blockUnblock} className="red" icon={<ProhibitedIcon/>}>Block user</ButtonIcon>
                        }
                    </div>

                </div>
            </CardContainer>
        </DialContainer>
    );
};

export default UserProfile;
import React, {FC} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {useNavigate} from "react-router-dom";
import {UserDto} from "../../types";
import CircleButton from "../ui/buttons/CircleButton";
import ClipIcon from "../ui/icons/ClipIcon";
import ThreeDotsIcon from "../ui/icons/ThreeDotsIcon";
import Typography from "./Typography";

interface ChatHeaderProps {
    user: UserDto;
}

const ChatHeader: FC<ChatHeaderProps> = ({user}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="chat-header">
            <div className="d-flex justify-content-between">

                <div className="d-flex">
                    <Avatar/>
                    <div className="ms-3">
                        <Typography fz={18} className="fw-bold">{user.name}</Typography>
                        <Typography className="text-primary">Test</Typography>
                    </div>
                </div>

                <div className="chat-header__buttons">
                    <CircleButton icon={<ClipIcon/>}/>
                    <CircleButton icon={<ThreeDotsIcon/>}/>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
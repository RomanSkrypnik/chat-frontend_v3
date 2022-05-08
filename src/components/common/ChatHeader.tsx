import React, {FC} from 'react';
import Avatar from "../ui/buttons/Avatar";
import {useNavigate} from "react-router-dom";
import {UserDto} from "../../types";

interface ChatHeaderProps {
    user: UserDto;
}

const ChatHeader: FC<ChatHeaderProps> = ({user}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

    return (
        <div className="rounded bg-light p-3 mb-4">
            <div className="d-flex justify-content-between">

                <button onClick={handleClick} className="btn btn-secondary">Back</button>

                <div className="chat-header__body">
                    <h6 className="mb-1">{user.name}</h6>
                    <div>Test</div>
                </div>

                <Avatar/>
            </div>
        </div>
    );
};

export default ChatHeader;
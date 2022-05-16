import React, {FC} from 'react';
import {MessageDto} from "../../types";
import cn from "classnames";
import Avatar from "../ui/buttons/Avatar";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import ChatMessage from "./ChatMessage";

interface ChatListItemProps {
    messageRow: MessageDto[];
}

const ChatListItem: FC<ChatListItemProps> = ({messageRow}) => {

    const {user} = useTypedSelector(state => state.auth);

    const isCurrUser = messageRow[0].user.id === user?.id;

    return (
        <li className={cn("mt-3", isCurrUser ? 'align-self-end' : 'align-self-start')}>
            <div className="d-flex">

                {!isCurrUser && <Avatar className="order-0" />}

                <div className={cn("d-flex flex-column", isCurrUser ? 'align-items-end' : 'align-items-start')}>
                    {
                        messageRow.map(message => (<ChatMessage message={message} key={message.id}/>))
                    }
                </div>

            </div>
        </li>
    );
};

export default ChatListItem;
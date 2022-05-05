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
        <li className={cn("chat-list__item", isCurrUser ? 'align-self-start' : 'align-self-end')}>
            <div className="d-flex">

                <Avatar className={cn(isCurrUser ? 'order-0' : 'order-1')}/>

                <div>
                    {
                        messageRow.map(message => (
                            <ChatMessage message={message}/>
                        ))
                    }
                </div>

            </div>
        </li>
    );
};

export default ChatListItem;
import React, {FC, MutableRefObject, useEffect, useRef, useState} from 'react';
import {MessageDto} from "../../types";
import ChatListItem from "../partials/ChatListItem";
import {useMessageArr} from "../../hooks/useMessageArr";
import {useAppDispatch} from "../../store";
import {fetchMessages as fetchChatMessages} from "../../store/slices/chat";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useParams} from "react-router-dom";
import {fetchMessages as fetchRoomMessages} from "../../store/slices/room";

interface ChatListProps {
    messages: MessageDto[]
}

const ChatList: FC<ChatListProps> = ({messages}) => {
    const [scrollTop, setScrollTop] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const {hash} = useParams();

    const {chat} = useTypedSelector(state => state.chat);
    const {room} = useTypedSelector(state => state.room);
    const {user} = useTypedSelector(state => state.auth);

    const twoDimsArr = useMessageArr(messages);

    const dispatch = useAppDispatch();

    const ref = useRef() as MutableRefObject<HTMLUListElement>;

    const lastMessage = messages[0];

    useEffect(() => {
        if (messages.length === 40 || isLoaded) {
            scrollToBottom();
        }
    }, [isLoaded, twoDimsArr]);

    useEffect(() => {
        if (lastMessage?.user.id === user?.id) {
            scrollToBottom();
        }
    }, [lastMessage]);

    useEffect(() => {
        setIsLoaded(false);
    }, [hash]);

    useEffect(() => {
        if (isLoaded) {
            ref.current.scrollTo(0, ref.current.scrollHeight - scrollTop);
        }
    }, [isLoaded]);

    const handleScroll = () => {
        if (ref.current.scrollTop === 0) {

            if (chat) {
                dispatch(fetchChatMessages(chat.id));
            } else if (room) {
                dispatch(fetchRoomMessages(room.id));
            }

            setScrollTop(ref.current.scrollHeight);
            setIsLoaded(false);
        }
    }

    const scrollToBottom = () => {
        if (ref) {
            ref.current.scrollTo(0, ref.current.scrollHeight);
        }
    }

    return (
        <ul className="chat-list scrollbar list-unstyled"
            ref={ref}
            onLoad={() => setIsLoaded(true)}
            onScroll={handleScroll}>
            {
                twoDimsArr.map((messageRow, idx) => <ChatListItem messageRow={messageRow} key={idx}/>)
            }
        </ul>
    );
};

export default ChatList;
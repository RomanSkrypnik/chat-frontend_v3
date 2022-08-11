import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchChat, setChat } from '../../store/slices/chat';
import { useParams } from 'react-router-dom';
import { ChatList } from '../common';
import { ChatHeader } from './ChatHeader';
import { ChatControls } from './ChatControls';
import { useCreateChatMessage, useTypedSelector } from '../../hooks';

export const Chat = () => {
    const { chatHash } = useParams();

    const dispatch = useAppDispatch();

    const { chat } = useTypedSelector(state => state.chat);

    const handleSubmit = useCreateChatMessage();

    useEffect(() => {
        chatHash && dispatch(fetchChat(chatHash));
        return () => {
            dispatch(setChat(null));
        };
    }, [chatHash]);

    return (
        <div className='flex-grow-1 bg-white'>
            {
                chat &&
                <>
                    <ChatHeader user={chat.user} />
                    <ChatList messages={chat.messages} />
                    <ChatControls isBlocked={chat.isBlockedByMe || chat.isBlockedByCompanion} onSubmit={handleSubmit} />
                </>
            }
        </div>
    );
};

import React, { useContext, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchChat, setChat } from '../../store/slices/chat';
import { useParams } from 'react-router-dom';
import { CreateMessageValues } from '../../types';
import { ChatList } from '../common';
import { MessageService } from '../../services';
import { ChatHeader } from './ChatHeader';
import { ChatControls } from './ChatControls';
import { SocketContext } from '../providers';
import { useTypedSelector } from '../../hooks';

export const ChatWrapper = () => {
    const { chatHash } = useParams();

    const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);

    const { chat } = useTypedSelector(state => state.chat);

    useEffect(() => {
        if (chatHash) {
            dispatch(fetchChat(chatHash));
        }

        return () => {
            dispatch(setChat(null));
        };
    }, [chatHash]);

    const handleSubmit = async ({ files, text }: CreateMessageValues) => {
        if (chatHash) {
            const fd = new FormData();

            fd.append('hash', chatHash);
            fd.append('text', text);

            if (files.length > 0) {
                for (const file of files) {
                    fd.append('files', file);
                }
            }

            const { data } = await MessageService.create(fd);
            const withChat = !chat?.id;

            socket?.emit('send-message', { message: data.data, chatHash, withChat });
        }
    };

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

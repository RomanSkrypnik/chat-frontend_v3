import React, { useContext, useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchChat, setChat } from '../../store/slices/chat';
import { useParams } from 'react-router-dom';
import { CreateMessageValues } from '../../types';
import { ChatList, Wrapper } from '../common';
import { MessageService } from '../../services';
import { ChatHeader } from './ChatHeader';
import { ChatControls } from './ChatControls';
import { SocketContext } from '../providers';
import { useTypedSelector } from '../../hooks';

export const ChatWrapper = () => {
    const { hash } = useParams();

    const dispatch = useAppDispatch();

    const socket = useContext(SocketContext);

    const { chat } = useTypedSelector(state => state.chat);

    useEffect(() => {
        if (hash) {
            dispatch(fetchChat(hash));
        }

        return () => {
            dispatch(setChat(null));
        };
    }, [hash]);

    const handleSubmit = async ({ files, text }: CreateMessageValues) => {
        if (hash) {
            const fd = new FormData();

            fd.append('hash', hash);
            fd.append('text', text);

            if (files.length > 0) {
                for (const file of files) {
                    fd.append('files', file);
                }
            }

            const { data } = await MessageService.create(fd);
            const withChat = !chat?.id;

            socket?.emit('send-message', { message: data.data, hash, withChat });
        }
    };

    return (
        <Wrapper>
            <div className='flex-grow-1 bg-white'>
                {
                    chat &&
                    <>
                        <ChatHeader user={chat.user} />
                        <ChatList messages={chat.messages} />
                        <ChatControls isBlocked={chat.isBlockedByMe || chat.isBlockedByCompanion}
                                      onSubmit={handleSubmit}
                        />
                    </>
                }
            </div>
        </Wrapper>
    );
};

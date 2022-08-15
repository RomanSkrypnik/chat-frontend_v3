import React, { FC, useContext, useEffect } from 'react';
import { MessageDto } from '../../types';
import cn from 'classnames';
import { useInView } from 'react-intersection-observer';
import { SocketContext, RoomSocketContext } from '../providers';
import { ChatMessageSwitch } from './ChatMessageSwitch';
import { ClipsIcon } from '../ui';
import { useTypedSelector } from '../../hooks';
import { Box, Typography } from '@mui/material';

interface ChatMessageProps {
    message: MessageDto;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message }) => {
    const { user } = useTypedSelector(state => state.auth);
    const { room } = useTypedSelector(state => state.room);

    const { inView, ref } = useInView({ threshold: 0.8 });

    const socket = useContext(SocketContext);
    const roomSocket = useContext(RoomSocketContext);

    const isCurrUser = user?.hash === message.user.hash;

    useEffect(() => {
        if (inView && !message.isRead) {
            if (!isCurrUser) {
                const messageBody = { userId: user?.id, messageId: message.id };

                if (room) {
                    roomSocket?.emit('read-message', { ...messageBody, roomId: room?.id });
                } else {
                    socket?.emit('read-message', messageBody);
                }
            }
        }
    }, [inView]);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }} ref={ref}>
            <Box className={cn('chat-message mx-2 bg-light', !isCurrUser && '_alternate')}>
                {
                    message.files.map(file => <ChatMessageSwitch file={file} key={file.id} />)
                }
                <Typography>{message.text}</Typography>
            </Box>
            {isCurrUser && <ClipsIcon className={message.isRead ? '_active' : ''} />}
        </Box>
    );
};

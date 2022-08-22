import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageItem, UserSearch } from '../components/common';
import { Chat } from '../components/partials';
import { useChatConvert, useSearch, useTypedSelector } from '../hooks';
import { useAppDispatch } from '../store';
import { fetchChats, findChat } from '../store/slices/chat';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller } from 'react-hook-form';

export const HomePage = () => {
    const [show, setShow] = useState(false);

    const { chatHash } = useParams();

    const dispatch = useAppDispatch();

    const { chats } = useTypedSelector(state => state.chat);

    const converted = useChatConvert(chats);

    useEffect(() => {
        dispatch(fetchChats());
    }, []);

    const handleChange = ({ search }: { search: string }) => {
        dispatch(findChat(search));
    };

    const handleClick = () => setShow(!show);

    const control = useSearch(handleChange);

    return (
        <section className='home'>
            <Box sx={{ display: 'flex', gap: '24px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Typography variant='h3' sx={{ mr: 3 }}>Chats</Typography>
                        <Button variant='contained' onClick={handleClick}>Create New Chat</Button>
                    </Box>
                    <Box>
                        <Controller
                            name='search'
                            control={control}
                            defaultValue=''
                            render={({ field: { onChange, value } }) =>
                                <TextField
                                    onChange={onChange}
                                    value={value}
                                    placeholder='Search'
                                    name='search'
                                    sx={{ width: '100%' }}
                                />
                            }
                        />
                        <Box sx={{ mt: 2 }}>
                            {
                                converted.map(({ id, ...chat }) => <MessageItem {...chat} key={id} />)
                            }
                        </Box>
                    </Box>
                </Box>
                {chatHash && <Chat />}
            </Box>
            <UserSearch open={show} onClose={handleClick} />
        </section>
    );
};

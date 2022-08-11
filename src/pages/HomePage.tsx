import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageList, UserSearch } from '../components/common';
import { Chat } from '../components/partials';
import { RegularButton } from '../components/ui';
import { TextInput } from '../components/inputs';
import { useChatConvert, useSearch, useTypedSelector } from '../hooks';
import { useAppDispatch } from '../store';
import { fetchChats, findChat } from '../store/slices/chat';

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
            <div className='d-flex fade-in'>
                <div className='w-25 me-3'>
                    <div className='d-flex justify-content-between mb-3'>
                        <h1 className='mb-3'>Chats</h1>
                        <RegularButton onClick={handleClick}>Create New Chat</RegularButton>
                    </div>
                    <div className='message-wrapper me-3'>
                        <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
                        <MessageList items={converted} />
                    </div>
                </div>
                {chatHash && <Chat />}
            </div>
            {show && <UserSearch onClose={handleClick} />}
        </section>
    );
};

import React, { useEffect } from 'react';
import { useAppDispatch } from '../../store';
import { fetchChats, findChat } from '../../store/slices/chat';
import { MessageList } from '../common';
import { useChatConvert, useSearch, useTypedSelector } from '../../hooks';
import { TextInput } from '../inputs';

export const MessageWrapper = () => {
    const { chats } = useTypedSelector(state => state.chat);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchChats());
    }, []);

    const onChange = ({ search }: { search: string }) => {
        dispatch(findChat(search));
    };

    const control = useSearch(onChange);

    const converted = useChatConvert(chats);

    return (
        <div className='message-wrapper me-3'>
            <TextInput placeholder='Search' className='w-100 mb-3' control={control} name='search' />
            <MessageList items={converted} />
        </div>
    );
};

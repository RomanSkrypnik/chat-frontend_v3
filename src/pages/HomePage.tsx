import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, UserSearch } from '../components/common';
import { ChatWrapper, MessageWrapper } from '../components/partials';
import { RegularButton } from '../components/ui';

export const HomePage = () => {
    const [show, setShow] = useState(false);

    const { chatHash } = useParams();

    const handleClick = () => setShow(!show);

    return (
        <section className='home'>
            <div className='d-flex fade-in'>
                <div className='w-25 me-3'>
                    <div className='d-flex justify-content-between mb-3'>
                        <Typography className='mb-3' fz={36}>Chats</Typography>
                        <RegularButton onClick={handleClick}>Create New Chat</RegularButton>
                    </div>
                    <MessageWrapper />
                </div>
                {chatHash && <ChatWrapper />}
            </div>
            {show && <UserSearch onClose={handleClick} />}
        </section>
    );
};

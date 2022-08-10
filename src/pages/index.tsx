import React, { useState } from 'react';
import withAuthorized from '../hocs/Authorized';
import MessageWrapper from '../components/partials/MessageWrapper';
import ChatWrapper from '../components/partials/ChatWrapper';
import { useParams } from 'react-router-dom';
import RegularButton from '../components/ui/buttons/RegularButton';
import { Typography, UserSearch } from '../components/common';

const Home = () => {
    const [show, setShow] = useState(false);

    const { hash } = useParams();


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
                {
                    hash && <ChatWrapper />
                }
            </div>
            {
                show && <UserSearch onClose={handleClick} />
            }
        </section>
    );
};

export default withAuthorized(Home);

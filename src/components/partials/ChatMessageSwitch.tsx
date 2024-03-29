import React, { FC, useState } from 'react';
import { FileDto } from '../../types';
import cn from 'classnames';
import { ImageDial } from '../common';
import { DocumentIcon } from '../ui';
import { useFileType } from '../../hooks';

interface ChatSwitchProps {
    file: FileDto;
}

interface ChatSwitchChildren extends ChatSwitchProps {
    src: string;
}

export const ChatDocument: FC<ChatSwitchChildren> = ({ file, src }) => {
    return (
        <a href={src} className='chat-message__switch-link' download>
            <div className='chat-message__switch-icon'>
                <DocumentIcon />
            </div>
            <div>
                <div>{file.filename}</div>
            </div>
        </a>
    );
};

export const ChatPhoto: FC<ChatSwitchChildren> = ({ src }) => {
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);

    return (
        <div className='chat-message__switch-image'>
            {show && <ImageDial onClose={handleClick} src={src} />}
            <img src={src} onClick={handleClick} alt='' />
        </div>
    );
};

export const ChatMessageSwitch: FC<ChatSwitchProps> = ({ file }) => {
    const { className, element } = useFileType(file);

    return (
        <div className={cn('chat-message__switch', className)}>
            {element}
        </div>
    );
};

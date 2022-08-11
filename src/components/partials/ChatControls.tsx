import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CreateMessageValues } from '../../types';
import { CircleButton, CrossIcon, TelegramIcon } from '../ui';
import { FileInput, TextInput } from '../inputs';

interface Props {
    isBlocked?: boolean;
    onSubmit: (data: CreateMessageValues) => void;
}

export const ChatControls: FC<Props> = ({ isBlocked, onSubmit }) => {
    const [files, setFiles] = useState<[] | File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const { handleSubmit, control, reset } = useForm<CreateMessageValues>();

    const handleOnSubmit = (data: { text: string }) => {
        if (data.text || files.length > 0) {
            onSubmit({ ...data, files });
            reset({ text: '' });
            setFiles([]);
        }
    };

    const handleFileClick = () => inputRef?.current?.click();

    const handleFileChange = (files: File[]) => {
        setFiles(files);
    };

    return (
        <div className='chat-controls'>
            <form onSubmit={handleSubmit(handleOnSubmit)} className='d-flex align-items-center'>
                <CircleButton disabled={isBlocked}
                              onClick={handleFileClick}
                              className='bg-blue-linear'
                              icon={<CrossIcon />}
                />
                <FileInput ref={inputRef} onChange={handleFileChange} />
                <TextInput disabled={isBlocked}
                           className='w-100 px-4'
                           name='text'
                           control={control}
                           placeholder='Type a message here'
                />
                <CircleButton disabled={isBlocked} type='submit' className='bg-blue-linear' icon={<TelegramIcon />} />
            </form>
        </div>
    );
};

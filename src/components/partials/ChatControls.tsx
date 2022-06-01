import React, {FC, useRef, useState} from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import CircleButton from "../ui/buttons/CircleButton";
import CrossIcon from "../ui/icons/CrossIcon";
import TelegramIcon from "../ui/icons/TelegramIcon";
import FileInput from "../inputs/FileInput";
import {CreateMessageValues} from "../../types";

interface ChatControlsProps {
    isBlocked?: boolean;
    onSubmit: (data: CreateMessageValues) => void;
}

const ChatControls: FC<ChatControlsProps> = ({isBlocked, onSubmit}) => {
    const [files, setFiles] = useState<[] | File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const {handleSubmit, control, reset} = useForm<CreateMessageValues>();

    const handleOnSubmit = (data: { text: string }) => {
        if (data.text || files.length > 0) {
            onSubmit({...data, files});

            reset({text: ''});

            setFiles([]);
        }
    }

    const handleFileClick = () => inputRef?.current?.click();

    const handleFileChange = (files: File[]) => {
        setFiles(files);
    }

    return (
        <div className="chat-controls">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="d-flex align-items-center">
                <CircleButton disabled={isBlocked}
                              onClick={handleFileClick}
                              className="bg-blue-linear"
                              icon={<CrossIcon/>}
                />
                <FileInput ref={inputRef} onChange={handleFileChange}/>
                <TextInput disabled={isBlocked}
                           className="w-100 px-4"
                           name="text"
                           control={control}
                           placeholder="Type a message here"
                />
                <CircleButton disabled={isBlocked} type="submit" className="bg-blue-linear" icon={<TelegramIcon/>}/>
            </form>
        </div>
    );
};

export default ChatControls;
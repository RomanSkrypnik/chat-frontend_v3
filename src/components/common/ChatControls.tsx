import React, {FC, useRef, useState} from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import CircleButton from "../ui/buttons/CircleButton";
import CrossIcon from "../ui/icons/CrossIcon";
import TelegramIcon from "../ui/icons/TelegramIcon";
import FileInput from "../inputs/FileInput";
import {CreateMessageValues} from "../../types";

interface ChatControlsProps {
    onSubmit: (data: CreateMessageValues) => void;
}

const ChatControls: FC<ChatControlsProps> = ({onSubmit}) => {
    const [files, setFiles] = useState<[] | File[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);

    const {handleSubmit, control, reset} = useForm<CreateMessageValues>();

    const handleOnSubmit = (data: { text: string }) => {
        onSubmit({...data, files});

        reset({text: ''});

        setFiles([]);
    }

    const handleFileClick = () => inputRef?.current?.click();

    const handleFileChange = (fileList: FileList) => {
        const files = Array.from(fileList)
        setFiles(files);
    }

    return (
        <div className="chat-controls">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="d-flex align-items-center">
                <CircleButton onClick={handleFileClick} className="bg-blue-linear" icon={<CrossIcon/>}/>
                <FileInput ref={inputRef} onChange={handleFileChange}/>
                <TextInput className="w-100" name="text" control={control} placeholder="Type a message here"/>
                <CircleButton type="submit" className="bg-blue-linear" icon={<TelegramIcon/>}/>
            </form>
        </div>
    );
};

export default ChatControls;
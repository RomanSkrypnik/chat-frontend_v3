import React, {FC} from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";
import CircleButton from "../ui/buttons/CircleButton";
import CrossIcon from "../ui/icons/CrossIcon";
import TelegramIcon from "../ui/icons/TelegramIcon";

interface CreateMessageValues {
    text: string;
    file: null;
}

interface ChatControlsProps {
    onSubmit: (data: CreateMessageValues) => void;
}

const ChatControls: FC<ChatControlsProps> = ({onSubmit}) => {

    const {handleSubmit, control, reset} = useForm<CreateMessageValues>();

    const handleOnSubmit = (data: CreateMessageValues) => {
        reset({text: ''});
        onSubmit(data);
    }

    return (
        <div className="chat-controls">
            <form onSubmit={handleSubmit(handleOnSubmit)} className="d-flex align-items-center">
                <CircleButton className="bg-blue-linear" icon={<CrossIcon/>}/>
                <TextInput className="w-100" name="text" control={control} placeholder="Type a message here"/>
                <CircleButton type="submit" className="bg-blue-linear" icon={<TelegramIcon/>}/>
            </form>
        </div>
    );
};

export default ChatControls;
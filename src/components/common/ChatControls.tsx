import React, {FC} from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";

interface CreateMessageValues {
    text: string;
    file: null;
}

interface ChatControlsProps {
    onSubmit: (data: CreateMessageValues) => void;
}

const ChatControls: FC<ChatControlsProps> = ({onSubmit}) => {

    const {handleSubmit, control} = useForm<CreateMessageValues>();

    return (
        <div className="chat-controls">
            <form onSubmit={handleSubmit(onSubmit)} className="d-flex align-items-center mt-3">
                <TextInput className="w-100" name="text" control={control}/>
                <button type="submit" className="btn btn-primary ms-3">Send</button>
            </form>
        </div>
    );
};

export default ChatControls;
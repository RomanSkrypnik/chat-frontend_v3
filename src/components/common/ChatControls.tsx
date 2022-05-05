import React from 'react';
import TextInput from "../inputs/TextInput";
import {useForm} from "react-hook-form";

const ChatControls = () => {

    const {handleSubmit, control} = useForm();

    return (
        <div className="chat-controls">
            <div className="d-flex align-items-center mt-3">
                <TextInput className="w-100" name="text" control={control}/>
                <button className="btn btn-primary ms-3">Send</button>
            </div>
        </div>
    );
};

export default ChatControls;
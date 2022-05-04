import React, {FC} from 'react';
import {useController, UseControllerProps} from "react-hook-form";

type InputProps = {
    placeholder?: string;
    label?: string;
} & UseControllerProps<any>

const TextInput: FC<InputProps> = (props) => {

    const {field: {onChange, value, name}} = useController({...props, defaultValue: ''});

    return (
        <label className="d-flex flex-column mt-3">
            {props.label}
            <input type="text" onChange={onChange} value={value} name={name} placeholder={props.placeholder}/>
        </label>
    );
};

export default TextInput;
import React, {FC} from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import cn from "classnames";

type InputProps = {
    placeholder?: string;
    label?: string;
    className?: string;
} & UseControllerProps<any>

const TextInput: FC<InputProps> = (props) => {

    const {field: {onChange, value, name}} = useController({...props, defaultValue: ''});

    return (
        <label className={cn("d-flex flex-column", props.className)}>
            {props.label}
            <input type="text" onChange={onChange} value={value} name={name} placeholder={props.placeholder}/>
        </label>
    );
};

export default TextInput;
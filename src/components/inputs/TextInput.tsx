import React, {FC} from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import cn from "classnames";
import Typography from "../common/Typography";

type InputProps = {
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    className?: string;
} & UseControllerProps<any>

const TextInput: FC<InputProps> = (props) => {

    const {field: {onChange, value, name}} = useController({...props, defaultValue: props.defaultValue ?? ''});

    return (
        <label className={cn("d-flex flex-column", props.className)}>

            {props.label && <Typography as="span" fz={20} className="mb-2">{props.label}</Typography>}

            <input disabled={props.disabled}
                   className="text-input"
                   type="text"
                   onChange={onChange}
                   value={value}
                   name={name}
                   placeholder={props.placeholder}
            />

        </label>
    );
};

export default TextInput;
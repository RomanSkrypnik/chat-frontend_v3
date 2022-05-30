import React, {FC} from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import cn from "classnames";

type TextInputProps = {
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    className?: string;
} & UseControllerProps<any>

const TextAreaInput: FC<TextInputProps> = (props) => {

    const {field: {onChange, value, name}} = useController({...props, defaultValue: props.defaultValue ?? ''});

    return (
        <textarea className={cn("textarea-input", props.className)} onChange={onChange} name={name} placeholder={props.placeholder}>
            {value}
        </textarea>
    );
};

export default TextAreaInput;
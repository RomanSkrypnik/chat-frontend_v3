import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import cn from 'classnames';

type Props = {
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    className?: string;
} & UseControllerProps<any>

export const TextAreaInput: FC<Props> = (props) => {

    const { field: { onChange, value, name } } = useController({ ...props, defaultValue: props.defaultValue ?? '' });

    return (
        <textarea className={cn('textarea-input', props.className)} onChange={onChange} name={name}
                  placeholder={props.placeholder}>
            {value}
        </textarea>
    );
};

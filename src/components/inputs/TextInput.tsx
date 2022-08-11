import React, { FC } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import cn from 'classnames';

type Props = {
    type?: 'text' | 'password';
    disabled?: boolean;
    placeholder?: string;
    label?: string;
    className?: string;
    withError?: boolean;
} & UseControllerProps<any>

export const TextInput: FC<Props> = ({
                                         placeholder,
                                         type,
                                         label,
                                         className,
                                         withError = true,
                                         disabled,
                                         ...props
                                     }) => {

    const { field: { onChange, value, name }, formState: { errors } } = useController({
        ...props,
        defaultValue: props.defaultValue ?? '',
    });

    return (
        <label className={cn('d-flex flex-column position-relative pb-3', className)}>
            {label && <span className='body-1 mb-2'>{label}</span>}
            <input
                disabled={disabled}
                className={cn('text-input', withError && errors[name]?.message && '_error')}
                type={type ?? 'text'}
                onChange={onChange}
                value={value}
                name={name}
                placeholder={placeholder}
            />
            {withError && errors[name]?.message && <span>{errors[name].message}</span>}
        </label>
    );
};

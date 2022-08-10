import React, {ChangeEvent, FC} from 'react';

interface SwitchButtonProps {
    onChange: (value: boolean) => void;
    value: boolean;
}

export const SwitchButton: FC<SwitchButtonProps> = ({onChange, value}) => {

    const handleToggle = (e: ChangeEvent<HTMLInputElement>) => onChange(e.target.checked);

    return (
        <label className="switch-button">
            <input type="checkbox" checked={value} onChange={handleToggle}/>
            <span className="switch-button__slider"/>
        </label>
    );
};

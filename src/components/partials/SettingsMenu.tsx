import React, {FC, ReactNode} from 'react';
import SidebarButton from "../ui/buttons/SidebarButton";
import { CardContainer } from '../containers';

interface SettingsMenuButtonDto {
    id: number;
    text: string;
    component: ReactNode;
    icon: ReactNode;
}

interface SettingsMenuProps {
    buttons: SettingsMenuButtonDto[];
    value: number;
    onClick: (component: ReactNode, id: number) => void;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({buttons, value, onClick}) => {

    const handleClick = (component: ReactNode, id: number) => {
        onClick(component, id);
    };

    return (
        <CardContainer>
            {
                buttons.map(({id, text, component, icon}) =>
                    <SidebarButton
                        className={value === id ? 'active mt-3 ps-3' : 'ps-3 mt-3'}
                        onClick={() => handleClick(component, id)}
                        icon={icon}
                        text={text}
                        key={id}
                    />
                )
            }
        </CardContainer>
    );
};

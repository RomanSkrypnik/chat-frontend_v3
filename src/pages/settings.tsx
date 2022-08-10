import React, { ReactNode, useState } from 'react';
import withAuthorized from '../hocs/Authorized';
import HouseIcon from '../components/ui/icons/HouseIcon';
import KeyIcon from '../components/ui/icons/KeyIcon';
import { SettingsAccountForm, SettingsMenu, SettingsPasswordForm } from '../components/partials';

const Settings = () => {
    const [component, setComponent] = useState<ReactNode>(<SettingsAccountForm />);
    const [id, setId] = useState(0);

    const buttons = [
        { id: 0, component: <SettingsAccountForm />, icon: <HouseIcon />, text: 'Account' },
        { id: 1, component: <SettingsPasswordForm />, icon: <KeyIcon />, text: 'Password' },
    ];

    const handleClick = (component: ReactNode, id: number) => {
        setComponent(component);
        setId(id);
    };

    return (
        <section className='d-flex'>
            <div className='align-self-start'>
                <SettingsMenu value={id} buttons={buttons} onClick={handleClick} />
            </div>
            <div className='ms-3 w-50'>
                {component}
            </div>
        </section>
    );
};

export default withAuthorized(Settings);

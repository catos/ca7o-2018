import * as React from 'react';

import { auth } from '../../Common/AuthService';
import { MainMenu } from './MainMenu';
import { DevMenu } from './DevMenu';

export const Header: React.StatelessComponent = () => {

    const devMenu = auth.isAdministrator()
        ? <DevMenu />
        : '';

    return (
        <header>
            <MainMenu />
            {devMenu}
        </header>
    );
}
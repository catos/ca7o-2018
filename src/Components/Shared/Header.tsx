import * as React from 'react';
import { NavLink } from 'react-router-dom';

// import { Logout } from '../Account/Logout';
import { auth } from '../../Common/AuthService';

import logo from '../../Images/logo.svg';
import userIcon from '../../Images/user-icon.png';

export const Header: React.StatelessComponent = () => {
    const loginLogout = auth.isAuthenticated()
        ?
        <ul className="user-menu">
            {/* <li>
                <Logout />
            </li> */}
            <li>
                <img src={userIcon} alt={auth.currentUser().name} />
                {auth.currentUser().name}

                <span className="chevron bottom" />
            </li>
        </ul>
        :
        <ul className="user-menu">
            <li>
                <NavLink to={'/login'}>Login</NavLink>
            </li>
        </ul>;

    return (
        <header>
            <nav>
                <NavLink to={'/'} exact={true} className="logo"><img width="49" src={logo} alt="Logo" /></NavLink>

                <ul className="main-menu">
                    <li>
                        <NavLink to={'/'} activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/mdk'} activeClassName="active">MDK</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/wesketch'} activeClassName="active">Wesketch</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/ticker'} activeClassName="active">Ticker</NavLink>
                    </li>
                </ul>

                {loginLogout}
            </nav>
        </header>
    );
}
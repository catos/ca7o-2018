import * as React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../Images/logo.png';
import socialIcons from '../../Images/social-icons.png';

export const Footer: React.StatelessComponent = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="logo"><img src={logo} alt="ca7o.com" /></div>
                <div className="menu">
                    <ul>
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
                </div>
                <div className="social">
                    <img src={socialIcons} alt="Yeah right..."/>
                </div>
            </div>
        </footer>
    );
}
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import socialIcons from '../../Images/social-icons.png';
import { Logo } from './Logo';

export const Footer: React.StatelessComponent = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="logo"><Logo /></div>
                <div className="menu">
                    <ul>
                        <li>
                            <NavLink to={'/'} activeClassName="active">HOME</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/mdk'} activeClassName="active">MDK</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/wesketch'} activeClassName="active">Wesketch</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/cac'} activeClassName="active">CAC</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/mbg'} activeClassName="active">MBG</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="social">
                    <img src={socialIcons} alt="Yeah right..." />
                </div>
            </div>
        </footer>
    );
}
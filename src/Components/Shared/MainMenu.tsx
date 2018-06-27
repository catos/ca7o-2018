import * as React from "react";
import { NavLink } from "react-router-dom";
import { auth } from "../../Services/AuthService";
import { Logout } from "../Account/Logout";

export class MainMenu extends React.Component {
    public render() {
        const loginLogout = auth.isAuthenticated()
            ?
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <span className="nav-link disabled">
                        {auth.currentUser().username}
                    </span>
                </li>
                <li className="nav-item dropdown">
                    <Logout />
                </li>
            </ul>
            :
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link">Login</NavLink>
                </li>
            </ul>;

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark pt-3 pb-3">
                <NavLink to={'/'} exact={true} className="navbar-brand">ca7o</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink to={'/mdk'} className="nav-link" activeClassName="active">MDK</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/wesketch'} className="nav-link" activeClassName="active">Wesketch</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/ticker'} className="nav-link" activeClassName="active">Ticker</NavLink>
                        </li>
                    </ul>
                    {loginLogout}
                </div>
            </nav >
        );
    }
}
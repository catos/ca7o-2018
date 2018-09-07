import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { Logout } from '../Account/Logout';
import { auth } from '../../Common/AuthService';

import logo from '../../Images/logo.svg';
import userIcon from '../../Images/user-icon.png';

interface IState {
    dropdownIsOpen: boolean;
}

export class Header extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            dropdownIsOpen: false
        };
    }

    public render() {
        const adminMenu = auth.isAdministrator()
            ? <div>
                <DropdownItem header={true}>Admin</DropdownItem>
                <DropdownItem><Link to={'/users'}>Users</Link></DropdownItem>
                <DropdownItem><Link to={'/recipes'}>Recipes</Link></DropdownItem>
                <DropdownItem divider={true} />
                <DropdownItem header={true}>Development</DropdownItem>
                <DropdownItem><a href="https://github.com/catos/ca7o">Github</a></DropdownItem>
                <DropdownItem><a href="https://dashboard.heroku.com/login">heroku</a></DropdownItem>
                <DropdownItem><a href="https://mlab.com/">mLab</a></DropdownItem>
                <DropdownItem><a href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a></DropdownItem>
                <DropdownItem><a href="https://jwt.io/">Jwt.io</a></DropdownItem>
                <DropdownItem><a href="https://www.typescriptlang.org/docs/handbook/jsx.html">.tsx</a></DropdownItem>
                <DropdownItem><a href="https://reactjs.org/docs/hello-world.html">React</a></DropdownItem>
                <DropdownItem><a href="https://reactstrap.github.io/components/alerts/">Reactstrap</a></DropdownItem>
                <DropdownItem><a href="https://socket.io/docs/">socket.io</a></DropdownItem>
                <DropdownItem><a href="https://github.com/Lemoncode/react-typescript-samples/tree/master/04%20DisplayData">Lemoncode</a></DropdownItem>
                <DropdownItem><a href="https://github.com/goldfire/howler.js">Howler.js</a></DropdownItem>
                <DropdownItem><a href="http://react-dnd.github.io/react-dnd/">React DnD</a></DropdownItem>
                <DropdownItem divider={true} />
            </div>
            : '';


        const loginLogout = auth.isAuthenticated()
            ? <ul className="user-menu">
                <li>
                    <img src={userIcon} alt={auth.currentUser().name} />
                </li>
                <li>
                    <Dropdown isOpen={this.state.dropdownIsOpen} toggle={this.toggle}>
                        <DropdownToggle tag="a" caret={true}>{auth.currentUser().name}</DropdownToggle>
                        <DropdownMenu>
                            {adminMenu}
                            <DropdownItem header={true}>Options</DropdownItem>
                            <DropdownItem><Logout /></DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </li>
            </ul>
            : <ul className="user-menu">
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

    private toggle = () => {
        this.setState({
            dropdownIsOpen: !this.state.dropdownIsOpen
        });
    }
}
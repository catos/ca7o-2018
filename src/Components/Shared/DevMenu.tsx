import * as React from "react";
import { Link } from "react-router-dom";

export class DevMenu extends React.Component {
    public render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={'/users'} className="dropdown-item">Users</Link>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://github.com/catos/mdk">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://mlab.com/">mLab</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://jwt.io/">Jwt.io</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://www.typescriptlang.org/docs/handbook/jsx.html">.tsx</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://reactjs.org/docs/hello-world.html">React</a>
                        </li>
                        <li className="nav-item">
                            <a className="dropdown-item" href="https://socket.io/docs/">socket.io</a>
                        </li>
                        
                        
                    </ul>
                </div>
            </nav >
        );
    }
}
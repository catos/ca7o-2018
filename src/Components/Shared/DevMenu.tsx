import * as React from "react";
import { Link } from "react-router-dom";

export class DevMenu extends React.Component {
    public render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-1">
                    <li className="nav-item">
                            <Link to={'/users'} className="nav-link">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link to={'/recipes'} className="nav-link">Recipes</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://dashboard.heroku.com/login">heroku</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/catos/mdk">Github</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" />
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://mlab.com/">mLab</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://jwt.io/">Jwt.io</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://www.typescriptlang.org/docs/handbook/jsx.html">.tsx</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://reactjs.org/docs/hello-world.html">React</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://socket.io/docs/">socket.io</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="https://github.com/Lemoncode/react-typescript-samples/tree/master/04%20DisplayData">Lemoncode</a>
                        </li>

                        
                    </ul>
                </div>
            </nav >
        );
    }
}
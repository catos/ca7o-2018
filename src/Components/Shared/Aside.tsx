import * as React from 'react'
import { Link } from 'react-router-dom';

export const Aside: React.StatelessComponent = (props) => {
    return (
        <aside>
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to={'/users'} className="nav-link">Users</Link>
                </li>
                <li className="list-group-item">
                    <Link to={'/recipes'} className="nav-link">Recipes</Link>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://dashboard.heroku.com/login">heroku</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://github.com/catos/mdk">Github</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://mlab.com/">mLab</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://jwt.io/">Jwt.io</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://www.typescriptlang.org/docs/handbook/jsx.html">.tsx</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://reactjs.org/docs/hello-world.html">React</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://socket.io/docs/">socket.io</a>
                </li>
                <li className="list-group-item">
                    <a className="nav-link" href="https://github.com/Lemoncode/react-typescript-samples/tree/master/04%20DisplayData">Lemoncode</a>
                </li>
            </ul>
        </aside>
    );
}
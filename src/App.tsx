import './Styles/bootstrap.min.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter, Link, NavLink } from 'react-router-dom';

import { Routes } from './Routes';

class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>

        <div>
          <header>
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
                  <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link" activeClassName="active">Login</NavLink>
                  </li>
                </ul>

                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Dev
                            </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link to={'/users'} className="dropdown-item">Users</Link>
                      <div className="dropdown-divider" />
                      <a className="dropdown-item" href="https://github.com/catos/mdk">Github</a>
                      <a className="dropdown-item" href="http://getbootstrap.com/docs/4.1/getting-started/introduction/">Bootstrap</a>
                      <a className="dropdown-item" href="https://jwt.io/">Jwt.io</a>
                    </div>
                  </li>
                </ul>

                {/* {loginLogout} */}
              </div>
            </nav >
          </header>

          <Routes />

        </div>
      </BrowserRouter>
    );
  }
}

export default App;

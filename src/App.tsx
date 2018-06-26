import './Styles/bootstrap.min.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Routes';
import { MainMenu } from './Shared/MainMenu';
import { DevMenu } from './Shared/DevMenu';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <header>
                        <MainMenu />
                        <DevMenu />
                    </header>
                    <div className="container">
                        <Routes />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

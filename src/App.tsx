import './Styles/bootstrap.min.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Components/Shared/Routes';
import { MainMenu } from './Components/Shared/MainMenu';
import { DevMenu } from './Components/Shared/DevMenu';

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

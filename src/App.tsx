import './Styles/bootstrap.min.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Components/Shared/Routes';
import { Header } from './Components/Shared/Header';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />
                    <div className="container-fluid">
                        <Routes />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

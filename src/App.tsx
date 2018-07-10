import './Styles/bootstrap.min.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Components/Shared/Routes';
import { Header } from './Components/Shared/Header';
import { Aside } from './Components/Shared/Aside';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div id="layout">
                    <Aside />
                    <Header />
                    <main>
                        <Routes />
                    </main>
                    <footer>Footer</footer>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

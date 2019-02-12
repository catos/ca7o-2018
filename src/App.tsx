import './Styles/bootstrap.min.css';
import './Styles/ThemeDefault.css';
import './Styles/App.css';

import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './Components/Shared/Routes';
import { Header } from './Components/Shared/Header';
import { Footer } from './Components/Shared/Footer';
import { Disclaimer } from './Components/Shared/Disclaimer';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <div id="layout">
                    <Header />
                    <main>
                        <Routes />
                    </main>
                    <Footer />
                    <Disclaimer />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

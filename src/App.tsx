import * as React from 'react';
import './App.css';

import logo from './logo.svg';
import { Wesketch } from './Wesketch/Wesketch';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React 2</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>

        <Wesketch />
      </div>
    );
  }
}

export default App;

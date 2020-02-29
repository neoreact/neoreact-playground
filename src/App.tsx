import React from 'react';
import logo from './logo.svg';
import './App.css';

let int: number;

function App() {
  const [state, setState] = React.useState<number>(0);
  React.useEffect(() => {
    int = window.setInterval(() => {
      console.log(state);
      setState(state + 1);
    }, 999);

    return () => window.clearInterval(int);
  }, [state]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {state}

        <div className="hello"></div>
        <div className="hello"></div>
        <div className="hello"></div>
        <div className="hello"></div>
      </header>
    </div>
  );
}

export default App;

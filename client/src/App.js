import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
//import Form from './Form'
//import FileForm from './FileForm'
import FormHandler from './FormHandler'

function App() {

  return (
    <div>
      <Navbar />
      <FormHandler />
    </div>
  );
}

export default App;

/*  <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div> */
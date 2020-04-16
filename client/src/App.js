import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
//import Form from './Form'
//import FileForm from './FileForm'
//import FormHandler from './FormHandler'
//import Sidebar from './Sidebar'
import FileManager from './FileManager'
import FormHandler from './FormHandler'

class App extends Component {
  constructor(){
    super();
    this.state = {isAuthed: false, user: null}
  };

  componentDidMount() {
    //this.changeState()
    fetch("/token", {
        method: 'get',
        headers: {
            "Content-type": 'application/json'
        }
    }).then(resp => resp.json()).then(data => {
        this.setState({
          isAuthed: true, 
          user: data["token"]
        })

    })
  }

  render(){
    return (
      <div>
        <Navbar />
        <FileManager />
      </div>
    );
  }
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
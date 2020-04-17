import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import Navbar from './Navbar'
//import Form from './Form'
//import FileForm from './FileForm'
import FormHandler from './FormHandler'
import FileManager from './FileManager';
import { Route, Switch } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = { isAuthed: false, user: null }
  };
  setupOnUnloadListener = () => {
    let user = this.state.user;
    window.addEventListener('unload', function (event) {
      //console.log(this.state);

      fetch("/remove", {
        method: 'delete',
        headers: {
          "Content-type": 'application/json',
          "Authorization": user
        },
        body: { "delete": "yes" }
      })
        .then(resp => resp.json());


      console.log('I am the 3rd one.');
    });
  };




  getToken = () => {
    if (!this.state.isAuthed && !this.state.user) {
      fetch("/token", {
        method: 'get',
        headers: {
          "Content-type": 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.setState({
            isAuthed: true,
            user: data["token"]
          })
          console.log(this.state.user);
          this.setupOnUnloadListener();
        })
    }
  }



  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path={`/files/:id`} render={(rp) => <FileManager {...rp} isAuthed={this.state.isAuthed}
            user={this.state.user} />} />
          <Route exact path="/" render={(rp) => <FormHandler {...rp} isAuthed={this.state.isAuthed}
            user={this.state.user} />} />
        </Switch>
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
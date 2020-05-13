import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
//import Form from './Form'
//import FileForm from './FileForm'
/* import FormHandler from './FormHandler' */
import LandingPage from './LandingPage';
import FileManager from './FileManager';
import { Route, Switch, withRouter } from 'react-router-dom';

class App extends Component {
	constructor() {
		super();
		this.state = { 
			isAuthed: false, 
			user: null, 
			client: {},
			width: 0, 
			height: 0, 
		};

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);	
	}
	
	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
		
		this.getToken();
		this.setState({ client: new WebSocket('ws://localhost:5000/api/ws') });
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}
	
	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}



	setupOnUnloadListener = (user) => {
		const usr = { user: user };
		this.props.history.push('/');
		this.props.history.index = 0;
		window.addEventListener('unload', function (e) {
			let headers = {
				type: 'application/json',
			};
			let blob = new Blob([JSON.stringify(usr)], headers);
			navigator.sendBeacon('/api/remove', blob);
		});
	};

	getToken = () => {
		if (!this.state.isAuthed && !this.state.user) {
			fetch('/api/token', {
				method: 'get',
				headers: {
					'Content-type': 'application/json',
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					this.setState({
						isAuthed: true,
						user: data['token'],
					});
					console.log(
						`%cUser: %c${this.state.user}`,
						'color: orange',
						'color: lightgray',
					);
					this.setupOnUnloadListener(this.state.user);
				});
		}
	};

	render() {
		return (
			<div>
				<Switch>
					<Route
						exact
						path={`/files/:id`}
						render={(rp) => (
							<FileManager
								client={this.state.client}
								{...rp}
								isAuthed={this.state.isAuthed}
								user={this.state.user}
								height={this.state.height}
								width={this.state.width}
							/>
						)}
					/>
					<Route
						exact
						path='/'
						render={(rp) => (
							<LandingPage
								client={this.state.client}
								{...rp}
								isAuthed={this.state.isAuthed}
								user={this.state.user}
								height={this.state.height}
								width={this.state.width}
								{...rp}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
}

export default withRouter(App);

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

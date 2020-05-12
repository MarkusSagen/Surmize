import React, { Component } from 'react';
import Navbar from './Navbar';
import FileUpload from './FileUpload';
import TextUpload from './TextUpload';
import Card from './Card';
import ProjectMember from './ProjectMember';

const markusProfile = require('./img/Markus_profile.jpeg');
const sebbeProfile = require('./img/Sebastian_profile.jpg');
const nilsProfile = require('./img/Nils_profile.jpg');
const alexProfile = require('./img/Alexander_profile.jpg');

const doneIcon = require('./img/stock/Done.svg');
const FAQIcon = require('./img/stock/FAQ.svg');
const QAIcon = require('./img/stock/QA.svg');

/*
const defaultProfile = require("./img/default.jpg");
const askQuestionIcon = require("./img/stock/Ask-Question.svg");
const contactIcon = require("./img/stock/Contact.svg");
const QuestionsIcon = require("./img/stock/Questions.svg");
const SiteIcon = require("./img/stock/Site-Running.svg");
*/

class LandingPage extends Component {
	constructor(props) {
		super(props);

		this.handleCheck = this.handleCheck.bind(this);

		this.state = {
			files: [],
			err: [],
			isExperimental: false,
			isFetching: false,
		};
	}

	handleTextUpload = (text, mode) => {
		this.changeState();
		const body = { text: text, user: this.props.user, new: false };
		if (this.props.isAuthed) {
			fetch(`/api/textUpload`, {
				method: 'post',
				headers: {
					Authorization: this.props.user,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(body),
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					this.changeState();
					this.props.history.push({
						pathname: `/files/${this.props.user}`,
						state: { mode: mode },
					});
				});
		}
	};

	handleFileUpload = (url, file, mode) => {
		this.setState({ isFetching: true });
		file.append('new', false);
		if (this.props.isAuthed) {
			fetch(`/api/${url}`, {
				method: 'post',
				headers: {
					Authorization: this.props.user,
				},
				body: file,
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					this.changeState();
					this.props.history.push({
						pathname: `/files/${this.props.user}`,
						state: { mode: mode },
					});
				});
		}
	};

	changeState = () => {
		this.setState({ isFetching: !this.state.isFetching });
	};

	putFile = (f) => {
		const arr = [];
		for (let i = 0; i < f.length; i++) {
			arr.push(f[i].name);
		}
		this.setState({ files: arr });
	};

	setError = (text) => {
		const state = this.state.err;
		console.log('setError: ' + text);
		this.setState((state) => ({
			err: [...state.err, text],
		}));
		setTimeout(() => {
			this.setState({ err: [] });
		}, 5000);
	};

	handleCheck = (e) => {
		console.log(e.target.checked);
		this.setState({ isExperimental: e.target.checked });
		console.log(this.state.isExperimental);
	};

	render() {
		const spinner = (
			<div className='colSpinner'>
				<div className='sp sp-wave'></div>
			</div>
		);
		const page = (
			<header>
				<Navbar />
				<div className='landing-main-content'>
					<div className='main-container'>
						<div className='jumbotron'>
							<div className='title'>
								<h1>Surmize</h1>
								<p>Upload your Documents or Text and gain quick insight</p>
							</div>
							<div className='upload-section'>
								<FileUpload
									setError={this.setError}
									err={this.state.err}
									putFile={this.putFile}
									handleCheck={this.handleCheck}
									isExperimental={this.state.isExperimental}
									sendFile={this.handleFileUpload}
								/>
								<TextUpload
									uploadText={this.handleTextUpload}
									checkSummary={this.handleCheck}
									handleCheck={this.handleCheck}
									isExperimental={this.state.isExperimental}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='how-section' id='how'>
					<div className='main-container'>
						<h1>How To Use</h1>
						<div className='card-container'>
							<Card
								title='Upload Files'
								imgSrc={QAIcon}
								listItems={[
									'Upload local files',
									'Or paste in text',
									'Analyse multiple files',
								]}
							/>
							<Card
								title='Ask Questions'
								imgSrc={FAQIcon}
								listItems={[
									'Select a uploaded file',
									'Use the summary to gain insight',
									'Ask specific questions',
									'Get back answer to your question',
								]}
							/>
							<Card
								title='Save Results'
								imgSrc={doneIcon}
								listItems={[
									'Ask more questions',
									'select other file or upload new',
									'Save the result, if needed',
								]}
							/>
						</div>
					</div>
				</div>
				<div className='about' id='about'>
					<div className='about-title'>
						<h1>About Us</h1>
					</div>
					<div className='about-main'>
						<div className='main-container'>
							<div className='about-content'>
								<div>
									<h6>A New Way to Search Information</h6>
									<p>
										{' '}
										We believe your time is valuable and that praesentium modi
										possimus, at omnis obcaecati, totam sunt soluta id iure
										molestiae excepturi consequatur quia? Excepturi, at
										voluptas.
									</p>
								</div>
								<div className='about-pics'>
									<ProjectMember
										src={markusProfile}
										firstName='Markus'
										lastName='Sagen'
										imgWidth='50px'
										imgHeight='50px'
										linkedInLink='https://www.linkedin.com/in/markussagen/'
										githubLink='https://github.com/MarkusSagen'
									/>
									<ProjectMember
										src={sebbeProfile}
										firstName='Sebastian'
										lastName='Rollino'
										imgWidth='50px'
										imgHeight='50px'
										linkedInLink='https://www.linkedin.com/in/sebastian-rollino-4019b8183/'
										githubLink='https://github.com/sebbersk'
									/>
									<ProjectMember
										src={nilsProfile}
										firstName='Nils'
										lastName='Hedberg'
										imgWidth='50px'
										imgHeight='50px'
										linkedInLink='https://www.linkedin.com/in/nils-hedberg-2784a8152/'
										githubLink='https://github.com/nilshugo'
									/>
									<ProjectMember
										src={alexProfile}
										firstName='Alexander'
										lastName='Bergkvist'
										imgWidth='50px'
										imgHeight='50px'
										linkedInLink='https://www.linkedin.com/in/alexander-bergkvist-b79325181/'
										githubLink='https://github.com/AlexanderBergkvist'
									/>
								</div>
							</div>
						</div>
					</div>
					<div className='footer'></div>
				</div>
			</header>
		);
		return this.state.isFetching ? spinner : page;
	}
}
export default LandingPage;

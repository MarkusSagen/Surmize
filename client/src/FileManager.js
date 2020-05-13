import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';

//import Dialogue from './Dialogue'
import QuestionForm from './QuestionForm';
import SidebarFileArea from './SidebarFileArea';
import Summary from './Summary';
import Navbar from './Navbar';
import FileUpload from './FileUpload';
import TextUpload from './TextUpload';
import './FileManager.css';


class FileManager extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dialogue: [],
			err: [],
			fetchingSameFile: false,
			file: '',
			files: new Set(),
			handlingQuestion: false,
			isExtractive: false,
			isFetching: true,
			summary: [],
			uploadMore: false,
		};

		this.handleCheck = this.handleCheck.bind(this);
	}

	componentDidMount() {
		const user = { user: this.props.user, mode: this.props.location.state.mode };
		const { client } = this.props;
		this.setState({ isFetching: true });
		fetch('/api/getfiles', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((resp) => resp.json())
			.then((data) => {
				if (data) {
					const file = data.files[0];
					setTimeout(() => {
						if (file === undefined) {
							this.setState({ isFetching: false });
						} else {
							const set = this.state.files;
							for (let i = 0; i < data.files.length; i++) {
								set.add(data.files[i]);
							}
							this.setState({ files: set, isFetching: false });
							this.showFile(file);
						}
					}, 1500);
				} else {
					this.setState({ isFetching: false });
				}
			});

		client.onmessage = (e) => {
			const data = e.data;
			console.log('IN SOCKET');
			const sum = JSON.parse(data).sum;
			const file = JSON.parse(data).file;
			if (
				this.state.summary[0] !== this.state.file &&
				sum !== '' &&
				this.state.file === file
			) {
				this.setState({ summary: [this.state.file, sum] });
			}
		};
	}

	setError = (text) => {
		console.log('setError: ' + text);
		this.setState((state) => ({
			err: [...state.err, text],
		}));
		setTimeout(() => {
			this.setState({ err: [] });
		}, 5000);
	};

	handleQuestion = (text, fn) => {
		if (text.trim() !== '') {
			this.setState({
				handlingQuestion: true,
			});
			const t = { text: text, file: this.state.file, user: this.props.user };
			if (this.props.isAuthed) {
				fetch('/api/question', {
					method: 'post',
					headers: {
						'Content-type': 'application/json',
						Authorization: this.props.user,
					},
					body: JSON.stringify(t),
				})
					.then((resp) => resp.json())
					.then((data) => {
						if (data.sum) {
							this.setState({
								handlingQuestion: false,
								summary: [this.state.file, data.sum],
							});
						} else {
							this.setState({
								handlingQuestion: false,
							});
						}
						fn(text, data.answer);
					});
			}
		}
	};

	showFile = (f) => {
		const file = { file: f, user: this.props.user };
		if (f === this.state.file) {
			this.setState({ fetchingSameFile: true });
			fetch('/api/showfile', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(file),
			})
				.then((resp) => resp.json())
				.then((data) => {
					setTimeout(() => {
						if (data.status_code !== 200) {
							this.setState({
								summary: [
									f,
									'Your File is being summarized... \n \n Meanwhile you have the opportunity to write questions',
								],
								fetchingSameFile: false,
							});
						} else {
							this.setState({ summary: [f, data.sum], fetchingSameFile: false });
						}
					}, 1200);
				});
		} else {
			this.setState({ isFetching: true });
			fetch('/api/showfile', {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(file),
			})
				.then((resp) => resp.json())
				.then((data) => {
					setTimeout(() => {
						if (data.status_code !== 200) {
							this.setState({
								summary: [
									'Not Ready Yet',
									'Your File is being summarized... \n \n Meanwhile, you can ask questions',
								],
								isFetching: false,
								file: f,
							});
							const { client } = this.props;
							if (this.state.summary[0] !== this.state.file) {
								const interval = setInterval(() => {
									if (this.state.summary[0] === this.state.file)
										clearInterval(interval);
									client.send(JSON.stringify(file));
								}, 7000);
							}
						} else {
							this.setState({ summary: [f, data.sum], isFetching: false, file: f });
						}
					}, 1200);
				});
		}
	};

	// Delete one file
	deleteFile = (f) => {
		const file = { file: f, all: false, user: this.props.user };
		this.setState({ isFetching: true });
		fetch('/api/files', {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(file),
		})
			.then((resp) => resp.json())
			.then((data) => {
				const files = this.state.files;
				let arr = [...files];
				const index = arr.indexOf(f);
				files.delete(f);
				arr = [...files];
				if (files.size === 0) {
					const summary = ['No Files Left', 'Upload New Ones?'];
					this.setState({ files: files, isFetching: false, summary: summary, file: '' });
				} else {
					if (index === 0) {
						this.setState(
							{ isFetching: false, files: files },
							this.showFile(arr[index]),
						);
					} else {
						this.setState(
							{ isFetching: false, files: files },
							this.showFile(arr[index - 1]),
						);
					}
				}
			});
	};

	// Delete all files
	removeAll = () => {
		const file = { file: null, all: true, user: this.props.user };
		this.setState({ isFetching: true });
		fetch('/api/files', {
			method: 'delete',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(file),
		})
			.then((resp) => resp.json())
			.then((data) => {
				setTimeout(() => {
					this.setState({
						files: new Set(),
						isFetching: false,
						summary: ['No Files Left', 'Upload New Ones?'],
						file: '',
					});
				}, 1000);
			});
	};

	moreFiles = () => {
		this.setState({ uploadMore: !this.state.uploadMore });
	};

	handleTextUpload = (text, mode) => {
		this.setState({ isFetching: true, uploadMore: false });
		const body = { text: text, user: this.props.user, new: true, mode: mode };
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
					setTimeout(() => {
						const set = this.state.files;
						const wasEmpty = set.size === 0;

						set.add(data.file);
						this.setState({ files: set, isFetching: false });
						if (wasEmpty) {
							console.log('in empty', [...set][0]);
							this.showFile([...set][0]);
						} else {
							console.log('NOT EMPTY SHOW SAME FILE', this.state.file);
							this.showFile(this.state.file);
						}
					}, 1000);
				});
		}
	};

	handleFileUpload = (url, file, mode) => {
		this.setState({ isFetching: true, uploadMore: false });
		file.append('new', true);
		file.append('mode', mode);
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
					setTimeout(() => {
						const set = this.state.files;
						const wasEmpty = set.size === 0;
						for (let i = 0; i < data.files.length; i++) {
							set.add(data.files[i]);
						}
						this.setState({ files: set, isFetching: false });
						if (wasEmpty) {
							console.log('in empty', [...set][0]);
							this.showFile([...set][0]);
						} else {
							console.log('NOT EMPTY SHOW SAME FILE', this.state.file);
							this.showFile(this.state.file);
						}
					}, 1000);
				});
		}
	};

	handleCheck = (e) => {
		console.log(e.target.checked);
		this.setState({ isExperimental: e.target.checked });
		console.log(this.state.isExperimental);
	};

	render() {
		const fetching = this.state.isFetching;
		const spinner = (
			<div className='colSpinner'>
				<div className='sp sp-wave'></div>
			</div>
		);

		const maxWidth = 1269;
		// Slides properties
		const properties = {
			autoplay: false,
			duration: 5000000000,
            transitionDuration: 500,
			infinite: true,
			indicators: true,
			arrows: true,
			pauseOnHover: true,
			onChange: (oldIndex, newIndex) => { },
		};
		const page = (
			<header>
				<Navbar minimal />
				<div className='main-content'>
					<SidebarFileArea
						showForm={this.state.uploadMore}
						files={this.state.files}
						removeAll={this.removeAll}
						showFile={this.showFile}
						deleteFile={this.deleteFile}
						file={this.state.file}
						moreFiles={this.moreFiles}
					/>
					{this.state.uploadMore 
					? (
						<div className='more-jumbotron'>
							<div className='upload-section'>
								<FileUpload
									exFiles={this.state.files}
									setError={this.setError}
									err={this.state.err}
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
							</div>{' '}
						</div>
					) : ((this.props.width >= maxWidth) 
						? ( <>
								<Summary summary={this.state.summary} />
								<QuestionForm
									sendQuestion={this.handleQuestion}
									isFetching={this.state.handlingQuestion}
									file={this.state.file}
								/>
							</>
						) : ( 
							<div className='slide-container'>
								{this.props.width}
								<Slide {...properties}>
									<div className='each-slide'>
										<Summary summary={this.state.summary} />	
									</div>
									<div className='each-slide'>
									<QuestionForm
										sendQuestion={this.handleQuestion}
										isFetching={this.state.handlingQuestion}
										file={this.state.file}
									/>	
									</div>
								</Slide>
							</div>
						)
					)}
				</div>
			</header>
		);
		const comps = !fetching ? page : spinner;
		return comps;
	}
}

export default FileManager;

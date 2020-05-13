import React, { Component } from 'react';
import InfoIcon from './InfoIcon';

class TextUpload extends Component {
	state = {
		showTextArea: false,
		text: '',
	};

	handleChange = (e) => {
		this.setState({ text: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const text = this.state.text;
		this.setState({ text: '' });
		this.props.uploadText(text, this.props.isExperimental);
	};

	hideLabel = () => {
		this.setState({ showTextArea: true });
	};

	render() {
		return (
			<div className='text-upload'>
				<h2>Enter Text</h2>
				<form onSubmit={this.handleSubmit}>
					<div className='file-upload-container'>
						<label
							onClick={this.hideLabel}
							style={{ display: `${!this.state.showTextArea ? 'flex' : 'none'}` }}
							htmlFor='text-file'>
							<span className='text-icon-before'>T</span>
							<span>Enter Text Here</span>
						</label>
						<textarea
							onChange={this.handleChange}
							value={this.state.text}
							style={{ display: `${this.state.showTextArea ? 'block' : 'none'}` }}
							name=''
							id='text-file'></textarea>
					</div>
					<div className='form-check-summary'>
						<span className='text'>
							<span className='bold rm-small-devices'>(Optional) </span>
							Exp<span className='rm-small-devices'>erimental</span> Sum
							<span className='rm-smallest-devices'>mary</span>
						</span>
						<span className='icons'>
							<InfoIcon
								positionTop={true}
								marginTop={0}
								text={[
									'Click button to the right to use experimental summary',
									'Using it will potentially yield more insightful summaries',
									'But summaries will take longer.',
								]}
							/>
							<div className='cbx'>
								<input
									id='cbx'
									type='checkbox'
									onChange={this.props.handleCheck}
									checked={this.props.isExperimental}
								/>
								<label htmlFor='cbx'></label>
								<svg width='15' height='14' viewBox='0 0 15 14' fill='none'>
									<path d='M2 8.36364L6.23077 12L13 2'></path>
								</svg>
							</div>
						</span>
					</div>

					{this.state.text.length > 0 ? (
						<button type='submit'>Upload</button>
					) : (
						<div className='fakeButton'>Upload</div>
					)}
				</form>
			</div>
		);
	}
}
export default TextUpload;

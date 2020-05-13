import React, { Component } from 'react';
import uuid from 'react-uuid';
import star from './star.svg';
import { ReactComponent as Save } from './save.svg';

class QuestionForm extends Component {
	state = {
		dialogue: [],
		text: '',
	};

	componentDidUpdate() {
		this.scrollDown();
	}

	handleChange = (e) => {
		this.setState({ text: e.target.value });
	};

	sendQuestion = (e) => {
		e.preventDefault();
		const text = this.state.text;
		this.setState({ text: '' });
		this.props.sendQuestion(text, this.newAnswer);
	};

	newAnswer = (question, answer) => {
		var newArray = this.state.dialogue;
		newArray.push({
			question: question,
			answer: answer.answer,
			context: answer.context,
			score: answer.score,
		});
		this.setState({
			dialogue: newArray,
		});
	};

	scrollDown = () => {
		const chat = document.getElementById('qa-main');
		chat.scrollTop = chat.scrollHeight;
	};

	certainty = (score) => {
		let reply = '';
		if (score < 2) {
			reply = (
				<div className='qa-score'>
					<span className='qa-score-title'>Confidence Score: </span>
					<span className='qa-score-rating'>
						<img className='inactive-score' src={star} alt='star' />
						<img className='inactive-score' src={star} alt='star' />
						<img className='inactive-score' src={star} alt='star' />{' '}
					</span>
				</div>
			);
		} else if (score < 5) {
			reply = (
				<div className='qa-score'>
					<span className='qa-score-title'>Confidence Score: </span>
					<span className='qa-score-rating'>
						<img src={star} alt='star' />
						<img className='inactive-score' src={star} alt='star' />
						<img className='inactive-score' src={star} alt='star' />{' '}
					</span>
				</div>
			);
		} else if (score < 15) {
			reply = (
				<div className='qa-score'>
					<span className='qa-score-title'>Confidence Score: </span>
					<span className='qa-score-rating'>
						<img src={star} alt='star' />
						<img src={star} alt='star' />
						<img className='inactive-score' src={star} alt='star' />{' '}
					</span>
				</div>
			);
		} else {
			reply = (
				<div className='qa-score'>
					<span className='qa-score-title'>Confidence Score: </span>
					<span className='qa-score-rating'>
						<img src={star} alt='star' />
						<img src={star} alt='star' />
						<img src={star} alt='star' />{' '}
					</span>
				</div>
			);
		}
		return reply;
	};

	handleKeyDown = (e, sendFunc) => {
		if (e.key === 'Enter' && e.shiftKey === false) {
			e.preventDefault();
			sendFunc(e);
		}
	};

	render() {
		const chat = [];
		const { dialogue } = this.state;
		for (let i = 0; i < dialogue.length; i++) {
			chat.push(
				<div key={uuid()} className='qa-content'>
					<div className='question'>
						<p>Question</p>
						<p>{dialogue[i].question}</p>
					</div>
					<div className='answer'>
						<p>Answer</p>
						<p>{dialogue[i].answer}</p>
						{this.certainty(dialogue[i].score)}
					</div>
				</div>,
			);
		}

		/* let questionBox = <h1>Hello</h1>
        const answers = []
        const dialogue = this.state.dialogue.reverse()

        for (var i = 0; i < dialogue.length; i++) {
            answers.push(
                <div key={uuid()} className="list-group my-3">
                    <span className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Question: {dialogue[i].question}</h5>
                            <small>3 days ago</small>
                        </div>
                    </span>
                    <span className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            {this.certainty(dialogue[i].score)}
                        </div>
                        <p className="mb-1">{dialogue[i].answer}</p>
                    </span>
                </div>
            )
        }
        if (this.props.fetching) {
            questionBox = <div className="col3Balls">

                <div className="sp3Balls sp-3balls"></div>

            </div>;
        } else {
            questionBox =
                <div>  <h3>Ask Your Questions Here</h3>
                    <form onSubmit={this.sendQuestion} action="" className="my-3">
                        <div className="form-group">
                            <label htmlFor="question">Question</label>
                            <input onChange={this.handleChange} type="text" className="form-control" id="question" aria-describedby="questionHelp"
                                placeholder="Enter question" required />
                            <small id="questionHelp" className="form-text text-muted">Write your question here, please try to be
                            as
                    specific as possible for better and faster answers.</small>
                        </div>
                        <button className="btn-success p-2">Send question</button>
                    </form>
                </div>

        } */
		return (
			<div className='chat'>
				<div className='content-title'>
					<h3>QA</h3>
				</div>
				<div className='content-subtitle'>
					{this.props.truncate(this.props.file)}
				</div>
				<div id='qa-main' className='content-main'>
					{chat}
				</div>
				<div className='content-detail'>
					<form onSubmit={this.sendQuestion}>
						<div className='form-group question-area'>
							<textarea
								onChange={this.handleChange}
								onKeyDown={(e) => {
									this.handleKeyDown(e, this.sendQuestion);
								}}
								placeholder='Write Question Here...'
								name='question-text'
								value={this.state.text}
								id='question-text'></textarea>
						</div>
						<button type='submit'>Ask</button>
					</form>
					<div className='content-save'>
						<Save />
					</div>
				</div>
			</div>
		);
	}
}

export default QuestionForm;

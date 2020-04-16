import React, { Component } from 'react'

class QuestionForm extends Component {
    state = {
        text: ""
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.sendQuestion(this.state);

    }
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="my-3">
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input onChange={this.handleChange} type="text" value={this.state.text} className="form-control" id="question" aria-describedby="questionHelp"
                        placeholder="Enter question" />
                    <small id="questionHelp" className="form-text text-muted">Write your question here, please try to be
                    as specific as possible for better and faster answers.</small>
                </div>
                <button className="btn-success p-2">Send question</button>
            </form>
        )
    }
}

export default QuestionForm;
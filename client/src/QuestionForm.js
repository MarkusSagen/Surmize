import React, { Component } from 'react'

class QuestionForm extends Component {
    state = {
        question: "",
        dialogue: []
    }
    handleChange = (e) => {
        this.setState({ question: e.target.value })
    }
    sendQuestion = () => {
        // Deep copy question string for safety
        var q = (' ' + this.state.question).slice(1);
        fetch("/api", {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(q)
        }).then(resp => resp.json()).then(data => {

            this.newAnswer(q, data.answer)

        })
    }
    newAnswer = (question, answer) => {
        this.setState({
            "dialogue": this.state.dialogue.append(
                {
                    "question": question,
                    "answer": answer
                }
            )
        })
    }
    renderDialogue = () => {
        if(this.state.dialogue.length > 0) {
            return <div className="list-group my-3">
            <span className="list-group-item list-group-item-action flex-column align-items-start active">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Question: {this.state.dialogue[0].question}</h5>
                    <small>3 days ago</small>
                </div>
            </span>
            <span className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">Answer:</h5>
                </div>
            <p className="mb-1">{this.state.dialogue[0].answer}</p>
            </span>
        </div>
        }
    }
    render() {
        return ([
            <form action="" className="my-3">
                <div className="form-group">
                    <label for="question">Question</label>
                    <input onChange={this.handleChange} type="text" className="form-control" id="question" aria-describedby="questionHelp"
                        placeholder="Enter question" />
                    <small id="questionHelp" className="form-text text-muted">Write your question here, please try to be
                    as
                            specific as possible for better and faster answers.</small>
                </div>
                <button onClick={this.sendQuestion} className="btn-success p-2">Send question</button>
            </form>,
            this.renderDialogue()
        ]
        )
    }
}

export default QuestionForm;
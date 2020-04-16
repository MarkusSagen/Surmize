import React, { Component } from 'react'

class QuestionForm extends Component {
    state = {
        question: "",
        dialogue: [],
        fetching: false
    }
    fetching = () => {
        this.setState({
            fetching: true
        })
    }
    finishFetching = () => {
        this.setState({
            fetching: false
        })
    }
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    sendQuestion = (e) => {
        e.preventDefault();
        this.props.sendQuestion(this.state.text);
        /*  this.fetching()

        // Deep copy question string for safety
        var q = { query: (' ' + this.state.question).slice(1) };
        fetch("/api", {
            method: 'post',
            headers: {
                "Content-type": 'application/json'
            },
            body: JSON.stringify(q)
        }).then(resp => resp.json()).then(data => {

            this.newAnswer(q.query, data.answer)

            this.finishFetching()
        }) */
    }
    newAnswer = (question, answer) => {
        var newArray = this.state.dialogue
        newArray.push(
            {
                "question": question,
                "answer": answer
            })
        this.setState({
            dialogue: newArray
        })
    }
    render() {
        if (this.state.fetching) {
            return <div>Fetching answer</div>
        }
        else {
            const questionBox = <form onSubmit={this.sendQuestion} action="" className="my-3">
                <div className="form-group">
                    <label htmlFor="question">Question</label>
                    <input onChange={this.handleChange} type="text" value={this.state.text} className="form-control" id="question" aria-describedby="questionHelp"
                        placeholder="Enter question" />
                    <small id="questionHelp" className="form-text text-muted">Write your question here, please try to be
                    as
                    specific as possible for better and faster answers.</small>
                </div>
                <button className="btn-success p-2">Send question</button>
            </form>
            const answers = []
            for (var i = 0; i < this.state.dialogue.length; i++) {
                answers.push(
                    <div className="list-group my-3">
                        <span className="list-group-item list-group-item-action flex-column align-items-start active">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Question: {this.state.dialogue[i].question}</h5>
                                <small>3 days ago</small>
                            </div>
                        </span>
                        <span className="list-group-item list-group-item-action flex-column align-items-start">
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">Answer:</h5>
                            </div>
                            <p className="mb-1">{this.state.dialogue[i].answer}</p>
                        </span>
                    </div>
                )
            }
            return [questionBox, answers]
        }
    }
}

export default QuestionForm;
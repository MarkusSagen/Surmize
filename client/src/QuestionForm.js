import React, { Component } from 'react'
import uuid from 'react-uuid'

class QuestionForm extends Component {
    state = {
        dialogue: [],
        text: ""
    }
    handleChange = (e) => {
        this.setState({ text: e.target.value })
    }
    sendQuestion = (e) => {
        e.preventDefault();
        const text = this.state.text;
        this.setState({ text: "" })
        this.props.sendQuestion(text, this.newAnswer);



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
        let questionBox = <h1>Hello</h1>
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
                            <h5 className="mb-1">Answer:</h5>
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

        }
        return (
            <div>
                {questionBox}
                <div>
                    {answers}
                </div>
            </div>
        )
    }
}

export default QuestionForm;

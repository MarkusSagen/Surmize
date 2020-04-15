import React, { Component } from 'react'

class Dialogue extends Component {
    state = {
        dialogue: []
    }
    newAnswer = (question, answer) => {
        this.setState({
            "dialogue": this.dialogue.append(
                {
                    "question": question,
                    "answer": answer
                }
            )
        })
    }
    render() {
        return (
            <div>
                <div className="list-group my-3">
                    <span className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Question: What is love?</h5>
                            <small>3 days ago</small>
                        </div>
                    </span>
                    <span className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Answer:</h5>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget
                        risus
                            varius blandit.</p>
                    </span>
                </div>


                <div className="list-group my-3 border-primary">
                    <span className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Question: What is love?</h5>
                            <small>3 days ago</small>
                        </div>
                    </span>
                    <span className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Answer:</h5>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                            varius blandit.</p>
                    </span>
                </div>

                <div className="list-group my-3 border-primary">
                    <span className="list-group-item list-group-item-action flex-column align-items-start active">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Question: What is love?</h5>
                            <small>3 days ago</small>
                        </div>
                    </span>
                    <span className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Answer:</h5>
                        </div>
                        <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus
                            varius blandit.</p>
                    </span>
                </div>
            </div>
        )
    }
}

export default Dialogue;
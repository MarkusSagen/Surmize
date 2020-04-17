import React, { Component } from 'react'
//import Dialogue from './Dialogue'
import QuestionForm from './QuestionForm'
import Sidebar from './Sidebar'
import Summary from './Summary'
import './FileManager.css'

class FileManager extends Component {

    state = {
        isFetching: true,
        files: [],
        summary: [],
        handlingQuestion: false,
        dialogue: []
    }
    componentDidMount() {
        console.log("MOUNT")
        const user = { user: this.props.user };
        fetch("/getfiles", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(resp => resp.json()).then(data => {
            this.setState({ files: [...this.state.files, data.files.map(f => { return f })] });
        })

    }
    handleQuestion = (text, fn) => {
        this.setState({
            handleQuestion: true
        })
        const t = { text: text }
        if (this.props.isAuthed) {
            fetch("/api", {
                method: 'post',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": this.props.user
                },
                body: JSON.stringify(t)
            })
                .then(resp => resp.json())
                .then(data => {
                    console.log(data);
                    this.setState({
                        handlingQuestion: false,
                    })
                    fn(text, data.answer)
                })
        }
    }

    showFile = (f) => {
        const file = { file: f, user: this.props.user };
        fetch("/show_file",
            {
                method: "post",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(file)
            }).then(resp => resp.json()).then(data => {
                this.setState({ summary: [f[0], data.sum] });
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-3 files">
                        <Sidebar showFile={this.showFile} files={this.state.files} />
                    </div>
                    <div className="col-md-9">
                        <Summary summary={this.state.summary} />
                        <QuestionForm sendQuestion={this.handleQuestion} />
                    </div>
                </div>
            </div>
        )
    }
}

export default FileManager;
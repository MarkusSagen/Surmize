import React, { Component } from 'react'
//import Form from './Form'
import FileForm from './FileForm'



class FormHandler extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            files: []
        }
    }
    handleQuestion = (text) => {
        this.changeState()
        if (this.props.isAuthed) {
            fetch("/question", {
                method: 'post',
                headers: {
                    "Content-type": 'application/json',
                    "Authorization": this.props.user
                },
                body: JSON.stringify(text)
            })
                .then(resp => resp.json())
                .then(data => {
                    this.setState({
                        isFetching: false,
                        answer: data.answer
                    })
                })
        }
    }
    handleFileUpload = (url, file) => {
        if (this.props.isAuthed) {
            fetch(`/${url}`, {
                method: 'post',
                headers: {
                    "Authorization": this.props.user
                },
                body: file
            }).then(resp => resp.json()).then(data => {
                this.props.history.push(`/files/${this.props.user}`);
            })
        }
    }
    changeState = () => {
        this.setState({ isFetching: !this.state.isFetching })
    }
    putFile = (f) => {
        const arr = [];
        for (let i = 0; i < f.length; i++) {
            arr.push(f[i].name)
        }
        this.setState({ files: arr });
    }

    render() {
        const fetching = this.state.isFetching
        const files = this.state.files.map(f => {
            return (<li key={f} className="list-group-item d-flex justify-content-between align-items-center list-files">
                {f}
            </li>)
        });
        const comps = <div>
            <FileForm files={files} putFile={this.putFile} sendFile={this.handleFileUpload} />
        </div>
        const res = (!fetching ? comps : <h1>fetching</h1>)
        return (
            <div>
                {res}
            </div>

        )
    }
}

export default FormHandler;
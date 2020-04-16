import React, { Component } from 'react'
import Form from './Form'
import FileForm from './FileForm'



class FormHandler extends Component {
    constructor(props){
        super(props)
        this.state = {
            isFetching: false,
            answer: ''
        }
    }
    handleQuestion = (text) => {
        this.changeState()
        if (this.props.isAuthed) {
            fetch("/api", {
                method: 'post',
                headers: {
                    "Content-type": 'application/json', 
                    "Authorization": this.props.user
                },
                body: JSON.stringify(text)
            })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isFetching: false,
                    answer: data.answer
                })
            })
        }
    }
    handleFileUpload = (url, file) => {
        this.changeState()
        console.log("user: ", this.props.user)
        if (this.props.isAuthed) {
            fetch(`/${url}`, {
                method: 'post',
                headers: {
                    "Authorization": this.props.user
                },
                body: file
            }).then(resp => resp.json()).then(data => {
                this.changeState()
                console.log(data);
            })
        }
    }
    changeState = () => {
        this.setState({ isFetching: !this.state.isFetching })
    }

    render() {
        const fetching = this.state.isFetching
        const comps = <div>
            <p>
                {this.state.summarization}
            </p>
            <Form classN="btn btn-primary" answer={this.state.answer} text="Submit Here" sendQuestion={this.handleQuestion} />
            <h1>You can also upload Files</h1>
            <FileForm sendFile={this.handleFileUpload} />
        </div>;
        const res = (!fetching ? comps : <h1>fetching</h1>)
        return (
            <div>

                {res}

            </div>

        )
    }
}

export default FormHandler;
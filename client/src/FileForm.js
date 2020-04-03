import React, { Component } from 'react'

import Button from './Button'

class FileForm extends Component {
    state = {
        fileToBeSent: ''
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let file = this.state.fileToBeSent;
        const formData = new FormData();
        formData.append("file", file);
        fetch("/uploadfile", {
            method: 'post',
            body: formData
        }).then(resp => resp.json()).then(data => {
            console.log(data);
        })

        formData.append("file", file);
    }
    fileChange = (e) => {
        this.setState({ fileToBeSent: e.target.files[0] });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <input onChange={this.fileChange} type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                    <small id="fileHelp" className="form-text text-muted">Supported file types, pdf, doc, docx....</small>
                </div>
                <Button type="submit" classN="btn btn-outline-primary" text="Upload File" />
            </form>
        )
    }
}
export default FileForm;
import React, { Component } from 'react'

import Button from './Button'

class FileForm extends Component {
    state = {
        fileToBeSent: '',
        isTemp: true
    }
    handleSubmit = (e) => {
        e.preventDefault();
        let file = this.state.fileToBeSent;
        const formData = new FormData();
        formData.append("file", file);
        const tmp = this.state.isTemp;
        formData.append("tmp", tmp)
        this.props.sendFile('upload_train', formData)



    }
    fileChange = (e) => {
        this.setState({ fileToBeSent: e.target.files[0] });
    }
    handleCheck = (e) => {
        this.setState({ isTemp: !this.state.isTemp }
        )
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <input onChange={this.fileChange} type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                    <small id="fileHelp" className="form-text text-muted">Supported file types, pdf, doc, docx....</small>
                </div>
                <div className="form-check">
                    <label className="form-check-label">
                        <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" checked={this.state.isTemp} />
                            Temporary File
                    </label>
                </div>

                <Button type="submit" classN="btn btn-outline-primary" text="Upload File" />
            </form>
        )
    }
}
export default FileForm;
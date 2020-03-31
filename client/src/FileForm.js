import React, { Component } from 'react'
import Form from './Form'
import Button from './Button'

class FileForm extends Component {

    handleSubmit = (e) => {
        console.log("File sent")
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <input type="file" className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
                    <small id="fileHelp" className="form-text text-muted">Supported file types, pdf, doc, docx....</small>
                </div>
                <Button type="submit" classN="btn btn-outline-primary" text="Upload File" />
            </form>
        )
    }
}
export default FileForm;
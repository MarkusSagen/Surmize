import React, { Component } from 'react'

import Button from './Button'

class FileForm extends Component {
    state = {
        fileToBeSent: '',
        isTemp: true
    }
    getFileExtention = (file) => {
        let s = String(file.name).split(".")
        let fileExtention = s[s.length - 1]
        return fileExtention
    }
    checkAllowedFiles = (file) => {
        let allowedTypes = ["txt", "csv", "pdf", "story"];
        let hasPassed = true;
        let err = '';
        console.log(file)
        if (file === "") {
            hasPassed = false;
            err = "Please select a valid file to upload\n";
        }
        else if (allowedTypes.every(type => this.getFileExtention(file) !== type)) {
            hasPassed = false;
            err = 'Only the fileformats .txt, .csv and .pdf are allowed\n';
        }
        // TODO: Make better more like react
        if (err !== '') {
            console.error(err)
        }
        return hasPassed
    }
    MBToBits = (data) => { return data * (1000 * 1024); }
    checkAllowedSize = (file) => {
        let MAX_SIZE_MB = 10; // Can be change to another value
        var sum = 0;
        var hasPassed = true;
        var err = '';

        sum += file.size
        if (sum > this.MBToBits(MAX_SIZE_MB)) {
            hasPassed = false;
            err = 'Files are exeding combined limit of ' + MAX_SIZE_MB + 'MB \n';
            // TODO: Give better alert messages - More in React way
            console.error(err);
        }
        return hasPassed
    }



    handleSubmit = (e) => {
        e.preventDefault();
        let file = this.state.fileToBeSent;
        const formData = new FormData();

        if (this.checkAllowedFiles(file) && this.checkAllowedSize(file)) {
            formData.append("file", file);
            const tmp = this.state.isTemp;
            formData.append("tmp", tmp)
            this.props.sendFile('upload_train', formData)
        }
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
            <div className="container text-center">
                <h1>Upload Files Here</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-center upl-file ">
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
            </div>

        )
    }
}
export default FileForm;
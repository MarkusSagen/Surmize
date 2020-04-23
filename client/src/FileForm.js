import React, { Component } from 'react'

import Button from './Button'
import './FileForm.css'

class FileForm extends Component {
    state = {
        fileToBeSent: [],
        isExperimental: false,
        files: []
    }
    getFileExtention = (file) => {
        let s = String(file.name).split(".")
        let fileExtention = s[s.length - 1]
        return fileExtention
    }
    checkAllowedFiles = (files) => {
        let allowedTypes = ["txt", "csv", "pdf", "story"];
        let hasPassed = true;
        let err = '';
        if (files[0] === "") {
            hasPassed = false;
            err = "Please select a valid file to upload\n";
        }
        else {
            for (let i = 0; i < files.length; i++) {
                if (allowedTypes.every(type => this.getFileExtention(files[i]) !== type)) {
                    hasPassed = false;
                    err = 'Only the fileformats .txt, .csv and .pdf are allowed\n';
                }
            }
            // TODO: Make better more like react
            if (err !== '') {
                console.error(err)
            }
            return hasPassed
        }
    }
    MBToBits = (data) => { return data * (1000 * 1024); }
    checkAllowedSize = (files) => {
        let MAX_SIZE_MB = 10; // Can be change to another value
        var sum = 0;
        var hasPassed = true;
        var err = '';


        for (let i = 0; i < files.length; i++) {
            sum += files[i].size
        }
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
        let files = e.target[0].files;
        console.log(files)
        const formData = new FormData();

        if (this.checkAllowedFiles(files) && this.checkAllowedSize(files)) {
            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i]);
            }
            this.props.sendFile('upload_train', formData, this.state.isExperimental)
        }
    }
    fileChange = (e) => {
        const file = e.target.files;
        this.setState({ fileToBeSent: file });
        if (this.props.putFile) {
            this.props.putFile(file);
        } else {
            const arr = [];
            for (let i = 0; i < file.length; i++) {
                arr.push(file[i].name)
            }
            this.setState({ files: arr })
        }
    }
    handleCheck = (e) => {
        this.setState({ isExperimental: !this.state.isExperimental }
        )
    }
    render() {
        const files = this.state.files.map(f => {
            return (<li key={f} className="list-group-item d-flex justify-content-between align-items-center list-files">
                {f}
            </li>)
        });
        return (
            <div className="container text-center">
                {this.props.minimal ? "" : <h1>Upload Files Here</h1>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-center">
                        <input onChange={this.fileChange} type="file" multiple className="form-control-file inputFile" id="fileInput" aria-describedby="fileHelp" />
                        <label htmlFor="fileInput"><span>Choose File</span></label>
                        <ul className="list-group">
                            {this.props.files ? this.props.files : files}
                        </ul>
                        <small id="fileHelp" className="form-text text-muted">Supported file types, pdf, doc, docx....</small>
                    </div>
                    {this.props.minimal ? "" : <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" onChange={this.handleCheck} type="checkbox" value="" checked={this.state.isExperimental} />
                            Use Experimental Summarizer
                    </label>
                    </div>}

                    <Button type="submit" classN="btn btn-outline-primary" text="Upload File" />
                </form>
            </div>

        )
    }
}
export default FileForm;

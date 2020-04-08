import React, { Component } from 'react'
import Button from './Button'


class FileForm extends Component {
    state = {
        fileToBeSent: '',
        isTemp: true
    }

    // Check maximum allowed files uploaded
    checkMaxUploadFiles=(files) => {
      let MAX_FILES = 10;
      let MIN_FILES = 1;
      let hasPasses = true;
      var err = '';
  
      if (files.length > MAX_FILES) {
        hasPasses = false;
        err = 'Can only upload a maimum of 10 files';
        console.error(err);
      }
      if (files.length < MIN_FILES) {
        hasPasses = false;
        err = 'Must upload at least one file';
        console.error(err);
      }
      return hasPasses;
    }
    
    
    // Check allowed upload types
    checkAllowedFormats=(files) => {
      let allowedTypes = ["text/plain", "text/csv", "application/pdf" ];
      let hasPassed = true;
      let err = '';
  
      for (var i=0; i<files.length; i++) {
        if (allowedTypes.every(type => files[i].type !== type)) {
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


    // Convert Megabites to bits
    toBits=(data) => {
      return data*(1000*1024);
    }


    // Check maximum allowed total file size
    checkSize=(files) => {
      let MAX_SIZE_MB = 10; // Can be change to another value
      var sum = 0;
      var hasPassed = true;
      var err = '';
  
      for (var i=0; i < files.length; i++) {
        sum += files[i].size
      }
      if (sum > this.toBits(MAX_SIZE_MB)) {
        hasPassed = false;
        err = 'Files are exeding combined limit of '+MAX_SIZE_MB+'MB \n';
        // TODO: Give better alert messages - More in React way
        console.error(err);
      }
      return hasPassed
    }

    handleSubmit = (e) => {
      e.preventDefault();
      let file = this.state.fileToBeSent;
      let files = e.target[0].files;
      const formData = new FormData();

      if (this.checkAllowedFormats(files) && this.checkMaxUploadFiles(files) && this.checkSize(files)) {
        for (var i=0; i<files.length; i++) {
          formData.append("file", file);
          const tmp = this.state.isTemp;
          formData.append("tmp", tmp)
        }
        this.props.sendFile('upload_train', formData)
      }
    }

    fileChange = (e) => {
      this.setState({ fileToBeSent: e.target.files[0] });
    }

    handleCheck = (e) => {
      this.setState({ isTemp: !this.state.isTemp })
    }

    render() {
      return (
        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputFile">File input</label>
            <input onChange={this.fileChange} type="file" multiple className="form-control-file" id="exampleInputFile" aria-describedby="fileHelp" />
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
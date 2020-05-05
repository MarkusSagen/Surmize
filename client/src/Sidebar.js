import React, { Component } from 'react'

class Sidebar extends Component {

    removeAll = () => {
        this.props.removeAll()
    }
    readFile = (f) => {
        this.props.showFile(f)
    }
    deleteFile = (f) => {
        this.props.deleteFile(f);
    }
    render() {
        const itr = this.props.files.entries();
        let filesArr = [];
        for (let i = 0; i < this.props.files.size; i++) {
            filesArr.push(itr.next().value[0]);
        }

        const files = filesArr.map(f => {
            if (f === this.props.file) {
                return (<li key={f} className="selected-file"><span onClick={() => { this.readFile(f) }}>{f}</span>  <span><i
                    onClick={() => this.deleteFile(f)} className="fas remove-file fa-trash-alt"></i></span></li>)
            }
            return (<li key={f}><span onClick={() => { this.readFile(f) }}>{f}</span>  <span><i
                onClick={() => this.deleteFile(f)} className="fas remove-file fa-trash-alt"></i></span></li>)
        })
        return (
            <div className="sidebar">
                <div className="file-title">
                    <h2>Files</h2>
                </div>

                <div className="files">
                    <ul>
                        {files}
                    </ul>
                </div>
                <div className="upload">
                    <button>Upload</button>
                    <button>Text</button>
                </div>
                <div className="delete-all-files">
                    <button onClick={this.removeAll}>Delete All Files</button>
                </div>
            </div>
        )
    }
}
export default Sidebar;

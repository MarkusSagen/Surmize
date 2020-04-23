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
        console.log(itr);
        let filesArr = [];
        for (let i = 0; i < this.props.files.size; i++) {
            filesArr.push(itr.next().value[0]);
        }
        console.log("FILES", filesArr);
        const files = filesArr.map(f => {
            if (f === this.props.file) {
                return (<li key={f} className="list-group-item selected-file"><span className="text-files " onClick={() => { this.readFile(f) }}>{f}</span>  <span><i
                    onClick={() => this.deleteFile(f)} className="fas remove-file fa-trash-alt"></i></span></li>)
            }
            return (<li key={f} className="list-group-item text-files not-selected"><span onClick={() => { this.readFile(f) }}>{f}</span>  <span><i
                onClick={() => this.deleteFile(f)} className="fas remove-file fa-trash-alt"></i></span></li>)
        })
        return (
            <div className="card mb-3">
                <h3 className="card-header">Your files</h3>
                <div className="card-body add-file">
                    <button className="btn-success"><i onClick={this.props.moreFiles} className="fas fa-plus fa-3x"></i></button>
                </div>
                <ul className="list-group list-group-flush">
                    {files}
                </ul>
                <div className="card-body">
                    <button onClick={this.removeAll} className="btn-primary remove-files">Remove all <i className="fas fa-trash-alt"></i></button>
                </div>
                <div className="card-footer text-muted">
                    Last Time Updated: 2 days ago
                    </div>
            </div>
        )
    }
}
export default Sidebar;

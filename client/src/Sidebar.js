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
            console.log(f)
            return (<li key={f} className="list-group-item">{f} <span><i onClick={() => this.readFile(f)} className="fas fa-book-reader mx-2"></i> <i
                onClick={() => this.deleteFile(f)} className="fas fa-trash-alt"></i></span></li>)
        })
        return (
            <div className="card mb-3">
                <h3 className="card-header">Your files</h3>
                <div className="card-body add-file">
                    <button className="btn-success"><i className="fas fa-plus fa-3x"></i></button>
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
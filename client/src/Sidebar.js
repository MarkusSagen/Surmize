import React, { Component } from 'react'

class Sidebar extends Component {
    state = {
        files: []
    }

    render() {
        return (
            <div className="card mb-3">
                <h3 className="card-header">Your files</h3>
                <div className="card-body add-file">
                    <button className="btn-success"><i className="fas fa-plus fa-3x"></i></button>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Kafka.txt <span><i className="fas fa-book-reader mx-2"></i> <i
                        className="fas fa-trash-alt"></i></span></li>
                    <li className="list-group-item">Moby_Dick.txt <span><i className="fas fa-book-reader mx-2"></i> <i
                        className="fas fa-trash-alt"></i></span></li>
                    <li className="list-group-item">Tesla.txt <span><i className="fas fa-book-reader mx-2"></i> <i
                        className="fas fa-trash-alt"></i></span></li>
                    <li className="list-group-item">WORDS.txt <span><i className="fas fa-book-reader mx-2"></i> <i
                        className="fas fa-trash-alt"></i></span></li>
                </ul>
                <div className="card-body">
                    <button className="btn-primary remove-files">Remove all <i className="fas fa-trash-alt"></i></button>
                </div>
                <div className="card-footer text-muted">
                    Last Time Updated: 2 days ago
                    </div>
            </div>
        )
    }
}
export default Sidebar;
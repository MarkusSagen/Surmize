import React, { Component } from 'react'
//import Dialogue from './Dialogue'
import QuestionForm from './QuestionForm'
import Sidebar from './Sidebar'
import Summary from './Summary'
import './FileManager.css'

class FileManager extends Component {

    render() {
        return (
            <div className="container">
                <div className="row my-5">
                    <div className="col-md-3 files">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <Summary />
                        <QuestionForm />
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default FileManager;
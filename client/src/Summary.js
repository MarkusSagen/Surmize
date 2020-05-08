import React, { Component } from 'react'
import { ReactComponent as Save } from "./save.svg"

class Summary extends Component {
    render() {
        return (
            <div className="summary">
                <div className="content-title">
                    <h3>Summary</h3>
                </div>
                <div className="content-subtitle">
                    <p>{this.props.summary[0]}</p>
                </div>
                <div className="content-main">
                    <p>{this.props.summary[1]}</p>
                </div>
                <div className="content-detail">
                    <div className="content-info">
                        <ul>
                            <li><span>Number of Words:</span> <span> 20000</span></li>
                            <li><span>Summation Time:</span> <span> 10s</span></li>
                            <li><span>Summation Type:</span> <span> Abstractive</span></li>
                        </ul>
                    </div>
                    <div className="content-save">
                        <Save />
                    </div>
                </div>
            </div>
        )
    }
}
export default Summary;
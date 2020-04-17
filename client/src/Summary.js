import React, { Component } from 'react'

class Summary extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-5 text-center">{this.props.summary[0]}</h1>
                <hr className="my-4" />
                <p className="lead">{this.props.summary[1]}</p>
            </div>

        )
    }
}
export default Summary;
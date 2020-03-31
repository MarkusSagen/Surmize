import React, { Component } from 'react'

class Button extends Component {
    state = {}
    render() {
        return (
            <div>
                <button type={this.props.type} className={this.props.classN}>{this.props.text}</button>
            </div>
        )
    }
}

export default Button;
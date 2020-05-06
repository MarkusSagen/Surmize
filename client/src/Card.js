import React, { Component } from 'react'

class Card extends Component {
    render() {
        return (

            <div className="card">
                <h2>{this.props.title}</h2>
                <ol>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                    <li>Lorem ipsum</li>
                </ol>
                <h3>IMG</h3>
            </div>


        )
    }
}

export default Card;

import React, { Component } from 'react'

class Card extends Component {
    render() {
        return (
            <div className="card">
                <h2>{this.props.title}</h2>
                <ul>
                    <li>1. Lorem ipsum</li>
                    <li>2. Lorem ipsum</li>
                    <li>3. Lorem ipsum</li>
                    <li>4. Lorem ipsum</li>
                </ul>
                <img className="card-image-bottom" src={this.props.imgSrc} width="200px" height="155px"/>
            </div>


        )
    }
}

export default Card;

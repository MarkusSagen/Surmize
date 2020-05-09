import React, { Component } from 'react';

class InfoIcon extends Component {

    render() {
        const content = this.props.text.map((content, index) => {
                            return(<li key={index}> { content } </li> ) 
                        });
        const marginTop  = this.props.marginTop;
        return(
            <div className="info-container">
                <i className="tooltip far fa-question-circle" style={{ marginTop: marginTop+'px'}}>
                    { this.props.positionTop === true
                    ? <span className="tooltiptext"> { content } </span>
                    : <span className="tooltiptext-bottom"> { content } </span> }
                </i> 
            </div>
        );
    }
}

export default InfoIcon;
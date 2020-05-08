import React, { Component } from 'react'

class ProjectMember extends Component {
    render() {
        return (
            <div className="member">
                <img src={this.props.src} alt={this.props.src} style={{borderRadius: "90px"}} width={this.props.imgWidth} height={this.props.imgHeight} />
                <div className="member-info">
                    <h5>{this.props.firstName}</h5>
                    <h5>{this.props.lastName}</h5>
                    <div className="member-links">
                        <a href={ this.props.linkedInLink }><i className="fab fa-linkedin"></i></a>
                        <a href={ this.props.githubLink }><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectMember

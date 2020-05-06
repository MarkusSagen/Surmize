import React, { Component } from 'react'

class ProjectMember extends Component {
    render() {
        return (
            <div className="member">
                <h4>IMG</h4>
                <div className="member-info">
                    <h5>Name</h5>
                    <h5>Alias</h5>
                    <div className="member-links">
                        <i className="fab fa-linkedin"></i>
                        <i className="fab fa-github"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectMember

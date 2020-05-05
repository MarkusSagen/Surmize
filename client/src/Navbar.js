import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ReactComponent as Squid } from "./squid.svg"
class Navbar extends Component {

    render() {
        return (
            <nav className="own-navbar">
                <div className="own-container">
                    <div className="own-nav-content">
                        <div className="own-logo">
                            <div className="own-text-logo">
                                <h3>Surmize</h3>
                                <hr />
                                <p className="own-logo-subtitle">A close-domain QA</p>
                            </div>
                            <div className="logo-container">
                                <Squid />
                            </div>
                        </div>
                        <div className="nav-links">
                            <ul>
                                <li><a href="#">Home</a></li>
                                <li><a href="#">How To Use It</a></li>
                                <li><a href="#">About Us</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;

/* <span class="sr-only">(current)</span> */
import React, { Component } from 'react';
//import { Link } from 'react-router-dom'
import { ReactComponent as Squid } from "./squid.svg"
class Navbar extends Component {

    render() {
        return (
            <nav className="own-navbar" id="home">
                <div className="own-container" style={{ marginLeft: `${this.props.marginLeft}px`}} >
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
                        {!this.props.minimal && <div className="nav-links">
                            <ul>
                                <li><a href="#home">Home</a></li>
                                <li><a href="#how">How To Use</a></li>
                                <li><a href="#about">About Us</a></li>
                            </ul>
                        </div>}

                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
import React, { Component } from 'react'

class Navbar extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="{#}">Summarize</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="{#}">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="{#}">How It Works</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="{#}">About Us</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navbar;

/* <span class="sr-only">(current)</span> */
import React, { Component } from 'react'
import Sidebar from "react-sidebar";

import { ReactComponent as NavIcon } from "./Hamburger.svg";
import { ReactComponent as RemoveFile } from "./crossred.svg";
import { ReactComponent as TrashCan } from "./trashcan.svg";



// for Sidebar
const mql = window.matchMedia(`(min-width: 1269px)`);
const maxWidth = 1269;

class SidebarFileArea extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			err: [],
			files: [],
			fileToBeSent: [],
			width: 0, 
            height: 0,
            sidebarDocked: mql.matches,   // Check view space for sidebar
            sidebarOpen: false,
        };
        

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
	}	

    componentWillMount() {
        this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
        mql.addListener(this.mediaQueryChanged);
    }
    
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
        mql.removeListener(this.mediaQueryChanged);
    }
    
    // Check window screen width
	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

    // Toggle Sidebar
    onSetSidebarOpen(open) {
        /* var sidebarOpen = this.state.sidebarOpen;
        var nav = document.querySelector(".nav");
        (sidebarOpen === false) ? nav.style.visibility = "hidden" : nav.style.visibility = "visible"; */
        this.setState({ sidebarOpen: open });
    }

    // Close sidebar on too small margin
    mediaQueryChanged() {
        this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
    }

    // Toggle Form Upload Area
    toggleForm = () => {
        this.props.moreFiles();
    }

    truncate = (input) => {
        const iPadWidthStanding = 768;
        var width = this.state.width;
        return ((width >= iPadWidthStanding) ? input.substring(0, 18) + '...' : input.substring(0, 14) + '...');
    }

    removeAll   = ( ) => { this.props.removeAll() }
    readFile    = (f) => { this.props.showFile(f) }
    deleteFile  = (f) => { this.props.deleteFile(f); }

    render() {
        const itr = this.props.files.entries();
        let filesArr = [];
        for (let i = 0; i < this.props.files.size; i++) {
            filesArr.push(itr.next().value[0]);
        }

        const files = filesArr.map(f => {
            if (f === this.props.file) {
                return (<li key={f} className="selected-file">
                    <span onClick={() => { this.readFile(f) }}> { this.truncate(f) } </span>
                    <span onClick={() => { this.deleteFile(f) }}><RemoveFile /></span></li>)
            }
            return (<li key={f}>
                <span onClick={() => { this.readFile(f) }}> { this.truncate(f) } </span>
                <span onClick={() => { this.deleteFile(f) }}><RemoveFile /></span></li>)
        })
        return (
            <Sidebar 
                className="sidebarFiles"
                sidebar={
                    <div className="sidebar">
                        <div className="file-title">
                            <h2>Files</h2>
                        </div>
                        <div className="files"><ul> { files } </ul></div>
                        <div className="upload">
                            <button onClick={this.toggleForm}>
                                <p>{this.props.showForm ? "Close Form" : "Upload Files"}</p>
                            </button>
                        </div>
                        <div className="delete-all-files">
                            <button onClick={this.removeAll}><p>Delete Files</p> <TrashCan /></button>
                        </div>
                    </div>
                }
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen} 
                styles={{ 
                    root: { top: "calc(0px - 8%)", },
                      sidebar: { background: "#fff", top: "calc(15% - 1px);", height: "92vh", minWidth: "225px", },
                      overlay: { top: "8%",},
                      content: { top: "7%", background: "#ffffff00", },
                }}>
                <button className="btn-sidebar btn-navbar"
                    onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)} >
                    <NavIcon />
                </button>
            </Sidebar>
        );
    }
}










export default SidebarFileArea;

               


/*

    <div style={{ position: "relative", zIndex: 4, top: "40px", left: "10px"}}>
        <button onClick={() => this.onSetSidebarOpen(!this.state.sidebarOpen)}>
            Open sidebar
        </button>
        <div className="files1">
            <ul> { files } </ul>
        </div>
        <div className="upload1">
            <button onClick={this.toggleForm}>
                <p>{this.props.showForm ? "Close Form" : "Upload Files"}</p>
            </button>
        </div>
        <div className="delete-all-files1">
            <button onClick={this.removeAll}>
                <p>Delete Files</p> <TrashCan />
            </button>
        </div>
    </div>

*/